// Global app controller
import Search from './models/Search'
import { getPriority } from 'os';

const search= new Search('pizza'); //we create an object for one Search
console.log(search);
search.getResults();
//both the query and results are saved in the search object
