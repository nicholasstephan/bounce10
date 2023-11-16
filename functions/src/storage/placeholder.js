const {onRequest} = require("firebase-functions/v2/https");
const sharp = require('sharp');

module.exports = onRequest(async (req, res) => {
  let width = req.query.width || req.query.w || 300; 
  let height = req.query.height || req.query.h || 300;

  const acceptHeader = req.header('Accept');
  const webpAccepted = acceptHeader?.indexOf('image/webp') !== -1;

  const image = sharp({
    create: {
      width: Number(width),
      height: Number(height),
      channels: 4,
      background: { r: 217, g: 217, b: 217, alpha: 1 }
    }
  })
  .webp({ force: webpAccepted });

  res.set('Access-Control-Allow-Origin', '*');
  image.pipe(res);
})