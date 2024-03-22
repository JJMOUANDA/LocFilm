import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous d'importer axios

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        imageData: '', // Cette propriété stockera la photo en base64
    });

    const [loginStatus, setLoginStatus] = useState({
        message: '',
        success: null,
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo" && files.length) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData({ ...formData, imageData: reader.result });
            };

            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('Token'); 
        try {
            const response = await axios.post(`http://localhost:3500/api/register`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Compte créé avec succès.");
            setLoginStatus({ message: 'Inscription réussie.', success: true });
        } catch (error) {
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un code d'état
                // qui sort de la plage de 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
        
                switch(error.response.status) {
                  case 402:
                    setError("L'utilisateur ou l'email existe déjà");
                    break;
                  case 401:
                    setError("Le nom d'utilisateur, le mot de passe et l'email sont requis");
                    break;
                  case 500:
                    setError("Erreur lors de la création de l'utilisateur. Veuillez réessayer plus tard.");
                    break;
                  default:
                    setError("Une erreur inconnue s'est produite. Veuillez réessayer.");
                }
              } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                setError("Aucune réponse du serveur. Vérifiez votre connexion.");
              } else {
                // Quelque chose s'est produit lors de la mise en place de la requête
                // qui a déclenché une Erreur
                setError("Erreur lors de la requête. Veuillez réessayer.");
              }
            }
    };

    return (
        <div>
            <div className="create-account-link">
                <Link to="/login"><button>login</button></Link>
                <Link to="/"><button>Retour</button></Link>
            </div>
            
            <div className="form-container">
                <h1>Création de compte</h1>
                
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
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                    <div className="form-group photo-container">
                        <label htmlFor="photo">Photo de profil : </label>
                        <input type="file" id="photo" name="photo" className="custom-file-upload" onChange={handleChange}/>
                    </div>
                    <button type="submit">Créer un compte</button>
                    {loginStatus.message && (
                        <div style={{ color: loginStatus.success ? 'green' : 'red' }}>
                            {loginStatus.message}
                        </div>
                        
                    )

                    || error && <div style={{ color: 'red' }}> {error} </div>}
                </form>
            </div>
        </div> 
    );
};

export default SignUpForm;
