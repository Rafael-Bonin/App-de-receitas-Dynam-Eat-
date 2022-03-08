function getIngredients(recipe, TWENTY, setIngredients, param) {
  if (recipe.length !== 0) {
    for (let i = 1; i <= TWENTY; i += 1) {
      const position = `strIngredient${i.toString()}`;
      if (recipe[position] !== param) {
        const positionMeasure = `strMeasure${i}`;
        setIngredients((ingredient) => [
          ...ingredient,
          { name: recipe[position], measure: recipe[positionMeasure] },
        ]);
      }
    }
  }
}

export default getIngredients;
