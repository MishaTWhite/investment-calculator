function calculateResults() {
    const startAge = parseInt(document.getElementById("age").value);
    const initialCapital = parseFloat(document.getElementById("initialCapital").value);
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
    const endAge = parseInt(document.getElementById("endAge").value);
    const interestFrequency = document.getElementById("interestFrequency").value;

    const inflationRate = parseFloat(document.getElementById("inflationRate").value) / 100;
    const adjustForInflation = document.getElementById("adjustForInflation").checked;

    const resultTable = document.getElementById("resultTable");
    const tbody = resultTable.getElementsByTagName("tbody")[0];

    tbody.innerHTML = "";

    let capital = initialCapital;
    let totalInvested = 0;

    for (let i = startAge; i <= endAge; i++) {
        const startOfYearCapital = capital;
        let investedAmount = 0;

        for (let j = 1; j <= 12; j++) {
            let currentMonthlyInvestment = monthlyInvestment;

            if (adjustForInflation) {
                currentMonthlyInvestment *= Math.pow(1 + inflationRate, i - startAge);
            }

            investedAmount += currentMonthlyInvestment;
            capital += currentMonthlyInvestment;

            switch (interestFrequency) {
                case "monthly":
                    capital *= Math.pow(1 + interestRate / 12, 1);
                    break;
                case "quarterly":
                    if (j % 3 === 0) {
                        capital *= Math.pow(1 + interestRate / 4, 1);
                    }
                    break;
                case "annually":
                    if (j === 12) {
                        capital *= Math.pow(1 + interestRate, 1);
                    }
                    break;
            }
        }

        totalInvested += investedAmount;
        const capitalGrowth = capital - startOfYearCapital - investedAmount;
        const endOfYearIncome = (capital - totalInvested) * interestRate / 12;
        const adjustedIncome = endOfYearIncome / Math.pow(1 + inflationRate, i - startAge);

        const row = `
            <tr>
                <td>${i}</td>
                <td>${Math.round(startOfYearCapital)}</td>
                <td>${Math.round(investedAmount)}</td>
                <td>${Math.round(capitalGrowth)}</td>
                <td>${Math.round(endOfYearIncome)}</td>
                <td>${Math.round(adjustedIncome)}</td>
            </tr>
        `;

        tbody.insertAdjacentHTML("beforeend", row);
    }
}
