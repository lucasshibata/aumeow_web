import {auth, createUserWithEmailAndPassword, database, ref, set} from '../firebase/Firebase';

export default async function signUp(data:any, navigation:any, type:string) {
    if (data.password === data.passwordAgain){
        await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((users)=>{
            console.log(users.user.uid);
            const userRef = ref(database, 'users/'+users.user.uid);
            const userData ={
                nome: data.name,
                cpf: data.cpf,
                email: data.email,
                senha: data.password,
                genero: data.gender,
                funcao: type
            }
            set(userRef, userData)
            .then(()=>{
                alert("conta criada com sucesso e salvo no banco");
                navigation('/Login')
            })
            .catch((error:any)=>{
                alert(error.code);
            })
        })
        .catch((error:any)=>{
            switch(error.code){
                case 'auth/email-already-in-use':
                    alert('O email inserido já está em uso!');
                    break;
                default:
                    alert('Outro erro');
                    break;
            }
        });
    } else {
        alert('senha de confirmação está incorreta, insira novamente!');
    }
}