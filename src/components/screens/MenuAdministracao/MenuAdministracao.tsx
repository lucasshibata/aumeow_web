import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import "./MenuAdministracao.css"
import withAuth from "../../contexts/LoginContext";
import { useEffect, useState } from "react";
import verifyFunction from "../../layout/verifyFunction";
import { useNavigate } from "react-router-dom";

function MenuAdministracao(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
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
        <div className="Container">
            <Header/>
            <div className="innerContainer">
                <h1>Menu administração</h1>
            </div>
            <Footer/>
        </div>
    )
}

export default withAuth(MenuAdministracao);