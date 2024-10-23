// console.log("Hello world")
// alert("Hello world");
// window.document.write("<p>welcome to csen60!</p>");

// document.append(<p>this should come after the h1</p>)

/*
    Function to calculate the sum of two numbers.
    Inputs: a, b - numbers to be added.
    Output: returns the sum of a and b.
*/

// TODO: fix this function
function add(a, b) {
    return a + b;
}

let x = 100
// const x => declaration
// x = 2 => initialization
if (true) {
    let x = 200; // Same variable!
}
console.log(x); // Outputs: 200



let y 
y = null
let z = 0
console.log(y,z)

let greeting = "Hello, world!";
let response = `The time is ${new Date().getHours()}`;
console.log(response)

const age = 20
if (age > 18){
        console.log("you are of age")
} 
else{
    console.log(" you arent of age, please wait ${18-age} years")
}
let isAvailable = true;
let isOverAge = (age > 18);

console.log("\n", isOverAge)

let person = {
    name: "john",
    age: 30,
    isStudent: false
};

console.log(person["age"])

console.log(typeof(person))

alert("this is an important message")


// Strict equality
console.log(3 === '3'); // false

// Loose equality
console.log(3 == '3'); // true

let x=2