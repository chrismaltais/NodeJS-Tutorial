let square = x => x * x;

//let square = (x) => {
//    let result = x * x;
//    return result;
//};
// Note arrow functions do not bind .this keywords

console.log(square(9));

let user = {
    name: 'Chris',
    sayHi: () => {
        console.log(`Hi! I'm ${this.name}`);
    },
    sayHiAlt () {
        console.log(arguments);
        console.log(`Hi! I'm ${this.name}`);
    }
}

user.sayHi(1, 2, 3);
user.sayHiAlt(1, 2, 3); 