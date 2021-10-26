import {App} from "./demo/App";

console.log('-------工厂模式--------')
class Product {
    constructor(name) {
        this.name = name
    }
    init() {
        console.log(`---init--product-${this.name}`)
    }

}
class Creator {
    create(name){
        return new Product(name)
    }
}
let creator = new Creator()
let p = creator.create('p1')
p.init()
console.log('-------单例模式--------')
class SingleObject {
    login() {
        console.log('login---')
    }
}
SingleObject.getInstance =(function (){
   let instance
    return function (){
       if(!instance){
           instance = new SingleObject()
       }
       return instance
    }
})()
let singleObj1 = SingleObject.getInstance()
singleObj1.login()
let singleObj2 = SingleObject.getInstance()
singleObj2.login()
console.log(`singleObj1 === singleObj2`,singleObj1===singleObj2)

console.log('------适配器模式---------')

class Adaptor {
    specificRequest() {
        return 'standard'
    }
}
class Target{
    constructor() {
        this.adapt = new Adaptor()
    }
    request(){
        let info = this.adapt.specificRequest()
        return `${info}-转换器-special`
    }
}
const adaptTarget  = new Target()
const res = adaptTarget.request()
console.log(res)

console.log('-----装饰器模式--------')

class Circle {
    draw(){
        console.log('----draw-circle---')
    }
}
class Decorator {
    constructor(circle) {
        this.circle = circle
    }
    draw(){
        this.circle.draw()
        this.setRedBorder(this.circle)
    }
    setRedBorder(circle){
        console.log('-----set-red-border----')
    }
}
let circle = new Circle()
circle.draw()
let dec = new Decorator(circle)
dec.draw()

function testDec(isDec){
    return function(target){
        target.isDec = isDec
    }
}

@testDec(false)
class Demo{

}
console.log(Demo.isDec)
console.log('----------代理模式------------')

let star = {
    name:'张XXX',
    age:25,
    phone:'13801530110'
}
let agent = new Proxy(star,{
    get(target,key){
        if(key==='phone'){
            return '18901560228'
        }
        if(key === 'price'){
            return 120000
        }
        return target[key]
    },
    set(target,key,val){
        if(key==='customPrice'){
            if(val<100000){
                throw new Error('need more')
            } else {
                target[key] = val
                return true
            }
        }
    }
})
console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)
agent.customPrice = 150000
console.log(agent.customPrice)
// agent.customPrice = 90000
// console.log(agent.price)

console.log('-----------观察者模式-------------')

class Subject {
    constructor() {
        this.state = 0
        this.observers =[]
    }
    getState(){
        return this.state
    }
    setState(state) {
        this.state = state
        this.notifyAllObservers()
    }
    notifyAllObservers(){
        this.observers.forEach(observer=>{
            observer.update()
        })
    }
    attach(observer){
        this.observers.push(observer)
    }
}
class Observer {
    constructor(name,subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }
    update(){
        console.log(`${this.name} update ${this.subject.getState()}`)
    }
}
const subject = new Subject()
const object1 = new Observer('object1',subject)
const object2 = new Observer("object2",subject)
const object3 = new Observer("object3",subject)
subject.setState(1)
subject.setState(2)

console.log('---------迭代器模式-----------')
class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0
    }
    next(){
        if(this.hasNext()){
            return this.list[this.index++]
        }
        return null
    }
    hasNext(){
        if(this.index >= this.list.length){
            return false
        }
        return true
    }
}
class Container {
    constructor(list) {
        this.list = list
    }
    getIterator() {
        return new Iterator(this)
    }
}

const arr  = [1,2,3,4]
const container = new Container(arr)
const iterator = container.getIterator()
while(iterator.hasNext()){
    console.log(iterator.next())
}
console.log('-----状态模式-------')
class State {
    constructor(color) {
        this.color = color
    }
    handle(context) {
        console.log(`turn to  ${this.color}`)
        context.setState(this)
    }
}
class Context {
    constructor() {
        this.state = null
    }
    getState(){
        return this.state
    }
    setState(state){
        this.state= state
    }
}

const context  = new Context()
const green = new State('green')
const yellow = new State('yellow')
const red  = new State('red')
green.handle(context)
console.log(context.getState())
yellow.handle(context)
console.log(context.getState())
red.handle(context)
console.log(context.getState())

console.log('--------------原型模式------------')
const prototype = {
    getName(){
      return `${this.first}-${this.last}`
    },
    say(){
        console.log(`---prototype-${this.getName()}-say`)
    }
}
const xProto = Object.create(prototype)
xProto.first = 'xFirst'
xProto.last = 'XLast'
console.log(xProto.getName())
xProto.say()
const yProto = Object.create(prototype)
yProto.first = 'yFirst'
yProto.last = 'yLast'
console.log(yProto.getName())
yProto.say()

console.log('---------命令模式--------------')
class Receiver {
    exec(){
        console.log('执行')
    }
}
class Command {
    constructor(receiver) {
        this.receiver = receiver
    }
    cmd(){
        console.log('执行命令')
        this.receiver.exec()
    }
}
class Invoker {
    constructor(command) {
        this.command = command
    }
    invoke(){
        console.log('开始触发')
        this.command.cmd()
    }
}
const soldier = new Receiver()
const trumpeter = new Command(soldier)
const general = new Invoker(trumpeter)
general.invoke()

console.log('-----------备忘录模式-----------')
class Memento {
    constructor(content) {
        this.content = content
    }
    getContent() {
        return this.content
    }
}
class CareTaker {
    constructor() {
        this.list = []
    }
    add(memento){
        this.list.push(memento)
    }
    get(index) {
        return this.list[index]
    }
}
class Editor {
    constructor() {
        this.content = null
    }
    setContent(content) {
        this.content = content
    }
    getContent(){
        return this.content
    }
    saveContentToMemento(){
       return new Memento(this.content)
    }
    getContentFromMemento(memento){
        this.content = memento.getContent()
    }
}

const editor = new Editor()
const careTaker = new CareTaker()
editor.setContent('内容111111111')
editor.setContent('内容222222222222')
careTaker.add(editor.saveContentToMemento())
editor.setContent('内容33333')
careTaker.add(editor.saveContentToMemento())
console.log(editor.getContent())
editor.getContentFromMemento(careTaker.get(0))
console.log(editor.getContent())

console.log('------中介者模式------------------')
class A {
    constructor() {
        this.number = 0
    }
    setNumber(num,m){
       this.number = num
        if(m){
            m.setB()
        }
    }
}
class N {
    constructor() {
        this.number = 0
    }
    setNumber(num,m){
        this.number = num
        if(m) {
            m.setA()
        }
    }
}
class Mediator {
    constructor(a,b) {
        this.a = a;
        this.b = b;
    }
    setB(){
        const number = this.a.number
        this.b.setNumber(number*100)
    }
    setA(){
        const number = this.b.number
        this.a.setNumber(number*101)
    }
}
const a1 = new A()
const b1 = new N()
const m = new Mediator(a1,b1)
a1.setNumber(100,m)
console.log(a1.number,b1.number)
b1.setNumber(101,m)
console.log(a1.number,b1.number)

const app = new App('app')
app.init()