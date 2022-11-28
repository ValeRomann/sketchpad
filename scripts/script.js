let sketchWidth = 32;
let dotColor = 'black';

const body = document.querySelector('body');

const mainContainer = document.createElement('div');
mainContainer.setAttribute('class', 'main-container');
body.appendChild(mainContainer);

const sketchPad = document.createElement('div');
sketchPad.setAttribute('class', 'sketchpad');
mainContainer.appendChild(sketchPad);

createDivGrid(sketchPad, sketchWidth);

sketchPad.onmousedown = () => fillDots(dotColor);
sketchPad.onmouseup = () => stopFillDots(dotColor);


function fillDots(color) {
    const dots = document.getElementsByClassName('dot');
    for (let dot of dots) {
        dot.onmouseover = () => changeBGC(dot, color);
    }
}

function stopFillDots(color) {
    const dots = document.getElementsByClassName('dot');
    for (let dot of dots) {
        dot.onmouseover = '';
    }
}

function changeBGC(elem, color) {
    elem.style.backgroundColor = color;
}

function setGrid(parentElem, widthNum) {
    parentElem.style.display = 'grid';

    for (let i = 0; i < widthNum; i++) {
        parentElem.style.gridTemplateColumns += ' auto';
    }
}

function createDivGrid(parentElem, widthNum) {    
    setGrid(parentElem, widthNum);

    for (let i = 1; i <= widthNum * widthNum; i++) {
        let dotDiv = document.createElement('div');
        dotDiv.setAttribute('class', 'dot');
        parentElem.appendChild(dotDiv);
    }
}