import $ from 'jquery'
import {GET_LIST} from "../config/config.js";
import createItem from './CreateItem'
export class List {
    constructor(app) {
        this.app = app
        this.$el = $(`<div>`)
    }
    loadData(){
        return fetch(GET_LIST).then(result=>{
            return result.json()
        })
    }
    initItemList(data){
        data.map(itemData=>{
            let item = createItem(this,itemData)
            item.init()
            return item
        })
    }
    render(){
        this.app.$el.append(this.$el)
    }
    init(){
        this.loadData().then(data=>{
            this.initItemList(data)
        }).then(()=>{
            this.render()
        })
    }
}