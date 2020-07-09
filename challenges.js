/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// First Challenges

var scroes, activePlayer, roundScore, gamePlaying, previousPlay;

init();


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //create a random number for the dice between 1 and 6
        var dice    = Math.floor(Math.random() * 6) + 1;
        //select the dice image
        var diceDom = document.querySelector('.dice');
        // display the dice
        diceDom.style.display = 'block';
        //select the dice image
        diceDom.src = 'dice-' + dice + '.png';
        //check the dice number if equal 6 twice  (Solution for the first challenge)
        if (dice === 6 && previousPlay === 6) {
            scroes[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            // next player
            nextPlayer();
        } else if (dice !== 1) { //check the dice number
            //add the dice number for our roundScore Variable
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }
        var previousPlay = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add current score to global score
        scroes[activePlayer] += roundScore;
        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scroes[activePlayer];
        // if the player won the game
        if (scroes[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //setting a timer half a second to delay the hide of dice
    setTimeout(function () {
        document.querySelector('.dice').style.display = 'none';
    }, 500);
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scroes = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}