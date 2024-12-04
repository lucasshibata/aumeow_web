import BackGround from '../layout/BackGround';
import { useForm } from 'react-hook-form';
import {auth, sendPasswordResetEmail} from '../firebase/Firebase';

export default function RecoverPassword(){
    const {register, handleSubmit} = useForm();
    
    async function handlePasswordReset (data:any) {
          await sendPasswordResetEmail(auth, data.email)
          .then(()=>{
            alert("mensagem enviada com sucesso");
          }).catch((error)=>{
            alert(error.code);
          });
      };
    return(
        <BackGround>
            <div>
                <h2>Recuperação de Senha</h2>
                <form className='FormContainer' onSubmit={handleSubmit(handlePasswordReset)}>
                    <label>Email de recuperação:</label>
                    <input className='InputEmail' type='email' placeholder='Email:' {...register("email")}/>
                    <input className='submit' value='Enviar' type="submit"/>
                </form>
            </div>
        </BackGround>
    );
};
