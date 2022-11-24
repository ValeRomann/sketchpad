const body = document.querySelector('body');
const mainContainer = document.createElement('div');
mainContainer.setAttribute('class', 'main-container');
body.appendChild(mainContainer);

const sketchPad = document.createElement('div');
sketchPad.setAttribute('class', 'sketchpad');
mainContainer.appendChild(sketchPad);
/* CREATING DIVS
const div1 = document.createElement('div');
sketchPad.appendChild(div1);

const div2 = document.createElement('div');
sketchPad.appendChild(div2);

const div3 = document.createElement('div');
sketchPad.appendChild(div3);

const div4 = document.createElement('div');
sketchPad.appendChild(div4);

const div5 = document.createElement('div');
sketchPad.appendChild(div5);

const div6 = document.createElement('div');
sketchPad.appendChild(div6);

const div7 = document.createElement('div');
sketchPad.appendChild(div7);

const div8 = document.createElement('div');
sketchPad.appendChild(div8);

const div9 = document.createElement('div');
sketchPad.appendChild(div9);

const div10 = document.createElement('div');
sketchPad.appendChild(div10);

const div11 = document.createElement('div');
sketchPad.appendChild(div11);

const div12 = document.createElement('div');
sketchPad.appendChild(div12);

const div13 = document.createElement('div');
sketchPad.appendChild(div13);

const div14 = document.createElement('div');
sketchPad.appendChild(div14);

const div15 = document.createElement('div');
sketchPad.appendChild(div15);

const div16 = document.createElement('div');
sketchPad.appendChild(div16);
*/

createSketchPad(sketchPad, 4);

function createSketchPad(parentElem, widthNum) {    
    for (let i = 1; i <= widthNum * widthNum; i++) {
        let dotDiv = document.createElement('div');
        dotDiv.setAttribute('class', 'dot');
        parentElem.appendChild(dotDiv);
    }
}

