// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

/*Global state of the app
-Search object (search query & search result)
-current recipe object 
- shopping list object
-liked recipes
*/
const state={}; //each time we reload the app the state will be empty

//create a function to put the logic and call it inside the eventlistener. This will control the search 
const controlSearch= async ()=>{
    //1)get query from the view . This(is job of the View make a function there call it here)
    const query=searchView.getInput();

    //if we have a query we need to create a search object (which was defined in the models)
    if(query){
        //2) create new search object and add it to state 
        state.search= new Search(query);

        // 3) prepeare UI for results (clear previous results or show a load spinner) these will be functions to the searchView and call them here 
        searchView.clearInput();
        searchView.clearResults();

        //4) search for recipes. We use the method from the Search models
       await state.search.getResults();//returns a promise

        // 5) render results (display the results )in UI (THIS ONLY TO HAPPEN AFTER WE RECEIVE RESULTS FROM API )
        searchView.renderResults(state.search.result);
    }
}

//select and listen for submits from the form 
elements.searchForm.addEventListener('submit',e=>{
e.preventDefault();//stop the form reloads when submits
controlSearch();//will be called when the form is submitted
})




