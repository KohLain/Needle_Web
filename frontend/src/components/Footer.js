import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {

  // Utilisation de useEffect pour ajouter les effets d'animation après le rendu du composant
  useEffect(() => {
    // Délai avant de démarrer l'observation des sections header
    setTimeout(() => {
      // Utilisation d'IntersectionObserver pour détecter le scroll et appliquer l'effet fadeIn
      const sections = document.querySelectorAll('.footer');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');  // Ajoute la classe qui applique le fadeIn
          }
        });
      }, {
        threshold: 1  // Déclencher l'effet lorsque l'élément est entièrement visible
      });

      // Appliquer l'observer à chaque section
      sections.forEach(section => {
        observer.observe(section);
      });

      // Nettoyage de l'observer à la fin de l'effet
      return () => {
        sections.forEach(section => {
          observer.unobserve(section);
        });
      };
    }, 500);  // Ajoute un délai de 500ms avant d'observer les sections header
  }, []);

  return (
    <footer className="footer">
      <div class="footer-container">
        <div class="grid-header"></div>
        <div class="grid-header">Main Pages</div>
        <div class="grid-header">Utility Pages</div>
        <div class="grid-separator"></div>
        <div class="grid-item grid-item-1"></div>
        <div class="grid-item">
          <ul>
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/shops" className="footer-link">Shops</Link></li>
            <li><Link to="/artists" className="footer-link">Artists</Link></li>
            <li><Link to="/flashs" className="footer-link">Flashs</Link></li>
          </ul>
        </div>
        <div class="grid-item">
          <ul>
            <li><Link to="/login" className="footer-link">Login</Link></li>
            <li><Link to="/register" className="footer-link">Register</Link></li>
          </ul>
        </div>
      </div>

    </footer>
  );
};

export default Footer;