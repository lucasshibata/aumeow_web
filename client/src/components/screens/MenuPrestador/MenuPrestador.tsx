import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router-dom";
import './MenuPrestador.css';
import withAuth from '../../contexts/LoginContext';
import { signOut, auth } from "../../firebase/Firebase";
import NavToolsImg from '../../layout/NavToolsImg';

function MenuPrestador(){
    const data = [
        { id:1, titleNav: 'Registro de Serviço', srcImg:require('../../../assets/registro_servico.png'), navScreen:()=>navigate('/RegistroServicoPrestador') },
        { id:2, titleNav: 'Lista de Serviços', srcImg:require('../../../assets/lista_servicos.png'), navScreen:()=>navigate('/ListaServicosPrestador') },
        { id:3, titleNav: 'Lista de Chats', srcImg:require('../../../assets/lista_chats.png'), navScreen:()=>navigate('/ListaDeChats') },
        { id:4, titleNav: 'Sair', srcImg:require('../../../assets/icone_sair.png'), navScreen:()=>handleLogout() }
    ];
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log("Usuário deslogado com sucesso!");
        } catch (error) {
          console.error("Erro ao deslogar:", error);
        }
    };
    return(
        <div className="ContainerMenuPrestador">
            <Header/>
            <div className="FlatListMenuPrestador">
                {data.map(item => (
                    <div key={item.id} className="ContainerListMenuPrestador">
                        <NavToolsImg src={item.srcImg} titleNav={item.titleNav} onTouch={item.navScreen}/>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}
export default withAuth(MenuPrestador);