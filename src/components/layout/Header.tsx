import React from "react";
import RenderLogo from "../layout/RenderLogo";
import {Link} from "react-router-dom";

export default function Header(){
    const stylesContainer:React.CSSProperties = {
        backgroundColor: '#DEB2FB',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap:"wrap",
        paddingBottom:10
    }
    const stylesContent:React.CSSProperties = {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap:15,
        flexWrap:'wrap'
    }
    const stylesText:React.CSSProperties = {
        fontSize:'1.4rem'
    }
    return(
        <header className="Header" style={stylesContainer}>
            <div style={stylesContent}>
                <RenderLogo/>
                <h1>AuMeow</h1>
            </div>
            <div style={stylesContent}>
                <Link to="/Login" className="btn_home" style={stylesText}>Home</Link>
                <Link to="/Login" className="btn_servicos" style={stylesText}>Serviços</Link>
                <Link to="/Login" className="btn_loja" style={stylesText}>Loja</Link>
                <Link to="/Login" className="btn_usuario" style={stylesText}>Usuário</Link>
            </div>
        </header>
    )
};