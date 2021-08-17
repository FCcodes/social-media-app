import React from "react"

//NavBar Component
import NavBar from "../components/NavBar"
import Progress from "../components/Progress"

//Material-ui DropZone import
import { DropzoneArea } from "material-ui-dropzone"

//Material-ui imports
import { makeStyles, Grid, TextField, Button } from "@material-ui/core";

//Material-ui icons import
import { SendRounded } from '@material-ui/icons';

const useStyles = makeStyles({

    dropZone: {
        margin: '2% auto 2% auto',
        padding: '0px',
        width: '50%'
    },

    container: {
        margin: '0 auto 0 auto',
        width: '90%',        
    },

    item: {
        margin: '1% auto 1% auto',        
    },

    image: {
        maxWidth: '100%',
        height: '100%',
        borderRadius: '10px'
    }, 

    captionInputContainer: {
        margin: '2% auto 2% auto',
        width: '40%'
    },

    captionInput: {        
        width: '100%'
    },

    buttonContainer: {        
        margin: '1% auto 1% auto',
        height: '70%',
        width: '15%'
    }, 

    button: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: '10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
    }
})

const CreatePost = () => {

    const classes = useStyles()

    const [display, setDisplay] = React.useState(true)
    const [ image, setImage ] = React.useState(null)
    const [ uploadingImage, setUploadingImage ] = React.useState(false)
    const [ caption, setCaption ] = React.useState('')

    function uploadPost(){
        setUploadingImage(true)
    }

    return (
        <Grid container>
            <NavBar />
            <Grid item xs={12}>
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    filesLimit={1}
                    clearOnUnmount={true}
                    showPreviewsInDropzone={false}
                    showPreviews={true}
                    previewText=''
                    dropzoneClass={classes.dropZone}
                    previewGridClasses={{
                        container: classes.container,
                        item: classes.item,
                        image: classes.image
                    }}
                    getPreviewIcon={(file) => {
                        if (file.file.type.split('/')[0] === 'image')
                            return (
                                <img className={classes.image} role="presentation" src={file.data} />
                            );
                    }}
                    dropzoneText={'Drag and Drop your image here'}
                    onChange={(file) => {
                        if(file.length > 0){     
                            setDisplay(false)                                                 
                        }else{setDisplay(true)}                         

                    }}   
                    
                    onDrop={(file)=> setImage(file[0]) }
                    
                />
            </Grid>
            <Grid item xs={12} style={{backgroundColor: 'whitesmoke', height: 'auto'}}>
                <div className={classes.captionInputContainer}>
                    <TextField className={classes.captionInput} label="Add Caption" variant='outlined' disabled={display} onChange={(e)=> setCaption(e.target.value)} value={caption} />
                </div>                
            </Grid>
            <Grid item xs={12} style={{height: '10vh'}}>
                <div className={classes.buttonContainer}>
                    <Button className={classes.button} variant="contained" color="primary" endIcon={<SendRounded/>} disabled={display} onClick={()=> uploadPost()}>Post</Button>
                </div>  
                {uploadingImage? <Progress image={image} setImage={setImage} uploadingImage={uploadingImage} setUploadingImage={setUploadingImage} caption={ caption } setCaption={setCaption} />: <></>}              
            </Grid>                        
        </Grid>
    )
}

export default CreatePost
