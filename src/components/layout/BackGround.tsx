import React from 'react';
import imgbg from '../../assets/bg_img.png'

export default function BackGround(props:any){
    const styles:React.CSSProperties={
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${imgbg})`,
        backgroundSize: 'cover',
        flex:1,
        margin: 0
    }
    return(
        <div style={styles}> 
            {props.children}
        </div>
    );
};


