import{C as d}from"./CardVue-4b56a5c1.js";import{_ as u,f as s,r as i,o as t,c as e,F as p,g as _,d as m}from"./index-c2968245.js";const l={name:"Listing",components:{CardVue:d},props:{cart:Array},data(){return{}},methods:{},computed:{...s("product",["getProducts"]),...s("cart",["getQuantity"]),products(){return this.getProducts}}},g={class:"listing"};function f(a,y,v,V,C,o){const n=i("CardVue");return t(),e("div",g,[(t(!0),e(p,null,_(o.products,(r,c)=>(t(),e("div",{key:`${c}-product`},[m(n,{product:r,quantity:a.getQuantity(r.id)},null,8,["product","quantity"])]))),128))])}const $=u(l,[["render",f],["__scopeId","data-v-fdc5da64"]]);export{$ as default};
