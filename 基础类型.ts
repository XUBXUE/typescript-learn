// boolean类型
let isDone1: boolean = false;
let isDone2: boolean = true;

// number类型
let decLiteral: number = 6; //十进制
let hexLiteral: number = 0xf00d; // 十六进制
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制

// string类型
let name1: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${name1}.

I'll be ${age + 1} years old next month.`;

// array类型
let ages: number[] = [1, 2, 3];
let names: any[] = [1, 'xbx', true];
let arr: Array<number | string | boolean> = [1, 2, 3, "4", true];
let arr2: Array<any> = [1, 2, 3, "4", true];

// ReadonlyArray类型
let a2: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a2;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a2 = ro; // error!
a2 = ro as Array<number>// ro as number[]


// 元组 规定一个已知元素数量和类型的数组
let arr3: [string, number];
arr3 = ['1', 123];
// 以下情况都会报错
// arr2[1] = '321';
// arr2[3] = '321';
// arr2[4] = false;

// 枚举  每个枚举值的索引为上一个枚举值的索引+1 若重复则覆盖索引值为键名对应的值
enum Colors {red = 2, green = 1 , blue};
let color = Colors.red;
console.log(Colors); // { '1': 'green', '2': 'blue', red: 2, green: 1, blue: 2 }

// any类型  定义任意类型变量
// 下面代码没有检索出错误 但在调用toFixed函数时 会报错
let a: any = {};
// a.toFixed(2);

// void类型 一般用来定义没有返回值的函数和值为undefined和null的变量
let noreturn = (): void => {}
let undefine1:void = undefined;
let nul1:void = null;

/**
 * never类型表示的是那些永不存在的值的类型。
 * 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型;
 * 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
 * never类型是任何类型的子类型，也可以赋值给任何类型；
 * 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。
 * 即使 any也不可以赋值给never。
 */
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

// Object类型，除了null和对象和undefined（undefined和null是所有类型的子类型，所以可以赋值给任意类型）之外所有的类型（如：number、string、boolean、symbol、bigint等）；
let obj1: object = {};
let obj2: object = null;
let obj3: object = undefined;
// 以下内容会检查类型错误报错
// let obj4: object = 'null';
// let obj5: object = true
// let obj6: object = Symbol();
// let obj7: object = 124n;
// let obj8: object = 1;

// 类型断言 表示能够确定某个数据的数据类型
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
// 第一种表示方法：尖括号
let msg: any = 'I like Eminem!';
let msgLen = (<string>msg).length;
// 第二种表示方法：as
let msg2: any = 'I like Eminem!';
let msgLen2 = (msg2 as string).length;


