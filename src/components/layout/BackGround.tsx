import React from 'react';
import bgImg from '../../assets/bg_img.png';


export default function BackGround(props:any){
    const styles = {
        container:{
            flex:1,
        },
        imgBg:{
            width:'100%',
            height:'100%',
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        }
    }
    return(
        <div style={styles.container}> 
            <image src={bgImg} style={styles.imgBg}>
                {props.children}
            </image>
        </div>
    );
};


