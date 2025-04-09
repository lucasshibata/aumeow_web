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
	
	return(
		<div className='CadastroPrestador'>
			<BackGround>
				<div className='ContainerCadastroPrestador'>
					<button className='BotaoVoltarCadastroPrestador' onClick={()=>navigate(-1)}><FaArrowLeft/> Voltar</button>
					<TitleLogo/>
					<div className='InnerContainerCadastroPrestador'>
						<h1 className='TitleCadastroPrestador'>Cadastro Prestador</h1>
						<form className='FormContainerCadastroPrestador' onSubmit={handleSubmit((data)=>SignUp(data, navigate, "prestador"))}>
							<label className='txtCadastroPrestador'>Nome:</label>
							<input className='InputTextCadastroPrestador' type='text' placeholder='Nome Completo:' {...register("name")} />
							<label className='txtCadastroPrestador'>CPF:</label>
							<input className='InputTextCadastroPrestador' type='text' placeholder='CPF:' {...register("cpf")} />
							<label className='txt'>Email:</label>
							<input className='InputTextCadastroPrestador' type='email' placeholder='Email:' {...register("email")} />
							<label className='txtCadastroPrestador'>Senha:</label>
							<input className='InputTextCadastroPrestador' type='password' placeholder='senha:' {...register("password")}/>
							<label className='txtCadastroPrestador'>Repita a senha:</label>
							<input className='InputTextCadastroPrestador' type='password' placeholder='Repita a senha:' {...register("passwordAgain")}/>
							<label className='txtCadastroPrestador'>sexo:</label>
							<select className='InputTextCadastroPrestador' {...register("gender")}>
								<option value="Feminino">Feminino</option>
								<option value="Masculino">Masculino</option>
								<option value="Outro">Outro</option>
							</select>
							<input className='submitCadastroPrestador' value='Enviar' type="submit"/>
						</form>
					</div>
				</div>
			</BackGround>
		</div>
	);
}

export default CadastroPrestador;