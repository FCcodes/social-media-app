import firebase from "firebase/app";
import 'firebase/auth' 
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
let app = firebase.initializeApp({
    apiKey: "AIzaSyCCtk8xO09isxK_G5nBCkZ6indekHwrmkI",
    authDomain: "insta-clone-7eba4.firebaseapp.com",
    projectId: "insta-clone-7eba4",
    storageBucket: "insta-clone-7eba4.appspot.com",
    messagingSenderId: "247157275916",
    appId: "1:247157275916:web:6f62d439afc9633e421d29"
});

export let auth = app.auth()
export let db = app.firestore()
export let fireStorage = app.storage() 
export const timeStamp = firebase.firestore.FieldValue.serverTimestamp
export default firebase
