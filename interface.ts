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
let strObj: StringArray = { 0: 'a', 1: 'b' };
// 因为数值索引在对象里会被字段转换为字符串索引，所以以下写法也通过
let strObj1: StringArray = { '0': 'a', '2': 'b' };
interface NumberArray {
    [index: string]: boolean
}
let numArr: NumberArray = { '0': true, 24: false }

// 这里当设置了索引签名值类型为number类型，所以设置的name索引的值类型为string时会提示报错。
interface IndexDictionary {
    [index: string]: number;
    age: number;
    // name: string; // 会报错
}

interface ReadonlyStringArray {
    readonly [index: number]: any;
}
let readonlyStrArr: ReadonlyStringArray = ['1', 2, true, ['gg'], { 'sa': 42 }, Symbol()];
// readonlyStrArr[6] = '32'; // 这里会报错： 由于索引签名被设置为readonly，所以只能在初始化时做好赋值，后续使用索引赋值则会报错，因为索引签名是只读的


// 实现接口
// 用implements实现接口的话，需要在类里声明这个接口所有的属性
// 接口只描述类的公共部分，不会检查是否具有某些私有成员
interface coderType {
    language: string;
    hobby?: string[];
    introduce(): void;
    codeWord(word: string): string;
}

class Coder implements coderType {
    language: string = 'javascript';
    name: string;
    age: number;
    introduce() {
        console.log(`My name is ${this.name}, I'm ${this.age} years old, My language is ${this.language}.`);
    }
    codeWord(word: string) {
        return word;
    }
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
const coder1 = new Coder('Evan You', 18);
console.log(coder1);
console.log(coder1.codeWord('Hello world!'));
coder1.introduce();

// 下面代码演示了 因为类的constructor为类的静态方法 所以无法实现接口的new
// interface ClockConstructor {
//     new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
//     currentTime: Date;
//     constructor(h: number, m: number) { }
// }

// 下面代码采用 直接操作类的静态部分 实现以上代码的缺陷
interface ClockInterface {
    tick(): void;
}
interface ClockConstructor {
    new(h: number, m: number): ClockInterface;
}

class Clock1 implements ClockInterface {
    tick() {
        console.log('didadida');
    }
    constructor(h: number, m: number) { }
}
class Clock2 implements ClockInterface {
    tick() {
        console.log('dadidadi');
    }
    constructor(h: number, m: number) { }
}

// 这里的ClockConstructor接口会检查传进来的参数类Clck（Clock1/Clock2）是否符合构造函数签名
function createClock(Clck: ClockConstructor, h: number, m: number): ClockInterface {
    return new Clck(h, m);
}

var clock1 = createClock(Clock1, 12, 24);
var clock2 = createClock(Clock2, 16, 52);

console.log(clock1);
console.log(clock2);


// 接口继承
// 一个接口可继承多个接口 用逗号(,)拼接
interface Animal {
    sex: string;
}
interface Dog extends Animal {
    bark(): void;
    color: string;
}

let dog1 = {} as Dog;
dog1.bark = () => { console.log('汪汪...'); }
dog1.sex = 'Male';
dog1.color = "black";

dog1.bark();
console.log(dog1);

// 混合类型
// 一个对象同时具有多种类型
// 例子：一个对象可以同时作为函数和对象使用，并带有额外属性。
interface Counter {
    (): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>(() => {
        console.log('this:',this);
        console.log('this.interval:', this.interval)
        this.interval--;
        return `当前倒计时为 ${this.interval}s `;
    });
    counter.interval = 123;
    counter.reset = function() {
        this.interval = 123;
    }
    return counter;
}
const c = getCounter();
console.log('c:', c);
console.log('call1', c.call(c));
c.reset();
console.log('call2', c.call(c));