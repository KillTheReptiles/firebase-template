import * as admin from 'firebase-admin';
// generate this file from your firebase project and put it in this folder
import * as serviceAccount from './permissions.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://hotel-sys-14796.firebaseio.com', // replace this with your database url
  storageBucket: 'hotel-sys-14796-dev.appspot.com', // replace this with your storage bucket url
});

export const db = admin.firestore();
export const storage = admin.storage().bucket();

db.settings({ ignoreUndefinedProperties: true });
