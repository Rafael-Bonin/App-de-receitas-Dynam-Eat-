import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../services/recipesContext';
import Card from '../components/Card';
import GetCategories from '../components/GetCategories';

function Drinks() {
  const { recipes, setRecipes } = useContext(recipesContext);
  const TWELVE = 12;

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecipes(data.drinks));
  }, []);
  return (
    <div>
      <Header title="Drinks" sb />
      <GetCategories apiName="thecocktaildb" />
      {recipes.length > 1
        && recipes.map((recipe, index) => (
          index < TWELVE
          && <Card
            recipe={ { id: index,
              name: recipe.strDrink,
              image: recipe.strDrinkThumb } }
            key={ Math.random() }
          />
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;
