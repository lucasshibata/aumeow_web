import { useState, useRef } from 'react';
import BackGround from '../../layout/BackGround';
import { useForm } from 'react-hook-form';
import SignUp from '../../layout/SignUp';
import { useNavigate } from 'react-router-dom';
import TitleLogo from '../../layout/TitleLogo';
import './CadastroDono.css'
import { FaArrowLeft } from 'react-icons/fa';


function CadastroDono(){
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
				<div className='ContainerCadastroDono'>
					<button className='BotaoVoltarCadastroPrestador' onClick={()=>navigate(-1)}><FaArrowLeft/> Voltar</button>
					<TitleLogo/>
					<div className='InnerContainerCadastroDono'>
						<h1 className='TitleCadastroDono'>Cadastro de Cliente</h1>
						<form className='FormContainerCadastroDono' onSubmit={handleSubmit((data)=>SignUp(data, navigate, "cliente", file))}>
							<label className='txtCadastroDono'>Nome:</label>
							<input className='InputTextCadastroDono' type='text' placeholder='Nome Completo:' {...register("name")} />
							<label className='txtCadastroDono'>CPF:</label>
							<input className='InputTextCadastroDono' type='text' placeholder='CPF:' {...register("cpf")} />
							<label className='txtCadastroDono'>Email:</label>
							<input className='InputTextCadastroDono' type='email' placeholder='Email:' {...register("email")} />
							<label className='txtCadastroDono'>Data de Nascimento:</label>
							<input className='InputTextCadastroDono' type='date' placeholder='Data:' {...register("dtNascimento")} />
							<label className='txtCadastroDono'>Endereço:</label>
							<input className='InputTextCadastroDono' type='text' placeholder='Endereço:' {...register("endereco")} />
							<label className='txtCadastroDono'>Telefone de Contato:</label>
							<input className='InputTextCadastroDono' type='text' placeholder='Telefone:' {...register("telefone")} />
							<label className='txtCadastroDono'>Foto Pessoal:</label>
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
								className="botaoUploadImagemCadastroDono"
								type='button'
							>Selecionar imagem</button>
							<label className='txtCadastroDono'>sexo:</label>
							<select className='InputTextCadastroDono' {...register("gender")}>
								<option value="Feminino">Feminino</option>
								<option value="Masculino">Masculino</option>
								<option value="Outro">Outro</option>
							</select>
							<label className='txtCadastroDono'>Senha:</label>
							<input className='InputTextCadastroDono' type='password' placeholder='senha:' {...register("password")}/>
							<label className='txtCadastroDono'>Repita a senha:</label>
							<input className='InputTextCadastroDono' type='password' placeholder='Repita a senha:' {...register("passwordAgain")}/>
							<input className='submitCadastroDono' value='Enviar' type="submit"/>
						</form>
					</div>
				</div>
			</BackGround>
		</div>
	);
}

export default CadastroDono;