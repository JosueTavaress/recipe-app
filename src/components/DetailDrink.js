import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useParams, useHistory } from 'react-router-dom';
import { detailDrink } from '../services/DetailFecht';
import { recommendedMeal } from '../services/recommendedFech';
import CarrouselRender from './Carousel';
import '../Style/Btn-Recipe.css';
import BtnFavorite from './BtnFavorite';
import { GetLocalStorage } from '../services/LocalStorageUser';

function DetailDrink() {
  const [btnDrink, setBtnDrink] = useState('Iniciar receita');
  const [btnCompartilhar, setBtnCompartilhar] = useState('compartilhar');
  const [drink, setDrink] = useState({});
  const [recommended, setRecommended] = useState([]);
  const { idDrink } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setDrink(await detailDrink(idDrink));
      setRecommended(await recommendedMeal());
    };
    fetch();
  }, [idDrink]);

  useEffect(() => {
    const initial = !localStorage.getItem('inProgressRecipes');
    const checkStorage = () => {
      if (initial) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: {},
          meals: {},
        }));
      }
    };

    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    checkStorage();
  }, []);

  useEffect(() => {
    const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const exist = Object.keys(cocktails).some((el) => el === idDrink);
    if (exist) setBtnDrink('Continuar Receita');
  }, [idDrink]);

  const history = useHistory();

  const sliceItens = 6;

  const StartRecipe = () => {
    history.push(`/bebidas/${idDrink}/in-progress`);
  };

  const clipboard = () => {
    const urlRecommendation = window.location.href;
    copy(urlRecommendation);
    setBtnCompartilhar('Link copiado!');
  };

  const listIngredients = Object.keys(drink)
    .filter((item) => item.match(/strIngredient\d{1,2}/));

  const listChaves = listIngredients.filter((item) => drink[item] !== null);

  const listMeasure = Object.keys(drink)
    .filter((item) => item.match(/strMeasure\d{1,2}/));

  const listChavesMesure = listMeasure
    .filter((item) => drink[item] !== null && drink[item] !== '');

  const returnIngredien = (ingredient, i) => (
    <p
      data-testid={ `${i}-ingredient-name-and-measure` }
      key={ i }
    >
      { `${drink[ingredient]} - ${drink[listChavesMesure[i]]}` }
    </p>
  );

  if (drink.idDrink) {
    const recommendR = recommended.meals ? recommended.meals.slice(0, sliceItens) : null;
    const recipesFavorites = GetLocalStorage('favoriteRecipes');
    const existFavorite = recipesFavorites.some((el) => el.id === drink.idDrink);
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt="img food"
        />
        <p data-testid="recipe-title">{ drink.strDrink }</p>
        <button
          onClick={ () => clipboard() }
          type="button"
          data-testid="share-btn"
        >
          { btnCompartilhar }
        </button>
        <BtnFavorite
          existFavorite={ existFavorite }
          image={ drink.strDrinkThumb }
          name={ drink.strDrink }
          drink={ drink }
          id="idDrink"
          type="bebida"
        />
        <h3 data-testid="recipe-category">{ drink.strCategory }</h3>
        <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
        <h3 data-testid="recipe-category">Ingredientes</h3>
        { listChaves.map((ingredient, i) => returnIngredien(ingredient, i)) }
        <p data-testid="instructions">{ drink.strInstructions }</p>
        {recommended.meals ? <CarrouselRender recommendR={ recommendR } /> : null }
        <button
          onClick={ () => StartRecipe() }
          className="iniciar-Recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          { btnDrink }

        </button>
      </>
    );
  }
  return (
    <p>carregando</p>
  );
}

export default DetailDrink;
