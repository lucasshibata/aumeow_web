import React, {useContext} from 'react';
import BackGround from '../layout/BackGround';
import NavToolsImg from '../layout/NavToolsImg';
import RenderLogo from '../layout/RenderLogo';
import Space from '../layout/Space';
// import {AuthContext} from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './NavigationScreen.css'



export default function NavigationScreen (props:any){
    const navigate = useNavigate();
    const data = [
        { id:1, titleNav: 'Serviços Pet', srcImg:require('../../assets/dog-walk.jpg'), navScreen:()=>navigate('/PetServices') },
        { id:2, titleNav: 'Loja', srcImg:require('../../assets/shop-img.png'), navScreen:()=>navigate('/Shopping') },
    ];
    const stylesContainer:React.CSSProperties ={
        display:'flex',
        flexDirection: 'column'
    }
    return(
        <BackGround>
            <div style={stylesContainer}>
                <Space h={20}/>
                <RenderLogo/>
                <Space h={10}/>
                <div className="FlatList">
                    {data.map(item => (
                        <div key={item.id} className="ContainerList">
                            <NavToolsImg src={item.srcImg} titleNav={item.titleNav} onTouch={item.navScreen}/>
                            {item.titleNav}
                        </div>
                    ))}
                </div>
            </div>
        </BackGround>
    );
};
