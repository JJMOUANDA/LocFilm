import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Logout = () => {
    const navigate = useNavigate(); // Utiliser useNavigate directement dans le corps du composant
  
    useEffect(() => {
      localStorage.removeItem('userToken'); // Supprimer le token lors du montage du composant
      navigate('/login'); // Rediriger l'utilisateur vers la page de connexion
    }, [navigate]); // Ajouter navigate comme dépendance pour s'assurer qu'il est prêt à l'emploi
  
    return null; // Le composant n'a pas besoin de rendre quelque chose
  };
  
  export default Logout;