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
	const fileInputRef = useRef<HTMLInputElement>(null);

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
					<button className='BotaoVoltarCadastroDono' onClick={()=>navigate(-1)}><FaArrowLeft/> Voltar</button>
					<TitleLogo/>
					<div className='InnerContainerCadastroDono'>
						<h1 className='TitleCadastroDono'>Cadastro de Cliente</h1>
						<form className='FormContainerCadastroDono' onSubmit={handleSubmit((data)=>SignUp(data, navigate, "cliente", file))}>
							<label htmlFor="nomeCadastroDono" className='txtCadastroDono'>Nome:</label>
							<input id="nomeCadastroDono" className='InputTextCadastroDono' type='text' placeholder='Nome Completo:' {...register("name")} />
							<label htmlFor="CPFCadastroDono" className='txtCadastroDono'>CPF:</label>
							<input id="CPFCadastroDono" className='InputTextCadastroDono' type='text' placeholder='CPF:' inputMode="numeric" maxLength={11} pattern="\d*" {...register("cpf")} />
							<label htmlFor="emailCadastroDono" className='txtCadastroDono'>Email:</label>
							<input id="emailCadastroDono" className='InputTextCadastroDono' type='email' placeholder='Email:' {...register("email")} />
							<label htmlFor="dataDeNascimentoCadastroDono" className='txtCadastroDono'>Data de Nascimento:</label>
							<input id="dataDeNascimentoCadastroDono" className='InputTextCadastroDono' type='date' placeholder='Data:' {...register("dtNascimento")} />
							<label htmlFor="enderecoCadastroDono" className='txtCadastroDono'>Endereço:</label>
							<input id="enderecoCadastroDono" className='InputTextCadastroDono' type='text' placeholder='Endereço:' {...register("endereco")} />
							<label htmlFor="telefoneContatoCadastroDono" className='txtCadastroDono'>Telefone de Contato:</label>
							<input id="telefoneContatoCadastroDono" className='InputTextCadastroDono' type='text' placeholder='Telefone:' {...register("telefone")} />
							<label htmlFor="nomePetCadastroDono" className='txtCadastroDono'>Nome do Pet:</label>
							<input id="nomePetCadastroDono" className='InputTextCadastroDono' type='text' placeholder='Nome Do Pet:' {...register("nomeDoPet")} />
							<label htmlFor="especieCadastroDono" className='txtCadastroDono'>Espécie do Pet:</label>
							<input id="especieCadastroDono" className='InputTextCadastroDono' type='text' placeholder='Espécie Do Pet:' {...register("especie")} />
							<label htmlFor="tipoAnimalCadastroDono" className='txtCadastroDono'>Tipo do Animal:</label>
							<select id="tipoAnimalCadastroDono" className='InputTextCadastroDono' {...register("tipoAnimal")}>
								<option value="gato">Gato</option>
								<option value="cachorro">Cachorro</option>
							</select>
							<label htmlFor="arquivoImagemCadastroDono" className='txtCadastroDono'>Foto Pessoal:</label>
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
								id="arquivoImagemCadastroDono"
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
							<label htmlFor="sexoCadastroDono" className='txtCadastroDono'>sexo:</label>
							<select id="sexoCadastroDono" className='InputTextCadastroDono' {...register("gender")}>
								<option value="Feminino">Feminino</option>
								<option value="Masculino">Masculino</option>
								<option value="Outro">Outro</option>
							</select>
							<label htmlFor="senhaCadastroDono" className='txtCadastroDono'>Insira a senha:</label>
							<input id="senhaCadastroDono" className='InputTextCadastroDono' type='password' placeholder='Insira a senha:' {...register("password")}/>
							<label htmlFor="senhaDeNovoCadastroDono" className='txtCadastroDono'>Repita a senha:</label>
							<input  id="senhaDeNovoCadastroDono" className='InputTextCadastroDono' type='password' placeholder='Repita a senha:' {...register("passwordAgain")}/>
							<input className='submitCadastroDono' value='Enviar' type="submit"/>
						</form>
					</div>
				</div>
			</BackGround>
		</div>
	);
}

export default CadastroDono;