import React from 'react'
import { useUpload } from '../hooks/Upload'

//react-router imports
import { useHistory } from 'react-router'

//react-redux imports
import { useSelector } from 'react-redux'

const Progress = ({setUploadingImage, setImage, image, caption, setCaption}) => {

    let { progress, url } = useUpload(image, caption)

    const history = useHistory()
    const userName = useSelector(state => state.auth.userName)



    React.useEffect(()=>{
        if(url){
            setUploadingImage(false)
            setImage(null)
            setCaption('')
            history.push(`/${userName}`)
        }        
    }, [setImage, setUploadingImage, url])

    return (
        <div className="progress-bar" style={{height: '20px', width: progress + '%', backgroundColor: 'black', transition: 'all .5s ease-in-out'}}></div>
    )
}

export default Progress
