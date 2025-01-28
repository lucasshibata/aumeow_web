import React from "react";
import RenderLogo from "./RenderLogo";
import { Link } from "react-router-dom";
import { FaHome, FaInstagram } from 'react-icons/fa'
import TouchableOpacity from "./TouchableOpacity";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SendEmail from './SendEmail';

export default function Footer(){
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const handleExternalRedirect = () => {
        window.location.href = "https://www.instagram.com/aumeow.pets/";
    };

    const stylesContainer:React.CSSProperties = {
        backgroundColor: '#DEB2FB',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom:'30px',
        paddingTop:'20px',
        flexWrap:'wrap',
        gap:'6vw',
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
    const stylesIcon:React.CSSProperties = {
        height:'50%', 
        width:'50%', 
        color:'white'
    }
    const stylesForm:React.CSSProperties = {
        display: 'flex',
        flexDirection:'column',
        gap: '10px',
        margin: '0px'
    }
    const stylesFormInput:React.CSSProperties = {
        borderColor: '#7360DF',
        borderWidth: '4px',
        borderRadius: '15px',
        fontSize: '1.2rem',
        padding: '7px',
        backgroundColor:'white'
    }
    const stylesFormSubmit:React.CSSProperties = {
        backgroundColor: '#7360DF',
        borderWidth: '0px',
        borderRadius: '15px',
        fontSize: '1.2rem',
        padding: '7px',
        color: 'white'
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
                            <FaHome style={stylesIcon}/>
                        </div>
                    </TouchableOpacity>
                    <TouchableOpacity onClick={handleExternalRedirect}>
                        <div style={stylesCircle}>
                            <FaInstagram style={stylesIcon}/>
                        </div>
                    </TouchableOpacity>
                </div>
            </div>
            <div style={stylesContent}>
                <h1 style={{margin:0}}>Envie um email para nós:</h1>
                <form style={stylesForm} onSubmit={handleSubmit((data)=>SendEmail(data))}>
                    <input style={stylesFormInput} type='text' placeholder='Nome Completo:' {...register("nome")}/>
                    <input style={stylesFormInput} type='email' placeholder='Seu Email Pessoal:' {...register("email")}/>
                    <input style={stylesFormInput} type='text' placeholder='Mensagem:' {...register("mensagem")}/>
                    <input style={stylesFormSubmit} className='Submit' value='Enviar' type="submit"/>
                </form>
            </div>
            <div style={stylesContent}>
                <h1 style={{margin:0}}>Entre em Contato</h1>
                <h2 style={stylesTexth2}>E-mail:</h2>
                <h3 style={stylesTexth3}>aumeow.pets@gmail.com</h3>
                <h2 style={stylesTexth2}>Whatsapp:</h2>
                <h3 style={stylesTexth3}>(61) 98282-1772</h3>
            </div>
            <div style={stylesContent}>
                <h1 style={{margin:0}}>Navegação</h1>
                <Link to='/' style={stylesTexth3}>Home</Link>
                <Link to='/SobreNos' style={stylesTexth3}>Sobre nós</Link>
            </div>
        </footer>
    )
};