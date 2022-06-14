

document.getElementById('run').addEventListener('click', (e) => {
    e.preventDefault();
    getPokemon();


async function getPokemon() {
    let PokeName = document.getElementById('pokemon-name');
    let PokeId = document.getElementById('pokemon-id');
    let PokeImage = document.getElementById('pokemon-image');
    let input = document.getElementById('search').value.toLowerCase();
    let movesList = document.getElementById('moves-list');
    let type = document.getElementById('type');
    let evolutionTarget = document.getElementById('evolution');
    let previousEvoImg = document.getElementById('prevEvoImg');
    let abilityInfoTarget = document.getElementById('Pokemon-info');
    let ApiUrl = `https://pokeapi.co/api/v2/pokemon/`;


    let PokemonApi = await fetch(`${ApiUrl}${input}`);
    let Pokemon = await PokemonApi.json();
    PokeName.innerHTML = Pokemon.name;
    PokeImage.setAttribute('src', Pokemon.sprites.other.home.front_default)
    PokeId.innerHTML = `#${Pokemon.id}`;
    movesList.innerHTML = '';
    if (Pokemon.moves.length > 4) {
            for (let i = 0; i < 4; i++) {
                movesList.innerHTML +=`<li class="moveLi"> ${Pokemon.moves[i].move.name} </li>`;
            }
        }
    else {
        for (let i = 0; i < Pokemon.moves.length; i++) {
            movesList.innerHTML += `<li class="moveLi">${Pokemon.moves[i].move.name}</li>`;
    }
    }
    abilityInfoTarget.innerHTML = ''
    for (let i = 0; i < Pokemon.abilities.length; i++) {
        abilityInfoTarget.innerHTML += `<li class="abilityLi">${Pokemon.abilities[i].ability.name}</li>`;
    }

    type.innerHTML = ''
    for ( let i = 0; i < Pokemon.types.length; i++) {
        type.innerHTML += `<li>${Pokemon.types[i].type.name}</li>`;
    }    
    let EvoApi = await fetch(Pokemon.species.url);
    let evolution = await EvoApi.json();
    try {
        let prevEvoApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.evolves_from_species.name}`)
        let prevEvolution = await prevEvoApi.json()
        evolutionTarget.innerHTML = '';
        evolutionTarget.innerHTML += `<h3> Evolves from <span id='preFormPoke'>${evolution.evolves_from_species.name}</span></h3>`;
        previousEvoImg.setAttribute('src', prevEvolution.sprites.other.home.front_default);
    }
    catch(error) {
        console.log('error10111', error);
        evolutionTarget.innerHTML = '';
        evolutionTarget.innerHTML += `<h3>No previous form</h3>`;
        previousEvoImg.setAttribute('src', 'images/pokeball-icon-27049.png');
    }
    let evoChainTarget = document.getElementById('evo-chain');
    console.log(evolution.evolution_chain.url);
    let evoChainApi = await fetch(`${evolution.evolution_chain.url}`)
    let evoChain = await evoChainApi.json();
    console.log(evoChain);
    console.log(ApiUrl);
    console.log(evoChain.chain.species.name);
    console.log(evoChain.chain.evolves_to[0].species.name);
    // console.log(evoChain.chain.evolves_to[0].evolves_to[0].species.name);
    console.log(evoChain.chain.evolves_to.length);
    evoChainTarget.innerHTML = ``;


        if (evoChain.chain.evolves_to.length > 3) {
            evoChainTarget.innerHTML = `<h2> evolution chain </h2>`;
            getEvoImageApi = await fetch(`${ApiUrl}${evoChain.chain.species.name}`)
            getEvoImage = await getEvoImageApi.json();
            evoChainTarget.innerHTML += `<p>${evoChain.chain.species.name} </p><img src="${getEvoImage.sprites.front_default}">`;
            for ( let i = 0; i < evoChain.chain.evolves_to.length; i++) {
                getEvoImageApi = await fetch(`${ApiUrl}${evoChain.chain.evolves_to[i].species.name}`)
                getEvoImage = await getEvoImageApi.json();
                evoChainTarget.innerHTML += ` <p> ${getEvoImage.name} </p> <img src="${getEvoImage.sprites.front_default}">`;            
            }
        }
        else {
            evoChainTarget.innerHTML = `<h2> evolution chain </h2>`;
            getEvoImageApi = await fetch(`${ApiUrl}${evoChain.chain.species.name}`)
            getEvoImage = await getEvoImageApi.json();
            evoChainTarget.innerHTML += `<p>${evoChain.chain.species.name} </p><img src="${getEvoImage.sprites.front_default}">`;
            for (i = 0; i < evoChain.chain.evolves_to.length; i++) {
                getEvoImageApi = await fetch(`${ApiUrl}${evoChain.chain.evolves_to[i].species.name}`)
                getEvoImage = await getEvoImageApi.json();
                console.log(getEvoImage);
                evoChainTarget.innerHTML += `<p>${evoChain.chain.evolves_to[i].species.name} </p><img src="${getEvoImage.sprites.front_default}">`;
                for (j = 0; j < evoChain.chain.evolves_to[i].evolves_to.length; j++) {
                    getEvoImageApi = await fetch(`${ApiUrl}${evoChain.chain.evolves_to[i].evolves_to[j].species.name}`)
                    getEvoImage = await getEvoImageApi.json();
                    console.log(getEvoImage);
                    evoChainTarget.innerHTML += `<p>${evoChain.chain.evolves_to[j].evolves_to[j].species.name} </p> <img src="${getEvoImage.sprites.front_default}">`;
                }
            }

        }

    
}

});


