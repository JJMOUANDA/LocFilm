// SignUpForm.js
import React, { useState } from 'react';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        role: '',
        password: '',
        email: '',
        imageData: '',
        state: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Soumettre les données du formulaire ici (envoyer à l'API, etc.)
        console.log(formData);
    };

    return (
        <div className="form-container">
            <h1>Création de compte</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Rôle"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Image Data"
                    name="imageData"
                    value={formData.imageData}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="État"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                />
                <button type="submit">Créer un compte</button>
            </form>
        </div>
    );
};

export default SignUpForm;
