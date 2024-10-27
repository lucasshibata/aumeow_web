import React from 'react';
import { View, StyleSheet } from 'react-native';

export default (props:any)=>{
    const {h, w} = props;
    const styles = StyleSheet.create({
        spaceStyle:{
            height:h || 0,
            width:w || 0,
        },
    });

    return(
        <View style={styles.spaceStyle}/>
    );
};
