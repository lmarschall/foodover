(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-671c7ad3"],{"16cc":function(t,e,n){},"1dde":function(t,e,n){var a=n("d039"),r=n("b622"),i=n("2d00"),s=r("species");t.exports=function(t){return i>=51||!a((function(){var e=[],n=e.constructor={};return n[s]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"2b71":function(t,e,n){"use strict";var a=n("16cc"),r=n.n(a);r.a},"2d67":function(t,e,n){"use strict";var a=n("5b2e"),r=n.n(a);r.a},"3fd9":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"d-flex flex-wrap"},t._l(t.all_intolerances,(function(e,a){return n("div",{key:e,staticClass:"card intolerance-card",class:{checked:t.personal_intolerances.includes(e)}},[n("svg",{staticClass:"bi bi-egg",attrs:{viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M8 15a5 5 0 0 0 5-5c0-1.956-.69-4.286-1.742-6.12-.524-.913-1.112-1.658-1.704-2.164C8.956 1.206 8.428 1 8 1c-.428 0-.956.206-1.554.716-.592.506-1.18 1.251-1.704 2.164C3.69 5.714 3 8.044 3 10a5 5 0 0 0 5 5zm0 1a6 6 0 0 0 6-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 0 0 6 6z"}})]),t.personal_intolerances.includes(e)?n("a",{staticClass:"stretched-link",on:{click:function(e){return t.deleteIntolerance(a)}}},[t._v(t._s(e)+" ")]):n("a",{staticClass:"stretched-link",on:{click:function(n){return t.addIntolerance(e)}}},[t._v(t._s(e)+" ")])])})),0)},r=[],i=(n("c740"),n("a434"),{name:"Intolerances",data:function(){return{personal_intolerances:[],all_intolerances:["Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut"]}},mounted:function(){this.loadIntolerances()},methods:{loadIntolerances:function(){var t=this;t.personal_intolerances=[],document.db.intolerances.toArray().then((function(e){for(var n=0;n<e.length;n++)t.personal_intolerances.push(e[n].intolerance)}))},addIntolerance:function(t){var e=this;document.db.intolerances.add({intolerance:t}).then((function(t){document.db.intolerances.get(t,(function(t){e.personal_intolerances.push(t.intolerance)}))}))},deleteIntolerance:function(t){var e=this.all_intolerances[t],n=this.personal_intolerances.findIndex((function(t){return t===e}));this.personal_intolerances.splice(n,1),document.db.intolerances.where({intolerance:e}).first((function(t){document.db.intolerances.delete(t.id)}))}}}),s=i,c=(n("d808"),n("2877")),o=Object(c["a"])(s,a,r,!1,null,"9b04bf6c",null);e["a"]=o.exports},"54f3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bar-placeholder"})},r=[],i=(n("6a0c"),n("2877")),s={},c=Object(i["a"])(s,a,r,!1,null,"362f6c93",null);e["a"]=c.exports},"561e":function(t,e,n){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var a=n("1d80"),r=n("5899"),i="["+r+"]",s=RegExp("^"+i+i+"*"),c=RegExp(i+i+"*$"),o=function(t){return function(e){var n=String(a(e));return 1&t&&(n=n.replace(s,"")),2&t&&(n=n.replace(c,"")),n}};t.exports={start:o(1),end:o(2),trim:o(3)}},"5b2e":function(t,e,n){},"65f0":function(t,e,n){var a=n("861d"),r=n("e8b5"),i=n("b622"),s=i("species");t.exports=function(t,e){var n;return r(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!r(n.prototype)?a(n)&&(n=n[s],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"66aa":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Bar",{attrs:{page:1}}),n("input",{attrs:{type:"button"},on:{click:t.login}}),n("div",{staticClass:"accordion sticky-top",attrs:{id:"accordionProfile"}},[n("div",{staticClass:"card"},[t._m(0),n("div",{staticClass:"collapse show",attrs:{id:"collapseIntolerances","aria-labelledby":"headingIntolerances","data-parent":"#accordionProfile"}},[n("div",{staticClass:"card-body"},[n("Intolerances")],1)])]),n("div",{staticClass:"card"},[t._m(1),n("div",{staticClass:"collapse",attrs:{id:"collapseDiets","aria-labelledby":"headingDiets","data-parent":"#accordionProfile"}},[n("div",{staticClass:"card-body"},[n("Diets")],1)])])]),n("Placeholder")],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card-header",attrs:{id:"headingIntolerances"}},[n("h2",{staticClass:"mb-0"},[n("button",{staticClass:"btn btn-link btn-block text-left",attrs:{type:"button","data-toggle":"collapse","data-target":"#collapseIntolerances","aria-expanded":"true","aria-controls":"collapseIntolerances"}},[t._v(" Intolerances ")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card-header",attrs:{id:"headingDiets"}},[n("h2",{staticClass:"mb-0"},[n("button",{staticClass:"btn btn-link btn-block text-left",attrs:{type:"button","data-toggle":"collapse","data-target":"#collapseDiets","aria-expanded":"false","aria-controls":"collapseDiets"}},[t._v(" Diets ")])])])}],i=n("fddd"),s=n("54f3"),c=n("3fd9"),o=n("cc6a"),l={name:"Profile",components:{Bar:i["a"],Placeholder:s["a"],Intolerances:c["a"],Diets:o["a"]},data:function(){return{}}},d=l,u=n("2877"),f=Object(u["a"])(d,a,r,!1,null,null,null);e["default"]=f.exports},"6a0c":function(t,e,n){"use strict";var a=n("561e"),r=n.n(a);r.a},7156:function(t,e,n){var a=n("861d"),r=n("d2bb");t.exports=function(t,e,n){var i,s;return r&&"function"==typeof(i=e.constructor)&&i!==n&&a(s=i.prototype)&&s!==n.prototype&&r(t,s),t}},8418:function(t,e,n){"use strict";var a=n("c04e"),r=n("9bf2"),i=n("5c6c");t.exports=function(t,e,n){var s=a(e);s in t?r.f(t,s,i(0,n)):t[s]=n}},a434:function(t,e,n){"use strict";var a=n("23e7"),r=n("23cb"),i=n("a691"),s=n("50c4"),c=n("7b0b"),o=n("65f0"),l=n("8418"),d=n("1dde"),u=n("ae40"),f=d("splice"),p=u("splice",{ACCESSORS:!0,0:0,1:2}),v=Math.max,h=Math.min,b=9007199254740991,g="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!f||!p},{splice:function(t,e){var n,a,d,u,f,p,_=c(this),m=s(_.length),C=r(t,m),I=arguments.length;if(0===I?n=a=0:1===I?(n=0,a=m-C):(n=I-2,a=h(v(i(e),0),m-C)),m+n-a>b)throw TypeError(g);for(d=o(_,a),u=0;u<a;u++)f=C+u,f in _&&l(d,u,_[f]);if(d.length=a,n<a){for(u=C;u<m-a;u++)f=u+a,p=u+n,f in _?_[p]=_[f]:delete _[p];for(u=m;u>m-a+n;u--)delete _[u-1]}else if(n>a)for(u=m-a;u>C;u--)f=u+a-1,p=u+n-1,f in _?_[p]=_[f]:delete _[p];for(u=0;u<n;u++)_[u+C]=arguments[u+2];return _.length=m-a+n,d}})},a9e3:function(t,e,n){"use strict";var a=n("83ab"),r=n("da84"),i=n("94ca"),s=n("6eeb"),c=n("5135"),o=n("c6b6"),l=n("7156"),d=n("c04e"),u=n("d039"),f=n("7c73"),p=n("241c").f,v=n("06cf").f,h=n("9bf2").f,b=n("58a8").trim,g="Number",_=r[g],m=_.prototype,C=o(f(m))==g,I=function(t){var e,n,a,r,i,s,c,o,l=d(t,!1);if("string"==typeof l&&l.length>2)if(l=b(l),e=l.charCodeAt(0),43===e||45===e){if(n=l.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:a=2,r=49;break;case 79:case 111:a=8,r=55;break;default:return+l}for(i=l.slice(2),s=i.length,c=0;c<s;c++)if(o=i.charCodeAt(c),o<48||o>r)return NaN;return parseInt(i,a)}return+l};if(i(g,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var x,y=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof y&&(C?u((function(){m.valueOf.call(n)})):o(n)!=g)?l(new _(I(e)),n,y):I(e)},w=a?p(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),E=0;w.length>E;E++)c(_,x=w[E])&&!c(y,x)&&h(y,x,v(_,x));y.prototype=m,m.constructor=y,s(r,g,y)}},ab4f:function(t,e,n){},ae40:function(t,e,n){var a=n("83ab"),r=n("d039"),i=n("5135"),s=Object.defineProperty,c={},o=function(t){throw t};t.exports=function(t,e){if(i(c,t))return c[t];e||(e={});var n=[][t],l=!!i(e,"ACCESSORS")&&e.ACCESSORS,d=i(e,0)?e[0]:o,u=i(e,1)?e[1]:void 0;return c[t]=!!n&&!r((function(){if(l&&!a)return!0;var t={length:-1};l?s(t,1,{enumerable:!0,get:o}):t[1]=1,n.call(t,d,u)}))}},b727:function(t,e,n){var a=n("0366"),r=n("44ad"),i=n("7b0b"),s=n("50c4"),c=n("65f0"),o=[].push,l=function(t){var e=1==t,n=2==t,l=3==t,d=4==t,u=6==t,f=5==t||u;return function(p,v,h,b){for(var g,_,m=i(p),C=r(m),I=a(v,h,3),x=s(C.length),y=0,w=b||c,E=e?w(p,x):n?w(p,0):void 0;x>y;y++)if((f||y in C)&&(g=C[y],_=I(g,y,m),t))if(e)E[y]=_;else if(_)switch(t){case 3:return!0;case 5:return g;case 6:return y;case 2:o.call(E,g)}else if(d)return!1;return u?-1:l||d?d:E}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},c740:function(t,e,n){"use strict";var a=n("23e7"),r=n("b727").findIndex,i=n("44d2"),s=n("ae40"),c="findIndex",o=!0,l=s(c);c in[]&&Array(1)[c]((function(){o=!1})),a({target:"Array",proto:!0,forced:o||!l},{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),i(c)},cc6a:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"d-flex flex-wrap"},t._l(t.all_diets,(function(e,a){return n("div",{key:e,staticClass:"card diets-card",class:{checked:t.personal_diet===t.all_diets[a]}},[n("svg",{staticClass:"bi bi-egg",attrs:{viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M8 15a5 5 0 0 0 5-5c0-1.956-.69-4.286-1.742-6.12-.524-.913-1.112-1.658-1.704-2.164C8.956 1.206 8.428 1 8 1c-.428 0-.956.206-1.554.716-.592.506-1.18 1.251-1.704 2.164C3.69 5.714 3 8.044 3 10a5 5 0 0 0 5 5zm0 1a6 6 0 0 0 6-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 0 0 6 6z"}})]),n("a",{staticClass:"stretched-link",on:{click:function(e){return t.selectDiet(a)}}},[t._v(t._s(e)+" ")])])})),0)},r=[],i={name:"Diets",data:function(){return{all_diets:["Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Whole30"],personal_diet:""}},mounted:function(){this.loadDiet()},methods:{loadDiet:function(){this.personal_diet="Vegan"},selectDiet:function(t){this.personal_diet===this.all_diets[t]?this.personal_diet="":this.personal_diet=this.all_diets[t]}}},s=i,c=(n("2b71"),n("2877")),o=Object(c["a"])(s,a,r,!1,null,"a5bbe19e",null);e["a"]=o.exports},d808:function(t,e,n){"use strict";var a=n("ab4f"),r=n.n(a);r.a},e8b5:function(t,e,n){var a=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==a(t)}},fddd:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card shadow p-3 mb-5 bg-white rounded-pill fixed-bottom"},[n("ul",{staticClass:"nav nav-fill nav-pills"},[n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link rounded-pill",class:{active:0==t.page},attrs:{to:{name:"home"}}},[t._v("Home")])],1),n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link rounded-pill",class:{active:1==t.page},attrs:{to:{name:"profile"}}},[t._v("Profile")])],1)])])},r=[],i=(n("a9e3"),{name:"Bar",props:{page:Number}}),s=i,c=(n("2d67"),n("2877")),o=Object(c["a"])(s,a,r,!1,null,"2d1f957a",null);e["a"]=o.exports}}]);
//# sourceMappingURL=chunk-671c7ad3.c1f4a1e3.js.map