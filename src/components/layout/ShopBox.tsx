import React from 'react';
import TouchableOpacity from './TouchableOpacity';

export default function ShopBox (props:any){
    const {imgProduct, titleProduct, subtitleProduct, priceProduct, navegar} = props;
    const styles = {
        container:{
            backgroundColor:'#D9D9D9',
            width:155,
            height:236,
            alignItems: 'center',
            paddingTop:15,
            borderRadius:8,
            margin:10,
        },
        img:{
            width:122,
            height:122,
            borderRadius:8,
        },
        txtContainer:{
            alignItems:'flex-start',
            width:'100%',
            paddingLeft:15,
            marginTop:10,
        },
        titleStyle:{
            color:'black',
        },
        subtitleStyle:{
            color:'#626262',
        },
    };
    return(
        <TouchableOpacity style={styles.container} onPress={navegar}>
            <img src={imgProduct} style={styles.img} alt='uma imagem ai'/>
            <div style={styles.txtContainer}>
                <p style={styles.titleStyle}>{titleProduct}</p>
                <p style={styles.subtitleStyle}>{subtitleProduct}</p>
                <p style={styles.titleStyle}>Preço: R${priceProduct}</p>
            </div>
        </TouchableOpacity>
    );
};


