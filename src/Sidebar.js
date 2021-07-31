import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './Sidebar.css';
import SidebarChat from "./SidebarChat"
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import UseWindowDimensions from "./UseWindowDimensions";


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    
    //we get user info easily now because of datalayer
    const [{ user }, dispatch] = useStateValue();

    const { height, width } = UseWindowDimensions();

    useEffect(() => {
        db.collection("rooms").onSnapshot((snapshot)=> (
            setRooms(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )
            ))
        ));
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                    <ChatIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon/>
                    <input placeholder="Search" type="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                  <SidebarChat key={room.id} id={room.id} 
                  name={room.data.name} />  
                ))}
            
            </div>

        </div>
    )
}

export default Sidebar;