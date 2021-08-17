//react imports
import { useEffect, useState } from "react";

//import firebase auth, store and timestamp
import { auth, db, fireStorage, timeStamp } from "../firebase/firebase";


//react-redux imports
import { useDispatch } from "react-redux";

//authReducer imports
import { signIn } from "../reducers/authReducer";

export const signin = async (userName, email, password) => {
    let name = userName
    let userEmail
    let userID

    try {
        await auth.createUserWithEmailAndPassword(email, password)
            .then(async (res) => {
                userEmail = res.user.email
                userID = res.user.uid

                await db.collection('Accounts').doc(`${userID}`).set({
                    userName: name,
                    userEmail,
                    userID,
                    timeStamp: timeStamp()
                })

                let newStorageRef = fireStorage.ref(`${userID}`)

            })
            .catch((err) => console.log(err))


        return { name, userEmail, userID }

    } catch (err) {

        return console.log(err)

    }


}

export const useListenForSignedIn = async ({ setPending }) => {
    const dispatch = useDispatch()


    let name = ''
    let userEmail
    let userID

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {

            try{

                if (user) {                    

                    userEmail = user.email
                    userID = user.uid
    
                    db.collection('Accounts').doc(`${userID}`).onSnapshot(doc => {
    
                        if (doc.data()) {                            
                            name = doc.data().userName
                            dispatch(signIn({ name, userEmail, userID }))
                            setPending(false)
                        }

                        return doc
                    })                   
                    
    
                } else {
                    setPending(false)
                }

            }catch(err){
                console.log(err)
            }
                        
        })
    }, [])

}