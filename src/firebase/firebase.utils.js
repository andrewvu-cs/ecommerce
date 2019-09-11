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

// takes user auth object and store it into the database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    // if there is no data in the snapshot
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try{
            // create method
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    // batch write cause of big sets
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        //get the document at an empty string, give me a new entry
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    // fires our batch returns a promise
    return await batch.commit()
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
