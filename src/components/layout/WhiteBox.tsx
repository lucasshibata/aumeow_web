import React from 'react';
import { View, StyleSheet } from 'react-native';

export default (props:any)=>{
    return(
        <View style={styles.centralSqr}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    centralSqr:{
        backgroundColor:'white',
        width:'auto',
        height:'auto',
        justifyContent:'center',
        borderRadius:20,
        padding:20,
    },
});
