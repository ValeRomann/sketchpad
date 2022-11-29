let sketchWidth = 8;
let dotColor = 'red';

const body = document.querySelector('body');

const mainContainer = document.createElement('div');
mainContainer.setAttribute('class', 'main-container');
body.appendChild(mainContainer);

const widthButton = document.createElement('button');
widthButton.textContent = 'Set width';
mainContainer.appendChild(widthButton);

const sketchPad = document.createElement('div');
sketchPad.setAttribute('class', 'sketchpad');
mainContainer.appendChild(sketchPad);

createDivGrid(sketchPad, sketchWidth, 1);

widthButton.onclick = () => {
    const sketchWidth = +prompt("input width number", "16");
    if (!sketchWidth) return;
    deleteGrid(sketchPad);
    createDivGrid(sketchPad, sketchWidth, 1);
}

sketchPad.onmousedown = () => fillDots(dotColor);
sketchPad.ontouchstart = () => fillDots(dotColor);
sketchPad.onmouseup = () => stopFillDots(dotColor);
sketchPad.ontouchend = () => stopFillDots(dotColor);

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

function setGrid(parentElem, widthNum) {
    parentElem.style.display = 'grid';
    parentElem.style.gridTemplateColumns = '';
    for (let i = 0; i < widthNum; i++) {
        parentElem.style.gridTemplateColumns += ' auto';
    }
}

function createDivGrid(parentElem, widthNum, borderWidth) {
    setGrid(parentElem, widthNum);
    const windowWidth = window.innerWidth;
    const parentMaxWidth = parseInt(window.getComputedStyle(parentElem).maxWidth);
    for (let i = 1; i <= widthNum * widthNum; i++) {
        let dotDiv = document.createElement('div');
        dotDiv.setAttribute('class', 'dot');
        dotDiv.style.border = borderWidth + 'px solid grey';
        if (windowWidth < parentMaxWidth) {
            dotDiv.style.padding = (windowWidth / widthNum / 2 - borderWidth * 2) + 'px';
        } else { 
            dotDiv.style.padding = (parentMaxWidth / widthNum / 2 - borderWidth * 2) + 'px';
        }
        parentElem.appendChild(dotDiv);
    }
}