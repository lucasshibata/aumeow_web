import React from 'react';
import './BackGround.css';

export default function BackGround(props:any){
    return(
        <div className='imagem-fundo'> 
            {props.children}
        </div>
    );
};


