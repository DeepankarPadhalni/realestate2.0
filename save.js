// Function to send form data to the server for permanent storage
function sendFormDataToServer() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create a POST request with the form data
    fetch('https://your-server-endpoint.com/save-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Your message has been sent successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
}
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form refresh
    saveFormData(); // Save locally to LocalStorage
    sendFormDataToServer(); // Send data to server
});
