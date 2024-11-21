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
import SignIn from '../layout/SignIn';


export default function Login(){
	const {register, handleSubmit} = useForm();
	const navigate = useNavigate()

	return(
		<div className='Login'>
			<BackGround>
				<div className='Container'>
					<div className='divLogo'>
						<RenderLogo/>
						<TitleBusiness/>
					</div>
					<Space h={10}/>
					<WhiteBox>
						<h1 className='Title'>Entrar</h1>
						<form className='FormContainer' onSubmit={handleSubmit((data)=>SignIn(data, navigate))}>
							{/* <label className='Txt'>Email:</label> */}
							<input className='InputText' type='email' placeholder='Email' {...register("email")} />
							{/* <label className='Txt'>Senha:</label> */}
							<input className='InputText' type='password' placeholder='Senha' {...register("password")}/>
							{/* <select {...register("gender")}>
								<option value="female">female</option>
								<option value="male">male</option>
								<option value="other">other</option>
							</select> */}
							<div className='FunctionsContainer'>
							<div className='CheckboxConnected'>
								<label className='Txt'>Manter Conectado
								<input value={1} className="checkbox" type="checkbox"/>
								</label>
							</div>
								<Link to='/RecoverPassword'>Esqueci minha senha</Link>
							</div>
							<input className='Submit' value='Enviar' type="submit"/>
						</form>
						<Space h={20}/>
						<Link className="submit" to='/CreateUser'>Não possuo Cadastro</Link><br/>
					</WhiteBox>	
				</div>
			</BackGround>
		</div>
	);
}
