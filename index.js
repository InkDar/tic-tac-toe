const gameStatus = document.getElementById("status");
const restartBtn = document.getElementById("restart-Btn");
const grid = Array.from(document.getElementsByClassName("box"));

const winnerBgColor = getComputedStyle(document.body).getPropertyValue("--winning-blocks");

const x = "X";
const o = "O";
let currentPlayer = x;

let currentState = Array(9).fill(null);

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const letTheGameBegin = () => {
  grid.forEach((el) => el.addEventListener("click", clickBox));
};

const clickBox = (el) => {
  const id = el.target.id;
  if (currentState[id]) {
    return alert("Box not empty!");
  }
  currentState[id] = currentPlayer;
  grid[id].innerHTML = currentPlayer;
  const winningCombo = hasWinner();
  if (winningCombo) {
    gameStatus.innerHTML = `${currentPlayer} Has Won!`;
    winningCombo.map((block) => (grid[block].style.backgroundColor = winnerBgColor));
    grid.forEach((el) => el.removeEventListener("click", clickBox));
  }
  currentPlayer = currentPlayer === x ? o : x;
  return;
};

const hasWinner = () => {
  for (const condition of winConditions) {
    let [a, b, c] = condition;
    if (currentState[a] && currentState[a] === currentState[b] && currentState[a] === currentState[c]) {
      return [a, b, c];
    }
  }
  return false;
};

const restart = () => {
  currentState.fill(null);
  grid.forEach((block) => {
    block.innerHTML = "";
    block.style.backgroundColor = "";
  });

  gameStatus.innerHTML = "Tic Tac Toe";
  currentPlayer = x;
  letTheGameBegin();
};

restartBtn.addEventListener("click", restart);

letTheGameBegin();

