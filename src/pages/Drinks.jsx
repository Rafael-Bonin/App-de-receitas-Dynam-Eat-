import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../services/recipesContext';
import Card from '../components/Card';

function Drinks() {
  const { recipes } = useContext(recipesContext);
  const TWELVE = 12;
  return (
    <div>
      <Header title="Drinks" sb />
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
