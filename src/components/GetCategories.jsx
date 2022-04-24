import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import recipesContext from '../services/recipesContext';
import './GetCategories.css';

export default function GetCategories(props) {
  const { apiName } = props;
  const [categories, setCategories] = useState([]);
  const { setRecipes, filter, setFilter, recipes } = useContext(recipesContext);
  const FIVE = 5;
  const getAll = () => {
    fetch(`https://www.${apiName}.com/api/json/v1/1/search.php?s=`)
      .then((response) => response.json())
      .then((data) => (apiName === 'themealdb'
        ? setRecipes(data.meals)
        : setRecipes(data.drinks)));
    setFilter('');
  };
  useEffect(() => {
    fetch(`https://www.${apiName}.com/api/json/v1/1/list.php?c=list`)
      .then((response) => response.json())
      .then((data) => (apiName === 'themealdb'
        ? setCategories(data.meals)
        : setCategories(data.drinks)));
  }, []);
  useEffect(() => {
    console.log(recipes);
  }, [recipes]);
  return (
    <div className="menu-categories">
      {categories.length > 0
        && categories.map(
          (category, index) => index < FIVE && (
            <button
              className="button-categories"
              onClick={ () => {
                if (category.strCategory === 'Goat') {
                  fetch(
                    `https://www.${apiName}.com/api/json/v1/1/filter.php?c=${category.strCategory}`,
                  )
                    .then((response) => response.json())
                    .then((data) => setRecipes([...data.meals, {}]));
                } else if (category.strCategory !== filter) {
                  fetch(
                    `https://www.${apiName}.com/api/json/v1/1/filter.php?c=${category.strCategory}`,
                  )
                    .then((response) => response.json())
                    .then((data) => (apiName === 'themealdb'
                      ? setRecipes([...data.meals])
                      : setRecipes([...data.drinks])));
                  setFilter(category.strCategory);
                } else {
                  getAll();
                }
              } }
              key={ Math.random() }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          ),
        )}
      <button
        className="button-categories"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => getAll() }
      >
        All
      </button>
    </div>
  );
}

GetCategories.propTypes = {
  apiName: propTypes.string.isRequired,
};
