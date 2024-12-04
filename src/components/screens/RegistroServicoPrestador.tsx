import { useForm } from "react-hook-form"
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import SendService from "../layout/SendService";
import { useNavigate } from "react-router-dom";
import "./RegistroServicoPrestador.css";
import withAuth from '../contexts/AuthContext';

 function RegistroServicoPrestador(){
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    return(
        <div className="Container">
            <Header/>
            <div className="DivForm">
                <form className= "Form"onSubmit={handleSubmit((data)=>SendService(data, navigate))}>
                    <h1>Formulário de Serviço</h1>
                    <div className="Bloco">
                        <label className='txt'>Endereço:</label>
                        <input className='InputText' type='text' placeholder='Endereço:' {...register("adress")} />
                    </div>
                    <div className="Bloco">
                        <label className='txt'>Preço:</label>
                        <input className='InputText' type="number" placeholder='Preço:' {...register("price")}/>
                    </div>
                    <div className="Bloco">
                        <label className='txt'>Animal de Preferência:</label>
                        <select className='SelectOption' {...register("animalType")}>
                            <option value="gato">gato</option>
                            <option value="cachorro">cachorro</option>
                        </select>
                    </div>
                    <div className="Bloco">
                        <label className='txt'>Quantidade de passeio/visita:</label>
                        <select className='SelectOption' {...register("qtdService")}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <input className="Submit" type="submit" />
                </form>
            </div>
            <Footer/>
        </div>
    )
}
export default withAuth(RegistroServicoPrestador);