let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let playerCount = 1;
let players = [];
let game = [];

function gameSelect(btnID) {
    game.push(btnID);
    document.getElementById('mmc').style.display = "none";
    document.getElementById('apc').style.display = "flex";
    document.getElementById('title').innerHTML = "Add Players";
}

function backButton() {
    document.getElementById('mmc').style.display = "flex";
    document.getElementById('apc').style.display = "none";
    document.getElementById('title').innerHTML = "Score App";
    game.pop(0);
}

function addPlayer(param) {
    let newPlayer = document.createElement('div')
    if (parseInt(document.getElementById(param).previousElementSibling.id[6]) < 5) {
        playerCount += 1
        document.getElementById(param).insertAdjacentElement("beforebegin", newPlayer)
        newPlayer.setAttribute('class', 'player-input-container')
        newPlayer.setAttribute('id', 'player' + (parseInt(newPlayer.previousElementSibling.id[6]) + 1));
        newPlayer.innerHTML = `<input type="text" name="" id="input-player${parseInt(newPlayer.previousElementSibling.id[6]) + 1}" class="input-player" placeholder="Player ${parseInt(newPlayer.previousElementSibling.id[6]) + 1}">
        <button class="remove" id="remove${parseInt(newPlayer.previousElementSibling.id[6]) + 1}" onclick="removePlayer(this.id)">Remove</button>`
    }

    if (document.getElementById(param).previousElementSibling.id[6] > 4) {
        document.getElementById(param).style.display = 'none'
    } else {
        document.getElementById(param).style.display = ''
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
        for (let i = 1; i<playerCount+1; i++) {
            if (document.getElementById('input-player'+i).value == '') {
                players.push('Player '+i);
            } else {
                players.push(document.getElementById('input-player'+i).value)
            }
        }
        console.log(players)
        switch(game[0]) {
            case '8-ball':
                console.log('8');
                /* GO TO GAME SCREEN */
                break;
            case '9-ball':
                console.log('9');
                /* GO TO GAME SCREEN */
                break;
            case '10-ball':
                console.log('10');
                /* GO TO GAME SCREEN */
                break;
            case '14.1':
                console.log('14.1');
                /* GO TO GAME SCREEN */
                break;
            case 'one-pocket':
                console.log('OP');
                /* GO TO GAME SCREEN */
                break;
        }
        // document.getElementById('apc').style.display = "none";
        // document.getElementById('title').innerHTML = "Keep Score";
        // document.getElementById('ksc').style.display = "flex";
    }
}

function okBtn() {
    document.getElementById('alert').style.display = "none";
}