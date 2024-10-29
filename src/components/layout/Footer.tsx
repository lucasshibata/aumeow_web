import React from "react";
import RenderLogo from "./RenderLogo.tsx";
import { Link } from "react-router-dom";

export default function Footer(){
    const styles = {
        container:{
            backgroundColor: '#DEB2FB',
            display: 'flex',
            justifyContent: 'center',
            gap:100
        },
        content:{
            
        },
        texto:{
            color: 'white'
        }
    }
    return(
        <footer className="Footer" style={styles.container}>
            <div style={styles.content}>
                <RenderLogo/>
                <h1>Aumeow</h1>
            </div>
            <div style={styles.content}>
                <h2>nome:</h2>
                <h2>email:</h2>
                <h2>mensagem:</h2>
            </div>
            <div style={styles.content}>
                <h1>Entre em contato</h1>
                <h2>E-mail:</h2>
                <h3>aumeow.pets@gmail.com</h3>
                <h2>Whatsapp:</h2>
                <h3>(61) 98282-1772</h3>
            </div>
            <div style={styles.content}>
                <h1>Navegação</h1>
                <Link to='/login' style={styles.texto}>Home</Link><br/>
                <Link to='/login' style={styles.texto}>Galeria da Fofura</Link><br/>
                <Link to='/login' style={styles.texto}>Sobre nós</Link>
            </div>
        </footer>
    )
};