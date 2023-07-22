import{_ as b,k as B,a as O,f as p,o as l,c as u,i as m,v as h,b as e,F as y,g,t as r,n as P,j as S,p as q,e as A}from"./index-7369eac5.js";const k="https://649fbf32ed3c41bdd7a6a1d1.mockapi.io/api/food/users",w={name:"Order",components:{},data(){return{usersOrders:[]}},async mounted(){let t;if(this.isAdmin||(t=B("user").admin),this.isAdmin||t)try{let s=await O.get(k);s=s.data;const c=[];s.length&&(s.forEach(d=>{d.admin||d.orders.forEach(o=>{o.user=d.user,c.push(o)})}),c.sort((d,o)=>d.timestamp>o.timestamp?-1:d.timestamp<o.timestamp?1:0),this.usersOrders=c)}catch(s){console.log(s)}},methods:{total(t){let s=0,c=0;return t.products.forEach(d=>{s+=this.getProductById(d.productId).price*d.quantity,c+=d.quantity}),{money:s,quantity:c}}},computed:{...p("user",["getOrders"]),...p("user",{admin:"isAdmin"}),...p("product",["getProductById"]),orders(){return this.isAdmin?this.usersOrders:this.getOrders},isAdmin(){return this.admin}}},_=t=>(q("data-v-f28c9bee"),t=t(),A(),t),E={class:"orders"},F={class:"product-elements-header"},L={class:"product-elements"},N={class:"product-element t-header"},D=_(()=>e("div",{class:"product-element t-header"},"Fecha y hora:",-1)),C={class:"product-element t-header"},V={class:"product-element t-header"},j={class:"product-element t-header"},z=S('<div class="product-elements-header" data-v-f28c9bee><div class="product-elements" data-v-f28c9bee><div class="product-element t-header" data-v-f28c9bee>Producto</div><div class="product-element t-header" data-v-f28c9bee>Imagen</div><div class="product-element t-header" data-v-f28c9bee>Precio</div><div class="product-element t-header" data-v-f28c9bee>Cantidad</div><div class="product-element t-header" data-v-f28c9bee>Sub total</div></div></div>',1),G={class:"product-element"},R={class:"product-element"},T={class:"image-container"},U=["src","alt"],x={class:"product-element"},H={class:"quantity"},J={class:"product-element"},K={class:"quantity"},M={class:"product-element"},Q={class:"product-elements-header"},W={class:"product-elements"},X=_(()=>e("div",{class:"product-element t-header"},null,-1)),Y=_(()=>e("div",{class:"product-element t-header"},null,-1)),Z=_(()=>e("div",{class:"product-element t-header"},null,-1)),$={class:"product-element t-header"},ee={class:"product-element t-header"},te={class:"empty"};function se(t,s,c,d,o,a){return l(),u("div",null,[m(e("div",E,[(l(!0),u(y,null,g(a.orders,(n,v)=>(l(),u("div",{class:"order",key:`${v}-order`},[e("div",F,[e("div",L,[e("div",N,"Nº "+r(a.orders.length-v),1),m(e("div",{class:"product-element t-header"},r(n.user),513),[[h,a.isAdmin]]),D,e("div",C,r(new Date(n.timestamp).toLocaleString()),1),m(e("div",V,null,512),[[h,!a.isAdmin]]),e("div",j,"Total: "+r(a.total(n).money),1)])]),z,(l(!0),u(y,null,g(n.products,(i,f)=>(l(),u("div",{key:`${f}-order`},[e("div",{class:P(`product-elements ${f%2===1?"even-line":""}`)},[e("div",G,r(t.getProductById(i.productId).title),1),e("div",R,[e("div",T,[e("img",{src:t.getProductById(i.productId).img,alt:t.getProductById(i.productId).title,onLoad:s[0]||(s[0]=I=>I.target.style.opacity=1)},null,40,U)])]),e("div",x,[e("span",H,r(t.getProductById(i.productId).price),1)]),e("div",J,[e("span",K,r(i.quantity),1)]),e("div",M,r(t.getProductById(i.productId).price*i.quantity),1)],2)]))),128)),e("div",Q,[e("div",W,[X,Y,Z,e("div",$,r(a.total(n).quantity),1),e("div",ee,r(a.total(n).money),1)])])]))),128)),m(e("div",te,"No hay órdenes de compra",512),[[h,!a.orders.length]])],512),[[h,a.orders.length||o.usersOrders.length]])])}const re=b(w,[["render",se],["__scopeId","data-v-f28c9bee"]]);export{re as default};
