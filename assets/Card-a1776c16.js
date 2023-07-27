import{h as p,m as h,f as Q,_ as w,r as c,i as r,v as u,o as C,c as I,b as t,d as o,n as d,t as n,p as q,e as k}from"./index-a47dc412.js";const b=await p(()=>import("./index-f3b7d2d1.js"),["assets/index-f3b7d2d1.js","assets/index-a47dc412.js","assets/index-5eceecdd.css","assets/CartPlusIcon-0f46d090.js","assets/CartPlusIcon-18318f7e.css","assets/Trash-772b9d50.js"]),S={name:"Card",components:{...b},props:{product:Object,detail:{type:Boolean,default:!1},quantity:{type:Number,default:0}},data(){return{allowAddQuantity:!0,allowRemoveQuantity:!0}},methods:{...h("user",{toggle:"toggleFav"}),...h("cart",["setQuantity"]),toggleFav(){this.toggle(this.product.id)},async addQuantity(){this.allowAddQuantity&&(this.allowAddQuantity=!1,await this.setQuantity({quantity:this.quantity+1,productId:this.product.id}),this.allowAddQuantity=!0)},async removeQuantity(){this.quantity>0&&this.allowRemoveQuantity&&(this.allowRemoveQuantity=!1,await this.setQuantity({quantity:this.quantity-1,productId:this.product.id})),this.allowRemoveQuantity=!0},emptyProduct(){this.quantity>0&&this.setQuantity({quantity:0,productId:this.product.id})},handleShowInfo(){this.detail||this.$router.push({path:`/info/${this.product.id}`})}},computed:{...Q("user",["getFavById"]),fav(){return this.getFavById(this.product.id)},addQuantityClass(){return[this.quantity?"added-cart cart-element":"cart-element",this.allowAddQuantity?"":"disable"]}}},A=l=>(q("data-v-5c32ca23"),l=l(),k(),l),P={class:"fav"},B=["src","alt","height"],F={class:"card-body"},R={class:"card-title"},x={class:"card-text"},D={class:"list-group list-group-flush"},H={class:"list-group-item"},V={class:"card-body"},E=A(()=>t("div",{class:"cart-header"},[t("span",{class:"card-link"},"Agregar al carrito"),t("span",null,"Vaciar")],-1)),N={class:"add-cart-icons"},O={class:"cart-element"},T={class:"quantity cart-element"};function j(l,i,a,L,y,e){const _=c("Heart"),v=c("HeartSolid"),m=c("CartMinusIcon"),g=c("CartPlusIcon"),f=c("Trash");return r((C(),I("div",{class:d(a.detail?"card detail":"card")},[t("div",{class:"heart",onClick:i[0]||(i[0]=(...s)=>e.toggleFav&&e.toggleFav(...s))},[r(t("div",null,[o(_)],512),[[u,!e.fav]]),r(t("div",P,[o(v)],512),[[u,e.fav]])]),t("img",{src:a.product.img,class:d(a.detail?"card-img-top":"card-img-top card-image"),alt:a.product.title,height:a.detail?"":"200",onClick:i[1]||(i[1]=(...s)=>e.handleShowInfo&&e.handleShowInfo(...s)),onLoad:i[2]||(i[2]=s=>s.target.style.opacity=1)},null,42,B),t("div",F,[t("h5",R,n(a.product.title),1),t("p",x,n(a.detail?a.product.largeDescription:a.product.shortDescription),1)]),t("ul",D,[t("li",H,"Precio: "+n(a.product.price)+" $",1)]),t("div",V,[E,t("div",N,[t("div",{class:d(a.detail?"add-cart add-cart-detail":"add-cart")},[t("div",{class:d(a.quantity&&y.allowRemoveQuantity?"click-cart":"disable"),onClick:i[3]||(i[3]=(...s)=>e.removeQuantity&&e.removeQuantity(...s))},[t("div",O,[o(m)])],2),t("div",T,n(a.quantity),1),t("div",{class:d(y.allowAddQuantity?"click-cart":"disable"),onClick:i[4]||(i[4]=(...s)=>e.addQuantity&&e.addQuantity(...s))},[t("div",{class:d(e.addQuantityClass)},[o(g)],2)],2)],2),t("div",{onClick:i[5]||(i[5]=(...s)=>e.emptyProduct&&e.emptyProduct(...s)),class:d(a.quantity?"fav click-cart":"disable")},[o(f)],2)])])],2)),[[u,Object.keys(a.product).length>0]])}const z=w(S,[["render",j],["__scopeId","data-v-5c32ca23"]]);export{z as C};
