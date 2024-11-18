import React from "react";

export default function PetSitter(props:any){
    const stylesContainer:React.CSSProperties ={
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    }
    return(
        <div style={stylesContainer}>
            <img src={props.image} alt="imagem de pessoa" />
            <div>
                <p>nome</p>
                <p>estrelas</p>
            </div>
        </div>
    )
}