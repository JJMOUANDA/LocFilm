import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
//import backgroundImage from '../media/background.jpg'
import axios from 'axios';

const FilmHome = () => {
    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/location-film-api/films')
            .then(response => {
                setFilms(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleFilmClick = (film) => {
        setSelectedFilm(film); // Mettre à jour l'état avec le film sélectionné
    };

    return (
        <div>
            <div className="film-gallery">
                {films.map(film => (
                    <div key={film.id} className="film-card" onClick={() => handleFilmClick(film)}>
                        <img src={film.imageUrl} alt={film.name} className="film-image"/>
                        <div className="film-details">
                            <Link to={`/films/${film.id}`}>
                                <h2>{film.name}</h2>
                            </Link>
                            <p>Prix: {film.price} €</p>
                            <a href={film.youtubeLink} target="_blank" rel="noopener noreferrer">Voir la
                                bande-annonce</a>
                        </div>
                    </div>
                ))}
            </div>
            {selectedFilm && (
                <div className="selected-film-details">
                    <h2>{selectedFilm.name}</h2>
                    <p>Date de sortie: {selectedFilm.releaseDate}</p>
                    <p>Description: {selectedFilm.description}</p>
                    <p>Prix: {selectedFilm.price} €</p>
                    <a href={selectedFilm.youtubeLink} target="_blank" rel="noopener noreferrer">Voir la
                        bande-annonce</a>
                </div>
            )}
        </div>
    );
};

export default FilmHome;
