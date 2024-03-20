import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import AdminHeader from "./AdminHeader";
import axios from 'axios';

const FilmEdit = ({ film, updateFilm, setEditing }) => {
    const [currentFilm, setCurrentFilm] = useState(film);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentFilm({ ...currentFilm, [name]: value });
    };


    const saveFilm = () => {
        updateFilm(currentFilm.id, currentFilm);
        setEditing(false);
    };

    return (
        <div>
            <AdminHeader/>
            <div className="form-container">
                <h2>Modifier les détails du film</h2>
                {film && (
                    <form>
                        <label>Nom du film:</label>
                        <input type="text" name="name" value={currentFilm.name} onChange={handleInputChange}/>
                        <label>Date de sortie:</label>
                        <input type="text" name="releaseDate" value={currentFilm.releaseDate}
                               onChange={handleInputChange}/>
                        <label>Description:</label>
                        <input type="text" name="description" value={currentFilm.description}
                               onChange={handleInputChange}/>
                        <label>Prix:</label>
                        <input type="text" name="price" value={currentFilm.price} onChange={handleInputChange}/>
                        <label>Lien YouTube:</label>
                        <input type="text" name="youtubeLink" value={currentFilm.youtubeLink}
                               onChange={handleInputChange}/>
                        <button type="submit" onClick={saveFilm}>Enregistrer</button>
                        <Link to={`/films`}>
                            Annuler
                        </Link>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FilmEdit;
