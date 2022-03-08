import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FetchRandomDrink from '../services/FetchRandomDrink';

export default function ExploreDrinks() {
  const [route, setRoute] = useState(false);
  const [randomDrink, setRandomDrink] = useState('');
  useEffect(async () => {
    const Drinks = await FetchRandomDrink();
    setRandomDrink(Drinks.idDrink);
  }, []);
  return (
    <>
      <Header title="Explore Drinks" sb={ false } />
      <Link
        data-testid="explore-by-ingredient"
        to="/explore/drinks/ingredients"
      >
        By Ingredient
      </Link>
      <button
        type="button"
        onClick={ () => setRoute(true) }
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
      {route && <Redirect to={ `/drinks/${randomDrink}}` } />}
      <Footer />
    </>
  );
}
