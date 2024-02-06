// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

import { FirebaseError } from '@firebase/util';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(firebaseApp);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export type UserAuth = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export const createUserDocumentFromAuth = async (userAuth: UserAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  let userSnapshot;
  try {
    userSnapshot = await getDoc(userDocRef);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log('Error getting user', error.code, error.message);
    }
  }

  if (userSnapshot && !userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('Error creating user', error.code, error.message);
      }
    }
  }

  return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callbackFn: (user: any) => void) => {
  return onAuthStateChanged(auth, callbackFn);
};
