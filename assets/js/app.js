// variables
const listaTweets = document.getElementById('lista-tweets');

//event listeners

eventListeners();

function eventListeners() {
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', 
    agregarTweet);
    
    // borrar tweets
    listaTweets.addEventListener('click', borrarTweet)
    // DOM contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//Funciones 

//añadir tweet del formulario (barrita)

function agregarTweet(e){
    e.preventDefault(); 
    // leer el valor del textarea   
    const tweet = document.getElementById("tweet").value;


    // crear boton de borrar 
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //crear elemento y añadir el contenido a la lista 
    const li = document.createElement("li");
    li.innerText = tweet;
    //añade el boton de borrar al twwet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista 
    listaTweets.appendChild(li);
    //añadir a LocalStorage
    agregarTweetLocalStorage(tweet);
}

// elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
     
    } 
} 
// mostrar datos de local storage en la lista
function localStorageListo () {
    let tweets; 
        tweets =  obtenerTweetsLocalStorage();
        tweets.forEach(function(tweet) {
// crear boton de borrar 
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //crear elemento y añadir el contenido a la lista 
        const li = document.createElement("li");
        li.innerText = tweet;
        //añade el boton de borrar al twwet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista 
        listaTweets.appendChild(li);
} ) } ;

//agregar tweet a localStorage

function agregarTweetLocalStorage(tweet) {
    let tweets; 
    tweets = obtenerTweetsLocalStorage();
    // añadir el nuevo tweet
    tweets.push(tweet);
    //convertir de str a arreglo para LocalStorage
    localStorage.setItem('tweets', JSON.stringify(tweets) );
   
}
// comprobar los elementos de Local Storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets; 
    //revisamos valores de local storage
    if (localStorage.getItem('tweets') === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    } return tweets; 
}
// eliminar tweet de Local Storage 


function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar; 
    //elimina la X del tweet    
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
    }       
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}