


// Initial balance and donation history
let currentBalance = 5500;
const donationHistory = [];

// Elements for balance, donation, history, and buttons
const balanceElement = document.getElementById('current-balance');
const historyContent = document.getElementById('history-content');
const donationSection = document.getElementById('donation-section');
const historySection = document.getElementById('history-section');
const donationBtn = document.getElementById('donation-btn');
const historyBtn = document.getElementById('history-btn');

// Function to update donation amount on card
function updateDonationCard(cardElement, donationAmount) {
    const donationAmountElement = cardElement.querySelector('.donation-amount');
    const previousAmount = parseFloat(donationAmountElement.textContent) || 0;
    console.log('Donation amount added:', donationAmount);
    donationAmountElement.textContent = (previousAmount + donationAmount) + ' BDT';
}

// Function to handle donation and update balance
function makeDonation(cardElement, donationAmount) {
    console.log('Current balance:', currentBalance);
    if (donationAmount > 0 && donationAmount <= currentBalance) {
        currentBalance -= donationAmount;
        balanceElement.textContent = currentBalance + ' BDT';  // Update balance on screen
        console.log('New balance after donation:', currentBalance);
        // Record donation and date
        const donationDate = new Date().toLocaleString();
        donationHistory.push({ amount: donationAmount, date: donationDate });

        // Update the donation amount on the card
        updateDonationCard(cardElement, donationAmount);

        // Clear input field
        cardElement.querySelector('.donation-input').value = '';

    } else {
        alert('Please enter a valid donation amount within your balance.');
    }
}

// Function to display donation history
function updateHistory() {
    historyContent.innerHTML = ''; // Clear old history
    donationHistory.forEach(donation => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('p-4', 'border', 'border-gray-300', 'rounded-md', 'bg-gray-50', 'shadow-sm');
        historyItem.innerHTML = `<p class="font-semibold">${donation.amount} BDT</strong> donated</p>
                                 <p class="text-gray-600 text-sm">Date: ${donation.date}</p>`;
        historyContent.appendChild(historyItem);  // Add each donation to the history box
    });
}

// Add event listeners to all donate buttons
document.querySelectorAll('.donate-btn').forEach(button => {
    button.addEventListener('click', function () {
        const cardElement = this.parentElement;  // Find the parent card
        const donationInput = cardElement.querySelector('.donation-input');
        const donationAmount = parseFloat(donationInput.value);

        makeDonation(cardElement, donationAmount);  // Make the donation
    });
});

// Toggle between donation and history sections
donationBtn.addEventListener('click', function () {
    donationSection.style.display = 'block';
    historySection.style.display = 'none';
});

historyBtn.addEventListener('click', function () {
    donationSection.style.display = 'none';
    historySection.style.display = 'block';
    updateHistory();  // Update the history section when it's shown
});
