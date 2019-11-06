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
            console.log(error);
        }
    }
    //assuming that we need 15 min for each 3 ingredients 
    calcTime(){
        const numIng=this.ingredients.length;//ingredients is an array 
        const periods= Math.ceil(numIng/3);
        this.time=periods*15;
    }

    //servings 
    calcServings(){
        this.servings=4;
    }

    parseIngredients(){

        //create two arrays with the units of the ingredients as they appear from the server / other as we want them to appear
        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort=['tbsp','tbsp','oz','oz','tsp','cup','pound'];
        const units=[...unitsShort,'kg','g'];

        //create a new array with the new ingredients based on the old ones
        const newIngredients=this.ingredients.map(el=>{
        //1)uniform units 
            let ingredient=el.toLowerCase();
            unitsLong.forEach((unit,index)=>{
                ingredient=ingredient.replace(unit,unitsShort[index]);
            });

        //2)remove parenthesis 
        ingredient=ingredient.replace(/ *\([^)]*\) */g, ' '); //this is a regular expression
        
        //3)parse ingredients into count, unit, ingredient 
            // first test if there is a unit in the string. If there is where is located
            //convert each ingredient into an array (it is a string)
            const arrIng= ingredient.split(' '); //wherever we have a space will be split and each word will become element to the array

            //find where the unit is located. (find the position of the unit BUT we dont know what the unit is..). will return the index of the position the test is true 
            const unitIndex= arrIng.findIndex(el2=>units.includes(el2)); //returns true if the elemet exists in the array and false if tis not. will check the elements of the array 
            
            let objIng;
            if(unitIndex>-1){
                //there is a unit 
                //we assume everything that comes after a number is the unit 
                const arrCount=arrIng.slice(0, unitIndex); //is the number infront of the units

                //we have 2 cases
                //EX 4 1/2 CUPS, ARRCOUNT IS [4,1/2]
                //EX 4 CUPS, ARRCOUNT IS [4]
                let count;
                if(arrCount.length===1){
                    count=arrIng[0].replace('-','+');
                }else{
                   //in case we have 4 1/2 
                    //we will join those string [4, 1/2] 
                    count=eval(arrIng.slice(0,unitIndex).join('+')); //will make a string "4+1/2" then the eval will make it a number 4.5
                    objIng={
                        count: count,
                        unit: arrIng[unitIndex],
                        ingredient: arrIng.slice(unitIndex+1).join(' ')
                    }
                }
            }else if(parseInt(arrIng[0],10)){
                //there is no unit, but 1st element is a number
                objIng={
                    count:(parseInt(arrIng[0],10)),
                    unit:'',
                    ingredient:arrIng.slice(1).join(' ') //we use the join to put the array together again to a string 
                }
            }else if(unitIndex===-1){
                //there is NO unit and no mumber in 1st position
                objIng={
                    count:1,
                    unit:'',
                    ingredient:ingredient
                }
            }
        return objIng;//ingredients is an array of objects 
        });
        this.ingredients=newIngredients;
    }
}

