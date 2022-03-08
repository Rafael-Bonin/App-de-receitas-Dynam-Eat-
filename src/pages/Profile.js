import React, { useState, useEffect } from 'react';
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
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button type="button" data-testid="profile-logout-btn">Logout</button>
      </main>
      <Footer />
    </>
  );
}
