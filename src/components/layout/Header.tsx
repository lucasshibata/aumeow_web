import React, {useState} from "react";
import RenderLogo from "../layout/RenderLogo";
import {Link, useLocation} from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import {signOut, auth} from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

export default function Header(){
    const navigate = useNavigate()
    const [isHovering, setIsHovering] = useState(false);
    
    const stylesContainer:React.CSSProperties = {
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        flexWrap:"wrap",
        width:'98%',
    }
    const stylesHeader:React.CSSProperties = {
        backgroundColor: 'var(--marrom-bg)',
        display: 'flex',
        alignItems:'center',
        width: "100%",
        paddingLeft:"1%"
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
    const isSobreNos = location.pathname === "/SobreNos";
    const isHome = location.pathname === "/"; 
    const isMenuCliente = location.pathname ==='/MenuCliente'
    const isShopping = location.pathname ==='/Shopping' 
    const isPetServices = location.pathname ==='/PetServices' 
    const isMenuPrestador = location.pathname ==='/MenuPrestador' 
    const isServicosPrestador = location.pathname ==='/ListaServicosPrestador' 
    const isEspecificProduct = location.pathname ==='/Shopping/:ProdId' 
    const isRegistroServicoPrestador = location.pathname ==='/RegistroServicoPrestador' 
    const isCadastroProdutos = location.pathname ==='/CadastroProdutos' 
    const isListaProdutosPrestador = location.pathname ==='/ListaProdutosPrestador' 
    const isChat = location.pathname ==='/Chat/:PrestadorId/:ClienteId'
    const isMenuAdministracao = location.pathname ==='/MenuAdministracao'
    const isListaDeChats = location.pathname ==='/ListaDeChats' 
    const isDenuncia = location.pathname ==='/Denuncia' 
    const isCadastroContasAdministracao = location.pathname ==='/CadastroContasAdministracao' 
    const isPerfilDeUsuario = location.pathname ==='/PerfilDeUsuario'
    const isEdicaoPerfil = location.pathname ==='/EdicaoPerfil'
    const isCadastroDeAdocao = location.pathname ==='/CadastroDeAdocao'
    const isPaginaDeAdocao = location.pathname ==='/PaginaDeAdocao' 
    
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
        <header style={stylesHeader}>
            <div style={stylesContainer}>
                {(isSobreNos || isShopping || isPetServices || isServicosPrestador || isEspecificProduct ||
                 isRegistroServicoPrestador || isCadastroProdutos || isListaProdutosPrestador || isChat || 
                 isListaDeChats || isDenuncia || isCadastroContasAdministracao || isPerfilDeUsuario || 
                 isEdicaoPerfil || isCadastroDeAdocao || isPaginaDeAdocao) &&(
                    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} style={stylesInnerDiv}>
                        <FaArrowLeft style={stylesIcons}/>
                        <button style={stylesButton} onClick={()=>navigate(-1)}>Voltar</button>
                    </div>
                )}
                {/* =========================================== */}
                <div style={stylesContent}>
                    <div style={stylesLogo}>
                        <RenderLogo/>
                    </div>
                    <h1 style={stylesTitleText}>AuMeow</h1>
                </div>
                {/* ============================================= */}
                <div style={stylesContent}>
                    {(isMenuPrestador || isMenuCliente || isMenuAdministracao) && (
                        <div style={stylesInnerDiv}>
                            <FaHome style={stylesIcons}/><Link to="/" style={stylesText}>Home</Link>
                        </div>
                    )}
                    {/* =========================================== */}
                    {(isSobreNos || isHome) && (
                        <div style={stylesInnerDiv}>
                            <FaUser style={stylesIcons}/><Link to="/Login" style={stylesText}>Entrar</Link>
                        </div>
                    )}
                    {/* =============================================== */}
                    {(isMenuPrestador || isMenuCliente || isMenuAdministracao || isShopping || isPetServices ||
                     isServicosPrestador || isEspecificProduct || isRegistroServicoPrestador || 
                     isCadastroProdutos || isListaProdutosPrestador || isChat || isListaDeChats || isDenuncia ||
                      isCadastroContasAdministracao || isPerfilDeUsuario || isEdicaoPerfil || 
                      isCadastroDeAdocao || isPaginaDeAdocao) && (
                        <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} style={stylesInnerDiv}>
                            <FaSignOutAlt style={stylesIcons}/><button style={stylesButton} onClick={handleLogout}>Sair</button>
                        </div>
                    )}
                    {/* ================================================== */}
                    {(isMenuPrestador || isMenuCliente || isMenuAdministracao || isShopping || isPetServices ||
                     isServicosPrestador || isEspecificProduct || isRegistroServicoPrestador || 
                     isCadastroProdutos || isListaProdutosPrestador || isChat || isListaDeChats || 
                     isDenuncia || isCadastroContasAdministracao || isPerfilDeUsuario || isEdicaoPerfil || 
                     isCadastroDeAdocao || isPaginaDeAdocao) && (
                        <div style={stylesInnerDiv}>
                            <CgProfile style={stylesIcons}/><Link to="/PerfilDeUsuario" style={stylesText}>Perfil</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
};