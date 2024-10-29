import React from "react";
import RenderLogo from "../layout/RenderLogo.tsx";
import {Link} from "react-router-dom";

export default function Header(){
    const styles = {
        container:{
            backgroundColor: '#DEB2FB',
            display: 'flex',
            justifyContent: 'space-around'
        },
        content:{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap:15,
        },
        texto:{
            color: 'white'
        }
    }
    return(
        <header className="Header" style={styles.container}>
            <div style={styles.content}>
                <RenderLogo/>
                <h1>Aumeow</h1>
            </div>
            <div style={styles.content}>
                <Link to="/Login" style={styles.texto}>Home</Link>
                <Link to="/Login" style={styles.texto}>Serviços</Link>
                <Link to="/Login" style={styles.texto}>Loja</Link>
                <Link to="/Login" style={styles.texto}>Usuário</Link>
            </div>
        </header>
    )
};