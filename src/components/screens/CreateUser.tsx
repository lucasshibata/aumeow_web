import React from 'react';
import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
import BtnComp from '../layout/BtnComp';
import RenderLogo from '../layout/RenderLogo';
import Space from '../layout/Space';

export default function CreateUser(){
	const styles = {
		title:{
			fontSize:30,
			color:'#7360DF',
			margin:0
		},
		txt:{
			fontSize:18,
			color:'#7360DF',
		},
		containerBtns:{
			display:'flex',
			justifyContent: 'space-around',
			gap:20
		},
	};
	return(
		<BackGround>
		 	<RenderLogo/>
		 	<Space w={20}/>
		 	<WhiteBox>
		 		<h1 style={styles.title}>Bem-vindo ao AuMeow!</h1>
		 		<Space h={10}/>
		 		<p style={styles.txt}>Escolha uma opção para se cadastrar:</p>
				<Space h={10}/>
		 		<div style={styles.containerBtns}>
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
		</BackGround>
	);
}