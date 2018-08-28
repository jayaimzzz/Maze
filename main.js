const playerIcon = document.createElement('div')
playerIcon.id = 'playerIcon';
let playerLocation = [0,9];
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
    for (let i = 0; i < 15; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.style.height = '28px';
        row.style.width = '588px';
        row.id = 'row' + i
        createCells(row);
        rowsWrapper.appendChild(row)
        // console.log(row);
    }
}

function createCells(row) {
    for (let i = 0; i < 21; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.height = '28px';
        cell.style.width = '28px';
        cell.id = row.id + "cell" + i;
        // cell.dataset.rowNumber = row.dataset.rowNumber
        row.appendChild(cell);
    }
}

function createPlayerIcon(cellNumber, rowNumber) {
    const playerIcon = document.createElement('div')
    playerIcon.id = 'playerIcon';
    let playerLocation = document.getElementById('row' + rowNumber + 'cell' + cellNumber)
    playerLocation.appendChild(playerIcon);

}

function changePlayerLocation(Right, Down) {
    let rowNumber = playerLocation[1] + Down;
    let cellNumber = playerLocation[0] + Right;
    let mapLocation = (map[rowNumber][cellNumber]);
    if (mapLocation !== 'W') {
        let playerLocationDiv = document.getElementById('row' + rowNumber + 'cell' + cellNumber)
        playerLocationDiv.appendChild(playerIcon);
        playerLocation = [cellNumber, rowNumber];
    }
    if (mapLocation == 'F') {
        youWon();
    }
}
function youWon(){
    let text = document.createTextNode("You won!");
    let element = document.createElement('div');
    element.appendChild(text);
    element.id = "winDiv"
    rowsWrapper.appendChild(element);
}

createRows();
changePlayerLocation(0, 0); //game init: sets the playerIcon and mapLocation to the start position
document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowRight') {
        changePlayerLocation(1,0);
    }
    if (event.key == 'ArrowLeft') {
        changePlayerLocation(-1,0);
    }
    if (event.key == 'ArrowDown') {
        changePlayerLocation(0,1);
    }
    if (event.key == 'ArrowUp') {
        changePlayerLocation(0,-1);
    }
});