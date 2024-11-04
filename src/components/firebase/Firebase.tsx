import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMRhy9y4iEakKfCje4Y04d7JyhIKlWnz4",
    authDomain: "aumeow-web.firebaseapp.com",
    databaseURL: "https://aumeow-web-default-rtdb.firebaseio.com",
    projectId: "aumeow-web",
    storageBucket: "aumeow-web.firebasestorage.app",
    messagingSenderId: "593862275677",
    appId: "1:593862275677:web:39859722ee696afb1053b4"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};