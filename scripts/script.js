const body = document.querySelector('body');

const mainContainer = document.createElement('div');
mainContainer.setAttribute('class', 'main-container');
body.appendChild(mainContainer);

const controlPanel = document.createElement('div');
mainContainer.setAttribute('class', 'control-panel');
mainContainer.appendChild(controlPanel);

const inputColor = document.createElement('input');
inputColor.type = 'color';
controlPanel.appendChild(inputColor);
inputColor.value = setRandomColor();

const widthButton = document.createElement('button');
widthButton.textContent = 'Set width';
controlPanel.appendChild(widthButton);

const switchBorderButton = document.createElement('button');
switchBorderButton.textContent = 'Enable grid';
controlPanel.appendChild(switchBorderButton);

const multiColorButton = document.createElement('button');
multiColorButton.textContent = 'Multi color mode';
controlPanel.appendChild(multiColorButton);

const brightenButton = document.createElement('button');
brightenButton.textContent = 'Brighten';
controlPanel.appendChild(brightenButton);

const darkenButton = document.createElement('button');
darkenButton.textContent = 'Darken';
controlPanel.appendChild(darkenButton);

const cleanAllButton = document.createElement('button');
cleanAllButton.textContent = 'Clean pad';
controlPanel.appendChild(cleanAllButton);

const eraseByDotButton = document.createElement('button');
eraseByDotButton.textContent = 'Eraser';
controlPanel.appendChild(eraseByDotButton);

const sketchPad = document.createElement('div');
sketchPad.setAttribute('class', 'sketchpad');
mainContainer.appendChild(sketchPad);

let sketchWidth = 8;
let dotColor = inputColor.value;
let dotBorderWidth = 0;
let eraserActive = false;
let multiColorMode = false;
let brighten = false;
let darken = false;

createDivGrid(sketchPad, sketchWidth, dotBorderWidth);

sketchPad.onmousedown = (e) => {
    changeBGC(e.target, dotColor);
    fillDots(dotColor);
}
sketchPad.ontouchstart = (e) => {
    fillDots(dotColor);
    target.ontouchmove = () => changeBGC(dot, color);
}
sketchPad.onmouseup = () => stopFillDots(dotColor);
sketchPad.ontouchend = () => stopFillDots(dotColor);


widthButton.onclick = () => {
    let input = +prompt("input width number", "16");
    if (!input || input < 1) return;
    if (input > 100) input = 100;
    sketchWidth = input;  
    deleteGrid(sketchPad);
    createDivGrid(sketchPad, sketchWidth, dotBorderWidth);
}

switchBorderButton.onclick = (e) => {
    if (dotBorderWidth === 0) dotBorderWidth = 1;
    else dotBorderWidth = 0;
    changeButtonStateColor(e, dotBorderWidth);
    switchBorder();
};

cleanAllButton.onclick = () => {
    const dots = document.getElementsByClassName('dot');
    for (let dot of dots) {
        dot.style.backgroundColor = 'transparent';
    }
}

eraseByDotButton.onclick = (e) => {
    eraserActive = !eraserActive;
    changeButtonStateColor(e, eraserActive);
}

multiColorButton.onclick = (e) => {
    multiColorMode = !multiColorMode;
    changeButtonStateColor(e, multiColorMode);
};

function changeButtonStateColor(e, mode) {
    if (mode) e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
    else e.target.style.backgroundColor = 'transparent';
}

function setRandomColor() {
    return '#' + (Math.floor(Math.random() * 255)).toString(16) +
                 (Math.floor(Math.random() * 255)).toString(16) +
                 (Math.floor(Math.random() * 255)).toString(16);
}

function switchBorder() {
    const dots = document.getElementsByClassName('dot');
    for (let dot of dots) {
        dot.style.borderWidth = dotBorderWidth + 'px';
        setPadding(sketchPad, dot);
    }
}

function deleteGrid(parentElem) {
    parentElem.innerHTML = '';
}

function fillDots(color, target) {
    const dots = document.getElementsByClassName('dot');
    for (let dot of dots) {
        dot.onclick = () => changeBGC(dot, color);
        dot.onmouseover = () => changeBGC(dot, color);
        dot.ontouchmove = () => changeBGC(dot, color);
    }
}

function stopFillDots() {
    const dots = document.getElementsByClassName('dot');
    for (let dot of dots) {
        dot.onmouseover = '';
        dot.ontouchmove = '';
    }
}

function changeBGC(elem, color) {
    if (eraserActive) color = 'transparent';
    else if (multiColorMode) color = setRandomColor();
    elem.style.backgroundColor = color;
}

function setGrid(parentElem, sketchWidth) {
    parentElem.style.display = 'grid';
    parentElem.style.gridTemplateColumns = '';
    for (let i = 0; i < sketchWidth; i++) {
        parentElem.style.gridTemplateColumns += ' auto';
    }
}

function createDivGrid(parentElem, sketchWidth, dotBorderWidth) {
    setGrid(parentElem, sketchWidth);
    for (let i = 1; i <= sketchWidth * sketchWidth; i++) {
        let dotDiv = document.createElement('div');
        dotDiv.setAttribute('class', 'dot');
        dotDiv.style.border = dotBorderWidth + 'px solid lightgrey';
        setPadding(parentElem, dotDiv);
        parentElem.appendChild(dotDiv);
    }
}

function countPadding(viewWidth, borderWidth, sketchWidth) {
    return viewWidth / sketchWidth / 2 - borderWidth  + 'px';
}

function setPadding(parentElem, elem) {
    const windowWidth = window.innerWidth;
    const parentMaxWidth = parseInt(window.getComputedStyle(parentElem).maxWidth);
    if (windowWidth < parentMaxWidth) {
        elem.style.padding = countPadding(windowWidth, dotBorderWidth, sketchWidth);
    } else { 
        elem.style.padding = countPadding(parentMaxWidth, dotBorderWidth, sketchWidth);
    }
}