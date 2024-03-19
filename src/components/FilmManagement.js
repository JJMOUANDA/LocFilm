import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from "./AdminHeader";

const FilmManagement = ({ films, setFilms }) => {
    const [filmList, setFilmList] = useState(films);

    // Fonction pour supprimer un film
    const deleteFilm = (id) => {
        setFilmList(filmList.filter(film => film.id !== id));
        setFilms(films.filter(film => film.id !== id));
    };

    return (
        <div>
            <AdminHeader />
            <div className="film-gallery">
                {filmList.map((film) => (
                    <div key={film.id} className="film-card">
                        <img src={film.imageUrl} alt={film.name} className="film-image" />
                        <div className="film-details">
                            <Link to={`/films/${film.id}`}>
                                <h2>{film.name}</h2>
                            </Link>
                            <p>Prix: {film.price} €</p>
                            <Link to={`/films/${film.id}/edit`}>
                                <button>Modifier</button>
                            </Link>
                            <button onClick={() => deleteFilm(film.id)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilmManagement;
