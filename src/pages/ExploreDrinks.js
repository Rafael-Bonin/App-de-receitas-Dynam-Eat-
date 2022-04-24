import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FetchRandomDrink from '../services/FetchRandomDrink';
import './Explore.css';

export default function ExploreDrinks() {
  const [route, setRoute] = useState(false);
  const [randomDrink, setRandomDrink] = useState();

  const setDrink = async () => {
    const Drinks = await FetchRandomDrink();
    setRandomDrink(Drinks.idDrink);
  };

  useEffect(() => {
    setDrink();
  }, []);

  useEffect(() => {
    console.log(randomDrink);
  }, [randomDrink]);
  return (
    <main className="main-explore">
      <Header title="Explore Drinks" sb={ false } />
      <div className="explore-page">
        <button
          onClick={ () => setRoute(true) }
          type="button"
          to="/"
          className="explore-buttons-div"
        >
          <Link
            data-testid="explore-by-ingredient"
            to="/explore/drinks/ingredients"
          >
            By Ingredient
          </Link>
        </button>
        <button
          type="button"
          onClick={ () => setRoute(true) }
          data-testid="explore-surprise"
          className="explore-buttons-div"
        >
          Surprise me!
        </button>
      </div>
      {route && <Redirect to={ `/drinks/${randomDrink}` } />}
      <Footer />
    </main>
  );
}
