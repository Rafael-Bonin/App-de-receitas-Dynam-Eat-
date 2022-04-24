import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FetchRandomFood from '../services/FetchRandomFood';
import './Explore.css';

export default function ExploreFoods() {
  const [route, setRoute] = useState(false);
  const [randomFood, setRandomFood] = useState();

  const setFood = async () => {
    const Foods = await FetchRandomFood();
    setRandomFood(Foods.idMeal);
  };

  useEffect(() => {
    setFood();
  }, []);
  return (
    <main className="main-explore">
      <Header title="Explore Foods" sb={ false } />
      <div className="explore-page">
        <button
          onClick={ () => setRoute(true) }
          type="button"
          to="/"
          className="explore-buttons-div"
        >
          <Link
            data-testid="explore-by-ingredient"
            to="/explore/foods/ingredients"
          >
            By Ingredient
          </Link>
        </button>
        <button
          onClick={ () => setRoute(true) }
          type="button"
          to="/"
          className="explore-buttons-div"
        >
          <Link
            data-testid="explore-by-nationality"
            to="/explore/foods/nationalities"
          >
            By Nationality
          </Link>
        </button>
        <button
          onClick={ () => setRoute(true) }
          type="button"
          data-testid="explore-surprise"
          to="/"
          className="explore-buttons-div"
        >
          Surprise me!
        </button>
      </div>
      {route && <Redirect to={ `/foods/${randomFood}` } />}
      <Footer />
    </main>
  );
}
