const playerIcon = document.createElement('div')
playerIcon.id = 'playerIcon';
let playerLocation = [0, 9];
const rowsWrapper = document.getElementById("rowsWrapper");
const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW"
];

function createRows() {
    for (let i = 0; i < map.length; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.id = 'row' + i;
        row.dataset.rowNumber = i;
        createCells(row);
        rowsWrapper.appendChild(row)
    }
}

function createCells(row) {
    for (let i = 0; i < map[0].length; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = row.id + "cell" + i;
        switch (map[row.dataset.rowNumber][i]) {
            case 'W':
                cell.className = 'wall cell';
                break;
            case ' ':
                cell.className = 'floor cell';
                break;
            case 'S':
                cell.className = 'floor cell start';
                break;
            case 'F':
                cell.className = 'floor cell finish';
                break;
        }
        row.appendChild(cell);
    }
}

function changePlayerLocation(Right, Down) {
    let rowNumber = playerLocation[1] + Down;
    let cellNumber = playerLocation[0] + Right;
    let mapLocation = (map[rowNumber][cellNumber]);
    let direction = whatDirection(Right, Down);
    if (mapLocation !== 'W' && mapLocation !== undefined) {
        playerIcon.style.animationName = "slide" + direction
        let playerLocationDiv = document.getElementById('row' + rowNumber + 'cell' + cellNumber)
        playerLocationDiv.appendChild(playerIcon);
        playerLocation = [cellNumber, rowNumber];
    }
    if (mapLocation == 'F') {
        youWon();
    }
}

function whatDirection(Right, Down) {
    let direction = '';
    switch (Right) {
        case 1:
            direction = 'Right';
            break;
        case -1:
            direction = 'Left';
            break;
    }
    switch (Down) {
        case 1:
            direction = 'Down';
            break;
        case -1:
            direction = 'Up';
            break;
    }
    return direction;
}

function youWon() {
    let text = document.createTextNode("You won!");
    let element = document.createElement('div');
    element.appendChild(text);
    element.id = "winDiv"
    rowsWrapper.appendChild(element);
    document.removeEventListener('keydown', arrowKeyPressed);
}

createRows();
changePlayerLocation(0, 0); //game init: sets the playerIcon and mapLocation to the start position

let arrowKeyPressed = function (event) {
    switch (event.key) {
        case 'ArrowRight':
            changePlayerLocation(1, 0);
            break;
        case 'ArrowLeft':
            changePlayerLocation(-1, 0);
            break;
        case 'ArrowDown':
            changePlayerLocation(0, 1);
            break;
        case 'ArrowUp':
            changePlayerLocation(0, -1);
            break;
    }
}

document.addEventListener('keydown', arrowKeyPressed);