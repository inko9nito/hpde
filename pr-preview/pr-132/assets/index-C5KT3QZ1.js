(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const v of d.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&c(v)}).observe(document,{childList:!0,subtree:!0});function h(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function c(s){if(s.ep)return;s.ep=!0;const d=h(s);fetch(s.href,d)}})();function Bg(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var To={exports:{}},za={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uh;function Ug(){if(uh)return za;uh=1;var o=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function h(c,s,d){var v=null;if(d!==void 0&&(v=""+d),s.key!==void 0&&(v=""+s.key),"key"in s){d={};for(var w in s)w!=="key"&&(d[w]=s[w])}else d=s;return s=d.ref,{$$typeof:o,type:c,key:v,ref:s!==void 0?s:null,props:d}}return za.Fragment=f,za.jsx=h,za.jsxs=h,za}var ch;function Hg(){return ch||(ch=1,To.exports=Ug()),To.exports}var S=Hg(),xo={exports:{}},ct={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oh;function jg(){if(oh)return ct;oh=1;var o=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),v=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),B=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),U=Symbol.iterator;function H(p){return p===null||typeof p!="object"?null:(p=U&&p[U]||p["@@iterator"],typeof p=="function"?p:null)}var O={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},G=Object.assign,it={};function Z(p,z,Y){this.props=p,this.context=z,this.refs=it,this.updater=Y||O}Z.prototype.isReactComponent={},Z.prototype.setState=function(p,z){if(typeof p!="object"&&typeof p!="function"&&p!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,p,z,"setState")},Z.prototype.forceUpdate=function(p){this.updater.enqueueForceUpdate(this,p,"forceUpdate")};function q(){}q.prototype=Z.prototype;function k(p,z,Y){this.props=p,this.context=z,this.refs=it,this.updater=Y||O}var K=k.prototype=new q;K.constructor=k,G(K,Z.prototype),K.isPureReactComponent=!0;var st=Array.isArray;function Q(){}var L={H:null,A:null,T:null,S:null},j=Object.prototype.hasOwnProperty;function X(p,z,Y){var F=Y.ref;return{$$typeof:o,type:p,key:z,ref:F!==void 0?F:null,props:Y}}function et(p,z){return X(p.type,z,p.props)}function $(p){return typeof p=="object"&&p!==null&&p.$$typeof===o}function I(p){var z={"=":"=0",":":"=2"};return"$"+p.replace(/[=:]/g,function(Y){return z[Y]})}var P=/\/+/g;function at(p,z){return typeof p=="object"&&p!==null&&p.key!=null?I(""+p.key):z.toString(36)}function qt(p){switch(p.status){case"fulfilled":return p.value;case"rejected":throw p.reason;default:switch(typeof p.status=="string"?p.then(Q,Q):(p.status="pending",p.then(function(z){p.status==="pending"&&(p.status="fulfilled",p.value=z)},function(z){p.status==="pending"&&(p.status="rejected",p.reason=z)})),p.status){case"fulfilled":return p.value;case"rejected":throw p.reason}}throw p}function C(p,z,Y,F,ut){var ft=typeof p;(ft==="undefined"||ft==="boolean")&&(p=null);var dt=!1;if(p===null)dt=!0;else switch(ft){case"bigint":case"string":case"number":dt=!0;break;case"object":switch(p.$$typeof){case o:case f:dt=!0;break;case B:return dt=p._init,C(dt(p._payload),z,Y,F,ut)}}if(dt)return ut=ut(p),dt=F===""?"."+at(p,0):F,st(ut)?(Y="",dt!=null&&(Y=dt.replace(P,"$&/")+"/"),C(ut,z,Y,"",function(He){return He})):ut!=null&&($(ut)&&(ut=et(ut,Y+(ut.key==null||p&&p.key===ut.key?"":(""+ut.key).replace(P,"$&/")+"/")+dt)),z.push(ut)),1;dt=0;var zt=F===""?".":F+":";if(st(p))for(var Nt=0;Nt<p.length;Nt++)F=p[Nt],ft=zt+at(F,Nt),dt+=C(F,z,Y,ft,ut);else if(Nt=H(p),typeof Nt=="function")for(p=Nt.call(p),Nt=0;!(F=p.next()).done;)F=F.value,ft=zt+at(F,Nt++),dt+=C(F,z,Y,ft,ut);else if(ft==="object"){if(typeof p.then=="function")return C(qt(p),z,Y,F,ut);throw z=String(p),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(p).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.")}return dt}function V(p,z,Y){if(p==null)return p;var F=[],ut=0;return C(p,F,"","",function(ft){return z.call(Y,ft,ut++)}),F}function nt(p){if(p._status===-1){var z=p._result;z=z(),z.then(function(Y){(p._status===0||p._status===-1)&&(p._status=1,p._result=Y)},function(Y){(p._status===0||p._status===-1)&&(p._status=2,p._result=Y)}),p._status===-1&&(p._status=0,p._result=z)}if(p._status===1)return p._result.default;throw p._result}var Tt=typeof reportError=="function"?reportError:function(p){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof p=="object"&&p!==null&&typeof p.message=="string"?String(p.message):String(p),error:p});if(!window.dispatchEvent(z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",p);return}console.error(p)},Et={map:V,forEach:function(p,z,Y){V(p,function(){z.apply(this,arguments)},Y)},count:function(p){var z=0;return V(p,function(){z++}),z},toArray:function(p){return V(p,function(z){return z})||[]},only:function(p){if(!$(p))throw Error("React.Children.only expected to receive a single React element child.");return p}};return ct.Activity=D,ct.Children=Et,ct.Component=Z,ct.Fragment=h,ct.Profiler=s,ct.PureComponent=k,ct.StrictMode=c,ct.Suspense=m,ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=L,ct.__COMPILER_RUNTIME={__proto__:null,c:function(p){return L.H.useMemoCache(p)}},ct.cache=function(p){return function(){return p.apply(null,arguments)}},ct.cacheSignal=function(){return null},ct.cloneElement=function(p,z,Y){if(p==null)throw Error("The argument must be a React element, but you passed "+p+".");var F=G({},p.props),ut=p.key;if(z!=null)for(ft in z.key!==void 0&&(ut=""+z.key),z)!j.call(z,ft)||ft==="key"||ft==="__self"||ft==="__source"||ft==="ref"&&z.ref===void 0||(F[ft]=z[ft]);var ft=arguments.length-2;if(ft===1)F.children=Y;else if(1<ft){for(var dt=Array(ft),zt=0;zt<ft;zt++)dt[zt]=arguments[zt+2];F.children=dt}return X(p.type,ut,F)},ct.createContext=function(p){return p={$$typeof:v,_currentValue:p,_currentValue2:p,_threadCount:0,Provider:null,Consumer:null},p.Provider=p,p.Consumer={$$typeof:d,_context:p},p},ct.createElement=function(p,z,Y){var F,ut={},ft=null;if(z!=null)for(F in z.key!==void 0&&(ft=""+z.key),z)j.call(z,F)&&F!=="key"&&F!=="__self"&&F!=="__source"&&(ut[F]=z[F]);var dt=arguments.length-2;if(dt===1)ut.children=Y;else if(1<dt){for(var zt=Array(dt),Nt=0;Nt<dt;Nt++)zt[Nt]=arguments[Nt+2];ut.children=zt}if(p&&p.defaultProps)for(F in dt=p.defaultProps,dt)ut[F]===void 0&&(ut[F]=dt[F]);return X(p,ft,ut)},ct.createRef=function(){return{current:null}},ct.forwardRef=function(p){return{$$typeof:w,render:p}},ct.isValidElement=$,ct.lazy=function(p){return{$$typeof:B,_payload:{_status:-1,_result:p},_init:nt}},ct.memo=function(p,z){return{$$typeof:b,type:p,compare:z===void 0?null:z}},ct.startTransition=function(p){var z=L.T,Y={};L.T=Y;try{var F=p(),ut=L.S;ut!==null&&ut(Y,F),typeof F=="object"&&F!==null&&typeof F.then=="function"&&F.then(Q,Tt)}catch(ft){Tt(ft)}finally{z!==null&&Y.types!==null&&(z.types=Y.types),L.T=z}},ct.unstable_useCacheRefresh=function(){return L.H.useCacheRefresh()},ct.use=function(p){return L.H.use(p)},ct.useActionState=function(p,z,Y){return L.H.useActionState(p,z,Y)},ct.useCallback=function(p,z){return L.H.useCallback(p,z)},ct.useContext=function(p){return L.H.useContext(p)},ct.useDebugValue=function(){},ct.useDeferredValue=function(p,z){return L.H.useDeferredValue(p,z)},ct.useEffect=function(p,z){return L.H.useEffect(p,z)},ct.useEffectEvent=function(p){return L.H.useEffectEvent(p)},ct.useId=function(){return L.H.useId()},ct.useImperativeHandle=function(p,z,Y){return L.H.useImperativeHandle(p,z,Y)},ct.useInsertionEffect=function(p,z){return L.H.useInsertionEffect(p,z)},ct.useLayoutEffect=function(p,z){return L.H.useLayoutEffect(p,z)},ct.useMemo=function(p,z){return L.H.useMemo(p,z)},ct.useOptimistic=function(p,z){return L.H.useOptimistic(p,z)},ct.useReducer=function(p,z,Y){return L.H.useReducer(p,z,Y)},ct.useRef=function(p){return L.H.useRef(p)},ct.useState=function(p){return L.H.useState(p)},ct.useSyncExternalStore=function(p,z,Y){return L.H.useSyncExternalStore(p,z,Y)},ct.useTransition=function(){return L.H.useTransition()},ct.version="19.2.6",ct}var rh;function er(){return rh||(rh=1,xo.exports=jg()),xo.exports}var pt=er(),Ao={exports:{}},Da={},No={exports:{}},Co={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sh;function Lg(){return sh||(sh=1,(function(o){function f(C,V){var nt=C.length;C.push(V);t:for(;0<nt;){var Tt=nt-1>>>1,Et=C[Tt];if(0<s(Et,V))C[Tt]=V,C[nt]=Et,nt=Tt;else break t}}function h(C){return C.length===0?null:C[0]}function c(C){if(C.length===0)return null;var V=C[0],nt=C.pop();if(nt!==V){C[0]=nt;t:for(var Tt=0,Et=C.length,p=Et>>>1;Tt<p;){var z=2*(Tt+1)-1,Y=C[z],F=z+1,ut=C[F];if(0>s(Y,nt))F<Et&&0>s(ut,Y)?(C[Tt]=ut,C[F]=nt,Tt=F):(C[Tt]=Y,C[z]=nt,Tt=z);else if(F<Et&&0>s(ut,nt))C[Tt]=ut,C[F]=nt,Tt=F;else break t}}return V}function s(C,V){var nt=C.sortIndex-V.sortIndex;return nt!==0?nt:C.id-V.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;o.unstable_now=function(){return d.now()}}else{var v=Date,w=v.now();o.unstable_now=function(){return v.now()-w}}var m=[],b=[],B=1,D=null,U=3,H=!1,O=!1,G=!1,it=!1,Z=typeof setTimeout=="function"?setTimeout:null,q=typeof clearTimeout=="function"?clearTimeout:null,k=typeof setImmediate<"u"?setImmediate:null;function K(C){for(var V=h(b);V!==null;){if(V.callback===null)c(b);else if(V.startTime<=C)c(b),V.sortIndex=V.expirationTime,f(m,V);else break;V=h(b)}}function st(C){if(G=!1,K(C),!O)if(h(m)!==null)O=!0,Q||(Q=!0,I());else{var V=h(b);V!==null&&qt(st,V.startTime-C)}}var Q=!1,L=-1,j=5,X=-1;function et(){return it?!0:!(o.unstable_now()-X<j)}function $(){if(it=!1,Q){var C=o.unstable_now();X=C;var V=!0;try{t:{O=!1,G&&(G=!1,q(L),L=-1),H=!0;var nt=U;try{e:{for(K(C),D=h(m);D!==null&&!(D.expirationTime>C&&et());){var Tt=D.callback;if(typeof Tt=="function"){D.callback=null,U=D.priorityLevel;var Et=Tt(D.expirationTime<=C);if(C=o.unstable_now(),typeof Et=="function"){D.callback=Et,K(C),V=!0;break e}D===h(m)&&c(m),K(C)}else c(m);D=h(m)}if(D!==null)V=!0;else{var p=h(b);p!==null&&qt(st,p.startTime-C),V=!1}}break t}finally{D=null,U=nt,H=!1}V=void 0}}finally{V?I():Q=!1}}}var I;if(typeof k=="function")I=function(){k($)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,at=P.port2;P.port1.onmessage=$,I=function(){at.postMessage(null)}}else I=function(){Z($,0)};function qt(C,V){L=Z(function(){C(o.unstable_now())},V)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(C){C.callback=null},o.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<C?Math.floor(1e3/C):5},o.unstable_getCurrentPriorityLevel=function(){return U},o.unstable_next=function(C){switch(U){case 1:case 2:case 3:var V=3;break;default:V=U}var nt=U;U=V;try{return C()}finally{U=nt}},o.unstable_requestPaint=function(){it=!0},o.unstable_runWithPriority=function(C,V){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var nt=U;U=C;try{return V()}finally{U=nt}},o.unstable_scheduleCallback=function(C,V,nt){var Tt=o.unstable_now();switch(typeof nt=="object"&&nt!==null?(nt=nt.delay,nt=typeof nt=="number"&&0<nt?Tt+nt:Tt):nt=Tt,C){case 1:var Et=-1;break;case 2:Et=250;break;case 5:Et=1073741823;break;case 4:Et=1e4;break;default:Et=5e3}return Et=nt+Et,C={id:B++,callback:V,priorityLevel:C,startTime:nt,expirationTime:Et,sortIndex:-1},nt>Tt?(C.sortIndex=nt,f(b,C),h(m)===null&&C===h(b)&&(G?(q(L),L=-1):G=!0,qt(st,nt-Tt))):(C.sortIndex=Et,f(m,C),O||H||(O=!0,Q||(Q=!0,I()))),C},o.unstable_shouldYield=et,o.unstable_wrapCallback=function(C){var V=U;return function(){var nt=U;U=V;try{return C.apply(this,arguments)}finally{U=nt}}}})(Co)),Co}var fh;function qg(){return fh||(fh=1,No.exports=Lg()),No.exports}var _o={exports:{}},$t={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dh;function kg(){if(dh)return $t;dh=1;var o=er();function f(m){var b="https://react.dev/errors/"+m;if(1<arguments.length){b+="?args[]="+encodeURIComponent(arguments[1]);for(var B=2;B<arguments.length;B++)b+="&args[]="+encodeURIComponent(arguments[B])}return"Minified React error #"+m+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(){}var c={d:{f:h,r:function(){throw Error(f(522))},D:h,C:h,L:h,m:h,X:h,S:h,M:h},p:0,findDOMNode:null},s=Symbol.for("react.portal");function d(m,b,B){var D=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:s,key:D==null?null:""+D,children:m,containerInfo:b,implementation:B}}var v=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function w(m,b){if(m==="font")return"";if(typeof b=="string")return b==="use-credentials"?b:""}return $t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,$t.createPortal=function(m,b){var B=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!b||b.nodeType!==1&&b.nodeType!==9&&b.nodeType!==11)throw Error(f(299));return d(m,b,null,B)},$t.flushSync=function(m){var b=v.T,B=c.p;try{if(v.T=null,c.p=2,m)return m()}finally{v.T=b,c.p=B,c.d.f()}},$t.preconnect=function(m,b){typeof m=="string"&&(b?(b=b.crossOrigin,b=typeof b=="string"?b==="use-credentials"?b:"":void 0):b=null,c.d.C(m,b))},$t.prefetchDNS=function(m){typeof m=="string"&&c.d.D(m)},$t.preinit=function(m,b){if(typeof m=="string"&&b&&typeof b.as=="string"){var B=b.as,D=w(B,b.crossOrigin),U=typeof b.integrity=="string"?b.integrity:void 0,H=typeof b.fetchPriority=="string"?b.fetchPriority:void 0;B==="style"?c.d.S(m,typeof b.precedence=="string"?b.precedence:void 0,{crossOrigin:D,integrity:U,fetchPriority:H}):B==="script"&&c.d.X(m,{crossOrigin:D,integrity:U,fetchPriority:H,nonce:typeof b.nonce=="string"?b.nonce:void 0})}},$t.preinitModule=function(m,b){if(typeof m=="string")if(typeof b=="object"&&b!==null){if(b.as==null||b.as==="script"){var B=w(b.as,b.crossOrigin);c.d.M(m,{crossOrigin:B,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0})}}else b==null&&c.d.M(m)},$t.preload=function(m,b){if(typeof m=="string"&&typeof b=="object"&&b!==null&&typeof b.as=="string"){var B=b.as,D=w(B,b.crossOrigin);c.d.L(m,B,{crossOrigin:D,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0,type:typeof b.type=="string"?b.type:void 0,fetchPriority:typeof b.fetchPriority=="string"?b.fetchPriority:void 0,referrerPolicy:typeof b.referrerPolicy=="string"?b.referrerPolicy:void 0,imageSrcSet:typeof b.imageSrcSet=="string"?b.imageSrcSet:void 0,imageSizes:typeof b.imageSizes=="string"?b.imageSizes:void 0,media:typeof b.media=="string"?b.media:void 0})}},$t.preloadModule=function(m,b){if(typeof m=="string")if(b){var B=w(b.as,b.crossOrigin);c.d.m(m,{as:typeof b.as=="string"&&b.as!=="script"?b.as:void 0,crossOrigin:B,integrity:typeof b.integrity=="string"?b.integrity:void 0})}else c.d.m(m)},$t.requestFormReset=function(m){c.d.r(m)},$t.unstable_batchedUpdates=function(m,b){return m(b)},$t.useFormState=function(m,b,B){return v.H.useFormState(m,b,B)},$t.useFormStatus=function(){return v.H.useHostTransitionStatus()},$t.version="19.2.6",$t}var hh;function Gg(){if(hh)return _o.exports;hh=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(f){console.error(f)}}return o(),_o.exports=kg(),_o.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mh;function Yg(){if(mh)return Da;mh=1;var o=qg(),f=er(),h=Gg();function c(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function d(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function v(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function w(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function m(t){if(d(t)!==t)throw Error(c(188))}function b(t){var e=t.alternate;if(!e){if(e=d(t),e===null)throw Error(c(188));return e!==t?null:t}for(var n=t,l=e;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(l=a.return,l!==null){n=l;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return m(a),t;if(i===l)return m(a),e;i=i.sibling}throw Error(c(188))}if(n.return!==l.return)n=a,l=i;else{for(var u=!1,r=a.child;r;){if(r===n){u=!0,n=a,l=i;break}if(r===l){u=!0,l=a,n=i;break}r=r.sibling}if(!u){for(r=i.child;r;){if(r===n){u=!0,n=i,l=a;break}if(r===l){u=!0,l=i,n=a;break}r=r.sibling}if(!u)throw Error(c(189))}}if(n.alternate!==l)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?t:e}function B(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=B(t),e!==null)return e;t=t.sibling}return null}var D=Object.assign,U=Symbol.for("react.element"),H=Symbol.for("react.transitional.element"),O=Symbol.for("react.portal"),G=Symbol.for("react.fragment"),it=Symbol.for("react.strict_mode"),Z=Symbol.for("react.profiler"),q=Symbol.for("react.consumer"),k=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),st=Symbol.for("react.suspense"),Q=Symbol.for("react.suspense_list"),L=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),X=Symbol.for("react.activity"),et=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function I(t){return t===null||typeof t!="object"?null:(t=$&&t[$]||t["@@iterator"],typeof t=="function"?t:null)}var P=Symbol.for("react.client.reference");function at(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===P?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case G:return"Fragment";case Z:return"Profiler";case it:return"StrictMode";case st:return"Suspense";case Q:return"SuspenseList";case X:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case O:return"Portal";case k:return t.displayName||"Context";case q:return(t._context.displayName||"Context")+".Consumer";case K:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case L:return e=t.displayName||null,e!==null?e:at(t.type)||"Memo";case j:e=t._payload,t=t._init;try{return at(t(e))}catch{}}return null}var qt=Array.isArray,C=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,nt={pending:!1,data:null,method:null,action:null},Tt=[],Et=-1;function p(t){return{current:t}}function z(t){0>Et||(t.current=Tt[Et],Tt[Et]=null,Et--)}function Y(t,e){Et++,Tt[Et]=t.current,t.current=e}var F=p(null),ut=p(null),ft=p(null),dt=p(null);function zt(t,e){switch(Y(ft,e),Y(ut,t),Y(F,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Rd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Rd(e),t=Md(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}z(F),Y(F,t)}function Nt(){z(F),z(ut),z(ft)}function He(t){t.memoizedState!==null&&Y(dt,t);var e=F.current,n=Md(e,t.type);e!==n&&(Y(ut,t),Y(F,n))}function Ua(t){ut.current===t&&(z(F),z(ut)),dt.current===t&&(z(dt),Ca._currentValue=nt)}var au,ar;function Rn(t){if(au===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);au=e&&e[1]||"",ar=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+au+t+ar}var iu=!1;function uu(t,e){if(!t||iu)return"";iu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var M=function(){throw Error()};if(Object.defineProperty(M.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(M,[])}catch(N){var A=N}Reflect.construct(t,[],M)}else{try{M.call()}catch(N){A=N}t.call(M.prototype)}}else{try{throw Error()}catch(N){A=N}(M=t())&&typeof M.catch=="function"&&M.catch(function(){})}}catch(N){if(N&&A&&typeof N.stack=="string")return[N.stack,A.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),u=i[0],r=i[1];if(u&&r){var g=u.split(`
`),x=r.split(`
`);for(a=l=0;l<g.length&&!g[l].includes("DetermineComponentFrameRoot");)l++;for(;a<x.length&&!x[a].includes("DetermineComponentFrameRoot");)a++;if(l===g.length||a===x.length)for(l=g.length-1,a=x.length-1;1<=l&&0<=a&&g[l]!==x[a];)a--;for(;1<=l&&0<=a;l--,a--)if(g[l]!==x[a]){if(l!==1||a!==1)do if(l--,a--,0>a||g[l]!==x[a]){var _=`
`+g[l].replace(" at new "," at ");return t.displayName&&_.includes("<anonymous>")&&(_=_.replace("<anonymous>",t.displayName)),_}while(1<=l&&0<=a);break}}}finally{iu=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Rn(n):""}function f0(t,e){switch(t.tag){case 26:case 27:case 5:return Rn(t.type);case 16:return Rn("Lazy");case 13:return t.child!==e&&e!==null?Rn("Suspense Fallback"):Rn("Suspense");case 19:return Rn("SuspenseList");case 0:case 15:return uu(t.type,!1);case 11:return uu(t.type.render,!1);case 1:return uu(t.type,!0);case 31:return Rn("Activity");default:return""}}function ir(t){try{var e="",n=null;do e+=f0(t,n),n=t,t=t.return;while(t);return e}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var cu=Object.prototype.hasOwnProperty,ou=o.unstable_scheduleCallback,ru=o.unstable_cancelCallback,d0=o.unstable_shouldYield,h0=o.unstable_requestPaint,ce=o.unstable_now,m0=o.unstable_getCurrentPriorityLevel,ur=o.unstable_ImmediatePriority,cr=o.unstable_UserBlockingPriority,Ha=o.unstable_NormalPriority,g0=o.unstable_LowPriority,or=o.unstable_IdlePriority,y0=o.log,p0=o.unstable_setDisableYieldValue,ql=null,oe=null;function nn(t){if(typeof y0=="function"&&p0(t),oe&&typeof oe.setStrictMode=="function")try{oe.setStrictMode(ql,t)}catch{}}var re=Math.clz32?Math.clz32:S0,v0=Math.log,b0=Math.LN2;function S0(t){return t>>>=0,t===0?32:31-(v0(t)/b0|0)|0}var ja=256,La=262144,qa=4194304;function Mn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ka(t,e,n){var l=t.pendingLanes;if(l===0)return 0;var a=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var r=l&134217727;return r!==0?(l=r&~i,l!==0?a=Mn(l):(u&=r,u!==0?a=Mn(u):n||(n=r&~t,n!==0&&(a=Mn(n))))):(r=l&~i,r!==0?a=Mn(r):u!==0?a=Mn(u):n||(n=l&~t,n!==0&&(a=Mn(n)))),a===0?0:e!==0&&e!==a&&(e&i)===0&&(i=a&-a,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:a}function kl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function E0(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rr(){var t=qa;return qa<<=1,(qa&62914560)===0&&(qa=4194304),t}function su(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Gl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function w0(t,e,n,l,a,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var r=t.entanglements,g=t.expirationTimes,x=t.hiddenUpdates;for(n=u&~n;0<n;){var _=31-re(n),M=1<<_;r[_]=0,g[_]=-1;var A=x[_];if(A!==null)for(x[_]=null,_=0;_<A.length;_++){var N=A[_];N!==null&&(N.lane&=-536870913)}n&=~M}l!==0&&sr(t,l,0),i!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function sr(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-re(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|n&261930}function fr(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var l=31-re(n),a=1<<l;a&e|t[l]&e&&(t[l]|=e),n&=~a}}function dr(t,e){var n=e&-e;return n=(n&42)!==0?1:fu(n),(n&(t.suspendedLanes|e))!==0?0:n}function fu(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function du(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function hr(){var t=V.p;return t!==0?t:(t=window.event,t===void 0?32:Pd(t.type))}function mr(t,e){var n=V.p;try{return V.p=t,e()}finally{V.p=n}}var ln=Math.random().toString(36).slice(2),Kt="__reactFiber$"+ln,te="__reactProps$"+ln,Wn="__reactContainer$"+ln,hu="__reactEvents$"+ln,T0="__reactListeners$"+ln,x0="__reactHandles$"+ln,gr="__reactResources$"+ln,Yl="__reactMarker$"+ln;function mu(t){delete t[Kt],delete t[te],delete t[hu],delete t[T0],delete t[x0]}function $n(t){var e=t[Kt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[Kt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=jd(t);t!==null;){if(n=t[Kt])return n;t=jd(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[Kt]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Ql(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(c(33))}function tl(t){var e=t[gr];return e||(e=t[gr]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Vt(t){t[Yl]=!0}var yr=new Set,pr={};function zn(t,e){el(t,e),el(t+"Capture",e)}function el(t,e){for(pr[t]=e,t=0;t<e.length;t++)yr.add(e[t])}var A0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),vr={},br={};function N0(t){return cu.call(br,t)?!0:cu.call(vr,t)?!1:A0.test(t)?br[t]=!0:(vr[t]=!0,!1)}function Ga(t,e,n){if(N0(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Ya(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function je(t,e,n,l){if(l===null)t.removeAttribute(n);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+l)}}function pe(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Sr(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function C0(t,e,n){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var a=l.get,i=l.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:l.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function gu(t){if(!t._valueTracker){var e=Sr(t)?"checked":"value";t._valueTracker=C0(t,e,""+t[e])}}function Er(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),l="";return t&&(l=Sr(t)?t.checked?"true":"false":t.value),t=l,t!==n?(e.setValue(t),!0):!1}function Qa(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var _0=/[\n"\\]/g;function ve(t){return t.replace(_0,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function yu(t,e,n,l,a,i,u,r){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+pe(e)):t.value!==""+pe(e)&&(t.value=""+pe(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?pu(t,u,pe(e)):n!=null?pu(t,u,pe(n)):l!=null&&t.removeAttribute("value"),a==null&&i!=null&&(t.defaultChecked=!!i),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.name=""+pe(r):t.removeAttribute("name")}function wr(t,e,n,l,a,i,u,r){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){gu(t);return}n=n!=null?""+pe(n):"",e=e!=null?""+pe(e):n,r||e===t.value||(t.value=e),t.defaultValue=e}l=l??a,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=r?t.checked:!!l,t.defaultChecked=!!l,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),gu(t)}function pu(t,e,n){e==="number"&&Qa(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function nl(t,e,n,l){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&l&&(t[n].defaultSelected=!0)}else{for(n=""+pe(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,l&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function Tr(t,e,n){if(e!=null&&(e=""+pe(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+pe(n):""}function xr(t,e,n,l){if(e==null){if(l!=null){if(n!=null)throw Error(c(92));if(qt(l)){if(1<l.length)throw Error(c(93));l=l[0]}n=l}n==null&&(n=""),e=n}n=pe(e),t.defaultValue=n,l=t.textContent,l===n&&l!==""&&l!==null&&(t.value=l),gu(t)}function ll(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var R0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ar(t,e,n){var l=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,n):typeof n!="number"||n===0||R0.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Nr(t,e,n){if(e!=null&&typeof e!="object")throw Error(c(62));if(t=t.style,n!=null){for(var l in n)!n.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var a in e)l=e[a],e.hasOwnProperty(a)&&n[a]!==l&&Ar(t,a,l)}else for(var i in e)e.hasOwnProperty(i)&&Ar(t,i,e[i])}function vu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var M0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),z0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Xa(t){return z0.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Le(){}var bu=null;function Su(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var al=null,il=null;function Cr(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[te]||null;t:switch(t=e.stateNode,e.type){case"input":if(yu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+ve(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var l=n[e];if(l!==t&&l.form===t.form){var a=l[te]||null;if(!a)throw Error(c(90));yu(l,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)l=n[e],l.form===t.form&&Er(l)}break t;case"textarea":Tr(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&nl(t,!!n.multiple,e,!1)}}}var Eu=!1;function _r(t,e,n){if(Eu)return t(e,n);Eu=!0;try{var l=t(e);return l}finally{if(Eu=!1,(al!==null||il!==null)&&(zi(),al&&(e=al,t=il,il=al=null,Cr(e),t)))for(e=0;e<t.length;e++)Cr(t[e])}}function Xl(t,e){var n=t.stateNode;if(n===null)return null;var l=n[te]||null;if(l===null)return null;n=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(c(231,e,typeof n));return n}var qe=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wu=!1;if(qe)try{var Vl={};Object.defineProperty(Vl,"passive",{get:function(){wu=!0}}),window.addEventListener("test",Vl,Vl),window.removeEventListener("test",Vl,Vl)}catch{wu=!1}var an=null,Tu=null,Va=null;function Rr(){if(Va)return Va;var t,e=Tu,n=e.length,l,a="value"in an?an.value:an.textContent,i=a.length;for(t=0;t<n&&e[t]===a[t];t++);var u=n-t;for(l=1;l<=u&&e[n-l]===a[i-l];l++);return Va=a.slice(t,1<l?1-l:void 0)}function Za(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ka(){return!0}function Mr(){return!1}function ee(t){function e(n,l,a,i,u){this._reactName=n,this._targetInst=a,this.type=l,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var r in t)t.hasOwnProperty(r)&&(n=t[r],this[r]=n?n(i):i[r]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ka:Mr,this.isPropagationStopped=Mr,this}return D(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ka)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ka)},persist:function(){},isPersistent:Ka}),e}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ja=ee(Dn),Zl=D({},Dn,{view:0,detail:0}),D0=ee(Zl),xu,Au,Kl,Fa=D({},Zl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Kl&&(Kl&&t.type==="mousemove"?(xu=t.screenX-Kl.screenX,Au=t.screenY-Kl.screenY):Au=xu=0,Kl=t),xu)},movementY:function(t){return"movementY"in t?t.movementY:Au}}),zr=ee(Fa),O0=D({},Fa,{dataTransfer:0}),B0=ee(O0),U0=D({},Zl,{relatedTarget:0}),Nu=ee(U0),H0=D({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),j0=ee(H0),L0=D({},Dn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),q0=ee(L0),k0=D({},Dn,{data:0}),Dr=ee(k0),G0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Y0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Q0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function X0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Q0[t])?!!e[t]:!1}function Cu(){return X0}var V0=D({},Zl,{key:function(t){if(t.key){var e=G0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Za(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Y0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cu,charCode:function(t){return t.type==="keypress"?Za(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Za(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Z0=ee(V0),K0=D({},Fa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Or=ee(K0),J0=D({},Zl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cu}),F0=ee(J0),I0=D({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),W0=ee(I0),$0=D({},Fa,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),P0=ee($0),tm=D({},Dn,{newState:0,oldState:0}),em=ee(tm),nm=[9,13,27,32],_u=qe&&"CompositionEvent"in window,Jl=null;qe&&"documentMode"in document&&(Jl=document.documentMode);var lm=qe&&"TextEvent"in window&&!Jl,Br=qe&&(!_u||Jl&&8<Jl&&11>=Jl),Ur=" ",Hr=!1;function jr(t,e){switch(t){case"keyup":return nm.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lr(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ul=!1;function am(t,e){switch(t){case"compositionend":return Lr(e);case"keypress":return e.which!==32?null:(Hr=!0,Ur);case"textInput":return t=e.data,t===Ur&&Hr?null:t;default:return null}}function im(t,e){if(ul)return t==="compositionend"||!_u&&jr(t,e)?(t=Rr(),Va=Tu=an=null,ul=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Br&&e.locale!=="ko"?null:e.data;default:return null}}var um={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qr(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!um[t.type]:e==="textarea"}function kr(t,e,n,l){al?il?il.push(l):il=[l]:al=l,e=Li(e,"onChange"),0<e.length&&(n=new Ja("onChange","change",null,n,l),t.push({event:n,listeners:e}))}var Fl=null,Il=null;function cm(t){Td(t,0)}function Ia(t){var e=Ql(t);if(Er(e))return t}function Gr(t,e){if(t==="change")return e}var Yr=!1;if(qe){var Ru;if(qe){var Mu="oninput"in document;if(!Mu){var Qr=document.createElement("div");Qr.setAttribute("oninput","return;"),Mu=typeof Qr.oninput=="function"}Ru=Mu}else Ru=!1;Yr=Ru&&(!document.documentMode||9<document.documentMode)}function Xr(){Fl&&(Fl.detachEvent("onpropertychange",Vr),Il=Fl=null)}function Vr(t){if(t.propertyName==="value"&&Ia(Il)){var e=[];kr(e,Il,t,Su(t)),_r(cm,e)}}function om(t,e,n){t==="focusin"?(Xr(),Fl=e,Il=n,Fl.attachEvent("onpropertychange",Vr)):t==="focusout"&&Xr()}function rm(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ia(Il)}function sm(t,e){if(t==="click")return Ia(e)}function fm(t,e){if(t==="input"||t==="change")return Ia(e)}function dm(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var se=typeof Object.is=="function"?Object.is:dm;function Wl(t,e){if(se(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),l=Object.keys(e);if(n.length!==l.length)return!1;for(l=0;l<n.length;l++){var a=n[l];if(!cu.call(e,a)||!se(t[a],e[a]))return!1}return!0}function Zr(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Kr(t,e){var n=Zr(t);t=0;for(var l;n;){if(n.nodeType===3){if(l=t+n.textContent.length,t<=e&&l>=e)return{node:n,offset:e-t};t=l}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Zr(n)}}function Jr(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Jr(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Fr(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Qa(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Qa(t.document)}return e}function zu(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var hm=qe&&"documentMode"in document&&11>=document.documentMode,cl=null,Du=null,$l=null,Ou=!1;function Ir(t,e,n){var l=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ou||cl==null||cl!==Qa(l)||(l=cl,"selectionStart"in l&&zu(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),$l&&Wl($l,l)||($l=l,l=Li(Du,"onSelect"),0<l.length&&(e=new Ja("onSelect","select",null,e,n),t.push({event:e,listeners:l}),e.target=cl)))}function On(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ol={animationend:On("Animation","AnimationEnd"),animationiteration:On("Animation","AnimationIteration"),animationstart:On("Animation","AnimationStart"),transitionrun:On("Transition","TransitionRun"),transitionstart:On("Transition","TransitionStart"),transitioncancel:On("Transition","TransitionCancel"),transitionend:On("Transition","TransitionEnd")},Bu={},Wr={};qe&&(Wr=document.createElement("div").style,"AnimationEvent"in window||(delete ol.animationend.animation,delete ol.animationiteration.animation,delete ol.animationstart.animation),"TransitionEvent"in window||delete ol.transitionend.transition);function Bn(t){if(Bu[t])return Bu[t];if(!ol[t])return t;var e=ol[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Wr)return Bu[t]=e[n];return t}var $r=Bn("animationend"),Pr=Bn("animationiteration"),ts=Bn("animationstart"),mm=Bn("transitionrun"),gm=Bn("transitionstart"),ym=Bn("transitioncancel"),es=Bn("transitionend"),ns=new Map,Uu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Uu.push("scrollEnd");function _e(t,e){ns.set(t,e),zn(e,[t])}var Wa=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},be=[],rl=0,Hu=0;function $a(){for(var t=rl,e=Hu=rl=0;e<t;){var n=be[e];be[e++]=null;var l=be[e];be[e++]=null;var a=be[e];be[e++]=null;var i=be[e];if(be[e++]=null,l!==null&&a!==null){var u=l.pending;u===null?a.next=a:(a.next=u.next,u.next=a),l.pending=a}i!==0&&ls(n,a,i)}}function Pa(t,e,n,l){be[rl++]=t,be[rl++]=e,be[rl++]=n,be[rl++]=l,Hu|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function ju(t,e,n,l){return Pa(t,e,n,l),ti(t)}function Un(t,e){return Pa(t,null,null,e),ti(t)}function ls(t,e,n){t.lanes|=n;var l=t.alternate;l!==null&&(l.lanes|=n);for(var a=!1,i=t.return;i!==null;)i.childLanes|=n,l=i.alternate,l!==null&&(l.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(a=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,a&&e!==null&&(a=31-re(n),t=i.hiddenUpdates,l=t[a],l===null?t[a]=[e]:l.push(e),e.lane=n|536870912),i):null}function ti(t){if(50<Sa)throw Sa=0,Zc=null,Error(c(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var sl={};function pm(t,e,n,l){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function fe(t,e,n,l){return new pm(t,e,n,l)}function Lu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ke(t,e){var n=t.alternate;return n===null?(n=fe(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function as(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ei(t,e,n,l,a,i){var u=0;if(l=t,typeof t=="function")Lu(t)&&(u=1);else if(typeof t=="string")u=wg(t,n,F.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case X:return t=fe(31,n,e,a),t.elementType=X,t.lanes=i,t;case G:return Hn(n.children,a,i,e);case it:u=8,a|=24;break;case Z:return t=fe(12,n,e,a|2),t.elementType=Z,t.lanes=i,t;case st:return t=fe(13,n,e,a),t.elementType=st,t.lanes=i,t;case Q:return t=fe(19,n,e,a),t.elementType=Q,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case k:u=10;break t;case q:u=9;break t;case K:u=11;break t;case L:u=14;break t;case j:u=16,l=null;break t}u=29,n=Error(c(130,t===null?"null":typeof t,"")),l=null}return e=fe(u,n,e,a),e.elementType=t,e.type=l,e.lanes=i,e}function Hn(t,e,n,l){return t=fe(7,t,l,e),t.lanes=n,t}function qu(t,e,n){return t=fe(6,t,null,e),t.lanes=n,t}function is(t){var e=fe(18,null,null,0);return e.stateNode=t,e}function ku(t,e,n){return e=fe(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var us=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=us.get(t);return n!==void 0?n:(e={value:t,source:e,stack:ir(e)},us.set(t,e),e)}return{value:t,source:e,stack:ir(e)}}var fl=[],dl=0,ni=null,Pl=0,Ee=[],we=0,un=null,ze=1,De="";function Ge(t,e){fl[dl++]=Pl,fl[dl++]=ni,ni=t,Pl=e}function cs(t,e,n){Ee[we++]=ze,Ee[we++]=De,Ee[we++]=un,un=t;var l=ze;t=De;var a=32-re(l)-1;l&=~(1<<a),n+=1;var i=32-re(e)+a;if(30<i){var u=a-a%5;i=(l&(1<<u)-1).toString(32),l>>=u,a-=u,ze=1<<32-re(e)+a|n<<a|l,De=i+t}else ze=1<<i|n<<a|l,De=t}function Gu(t){t.return!==null&&(Ge(t,1),cs(t,1,0))}function Yu(t){for(;t===ni;)ni=fl[--dl],fl[dl]=null,Pl=fl[--dl],fl[dl]=null;for(;t===un;)un=Ee[--we],Ee[we]=null,De=Ee[--we],Ee[we]=null,ze=Ee[--we],Ee[we]=null}function os(t,e){Ee[we++]=ze,Ee[we++]=De,Ee[we++]=un,ze=e.id,De=e.overflow,un=t}var Jt=null,Dt=null,vt=!1,cn=null,Te=!1,Qu=Error(c(519));function on(t){var e=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ta(Se(e,t)),Qu}function rs(t){var e=t.stateNode,n=t.type,l=t.memoizedProps;switch(e[Kt]=t,e[te]=l,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<wa.length;n++)mt(wa[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),wr(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),xr(e,l.value,l.defaultValue,l.children)}n=l.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||l.suppressHydrationWarning===!0||Cd(e.textContent,n)?(l.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),l.onScroll!=null&&mt("scroll",e),l.onScrollEnd!=null&&mt("scrollend",e),l.onClick!=null&&(e.onclick=Le),e=!0):e=!1,e||on(t,!0)}function ss(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:Te=!1;return;case 27:case 3:Te=!0;return;default:Jt=Jt.return}}function hl(t){if(t!==Jt)return!1;if(!vt)return ss(t),vt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||co(t.type,t.memoizedProps)),n=!n),n&&Dt&&on(t),ss(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Hd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Hd(t)}else e===27?(e=Dt,wn(t.type)?(t=ho,ho=null,Dt=t):Dt=e):Dt=Jt?Ae(t.stateNode.nextSibling):null;return!0}function jn(){Dt=Jt=null,vt=!1}function Xu(){var t=cn;return t!==null&&(ie===null?ie=t:ie.push.apply(ie,t),cn=null),t}function ta(t){cn===null?cn=[t]:cn.push(t)}var Vu=p(null),Ln=null,Ye=null;function rn(t,e,n){Y(Vu,e._currentValue),e._currentValue=n}function Qe(t){t._currentValue=Vu.current,z(Vu)}function Zu(t,e,n){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===n)break;t=t.return}}function Ku(t,e,n,l){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var i=a.dependencies;if(i!==null){var u=a.child;i=i.firstContext;t:for(;i!==null;){var r=i;i=a;for(var g=0;g<e.length;g++)if(r.context===e[g]){i.lanes|=n,r=i.alternate,r!==null&&(r.lanes|=n),Zu(i.return,n,t),l||(u=null);break t}i=r.next}}else if(a.tag===18){if(u=a.return,u===null)throw Error(c(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Zu(u,n,t),u=null}else u=a.child;if(u!==null)u.return=a;else for(u=a;u!==null;){if(u===t){u=null;break}if(a=u.sibling,a!==null){a.return=u.return,u=a;break}u=u.return}a=u}}function ml(t,e,n,l){t=null;for(var a=e,i=!1;a!==null;){if(!i){if((a.flags&524288)!==0)i=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var u=a.alternate;if(u===null)throw Error(c(387));if(u=u.memoizedProps,u!==null){var r=a.type;se(a.pendingProps.value,u.value)||(t!==null?t.push(r):t=[r])}}else if(a===dt.current){if(u=a.alternate,u===null)throw Error(c(387));u.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Ca):t=[Ca])}a=a.return}t!==null&&Ku(e,t,n,l),e.flags|=262144}function li(t){for(t=t.firstContext;t!==null;){if(!se(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function qn(t){Ln=t,Ye=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ft(t){return fs(Ln,t)}function ai(t,e){return Ln===null&&qn(t),fs(t,e)}function fs(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ye===null){if(t===null)throw Error(c(308));Ye=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ye=Ye.next=e;return n}var vm=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},bm=o.unstable_scheduleCallback,Sm=o.unstable_NormalPriority,kt={$$typeof:k,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ju(){return{controller:new vm,data:new Map,refCount:0}}function ea(t){t.refCount--,t.refCount===0&&bm(Sm,function(){t.controller.abort()})}var na=null,Fu=0,gl=0,yl=null;function Em(t,e){if(na===null){var n=na=[];Fu=0,gl=$c(),yl={status:"pending",value:void 0,then:function(l){n.push(l)}}}return Fu++,e.then(ds,ds),e}function ds(){if(--Fu===0&&na!==null){yl!==null&&(yl.status="fulfilled");var t=na;na=null,gl=0,yl=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function wm(t,e){var n=[],l={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(l.status="rejected",l.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),l}var hs=C.S;C.S=function(t,e){Wf=ce(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Em(t,e),hs!==null&&hs(t,e)};var kn=p(null);function Iu(){var t=kn.current;return t!==null?t:Mt.pooledCache}function ii(t,e){e===null?Y(kn,kn.current):Y(kn,e.pool)}function ms(){var t=Iu();return t===null?null:{parent:kt._currentValue,pool:t}}var pl=Error(c(460)),Wu=Error(c(474)),ui=Error(c(542)),ci={then:function(){}};function gs(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ys(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Le,Le),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,vs(t),t;default:if(typeof e.status=="string")e.then(Le,Le);else{if(t=Mt,t!==null&&100<t.shellSuspendCounter)throw Error(c(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=l}},function(l){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,vs(t),t}throw Yn=e,pl}}function Gn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Yn=n,pl):n}}var Yn=null;function ps(){if(Yn===null)throw Error(c(459));var t=Yn;return Yn=null,t}function vs(t){if(t===pl||t===ui)throw Error(c(483))}var vl=null,la=0;function oi(t){var e=la;return la+=1,vl===null&&(vl=[]),ys(vl,t,e)}function aa(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ri(t,e){throw e.$$typeof===U?Error(c(525)):(t=Object.prototype.toString.call(e),Error(c(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function bs(t){function e(E,y){if(t){var T=E.deletions;T===null?(E.deletions=[y],E.flags|=16):T.push(y)}}function n(E,y){if(!t)return null;for(;y!==null;)e(E,y),y=y.sibling;return null}function l(E){for(var y=new Map;E!==null;)E.key!==null?y.set(E.key,E):y.set(E.index,E),E=E.sibling;return y}function a(E,y){return E=ke(E,y),E.index=0,E.sibling=null,E}function i(E,y,T){return E.index=T,t?(T=E.alternate,T!==null?(T=T.index,T<y?(E.flags|=67108866,y):T):(E.flags|=67108866,y)):(E.flags|=1048576,y)}function u(E){return t&&E.alternate===null&&(E.flags|=67108866),E}function r(E,y,T,R){return y===null||y.tag!==6?(y=qu(T,E.mode,R),y.return=E,y):(y=a(y,T),y.return=E,y)}function g(E,y,T,R){var tt=T.type;return tt===G?_(E,y,T.props.children,R,T.key):y!==null&&(y.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===j&&Gn(tt)===y.type)?(y=a(y,T.props),aa(y,T),y.return=E,y):(y=ei(T.type,T.key,T.props,null,E.mode,R),aa(y,T),y.return=E,y)}function x(E,y,T,R){return y===null||y.tag!==4||y.stateNode.containerInfo!==T.containerInfo||y.stateNode.implementation!==T.implementation?(y=ku(T,E.mode,R),y.return=E,y):(y=a(y,T.children||[]),y.return=E,y)}function _(E,y,T,R,tt){return y===null||y.tag!==7?(y=Hn(T,E.mode,R,tt),y.return=E,y):(y=a(y,T),y.return=E,y)}function M(E,y,T){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return y=qu(""+y,E.mode,T),y.return=E,y;if(typeof y=="object"&&y!==null){switch(y.$$typeof){case H:return T=ei(y.type,y.key,y.props,null,E.mode,T),aa(T,y),T.return=E,T;case O:return y=ku(y,E.mode,T),y.return=E,y;case j:return y=Gn(y),M(E,y,T)}if(qt(y)||I(y))return y=Hn(y,E.mode,T,null),y.return=E,y;if(typeof y.then=="function")return M(E,oi(y),T);if(y.$$typeof===k)return M(E,ai(E,y),T);ri(E,y)}return null}function A(E,y,T,R){var tt=y!==null?y.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return tt!==null?null:r(E,y,""+T,R);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case H:return T.key===tt?g(E,y,T,R):null;case O:return T.key===tt?x(E,y,T,R):null;case j:return T=Gn(T),A(E,y,T,R)}if(qt(T)||I(T))return tt!==null?null:_(E,y,T,R,null);if(typeof T.then=="function")return A(E,y,oi(T),R);if(T.$$typeof===k)return A(E,y,ai(E,T),R);ri(E,T)}return null}function N(E,y,T,R,tt){if(typeof R=="string"&&R!==""||typeof R=="number"||typeof R=="bigint")return E=E.get(T)||null,r(y,E,""+R,tt);if(typeof R=="object"&&R!==null){switch(R.$$typeof){case H:return E=E.get(R.key===null?T:R.key)||null,g(y,E,R,tt);case O:return E=E.get(R.key===null?T:R.key)||null,x(y,E,R,tt);case j:return R=Gn(R),N(E,y,T,R,tt)}if(qt(R)||I(R))return E=E.get(T)||null,_(y,E,R,tt,null);if(typeof R.then=="function")return N(E,y,T,oi(R),tt);if(R.$$typeof===k)return N(E,y,T,ai(y,R),tt);ri(y,R)}return null}function J(E,y,T,R){for(var tt=null,bt=null,W=y,rt=y=0,yt=null;W!==null&&rt<T.length;rt++){W.index>rt?(yt=W,W=null):yt=W.sibling;var St=A(E,W,T[rt],R);if(St===null){W===null&&(W=yt);break}t&&W&&St.alternate===null&&e(E,W),y=i(St,y,rt),bt===null?tt=St:bt.sibling=St,bt=St,W=yt}if(rt===T.length)return n(E,W),vt&&Ge(E,rt),tt;if(W===null){for(;rt<T.length;rt++)W=M(E,T[rt],R),W!==null&&(y=i(W,y,rt),bt===null?tt=W:bt.sibling=W,bt=W);return vt&&Ge(E,rt),tt}for(W=l(W);rt<T.length;rt++)yt=N(W,E,rt,T[rt],R),yt!==null&&(t&&yt.alternate!==null&&W.delete(yt.key===null?rt:yt.key),y=i(yt,y,rt),bt===null?tt=yt:bt.sibling=yt,bt=yt);return t&&W.forEach(function(Cn){return e(E,Cn)}),vt&&Ge(E,rt),tt}function lt(E,y,T,R){if(T==null)throw Error(c(151));for(var tt=null,bt=null,W=y,rt=y=0,yt=null,St=T.next();W!==null&&!St.done;rt++,St=T.next()){W.index>rt?(yt=W,W=null):yt=W.sibling;var Cn=A(E,W,St.value,R);if(Cn===null){W===null&&(W=yt);break}t&&W&&Cn.alternate===null&&e(E,W),y=i(Cn,y,rt),bt===null?tt=Cn:bt.sibling=Cn,bt=Cn,W=yt}if(St.done)return n(E,W),vt&&Ge(E,rt),tt;if(W===null){for(;!St.done;rt++,St=T.next())St=M(E,St.value,R),St!==null&&(y=i(St,y,rt),bt===null?tt=St:bt.sibling=St,bt=St);return vt&&Ge(E,rt),tt}for(W=l(W);!St.done;rt++,St=T.next())St=N(W,E,rt,St.value,R),St!==null&&(t&&St.alternate!==null&&W.delete(St.key===null?rt:St.key),y=i(St,y,rt),bt===null?tt=St:bt.sibling=St,bt=St);return t&&W.forEach(function(Og){return e(E,Og)}),vt&&Ge(E,rt),tt}function Rt(E,y,T,R){if(typeof T=="object"&&T!==null&&T.type===G&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case H:t:{for(var tt=T.key;y!==null;){if(y.key===tt){if(tt=T.type,tt===G){if(y.tag===7){n(E,y.sibling),R=a(y,T.props.children),R.return=E,E=R;break t}}else if(y.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===j&&Gn(tt)===y.type){n(E,y.sibling),R=a(y,T.props),aa(R,T),R.return=E,E=R;break t}n(E,y);break}else e(E,y);y=y.sibling}T.type===G?(R=Hn(T.props.children,E.mode,R,T.key),R.return=E,E=R):(R=ei(T.type,T.key,T.props,null,E.mode,R),aa(R,T),R.return=E,E=R)}return u(E);case O:t:{for(tt=T.key;y!==null;){if(y.key===tt)if(y.tag===4&&y.stateNode.containerInfo===T.containerInfo&&y.stateNode.implementation===T.implementation){n(E,y.sibling),R=a(y,T.children||[]),R.return=E,E=R;break t}else{n(E,y);break}else e(E,y);y=y.sibling}R=ku(T,E.mode,R),R.return=E,E=R}return u(E);case j:return T=Gn(T),Rt(E,y,T,R)}if(qt(T))return J(E,y,T,R);if(I(T)){if(tt=I(T),typeof tt!="function")throw Error(c(150));return T=tt.call(T),lt(E,y,T,R)}if(typeof T.then=="function")return Rt(E,y,oi(T),R);if(T.$$typeof===k)return Rt(E,y,ai(E,T),R);ri(E,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,y!==null&&y.tag===6?(n(E,y.sibling),R=a(y,T),R.return=E,E=R):(n(E,y),R=qu(T,E.mode,R),R.return=E,E=R),u(E)):n(E,y)}return function(E,y,T,R){try{la=0;var tt=Rt(E,y,T,R);return vl=null,tt}catch(W){if(W===pl||W===ui)throw W;var bt=fe(29,W,null,E.mode);return bt.lanes=R,bt.return=E,bt}finally{}}}var Qn=bs(!0),Ss=bs(!1),sn=!1;function $u(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Pu(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(wt&2)!==0){var a=l.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),l.pending=e,e=ti(t),ls(t,null,n),e}return Pa(t,l,e,n),ti(t)}function ia(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,fr(t,n)}}function tc(t,e){var n=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,n===l)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?a=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?a=i=e:i=i.next=e}else a=i=e;n={baseState:l.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var ec=!1;function ua(){if(ec){var t=yl;if(t!==null)throw t}}function ca(t,e,n,l){ec=!1;var a=t.updateQueue;sn=!1;var i=a.firstBaseUpdate,u=a.lastBaseUpdate,r=a.shared.pending;if(r!==null){a.shared.pending=null;var g=r,x=g.next;g.next=null,u===null?i=x:u.next=x,u=g;var _=t.alternate;_!==null&&(_=_.updateQueue,r=_.lastBaseUpdate,r!==u&&(r===null?_.firstBaseUpdate=x:r.next=x,_.lastBaseUpdate=g))}if(i!==null){var M=a.baseState;u=0,_=x=g=null,r=i;do{var A=r.lane&-536870913,N=A!==r.lane;if(N?(gt&A)===A:(l&A)===A){A!==0&&A===gl&&(ec=!0),_!==null&&(_=_.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});t:{var J=t,lt=r;A=e;var Rt=n;switch(lt.tag){case 1:if(J=lt.payload,typeof J=="function"){M=J.call(Rt,M,A);break t}M=J;break t;case 3:J.flags=J.flags&-65537|128;case 0:if(J=lt.payload,A=typeof J=="function"?J.call(Rt,M,A):J,A==null)break t;M=D({},M,A);break t;case 2:sn=!0}}A=r.callback,A!==null&&(t.flags|=64,N&&(t.flags|=8192),N=a.callbacks,N===null?a.callbacks=[A]:N.push(A))}else N={lane:A,tag:r.tag,payload:r.payload,callback:r.callback,next:null},_===null?(x=_=N,g=M):_=_.next=N,u|=A;if(r=r.next,r===null){if(r=a.shared.pending,r===null)break;N=r,r=N.next,N.next=null,a.lastBaseUpdate=N,a.shared.pending=null}}while(!0);_===null&&(g=M),a.baseState=g,a.firstBaseUpdate=x,a.lastBaseUpdate=_,i===null&&(a.shared.lanes=0),pn|=u,t.lanes=u,t.memoizedState=M}}function Es(t,e){if(typeof t!="function")throw Error(c(191,t));t.call(e)}function ws(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)Es(n[t],e)}var bl=p(null),si=p(0);function Ts(t,e){t=$e,Y(si,t),Y(bl,e),$e=t|e.baseLanes}function nc(){Y(si,$e),Y(bl,bl.current)}function lc(){$e=si.current,z(bl),z(si)}var de=p(null),xe=null;function hn(t){var e=t.alternate;Y(jt,jt.current&1),Y(de,t),xe===null&&(e===null||bl.current!==null||e.memoizedState!==null)&&(xe=t)}function ac(t){Y(jt,jt.current),Y(de,t),xe===null&&(xe=t)}function xs(t){t.tag===22?(Y(jt,jt.current),Y(de,t),xe===null&&(xe=t)):mn()}function mn(){Y(jt,jt.current),Y(de,de.current)}function he(t){z(de),xe===t&&(xe=null),z(jt)}var jt=p(0);function fi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||so(n)||fo(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xe=0,ot=null,Ct=null,Gt=null,di=!1,Sl=!1,Xn=!1,hi=0,oa=0,El=null,Tm=0;function Ut(){throw Error(c(321))}function ic(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!se(t[n],e[n]))return!1;return!0}function uc(t,e,n,l,a,i){return Xe=i,ot=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,C.H=t===null||t.memoizedState===null?of:Ec,Xn=!1,i=n(l,a),Xn=!1,Sl&&(i=Ns(e,n,l,a)),As(t),i}function As(t){C.H=fa;var e=Ct!==null&&Ct.next!==null;if(Xe=0,Gt=Ct=ot=null,di=!1,oa=0,El=null,e)throw Error(c(300));t===null||Yt||(t=t.dependencies,t!==null&&li(t)&&(Yt=!0))}function Ns(t,e,n,l){ot=t;var a=0;do{if(Sl&&(El=null),oa=0,Sl=!1,25<=a)throw Error(c(301));if(a+=1,Gt=Ct=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}C.H=rf,i=e(n,l)}while(Sl);return i}function xm(){var t=C.H,e=t.useState()[0];return e=typeof e.then=="function"?ra(e):e,t=t.useState()[0],(Ct!==null?Ct.memoizedState:null)!==t&&(ot.flags|=1024),e}function cc(){var t=hi!==0;return hi=0,t}function oc(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function rc(t){if(di){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}di=!1}Xe=0,Gt=Ct=ot=null,Sl=!1,oa=hi=0,El=null}function Pt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Gt===null?ot.memoizedState=Gt=t:Gt=Gt.next=t,Gt}function Lt(){if(Ct===null){var t=ot.alternate;t=t!==null?t.memoizedState:null}else t=Ct.next;var e=Gt===null?ot.memoizedState:Gt.next;if(e!==null)Gt=e,Ct=t;else{if(t===null)throw ot.alternate===null?Error(c(467)):Error(c(310));Ct=t,t={memoizedState:Ct.memoizedState,baseState:Ct.baseState,baseQueue:Ct.baseQueue,queue:Ct.queue,next:null},Gt===null?ot.memoizedState=Gt=t:Gt=Gt.next=t}return Gt}function mi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ra(t){var e=oa;return oa+=1,El===null&&(El=[]),t=ys(El,t,e),e=ot,(Gt===null?e.memoizedState:Gt.next)===null&&(e=e.alternate,C.H=e===null||e.memoizedState===null?of:Ec),t}function gi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ra(t);if(t.$$typeof===k)return Ft(t)}throw Error(c(438,String(t)))}function sc(t){var e=null,n=ot.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var l=ot.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=mi(),ot.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),l=0;l<t;l++)n[l]=et;return e.index++,n}function Ve(t,e){return typeof e=="function"?e(t):e}function yi(t){var e=Lt();return fc(e,Ct,t)}function fc(t,e,n){var l=t.queue;if(l===null)throw Error(c(311));l.lastRenderedReducer=n;var a=t.baseQueue,i=l.pending;if(i!==null){if(a!==null){var u=a.next;a.next=i.next,i.next=u}e.baseQueue=a=i,l.pending=null}if(i=t.baseState,a===null)t.memoizedState=i;else{e=a.next;var r=u=null,g=null,x=e,_=!1;do{var M=x.lane&-536870913;if(M!==x.lane?(gt&M)===M:(Xe&M)===M){var A=x.revertLane;if(A===0)g!==null&&(g=g.next={lane:0,revertLane:0,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),M===gl&&(_=!0);else if((Xe&A)===A){x=x.next,A===gl&&(_=!0);continue}else M={lane:0,revertLane:x.revertLane,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},g===null?(r=g=M,u=i):g=g.next=M,ot.lanes|=A,pn|=A;M=x.action,Xn&&n(i,M),i=x.hasEagerState?x.eagerState:n(i,M)}else A={lane:M,revertLane:x.revertLane,gesture:x.gesture,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},g===null?(r=g=A,u=i):g=g.next=A,ot.lanes|=M,pn|=M;x=x.next}while(x!==null&&x!==e);if(g===null?u=i:g.next=r,!se(i,t.memoizedState)&&(Yt=!0,_&&(n=yl,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=g,l.lastRenderedState=i}return a===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function dc(t){var e=Lt(),n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=t;var l=n.dispatch,a=n.pending,i=e.memoizedState;if(a!==null){n.pending=null;var u=a=a.next;do i=t(i,u.action),u=u.next;while(u!==a);se(i,e.memoizedState)||(Yt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,l]}function Cs(t,e,n){var l=ot,a=Lt(),i=vt;if(i){if(n===void 0)throw Error(c(407));n=n()}else n=e();var u=!se((Ct||a).memoizedState,n);if(u&&(a.memoizedState=n,Yt=!0),a=a.queue,gc(Ms.bind(null,l,a,t),[t]),a.getSnapshot!==e||u||Gt!==null&&Gt.memoizedState.tag&1){if(l.flags|=2048,wl(9,{destroy:void 0},Rs.bind(null,l,a,n,e),null),Mt===null)throw Error(c(349));i||(Xe&127)!==0||_s(l,e,n)}return n}function _s(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ot.updateQueue,e===null?(e=mi(),ot.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Rs(t,e,n,l){e.value=n,e.getSnapshot=l,zs(e)&&Ds(t)}function Ms(t,e,n){return n(function(){zs(e)&&Ds(t)})}function zs(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!se(t,n)}catch{return!0}}function Ds(t){var e=Un(t,2);e!==null&&ue(e,t,2)}function hc(t){var e=Pt();if(typeof t=="function"){var n=t;if(t=n(),Xn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:t},e}function Os(t,e,n,l){return t.baseState=n,fc(t,Ct,typeof l=="function"?l:Ve)}function Am(t,e,n,l,a){if(bi(t))throw Error(c(485));if(t=e.action,t!==null){var i={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};C.T!==null?n(!0):i.isTransition=!1,l(i),n=e.pending,n===null?(i.next=e.pending=i,Bs(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Bs(t,e){var n=e.action,l=e.payload,a=t.state;if(e.isTransition){var i=C.T,u={};C.T=u;try{var r=n(a,l),g=C.S;g!==null&&g(u,r),Us(t,e,r)}catch(x){mc(t,e,x)}finally{i!==null&&u.types!==null&&(i.types=u.types),C.T=i}}else try{i=n(a,l),Us(t,e,i)}catch(x){mc(t,e,x)}}function Us(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(l){Hs(t,e,l)},function(l){return mc(t,e,l)}):Hs(t,e,n)}function Hs(t,e,n){e.status="fulfilled",e.value=n,js(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Bs(t,n)))}function mc(t,e,n){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=n,js(e),e=e.next;while(e!==l)}t.action=null}function js(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Ls(t,e){return e}function qs(t,e){if(vt){var n=Mt.formState;if(n!==null){t:{var l=ot;if(vt){if(Dt){e:{for(var a=Dt,i=Te;a.nodeType!==8;){if(!i){a=null;break e}if(a=Ae(a.nextSibling),a===null){a=null;break e}}i=a.data,a=i==="F!"||i==="F"?a:null}if(a){Dt=Ae(a.nextSibling),l=a.data==="F!";break t}}on(l)}l=!1}l&&(e=n[0])}}return n=Pt(),n.memoizedState=n.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ls,lastRenderedState:e},n.queue=l,n=af.bind(null,ot,l),l.dispatch=n,l=hc(!1),i=Sc.bind(null,ot,!1,l.queue),l=Pt(),a={state:e,dispatch:null,action:t,pending:null},l.queue=a,n=Am.bind(null,ot,a,i,n),a.dispatch=n,l.memoizedState=t,[e,n,!1]}function ks(t){var e=Lt();return Gs(e,Ct,t)}function Gs(t,e,n){if(e=fc(t,e,Ls)[0],t=yi(Ve)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var l=ra(e)}catch(u){throw u===pl?ui:u}else l=e;e=Lt();var a=e.queue,i=a.dispatch;return n!==e.memoizedState&&(ot.flags|=2048,wl(9,{destroy:void 0},Nm.bind(null,a,n),null)),[l,i,t]}function Nm(t,e){t.action=e}function Ys(t){var e=Lt(),n=Ct;if(n!==null)return Gs(e,n,t);Lt(),e=e.memoizedState,n=Lt();var l=n.queue.dispatch;return n.memoizedState=t,[e,l,!1]}function wl(t,e,n,l){return t={tag:t,create:n,deps:l,inst:e,next:null},e=ot.updateQueue,e===null&&(e=mi(),ot.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(l=n.next,n.next=t,t.next=l,e.lastEffect=t),t}function Qs(){return Lt().memoizedState}function pi(t,e,n,l){var a=Pt();ot.flags|=t,a.memoizedState=wl(1|e,{destroy:void 0},n,l===void 0?null:l)}function vi(t,e,n,l){var a=Lt();l=l===void 0?null:l;var i=a.memoizedState.inst;Ct!==null&&l!==null&&ic(l,Ct.memoizedState.deps)?a.memoizedState=wl(e,i,n,l):(ot.flags|=t,a.memoizedState=wl(1|e,i,n,l))}function Xs(t,e){pi(8390656,8,t,e)}function gc(t,e){vi(2048,8,t,e)}function Cm(t){ot.flags|=4;var e=ot.updateQueue;if(e===null)e=mi(),ot.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Vs(t){var e=Lt().memoizedState;return Cm({ref:e,nextImpl:t}),function(){if((wt&2)!==0)throw Error(c(440));return e.impl.apply(void 0,arguments)}}function Zs(t,e){return vi(4,2,t,e)}function Ks(t,e){return vi(4,4,t,e)}function Js(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Fs(t,e,n){n=n!=null?n.concat([t]):null,vi(4,4,Js.bind(null,e,t),n)}function yc(){}function Is(t,e){var n=Lt();e=e===void 0?null:e;var l=n.memoizedState;return e!==null&&ic(e,l[1])?l[0]:(n.memoizedState=[t,e],t)}function Ws(t,e){var n=Lt();e=e===void 0?null:e;var l=n.memoizedState;if(e!==null&&ic(e,l[1]))return l[0];if(l=t(),Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[l,e],l}function pc(t,e,n){return n===void 0||(Xe&1073741824)!==0&&(gt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=Pf(),ot.lanes|=t,pn|=t,n)}function $s(t,e,n,l){return se(n,e)?n:bl.current!==null?(t=pc(t,n,l),se(t,e)||(Yt=!0),t):(Xe&42)===0||(Xe&1073741824)!==0&&(gt&261930)===0?(Yt=!0,t.memoizedState=n):(t=Pf(),ot.lanes|=t,pn|=t,e)}function Ps(t,e,n,l,a){var i=V.p;V.p=i!==0&&8>i?i:8;var u=C.T,r={};C.T=r,Sc(t,!1,e,n);try{var g=a(),x=C.S;if(x!==null&&x(r,g),g!==null&&typeof g=="object"&&typeof g.then=="function"){var _=wm(g,l);sa(t,e,_,ye(t))}else sa(t,e,l,ye(t))}catch(M){sa(t,e,{then:function(){},status:"rejected",reason:M},ye())}finally{V.p=i,u!==null&&r.types!==null&&(u.types=r.types),C.T=u}}function _m(){}function vc(t,e,n,l){if(t.tag!==5)throw Error(c(476));var a=tf(t).queue;Ps(t,a,e,nt,n===null?_m:function(){return ef(t),n(l)})}function tf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:nt,baseState:nt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:nt},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function ef(t){var e=tf(t);e.next===null&&(e=t.alternate.memoizedState),sa(t,e.next.queue,{},ye())}function bc(){return Ft(Ca)}function nf(){return Lt().memoizedState}function lf(){return Lt().memoizedState}function Rm(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var l=dn(e,t,n);l!==null&&(ue(l,e,n),ia(l,e,n)),e={cache:Ju()},t.payload=e;return}e=e.return}}function Mm(t,e,n){var l=ye();n={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},bi(t)?uf(e,n):(n=ju(t,e,n,l),n!==null&&(ue(n,t,l),cf(n,e,l)))}function af(t,e,n){var l=ye();sa(t,e,n,l)}function sa(t,e,n,l){var a={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(bi(t))uf(e,a);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,r=i(u,n);if(a.hasEagerState=!0,a.eagerState=r,se(r,u))return Pa(t,e,a,0),Mt===null&&$a(),!1}catch{}finally{}if(n=ju(t,e,a,l),n!==null)return ue(n,t,l),cf(n,e,l),!0}return!1}function Sc(t,e,n,l){if(l={lane:2,revertLane:$c(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},bi(t)){if(e)throw Error(c(479))}else e=ju(t,n,l,2),e!==null&&ue(e,t,2)}function bi(t){var e=t.alternate;return t===ot||e!==null&&e===ot}function uf(t,e){Sl=di=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function cf(t,e,n){if((n&4194048)!==0){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,fr(t,n)}}var fa={readContext:Ft,use:gi,useCallback:Ut,useContext:Ut,useEffect:Ut,useImperativeHandle:Ut,useLayoutEffect:Ut,useInsertionEffect:Ut,useMemo:Ut,useReducer:Ut,useRef:Ut,useState:Ut,useDebugValue:Ut,useDeferredValue:Ut,useTransition:Ut,useSyncExternalStore:Ut,useId:Ut,useHostTransitionStatus:Ut,useFormState:Ut,useActionState:Ut,useOptimistic:Ut,useMemoCache:Ut,useCacheRefresh:Ut};fa.useEffectEvent=Ut;var of={readContext:Ft,use:gi,useCallback:function(t,e){return Pt().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:Xs,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,pi(4194308,4,Js.bind(null,e,t),n)},useLayoutEffect:function(t,e){return pi(4194308,4,t,e)},useInsertionEffect:function(t,e){pi(4,2,t,e)},useMemo:function(t,e){var n=Pt();e=e===void 0?null:e;var l=t();if(Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[l,e],l},useReducer:function(t,e,n){var l=Pt();if(n!==void 0){var a=n(e);if(Xn){nn(!0);try{n(e)}finally{nn(!1)}}}else a=e;return l.memoizedState=l.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},l.queue=t,t=t.dispatch=Mm.bind(null,ot,t),[l.memoizedState,t]},useRef:function(t){var e=Pt();return t={current:t},e.memoizedState=t},useState:function(t){t=hc(t);var e=t.queue,n=af.bind(null,ot,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:yc,useDeferredValue:function(t,e){var n=Pt();return pc(n,t,e)},useTransition:function(){var t=hc(!1);return t=Ps.bind(null,ot,t.queue,!0,!1),Pt().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var l=ot,a=Pt();if(vt){if(n===void 0)throw Error(c(407));n=n()}else{if(n=e(),Mt===null)throw Error(c(349));(gt&127)!==0||_s(l,e,n)}a.memoizedState=n;var i={value:n,getSnapshot:e};return a.queue=i,Xs(Ms.bind(null,l,i,t),[t]),l.flags|=2048,wl(9,{destroy:void 0},Rs.bind(null,l,i,n,e),null),n},useId:function(){var t=Pt(),e=Mt.identifierPrefix;if(vt){var n=De,l=ze;n=(l&~(1<<32-re(l)-1)).toString(32)+n,e="_"+e+"R_"+n,n=hi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Tm++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:bc,useFormState:qs,useActionState:qs,useOptimistic:function(t){var e=Pt();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Sc.bind(null,ot,!0,n),n.dispatch=e,[t,e]},useMemoCache:sc,useCacheRefresh:function(){return Pt().memoizedState=Rm.bind(null,ot)},useEffectEvent:function(t){var e=Pt(),n={impl:t};return e.memoizedState=n,function(){if((wt&2)!==0)throw Error(c(440));return n.impl.apply(void 0,arguments)}}},Ec={readContext:Ft,use:gi,useCallback:Is,useContext:Ft,useEffect:gc,useImperativeHandle:Fs,useInsertionEffect:Zs,useLayoutEffect:Ks,useMemo:Ws,useReducer:yi,useRef:Qs,useState:function(){return yi(Ve)},useDebugValue:yc,useDeferredValue:function(t,e){var n=Lt();return $s(n,Ct.memoizedState,t,e)},useTransition:function(){var t=yi(Ve)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:ra(t),e]},useSyncExternalStore:Cs,useId:nf,useHostTransitionStatus:bc,useFormState:ks,useActionState:ks,useOptimistic:function(t,e){var n=Lt();return Os(n,Ct,t,e)},useMemoCache:sc,useCacheRefresh:lf};Ec.useEffectEvent=Vs;var rf={readContext:Ft,use:gi,useCallback:Is,useContext:Ft,useEffect:gc,useImperativeHandle:Fs,useInsertionEffect:Zs,useLayoutEffect:Ks,useMemo:Ws,useReducer:dc,useRef:Qs,useState:function(){return dc(Ve)},useDebugValue:yc,useDeferredValue:function(t,e){var n=Lt();return Ct===null?pc(n,t,e):$s(n,Ct.memoizedState,t,e)},useTransition:function(){var t=dc(Ve)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:ra(t),e]},useSyncExternalStore:Cs,useId:nf,useHostTransitionStatus:bc,useFormState:Ys,useActionState:Ys,useOptimistic:function(t,e){var n=Lt();return Ct!==null?Os(n,Ct,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:sc,useCacheRefresh:lf};rf.useEffectEvent=Vs;function wc(t,e,n,l){e=t.memoizedState,n=n(l,e),n=n==null?e:D({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Tc={enqueueSetState:function(t,e,n){t=t._reactInternals;var l=ye(),a=fn(l);a.payload=e,n!=null&&(a.callback=n),e=dn(t,a,l),e!==null&&(ue(e,t,l),ia(e,t,l))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var l=ye(),a=fn(l);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=dn(t,a,l),e!==null&&(ue(e,t,l),ia(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),l=fn(n);l.tag=2,e!=null&&(l.callback=e),e=dn(t,l,n),e!==null&&(ue(e,t,n),ia(e,t,n))}};function sf(t,e,n,l,a,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,i,u):e.prototype&&e.prototype.isPureReactComponent?!Wl(n,l)||!Wl(a,i):!0}function ff(t,e,n,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,l),e.state!==t&&Tc.enqueueReplaceState(e,e.state,null)}function Vn(t,e){var n=e;if("ref"in e){n={};for(var l in e)l!=="ref"&&(n[l]=e[l])}if(t=t.defaultProps){n===e&&(n=D({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function df(t){Wa(t)}function hf(t){console.error(t)}function mf(t){Wa(t)}function Si(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function gf(t,e,n){try{var l=t.onCaughtError;l(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function xc(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){Si(t,e)},n}function yf(t){return t=fn(t),t.tag=3,t}function pf(t,e,n,l){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=l.value;t.payload=function(){return a(i)},t.callback=function(){gf(e,n,l)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){gf(e,n,l),typeof a!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var r=l.stack;this.componentDidCatch(l.value,{componentStack:r!==null?r:""})})}function zm(t,e,n,l,a){if(n.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=n.alternate,e!==null&&ml(e,n,a,!0),n=de.current,n!==null){switch(n.tag){case 31:case 13:return xe===null?Di():n.alternate===null&&Ht===0&&(Ht=3),n.flags&=-257,n.flags|=65536,n.lanes=a,l===ci?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([l]):e.add(l),Fc(t,l,a)),!1;case 22:return n.flags|=65536,l===ci?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([l]):n.add(l)),Fc(t,l,a)),!1}throw Error(c(435,n.tag))}return Fc(t,l,a),Di(),!1}if(vt)return e=de.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=a,l!==Qu&&(t=Error(c(422),{cause:l}),ta(Se(t,n)))):(l!==Qu&&(e=Error(c(423),{cause:l}),ta(Se(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,l=Se(l,n),a=xc(t.stateNode,l,a),tc(t,a),Ht!==4&&(Ht=2)),!1;var i=Error(c(520),{cause:l});if(i=Se(i,n),ba===null?ba=[i]:ba.push(i),Ht!==4&&(Ht=2),e===null)return!0;l=Se(l,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=xc(n.stateNode,l,t),tc(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,a=yf(a),pf(a,t,n,l),tc(n,a),!1}n=n.return}while(n!==null);return!1}var Ac=Error(c(461)),Yt=!1;function It(t,e,n,l){e.child=t===null?Ss(e,null,n,l):Qn(e,t.child,n,l)}function vf(t,e,n,l,a){n=n.render;var i=e.ref;if("ref"in l){var u={};for(var r in l)r!=="ref"&&(u[r]=l[r])}else u=l;return qn(e),l=uc(t,e,n,u,i,a),r=cc(),t!==null&&!Yt?(oc(t,e,a),Ze(t,e,a)):(vt&&r&&Gu(e),e.flags|=1,It(t,e,l,a),e.child)}function bf(t,e,n,l,a){if(t===null){var i=n.type;return typeof i=="function"&&!Lu(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,Sf(t,e,i,l,a)):(t=ei(n.type,null,l,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Oc(t,a)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Wl,n(u,l)&&t.ref===e.ref)return Ze(t,e,a)}return e.flags|=1,t=ke(i,l),t.ref=e.ref,t.return=e,e.child=t}function Sf(t,e,n,l,a){if(t!==null){var i=t.memoizedProps;if(Wl(i,l)&&t.ref===e.ref)if(Yt=!1,e.pendingProps=l=i,Oc(t,a))(t.flags&131072)!==0&&(Yt=!0);else return e.lanes=t.lanes,Ze(t,e,a)}return Nc(t,e,n,l,a)}function Ef(t,e,n,l){var a=l.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(l=e.child=t.child,a=0;l!==null;)a=a|l.lanes|l.childLanes,l=l.sibling;l=a&~i}else l=0,e.child=null;return wf(t,e,i,n,l)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&ii(e,i!==null?i.cachePool:null),i!==null?Ts(e,i):nc(),xs(e);else return l=e.lanes=536870912,wf(t,e,i!==null?i.baseLanes|n:n,n,l)}else i!==null?(ii(e,i.cachePool),Ts(e,i),mn(),e.memoizedState=null):(t!==null&&ii(e,null),nc(),mn());return It(t,e,a,n),e.child}function da(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function wf(t,e,n,l,a){var i=Iu();return i=i===null?null:{parent:kt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&ii(e,null),nc(),xs(e),t!==null&&ml(t,e,l,!0),e.childLanes=a,null}function Ei(t,e){return e=Ti({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Tf(t,e,n){return Qn(e,t.child,null,n),t=Ei(e,e.pendingProps),t.flags|=2,he(e),e.memoizedState=null,t}function Dm(t,e,n){var l=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(vt){if(l.mode==="hidden")return t=Ei(e,l),e.lanes=536870912,da(null,t);if(ac(e),(t=Dt)?(t=Ud(t,Te),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:ze,overflow:De}:null,retryLane:536870912,hydrationErrors:null},n=is(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw on(e);return e.lanes=536870912,null}return Ei(e,l)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(ac(e),a)if(e.flags&256)e.flags&=-257,e=Tf(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(c(558));else if(Yt||ml(t,e,n,!1),a=(n&t.childLanes)!==0,Yt||a){if(l=Mt,l!==null&&(u=dr(l,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Un(t,u),ue(l,t,u),Ac;Di(),e=Tf(t,e,n)}else t=i.treeContext,Dt=Ae(u.nextSibling),Jt=e,vt=!0,cn=null,Te=!1,t!==null&&os(e,t),e=Ei(e,l),e.flags|=4096;return e}return t=ke(t.child,{mode:l.mode,children:l.children}),t.ref=e.ref,e.child=t,t.return=e,t}function wi(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(c(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Nc(t,e,n,l,a){return qn(e),n=uc(t,e,n,l,void 0,a),l=cc(),t!==null&&!Yt?(oc(t,e,a),Ze(t,e,a)):(vt&&l&&Gu(e),e.flags|=1,It(t,e,n,a),e.child)}function xf(t,e,n,l,a,i){return qn(e),e.updateQueue=null,n=Ns(e,l,n,a),As(t),l=cc(),t!==null&&!Yt?(oc(t,e,i),Ze(t,e,i)):(vt&&l&&Gu(e),e.flags|=1,It(t,e,n,i),e.child)}function Af(t,e,n,l,a){if(qn(e),e.stateNode===null){var i=sl,u=n.contextType;typeof u=="object"&&u!==null&&(i=Ft(u)),i=new n(l,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Tc,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=l,i.state=e.memoizedState,i.refs={},$u(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?Ft(u):sl,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(wc(e,n,u,l),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Tc.enqueueReplaceState(i,i.state,null),ca(e,l,i,a),ua(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){i=e.stateNode;var r=e.memoizedProps,g=Vn(n,r);i.props=g;var x=i.context,_=n.contextType;u=sl,typeof _=="object"&&_!==null&&(u=Ft(_));var M=n.getDerivedStateFromProps;_=typeof M=="function"||typeof i.getSnapshotBeforeUpdate=="function",r=e.pendingProps!==r,_||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r||x!==u)&&ff(e,i,l,u),sn=!1;var A=e.memoizedState;i.state=A,ca(e,l,i,a),ua(),x=e.memoizedState,r||A!==x||sn?(typeof M=="function"&&(wc(e,n,M,l),x=e.memoizedState),(g=sn||sf(e,n,g,l,A,x,u))?(_||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=x),i.props=l,i.state=x,i.context=u,l=g):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{i=e.stateNode,Pu(t,e),u=e.memoizedProps,_=Vn(n,u),i.props=_,M=e.pendingProps,A=i.context,x=n.contextType,g=sl,typeof x=="object"&&x!==null&&(g=Ft(x)),r=n.getDerivedStateFromProps,(x=typeof r=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==M||A!==g)&&ff(e,i,l,g),sn=!1,A=e.memoizedState,i.state=A,ca(e,l,i,a),ua();var N=e.memoizedState;u!==M||A!==N||sn||t!==null&&t.dependencies!==null&&li(t.dependencies)?(typeof r=="function"&&(wc(e,n,r,l),N=e.memoizedState),(_=sn||sf(e,n,_,l,A,N,g)||t!==null&&t.dependencies!==null&&li(t.dependencies))?(x||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,N,g),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,N,g)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=N),i.props=l,i.state=N,i.context=g,l=_):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),l=!1)}return i=l,wi(t,e),l=(e.flags&128)!==0,i||l?(i=e.stateNode,n=l&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&l?(e.child=Qn(e,t.child,null,a),e.child=Qn(e,null,n,a)):It(t,e,n,a),e.memoizedState=i.state,t=e.child):t=Ze(t,e,a),t}function Nf(t,e,n,l){return jn(),e.flags|=256,It(t,e,n,l),e.child}var Cc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function _c(t){return{baseLanes:t,cachePool:ms()}}function Rc(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=ge),t}function Cf(t,e,n){var l=e.pendingProps,a=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(jt.current&2)!==0),u&&(a=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(vt){if(a?hn(e):mn(),(t=Dt)?(t=Ud(t,Te),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:ze,overflow:De}:null,retryLane:536870912,hydrationErrors:null},n=is(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw on(e);return fo(t)?e.lanes=32:e.lanes=536870912,null}var r=l.children;return l=l.fallback,a?(mn(),a=e.mode,r=Ti({mode:"hidden",children:r},a),l=Hn(l,a,n,null),r.return=e,l.return=e,r.sibling=l,e.child=r,l=e.child,l.memoizedState=_c(n),l.childLanes=Rc(t,u,n),e.memoizedState=Cc,da(null,l)):(hn(e),Mc(e,r))}var g=t.memoizedState;if(g!==null&&(r=g.dehydrated,r!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=zc(t,e,n)):e.memoizedState!==null?(mn(),e.child=t.child,e.flags|=128,e=null):(mn(),r=l.fallback,a=e.mode,l=Ti({mode:"visible",children:l.children},a),r=Hn(r,a,n,null),r.flags|=2,l.return=e,r.return=e,l.sibling=r,e.child=l,Qn(e,t.child,null,n),l=e.child,l.memoizedState=_c(n),l.childLanes=Rc(t,u,n),e.memoizedState=Cc,e=da(null,l));else if(hn(e),fo(r)){if(u=r.nextSibling&&r.nextSibling.dataset,u)var x=u.dgst;u=x,l=Error(c(419)),l.stack="",l.digest=u,ta({value:l,source:null,stack:null}),e=zc(t,e,n)}else if(Yt||ml(t,e,n,!1),u=(n&t.childLanes)!==0,Yt||u){if(u=Mt,u!==null&&(l=dr(u,n),l!==0&&l!==g.retryLane))throw g.retryLane=l,Un(t,l),ue(u,t,l),Ac;so(r)||Di(),e=zc(t,e,n)}else so(r)?(e.flags|=192,e.child=t.child,e=null):(t=g.treeContext,Dt=Ae(r.nextSibling),Jt=e,vt=!0,cn=null,Te=!1,t!==null&&os(e,t),e=Mc(e,l.children),e.flags|=4096);return e}return a?(mn(),r=l.fallback,a=e.mode,g=t.child,x=g.sibling,l=ke(g,{mode:"hidden",children:l.children}),l.subtreeFlags=g.subtreeFlags&65011712,x!==null?r=ke(x,r):(r=Hn(r,a,n,null),r.flags|=2),r.return=e,l.return=e,l.sibling=r,e.child=l,da(null,l),l=e.child,r=t.child.memoizedState,r===null?r=_c(n):(a=r.cachePool,a!==null?(g=kt._currentValue,a=a.parent!==g?{parent:g,pool:g}:a):a=ms(),r={baseLanes:r.baseLanes|n,cachePool:a}),l.memoizedState=r,l.childLanes=Rc(t,u,n),e.memoizedState=Cc,da(t.child,l)):(hn(e),n=t.child,t=n.sibling,n=ke(n,{mode:"visible",children:l.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function Mc(t,e){return e=Ti({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ti(t,e){return t=fe(22,t,null,e),t.lanes=0,t}function zc(t,e,n){return Qn(e,t.child,null,n),t=Mc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function _f(t,e,n){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),Zu(t.return,e,n)}function Dc(t,e,n,l,a,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:n,tailMode:a,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=l,u.tail=n,u.tailMode=a,u.treeForkCount=i)}function Rf(t,e,n){var l=e.pendingProps,a=l.revealOrder,i=l.tail;l=l.children;var u=jt.current,r=(u&2)!==0;if(r?(u=u&1|2,e.flags|=128):u&=1,Y(jt,u),It(t,e,l,n),l=vt?Pl:0,!r&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&_f(t,n,e);else if(t.tag===19)_f(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&fi(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Dc(e,!1,a,n,i,l);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&fi(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Dc(e,!0,n,null,i,l);break;case"together":Dc(e,!1,null,null,void 0,l);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),pn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ml(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(c(153));if(e.child!==null){for(t=e.child,n=ke(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ke(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Oc(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&li(t)))}function Om(t,e,n){switch(e.tag){case 3:zt(e,e.stateNode.containerInfo),rn(e,kt,t.memoizedState.cache),jn();break;case 27:case 5:He(e);break;case 4:zt(e,e.stateNode.containerInfo);break;case 10:rn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,ac(e),null;break;case 13:var l=e.memoizedState;if(l!==null)return l.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Cf(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var a=(t.flags&128)!==0;if(l=(n&e.childLanes)!==0,l||(ml(t,e,n,!1),l=(n&e.childLanes)!==0),a){if(l)return Rf(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Y(jt,jt.current),l)break;return null;case 22:return e.lanes=0,Ef(t,e,n,e.pendingProps);case 24:rn(e,kt,t.memoizedState.cache)}return Ze(t,e,n)}function Mf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Yt=!0;else{if(!Oc(t,n)&&(e.flags&128)===0)return Yt=!1,Om(t,e,n);Yt=(t.flags&131072)!==0}else Yt=!1,vt&&(e.flags&1048576)!==0&&cs(e,Pl,e.index);switch(e.lanes=0,e.tag){case 16:t:{var l=e.pendingProps;if(t=Gn(e.elementType),e.type=t,typeof t=="function")Lu(t)?(l=Vn(t,l),e.tag=1,e=Af(null,e,t,l,n)):(e.tag=0,e=Nc(null,e,t,l,n));else{if(t!=null){var a=t.$$typeof;if(a===K){e.tag=11,e=vf(null,e,t,l,n);break t}else if(a===L){e.tag=14,e=bf(null,e,t,l,n);break t}}throw e=at(t)||t,Error(c(306,e,""))}}return e;case 0:return Nc(t,e,e.type,e.pendingProps,n);case 1:return l=e.type,a=Vn(l,e.pendingProps),Af(t,e,l,a,n);case 3:t:{if(zt(e,e.stateNode.containerInfo),t===null)throw Error(c(387));l=e.pendingProps;var i=e.memoizedState;a=i.element,Pu(t,e),ca(e,l,null,n);var u=e.memoizedState;if(l=u.cache,rn(e,kt,l),l!==i.cache&&Ku(e,[kt],n,!0),ua(),l=u.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Nf(t,e,l,n);break t}else if(l!==a){a=Se(Error(c(424)),e),ta(a),e=Nf(t,e,l,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Dt=Ae(t.firstChild),Jt=e,vt=!0,cn=null,Te=!0,n=Ss(e,null,l,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(jn(),l===a){e=Ze(t,e,n);break t}It(t,e,l,n)}e=e.child}return e;case 26:return wi(t,e),t===null?(n=Gd(e.type,null,e.pendingProps,null))?e.memoizedState=n:vt||(n=e.type,t=e.pendingProps,l=qi(ft.current).createElement(n),l[Kt]=e,l[te]=t,Wt(l,n,t),Vt(l),e.stateNode=l):e.memoizedState=Gd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return He(e),t===null&&vt&&(l=e.stateNode=Ld(e.type,e.pendingProps,ft.current),Jt=e,Te=!0,a=Dt,wn(e.type)?(ho=a,Dt=Ae(l.firstChild)):Dt=a),It(t,e,e.pendingProps.children,n),wi(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&vt&&((a=l=Dt)&&(l=rg(l,e.type,e.pendingProps,Te),l!==null?(e.stateNode=l,Jt=e,Dt=Ae(l.firstChild),Te=!1,a=!0):a=!1),a||on(e)),He(e),a=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,l=i.children,co(a,i)?l=null:u!==null&&co(a,u)&&(e.flags|=32),e.memoizedState!==null&&(a=uc(t,e,xm,null,null,n),Ca._currentValue=a),wi(t,e),It(t,e,l,n),e.child;case 6:return t===null&&vt&&((t=n=Dt)&&(n=sg(n,e.pendingProps,Te),n!==null?(e.stateNode=n,Jt=e,Dt=null,t=!0):t=!1),t||on(e)),null;case 13:return Cf(t,e,n);case 4:return zt(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=Qn(e,null,l,n):It(t,e,l,n),e.child;case 11:return vf(t,e,e.type,e.pendingProps,n);case 7:return It(t,e,e.pendingProps,n),e.child;case 8:return It(t,e,e.pendingProps.children,n),e.child;case 12:return It(t,e,e.pendingProps.children,n),e.child;case 10:return l=e.pendingProps,rn(e,e.type,l.value),It(t,e,l.children,n),e.child;case 9:return a=e.type._context,l=e.pendingProps.children,qn(e),a=Ft(a),l=l(a),e.flags|=1,It(t,e,l,n),e.child;case 14:return bf(t,e,e.type,e.pendingProps,n);case 15:return Sf(t,e,e.type,e.pendingProps,n);case 19:return Rf(t,e,n);case 31:return Dm(t,e,n);case 22:return Ef(t,e,n,e.pendingProps);case 24:return qn(e),l=Ft(kt),t===null?(a=Iu(),a===null&&(a=Mt,i=Ju(),a.pooledCache=i,i.refCount++,i!==null&&(a.pooledCacheLanes|=n),a=i),e.memoizedState={parent:l,cache:a},$u(e),rn(e,kt,a)):((t.lanes&n)!==0&&(Pu(t,e),ca(e,null,null,n),ua()),a=t.memoizedState,i=e.memoizedState,a.parent!==l?(a={parent:l,cache:l},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),rn(e,kt,l)):(l=i.cache,rn(e,kt,l),l!==a.cache&&Ku(e,[kt],n,!0))),It(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(c(156,e.tag))}function Ke(t){t.flags|=4}function Bc(t,e,n,l,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(ld())t.flags|=8192;else throw Yn=ci,Wu}else t.flags&=-16777217}function zf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Zd(e))if(ld())t.flags|=8192;else throw Yn=ci,Wu}function xi(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?rr():536870912,t.lanes|=e,Nl|=e)}function ha(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var l=null;n!==null;)n.alternate!==null&&(l=n),n=n.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function Ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,l=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags&65011712,l|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags,l|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=l,t.childLanes=n,e}function Bm(t,e,n){var l=e.pendingProps;switch(Yu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(e),null;case 1:return Ot(e),null;case 3:return n=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),Qe(kt),Nt(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(hl(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Xu())),Ot(e),null;case 26:var a=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(Ot(e),zf(e,i)):(Ot(e),Bc(e,a,null,l,n))):i?i!==t.memoizedState?(Ke(e),Ot(e),zf(e,i)):(Ot(e),e.flags&=-16777217):(t=t.memoizedProps,t!==l&&Ke(e),Ot(e),Bc(e,a,t,l,n)),null;case 27:if(Ua(e),n=ft.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Ke(e);else{if(!l){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}t=F.current,hl(e)?rs(e):(t=Ld(a,l,n),e.stateNode=t,Ke(e))}return Ot(e),null;case 5:if(Ua(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Ke(e);else{if(!l){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}if(i=F.current,hl(e))rs(e);else{var u=qi(ft.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?u.createElement("select",{is:l.is}):u.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?u.createElement(a,{is:l.is}):u.createElement(a)}}i[Kt]=e,i[te]=l;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch(Wt(i,a,l),a){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&Ke(e)}}return Ot(e),Bc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&Ke(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(c(166));if(t=ft.current,hl(e)){if(t=e.stateNode,n=e.memoizedProps,l=null,a=Jt,a!==null)switch(a.tag){case 27:case 5:l=a.memoizedProps}t[Kt]=e,t=!!(t.nodeValue===n||l!==null&&l.suppressHydrationWarning===!0||Cd(t.nodeValue,n)),t||on(e,!0)}else t=qi(t).createTextNode(l),t[Kt]=e,e.stateNode=t}return Ot(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(l=hl(e),n!==null){if(t===null){if(!l)throw Error(c(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(557));t[Kt]=e}else jn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),t=!1}else n=Xu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(he(e),e):(he(e),null);if((e.flags&128)!==0)throw Error(c(558))}return Ot(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=hl(e),l!==null&&l.dehydrated!==null){if(t===null){if(!a)throw Error(c(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(c(317));a[Kt]=e}else jn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),a=!1}else a=Xu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(he(e),e):(he(e),null)}return he(e),(e.flags&128)!==0?(e.lanes=n,e):(n=l!==null,t=t!==null&&t.memoizedState!==null,n&&(l=e.child,a=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(a=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==a&&(l.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),xi(e,e.updateQueue),Ot(e),null);case 4:return Nt(),t===null&&no(e.stateNode.containerInfo),Ot(e),null;case 10:return Qe(e.type),Ot(e),null;case 19:if(z(jt),l=e.memoizedState,l===null)return Ot(e),null;if(a=(e.flags&128)!==0,i=l.rendering,i===null)if(a)ha(l,!1);else{if(Ht!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=fi(t),i!==null){for(e.flags|=128,ha(l,!1),t=i.updateQueue,e.updateQueue=t,xi(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)as(n,t),n=n.sibling;return Y(jt,jt.current&1|2),vt&&Ge(e,l.treeForkCount),e.child}t=t.sibling}l.tail!==null&&ce()>Ri&&(e.flags|=128,a=!0,ha(l,!1),e.lanes=4194304)}else{if(!a)if(t=fi(i),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,xi(e,t),ha(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!vt)return Ot(e),null}else 2*ce()-l.renderingStartTime>Ri&&n!==536870912&&(e.flags|=128,a=!0,ha(l,!1),e.lanes=4194304);l.isBackwards?(i.sibling=e.child,e.child=i):(t=l.last,t!==null?t.sibling=i:e.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ce(),t.sibling=null,n=jt.current,Y(jt,a?n&1|2:n&1),vt&&Ge(e,l.treeForkCount),t):(Ot(e),null);case 22:case 23:return he(e),lc(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(n&536870912)!==0&&(e.flags&128)===0&&(Ot(e),e.subtreeFlags&6&&(e.flags|=8192)):Ot(e),n=e.updateQueue,n!==null&&xi(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==n&&(e.flags|=2048),t!==null&&z(kn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Qe(kt),Ot(e),null;case 25:return null;case 30:return null}throw Error(c(156,e.tag))}function Um(t,e){switch(Yu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Qe(kt),Nt(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Ua(e),null;case 31:if(e.memoizedState!==null){if(he(e),e.alternate===null)throw Error(c(340));jn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(he(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(c(340));jn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return z(jt),null;case 4:return Nt(),null;case 10:return Qe(e.type),null;case 22:case 23:return he(e),lc(),t!==null&&z(kn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Qe(kt),null;case 25:return null;default:return null}}function Df(t,e){switch(Yu(e),e.tag){case 3:Qe(kt),Nt();break;case 26:case 27:case 5:Ua(e);break;case 4:Nt();break;case 31:e.memoizedState!==null&&he(e);break;case 13:he(e);break;case 19:z(jt);break;case 10:Qe(e.type);break;case 22:case 23:he(e),lc(),t!==null&&z(kn);break;case 24:Qe(kt)}}function ma(t,e){try{var n=e.updateQueue,l=n!==null?n.lastEffect:null;if(l!==null){var a=l.next;n=a;do{if((n.tag&t)===t){l=void 0;var i=n.create,u=n.inst;l=i(),u.destroy=l}n=n.next}while(n!==a)}}catch(r){At(e,e.return,r)}}function gn(t,e,n){try{var l=e.updateQueue,a=l!==null?l.lastEffect:null;if(a!==null){var i=a.next;l=i;do{if((l.tag&t)===t){var u=l.inst,r=u.destroy;if(r!==void 0){u.destroy=void 0,a=e;var g=n,x=r;try{x()}catch(_){At(a,g,_)}}}l=l.next}while(l!==i)}}catch(_){At(e,e.return,_)}}function Of(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{ws(e,n)}catch(l){At(t,t.return,l)}}}function Bf(t,e,n){n.props=Vn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(l){At(t,e,l)}}function ga(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof n=="function"?t.refCleanup=n(l):n.current=l}}catch(a){At(t,e,a)}}function Oe(t,e){var n=t.ref,l=t.refCleanup;if(n!==null)if(typeof l=="function")try{l()}catch(a){At(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){At(t,e,a)}else n.current=null}function Uf(t){var e=t.type,n=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&l.focus();break t;case"img":n.src?l.src=n.src:n.srcSet&&(l.srcset=n.srcSet)}}catch(a){At(t,t.return,a)}}function Uc(t,e,n){try{var l=t.stateNode;lg(l,t.type,n,e),l[te]=e}catch(a){At(t,t.return,a)}}function Hf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&wn(t.type)||t.tag===4}function Hc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Hf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&wn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function jc(t,e,n){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Le));else if(l!==4&&(l===27&&wn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(jc(t,e,n),t=t.sibling;t!==null;)jc(t,e,n),t=t.sibling}function Ai(t,e,n){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(l!==4&&(l===27&&wn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ai(t,e,n),t=t.sibling;t!==null;)Ai(t,e,n),t=t.sibling}function jf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var l=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Wt(e,l,n),e[Kt]=t,e[te]=n}catch(i){At(t,t.return,i)}}var Je=!1,Qt=!1,Lc=!1,Lf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function Hm(t,e){if(t=t.containerInfo,io=Zi,t=Fr(t),zu(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var l=n.getSelection&&n.getSelection();if(l&&l.rangeCount!==0){n=l.anchorNode;var a=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,r=-1,g=-1,x=0,_=0,M=t,A=null;e:for(;;){for(var N;M!==n||a!==0&&M.nodeType!==3||(r=u+a),M!==i||l!==0&&M.nodeType!==3||(g=u+l),M.nodeType===3&&(u+=M.nodeValue.length),(N=M.firstChild)!==null;)A=M,M=N;for(;;){if(M===t)break e;if(A===n&&++x===a&&(r=u),A===i&&++_===l&&(g=u),(N=M.nextSibling)!==null)break;M=A,A=M.parentNode}M=N}n=r===-1||g===-1?null:{start:r,end:g}}else n=null}n=n||{start:0,end:0}}else n=null;for(uo={focusedElem:t,selectionRange:n},Zi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,a=i.memoizedProps,i=i.memoizedState,l=n.stateNode;try{var J=Vn(n.type,a);t=l.getSnapshotBeforeUpdate(J,i),l.__reactInternalSnapshotBeforeUpdate=t}catch(lt){At(n,n.return,lt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)ro(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":ro(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(c(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function qf(t,e,n){var l=n.flags;switch(n.tag){case 0:case 11:case 15:Ie(t,n),l&4&&ma(5,n);break;case 1:if(Ie(t,n),l&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){At(n,n.return,u)}else{var a=Vn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){At(n,n.return,u)}}l&64&&Of(n),l&512&&ga(n,n.return);break;case 3:if(Ie(t,n),l&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{ws(t,e)}catch(u){At(n,n.return,u)}}break;case 27:e===null&&l&4&&jf(n);case 26:case 5:Ie(t,n),e===null&&l&4&&Uf(n),l&512&&ga(n,n.return);break;case 12:Ie(t,n);break;case 31:Ie(t,n),l&4&&Yf(t,n);break;case 13:Ie(t,n),l&4&&Qf(t,n),l&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Vm.bind(null,n),fg(t,n))));break;case 22:if(l=n.memoizedState!==null||Je,!l){e=e!==null&&e.memoizedState!==null||Qt,a=Je;var i=Qt;Je=l,(Qt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Ie(t,n),Je=a,Qt=i}break;case 30:break;default:Ie(t,n)}}function kf(t){var e=t.alternate;e!==null&&(t.alternate=null,kf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&mu(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Bt=null,ne=!1;function Fe(t,e,n){for(n=n.child;n!==null;)Gf(t,e,n),n=n.sibling}function Gf(t,e,n){if(oe&&typeof oe.onCommitFiberUnmount=="function")try{oe.onCommitFiberUnmount(ql,n)}catch{}switch(n.tag){case 26:Qt||Oe(n,e),Fe(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qt||Oe(n,e);var l=Bt,a=ne;wn(n.type)&&(Bt=n.stateNode,ne=!1),Fe(t,e,n),xa(n.stateNode),Bt=l,ne=a;break;case 5:Qt||Oe(n,e);case 6:if(l=Bt,a=ne,Bt=null,Fe(t,e,n),Bt=l,ne=a,Bt!==null)if(ne)try{(Bt.nodeType===9?Bt.body:Bt.nodeName==="HTML"?Bt.ownerDocument.body:Bt).removeChild(n.stateNode)}catch(i){At(n,e,i)}else try{Bt.removeChild(n.stateNode)}catch(i){At(n,e,i)}break;case 18:Bt!==null&&(ne?(t=Bt,Od(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Bl(t)):Od(Bt,n.stateNode));break;case 4:l=Bt,a=ne,Bt=n.stateNode.containerInfo,ne=!0,Fe(t,e,n),Bt=l,ne=a;break;case 0:case 11:case 14:case 15:gn(2,n,e),Qt||gn(4,n,e),Fe(t,e,n);break;case 1:Qt||(Oe(n,e),l=n.stateNode,typeof l.componentWillUnmount=="function"&&Bf(n,e,l)),Fe(t,e,n);break;case 21:Fe(t,e,n);break;case 22:Qt=(l=Qt)||n.memoizedState!==null,Fe(t,e,n),Qt=l;break;default:Fe(t,e,n)}}function Yf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Bl(t)}catch(n){At(e,e.return,n)}}}function Qf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Bl(t)}catch(n){At(e,e.return,n)}}function jm(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Lf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Lf),e;default:throw Error(c(435,t.tag))}}function Ni(t,e){var n=jm(t);e.forEach(function(l){if(!n.has(l)){n.add(l);var a=Zm.bind(null,t,l);l.then(a,a)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var l=0;l<n.length;l++){var a=n[l],i=t,u=e,r=u;t:for(;r!==null;){switch(r.tag){case 27:if(wn(r.type)){Bt=r.stateNode,ne=!1;break t}break;case 5:Bt=r.stateNode,ne=!1;break t;case 3:case 4:Bt=r.stateNode.containerInfo,ne=!0;break t}r=r.return}if(Bt===null)throw Error(c(160));Gf(i,u,a),Bt=null,ne=!1,i=a.alternate,i!==null&&(i.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Xf(e,t),e=e.sibling}var Re=null;function Xf(t,e){var n=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ae(t),l&4&&(gn(3,t,t.return),ma(3,t),gn(5,t,t.return));break;case 1:le(e,t),ae(t),l&512&&(Qt||n===null||Oe(n,n.return)),l&64&&Je&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?l:n.concat(l))));break;case 26:var a=Re;if(le(e,t),ae(t),l&512&&(Qt||n===null||Oe(n,n.return)),l&4){var i=n!==null?n.memoizedState:null;if(l=t.memoizedState,n===null)if(l===null)if(t.stateNode===null){t:{l=t.type,n=t.memoizedProps,a=a.ownerDocument||a;e:switch(l){case"title":i=a.getElementsByTagName("title")[0],(!i||i[Yl]||i[Kt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(l),a.head.insertBefore(i,a.querySelector("head > title"))),Wt(i,l,n),i[Kt]=t,Vt(i),l=i;break t;case"link":var u=Xd("link","href",a).get(l+(n.href||""));if(u){for(var r=0;r<u.length;r++)if(i=u[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(r,1);break e}}i=a.createElement(l),Wt(i,l,n),a.head.appendChild(i);break;case"meta":if(u=Xd("meta","content",a).get(l+(n.content||""))){for(r=0;r<u.length;r++)if(i=u[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(r,1);break e}}i=a.createElement(l),Wt(i,l,n),a.head.appendChild(i);break;default:throw Error(c(468,l))}i[Kt]=t,Vt(i),l=i}t.stateNode=l}else Vd(a,t.type,t.stateNode);else t.stateNode=Qd(a,l,t.memoizedProps);else i!==l?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,l===null?Vd(a,t.type,t.stateNode):Qd(a,l,t.memoizedProps)):l===null&&t.stateNode!==null&&Uc(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ae(t),l&512&&(Qt||n===null||Oe(n,n.return)),n!==null&&l&4&&Uc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ae(t),l&512&&(Qt||n===null||Oe(n,n.return)),t.flags&32){a=t.stateNode;try{ll(a,"")}catch(J){At(t,t.return,J)}}l&4&&t.stateNode!=null&&(a=t.memoizedProps,Uc(t,a,n!==null?n.memoizedProps:a)),l&1024&&(Lc=!0);break;case 6:if(le(e,t),ae(t),l&4){if(t.stateNode===null)throw Error(c(162));l=t.memoizedProps,n=t.stateNode;try{n.nodeValue=l}catch(J){At(t,t.return,J)}}break;case 3:if(Yi=null,a=Re,Re=ki(e.containerInfo),le(e,t),Re=a,ae(t),l&4&&n!==null&&n.memoizedState.isDehydrated)try{Bl(e.containerInfo)}catch(J){At(t,t.return,J)}Lc&&(Lc=!1,Vf(t));break;case 4:l=Re,Re=ki(t.stateNode.containerInfo),le(e,t),ae(t),Re=l;break;case 12:le(e,t),ae(t);break;case 31:le(e,t),ae(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Ni(t,l)));break;case 13:le(e,t),ae(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(_i=ce()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Ni(t,l)));break;case 22:a=t.memoizedState!==null;var g=n!==null&&n.memoizedState!==null,x=Je,_=Qt;if(Je=x||a,Qt=_||g,le(e,t),Qt=_,Je=x,ae(t),l&8192)t:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||g||Je||Qt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){g=n=e;try{if(i=g.stateNode,a)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{r=g.stateNode;var M=g.memoizedProps.style,A=M!=null&&M.hasOwnProperty("display")?M.display:null;r.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(J){At(g,g.return,J)}}}else if(e.tag===6){if(n===null){g=e;try{g.stateNode.nodeValue=a?"":g.memoizedProps}catch(J){At(g,g.return,J)}}}else if(e.tag===18){if(n===null){g=e;try{var N=g.stateNode;a?Bd(N,!0):Bd(g.stateNode,!1)}catch(J){At(g,g.return,J)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}l&4&&(l=t.updateQueue,l!==null&&(n=l.retryQueue,n!==null&&(l.retryQueue=null,Ni(t,n))));break;case 19:le(e,t),ae(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Ni(t,l)));break;case 30:break;case 21:break;default:le(e,t),ae(t)}}function ae(t){var e=t.flags;if(e&2){try{for(var n,l=t.return;l!==null;){if(Hf(l)){n=l;break}l=l.return}if(n==null)throw Error(c(160));switch(n.tag){case 27:var a=n.stateNode,i=Hc(t);Ai(t,i,a);break;case 5:var u=n.stateNode;n.flags&32&&(ll(u,""),n.flags&=-33);var r=Hc(t);Ai(t,r,u);break;case 3:case 4:var g=n.stateNode.containerInfo,x=Hc(t);jc(t,x,g);break;default:throw Error(c(161))}}catch(_){At(t,t.return,_)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Vf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Vf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Ie(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)qf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:gn(4,e,e.return),Zn(e);break;case 1:Oe(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Bf(e,e.return,n),Zn(e);break;case 27:xa(e.stateNode);case 26:case 5:Oe(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var l=e.alternate,a=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(a,i,n),ma(4,i);break;case 1:if(We(a,i,n),l=i,a=l.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(x){At(l,l.return,x)}if(l=i,a=l.updateQueue,a!==null){var r=l.stateNode;try{var g=a.shared.hiddenCallbacks;if(g!==null)for(a.shared.hiddenCallbacks=null,a=0;a<g.length;a++)Es(g[a],r)}catch(x){At(l,l.return,x)}}n&&u&64&&Of(i),ga(i,i.return);break;case 27:jf(i);case 26:case 5:We(a,i,n),n&&l===null&&u&4&&Uf(i),ga(i,i.return);break;case 12:We(a,i,n);break;case 31:We(a,i,n),n&&u&4&&Yf(a,i);break;case 13:We(a,i,n),n&&u&4&&Qf(a,i);break;case 22:i.memoizedState===null&&We(a,i,n),ga(i,i.return);break;case 30:break;default:We(a,i,n)}e=e.sibling}}function qc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&ea(n))}function kc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&ea(t))}function Me(t,e,n,l){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Zf(t,e,n,l),e=e.sibling}function Zf(t,e,n,l){var a=e.flags;switch(e.tag){case 0:case 11:case 15:Me(t,e,n,l),a&2048&&ma(9,e);break;case 1:Me(t,e,n,l);break;case 3:Me(t,e,n,l),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&ea(t)));break;case 12:if(a&2048){Me(t,e,n,l),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,r=i.onPostCommit;typeof r=="function"&&r(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(g){At(e,e.return,g)}}else Me(t,e,n,l);break;case 31:Me(t,e,n,l);break;case 13:Me(t,e,n,l);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?Me(t,e,n,l):ya(t,e):i._visibility&2?Me(t,e,n,l):(i._visibility|=2,Tl(t,e,n,l,(e.subtreeFlags&10256)!==0||!1)),a&2048&&qc(u,e);break;case 24:Me(t,e,n,l),a&2048&&kc(e.alternate,e);break;default:Me(t,e,n,l)}}function Tl(t,e,n,l,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,r=n,g=l,x=u.flags;switch(u.tag){case 0:case 11:case 15:Tl(i,u,r,g,a),ma(8,u);break;case 23:break;case 22:var _=u.stateNode;u.memoizedState!==null?_._visibility&2?Tl(i,u,r,g,a):ya(i,u):(_._visibility|=2,Tl(i,u,r,g,a)),a&&x&2048&&qc(u.alternate,u);break;case 24:Tl(i,u,r,g,a),a&&x&2048&&kc(u.alternate,u);break;default:Tl(i,u,r,g,a)}e=e.sibling}}function ya(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,l=e,a=l.flags;switch(l.tag){case 22:ya(n,l),a&2048&&qc(l.alternate,l);break;case 24:ya(n,l),a&2048&&kc(l.alternate,l);break;default:ya(n,l)}e=e.sibling}}var pa=8192;function xl(t,e,n){if(t.subtreeFlags&pa)for(t=t.child;t!==null;)Kf(t,e,n),t=t.sibling}function Kf(t,e,n){switch(t.tag){case 26:xl(t,e,n),t.flags&pa&&t.memoizedState!==null&&Tg(n,Re,t.memoizedState,t.memoizedProps);break;case 5:xl(t,e,n);break;case 3:case 4:var l=Re;Re=ki(t.stateNode.containerInfo),xl(t,e,n),Re=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=pa,pa=16777216,xl(t,e,n),pa=l):xl(t,e,n));break;default:xl(t,e,n)}}function Jf(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function va(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];Zt=l,If(l,t)}Jf(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ff(t),t=t.sibling}function Ff(t){switch(t.tag){case 0:case 11:case 15:va(t),t.flags&2048&&gn(9,t,t.return);break;case 3:va(t);break;case 12:va(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ci(t)):va(t);break;default:va(t)}}function Ci(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];Zt=l,If(l,t)}Jf(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:gn(8,e,e.return),Ci(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ci(e));break;default:Ci(e)}t=t.sibling}}function If(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:gn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var l=n.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:ea(n.memoizedState.cache)}if(l=n.child,l!==null)l.return=n,Zt=l;else t:for(n=t;Zt!==null;){l=Zt;var a=l.sibling,i=l.return;if(kf(l),l===n){Zt=null;break t}if(a!==null){a.return=i,Zt=a;break t}Zt=i}}}var Lm={getCacheForType:function(t){var e=Ft(kt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ft(kt).controller.signal}},qm=typeof WeakMap=="function"?WeakMap:Map,wt=0,Mt=null,ht=null,gt=0,xt=0,me=null,yn=!1,Al=!1,Gc=!1,$e=0,Ht=0,pn=0,Kn=0,Yc=0,ge=0,Nl=0,ba=null,ie=null,Qc=!1,_i=0,Wf=0,Ri=1/0,Mi=null,vn=null,Xt=0,bn=null,Cl=null,Pe=0,Xc=0,Vc=null,$f=null,Sa=0,Zc=null;function ye(){return(wt&2)!==0&&gt!==0?gt&-gt:C.T!==null?$c():hr()}function Pf(){if(ge===0)if((gt&536870912)===0||vt){var t=La;La<<=1,(La&3932160)===0&&(La=262144),ge=t}else ge=536870912;return t=de.current,t!==null&&(t.flags|=32),ge}function ue(t,e,n){(t===Mt&&(xt===2||xt===9)||t.cancelPendingCommit!==null)&&(_l(t,0),Sn(t,gt,ge,!1)),Gl(t,n),((wt&2)===0||t!==Mt)&&(t===Mt&&((wt&2)===0&&(Kn|=n),Ht===4&&Sn(t,gt,ge,!1)),Be(t))}function td(t,e,n){if((wt&6)!==0)throw Error(c(327));var l=!n&&(e&127)===0&&(e&t.expiredLanes)===0||kl(t,e),a=l?Ym(t,e):Jc(t,e,!0),i=l;do{if(a===0){Al&&!l&&Sn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!km(n)){a=Jc(t,e,!1),i=!1;continue}if(a===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var r=t;a=ba;var g=r.current.memoizedState.isDehydrated;if(g&&(_l(r,u).flags|=256),u=Jc(r,u,!1),u!==2){if(Gc&&!g){r.errorRecoveryDisabledLanes|=i,Kn|=i,a=4;break t}i=ie,ie=a,i!==null&&(ie===null?ie=i:ie.push.apply(ie,i))}a=u}if(i=!1,a!==2)continue}}if(a===1){_l(t,0),Sn(t,e,0,!0);break}t:{switch(l=t,i=a,i){case 0:case 1:throw Error(c(345));case 4:if((e&4194048)!==e)break;case 6:Sn(l,e,ge,!yn);break t;case 2:ie=null;break;case 3:case 5:break;default:throw Error(c(329))}if((e&62914560)===e&&(a=_i+300-ce(),10<a)){if(Sn(l,e,ge,!yn),ka(l,0,!0)!==0)break t;Pe=e,l.timeoutHandle=zd(ed.bind(null,l,n,ie,Mi,Qc,e,ge,Kn,Nl,yn,i,"Throttled",-0,0),a);break t}ed(l,n,ie,Mi,Qc,e,ge,Kn,Nl,yn,i,null,-0,0)}}break}while(!0);Be(t)}function ed(t,e,n,l,a,i,u,r,g,x,_,M,A,N){if(t.timeoutHandle=-1,M=e.subtreeFlags,M&8192||(M&16785408)===16785408){M={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Le},Kf(e,i,M);var J=(i&62914560)===i?_i-ce():(i&4194048)===i?Wf-ce():0;if(J=xg(M,J),J!==null){Pe=i,t.cancelPendingCommit=J(rd.bind(null,t,e,i,n,l,a,u,r,g,_,M,null,A,N)),Sn(t,i,u,!x);return}}rd(t,e,i,n,l,a,u,r,g)}function km(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var l=0;l<n.length;l++){var a=n[l],i=a.getSnapshot;a=a.value;try{if(!se(i(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Sn(t,e,n,l){e&=~Yc,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var a=e;0<a;){var i=31-re(a),u=1<<i;l[i]=-1,a&=~u}n!==0&&sr(t,n,e)}function zi(){return(wt&6)===0?(Ea(0),!1):!0}function Kc(){if(ht!==null){if(xt===0)var t=ht.return;else t=ht,Ye=Ln=null,rc(t),vl=null,la=0,t=ht;for(;t!==null;)Df(t.alternate,t),t=t.return;ht=null}}function _l(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,ug(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Kc(),Mt=t,ht=n=ke(t.current,null),gt=e,xt=0,me=null,yn=!1,Al=kl(t,e),Gc=!1,Nl=ge=Yc=Kn=pn=Ht=0,ie=ba=null,Qc=!1,(e&8)!==0&&(e|=e&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=e;0<l;){var a=31-re(l),i=1<<a;e|=t[a],l&=~i}return $e=e,$a(),n}function nd(t,e){ot=null,C.H=fa,e===pl||e===ui?(e=ps(),xt=3):e===Wu?(e=ps(),xt=4):xt=e===Ac?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,me=e,ht===null&&(Ht=1,Si(t,Se(e,t.current)))}function ld(){var t=de.current;return t===null?!0:(gt&4194048)===gt?xe===null:(gt&62914560)===gt||(gt&536870912)!==0?t===xe:!1}function ad(){var t=C.H;return C.H=fa,t===null?fa:t}function id(){var t=C.A;return C.A=Lm,t}function Di(){Ht=4,yn||(gt&4194048)!==gt&&de.current!==null||(Al=!0),(pn&134217727)===0&&(Kn&134217727)===0||Mt===null||Sn(Mt,gt,ge,!1)}function Jc(t,e,n){var l=wt;wt|=2;var a=ad(),i=id();(Mt!==t||gt!==e)&&(Mi=null,_l(t,e)),e=!1;var u=Ht;t:do try{if(xt!==0&&ht!==null){var r=ht,g=me;switch(xt){case 8:Kc(),u=6;break t;case 3:case 2:case 9:case 6:de.current===null&&(e=!0);var x=xt;if(xt=0,me=null,Rl(t,r,g,x),n&&Al){u=0;break t}break;default:x=xt,xt=0,me=null,Rl(t,r,g,x)}}Gm(),u=Ht;break}catch(_){nd(t,_)}while(!0);return e&&t.shellSuspendCounter++,Ye=Ln=null,wt=l,C.H=a,C.A=i,ht===null&&(Mt=null,gt=0,$a()),u}function Gm(){for(;ht!==null;)ud(ht)}function Ym(t,e){var n=wt;wt|=2;var l=ad(),a=id();Mt!==t||gt!==e?(Mi=null,Ri=ce()+500,_l(t,e)):Al=kl(t,e);t:do try{if(xt!==0&&ht!==null){e=ht;var i=me;e:switch(xt){case 1:xt=0,me=null,Rl(t,e,i,1);break;case 2:case 9:if(gs(i)){xt=0,me=null,cd(e);break}e=function(){xt!==2&&xt!==9||Mt!==t||(xt=7),Be(t)},i.then(e,e);break t;case 3:xt=7;break t;case 4:xt=5;break t;case 7:gs(i)?(xt=0,me=null,cd(e)):(xt=0,me=null,Rl(t,e,i,7));break;case 5:var u=null;switch(ht.tag){case 26:u=ht.memoizedState;case 5:case 27:var r=ht;if(u?Zd(u):r.stateNode.complete){xt=0,me=null;var g=r.sibling;if(g!==null)ht=g;else{var x=r.return;x!==null?(ht=x,Oi(x)):ht=null}break e}}xt=0,me=null,Rl(t,e,i,5);break;case 6:xt=0,me=null,Rl(t,e,i,6);break;case 8:Kc(),Ht=6;break t;default:throw Error(c(462))}}Qm();break}catch(_){nd(t,_)}while(!0);return Ye=Ln=null,C.H=l,C.A=a,wt=n,ht!==null?0:(Mt=null,gt=0,$a(),Ht)}function Qm(){for(;ht!==null&&!d0();)ud(ht)}function ud(t){var e=Mf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?Oi(t):ht=e}function cd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=xf(n,e,e.pendingProps,e.type,void 0,gt);break;case 11:e=xf(n,e,e.pendingProps,e.type.render,e.ref,gt);break;case 5:rc(e);default:Df(n,e),e=ht=as(e,$e),e=Mf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?Oi(t):ht=e}function Rl(t,e,n,l){Ye=Ln=null,rc(e),vl=null,la=0;var a=e.return;try{if(zm(t,a,e,n,gt)){Ht=1,Si(t,Se(n,t.current)),ht=null;return}}catch(i){if(a!==null)throw ht=a,i;Ht=1,Si(t,Se(n,t.current)),ht=null;return}e.flags&32768?(vt||l===1?t=!0:Al||(gt&536870912)!==0?t=!1:(yn=t=!0,(l===2||l===9||l===3||l===6)&&(l=de.current,l!==null&&l.tag===13&&(l.flags|=16384))),od(e,t)):Oi(e)}function Oi(t){var e=t;do{if((e.flags&32768)!==0){od(e,yn);return}t=e.return;var n=Bm(e.alternate,e,$e);if(n!==null){ht=n;return}if(e=e.sibling,e!==null){ht=e;return}ht=e=t}while(e!==null);Ht===0&&(Ht=5)}function od(t,e){do{var n=Um(t.alternate,t);if(n!==null){n.flags&=32767,ht=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){ht=t;return}ht=t=n}while(t!==null);Ht=6,ht=null}function rd(t,e,n,l,a,i,u,r,g){t.cancelPendingCommit=null;do Bi();while(Xt!==0);if((wt&6)!==0)throw Error(c(327));if(e!==null){if(e===t.current)throw Error(c(177));if(i=e.lanes|e.childLanes,i|=Hu,w0(t,n,i,u,r,g),t===Mt&&(ht=Mt=null,gt=0),Cl=e,bn=t,Pe=n,Xc=i,Vc=a,$f=l,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Km(Ha,function(){return md(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||l){l=C.T,C.T=null,a=V.p,V.p=2,u=wt,wt|=4;try{Hm(t,e,n)}finally{wt=u,V.p=a,C.T=l}}Xt=1,sd(),fd(),dd()}}function sd(){if(Xt===1){Xt=0;var t=bn,e=Cl,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=C.T,C.T=null;var l=V.p;V.p=2;var a=wt;wt|=4;try{Xf(e,t);var i=uo,u=Fr(t.containerInfo),r=i.focusedElem,g=i.selectionRange;if(u!==r&&r&&r.ownerDocument&&Jr(r.ownerDocument.documentElement,r)){if(g!==null&&zu(r)){var x=g.start,_=g.end;if(_===void 0&&(_=x),"selectionStart"in r)r.selectionStart=x,r.selectionEnd=Math.min(_,r.value.length);else{var M=r.ownerDocument||document,A=M&&M.defaultView||window;if(A.getSelection){var N=A.getSelection(),J=r.textContent.length,lt=Math.min(g.start,J),Rt=g.end===void 0?lt:Math.min(g.end,J);!N.extend&&lt>Rt&&(u=Rt,Rt=lt,lt=u);var E=Kr(r,lt),y=Kr(r,Rt);if(E&&y&&(N.rangeCount!==1||N.anchorNode!==E.node||N.anchorOffset!==E.offset||N.focusNode!==y.node||N.focusOffset!==y.offset)){var T=M.createRange();T.setStart(E.node,E.offset),N.removeAllRanges(),lt>Rt?(N.addRange(T),N.extend(y.node,y.offset)):(T.setEnd(y.node,y.offset),N.addRange(T))}}}}for(M=[],N=r;N=N.parentNode;)N.nodeType===1&&M.push({element:N,left:N.scrollLeft,top:N.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<M.length;r++){var R=M[r];R.element.scrollLeft=R.left,R.element.scrollTop=R.top}}Zi=!!io,uo=io=null}finally{wt=a,V.p=l,C.T=n}}t.current=e,Xt=2}}function fd(){if(Xt===2){Xt=0;var t=bn,e=Cl,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=C.T,C.T=null;var l=V.p;V.p=2;var a=wt;wt|=4;try{qf(t,e.alternate,e)}finally{wt=a,V.p=l,C.T=n}}Xt=3}}function dd(){if(Xt===4||Xt===3){Xt=0,h0();var t=bn,e=Cl,n=Pe,l=$f;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Xt=5:(Xt=0,Cl=bn=null,hd(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(vn=null),du(n),e=e.stateNode,oe&&typeof oe.onCommitFiberRoot=="function")try{oe.onCommitFiberRoot(ql,e,void 0,(e.current.flags&128)===128)}catch{}if(l!==null){e=C.T,a=V.p,V.p=2,C.T=null;try{for(var i=t.onRecoverableError,u=0;u<l.length;u++){var r=l[u];i(r.value,{componentStack:r.stack})}}finally{C.T=e,V.p=a}}(Pe&3)!==0&&Bi(),Be(t),a=t.pendingLanes,(n&261930)!==0&&(a&42)!==0?t===Zc?Sa++:(Sa=0,Zc=t):Sa=0,Ea(0)}}function hd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,ea(e)))}function Bi(){return sd(),fd(),dd(),md()}function md(){if(Xt!==5)return!1;var t=bn,e=Xc;Xc=0;var n=du(Pe),l=C.T,a=V.p;try{V.p=32>n?32:n,C.T=null,n=Vc,Vc=null;var i=bn,u=Pe;if(Xt=0,Cl=bn=null,Pe=0,(wt&6)!==0)throw Error(c(331));var r=wt;if(wt|=4,Ff(i.current),Zf(i,i.current,u,n),wt=r,Ea(0,!1),oe&&typeof oe.onPostCommitFiberRoot=="function")try{oe.onPostCommitFiberRoot(ql,i)}catch{}return!0}finally{V.p=a,C.T=l,hd(t,e)}}function gd(t,e,n){e=Se(n,e),e=xc(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(Gl(t,2),Be(t))}function At(t,e,n){if(t.tag===3)gd(t,t,n);else for(;e!==null;){if(e.tag===3){gd(e,t,n);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(vn===null||!vn.has(l))){t=Se(n,t),n=yf(2),l=dn(e,n,2),l!==null&&(pf(n,l,e,t),Gl(l,2),Be(l));break}}e=e.return}}function Fc(t,e,n){var l=t.pingCache;if(l===null){l=t.pingCache=new qm;var a=new Set;l.set(e,a)}else a=l.get(e),a===void 0&&(a=new Set,l.set(e,a));a.has(n)||(Gc=!0,a.add(n),t=Xm.bind(null,t,e,n),e.then(t,t))}function Xm(t,e,n){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Mt===t&&(gt&n)===n&&(Ht===4||Ht===3&&(gt&62914560)===gt&&300>ce()-_i?(wt&2)===0&&_l(t,0):Yc|=n,Nl===gt&&(Nl=0)),Be(t)}function yd(t,e){e===0&&(e=rr()),t=Un(t,e),t!==null&&(Gl(t,e),Be(t))}function Vm(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),yd(t,n)}function Zm(t,e){var n=0;switch(t.tag){case 31:case 13:var l=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(c(314))}l!==null&&l.delete(e),yd(t,n)}function Km(t,e){return ou(t,e)}var Ui=null,Ml=null,Ic=!1,Hi=!1,Wc=!1,En=0;function Be(t){t!==Ml&&t.next===null&&(Ml===null?Ui=Ml=t:Ml=Ml.next=t),Hi=!0,Ic||(Ic=!0,Fm())}function Ea(t,e){if(!Wc&&Hi){Wc=!0;do for(var n=!1,l=Ui;l!==null;){if(t!==0){var a=l.pendingLanes;if(a===0)var i=0;else{var u=l.suspendedLanes,r=l.pingedLanes;i=(1<<31-re(42|t)+1)-1,i&=a&~(u&~r),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Sd(l,i))}else i=gt,i=ka(l,l===Mt?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||kl(l,i)||(n=!0,Sd(l,i));l=l.next}while(n);Wc=!1}}function Jm(){pd()}function pd(){Hi=Ic=!1;var t=0;En!==0&&ig()&&(t=En);for(var e=ce(),n=null,l=Ui;l!==null;){var a=l.next,i=vd(l,e);i===0?(l.next=null,n===null?Ui=a:n.next=a,a===null&&(Ml=n)):(n=l,(t!==0||(i&3)!==0)&&(Hi=!0)),l=a}Xt!==0&&Xt!==5||Ea(t),En!==0&&(En=0)}function vd(t,e){for(var n=t.suspendedLanes,l=t.pingedLanes,a=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-re(i),r=1<<u,g=a[u];g===-1?((r&n)===0||(r&l)!==0)&&(a[u]=E0(r,e)):g<=e&&(t.expiredLanes|=r),i&=~r}if(e=Mt,n=gt,n=ka(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,n===0||t===e&&(xt===2||xt===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&ru(l),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||kl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(l!==null&&ru(l),du(n)){case 2:case 8:n=cr;break;case 32:n=Ha;break;case 268435456:n=or;break;default:n=Ha}return l=bd.bind(null,t),n=ou(n,l),t.callbackPriority=e,t.callbackNode=n,e}return l!==null&&l!==null&&ru(l),t.callbackPriority=2,t.callbackNode=null,2}function bd(t,e){if(Xt!==0&&Xt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Bi()&&t.callbackNode!==n)return null;var l=gt;return l=ka(t,t===Mt?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(td(t,l,e),vd(t,ce()),t.callbackNode!=null&&t.callbackNode===n?bd.bind(null,t):null)}function Sd(t,e){if(Bi())return null;td(t,e,!0)}function Fm(){cg(function(){(wt&6)!==0?ou(ur,Jm):pd()})}function $c(){if(En===0){var t=gl;t===0&&(t=ja,ja<<=1,(ja&261888)===0&&(ja=256)),En=t}return En}function Ed(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Xa(""+t)}function wd(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function Im(t,e,n,l,a){if(e==="submit"&&n&&n.stateNode===a){var i=Ed((a[te]||null).action),u=l.submitter;u&&(e=(e=u[te]||null)?Ed(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var r=new Ja("action","action",null,l,a);t.push({event:r,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(En!==0){var g=u?wd(a,u):new FormData(a);vc(n,{pending:!0,data:g,method:a.method,action:i},null,g)}}else typeof i=="function"&&(r.preventDefault(),g=u?wd(a,u):new FormData(a),vc(n,{pending:!0,data:g,method:a.method,action:i},i,g))},currentTarget:a}]})}}for(var Pc=0;Pc<Uu.length;Pc++){var to=Uu[Pc],Wm=to.toLowerCase(),$m=to[0].toUpperCase()+to.slice(1);_e(Wm,"on"+$m)}_e($r,"onAnimationEnd"),_e(Pr,"onAnimationIteration"),_e(ts,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(mm,"onTransitionRun"),_e(gm,"onTransitionStart"),_e(ym,"onTransitionCancel"),_e(es,"onTransitionEnd"),el("onMouseEnter",["mouseout","mouseover"]),el("onMouseLeave",["mouseout","mouseover"]),el("onPointerEnter",["pointerout","pointerover"]),el("onPointerLeave",["pointerout","pointerover"]),zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zn("onBeforeInput",["compositionend","keypress","textInput","paste"]),zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Pm=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wa));function Td(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var l=t[n],a=l.event;l=l.listeners;t:{var i=void 0;if(e)for(var u=l.length-1;0<=u;u--){var r=l[u],g=r.instance,x=r.currentTarget;if(r=r.listener,g!==i&&a.isPropagationStopped())break t;i=r,a.currentTarget=x;try{i(a)}catch(_){Wa(_)}a.currentTarget=null,i=g}else for(u=0;u<l.length;u++){if(r=l[u],g=r.instance,x=r.currentTarget,r=r.listener,g!==i&&a.isPropagationStopped())break t;i=r,a.currentTarget=x;try{i(a)}catch(_){Wa(_)}a.currentTarget=null,i=g}}}}function mt(t,e){var n=e[hu];n===void 0&&(n=e[hu]=new Set);var l=t+"__bubble";n.has(l)||(xd(e,t,2,!1),n.add(l))}function eo(t,e,n){var l=0;e&&(l|=4),xd(n,t,l,e)}var ji="_reactListening"+Math.random().toString(36).slice(2);function no(t){if(!t[ji]){t[ji]=!0,yr.forEach(function(n){n!=="selectionchange"&&(Pm.has(n)||eo(n,!1,t),eo(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ji]||(e[ji]=!0,eo("selectionchange",!1,e))}}function xd(t,e,n,l){switch(Pd(e)){case 2:var a=Cg;break;case 8:a=_g;break;default:a=vo}n=a.bind(null,e,n,t),a=void 0,!wu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),l?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function lo(t,e,n,l,a){var i=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var u=l.tag;if(u===3||u===4){var r=l.stateNode.containerInfo;if(r===a)break;if(u===4)for(u=l.return;u!==null;){var g=u.tag;if((g===3||g===4)&&u.stateNode.containerInfo===a)return;u=u.return}for(;r!==null;){if(u=$n(r),u===null)return;if(g=u.tag,g===5||g===6||g===26||g===27){l=i=u;continue t}r=r.parentNode}}l=l.return}_r(function(){var x=i,_=Su(n),M=[];t:{var A=ns.get(t);if(A!==void 0){var N=Ja,J=t;switch(t){case"keypress":if(Za(n)===0)break t;case"keydown":case"keyup":N=Z0;break;case"focusin":J="focus",N=Nu;break;case"focusout":J="blur",N=Nu;break;case"beforeblur":case"afterblur":N=Nu;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=zr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=B0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=F0;break;case $r:case Pr:case ts:N=j0;break;case es:N=W0;break;case"scroll":case"scrollend":N=D0;break;case"wheel":N=P0;break;case"copy":case"cut":case"paste":N=q0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=Or;break;case"toggle":case"beforetoggle":N=em}var lt=(e&4)!==0,Rt=!lt&&(t==="scroll"||t==="scrollend"),E=lt?A!==null?A+"Capture":null:A;lt=[];for(var y=x,T;y!==null;){var R=y;if(T=R.stateNode,R=R.tag,R!==5&&R!==26&&R!==27||T===null||E===null||(R=Xl(y,E),R!=null&&lt.push(Ta(y,R,T))),Rt)break;y=y.return}0<lt.length&&(A=new N(A,J,null,n,_),M.push({event:A,listeners:lt}))}}if((e&7)===0){t:{if(A=t==="mouseover"||t==="pointerover",N=t==="mouseout"||t==="pointerout",A&&n!==bu&&(J=n.relatedTarget||n.fromElement)&&($n(J)||J[Wn]))break t;if((N||A)&&(A=_.window===_?_:(A=_.ownerDocument)?A.defaultView||A.parentWindow:window,N?(J=n.relatedTarget||n.toElement,N=x,J=J?$n(J):null,J!==null&&(Rt=d(J),lt=J.tag,J!==Rt||lt!==5&&lt!==27&&lt!==6)&&(J=null)):(N=null,J=x),N!==J)){if(lt=zr,R="onMouseLeave",E="onMouseEnter",y="mouse",(t==="pointerout"||t==="pointerover")&&(lt=Or,R="onPointerLeave",E="onPointerEnter",y="pointer"),Rt=N==null?A:Ql(N),T=J==null?A:Ql(J),A=new lt(R,y+"leave",N,n,_),A.target=Rt,A.relatedTarget=T,R=null,$n(_)===x&&(lt=new lt(E,y+"enter",J,n,_),lt.target=T,lt.relatedTarget=Rt,R=lt),Rt=R,N&&J)e:{for(lt=tg,E=N,y=J,T=0,R=E;R;R=lt(R))T++;R=0;for(var tt=y;tt;tt=lt(tt))R++;for(;0<T-R;)E=lt(E),T--;for(;0<R-T;)y=lt(y),R--;for(;T--;){if(E===y||y!==null&&E===y.alternate){lt=E;break e}E=lt(E),y=lt(y)}lt=null}else lt=null;N!==null&&Ad(M,A,N,lt,!1),J!==null&&Rt!==null&&Ad(M,Rt,J,lt,!0)}}t:{if(A=x?Ql(x):window,N=A.nodeName&&A.nodeName.toLowerCase(),N==="select"||N==="input"&&A.type==="file")var bt=Gr;else if(qr(A))if(Yr)bt=fm;else{bt=rm;var W=om}else N=A.nodeName,!N||N.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?x&&vu(x.elementType)&&(bt=Gr):bt=sm;if(bt&&(bt=bt(t,x))){kr(M,bt,n,_);break t}W&&W(t,A,x),t==="focusout"&&x&&A.type==="number"&&x.memoizedProps.value!=null&&pu(A,"number",A.value)}switch(W=x?Ql(x):window,t){case"focusin":(qr(W)||W.contentEditable==="true")&&(cl=W,Du=x,$l=null);break;case"focusout":$l=Du=cl=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,Ir(M,n,_);break;case"selectionchange":if(hm)break;case"keydown":case"keyup":Ir(M,n,_)}var rt;if(_u)t:{switch(t){case"compositionstart":var yt="onCompositionStart";break t;case"compositionend":yt="onCompositionEnd";break t;case"compositionupdate":yt="onCompositionUpdate";break t}yt=void 0}else ul?jr(t,n)&&(yt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(yt="onCompositionStart");yt&&(Br&&n.locale!=="ko"&&(ul||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&ul&&(rt=Rr()):(an=_,Tu="value"in an?an.value:an.textContent,ul=!0)),W=Li(x,yt),0<W.length&&(yt=new Dr(yt,t,null,n,_),M.push({event:yt,listeners:W}),rt?yt.data=rt:(rt=Lr(n),rt!==null&&(yt.data=rt)))),(rt=lm?am(t,n):im(t,n))&&(yt=Li(x,"onBeforeInput"),0<yt.length&&(W=new Dr("onBeforeInput","beforeinput",null,n,_),M.push({event:W,listeners:yt}),W.data=rt)),Im(M,t,x,n,_)}Td(M,e)})}function Ta(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Li(t,e){for(var n=e+"Capture",l=[];t!==null;){var a=t,i=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||i===null||(a=Xl(t,n),a!=null&&l.unshift(Ta(t,a,i)),a=Xl(t,e),a!=null&&l.push(Ta(t,a,i))),t.tag===3)return l;t=t.return}return[]}function tg(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Ad(t,e,n,l,a){for(var i=e._reactName,u=[];n!==null&&n!==l;){var r=n,g=r.alternate,x=r.stateNode;if(r=r.tag,g!==null&&g===l)break;r!==5&&r!==26&&r!==27||x===null||(g=x,a?(x=Xl(n,i),x!=null&&u.unshift(Ta(n,x,g))):a||(x=Xl(n,i),x!=null&&u.push(Ta(n,x,g)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var eg=/\r\n?/g,ng=/\u0000|\uFFFD/g;function Nd(t){return(typeof t=="string"?t:""+t).replace(eg,`
`).replace(ng,"")}function Cd(t,e){return e=Nd(e),Nd(t)===e}function _t(t,e,n,l,a,i){switch(n){case"children":typeof l=="string"?e==="body"||e==="textarea"&&l===""||ll(t,l):(typeof l=="number"||typeof l=="bigint")&&e!=="body"&&ll(t,""+l);break;case"className":Ya(t,"class",l);break;case"tabIndex":Ya(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Ya(t,n,l);break;case"style":Nr(t,l,i);break;case"data":if(e!=="object"){Ya(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=Xa(""+l),t.setAttribute(n,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",a.name,a,null),_t(t,e,"formEncType",a.formEncType,a,null),_t(t,e,"formMethod",a.formMethod,a,null),_t(t,e,"formTarget",a.formTarget,a,null)):(_t(t,e,"encType",a.encType,a,null),_t(t,e,"method",a.method,a,null),_t(t,e,"target",a.target,a,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=Xa(""+l),t.setAttribute(n,l);break;case"onClick":l!=null&&(t.onclick=Le);break;case"onScroll":l!=null&&mt("scroll",t);break;case"onScrollEnd":l!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(c(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}n=Xa(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,""+l):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":l===!0?t.setAttribute(n,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,l):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(n,l):t.removeAttribute(n);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(n):t.setAttribute(n,l);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Ga(t,"popover",l);break;case"xlinkActuate":je(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":je(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":je(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":je(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":je(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":je(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":je(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":je(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":je(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Ga(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=M0.get(n)||n,Ga(t,n,l))}}function ao(t,e,n,l,a,i){switch(n){case"style":Nr(t,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(c(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"children":typeof l=="string"?ll(t,l):(typeof l=="number"||typeof l=="bigint")&&ll(t,""+l);break;case"onScroll":l!=null&&mt("scroll",t);break;case"onScrollEnd":l!=null&&mt("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Le);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!pr.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),i=t[te]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,a),typeof l=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,l,a);break t}n in t?t[n]=l:l===!0?t.setAttribute(n,""):Ga(t,n,l)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var l=!1,a=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":l=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,i,u,n,null)}}a&&_t(t,e,"srcSet",n.srcSet,n,null),l&&_t(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var r=i=u=a=null,g=null,x=null;for(l in n)if(n.hasOwnProperty(l)){var _=n[l];if(_!=null)switch(l){case"name":a=_;break;case"type":u=_;break;case"checked":g=_;break;case"defaultChecked":x=_;break;case"value":i=_;break;case"defaultValue":r=_;break;case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(c(137,e));break;default:_t(t,e,l,_,n,null)}}wr(t,i,r,g,x,u,a,!1);return;case"select":mt("invalid",t),l=u=i=null;for(a in n)if(n.hasOwnProperty(a)&&(r=n[a],r!=null))switch(a){case"value":i=r;break;case"defaultValue":u=r;break;case"multiple":l=r;default:_t(t,e,a,r,n,null)}e=i,n=u,t.multiple=!!l,e!=null?nl(t,!!l,e,!1):n!=null&&nl(t,!!l,n,!0);return;case"textarea":mt("invalid",t),i=a=l=null;for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case"value":l=r;break;case"defaultValue":a=r;break;case"children":i=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(c(91));break;default:_t(t,e,u,r,n,null)}xr(t,l,a,i);return;case"option":for(g in n)if(n.hasOwnProperty(g)&&(l=n[g],l!=null))switch(g){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:_t(t,e,g,l,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(l=0;l<wa.length;l++)mt(wa[l],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(x in n)if(n.hasOwnProperty(x)&&(l=n[x],l!=null))switch(x){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,x,l,n,null)}return;default:if(vu(e)){for(_ in n)n.hasOwnProperty(_)&&(l=n[_],l!==void 0&&ao(t,e,_,l,n,void 0));return}}for(r in n)n.hasOwnProperty(r)&&(l=n[r],l!=null&&_t(t,e,r,l,n,null))}function lg(t,e,n,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,u=null,r=null,g=null,x=null,_=null;for(N in n){var M=n[N];if(n.hasOwnProperty(N)&&M!=null)switch(N){case"checked":break;case"value":break;case"defaultValue":g=M;default:l.hasOwnProperty(N)||_t(t,e,N,null,l,M)}}for(var A in l){var N=l[A];if(M=n[A],l.hasOwnProperty(A)&&(N!=null||M!=null))switch(A){case"type":i=N;break;case"name":a=N;break;case"checked":x=N;break;case"defaultChecked":_=N;break;case"value":u=N;break;case"defaultValue":r=N;break;case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(c(137,e));break;default:N!==M&&_t(t,e,A,N,l,M)}}yu(t,u,r,g,x,_,i,a);return;case"select":N=u=r=A=null;for(i in n)if(g=n[i],n.hasOwnProperty(i)&&g!=null)switch(i){case"value":break;case"multiple":N=g;default:l.hasOwnProperty(i)||_t(t,e,i,null,l,g)}for(a in l)if(i=l[a],g=n[a],l.hasOwnProperty(a)&&(i!=null||g!=null))switch(a){case"value":A=i;break;case"defaultValue":r=i;break;case"multiple":u=i;default:i!==g&&_t(t,e,a,i,l,g)}e=r,n=u,l=N,A!=null?nl(t,!!n,A,!1):!!l!=!!n&&(e!=null?nl(t,!!n,e,!0):nl(t,!!n,n?[]:"",!1));return;case"textarea":N=A=null;for(r in n)if(a=n[r],n.hasOwnProperty(r)&&a!=null&&!l.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:_t(t,e,r,null,l,a)}for(u in l)if(a=l[u],i=n[u],l.hasOwnProperty(u)&&(a!=null||i!=null))switch(u){case"value":A=a;break;case"defaultValue":N=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(c(91));break;default:a!==i&&_t(t,e,u,a,l,i)}Tr(t,A,N);return;case"option":for(var J in n)if(A=n[J],n.hasOwnProperty(J)&&A!=null&&!l.hasOwnProperty(J))switch(J){case"selected":t.selected=!1;break;default:_t(t,e,J,null,l,A)}for(g in l)if(A=l[g],N=n[g],l.hasOwnProperty(g)&&A!==N&&(A!=null||N!=null))switch(g){case"selected":t.selected=A&&typeof A!="function"&&typeof A!="symbol";break;default:_t(t,e,g,A,l,N)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var lt in n)A=n[lt],n.hasOwnProperty(lt)&&A!=null&&!l.hasOwnProperty(lt)&&_t(t,e,lt,null,l,A);for(x in l)if(A=l[x],N=n[x],l.hasOwnProperty(x)&&A!==N&&(A!=null||N!=null))switch(x){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(c(137,e));break;default:_t(t,e,x,A,l,N)}return;default:if(vu(e)){for(var Rt in n)A=n[Rt],n.hasOwnProperty(Rt)&&A!==void 0&&!l.hasOwnProperty(Rt)&&ao(t,e,Rt,void 0,l,A);for(_ in l)A=l[_],N=n[_],!l.hasOwnProperty(_)||A===N||A===void 0&&N===void 0||ao(t,e,_,A,l,N);return}}for(var E in n)A=n[E],n.hasOwnProperty(E)&&A!=null&&!l.hasOwnProperty(E)&&_t(t,e,E,null,l,A);for(M in l)A=l[M],N=n[M],!l.hasOwnProperty(M)||A===N||A==null&&N==null||_t(t,e,M,A,l,N)}function _d(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ag(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),l=0;l<n.length;l++){var a=n[l],i=a.transferSize,u=a.initiatorType,r=a.duration;if(i&&r&&_d(u)){for(u=0,r=a.responseEnd,l+=1;l<n.length;l++){var g=n[l],x=g.startTime;if(x>r)break;var _=g.transferSize,M=g.initiatorType;_&&_d(M)&&(g=g.responseEnd,u+=_*(g<r?1:(r-x)/(g-x)))}if(--l,e+=8*(i+u)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var io=null,uo=null;function qi(t){return t.nodeType===9?t:t.ownerDocument}function Rd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Md(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function co(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var oo=null;function ig(){var t=window.event;return t&&t.type==="popstate"?t===oo?!1:(oo=t,!0):(oo=null,!1)}var zd=typeof setTimeout=="function"?setTimeout:void 0,ug=typeof clearTimeout=="function"?clearTimeout:void 0,Dd=typeof Promise=="function"?Promise:void 0,cg=typeof queueMicrotask=="function"?queueMicrotask:typeof Dd<"u"?function(t){return Dd.resolve(null).then(t).catch(og)}:zd;function og(t){setTimeout(function(){throw t})}function wn(t){return t==="head"}function Od(t,e){var n=e,l=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(l===0){t.removeChild(a),Bl(e);return}l--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")l++;else if(n==="html")xa(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,xa(n);for(var i=n.firstChild;i;){var u=i.nextSibling,r=i.nodeName;i[Yl]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&xa(t.ownerDocument.body);n=a}while(n);Bl(e)}function Bd(t,e){var n=t;t=0;do{var l=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=l}while(n)}function ro(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":ro(n),mu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function rg(t,e,n,l){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[Yl])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ae(t.nextSibling),t===null)break}return null}function sg(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ae(t.nextSibling),t===null))return null;return t}function Ud(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ae(t.nextSibling),t===null))return null;return t}function so(t){return t.data==="$?"||t.data==="$~"}function fo(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function fg(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var l=function(){e(),n.removeEventListener("DOMContentLoaded",l)};n.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function Ae(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var ho=null;function Hd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ae(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function jd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Ld(t,e,n){switch(e=qi(n),t){case"html":if(t=e.documentElement,!t)throw Error(c(452));return t;case"head":if(t=e.head,!t)throw Error(c(453));return t;case"body":if(t=e.body,!t)throw Error(c(454));return t;default:throw Error(c(451))}}function xa(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);mu(t)}var Ne=new Map,qd=new Set;function ki(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=V.d;V.d={f:dg,r:hg,D:mg,C:gg,L:yg,m:pg,X:bg,S:vg,M:Sg};function dg(){var t=tn.f(),e=zi();return t||e}function hg(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?ef(e):tn.r(t)}var zl=typeof document>"u"?null:document;function kd(t,e,n){var l=zl;if(l&&typeof e=="string"&&e){var a=ve(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),qd.has(a)||(qd.add(a),t={rel:t,crossOrigin:n,href:e},l.querySelector(a)===null&&(e=l.createElement("link"),Wt(e,"link",t),Vt(e),l.head.appendChild(e)))}}function mg(t){tn.D(t),kd("dns-prefetch",t,null)}function gg(t,e){tn.C(t,e),kd("preconnect",t,e)}function yg(t,e,n){tn.L(t,e,n);var l=zl;if(l&&t&&e){var a='link[rel="preload"][as="'+ve(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+ve(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+ve(n.imageSizes)+'"]')):a+='[href="'+ve(t)+'"]';var i=a;switch(e){case"style":i=Dl(t);break;case"script":i=Ol(t)}Ne.has(i)||(t=D({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ne.set(i,t),l.querySelector(a)!==null||e==="style"&&l.querySelector(Aa(i))||e==="script"&&l.querySelector(Na(i))||(e=l.createElement("link"),Wt(e,"link",t),Vt(e),l.head.appendChild(e)))}}function pg(t,e){tn.m(t,e);var n=zl;if(n&&t){var l=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+ve(l)+'"][href="'+ve(t)+'"]',i=a;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ol(t)}if(!Ne.has(i)&&(t=D({rel:"modulepreload",href:t},e),Ne.set(i,t),n.querySelector(a)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Na(i)))return}l=n.createElement("link"),Wt(l,"link",t),Vt(l),n.head.appendChild(l)}}}function vg(t,e,n){tn.S(t,e,n);var l=zl;if(l&&t){var a=tl(l).hoistableStyles,i=Dl(t);e=e||"default";var u=a.get(i);if(!u){var r={loading:0,preload:null};if(u=l.querySelector(Aa(i)))r.loading=5;else{t=D({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ne.get(i))&&mo(t,n);var g=u=l.createElement("link");Vt(g),Wt(g,"link",t),g._p=new Promise(function(x,_){g.onload=x,g.onerror=_}),g.addEventListener("load",function(){r.loading|=1}),g.addEventListener("error",function(){r.loading|=2}),r.loading|=4,Gi(u,e,l)}u={type:"stylesheet",instance:u,count:1,state:r},a.set(i,u)}}}function bg(t,e){tn.X(t,e);var n=zl;if(n&&t){var l=tl(n).hoistableScripts,a=Ol(t),i=l.get(a);i||(i=n.querySelector(Na(a)),i||(t=D({src:t,async:!0},e),(e=Ne.get(a))&&go(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function Sg(t,e){tn.M(t,e);var n=zl;if(n&&t){var l=tl(n).hoistableScripts,a=Ol(t),i=l.get(a);i||(i=n.querySelector(Na(a)),i||(t=D({src:t,async:!0,type:"module"},e),(e=Ne.get(a))&&go(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function Gd(t,e,n,l){var a=(a=ft.current)?ki(a):null;if(!a)throw Error(c(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Dl(n.href),n=tl(a).hoistableStyles,l=n.get(e),l||(l={type:"style",instance:null,count:0,state:null},n.set(e,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Dl(n.href);var i=tl(a).hoistableStyles,u=i.get(t);if(u||(a=a.ownerDocument||a,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=a.querySelector(Aa(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ne.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ne.set(t,n),i||Eg(a,t,n,u.state))),e&&l===null)throw Error(c(528,""));return u}if(e&&l!==null)throw Error(c(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ol(n),n=tl(a).hoistableScripts,l=n.get(e),l||(l={type:"script",instance:null,count:0,state:null},n.set(e,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,t))}}function Dl(t){return'href="'+ve(t)+'"'}function Aa(t){return'link[rel="stylesheet"]['+t+"]"}function Yd(t){return D({},t,{"data-precedence":t.precedence,precedence:null})}function Eg(t,e,n,l){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?l.loading=1:(e=t.createElement("link"),l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2}),Wt(e,"link",n),Vt(e),t.head.appendChild(e))}function Ol(t){return'[src="'+ve(t)+'"]'}function Na(t){return"script[async]"+t}function Qd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+ve(n.href)+'"]');if(l)return e.instance=l,Vt(l),l;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),Vt(l),Wt(l,"style",a),Gi(l,n.precedence,t),e.instance=l;case"stylesheet":a=Dl(n.href);var i=t.querySelector(Aa(a));if(i)return e.state.loading|=4,e.instance=i,Vt(i),i;l=Yd(n),(a=Ne.get(a))&&mo(l,a),i=(t.ownerDocument||t).createElement("link"),Vt(i);var u=i;return u._p=new Promise(function(r,g){u.onload=r,u.onerror=g}),Wt(i,"link",l),e.state.loading|=4,Gi(i,n.precedence,t),e.instance=i;case"script":return i=Ol(n.src),(a=t.querySelector(Na(i)))?(e.instance=a,Vt(a),a):(l=n,(a=Ne.get(i))&&(l=D({},n),go(l,a)),t=t.ownerDocument||t,a=t.createElement("script"),Vt(a),Wt(a,"link",l),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(c(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,Gi(l,n.precedence,t));return e.instance}function Gi(t,e,n){for(var l=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=l.length?l[l.length-1]:null,i=a,u=0;u<l.length;u++){var r=l[u];if(r.dataset.precedence===e)i=r;else if(i!==a)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function mo(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function go(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Yi=null;function Xd(t,e,n){if(Yi===null){var l=new Map,a=Yi=new Map;a.set(n,l)}else a=Yi,l=a.get(n),l||(l=new Map,a.set(n,l));if(l.has(t))return l;for(l.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var i=n[a];if(!(i[Yl]||i[Kt]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var r=l.get(u);r?r.push(i):l.set(u,[i])}}return l}function Vd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function wg(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Zd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Tg(t,e,n,l){if(n.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var a=Dl(l.href),i=e.querySelector(Aa(a));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Qi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Vt(i);return}i=e.ownerDocument||e,l=Yd(l),(a=Ne.get(a))&&mo(l,a),i=i.createElement("link"),Vt(i);var u=i;u._p=new Promise(function(r,g){u.onload=r,u.onerror=g}),Wt(i,"link",l),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Qi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var yo=0;function xg(t,e){return t.stylesheets&&t.count===0&&Vi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var l=setTimeout(function(){if(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&yo===0&&(yo=62500*ag());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>yo?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(a)}}:null}function Qi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Vi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Xi=null;function Vi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Xi=new Map,e.forEach(Ag,t),Xi=null,Qi.call(t))}function Ag(t,e){if(!(e.state.loading&4)){var n=Xi.get(t);if(n)var l=n.get(null);else{n=new Map,Xi.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var u=a[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),l=u)}l&&n.set(null,l)}a=e.instance,u=a.getAttribute("data-precedence"),i=n.get(u)||l,i===l&&n.set(null,a),n.set(u,a),this.count++,l=Qi.bind(this),a.addEventListener("load",l),a.addEventListener("error",l),i?i.parentNode.insertBefore(a,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Ca={$$typeof:k,Provider:null,Consumer:null,_currentValue:nt,_currentValue2:nt,_threadCount:0};function Ng(t,e,n,l,a,i,u,r,g){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=su(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=su(0),this.hiddenUpdates=su(null),this.identifierPrefix=l,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=g,this.incompleteTransitions=new Map}function Kd(t,e,n,l,a,i,u,r,g,x,_,M){return t=new Ng(t,e,n,u,g,x,_,M,r),e=1,i===!0&&(e|=24),i=fe(3,null,null,e),t.current=i,i.stateNode=t,e=Ju(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:l,isDehydrated:n,cache:e},$u(i),t}function Jd(t){return t?(t=sl,t):sl}function Fd(t,e,n,l,a,i){a=Jd(a),l.context===null?l.context=a:l.pendingContext=a,l=fn(e),l.payload={element:n},i=i===void 0?null:i,i!==null&&(l.callback=i),n=dn(t,l,e),n!==null&&(ue(n,t,e),ia(n,t,e))}function Id(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function po(t,e){Id(t,e),(t=t.alternate)&&Id(t,e)}function Wd(t){if(t.tag===13||t.tag===31){var e=Un(t,67108864);e!==null&&ue(e,t,67108864),po(t,67108864)}}function $d(t){if(t.tag===13||t.tag===31){var e=ye();e=fu(e);var n=Un(t,e);n!==null&&ue(n,t,e),po(t,e)}}var Zi=!0;function Cg(t,e,n,l){var a=C.T;C.T=null;var i=V.p;try{V.p=2,vo(t,e,n,l)}finally{V.p=i,C.T=a}}function _g(t,e,n,l){var a=C.T;C.T=null;var i=V.p;try{V.p=8,vo(t,e,n,l)}finally{V.p=i,C.T=a}}function vo(t,e,n,l){if(Zi){var a=bo(l);if(a===null)lo(t,e,l,Ki,n),th(t,l);else if(Mg(a,t,e,n,l))l.stopPropagation();else if(th(t,l),e&4&&-1<Rg.indexOf(t)){for(;a!==null;){var i=Pn(a);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Mn(i.pendingLanes);if(u!==0){var r=i;for(r.pendingLanes|=2,r.entangledLanes|=2;u;){var g=1<<31-re(u);r.entanglements[1]|=g,u&=~g}Be(i),(wt&6)===0&&(Ri=ce()+500,Ea(0))}}break;case 31:case 13:r=Un(i,2),r!==null&&ue(r,i,2),zi(),po(i,2)}if(i=bo(l),i===null&&lo(t,e,l,Ki,n),i===a)break;a=i}a!==null&&l.stopPropagation()}else lo(t,e,l,null,n)}}function bo(t){return t=Su(t),So(t)}var Ki=null;function So(t){if(Ki=null,t=$n(t),t!==null){var e=d(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=v(e),t!==null)return t;t=null}else if(n===31){if(t=w(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ki=t,null}function Pd(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(m0()){case ur:return 2;case cr:return 8;case Ha:case g0:return 32;case or:return 268435456;default:return 32}default:return 32}}var Eo=!1,Tn=null,xn=null,An=null,_a=new Map,Ra=new Map,Nn=[],Rg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function th(t,e){switch(t){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":xn=null;break;case"mouseover":case"mouseout":An=null;break;case"pointerover":case"pointerout":_a.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ra.delete(e.pointerId)}}function Ma(t,e,n,l,a,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:l,nativeEvent:i,targetContainers:[a]},e!==null&&(e=Pn(e),e!==null&&Wd(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function Mg(t,e,n,l,a){switch(e){case"focusin":return Tn=Ma(Tn,t,e,n,l,a),!0;case"dragenter":return xn=Ma(xn,t,e,n,l,a),!0;case"mouseover":return An=Ma(An,t,e,n,l,a),!0;case"pointerover":var i=a.pointerId;return _a.set(i,Ma(_a.get(i)||null,t,e,n,l,a)),!0;case"gotpointercapture":return i=a.pointerId,Ra.set(i,Ma(Ra.get(i)||null,t,e,n,l,a)),!0}return!1}function eh(t){var e=$n(t.target);if(e!==null){var n=d(e);if(n!==null){if(e=n.tag,e===13){if(e=v(n),e!==null){t.blockedOn=e,mr(t.priority,function(){$d(n)});return}}else if(e===31){if(e=w(n),e!==null){t.blockedOn=e,mr(t.priority,function(){$d(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ji(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=bo(t.nativeEvent);if(n===null){n=t.nativeEvent;var l=new n.constructor(n.type,n);bu=l,n.target.dispatchEvent(l),bu=null}else return e=Pn(n),e!==null&&Wd(e),t.blockedOn=n,!1;e.shift()}return!0}function nh(t,e,n){Ji(t)&&n.delete(e)}function zg(){Eo=!1,Tn!==null&&Ji(Tn)&&(Tn=null),xn!==null&&Ji(xn)&&(xn=null),An!==null&&Ji(An)&&(An=null),_a.forEach(nh),Ra.forEach(nh)}function Fi(t,e){t.blockedOn===e&&(t.blockedOn=null,Eo||(Eo=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,zg)))}var Ii=null;function lh(t){Ii!==t&&(Ii=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Ii===t&&(Ii=null);for(var e=0;e<t.length;e+=3){var n=t[e],l=t[e+1],a=t[e+2];if(typeof l!="function"){if(So(l||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,vc(i,{pending:!0,data:a,method:n.method,action:l},l,a))}}))}function Bl(t){function e(g){return Fi(g,t)}Tn!==null&&Fi(Tn,t),xn!==null&&Fi(xn,t),An!==null&&Fi(An,t),_a.forEach(e),Ra.forEach(e);for(var n=0;n<Nn.length;n++){var l=Nn[n];l.blockedOn===t&&(l.blockedOn=null)}for(;0<Nn.length&&(n=Nn[0],n.blockedOn===null);)eh(n),n.blockedOn===null&&Nn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(l=0;l<n.length;l+=3){var a=n[l],i=n[l+1],u=a[te]||null;if(typeof i=="function")u||lh(n);else if(u){var r=null;if(i&&i.hasAttribute("formAction")){if(a=i,u=i[te]||null)r=u.formAction;else if(So(a)!==null)continue}else r=u.action;typeof r=="function"?n[l+1]=r:(n.splice(l,3),l-=3),lh(n)}}}function ah(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return a=u})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),l||setTimeout(n,20)}function n(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function wo(t){this._internalRoot=t}Wi.prototype.render=wo.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(c(409));var n=e.current,l=ye();Fd(n,l,t,e,null,null)},Wi.prototype.unmount=wo.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Fd(t.current,2,null,t,null,null),zi(),e[Wn]=null}};function Wi(t){this._internalRoot=t}Wi.prototype.unstable_scheduleHydration=function(t){if(t){var e=hr();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Nn.length&&e!==0&&e<Nn[n].priority;n++);Nn.splice(n,0,t),n===0&&eh(t)}};var ih=f.version;if(ih!=="19.2.6")throw Error(c(527,ih,"19.2.6"));V.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(c(188)):(t=Object.keys(t).join(","),Error(c(268,t)));return t=b(e),t=t!==null?B(t):null,t=t===null?null:t.stateNode,t};var Dg={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:C,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $i=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$i.isDisabled&&$i.supportsFiber)try{ql=$i.inject(Dg),oe=$i}catch{}}return Da.createRoot=function(t,e){if(!s(t))throw Error(c(299));var n=!1,l="",a=df,i=hf,u=mf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=Kd(t,1,!1,null,null,n,l,null,a,i,u,ah),t[Wn]=e.current,no(t),new wo(e)},Da.hydrateRoot=function(t,e,n){if(!s(t))throw Error(c(299));var l=!1,a="",i=df,u=hf,r=mf,g=null;return n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(r=n.onRecoverableError),n.formState!==void 0&&(g=n.formState)),e=Kd(t,1,!0,e,n??null,l,a,g,i,u,r,ah),e.context=Jd(null),n=e.current,l=ye(),l=fu(l),a=fn(l),a.callback=null,dn(n,a,l),n=l,e.current.lanes=n,Gl(e,n),Be(e),t[Wn]=e.current,no(t),new Wi(e)},Da.version="19.2.6",Da}var gh;function Qg(){if(gh)return Ao.exports;gh=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(f){console.error(f)}}return o(),Ao.exports=Yg(),Ao.exports}var Xg=Qg();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vg=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),t0=(...o)=>o.filter((f,h,c)=>!!f&&f.trim()!==""&&c.indexOf(f)===h).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Zg={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kg=pt.forwardRef(({color:o="currentColor",size:f=24,strokeWidth:h=2,absoluteStrokeWidth:c,className:s="",children:d,iconNode:v,...w},m)=>pt.createElement("svg",{ref:m,...Zg,width:f,height:f,stroke:o,strokeWidth:c?Number(h)*24/Number(f):h,className:t0("lucide",s),...w},[...v.map(([b,B])=>pt.createElement(b,B)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=(o,f)=>{const h=pt.forwardRef(({className:c,...s},d)=>pt.createElement(Kg,{ref:d,iconNode:f,className:t0(`lucide-${Vg(o)}`,c),...s}));return h.displayName=`${o}`,h};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jg=Ce("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lu=Ce("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=Ce("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fg=Ce("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=Ce("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ig=Ce("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wg=Ce("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yh=Ce("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $g=Ce("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pg=Ce("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t1=Ce("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=Ce("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function nu({group:o,size:f="md",dim:h}){const c=f==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return S.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${o.bgClass} ${o.textClass} ${c} ${h?"opacity-40":""}`,children:o.label})}function en(o){const[f,h]=o.split(":").map(Number);return f*60+h}const e1=30;function n1(o,f){let h=-1;for(let w=0;w<o.length&&en(o[w])<=f;w++)h=w;if(h===-1)return{index:-1,progress:0};const c=en(o[h]),s=o[h+1]?en(o[h+1]):null,d=s!==null?s:c+e1;if(f>=d)return{index:-1,progress:0};const v=d===c?0:(f-c)/(d-c);return{index:h,progress:Math.max(0,Math.min(1,v))}}function a0(o){const[f,h]=o.split(":").map(Number);return`${f%12||12}:${h.toString().padStart(2,"0")}`}function i0(o){const[f]=o.split(":").map(Number);return f>=12?"PM":"AM"}function nr(){const o=new Date;return o.getHours()*60+o.getMinutes()}function Ba(){const o=new Date,f=o.getFullYear(),h=String(o.getMonth()+1).padStart(2,"0"),c=String(o.getDate()).padStart(2,"0");return`${f}-${h}-${c}`}function l1(){const o=new Date,f=o.getHours(),h=o.getMinutes(),c=f%12||12,s=f>=12?"PM":"AM";return`${c}:${h.toString().padStart(2,"0")} ${s}`}function a1(o){if(o<=0)return"";if(o<60)return`${o} min`;const f=Math.floor(o/60),h=o%60;return h===0?`${f}h`:`${f}h ${h}m`}function i1(o){const f=new Date(o);if(isNaN(f.getTime()))return o;const h=f.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),c=f.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${h}, ${c}`}function ph(o,f){return o.flatMap(h=>{const c=f.find(s=>s.id===h);return c?[c]:[]})}function u1({event:o,runGroups:f,past:h}){const c=ph(o.onTrack,f),s=ph(o.inClass??[],f);return S.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${h?"opacity-60":""}`,children:S.jsxs("div",{className:"flex gap-4",children:[S.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[a0(o.time),S.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:i0(o.time)})]}),S.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[c.length>0&&S.jsxs("div",{className:"flex items-center gap-3",children:[S.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),S.jsx("div",{className:"flex flex-wrap gap-1.5",children:c.map(d=>S.jsx(nu,{group:d},d.id))})]}),s.length>0&&S.jsxs(S.Fragment,{children:[c.length>0&&S.jsx("div",{className:"border-t border-gray-100"}),S.jsxs("div",{className:"flex items-center gap-3",children:[S.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),S.jsx("div",{className:"flex flex-wrap gap-1.5",children:s.map(d=>S.jsx(nu,{group:d},d.id))})]})]}),o.note&&S.jsx("p",{className:"text-xs italic text-gray-500",children:o.note})]})]})})}function c1({event:o,past:f}){const h=o.type==="lunch"||o.type==="special";return S.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${h?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${f?"opacity-60":""}`,children:S.jsxs("div",{className:"flex items-center gap-4",children:[S.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[a0(o.time),S.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:i0(o.time)})]}),h&&S.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:o.type==="lunch"?S.jsx(t1,{size:16}):S.jsx($g,{size:16})}),S.jsxs("div",{children:[S.jsx("p",{className:"text-sm font-medium text-gray-900",children:o.label}),o.subtitle&&S.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:o.subtitle})]})]})})}const Po=pt.forwardRef(({events:o},f)=>{const[,h]=pt.useState(0);pt.useEffect(()=>{const m=setInterval(()=>h(b=>b+1),3e4);return()=>clearInterval(m)},[]);const c=nr(),d=o.filter(m=>"time"in m).find(m=>en(m.time)>c),v=d?en(d.time)-c:null,w=v!==null?v<=5?"text-red-500":v<=10?"text-orange-500":"text-gray-400":"text-gray-400";return S.jsxs("div",{ref:f,"data-time-indicator":!0,className:"relative my-6",children:[S.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[S.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),S.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),S.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:l1()}),v!==null&&S.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${w}`,children:["Next event starts in ",S.jsx("span",{className:"font-semibold",children:a1(v)})]})]})});Po.displayName="TimeIndicator";function vh({collapsed:o,children:f}){return S.jsx("div",{"data-collapsed":o,"aria-hidden":o,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:o?"0fr":"1fr",opacity:o?0:1,marginBottom:o?0:"0.5rem"},children:S.jsx("div",{className:"overflow-hidden",children:f})})}function o1({events:o,runGroups:f,isToday:h,selectedGroups:c,hidePast:s}){const d=pt.useRef(null),[,v]=pt.useState(0);pt.useEffect(()=>{if(!h)return;const q=setInterval(()=>v(k=>k+1),6e4);return()=>clearInterval(q)},[h]),pt.useEffect(()=>{if(!h)return;const q=setTimeout(()=>{var k;(k=d.current)==null||k.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(q)},[h]);const w=nr(),m=o.flatMap(q=>{if(q.type!=="session")return[q];if(c.length===0)return[q];const k=q.onTrack.filter(st=>c.includes(st)),K=(q.inClass??[]).filter(st=>c.includes(st));return k.length===0&&K.length===0?[]:[{...q,onTrack:k,inClass:K}]}),b=m.map(q=>q.type!=="break"&&s&&h&&en(q.time)<w);m.forEach((q,k)=>{if(q.type!=="break")return;const K=m.slice(0,k).some((st,Q)=>st.type!=="break"&&!b[Q]);b[k]=!K});const B=[],D=[];m.forEach((q,k)=>{q.type!=="break"&&(B.push(k),D.push(q.time))});const{index:U}=h?n1(D,w):{index:-1},H=U===-1?-1:B[U],O=h?m.findIndex(q=>q.type!=="break"&&en(q.time)>w):-1,G=h&&O===-1&&m.length>0,it=m.length>0&&b.every(Boolean);let Z;return S.jsxs("div",{className:"flex flex-col pb-10",children:[m.length>0&&S.jsx(vh,{collapsed:!it,children:S.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[S.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),S.jsx("p",{className:"text-xs text-gray-400",children:"Every event on today's schedule has already happened."})]})}),m.map((q,k)=>{const K=k===H,st=h&&q.type!=="break"&&!K&&en(q.time)<w;let Q=null;!b[k]&&q.type==="session"&&q.sessionNumber!==void 0&&q.sessionNumber!==Z&&(Z=q.sessionNumber,Q=S.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",q.sessionNumber]}));const L=q.type==="break"?S.jsxs("div",{className:"flex items-center gap-2 py-1",children:[S.jsx("div",{className:"h-px flex-1 bg-gray-200"}),S.jsx("span",{className:"text-xs text-gray-400 italic",children:q.label}),S.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):q.type==="session"?S.jsx(u1,{event:q,runGroups:f,past:st}):S.jsx(c1,{event:q,past:st});return S.jsxs(vh,{collapsed:b[k],children:[k===O&&S.jsx(Po,{ref:d,events:m}),Q,L]},k)}),G&&S.jsx(Po,{ref:d,events:m})]})}function r1({groups:o,selected:f,onChange:h}){const[c,s]=pt.useState(!1),d=m=>h(f.includes(m)?f.filter(b=>b!==m):[...f,m]),v=f.length===0||f.length===o.length,w=o.filter(m=>f.includes(m.id));return S.jsxs("div",{className:"relative",children:[S.jsxs("button",{onClick:()=>s(m=>!m),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[v?S.jsx("span",{className:"text-gray-700",children:"All run groups"}):S.jsx("div",{className:"flex items-center gap-1",children:w.map(m=>S.jsx(nu,{group:m,size:"sm"},m.id))}),S.jsx(e0,{size:14,className:"text-gray-400"})]}),c&&S.jsxs(S.Fragment,{children:[S.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>s(!1)}),S.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[o.map(m=>S.jsxs("button",{onClick:()=>d(m.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[S.jsx(nu,{group:m,size:"md"}),f.includes(m.id)&&S.jsx(lu,{size:14,className:"text-blue-500"})]},m.id)),S.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:S.jsx("button",{onClick:()=>{h([]),s(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:v?"All selected":"Clear filter"})})]})]})]})}function bh(o){const f=Ba();return o.days.some(h=>h.date===f)}function Sh(){return S.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[S.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function s1({events:o,active:f,onChange:h,onOpenDetails:c}){const[s,d]=pt.useState(!1);return S.jsxs("div",{className:"relative min-w-0 pl-1",children:[S.jsxs("button",{onClick:()=>d(v=>!v),className:"flex items-center gap-1 text-left group min-w-0",children:[S.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:f.name}),bh(f)&&S.jsx(Sh,{}),S.jsx(e0,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),S.jsxs("div",{className:"flex items-center gap-0.5",children:[S.jsx("p",{className:"text-sm text-gray-500",children:f.subtitle}),S.jsx("button",{onClick:c,"aria-label":"Event details",className:"inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900",children:S.jsx(Wg,{size:14})})]}),s&&S.jsxs(S.Fragment,{children:[S.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>d(!1)}),S.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:o.map(v=>S.jsxs("button",{onClick:()=>{h(v),d(!1)},className:"flex w-full items-center justify-between rounded-lg px-4 py-2.5 hover:bg-gray-50 text-left",children:[S.jsxs("div",{children:[S.jsxs("div",{className:"flex items-center gap-1.5",children:[S.jsx("span",{className:"text-sm font-semibold text-gray-900",children:v.name}),bh(v)&&S.jsx(Sh,{})]}),S.jsx("div",{className:"text-xs text-gray-400",children:v.subtitle})]}),v.id===f.id&&S.jsx(lu,{size:14,className:"text-blue-500 ml-3 shrink-0"})]},v.id))})]})]})}function f1({checked:o,onChange:f,label:h}){return S.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[h&&S.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:h}),S.jsx("button",{type:"button",role:"switch","aria-checked":o,onClick:f,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:o?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:S.jsx("span",{style:{position:"absolute",top:"2px",left:o?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Jn=72,d1=110;function h1({children:o}){const[f,h]=pt.useState(0),[c,s]=pt.useState("idle"),d=pt.useRef(null),v=pt.useRef(0);pt.useEffect(()=>{const B=H=>{window.scrollY===0&&(d.current=H.touches[0].clientY)},D=H=>{if(d.current===null)return;const O=H.touches[0].clientY-d.current;if(O<=0){d.current=null;return}H.preventDefault();const G=O<Jn?O:Jn+(O-Jn)*.25;v.current=Math.min(G,d1),h(v.current),s("pulling")},U=()=>{d.current!==null&&(d.current=null,v.current>=Jn?(s("refreshing"),h(Jn*.75),setTimeout(()=>window.location.reload(),600)):(s("releasing"),h(0),v.current=0,setTimeout(()=>s("idle"),250)))};return document.addEventListener("touchstart",B,{passive:!0}),document.addEventListener("touchmove",D,{passive:!1}),document.addEventListener("touchend",U),document.addEventListener("touchcancel",U),()=>{document.removeEventListener("touchstart",B),document.removeEventListener("touchmove",D),document.removeEventListener("touchend",U),document.removeEventListener("touchcancel",U)}},[]);const w=c==="releasing"||c==="refreshing",m=Math.min(f/Jn,1),b=f>=Jn;return S.jsxs(S.Fragment,{children:[S.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${f}px)`,transition:w?"transform 0.25s ease":"none"},children:S.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${b?"text-blue-500":"text-gray-400"}`,children:S.jsx(Pg,{size:16,className:c==="refreshing"?"animate-spin":"",style:c!=="refreshing"?{transform:`rotate(${m*270}deg)`}:void 0})})}),S.jsx("div",{style:{transform:`translateY(${f}px)`,transition:w?"transform 0.25s ease":"none"},children:o})]})}function m1({groups:o}){const f=o.filter(h=>h.description);return f.length===0?null:S.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[S.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),S.jsx("ul",{className:"flex flex-col gap-1.5",children:f.map(h=>S.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[S.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${h.bgClass}`,"aria-hidden":"true"}),S.jsx("span",{className:"font-medium text-gray-900",children:h.label}),S.jsx("span",{className:"text-gray-400",children:"·"}),S.jsx("span",{children:h.description})]},h.id))})]})}const Eh=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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
`;function g1(){const[o,f]=pt.useState(!1);pt.useEffect(()=>{window.scrollTo(0,0)},[]);async function h(){await navigator.clipboard.writeText(Eh),f(!0),setTimeout(()=>f(!1),2e3)}return S.jsx("div",{className:"min-h-screen bg-gray-50",children:S.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[S.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[S.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),S.jsxs("div",{className:"flex items-center gap-2",children:[S.jsxs("button",{onClick:h,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[o?S.jsx(lu,{size:16,className:"text-green-600"}):S.jsx(n0,{size:16}),o?"Copied":"Copy"]}),S.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:S.jsx(l0,{size:18})})]})]}),S.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",S.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),S.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:S.jsx("code",{children:Eh})})]})})}var Ul={},Ro,wh;function y1(){return wh||(wh=1,Ro=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Ro}var Mo={},_n={},Th;function Fn(){if(Th)return _n;Th=1;let o;const f=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(c){if(!c)throw new Error('"version" cannot be null or undefined');if(c<1||c>40)throw new Error('"version" should be in range from 1 to 40');return c*4+17},_n.getSymbolTotalCodewords=function(c){return f[c]},_n.getBCHDigit=function(h){let c=0;for(;h!==0;)c++,h>>>=1;return c},_n.setToSJISFunction=function(c){if(typeof c!="function")throw new Error('"toSJISFunc" is not a valid function.');o=c},_n.isKanjiModeEnabled=function(){return typeof o<"u"},_n.toSJIS=function(c){return o(c)},_n}var zo={},xh;function lr(){return xh||(xh=1,(function(o){o.L={bit:1},o.M={bit:0},o.Q={bit:3},o.H={bit:2};function f(h){if(typeof h!="string")throw new Error("Param is not a string");switch(h.toLowerCase()){case"l":case"low":return o.L;case"m":case"medium":return o.M;case"q":case"quartile":return o.Q;case"h":case"high":return o.H;default:throw new Error("Unknown EC Level: "+h)}}o.isValid=function(c){return c&&typeof c.bit<"u"&&c.bit>=0&&c.bit<4},o.from=function(c,s){if(o.isValid(c))return c;try{return f(c)}catch{return s}}})(zo)),zo}var Do,Ah;function p1(){if(Ah)return Do;Ah=1;function o(){this.buffer=[],this.length=0}return o.prototype={get:function(f){const h=Math.floor(f/8);return(this.buffer[h]>>>7-f%8&1)===1},put:function(f,h){for(let c=0;c<h;c++)this.putBit((f>>>h-c-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(f){const h=Math.floor(this.length/8);this.buffer.length<=h&&this.buffer.push(0),f&&(this.buffer[h]|=128>>>this.length%8),this.length++}},Do=o,Do}var Oo,Nh;function v1(){if(Nh)return Oo;Nh=1;function o(f){if(!f||f<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=f,this.data=new Uint8Array(f*f),this.reservedBit=new Uint8Array(f*f)}return o.prototype.set=function(f,h,c,s){const d=f*this.size+h;this.data[d]=c,s&&(this.reservedBit[d]=!0)},o.prototype.get=function(f,h){return this.data[f*this.size+h]},o.prototype.xor=function(f,h,c){this.data[f*this.size+h]^=c},o.prototype.isReserved=function(f,h){return this.reservedBit[f*this.size+h]},Oo=o,Oo}var Bo={},Ch;function b1(){return Ch||(Ch=1,(function(o){const f=Fn().getSymbolSize;o.getRowColCoords=function(c){if(c===1)return[];const s=Math.floor(c/7)+2,d=f(c),v=d===145?26:Math.ceil((d-13)/(2*s-2))*2,w=[d-7];for(let m=1;m<s-1;m++)w[m]=w[m-1]-v;return w.push(6),w.reverse()},o.getPositions=function(c){const s=[],d=o.getRowColCoords(c),v=d.length;for(let w=0;w<v;w++)for(let m=0;m<v;m++)w===0&&m===0||w===0&&m===v-1||w===v-1&&m===0||s.push([d[w],d[m]]);return s}})(Bo)),Bo}var Uo={},_h;function S1(){if(_h)return Uo;_h=1;const o=Fn().getSymbolSize,f=7;return Uo.getPositions=function(c){const s=o(c);return[[0,0],[s-f,0],[0,s-f]]},Uo}var Ho={},Rh;function E1(){return Rh||(Rh=1,(function(o){o.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const f={N1:3,N2:3,N3:40,N4:10};o.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},o.from=function(s){return o.isValid(s)?parseInt(s,10):void 0},o.getPenaltyN1=function(s){const d=s.size;let v=0,w=0,m=0,b=null,B=null;for(let D=0;D<d;D++){w=m=0,b=B=null;for(let U=0;U<d;U++){let H=s.get(D,U);H===b?w++:(w>=5&&(v+=f.N1+(w-5)),b=H,w=1),H=s.get(U,D),H===B?m++:(m>=5&&(v+=f.N1+(m-5)),B=H,m=1)}w>=5&&(v+=f.N1+(w-5)),m>=5&&(v+=f.N1+(m-5))}return v},o.getPenaltyN2=function(s){const d=s.size;let v=0;for(let w=0;w<d-1;w++)for(let m=0;m<d-1;m++){const b=s.get(w,m)+s.get(w,m+1)+s.get(w+1,m)+s.get(w+1,m+1);(b===4||b===0)&&v++}return v*f.N2},o.getPenaltyN3=function(s){const d=s.size;let v=0,w=0,m=0;for(let b=0;b<d;b++){w=m=0;for(let B=0;B<d;B++)w=w<<1&2047|s.get(b,B),B>=10&&(w===1488||w===93)&&v++,m=m<<1&2047|s.get(B,b),B>=10&&(m===1488||m===93)&&v++}return v*f.N3},o.getPenaltyN4=function(s){let d=0;const v=s.data.length;for(let m=0;m<v;m++)d+=s.data[m];return Math.abs(Math.ceil(d*100/v/5)-10)*f.N4};function h(c,s,d){switch(c){case o.Patterns.PATTERN000:return(s+d)%2===0;case o.Patterns.PATTERN001:return s%2===0;case o.Patterns.PATTERN010:return d%3===0;case o.Patterns.PATTERN011:return(s+d)%3===0;case o.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(d/3))%2===0;case o.Patterns.PATTERN101:return s*d%2+s*d%3===0;case o.Patterns.PATTERN110:return(s*d%2+s*d%3)%2===0;case o.Patterns.PATTERN111:return(s*d%3+(s+d)%2)%2===0;default:throw new Error("bad maskPattern:"+c)}}o.applyMask=function(s,d){const v=d.size;for(let w=0;w<v;w++)for(let m=0;m<v;m++)d.isReserved(m,w)||d.xor(m,w,h(s,m,w))},o.getBestMask=function(s,d){const v=Object.keys(o.Patterns).length;let w=0,m=1/0;for(let b=0;b<v;b++){d(b),o.applyMask(b,s);const B=o.getPenaltyN1(s)+o.getPenaltyN2(s)+o.getPenaltyN3(s)+o.getPenaltyN4(s);o.applyMask(b,s),B<m&&(m=B,w=b)}return w}})(Ho)),Ho}var Pi={},Mh;function u0(){if(Mh)return Pi;Mh=1;const o=lr(),f=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],h=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Pi.getBlocksCount=function(s,d){switch(d){case o.L:return f[(s-1)*4+0];case o.M:return f[(s-1)*4+1];case o.Q:return f[(s-1)*4+2];case o.H:return f[(s-1)*4+3];default:return}},Pi.getTotalCodewordsCount=function(s,d){switch(d){case o.L:return h[(s-1)*4+0];case o.M:return h[(s-1)*4+1];case o.Q:return h[(s-1)*4+2];case o.H:return h[(s-1)*4+3];default:return}},Pi}var jo={},Oa={},zh;function w1(){if(zh)return Oa;zh=1;const o=new Uint8Array(512),f=new Uint8Array(256);return(function(){let c=1;for(let s=0;s<255;s++)o[s]=c,f[c]=s,c<<=1,c&256&&(c^=285);for(let s=255;s<512;s++)o[s]=o[s-255]})(),Oa.log=function(c){if(c<1)throw new Error("log("+c+")");return f[c]},Oa.exp=function(c){return o[c]},Oa.mul=function(c,s){return c===0||s===0?0:o[f[c]+f[s]]},Oa}var Dh;function T1(){return Dh||(Dh=1,(function(o){const f=w1();o.mul=function(c,s){const d=new Uint8Array(c.length+s.length-1);for(let v=0;v<c.length;v++)for(let w=0;w<s.length;w++)d[v+w]^=f.mul(c[v],s[w]);return d},o.mod=function(c,s){let d=new Uint8Array(c);for(;d.length-s.length>=0;){const v=d[0];for(let m=0;m<s.length;m++)d[m]^=f.mul(s[m],v);let w=0;for(;w<d.length&&d[w]===0;)w++;d=d.slice(w)}return d},o.generateECPolynomial=function(c){let s=new Uint8Array([1]);for(let d=0;d<c;d++)s=o.mul(s,new Uint8Array([1,f.exp(d)]));return s}})(jo)),jo}var Lo,Oh;function x1(){if(Oh)return Lo;Oh=1;const o=T1();function f(h){this.genPoly=void 0,this.degree=h,this.degree&&this.initialize(this.degree)}return f.prototype.initialize=function(c){this.degree=c,this.genPoly=o.generateECPolynomial(this.degree)},f.prototype.encode=function(c){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(c.length+this.degree);s.set(c);const d=o.mod(s,this.genPoly),v=this.degree-d.length;if(v>0){const w=new Uint8Array(this.degree);return w.set(d,v),w}return d},Lo=f,Lo}var qo={},ko={},Go={},Bh;function c0(){return Bh||(Bh=1,Go.isValid=function(f){return!isNaN(f)&&f>=1&&f<=40}),Go}var Ue={},Uh;function o0(){if(Uh)return Ue;Uh=1;const o="[0-9]+",f="[A-Z $%*+\\-./:]+";let h="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";h=h.replace(/u/g,"\\u");const c="(?:(?![A-Z0-9 $%*+\\-./:]|"+h+`)(?:.|[\r
]))+`;Ue.KANJI=new RegExp(h,"g"),Ue.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Ue.BYTE=new RegExp(c,"g"),Ue.NUMERIC=new RegExp(o,"g"),Ue.ALPHANUMERIC=new RegExp(f,"g");const s=new RegExp("^"+h+"$"),d=new RegExp("^"+o+"$"),v=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Ue.testKanji=function(m){return s.test(m)},Ue.testNumeric=function(m){return d.test(m)},Ue.testAlphanumeric=function(m){return v.test(m)},Ue}var Hh;function In(){return Hh||(Hh=1,(function(o){const f=c0(),h=o0();o.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},o.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},o.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},o.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},o.MIXED={bit:-1},o.getCharCountIndicator=function(d,v){if(!d.ccBits)throw new Error("Invalid mode: "+d);if(!f.isValid(v))throw new Error("Invalid version: "+v);return v>=1&&v<10?d.ccBits[0]:v<27?d.ccBits[1]:d.ccBits[2]},o.getBestModeForData=function(d){return h.testNumeric(d)?o.NUMERIC:h.testAlphanumeric(d)?o.ALPHANUMERIC:h.testKanji(d)?o.KANJI:o.BYTE},o.toString=function(d){if(d&&d.id)return d.id;throw new Error("Invalid mode")},o.isValid=function(d){return d&&d.bit&&d.ccBits};function c(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return o.NUMERIC;case"alphanumeric":return o.ALPHANUMERIC;case"kanji":return o.KANJI;case"byte":return o.BYTE;default:throw new Error("Unknown mode: "+s)}}o.from=function(d,v){if(o.isValid(d))return d;try{return c(d)}catch{return v}}})(ko)),ko}var jh;function A1(){return jh||(jh=1,(function(o){const f=Fn(),h=u0(),c=lr(),s=In(),d=c0(),v=7973,w=f.getBCHDigit(v);function m(U,H,O){for(let G=1;G<=40;G++)if(H<=o.getCapacity(G,O,U))return G}function b(U,H){return s.getCharCountIndicator(U,H)+4}function B(U,H){let O=0;return U.forEach(function(G){const it=b(G.mode,H);O+=it+G.getBitsLength()}),O}function D(U,H){for(let O=1;O<=40;O++)if(B(U,O)<=o.getCapacity(O,H,s.MIXED))return O}o.from=function(H,O){return d.isValid(H)?parseInt(H,10):O},o.getCapacity=function(H,O,G){if(!d.isValid(H))throw new Error("Invalid QR Code version");typeof G>"u"&&(G=s.BYTE);const it=f.getSymbolTotalCodewords(H),Z=h.getTotalCodewordsCount(H,O),q=(it-Z)*8;if(G===s.MIXED)return q;const k=q-b(G,H);switch(G){case s.NUMERIC:return Math.floor(k/10*3);case s.ALPHANUMERIC:return Math.floor(k/11*2);case s.KANJI:return Math.floor(k/13);case s.BYTE:default:return Math.floor(k/8)}},o.getBestVersionForData=function(H,O){let G;const it=c.from(O,c.M);if(Array.isArray(H)){if(H.length>1)return D(H,it);if(H.length===0)return 1;G=H[0]}else G=H;return m(G.mode,G.getLength(),it)},o.getEncodedBits=function(H){if(!d.isValid(H)||H<7)throw new Error("Invalid QR Code version");let O=H<<12;for(;f.getBCHDigit(O)-w>=0;)O^=v<<f.getBCHDigit(O)-w;return H<<12|O}})(qo)),qo}var Yo={},Lh;function N1(){if(Lh)return Yo;Lh=1;const o=Fn(),f=1335,h=21522,c=o.getBCHDigit(f);return Yo.getEncodedBits=function(d,v){const w=d.bit<<3|v;let m=w<<10;for(;o.getBCHDigit(m)-c>=0;)m^=f<<o.getBCHDigit(m)-c;return(w<<10|m)^h},Yo}var Qo={},Xo,qh;function C1(){if(qh)return Xo;qh=1;const o=In();function f(h){this.mode=o.NUMERIC,this.data=h.toString()}return f.getBitsLength=function(c){return 10*Math.floor(c/3)+(c%3?c%3*3+1:0)},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(c){let s,d,v;for(s=0;s+3<=this.data.length;s+=3)d=this.data.substr(s,3),v=parseInt(d,10),c.put(v,10);const w=this.data.length-s;w>0&&(d=this.data.substr(s),v=parseInt(d,10),c.put(v,w*3+1))},Xo=f,Xo}var Vo,kh;function _1(){if(kh)return Vo;kh=1;const o=In(),f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function h(c){this.mode=o.ALPHANUMERIC,this.data=c}return h.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(s){let d;for(d=0;d+2<=this.data.length;d+=2){let v=f.indexOf(this.data[d])*45;v+=f.indexOf(this.data[d+1]),s.put(v,11)}this.data.length%2&&s.put(f.indexOf(this.data[d]),6)},Vo=h,Vo}var Zo,Gh;function R1(){if(Gh)return Zo;Gh=1;const o=In();function f(h){this.mode=o.BYTE,typeof h=="string"?this.data=new TextEncoder().encode(h):this.data=new Uint8Array(h)}return f.getBitsLength=function(c){return c*8},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(h){for(let c=0,s=this.data.length;c<s;c++)h.put(this.data[c],8)},Zo=f,Zo}var Ko,Yh;function M1(){if(Yh)return Ko;Yh=1;const o=In(),f=Fn();function h(c){this.mode=o.KANJI,this.data=c}return h.getBitsLength=function(s){return s*13},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(c){let s;for(s=0;s<this.data.length;s++){let d=f.toSJIS(this.data[s]);if(d>=33088&&d<=40956)d-=33088;else if(d>=57408&&d<=60351)d-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);d=(d>>>8&255)*192+(d&255),c.put(d,13)}},Ko=h,Ko}var Jo={exports:{}},Qh;function z1(){return Qh||(Qh=1,(function(o){var f={single_source_shortest_paths:function(h,c,s){var d={},v={};v[c]=0;var w=f.PriorityQueue.make();w.push(c,0);for(var m,b,B,D,U,H,O,G,it;!w.empty();){m=w.pop(),b=m.value,D=m.cost,U=h[b]||{};for(B in U)U.hasOwnProperty(B)&&(H=U[B],O=D+H,G=v[B],it=typeof v[B]>"u",(it||G>O)&&(v[B]=O,w.push(B,O),d[B]=b))}if(typeof s<"u"&&typeof v[s]>"u"){var Z=["Could not find a path from ",c," to ",s,"."].join("");throw new Error(Z)}return d},extract_shortest_path_from_predecessor_list:function(h,c){for(var s=[],d=c;d;)s.push(d),h[d],d=h[d];return s.reverse(),s},find_path:function(h,c,s){var d=f.single_source_shortest_paths(h,c,s);return f.extract_shortest_path_from_predecessor_list(d,s)},PriorityQueue:{make:function(h){var c=f.PriorityQueue,s={},d;h=h||{};for(d in c)c.hasOwnProperty(d)&&(s[d]=c[d]);return s.queue=[],s.sorter=h.sorter||c.default_sorter,s},default_sorter:function(h,c){return h.cost-c.cost},push:function(h,c){var s={value:h,cost:c};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};o.exports=f})(Jo)),Jo.exports}var Xh;function D1(){return Xh||(Xh=1,(function(o){const f=In(),h=C1(),c=_1(),s=R1(),d=M1(),v=o0(),w=Fn(),m=z1();function b(Z){return unescape(encodeURIComponent(Z)).length}function B(Z,q,k){const K=[];let st;for(;(st=Z.exec(k))!==null;)K.push({data:st[0],index:st.index,mode:q,length:st[0].length});return K}function D(Z){const q=B(v.NUMERIC,f.NUMERIC,Z),k=B(v.ALPHANUMERIC,f.ALPHANUMERIC,Z);let K,st;return w.isKanjiModeEnabled()?(K=B(v.BYTE,f.BYTE,Z),st=B(v.KANJI,f.KANJI,Z)):(K=B(v.BYTE_KANJI,f.BYTE,Z),st=[]),q.concat(k,K,st).sort(function(L,j){return L.index-j.index}).map(function(L){return{data:L.data,mode:L.mode,length:L.length}})}function U(Z,q){switch(q){case f.NUMERIC:return h.getBitsLength(Z);case f.ALPHANUMERIC:return c.getBitsLength(Z);case f.KANJI:return d.getBitsLength(Z);case f.BYTE:return s.getBitsLength(Z)}}function H(Z){return Z.reduce(function(q,k){const K=q.length-1>=0?q[q.length-1]:null;return K&&K.mode===k.mode?(q[q.length-1].data+=k.data,q):(q.push(k),q)},[])}function O(Z){const q=[];for(let k=0;k<Z.length;k++){const K=Z[k];switch(K.mode){case f.NUMERIC:q.push([K,{data:K.data,mode:f.ALPHANUMERIC,length:K.length},{data:K.data,mode:f.BYTE,length:K.length}]);break;case f.ALPHANUMERIC:q.push([K,{data:K.data,mode:f.BYTE,length:K.length}]);break;case f.KANJI:q.push([K,{data:K.data,mode:f.BYTE,length:b(K.data)}]);break;case f.BYTE:q.push([{data:K.data,mode:f.BYTE,length:b(K.data)}])}}return q}function G(Z,q){const k={},K={start:{}};let st=["start"];for(let Q=0;Q<Z.length;Q++){const L=Z[Q],j=[];for(let X=0;X<L.length;X++){const et=L[X],$=""+Q+X;j.push($),k[$]={node:et,lastCount:0},K[$]={};for(let I=0;I<st.length;I++){const P=st[I];k[P]&&k[P].node.mode===et.mode?(K[P][$]=U(k[P].lastCount+et.length,et.mode)-U(k[P].lastCount,et.mode),k[P].lastCount+=et.length):(k[P]&&(k[P].lastCount=et.length),K[P][$]=U(et.length,et.mode)+4+f.getCharCountIndicator(et.mode,q))}}st=j}for(let Q=0;Q<st.length;Q++)K[st[Q]].end=0;return{map:K,table:k}}function it(Z,q){let k;const K=f.getBestModeForData(Z);if(k=f.from(q,K),k!==f.BYTE&&k.bit<K.bit)throw new Error('"'+Z+'" cannot be encoded with mode '+f.toString(k)+`.
 Suggested mode is: `+f.toString(K));switch(k===f.KANJI&&!w.isKanjiModeEnabled()&&(k=f.BYTE),k){case f.NUMERIC:return new h(Z);case f.ALPHANUMERIC:return new c(Z);case f.KANJI:return new d(Z);case f.BYTE:return new s(Z)}}o.fromArray=function(q){return q.reduce(function(k,K){return typeof K=="string"?k.push(it(K,null)):K.data&&k.push(it(K.data,K.mode)),k},[])},o.fromString=function(q,k){const K=D(q,w.isKanjiModeEnabled()),st=O(K),Q=G(st,k),L=m.find_path(Q.map,"start","end"),j=[];for(let X=1;X<L.length-1;X++)j.push(Q.table[L[X]].node);return o.fromArray(H(j))},o.rawSplit=function(q){return o.fromArray(D(q,w.isKanjiModeEnabled()))}})(Qo)),Qo}var Vh;function O1(){if(Vh)return Mo;Vh=1;const o=Fn(),f=lr(),h=p1(),c=v1(),s=b1(),d=S1(),v=E1(),w=u0(),m=x1(),b=A1(),B=N1(),D=In(),U=D1();function H(Q,L){const j=Q.size,X=d.getPositions(L);for(let et=0;et<X.length;et++){const $=X[et][0],I=X[et][1];for(let P=-1;P<=7;P++)if(!($+P<=-1||j<=$+P))for(let at=-1;at<=7;at++)I+at<=-1||j<=I+at||(P>=0&&P<=6&&(at===0||at===6)||at>=0&&at<=6&&(P===0||P===6)||P>=2&&P<=4&&at>=2&&at<=4?Q.set($+P,I+at,!0,!0):Q.set($+P,I+at,!1,!0))}}function O(Q){const L=Q.size;for(let j=8;j<L-8;j++){const X=j%2===0;Q.set(j,6,X,!0),Q.set(6,j,X,!0)}}function G(Q,L){const j=s.getPositions(L);for(let X=0;X<j.length;X++){const et=j[X][0],$=j[X][1];for(let I=-2;I<=2;I++)for(let P=-2;P<=2;P++)I===-2||I===2||P===-2||P===2||I===0&&P===0?Q.set(et+I,$+P,!0,!0):Q.set(et+I,$+P,!1,!0)}}function it(Q,L){const j=Q.size,X=b.getEncodedBits(L);let et,$,I;for(let P=0;P<18;P++)et=Math.floor(P/3),$=P%3+j-8-3,I=(X>>P&1)===1,Q.set(et,$,I,!0),Q.set($,et,I,!0)}function Z(Q,L,j){const X=Q.size,et=B.getEncodedBits(L,j);let $,I;for($=0;$<15;$++)I=(et>>$&1)===1,$<6?Q.set($,8,I,!0):$<8?Q.set($+1,8,I,!0):Q.set(X-15+$,8,I,!0),$<8?Q.set(8,X-$-1,I,!0):$<9?Q.set(8,15-$-1+1,I,!0):Q.set(8,15-$-1,I,!0);Q.set(X-8,8,1,!0)}function q(Q,L){const j=Q.size;let X=-1,et=j-1,$=7,I=0;for(let P=j-1;P>0;P-=2)for(P===6&&P--;;){for(let at=0;at<2;at++)if(!Q.isReserved(et,P-at)){let qt=!1;I<L.length&&(qt=(L[I]>>>$&1)===1),Q.set(et,P-at,qt),$--,$===-1&&(I++,$=7)}if(et+=X,et<0||j<=et){et-=X,X=-X;break}}}function k(Q,L,j){const X=new h;j.forEach(function(at){X.put(at.mode.bit,4),X.put(at.getLength(),D.getCharCountIndicator(at.mode,Q)),at.write(X)});const et=o.getSymbolTotalCodewords(Q),$=w.getTotalCodewordsCount(Q,L),I=(et-$)*8;for(X.getLengthInBits()+4<=I&&X.put(0,4);X.getLengthInBits()%8!==0;)X.putBit(0);const P=(I-X.getLengthInBits())/8;for(let at=0;at<P;at++)X.put(at%2?17:236,8);return K(X,Q,L)}function K(Q,L,j){const X=o.getSymbolTotalCodewords(L),et=w.getTotalCodewordsCount(L,j),$=X-et,I=w.getBlocksCount(L,j),P=X%I,at=I-P,qt=Math.floor(X/I),C=Math.floor($/I),V=C+1,nt=qt-C,Tt=new m(nt);let Et=0;const p=new Array(I),z=new Array(I);let Y=0;const F=new Uint8Array(Q.buffer);for(let Nt=0;Nt<I;Nt++){const He=Nt<at?C:V;p[Nt]=F.slice(Et,Et+He),z[Nt]=Tt.encode(p[Nt]),Et+=He,Y=Math.max(Y,He)}const ut=new Uint8Array(X);let ft=0,dt,zt;for(dt=0;dt<Y;dt++)for(zt=0;zt<I;zt++)dt<p[zt].length&&(ut[ft++]=p[zt][dt]);for(dt=0;dt<nt;dt++)for(zt=0;zt<I;zt++)ut[ft++]=z[zt][dt];return ut}function st(Q,L,j,X){let et;if(Array.isArray(Q))et=U.fromArray(Q);else if(typeof Q=="string"){let qt=L;if(!qt){const C=U.rawSplit(Q);qt=b.getBestVersionForData(C,j)}et=U.fromString(Q,qt||40)}else throw new Error("Invalid data");const $=b.getBestVersionForData(et,j);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!L)L=$;else if(L<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const I=k(L,j,et),P=o.getSymbolSize(L),at=new c(P);return H(at,L),O(at),G(at,L),Z(at,j,0),L>=7&&it(at,L),q(at,I),isNaN(X)&&(X=v.getBestMask(at,Z.bind(null,at,j))),v.applyMask(X,at),Z(at,j,X),{modules:at,version:L,errorCorrectionLevel:j,maskPattern:X,segments:et}}return Mo.create=function(L,j){if(typeof L>"u"||L==="")throw new Error("No input text");let X=f.M,et,$;return typeof j<"u"&&(X=f.from(j.errorCorrectionLevel,f.M),et=b.from(j.version),$=v.from(j.maskPattern),j.toSJISFunc&&o.setToSJISFunction(j.toSJISFunc)),st(L,et,X,$)},Mo}var Fo={},Io={},Zh;function r0(){return Zh||(Zh=1,(function(o){function f(h){if(typeof h=="number"&&(h=h.toString()),typeof h!="string")throw new Error("Color should be defined as hex string");let c=h.slice().replace("#","").split("");if(c.length<3||c.length===5||c.length>8)throw new Error("Invalid hex color: "+h);(c.length===3||c.length===4)&&(c=Array.prototype.concat.apply([],c.map(function(d){return[d,d]}))),c.length===6&&c.push("F","F");const s=parseInt(c.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+c.slice(0,6).join("")}}o.getOptions=function(c){c||(c={}),c.color||(c.color={});const s=typeof c.margin>"u"||c.margin===null||c.margin<0?4:c.margin,d=c.width&&c.width>=21?c.width:void 0,v=c.scale||4;return{width:d,scale:d?4:v,margin:s,color:{dark:f(c.color.dark||"#000000ff"),light:f(c.color.light||"#ffffffff")},type:c.type,rendererOpts:c.rendererOpts||{}}},o.getScale=function(c,s){return s.width&&s.width>=c+s.margin*2?s.width/(c+s.margin*2):s.scale},o.getImageWidth=function(c,s){const d=o.getScale(c,s);return Math.floor((c+s.margin*2)*d)},o.qrToImageData=function(c,s,d){const v=s.modules.size,w=s.modules.data,m=o.getScale(v,d),b=Math.floor((v+d.margin*2)*m),B=d.margin*m,D=[d.color.light,d.color.dark];for(let U=0;U<b;U++)for(let H=0;H<b;H++){let O=(U*b+H)*4,G=d.color.light;if(U>=B&&H>=B&&U<b-B&&H<b-B){const it=Math.floor((U-B)/m),Z=Math.floor((H-B)/m);G=D[w[it*v+Z]?1:0]}c[O++]=G.r,c[O++]=G.g,c[O++]=G.b,c[O]=G.a}}})(Io)),Io}var Kh;function B1(){return Kh||(Kh=1,(function(o){const f=r0();function h(s,d,v){s.clearRect(0,0,d.width,d.height),d.style||(d.style={}),d.height=v,d.width=v,d.style.height=v+"px",d.style.width=v+"px"}function c(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}o.render=function(d,v,w){let m=w,b=v;typeof m>"u"&&(!v||!v.getContext)&&(m=v,v=void 0),v||(b=c()),m=f.getOptions(m);const B=f.getImageWidth(d.modules.size,m),D=b.getContext("2d"),U=D.createImageData(B,B);return f.qrToImageData(U.data,d,m),h(D,b,B),D.putImageData(U,0,0),b},o.renderToDataURL=function(d,v,w){let m=w;typeof m>"u"&&(!v||!v.getContext)&&(m=v,v=void 0),m||(m={});const b=o.render(d,v,m),B=m.type||"image/png",D=m.rendererOpts||{};return b.toDataURL(B,D.quality)}})(Fo)),Fo}var Wo={},Jh;function U1(){if(Jh)return Wo;Jh=1;const o=r0();function f(s,d){const v=s.a/255,w=d+'="'+s.hex+'"';return v<1?w+" "+d+'-opacity="'+v.toFixed(2).slice(1)+'"':w}function h(s,d,v){let w=s+d;return typeof v<"u"&&(w+=" "+v),w}function c(s,d,v){let w="",m=0,b=!1,B=0;for(let D=0;D<s.length;D++){const U=Math.floor(D%d),H=Math.floor(D/d);!U&&!b&&(b=!0),s[D]?(B++,D>0&&U>0&&s[D-1]||(w+=b?h("M",U+v,.5+H+v):h("m",m,0),m=0,b=!1),U+1<d&&s[D+1]||(w+=h("h",B),B=0)):m++}return w}return Wo.render=function(d,v,w){const m=o.getOptions(v),b=d.modules.size,B=d.modules.data,D=b+m.margin*2,U=m.color.light.a?"<path "+f(m.color.light,"fill")+' d="M0 0h'+D+"v"+D+'H0z"/>':"",H="<path "+f(m.color.dark,"stroke")+' d="'+c(B,b,m.margin)+'"/>',O='viewBox="0 0 '+D+" "+D+'"',it='<svg xmlns="http://www.w3.org/2000/svg" '+(m.width?'width="'+m.width+'" height="'+m.width+'" ':"")+O+' shape-rendering="crispEdges">'+U+H+`</svg>
`;return typeof w=="function"&&w(null,it),it},Wo}var Fh;function H1(){if(Fh)return Ul;Fh=1;const o=y1(),f=O1(),h=B1(),c=U1();function s(d,v,w,m,b){const B=[].slice.call(arguments,1),D=B.length,U=typeof B[D-1]=="function";if(!U&&!o())throw new Error("Callback required as last argument");if(U){if(D<2)throw new Error("Too few arguments provided");D===2?(b=w,w=v,v=m=void 0):D===3&&(v.getContext&&typeof b>"u"?(b=m,m=void 0):(b=m,m=w,w=v,v=void 0))}else{if(D<1)throw new Error("Too few arguments provided");return D===1?(w=v,v=m=void 0):D===2&&!v.getContext&&(m=w,w=v,v=void 0),new Promise(function(H,O){try{const G=f.create(w,m);H(d(G,v,m))}catch(G){O(G)}})}try{const H=f.create(w,m);b(null,d(H,v,m))}catch(H){b(H)}}return Ul.create=f.create,Ul.toCanvas=s.bind(null,h.render),Ul.toDataURL=s.bind(null,h.renderToDataURL),Ul.toString=s.bind(null,function(d,v,w){return c.render(d,w)}),Ul}var j1=H1();const L1=Bg(j1),$o=`${window.location.origin}/hpde/pr-preview/pr-132/`;function q1(){const[o,f]=pt.useState(!1),[h,c]=pt.useState(null);pt.useEffect(()=>{window.scrollTo(0,0),L1.toDataURL($o,{margin:1,width:240}).then(c).catch(()=>c(null))},[]);async function s(){await navigator.clipboard.writeText($o),f(!0),setTimeout(()=>f(!1),2e3)}return S.jsx("div",{className:"min-h-screen bg-gray-50",children:S.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[S.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[S.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),S.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:S.jsx(l0,{size:18})})]}),S.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),S.jsxs("button",{onClick:s,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[S.jsx("span",{className:"truncate text-sm text-gray-800",children:$o}),o?S.jsx(lu,{size:16,className:"shrink-0 text-green-600"}):S.jsx(n0,{size:16,className:"shrink-0 text-gray-400"})]}),S.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:h&&S.jsx("img",{src:h,alt:"QR code for schedule link",width:240,height:240})})]})})}const k1=350,G1="cubic-bezier(0.32, 0.72, 0, 1)",Hl=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Y1(o){if(o.length===0)return"";const f=[...o].sort((B,D)=>B.date.localeCompare(D.date)),h=f[0].date,c=f[f.length-1].date,[s,d,v]=h.split("-").map(Number),[w,m,b]=c.split("-").map(Number);return h===c?`${Hl[d-1]} ${v}, ${s}`:s===w&&d===m?`${Hl[d-1]} ${v}–${b}, ${s}`:s===w?`${Hl[d-1]} ${v} – ${Hl[m-1]} ${b}, ${s}`:`${Hl[d-1]} ${v}, ${s} – ${Hl[m-1]} ${b}, ${w}`}function Q1(o){try{return new URL(o).hostname.replace(/^www\./,"")}catch{return o}}function jl({label:o,children:f}){return S.jsxs("div",{className:"grid grid-cols-[96px_1fr] items-baseline gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[S.jsx("span",{className:"text-[13px] font-medium text-gray-500",children:o}),S.jsx("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:f})]})}function X1({event:o,open:f,onClose:h}){const c=pt.useRef(null);pt.useEffect(()=>{var w;if(!f)return;const v=m=>{m.key==="Escape"&&h()};return window.addEventListener("keydown",v),(w=c.current)==null||w.focus(),()=>window.removeEventListener("keydown",v)},[f,h]);const s=Y1(o.days),d=s||o.organizer||o.track||o.configuration||o.direction||o.link;return S.jsx("div",{role:"dialog","aria-modal":f,"aria-labelledby":"event-details-title",inert:!f,className:"fixed inset-0 z-50 flex justify-center bg-gray-50",style:{transform:f?"translateX(0)":"translateX(100%)",transition:`transform ${k1}ms ${G1}`,boxShadow:f?"-8px 0 24px rgba(0,0,0,0.08)":"none"},children:S.jsxs("div",{className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto",children:[S.jsxs("div",{className:"mb-5 flex items-start gap-2",children:[S.jsxs("button",{ref:c,onClick:h,className:"inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-gray-200 bg-white py-2 pl-1.5 pr-3 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:border-gray-400",children:[S.jsx(Fg,{size:18,className:"text-gray-500"}),S.jsx("span",{children:"Back"})]}),S.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"})]}),d?S.jsxs("div",{className:"rounded-xl border border-gray-200 bg-white px-3.5 py-1 shadow-sm",children:[s&&S.jsx(jl,{label:"Dates",children:s}),o.organizer&&S.jsx(jl,{label:"Organizer",children:o.organizer}),o.track&&S.jsx(jl,{label:"Track",children:o.track}),o.configuration&&S.jsx(jl,{label:"Config",children:o.configuration}),o.direction&&S.jsx(jl,{label:"Direction",children:o.direction}),o.link&&S.jsx(jl,{label:"Event page",children:S.jsxs("a",{href:o.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[Q1(o.link),S.jsx(Ig,{size:12,className:"text-gray-400"})]})})]}):S.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})})}function Ll(o,f){const h=f.split(`
`).map(O=>O.trim());let c="",s="",d,v,w,m,b;const B=[],D=[];let U=null,H=!1;for(const O of h)if(!(!O||O.startsWith("//"))){if(O.startsWith("# ")){c=O.slice(2).trim();continue}if(O.startsWith("subtitle:")){s=O.slice(9).trim();continue}if(O.startsWith("link:")){d=O.slice(5).trim()||void 0;continue}if(O.startsWith("organizer:")){v=O.slice(10).trim()||void 0;continue}if(O.startsWith("track:")){w=O.slice(6).trim()||void 0;continue}if(O.startsWith("configuration:")){m=O.slice(14).trim()||void 0;continue}if(O.startsWith("config:")){m=O.slice(7).trim()||void 0;continue}if(O.startsWith("direction:")){b=O.slice(10).trim()||void 0;continue}if(O.startsWith("## ")){const G=O.slice(3).trim();if(G.toLowerCase()==="groups"){H=!0,U=null;continue}const it=G.split("|").map(Z=>Z.trim());it.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(it[1])?(H=!1,U={id:it[0].toLowerCase().replace(/\s+/g,"-"),label:it[0],date:it[1],events:[]},D.push(U)):H=!1;continue}if(H){const G=O.split("|").map(it=>it.trim());if(G.length>=4){const it=G[4]||void 0;B.push({id:G[0],label:G[1],bgClass:G[2],textClass:G[3],...it?{description:it}:{}})}continue}if(U){if(/^\d{2}:\d{2}/.test(O)){const G=V1(O);G&&U.events.push(G)}else if(/^break\s*\|/.test(O)){const G=O.slice(O.indexOf("|")+1).trim();U.events.push({type:"break",label:G})}}}return{id:o,name:c,subtitle:s,...d?{link:d}:{},...v?{organizer:v}:{},...w?{track:w}:{},...m?{configuration:m}:{},...b?{direction:b}:{},runGroups:B,days:D}}function V1(o){const f=o.split("|").map(w=>w.trim()),h=f[0],c=f.slice(1),s=h.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!s)return null;const d=s[1],v=s[2].trim();if(/^(general|lunch|special)$/.test(v)){const w=v,m=c[0]??"",b=c[1]||void 0;return{time:d,type:w,label:m,...b?{subtitle:b}:{}}}if(/^session/.test(v)){const w=v.match(/^session\s+(\d+)/),m=w?parseInt(w[1],10):void 0;let b=[],B=[],D;for(const U of c)U.startsWith("on:")?b=U.slice(3).trim().split(",").map(H=>H.trim()).filter(Boolean):U.startsWith("in:")?B=U.slice(3).trim().split(",").map(H=>H.trim()).filter(Boolean):U.startsWith("note:")&&(D=U.slice(5).trim()||void 0);return{time:d,type:"session",...m!==void 0?{sessionNumber:m}:{},onTrack:b,...B.length?{inClass:B}:{},...D?{note:D}:{}}}return null}const Z1=`# MSRC 1.7
subtitle: Sep 11–12, 2026 · MSR Cresson
track: MSR Cresson
configuration: 1.7 mile

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
`,K1="/hpde/pr-preview/pr-132/assets/msrc-1-7-D9G0r_nf.jpg",J1={...Ll("2026-09-11_msrc-1-7",Z1),mapImage:K1},F1=`# TXR SCCA
subtitle: Sep 13, 2026 · MSR
link: https://www.motorsportreg.com/events/txr-scca-time-trial-track-day-hpde-7-motorsport-ranch-cresson-texas-556724
organizer: Texas Region SCCA
track: MSR Cresson

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
`,I1=Ll("2026-09-13_msr-scca",F1),W1=`# MSRC 1.7 Fast Track
subtitle: June 6, 2026
track: MSR Cresson
configuration: 1.7 mile

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
`,$1=Ll("2026-06-06_msrc-1-7",W1),P1=`# MSRC 3.1
subtitle: Nov 7–9, 2025
track: MSR Cresson
configuration: 3.1 mile

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
`,ty=Ll("2025-11-07_msrc-3-1",P1),ey=`# ECR 2.7
subtitle: May 30, 2026
track: Eagles Canyon Raceway
configuration: 2.7 mile

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
`,ny=Ll("2026-05-30_ecr-2-7",ey),ly=`# Test Event
subtitle: Test data, not a real event

## groups
red    | Red    | bg-runred-500    | text-white | Time Trial
green  | Green  | bg-rungreen-500  | text-white | Time Trial
purple | Purple | bg-runpurple-500 | text-white | Time Trial
orange | Orange | bg-runorange-500 | text-white | Track Day
blue   | Blue   | bg-runblue-500   | text-white | Novice

## Today | 2000-01-01

00:00 session 1 | on: red | in: blue | note: Pre-dawn test session
00:30 session 1 | on: green | in: purple
01:00 session 2 | on: orange | in: blue | note: Second test group up
01:30 session 2 | on: red | in: green
02:00 session 3 | on: purple | in: orange | note: Coffee run happens after

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

13:10 session 3 | on: red | in: orange
13:30 session 3 | on: green
13:50 session 3 | on: purple
14:10 session 3 | on: orange
14:30 session 3 | on: blue
break | 10 minute corner worker break

15:05 session 4 | on: red
15:25 session 4 | on: green
15:45 session 4 | on: purple
16:05 session 4 | on: orange
16:25 session 4 | on: blue

17:00 general | Track is cold
17:15 general | Refreshments and trophies

17:35 general | Track re-opens for fun laps
18:00 session 5 | on: red | in: blue | note: Bring your logbook
18:30 session 5 | on: green
19:00 general | Post-event dinner | Chef's choice buffet
20:00 general | Paddock hangout
21:00 general | Night driving demo | Bring a jacket
22:00 session 6 | on: purple | in: blue | note: Instructor briefing at start
22:30 session 6 | on: orange | in: green | note: Last group of the day
23:00 session 7 | on: red | in: green | note: Cool-down laps, 60 mph max
23:45 session 8 | on: orange | in: purple | note: Final laps before gates close
`,Ih=Ll("test-live",ly),ay={...Ih,days:Ih.days.map(o=>({...o,date:Ba()}))},eu=[J1,I1,$1,ny,ty].sort((o,f)=>f.id.localeCompare(o.id)),Wh=[...eu,ay];function tu(o,f){const[h,c]=pt.useState(()=>{try{const s=localStorage.getItem(o);return s!==null?JSON.parse(s):f}catch{return f}});return pt.useEffect(()=>{localStorage.setItem(o,JSON.stringify(h))},[o,h]),[h,c]}function s0(o){const f=Ba();return o.days.find(h=>h.date===f)}function $h(o){return s0(o)??o.days[0]}function iy(){const[o,f]=pt.useState(()=>window.location.hash);pt.useEffect(()=>{const c=()=>{f(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",c),()=>window.removeEventListener("hashchange",c)},[]);function h(c){window.location.hash!==c&&(window.location.hash=c)}return[o,h]}const tr="#/event/";function Ph(o){return`${tr}${encodeURIComponent(o)}`}function uy(o){return o.startsWith(tr)?decodeURIComponent(o.slice(tr.length)):null}function cy(){const[o,f]=iy(),[h,c]=pt.useState("schedule"),[s,d]=tu("hpde:activeEvent",eu[0].id),[v,w]=tu("hpde:activeDay",null),[m,b]=tu("hpde:groups",[]),[B,D]=tu("hpde:hidePast",!1),[U,H]=pt.useState(!1),O=Wh.find(j=>j.id===s)??eu[0],G=O.days.find(j=>j.id===v)??$h(O),it=s0(O),Z=G.date===Ba(),q=O.days.length>1,K=O.days.reduce((j,X)=>X.date>j?X.date:j,O.days[0].date)<Ba(),[,st]=pt.useState(0);pt.useEffect(()=>{if(!Z)return;const j=setInterval(()=>st(X=>X+1),6e4);return()=>clearInterval(j)},[Z]);const Q=Z&&G.events.some(j=>j.type!=="break"&&en(j.time)<nr());function L(j){d(j.id),w($h(j).id),b([]),f(Ph(j.id))}return pt.useEffect(()=>{const j=uy(o);if(j){const X=Wh.find(et=>et.id===j);X&&X.id!==s&&L(X);return}(o===""||o==="#")&&f(Ph(s))},[o]),o==="#/widget-script"?S.jsx(g1,{}):o==="#/share"?S.jsx(q1,{}):S.jsxs(h1,{children:[S.jsxs("div",{className:"min-h-screen bg-gray-50",children:[S.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[S.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[S.jsx(s1,{events:eu,active:O,onChange:L,onOpenDetails:()=>H(!0)}),S.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[S.jsx("button",{onClick:()=>c("schedule"),className:`rounded-md p-2 transition-colors ${h==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:S.jsx(Jg,{size:18})}),S.jsx("button",{onClick:()=>c("map"),className:`rounded-md p-2 transition-colors ${h==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:S.jsx(yh,{size:18})})]})]}),K&&S.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),h==="schedule"&&S.jsxs(S.Fragment,{children:[q&&S.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[S.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:O.days.map(j=>S.jsx("button",{onClick:()=>w(j.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${G.id===j.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:j.label},j.id))}),S.jsx("button",{onClick:()=>it&&w(it.id),disabled:Z||!it,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${Z||!it?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),S.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[S.jsx(r1,{groups:O.runGroups,selected:m,onChange:b}),Q&&S.jsx(f1,{checked:B,onChange:()=>D(j=>!j),label:"Hide past events"})]}),S.jsx(o1,{events:G.events,runGroups:O.runGroups,isToday:Z,selectedGroups:m,hidePast:B}),S.jsx(m1,{groups:O.runGroups})]}),h==="map"&&(O.mapImage?S.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:S.jsx("img",{src:O.mapImage,alt:`${O.name} track map`,className:"block w-full h-auto"})}):S.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:S.jsxs("div",{className:"text-center",children:[S.jsx(yh,{size:40,className:"mx-auto mb-2 opacity-30"}),S.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),S.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[S.jsxs("div",{children:[S.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",S.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),S.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",i1("2026-09-17T14:49:10-05:00")]})]})]}),S.jsx(X1,{event:O,open:U,onClose:()=>H(!1)})]})}Xg.createRoot(document.getElementById("root")).render(S.jsx(pt.StrictMode,{children:S.jsx(cy,{})}));
