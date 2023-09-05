const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const historyList = document.getElementById("history-list");
let result = 0;

buttons.forEach((item) => {
    item.onclick = () => {
        if (item.id == 'clear') {
            display.innerText = "";
        } else if (item.id == 'backspace') {
            // ...
        } else if (display.innerText != "" && item.id == 'equal') {
            try {
                result = evaluateExpression(display.innerText);
                saveToHistory(display.innerText, result);
                display.innerText = result;
                setTimeout(() => {
                    display.innerText = "";
                }, 2000);
            } catch (error) {
                display.innerText = "Erro";
            }
        } else if (display.innerText == "" && item.id == 'equal')  {
            // ...
        } else {
            display.innerText += item.innerText;
        }
    }
})

// Historico
function saveToHistory(expression, result) {
    const historyItem = document.createElement("li");
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString();

    const timeSpan = document.createElement("span");
    timeSpan.innerText = formattedTime;
    historyItem.appendChild(timeSpan);

    historyItem.innerText += ` ${expression} = ${result}`;

    historyList.appendChild(historyItem);
}

function calculate() {
    try {
        result = evaluateExpression(display.innerText);
        saveToHistory(display.innerText, result);
        display.innerText = result;
        setTimeout(() => {
            display.innerText = "";
        }, 4000);
    } catch (error) {
        display.innerText = "Erro";
    }
}

function evaluateExpression(expression) {
    expression = expression.replace(/÷/g, '/').replace(/×/g, '*');
    return new Function('return ' + expression)();
}
