import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import GetCategories from '../components/GetCategories';
import Header from '../components/Header';
import recipesContext from '../services/recipesContext';

/* .filter((receita) => {
  if (mainFilter !== '') {
    return getIngredients(receita, TWENTY, '', null).includes(mainFilter);
  }
  return true;
}) */

function Foods() {
  const { recipes, setRecipes, chicken } = useContext(recipesContext);
  const TWELVE = 12;

  useEffect(() => {
    if (!chicken) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setRecipes(data.meals));
    }
  }, []);
  return (
    <>
      <Header title="Foods" sb />
      <GetCategories apiName="themealdb" />
      {recipes.length > 1
        && recipes.map(
          (recipe, index) => index < TWELVE && (
            <Card
              route="foods"
              recipe={ {
                id: index,
                name: recipe.strMeal,
                recipeId: recipe.idMeal,
                image: recipe.strMealThumb,
              } }
              key={ Math.random() }
            />
          ),
        )}
      <Footer />
    </>
  );
}

export default Foods;
