import * as Api from './api.js'
import * as Data from './data.js'
import * as Utility from './utilities.js'
import * as App from './app.js'
import * as Input from "./input.js"

const houseContainer = document.querySelector('.houses-container');

const minPricePanel = document.querySelector('#min-price-panel');
const maxPricePanel = document.querySelector('#max-price-panel');

const minBedsPanel = document.querySelector('#min-beds-panel');
const maxBedsPanel = document.querySelector('#max-beds-panel');

const totalPropertiesDisplay = document.querySelector('.totalPropertiesDisplay');

function renderHouse({imgSrc,streetAddress,state,city,price,bedrooms,bathrooms,livingArea}){

    let houseCard = document.createElement('div');
    houseCard.classList.add('large-card');

    

    const imgGrid = document.createElement('div');
    imgGrid.classList.add('img-grid')

    const img1 = document.createElement('div');
    img1.classList.add('lg-picture')
    img1.style=`background-image: url("${imgSrc}")`
    imgGrid.appendChild(img1)

    const img2 = document.createElement('div');
    img2.classList.add('sm-picture')
    img2.style=`background-image: url("${imgSrc}")`
    imgGrid.appendChild(img2)

    const img3 = document.createElement('div');
    img3.classList.add('sm-picture')
    img3.style=`background-image: url("${imgSrc}")`
    imgGrid.appendChild(img3)


    const img4 = document.createElement('div');
    img4.classList.add('sm-picture')
    img4.style=`background-image: url("${imgSrc}")`
    imgGrid.appendChild(img4)

    houseCard.appendChild(imgGrid);


    const footer = document.createElement('div');
    footer.classList.add('lg-card-footer');

    footer.innerHTML = `<div class="adv-checkmark">
    <img src="Images/LargeCard/checkmark.svg" alt="">
    <span>Advantage</span>
</div>
<span class="house-location">
    ${streetAddress} ${state} ${city}
</span>
<span class="house-price">$${price}</span>
<div class="flex-container">
    <span class="house-desc">${bedrooms} Bed • ${bathrooms} Bath • ${livingArea} m<sup>2</sup></span><img class="energy-rating-logo" src="Images/LargeCard/C1.svg" alt="">
</div> 
<div class="card-footer">
    <a href="#" class="virtualTour-btn">Virtual Tour</a> 
    <img src="Images/heart.svg" alt="" class="card-heart">
</div>`;

    houseCard.appendChild(footer);

    houseContainer.appendChild(houseCard)
}

export function renderProperties(properties){

    houseContainer.innerHTML="";
    properties.forEach((prop) =>{

        if(!prop.primary_photo) return;

        const houseData = {
            imgSrc : prop.primary_photo.href,
            streetAddress : prop.location.address.line,
            state : prop.location.address.state_code,
            city : prop.location.address.city,
            price : prop.list_price,
            bedrooms : prop.description.beds,
            bathrooms : prop.description.baths,
            livingArea : prop.description.sqft
        }
        renderHouse(houseData)
    })
}

export function addLocationCard(slugId){
    let elem = document.createElement('div');
    elem.classList.add('location-card');
    elem.innerHTML = `<span>${slugId}</span>`;
    elem.dataset.slugId = slugId;
    elem.addEventListener('click',Input.locationCardPressed)

    document.querySelector('.location-cards-container').append(elem);
}

function updatePageIndexes(){
    // console.log(jsonResponse);
    let count = Number.parseInt(Api.jsonResponse.data.home_search.count);
    let totalProperties = Number.parseInt(Api.jsonResponse.data.home_search.total);
    let startIndex = Number.parseInt(Api.queryParameters.offset) + 1;
    let offset = Number.parseInt(Api.queryParameters.offset);
    let page = offset / 42 + 1;
    
    let endIndex = startIndex + count;



    const startIndexDisplay = document.querySelector('.start-index')
    const lastIndexDisplay = document.querySelector('.last-index')
    const totalPropertiesDisplay = document.querySelector('.total-properties')
    const middleBtn = document.querySelector('#middle-btn');

    startIndexDisplay.textContent = startIndex;
    lastIndexDisplay.textContent = endIndex;
    totalPropertiesDisplay.textContent = totalProperties;
    middleBtn.textContent = page;
}

export function refreshView(properties){
    renderProperties(properties);
    updatePageIndexes();

}

export function displayTotalProperties(total){
    totalPropertiesDisplay.textContent = total;
}

function generateBtn(loc){
    let elem = document.createElement('div');

    elem.classList.add('suggestion');
    elem.innerHTML = `<span>${loc.slug_id}</span> <i class="fa-solid fa-plus"></i>`;
    elem.dataset.slugId = loc.slug_id;
    elem.dataset.city = loc.city;
    elem.dataset.state_code = loc.state_code;
    elem.addEventListener('click',Input.handleLocationBtnClick);

    return elem;
}


function renderOptions(container,list,keyword,param){
    let option = document.createElement('div');
    option.classList.add('panel-option');
    option.classList.add('pointer');
    option.dataset.param = param;
    option.innerHTML = `<span>${keyword}</span><i class="fa-regular fa-circle-dot radio-btn"></i>`;

    option.addEventListener('click',Input.handleTopOptionClick);

    // minPricePanel.appendChild(option);
    container.appendChild(option);


    list.forEach((value)=>{
        let option = document.createElement('div');
        option.classList.add("panel-option");
        option.classList.add('pointer');
        option.dataset.param = param;
        option.dataset.paramValue = value;

        // option.innerHTML = `<span>${Utility.getPriceAsString(value)}</span><i class="fa-regular fa-circle-dot radio-btn"></i>`;
        option.innerHTML = `<span>${Utility.formatValue(value,param)}</span><i class="fa-regular fa-circle-dot radio-btn"></i>`;

        option.addEventListener('click',Input.handleOptionClick)

        container.appendChild(option);
    })

}

export async function generateSuggestionsDropdown(event){
    const suggestionsContainer = document.querySelector(".suggestions-list");
    let value = event.currentTarget.value;
    Data.suggestionQueryParams.input = value;

    let url = Utility.createUrl(Data.suggestionUrl,Data.suggestionQueryParams);
    let suggestedLocations = await Api.getSuggestions(url);

    
    suggestionsContainer.innerHTML="";

    suggestedLocations.forEach((loc) => {
        let locationBtn = generateBtn(loc);

        suggestionsContainer.appendChild(locationBtn);
    })

}   



function onStart(){
    renderOptions(minPricePanel,Data.prices,'Min',"price_min");
    renderOptions(maxPricePanel,Data.prices,'Max',"price_max");

    renderOptions(minBedsPanel,Data.beds,'Min',"beds_min");
    renderOptions(maxBedsPanel,Data.beds,'Max',"beds_max");
}

setTimeout(()=>{onStart()},1000);