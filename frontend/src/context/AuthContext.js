import React, { createContext, useState, useEffect } from 'react';

// Créer le contexte
export const AuthContext = createContext();

// Fournisseur de contexte
export const AuthProvider = ({ children }) => {
    // État pour stocker les informations de l'utilisateur
    const [user, setUser] = useState(null);

    // Charger les informations de l'utilisateur depuis le localStorage au chargement initial
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('user');
        if (token && userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    // Fonction pour se déconnecter
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};