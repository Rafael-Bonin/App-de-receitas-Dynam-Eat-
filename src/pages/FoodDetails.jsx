import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

export default function FoodDetails(props) {
  const { history } = props;
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendeds, setRecommendeds] = useState([]);
  const FIVE = 5;
  useEffect(() => {
    const id = history.location.pathname.replace(/\D/g, '');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]));
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecommendeds(data.drinks));
  }, []);
  useEffect(() => {
    console.log(recipe);
    const TWELVE = 20;
    if (recipe.length !== 0) {
      for (let i = 1; i <= TWELVE; i += 1) {
        const position = `strIngredient${i.toString()}`;
        if (recipe[position] !== '') {
          const positionMeasure = `strMeasure${i}`;
          setIngredients((ingredient) => [
            ...ingredient,
            { name: recipe[position], measure: recipe[positionMeasure] },
          ]);
        }
      }
    }
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
          <button type="button" data-testid="share-btn">
            Share
          </button>
          <button type="button" data-testid="favorite-btn">
            Favorite
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
          recipe.strYoutube !== undefined
          && recipe.strYoutube.replace('watch?v=', 'embed/')
        }
      />
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
                  {receita.strDrink}
                </h3>
              </div>
            ),
          )}
      </section>
      <button
        style={ { position: 'fixed', bottom: 0 } }
        type="button"
        data-testid="start-recipe-btn"
      >
        Start
      </button>
    </div>
  );
}

FoodDetails.propTypes = {
  history: propTypes.func.isRequired,
};
