import { useState, useRef } from 'react';
import BackGround from '../../layout/BackGround';
import { useForm } from 'react-hook-form';
import './CadastroPrestador.css';
import SignUp from '../../layout/SignUp';
import { useNavigate } from 'react-router-dom';
import TitleLogo from '../../layout/TitleLogo';
import { FaArrowLeft } from 'react-icons/fa';

function CadastroPrestador(){
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
		<div className='CadastroPrestador'>
			<BackGround>
				<div className='ContainerCadastroPrestador'>
					<button className='BotaoVoltarCadastroPrestador' onClick={()=>navigate(-1)}><FaArrowLeft/> Voltar</button>
					<TitleLogo/>
					<div className='InnerContainerCadastroPrestador'>
						<h1 className='TitleCadastroPrestador'>Cadastro Prestador</h1>
						<form className='FormContainerCadastroPrestador' onSubmit={handleSubmit((data)=>SignUp(data, navigate, "prestador", file))}>
							<label className='txtCadastroPrestador'>Nome:</label>
							<input className='InputTextCadastroPrestador' type='text' placeholder='Nome Completo:' {...register("name")} />
							<label className='txtCadastroPrestador'>CPF:</label>
							<input className='InputTextCadastroPrestador' type='text' placeholder='CPF:' {...register("cpf")} />
							<label className='txtCadastroPrestador'>Email:</label>
							<input className='InputTextCadastroPrestador' type='email' placeholder='Email:' {...register("email")} />
							<label className='txtCadastroPrestador'>Data de Nascimento:</label>
							<input className='InputTextCadastroPrestador' type='date' placeholder='Data:' {...register("dtNascimento")} />
							<label className='txtCadastroPrestador'>Endereço:</label>
							<input className='InputTextCadastroPrestador' type='text' placeholder='Endereço:' {...register("endereco")} />
							<label className='txtCadastroPrestador'>Telefone de Contato:</label>
							<input className='InputTextCadastroPrestador' type='text' placeholder='Telefone:' {...register("telefone")} />
							<label className='txtCadastroPrestador'>Experiência:</label>
							<input className='InputTextCadastroPrestador' type='text' placeholder='Diga sua exeperiência:' {...register("experiencia")} />
							<label className='txtCadastroPrestador'>Raio de Atendimento (Km):</label>
							<input className='InputTextCadastroPrestador' type='number' placeholder='Raio:' {...register("raioKM")} />
							<label className='txtCadastroPrestador'>Animal de Preferência:</label>
							<select className='InputTextCadastroPrestador' {...register("animallPreferencia")}>
								<option value="gato">Gato</option>
								<option value="cachorro">Cachorro</option>
							</select>
							<label className='txtCadastroPrestador'>Foto Pessoal:</label>
							{imagePreview && (
								<div  style={{ display:'flex', flexDirection:'column', width: '30vw', height: 'auto', alignItems:'center'}}>
									<h3 className='txtCadastroDono'>Prévia da Imagem:</h3>
									<img
										src={imagePreview}
										alt="Prévia da imagem selecionada"
										style={{ width: '30%', height: 'auto', marginTop: '10px' }}
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
								type='button'
								className="botaoUploadImagemCadastroPrestador"
							>Selecionar imagem</button>
							<label className='txtCadastroPrestador'>sexo:</label>
							<select className='InputTextCadastroPrestador' {...register("gender")}>
								<option value="Feminino">Feminino</option>
								<option value="Masculino">Masculino</option>
								<option value="Outro">Outro</option>
							</select>
							<label className='txtCadastroPrestador'>Senha:</label>
							<input className='InputTextCadastroPrestador' type='password' placeholder='senha:' {...register("password")}/>
							<label className='txtCadastroPrestador'>Repita a senha:</label>
							<input className='InputTextCadastroPrestador' type='password' placeholder='Repita a senha:' {...register("passwordAgain")}/>
							<input className='submitCadastroPrestador' value='Enviar' type="submit"/>
						</form>
					</div>
				</div>
			</BackGround>
		</div>
	);
}

export default CadastroPrestador;