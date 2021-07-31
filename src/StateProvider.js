
import React,{createContext, useContext, useReducer} from 'react';

//this is preparing/creating datalayer called context where data lives
export const StateContext = createContext();


// stateprovider is actual datalayer. it takes 3 things reducer, initialState, children.
// children is our app.
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);


    
// this is to pull info from datalayer
export const useStateValue = () => useContext(StateContext);
