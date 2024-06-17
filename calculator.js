<!-- Jeremy Cross -->
<!-- COMP322-03A -->
<!-- This is a simple JavaScript page that will continuously take two integers from the user, perform simple operations, and return a table of all calculations. -->

document.addEventListener('DOMContentLoaded', () => {
    let results = [];
    let isRunning = true;

    while (isRunning) {
        let x = prompt("Enter the first number (x):");
        if (x === null) break;
        x = parseFloat(x);
        if (isNaN(x)) {
            alert("Invalid number. Please try again.");
            continue;
        }
        let y = prompt("Enter the second number (y):");
        if (y === null) break;
        y = parseFloat(y);
        if (isNaN(y)) {
            alert("Invalid number. Please try again.");
            continue;
        }
        let operator = prompt("Enter an operator (+, -, %, /, *):");
        if (operator === null) break;
        let validOperators = ['+', '-', '%', '/', '*'];
        if (!validOperators.includes(operator)) {
            alert("Invalid operator. Please try again.");
            continue;
        }
        let result;
        switch (operator) {
            case '+':
                result = x + y;
                break;
            case '-':
                result = x - y;
                break;
            case '/':
                result = y !== 0 ? x / y : 'computation error';
                break;
            case '%':
                result = y !== 0 ? x % y : 'computation error';
                break;
            case '*':
                result = x * y;
                break;
        }
        results.push({x, operator, y, result});
    }
    if (results.length > 0) {
        displayResults(results);
    } else {
        console.log("NO RESULTS FOUND");
    }
});

function displayResults(results) {
    let resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        console.error("NO RESULTS FOUND");
        return;
    }
    let tableHTML = "<table>";
    tableHTML += "<tr class='ops-row'><th>x</th><th>op</th><th>y</th><th>result</th></tr>";
    results.forEach(row => {
        let resultClass = (typeof row.result === 'string') ? 'error' : '';
        tableHTML += `<tr class="results-row"><td>${row.x}</td><td>${row.operator}</td><td>${row.y}</td><td class="${resultClass}">${row.result}</td></tr>`;
    });
    tableHTML += "</table>";
    let validResults = results.filter(row => typeof row.result === 'number');
    if (validResults.length > 0) {
        let min = Math.min(...validResults.map(row => row.result));
        let max = Math.max(...validResults.map(row => row.result));
        let total = validResults.reduce((sum, row) => sum + row.result, 0);
        let avg = total / validResults.length;
        tableHTML += "<table>";
        tableHTML += "<tr class='summary-row'><th>Min</th><th>Max</th><th>Average</th><th>Total</th></tr>";
        tableHTML += `<tr class="result-row"><td>${min}</td><td>${max}</td><td>${avg}</td><td>${total}</td></tr>`;
        tableHTML += "</table>";
    }
    resultsDiv.innerHTML = tableHTML;
}