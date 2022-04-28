
let inputBox = document.querySelector('input')
let inputText;
let submitButton = document.querySelector('#submit');
let $resultContainer = $('#resultContainer')

loadPokedex();
function loadPokedex() {
}

submitButton.addEventListener('click', checkValidInput)
inputBox.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        checkValidInput()
    }
})

function checkValidInput() {
    inputText = inputBox.value;
    if (inputText.length !== 0) {
        searchForPokemon();
    }
    else {
        alert("Please enter a Pokemon name!") //add image to alert?
    }
}

function searchForPokemon() {
    console.log('still working :', inputText);
    checkForError();

    $.get(`https://api.pokemontcg.io/v2/cards?q=name:${inputText}*`, function (e) {
        let results = e.data
        $resultContainer.empty();

        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            //define the needed information
            let name = results[i].name;
            let picture = results[i].images.small || results[i].images.large;
            let pokedexNum = results[i].nationalPokedexNumbers[0];
            let rarity = results[i].rarity;
            if (rarity === undefined) { rarity = 'Special' };
            let cardNum = results[i].number;

            let marketPrice;
            if (results[i].tcgplayer !== undefined && results[i].tcgplayer.prices !== undefined && results[i].tcgplayer.prices.normal !== undefined) { marketPrice = (results[i].tcgplayer.prices.normal.market).toFixed(2) }
            else { marketPrice = (results[i].cardmarket.prices.trendPrice).toFixed(2) }

            let priceUpdate = results[i].cardmarket.updatedAt;


            let cardLink;
            if (results[i].tcgplayer !== undefined) { cardLink = results[i].tcgplayer.url }
            else if (results[i].cardmarket !== undefined) { cardLink = results[i].cardmarket.url }
            else { cardLink; } // create /add new class for link n/a and add event listener



            //! create the HTML elements:
            let $div = $('<div class="resultPokemon"></div>');
            $($div).appendTo($resultContainer);

            let $pokemonName = $(`<h2 class="pokemonName">${name}</h2>`);
            $pokemonName.appendTo($div);

            let $img = $(`<img class = "pokemonPic" src = "${picture}">`);
            $img.appendTo($div);

            let $summary = $('<div class = "summary"></div>');
            $summary.appendTo($div);

            let $statsTitle = $(`<h4 class = "stats">Pokemon Card Details:</h4>`);
            $statsTitle.appendTo($summary);

            let $statsList = $('<ul class="statsList"></ul>')
            $statsList.appendTo($summary)

            let $dexNum = $(`<li class = "dexNum">National Pokedex #${pokedexNum}</li>`);
            $dexNum.appendTo($statsList);

            let $rarity = $(`<li class = "rarity">Rarity: ${rarity}</li>`);
            $rarity.appendTo($statsList)

            let $cardNum = $(`<li class = "cardNum">Card Number: ${cardNum}</li>`);
            $cardNum.appendTo($statsList)

            let $cardPrice = $(`<li class="cardPrice">Average market price: $${marketPrice}</li>`)
            $cardPrice.appendTo($statsList)

            let $priceUpdate = $(`<li class="priceUpdate">Price updated: ${priceUpdate}</li>`)
            $priceUpdate.appendTo($statsList)

            let $link = $(`<a href = "${cardLink}">Click to Buy</a>`)
            $link.appendTo($statsList)
        }
    })
}

function checkForError() {
    $.ajaxSetup({
        error: function (x) {

            if (x.status == 400) {
                alert('Pokemon not found!');
            }
        }
    });
}


