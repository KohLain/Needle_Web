import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

// Composant de la page d'accueil
const Home = () => {
  const [email, setEmail] = useState(''); // Stocker l'email saisi
  const [message, setMessage] = useState(''); // Message de feedback pour l'utilisateur

  // Utilisation de useEffect pour ajouter les effets d'animation après le rendu du composant
  useEffect(() => {
    // Effet fadeIn pour .background-text
    $('.background-text').hide().fadeIn(500);  // 1 seconde pour l'effet fadeIn

    // Effet slideUp personnalisé pour .content
    setTimeout(() => {
      $('.content').addClass('show');  // Ajoute la classe 'show' pour déclencher la transition CSS
    }, 500);  // Décalage de 500ms avant que l'effet ne commence

    // Délai avant de démarrer l'observation des sections header
    setTimeout(() => {
      // Utilisation d'IntersectionObserver pour détecter le scroll et appliquer l'effet fadeIn
      const sections = document.querySelectorAll('.section-header, .guide-container, .newsletter-section');
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

  // Fonction qui gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation de l'email (simple validation basique)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Appel à une API (ici, on simule simplement avec un console.log)
    console.log('Email submitted:', email);

    // Vous pouvez remplacer ce console.log par une requête à une API pour gérer l'inscription :
    // fetch('URL_DE_VOTRE_API', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setMessage('You have successfully subscribed to the newsletter!');
    // })
    // .catch(error => {
    //   setMessage('There was an error. Please try again later.');
    // });

    // Simuler une soumission réussie
    setMessage('You have successfully subscribed to the newsletter!');
    setEmail(''); // Réinitialiser le champ email
  };

  return (
    <div class='container'>
      <section class="hero">
        <div class="background-text">
          <span class="needle">NEEDLE</span>
          <span class="needle-image">NEEDLE</span>
          <span class="needle">NEEDLE</span>
        </div>
        <div class="content">
          <h1>.Your tattoo<br></br>is important.</h1>
          <p class="subtitle">
            Tattooing is the art of marking the soul through the skin, and tattoo artists are artisans of time.<br></br>Here, we honor their talent and give this craft the respect it deserves.
          </p>
          <div class="buttons">
            <Link to="/contact" className="btn">Contact us</Link>
            <Link to="/artists" className="btn-secondary">View Artists</Link>
          </div>
        </div>
      </section>

      <section class="guide-container">
        
        {/* <div class="search-container">
          <form class="search-form">
            <input type="text" placeholder="Search for a city, postcode, department..." />
            <select name="style" id="style">
              <option value="None">Style</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            <button type="submit"><p>Search</p></button>
          </form>
        </div> */}
        <h2>Book the perfect tattoo in 3 steps</h2>
        <div class="guide">
          <div class="guide-item">
            <span class="step-number">01</span>
            <div class="guide-item-separator"></div>
            <h3>Choose an artist</h3>
            <p>Find the perfect artist for your tattoo by browsing our selection of talented professionals.</p>
          </div>
          <div class="guide-item">
            <span class="step-number">02</span>
            <div class="guide-item-separator"></div>
            <h3>Get in touch</h3>
            <p>Contact the artist directly to discuss your ideas, ask questions, and schedule a consultation.</p>
          </div>
          <div class="guide-item">
            <span class="step-number">03</span>
            <div class="guide-item-separator"></div>
            <h3>Book your session</h3>
            <p>Reserve your tattoo session and get ready for a unique experience with your chosen artist.</p>
          </div>
        </div>
      </section>

      <section class="section-header">
        <div class="section-header-content">
          <div class="circle">
            <span>01</span>
          </div>
          <div class="separator">
            <h2>OUR MISSION</h2>
          </div>

        </div>
      </section>

      <section class="section-header">
        <div class="section-header-content">
          <div class="circle">
            <span>02</span>
          </div>
          <div class="separator">
            <h2>OUR SERVICES</h2>
          </div>
        </div>
      </section>

      <section class="section-header">
        <div class="section-header-content">
          <div class="circle">
            <span>03</span>
          </div>
          <div class="separator">
            <h2>OUR SELECTION</h2>
          </div>
        </div>
      </section>

      <section class="section-header">
        <div class="section-header-content">
          <div class="circle">
            <span>04</span>
          </div>
          <div class="separator">
            <h2>OUR COMMITMENT</h2>
          </div>
        </div>
      </section>

      <section class="section-header">
        <div class="section-header-content">
          <div class="circle">
            <span>05</span>
          </div>
          <div class="separator">
            <h2>OUR COMMUNITY</h2>
          </div>
        </div>
      </section>

      <section class="newsletter-section">
        <div class="newsletter-separator"></div>

        <div class="newsletter-content">
          <h2>Stay tuned for <br></br> more updates!</h2>
          <form onSubmit={handleSubmit} class="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit"><p>Subscribe</p></button>
          </form>
        </div>
        {message && <p>{message}</p>}

      </section >

    </div >
  );
};

export default Home;