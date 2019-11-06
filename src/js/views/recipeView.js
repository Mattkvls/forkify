import {elements} from './base';
import {Fraction} from 'fractional';
//create a functon to clear the previous recipe
export const clearRecipe=()=>{
    elements.recipe.innerHTML='';
}

//make the numbers fractions again with the help of Fraction npm package
const formatCount=count=>{
    if(count){
        //we have two cases count=2.5 -->2 1/2 . count=0.5 --> 1/2
        // we do destructuring assignment to and save to int , dec 
        //first we do the count-->string->then do it array by splitting it by .->do new array and do them numbers by the base of 10
        const[int,dec]=count.toString().split('.').map(el=>parseInt(el,10));

        if(!dec) return count;

        if(int===0){
            //use a npm package Fractional
            const fr=new Fraction(count);
            return `${fr.numerator}/${denominator}`
        }else{
            const fr=new Fraction(count-int);
            return `${int} ${fr.numerator}/${fr.denominator}`
        }
    }
    return '?';
}


//create the ingredient to put into the map as callback
const createIngredient=ingredient=>
    //will take an ingredient and make the proper mark up
    `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
    `


/*we dont know how many ingredients we will have so we will loop through them and call the render function we will make. inside the template string we can have variables but also function expressions at line 102*/

//will loop over them and create a new array of ingredients that have passed throught the function we made and call. THE createIngredient will return a string with the markup => then we make the array of strings on string with join 


export const renderRecipe=recipe=>{
    const markup=`
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="${recipe.title}">
                <span>Pasta with tomato cream sauce</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">45</span>
                <span class="recipe__info-text"> ${recipe.time}</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(el=>createIngredient(el)).join('')}
            </ul>
            <button class="btn-small recipe__btn">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `
//render it in the recipe in the html
elements.recipe.insertAdjacentHTML('afterbegin', markup);
}