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

export default function InProgressFood(props) {
  const { history } = props;
  const id = history.location.pathname.replace(/\D/g, '');
  const [recipe, setRecipe] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [heart, setHeart] = useState('');
  const [allChecked, setAllChecked] = useState(true);
  const [ingredients, setIngredients] = useState([]);

  const isChecked = (name) => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes === null) return false;
    if (inProgressRecipes.meals[id] !== undefined) {
      return inProgressRecipes.meals[id].some(
        (ingredient) => ingredient === name,
      );
    }
  };

  const isFinished = () => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (
      inProgressRecipes !== null
      && inProgressRecipes.meals[id] !== undefined
      && inProgressRecipes.meals[id].length
        === ingredients.filter((ingre) => ingre.name !== null).length
    ) {
      return setAllChecked(false);
    }
    console.log('isFinished');
    return setAllChecked(true);
  };

  const onCheck = (ingredientName, ids) => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes !== null) {
      const newIngredient = {
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [ids]:
            inProgressRecipes.meals[ids] !== undefined
              ? [...inProgressRecipes.meals[ids], ingredientName]
              : [ingredientName],
        },
      };
      return localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(newIngredient),
      );
    }
    const newIngredient = {
      cocktails: {},
      meals: { [ids]: [ingredientName] },
    };
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(newIngredient),
    );
  };

  useEffect(() => {
    console.log(recipe.idMeal);
    isFavorite(recipe.idMeal, setHeart);
  }, [refresh]);

  useEffect(() => {
    isFavorite(recipe.idMeal, setHeart);
    isFinished();
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]));
  }, []);
  useEffect(() => {
    const TWENTY = 20;
    isFavorite(recipe.idMeal, setHeart);
    isFinished();
    getIngredients(recipe, TWENTY, setIngredients, '');
  }, [recipe]);
  useEffect(() => {
    console.log(ingredients);
    isFinished();
  }, [ingredients]);
  return (
    <main className="details-main-div">
      {recipe.length !== 0 && (
        <section key={ Math.random() }>
          <img
            data-testid="recipe-photo"
            alt="im"
            src={ recipe.strMealThumb }
            className="details-img"
          />
          <div className="details-no-img-div">
            <div className="details-title-div">
              <h2
                data-testid="recipe-title"
                className="details-title"
              >
                {recipe.strMeal}
              </h2>
              <h2
                data-testid="recipe-category"
                className="detail-types"
              >
                {recipe.strCategory}
              </h2>
            </div>
          </div>
          <div className="details-share-fav-div">
            <button
              onClick={ () => copy(`http://localhost:3000/foods/${id}`) }
              type="button"
              data-testid="share-btn"
            >
              Share
            </button>
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
          </div>
          <div className="details-content">
            <div className="details-ingredients">
              {ingredients.length > 0
                && ingredients
                  .filter((ingre) => ingre.name !== null)
                  .map((ingredient, index) => (
                    <section data-testid={ `${index}-ingredient-step` } key={ index }>
                      <p>
                        {ingredient.name}
                        {ingredient.measure}
                      </p>
                      <input
                        checked={ isChecked(ingredient.name) }
                        onClick={ () => {
                          onCheck(ingredient.name, recipe.idMeal);
                          isFinished();
                        } }
                        type="checkbox"
                      />
                    </section>
                  ))}
            </div>
          </div>
          <div className="details-instructions">
            <p data-testid="instructions">
              {recipe.strInstructions}
            </p>
          </div>
          <div className="details-start-finish-recipe">
            <button
              disabled={ allChecked }
              onClick={ () => history.push('/done-recipes') }
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finish
            </button>
            )
          </div>
        </section>
      )}
    </main>
  );
}

InProgressFood.propTypes = {
  history: propTypes.func.isRequired,
};
