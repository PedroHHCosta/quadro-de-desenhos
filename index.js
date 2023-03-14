let container = document.querySelector(".container");
let gridbutton = document.getElementById("submit-grid");
let cleargridbutton = document.getElementById("clear-grid");
let gridwidth = document.getElementById("width-range");
let gridheight = document.getElementById("height-range");
let colorbutton = document.getElementById("color-input");
let erasebutton = document.getElementById("erase-button");
let paintbutton = document.getElementById("paint-button");
let widthvalue = document.getElementById("width-value");
let heightvalue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"

    },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

gridbutton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridheight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridrow");

    for(let j=0; j < gridwidth.value; j++){
        count+=2;
        let col = document.createElement("div")
        col.classList.add("gridcol");
        col.setAttribute("id",`gridcol${count}`);
        col.addEventListener(events[deviceType].down, () => {
            draw = true
            if (erase) {
                col.style.backgroundColor = "transparent";
            } else {
                col.style.backgroundColor = colorbutton.value;
            }
        });
        col.addEventListener(events[deviceType].move, (e) => {
            let elementId = document.elementFromPoint(
                !isTouchDevice() ? e.clientX : e.touches[0].
                clientX,
                !isTouchDevice() ? e.clientY : e.touches[0].
                clientY,
            ).id;
            checker(elementId);
        });

        col.addEventListener(events[deviceType].up, () => {
            draw = false;
        });
        div.appendChild(col);
    }

    container.appendChild(div);

    
    }
});

function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if(elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorbutton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "trasnparent";
            }
        }
    
    });
}


cleargridbutton.addEventListener("click", () => {
    container.innerHTML = "";
});

erasebutton.addEventListener("click", () => {
    erase = true;
});

paintbutton.addEventListener("click", () => {
    erase = false;
});

gridwidth.addEventListener("input", () => {
    widthvalue.innerHTML = gridwidth.value < 9 ? `0${gridwidth.value}` : gridwidth.value;
});
gridheight.addEventListener("input", () => {
    heightvalue.innerHTML = gridheight.value < 9 ? `0${gridheight.value}` : gridheight.value;
});
 window.onload = () =>{
    gridheight.value = 0;
    gridwidth.value = 0;
 };

