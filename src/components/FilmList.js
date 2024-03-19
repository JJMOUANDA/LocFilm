import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../media/background.jpg'
const FilmList = () => {
    const [selectedFilm, setSelectedFilm] = useState(null);

    const films = [
        {
            id: 1,
            name: 'Black Panther',
            releaseDate: '2022-01-01',
            description: 'Description du film 1',
            youtubeLink: 'https://youtu.be/DlGIWM_e9vg?si=U_VXwLVd39z3M5j1',
            price: 10,
            state: 'A',
            imageUrl: 'https://cdn.kobo.com/book-images/7e060fa5-3a91-4ed1-94a3-57274b53e233/1200/1200/False/marvel-s-black-panther-4.jpg'
        },
        {
            id: 2,
            name: 'Film 2',
            releaseDate: '2022-02-01',
            description: 'Description du film 2',
            youtubeLink: 'https://www.youtube.com/watch?v=yyyyy',
            price: 8,
            state: 'D',
            imageUrl: 'url_vers_image_2'
        },
        {
            id: 3,
            name: 'Film 3',
            releaseDate: '2022-02-01',
            description: 'Description du film 2',
            youtubeLink: 'https://www.youtube.com/watch?v=yyyyy',
            price: 8,
            state: 'D',
            imageUrl: 'url_vers_image_2'
        },
        {
            id: 4,
            name: 'Film 4',
            releaseDate: '2022-02-01',
            description: 'Description du film 2',
            youtubeLink: 'https://www.youtube.com/watch?v=yyyyy',
            price: 8,
            state: 'D',
            imageUrl: 'url_vers_image_2'
        },
    ];

    const handleFilmClick = (film) => {
        setSelectedFilm(film); // Mettre à jour l'état avec le film sélectionné
    };

    return (
        <div>
            <div className="film-gallery" >
                {/* Mapper le tableau de films pour générer des cadres pour chaque film */}
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

export default FilmList;
