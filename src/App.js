import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectuser } from './features/appSlice';
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
                username: authUser.displayName,
                profilePic: authUser.photoURL,
                id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    })
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <img 
          className="app__logo"
          src="https://clipartmag.com/image/snapchat-logo-drawing-31.png" 
          alt="" 
          />
          <div className="app__body">
              <div className="app__bodyBackground">
              <Routes>
              <Route path="/chats/view" element={<ChatView />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/" element={<WebcamCapture />} />
          </Routes>
            </div>
          </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
