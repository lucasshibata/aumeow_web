import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import withAuth from "../../contexts/LoginContext"
import EditProfile from "../../layout/EditProfile";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { ref, database, get, auth} from "../../firebase/Firebase";
import './EdicaoPerfil.css'

interface Data{
    nome: string,
    cpf: string,
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

function EdicaoPerfil(){
    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [user, setUser] = useState<Data|null>(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);
        
    const handleFileChange = (e:any) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setImagePreview(imageUrl);
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
            } // abre o seletor de arquivos
    };
    useEffect(() => {
        const servicesRef = ref(database, `users/${auth.currentUser?.uid}`);
        async function snapshot() {
            const result = await get(servicesRef);
            setUser(result.val());
        }
        snapshot();
    }, []);
      
    useEffect(() => {
        if (user) {
            const dadosUsuario = {
                name: user?.nome || "",
                cpf: user?.cpf || "",
                dtNascimento: user?.dtNascimento || "",
                endereco: user?.endereco || "",
                telefone: user?.telefone || "",
                nomeDoPet: user?.nomeDoPet || "",
                especie: user?.especie || "",
                tipoAnimal: user?.tipoAnimal || "",
                gender: user?.genero || "",
                password: user.senha ||""
            };
            reset(dadosUsuario); // Agora isso só roda uma vez
        }
    }, [user, reset]);

    return(
        <div className="ContainerEdicaoPerfil">
            <Header/>
            <div className="InnerContainerEdicaoPerfil">
                <form className='FormContainerEdicaoPerfil' onSubmit={handleSubmit((data)=>EditProfile(data, navigate, "cliente", file))}>
                    <label className='txtEdicaoPerfil'>Nome:</label>
                    <input className='InputTextEdicaoPerfil' type='text' placeholder='Nome Completo:' {...register("name")} />
                    <label className='txtEdicaoPerfil'>CPF:</label>
                    <input className='InputTextEdicaoPerfil' type='text' placeholder='CPF:' {...register("cpf")} />
                    <label className='txtEdicaoPerfil'>Email:</label>
                    <input className='InputTextEdicaoPerfil' type='date' placeholder='Data:' {...register("dtNascimento")} />
                    <label className='txtEdicaoPerfil'>Endereço:</label>
                    <input className='InputTextEdicaoPerfil' type='text' placeholder='Endereço:' {...register("endereco")} />
                    <label className='txtEdicaoPerfil'>Telefone de Contato:</label>
                    <input className='InputTextEdicaoPerfil' type='text' placeholder='Telefone:' {...register("telefone")} />
                    <label className='txtEdicaoPerfil'>Nome do Pet:</label>
                    <input className='InputTextEdicaoPerfil' type='text' placeholder='Nome Do Pet:' {...register("nomeDoPet")} />
                    <label className='txtEdicaoPerfil'>Espécie do Pet:</label>
                    <input className='InputTextEdicaoPerfil' type='text' placeholder='Espécie Do Pet:' {...register("especie")} />
                    <label className='txtEdicaoPerfil'>Tipo do Animal:</label>
                    <select className='InputTextEdicaoPerfil' {...register("tipoAnimal")}>
                        <option value="gato">Gato</option>
                        <option value="cachorro">Cachorro</option>
                    </select>
                    <label className='txtEdicaoPerfil'>Foto Pessoal:</label>
                    {imagePreview && (
                        <div  style={{ display:'flex', flexDirection:'column', width: '30vw', height: 'auto', alignItems:'center'}}>
                            <h3 className='txtEdicaoPerfil'>Prévia da Imagem:</h3>
                            <img
                                src={imagePreview}
                                alt="Prévia da imagem selecionada"
                                style={{ width: '30%', height: 'auto', marginTop: '10px' }}
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={handleClick}
                        className="botaoUploadImagemEdicaoPerfil"
                        type='button'
                    >Selecionar imagem</button>
                    <label className='txtEdicaoPerfil'>sexo:</label>
                    <select className='InputTextEdicaoPerfil' {...register("gender")}>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                    </select>
                    <label className='txtEdicaoPerfil'>Senha:</label>
                    <div className="DivCampoSenhaEdicaoPerfil">
                        <input className='InputTextSenhaEdicaoPerfil' type={mostrarSenha ? 'text' : 'password'} placeholder='senha:' {...register("password")}/>
                        <button type="button" onClick={() => setMostrarSenha((prev) => !prev)}>
                            {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                    <input className='submitEdicaoPerfil' value='Enviar' type="submit"/>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default withAuth(EdicaoPerfil);