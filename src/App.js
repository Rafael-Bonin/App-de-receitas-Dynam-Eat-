import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodIngredients from './pages/FoodIngredients';
import DrinkIngredients from './pages/DrinkIngredients';
import NationalitiesFood from './pages/NationalitiesFood';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import recipesContext from './services/recipesContext';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import InProgressFood from './pages/InProgressFood';
import InProgressDrink from './pages/InProgressDrink';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  return (
    <Switch>
      <recipesContext.Provider value={ { recipes, setRecipes, filter, setFilter } }>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ FoodDetails } />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
        <Route exact path="/foods/:id/in-progress" component={ InProgressFood } />
        <Route exact path="/drinks/:id/in-progress" component={ InProgressDrink } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ FoodIngredients } />
        <Route exact path="/explore/drinks/ingredients" component={ DrinkIngredients } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ NationalitiesFood }
        />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </recipesContext.Provider>
    </Switch>
  );
}

export default App;
