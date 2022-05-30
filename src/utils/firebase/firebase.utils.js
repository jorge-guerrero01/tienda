import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6CKWY80EZzwETjV0CfGlfXekB788iquU",
  authDomain: "mi-tienda-21e0e.firebaseapp.com",
  projectId: "mi-tienda-21e0e",
  storageBucket: "mi-tienda-21e0e.appspot.com",
  messagingSenderId: "584680173408",
  appId: "1:584680173408:web:1d495352d6814decf3b805",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot);

  //if user data doesn't exist
    //create/ set the document with the data from userAuth in my collection
    
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc (userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
    //if user data exist
      //return userDocRef
  return userDocRef;

    
  

};
 