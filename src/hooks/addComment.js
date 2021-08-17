
//firebase import
import {db, timeStamp} from '../firebase/firebase'

//react-redux import
import { useSelector } from "react-redux";

function addComment(postedBy, image, comment, docID ){

    const docRef = db.collection('Posts').doc(docID).collection('comments')
        
    docRef.add({
        postedBy,
        comment,
        timestamp: timeStamp()
    })
    .then((res) => {res.forEach(doc=> console.log(doc.data()))})
    .catch((err)=> console.log(err))
}

export default addComment