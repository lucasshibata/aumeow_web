import React from "react";
import "./App.css";
import { BrowserRouter } from  'react-router-dom';

import Navigation from "./components/routes/Navigation.tsx";


export default function App(){
    return(
        <div className="App">
            <BrowserRouter> 
                <Navigation></Navigation>
            </BrowserRouter>
        </div>
    )
}