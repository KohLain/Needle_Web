// Importation des modules nécessaires
const express = require('express'); // Framework web
const cors = require('cors'); // Middleware pour gérer les CORS
const dotenv = require('dotenv'); // Pour charger les variables d'environnement
const { Pool } = require('pg'); // Client PostgreSQL
const bcrypt = require('bcrypt'); // Pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // Pour la génération et vérification des JWT

// Configuration des variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();
const port = process.env.PORT || 5000; // Port d'écoute

// Middleware
app.use(cors()); // Autoriser les requêtes Cross-Origin (necessaire pour permettre au front-end d'accéder au back-end)
app.use(express.json()); // Permet de parser les JSON dans les requêtes

// Configuration de la connexion PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // URL de connexion à la base de données
});

// Tester la connexion à la base de données
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erreur de connexion à la BDD', err);
    }
    console.log('Connecté à la base de données PostgreSQL');
});

// Définition des routes

// Route racine pour tester le serveur
app.get('/', (req, res) => {
    res.send('API fonctionne');
});

// Route pour l'inscription des utilisateurs
app.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, phone_number, birthdate } = req.body; // Extraction des données du corps de la requête
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }

        // Hash du mot de passe avec bcrypt
        const salt = await bcrypt.genSalt(10); // Génère un salt avec 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt); // Hache le mot de passe

        // Insérer le nouvel utilisateur dans la base de données
        const newUser = await pool.query(
            `INSERT INTO users 
            (first_name, last_name, email, password, phone_number, birthdate) 
        VALUES 
            ($1, $2, $3, $4, $5, $6) 
        RETURNING id, first_name, last_name, email, phone_number, birthdate, created_at, updated_at`,
            [first_name, last_name, email, hashedPassword, phone_number, birthdate]
        );

        // Générer un token JWT pour l'utilisateur inscrit
        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Répondre avec le token et les informations de l'utilisateur
        res.status(201).json({ token, user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// Route pour la connexion des utilisateurs
app.post('/login', async (req, res) => {
    const { email, password } = req.body; // Extraction des données du corps de la requête
    try {
        // Vérifier si l'utilisateur existe dans la base de données
        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        // Récupérer les informations de l'utilisateur
        const user = userQuery.rows[0];

        // Comparer le mot de passe fourni avec le mot de passe haché dans la base de données
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un token JWT pour l'utilisateur connecté
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Supprimer le mot de passe de l'objet utilisateur
        delete user.password;

        // Répondre avec le token et les informations de l'utilisateur
        res.json({ token, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
