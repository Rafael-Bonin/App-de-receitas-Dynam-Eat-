import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import CardFavorites from '../components/CardFavorites';

export default function FavoriteRecipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [refresh, setRefresh] = useState(false);
  const { history } = props;
  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (doneRecipes !== null) return setRecipes(doneRecipes);
  }, []);
  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (doneRecipes !== null) return setRecipes(doneRecipes);
  }, [refresh]);
  return (
    <main className="fav-done-main">
      <Header title="Favorite Recipes" sb={ false } />
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
        && recipes
          .filter((receita) => receita.type.includes(typeFilter))
          .map((recipe, index) => (
            <CardFavorites
              key={ Math.random() }
              type={ recipe.type }
              image={ recipe.image }
              category={ recipe.category }
              name={ recipe.name }
              index={ index }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              nationality={ recipe.nationality }
              id={ recipe.id }
              history={ history }
              refresh={ refresh }
              setRefresh={ setRefresh }
            />
          ))}
    </main>
  );
}

FavoriteRecipes.propTypes = {
  history: propTypes.string.isRequired,
};
