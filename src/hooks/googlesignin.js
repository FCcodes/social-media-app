import { auth, db, timeStamp } from '../firebase/firebase'
import firebase from '../firebase/firebase'


export const googleSignIn = async () => {

    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    try {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                console.log(result)
            }).catch((error) => {
                console.log(error)
            });
    } catch (err) {
        console.log(err)
    }

}