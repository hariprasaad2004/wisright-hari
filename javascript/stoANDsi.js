// function greet() {
//     console.log("Hello Hari");
// }

// setTimeout(greet, 2000);


// console.log("start")

// function sayHello() {
//     console.log("Hello");
// }

// const timeint = setInterval(sayHello,3000);

// function stop(){
//     clearInterval(timeint);
//     console.log("end")
     
// }
// setTimeout(stop,10000);


// let second = 5

// function timer(id){
//     console.log(second);
//     second--;

//     if(second===0){
//         clearInterval(id);
//         console.log("timer ends ")
//     }

// }

// const id = setInterval(()=>timer(id),1000)

// let count = 0;

// const intervalId = setInterval(() => {

// count++;

// console.log('Count: ' + count);

// if (count >= 5) clearInterval(intervalId);

// }, 1000);

// const count = 0;

// function hello (){
//     console.log("hello")
// }

// function hii (callback){
//     console.log("hi")
//     callback();
// }
// setTimeout(() => {}, 1000);
// hii(hello)


// function prepareFood() {
//     console.log("Food prepared");
//     setTimeout(packFood, 1000);
// }

// function packFood() {
//     console.log("Food packed");
//     setTimeout(deliverFood, 1000);
// }

// function deliverFood() {
//     console.log("Food delivered");
// }

// let cycle = 0;

// function runWashCycle() {
//     cycle++;
//     console.log(`Wash cycle: ${cycle}`);

//     if (cycle === 3) {
//         clearInterval(washcycle);
//         console.log("Washing completed");
//     }
// }

// console.log("Washing machine started");

// const washcycle = setInterval(runWashCycle, 2000);

let seq =0;

function st(){
    seq++;
    console.log("Please answer the question")

    if(seq===3){
        clearInterval(start);
        console.log("quiz time is finisher")
        setTimeout( ()=>console.log("your answer has been submitted"),1000)
        }
}


console.log("quiz started");

const start = setInterval(st,2000)

