import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detailMeal } from '../../services/DetailFecht';

function ProgressMealsRecipes() {
  const [meal, setRecipe] = useState({});
  const [UsedIngredients, setUsedIngredients] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setRecipe(await detailMeal(id));
    };
    fetch();
    const recipesInProgress = localStorage.getItem('inProgressRecipes');
    if (!recipesInProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!meals[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...JSON.parse(recipesInProgress),
        meals: {
          ...meals,
          [id]: [],
        },
      }));
    } else {
      setUsedIngredients(meals[id]);
    }
  }, [id]);

  const listIngredients = Object.keys(meal)
    .filter((item) => item.match(/strIngredient\d{1,2}/));

  const listChaves = listIngredients
    .filter((item) => meal[item] !== null && meal[item] !== '');

  const listMeasure = Object.keys(meal)
    .filter((item) => item.match(/strMeasure\d{1,2}/));

  const listChavesMesure = listMeasure
    .filter((item) => meal[item] !== null && meal[item] !== '');

  const returnIngredien = (ingredient, i) => (
    <p
      data-testid={ `${i}-ingredient-step` }
      key={ i }
      style={ UsedIngredients.includes(meal[ingredient])
        ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
        : { textDecoration: '' } }
    >
      <input
        type="checkbox"
        checked={ UsedIngredients.includes(meal[ingredient]) }
        onChange={ () => {
          const recipesInProgress = localStorage.getItem('inProgressRecipes');
          const { meals } = JSON.parse(recipesInProgress);
          if (!UsedIngredients.includes(meal[ingredient])) {
            localStorage.setItem('inProgressRecipes', JSON.stringify({
              ...JSON.parse(recipesInProgress),
              meals: {
                ...meals,
                [id]: [...UsedIngredients, meal[ingredient]],
              },
            }));
            setUsedIngredients([...UsedIngredients, meal[ingredient]]);
          } else {
            localStorage.setItem('inProgressRecipes', JSON.stringify({
              ...JSON.parse(recipesInProgress),
              meals: {
                ...meals,
                [id]: [...UsedIngredients
                  .filter((item) => item !== meal[ingredient])],
              },
            }));
            setUsedIngredients([...UsedIngredients
              .filter((item) => item !== meal[ingredient])]);
          }
        } }
      />
      { `${meal[ingredient]} - ${meal[listChavesMesure[i]]}` }
    </p>
  );

  if (meal.idMeal) {
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt="img food"
        />
        <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <h3 data-testid="recipe-category">{ meal.strCategory }</h3>
        <h3>Ingredientes</h3>
        { listChaves.map((ingredient, i) => returnIngredien(ingredient, i)) }
        <p data-testid="instructions">{ meal.strInstructions }</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </>
    );
  }
  return (
    <p>carregando</p>
  );
}

export default ProgressMealsRecipes;
