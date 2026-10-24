// const foodOrder = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         const foodAvailable =true;

//         if (foodAvailable) {
//             resolve("Food is ready!");
//         } else {
//             reject("Food is unavailable.");
//         }
//     }, 2000);
// });

// foodOrder
//     .then((message) => {
//         console.log(message);
//     })
//     .catch((error) => {
//         console.log(error);
//     });


// console.log("Payment processing...");

// const payment = Promise.resolve(setTimeout(() => {console.log("payment sucessfull !")},2000))

// const balance = 200;
//         const amount = 500;

// payment
// .then((message) => {
//     console.log(message);
// })
// .catch((error) => {
//     console.log(error)
// })
// .finally(() => {
//     console.log("operation completed please reject your card")
// })
// console.log("You can continue browsing");


// const fetchData = new Promise((resolve, reject) => {
//     setTimeout(() => {  
//         resolve({ name: "Hari", age: 22 });
//     }, 2000);
// });

// fetchData
//     .then((data) => {
//         console.log("Data:", data);

//         return data.name;
//     })
//     .then((name) => {
//         console.log("Name:", name);
//     });


// const users = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("Users data");
//     }, 2000);
// });

// const products = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("Products data failed");
//     }, 1000);
// });

// const orders = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         reject("Orders data");
//     }, 3000);
// });

// Promise.race([users, products, orders])

// .then((results) => {
//     console.log(results)
// })
// .catch((error)=> {
//     console.log(error);
    
// })

Promise.resolve(1) .then(x => { throw new Error('oops'); }) .then(x => x + 1) .catch(e => 'caught')