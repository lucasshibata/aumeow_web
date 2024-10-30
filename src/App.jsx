import React from "react";
import "./App.css";
import { BrowserRouter } from  'react-router-dom';
import { initializeApp } from "firebase/app";
import Navigation from "./components/routes/Navigation.tsx";


export default function App(){
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
    return(
        <div className="App">
            <BrowserRouter> 
                <Navigation></Navigation>
            </BrowserRouter>
        </div>
    )
}