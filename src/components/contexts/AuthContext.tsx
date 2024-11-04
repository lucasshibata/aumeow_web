// import React, {createContext, useState, useEffect} from 'react';
// import Auth from '@react-native-firebase/auth';
// import Database from '@react-native-firebase/database';

// export const AuthContext = createContext({});

// const fetchUserData = async () => {
//     const user = Auth().currentUser;

//     if (user) {
//       const userId = user.uid;
//       console.log(userId);

//       try {

//         const snapshot = await Database().ref(`/users/${userId}`).once('value');

//         if (snapshot.exists()) {
//             const userData = snapshot.val();
//             const chave = Object.keys(userData)[0];
//             return `${userData[chave].userName}`;

//         } else {
//             console.log('Nenhum dado encontrado para o usuário.');
//         }
//       } catch (error) {
//             console.error('Erro ao buscar dados do usuário:', error);
//       }
//     } else {
//         console.log('Nenhum usuário está autenticado.');
//     }
// };


// export default function AuthProvider(props:any){
//     const {children} = props;
//     const [nomeUsuario, setNomeUsuario] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             const result:string = await fetchUserData() ?? '';
//             setNomeUsuario(result);
//         };
//         fetchData();
//     }, []);
//     return(
//         <AuthContext.Provider value={{nomeUsuario:nomeUsuario}}>
//             {children}
//         </AuthContext.Provider>
//     );
// }
