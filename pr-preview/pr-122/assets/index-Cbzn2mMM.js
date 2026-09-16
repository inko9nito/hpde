(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const b of d.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&c(b)}).observe(document,{childList:!0,subtree:!0});function h(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function c(s){if(s.ep)return;s.ep=!0;const d=h(s);fetch(s.href,d)}})();function _g(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Eo={exports:{}},_a={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lh;function Rg(){if(lh)return _a;lh=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function h(c,s,d){var b=null;if(d!==void 0&&(b=""+d),s.key!==void 0&&(b=""+s.key),"key"in s){d={};for(var w in s)w!=="key"&&(d[w]=s[w])}else d=s;return s=d.ref,{$$typeof:r,type:c,key:b,ref:s!==void 0?s:null,props:d}}return _a.Fragment=f,_a.jsx=h,_a.jsxs=h,_a}var ah;function Mg(){return ah||(ah=1,Eo.exports=Rg()),Eo.exports}var E=Mg(),wo={exports:{}},ct={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ih;function zg(){if(ih)return ct;ih=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),b=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),z=Symbol.for("react.lazy"),N=Symbol.for("react.activity"),B=Symbol.iterator;function U(p){return p===null||typeof p!="object"?null:(p=B&&p[B]||p["@@iterator"],typeof p=="function"?p:null)}var Y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},P=Object.assign,pt={};function F(p,O,G){this.props=p,this.context=O,this.refs=pt,this.updater=G||Y}F.prototype.isReactComponent={},F.prototype.setState=function(p,O){if(typeof p!="object"&&typeof p!="function"&&p!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,p,O,"setState")},F.prototype.forceUpdate=function(p){this.updater.enqueueForceUpdate(this,p,"forceUpdate")};function j(){}j.prototype=F.prototype;function L(p,O,G){this.props=p,this.context=O,this.refs=pt,this.updater=G||Y}var X=L.prototype=new j;X.constructor=L,P(X,F.prototype),X.isPureReactComponent=!0;var W=Array.isArray;function q(){}var H={H:null,A:null,T:null,S:null},K=Object.prototype.hasOwnProperty;function Q(p,O,G){var Z=G.ref;return{$$typeof:r,type:p,key:O,ref:Z!==void 0?Z:null,props:G}}function nt(p,O){return Q(p.type,O,p.props)}function $(p){return typeof p=="object"&&p!==null&&p.$$typeof===r}function J(p){var O={"=":"=0",":":"=2"};return"$"+p.replace(/[=:]/g,function(G){return O[G]})}var tt=/\/+/g;function it(p,O){return typeof p=="object"&&p!==null&&p.key!=null?J(""+p.key):O.toString(36)}function qt(p){switch(p.status){case"fulfilled":return p.value;case"rejected":throw p.reason;default:switch(typeof p.status=="string"?p.then(q,q):(p.status="pending",p.then(function(O){p.status==="pending"&&(p.status="fulfilled",p.value=O)},function(O){p.status==="pending"&&(p.status="rejected",p.reason=O)})),p.status){case"fulfilled":return p.value;case"rejected":throw p.reason}}throw p}function _(p,O,G,Z,ut){var st=typeof p;(st==="undefined"||st==="boolean")&&(p=null);var ft=!1;if(p===null)ft=!0;else switch(st){case"bigint":case"string":case"number":ft=!0;break;case"object":switch(p.$$typeof){case r:case f:ft=!0;break;case z:return ft=p._init,_(ft(p._payload),O,G,Z,ut)}}if(ft)return ut=ut(p),ft=Z===""?"."+it(p,0):Z,W(ut)?(G="",ft!=null&&(G=ft.replace(tt,"$&/")+"/"),_(ut,O,G,"",function(He){return He})):ut!=null&&($(ut)&&(ut=nt(ut,G+(ut.key==null||p&&p.key===ut.key?"":(""+ut.key).replace(tt,"$&/")+"/")+ft)),O.push(ut)),1;ft=0;var zt=Z===""?".":Z+":";if(W(p))for(var Ct=0;Ct<p.length;Ct++)Z=p[Ct],st=zt+it(Z,Ct),ft+=_(Z,O,G,st,ut);else if(Ct=U(p),typeof Ct=="function")for(p=Ct.call(p),Ct=0;!(Z=p.next()).done;)Z=Z.value,st=zt+it(Z,Ct++),ft+=_(Z,O,G,st,ut);else if(st==="object"){if(typeof p.then=="function")return _(qt(p),O,G,Z,ut);throw O=String(p),Error("Objects are not valid as a React child (found: "+(O==="[object Object]"?"object with keys {"+Object.keys(p).join(", ")+"}":O)+"). If you meant to render a collection of children, use an array instead.")}return ft}function k(p,O,G){if(p==null)return p;var Z=[],ut=0;return _(p,Z,"","",function(st){return O.call(G,st,ut++)}),Z}function lt(p){if(p._status===-1){var O=p._result;O=O(),O.then(function(G){(p._status===0||p._status===-1)&&(p._status=1,p._result=G)},function(G){(p._status===0||p._status===-1)&&(p._status=2,p._result=G)}),p._status===-1&&(p._status=0,p._result=O)}if(p._status===1)return p._result.default;throw p._result}var Tt=typeof reportError=="function"?reportError:function(p){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var O=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof p=="object"&&p!==null&&typeof p.message=="string"?String(p.message):String(p),error:p});if(!window.dispatchEvent(O))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",p);return}console.error(p)},Et={map:k,forEach:function(p,O,G){k(p,function(){O.apply(this,arguments)},G)},count:function(p){var O=0;return k(p,function(){O++}),O},toArray:function(p){return k(p,function(O){return O})||[]},only:function(p){if(!$(p))throw Error("React.Children.only expected to receive a single React element child.");return p}};return ct.Activity=N,ct.Children=Et,ct.Component=F,ct.Fragment=h,ct.Profiler=s,ct.PureComponent=L,ct.StrictMode=c,ct.Suspense=g,ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=H,ct.__COMPILER_RUNTIME={__proto__:null,c:function(p){return H.H.useMemoCache(p)}},ct.cache=function(p){return function(){return p.apply(null,arguments)}},ct.cacheSignal=function(){return null},ct.cloneElement=function(p,O,G){if(p==null)throw Error("The argument must be a React element, but you passed "+p+".");var Z=P({},p.props),ut=p.key;if(O!=null)for(st in O.key!==void 0&&(ut=""+O.key),O)!K.call(O,st)||st==="key"||st==="__self"||st==="__source"||st==="ref"&&O.ref===void 0||(Z[st]=O[st]);var st=arguments.length-2;if(st===1)Z.children=G;else if(1<st){for(var ft=Array(st),zt=0;zt<st;zt++)ft[zt]=arguments[zt+2];Z.children=ft}return Q(p.type,ut,Z)},ct.createContext=function(p){return p={$$typeof:b,_currentValue:p,_currentValue2:p,_threadCount:0,Provider:null,Consumer:null},p.Provider=p,p.Consumer={$$typeof:d,_context:p},p},ct.createElement=function(p,O,G){var Z,ut={},st=null;if(O!=null)for(Z in O.key!==void 0&&(st=""+O.key),O)K.call(O,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(ut[Z]=O[Z]);var ft=arguments.length-2;if(ft===1)ut.children=G;else if(1<ft){for(var zt=Array(ft),Ct=0;Ct<ft;Ct++)zt[Ct]=arguments[Ct+2];ut.children=zt}if(p&&p.defaultProps)for(Z in ft=p.defaultProps,ft)ut[Z]===void 0&&(ut[Z]=ft[Z]);return Q(p,st,ut)},ct.createRef=function(){return{current:null}},ct.forwardRef=function(p){return{$$typeof:w,render:p}},ct.isValidElement=$,ct.lazy=function(p){return{$$typeof:z,_payload:{_status:-1,_result:p},_init:lt}},ct.memo=function(p,O){return{$$typeof:v,type:p,compare:O===void 0?null:O}},ct.startTransition=function(p){var O=H.T,G={};H.T=G;try{var Z=p(),ut=H.S;ut!==null&&ut(G,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(q,Tt)}catch(st){Tt(st)}finally{O!==null&&G.types!==null&&(O.types=G.types),H.T=O}},ct.unstable_useCacheRefresh=function(){return H.H.useCacheRefresh()},ct.use=function(p){return H.H.use(p)},ct.useActionState=function(p,O,G){return H.H.useActionState(p,O,G)},ct.useCallback=function(p,O){return H.H.useCallback(p,O)},ct.useContext=function(p){return H.H.useContext(p)},ct.useDebugValue=function(){},ct.useDeferredValue=function(p,O){return H.H.useDeferredValue(p,O)},ct.useEffect=function(p,O){return H.H.useEffect(p,O)},ct.useEffectEvent=function(p){return H.H.useEffectEvent(p)},ct.useId=function(){return H.H.useId()},ct.useImperativeHandle=function(p,O,G){return H.H.useImperativeHandle(p,O,G)},ct.useInsertionEffect=function(p,O){return H.H.useInsertionEffect(p,O)},ct.useLayoutEffect=function(p,O){return H.H.useLayoutEffect(p,O)},ct.useMemo=function(p,O){return H.H.useMemo(p,O)},ct.useOptimistic=function(p,O){return H.H.useOptimistic(p,O)},ct.useReducer=function(p,O,G){return H.H.useReducer(p,O,G)},ct.useRef=function(p){return H.H.useRef(p)},ct.useState=function(p){return H.H.useState(p)},ct.useSyncExternalStore=function(p,O,G){return H.H.useSyncExternalStore(p,O,G)},ct.useTransition=function(){return H.H.useTransition()},ct.version="19.2.6",ct}var uh;function $o(){return uh||(uh=1,wo.exports=zg()),wo.exports}var St=$o(),To={exports:{}},Ra={},Ao={exports:{}},xo={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ch;function Dg(){return ch||(ch=1,(function(r){function f(_,k){var lt=_.length;_.push(k);t:for(;0<lt;){var Tt=lt-1>>>1,Et=_[Tt];if(0<s(Et,k))_[Tt]=k,_[lt]=Et,lt=Tt;else break t}}function h(_){return _.length===0?null:_[0]}function c(_){if(_.length===0)return null;var k=_[0],lt=_.pop();if(lt!==k){_[0]=lt;t:for(var Tt=0,Et=_.length,p=Et>>>1;Tt<p;){var O=2*(Tt+1)-1,G=_[O],Z=O+1,ut=_[Z];if(0>s(G,lt))Z<Et&&0>s(ut,G)?(_[Tt]=ut,_[Z]=lt,Tt=Z):(_[Tt]=G,_[O]=lt,Tt=O);else if(Z<Et&&0>s(ut,lt))_[Tt]=ut,_[Z]=lt,Tt=Z;else break t}}return k}function s(_,k){var lt=_.sortIndex-k.sortIndex;return lt!==0?lt:_.id-k.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;r.unstable_now=function(){return d.now()}}else{var b=Date,w=b.now();r.unstable_now=function(){return b.now()-w}}var g=[],v=[],z=1,N=null,B=3,U=!1,Y=!1,P=!1,pt=!1,F=typeof setTimeout=="function"?setTimeout:null,j=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;function X(_){for(var k=h(v);k!==null;){if(k.callback===null)c(v);else if(k.startTime<=_)c(v),k.sortIndex=k.expirationTime,f(g,k);else break;k=h(v)}}function W(_){if(P=!1,X(_),!Y)if(h(g)!==null)Y=!0,q||(q=!0,J());else{var k=h(v);k!==null&&qt(W,k.startTime-_)}}var q=!1,H=-1,K=5,Q=-1;function nt(){return pt?!0:!(r.unstable_now()-Q<K)}function $(){if(pt=!1,q){var _=r.unstable_now();Q=_;var k=!0;try{t:{Y=!1,P&&(P=!1,j(H),H=-1),U=!0;var lt=B;try{e:{for(X(_),N=h(g);N!==null&&!(N.expirationTime>_&&nt());){var Tt=N.callback;if(typeof Tt=="function"){N.callback=null,B=N.priorityLevel;var Et=Tt(N.expirationTime<=_);if(_=r.unstable_now(),typeof Et=="function"){N.callback=Et,X(_),k=!0;break e}N===h(g)&&c(g),X(_)}else c(g);N=h(g)}if(N!==null)k=!0;else{var p=h(v);p!==null&&qt(W,p.startTime-_),k=!1}}break t}finally{N=null,B=lt,U=!1}k=void 0}}finally{k?J():q=!1}}}var J;if(typeof L=="function")J=function(){L($)};else if(typeof MessageChannel<"u"){var tt=new MessageChannel,it=tt.port2;tt.port1.onmessage=$,J=function(){it.postMessage(null)}}else J=function(){F($,0)};function qt(_,k){H=F(function(){_(r.unstable_now())},k)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(_){_.callback=null},r.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):K=0<_?Math.floor(1e3/_):5},r.unstable_getCurrentPriorityLevel=function(){return B},r.unstable_next=function(_){switch(B){case 1:case 2:case 3:var k=3;break;default:k=B}var lt=B;B=k;try{return _()}finally{B=lt}},r.unstable_requestPaint=function(){pt=!0},r.unstable_runWithPriority=function(_,k){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var lt=B;B=_;try{return k()}finally{B=lt}},r.unstable_scheduleCallback=function(_,k,lt){var Tt=r.unstable_now();switch(typeof lt=="object"&&lt!==null?(lt=lt.delay,lt=typeof lt=="number"&&0<lt?Tt+lt:Tt):lt=Tt,_){case 1:var Et=-1;break;case 2:Et=250;break;case 5:Et=1073741823;break;case 4:Et=1e4;break;default:Et=5e3}return Et=lt+Et,_={id:z++,callback:k,priorityLevel:_,startTime:lt,expirationTime:Et,sortIndex:-1},lt>Tt?(_.sortIndex=lt,f(v,_),h(g)===null&&_===h(v)&&(P?(j(H),H=-1):P=!0,qt(W,lt-Tt))):(_.sortIndex=Et,f(g,_),Y||U||(Y=!0,q||(q=!0,J()))),_},r.unstable_shouldYield=nt,r.unstable_wrapCallback=function(_){var k=B;return function(){var lt=B;B=k;try{return _.apply(this,arguments)}finally{B=lt}}}})(xo)),xo}var oh;function Og(){return oh||(oh=1,Ao.exports=Dg()),Ao.exports}var Co={exports:{}},$t={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rh;function Bg(){if(rh)return $t;rh=1;var r=$o();function f(g){var v="https://react.dev/errors/"+g;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var z=2;z<arguments.length;z++)v+="&args[]="+encodeURIComponent(arguments[z])}return"Minified React error #"+g+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(){}var c={d:{f:h,r:function(){throw Error(f(522))},D:h,C:h,L:h,m:h,X:h,S:h,M:h},p:0,findDOMNode:null},s=Symbol.for("react.portal");function d(g,v,z){var N=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:s,key:N==null?null:""+N,children:g,containerInfo:v,implementation:z}}var b=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function w(g,v){if(g==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return $t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,$t.createPortal=function(g,v){var z=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(f(299));return d(g,v,null,z)},$t.flushSync=function(g){var v=b.T,z=c.p;try{if(b.T=null,c.p=2,g)return g()}finally{b.T=v,c.p=z,c.d.f()}},$t.preconnect=function(g,v){typeof g=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,c.d.C(g,v))},$t.prefetchDNS=function(g){typeof g=="string"&&c.d.D(g)},$t.preinit=function(g,v){if(typeof g=="string"&&v&&typeof v.as=="string"){var z=v.as,N=w(z,v.crossOrigin),B=typeof v.integrity=="string"?v.integrity:void 0,U=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;z==="style"?c.d.S(g,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:N,integrity:B,fetchPriority:U}):z==="script"&&c.d.X(g,{crossOrigin:N,integrity:B,fetchPriority:U,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},$t.preinitModule=function(g,v){if(typeof g=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var z=w(v.as,v.crossOrigin);c.d.M(g,{crossOrigin:z,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&c.d.M(g)},$t.preload=function(g,v){if(typeof g=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var z=v.as,N=w(z,v.crossOrigin);c.d.L(g,z,{crossOrigin:N,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},$t.preloadModule=function(g,v){if(typeof g=="string")if(v){var z=w(v.as,v.crossOrigin);c.d.m(g,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:z,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else c.d.m(g)},$t.requestFormReset=function(g){c.d.r(g)},$t.unstable_batchedUpdates=function(g,v){return g(v)},$t.useFormState=function(g,v,z){return b.H.useFormState(g,v,z)},$t.useFormStatus=function(){return b.H.useHostTransitionStatus()},$t.version="19.2.6",$t}var sh;function Ug(){if(sh)return Co.exports;sh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),Co.exports=Bg(),Co.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fh;function Hg(){if(fh)return Ra;fh=1;var r=Og(),f=$o(),h=Ug();function c(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function d(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function b(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function w(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function g(t){if(d(t)!==t)throw Error(c(188))}function v(t){var e=t.alternate;if(!e){if(e=d(t),e===null)throw Error(c(188));return e!==t?null:t}for(var n=t,l=e;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(l=a.return,l!==null){n=l;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return g(a),t;if(i===l)return g(a),e;i=i.sibling}throw Error(c(188))}if(n.return!==l.return)n=a,l=i;else{for(var u=!1,o=a.child;o;){if(o===n){u=!0,n=a,l=i;break}if(o===l){u=!0,l=a,n=i;break}o=o.sibling}if(!u){for(o=i.child;o;){if(o===n){u=!0,n=i,l=a;break}if(o===l){u=!0,l=i,n=a;break}o=o.sibling}if(!u)throw Error(c(189))}}if(n.alternate!==l)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?t:e}function z(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=z(t),e!==null)return e;t=t.sibling}return null}var N=Object.assign,B=Symbol.for("react.element"),U=Symbol.for("react.transitional.element"),Y=Symbol.for("react.portal"),P=Symbol.for("react.fragment"),pt=Symbol.for("react.strict_mode"),F=Symbol.for("react.profiler"),j=Symbol.for("react.consumer"),L=Symbol.for("react.context"),X=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),q=Symbol.for("react.suspense_list"),H=Symbol.for("react.memo"),K=Symbol.for("react.lazy"),Q=Symbol.for("react.activity"),nt=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function J(t){return t===null||typeof t!="object"?null:(t=$&&t[$]||t["@@iterator"],typeof t=="function"?t:null)}var tt=Symbol.for("react.client.reference");function it(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===tt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case P:return"Fragment";case F:return"Profiler";case pt:return"StrictMode";case W:return"Suspense";case q:return"SuspenseList";case Q:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Y:return"Portal";case L:return t.displayName||"Context";case j:return(t._context.displayName||"Context")+".Consumer";case X:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case H:return e=t.displayName||null,e!==null?e:it(t.type)||"Memo";case K:e=t._payload,t=t._init;try{return it(t(e))}catch{}}return null}var qt=Array.isArray,_=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,lt={pending:!1,data:null,method:null,action:null},Tt=[],Et=-1;function p(t){return{current:t}}function O(t){0>Et||(t.current=Tt[Et],Tt[Et]=null,Et--)}function G(t,e){Et++,Tt[Et]=t.current,t.current=e}var Z=p(null),ut=p(null),st=p(null),ft=p(null);function zt(t,e){switch(G(st,e),G(ut,t),G(Z,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Cd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Cd(e),t=Nd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}O(Z),G(Z,t)}function Ct(){O(Z),O(ut),O(st)}function He(t){t.memoizedState!==null&&G(ft,t);var e=Z.current,n=Nd(e,t.type);e!==n&&(G(ut,t),G(Z,n))}function Da(t){ut.current===t&&(O(Z),O(ut)),ft.current===t&&(O(ft),Aa._currentValue=lt)}var nu,er;function Rn(t){if(nu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);nu=e&&e[1]||"",er=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+nu+t+er}var lu=!1;function au(t,e){if(!t||lu)return"";lu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var D=function(){throw Error()};if(Object.defineProperty(D.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(D,[])}catch(C){var x=C}Reflect.construct(t,[],D)}else{try{D.call()}catch(C){x=C}t.call(D.prototype)}}else{try{throw Error()}catch(C){x=C}(D=t())&&typeof D.catch=="function"&&D.catch(function(){})}}catch(C){if(C&&x&&typeof C.stack=="string")return[C.stack,x.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),u=i[0],o=i[1];if(u&&o){var m=u.split(`
`),A=o.split(`
`);for(a=l=0;l<m.length&&!m[l].includes("DetermineComponentFrameRoot");)l++;for(;a<A.length&&!A[a].includes("DetermineComponentFrameRoot");)a++;if(l===m.length||a===A.length)for(l=m.length-1,a=A.length-1;1<=l&&0<=a&&m[l]!==A[a];)a--;for(;1<=l&&0<=a;l--,a--)if(m[l]!==A[a]){if(l!==1||a!==1)do if(l--,a--,0>a||m[l]!==A[a]){var R=`
`+m[l].replace(" at new "," at ");return t.displayName&&R.includes("<anonymous>")&&(R=R.replace("<anonymous>",t.displayName)),R}while(1<=l&&0<=a);break}}}finally{lu=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Rn(n):""}function i0(t,e){switch(t.tag){case 26:case 27:case 5:return Rn(t.type);case 16:return Rn("Lazy");case 13:return t.child!==e&&e!==null?Rn("Suspense Fallback"):Rn("Suspense");case 19:return Rn("SuspenseList");case 0:case 15:return au(t.type,!1);case 11:return au(t.type.render,!1);case 1:return au(t.type,!0);case 31:return Rn("Activity");default:return""}}function nr(t){try{var e="",n=null;do e+=i0(t,n),n=t,t=t.return;while(t);return e}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var iu=Object.prototype.hasOwnProperty,uu=r.unstable_scheduleCallback,cu=r.unstable_cancelCallback,u0=r.unstable_shouldYield,c0=r.unstable_requestPaint,ce=r.unstable_now,o0=r.unstable_getCurrentPriorityLevel,lr=r.unstable_ImmediatePriority,ar=r.unstable_UserBlockingPriority,Oa=r.unstable_NormalPriority,r0=r.unstable_LowPriority,ir=r.unstable_IdlePriority,s0=r.log,f0=r.unstable_setDisableYieldValue,Hl=null,oe=null;function nn(t){if(typeof s0=="function"&&f0(t),oe&&typeof oe.setStrictMode=="function")try{oe.setStrictMode(Hl,t)}catch{}}var re=Math.clz32?Math.clz32:m0,d0=Math.log,h0=Math.LN2;function m0(t){return t>>>=0,t===0?32:31-(d0(t)/h0|0)|0}var Ba=256,Ua=262144,Ha=4194304;function Mn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ja(t,e,n){var l=t.pendingLanes;if(l===0)return 0;var a=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var o=l&134217727;return o!==0?(l=o&~i,l!==0?a=Mn(l):(u&=o,u!==0?a=Mn(u):n||(n=o&~t,n!==0&&(a=Mn(n))))):(o=l&~i,o!==0?a=Mn(o):u!==0?a=Mn(u):n||(n=l&~t,n!==0&&(a=Mn(n)))),a===0?0:e!==0&&e!==a&&(e&i)===0&&(i=a&-a,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:a}function jl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function g0(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ur(){var t=Ha;return Ha<<=1,(Ha&62914560)===0&&(Ha=4194304),t}function ou(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ll(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function y0(t,e,n,l,a,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,m=t.expirationTimes,A=t.hiddenUpdates;for(n=u&~n;0<n;){var R=31-re(n),D=1<<R;o[R]=0,m[R]=-1;var x=A[R];if(x!==null)for(A[R]=null,R=0;R<x.length;R++){var C=x[R];C!==null&&(C.lane&=-536870913)}n&=~D}l!==0&&cr(t,l,0),i!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function cr(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-re(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|n&261930}function or(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var l=31-re(n),a=1<<l;a&e|t[l]&e&&(t[l]|=e),n&=~a}}function rr(t,e){var n=e&-e;return n=(n&42)!==0?1:ru(n),(n&(t.suspendedLanes|e))!==0?0:n}function ru(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function su(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function sr(){var t=k.p;return t!==0?t:(t=window.event,t===void 0?32:Id(t.type))}function fr(t,e){var n=k.p;try{return k.p=t,e()}finally{k.p=n}}var ln=Math.random().toString(36).slice(2),Kt="__reactFiber$"+ln,te="__reactProps$"+ln,Wn="__reactContainer$"+ln,fu="__reactEvents$"+ln,p0="__reactListeners$"+ln,v0="__reactHandles$"+ln,dr="__reactResources$"+ln,ql="__reactMarker$"+ln;function du(t){delete t[Kt],delete t[te],delete t[fu],delete t[p0],delete t[v0]}function $n(t){var e=t[Kt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[Kt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Bd(t);t!==null;){if(n=t[Kt])return n;t=Bd(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[Kt]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Gl(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(c(33))}function tl(t){var e=t[dr];return e||(e=t[dr]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Vt(t){t[ql]=!0}var hr=new Set,mr={};function zn(t,e){el(t,e),el(t+"Capture",e)}function el(t,e){for(mr[t]=e,t=0;t<e.length;t++)hr.add(e[t])}var b0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),gr={},yr={};function S0(t){return iu.call(yr,t)?!0:iu.call(gr,t)?!1:b0.test(t)?yr[t]=!0:(gr[t]=!0,!1)}function La(t,e,n){if(S0(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function qa(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function je(t,e,n,l){if(l===null)t.removeAttribute(n);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+l)}}function pe(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function pr(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function E0(t,e,n){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var a=l.get,i=l.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:l.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function hu(t){if(!t._valueTracker){var e=pr(t)?"checked":"value";t._valueTracker=E0(t,e,""+t[e])}}function vr(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),l="";return t&&(l=pr(t)?t.checked?"true":"false":t.value),t=l,t!==n?(e.setValue(t),!0):!1}function Ga(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var w0=/[\n"\\]/g;function ve(t){return t.replace(w0,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function mu(t,e,n,l,a,i,u,o){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+pe(e)):t.value!==""+pe(e)&&(t.value=""+pe(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?gu(t,u,pe(e)):n!=null?gu(t,u,pe(n)):l!=null&&t.removeAttribute("value"),a==null&&i!=null&&(t.defaultChecked=!!i),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+pe(o):t.removeAttribute("name")}function br(t,e,n,l,a,i,u,o){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){hu(t);return}n=n!=null?""+pe(n):"",e=e!=null?""+pe(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}l=l??a,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=o?t.checked:!!l,t.defaultChecked=!!l,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),hu(t)}function gu(t,e,n){e==="number"&&Ga(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function nl(t,e,n,l){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&l&&(t[n].defaultSelected=!0)}else{for(n=""+pe(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,l&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function Sr(t,e,n){if(e!=null&&(e=""+pe(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+pe(n):""}function Er(t,e,n,l){if(e==null){if(l!=null){if(n!=null)throw Error(c(92));if(qt(l)){if(1<l.length)throw Error(c(93));l=l[0]}n=l}n==null&&(n=""),e=n}n=pe(e),t.defaultValue=n,l=t.textContent,l===n&&l!==""&&l!==null&&(t.value=l),hu(t)}function ll(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var T0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function wr(t,e,n){var l=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,n):typeof n!="number"||n===0||T0.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Tr(t,e,n){if(e!=null&&typeof e!="object")throw Error(c(62));if(t=t.style,n!=null){for(var l in n)!n.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var a in e)l=e[a],e.hasOwnProperty(a)&&n[a]!==l&&wr(t,a,l)}else for(var i in e)e.hasOwnProperty(i)&&wr(t,i,e[i])}function yu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var A0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),x0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ka(t){return x0.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Le(){}var pu=null;function vu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var al=null,il=null;function Ar(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[te]||null;t:switch(t=e.stateNode,e.type){case"input":if(mu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+ve(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var l=n[e];if(l!==t&&l.form===t.form){var a=l[te]||null;if(!a)throw Error(c(90));mu(l,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)l=n[e],l.form===t.form&&vr(l)}break t;case"textarea":Sr(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&nl(t,!!n.multiple,e,!1)}}}var bu=!1;function xr(t,e,n){if(bu)return t(e,n);bu=!0;try{var l=t(e);return l}finally{if(bu=!1,(al!==null||il!==null)&&(_i(),al&&(e=al,t=il,il=al=null,Ar(e),t)))for(e=0;e<t.length;e++)Ar(t[e])}}function kl(t,e){var n=t.stateNode;if(n===null)return null;var l=n[te]||null;if(l===null)return null;n=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(c(231,e,typeof n));return n}var qe=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Su=!1;if(qe)try{var Yl={};Object.defineProperty(Yl,"passive",{get:function(){Su=!0}}),window.addEventListener("test",Yl,Yl),window.removeEventListener("test",Yl,Yl)}catch{Su=!1}var an=null,Eu=null,Ya=null;function Cr(){if(Ya)return Ya;var t,e=Eu,n=e.length,l,a="value"in an?an.value:an.textContent,i=a.length;for(t=0;t<n&&e[t]===a[t];t++);var u=n-t;for(l=1;l<=u&&e[n-l]===a[i-l];l++);return Ya=a.slice(t,1<l?1-l:void 0)}function Qa(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Xa(){return!0}function Nr(){return!1}function ee(t){function e(n,l,a,i,u){this._reactName=n,this._targetInst=a,this.type=l,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Xa:Nr,this.isPropagationStopped=Nr,this}return N(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Xa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Xa)},persist:function(){},isPersistent:Xa}),e}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Va=ee(Dn),Ql=N({},Dn,{view:0,detail:0}),C0=ee(Ql),wu,Tu,Xl,Za=N({},Ql,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Xl&&(Xl&&t.type==="mousemove"?(wu=t.screenX-Xl.screenX,Tu=t.screenY-Xl.screenY):Tu=wu=0,Xl=t),wu)},movementY:function(t){return"movementY"in t?t.movementY:Tu}}),_r=ee(Za),N0=N({},Za,{dataTransfer:0}),_0=ee(N0),R0=N({},Ql,{relatedTarget:0}),Au=ee(R0),M0=N({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),z0=ee(M0),D0=N({},Dn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),O0=ee(D0),B0=N({},Dn,{data:0}),Rr=ee(B0),U0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},H0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},j0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function L0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=j0[t])?!!e[t]:!1}function xu(){return L0}var q0=N({},Ql,{key:function(t){if(t.key){var e=U0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Qa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?H0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xu,charCode:function(t){return t.type==="keypress"?Qa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Qa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),G0=ee(q0),k0=N({},Za,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mr=ee(k0),Y0=N({},Ql,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xu}),Q0=ee(Y0),X0=N({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),V0=ee(X0),Z0=N({},Za,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),K0=ee(Z0),J0=N({},Dn,{newState:0,oldState:0}),F0=ee(J0),I0=[9,13,27,32],Cu=qe&&"CompositionEvent"in window,Vl=null;qe&&"documentMode"in document&&(Vl=document.documentMode);var W0=qe&&"TextEvent"in window&&!Vl,zr=qe&&(!Cu||Vl&&8<Vl&&11>=Vl),Dr=" ",Or=!1;function Br(t,e){switch(t){case"keyup":return I0.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ur(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ul=!1;function $0(t,e){switch(t){case"compositionend":return Ur(e);case"keypress":return e.which!==32?null:(Or=!0,Dr);case"textInput":return t=e.data,t===Dr&&Or?null:t;default:return null}}function P0(t,e){if(ul)return t==="compositionend"||!Cu&&Br(t,e)?(t=Cr(),Ya=Eu=an=null,ul=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return zr&&e.locale!=="ko"?null:e.data;default:return null}}var tm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hr(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!tm[t.type]:e==="textarea"}function jr(t,e,n,l){al?il?il.push(l):il=[l]:al=l,e=Ui(e,"onChange"),0<e.length&&(n=new Va("onChange","change",null,n,l),t.push({event:n,listeners:e}))}var Zl=null,Kl=null;function em(t){Sd(t,0)}function Ka(t){var e=Gl(t);if(vr(e))return t}function Lr(t,e){if(t==="change")return e}var qr=!1;if(qe){var Nu;if(qe){var _u="oninput"in document;if(!_u){var Gr=document.createElement("div");Gr.setAttribute("oninput","return;"),_u=typeof Gr.oninput=="function"}Nu=_u}else Nu=!1;qr=Nu&&(!document.documentMode||9<document.documentMode)}function kr(){Zl&&(Zl.detachEvent("onpropertychange",Yr),Kl=Zl=null)}function Yr(t){if(t.propertyName==="value"&&Ka(Kl)){var e=[];jr(e,Kl,t,vu(t)),xr(em,e)}}function nm(t,e,n){t==="focusin"?(kr(),Zl=e,Kl=n,Zl.attachEvent("onpropertychange",Yr)):t==="focusout"&&kr()}function lm(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ka(Kl)}function am(t,e){if(t==="click")return Ka(e)}function im(t,e){if(t==="input"||t==="change")return Ka(e)}function um(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var se=typeof Object.is=="function"?Object.is:um;function Jl(t,e){if(se(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),l=Object.keys(e);if(n.length!==l.length)return!1;for(l=0;l<n.length;l++){var a=n[l];if(!iu.call(e,a)||!se(t[a],e[a]))return!1}return!0}function Qr(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Xr(t,e){var n=Qr(t);t=0;for(var l;n;){if(n.nodeType===3){if(l=t+n.textContent.length,t<=e&&l>=e)return{node:n,offset:e-t};t=l}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Qr(n)}}function Vr(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Vr(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Zr(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Ga(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ga(t.document)}return e}function Ru(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var cm=qe&&"documentMode"in document&&11>=document.documentMode,cl=null,Mu=null,Fl=null,zu=!1;function Kr(t,e,n){var l=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;zu||cl==null||cl!==Ga(l)||(l=cl,"selectionStart"in l&&Ru(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Fl&&Jl(Fl,l)||(Fl=l,l=Ui(Mu,"onSelect"),0<l.length&&(e=new Va("onSelect","select",null,e,n),t.push({event:e,listeners:l}),e.target=cl)))}function On(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ol={animationend:On("Animation","AnimationEnd"),animationiteration:On("Animation","AnimationIteration"),animationstart:On("Animation","AnimationStart"),transitionrun:On("Transition","TransitionRun"),transitionstart:On("Transition","TransitionStart"),transitioncancel:On("Transition","TransitionCancel"),transitionend:On("Transition","TransitionEnd")},Du={},Jr={};qe&&(Jr=document.createElement("div").style,"AnimationEvent"in window||(delete ol.animationend.animation,delete ol.animationiteration.animation,delete ol.animationstart.animation),"TransitionEvent"in window||delete ol.transitionend.transition);function Bn(t){if(Du[t])return Du[t];if(!ol[t])return t;var e=ol[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Jr)return Du[t]=e[n];return t}var Fr=Bn("animationend"),Ir=Bn("animationiteration"),Wr=Bn("animationstart"),om=Bn("transitionrun"),rm=Bn("transitionstart"),sm=Bn("transitioncancel"),$r=Bn("transitionend"),Pr=new Map,Ou="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ou.push("scrollEnd");function Ne(t,e){Pr.set(t,e),zn(e,[t])}var Ja=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},be=[],rl=0,Bu=0;function Fa(){for(var t=rl,e=Bu=rl=0;e<t;){var n=be[e];be[e++]=null;var l=be[e];be[e++]=null;var a=be[e];be[e++]=null;var i=be[e];if(be[e++]=null,l!==null&&a!==null){var u=l.pending;u===null?a.next=a:(a.next=u.next,u.next=a),l.pending=a}i!==0&&ts(n,a,i)}}function Ia(t,e,n,l){be[rl++]=t,be[rl++]=e,be[rl++]=n,be[rl++]=l,Bu|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function Uu(t,e,n,l){return Ia(t,e,n,l),Wa(t)}function Un(t,e){return Ia(t,null,null,e),Wa(t)}function ts(t,e,n){t.lanes|=n;var l=t.alternate;l!==null&&(l.lanes|=n);for(var a=!1,i=t.return;i!==null;)i.childLanes|=n,l=i.alternate,l!==null&&(l.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(a=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,a&&e!==null&&(a=31-re(n),t=i.hiddenUpdates,l=t[a],l===null?t[a]=[e]:l.push(e),e.lane=n|536870912),i):null}function Wa(t){if(50<pa)throw pa=0,Xc=null,Error(c(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var sl={};function fm(t,e,n,l){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function fe(t,e,n,l){return new fm(t,e,n,l)}function Hu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ge(t,e){var n=t.alternate;return n===null?(n=fe(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function es(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function $a(t,e,n,l,a,i){var u=0;if(l=t,typeof t=="function")Hu(t)&&(u=1);else if(typeof t=="string")u=yg(t,n,Z.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case Q:return t=fe(31,n,e,a),t.elementType=Q,t.lanes=i,t;case P:return Hn(n.children,a,i,e);case pt:u=8,a|=24;break;case F:return t=fe(12,n,e,a|2),t.elementType=F,t.lanes=i,t;case W:return t=fe(13,n,e,a),t.elementType=W,t.lanes=i,t;case q:return t=fe(19,n,e,a),t.elementType=q,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case L:u=10;break t;case j:u=9;break t;case X:u=11;break t;case H:u=14;break t;case K:u=16,l=null;break t}u=29,n=Error(c(130,t===null?"null":typeof t,"")),l=null}return e=fe(u,n,e,a),e.elementType=t,e.type=l,e.lanes=i,e}function Hn(t,e,n,l){return t=fe(7,t,l,e),t.lanes=n,t}function ju(t,e,n){return t=fe(6,t,null,e),t.lanes=n,t}function ns(t){var e=fe(18,null,null,0);return e.stateNode=t,e}function Lu(t,e,n){return e=fe(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var ls=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=ls.get(t);return n!==void 0?n:(e={value:t,source:e,stack:nr(e)},ls.set(t,e),e)}return{value:t,source:e,stack:nr(e)}}var fl=[],dl=0,Pa=null,Il=0,Ee=[],we=0,un=null,Me=1,ze="";function ke(t,e){fl[dl++]=Il,fl[dl++]=Pa,Pa=t,Il=e}function as(t,e,n){Ee[we++]=Me,Ee[we++]=ze,Ee[we++]=un,un=t;var l=Me;t=ze;var a=32-re(l)-1;l&=~(1<<a),n+=1;var i=32-re(e)+a;if(30<i){var u=a-a%5;i=(l&(1<<u)-1).toString(32),l>>=u,a-=u,Me=1<<32-re(e)+a|n<<a|l,ze=i+t}else Me=1<<i|n<<a|l,ze=t}function qu(t){t.return!==null&&(ke(t,1),as(t,1,0))}function Gu(t){for(;t===Pa;)Pa=fl[--dl],fl[dl]=null,Il=fl[--dl],fl[dl]=null;for(;t===un;)un=Ee[--we],Ee[we]=null,ze=Ee[--we],Ee[we]=null,Me=Ee[--we],Ee[we]=null}function is(t,e){Ee[we++]=Me,Ee[we++]=ze,Ee[we++]=un,Me=e.id,ze=e.overflow,un=t}var Jt=null,Dt=null,yt=!1,cn=null,Te=!1,ku=Error(c(519));function on(t){var e=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Wl(Se(e,t)),ku}function us(t){var e=t.stateNode,n=t.type,l=t.memoizedProps;switch(e[Kt]=t,e[te]=l,n){case"dialog":ht("cancel",e),ht("close",e);break;case"iframe":case"object":case"embed":ht("load",e);break;case"video":case"audio":for(n=0;n<ba.length;n++)ht(ba[n],e);break;case"source":ht("error",e);break;case"img":case"image":case"link":ht("error",e),ht("load",e);break;case"details":ht("toggle",e);break;case"input":ht("invalid",e),br(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":ht("invalid",e);break;case"textarea":ht("invalid",e),Er(e,l.value,l.defaultValue,l.children)}n=l.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||l.suppressHydrationWarning===!0||Ad(e.textContent,n)?(l.popover!=null&&(ht("beforetoggle",e),ht("toggle",e)),l.onScroll!=null&&ht("scroll",e),l.onScrollEnd!=null&&ht("scrollend",e),l.onClick!=null&&(e.onclick=Le),e=!0):e=!1,e||on(t,!0)}function cs(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:Te=!1;return;case 27:case 3:Te=!0;return;default:Jt=Jt.return}}function hl(t){if(t!==Jt)return!1;if(!yt)return cs(t),yt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||io(t.type,t.memoizedProps)),n=!n),n&&Dt&&on(t),cs(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Od(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Od(t)}else e===27?(e=Dt,wn(t.type)?(t=so,so=null,Dt=t):Dt=e):Dt=Jt?xe(t.stateNode.nextSibling):null;return!0}function jn(){Dt=Jt=null,yt=!1}function Yu(){var t=cn;return t!==null&&(ie===null?ie=t:ie.push.apply(ie,t),cn=null),t}function Wl(t){cn===null?cn=[t]:cn.push(t)}var Qu=p(null),Ln=null,Ye=null;function rn(t,e,n){G(Qu,e._currentValue),e._currentValue=n}function Qe(t){t._currentValue=Qu.current,O(Qu)}function Xu(t,e,n){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===n)break;t=t.return}}function Vu(t,e,n,l){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var i=a.dependencies;if(i!==null){var u=a.child;i=i.firstContext;t:for(;i!==null;){var o=i;i=a;for(var m=0;m<e.length;m++)if(o.context===e[m]){i.lanes|=n,o=i.alternate,o!==null&&(o.lanes|=n),Xu(i.return,n,t),l||(u=null);break t}i=o.next}}else if(a.tag===18){if(u=a.return,u===null)throw Error(c(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Xu(u,n,t),u=null}else u=a.child;if(u!==null)u.return=a;else for(u=a;u!==null;){if(u===t){u=null;break}if(a=u.sibling,a!==null){a.return=u.return,u=a;break}u=u.return}a=u}}function ml(t,e,n,l){t=null;for(var a=e,i=!1;a!==null;){if(!i){if((a.flags&524288)!==0)i=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var u=a.alternate;if(u===null)throw Error(c(387));if(u=u.memoizedProps,u!==null){var o=a.type;se(a.pendingProps.value,u.value)||(t!==null?t.push(o):t=[o])}}else if(a===ft.current){if(u=a.alternate,u===null)throw Error(c(387));u.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Aa):t=[Aa])}a=a.return}t!==null&&Vu(e,t,n,l),e.flags|=262144}function ti(t){for(t=t.firstContext;t!==null;){if(!se(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function qn(t){Ln=t,Ye=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ft(t){return os(Ln,t)}function ei(t,e){return Ln===null&&qn(t),os(t,e)}function os(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ye===null){if(t===null)throw Error(c(308));Ye=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ye=Ye.next=e;return n}var dm=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},hm=r.unstable_scheduleCallback,mm=r.unstable_NormalPriority,Gt={$$typeof:L,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zu(){return{controller:new dm,data:new Map,refCount:0}}function $l(t){t.refCount--,t.refCount===0&&hm(mm,function(){t.controller.abort()})}var Pl=null,Ku=0,gl=0,yl=null;function gm(t,e){if(Pl===null){var n=Pl=[];Ku=0,gl=Ic(),yl={status:"pending",value:void 0,then:function(l){n.push(l)}}}return Ku++,e.then(rs,rs),e}function rs(){if(--Ku===0&&Pl!==null){yl!==null&&(yl.status="fulfilled");var t=Pl;Pl=null,gl=0,yl=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function ym(t,e){var n=[],l={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(l.status="rejected",l.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),l}var ss=_.S;_.S=function(t,e){Jf=ce(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&gm(t,e),ss!==null&&ss(t,e)};var Gn=p(null);function Ju(){var t=Gn.current;return t!==null?t:Mt.pooledCache}function ni(t,e){e===null?G(Gn,Gn.current):G(Gn,e.pool)}function fs(){var t=Ju();return t===null?null:{parent:Gt._currentValue,pool:t}}var pl=Error(c(460)),Fu=Error(c(474)),li=Error(c(542)),ai={then:function(){}};function ds(t){return t=t.status,t==="fulfilled"||t==="rejected"}function hs(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Le,Le),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,gs(t),t;default:if(typeof e.status=="string")e.then(Le,Le);else{if(t=Mt,t!==null&&100<t.shellSuspendCounter)throw Error(c(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=l}},function(l){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,gs(t),t}throw Yn=e,pl}}function kn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Yn=n,pl):n}}var Yn=null;function ms(){if(Yn===null)throw Error(c(459));var t=Yn;return Yn=null,t}function gs(t){if(t===pl||t===li)throw Error(c(483))}var vl=null,ta=0;function ii(t){var e=ta;return ta+=1,vl===null&&(vl=[]),hs(vl,t,e)}function ea(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ui(t,e){throw e.$$typeof===B?Error(c(525)):(t=Object.prototype.toString.call(e),Error(c(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function ys(t){function e(S,y){if(t){var T=S.deletions;T===null?(S.deletions=[y],S.flags|=16):T.push(y)}}function n(S,y){if(!t)return null;for(;y!==null;)e(S,y),y=y.sibling;return null}function l(S){for(var y=new Map;S!==null;)S.key!==null?y.set(S.key,S):y.set(S.index,S),S=S.sibling;return y}function a(S,y){return S=Ge(S,y),S.index=0,S.sibling=null,S}function i(S,y,T){return S.index=T,t?(T=S.alternate,T!==null?(T=T.index,T<y?(S.flags|=67108866,y):T):(S.flags|=67108866,y)):(S.flags|=1048576,y)}function u(S){return t&&S.alternate===null&&(S.flags|=67108866),S}function o(S,y,T,M){return y===null||y.tag!==6?(y=ju(T,S.mode,M),y.return=S,y):(y=a(y,T),y.return=S,y)}function m(S,y,T,M){var et=T.type;return et===P?R(S,y,T.props.children,M,T.key):y!==null&&(y.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===K&&kn(et)===y.type)?(y=a(y,T.props),ea(y,T),y.return=S,y):(y=$a(T.type,T.key,T.props,null,S.mode,M),ea(y,T),y.return=S,y)}function A(S,y,T,M){return y===null||y.tag!==4||y.stateNode.containerInfo!==T.containerInfo||y.stateNode.implementation!==T.implementation?(y=Lu(T,S.mode,M),y.return=S,y):(y=a(y,T.children||[]),y.return=S,y)}function R(S,y,T,M,et){return y===null||y.tag!==7?(y=Hn(T,S.mode,M,et),y.return=S,y):(y=a(y,T),y.return=S,y)}function D(S,y,T){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return y=ju(""+y,S.mode,T),y.return=S,y;if(typeof y=="object"&&y!==null){switch(y.$$typeof){case U:return T=$a(y.type,y.key,y.props,null,S.mode,T),ea(T,y),T.return=S,T;case Y:return y=Lu(y,S.mode,T),y.return=S,y;case K:return y=kn(y),D(S,y,T)}if(qt(y)||J(y))return y=Hn(y,S.mode,T,null),y.return=S,y;if(typeof y.then=="function")return D(S,ii(y),T);if(y.$$typeof===L)return D(S,ei(S,y),T);ui(S,y)}return null}function x(S,y,T,M){var et=y!==null?y.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return et!==null?null:o(S,y,""+T,M);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case U:return T.key===et?m(S,y,T,M):null;case Y:return T.key===et?A(S,y,T,M):null;case K:return T=kn(T),x(S,y,T,M)}if(qt(T)||J(T))return et!==null?null:R(S,y,T,M,null);if(typeof T.then=="function")return x(S,y,ii(T),M);if(T.$$typeof===L)return x(S,y,ei(S,T),M);ui(S,T)}return null}function C(S,y,T,M,et){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return S=S.get(T)||null,o(y,S,""+M,et);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case U:return S=S.get(M.key===null?T:M.key)||null,m(y,S,M,et);case Y:return S=S.get(M.key===null?T:M.key)||null,A(y,S,M,et);case K:return M=kn(M),C(S,y,T,M,et)}if(qt(M)||J(M))return S=S.get(T)||null,R(y,S,M,et,null);if(typeof M.then=="function")return C(S,y,T,ii(M),et);if(M.$$typeof===L)return C(S,y,T,ei(y,M),et);ui(y,M)}return null}function V(S,y,T,M){for(var et=null,vt=null,I=y,rt=y=0,gt=null;I!==null&&rt<T.length;rt++){I.index>rt?(gt=I,I=null):gt=I.sibling;var bt=x(S,I,T[rt],M);if(bt===null){I===null&&(I=gt);break}t&&I&&bt.alternate===null&&e(S,I),y=i(bt,y,rt),vt===null?et=bt:vt.sibling=bt,vt=bt,I=gt}if(rt===T.length)return n(S,I),yt&&ke(S,rt),et;if(I===null){for(;rt<T.length;rt++)I=D(S,T[rt],M),I!==null&&(y=i(I,y,rt),vt===null?et=I:vt.sibling=I,vt=I);return yt&&ke(S,rt),et}for(I=l(I);rt<T.length;rt++)gt=C(I,S,rt,T[rt],M),gt!==null&&(t&&gt.alternate!==null&&I.delete(gt.key===null?rt:gt.key),y=i(gt,y,rt),vt===null?et=gt:vt.sibling=gt,vt=gt);return t&&I.forEach(function(Nn){return e(S,Nn)}),yt&&ke(S,rt),et}function at(S,y,T,M){if(T==null)throw Error(c(151));for(var et=null,vt=null,I=y,rt=y=0,gt=null,bt=T.next();I!==null&&!bt.done;rt++,bt=T.next()){I.index>rt?(gt=I,I=null):gt=I.sibling;var Nn=x(S,I,bt.value,M);if(Nn===null){I===null&&(I=gt);break}t&&I&&Nn.alternate===null&&e(S,I),y=i(Nn,y,rt),vt===null?et=Nn:vt.sibling=Nn,vt=Nn,I=gt}if(bt.done)return n(S,I),yt&&ke(S,rt),et;if(I===null){for(;!bt.done;rt++,bt=T.next())bt=D(S,bt.value,M),bt!==null&&(y=i(bt,y,rt),vt===null?et=bt:vt.sibling=bt,vt=bt);return yt&&ke(S,rt),et}for(I=l(I);!bt.done;rt++,bt=T.next())bt=C(I,S,rt,bt.value,M),bt!==null&&(t&&bt.alternate!==null&&I.delete(bt.key===null?rt:bt.key),y=i(bt,y,rt),vt===null?et=bt:vt.sibling=bt,vt=bt);return t&&I.forEach(function(Ng){return e(S,Ng)}),yt&&ke(S,rt),et}function Rt(S,y,T,M){if(typeof T=="object"&&T!==null&&T.type===P&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case U:t:{for(var et=T.key;y!==null;){if(y.key===et){if(et=T.type,et===P){if(y.tag===7){n(S,y.sibling),M=a(y,T.props.children),M.return=S,S=M;break t}}else if(y.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===K&&kn(et)===y.type){n(S,y.sibling),M=a(y,T.props),ea(M,T),M.return=S,S=M;break t}n(S,y);break}else e(S,y);y=y.sibling}T.type===P?(M=Hn(T.props.children,S.mode,M,T.key),M.return=S,S=M):(M=$a(T.type,T.key,T.props,null,S.mode,M),ea(M,T),M.return=S,S=M)}return u(S);case Y:t:{for(et=T.key;y!==null;){if(y.key===et)if(y.tag===4&&y.stateNode.containerInfo===T.containerInfo&&y.stateNode.implementation===T.implementation){n(S,y.sibling),M=a(y,T.children||[]),M.return=S,S=M;break t}else{n(S,y);break}else e(S,y);y=y.sibling}M=Lu(T,S.mode,M),M.return=S,S=M}return u(S);case K:return T=kn(T),Rt(S,y,T,M)}if(qt(T))return V(S,y,T,M);if(J(T)){if(et=J(T),typeof et!="function")throw Error(c(150));return T=et.call(T),at(S,y,T,M)}if(typeof T.then=="function")return Rt(S,y,ii(T),M);if(T.$$typeof===L)return Rt(S,y,ei(S,T),M);ui(S,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,y!==null&&y.tag===6?(n(S,y.sibling),M=a(y,T),M.return=S,S=M):(n(S,y),M=ju(T,S.mode,M),M.return=S,S=M),u(S)):n(S,y)}return function(S,y,T,M){try{ta=0;var et=Rt(S,y,T,M);return vl=null,et}catch(I){if(I===pl||I===li)throw I;var vt=fe(29,I,null,S.mode);return vt.lanes=M,vt.return=S,vt}finally{}}}var Qn=ys(!0),ps=ys(!1),sn=!1;function Iu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Wu(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(wt&2)!==0){var a=l.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),l.pending=e,e=Wa(t),ts(t,null,n),e}return Ia(t,l,e,n),Wa(t)}function na(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,or(t,n)}}function $u(t,e){var n=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,n===l)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?a=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?a=i=e:i=i.next=e}else a=i=e;n={baseState:l.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Pu=!1;function la(){if(Pu){var t=yl;if(t!==null)throw t}}function aa(t,e,n,l){Pu=!1;var a=t.updateQueue;sn=!1;var i=a.firstBaseUpdate,u=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var m=o,A=m.next;m.next=null,u===null?i=A:u.next=A,u=m;var R=t.alternate;R!==null&&(R=R.updateQueue,o=R.lastBaseUpdate,o!==u&&(o===null?R.firstBaseUpdate=A:o.next=A,R.lastBaseUpdate=m))}if(i!==null){var D=a.baseState;u=0,R=A=m=null,o=i;do{var x=o.lane&-536870913,C=x!==o.lane;if(C?(mt&x)===x:(l&x)===x){x!==0&&x===gl&&(Pu=!0),R!==null&&(R=R.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var V=t,at=o;x=e;var Rt=n;switch(at.tag){case 1:if(V=at.payload,typeof V=="function"){D=V.call(Rt,D,x);break t}D=V;break t;case 3:V.flags=V.flags&-65537|128;case 0:if(V=at.payload,x=typeof V=="function"?V.call(Rt,D,x):V,x==null)break t;D=N({},D,x);break t;case 2:sn=!0}}x=o.callback,x!==null&&(t.flags|=64,C&&(t.flags|=8192),C=a.callbacks,C===null?a.callbacks=[x]:C.push(x))}else C={lane:x,tag:o.tag,payload:o.payload,callback:o.callback,next:null},R===null?(A=R=C,m=D):R=R.next=C,u|=x;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;C=o,o=C.next,C.next=null,a.lastBaseUpdate=C,a.shared.pending=null}}while(!0);R===null&&(m=D),a.baseState=m,a.firstBaseUpdate=A,a.lastBaseUpdate=R,i===null&&(a.shared.lanes=0),pn|=u,t.lanes=u,t.memoizedState=D}}function vs(t,e){if(typeof t!="function")throw Error(c(191,t));t.call(e)}function bs(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)vs(n[t],e)}var bl=p(null),ci=p(0);function Ss(t,e){t=$e,G(ci,t),G(bl,e),$e=t|e.baseLanes}function tc(){G(ci,$e),G(bl,bl.current)}function ec(){$e=ci.current,O(bl),O(ci)}var de=p(null),Ae=null;function hn(t){var e=t.alternate;G(jt,jt.current&1),G(de,t),Ae===null&&(e===null||bl.current!==null||e.memoizedState!==null)&&(Ae=t)}function nc(t){G(jt,jt.current),G(de,t),Ae===null&&(Ae=t)}function Es(t){t.tag===22?(G(jt,jt.current),G(de,t),Ae===null&&(Ae=t)):mn()}function mn(){G(jt,jt.current),G(de,de.current)}function he(t){O(de),Ae===t&&(Ae=null),O(jt)}var jt=p(0);function oi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||oo(n)||ro(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xe=0,ot=null,Nt=null,kt=null,ri=!1,Sl=!1,Xn=!1,si=0,ia=0,El=null,pm=0;function Ut(){throw Error(c(321))}function lc(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!se(t[n],e[n]))return!1;return!0}function ac(t,e,n,l,a,i){return Xe=i,ot=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,_.H=t===null||t.memoizedState===null?af:bc,Xn=!1,i=n(l,a),Xn=!1,Sl&&(i=Ts(e,n,l,a)),ws(t),i}function ws(t){_.H=oa;var e=Nt!==null&&Nt.next!==null;if(Xe=0,kt=Nt=ot=null,ri=!1,ia=0,El=null,e)throw Error(c(300));t===null||Yt||(t=t.dependencies,t!==null&&ti(t)&&(Yt=!0))}function Ts(t,e,n,l){ot=t;var a=0;do{if(Sl&&(El=null),ia=0,Sl=!1,25<=a)throw Error(c(301));if(a+=1,kt=Nt=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}_.H=uf,i=e(n,l)}while(Sl);return i}function vm(){var t=_.H,e=t.useState()[0];return e=typeof e.then=="function"?ua(e):e,t=t.useState()[0],(Nt!==null?Nt.memoizedState:null)!==t&&(ot.flags|=1024),e}function ic(){var t=si!==0;return si=0,t}function uc(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function cc(t){if(ri){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}ri=!1}Xe=0,kt=Nt=ot=null,Sl=!1,ia=si=0,El=null}function Pt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return kt===null?ot.memoizedState=kt=t:kt=kt.next=t,kt}function Lt(){if(Nt===null){var t=ot.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=kt===null?ot.memoizedState:kt.next;if(e!==null)kt=e,Nt=t;else{if(t===null)throw ot.alternate===null?Error(c(467)):Error(c(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},kt===null?ot.memoizedState=kt=t:kt=kt.next=t}return kt}function fi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ua(t){var e=ia;return ia+=1,El===null&&(El=[]),t=hs(El,t,e),e=ot,(kt===null?e.memoizedState:kt.next)===null&&(e=e.alternate,_.H=e===null||e.memoizedState===null?af:bc),t}function di(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ua(t);if(t.$$typeof===L)return Ft(t)}throw Error(c(438,String(t)))}function oc(t){var e=null,n=ot.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var l=ot.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=fi(),ot.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),l=0;l<t;l++)n[l]=nt;return e.index++,n}function Ve(t,e){return typeof e=="function"?e(t):e}function hi(t){var e=Lt();return rc(e,Nt,t)}function rc(t,e,n){var l=t.queue;if(l===null)throw Error(c(311));l.lastRenderedReducer=n;var a=t.baseQueue,i=l.pending;if(i!==null){if(a!==null){var u=a.next;a.next=i.next,i.next=u}e.baseQueue=a=i,l.pending=null}if(i=t.baseState,a===null)t.memoizedState=i;else{e=a.next;var o=u=null,m=null,A=e,R=!1;do{var D=A.lane&-536870913;if(D!==A.lane?(mt&D)===D:(Xe&D)===D){var x=A.revertLane;if(x===0)m!==null&&(m=m.next={lane:0,revertLane:0,gesture:null,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null}),D===gl&&(R=!0);else if((Xe&x)===x){A=A.next,x===gl&&(R=!0);continue}else D={lane:0,revertLane:A.revertLane,gesture:null,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null},m===null?(o=m=D,u=i):m=m.next=D,ot.lanes|=x,pn|=x;D=A.action,Xn&&n(i,D),i=A.hasEagerState?A.eagerState:n(i,D)}else x={lane:D,revertLane:A.revertLane,gesture:A.gesture,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null},m===null?(o=m=x,u=i):m=m.next=x,ot.lanes|=D,pn|=D;A=A.next}while(A!==null&&A!==e);if(m===null?u=i:m.next=o,!se(i,t.memoizedState)&&(Yt=!0,R&&(n=yl,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=m,l.lastRenderedState=i}return a===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function sc(t){var e=Lt(),n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=t;var l=n.dispatch,a=n.pending,i=e.memoizedState;if(a!==null){n.pending=null;var u=a=a.next;do i=t(i,u.action),u=u.next;while(u!==a);se(i,e.memoizedState)||(Yt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,l]}function As(t,e,n){var l=ot,a=Lt(),i=yt;if(i){if(n===void 0)throw Error(c(407));n=n()}else n=e();var u=!se((Nt||a).memoizedState,n);if(u&&(a.memoizedState=n,Yt=!0),a=a.queue,hc(Ns.bind(null,l,a,t),[t]),a.getSnapshot!==e||u||kt!==null&&kt.memoizedState.tag&1){if(l.flags|=2048,wl(9,{destroy:void 0},Cs.bind(null,l,a,n,e),null),Mt===null)throw Error(c(349));i||(Xe&127)!==0||xs(l,e,n)}return n}function xs(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ot.updateQueue,e===null?(e=fi(),ot.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Cs(t,e,n,l){e.value=n,e.getSnapshot=l,_s(e)&&Rs(t)}function Ns(t,e,n){return n(function(){_s(e)&&Rs(t)})}function _s(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!se(t,n)}catch{return!0}}function Rs(t){var e=Un(t,2);e!==null&&ue(e,t,2)}function fc(t){var e=Pt();if(typeof t=="function"){var n=t;if(t=n(),Xn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:t},e}function Ms(t,e,n,l){return t.baseState=n,rc(t,Nt,typeof l=="function"?l:Ve)}function bm(t,e,n,l,a){if(yi(t))throw Error(c(485));if(t=e.action,t!==null){var i={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};_.T!==null?n(!0):i.isTransition=!1,l(i),n=e.pending,n===null?(i.next=e.pending=i,zs(e,i)):(i.next=n.next,e.pending=n.next=i)}}function zs(t,e){var n=e.action,l=e.payload,a=t.state;if(e.isTransition){var i=_.T,u={};_.T=u;try{var o=n(a,l),m=_.S;m!==null&&m(u,o),Ds(t,e,o)}catch(A){dc(t,e,A)}finally{i!==null&&u.types!==null&&(i.types=u.types),_.T=i}}else try{i=n(a,l),Ds(t,e,i)}catch(A){dc(t,e,A)}}function Ds(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(l){Os(t,e,l)},function(l){return dc(t,e,l)}):Os(t,e,n)}function Os(t,e,n){e.status="fulfilled",e.value=n,Bs(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,zs(t,n)))}function dc(t,e,n){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=n,Bs(e),e=e.next;while(e!==l)}t.action=null}function Bs(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Us(t,e){return e}function Hs(t,e){if(yt){var n=Mt.formState;if(n!==null){t:{var l=ot;if(yt){if(Dt){e:{for(var a=Dt,i=Te;a.nodeType!==8;){if(!i){a=null;break e}if(a=xe(a.nextSibling),a===null){a=null;break e}}i=a.data,a=i==="F!"||i==="F"?a:null}if(a){Dt=xe(a.nextSibling),l=a.data==="F!";break t}}on(l)}l=!1}l&&(e=n[0])}}return n=Pt(),n.memoizedState=n.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Us,lastRenderedState:e},n.queue=l,n=ef.bind(null,ot,l),l.dispatch=n,l=fc(!1),i=vc.bind(null,ot,!1,l.queue),l=Pt(),a={state:e,dispatch:null,action:t,pending:null},l.queue=a,n=bm.bind(null,ot,a,i,n),a.dispatch=n,l.memoizedState=t,[e,n,!1]}function js(t){var e=Lt();return Ls(e,Nt,t)}function Ls(t,e,n){if(e=rc(t,e,Us)[0],t=hi(Ve)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var l=ua(e)}catch(u){throw u===pl?li:u}else l=e;e=Lt();var a=e.queue,i=a.dispatch;return n!==e.memoizedState&&(ot.flags|=2048,wl(9,{destroy:void 0},Sm.bind(null,a,n),null)),[l,i,t]}function Sm(t,e){t.action=e}function qs(t){var e=Lt(),n=Nt;if(n!==null)return Ls(e,n,t);Lt(),e=e.memoizedState,n=Lt();var l=n.queue.dispatch;return n.memoizedState=t,[e,l,!1]}function wl(t,e,n,l){return t={tag:t,create:n,deps:l,inst:e,next:null},e=ot.updateQueue,e===null&&(e=fi(),ot.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(l=n.next,n.next=t,t.next=l,e.lastEffect=t),t}function Gs(){return Lt().memoizedState}function mi(t,e,n,l){var a=Pt();ot.flags|=t,a.memoizedState=wl(1|e,{destroy:void 0},n,l===void 0?null:l)}function gi(t,e,n,l){var a=Lt();l=l===void 0?null:l;var i=a.memoizedState.inst;Nt!==null&&l!==null&&lc(l,Nt.memoizedState.deps)?a.memoizedState=wl(e,i,n,l):(ot.flags|=t,a.memoizedState=wl(1|e,i,n,l))}function ks(t,e){mi(8390656,8,t,e)}function hc(t,e){gi(2048,8,t,e)}function Em(t){ot.flags|=4;var e=ot.updateQueue;if(e===null)e=fi(),ot.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Ys(t){var e=Lt().memoizedState;return Em({ref:e,nextImpl:t}),function(){if((wt&2)!==0)throw Error(c(440));return e.impl.apply(void 0,arguments)}}function Qs(t,e){return gi(4,2,t,e)}function Xs(t,e){return gi(4,4,t,e)}function Vs(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Zs(t,e,n){n=n!=null?n.concat([t]):null,gi(4,4,Vs.bind(null,e,t),n)}function mc(){}function Ks(t,e){var n=Lt();e=e===void 0?null:e;var l=n.memoizedState;return e!==null&&lc(e,l[1])?l[0]:(n.memoizedState=[t,e],t)}function Js(t,e){var n=Lt();e=e===void 0?null:e;var l=n.memoizedState;if(e!==null&&lc(e,l[1]))return l[0];if(l=t(),Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[l,e],l}function gc(t,e,n){return n===void 0||(Xe&1073741824)!==0&&(mt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=If(),ot.lanes|=t,pn|=t,n)}function Fs(t,e,n,l){return se(n,e)?n:bl.current!==null?(t=gc(t,n,l),se(t,e)||(Yt=!0),t):(Xe&42)===0||(Xe&1073741824)!==0&&(mt&261930)===0?(Yt=!0,t.memoizedState=n):(t=If(),ot.lanes|=t,pn|=t,e)}function Is(t,e,n,l,a){var i=k.p;k.p=i!==0&&8>i?i:8;var u=_.T,o={};_.T=o,vc(t,!1,e,n);try{var m=a(),A=_.S;if(A!==null&&A(o,m),m!==null&&typeof m=="object"&&typeof m.then=="function"){var R=ym(m,l);ca(t,e,R,ye(t))}else ca(t,e,l,ye(t))}catch(D){ca(t,e,{then:function(){},status:"rejected",reason:D},ye())}finally{k.p=i,u!==null&&o.types!==null&&(u.types=o.types),_.T=u}}function wm(){}function yc(t,e,n,l){if(t.tag!==5)throw Error(c(476));var a=Ws(t).queue;Is(t,a,e,lt,n===null?wm:function(){return $s(t),n(l)})}function Ws(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:lt,baseState:lt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:lt},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function $s(t){var e=Ws(t);e.next===null&&(e=t.alternate.memoizedState),ca(t,e.next.queue,{},ye())}function pc(){return Ft(Aa)}function Ps(){return Lt().memoizedState}function tf(){return Lt().memoizedState}function Tm(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var l=dn(e,t,n);l!==null&&(ue(l,e,n),na(l,e,n)),e={cache:Zu()},t.payload=e;return}e=e.return}}function Am(t,e,n){var l=ye();n={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},yi(t)?nf(e,n):(n=Uu(t,e,n,l),n!==null&&(ue(n,t,l),lf(n,e,l)))}function ef(t,e,n){var l=ye();ca(t,e,n,l)}function ca(t,e,n,l){var a={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(yi(t))nf(e,a);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,o=i(u,n);if(a.hasEagerState=!0,a.eagerState=o,se(o,u))return Ia(t,e,a,0),Mt===null&&Fa(),!1}catch{}finally{}if(n=Uu(t,e,a,l),n!==null)return ue(n,t,l),lf(n,e,l),!0}return!1}function vc(t,e,n,l){if(l={lane:2,revertLane:Ic(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},yi(t)){if(e)throw Error(c(479))}else e=Uu(t,n,l,2),e!==null&&ue(e,t,2)}function yi(t){var e=t.alternate;return t===ot||e!==null&&e===ot}function nf(t,e){Sl=ri=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function lf(t,e,n){if((n&4194048)!==0){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,or(t,n)}}var oa={readContext:Ft,use:di,useCallback:Ut,useContext:Ut,useEffect:Ut,useImperativeHandle:Ut,useLayoutEffect:Ut,useInsertionEffect:Ut,useMemo:Ut,useReducer:Ut,useRef:Ut,useState:Ut,useDebugValue:Ut,useDeferredValue:Ut,useTransition:Ut,useSyncExternalStore:Ut,useId:Ut,useHostTransitionStatus:Ut,useFormState:Ut,useActionState:Ut,useOptimistic:Ut,useMemoCache:Ut,useCacheRefresh:Ut};oa.useEffectEvent=Ut;var af={readContext:Ft,use:di,useCallback:function(t,e){return Pt().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:ks,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,mi(4194308,4,Vs.bind(null,e,t),n)},useLayoutEffect:function(t,e){return mi(4194308,4,t,e)},useInsertionEffect:function(t,e){mi(4,2,t,e)},useMemo:function(t,e){var n=Pt();e=e===void 0?null:e;var l=t();if(Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[l,e],l},useReducer:function(t,e,n){var l=Pt();if(n!==void 0){var a=n(e);if(Xn){nn(!0);try{n(e)}finally{nn(!1)}}}else a=e;return l.memoizedState=l.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},l.queue=t,t=t.dispatch=Am.bind(null,ot,t),[l.memoizedState,t]},useRef:function(t){var e=Pt();return t={current:t},e.memoizedState=t},useState:function(t){t=fc(t);var e=t.queue,n=ef.bind(null,ot,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:mc,useDeferredValue:function(t,e){var n=Pt();return gc(n,t,e)},useTransition:function(){var t=fc(!1);return t=Is.bind(null,ot,t.queue,!0,!1),Pt().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var l=ot,a=Pt();if(yt){if(n===void 0)throw Error(c(407));n=n()}else{if(n=e(),Mt===null)throw Error(c(349));(mt&127)!==0||xs(l,e,n)}a.memoizedState=n;var i={value:n,getSnapshot:e};return a.queue=i,ks(Ns.bind(null,l,i,t),[t]),l.flags|=2048,wl(9,{destroy:void 0},Cs.bind(null,l,i,n,e),null),n},useId:function(){var t=Pt(),e=Mt.identifierPrefix;if(yt){var n=ze,l=Me;n=(l&~(1<<32-re(l)-1)).toString(32)+n,e="_"+e+"R_"+n,n=si++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=pm++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:pc,useFormState:Hs,useActionState:Hs,useOptimistic:function(t){var e=Pt();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=vc.bind(null,ot,!0,n),n.dispatch=e,[t,e]},useMemoCache:oc,useCacheRefresh:function(){return Pt().memoizedState=Tm.bind(null,ot)},useEffectEvent:function(t){var e=Pt(),n={impl:t};return e.memoizedState=n,function(){if((wt&2)!==0)throw Error(c(440));return n.impl.apply(void 0,arguments)}}},bc={readContext:Ft,use:di,useCallback:Ks,useContext:Ft,useEffect:hc,useImperativeHandle:Zs,useInsertionEffect:Qs,useLayoutEffect:Xs,useMemo:Js,useReducer:hi,useRef:Gs,useState:function(){return hi(Ve)},useDebugValue:mc,useDeferredValue:function(t,e){var n=Lt();return Fs(n,Nt.memoizedState,t,e)},useTransition:function(){var t=hi(Ve)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:ua(t),e]},useSyncExternalStore:As,useId:Ps,useHostTransitionStatus:pc,useFormState:js,useActionState:js,useOptimistic:function(t,e){var n=Lt();return Ms(n,Nt,t,e)},useMemoCache:oc,useCacheRefresh:tf};bc.useEffectEvent=Ys;var uf={readContext:Ft,use:di,useCallback:Ks,useContext:Ft,useEffect:hc,useImperativeHandle:Zs,useInsertionEffect:Qs,useLayoutEffect:Xs,useMemo:Js,useReducer:sc,useRef:Gs,useState:function(){return sc(Ve)},useDebugValue:mc,useDeferredValue:function(t,e){var n=Lt();return Nt===null?gc(n,t,e):Fs(n,Nt.memoizedState,t,e)},useTransition:function(){var t=sc(Ve)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:ua(t),e]},useSyncExternalStore:As,useId:Ps,useHostTransitionStatus:pc,useFormState:qs,useActionState:qs,useOptimistic:function(t,e){var n=Lt();return Nt!==null?Ms(n,Nt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:oc,useCacheRefresh:tf};uf.useEffectEvent=Ys;function Sc(t,e,n,l){e=t.memoizedState,n=n(l,e),n=n==null?e:N({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ec={enqueueSetState:function(t,e,n){t=t._reactInternals;var l=ye(),a=fn(l);a.payload=e,n!=null&&(a.callback=n),e=dn(t,a,l),e!==null&&(ue(e,t,l),na(e,t,l))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var l=ye(),a=fn(l);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=dn(t,a,l),e!==null&&(ue(e,t,l),na(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),l=fn(n);l.tag=2,e!=null&&(l.callback=e),e=dn(t,l,n),e!==null&&(ue(e,t,n),na(e,t,n))}};function cf(t,e,n,l,a,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,i,u):e.prototype&&e.prototype.isPureReactComponent?!Jl(n,l)||!Jl(a,i):!0}function of(t,e,n,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,l),e.state!==t&&Ec.enqueueReplaceState(e,e.state,null)}function Vn(t,e){var n=e;if("ref"in e){n={};for(var l in e)l!=="ref"&&(n[l]=e[l])}if(t=t.defaultProps){n===e&&(n=N({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function rf(t){Ja(t)}function sf(t){console.error(t)}function ff(t){Ja(t)}function pi(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function df(t,e,n){try{var l=t.onCaughtError;l(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function wc(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){pi(t,e)},n}function hf(t){return t=fn(t),t.tag=3,t}function mf(t,e,n,l){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=l.value;t.payload=function(){return a(i)},t.callback=function(){df(e,n,l)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){df(e,n,l),typeof a!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var o=l.stack;this.componentDidCatch(l.value,{componentStack:o!==null?o:""})})}function xm(t,e,n,l,a){if(n.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=n.alternate,e!==null&&ml(e,n,a,!0),n=de.current,n!==null){switch(n.tag){case 31:case 13:return Ae===null?Ri():n.alternate===null&&Ht===0&&(Ht=3),n.flags&=-257,n.flags|=65536,n.lanes=a,l===ai?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([l]):e.add(l),Kc(t,l,a)),!1;case 22:return n.flags|=65536,l===ai?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([l]):n.add(l)),Kc(t,l,a)),!1}throw Error(c(435,n.tag))}return Kc(t,l,a),Ri(),!1}if(yt)return e=de.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=a,l!==ku&&(t=Error(c(422),{cause:l}),Wl(Se(t,n)))):(l!==ku&&(e=Error(c(423),{cause:l}),Wl(Se(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,l=Se(l,n),a=wc(t.stateNode,l,a),$u(t,a),Ht!==4&&(Ht=2)),!1;var i=Error(c(520),{cause:l});if(i=Se(i,n),ya===null?ya=[i]:ya.push(i),Ht!==4&&(Ht=2),e===null)return!0;l=Se(l,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=wc(n.stateNode,l,t),$u(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,a=hf(a),mf(a,t,n,l),$u(n,a),!1}n=n.return}while(n!==null);return!1}var Tc=Error(c(461)),Yt=!1;function It(t,e,n,l){e.child=t===null?ps(e,null,n,l):Qn(e,t.child,n,l)}function gf(t,e,n,l,a){n=n.render;var i=e.ref;if("ref"in l){var u={};for(var o in l)o!=="ref"&&(u[o]=l[o])}else u=l;return qn(e),l=ac(t,e,n,u,i,a),o=ic(),t!==null&&!Yt?(uc(t,e,a),Ze(t,e,a)):(yt&&o&&qu(e),e.flags|=1,It(t,e,l,a),e.child)}function yf(t,e,n,l,a){if(t===null){var i=n.type;return typeof i=="function"&&!Hu(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,pf(t,e,i,l,a)):(t=$a(n.type,null,l,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!zc(t,a)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Jl,n(u,l)&&t.ref===e.ref)return Ze(t,e,a)}return e.flags|=1,t=Ge(i,l),t.ref=e.ref,t.return=e,e.child=t}function pf(t,e,n,l,a){if(t!==null){var i=t.memoizedProps;if(Jl(i,l)&&t.ref===e.ref)if(Yt=!1,e.pendingProps=l=i,zc(t,a))(t.flags&131072)!==0&&(Yt=!0);else return e.lanes=t.lanes,Ze(t,e,a)}return Ac(t,e,n,l,a)}function vf(t,e,n,l){var a=l.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(l=e.child=t.child,a=0;l!==null;)a=a|l.lanes|l.childLanes,l=l.sibling;l=a&~i}else l=0,e.child=null;return bf(t,e,i,n,l)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&ni(e,i!==null?i.cachePool:null),i!==null?Ss(e,i):tc(),Es(e);else return l=e.lanes=536870912,bf(t,e,i!==null?i.baseLanes|n:n,n,l)}else i!==null?(ni(e,i.cachePool),Ss(e,i),mn(),e.memoizedState=null):(t!==null&&ni(e,null),tc(),mn());return It(t,e,a,n),e.child}function ra(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function bf(t,e,n,l,a){var i=Ju();return i=i===null?null:{parent:Gt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&ni(e,null),tc(),Es(e),t!==null&&ml(t,e,l,!0),e.childLanes=a,null}function vi(t,e){return e=Si({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Sf(t,e,n){return Qn(e,t.child,null,n),t=vi(e,e.pendingProps),t.flags|=2,he(e),e.memoizedState=null,t}function Cm(t,e,n){var l=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(yt){if(l.mode==="hidden")return t=vi(e,l),e.lanes=536870912,ra(null,t);if(nc(e),(t=Dt)?(t=Dd(t,Te),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Me,overflow:ze}:null,retryLane:536870912,hydrationErrors:null},n=ns(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw on(e);return e.lanes=536870912,null}return vi(e,l)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(nc(e),a)if(e.flags&256)e.flags&=-257,e=Sf(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(c(558));else if(Yt||ml(t,e,n,!1),a=(n&t.childLanes)!==0,Yt||a){if(l=Mt,l!==null&&(u=rr(l,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Un(t,u),ue(l,t,u),Tc;Ri(),e=Sf(t,e,n)}else t=i.treeContext,Dt=xe(u.nextSibling),Jt=e,yt=!0,cn=null,Te=!1,t!==null&&is(e,t),e=vi(e,l),e.flags|=4096;return e}return t=Ge(t.child,{mode:l.mode,children:l.children}),t.ref=e.ref,e.child=t,t.return=e,t}function bi(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(c(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Ac(t,e,n,l,a){return qn(e),n=ac(t,e,n,l,void 0,a),l=ic(),t!==null&&!Yt?(uc(t,e,a),Ze(t,e,a)):(yt&&l&&qu(e),e.flags|=1,It(t,e,n,a),e.child)}function Ef(t,e,n,l,a,i){return qn(e),e.updateQueue=null,n=Ts(e,l,n,a),ws(t),l=ic(),t!==null&&!Yt?(uc(t,e,i),Ze(t,e,i)):(yt&&l&&qu(e),e.flags|=1,It(t,e,n,i),e.child)}function wf(t,e,n,l,a){if(qn(e),e.stateNode===null){var i=sl,u=n.contextType;typeof u=="object"&&u!==null&&(i=Ft(u)),i=new n(l,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ec,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=l,i.state=e.memoizedState,i.refs={},Iu(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?Ft(u):sl,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(Sc(e,n,u,l),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Ec.enqueueReplaceState(i,i.state,null),aa(e,l,i,a),la(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){i=e.stateNode;var o=e.memoizedProps,m=Vn(n,o);i.props=m;var A=i.context,R=n.contextType;u=sl,typeof R=="object"&&R!==null&&(u=Ft(R));var D=n.getDerivedStateFromProps;R=typeof D=="function"||typeof i.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,R||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o||A!==u)&&of(e,i,l,u),sn=!1;var x=e.memoizedState;i.state=x,aa(e,l,i,a),la(),A=e.memoizedState,o||x!==A||sn?(typeof D=="function"&&(Sc(e,n,D,l),A=e.memoizedState),(m=sn||cf(e,n,m,l,x,A,u))?(R||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=A),i.props=l,i.state=A,i.context=u,l=m):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{i=e.stateNode,Wu(t,e),u=e.memoizedProps,R=Vn(n,u),i.props=R,D=e.pendingProps,x=i.context,A=n.contextType,m=sl,typeof A=="object"&&A!==null&&(m=Ft(A)),o=n.getDerivedStateFromProps,(A=typeof o=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==D||x!==m)&&of(e,i,l,m),sn=!1,x=e.memoizedState,i.state=x,aa(e,l,i,a),la();var C=e.memoizedState;u!==D||x!==C||sn||t!==null&&t.dependencies!==null&&ti(t.dependencies)?(typeof o=="function"&&(Sc(e,n,o,l),C=e.memoizedState),(R=sn||cf(e,n,R,l,x,C,m)||t!==null&&t.dependencies!==null&&ti(t.dependencies))?(A||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,C,m),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,C,m)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=C),i.props=l,i.state=C,i.context=m,l=R):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=1024),l=!1)}return i=l,bi(t,e),l=(e.flags&128)!==0,i||l?(i=e.stateNode,n=l&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&l?(e.child=Qn(e,t.child,null,a),e.child=Qn(e,null,n,a)):It(t,e,n,a),e.memoizedState=i.state,t=e.child):t=Ze(t,e,a),t}function Tf(t,e,n,l){return jn(),e.flags|=256,It(t,e,n,l),e.child}var xc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Cc(t){return{baseLanes:t,cachePool:fs()}}function Nc(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=ge),t}function Af(t,e,n){var l=e.pendingProps,a=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(jt.current&2)!==0),u&&(a=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(yt){if(a?hn(e):mn(),(t=Dt)?(t=Dd(t,Te),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Me,overflow:ze}:null,retryLane:536870912,hydrationErrors:null},n=ns(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw on(e);return ro(t)?e.lanes=32:e.lanes=536870912,null}var o=l.children;return l=l.fallback,a?(mn(),a=e.mode,o=Si({mode:"hidden",children:o},a),l=Hn(l,a,n,null),o.return=e,l.return=e,o.sibling=l,e.child=o,l=e.child,l.memoizedState=Cc(n),l.childLanes=Nc(t,u,n),e.memoizedState=xc,ra(null,l)):(hn(e),_c(e,o))}var m=t.memoizedState;if(m!==null&&(o=m.dehydrated,o!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=Rc(t,e,n)):e.memoizedState!==null?(mn(),e.child=t.child,e.flags|=128,e=null):(mn(),o=l.fallback,a=e.mode,l=Si({mode:"visible",children:l.children},a),o=Hn(o,a,n,null),o.flags|=2,l.return=e,o.return=e,l.sibling=o,e.child=l,Qn(e,t.child,null,n),l=e.child,l.memoizedState=Cc(n),l.childLanes=Nc(t,u,n),e.memoizedState=xc,e=ra(null,l));else if(hn(e),ro(o)){if(u=o.nextSibling&&o.nextSibling.dataset,u)var A=u.dgst;u=A,l=Error(c(419)),l.stack="",l.digest=u,Wl({value:l,source:null,stack:null}),e=Rc(t,e,n)}else if(Yt||ml(t,e,n,!1),u=(n&t.childLanes)!==0,Yt||u){if(u=Mt,u!==null&&(l=rr(u,n),l!==0&&l!==m.retryLane))throw m.retryLane=l,Un(t,l),ue(u,t,l),Tc;oo(o)||Ri(),e=Rc(t,e,n)}else oo(o)?(e.flags|=192,e.child=t.child,e=null):(t=m.treeContext,Dt=xe(o.nextSibling),Jt=e,yt=!0,cn=null,Te=!1,t!==null&&is(e,t),e=_c(e,l.children),e.flags|=4096);return e}return a?(mn(),o=l.fallback,a=e.mode,m=t.child,A=m.sibling,l=Ge(m,{mode:"hidden",children:l.children}),l.subtreeFlags=m.subtreeFlags&65011712,A!==null?o=Ge(A,o):(o=Hn(o,a,n,null),o.flags|=2),o.return=e,l.return=e,l.sibling=o,e.child=l,ra(null,l),l=e.child,o=t.child.memoizedState,o===null?o=Cc(n):(a=o.cachePool,a!==null?(m=Gt._currentValue,a=a.parent!==m?{parent:m,pool:m}:a):a=fs(),o={baseLanes:o.baseLanes|n,cachePool:a}),l.memoizedState=o,l.childLanes=Nc(t,u,n),e.memoizedState=xc,ra(t.child,l)):(hn(e),n=t.child,t=n.sibling,n=Ge(n,{mode:"visible",children:l.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function _c(t,e){return e=Si({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Si(t,e){return t=fe(22,t,null,e),t.lanes=0,t}function Rc(t,e,n){return Qn(e,t.child,null,n),t=_c(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function xf(t,e,n){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),Xu(t.return,e,n)}function Mc(t,e,n,l,a,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:n,tailMode:a,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=l,u.tail=n,u.tailMode=a,u.treeForkCount=i)}function Cf(t,e,n){var l=e.pendingProps,a=l.revealOrder,i=l.tail;l=l.children;var u=jt.current,o=(u&2)!==0;if(o?(u=u&1|2,e.flags|=128):u&=1,G(jt,u),It(t,e,l,n),l=yt?Il:0,!o&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&xf(t,n,e);else if(t.tag===19)xf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&oi(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Mc(e,!1,a,n,i,l);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&oi(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Mc(e,!0,n,null,i,l);break;case"together":Mc(e,!1,null,null,void 0,l);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),pn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ml(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(c(153));if(e.child!==null){for(t=e.child,n=Ge(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ge(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function zc(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ti(t)))}function Nm(t,e,n){switch(e.tag){case 3:zt(e,e.stateNode.containerInfo),rn(e,Gt,t.memoizedState.cache),jn();break;case 27:case 5:He(e);break;case 4:zt(e,e.stateNode.containerInfo);break;case 10:rn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,nc(e),null;break;case 13:var l=e.memoizedState;if(l!==null)return l.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Af(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var a=(t.flags&128)!==0;if(l=(n&e.childLanes)!==0,l||(ml(t,e,n,!1),l=(n&e.childLanes)!==0),a){if(l)return Cf(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),G(jt,jt.current),l)break;return null;case 22:return e.lanes=0,vf(t,e,n,e.pendingProps);case 24:rn(e,Gt,t.memoizedState.cache)}return Ze(t,e,n)}function Nf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Yt=!0;else{if(!zc(t,n)&&(e.flags&128)===0)return Yt=!1,Nm(t,e,n);Yt=(t.flags&131072)!==0}else Yt=!1,yt&&(e.flags&1048576)!==0&&as(e,Il,e.index);switch(e.lanes=0,e.tag){case 16:t:{var l=e.pendingProps;if(t=kn(e.elementType),e.type=t,typeof t=="function")Hu(t)?(l=Vn(t,l),e.tag=1,e=wf(null,e,t,l,n)):(e.tag=0,e=Ac(null,e,t,l,n));else{if(t!=null){var a=t.$$typeof;if(a===X){e.tag=11,e=gf(null,e,t,l,n);break t}else if(a===H){e.tag=14,e=yf(null,e,t,l,n);break t}}throw e=it(t)||t,Error(c(306,e,""))}}return e;case 0:return Ac(t,e,e.type,e.pendingProps,n);case 1:return l=e.type,a=Vn(l,e.pendingProps),wf(t,e,l,a,n);case 3:t:{if(zt(e,e.stateNode.containerInfo),t===null)throw Error(c(387));l=e.pendingProps;var i=e.memoizedState;a=i.element,Wu(t,e),aa(e,l,null,n);var u=e.memoizedState;if(l=u.cache,rn(e,Gt,l),l!==i.cache&&Vu(e,[Gt],n,!0),la(),l=u.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Tf(t,e,l,n);break t}else if(l!==a){a=Se(Error(c(424)),e),Wl(a),e=Tf(t,e,l,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Dt=xe(t.firstChild),Jt=e,yt=!0,cn=null,Te=!0,n=ps(e,null,l,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(jn(),l===a){e=Ze(t,e,n);break t}It(t,e,l,n)}e=e.child}return e;case 26:return bi(t,e),t===null?(n=Ld(e.type,null,e.pendingProps,null))?e.memoizedState=n:yt||(n=e.type,t=e.pendingProps,l=Hi(st.current).createElement(n),l[Kt]=e,l[te]=t,Wt(l,n,t),Vt(l),e.stateNode=l):e.memoizedState=Ld(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return He(e),t===null&&yt&&(l=e.stateNode=Ud(e.type,e.pendingProps,st.current),Jt=e,Te=!0,a=Dt,wn(e.type)?(so=a,Dt=xe(l.firstChild)):Dt=a),It(t,e,e.pendingProps.children,n),bi(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&yt&&((a=l=Dt)&&(l=lg(l,e.type,e.pendingProps,Te),l!==null?(e.stateNode=l,Jt=e,Dt=xe(l.firstChild),Te=!1,a=!0):a=!1),a||on(e)),He(e),a=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,l=i.children,io(a,i)?l=null:u!==null&&io(a,u)&&(e.flags|=32),e.memoizedState!==null&&(a=ac(t,e,vm,null,null,n),Aa._currentValue=a),bi(t,e),It(t,e,l,n),e.child;case 6:return t===null&&yt&&((t=n=Dt)&&(n=ag(n,e.pendingProps,Te),n!==null?(e.stateNode=n,Jt=e,Dt=null,t=!0):t=!1),t||on(e)),null;case 13:return Af(t,e,n);case 4:return zt(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=Qn(e,null,l,n):It(t,e,l,n),e.child;case 11:return gf(t,e,e.type,e.pendingProps,n);case 7:return It(t,e,e.pendingProps,n),e.child;case 8:return It(t,e,e.pendingProps.children,n),e.child;case 12:return It(t,e,e.pendingProps.children,n),e.child;case 10:return l=e.pendingProps,rn(e,e.type,l.value),It(t,e,l.children,n),e.child;case 9:return a=e.type._context,l=e.pendingProps.children,qn(e),a=Ft(a),l=l(a),e.flags|=1,It(t,e,l,n),e.child;case 14:return yf(t,e,e.type,e.pendingProps,n);case 15:return pf(t,e,e.type,e.pendingProps,n);case 19:return Cf(t,e,n);case 31:return Cm(t,e,n);case 22:return vf(t,e,n,e.pendingProps);case 24:return qn(e),l=Ft(Gt),t===null?(a=Ju(),a===null&&(a=Mt,i=Zu(),a.pooledCache=i,i.refCount++,i!==null&&(a.pooledCacheLanes|=n),a=i),e.memoizedState={parent:l,cache:a},Iu(e),rn(e,Gt,a)):((t.lanes&n)!==0&&(Wu(t,e),aa(e,null,null,n),la()),a=t.memoizedState,i=e.memoizedState,a.parent!==l?(a={parent:l,cache:l},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),rn(e,Gt,l)):(l=i.cache,rn(e,Gt,l),l!==a.cache&&Vu(e,[Gt],n,!0))),It(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(c(156,e.tag))}function Ke(t){t.flags|=4}function Dc(t,e,n,l,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(td())t.flags|=8192;else throw Yn=ai,Fu}else t.flags&=-16777217}function _f(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Qd(e))if(td())t.flags|=8192;else throw Yn=ai,Fu}function Ei(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?ur():536870912,t.lanes|=e,Cl|=e)}function sa(t,e){if(!yt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var l=null;n!==null;)n.alternate!==null&&(l=n),n=n.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function Ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,l=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags&65011712,l|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags,l|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=l,t.childLanes=n,e}function _m(t,e,n){var l=e.pendingProps;switch(Gu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(e),null;case 1:return Ot(e),null;case 3:return n=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),Qe(Gt),Ct(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(hl(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Yu())),Ot(e),null;case 26:var a=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(Ot(e),_f(e,i)):(Ot(e),Dc(e,a,null,l,n))):i?i!==t.memoizedState?(Ke(e),Ot(e),_f(e,i)):(Ot(e),e.flags&=-16777217):(t=t.memoizedProps,t!==l&&Ke(e),Ot(e),Dc(e,a,t,l,n)),null;case 27:if(Da(e),n=st.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Ke(e);else{if(!l){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}t=Z.current,hl(e)?us(e):(t=Ud(a,l,n),e.stateNode=t,Ke(e))}return Ot(e),null;case 5:if(Da(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Ke(e);else{if(!l){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}if(i=Z.current,hl(e))us(e);else{var u=Hi(st.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?u.createElement("select",{is:l.is}):u.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?u.createElement(a,{is:l.is}):u.createElement(a)}}i[Kt]=e,i[te]=l;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch(Wt(i,a,l),a){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&Ke(e)}}return Ot(e),Dc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&Ke(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(c(166));if(t=st.current,hl(e)){if(t=e.stateNode,n=e.memoizedProps,l=null,a=Jt,a!==null)switch(a.tag){case 27:case 5:l=a.memoizedProps}t[Kt]=e,t=!!(t.nodeValue===n||l!==null&&l.suppressHydrationWarning===!0||Ad(t.nodeValue,n)),t||on(e,!0)}else t=Hi(t).createTextNode(l),t[Kt]=e,e.stateNode=t}return Ot(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(l=hl(e),n!==null){if(t===null){if(!l)throw Error(c(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(557));t[Kt]=e}else jn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),t=!1}else n=Yu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(he(e),e):(he(e),null);if((e.flags&128)!==0)throw Error(c(558))}return Ot(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=hl(e),l!==null&&l.dehydrated!==null){if(t===null){if(!a)throw Error(c(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(c(317));a[Kt]=e}else jn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),a=!1}else a=Yu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(he(e),e):(he(e),null)}return he(e),(e.flags&128)!==0?(e.lanes=n,e):(n=l!==null,t=t!==null&&t.memoizedState!==null,n&&(l=e.child,a=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(a=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==a&&(l.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Ei(e,e.updateQueue),Ot(e),null);case 4:return Ct(),t===null&&to(e.stateNode.containerInfo),Ot(e),null;case 10:return Qe(e.type),Ot(e),null;case 19:if(O(jt),l=e.memoizedState,l===null)return Ot(e),null;if(a=(e.flags&128)!==0,i=l.rendering,i===null)if(a)sa(l,!1);else{if(Ht!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=oi(t),i!==null){for(e.flags|=128,sa(l,!1),t=i.updateQueue,e.updateQueue=t,Ei(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)es(n,t),n=n.sibling;return G(jt,jt.current&1|2),yt&&ke(e,l.treeForkCount),e.child}t=t.sibling}l.tail!==null&&ce()>Ci&&(e.flags|=128,a=!0,sa(l,!1),e.lanes=4194304)}else{if(!a)if(t=oi(i),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,Ei(e,t),sa(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!yt)return Ot(e),null}else 2*ce()-l.renderingStartTime>Ci&&n!==536870912&&(e.flags|=128,a=!0,sa(l,!1),e.lanes=4194304);l.isBackwards?(i.sibling=e.child,e.child=i):(t=l.last,t!==null?t.sibling=i:e.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ce(),t.sibling=null,n=jt.current,G(jt,a?n&1|2:n&1),yt&&ke(e,l.treeForkCount),t):(Ot(e),null);case 22:case 23:return he(e),ec(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(n&536870912)!==0&&(e.flags&128)===0&&(Ot(e),e.subtreeFlags&6&&(e.flags|=8192)):Ot(e),n=e.updateQueue,n!==null&&Ei(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==n&&(e.flags|=2048),t!==null&&O(Gn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Qe(Gt),Ot(e),null;case 25:return null;case 30:return null}throw Error(c(156,e.tag))}function Rm(t,e){switch(Gu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Qe(Gt),Ct(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Da(e),null;case 31:if(e.memoizedState!==null){if(he(e),e.alternate===null)throw Error(c(340));jn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(he(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(c(340));jn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return O(jt),null;case 4:return Ct(),null;case 10:return Qe(e.type),null;case 22:case 23:return he(e),ec(),t!==null&&O(Gn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Qe(Gt),null;case 25:return null;default:return null}}function Rf(t,e){switch(Gu(e),e.tag){case 3:Qe(Gt),Ct();break;case 26:case 27:case 5:Da(e);break;case 4:Ct();break;case 31:e.memoizedState!==null&&he(e);break;case 13:he(e);break;case 19:O(jt);break;case 10:Qe(e.type);break;case 22:case 23:he(e),ec(),t!==null&&O(Gn);break;case 24:Qe(Gt)}}function fa(t,e){try{var n=e.updateQueue,l=n!==null?n.lastEffect:null;if(l!==null){var a=l.next;n=a;do{if((n.tag&t)===t){l=void 0;var i=n.create,u=n.inst;l=i(),u.destroy=l}n=n.next}while(n!==a)}}catch(o){xt(e,e.return,o)}}function gn(t,e,n){try{var l=e.updateQueue,a=l!==null?l.lastEffect:null;if(a!==null){var i=a.next;l=i;do{if((l.tag&t)===t){var u=l.inst,o=u.destroy;if(o!==void 0){u.destroy=void 0,a=e;var m=n,A=o;try{A()}catch(R){xt(a,m,R)}}}l=l.next}while(l!==i)}}catch(R){xt(e,e.return,R)}}function Mf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{bs(e,n)}catch(l){xt(t,t.return,l)}}}function zf(t,e,n){n.props=Vn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(l){xt(t,e,l)}}function da(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof n=="function"?t.refCleanup=n(l):n.current=l}}catch(a){xt(t,e,a)}}function De(t,e){var n=t.ref,l=t.refCleanup;if(n!==null)if(typeof l=="function")try{l()}catch(a){xt(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){xt(t,e,a)}else n.current=null}function Df(t){var e=t.type,n=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&l.focus();break t;case"img":n.src?l.src=n.src:n.srcSet&&(l.srcset=n.srcSet)}}catch(a){xt(t,t.return,a)}}function Oc(t,e,n){try{var l=t.stateNode;Wm(l,t.type,n,e),l[te]=e}catch(a){xt(t,t.return,a)}}function Of(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&wn(t.type)||t.tag===4}function Bc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Of(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&wn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Uc(t,e,n){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Le));else if(l!==4&&(l===27&&wn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Uc(t,e,n),t=t.sibling;t!==null;)Uc(t,e,n),t=t.sibling}function wi(t,e,n){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(l!==4&&(l===27&&wn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(wi(t,e,n),t=t.sibling;t!==null;)wi(t,e,n),t=t.sibling}function Bf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var l=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Wt(e,l,n),e[Kt]=t,e[te]=n}catch(i){xt(t,t.return,i)}}var Je=!1,Qt=!1,Hc=!1,Uf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function Mm(t,e){if(t=t.containerInfo,lo=Qi,t=Zr(t),Ru(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var l=n.getSelection&&n.getSelection();if(l&&l.rangeCount!==0){n=l.anchorNode;var a=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,o=-1,m=-1,A=0,R=0,D=t,x=null;e:for(;;){for(var C;D!==n||a!==0&&D.nodeType!==3||(o=u+a),D!==i||l!==0&&D.nodeType!==3||(m=u+l),D.nodeType===3&&(u+=D.nodeValue.length),(C=D.firstChild)!==null;)x=D,D=C;for(;;){if(D===t)break e;if(x===n&&++A===a&&(o=u),x===i&&++R===l&&(m=u),(C=D.nextSibling)!==null)break;D=x,x=D.parentNode}D=C}n=o===-1||m===-1?null:{start:o,end:m}}else n=null}n=n||{start:0,end:0}}else n=null;for(ao={focusedElem:t,selectionRange:n},Qi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,a=i.memoizedProps,i=i.memoizedState,l=n.stateNode;try{var V=Vn(n.type,a);t=l.getSnapshotBeforeUpdate(V,i),l.__reactInternalSnapshotBeforeUpdate=t}catch(at){xt(n,n.return,at)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)co(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":co(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(c(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function Hf(t,e,n){var l=n.flags;switch(n.tag){case 0:case 11:case 15:Ie(t,n),l&4&&fa(5,n);break;case 1:if(Ie(t,n),l&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){xt(n,n.return,u)}else{var a=Vn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){xt(n,n.return,u)}}l&64&&Mf(n),l&512&&da(n,n.return);break;case 3:if(Ie(t,n),l&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{bs(t,e)}catch(u){xt(n,n.return,u)}}break;case 27:e===null&&l&4&&Bf(n);case 26:case 5:Ie(t,n),e===null&&l&4&&Df(n),l&512&&da(n,n.return);break;case 12:Ie(t,n);break;case 31:Ie(t,n),l&4&&qf(t,n);break;case 13:Ie(t,n),l&4&&Gf(t,n),l&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=qm.bind(null,n),ig(t,n))));break;case 22:if(l=n.memoizedState!==null||Je,!l){e=e!==null&&e.memoizedState!==null||Qt,a=Je;var i=Qt;Je=l,(Qt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Ie(t,n),Je=a,Qt=i}break;case 30:break;default:Ie(t,n)}}function jf(t){var e=t.alternate;e!==null&&(t.alternate=null,jf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&du(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Bt=null,ne=!1;function Fe(t,e,n){for(n=n.child;n!==null;)Lf(t,e,n),n=n.sibling}function Lf(t,e,n){if(oe&&typeof oe.onCommitFiberUnmount=="function")try{oe.onCommitFiberUnmount(Hl,n)}catch{}switch(n.tag){case 26:Qt||De(n,e),Fe(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qt||De(n,e);var l=Bt,a=ne;wn(n.type)&&(Bt=n.stateNode,ne=!1),Fe(t,e,n),Ea(n.stateNode),Bt=l,ne=a;break;case 5:Qt||De(n,e);case 6:if(l=Bt,a=ne,Bt=null,Fe(t,e,n),Bt=l,ne=a,Bt!==null)if(ne)try{(Bt.nodeType===9?Bt.body:Bt.nodeName==="HTML"?Bt.ownerDocument.body:Bt).removeChild(n.stateNode)}catch(i){xt(n,e,i)}else try{Bt.removeChild(n.stateNode)}catch(i){xt(n,e,i)}break;case 18:Bt!==null&&(ne?(t=Bt,Md(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Bl(t)):Md(Bt,n.stateNode));break;case 4:l=Bt,a=ne,Bt=n.stateNode.containerInfo,ne=!0,Fe(t,e,n),Bt=l,ne=a;break;case 0:case 11:case 14:case 15:gn(2,n,e),Qt||gn(4,n,e),Fe(t,e,n);break;case 1:Qt||(De(n,e),l=n.stateNode,typeof l.componentWillUnmount=="function"&&zf(n,e,l)),Fe(t,e,n);break;case 21:Fe(t,e,n);break;case 22:Qt=(l=Qt)||n.memoizedState!==null,Fe(t,e,n),Qt=l;break;default:Fe(t,e,n)}}function qf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Bl(t)}catch(n){xt(e,e.return,n)}}}function Gf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Bl(t)}catch(n){xt(e,e.return,n)}}function zm(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Uf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Uf),e;default:throw Error(c(435,t.tag))}}function Ti(t,e){var n=zm(t);e.forEach(function(l){if(!n.has(l)){n.add(l);var a=Gm.bind(null,t,l);l.then(a,a)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var l=0;l<n.length;l++){var a=n[l],i=t,u=e,o=u;t:for(;o!==null;){switch(o.tag){case 27:if(wn(o.type)){Bt=o.stateNode,ne=!1;break t}break;case 5:Bt=o.stateNode,ne=!1;break t;case 3:case 4:Bt=o.stateNode.containerInfo,ne=!0;break t}o=o.return}if(Bt===null)throw Error(c(160));Lf(i,u,a),Bt=null,ne=!1,i=a.alternate,i!==null&&(i.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)kf(e,t),e=e.sibling}var _e=null;function kf(t,e){var n=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ae(t),l&4&&(gn(3,t,t.return),fa(3,t),gn(5,t,t.return));break;case 1:le(e,t),ae(t),l&512&&(Qt||n===null||De(n,n.return)),l&64&&Je&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?l:n.concat(l))));break;case 26:var a=_e;if(le(e,t),ae(t),l&512&&(Qt||n===null||De(n,n.return)),l&4){var i=n!==null?n.memoizedState:null;if(l=t.memoizedState,n===null)if(l===null)if(t.stateNode===null){t:{l=t.type,n=t.memoizedProps,a=a.ownerDocument||a;e:switch(l){case"title":i=a.getElementsByTagName("title")[0],(!i||i[ql]||i[Kt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(l),a.head.insertBefore(i,a.querySelector("head > title"))),Wt(i,l,n),i[Kt]=t,Vt(i),l=i;break t;case"link":var u=kd("link","href",a).get(l+(n.href||""));if(u){for(var o=0;o<u.length;o++)if(i=u[o],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(o,1);break e}}i=a.createElement(l),Wt(i,l,n),a.head.appendChild(i);break;case"meta":if(u=kd("meta","content",a).get(l+(n.content||""))){for(o=0;o<u.length;o++)if(i=u[o],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(o,1);break e}}i=a.createElement(l),Wt(i,l,n),a.head.appendChild(i);break;default:throw Error(c(468,l))}i[Kt]=t,Vt(i),l=i}t.stateNode=l}else Yd(a,t.type,t.stateNode);else t.stateNode=Gd(a,l,t.memoizedProps);else i!==l?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,l===null?Yd(a,t.type,t.stateNode):Gd(a,l,t.memoizedProps)):l===null&&t.stateNode!==null&&Oc(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ae(t),l&512&&(Qt||n===null||De(n,n.return)),n!==null&&l&4&&Oc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ae(t),l&512&&(Qt||n===null||De(n,n.return)),t.flags&32){a=t.stateNode;try{ll(a,"")}catch(V){xt(t,t.return,V)}}l&4&&t.stateNode!=null&&(a=t.memoizedProps,Oc(t,a,n!==null?n.memoizedProps:a)),l&1024&&(Hc=!0);break;case 6:if(le(e,t),ae(t),l&4){if(t.stateNode===null)throw Error(c(162));l=t.memoizedProps,n=t.stateNode;try{n.nodeValue=l}catch(V){xt(t,t.return,V)}}break;case 3:if(qi=null,a=_e,_e=ji(e.containerInfo),le(e,t),_e=a,ae(t),l&4&&n!==null&&n.memoizedState.isDehydrated)try{Bl(e.containerInfo)}catch(V){xt(t,t.return,V)}Hc&&(Hc=!1,Yf(t));break;case 4:l=_e,_e=ji(t.stateNode.containerInfo),le(e,t),ae(t),_e=l;break;case 12:le(e,t),ae(t);break;case 31:le(e,t),ae(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Ti(t,l)));break;case 13:le(e,t),ae(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(xi=ce()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Ti(t,l)));break;case 22:a=t.memoizedState!==null;var m=n!==null&&n.memoizedState!==null,A=Je,R=Qt;if(Je=A||a,Qt=R||m,le(e,t),Qt=R,Je=A,ae(t),l&8192)t:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||m||Je||Qt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){m=n=e;try{if(i=m.stateNode,a)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{o=m.stateNode;var D=m.memoizedProps.style,x=D!=null&&D.hasOwnProperty("display")?D.display:null;o.style.display=x==null||typeof x=="boolean"?"":(""+x).trim()}}catch(V){xt(m,m.return,V)}}}else if(e.tag===6){if(n===null){m=e;try{m.stateNode.nodeValue=a?"":m.memoizedProps}catch(V){xt(m,m.return,V)}}}else if(e.tag===18){if(n===null){m=e;try{var C=m.stateNode;a?zd(C,!0):zd(m.stateNode,!1)}catch(V){xt(m,m.return,V)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}l&4&&(l=t.updateQueue,l!==null&&(n=l.retryQueue,n!==null&&(l.retryQueue=null,Ti(t,n))));break;case 19:le(e,t),ae(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Ti(t,l)));break;case 30:break;case 21:break;default:le(e,t),ae(t)}}function ae(t){var e=t.flags;if(e&2){try{for(var n,l=t.return;l!==null;){if(Of(l)){n=l;break}l=l.return}if(n==null)throw Error(c(160));switch(n.tag){case 27:var a=n.stateNode,i=Bc(t);wi(t,i,a);break;case 5:var u=n.stateNode;n.flags&32&&(ll(u,""),n.flags&=-33);var o=Bc(t);wi(t,o,u);break;case 3:case 4:var m=n.stateNode.containerInfo,A=Bc(t);Uc(t,A,m);break;default:throw Error(c(161))}}catch(R){xt(t,t.return,R)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Yf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Yf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Ie(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Hf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:gn(4,e,e.return),Zn(e);break;case 1:De(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&zf(e,e.return,n),Zn(e);break;case 27:Ea(e.stateNode);case 26:case 5:De(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var l=e.alternate,a=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(a,i,n),fa(4,i);break;case 1:if(We(a,i,n),l=i,a=l.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(A){xt(l,l.return,A)}if(l=i,a=l.updateQueue,a!==null){var o=l.stateNode;try{var m=a.shared.hiddenCallbacks;if(m!==null)for(a.shared.hiddenCallbacks=null,a=0;a<m.length;a++)vs(m[a],o)}catch(A){xt(l,l.return,A)}}n&&u&64&&Mf(i),da(i,i.return);break;case 27:Bf(i);case 26:case 5:We(a,i,n),n&&l===null&&u&4&&Df(i),da(i,i.return);break;case 12:We(a,i,n);break;case 31:We(a,i,n),n&&u&4&&qf(a,i);break;case 13:We(a,i,n),n&&u&4&&Gf(a,i);break;case 22:i.memoizedState===null&&We(a,i,n),da(i,i.return);break;case 30:break;default:We(a,i,n)}e=e.sibling}}function jc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&$l(n))}function Lc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&$l(t))}function Re(t,e,n,l){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Qf(t,e,n,l),e=e.sibling}function Qf(t,e,n,l){var a=e.flags;switch(e.tag){case 0:case 11:case 15:Re(t,e,n,l),a&2048&&fa(9,e);break;case 1:Re(t,e,n,l);break;case 3:Re(t,e,n,l),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&$l(t)));break;case 12:if(a&2048){Re(t,e,n,l),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,o=i.onPostCommit;typeof o=="function"&&o(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(m){xt(e,e.return,m)}}else Re(t,e,n,l);break;case 31:Re(t,e,n,l);break;case 13:Re(t,e,n,l);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?Re(t,e,n,l):ha(t,e):i._visibility&2?Re(t,e,n,l):(i._visibility|=2,Tl(t,e,n,l,(e.subtreeFlags&10256)!==0||!1)),a&2048&&jc(u,e);break;case 24:Re(t,e,n,l),a&2048&&Lc(e.alternate,e);break;default:Re(t,e,n,l)}}function Tl(t,e,n,l,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,o=n,m=l,A=u.flags;switch(u.tag){case 0:case 11:case 15:Tl(i,u,o,m,a),fa(8,u);break;case 23:break;case 22:var R=u.stateNode;u.memoizedState!==null?R._visibility&2?Tl(i,u,o,m,a):ha(i,u):(R._visibility|=2,Tl(i,u,o,m,a)),a&&A&2048&&jc(u.alternate,u);break;case 24:Tl(i,u,o,m,a),a&&A&2048&&Lc(u.alternate,u);break;default:Tl(i,u,o,m,a)}e=e.sibling}}function ha(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,l=e,a=l.flags;switch(l.tag){case 22:ha(n,l),a&2048&&jc(l.alternate,l);break;case 24:ha(n,l),a&2048&&Lc(l.alternate,l);break;default:ha(n,l)}e=e.sibling}}var ma=8192;function Al(t,e,n){if(t.subtreeFlags&ma)for(t=t.child;t!==null;)Xf(t,e,n),t=t.sibling}function Xf(t,e,n){switch(t.tag){case 26:Al(t,e,n),t.flags&ma&&t.memoizedState!==null&&pg(n,_e,t.memoizedState,t.memoizedProps);break;case 5:Al(t,e,n);break;case 3:case 4:var l=_e;_e=ji(t.stateNode.containerInfo),Al(t,e,n),_e=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=ma,ma=16777216,Al(t,e,n),ma=l):Al(t,e,n));break;default:Al(t,e,n)}}function Vf(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function ga(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];Zt=l,Kf(l,t)}Vf(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Zf(t),t=t.sibling}function Zf(t){switch(t.tag){case 0:case 11:case 15:ga(t),t.flags&2048&&gn(9,t,t.return);break;case 3:ga(t);break;case 12:ga(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ai(t)):ga(t);break;default:ga(t)}}function Ai(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];Zt=l,Kf(l,t)}Vf(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:gn(8,e,e.return),Ai(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ai(e));break;default:Ai(e)}t=t.sibling}}function Kf(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:gn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var l=n.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:$l(n.memoizedState.cache)}if(l=n.child,l!==null)l.return=n,Zt=l;else t:for(n=t;Zt!==null;){l=Zt;var a=l.sibling,i=l.return;if(jf(l),l===n){Zt=null;break t}if(a!==null){a.return=i,Zt=a;break t}Zt=i}}}var Dm={getCacheForType:function(t){var e=Ft(Gt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ft(Gt).controller.signal}},Om=typeof WeakMap=="function"?WeakMap:Map,wt=0,Mt=null,dt=null,mt=0,At=0,me=null,yn=!1,xl=!1,qc=!1,$e=0,Ht=0,pn=0,Kn=0,Gc=0,ge=0,Cl=0,ya=null,ie=null,kc=!1,xi=0,Jf=0,Ci=1/0,Ni=null,vn=null,Xt=0,bn=null,Nl=null,Pe=0,Yc=0,Qc=null,Ff=null,pa=0,Xc=null;function ye(){return(wt&2)!==0&&mt!==0?mt&-mt:_.T!==null?Ic():sr()}function If(){if(ge===0)if((mt&536870912)===0||yt){var t=Ua;Ua<<=1,(Ua&3932160)===0&&(Ua=262144),ge=t}else ge=536870912;return t=de.current,t!==null&&(t.flags|=32),ge}function ue(t,e,n){(t===Mt&&(At===2||At===9)||t.cancelPendingCommit!==null)&&(_l(t,0),Sn(t,mt,ge,!1)),Ll(t,n),((wt&2)===0||t!==Mt)&&(t===Mt&&((wt&2)===0&&(Kn|=n),Ht===4&&Sn(t,mt,ge,!1)),Oe(t))}function Wf(t,e,n){if((wt&6)!==0)throw Error(c(327));var l=!n&&(e&127)===0&&(e&t.expiredLanes)===0||jl(t,e),a=l?Hm(t,e):Zc(t,e,!0),i=l;do{if(a===0){xl&&!l&&Sn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!Bm(n)){a=Zc(t,e,!1),i=!1;continue}if(a===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var o=t;a=ya;var m=o.current.memoizedState.isDehydrated;if(m&&(_l(o,u).flags|=256),u=Zc(o,u,!1),u!==2){if(qc&&!m){o.errorRecoveryDisabledLanes|=i,Kn|=i,a=4;break t}i=ie,ie=a,i!==null&&(ie===null?ie=i:ie.push.apply(ie,i))}a=u}if(i=!1,a!==2)continue}}if(a===1){_l(t,0),Sn(t,e,0,!0);break}t:{switch(l=t,i=a,i){case 0:case 1:throw Error(c(345));case 4:if((e&4194048)!==e)break;case 6:Sn(l,e,ge,!yn);break t;case 2:ie=null;break;case 3:case 5:break;default:throw Error(c(329))}if((e&62914560)===e&&(a=xi+300-ce(),10<a)){if(Sn(l,e,ge,!yn),ja(l,0,!0)!==0)break t;Pe=e,l.timeoutHandle=_d($f.bind(null,l,n,ie,Ni,kc,e,ge,Kn,Cl,yn,i,"Throttled",-0,0),a);break t}$f(l,n,ie,Ni,kc,e,ge,Kn,Cl,yn,i,null,-0,0)}}break}while(!0);Oe(t)}function $f(t,e,n,l,a,i,u,o,m,A,R,D,x,C){if(t.timeoutHandle=-1,D=e.subtreeFlags,D&8192||(D&16785408)===16785408){D={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Le},Xf(e,i,D);var V=(i&62914560)===i?xi-ce():(i&4194048)===i?Jf-ce():0;if(V=vg(D,V),V!==null){Pe=i,t.cancelPendingCommit=V(ud.bind(null,t,e,i,n,l,a,u,o,m,R,D,null,x,C)),Sn(t,i,u,!A);return}}ud(t,e,i,n,l,a,u,o,m)}function Bm(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var l=0;l<n.length;l++){var a=n[l],i=a.getSnapshot;a=a.value;try{if(!se(i(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Sn(t,e,n,l){e&=~Gc,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var a=e;0<a;){var i=31-re(a),u=1<<i;l[i]=-1,a&=~u}n!==0&&cr(t,n,e)}function _i(){return(wt&6)===0?(va(0),!1):!0}function Vc(){if(dt!==null){if(At===0)var t=dt.return;else t=dt,Ye=Ln=null,cc(t),vl=null,ta=0,t=dt;for(;t!==null;)Rf(t.alternate,t),t=t.return;dt=null}}function _l(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,tg(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Vc(),Mt=t,dt=n=Ge(t.current,null),mt=e,At=0,me=null,yn=!1,xl=jl(t,e),qc=!1,Cl=ge=Gc=Kn=pn=Ht=0,ie=ya=null,kc=!1,(e&8)!==0&&(e|=e&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=e;0<l;){var a=31-re(l),i=1<<a;e|=t[a],l&=~i}return $e=e,Fa(),n}function Pf(t,e){ot=null,_.H=oa,e===pl||e===li?(e=ms(),At=3):e===Fu?(e=ms(),At=4):At=e===Tc?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,me=e,dt===null&&(Ht=1,pi(t,Se(e,t.current)))}function td(){var t=de.current;return t===null?!0:(mt&4194048)===mt?Ae===null:(mt&62914560)===mt||(mt&536870912)!==0?t===Ae:!1}function ed(){var t=_.H;return _.H=oa,t===null?oa:t}function nd(){var t=_.A;return _.A=Dm,t}function Ri(){Ht=4,yn||(mt&4194048)!==mt&&de.current!==null||(xl=!0),(pn&134217727)===0&&(Kn&134217727)===0||Mt===null||Sn(Mt,mt,ge,!1)}function Zc(t,e,n){var l=wt;wt|=2;var a=ed(),i=nd();(Mt!==t||mt!==e)&&(Ni=null,_l(t,e)),e=!1;var u=Ht;t:do try{if(At!==0&&dt!==null){var o=dt,m=me;switch(At){case 8:Vc(),u=6;break t;case 3:case 2:case 9:case 6:de.current===null&&(e=!0);var A=At;if(At=0,me=null,Rl(t,o,m,A),n&&xl){u=0;break t}break;default:A=At,At=0,me=null,Rl(t,o,m,A)}}Um(),u=Ht;break}catch(R){Pf(t,R)}while(!0);return e&&t.shellSuspendCounter++,Ye=Ln=null,wt=l,_.H=a,_.A=i,dt===null&&(Mt=null,mt=0,Fa()),u}function Um(){for(;dt!==null;)ld(dt)}function Hm(t,e){var n=wt;wt|=2;var l=ed(),a=nd();Mt!==t||mt!==e?(Ni=null,Ci=ce()+500,_l(t,e)):xl=jl(t,e);t:do try{if(At!==0&&dt!==null){e=dt;var i=me;e:switch(At){case 1:At=0,me=null,Rl(t,e,i,1);break;case 2:case 9:if(ds(i)){At=0,me=null,ad(e);break}e=function(){At!==2&&At!==9||Mt!==t||(At=7),Oe(t)},i.then(e,e);break t;case 3:At=7;break t;case 4:At=5;break t;case 7:ds(i)?(At=0,me=null,ad(e)):(At=0,me=null,Rl(t,e,i,7));break;case 5:var u=null;switch(dt.tag){case 26:u=dt.memoizedState;case 5:case 27:var o=dt;if(u?Qd(u):o.stateNode.complete){At=0,me=null;var m=o.sibling;if(m!==null)dt=m;else{var A=o.return;A!==null?(dt=A,Mi(A)):dt=null}break e}}At=0,me=null,Rl(t,e,i,5);break;case 6:At=0,me=null,Rl(t,e,i,6);break;case 8:Vc(),Ht=6;break t;default:throw Error(c(462))}}jm();break}catch(R){Pf(t,R)}while(!0);return Ye=Ln=null,_.H=l,_.A=a,wt=n,dt!==null?0:(Mt=null,mt=0,Fa(),Ht)}function jm(){for(;dt!==null&&!u0();)ld(dt)}function ld(t){var e=Nf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?Mi(t):dt=e}function ad(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Ef(n,e,e.pendingProps,e.type,void 0,mt);break;case 11:e=Ef(n,e,e.pendingProps,e.type.render,e.ref,mt);break;case 5:cc(e);default:Rf(n,e),e=dt=es(e,$e),e=Nf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?Mi(t):dt=e}function Rl(t,e,n,l){Ye=Ln=null,cc(e),vl=null,ta=0;var a=e.return;try{if(xm(t,a,e,n,mt)){Ht=1,pi(t,Se(n,t.current)),dt=null;return}}catch(i){if(a!==null)throw dt=a,i;Ht=1,pi(t,Se(n,t.current)),dt=null;return}e.flags&32768?(yt||l===1?t=!0:xl||(mt&536870912)!==0?t=!1:(yn=t=!0,(l===2||l===9||l===3||l===6)&&(l=de.current,l!==null&&l.tag===13&&(l.flags|=16384))),id(e,t)):Mi(e)}function Mi(t){var e=t;do{if((e.flags&32768)!==0){id(e,yn);return}t=e.return;var n=_m(e.alternate,e,$e);if(n!==null){dt=n;return}if(e=e.sibling,e!==null){dt=e;return}dt=e=t}while(e!==null);Ht===0&&(Ht=5)}function id(t,e){do{var n=Rm(t.alternate,t);if(n!==null){n.flags&=32767,dt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){dt=t;return}dt=t=n}while(t!==null);Ht=6,dt=null}function ud(t,e,n,l,a,i,u,o,m){t.cancelPendingCommit=null;do zi();while(Xt!==0);if((wt&6)!==0)throw Error(c(327));if(e!==null){if(e===t.current)throw Error(c(177));if(i=e.lanes|e.childLanes,i|=Bu,y0(t,n,i,u,o,m),t===Mt&&(dt=Mt=null,mt=0),Nl=e,bn=t,Pe=n,Yc=i,Qc=a,Ff=l,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,km(Oa,function(){return fd(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||l){l=_.T,_.T=null,a=k.p,k.p=2,u=wt,wt|=4;try{Mm(t,e,n)}finally{wt=u,k.p=a,_.T=l}}Xt=1,cd(),od(),rd()}}function cd(){if(Xt===1){Xt=0;var t=bn,e=Nl,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=_.T,_.T=null;var l=k.p;k.p=2;var a=wt;wt|=4;try{kf(e,t);var i=ao,u=Zr(t.containerInfo),o=i.focusedElem,m=i.selectionRange;if(u!==o&&o&&o.ownerDocument&&Vr(o.ownerDocument.documentElement,o)){if(m!==null&&Ru(o)){var A=m.start,R=m.end;if(R===void 0&&(R=A),"selectionStart"in o)o.selectionStart=A,o.selectionEnd=Math.min(R,o.value.length);else{var D=o.ownerDocument||document,x=D&&D.defaultView||window;if(x.getSelection){var C=x.getSelection(),V=o.textContent.length,at=Math.min(m.start,V),Rt=m.end===void 0?at:Math.min(m.end,V);!C.extend&&at>Rt&&(u=Rt,Rt=at,at=u);var S=Xr(o,at),y=Xr(o,Rt);if(S&&y&&(C.rangeCount!==1||C.anchorNode!==S.node||C.anchorOffset!==S.offset||C.focusNode!==y.node||C.focusOffset!==y.offset)){var T=D.createRange();T.setStart(S.node,S.offset),C.removeAllRanges(),at>Rt?(C.addRange(T),C.extend(y.node,y.offset)):(T.setEnd(y.node,y.offset),C.addRange(T))}}}}for(D=[],C=o;C=C.parentNode;)C.nodeType===1&&D.push({element:C,left:C.scrollLeft,top:C.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<D.length;o++){var M=D[o];M.element.scrollLeft=M.left,M.element.scrollTop=M.top}}Qi=!!lo,ao=lo=null}finally{wt=a,k.p=l,_.T=n}}t.current=e,Xt=2}}function od(){if(Xt===2){Xt=0;var t=bn,e=Nl,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=_.T,_.T=null;var l=k.p;k.p=2;var a=wt;wt|=4;try{Hf(t,e.alternate,e)}finally{wt=a,k.p=l,_.T=n}}Xt=3}}function rd(){if(Xt===4||Xt===3){Xt=0,c0();var t=bn,e=Nl,n=Pe,l=Ff;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Xt=5:(Xt=0,Nl=bn=null,sd(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(vn=null),su(n),e=e.stateNode,oe&&typeof oe.onCommitFiberRoot=="function")try{oe.onCommitFiberRoot(Hl,e,void 0,(e.current.flags&128)===128)}catch{}if(l!==null){e=_.T,a=k.p,k.p=2,_.T=null;try{for(var i=t.onRecoverableError,u=0;u<l.length;u++){var o=l[u];i(o.value,{componentStack:o.stack})}}finally{_.T=e,k.p=a}}(Pe&3)!==0&&zi(),Oe(t),a=t.pendingLanes,(n&261930)!==0&&(a&42)!==0?t===Xc?pa++:(pa=0,Xc=t):pa=0,va(0)}}function sd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,$l(e)))}function zi(){return cd(),od(),rd(),fd()}function fd(){if(Xt!==5)return!1;var t=bn,e=Yc;Yc=0;var n=su(Pe),l=_.T,a=k.p;try{k.p=32>n?32:n,_.T=null,n=Qc,Qc=null;var i=bn,u=Pe;if(Xt=0,Nl=bn=null,Pe=0,(wt&6)!==0)throw Error(c(331));var o=wt;if(wt|=4,Zf(i.current),Qf(i,i.current,u,n),wt=o,va(0,!1),oe&&typeof oe.onPostCommitFiberRoot=="function")try{oe.onPostCommitFiberRoot(Hl,i)}catch{}return!0}finally{k.p=a,_.T=l,sd(t,e)}}function dd(t,e,n){e=Se(n,e),e=wc(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(Ll(t,2),Oe(t))}function xt(t,e,n){if(t.tag===3)dd(t,t,n);else for(;e!==null;){if(e.tag===3){dd(e,t,n);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(vn===null||!vn.has(l))){t=Se(n,t),n=hf(2),l=dn(e,n,2),l!==null&&(mf(n,l,e,t),Ll(l,2),Oe(l));break}}e=e.return}}function Kc(t,e,n){var l=t.pingCache;if(l===null){l=t.pingCache=new Om;var a=new Set;l.set(e,a)}else a=l.get(e),a===void 0&&(a=new Set,l.set(e,a));a.has(n)||(qc=!0,a.add(n),t=Lm.bind(null,t,e,n),e.then(t,t))}function Lm(t,e,n){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Mt===t&&(mt&n)===n&&(Ht===4||Ht===3&&(mt&62914560)===mt&&300>ce()-xi?(wt&2)===0&&_l(t,0):Gc|=n,Cl===mt&&(Cl=0)),Oe(t)}function hd(t,e){e===0&&(e=ur()),t=Un(t,e),t!==null&&(Ll(t,e),Oe(t))}function qm(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),hd(t,n)}function Gm(t,e){var n=0;switch(t.tag){case 31:case 13:var l=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(c(314))}l!==null&&l.delete(e),hd(t,n)}function km(t,e){return uu(t,e)}var Di=null,Ml=null,Jc=!1,Oi=!1,Fc=!1,En=0;function Oe(t){t!==Ml&&t.next===null&&(Ml===null?Di=Ml=t:Ml=Ml.next=t),Oi=!0,Jc||(Jc=!0,Qm())}function va(t,e){if(!Fc&&Oi){Fc=!0;do for(var n=!1,l=Di;l!==null;){if(t!==0){var a=l.pendingLanes;if(a===0)var i=0;else{var u=l.suspendedLanes,o=l.pingedLanes;i=(1<<31-re(42|t)+1)-1,i&=a&~(u&~o),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,pd(l,i))}else i=mt,i=ja(l,l===Mt?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||jl(l,i)||(n=!0,pd(l,i));l=l.next}while(n);Fc=!1}}function Ym(){md()}function md(){Oi=Jc=!1;var t=0;En!==0&&Pm()&&(t=En);for(var e=ce(),n=null,l=Di;l!==null;){var a=l.next,i=gd(l,e);i===0?(l.next=null,n===null?Di=a:n.next=a,a===null&&(Ml=n)):(n=l,(t!==0||(i&3)!==0)&&(Oi=!0)),l=a}Xt!==0&&Xt!==5||va(t),En!==0&&(En=0)}function gd(t,e){for(var n=t.suspendedLanes,l=t.pingedLanes,a=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-re(i),o=1<<u,m=a[u];m===-1?((o&n)===0||(o&l)!==0)&&(a[u]=g0(o,e)):m<=e&&(t.expiredLanes|=o),i&=~o}if(e=Mt,n=mt,n=ja(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,n===0||t===e&&(At===2||At===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&cu(l),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||jl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(l!==null&&cu(l),su(n)){case 2:case 8:n=ar;break;case 32:n=Oa;break;case 268435456:n=ir;break;default:n=Oa}return l=yd.bind(null,t),n=uu(n,l),t.callbackPriority=e,t.callbackNode=n,e}return l!==null&&l!==null&&cu(l),t.callbackPriority=2,t.callbackNode=null,2}function yd(t,e){if(Xt!==0&&Xt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(zi()&&t.callbackNode!==n)return null;var l=mt;return l=ja(t,t===Mt?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(Wf(t,l,e),gd(t,ce()),t.callbackNode!=null&&t.callbackNode===n?yd.bind(null,t):null)}function pd(t,e){if(zi())return null;Wf(t,e,!0)}function Qm(){eg(function(){(wt&6)!==0?uu(lr,Ym):md()})}function Ic(){if(En===0){var t=gl;t===0&&(t=Ba,Ba<<=1,(Ba&261888)===0&&(Ba=256)),En=t}return En}function vd(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:ka(""+t)}function bd(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function Xm(t,e,n,l,a){if(e==="submit"&&n&&n.stateNode===a){var i=vd((a[te]||null).action),u=l.submitter;u&&(e=(e=u[te]||null)?vd(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var o=new Va("action","action",null,l,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(En!==0){var m=u?bd(a,u):new FormData(a);yc(n,{pending:!0,data:m,method:a.method,action:i},null,m)}}else typeof i=="function"&&(o.preventDefault(),m=u?bd(a,u):new FormData(a),yc(n,{pending:!0,data:m,method:a.method,action:i},i,m))},currentTarget:a}]})}}for(var Wc=0;Wc<Ou.length;Wc++){var $c=Ou[Wc],Vm=$c.toLowerCase(),Zm=$c[0].toUpperCase()+$c.slice(1);Ne(Vm,"on"+Zm)}Ne(Fr,"onAnimationEnd"),Ne(Ir,"onAnimationIteration"),Ne(Wr,"onAnimationStart"),Ne("dblclick","onDoubleClick"),Ne("focusin","onFocus"),Ne("focusout","onBlur"),Ne(om,"onTransitionRun"),Ne(rm,"onTransitionStart"),Ne(sm,"onTransitionCancel"),Ne($r,"onTransitionEnd"),el("onMouseEnter",["mouseout","mouseover"]),el("onMouseLeave",["mouseout","mouseover"]),el("onPointerEnter",["pointerout","pointerover"]),el("onPointerLeave",["pointerout","pointerover"]),zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zn("onBeforeInput",["compositionend","keypress","textInput","paste"]),zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ba="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Km=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ba));function Sd(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var l=t[n],a=l.event;l=l.listeners;t:{var i=void 0;if(e)for(var u=l.length-1;0<=u;u--){var o=l[u],m=o.instance,A=o.currentTarget;if(o=o.listener,m!==i&&a.isPropagationStopped())break t;i=o,a.currentTarget=A;try{i(a)}catch(R){Ja(R)}a.currentTarget=null,i=m}else for(u=0;u<l.length;u++){if(o=l[u],m=o.instance,A=o.currentTarget,o=o.listener,m!==i&&a.isPropagationStopped())break t;i=o,a.currentTarget=A;try{i(a)}catch(R){Ja(R)}a.currentTarget=null,i=m}}}}function ht(t,e){var n=e[fu];n===void 0&&(n=e[fu]=new Set);var l=t+"__bubble";n.has(l)||(Ed(e,t,2,!1),n.add(l))}function Pc(t,e,n){var l=0;e&&(l|=4),Ed(n,t,l,e)}var Bi="_reactListening"+Math.random().toString(36).slice(2);function to(t){if(!t[Bi]){t[Bi]=!0,hr.forEach(function(n){n!=="selectionchange"&&(Km.has(n)||Pc(n,!1,t),Pc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Bi]||(e[Bi]=!0,Pc("selectionchange",!1,e))}}function Ed(t,e,n,l){switch(Id(e)){case 2:var a=Eg;break;case 8:a=wg;break;default:a=yo}n=a.bind(null,e,n,t),a=void 0,!Su||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),l?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function eo(t,e,n,l,a){var i=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var u=l.tag;if(u===3||u===4){var o=l.stateNode.containerInfo;if(o===a)break;if(u===4)for(u=l.return;u!==null;){var m=u.tag;if((m===3||m===4)&&u.stateNode.containerInfo===a)return;u=u.return}for(;o!==null;){if(u=$n(o),u===null)return;if(m=u.tag,m===5||m===6||m===26||m===27){l=i=u;continue t}o=o.parentNode}}l=l.return}xr(function(){var A=i,R=vu(n),D=[];t:{var x=Pr.get(t);if(x!==void 0){var C=Va,V=t;switch(t){case"keypress":if(Qa(n)===0)break t;case"keydown":case"keyup":C=G0;break;case"focusin":V="focus",C=Au;break;case"focusout":V="blur",C=Au;break;case"beforeblur":case"afterblur":C=Au;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=_r;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=_0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=Q0;break;case Fr:case Ir:case Wr:C=z0;break;case $r:C=V0;break;case"scroll":case"scrollend":C=C0;break;case"wheel":C=K0;break;case"copy":case"cut":case"paste":C=O0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=Mr;break;case"toggle":case"beforetoggle":C=F0}var at=(e&4)!==0,Rt=!at&&(t==="scroll"||t==="scrollend"),S=at?x!==null?x+"Capture":null:x;at=[];for(var y=A,T;y!==null;){var M=y;if(T=M.stateNode,M=M.tag,M!==5&&M!==26&&M!==27||T===null||S===null||(M=kl(y,S),M!=null&&at.push(Sa(y,M,T))),Rt)break;y=y.return}0<at.length&&(x=new C(x,V,null,n,R),D.push({event:x,listeners:at}))}}if((e&7)===0){t:{if(x=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",x&&n!==pu&&(V=n.relatedTarget||n.fromElement)&&($n(V)||V[Wn]))break t;if((C||x)&&(x=R.window===R?R:(x=R.ownerDocument)?x.defaultView||x.parentWindow:window,C?(V=n.relatedTarget||n.toElement,C=A,V=V?$n(V):null,V!==null&&(Rt=d(V),at=V.tag,V!==Rt||at!==5&&at!==27&&at!==6)&&(V=null)):(C=null,V=A),C!==V)){if(at=_r,M="onMouseLeave",S="onMouseEnter",y="mouse",(t==="pointerout"||t==="pointerover")&&(at=Mr,M="onPointerLeave",S="onPointerEnter",y="pointer"),Rt=C==null?x:Gl(C),T=V==null?x:Gl(V),x=new at(M,y+"leave",C,n,R),x.target=Rt,x.relatedTarget=T,M=null,$n(R)===A&&(at=new at(S,y+"enter",V,n,R),at.target=T,at.relatedTarget=Rt,M=at),Rt=M,C&&V)e:{for(at=Jm,S=C,y=V,T=0,M=S;M;M=at(M))T++;M=0;for(var et=y;et;et=at(et))M++;for(;0<T-M;)S=at(S),T--;for(;0<M-T;)y=at(y),M--;for(;T--;){if(S===y||y!==null&&S===y.alternate){at=S;break e}S=at(S),y=at(y)}at=null}else at=null;C!==null&&wd(D,x,C,at,!1),V!==null&&Rt!==null&&wd(D,Rt,V,at,!0)}}t:{if(x=A?Gl(A):window,C=x.nodeName&&x.nodeName.toLowerCase(),C==="select"||C==="input"&&x.type==="file")var vt=Lr;else if(Hr(x))if(qr)vt=im;else{vt=lm;var I=nm}else C=x.nodeName,!C||C.toLowerCase()!=="input"||x.type!=="checkbox"&&x.type!=="radio"?A&&yu(A.elementType)&&(vt=Lr):vt=am;if(vt&&(vt=vt(t,A))){jr(D,vt,n,R);break t}I&&I(t,x,A),t==="focusout"&&A&&x.type==="number"&&A.memoizedProps.value!=null&&gu(x,"number",x.value)}switch(I=A?Gl(A):window,t){case"focusin":(Hr(I)||I.contentEditable==="true")&&(cl=I,Mu=A,Fl=null);break;case"focusout":Fl=Mu=cl=null;break;case"mousedown":zu=!0;break;case"contextmenu":case"mouseup":case"dragend":zu=!1,Kr(D,n,R);break;case"selectionchange":if(cm)break;case"keydown":case"keyup":Kr(D,n,R)}var rt;if(Cu)t:{switch(t){case"compositionstart":var gt="onCompositionStart";break t;case"compositionend":gt="onCompositionEnd";break t;case"compositionupdate":gt="onCompositionUpdate";break t}gt=void 0}else ul?Br(t,n)&&(gt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(gt="onCompositionStart");gt&&(zr&&n.locale!=="ko"&&(ul||gt!=="onCompositionStart"?gt==="onCompositionEnd"&&ul&&(rt=Cr()):(an=R,Eu="value"in an?an.value:an.textContent,ul=!0)),I=Ui(A,gt),0<I.length&&(gt=new Rr(gt,t,null,n,R),D.push({event:gt,listeners:I}),rt?gt.data=rt:(rt=Ur(n),rt!==null&&(gt.data=rt)))),(rt=W0?$0(t,n):P0(t,n))&&(gt=Ui(A,"onBeforeInput"),0<gt.length&&(I=new Rr("onBeforeInput","beforeinput",null,n,R),D.push({event:I,listeners:gt}),I.data=rt)),Xm(D,t,A,n,R)}Sd(D,e)})}function Sa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ui(t,e){for(var n=e+"Capture",l=[];t!==null;){var a=t,i=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||i===null||(a=kl(t,n),a!=null&&l.unshift(Sa(t,a,i)),a=kl(t,e),a!=null&&l.push(Sa(t,a,i))),t.tag===3)return l;t=t.return}return[]}function Jm(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function wd(t,e,n,l,a){for(var i=e._reactName,u=[];n!==null&&n!==l;){var o=n,m=o.alternate,A=o.stateNode;if(o=o.tag,m!==null&&m===l)break;o!==5&&o!==26&&o!==27||A===null||(m=A,a?(A=kl(n,i),A!=null&&u.unshift(Sa(n,A,m))):a||(A=kl(n,i),A!=null&&u.push(Sa(n,A,m)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var Fm=/\r\n?/g,Im=/\u0000|\uFFFD/g;function Td(t){return(typeof t=="string"?t:""+t).replace(Fm,`
`).replace(Im,"")}function Ad(t,e){return e=Td(e),Td(t)===e}function _t(t,e,n,l,a,i){switch(n){case"children":typeof l=="string"?e==="body"||e==="textarea"&&l===""||ll(t,l):(typeof l=="number"||typeof l=="bigint")&&e!=="body"&&ll(t,""+l);break;case"className":qa(t,"class",l);break;case"tabIndex":qa(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":qa(t,n,l);break;case"style":Tr(t,l,i);break;case"data":if(e!=="object"){qa(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=ka(""+l),t.setAttribute(n,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",a.name,a,null),_t(t,e,"formEncType",a.formEncType,a,null),_t(t,e,"formMethod",a.formMethod,a,null),_t(t,e,"formTarget",a.formTarget,a,null)):(_t(t,e,"encType",a.encType,a,null),_t(t,e,"method",a.method,a,null),_t(t,e,"target",a.target,a,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=ka(""+l),t.setAttribute(n,l);break;case"onClick":l!=null&&(t.onclick=Le);break;case"onScroll":l!=null&&ht("scroll",t);break;case"onScrollEnd":l!=null&&ht("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(c(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}n=ka(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,""+l):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":l===!0?t.setAttribute(n,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,l):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(n,l):t.removeAttribute(n);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(n):t.setAttribute(n,l);break;case"popover":ht("beforetoggle",t),ht("toggle",t),La(t,"popover",l);break;case"xlinkActuate":je(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":je(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":je(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":je(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":je(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":je(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":je(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":je(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":je(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":La(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=A0.get(n)||n,La(t,n,l))}}function no(t,e,n,l,a,i){switch(n){case"style":Tr(t,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(c(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"children":typeof l=="string"?ll(t,l):(typeof l=="number"||typeof l=="bigint")&&ll(t,""+l);break;case"onScroll":l!=null&&ht("scroll",t);break;case"onScrollEnd":l!=null&&ht("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Le);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!mr.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),i=t[te]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,a),typeof l=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,l,a);break t}n in t?t[n]=l:l===!0?t.setAttribute(n,""):La(t,n,l)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ht("error",t),ht("load",t);var l=!1,a=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":l=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,i,u,n,null)}}a&&_t(t,e,"srcSet",n.srcSet,n,null),l&&_t(t,e,"src",n.src,n,null);return;case"input":ht("invalid",t);var o=i=u=a=null,m=null,A=null;for(l in n)if(n.hasOwnProperty(l)){var R=n[l];if(R!=null)switch(l){case"name":a=R;break;case"type":u=R;break;case"checked":m=R;break;case"defaultChecked":A=R;break;case"value":i=R;break;case"defaultValue":o=R;break;case"children":case"dangerouslySetInnerHTML":if(R!=null)throw Error(c(137,e));break;default:_t(t,e,l,R,n,null)}}br(t,i,o,m,A,u,a,!1);return;case"select":ht("invalid",t),l=u=i=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":i=o;break;case"defaultValue":u=o;break;case"multiple":l=o;default:_t(t,e,a,o,n,null)}e=i,n=u,t.multiple=!!l,e!=null?nl(t,!!l,e,!1):n!=null&&nl(t,!!l,n,!0);return;case"textarea":ht("invalid",t),i=a=l=null;for(u in n)if(n.hasOwnProperty(u)&&(o=n[u],o!=null))switch(u){case"value":l=o;break;case"defaultValue":a=o;break;case"children":i=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(c(91));break;default:_t(t,e,u,o,n,null)}Er(t,l,a,i);return;case"option":for(m in n)if(n.hasOwnProperty(m)&&(l=n[m],l!=null))switch(m){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:_t(t,e,m,l,n,null)}return;case"dialog":ht("beforetoggle",t),ht("toggle",t),ht("cancel",t),ht("close",t);break;case"iframe":case"object":ht("load",t);break;case"video":case"audio":for(l=0;l<ba.length;l++)ht(ba[l],t);break;case"image":ht("error",t),ht("load",t);break;case"details":ht("toggle",t);break;case"embed":case"source":case"link":ht("error",t),ht("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(A in n)if(n.hasOwnProperty(A)&&(l=n[A],l!=null))switch(A){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,A,l,n,null)}return;default:if(yu(e)){for(R in n)n.hasOwnProperty(R)&&(l=n[R],l!==void 0&&no(t,e,R,l,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(l=n[o],l!=null&&_t(t,e,o,l,n,null))}function Wm(t,e,n,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,u=null,o=null,m=null,A=null,R=null;for(C in n){var D=n[C];if(n.hasOwnProperty(C)&&D!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":m=D;default:l.hasOwnProperty(C)||_t(t,e,C,null,l,D)}}for(var x in l){var C=l[x];if(D=n[x],l.hasOwnProperty(x)&&(C!=null||D!=null))switch(x){case"type":i=C;break;case"name":a=C;break;case"checked":A=C;break;case"defaultChecked":R=C;break;case"value":u=C;break;case"defaultValue":o=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(c(137,e));break;default:C!==D&&_t(t,e,x,C,l,D)}}mu(t,u,o,m,A,R,i,a);return;case"select":C=u=o=x=null;for(i in n)if(m=n[i],n.hasOwnProperty(i)&&m!=null)switch(i){case"value":break;case"multiple":C=m;default:l.hasOwnProperty(i)||_t(t,e,i,null,l,m)}for(a in l)if(i=l[a],m=n[a],l.hasOwnProperty(a)&&(i!=null||m!=null))switch(a){case"value":x=i;break;case"defaultValue":o=i;break;case"multiple":u=i;default:i!==m&&_t(t,e,a,i,l,m)}e=o,n=u,l=C,x!=null?nl(t,!!n,x,!1):!!l!=!!n&&(e!=null?nl(t,!!n,e,!0):nl(t,!!n,n?[]:"",!1));return;case"textarea":C=x=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!l.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:_t(t,e,o,null,l,a)}for(u in l)if(a=l[u],i=n[u],l.hasOwnProperty(u)&&(a!=null||i!=null))switch(u){case"value":x=a;break;case"defaultValue":C=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(c(91));break;default:a!==i&&_t(t,e,u,a,l,i)}Sr(t,x,C);return;case"option":for(var V in n)if(x=n[V],n.hasOwnProperty(V)&&x!=null&&!l.hasOwnProperty(V))switch(V){case"selected":t.selected=!1;break;default:_t(t,e,V,null,l,x)}for(m in l)if(x=l[m],C=n[m],l.hasOwnProperty(m)&&x!==C&&(x!=null||C!=null))switch(m){case"selected":t.selected=x&&typeof x!="function"&&typeof x!="symbol";break;default:_t(t,e,m,x,l,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var at in n)x=n[at],n.hasOwnProperty(at)&&x!=null&&!l.hasOwnProperty(at)&&_t(t,e,at,null,l,x);for(A in l)if(x=l[A],C=n[A],l.hasOwnProperty(A)&&x!==C&&(x!=null||C!=null))switch(A){case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(c(137,e));break;default:_t(t,e,A,x,l,C)}return;default:if(yu(e)){for(var Rt in n)x=n[Rt],n.hasOwnProperty(Rt)&&x!==void 0&&!l.hasOwnProperty(Rt)&&no(t,e,Rt,void 0,l,x);for(R in l)x=l[R],C=n[R],!l.hasOwnProperty(R)||x===C||x===void 0&&C===void 0||no(t,e,R,x,l,C);return}}for(var S in n)x=n[S],n.hasOwnProperty(S)&&x!=null&&!l.hasOwnProperty(S)&&_t(t,e,S,null,l,x);for(D in l)x=l[D],C=n[D],!l.hasOwnProperty(D)||x===C||x==null&&C==null||_t(t,e,D,x,l,C)}function xd(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function $m(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),l=0;l<n.length;l++){var a=n[l],i=a.transferSize,u=a.initiatorType,o=a.duration;if(i&&o&&xd(u)){for(u=0,o=a.responseEnd,l+=1;l<n.length;l++){var m=n[l],A=m.startTime;if(A>o)break;var R=m.transferSize,D=m.initiatorType;R&&xd(D)&&(m=m.responseEnd,u+=R*(m<o?1:(o-A)/(m-A)))}if(--l,e+=8*(i+u)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var lo=null,ao=null;function Hi(t){return t.nodeType===9?t:t.ownerDocument}function Cd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Nd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function io(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var uo=null;function Pm(){var t=window.event;return t&&t.type==="popstate"?t===uo?!1:(uo=t,!0):(uo=null,!1)}var _d=typeof setTimeout=="function"?setTimeout:void 0,tg=typeof clearTimeout=="function"?clearTimeout:void 0,Rd=typeof Promise=="function"?Promise:void 0,eg=typeof queueMicrotask=="function"?queueMicrotask:typeof Rd<"u"?function(t){return Rd.resolve(null).then(t).catch(ng)}:_d;function ng(t){setTimeout(function(){throw t})}function wn(t){return t==="head"}function Md(t,e){var n=e,l=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(l===0){t.removeChild(a),Bl(e);return}l--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")l++;else if(n==="html")Ea(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Ea(n);for(var i=n.firstChild;i;){var u=i.nextSibling,o=i.nodeName;i[ql]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&Ea(t.ownerDocument.body);n=a}while(n);Bl(e)}function zd(t,e){var n=t;t=0;do{var l=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=l}while(n)}function co(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":co(n),du(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function lg(t,e,n,l){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[ql])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=xe(t.nextSibling),t===null)break}return null}function ag(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=xe(t.nextSibling),t===null))return null;return t}function Dd(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=xe(t.nextSibling),t===null))return null;return t}function oo(t){return t.data==="$?"||t.data==="$~"}function ro(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function ig(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var l=function(){e(),n.removeEventListener("DOMContentLoaded",l)};n.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function xe(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var so=null;function Od(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return xe(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Bd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Ud(t,e,n){switch(e=Hi(n),t){case"html":if(t=e.documentElement,!t)throw Error(c(452));return t;case"head":if(t=e.head,!t)throw Error(c(453));return t;case"body":if(t=e.body,!t)throw Error(c(454));return t;default:throw Error(c(451))}}function Ea(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);du(t)}var Ce=new Map,Hd=new Set;function ji(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=k.d;k.d={f:ug,r:cg,D:og,C:rg,L:sg,m:fg,X:hg,S:dg,M:mg};function ug(){var t=tn.f(),e=_i();return t||e}function cg(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?$s(e):tn.r(t)}var zl=typeof document>"u"?null:document;function jd(t,e,n){var l=zl;if(l&&typeof e=="string"&&e){var a=ve(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),Hd.has(a)||(Hd.add(a),t={rel:t,crossOrigin:n,href:e},l.querySelector(a)===null&&(e=l.createElement("link"),Wt(e,"link",t),Vt(e),l.head.appendChild(e)))}}function og(t){tn.D(t),jd("dns-prefetch",t,null)}function rg(t,e){tn.C(t,e),jd("preconnect",t,e)}function sg(t,e,n){tn.L(t,e,n);var l=zl;if(l&&t&&e){var a='link[rel="preload"][as="'+ve(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+ve(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+ve(n.imageSizes)+'"]')):a+='[href="'+ve(t)+'"]';var i=a;switch(e){case"style":i=Dl(t);break;case"script":i=Ol(t)}Ce.has(i)||(t=N({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ce.set(i,t),l.querySelector(a)!==null||e==="style"&&l.querySelector(wa(i))||e==="script"&&l.querySelector(Ta(i))||(e=l.createElement("link"),Wt(e,"link",t),Vt(e),l.head.appendChild(e)))}}function fg(t,e){tn.m(t,e);var n=zl;if(n&&t){var l=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+ve(l)+'"][href="'+ve(t)+'"]',i=a;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ol(t)}if(!Ce.has(i)&&(t=N({rel:"modulepreload",href:t},e),Ce.set(i,t),n.querySelector(a)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Ta(i)))return}l=n.createElement("link"),Wt(l,"link",t),Vt(l),n.head.appendChild(l)}}}function dg(t,e,n){tn.S(t,e,n);var l=zl;if(l&&t){var a=tl(l).hoistableStyles,i=Dl(t);e=e||"default";var u=a.get(i);if(!u){var o={loading:0,preload:null};if(u=l.querySelector(wa(i)))o.loading=5;else{t=N({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ce.get(i))&&fo(t,n);var m=u=l.createElement("link");Vt(m),Wt(m,"link",t),m._p=new Promise(function(A,R){m.onload=A,m.onerror=R}),m.addEventListener("load",function(){o.loading|=1}),m.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Li(u,e,l)}u={type:"stylesheet",instance:u,count:1,state:o},a.set(i,u)}}}function hg(t,e){tn.X(t,e);var n=zl;if(n&&t){var l=tl(n).hoistableScripts,a=Ol(t),i=l.get(a);i||(i=n.querySelector(Ta(a)),i||(t=N({src:t,async:!0},e),(e=Ce.get(a))&&ho(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function mg(t,e){tn.M(t,e);var n=zl;if(n&&t){var l=tl(n).hoistableScripts,a=Ol(t),i=l.get(a);i||(i=n.querySelector(Ta(a)),i||(t=N({src:t,async:!0,type:"module"},e),(e=Ce.get(a))&&ho(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function Ld(t,e,n,l){var a=(a=st.current)?ji(a):null;if(!a)throw Error(c(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Dl(n.href),n=tl(a).hoistableStyles,l=n.get(e),l||(l={type:"style",instance:null,count:0,state:null},n.set(e,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Dl(n.href);var i=tl(a).hoistableStyles,u=i.get(t);if(u||(a=a.ownerDocument||a,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=a.querySelector(wa(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ce.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ce.set(t,n),i||gg(a,t,n,u.state))),e&&l===null)throw Error(c(528,""));return u}if(e&&l!==null)throw Error(c(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ol(n),n=tl(a).hoistableScripts,l=n.get(e),l||(l={type:"script",instance:null,count:0,state:null},n.set(e,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,t))}}function Dl(t){return'href="'+ve(t)+'"'}function wa(t){return'link[rel="stylesheet"]['+t+"]"}function qd(t){return N({},t,{"data-precedence":t.precedence,precedence:null})}function gg(t,e,n,l){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?l.loading=1:(e=t.createElement("link"),l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2}),Wt(e,"link",n),Vt(e),t.head.appendChild(e))}function Ol(t){return'[src="'+ve(t)+'"]'}function Ta(t){return"script[async]"+t}function Gd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+ve(n.href)+'"]');if(l)return e.instance=l,Vt(l),l;var a=N({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),Vt(l),Wt(l,"style",a),Li(l,n.precedence,t),e.instance=l;case"stylesheet":a=Dl(n.href);var i=t.querySelector(wa(a));if(i)return e.state.loading|=4,e.instance=i,Vt(i),i;l=qd(n),(a=Ce.get(a))&&fo(l,a),i=(t.ownerDocument||t).createElement("link"),Vt(i);var u=i;return u._p=new Promise(function(o,m){u.onload=o,u.onerror=m}),Wt(i,"link",l),e.state.loading|=4,Li(i,n.precedence,t),e.instance=i;case"script":return i=Ol(n.src),(a=t.querySelector(Ta(i)))?(e.instance=a,Vt(a),a):(l=n,(a=Ce.get(i))&&(l=N({},n),ho(l,a)),t=t.ownerDocument||t,a=t.createElement("script"),Vt(a),Wt(a,"link",l),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(c(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,Li(l,n.precedence,t));return e.instance}function Li(t,e,n){for(var l=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=l.length?l[l.length-1]:null,i=a,u=0;u<l.length;u++){var o=l[u];if(o.dataset.precedence===e)i=o;else if(i!==a)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function fo(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function ho(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var qi=null;function kd(t,e,n){if(qi===null){var l=new Map,a=qi=new Map;a.set(n,l)}else a=qi,l=a.get(n),l||(l=new Map,a.set(n,l));if(l.has(t))return l;for(l.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var i=n[a];if(!(i[ql]||i[Kt]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var o=l.get(u);o?o.push(i):l.set(u,[i])}}return l}function Yd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function yg(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Qd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function pg(t,e,n,l){if(n.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var a=Dl(l.href),i=e.querySelector(wa(a));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Gi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Vt(i);return}i=e.ownerDocument||e,l=qd(l),(a=Ce.get(a))&&fo(l,a),i=i.createElement("link"),Vt(i);var u=i;u._p=new Promise(function(o,m){u.onload=o,u.onerror=m}),Wt(i,"link",l),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Gi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var mo=0;function vg(t,e){return t.stylesheets&&t.count===0&&Yi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var l=setTimeout(function(){if(t.stylesheets&&Yi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&mo===0&&(mo=62500*$m());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Yi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>mo?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(a)}}:null}function Gi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Yi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var ki=null;function Yi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,ki=new Map,e.forEach(bg,t),ki=null,Gi.call(t))}function bg(t,e){if(!(e.state.loading&4)){var n=ki.get(t);if(n)var l=n.get(null);else{n=new Map,ki.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var u=a[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),l=u)}l&&n.set(null,l)}a=e.instance,u=a.getAttribute("data-precedence"),i=n.get(u)||l,i===l&&n.set(null,a),n.set(u,a),this.count++,l=Gi.bind(this),a.addEventListener("load",l),a.addEventListener("error",l),i?i.parentNode.insertBefore(a,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Aa={$$typeof:L,Provider:null,Consumer:null,_currentValue:lt,_currentValue2:lt,_threadCount:0};function Sg(t,e,n,l,a,i,u,o,m){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ou(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ou(0),this.hiddenUpdates=ou(null),this.identifierPrefix=l,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=m,this.incompleteTransitions=new Map}function Xd(t,e,n,l,a,i,u,o,m,A,R,D){return t=new Sg(t,e,n,u,m,A,R,D,o),e=1,i===!0&&(e|=24),i=fe(3,null,null,e),t.current=i,i.stateNode=t,e=Zu(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:l,isDehydrated:n,cache:e},Iu(i),t}function Vd(t){return t?(t=sl,t):sl}function Zd(t,e,n,l,a,i){a=Vd(a),l.context===null?l.context=a:l.pendingContext=a,l=fn(e),l.payload={element:n},i=i===void 0?null:i,i!==null&&(l.callback=i),n=dn(t,l,e),n!==null&&(ue(n,t,e),na(n,t,e))}function Kd(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function go(t,e){Kd(t,e),(t=t.alternate)&&Kd(t,e)}function Jd(t){if(t.tag===13||t.tag===31){var e=Un(t,67108864);e!==null&&ue(e,t,67108864),go(t,67108864)}}function Fd(t){if(t.tag===13||t.tag===31){var e=ye();e=ru(e);var n=Un(t,e);n!==null&&ue(n,t,e),go(t,e)}}var Qi=!0;function Eg(t,e,n,l){var a=_.T;_.T=null;var i=k.p;try{k.p=2,yo(t,e,n,l)}finally{k.p=i,_.T=a}}function wg(t,e,n,l){var a=_.T;_.T=null;var i=k.p;try{k.p=8,yo(t,e,n,l)}finally{k.p=i,_.T=a}}function yo(t,e,n,l){if(Qi){var a=po(l);if(a===null)eo(t,e,l,Xi,n),Wd(t,l);else if(Ag(a,t,e,n,l))l.stopPropagation();else if(Wd(t,l),e&4&&-1<Tg.indexOf(t)){for(;a!==null;){var i=Pn(a);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Mn(i.pendingLanes);if(u!==0){var o=i;for(o.pendingLanes|=2,o.entangledLanes|=2;u;){var m=1<<31-re(u);o.entanglements[1]|=m,u&=~m}Oe(i),(wt&6)===0&&(Ci=ce()+500,va(0))}}break;case 31:case 13:o=Un(i,2),o!==null&&ue(o,i,2),_i(),go(i,2)}if(i=po(l),i===null&&eo(t,e,l,Xi,n),i===a)break;a=i}a!==null&&l.stopPropagation()}else eo(t,e,l,null,n)}}function po(t){return t=vu(t),vo(t)}var Xi=null;function vo(t){if(Xi=null,t=$n(t),t!==null){var e=d(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=b(e),t!==null)return t;t=null}else if(n===31){if(t=w(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Xi=t,null}function Id(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(o0()){case lr:return 2;case ar:return 8;case Oa:case r0:return 32;case ir:return 268435456;default:return 32}default:return 32}}var bo=!1,Tn=null,An=null,xn=null,xa=new Map,Ca=new Map,Cn=[],Tg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Wd(t,e){switch(t){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":An=null;break;case"mouseover":case"mouseout":xn=null;break;case"pointerover":case"pointerout":xa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ca.delete(e.pointerId)}}function Na(t,e,n,l,a,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:l,nativeEvent:i,targetContainers:[a]},e!==null&&(e=Pn(e),e!==null&&Jd(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function Ag(t,e,n,l,a){switch(e){case"focusin":return Tn=Na(Tn,t,e,n,l,a),!0;case"dragenter":return An=Na(An,t,e,n,l,a),!0;case"mouseover":return xn=Na(xn,t,e,n,l,a),!0;case"pointerover":var i=a.pointerId;return xa.set(i,Na(xa.get(i)||null,t,e,n,l,a)),!0;case"gotpointercapture":return i=a.pointerId,Ca.set(i,Na(Ca.get(i)||null,t,e,n,l,a)),!0}return!1}function $d(t){var e=$n(t.target);if(e!==null){var n=d(e);if(n!==null){if(e=n.tag,e===13){if(e=b(n),e!==null){t.blockedOn=e,fr(t.priority,function(){Fd(n)});return}}else if(e===31){if(e=w(n),e!==null){t.blockedOn=e,fr(t.priority,function(){Fd(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Vi(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=po(t.nativeEvent);if(n===null){n=t.nativeEvent;var l=new n.constructor(n.type,n);pu=l,n.target.dispatchEvent(l),pu=null}else return e=Pn(n),e!==null&&Jd(e),t.blockedOn=n,!1;e.shift()}return!0}function Pd(t,e,n){Vi(t)&&n.delete(e)}function xg(){bo=!1,Tn!==null&&Vi(Tn)&&(Tn=null),An!==null&&Vi(An)&&(An=null),xn!==null&&Vi(xn)&&(xn=null),xa.forEach(Pd),Ca.forEach(Pd)}function Zi(t,e){t.blockedOn===e&&(t.blockedOn=null,bo||(bo=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,xg)))}var Ki=null;function th(t){Ki!==t&&(Ki=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Ki===t&&(Ki=null);for(var e=0;e<t.length;e+=3){var n=t[e],l=t[e+1],a=t[e+2];if(typeof l!="function"){if(vo(l||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,yc(i,{pending:!0,data:a,method:n.method,action:l},l,a))}}))}function Bl(t){function e(m){return Zi(m,t)}Tn!==null&&Zi(Tn,t),An!==null&&Zi(An,t),xn!==null&&Zi(xn,t),xa.forEach(e),Ca.forEach(e);for(var n=0;n<Cn.length;n++){var l=Cn[n];l.blockedOn===t&&(l.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)$d(n),n.blockedOn===null&&Cn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(l=0;l<n.length;l+=3){var a=n[l],i=n[l+1],u=a[te]||null;if(typeof i=="function")u||th(n);else if(u){var o=null;if(i&&i.hasAttribute("formAction")){if(a=i,u=i[te]||null)o=u.formAction;else if(vo(a)!==null)continue}else o=u.action;typeof o=="function"?n[l+1]=o:(n.splice(l,3),l-=3),th(n)}}}function eh(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return a=u})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),l||setTimeout(n,20)}function n(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function So(t){this._internalRoot=t}Ji.prototype.render=So.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(c(409));var n=e.current,l=ye();Zd(n,l,t,e,null,null)},Ji.prototype.unmount=So.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Zd(t.current,2,null,t,null,null),_i(),e[Wn]=null}};function Ji(t){this._internalRoot=t}Ji.prototype.unstable_scheduleHydration=function(t){if(t){var e=sr();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Cn.length&&e!==0&&e<Cn[n].priority;n++);Cn.splice(n,0,t),n===0&&$d(t)}};var nh=f.version;if(nh!=="19.2.6")throw Error(c(527,nh,"19.2.6"));k.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(c(188)):(t=Object.keys(t).join(","),Error(c(268,t)));return t=v(e),t=t!==null?z(t):null,t=t===null?null:t.stateNode,t};var Cg={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:_,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fi.isDisabled&&Fi.supportsFiber)try{Hl=Fi.inject(Cg),oe=Fi}catch{}}return Ra.createRoot=function(t,e){if(!s(t))throw Error(c(299));var n=!1,l="",a=rf,i=sf,u=ff;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=Xd(t,1,!1,null,null,n,l,null,a,i,u,eh),t[Wn]=e.current,to(t),new So(e)},Ra.hydrateRoot=function(t,e,n){if(!s(t))throw Error(c(299));var l=!1,a="",i=rf,u=sf,o=ff,m=null;return n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(m=n.formState)),e=Xd(t,1,!0,e,n??null,l,a,m,i,u,o,eh),e.context=Vd(null),n=e.current,l=ye(),l=ru(l),a=fn(l),a.callback=null,dn(n,a,l),n=l,e.current.lanes=n,Ll(e,n),Oe(e),t[Wn]=e.current,to(t),new Ji(e)},Ra.version="19.2.6",Ra}var dh;function jg(){if(dh)return To.exports;dh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),To.exports=Hg(),To.exports}var Lg=jg();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qg=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Jh=(...r)=>r.filter((f,h,c)=>!!f&&f.trim()!==""&&c.indexOf(f)===h).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Gg={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kg=St.forwardRef(({color:r="currentColor",size:f=24,strokeWidth:h=2,absoluteStrokeWidth:c,className:s="",children:d,iconNode:b,...w},g)=>St.createElement("svg",{ref:g,...Gg,width:f,height:f,stroke:r,strokeWidth:c?Number(h)*24/Number(f):h,className:Jh("lucide",s),...w},[...b.map(([v,z])=>St.createElement(v,z)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=(r,f)=>{const h=St.forwardRef(({className:c,...s},d)=>St.createElement(kg,{ref:d,iconNode:f,className:Jh(`lucide-${qg(r)}`,c),...s}));return h.displayName=`${r}`,h};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yg=Ue("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eu=Ue("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fh=Ue("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ih=Ue("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qg=Ue("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hh=Ue("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xg=Ue("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vg=Ue("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zg=Ue("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wh=Ue("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Pi({group:r,size:f="md",dim:h}){const c=f==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return E.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${r.bgClass} ${r.textClass} ${c} ${h?"opacity-40":""}`,children:r.label})}function en(r){const[f,h]=r.split(":").map(Number);return f*60+h}const Kg=30;function Jg(r,f){let h=-1;for(let w=0;w<r.length&&en(r[w])<=f;w++)h=w;if(h===-1)return{index:-1,progress:0};const c=en(r[h]),s=r[h+1]?en(r[h+1]):null,d=s!==null?s:c+Kg;if(f>=d)return{index:-1,progress:0};const b=d===c?0:(f-c)/(d-c);return{index:h,progress:Math.max(0,Math.min(1,b))}}function $h(r){const[f,h]=r.split(":").map(Number);return`${f%12||12}:${h.toString().padStart(2,"0")}`}function Ph(r){const[f]=r.split(":").map(Number);return f>=12?"PM":"AM"}function Po(){const r=new Date;return r.getHours()*60+r.getMinutes()}function tu(){const r=new Date,f=r.getFullYear(),h=String(r.getMonth()+1).padStart(2,"0"),c=String(r.getDate()).padStart(2,"0");return`${f}-${h}-${c}`}function Fg(){const r=new Date,f=r.getHours(),h=r.getMinutes(),c=f%12||12,s=f>=12?"PM":"AM";return`${c}:${h.toString().padStart(2,"0")} ${s}`}function Ig(r){if(r<=0)return"";if(r<60)return`${r} min`;const f=Math.floor(r/60),h=r%60;return h===0?`${f}h`:`${f}h ${h}m`}function Wg(r){const f=new Date(r);if(isNaN(f.getTime()))return r;const h=f.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),c=f.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${h}, ${c}`}function mh(r,f){return r.flatMap(h=>{const c=f.find(s=>s.id===h);return c?[c]:[]})}function $g({event:r,runGroups:f,past:h}){const c=mh(r.onTrack,f),s=mh(r.inClass??[],f);return E.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${h?"opacity-60":""}`,children:E.jsxs("div",{className:"flex gap-4",children:[E.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[$h(r.time),E.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:Ph(r.time)})]}),E.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[c.length>0&&E.jsxs("div",{className:"flex items-center gap-3",children:[E.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),E.jsx("div",{className:"flex flex-wrap gap-1.5",children:c.map(d=>E.jsx(Pi,{group:d},d.id))})]}),s.length>0&&E.jsxs(E.Fragment,{children:[c.length>0&&E.jsx("div",{className:"border-t border-gray-100"}),E.jsxs("div",{className:"flex items-center gap-3",children:[E.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),E.jsx("div",{className:"flex flex-wrap gap-1.5",children:s.map(d=>E.jsx(Pi,{group:d},d.id))})]})]}),r.note&&E.jsx("p",{className:"text-xs italic text-gray-500",children:r.note})]})]})})}function Pg({event:r,past:f}){const h=r.type==="lunch"||r.type==="special";return E.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${h?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${f?"opacity-60":""}`,children:E.jsxs("div",{className:"flex items-center gap-4",children:[E.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[$h(r.time),E.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:Ph(r.time)})]}),h&&E.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:r.type==="lunch"?E.jsx(Zg,{size:16}):E.jsx(Xg,{size:16})}),E.jsxs("div",{children:[E.jsx("p",{className:"text-sm font-medium text-gray-900",children:r.label}),r.subtitle&&E.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:r.subtitle})]})]})})}const Wo=St.forwardRef(({events:r},f)=>{const[,h]=St.useState(0);St.useEffect(()=>{const g=setInterval(()=>h(v=>v+1),3e4);return()=>clearInterval(g)},[]);const c=Po(),d=r.filter(g=>"time"in g).find(g=>en(g.time)>c),b=d?en(d.time)-c:null,w=b!==null?b<=5?"text-red-500":b<=10?"text-orange-500":"text-gray-400":"text-gray-400";return E.jsxs("div",{ref:f,"data-time-indicator":!0,className:"relative my-6",children:[E.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[E.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),E.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),E.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:Fg()}),b!==null&&E.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${w}`,children:["Next event starts in ",E.jsx("span",{className:"font-semibold",children:Ig(b)})]})]})});Wo.displayName="TimeIndicator";function gh({collapsed:r,children:f}){return E.jsx("div",{"data-collapsed":r,"aria-hidden":r,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:r?"0fr":"1fr",opacity:r?0:1,marginBottom:r?0:"0.5rem"},children:E.jsx("div",{className:"overflow-hidden",children:f})})}function t1({events:r,runGroups:f,isToday:h,selectedGroups:c,hidePast:s}){const d=St.useRef(null),[,b]=St.useState(0);St.useEffect(()=>{if(!h)return;const j=setInterval(()=>b(L=>L+1),6e4);return()=>clearInterval(j)},[h]),St.useEffect(()=>{if(!h)return;const j=setTimeout(()=>{var L;(L=d.current)==null||L.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(j)},[h]);const w=Po(),g=r.flatMap(j=>{if(j.type!=="session")return[j];if(c.length===0)return[j];const L=j.onTrack.filter(W=>c.includes(W)),X=(j.inClass??[]).filter(W=>c.includes(W));return L.length===0&&X.length===0?[]:[{...j,onTrack:L,inClass:X}]}),v=g.map(j=>j.type!=="break"&&s&&h&&en(j.time)<w);g.forEach((j,L)=>{if(j.type!=="break")return;const X=g.slice(0,L).some((W,q)=>W.type!=="break"&&!v[q]);v[L]=!X});const z=[],N=[];g.forEach((j,L)=>{j.type!=="break"&&(z.push(L),N.push(j.time))});const{index:B}=h?Jg(N,w):{index:-1},U=B===-1?-1:z[B],Y=h?g.findIndex(j=>j.type!=="break"&&en(j.time)>w):-1,P=h&&Y===-1&&g.length>0,pt=g.length>0&&v.every(Boolean);let F;return E.jsxs("div",{className:"flex flex-col pb-10",children:[g.length>0&&E.jsx(gh,{collapsed:!pt,children:E.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[E.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),E.jsx("p",{className:"text-xs text-gray-400",children:"Every event on today's schedule has already happened."})]})}),g.map((j,L)=>{const X=L===U,W=h&&j.type!=="break"&&!X&&en(j.time)<w;let q=null;!v[L]&&j.type==="session"&&j.sessionNumber!==void 0&&j.sessionNumber!==F&&(F=j.sessionNumber,q=E.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",j.sessionNumber]}));const H=j.type==="break"?E.jsxs("div",{className:"flex items-center gap-2 py-1",children:[E.jsx("div",{className:"h-px flex-1 bg-gray-200"}),E.jsx("span",{className:"text-xs text-gray-400 italic",children:j.label}),E.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):j.type==="session"?E.jsx($g,{event:j,runGroups:f,past:W}):E.jsx(Pg,{event:j,past:W});return E.jsxs(gh,{collapsed:v[L],children:[L===Y&&E.jsx(Wo,{ref:d,events:g}),q,H]},L)}),P&&E.jsx(Wo,{ref:d,events:g})]})}function e1({groups:r,selected:f,onChange:h}){const[c,s]=St.useState(!1),d=g=>h(f.includes(g)?f.filter(v=>v!==g):[...f,g]),b=f.length===0||f.length===r.length,w=r.filter(g=>f.includes(g.id));return E.jsxs("div",{className:"relative",children:[E.jsxs("button",{onClick:()=>s(g=>!g),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[b?E.jsx("span",{className:"text-gray-700",children:"All run groups"}):E.jsx("div",{className:"flex items-center gap-1",children:w.map(g=>E.jsx(Pi,{group:g,size:"sm"},g.id))}),E.jsx(Fh,{size:14,className:"text-gray-400"})]}),c&&E.jsxs(E.Fragment,{children:[E.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>s(!1)}),E.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[r.map(g=>E.jsxs("button",{onClick:()=>d(g.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[E.jsx(Pi,{group:g,size:"md"}),f.includes(g.id)&&E.jsx(eu,{size:14,className:"text-blue-500"})]},g.id)),E.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:E.jsx("button",{onClick:()=>{h([]),s(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:b?"All selected":"Clear filter"})})]})]})]})}function yh(r){const f=tu();return r.days.some(h=>h.date===f)}function ph(){return E.jsxs("span",{className:"inline-flex shrink-0 items-center gap-1 rounded-full bg-red-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-red-700",children:[E.jsx("span",{className:"h-1 w-1 rounded-full bg-red-700 animate-pulse"}),"Live"]})}function n1({events:r,active:f,onChange:h}){const[c,s]=St.useState(!1);return E.jsxs("div",{className:"relative min-w-0 pl-1",children:[E.jsxs("div",{className:"flex items-center gap-1",children:[E.jsxs("button",{onClick:()=>s(d=>!d),className:"flex items-center gap-1 text-left group min-w-0",children:[E.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:f.name}),yh(f)&&E.jsx(ph,{}),E.jsx(Fh,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),f.link&&E.jsx("a",{href:f.link,target:"_blank",rel:"noopener noreferrer","aria-label":"Event page",className:"shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:text-gray-700",children:E.jsx(Qg,{size:14})})]}),E.jsx("p",{className:"text-sm text-gray-500",children:f.subtitle}),c&&E.jsxs(E.Fragment,{children:[E.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>s(!1)}),E.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:r.map(d=>E.jsxs("button",{onClick:()=>{h(d),s(!1)},className:"flex w-full items-center justify-between rounded-lg px-4 py-2.5 hover:bg-gray-50 text-left",children:[E.jsxs("div",{children:[E.jsxs("div",{className:"flex items-center gap-1.5",children:[E.jsx("span",{className:"text-sm font-semibold text-gray-900",children:d.name}),yh(d)&&E.jsx(ph,{})]}),E.jsx("div",{className:"text-xs text-gray-400",children:d.subtitle})]}),d.id===f.id&&E.jsx(eu,{size:14,className:"text-blue-500 ml-3 shrink-0"})]},d.id))})]})]})}function l1({checked:r,onChange:f,label:h}){return E.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[h&&E.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:h}),E.jsx("button",{type:"button",role:"switch","aria-checked":r,onClick:f,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:r?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:E.jsx("span",{style:{position:"absolute",top:"2px",left:r?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Jn=72,a1=110;function i1({children:r}){const[f,h]=St.useState(0),[c,s]=St.useState("idle"),d=St.useRef(null),b=St.useRef(0);St.useEffect(()=>{const z=U=>{window.scrollY===0&&(d.current=U.touches[0].clientY)},N=U=>{if(d.current===null)return;const Y=U.touches[0].clientY-d.current;if(Y<=0){d.current=null;return}U.preventDefault();const P=Y<Jn?Y:Jn+(Y-Jn)*.25;b.current=Math.min(P,a1),h(b.current),s("pulling")},B=()=>{d.current!==null&&(d.current=null,b.current>=Jn?(s("refreshing"),h(Jn*.75),setTimeout(()=>window.location.reload(),600)):(s("releasing"),h(0),b.current=0,setTimeout(()=>s("idle"),250)))};return document.addEventListener("touchstart",z,{passive:!0}),document.addEventListener("touchmove",N,{passive:!1}),document.addEventListener("touchend",B),document.addEventListener("touchcancel",B),()=>{document.removeEventListener("touchstart",z),document.removeEventListener("touchmove",N),document.removeEventListener("touchend",B),document.removeEventListener("touchcancel",B)}},[]);const w=c==="releasing"||c==="refreshing",g=Math.min(f/Jn,1),v=f>=Jn;return E.jsxs(E.Fragment,{children:[E.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${f}px)`,transition:w?"transform 0.25s ease":"none"},children:E.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${v?"text-blue-500":"text-gray-400"}`,children:E.jsx(Vg,{size:16,className:c==="refreshing"?"animate-spin":"",style:c!=="refreshing"?{transform:`rotate(${g*270}deg)`}:void 0})})}),E.jsx("div",{style:{transform:`translateY(${f}px)`,transition:w?"transform 0.25s ease":"none"},children:r})]})}function u1({groups:r}){const f=r.filter(h=>h.description);return f.length===0?null:E.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[E.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),E.jsx("ul",{className:"flex flex-col gap-1.5",children:f.map(h=>E.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[E.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${h.bgClass}`,"aria-hidden":"true"}),E.jsx("span",{className:"font-medium text-gray-900",children:h.label}),E.jsx("span",{className:"text-gray-400",children:"·"}),E.jsx("span",{children:h.description})]},h.id))})]})}const vh=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
// Source: https://github.com/inko9nito/hpde/blob/main/scripts/hpde-widget.js
// Data:   https://inko9nito.github.io/hpde/api/events.json
//
// Setup: install Scriptable → paste this script → long-press Home Screen →
//   Add Widget → Scriptable → Medium → Edit Widget → Script = this script.
// Optional Parameter: comma-separated run group ids (e.g. "orange,blue") to
//   filter session rows. Leave blank to show everything.

const DATA_URL = "https://inko9nito.github.io/hpde/api/events.json"
const SITE_URL = "https://inko9nito.github.io/hpde/"
const CACHE_FILENAME = "hpde-events.json"

const LAST_EVENT_FALLBACK_MIN = 30
// The current event stops being "current" this many minutes before the
// next event begins — the marker leaves the card and moves into the
// between-cards gap.
const CURRENT_END_LOOKAHEAD_MIN = 5
// The marker sits OVERLAPPING THE TOP of the current card for the
// first few minutes of the event, then flips to OVERLAPPING THE
// BOTTOM for the rest of the "current" window. Both states use the
// three-column illusion (dot in the left gutter, bar inside the card
// interior, bar in the right gutter) that makes the marker appear to
// cross over the card.
const CURRENT_TOP_PHASE_MIN = 5

// ---------- data fetching (with offline cache) ----------

function getFm() {
  try { return FileManager.iCloud() } catch (_) { return FileManager.local() }
}

function cachePath(fm) {
  return fm.joinPath(fm.documentsDirectory(), CACHE_FILENAME)
}

async function loadManifest() {
  const fm = getFm()
  const path = cachePath(fm)
  try {
    const req = new Request(DATA_URL)
    req.timeoutInterval = 8
    const manifest = await req.loadJSON()
    try { fm.writeString(path, JSON.stringify(manifest)) } catch (_) {}
    return { manifest, stale: false }
  } catch (e) {
    if (fm.fileExists(path)) {
      return { manifest: JSON.parse(fm.readString(path)), stale: true }
    }
    throw e
  }
}

// ---------- date + time helpers ----------

function todayIso() {
  const d = new Date()
  return \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, "0")}-\${String(d.getDate()).padStart(2, "0")}\`
}

function parseMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

function nowMinutes() {
  const d = new Date()
  return d.getHours() * 60 + d.getMinutes()
}

// SF Rounded — the same font family used for every text in the
// widget so the type reads as one system. Scriptable exposes a full
// set of weights (regular / medium / semibold / bold / heavy) as
// static methods on Font.
function rFont(size) {
  return typeof Font.regularRoundedSystemFont === "function"
    ? Font.regularRoundedSystemFont(size)
    : Font.systemFont(size)
}
function rMediumFont(size) {
  return typeof Font.mediumRoundedSystemFont === "function"
    ? Font.mediumRoundedSystemFont(size)
    : Font.mediumSystemFont(size)
}
function rSemiboldFont(size) {
  return typeof Font.semiboldRoundedSystemFont === "function"
    ? Font.semiboldRoundedSystemFont(size)
    : Font.semiboldSystemFont(size)
}
function rBoldFont(size) {
  return typeof Font.boldRoundedSystemFont === "function"
    ? Font.boldRoundedSystemFont(size)
    : Font.boldSystemFont(size)
}
function rHeavyFont(size) {
  return typeof Font.heavyRoundedSystemFont === "function"
    ? Font.heavyRoundedSystemFont(size)
    : Font.boldSystemFont(size)
}

function formatTime12(hhmm) {
  const [h, m] = hhmm.split(":").map(Number)
  const hour = h % 12 || 12
  return \`\${hour}:\${String(m).padStart(2, "0")}\`
}

function formatAmPm(hhmm) {
  const [h] = hhmm.split(":").map(Number)
  return h >= 12 ? "PM" : "AM"
}

function formatCountdown(min) {
  if (min <= 0) return ""
  if (min < 60) return \`\${min}m\`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? \`\${h}h\` : \`\${h}h \${m}m\`
}

// ---------- event picking ----------

function pickToday(manifest) {
  const iso = todayIso()
  const matches = []
  for (const event of manifest.events) {
    for (const day of event.days) {
      if (day.date === iso) matches.push({ event, day })
    }
  }
  if (matches.length === 0) return null
  return matches[0]
}

function pickNextFuture(manifest) {
  const iso = todayIso()
  const future = []
  for (const event of manifest.events) {
    for (const day of event.days) {
      if (day.date > iso) future.push({ event, day })
    }
  }
  future.sort((a, b) => a.day.date.localeCompare(b.day.date))
  return future[0] || null
}

function parseGroupFilter() {
  const raw = typeof args !== "undefined" && args.widgetParameter
  if (!raw) return []
  return String(raw).split(",").map(s => s.trim()).filter(Boolean)
}

// ---------- palette ----------

function palette(dark) {
  return dark
    // Dark mode keeps its "cards are slightly LIGHTER than the
    // widget background" relationship — that's the convention that
    // makes dark cards read as raised over a deeper widget ground.
    // No borders on either card variety; the tinted background on
    // the current card and the marker crossing it are enough.
    ? { bg: new Color("#0e0e11"), fg: new Color("#f5f5f7"), muted: new Color("#8a8a8f"),
        mutedStrong: new Color("#a4a4aa"),
        cardBg: new Color("#18181c"),
        currentCardBg: new Color("#122135"),
        divider: new Color("#26262c"),
        accent: new Color("#3b82f6"), pastOpacity: 0.6 }
    // Light mode: widget background is now white and non-current
    // cards use the light gray that USED to be the widget
    // background (swap of the two, no border). The current card
    // keeps its blue tint. No borders anywhere — the marker line
    // would otherwise get interrupted where it crosses a border
    // strip.
    : { bg: new Color("#ffffff"), fg: new Color("#111827"), muted: new Color("#9ca3af"),
        mutedStrong: new Color("#6b7280"),
        cardBg: new Color("#f9fafb"),
        currentCardBg: new Color("#eef4ff"),
        divider: new Color("#e5e7eb"),
        accent: new Color("#3b82f6"), pastOpacity: 0.6 }
}

function urgencyColor(min, p) {
  if (min <= 5) return new Color("#ef4444")
  if (min <= 10) return new Color("#f97316")
  return p.muted
}

// Rough widget interior height (after our top/bottom widget
// padding) for the running host. Used to decide dynamically how
// many event rows we can afford to render before we blow past the
// widget's actual height. On the Home Screen anything past the
// widget's bottom edge is clipped, so a past card that pushes the
// current card off-screen makes the widget useless; in Scriptable's
// preview sheet, overflow makes the sheet scroll to a
// hard-to-predict position (which is what "the widget seems to be
// scrolled to a random position" was — 10 rows of stacked-session
// cards with notes total ~668pt on a ~354pt-tall large widget).
function widgetInteriorHeight() {
  const family = config.widgetFamily || "medium"
  if (family === "small") return 130
  if (family === "medium") return 135
  if (family === "large") return 330
  return 330 // extraLarge (iPad)
}

// Rough vertical space a rendered event row will consume in the
// widget's outer stack, including the 6pt gap after it.
function estimateEventRowHeight(ev, isCurrent) {
  // Only general-event subtitles render as a note line. Session
  // \`note\` fields are dropped (see \`eventNote\`), so we don't
  // budget space for them here either.
  const hasNote = !!ev.subtitle
  const isSession = ev.type === "session"
  const hasBoth = isSession
    && (ev.onTrack || []).length > 0
    && (ev.inClass || []).length > 0

  let contentH
  if (hasBoth) contentH = 57       // on-row + spacer + divider + spacer + in-row
  else if (isSession) contentH = 20 // single pill row
  else contentH = 18                // plain event label
  if (hasNote) contentH += 18       // note line + spacer

  // Current cards use a bigger symmetric top/bottom pad (room for
  // the marker to overlap without crowding the content) and drag a
  // caption block along right above or below the card. Non-current
  // cards are the small pad plus row-gap only. No border on either
  // (the current card lost its border so the marker line isn't
  // interrupted at the sides).
  const innerPadV = isCurrent ? CURRENT_CARD_PAD_V : NONCURRENT_CARD_PAD_V
  const captionBlock = isCurrent ? CURRENT_CAPTION_BLOCK_HEIGHT : 0
  return 2 * innerPadV + contentH + captionBlock + 6
}

// The now-line block (caption + rule + spacer) that we inject
// between cards when there is no current event to overlap. Budgeted
// separately from card rows so the row-fit loop knows to leave
// room for it — but only in the between-cards case; when a current
// event exists its caption is baked into its own row estimate.
const NOW_LINE_BLOCK_HEIGHT = 22
// Caption block reserved above (or below) the current card — just
// the caption text and its two small outer spacers, no rule (the
// rule is inside the card, drawn as the marker bar).
const CURRENT_CAPTION_BLOCK_HEIGHT = 21
const NONCURRENT_CARD_PAD_V = 8

// ---------- rendering ----------

function makeWidget({ manifest, stale }) {
  const w = new ListWidget()
  const dark = Device.isUsingDarkAppearance()
  const p = palette(dark)
  w.backgroundColor = p.bg
  w.setPadding(10, WIDGET_SIDE_PAD_LEFT, 10, WIDGET_SIDE_PAD_RIGHT)
  w.url = SITE_URL

  const picked = pickToday(manifest)
  if (!picked) {
    renderNoEvents(w, p, stale, pickNextFuture(manifest))
    w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000)
    return w
  }

  const { event, day } = picked
  const groupById = Object.fromEntries(event.runGroups.map(g => [g.id, g]))
  const selected = parseGroupFilter()

  const visible = day.events.map(e => {
    if (e.type !== "session" || selected.length === 0) return e
    const onTrack = (e.onTrack || []).filter(id => selected.includes(id))
    const inClass = (e.inClass || []).filter(id => selected.includes(id))
    return { ...e, onTrack, inClass }
  }).filter(e => {
    if (e.type !== "session") return true
    if (selected.length === 0) return true
    return (e.onTrack.length > 0) || (e.inClass.length > 0)
  }).filter(e => e.type !== "break")

  renderHeader(w, event, day, p, stale)

  const now = nowMinutes()

  let currentIdx = -1
  // "above" — marker sits just above the current card (first minutes
  // of the event). "below" — marker sits just below the current card
  // (rest of the "current" window). Null when nothing is current, in
  // which case the marker floats between the last past and next
  // future cards instead.
  let currentPosition = null
  let lastPastIdx = -1
  for (let i = 0; i < visible.length; i++) {
    if (parseMinutes(visible[i].time) <= now) lastPastIdx = i
    else break
  }
  if (lastPastIdx !== -1) {
    const start = parseMinutes(visible[lastPastIdx].time)
    const nextEv = visible[lastPastIdx + 1]
    const nextStart = nextEv
      ? parseMinutes(nextEv.time)
      : start + LAST_EVENT_FALLBACK_MIN
    // Current window ends CURRENT_END_LOOKAHEAD_MIN before the next
    // event, at which point the marker leaves the card and joins the
    // between-cards gap. The Math.max floor keeps back-to-back events
    // (nextStart very close to start) from producing a negative
    // window that would flip the card to "not current" before it even
    // began.
    const currentEndsAt = nextEv
      ? Math.max(start, nextStart - CURRENT_END_LOOKAHEAD_MIN)
      : nextStart
    if (now < currentEndsAt) {
      currentIdx = lastPastIdx
      // Top-phase end caps at the current window's own end so a very
      // short window (events less than TOP_PHASE_MIN apart) doesn't
      // spend its entire life in the "above" phase.
      const topPhaseEnds = Math.min(start + CURRENT_TOP_PHASE_MIN, currentEndsAt)
      currentPosition = now < topPhaseEnds ? "above" : "below"
    }
  }

  const nextIdx = visible.findIndex(e => parseMinutes(e.time) > now)
  const insertAt = nextIdx === -1 ? visible.length : nextIdx
  const nextEvent = insertAt < visible.length ? visible[insertAt] : null

  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"
  // Absolute cap so we never render more rows than the widget can
  // ever plausibly fit, even for a run of all-simple general events.
  const maxRowsCap = isLarge ? 10 : 4
  // Always show exactly one past event before the current one so the
  // current card sits at row 1 — as close to the top as it can be
  // without hiding what just happened.
  const maxPast = 1

  const anchorIdx = currentIdx !== -1 ? currentIdx : insertAt
  const start = Math.max(0, anchorIdx - maxPast)

  // Dynamic row-fitting: pack rows into the widget's interior height
  // instead of using a fixed row count. Past + current are always
  // included so the "current" concept has an anchor; additional
  // future rows are added only while they'd still fit. Otherwise
  // (with the old maxRows=10 for large widgets) a run of stacked
  // sessions with notes could pile ~668pt of content into a 354pt
  // widget, and the Scriptable preview sheet ended up scrolled to a
  // hard-to-predict middle position — the "widget seems to be
  // scrolled to a random position" bug.
  // Reserve the between-cards now-line block only when we actually
  // need one. When a current event exists, its caption is baked into
  // its own row estimate (via CURRENT_CAPTION_BLOCK_HEIGHT), and the
  // marker bar itself is drawn inside the card so it costs no extra
  // vertical space.
  const nowLineReserve = currentIdx === -1 ? NOW_LINE_BLOCK_HEIGHT : 0
  // 48 = header row (~22, 18pt bold) + its 24pt bottom spacer + a
  // couple pt of margin — keep in sync with renderHeader.
  const availableH = widgetInteriorHeight() - 48 - nowLineReserve
  const rows = []
  let usedH = 0
  for (let i = start; i < visible.length && rows.length < maxRowsCap; i++) {
    const isCurrent = i === currentIdx
    const rowH = estimateEventRowHeight(visible[i], isCurrent)
    if (rows.length >= 2 && usedH + rowH > availableH) break
    rows.push(visible[i])
    usedH += rowH
  }

  const nowLineBetweenAt = currentIdx === -1 ? insertAt - start : -1
  const currentLocalIdx = currentIdx === -1 ? -1 : currentIdx - start

  for (let i = 0; i < rows.length; i++) {
    if (i === nowLineBetweenAt) drawNowLine(w, p, now, nextEvent, 6)
    const ev = rows[i]
    const isCurrentEvent = i === currentLocalIdx
    const past = !isCurrentEvent && parseMinutes(ev.time) < now
    drawEventRow(w, ev, groupById, selected, p, past,
      isCurrentEvent ? { position: currentPosition, now, nextEvent } : null)
  }
  if (nowLineBetweenAt >= rows.length) drawNowLine(w, p, now, null, 6)

  // Count events that came after the last rendered row — either
  // dropped by the row-fit budget or capped by maxRowsCap. Past
  // events skipped at the top (before \`start\`) are already over,
  // not "more" of anything, so we don't count them here.
  const lastRenderedIdx = rows.length > 0 ? start + rows.length - 1 : start - 1
  const remaining = visible.length - 1 - lastRenderedIdx

  // Flex spacer forces the widget's content stack to top-align.
  // Without it, Scriptable's ListWidget centers whatever content
  // it has vertically when it's shorter than the widget's box,
  // which showed up as awkward empty gutters above the header and
  // below the bottom card. When more events fell off the bottom,
  // drop a muted "X more events" line into that empty area so it
  // doesn't read as if the last rendered event were the last one.
  w.addSpacer()
  if (remaining > 0) {
    drawMoreEventsFooter(w, p, remaining)
    w.addSpacer()
  }

  w.refreshAfterDate = new Date(Date.now() + 60 * 1000)
  return w
}

function drawMoreEventsFooter(w, p, count) {
  const row = w.addStack()
  row.centerAlignContent()
  row.addSpacer()
  const text = row.addText(\`\${count} more event\${count === 1 ? "" : "s"}\`)
  text.font = rFont(11)
  text.textColor = p.muted
  row.addSpacer()
}

function renderHeader(w, event, day, p, stale) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(LEFT_GUTTER_WIDTH)
  const row = outer.addStack()
  row.centerAlignContent()

  // Event name on the left, truncated if it doesn't fit — the day
  // on the right always needs its full width so it never gets
  // squeezed out.
  const title = row.addText(event.name)
  title.font = rBoldFont(18)
  title.textColor = p.fg
  title.lineLimit = 1

  row.addSpacer()

  // Day on the right, right-aligned, formatted like "Friday (Sep
  // 11)". The offline flag folds into the same string instead of a
  // separate element so it can't crowd the day text out.
  const dayText = \`\${day.label} (\${shortDate(day.date)})\`
  const dayEl = row.addText(stale ? \`offline · \${dayText}\` : dayText)
  dayEl.font = rFont(12)
  dayEl.textColor = p.muted
  dayEl.lineLimit = 1

  outer.addSpacer(RIGHT_GUTTER_WIDTH)
  w.addSpacer(24) // further increased from 18
}

// ----- now-marker sizing -----
// Declared before the current-card constants below because
// MARKER_CONTENT_CLEARANCE reads NOW_LINE_DOT_DIAMETER in its
// initializer. Top-level \`const\` declarations are in the temporal
// dead zone until their own line runs, so referencing a \`const\`
// declared later in the file throws at load time (that was the
// "ReferenceError: Cannot access uninitialized variable" this
// widget hit before this section moved up here).
const NOW_LINE_DOT_DIAMETER = 8
const NOW_LINE_BAR_HEIGHT = 2

// ----- current-card layout constants -----

// Symmetric top/bottom padding on the current card. Big enough to
// hold the now-marker bar in the card's straight-sides zone (past
// the rounded corners) AND leave breathing room to the content
// underneath it. Both top and bottom use the same value so the card
// doesn't visibly change shape when the marker flips from top to
// bottom — the empty side still consumes the same pad, and the
// content stays vertically centered.
// Distance from the marker row's outer edge to the nearest card
// edge (5pt). Chosen so the bar lands past the corner radius (8pt)
// — the 8pt-tall marker row starts at y=5 with the 2pt bar centered
// at y=8-10, safely in the straight-sides zone of the card.
const MARKER_ROW_INSET = 5
// Distance from the marker row's inner edge to the content. Set
// equal to MARKER_ROW_INSET so the visible gap above the marker
// (MARKER_CONTENT_CLEARANCE + 3pt bar-to-row-top) matches the
// visible gap below (3pt bar-to-row-bottom + MARKER_ROW_INSET).
// This was the "padding above marker is too much" bug — MCC used
// to be 2pt while MRI was 5pt, so the visible gaps differed by
// 3pt AND the fixed-height contentBlock added slack on top of
// that.
const MARKER_CONTENT_CLEARANCE = MARKER_ROW_INSET
// Total vertical pad on each side of the card. Absolute — same
// whether the marker is on this side or not — so content position
// is deterministic and the card doesn't shift when the marker
// flips.
const CURRENT_CARD_PAD_V =
  MARKER_ROW_INSET + NOW_LINE_DOT_DIAMETER + MARKER_CONTENT_CLEARANCE
const CURRENT_CARD_CORNER_RADIUS = 8
// Space between the current card and its caption ("3:08 AM · Next
// in 3h 22m") on the outside — matches the pre-#77 spacing so the
// caption reads as a footer/header for the card.
const CURRENT_CAPTION_OUTER_PAD = 4

function eventNote(ev) {
  // Only general-event subtitles surface in the widget. Session
  // \`note\` fields are intentionally dropped — a session card is
  // already carrying a time + on-track pills + in-class pills, and
  // adding a note line pushes the whole card taller than it needs
  // to be.
  return ev.subtitle || null
}

const NONCURRENT_CARD_CORNER_RADIUS = 14

// ----- widget-level padding -----
//
// Left side: WIDGET_SIDE_PAD_LEFT is the gap between the widget's
// own left edge and the marker dot itself. LEFT_GUTTER_WIDTH is
// the gap between the widget's content-start and the card's left
// edge — the dot lives inside that gutter with the 4pt gap
// between it and the card baked in (dot 8pt + 4pt = 12pt gutter).
// Together that gives 4pt from widget left → dot → 4pt gap →
// card, which is what issue #77 asked for.
//
// Right side: widget's right padding stays at 0 and the right
// gutter absorbs the visual right margin. That lets the now-line's
// blue bar extend all the way to the widget's right edge instead
// of stopping short at the card's right border.
const WIDGET_SIDE_PAD_LEFT = 4
const WIDGET_SIDE_PAD_RIGHT = 0
const LEFT_GUTTER_WIDTH = NOW_LINE_DOT_DIAMETER + 4   // dot + 4pt gap
const RIGHT_GUTTER_WIDTH = 16

const CARD_INNER_PAD_H = 12

// Horizontal gap between the time column and the info block —
// bigger than the default 8pt so the time isn't crammed up
// against the "On track" text.
const TIME_INFO_SPACING = 14

// Unified column widths so every row's time and section labels line
// up at the same x whether the row is the current card or a plain
// event row. Widened from 60 to fit the small AM/PM suffix next to
// the time.
const TIME_COLUMN_WIDTH = 68
// Wide enough for "On track" plus a few characters of breathing
// room at the current 12pt rounded font size, so the labels never
// truncate: SF Symbol icon (14pt) + 8pt gap + label text
// ("On track" ~55pt) + 20-ish pt of margin ≈ 100pt.
const LABEL_COLUMN_WIDTH = 100

// Icon + gap used in front of the "Lunch" / "special" label, sized
// to match the on-track/in-class section icons so every row's icon
// reads at the same visual weight.
const FOOD_ICON_SIZE = 14
const FOOD_ICON_GAP = 8

// Fine-tune knob for the AM/PM-to-time baseline alignment — see
// addTimeColumn. Bump this up/down if AM/PM still looks off after a
// font or size change.
const AMPM_BASELINE_NUDGE = 1

function drawEventRow(w, ev, groupById, selected, p, past, current) {
  // "Above": the marker overlaps the TOP straight-sides zone of the
  // current card; the caption ("3:08 AM · Next in 3h 22m") sits
  // just above the card.
  if (current && current.position === "above") {
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
    drawNowCaption(w, p, current.now, current.nextEvent)
    w.addSpacer(3)
  }

  // Three-column outerRow: leftGutter (dot in negative space) |
  // cardContainer (card with the bar embedded inside its interior
  // at the marker row's y) | rightGutter (bar continuation in
  // negative space). Scriptable can't do true overlays, so this
  // stack composition is what makes the marker LOOK like one line
  // crossing over the card.
  const outerRow = w.addStack()
  outerRow.spacing = 0

  // Align outerRow's children to the same edge the marker sits on.
  // Both the card's embedded marker and the gutter's dot/bar are
  // placed at a fixed MARKER_ROW_INSET from that edge, so when both
  // columns are aligned to the same edge the two lands at the same
  // y — no flex spacer needed, no dependence on knowing the card's
  // natural height. This is what fixes the "dot floats below the
  // bar" bug: a flex spacer in a shorter vertical child of a
  // horizontal parent does NOT auto-stretch to the tallest
  // sibling's height in Scriptable, so the old gutter stayed 13pt
  // at the top of the row while the bar sat much lower in the card.
  if (current && current.position === "below") {
    outerRow.bottomAlignContent()
  } else {
    outerRow.topAlignContent()
  }

  const leftGutter = outerRow.addStack()
  leftGutter.layoutVertically()
  leftGutter.size = new Size(LEFT_GUTTER_WIDTH, 0)

  const cardContainer = outerRow.addStack()

  const rightGutter = outerRow.addStack()
  rightGutter.layoutVertically()
  rightGutter.size = new Size(RIGHT_GUTTER_WIDTH, 0)

  if (current) {
    drawCurrentCard(cardContainer, leftGutter, rightGutter,
      ev, groupById, selected, p, past, current.position)
  } else {
    drawNonCurrentCard(cardContainer, ev, groupById, selected, p, past)
    // Gutters stay empty — they auto-size to 0 height and take up no
    // vertical space, so the non-current row is as compact as before.
  }

  // "Below": the marker overlaps the BOTTOM zone of the card; the
  // caption sits just below.
  if (current && current.position === "below") {
    w.addSpacer(3)
    drawNowCaption(w, p, current.now, current.nextEvent)
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
  }
  w.addSpacer(6)
}

// Three-column current card. The card interior manually stacks
// [top pad zone] + [fixed-height content block] + [bottom pad zone];
// one of the two pad zones carries the marker bar, the other is
// just a spacer of the same height (that's the "symmetric padding"
// promise — content stays put regardless of marker position). The
// left and right gutters are filled with pre-computed spacer heights
// that put a dot / bar-continuation at exactly the same y as the
// bar inside the card, faking the overlay.
//
// NO BORDER on the current card. Any 1pt border strip along the
// card's left and right edges would show through as
// currentCardBorder color where the horizontal marker meets it —
// interrupting the continuous accent-blue line that reads as one
// mark crossing the card. The tinted background (currentCardBg) is
// enough to distinguish this card as current, especially with the
// marker crossing it.
function drawCurrentCard(cardContainer, leftGutter, rightGutter,
    ev, groupById, selected, p, past, position) {
  const markerAtTop = position === "above"

  cardContainer.layoutVertically()
  cardContainer.backgroundColor = p.currentCardBg
  cardContainer.cornerRadius = CURRENT_CARD_CORNER_RADIUS

  // Top pad zone. Absolute — either the marker + its clearance
  // (both sum to CURRENT_CARD_PAD_V) or a plain spacer of the same
  // height. Same either way, so the content below sits at the exact
  // same y regardless of where the marker is.
  if (markerAtTop) {
    cardContainer.addSpacer(MARKER_ROW_INSET)
    addBarInCard(cardContainer, p.accent)
    cardContainer.addSpacer(MARKER_CONTENT_CLEARANCE)
  } else {
    cardContainer.addSpacer(CURRENT_CARD_PAD_V)
  }

  // Content grows to its natural height — no fixed-height wrapper.
  // The fixed wrapper we had before ate the "above marker" gap with
  // top-aligned slack; now the content is exactly as tall as it
  // wants, and the pad zones above/below are absolute constants.
  const contentBlock = cardContainer.addStack()
  contentBlock.setPadding(0, CARD_INNER_PAD_H, 0, CARD_INNER_PAD_H)
  buildCardContent(contentBlock, ev, groupById, selected, p, past, true)

  // Bottom pad zone — mirror of top.
  if (!markerAtTop) {
    cardContainer.addSpacer(MARKER_CONTENT_CLEARANCE)
    addBarInCard(cardContainer, p.accent)
    cardContainer.addSpacer(MARKER_ROW_INSET)
  } else {
    cardContainer.addSpacer(CURRENT_CARD_PAD_V)
  }

  // Gutter columns place the dot / bar-continuation at exactly the
  // same y as the bar embedded in the card. Since content height is
  // no longer a fixed constant, the gutter columns use a flex
  // spacer on the empty side to auto-fill to the card's natural
  // height. Flex is limited to the gutter — it does NOT touch
  // content position inside the card.
  addGutterMarkerColumn(leftGutter, markerAtTop, "dot", p.accent)
  addGutterMarkerColumn(rightGutter, markerAtTop, "bar", p.accent)
}

function drawNonCurrentCard(cardContainer, ev, groupById, selected, p, past) {
  // No border. Non-current cards are just tinted (light gray on
  // white) rounded rectangles, matching the current card's
  // border-less look so the whole widget reads as one system.
  cardContainer.backgroundColor = p.cardBg
  cardContainer.cornerRadius = NONCURRENT_CARD_CORNER_RADIUS
  cardContainer.setPadding(
    NONCURRENT_CARD_PAD_V, CARD_INNER_PAD_H,
    NONCURRENT_CARD_PAD_V, CARD_INNER_PAD_H,
  )
  buildCardContent(cardContainer, ev, groupById, selected, p, past, false)
}

// Bar drawn inside the current card, at the top or bottom pad zone.
// Sits in an 8pt-tall row (matches NOW_LINE_DOT_DIAMETER so its y
// aligns with the dot in the gutter) with a 2pt bar centered
// vertically inside.
function addBarInCard(card, color) {
  const row = card.addStack()
  row.size = new Size(0, NOW_LINE_DOT_DIAMETER)
  row.centerAlignContent()
  const bar = row.addStack()
  bar.backgroundColor = color
  bar.size = new Size(0, NOW_LINE_BAR_HEIGHT)
  bar.addSpacer()
}

// One of the two negative-space gutter columns. Places the dot or
// the bar continuation at MARKER_ROW_INSET from the row's aligned
// edge — matching the same fixed distance the marker sits from
// that edge inside the card. drawEventRow sets outerRow's
// topAlignContent()/bottomAlignContent() so both this column and
// cardContainer align to the same edge, which is what makes the
// dot land at the exact y as the embedded bar. Fully absolute:
// spacers here are constants, no flex.
function addGutterMarkerColumn(col, markerAtTop, elementType, color) {
  if (markerAtTop) {
    col.addSpacer(MARKER_ROW_INSET)
    addGutterMarkerElement(col, elementType, color)
  } else {
    addGutterMarkerElement(col, elementType, color)
    col.addSpacer(MARKER_ROW_INSET)
  }
}

function addGutterMarkerElement(col, elementType, color) {
  const row = col.addStack()
  row.size = new Size(0, NOW_LINE_DOT_DIAMETER)
  row.centerAlignContent()
  if (elementType === "dot") {
    // Dot pinned to the leading edge of the gutter (widget-left side),
    // then a thin bar segment fills the remaining gutter width right
    // up to the card. Two things at once:
    //  - the dot still sits 4pt away from the card's own left edge
    //    (dot 8pt + trailing bar 4pt = 12pt = LEFT_GUTTER_WIDTH), so
    //    it isn't squashed against the card — that's what issue #67
    //    was about;
    //  - and the dot no longer looks disconnected from the horizontal
    //    line inside the card, because the bar segment bridges the
    //    gap. The dot reads as a bulb with a thin tail leading into
    //    the card's marker line, not a dot marooned in whitespace
    //    (#77's complaint after the border fix).
    const dot = row.addStack()
    dot.size = new Size(NOW_LINE_DOT_DIAMETER, NOW_LINE_DOT_DIAMETER)
    dot.backgroundColor = color
    dot.cornerRadius = NOW_LINE_DOT_DIAMETER / 2
    const bridge = row.addStack()
    bridge.backgroundColor = color
    bridge.size = new Size(0, NOW_LINE_BAR_HEIGHT)
    bridge.addSpacer()
  } else {
    const bar = row.addStack()
    bar.backgroundColor = color
    bar.size = new Size(0, NOW_LINE_BAR_HEIGHT)
    bar.addSpacer()
  }
}

// Card interior. Builds either a single main row [time | info] or,
// when the event carries a note or subtitle, a vertical layout with
// the main row on top and the note line below.
function buildCardContent(container, ev, groupById, selected, p, past, current) {
  const note = eventNote(ev)
  // Stacked sessions (both on-track and in-class rows) top-align
  // the time column with the "On track" row instead of centering
  // it between the two rows, so the eye doesn't have to hunt for
  // the time in the vertical middle of a two-row card.
  const stacked = ev.type === "session"
    && (ev.onTrack || []).length > 0
    && (ev.inClass || []).length > 0

  if (note) {
    container.layoutVertically()
    const mainRow = container.addStack()
    if (stacked) mainRow.topAlignContent()
    else mainRow.centerAlignContent()
    mainRow.spacing = TIME_INFO_SPACING
    buildMainContent(mainRow, ev, groupById, selected, p, past, current)
    container.addSpacer(3)
    // Lunch rows carry a leading icon before the label, so the note
    // needs the extra indent to land under the label text itself —
    // matching how the web app aligns the subtitle under the title,
    // not under the icon badge. Special rows have no icon.
    const hasIcon = ev.type === "lunch"
    const noteIndent = TIME_COLUMN_WIDTH + TIME_INFO_SPACING
      + (hasIcon ? FOOD_ICON_SIZE + FOOD_ICON_GAP : 0)
    addNoteRow(container, note, p, past, current, noteIndent)
  } else {
    if (stacked) container.topAlignContent()
    else container.centerAlignContent()
    container.spacing = TIME_INFO_SPACING
    buildMainContent(container, ev, groupById, selected, p, past, current)
  }
}

function buildMainContent(mainRow, ev, groupById, selected, p, past, current) {
  const onTrack = ev.type === "session"
    ? (ev.onTrack || []).map(id => groupById[id]).filter(Boolean)
    : []
  const inClass = ev.type === "session"
    ? (ev.inClass || []).map(id => groupById[id]).filter(Boolean)
    : []
  const stacked = onTrack.length > 0 && inClass.length > 0

  addTimeColumn(mainRow, ev.time, p, past, current, stacked)

  if (ev.type === "session") {
    if (stacked) {
      const infoBlock = mainRow.addStack()
      infoBlock.layoutVertically()

      addSectionRow(infoBlock, "On track", "car", onTrack, selected, p, past, current)
      infoBlock.addSpacer(current ? 6 : 8)
      addRowDivider(infoBlock, p)
      infoBlock.addSpacer(current ? 6 : 8)
      addSectionRow(infoBlock, "In class", "graduationcap", inClass, selected, p, past, current)
      // No mainRow.addSpacer() here — the divider inside infoBlock
      // uses its own addSpacer to stretch full width, which cascades
      // out and makes cardContainer fill the widget width.
    } else if (onTrack.length) {
      // Trailing flex spacer stretches the CARDCONTAINER to the
      // widget's full width, so the card doesn't visibly shrink to
      // its natural content width (time + label + pill). Safe now
      // that addSectionRow no longer carries its own trailing flex
      // spacer — only this ONE flex sits in the horizontal chain,
      // so the pill inside gets its full natural width (no double-
      // flex competition that would truncate the label).
      addSectionRow(mainRow, "On track", "car", onTrack, selected, p, past, current)
      mainRow.addSpacer()
    } else if (inClass.length) {
      addSectionRow(mainRow, "In class", "graduationcap", inClass, selected, p, past, current)
      mainRow.addSpacer()
    }
  } else {
    const isFood = ev.type === "lunch" || ev.type === "special"
    const hasIcon = ev.type === "lunch"
    if (hasIcon) {
      // Icon + label share their own tight-spaced row so mainRow's
      // wider TIME_INFO_SPACING only applies once, between the time
      // column and this block — matching how the on-track/in-class
      // icon columns are laid out.
      const foodRow = mainRow.addStack()
      foodRow.centerAlignContent()
      foodRow.spacing = FOOD_ICON_GAP
      addFoodIcon(foodRow, p, past)
      addFoodLabel(foodRow, ev.label, p, past, true)
    } else {
      addFoodLabel(mainRow, ev.label, p, past, isFood)
    }
    mainRow.addSpacer()
  }
}

// SF Symbol for the lunch row — fork.knife mirrors the web app's
// Utensils icon. Same tint/size/opacity treatment as the on-track/
// in-class section icons. Special events render with no icon at all.
function addFoodIcon(row, p, past) {
  if (typeof SFSymbol === "undefined") return
  const sym = SFSymbol.named("fork.knife")
  if (!sym) return
  const img = row.addImage(sym.image)
  img.imageSize = new Size(FOOD_ICON_SIZE, FOOD_ICON_SIZE)
  img.tintColor = p.fg
  if (past) img.imageOpacity = p.pastOpacity
}

function addFoodLabel(row, text, p, past, bold) {
  const label = row.addText(text)
  // Same font on current and non-current — the border and
  // background do the emphasising, not the type.
  label.font = bold ? rBoldFont(12) : rMediumFont(12)
  label.textColor = p.fg
  label.lineLimit = 1
  if (past) label.textOpacity = p.pastOpacity
}

function addTimeColumn(row, hhmm, p, past, current, topAlign) {
  const timeCol = row.addStack()
  timeCol.size = new Size(TIME_COLUMN_WIDTH, 0)
  // Stacked-session cards top-align the time with the "On track"
  // row so the eye doesn't have to hunt for the time in the
  // vertical middle of a two-row card.
  if (topAlign) timeCol.topAlignContent()
  else timeCol.centerAlignContent()

  // Scriptable stacks only offer top/center/bottom cross-axis
  // alignment, no true text baseline. A flush bottom-edge alignment
  // between the two font sizes isn't quite right either: a smaller
  // font's descent is proportionally smaller than the time's, so
  // its baseline ends up sitting BELOW the time's baseline once
  // their box bottoms are flush. AMPM_BASELINE_NUDGE compensates by
  // giving the AM/PM text a bit of padding below it, so its box —
  // not the glyph itself — reaches all the way down to the shared
  // bottom edge.
  const timeRow = timeCol.addStack()
  timeRow.bottomAlignContent()
  // +2 over the base 2pt gap shifts the AM/PM text right.
  timeRow.spacing = 4

  const time = timeRow.addText(formatTime12(hhmm))
  // Bold on the current card so the time carries the "this is now"
  // signal too, not just the card's border/tinted background.
  time.font = current ? rBoldFont(14) : rMediumFont(14)
  time.textColor = p.fg
  time.lineLimit = 1
  if (past) time.textOpacity = p.pastOpacity

  // AM/PM suffix — smaller and muted so it reads as a qualifier,
  // not part of the time itself.
  const ampmBox = timeRow.addStack()
  ampmBox.layoutVertically()
  const ampm = ampmBox.addText(formatAmPm(hhmm))
  ampm.font = rFont(9)
  ampm.textColor = p.mutedStrong
  ampm.lineLimit = 1
  if (past) ampm.textOpacity = p.pastOpacity
  ampmBox.addSpacer(AMPM_BASELINE_NUDGE)

  timeCol.addSpacer()
}

function addSectionRow(parent, labelText, iconName, groups, selected, p, past, current) {
  const row = parent.addStack()
  row.centerAlignContent()
  row.spacing = 10

  addSectionLabelColumn(row, labelText, iconName, p, past, current)

  const pillsStack = row.addStack()
  pillsStack.centerAlignContent()
  pillsStack.spacing = 6
  const dimSelected = selected.length > 0
  for (const g of groups) {
    const dim = dimSelected && !selected.includes(g.id)
    addGroupPill(pillsStack, g, dim || past, current)
  }
  // No trailing flex spacer here. When the outer mainRow ALSO had
  // a flex spacer (for session cards), the two competed and shared
  // the extra horizontal space equally — which starved the section
  // row of the pt or two it needed for the pill to be its natural
  // width, and the pill's label truncated ("Oran…"). The row now
  // grows only to its natural width (label col + pills), and the
  // section row is left-aligned in its container by default.
}

// Label column with a small SF Symbol glyph to the left of the
// text — a car for "On track" and a graduation cap for "In class".
// SF Symbols is the iOS-native equivalent of Material Icons and the
// closest simple line-glyph set actually available inside
// Scriptable; both are rendered in the same color as the label so
// the icon reads as part of the section label, not a decoration.
function addSectionLabelColumn(row, text, iconName, p, past, current) {
  const col = row.addStack()
  col.size = new Size(LABEL_COLUMN_WIDTH, 0)
  col.centerAlignContent()
  col.spacing = 8   // generous gap between icon and label

  if (iconName && typeof SFSymbol !== "undefined") {
    const sym = SFSymbol.named(iconName)
    if (sym) {
      const img = col.addImage(sym.image)
      img.imageSize = new Size(14, 14)
      img.tintColor = p.fg
      if (past) img.imageOpacity = p.pastOpacity
    }
  }

  const l = col.addText(text)
  // Same font on every card — current and non-current alike —
  // so labels don't visually bump up in size when a row goes
  // from "next" to "current".
  l.font = rFont(12)
  // Same p.fg as every other text element on the card so the
  // label doesn't fade into the background — matches the web
  // app's dark section labels.
  l.textColor = p.fg
  l.lineLimit = 1
  if (past) l.textOpacity = p.pastOpacity
  col.addSpacer()
}

function addRowDivider(col, p) {
  // Dynamic-stretch pattern: a horizontal-layout stack (Scriptable
  // stacks are horizontal by default) containing only a flex
  // spacer expands to fill the parent's remaining horizontal
  // width. Same trick the now-line bar and pill rows already use
  // successfully elsewhere in this file. This replaces the old
  // fixed-DIVIDER_WIDTH computed from a screen-size lookup table
  // that was always either too short (undershooting on Pro Max)
  // or too long (overshooting on smaller phones) — the root cause
  // of the "divider doesn't reach the right edge" complaints in
  // #71 and #77.
  const line = col.addStack()
  line.backgroundColor = p.divider
  line.size = new Size(0, 1)
  line.addSpacer()
}

// Small muted note / subtitle line beneath the main content row.
// Indented past the time column (and, for food rows, past the icon
// too) so it aligns with the label above it — reads as belonging to
// the event, not the widget.
function addNoteRow(container, note, p, past, current, indent) {
  const row = container.addStack()
  row.addSpacer(indent)
  const text = row.addText(note)
  // Same font on current and non-current so subtitles read at
  // one consistent visual weight everywhere.
  text.font = rFont(11)
  text.textColor = p.muted
  text.lineLimit = 1
  if (past) text.textOpacity = p.pastOpacity
  row.addSpacer()
}

function addGroupPill(row, g, dim, current) {
  const alpha = dim ? 0.55 : 1.0
  const pill = row.addStack()
  pill.backgroundColor = new Color(g.color, alpha)
  pill.cornerRadius = 100
  // Same padding and text sizing on every card, current or not.
  // Top/bottom padding is 2pt more than the sides (issue #4) — the
  // rounded pill otherwise looks visually tighter top-to-bottom than
  // side-to-side.
  pill.setPadding(4, 8, 4, 8)
  pill.centerAlignContent()
  const label = pill.addText(g.label)
  label.font = rMediumFont(10)
  // Pill text stays fully opaque even when the pill is dimmed
  // (past event / not-in-selected-groups) — the background alpha
  // already carries the "dimmed" signal, and fading the text on
  // top makes the label unreadable. Matches the web app.
  label.textColor = new Color("#ffffff")
  // Force single-line so the pill hugs the full text width. Without
  // this, Scriptable treats the text as multi-line-wrappable and its
  // ideal width collapses to one character, which lets the row's
  // trailing flex spacer eat the space — the pill then either
  // truncates ("Oran…") or, when there is vertical room, wraps to a
  // second line. Neither is what we want.
  label.lineLimit = 1
}

function drawNowCaption(w, p, now, nextEvent) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(LEFT_GUTTER_WIDTH + CARD_INNER_PAD_H)
  const row = outer.addStack()
  row.centerAlignContent()

  const time = row.addText(nowHM().toUpperCase())
  time.font = rMediumFont(10)
  time.textColor = p.accent

  row.addSpacer()

  if (nextEvent) {
    const min = parseMinutes(nextEvent.time) - now
    if (min > 0) {
      const prefix = row.addText("Next in ")
      prefix.font = rFont(10)
      prefix.textColor = p.muted
      const label = row.addText(formatCountdown(min))
      label.font = rBoldFont(10)
      label.textColor = urgencyColor(min, p)
    }
  }
  outer.addSpacer(RIGHT_GUTTER_WIDTH + CARD_INNER_PAD_H)
}

function drawNowRule(w, p) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.centerAlignContent()

  // Dot at the far left, bar starts immediately at the dot's
  // right edge — the two read as one continuous marker.
  // Deliberately no 4pt gap here (the gap only lives in the
  // card-row left gutter, not in the between-cards rule) so the
  // line doesn't visually disconnect from the dot.
  const dot = outer.addStack()
  dot.size = new Size(NOW_LINE_DOT_DIAMETER, NOW_LINE_DOT_DIAMETER)
  dot.backgroundColor = p.accent
  dot.cornerRadius = NOW_LINE_DOT_DIAMETER / 2

  // No trailing spacer on outer — bar extends across the right
  // gutter and into the widget's zero-width right padding, all
  // the way to the widget's right edge.
  const bar = outer.addStack()
  bar.backgroundColor = p.accent
  bar.size = new Size(0, NOW_LINE_BAR_HEIGHT)
  bar.addSpacer()
}

function drawNowLine(w, p, now, nextEvent, belowSpacer) {
  drawNowCaption(w, p, now, nextEvent)
  w.addSpacer(2)
  drawNowRule(w, p)
  if (belowSpacer > 0) w.addSpacer(belowSpacer)
}

function nowHM() {
  const d = new Date()
  const h = d.getHours() % 12 || 12
  const ampm = d.getHours() >= 12 ? "PM" : "AM"
  return \`\${h}:\${String(d.getMinutes()).padStart(2, "0")} \${ampm}\`
}

function shortDate(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return \`\${months[m - 1]} \${d}\`
}

function renderNoEvents(w, p, stale, next) {
  const title = w.addText("HPDE")
  title.font = rBoldFont(14)
  title.textColor = p.fg
  w.addSpacer(6)

  const msg = w.addText("No event today.")
  msg.font = rFont(12)
  msg.textColor = p.muted

  if (next) {
    w.addSpacer(4)
    const nx = w.addText(\`Next: \${next.event.name}\`)
    nx.font = rMediumFont(11)
    nx.textColor = p.fg
    nx.lineLimit = 1
    const when = w.addText(\`\${next.day.label}, \${shortDate(next.day.date)}\`)
    when.font = rFont(10)
    when.textColor = p.muted
  }

  if (stale) {
    w.addSpacer(4)
    const s = w.addText("(cached)")
    s.font = rFont(9)
    s.textColor = p.muted
  }
}

function renderError(err) {
  const w = new ListWidget()
  const dark = Device.isUsingDarkAppearance()
  const p = palette(dark)
  w.backgroundColor = p.bg
  const t = w.addText("HPDE widget error")
  t.font = rBoldFont(12)
  t.textColor = p.fg
  const e = w.addText(String(err && err.message ? err.message : err))
  e.font = rFont(10)
  e.textColor = p.muted
  w.url = SITE_URL
  return w
}

// ---------- entrypoint ----------

let widget
try {
  const data = await loadManifest()
  widget = makeWidget(data)
} catch (err) {
  widget = renderError(err)
}

if (config.runsInWidget) {
  Script.setWidget(widget)
} else if (config.widgetFamily === "large" || config.widgetFamily === "extraLarge") {
  await widget.presentLarge()
} else {
  await widget.presentMedium()
}
Script.complete()
`;function c1(){const[r,f]=St.useState(!1);St.useEffect(()=>{window.scrollTo(0,0)},[]);async function h(){await navigator.clipboard.writeText(vh),f(!0),setTimeout(()=>f(!1),2e3)}return E.jsx("div",{className:"min-h-screen bg-gray-50",children:E.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[E.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[E.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),E.jsxs("div",{className:"flex items-center gap-2",children:[E.jsxs("button",{onClick:h,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[r?E.jsx(eu,{size:16,className:"text-green-600"}):E.jsx(Ih,{size:16}),r?"Copied":"Copy"]}),E.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:E.jsx(Wh,{size:18})})]})]}),E.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",E.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),E.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:E.jsx("code",{children:vh})})]})})}var Ul={},No,bh;function o1(){return bh||(bh=1,No=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),No}var _o={},_n={},Sh;function Fn(){if(Sh)return _n;Sh=1;let r;const f=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(c){if(!c)throw new Error('"version" cannot be null or undefined');if(c<1||c>40)throw new Error('"version" should be in range from 1 to 40');return c*4+17},_n.getSymbolTotalCodewords=function(c){return f[c]},_n.getBCHDigit=function(h){let c=0;for(;h!==0;)c++,h>>>=1;return c},_n.setToSJISFunction=function(c){if(typeof c!="function")throw new Error('"toSJISFunc" is not a valid function.');r=c},_n.isKanjiModeEnabled=function(){return typeof r<"u"},_n.toSJIS=function(c){return r(c)},_n}var Ro={},Eh;function tr(){return Eh||(Eh=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function f(h){if(typeof h!="string")throw new Error("Param is not a string");switch(h.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+h)}}r.isValid=function(c){return c&&typeof c.bit<"u"&&c.bit>=0&&c.bit<4},r.from=function(c,s){if(r.isValid(c))return c;try{return f(c)}catch{return s}}})(Ro)),Ro}var Mo,wh;function r1(){if(wh)return Mo;wh=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(f){const h=Math.floor(f/8);return(this.buffer[h]>>>7-f%8&1)===1},put:function(f,h){for(let c=0;c<h;c++)this.putBit((f>>>h-c-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(f){const h=Math.floor(this.length/8);this.buffer.length<=h&&this.buffer.push(0),f&&(this.buffer[h]|=128>>>this.length%8),this.length++}},Mo=r,Mo}var zo,Th;function s1(){if(Th)return zo;Th=1;function r(f){if(!f||f<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=f,this.data=new Uint8Array(f*f),this.reservedBit=new Uint8Array(f*f)}return r.prototype.set=function(f,h,c,s){const d=f*this.size+h;this.data[d]=c,s&&(this.reservedBit[d]=!0)},r.prototype.get=function(f,h){return this.data[f*this.size+h]},r.prototype.xor=function(f,h,c){this.data[f*this.size+h]^=c},r.prototype.isReserved=function(f,h){return this.reservedBit[f*this.size+h]},zo=r,zo}var Do={},Ah;function f1(){return Ah||(Ah=1,(function(r){const f=Fn().getSymbolSize;r.getRowColCoords=function(c){if(c===1)return[];const s=Math.floor(c/7)+2,d=f(c),b=d===145?26:Math.ceil((d-13)/(2*s-2))*2,w=[d-7];for(let g=1;g<s-1;g++)w[g]=w[g-1]-b;return w.push(6),w.reverse()},r.getPositions=function(c){const s=[],d=r.getRowColCoords(c),b=d.length;for(let w=0;w<b;w++)for(let g=0;g<b;g++)w===0&&g===0||w===0&&g===b-1||w===b-1&&g===0||s.push([d[w],d[g]]);return s}})(Do)),Do}var Oo={},xh;function d1(){if(xh)return Oo;xh=1;const r=Fn().getSymbolSize,f=7;return Oo.getPositions=function(c){const s=r(c);return[[0,0],[s-f,0],[0,s-f]]},Oo}var Bo={},Ch;function h1(){return Ch||(Ch=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const f={N1:3,N2:3,N3:40,N4:10};r.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},r.from=function(s){return r.isValid(s)?parseInt(s,10):void 0},r.getPenaltyN1=function(s){const d=s.size;let b=0,w=0,g=0,v=null,z=null;for(let N=0;N<d;N++){w=g=0,v=z=null;for(let B=0;B<d;B++){let U=s.get(N,B);U===v?w++:(w>=5&&(b+=f.N1+(w-5)),v=U,w=1),U=s.get(B,N),U===z?g++:(g>=5&&(b+=f.N1+(g-5)),z=U,g=1)}w>=5&&(b+=f.N1+(w-5)),g>=5&&(b+=f.N1+(g-5))}return b},r.getPenaltyN2=function(s){const d=s.size;let b=0;for(let w=0;w<d-1;w++)for(let g=0;g<d-1;g++){const v=s.get(w,g)+s.get(w,g+1)+s.get(w+1,g)+s.get(w+1,g+1);(v===4||v===0)&&b++}return b*f.N2},r.getPenaltyN3=function(s){const d=s.size;let b=0,w=0,g=0;for(let v=0;v<d;v++){w=g=0;for(let z=0;z<d;z++)w=w<<1&2047|s.get(v,z),z>=10&&(w===1488||w===93)&&b++,g=g<<1&2047|s.get(z,v),z>=10&&(g===1488||g===93)&&b++}return b*f.N3},r.getPenaltyN4=function(s){let d=0;const b=s.data.length;for(let g=0;g<b;g++)d+=s.data[g];return Math.abs(Math.ceil(d*100/b/5)-10)*f.N4};function h(c,s,d){switch(c){case r.Patterns.PATTERN000:return(s+d)%2===0;case r.Patterns.PATTERN001:return s%2===0;case r.Patterns.PATTERN010:return d%3===0;case r.Patterns.PATTERN011:return(s+d)%3===0;case r.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(d/3))%2===0;case r.Patterns.PATTERN101:return s*d%2+s*d%3===0;case r.Patterns.PATTERN110:return(s*d%2+s*d%3)%2===0;case r.Patterns.PATTERN111:return(s*d%3+(s+d)%2)%2===0;default:throw new Error("bad maskPattern:"+c)}}r.applyMask=function(s,d){const b=d.size;for(let w=0;w<b;w++)for(let g=0;g<b;g++)d.isReserved(g,w)||d.xor(g,w,h(s,g,w))},r.getBestMask=function(s,d){const b=Object.keys(r.Patterns).length;let w=0,g=1/0;for(let v=0;v<b;v++){d(v),r.applyMask(v,s);const z=r.getPenaltyN1(s)+r.getPenaltyN2(s)+r.getPenaltyN3(s)+r.getPenaltyN4(s);r.applyMask(v,s),z<g&&(g=z,w=v)}return w}})(Bo)),Bo}var Ii={},Nh;function t0(){if(Nh)return Ii;Nh=1;const r=tr(),f=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],h=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Ii.getBlocksCount=function(s,d){switch(d){case r.L:return f[(s-1)*4+0];case r.M:return f[(s-1)*4+1];case r.Q:return f[(s-1)*4+2];case r.H:return f[(s-1)*4+3];default:return}},Ii.getTotalCodewordsCount=function(s,d){switch(d){case r.L:return h[(s-1)*4+0];case r.M:return h[(s-1)*4+1];case r.Q:return h[(s-1)*4+2];case r.H:return h[(s-1)*4+3];default:return}},Ii}var Uo={},Ma={},_h;function m1(){if(_h)return Ma;_h=1;const r=new Uint8Array(512),f=new Uint8Array(256);return(function(){let c=1;for(let s=0;s<255;s++)r[s]=c,f[c]=s,c<<=1,c&256&&(c^=285);for(let s=255;s<512;s++)r[s]=r[s-255]})(),Ma.log=function(c){if(c<1)throw new Error("log("+c+")");return f[c]},Ma.exp=function(c){return r[c]},Ma.mul=function(c,s){return c===0||s===0?0:r[f[c]+f[s]]},Ma}var Rh;function g1(){return Rh||(Rh=1,(function(r){const f=m1();r.mul=function(c,s){const d=new Uint8Array(c.length+s.length-1);for(let b=0;b<c.length;b++)for(let w=0;w<s.length;w++)d[b+w]^=f.mul(c[b],s[w]);return d},r.mod=function(c,s){let d=new Uint8Array(c);for(;d.length-s.length>=0;){const b=d[0];for(let g=0;g<s.length;g++)d[g]^=f.mul(s[g],b);let w=0;for(;w<d.length&&d[w]===0;)w++;d=d.slice(w)}return d},r.generateECPolynomial=function(c){let s=new Uint8Array([1]);for(let d=0;d<c;d++)s=r.mul(s,new Uint8Array([1,f.exp(d)]));return s}})(Uo)),Uo}var Ho,Mh;function y1(){if(Mh)return Ho;Mh=1;const r=g1();function f(h){this.genPoly=void 0,this.degree=h,this.degree&&this.initialize(this.degree)}return f.prototype.initialize=function(c){this.degree=c,this.genPoly=r.generateECPolynomial(this.degree)},f.prototype.encode=function(c){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(c.length+this.degree);s.set(c);const d=r.mod(s,this.genPoly),b=this.degree-d.length;if(b>0){const w=new Uint8Array(this.degree);return w.set(d,b),w}return d},Ho=f,Ho}var jo={},Lo={},qo={},zh;function e0(){return zh||(zh=1,qo.isValid=function(f){return!isNaN(f)&&f>=1&&f<=40}),qo}var Be={},Dh;function n0(){if(Dh)return Be;Dh=1;const r="[0-9]+",f="[A-Z $%*+\\-./:]+";let h="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";h=h.replace(/u/g,"\\u");const c="(?:(?![A-Z0-9 $%*+\\-./:]|"+h+`)(?:.|[\r
]))+`;Be.KANJI=new RegExp(h,"g"),Be.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Be.BYTE=new RegExp(c,"g"),Be.NUMERIC=new RegExp(r,"g"),Be.ALPHANUMERIC=new RegExp(f,"g");const s=new RegExp("^"+h+"$"),d=new RegExp("^"+r+"$"),b=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Be.testKanji=function(g){return s.test(g)},Be.testNumeric=function(g){return d.test(g)},Be.testAlphanumeric=function(g){return b.test(g)},Be}var Oh;function In(){return Oh||(Oh=1,(function(r){const f=e0(),h=n0();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(d,b){if(!d.ccBits)throw new Error("Invalid mode: "+d);if(!f.isValid(b))throw new Error("Invalid version: "+b);return b>=1&&b<10?d.ccBits[0]:b<27?d.ccBits[1]:d.ccBits[2]},r.getBestModeForData=function(d){return h.testNumeric(d)?r.NUMERIC:h.testAlphanumeric(d)?r.ALPHANUMERIC:h.testKanji(d)?r.KANJI:r.BYTE},r.toString=function(d){if(d&&d.id)return d.id;throw new Error("Invalid mode")},r.isValid=function(d){return d&&d.bit&&d.ccBits};function c(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+s)}}r.from=function(d,b){if(r.isValid(d))return d;try{return c(d)}catch{return b}}})(Lo)),Lo}var Bh;function p1(){return Bh||(Bh=1,(function(r){const f=Fn(),h=t0(),c=tr(),s=In(),d=e0(),b=7973,w=f.getBCHDigit(b);function g(B,U,Y){for(let P=1;P<=40;P++)if(U<=r.getCapacity(P,Y,B))return P}function v(B,U){return s.getCharCountIndicator(B,U)+4}function z(B,U){let Y=0;return B.forEach(function(P){const pt=v(P.mode,U);Y+=pt+P.getBitsLength()}),Y}function N(B,U){for(let Y=1;Y<=40;Y++)if(z(B,Y)<=r.getCapacity(Y,U,s.MIXED))return Y}r.from=function(U,Y){return d.isValid(U)?parseInt(U,10):Y},r.getCapacity=function(U,Y,P){if(!d.isValid(U))throw new Error("Invalid QR Code version");typeof P>"u"&&(P=s.BYTE);const pt=f.getSymbolTotalCodewords(U),F=h.getTotalCodewordsCount(U,Y),j=(pt-F)*8;if(P===s.MIXED)return j;const L=j-v(P,U);switch(P){case s.NUMERIC:return Math.floor(L/10*3);case s.ALPHANUMERIC:return Math.floor(L/11*2);case s.KANJI:return Math.floor(L/13);case s.BYTE:default:return Math.floor(L/8)}},r.getBestVersionForData=function(U,Y){let P;const pt=c.from(Y,c.M);if(Array.isArray(U)){if(U.length>1)return N(U,pt);if(U.length===0)return 1;P=U[0]}else P=U;return g(P.mode,P.getLength(),pt)},r.getEncodedBits=function(U){if(!d.isValid(U)||U<7)throw new Error("Invalid QR Code version");let Y=U<<12;for(;f.getBCHDigit(Y)-w>=0;)Y^=b<<f.getBCHDigit(Y)-w;return U<<12|Y}})(jo)),jo}var Go={},Uh;function v1(){if(Uh)return Go;Uh=1;const r=Fn(),f=1335,h=21522,c=r.getBCHDigit(f);return Go.getEncodedBits=function(d,b){const w=d.bit<<3|b;let g=w<<10;for(;r.getBCHDigit(g)-c>=0;)g^=f<<r.getBCHDigit(g)-c;return(w<<10|g)^h},Go}var ko={},Yo,Hh;function b1(){if(Hh)return Yo;Hh=1;const r=In();function f(h){this.mode=r.NUMERIC,this.data=h.toString()}return f.getBitsLength=function(c){return 10*Math.floor(c/3)+(c%3?c%3*3+1:0)},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(c){let s,d,b;for(s=0;s+3<=this.data.length;s+=3)d=this.data.substr(s,3),b=parseInt(d,10),c.put(b,10);const w=this.data.length-s;w>0&&(d=this.data.substr(s),b=parseInt(d,10),c.put(b,w*3+1))},Yo=f,Yo}var Qo,jh;function S1(){if(jh)return Qo;jh=1;const r=In(),f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function h(c){this.mode=r.ALPHANUMERIC,this.data=c}return h.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(s){let d;for(d=0;d+2<=this.data.length;d+=2){let b=f.indexOf(this.data[d])*45;b+=f.indexOf(this.data[d+1]),s.put(b,11)}this.data.length%2&&s.put(f.indexOf(this.data[d]),6)},Qo=h,Qo}var Xo,Lh;function E1(){if(Lh)return Xo;Lh=1;const r=In();function f(h){this.mode=r.BYTE,typeof h=="string"?this.data=new TextEncoder().encode(h):this.data=new Uint8Array(h)}return f.getBitsLength=function(c){return c*8},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(h){for(let c=0,s=this.data.length;c<s;c++)h.put(this.data[c],8)},Xo=f,Xo}var Vo,qh;function w1(){if(qh)return Vo;qh=1;const r=In(),f=Fn();function h(c){this.mode=r.KANJI,this.data=c}return h.getBitsLength=function(s){return s*13},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(c){let s;for(s=0;s<this.data.length;s++){let d=f.toSJIS(this.data[s]);if(d>=33088&&d<=40956)d-=33088;else if(d>=57408&&d<=60351)d-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);d=(d>>>8&255)*192+(d&255),c.put(d,13)}},Vo=h,Vo}var Zo={exports:{}},Gh;function T1(){return Gh||(Gh=1,(function(r){var f={single_source_shortest_paths:function(h,c,s){var d={},b={};b[c]=0;var w=f.PriorityQueue.make();w.push(c,0);for(var g,v,z,N,B,U,Y,P,pt;!w.empty();){g=w.pop(),v=g.value,N=g.cost,B=h[v]||{};for(z in B)B.hasOwnProperty(z)&&(U=B[z],Y=N+U,P=b[z],pt=typeof b[z]>"u",(pt||P>Y)&&(b[z]=Y,w.push(z,Y),d[z]=v))}if(typeof s<"u"&&typeof b[s]>"u"){var F=["Could not find a path from ",c," to ",s,"."].join("");throw new Error(F)}return d},extract_shortest_path_from_predecessor_list:function(h,c){for(var s=[],d=c;d;)s.push(d),h[d],d=h[d];return s.reverse(),s},find_path:function(h,c,s){var d=f.single_source_shortest_paths(h,c,s);return f.extract_shortest_path_from_predecessor_list(d,s)},PriorityQueue:{make:function(h){var c=f.PriorityQueue,s={},d;h=h||{};for(d in c)c.hasOwnProperty(d)&&(s[d]=c[d]);return s.queue=[],s.sorter=h.sorter||c.default_sorter,s},default_sorter:function(h,c){return h.cost-c.cost},push:function(h,c){var s={value:h,cost:c};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=f})(Zo)),Zo.exports}var kh;function A1(){return kh||(kh=1,(function(r){const f=In(),h=b1(),c=S1(),s=E1(),d=w1(),b=n0(),w=Fn(),g=T1();function v(F){return unescape(encodeURIComponent(F)).length}function z(F,j,L){const X=[];let W;for(;(W=F.exec(L))!==null;)X.push({data:W[0],index:W.index,mode:j,length:W[0].length});return X}function N(F){const j=z(b.NUMERIC,f.NUMERIC,F),L=z(b.ALPHANUMERIC,f.ALPHANUMERIC,F);let X,W;return w.isKanjiModeEnabled()?(X=z(b.BYTE,f.BYTE,F),W=z(b.KANJI,f.KANJI,F)):(X=z(b.BYTE_KANJI,f.BYTE,F),W=[]),j.concat(L,X,W).sort(function(H,K){return H.index-K.index}).map(function(H){return{data:H.data,mode:H.mode,length:H.length}})}function B(F,j){switch(j){case f.NUMERIC:return h.getBitsLength(F);case f.ALPHANUMERIC:return c.getBitsLength(F);case f.KANJI:return d.getBitsLength(F);case f.BYTE:return s.getBitsLength(F)}}function U(F){return F.reduce(function(j,L){const X=j.length-1>=0?j[j.length-1]:null;return X&&X.mode===L.mode?(j[j.length-1].data+=L.data,j):(j.push(L),j)},[])}function Y(F){const j=[];for(let L=0;L<F.length;L++){const X=F[L];switch(X.mode){case f.NUMERIC:j.push([X,{data:X.data,mode:f.ALPHANUMERIC,length:X.length},{data:X.data,mode:f.BYTE,length:X.length}]);break;case f.ALPHANUMERIC:j.push([X,{data:X.data,mode:f.BYTE,length:X.length}]);break;case f.KANJI:j.push([X,{data:X.data,mode:f.BYTE,length:v(X.data)}]);break;case f.BYTE:j.push([{data:X.data,mode:f.BYTE,length:v(X.data)}])}}return j}function P(F,j){const L={},X={start:{}};let W=["start"];for(let q=0;q<F.length;q++){const H=F[q],K=[];for(let Q=0;Q<H.length;Q++){const nt=H[Q],$=""+q+Q;K.push($),L[$]={node:nt,lastCount:0},X[$]={};for(let J=0;J<W.length;J++){const tt=W[J];L[tt]&&L[tt].node.mode===nt.mode?(X[tt][$]=B(L[tt].lastCount+nt.length,nt.mode)-B(L[tt].lastCount,nt.mode),L[tt].lastCount+=nt.length):(L[tt]&&(L[tt].lastCount=nt.length),X[tt][$]=B(nt.length,nt.mode)+4+f.getCharCountIndicator(nt.mode,j))}}W=K}for(let q=0;q<W.length;q++)X[W[q]].end=0;return{map:X,table:L}}function pt(F,j){let L;const X=f.getBestModeForData(F);if(L=f.from(j,X),L!==f.BYTE&&L.bit<X.bit)throw new Error('"'+F+'" cannot be encoded with mode '+f.toString(L)+`.
 Suggested mode is: `+f.toString(X));switch(L===f.KANJI&&!w.isKanjiModeEnabled()&&(L=f.BYTE),L){case f.NUMERIC:return new h(F);case f.ALPHANUMERIC:return new c(F);case f.KANJI:return new d(F);case f.BYTE:return new s(F)}}r.fromArray=function(j){return j.reduce(function(L,X){return typeof X=="string"?L.push(pt(X,null)):X.data&&L.push(pt(X.data,X.mode)),L},[])},r.fromString=function(j,L){const X=N(j,w.isKanjiModeEnabled()),W=Y(X),q=P(W,L),H=g.find_path(q.map,"start","end"),K=[];for(let Q=1;Q<H.length-1;Q++)K.push(q.table[H[Q]].node);return r.fromArray(U(K))},r.rawSplit=function(j){return r.fromArray(N(j,w.isKanjiModeEnabled()))}})(ko)),ko}var Yh;function x1(){if(Yh)return _o;Yh=1;const r=Fn(),f=tr(),h=r1(),c=s1(),s=f1(),d=d1(),b=h1(),w=t0(),g=y1(),v=p1(),z=v1(),N=In(),B=A1();function U(q,H){const K=q.size,Q=d.getPositions(H);for(let nt=0;nt<Q.length;nt++){const $=Q[nt][0],J=Q[nt][1];for(let tt=-1;tt<=7;tt++)if(!($+tt<=-1||K<=$+tt))for(let it=-1;it<=7;it++)J+it<=-1||K<=J+it||(tt>=0&&tt<=6&&(it===0||it===6)||it>=0&&it<=6&&(tt===0||tt===6)||tt>=2&&tt<=4&&it>=2&&it<=4?q.set($+tt,J+it,!0,!0):q.set($+tt,J+it,!1,!0))}}function Y(q){const H=q.size;for(let K=8;K<H-8;K++){const Q=K%2===0;q.set(K,6,Q,!0),q.set(6,K,Q,!0)}}function P(q,H){const K=s.getPositions(H);for(let Q=0;Q<K.length;Q++){const nt=K[Q][0],$=K[Q][1];for(let J=-2;J<=2;J++)for(let tt=-2;tt<=2;tt++)J===-2||J===2||tt===-2||tt===2||J===0&&tt===0?q.set(nt+J,$+tt,!0,!0):q.set(nt+J,$+tt,!1,!0)}}function pt(q,H){const K=q.size,Q=v.getEncodedBits(H);let nt,$,J;for(let tt=0;tt<18;tt++)nt=Math.floor(tt/3),$=tt%3+K-8-3,J=(Q>>tt&1)===1,q.set(nt,$,J,!0),q.set($,nt,J,!0)}function F(q,H,K){const Q=q.size,nt=z.getEncodedBits(H,K);let $,J;for($=0;$<15;$++)J=(nt>>$&1)===1,$<6?q.set($,8,J,!0):$<8?q.set($+1,8,J,!0):q.set(Q-15+$,8,J,!0),$<8?q.set(8,Q-$-1,J,!0):$<9?q.set(8,15-$-1+1,J,!0):q.set(8,15-$-1,J,!0);q.set(Q-8,8,1,!0)}function j(q,H){const K=q.size;let Q=-1,nt=K-1,$=7,J=0;for(let tt=K-1;tt>0;tt-=2)for(tt===6&&tt--;;){for(let it=0;it<2;it++)if(!q.isReserved(nt,tt-it)){let qt=!1;J<H.length&&(qt=(H[J]>>>$&1)===1),q.set(nt,tt-it,qt),$--,$===-1&&(J++,$=7)}if(nt+=Q,nt<0||K<=nt){nt-=Q,Q=-Q;break}}}function L(q,H,K){const Q=new h;K.forEach(function(it){Q.put(it.mode.bit,4),Q.put(it.getLength(),N.getCharCountIndicator(it.mode,q)),it.write(Q)});const nt=r.getSymbolTotalCodewords(q),$=w.getTotalCodewordsCount(q,H),J=(nt-$)*8;for(Q.getLengthInBits()+4<=J&&Q.put(0,4);Q.getLengthInBits()%8!==0;)Q.putBit(0);const tt=(J-Q.getLengthInBits())/8;for(let it=0;it<tt;it++)Q.put(it%2?17:236,8);return X(Q,q,H)}function X(q,H,K){const Q=r.getSymbolTotalCodewords(H),nt=w.getTotalCodewordsCount(H,K),$=Q-nt,J=w.getBlocksCount(H,K),tt=Q%J,it=J-tt,qt=Math.floor(Q/J),_=Math.floor($/J),k=_+1,lt=qt-_,Tt=new g(lt);let Et=0;const p=new Array(J),O=new Array(J);let G=0;const Z=new Uint8Array(q.buffer);for(let Ct=0;Ct<J;Ct++){const He=Ct<it?_:k;p[Ct]=Z.slice(Et,Et+He),O[Ct]=Tt.encode(p[Ct]),Et+=He,G=Math.max(G,He)}const ut=new Uint8Array(Q);let st=0,ft,zt;for(ft=0;ft<G;ft++)for(zt=0;zt<J;zt++)ft<p[zt].length&&(ut[st++]=p[zt][ft]);for(ft=0;ft<lt;ft++)for(zt=0;zt<J;zt++)ut[st++]=O[zt][ft];return ut}function W(q,H,K,Q){let nt;if(Array.isArray(q))nt=B.fromArray(q);else if(typeof q=="string"){let qt=H;if(!qt){const _=B.rawSplit(q);qt=v.getBestVersionForData(_,K)}nt=B.fromString(q,qt||40)}else throw new Error("Invalid data");const $=v.getBestVersionForData(nt,K);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!H)H=$;else if(H<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const J=L(H,K,nt),tt=r.getSymbolSize(H),it=new c(tt);return U(it,H),Y(it),P(it,H),F(it,K,0),H>=7&&pt(it,H),j(it,J),isNaN(Q)&&(Q=b.getBestMask(it,F.bind(null,it,K))),b.applyMask(Q,it),F(it,K,Q),{modules:it,version:H,errorCorrectionLevel:K,maskPattern:Q,segments:nt}}return _o.create=function(H,K){if(typeof H>"u"||H==="")throw new Error("No input text");let Q=f.M,nt,$;return typeof K<"u"&&(Q=f.from(K.errorCorrectionLevel,f.M),nt=v.from(K.version),$=b.from(K.maskPattern),K.toSJISFunc&&r.setToSJISFunction(K.toSJISFunc)),W(H,nt,Q,$)},_o}var Ko={},Jo={},Qh;function l0(){return Qh||(Qh=1,(function(r){function f(h){if(typeof h=="number"&&(h=h.toString()),typeof h!="string")throw new Error("Color should be defined as hex string");let c=h.slice().replace("#","").split("");if(c.length<3||c.length===5||c.length>8)throw new Error("Invalid hex color: "+h);(c.length===3||c.length===4)&&(c=Array.prototype.concat.apply([],c.map(function(d){return[d,d]}))),c.length===6&&c.push("F","F");const s=parseInt(c.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+c.slice(0,6).join("")}}r.getOptions=function(c){c||(c={}),c.color||(c.color={});const s=typeof c.margin>"u"||c.margin===null||c.margin<0?4:c.margin,d=c.width&&c.width>=21?c.width:void 0,b=c.scale||4;return{width:d,scale:d?4:b,margin:s,color:{dark:f(c.color.dark||"#000000ff"),light:f(c.color.light||"#ffffffff")},type:c.type,rendererOpts:c.rendererOpts||{}}},r.getScale=function(c,s){return s.width&&s.width>=c+s.margin*2?s.width/(c+s.margin*2):s.scale},r.getImageWidth=function(c,s){const d=r.getScale(c,s);return Math.floor((c+s.margin*2)*d)},r.qrToImageData=function(c,s,d){const b=s.modules.size,w=s.modules.data,g=r.getScale(b,d),v=Math.floor((b+d.margin*2)*g),z=d.margin*g,N=[d.color.light,d.color.dark];for(let B=0;B<v;B++)for(let U=0;U<v;U++){let Y=(B*v+U)*4,P=d.color.light;if(B>=z&&U>=z&&B<v-z&&U<v-z){const pt=Math.floor((B-z)/g),F=Math.floor((U-z)/g);P=N[w[pt*b+F]?1:0]}c[Y++]=P.r,c[Y++]=P.g,c[Y++]=P.b,c[Y]=P.a}}})(Jo)),Jo}var Xh;function C1(){return Xh||(Xh=1,(function(r){const f=l0();function h(s,d,b){s.clearRect(0,0,d.width,d.height),d.style||(d.style={}),d.height=b,d.width=b,d.style.height=b+"px",d.style.width=b+"px"}function c(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(d,b,w){let g=w,v=b;typeof g>"u"&&(!b||!b.getContext)&&(g=b,b=void 0),b||(v=c()),g=f.getOptions(g);const z=f.getImageWidth(d.modules.size,g),N=v.getContext("2d"),B=N.createImageData(z,z);return f.qrToImageData(B.data,d,g),h(N,v,z),N.putImageData(B,0,0),v},r.renderToDataURL=function(d,b,w){let g=w;typeof g>"u"&&(!b||!b.getContext)&&(g=b,b=void 0),g||(g={});const v=r.render(d,b,g),z=g.type||"image/png",N=g.rendererOpts||{};return v.toDataURL(z,N.quality)}})(Ko)),Ko}var Fo={},Vh;function N1(){if(Vh)return Fo;Vh=1;const r=l0();function f(s,d){const b=s.a/255,w=d+'="'+s.hex+'"';return b<1?w+" "+d+'-opacity="'+b.toFixed(2).slice(1)+'"':w}function h(s,d,b){let w=s+d;return typeof b<"u"&&(w+=" "+b),w}function c(s,d,b){let w="",g=0,v=!1,z=0;for(let N=0;N<s.length;N++){const B=Math.floor(N%d),U=Math.floor(N/d);!B&&!v&&(v=!0),s[N]?(z++,N>0&&B>0&&s[N-1]||(w+=v?h("M",B+b,.5+U+b):h("m",g,0),g=0,v=!1),B+1<d&&s[N+1]||(w+=h("h",z),z=0)):g++}return w}return Fo.render=function(d,b,w){const g=r.getOptions(b),v=d.modules.size,z=d.modules.data,N=v+g.margin*2,B=g.color.light.a?"<path "+f(g.color.light,"fill")+' d="M0 0h'+N+"v"+N+'H0z"/>':"",U="<path "+f(g.color.dark,"stroke")+' d="'+c(z,v,g.margin)+'"/>',Y='viewBox="0 0 '+N+" "+N+'"',pt='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+Y+' shape-rendering="crispEdges">'+B+U+`</svg>
`;return typeof w=="function"&&w(null,pt),pt},Fo}var Zh;function _1(){if(Zh)return Ul;Zh=1;const r=o1(),f=x1(),h=C1(),c=N1();function s(d,b,w,g,v){const z=[].slice.call(arguments,1),N=z.length,B=typeof z[N-1]=="function";if(!B&&!r())throw new Error("Callback required as last argument");if(B){if(N<2)throw new Error("Too few arguments provided");N===2?(v=w,w=b,b=g=void 0):N===3&&(b.getContext&&typeof v>"u"?(v=g,g=void 0):(v=g,g=w,w=b,b=void 0))}else{if(N<1)throw new Error("Too few arguments provided");return N===1?(w=b,b=g=void 0):N===2&&!b.getContext&&(g=w,w=b,b=void 0),new Promise(function(U,Y){try{const P=f.create(w,g);U(d(P,b,g))}catch(P){Y(P)}})}try{const U=f.create(w,g);v(null,d(U,b,g))}catch(U){v(U)}}return Ul.create=f.create,Ul.toCanvas=s.bind(null,h.render),Ul.toDataURL=s.bind(null,h.renderToDataURL),Ul.toString=s.bind(null,function(d,b,w){return c.render(d,w)}),Ul}var R1=_1();const M1=_g(R1),Io=`${window.location.origin}/hpde/pr-preview/pr-122/`;function z1(){const[r,f]=St.useState(!1),[h,c]=St.useState(null);St.useEffect(()=>{window.scrollTo(0,0),M1.toDataURL(Io,{margin:1,width:240}).then(c).catch(()=>c(null))},[]);async function s(){await navigator.clipboard.writeText(Io),f(!0),setTimeout(()=>f(!1),2e3)}return E.jsx("div",{className:"min-h-screen bg-gray-50",children:E.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[E.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[E.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),E.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:E.jsx(Wh,{size:18})})]}),E.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),E.jsxs("button",{onClick:s,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[E.jsx("span",{className:"truncate text-sm text-gray-800",children:Io}),r?E.jsx(eu,{size:16,className:"shrink-0 text-green-600"}):E.jsx(Ih,{size:16,className:"shrink-0 text-gray-400"})]}),E.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:h&&E.jsx("img",{src:h,alt:"QR code for schedule link",width:240,height:240})})]})})}function za(r,f){const h=f.split(`
`).map(z=>z.trim());let c="",s="",d;const b=[],w=[];let g=null,v=!1;for(const z of h)if(!(!z||z.startsWith("//"))){if(z.startsWith("# ")){c=z.slice(2).trim();continue}if(z.startsWith("subtitle:")){s=z.slice(9).trim();continue}if(z.startsWith("link:")){d=z.slice(5).trim()||void 0;continue}if(z.startsWith("## ")){const N=z.slice(3).trim();if(N.toLowerCase()==="groups"){v=!0,g=null;continue}const B=N.split("|").map(U=>U.trim());B.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(B[1])?(v=!1,g={id:B[0].toLowerCase().replace(/\s+/g,"-"),label:B[0],date:B[1],events:[]},w.push(g)):v=!1;continue}if(v){const N=z.split("|").map(B=>B.trim());if(N.length>=4){const B=N[4]||void 0;b.push({id:N[0],label:N[1],bgClass:N[2],textClass:N[3],...B?{description:B}:{}})}continue}if(g){if(/^\d{2}:\d{2}/.test(z)){const N=D1(z);N&&g.events.push(N)}else if(/^break\s*\|/.test(z)){const N=z.slice(z.indexOf("|")+1).trim();g.events.push({type:"break",label:N})}}}return{id:r,name:c,subtitle:s,...d?{link:d}:{},runGroups:b,days:w}}function D1(r){const f=r.split("|").map(w=>w.trim()),h=f[0],c=f.slice(1),s=h.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!s)return null;const d=s[1],b=s[2].trim();if(/^(general|lunch|special)$/.test(b)){const w=b,g=c[0]??"",v=c[1]||void 0;return{time:d,type:w,label:g,...v?{subtitle:v}:{}}}if(/^session/.test(b)){const w=b.match(/^session\s+(\d+)/),g=w?parseInt(w[1],10):void 0;let v=[],z=[],N;for(const B of c)B.startsWith("on:")?v=B.slice(3).trim().split(",").map(U=>U.trim()).filter(Boolean):B.startsWith("in:")?z=B.slice(3).trim().split(",").map(U=>U.trim()).filter(Boolean):B.startsWith("note:")&&(N=B.slice(5).trim()||void 0);return{time:d,type:"session",...g!==void 0?{sessionNumber:g}:{},onTrack:v,...z.length?{inClass:z}:{},...N?{note:N}:{}}}return null}const O1=`# MSRC 1.7
subtitle: Sep 11–12, 2026 · MSR Cresson

## groups
instructors | Instructors | bg-zinc-900      | text-white
pink        | Pink        | bg-runpink-500   | text-white
purple      | Purple      | bg-runpurple-500 | text-white
orange      | Orange      | bg-runorange-500 | text-white

## Friday | 2026-09-11

16:00 general | Gates open for unloading / set-up | Not mandatory
17:00 general | Opportunity to walk the track
22:00 general | Gates close

## Saturday | 2026-09-12

06:30 general | Track gates open | Possibly 6:00 per email reminder
07:00 general | Instructor's meeting
07:00 general | Drivers sign-in | Ends at 7:20 — have tech sheet ready; new drivers bring license and insurance
07:30 general | Mandatory drivers meeting | MSRC clubhouse upstairs
08:00 general | Track goes hot

08:00 session 1 | on: instructors | in: purple
08:30 session 1 | on: pink
08:55 session 1 | on: purple      | in: pink
break | 10 minute instructor / corner worker break
09:30 session 1 | on: orange      | in: purple

09:55 session 2 | on: instructors | in: orange
10:25 session 2 | on: pink
10:50 session 2 | on: purple
11:15 session 2 | on: orange      | in: purple

11:40 lunch | Lunch / Lead-follow laps | 40 minutes · no food vendor on site

12:20 session 3 | on: instructors
12:50 session 3 | on: pink
13:15 session 3 | on: purple      | in: pink
break | 10 minute instructor / corner worker break
13:50 session 3 | on: orange      | in: purple

14:15 session 4 | on: instructors | in: orange
14:35 session 4 | on: pink
15:00 session 4 | on: purple
15:25 session 4 | on: orange      | in: purple

15:50 session 5 | on: pink
16:10 session 5 | on: purple
16:30 session 5 | on: orange

16:50 general | Track goes cold
`,B1="/hpde/pr-preview/pr-122/assets/msrc-1-7-D9G0r_nf.jpg",U1={...za("2026-09-11_msrc-1-7",O1),mapImage:B1},H1=`# TXR SCCA
subtitle: Sep 13, 2026 · MSR
link: https://www.motorsportreg.com/events/txr-scca-time-trial-track-day-hpde-7-motorsport-ranch-cresson-texas-556724

## groups
red    | Red    | bg-runred-500    | text-white | Time Trial
green  | Green  | bg-rungreen-500  | text-white | Time Trial
purple | Purple | bg-runpurple-500 | text-white | Time Trial
orange | Orange | bg-runorange-500 | text-white | Track Day
blue   | Blue   | bg-runblue-500   | text-white | Novice

## Sunday | 2026-09-13

06:30 general | Gates open
07:00 general | Registration / check-in opens
07:45 general | Instructor's meeting
08:00 general | Mandatory all drivers meeting | In clubhouse

08:30 session 1 | on: red | in: blue
08:50 session 1 | on: green
09:10 session 1 | on: purple
09:30 session 1 | on: orange
09:50 session 1 | on: blue
break | 10 minute corner worker break

10:25 session 2 | on: red | in: blue
10:45 session 2 | on: green
11:05 session 2 | on: purple
11:25 session 2 | on: orange
11:45 session 2 | on: blue

12:10 lunch | Lunch | 60 minutes

13:10 session 3 | on: red | in: blue
13:30 session 3 | on: green
13:50 session 3 | on: purple
14:10 session 3 | on: orange
14:30 session 3 | on: blue
break | 10 minute corner worker break

15:05 session 4 | on: red    | note: Report to impound after session
15:25 session 4 | on: green  | note: Report to impound after session
15:45 session 4 | on: purple | note: Report to impound after session
16:05 session 4 | on: orange
16:25 session 4 | on: blue
16:50 session 4 | on: blue | note: Novice demo session

17:00 general | Track is cold
17:15 general | Refreshments and trophies
`,j1=za("2026-09-13_msr-scca",H1),L1=`# MSRC 1.7 Fast Track
subtitle: June 6, 2026

## groups
instructors | Instructors | bg-zinc-900 | text-white
pink | Pink | bg-runpink-500 | text-white
orange | Orange | bg-runorange-500 | text-white

## Saturday | 2026-06-06

07:00 general | Instructor's meeting
07:15 general | Drivers sign-in
07:30 general | Driver's meeting
08:00 general | Track goes hot

08:00 session 1 | on: instructors
08:25 session 1 | on: pink
08:50 session 1 | on: orange
break | Instructor / corner worker break

09:20 session 2 | on: instructors
09:45 session 2 | on: pink
10:10 session 2 | on: orange | in: pink
break | Instructor / corner worker break

10:40 session 3 | on: instructors | in: orange
11:05 session 3 | on: pink
11:30 session 3 | on: orange

12:05 lunch | Lunch break / lead-follow laps | 40 minutes

12:45 session 4 | on: instructors
13:10 session 4 | on: pink
13:35 session 4 | on: orange
break | Corner worker break

14:05 session 5 | on: pink
14:25 session 5 | on: orange
14:45 general | Track goes cold
`,q1=za("2026-06-06_msrc-1-7",L1),G1=`# MSRC 3.1
subtitle: Nov 7–9, 2025

## groups
instructors | Instructors | bg-zinc-900 | text-white
red | Red | bg-runred-500 | text-white
yellow | Yellow | bg-runyellow-500 | text-white
green | Green | bg-rungreen-500 | text-white
blue | Blue | bg-runblue-500 | text-white

## Friday | 2025-11-07

16:00 general | Gates open for unloading / set-up
17:00 general | Opportunity to walk the track
22:00 general | Gates close

## Saturday | 2025-11-08

06:30 general | Track gates open
07:15 general | Drivers sign in | Bring tech sheet, driver's license, and insurance card
07:30 general | Instructor meeting
08:00 general | Mandatory drivers meeting
08:30 general | Track goes hot

08:30 session 1 | on: instructors | in: green
08:55 session 1 | on: red | in: blue
09:20 session 1 | on: green
09:45 session 1 | on: yellow | in: green
10:10 session 1 | on: blue | in: yellow, red

10:40 session 2 | on: instructors
11:05 session 2 | on: red
11:30 session 2 | on: green
11:55 session 2 | on: yellow | in: green
12:20 session 2 | on: blue

12:45 lunch | Lunch / Lead-follow laps | Hot lunch available 11:00 AM – 1:30 PM

13:15 session 3 | on: red | in: blue
13:40 session 3 | on: green
14:05 session 3 | on: yellow | in: green
14:30 session 3 | on: blue | in: yellow, red
15:00 session 3 | on: instructors

15:25 session 4 | on: red
15:50 session 4 | on: green
16:15 session 4 | on: yellow
16:40 session 4 | on: blue
17:05 session 4 | on: instructors

17:30 special | Pizza party (BYOB) | Hosted by Five Star Performance Ford

## Sunday | 2025-11-09

07:00 general | Track gates open
07:10 general | Church service
07:30 general | Instructor meeting
08:00 general | Mandatory drivers meeting
08:30 general | Track goes hot

08:30 session 1 | on: instructors | in: green
08:55 session 1 | on: red | in: blue
09:20 session 1 | on: green
09:45 session 1 | on: yellow | in: green
10:10 session 1 | on: blue | in: yellow, red

10:40 session 2 | on: instructors
11:05 session 2 | on: red
11:30 session 2 | on: green
11:55 session 2 | on: yellow
12:20 session 2 | on: blue

12:45 lunch | Lunch / Lead-follow laps | Hot lunch available 11:00 AM – 1:30 PM

13:15 session 3 | on: instructors
13:40 session 3 | on: red | in: blue
14:05 session 3 | on: green
14:30 session 3 | on: yellow | in: green
14:55 session 3 | on: blue | in: yellow, red

15:25 session 4 | on: red
15:45 session 4 | on: green
16:05 session 4 | on: yellow
16:30 session 4 | on: blue
`,k1=za("2025-11-07_msrc-3-1",G1),Y1=`# ECR 2.7
subtitle: May 30, 2026

## groups
instructors | Instructors | bg-zinc-900 | text-white
orange | Orange | bg-runorange-500 | text-white
pink | Pink | bg-runpink-500 | text-white
purple | Purple | bg-runpurple-500 | text-white

## Saturday | 2026-05-30

06:30 general | Track gates open
07:15 general | Drivers sign in | 7:15 – 7:45 AM
07:30 general | Instructor meeting
08:00 general | Drivers meeting
08:30 general | Track goes hot

08:30 session | on: instructors | in: purple
08:50 session | on: pink
09:15 session | on: purple | in: pink
break | Instructor break

09:50 session 1 | on: orange | in: purple
break | Corner worker break
10:25 session | on: instructors | in: orange

10:45 session | on: pink
11:10 session | on: purple
break | Instructor break

11:45 session 2 | on: orange | in: purple

12:10 lunch | Lunch / Lead-follow laps

12:40 session | on: instructors
13:00 session | on: pink
13:25 session | on: purple | in: pink
break | Instructor break

14:00 session 3 | on: orange | in: purple
break | Corner worker break
14:35 session | on: instructors | in: orange

14:55 session | on: pink
15:20 session | on: purple
break | Instructor break

15:55 session 4 | on: orange | in: purple
break | Corner worker break
16:25 session | on: pink
16:45 session | on: purple
break | Instructor break

17:15 session 5 | on: orange

17:35 general | Track goes cold
`,Q1=za("2026-05-30_ecr-2-7",Y1),Wi=[U1,j1,q1,Q1,k1].sort((r,f)=>f.id.localeCompare(r.id));function $i(r,f){const[h,c]=St.useState(()=>{try{const s=localStorage.getItem(r);return s!==null?JSON.parse(s):f}catch{return f}});return St.useEffect(()=>{localStorage.setItem(r,JSON.stringify(h))},[r,h]),[h,c]}function a0(r){const f=tu();return r.days.find(h=>h.date===f)}function Kh(r){return a0(r)??r.days[0]}function X1(){const[r,f]=St.useState(()=>window.location.hash);return St.useEffect(()=>{const h=()=>{f(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",h),()=>window.removeEventListener("hashchange",h)},[]),r}function V1(){const r=X1(),[f,h]=St.useState("schedule"),[c,s]=$i("hpde:activeEvent",Wi[0].id),[d,b]=$i("hpde:activeDay",null),[w,g]=$i("hpde:groups",[]),[v,z]=$i("hpde:hidePast",!1),N=Wi.find(W=>W.id===c)??Wi[0],B=N.days.find(W=>W.id===d)??Kh(N),U=a0(N),Y=B.date===tu(),P=N.days.length>1,F=N.days.reduce((W,q)=>q.date>W?q.date:W,N.days[0].date)<tu(),[,j]=St.useState(0);St.useEffect(()=>{if(!Y)return;const W=setInterval(()=>j(q=>q+1),6e4);return()=>clearInterval(W)},[Y]);const L=Y&&B.events.some(W=>W.type!=="break"&&en(W.time)<Po());function X(W){s(W.id),b(Kh(W).id),g([])}return r==="#/widget-script"?E.jsx(c1,{}):r==="#/share"?E.jsx(z1,{}):E.jsx(i1,{children:E.jsxs("div",{className:"min-h-screen bg-gray-50",children:[E.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[E.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[E.jsx(n1,{events:Wi,active:N,onChange:X}),E.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[E.jsx("button",{onClick:()=>h("schedule"),className:`rounded-md p-2 transition-colors ${f==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:E.jsx(Yg,{size:18})}),E.jsx("button",{onClick:()=>h("map"),className:`rounded-md p-2 transition-colors ${f==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:E.jsx(hh,{size:18})})]})]}),F&&E.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),f==="schedule"&&E.jsxs(E.Fragment,{children:[P&&E.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[E.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:N.days.map(W=>E.jsx("button",{onClick:()=>b(W.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${B.id===W.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:W.label},W.id))}),E.jsx("button",{onClick:()=>U&&b(U.id),disabled:Y||!U,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${Y||!U?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),E.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[E.jsx(e1,{groups:N.runGroups,selected:w,onChange:g}),L&&E.jsx(l1,{checked:v,onChange:()=>z(W=>!W),label:"Hide past events"})]}),E.jsx(t1,{events:B.events,runGroups:N.runGroups,isToday:Y,selectedGroups:w,hidePast:v}),E.jsx(u1,{groups:N.runGroups})]}),f==="map"&&(N.mapImage?E.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:E.jsx("img",{src:N.mapImage,alt:`${N.name} track map`,className:"block w-full h-auto"})}):E.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:E.jsxs("div",{className:"text-center",children:[E.jsx(hh,{size:40,className:"mx-auto mb-2 opacity-30"}),E.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),E.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[E.jsxs("div",{children:[E.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",E.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),E.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",Wg("2026-09-16T16:23:12-05:00")]})]})]})})}Lg.createRoot(document.getElementById("root")).render(E.jsx(St.StrictMode,{children:E.jsx(V1,{})}));
