import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


function getUserIdFromToken() {
    const token = localStorage.getItem('Token');
    if (!token) return null; // Assurez-vous qu'un token existe
  
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      const userId = payload.userId || payload.sub; // Remplacez 'userId' par la clé appropriée si différente
      return userId;
    } catch (error) {
      console.error("Erreur lors de l'extraction de l'ID de l'utilisateur :", error);
      return null;
    }
  }

  function getUsernameFromToken() {
    const token = localStorage.getItem('Token');
    if (!token) return null; // Retourne null si aucun token n'est trouvé
  
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      const username = payload.username; // Assurez-vous que votre payload de token contient 'username'
      return username;
    } catch (error) {
      console.error("Erreur lors de l'extraction du nom d'utilisateur :", error);
      return null;
    }
  }

  function getRoleFromToken() {
    const token = localStorage.getItem('Token');
    if (!token) return null; // Retourne null si aucun token n'est trouvé
  
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      const role = payload.role; // Assurez-vous que votre payload de token contient 'role'
      return role;
    } catch (error) {
      console.error("Erreur lors de l'extraction du rôle :", error);
      return null;
    }
  }
  

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();




    const [loginStatus, setLoginStatus] = useState({
        message: '',
        success: null,
    });

    const API_URL_log = 'http://localhost:3500/api';
    const API_URL = 'http://localhost:3500/location-film-api';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${API_URL_log}/login`, { username: formData.username, password: formData.password });
        const userId = getUserIdFromToken();
        if (response.data.token) {
            localStorage.setItem('Token', response.data.token);
            setLoginStatus({ message: 'Connexion réussie.', success: true });
            if (getRoleFromToken() === 'A') {
                navigate('/films');
            } else {
                navigate('/home');
            }
            console.log("Connexion réussie, token et infos utilisateur stockés.");
        } else {
            setLoginStatus({ message: 'Connexion échouée. Aucun token reçu.', success: false });
        }
    } catch (error) {
        console.error('Erreur de connexion', error);
        setLoginStatus({ message: 'Erreur de connexion.', success: false });
    }
};

    return (
        <div>
            <div className="create-account-link">
            <Link to="/"><button>Retour</button></Link>
            </div>
            <div className="form-container">
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Se connecter</button>
                
                    {loginStatus.message && (
                        <div style={{ color: loginStatus.success ? 'green' : 'red' }}>
                            {loginStatus.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
export {getUserIdFromToken, getUsernameFromToken, getRoleFromToken};
