import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


export default (props:any)=>{
    const {labelButton, toPress, bgColor} = props;
    return(
        <TouchableOpacity
            style={[styles.btn_st, {backgroundColor:bgColor || '#7360DF'}]}
            onPress={toPress}
        >
            <Text style={styles.btn_txt}>{labelButton}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn_st:{
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderRadius:10,
        paddingHorizontal:20,
    },
    btn_txt:{
        fontSize:15,
        color: 'white',
        fontWeight:'bold',
    },
});
