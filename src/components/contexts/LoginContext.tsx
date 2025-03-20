import { useEffect, useState } from "react";
import { onAuthStateChanged, auth, database, ref, get } from "../firebase/Firebase";
import { useNavigate, useLocation } from "react-router-dom";

const withAuth = (Component: any) => {
  const AuthWrapper = (props: any) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setAuthenticated(true);
          console.log("chegou")
          // 🔥 Só faz a verificação da função do usuário SE estiver na tela de Login
          if (location.pathname === "/Login") {
            try {
              const userRef = ref(database, `users/${user.uid}/funcao`);
              const snapshot = await get(userRef);

              if (snapshot.exists()) {
                const funcao = snapshot.val();
                if (funcao === "prestador") {
                  navigate("/MenuPrestador");
                } else if (funcao === "administrador") {
                  navigate("/MenuAdministracao");
                } else {
                  navigate("/MenuCliente");
                }
              } else {
                console.log("Nenhum dado encontrado.");
              }
            } catch (error) {
              console.error("Erro ao buscar função do usuário:", error);
            }
          }
          setLoading(false);
        } else {
          setAuthenticated(false);
          setLoading(false);
          navigate("/Login");
        }
      });

      return () => unsubscribe();
    }, [navigate, location.pathname]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (authenticated === false) {
      if (location.pathname !== "/Login"){
        return null;
      }
    }

    return <Component {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
