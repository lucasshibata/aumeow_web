import React from 'react';

export default function TitleBusiness(){
    const stylesTitle:React.CSSProperties = {
        fontSize:32,
        color:'var(--marrom-text)',
        margin: 12,
        fontWeight: 'bold'
    };
    return(
        <p style={stylesTitle}>AuMeow</p>
    );
};


