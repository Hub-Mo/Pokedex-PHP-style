<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokédex</title>
    <script src="https://kit.fontawesome.com/9496963c6c.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="Style/style.css">
</head>
<?php
$Api = file_get_contents("https://pokeapi.co/api/v2/pokemon/$userInput");
$JsonApi = json_decode($Api);

?>
<body>
    <header>
        <div id="Header-container">
        <h1></h1>
        </div>
    </header>
    <main>
        <section id="pokemon-section">
            <div id="type-container">
                <div  id="pokemon-type">
                    <h2></h2>
                    <ul id="type"></ul>    
                </div>
                <div id="previous-evo-container" >
                    <h3 id="evolution"></h3>
                    <img id="prevEvoImg" src="images/pokeball-icon-27049.png" alt="previous evolution image" width="100rem">
                </div>            
            </div>

            <div id="pokemon-img-container">
                <h3><span id="pokemon-id"></span></h3>
                <h2 id="pokemon-name">Ash</h2>
                <div id="pokemon-display">
                    <img id='pokemon-image-bg' src="images/pokemon_bg.png" alt="rotate background">
                    <!-- <img src="images/pokemon_circle_bg.png" alt="background pokemon"> -->
                    <img id='pokemon-image' src="images/clipart3530458.png" alt="pokemon image">
                </div>
            </div>
            <article id="pokemon-info-container">
                <div id="info-div">
                    <h2>Abilities</h2>
                    <ul id="Pokemon-info"></ul>
                </div>
                <div id="moves-container">
                    <h3>Moves</h3>
                    <ul id="moves-list"></ul>
                </div>
                
                    <div id="evo-chain">
                       
                    </div>
                
            </article>
        </section>
        <section id="search-container">
            <form>
                <input id="search" name="input" placeholder="pokemon name or id" type="text"> 
                <button id="run" >Search</button>
            </form>

        </section>


    </main>


</body>
</html>
