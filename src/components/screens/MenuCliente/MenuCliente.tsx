import NavToolsImg from '../../layout/NavToolsImg';
import { useNavigate } from 'react-router-dom';
import './MenuCliente.css'
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import withAuth from '../../contexts/LoginContext';


function MenuCliente(){
    const navigate = useNavigate();
    const data = [
        { id:1, titleNav: 'Serviços Pet', srcImg:require('../../../assets/dog-walk.jpg'), navScreen:()=>navigate('/PetServices') },
        { id:2, titleNav: 'Loja', srcImg:require('../../../assets/shop-img.png'), navScreen:()=>navigate('/Shopping') },
        { id:3, titleNav: 'Denuncia', srcImg:require('../../../assets/cachorro_grade.png'), navScreen:()=>navigate('/Denuncia') },
        { id:4, titleNav: 'Adoção', srcImg:require('../../../assets/imagem_adocao.jpg'), navScreen:()=>navigate('/PaginaDeAdocao') }
    ];
    
    return(
        <div className='ContainerMenuCliente'>
            <Header/>
            <div className="FlatListMenuCliente">
                {data.map(item => (
                    <div key={item.id} className="ContainerListMenuCliente">
                        <NavToolsImg src={item.srcImg} titleNav={item.titleNav} onTouch={item.navScreen}/>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};
export default withAuth(MenuCliente);