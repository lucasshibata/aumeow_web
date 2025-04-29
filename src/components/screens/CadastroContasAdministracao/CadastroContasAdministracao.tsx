import { useState, useRef } from 'react';
import BackGround from '../../layout/BackGround';
import { useForm } from 'react-hook-form';
import SignUp from '../../layout/SignUp';
import { useNavigate } from 'react-router-dom';
import TitleLogo from '../../layout/TitleLogo';
import withAuth from '../../contexts/LoginContext';


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
        <div className='CadastroDono'>
            <BackGround>
                <div className='Container'>
                    <TitleLogo/>
                    <div className='InnerContainer'>
                        <h1 className='Title'>Cadastro de Cliente</h1>
                        <form className='FormContainer' onSubmit={handleSubmit((data)=>SignUp(data, navigate, "cliente", file))}>
                            <label className='txt'>Nome:</label>
                            <input className='InputText' type='text' placeholder='Nome Completo:' {...register("name")} />
                            <label className='txt'>CPF:</label>
                            <input className='InputText' type='text' placeholder='CPF:' {...register("cpf")} />
                            <label className='txt'>Email:</label>
                            <input className='InputText' type='email' placeholder='Email:' {...register("email")} />
                            <label className='txtCadastroDono'>Foto Pessoal:</label>
							{imagePreview && (
								<div  style={{ display:'flex', flexDirection:'column', width: '100%', height: 'auto', alignItems:'center'}}>
									<h3 className='txtCadastroDono'>Prévia da Imagem:</h3>
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
								className="botaoUploadImagemCadastroDono"
							>Selecionar imagem</button>
                            <label className='txt'>sexo:</label>
                            <select className='InputText' {...register("gender")}>
                                <option value="Feminino">Feminino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Outro">Outro</option>
                            </select>
                            <label className='txt'>Senha:</label>
                            <input className='InputText' type='password' placeholder='senha:' {...register("password")}/>
                            <label className='txt'>Repita a senha:</label>
                            <input className='InputText' type='password' placeholder='Repita a senha:' {...register("passwordAgain")}/>
                            <input className='submit' value='Enviar' type="submit"/>
                        </form>
                    </div>
                </div>
            </BackGround>
        </div>
    );
}

export default withAuth(CadastroContasAdministracao);