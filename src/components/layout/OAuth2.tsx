import React from 'react';
import { View, StyleSheet } from 'react-native';
import BtnComp from './BtnComp';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default ({rotaNav}:any)=>{
    return(
        <View style={styles.container}>
            <BtnComp bgColor="#999999" labelButton={<Icon name="apple" size={30} color="white"/>}/>
            <BtnComp labelButton={<Icon name="google" size={30} color="white"/>} toPress={rotaNav}/>
            <BtnComp bgColor="#999999" labelButton={<Icon name="facebook" size={30} color="white"/>}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
});
