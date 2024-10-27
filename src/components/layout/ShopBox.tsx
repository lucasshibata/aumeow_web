import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';

export default (props:any)=>{
    const {imgProduct, titleProduct, subtitleProduct, priceProduct, navegar} = props;
    return(
        <TouchableOpacity style={styles.container} onPress={navegar}>
            <Image source={imgProduct} style={styles.img}/>
            <View style={styles.txtContainer}>
                <Text style={styles.titleStyle}>{titleProduct}</Text>
                <Text style={styles.subtitleStyle}>{subtitleProduct}</Text>
                <Text style={styles.titleStyle}>Preço: R${priceProduct}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
});
