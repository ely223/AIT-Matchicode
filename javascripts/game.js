// shuffle algorithm to generate random cards
var shuffle = function(cards) {

	var j, k;
	var temp;

  	for (j = 0; j < cards.length; j++)
    {
      k = Math.floor(Math.random() * cards.length);
      temp = cards[j];
      cards[j] = cards[k];
      cards[k] = temp;
    }

    return cards;
};

var flipped_pairs=[];
var counter=0;
var guesses = 0;
var matches = 0;
var numSymbols;

function handleClick(event) {
	numSymbols = document.getElementById('numSymbols').value;

	// max of 8 cards
	if (numSymbols > 8)
	{
		numSymbols = 8;
	}

	// hide form after input
	document.getElementById("startForm").style.visibility="hidden";

	// 8 different symbols for the game
	var symbols = ['&#9730', '&#9742', '&#9760', '&#9774', '&#9775', '&#9786', '&#9788', '&#9789'];
	
	//shuffle array of symbols to generate random cards each new game
	shuffle(symbols);

	// create table to add the cards
	var cards_table = document.createElement('table');
	cards_table.setAttribute('id', "table");

	// array based on user input
	var symbs =[];

	for (var i = 0; i < numSymbols; i++){
		symbs.push(symbols[i]);
		symbs.push(symbols[i]); 
	}

	// reshuffle selected symbols
	shuffle(symbs);

	// 4 x 4square matrix for 16 cards
	if (symbs.length == 16) {
		for (var i = 0; i < symbs.length; i = i+4) {
			
			var row = document.createElement('tr');
			cards_table.appendChild(row);
			for (var j = i; j < i + 4; j++) {
				var col = document.createElement('td');
				col.setAttribute('id', j);
				// assign a symbol to each card
				col.setAttribute('data-symbol', symbs[j]);
				// event listener
				col.addEventListener('click', flip);
				row.appendChild(col);
			}
		}
	} else {
		// 2 column matrices
		for (var i = 0; i < symbs.length; i = i+2) {
			var row = document.createElement('tr');
			cards_table.appendChild(row);
			for (var j = i; j < i + 2; j++) {
				var col = document.createElement('td');
				col.setAttribute('id', j);
				col.setAttribute('data-symbol', symbs[j]); 
				col.addEventListener('click', flip);
				row.appendChild(col);
			}
		}
	} 

	// add the entire table
	document.body.appendChild(cards_table);

	// number of guesses
	// create element and append node
	var numGuesses = document.createElement("h2");
	numGuesses.setAttribute("id", "guess")
	var node = document.createTextNode("#?'s: " + guesses);
	numGuesses.appendChild(node);

	var element = document.getElementById("game");
	var child = document.getElementById("startForm");
	element.insertBefore(numGuesses,child); 
	element.insertBefore(table, child); 

};

var flip = function() {

	// Get id
	var id = this.getAttribute('id');
	flipped_pairs.push(id);
	counter++;

	// Show card's symbol from custom 'data-symbol' attribute
	this.innerHTML = this.getAttribute('data-symbol');
	this.setAttribute('style', 'background-color: #A1EDED;')

	if (counter==2) {
		// timer to display both flipped cards for 1 second
		setTimeout( function(){
			guesses++;
			document.getElementById("guess").removeChild(document.getElementById("guess").firstChild);
			document.getElementById("guess").appendChild(document.createTextNode("#?'s: " + guesses));

			// match! keep cards facing forward
			if (document.getElementById(flipped_pairs[0]).getAttribute('data-symbol')
				== document.getElementById(flipped_pairs[1]).getAttribute('data-symbol')){
				// remove event listener
				document.getElementById(flipped_pairs[0]).removeEventListener('click', flip);
				document.getElementById(flipped_pairs[1]).removeEventListener('click', flip);
				matches++;
				counter = 0;
				flipped_pairs.pop();
				flipped_pairs.pop();
			} else {
				// flip the cards back to green if cards don't match
				document.getElementById(flipped_pairs[0]).setAttribute('style', 'background-color: #85E69D');
				document.getElementById(flipped_pairs[1]).setAttribute('style', 'background-color: #85E69D');
				document.getElementById(flipped_pairs[0]).removeChild(document.getElementById(flipped_pairs[0]).firstChild);
				document.getElementById(flipped_pairs[1]).removeChild(document.getElementById(flipped_pairs[1]).firstChild);
				counter = 0;
				flipped_pairs.pop();
				flipped_pairs.pop();
			}

			// game is done
			if (matches == numSymbols) {
				document.getElementById('guess').style.display="none";
				document.getElementById('table').style.display="none";

				// thanks for playing message
				var done = document.createElement("h2");
				done.setAttribute("id", "done")
				var node = document.createTextNode("You're done! Thx for playing!");
				done.appendChild(node);

				var element = document.getElementById("game");
				var child = document.getElementById("startForm");
				element.insertBefore(done,child); 
				element.insertBefore(game, child); 
			}
		}, 1000);
	}

	// keep card turned if 2 cards are already flipped
	if (flipped_pairs.length > 2) {
		document.getElementById(flipped_pairs[2]).setAttribute('style', 'background-color: #85E69D');
		document.getElementById(flipped_pairs[2]).removeChild(document.getElementById(flipped_pairs[2]).firstChild);
		flipped_pairs.pop();
	}

}; 


var el = document.getElementById("startButton");
el.addEventListener("click", handleClick);
