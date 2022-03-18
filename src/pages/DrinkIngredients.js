import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../services/recipesContext';

export default function DrinkIngredients(props) {
  const [ready, setReady] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const { history } = props;
  const { setGin, setRecipes } = useContext(recipesContext);

  const ELEVEN = 11;

  const getIngredients = async () => {
    const getIngredients2 = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
    );
    const processIngredients = await getIngredients2.json();
    const ingredients = await processIngredients.drinks;
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
    <main>
      <Header title="Explore Ingredients" sb={ false } />
      <div className="ingredients-cards-list">
        {allIngredients.length > 0
          && allIngredients.map(
            (ingredient, index) => index <= ELEVEN && (
              <button
                className="ingredients-cards"
                type="button"
                onClick={ async () => {
                  setGin(true);
                  await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient1}`).then((response) => response.json()).then((data) => setRecipes(data.drinks));
                  history.push('/drinks');
                } }
                key={ Math.random() }
                data-testid={ `${index}-ingredient-card` }
              >
                <h2 data-testid={ `${index}-card-name` }>
                  {ingredient.strIngredient1}
                </h2>
                <img src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` } data-testid={ `${index}-card-img` } alt="ingredient" />
              </button>
            ),
          )}
      </div>
      <Footer />
    </main>
  );
}

DrinkIngredients.propTypes = {
  history: propTypes.string.isRequired,
};
