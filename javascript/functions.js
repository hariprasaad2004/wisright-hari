// // // // // function sayhello(){
// // // // //     console.log("hello there");
// // // // // }
// // // // // for(i=1;i<6;i++){
// // // // //     console.log(sayhello())
// // // // // }


// // // // // function showUser(user) {
// // // // //   console.log(`${user.name} is ${user.age} years old.`);
// // // // // }

// // // // // showUser({ name: "Hari", age: 22 });


// // // // // const a = 27
// // // // // const b = 30

// // // // // const add =  (num1 , num2) => {
// // // // //     return num2+num1;
// // // // // }
// // // // // console.log(add(a ,b ))



// // // // let a = 10
// // // // let b = a

// // // // a=20
// // // // console.log(b)

// // // const a =[1,2,3,4,5]
// // // const s =a 
// // // a[2] = 6

// // // console.log(s)
// // // console.log(a)

// // console.log(null ?? undefined ?? 0)
// // console.log("a"-10)

// let name = function (){
//     console.log("hi da")
// }
// name();


// const factorial = function fact(n) {
//   if (n <= 1) return 1;
//   return n * fact(n - 1);   // calls itself using "fact"
// };

// console.log(factorial(5));  // 120
// console.log(typeof fact);   // "undefined" (not visible outside)


// let ans = (a,b) => a + b
// console.log(ans(1,2))

// let random = () => Math.random
// console.log(random)

// function greet(name, callback) {
//   console.log("Hello, " + name);
//   callback();
// }

// greet("Asha", () => console.log("Done!"));
// // const double = multiplier(2); double(5) 

// function test() { return; }
// console.log(test)


// for (var i = 0; i < 3; i++) {}
// console.log(i);   // 3  (leaked)

// for (let j = 0; j < 3; j++) {}
// console.log(j);   // ReferenceError




// var x;   
// x = 5;         // hoisted, set to undefined
// console.log(x);

// let v = "outer";
// {
//   console.log(v); // ReferenceError, NOT "outer"
//   // let v = "inner";

 var x = 1; function test() { console.log(x); var x = 2; } test();

 sayHi(); var sayHi = function() { console.log('Hi'); };