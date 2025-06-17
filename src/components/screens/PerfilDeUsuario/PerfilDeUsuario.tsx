import { useState, useEffect } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import {auth, ref, database, get} from "../../firebase/Firebase";
import "./PerfilDeUsuario.css";
import verifyFunction from "../../layout/verifyFunction";
import { useNavigate } from "react-router-dom";
import withAuth from "../../contexts/LoginContext";

interface UserCliente {
    id: string; // Chave única do serviço no Firebase
    cpf: string;
    dtNascimento: Date;
    email: string;
    endereco: string;
    especie: string;
    genero: string;
    nome: string;
    nomeDoPet: string;
    senha: string;
    telefone: string;
    tipoAnimal: string
}

interface UserPrestador {
    id: string; // Chave única do serviço no Firebase
    animalPreferencia: string;
    cpf: string;
    dtNascimento: Date;
    email: string;
    endereco: string;
    experiencia: string;
    genero: string;
    nome: string;
    raioAtendimento: number;
    senha: string;
    telefone: string
}

function PerfilDeUsuario(){
    const [UserCliente, setUserCliente] = useState<UserCliente[]>([]);
    const [UserPrestador, setUserPrestador] = useState<UserPrestador[]>([]);
    const [funcao, setFuncao] = useState<string|undefined>('');
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    
    const fetchUserCliente = async () => {
        try {
            const userUid = auth.currentUser?.uid;
    
            if (!userUid) {
                console.error("Usuário não autenticado.");
                setLoading(false);
                return;
            }

            const usersRef = ref(database, `users/${userUid}`);
    
            const snapshot = await get(usersRef);
    
            if (snapshot.exists()) {
                const userData = snapshot.val();
                setUserCliente([{ id: userUid, ...userData }]);
            } else {
            console.log("Nenhum Usuário encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar Perfil:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPrestador = async () => {
        try {
            const userUid = auth.currentUser?.uid;
    
            if (!userUid) {
                console.error("Usuário não autenticado.");
                setLoading(false);
                return;
            }

            const usersRef = ref(database, `users/${userUid}`);
    
            const snapshot = await get(usersRef);
    
            if (snapshot.exists()) {
                const userData = snapshot.val();
                setUserPrestador([{ id: userUid, ...userData }]);
            } else {
            console.log("Nenhum Usuário encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar Perfil:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setAuthChecked(true);
        });
    
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchFuncao = async () => {
            const result = await verifyFunction();
            setFuncao(result);
        };
    
        if (authChecked) {
            fetchFuncao();
        }
    }, [authChecked]);
    
    useEffect(() => {
        if (!funcao || !user) return;
    
        if (funcao === 'cliente') {
            fetchUserCliente();
        } else if (funcao === 'prestador') {
            fetchUserPrestador();
        } else {
            console.warn('Função inesperada:', funcao);
            setLoading(false);
        }
    }, [funcao, user]);
    
    if (loading) {
        return <p>Carregando...</p>;
    }

    if (funcao === 'cliente' && UserCliente.length === 0) {
        return <p>Nenhum serviço encontrado.</p>;
    }
    
    if (funcao === 'prestador' && UserPrestador.length === 0) {
        return <p>Nenhum serviço encontrado.</p>;
    }

    return(
        <div className="PerfilDeUsuario">
            <Header/>
            <div className="ContainerPerfilDeUsuario">
                <ul className='InnerContainerPerfilDeUsuario'>
                {funcao === "cliente" ? (
                    UserCliente.map((User: any) => (
                        <li className='ItemListaPerfilDeUsuario' key={User.id}>
                            <div className="DivImgPerfilDeUsuario">
                                <h1>imagem perfil:</h1>
                                <img className='imgPerfilDeUsuario' src={`https://aumeow-images.s3.sa-east-1.amazonaws.com/imagensPerfil/${User.id}/imagemDono?timestamp=${Date.now()}`} alt="imagem do produto" />
                            </div>
                            <div className="InformacoesPerfilDeUsuario">
                                <p className='TextoPPerfilDeUsuario'>Nome: {User.nome}</p>
                                <p className='TextoPPerfilDeUsuario'>Email: {User.email}</p>
                                <p className='TextoPPerfilDeUsuario'>Endereço: {User.endereco}</p>
                                <p className='TextoPPerfilDeUsuario'>cpf: {User.cpf}</p>
                                <p className='TextoPPerfilDeUsuario'>Data de Nascimento: {User.dtNascimento}</p>
                                <p className='TextoPPerfilDeUsuario'>Telefone: {User.telefone}</p>
                                <p className='TextoPPerfilDeUsuario'>Gênero: {User.genero}</p>
                                <p className='TextoPPerfilDeUsuario'>Nome Do Pet: {User.nomeDoPet}</p>
                                <p className='TextoPPerfilDeUsuario'>Especie do Animal: {User.especie}</p>
                                <p className='TextoPPerfilDeUsuario'>Tipo do Animal: {User.tipoAnimal}</p>
                                <p className='TextoPPerfilDeUsuario'>Sua Senha Atual: {User.senha}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    UserPrestador.map((User: any) => (
                        <li className='ItemListaPerfilDeUsuario' key={User.id}>
                            <div className="DivImgPerfilDeUsuario">
                                <h1>imagem perfil:</h1>
                                <img className='imgPerfilDeUsuario' src={`https://aumeow-images.s3.sa-east-1.amazonaws.com/imagensPerfil/${User.id}/imagemDono?timestamp=${Date.now()}`} alt="imagem do produto" />
                            </div>
                            <div className="InformacoesPerfilDeUsuario">
                                <p className='TextoPPerfilDeUsuario'>Nome: {User.nome}</p>
                                <p className='TextoPPerfilDeUsuario'>Email: {User.email}</p>
                                <p className='TextoPPerfilDeUsuario'>Endereço: {User.endereco}</p>
                                <p className='TextoPPerfilDeUsuario'>cpf: {User.cpf}</p>
                                <p className='TextoPPerfilDeUsuario'>Data de Nascimento: {User.dtNascimento}</p>
                                <p className='TextoPPerfilDeUsuario'>Telefone: {User.telefone}</p>
                                <p className='TextoPPerfilDeUsuario'>Gênero: {User.genero}</p>
                                <p className='TextoPPerfilDeUsuario'>Animal de Preferência: {User.animalPreferencia}</p>
                                <p className='TextoPPerfilDeUsuario'>Experiência: {User.experiencia}</p>
                                <p className='TextoPPerfilDeUsuario'>Raio de Atendimento: {User.raioAtendimento} Km</p>
                                <p className='TextoPPerfilDeUsuario'>Sua Senha Atual: {User.senha}</p>
                            </div>
                        </li>
                    ))
                )}
                </ul>
                <button className="BtnEditInfoPerfilDeUsuario" onClick={()=>navigate('/EdicaoPerfil')}>Editar informações</button>
            </div>
            <Footer/>
        </div>
    )
}

export default withAuth(PerfilDeUsuario);