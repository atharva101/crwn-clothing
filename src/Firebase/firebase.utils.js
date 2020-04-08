import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAdni7NtIF5S7hHP3LoS6jKS2Az8YXMf28",
    authDomain: "crwn-db-44ed1.firebaseapp.com",
    databaseURL: "https://crwn-db-44ed1.firebaseio.com",
    projectId: "crwn-db-44ed1",
    storageBucket: "crwn-db-44ed1.appspot.com",
    messagingSenderId: "1008984712541",
    appId: "1:1008984712541:web:f893f7a0576da29e6b34b4"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore =firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt :'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

