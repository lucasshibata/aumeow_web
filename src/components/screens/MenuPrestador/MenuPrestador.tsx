import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router-dom";
import './MenuPrestador.css';
import withAuth from '../../contexts/LoginContext';
import { signOut, auth } from "../../firebase/Firebase";

function MenuPrestador(){
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
            <div className="InnerContainerMenuPrestador">
                <button onClick={()=>navigate('/RegistroServicoPrestador')}>ir para registro de serviço</button>
                <button onClick={()=>navigate('/ListaServicosPrestador')}>ir para lista de Serviços</button>
                <button onClick={()=>navigate('/ListaDeChats')}>ir para lista de chats</button>
                <button onClick={()=>navigate('/Denuncia')}>ir para o canal de denuncia</button>
                <button onClick={handleLogout}>sair</button>
            </div>
            <Footer/>
        </div>
    )
}
export default withAuth(MenuPrestador);