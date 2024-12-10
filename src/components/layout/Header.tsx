import React from "react";
import RenderLogo from "../layout/RenderLogo";
import {Link, useLocation} from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import {signOut, auth} from '../firebase/Firebase';

export default function Header(){
    const stylesContainer:React.CSSProperties = {
        backgroundColor: '#DEB2FB',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-around',
        flexWrap:"wrap",
        paddingTop:'10px',
        paddingBottom:'10px',
        width:'100vw'
    }
    const stylesContent:React.CSSProperties = {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap:'20px',
        flexWrap:'wrap',
        height:'auto',
        width:'auto'
    }
    const stylesText:React.CSSProperties = {
        fontSize:'2rem',
        color: '#7360DF',
        margin:'0px',
        padding: '0px'
    }
    const stylesIcons:React.CSSProperties = {
        color: '#7360DF',
        fontSize:'1.4rem',
        margin:'0px',
        padding: '0px'
    }
    const stylesLogo:React.CSSProperties = {
        height:'100px',
        width:'150px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
    const stylesButton:React.CSSProperties = {
        backgroundColor: '#7360DF',
        color: 'white',
        fontSize:'1.4rem',
        border: '0px',
        borderRadius: '5px',
        padding: '5px',
    }
    const stylesInnerDiv:React.CSSProperties = {
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center',
        gap:'10px'
    }
    const location = useLocation();
    const showButtonOnRoutes = ["/EspecificProduct", "/ListaServicosPrestador", "/MenuPrestador", "/NavigationScreen", "/PetServices", "/RegistroProdutoPrestador", "/Shopping"];
    const shouldShowButton = showButtonOnRoutes.includes(location.pathname);
    const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log("Usuário deslogado com sucesso!");
        } catch (error) {
          console.error("Erro ao deslogar:", error);
        }
    };
    return(
        <header style={stylesContainer}>
            <div style={stylesContent}>
                <div style={stylesLogo}>
                    <RenderLogo/>
                </div>
                <h1>AuMeow</h1>
            </div>
            <div style={stylesContent}>
                <div style={stylesInnerDiv}>
                    <FaHome style={stylesIcons}/><Link to="/" style={stylesText}>Home</Link>
                </div>
                <div style={stylesInnerDiv}>
                    <FaUser style={stylesIcons}/><Link to="/Login" style={stylesText}>Entrar</Link>
                </div>
                {shouldShowButton && <div style={stylesInnerDiv}>
                    <FaSignOutAlt style={stylesIcons}/><button style={stylesButton} onClick={handleLogout}>Sair</button>
                    </div>}
            </div>
        </header>
    )
};