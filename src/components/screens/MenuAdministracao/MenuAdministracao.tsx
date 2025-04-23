import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import "./MenuAdministracao.css"
import withAuth from "../../contexts/LoginContext";
import { useEffect, useState } from "react";
import verifyFunction from "../../layout/verifyFunction";
import { useNavigate } from "react-router-dom";
import NavToolsImg from "../../layout/NavToolsImg";

function MenuAdministracao(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const data = [
        { id:1, titleNav: 'Registro de Produto', srcImg:require('../../../assets/registro_servico.png'), navScreen:()=>navigate('/CadastroProdutos') },
    ];

    useEffect(()=>{
        const verificar = async () => {
            const funcao = await verifyFunction();
            
            switch (funcao){
                case "prestador":
                    navigate("/MenuPrestador");
                    break;
                case "cliente":
                    navigate("/MenuCliente");
                    break;
                default:
                    console.log("permitido ou não encontrado");
            }
            setLoading(false);
        }
        verificar();
    },[navigate])

    if(loading){
        <div>loading...</div>
    }

    return(
        <div className="ContainerMenuAdministracao">
            <Header/>
            <div className="innerContainerMenuAdministracao">
                <h1>Menu administração</h1>
                <div className="FlatListMenuAdministracao">
                    {data.map(item => (
                        <div key={item.id} className="ContainerListMenuAdministracao">
                            <NavToolsImg src={item.srcImg} titleNav={item.titleNav} onTouch={item.navScreen}/>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default withAuth(MenuAdministracao);