//create an object that will contains all the elements we select from our DOM and then export them
export const elements={
    //selects the form class
    searchForm:document.querySelector('.search'),

    //selects the input from the form (use the .class of the input)
    searchInput:document.querySelector('.search__field'),

    //select the list to render the results
    searchResultList:document.querySelector('.results__list'),

    //selects the parent element of the left list for the loader spinner 
    searchRes:document.querySelector('.results'),

    //selects the point we will insert the pagination
    searchResPages:document.querySelector('.results__pages')
}









export const elementStrings={
    loader:'loader'
};





//create the AJAX LOADER SPINNER 
export const renderLoader=parent=>{
    const loader=`
        <div class='${elementStrings.loader}'>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `
    //we attach it to the parent
    parent.insertAdjacentHTML('afterbegin',loader);
}




//clear the loader after the results displayed 
export const clearLoader=()=>{
    /*we can NOT select the loader because it shows up after the call to server. So we can not select something  */
    const loader=document.querySelector(`.${elementStrings.loader}`);
    if(loader){

        //delete an html element
        loader.parentElement.removeChild(loader);
    }
}