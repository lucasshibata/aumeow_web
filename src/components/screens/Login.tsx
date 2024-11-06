import React from 'react';
import './Login.css';

import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
// import BtnComp from '../layout/BtnComp.tsx';
// import OAuth2 from '../layout/OAuth2.tsx';
import Space from '../layout/Space';
import RenderLogo from '../layout/RenderLogo';
import { FaInstagram } from 'react-icons/fa';
import TitleBusiness from '../layout/TitleBusiness';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {auth, signInWithEmailAndPassword} from '../firebase/Firebase'


export default function Login(props:any){
	const navigate = useNavigate()
	const {register, handleSubmit} = useForm();

	function signIn(data:any){
		console.log(data);
		signInWithEmailAndPassword(auth, data.loginEmail, data.loginPassword).then(()=>{
			console.log('login com sucesso');
			alert("login com sucesso");
			navigate("/")
		})
		.catch((error:any)=>{
			if(error.code === 'auth/user-not-found'){
				console.log('Não há registro de usuário existente');
				alert("Não há registro de usuário existente");
				navigate("/")
			}
			if(error.code === 'auth/invalid-email'){
				console.log('email inválido');
				alert('email inválido');
				navigate("/")
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
						<input type='email' placeholder='Email:' {...register("firstName")} />
						<label className='txt'>Senha:</label>
						<input type='password' placeholder='senha:' {...register("password")}/>
						{/* <select {...register("gender")}>
							<option value="female">female</option>
							<option value="male">male</option>
							<option value="other">other</option>
						</select> */}
						<input type="submit" />
					</form>
				</WhiteBox>	
			</BackGround>
		</div>
	);
}
