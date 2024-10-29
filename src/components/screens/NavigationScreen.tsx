import React, {useContext} from 'react';
import BackGround from '../layout/BackGround';
import NavToolsImg from '../layout/NavToolsImg';
import RenderLogo from '../layout/RenderLogo';
import Space from '../layout/Space';
import {AuthContext} from '../contexts/AuthContext';



export default function NavigationScreen (props:any){
    const {navigation} = props;
    const {nomeUsuario}:any = useContext(AuthContext);
    const data = [
        { id:1, titleNav: 'Serviços Pet', srcImg:require('../../assets/dog-walk.jpg'), navScreen:()=>navigation.navigate('PetServices') },
        { id:2, titleNav: 'Loja', srcImg:require('../../assets/shop-img.png'), navScreen:()=>navigation.navigate('Shopping') },
    ];

    return(
        <BackGround>
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
            <p>{nomeUsuario}</p>
        </BackGround>
    );
};
