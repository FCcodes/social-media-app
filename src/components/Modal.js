import React from 'react'

import { makeStyles } from '@material-ui/core'
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, TextField, Button } from '@material-ui/core'

import { Favorite, MoreVert, Message, BookmarkBorder } from '@material-ui/icons'

//Component imports
import Comment from './Comment'

//react-router-dom import 
import { useHistory } from 'react-router-dom'
import { red } from '@material-ui/core/colors'

//react-redux
import { useSelector } from 'react-redux'

//addComment function
import addComment from '../hooks/addComment'

//listen to comment hook
import useCommentListener from '../hooks/listenForComment'



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    save: {
        marginLeft: 500,
    },
    avatar: {
        backgroundColor: red[500],
    },
    profile: {
        cursor: 'pointer',
    },
    
    img: {
        margin: '1% auto 1% auto',
        width: '90%',
        borderRadius: '10px'
    },

    /* modal styles */
    backdrop: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        minHeight: '100%',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        display: 'flex',        
    },

    modal: {
        margin: 'auto',
        padding: '5px',
        position: 'relative',
        display: 'block',
        maxWidth: '30vw',
        maxHeight: '80vh',
        overflowY: 'scroll',
        zIndex: '100',
        " &::-webkit-scrollbar": {
            display: 'none',
        },          
        /* Hide scrollbar for IE, Edge and Firefox */
        
        msOverflowStyle: 'none',  /* IE and Edge */
        scrollbarWidth: 'none',  /* Firefox */
    
    },

    noScroll: {
        " &::-webkit-scrollbar": {
            display: 'none',
        },          
        /* Hide scrollbar for IE, Edge and Firefox */        
        msOverflowStyle: 'none',  /* IE and Edge */
        scrollbarWidth: 'none',  /* Firefox */        
    },

    captionInputContainer: {
        margin: '5% auto 5% auto',
        width: '100%',
        height: 'auto'
    },

    captionInput: {        
        minWidth: '100%',
        minHeight: '100%'
    },
}))

const Modal = ({ selectedImg, setSelectedImg }) => {
    //console.log(selectedImg)

    let { comments } = useCommentListener(selectedImg.docID)

    const classes = useStyles()

    const history = useHistory()

    const [makeComment, setMakeComment] = React.useState(false)
    const [comment, setComment] = React.useState('')
    const userName = useSelector((state) => state.auth.userName)
    console.log(comments)

    function displayComments(){
        let arr = []

        arr = comments.map((comment)=>{
            return (
                <Comment key={comment.timestamp + Math.floor(Math.random() * 100)} comment={comment.comment} postedBy={comment.postedBy} />
            )
        })

        return arr
    }

    return (
        <div id="backdrop" className={classes.backdrop} onClick={(e) => {
            if (e.target.id === 'backdrop') {
                setSelectedImg(null)
                return
            }
            return
        }}>
            <div className={classes.modal}>
                <Card>
                    <CardHeader

                        avatar={
                            <Avatar>{selectedImg.postBy}</Avatar>
                        }

                        title={
                            <Typography
                                className={classes.profile}
                                variant='h6'
                                onClick={() => history.push(`/${selectedImg.postBy}`)}
                            >{selectedImg.postBy}</Typography>
                        }

                        action={
                            <IconButton>
                                <MoreVert />
                            </IconButton>
                        }
                    />
                    <CardMedia
                        className={classes.img}
                        src={selectedImg.image}
                        component='img'
                    />
                    <CardActions>
                        <IconButton aria-label='like'>
                            <Favorite />
                        </IconButton>
                        <IconButton aria-label='comment ' onClick={() => setMakeComment(state => !state)}>
                            <Message />
                        </IconButton>
                        <IconButton className={classes.save}>
                            <BookmarkBorder />
                        </IconButton>
                    </CardActions>
                    <CardContent>
                        <Typography variant='body2'>{selectedImg.caption}</Typography>
                    </CardContent>

                    {/* comment section */}
                    

                    {makeComment &&
                        <CardContent style={{margin: '5%', padding: '1%', backgroundColor: 'rgb(209, 209, 209)', borderRadius: '10px', height: '55vh', overflowY: 'scroll'}} className={classes.noScroll}>
                            <h4 style={{margin: '3% 1% 3% 1%'}}>Comments</h4>
                            <div style={{margin: '0', padding: '1%', backgroundColor: 'whitesmoke', height: '70%', borderRadius: '10px', overflowY: 'scroll'}} className={classes.noScroll}>
                                {comments.length > 0 ? displayComments() : <></>}                                
                            </div>
                            <div className={classes.captionInputContainer}>
                                <TextField className={classes.captionInput} label="Comment" variant='outlined' onChange={(e) => setComment(e.target.value)} value={comment} />                                
                            </div>
                            <Button style={{backgroundColor: 'whitesmoke'}} onClick={async()=> {
                                if(comment !== ''){
                                    await addComment(userName, selectedImg.image, comment, selectedImg.docID)
                                    setMakeComment('')
                                    }}}>Post</Button>
                        </CardContent>
                    }

                </Card>w
            </div>
        </div>
    )
}

export default Modal
