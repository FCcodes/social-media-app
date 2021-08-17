import React from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
    const signIn = useSelector((state)=> state.auth.signedIn)
    
    return (
        <Route 
            { ...rest }

            render={(props)=>{
                if(signIn === true){
                    return <Component {...props} />
                }else{
                    console.log(signIn)
                    return <Redirect to='./signup'/>
                }
            }}
        />        
    )
}

export default PrivateRoute
