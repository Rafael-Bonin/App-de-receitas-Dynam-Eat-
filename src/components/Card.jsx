import React, { useEffect } from 'react';
import propTypes from 'prop-types';

export default function Card({ recipe }) {
  const { id, name, image } = recipe;
  useEffect(() => {
    console.log(recipe);
    console.log(name);
    console.log(id);
  }, [recipe]);
  return (
    <div data-testid={ `${id}-recipe-card` }>
      <img
        style={ { width: '20%' } }
        alt="imagem da receita"
        src={ image }
        data-testid={ `${id}-card-img` }
      />
      <h2 data-testid={ `${id}-card-name` }>{name}</h2>
    </div>
  );
}

Card.propTypes = {
  recipe: propTypes.func.isRequired,
};
