import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import getIngredients from './getIngredients';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

const addFavorite = (recipe, id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes !== null) {
    const found = favoriteRecipes.some((receita) => receita.id === id);
    if (found) {
      const filtered = favoriteRecipes.filter((receit) => receit.id !== id);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    }
    const newRecipe = [...favoriteRecipes, recipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipe));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
  }
};

const isFavorite = (param, func) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes !== null) {
    console.log(param);
    const favorite = favoriteRecipes.some((receita) => receita.id === param);
    if (favorite) return func(blackHeart);
    return func(whiteHeart);
  }
  return func(whiteHeart);
};

export default function DrinkDetails(props) {
  const { history } = props;
  const [recipe, setRecipe] = useState([]);
  const [recommendeds, setRecommendeds] = useState([]);
  const [show, setShow] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [heart, setHeart] = useState('');
  const [refresh, setRefresh] = useState(false);
  const FIVE = 5;

  const id = history.location.pathname.replace(/\D/g, '');

  const inProgressRecipe = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress !== null) {
      return Object.keys(inProgress.cocktails).some(
        (ids) => ids === recipe.idDrink,
      );
    }
    return false;
  };

  useEffect(() => {
    isFavorite(recipe.idDrink, setHeart);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.drinks[0]));
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecommendeds(data.meals));
  }, []);
  useEffect(() => {
    console.log('mudou');
    isFavorite(recipe.idDrink, setHeart);
  }, [refresh]);
  useEffect(() => {
    console.log(recipe);
    console.log(recommendeds);
    isFavorite(recipe.idDrink, setHeart);
    const TWENTY = 15;
    const dones = JSON.parse(localStorage.getItem('doneRecipes'));
    if (dones !== null && recipe.length !== 0) {
      setShow(
        dones.some((receita) => receita.id.toString() === recipe.idDrink),
      );
    }
    getIngredients(recipe, TWENTY, setIngredients, null);
  }, [recipe]);
  useEffect(() => {
    console.log(recommendeds);
  }, [recommendeds]);
  return (
    <div style={ { height: '100%' } }>
      {recipe.length !== 0 && (
        <>
          <img
            data-testid="recipe-photo"
            style={ { width: '20%' } }
            alt="imagem"
            src={ recipe.strDrinkThumb }
          />
          <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
          <button
            onClick={ () => copy(`http://localhost:3000/drinks/${id}`) }
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          <h3>Link copied!</h3>
          <button
            type="button"
            onClick={ () => {
              addFavorite(
                {
                  id: recipe.idDrink,
                  type: 'drink',
                  nationality: '',
                  category: recipe.strCategory,
                  alcoholicOrNot: recipe.strAlcoholic,
                  name: recipe.strDrink,
                  image: recipe.strDrinkThumb,
                },
                recipe.idDrink,
              );
              setRefresh(!refresh);
            } }
          >
            <img data-testid="favorite-btn" alt="im" src={ heart } />
          </button>
          <h2 data-testid="recipe-category">{recipe.strAlcoholic}</h2>
        </>
      )}
      {ingredients.length > 0
        && ingredients.map((ingredient, index) => (
          <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {ingredient.name}
            ,
            {ingredient.measure}
          </p>
        ))}
      <p style={ { width: '95%' } } data-testid="instructions">
        {recipe.strInstructions}
      </p>
      <section style={ { width: '290%', textAlign: 'center' } }>
        {recommendeds.length > 0
          && recommendeds.map(
            (receita, index) => index <= FIVE && (
              <div
                style={ {
                  display: index <= 1 ? 'inline-block' : 'none',
                  width: '160px',
                  height: '100px',
                  margin: ['10px', '20px'],
                  float: 'left',
                } }
                data-testid={ `${index}-recomendation-card` }
              >
                <h3 data-testid={ `${index}-recomendation-title` }>
                  {receita.strMeal}
                </h3>
              </div>
            ),
          )}
      </section>
      {show === false && (
        <button
          style={ {
            position: 'fixed',
            bottom: 0,
            left: 0,
          } }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => inProgressRecipe() === false
            && history.push(`${history.location.pathname}/in-progress`) }
        >
          {inProgressRecipe() ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

DrinkDetails.propTypes = {
  history: propTypes.func.isRequired,
};
