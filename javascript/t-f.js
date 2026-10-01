// Task 5: Truthy and Falsy

console.log('=== Truthy and Falsy Values ===');

console.log('Falsy values:');

console.log('Boolean(false):', Boolean(false));
console.log('Boolean(0):', Boolean(0));
console.log('Boolean(""):', Boolean(''));
console.log('Boolean(null):', Boolean(null));
console.log('Boolean(undefined):', Boolean(undefined));
console.log('Boolean(NaN):', Boolean(NaN));

console.log('\nTruthy values (surprising):');

console.log('Boolean([]):', Boolean([]));
console.log('Boolean({}):', Boolean({}));
console.log('Boolean("0"):', Boolean('0'));
console.log('Boolean("false"):', Boolean('false'));
console.log('Boolean(-1):', Boolean(-1));