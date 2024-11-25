import { useForm } from "react-hook-form"
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import SendService from "../layout/SendService";
import { useNavigate } from "react-router-dom";

export default function RegistroServicoPrestador(){
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    return(
        <div>
            <Header/>
            <form onSubmit={handleSubmit((data)=>SendService(data, navigate))}>
                <label className='txt'>Endereço:</label>
                <input className='InputText' type='text' placeholder='Endereço:' {...register("adress")} />
                <label className='txt'>Preço:</label>
                <input className='InputText' type="number" placeholder='Preço:' {...register("price")}/>
                <label className='txt'>Animal de Preferência:</label>
                <select className='SelectOption' {...register("animalType")}>
                    <option value="gato">gato</option>
                    <option value="cachorro">cachorro</option>
                </select>
                <label className='txt'>Quantidade de passeio/visita:</label>
                <select className='SelectOption' {...register("qtdService")}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <input type="submit" />
            </form>
            <Footer/>
        </div>
    )
}