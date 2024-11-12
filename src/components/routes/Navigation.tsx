import React from 'react';
import {Route, Routes} from'react-router-dom';

import CreateUser from '../screens/CreateUser';
import CadastroDono from '../screens/CadastroDono';
import CadastroPrestador from '../screens/CadastroPrestador';
import Login from '../screens/Login';
import RecoverPassword from '../screens/RecoverPassword';
import OAuth2Screen from '../screens/OAuth2Screen';
import NavigationScreen from '../screens/NavigationScreen';
import Shopping from '../screens/Shopping';
import PetServices from '../screens/PetServices';
// import AuthProvider from '../contexts/AuthContext';
import EspecificProduct from '../screens/EspecificProduct';
import TelaInicial from '../screens/TelaInicial';

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
				{/* <Route path='/CadastroDono' element={<CadastroDono/>}/> */}
				<Route path='/CadastroPrestador' element={<CadastroPrestador/>}/>
				<Route path='/Login' element={<Login/>}/>
				<Route path='/RecoverPassword' element={<RecoverPassword/>}/>
				{/* <Route path='/OAuth2Screen' element={<OAuth2Screen/>}/> */}
				<Route path='/NavigationScreen' element={<NavigationScreen/>}/>
				<Route path='/Shopping' element={<Shopping/>}/>
				<Route path='/PetServices' element={<PetServices/>}/>
				{/* <Route path='/AuthProvider' element={<AuthProvider/>}/> */}
				<Route path='/EspecificProduct' element={<EspecificProduct/>}/>
			</Routes>
		</div>
    );
};
