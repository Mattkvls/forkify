// Global app controller
import axios from 'axios';
//API Key: e364306a650d0fd91e1e19ce9fb08aa6
//Query https://www.food2fork.com/api/search
//recipe requests : https://www.food2fork.com/api/get

async function getResults(query){
    
    try{
        //instead of using fetch which is not supported by all browsers
    //we install axios npm package
    const proxy=`https://cors-anywhere.herokuapp.com/`; //if there is a need for proxy prepend a ${proxy} to the axios link
    const key=`e364306a650d0fd91e1e19ce9fb08aa6`;
    const res= await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes=res.recipes;
   console.log(res);
    //will return a promise
    }catch(error){
        alert(error);
    }
}
getResults('pizza');