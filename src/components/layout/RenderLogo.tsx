import React from 'react';
import image from '../../assets/logo_img.png';

export default function RenderLogo(){
    const styles= {
        height:118,
        width:138, 
    }
    return(
        <div>
            <img src={image} alt='imagem da logo' style={styles}/>
        </div>
    );
};
