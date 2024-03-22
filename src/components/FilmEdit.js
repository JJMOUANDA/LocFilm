import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from "./AdminHeader";

const FilmEdit = () => {
    const { id } = useParams();
    const [film, setFilm] = useState({
        name: '',
        releaseDate: '',
        description: '',
        youtubeLink: '',
        price: 0,
        state: ''
    });
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
        axios.get(`http://localhost:8080/location-film-api/films/${id}`)
            .then(response => {
                setFilm(response.data);
                setCurrentFilm(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentFilm({ ...currentFilm, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/location-film-api/films/${id}`, currentFilm)
            .then(response => {
                // Rediriger vers la page de détails du film
                window.location.href = `/filmsAdmin/${id}`;
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <AdminHeader/>
            <div className="form-container">
                <h2>Modifier les détails du film</h2>
                {film && (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nom du film:
                            <input type="text" name="name" value={currentFilm.name} onChange={handleInputChange}/>
                        </label>
                        <label>
                            Date de sortie:
                            <input type="text" name="releaseDate" value={currentFilm.releaseDate}
                                   onChange={handleInputChange}/>
                        </label>
                        <label>
                            Description:
                            <input type="text" name="description" value={currentFilm.description}
                                   onChange={handleInputChange}/>
                        </label>
                        <label>
                            Prix:
                            <input type="number" name="price" value={currentFilm.price} onChange={handleInputChange}/>
                        </label>
                        <label>
                            État:
                            <select name="state" value={currentFilm.state} onChange={handleInputChange}>
                                <option value="A">Disponible</option>
                                <option value="D">Indisponible</option>
                            </select>
                        </label>
                        <button type="submit">Enregistrer les modifications</button>
                    </form>
                )}
            </div>
        </div>
    );
};
export default FilmEdit;
