import React from 'react';
import BackGround from '../layout/BackGround';
import WhiteBox from '../layout/WhiteBox';
import RenderLogo from '../layout/RenderLogo';
import TitleBusiness from '../layout/TitleBusiness';
import Space from '../layout/Space';
import { useForm, Controller} from 'react-hook-form';
import BtnComp from '../layout/BtnComp';
// import Auth from '@react-native-firebase/auth';
// import Database from '@react-native-firebase/database';


export default function CadastroDono(props:any){
	const {navigation} = props;
	const { control, handleSubmit} = useForm();

	// function handleSign(data:any){
	// 	Auth().createUserWithEmailAndPassword(data.userEmail, data.userPassword)
	// 	.then(userCrendential =>{
	// 		console.log('user: ', userCrendential);
	// 		const userRef = Database().ref(`/users/${userCrendential.user.uid}`).push();
	// 		userRef.set({
	// 			...data,
	// 			uid: userRef.key, // Adiciona o UID gerado pelo Firebase
	// 		});
	// 		navigation.navigate('Login');
	// 	})
	// 	.catch(error=>{
	// 		if(error.code === 'auth/email-already-in-use'){
	// 			console.log('email já existe');
	// 			Alert.alert('email já existe');
	// 		}
	// 		if(error.code === 'auth/invalid-email'){
	// 			Alert.alert('email inválido');
	// 			console.log('email inválido');
	// 		}
	// 	});
	// }

	const onSubmit = (data:any) => {
		console.log(data);
	};

	return(
		<BackGround>
			<RenderLogo/>
			<TitleBusiness/>
			<WhiteBox>
				<h1>Encontre todos os serviços que seu Pet precisa</h1>
				<Space h={10}/>
				<form onSubmit={handleSubmit(onSubmit)} className='Container'>
					<Controller
						control={control}
						name="userName"
						render={({ field: { onChange, value } }) => (
						<input
							placeholder="Seu Nome:"
							style={{ padding: '8px', fontSize: '16px' }}
							onChange={onChange}
							value={value}
						/>
						)}
					/>
					
					<Controller
						control={control}
						name="userSurname"
						render={({ field: { onChange, value } }) => (
						<input
							placeholder="Seu Sobrenome:"
							style={{ padding: '8px', fontSize: '16px' }}
							onChange={onChange}
							value={value}
						/>
						)}
					/>
					
					<Controller
						control={control}
						name="userEmail"
						render={({ field: { onChange, value } }) => (
						<input
							type="email"
							placeholder="Email:"
							style={{ padding: '8px', fontSize: '16px' }}
							onChange={onChange}
							value={value}
						/>
						)}
					/>
					
					<Controller
						control={control}
						name="userPassword"
						render={({ field: { onChange, value } }) => (
						<input
							type="password"
							placeholder="Senha:"
							style={{ padding: '8px', fontSize: '16px' }}
							onChange={onChange}
							value={value}
						/>
						)}
					/>
					
					<Controller
						control={control}
						name="userConfirmPass"
						render={({ field: { onChange, value } }) => (
						<input
							type="password"
							placeholder="Confirme a senha:"
							style={{ padding: '8px', fontSize: '16px' }}
							onChange={onChange}
							value={value}
						/>
						)}
					/>

					<button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Enviar</button>
				</form>
				{/* <BtnComp labelButton="aperte" toPress={handleSubmit(handleSign)} bgColor={'blue'}/> */}
			</WhiteBox>
		</BackGround>
	);
}

