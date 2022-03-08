const FetchRandomDrink = async () => {
  const getDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const processDrinks = await getDrinks.json();
  const drinks = await processDrinks.drinks;
  const random = Math.floor(Math.random() * (drinks.length - 0) + 0);
  const randomDrink = await drinks[random];
  return randomDrink;
};

export default FetchRandomDrink;
