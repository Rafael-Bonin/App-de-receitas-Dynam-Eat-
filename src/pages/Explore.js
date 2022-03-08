import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  return (
    <div>
      <Header title="Explore" sb={ false } />
      <Link data-testid="explore-foods" to="/explore/foods">
        Explore Foods
      </Link>
      <Link data-testid="explore-drinks" to="/explore/drinks">
        Explore Drinks
      </Link>
      <Footer />
    </div>
  );
}
