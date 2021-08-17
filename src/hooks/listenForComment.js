//firebase imports
import { db } from "../firebase/firebase";

//react imports
import React, { useEffect, useState } from "react";

export default function useCommentListener(docId){

    const [ comments, setComments ] = useState('')
    const docRef = db.collection('Posts').doc(docId).collection('comments')

    useEffect(()=>{
        
        docRef.onSnapshot((snapshot)=>{
            let document = []

            snapshot.forEach(doc => {
                document.push({...doc.data()})
            })

            setComments(document)
        })
        
    }, [])

    return { comments }

}