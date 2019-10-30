//default exports. We use them when we want to export one thing from the module. We dont specify any const or variable 
export default 'The thing you want to export';

//to import. Go to the file you want to import something 
import oneName from 'thePathOfTheFiel'
//so we have the value saved to the oneName

//for exporting many things 
//we declare the const or variable 
export const add=(a,b)=>a+b;
export const multiply=(a,b)=>a*b;
export const ID=23; //until now we export 3 things 

//how we import them 
import {add, multiply} from 'path'; //we import only the names we have in the curly 


//thrid way 
//import all and a name. which creates an object
import * as searchView from 'path';
//to use the imported --> searchView.add, searchView.multiply
