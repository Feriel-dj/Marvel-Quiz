import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore, doc} from 'firebase/firestore';
const Config = {

    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  
    authDomain: process.env.REACT_APP_Firebase_AUTH_DOMAIN,
  
    projectId: process.env.REACT_APP_Firebase_PROJECT_ID,
  
    storageBucket: process.env.REACT_APP_Firebase_STORAGE_BUCKET,
  
    messagingSenderId: process.env.REACT_APP_Firebase_MESSAGING_SENDER_ID,
  
    appId: process.env.REACT_APP_Firebase_API_ID
  
}
const app = initializeApp(Config);
export const auth = getAuth(app);
export const db = getFirestore();

export const user = uid => doc(db, `users/ ${uid}`);