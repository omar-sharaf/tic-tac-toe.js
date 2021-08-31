import "./styles.css";
var gridItems = document.querySelectorAll(".grid-item");

//used as the board, where the x's and o's are input
var board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];

//used to pick x player or o player, based on if the number is
//even or odd
var player = 1;

//win variable for win states
var win = false;

//displays board on the grid
function displayBoard() {
  // document.getElementById("1").innerHTML = board[0];
  // document.getElementById("2").innerHTML = board[1];
  // document.getElementById("3").innerHTML = board[2];
  // document.getElementById("4").innerHTML = board[3];
  // document.getElementById("5").innerHTML = board[4];
  // document.getElementById("6").innerHTML = board[5];
  // document.getElementById("7").innerHTML = board[6];
  // document.getElementById("8").innerHTML = board[7];
  // document.getElementById("9").innerHTML = board[8];
  gridItems.forEach(function (item) {
    var itemNum = parseInt(item.id);
    document.getElementById(item.id).innerHTML = board[itemNum];
  });
}

//changes the player each time the grid is pressed
function changePlayer() {
  player = player + 1;
}

// SRP -- Single Responsibility Pattern
// add(x, y)

//changes a grid in the board to an x or an o depending on
// the player value
function changeBoard(index) {
  var indexNum = parseInt(index);
  console.log("player: ", player);
  //makes it so that if there's already an x or an o
  // on the grid you're trying to change it won't put an x or an o
  //also resets the player count for that turn
  if (board[indexNum] === "o" || board[indexNum] === "x") {
    //  player = player - 1;
    return false;
  }
  //checks to see if player is even, and if it is,
  //places an o
  else if (player % 2 === 0) {
    board[indexNum] = "o";
  }
  //if player is odd places an x
  else {
    board[indexNum] = "x";
  }
  return true;
}

function displayWinOrTie(whoWon) {
  document.getElementById("win").innerHTML =
    whoWon === "tie" ? "Game is tied!" : whoWon + " won";
  win = true;
}

function clearWonDisplay() {
  document.getElementById("win").innerHTML = "";
}

const checkWinStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8]
];

//runs every time grid pressed to see if there's a
//win state e.g xxx or ooo
function checkWon() {
  if (win) {
    return;
  }

  for (let i = 0; i < checkWinStates.length; i++) {
    let row = checkWinStates[i];

    let rowWonByX = row.every((rowIndex) => {
      return board[rowIndex] === "x";
    });

    if (rowWonByX) {
      displayWinOrTie("x");
      break;
    }

    let rowWonByO = row.every((rowIndex) => {
      return board[rowIndex] === "o";
    });

    if (rowWonByO) {
      displayWinOrTie("o");
      break;
    }
  }

  let isTie = board.every((value) => value !== "_");
  if (isTie && !win) {
    displayWinOrTie("tie");
  }
}

//restarts game, only works once. Still testing for why. After some testing I've found
//that you if you immediately delete the y after inputting it in and before pressing
//the grid. I don't know why yet.
function restart(event) {
  if (win === true) {
    if (event.target.value === "restart") {
      board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
      clearWonDisplay();
      win = false;
    }
  }
}

//assigns grid-item to the gridItems variable to be used later
console.log(gridItems);

//a for each loop that runs an event listener for each item
//in the grid, assigning the data-index attribute to teh
//item variable and running the changeBoard, changePlayer, displayBoard and checkWon
gridItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    console.log(event.target);
    var index = item.getAttribute("data-index");
    console.log(index);
    let turnCompleted = changeBoard(index);
    if (turnCompleted) {
      changePlayer(index);
    }
    displayBoard(index);
    checkWon(event);
    console.log(index, board, win);
  });
});

//the restart input, an input event listener triggering on every change
//to the restart input, triggering the restart function and the displayBoard function
const searchInput = document.querySelector("#input");
searchInput.addEventListener("click", function (event) {
  restart(event);
  console.log(event.target.value);
  gridItems.forEach(function (item) {
    var index = item.getAttribute("data-index");
    displayBoard(index);
  });
});
