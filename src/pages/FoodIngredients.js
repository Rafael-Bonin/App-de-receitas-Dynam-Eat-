import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FetchIngredients from '../services/FetchIngredients';
import recipesContext from '../services/recipesContext';

export default function FoodIngredients(props) {
  const [ready, setReady] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const { history } = props;
  const { setChicken, setRecipes } = useContext(recipesContext);

  const ELEVEN = 11;

  const getIngredients = async () => {
    const ingredients = await FetchIngredients();
    setAllIngredients(ingredients);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  useEffect(() => {
    setReady(true);
    console.log(allIngredients);
    console.log(ready);
  }, [allIngredients]);

  return (
    <>
      <Header title="Explore Ingredients" sb={ false } />
      {allIngredients.length > 0
        && allIngredients.map(
          (ingredient, index) => index <= ELEVEN && (
            <button
              key={ Math.random() }
              data-testid={ `${index}-ingredient-card` }
              onClick={ async () => {
                setChicken(true);
                await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient}`).then((response) => response.json()).then((data) => setRecipes(data.meals));
                history.push('/foods');
              } }
              type="button"
            >
              <h2 data-testid={ `${index}-card-name` }>
                {ingredient.strIngredient}
              </h2>
              <img src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` } data-testid={ `${index}-card-img` } alt="ingredient" />
            </button>
          ),
        )}
      <Footer />
    </>
  );
}

FoodIngredients.propTypes = {
  history: propTypes.string.isRequired,
};
