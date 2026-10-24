// function getData(callback) {
// //   console.log("get data");

// const { useCallback } = require("react")

//   callback(10); // ──┐
// }               //   │ 10 kuduthu (a) => {...} ah call pannum
//                 //   ▼
// function getMoreData(a, callback) {
//   console.log("getMoreData");

//   callback(a + 10); // 10 + 10 = 20
//   //      │
//   //      └── 20 kuduthu (b) => {...} ah call pannum
// }

// function getEvenMoreData(b, callback) {
//   console.log("getEvenMoreData");

//   callback(b + 10); // 20 + 10 = 30
//   //      │
//   //      └── 30 kuduthu (c) => {...} ah call pannum
// }

// function getFinalData(c, callback) {
//   console.log("getFinalData");

//   callback(c + 10); // 30 + 10 = 40
//   //      │
//   //      └── 40 kuduthu (d) => {...} ah call pannum
// }


// // EXECUTION INGA START AAGUDHU 👇

// getData((a) => {
//   //     ▲
//   //     └── getData kulla callback(10) call pannumbodhu
//   //         indha arrow function execute aagum. a = 10.
//   //
//   //         Next call 👇

//   getMoreData(a, (b) => {
//     //        │   ▲
//     //        │   └── callback(20) moolama b = 20.
//     //        └── a value 10 getMoreData-ku pogum.
//     //
//     //            Next call 👇

//     getEvenMoreData(b, (c) => {
//       //           │   ▲
//       //           │   └── callback(30) moolama c = 30.
//       //           └── b value 20 getEvenMoreData-ku pogum.
//       //
//       //               Next call 👇

//       getFinalData(c, (d) => {
//         //         │   ▲
//         //         │   └── callback(40) moolama d = 40.
//         //         └── c value 30 getFinalData-ku pogum.
//         //
//         //             Final calculation 👇

//         console.log(a + b + c + d);
//         //          10 + 20 + 30 + 40 = 100
//       });
//     });
//   });
// });

// /*
// OUTPUT:
// get data
// getMoreData
// getEvenMoreData
// getFinalData
// 100
// */


// function work1(callback){
//     setTimeout(()=>{
//         callback("work 1 completed")
//     },5000)
// }


// function work2(callback){
//     setTimeout(()=>{
//         callback("work 2 completed")
//     },4000)
// }


// function work3(callback){
//     setTimeout(()=>{
//         callback("work 3 completed")
//     },3000)
// }


// function work4(callback){
//     setTimeout(()=>{
//         callback("work 4 completed")
//     },2000)
// }


// function work5(callback){
//     setTimeout(()=>{
//         callback("work 5 completed")
//     },1000)
// }

// work1((res,ero)=>{
//     console.log(res)


//     work2((res,ero)=>{
//         console.log(res)
        
//         work3((res,ero)=>{
//             console.log(res)

//             work4((res,ero)=>{
//                 console.log(res)
                
//                 work5((res,ero)=>{
//                     console.log(res)
//                 })
//             })
//         })

//     })
// })


function work1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("work 1 completed");
        }, 5000);
    });
}

function work2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("work 2 completed");
        }, 4000);
    });
}

function work3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("work 3 completed");
        }, 3000);
    });
}

function work4() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("work 4 completed");
        }, 2000);
    });
}

function work5() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("work 5 completed");
        }, 1000);
    });
}

async function runWorks() {
    const res1 = await work1(); // Work 1 complete aagura vara wait pannum.
    console.log(res1);

    const res2 = await work2(); // Apram dhaan work 2 start aagum.
    console.log(res2);

    const res3 = await work3();
    console.log(res3);

    const res4 = await work4();
    console.log(res4);

    const res5 = await work5();
    console.log(res5);
}

runWorks();


