import React from 'react';
import TouchableOpacity from './TouchableOpacity';


export default function BtnComp(props:any){
    const {labelButton, toPress, bgColor} = props;
    const styles = {
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
    };
    return(
        <TouchableOpacity
            style={[styles.btn_st, {backgroundColor:bgColor || '#7360DF'}]}
            onPress={toPress}
        >
            <p style={styles.btn_txt}>{labelButton}</p>
        </TouchableOpacity>
    );
};

