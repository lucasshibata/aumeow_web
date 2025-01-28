import React from 'react';
import TouchableOpacity from './TouchableOpacity';

export default function ShopBox ({imgProduct, titleProduct, subtitleProduct, priceProduct, navegar}:any){
        const stylesContainer:React.CSSProperties = {
            backgroundColor:'#D9D9D9',
            width:155,
            height:236,
            alignItems: 'center',
            paddingTop:15,
            borderRadius:8,
            margin:10,
        }
        const stylesImg:React.CSSProperties ={
            width:122,
            height:122,
            borderRadius:8,
            color:'black'
        }
        const stylesTxtContainer:React.CSSProperties ={
            alignItems:'flex-start',
            width:'100%',
            paddingLeft:15,
            marginTop:10,
        }
        const stylesTitleStyle:React.CSSProperties ={
            color:'black',
        }
        const stylesSubtitleStyle:React.CSSProperties ={
            color:'#626262',
        }
    return(
        <TouchableOpacity onClick={navegar}>
            <div style={stylesContainer}>
                <img src={imgProduct} style={stylesImg} alt='uma imagem ai'/>
                <div style={stylesTxtContainer}>
                    <p style={stylesTitleStyle}>{titleProduct}</p>
                    <p style={stylesSubtitleStyle}>{subtitleProduct}</p>
                    <p style={stylesTitleStyle}>Preço: R${priceProduct}</p>
                </div>
            </div>
        </TouchableOpacity>
    );
};


