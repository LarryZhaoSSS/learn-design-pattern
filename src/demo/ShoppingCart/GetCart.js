class Cart {
    constructor() {
        this.list = []
    }
    add(data){
        this.list.push(data)
    }
    del(id){
        this.list = this.list.filter(item=>item.id !== id)
    }
    getList() {
        return this.list.map(item=>item.name).join('\n')
    }
}
const getCart = (function (){
   let cart
   return function () {
       if(!cart) {
           cart = new Cart()
       }
       return cart
   }
})()

export {getCart}