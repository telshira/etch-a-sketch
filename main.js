const form = document.querySelector('form');
const modal = document.getElementById('gridModal');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');
const sizeBtn = document.getElementById('sizeBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const colorBtn = document.getElementById('colorBtn');
const randomBtn = document.getElementById('randomBtn');
const gridInput = document.getElementById('gridInput');
const upDown = document.getElementById('cntrl1');
const leftRight = document.getElementById('cntrl2');

const gridProp= {dimension: 0, color: '#000000'};

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
  gridProp.dimension = gridInput.value;
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
  console.log(gridProp.dimension);
  grid.style.gridTemplateColumns = `repeat(${gridProp.dimension}, 1fr`;
  grid.style.gridTemplateRows = `repeat(${gridProp.dimension}, 1fr)`;
  grid.style.opacity = 1;
  grid.style.boxShadow = "none";
  for( let i = 0; i < gridProp.dimension; i ++) {
    const gridCell = document.createElement('div');
    gridCell.className = "grid-cell";
    gridCell.setAttribute('style', 'height: 100%; width: 100%;  opacity: 1');
    grid.appendChild(gridCell);
    for (let j = 1; j < gridProp.dimension; j++)
    {
    const gridCell = document.createElement('div');
    gridCell.className = "grid-cell";
    gridCell.setAttribute('style', 'height: 100%; width: 100%;  opacity: 1');
    grid.appendChild(gridCell);
    }
  }
}

const eraser = `url('eraser.png') 10 30, crosshair`;

let isEraser = false;
let isRandom = false;

function color(e){
  if (!isEraser) {
    if (e.target.classList.contains("grid-cell")) {
      e.target.style.background = `${gridProp.color}`;
    }
  }  
}

function erase(e){
  if (e.target.classList.contains("grid-cell")) {
     e.target.style.background = "lightgray";
  }
}

function toEraser(){
  document.body.style.cursor = eraser;
  isEraser = true;
}

function clrScreen() {
  const screenCells = document.querySelectorAll('div.grid-cell');
  screenCells.forEach(cell => cell.style.background = "lightgray");
}

clearBtn.addEventListener('click', clrScreen);
grid.addEventListener("mousedown", (e) => {
  e.preventDefault();
  if(isEraser) {
    grid.addEventListener("mouseover", erase);
  } else if (isRandom) {
    grid.addEventListener("mouseover", randomColor);
  } else {
    grid.addEventListener("mouseover", color);
  }
});
grid.addEventListener("mouseup", () => {
  if(isEraser) {
    grid.removeEventListener("mouseover", erase);
  } else if (isRandom) {
    grid.removeEventListener("mouseover", randomColor);
  } else {
    grid.removeEventListener("mouseover", color);
  }
});
grid.addEventListener("click", (e) =>{
  if(isEraser){
    erase(e);
  } else if (isRandom) {
    randomColor(e);
  } else {
    color(e);
  }
})
eraserBtn.addEventListener('click', toEraser);

const cancelBtn2 = document.getElementById('cancelBtn2');
const submitBtn2 = document.getElementById('submitBtn2');
const colorForm = document.getElementById('colorform');
const colorModal = document.getElementById('colorModal');
const colorInput = document.getElementById('colorpicker');

function openPicker(){
  colorModal.style.visibility = "visible";
  colorModal.style.opacity = "1";
}

function cancelPick(e) {
  e.preventDefault();
  if(e.target.id === "cancelBtn2"){
    isEraser = false;
    document.body.style.cursor = null;
    colorInput.value = gridProp.color; 
    colorModal.style.visibility = "hidden";
    colorModal.style.opacity = "0";
  }
}

function getColor(e){
  e.preventDefault();
  isRandom = false;
  gridProp.color = colorInput.value;
  colorModal.style.visibility = "hidden";
  colorModal.style.opacity = "0";
  document.body.style.cursor = null;
  isEraser = false;
}

function randomColor(e){
  if (!isEraser) {
    if (e.target.classList.contains("grid-cell")) {
      let r = Math.floor(Math.random()*256);
      let g = Math.floor(Math.random()*256);
      let b = Math.floor(Math.random()*256);
      e.target.style.background = `rgb(${r}, ${g}, ${b})`;
    }
  }  
}

colorBtn.addEventListener('click', openPicker);
cancelBtn2.addEventListener('click', cancelPick);
colorForm.addEventListener('submit', getColor);
randomBtn.addEventListener('click', () => { 
  isRandom = true;
  document.body.style.cursor = null;
  isEraser = false;
});