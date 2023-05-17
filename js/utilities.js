import * as Data from './data.js'
import * as Api from './api.js'

export function clamp(num,min,max){
    return Math.min(Math.max(num, min), max);
}

export function getPriceAsString(priceInThousands){
    if(priceInThousands < 1000 ){
        return `€${priceInThousands}k` 
    }

    return `€${priceInThousands/1000}m`;
}

export function formatValue(value,param){
    if(param == "price_min" || param == "price_max"){
        return getPriceAsString(value);
    }
    else if(param == "beds_min" || param == "beds_max"){
        return value;
    }
}

// export function getPrices(prices){
//     return prices.map((price) => getPriceAsString(price))
// }

export function getValueByParameter(parameter,value){
    if(parameter == "price_min" || parameter == "price_max"){
        return Number.parseFloat(value) * 1000;
    }
    else if(parameter == "beds_min" || parameter == "beds_max"){
        return value;
    }
}

export function SwapElements(toHide,toShow){
    if(toHide){
        toHide.classList.add("hide");
    }

    if(toShow){
        toShow.classList.remove("hide");
    }
}

export function createUrl(base,queryParams){
    return base + '?' + new URLSearchParams(queryParams).toString();
}

export function getQueryParametersCopy(){

let parameters = Api.queryParameters;
let newParameters= {};

for(let key in parameters){
    if(key != "offset" && key != "limit" && key != "city" && key != "state_code" && parameters[key] != null){
        newParameters[key] = parameters[key];
    }
}

return newParameters
}


// export async function computeTotalProperties(){
//     let urls = Data.propertiesRequestData.urls;
//     let searchUrl = createUrl(Data.propertyCountUrl,Data.propertySearchQueryParams);
//     // https://us-real-estate.p.rapidapi.com/v2/for-sale-result-count

//     for(let i = 0;i < urls.length;i++){
//         let link = createUrl2()
//     }

//     return 
// }

