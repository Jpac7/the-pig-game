/*
THE GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
ADDITIONAL CHALLENGES

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
*/

var scores, activePlayer, roundScore, isGamePlaying, winningScore;
// var previousRoll;

newGame();

function newGame() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    isGamePlaying = true;
    
    // additional challenge nº2
    winningScore = document.getElementById('win-score').value;
    previousRoll = undefined;

    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    
    for(var dice of dices = document.getElementsByClassName('dice')) {
        dice.style.display = 'none';
    }
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    previousRoll = undefined;
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    for(var dice of dices = document.getElementsByClassName('dice')) {
        dice.style.display = 'none';
    }
}


document.querySelector('.btn-roll').addEventListener('click', function(event) {
    if(!isGamePlaying) {
        return;
    }
        
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // additional challenge nº1 and nº3 mixed
    if(dice1 === 6 && dice2 === 6) {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = 0;
        return nextPlayer();
    }
    
    var dicesDOMS = document.getElementsByClassName('dice');
    dicesDOMS[0].style.display = 'block';
    dicesDOMS[1].style.display = 'block';
    dicesDOMS[0].src = 'dice-' + dice1 + '.png';
    dicesDOMS[1].src = 'dice-' + dice2 + '.png';
    
    // Update the roundScore if one of the rolled dices is not 1
    if(dice1 !== 1 && dice2 !== 1) {
        // Add to score
        roundScore += dice1 + dice2;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        previousRoll = dice;
    } else {
        // Change to next player turn
        nextPlayer();
    }
 
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(!isGamePlaying) {
        return;
    }
    
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= winningScore) {
        // The player won
        document.getElementById('name-' + activePlayer).textContent = 'Winner!'
        for(var dice of dices = document.getElementsByClassName('dice')) {
            dice.style.display = 'none';
        }
        var activePlayerClasses = document.querySelector('.player-' + activePlayer + '-panel').classList;
        activePlayerClasses.remove('active');
        activePlayerClasses.add('winner');
        isGamePlaying = false;
    } else {
        nextPlayer();
    }
})

document.querySelector('.btn-new').addEventListener('click', newGame)


