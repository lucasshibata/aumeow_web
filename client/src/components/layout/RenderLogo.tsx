import React from 'react';
import image from '../../assets/logo_img.png';

export default function RenderLogo(){
    const stylesImg:React.CSSProperties= {
        height:'100%',
        width:'100%', 
    }
    const stylesLogo:React.CSSProperties= {
        height:'100%',
        width:'100%', 
    }
    return(
        <div style={stylesLogo}>
            <img src={image} alt='imagem da logo' style={stylesImg}/>
        </div>
    );
};
