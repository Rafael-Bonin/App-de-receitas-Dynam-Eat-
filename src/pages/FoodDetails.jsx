import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import getIngredients from './getIngredients';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

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

export default function FoodDetails(props) {
  const { history } = props;
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendeds, setRecommendeds] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [heart, setHeart] = useState('');
  const FIVE = 5;
  const id = history.location.pathname.replace(/\D/g, '');

  const inProgressRecipe = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress !== null) {
      return Object.keys(inProgress.meals).some((ids) => ids === recipe.idMeal);
    }
    return false;
  };

  useEffect(() => {
    isFavorite(recipe.idMeal, setHeart);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]));
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecommendeds(data.drinks));
  }, []);
  useEffect(() => {
    console.log('mudou');
    isFavorite(recipe.idMeal, setHeart);
  }, [refresh]);
  useEffect(() => {
    console.log(recipe);
    isFavorite(recipe.idMeal, setHeart);
    const TWELVE = 20;
    const dones = JSON.parse(localStorage.getItem('doneRecipes'));
    if (dones !== null && recipe.length !== 0) {
      setShow(dones.some((receita) => receita.id.toString() === recipe.idMeal));
    }
    getIngredients(recipe, TWELVE, setIngredients, '');
  }, [recipe]);
  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);
  return (
    <div>
      {recipe.length !== 0 && (
        <>
          <img
            data-testid="recipe-photo"
            style={ { width: '20%' } }
            alt="imagem"
            src={ recipe.strMealThumb }
          />
          <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
          <button
            onClick={ () => copy(`http://localhost:3000/foods/${id}`) }
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          <h3>Link copied!</h3>
          <button
            onClick={ () => {
              addFavorite(
                {
                  id: recipe.idMeal,
                  type: 'food',
                  nationality: recipe.strArea,
                  category: recipe.strCategory,
                  alcoholicOrNot: '',
                  name: recipe.strMeal,
                  image: recipe.strMealThumb,
                },
                recipe.idMeal,
              );
              setRefresh(!refresh);
            } }
            type="button"
          >
            <img data-testid="favorite-btn" alt="im" src={ heart } />
          </button>
          <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
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
      <iframe
        data-testid="video"
        width="95%"
        height="200"
        title="video"
        src={
          recipe.strYoutube && recipe.strYoutube.replace('watch?v=', 'embed/')
        }
      />
      <section style={ { width: '290%', textAlign: 'center' } }>
        {recommendeds.length > 0
          && recommendeds.map(
            (receita, index) => index <= FIVE && (
              <div
                key={ Math.random() }
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
                  {receita.strDrink}
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

FoodDetails.propTypes = {
  history: propTypes.func.isRequired,
};
