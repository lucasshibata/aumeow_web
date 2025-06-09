import { useState, useRef } from 'react';
import BackGround from '../../layout/BackGround';
import { useForm } from 'react-hook-form';
import SignUp from '../../layout/SignUp';
import { useNavigate } from 'react-router-dom';
import TitleLogo from '../../layout/TitleLogo';
import withAuth from '../../contexts/LoginContext';
import "./CadastroContasAdministracao.css"
import { FaArrowLeft } from 'react-icons/fa';


function CadastroContasAdministracao(){
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);;

	const handleFileChange = (e:any) => {
        if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]);
          const imageUrl = URL.createObjectURL(e.target.files[0]);
          setImagePreview(imageUrl);
        }
    };

	const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
          } // abre o seletor de arquivos
    };
    
    return(
        <div className='CadastroContasAdministracao'>
            <BackGround>
                <div className='ContainerCadastroContasAdministracao'>
                    <button className='BotaoVoltarCadastroContasAdministracao' onClick={()=>navigate(-1)}><FaArrowLeft/> Voltar</button>
                    <TitleLogo/>
                    <div className='InnerContainerCadastroContasAdministracao'>
                        <h1 className='TitleCadastroContasAdministracao'>Cadastro de Contas</h1>
                        <form className='FormContainerCadastroContasAdministracao' onSubmit={handleSubmit((data)=>SignUp(data, navigate, "cliente", file))}>
                            <label className='txtCadastroContasAdministracao'>Nome:</label>
                            <input className='InputTextCadastroContasAdministracao' type='text' placeholder='Nome Completo:' {...register("name")} />
                            <label className='txtCadastroContasAdministracao'>CPF:</label>
                            <input className='InputTextCadastroContasAdministracao' type='text' placeholder='CPF:' {...register("cpf")} />
                            <label className='txtCadastroContasAdministracao'>Email:</label>
                            <input className='InputTextCadastroContasAdministracao' type='email' placeholder='Email:' {...register("email")} />
                            <label className='txtCadastroContasAdministracao'>Foto Pessoal:</label>
							{imagePreview && (
								<div  style={{ display:'flex', flexDirection:'column', width: '100%', height: 'auto', alignItems:'center'}}>
									<h3 className='txtCadastroContasAdministracao'>Prévia da Imagem:</h3>
									<img
										src={imagePreview}
										alt="Prévia da imagem selecionada"
										style={{ width: '40%', height: '100%', marginTop: '10px' }}
									/>
								</div>
							)}
							<input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								ref={fileInputRef}
								style={{ display: 'none' }}
							/>
							<button
								onClick={handleClick}
								className="botaoUploadImagemCadastroContasAdministracao"
							>Selecionar imagem</button>
                            <label className='txtCadastroContasAdministracao'>sexo:</label>
                            <select className='InputTextCadastroContasAdministracao' {...register("gender")}>
                                <option value="Feminino">Feminino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Outro">Outro</option>
                            </select>
                            <label className='txtCadastroContasAdministracao'>Senha:</label>
                            <input className='InputTextCadastroContasAdministracao' type='password' placeholder='senha:' {...register("password")}/>
                            <label className='txtCadastroContasAdministracao'>Repita a senha:</label>
                            <input className='InputTextCadastroContasAdministracao' type='password' placeholder='Repita a senha:' {...register("passwordAgain")}/>
                            <input className='submitCadastroContasAdministracao' value='Enviar' type="submit"/>
                        </form>
                    </div>
                </div>
            </BackGround>
        </div>
    );
}

export default withAuth(CadastroContasAdministracao);