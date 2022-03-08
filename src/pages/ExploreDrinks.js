import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinks() {
  return (
    <>
      <Header title="Explore Drinks" sb={ false } />
      <Link
        data-testid="explore-by-ingredient"
        to="/explore/drinks/ingredients"
      >
        By Ingredient
      </Link>
      <Link
        data-testid="explore-surprise"
        to="/"
      >
        Surprise me!
      </Link>
      <Footer />
    </>
  );
}
