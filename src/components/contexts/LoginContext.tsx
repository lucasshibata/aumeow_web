import { useEffect, useState } from "react";
import { onAuthStateChanged, auth, database, ref, get } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";

const withAuth = (Component: any) => {
  const AuthWrapper = (props: any) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setAuthenticated(true);

          const userRef = ref(database, `users/${user.uid}/funcao`);
          try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
              const funcao = snapshot.val();
              if (funcao === "prestador") {
                navigate("/MenuPrestador");
              } else if (funcao === "administrador"){
                navigate("/MenuAdministracao");
              }else{
                navigate("/MenuCliente");
              }
            } else {
              console.log("Nenhum dado encontrado");
            }
          } catch (error) {
            console.error("Erro ao buscar dados:", error);
          }
        } else {
          setAuthenticated(false);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [navigate]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (authenticated === false) {
      return <Component {...props} />;
    }

    return <Component {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
