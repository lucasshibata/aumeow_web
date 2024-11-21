import { useForm } from "react-hook-form"
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function RegistroServicoPrestador(){
    const {register, handleSubmit} = useForm();
    function enviarServico(data:any){
        console.log(data)
    }
    return(
        <div>
            <Header/>
            <form onSubmit={handleSubmit(enviarServico)}>
                <input type="text" {...register("servico")}/>
                <input type="text" {...register("servico")}/>
                <input type="submit" />
            </form>
            <Footer/>
        </div>
    )
}