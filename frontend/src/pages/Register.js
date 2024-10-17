import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Register.css';

// Composant pour l'inscription des utilisateurs
const Register = () => {
    // État pour les données du formulaire
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        birthdate: ''
    });

    // État pour les messages de retour
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook pour la navigation
    const { setUser } = useContext(AuthContext); // Accéder à la fonction pour mettre à jour l'utilisateur

    // Déstructuration des champs pour faciliter l'accès
    const { first_name, last_name, email, password, phone_number, birthdate } = formData;

    // Gestion des changements dans les champs du formulaire
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Gestion de la soumission du formulaire
    const onSubmit = async e => {
        e.preventDefault(); // Empêche le rechargement de la page

        try {
            // Envoyer une requête POST à l'API pour inscrire l'utilisateur
            const res = await axios.post('http://localhost:5000/register', formData);
            setMessage('Inscription réussie !');

            // Stocker le token et les informations de l'utilisateur dans le localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            // Mettre à jour le contexte d'authentification
            setUser(res.data.user);

            // Rediriger vers la page d'accueil
            navigate('/');
        } catch (err) {
            // Gérer les erreurs et afficher le message d'erreur approprié
            setMessage(err.response.data.message || 'Erreur lors de l\'inscription');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={onSubmit} className="register-form">
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={first_name}
                    onChange={onChange}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={onChange}
                    required
                    className="input-field"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={phone_number}
                    onChange={onChange}
                    required
                    className="input-field"
                />
                <input
                    type="date"
                    name="birthdate"
                    placeholder="Birthdate"
                    value={birthdate}
                    onChange={onChange}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-button">S'inscrire</button>
            </form>
            <div className="register-artist-link">
                <p>Vous êtes tatoueur? <Link to="/register-artist" className="create-artist-account-link">Créer un compte tatoueur</Link></p>
            </div>
        </div>
    );
};

export default Register;