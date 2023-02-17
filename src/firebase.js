import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDnYx1SQYk2nJKt0Kau5d7OHrDXlzxIf7g",
  authDomain: "personel-vue.firebaseapp.com",
  projectId: "personel-vue",
  storageBucket: "personel-vue.appspot.com",
  messagingSenderId: "765097982556",
  appId: "1:765097982556:web:7ce4853ae6eb4174e50499"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
//offline first
firebase.firestore().enablePersistence()
  .catch((err) => {
      if (err.code == 'failed-precondition') {
      } else if (err.code == 'unimplemented') {
      }
  });
