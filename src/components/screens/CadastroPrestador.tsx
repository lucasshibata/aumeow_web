import React from 'react';
import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
import { useForm } from 'react-hook-form';
import {auth, createUserWithEmailAndPassword} from '../firebase/Firebase'


export default function CadastroPrestador(){
	const {register, handleSubmit} = useForm();

	async function signUp (data:any){
		try { 
			await createUserWithEmailAndPassword(auth, data.email, data.password); 
			alert("Conta criada com sucesso!"); 
		} catch (error:any) { 
			alert(error.message); 
		}
	}
	const styleh1:React.CSSProperties = {
		color: 'black'
	}
	return(
		<BackGround>
			<WhiteBox>
				<h1 style={styleh1}>Cadastro Prestador</h1>
				<form className='container' onSubmit={handleSubmit(signUp)}>
					<label className='txt'>Email:</label>
					<input type='email' placeholder='Email:' {...register("email")} />
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
	);
}
