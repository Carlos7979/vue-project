import{T as f}from"./TrashVue-3ba92866.js";import{_ as l,o,c,b as t,m as b,a as k,f as w,r as i,d as n,i as P,v as V,F as B,g as C,j as u,t as r}from"./index-c066fabd.js";import{B as $}from"./ButtonVue-a29579dd.js";import{S as x}from"./sweetalert2.all-4f073957.js";const E={},L={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:"20",fill:"currentColor"},y=t("path",{d:"M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"},null,-1),S=[y];function A(e,s){return o(),c("svg",L,S)}const T=l(E,[["render",A]]);const I="https://649fd22fed3c41bdd7a6bb8d.mockapi.io/api/food",z={name:"Admin",components:{TrashVue:f,EditVue:T,ButtonVue:$},data(){return{}},methods:{...b("product",["updateProducts"]),handleShowInfo(e){this.$router.push({path:`/info/${e}`})},addProduct(){this.$router.push({path:"/admin/product/new-product"})},editProduct(e){this.$router.push({path:`/admin/product/${e}`})},deleteProduct(e){x.fire({title:"¿Estás seguro(a)?",html:`¿Deseas eliminar el producto <b>${e.title}</b>?`,footer:"Esta acción no puede revertirse",icon:"warning",showCloseButton:!0,showCancelButton:!0,cancelButtonText:"Cancelar",confirmButtonText:"Eliminar",reverseButtons:!0,imageUrl:e.img,imageWidth:"auto",imageHeight:200,imageAlt:e.title}).then(async s=>{s.isConfirmed&&(await k.delete(`${I}/products/${e.id}`)).status===200&&this.updateProducts({action:"delete",product:e})}).catch(s=>console.log(s))}},computed:{...w("product",["getProducts"]),products(){return this.getProducts}}},D={class:"products"},M=u('<div class="product-elements-header" data-v-b4d26024><div class="product-elements" data-v-b4d26024><div class="product-element t-header" data-v-b4d26024>Producto</div><div class="product-element t-header" data-v-b4d26024>Imagen</div><div class="product-element t-header" data-v-b4d26024>Precio</div><div class="product-element t-header" data-v-b4d26024>Stock</div><div class="product-element t-header" data-v-b4d26024>Editar</div><div class="product-element t-header" data-v-b4d26024>Eliminar</div></div></div>',1),N={class:"product-elements"},q=["onClick"],F={class:"product-element"},U={class:"image-container"},j=["src","alt"],G={class:"product-element"},H={class:"quantity"},R={class:"product-element"},W={class:"quantity"},J={class:"product-element"},K=["onClick"],O=["onClick"],Q=u('<div class="product-elements-header" data-v-b4d26024><div class="product-elements" data-v-b4d26024><div class="product-element t-header" data-v-b4d26024>Producto</div><div class="product-element t-header" data-v-b4d26024>Imagen</div><div class="product-element t-header" data-v-b4d26024>Precio</div><div class="product-element t-header" data-v-b4d26024>Stock</div><div class="product-element t-header" data-v-b4d26024>Editar</div><div class="product-element t-header" data-v-b4d26024>Eliminar</div></div></div>',1);function X(e,s,v,Y,Z,a){const m=i("ButtonVue"),h=i("EditVue"),_=i("TrashVue");return o(),c("div",null,[n(m,{click:a.addProduct,text:"Agregar producto"},null,8,["click"]),P(t("div",D,[M,(o(!0),c(B,null,C(a.products,(d,p)=>(o(),c("div",{key:`${p}-product`},[t("div",N,[t("div",{onClick:()=>a.handleShowInfo(d.id),class:"product-element"},r(d.title),9,q),t("div",F,[t("div",U,[t("img",{src:d.img,alt:d.title,onLoad:s[0]||(s[0]=g=>g.target.style.opacity=1)},null,40,j)])]),t("div",G,[t("span",H,r(d.price),1)]),t("div",R,[t("span",W,r(d.stock),1)]),t("div",J,[t("span",{class:"click-cart",onClick:()=>a.editProduct(d.id)},[n(h)],8,K)]),t("div",{class:"product-element click-cart trash",onClick:()=>a.deleteProduct(d)},[n(_)],8,O)])]))),128)),Q],512),[[V,a.products.length]])])}const at=l(z,[["render",X],["__scopeId","data-v-b4d26024"]]);export{at as default};
