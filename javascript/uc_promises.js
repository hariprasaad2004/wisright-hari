// function checkResult(registerNumber) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (registerNumber === 1234) {
//                 const student = {
//                     name: "Hari",
//                     marks: 70
//                 };

//                 resolve(student);
//             } else {
//                 reject(new Error("Invalid register number"));
//             }
//         }, 2000);
//     });
// }

// console.log("Checking result...");

// checkResult(1234)
//     .then((student) => {
//         console.log("Student:", student.name);

//         return student.marks;
//     })
//     .then((marks) => {
//         console.log("Marks:", marks);

//         if (marks >= 50) {
//             console.log("Pass");
//         } else {
//             console.log("Fail");
//         }
//     })
//     .catch((error) => {
//         console.log(error.message);
//     })
//     .finally(() => {
//         console.log("Result checking completed");
//     });




// function orderProduct(quantity) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const stock = 5;
//             const price = 500;

//             if (quantity <= 0) {
//                 reject(new Error("Enter a valid quantity"));
//             } else if (quantity > stock) {
//                 reject(new Error("Insufficient stock"));
//             } else {
//                 resolve({
//                     product: "Keyboard",
//                     quantity: quantity,
//                     price: price
//                 });
//             }
//         }, 2000);
//     });
// }

// console.log("Placing order...");

// orderProduct(5)
//     .then((order) => {
//         console.log("Product:", order.product);

//         return order.quantity * order.price;
//     })
//     .then((total) => {
//         console.log("Total: ₹" + total);
//     })
//     .catch((error) => {
//         console.log(error.message);
//     })
//     .finally(() => {
//         console.log("Order processing completed");
//     });

function login(password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(password==="hari123"){
                resolve("Login successfull")
            }
            else{
                reject(new Error("Wrong password")
                )
            }
        }, 1000);
    });
}

login("hari123")
.then((resolve)=>{console.log(resolve)})
.catch((error) => {
    console.log(error.message);
})
.finally(()=>{
    console.log("Login check completed")
})