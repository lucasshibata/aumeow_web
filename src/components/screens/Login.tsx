import React from 'react';
import './Login.css';

import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
// import BtnComp from '../layout/BtnComp.tsx';
// import OAuth2 from '../layout/OAuth2.tsx';
import Space from '../layout/Space';
import RenderLogo from '../layout/RenderLogo';
import TitleBusiness from '../layout/TitleBusiness';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import {auth, signInWithEmailAndPassword} from '../firebase/Firebase'


export default function Login(){
	const navigate = useNavigate()
	const {register, handleSubmit} = useForm();

	async function signIn(data:any){
		console.log(data);
		await signInWithEmailAndPassword(auth, data.email, data.password).then(()=>{
			console.log('login com sucesso');
			navigate('/NavigationScreen');
		})
		.catch((error:any)=>{
			console.log(error.code)
			switch(error.code){
				case 'auth/invalid-credential':
					alert('Usuário ou senha errada!');
				break;
				case 'auth/invalid-email':
					alert('O e-mail fornecido não está no formato correto!');
					break;
				case 'auth/missing-password':
					alert('Campo de senha está em branco!')
					break;
				default:
					alert("algum outro erro");
			}
		});
	}
	return(
		<div className='Login'>
			<BackGround>
				<RenderLogo/>
				<TitleBusiness/>
				<Space h={10}/>
				<WhiteBox>
					<h1 className='title'>Entrar</h1>
					<form className='container' onSubmit={handleSubmit(signIn)}>
						<label className='txt'>Email:</label>
						<input className='inputText' type='email' placeholder='Email:' {...register("email")} />
						<label className='txt'>Senha:</label>
						<input className='inputText' type='password' placeholder='senha:' {...register("password")}/>
						{/* <select {...register("gender")}>
							<option value="female">female</option>
							<option value="male">male</option>
							<option value="other">other</option>
						</select> */}
						<input className='submit' value='Enviar' type="submit"/>
					</form>
					<Link to='/CreateUser'>Não possuo Cadastro</Link><br/>
					<Link to='/RecoverPassword'>Esqueci minha senha</Link>
				</WhiteBox>	
			</BackGround>
		</div>
	);
}
