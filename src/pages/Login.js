import React from 'react'

//react-router-dom imports
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

//material ui imports
import {Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container} from '@material-ui/core';
import Links from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles';

//login import 
import { logIn } from '../hooks/logIn'

//react-redux
import { useDispatch } from 'react-redux'

//signIn reducer
import { signIn } from '../reducers/authReducer'


function Copyright() {

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Links color="inherit" href="https://material-ui.com/">
                Your Website
            </Links>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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

function Login() {

    const [ email, setEmail ] = React.useState('')
    const [ password, setPassword ] = React.useState('')

    const history = useHistory()

    const dispatch = useDispatch()

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={async()=>{
                            let {name, userEmail, userID} =  await logIn(email, password)
                            dispatch(signIn({name, userEmail, userID}))
                            history.push('/')
                        }}
                    >
                        LogIn
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Links href='#' variant="body2">
                                Forgot password?
                            </Links>
                        </Grid>
                        <Grid item>
                            <Link to='signup' variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Login
