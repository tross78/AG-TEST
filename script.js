import Product from "./product.js";

async function init() {
    /**
     * Pull in random Pokemon data to populate products
     */
    var offset = Math.floor(Math.random() * 1000);
    var limit = 5;
    var url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    await fetch(url)
        .then(response => response.json())
        .then(function (allpokemon) {
            allpokemon.results.forEach(function (pokemon) {
                processData(pokemon);
            })
        })
}

function processData(pokemon) {
    /**
     * Since each result only has a url to each pokemon
     * we have to fetch results for each one
     */
    let url = pokemon.url;
    fetch(url)
        .then(response => response.json())
        .then(function (pokeData) {
            var productElement = generateProduct();
            var abilityData = pokeData.abilities;
            var featuresData = [];
            abilityData.map((element, index) => {
                featuresData.push({id: `${pokeData.id}-feature${index}`, text:  element.ability.name});
            });
            new Product(productElement, pokeData.name, `PokeDex #${pokeData.id}`, pokeData.sprites.front_default, featuresData);
        })
}

/**
 * 
 * @returns Generated product DOM element
 */

function generateProduct() {
    var productsContainer = document.getElementById("products");
    var productElement = document.createElement("div");
    productElement.classList.add("product");

    var productHeading = document.createElement("h1");
    productHeading.classList.add("product__heading");
    productElement.appendChild(productHeading);

    var productDescription = document.createElement("div");
    productDescription.classList.add("product__description");
    productElement.appendChild(productDescription);

    var productImage = document.createElement("div");
    productImage.classList.add("product__image");
    productElement.appendChild(productImage);

    var productFeatures = document.createElement("div");
    productFeatures.classList.add("features");

    productElement.appendChild(productFeatures);
    productsContainer.appendChild(productElement);
    return productElement;
}

init();
