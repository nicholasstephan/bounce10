/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const admin = require('firebase-admin');
const logger = require("firebase-functions/logger");

admin.initializeApp();
admin.firestore().settings({ 
  ignoreUndefinedProperties: true 
});


/* File Storage */

exports.file = require('./src/storage/view.js');
exports.placeholder = require('./src/storage/placeholder.js');