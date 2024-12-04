import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
import BtnComp from '../layout/BtnComp';
import Space from '../layout/Space';
import './CreateUser.css'
import TitleLogo from '../layout/TitleLogo';

export default function CreateUser(){
	return(
		<div className='CreateUser'>
			<BackGround>
				<div className='Container'>
					<TitleLogo/>
					<Space w={20}/>
					<WhiteBox>
						<h1 className='Title'>Bem-vindo ao AuMeow!</h1>
						<Space h={10}/>
						<p className='Txt'>Escolha uma opção para se cadastrar:</p>
						<Space h={10}/>
						<div className='ContainerBtns'>
							<BtnComp
								labelButton="Dono de Pet"
								toPress='CadastroDono'
							/>
							<BtnComp
								labelButton="Prestador de Serviços"
								toPress='CadastroPrestador'
							/>
						</div>
					</WhiteBox>
				</div>
				
			</BackGround>
		</div>
	);
}