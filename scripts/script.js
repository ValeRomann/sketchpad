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

const eraseByDotButton = document.createElement('button');
eraseByDotButton.textContent = 'Eraser';
controlPanel.appendChild(eraseByDotButton);

const cleanAllButton = document.createElement('button');
cleanAllButton.textContent = 'Clean pad';
controlPanel.appendChild(cleanAllButton);

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
    let palletColor = inputColor.value;
    let currentColor = palletColor;
    if ((brighten || darken) && !multiColorMode) currentColor = changeBrightness(palletColor);
    changeBGC(e.target, currentColor);
    fillDots(currentColor);
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
    changeButtonStateColor(e.target, dotBorderWidth);
    switchBorder();
}

multiColorButton.onclick = (e) => {
    multiColorMode = !multiColorMode;
    changeButtonStateColor(e.target, multiColorMode);
}

brightenButton.onclick = (e) => {
    brighten = !brighten
    changeButtonStateColor(e.target, brighten);
    if (brighten) if (darken) {
        darken = !darken
        changeButtonStateColor(darkenButton, darken);
    }
}

darkenButton.onclick = (e) => {
    darken = !darken
    changeButtonStateColor(e.target, darken);
    if (darken) if (brighten) {
        brighten = !brighten
        changeButtonStateColor(brightenButton, brighten);
    }
}

eraseByDotButton.onclick = (e) => {
    eraserActive = !eraserActive;
    changeButtonStateColor(e.target, eraserActive);
}

cleanAllButton.onclick = () => {
    const dots = document.getElementsByClassName('dot');
    for (let dot of dots) {
        dot.style.backgroundColor = 'white';
    }
}

function changeButtonStateColor(e, mode) {
    if (mode) e.style.backgroundColor = 'rgba(0,0,0,0.05)';
    else e.style.backgroundColor = 'transparent';
}

function setRandomColor() {
    return '#' +
        fixRGBColorLength((Math.floor(Math.random() * 255)).toString(16)) +
        fixRGBColorLength((Math.floor(Math.random() * 255)).toString(16)) +
        fixRGBColorLength((Math.floor(Math.random() * 255)).toString(16));
}

function fixRGBColorLength(colorString) {
    if (colorString.length < 2) return '0' + colorString;
    return colorString;
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
    let currentElemColor = window.getComputedStyle(elem).backgroundColor;
    if ((brighten || darken) && !multiColorMode) {
        color = changeBrightness(currentElemColor);
    }    
    if (eraserActive) color = 'white';
    else if (multiColorMode) color = setRandomColor();
    elem.style.backgroundColor = color;
}

function convertComputedRGBColorToRGBColorArray(colorString){
    return colorString.slice(4,-1).split(', ')
}
/*
function convertHexColorToRGBColorArray() {
    let processColorValue = color.slice(1);
    const processColorValueArray = [
        parseInt(processColorValue.slice(0,2), 16),
        parseInt(processColorValue.slice(2,4), 16),
        parseInt(processColorValue.slice(4), 16)
    ];
    return processColorValueArray;
}
*/
function changeBrightness(color) {
    if (eraserActive || multiColorMode) return;
    
    const processColorValueArray = convertComputedRGBColorToRGBColorArray(color);
    for (let i  = 0; i < processColorValueArray.length; i++) {
        processColorValueArray[i] = +processColorValueArray[i];
        if (brighten) {
            if (processColorValueArray[i] <= 230) processColorValueArray[i] += 25;
            else processColorValueArray[i] = 255;
        } else {
            if (darken) {
                if (processColorValueArray[i] >= 25) processColorValueArray[i] -= 25;
                else processColorValueArray[i] = 0;
            }
        }     
        
        processColorValueArray[i] = fixRGBColorLength(processColorValueArray[i].toString(16));
    }
    return '#' + processColorValueArray.join('');
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
        dotDiv.style.backgroundColor = 'white';
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