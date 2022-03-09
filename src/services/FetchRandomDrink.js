const FetchRandomDrink = async () => {
  const getDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const processDrinks = await getDrinks.json();
  const drinks = await processDrinks.drinks[0];
  return drinks;
};

export default FetchRandomDrink;
