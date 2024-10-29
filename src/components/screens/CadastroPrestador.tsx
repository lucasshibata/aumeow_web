import React from 'react';
import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
import BtnComp from '../layout/BtnComp';


export default function CadastroPrestador(props:any){
	const {navigation} = props;
	return(
		<BackGround>
			<WhiteBox>
				<p>Cadastro Prestador</p>
				<BtnComp labelButton="voltar menu" toPress={()=>navigation.navigate('Login')}/>
			</WhiteBox>
		</BackGround>
	);
}
