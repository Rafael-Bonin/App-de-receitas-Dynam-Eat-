import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [email, setEmail] = useState('');
  const getEmail = async () => {
    const Email = await JSON.parse(localStorage.getItem('user'));
    setEmail(Email.email);
  };
  useEffect(() => {
    getEmail();
  }, []);

  return (
    <>
      <Header title="Profile" sb={ false } />
      <main>
        <h3 data-testid="profile-email">
          { email.length > 0 ? (
            email
          ) : (
            <p>Loading</p>
          )}
        </h3>
        <Link to="/done-recipes" data-testid="profile-done-btn">Done Recipes</Link>
        <Link to="/favorite-recipes" data-testid="profile-favorite-btn">
          Favorite Recipes
        </Link>
        <Link
          onClick={ () => localStorage.clear() }
          to="/"
          data-testid="profile-logout-btn"
        >
          Logout
        </Link>
      </main>
      <Footer />
    </>
  );
}
