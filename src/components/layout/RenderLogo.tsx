import React from 'react';
import image from '../../assets/logo_img.png';

export default function RenderLogo(){
    const styles:React.CSSProperties= {
        height:'130px',
        width:'180px', 
    }
    return(
        <div>
            <img src={image} alt='imagem da logo' style={styles}/>
        </div>
    );
};
