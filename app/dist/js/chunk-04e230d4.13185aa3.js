(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04e230d4"],{"18dc":function(t,e,s){},"2a13":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"recipeframe"}},[t.ready?s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4 d-none d-md-block",staticStyle:{overflow:"auto"}},[s("ul",{staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item"},[s("LikeShareSave",{attrs:{aggregateLikes:t.recipe.aggregateLikes}})],1),s("li",{staticClass:"list-group-item"},[s("Times",{attrs:{readyInMinutes:t.recipe.readyInMinutes,preparationMinutes:t.recipe.preparationMinutes,cookingMinutes:t.recipe.cookingMinutes}})],1),s("li",{staticClass:"list-group-item"},[s("Ingredients",{attrs:{ingredients:t.recipe.extendedIngredients}})],1),s("li",{staticClass:"list-group-item"},[s("Nutritions",{attrs:{nutritions:t.nutritions}})],1)])]),s("div",{staticClass:"col-md-8 d-none d-md-block",staticStyle:{overflow:"auto"}},[s("ul",{staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item image-item",style:{backgroundImage:"url("+t.recipe.image+")"}}),s("li",{staticClass:"list-group-item",domProps:{innerHTML:t._s(t.recipe.summary)}}),s("li",{staticClass:"list-group-item",domProps:{innerHTML:t._s(t.recipe.instructions)}})])]),s("div",{staticClass:"col d-md-none"},[s("div",{staticClass:"image-item"},[s("img",{staticClass:"img-fluid",attrs:{src:t.recipe.image,alt:"Responsive image"}})]),s("div",{staticClass:"image-placeholder"}),s("div",{staticClass:"card"},[s("ul",{staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item d-flex"},[s("div",{staticClass:"w-100"},[s("h2",[t._v(t._s(t.recipe.title))])]),s("div",{staticClass:"flex-shrink-1"},[s("router-link",{staticClass:"close",attrs:{to:{name:"home"},type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])],1)]),s("li",{staticClass:"list-group-item"},[s("LikeShareSave",{attrs:{aggregateLikes:t.recipe.aggregateLikes}})],1),s("li",{staticClass:"list-group-item",domProps:{innerHTML:t._s(t.recipe.summary)}}),s("li",{staticClass:"list-group-item"},[s("Times",{attrs:{readyInMinutes:t.recipe.readyInMinutes,preparationMinutes:t.recipe.preparationMinutes,cookingMinutes:t.recipe.cookingMinutes}})],1),s("li",{staticClass:"list-group-item"},[s("Ingredients",{attrs:{ingredients:t.recipe.extendedIngredients}})],1),s("li",{staticClass:"list-group-item"},[s("Nutritions",{attrs:{nutritions:t.nutritions}})],1),s("li",{staticClass:"list-group-item"},[s("Instructions",{attrs:{instructions:t.recipe.analyzedInstructions[0]}})],1)])])])]):t._e()])},a=[],r=(s("d3b7"),s("3ca3"),s("ddb0"),s("2b3d"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"ingredientsframe"}},[s("h4",[t._v("Ingredients")]),s("div",{staticClass:"d-flex flex-row"},[s("p",{staticClass:"w-100"},[t._v("Portions")]),s("button",{staticClass:"btn flex-shrink-1",attrs:{type:"button"},on:{click:function(e){t.portions--}}},[t._v("-")]),s("button",{staticClass:"btn flex-shrink-1",attrs:{type:"button",disabled:""}},[t._v(t._s(t.portions))]),s("button",{staticClass:"btn flex-shrink-1",attrs:{type:"button"},on:{click:function(e){t.portions++}}},[t._v("+")])]),s("table",{staticClass:"table table-borderless"},[s("tbody",t._l(t.ingredients,(function(e){return s("tr",{key:e},[s("td",[t._v(t._s(e.measures.metric.amount*t.portions)+" "+t._s(e.measures.metric.unitShort))]),s("td",[t._v(t._s(e.name))])])})),0)])])}),n=[],l={name:"ingredientsframe",props:{ingredients:Array},data:function(){return{portions:2}}},o=l,c=s("2877"),u=Object(c["a"])(o,r,n,!1,null,null,null),d=u.exports,p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"d-flex flex-row",attrs:{id:"likesharesaveframe"}},[s("div",{staticClass:"flex-fill"},[s("button",{staticClass:"btn flex-fill"},[s("svg",{staticClass:"bi bi-suit-heart",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{"fill-rule":"evenodd",d:"M8 6.236l.894-1.789c.222-.443.607-1.08 1.152-1.595C10.582 2.345 11.224 2 12 2c1.676 0 3 1.326 3 2.92 0 1.211-.554 2.066-1.868 3.37-.337.334-.721.695-1.146 1.093C10.878 10.423 9.5 11.717 8 13.447c-1.5-1.73-2.878-3.024-3.986-4.064-.425-.398-.81-.76-1.146-1.093C1.554 6.986 1 6.131 1 4.92 1 3.326 2.324 2 4 2c.776 0 1.418.345 1.954.852.545.515.93 1.152 1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"}})]),t._v(" "+t._s(t.aggregateLikes)+" ")])]),s("div",{staticClass:"flex-fill"},[s("button",{staticClass:"btn flex-fill"},[s("svg",{staticClass:"bi bi-bookmark",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{"fill-rule":"evenodd",d:"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"}})]),t._v(" Save ")])]),s("div",{staticClass:"flex-fill"},[s("button",{staticClass:"btn flex-fill",on:{click:t.share}},[s("svg",{staticClass:"bi bi-box-arrow-up",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{"fill-rule":"evenodd",d:"M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"}}),s("path",{attrs:{"fill-rule":"evenodd",d:"M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"}})]),t._v(" Share ")])])])},m=[],v=(s("a9e3"),{name:"likesharesaveframe",props:{aggregateLikes:Number},methods:{share:function(){console.log("share"),navigator.share?navigator.share({title:"My awesome post!",text:"This post may or may not contain the answer to the universe",url:window.location.href}).then((function(){console.log("Thanks for sharing!")})).catch((function(t){console.log("Couldn't share because of",t.message)})):console.log("web share not supported")}}}),g=v,f=Object(c["a"])(g,p,m,!1,null,null,null),h=f.exports,b=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"d-flex flex-row",attrs:{id:"nutritionsframe"}},[s("div",{staticClass:"flex-fill text-center"},[t._v(" "+t._s(t.nutritions.calories)),s("br"),t._v("Calories ")]),s("div",{staticClass:"flex-fill text-center"},[t._v(" "+t._s(t.nutritions.carbs)),s("br"),t._v("Carbs ")]),s("div",{staticClass:"flex-fill text-center"},[t._v(" "+t._s(t.nutritions.fat)),s("br"),t._v("Fat ")]),s("div",{staticClass:"flex-fill text-center"},[t._v(" "+t._s(t.nutritions.protein)),s("br"),t._v("Protein ")])])},C=[],_={name:"nutritionsframe",props:{nutritions:Object}},x=_,w=Object(c["a"])(x,b,C,!1,null,null,null),k=w.exports,L=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"d-flex flex-row",attrs:{id:"timesframe"}},[s("div",{staticClass:"flex-fill text-center"},[t._v(" "+t._s(t.readyInMinutes)),s("br"),t._v("Completion ")]),s("div",{staticClass:"flex-fill text-center"},[t._v(" "+t._s(t.preparationMinutes)),s("br"),t._v("Preperation ")]),s("div",{staticClass:"flex-fill text-center"},[t._v(" "+t._s(t.cookingMinutes)),s("br"),t._v("Cooking ")])])},y=[],M={name:"timesframe",props:{readyInMinutes:Number,preparationMinutes:Number,cookingMinutes:Number}},z=M,I=Object(c["a"])(z,L,y,!1,null,null,null),S=I.exports,P=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"instructionsframe"}},t._l(t.instructions.steps,(function(e){return s("div",{key:e},[s("h5",{staticClass:"instructions-header"},[t._v("Step "+t._s(e.number))]),s("div",{staticClass:"d-flex flex-wrap"},[s("span",{staticClass:"badge badge-pill badge-secondary"},[s("svg",{staticClass:"bi bi-basket",attrs:{width:"2em",height:"2em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{"fill-rule":"evenodd",d:"M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"}})])]),t._l(e.ingredients,(function(e){return s("span",{key:e,staticClass:"badge badge-pill badge-secondary"},[s("h6",[t._v(t._s(e.name))])])}))],2),s("div",{staticClass:"d-flex flex-wrap"},[s("span",{staticClass:"badge badge-pill badge-secondary"},[s("svg",{staticClass:"bi bi-tools",attrs:{width:"2em",height:"2em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{"fill-rule":"evenodd",d:"M0 1l1-1 3.081 2.2a1 1 0 0 1 .419.815v.07a1 1 0 0 0 .293.708L10.5 9.5l.914-.305a1 1 0 0 1 1.023.242l3.356 3.356a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-3.356-3.356a1 1 0 0 1-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 0 0-.707-.293h-.071a1 1 0 0 1-.814-.419L0 1zm11.354 9.646a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708-.708l-3-3z"}}),s("path",{attrs:{"fill-rule":"evenodd",d:"M15.898 2.223a3.003 3.003 0 0 1-3.679 3.674L5.878 12.15a3 3 0 1 1-2.027-2.027l6.252-6.341A3 3 0 0 1 13.778.1l-2.142 2.142L12 4l1.757.364 2.141-2.141zm-13.37 9.019L3.001 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"}})])]),t._l(e.equipment,(function(e){return s("span",{key:e,staticClass:"badge badge-pill badge-secondary"},[s("h6",[t._v(t._s(e.name))])])}))],2),s("p",{staticClass:"instructions-text"},[t._v(t._s(e.step))]),s("hr")])})),0)},A=[],N={name:"instructionsframe",props:{instructions:Object}},j=N,O=(s("68d6"),Object(c["a"])(j,P,A,!1,null,"4859436a",null)),T=O.exports,V=s("7338"),$=s.n(V),H={name:"recipeframe",components:{Ingredients:d,LikeShareSave:h,Nutritions:k,Times:S,Instructions:T},data:function(){return{recipe:null,nutritions:null,ready:!1}},computed:{recipeParams:function(){var t=new URLSearchParams;return t.append("id",this.$route.params.id),t},nutritionsParams:function(){var t=new URLSearchParams;return t.append("id",this.$route.params.id),t}},mounted:function(){this.getRecipe(),this.getNutritions()},methods:{getRecipe:function(){var t=this;$.a.get("/api/recipe",{params:this.recipeParams}).then((function(e){t.recipe=e.data,t.ready=!0,console.log(e.data)}))},getNutritions:function(){var t=this;$.a.get("/api/nutritions",{params:this.nutritionsParams}).then((function(e){t.nutritions=e.data,console.log(e.data)}))}}},E=H,B=(s("4df7"),Object(c["a"])(E,i,a,!1,null,"d1542190",null));e["default"]=B.exports},"4df7":function(t,e,s){"use strict";var i=s("52a0"),a=s.n(i);a.a},"52a0":function(t,e,s){},"68d6":function(t,e,s){"use strict";var i=s("18dc"),a=s.n(i);a.a}}]);
//# sourceMappingURL=chunk-04e230d4.13185aa3.js.map