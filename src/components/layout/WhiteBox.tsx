import React from 'react';

export default function WhiteBox(props:any){
    const styles={
        backgroundColor:'white',
        width:'auto',
        height:'auto',
        justifyContent:'center',
        borderRadius:20,
        padding:20,
    }
    return(
        <div style={styles}>
            {props.children}
        </div>
    );
};
