import React from 'react';
import { Link } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import food from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" id="footer">
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" alt="Imagem de bebida" src={ drink } />
      </Link>
      <Link to="/explore">
        <img data-testid="explore-bottom-btn" alt="Imagem de explorar" src={ explore } />
      </Link>
      <Link to="/foods">
        <img data-testid="food-bottom-btn" alt="Imagem de comida" src={ food } />
      </Link>
    </footer>
  );
}

export default Footer;
