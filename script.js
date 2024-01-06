let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let playerCount = 1;
let players = [];
let availableGames = ['8-ball','9-ball','10-ball','one-pocket']
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
                    game: selectedGame[0],
                    '8-ball': 0,
                    '9-ball': 0,
                    '10-ball': 0,
                    'one-pocket': 0,
                    'total-score': 0
                };
                //MAKE PLAYERS AN OBJECT AND THEN YOU CAN KEEP PLAYER NAME AND SCORE TOGETHER IN ONE SPOT
            } else {
                players[i] = {
                    name: document.getElementById('input-player'+(parseInt(i)+1)).value,
                    game: selectedGame[0],
                    '8-ball': 0,
                    '9-ball': 0,
                    '10-ball': 0,
                    'one-pocket': 0,
                    'total-score': 0
                }
            }
        }

        for (let i = 0; i<players.length; i++) {
            let newScoreBox = document.createElement('div');
            newScoreBox.setAttribute('class', 'scorebox')
            newScoreBox.innerHTML = `<h2 class="player">${players[i]['name']}:</h2><div class="scores" id="${(players[i]['name'])}-score"><h2 class="minus" onclick="minus(event)">−</h2><h2 class="counter" id="${(players[i]['name'])}-counter" objnum="${i}">${players[i][selectedGame[0]]}</h2><h2 class="plus" onclick="plus(event)">+</h2></div>`;
            document.getElementById('scores-cont').appendChild(newScoreBox);
        }

        document.getElementById('apc').style.display = "none";
        document.getElementById('title').innerHTML = selectedGame[0];
        document.getElementById('ksc').style.display = "flex";
    }
}

//DONT FORGET TO MAKE SURE TO PREVENT AGAINST DUPLICATE NAMES

function okAlert() {
    document.getElementById('alert').style.display = "none";
}

function changeGame() {
    availableGames = ['8-ball','9-ball','10-ball','one-pocket']
    availableGames.splice(availableGames.indexOf(selectedGame[0]), 1);
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

    if (selectedGame[0] == 'one-pocket') {
        document.getElementById('title').innerHTML = 'One Pocket';
    } else {
        document.getElementById('title').innerHTML = selectedGame[0];
    }

    for (let i = 0; i<players.length; i++) {
        document.getElementById(players[i]['name']+'-counter').innerHTML = players[i][selectedGame[0]];
    }
}

function minus(event) {
    if (players[event.target.nextSibling.getAttribute('objnum')][selectedGame[0]] > 0) {
        players[event.target.nextSibling.getAttribute('objnum')]['total-score'] -= 1;
        players[event.target.nextSibling.getAttribute('objnum')][selectedGame[0]] -= 1;
        document.getElementById(players[event.target.nextSibling.getAttribute('objnum')]['name']+'-counter').innerHTML = players[event.target.nextSibling.getAttribute('objnum')][selectedGame[0]];
    }
}

function plus(event) {
    players[event.target.previousElementSibling.getAttribute('objnum')]['total-score'] += 1;
    players[event.target.previousElementSibling.getAttribute('objnum')][selectedGame[0]] += 1;
    document.getElementById(players[event.target.previousElementSibling.getAttribute('objnum')]['name']+'-counter').innerHTML = players[event.target.previousElementSibling.getAttribute('objnum')][selectedGame[0]];
}

function finishGame() {
    document.getElementById('fs-msg').innerHTML = `<h1>Results</h1>`
    for (let i = 0; i<players.length; i++) {
        console.log(players[i]['name']+' won '+[players[i]['total-score']]+' total games.')
        document.getElementById('fs-msg').innerHTML += `<h2>${players[i]['name']} won ${[players[i]['total-score']]} games</h2>`
        for (const key in players[i]) {
            if (key != 'total-score' && key != 'one-pocket' && players[i][key] > 0) {
                console.log(`${key}: ${players[i][key]}`);
                document.getElementById('fs-msg').innerHTML += `<h3>${key}: ${players[i][key]}</h3>`
            } else if (key == 'one-pocket' && players[i][key] > 0) {
                console.log(`${key}: ${players[i][key]}`);
                document.getElementById('fs-msg').innerHTML += `<h3>One Pocket: ${players[i][key]}</h3>`
            }
        }
    }
    document.getElementById('fs-container').style.display = 'flex';
    // document.getElementById('fs-msg').innerHTML = `<h2>`
}

function fsBack() {
    document.getElementById('fs-container').style.display = 'none';
    document.getElementById('fs-msg').innerHTML = '';
}

function done() {
    location.reload();
}