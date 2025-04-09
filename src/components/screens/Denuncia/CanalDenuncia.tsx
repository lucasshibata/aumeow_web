import BackGround from '../../layout/BackGround';
import { useForm } from 'react-hook-form';
import './CanalDenuncia.css';
import { useNavigate } from 'react-router-dom';
import TitleLogo from '../../layout/TitleLogo';
import { FaArrowLeft } from 'react-icons/fa';

function CanalDenuncia() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const enviarDenuncia = (data: any) => {
        console.log(data);
        alert('Denúncia enviada com sucesso!');
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
                                <option value="Assédio">Assédio</option>
                                <option value="Corrupção">Corrupção</option>
                                <option value="Violência">Violência</option>
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
