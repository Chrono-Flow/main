// Mock credentials
const username = 'your_username';
const password = 'your_password';

// Function to perform login
export function autoLogin() {
    console.log("Insta login instantiated")
    // Select the username and password input fields
    const usernameField = document.querySelector('input[name="username"]');
    const passwordField = document.querySelector('input[name="password"]');

    // Check if the fields are present
    if (usernameField && passwordField) {
        // Fill in the credentials
        usernameField.value = username;
        passwordField.value = password;

        // Simulate form submission
        passwordField.closest('form').submit();
    } else {
        console.error('Login fields not found.');
    }
}

// Execute the login function
document.addEventListener('DOMContentLoaded', autoLogin)