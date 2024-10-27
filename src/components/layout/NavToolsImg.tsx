import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default (props:any)=>{
    const {src, titleNav, onTouch} = props;
    return(
        <TouchableOpacity style={styles.box} onPress={onTouch}>
            <Image source={src} style={styles.img} />
            <Text style={styles.txt}>{titleNav}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
    txt:{
        color:'white',
        textAlign:'center',
    },
});
