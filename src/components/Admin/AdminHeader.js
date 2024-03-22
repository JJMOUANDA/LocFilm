import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    const handleLogout = () => {
        // Gérez la déconnexion ici, par exemple en supprimant les informations d'authentification du stockage local
        localStorage.removeItem('token');
    };

    return (
        <header className="App-header">
            <nav>
                <ul>
                    <li>
                        <Link to="/films">Films</Link>
                    </li>
                    <li>
                        <Link to="/Users">Comptes</Link>
                    </li>
                    <li>
                        <Link to="/historique">Historique</Link>
                    </li>
                    <li>
                    <Link to="/logout">
                            <button>logout</button>
                    </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AdminHeader;
