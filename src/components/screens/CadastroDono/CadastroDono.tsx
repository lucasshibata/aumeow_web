import BackGround from '../../layout/BackGround';
import { useForm } from 'react-hook-form';
import SignUp from '../../layout/SignUp';
import { useNavigate } from 'react-router-dom';
import TitleLogo from '../../layout/TitleLogo';
import './CadastroDono.css'



function CadastroDono(){
	const {register, handleSubmit} = useForm();
	const navigate = useNavigate();
	
	return(
		<div className='CadastroDono'>
			<BackGround>
				<div className='Container'>
					<TitleLogo/>
					<div className='InnerContainer'>
						<h1 className='Title'>Cadastro de Cliente</h1>
						<form className='FormContainer' onSubmit={handleSubmit((data)=>SignUp(data, navigate, "cliente"))}>
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
					</div>
				</div>
			</BackGround>
		</div>
	);
}

export default CadastroDono;