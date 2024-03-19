// Home.js
import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../media/background2.jpg'
import AdminHeader from "./AdminHeader";
import FilmList from "./FilmList";

const Home = () => {
    const filmListRef = useRef(null);
    const scrollToFilmList = () => {
        filmListRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className="home-container" style={{backgroundImage: `url(${backgroundImage})`}}>
                <div className="overlay"></div>
                <div className="home-content">
                    <h2 className="home-slogan">Location de Films en illimité</h2>
                    <p className="home-subtitle">À partir de 6,99 €. Annulez à tout moment.</p>
                    <button className="home-cta" onClick={scrollToFilmList}>Découvrir ⬇ <i
                        className="fas fa-angle-down"></i></button>
                </div>
                <div>
                    <div className="overlay"></div>
                    <div className="create-account-link">
                        <div className="app-logo">CineLoc</div>
                        <Link to="/signup">
                            <button>SignUP</button>
                        </Link>
                        <Link to="/login">
                            <button>Login</button>
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

export default Home;
