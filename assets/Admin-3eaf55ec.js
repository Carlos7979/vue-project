import{T as f}from"./Trash-2a2d2564.js";import{_ as l,o,c,b as t,m as k,a as w,f as P,r as i,d as n,i as B,v as C,F as $,g as x,j as u,t as r}from"./index-de7c6cf0.js";import{B as E}from"./Button-37345bc4.js";import{S as L}from"./sweetalert2.all-4f073957.js";const y={},S={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:"20",fill:"currentColor"},b=t("path",{d:"M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"},null,-1),A=[b];function T(e,d){return o(),c("svg",S,A)}const I=l(y,[["render",T]]);const z="https://649fd22fed3c41bdd7a6bb8d.mockapi.io/api/food",D={name:"Admin",components:{Trash:f,Edit:I,Button:E},data(){return{}},methods:{...k("product",["updateProducts"]),handleShowInfo(e){this.$router.push({path:`/info/${e}`})},addProduct(){this.$router.push({path:"/admin/product/new-product"})},editProduct(e){this.$router.push({path:`/admin/product/${e}`})},deleteProduct(e){L.fire({title:"¿Estás seguro(a)?",html:`¿Deseas eliminar el producto <b>${e.title}</b>?`,footer:"Esta acción no puede revertirse",icon:"warning",showCloseButton:!0,showCancelButton:!0,cancelButtonText:"Cancelar",confirmButtonText:"Eliminar",reverseButtons:!0,imageUrl:e.img,imageWidth:"auto",imageHeight:200,imageAlt:e.title}).then(async d=>{d.isConfirmed&&(await w.delete(`${z}/products/${e.id}`)).status===200&&this.updateProducts({action:"delete",product:e})}).catch(d=>console.log(d))}},computed:{...P("product",["getProducts"]),products(){return this.getProducts}}},M={class:"products"},N=u('<div class="product-elements-header" data-v-2023038e><div class="product-elements" data-v-2023038e><div class="product-element t-header" data-v-2023038e>Producto</div><div class="product-element t-header" data-v-2023038e>Imagen</div><div class="product-element t-header" data-v-2023038e>Precio</div><div class="product-element t-header" data-v-2023038e>Stock</div><div class="product-element t-header" data-v-2023038e>Editar</div><div class="product-element t-header" data-v-2023038e>Eliminar</div></div></div>',1),V={class:"product-elements"},q=["onClick"],F={class:"product-element"},U={class:"image-container"},j=["src","alt"],G={class:"product-element"},H={class:"quantity"},R={class:"product-element"},W={class:"quantity"},J={class:"product-element"},K=["onClick"],O=["onClick"],Q=u('<div class="product-elements-header" data-v-2023038e><div class="product-elements" data-v-2023038e><div class="product-element t-header" data-v-2023038e>Producto</div><div class="product-element t-header" data-v-2023038e>Imagen</div><div class="product-element t-header" data-v-2023038e>Precio</div><div class="product-element t-header" data-v-2023038e>Stock</div><div class="product-element t-header" data-v-2023038e>Editar</div><div class="product-element t-header" data-v-2023038e>Eliminar</div></div></div>',1);function X(e,d,v,Y,Z,a){const m=i("Button"),h=i("Edit"),_=i("Trash");return o(),c("div",null,[n(m,{click:a.addProduct,text:"Agregar producto"},null,8,["click"]),B(t("div",M,[N,(o(!0),c($,null,x(a.products,(s,p)=>(o(),c("div",{key:`${p}-product`},[t("div",V,[t("div",{onClick:()=>a.handleShowInfo(s.id),class:"product-element route"},r(s.title),9,q),t("div",F,[t("div",U,[t("img",{src:s.img,alt:s.title,onLoad:d[0]||(d[0]=g=>g.target.style.opacity=1)},null,40,j)])]),t("div",G,[t("span",H,r(s.price),1)]),t("div",R,[t("span",W,r(s.stock),1)]),t("div",J,[t("span",{class:"click-cart",onClick:()=>a.editProduct(s.id)},[n(h)],8,K)]),t("div",{class:"product-element click-cart trash",onClick:()=>a.deleteProduct(s)},[n(_)],8,O)])]))),128)),Q],512),[[C,a.products.length]])])}const at=l(D,[["render",X],["__scopeId","data-v-2023038e"]]);export{at as default};
