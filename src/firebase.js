import firebase from 'firebase';
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAqtI5Is5e83rbmKOGHqeSU4sJwOvHIrDg',
  authDomain: 'fmaps-ax.firebaseapp.com',
  databaseURL: 'https://fmaps-ax.firebaseio.com',
  projectId: 'fmaps-ax',
  storageBucket: 'fmaps-ax.appspot.com',
  messagingSenderId: '777480926020'
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
