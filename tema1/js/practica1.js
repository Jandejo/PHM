class Person {
    constructor(firstname, lastname, age, gender, interests) {
        this.name = {
            first: firstname,
            last: lastname
        }
        this.age = age;
        this.gender = gender;
        this.interests = interests;
        this.getName = function () { 
        return this.name.first + " " + this.name.last;
        };
        this.bio = function () {
            return 'My name is ' + this.name.first + ' I have ' +  this.age + ' years old, Im' + " " + this.gender + ', and I enjoy' + " "  + this.interests[1];
        }
    }

    greeting() {
        alert('Hello ' + this.name.first);
    }
}

let person1 = new Person('Juan', 'Cano', 32, 'male', ['skate', 'runner', 'driving', 'playing']);
console.log(person1.bio());
person1.greeting();