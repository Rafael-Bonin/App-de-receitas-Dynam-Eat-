import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import CardDones from '../components/CardDones';
// type, image, category, name, date, tags, index, alcoholicOrNot
export default function DoneRecipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const { history } = props;
  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes !== null) return setRecipes(doneRecipes);
  }, []);
  useEffect(() => {
    console.log(recipes);
  }, [recipes]);
  return (
    <main className="fav-done-main">
      <Header title="Done Recipes" sb={ false } />
      <div className="menu-fav-done">
        <button
          className="filter-buttons"
          onClick={ () => setTypeFilter('') }
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          className="filter-buttons"
          onClick={ () => setTypeFilter('food') }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          className="filter-buttons"
          onClick={ () => setTypeFilter('drink') }
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </div>
      {recipes.length > 0
        && recipes.filter((receita) => receita.type.includes(typeFilter))
          .map((recipe, index) => (
            <CardDones
              key={ Math.random() }
              type={ recipe.type }
              image={ recipe.image }
              category={ recipe.category }
              name={ recipe.name }
              date={ recipe.doneDate }
              tags={ recipe.tags }
              index={ index }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              nationality={ recipe.nationality }
              id={ recipe.id }
              history={ history }
            />
          ))}
    </main>
  );
}

DoneRecipes.propTypes = {
  history: propTypes.string.isRequired,
};
