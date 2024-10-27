import React from 'react';
import { Image, StyleSheet } from 'react-native';


export default ()=>{
    return(
        <Image source={require('../../assets/logo_img.png')} style={styles.imgDimension}/>
    );
};

const styles = StyleSheet.create({
    imgDimension:{
        height:118,
        width:138,
    },
});
