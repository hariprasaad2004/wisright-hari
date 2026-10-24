// const fruits = ['apple','banana','orange']
// const [a,b,c] = fruits

// console.log(a)

// const [x = 10, y = 20] = [5]; // doubt to clarify
// console.log(x);
// console.log(y)


// const[he, ...ta] = [1,2,3,4,5]
// console.log(he,...ta)

// let p = 1, q = 2;
// [p, q] = [q, p];
// console.log(p, q);

// function getCoords() {
//   return [12.97, 14];
// }

// const [lat, w] = getCoords();

// console.log(lat,w)

// const [h, ww] = 'hello';
// console.log(h, ww);

// const pairs = [['a', 1], ['b', 2]];
// for (const [key, value] of pairs) {
//   console.log(key, value);
// }

// function sum([a, b]) {
//   return a + b;
// }
// sum([3, 4]); // 7     // doubt has to clarify

// console.log("A");
// setTimeout(() => console.log("B"), 1000);  // scheduled for later
// console.log("C");
// Output: A, C, B

// const a =[1,2,3,4,5,6,7,8]

// // const [first, ,second,...rest] = a

// // console.log(first)
// // console.log(second)
// console.log(a[5])


// const a = [10, 20, 40, 50];

// a.splice(2, 0, 30,70,80,90);

// console.log(a); 

// let age = 72;

//  console.log(`not eigiabe ${age >= 18 }`)  && console.log("Eligible");

// let name = ;

// console.log(NaN?? "Guest");


// const fruits = [ 'apple','orange','banama']

// for(const fruit of fruits ){
//     console.log(fruit)
// }

// // console.log(fruits)


// const user = { 
//     name:"hari",
//     age : 22
// }

// for(const key in user){
//     console.log(user[key])
// }

// let i = 1;

// // while (i <= 5) {
// //     console.log(i);
// //     i++;
// //     break;
// // }

// // for (;;) {
// //     console.log("Hello");
// // }
// console.log("Start");

// function greet(callback) {
//     setTimeout(() => {
//         console.log("Hello Hari!");
//         callback();
//     }, 5000);
// }

// function finished() {
//     setTimeout(()=>{console.log("Task completed");
    
// },2000
// )}
    

// greet(finished);

// console.log("End");


// function greet(call) {
//     console.log("Hello!");
//     call();
// }

// function finished() {
//     console.log("Task completed");
// }

// greet(finished);


// const mycallback =()=> {
//     console.log('this is call back')
// }

// setTimeout(mycallback,5000);

// function hello(){
//     console.log("hey hello")
// }
// function hii(){
//     console.log("hey hii")
// }
//  function call (calling){
//     calling();
//  }

// call(hello);

////////////////////////////////
// function orderFood() {
//     console.log("Food ordered");
// }

// function eatFood() {
//     console.log("Eating food");
// }

// function restaurant(callback) {
//     orderFood();
    
//     setTimeout(()=>callback(),2000);
    
// }

// restaurant(eatFood);






function hello(){
    console.log("hello")
}
function hi(){
    console.log("hi")
}

function wel(){
    console.log("welcome")
}

function call(calling){
    calling();
}

call(hi);
hello();
wel();
