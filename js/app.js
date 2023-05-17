import * as Api from "./api.js";
import * as View from './view.js';
import * as Input from './input.js';



// let offset = 0;
// let housesForSaleRequest = 'https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=42&limit=42&state_code=MI&city=Detroit&sort=newest';







export async function update(){
    let properties = await Api.getProperties();
    View.refreshView(properties);
}

Input.addEventListeners();
// update();




