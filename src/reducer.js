
// this is how datalayer will b initally where user is not logged in (i.e. user: null)
export const initialState = {
    user: null,
};

// here we puch info in datalayer
export const actionType = {
    SET_USER: "SET_USER",
};

// here we see what info is pushed in datalayer 
const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        //if its SET_USER action then we return keep datalayer state same and change user to the sign in info that is pushed into datalayer
        case actionType.SET_USER:
            return{
                ...state,
                user: action.user,
            };
            //if its any action other than SET_USER we will return default state(i.e. nothing will happen)
        default:
            return state;
    }
};

export default reducer;
