import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Explore.css';

export default function Explore() {
  return (
    <main className="main-explore">
      <Header title="Explore" sb={ false } />
      <div className="explore-page">
        <button
          className="explore-buttons-div"
          type="button"
        >
          <Link data-testid="explore-foods" to="/explore/foods">
            Explore Foods
          </Link>
        </button>
        <button
          className="explore-buttons-div"
          type="button"
        >
          <Link data-testid="explore-drinks" to="/explore/drinks">
            Explore Drinks
          </Link>
        </button>
      </div>
      <Footer />
    </main>
  );
}
