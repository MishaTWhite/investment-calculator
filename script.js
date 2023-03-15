function calculateResults() {
    const age = parseInt(document.getElementById('age').value);
    const initialCapital = parseInt(document.getElementById('initialCapital').value);
    const monthlyInvestment = parseInt(document.getElementById('monthlyInvestment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const endAge = parseInt(document.getElementById('endAge').value);
    const interestFrequency = document.getElementById('interestFrequency').value;

    let periodsPerYear;
    let investmentPerPeriod;

    switch (interestFrequency) {
        case 'monthly':
            periodsPerYear = 12;
            investmentPerPeriod = monthlyInvestment;
            break;
        case 'quarterly':
            periodsPerYear = 4;
            investmentPerPeriod = monthlyInvestment * 3;
            break;
        case 'annually':
            periodsPerYear = 1;
            investmentPerPeriod = monthlyInvestment * 12;
            break;
        default:
            periodsPerYear = 12;
    }

    const annualInvestment = monthlyInvestment * 12;
    const interestRatePerPeriod = interestRate / periodsPerYear;
    let capital = initialCapital;
    let tbody = document.getElementById('resultTable').querySelector('tbody');
    tbody.innerHTML = '';

    for (let currentAge = age; currentAge <= endAge; currentAge++) {
        let capitalAtStartOfYear = capital;
        let annualCompoundInterest = 0;

        for (let period = 1; period <= periodsPerYear; period++) {
            let interest = capital * interestRatePerPeriod;
            capital += interest;
            annualCompoundInterest += interest;

            capital += investmentPerPeriod;
        }

        let row = tbody.insertRow();
        row.insertCell().textContent = currentAge;
        row.insertCell().textContent = Math.round(capitalAtStartOfYear);
        row.insertCell().textContent = Math.round(annualInvestment);
        row.insertCell().textContent = Math.round(annualCompoundInterest);
        row.insertCell().textContent = Math.round((capital - capitalAtStartOfYear - annualInvestment) / 12);
    }
}
