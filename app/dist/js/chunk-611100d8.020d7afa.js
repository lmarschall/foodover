(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-611100d8"],{"372d":function(t,a,e){"use strict";var s=e("cf27"),i=e.n(s);i.a},"54f3":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"bar-placeholder"})},i=[],r=(e("6a0c"),e("2877")),c={},n=Object(r["a"])(c,s,i,!1,null,"362f6c93",null);a["a"]=n.exports},"561e":function(t,a,e){},"57da":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Bar",{attrs:{page:0}}),t.random?e("p",[t._v("RANDOM RECOMMENDS")]):t.random?t._e():e("p",[t._v("LAST SEARCH RECOMMENDS")]),e("Recipes",{attrs:{recipes:t.recommends,display:"ROW"}}),e("p",[t._v("FAVORITES")]),e("Recipes",{attrs:{recipes:t.favorites,display:"ROW"}}),e("Placeholder")],1)},i=[],r=(e("d3b7"),e("3ca3"),e("ddb0"),e("2b3d"),e("7338")),c=e.n(r),n=e("fddd"),l=e("54f3"),o=e("ac1d"),d={name:"Home",components:{Bar:n["a"],Placeholder:l["a"],Recipes:o["a"]},mounted:function(){this.getRecommends(),this.getFavorites()},data:function(){return{random:!0,last_recipe_id:0,recommends:[],favorites:[]}},computed:{recommendsParams:function(){var t=new URLSearchParams;return t.append("id",this.last_recipe_id),t}},methods:{getRecommends:function(){var t=this;document.db.searches.toArray().then((function(a){if(console.log(a),a.length>0){var e=a[a.length-1],s=e.recipes[0];t.last_recipe_id=s.id,c.a.get("api/recommends",{params:t.recommendsParams}).then((function(a){t.random=!1,console.log(a.data),t.recommends=a.data}))}else c.a.get("api/randoms",{}).then((function(a){t.random=!0,console.log(a.data.recipes),t.recommends=a.data.recipes}))}))},getFavorites:function(){var t=this;document.db.favorites.toArray().then((function(a){t.favorites=a}))}}},u=d,m=e("2877"),p=Object(m["a"])(u,s,i,!1,null,null,null);a["default"]=p.exports},"6a0c":function(t,a,e){"use strict";var s=e("561e"),i=e.n(s);i.a},ac1d:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",["ROW"==t.display?e("div",{staticClass:"d-flex flex-nowrap",staticStyle:{overflow:"auto"}},t._l(t.recipes,(function(a){return e("div",{key:a,staticClass:"card row-card"},[e("img",{staticClass:"card-img-top",attrs:{src:a.image,alt:"..."}}),e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title"},[e("router-link",{staticClass:"stretched-link",attrs:{to:{name:"recipe",params:{id:a.id}}}},[t._v(t._s(a.title))])],1),e("p",{staticClass:"card-text"})])])})),0):"COLUMN"==t.display?e("div",{staticClass:"d-flex flex-column"},t._l(t.recipes,(function(a){return e("div",{key:a,staticClass:"card column-card"},[e("img",{staticClass:"card-img-top",attrs:{src:a.image,alt:"..."}}),e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title"},[e("router-link",{staticClass:"stretched-link",attrs:{to:{name:"recipe",params:{id:a.id}}}},[t._v(t._s(a.title))])],1),e("p",{staticClass:"card-text"})])])})),0):t._e()])},i=[],r={name:"Recipes",props:{recipes:Array,display:String}},c=r,n=(e("372d"),e("2877")),l=Object(n["a"])(c,s,i,!1,null,"0ac8a578",null);a["a"]=l.exports},c116:function(t,a,e){},cf27:function(t,a,e){},ebe4:function(t,a,e){"use strict";var s=e("c116"),i=e.n(s);i.a},fddd:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card shadow p-3 mb-5 bg-white rounded-pill fixed-bottom"},[e("ul",{staticClass:"nav nav-fill nav-pills"},[e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link rounded-pill",class:{active:0==t.page},attrs:{to:{name:"home"}}},[t._v("Home")])],1),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link rounded-pill",class:{active:1==t.page},attrs:{to:{name:"search"}}},[t._v("Search")])],1)])])},i=[],r=(e("a9e3"),{name:"Bar",props:{page:Number}}),c=r,n=(e("ebe4"),e("2877")),l=Object(n["a"])(c,s,i,!1,null,"c58a26f2",null);a["a"]=l.exports}}]);
//# sourceMappingURL=chunk-611100d8.020d7afa.js.map