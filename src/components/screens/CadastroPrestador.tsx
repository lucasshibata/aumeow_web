import React from 'react';
import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
import { useForm } from 'react-hook-form';
import {auth, createUserWithEmailAndPassword} from '../firebase/Firebase'
import RenderLogo from '../layout/RenderLogo';
import TitleBusiness from '../layout/TitleBusiness';
import Space from '../layout/Space';
import './CadastroPrestador.css';


export default function CadastroPrestador(){
	const {register, handleSubmit} = useForm();

	async function signUp (data:any){
		await createUserWithEmailAndPassword(auth, data.email, data.password)
		.then(()=>{
			alert("Conta criada com sucesso!");
		})
		.catch((error:any)=>{
			switch(error.code){
				case 'auth/email-already-in-use':
					alert('O email inserido já está em uso!');
					break;
				default:
					alert('Outro erro');
					break;
			}
		});  
	}
	
	return(
		<BackGround>
			<RenderLogo/>
			<TitleBusiness/>
			<Space w={20}/>
			<WhiteBox>
				<h1 className='Title'>Cadastro Prestador</h1>
				<form className='Container' onSubmit={handleSubmit(signUp)}>
					<label className='txt'>Nome:</label>
					<input className='InputText' type='text' placeholder='Nome Completo:' {...register("name")} />
					<label className='txt'>CPF:</label>
					<input className='InputText' type='text' placeholder='CPF:' {...register("cpf")} />
					<label className='txt'>Email:</label>
					<input className='InputText' type='email' placeholder='Email:' {...register("email")} />
					<label className='txt'>Senha:</label>
					<input className='InputText' type='password' placeholder='senha:' {...register("password")}/>
					<label className='txt'>Repita a senha:</label>
					<input className='InputText' type='password' placeholder='Repita a senha:' {...register("passwordAgain")}/>
					<label className='txt'>sexo:</label>
					<select className='InputText' {...register("gender")}>
						<option value="Feminino">Feminino</option>
						<option value="Masculino">Masculino</option>
						<option value="Outro">Outro</option>
					</select>
					<input className='submit' value='Enviar' type="submit"/>
				</form>
			</WhiteBox>
		</BackGround>
	);
}
