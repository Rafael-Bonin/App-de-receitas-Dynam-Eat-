function getIngredients(recipe, TWENTY, param, param2) {
  const array = [];
  if (recipe.length !== 0) {
    for (let i = 1; i <= TWENTY; i += 1) {
      const position = `strIngredient${i.toString()}`;
      if (recipe[position] !== param && recipe[position] !== param2) {
        array.push(recipe[position]);
      }
    }
  }
  return array;
}

export default getIngredients;
