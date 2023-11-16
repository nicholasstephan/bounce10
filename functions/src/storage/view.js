// https://cloud.google.com/run/docs/authenticating/public

const {onRequest} = require("firebase-functions/v2/https");
const { getStorage } = require('firebase-admin/storage');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const sharp = require('sharp');

module.exports = onRequest(async (req, res) => {
  
  // http://localhost:5000/file/VRaJD8v8Dvw4oI7d7pvY?thumbnail=true&width=800
  
  const baseUrl = `${req.protocol}://${req.header('host')}`;
  const search = req.url.split('?')[1] || "";
  const id = req.url
    .replace(/(.+)?\/file\//, "") // remove prefix url up to `...file/`
    .replace(/\?.+/, ""); // remove query params

  if(!id) {
    res.redirect(`${baseUrl}/placeholder?${search}&reason=no_id`);
    return;
  }


  // Load the data for this file from firestore.
  let data = await getFirestore().doc(`storage/${id}`).get();
  if(!data.exists) {
    return res.redirect(`${baseUrl}/placeholder?${search}&reason=no_data`);
  }
  data = data.data();
  data.derived = data.derived || {};

  // Correct for legacy way of storing the files. 
  // TODO: Create a script to migrate old data, then remove this. 
  data.location = data.location || `${data.folder}/${id}`;
  for(let key in data.derived) {
    data.derived[key].name = data.derived[key].name || data.derived[key].filename || "";
    data.derived[key].location = data.derived[key].location || `${data.folder}/${data.derived[key].name}`;
  }


  // Transform options as a string. 
  // This is used as a filename for cached file.

  let options = req.query;
  let optionsString = "";
  if(options.width) {
    optionsString += `_w${options.width}`;
  }
  if(options.height) {
    optionsString += `_h${options.height}`;
  }
  if(options.fit) {
    optionsString += `_f${options.fit}`;
  }
  if(options.position) {
    optionsString += `_p${options.position}`;
  }


  // If we're loading an image file. 
  if(data.type.includes('image')) {
    // If we're manipulating the file. 
    if(optionsString) {
      // If the manipulated file is cached, redirect to it.
      if(data.derived?.[optionsString]?.location) {
        try {
          await redirectToFile(data.derived[optionsString].location);
          await getFirestore().doc(`storage/${id}`).update({
            [`derived.${optionsString}.dateUsed`]: Timestamp.now()
          });
        }
        catch(e) {
          try {
            let originalFile = getStorage().bucket().file(data.location);
            await generateImage(originalFile);
          }
          catch(e) {
            res.status(500).send("Error generating image");
          }
        }
        return;
      }
      // Otherwise generate the new file.
      else {
        try {
          let originalFile = getStorage().bucket().file(data.location);
          await generateImage(originalFile);
        }
        catch(e) {
          res.status(500).send("Error generating image");
        }
        return;
      }
    }
    // Otherwise return original
    else {
      await redirectToFile(data.location);
      return;
    }
  }

  // If we're loading a video.
  if(data.type.includes('video')) {
    // If we're loading the thumbnail.
    if(options.thumbnail) {
      // If we're maniuplating the file.
      if(optionsString) {
        // If the manipulated file is cached, redirect to it.
        if(data.derived?.[optionsString]?.location) {
          try {
            await redirectToFile(data.derived?.[`thumbnail${optionsString}`]?.location);
            await getFirestore().doc(`storage/${id}`).update({
              [`derived.thumbnail${optionsString}.dateUsed`]: Timestamp.now()
            });
          }
          catch(e) {
            if(data.derived?.thumbnail?.location) {
              let originalFile = getStorage().bucket().file(data.derived?.thumbnail?.location);
              await generateImage(originalFile);
            }
            else {
              res.redirect(`${baseUrl}/placeholder?${search}&reason=no_id`);
            }
          }
          return;
        }
        // Otherwise generate the new file.
        else {
          let originalFile = getStorage().bucket().file(data.derived?.thumbnail?.location);
          await generateImage(originalFile);
          return;
        }
      }
      // Otherwise return original thumbnail
      else {
        try {
          await redirectToFile(data.derived.thumbnail.location);
          await getFirestore().doc(`storage/${id}`).update({
            [`derived.thumbnail.dateUsed`]: Timestamp.now()
          });
        }
        catch(e) {
          res.redirect(`${baseUrl}/placeholder?${search}&reason=no_id`);
          return;
        }
        return;
      }
    }
    // If we're loading an optimized version.
    else if(options.size) {
      try {
        await redirectToFile(data.derived[options.size]?.location);
        await getFirestore().doc(`storage/${id}`).update({
          [`derived.${options.size}.dateUsed`]: Timestamp.now()
        });
      }
      catch(e) {
        // todo: check if the file is being processed. 
        // if so, do we wait for it to finish?
        res.status(500).send("Error generating image");
      }
      return;
    }
    // Otherwise return original video
    else {
      await redirectToFile(data.location);
      return;
    }
  }

  // All other file types, return the original.
  await redirectToFile(data.location);



  // Utility Functions
  
  async function redirectToFile(location) {
    let file = getStorage().bucket().file(location);
    let [doesExist] = await file.exists();
    if(doesExist) {
      let [isPublic] = await file.isPublic();
      if(!isPublic) {
        await file.makePublic();
      }
      let url = file.publicUrl();
      res.redirect(url);
    }
    else {
      throw new Error(`File does not exist: ${location}`);
    }
  }

  function generateImage(originalFile) {

    return new Promise(async resolve => {
      // Create a read stream from storage.
      // Note, exclude validation when on the emulator.
      // https://github.com/firebase/firebase-tools/issues/3469

      let fileStream = await originalFile.createReadStream({ 
        validation: process.env.FUNCTIONS_EMULATOR ? false : 'crc32c'
      });

      const acceptHeader = req.header('Accept');
      const webpAccepted = acceptHeader?.indexOf('image/webp') !== -1;

      // We're opinionated enough to make it webp only.
      // https://sharp.pixelplumbing.com/api-output#toformat
      // https://dev.to/dbanisimov/building-image-cdn-with-firebase-15ef
      const transformed = sharp()
        .resize(
          options.width ? Number(options.width) : undefined,
          options.height ? Number(options.height) : undefined,
          {
            fit: options.fit || 'cover',
            position: options.position || 'center'
          }
        )
        .webp({ force: webpAccepted });
      
      fileStream = fileStream.pipe(transformed);

      fileStream.on('error', e => {
        res.redirect(`${baseUrl}/placeholder?${search}&reason=stream_error`);
        resolve();
      });

      fileStream.on('close', () => {
        resolve();
      });

      fileStream.pipe(res); // Pipe directly to output.

      // If caching hasn't been disabled, pipe the transformed file.

      if(options.cache !== 'false') {

        let namePattern = /(.+)\.([^.]+)?$/;
        let filename = `${namePattern.exec(data.name)[1]}${optionsString}.webp`;
        let location = `${data.folder}/${id}/${filename}`;

        let file = getStorage().bucket().file(location);

        let writeStream = file.createWriteStream({
          metadata: {
            type: 'image/webp',
            metadata: {
              custom: 'derived'
            }
          }
        });
    
        fileStream.on('close', async () => {

          // Add a record of the derived resources 
          await getFirestore().doc(`storage/${id}`).update({
            [`derived.${optionsString}`]: {
              dateCreated: Timestamp.now(),
              dateUsed: Timestamp.now(),
              name: filename,
              location: location,
              options: options,
            }
          });

        });

        fileStream.pipe(writeStream); // Pipe to cached file.
      }
      
    });
  }

});