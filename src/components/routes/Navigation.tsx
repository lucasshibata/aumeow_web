import React from 'react';
import {Route, Routes} from'react-router-dom';

import CreateUser from '../screens/CreateUser';
import CadastroDono from '../screens/CadastroDono';
import CadastroPrestador from '../screens/CadastroPrestador';
import Login from '../screens/Login';
import RecoverPassword from '../screens/RecoverPassword';
import NavigationScreen from '../screens/NavigationScreen';
import Shopping from '../screens/Shopping';
import PetServices from '../screens/PetServices';
import EspecificProduct from '../screens/EspecificProduct';
import TelaInicial from '../screens/TelaInicial';
import MenuPrestador from '../screens/MenuPrestador';
import RegistroServicoPrestador from '../screens/RegistroServicoPrestador';
import ListaServicosPrestador from '../screens/ListaServicosPrestador';
import CadastroProdutos from '../screens/CadastroProdutos';
import ListaProdutosPrestador from '../screens/ListaProdutosPrestador';
import SobreNos from '../screens/SobreNos';

export default function Navigation(props:any){
	const styles:React.CSSProperties = {
		width: '100%',
		height: '100%'
	}
    return(
		<div className='Navigation' style={styles}>
			<Routes>
				<Route path='/' element={<TelaInicial/>}/>
				<Route path='/CreateUser' element={<CreateUser/>}/>
				<Route path='/CadastroDono' element={<CadastroDono/>}/>
				<Route path='/CadastroPrestador' element={<CadastroPrestador/>}/>
				<Route path='/Login' element={<Login/>}/>
				<Route path='/RecoverPassword' element={<RecoverPassword/>}/>
				<Route path='/NavigationScreen' element={<NavigationScreen/>}/>
				<Route path='/Shopping' element={<Shopping/>}/>
				<Route path='/PetServices' element={<PetServices/>}/>
				<Route path='/MenuPrestador' element={<MenuPrestador/>}/>
				<Route path='/ListaServicosPrestador' element={<ListaServicosPrestador/>}/>
				<Route path='/Shopping/:ProdId' element={<EspecificProduct/>}/>
				<Route path='/RegistroServicoPrestador' element={<RegistroServicoPrestador/>}/>
				<Route path='/CadastroProdutos' element={<CadastroProdutos/>}/>
				<Route path='/ListaProdutosPrestador' element={<ListaProdutosPrestador/>}/>
				<Route path='/SobreNos' element={<SobreNos/>}/>
			</Routes>
		</div>
    );
};
