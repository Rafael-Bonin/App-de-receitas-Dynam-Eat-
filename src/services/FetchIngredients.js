const FetchIngredients = async () => {
  const getIngredients = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const processIngredients = await getIngredients.json();
  const ingredients = await processIngredients.meals;
  return ingredients;
};

export default FetchIngredients;
