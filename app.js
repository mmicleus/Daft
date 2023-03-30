const burgerMenu = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');

burgerMenu.addEventListener('click',function(){
    burgerMenu.classList.toggle('active');
    navbar.classList.toggle('active');
});