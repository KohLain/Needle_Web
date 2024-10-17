import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import du fichier de styles global
import Navbar from './components/Navbar'; // Import du composant Navbar
import Footer from './components/Footer'; // Import du composant Footer
import Home from './pages/Home'; // Import de la page Home
import Register from './pages/Register'; // Import de la page Register
import Login from './pages/Login'; // Import de la page Login

// Composant principal de l'application
function App() {
  return (
    <Router>
      <Navbar /> {/* Affichage de la barre de navigation sur toutes les pages */}
      <div className='page-container'>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
          <Route path="/register" element={<Register />} /> {/* Route pour l'inscription */}
          <Route path="/login" element={<Login />} /> {/* Route pour la connexion */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;