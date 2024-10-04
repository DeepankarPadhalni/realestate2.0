// Show/Hide chatbot when the button is clicked
document.getElementById('chatbot-btn').addEventListener('click', function () {
    const chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer.style.display === 'none') {
        chatbotContainer.style.display = 'block';
    } else {
        chatbotContainer.style.display = 'none';
    }
});

// Chatbot logic
document.getElementById('send-btn').addEventListener('click', function () {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim()) {
        addMessage(userInput, 'user-message');
        respondToUser(userInput);
        document.getElementById('user-input').value = '';
    }
});

function addMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.innerText = text;
    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
}

function respondToUser(userInput) {
    const botResponse = getBotResponse(userInput.toLowerCase());
    setTimeout(() => addMessage(botResponse, 'bot-message'), 1000); // Simulate response delay
}

function getBotResponse(input) {
    if (input.includes('available properties') || input.includes('rooms')) {
        return 'Currently, we have rooms and halls available for rent. You can check out our listings on the "Rentals" page.';
    } else if (input.includes('payment') || input.includes('google pay')) {
        return 'We accept payments via Google Pay. Scan the QR code at checkout, or use your Google Pay app.';
    } else if (input.includes('contact')) {
        return 'You can contact us at maniyarealestatepro@gmail.com or call us at +91-9876543210.';
    } else if (input.includes('location') || input.includes('address')) {
        return 'Our office is located at Maniya Real Estate Pro, 1234 Real Estate Avenue, City Name.';
    } else if (input.includes('price') || input.includes('rent')) {
        return 'Rental prices depend on the property type. Rooms start at ₹10,000 per month, halls at ₹20,000, and shops at ₹30,000.';
    } else {
        return 'Sorry, I didn\'t understand that. Please ask about available properties, payments, contact, or prices!';
    }
}
