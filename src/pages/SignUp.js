import React, { useState } from 'react'

//import react-router components
import { Link, useHistory } from 'react-router-dom';

//signin functions
import { signin } from '../hooks/signin';
import { googleSignIn } from '../hooks/googlesignin';

//imports form react-redux
import { useDispatch } from 'react-redux';

//import from reducers
import { signIn } from '../reducers/authReducer';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Links from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Links color="inherit" href="https://material-ui.com/">
                Your Website
            </Links>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80)',
        backgroundRepeat: 'no-repeat', 
        imageRendering: 'crisp-edges',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp() {
    const classes = useStyles();
    const [ userName, setUserName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        
        if(userName && email && password){
            let  { name, userEmail, userID }  = await signin(userName, email, password)
            setUserName('')
            setEmail('')
            setPassword('')
            dispatch(signIn({name, userEmail, userID}))
            history.push('/')
        }
    }

    async function handleGoogleSignIn(){
        googleSignIn()        
    }

    
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>                    
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="UserName"
                            name="text"
                            type="text"
                            autoComplete="text"
                            autoFocus
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth                            
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"  
                            value={email}                          
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Create Account
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Links href="#" variant="body2">
                                    Forgot password?
                                </Links>
                            </Grid>
                            <Grid item>
                                Already have an account? <Link to='/login'>Login</Link>
                            </Grid>                           
                        </Grid>
                        <Box mt={5}>   
                            <div className="google" style={{margin: '3%', display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                                <span><h4>- or -</h4></span>
                                <span><button onClick={handleGoogleSignIn} style={{margin: '2%', padding: '2%', border: 'none', outline: 'none'}} >Google</button></span>                               
                            </div>                         
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default SignUp
