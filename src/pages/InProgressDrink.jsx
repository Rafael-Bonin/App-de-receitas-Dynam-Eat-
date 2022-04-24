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

export default function InProgressDrink(props) {
  const { history } = props;
  const id = history.location.pathname.replace(/\D/g, '');
  const [recipe, setRecipe] = useState([]);
  const [heart, setHeart] = useState('');
  const [allChecked, setAllChecked] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const isChecked = (name) => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes === null) return false;
    if (inProgressRecipes.cocktails[id] !== undefined) {
      return inProgressRecipes.cocktails[id].some(
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
      && inProgressRecipes.cocktails[id] !== undefined
      && inProgressRecipes.cocktails[id].length
        === ingredients.filter((ingre) => ingre.name !== '').length
    ) {
      return setAllChecked(false);
    }
    return setAllChecked(true);
  };

  const onCheck = (ingredientName, ids) => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes !== null) {
      const newIngredient = {
        ...inProgressRecipes,
        cocktails: {
          ...inProgressRecipes.cocktails,
          [ids]:
            inProgressRecipes.cocktails[ids] !== undefined
              ? [...inProgressRecipes.cocktails[ids], ingredientName]
              : [ingredientName],
        },
      };
      return localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(newIngredient),
      );
    }
    const newIngredient = {
      meals: {},
      cocktails: { [ids]: [ingredientName] },
    };
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(newIngredient),
    );
  };

  useEffect(() => {
    isFavorite(recipe.idDrink, setHeart);
    isFinished();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.drinks[0]));
  }, []);
  useEffect(() => {
    isFavorite(recipe.idDrink, setHeart);
    isFinished();
    const TWENTY = 12;
    getIngredients(recipe, TWENTY, setIngredients, null);
  }, [recipe]);
  useEffect(() => {
    console.log(ingredients);
    isFinished();
  }, [ingredients]);
  useEffect(() => {
    isFavorite(recipe.idDrink, setHeart);
  }, [refresh]);
  return (
    <main className="details-main-div">
      {recipe.length !== 0 && (
        <section key={ Math.random() }>
          <img
            data-testid="recipe-photo"
            alt="im"
            src={ recipe.strDrinkThumb }
            className="details-img"
          />
          <div className="details-no-img-div">
            <div className="details-title-div">
              <h2
                data-testid="recipe-title"
                className="details-title"
              >
                {recipe.strDrink}
              </h2>
              <h2
                data-testid="recipe-category"
                className="detail-types"
              >
                {recipe.strAlcoholic}
              </h2>
            </div>
          </div>
          <div className="details-share-fav-div">
            <button
              onClick={ () => copy(`http://localhost:3000/drinks/${id}`) }
              type="button"
              data-testid="share-btn"
            >
              Share
            </button>
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
          </div>
          <div className="details-content">
            <div className="details-ingredients">
              {ingredients.length > 0
                && ingredients
                  .filter((ingre) => ingre.name !== '')
                  .map((ingredient, index) => (
                    <section data-testid={ `${index}-ingredient-step` } key={ index }>
                      <p>
                        {ingredient.name}
                        {ingredient.measure}
                      </p>
                      <input
                        checked={ isChecked(ingredient.name) }
                        onClick={ () => {
                          onCheck(ingredient.name, recipe.idDrink);
                          isFinished();
                        } }
                        type="checkbox"
                      />
                    </section>
                  ))}
            </div>
            <div className="details-instructions">
              <p data-testid="instructions">
                {recipe.strInstructions}
              </p>
            </div>
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
          </div>
        </section>
      )}
    </main>
  );
}

InProgressDrink.propTypes = {
  history: propTypes.func.isRequired,
};
