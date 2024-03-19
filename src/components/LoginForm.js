import React, { useState } from 'react';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Soumettre les données du formulaire de connexion ici (envoyer à l'API, etc.)
        console.log(formData);
    };

    return (
        <div className="form-container">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginForm;
