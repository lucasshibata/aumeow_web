import React from "react";
import RenderLogo from "./RenderLogo";
import { Link } from "react-router-dom";

export default function Footer(){
    const stylesContainer:React.CSSProperties = {
        backgroundColor: '#DEB2FB',
        display: 'flex',
        justifyContent: 'center',
        
    }
    const stylesContent:React.CSSProperties = {
        display:'flex',
        flexDirection: "column",
        alignItems:"center",
        flexGrow: 1,
        flex: '30%',
        boxSizing: 'border-box'
    }
    const stylesText:React.CSSProperties = {
        color: 'white'
    }

    return(
        <footer className="Footer" style={stylesContainer}>
            <div style={stylesContent}>
                <RenderLogo/>
                <h1>Aumeow</h1>
            </div>
            <div style={stylesContent}>
                <h2>nome:</h2>
                <h2>email:</h2>
                <h2>mensagem:</h2>
            </div>
            <div style={stylesContent}>
                <h1>Contato</h1>
                <h2>E-mail:</h2>
                <h3>aumeow.pets@gmail.com</h3>
                <h2>Whatsapp:</h2>
                <h3>(61) 98282-1772</h3>
            </div>
            <div style={stylesContent}>
                <h1>Navegação</h1>
                <Link to='/login' style={stylesText}>Home</Link><br/>
                <Link to='/login' style={stylesText}>Galeria da Fofura</Link><br/>
                <Link to='/login' style={stylesText}>Sobre nós</Link>
            </div>
        </footer>
    )
};