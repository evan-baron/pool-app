let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let playerCount = 1;
let players = [];
let availableGames = ['8-ball','9-ball','10-ball','14.1','one-pocket']
let selectedGame = [];
let selectedGameOrigIndex = [];

function gameSelect(event) {
    selectedGame.push(event.target.id);
    selectedGameOrigIndex.push(availableGames.indexOf(selectedGame[0]));
    document.getElementById('mmc').style.display = "none";
    document.getElementById('apc').style.display = "flex";
    document.getElementById('title').innerHTML = "Add Players";
}

function backButton() {
    document.getElementById('mmc').style.display = "flex";
    document.getElementById('apc').style.display = "none";
    document.getElementById('title').innerHTML = "Score App";
    selectedGame.pop(0);
    selectedGameOrigIndex.pop(0);
}

function addPlayer() {
    let newPlayer = document.createElement('div')
    if (parseInt(document.getElementById('add-player').previousElementSibling.id[6]) < 5) {
        playerCount += 1
        document.getElementById('add-player').insertAdjacentElement("beforebegin", newPlayer)
        newPlayer.setAttribute('class', 'player-input-container')
        newPlayer.setAttribute('id', 'player' + (parseInt(newPlayer.previousElementSibling.id[6]) + 1));
        newPlayer.innerHTML = `<input type="text" name="" id="input-player${parseInt(newPlayer.previousElementSibling.id[6]) + 1}" class="input-player" placeholder="Player ${parseInt(newPlayer.previousElementSibling.id[6]) + 1}">
        <button class="remove" id="remove${parseInt(newPlayer.previousElementSibling.id[6]) + 1}" onclick="removePlayer(this.id)">Remove</button>`
    }

    if (document.getElementById('add-player').previousElementSibling.id[6] > 4) {
        document.getElementById('add-player').style.display = 'none'
    } else {
        document.getElementById('add-player').style.display = ''
    }
}

function removePlayer(param) {
    let removeID = parseInt(param[6]);
    document.getElementById('player'+removeID).remove();
    for (let i = parseInt(param[6]); i<playerCount; i++) {
        document.getElementById('player'+(i+1)).setAttribute('id', 'player'+i);
        document.getElementById('remove'+(i+1)).setAttribute('id', 'remove'+i);
        document.getElementById('input-player'+(i+1)).setAttribute('placeholder', 'Player '+i);
        document.getElementById('input-player'+(i+1)).setAttribute('id', 'input-player'+i);
    }
    playerCount -= 1;

    if (document.getElementById('add-player').previousElementSibling.id[6] < 5) {
        document.getElementById('add-player').style.display = ''
    } else {
        document.getElementById('add-player').style.display = 'none'
    }
}

function startButton() {
    players = []; //clears the player names stored for the time being
    if (playerCount < 2) {
        document.getElementById('alert').style.display = 'flex';
    } else {
        for (let i = 0; i<playerCount; i++) {
            if (document.getElementById('input-player'+(parseInt(i)+1)).value == '') {
                players[i] = {
                    name: 'Player-'+(parseInt(i)+1),
                    score: 0
                };
                //MAKE PLAYERS AN OBJECT AND THEN YOU CAN KEEP PLAYER NAME AND SCORE TOGETHER IN ONE SPOT
            } else {
                players[i] = {
                    name: document.getElementById('input-player'+(parseInt(i)+1)).value,
                    score: 0
                }
            }
        }
        console.log(players)
        if (selectedGame[0] == '8-ball' || selectedGame[0] == '9-ball' || selectedGame[0] == '10-ball') {
            console.log('easy')
            //ADD GAME SCORING AND FORMATTING STUFF HERE
            for (let i = 0; i<players.length; i++) {
                let newScoreBox = document.createElement('div');
                newScoreBox.setAttribute('class', 'scorebox')
                newScoreBox.innerHTML = `<h2 class="player">${players[i]['name']}:</h2><div class="scores" id="${(players[i]['name']).toLowerCase()}-score"><h2 class="minus" onclick="minus(event)">−</h2><h2 class="counter" id="${(players[i]['name']).toLowerCase()}-counter" objnum="${i}">${players[i]['score']}</h2><h2 class="plus" onclick="plus(event)">+</h2></div>`;
                document.getElementById('scores-cont').appendChild(newScoreBox);
            }
        } else if (selectedGame[0] == '14.1') {
            console.log('hard')
            //ADD GAME SCORING AND FORMATTING STUFF HERE
        } else {
            console.log('hardest')
            //ADD GAME SCORING AND FORMATTING STUFF HERE
        }
        document.getElementById('apc').style.display = "none";
        document.getElementById('title').innerHTML = "Keep Score";
        document.getElementById('ksc').style.display = "flex";
    }
}

//DONT FORGET TO MAKE SURE TO PREVENT AGAINST DUPLICATE NAMES

function okAlert() {
    document.getElementById('alert').style.display = "none";
}

function changeGame() {
    availableGames = ['8-ball','9-ball','10-ball','14.1','one-pocket']
    availableGames.splice(availableGames.indexOf(selectedGame[0]), 1);
    console.log(availableGames);
    for (let i = 0; i<availableGames.length; i++) {
        let addGameButton = document.createElement('button');
        document.getElementById('cancel').insertAdjacentElement('beforebegin', addGameButton);
        addGameButton.setAttribute('class', 'cg-button');
        addGameButton.setAttribute('id', 'cg-'+availableGames[i]);
        addGameButton.setAttribute('onclick', 'initChange(event)');
        addGameButton.innerHTML = document.getElementById(availableGames[i]).innerHTML;
    }
    //<button class="8-ball" id="8-ball" onclick="gameSelect(event)">8-Ball</button>

    document.getElementById('cg-container').style.display = "flex";
}

function cgCancel() {
    document.getElementById('cg-container').style.display = "none";
    for (let i = 0; i<availableGames.length; i++) {
        document.getElementById('cg-'+availableGames[i]).remove();
    }
}

function initChange(event) {
    for (let i = 0; i<availableGames.length; i++) {
        document.getElementById('cg-'+availableGames[i]).remove();
    }
    let curGame = event.target.id.replace('cg-','');
    availableGames.splice(selectedGameOrigIndex[0], 0, selectedGame[0]);
    selectedGame.splice(0, 1);
    selectedGame.push(curGame);
    selectedGameOrigIndex.splice(0, 1);
    selectedGameOrigIndex.push(availableGames.indexOf(curGame));
    availableGames.splice(availableGames.indexOf(selectedGame[0]), 1);
    document.getElementById('cg-container').style.display = "none";
}

function minus(event) {
    if (players[event.target.nextSibling.getAttribute('objnum')]['score'] > 0) {
        players[event.target.nextSibling.getAttribute('objnum')]['score'] -= 1;
        document.getElementById(players[event.target.nextSibling.getAttribute('objnum')]['name'].toLowerCase()+'-counter').innerHTML = players[event.target.nextSibling.getAttribute('objnum')]['score'];
    }
}

function plus(event) {
    players[event.target.previousElementSibling.getAttribute('objnum')]['score'] += 1;
    document.getElementById(players[event.target.previousElementSibling.getAttribute('objnum')]['name'].toLowerCase()+'-counter').innerHTML = players[event.target.previousElementSibling.getAttribute('objnum')]['score'];
}