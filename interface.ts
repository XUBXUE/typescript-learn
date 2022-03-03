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