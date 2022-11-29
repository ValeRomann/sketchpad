let sketchWidth = 12;
let dotColor = 'red';
let dotBorderWidth = 1;

const body = document.querySelector('body');

const mainContainer = document.createElement('div');
mainContainer.setAttribute('class', 'main-container');
body.appendChild(mainContainer);

const controlPanel = document.createElement('div');
mainContainer.setAttribute('class', 'control-panel');
mainContainer.appendChild(controlPanel);

const widthButton = document.createElement('button');
widthButton.textContent = 'Set width';
controlPanel.appendChild(widthButton);

const switchBorderButton = document.createElement('button');
switchBorderButton.textContent = 'Switch border';
controlPanel.appendChild(switchBorderButton);

const sketchPad = document.createElement('div');
sketchPad.setAttribute('class', 'sketchpad');
mainContainer.appendChild(sketchPad);

createDivGrid(sketchPad, sketchWidth, dotBorderWidth);


widthButton.onclick = () => {
    const input = +prompt("input width number", "16");
    if (!input) return;
    sketchWidth = input;  
    deleteGrid(sketchPad);
    createDivGrid(sketchPad, sketchWidth, dotBorderWidth);
}

switchBorderButton.onclick = () => switchBorder();

sketchPad.onmousedown = () => fillDots(dotColor);
sketchPad.ontouchstart = () => fillDots(dotColor);
sketchPad.onmouseup = () => stopFillDots(dotColor);
sketchPad.ontouchend = () => stopFillDots(dotColor);


function switchBorder() {
    if (dotBorderWidth === 0) dotBorderWidth = 1;
    else dotBorderWidth = 0;
    const dots = document.getElementsByClassName('dot');
    for (let dot of dots) {
        dot.style.borderWidth = dotBorderWidth + 'px';
        setPadding(sketchPad, dot);
    }
}

function deleteGrid(parentElem) {
    parentElem.innerHTML = '';
}

function fillDots(color) {
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