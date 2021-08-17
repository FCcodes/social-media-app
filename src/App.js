import './App.css';

//React-Router-Imports
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Page Imports
import Home from './pages/Home'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost';
import SignUp from './pages/SignUp'
import Profile from './components/Profile'
import UserProfile from './components/UserProfile';

//import private route
import PrivateRoute from './components/PrivateRoute';

//signin imports
import { useListenForSignedIn } from './hooks/signin'

//react-redux imports
import { useSelector } from 'react-redux'

import { useEffect, useState } from "react";

//material ui imports
import { CircularProgress } from "@material-ui/core";



function App() {

  const [pending, setPending] = useState(true)

  const state = useSelector(state => state.auth.signedIn)
  const userName = useSelector(state => state.auth.userName)

  useListenForSignedIn({ setPending })

  if (pending) {
    return (
      <> <CircularProgress /> </>
    )
  } else {
    return (
      <>
        <Router>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />                        
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/AddPost' component={CreatePost} />            
            <PrivateRoute exact path={`/${userName}`} component={UserProfile} />
            <PrivateRoute exact path={`/${userName}/edit`} component={UserProfile} />
            <PrivateRoute exact path='/:id' component={Profile} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
