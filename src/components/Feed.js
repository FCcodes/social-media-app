import React from 'react'

import { makeStyles } from '@material-ui/core'
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@material-ui/core'

import { Share, Favorite, MoreVert, Message, BookmarkBorder } from '@material-ui/icons'

//react-router-dom import 
import { Link, useHistory } from 'react-router-dom'
import { red } from '@material-ui/core/colors';


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
    }
}));

const Feed = ({image, caption, postBy, setSelectedImg, docID}) => {

    const classes = useStyles()

    const history = useHistory()
    
    return (
        <Card onClick={()=> setSelectedImg({image, caption, postBy, docID})}>
            <CardHeader
                avatar={
                    <Avatar>{postBy}</Avatar>
                }

                title={
                    <Typography
                        className={classes.profile}
                        variant='h6'
                        onClick={()=>history.push(`/${postBy}`)}
                    >{postBy}</Typography>
                }

                action={
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                }
            />
            <CardMedia
                src={image}
                component='img'
            />
            <CardActions>
                <IconButton aria-label='like'>
                    <Favorite />
                </IconButton>
                <IconButton aria-label='comment '>
                    <Message />
                </IconButton>
                <IconButton className={classes.save}>
                    <BookmarkBorder />
                </IconButton>
            </CardActions>
            <CardContent>
                <Typography variant='body2'>{caption}</Typography>
            </CardContent>            
        </Card>
    )
}

export default Feed
