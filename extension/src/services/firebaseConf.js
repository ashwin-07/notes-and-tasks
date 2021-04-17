import * as firebase from 'firebase';

var firebaseConfig = {
 //PASTE YOUR FIREBASE CONFIG HERE
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const databaseRef = firebase.database().ref();

export let db = firebase.firestore();
