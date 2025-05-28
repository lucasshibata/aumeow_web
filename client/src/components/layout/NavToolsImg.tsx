import React, { useEffect, useState } from 'react';
import TouchableOpacity from './TouchableOpacity';


export default function NavToolsImg(props:any){
    const {src, titleNav, onTouch} = props;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const stylesImg:React.CSSProperties = {
        height:'100%',
        width:'100%',
        objectFit:'cover',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    }
    const stylesText:React.CSSProperties = {
        color:'white',
        fontSize:'1.2rem'
    }
    const stylesContainer:React.CSSProperties = {
        backgroundColor:'var(--marrom-btn)',
        height:'40vh',
        width:isMobile ? '35vh' : '15vw',
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        flexWrap:'wrap',
        padding:10,
        borderRadius:16,
    }

    const stylesContainerImg:React.CSSProperties = {
        height: '90%',
        width: '100%',
        display:'flex',
        margin: 0,
        padding: 0,
        justifyContent:'center',
        alignItems:'center'
    }
    const stylesContainerSubtitle:React.CSSProperties = {
        height: '10%',
        width: '100%',
        display:'flex',
        margin: 0,
        padding: 0,
        justifyContent:'center',
        alignItems:'center',
    }
    return(
        <TouchableOpacity onClick={onTouch}>
            <div style={stylesContainer}>
                <div style={stylesContainerImg}>
                    <img src={src} style={stylesImg} alt='uma imagem ai'/>
                </div>
                <div style={stylesContainerSubtitle}>
                    <p style={stylesText}>{titleNav}</p>
                </div>
            </div>
        </TouchableOpacity>
    );
};
