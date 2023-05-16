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
