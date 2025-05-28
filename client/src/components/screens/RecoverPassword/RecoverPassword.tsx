import BackGround from '../../layout/BackGround';
import { useForm } from 'react-hook-form';
import {auth, sendPasswordResetEmail} from '../../firebase/Firebase';
import "./RecoverPassword.css"
import TitleLogo from '../../layout/TitleLogo';
import { Link } from 'react-router-dom';

function RecoverPassword(){
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
        <div className='RecoverPassword'>
            <BackGround>
                <div className='ContainerRecoverLogo'>
                    <div className='LogoDiv'>
                        <TitleLogo/>
                    </div>
                    <div className='RecoverContainer'>
                        <h4>Esqueceu a senha? Prencha os campos abaixo</h4>
                        <form className='FormContainer' onSubmit={handleSubmit(handlePasswordReset)}>
                            <input className='InputEmail' type='email' placeholder='Email' {...register("email")}/>
                            <input className='submit' value='Solicitar recuperação' type="submit"/>
                        </form>
                        <Link className='LinkReturn' to={'/Login'}>Voltar para o Login</Link>
                    </div>
                </div>
            </BackGround>
        </div>
    );
};

export default RecoverPassword;