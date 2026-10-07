// const colors = new Array('red', 'green', 'blue','yellow','pink','voilet');

// const fixedSizeArray = new Array(5);

// console.log(colors);         
// console.log(fixedSizeArray); 

// const chars = Array.from('this is the testing message')
// console.log(chars)


// const num = Array.from({length:100},(value,index)=> index+1);
// console.log(num)


// const numb = [1,2,3,4,5,6,7,8];
// console.log( numb.lastIndexOf(10));

// const numbers = [1, 2, 3, 4];

// numbers.forEach((1, 3, 4) => {
//   console.log(`Index ${index}: ${value * 2}`);
// });


// const users = [
//   { name: "Asha", age: 28 },
//   { name: "Ravi", age: 34 },
//   { name: "Meena", age: 22 },
// ];

// // Basic: run code on each element
// users.forEach((user) => {
//   console.log(`${user.name} is ${user.age} years old`);
// });

// // With index and the original array
// users.forEach((user, index, array) => {
//   console.log(`${index + 1}/${array.length}: ${user.name}`);
// });

// // Side effect: accumulate into an outside variable
// let totalAge = 0;
// users.forEach((user) => {
//   totalAge += user.age;
// });
// console.log(`Average age: ${totalAge / users.length}`);

// const name = "hari"
// console.log(`this is the new ${name} text`)
// const users = [
//   { name: "Asha", age: 28 },
//   { name: "Ravi", age: 34 },
//   { name: "Meena", age: 22 },
// ];

// users.forEach((user) => {
//   console.log(`${user.name} is ${user.age} years old`);
// });

// users.forEach((user, index, array) => {
//   console.log(`${index + 1}/${array.length}: ${user.name}`);
// });

// console,log(a)

// num()
// a = 27
// function num () { 
//     // let a = 100
//     console.log(a)
// }

function outer() { let count = 0; return function inner() { count++; return count; }; }

const counter = outer(); // inner function closes over count

counter(); // returns 1

counter(); // returns 2 - count persist
