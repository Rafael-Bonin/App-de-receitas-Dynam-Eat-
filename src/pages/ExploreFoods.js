import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FetchRandomFood from '../services/FetchRandomFood';

export default function ExploreFoods() {
  const [route, setRoute] = useState(false);
  const [randomFood, setRandomFood] = useState('');
  useEffect(async () => {
    const Foods = await FetchRandomFood();
    setRandomFood(Foods.idMeal);
  }, []);
  return (
    <div>
      <Header title="Explore Foods" sb={ false } />
      <Link
        data-testid="explore-by-ingredient"
        to="/explore/foods/ingredients"
      >
        By Ingredient
      </Link>
      <Link
        data-testid="explore-by-nationality"
        to="/explore/foods/nationalities"
      >
        By Nationality
      </Link>
      <button
        onClick={ () => setRoute(true) }
        type="button"
        data-testid="explore-surprise"
        to="/"
      >
        Surprise me!
      </button>
      {route && <Redirect to={ `/foods/${randomFood}}` } />}
      <Footer />
    </div>
  );
}
