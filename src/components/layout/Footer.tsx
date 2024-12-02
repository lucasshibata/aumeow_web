import React from "react";
import RenderLogo from "./RenderLogo";
import { Link } from "react-router-dom";
import { FaHome, FaInstagram } from 'react-icons/fa'
import TouchableOpacity from "./TouchableOpacity";
import { useNavigate } from 'react-router-dom';

export default function Footer(){
    const navigate = useNavigate();

    const handleExternalRedirect = () => {
        window.location.href = "https://www.instagram.com/aumeow.pets/";
      };

    const stylesContainer:React.CSSProperties = {
        backgroundColor: '#DEB2FB',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingBottom:'30px',
        flexWrap:'wrap',
        gap:'6vw',
        paddingLeft: '23vw'
    }
    const stylesContent:React.CSSProperties = {
        display:'flex',
        flexDirection: "column",
        gap: '20px',
    }
    const stylesContentSpecial:React.CSSProperties = {
        display:'flex',
        flexDirection: "column",
        alignItems:'center'
    }
    const stylesTexth3:React.CSSProperties = {
        color: 'white',
        fontWeight:'lighter',
        margin: 0
    }
    const stylesTexth2:React.CSSProperties = {
        color: 'white',
        fontWeight:'normal',
        margin:0
    }
    const stylesCircle:React.CSSProperties = {
        width: '64px',
        height: '64px',
        borderRadius:'32px',
        backgroundColor: '#7360DF',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
    const stylesLogo:React.CSSProperties = {
        height:'150px',
        width:'200px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }

    return(
        <footer style={stylesContainer}>
            <div style={stylesContentSpecial}>
                <div style={stylesLogo}>
                    <RenderLogo/>
                </div>
                <h1 style={{margin:0, marginBottom:15}}>Aumeow</h1>
                <div style={{display:'flex', gap:'50px'}}>
                    <TouchableOpacity onClick={()=>navigate('/')}>
                        <div style={stylesCircle}>
                            <FaHome style={{height:'50%', width:'50%'}}/>
                        </div>
                    </TouchableOpacity>
                    <TouchableOpacity onClick={handleExternalRedirect}>
                        <div style={stylesCircle}>
                            <FaInstagram style={{height:'50%', width:'50%'}}/>
                        </div>
                    </TouchableOpacity>
                </div>
            </div>
            <div style={stylesContent}>
                <h1>Envie uma mensagem</h1>
                <h2 style={stylesTexth2}>nome:</h2>
                <h2 style={stylesTexth2}>email:</h2>
                <h2 style={stylesTexth2}>mensagem:</h2>
            </div>
            <div style={stylesContent}>
                <h1>Entre em Contato</h1>
                <h2 style={stylesTexth2}>E-mail:</h2>
                <h3 style={stylesTexth3}>aumeow.pets@gmail.com</h3>
                <h2 style={stylesTexth2}>Whatsapp:</h2>
                <h3 style={stylesTexth3}>(61) 98282-1772</h3>
            </div>
            <div style={stylesContent}>
                <h1>Navegação</h1>
                <Link to='/login' style={stylesTexth3}>Home</Link>
                <Link to='/login' style={stylesTexth3}>Galeria da Fofura</Link>
                <Link to='/login' style={stylesTexth3}>Sobre nós</Link>
            </div>
        </footer>
    )
};