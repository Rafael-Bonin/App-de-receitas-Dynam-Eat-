const FetchRandomFood = async () => {
  const getFoods = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const processFoods = await getFoods.json();
  const foods = await processFoods.meals[0];
  return foods;
};

export default FetchRandomFood;
