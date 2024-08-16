let selectedIndex = 0;
let tryIndex = 1;
const rows = document.querySelectorAll("#game > .row:not(.control)");
let colorsInput = [];
let combination = randomCombination();
document.getElementById("restart").addEventListener("click", restart);

// change the selected input to the next one available
const inputEls = document.querySelectorAll(".control > .color")
inputEls.forEach((inputEl, index) => {
    inputEl.addEventListener('click', () => {
        inputEls[selectedIndex].classList.remove("selected");
        selectedIndex = index;
        inputEls[selectedIndex].classList.add("selected")
    })
});

// control the click event on the colors keyboard
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

// submit event with the enter key or the button
let submitEl = document.getElementById("submit");
submitEl.addEventListener("click", enter)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
        enter();
    }
});

/**
 * take the inserted combination and store them, then check the win
 */
function enter() {
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
        // check the win and score the result
        let result = controlWin(colorsInput, combination);
        let correctIndexEl = document.getElementById("score-index");
        let resultsEl = document.querySelector("#results > h3");
        let scoreEl = document.getElementById("score");
        scoreEl.style.display = "block";
        switch (result) {
            case false:
                correctIndexEl.innerHTML = 0;
                resetInput();
                break;
            case true:
                resultsEl.innerHTML = "YOU WON";
                endGame();
                break;
            default:
                correctIndexEl.innerHTML = result.length;
                resetInput();
            }
        tryIndex++;
        if (tryIndex >= 8) {
            resultsEl.innerHTML = "YOU LOSE"
            endGame();
        }
        
    } else {
        document.getElementById("color-length").style.display = "block"
    }
};

/**
 * Generate a list of 5 colors chosen between the available all differents from eachother
 * 
 * @returns array
 */
function randomCombination(){
    const colors = ['red','purple','green','blue','orange'];
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

/**
 * reset all the variables and restart the game
 * 
 */
function restart(){
    tryIndex = 1;
    combination = randomCombination();
    colorsInput = [];

    for (let i = 0; i < 7; i ++){
        rows[i].innerHTML = [];
        for (let j = 0; j < 5; j ++){
            let el = document.createElement("div");
            el.classList = "color";
            rows[i].appendChild(el);
        }
    }

    resetInput();

    document.getElementById("errors").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("game").style.display = "block";
}

/**
 * take all the reset fields and reset them
 * 
 */
function resetInput() {
    let controlList = document.querySelectorAll(".row.control > *");
    selectedIndex = 0;
    for (let i = 0; i < 5; i ++){
        controlList[i].classList = "color";
        if (i == 0) {
            controlList[i].classList.add("selected");
        }       
    }
}

/**
 * show the results and the correct combination
 * 
 */
function endGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("results").style.display = "flex";   
    console.log(combination)

    const showCombinationEl = document.querySelectorAll("#correct-combination > div");
    for (let i = 0; i < 5; i ++){
        showCombinationEl[i].classList = "color";
        showCombinationEl[i].classList.add(combination[i]);
    }
}