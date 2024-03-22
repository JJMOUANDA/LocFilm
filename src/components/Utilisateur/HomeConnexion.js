import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../media/background2.jpg'
import AdminHeader from "../Admin/AdminHeader";
import FilmList from "./FilmList";
import { getUserIdFromToken, getUsernameFromToken } from '../LoginForm';
import axios from "axios";

const HomeConnexion = () => {
    const filmListRef = useRef(null);
    const scrollToFilmList = () => {
        filmListRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const username = getUsernameFromToken();
    const userId = getUserIdFromToken();

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
            <div className="home-container" style={{backgroundImage: `url(${backgroundImage})`}}>
                <div className="overlay"></div>
                <div className="home-content">
                    <h2 className="home-slogan">Bienvenue {username} </h2>
                    <p className="home-subtitle">Nous sommes content de te revoir et te souhaitons bonne CineLoc !</p>
                    <button className="home-cta" onClick={scrollToFilmList}>Les films actuellement disponibles ⬇ <i
                        className="fas fa-angle-down"></i></button>
                </div>
                <div>
                    <div className="overlay"></div>
                    <div className="create-account-link">
                        <div className="app-logo">CineLoc</div>
                        <Link to={`/user/${userId}`}>
                            <button>Mon compte</button>
                        </Link>
                        <Link to="/signup">
                            <button>Panier</button>
                        </Link>
                        <Link to="/rent">
                            <button>Mes locations</button>
                        </Link>
                        <Link to="/logout">
                            <button>logout</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div ref={filmListRef}>
                <div>
                    <div className="film-gallery">
                        {films.map(film => (
                            <div key={film.id} className="film-card" onClick={() => handleFilmClick(film)}>
                                <img src={film.imageUrl} alt={film.name} className="film-image"/>
                                <div className="film-details">
                                    <Link to={`/filmsConnect/${film.id}`}>
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
            </div>
        </div>
    );
};

export default HomeConnexion;