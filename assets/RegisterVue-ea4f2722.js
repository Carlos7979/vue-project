import{I as m}from"./InputVue-a22b3a04.js";import{S as h}from"./sweetalert2.all-4f073957.js";import{_,m as I,a as d,s as g,r as c,o as b,c as w,b as l,d as a,n as x,w as y,p as v,e as S}from"./index-c066fabd.js";const u="https://649fbf32ed3c41bdd7a6a1d1.mockapi.io/api/food/users",k="https://649fd22fed3c41bdd7a6bb8d.mockapi.io/api/food",R={name:"Register",components:{InputVue:m},props:{},data(){return{form:{name:"",last_name:"",email:"",user:"",password:"",confirmPassword:""},isSubmitted:!1,error:!1}},methods:{...I("user",["login"]),handleInput([t,e]){this.form[t]=e,this.isSubmitted&&this.validate()&&(this.error=!1)},async validate(){const t=this.$refs.error;for(const e in this.form)if(!this.form[e])return t.innerText="Todos los campos son obligatorios",this.error||(this.error=!0),!1;try{let e=await d.get(u);if(e=e.data,e.length){if(e.some(o=>o.email===this.form.email))return t.innerText="El correo electrónico ya se encuentra registrado",this.error||(this.error=!0),!1;if(e.some(o=>o.user===this.form.user))return t.innerText="El nombre de usuario ya se encuentra registrado",this.error||(this.error=!0),!1}return this.form.password!==this.form.confirmPassword?(t.innerText="Las contraseñas no coinciden",this.error||(this.error=!0),!1):(t.innerText="",!0)}catch(e){return console.log(e),e.message&&(t.innerText=`Falla del servidor:
${e.message}`,this.error||(this.error=!0)),!1}},handleLogin(t){this.login(t)}},mounted(){this.$refs.form.addEventListener("submit",async e=>{e.preventDefault(),this.isSubmitted=!0;try{if(await this.validate()){const i={...this.form};delete i.confirmPassword;let n=await d.post(`${k}/carts`);if(n.data){n=n.data,i.cart=n.id;let r=await d.post(u,i);r&&(r=r.data,delete r.password,h.fire({icon:"success",title:"Registro exitoso",showConfirmButton:!1,timer:1500}).then(()=>{e.target.reset();for(const s in this.form)this.form[s]="";this.isSubmitted=!1,g("user",r),this.handleLogin(r),this.$router.push({path:"/listing"})}))}}}catch(o){console.log(o)}})}},p=t=>(v("data-v-a4cc911e"),t=t(),S(),t),T={class:"register"},L={ref:"form",action:"",method:"post"},V=p(()=>l("button",{class:"btn form-control text-bg-dark p-3"},"REGÍSTRATE",-1)),E=p(()=>l("button",{class:"btn form-control text-bg-primary mt-2"},"Ingresar",-1));function B(t,e,o,i,n,r){const s=c("InputVue"),f=c("RouterLink");return b(),w("div",T,[l("form",L,[a(s,{type:"text",id:"name",placeholder:"Nombre(s)",onInput:r.handleInput},null,8,["onInput"]),a(s,{type:"text",id:"last_name",placeholder:"Apellido(s)",onInput:r.handleInput},null,8,["onInput"]),a(s,{type:"email",id:"email",placeholder:"nickname@email",onInput:r.handleInput},null,8,["onInput"]),a(s,{type:"text",id:"user",placeholder:"user1",onInput:r.handleInput},null,8,["onInput"]),a(s,{type:"password",id:"password",placeholder:"test123",onInput:r.handleInput},null,8,["onInput"]),a(s,{type:"password",id:"confirmPassword",placeholder:"confirm password",onInput:r.handleInput},null,8,["onInput"]),V,l("div",{ref:"error",class:x(n.error?"error":"")},null,2)],512),a(f,{to:"/"},{default:y(()=>[E]),_:1})])}const N=_(R,[["render",B],["__scopeId","data-v-a4cc911e"]]);export{N as default};
