import './Login.css';
import BackGround from '../layout/BackGround';

import Space from '../layout/Space';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import SignIn from '../layout/SignIn';
import TitleLogo from '../layout/TitleLogo';
import withAuth from '../contexts/LoginContext';

function Login(){
	const {register, handleSubmit} = useForm();
	const navigate = useNavigate()

	return(
		<div className='Login'>
			<BackGround>
				<div className='Container'>
					<div className='divLogo'>
					<TitleLogo/>
					</div>	
					<Space h={10}/>
					<div className='InnerContainer'>
						<h1 className='Title'>Entrar</h1>
						<form className='FormContainer' onSubmit={handleSubmit((data)=>SignIn(data, navigate))}>
							<input className='InputText' type='email' placeholder='Email' {...register("email")} />
							<input className='InputText' type='password' placeholder='Senha' {...register("password")}/>
							<div className='FunctionsContainer'>
								<Link style={{margin:0, fontSize: '1.2rem', color:'#7360DF'}} to='/RecoverPassword'>Esqueci minha senha</Link>
								{/* <div className='CheckboxConnected'>
									<label className='Txt'>Manter Conectado
									<input value={1} className="checkbox" type="checkbox"/>
									</label>
								</div> */}
							</div>
							<input className='Submit' value='Enviar' type="submit"/>
						</form>
						<Space h={20}/>
						<Link style={{margin:0, fontSize: '1.2rem', color:'#7360DF'}} className="submit" to='/CreateUser'>Não possuo Cadastro</Link><br/>
					</div>	
				</div>
			</BackGround>
		</div>
	);
}

export default withAuth(Login);