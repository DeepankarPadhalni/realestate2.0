
// EMI Calculation Function
function calculateEMI(principal, interestRate, tenure) {
    let monthlyInterestRate = interestRate / (12 * 100); // Monthly interest rate
    let numberOfMonths = tenure * 12; // Total number of months

    let emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / 
              (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    let totalPayable = emi * numberOfMonths;
    let totalInterest = totalPayable - principal;

    return {
        emi: emi.toFixed(2),
        totalPayable: totalPayable.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
    };
}

// Update input value labels in real-time
function updateSliderValues() {
    document.getElementById('loan-amount-value').innerText = `₹${document.getElementById('loan-amount').value}`;
    document.getElementById('interest-rate-value').innerText = `${document.getElementById('interest-rate').value}%`;
    document.getElementById('loan-tenure-value').innerText = `${document.getElementById('loan-tenure').value} years`;
}

// Event Listener for EMI Calculation
document.getElementById('calculate-emi').addEventListener('click', function () {
    let loanAmount = parseFloat(document.getElementById('loan-amount').value);
    let interestRate = parseFloat(document.getElementById('interest-rate').value);
    let loanTenure = parseFloat(document.getElementById('loan-tenure').value);

    // Calculate EMI
    let result = calculateEMI(loanAmount, interestRate, loanTenure);

    // Display Results
    document.getElementById('emi-result').innerText = `EMI: ₹${result.emi}`;
    document.getElementById('total-payable').innerText = `Total Payable: ₹${result.totalPayable}`;
    document.getElementById('total-interest').innerText = `Total Interest: ₹${result.totalInterest}`;

    // Update Pie Chart
    updateChart(result.totalInterest, loanAmount);
});

// Real-time update of input values
document.getElementById('loan-amount').addEventListener('input', updateSliderValues);
document.getElementById('interest-rate').addEventListener('input', updateSliderValues);
document.getElementById('loan-tenure').addEventListener('input', updateSliderValues);

// Pie Chart for EMI Breakdown
let emiChart;
function updateChart(interest, principal) {
    const ctx = document.getElementById('emiChart').getContext('2d');
    if (emiChart) {
        emiChart.destroy(); // Destroy the old chart before creating a new one
    }
    emiChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal Amount', 'Total Interest'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#4CAF50', '#FF5733'],
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Loan EMI Breakdown'
            }
        }
    });
}

// Initialize slider values on page load
updateSliderValues();