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
	
	return(
		<div className='CadastroDono'>
			<BackGround>
				<div className='ContainerCadastroDono'>
					<button className='BotaoVoltarCadastroPrestador' onClick={()=>navigate(-1)}><FaArrowLeft/> Voltar</button>
					<TitleLogo/>
					<div className='InnerContainerCadastroDono'>
						<h1 className='TitleCadastroDono'>Cadastro de Cliente</h1>
						<form className='FormContainerCadastroDono' onSubmit={handleSubmit((data)=>SignUp(data, navigate, "cliente"))}>
							<label className='txtCadastroDono'>Nome:</label>
							<input className='InputTextCadastroDono' type='text' placeholder='Nome Completo:' {...register("name")} />
							<label className='txtCadastroDono'>CPF:</label>
							<input className='InputTextCadastroDono' type='text' placeholder='CPF:' {...register("cpf")} />
							<label className='txtCadastroDono'>Email:</label>
							<input className='InputTextCadastroDono' type='email' placeholder='Email:' {...register("email")} />
							<label className='txtCadastroDono'>Senha:</label>
							<input className='InputTextCadastroDono' type='password' placeholder='senha:' {...register("password")}/>
							<label className='txtCadastroDono'>Repita a senha:</label>
							<input className='InputTextCadastroDono' type='password' placeholder='Repita a senha:' {...register("passwordAgain")}/>
							<label className='txtCadastroDono'>sexo:</label>
							<select className='InputTextCadastroDono' {...register("gender")}>
								<option value="Feminino">Feminino</option>
								<option value="Masculino">Masculino</option>
								<option value="Outro">Outro</option>
							</select>
							<input className='submitCadastroDono' value='Enviar' type="submit"/>
						</form>
					</div>
				</div>
			</BackGround>
		</div>
	);
}

export default CadastroDono;