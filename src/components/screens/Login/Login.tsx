import './Login.css';
import BackGround from '../../layout/BackGround';
import Space from '../../layout/Space';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import SignIn from '../../layout/SignIn';
import TitleLogo from '../../layout/TitleLogo';
import withAuth from '../../contexts/LoginContext';
import { FaArrowLeft } from "react-icons/fa";

function Login(){
	const {register, handleSubmit} = useForm();
	const navigate = useNavigate()

	return(
		<div className='Login'>
			<BackGround>
				<div className='ContainerLogin'>
					<button className='BotaoVoltarLogin' onClick={()=>navigate("/TelaInicial")}><FaArrowLeft/> Voltar</button>
					<div className='divLogo'>
						<TitleLogo/>
					</div>	
					<Space h={10}/>
					<div className='InnerContainerLogin'>
						<h1 className='TitleLogin'>Entrar</h1>
						<form className='FormContainerLogin' onSubmit={handleSubmit((data)=>SignIn(data, navigate))}>
							<input className='InputText' type='email' placeholder='Email' {...register("email")} />
							<input className='InputText' type='password' placeholder='Senha' {...register("password")}/>
							<div className='FunctionsContainer'>
								<Link style={{margin:0, fontSize: '1.2rem', color:'var(--marrom-text)'}} to='/RecoverPassword'>Esqueci minha senha</Link>
							</div>
							<input className='Submit' value='Enviar' type="submit"/>
						</form>
						<Space h={20}/>
						<Link style={{margin:0, fontSize: '1.2rem', color:'var(--marrom-text)'}} className="submit" to='/CreateUser'>Não possuo Cadastro</Link><br/>
					</div>	
				</div>
			</BackGround>
		</div>
	);
}

export default withAuth(Login);