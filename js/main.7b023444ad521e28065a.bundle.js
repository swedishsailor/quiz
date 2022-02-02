(self.webpackChunkwebpack_boilerplate=self.webpackChunkwebpack_boilerplate||[]).push([[179],{559:(e,t,n)=>{e.exports=n(335)},786:(e,t,n)=>{"use strict";var r=n(266),o=n(608),i=n(159),s=n(568),u=n(943),a=n(201),c=n(745),l=n(979),f=n(46),d=n(760);e.exports=function(e){return new Promise((function(t,n){var p,M=e.data,h=e.headers,g=e.responseType;function m(){e.cancelToken&&e.cancelToken.unsubscribe(p),e.signal&&e.signal.removeEventListener("abort",p)}r.isFormData(M)&&delete h["Content-Type"];var j=new XMLHttpRequest;if(e.auth){var L=e.auth.username||"",y=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";h.Authorization="Basic "+btoa(L+":"+y)}var N=u(e.baseURL,e.url);function T(){if(j){var r="getAllResponseHeaders"in j?a(j.getAllResponseHeaders()):null,i={data:g&&"text"!==g&&"json"!==g?j.response:j.responseText,status:j.status,statusText:j.statusText,headers:r,config:e,request:j};o((function(e){t(e),m()}),(function(e){n(e),m()}),i),j=null}}if(j.open(e.method.toUpperCase(),s(N,e.params,e.paramsSerializer),!0),j.timeout=e.timeout,"onloadend"in j?j.onloadend=T:j.onreadystatechange=function(){j&&4===j.readyState&&(0!==j.status||j.responseURL&&0===j.responseURL.indexOf("file:"))&&setTimeout(T)},j.onabort=function(){j&&(n(l("Request aborted",e,"ECONNABORTED",j)),j=null)},j.onerror=function(){n(l("Network Error",e,null,j)),j=null},j.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",r=e.transitional||f.transitional;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,r.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",j)),j=null},r.isStandardBrowserEnv()){var w=(e.withCredentials||c(N))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;w&&(h[e.xsrfHeaderName]=w)}"setRequestHeader"in j&&r.forEach(h,(function(e,t){void 0===M&&"content-type"===t.toLowerCase()?delete h[t]:j.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(j.withCredentials=!!e.withCredentials),g&&"json"!==g&&(j.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&j.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&j.upload&&j.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(p=function(e){j&&(n(!e||e&&e.type?new d("canceled"):e),j.abort(),j=null)},e.cancelToken&&e.cancelToken.subscribe(p),e.signal&&(e.signal.aborted?p():e.signal.addEventListener("abort",p))),M||(M=null),j.send(M)}))}},335:(e,t,n)=>{"use strict";var r=n(266),o=n(345),i=n(929),s=n(650),u=function e(t){var n=new i(t),u=o(i.prototype.request,n);return r.extend(u,i.prototype,n),r.extend(u,n),u.create=function(n){return e(s(t,n))},u}(n(46));u.Axios=i,u.Cancel=n(760),u.CancelToken=n(510),u.isCancel=n(825),u.VERSION=n(992).version,u.all=function(e){return Promise.all(e)},u.spread=n(346),u.isAxiosError=n(276),e.exports=u,e.exports.default=u},760:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},510:(e,t,n)=>{"use strict";var r=n(760);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,r=n._listeners.length;for(t=0;t<r;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,r=new Promise((function(e){n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},o.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},825:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},929:(e,t,n)=>{"use strict";var r=n(266),o=n(568),i=n(252),s=n(29),u=n(650),a=n(123),c=a.validators;function l(e){this.defaults=e,this.interceptors={request:new i,response:new i}}l.prototype.request=function(e,t){if("string"==typeof e?(t=t||{}).url=e:t=e||{},!t.url)throw new Error("Provided config url is not valid");(t=u(this.defaults,t)).method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var n=t.transitional;void 0!==n&&a.assertOptions(n,{silentJSONParsing:c.transitional(c.boolean),forcedJSONParsing:c.transitional(c.boolean),clarifyTimeoutError:c.transitional(c.boolean)},!1);var r=[],o=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(o=o&&e.synchronous,r.unshift(e.fulfilled,e.rejected))}));var i,l=[];if(this.interceptors.response.forEach((function(e){l.push(e.fulfilled,e.rejected)})),!o){var f=[s,void 0];for(Array.prototype.unshift.apply(f,r),f=f.concat(l),i=Promise.resolve(t);f.length;)i=i.then(f.shift(),f.shift());return i}for(var d=t;r.length;){var p=r.shift(),M=r.shift();try{d=p(d)}catch(e){M(e);break}}try{i=s(d)}catch(e){return Promise.reject(e)}for(;l.length;)i=i.then(l.shift(),l.shift());return i},l.prototype.getUri=function(e){if(!e.url)throw new Error("Provided config url is not valid");return e=u(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,n){return this.request(u(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,n,r){return this.request(u(r||{},{method:e,url:t,data:n}))}})),e.exports=l},252:(e,t,n)=>{"use strict";var r=n(266);function o(){this.handlers=[]}o.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},943:(e,t,n)=>{"use strict";var r=n(406),o=n(27);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},979:(e,t,n)=>{"use strict";var r=n(50);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},29:(e,t,n)=>{"use strict";var r=n(266),o=n(661),i=n(825),s=n(46),u=n(760);function a(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new u("canceled")}e.exports=function(e){return a(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return a(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(a(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},50:e=>{"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}},650:(e,t,n)=>{"use strict";var r=n(266);e.exports=function(e,t){t=t||{};var n={};function o(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function i(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(e[n],t[n])}function s(e){if(!r.isUndefined(t[e]))return o(void 0,t[e])}function u(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(void 0,t[n])}function a(n){return n in t?o(e[n],t[n]):n in e?o(void 0,e[n]):void 0}var c={url:s,method:s,data:s,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:a};return r.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=c[e]||i,o=t(e);r.isUndefined(o)&&t!==a||(n[e]=o)})),n}},608:(e,t,n)=>{"use strict";var r=n(979);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},661:(e,t,n)=>{"use strict";var r=n(266),o=n(46);e.exports=function(e,t,n){var i=this||o;return r.forEach(n,(function(n){e=n.call(i,e,t)})),e}},46:(e,t,n)=>{"use strict";var r=n(266),o=n(490),i=n(50),s={"Content-Type":"application/x-www-form-urlencoded"};function u(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(a=n(786)),a),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(u(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)||t&&"application/json"===t["Content-Type"]?(u(t,"application/json"),function(e,t,n){if(r.isString(e))try{return(0,JSON.parse)(e),r.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||c.transitional,n=t&&t.silentJSONParsing,o=t&&t.forcedJSONParsing,s=!n&&"json"===this.responseType;if(s||o&&r.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(s){if("SyntaxError"===e.name)throw i(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(s)})),e.exports=c},992:e=>{e.exports={version:"0.25.0"}},345:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},568:(e,t,n)=>{"use strict";var r=n(266);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))})))})),i=s.join("&")}if(i){var u=e.indexOf("#");-1!==u&&(e=e.slice(0,u)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},27:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},159:(e,t,n)=>{"use strict";var r=n(266);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),!0===s&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},406:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}},276:(e,t,n)=>{"use strict";var r=n(266);e.exports=function(e){return r.isObject(e)&&!0===e.isAxiosError}},745:(e,t,n)=>{"use strict";var r=n(266);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},490:(e,t,n)=>{"use strict";var r=n(266);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},201:(e,t,n)=>{"use strict";var r=n(266),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}})),s):s}},346:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},123:(e,t,n)=>{"use strict";var r=n(992).version,o={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){o[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var i={};o.transitional=function(e,t,n){function o(e,t){return"[Axios v"+r+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(n,r,s){if(!1===e)throw new Error(o(r," has been removed"+(t?" in "+t:"")));return t&&!i[r]&&(i[r]=!0,console.warn(o(r," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,r,s)}},e.exports={assertOptions:function(e,t,n){if("object"!=typeof e)throw new TypeError("options must be an object");for(var r=Object.keys(e),o=r.length;o-- >0;){var i=r[o],s=t[i];if(s){var u=e[i],a=void 0===u||s(u,i,e);if(!0!==a)throw new TypeError("option "+i+" must be "+a)}else if(!0!==n)throw Error("Unknown option "+i)}},validators:o}},266:(e,t,n)=>{"use strict";var r=n(345),o=Object.prototype.toString;function i(e){return Array.isArray(e)}function s(e){return void 0===e}function u(e){return"[object ArrayBuffer]"===o.call(e)}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function l(e){return"[object Function]"===o.call(e)}function f(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:u,isBuffer:function(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"[object FormData]"===o.call(e)},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&u(e.buffer)},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:s,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:l,isStream:function(e){return a(e)&&l(e.pipe)},isURLSearchParams:function(e){return"[object URLSearchParams]"===o.call(e)},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:f,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):i(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)f(arguments[r],n);return t},extend:function(e,t,n){return f(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},579:(e,t,n)=>{"use strict";n(927),n(203),n(517)},203:(e,t,n)=>{"use strict";t.__esModule=!0,t.getData=void 0;var r=n(559);t.getData=r.default.get("https://quiz-jsonserver.herokuapp.com/qa").then((function(e){return console.log("Fetched Data :",e.data),e.data})).catch((function(e){return console.log(e)}))},927:function(e,t,n){"use strict";var r=this;t.__esModule=!0;var o,i,s=n(203),u=function(){function e(e,t,n){this.question=e,this.answers=t,this.points=n}return e.prototype.render=function(e,t){var n='    \n        <div id="inGameView">\n        <p class="timeLeft"> Time left: '+t+' sec</p>\n        <h2>Question</h2>\n        <p class="question">'+this.question+'</p>\n        <div class="answers">\n          <div class="leftPanel">\n            <button value="'+this.answers[0][1]+'" class="answer1" id="answersButton">'+this.answers[0][0]+'</button>\n            <button value="'+this.answers[1][1]+'" class="answer2" id="answersButton">'+this.answers[1][0]+'</button>\n          </div>\n          <div class="rightPanel">\n            <button value="'+this.answers[2][1]+'" class="answer3" id="answersButton">'+this.answers[2][0]+'</button>\n            <button value="'+this.answers[3][1]+'" class="answer4" id="answersButton">'+this.answers[3][0]+"</button>\n          </div>\n        </div>\n      </div>";e.innerHTML=n},e.prototype.onClick=function(e){console.log(e)},e}(),a=function e(t){r.time=setInterval((function(){return t--,document.querySelector("#inGameView").querySelector(".timeLeft").innerHTML=30===t?"Time left: 30 sec":"Time left: "+t+" sec",t<=0?(clearInterval(r.time),e(c)):t<=5?document.querySelector("#inGameView").querySelector(".timeLeft").classList.add("noTime"):t>5&&document.querySelector("#inGameView").querySelector(".timeLeft").classList.remove("noTime"),!1}),1e3*t/t)},c=30,l=!1,f=document.querySelector(".startButton"),d=document.querySelector(".informationsButton"),p=document.querySelector(".optionsButton"),M=document.getElementById("inGameViewTemplate").content;f.addEventListener("click",(function(e){e.preventDefault(),document.body.innerHTML="",document.body.appendChild(M),a(c)})),d.addEventListener("click",(function(e){e.preventDefault()})),p.addEventListener("click",(function(e){e.preventDefault()})),document.addEventListener("click",(function(e){if(!l&&"answersButton"===e.target.id){if(l=!0,console.log(e.target.value),"true"===e.target.value){var t=document.createElement("p");t.classList.add("goodAnswer"),t.innerHTML="Good answer!",document.body.insertAdjacentElement("afterend",t),setTimeout((function(){t.remove()}),5e3),clearInterval(r.time),e.target.classList.add("correct"),clearInterval(r.time),a(5)}else if(e.target.value="false"){e.target.classList.add("bad");for(var n=0;n<document.querySelectorAll("#answersButton").length;n++)"true"===document.querySelectorAll("#answersButton")[n].value&&document.querySelectorAll("#answersButton")[n].classList.add("correct");var i=document.createElement("p");i.classList.add("timeIsUp"),i.innerHTML="Bad answer",document.body.insertAdjacentElement("afterend",i),setTimeout((function(){i.remove()}),5e3),clearInterval(r.time),a(5)}var s=Math.floor(Math.random()*Object.keys(o).length),f=new u(o[s].question,o[s].answers,o[s].points);setTimeout((function(){f.render(document.getElementById("inGameView"),5),clearInterval(r.time),l=!1,a(c)}),5e3)}})),s.getData.then((function(e){o=e})),i=document.getElementById("inGameViewTemplate"),setTimeout((function(){var e=Math.floor(Math.random()*Object.keys(o).length);console.log(o[e]),new u(o[e].question,o[e].answers,o[e].points).render(i,30)}),355)},517:e=>{"use strict";e.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzOTE2IDE1MjQiPjx0aXRsZT5sb2dvLW9uLWRhcmstYmc8L3RpdGxlPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik04MjIgMzM2bDM4NyAyMTguOXY0MzcuOWwtMzg3IDIxOC45LTM4Ny0yMTguOVY1NTQuOXoiLz48cGF0aCBmaWxsPSIjOEVENkZCIiBkPSJNMTEzOS45IDk3Ny43bC0zMDUuMSAxNzIuNnYtMTM0LjRsMTkwLjEtMTA0LjYgMTE1IDY2LjR6bTIwLjktMTguOVY1OTcuOWwtMTExLjYgNjQuNXYyMzJsMTExLjYgNjQuNHptLTY1Ny45IDE4LjlMODA4IDExNTAuM3YtMTM0LjRMNjE3LjggOTExLjNsLTExNC45IDY2LjR6TTQ4MiA5NTguOFY1OTcuOWwxMTEuNiA2NC41djIzMkw0ODIgOTU4Ljh6bTEzLjEtMzg0LjNsMzEyLjktMTc3djEyOS45TDYwNy41IDYzNy43bC0xLjYuOS0xMTAuOC02NC4xem02NTIuNiAwbC0zMTIuOS0xNzd2MTI5LjlsMjAwLjUgMTEwLjIgMS42LjkgMTEwLjgtNjR6Ii8+PHBhdGggZmlsbD0iIzFDNzhDMCIgZD0iTTgwOCA5ODUuM0w2MjAuNCA4ODIuMVY2NzcuOEw4MDggNzg2LjF2MTk5LjJ6bTI2LjggMGwxODcuNi0xMDMuMVY2NzcuOEw4MzQuOCA3ODYuMXYxOTkuMnptLTEzLjQtMjA3ek02MzMuMSA2NTQuMmwxODguMy0xMDMuNSAxODguMyAxMDMuNS0xODguMyAxMDguNy0xODguMy0xMDguN3oiLz48cGF0aCBmaWxsPSIjRjVGQUZBIiBkPSJNMTU5OS4zIDkxMi4zaDgyLjVsODQuMS0yODAuMmgtODAuNGwtNDkuOCAxOTguOC01My4xLTE5OC44SDE1MTNsLTUzLjYgMTk4LjgtNDkuMy0xOTguOGgtODAuNGw4My42IDI4MC4yaDgyLjVsNTItMTc5LjUgNTEuNSAxNzkuNXpNMTc3MC4yIDc3M2MwIDg0LjEgNTcuMyAxNDYuMyAxNDcuNCAxNDYuMyA2OS43IDAgMTA3LjItNDEuOCAxMTcuOS02MS42bC00OC44LTM3Yy04IDExLjgtMzAgMzQuMy02OC4xIDM0LjMtNDEuMyAwLTcxLjMtMjYuOC03Mi45LTY0LjNIMjA0M2MuNS01LjQuNS0xMC43LjUtMTYuMSAwLTkxLjYtNDkuMy0xNDkuNS0xMzYuMS0xNDkuNS03OS45IDAtMTM3LjIgNjMuMi0xMzcuMiAxNDcuOXptNzcuNy0zMC42YzMuMi0zMi4xIDI1LjctNTYuOCA2MC42LTU2LjggMzMuOCAwIDU4LjQgMjIuNSA2MCA1Ni44aC0xMjAuNnptMjIzLjUgMTY5LjloNjkuN3YtMjguOWM3LjUgOS4xIDM1LjQgMzUuOSA4My4xIDM1LjkgODAuNCAwIDEzNy4yLTYwLjUgMTM3LjItMTQ2LjggMC04Ni44LTUyLjUtMTQ3LjMtMTMyLjktMTQ3LjMtNDguMiAwLTc2LjEgMjYuOC04My4xIDM2LjRWNTI0LjloLTczLjl2Mzg3LjR6bTcxLjgtMTM5LjNjMC01Mi41IDMxLjEtODIuNSA3MS44LTgyLjUgNDIuOSAwIDcxLjggMzMuOCA3MS44IDgyLjUgMCA0OS44LTMwIDgwLjktNzEuOCA4MC45LTQ1IDAtNzEuOC0zNi41LTcxLjgtODAuOXptMjQ3IDIzOS41aDczLjlWODgzLjNjNyA5LjEgMzQuOCAzNS45IDgzLjEgMzUuOSA4MC40IDAgMTMyLjktNjAuNSAxMzIuOS0xNDcuMyAwLTg1LjctNTYuOC0xNDYuOC0xMzcuMi0xNDYuOC00Ny43IDAtNzUuNiAyNi44LTgzLjEgMzYuNFY2MzJoLTY5Ljd2MzgwLjV6bTcxLjgtMjQxLjFjMC00NC41IDI2LjgtODAuOSA3MS44LTgwLjkgNDEuOCAwIDcxLjggMzEuMSA3MS44IDgwLjkgMCA0OC44LTI4LjkgODIuNS03MS44IDgyLjUtNDAuNyAwLTcxLjgtMzAtNzEuOC04Mi41em0yMzEuNSA1NC4xYzAgNTguOSA0OC4yIDkzLjggMTA1IDkzLjggMzIuMiAwIDUzLjYtOS42IDY4LjEtMjUuMmw0LjggMTguMmg2NS40VjczNC45YzAtNjIuNy0yNi44LTEwOS44LTExNi44LTEwOS44LTQyLjkgMC04NS4yIDE2LjEtMTEwLjQgMzMuMmwyNy45IDUwLjRjMjAuOS0xMC43IDQ2LjYtMTkuOCA3NC41LTE5LjggMzIuNyAwIDUwLjkgMTYuNiA1MC45IDQxLjN2MTguMmMtMTAuMi03LTMyLjItMTUuNS02MC42LTE1LjUtNjUuNC0uMS0xMDguOCAzNy40LTEwOC44IDkyLjZ6bTczLjktMi4yYzAtMjMgMTkuOC0zOS4xIDQ4LjItMzkuMXM0OC44IDE0LjUgNDguOCAzOS4xYzAgMjMuNi0yMC40IDM4LjYtNDguMiAzOC42cy00OC44LTE1LjUtNDguOC0zOC42em0zNDguOSAzMC42Yy00Ni42IDAtNzkuOC0zMy44LTc5LjgtODEuNCAwLTQ1IDI5LjUtODIgNzcuMi04MiAzMS42IDAgNTMuMSAxNS41IDY1LjQgMjYuOGwyMC45LTYyLjJjLTE4LjItMTMuOS00Ny4yLTMwLTg4LjQtMzAtODUuMiAwLTE0OSA2Mi43LTE0OSAxNDcuOXM2Mi4yIDE0Ni4zIDE0OS41IDE0Ni4zYzQwLjcgMCA3MS4zLTE3LjEgODcuMy0zMGwtMTkuOC02MC41Yy0xMi40IDEwLjEtMzQuOSAyNS4xLTYzLjMgMjUuMXptMTEwLjkgNTguNGg3My45Vjc2Ny42bDkzLjggMTQ0LjdoODYuOEwzMzc1LjYgNzU5bDk4LjYtMTI3aC04My4xbC05MCAxMTcuOXYtMjI1aC03My45djM4Ny40eiIvPjwvc3ZnPg=="}},e=>{e(e.s=579)}]);