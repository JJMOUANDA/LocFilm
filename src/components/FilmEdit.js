import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import AdminHeader from "./AdminHeader";

const FilmEdit = ({ films }) => {
    const { id } = useParams();
    const [filmDetails, setFilmDetails] = useState(null);

    useEffect(() => {
        const film = films.find(film => film.id === parseInt(id));
        setFilmDetails(film);
    }, [films, id]);

    return (
        <div>
            <AdminHeader />
            <div className="form-container">
                <h2>Modifier les détails du film</h2>
                {filmDetails && (
                    <form>
                        <label>Nom du film:</label>
                        <input type="text" value={filmDetails.name} readOnly/>
                        <label>Date de sortie:</label>
                        <input type="text" value={filmDetails.releaseDate} readOnly/>
                        <label>Description:</label>
                        <input type="text" value={filmDetails.description} readOnly/>
                        <label>Prix:</label>
                        <input type="text" value={filmDetails.price} readOnly/>
                        <label>Lien YouTube:</label>
                        <input type="text" value={filmDetails.youtubeLink} readOnly/>
                        <button type="submit">Enregistrer</button>
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
