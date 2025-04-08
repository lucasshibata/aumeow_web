import BackGround from '../../layout/BackGround';
import BtnComp from '../../layout/BtnComp';
import Space from '../../layout/Space';
import './CreateUser.css'
import TitleLogo from '../../layout/TitleLogo';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function CreateUser(){
	const navigate = useNavigate();
	return(
		<div className='CreateUser'>
			<BackGround>
				<div className='ContainerCreateUser'>
					<button className='BotaoVoltarCreateUser' onClick={()=>navigate(-1)}><FaArrowLeft/> Voltar</button>
					<TitleLogo/>
					<Space w={20}/>
					<div className='InnerContainerCreateUser'>
						<h1 className='TitleCreateUser'>Bem-vindo ao AuMeow!</h1>
						<Space h={10}/>
						<p className='TxtCreateUser'>Escolha uma opção para se cadastrar:</p>
						<Space h={10}/>
						<div className='ContainerBtnsCreateUser'>
							<BtnComp
								labelButton="Dono de Pet"
								toPress='CadastroDono'
							/>
							<BtnComp
								labelButton="Prestador de Serviços"
								toPress='CadastroPrestador'
							/>
						</div>
					</div>
				</div>	
			</BackGround>
		</div>
	);
}

export default CreateUser;