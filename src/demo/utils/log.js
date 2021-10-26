export function log(type){
    return function (target,name,descriptor){
        let oldValue = descriptor.value
        descriptor.value = function (){
            console.log(`日志 ${type}`)
            return oldValue.apply(this,arguments)
        }
        return descriptor
    }
}