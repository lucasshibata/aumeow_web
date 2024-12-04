import { useEffect, useState } from "react"; 
import {onAuthStateChanged, auth} from "../firebase/Firebase"; 
import { Navigate } from "react-router-dom";

const withAuth = (Component:any) => { 
    return (props:any) => { 
        const [authenticated, setAuthenticated] = useState< boolean | null>(null); 
        useEffect(() => { 
            const unsubscribe = onAuthStateChanged(auth, (user) => { 
                if (user) { 
                    setAuthenticated(true);
                } else { 
                    setAuthenticated(false); 
                } 
            }); 
            return () => unsubscribe(); 
        }, []);

        if (authenticated === null) { 
            return <div>Loading...</div>;
        } 
        return authenticated ? <Component {...props} /> : <Navigate to="/Login" />; 
    }; 
};
export default withAuth;