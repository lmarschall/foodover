(function(e){function t(t){for(var r,o,u=t[0],i=t[1],d=t[2],s=0,l=[];s<u.length;s++)o=u[s],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&l.push(c[o][0]),c[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(l.length)l.shift()();return a.push.apply(a,d||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==c[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},c={app:0},a=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-dec94700":"be860c83","chunk-4c83a48d":"dd9c93be","chunk-7c5d6967":"d4cac79f","chunk-ebd3173c":"fcc07be3"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-4c83a48d":1,"chunk-7c5d6967":1,"chunk-ebd3173c":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-dec94700":"31d6cfe0","chunk-4c83a48d":"76a3c701","chunk-7c5d6967":"f335a98d","chunk-ebd3173c":"04b73fb2"}[e]+".css",c=i.p+r,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var d=a[u],s=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(s===r||s===c))return t()}var l=document.getElementsByTagName("style");for(u=0;u<l.length;u++){d=l[u],s=d.getAttribute("data-href");if(s===r||s===c)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||c,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],f.parentNode.removeChild(f),n(a)},f.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=a);var d,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=u(e);var l=new Error;d=function(t){s.onerror=s.onload=null,clearTimeout(f);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}c[e]=void 0}};var f=setTimeout((function(){d({type:"timeout",target:s})}),12e4);s.onerror=s.onload=d,document.head.appendChild(s)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],s=d.push.bind(d);d.push=t,d=d.slice();for(var l=0;l<d.length;l++)t(d[l]);var f=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=n("660e"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],u=n("4dec"),i={name:"app",created:function(){this.initDatabase()},methods:{initDatabase:function(){console.log("Init Database"),document.db=new u["a"]("foodover_database"),document.db.version(1).stores({searches:"++id, ingredients, intolerances, diet, sort, direction, offset, recipes",favorites:"++id, recipe"})}}},d=i,s=(n("034f"),n("2877")),l=Object(s["a"])(d,c,a,!1,null,null,null),f=l.exports,p=(n("d3b7"),n("8c4f")),h=function(){return Promise.all([n.e("chunk-dec94700"),n.e("chunk-4c83a48d")]).then(n.bind(null,"57da"))},m=function(){return Promise.all([n.e("chunk-dec94700"),n.e("chunk-ebd3173c")]).then(n.bind(null,"c106"))},b=function(){return Promise.all([n.e("chunk-dec94700"),n.e("chunk-7c5d6967")]).then(n.bind(null,"2a13"))};r["a"].use(p["a"]);var v=new p["a"]({mode:"history",routes:[{path:"/",name:"home",component:h},{path:"/search",name:"search",component:m},{path:"/recipe/:id",name:"recipe",component:b}]});n("4989"),n("f9e3");r["a"].config.productionTip=!1,r["a"].config.devtools=!0,r["a"].prototype.db=null,r["a"].use(o["a"],{breakpoints:{small:576,medium:768,large:992,extra:1/0}}),new r["a"]({render:function(e){return e(f)},router:v}).$mount("#app")},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.625bb1f5.js.map