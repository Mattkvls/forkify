import {elements} from './base';

                        //returns the value of the input
export const getInput=()=>elements.searchInput.value

//display the results to the UI. We have the results inside the state object -->its an array at: state.search.results

export const clearResults=()=>{
    elements.searchResultList.innerHTML=''; //remove the HTML CLEARS RESULT LIst
};

export const clearInput=()=>{
    elements.searchInput.value=''; //clears input 
};


//reduce the siza of the titles in the UI default parameter for limit=17
const limitRecipeTitle=(title,limit=17)=>{
    const newTitle=[]; //εδω θα κανουμε save καθε φορα το αρθροισμα των λεξεων του τιτλου εως 17
    if(title.length>limit){
        //split title into its words and use reduse method on the resulting array which allow us to have am accumulator 
        // title.split(' ');//χωριζει το string σε λεξεις σε ενα array
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<=limit){
                newTitle.push(cur);
            }
            return acc+cur.length; //is the new acc. reduce works like this we have to return the new value of acc for each itteration.
        }, 0);

        //return the result 
        return `${newTitle.join(' ')}...`;
    }
    return title;
}




const renderRecipe= recipe=>{//we create the logic for displaying one result seperatly and then pass it in forEach
    const markup=`
    <li>
        <a class="results__link results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    //adds each result after the other on the result list 
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults=(recipes)=>{
    recipes.forEach(renderRecipe);//will automatically call it for each element of the array
};