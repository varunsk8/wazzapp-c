
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import reducer, { initialState } from './reducer';
import {StateProvider} from "./StateProvider";

// we wrap our app in stateprovider. stateprovider is like a data layer. 
// in data layer we push info(login) in datalayer and fetch info form datalayer from any componet
// when user sign in its info is pushed in datalayer and we can fetch its info from datalayer

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
