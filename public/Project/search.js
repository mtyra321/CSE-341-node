const url = "https://pokeapi.co/api/v2/type/3";
const key = "f4115560196924074bec30f1c2fb50c8";

function convertToJson(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
}

async function getPokemonAsync(url) {
    let pokemonData = await fetch(url).then(convertToJson);
    let pokemon = pokemonData.pokemon;
    displayPokemon(pokemon);
}

function displayPokemon(list) {
    // console.log(list);
    const listElement = document.getElementById("theList");

    const newArray = list.map((item) => {
        return `<li data-url = "${item.pokemon.url}">${item.pokemon.name}</li>`;
    });
    listElement.innerHTML = newArray.join("");
    //   console.log(newArray);

}

async function pokemonClicked(event) {
    console.log(event.target.dataset.url);
    const details = await fetch(event.target.dataset.url).then(convertToJson);
    console.log(details);
    //   console.log(currentTarget);
    displayDetails(details);
}

function displayDetails(details) {
    let section = document.getElementById("details");
}

getPokemonAsync(url);
document.getElementById("theList").addEventListener('click', pokemonClicked);