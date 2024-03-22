import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserIdFromToken, getUsernameFromToken } from './LoginForm';



const UserInf = () => {
    const [userDetails, setUserDetails] = useState({ email: '', username: '' }); // Ajoutez plus de champs si nécessaire
  
    useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem('Token');
        const userId = getUserIdFromToken();
        try {
          const response = await axios.get(`http://localhost:3500/location-film-api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUserDetails(response.data); // Suppose que response.data contient un objet avec email et potentiellement d'autres détails
        } catch (error) {
          console.error("Erreur lors de la requête : ", error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleChange = (e) => {
      setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        const token = localStorage.getItem('Token');
        const userId = getUserIdFromToken();
        try {
          await axios.put(`http://localhost:3500/location-film-api/users/${userId}`, userDetails, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log("Informations de l'utilisateur mises à jour avec succès.");
          // Gérez ici la réussite de la mise à jour (par exemple, afficher un message de succès ou rediriger l'utilisateur)
        } catch (error) {
          console.error("Erreur lors de la mise à jour des informations de l'utilisateur : ", error);
          // Gérez ici l'échec de la mise à jour (par exemple, afficher un message d'erreur)
        }
      };

   // Supposons que ces variables contiennent les informations actuelles de l'utilisateurur
const currentUsername = getUsernameFromToken();; // L'username actuel de l'utilisateur


  return (
    <div>
      <div>
        <div className="create-account-link">
          <Link to="/home"><button>Retour</button></Link>
        </div>
      </div>
      
      <div class="form-containers">
            <h2>Modifier vos informations</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-groups">
                <label for="username">Nom d'utilisateur</label>
                <input type="text" id="username" name="username" value={currentUsername}/>
                </div>
                <div class="form-groups">
                <label for="password">Nouveau mot de passe (laisser vide si inchangé)</label>
                <input type="password" id="password" name="password"/>
                </div>
                <div class="form-groups">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" value={userDetails.email} onChange={handleChange}/>
                </div>
                <div class="form-groups photo-container">
                <label>Photo de profil (optionnel)</label>
                <input type="file" id="photo" name="photo" class="custom-file-upload"/>
                </div>
                <div class="form-groups">
                <input type="submit" value="Mettre à jour"/>
                </div>
            </form>
        </div>
        


    </div>
    );

};







export default UserInf;
