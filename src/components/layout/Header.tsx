import React, { useState, useEffect } from "react";
import RenderLogo from "../layout/RenderLogo";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { signOut, auth } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

export default function Header() {
    const navigate = useNavigate()
    const [isHovering, setIsHovering] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    function useWindowWidth() {
        const [width, setWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return width
    }

    const width = useWindowWidth();
    const isMobile = width <= 768;

    const stylesHeader: React.CSSProperties = {
        backgroundColor: 'var(--marrom-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1%',
        position: 'relative',
        height: isMobile ? '70px' : '100px',
        width: '98%',
    }

    const stylesContent: React.CSSProperties = {
        display: 'flex',
        alignItems: isMobile ? 'center' : 'center',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        flexDirection: isMobile ? 'column' : 'row',
        height: 'auto',
        width: 'auto'
    }
    const stylesLogoTitleContainer: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flex: '1',
        paddingLeft: isMobile ? '10px' : '0',
    }

    const stylesLogo: React.CSSProperties = {
        height: isMobile ? '50px' : '80px',
        width: isMobile ? '75px' : '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const stylesTitleText: React.CSSProperties = {
        fontSize: isMobile ? '1.5rem' : '2.3rem',
        color: 'var(--branco)',
        margin: 0,
        fontFamily: 'var(--fonte-texto)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
    }

    const stylesMobileMenuButton: React.CSSProperties = {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.8rem',
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1100,
        cursor: 'pointer',
    }

    const stylesMobileMenu: React.CSSProperties = {
        position: 'absolute',
        top: isMobile ? '70px' : '100px',
        right: 0,
        backgroundColor: 'var(--marrom-bg)',
        width: '200px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        borderRadius: '0 0 0 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px 15px',
        zIndex: 1050,
    }

    const stylesInnerDiv: React.CSSProperties = {
        backgroundColor: 'var(--marrom-btn)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '10px',
        cursor: 'pointer',
    }
    const stylesIcons: React.CSSProperties = {
        color: 'var(--branco)',
        fontSize: '1.4rem',
        margin: '0px',
        padding: '0px'
    }
    const stylesText: React.CSSProperties = {
        backgroundColor: 'var(--marrom-btn)',
        color: 'var(--branco)',
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        gap: "10px",
        borderRadius: "10px",
        fontSize: '1.4rem',
        margin: '0px',
        padding: '10px 15px',
        fontFamily: 'var(--fonte-texto)',
        textDecoration: 'none',
        cursor: isHovering ? 'pointer' : 'default',
        border: '0px',
    }

    const location = useLocation();
    const isSobreNos = location.pathname === "/SobreNos";
    const isHome = location.pathname === "/TelaInicial";
    const isMenuCliente = location.pathname === '/MenuCliente';
    const isShopping = location.pathname === '/Shopping';
    const isPetServices = location.pathname === '/PetServices';
    const isMenuPrestador = location.pathname === '/MenuPrestador';
    const isServicosPrestador = location.pathname === '/ListaServicosPrestador';
    const isEspecificProduct = location.pathname === '/Shopping/:ProdId';
    const isRegistroServicoPrestador = location.pathname === '/RegistroServicoPrestador';
    const isCadastroProdutos = location.pathname === '/CadastroProdutos';
    const isListaProdutosPrestador = location.pathname === '/ListaProdutosPrestador';
    const isChat = location.pathname.startsWith('/Chat/');
    const isMenuAdministracao = location.pathname === '/MenuAdministracao';
    const isListaDeChats = location.pathname === '/ListaDeChats';
    const isDenuncia = location.pathname === '/Denuncia';
    const isCadastroContasAdministracao = location.pathname === '/CadastroContasAdministracao';
    const isPerfilDeUsuario = location.pathname === '/PerfilDeUsuario';
    const isEdicaoPerfil = location.pathname === '/EdicaoPerfil';
    const isCadastroDeAdocao = location.pathname === '/CadastroDeAdocao';
    const isPaginaDeAdocao = location.pathname === '/PaginaDeAdocao';

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Usuário deslogado com sucesso!");
            navigate("/Login");
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };
    return (
        <header style={stylesHeader}>
            {/* {(isSobreNos || isShopping || isPetServices || isServicosPrestador || isEspecificProduct ||
                isRegistroServicoPrestador || isCadastroProdutos || isListaProdutosPrestador || isChat ||
                isListaDeChats || isDenuncia || isCadastroContasAdministracao || isPerfilDeUsuario ||
                isEdicaoPerfil || isCadastroDeAdocao || isPaginaDeAdocao) && (
                    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} style={stylesInnerDiv}>
                        <FaArrowLeft style={stylesIcons} />
                        <button style={stylesButton} onClick={() => navigate(-1)}>Voltar</button>
                    </div>
                )} */}
            {/* =========================================== */}
            <div style={stylesLogoTitleContainer}>
                <div style={stylesLogo}>
                    <RenderLogo />
                </div>
                <h1 style={stylesTitleText}>AuMeow</h1>
            </div>
            {/* ============================================= */}
            {isMobile && (
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={stylesMobileMenuButton}
                    aria-label="Abrir menu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            )}
            {(!isMobile) && (
                <div style={{ ...stylesContent, flexWrap: 'nowrap', justifyContent: 'flex-end' }}>
                    <div style={stylesContent}>
                        {(!isHome && !isMenuCliente && !isMenuPrestador) &&
                            (
                                <div style={stylesInnerDiv} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                                    <Link to="/" style={stylesText}><FaHome style={stylesIcons} /> Home</Link>
                                </div>
                            )}
                        {(isSobreNos || isHome) && (
                            <div style={stylesInnerDiv} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                               <Link to="/Login" style={stylesText}> <FaUser style={stylesIcons} /> Entrar</Link>
                            </div>
                        )}
                        {(isMenuPrestador || isMenuCliente || isMenuAdministracao || isShopping || isPetServices ||
                            isServicosPrestador || isEspecificProduct || isRegistroServicoPrestador ||
                            isCadastroProdutos || isListaProdutosPrestador || isChat || isListaDeChats ||
                            isDenuncia || isCadastroContasAdministracao || isEdicaoPerfil ||
                            isCadastroDeAdocao || isPaginaDeAdocao) && (
                                <div style={stylesInnerDiv} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                                    <Link to="/PerfilDeUsuario" style={stylesText}><CgProfile style={stylesIcons} /> Perfil</Link>
                                </div>

                            )}
                        {(isMenuPrestador || isMenuCliente || isMenuAdministracao || isShopping || isPetServices ||
                            isServicosPrestador || isEspecificProduct || isRegistroServicoPrestador ||
                            isCadastroProdutos || isListaProdutosPrestador || isChat || isListaDeChats || isDenuncia ||
                            isCadastroContasAdministracao || isPerfilDeUsuario || isEdicaoPerfil ||
                            isCadastroDeAdocao || isPaginaDeAdocao) && (
                                <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} style={stylesInnerDiv}>
                                    <button style={stylesText} onClick={handleLogout}><FaSignOutAlt style={stylesIcons} /> Sair</button>
                                </div>


                            )}
                    </div>
                </div>
            )}

            {isMobile && isMobileMenuOpen && (
                <nav style={stylesMobileMenu}>
                    {(!isHome || !isMenuCliente || !isMenuPrestador) &&
                        (<Link to="/" style={stylesInnerDiv} onClick={() => setIsMobileMenuOpen(false)}>
                            <FaHome style={stylesIcons} /> <span style={stylesText}> Home </span>
                        </Link>)
                    }
                    {(isSobreNos || isHome) && (
                        <Link to="/Login" style={stylesText} onClick={() => setIsMobileMenuOpen(false)}>
                            <FaUser style={stylesIcons} /> Entrar 
                        </Link>
                    )}
                    {(isMenuPrestador || isMenuCliente || isMenuAdministracao || isShopping || isPetServices ||
                        isServicosPrestador || isEspecificProduct || isRegistroServicoPrestador ||
                        isCadastroProdutos || isListaProdutosPrestador || isChat || isListaDeChats || isDenuncia ||
                        isCadastroContasAdministracao || isPerfilDeUsuario || isEdicaoPerfil ||
                        isCadastroDeAdocao || isPaginaDeAdocao) && (
                            <button
                                style={stylesText}
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <FaSignOutAlt style={stylesIcons} /> Sair 
                            </button>
                        )}
                    {(isMenuPrestador || isMenuCliente || isMenuAdministracao || isShopping || isPetServices ||
                        isServicosPrestador || isEspecificProduct || isRegistroServicoPrestador ||
                        isCadastroProdutos || isListaProdutosPrestador || isChat || isListaDeChats ||
                        isDenuncia || isCadastroContasAdministracao || isEdicaoPerfil ||
                        isCadastroDeAdocao || isPaginaDeAdocao) && (
                            <Link to="/PerfilDeUsuario" style={stylesText} onClick={() => setIsMobileMenuOpen(false)}>
                                <CgProfile style={stylesIcons} /> Perfil
                            </Link>
                        )}
                </nav>
            )}
        </header>
    )
};