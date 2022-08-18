const form = document.querySelector('form');
const modal = document.getElementById('gridModal');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');
const sizeBtn = document.getElementById('sizeBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const colorBtn = document.getElementById('colorBtn');
const pictureBtn = document.getElementById('pictureBtn');
const gridInput = document.getElementById('gridInput');
const upDown = document.getElementById('cntrl1');
const leftRight = document.getElementById('cntrl2');

const gridSize = {dimension: 0};

//load get size modal
function openDialog(e) {
  if (e.target.id === "sizeBtn") {
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
  }
}

function cancel(e) {
  if(e.target.id === "cancelBtn"){  
    gridInput.value = ''; 
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
  }
}

function getSize(){
  if (gridInput.value <= 0 || gridInput.value > 100){
    gridInput.value = "";
    alert("Please type in a number between 1 and 100");
  } else {
  gridSize.dimension = gridInput.value;
  gridInput.value = "";
  modal.style.visibility = "hidden";
  modal.style.opacity = '0';
  }
}

sizeBtn.addEventListener("click", openDialog);
cancelBtn.addEventListener("click", cancel);
form.addEventListener('submit', createGrid, false);

//create grid size for screen
const grid = document.getElementById('grid');

function createGrid(e){
  e.preventDefault();
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  getSize();
  console.log(gridSize.dimension);
  grid.style.gridTemplateColumns = `repeat(${gridSize.dimension}, 1fr`;
  grid.style.gridTemplateRows = `repeat(${gridSize.dimension}, 1fr)`;
  grid.style.opacity = 1;
  grid.style.boxShadow = "none";
  for( let i = 0; i < gridSize.dimension; i ++) {
    const gridCell = document.createElement('div');
    gridCell.className = "grid-cell";
    gridCell.setAttribute('style', 'height: 100%; width: 100%;  opacity: 1');
    grid.appendChild(gridCell);
    for (let j = 1; j < gridSize.dimension; j++)
    {
    const gridCell = document.createElement('div');
    gridCell.className = "grid-cell";
    gridCell.setAttribute('style', 'height: 100%; width: 100%;  opacity: 1');
    grid.appendChild(gridCell);
    }
  }
}