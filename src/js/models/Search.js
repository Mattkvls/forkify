import axios from 'axios';
//import the key
import {key} from '../config';

//describe the data model for the search with Classes
//the data is : query and search results
export default class Search{
    constructor(query){
        this.query=query;
    }
    // async method that gets results for the search query axios http request
    async getResults(){
        try{
            const proxy=`https://cors-anywhere.herokuapp.com/`; //if there is a need for proxy prepend a ${proxy} to the axios link
            const res= await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);

            //save the recipes to the object
            this.result=res.data.recipes;
        }catch(error){
            alert(error);
        }
    }

}