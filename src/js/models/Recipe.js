//use the axios for the AJAX CALL 
//use a class for the recipe --> to hold all the data for a recipe object 
import axios from 'axios';

//import the key 
import {key} from '../config';

export default class Recipe{
    constructor(id){
       this.id=id; 
    }
// the method that will get the recipe from the server
    async getRecipe(){
        try{
            const res=await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`)
            console.log(res);
            this.title=res.data.recipe.title;
            this.author=res.data.recipe.publisher;
            this.img=res.data.recipe.image_url;
            this.url=res.data.recipe.source_url;
            this.ingredients=res.data.recipe.ingredients;
        }catch(error){
            console.log(error)
        }
    }
    //assuming that we need 15 min for each 3 ingredients 
    calcTime(){
        const numIng=this.ingredients.length;//ingredients is an array 
        const preriods= Math.ceil(numIng/3);
        this.time=periods*15;
    }

    //servings 
    calcServings(){
        this.servings=4;
    }
}