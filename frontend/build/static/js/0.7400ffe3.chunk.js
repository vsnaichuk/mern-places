(this["webpackJsonpmern-app"]=this["webpackJsonpmern-app"]||[]).push([[0],{100:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(13),o=r(11),i=r(99),a=r(0),u=function(t,e){switch(e.type){case"INPUT_CHANGE":var r=!0;for(var n in t.inputs)t.inputs[n]&&(r=n===e.inputId?r&&e.isValid:r&&t.inputs[n].isValid);return Object(i.a)(Object(i.a)({},t),{},{inputs:Object(i.a)(Object(i.a)({},t.inputs),{},Object(o.a)({},e.inputId,{value:e.value,isValid:e.isValid})),isValid:r});case"SET_DATA":return{inputs:e.inputs,isValid:e.formIsValid};default:return t}},c=function(t,e){var r=Object(a.useReducer)(u,{inputs:t,isValid:e}),o=Object(n.a)(r,2),i=o[0],c=o[1];return[i,Object(a.useCallback)((function(t,e,r){c({type:"INPUT_CHANGE",inputId:t,value:e,isValid:r})}),[]),Object(a.useCallback)((function(t,e){c({type:"SET_DATA",inputs:t,formIsValid:e})}),[])]}},109:function(t,e,r){t.exports={formControl:"Input_formControl__20HWx",formControlInvalid:"Input_formControlInvalid__u0TQM"}},85:function(t,e,r){t.exports=r(93)},86:function(t,e,r){"use strict";function n(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(l){return void r(l)}u.done?e(c):Promise.resolve(c).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function u(t){n(a,o,i,u,c,"next",t)}function c(t){n(a,o,i,u,c,"throw",t)}u(void 0)}))}}r.d(e,"a",(function(){return o}))},88:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(0),o=r(33),i=function(){return Object(n.useContext)(o.a)}},89:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(23),o=function(t){return function(){for(var e=n.CancelToken.source(),r={cancelToken:e.token},o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];var u=t.apply(void 0,i.concat([r]));return u.cancel=function(){e.cancel("Query was cancelled")},u}}},90:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));var n={LOGIN:"/api/users/login",SIGN_UP:"/api/users/signup",USERS:"/api/users",PLACES:"/api/places",USER_PLACES:"/api/places/user"}},93:function(t,e,r){var n=function(t){"use strict";var e=Object.prototype,r=e.hasOwnProperty,n="function"===typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function u(t,e,r,n){var o=e&&e.prototype instanceof s?e:s,i=Object.create(o.prototype),a=new E(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return x()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=b(a,r);if(u){if(u===l)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=c(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=u;var l={};function s(){}function f(){}function h(){}var p={};p[o]=function(){return this};var v=Object.getPrototypeOf,d=v&&v(v(j([])));d&&d!==e&&r.call(d,o)&&(p=d);var y=h.prototype=s.prototype=Object.create(p);function m(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function g(t,e){var n;this._invoke=function(o,i){function a(){return new e((function(n,a){!function n(o,i,a,u){var l=c(t[o],t,i);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"===typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return n("throw",t,a,u)}))}u(l.arg)}(o,i,n,a)}))}return n=n?n.then(a,a):a()}}function b(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=c(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function j(t){if(t){var e=t[o];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:x}}function x(){return{value:void 0,done:!0}}return f.prototype=y.constructor=h,h.constructor=f,h[a]=f.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,a in t||(t[a]="GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},m(g.prototype),g.prototype[i]=function(){return this},t.AsyncIterator=g,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new g(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},m(y),y[a]="Generator",y[o]=function(){return this},y.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=j,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:j(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},94:function(t,e,r){"use strict";r.d(e,"c",(function(){return o})),r.d(e,"b",(function(){return i})),r.d(e,"a",(function(){return a})),r.d(e,"d",(function(){return u}));var n=r(26);var o=function(){return{type:"REQUIRE"}},i=function(t){return{type:"MINLENGTH",val:t}},a=function(){return{type:"EMAIL"}},u=function(t,e){var r,o=!0,i=function(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=Object(n.a)(t))){var e=0,r=function(){};return{s:r,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i,a=!0,u=!1;return{s:function(){o=t[Symbol.iterator]()},n:function(){var t=o.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==o.return||o.return()}finally{if(u)throw i}}}}(e);try{for(i.s();!(r=i.n()).done;){var a=r.value;"REQUIRE"===a.type&&(o=o&&t.trim().length>0),"MINLENGTH"===a.type&&(o=o&&t.trim().length>=a.val),"MAXLENGTH"===a.type&&(o=o&&t.trim().length<=a.val),"MIN"===a.type&&(o=o&&+t>=a.val),"MAX"===a.type&&(o=o&&+t<=a.val),"EMAIL"===a.type&&(o=o&&/^\S+@\S+\.\S+$/.test(t))}}catch(u){i.e(u)}finally{i.f()}return o}},98:function(t,e,r){"use strict";var n=r(11),o=r(13),i=r(25),a=r(99),u=r(14),c=r.n(u),l=r(0),s=r.n(l),f=r(94),h=r(109),p=r.n(h),v=function(t,e){switch(e.type){case"CHANGE":return Object(a.a)(Object(a.a)({},t),{},{value:e.val,isValid:Object(f.d)(e.val,e.validators)});case"TOUCH":return Object(a.a)(Object(a.a)({},t),{},{isTouched:!0});default:return t}};e.a=function(t){var e=t.el,r=t.id,a=t.label,u=t.rows,f=t.errorText,h=t.validators,d=t.onInput,y=t.initValue,m=t.initValid,g=(t.inputClass,t.className),b=Object(i.a)(t,["el","id","label","rows","errorText","validators","onInput","initValue","initValid","inputClass","className"]),w=Object(l.useReducer)(v,{value:y||"",isTouched:!1,isValid:m||!1}),O=Object(o.a)(w,2),E=O[0],j=O[1],x=E.value,L=E.isValid;Object(l.useEffect)((function(){d(r,x,L)}),[r,x,L,d]);var I=function(t){j({type:"CHANGE",val:t.target.value,validators:h})},_=function(){j({type:"TOUCH"})},T="input"===e?s.a.createElement("input",Object.assign({id:r,onChange:I,onBlur:_,value:E.value},b)):s.a.createElement("textarea",Object.assign({id:r,onChange:I,onBlur:_,value:E.value,rows:u||3},b));return s.a.createElement("div",{className:c()(p.a.formControl,[g],Object(n.a)({},p.a.formControlInvalid,!E.isValid&&E.isTouched))},s.a.createElement("label",{htmlFor:r},a),T,!E.isValid&&E.isTouched&&s.a.createElement("p",null,f))}},99:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(11);function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}}}]);
//# sourceMappingURL=0.7400ffe3.chunk.js.map