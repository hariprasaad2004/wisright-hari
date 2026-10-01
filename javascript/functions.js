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


const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);   // calls itself using "fact"
};

console.log(factorial(5));  // 120
console.log(typeof fact);   // "undefined" (not visible outside)
