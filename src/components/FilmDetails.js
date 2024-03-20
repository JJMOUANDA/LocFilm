import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FilmDetails = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/location-film-api/films/${id}`)
            .then(response => {
                setFilm(response.data);
                setComments(response.data.comments);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    if (!film) {
        return <div>Film non trouvé</div>;
    }

    return (
        <div className="filmdetails">
            <div className="film-info">
                <img src={film.imageUrl} alt={film.name} className="filmimage" />
                <div className="filmtext">
                    <h2 className="filmtitle">{film.name}</h2>
                    <p className="film-releasedate">Date de sortie: {film.releaseDate}</p>
                    <p className="film-description">Description: {film.description}</p>
                    <p className="film-price">Prix: {film.price} €</p>
                </div>
            </div>
            <h3 className="comments-title">Commentaires:</h3>
            <ul className="comments-list">
                {comments && comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <strong className="comment-author">{comment.userId}</strong> - {comment.text}
                        <br />
                        <small className="comment-date">{comment.date}</small>
                    </li>
                ))}
            </ul>
            <Link to="/film" className="back-link">Retour à la liste des films</Link>
        </div>
    );
};

export default FilmDetails;
