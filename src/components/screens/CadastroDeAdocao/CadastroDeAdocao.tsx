import { useState, useRef } from "react";
import { ref, database, auth, get, set, push} from "../../firebase/Firebase";
import s3 from "../../aws/aws-config";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import "./CadastroDeAdocao.css";
import verifyFunction from "../../layout/verifyFunction";

interface AdocaoData {
    Nome: string;
    Especie: string;
    Raca: string;
    Sexo:string;
    Idade:number;
    Porte:string;
    EstadoDeSaude: string;
    Temperamento: string;
    HistoriaDoAnimal: string;
    NomeResponsavel: string;
    EmailResponsavel: string;
    UIDCadastrante: string;
    EmailCadastrante: string; 
}
const saudeOptions = [
  { value: "Vacinação em dia", label: "Vacinação em dia" },
  { value: "Vacinação incompleta", label: "Vacinação incompleta" },
  { value: "Castrado", label: "Castrado" },
  { value: "Não Castrado", label: "Não Castrado" },
  { value: "Vermifugado", label: "Vermifugado" },
  { value: "Não Vermifugado", label: "Não Vermifugado" },
  { value: "FIV positivo", label: "FIV positivo" },
  { value: "FELV positivo", label: "FELV positivo" },
  { value: "Possui comorbidades", label: "Possui comorbidades" }
];
const temperamentoOptions = [
  { value: "Dócil", label: "Dócil" },
  { value: "Ativo", label: "Ativo" },
  { value: "Energético", label: "Energético" },
  { value: "Calmo", label: "Calmo" },
  { value: "Tranquilo", label: "Tranquilo" },
  { value: "Brincalhão", label: "Brincalhão" },
  { value: "Independente", label: "Independente" },
  { value: "Sociável", label: "Sociável" },
  { value: "dominante", label: "Dominante" },
  { value: "Tímido", label: "Tímido" },
  { value: "Medroso", label: "Medroso" },
  { value: "preguicoso", label: "Preguiçoso" },
  { value: "Bravo", label: "Bravo" },
  { value: "Reativo", label: "Reativo" },
  { value: "Protetor", label: "Protetor" },
  { value: "Territorial", label: "Territorial" },
  { value: "Inteligente", label: "Inteligente" },
  { value: "Carente", label: "Carente" },
  { value: "Grudento", label: "Grudento" }
];

export default function CadastroDeAdocao(){
    const { register, handleSubmit, control } = useForm();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);;
    
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

    const onSubmit = async (data: any) => {
        if (!file) {
        alert('Por favor, selecione uma imagem.');
        return;
        }

        setUploading(true);

        const user = auth.currentUser;
        const adocaoRef = push(ref(database, 'adocao'));
        const dbUserNameRef = ref(database, 'users/' + user?.uid + '/nome');
        const dbUserEmailRef = ref(database, 'users/' + user?.uid + '/email');
        const estadoSaude = data.estadoSaude?.map((opt:any) => opt.value) || [];
        const temperamentoDoAnimal = data.temperamentoDoAnimal?.map((opt:any) => opt.value) || [];

        let AdocaoData: AdocaoData = {
            Nome: data.nome,
            Especie: data.especie,
            Raca: data.raca,
            Sexo:data.sexo,
            Idade:data.idade,
            Porte:data.porte,
            EstadoDeSaude: estadoSaude,
            Temperamento: temperamentoDoAnimal,
            HistoriaDoAnimal: data.historiaDoAnimal,
            NomeResponsavel: data.nomeResponsavel,
            EmailResponsavel: data.emailResponsavel,
            UIDCadastrante: user?.uid || '',
            EmailCadastrante: data.email || ''
        };

        try {
        // Obtém o nome do usuário
        const userNameSnapshot = await get(dbUserNameRef);
        if (userNameSnapshot.exists()) {
            AdocaoData.NomeResponsavel = userNameSnapshot.val();
        }

        // Obtém o email do usuário
        const userEmailSnapshot = await get(dbUserEmailRef);
        if (userEmailSnapshot.exists()) {
            AdocaoData.EmailResponsavel = userEmailSnapshot.val(); // Agora é seguro adicionar
        }

        // Verifica se o produto já existe
        const productSnapshot = await get(adocaoRef);
        if (productSnapshot.exists()) {
            alert(`O código "${data.code}" já existe. Escolha outro.`);
            return;
        }

        // Salva os dados do produto no Firebase
        await set(adocaoRef, AdocaoData);

        //Faz o upload da imagem para o S3
        const fileName = `adocoes/${adocaoRef.key}/imagemAdocao`;
        await s3.uploadFile(file, fileName);

        alert('Produto criado com sucesso e salvo no banco!');
        console.log('Arquivo enviado com sucesso');

        const funcao = await verifyFunction();
        if (funcao === 'prestador'){
            navigate('/MenuPrestador');
        } else if(funcao === 'cliente'){
            navigate('/MenuCliente');
        } else{
            navigate('/MenuAdministracao');
        }
        
        } catch (error) {
        console.error('Erro ao adicionar o produto:', error);
        alert('Erro ao adicionar o produto. Tente novamente.');
        } finally {
        setUploading(false);
        }
    };

    return(
        <div className="ContainerCadastroDeAdocao">
            <Header/>
            <div className='InnercontainerCadastroDeAdocao'>
                <h1 className='TitleCadastroDeAdocao'>Cadastro de Adoção</h1>
                <form className='FormContainerCadastroDeAdocao' onSubmit={handleSubmit(onSubmit)}>
                    {imagePreview && (
                        <div  style={{ display:'flex', flexDirection:'column', width: '100%', height: 'auto', alignItems:'center'}}>
                            <h3 className='txtCadastroDeAdocao'>Prévia da Imagem:</h3>
                            <img
                                src={imagePreview}
                                alt="Prévia da imagem selecionada"
                                style={{ width: '40%', height: '100%', marginTop: '10px' }}
                            />
                        </div>
                    )}
                    <label className='txtCadastroDeAdocao'>Selecione uma imagem:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="botaoUploadImagemCadastroDeAdocao"
                    >Selecionar imagem</button>
                    <label className='txtCadastroDeAdocao'>Nome do Animal:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Nome:'
                        {...register("nome", { required: true })}
                    />
                    <label className='txtCadastroDeAdocao'>Especie do Animal:</label>
                    <select required defaultValue="" className='InputTextCadastroDeAdocao' {...register("especie", { required: true })}>
                        <option value="" disabled hidden>Selecione uma opção:</option>
                        <option value="Gato">Gato</option>
                        <option value="Cachorro">Cachorro</option>
                    </select>
                    <label className='txtCadastroDeAdocao'>Raça do Animal:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Raça:'
                        {...register("raca", { required: true })}
                    />
                    <label className='txtCadastroDeAdocao'>Sexo:</label>
                    <select required defaultValue="" className='InputTextCadastroDeAdocao' {...register("sexo", { required: true })}>
                        <option value="" disabled hidden>Selecione uma opção:</option>
                        <option value="Macho">Macho</option>
                        <option value="Fêmea">Fêmea</option>
                    </select>
                    <label className='txtCadastroDeAdocao'>Idade(anos):</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Idade:'
                        {...register("idade", { required: true })}
                    />
                    <label className='txtCadastroDeAdocao'>Porte:</label>
                    <select required defaultValue="" className='InputTextCadastroDeAdocao' {...register("porte", { required: true })}>
                        <option value="" disabled hidden>Selecione uma opção:</option>
                        <option value="Pequeno">Pequeno</option>
                        <option value="Médio">Médio</option>
                        <option value="Grande">Grande</option>
                    </select>
                    <label className='txtCadastroDeAdocao'>Estado de saúde:</label>
                    <Controller
                        name="estadoSaude"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                        <Select
                            {...field}
                            options={saudeOptions}
                            isMulti
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: 'var(--marrom-btn)',
                                    neutral0: 'var(--cinza-claro)',
                                     
                                },
                            })}
                            placeholder="Selecione..."
                            className="InputTextCadastroDeAdocao"
                            classNamePrefix="select"
                        />
                        )}
                    />
                    <label className='txtCadastroDeAdocao'>Temperamento:</label>
                    <Controller
                        name="temperamentoDoAnimal"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                        <Select
                            {...field}
                            options={temperamentoOptions}
                            isMulti
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: 'var(--marrom-btn)',
                                    neutral0: 'var(--cinza-claro)',
                                },
                            })}
                            placeholder="Selecione..."
                            className="InputTextCadastroDeAdocao"
                            classNamePrefix="select"
                        />
                        )}
                    />
                    <label className='txtCadastroDeAdocao'>Historia do Animal:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Historia:'
                        {...register("historiaDoAnimal", { required: true })}
                    />
                    <label className='txtCadastroDeAdocao'>Nome do Responsável:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Responsável:'
                        {...register("nomeResponsavel", { required: true })}
                    />
                    <label className='txtCadastroDeAdocao'>Email do Responsável:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Email do Responsável:'
                        {...register("emailResponsavel", { required: true })}
                    />
                    <input
                        className='SubmitCadastroDeAdocao'
                        value={uploading ? 'Enviando...' : 'Enviar'}
                        type="submit"
                        disabled={uploading}
                    />
                </form>
            </div>
            <Footer/>
        </div>
    )
}