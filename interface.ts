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