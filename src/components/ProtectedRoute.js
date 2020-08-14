import React from 'react';
import { Redirect } from 'react-router-dom'

function ProtectedRoute (props){
    const Component = props.component;
    const isAuthenticated = JSON.parse(localStorage.getItem('auth'))?true:false;
    //console.warn(isAuthenticated);

    return isAuthenticated ? ( 
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        ); 
} 

export default ProtectedRoute;
 