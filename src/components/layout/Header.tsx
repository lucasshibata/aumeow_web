import React, {useState} from "react";
import RenderLogo from "../layout/RenderLogo";
import {Link, useLocation} from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import {signOut, auth} from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';

export default function Header(){
    const navigate = useNavigate()
    const [isHovering, setIsHovering] = useState(false);
    
    const stylesContainer:React.CSSProperties = {
        backgroundColor: 'var(--marrom-bg)',
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
        fontSize:'1.4rem',
        color: 'var(--branco)',
        margin:'0px',
        padding: '0px',
        fontFamily: 'var(--fonte-texto)',
        textDecoration:'none'
    }
    const stylesTitleText:React.CSSProperties = {
        fontSize:'2.3rem',
        color: 'var(--branco)',
        margin:'0px',
        padding: '0px',
        fontFamily: 'var(--fonte-texto)',
        textDecoration:'none'
    }
    const stylesIcons:React.CSSProperties = {
        color: 'var(--branco)',
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
        backgroundColor: 'var(--marrom-btn)',
        color: 'var(--branco)',
        fontSize:'1.4rem',
        border: '0px',
        cursor: isHovering ? 'pointer' : 'default'
    }
    const stylesInnerDiv:React.CSSProperties = {
        backgroundColor:'var(--marrom-btn)',
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center',
        gap:'10px',
        padding:'15px',
        borderRadius:'15px'
    }
    const location = useLocation();
    const telasMostrarEntrar = ["/Login", "/", "/CreateUser", "/CadastroDono", "/CadastroPrestador", "/RecoverPassword", "/SobreNos"];
    const mostrarEntrar = telasMostrarEntrar.includes(location.pathname);
    // telasMostrarEntrar.some(route => location.pathname.startsWith(route),location.pathname);
    const telasMenus = ["/MenuCliente", "/MenuPrestador", "/MenuAdministracao"]
    const mostrarVoltar = telasMenus.includes(location.pathname);
    const mostrarOutros = !mostrarEntrar;
    const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log("Usuário deslogado com sucesso!");
          navigate("/Login");
        } catch (error) {
          console.error("Erro ao deslogar:", error);
        }
    };
    return(
        <header style={stylesContainer}>

            {!mostrarVoltar && !mostrarEntrar && <div onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)} style={stylesInnerDiv}>
                <FaArrowLeft style={stylesIcons}/>
                <button style={stylesButton} onClick={()=>navigate(-1)}>Voltar</button>
            </div>}
            {/* =========================================== */}
            <div style={stylesContent}>
                <div style={stylesLogo}>
                    <RenderLogo/>
                </div>
                <h1 style={stylesTitleText}>AuMeow</h1>
            </div>
            {/* ============================================= */}
            <div style={stylesContent}>
                {mostrarOutros &&<div style={stylesInnerDiv}>
                    <FaHome style={stylesIcons}/><Link to="/" style={stylesText}>Home</Link>
                </div>}
                {/* =========================================== */}
                {mostrarEntrar &&<div style={stylesInnerDiv}>
                    <FaUser style={stylesIcons}/><Link to="/Login" style={stylesText}>Entrar</Link>
                </div>}
                {/* =============================================== */}
                {mostrarOutros && <div onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)} style={stylesInnerDiv}>
                    <FaSignOutAlt style={stylesIcons}/><button style={stylesButton} onClick={handleLogout}>Sair</button>
                    </div>}
            </div>
        </header>
    )
};