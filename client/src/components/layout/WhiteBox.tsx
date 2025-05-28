import React from 'react';

export default function WhiteBox(props:any){
    const styles:React.CSSProperties={
        backgroundColor:'white',
        width:'auto',
        height:'auto',
        justifyContent:'center',
        borderRadius:20,
        padding:20,
        // boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)'
    }
    return(
        <div style={styles}>
            {props.children}
        </div>
    );
};
