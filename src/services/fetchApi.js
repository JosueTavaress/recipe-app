export const fetchApiIngredient = async (Ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiName = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiLatter = async (latter) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${latter}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApicocktailIngredient = async (IngredientCock) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${IngredientCock}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiCocktailName = async (nameCocktail) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameCocktail}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiLatterCocktail = async (LatterCocktail) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${LatterCocktail}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const getRecipesByCategory = async (categoryName, page) => {
  const url = (page === 'Comidas')
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`;

  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiAllMealsRecipes = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiAllDrinksRecipes = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiMealsCategoriesList = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiDrinksCategoriesList = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiMealsAreaList = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiRecipesByArea = async (area) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiIngredientMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchApiIngredientDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchMealIng = async (strIngredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchDrinkIng = async (strIngredient1) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient1}`;
  const response = await fetch(url).then((res) => res.json());
  return response;
};
