const header = document.getElementById("header")
header.innerHTML = "<h1> hari food shop </h1>"

const btn = document.querySelectorAll(".btn")
for(let b of btn){
     b.style.backgroundColor = "black"
}

const listItems = document.querySelectorAll("ul li");

listItems.forEach((item) => {
  console.log(item.textContent);
});

const buttons = document.getElementsByClassName("btn");

for (const button of buttons) {
  button.style.color = "blue";
}

const paragraphs = document.getElementsByTagName("p");

for (const paragraph of paragraphs) {
  paragraph.style.fontSize = "20px";
}


/////////////////////////////////////

// const staticButtons = document.querySelectorAll(".btn");
// const liveButtons = document.getElementsByClassName("btn");

// console.log("Before:", staticButtons.length, liveButtons.length);

// const newButton = document.createElement("button");
// newButton.className = "btn";
// newButton.style.backgroundColor="black"
// newButton.style.color="blue "
// newButton.textContent = "Order Sandwich";

// document.body.appendChild(newButton);

// console.log("After:", staticButtons.length, liveButtons.length);

//////////////////////////////////////// DOM Traversal

const burger = document.getElementById("burger");

console.log(burger.parentElement);


const food = document.getElementById("menu")

console.log(food.children[0].textContent)
console.log(food.textContent)

/////////////////

const button = document.getElementById("orderBtn");
const card = button.closest(".card")

console.log(card)

card.style.backgroundColor = "orange"
console.log(button.closest(".profile"))

const photo = document.getElementById("img");

console.log(photo.getAttribute("src"))
console.log(photo.getAttribute("alt"))

photo.setAttribute("src", "img2.jpg");
photo.setAttribute("alt", "Burger");

photo.removeAttribute("alt")
console.log(photo.hasAttribute("alt"))

// const omg = document.getElementById("img")

// omg.src = "img.jpg"
// omg.alt = "alterted"


// const img =  document.getElementById("img")

// img.src ="img.jpg"