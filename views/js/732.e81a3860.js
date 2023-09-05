"use strict";(self["webpackChunkiss4u"]=self["webpackChunkiss4u"]||[]).push([[732],{2732:function(t,s,e){e.r(s),e.d(s,{default:function(){return q}});var o=e(3396),i=e(3862),a=e(7139);const r=t=>((0,o.dD)("data-v-3c9b5d3c"),t=t(),(0,o.Cn)(),t),n={class:"row justify-content-center"},l={class:"col-9 align-self-center prova"},d=r((()=>(0,o._)("h1",null,"Aggiungi task",-1))),c={key:0,class:"row"},m={class:"col-md-12 error"},u={class:"row form-floating"},h={class:"col-md-6 form-floating"},p=r((()=>(0,o._)("label",{for:"startDate",class:"myLabel"},"    Data di inizio",-1))),g={class:"col-md-6 form-floating"},f=r((()=>(0,o._)("label",{for:"endDate",class:"myLabel"},"    Data di fine",-1))),_={class:"row form-floating"},v={class:"col-md-6 form-floating"},k=r((()=>(0,o._)("label",{for:"Name",class:"myLabel"},"    Nome task",-1))),D={class:"col-md-6 form-floating"},b=r((()=>(0,o._)("label",{for:"modulo",class:"myLabel"},"    Modulo",-1))),y={class:"row form-floating"},w={class:"col form-floating input-group mb-9"},E=r((()=>(0,o._)("span",{class:"input-group-text myLabel",style:{"background-color":"white"}},"Descrizione",-1))),I={class:"col-md-3"},N=r((()=>(0,o._)("label",{for:"checkbox",class:"myLabel"},"    Completato? ",-1))),x={key:1,class:"row form-floating"},A={class:"col-md-9 form-floating input-group"},U=r((()=>(0,o._)("option",{disabled:"",value:""},"Seleziona un utente",-1))),z=["value"],L=r((()=>(0,o._)("div",{class:"row"},[(0,o._)("div",{class:"col-md-12"},[(0,o._)("button",{class:"btn btn-primary",type:"submit"},"Aggiungi")])],-1)));function T(t,s,e,r,T,M){return(0,o.wg)(),(0,o.iD)("div",n,[(0,o._)("div",l,[d,(0,o._)("form",{class:"form-floating",onSubmit:s[7]||(s[7]=(0,i.iM)(((...t)=>M.addTask&&M.addTask(...t)),["prevent"]))},[T.isError?((0,o.wg)(),(0,o.iD)("div",c,[(0,o._)("div",m,(0,a.zw)(T.error),1)])):(0,o.kq)("",!0),(0,o._)("div",u,[(0,o._)("div",h,[(0,o.wy)((0,o._)("input",{type:"date",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=t=>T.startDate=t)},null,512),[[i.nr,T.startDate]]),p]),(0,o._)("div",g,[(0,o.wy)((0,o._)("input",{type:"date",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=t=>T.endDate=t)},null,512),[[i.nr,T.endDate]]),f])]),(0,o._)("div",_,[(0,o._)("div",v,[(0,o.wy)((0,o._)("input",{type:"text",class:"form-control",id:"Name","onUpdate:modelValue":s[2]||(s[2]=t=>T.taskName=t)},null,512),[[i.nr,T.taskName]]),k]),(0,o._)("div",D,[(0,o.wy)((0,o._)("input",{type:"text",class:"form-control",id:"modulo","onUpdate:modelValue":s[3]||(s[3]=t=>T.moduleName=t)},null,512),[[i.nr,T.moduleName]]),b])]),(0,o._)("div",y,[(0,o._)("div",w,[E,(0,o.wy)((0,o._)("textarea",{type:"date",class:"form-control",id:"description","aria-label":"Descrizione",style:{"min-height":"100%"},"onUpdate:modelValue":s[4]||(s[4]=t=>T.txtDescription=t)},null,512),[[i.nr,T.txtDescription]])]),(0,o._)("div",I,[N,(0,o.wy)((0,o._)("input",{type:"checkbox",id:"checkbox","onUpdate:modelValue":s[5]||(s[5]=t=>T.checked=t),style:{margin:"20px"}},null,512),[[i.e8,T.checked]])])]),T.isAmministratore?((0,o.wg)(),(0,o.iD)("div",x,[(0,o._)("div",A,[(0,o.wy)((0,o._)("select",{"onUpdate:modelValue":s[6]||(s[6]=t=>T.idUser=t),class:"form-control",style:{color:"#0EA2BD"}},[U,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(T.options,(t=>((0,o.wg)(),(0,o.iD)("option",{value:t.id},(0,a.zw)(t.nome)+" "+(0,a.zw)(t.cognome)+": "+(0,a.zw)(t.id),9,z)))),256))],512),[[i.bM,T.idUser]])])])):(0,o.kq)("",!0),L],32)])])}e(7658);var M=e(1242);const V=t=>M.Z.post("/task",t);var O=e(2227),R=e(5941),S={name:"FormAddTask",data(){return{isAmministratore:!1,txtDescription:"",moduleName:"",startDate:"",endDate:"",taskName:"",checked:!1,idUser:"",error:"",isError:!1,selected:"",options:[],val:1}},created(){localStorage.getItem("role")?"ROLE_AMMINISTRATORE"===localStorage.getItem("role")&&(this.isAmministratore=!0):this.$router.push("/"),this.selectIds(),this.isError=!1,this.error=""},methods:{selectIds(){(0,O.Q)().then((({data:t})=>{R.log("La richiesta è arrivata:"),R.log(t);for(let i=0;i<t.length;i++)if("ROLE_AMMINISTRATORE"==t[i].role){if(this.isAmministratore){var s=t[i]._id,e=t[i].nome,o=t[i].cognome;this.options.push({id:s,nome:e,cognome:o})}}else{s=t[i]._id,e=t[i].nome,o=t[i].cognome;this.options.push({id:s,nome:e,cognome:o})}}))},addTask(){if(R.log(this.startDate),R.log(this.endDate),this.validateForm){R.log("Data:"),R.log(this.data);var t,s=!1;for(t=0;t<this.options.length&&!s;t++){const e=this.options[t];e.id==this.idUser&&(s=!0)}t--,R.log("Options:"),R.log(this.options),R.log("Options["+t+"]: "+this.options[t]),R.log(this.options[t].nome),R.log(this.options[t].cognome);const e={data_inizio:this.startDate,data_fine:this.endDate,nome:this.taskName,modulo:this.moduleName,descrizione:this.txtDescription,userId:this.idUser,completata:this.checked,nomeuser:this.options[t].nome,cognomeuser:this.options[t].cognome};V(e).then((t=>{201==t.status?(alert("Task aggiunta con successo"),this.$router.push("/tasks")):(this.isError=!0,this.error=t.status+": "+t.data.message)})).catch((t=>{this.isError=!0,this.error=t.response.status+": "+t.response.data.message}))}},validateForm(){return""==this.startDate?(this.error="Inserisci una data di inizio",this.isError=!0,!1):""==this.endDate?(this.error="Inserisci una data di fine",this.isError=!0,!1):""==this.taskName?(this.error="Inserisci un nome per la task",this.isError=!0,!1):""==this.moduleName?(this.error="Inserisci un nome per il modulo",this.isError=!0,!1):""==this.txtDescription?(this.error="Inserisci una descrizione",this.isError=!0,!1):!this.isAmministratore||""!=this.idUser||(this.error="Inserisci un id utente",this.isError=!0,!1)}}},C=e(89);const F=(0,C.Z)(S,[["render",T],["__scopeId","data-v-3c9b5d3c"]]);var q=F}}]);
//# sourceMappingURL=732.e81a3860.js.map