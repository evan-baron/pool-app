let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let players = 1;

function gameSelect(btnID) {
    console.log(btnID);
    document.getElementById('mmc').style.display = "none";
    document.getElementById('apc').style.display = "flex";
    /* Stupid code to delete later, just reference for how to refer to element IDs */
    if (btnID == '10-ball') {
        document.getElementById('8-ball').style.backgroundColor = "blue";
        document.getElementById(btnID).style.backgroundColor = "red";
    } else {
        document.getElementById(btnID).style.backgroundColor = "red";
    }
    document.getElementById('title').innerHTML = "Add Players";
}

function mainMenu() {
    document.getElementById('mmc').style.display = "flex";
    document.getElementById('apc').style.display = "none";
    document.getElementById('title').innerHTML = "Score App";
}

function addPlayer(param) {
    let newPlayer = document.createElement('div')
    if (parseInt(document.getElementById(param).previousElementSibling.id[6]) < 5) {
        players += 1
        document.getElementById(param).insertAdjacentElement("beforebegin", newPlayer)
        newPlayer.setAttribute('class', 'player-input-container')
        newPlayer.setAttribute('id', 'player' + (parseInt(newPlayer.previousElementSibling.id[6]) + 1));
        newPlayer.innerHTML = `<input type="text" name="" id="input-player${parseInt(newPlayer.previousElementSibling.id[6]) + 1}" class="input-player" placeholder="Player ${parseInt(newPlayer.previousElementSibling.id[6]) + 1}">
        <button class="remove" id="remove${parseInt(newPlayer.previousElementSibling.id[6]) + 1}" onclick="remove(this.id)">Remove</button>`
    }

    if (document.getElementById(param).previousElementSibling.id[6] > 4) {
        document.getElementById(param).style.display = 'none'
    } else {
        document.getElementById(param).style.display = ''
    }
}

function remove(param) {
    let removeID = parseInt(param[6]);
    console.log(param[6]);
    document.getElementById('player'+removeID).remove();
    for (let i = parseInt(param[6]); i<players; i++) {
        console.log(document.getElementById('player'+(i+1)));
        document.getElementById('player'+(i+1)).setAttribute('id', 'player'+i);
        document.getElementById('remove'+(i+1)).setAttribute('id', 'remove'+i);
        document.getElementById('input-player'+(i+1)).setAttribute('placeholder', 'Player '+i);
        document.getElementById('input-player'+(i+1)).setAttribute('id', 'input-player'+i);
    }
    players -= 1;

    if (document.getElementById('add-player').previousElementSibling.id[6] < 5) {
        document.getElementById('add-player').style.display = ''
    } else {
        document.getElementById('add-player').style.display = 'none'
    }
}