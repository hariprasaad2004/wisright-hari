// Task 3: Logical Operators

console.log('=== Logical Operators ===');

// AND (&&) examples

console.log('true && true:', true && true);

console.log('true && false:', true && false);

// OR (||) examples

console.log('true || false:', true || false);

console.log('false || false:', false || false);

// NOT (!) examples

console.log('!true:', !true);

console.log('!false:', !false);

// Short-circuit evaluation

console.log('"Hello" && "World":', 'Hello' && 'World');

console.log('"" || "Default":', '' || 'Default');

// Practical: Default values

const username = '';

const displayName = username || 'Guest';

console.log('Display name:', displayName);

// Nullish coalescing (??)

const name = null;

const defaultName = name ?? 'Guest';

console.log('Default name:', defaultName);