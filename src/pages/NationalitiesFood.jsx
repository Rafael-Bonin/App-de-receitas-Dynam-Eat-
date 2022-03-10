import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../services/recipesContext';
import Card from '../components/Card';

export default function NationalitiesFood() {
  const [nationalities, setNationalities] = useState([]);
  const { recipes, setRecipes } = useContext(recipesContext);
  const [refresh, setRefresh] = useState(false);
  const [nation2, setNation] = useState('All');
  const TWELVE = 12;
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecipes(data.meals));
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((data) => setNationalities(data.meals));
  }, []);
  useEffect(() => {
    console.log('refresh');
  }, [refresh]);
  return (
    <>
      <Header title="Explore Nationalities" sb />
      <select
        value={ nation2 }
        data-testid="explore-by-nationality-dropdown"
        onChange={ async (e) => {
          setNation(e.target.value);
          if (e.target.value !== 'All') {
            await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${e.target.value}`,
            )
              .then((response) => response.json())
              .then((data) => setRecipes(data.meals));
            setRefresh(!refresh);
          } else {
            await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
              .then((response) => response.json())
              .then((data) => setRecipes(data.meals));
            setRefresh(!refresh);
          }
        } }
      >
        <option data-testid="All-option">All</option>
        {nationalities.map((nation) => (
          <option data-testid={ `${nation.strArea}-option` } key={ Math.random() }>
            {nation.strArea}
          </option>
        ))}
      </select>
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
