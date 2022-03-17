import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.css';

export default function Profile() {
  const [email, setEmail] = useState('');
  const getEmail = async () => {
    const Email = await JSON.parse(localStorage.getItem('user'));
    if (Email !== null) {
      setEmail(Email.email);
    }
  };
  useEffect(() => {
    getEmail();
  }, []);

  return (
    <div className="profile-container">
      <Header title="Profile" sb={ false } />
      <main>
        <h3 data-testid="profile-email">
          { email.length > 0 ? (
            email
          ) : (
            <p>Loading</p>
          )}
        </h3>
        <div className="profile-content">
          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
