/*!
 * Copyright 2019-2020 ForgeRock AS. All Rights Reserved 
 *  Use of this code requires a commercial software license with ForgeRock AS. or with one of its affiliates. All use shall be exclusively subject to such license between the licensee and ForgeRock AS.
 */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e556809"],{"0a93":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",{attrs:{fluid:""}},[t.widgets.length?s("b-row",t._l(t.widgets,(function(e,a){return s("div",{key:e.type+a,class:{"col-sm-4":"small"===e.size,"col-sm-6":"medium"===e.size,"col-sm-12":"large"===e.size,"mt-4":!0}},[s(e.type,{tag:"component",attrs:{userDetails:t.userDetails,details:e.details}})],1)})),0):s("b-jumbotron",{staticClass:"mt-4 text-center"},[s("div",{staticClass:"d-flex justify-content-center mt-3"},[s("i",{staticClass:"fa fa-binoculars align-self-center flex-fow-1 mr-4 mb-3",staticStyle:{"font-size":"52px"}}),s("div",{staticClass:"flex-fow-1"},[s("h2",[t._v(t._s(t.$t("pages.dashboard.noWidget")))]),s("p",{domProps:{innerHTML:t._s(t.$t("pages.dashboard.noWidgetSubText"))}})])])])],1)},i=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-jumbotron",{staticClass:"text-center"},[a("template",{slot:"header"},[a("b-img",{staticClass:"m-1 mb-3",attrs:{src:s("dfb4"),rounded:"circle",width:"112",height:"112",alt:"img"}}),a("div",[t._v(t._s(t.$t("pages.dashboard.widgets.welcome.greeting"))+", "),a("span",{staticClass:"text-capitalize"},[t._v(t._s(t.fullName))])])],1),a("template",{slot:"lead"},[a("div",[t._v(" "+t._s(t.$t("pages.dashboard.widgets.welcome.welcomeMessage"))+" ")]),a("b-button",{staticClass:"mt-2",attrs:{variant:"primary"},on:{click:function(e){return t.openProfile()}}},[t._v(" "+t._s(t.$t("pages.dashboard.widgets.welcome.editProfile"))+" ")])],1)],2)},o=[],r={name:"Welcome-Widget",props:["userDetails","widgetDetails"],data:function(){return{}},mounted:function(){},methods:{openProfile:function(){this.$router.push({name:"Profile",params:{openProfile:!this.$root.userStore.state.internalUser}})}},computed:{fullName:function(){var t="";return t=this.userDetails.givenName.length>0||this.userDetails.sn.length>0?this.userDetails.givenName+" "+this.userDetails.sn:this.userDetails.userId,t}}},l=r,c=s("2877"),u=Object(c["a"])(l,n,o,!1,null,"2d13b39f",null),f=u.exports,d=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("Processes",{ref:"processes",attrs:{processes:t.processes},on:{startProcess:t.startProcess,loadProcess:t.loadProcessDefinition}}),s("MyTasks",{attrs:{tasks:t.assignedTasks},on:{updateAssignment:t.updateAssignment,completeTask:t.completeTask,loadProcess:t.loadProcessDefinition}}),s("GroupTasks",{attrs:{tasks:t.availableTasks},on:{updateAssignment:t.updateAssignment,loadProcess:t.loadProcessDefinition}})],1)},m=[],p=s("2ef0"),h=s.n(p),k=s("cee4"),b=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("fr-list-group",{staticClass:"mt-0",attrs:{title:this.$t("pages.workflow.unassignedTasks")}},[t.isEmpty(t.tasks)?s("fr-list-item",[s("div",{staticClass:"text-muted text-center w-100",attrs:{slot:"list-item-header"},slot:"list-item-header"},[t._v(" "+t._s(t.$t("pages.workflow.noGroupTasks"))+" ")])]):[s("transition-group",{attrs:{name:"fade",mode:"out-in"}},t._l(t.tasks,(function(e,a){return s("fr-list-item",{key:"groupTask_"+a,ref:"collapse-"+a,refInFor:!0,attrs:{collapsible:!0},on:{shown:function(e){return t.setShown(a)},hidden:function(e){return t.setHidden(a)}}},[s("div",{staticClass:"d-inline-flex w-100 media",attrs:{slot:"list-item-header"},slot:"list-item-header"},[s("div",{staticClass:"media-body align-self-center"},[s("h6",{staticClass:"mb-1 mt-0"},[t._v(t._s(e.name))]),s("small",{staticClass:"text-muted d-block mb-2"},[t._v(t._s(t.$t("pages.workflow.notAssigned")))])]),s("div",{staticClass:"d-flex mb-3 ml-3 align-self-center"},[!0===t.panelShown[a]?s("b-button",{ref:"cancel-"+a,refInFor:!0,staticClass:"btn-cancel mb-2",attrs:{variant:"link",size:"sm"}},[t._v(t._s(t.$t("common.form.cancel")))]):s("b-button",{staticClass:"btn-edit",attrs:{variant:"link",size:"sm"}},[t._v(t._s(t.$t("pages.workflow.assign")))])],1)]),s("div",{staticClass:"d-inline-flex w-100",attrs:{slot:"list-item-collapse-body"},slot:"list-item-collapse-body"},[s("fr-assign-task",{attrs:{shown:t.panelShown[a],taskDefinition:e},on:{loadProcess:function(e){return t.$emit("loadProcess",e)},assignTask:t.assignTask}})],1)])})),1)]],2)],1)},v=[],g=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-card-body",{staticClass:"pt-3"},[s("b-row",[s("b-col",{attrs:{lg:"8","offset-lg":"1"}},[s("div",{staticClass:"form-group row"},[s("label",{staticClass:"col-sm-2 col-form-label"},[t._v(t._s(t.$t("pages.workflow.assignTo")))]),s("div",{staticClass:"col-sm-10"},[s("div",{staticClass:"d-flex"},[s("b-form-select",{staticClass:"mb-3 mr-2",attrs:{options:t.assigneeOptions},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}}),s("b-button",{staticClass:"mb-3 d-flex align-self-end",attrs:{type:"button",variant:"primary"},on:{click:t.assignTask}},[t._v(t._s(t.$t("pages.workflow.assign")))])],1)])]),s("div",{staticClass:"form-group row"},[s("label",{staticClass:"col-sm-2 col-form-label"},[t._v("Details")]),s("div",{staticClass:"col-sm-10"},[s("b-card",[s("dl",{staticClass:"row m-0"},[t._l(t.taskDetailsList,(function(e,a){return[s("dt",{key:"taskname-"+a+"-"+t.uniqueId,staticClass:"col-6"},[t._v(t._s(e.name))]),s("dd",{key:"taskvalue-"+a+"-"+t.uniqueId,staticClass:"col-6 text-muted"},[t._v(t._s(e.value||"n/a")+" ")])]}))],2)])],1)])])],1)],1)},w=[],y={name:"Assign-Task",props:["taskDefinition","shown"],data:function(){return{taskDetailsList:[],workflowService:null,selected:this.$root.userStore.state.userName,uniqueId:null}},mounted:function(){this.uniqueId=this._uid},computed:{assigneeOptions:function(){var t=this,e=this.$root.userStore.state.userName;return h.a.isEmpty(this.taskDefinition.task.usersToAssign)?[{value:e,text:this.$t("pages.workflow.me")}]:this.taskDefinition.task.usersToAssign.map((function(s){var a=s.username,i=s.displayableName,n=a,o=a===e?t.$t("pages.workflow.me"):i;return{value:n,text:o}}))}},methods:{assignTask:function(){this.$emit("assignTask",{id:this.taskDefinition.task._id,assignee:this.selected})},generateDisplayDetails:function(t,e){return t.reduce((function(t,s){return t.concat({_id:s._id,name:s.name,value:e[s._id]})}),[])}},watch:{shown:function(t){var e=this;t&&(h.a.isNull(this.taskDefinition.process.processDefinition)||h.a.isUndefined(this.taskDefinition.process.processDefinition))&&0===this.taskDetailsList.length?this.getRequestService().get("/workflow/processdefinition/".concat(this.taskDefinition.task.processDefinitionId)).then((function(t){e.taskDetailsList=e.generateDisplayDetails(t.data.formProperties,e.taskDefinition.task.variables)})):0===this.taskDetailsList.length&&(this.taskDetailsList=this.generateDisplayDetails(this.taskDefinition.process.processDefinition.formProperties,this.taskDefinition.task.variables))}}},_=y,$=Object(c["a"])(_,g,w,!1,null,null,null),D=$.exports,C=s("5231"),T=s("9830"),S={name:"Group-Tasks",props:{tasks:Object},data:function(){return{panelShown:{},onHidden:null}},components:{"fr-list-group":C["a"],"fr-list-item":T["a"],"fr-assign-task":D},methods:{isEmpty:h.a.isEmpty,first:h.a.first,setShown:function(t){this.$set(this.panelShown,t,!0)},setHidden:function(t){this.$set(this.panelShown,t,!1),h.a.isFunction(this.onHidden)&&(this.onHidden(),this.onHidden=null)},cancel:function(t){h.a.first(this.$refs["cancel-".concat(t)]).click()},assignTask:function(t){var e=this,s=t.id,a=t.assignee,i=this.tasks[s].task;this.onHidden=function(){e.$emit("updateAssignment",{assignee:a,id:s,task:i})},this.cancel(s)}},watch:{tasks:{handler:function(t,e){var s=this,a=h.a.difference(h.a.keys(t),h.a.keys(e));h.a.isUndefined(this.panelShown)&&(this.panelShown={}),a.forEach((function(t){s.$set(s.panelShown,t,!1)}))},deep:!0}}},x=S,I=Object(c["a"])(x,b,v,!1,null,"d9aafc40",null),P=I.exports,N=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("fr-list-group",{attrs:{title:this.$t("pages.workflow.myTasks")}},[t.isEmpty(t.tasks)?s("fr-list-item",[s("div",{staticClass:"text-muted text-center w-100",attrs:{slot:"list-item-header"},slot:"list-item-header"},[t._v(" "+t._s(t.$t("pages.workflow.noAssignedTasks"))+" ")])]):[s("transition-group",{attrs:{name:"fade",mode:"out-in"}},t._l(t.tasks,(function(e,a){return s("fr-list-item",{key:"myTask_"+a,ref:"collapse-"+a,refInFor:!0,attrs:{collapsible:!0},on:{shown:function(e){return t.setShown(a)},hidden:function(e){return t.setHidden(a)}}},[s("div",{staticClass:"d-inline-flex w-100 media",attrs:{slot:"list-item-header"},slot:"list-item-header"},[s("div",{staticClass:"media-body align-self-center"},[s("h6",[t._v(t._s(e.name))])]),s("div",{staticClass:"d-flex flex-row ml-2 align-self-center"},[t.isEmpty(e.task.candidates.candidateGroups)?t._e():s("b-button",{attrs:{variant:"link",size:"sm"},on:{click:function(e){return e.stopPropagation(),t.requeue(a)}}},[t._v(t._s(t.$t("pages.workflow.requeue")))]),!0===t.panelShown[a]?s("b-button",{ref:"cancel-"+a,refInFor:!0,staticClass:"btn-edit pb-2",attrs:{variant:"link",size:"sm"}},[t._v(t._s(t.$t("common.form.cancel")))]):s("b-button",{staticClass:"btn-edit",attrs:{variant:"link",size:"sm"}},[t._v(t._s(t.$t("common.form.edit")))])],1)]),s("div",{staticClass:"d-inline-flex w-100",attrs:{slot:"list-item-collapse-body"},slot:"list-item-collapse-body"},[s("fr-task",{ref:a,refInFor:!0,attrs:{shown:t.panelShown[a],taskInstance:e},on:{loadProcess:function(e){return t.$emit("loadProcess",e)},cancel:t.cancel,completeTask:t.completeTask}})],1)])})),1)]],2)],1)},E=[],F=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade",mode:"out-in",duration:"250"}},[null!==t.processDefinition&&null!==t.taskForm?s(t.taskForm,{tag:"component",attrs:{processDefinition:t.processDefinition,taskDefinition:t.taskInstance.task,variables:t.taskInstance.task.variables},on:{submit:t.submit,cancel:t.cancel}}):null!==t.processDefinition?s("GenericTask",{attrs:{variables:t.taskInstance.task.variables,"task-fields":t.taskInstance.task.taskDefinition.formProperties,"process-fields":t.taskInstance.task.formProperties},on:{submit:t.submit,cancel:t.cancel}}):s("clip-loader",{staticClass:"m-auto",attrs:{color:t.loadingColor}})],1)},j=[],O=s("b107"),V=s.n(O),z=s("8455"),A=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",[s("b-row",[s("b-col",[t._l(t.readOnlyFields,(function(e,a){return[s("b-form-group",{key:a,attrs:{label:t._f("capitalize")(a),"label-for":"field",horizontal:""}},[s("b-form-input",{attrs:{horizontal:"",type:"text",readonly:!0,plaintext:!0,value:e}})],1)]})),t._l(t.formFields,(function(e,a){return["string"===e.type||"number"===e.type?s("b-form-group",{key:e.name+a,attrs:{label:e.name,"label-for":"field.key",horizontal:""}},[s("b-form-input",{attrs:{horizontal:"",type:"text",plaintext:e.readOnly,name:e.key,value:t.formValues[e.key]},model:{value:t.formValues[e.key],callback:function(s){t.$set(t.formValues,e.key,s)},expression:"formValues[field.key]"}})],1):"boolean"===e.type?s("b-form-group",{key:e.name+a},[s("div",{staticClass:"form-row"},[s("label",{staticClass:"col-form-label col-sm-3",attrs:{for:e.name}},[t._v(t._s(e.name))]),s("div",{staticClass:"mr-auto"},[s("b-form-checkbox",{staticClass:"fr-toggle-primary",attrs:{switch:"",size:"lg"},model:{value:t.formValues[e.key],callback:function(s){t.$set(t.formValues,e.key,s)},expression:"formValues[field.key]"}},[t._v(" "+t._s(t.formValues[e.key]?t.$t("common.form.yes"):t.$t("common.form.no"))+" ")])],1)])]):"enum"===e.type?s("b-form-group",{key:e.name+a},[s("div",{staticClass:"form-row"},[s("label",{staticClass:"col-form-label col-sm-3",attrs:{for:e.name}},[t._v(t._s(e.name))]),s("div",{staticClass:"mr-auto"},[s("b-form-select",{staticClass:"mb-3",attrs:{options:e.options},model:{value:t.formValues[e.key],callback:function(s){t.$set(t.formValues,e.key,s)},expression:"formValues[field.key]"}})],1)])]):t._e()]}))],2)],1),s("div",{staticClass:"float-right mt-4"},[s("b-btn",{attrs:{type:"button",variant:"primary"},on:{click:function(e){return t.$emit("submit",t.formValues)}}},[t._v(t._s(t.$t("common.form.save")))]),s("b-btn",{attrs:{type:"button",variant:"primary"},on:{click:function(e){return t.$emit("cancel")}}},[t._v(t._s(t.$t("common.form.cancel")))])],1)],1)},G=[],H={name:"Generic-Task",props:["variables","taskFields","processFields"],data:function(){var t=this,e=[],s={},a=h.a.omit(h.a.clone(this.variables),["approverId","initiatorId","openidmObjectId"]);return h.a.each(this.taskFields.formPropertyHandlers,(function(i,n){var o={key:i._id,name:i.name,value:t.variables[i._id],type:i.type.name,readOnly:!i.writable};"enum"===i.type.name&&(o.options=i.type.values,h.a.isUndefined(o.value)&&i.type.values&&(o.value=Object.keys(i.type.values)[0],s[i._id]=o.value)),h.a.isUndefined(s[i._id])&&(s[i._id]=t.variables[i._id]),e.push(o),delete a[i._id]})),{formFields:e,readOnlyFields:a,formValues:s}},filters:{capitalize:function(t){return h.a.capitalize(t)}}},q=H,L=Object(c["a"])(q,A,G,!1,null,null,null),W=L.exports,M={name:"Task",props:["taskInstance","shown"],data:function(){var t=null;return this.taskInstance.process&&this.taskInstance.process.processDefinition&&(t=this.taskInstance.process.processDefinition),{loadingColor:V.a.baseColor,processDefinition:t}},components:{"clip-loader":z["ClipLoader"],GenericTask:W},computed:{taskForm:function(){var t=this.taskInstance.task.taskDefinition.formGenerationTemplate,e=t?Function("return ".concat(t)):null;return h.a.isNull(e)?null:e()}},methods:{submit:function(t){this.$emit("completeTask",{id:this.taskInstance.task._id,formData:t})},cancel:function(){this.$emit("cancel",this.taskInstance.task._id)}},watch:{shown:function(t){var e=this;t&&h.a.isNull(this.processDefinition)&&this.getRequestService().get("/workflow/processdefinition/".concat(this.taskInstance.task.processDefinitionId)).then((function(t){e.processDefinition=t.data}))}}},U=M,B=Object(c["a"])(U,F,j,!1,null,null,null),R=B.exports,J={name:"My-Tasks",props:{tasks:Object},data:function(){var t={};return h.a.forEach(this.tasks,(function(e,s){t[s]=!1})),{panelShown:t,onHidden:null}},components:{"fr-list-group":C["a"],"fr-list-item":T["a"],"fr-task":R},methods:{setShown:function(t){this.$set(this.panelShown,t,!0)},setHidden:function(t){this.$set(this.panelShown,t,!1),h.a.isFunction(this.onHidden)&&(this.onHidden(),this.onHidden=null)},cancel:function(t){h.a.first(this.$refs["cancel-".concat(t)]).click()},requeue:function(t){var e=this.tasks[t].task,s="updateAssignment",a={id:t,task:e,assignee:null};this.update(t,s,a)},completeTask:function(t){this.update(t.id,"completeTask",t)},update:function(t,e,s){var a=this,i=function(){a.$emit(e,s)};this.panelShown[t]?(this.onHidden=i,this.cancel(t)):i()},isEmpty:h.a.isEmpty,first:h.a.first},watch:{tasks:{handler:function(t,e){var s=this,a=h.a.difference(h.a.keys(t),h.a.keys(e));h.a.isUndefined(this.panelShown)&&(this.panelShown={}),a.forEach((function(t){s.$set(s.panelShown,t,!1)}))},deep:!0}}},K=J,Q=Object(c["a"])(K,N,E,!1,null,"28ad7cc0",null),X=Q.exports,Y=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("fr-list-group",{attrs:{title:this.$t("pages.workflow.startProcess")}},[t.isEmpty(t.processes)?s("fr-list-item",[s("div",{staticClass:"text-muted text-center w-100",attrs:{slot:"list-item-header"},slot:"list-item-header"},[t._v(" "+t._s(t.$t("pages.workflow.noProcess"))+" ")])]):t._l(t.processes,(function(e,a){return s("fr-list-item",{key:a,attrs:{collapsible:!0},on:{hide:function(e){return t.reset(a)},show:function(e){return t.show(a)}}},[s("div",{staticClass:"d-inline-flex w-100 media",attrs:{slot:"list-item-header"},slot:"list-item-header"},[s("div",{staticClass:"media-body align-self-center"},[s("h6",[t._v(t._s(e.name))])]),s("div",{staticClass:"d-flex ml-3 align-self-center"},[!0===t.panelShown[a]?s("b-button",{ref:"cancel-"+a,refInFor:!0,staticClass:"btn-edit pb-2",attrs:{variant:"link",size:"sm"}},[t._v(t._s(t.$t("common.form.cancel")))]):s("b-button",{staticClass:"btn-edit",attrs:{variant:"link",size:"sm"}},[t._v(t._s(t.$t("common.form.edit")))])],1)]),s("div",{staticClass:"d-inline-flex w-100",attrs:{slot:"list-item-collapse-body"},slot:"list-item-collapse-body"},[s("fr-process",{ref:a,refInFor:!0,attrs:{processDefinition:e.processDefinition},on:{cancel:t.cancel,startProcess:function(e){return t.$emit("startProcess",e)}}})],1)])}))],2)],1)},Z=[],tt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade",mode:"out-in",duration:"250"}},[null!==t.processDefinition&&null!==t.startForm?s(t.startForm,{ref:"startFormComponent",tag:"component",attrs:{processDefinition:t.processDefinition,isTask:t.task},on:{submit:t.submit,cancel:t.cancel}}):null!==t.processDefinition?s("GenericProcess",{ref:"startFormComponent",attrs:{id:t.processDefinition._id,"workflow-details":t.processDefinition.formProperties},on:{submit:t.submit,cancel:t.cancel}}):s("clip-loader",{staticClass:"m-auto",attrs:{color:t.loadingColor}})],1)},et=[],st=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",[s("b-row",[s("b-col",[t._l(t.formFields,(function(e,a){return["string"===e.type||"number"===e.type?s("b-form-group",{key:e.name+a,attrs:{label:e.name,"label-for":"field.key",horizontal:""}},[s("b-form-input",{attrs:{horizontal:"",type:"text",name:e.key},model:{value:t.formValues[e.key],callback:function(s){t.$set(t.formValues,e.key,s)},expression:"formValues[field.key]"}})],1):t._e(),"boolean"===e.type?s("b-form-group",{key:e.name+a},[s("div",{staticClass:"form-row"},[s("label",{staticClass:"col-form-label col-sm-3",attrs:{for:e.name}},[t._v(t._s(e.name))]),s("div",{staticClass:"mr-auto"},[s("b-form-checkbox",{staticClass:"fr-toggle-primary",attrs:{switch:"",size:"lg"},model:{value:t.formValues[e.key],callback:function(s){t.$set(t.formValues,e.key,s)},expression:"formValues[field.key]"}},[t._v(" "+t._s(t.formValues[e.key]?t.$t("common.form.yes"):t.$t("common.form.no"))+" ")])],1)])]):t._e()]}))],2)],1),s("div",{staticClass:"float-right mt-4"},[s("b-btn",{attrs:{type:"button",variant:"primary"},on:{click:function(e){return t.$emit("submit",t.formValues)}}},[t._v(t._s(t.$t("common.form.save")))]),s("b-btn",{attrs:{type:"button",variant:"primary"},on:{click:function(e){return t.$emit("cancel")}}},[t._v(t._s(t.$t("common.form.cancel")))])],1)],1)},at=[],it={name:"Generic-Process",props:["workflowDetails","id"],data:function(){var t=[],e={_processDefinitionId:this.id};return h.a.each(this.workflowDetails,(function(s){var a=h.a.lowerCase(s.name);t.push({name:s.name,key:s._id,type:s.type.name,value:s.type.value}),"boolean"===s.type.name?e[a]=!1:"number"===s.type.name?e[a]=0:"string"===s.type.name&&(e[a]="")})),{formFields:t,formValues:e}},methods:{resetForm:function(){var t=this;h.a.each(this.formValues,(function(e,s){h.a.isNumber(e)?t.formValues[s]=0:h.a.isBoolean(e)?t.formValues[s]=!1:t.formValues[s]=""}))}}},nt=it,ot=Object(c["a"])(nt,st,at,!1,null,null,null),rt=ot.exports,lt={name:"Workflow-Process",components:{"clip-loader":z["ClipLoader"],GenericProcess:rt},props:{processDefinition:{types:[Object,null],required:!0},task:Object},data:function(){return{loadingColor:V.a.baseColor}},computed:{startForm:function(){var t;return this.processDefinition.formGenerationTemplate?(t=Function("return ".concat(this.processDefinition.formGenerationTemplate)),t()):null}},methods:{cancel:function(){this.reset(),this.$emit("cancel",this.processDefinition._id)},reset:function(t){this.$refs.startFormComponent.resetForm()},submit:function(t){this.$emit("startProcess",t)}}},ct=lt,ut=Object(c["a"])(ct,tt,et,!1,null,null,null),ft=ut.exports,dt={name:"Processes",props:{processes:{type:Object,default:function(){return{}}}},data:function(){var t={};return{panelShown:t,loadingColor:V.a.baseColor}},components:{"fr-list-group":C["a"],"fr-list-item":T["a"],"fr-process":ft},methods:{isEmpty:h.a.isEmpty,show:function(t){this.$set(this.panelShown,t,!0),this.$emit("loadProcess",this.processes[t])},reset:function(t){var e=h.a.first(this.$refs[t]);this.$set(this.panelShown,t,!1),e&&e.reset()},cancel:function(t){var e=h.a.first(this.$refs["cancel-".concat(t)]);e&&(this.reset(t),e.click())}},watch:{processes:function(t,e){var s=this,a=h.a.difference(h.a.keys(t),h.a.keys(e));h.a.forEach(a,(function(t,e){s.panelShown[e]=!1}))}}},mt=dt,pt=Object(c["a"])(mt,Y,Z,!1,null,"225f707b",null),ht=pt.exports;function kt(t,e){return yt(t)||wt(t,e)||vt(t,e)||bt()}function bt(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function vt(t,e){if(t){if("string"===typeof t)return gt(t,e);var s=Object.prototype.toString.call(t).slice(8,-1);return"Object"===s&&t.constructor&&(s=t.constructor.name),"Map"===s||"Set"===s?Array.from(t):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?gt(t,e):void 0}}function gt(t,e){(null==e||e>t.length)&&(e=t.length);for(var s=0,a=new Array(e);s<e;s++)a[s]=t[s];return a}function wt(t,e){var s=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=s){var a,i,n=[],o=!0,r=!1;try{for(s=s.call(t);!(o=(a=s.next()).done);o=!0)if(n.push(a.value),e&&n.length===e)break}catch(l){r=!0,i=l}finally{try{o||null==s["return"]||s["return"]()}finally{if(r)throw i}}return n}}function yt(t){if(Array.isArray(t))return t}var _t={name:"Workflow-Control-Widget",components:{MyTasks:X,GroupTasks:P,Processes:ht},props:["userDetails","widgetDetails"],data:function(){return{workflowService:null,assignedTasks:{},availableTasks:{},processes:{}}},created:function(){this.workflowService=this.getRequestService(),this.loadData()},methods:{completeTask:function(t){var e=this,s=t.id,a=t.formData;return this.workflowService.post("/workflow/taskinstance/".concat(s,"?_action=complete"),a,{headers:{Accept:"application/json, text/javascript, */*; q=0.01"}}).then((function(t){e.displayNotification("success",e.$t("pages.workflow.taskSuccessfullyCompleted")),e.$delete(e.assignedTasks,s)})).then(this.loadData).catch((function(t){403===t.response.data.code?(e.displayNotification("error",e.$t("pages.workflow.taskNoLongerAvailable",{taskName:e.assignedTasks[s].name})),e.$delete(e.assignedTasks,s),e.loadTasks()):e.displayNotification("error",t.response.data.message)}))},updateAssignment:function(t){var e=this,s=t.id,a=t.task,i=t.assignee;return this.workflowService.put("/workflow/taskinstance/".concat(a._id),{assignee:i},{headers:{"If-Match":'"*"'}}).then((function(t){e.displayNotification("success",e.$t("pages.workflow.assignmentSuccess",{taskName:a.name,assignee:i})),e.$delete(e.assignedTasks,s),e.$delete(e.availableTasks,s)})).then(this.loadData).catch((function(t){403===t.response.data.code?(e.displayNotification("error",e.$t("pages.workflow.taskNoLongerAvailable",{taskName:e.availableTasks[s].name})),e.$delete(e.availableTasks,s),e.loadTasks()):e.displayNotification("error",t.response.data.message)}))},startProcess:function(t){var e=this;return this.workflowService.post("/workflow/processinstance/?_action=create",t).then((function(s){e.displayNotification("success",e.$t("pages.workflow.processStartSuccessMessage")),e.$refs.processes.cancel(t._processDefinitionId)})).then(this.loadData).catch((function(t){e.displayNotification("error",t.response.data.message)}))},loadProcessDefinition:function(t){var e=this;t.fetchProcessDefinition().then((function(s){var a=s.data;e.$set(t,"processDefinition",a)})).catch((function(t){e.displayNotification("error",t.reponse.data.message)}))},loadProcesses:function(){var t=this;return this.workflowService.get("/endpoint/getprocessesforuser").then((function(t){return t.data.processes})).then((function(e){return k["a"].all(e.map((function(e){var s=function(){return t.workflowService.get("/workflow/processdefinition/".concat(e._id))},a=null;return h.a.merge(e,{fetchProcessDefinition:s,processDefinition:a})})))})).then((function(e){e.forEach((function(e){t.$set(t.processes,e._id,e)}))}))},getTaskParams:function(t,e){var s={_queryId:"gettasksview",userId:t};return"assignedTasks"===e&&(s.viewType="assignee"),s},getTaskGroup:function(t){return this[t]},toTasks:function(t,e){var s=this,a=e.data,i=h.a.reject(a.result,h.a.isEmpty),n=kt(i,1),o=n[0];h.a.each(o,(function(e,a){var i=e.name,n=h.a.first(e.tasks),o=s.processes[n.processDefinitionId],r=function(){return s.workflowService.get("/workflow/processdefinition/".concat(n.processDefinitionId))};h.a.isUndefined(o)&&(o={fetchProcessDefinition:r}),s.$set(t,a,{name:i,task:n,process:o})}))},loadTasks:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{groupName:"availableTasks"};return this.workflowService.get("/endpoint/gettasksview",{params:this.getTaskParams(this.userDetails.userId,e.groupName)}).then((function(s){t.toTasks(t.getTaskGroup(e.groupName),s)}))},loadData:function(){var t=this;this.loadProcesses().then((function(){return k["a"].all([t.loadTasks({groupName:"assignedTasks"}),t.loadTasks({groupName:"availableTasks"})])})).catch((function(e){t.displayNotification("error",e.response.data.message)}))}}},$t=_t,Dt=Object(c["a"])($t,d,m,!1,null,"706e612b",null),Ct=Dt.exports,Tt={name:"Dashboard",components:{Welcome:f,Workflow:Ct},data:function(){return{widgets:[],userDetails:this.$root.userStore.getUserState()}},mounted:function(){this.loadData()},methods:{loadData:function(){var t=this;this.getRequestService().get("config/ui/dashboard").then((function(e){var s=e.data;t.widgets=s.dashboard.widgets,t.$root.applicationStore.state.workflow&&t.widgets.push({type:"Workflow",size:"large"})})).catch((function(e){t.displayNotification("error",e.response.data.message)}))}}},St=Tt,xt=Object(c["a"])(St,a,i,!1,null,null,null);e["default"]=xt.exports},"31da":function(t,e,s){"use strict";s("da55")},5231:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-card",{staticClass:"mb-3",attrs:{"no-body":""}},[t._t("list-group-header",[s("b-card-body",{staticClass:"py-4"},[s("h5",{class:[{"mb-4":t.subtitle,"mb-0":!t.subtitle},"card-title"]},[t._v(t._s(t.title))]),t.subtitle?s("h6",{staticClass:"card-subtitle mb-0 text-muted"},[t._v(t._s(t.subtitle))]):t._e()])]),s("b-list-group",{attrs:{flush:""}},[t._t("default")],2)],2)},i=[],n={name:"List-Group",props:{title:{type:String},subtitle:{type:String}},data:function(){return{}}},o=n,r=(s("31da"),s("2877")),l=Object(r["a"])(o,a,i,!1,null,"9e56b7f4",null);e["a"]=l.exports},"56a3":function(t,e,s){"use strict";s("7a6d")},"7a6d":function(t,e,s){},9830:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.collapsible?s("div",{staticClass:"collapsible"},[s("b-list-group-item",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:t.toggleId,expression:"toggleId"}],class:[{"list-item-cursor":!1===t.collapsible}],attrs:{href:"#"}},[s("div",{staticClass:"media"},[t._t("list-item-header")],2)]),s("b-collapse",{attrs:{id:t.id,visible:t.panelShown},on:{hide:function(e){return t.$emit("hide")},show:function(e){return t.$emit("show")},hidden:function(e){return t.$emit("hidden")},shown:function(e){return t.$emit("shown")}}},[s("b-card-body",{staticClass:"pt-3"},[t._t("list-item-collapse-body")],2)],1)],1):s("div",{class:[{"fr-hover-item":t.hoverItem}],on:{click:function(e){return t.$emit("row-click")}}},[s("b-list-group-item",{staticClass:"noncollapse"},[s("div",{staticClass:"media"},[t._t("list-item-header")],2)]),t.panelShown?s("b-card-body",{staticClass:"pt-3"},[t._t("list-item-collapse-body")],2):t._e()],1)},i=[],n={name:"List-Item",props:{collapsible:{type:Boolean,default:!1},panelShown:{type:Boolean,default:!1},hoverItem:{type:Boolean,default:!1}},data:function(){return{id:null}},beforeMount:function(){this.id="listItem"+this._uid},computed:{toggleId:function(){return this.collapsible?this.id:null}}},o=n,r=(s("56a3"),s("2877")),l=Object(r["a"])(o,a,i,!1,null,"03c581be",null);e["a"]=l.exports},b107:function(t,e,s){t.exports={baseColor:"#007bff"}},da55:function(t,e,s){}}]);
//# sourceMappingURL=chunk-1e556809.9e067b40.js.map