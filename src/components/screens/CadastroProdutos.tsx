import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProductRegistration from "../layout/ProductRegistration";
import "./CadastroProdutos.css";

export default function CadastroProdutos(){
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    return(
        <div className='CadastroProdutos'>
            <Header/>
            <div className='Container'>         
                <h1 className='Title'>Cadastro de Produtos</h1>
                <form className='FormContainer' onSubmit={handleSubmit((data)=>ProductRegistration(data, navigate))}>
                    <label className='txt'>Nome do produto:</label>
                    <input className='InputText' type='text' placeholder='Nome:' {...register("name")} />
                    <label className='txt'>Código do produto:</label>
                    <input className='InputText' type='text' placeholder='Código:' {...register("code")} />
                    <label className='txt'>quantidade em estoque:</label>
                    <input className='InputText' type='text' placeholder='quantidade:' {...register("amount")} />
                    <label className='txt'>Preço do produto:</label>
                    <input className='InputText' type='text' placeholder='preço:' {...register("price")} />
                    <label className='txt'>marca do produto:</label>
                    <input className='InputText' type='text' placeholder='marca:' {...register("brand")}/>
                    <input className='submit' value='Enviar' type="submit"/>
                </form>
            </div>
            <Footer/>
        </div>
    )
}


