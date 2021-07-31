import React from 'react';
import { Button } from '@material-ui/core';
import "./Login.css";
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';

function Login() {

    // the const array has a state and dispatch.the dispatch is use to update the datalayer (datalayer info in index.js)
    const [{}, dispatch] = useStateValue();

    //google signin with popup using signIn function
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            //here we dispatch the info in datalayer is an actionType to indiacte SET_USER action and were set user we get from google auth stored in "result" which has user info in it
            dispatch ({
                type: actionType.SET_USER,
                user: result.user,
            })
        })
        //here we use reducer instead in using setting state to user at top lv because when using user to top lv it has to go throught all levels to get to low lv when needed there
        //so using datalayer we can just get user from it(in app.js)
        .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/> 
                
                <div className="login_text">
                    <h1>Sign in to Wazzapp</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign in With Google
                </Button>
            </div>
        </div>
    );
}

export default Login
