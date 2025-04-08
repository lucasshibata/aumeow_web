import {useState} from 'react';
import {useNavigate} from "react-router-dom";

export default function BtnComp(props:any){
    const {labelButton, toPress, activeOpacity = 0.6} = props;
    const [isPressed, setIsPressed] = useState(false);
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const navigate = useNavigate();
    const styles = {
        btn_txt:{
            opacity: isPressed ? activeOpacity : 1,
            transition: 'opacity 0.2s',
            cursor: 'pointer',
            fontSize:18,
            color: 'white',
            fontWeight:'bold',
            border:0,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            padding:10,
            borderRadius:10,
            paddingHorizontal:20,
            backgroundColor:'var(--marrom-btn)'
        },
    };
    return(
        <button onClick={()=>navigate(`/${toPress}`)} style={styles.btn_txt} onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
            {labelButton}
        </button>
    );
};

