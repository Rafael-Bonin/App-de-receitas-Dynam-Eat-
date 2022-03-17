import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import recipesContext from '../services/recipesContext';

export default function SearchBar(props) {
  const [radio, setRadio] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { setRecipes, recipes } = useContext(recipesContext);
  const { title } = props;
  const erro = 'Sorry, we haven\'t found any recipes for these filters.';

  function updateRecipes(data, kind, render) {
    return data[kind] !== null
      ? render(data)
      : global.alert(erro);
  }

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);
  return (
    <div className="searchBar-div">
      <div className="searchBar">
        <input
          type="text"
          data-testid="search-input"
          value={ searchInput }
          placeholder="Procurar receitas"
          onChange={ (e) => setSearchInput(e.target.value) }
        />
      </div>
      <ul className="searchBar-radios">
        <li>
          Nome
          <input
            onClick={ () => setRadio('ingredient') }
            type="radio"
            data-testid="ingredient-search-radio"
          />
        </li>
        <li>
          Ingrediente
          <input
            onClick={ () => setRadio('name') }
            type="radio"
            data-testid="name-search-radio"
          />
        </li>
        <li>
          Primeira letra
          <input
            onClick={ () => setRadio('first_letter') }
            type="radio"
            data-testid="first-letter-search-radio"
          />
        </li>
      </ul>
      <button
        onClick={ () => {
          const apiName = title === 'Foods' ? 'themealdb' : 'thecocktaildb';
          const kind = title === 'Foods' ? 'meals' : 'drinks';
          const render = (data) => (title === 'Foods'
            ? setRecipes(data.meals)
            : setRecipes(data.drinks));
          switch (radio) {
          case 'ingredient':
            return fetch(
              `https://www.${apiName}.com/api/json/v1/1/filter.php?i=${searchInput}`,
            )
              .then((response) => response.json())
              .then((data) => updateRecipes(data, kind, render));
          case 'name':
            return fetch(
              `https://www.${apiName}.com/api/json/v1/1/search.php?s=${searchInput}`,
            )
              .then((response) => response.json())
              .then((data) => updateRecipes(data, kind, render));
          case 'first_letter':
            if (searchInput.length === 1) {
              return fetch(
                `https://www.${apiName}.com/api/json/v1/1/search.php?f=${searchInput}`,
              )
                .then((response) => response.json())
                .then((data) => updateRecipes(data, kind, render));
            }
            global.alert('Your search must have only 1 (one) character');
            break;
          default:
            console.log('default');
          }
        } }
        type="button"
        className="searchBar-btn"
        data-testid="exec-search-btn"
      >
        Search
      </button>
      {recipes.length === 1 && title === 'Foods' && (
        <Redirect to={ `/foods/${recipes[0].idMeal}` } />
      )}
      {recipes.length === 1 && title === 'Drinks' && (
        <Redirect to={ `/drinks/${recipes[0].idDrink}` } />
      )}
    </div>
  );
}

SearchBar.propTypes = {
  title: propTypes.string.isRequired,
};
