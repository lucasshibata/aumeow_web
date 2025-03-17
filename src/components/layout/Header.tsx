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
        fontSize:'1.4rem',
        color: 'white',
        margin:'0px',
        padding: '0px',
        textDecoration:'none'
    }
    const stylesIcons:React.CSSProperties = {
        color: '#white',
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
        cursor: isHovering ? 'pointer' : 'default'
    }
    const stylesInnerDiv:React.CSSProperties = {
        backgroundColor:'#7360DF',
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center',
        gap:'10px',
        padding:'10px',
        borderRadius:'15px'
    }
    const location = useLocation();
    const showButtonOnRoutes = ["/EspecificProduct", "/CadastroProdutos", "/RegistroServicoPrestador", "/ListaProdutosPrestador", "/ListaServicosPrestador", "/MenuPrestador", "/MenuCliente","/MenuAdministracao", "/PetServices", "/RegistroProdutoPrestador", "/Shopping", "/Shopping/:ProdId"];
    const shouldShowButton = showButtonOnRoutes.some(route => 
        location.pathname.startsWith(route),location.pathname);
    const dontShow = !shouldShowButton;
    const showBack = ["/MenuCliente", "/MenuPrestador", "/MenuAdministracao"].includes(location.pathname);
    const showHome = ["/"].includes(location.pathname);
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
            {!showBack && shouldShowButton && <div onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)} style={stylesInnerDiv}>
                <FaArrowLeft style={stylesIcons}/>
                <button style={stylesButton} onClick={()=>navigate(-1)}>Voltar</button>
            </div>}
            <div style={stylesContent}>
                <div style={stylesLogo}>
                    <RenderLogo/>
                </div>
                <h1>AuMeow</h1>
            </div>
            <div style={stylesContent}>
                {!showHome &&<div style={stylesInnerDiv}>
                    <FaHome style={stylesIcons}/><Link to="/" style={stylesText}>Home</Link>
                </div>}
                {dontShow &&<div style={stylesInnerDiv}>
                    <FaUser style={stylesIcons}/><Link to="/Login" style={stylesText}>Entrar</Link>
                </div>}
                {shouldShowButton && <div onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)} style={stylesInnerDiv}>
                    <FaSignOutAlt style={stylesIcons}/><button style={stylesButton} onClick={handleLogout}>Sair</button>
                    </div>}
            </div>
        </header>
    )
};