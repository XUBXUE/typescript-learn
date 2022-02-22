function greeter(person: string) {
  return "Hello, " + person;
}

let user1 = "Jane User";
let user2 = [1, 2, 3];

document.body.innerHTML = greeter(user1); // 正常运行
document.body.innerHTML = greeter(user2); // Argument of type 'number[]' is not assignable to parameter of type 'string'.
document.body.innerHTML = greeter(); // An argument for 'person' was not provided.