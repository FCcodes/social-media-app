import React from 'react';

//material-ui imports
import { AppBar, Toolbar, Typography, IconButton, FormControlLabel, FormGroup, MenuItem, Menu, Button } from '@material-ui/core'

//material-ui icons imports
import { AccountCircle, AddRounded, ForumRounded } from '@material-ui/icons'
import MenuIcon from "@material-ui/icons/Menu";

//material-ui/styles import
import { makeStyles } from "@material-ui/core/styles";

//react-router imports
import { useHistory } from 'react-router';

//react-redux imports
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    grow: {
        flexGrow: 1,
    },
    nav: {       
        backgroundColor: 'black',        
    },
    iconButton: {
        margin: '0 1% 0 1%',        
    },
    icon: {
        color: 'white'
    },
    createPostButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: '10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
    }


});

function NavBar({setAddImage}) {

    const classes = useStyles()
    const history = useHistory()
    const userName = useSelector((state)=> state.auth.userName)

    

    return (
        <>
            
            <AppBar position="static" className={classes.nav}>
                <Toolbar>
                    <Typography variant='h6' component='h1' className={classes.grow} style={{cursor: 'pointer'}} onClick={()=>history.push('/')}>Instaclone</Typography>
                    <IconButton className={classes.iconButton}>
                        <ForumRounded className={classes.icon} />
                    </IconButton>
                    <IconButton onClick={()=>history.push(`/${userName}`)} className={classes.iconButton}>
                        <AccountCircle className={classes.icon} />
                    </IconButton>
                    <Button onClick={()=> history.push('AddPost')} className={classes.createPostButton} variant='contained' startIcon={ <AddRounded /> }  >Create Post</Button>
                </Toolbar>
            </AppBar>
            
        </>
    )
}
export default NavBar

