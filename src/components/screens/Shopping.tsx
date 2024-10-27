import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import ShopBox from '../layout/ShopBox';


export default (props:any)=>{
    const {navigation} = props;
    const data = [
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto',lojaP:'nome da loja', preco:18.90},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto2',lojaP:'nome da loja2', preco:54.90},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto3',lojaP:'nome da loja3', preco:32.60},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto4',lojaP:'nome da loja4', preco:10.99},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto5',lojaP:'nome da loja5', preco:1.50},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto6',lojaP:'nome da loja6', preco:14.90},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto6',lojaP:'nome da loja6', preco:14.90},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto7',lojaP:'nome da loja7', preco:14.90},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto8',lojaP:'nome da loja8', preco:14.90},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto9',lojaP:'nome da loja9', preco:14.90},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto10',lojaP:'nome da loja10', preco:14.90},
        {srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto11',lojaP:'nome da loja11', preco:14.90},
    ];

    function renderItem({item}:any){
        return <ShopBox imgProduct={item.srcImg} titleProduct={item.nomeP} subtitleProduct={item.lojaP} priceProduct={item.preco} navegar={()=>navigation.navigate('EspecificProduct')}/>;
    }
    return(
        <View style={styles.container}>
            <Text>Loja</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item=>item.nomeP + item.lojaP}
                numColumns={2}
                style={styles.listItens}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    listItens:{
        height:'100%',
    },
});
