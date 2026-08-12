const display = document.getElementById("display");

function addValue(value) {

    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {

    if (display.value.length <= 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function percentage() {

    try {
        display.value = parseFloat(display.value) / 100;
    } catch {
        display.value = "Error";
    }
}

function calculate() {

    try {

        let expression = display.value;

        if (!/^[0-9+\-*/.]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        display.value = result;

    } catch {
        display.value = "Error";
    }
}


/* Keyboard support */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        /[0-9+\-*/.]/.test(key)
    ) {
        addValue(key);
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

    else if (key === "%") {
        percentage();
    }

});

