import React,{useState} from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import UseWindowDimensions from "./UseWindowDimensions";



function App() {
  //here we get user from useStateValue function and push/dispatch it into datalayer for easy access
  const [{user}, dispatch] = useStateValue();
  const { height, width } = UseWindowDimensions();


  return (
    <div className="app"> 
    {!user ? (
      //if user is null show login
      <Login />
    ):(
      //else show app__body
      <div className ="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
        </Switch>
        </Router>
      </div>
    )}
    </div>
  );
}

export default App;
