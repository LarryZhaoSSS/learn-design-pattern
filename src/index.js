console.log(100)
class Person {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
}
let p = new Person("pppp")
alert(p.getName())