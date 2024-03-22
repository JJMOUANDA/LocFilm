import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from "./AdminHeader";
import axios from "axios";
import filmList from "./FilmList";
import FilmEdit from "./FilmEdit";

const FilmManagement = ({ setFilms }) => {
    const [films, setFilmsState] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentFilm, setCurrentFilm] = useState({
        id: null,
        name: '',
        releaseDate: '',
        description: '',
        youtubeLink: '',
        price: 0,
        state: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8080/location-film-api/films')
            .then(response => {
                setFilmsState(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const editFilm = (film) => {
        setEditing(true);
        setCurrentFilm({
            id: film.id,
            name: film.name,
            releaseDate: film.releaseDate,
            description: film.description,
            youtubeLink: film.youtubeLink,
            price: film.price,
            state: film.state
        });
    };

    const deleteFilm = (id) => {
        axios.delete(`http://localhost:8080/location-film-api/films/${id}`)
            .then(response => {
                setFilmsState(films.filter(film => film.id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateFilm = (id, updatedFilm) => {
        axios.put(`http://localhost:8080/location-film-api/films/${id}`, updatedFilm)
            .then(response => {
                setEditing(false);
                setFilmsState(films.map(film => (film.id === id ? updatedFilm : film)));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const addFilm = (newFilm) => {
        axios.post('http://localhost:8080/location-film-api/films', newFilm)
            .then(response => {
                setFilmsState([...films, newFilm]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <AdminHeader/>
            <div className="film-gallery">
                {films.map((film) => (
                    <div key={film.id} className="film-card">
                        <img src={film.imageUrl} alt={film.name} className="film-image"/>
                        <div className="film-details">
                            <Link to={`/filmsAdmin/${film.id}`}>
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

            <Link to="/films/add">
                <button className="home-cta">Ajouter un film</button>
            </Link>

            {editing && (
                <FilmEdit
                    film={currentFilm}
                    updateFilm={updateFilm}
                    setEditing={setEditing}
                />
            )}
        </div>
    );
};

export default FilmManagement;
