(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-630e9fa7"],{"3e9a":function(e,t,a){},"54f3":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bar-placeholder"})},i=[],r={name:"Placeholder"},n=r,c=(a("5738"),a("2877")),d=Object(c["a"])(n,s,i,!1,null,"1dcd9d57",null);t["a"]=d.exports},"55f2":function(e,t,a){"use strict";a("dfd1")},5738:function(e,t,a){"use strict";a("3e9a")},"57da":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Bar",{attrs:{page:0}}),e.random?a("h2",[e._v("For your inpspiration")]):e.random?e._e():a("h2",[e._v("Inpired by your last searches")]),a("Recipes",{attrs:{recipes:e.recommends,display:"ROW"}}),a("h2",[e._v("Your favorites")]),a("Recipes",{attrs:{recipes:e.favorites,display:"ROW"}}),a("Placeholder")],1)},i=[],r=(a("d3b7"),a("3ca3"),a("ddb0"),a("9861"),a("bc3a")),n=a.n(r),c=a("fddd"),d=a("54f3"),o=a("ac1d"),l={name:"Home",components:{Bar:c["a"],Placeholder:d["a"],Recipes:o["a"]},mounted:function(){this.getRecommends(),this.getFavorites()},data:function(){return{random:!0,last_recipe_id:0,recommends:[],favorites:[]}},computed:{recommendsParams:function(){var e=new URLSearchParams;return e.append("id",this.last_recipe_id),e}},methods:{getRecommends:function(){var e=this;document.db.searches.toArray().then((function(t){if(t.length>0){var a=t[t.length-1],s=a.recipes[0];e.last_recipe_id=s.id,n.a.get("api/recommends",{params:e.recommendsParams}).then((function(t){e.random=!1,e.recommends=t.data;for(var a=0;a<e.recommends.length;a++)e.recommends[a].image="https://spoonacular.com/recipeImages/".concat(e.recommends[a].id,"-556x370.jpg")}))}else n.a.get("https://foodover.herokuapp.com/api/randoms",{}).then((function(t){e.random=!0,e.recommends=t.data.recipes}))}))},getFavorites:function(){var e=this;document.db.favorites.toArray().then((function(t){e.favorites=t}))}}},u=l,m=(a("7ecf"),a("2877")),p=Object(m["a"])(u,s,i,!1,null,"56d877be",null);t["default"]=p.exports},"6d63":function(e,t,a){"use strict";a("f248")},"7ecf":function(e,t,a){"use strict";a("9a39")},"9a39":function(e,t,a){},ac1d:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",["ROW"==e.display?a("div",{staticClass:"d-flex flex-nowrap",staticStyle:{overflow:"auto"}},e._l(e.recipes,(function(t){return a("div",{key:t.id,staticClass:"card row-card"},[a("img",{staticClass:"card-img-top",attrs:{src:t.image,alt:"..."}}),a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[a("router-link",{staticClass:"stretched-link",attrs:{to:{name:"recipe",params:{id:t.id}}}},[e._v(e._s(t.title))])],1)])])})),0):"COLUMN"==e.display?a("div",{staticClass:"d-flex flex-wrap"},e._l(e.recipes,(function(t){return a("div",{key:t.id,staticClass:"card column-card"},[a("div",{staticClass:"recipe-likes"},[a("svg",{staticClass:"bi bi-suit-heart",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{"fill-rule":"evenodd",d:"M8 6.236l.894-1.789c.222-.443.607-1.08 1.152-1.595C10.582 2.345 11.224 2 12 2c1.676 0 3 1.326 3 2.92 0 1.211-.554 2.066-1.868 3.37-.337.334-.721.695-1.146 1.093C10.878 10.423 9.5 11.717 8 13.447c-1.5-1.73-2.878-3.024-3.986-4.064-.425-.398-.81-.76-1.146-1.093C1.554 6.986 1 6.131 1 4.92 1 3.326 2.324 2 4 2c.776 0 1.418.345 1.954.852.545.515.93 1.152 1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"}})]),e._v(" "+e._s(t.likes)+" ")]),a("img",{staticClass:"card-img-top",attrs:{src:t.image,alt:"..."}}),a("div",{staticClass:"card-body"},[e.ingredients?a("p",{staticClass:"card-text"},[e._v(" "+e._s(t.usedIngredientCount)+" of "+e._s(e.ingredients.length)+" ingredients used ")]):e._e(),a("h5",{staticClass:"card-title"},[a("router-link",{staticClass:"stretched-link",attrs:{to:{name:"recipe",params:{id:t.id}}}},[e._v(e._s(t.title))])],1)])])})),0):e._e()])},i=[],r={name:"Recipes",props:{recipes:{type:Array,required:!0},display:{type:String,required:!0,default:"ROW"},ingredients:{type:Array,required:!1}}},n=r,c=(a("55f2"),a("2877")),d=Object(c["a"])(n,s,i,!1,null,"4869c164",null);t["a"]=d.exports},dfd1:function(e,t,a){},f248:function(e,t,a){},fddd:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"card shadow p-3 mb-5 bg-white rounded-pill fixed-bottom"},[a("ul",{staticClass:"nav nav-fill nav-pills"},[a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link rounded-pill",class:{active:0==e.page},attrs:{to:{name:"home"}}},[e._v("Home")])],1),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link rounded-pill",class:{active:1==e.page},attrs:{to:{name:"search"}}},[e._v("Search")])],1)])])},i=[],r=(a("a9e3"),{name:"Bar",props:{page:{type:Number,required:!0,default:0}}}),n=r,c=(a("6d63"),a("2877")),d=Object(c["a"])(n,s,i,!1,null,"20ed62ae",null);t["a"]=d.exports}}]);
//# sourceMappingURL=chunk-630e9fa7.6bae69ba.js.map