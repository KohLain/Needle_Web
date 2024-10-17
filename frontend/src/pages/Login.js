import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';

// Composant pour la connexion des utilisateurs
const Login = () => {
    // État pour les données du formulaire
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // État pour les messages de retour
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook pour la navigation
    const { setUser } = useContext(AuthContext); // Accéder à la fonction pour mettre à jour l'utilisateur

    // Déstructuration des champs pour faciliter l'accès
    const { email, password } = formData;

    // Gestion des changements dans les champs du formulaire
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Gestion de la soumission du formulaire
    const onSubmit = async e => {
        e.preventDefault(); // Empêche le rechargement de la page

        try {
            // Envoyer une requête POST à l'API pour connecter l'utilisateur
            const res = await axios.post('http://localhost:5000/login', formData);
            setMessage('Connexion réussie !');

            // Stocker le token et les informations de l'utilisateur dans le localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            // Mettre à jour le contexte d'authentification
            setUser(res.data.user);

            // Rediriger vers la page d'accueil
            navigate('/');
        } catch (err) {
            // Gérer les erreurs et afficher le message d'erreur approprié
            setMessage(err.response.data.message || 'Erreur lors de la connexion');
        }
    };

    return (
        <div className="login-container">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={onSubmit} className="login-form">
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
          placeholder="Mot de passe"
          value={password}
          onChange={onChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Se connecter</button>
      </form>
      <div className="register-link">
        <p>Vous n'avez pas de compte? <Link to="/register" className="create-account-link">Créer un compte</Link></p>
        <Link to="/reset-password" className="forgot-password-link">Mot de passe oublié?</Link>
      </div>
    </div>
  );
};

export default Login;