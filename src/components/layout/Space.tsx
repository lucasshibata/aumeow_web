import React from 'react';

export default function Space(props:any){
    const {h, w} = props;
    const styles = {
        spaceStyle:{
            height:h || 0,
            width:w || 0,
        },
    };

    return(
        <div style={styles.spaceStyle}/>
    );
};
