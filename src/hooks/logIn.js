//firebase imports
import { auth, timeStamp, db } from "../firebase/firebase";
import { useEffect } from "react";

export async function logIn(email, password) {

    let name = ''
    let userEmail 
    let userID 

    
    try{
        auth.signInWithEmailAndPassword(email, password)
        .then(async (user) => {
            userEmail = user.email
            userID = user.uid
            
            await db.collection('Accounts').doc(`${userID}`).get()
            .then((doc)=> name = doc.data().name)

        })
        .catch((error) => {
            console.log(error)
        });
    }catch(err){
        console.log(err)
    }        
    
    return {name, userEmail, userID}
}