//firebase storage, db and timestamp import
import { fireStorage } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { timeStamp } from "../firebase/firebase"



import React from 'react'
import { useSelector } from "react-redux";

export function useUpload(image, caption) {

    const name = useSelector((state) => state.auth.userName)
    const userId = useSelector((state) => state.auth.userID)

    const postCollection = db.collection('Posts').doc()
    const usersPostFolder = fireStorage.ref(`${userId}/${image.name}`)

    const [progress, setProgress] = React.useState(null)
    const [url, setUrl] = React.useState(null)
    const [err, setErr] = React.useState(null)

    React.useEffect(() => {
        usersPostFolder.put(image)
            .on('state_changed',
                (snap) => {                    
                    let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
                    console.log(percentage)
                    setProgress(percentage)
                },
                (err) => {
                    console.log(err)
                },
                async () => {
                    let url = await usersPostFolder.getDownloadURL()
                    
                    await postCollection.set({
                        postedBy: name,
                        userID: userId,  
                        docID: postCollection.id,                   
                        url: url,
                        caption: caption,
                        timestamp: timeStamp()                        
                    })
                    setUrl(url)
                }
            )
    }, [image])


    return { url, progress }

}