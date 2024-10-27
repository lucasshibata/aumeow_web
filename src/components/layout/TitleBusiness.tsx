import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default ()=>{
    return(
        <Text style={styles.title}>AuMeow</Text>
    );
};

const styles = StyleSheet.create({
    title:{
        fontSize:32,
		color:'white',
    },
});
