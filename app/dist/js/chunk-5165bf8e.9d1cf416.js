(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5165bf8e"],{"1dde":function(t,e,r){var n=r("d039"),a=r("b622"),o=r("2d00"),i=a("species");t.exports=function(t){return o>=51||!n((function(){var e=[],r=e.constructor={};return r[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"54f3":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bar-placeholder"})},a=[],o=(r("6a0c"),r("2877")),i={},c=Object(o["a"])(i,n,a,!1,null,"362f6c93",null);e["a"]=c.exports},"561e":function(t,e,r){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("1d80"),a=r("5899"),o="["+a+"]",i=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),s=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(i,"")),2&t&&(r=r.replace(c,"")),r}};t.exports={start:s(1),end:s(2),trim:s(3)}},"65f0":function(t,e,r){var n=r("861d"),a=r("e8b5"),o=r("b622"),i=o("species");t.exports=function(t,e){var r;return a(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!a(r.prototype)?n(r)&&(r=r[i],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},"66aa":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"profileframe"}},[r("Bar",{attrs:{page:1}}),r("input",{attrs:{type:"button"},on:{click:t.login}}),r("div",{staticClass:"accordion sticky-top",attrs:{id:"accordionExample"}},[r("Intolerances"),r("Diets")],1),r("Placeholder")],1)},a=[];r("96cf"),r("d3b7");function o(t,e,r,n,a,o,i){try{var c=t[o](i),s=c.value}catch(l){return void r(l)}c.done?e(s):Promise.resolve(s).then(n,a)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function c(t){o(i,n,a,c,s,"next",t)}function s(t){o(i,n,a,c,s,"throw",t)}c(void 0)}))}}var c=r("fddd"),s=r("54f3"),l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card",attrs:{id:"intolerancesframe"}},[t._m(0),r("div",{staticClass:"collapse show",attrs:{id:"collapseOne","aria-labelledby":"headingOne","data-parent":"#accordionExample"}},[r("div",{staticClass:"card-body"},[r("table",{staticClass:"table table-borderless"},[r("tbody",t._l(t.all_intolerances,(function(e,n){return r("tr",{key:e},[r("td",[t._v(t._s(e))]),t.personal_intolerances.includes(e)?r("td",[r("input",{attrs:{type:"checkbox",checked:""},on:{click:function(e){return t.deleteIntolerance(n)}}})]):r("td",[r("input",{attrs:{type:"checkbox"},on:{click:function(r){return t.addIntolerance(e)}}})])])})),0)])])])])},u=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card-header",attrs:{id:"headingOne"}},[r("h2",{staticClass:"mb-0"},[r("button",{staticClass:"btn btn-link btn-block text-left",attrs:{type:"button","data-toggle":"collapse","data-target":"#collapseOne","aria-expanded":"true","aria-controls":"collapseOne"}},[t._v(" Intolerances ")])])])}],f=(r("c740"),r("a434"),{name:"intolerancesframe",data:function(){return{all_intolerances:["Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut"],personal_intolerances:[]}},mounted:function(){this.loadIntolerances()},methods:{loadIntolerances:function(){var t=this;t.personal_intolerances=[],document.db.intolerances.toArray().then((function(e){for(var r=0;r<e.length;r++)t.personal_intolerances.push(e[r].intolerance)}))},addIntolerance:function(t){var e=this;document.db.intolerances.add({intolerance:t}).then((function(t){document.db.intolerances.get(t,(function(t){e.personal_intolerances.push(t.intolerance)}))}))},deleteIntolerance:function(t){var e=this.all_intolerances[t],r=this.personal_intolerances.findIndex((function(t){return t===e}));this.personal_intolerances.splice(r,1),document.db.intolerances.where({intolerance:e}).first((function(t){document.db.intolerances.delete(t.id)}))}}}),d=f,h=r("2877"),p=Object(h["a"])(d,l,u,!1,null,null,null),v=p.exports,y=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card",attrs:{id:"dietsframe"}},[t._m(0),r("div",{staticClass:"collapse",attrs:{id:"collapseTwo","aria-labelledby":"headingTwo","data-parent":"#accordionExample"}},[r("div",{staticClass:"card-body"},[r("table",{staticClass:"table table-borderless"},[r("tbody",t._l(t.all_diets,(function(e,n){return r("tr",{key:e},[r("td",[t._v(t._s(e))]),r("td",[r("input",{attrs:{type:"radio"},domProps:{checked:t.personal_diet===e},on:{click:function(e){return t.selectDiet(n)}}})])])})),0)])])])])},m=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card-header",attrs:{id:"headingTwo"}},[r("h2",{staticClass:"mb-0"},[r("button",{staticClass:"btn btn-link btn-block text-left",attrs:{type:"button","data-toggle":"collapse","data-target":"#collapseTwo","aria-expanded":"false","aria-controls":"collapseTwo"}},[t._v(" Diets ")])])])}],g={name:"dietsframe",data:function(){return{all_diets:["Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Whole30"],personal_diet:""}},mounted:function(){this.loadIntolerances()},methods:{loadIntolerances:function(){var t=this;t.personal_intolerances=[],document.db.intolerances.toArray().then((function(e){for(var r=0;r<e.length;r++)t.personal_intolerances.push(e[r].intolerance)}))},selectDiet:function(t){this.personal_diet=this.all_diets[t]}}},b=g,w=Object(h["a"])(b,y,m,!1,null,null,null),_=w.exports,x={name:"profileframe",components:{Bar:c["a"],Placeholder:s["a"],Intolerances:v,Diets:_},data:function(){return{}},mounted:function(){this.loadData()},methods:{loadData:function(){},login:function(){var t=i(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()}},E=x,I=Object(h["a"])(E,n,a,!1,null,null,null);e["default"]=I.exports},"6a0c":function(t,e,r){"use strict";var n=r("561e"),a=r.n(n);a.a},7156:function(t,e,r){var n=r("861d"),a=r("d2bb");t.exports=function(t,e,r){var o,i;return a&&"function"==typeof(o=e.constructor)&&o!==r&&n(i=o.prototype)&&i!==r.prototype&&a(t,i),t}},8418:function(t,e,r){"use strict";var n=r("c04e"),a=r("9bf2"),o=r("5c6c");t.exports=function(t,e,r){var i=n(e);i in t?a.f(t,i,o(0,r)):t[i]=r}},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(P){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var a=e&&e.prototype instanceof y?e:y,o=Object.create(a.prototype),i=new N(n||[]);return o._invoke=k(t,r,i),o}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(P){return{type:"throw",arg:P}}}t.wrap=l;var f="suspendedStart",d="suspendedYield",h="executing",p="completed",v={};function y(){}function m(){}function g(){}var b={};b[o]=function(){return this};var w=Object.getPrototypeOf,_=w&&w(w(A([])));_&&_!==r&&n.call(_,o)&&(b=_);var x=g.prototype=y.prototype=Object.create(b);function E(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function I(t,e){function r(a,o,i,c){var s=u(t[a],t,o);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(f).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}var a;function o(t,n){function o(){return new e((function(e,a){r(t,n,e,a)}))}return a=a?a.then(o,o):o()}this._invoke=o}function k(t,e,r){var n=f;return function(a,o){if(n===h)throw new Error("Generator is already running");if(n===p){if("throw"===a)throw o;return S()}r.method=a,r.arg=o;while(1){var i=r.delegate;if(i){var c=C(i,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var s=u(t,e,r);if("normal"===s.type){if(n=r.done?p:d,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=p,r.method="throw",r.arg=s.arg)}}}function C(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,C(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var a=u(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,v;var o=a.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function A(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){while(++a<t.length)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:S}}function S(){return{value:e,done:!0}}return m.prototype=x.constructor=g,g.constructor=m,m.displayName=s(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},E(I.prototype),I.prototype[i]=function(){return this},t.AsyncIterator=I,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new I(l(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(x),s(x,c,"Generator"),x[o]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=A,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return c.type="throw",c.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(s&&l){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;O(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:A(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},a434:function(t,e,r){"use strict";var n=r("23e7"),a=r("23cb"),o=r("a691"),i=r("50c4"),c=r("7b0b"),s=r("65f0"),l=r("8418"),u=r("1dde"),f=r("ae40"),d=u("splice"),h=f("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,v=Math.min,y=9007199254740991,m="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!d||!h},{splice:function(t,e){var r,n,u,f,d,h,g=c(this),b=i(g.length),w=a(t,b),_=arguments.length;if(0===_?r=n=0:1===_?(r=0,n=b-w):(r=_-2,n=v(p(o(e),0),b-w)),b+r-n>y)throw TypeError(m);for(u=s(g,n),f=0;f<n;f++)d=w+f,d in g&&l(u,f,g[d]);if(u.length=n,r<n){for(f=w;f<b-n;f++)d=f+n,h=f+r,d in g?g[h]=g[d]:delete g[h];for(f=b;f>b-n+r;f--)delete g[f-1]}else if(r>n)for(f=b-n;f>w;f--)d=f+n-1,h=f+r-1,d in g?g[h]=g[d]:delete g[h];for(f=0;f<r;f++)g[f+w]=arguments[f+2];return g.length=b-n+r,u}})},a9e3:function(t,e,r){"use strict";var n=r("83ab"),a=r("da84"),o=r("94ca"),i=r("6eeb"),c=r("5135"),s=r("c6b6"),l=r("7156"),u=r("c04e"),f=r("d039"),d=r("7c73"),h=r("241c").f,p=r("06cf").f,v=r("9bf2").f,y=r("58a8").trim,m="Number",g=a[m],b=g.prototype,w=s(d(b))==m,_=function(t){var e,r,n,a,o,i,c,s,l=u(t,!1);if("string"==typeof l&&l.length>2)if(l=y(l),e=l.charCodeAt(0),43===e||45===e){if(r=l.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+l}for(o=l.slice(2),i=o.length,c=0;c<i;c++)if(s=o.charCodeAt(c),s<48||s>a)return NaN;return parseInt(o,n)}return+l};if(o(m,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var x,E=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof E&&(w?f((function(){b.valueOf.call(r)})):s(r)!=m)?l(new g(_(e)),r,E):_(e)},I=n?h(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;I.length>k;k++)c(g,x=I[k])&&!c(E,x)&&v(E,x,p(g,x));E.prototype=b,b.constructor=E,i(a,m,E)}},ae40:function(t,e,r){var n=r("83ab"),a=r("d039"),o=r("5135"),i=Object.defineProperty,c={},s=function(t){throw t};t.exports=function(t,e){if(o(c,t))return c[t];e||(e={});var r=[][t],l=!!o(e,"ACCESSORS")&&e.ACCESSORS,u=o(e,0)?e[0]:s,f=o(e,1)?e[1]:void 0;return c[t]=!!r&&!a((function(){if(l&&!n)return!0;var t={length:-1};l?i(t,1,{enumerable:!0,get:s}):t[1]=1,r.call(t,u,f)}))}},b727:function(t,e,r){var n=r("0366"),a=r("44ad"),o=r("7b0b"),i=r("50c4"),c=r("65f0"),s=[].push,l=function(t){var e=1==t,r=2==t,l=3==t,u=4==t,f=6==t,d=5==t||f;return function(h,p,v,y){for(var m,g,b=o(h),w=a(b),_=n(p,v,3),x=i(w.length),E=0,I=y||c,k=e?I(h,x):r?I(h,0):void 0;x>E;E++)if((d||E in w)&&(m=w[E],g=_(m,E,b),t))if(e)k[E]=g;else if(g)switch(t){case 3:return!0;case 5:return m;case 6:return E;case 2:s.call(k,m)}else if(u)return!1;return f?-1:l||u?u:k}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},c740:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").findIndex,o=r("44d2"),i=r("ae40"),c="findIndex",s=!0,l=i(c);c in[]&&Array(1)[c]((function(){s=!1})),n({target:"Array",proto:!0,forced:s||!l},{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),o(c)},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},f40a:function(t,e,r){},f60f:function(t,e,r){"use strict";var n=r("f40a"),a=r.n(n);a.a},fddd:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card shadow p-3 mb-5 bg-white rounded-pill fixed-bottom",attrs:{id:"barframe"}},[r("ul",{staticClass:"nav nav-fill nav-pills"},[r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link rounded-pill",class:{active:0==t.page},attrs:{to:{name:"home"}}},[t._v("Home")])],1),r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link rounded-pill",class:{active:1==t.page},attrs:{to:{name:"profile"}}},[t._v("Profile")])],1)])])},a=[],o=(r("a9e3"),{name:"barframe",props:{page:Number}}),i=o,c=(r("f60f"),r("2877")),s=Object(c["a"])(i,n,a,!1,null,"76d477f9",null);e["a"]=s.exports}}]);
//# sourceMappingURL=chunk-5165bf8e.9d1cf416.js.map