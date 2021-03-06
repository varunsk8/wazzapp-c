import React, {useState,useEffect} from 'react'
import { Avatar, IconButton } from "@material-ui/core";
//import SearchOutlined from '@material-ui/icons/SearchOutlined';
//import AttachFile from '@material-ui/icons/AttachFile';
//import MoreVert from '@material-ui/icons/MoreVert';
import {MoreVert,AttachFile,SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useParams } from 'react-router-dom';
import "./Chat.css"
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from "./StateProvider";
import UseWindowDimensions from "./UseWindowDimensions";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed]= useState("");
    const {roomId}= useParams();
    const [roomName , setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [emoji, setEmoji] = useState(false);
    const { height, width } = UseWindowDimensions();


    const addEmoji = (e) => {
        let emoji = e.native;
        setInput(input + emoji);
      };
      const checkEmojiClose = () => {
        if (emoji) {
          setEmoji(false);
        }
      };

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId)
            .onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ));

            db.collection("rooms").doc(roomId)
            .collection("messages")
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => 
                    doc.data()))
                ));
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    },  [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("U typed >>", input);

        db.collection('rooms').doc(roomId)
        .collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue
            .serverTimestamp(),
        });

        setInput(""); //this will clear the input box
    }

    return (
        <div className="chat">

            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen {''}
                    {new Date(
                        messages[messages.length - 1]?.
                        timestamp?.toDate())
                        .toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            
            <div className="chat__body">
                {messages.map(message =>
                    (
                        <p  //if name and user displayname is same show green bgcolor by setting classname as chat__reciver 
                            className={`chat__message ${
                                message.name === user.displayName 
                                && 'chat__reciever'
                                }`} >
                            <span className="chat__name">   {message.name}  </span>
                                {message.message}
                            <span className="chat__timestamp">  
                            {new Date(message.timestamp?.toDate
                                ()).toUTCString()}
                                </span>
                        </p>
                        
                    ))}
                
            </div>

            <div className="chat__footer">
            <IconButton>
                <InsertEmoticonIcon className="yellow"
                onClick={() => setEmoji(!emoji)} />

                {emoji ? <Picker onSelect={addEmoji} /> : null}
            </IconButton>
                <form>
                    <input 
                    value={input} 
                    onChange={(e) => 
                    setInput(e.target.value)} //this will get typed msg and put in value then input constant
                    type="text" placeholder="Type a message"
                    onClick={checkEmojiClose}/>

                    <button onClick={sendMessage} type="submit">Send</button>

                </form>
            <IconButton>
                <MicIcon/>
            </IconButton>
            </div>

            
        </div>
    )
}

export default Chat
