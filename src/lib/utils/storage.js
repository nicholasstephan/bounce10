import {
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";

import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
  deleteField,
} from "firebase/firestore";

import { dev, browser } from "$app/environment";

import { getAuth } from "firebase/auth";

export async function upload(folder, files, callback) {
  if (!files) return;
  if (files?.target?.files) files = files.target.files; // if files is an upload event
  if (files?.target?.result) files = [base64ToFile(files.target.result, files.name)]; // if files is a FileReader load event
  if (!files?.length) files = [files]; // make sure it's a list

  let uploads = [];
  let res = [];

  let filesCol = collection(getFirestore(), `storage`);

  let userId = getAuth().currentUser?.uid;
  if (!userId) {
    return;
  }

  for (let file of files) {

    let fileDoc = await addDoc(filesCol, {
      dateCreated: serverTimestamp(),
      folder: folder,
      name: file.name || "Untitled",
      type: file.type,
      size: file.size,
      uploadProgress: 0,
      createdByUserId: userId,
      useCount: 1,
    });

    let id = fileDoc.id;

    let location = `${folder}/${id}/${file.name}`
    let storageRef = ref(getStorage(), location);

    uploads.push(new Promise((resolve, reject) => {
      uploadBytesResumable(storageRef, file)
        .on('state_changed',
          (snapshot) => {
            updateDoc(fileDoc, { uploadProgress: snapshot.bytesTransferred / snapshot.totalBytes });
          },
          (uploadError) => {
            updateDoc(fileDoc, { uploadError: uploadError.toString() });
            reject(uploadError);
          },
          async () => {
            await updateDoc(fileDoc, {
              location: location,
            });
            await updateDoc(fileDoc, {
              uploadProgress: deleteField(),
              uploadError: deleteField(),
            });
            resolve();
          }
        );

      res.push(id);
    }));
  }

  Promise.all(uploads).then(() => callback && callback(res));

  if (res.length == 1) {
    res = res[0];
  }

  return res;
}

export async function addUse(id) {
  let fileRef = doc(getFirestore(), `storage/${id}`);
  let fileDoc = await getDoc(fileRef);
  if (!fileDoc.exists()) {
    return;
  }
  let file = fileDoc.data();
  await updateDoc(fileRef, { useCount: file.useCount + 1 });
}

export async function remove(id) {
  let fileRef = doc(getFirestore(), `storage/${id}`);
  let fileDoc = await getDoc(fileRef);
  if (!fileDoc.exists()) {
    return;
  }
  let file = fileDoc.data();

  if(file.useCount > 1) {
    await updateDoc(fileRef, { useCount: file.useCount - 1 });
    return;
  }

  // remove original.
  let storageRef = ref(getStorage(), file.location);
  await deleteObject(storageRef);

  // remove each derrived
  for (let derivedId in file.derived || {}) {
    let location = file.derived[derivedId].location;
    if (!location) {
      continue;
    }
    let storageRef = ref(getStorage(), location);
    await deleteObject(storageRef);
  }

  await deleteDoc(fileRef);
}

export function url(id, options) {
  if(!id) {
    return null;
  }
  let origin = dev ? "http://localhost:5000" :
             browser ? location.origin :
             "";

  let path = `${origin}/file/${id}`;

  let query = [];
  for (let option in options) {
    query.push(option + '=' + options[option]);
  }
  query = query.join('&')

  if (query) {
    path = path + '?' + query;
  }

  return path;
}

export default function (folder) {
  return {
    upload: e => upload(folder, e),
    remove: id => remove(id),
    url: (id, options) => url(id, options),
  };
};

export function base64ToFile(str, filename = "Untitled") {
  let res = str.split(',');
  let mime = res[0].match(/:(.*?);/)[1];
  let bstr = atob(res[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
