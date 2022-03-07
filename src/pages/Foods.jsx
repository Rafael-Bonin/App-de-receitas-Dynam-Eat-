import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import GetCategories from '../components/GetCategories';
import Header from '../components/Header';
import recipesContext from '../services/recipesContext';

function Foods() {
  const { recipes, setRecipes } = useContext(recipesContext);
  const TWELVE = 12;

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecipes(data.meals));
  }, []);
  return (
    <>
      <Header title="Foods" sb={ 1 } />
      <GetCategories apiName="themealdb" />
      {recipes.length > 1
        && recipes.map(
          (recipe, index) => index < TWELVE && (
            <Card
              recipe={ {
                id: index,
                name: recipe.strMeal,
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
