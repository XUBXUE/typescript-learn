// 定义一个类型接口
interface Person {
  name: string;
  age: number;
}

function introduce(person: Person) {
  return `my name is ${person.name}, I'm ${person.age} years old`;
}

let personalInfo = { name: "xbx", age: 20 };

introduce(personalInfo); // 当传入的参数类型与接口不符时，则参数报错类型错误