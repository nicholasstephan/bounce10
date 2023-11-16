import { dev, browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import { initializeApp, getApps } from "firebase/app";
import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getFirestore, connectFirestoreEmulator, initializeFirestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

if(getApps().length == 0) {
  initializeApp({
    apiKey: env.PUBLIC_FIREBASE_APIKEY,
    authDomain: env.PUBLIC_FIREBASE_AUTHDOMAIN,
    databaseURL: env.PUBLIC_FIREBASE_DATABASEURL,
    projectId: env.PUBLIC_FIREBASE_PROJECTID,
    storageBucket: env.PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: env.PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: env.PUBLIC_FIREBASE_APPID,
    measurementId: env.PUBLIC_FIREBASE_MEASUREMENTID,
  });
}

if(dev && browser) {
  initializeFirestore(getApp(), {
    experimentalForceLongPolling: true,
  });
}

if(dev && browser) {
  connectAuthEmulator(getAuth(), `http://${location.hostname || 'localhost'}:9099`);
  connectFunctionsEmulator(getFunctions(getApp()), location.hostname || 'localhost', 5001);
  connectFirestoreEmulator(getFirestore(), location.hostname || 'localhost', 8080);
  connectStorageEmulator(getStorage(), location.hostname || 'localhost', 9199);
  connectDatabaseEmulator(getDatabase(), location.hostname || 'localhost', 9000);
}