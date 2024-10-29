import React from 'react';
import './BackGround.css';

export default function BackGround(props:any){
    const styles={
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return(
        <div className='imagem-fundo' style={styles}> 
            {props.children}
        </div>
    );
};


