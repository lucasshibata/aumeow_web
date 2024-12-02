import React from 'react';
import TouchableOpacity from './TouchableOpacity';


export default function NavToolsImg(props:any){
    const {src, titleNav, onTouch} = props;
    const stylesBox:React.CSSProperties = {
        height:'100%',
        width:'100%',
        display:'flex',
        backgroundColor:'#7360DF',
        borderRadius:15,
        margin:10,
    };
    const stylesImg:React.CSSProperties = {
        height:'90%',
        width:'100%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    }
    const stylesText:React.CSSProperties = {
        color:'white'
    }
    const stylesContainer:React.CSSProperties = {
        height: '100%',
        width:'100%',
        backgroundColor:'#33186B',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:16,
    }
    const stylesInerContainer:React.CSSProperties = {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        width:'100%'
    }
    return(
        <div style={stylesContainer}>
            <TouchableOpacity style={stylesBox} onClick={onTouch}>
                <div style={stylesInerContainer}>
                    <img src={src} style={stylesImg} alt='uma imagem ai'/>
                    <p style={stylesText}>{titleNav}</p>
                </div>
            </TouchableOpacity>
        </div>
    );
};
