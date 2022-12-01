const body = document.querySelector('body');

const mainContainer = document.createElement('div');
mainContainer.setAttribute('class', 'main-container');
body.appendChild(mainContainer);

const controlPanel = document.createElement('div');
controlPanel.setAttribute('class', 'control-panel');
mainContainer.appendChild(controlPanel);

const sketchPad = document.createElement('div');
sketchPad.setAttribute('class', 'sketchpad');
mainContainer.appendChild(sketchPad);

const colorButtonsDiv = document.createElement('div');
colorButtonsDiv.setAttribute('class', 'buttons-group');
controlPanel.appendChild(colorButtonsDiv);

const inputColor = document.createElement('input');
inputColor.type = 'color';
inputColor.value = setRandomColor();
colorButtonsDiv.appendChild(inputColor);

const multiColorButton = document.createElement('button');
multiColorButton.textContent = 'Multi color mode';
colorButtonsDiv.appendChild(multiColorButton);

const brightenButton = document.createElement('button');
brightenButton.textContent = 'Brighten';
colorButtonsDiv.appendChild(brightenButton);

const darkenButton = document.createElement('button');
darkenButton.textContent = 'Darken';
colorButtonsDiv.appendChild(darkenButton);

const cleanButtonsDiv = document.createElement('div');
cleanButtonsDiv.setAttribute('class', 'buttons-group');
controlPanel.appendChild(cleanButtonsDiv);

const eraseByDotButton = document.createElement('button');
eraseByDotButton.textContent = 'Eraser';
cleanButtonsDiv.appendChild(eraseByDotButton);

const cleanAllButton = document.createElement('button');
cleanAllButton.textContent = 'Clean pad';
cleanButtonsDiv.appendChild(cleanAllButton);

const gridSettingsDiv = document.createElement('div');
gridSettingsDiv.setAttribute('class', 'buttons-group');
controlPanel.appendChild(gridSettingsDiv);

const switchBorderButton = document.createElement('button');
switchBorderButton.textContent = 'Enable grid';
gridSettingsDiv.appendChild(switchBorderButton);

const inputWidthDiv = document.createElement('div');
gridSettingsDiv.appendChild(inputWidthDiv);

const widthInput = document.createElement('input');
widthInput.setAttribute('type', 'range');
widthInput.setAttribute('min', '1');
widthInput.setAttribute('max', '32');
widthInput.setAttribute('id', 'width-range');
widthInput.value = '8';
inputWidthDiv.appendChild(widthInput);

const widthLabel = document.createElement('label');
widthLabel.setAttribute('for', 'width-range');
widthLabel.textContent = 'Width: 8 X 8 cells';
inputWidthDiv.appendChild(widthLabel);

let sketchWidth = widthInput.value;
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
    if ((brighten || darken)) currentColor = changeBrightness(palletColor);
    changeBGC(e.target, currentColor);
    fillDots(currentColor);
}
sketchPad.ontouchstart = (e) => {
    fillDots(dotColor);
    e.target.ontouchmove = () => changeBGC(dot, color);
}
sketchPad.onmouseup = () => stopFillDots(dotColor);
sketchPad.ontouchend = () => stopFillDots(dotColor);

inputColor.onchange = () => {
    darken = false;
    brighten = false;
    multiColorMode = false;
    changeButtonStateColor(brightenButton, brighten);
    changeButtonStateColor(darkenButton, darken);
    changeButtonStateColor(multiColorButton, multiColorMode);
    
}

widthInput.onchange = (e) => {
    sketchWidth = e.target.value;
    widthLabel.textContent = 'Width: ' + sketchWidth + ' X ' + sketchWidth + ' cells';
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
    if (multiColorMode) {
        darken = false;
        brighten = false;
        changeButtonStateColor(brightenButton, brighten);
        changeButtonStateColor(darkenButton, darken);
    }
}

brightenButton.onclick = (e) => {
    brighten = !brighten
    changeButtonStateColor(e.target, brighten);
    if (brighten){
        darken = false;
        multiColorMode = false;
        changeButtonStateColor(darkenButton, darken);
        changeButtonStateColor(multiColorButton, multiColorMode);
    }
}

darkenButton.onclick = (e) => {
    darken = !darken
    changeButtonStateColor(e.target, darken);
    if (darken){
        brighten = false;
        multiColorMode = false;
        changeButtonStateColor(brightenButton, brighten);
        changeButtonStateColor(multiColorButton, multiColorMode);
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
    if (eraserActive) color = 'white';
    else {
        if ((brighten || darken)) {
            color = changeBrightness(currentElemColor);
        } 
        if (multiColorMode) color = setRandomColor()
    };
    elem.style.backgroundColor = color;
}

function convertComputedRGBColorToRGBColorArray(colorString){
    return colorString.slice(4,-1).split(', ')
}
/* RESERVE FUCNCTION
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
            if (processColorValueArray[i] <= 235) processColorValueArray[i] += 20;
            else processColorValueArray[i] = 255;
        } else {
            if (darken) {
                if (processColorValueArray[i] >= 20) processColorValueArray[i] -= 20;
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