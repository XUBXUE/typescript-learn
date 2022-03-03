interface profile {
    name: String;
    readonly age: number;
    sex?: Sex;
}
enum Sex { Male = 'Male1', Female = 'Female' }

const people1: profile = {
    name: 'Evan',
    age: 18
}

// people1.age = 24; // 会警告
people1.sex = Sex.Male;

console.log(people1);

// 当通过变量赋值或函数传参传入的对象属性在接口类型中不存在，就会得到一个错误。绕开这个报错有以下几种方式。
interface interface1 {
    name: String;
    readonly age: number;
    sex?: Sex;
}
// 1、使用断言 as 或者 <类型>
// const people2: interface1 = {
//     name: 'xbx',
//     age: 23,
//     stature: 180  // 不断言会报错
// } as interface1;

const people2: interface1 = <interface1>{
    name: 'xbx',
    age: 23,
    stature: 180  // 不断言会报错
};
// 2、添加一个字符串索引签名，当一个类型对象带有任意数量的其它属性，那么我们可以这样定义它
interface interface2 {
    name: string;
    readonly age: number;
    sex?: Sex;
    [propName: string]: any;
}
const people3: interface2 = {
    name: 'xbx',
    age: 23,
    stature: 180  // 不断言会报错
};
// 3、第三种 直接赋值给另一个对象


/**
 * 函数类型
 */
// 1、
interface MyFunc {
    (name: string, age: number): string;
}
let introduce: MyFunc;
introduce = function (name, age) {
    return `my name is ${name}, I'm ${age} years old;`;
}
// 2、
enum Sex2 { Male, Female }
const isMale = (sex: number): boolean => {
    return sex == Sex2.Male;
}
console.log(isMale(0));
console.log(isMale(1));

/**
 * 可索引的类型
 * 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
 * TS只支持两种索引签名：字符串和数字。
 */
// 1、定义一个类数组或数组的类型 其属性为数值类型，值为字符串类型
interface StringArray {
    [index: number]: string
}
// 以下两种都适合
let strArr: StringArray = ['A', 'B'];
let strObj: StringArray = {0: 'a', 1: 'b'};