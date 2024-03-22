import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserIdFromToken, getUsernameFromToken } from './LoginForm';

const Rent = () => {
  const [rentals, setRentals] = useState([]); // Stocke les informations complètes des locations, incluant les noms des films

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('Token'); 
      const userId = getUserIdFromToken();
      try {
        const response = await axios.get(`http://localhost:3500/location-film-api/rents/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const rentalsWithFilmNames = await Promise.all(response.data.map(async (rental) => {
          const filmResponse = await axios.get(`http://localhost:3500/location-film-api/films/${rental.filmId}`);
          return { ...rental, filmName: filmResponse.data.name }; // Assurez-vous que la clé pour le nom du film dans la réponse est correcte
        }));
        setRentals(rentalsWithFilmNames); // Met à jour l'état avec les données enrichies
      } catch (error) {
        console.error("Erreur lors de la requête : ", error);
      }
    };

    fetchData();
  }, []); 

  const username = getUsernameFromToken();

  return (
    <div>
      <div>
        <div className="create-account-link">
          <Link to="/home"><button>Retour</button></Link>
        </div>
      </div>
      
      <table>
        <caption> Historique de location de {username} </caption>
        <thead>
          <tr>
            <th>Nom du film</th>
            <th>Date de location</th>
            <th>Date de rendu</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental, index) => (
            <tr key={index}>
              <td>{rental.filmName}<div className="create-account-link"><Link to="/FilmDetailsUser"><button>Details</button></Link></div></td>
              <td>{rental.rentalDate}</td>
              <td>{rental.returnDate}<div className="create-account-link"><Link to="/FilmDetailsUser"><button>Supprimer</button></Link></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rent;
