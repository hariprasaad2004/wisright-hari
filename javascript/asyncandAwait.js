// const users = [
//     { id: 1, name: "Hari" },
//     { id: 2, name: "Arun" }
// ];

// const subscriptions = [
//     { userId: 1, name: "Hotstar", cost: 299 },
//     { userId: 1, name: "Prime", cost: 399 },
//     { userId: 2, name: "Prime", cost: 399 }
// ];

// function getUserById(id) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const user = users.find(user => user.id === id);

//             if (user) {
//                 resolve(user);
//             } else {
//                 reject(new Error("User not found"));
//             }
//         }, 1000);
//     });
// }

// function getUserSubscriptions(userId) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             const userSubscriptions = subscriptions.filter(
//                 subscription => subscription.userId === userId
//             );

//             resolve(userSubscriptions);
//         }, 1000);
//     });
// }

// function calculateTotalCost(userSubscriptions) {
//     return userSubscriptions.reduce(
//         (total, subscription) => total + subscription.cost,
//     );
// }

// async function showUserSubscriptions(id) {
//     try {
//         const user = await getUserById(id);
//         console.log("User:", user.name);

//         const userSubscriptions = await getUserSubscriptions(user.id);
//         console.log("Subscriptions:", userSubscriptions);

//         const total = calculateTotalCost(userSubscriptions);
//         console.log("Total cost: ₹" + total);
//     } catch (error) {
//         console.log("Error:", error.message);
//     }
// }

// showUserSubscriptions(1);


// function getMessage() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve("Hello, Hari!");
//         }, 2000);
//     });
// }
// async function getMessage() {setTimeout(()=>
// console.log("hello hari"),2000)
// }
// function getMessage() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const success = true;

//             if (success) {
//                 resolve("Hello Hari");
//             } else {
//                 reject(new Error("Message kidaikala"));
//             }
//         }, 2000);
//     });
// }

// async function showMessage() {
//     try {
//         console.log("Waiting...");

//         const message = await getMessage();

//         console.log(message);
//         return message;
//     } catch (error) {
//         console.log("Error:", error.message);
//     } finally {
//         console.log("Process completed");
//     }
// }

// showMessage();
// async function showMessage1() {
//     console.log("Waiting...");

//     const message = await showMessage();

//     console.log(message)
// }

// showMessage1();