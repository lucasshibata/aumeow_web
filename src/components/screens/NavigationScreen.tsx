import NavToolsImg from '../layout/NavToolsImg';
// import {AuthContext} from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './NavigationScreen.css'
import Header from '../layout/Header';
import Footer from '../layout/Footer';


export default function NavigationScreen(){
    const navigate = useNavigate();
    const data = [
        { id:1, titleNav: 'Serviços Pet', srcImg:require('../../assets/dog-walk.jpg'), navScreen:()=>navigate('/PetServices') },
        { id:2, titleNav: 'Loja', srcImg:require('../../assets/shop-img.png'), navScreen:()=>navigate('/Shopping') },
    ];
    
    return(
        <div className='Container'>
            <Header/>
            <div className="FlatList">
                {data.map(item => (
                    <div key={item.id} className="ContainerList">
                        <NavToolsImg src={item.srcImg} titleNav={item.titleNav} onTouch={item.navScreen}/>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};
