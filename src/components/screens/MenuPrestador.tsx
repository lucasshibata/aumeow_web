import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";
import './MenuPrestador.css'

export default function MenuPrestador(){
    const navigate = useNavigate();
    return(
        <div className="Container" style={{background: "rgb(222, 178, 251)"}}>
            <Header/>
            <div className="main">
                <button onClick={()=>navigate('/RegistroServicoPrestador')}>ir para registro</button>
                <button onClick={()=>navigate('/ListaServicosPrestador')}>ir para lista de serviços</button>
            </div>
            <Footer/>
        </div>
        
    )
}