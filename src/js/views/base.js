//create an object that will contains all the elements we select from our DOM and then export them
export const elements={
    //selects the form class
    searchForm:document.querySelector('.search'),

    //selects the input from the form (use the .class of the input)
    searchInput:document.querySelector('.search__field'),

    //select the list to render the results
    searchResultList:document.querySelector('.results__list')
}