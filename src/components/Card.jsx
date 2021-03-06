import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './Cards.css';

export default function Card({ recipe, route }) {
  const { id, name, image, recipeId } = recipe;
  const [rota, setRota] = useState(false);
  useEffect(() => {
    console.log(recipe);
    console.log(name);
    console.log(id);
  }, [recipe]);
  return (
    <button
      className="cards-container"
      type="button"
      onClick={ () => setRota(true) }
      data-testid={ `${id}-recipe-card` }
    >
      <img
        alt="imagem da receita"
        src={ image }
        data-testid={ `${id}-card-img` }
      />
      <h2 data-testid={ `${id}-card-name` }>{name}</h2>
      {rota && <Redirect to={ `/${route}/${recipeId}` } />}
    </button>
  );
}

Card.propTypes = {
  recipe: propTypes.func.isRequired,
  route: propTypes.string.isRequired,
};
