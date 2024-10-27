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
