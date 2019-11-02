import axios from 'axios';
//API Key: e364306a650d0fd91e1e19ce9fb08aa6
//Query https://www.food2fork.com/api/search
//recipe requests : https://www.food2fork.com/api/get

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
            const key=`e364306a650d0fd91e1e19ce9fb08aa6`;
            const res= await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);

            //save the recipes to the object
            this.result=res.data.recipes;
        }catch(error){
            alert(error);
        }
    }

}