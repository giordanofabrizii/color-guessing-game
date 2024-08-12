let selectedIndex = 0;
let tryIndex = 1;
const rows = document.querySelectorAll(".game > .row:not(.control)");
let colorsInput = [];
let combination = randomCombination();

// function to change the selected input
const inputEls = document.querySelectorAll(".control > .color")
inputEls.forEach((inputEl, index) => {
    inputEl.addEventListener('click', () => {
        inputEls[selectedIndex].classList.remove("selected");
        selectedIndex = index;
        inputEls[selectedIndex].classList.add("selected")
    })
});

// function to control the click event on the keyboard
const colorKeys = document.querySelectorAll(".colors-input > .color");
colorKeys.forEach(colorKey => {
   colorKey.addEventListener('click', () => {
    // remove all the errors
    document.querySelectorAll("#errors > *").forEach(errorEl => {
        errorEl.style.display = "none";
    })

    let color = colorKey.classList[1];

    // reset classList and add the clicked color
    inputEls[selectedIndex].classList = "color";
    inputEls[selectedIndex].classList.add(color);

    // slide the selected input if possible
    if (selectedIndex < inputEls.length - 1) {
        selectedIndex ++;
    }
    inputEls[selectedIndex].classList.add("selected")
   })
});

// submit event
let submitEl = document.getElementById("submit");
submitEl.addEventListener("click", () => {
    // start the function
    colorsInput = [];
    inputEls.forEach(inputEl => {
        list = inputEl.classList;
        list.forEach(className => {
            if(className != "color" && className != "selected") {
                colorsInput.push(className);
            }
        });
    });
    // taken all the inserted colors

    if (colorsInput.length == 5) {
        let actualRow = document.querySelectorAll(".row:nth-child(" + tryIndex + ") > *");
        actualRow.forEach((cell, index) => {
            // store the trial
            cell.classList = "color " + colorsInput[index];
        })
        tryIndex++;
        
        // check the win
        let result = controlWin(colorsInput, combination)
        switch (result) {
            case false:
                console.log('sbagliata');
                break;
            case true:
                console.log('giusta');
                break;
            default:
                console.log(result);
            }

    } else {
        document.getElementById("color-length").style.display = "block"
    }
});

/**
 * Generate a list of 5 colors chosen between the available all differents from eachother
 * 
 * @returns array
 */
function randomCombination(){
    const colors = ['red','pink','purple','yellow','green','blue','orange'];
    let list = [];
    while(list.length != 5){
        let num = Math.floor(Math.random() * colors.length);
        if (!list.includes(colors[num])){
            list.push(colors[num]);
        }
    }
    return(list)
}

/**
 * Compare the 2 lists given, if they are equal, return true, if at least one object is correct, return the array of the correct indexes, otherwise return false
 * 
 * @param tryList
 * @param correctList
 * @returns 
 */
function controlWin(tryList, correctList){
    let array = []
    tryList.forEach((color,index) => {
        if (tryList[index] === correctList[index]) {
            array.push(index);
        }
    });
    if (array.length == 5) {
        return true;
    } else if (array.length == 0){
        return false;
    } else {
        return array;
    }
}
