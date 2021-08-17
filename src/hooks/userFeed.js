import React from 'react'

import { db } from '../firebase/firebase'
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function useFetchCurrentUserContent(name){
    
    //const userName = useSelector((state)=>state.auth.userName)
    const [ posts, setPosts ] = React.useState([])
    const [ profile, setProfile ] = React.useState({})

    useEffect(()=>{
        let docs = []
        let userProfile = {}
        try{
            db.collection('Posts').where('postedBy', '==', name).orderBy("timestamp", "desc").onSnapshot(snapShot => {
                snapShot.forEach((doc)=> docs.push(doc.data())) 
                setPosts(docs) 
            }) 
            
            db.collection('Accounts').where('userName', '==', name).get()
            .then((snapshot) => snapshot.forEach(doc => {                
                userProfile.name = doc.data().userName 
                setProfile(userProfile)
            }))
            .catch(err => console.log(err))
        }catch(err){
            console.log(err)
        }
        
    }, [])

    return{ posts, profile }
}

