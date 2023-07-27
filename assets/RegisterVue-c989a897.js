import{I as f}from"./InputVue-8ef1b24c.js";import{S as h}from"./sweetalert2.all-4f073957.js";import{_,m as I,a as c,s as g,r as d,o as w,c as x,b as l,d as n,n as y,w as b,p as v,e as R}from"./index-c2968245.js";const u={}.VITE_USER_URL,S={}.VITE_FOOD_URL,T={name:"Register",components:{InputVue:f},props:{},data(){return{form:{name:"",last_name:"",email:"",user:"",password:"",confirmPassword:""},isSubmitted:!1,error:!1}},methods:{...I("user",["login"]),handleInput([t,e]){this.form[t]=e,this.isSubmitted&&this.validate()&&(this.error=!1)},async validate(){const t=this.$refs.error;for(const e in this.form)if(!this.form[e])return t.innerText="Todos los campos son obligatorios",this.error||(this.error=!0),!1;try{let e=await c.get(u);if(e=e.data,e.length){if(e.some(o=>o.email===this.form.email))return t.innerText="El correo electrónico ya se encuentra registrado",this.error||(this.error=!0),!1;if(e.some(o=>o.user===this.form.user))return t.innerText="El nombre de usuario ya se encuentra registrado",this.error||(this.error=!0),!1}return this.form.password!==this.form.confirmPassword?(t.innerText="Las contraseñas no coinciden",this.error||(this.error=!0),!1):(t.innerText="",!0)}catch(e){return console.log(e),e.message&&(t.innerText=`Falla del servidor:
${e.message}`,this.error||(this.error=!0)),!1}},handleLogin(t){this.login(t)}},mounted(){this.$refs.form.addEventListener("submit",async e=>{e.preventDefault(),this.isSubmitted=!0;try{if(await this.validate()){const i={...this.form};delete i.confirmPassword;let a=await c.post(`${S}/carts`);if(a.data){a=a.data,i.cart=a.id;let r=await c.post(u,i);r&&(r=r.data,delete r.password,h.fire({icon:"success",title:"Registro exitoso",showConfirmButton:!1,timer:1500}).then(()=>{e.target.reset();for(const s in this.form)this.form[s]="";this.isSubmitted=!1,g("user",r),this.handleLogin(r),this.$router.push({path:"/listing"})}))}}}catch(o){console.log(o)}})}},p=t=>(v("data-v-a4cc911e"),t=t(),R(),t),L={class:"register"},E={ref:"form",action:"",method:"post"},V=p(()=>l("button",{class:"btn form-control text-bg-dark p-3"},"REGÍSTRATE",-1)),k=p(()=>l("button",{class:"btn form-control text-bg-primary mt-2"},"Ingresar",-1));function U(t,e,o,i,a,r){const s=d("InputVue"),m=d("RouterLink");return w(),x("div",L,[l("form",E,[n(s,{type:"text",id:"name",placeholder:"Nombre(s)",onInput:r.handleInput},null,8,["onInput"]),n(s,{type:"text",id:"last_name",placeholder:"Apellido(s)",onInput:r.handleInput},null,8,["onInput"]),n(s,{type:"email",id:"email",placeholder:"nickname@email",onInput:r.handleInput},null,8,["onInput"]),n(s,{type:"text",id:"user",placeholder:"user1",onInput:r.handleInput},null,8,["onInput"]),n(s,{type:"password",id:"password",placeholder:"test123",onInput:r.handleInput},null,8,["onInput"]),n(s,{type:"password",id:"confirmPassword",placeholder:"confirm password",onInput:r.handleInput},null,8,["onInput"]),V,l("div",{ref:"error",class:y(a.error?"error":"")},null,2)],512),n(m,{to:"/"},{default:b(()=>[k]),_:1})])}const A=_(T,[["render",U],["__scopeId","data-v-a4cc911e"]]);export{A as default};
