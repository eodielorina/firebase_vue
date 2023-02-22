import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'
const config = {
  apiKey: "AIzaSyDnYx1SQYk2nJKt0Kau5d7OHrDXlzxIf7g",
  authDomain: "personel-vue.firebaseapp.com",
  projectId: "personel-vue",
  storageBucket: "personel-vue.appspot.com",
  messagingSenderId: "765097982556",
  appId: "1:765097982556:web:7ce4853ae6eb4174e50499"
};
const fb = firebase.initializeApp(config);
const db = fb.firestore();
//offline first
export {fb,db}
firebase.firestore().enablePersistence()
  .catch((err) => {
      if (err.code == 'failed-precondition') {
      } else if (err.code == 'unimplemented') {
      }
  });
