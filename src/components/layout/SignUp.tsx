import {auth, createUserWithEmailAndPassword, database, ref, set} from '../firebase/Firebase';
interface Data{
    nome: string,
    cpf: string,
    email: string,
    senha: string,
    genero: string
    dtNascimento: string,
    endereco:string,
    telefone:string,
    funcao: string,
    nomeDoPet: string,
    especie: string,
    tipoAnimal: string,
    experiencia: string,
    raioAtendimento: string,
    animalPreferencia: string
}

export default async function signUp(data:any, navigation:any, type:string) {
    if (data.password === data.passwordAgain){
        await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((users)=>{
            console.log(users.user.uid);
            const userRef = ref(database, 'users/'+users.user.uid);
            const userData:Data ={
                nome: data.name || "N/a",
                cpf: data.cpf || "N/a",
                email: data.email || "N/a",
                senha: data.password || "N/a",
                genero: data.gender || "N/a",
                dtNascimento: data.dtNascimento || "N/a",
                endereco:data.endereco || "N/a",
                telefone:data.telefone || "N/a",
                funcao: type || "N/a",
                nomeDoPet: data.nomeDoPet || "N/a",
                especie: data.especie || "N/a",
                tipoAnimal: data.tipoAnimal || "N/a",
                experiencia: data.experiencia || "N/a",
                raioAtendimento: data.raioAtendimento || "N/a",
                animalPreferencia: data.animalPreferencia || "N/a"
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