import { useForm } from "react-hook-form"
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import SendService from "../../layout/SendService";
import { useNavigate } from "react-router-dom";
import "./RegistroServicoPrestador.css";
import withAuth from '../../contexts/LoginContext';

 function RegistroServicoPrestador(){
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    return(
        <div className="ContainerRegistroServicoPrestador">
            <Header/>
            <div className="DivFormRegistroServicoPrestador">
                <h1 className="TitleRegistroServicoPrestador">Formulário de Serviço</h1>
                <form className= "FormRegistroServicoPrestador"onSubmit={handleSubmit((data)=>SendService(data, navigate))}>
                    <label className='txtRegistroServicoPrestador'>Endereço:</label>
                    <input className='InputTextRegistroServicoPrestador' type='text' placeholder='Endereço:' {...register("adress")} />
                    <label className='txtRegistroServicoPrestador'>Estado (sigla):</label>
                    <input className='InputTextRegistroServicoPrestador' type="text" placeholder='Estado:' {...register("estado")}/>
                    <label className='txtRegistroServicoPrestador'>Preço por serviço:</label>
                    <input className='InputTextRegistroServicoPrestador' type="text" placeholder='Preço:' {...register("price")}/>
                    <label className='txtRegistroServicoPrestador'>Quantidade de passeio/visita:</label>
                    <select className='SelectOptionRegistroServicoPrestador' {...register("qtdService")}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <input className="SubmitRegistroServicoPrestador" type="submit" />
                </form>
            </div>
            <Footer/>
        </div>
    )
}
export default withAuth(RegistroServicoPrestador);