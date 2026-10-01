// Task 6: Input Validator

console.log('=== Input Validation ===');

const age = 25;

const isValidAge = typeof age === 'number' && age >= 0 && age <= 120;

console.log('Age valid:', isValidAge);

const username = 'JohnDoe';

const isValidUsername =
    typeof username === 'string' &&
    username.length >= 3 &&
    username.length <= 20 &&
    username.trim() !== '';

console.log('Username valid:', isValidUsername);

const price = 19.99;

const isValidPrice =
    typeof price === 'number' &&
    price > 0;

console.log('Price valid:', isValidPrice);

const email = null;

const displayEmail = email ?? 'No email provided';

console.log('Email:', displayEmail);