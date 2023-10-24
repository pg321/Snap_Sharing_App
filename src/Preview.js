import React, { useEffect } from 'react'
import "./Preview.css";
import { useDispatch, useSelector } from 'react-redux';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from './firebase';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { selectuser } from './features/appSlice';


function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectuser)

    useEffect(() => {
        if(!cameraImage) {
            navigate("/")
            navigate(0)
        }
    }, [cameraImage, navigate])

    const closePreview = () => {
        dispatch(resetCameraImage());
    }

    const sendPost = () => {
        const id = uuidv4();
        const blob = fetch(cameraImage).then((response) => response.blob());
        const storage = getStorage();
        const storageRef = ref(storage, `posts/${id}`)
            console.log(cameraImage);


        // Create file metadata including the content type
        /*@type {any} */
        blob.then((imageBlob) => {
        const metadata = {
        contentType: 'image/jpeg'
        };

        // Upload the file and metadata
        const uploadTask = uploadBytesResumable(storageRef, imageBlob,  metadata);
        uploadTask.on('state_changed', 
        null,
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              addDoc(collection(db, "posts"), {
                imageUrl: url,
                username: user.username,
                read: false,
                profilePic:user.profilePic,
                timestamp: serverTimestamp(),
             });
              navigate("/chats");    
          });
        }
    )
        })
 };


  return (
    <div className="preview">
        <CloseIcon onClick={closePreview} className="preview__close"/>
        <div className="preview__toolbarRight">
            <TextFieldsIcon />
            <CreateIcon />
            <NoteIcon />
            <MusicNoteIcon />
            <AttachFileIcon />
            <CropIcon />
            <TimerIcon />
        </div>
        <img src={cameraImage} alt="" />
        <div onClick={sendPost} className="preview__footer">
            <h2>Send Now</h2>
            <SendIcon fontSize="small" className="preview__sendIcon"/>
        </div>
    </div>
  )
}

export default Preview;