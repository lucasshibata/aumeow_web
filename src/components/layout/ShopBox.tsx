import React from 'react';
import TouchableOpacity from './TouchableOpacity';

export default function ShopBox ({imgProduct, titleProduct, subtitleProduct, priceProduct, navegar}:any){
        const stylesContainer:React.CSSProperties = {
            display: "flex",
            flexDirection:"column",
            backgroundColor:'#7360DF',
            width:'8vw',
            height:'35vh',
            alignItems: 'center',
            padding:10,
            borderRadius:8,
            margin:10,
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
        }
        const stylesImg:React.CSSProperties ={
            width:'100%',
            height:'60%',
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
                <img src={imgProduct} style={stylesImg} alt='uma imagem ai'/>
                <div style={stylesTxtContainer}>
                    <p style={stylesText}>{titleProduct}</p>
                    <p style={stylesText}>{subtitleProduct}</p>
                    <p style={stylesText}>Preço: R${priceProduct}</p>
                </div>
            </TouchableOpacity>
        </div>
    );
};


