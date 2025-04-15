import BackGround from '../../layout/BackGround';
import { useForm } from 'react-hook-form';
import './CanalDenuncia.css';
import { useNavigate } from 'react-router-dom';
import TitleLogo from '../../layout/TitleLogo';
import { FaArrowLeft } from 'react-icons/fa';
import { database, ref, set, auth} from '../../firebase/Firebase';


interface Data{
    nome:string,
    email:string,
    cpf:string,
    tipoDenuncia:string,
    descricao:string
}

function CanalDenuncia() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const enviarDenuncia = (data: any) => {
        const userUid = auth.currentUser?.uid;
        const denunciaRef = ref(database, 'denuncias/'+userUid);
            const denunciaData:Data ={
                nome:data.nome || "N/a",
                email:data.email || "N/a",
                cpf:data.cpf || "N/a",
                tipoDenuncia:data.denuncia || "N/a",
                descricao:data.descricao || "N/a"
            }
            set(denunciaRef, denunciaData)
            .then(()=>{
                alert("conta criada com sucesso e salvo no banco");
                navigate('/Login');
            })
            .catch((error:any)=>{
                alert(error.code);
            })
    };

    return (
        <div className='CanalDenuncia'>
            <BackGround>
                <div className='ContainerCanalDenuncia'>
                    <button className='BotaoVoltarCanalDenuncia' onClick={() => navigate(-1)}>
                        <FaArrowLeft /> Voltar
                    </button>
                    <TitleLogo />
                    <div className='InnerContainerCanalDenuncia'>
                        <h1 className='TitleCanalDenuncia'>Canal de Denúncias</h1>
                        <form className='FormContainerCanalDenuncia' onSubmit={handleSubmit(enviarDenuncia)}>
                            <label className='txtCanalDenuncia'>Nome do Denunciante:</label>
                            <input
                                className='InputTextCanalDenuncia'
                                type='text'
                                placeholder='Nome Completo (Opcional)'
                                {...register("nome")}
                            />

                            <label className='txtCanalDenuncia'>Email de Contato:</label>
                            <input
                                className='InputTextCanalDenuncia'
                                type='email'
                                placeholder='Email'
                                {...register("email")}
                            />

                            <label className='txtCanalDenuncia'>CPF (Opcional):</label>
                            <input
                                className='InputTextCanalDenuncia'
                                type='text'
                                placeholder='CPF (se desejar)'
                                {...register("cpf")}
                            />

                            <label className='txtCanalDenuncia'>Tipo de Denúncia:</label>
                            <select
                                className='InputTextCanalDenuncia'
                                {...register("tipoDenuncia")}
                            >
                                <option value="Abandono">Abandono</option>
                                <option value="Agressão">Agressão</option>
                                <option value="Aprisionamento">Aprisionamento</option>
                                <option value="Outros">Outros</option>
                            </select>

                            <label className='txtCanalDenuncia'>Descrição do Incidente:</label>
                            <textarea
                                className='InputTextCanalDenuncia'
                                placeholder='Descreva o incidente'
                                {...register("descricao")}
                            ></textarea>

                            <label className='txtCanalDenuncia'>Anexar Evidências (se houver):</label>
                            <input
                                className='InputTextCanalDenuncia'
                                type='file'
                                {...register("evidencias")}
                            />

                            <input className='submitCanalDenuncia' value='Enviar Denúncia' type="submit" />
                        </form>
                    </div>
                </div>
            </BackGround>
        </div>
    );
}

export default CanalDenuncia;
