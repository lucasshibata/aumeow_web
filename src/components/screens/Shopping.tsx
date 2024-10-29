import React from 'react';
import ShopBox from '../layout/ShopBox';


export default function Shopping (props:any){
    const {navigation} = props;
    const data = [
        {id:1, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto',lojaP:'nome da loja', preco:18.90},
        {id:2, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto2',lojaP:'nome da loja2', preco:54.90},
        {id:3, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto3',lojaP:'nome da loja3', preco:32.60},
        {id:4, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto4',lojaP:'nome da loja4', preco:10.99},
        {id:5, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto5',lojaP:'nome da loja5', preco:1.50},
        {id:6, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto6',lojaP:'nome da loja6', preco:14.90},
        {id:7, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto6',lojaP:'nome da loja6', preco:14.90},
        {id:8, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto7',lojaP:'nome da loja7', preco:14.90},
        {id:9, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto8',lojaP:'nome da loja8', preco:14.90},
        {id:10, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto9',lojaP:'nome da loja9', preco:14.90},
        {id:11, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto10',lojaP:'nome da loja10', preco:14.90},
        {id:12, srcImg:require('../../assets/Teste_img_racao.jpg'), nomeP:'nome do produto11',lojaP:'nome da loja11', preco:14.90},
    ];
    const styles = {
        container:{
            alignItems:'center',
        },
        listItens:{
            height:'100%',
        },
    };
    return(
        <div style={styles.container}>
            <p>Loja</p>
            <div className="FlatList">
                {data.map(item => (
                    <div key={item.id} className="ContainerList">
                        <ShopBox imgProduct={item.srcImg} titleProduct={item.nomeP} subtitleProduct={item.lojaP} 
                        priceProduct={item.preco} navegar={()=>navigation.navigate('EspecificProduct')}/>
                    </div>
                ))}
            </div>
        </div>
    );
};
