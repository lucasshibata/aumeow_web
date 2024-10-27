import React, {useContext} from 'react';
import { FlatList, Text } from 'react-native';
import BackGround from '../layout/BackGround';
import NavToolsImg from '../layout/NavToolsImg';
import RenderLogo from '../layout/RenderLogo';
import Space from '../layout/Space';
import {AuthContext} from '../contexts/AuthContext';



export default (props:any)=>{
    const {navigation} = props;
    const {nomeUsuario}:any = useContext(AuthContext);
    const data = [
        { titleNav: 'Serviços Pet', srcImg:require('../../assets/dog-walk.jpg'), navScreen:()=>navigation.navigate('PetServices') },
        { titleNav: 'Loja', srcImg:require('../../assets/shop-img.png'), navScreen:()=>navigation.navigate('Shopping') },
    ];

    function renderItem ({item}:any){
        return <NavToolsImg src={item.srcImg} titleNav={item.titleNav} onTouch={item.navScreen}/>;
    }

    return(
        <BackGround>
            <Space h={20}/>
            <RenderLogo/>
            <Space h={10}/>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item=>item.titleNav}
                numColumns={2}
            />
            <Text>{nomeUsuario}</Text>
        </BackGround>
    );
};
