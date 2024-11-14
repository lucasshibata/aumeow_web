import React from 'react';
import image from '../../assets/logo_img.png';

export default function RenderLogo(){
    const styles:React.CSSProperties= {
        height:'13vh',
        width:'8vw', 
    }
    return(
        <div>
            <img src={image} alt='imagem da logo' style={styles}/>
        </div>
    );
};
