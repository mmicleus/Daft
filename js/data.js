import * as Api from './api.js' 
import { createUrl,getQueryParametersCopy } from './utilities.js';
import * as View from './view.js'
import * as Utility from './utilities.js'
import { update } from './app.js';

export let prices = [
    25,
    50,
    75,
    100,
    125,
    150,
    175,
    200,
    225,
    250,
    275,
    300,
    325,
    350,
    375,
    400,
    425,
    450,
    475,
    500,
    525,
    550,
    575,
    600,
    625,
    650,
    675,
    700,
    725,
    750,
    775,
    800,
    825,
    850,
    875,
    900,
    925,
    950,
    975,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
    5500
]

export let beds = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15
]

export const suggestionQueryParams = {input:null};
export const propertySearchQueryParams = {
    city:null,
    state_code:null
}

export const propertiesRequestData = {
    // params : Api.queryParameters,
    urlsMap : new Map(),
    locations:[],
    total:0,
    currentIndex:0,
    currentOffset:0
}

export let suggestionUrl = 'https://us-real-estate.p.rapidapi.com/location/suggest';
export let propertySearchUrl = 'https://us-real-estate.p.rapidapi.com/v2/for-sale';
export let propertyCountUrl = 'https://us-real-estate.p.rapidapi.com/v2/for-sale-result-count';



export async function addLocationToMap(slugId,{city,state_code}){
    let length = await computeTotal(city,state_code);

    console.log("length:" + length);

    propertiesRequestData.urlsMap.set(slugId,{location:{city:city,state_code:state_code},length:length});
    propertiesRequestData.total += length;
    View.displayTotalProperties(propertiesRequestData.total);

    onUrlMapUpdated();

    console.log(propertiesRequestData);
}

async function computeTotal(city,state_code){

    let queryParameters = getQueryParametersCopy();
    queryParameters.state_code = state_code;
    queryParameters.city = city;
    let url = createUrl(propertyCountUrl,queryParameters);

    // console.log("Url:" + url);

    let count =  await Api.getNrOfProperties(url);

    return count;
    // let url = propertyCountUrl + '?' 
}

export function removeLocationFromMap(slugId){
    let length = propertiesRequestData.urlsMap.get(slugId).length;

    propertiesRequestData.urlsMap.delete(slugId);
    propertiesRequestData.total -= length;
    View.displayTotalProperties(propertiesRequestData.total);

    onUrlMapUpdated();
}

function onUrlMapUpdated(){
    propertiesRequestData.locations = Array.from(propertiesRequestData.urlsMap.values());
    propertiesRequestData.currentIndex = 0;

    propertiesRequestData.currentOffset = 0;

    console.log(propertiesRequestData);
    // propertiesRequestData.total = Utility.computeTotalProperties();
}

function completeParams(params){
    let parameters = Api.queryParameters;

for(let key in parameters){
    if(key != "offset" && key != "limit" && key != "city" && key != "state_code" && parameters[key] != null){
        params[key] = parameters[key];
    }
}
}

export function getPropertyQueryParams(){

    // let paramsAux = Utility.getQueryParametersCopy();
    let params={};
    params.offset = propertiesRequestData.currentOffset;
    params.limit = 42;
    params.state_code = propertiesRequestData.locations[propertiesRequestData.currentIndex].location.state_code;
    params.city = propertiesRequestData.locations[propertiesRequestData.currentIndex].location.city;

    completeParams(params);
    
    return params;
}

export function nextPageBtnPressed(){
    let currentIndex = propertiesRequestData.currentIndex;
    let currentLength = propertiesRequestData.locations[currentIndex].length;

    

    if((propertiesRequestData.currentOffset + 42) >= currentLength){
        propertiesRequestData.currentIndex++;
        propertiesRequestData.currentOffset = 0;
    }else{
        propertiesRequestData.currentOffset += 42;
    }

}

export function previousPageBtnPressed(){
    let currentIndex = propertiesRequestData.currentIndex;
    let currenLength = propertiesRequestData.locations[currentIndex].length;

    

    if((propertiesRequestData.currentOffset - 42) < 0){
        propertiesRequestData.currentIndex--;
        propertiesRequestData.currentOffset = 0;
    }else{
        propertiesRequestData.currentOffset -= 42;
    }
}
