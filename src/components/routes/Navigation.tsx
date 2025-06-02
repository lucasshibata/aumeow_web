import React from 'react';
import {Route, Routes, Navigate } from'react-router-dom';

import CreateUser from '../screens/CreateUser/CreateUser';
import CadastroDono from '../screens/CadastroDono/CadastroDono';
import CadastroPrestador from '../screens/CadastroPrestador/CadastroPrestador';
import Login from '../screens/Login/Login';
import RecoverPassword from '../screens/RecoverPassword/RecoverPassword';
import MenuCliente from '../screens/MenuCliente/MenuCliente';
import Shopping from '../screens/Shopping/Shopping';
import PetServices from '../screens/PetServices/PetServices';
import EspecificProduct from '../screens/EspecificProduct/EspecificProduct';
import TelaInicial from '../screens/TelaInicial/TelaInicial';
import MenuPrestador from '../screens/MenuPrestador/MenuPrestador';
import RegistroServicoPrestador from '../screens/RegistroServicoPrestador/RegistroServicoPrestador';
import ListaServicosPrestador from '../screens/ListaServicosPrestador/ListaServicosPrestador';
import CadastroProdutos from '../screens/CadastroProdutos/CadastroProdutos';
import ListaProdutosPrestador from '../screens/ListaProdutosPrestador/ListaProdutosPrestador';
import SobreNos from '../screens/SobreNos/SobreNos';
import ChatC2P from '../screens/ChatC2P/ChatC2P';
import MenuAdministracao from '../screens/MenuAdministracao/MenuAdministracao';
import ListaDeChats from '../screens/ListaDeChats/ListaDeChats';
import CanalDenuncia from '../screens/Denuncia/CanalDenuncia';
import CadastroContasAdministracao from '../screens/CadastroContasAdministracao/CadastroContasAdministracao';
import PerfilDeUsuario from '../screens/PerfilDeUsuario/PerfilDeUsuario';
import EdicaoPerfil from '../screens/EdicaoPerfil/EdicaoPerfil';
import CadastroDeAdocao from '../screens/CadastroDeAdocao/CadastroDeAdocao';
import PaginaDeAdocao from '../screens/PaginaDeAdocao/PaginaDeAdocao';

export default function Navigation(){
    return(
		<div className='Navigation'>
			<Routes>
				<Route path='/' element={<Navigate to="/TelaInicial" />} />
				<Route path='/TelaInicial' element={<TelaInicial/>}/>
				<Route path='/CreateUser' element={<CreateUser/>}/>
				<Route path='/CadastroDono' element={<CadastroDono/>}/>
				<Route path='/CadastroPrestador' element={<CadastroPrestador/>}/>
				<Route path='/Login' element={<Login/>}/>
				<Route path='/RecoverPassword' element={<RecoverPassword/>}/>
				<Route path='/MenuCliente' element={<MenuCliente/>}/>
				<Route path='/Shopping' element={<Shopping/>}/>
				<Route path='/PetServices' element={<PetServices/>}/>
				<Route path='/MenuPrestador' element={<MenuPrestador/>}/>
				<Route path='/ListaServicosPrestador' element={<ListaServicosPrestador/>}/>
				<Route path='/Shopping/:ProdId' element={<EspecificProduct/>}/>
				<Route path='/RegistroServicoPrestador' element={<RegistroServicoPrestador/>}/>
				<Route path='/CadastroProdutos' element={<CadastroProdutos/>}/>
				<Route path='/ListaProdutosPrestador' element={<ListaProdutosPrestador/>}/>
				<Route path='/SobreNos' element={<SobreNos/>}/>
				<Route path='/Chat/:PrestadorId/:ClienteId' element={<ChatC2P/>}/>
				<Route path='/MenuAdministracao' element={<MenuAdministracao/>}/>
				<Route path='/ListaDeChats' element={<ListaDeChats/>}/>
				<Route path='/Denuncia' element={<CanalDenuncia/>}/>
				<Route path='/CadastroContasAdministracao' element={<CadastroContasAdministracao/>}/>
				<Route path='/PerfilDeUsuario' element={<PerfilDeUsuario/>}/>
				<Route path='/EdicaoPerfil' element={<EdicaoPerfil/>}/>
				<Route path='/CadastroDeAdocao' element={<CadastroDeAdocao/>}/>
				<Route path='/PaginaDeAdocao' element={<PaginaDeAdocao/>}/>
			</Routes>
		</div>
    );
};
