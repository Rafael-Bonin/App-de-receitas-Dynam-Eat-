import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  return (
    <>
      <Header title="Profile" sb={ false } />
      <main>
        <h3 data-testid="profile-email">Email</h3>
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button type="button" data-testid="profile-logout-btn">LogOut</button>
      </main>
      <Footer />
    </>
  );
}
