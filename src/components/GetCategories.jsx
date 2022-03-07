import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

export default function GetCategories(props) {
  const { apiName } = props;
  const [categories, setCategories] = useState([]);
  const FIVE = 5;
  useEffect(() => {
    fetch(`https://www.${apiName}.com/api/json/v1/1/list.php?c=list`)
      .then((response) => response.json())
      .then((data) => (apiName === 'themealdb'
        ? setCategories(data.meals)
        : setCategories(data.drinks)));
  }, []);
  return (
    categories.length > 0
    && categories.map(
      (category, index) => index < FIVE && (
        <button
          key={ Math.random() }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ),
    )
  );
}

GetCategories.propTypes = {
  apiName: propTypes.string.isRequired,
};
