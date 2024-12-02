import React from 'react';
import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
import BtnComp from '../layout/BtnComp';
import RenderLogo from '../layout/RenderLogo';
import Space from '../layout/Space';
import TitleBusiness from '../layout/TitleBusiness';
import './CreateUser.css'
import TitleLogo from '../layout/TitleLogo';

export default function CreateUser(){
	return(
		<div className='CreateUser'>
			<BackGround>
				<div className='Container' style={{boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)', borderRadius: "15px"}}>
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