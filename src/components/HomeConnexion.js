import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../media/background2.jpg'
import AdminHeader from "./AdminHeader";
import FilmList from "./FilmList";
import { getUserIdFromToken, getUsernameFromToken } from './LoginForm';

const HomeConnexion = () => {
    const filmListRef = useRef(null);
    const scrollToFilmList = () => {
        filmListRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const username = getUsernameFromToken();
    const userId = getUserIdFromToken();
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
                <FilmList/>
            </div>
        </div>
    );
};

export default HomeConnexion;