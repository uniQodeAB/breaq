import firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDrNdnPHhnT2Btz0VHHhbNWZCypPCwkZh8",
    authDomain: "fun-food-friends-33123.firebaseapp.com",
    databaseURL: "https://fun-food-friends-33123.firebaseio.com",
    projectId: "fun-food-friends-33123",
    storageBucket: "",
    messagingSenderId: "1075131320059"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;