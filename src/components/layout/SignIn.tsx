import {auth, signInWithEmailAndPassword, ref, database, get} from '../firebase/Firebase';

export default async function SignIn(data:any, navigation:any){
		console.log(data);
		await signInWithEmailAndPassword(auth, data.email, data.password).then((user)=>{
			console.log('login com sucesso');
			const dataDb = ref(database, 'users/'+user.user.uid+'/funcao')
			get(dataDb).then((snapshot)=>{
				if (snapshot.val() === 'cliente'){
					navigation('/MenuCliente');
				} else if (snapshot.val() ==='prestador'){
					navigation('/MenuPrestador');
				} else if (snapshot.val() ==='administrador'){
					navigation('/MenuAdministracao');
				}
			})
		})
		.catch((error:any)=>{
			console.log(error.code)
			switch(error.code){
				case 'auth/invalid-credential':
					alert('Usuário ou senha errada!');
				break;
				case 'auth/invalid-email':
					alert('O e-mail fornecido não está no formato correto!');
					break;
				case 'auth/missing-password':
					alert('Campo de senha está em branco!')
					break;
				default:
					alert("algum outro erro");
			}
		});
}