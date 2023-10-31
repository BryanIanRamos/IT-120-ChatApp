import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCGRzRzOt5hAjCVOWM_H__k0eQZ2tQ3oN4",
    authDomain: "mychatapp-7bee7.firebaseapp.com",
    projectId: "mychatapp-7bee7",
    storageBucket: "mychatapp-7bee7.appspot.com",
    messagingSenderId: "1062289252842",
    appId: "1:1062289252842:web:cd1aff881564d2c6711293",
    // measurementId: "G-4MTHPZ9VR3",
  })
  .auth();
