import React, { useContext } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../services/recipesContext';

function Foods() {
  const { recipes } = useContext(recipesContext);
  return (
    <>
      <Header title="Foods" sb={ 1 } />
      {recipes.length > 1
        && recipes.map((recipe, index) => (
          <Card
            recipe={ { id: index,
              name: recipe.strMeal,
              image: recipe.strMealThumb } }
            key={ Math.random() }
          />
        ))}
      <Footer />
    </>
  );
}

export default Foods;
