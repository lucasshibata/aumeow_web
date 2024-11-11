import React from 'react';
import TouchableOpacity from './TouchableOpacity';


export default function NavToolsImg(props:any){
    const {src, titleNav, onTouch} = props;
    const styles = {
        box:{
            height:250,
            width:155,
            backgroundColor:'#7360DF',
            borderRadius:15,
            margin:10,
        },
        img:{
            height:'85%',
            width:'100%',
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
        },
        text:{
            color:'white'
        },
    };
    return(
        <TouchableOpacity style={styles.box} onClick={onTouch}>
            <img src={src} style={styles.img} alt='uma imagem ai'/>
            <p style={styles.text}>{titleNav}</p>
        </TouchableOpacity>
    );
};
