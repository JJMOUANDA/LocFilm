import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from "./AdminHeader";

const FilmAdd = () => {
    const [film, setFilm] = useState({
        name: '',
        releaseDate: '',
        description: '',
        youtubeLink: '',
        price: 0,
        state: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilm({ ...film, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/location-film-api/films', film)
            .then(response => {
                // Rediriger vers la page de détails du film
                navigate(`/filmsAdmin/${response.data.id}`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <AdminHeader/>
            <div className="form-container">
                <h2>Ajouter un film</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nom du film:
                        <input type="text" name="name" value={film.name} onChange={handleInputChange}/>
                    </label>
                    <label>
                        Date de sortie:
                        <input type="text" name="releaseDate" value={film.releaseDate}
                               onChange={handleInputChange}/>
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={film.description}
                               onChange={handleInputChange}/>
                    </label>
                    <label>
                        Lien YouTube:
                        <input type="text" name="youtubeLink" value={film.youtubeLink}
                               onChange={handleInputChange}/>
                    </label>
                    <label>
                        Prix:
                        <input type="number" name="price" value={film.price} onChange={handleInputChange}/>
                    </label>
                    <label>
                        État:
                        <select name="state" value={film.state} onChange={handleInputChange}>
                            <option value="A">Disponible</option>
                            <option value="D">Indisponible</option>
                        </select>
                    </label>
                    <button type="submit">Ajouter le film</button>
                </form>
            </div>
        </div>
    );
};

export default FilmAdd;
