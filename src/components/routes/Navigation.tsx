import React from 'react';
import {Route, Routes} from'react-router-dom'

import CreateUser from '../screens/CreateUser.tsx';
import CadastroDono from '../screens/CadastroDono.tsx';
import CadastroPrestador from '../screens/CadastroPrestador.tsx';
import Login from '../screens/Login.tsx';
import RecoverPassword from '../screens/RecoverPassword.tsx';
import OAuth2Screen from '../screens/OAuth2Screen.tsx';
import NavigationScreen from '../screens/NavigationScreen.tsx';
import Shopping from '../screens/Shopping.tsx';
import PetServices from '../screens/PetServices.tsx';
import AuthProvider from '../contexts/AuthContext.tsx';
import EspecificProduct from '../screens/EspecificProduct.tsx';

export default function Navigation(){
    return(
        <Routes>
            <Route path='/CreateUser' element={<CreateUser/>}/>
            {/* <Route path='/CadastroDono' element={<CadastroDono/>}/>
            <Route path='/CadastroPrestador' element={<CadastroPrestador/>}/> */}
            <Route path='/' element={<Login/>}/>
            {/* <Route path='/RecoverPassword' element={<RecoverPassword/>}/>
            <Route path='/OAuth2Screen' element={<OAuth2Screen/>}/>
            <Route path='/NavigationScreen' element={<NavigationScreen/>}/>
            <Route path='/Shopping' element={<Shopping/>}/>
            <Route path='/PetServices' element={<PetServices/>}/>
            <Route path='/AuthProvider' element={<AuthProvider/>}/>
            <Route path='/EspecificProduct' element={<EspecificProduct/>}/> */}
        </Routes>
    );
};


{/* <NavigationContainer>
	<AuthProvider>
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen options={{headerShown:false}}
				name="Login"
				component={Login}
			/>
			<Stack.Screen options={{headerTransparent:true, title:''}}
				name="CreateUser"
				component={CreateUser}
			/>
			<Stack.Screen options={{headerTransparent:true, title:''}}
				name="CadastroDono"
				component={CadastroDono}
			/>
			<Stack.Screen options={{headerTransparent:true, title:''}}
				name="CadastroPrestador"
				component={CadastroPrestador}
			/>
			<Stack.Screen options={{headerTransparent:true, title:''}}
				name="RecoverPassword"
				component={RecoverPassword}
			/>
			<Stack.Screen options={{headerTransparent:true, title:''}}
				name="OAuth2Screen"
				component={OAuth2Screen}
			/>
			<Stack.Screen options={{headerTransparent:true, title:''}}
				name="NavigationScreen"
				component={NavigationScreen}
			/>
			<Stack.Screen options={{headerTransparent:true, title:''}}
				name="Shopping"
				component={Shopping}
			/>
			<Stack.Screen options={{headerTransparent:true, title:''}}
				name="PetServices"
				component={PetServices}
			/>
			<Stack.Screen options={{headerTransparent:true, title:''}}
				name="EspecificProduct"
				component={EspecificProduct}
			/>
		</Stack.Navigator>
	</AuthProvider>
</NavigationContainer> */}