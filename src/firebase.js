import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    
  //Replace your api information from google firebase
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
      
});

const db = firebase.firestore();

export default db;