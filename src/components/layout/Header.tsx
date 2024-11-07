import React from "react";
import RenderLogo from "../layout/RenderLogo";
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
                <h1>AuMeow</h1>
            </div>
            <div style={styles.content}>
                <Link to="/Login" className="btn_home">Home</Link>
                <Link to="/Login" className="btn_servicos">Serviços</Link>
                <Link to="/Login" className="btn_loja">Loja</Link>
                <Link to="/Login" className="btn_usuario">Usuário</Link>
            </div>

        </header>
    )
};