import {initializeApp} from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { getDatabase, ref, set, push, get, query, equalTo, orderByChild } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCMRhy9y4iEakKfCje4Y04d7JyhIKlWnz4",
    authDomain: "aumeow-web.firebaseapp.com",
    databaseURL: "https://aumeow-web-default-rtdb.firebaseio.com",
    projectId: "aumeow-web",
    storageBucket: "aumeow-web.firebasestorage.app",
    messagingSenderId: "593862275677",
    appId: "1:593862275677:web:39859722ee696afb1053b4"
};
const aplication = initializeApp(firebaseConfig);
const auth = getAuth(aplication);
const database = getDatabase(aplication);

export {auth, signInWithEmailAndPassword, orderByChild, createUserWithEmailAndPassword, database, ref, set, push, sendPasswordResetEmail, get, query, equalTo};