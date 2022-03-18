import React from 'react';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function CardFavorites(props) {
  const {
    type,
    image,
    // category,
    name,
    index,
    // alcoholicOrNot,
    // nationality,
    id,
    // history,
    refresh,
    setRefresh,
  } = props;
  // const sendToDetails = (types) => (types === 'food'
  //   ? history.push(`/foods/${id}`)
  //   : history.push(`/drinks/${id}`));

  const removeRecipe = (ids) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newRecipes = favoriteRecipes.filter((recipe) => recipe.id !== ids);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    return setRefresh(!refresh);
  };

  return (
    <section className="cards-body">
      <div className="cards-done-fav-body">
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="img"
          src={ image }
        />
        <div className="details-food-drink">
          <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
        </div>
        <div className="share-fav-div">
          <button
            className="buttons-card-fav-done"
            type="button"
            onClick={ () => (type === 'food'
              ? copy(`http://localhost:3000/foods/${id}`)
              : copy(`http://localhost:3000/drinks/${id}`)) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="img"
            />
          </button>
          <button
            className="buttons-card-fav-done"
            type="button"
            onClick={ () => removeRecipe(id) }
          >
            <img
              alt="img"
              src={ blackHeart }
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      </div>
    </section>
  );
}

CardFavorites.propTypes = {
  type: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  // category: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  index: propTypes.string.isRequired,
  // alcoholicOrNot: propTypes.string.isRequired,
  // nationality: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  // history: propTypes.string.isRequired,
  refresh: propTypes.string.isRequired,
  setRefresh: propTypes.string.isRequired,
};
