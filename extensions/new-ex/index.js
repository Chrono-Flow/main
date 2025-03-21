
navigator.serviceWorker.register("./service.js")
    .then((r) => console.log("Service worker registered with status: ", r.active))
    .catch((e) => console.error("Couldnot register service worker ./service,js", e))

// Mock credentials
const username = 'your_username';
const password = 'your_password';

function simulateTyping(element, text) {
    element.focus();
    element.value = '';
    for (let char of text) {
        element.value += char;
        // Dispatch an input event after each character is added.
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
    }
}

// Function to perform login
export function autoLogin() {
    console.log("Insta login instantiated")
    // Select the username and password input fields
    const usernameField = document.querySelector('input[name="username"]');
    const passwordField = document.querySelector('input[name="password"]');

    // Check if the fields are present
    if (usernameField && passwordField) {
        // Fill in the credentials
        simulateTyping(usernameField, "new-username")
        simulateTyping(passwordField, "password-new-123")

        // Simulate form submission

        const loginButton = document.querySelector("input[type='submit']")
        loginButton.click()

    } else {
        if (!usernameField) {
            throw Error("Cannot find username field")
        } else {
            throw Error("Cannot find password field")
        }
    }
}

// Execute the login function
document.addEventListener('DOMContentLoaded', autoLogin)