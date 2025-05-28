import React, {useEffect, useState} from 'react';
import TouchableOpacity from './TouchableOpacity';

export default function ShopBox ({imgProduct, titleProduct, subtitleProduct, priceProduct, navegar}:any){
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const stylesContainer:React.CSSProperties = {
        display: "flex",
        flexDirection:"column",
        backgroundColor:'var(--marrom-btn)',
        width:isMobile?'200px':'200px',
        height:isMobile?'340px':'340px',
        alignItems: 'center',
        padding:10,
        borderRadius:8,
        margin:10,
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
    }
    const stylesImg:React.CSSProperties ={
        width:'80%',
        height:'auto',
        borderRadius:8,
        color:'black'
    }
    const stylesTxtContainer:React.CSSProperties ={
        alignItems:'flex-start',
        width:'100%',
    }
    const stylesText:React.CSSProperties ={
        color:'white',
        fontSize: '1.2rem'
    }

    return(
        <div style={stylesContainer}>
            <TouchableOpacity onClick={navegar}>
                <img src={imgProduct} style={stylesImg} alt='imagem do produto'/>
                <div style={stylesTxtContainer}>
                    <p style={stylesText}>{titleProduct}</p>
                    <p style={stylesText}>{subtitleProduct}</p>
                    <p style={stylesText}>Preço: R${priceProduct}</p>
                </div>
            </TouchableOpacity>
        </div>
    );
};


