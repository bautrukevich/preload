!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(3)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2);new(n.n(i).a)("Gilroy").load(null,5e3).then(function(){console.log("Font is available")},function(){console.error("Font is not available after waiting 5 seconds")})},function(e,t,n){!function(){function t(e,t){document.addEventListener?e.addEventListener("scroll",t,!1):e.attachEvent("scroll",t)}function n(e){this.a=document.createElement("div"),this.a.setAttribute("aria-hidden","true"),this.a.appendChild(document.createTextNode(e)),this.b=document.createElement("span"),this.c=document.createElement("span"),this.h=document.createElement("span"),this.f=document.createElement("span"),this.g=-1,this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.b.appendChild(this.h),this.c.appendChild(this.f),this.a.appendChild(this.b),this.a.appendChild(this.c)}function i(e,t){e.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+t+";"}function o(e){var t=e.a.offsetWidth,n=t+100;return e.f.style.width=n+"px",e.c.scrollLeft=n,e.b.scrollLeft=e.b.scrollWidth+100,e.g!==t&&(e.g=t,!0)}function a(e,n){function i(){var e=a;o(e)&&e.a.parentNode&&n(e.g)}var a=e;t(e.b,i),t(e.c,i),o(e)}function s(e,t){var n=t||{};this.family=e,this.style=n.style||"normal",this.weight=n.weight||"normal",this.stretch=n.stretch||"normal"}var r=null,c=null,l=null,d=null;function u(){return null===d&&(d=!!document.fonts),d}function f(e,t){return[e.style,e.weight,function(){if(null===l){var e=document.createElement("div");try{e.style.font="condensed 100px sans-serif"}catch(e){}l=""!==e.style.font}return l}()?e.stretch:"","100px",t].join(" ")}s.prototype.load=function(e,t){var o=this,s=e||"BESbswy",l=0,d=t||3e3,h=(new Date).getTime();return new Promise(function(e,t){if(u()&&!function(){if(null===c)if(u()&&/Apple/.test(window.navigator.vendor)){var e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);c=!!e&&603>parseInt(e[1],10)}else c=!1;return c}()){var p=new Promise(function(e,t){!function n(){(new Date).getTime()-h>=d?t():document.fonts.load(f(o,'"'+o.family+'"'),s).then(function(t){1<=t.length?e():setTimeout(n,25)},function(){t()})}()}),m=new Promise(function(e,t){l=setTimeout(t,d)});Promise.race([m,p]).then(function(){clearTimeout(l),e(o)},function(){t(o)})}else!function(e){document.body?e():document.addEventListener?document.addEventListener("DOMContentLoaded",function t(){document.removeEventListener("DOMContentLoaded",t),e()}):document.attachEvent("onreadystatechange",function t(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",t),e())})}(function(){function c(){var t;(t=-1!=v&&-1!=w||-1!=v&&-1!=y||-1!=w&&-1!=y)&&((t=v!=w&&v!=y&&w!=y)||(null===r&&(t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),r=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))),t=r&&(v==x&&w==x&&y==x||v==b&&w==b&&y==b||v==g&&w==g&&y==g)),t=!t),t&&(E.parentNode&&E.parentNode.removeChild(E),clearTimeout(l),e(o))}var u=new n(s),p=new n(s),m=new n(s),v=-1,w=-1,y=-1,x=-1,b=-1,g=-1,E=document.createElement("div");E.dir="ltr",i(u,f(o,"sans-serif")),i(p,f(o,"serif")),i(m,f(o,"monospace")),E.appendChild(u.a),E.appendChild(p.a),E.appendChild(m.a),document.body.appendChild(E),x=u.a.offsetWidth,b=p.a.offsetWidth,g=m.a.offsetWidth,function e(){if((new Date).getTime()-h>=d)E.parentNode&&E.parentNode.removeChild(E),t(o);else{var n=document.hidden;!0!==n&&void 0!==n||(v=u.a.offsetWidth,w=p.a.offsetWidth,y=m.a.offsetWidth,c()),l=setTimeout(e,50)}}(),a(u,function(e){v=e,c()}),i(u,f(o,'"'+o.family+'",sans-serif')),a(p,function(e){w=e,c()}),i(p,f(o,'"'+o.family+'",serif')),a(m,function(e){y=e,c()}),i(m,f(o,'"'+o.family+'",monospace'))})})},e.exports=s}()},function(e,t){}]);