import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC7vNIqY1Lk9oAI5tEvkoosJv7aZMj7IUs",
  authDomain: "droo-clothing.firebaseapp.com",
  databaseURL: "https://droo-clothing.firebaseio.com",
  projectId: "droo-clothing",
  storageBucket: "",
  messagingSenderId: "795401388072",
  appId: "1:795401388072:web:a842259cfaff157347751d"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
