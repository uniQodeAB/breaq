import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`
};
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export default firebase;