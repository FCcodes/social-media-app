import React from 'react'

import { Upload } from '../hooks/Upload'
import Progress from './Progress'

const AddImage = ({ setAddImage }) => {

    const [ image, setImage ] = React.useState(null)
    const [ uploadingImage, setUploadingImage ] = React.useState(false)
    const [ caption, setCaption ] = React.useState('')

    const types = ['image/png', 'image/jpeg']

    function handleClick(){
        if(image && types.includes(image.type)){
            setUploadingImage(true) 
        }else{
            console.log('image type not supported')
        }
        
    }

    
    return (
        <div className='imageSelector' >
            <input value={image} type='file' onChange={(e)=>{ setImage(e.target.files[0])}}/>

            {image? <div className="post" style={{margin: '0', padding: '0', display: 'flex', flexDirection: 'column'}}>
                <img src={`${image}`} alt={`${image.name}`} />
                <input value={ caption } onChange={(e)=> setCaption(e.target.value)} type="text" placeholder='Add caption'/>
            </div>: <></>}
            
            {uploadingImage? <Progress image={image} setImage={setImage} uploadingImage={uploadingImage} setUploadingImage={setUploadingImage} caption={ caption } setCaption={setCaption} />: <></>}       

            <button onClick={()=>handleClick()} >Post</button>         
        </div>
    )
}

export default AddImage
