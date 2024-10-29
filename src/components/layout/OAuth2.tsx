import React from 'react';
import BtnComp from './BtnComp';
import { FaInstagram } from 'react-icons/fa';

export default function OAuth2 ({rotaNav}:any){
    const styles = {
        container:{
            display: 'flex',
            justifyContent:'space-around',
        },
    };
    return(
        <div style={styles.container}>
            <BtnComp bgColor="#999999" labelButton={<FaInstagram/>}/>
            <BtnComp labelButton={<FaInstagram/>} toPress={rotaNav}/>
            <BtnComp bgColor="#999999" labelButton={<FaInstagram/>}/>
        </div>
    );
};


