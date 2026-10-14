// const employee = {
//     name: "Hari",
//     age: 22,
//     role: "Full Stack Developer"
// };


// const {name,role,age} = employee;

// console.log(age) ///Object destructuring uses property names, not positions.


// const original = [1, 2, 3];

// const copy = [...original];

// console.log(copy);

// copy.push(7);

// console.log(original); 
// console.log(copy);     

// const employee = {
//     name: "Hari",
//     role: "Developer"
// };

// const copy = { ...employee };

// console.log(copy);


const original = {
    name: "Hari",
    address: { city: "Chennai" }
};

const copy = { ...original };

copy.address.city = "Erode";

console.log(original.address.city); // Erode

function sum(...numbers) {
    console.log(numbers);
}

sum(10, 20, 30, 40, 50);


const tn = `hi
this is hari
how are you `

console.log(tn)