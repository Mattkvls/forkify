// Global app controller
import Search from './models/Search';

/*Global state of the app
-Search object 
-current recipe object 
- shopping list object
-liked recipes
*/
const state={}; //each time we reload the app the state will be empty

//create a function to put the logic and call it inside the event listener
const controlSearch= async ()=>{
    //1)get query from the view 
    const query='pizza'; //we hardcode it for now ->make a function at views to get it 

    if(query){
        //2) create new search object and add it to state 
        state.search= new Search(query);

        // 3) prepeare UI for results 

        //4) search for recipes 
       await state.search.getResults();//returns a promise

        // 5) render results in UI (THIS HAPPENS AFTER WE RECEIVE RESULTS FROM API )
        console.log(state.search.result);
    }
}

//select and listen for submits from the form 
document.querySelector('.search').addEventListener('submit',e=>{
//stop the form reloads when submits
e.preventDefault();
controlSearch();
})




