import React from 'react';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function CardFavorites(props) {
  const {
    type,
    image,
    category,
    name,
    index,
    alcoholicOrNot,
    nationality,
    id,
    history,
    refresh,
    setRefresh,
  } = props;
  const sendToDetails = (types) => (types === 'food'
    ? history.push(`/foods/${id}`)
    : history.push(`/drinks/${id}`));

  const removeRecipe = (ids) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newRecipes = favoriteRecipes.filter((recipe) => recipe.id !== ids);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    return setRefresh(!refresh);
  };

  return (
    <section>
      <button type="button" onClick={ () => sendToDetails(type) }>
        <img
          style={ { width: '30%' } }
          data-testid={ `${index}-horizontal-image` }
          alt="im"
          src={ image }
        />
      </button>
      {type === 'food' ? (
        <h3 data-testid={ `${index}-horizontal-top-text` }>
          {nationality}
          {' '}
          -
          {' '}
          {category}
        </h3>
      ) : (
        <h3 data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</h3>
      )}
      <button onClick={ () => sendToDetails(type) } type="button">
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      </button>
      <button
        type="button"
        onClick={ () => (type === 'food'
          ? copy(`http://localhost:3000/foods/${id}`)
          : copy(`http://localhost:3000/drinks/${id}`)) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="im"
        />
      </button>
      <button type="button" onClick={ () => removeRecipe(id) }>
        <img
          alt="im"
          src={ blackHeart }
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </section>
  );
}

CardFavorites.propTypes = {
  type: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  index: propTypes.string.isRequired,
  alcoholicOrNot: propTypes.string.isRequired,
  nationality: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  history: propTypes.string.isRequired,
  refresh: propTypes.string.isRequired,
  setRefresh: propTypes.string.isRequired,
};
