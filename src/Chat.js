import React from 'react';
import "./Chat.css"
import { Avatar } from '@mui/material';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from './features/appSlice';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

function Chat({id, profilePic, username, timestamp, imageUrl, read }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!read){
      dispatch(selectImage(imageUrl));
      setDoc(doc(collection(db, "posts"), id),
        {
          read: true,
        },
        {merge: true }
      );
      navigate("/chats/view");
    }
  }

  return (
    <div onClick={open} className="chat">
        <Avatar 
        className="chat__avatar"
        src={profilePic} />
        <div className="chat__info">
            <h4>{username}</h4>
            <p>{!read && "Tap to view -"}{" "}
            <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
        </div>
        {!read && <StopRoundedIcon className="chat__readIcon" /> } 
    </div>
  )
}

export default Chat;