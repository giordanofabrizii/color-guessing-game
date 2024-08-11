let selectedIndex = 0;

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
const colorKeys = document.querySelectorAll(".keyboard > .color");
colorKeys.forEach(colorKey => {
   colorKey.addEventListener('click', () => {
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
