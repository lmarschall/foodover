(function(t){function e(e){for(var i,n,l=e[0],o=e[1],c=e[2],u=0,p=[];u<l.length;u++)n=l[u],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&p.push(s[n][0]),s[n]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i]);d&&d(e);while(p.length)p.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],i=!0,l=1;l<a.length;l++){var o=a[l];0!==s[o]&&(i=!1)}i&&(r.splice(e--,1),t=n(n.s=a[0]))}return t}var i={},s={app:0},r=[];function n(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=i,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(a,i,function(e){return t[e]}.bind(null,i));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var d=o;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var i=a("85ec"),s=a.n(i);s.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},r=[],n={name:"app"},l=n,o=(a("034f"),a("2877")),c=Object(o["a"])(l,s,r,!1,null,null,null),d=c.exports,u=a("8c4f"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"searchframe"}},[a("Bar",{attrs:{page:0}}),t.scan?a("div",{staticClass:"video-container"},[a("button",{staticClass:"btn btn-secondary rounded-pill",attrs:{type:"button"},on:{click:t.resetScan}},[t._v("Abort")]),a("video",{attrs:{id:"video"}})]):t._e(),a("div",{staticClass:"modal fade",attrs:{id:"inputModal",tabindex:"-1","aria-labelledby":"inputModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog"},[a("div",{staticClass:"modal-content"},[t._m(0),a("div",{staticClass:"modal-body"},[a("ul",{staticClass:"list-group list-group-flush"},[t._l(t.ingredients,(function(e,i){return a("li",{key:e,staticClass:"list-group-item input-item"},[a("div",{staticClass:"input-group mb-3"},[a("input",{staticClass:"form-control-plaintext",staticStyle:{"border-width":"0px",border:"none"},attrs:{type:"text",readonly:""},domProps:{value:e.name}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"close",attrs:{type:"button"},on:{click:function(e){return t.dropIngredient(i)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])])])})),a("li",{staticClass:"list-group-item"},[a("div",{staticClass:"input-group mb-3"},[a("input",{staticClass:"form-control",staticStyle:{"border-width":"0px",border:"none"},attrs:{type:"text",id:"input_ingredient",placeholder:"what's left?"},on:{keyup:t.validateInput}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-outline-primary rounded",on:{click:t.startScan}},[a("svg",{staticClass:"bi bi-upc-scan",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"#7FBD32",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"}}),a("path",{attrs:{d:"M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"}})])])])])])],2)]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")]),a("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-dismiss":"modal"},on:{click:t.findRecipes}},[t._v("Search for recipes")])])])])]),a("div",{staticClass:"accordion sticky-top",attrs:{id:"accordionExample"}},[a("div",{staticClass:"card"},[t._m(1),a("div",{staticClass:"collapse show",attrs:{id:"collapseOne","aria-labelledby":"headingOne","data-parent":"#accordionExample"}},[a("div",{staticClass:"card-body d-flex flex-wrap"},[t._l(t.ingredients,(function(e){return a("span",{key:e,staticClass:"badge badge-pill badge-secondary"},[a("h6",[t._v(t._s(e.name))])])})),a("span",{staticClass:"badge badge-pill badge-primary",attrs:{"data-toggle":"modal","data-target":"#inputModal"}},[a("svg",{staticClass:"bi bi-three-dots",attrs:{width:"2em",height:"2em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"}})])])],2)])])]),a("div",{staticClass:"row row-cols-1 row-cols-md-2"},t._l(t.recipes,(function(e){return a("div",{key:e,staticClass:"col mb-4"},[a("div",{staticClass:"card rounded-lg"},[a("img",{staticClass:"card-img-top",attrs:{src:e.image,alt:"..."}}),a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[a("router-link",{staticClass:"stretched-link",attrs:{to:{name:"recipe",params:{id:e.id}}}},[t._v(t._s(e.title))])],1),a("p",{staticClass:"card-text"},[t._v("2 of 5 ingredients used.")])])])])})),0)],1)},v=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"inputModalLabel"}},[t._v("Input")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-header",attrs:{id:"headingOne"}},[a("h2",{staticClass:"mb-0"},[a("button",{staticClass:"btn btn-link btn-block text-left",attrs:{type:"button","data-toggle":"collapse","data-target":"#collapseOne","aria-expanded":"true","aria-controls":"collapseOne"}},[a("h2",[t._v("Search")])])])])}],m=(a("a434"),a("b0c0"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card shadow p-3 mb-5 bg-white rounded-pill fixed-bottom",attrs:{id:"barframe"}},[a("ul",{staticClass:"nav nav-fill nav-pills"},[a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link rounded-pill",class:{active:0==t.page},attrs:{to:{name:"home"}}},[t._v("Home")])],1),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link rounded-pill",class:{active:1==t.page},attrs:{to:{name:"profile"}}},[t._v("Profile")])],1)])])}),f=[],g=(a("a9e3"),{name:"barframe",props:{page:Number}}),h=g,b=(a("e297"),Object(o["a"])(h,m,f,!1,null,"272a80a7",null)),C=b.exports,w=a("7338"),_=a.n(w),y=a("4dec"),x=a("e588"),k={name:"searchframe",components:{Bar:C},data:function(){return{codeReader:null,code:"",scan:!1,selectedDeviceId:0,ingredients:["apples","flour","sugar"],recipes:[],db:null}},computed:{productParams:function(){var t=new URLSearchParams;return t.append("code",this.code),t},ingredientsParams:function(){for(var t="",e=0;e<this.ingredients.length;e++)t+=0==e?this.ingredients[e].name:",+"+this.ingredients[e].name;var a=new URLSearchParams;return a.append("ingredients",t),a}},mounted:function(){this.initCamera(),this.loadData()},methods:{initCamera:function(){var t=this;this.codeReader=new x["BrowserMultiFormatReader"],console.log("ZXing code reader initialized"),this.codeReader.listVideoInputDevices().then((function(e){t.selectedDeviceId=e[0].deviceId}))},startScan:function(){var t=this;this.scan=!0,this.codeReader.decodeFromVideoDevice(this.selectedDeviceId,"video",(function(e,a){e&&(console.log(e),t.code=e.text,t.scan=!1,t.findProduct(),t.codeReader.reset()),!a||a instanceof x["NotFoundException"]||(console.error(a),document.getElementById("result").textContent=a)})),console.log("Started continous decode from camera with id ".concat(this.selectedDeviceId))},resetScan:function(){this.codeReader.reset(),this.scan=!1,console.log("Reset.")},addIngredient:function(t){var e=this;this.db.ingredients.add({name:t}).then((function(t){e.db.ingredients.get(t,(function(t){e.ingredients.push(t)}))}))},dropIngredient:function(t){var e=this.ingredients[t];this.ingredients.splice(t,1),this.db.ingredients.delete(e.id)},validateInput:function(t){13===t.keyCode&&(console.log("Enter was pressed"),this.addIngredient(document.getElementById("input_ingredient").value),document.getElementById("input_ingredient").value="")},findProduct:function(){var t=this;console.log(this.code),_.a.get("/api/product",{params:this.productParams}).then((function(e){console.log(e.data),""!=e.data?t.addIngredient(e.data):console.log("No Product found!")}))},findRecipes:function(){var t=this;this.recipes=[],_.a.get("api/recipes",{params:this.ingredientsParams}).then((function(e){t.recipes=e.data,console.log(e.data);for(var a=[],i=0;i<t.recipes.length;i++)a.push({recipe:JSON.stringify(t.recipes[i])});t.db.recipes.bulkAdd(a)}))},loadData:function(){this.db=new y["a"]("foodover_database"),this.db.version(1).stores({ingredients:"++id, name",recipes:"++id, recipe"});var t=this;this.db.ingredients.toArray().then((function(e){t.ingredients=e})),this.db.recipes.toArray().then((function(e){for(var a=0;a<e.length;a++)t.recipes.push(JSON.parse(e[a].recipe))}))}}},M=k,P=(a("ef4b"),Object(o["a"])(M,p,v,!1,null,"f83bdb2a",null)),S=P.exports,I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"profileframe"}},[a("Bar",{attrs:{page:1}})],1)},O=[],L={name:"profileframe",components:{Bar:C}},z=L,j=Object(o["a"])(z,I,O,!1,null,null,null),E=j.exports,R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card",attrs:{id:"recipeframe"}},[t.ready?a("div",{staticClass:"card-header d-flex"},[a("router-link",{staticClass:"btn btn-primary-outline",attrs:{to:{name:"home"}}},[a("svg",{staticClass:"bi bi-caret-left-fill",attrs:{width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"}})])]),a("h3",{staticClass:"align-self-center"},[t._v(t._s(t.recipe.title))])],1):t._e(),t.ready?a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 d-none d-md-block",staticStyle:{overflow:"auto",height:"90vh"}},[a("ul",{staticClass:"list-group list-group-flush"},[a("li",{staticClass:"list-group-item"},[a("LikeShareSave",{attrs:{aggregateLikes:t.recipe.aggregateLikes}})],1),a("li",{staticClass:"list-group-item"},[a("Times",{attrs:{readyInMinutes:t.recipe.readyInMinutes,preparationMinutes:t.recipe.preparationMinutes,cookingMinutes:t.recipe.cookingMinutes}})],1),a("li",{staticClass:"list-group-item"},[a("Nutritions",{attrs:{nutritions:t.nutritions}})],1),a("li",{staticClass:"list-group-item"},[a("Ingredients",{attrs:{ingredients:t.recipe.extendedIngredients}})],1)])]),a("div",{staticClass:"col-md-6 d-none d-md-block",staticStyle:{overflow:"auto",height:"90vh"}},[a("ul",{staticClass:"list-group list-group-flush"},[a("li",{staticClass:"list-group-item"},[a("img",{staticClass:"img-fluid",attrs:{src:t.recipe.image,alt:"Responsive image"}})]),a("li",{staticClass:"list-group-item",domProps:{innerHTML:t._s(t.recipe.summary)}}),a("li",{staticClass:"list-group-item",domProps:{innerHTML:t._s(t.recipe.instructions)}})])]),a("div",{staticClass:"col d-md-none"},[a("ul",{staticClass:"list-group list-group-flush"},[a("li",{staticClass:"list-group-item"},[a("img",{staticClass:"img-fluid",attrs:{src:t.recipe.image,alt:"Responsive image"}})]),a("li",{staticClass:"list-group-item"},[a("LikeShareSave",{attrs:{aggregateLikes:t.recipe.aggregateLikes}})],1),a("li",{staticClass:"list-group-item",domProps:{innerHTML:t._s(t.recipe.summary)}}),a("li",{staticClass:"list-group-item"},[a("Times",{attrs:{readyInMinutes:t.recipe.readyInMinutes,preparationMinutes:t.recipe.preparationMinutes,cookingMinutes:t.recipe.cookingMinutes}})],1),a("li",{staticClass:"list-group-item"},[a("Nutritions",{attrs:{nutritions:t.nutritions}})],1),a("li",{staticClass:"list-group-item"},[a("Ingredients",{attrs:{ingredients:t.recipe.extendedIngredients}})],1),a("li",{staticClass:"list-group-item",domProps:{innerHTML:t._s(t.recipe.instructions)}})])])]):t._e()])},B=[],N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"ingredientsframe"}},t._l(t.ingredients,(function(e){return a("p",{key:e},[t._v(t._s(e.name))])})),0)},$=[],A={name:"ingredientsframe",props:{ingredients:Array}},T=A,D=Object(o["a"])(T,N,$,!1,null,null,null),V=D.exports,H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-row",attrs:{id:"likesharesaveframe"}},[a("div",{staticClass:"flex-fill"},[a("button",{staticClass:"btn flex-fill"},[a("svg",{staticClass:"bi bi-suit-heart",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M8 6.236l.894-1.789c.222-.443.607-1.08 1.152-1.595C10.582 2.345 11.224 2 12 2c1.676 0 3 1.326 3 2.92 0 1.211-.554 2.066-1.868 3.37-.337.334-.721.695-1.146 1.093C10.878 10.423 9.5 11.717 8 13.447c-1.5-1.73-2.878-3.024-3.986-4.064-.425-.398-.81-.76-1.146-1.093C1.554 6.986 1 6.131 1 4.92 1 3.326 2.324 2 4 2c.776 0 1.418.345 1.954.852.545.515.93 1.152 1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"}})]),t._v(" "+t._s(t.aggregateLikes)+" ")])]),a("div",{staticClass:"flex-fill"},[a("button",{staticClass:"btn flex-fill"},[a("svg",{staticClass:"bi bi-bookmark",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"}})]),t._v(" Save ")])]),a("div",{staticClass:"flex-fill"},[a("button",{staticClass:"btn flex-fill"},[a("svg",{staticClass:"bi bi-box-arrow-up",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"}}),a("path",{attrs:{"fill-rule":"evenodd",d:"M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"}})]),t._v(" Share ")])])])},F=[],J={name:"likesharesaveframe",props:{aggregateLikes:Number}},U=J,X=Object(o["a"])(U,H,F,!1,null,null,null),Z=X.exports,q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-row"},[a("div",{staticClass:"flex-fill"},[a("div",{staticClass:"row"},[t._v(t._s(t.nutritions.calories))]),a("div",{staticClass:"row"},[t._v("Calories")])]),a("div",{staticClass:"flex-fill"},[a("div",{staticClass:"row"},[t._v(t._s(t.nutritions.carbs))]),a("div",{staticClass:"row"},[t._v("Carbs")])]),a("div",{staticClass:"flex-fill"},[a("div",{staticClass:"row"},[t._v(t._s(t.nutritions.fat))]),a("div",{staticClass:"row"},[t._v("Fat")])]),a("div",{staticClass:"flex-fill"},[a("div",{staticClass:"row"},[t._v(t._s(t.nutritions.protein))]),a("div",{staticClass:"row"},[t._v("Protein")])])])},G=[],K={name:"ingredientsframe",props:{nutritions:Object}},Q=K,W=Object(o["a"])(Q,q,G,!1,null,null,null),Y=W.exports,tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-row",attrs:{id:"timesframe"}},[a("div",{staticClass:"flex-fill"},[a("div",{staticClass:"row"},[t._v(t._s(t.readyInMinutes))]),a("div",{staticClass:"row"},[t._v("Completion")])]),a("div",{staticClass:"flex-fill"},[a("div",{staticClass:"row"},[t._v(t._s(t.preparationMinutes))]),a("div",{staticClass:"row"},[t._v("Preparation")])]),a("div",{staticClass:"flex-fill"},[a("div",{staticClass:"row"},[t._v(t._s(t.cookingMinutes))]),a("div",{staticClass:"row"},[t._v("Cooking")])])])},et=[],at={name:"timesframe",props:{readyInMinutes:Number,preparationMinutes:Number,cookingMinutes:Number}},it=at,st=Object(o["a"])(it,tt,et,!1,null,null,null),rt=st.exports,nt={name:"recipeframe",components:{Ingredients:V,LikeShareSave:Z,Nutritions:Y,Times:rt},data:function(){return{recipe:null,nutritions:null,ready:!1}},computed:{recipeParams:function(){var t=new URLSearchParams;return t.append("id",this.$route.params.id),t},nutritionsParams:function(){var t=new URLSearchParams;return t.append("id",this.$route.params.id),t}},mounted:function(){this.getRecipe(),this.getNutritions()},methods:{getRecipe:function(){var t=this;_.a.get("/api/recipe",{params:this.recipeParams}).then((function(e){t.recipe=e.data,t.ready=!0,console.log(e.data)}))},getNutritions:function(){var t=this;_.a.get("/api/nutritions",{params:this.nutritionsParams}).then((function(e){t.nutritions=e.data,console.log(e.data)}))}}},lt=nt,ot=Object(o["a"])(lt,R,B,!1,null,"0ebf1572",null),ct=ot.exports;i["a"].use(u["a"]);var dt=new u["a"]({mode:"history",routes:[{path:"/",name:"home",component:S},{path:"/profile",name:"profile",component:E},{path:"/recipe/:id",name:"recipe",component:ct}]});a("4989"),a("f9e3");i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(d)},router:dt}).$mount("#app")},"85ec":function(t,e,a){},dbeb:function(t,e,a){},e297:function(t,e,a){"use strict";var i=a("dbeb"),s=a.n(i);s.a},ef4b:function(t,e,a){"use strict";var i=a("fbed"),s=a.n(i);s.a},fbed:function(t,e,a){}});
//# sourceMappingURL=app.ed9cbad7.js.map