const FetchRandomFood = async () => {
  const getFoods = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const processFoods = await getFoods.json();
  const foods = await processFoods.meals;
  const random = Math.floor(Math.random() * (foods.length - 0) + 0);
  const randomFood = await foods[random];
  return randomFood;
};

export default FetchRandomFood;
