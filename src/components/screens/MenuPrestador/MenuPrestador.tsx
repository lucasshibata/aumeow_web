import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router-dom";
import './MenuPrestador.css';
import withAuth from '../../contexts/AuthContext';
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
        <div className="Container">
            <Header/>
            <div className="main">
                <button onClick={()=>navigate('/RegistroServicoPrestador')}>ir para registro de serviço</button>
                <button onClick={()=>navigate('/ListaServicosPrestador')}>ir para lista de Serviços</button>
                <button onClick={()=>navigate('/CadastroProdutos')}>ir para registro de Produto</button>
                <button onClick={()=>navigate('/ListaProdutosPrestador')}>ir para lista de Produtos</button>
                <button onClick={handleLogout}>sair</button>
            </div>
            <Footer/>
        </div>
    )
}
export default withAuth(MenuPrestador);