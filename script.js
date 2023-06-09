const CIRCLECLASS = "circle";
const XCLASS = "x";
const WINNING_POSITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartButton = document.getElementById('restartButton')
let circleTurn ;

startGame();
restartButton.addEventListener('click',startGame);

function startGame() {
    circleTurn=false;
  cellElements.forEach((cell) => {
    cell.classList.remove(XCLASS);
    cell.classList.remove(CIRCLECLASS);
    cell.removeEventListener("click",handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  // place the mark
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLECLASS : XCLASS;
  placeMark(cell, currentClass);
  // check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    // check for draw
    // switch turns
    switchTurn();
    setBoardHover();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = `Draw!`;
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurn() {
  circleTurn = !circleTurn;
}

function setBoardHover() {
  board.classList.remove(CIRCLECLASS);
  board.classList.remove(XCLASS);
  if (circleTurn) {
    board.classList.add(CIRCLECLASS);
  } else {
    board.classList.add(XCLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_POSITIONS.some((position) => {
    return position.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return (cell.classList.contains(XCLASS)|| cell.classList.contains(CIRCLECLASS));
    })

}