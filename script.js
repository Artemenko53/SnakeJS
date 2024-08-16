const DEFAULT_SNAKE = [0, 1, 2, 3, 4];
const RESTART_BTN = document.querySelector(".restart");
let cells = null;
let snake = DEFAULT_SNAKE;
let direction = "right";
let interval = 0;

//  МАЛЮЄМО ІГРОВУ ДОШКУ
function drawGameBoard() {
  const board = document.querySelector(".gameBoard");
  for (let i = 0; i <= 99; i++) {
    const square = document.createElement("div");
    square.classList.add("cell");
    board.appendChild(square);
  }
  cells = document.querySelectorAll(".cell");
}

// МАЛЮЄМО ЗМІЮ
function drawSnake(snakeArr = DEFAULT_SNAKE) {
  snakeArr.forEach(
    (cell) => (cells[cell].style.backgroundImage = "url('./img/snake.jpg')")
  );
}

// МАЛЮЄМО ЯБЛУКО
function drawFood() {
  cells[68].style.backgroundImage = "url('./img/green-apple.png')";
  cells[68].classList.add("food");
}

// ПЕРЕВІРКА НА ЗІТКНЕННЯ
function crash() {
  const head = snake[snake.length - 1];
  const showModal = () => {
    document.querySelector("dialog").open = true;
    clearInterval(interval);
  };
  const checkHead = (n, factor, size) => {
    for (let i = n; i < size; i = i + factor) {
      if (head === i) {
        showModal();
      }
    }
  };

  switch (direction) {
    case "right": {
      checkHead(10, 10, 101);
      break;
    }
    case "bottom": {
      checkHead(91, 1, 101);
      break;
    }
    case "left": {
      checkHead(1, 10, 92);
      break;
    }
    case "up": {
      checkHead(1, 1, 11);
      break;
    }
  }
}

// РУХ ЗМІЇ
function moveSnake() {
  switch (direction) {
    case "right": {
      snake = snake.map((el) => {
        cells[el].style.backgroundImage = "none";
        return ++el;
      });
      crash();
      drawSnake(snake);
      break;
    }
    case "bottom": {
      crash();
      drawSnake(snake);
      break;
    }
    case "left": {
      break;
    }
    case "up": {
      break;
    }
  }
}

// ВСТАНОВЛЮЄМО ЗМІНУ НАПРЯМКУ РУХУ ЗМІЇ
function changeDirection() {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight": {
        direction = "right";
        break;
      }
      case "ArrowLeft": {
        direction = "left";
        break;
      }
      case "ArrowDown": {
        direction = "bottom";
        break;
      }
      case "ArrowUp": {
        direction = "top";
        break;
      }
    }
  });
}

// РЕСТАРТУЄМО ГРУ
function restartGame() {
  cells.forEach((cell) => (cell.style.backgroundImage = "none"));
  snake = DEFAULT_SNAKE;
  drawFood();
  clearInterval(interval);
  interval = 0;
  interval = setInterval(moveSnake, 1000);
}

//СТАРТУЄМО ГРУ
function startGame(e) {
  drawGameBoard();
  drawSnake();
  drawFood();
  interval = setInterval(moveSnake, 1000);
  changeDirection();
  e.target.style.display = "none";
}

RESTART_BTN.addEventListener("click", restartGame);
document.querySelector(".button")?.addEventListener("click", (e) => {
  startGame(e);
  RESTART_BTN.style.display = "inline";
});
