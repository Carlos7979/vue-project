import{C as k,a as w}from"./CartPlusIcon-4f3dad4e.js";import{B as b}from"./ButtonVue-49e673a6.js";import{T as S}from"./TrashVue-a7898c50.js";import{S as p}from"./sweetalert2.all-4f073957.js";import{_ as q,m as v,a as f,f as d,r as o,o as l,c as u,i as h,v as m,b as e,d as n,F as E,g as Q,t as r,j as T,p as R,e as U}from"./index-ef0db215.js";const{VITE_FOOD_URL:D,VITE_USER_URL:L}={BASE_URL:"/vue-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},x={name:"Cart",components:{CartMinusIconVue:k,CartPlusIcon:w,TrashVue:S,ButtonVue:b},data(){return{}},methods:{...v("cart",["setQuantity"]),...v("user",["addPurchase"]),handleShowInfo(t){this.$router.push({path:`/info/${t}`})},addQuantity(t){this.setQuantity(t)},removeQuantity(t){t.quantity>=0&&this.setQuantity(t)},emptyProduct(t){this.setQuantity(t)},async confirmPurchase(){try{if((await p.fire({title:"Confirmación de compra",html:`¿Confirmas la compra de <b>${this.totalProducts}</b> producto${this.totalProducts>1?"s":""} por un monto total de <b>${this.totalAmount}</b>?`,footer:"Esta acción no puede revertirse",icon:"question",showCloseButton:!0,showCancelButton:!0,cancelButtonText:"Cancelar",confirmButtonText:"Comprar",reverseButtons:!0})).isConfirmed){const i=[{timestamp:Date.now(),products:this.cart},...this.orders];(await f.put(`${L}/${this.user.id}`,{orders:i})).status===200&&(await f.put(`${D}carts/${this.user.cart}`,{cart:[]})).status===200&&(await p.fire({icon:"success",title:"La compra se ha realizado exitosamente",showConfirmButton:!1,timer:1500}),this.addPurchase(i))}}catch(t){console.log(t)}}},computed:{...d("product",["getProductById"]),...d("cart",["getCart"]),...d("user",["getOrders","getUser"]),totalProducts(){let t=0;return this.cart.forEach(c=>{t+=c.quantity}),t},totalAmount(){let t=0;return this.cart.forEach(c=>{t+=this.getProductById(c.productId).price*c.quantity}),t},cart(){return this.getCart},orders(){return this.getOrders},user(){return this.getUser}}},_=t=>(R("data-v-b2823c3c"),t=t(),U(),t),O={class:"cart"},A=T('<div class="cart-elements-header" data-v-b2823c3c><div class="cart-elements" data-v-b2823c3c><div class="cart-element t-header" data-v-b2823c3c>Producto</div><div class="cart-element t-header" data-v-b2823c3c>Precio</div><div class="cart-element t-header" data-v-b2823c3c>Cantidad</div><div class="cart-element t-header" data-v-b2823c3c>Total</div><div class="cart-element t-header" data-v-b2823c3c>Quitar</div></div></div>',1),M={class:"cart-elements"},$=["onClick"],F={class:"cart-element"},N={class:"cart-element"},j=["onClick"],z={class:"quantity"},G=["onClick"],H={class:"cart-element"},J=["onClick"],K={class:"cart-elements-header"},W={class:"cart-elements"},X=_(()=>e("div",{class:"cart-element t-header"},null,-1)),Y=_(()=>e("div",{class:"cart-element t-header"},null,-1)),Z={class:"cart-element t-header"},tt={class:"cart-element t-header"},et=_(()=>e("div",{class:"cart-element t-header"},null,-1)),at={class:"empty"};function st(t,c,i,y,C,s){const I=o("ButtonVue"),P=o("CartMinusIconVue"),B=o("CartPlusIcon"),g=o("TrashVue");return l(),u("div",null,[h(e("div",O,[n(I,{click:s.confirmPurchase,text:"Confirmar compra"},null,8,["click"]),A,(l(!0),u(E,null,Q(s.cart,(a,V)=>(l(),u("div",{key:`${V}-product`},[h(e("div",M,[e("div",{onClick:()=>s.handleShowInfo(a.productId),class:"cart-element route"},r(t.getProductById(a.productId).title),9,$),e("div",F,r(t.getProductById(a.productId).price),1),e("div",N,[e("span",{class:"click-cart",onClick:()=>s.removeQuantity({quantity:a.quantity-1,productId:a.productId})},[n(P)],8,j),e("span",z,r(a.quantity),1),e("span",{class:"click-cart",onClick:()=>s.addQuantity({quantity:a.quantity+1,productId:a.productId})},[n(B)],8,G)]),e("div",H,r(a.quantity*t.getProductById(a.productId).price),1),e("div",{class:"cart-element click-cart trash",onClick:()=>s.emptyProduct({quantity:0,productId:a.productId})},[n(g)],8,J)],512),[[m,a.quantity>0]])]))),128)),e("div",K,[e("div",W,[X,Y,e("div",Z,r(s.totalProducts),1),e("div",tt,r(s.totalAmount),1),et])])],512),[[m,s.cart.length]]),h(e("div",at,"El carrito de compras se encuentra vacío",512),[[m,!s.cart.length]])])}const dt=q(x,[["render",st],["__scopeId","data-v-b2823c3c"]]);export{dt as default};
