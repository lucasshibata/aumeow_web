import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";

export default function MenuPrestador(){
    const navigate = useNavigate();
    return(
        <div className="Container">
            <Header/>
            <button onClick={()=>navigate('/RegistroServicoPrestador')}>ir para registro</button>
            <Footer/>
        </div>
        
    )
}