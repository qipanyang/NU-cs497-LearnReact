import React from 'react'; 
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBzBPdPV5G2JrPJJW0IfXDaSqPFYks-qvM",
    authDomain: "nu-cs497-learnreact.firebaseapp.com",
    databaseURL: "https://nu-cs497-learnreact.firebaseio.com",
    projectId: "nu-cs497-learnreact",
    messagingSenderId: "578559822014",
    appId: "1:578559822014:web:8e9fcfc524bea78ae4f6ef"
  };
  
firebase.initializeApp(firebaseConfig);
export const db = firebase.database().ref();

