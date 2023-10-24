import React, { useEffect } from 'react'
import "./Login.css"
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import { login } from './features/appSlice';

function Login() {

    const dispatch = useDispatch();

    const signIn = () => {
        signInWithPopup(auth, provider).then(result => {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            }))
        }).catch(error => alert(error.message));
    };
  return (
    <div className="login">
        <div className="login__container">
            <img src="https://images.tenorshare.com/topics/iphone-data/snapchat.png" alt="" />
            <Button variant="outlined" onClick={signIn}>Sign In</Button>
        </div>
    </div>
  )
}

export default Login;