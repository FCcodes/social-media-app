//react imports
import React from 'react'
import { useEffect } from "react";

//firestore import
import { db } from '../firebase/firebase'




export function usePostListener(){
    const [ posts, setPosts ] = React.useState([])
        
    useEffect(()=>{
        db.collection('Posts').onSnapshot((snapshot)=>{
            let documents = []
            snapshot.forEach(doc => {
                documents.push({...doc.data()})
            })

            setPosts(documents)           
        })           
    }, [])  
    
    return { posts }
}