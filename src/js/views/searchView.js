import {elements} from './base';

                        //returns the value of the input
export const getInput=()=>elements.searchInput.value

//display the results to the UI. We have the results inside the state object -->its an array at: state.search.results

export const clearResults=()=>{
    elements.searchResultList.innerHTML=''; //remove the HTML CLEARS RESULT LIst

    //clear buttons remove the previous buttons 
    elements.searchResPages.innerHTML='';
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

//create the markup for the buttons. TYpe: prev or next
const createButton=(page,type)=>`
    <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
        <span>Page ${type==='prev'?page-1:page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
        </svg>
    </button>
`;







//render the pagination buttons
const renderButtons=(page, numResults, resPerPage)=>{
    /*first page --> only next 
    last page--> only back 
    other pages --> both next and back */ 

    //need to know on which page we are 
    //how many pages there are 
    const pages=Math.ceil(numResults/resPerPage);
    let button;
    if(page===1 &&pages>1){
        //button for next page
      button= createButton(page,'next');
    }else if(page<pages){
        //both buttons
        button=`${createButton(page,'prev')}${createButton(page,'next')}`;
    }else if(page===pages&& pages>1){
        //button for previous pages
      button= createButton(page,'prev')
    }

    //insert to the DOM
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}





export const renderResults=(recipes,page=1,resPerPage=10)=>{
    //to use them to slice the array with 30 results
    const start=(page-1)*resPerPage; //index of the array
    const end=page*resPerPage;

    recipes.slice(start,end).forEach(renderRecipe);//will automatically call it for each element of the array
    //render the pagination butons
    renderButtons(page,recipes.length,resPerPage);
};