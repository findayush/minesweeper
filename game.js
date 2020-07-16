isMine = (row, col, arr) => {
  if (row < 0 || col < 0) return 0;
  if (row >= arr.length) return 0;
  if (col > arr[row].length) return 0;
  if (arr[row][col] === "mine") return 1;
  return 0;
};

minesMatrix = (rows, cols, mines) => {
  let matrix = new Array(rows);
  for (let i = 0, l = matrix.length; i < l; i++) {
    matrix[i] = new Array(cols);
  }
  for (let mine = 0; mine < mines; mine++) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    matrix[r][c] = "mine";
  }

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (matrix[x][y] !== "mine") {
        let count = 0;
        if (isMine(x, y, matrix) !== 1) {
          count += isMine(x - 1, y - 1, matrix);
          count += isMine(x - 1, y, matrix);
          count += isMine(x - 1, y + 1, matrix);
          count += isMine(x, y - 1, matrix);
          count += isMine(x, y + 1, matrix);
          count += isMine(x + 1, y - 1, matrix);
          count += isMine(x + 1, y, matrix);
          count += isMine(x + 1, y + 1, matrix);
        }
        matrix[x][y] = count;
      }
    }
  }
  return matrix;
};

createMatrix = () => {
  const matrixContainer = document.querySelector(".matrixContainer");
  matrixContainer.innerHTML = "";

  let rows = parseInt(document.getElementById("rows").value);
  let cols = parseInt(document.getElementById("columns").value);
  let mines = parseInt(document.getElementById("mines").value);

  if (rows < 1 || cols < 1 || mines < 1) {
    alert("Enter Larger Values");
  } else if (rows > 15 || cols > 15 || mines > rows * cols) {
    alert("Enter Smaller Values");
  } else if (rows <= 15 && cols <= 15 && mines < rows * cols) {
    let arr = minesMatrix(rows, cols, mines);

    console.table(arr);
    for (let i = 0, len = arr.length; i < len; i++) {
      const row = document.createElement("div");
      row.className = "matRow";
      for (let j = 0, l = arr[i].length; j < l; j++) {
        const col = document.createElement("div");
        col.className = "matCol covered";
        if (arr[i][j] === "mine") {
          col.classList.add("mines");
          col.textContent = `\u{2600}`;
        } else {
          col.textContent = arr[i][j];
        }
        row.appendChild(col);
      }
      document.querySelector(".matrixContainer").appendChild(row);
    }
  }
};

document.addEventListener("DOMContentLoaded", createMatrix);

document
  .querySelector(".matrixContainer")
  .addEventListener("click", function(e) {
    e.target.classList.remove("covered");

    if (e.target && e.target.className == "matCol mines") {
      let cells = document.getElementsByClassName("matCol");
      console.log(cells);
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("covered");
      }
      alert("You Lost");
    }
  });
