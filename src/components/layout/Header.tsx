import React from "react";
import RenderLogo from "../layout/RenderLogo";
import {Link} from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";

export default function Header(){
    const stylesContainer:React.CSSProperties = {
        backgroundColor: '#DEB2FB',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-around',
        flexWrap:"wrap",
        // padding:'5px',
        height:'20vh',
        width:'100vw'
    }
    const stylesContent:React.CSSProperties = {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap:15,
        flexWrap:'wrap',
        height:'auto',
        width:'auto'
    }
    const stylesText:React.CSSProperties = {
        fontSize:'1.4rem',
        color: '#7360DF'
    }
    const stylesIcons:React.CSSProperties = {
        color: '#7360DF',
        fontSize:'1.4rem'
    }
    const stylesLogo:React.CSSProperties = {
        height:'100px',
        width:'150px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
    return(
        <header style={stylesContainer}>
            <div style={stylesContent}>
                <div style={stylesLogo}>
                    <RenderLogo/>
                </div>
                <h1>AuMeow</h1>
            </div>
            <div style={stylesContent}>
                <FaHome style={stylesIcons}/><Link to="/" style={stylesText}>Home</Link>
                <FaUser style={stylesIcons}/><Link to="/Login" style={stylesText}>Usuário</Link>
            </div>
        </header>
    )
};