import {auth, ref, database, get} from "../firebase/Firebase";
import { useState, useEffect } from "react";
import withAuth from '../contexts/AuthContext';

interface Service {
    id: string; // Chave única do serviço no Firebase
    endereco: string;
    preco: number;
    tipoAnimal: string;
    qtdService: number;
    userUid: string;
    nomePrestador: string;
}

function ListaServicosPrestador(){
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
          try {
            const userUid = auth.currentUser?.uid;
    
            if (!userUid) {
              console.error("Usuário não autenticado.");
              setLoading(false);
              return;
            }

            const servicesRef = ref(database, "services");
    
            const snapshot = await get(servicesRef);
    
            if (snapshot.exists()) {
              const allServices = snapshot.val();
    
              // Filtrar os serviços do usuário atual
              const userServices = Object.keys(allServices)
                .filter((key) => allServices[key].userUid === userUid)
                .map((key) => ({
                  id: key, // Inclui a chave como `id`
                  ...allServices[key],
                }));
    
              setServices(userServices); // Salva no estado
            } else {
              console.log("Nenhum serviço encontrado.");
            }
          } catch (error) {
            console.error("Erro ao buscar serviços:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchServices();
      }, []);

      if (loading) {
        return <p>Carregando...</p>;
      }
    
      if (services.length === 0) {
        return <p>Nenhum serviço encontrado.</p>;
      }
    
    return(
        <div className="ListaServicosPrestador">
            <ul>
            {services.map((service:any) => (
            <li key={service.id}>
                <h2>{service.nomePrestador}</h2>
                <p>Endereço: {service.endereco}</p>
                <p>Preço: {service.preco}</p>
                <p>Animal: {service.tipoAnimal}</p>
                <p>Quantidade de Serviços: {service.qtdService}</p>
            </li>
            ))}
            </ul>
        </div>
    )
}
export default withAuth(ListaServicosPrestador);