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
        // row.style.height = '28px';
        // row.style.width = '588px';
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
        // cell.style.height = '28px';
        // cell.style.width = '28px';
        cell.id = row.id + "cell" + i;
        map[row.dataset.rowNumber][i] == 'W' ?
            cell.className = 'wall cell' :
            cell.className = 'floor cell'
        row.appendChild(cell);
    }
}

function changePlayerLocation(Right, Down) {
    let rowNumber = playerLocation[1] + Down;
    let cellNumber = playerLocation[0] + Right;
    let mapLocation = (map[rowNumber][cellNumber]);
    let direction = whatDirection(Right, Down);
    if (mapLocation !== 'W') {
        playerIcon.style.animationName = "slide" + direction
        let playerLocationDiv = document.getElementById('row' + rowNumber + 'cell' + cellNumber)
        playerLocationDiv.appendChild(playerIcon);
        playerLocation = [cellNumber, rowNumber];
    }
    if (mapLocation == 'F') {
        youWon();
    }
}

function whatDirection (Right, Down){
    let direction = '';
    if (Right == 1){
        direction = 'Right';
    }
    if (Right == -1){
        direction = 'Left';
    }
    if (Down == 1){
        direction = 'Down';
    }
    if (Down == -1){
        direction = 'Up';
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
    if (event.key == 'ArrowRight') {
        // playerIcon.style.animationName = "slideRight";
        changePlayerLocation(1, 0);
    }
    if (event.key == 'ArrowLeft') {
        // playerIcon.style.animationName = "slideLeft";
        changePlayerLocation(-1, 0);
    }
    if (event.key == 'ArrowDown') {
        // playerIcon.style.animationName = "slideDown";
        changePlayerLocation(0, 1);
    }
    if (event.key == 'ArrowUp') {
        // playerIcon.style.animationName = "slideUp";
        changePlayerLocation(0, -1);
    }
}

document.addEventListener('keydown', arrowKeyPressed);