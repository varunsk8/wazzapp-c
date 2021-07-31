import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyC6IF1c0-qkIoM9SqLfFvaYVVPH_l7WY70",
    authDomain: "wazzapp-c.firebaseapp.com",
    projectId: "wazzapp-c",
    storageBucket: "wazzapp-c.appspot.com",
    messagingSenderId: "124643789647",
    appId: "1:124643789647:web:5c2e39e6247a1b0a92d33a"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); 

export { auth, provider };
export default db;
