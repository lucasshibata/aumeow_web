import React from 'react';
import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
import RenderLogo from '../layout/RenderLogo';
import TitleBusiness from '../layout/TitleBusiness';
import Space from '../layout/Space';
import { useForm } from 'react-hook-form';
import {auth, createUserWithEmailAndPassword, database, ref, set} from '../firebase/Firebase';


export default function CadastroDono(){
	const {register, handleSubmit} = useForm();

	async function signUp (data:any){
		if(data.password === data.passwordAgain){
			await createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((users)=>{
				console.log(users.user.uid);
				const userRef = ref(database, 'users/'+users.user.uid);
				const userData ={
					nome: data.name,
					cpf: data.cpf,
					email: data.email,
					senha: data.password,
					genero: data.gender,
					funcao: 'cliente'
				}
				set(userRef, userData)
				.then(()=>{
					alert("conta criada com sucesso e salvo no banco");
				})
				.catch((error:any)=>{
					alert(error.code);
				})
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
		} else {
			alert('senha de confirmação está incorreta, insira novamente!');
		} 
	}
	
	return(
		<BackGround>
			<RenderLogo/>
			<TitleBusiness/>
			<Space w={20}/>
			<WhiteBox>
				<h1 className='Title'>Cadastro de Cliente</h1>
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

