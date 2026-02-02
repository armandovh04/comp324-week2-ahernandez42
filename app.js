console.log('app.js loaded');

const form = document.querySelector('#signupForm');
const status = document.querySelector('#formStatus');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

const nameError = document.querySelector('#nameError');
const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');

function showError(input, errorEl, message){
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('invalid');
    errorEl.textContent = message;
    errorEl.classList.add('error');
}

nameInput.addEventListener('blur', () => {
    const value = nameInput.value.trim();
        if (!value) {
        showError(nameInput, nameError, 'Please enter your name.');
    } else if (value.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters.');
    } else {
        clearError(nameInput, nameError);
    }
});

emailInput.addEventListener('blur', () => {
    if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Please enter your email.');
    } else if (!emailInput.checkValidity()) {
        showError(emailInput, emailError, 'Enter a valid email address.');
    } else {
        clearError(emailInput, emailError);
    }
});

passwordInput.addEventListener('blur', () => {
    if (!passwordInput.value) {
        showError(passwordInput, passwordError, 'Please enter a password.');
    } else if (passwordInput.value.length < 8) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters.');
    } else {
        clearError(passwordInput, passwordError);
  }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';
    nameInput.dispatchEvent(new Event('blur'));
    emailInput.dispatchEvent(new Event('blur'));
    passwordInput.dispatchEvent(new Event('blur'));

    const firstInvalid =
        document.querySelector('[aria-invalid="true"]');

    if (firstInvalid) {
        firstInvalid.focus(); 
        return;
    }

    status.textContent = 'Success! Account created.';
    form.reset();
});

function clearError(input, errorEl){
    input.removeAttribute('aria-invalid');
    input.classList.remove('invalid');
    errorEl.textContent = '';
    errorEl.classList.remove('error');
}