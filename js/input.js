import * as Api from './api.js'
import {update}  from './app.js'
import * as Utility from './utilities.js'

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const burgerMenu = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');
const priceSelector = document.querySelector(".price-selector");
const bedsSelector = document.querySelector(".beds-selector");
const filtersToggle = document.querySelector(".filters-toggle");

const pricePicker = document.querySelector("#price-picker-container");
const bedsPicker = document.querySelector("#beds-picker-container");
const filtersPicker = document.querySelector("#filter-picker-container");

const minPricePanel = document.querySelector('#min-price-panel');
const maxPricePanel = document.querySelector('#max-price-panel');

const minBedsPanel = document.querySelector('#min-beds-panel');
const maxBedsPanel = document.querySelector('#max-beds-panel');

const minInputPrice = document.querySelector('#min-input-price');
const maxInputPrice = document.querySelector('#max-input-price');

const minInputBeds = document.querySelector('#min-input-beds');
const maxInputBeds = document.querySelector('#max-input-beds');

const doneBtns = document.querySelectorAll('.done-btn');




function turnNextPage(){
    Api.queryParameters.offset  = Utility.clamp(Number.parseInt(Api.queryParameters.offset) + 42,0,1000)
    // console.log(queryParameters.offset)
    update();
}

function turnPreviousPage(){
    Api.queryParameters.offset = Utility.clamp(Number.parseInt(Api.queryParameters.offset) - 42,0,1000)
    // console.log(queryParameters.offset)
    update();
}


// Functions called when an option is chosen from the range panel
function setParameter(event){
    let parameter = event.currentTarget.dataset.param;
    let value = event.currentTarget.dataset.paramValue;

    Api.queryParameters[parameter] = Utility.getValueByParameter(parameter,value);
    update();

}

export function handleOptionClick(event){

    let target = event.currentTarget;
    target.parentElement.classList.add("hide");
    
    let param = target.dataset.param;
    let value = target.dataset.paramValue;

    let elem = document.querySelector(`.${param}_input`);
    elem.textContent = Utility.formatValue(value,param);



    
    setParameter(event)
}

export function handleTopOptionClick(event){

    let target = event.currentTarget;
    target.parentElement.classList.add("hide");

    let param = event.currentTarget.dataset.param;

    
    let elem = document.querySelector(`.${param}_input`);

  

    elem.textContent = elem.dataset.title;

    Api.queryParameters[param] = null;
    update();
}


export function addEventListeners(){
    nextBtn.addEventListener('click',turnNextPage)
    prevBtn.addEventListener('click',turnPreviousPage)
    burgerMenu.addEventListener('click',function(){
        burgerMenu.classList.toggle('active');
        navbar.classList.toggle('active');
    });

   priceSelector.addEventListener('click',() => {
    pricePicker.classList.toggle("hide")
    priceSelector.classList.toggle("selected");
   })

   bedsSelector.addEventListener('click',() => {
    bedsPicker.classList.toggle("hide")
    bedsSelector.classList.toggle("selected");
   })

   filtersToggle.addEventListener('click',() => {
    filtersPicker.classList.toggle("hide")
   })

   minInputPrice.addEventListener('click',()=>{
        minPricePanel.classList.toggle("hide");
   })

   maxInputPrice.addEventListener('click',()=>{
    maxPricePanel.classList.toggle("hide");
})

minInputBeds.addEventListener('click',()=>{
    minBedsPanel.classList.toggle("hide");
})

maxInputBeds.addEventListener('click',()=>{
maxBedsPanel.classList.toggle("hide");
})

doneBtns.forEach((btn) => {
    btn.addEventListener('click',()=>{
        btn.parentElement.classList.add("hide");
    })
    
})




}

