import{I as f}from"./InputVue-a22b3a04.js";import{S as h}from"./sweetalert2.all-4f073957.js";import{_ as p,m,a as _,s as g,r as d,o as b,c as v,b as i,d as a,n as I,w as x,p as w,e as S}from"./index-c066fabd.js";const y="https://649fbf32ed3c41bdd7a6a1d1.mockapi.io/api/food/users",L={name:"Login",components:{InputVue:f},props:{},data(){return{form:{user:"",password:""},isSubmitted:!1,error:!1}},methods:{...m("user",["login"]),async handleInput([t,r]){this.form[t]=r,this.isSubmitted&&await this.validate()&&(this.error=!1)},handleShowRegister(){this.$refs.form.reset(),this.$router.push({path:"/register"})},validate(t,r){const e=this.$refs.error;if(t)return e.innerText="Debes identificarte como usuario",this.error||(this.error=!0),this.isSubmitted=!0,!1;if(r)return e.innerText="El usuario o contraseña es incorrecto",this.error||(this.error=!0),!1;for(const s in this.form)if(!this.form[s])return e.innerText="Todos los campos son obligatorios",this.error||(this.error=!0),!1;return e.innerText="",!0},handleLogin(t){this.login(t)}},mounted(){this.$route.name==="unauthorized"&&this.validate(!0),this.$refs.form.addEventListener("submit",async r=>{r.preventDefault(),this.isSubmitted=!0;try{let e,s=await _.get(y);if(s=s.data,s.length){if(e=s.find(o=>o.user===this.form.user),!e){this.validate(null,!0);return}if(e.password!==this.form.password){this.validate(null,!0);return}}else{this.validate(null,!0);return}this.validate()&&(delete e.password,h.fire({icon:"success",title:"Ingreso exitoso",showConfirmButton:!1,timer:1500}).then(()=>{r.target.reset();for(const o in this.form)this.form[o]="";this.isSubmitted=!1,g("user",e),this.handleLogin(e),this.$router.push({path:`/${e.admin?"admin":"listing"}`})}))}catch(e){console.log(e),e.message&&(error.innerText=`Falla del servidor:
${e.message}`,this.error||(this.error=!0))}})}},l=t=>(w("data-v-cd1becaa"),t=t(),S(),t),$={class:"register"},k={ref:"form",action:"",method:"post"},R=l(()=>i("button",{class:"btn form-control text-bg-dark p-3"},"INGRESAR",-1)),V=l(()=>i("button",{class:"btn form-control text-bg-primary mt-2"},"Regístrate",-1));function T(t,r,e,s,o,n){const u=d("InputVue"),c=d("RouterLink");return b(),v("div",$,[i("form",k,[a(u,{type:"text",id:"user",placeholder:"user1",onInput:n.handleInput},null,8,["onInput"]),a(u,{type:"password",id:"password",placeholder:"test123",onInput:n.handleInput},null,8,["onInput"]),R,i("div",{ref:"error",class:I(o.error?"error":"")},null,2)],512),a(c,{to:"/register"},{default:x(()=>[V]),_:1})])}const N=p(L,[["render",T],["__scopeId","data-v-cd1becaa"]]);export{N as default};