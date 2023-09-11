const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

// Define the game constants
const GRID_SIZE = 20;
const GRID_WIDTH = canvas.width / GRID_SIZE;
const GRID_HEIGHT = canvas.height / GRID_SIZE;

// Initialize the snake
let snake = [{ x: 10, y: 10 }];
let dx = 1;
let dy = 0;
let foodX, foodY;
let score = 0;

// Initialize the game loop
function main() {
  if (checkCollision()) {
    gameOver();
    return;
  }

  clearCanvas();
  drawFood();
  moveSnake();
  drawSnake();
  checkFoodCollision();
  scoreElement.textContent = score;

  setTimeout(main, 100);
}

// Generate a random position for the food
function generateFood() {
  foodX = Math.floor(Math.random() * GRID_WIDTH);
  foodY = Math.floor(Math.random() * GRID_HEIGHT);
}

// Check if the snake has collided with the food
function checkFoodCollision() {
  if (snake[0].x === foodX && snake[0].y === foodY) {
    snake.push({});
    score++;
    generateFood();
  }
}

// Check if the snake has collided with the wall or itself
function checkCollision() {
  const head = snake[0];
  return (
    head.x < 0 ||
    head.x >= GRID_WIDTH ||
    head.y < 0 ||
    head.y >= GRID_HEIGHT ||
    snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  );
}

// Handle game over
function gameOver() {
  alert("Game over! Your score: " + score);
  location.reload(); // Refresh the page to restart the game
}

// Clear the canvas
function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake on the canvas
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  });
}

// Draw the food on the canvas
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(foodX * GRID_SIZE, foodY * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

// Move the snake
function moveSnake() {
  const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(newHead);
  if (!checkFoodCollision()) {
    snake.pop();
  }
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (dy !== 1) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy !== -1) {
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx !== 1) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx !== -1) {
        dx = 1;
        dy = 0;
      }
      break;
  }
});

// Initialize the game
generateFood();
main();
