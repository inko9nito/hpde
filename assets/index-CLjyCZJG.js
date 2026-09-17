(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const b of d.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&c(b)}).observe(document,{childList:!0,subtree:!0});function h(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function c(o){if(o.ep)return;o.ep=!0;const d=h(o);fetch(o.href,d)}})();function Hg(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Er={exports:{}},zl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ch;function Ug(){if(ch)return zl;ch=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function h(c,o,d){var b=null;if(d!==void 0&&(b=""+d),o.key!==void 0&&(b=""+o.key),"key"in o){d={};for(var E in o)E!=="key"&&(d[E]=o[E])}else d=o;return o=d.ref,{$$typeof:r,type:c,key:b,ref:o!==void 0?o:null,props:d}}return zl.Fragment=f,zl.jsx=h,zl.jsxs=h,zl}var rh;function jg(){return rh||(rh=1,Er.exports=Ug()),Er.exports}var v=jg(),Tr={exports:{}},ct={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sh;function Lg(){if(sh)return ct;sh=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),b=Symbol.for("react.context"),E=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),S=Symbol.for("react.memo"),O=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),k=Symbol.iterator;function B(y){return y===null||typeof y!="object"?null:(y=k&&y[k]||y["@@iterator"],typeof y=="function"?y:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},j=Object.assign,nt={};function G(y,z,Q){this.props=y,this.context=z,this.refs=nt,this.updater=Q||L}G.prototype.isReactComponent={},G.prototype.setState=function(y,z){if(typeof y!="object"&&typeof y!="function"&&y!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,y,z,"setState")},G.prototype.forceUpdate=function(y){this.updater.enqueueForceUpdate(this,y,"forceUpdate")};function q(){}q.prototype=G.prototype;function Y(y,z,Q){this.props=y,this.context=z,this.refs=nt,this.updater=Q||L}var K=Y.prototype=new q;K.constructor=Y,j(K,G.prototype),K.isPureReactComponent=!0;var ot=Array.isArray;function V(){}var U={H:null,A:null,T:null,S:null},H=Object.prototype.hasOwnProperty;function X(y,z,Q){var F=Q.ref;return{$$typeof:r,type:y,key:z,ref:F!==void 0?F:null,props:Q}}function et(y,z){return X(y.type,z,y.props)}function $(y){return typeof y=="object"&&y!==null&&y.$$typeof===r}function I(y){var z={"=":"=0",":":"=2"};return"$"+y.replace(/[=:]/g,function(Q){return z[Q]})}var P=/\/+/g;function it(y,z){return typeof y=="object"&&y!==null&&y.key!=null?I(""+y.key):z.toString(36)}function Lt(y){switch(y.status){case"fulfilled":return y.value;case"rejected":throw y.reason;default:switch(typeof y.status=="string"?y.then(V,V):(y.status="pending",y.then(function(z){y.status==="pending"&&(y.status="fulfilled",y.value=z)},function(z){y.status==="pending"&&(y.status="rejected",y.reason=z)})),y.status){case"fulfilled":return y.value;case"rejected":throw y.reason}}throw y}function N(y,z,Q,F,ut){var ft=typeof y;(ft==="undefined"||ft==="boolean")&&(y=null);var dt=!1;if(y===null)dt=!0;else switch(ft){case"bigint":case"string":case"number":dt=!0;break;case"object":switch(y.$$typeof){case r:case f:dt=!0;break;case O:return dt=y._init,N(dt(y._payload),z,Q,F,ut)}}if(dt)return ut=ut(y),dt=F===""?"."+it(y,0):F,ot(ut)?(Q="",dt!=null&&(Q=dt.replace(P,"$&/")+"/"),N(ut,z,Q,"",function(He){return He})):ut!=null&&($(ut)&&(ut=et(ut,Q+(ut.key==null||y&&y.key===ut.key?"":(""+ut.key).replace(P,"$&/")+"/")+dt)),z.push(ut)),1;dt=0;var zt=F===""?".":F+":";if(ot(y))for(var Ct=0;Ct<y.length;Ct++)F=y[Ct],ft=zt+it(F,Ct),dt+=N(F,z,Q,ft,ut);else if(Ct=B(y),typeof Ct=="function")for(y=Ct.call(y),Ct=0;!(F=y.next()).done;)F=F.value,ft=zt+it(F,Ct++),dt+=N(F,z,Q,ft,ut);else if(ft==="object"){if(typeof y.then=="function")return N(Lt(y),z,Q,F,ut);throw z=String(y),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(y).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.")}return dt}function Z(y,z,Q){if(y==null)return y;var F=[],ut=0;return N(y,F,"","",function(ft){return z.call(Q,ft,ut++)}),F}function at(y){if(y._status===-1){var z=y._result;z=z(),z.then(function(Q){(y._status===0||y._status===-1)&&(y._status=1,y._result=Q)},function(Q){(y._status===0||y._status===-1)&&(y._status=2,y._result=Q)}),y._status===-1&&(y._status=0,y._result=z)}if(y._status===1)return y._result.default;throw y._result}var Tt=typeof reportError=="function"?reportError:function(y){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof y=="object"&&y!==null&&typeof y.message=="string"?String(y.message):String(y),error:y});if(!window.dispatchEvent(z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",y);return}console.error(y)},wt={map:Z,forEach:function(y,z,Q){Z(y,function(){z.apply(this,arguments)},Q)},count:function(y){var z=0;return Z(y,function(){z++}),z},toArray:function(y){return Z(y,function(z){return z})||[]},only:function(y){if(!$(y))throw Error("React.Children.only expected to receive a single React element child.");return y}};return ct.Activity=D,ct.Children=wt,ct.Component=G,ct.Fragment=h,ct.Profiler=o,ct.PureComponent=Y,ct.StrictMode=c,ct.Suspense=g,ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=U,ct.__COMPILER_RUNTIME={__proto__:null,c:function(y){return U.H.useMemoCache(y)}},ct.cache=function(y){return function(){return y.apply(null,arguments)}},ct.cacheSignal=function(){return null},ct.cloneElement=function(y,z,Q){if(y==null)throw Error("The argument must be a React element, but you passed "+y+".");var F=j({},y.props),ut=y.key;if(z!=null)for(ft in z.key!==void 0&&(ut=""+z.key),z)!H.call(z,ft)||ft==="key"||ft==="__self"||ft==="__source"||ft==="ref"&&z.ref===void 0||(F[ft]=z[ft]);var ft=arguments.length-2;if(ft===1)F.children=Q;else if(1<ft){for(var dt=Array(ft),zt=0;zt<ft;zt++)dt[zt]=arguments[zt+2];F.children=dt}return X(y.type,ut,F)},ct.createContext=function(y){return y={$$typeof:b,_currentValue:y,_currentValue2:y,_threadCount:0,Provider:null,Consumer:null},y.Provider=y,y.Consumer={$$typeof:d,_context:y},y},ct.createElement=function(y,z,Q){var F,ut={},ft=null;if(z!=null)for(F in z.key!==void 0&&(ft=""+z.key),z)H.call(z,F)&&F!=="key"&&F!=="__self"&&F!=="__source"&&(ut[F]=z[F]);var dt=arguments.length-2;if(dt===1)ut.children=Q;else if(1<dt){for(var zt=Array(dt),Ct=0;Ct<dt;Ct++)zt[Ct]=arguments[Ct+2];ut.children=zt}if(y&&y.defaultProps)for(F in dt=y.defaultProps,dt)ut[F]===void 0&&(ut[F]=dt[F]);return X(y,ft,ut)},ct.createRef=function(){return{current:null}},ct.forwardRef=function(y){return{$$typeof:E,render:y}},ct.isValidElement=$,ct.lazy=function(y){return{$$typeof:O,_payload:{_status:-1,_result:y},_init:at}},ct.memo=function(y,z){return{$$typeof:S,type:y,compare:z===void 0?null:z}},ct.startTransition=function(y){var z=U.T,Q={};U.T=Q;try{var F=y(),ut=U.S;ut!==null&&ut(Q,F),typeof F=="object"&&F!==null&&typeof F.then=="function"&&F.then(V,Tt)}catch(ft){Tt(ft)}finally{z!==null&&Q.types!==null&&(z.types=Q.types),U.T=z}},ct.unstable_useCacheRefresh=function(){return U.H.useCacheRefresh()},ct.use=function(y){return U.H.use(y)},ct.useActionState=function(y,z,Q){return U.H.useActionState(y,z,Q)},ct.useCallback=function(y,z){return U.H.useCallback(y,z)},ct.useContext=function(y){return U.H.useContext(y)},ct.useDebugValue=function(){},ct.useDeferredValue=function(y,z){return U.H.useDeferredValue(y,z)},ct.useEffect=function(y,z){return U.H.useEffect(y,z)},ct.useEffectEvent=function(y){return U.H.useEffectEvent(y)},ct.useId=function(){return U.H.useId()},ct.useImperativeHandle=function(y,z,Q){return U.H.useImperativeHandle(y,z,Q)},ct.useInsertionEffect=function(y,z){return U.H.useInsertionEffect(y,z)},ct.useLayoutEffect=function(y,z){return U.H.useLayoutEffect(y,z)},ct.useMemo=function(y,z){return U.H.useMemo(y,z)},ct.useOptimistic=function(y,z){return U.H.useOptimistic(y,z)},ct.useReducer=function(y,z,Q){return U.H.useReducer(y,z,Q)},ct.useRef=function(y){return U.H.useRef(y)},ct.useState=function(y){return U.H.useState(y)},ct.useSyncExternalStore=function(y,z,Q){return U.H.useSyncExternalStore(y,z,Q)},ct.useTransition=function(){return U.H.useTransition()},ct.version="19.2.6",ct}var oh;function ts(){return oh||(oh=1,Tr.exports=Lg()),Tr.exports}var vt=ts(),xr={exports:{}},Dl={},Ar={exports:{}},Cr={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fh;function qg(){return fh||(fh=1,(function(r){function f(N,Z){var at=N.length;N.push(Z);t:for(;0<at;){var Tt=at-1>>>1,wt=N[Tt];if(0<o(wt,Z))N[Tt]=Z,N[at]=wt,at=Tt;else break t}}function h(N){return N.length===0?null:N[0]}function c(N){if(N.length===0)return null;var Z=N[0],at=N.pop();if(at!==Z){N[0]=at;t:for(var Tt=0,wt=N.length,y=wt>>>1;Tt<y;){var z=2*(Tt+1)-1,Q=N[z],F=z+1,ut=N[F];if(0>o(Q,at))F<wt&&0>o(ut,Q)?(N[Tt]=ut,N[F]=at,Tt=F):(N[Tt]=Q,N[z]=at,Tt=z);else if(F<wt&&0>o(ut,at))N[Tt]=ut,N[F]=at,Tt=F;else break t}}return Z}function o(N,Z){var at=N.sortIndex-Z.sortIndex;return at!==0?at:N.id-Z.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;r.unstable_now=function(){return d.now()}}else{var b=Date,E=b.now();r.unstable_now=function(){return b.now()-E}}var g=[],S=[],O=1,D=null,k=3,B=!1,L=!1,j=!1,nt=!1,G=typeof setTimeout=="function"?setTimeout:null,q=typeof clearTimeout=="function"?clearTimeout:null,Y=typeof setImmediate<"u"?setImmediate:null;function K(N){for(var Z=h(S);Z!==null;){if(Z.callback===null)c(S);else if(Z.startTime<=N)c(S),Z.sortIndex=Z.expirationTime,f(g,Z);else break;Z=h(S)}}function ot(N){if(j=!1,K(N),!L)if(h(g)!==null)L=!0,V||(V=!0,I());else{var Z=h(S);Z!==null&&Lt(ot,Z.startTime-N)}}var V=!1,U=-1,H=5,X=-1;function et(){return nt?!0:!(r.unstable_now()-X<H)}function $(){if(nt=!1,V){var N=r.unstable_now();X=N;var Z=!0;try{t:{L=!1,j&&(j=!1,q(U),U=-1),B=!0;var at=k;try{e:{for(K(N),D=h(g);D!==null&&!(D.expirationTime>N&&et());){var Tt=D.callback;if(typeof Tt=="function"){D.callback=null,k=D.priorityLevel;var wt=Tt(D.expirationTime<=N);if(N=r.unstable_now(),typeof wt=="function"){D.callback=wt,K(N),Z=!0;break e}D===h(g)&&c(g),K(N)}else c(g);D=h(g)}if(D!==null)Z=!0;else{var y=h(S);y!==null&&Lt(ot,y.startTime-N),Z=!1}}break t}finally{D=null,k=at,B=!1}Z=void 0}}finally{Z?I():V=!1}}}var I;if(typeof Y=="function")I=function(){Y($)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,it=P.port2;P.port1.onmessage=$,I=function(){it.postMessage(null)}}else I=function(){G($,0)};function Lt(N,Z){U=G(function(){N(r.unstable_now())},Z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(N){N.callback=null},r.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<N?Math.floor(1e3/N):5},r.unstable_getCurrentPriorityLevel=function(){return k},r.unstable_next=function(N){switch(k){case 1:case 2:case 3:var Z=3;break;default:Z=k}var at=k;k=Z;try{return N()}finally{k=at}},r.unstable_requestPaint=function(){nt=!0},r.unstable_runWithPriority=function(N,Z){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var at=k;k=N;try{return Z()}finally{k=at}},r.unstable_scheduleCallback=function(N,Z,at){var Tt=r.unstable_now();switch(typeof at=="object"&&at!==null?(at=at.delay,at=typeof at=="number"&&0<at?Tt+at:Tt):at=Tt,N){case 1:var wt=-1;break;case 2:wt=250;break;case 5:wt=1073741823;break;case 4:wt=1e4;break;default:wt=5e3}return wt=at+wt,N={id:O++,callback:Z,priorityLevel:N,startTime:at,expirationTime:wt,sortIndex:-1},at>Tt?(N.sortIndex=at,f(S,N),h(g)===null&&N===h(S)&&(j?(q(U),U=-1):j=!0,Lt(ot,at-Tt))):(N.sortIndex=wt,f(g,N),L||B||(L=!0,V||(V=!0,I()))),N},r.unstable_shouldYield=et,r.unstable_wrapCallback=function(N){var Z=k;return function(){var at=k;k=Z;try{return N.apply(this,arguments)}finally{k=at}}}})(Cr)),Cr}var dh;function Yg(){return dh||(dh=1,Ar.exports=qg()),Ar.exports}var Nr={exports:{}},$t={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hh;function Gg(){if(hh)return $t;hh=1;var r=ts();function f(g){var S="https://react.dev/errors/"+g;if(1<arguments.length){S+="?args[]="+encodeURIComponent(arguments[1]);for(var O=2;O<arguments.length;O++)S+="&args[]="+encodeURIComponent(arguments[O])}return"Minified React error #"+g+"; visit "+S+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(){}var c={d:{f:h,r:function(){throw Error(f(522))},D:h,C:h,L:h,m:h,X:h,S:h,M:h},p:0,findDOMNode:null},o=Symbol.for("react.portal");function d(g,S,O){var D=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:D==null?null:""+D,children:g,containerInfo:S,implementation:O}}var b=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function E(g,S){if(g==="font")return"";if(typeof S=="string")return S==="use-credentials"?S:""}return $t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,$t.createPortal=function(g,S){var O=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!S||S.nodeType!==1&&S.nodeType!==9&&S.nodeType!==11)throw Error(f(299));return d(g,S,null,O)},$t.flushSync=function(g){var S=b.T,O=c.p;try{if(b.T=null,c.p=2,g)return g()}finally{b.T=S,c.p=O,c.d.f()}},$t.preconnect=function(g,S){typeof g=="string"&&(S?(S=S.crossOrigin,S=typeof S=="string"?S==="use-credentials"?S:"":void 0):S=null,c.d.C(g,S))},$t.prefetchDNS=function(g){typeof g=="string"&&c.d.D(g)},$t.preinit=function(g,S){if(typeof g=="string"&&S&&typeof S.as=="string"){var O=S.as,D=E(O,S.crossOrigin),k=typeof S.integrity=="string"?S.integrity:void 0,B=typeof S.fetchPriority=="string"?S.fetchPriority:void 0;O==="style"?c.d.S(g,typeof S.precedence=="string"?S.precedence:void 0,{crossOrigin:D,integrity:k,fetchPriority:B}):O==="script"&&c.d.X(g,{crossOrigin:D,integrity:k,fetchPriority:B,nonce:typeof S.nonce=="string"?S.nonce:void 0})}},$t.preinitModule=function(g,S){if(typeof g=="string")if(typeof S=="object"&&S!==null){if(S.as==null||S.as==="script"){var O=E(S.as,S.crossOrigin);c.d.M(g,{crossOrigin:O,integrity:typeof S.integrity=="string"?S.integrity:void 0,nonce:typeof S.nonce=="string"?S.nonce:void 0})}}else S==null&&c.d.M(g)},$t.preload=function(g,S){if(typeof g=="string"&&typeof S=="object"&&S!==null&&typeof S.as=="string"){var O=S.as,D=E(O,S.crossOrigin);c.d.L(g,O,{crossOrigin:D,integrity:typeof S.integrity=="string"?S.integrity:void 0,nonce:typeof S.nonce=="string"?S.nonce:void 0,type:typeof S.type=="string"?S.type:void 0,fetchPriority:typeof S.fetchPriority=="string"?S.fetchPriority:void 0,referrerPolicy:typeof S.referrerPolicy=="string"?S.referrerPolicy:void 0,imageSrcSet:typeof S.imageSrcSet=="string"?S.imageSrcSet:void 0,imageSizes:typeof S.imageSizes=="string"?S.imageSizes:void 0,media:typeof S.media=="string"?S.media:void 0})}},$t.preloadModule=function(g,S){if(typeof g=="string")if(S){var O=E(S.as,S.crossOrigin);c.d.m(g,{as:typeof S.as=="string"&&S.as!=="script"?S.as:void 0,crossOrigin:O,integrity:typeof S.integrity=="string"?S.integrity:void 0})}else c.d.m(g)},$t.requestFormReset=function(g){c.d.r(g)},$t.unstable_batchedUpdates=function(g,S){return g(S)},$t.useFormState=function(g,S,O){return b.H.useFormState(g,S,O)},$t.useFormStatus=function(){return b.H.useHostTransitionStatus()},$t.version="19.2.6",$t}var mh;function Qg(){if(mh)return Nr.exports;mh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),Nr.exports=Gg(),Nr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gh;function Vg(){if(gh)return Dl;gh=1;var r=Yg(),f=ts(),h=Qg();function c(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function d(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function b(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function E(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function g(t){if(d(t)!==t)throw Error(c(188))}function S(t){var e=t.alternate;if(!e){if(e=d(t),e===null)throw Error(c(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return g(l),t;if(i===a)return g(l),e;i=i.sibling}throw Error(c(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,s=l.child;s;){if(s===n){u=!0,n=l,a=i;break}if(s===a){u=!0,a=l,n=i;break}s=s.sibling}if(!u){for(s=i.child;s;){if(s===n){u=!0,n=i,a=l;break}if(s===a){u=!0,a=i,n=l;break}s=s.sibling}if(!u)throw Error(c(189))}}if(n.alternate!==a)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?t:e}function O(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=O(t),e!==null)return e;t=t.sibling}return null}var D=Object.assign,k=Symbol.for("react.element"),B=Symbol.for("react.transitional.element"),L=Symbol.for("react.portal"),j=Symbol.for("react.fragment"),nt=Symbol.for("react.strict_mode"),G=Symbol.for("react.profiler"),q=Symbol.for("react.consumer"),Y=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),ot=Symbol.for("react.suspense"),V=Symbol.for("react.suspense_list"),U=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),X=Symbol.for("react.activity"),et=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function I(t){return t===null||typeof t!="object"?null:(t=$&&t[$]||t["@@iterator"],typeof t=="function"?t:null)}var P=Symbol.for("react.client.reference");function it(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===P?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case j:return"Fragment";case G:return"Profiler";case nt:return"StrictMode";case ot:return"Suspense";case V:return"SuspenseList";case X:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case L:return"Portal";case Y:return t.displayName||"Context";case q:return(t._context.displayName||"Context")+".Consumer";case K:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case U:return e=t.displayName||null,e!==null?e:it(t.type)||"Memo";case H:e=t._payload,t=t._init;try{return it(t(e))}catch{}}return null}var Lt=Array.isArray,N=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z=h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,at={pending:!1,data:null,method:null,action:null},Tt=[],wt=-1;function y(t){return{current:t}}function z(t){0>wt||(t.current=Tt[wt],Tt[wt]=null,wt--)}function Q(t,e){wt++,Tt[wt]=t.current,t.current=e}var F=y(null),ut=y(null),ft=y(null),dt=y(null);function zt(t,e){switch(Q(ft,e),Q(ut,t),Q(F,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Rd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Rd(e),t=zd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}z(F),Q(F,t)}function Ct(){z(F),z(ut),z(ft)}function He(t){t.memoizedState!==null&&Q(dt,t);var e=F.current,n=zd(e,t.type);e!==n&&(Q(ut,t),Q(F,n))}function Bl(t){ut.current===t&&(z(F),z(ut)),dt.current===t&&(z(dt),Nl._currentValue=at)}var lu,ls;function Mn(t){if(lu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);lu=e&&e[1]||"",ls=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+lu+t+ls}var iu=!1;function uu(t,e){if(!t||iu)return"";iu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var R=function(){throw Error()};if(Object.defineProperty(R.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(R,[])}catch(C){var A=C}Reflect.construct(t,[],R)}else{try{R.call()}catch(C){A=C}t.call(R.prototype)}}else{try{throw Error()}catch(C){A=C}(R=t())&&typeof R.catch=="function"&&R.catch(function(){})}}catch(C){if(C&&A&&typeof C.stack=="string")return[C.stack,A.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],s=i[1];if(u&&s){var m=u.split(`
`),x=s.split(`
`);for(l=a=0;a<m.length&&!m[a].includes("DetermineComponentFrameRoot");)a++;for(;l<x.length&&!x[l].includes("DetermineComponentFrameRoot");)l++;if(a===m.length||l===x.length)for(a=m.length-1,l=x.length-1;1<=a&&0<=l&&m[a]!==x[l];)l--;for(;1<=a&&0<=l;a--,l--)if(m[a]!==x[l]){if(a!==1||l!==1)do if(a--,l--,0>l||m[a]!==x[l]){var _=`
`+m[a].replace(" at new "," at ");return t.displayName&&_.includes("<anonymous>")&&(_=_.replace("<anonymous>",t.displayName)),_}while(1<=a&&0<=l);break}}}finally{iu=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Mn(n):""}function h0(t,e){switch(t.tag){case 26:case 27:case 5:return Mn(t.type);case 16:return Mn("Lazy");case 13:return t.child!==e&&e!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return uu(t.type,!1);case 11:return uu(t.type.render,!1);case 1:return uu(t.type,!0);case 31:return Mn("Activity");default:return""}}function is(t){try{var e="",n=null;do e+=h0(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var cu=Object.prototype.hasOwnProperty,ru=r.unstable_scheduleCallback,su=r.unstable_cancelCallback,m0=r.unstable_shouldYield,g0=r.unstable_requestPaint,ce=r.unstable_now,p0=r.unstable_getCurrentPriorityLevel,us=r.unstable_ImmediatePriority,cs=r.unstable_UserBlockingPriority,Hl=r.unstable_NormalPriority,y0=r.unstable_LowPriority,rs=r.unstable_IdlePriority,v0=r.log,b0=r.unstable_setDisableYieldValue,La=null,re=null;function nn(t){if(typeof v0=="function"&&b0(t),re&&typeof re.setStrictMode=="function")try{re.setStrictMode(La,t)}catch{}}var se=Math.clz32?Math.clz32:E0,S0=Math.log,w0=Math.LN2;function E0(t){return t>>>=0,t===0?32:31-(S0(t)/w0|0)|0}var Ul=256,jl=262144,Ll=4194304;function Rn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ql(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var s=a&134217727;return s!==0?(a=s&~i,a!==0?l=Rn(a):(u&=s,u!==0?l=Rn(u):n||(n=s&~t,n!==0&&(l=Rn(n))))):(s=a&~i,s!==0?l=Rn(s):u!==0?l=Rn(u):n||(n=a&~t,n!==0&&(l=Rn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function qa(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function T0(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ss(){var t=Ll;return Ll<<=1,(Ll&62914560)===0&&(Ll=4194304),t}function ou(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ya(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function x0(t,e,n,a,l,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var s=t.entanglements,m=t.expirationTimes,x=t.hiddenUpdates;for(n=u&~n;0<n;){var _=31-se(n),R=1<<_;s[_]=0,m[_]=-1;var A=x[_];if(A!==null)for(x[_]=null,_=0;_<A.length;_++){var C=A[_];C!==null&&(C.lane&=-536870913)}n&=~R}a!==0&&os(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function os(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-se(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function fs(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-se(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function ds(t,e){var n=e&-e;return n=(n&42)!==0?1:fu(n),(n&(t.suspendedLanes|e))!==0?0:n}function fu(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function du(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function hs(){var t=Z.p;return t!==0?t:(t=window.event,t===void 0?32:th(t.type))}function ms(t,e){var n=Z.p;try{return Z.p=t,e()}finally{Z.p=n}}var an=Math.random().toString(36).slice(2),Kt="__reactFiber$"+an,te="__reactProps$"+an,Wn="__reactContainer$"+an,hu="__reactEvents$"+an,A0="__reactListeners$"+an,C0="__reactHandles$"+an,gs="__reactResources$"+an,Ga="__reactMarker$"+an;function mu(t){delete t[Kt],delete t[te],delete t[hu],delete t[A0],delete t[C0]}function $n(t){var e=t[Kt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[Kt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=jd(t);t!==null;){if(n=t[Kt])return n;t=jd(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[Kt]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Qa(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(c(33))}function ta(t){var e=t[gs];return e||(e=t[gs]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Xt(t){t[Ga]=!0}var ps=new Set,ys={};function zn(t,e){ea(t,e),ea(t+"Capture",e)}function ea(t,e){for(ys[t]=e,t=0;t<e.length;t++)ps.add(e[t])}var N0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),vs={},bs={};function _0(t){return cu.call(bs,t)?!0:cu.call(vs,t)?!1:N0.test(t)?bs[t]=!0:(vs[t]=!0,!1)}function Yl(t,e,n){if(_0(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Gl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function Ue(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ye(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ss(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function M0(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function gu(t){if(!t._valueTracker){var e=Ss(t)?"checked":"value";t._valueTracker=M0(t,e,""+t[e])}}function ws(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=Ss(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Ql(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var R0=/[\n"\\]/g;function ve(t){return t.replace(R0,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function pu(t,e,n,a,l,i,u,s){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ye(e)):t.value!==""+ye(e)&&(t.value=""+ye(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?yu(t,u,ye(e)):n!=null?yu(t,u,ye(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?t.name=""+ye(s):t.removeAttribute("name")}function Es(t,e,n,a,l,i,u,s){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){gu(t);return}n=n!=null?""+ye(n):"",e=e!=null?""+ye(e):n,s||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=s?t.checked:!!a,t.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),gu(t)}function yu(t,e,n){e==="number"&&Ql(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function na(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ye(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function Ts(t,e,n){if(e!=null&&(e=""+ye(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ye(n):""}function xs(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(c(92));if(Lt(a)){if(1<a.length)throw Error(c(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ye(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),gu(t)}function aa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var z0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function As(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||z0.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Cs(t,e,n){if(e!=null&&typeof e!="object")throw Error(c(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&As(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&As(t,i,e[i])}function vu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var D0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),O0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Vl(t){return O0.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function je(){}var bu=null;function Su(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var la=null,ia=null;function Ns(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[te]||null;t:switch(t=e.stateNode,e.type){case"input":if(pu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+ve(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[te]||null;if(!l)throw Error(c(90));pu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&ws(a)}break t;case"textarea":Ts(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&na(t,!!n.multiple,e,!1)}}}var wu=!1;function _s(t,e,n){if(wu)return t(e,n);wu=!0;try{var a=t(e);return a}finally{if(wu=!1,(la!==null||ia!==null)&&(zi(),la&&(e=la,t=ia,ia=la=null,Ns(e),t)))for(e=0;e<t.length;e++)Ns(t[e])}}function Va(t,e){var n=t.stateNode;if(n===null)return null;var a=n[te]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(c(231,e,typeof n));return n}var Le=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Eu=!1;if(Le)try{var Xa={};Object.defineProperty(Xa,"passive",{get:function(){Eu=!0}}),window.addEventListener("test",Xa,Xa),window.removeEventListener("test",Xa,Xa)}catch{Eu=!1}var ln=null,Tu=null,Xl=null;function Ms(){if(Xl)return Xl;var t,e=Tu,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var u=n-t;for(a=1;a<=u&&e[n-a]===l[i-a];a++);return Xl=l.slice(t,1<a?1-a:void 0)}function Zl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Kl(){return!0}function Rs(){return!1}function ee(t){function e(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Kl:Rs,this.isPropagationStopped=Rs,this}return D(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Kl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Kl)},persist:function(){},isPersistent:Kl}),e}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=ee(Dn),Za=D({},Dn,{view:0,detail:0}),k0=ee(Za),xu,Au,Ka,Fl=D({},Za,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ka&&(Ka&&t.type==="mousemove"?(xu=t.screenX-Ka.screenX,Au=t.screenY-Ka.screenY):Au=xu=0,Ka=t),xu)},movementY:function(t){return"movementY"in t?t.movementY:Au}}),zs=ee(Fl),B0=D({},Fl,{dataTransfer:0}),H0=ee(B0),U0=D({},Za,{relatedTarget:0}),Cu=ee(U0),j0=D({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),L0=ee(j0),q0=D({},Dn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Y0=ee(q0),G0=D({},Dn,{data:0}),Ds=ee(G0),Q0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},V0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},X0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Z0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=X0[t])?!!e[t]:!1}function Nu(){return Z0}var K0=D({},Za,{key:function(t){if(t.key){var e=Q0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?V0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nu,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),J0=ee(K0),F0=D({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Os=ee(F0),I0=D({},Za,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nu}),W0=ee(I0),$0=D({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),P0=ee($0),tm=D({},Fl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),em=ee(tm),nm=D({},Dn,{newState:0,oldState:0}),am=ee(nm),lm=[9,13,27,32],_u=Le&&"CompositionEvent"in window,Ja=null;Le&&"documentMode"in document&&(Ja=document.documentMode);var im=Le&&"TextEvent"in window&&!Ja,ks=Le&&(!_u||Ja&&8<Ja&&11>=Ja),Bs=" ",Hs=!1;function Us(t,e){switch(t){case"keyup":return lm.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function js(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ua=!1;function um(t,e){switch(t){case"compositionend":return js(e);case"keypress":return e.which!==32?null:(Hs=!0,Bs);case"textInput":return t=e.data,t===Bs&&Hs?null:t;default:return null}}function cm(t,e){if(ua)return t==="compositionend"||!_u&&Us(t,e)?(t=Ms(),Xl=Tu=ln=null,ua=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return ks&&e.locale!=="ko"?null:e.data;default:return null}}var rm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ls(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!rm[t.type]:e==="textarea"}function qs(t,e,n,a){la?ia?ia.push(a):ia=[a]:la=a,e=ji(e,"onChange"),0<e.length&&(n=new Jl("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Fa=null,Ia=null;function sm(t){xd(t,0)}function Il(t){var e=Qa(t);if(ws(e))return t}function Ys(t,e){if(t==="change")return e}var Gs=!1;if(Le){var Mu;if(Le){var Ru="oninput"in document;if(!Ru){var Qs=document.createElement("div");Qs.setAttribute("oninput","return;"),Ru=typeof Qs.oninput=="function"}Mu=Ru}else Mu=!1;Gs=Mu&&(!document.documentMode||9<document.documentMode)}function Vs(){Fa&&(Fa.detachEvent("onpropertychange",Xs),Ia=Fa=null)}function Xs(t){if(t.propertyName==="value"&&Il(Ia)){var e=[];qs(e,Ia,t,Su(t)),_s(sm,e)}}function om(t,e,n){t==="focusin"?(Vs(),Fa=e,Ia=n,Fa.attachEvent("onpropertychange",Xs)):t==="focusout"&&Vs()}function fm(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Il(Ia)}function dm(t,e){if(t==="click")return Il(e)}function hm(t,e){if(t==="input"||t==="change")return Il(e)}function mm(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var oe=typeof Object.is=="function"?Object.is:mm;function Wa(t,e){if(oe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!cu.call(e,l)||!oe(t[l],e[l]))return!1}return!0}function Zs(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ks(t,e){var n=Zs(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Zs(n)}}function Js(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Js(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Fs(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Ql(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ql(t.document)}return e}function zu(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var gm=Le&&"documentMode"in document&&11>=document.documentMode,ca=null,Du=null,$a=null,Ou=!1;function Is(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ou||ca==null||ca!==Ql(a)||(a=ca,"selectionStart"in a&&zu(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),$a&&Wa($a,a)||($a=a,a=ji(Du,"onSelect"),0<a.length&&(e=new Jl("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=ca)))}function On(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ra={animationend:On("Animation","AnimationEnd"),animationiteration:On("Animation","AnimationIteration"),animationstart:On("Animation","AnimationStart"),transitionrun:On("Transition","TransitionRun"),transitionstart:On("Transition","TransitionStart"),transitioncancel:On("Transition","TransitionCancel"),transitionend:On("Transition","TransitionEnd")},ku={},Ws={};Le&&(Ws=document.createElement("div").style,"AnimationEvent"in window||(delete ra.animationend.animation,delete ra.animationiteration.animation,delete ra.animationstart.animation),"TransitionEvent"in window||delete ra.transitionend.transition);function kn(t){if(ku[t])return ku[t];if(!ra[t])return t;var e=ra[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Ws)return ku[t]=e[n];return t}var $s=kn("animationend"),Ps=kn("animationiteration"),to=kn("animationstart"),pm=kn("transitionrun"),ym=kn("transitionstart"),vm=kn("transitioncancel"),eo=kn("transitionend"),no=new Map,Bu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Bu.push("scrollEnd");function _e(t,e){no.set(t,e),zn(e,[t])}var Wl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},be=[],sa=0,Hu=0;function $l(){for(var t=sa,e=Hu=sa=0;e<t;){var n=be[e];be[e++]=null;var a=be[e];be[e++]=null;var l=be[e];be[e++]=null;var i=be[e];if(be[e++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&ao(n,l,i)}}function Pl(t,e,n,a){be[sa++]=t,be[sa++]=e,be[sa++]=n,be[sa++]=a,Hu|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Uu(t,e,n,a){return Pl(t,e,n,a),ti(t)}function Bn(t,e){return Pl(t,null,null,e),ti(t)}function ao(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-se(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function ti(t){if(50<Sl)throw Sl=0,Zc=null,Error(c(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var oa={};function bm(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function fe(t,e,n,a){return new bm(t,e,n,a)}function ju(t){return t=t.prototype,!(!t||!t.isReactComponent)}function qe(t,e){var n=t.alternate;return n===null?(n=fe(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function lo(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ei(t,e,n,a,l,i){var u=0;if(a=t,typeof t=="function")ju(t)&&(u=1);else if(typeof t=="string")u=xg(t,n,F.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case X:return t=fe(31,n,e,l),t.elementType=X,t.lanes=i,t;case j:return Hn(n.children,l,i,e);case nt:u=8,l|=24;break;case G:return t=fe(12,n,e,l|2),t.elementType=G,t.lanes=i,t;case ot:return t=fe(13,n,e,l),t.elementType=ot,t.lanes=i,t;case V:return t=fe(19,n,e,l),t.elementType=V,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Y:u=10;break t;case q:u=9;break t;case K:u=11;break t;case U:u=14;break t;case H:u=16,a=null;break t}u=29,n=Error(c(130,t===null?"null":typeof t,"")),a=null}return e=fe(u,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function Hn(t,e,n,a){return t=fe(7,t,a,e),t.lanes=n,t}function Lu(t,e,n){return t=fe(6,t,null,e),t.lanes=n,t}function io(t){var e=fe(18,null,null,0);return e.stateNode=t,e}function qu(t,e,n){return e=fe(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var uo=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=uo.get(t);return n!==void 0?n:(e={value:t,source:e,stack:is(e)},uo.set(t,e),e)}return{value:t,source:e,stack:is(e)}}var fa=[],da=0,ni=null,Pa=0,we=[],Ee=0,un=null,ze=1,De="";function Ye(t,e){fa[da++]=Pa,fa[da++]=ni,ni=t,Pa=e}function co(t,e,n){we[Ee++]=ze,we[Ee++]=De,we[Ee++]=un,un=t;var a=ze;t=De;var l=32-se(a)-1;a&=~(1<<l),n+=1;var i=32-se(e)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,ze=1<<32-se(e)+l|n<<l|a,De=i+t}else ze=1<<i|n<<l|a,De=t}function Yu(t){t.return!==null&&(Ye(t,1),co(t,1,0))}function Gu(t){for(;t===ni;)ni=fa[--da],fa[da]=null,Pa=fa[--da],fa[da]=null;for(;t===un;)un=we[--Ee],we[Ee]=null,De=we[--Ee],we[Ee]=null,ze=we[--Ee],we[Ee]=null}function ro(t,e){we[Ee++]=ze,we[Ee++]=De,we[Ee++]=un,ze=e.id,De=e.overflow,un=t}var Jt=null,Dt=null,yt=!1,cn=null,Te=!1,Qu=Error(c(519));function rn(t){var e=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw tl(Se(e,t)),Qu}function so(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[Kt]=t,e[te]=a,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<El.length;n++)mt(El[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),Es(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),xs(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||_d(e.textContent,n)?(a.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),a.onScroll!=null&&mt("scroll",e),a.onScrollEnd!=null&&mt("scrollend",e),a.onClick!=null&&(e.onclick=je),e=!0):e=!1,e||rn(t,!0)}function oo(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:Te=!1;return;case 27:case 3:Te=!0;return;default:Jt=Jt.return}}function ha(t){if(t!==Jt)return!1;if(!yt)return oo(t),yt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||cr(t.type,t.memoizedProps)),n=!n),n&&Dt&&rn(t),oo(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Ud(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Ud(t)}else e===27?(e=Dt,En(t.type)?(t=dr,dr=null,Dt=t):Dt=e):Dt=Jt?Ae(t.stateNode.nextSibling):null;return!0}function Un(){Dt=Jt=null,yt=!1}function Vu(){var t=cn;return t!==null&&(ie===null?ie=t:ie.push.apply(ie,t),cn=null),t}function tl(t){cn===null?cn=[t]:cn.push(t)}var Xu=y(null),jn=null,Ge=null;function sn(t,e,n){Q(Xu,e._currentValue),e._currentValue=n}function Qe(t){t._currentValue=Xu.current,z(Xu)}function Zu(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Ku(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;t:for(;i!==null;){var s=i;i=l;for(var m=0;m<e.length;m++)if(s.context===e[m]){i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Zu(i.return,n,t),a||(u=null);break t}i=s.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(c(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Zu(u,n,t),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===t){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function ma(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(c(387));if(u=u.memoizedProps,u!==null){var s=l.type;oe(l.pendingProps.value,u.value)||(t!==null?t.push(s):t=[s])}}else if(l===dt.current){if(u=l.alternate,u===null)throw Error(c(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Nl):t=[Nl])}l=l.return}t!==null&&Ku(e,t,n,a),e.flags|=262144}function ai(t){for(t=t.firstContext;t!==null;){if(!oe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ln(t){jn=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ft(t){return fo(jn,t)}function li(t,e){return jn===null&&Ln(t),fo(t,e)}function fo(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ge===null){if(t===null)throw Error(c(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return n}var Sm=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},wm=r.unstable_scheduleCallback,Em=r.unstable_NormalPriority,qt={$$typeof:Y,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ju(){return{controller:new Sm,data:new Map,refCount:0}}function el(t){t.refCount--,t.refCount===0&&wm(Em,function(){t.controller.abort()})}var nl=null,Fu=0,ga=0,pa=null;function Tm(t,e){if(nl===null){var n=nl=[];Fu=0,ga=$c(),pa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Fu++,e.then(ho,ho),e}function ho(){if(--Fu===0&&nl!==null){pa!==null&&(pa.status="fulfilled");var t=nl;nl=null,ga=0,pa=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function xm(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var mo=N.S;N.S=function(t,e){$f=ce(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Tm(t,e),mo!==null&&mo(t,e)};var qn=y(null);function Iu(){var t=qn.current;return t!==null?t:Rt.pooledCache}function ii(t,e){e===null?Q(qn,qn.current):Q(qn,e.pool)}function go(){var t=Iu();return t===null?null:{parent:qt._currentValue,pool:t}}var ya=Error(c(460)),Wu=Error(c(474)),ui=Error(c(542)),ci={then:function(){}};function po(t){return t=t.status,t==="fulfilled"||t==="rejected"}function yo(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(je,je),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,bo(t),t;default:if(typeof e.status=="string")e.then(je,je);else{if(t=Rt,t!==null&&100<t.shellSuspendCounter)throw Error(c(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,bo(t),t}throw Gn=e,ya}}function Yn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gn=n,ya):n}}var Gn=null;function vo(){if(Gn===null)throw Error(c(459));var t=Gn;return Gn=null,t}function bo(t){if(t===ya||t===ui)throw Error(c(483))}var va=null,al=0;function ri(t){var e=al;return al+=1,va===null&&(va=[]),yo(va,t,e)}function ll(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function si(t,e){throw e.$$typeof===k?Error(c(525)):(t=Object.prototype.toString.call(e),Error(c(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function So(t){function e(w,p){if(t){var T=w.deletions;T===null?(w.deletions=[p],w.flags|=16):T.push(p)}}function n(w,p){if(!t)return null;for(;p!==null;)e(w,p),p=p.sibling;return null}function a(w){for(var p=new Map;w!==null;)w.key!==null?p.set(w.key,w):p.set(w.index,w),w=w.sibling;return p}function l(w,p){return w=qe(w,p),w.index=0,w.sibling=null,w}function i(w,p,T){return w.index=T,t?(T=w.alternate,T!==null?(T=T.index,T<p?(w.flags|=67108866,p):T):(w.flags|=67108866,p)):(w.flags|=1048576,p)}function u(w){return t&&w.alternate===null&&(w.flags|=67108866),w}function s(w,p,T,M){return p===null||p.tag!==6?(p=Lu(T,w.mode,M),p.return=w,p):(p=l(p,T),p.return=w,p)}function m(w,p,T,M){var tt=T.type;return tt===j?_(w,p,T.props.children,M,T.key):p!==null&&(p.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===H&&Yn(tt)===p.type)?(p=l(p,T.props),ll(p,T),p.return=w,p):(p=ei(T.type,T.key,T.props,null,w.mode,M),ll(p,T),p.return=w,p)}function x(w,p,T,M){return p===null||p.tag!==4||p.stateNode.containerInfo!==T.containerInfo||p.stateNode.implementation!==T.implementation?(p=qu(T,w.mode,M),p.return=w,p):(p=l(p,T.children||[]),p.return=w,p)}function _(w,p,T,M,tt){return p===null||p.tag!==7?(p=Hn(T,w.mode,M,tt),p.return=w,p):(p=l(p,T),p.return=w,p)}function R(w,p,T){if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return p=Lu(""+p,w.mode,T),p.return=w,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case B:return T=ei(p.type,p.key,p.props,null,w.mode,T),ll(T,p),T.return=w,T;case L:return p=qu(p,w.mode,T),p.return=w,p;case H:return p=Yn(p),R(w,p,T)}if(Lt(p)||I(p))return p=Hn(p,w.mode,T,null),p.return=w,p;if(typeof p.then=="function")return R(w,ri(p),T);if(p.$$typeof===Y)return R(w,li(w,p),T);si(w,p)}return null}function A(w,p,T,M){var tt=p!==null?p.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return tt!==null?null:s(w,p,""+T,M);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case B:return T.key===tt?m(w,p,T,M):null;case L:return T.key===tt?x(w,p,T,M):null;case H:return T=Yn(T),A(w,p,T,M)}if(Lt(T)||I(T))return tt!==null?null:_(w,p,T,M,null);if(typeof T.then=="function")return A(w,p,ri(T),M);if(T.$$typeof===Y)return A(w,p,li(w,T),M);si(w,T)}return null}function C(w,p,T,M,tt){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return w=w.get(T)||null,s(p,w,""+M,tt);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case B:return w=w.get(M.key===null?T:M.key)||null,m(p,w,M,tt);case L:return w=w.get(M.key===null?T:M.key)||null,x(p,w,M,tt);case H:return M=Yn(M),C(w,p,T,M,tt)}if(Lt(M)||I(M))return w=w.get(T)||null,_(p,w,M,tt,null);if(typeof M.then=="function")return C(w,p,T,ri(M),tt);if(M.$$typeof===Y)return C(w,p,T,li(p,M),tt);si(p,M)}return null}function J(w,p,T,M){for(var tt=null,bt=null,W=p,st=p=0,pt=null;W!==null&&st<T.length;st++){W.index>st?(pt=W,W=null):pt=W.sibling;var St=A(w,W,T[st],M);if(St===null){W===null&&(W=pt);break}t&&W&&St.alternate===null&&e(w,W),p=i(St,p,st),bt===null?tt=St:bt.sibling=St,bt=St,W=pt}if(st===T.length)return n(w,W),yt&&Ye(w,st),tt;if(W===null){for(;st<T.length;st++)W=R(w,T[st],M),W!==null&&(p=i(W,p,st),bt===null?tt=W:bt.sibling=W,bt=W);return yt&&Ye(w,st),tt}for(W=a(W);st<T.length;st++)pt=C(W,w,st,T[st],M),pt!==null&&(t&&pt.alternate!==null&&W.delete(pt.key===null?st:pt.key),p=i(pt,p,st),bt===null?tt=pt:bt.sibling=pt,bt=pt);return t&&W.forEach(function(Nn){return e(w,Nn)}),yt&&Ye(w,st),tt}function lt(w,p,T,M){if(T==null)throw Error(c(151));for(var tt=null,bt=null,W=p,st=p=0,pt=null,St=T.next();W!==null&&!St.done;st++,St=T.next()){W.index>st?(pt=W,W=null):pt=W.sibling;var Nn=A(w,W,St.value,M);if(Nn===null){W===null&&(W=pt);break}t&&W&&Nn.alternate===null&&e(w,W),p=i(Nn,p,st),bt===null?tt=Nn:bt.sibling=Nn,bt=Nn,W=pt}if(St.done)return n(w,W),yt&&Ye(w,st),tt;if(W===null){for(;!St.done;st++,St=T.next())St=R(w,St.value,M),St!==null&&(p=i(St,p,st),bt===null?tt=St:bt.sibling=St,bt=St);return yt&&Ye(w,st),tt}for(W=a(W);!St.done;st++,St=T.next())St=C(W,w,st,St.value,M),St!==null&&(t&&St.alternate!==null&&W.delete(St.key===null?st:St.key),p=i(St,p,st),bt===null?tt=St:bt.sibling=St,bt=St);return t&&W.forEach(function(Bg){return e(w,Bg)}),yt&&Ye(w,st),tt}function Mt(w,p,T,M){if(typeof T=="object"&&T!==null&&T.type===j&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case B:t:{for(var tt=T.key;p!==null;){if(p.key===tt){if(tt=T.type,tt===j){if(p.tag===7){n(w,p.sibling),M=l(p,T.props.children),M.return=w,w=M;break t}}else if(p.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===H&&Yn(tt)===p.type){n(w,p.sibling),M=l(p,T.props),ll(M,T),M.return=w,w=M;break t}n(w,p);break}else e(w,p);p=p.sibling}T.type===j?(M=Hn(T.props.children,w.mode,M,T.key),M.return=w,w=M):(M=ei(T.type,T.key,T.props,null,w.mode,M),ll(M,T),M.return=w,w=M)}return u(w);case L:t:{for(tt=T.key;p!==null;){if(p.key===tt)if(p.tag===4&&p.stateNode.containerInfo===T.containerInfo&&p.stateNode.implementation===T.implementation){n(w,p.sibling),M=l(p,T.children||[]),M.return=w,w=M;break t}else{n(w,p);break}else e(w,p);p=p.sibling}M=qu(T,w.mode,M),M.return=w,w=M}return u(w);case H:return T=Yn(T),Mt(w,p,T,M)}if(Lt(T))return J(w,p,T,M);if(I(T)){if(tt=I(T),typeof tt!="function")throw Error(c(150));return T=tt.call(T),lt(w,p,T,M)}if(typeof T.then=="function")return Mt(w,p,ri(T),M);if(T.$$typeof===Y)return Mt(w,p,li(w,T),M);si(w,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,p!==null&&p.tag===6?(n(w,p.sibling),M=l(p,T),M.return=w,w=M):(n(w,p),M=Lu(T,w.mode,M),M.return=w,w=M),u(w)):n(w,p)}return function(w,p,T,M){try{al=0;var tt=Mt(w,p,T,M);return va=null,tt}catch(W){if(W===ya||W===ui)throw W;var bt=fe(29,W,null,w.mode);return bt.lanes=M,bt.return=w,bt}finally{}}}var Qn=So(!0),wo=So(!1),on=!1;function $u(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Pu(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(Et&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=ti(t),ao(t,null,n),e}return Pl(t,a,e,n),ti(t)}function il(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,fs(t,n)}}function tc(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var ec=!1;function ul(){if(ec){var t=pa;if(t!==null)throw t}}function cl(t,e,n,a){ec=!1;var l=t.updateQueue;on=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var m=s,x=m.next;m.next=null,u===null?i=x:u.next=x,u=m;var _=t.alternate;_!==null&&(_=_.updateQueue,s=_.lastBaseUpdate,s!==u&&(s===null?_.firstBaseUpdate=x:s.next=x,_.lastBaseUpdate=m))}if(i!==null){var R=l.baseState;u=0,_=x=m=null,s=i;do{var A=s.lane&-536870913,C=A!==s.lane;if(C?(gt&A)===A:(a&A)===A){A!==0&&A===ga&&(ec=!0),_!==null&&(_=_.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});t:{var J=t,lt=s;A=e;var Mt=n;switch(lt.tag){case 1:if(J=lt.payload,typeof J=="function"){R=J.call(Mt,R,A);break t}R=J;break t;case 3:J.flags=J.flags&-65537|128;case 0:if(J=lt.payload,A=typeof J=="function"?J.call(Mt,R,A):J,A==null)break t;R=D({},R,A);break t;case 2:on=!0}}A=s.callback,A!==null&&(t.flags|=64,C&&(t.flags|=8192),C=l.callbacks,C===null?l.callbacks=[A]:C.push(A))}else C={lane:A,tag:s.tag,payload:s.payload,callback:s.callback,next:null},_===null?(x=_=C,m=R):_=_.next=C,u|=A;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;C=s,s=C.next,C.next=null,l.lastBaseUpdate=C,l.shared.pending=null}}while(!0);_===null&&(m=R),l.baseState=m,l.firstBaseUpdate=x,l.lastBaseUpdate=_,i===null&&(l.shared.lanes=0),yn|=u,t.lanes=u,t.memoizedState=R}}function Eo(t,e){if(typeof t!="function")throw Error(c(191,t));t.call(e)}function To(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)Eo(n[t],e)}var ba=y(null),oi=y(0);function xo(t,e){t=$e,Q(oi,t),Q(ba,e),$e=t|e.baseLanes}function nc(){Q(oi,$e),Q(ba,ba.current)}function ac(){$e=oi.current,z(ba),z(oi)}var de=y(null),xe=null;function hn(t){var e=t.alternate;Q(Ut,Ut.current&1),Q(de,t),xe===null&&(e===null||ba.current!==null||e.memoizedState!==null)&&(xe=t)}function lc(t){Q(Ut,Ut.current),Q(de,t),xe===null&&(xe=t)}function Ao(t){t.tag===22?(Q(Ut,Ut.current),Q(de,t),xe===null&&(xe=t)):mn()}function mn(){Q(Ut,Ut.current),Q(de,de.current)}function he(t){z(de),xe===t&&(xe=null),z(Ut)}var Ut=y(0);function fi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||or(n)||fr(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ve=0,rt=null,Nt=null,Yt=null,di=!1,Sa=!1,Vn=!1,hi=0,rl=0,wa=null,Am=0;function Bt(){throw Error(c(321))}function ic(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!oe(t[n],e[n]))return!1;return!0}function uc(t,e,n,a,l,i){return Ve=i,rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,N.H=t===null||t.memoizedState===null?sf:wc,Vn=!1,i=n(a,l),Vn=!1,Sa&&(i=No(e,n,a,l)),Co(t),i}function Co(t){N.H=fl;var e=Nt!==null&&Nt.next!==null;if(Ve=0,Yt=Nt=rt=null,di=!1,rl=0,wa=null,e)throw Error(c(300));t===null||Gt||(t=t.dependencies,t!==null&&ai(t)&&(Gt=!0))}function No(t,e,n,a){rt=t;var l=0;do{if(Sa&&(wa=null),rl=0,Sa=!1,25<=l)throw Error(c(301));if(l+=1,Yt=Nt=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}N.H=of,i=e(n,a)}while(Sa);return i}function Cm(){var t=N.H,e=t.useState()[0];return e=typeof e.then=="function"?sl(e):e,t=t.useState()[0],(Nt!==null?Nt.memoizedState:null)!==t&&(rt.flags|=1024),e}function cc(){var t=hi!==0;return hi=0,t}function rc(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function sc(t){if(di){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}di=!1}Ve=0,Yt=Nt=rt=null,Sa=!1,rl=hi=0,wa=null}function Pt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Yt===null?rt.memoizedState=Yt=t:Yt=Yt.next=t,Yt}function jt(){if(Nt===null){var t=rt.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=Yt===null?rt.memoizedState:Yt.next;if(e!==null)Yt=e,Nt=t;else{if(t===null)throw rt.alternate===null?Error(c(467)):Error(c(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},Yt===null?rt.memoizedState=Yt=t:Yt=Yt.next=t}return Yt}function mi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function sl(t){var e=rl;return rl+=1,wa===null&&(wa=[]),t=yo(wa,t,e),e=rt,(Yt===null?e.memoizedState:Yt.next)===null&&(e=e.alternate,N.H=e===null||e.memoizedState===null?sf:wc),t}function gi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return sl(t);if(t.$$typeof===Y)return Ft(t)}throw Error(c(438,String(t)))}function oc(t){var e=null,n=rt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=rt.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=mi(),rt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=et;return e.index++,n}function Xe(t,e){return typeof e=="function"?e(t):e}function pi(t){var e=jt();return fc(e,Nt,t)}function fc(t,e,n){var a=t.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var s=u=null,m=null,x=e,_=!1;do{var R=x.lane&-536870913;if(R!==x.lane?(gt&R)===R:(Ve&R)===R){var A=x.revertLane;if(A===0)m!==null&&(m=m.next={lane:0,revertLane:0,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),R===ga&&(_=!0);else if((Ve&A)===A){x=x.next,A===ga&&(_=!0);continue}else R={lane:0,revertLane:x.revertLane,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},m===null?(s=m=R,u=i):m=m.next=R,rt.lanes|=A,yn|=A;R=x.action,Vn&&n(i,R),i=x.hasEagerState?x.eagerState:n(i,R)}else A={lane:R,revertLane:x.revertLane,gesture:x.gesture,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},m===null?(s=m=A,u=i):m=m.next=A,rt.lanes|=R,yn|=R;x=x.next}while(x!==null&&x!==e);if(m===null?u=i:m.next=s,!oe(i,t.memoizedState)&&(Gt=!0,_&&(n=pa,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=m,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function dc(t){var e=jt(),n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=t(i,u.action),u=u.next;while(u!==l);oe(i,e.memoizedState)||(Gt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function _o(t,e,n){var a=rt,l=jt(),i=yt;if(i){if(n===void 0)throw Error(c(407));n=n()}else n=e();var u=!oe((Nt||l).memoizedState,n);if(u&&(l.memoizedState=n,Gt=!0),l=l.queue,gc(zo.bind(null,a,l,t),[t]),l.getSnapshot!==e||u||Yt!==null&&Yt.memoizedState.tag&1){if(a.flags|=2048,Ea(9,{destroy:void 0},Ro.bind(null,a,l,n,e),null),Rt===null)throw Error(c(349));i||(Ve&127)!==0||Mo(a,e,n)}return n}function Mo(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=rt.updateQueue,e===null?(e=mi(),rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Ro(t,e,n,a){e.value=n,e.getSnapshot=a,Do(e)&&Oo(t)}function zo(t,e,n){return n(function(){Do(e)&&Oo(t)})}function Do(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!oe(t,n)}catch{return!0}}function Oo(t){var e=Bn(t,2);e!==null&&ue(e,t,2)}function hc(t){var e=Pt();if(typeof t=="function"){var n=t;if(t=n(),Vn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xe,lastRenderedState:t},e}function ko(t,e,n,a){return t.baseState=n,fc(t,Nt,typeof a=="function"?a:Xe)}function Nm(t,e,n,a,l){if(bi(t))throw Error(c(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};N.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,Bo(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Bo(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=N.T,u={};N.T=u;try{var s=n(l,a),m=N.S;m!==null&&m(u,s),Ho(t,e,s)}catch(x){mc(t,e,x)}finally{i!==null&&u.types!==null&&(i.types=u.types),N.T=i}}else try{i=n(l,a),Ho(t,e,i)}catch(x){mc(t,e,x)}}function Ho(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Uo(t,e,a)},function(a){return mc(t,e,a)}):Uo(t,e,n)}function Uo(t,e,n){e.status="fulfilled",e.value=n,jo(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Bo(t,n)))}function mc(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,jo(e),e=e.next;while(e!==a)}t.action=null}function jo(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Lo(t,e){return e}function qo(t,e){if(yt){var n=Rt.formState;if(n!==null){t:{var a=rt;if(yt){if(Dt){e:{for(var l=Dt,i=Te;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ae(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){Dt=Ae(l.nextSibling),a=l.data==="F!";break t}}rn(a)}a=!1}a&&(e=n[0])}}return n=Pt(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lo,lastRenderedState:e},n.queue=a,n=uf.bind(null,rt,a),a.dispatch=n,a=hc(!1),i=Sc.bind(null,rt,!1,a.queue),a=Pt(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=Nm.bind(null,rt,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Yo(t){var e=jt();return Go(e,Nt,t)}function Go(t,e,n){if(e=fc(t,e,Lo)[0],t=pi(Xe)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=sl(e)}catch(u){throw u===ya?ui:u}else a=e;e=jt();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(rt.flags|=2048,Ea(9,{destroy:void 0},_m.bind(null,l,n),null)),[a,i,t]}function _m(t,e){t.action=e}function Qo(t){var e=jt(),n=Nt;if(n!==null)return Go(e,n,t);jt(),e=e.memoizedState,n=jt();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function Ea(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=rt.updateQueue,e===null&&(e=mi(),rt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Vo(){return jt().memoizedState}function yi(t,e,n,a){var l=Pt();rt.flags|=t,l.memoizedState=Ea(1|e,{destroy:void 0},n,a===void 0?null:a)}function vi(t,e,n,a){var l=jt();a=a===void 0?null:a;var i=l.memoizedState.inst;Nt!==null&&a!==null&&ic(a,Nt.memoizedState.deps)?l.memoizedState=Ea(e,i,n,a):(rt.flags|=t,l.memoizedState=Ea(1|e,i,n,a))}function Xo(t,e){yi(8390656,8,t,e)}function gc(t,e){vi(2048,8,t,e)}function Mm(t){rt.flags|=4;var e=rt.updateQueue;if(e===null)e=mi(),rt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Zo(t){var e=jt().memoizedState;return Mm({ref:e,nextImpl:t}),function(){if((Et&2)!==0)throw Error(c(440));return e.impl.apply(void 0,arguments)}}function Ko(t,e){return vi(4,2,t,e)}function Jo(t,e){return vi(4,4,t,e)}function Fo(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Io(t,e,n){n=n!=null?n.concat([t]):null,vi(4,4,Fo.bind(null,e,t),n)}function pc(){}function Wo(t,e){var n=jt();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&ic(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function $o(t,e){var n=jt();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&ic(e,a[1]))return a[0];if(a=t(),Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function yc(t,e,n){return n===void 0||(Ve&1073741824)!==0&&(gt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=td(),rt.lanes|=t,yn|=t,n)}function Po(t,e,n,a){return oe(n,e)?n:ba.current!==null?(t=yc(t,n,a),oe(t,e)||(Gt=!0),t):(Ve&42)===0||(Ve&1073741824)!==0&&(gt&261930)===0?(Gt=!0,t.memoizedState=n):(t=td(),rt.lanes|=t,yn|=t,e)}function tf(t,e,n,a,l){var i=Z.p;Z.p=i!==0&&8>i?i:8;var u=N.T,s={};N.T=s,Sc(t,!1,e,n);try{var m=l(),x=N.S;if(x!==null&&x(s,m),m!==null&&typeof m=="object"&&typeof m.then=="function"){var _=xm(m,a);ol(t,e,_,pe(t))}else ol(t,e,a,pe(t))}catch(R){ol(t,e,{then:function(){},status:"rejected",reason:R},pe())}finally{Z.p=i,u!==null&&s.types!==null&&(u.types=s.types),N.T=u}}function Rm(){}function vc(t,e,n,a){if(t.tag!==5)throw Error(c(476));var l=ef(t).queue;tf(t,l,e,at,n===null?Rm:function(){return nf(t),n(a)})}function ef(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:at,baseState:at,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xe,lastRenderedState:at},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xe,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function nf(t){var e=ef(t);e.next===null&&(e=t.alternate.memoizedState),ol(t,e.next.queue,{},pe())}function bc(){return Ft(Nl)}function af(){return jt().memoizedState}function lf(){return jt().memoizedState}function zm(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=pe();t=fn(n);var a=dn(e,t,n);a!==null&&(ue(a,e,n),il(a,e,n)),e={cache:Ju()},t.payload=e;return}e=e.return}}function Dm(t,e,n){var a=pe();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},bi(t)?cf(e,n):(n=Uu(t,e,n,a),n!==null&&(ue(n,t,a),rf(n,e,a)))}function uf(t,e,n){var a=pe();ol(t,e,n,a)}function ol(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(bi(t))cf(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,s=i(u,n);if(l.hasEagerState=!0,l.eagerState=s,oe(s,u))return Pl(t,e,l,0),Rt===null&&$l(),!1}catch{}finally{}if(n=Uu(t,e,l,a),n!==null)return ue(n,t,a),rf(n,e,a),!0}return!1}function Sc(t,e,n,a){if(a={lane:2,revertLane:$c(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},bi(t)){if(e)throw Error(c(479))}else e=Uu(t,n,a,2),e!==null&&ue(e,t,2)}function bi(t){var e=t.alternate;return t===rt||e!==null&&e===rt}function cf(t,e){Sa=di=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function rf(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,fs(t,n)}}var fl={readContext:Ft,use:gi,useCallback:Bt,useContext:Bt,useEffect:Bt,useImperativeHandle:Bt,useLayoutEffect:Bt,useInsertionEffect:Bt,useMemo:Bt,useReducer:Bt,useRef:Bt,useState:Bt,useDebugValue:Bt,useDeferredValue:Bt,useTransition:Bt,useSyncExternalStore:Bt,useId:Bt,useHostTransitionStatus:Bt,useFormState:Bt,useActionState:Bt,useOptimistic:Bt,useMemoCache:Bt,useCacheRefresh:Bt};fl.useEffectEvent=Bt;var sf={readContext:Ft,use:gi,useCallback:function(t,e){return Pt().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:Xo,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,yi(4194308,4,Fo.bind(null,e,t),n)},useLayoutEffect:function(t,e){return yi(4194308,4,t,e)},useInsertionEffect:function(t,e){yi(4,2,t,e)},useMemo:function(t,e){var n=Pt();e=e===void 0?null:e;var a=t();if(Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=Pt();if(n!==void 0){var l=n(e);if(Vn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=Dm.bind(null,rt,t),[a.memoizedState,t]},useRef:function(t){var e=Pt();return t={current:t},e.memoizedState=t},useState:function(t){t=hc(t);var e=t.queue,n=uf.bind(null,rt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:pc,useDeferredValue:function(t,e){var n=Pt();return yc(n,t,e)},useTransition:function(){var t=hc(!1);return t=tf.bind(null,rt,t.queue,!0,!1),Pt().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=rt,l=Pt();if(yt){if(n===void 0)throw Error(c(407));n=n()}else{if(n=e(),Rt===null)throw Error(c(349));(gt&127)!==0||Mo(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,Xo(zo.bind(null,a,i,t),[t]),a.flags|=2048,Ea(9,{destroy:void 0},Ro.bind(null,a,i,n,e),null),n},useId:function(){var t=Pt(),e=Rt.identifierPrefix;if(yt){var n=De,a=ze;n=(a&~(1<<32-se(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=hi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Am++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:bc,useFormState:qo,useActionState:qo,useOptimistic:function(t){var e=Pt();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Sc.bind(null,rt,!0,n),n.dispatch=e,[t,e]},useMemoCache:oc,useCacheRefresh:function(){return Pt().memoizedState=zm.bind(null,rt)},useEffectEvent:function(t){var e=Pt(),n={impl:t};return e.memoizedState=n,function(){if((Et&2)!==0)throw Error(c(440));return n.impl.apply(void 0,arguments)}}},wc={readContext:Ft,use:gi,useCallback:Wo,useContext:Ft,useEffect:gc,useImperativeHandle:Io,useInsertionEffect:Ko,useLayoutEffect:Jo,useMemo:$o,useReducer:pi,useRef:Vo,useState:function(){return pi(Xe)},useDebugValue:pc,useDeferredValue:function(t,e){var n=jt();return Po(n,Nt.memoizedState,t,e)},useTransition:function(){var t=pi(Xe)[0],e=jt().memoizedState;return[typeof t=="boolean"?t:sl(t),e]},useSyncExternalStore:_o,useId:af,useHostTransitionStatus:bc,useFormState:Yo,useActionState:Yo,useOptimistic:function(t,e){var n=jt();return ko(n,Nt,t,e)},useMemoCache:oc,useCacheRefresh:lf};wc.useEffectEvent=Zo;var of={readContext:Ft,use:gi,useCallback:Wo,useContext:Ft,useEffect:gc,useImperativeHandle:Io,useInsertionEffect:Ko,useLayoutEffect:Jo,useMemo:$o,useReducer:dc,useRef:Vo,useState:function(){return dc(Xe)},useDebugValue:pc,useDeferredValue:function(t,e){var n=jt();return Nt===null?yc(n,t,e):Po(n,Nt.memoizedState,t,e)},useTransition:function(){var t=dc(Xe)[0],e=jt().memoizedState;return[typeof t=="boolean"?t:sl(t),e]},useSyncExternalStore:_o,useId:af,useHostTransitionStatus:bc,useFormState:Qo,useActionState:Qo,useOptimistic:function(t,e){var n=jt();return Nt!==null?ko(n,Nt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:oc,useCacheRefresh:lf};of.useEffectEvent=Zo;function Ec(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:D({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Tc={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=pe(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(ue(e,t,a),il(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=pe(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(ue(e,t,a),il(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=pe(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(ue(e,t,n),il(e,t,n))}};function ff(t,e,n,a,l,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,u):e.prototype&&e.prototype.isPureReactComponent?!Wa(n,a)||!Wa(l,i):!0}function df(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&Tc.enqueueReplaceState(e,e.state,null)}function Xn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=D({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function hf(t){Wl(t)}function mf(t){console.error(t)}function gf(t){Wl(t)}function Si(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function pf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function xc(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){Si(t,e)},n}function yf(t){return t=fn(t),t.tag=3,t}function vf(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){pf(e,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){pf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var s=a.stack;this.componentDidCatch(a.value,{componentStack:s!==null?s:""})})}function Om(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&ma(e,n,l,!0),n=de.current,n!==null){switch(n.tag){case 31:case 13:return xe===null?Di():n.alternate===null&&Ht===0&&(Ht=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===ci?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Fc(t,a,l)),!1;case 22:return n.flags|=65536,a===ci?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Fc(t,a,l)),!1}throw Error(c(435,n.tag))}return Fc(t,a,l),Di(),!1}if(yt)return e=de.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Qu&&(t=Error(c(422),{cause:a}),tl(Se(t,n)))):(a!==Qu&&(e=Error(c(423),{cause:a}),tl(Se(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=Se(a,n),l=xc(t.stateNode,a,l),tc(t,l),Ht!==4&&(Ht=2)),!1;var i=Error(c(520),{cause:a});if(i=Se(i,n),bl===null?bl=[i]:bl.push(i),Ht!==4&&(Ht=2),e===null)return!0;a=Se(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=xc(n.stateNode,a,t),tc(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=yf(l),vf(l,t,n,a),tc(n,l),!1}n=n.return}while(n!==null);return!1}var Ac=Error(c(461)),Gt=!1;function It(t,e,n,a){e.child=t===null?wo(e,null,n,a):Qn(e,t.child,n,a)}function bf(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var u={};for(var s in a)s!=="ref"&&(u[s]=a[s])}else u=a;return Ln(e),a=uc(t,e,n,u,i,l),s=cc(),t!==null&&!Gt?(rc(t,e,l),Ze(t,e,l)):(yt&&s&&Yu(e),e.flags|=1,It(t,e,a,l),e.child)}function Sf(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!ju(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,wf(t,e,i,a,l)):(t=ei(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Oc(t,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Wa,n(u,a)&&t.ref===e.ref)return Ze(t,e,l)}return e.flags|=1,t=qe(i,a),t.ref=e.ref,t.return=e,e.child=t}function wf(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if(Wa(i,a)&&t.ref===e.ref)if(Gt=!1,e.pendingProps=a=i,Oc(t,l))(t.flags&131072)!==0&&(Gt=!0);else return e.lanes=t.lanes,Ze(t,e,l)}return Cc(t,e,n,a,l)}function Ef(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return Tf(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&ii(e,i!==null?i.cachePool:null),i!==null?xo(e,i):nc(),Ao(e);else return a=e.lanes=536870912,Tf(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(ii(e,i.cachePool),xo(e,i),mn(),e.memoizedState=null):(t!==null&&ii(e,null),nc(),mn());return It(t,e,l,n),e.child}function dl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Tf(t,e,n,a,l){var i=Iu();return i=i===null?null:{parent:qt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&ii(e,null),nc(),Ao(e),t!==null&&ma(t,e,a,!0),e.childLanes=l,null}function wi(t,e){return e=Ti({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function xf(t,e,n){return Qn(e,t.child,null,n),t=wi(e,e.pendingProps),t.flags|=2,he(e),e.memoizedState=null,t}function km(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(yt){if(a.mode==="hidden")return t=wi(e,a),e.lanes=536870912,dl(null,t);if(lc(e),(t=Dt)?(t=Hd(t,Te),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:ze,overflow:De}:null,retryLane:536870912,hydrationErrors:null},n=io(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw rn(e);return e.lanes=536870912,null}return wi(e,a)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(lc(e),l)if(e.flags&256)e.flags&=-257,e=xf(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(c(558));else if(Gt||ma(t,e,n,!1),l=(n&t.childLanes)!==0,Gt||l){if(a=Rt,a!==null&&(u=ds(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Bn(t,u),ue(a,t,u),Ac;Di(),e=xf(t,e,n)}else t=i.treeContext,Dt=Ae(u.nextSibling),Jt=e,yt=!0,cn=null,Te=!1,t!==null&&ro(e,t),e=wi(e,a),e.flags|=4096;return e}return t=qe(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ei(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(c(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Cc(t,e,n,a,l){return Ln(e),n=uc(t,e,n,a,void 0,l),a=cc(),t!==null&&!Gt?(rc(t,e,l),Ze(t,e,l)):(yt&&a&&Yu(e),e.flags|=1,It(t,e,n,l),e.child)}function Af(t,e,n,a,l,i){return Ln(e),e.updateQueue=null,n=No(e,a,n,l),Co(t),a=cc(),t!==null&&!Gt?(rc(t,e,i),Ze(t,e,i)):(yt&&a&&Yu(e),e.flags|=1,It(t,e,n,i),e.child)}function Cf(t,e,n,a,l){if(Ln(e),e.stateNode===null){var i=oa,u=n.contextType;typeof u=="object"&&u!==null&&(i=Ft(u)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Tc,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},$u(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?Ft(u):oa,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(Ec(e,n,u,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Tc.enqueueReplaceState(i,i.state,null),cl(e,a,i,l),ul(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var s=e.memoizedProps,m=Xn(n,s);i.props=m;var x=i.context,_=n.contextType;u=oa,typeof _=="object"&&_!==null&&(u=Ft(_));var R=n.getDerivedStateFromProps;_=typeof R=="function"||typeof i.getSnapshotBeforeUpdate=="function",s=e.pendingProps!==s,_||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s||x!==u)&&df(e,i,a,u),on=!1;var A=e.memoizedState;i.state=A,cl(e,a,i,l),ul(),x=e.memoizedState,s||A!==x||on?(typeof R=="function"&&(Ec(e,n,R,a),x=e.memoizedState),(m=on||ff(e,n,m,a,A,x,u))?(_||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=x),i.props=a,i.state=x,i.context=u,a=m):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,Pu(t,e),u=e.memoizedProps,_=Xn(n,u),i.props=_,R=e.pendingProps,A=i.context,x=n.contextType,m=oa,typeof x=="object"&&x!==null&&(m=Ft(x)),s=n.getDerivedStateFromProps,(x=typeof s=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==R||A!==m)&&df(e,i,a,m),on=!1,A=e.memoizedState,i.state=A,cl(e,a,i,l),ul();var C=e.memoizedState;u!==R||A!==C||on||t!==null&&t.dependencies!==null&&ai(t.dependencies)?(typeof s=="function"&&(Ec(e,n,s,a),C=e.memoizedState),(_=on||ff(e,n,_,a,A,C,m)||t!==null&&t.dependencies!==null&&ai(t.dependencies))?(x||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,C,m),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,C,m)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=C),i.props=a,i.state=C,i.context=m,a=_):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,Ei(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Qn(e,t.child,null,l),e.child=Qn(e,null,n,l)):It(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ze(t,e,l),t}function Nf(t,e,n,a){return Un(),e.flags|=256,It(t,e,n,a),e.child}var Nc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function _c(t){return{baseLanes:t,cachePool:go()}}function Mc(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=ge),t}function _f(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(Ut.current&2)!==0),u&&(l=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(yt){if(l?hn(e):mn(),(t=Dt)?(t=Hd(t,Te),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:ze,overflow:De}:null,retryLane:536870912,hydrationErrors:null},n=io(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw rn(e);return fr(t)?e.lanes=32:e.lanes=536870912,null}var s=a.children;return a=a.fallback,l?(mn(),l=e.mode,s=Ti({mode:"hidden",children:s},l),a=Hn(a,l,n,null),s.return=e,a.return=e,s.sibling=a,e.child=s,a=e.child,a.memoizedState=_c(n),a.childLanes=Mc(t,u,n),e.memoizedState=Nc,dl(null,a)):(hn(e),Rc(e,s))}var m=t.memoizedState;if(m!==null&&(s=m.dehydrated,s!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=zc(t,e,n)):e.memoizedState!==null?(mn(),e.child=t.child,e.flags|=128,e=null):(mn(),s=a.fallback,l=e.mode,a=Ti({mode:"visible",children:a.children},l),s=Hn(s,l,n,null),s.flags|=2,a.return=e,s.return=e,a.sibling=s,e.child=a,Qn(e,t.child,null,n),a=e.child,a.memoizedState=_c(n),a.childLanes=Mc(t,u,n),e.memoizedState=Nc,e=dl(null,a));else if(hn(e),fr(s)){if(u=s.nextSibling&&s.nextSibling.dataset,u)var x=u.dgst;u=x,a=Error(c(419)),a.stack="",a.digest=u,tl({value:a,source:null,stack:null}),e=zc(t,e,n)}else if(Gt||ma(t,e,n,!1),u=(n&t.childLanes)!==0,Gt||u){if(u=Rt,u!==null&&(a=ds(u,n),a!==0&&a!==m.retryLane))throw m.retryLane=a,Bn(t,a),ue(u,t,a),Ac;or(s)||Di(),e=zc(t,e,n)}else or(s)?(e.flags|=192,e.child=t.child,e=null):(t=m.treeContext,Dt=Ae(s.nextSibling),Jt=e,yt=!0,cn=null,Te=!1,t!==null&&ro(e,t),e=Rc(e,a.children),e.flags|=4096);return e}return l?(mn(),s=a.fallback,l=e.mode,m=t.child,x=m.sibling,a=qe(m,{mode:"hidden",children:a.children}),a.subtreeFlags=m.subtreeFlags&65011712,x!==null?s=qe(x,s):(s=Hn(s,l,n,null),s.flags|=2),s.return=e,a.return=e,a.sibling=s,e.child=a,dl(null,a),a=e.child,s=t.child.memoizedState,s===null?s=_c(n):(l=s.cachePool,l!==null?(m=qt._currentValue,l=l.parent!==m?{parent:m,pool:m}:l):l=go(),s={baseLanes:s.baseLanes|n,cachePool:l}),a.memoizedState=s,a.childLanes=Mc(t,u,n),e.memoizedState=Nc,dl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=qe(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function Rc(t,e){return e=Ti({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ti(t,e){return t=fe(22,t,null,e),t.lanes=0,t}function zc(t,e,n){return Qn(e,t.child,null,n),t=Rc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Mf(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Zu(t.return,e,n)}function Dc(t,e,n,a,l,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function Rf(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=Ut.current,s=(u&2)!==0;if(s?(u=u&1|2,e.flags|=128):u&=1,Q(Ut,u),It(t,e,a,n),a=yt?Pa:0,!s&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Mf(t,n,e);else if(t.tag===19)Mf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&fi(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),Dc(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&fi(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}Dc(e,!0,n,null,i,a);break;case"together":Dc(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ma(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(c(153));if(e.child!==null){for(t=e.child,n=qe(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=qe(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Oc(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ai(t)))}function Bm(t,e,n){switch(e.tag){case 3:zt(e,e.stateNode.containerInfo),sn(e,qt,t.memoizedState.cache),Un();break;case 27:case 5:He(e);break;case 4:zt(e,e.stateNode.containerInfo);break;case 10:sn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,lc(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?_f(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(ma(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return Rf(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Q(Ut,Ut.current),a)break;return null;case 22:return e.lanes=0,Ef(t,e,n,e.pendingProps);case 24:sn(e,qt,t.memoizedState.cache)}return Ze(t,e,n)}function zf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Gt=!0;else{if(!Oc(t,n)&&(e.flags&128)===0)return Gt=!1,Bm(t,e,n);Gt=(t.flags&131072)!==0}else Gt=!1,yt&&(e.flags&1048576)!==0&&co(e,Pa,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=Yn(e.elementType),e.type=t,typeof t=="function")ju(t)?(a=Xn(t,a),e.tag=1,e=Cf(null,e,t,a,n)):(e.tag=0,e=Cc(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===K){e.tag=11,e=bf(null,e,t,a,n);break t}else if(l===U){e.tag=14,e=Sf(null,e,t,a,n);break t}}throw e=it(t)||t,Error(c(306,e,""))}}return e;case 0:return Cc(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Xn(a,e.pendingProps),Cf(t,e,a,l,n);case 3:t:{if(zt(e,e.stateNode.containerInfo),t===null)throw Error(c(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,Pu(t,e),cl(e,a,null,n);var u=e.memoizedState;if(a=u.cache,sn(e,qt,a),a!==i.cache&&Ku(e,[qt],n,!0),ul(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Nf(t,e,a,n);break t}else if(a!==l){l=Se(Error(c(424)),e),tl(l),e=Nf(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Dt=Ae(t.firstChild),Jt=e,yt=!0,cn=null,Te=!0,n=wo(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Un(),a===l){e=Ze(t,e,n);break t}It(t,e,a,n)}e=e.child}return e;case 26:return Ei(t,e),t===null?(n=Gd(e.type,null,e.pendingProps,null))?e.memoizedState=n:yt||(n=e.type,t=e.pendingProps,a=Li(ft.current).createElement(n),a[Kt]=e,a[te]=t,Wt(a,n,t),Xt(a),e.stateNode=a):e.memoizedState=Gd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return He(e),t===null&&yt&&(a=e.stateNode=Ld(e.type,e.pendingProps,ft.current),Jt=e,Te=!0,l=Dt,En(e.type)?(dr=l,Dt=Ae(a.firstChild)):Dt=l),It(t,e,e.pendingProps.children,n),Ei(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&yt&&((l=a=Dt)&&(a=fg(a,e.type,e.pendingProps,Te),a!==null?(e.stateNode=a,Jt=e,Dt=Ae(a.firstChild),Te=!1,l=!0):l=!1),l||rn(e)),He(e),l=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,a=i.children,cr(l,i)?a=null:u!==null&&cr(l,u)&&(e.flags|=32),e.memoizedState!==null&&(l=uc(t,e,Cm,null,null,n),Nl._currentValue=l),Ei(t,e),It(t,e,a,n),e.child;case 6:return t===null&&yt&&((t=n=Dt)&&(n=dg(n,e.pendingProps,Te),n!==null?(e.stateNode=n,Jt=e,Dt=null,t=!0):t=!1),t||rn(e)),null;case 13:return _f(t,e,n);case 4:return zt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Qn(e,null,a,n):It(t,e,a,n),e.child;case 11:return bf(t,e,e.type,e.pendingProps,n);case 7:return It(t,e,e.pendingProps,n),e.child;case 8:return It(t,e,e.pendingProps.children,n),e.child;case 12:return It(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,sn(e,e.type,a.value),It(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,Ln(e),l=Ft(l),a=a(l),e.flags|=1,It(t,e,a,n),e.child;case 14:return Sf(t,e,e.type,e.pendingProps,n);case 15:return wf(t,e,e.type,e.pendingProps,n);case 19:return Rf(t,e,n);case 31:return km(t,e,n);case 22:return Ef(t,e,n,e.pendingProps);case 24:return Ln(e),a=Ft(qt),t===null?(l=Iu(),l===null&&(l=Rt,i=Ju(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},$u(e),sn(e,qt,l)):((t.lanes&n)!==0&&(Pu(t,e),cl(e,null,null,n),ul()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),sn(e,qt,a)):(a=i.cache,sn(e,qt,a),a!==l.cache&&Ku(e,[qt],n,!0))),It(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(c(156,e.tag))}function Ke(t){t.flags|=4}function kc(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(ld())t.flags|=8192;else throw Gn=ci,Wu}else t.flags&=-16777217}function Df(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Kd(e))if(ld())t.flags|=8192;else throw Gn=ci,Wu}function xi(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?ss():536870912,t.lanes|=e,Ca|=e)}function hl(t,e){if(!yt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function Ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Hm(t,e,n){var a=e.pendingProps;switch(Gu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(e),null;case 1:return Ot(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Qe(qt),Ct(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ha(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Vu())),Ot(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(Ot(e),Df(e,i)):(Ot(e),kc(e,l,null,a,n))):i?i!==t.memoizedState?(Ke(e),Ot(e),Df(e,i)):(Ot(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ke(e),Ot(e),kc(e,l,t,a,n)),null;case 27:if(Bl(e),n=ft.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}t=F.current,ha(e)?so(e):(t=Ld(l,a,n),e.stateNode=t,Ke(e))}return Ot(e),null;case 5:if(Bl(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}if(i=F.current,ha(e))so(e);else{var u=Li(ft.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[Kt]=e,i[te]=a;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch(Wt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ke(e)}}return Ot(e),kc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(c(166));if(t=ft.current,ha(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Jt,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[Kt]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||_d(t.nodeValue,n)),t||rn(e,!0)}else t=Li(t).createTextNode(a),t[Kt]=e,e.stateNode=t}return Ot(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ha(e),n!==null){if(t===null){if(!a)throw Error(c(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(557));t[Kt]=e}else Un(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),t=!1}else n=Vu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(he(e),e):(he(e),null);if((e.flags&128)!==0)throw Error(c(558))}return Ot(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ha(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(c(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(c(317));l[Kt]=e}else Un(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),l=!1}else l=Vu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(he(e),e):(he(e),null)}return he(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),xi(e,e.updateQueue),Ot(e),null);case 4:return Ct(),t===null&&nr(e.stateNode.containerInfo),Ot(e),null;case 10:return Qe(e.type),Ot(e),null;case 19:if(z(Ut),a=e.memoizedState,a===null)return Ot(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)hl(a,!1);else{if(Ht!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=fi(t),i!==null){for(e.flags|=128,hl(a,!1),t=i.updateQueue,e.updateQueue=t,xi(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)lo(n,t),n=n.sibling;return Q(Ut,Ut.current&1|2),yt&&Ye(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&ce()>Mi&&(e.flags|=128,l=!0,hl(a,!1),e.lanes=4194304)}else{if(!l)if(t=fi(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,xi(e,t),hl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!yt)return Ot(e),null}else 2*ce()-a.renderingStartTime>Mi&&n!==536870912&&(e.flags|=128,l=!0,hl(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=ce(),t.sibling=null,n=Ut.current,Q(Ut,l?n&1|2:n&1),yt&&Ye(e,a.treeForkCount),t):(Ot(e),null);case 22:case 23:return he(e),ac(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(Ot(e),e.subtreeFlags&6&&(e.flags|=8192)):Ot(e),n=e.updateQueue,n!==null&&xi(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&z(qn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Qe(qt),Ot(e),null;case 25:return null;case 30:return null}throw Error(c(156,e.tag))}function Um(t,e){switch(Gu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Qe(qt),Ct(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Bl(e),null;case 31:if(e.memoizedState!==null){if(he(e),e.alternate===null)throw Error(c(340));Un()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(he(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(c(340));Un()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return z(Ut),null;case 4:return Ct(),null;case 10:return Qe(e.type),null;case 22:case 23:return he(e),ac(),t!==null&&z(qn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Qe(qt),null;case 25:return null;default:return null}}function Of(t,e){switch(Gu(e),e.tag){case 3:Qe(qt),Ct();break;case 26:case 27:case 5:Bl(e);break;case 4:Ct();break;case 31:e.memoizedState!==null&&he(e);break;case 13:he(e);break;case 19:z(Ut);break;case 10:Qe(e.type);break;case 22:case 23:he(e),ac(),t!==null&&z(qn);break;case 24:Qe(qt)}}function ml(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(s){At(e,e.return,s)}}function gn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var u=a.inst,s=u.destroy;if(s!==void 0){u.destroy=void 0,l=e;var m=n,x=s;try{x()}catch(_){At(l,m,_)}}}a=a.next}while(a!==i)}}catch(_){At(e,e.return,_)}}function kf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{To(e,n)}catch(a){At(t,t.return,a)}}}function Bf(t,e,n){n.props=Xn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){At(t,e,a)}}function gl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){At(t,e,l)}}function Oe(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){At(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){At(t,e,l)}else n.current=null}function Hf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){At(t,t.return,l)}}function Bc(t,e,n){try{var a=t.stateNode;ig(a,t.type,n,e),a[te]=e}catch(l){At(t,t.return,l)}}function Uf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&En(t.type)||t.tag===4}function Hc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Uf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&En(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Uc(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=je));else if(a!==4&&(a===27&&En(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Uc(t,e,n),t=t.sibling;t!==null;)Uc(t,e,n),t=t.sibling}function Ai(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&En(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ai(t,e,n),t=t.sibling;t!==null;)Ai(t,e,n),t=t.sibling}function jf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);Wt(e,a,n),e[Kt]=t,e[te]=n}catch(i){At(t,t.return,i)}}var Je=!1,Qt=!1,jc=!1,Lf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function jm(t,e){if(t=t.containerInfo,ir=Zi,t=Fs(t),zu(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,s=-1,m=-1,x=0,_=0,R=t,A=null;e:for(;;){for(var C;R!==n||l!==0&&R.nodeType!==3||(s=u+l),R!==i||a!==0&&R.nodeType!==3||(m=u+a),R.nodeType===3&&(u+=R.nodeValue.length),(C=R.firstChild)!==null;)A=R,R=C;for(;;){if(R===t)break e;if(A===n&&++x===l&&(s=u),A===i&&++_===a&&(m=u),(C=R.nextSibling)!==null)break;R=A,A=R.parentNode}R=C}n=s===-1||m===-1?null:{start:s,end:m}}else n=null}n=n||{start:0,end:0}}else n=null;for(ur={focusedElem:t,selectionRange:n},Zi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var J=Xn(n.type,l);t=a.getSnapshotBeforeUpdate(J,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(lt){At(n,n.return,lt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)sr(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":sr(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(c(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function qf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Ie(t,n),a&4&&ml(5,n);break;case 1:if(Ie(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){At(n,n.return,u)}else{var l=Xn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){At(n,n.return,u)}}a&64&&kf(n),a&512&&gl(n,n.return);break;case 3:if(Ie(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{To(t,e)}catch(u){At(n,n.return,u)}}break;case 27:e===null&&a&4&&jf(n);case 26:case 5:Ie(t,n),e===null&&a&4&&Hf(n),a&512&&gl(n,n.return);break;case 12:Ie(t,n);break;case 31:Ie(t,n),a&4&&Qf(t,n);break;case 13:Ie(t,n),a&4&&Vf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Km.bind(null,n),hg(t,n))));break;case 22:if(a=n.memoizedState!==null||Je,!a){e=e!==null&&e.memoizedState!==null||Qt,l=Je;var i=Qt;Je=a,(Qt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Ie(t,n),Je=l,Qt=i}break;case 30:break;default:Ie(t,n)}}function Yf(t){var e=t.alternate;e!==null&&(t.alternate=null,Yf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&mu(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var kt=null,ne=!1;function Fe(t,e,n){for(n=n.child;n!==null;)Gf(t,e,n),n=n.sibling}function Gf(t,e,n){if(re&&typeof re.onCommitFiberUnmount=="function")try{re.onCommitFiberUnmount(La,n)}catch{}switch(n.tag){case 26:Qt||Oe(n,e),Fe(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qt||Oe(n,e);var a=kt,l=ne;En(n.type)&&(kt=n.stateNode,ne=!1),Fe(t,e,n),xl(n.stateNode),kt=a,ne=l;break;case 5:Qt||Oe(n,e);case 6:if(a=kt,l=ne,kt=null,Fe(t,e,n),kt=a,ne=l,kt!==null)if(ne)try{(kt.nodeType===9?kt.body:kt.nodeName==="HTML"?kt.ownerDocument.body:kt).removeChild(n.stateNode)}catch(i){At(n,e,i)}else try{kt.removeChild(n.stateNode)}catch(i){At(n,e,i)}break;case 18:kt!==null&&(ne?(t=kt,kd(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ka(t)):kd(kt,n.stateNode));break;case 4:a=kt,l=ne,kt=n.stateNode.containerInfo,ne=!0,Fe(t,e,n),kt=a,ne=l;break;case 0:case 11:case 14:case 15:gn(2,n,e),Qt||gn(4,n,e),Fe(t,e,n);break;case 1:Qt||(Oe(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Bf(n,e,a)),Fe(t,e,n);break;case 21:Fe(t,e,n);break;case 22:Qt=(a=Qt)||n.memoizedState!==null,Fe(t,e,n),Qt=a;break;default:Fe(t,e,n)}}function Qf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ka(t)}catch(n){At(e,e.return,n)}}}function Vf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ka(t)}catch(n){At(e,e.return,n)}}function Lm(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Lf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Lf),e;default:throw Error(c(435,t.tag))}}function Ci(t,e){var n=Lm(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=Jm.bind(null,t,a);a.then(l,l)}})}function ae(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,u=e,s=u;t:for(;s!==null;){switch(s.tag){case 27:if(En(s.type)){kt=s.stateNode,ne=!1;break t}break;case 5:kt=s.stateNode,ne=!1;break t;case 3:case 4:kt=s.stateNode.containerInfo,ne=!0;break t}s=s.return}if(kt===null)throw Error(c(160));Gf(i,u,l),kt=null,ne=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Xf(e,t),e=e.sibling}var Me=null;function Xf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:ae(e,t),le(t),a&4&&(gn(3,t,t.return),ml(3,t),gn(5,t,t.return));break;case 1:ae(e,t),le(t),a&512&&(Qt||n===null||Oe(n,n.return)),a&64&&Je&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Me;if(ae(e,t),le(t),a&512&&(Qt||n===null||Oe(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Ga]||i[Kt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),Wt(i,a,n),i[Kt]=t,Xt(i),a=i;break t;case"link":var u=Xd("link","href",l).get(a+(n.href||""));if(u){for(var s=0;s<u.length;s++)if(i=u[s],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(s,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;case"meta":if(u=Xd("meta","content",l).get(a+(n.content||""))){for(s=0;s<u.length;s++)if(i=u[s],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(s,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;default:throw Error(c(468,a))}i[Kt]=t,Xt(i),a=i}t.stateNode=a}else Zd(l,t.type,t.stateNode);else t.stateNode=Vd(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Zd(l,t.type,t.stateNode):Vd(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Bc(t,t.memoizedProps,n.memoizedProps)}break;case 27:ae(e,t),le(t),a&512&&(Qt||n===null||Oe(n,n.return)),n!==null&&a&4&&Bc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(ae(e,t),le(t),a&512&&(Qt||n===null||Oe(n,n.return)),t.flags&32){l=t.stateNode;try{aa(l,"")}catch(J){At(t,t.return,J)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,Bc(t,l,n!==null?n.memoizedProps:l)),a&1024&&(jc=!0);break;case 6:if(ae(e,t),le(t),a&4){if(t.stateNode===null)throw Error(c(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(J){At(t,t.return,J)}}break;case 3:if(Gi=null,l=Me,Me=qi(e.containerInfo),ae(e,t),Me=l,le(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ka(e.containerInfo)}catch(J){At(t,t.return,J)}jc&&(jc=!1,Zf(t));break;case 4:a=Me,Me=qi(t.stateNode.containerInfo),ae(e,t),le(t),Me=a;break;case 12:ae(e,t),le(t);break;case 31:ae(e,t),le(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 13:ae(e,t),le(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(_i=ce()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 22:l=t.memoizedState!==null;var m=n!==null&&n.memoizedState!==null,x=Je,_=Qt;if(Je=x||l,Qt=_||m,ae(e,t),Qt=_,Je=x,le(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||m||Je||Qt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){m=n=e;try{if(i=m.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{s=m.stateNode;var R=m.memoizedProps.style,A=R!=null&&R.hasOwnProperty("display")?R.display:null;s.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(J){At(m,m.return,J)}}}else if(e.tag===6){if(n===null){m=e;try{m.stateNode.nodeValue=l?"":m.memoizedProps}catch(J){At(m,m.return,J)}}}else if(e.tag===18){if(n===null){m=e;try{var C=m.stateNode;l?Bd(C,!0):Bd(m.stateNode,!1)}catch(J){At(m,m.return,J)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ci(t,n))));break;case 19:ae(e,t),le(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 30:break;case 21:break;default:ae(e,t),le(t)}}function le(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(Uf(a)){n=a;break}a=a.return}if(n==null)throw Error(c(160));switch(n.tag){case 27:var l=n.stateNode,i=Hc(t);Ai(t,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(aa(u,""),n.flags&=-33);var s=Hc(t);Ai(t,s,u);break;case 3:case 4:var m=n.stateNode.containerInfo,x=Hc(t);Uc(t,x,m);break;default:throw Error(c(161))}}catch(_){At(t,t.return,_)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Zf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Zf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Ie(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)qf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:gn(4,e,e.return),Zn(e);break;case 1:Oe(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Bf(e,e.return,n),Zn(e);break;case 27:xl(e.stateNode);case 26:case 5:Oe(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(l,i,n),ml(4,i);break;case 1:if(We(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(x){At(a,a.return,x)}if(a=i,l=a.updateQueue,l!==null){var s=a.stateNode;try{var m=l.shared.hiddenCallbacks;if(m!==null)for(l.shared.hiddenCallbacks=null,l=0;l<m.length;l++)Eo(m[l],s)}catch(x){At(a,a.return,x)}}n&&u&64&&kf(i),gl(i,i.return);break;case 27:jf(i);case 26:case 5:We(l,i,n),n&&a===null&&u&4&&Hf(i),gl(i,i.return);break;case 12:We(l,i,n);break;case 31:We(l,i,n),n&&u&4&&Qf(l,i);break;case 13:We(l,i,n),n&&u&4&&Vf(l,i);break;case 22:i.memoizedState===null&&We(l,i,n),gl(i,i.return);break;case 30:break;default:We(l,i,n)}e=e.sibling}}function Lc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&el(n))}function qc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&el(t))}function Re(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Kf(t,e,n,a),e=e.sibling}function Kf(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:Re(t,e,n,a),l&2048&&ml(9,e);break;case 1:Re(t,e,n,a);break;case 3:Re(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&el(t)));break;case 12:if(l&2048){Re(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,s=i.onPostCommit;typeof s=="function"&&s(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(m){At(e,e.return,m)}}else Re(t,e,n,a);break;case 31:Re(t,e,n,a);break;case 13:Re(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?Re(t,e,n,a):pl(t,e):i._visibility&2?Re(t,e,n,a):(i._visibility|=2,Ta(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&Lc(u,e);break;case 24:Re(t,e,n,a),l&2048&&qc(e.alternate,e);break;default:Re(t,e,n,a)}}function Ta(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,s=n,m=a,x=u.flags;switch(u.tag){case 0:case 11:case 15:Ta(i,u,s,m,l),ml(8,u);break;case 23:break;case 22:var _=u.stateNode;u.memoizedState!==null?_._visibility&2?Ta(i,u,s,m,l):pl(i,u):(_._visibility|=2,Ta(i,u,s,m,l)),l&&x&2048&&Lc(u.alternate,u);break;case 24:Ta(i,u,s,m,l),l&&x&2048&&qc(u.alternate,u);break;default:Ta(i,u,s,m,l)}e=e.sibling}}function pl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:pl(n,a),l&2048&&Lc(a.alternate,a);break;case 24:pl(n,a),l&2048&&qc(a.alternate,a);break;default:pl(n,a)}e=e.sibling}}var yl=8192;function xa(t,e,n){if(t.subtreeFlags&yl)for(t=t.child;t!==null;)Jf(t,e,n),t=t.sibling}function Jf(t,e,n){switch(t.tag){case 26:xa(t,e,n),t.flags&yl&&t.memoizedState!==null&&Ag(n,Me,t.memoizedState,t.memoizedProps);break;case 5:xa(t,e,n);break;case 3:case 4:var a=Me;Me=qi(t.stateNode.containerInfo),xa(t,e,n),Me=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=yl,yl=16777216,xa(t,e,n),yl=a):xa(t,e,n));break;default:xa(t,e,n)}}function Ff(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function vl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,Wf(a,t)}Ff(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)If(t),t=t.sibling}function If(t){switch(t.tag){case 0:case 11:case 15:vl(t),t.flags&2048&&gn(9,t,t.return);break;case 3:vl(t);break;case 12:vl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ni(t)):vl(t);break;default:vl(t)}}function Ni(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,Wf(a,t)}Ff(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:gn(8,e,e.return),Ni(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ni(e));break;default:Ni(e)}t=t.sibling}}function Wf(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:gn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:el(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Zt=a;else t:for(n=t;Zt!==null;){a=Zt;var l=a.sibling,i=a.return;if(Yf(a),a===n){Zt=null;break t}if(l!==null){l.return=i,Zt=l;break t}Zt=i}}}var qm={getCacheForType:function(t){var e=Ft(qt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ft(qt).controller.signal}},Ym=typeof WeakMap=="function"?WeakMap:Map,Et=0,Rt=null,ht=null,gt=0,xt=0,me=null,pn=!1,Aa=!1,Yc=!1,$e=0,Ht=0,yn=0,Kn=0,Gc=0,ge=0,Ca=0,bl=null,ie=null,Qc=!1,_i=0,$f=0,Mi=1/0,Ri=null,vn=null,Vt=0,bn=null,Na=null,Pe=0,Vc=0,Xc=null,Pf=null,Sl=0,Zc=null;function pe(){return(Et&2)!==0&&gt!==0?gt&-gt:N.T!==null?$c():hs()}function td(){if(ge===0)if((gt&536870912)===0||yt){var t=jl;jl<<=1,(jl&3932160)===0&&(jl=262144),ge=t}else ge=536870912;return t=de.current,t!==null&&(t.flags|=32),ge}function ue(t,e,n){(t===Rt&&(xt===2||xt===9)||t.cancelPendingCommit!==null)&&(_a(t,0),Sn(t,gt,ge,!1)),Ya(t,n),((Et&2)===0||t!==Rt)&&(t===Rt&&((Et&2)===0&&(Kn|=n),Ht===4&&Sn(t,gt,ge,!1)),ke(t))}function ed(t,e,n){if((Et&6)!==0)throw Error(c(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||qa(t,e),l=a?Vm(t,e):Jc(t,e,!0),i=a;do{if(l===0){Aa&&!a&&Sn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!Gm(n)){l=Jc(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var s=t;l=bl;var m=s.current.memoizedState.isDehydrated;if(m&&(_a(s,u).flags|=256),u=Jc(s,u,!1),u!==2){if(Yc&&!m){s.errorRecoveryDisabledLanes|=i,Kn|=i,l=4;break t}i=ie,ie=l,i!==null&&(ie===null?ie=i:ie.push.apply(ie,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){_a(t,0),Sn(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(c(345));case 4:if((e&4194048)!==e)break;case 6:Sn(a,e,ge,!pn);break t;case 2:ie=null;break;case 3:case 5:break;default:throw Error(c(329))}if((e&62914560)===e&&(l=_i+300-ce(),10<l)){if(Sn(a,e,ge,!pn),ql(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=Dd(nd.bind(null,a,n,ie,Ri,Qc,e,ge,Kn,Ca,pn,i,"Throttled",-0,0),l);break t}nd(a,n,ie,Ri,Qc,e,ge,Kn,Ca,pn,i,null,-0,0)}}break}while(!0);ke(t)}function nd(t,e,n,a,l,i,u,s,m,x,_,R,A,C){if(t.timeoutHandle=-1,R=e.subtreeFlags,R&8192||(R&16785408)===16785408){R={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:je},Jf(e,i,R);var J=(i&62914560)===i?_i-ce():(i&4194048)===i?$f-ce():0;if(J=Cg(R,J),J!==null){Pe=i,t.cancelPendingCommit=J(od.bind(null,t,e,i,n,a,l,u,s,m,_,R,null,A,C)),Sn(t,i,u,!x);return}}od(t,e,i,n,a,l,u,s,m)}function Gm(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!oe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Sn(t,e,n,a){e&=~Gc,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-se(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&os(t,n,e)}function zi(){return(Et&6)===0?(wl(0),!1):!0}function Kc(){if(ht!==null){if(xt===0)var t=ht.return;else t=ht,Ge=jn=null,sc(t),va=null,al=0,t=ht;for(;t!==null;)Of(t.alternate,t),t=t.return;ht=null}}function _a(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,rg(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Kc(),Rt=t,ht=n=qe(t.current,null),gt=e,xt=0,me=null,pn=!1,Aa=qa(t,e),Yc=!1,Ca=ge=Gc=Kn=yn=Ht=0,ie=bl=null,Qc=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-se(a),i=1<<l;e|=t[l],a&=~i}return $e=e,$l(),n}function ad(t,e){rt=null,N.H=fl,e===ya||e===ui?(e=vo(),xt=3):e===Wu?(e=vo(),xt=4):xt=e===Ac?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,me=e,ht===null&&(Ht=1,Si(t,Se(e,t.current)))}function ld(){var t=de.current;return t===null?!0:(gt&4194048)===gt?xe===null:(gt&62914560)===gt||(gt&536870912)!==0?t===xe:!1}function id(){var t=N.H;return N.H=fl,t===null?fl:t}function ud(){var t=N.A;return N.A=qm,t}function Di(){Ht=4,pn||(gt&4194048)!==gt&&de.current!==null||(Aa=!0),(yn&134217727)===0&&(Kn&134217727)===0||Rt===null||Sn(Rt,gt,ge,!1)}function Jc(t,e,n){var a=Et;Et|=2;var l=id(),i=ud();(Rt!==t||gt!==e)&&(Ri=null,_a(t,e)),e=!1;var u=Ht;t:do try{if(xt!==0&&ht!==null){var s=ht,m=me;switch(xt){case 8:Kc(),u=6;break t;case 3:case 2:case 9:case 6:de.current===null&&(e=!0);var x=xt;if(xt=0,me=null,Ma(t,s,m,x),n&&Aa){u=0;break t}break;default:x=xt,xt=0,me=null,Ma(t,s,m,x)}}Qm(),u=Ht;break}catch(_){ad(t,_)}while(!0);return e&&t.shellSuspendCounter++,Ge=jn=null,Et=a,N.H=l,N.A=i,ht===null&&(Rt=null,gt=0,$l()),u}function Qm(){for(;ht!==null;)cd(ht)}function Vm(t,e){var n=Et;Et|=2;var a=id(),l=ud();Rt!==t||gt!==e?(Ri=null,Mi=ce()+500,_a(t,e)):Aa=qa(t,e);t:do try{if(xt!==0&&ht!==null){e=ht;var i=me;e:switch(xt){case 1:xt=0,me=null,Ma(t,e,i,1);break;case 2:case 9:if(po(i)){xt=0,me=null,rd(e);break}e=function(){xt!==2&&xt!==9||Rt!==t||(xt=7),ke(t)},i.then(e,e);break t;case 3:xt=7;break t;case 4:xt=5;break t;case 7:po(i)?(xt=0,me=null,rd(e)):(xt=0,me=null,Ma(t,e,i,7));break;case 5:var u=null;switch(ht.tag){case 26:u=ht.memoizedState;case 5:case 27:var s=ht;if(u?Kd(u):s.stateNode.complete){xt=0,me=null;var m=s.sibling;if(m!==null)ht=m;else{var x=s.return;x!==null?(ht=x,Oi(x)):ht=null}break e}}xt=0,me=null,Ma(t,e,i,5);break;case 6:xt=0,me=null,Ma(t,e,i,6);break;case 8:Kc(),Ht=6;break t;default:throw Error(c(462))}}Xm();break}catch(_){ad(t,_)}while(!0);return Ge=jn=null,N.H=a,N.A=l,Et=n,ht!==null?0:(Rt=null,gt=0,$l(),Ht)}function Xm(){for(;ht!==null&&!m0();)cd(ht)}function cd(t){var e=zf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?Oi(t):ht=e}function rd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Af(n,e,e.pendingProps,e.type,void 0,gt);break;case 11:e=Af(n,e,e.pendingProps,e.type.render,e.ref,gt);break;case 5:sc(e);default:Of(n,e),e=ht=lo(e,$e),e=zf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?Oi(t):ht=e}function Ma(t,e,n,a){Ge=jn=null,sc(e),va=null,al=0;var l=e.return;try{if(Om(t,l,e,n,gt)){Ht=1,Si(t,Se(n,t.current)),ht=null;return}}catch(i){if(l!==null)throw ht=l,i;Ht=1,Si(t,Se(n,t.current)),ht=null;return}e.flags&32768?(yt||a===1?t=!0:Aa||(gt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=de.current,a!==null&&a.tag===13&&(a.flags|=16384))),sd(e,t)):Oi(e)}function Oi(t){var e=t;do{if((e.flags&32768)!==0){sd(e,pn);return}t=e.return;var n=Hm(e.alternate,e,$e);if(n!==null){ht=n;return}if(e=e.sibling,e!==null){ht=e;return}ht=e=t}while(e!==null);Ht===0&&(Ht=5)}function sd(t,e){do{var n=Um(t.alternate,t);if(n!==null){n.flags&=32767,ht=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){ht=t;return}ht=t=n}while(t!==null);Ht=6,ht=null}function od(t,e,n,a,l,i,u,s,m){t.cancelPendingCommit=null;do ki();while(Vt!==0);if((Et&6)!==0)throw Error(c(327));if(e!==null){if(e===t.current)throw Error(c(177));if(i=e.lanes|e.childLanes,i|=Hu,x0(t,n,i,u,s,m),t===Rt&&(ht=Rt=null,gt=0),Na=e,bn=t,Pe=n,Vc=i,Xc=l,Pf=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Fm(Hl,function(){return gd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=N.T,N.T=null,l=Z.p,Z.p=2,u=Et,Et|=4;try{jm(t,e,n)}finally{Et=u,Z.p=l,N.T=a}}Vt=1,fd(),dd(),hd()}}function fd(){if(Vt===1){Vt=0;var t=bn,e=Na,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=N.T,N.T=null;var a=Z.p;Z.p=2;var l=Et;Et|=4;try{Xf(e,t);var i=ur,u=Fs(t.containerInfo),s=i.focusedElem,m=i.selectionRange;if(u!==s&&s&&s.ownerDocument&&Js(s.ownerDocument.documentElement,s)){if(m!==null&&zu(s)){var x=m.start,_=m.end;if(_===void 0&&(_=x),"selectionStart"in s)s.selectionStart=x,s.selectionEnd=Math.min(_,s.value.length);else{var R=s.ownerDocument||document,A=R&&R.defaultView||window;if(A.getSelection){var C=A.getSelection(),J=s.textContent.length,lt=Math.min(m.start,J),Mt=m.end===void 0?lt:Math.min(m.end,J);!C.extend&&lt>Mt&&(u=Mt,Mt=lt,lt=u);var w=Ks(s,lt),p=Ks(s,Mt);if(w&&p&&(C.rangeCount!==1||C.anchorNode!==w.node||C.anchorOffset!==w.offset||C.focusNode!==p.node||C.focusOffset!==p.offset)){var T=R.createRange();T.setStart(w.node,w.offset),C.removeAllRanges(),lt>Mt?(C.addRange(T),C.extend(p.node,p.offset)):(T.setEnd(p.node,p.offset),C.addRange(T))}}}}for(R=[],C=s;C=C.parentNode;)C.nodeType===1&&R.push({element:C,left:C.scrollLeft,top:C.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<R.length;s++){var M=R[s];M.element.scrollLeft=M.left,M.element.scrollTop=M.top}}Zi=!!ir,ur=ir=null}finally{Et=l,Z.p=a,N.T=n}}t.current=e,Vt=2}}function dd(){if(Vt===2){Vt=0;var t=bn,e=Na,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=N.T,N.T=null;var a=Z.p;Z.p=2;var l=Et;Et|=4;try{qf(t,e.alternate,e)}finally{Et=l,Z.p=a,N.T=n}}Vt=3}}function hd(){if(Vt===4||Vt===3){Vt=0,g0();var t=bn,e=Na,n=Pe,a=Pf;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Vt=5:(Vt=0,Na=bn=null,md(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),du(n),e=e.stateNode,re&&typeof re.onCommitFiberRoot=="function")try{re.onCommitFiberRoot(La,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=N.T,l=Z.p,Z.p=2,N.T=null;try{for(var i=t.onRecoverableError,u=0;u<a.length;u++){var s=a[u];i(s.value,{componentStack:s.stack})}}finally{N.T=e,Z.p=l}}(Pe&3)!==0&&ki(),ke(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Zc?Sl++:(Sl=0,Zc=t):Sl=0,wl(0)}}function md(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,el(e)))}function ki(){return fd(),dd(),hd(),gd()}function gd(){if(Vt!==5)return!1;var t=bn,e=Vc;Vc=0;var n=du(Pe),a=N.T,l=Z.p;try{Z.p=32>n?32:n,N.T=null,n=Xc,Xc=null;var i=bn,u=Pe;if(Vt=0,Na=bn=null,Pe=0,(Et&6)!==0)throw Error(c(331));var s=Et;if(Et|=4,If(i.current),Kf(i,i.current,u,n),Et=s,wl(0,!1),re&&typeof re.onPostCommitFiberRoot=="function")try{re.onPostCommitFiberRoot(La,i)}catch{}return!0}finally{Z.p=l,N.T=a,md(t,e)}}function pd(t,e,n){e=Se(n,e),e=xc(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(Ya(t,2),ke(t))}function At(t,e,n){if(t.tag===3)pd(t,t,n);else for(;e!==null;){if(e.tag===3){pd(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=Se(n,t),n=yf(2),a=dn(e,n,2),a!==null&&(vf(n,a,e,t),Ya(a,2),ke(a));break}}e=e.return}}function Fc(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new Ym;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Yc=!0,l.add(n),t=Zm.bind(null,t,e,n),e.then(t,t))}function Zm(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Rt===t&&(gt&n)===n&&(Ht===4||Ht===3&&(gt&62914560)===gt&&300>ce()-_i?(Et&2)===0&&_a(t,0):Gc|=n,Ca===gt&&(Ca=0)),ke(t)}function yd(t,e){e===0&&(e=ss()),t=Bn(t,e),t!==null&&(Ya(t,e),ke(t))}function Km(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),yd(t,n)}function Jm(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(c(314))}a!==null&&a.delete(e),yd(t,n)}function Fm(t,e){return ru(t,e)}var Bi=null,Ra=null,Ic=!1,Hi=!1,Wc=!1,wn=0;function ke(t){t!==Ra&&t.next===null&&(Ra===null?Bi=Ra=t:Ra=Ra.next=t),Hi=!0,Ic||(Ic=!0,Wm())}function wl(t,e){if(!Wc&&Hi){Wc=!0;do for(var n=!1,a=Bi;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,s=a.pingedLanes;i=(1<<31-se(42|t)+1)-1,i&=l&~(u&~s),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,wd(a,i))}else i=gt,i=ql(a,a===Rt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||qa(a,i)||(n=!0,wd(a,i));a=a.next}while(n);Wc=!1}}function Im(){vd()}function vd(){Hi=Ic=!1;var t=0;wn!==0&&cg()&&(t=wn);for(var e=ce(),n=null,a=Bi;a!==null;){var l=a.next,i=bd(a,e);i===0?(a.next=null,n===null?Bi=l:n.next=l,l===null&&(Ra=n)):(n=a,(t!==0||(i&3)!==0)&&(Hi=!0)),a=l}Vt!==0&&Vt!==5||wl(t),wn!==0&&(wn=0)}function bd(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-se(i),s=1<<u,m=l[u];m===-1?((s&n)===0||(s&a)!==0)&&(l[u]=T0(s,e)):m<=e&&(t.expiredLanes|=s),i&=~s}if(e=Rt,n=gt,n=ql(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(xt===2||xt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&su(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||qa(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&su(a),du(n)){case 2:case 8:n=cs;break;case 32:n=Hl;break;case 268435456:n=rs;break;default:n=Hl}return a=Sd.bind(null,t),n=ru(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&su(a),t.callbackPriority=2,t.callbackNode=null,2}function Sd(t,e){if(Vt!==0&&Vt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(ki()&&t.callbackNode!==n)return null;var a=gt;return a=ql(t,t===Rt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(ed(t,a,e),bd(t,ce()),t.callbackNode!=null&&t.callbackNode===n?Sd.bind(null,t):null)}function wd(t,e){if(ki())return null;ed(t,e,!0)}function Wm(){sg(function(){(Et&6)!==0?ru(us,Im):vd()})}function $c(){if(wn===0){var t=ga;t===0&&(t=Ul,Ul<<=1,(Ul&261888)===0&&(Ul=256)),wn=t}return wn}function Ed(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Vl(""+t)}function Td(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function $m(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=Ed((l[te]||null).action),u=a.submitter;u&&(e=(e=u[te]||null)?Ed(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var s=new Jl("action","action",null,a,l);t.push({event:s,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(wn!==0){var m=u?Td(l,u):new FormData(l);vc(n,{pending:!0,data:m,method:l.method,action:i},null,m)}}else typeof i=="function"&&(s.preventDefault(),m=u?Td(l,u):new FormData(l),vc(n,{pending:!0,data:m,method:l.method,action:i},i,m))},currentTarget:l}]})}}for(var Pc=0;Pc<Bu.length;Pc++){var tr=Bu[Pc],Pm=tr.toLowerCase(),tg=tr[0].toUpperCase()+tr.slice(1);_e(Pm,"on"+tg)}_e($s,"onAnimationEnd"),_e(Ps,"onAnimationIteration"),_e(to,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(pm,"onTransitionRun"),_e(ym,"onTransitionStart"),_e(vm,"onTransitionCancel"),_e(eo,"onTransitionEnd"),ea("onMouseEnter",["mouseout","mouseover"]),ea("onMouseLeave",["mouseout","mouseover"]),ea("onPointerEnter",["pointerout","pointerover"]),ea("onPointerLeave",["pointerout","pointerover"]),zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zn("onBeforeInput",["compositionend","keypress","textInput","paste"]),zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var El="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),eg=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(El));function xd(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var u=a.length-1;0<=u;u--){var s=a[u],m=s.instance,x=s.currentTarget;if(s=s.listener,m!==i&&l.isPropagationStopped())break t;i=s,l.currentTarget=x;try{i(l)}catch(_){Wl(_)}l.currentTarget=null,i=m}else for(u=0;u<a.length;u++){if(s=a[u],m=s.instance,x=s.currentTarget,s=s.listener,m!==i&&l.isPropagationStopped())break t;i=s,l.currentTarget=x;try{i(l)}catch(_){Wl(_)}l.currentTarget=null,i=m}}}}function mt(t,e){var n=e[hu];n===void 0&&(n=e[hu]=new Set);var a=t+"__bubble";n.has(a)||(Ad(e,t,2,!1),n.add(a))}function er(t,e,n){var a=0;e&&(a|=4),Ad(n,t,a,e)}var Ui="_reactListening"+Math.random().toString(36).slice(2);function nr(t){if(!t[Ui]){t[Ui]=!0,ps.forEach(function(n){n!=="selectionchange"&&(eg.has(n)||er(n,!1,t),er(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ui]||(e[Ui]=!0,er("selectionchange",!1,e))}}function Ad(t,e,n,a){switch(th(e)){case 2:var l=Mg;break;case 8:l=Rg;break;default:l=yr}n=l.bind(null,e,n,t),l=void 0,!Eu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function ar(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var s=a.stateNode.containerInfo;if(s===l)break;if(u===4)for(u=a.return;u!==null;){var m=u.tag;if((m===3||m===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;s!==null;){if(u=$n(s),u===null)return;if(m=u.tag,m===5||m===6||m===26||m===27){a=i=u;continue t}s=s.parentNode}}a=a.return}_s(function(){var x=i,_=Su(n),R=[];t:{var A=no.get(t);if(A!==void 0){var C=Jl,J=t;switch(t){case"keypress":if(Zl(n)===0)break t;case"keydown":case"keyup":C=J0;break;case"focusin":J="focus",C=Cu;break;case"focusout":J="blur",C=Cu;break;case"beforeblur":case"afterblur":C=Cu;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=zs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=H0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=W0;break;case $s:case Ps:case to:C=L0;break;case eo:C=P0;break;case"scroll":case"scrollend":C=k0;break;case"wheel":C=em;break;case"copy":case"cut":case"paste":C=Y0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=Os;break;case"toggle":case"beforetoggle":C=am}var lt=(e&4)!==0,Mt=!lt&&(t==="scroll"||t==="scrollend"),w=lt?A!==null?A+"Capture":null:A;lt=[];for(var p=x,T;p!==null;){var M=p;if(T=M.stateNode,M=M.tag,M!==5&&M!==26&&M!==27||T===null||w===null||(M=Va(p,w),M!=null&&lt.push(Tl(p,M,T))),Mt)break;p=p.return}0<lt.length&&(A=new C(A,J,null,n,_),R.push({event:A,listeners:lt}))}}if((e&7)===0){t:{if(A=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",A&&n!==bu&&(J=n.relatedTarget||n.fromElement)&&($n(J)||J[Wn]))break t;if((C||A)&&(A=_.window===_?_:(A=_.ownerDocument)?A.defaultView||A.parentWindow:window,C?(J=n.relatedTarget||n.toElement,C=x,J=J?$n(J):null,J!==null&&(Mt=d(J),lt=J.tag,J!==Mt||lt!==5&&lt!==27&&lt!==6)&&(J=null)):(C=null,J=x),C!==J)){if(lt=zs,M="onMouseLeave",w="onMouseEnter",p="mouse",(t==="pointerout"||t==="pointerover")&&(lt=Os,M="onPointerLeave",w="onPointerEnter",p="pointer"),Mt=C==null?A:Qa(C),T=J==null?A:Qa(J),A=new lt(M,p+"leave",C,n,_),A.target=Mt,A.relatedTarget=T,M=null,$n(_)===x&&(lt=new lt(w,p+"enter",J,n,_),lt.target=T,lt.relatedTarget=Mt,M=lt),Mt=M,C&&J)e:{for(lt=ng,w=C,p=J,T=0,M=w;M;M=lt(M))T++;M=0;for(var tt=p;tt;tt=lt(tt))M++;for(;0<T-M;)w=lt(w),T--;for(;0<M-T;)p=lt(p),M--;for(;T--;){if(w===p||p!==null&&w===p.alternate){lt=w;break e}w=lt(w),p=lt(p)}lt=null}else lt=null;C!==null&&Cd(R,A,C,lt,!1),J!==null&&Mt!==null&&Cd(R,Mt,J,lt,!0)}}t:{if(A=x?Qa(x):window,C=A.nodeName&&A.nodeName.toLowerCase(),C==="select"||C==="input"&&A.type==="file")var bt=Ys;else if(Ls(A))if(Gs)bt=hm;else{bt=fm;var W=om}else C=A.nodeName,!C||C.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?x&&vu(x.elementType)&&(bt=Ys):bt=dm;if(bt&&(bt=bt(t,x))){qs(R,bt,n,_);break t}W&&W(t,A,x),t==="focusout"&&x&&A.type==="number"&&x.memoizedProps.value!=null&&yu(A,"number",A.value)}switch(W=x?Qa(x):window,t){case"focusin":(Ls(W)||W.contentEditable==="true")&&(ca=W,Du=x,$a=null);break;case"focusout":$a=Du=ca=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,Is(R,n,_);break;case"selectionchange":if(gm)break;case"keydown":case"keyup":Is(R,n,_)}var st;if(_u)t:{switch(t){case"compositionstart":var pt="onCompositionStart";break t;case"compositionend":pt="onCompositionEnd";break t;case"compositionupdate":pt="onCompositionUpdate";break t}pt=void 0}else ua?Us(t,n)&&(pt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(pt="onCompositionStart");pt&&(ks&&n.locale!=="ko"&&(ua||pt!=="onCompositionStart"?pt==="onCompositionEnd"&&ua&&(st=Ms()):(ln=_,Tu="value"in ln?ln.value:ln.textContent,ua=!0)),W=ji(x,pt),0<W.length&&(pt=new Ds(pt,t,null,n,_),R.push({event:pt,listeners:W}),st?pt.data=st:(st=js(n),st!==null&&(pt.data=st)))),(st=im?um(t,n):cm(t,n))&&(pt=ji(x,"onBeforeInput"),0<pt.length&&(W=new Ds("onBeforeInput","beforeinput",null,n,_),R.push({event:W,listeners:pt}),W.data=st)),$m(R,t,x,n,_)}xd(R,e)})}function Tl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ji(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Va(t,n),l!=null&&a.unshift(Tl(t,l,i)),l=Va(t,e),l!=null&&a.push(Tl(t,l,i))),t.tag===3)return a;t=t.return}return[]}function ng(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Cd(t,e,n,a,l){for(var i=e._reactName,u=[];n!==null&&n!==a;){var s=n,m=s.alternate,x=s.stateNode;if(s=s.tag,m!==null&&m===a)break;s!==5&&s!==26&&s!==27||x===null||(m=x,l?(x=Va(n,i),x!=null&&u.unshift(Tl(n,x,m))):l||(x=Va(n,i),x!=null&&u.push(Tl(n,x,m)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var ag=/\r\n?/g,lg=/\u0000|\uFFFD/g;function Nd(t){return(typeof t=="string"?t:""+t).replace(ag,`
`).replace(lg,"")}function _d(t,e){return e=Nd(e),Nd(t)===e}function _t(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||aa(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&aa(t,""+a);break;case"className":Gl(t,"class",a);break;case"tabIndex":Gl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Gl(t,n,a);break;case"style":Cs(t,a,i);break;case"data":if(e!=="object"){Gl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Vl(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",l.name,l,null),_t(t,e,"formEncType",l.formEncType,l,null),_t(t,e,"formMethod",l.formMethod,l,null),_t(t,e,"formTarget",l.formTarget,l,null)):(_t(t,e,"encType",l.encType,l,null),_t(t,e,"method",l.method,l,null),_t(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Vl(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=je);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Vl(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Yl(t,"popover",a);break;case"xlinkActuate":Ue(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Ue(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Ue(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Ue(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Ue(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Ue(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Yl(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=D0.get(n)||n,Yl(t,n,a))}}function lr(t,e,n,a,l,i){switch(n){case"style":Cs(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"children":typeof a=="string"?aa(t,a):(typeof a=="number"||typeof a=="bigint")&&aa(t,""+a);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=je);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ys.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[te]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Yl(t,n,a)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,i,u,n,null)}}l&&_t(t,e,"srcSet",n.srcSet,n,null),a&&_t(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var s=i=u=l=null,m=null,x=null;for(a in n)if(n.hasOwnProperty(a)){var _=n[a];if(_!=null)switch(a){case"name":l=_;break;case"type":u=_;break;case"checked":m=_;break;case"defaultChecked":x=_;break;case"value":i=_;break;case"defaultValue":s=_;break;case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(c(137,e));break;default:_t(t,e,a,_,n,null)}}Es(t,i,s,m,x,u,l,!1);return;case"select":mt("invalid",t),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(s=n[l],s!=null))switch(l){case"value":i=s;break;case"defaultValue":u=s;break;case"multiple":a=s;default:_t(t,e,l,s,n,null)}e=i,n=u,t.multiple=!!a,e!=null?na(t,!!a,e,!1):n!=null&&na(t,!!a,n,!0);return;case"textarea":mt("invalid",t),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(s=n[u],s!=null))switch(u){case"value":a=s;break;case"defaultValue":l=s;break;case"children":i=s;break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(c(91));break;default:_t(t,e,u,s,n,null)}xs(t,a,l,i);return;case"option":for(m in n)if(n.hasOwnProperty(m)&&(a=n[m],a!=null))switch(m){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_t(t,e,m,a,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(a=0;a<El.length;a++)mt(El[a],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(x in n)if(n.hasOwnProperty(x)&&(a=n[x],a!=null))switch(x){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,x,a,n,null)}return;default:if(vu(e)){for(_ in n)n.hasOwnProperty(_)&&(a=n[_],a!==void 0&&lr(t,e,_,a,n,void 0));return}}for(s in n)n.hasOwnProperty(s)&&(a=n[s],a!=null&&_t(t,e,s,a,n,null))}function ig(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,s=null,m=null,x=null,_=null;for(C in n){var R=n[C];if(n.hasOwnProperty(C)&&R!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":m=R;default:a.hasOwnProperty(C)||_t(t,e,C,null,a,R)}}for(var A in a){var C=a[A];if(R=n[A],a.hasOwnProperty(A)&&(C!=null||R!=null))switch(A){case"type":i=C;break;case"name":l=C;break;case"checked":x=C;break;case"defaultChecked":_=C;break;case"value":u=C;break;case"defaultValue":s=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(c(137,e));break;default:C!==R&&_t(t,e,A,C,a,R)}}pu(t,u,s,m,x,_,i,l);return;case"select":C=u=s=A=null;for(i in n)if(m=n[i],n.hasOwnProperty(i)&&m!=null)switch(i){case"value":break;case"multiple":C=m;default:a.hasOwnProperty(i)||_t(t,e,i,null,a,m)}for(l in a)if(i=a[l],m=n[l],a.hasOwnProperty(l)&&(i!=null||m!=null))switch(l){case"value":A=i;break;case"defaultValue":s=i;break;case"multiple":u=i;default:i!==m&&_t(t,e,l,i,a,m)}e=s,n=u,a=C,A!=null?na(t,!!n,A,!1):!!a!=!!n&&(e!=null?na(t,!!n,e,!0):na(t,!!n,n?[]:"",!1));return;case"textarea":C=A=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null&&!a.hasOwnProperty(s))switch(s){case"value":break;case"children":break;default:_t(t,e,s,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":A=l;break;case"defaultValue":C=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(c(91));break;default:l!==i&&_t(t,e,u,l,a,i)}Ts(t,A,C);return;case"option":for(var J in n)if(A=n[J],n.hasOwnProperty(J)&&A!=null&&!a.hasOwnProperty(J))switch(J){case"selected":t.selected=!1;break;default:_t(t,e,J,null,a,A)}for(m in a)if(A=a[m],C=n[m],a.hasOwnProperty(m)&&A!==C&&(A!=null||C!=null))switch(m){case"selected":t.selected=A&&typeof A!="function"&&typeof A!="symbol";break;default:_t(t,e,m,A,a,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var lt in n)A=n[lt],n.hasOwnProperty(lt)&&A!=null&&!a.hasOwnProperty(lt)&&_t(t,e,lt,null,a,A);for(x in a)if(A=a[x],C=n[x],a.hasOwnProperty(x)&&A!==C&&(A!=null||C!=null))switch(x){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(c(137,e));break;default:_t(t,e,x,A,a,C)}return;default:if(vu(e)){for(var Mt in n)A=n[Mt],n.hasOwnProperty(Mt)&&A!==void 0&&!a.hasOwnProperty(Mt)&&lr(t,e,Mt,void 0,a,A);for(_ in a)A=a[_],C=n[_],!a.hasOwnProperty(_)||A===C||A===void 0&&C===void 0||lr(t,e,_,A,a,C);return}}for(var w in n)A=n[w],n.hasOwnProperty(w)&&A!=null&&!a.hasOwnProperty(w)&&_t(t,e,w,null,a,A);for(R in a)A=a[R],C=n[R],!a.hasOwnProperty(R)||A===C||A==null&&C==null||_t(t,e,R,A,a,C)}function Md(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ug(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,s=l.duration;if(i&&s&&Md(u)){for(u=0,s=l.responseEnd,a+=1;a<n.length;a++){var m=n[a],x=m.startTime;if(x>s)break;var _=m.transferSize,R=m.initiatorType;_&&Md(R)&&(m=m.responseEnd,u+=_*(m<s?1:(s-x)/(m-x)))}if(--a,e+=8*(i+u)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var ir=null,ur=null;function Li(t){return t.nodeType===9?t:t.ownerDocument}function Rd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function zd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function cr(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var rr=null;function cg(){var t=window.event;return t&&t.type==="popstate"?t===rr?!1:(rr=t,!0):(rr=null,!1)}var Dd=typeof setTimeout=="function"?setTimeout:void 0,rg=typeof clearTimeout=="function"?clearTimeout:void 0,Od=typeof Promise=="function"?Promise:void 0,sg=typeof queueMicrotask=="function"?queueMicrotask:typeof Od<"u"?function(t){return Od.resolve(null).then(t).catch(og)}:Dd;function og(t){setTimeout(function(){throw t})}function En(t){return t==="head"}function kd(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),ka(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")xl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,xl(n);for(var i=n.firstChild;i;){var u=i.nextSibling,s=i.nodeName;i[Ga]||s==="SCRIPT"||s==="STYLE"||s==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&xl(t.ownerDocument.body);n=l}while(n);ka(e)}function Bd(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function sr(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":sr(n),mu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function fg(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[Ga])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ae(t.nextSibling),t===null)break}return null}function dg(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ae(t.nextSibling),t===null))return null;return t}function Hd(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ae(t.nextSibling),t===null))return null;return t}function or(t){return t.data==="$?"||t.data==="$~"}function fr(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function hg(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ae(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var dr=null;function Ud(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ae(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function jd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Ld(t,e,n){switch(e=Li(n),t){case"html":if(t=e.documentElement,!t)throw Error(c(452));return t;case"head":if(t=e.head,!t)throw Error(c(453));return t;case"body":if(t=e.body,!t)throw Error(c(454));return t;default:throw Error(c(451))}}function xl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);mu(t)}var Ce=new Map,qd=new Set;function qi(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=Z.d;Z.d={f:mg,r:gg,D:pg,C:yg,L:vg,m:bg,X:wg,S:Sg,M:Eg};function mg(){var t=tn.f(),e=zi();return t||e}function gg(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?nf(e):tn.r(t)}var za=typeof document>"u"?null:document;function Yd(t,e,n){var a=za;if(a&&typeof e=="string"&&e){var l=ve(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),qd.has(l)||(qd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),Wt(e,"link",t),Xt(e),a.head.appendChild(e)))}}function pg(t){tn.D(t),Yd("dns-prefetch",t,null)}function yg(t,e){tn.C(t,e),Yd("preconnect",t,e)}function vg(t,e,n){tn.L(t,e,n);var a=za;if(a&&t&&e){var l='link[rel="preload"][as="'+ve(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+ve(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+ve(n.imageSizes)+'"]')):l+='[href="'+ve(t)+'"]';var i=l;switch(e){case"style":i=Da(t);break;case"script":i=Oa(t)}Ce.has(i)||(t=D({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ce.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(Al(i))||e==="script"&&a.querySelector(Cl(i))||(e=a.createElement("link"),Wt(e,"link",t),Xt(e),a.head.appendChild(e)))}}function bg(t,e){tn.m(t,e);var n=za;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+ve(a)+'"][href="'+ve(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Oa(t)}if(!Ce.has(i)&&(t=D({rel:"modulepreload",href:t},e),Ce.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Cl(i)))return}a=n.createElement("link"),Wt(a,"link",t),Xt(a),n.head.appendChild(a)}}}function Sg(t,e,n){tn.S(t,e,n);var a=za;if(a&&t){var l=ta(a).hoistableStyles,i=Da(t);e=e||"default";var u=l.get(i);if(!u){var s={loading:0,preload:null};if(u=a.querySelector(Al(i)))s.loading=5;else{t=D({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ce.get(i))&&hr(t,n);var m=u=a.createElement("link");Xt(m),Wt(m,"link",t),m._p=new Promise(function(x,_){m.onload=x,m.onerror=_}),m.addEventListener("load",function(){s.loading|=1}),m.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Yi(u,e,a)}u={type:"stylesheet",instance:u,count:1,state:s},l.set(i,u)}}}function wg(t,e){tn.X(t,e);var n=za;if(n&&t){var a=ta(n).hoistableScripts,l=Oa(t),i=a.get(l);i||(i=n.querySelector(Cl(l)),i||(t=D({src:t,async:!0},e),(e=Ce.get(l))&&mr(t,e),i=n.createElement("script"),Xt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Eg(t,e){tn.M(t,e);var n=za;if(n&&t){var a=ta(n).hoistableScripts,l=Oa(t),i=a.get(l);i||(i=n.querySelector(Cl(l)),i||(t=D({src:t,async:!0,type:"module"},e),(e=Ce.get(l))&&mr(t,e),i=n.createElement("script"),Xt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Gd(t,e,n,a){var l=(l=ft.current)?qi(l):null;if(!l)throw Error(c(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Da(n.href),n=ta(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Da(n.href);var i=ta(l).hoistableStyles,u=i.get(t);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=l.querySelector(Al(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ce.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ce.set(t,n),i||Tg(l,t,n,u.state))),e&&a===null)throw Error(c(528,""));return u}if(e&&a!==null)throw Error(c(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Oa(n),n=ta(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,t))}}function Da(t){return'href="'+ve(t)+'"'}function Al(t){return'link[rel="stylesheet"]['+t+"]"}function Qd(t){return D({},t,{"data-precedence":t.precedence,precedence:null})}function Tg(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Wt(e,"link",n),Xt(e),t.head.appendChild(e))}function Oa(t){return'[src="'+ve(t)+'"]'}function Cl(t){return"script[async]"+t}function Vd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+ve(n.href)+'"]');if(a)return e.instance=a,Xt(a),a;var l=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Xt(a),Wt(a,"style",l),Yi(a,n.precedence,t),e.instance=a;case"stylesheet":l=Da(n.href);var i=t.querySelector(Al(l));if(i)return e.state.loading|=4,e.instance=i,Xt(i),i;a=Qd(n),(l=Ce.get(l))&&hr(a,l),i=(t.ownerDocument||t).createElement("link"),Xt(i);var u=i;return u._p=new Promise(function(s,m){u.onload=s,u.onerror=m}),Wt(i,"link",a),e.state.loading|=4,Yi(i,n.precedence,t),e.instance=i;case"script":return i=Oa(n.src),(l=t.querySelector(Cl(i)))?(e.instance=l,Xt(l),l):(a=n,(l=Ce.get(i))&&(a=D({},n),mr(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Xt(l),Wt(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(c(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Yi(a,n.precedence,t));return e.instance}function Yi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var s=a[u];if(s.dataset.precedence===e)i=s;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function hr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function mr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Gi=null;function Xd(t,e,n){if(Gi===null){var a=new Map,l=Gi=new Map;l.set(n,a)}else l=Gi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[Ga]||i[Kt]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var s=a.get(u);s?s.push(i):a.set(u,[i])}}return a}function Zd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function xg(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Kd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Ag(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=Da(a.href),i=e.querySelector(Al(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Qi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Xt(i);return}i=e.ownerDocument||e,a=Qd(a),(l=Ce.get(l))&&hr(a,l),i=i.createElement("link"),Xt(i);var u=i;u._p=new Promise(function(s,m){u.onload=s,u.onerror=m}),Wt(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Qi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var gr=0;function Cg(t,e){return t.stylesheets&&t.count===0&&Xi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Xi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&gr===0&&(gr=62500*ug());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Xi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>gr?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Qi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Vi=null;function Xi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Vi=new Map,e.forEach(Ng,t),Vi=null,Qi.call(t))}function Ng(t,e){if(!(e.state.loading&4)){var n=Vi.get(t);if(n)var a=n.get(null);else{n=new Map,Vi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=e.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=Qi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var Nl={$$typeof:Y,Provider:null,Consumer:null,_currentValue:at,_currentValue2:at,_threadCount:0};function _g(t,e,n,a,l,i,u,s,m){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ou(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ou(0),this.hiddenUpdates=ou(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=m,this.incompleteTransitions=new Map}function Jd(t,e,n,a,l,i,u,s,m,x,_,R){return t=new _g(t,e,n,u,m,x,_,R,s),e=1,i===!0&&(e|=24),i=fe(3,null,null,e),t.current=i,i.stateNode=t,e=Ju(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},$u(i),t}function Fd(t){return t?(t=oa,t):oa}function Id(t,e,n,a,l,i){l=Fd(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(ue(n,t,e),il(n,t,e))}function Wd(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function pr(t,e){Wd(t,e),(t=t.alternate)&&Wd(t,e)}function $d(t){if(t.tag===13||t.tag===31){var e=Bn(t,67108864);e!==null&&ue(e,t,67108864),pr(t,67108864)}}function Pd(t){if(t.tag===13||t.tag===31){var e=pe();e=fu(e);var n=Bn(t,e);n!==null&&ue(n,t,e),pr(t,e)}}var Zi=!0;function Mg(t,e,n,a){var l=N.T;N.T=null;var i=Z.p;try{Z.p=2,yr(t,e,n,a)}finally{Z.p=i,N.T=l}}function Rg(t,e,n,a){var l=N.T;N.T=null;var i=Z.p;try{Z.p=8,yr(t,e,n,a)}finally{Z.p=i,N.T=l}}function yr(t,e,n,a){if(Zi){var l=vr(a);if(l===null)ar(t,e,a,Ki,n),eh(t,a);else if(Dg(l,t,e,n,a))a.stopPropagation();else if(eh(t,a),e&4&&-1<zg.indexOf(t)){for(;l!==null;){var i=Pn(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Rn(i.pendingLanes);if(u!==0){var s=i;for(s.pendingLanes|=2,s.entangledLanes|=2;u;){var m=1<<31-se(u);s.entanglements[1]|=m,u&=~m}ke(i),(Et&6)===0&&(Mi=ce()+500,wl(0))}}break;case 31:case 13:s=Bn(i,2),s!==null&&ue(s,i,2),zi(),pr(i,2)}if(i=vr(a),i===null&&ar(t,e,a,Ki,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else ar(t,e,a,null,n)}}function vr(t){return t=Su(t),br(t)}var Ki=null;function br(t){if(Ki=null,t=$n(t),t!==null){var e=d(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=b(e),t!==null)return t;t=null}else if(n===31){if(t=E(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ki=t,null}function th(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(p0()){case us:return 2;case cs:return 8;case Hl:case y0:return 32;case rs:return 268435456;default:return 32}default:return 32}}var Sr=!1,Tn=null,xn=null,An=null,_l=new Map,Ml=new Map,Cn=[],zg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function eh(t,e){switch(t){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":xn=null;break;case"mouseover":case"mouseout":An=null;break;case"pointerover":case"pointerout":_l.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ml.delete(e.pointerId)}}function Rl(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=Pn(e),e!==null&&$d(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function Dg(t,e,n,a,l){switch(e){case"focusin":return Tn=Rl(Tn,t,e,n,a,l),!0;case"dragenter":return xn=Rl(xn,t,e,n,a,l),!0;case"mouseover":return An=Rl(An,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return _l.set(i,Rl(_l.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Ml.set(i,Rl(Ml.get(i)||null,t,e,n,a,l)),!0}return!1}function nh(t){var e=$n(t.target);if(e!==null){var n=d(e);if(n!==null){if(e=n.tag,e===13){if(e=b(n),e!==null){t.blockedOn=e,ms(t.priority,function(){Pd(n)});return}}else if(e===31){if(e=E(n),e!==null){t.blockedOn=e,ms(t.priority,function(){Pd(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ji(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=vr(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);bu=a,n.target.dispatchEvent(a),bu=null}else return e=Pn(n),e!==null&&$d(e),t.blockedOn=n,!1;e.shift()}return!0}function ah(t,e,n){Ji(t)&&n.delete(e)}function Og(){Sr=!1,Tn!==null&&Ji(Tn)&&(Tn=null),xn!==null&&Ji(xn)&&(xn=null),An!==null&&Ji(An)&&(An=null),_l.forEach(ah),Ml.forEach(ah)}function Fi(t,e){t.blockedOn===e&&(t.blockedOn=null,Sr||(Sr=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Og)))}var Ii=null;function lh(t){Ii!==t&&(Ii=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Ii===t&&(Ii=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(br(a||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,vc(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function ka(t){function e(m){return Fi(m,t)}Tn!==null&&Fi(Tn,t),xn!==null&&Fi(xn,t),An!==null&&Fi(An,t),_l.forEach(e),Ml.forEach(e);for(var n=0;n<Cn.length;n++){var a=Cn[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)nh(n),n.blockedOn===null&&Cn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[te]||null;if(typeof i=="function")u||lh(n);else if(u){var s=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[te]||null)s=u.formAction;else if(br(l)!==null)continue}else s=u.action;typeof s=="function"?n[a+1]=s:(n.splice(a,3),a-=3),lh(n)}}}function ih(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function wr(t){this._internalRoot=t}Wi.prototype.render=wr.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(c(409));var n=e.current,a=pe();Id(n,a,t,e,null,null)},Wi.prototype.unmount=wr.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Id(t.current,2,null,t,null,null),zi(),e[Wn]=null}};function Wi(t){this._internalRoot=t}Wi.prototype.unstable_scheduleHydration=function(t){if(t){var e=hs();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Cn.length&&e!==0&&e<Cn[n].priority;n++);Cn.splice(n,0,t),n===0&&nh(t)}};var uh=f.version;if(uh!=="19.2.6")throw Error(c(527,uh,"19.2.6"));Z.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(c(188)):(t=Object.keys(t).join(","),Error(c(268,t)));return t=S(e),t=t!==null?O(t):null,t=t===null?null:t.stateNode,t};var kg={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:N,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $i=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$i.isDisabled&&$i.supportsFiber)try{La=$i.inject(kg),re=$i}catch{}}return Dl.createRoot=function(t,e){if(!o(t))throw Error(c(299));var n=!1,a="",l=hf,i=mf,u=gf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=Jd(t,1,!1,null,null,n,a,null,l,i,u,ih),t[Wn]=e.current,nr(t),new wr(e)},Dl.hydrateRoot=function(t,e,n){if(!o(t))throw Error(c(299));var a=!1,l="",i=hf,u=mf,s=gf,m=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(s=n.onRecoverableError),n.formState!==void 0&&(m=n.formState)),e=Jd(t,1,!0,e,n??null,a,l,m,i,u,s,ih),e.context=Fd(null),n=e.current,a=pe(),a=fu(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,Ya(e,n),ke(e),t[Wn]=e.current,nr(t),new Wi(e)},Dl.version="19.2.6",Dl}var ph;function Xg(){if(ph)return xr.exports;ph=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),xr.exports=Vg(),xr.exports}var Zg=Xg();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kg=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),n0=(...r)=>r.filter((f,h,c)=>!!f&&f.trim()!==""&&c.indexOf(f)===h).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Jg={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fg=vt.forwardRef(({color:r="currentColor",size:f=24,strokeWidth:h=2,absoluteStrokeWidth:c,className:o="",children:d,iconNode:b,...E},g)=>vt.createElement("svg",{ref:g,...Jg,width:f,height:f,stroke:r,strokeWidth:c?Number(h)*24/Number(f):h,className:n0("lucide",o),...E},[...b.map(([S,O])=>vt.createElement(S,O)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=(r,f)=>{const h=vt.forwardRef(({className:c,...o},d)=>vt.createElement(Fg,{ref:d,iconNode:f,className:n0(`lucide-${Kg(r)}`,c),...o}));return h.displayName=`${r}`,h};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ig=Ne("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const au=Ne("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=Ne("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wg=Ne("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=Ne("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $g=Ne("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pg=Ne("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yh=Ne("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t1=Ne("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e1=Ne("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n1=Ne("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const es=Ne("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function nu({group:r,size:f="md",dim:h}){const c=f==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return v.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${r.bgClass} ${r.textClass} ${c} ${h?"opacity-40":""}`,children:r.label})}const Ba=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function i0(r){if(r.length===0)return"";const f=[...r].sort((O,D)=>O.date.localeCompare(D.date)),h=f[0].date,c=f[f.length-1].date,[o,d,b]=h.split("-").map(Number),[E,g,S]=c.split("-").map(Number);return h===c?`${Ba[d-1]} ${b}, ${o}`:o===E&&d===g?`${Ba[d-1]} ${b}–${S}, ${o}`:o===E?`${Ba[d-1]} ${b} – ${Ba[g-1]} ${S}, ${o}`:`${Ba[d-1]} ${b}, ${o} – ${Ba[g-1]} ${S}, ${E}`}function vh(r){return r.subtitle??i0(r.days)}function en(r){const[f,h]=r.split(":").map(Number);return f*60+h}const a1=30;function l1(r,f){let h=-1;for(let E=0;E<r.length&&en(r[E])<=f;E++)h=E;if(h===-1)return{index:-1,progress:0};const c=en(r[h]),o=r[h+1]?en(r[h+1]):null,d=o!==null?o:c+a1;if(f>=d)return{index:-1,progress:0};const b=d===c?0:(f-c)/(d-c);return{index:h,progress:Math.max(0,Math.min(1,b))}}function u0(r){const[f,h]=r.split(":").map(Number);return`${f%12||12}:${h.toString().padStart(2,"0")}`}function c0(r){const[f]=r.split(":").map(Number);return f>=12?"PM":"AM"}function ns(){const r=new Date;return r.getHours()*60+r.getMinutes()}function kl(){const r=new Date,f=r.getFullYear(),h=String(r.getMonth()+1).padStart(2,"0"),c=String(r.getDate()).padStart(2,"0");return`${f}-${h}-${c}`}function i1(){const r=new Date,f=r.getHours(),h=r.getMinutes(),c=f%12||12,o=f>=12?"PM":"AM";return`${c}:${h.toString().padStart(2,"0")} ${o}`}function u1(r){if(r<=0)return"";if(r<60)return`${r} min`;const f=Math.floor(r/60),h=r%60;return h===0?`${f}h`:`${f}h ${h}m`}function c1(r){const f=new Date(r);if(isNaN(f.getTime()))return r;const h=f.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),c=f.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${h}, ${c}`}function bh(r,f){return r.flatMap(h=>{const c=f.find(o=>o.id===h);return c?[c]:[]})}function r1({activity:r,runGroups:f,past:h}){const c=bh(r.onTrack,f),o=bh(r.inClass??[],f);return v.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${h?"opacity-60":""}`,children:v.jsxs("div",{className:"flex gap-4",children:[v.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[u0(r.time),v.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:c0(r.time)})]}),v.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[c.length>0&&v.jsxs("div",{className:"flex items-center gap-3",children:[v.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),v.jsx("div",{className:"flex flex-wrap gap-1.5",children:c.map(d=>v.jsx(nu,{group:d},d.id))})]}),o.length>0&&v.jsxs(v.Fragment,{children:[c.length>0&&v.jsx("div",{className:"border-t border-gray-100"}),v.jsxs("div",{className:"flex items-center gap-3",children:[v.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),v.jsx("div",{className:"flex flex-wrap gap-1.5",children:o.map(d=>v.jsx(nu,{group:d},d.id))})]})]}),r.note&&v.jsx("p",{className:"text-xs italic text-gray-500",children:r.note})]})]})})}function s1({activity:r,past:f}){const h=r.type==="lunch"||r.type==="special";return v.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${h?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${f?"opacity-60":""}`,children:v.jsxs("div",{className:"flex items-center gap-4",children:[v.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[u0(r.time),v.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:c0(r.time)})]}),h&&v.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:r.type==="lunch"?v.jsx(n1,{size:16}):v.jsx(t1,{size:16})}),v.jsxs("div",{children:[v.jsx("p",{className:"text-sm font-medium text-gray-900",children:r.label}),r.subtitle&&v.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:r.subtitle})]})]})})}const $r=vt.forwardRef(({activities:r},f)=>{const[,h]=vt.useState(0);vt.useEffect(()=>{const g=setInterval(()=>h(S=>S+1),3e4);return()=>clearInterval(g)},[]);const c=ns(),d=r.filter(g=>"time"in g).find(g=>en(g.time)>c),b=d?en(d.time)-c:null,E=b!==null?b<=5?"text-red-500":b<=10?"text-orange-500":"text-gray-400":"text-gray-400";return v.jsxs("div",{ref:f,"data-time-indicator":!0,className:"relative my-6",children:[v.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[v.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),v.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),v.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:i1()}),b!==null&&v.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${E}`,children:["Next activity starts in ",v.jsx("span",{className:"font-semibold",children:u1(b)})]})]})});$r.displayName="TimeIndicator";function Sh({collapsed:r,children:f}){return v.jsx("div",{"data-collapsed":r,"aria-hidden":r,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:r?"0fr":"1fr",opacity:r?0:1,marginBottom:r?0:"0.5rem"},children:v.jsx("div",{className:"overflow-hidden",children:f})})}function o1({activities:r,runGroups:f,isToday:h,selectedGroups:c,hidePast:o}){const d=vt.useRef(null),[,b]=vt.useState(0);vt.useEffect(()=>{if(!h)return;const q=setInterval(()=>b(Y=>Y+1),6e4);return()=>clearInterval(q)},[h]),vt.useEffect(()=>{if(!h)return;const q=setTimeout(()=>{var Y;(Y=d.current)==null||Y.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(q)},[h]);const E=ns(),g=r.flatMap(q=>{if(q.type!=="session")return[q];if(c.length===0)return[q];const Y=q.onTrack.filter(ot=>c.includes(ot)),K=(q.inClass??[]).filter(ot=>c.includes(ot));return Y.length===0&&K.length===0?[]:[{...q,onTrack:Y,inClass:K}]}),S=g.map(q=>q.type!=="break"&&o&&h&&en(q.time)<E);g.forEach((q,Y)=>{if(q.type!=="break")return;const K=g.slice(0,Y).some((ot,V)=>ot.type!=="break"&&!S[V]);S[Y]=!K});const O=[],D=[];g.forEach((q,Y)=>{q.type!=="break"&&(O.push(Y),D.push(q.time))});const{index:k}=h?l1(D,E):{index:-1},B=k===-1?-1:O[k],L=h?g.findIndex(q=>q.type!=="break"&&en(q.time)>E):-1,j=h&&L===-1&&g.length>0,nt=g.length>0&&S.every(Boolean);let G;return v.jsxs("div",{className:"flex flex-col pb-10",children:[g.length>0&&v.jsx(Sh,{collapsed:!nt,children:v.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[v.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),v.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),g.map((q,Y)=>{const K=Y===B,ot=h&&q.type!=="break"&&!K&&en(q.time)<E;let V=null;!S[Y]&&q.type==="session"&&q.sessionNumber!==void 0&&q.sessionNumber!==G&&(G=q.sessionNumber,V=v.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",q.sessionNumber]}));const U=q.type==="break"?v.jsxs("div",{className:"flex items-center gap-2 py-1",children:[v.jsx("div",{className:"h-px flex-1 bg-gray-200"}),v.jsx("span",{className:"text-xs text-gray-400 italic",children:q.label}),v.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):q.type==="session"?v.jsx(r1,{activity:q,runGroups:f,past:ot}):v.jsx(s1,{activity:q,past:ot});return v.jsxs(Sh,{collapsed:S[Y],children:[Y===L&&v.jsx($r,{ref:d,activities:g}),V,U]},Y)}),j&&v.jsx($r,{ref:d,activities:g})]})}function f1({groups:r,selected:f,onChange:h}){const[c,o]=vt.useState(!1),d=g=>h(f.includes(g)?f.filter(S=>S!==g):[...f,g]),b=f.length===0||f.length===r.length,E=r.filter(g=>f.includes(g.id));return v.jsxs("div",{className:"relative",children:[v.jsxs("button",{onClick:()=>o(g=>!g),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[b?v.jsx("span",{className:"text-gray-700",children:"All run groups"}):v.jsx("div",{className:"flex items-center gap-1",children:E.map(g=>v.jsx(nu,{group:g,size:"sm"},g.id))}),v.jsx(a0,{size:14,className:"text-gray-400"})]}),c&&v.jsxs(v.Fragment,{children:[v.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>o(!1)}),v.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[r.map(g=>v.jsxs("button",{onClick:()=>d(g.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[v.jsx(nu,{group:g,size:"md"}),f.includes(g.id)&&v.jsx(au,{size:14,className:"text-blue-500"})]},g.id)),v.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:v.jsx("button",{onClick:()=>{h([]),o(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:b?"All selected":"Clear filter"})})]})]})]})}function wh(r){const f=kl();return r.days.some(h=>h.date===f)}function Eh(){return v.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[v.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function d1({events:r,active:f,onChange:h,onOpenDetails:c}){const[o,d]=vt.useState(!1);return v.jsxs("div",{className:"relative min-w-0 pl-1",children:[v.jsxs("button",{onClick:()=>d(b=>!b),className:"flex items-center gap-1 text-left group min-w-0",children:[v.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:f.name}),wh(f)&&v.jsx(Eh,{}),v.jsx(a0,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),v.jsxs("div",{className:"flex items-center gap-0.5",children:[v.jsx("p",{className:"text-sm text-gray-500",children:vh(f)}),v.jsx("button",{onClick:c,"aria-label":"Event details",className:"inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900",children:v.jsx(Pg,{size:14})})]}),o&&v.jsxs(v.Fragment,{children:[v.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>d(!1)}),v.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:r.map(b=>v.jsxs("button",{onClick:()=>{h(b),d(!1)},className:"flex w-full items-center justify-between rounded-lg px-4 py-2.5 hover:bg-gray-50 text-left",children:[v.jsxs("div",{children:[v.jsxs("div",{className:"flex items-center gap-1.5",children:[v.jsx("span",{className:"text-sm font-semibold text-gray-900",children:b.name}),wh(b)&&v.jsx(Eh,{})]}),v.jsx("div",{className:"text-xs text-gray-400",children:vh(b)})]}),b.id===f.id&&v.jsx(au,{size:14,className:"text-blue-500 ml-3 shrink-0"})]},b.id))})]})]})}function h1({checked:r,onChange:f,label:h}){return v.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[h&&v.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:h}),v.jsx("button",{type:"button",role:"switch","aria-checked":r,onClick:f,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:r?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:v.jsx("span",{style:{position:"absolute",top:"2px",left:r?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Jn=72,m1=110;function g1({children:r}){const[f,h]=vt.useState(0),[c,o]=vt.useState("idle"),d=vt.useRef(null),b=vt.useRef(0);vt.useEffect(()=>{const O=B=>{window.scrollY===0&&(d.current=B.touches[0].clientY)},D=B=>{if(d.current===null)return;const L=B.touches[0].clientY-d.current;if(L<=0){d.current=null;return}B.preventDefault();const j=L<Jn?L:Jn+(L-Jn)*.25;b.current=Math.min(j,m1),h(b.current),o("pulling")},k=()=>{d.current!==null&&(d.current=null,b.current>=Jn?(o("refreshing"),h(Jn*.75),setTimeout(()=>window.location.reload(),600)):(o("releasing"),h(0),b.current=0,setTimeout(()=>o("idle"),250)))};return document.addEventListener("touchstart",O,{passive:!0}),document.addEventListener("touchmove",D,{passive:!1}),document.addEventListener("touchend",k),document.addEventListener("touchcancel",k),()=>{document.removeEventListener("touchstart",O),document.removeEventListener("touchmove",D),document.removeEventListener("touchend",k),document.removeEventListener("touchcancel",k)}},[]);const E=c==="releasing"||c==="refreshing",g=Math.min(f/Jn,1),S=f>=Jn;return v.jsxs(v.Fragment,{children:[v.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${f}px)`,transition:E?"transform 0.25s ease":"none"},children:v.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${S?"text-blue-500":"text-gray-400"}`,children:v.jsx(e1,{size:16,className:c==="refreshing"?"animate-spin":"",style:c!=="refreshing"?{transform:`rotate(${g*270}deg)`}:void 0})})}),v.jsx("div",{style:{transform:`translateY(${f}px)`,transition:E?"transform 0.25s ease":"none"},children:r})]})}function p1({groups:r}){const f=r.filter(h=>h.description);return f.length===0?null:v.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[v.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),v.jsx("ul",{className:"flex flex-col gap-1.5",children:f.map(h=>v.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[v.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${h.bgClass}`,"aria-hidden":"true"}),v.jsx("span",{className:"font-medium text-gray-900",children:h.label}),v.jsx("span",{className:"text-gray-400",children:"·"}),v.jsx("span",{children:h.description})]},h.id))})]})}const Th=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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

const LAST_ACTIVITY_FALLBACK_MIN = 30
// The current activity stops being "current" this many minutes before the
// next activity begins — the marker leaves the card and moves into the
// between-cards gap.
const CURRENT_END_LOOKAHEAD_MIN = 5
// The marker sits OVERLAPPING THE TOP of the current card for the
// first few minutes of the activity, then flips to OVERLAPPING THE
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
// many activity rows we can afford to render before we blow past the
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

// Rough vertical space a rendered activity row will consume in the
// widget's outer stack, including the 6pt gap after it.
function estimateActivityRowHeight(ev, isCurrent) {
  // Only general-activity subtitles render as a note line. Session
  // \`note\` fields are dropped (see \`activityNote\`), so we don't
  // budget space for them here either.
  const hasNote = !!ev.subtitle
  const isSession = ev.type === "session"
  const hasBoth = isSession
    && (ev.onTrack || []).length > 0
    && (ev.inClass || []).length > 0

  let contentH
  if (hasBoth) contentH = 57       // on-row + spacer + divider + spacer + in-row
  else if (isSession) contentH = 20 // single pill row
  else contentH = 18                // plain activity label
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
// between cards when there is no current activity to overlap. Budgeted
// separately from card rows so the row-fit loop knows to leave
// room for it — but only in the between-cards case; when a current
// activity exists its caption is baked into its own row estimate.
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

  const visible = day.activities.map(e => {
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
  // of the activity). "below" — marker sits just below the current card
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
      : start + LAST_ACTIVITY_FALLBACK_MIN
    // Current window ends CURRENT_END_LOOKAHEAD_MIN before the next
    // activity, at which point the marker leaves the card and joins the
    // between-cards gap. The Math.max floor keeps back-to-back activities
    // (nextStart very close to start) from producing a negative
    // window that would flip the card to "not current" before it even
    // began.
    const currentEndsAt = nextEv
      ? Math.max(start, nextStart - CURRENT_END_LOOKAHEAD_MIN)
      : nextStart
    if (now < currentEndsAt) {
      currentIdx = lastPastIdx
      // Top-phase end caps at the current window's own end so a very
      // short window (activities less than TOP_PHASE_MIN apart) doesn't
      // spend its entire life in the "above" phase.
      const topPhaseEnds = Math.min(start + CURRENT_TOP_PHASE_MIN, currentEndsAt)
      currentPosition = now < topPhaseEnds ? "above" : "below"
    }
  }

  const nextIdx = visible.findIndex(e => parseMinutes(e.time) > now)
  const insertAt = nextIdx === -1 ? visible.length : nextIdx
  const nextActivity = insertAt < visible.length ? visible[insertAt] : null

  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"
  // Absolute cap so we never render more rows than the widget can
  // ever plausibly fit, even for a run of all-simple general activities.
  const maxRowsCap = isLarge ? 10 : 4
  // Always show exactly one past activity before the current one so the
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
  // need one. When a current activity exists, its caption is baked into
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
    const rowH = estimateActivityRowHeight(visible[i], isCurrent)
    if (rows.length >= 2 && usedH + rowH > availableH) break
    rows.push(visible[i])
    usedH += rowH
  }

  const nowLineBetweenAt = currentIdx === -1 ? insertAt - start : -1
  const currentLocalIdx = currentIdx === -1 ? -1 : currentIdx - start

  for (let i = 0; i < rows.length; i++) {
    if (i === nowLineBetweenAt) drawNowLine(w, p, now, nextActivity, 6)
    const ev = rows[i]
    const isCurrentActivity = i === currentLocalIdx
    const past = !isCurrentActivity && parseMinutes(ev.time) < now
    drawActivityRow(w, ev, groupById, selected, p, past,
      isCurrentActivity ? { position: currentPosition, now, nextActivity } : null)
  }
  if (nowLineBetweenAt >= rows.length) drawNowLine(w, p, now, null, 6)

  // Count activities that came after the last rendered row — either
  // dropped by the row-fit budget or capped by maxRowsCap. Past
  // activities skipped at the top (before \`start\`) are already over,
  // not "more" of anything, so we don't count them here.
  const lastRenderedIdx = rows.length > 0 ? start + rows.length - 1 : start - 1
  const remaining = visible.length - 1 - lastRenderedIdx

  // Flex spacer forces the widget's content stack to top-align.
  // Without it, Scriptable's ListWidget centers whatever content
  // it has vertically when it's shorter than the widget's box,
  // which showed up as awkward empty gutters above the header and
  // below the bottom card. When more activities fell off the bottom,
  // drop a muted "X more activities" line into that empty area so it
  // doesn't read as if the last rendered activity were the last one.
  w.addSpacer()
  if (remaining > 0) {
    drawMoreActivitiesFooter(w, p, remaining)
    w.addSpacer()
  }

  w.refreshAfterDate = new Date(Date.now() + 60 * 1000)
  return w
}

function drawMoreActivitiesFooter(w, p, count) {
  const row = w.addStack()
  row.centerAlignContent()
  row.addSpacer()
  const text = row.addText(\`\${count} more activit\${count === 1 ? "y" : "ies"}\`)
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

function activityNote(ev) {
  // Only general-activity subtitles surface in the widget. Session
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
// activity row. Widened from 60 to fit the small AM/PM suffix next to
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

function drawActivityRow(w, ev, groupById, selected, p, past, current) {
  // "Above": the marker overlaps the TOP straight-sides zone of the
  // current card; the caption ("3:08 AM · Next in 3h 22m") sits
  // just above the card.
  if (current && current.position === "above") {
    w.addSpacer(CURRENT_CAPTION_OUTER_PAD)
    drawNowCaption(w, p, current.now, current.nextActivity)
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
    drawNowCaption(w, p, current.now, current.nextActivity)
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
// that edge inside the card. drawActivityRow sets outerRow's
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
// when the activity carries a note or subtitle, a vertical layout with
// the main row on top and the note line below.
function buildCardContent(container, ev, groupById, selected, p, past, current) {
  const note = activityNote(ev)
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
// in-class section icons. Special activities render with no icon at all.
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
// the activity, not the widget.
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
  // (past activity / not-in-selected-groups) — the background alpha
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

function drawNowCaption(w, p, now, nextActivity) {
  const outer = w.addStack()
  outer.spacing = 0
  outer.addSpacer(LEFT_GUTTER_WIDTH + CARD_INNER_PAD_H)
  const row = outer.addStack()
  row.centerAlignContent()

  const time = row.addText(nowHM().toUpperCase())
  time.font = rMediumFont(10)
  time.textColor = p.accent

  row.addSpacer()

  if (nextActivity) {
    const min = parseMinutes(nextActivity.time) - now
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

function drawNowLine(w, p, now, nextActivity, belowSpacer) {
  drawNowCaption(w, p, now, nextActivity)
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
`;function y1(){const[r,f]=vt.useState(!1);vt.useEffect(()=>{window.scrollTo(0,0)},[]);async function h(){await navigator.clipboard.writeText(Th),f(!0),setTimeout(()=>f(!1),2e3)}return v.jsx("div",{className:"min-h-screen bg-gray-50",children:v.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[v.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[v.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsxs("button",{onClick:h,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[r?v.jsx(au,{size:16,className:"text-green-600"}):v.jsx(l0,{size:16}),r?"Copied":"Copy"]}),v.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:v.jsx(es,{size:18})})]})]}),v.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",v.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),v.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:v.jsx("code",{children:Th})})]})})}var Ha={},_r,xh;function v1(){return xh||(xh=1,_r=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),_r}var Mr={},_n={},Ah;function Fn(){if(Ah)return _n;Ah=1;let r;const f=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(c){if(!c)throw new Error('"version" cannot be null or undefined');if(c<1||c>40)throw new Error('"version" should be in range from 1 to 40');return c*4+17},_n.getSymbolTotalCodewords=function(c){return f[c]},_n.getBCHDigit=function(h){let c=0;for(;h!==0;)c++,h>>>=1;return c},_n.setToSJISFunction=function(c){if(typeof c!="function")throw new Error('"toSJISFunc" is not a valid function.');r=c},_n.isKanjiModeEnabled=function(){return typeof r<"u"},_n.toSJIS=function(c){return r(c)},_n}var Rr={},Ch;function as(){return Ch||(Ch=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function f(h){if(typeof h!="string")throw new Error("Param is not a string");switch(h.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+h)}}r.isValid=function(c){return c&&typeof c.bit<"u"&&c.bit>=0&&c.bit<4},r.from=function(c,o){if(r.isValid(c))return c;try{return f(c)}catch{return o}}})(Rr)),Rr}var zr,Nh;function b1(){if(Nh)return zr;Nh=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(f){const h=Math.floor(f/8);return(this.buffer[h]>>>7-f%8&1)===1},put:function(f,h){for(let c=0;c<h;c++)this.putBit((f>>>h-c-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(f){const h=Math.floor(this.length/8);this.buffer.length<=h&&this.buffer.push(0),f&&(this.buffer[h]|=128>>>this.length%8),this.length++}},zr=r,zr}var Dr,_h;function S1(){if(_h)return Dr;_h=1;function r(f){if(!f||f<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=f,this.data=new Uint8Array(f*f),this.reservedBit=new Uint8Array(f*f)}return r.prototype.set=function(f,h,c,o){const d=f*this.size+h;this.data[d]=c,o&&(this.reservedBit[d]=!0)},r.prototype.get=function(f,h){return this.data[f*this.size+h]},r.prototype.xor=function(f,h,c){this.data[f*this.size+h]^=c},r.prototype.isReserved=function(f,h){return this.reservedBit[f*this.size+h]},Dr=r,Dr}var Or={},Mh;function w1(){return Mh||(Mh=1,(function(r){const f=Fn().getSymbolSize;r.getRowColCoords=function(c){if(c===1)return[];const o=Math.floor(c/7)+2,d=f(c),b=d===145?26:Math.ceil((d-13)/(2*o-2))*2,E=[d-7];for(let g=1;g<o-1;g++)E[g]=E[g-1]-b;return E.push(6),E.reverse()},r.getPositions=function(c){const o=[],d=r.getRowColCoords(c),b=d.length;for(let E=0;E<b;E++)for(let g=0;g<b;g++)E===0&&g===0||E===0&&g===b-1||E===b-1&&g===0||o.push([d[E],d[g]]);return o}})(Or)),Or}var kr={},Rh;function E1(){if(Rh)return kr;Rh=1;const r=Fn().getSymbolSize,f=7;return kr.getPositions=function(c){const o=r(c);return[[0,0],[o-f,0],[0,o-f]]},kr}var Br={},zh;function T1(){return zh||(zh=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const f={N1:3,N2:3,N3:40,N4:10};r.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},r.from=function(o){return r.isValid(o)?parseInt(o,10):void 0},r.getPenaltyN1=function(o){const d=o.size;let b=0,E=0,g=0,S=null,O=null;for(let D=0;D<d;D++){E=g=0,S=O=null;for(let k=0;k<d;k++){let B=o.get(D,k);B===S?E++:(E>=5&&(b+=f.N1+(E-5)),S=B,E=1),B=o.get(k,D),B===O?g++:(g>=5&&(b+=f.N1+(g-5)),O=B,g=1)}E>=5&&(b+=f.N1+(E-5)),g>=5&&(b+=f.N1+(g-5))}return b},r.getPenaltyN2=function(o){const d=o.size;let b=0;for(let E=0;E<d-1;E++)for(let g=0;g<d-1;g++){const S=o.get(E,g)+o.get(E,g+1)+o.get(E+1,g)+o.get(E+1,g+1);(S===4||S===0)&&b++}return b*f.N2},r.getPenaltyN3=function(o){const d=o.size;let b=0,E=0,g=0;for(let S=0;S<d;S++){E=g=0;for(let O=0;O<d;O++)E=E<<1&2047|o.get(S,O),O>=10&&(E===1488||E===93)&&b++,g=g<<1&2047|o.get(O,S),O>=10&&(g===1488||g===93)&&b++}return b*f.N3},r.getPenaltyN4=function(o){let d=0;const b=o.data.length;for(let g=0;g<b;g++)d+=o.data[g];return Math.abs(Math.ceil(d*100/b/5)-10)*f.N4};function h(c,o,d){switch(c){case r.Patterns.PATTERN000:return(o+d)%2===0;case r.Patterns.PATTERN001:return o%2===0;case r.Patterns.PATTERN010:return d%3===0;case r.Patterns.PATTERN011:return(o+d)%3===0;case r.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(d/3))%2===0;case r.Patterns.PATTERN101:return o*d%2+o*d%3===0;case r.Patterns.PATTERN110:return(o*d%2+o*d%3)%2===0;case r.Patterns.PATTERN111:return(o*d%3+(o+d)%2)%2===0;default:throw new Error("bad maskPattern:"+c)}}r.applyMask=function(o,d){const b=d.size;for(let E=0;E<b;E++)for(let g=0;g<b;g++)d.isReserved(g,E)||d.xor(g,E,h(o,g,E))},r.getBestMask=function(o,d){const b=Object.keys(r.Patterns).length;let E=0,g=1/0;for(let S=0;S<b;S++){d(S),r.applyMask(S,o);const O=r.getPenaltyN1(o)+r.getPenaltyN2(o)+r.getPenaltyN3(o)+r.getPenaltyN4(o);r.applyMask(S,o),O<g&&(g=O,E=S)}return E}})(Br)),Br}var Pi={},Dh;function r0(){if(Dh)return Pi;Dh=1;const r=as(),f=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],h=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Pi.getBlocksCount=function(o,d){switch(d){case r.L:return f[(o-1)*4+0];case r.M:return f[(o-1)*4+1];case r.Q:return f[(o-1)*4+2];case r.H:return f[(o-1)*4+3];default:return}},Pi.getTotalCodewordsCount=function(o,d){switch(d){case r.L:return h[(o-1)*4+0];case r.M:return h[(o-1)*4+1];case r.Q:return h[(o-1)*4+2];case r.H:return h[(o-1)*4+3];default:return}},Pi}var Hr={},Ol={},Oh;function x1(){if(Oh)return Ol;Oh=1;const r=new Uint8Array(512),f=new Uint8Array(256);return(function(){let c=1;for(let o=0;o<255;o++)r[o]=c,f[c]=o,c<<=1,c&256&&(c^=285);for(let o=255;o<512;o++)r[o]=r[o-255]})(),Ol.log=function(c){if(c<1)throw new Error("log("+c+")");return f[c]},Ol.exp=function(c){return r[c]},Ol.mul=function(c,o){return c===0||o===0?0:r[f[c]+f[o]]},Ol}var kh;function A1(){return kh||(kh=1,(function(r){const f=x1();r.mul=function(c,o){const d=new Uint8Array(c.length+o.length-1);for(let b=0;b<c.length;b++)for(let E=0;E<o.length;E++)d[b+E]^=f.mul(c[b],o[E]);return d},r.mod=function(c,o){let d=new Uint8Array(c);for(;d.length-o.length>=0;){const b=d[0];for(let g=0;g<o.length;g++)d[g]^=f.mul(o[g],b);let E=0;for(;E<d.length&&d[E]===0;)E++;d=d.slice(E)}return d},r.generateECPolynomial=function(c){let o=new Uint8Array([1]);for(let d=0;d<c;d++)o=r.mul(o,new Uint8Array([1,f.exp(d)]));return o}})(Hr)),Hr}var Ur,Bh;function C1(){if(Bh)return Ur;Bh=1;const r=A1();function f(h){this.genPoly=void 0,this.degree=h,this.degree&&this.initialize(this.degree)}return f.prototype.initialize=function(c){this.degree=c,this.genPoly=r.generateECPolynomial(this.degree)},f.prototype.encode=function(c){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(c.length+this.degree);o.set(c);const d=r.mod(o,this.genPoly),b=this.degree-d.length;if(b>0){const E=new Uint8Array(this.degree);return E.set(d,b),E}return d},Ur=f,Ur}var jr={},Lr={},qr={},Hh;function s0(){return Hh||(Hh=1,qr.isValid=function(f){return!isNaN(f)&&f>=1&&f<=40}),qr}var Be={},Uh;function o0(){if(Uh)return Be;Uh=1;const r="[0-9]+",f="[A-Z $%*+\\-./:]+";let h="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";h=h.replace(/u/g,"\\u");const c="(?:(?![A-Z0-9 $%*+\\-./:]|"+h+`)(?:.|[\r
]))+`;Be.KANJI=new RegExp(h,"g"),Be.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Be.BYTE=new RegExp(c,"g"),Be.NUMERIC=new RegExp(r,"g"),Be.ALPHANUMERIC=new RegExp(f,"g");const o=new RegExp("^"+h+"$"),d=new RegExp("^"+r+"$"),b=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Be.testKanji=function(g){return o.test(g)},Be.testNumeric=function(g){return d.test(g)},Be.testAlphanumeric=function(g){return b.test(g)},Be}var jh;function In(){return jh||(jh=1,(function(r){const f=s0(),h=o0();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(d,b){if(!d.ccBits)throw new Error("Invalid mode: "+d);if(!f.isValid(b))throw new Error("Invalid version: "+b);return b>=1&&b<10?d.ccBits[0]:b<27?d.ccBits[1]:d.ccBits[2]},r.getBestModeForData=function(d){return h.testNumeric(d)?r.NUMERIC:h.testAlphanumeric(d)?r.ALPHANUMERIC:h.testKanji(d)?r.KANJI:r.BYTE},r.toString=function(d){if(d&&d.id)return d.id;throw new Error("Invalid mode")},r.isValid=function(d){return d&&d.bit&&d.ccBits};function c(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+o)}}r.from=function(d,b){if(r.isValid(d))return d;try{return c(d)}catch{return b}}})(Lr)),Lr}var Lh;function N1(){return Lh||(Lh=1,(function(r){const f=Fn(),h=r0(),c=as(),o=In(),d=s0(),b=7973,E=f.getBCHDigit(b);function g(k,B,L){for(let j=1;j<=40;j++)if(B<=r.getCapacity(j,L,k))return j}function S(k,B){return o.getCharCountIndicator(k,B)+4}function O(k,B){let L=0;return k.forEach(function(j){const nt=S(j.mode,B);L+=nt+j.getBitsLength()}),L}function D(k,B){for(let L=1;L<=40;L++)if(O(k,L)<=r.getCapacity(L,B,o.MIXED))return L}r.from=function(B,L){return d.isValid(B)?parseInt(B,10):L},r.getCapacity=function(B,L,j){if(!d.isValid(B))throw new Error("Invalid QR Code version");typeof j>"u"&&(j=o.BYTE);const nt=f.getSymbolTotalCodewords(B),G=h.getTotalCodewordsCount(B,L),q=(nt-G)*8;if(j===o.MIXED)return q;const Y=q-S(j,B);switch(j){case o.NUMERIC:return Math.floor(Y/10*3);case o.ALPHANUMERIC:return Math.floor(Y/11*2);case o.KANJI:return Math.floor(Y/13);case o.BYTE:default:return Math.floor(Y/8)}},r.getBestVersionForData=function(B,L){let j;const nt=c.from(L,c.M);if(Array.isArray(B)){if(B.length>1)return D(B,nt);if(B.length===0)return 1;j=B[0]}else j=B;return g(j.mode,j.getLength(),nt)},r.getEncodedBits=function(B){if(!d.isValid(B)||B<7)throw new Error("Invalid QR Code version");let L=B<<12;for(;f.getBCHDigit(L)-E>=0;)L^=b<<f.getBCHDigit(L)-E;return B<<12|L}})(jr)),jr}var Yr={},qh;function _1(){if(qh)return Yr;qh=1;const r=Fn(),f=1335,h=21522,c=r.getBCHDigit(f);return Yr.getEncodedBits=function(d,b){const E=d.bit<<3|b;let g=E<<10;for(;r.getBCHDigit(g)-c>=0;)g^=f<<r.getBCHDigit(g)-c;return(E<<10|g)^h},Yr}var Gr={},Qr,Yh;function M1(){if(Yh)return Qr;Yh=1;const r=In();function f(h){this.mode=r.NUMERIC,this.data=h.toString()}return f.getBitsLength=function(c){return 10*Math.floor(c/3)+(c%3?c%3*3+1:0)},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(c){let o,d,b;for(o=0;o+3<=this.data.length;o+=3)d=this.data.substr(o,3),b=parseInt(d,10),c.put(b,10);const E=this.data.length-o;E>0&&(d=this.data.substr(o),b=parseInt(d,10),c.put(b,E*3+1))},Qr=f,Qr}var Vr,Gh;function R1(){if(Gh)return Vr;Gh=1;const r=In(),f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function h(c){this.mode=r.ALPHANUMERIC,this.data=c}return h.getBitsLength=function(o){return 11*Math.floor(o/2)+6*(o%2)},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(o){let d;for(d=0;d+2<=this.data.length;d+=2){let b=f.indexOf(this.data[d])*45;b+=f.indexOf(this.data[d+1]),o.put(b,11)}this.data.length%2&&o.put(f.indexOf(this.data[d]),6)},Vr=h,Vr}var Xr,Qh;function z1(){if(Qh)return Xr;Qh=1;const r=In();function f(h){this.mode=r.BYTE,typeof h=="string"?this.data=new TextEncoder().encode(h):this.data=new Uint8Array(h)}return f.getBitsLength=function(c){return c*8},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(h){for(let c=0,o=this.data.length;c<o;c++)h.put(this.data[c],8)},Xr=f,Xr}var Zr,Vh;function D1(){if(Vh)return Zr;Vh=1;const r=In(),f=Fn();function h(c){this.mode=r.KANJI,this.data=c}return h.getBitsLength=function(o){return o*13},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(c){let o;for(o=0;o<this.data.length;o++){let d=f.toSJIS(this.data[o]);if(d>=33088&&d<=40956)d-=33088;else if(d>=57408&&d<=60351)d-=49472;else throw new Error("Invalid SJIS character: "+this.data[o]+`
Make sure your charset is UTF-8`);d=(d>>>8&255)*192+(d&255),c.put(d,13)}},Zr=h,Zr}var Kr={exports:{}},Xh;function O1(){return Xh||(Xh=1,(function(r){var f={single_source_shortest_paths:function(h,c,o){var d={},b={};b[c]=0;var E=f.PriorityQueue.make();E.push(c,0);for(var g,S,O,D,k,B,L,j,nt;!E.empty();){g=E.pop(),S=g.value,D=g.cost,k=h[S]||{};for(O in k)k.hasOwnProperty(O)&&(B=k[O],L=D+B,j=b[O],nt=typeof b[O]>"u",(nt||j>L)&&(b[O]=L,E.push(O,L),d[O]=S))}if(typeof o<"u"&&typeof b[o]>"u"){var G=["Could not find a path from ",c," to ",o,"."].join("");throw new Error(G)}return d},extract_shortest_path_from_predecessor_list:function(h,c){for(var o=[],d=c;d;)o.push(d),h[d],d=h[d];return o.reverse(),o},find_path:function(h,c,o){var d=f.single_source_shortest_paths(h,c,o);return f.extract_shortest_path_from_predecessor_list(d,o)},PriorityQueue:{make:function(h){var c=f.PriorityQueue,o={},d;h=h||{};for(d in c)c.hasOwnProperty(d)&&(o[d]=c[d]);return o.queue=[],o.sorter=h.sorter||c.default_sorter,o},default_sorter:function(h,c){return h.cost-c.cost},push:function(h,c){var o={value:h,cost:c};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=f})(Kr)),Kr.exports}var Zh;function k1(){return Zh||(Zh=1,(function(r){const f=In(),h=M1(),c=R1(),o=z1(),d=D1(),b=o0(),E=Fn(),g=O1();function S(G){return unescape(encodeURIComponent(G)).length}function O(G,q,Y){const K=[];let ot;for(;(ot=G.exec(Y))!==null;)K.push({data:ot[0],index:ot.index,mode:q,length:ot[0].length});return K}function D(G){const q=O(b.NUMERIC,f.NUMERIC,G),Y=O(b.ALPHANUMERIC,f.ALPHANUMERIC,G);let K,ot;return E.isKanjiModeEnabled()?(K=O(b.BYTE,f.BYTE,G),ot=O(b.KANJI,f.KANJI,G)):(K=O(b.BYTE_KANJI,f.BYTE,G),ot=[]),q.concat(Y,K,ot).sort(function(U,H){return U.index-H.index}).map(function(U){return{data:U.data,mode:U.mode,length:U.length}})}function k(G,q){switch(q){case f.NUMERIC:return h.getBitsLength(G);case f.ALPHANUMERIC:return c.getBitsLength(G);case f.KANJI:return d.getBitsLength(G);case f.BYTE:return o.getBitsLength(G)}}function B(G){return G.reduce(function(q,Y){const K=q.length-1>=0?q[q.length-1]:null;return K&&K.mode===Y.mode?(q[q.length-1].data+=Y.data,q):(q.push(Y),q)},[])}function L(G){const q=[];for(let Y=0;Y<G.length;Y++){const K=G[Y];switch(K.mode){case f.NUMERIC:q.push([K,{data:K.data,mode:f.ALPHANUMERIC,length:K.length},{data:K.data,mode:f.BYTE,length:K.length}]);break;case f.ALPHANUMERIC:q.push([K,{data:K.data,mode:f.BYTE,length:K.length}]);break;case f.KANJI:q.push([K,{data:K.data,mode:f.BYTE,length:S(K.data)}]);break;case f.BYTE:q.push([{data:K.data,mode:f.BYTE,length:S(K.data)}])}}return q}function j(G,q){const Y={},K={start:{}};let ot=["start"];for(let V=0;V<G.length;V++){const U=G[V],H=[];for(let X=0;X<U.length;X++){const et=U[X],$=""+V+X;H.push($),Y[$]={node:et,lastCount:0},K[$]={};for(let I=0;I<ot.length;I++){const P=ot[I];Y[P]&&Y[P].node.mode===et.mode?(K[P][$]=k(Y[P].lastCount+et.length,et.mode)-k(Y[P].lastCount,et.mode),Y[P].lastCount+=et.length):(Y[P]&&(Y[P].lastCount=et.length),K[P][$]=k(et.length,et.mode)+4+f.getCharCountIndicator(et.mode,q))}}ot=H}for(let V=0;V<ot.length;V++)K[ot[V]].end=0;return{map:K,table:Y}}function nt(G,q){let Y;const K=f.getBestModeForData(G);if(Y=f.from(q,K),Y!==f.BYTE&&Y.bit<K.bit)throw new Error('"'+G+'" cannot be encoded with mode '+f.toString(Y)+`.
 Suggested mode is: `+f.toString(K));switch(Y===f.KANJI&&!E.isKanjiModeEnabled()&&(Y=f.BYTE),Y){case f.NUMERIC:return new h(G);case f.ALPHANUMERIC:return new c(G);case f.KANJI:return new d(G);case f.BYTE:return new o(G)}}r.fromArray=function(q){return q.reduce(function(Y,K){return typeof K=="string"?Y.push(nt(K,null)):K.data&&Y.push(nt(K.data,K.mode)),Y},[])},r.fromString=function(q,Y){const K=D(q,E.isKanjiModeEnabled()),ot=L(K),V=j(ot,Y),U=g.find_path(V.map,"start","end"),H=[];for(let X=1;X<U.length-1;X++)H.push(V.table[U[X]].node);return r.fromArray(B(H))},r.rawSplit=function(q){return r.fromArray(D(q,E.isKanjiModeEnabled()))}})(Gr)),Gr}var Kh;function B1(){if(Kh)return Mr;Kh=1;const r=Fn(),f=as(),h=b1(),c=S1(),o=w1(),d=E1(),b=T1(),E=r0(),g=C1(),S=N1(),O=_1(),D=In(),k=k1();function B(V,U){const H=V.size,X=d.getPositions(U);for(let et=0;et<X.length;et++){const $=X[et][0],I=X[et][1];for(let P=-1;P<=7;P++)if(!($+P<=-1||H<=$+P))for(let it=-1;it<=7;it++)I+it<=-1||H<=I+it||(P>=0&&P<=6&&(it===0||it===6)||it>=0&&it<=6&&(P===0||P===6)||P>=2&&P<=4&&it>=2&&it<=4?V.set($+P,I+it,!0,!0):V.set($+P,I+it,!1,!0))}}function L(V){const U=V.size;for(let H=8;H<U-8;H++){const X=H%2===0;V.set(H,6,X,!0),V.set(6,H,X,!0)}}function j(V,U){const H=o.getPositions(U);for(let X=0;X<H.length;X++){const et=H[X][0],$=H[X][1];for(let I=-2;I<=2;I++)for(let P=-2;P<=2;P++)I===-2||I===2||P===-2||P===2||I===0&&P===0?V.set(et+I,$+P,!0,!0):V.set(et+I,$+P,!1,!0)}}function nt(V,U){const H=V.size,X=S.getEncodedBits(U);let et,$,I;for(let P=0;P<18;P++)et=Math.floor(P/3),$=P%3+H-8-3,I=(X>>P&1)===1,V.set(et,$,I,!0),V.set($,et,I,!0)}function G(V,U,H){const X=V.size,et=O.getEncodedBits(U,H);let $,I;for($=0;$<15;$++)I=(et>>$&1)===1,$<6?V.set($,8,I,!0):$<8?V.set($+1,8,I,!0):V.set(X-15+$,8,I,!0),$<8?V.set(8,X-$-1,I,!0):$<9?V.set(8,15-$-1+1,I,!0):V.set(8,15-$-1,I,!0);V.set(X-8,8,1,!0)}function q(V,U){const H=V.size;let X=-1,et=H-1,$=7,I=0;for(let P=H-1;P>0;P-=2)for(P===6&&P--;;){for(let it=0;it<2;it++)if(!V.isReserved(et,P-it)){let Lt=!1;I<U.length&&(Lt=(U[I]>>>$&1)===1),V.set(et,P-it,Lt),$--,$===-1&&(I++,$=7)}if(et+=X,et<0||H<=et){et-=X,X=-X;break}}}function Y(V,U,H){const X=new h;H.forEach(function(it){X.put(it.mode.bit,4),X.put(it.getLength(),D.getCharCountIndicator(it.mode,V)),it.write(X)});const et=r.getSymbolTotalCodewords(V),$=E.getTotalCodewordsCount(V,U),I=(et-$)*8;for(X.getLengthInBits()+4<=I&&X.put(0,4);X.getLengthInBits()%8!==0;)X.putBit(0);const P=(I-X.getLengthInBits())/8;for(let it=0;it<P;it++)X.put(it%2?17:236,8);return K(X,V,U)}function K(V,U,H){const X=r.getSymbolTotalCodewords(U),et=E.getTotalCodewordsCount(U,H),$=X-et,I=E.getBlocksCount(U,H),P=X%I,it=I-P,Lt=Math.floor(X/I),N=Math.floor($/I),Z=N+1,at=Lt-N,Tt=new g(at);let wt=0;const y=new Array(I),z=new Array(I);let Q=0;const F=new Uint8Array(V.buffer);for(let Ct=0;Ct<I;Ct++){const He=Ct<it?N:Z;y[Ct]=F.slice(wt,wt+He),z[Ct]=Tt.encode(y[Ct]),wt+=He,Q=Math.max(Q,He)}const ut=new Uint8Array(X);let ft=0,dt,zt;for(dt=0;dt<Q;dt++)for(zt=0;zt<I;zt++)dt<y[zt].length&&(ut[ft++]=y[zt][dt]);for(dt=0;dt<at;dt++)for(zt=0;zt<I;zt++)ut[ft++]=z[zt][dt];return ut}function ot(V,U,H,X){let et;if(Array.isArray(V))et=k.fromArray(V);else if(typeof V=="string"){let Lt=U;if(!Lt){const N=k.rawSplit(V);Lt=S.getBestVersionForData(N,H)}et=k.fromString(V,Lt||40)}else throw new Error("Invalid data");const $=S.getBestVersionForData(et,H);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!U)U=$;else if(U<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const I=Y(U,H,et),P=r.getSymbolSize(U),it=new c(P);return B(it,U),L(it),j(it,U),G(it,H,0),U>=7&&nt(it,U),q(it,I),isNaN(X)&&(X=b.getBestMask(it,G.bind(null,it,H))),b.applyMask(X,it),G(it,H,X),{modules:it,version:U,errorCorrectionLevel:H,maskPattern:X,segments:et}}return Mr.create=function(U,H){if(typeof U>"u"||U==="")throw new Error("No input text");let X=f.M,et,$;return typeof H<"u"&&(X=f.from(H.errorCorrectionLevel,f.M),et=S.from(H.version),$=b.from(H.maskPattern),H.toSJISFunc&&r.setToSJISFunction(H.toSJISFunc)),ot(U,et,X,$)},Mr}var Jr={},Fr={},Jh;function f0(){return Jh||(Jh=1,(function(r){function f(h){if(typeof h=="number"&&(h=h.toString()),typeof h!="string")throw new Error("Color should be defined as hex string");let c=h.slice().replace("#","").split("");if(c.length<3||c.length===5||c.length>8)throw new Error("Invalid hex color: "+h);(c.length===3||c.length===4)&&(c=Array.prototype.concat.apply([],c.map(function(d){return[d,d]}))),c.length===6&&c.push("F","F");const o=parseInt(c.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+c.slice(0,6).join("")}}r.getOptions=function(c){c||(c={}),c.color||(c.color={});const o=typeof c.margin>"u"||c.margin===null||c.margin<0?4:c.margin,d=c.width&&c.width>=21?c.width:void 0,b=c.scale||4;return{width:d,scale:d?4:b,margin:o,color:{dark:f(c.color.dark||"#000000ff"),light:f(c.color.light||"#ffffffff")},type:c.type,rendererOpts:c.rendererOpts||{}}},r.getScale=function(c,o){return o.width&&o.width>=c+o.margin*2?o.width/(c+o.margin*2):o.scale},r.getImageWidth=function(c,o){const d=r.getScale(c,o);return Math.floor((c+o.margin*2)*d)},r.qrToImageData=function(c,o,d){const b=o.modules.size,E=o.modules.data,g=r.getScale(b,d),S=Math.floor((b+d.margin*2)*g),O=d.margin*g,D=[d.color.light,d.color.dark];for(let k=0;k<S;k++)for(let B=0;B<S;B++){let L=(k*S+B)*4,j=d.color.light;if(k>=O&&B>=O&&k<S-O&&B<S-O){const nt=Math.floor((k-O)/g),G=Math.floor((B-O)/g);j=D[E[nt*b+G]?1:0]}c[L++]=j.r,c[L++]=j.g,c[L++]=j.b,c[L]=j.a}}})(Fr)),Fr}var Fh;function H1(){return Fh||(Fh=1,(function(r){const f=f0();function h(o,d,b){o.clearRect(0,0,d.width,d.height),d.style||(d.style={}),d.height=b,d.width=b,d.style.height=b+"px",d.style.width=b+"px"}function c(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(d,b,E){let g=E,S=b;typeof g>"u"&&(!b||!b.getContext)&&(g=b,b=void 0),b||(S=c()),g=f.getOptions(g);const O=f.getImageWidth(d.modules.size,g),D=S.getContext("2d"),k=D.createImageData(O,O);return f.qrToImageData(k.data,d,g),h(D,S,O),D.putImageData(k,0,0),S},r.renderToDataURL=function(d,b,E){let g=E;typeof g>"u"&&(!b||!b.getContext)&&(g=b,b=void 0),g||(g={});const S=r.render(d,b,g),O=g.type||"image/png",D=g.rendererOpts||{};return S.toDataURL(O,D.quality)}})(Jr)),Jr}var Ir={},Ih;function U1(){if(Ih)return Ir;Ih=1;const r=f0();function f(o,d){const b=o.a/255,E=d+'="'+o.hex+'"';return b<1?E+" "+d+'-opacity="'+b.toFixed(2).slice(1)+'"':E}function h(o,d,b){let E=o+d;return typeof b<"u"&&(E+=" "+b),E}function c(o,d,b){let E="",g=0,S=!1,O=0;for(let D=0;D<o.length;D++){const k=Math.floor(D%d),B=Math.floor(D/d);!k&&!S&&(S=!0),o[D]?(O++,D>0&&k>0&&o[D-1]||(E+=S?h("M",k+b,.5+B+b):h("m",g,0),g=0,S=!1),k+1<d&&o[D+1]||(E+=h("h",O),O=0)):g++}return E}return Ir.render=function(d,b,E){const g=r.getOptions(b),S=d.modules.size,O=d.modules.data,D=S+g.margin*2,k=g.color.light.a?"<path "+f(g.color.light,"fill")+' d="M0 0h'+D+"v"+D+'H0z"/>':"",B="<path "+f(g.color.dark,"stroke")+' d="'+c(O,S,g.margin)+'"/>',L='viewBox="0 0 '+D+" "+D+'"',nt='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+L+' shape-rendering="crispEdges">'+k+B+`</svg>
`;return typeof E=="function"&&E(null,nt),nt},Ir}var Wh;function j1(){if(Wh)return Ha;Wh=1;const r=v1(),f=B1(),h=H1(),c=U1();function o(d,b,E,g,S){const O=[].slice.call(arguments,1),D=O.length,k=typeof O[D-1]=="function";if(!k&&!r())throw new Error("Callback required as last argument");if(k){if(D<2)throw new Error("Too few arguments provided");D===2?(S=E,E=b,b=g=void 0):D===3&&(b.getContext&&typeof S>"u"?(S=g,g=void 0):(S=g,g=E,E=b,b=void 0))}else{if(D<1)throw new Error("Too few arguments provided");return D===1?(E=b,b=g=void 0):D===2&&!b.getContext&&(g=E,E=b,b=void 0),new Promise(function(B,L){try{const j=f.create(E,g);B(d(j,b,g))}catch(j){L(j)}})}try{const B=f.create(E,g);S(null,d(B,b,g))}catch(B){S(B)}}return Ha.create=f.create,Ha.toCanvas=o.bind(null,h.render),Ha.toDataURL=o.bind(null,h.renderToDataURL),Ha.toString=o.bind(null,function(d,b,E){return c.render(d,E)}),Ha}var L1=j1();const q1=Hg(L1),Wr=`${window.location.origin}/hpde/`;function Y1(){const[r,f]=vt.useState(!1),[h,c]=vt.useState(null);vt.useEffect(()=>{window.scrollTo(0,0),q1.toDataURL(Wr,{margin:1,width:240}).then(c).catch(()=>c(null))},[]);async function o(){await navigator.clipboard.writeText(Wr),f(!0),setTimeout(()=>f(!1),2e3)}return v.jsx("div",{className:"min-h-screen bg-gray-50",children:v.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[v.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[v.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),v.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:v.jsx(es,{size:18})})]}),v.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),v.jsxs("button",{onClick:o,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[v.jsx("span",{className:"truncate text-sm text-gray-800",children:Wr}),r?v.jsx(au,{size:16,className:"shrink-0 text-green-600"}):v.jsx(l0,{size:16,className:"shrink-0 text-gray-400"})]}),v.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:h&&v.jsx("img",{src:h,alt:"QR code for schedule link",width:240,height:240})})]})})}const G1=350,Q1="cubic-bezier(0.32, 0.72, 0, 1)";function V1(r){try{return new URL(r).hostname.replace(/^www\./,"")}catch{return r}}function Ua({label:r,children:f}){return v.jsxs("div",{className:"grid grid-cols-[96px_1fr] items-baseline gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[v.jsx("span",{className:"text-[13px] font-medium text-gray-500",children:r}),v.jsx("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:f})]})}function X1({event:r,open:f,onClose:h}){vt.useEffect(()=>{if(!f)return;const d=b=>{b.key==="Escape"&&h()};return window.addEventListener("keydown",d),()=>window.removeEventListener("keydown",d)},[f,h]);const c=i0(r.days),o=c||r.organizer||r.track||r.configuration||r.direction||r.link;return v.jsxs(v.Fragment,{children:[v.jsx("div",{"aria-hidden":"true",inert:!f,onClick:h,className:"fixed inset-0 z-40",style:{pointerEvents:f?"auto":"none"}}),v.jsx("div",{role:"dialog","aria-modal":f,"aria-labelledby":"event-details-title",inert:!f,className:"fixed inset-y-0 right-0 z-50 flex w-full bg-gray-50 md:w-[480px] md:max-w-[60vw]",style:{transform:f?"translate3d(0,0,0)":"translate3d(100%,0,0)",transition:`transform ${G1}ms ${Q1}`,boxShadow:f?"-8px 0 24px rgba(0,0,0,0.08)":"none",willChange:"transform"},children:v.jsxs("div",{className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none",children:[v.jsxs("div",{className:"mb-5 flex items-start gap-2 md:justify-between md:gap-4",children:[v.jsx("button",{onClick:h,"aria-label":"Back",className:"inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden",children:v.jsx(Wg,{size:20})}),v.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"}),v.jsx("button",{onClick:h,"aria-label":"Close",className:"hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid",children:v.jsx(es,{size:20})})]}),o?v.jsxs("div",{className:"rounded-xl border border-gray-200 bg-white px-3.5 py-1 shadow-sm",children:[c&&v.jsx(Ua,{label:"Dates",children:c}),r.organizer&&v.jsx(Ua,{label:"Organizer",children:r.organizer}),r.track&&v.jsx(Ua,{label:"Track",children:r.track}),r.configuration&&v.jsx(Ua,{label:"Config",children:r.configuration}),r.direction&&v.jsx(Ua,{label:"Direction",children:r.direction}),r.link&&v.jsx(Ua,{label:"Event page",children:v.jsxs("a",{href:r.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[V1(r.link),v.jsx($g,{size:12,className:"text-gray-400"})]})})]}):v.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})})]})}function ja(r,f){const h=f.split(`
`).map(L=>L.trim());let c="",o,d,b,E,g,S;const O=[],D=[];let k=null,B=!1;for(const L of h){if(!L||L.startsWith("//"))continue;const j=L.replace(/^-\s+/,"");if(j.startsWith("# ")){c=j.slice(2).trim();continue}if(j.startsWith("subtitle:")){o=j.slice(9).trim()||void 0;continue}if(j.startsWith("link:")){d=j.slice(5).trim()||void 0;continue}if(j.startsWith("organizer:")){b=j.slice(10).trim()||void 0;continue}if(j.startsWith("track:")){E=j.slice(6).trim()||void 0;continue}if(j.startsWith("configuration:")){g=j.slice(14).trim()||void 0;continue}if(j.startsWith("config:")){g=j.slice(7).trim()||void 0;continue}if(j.startsWith("direction:")){S=j.slice(10).trim()||void 0;continue}if(j.startsWith("## ")){const nt=j.slice(3).trim();if(nt.toLowerCase()==="groups"){B=!0,k=null;continue}const G=nt.split("|").map(q=>q.trim());G.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(G[1])?(B=!1,k={id:G[0].toLowerCase().replace(/\s+/g,"-"),label:G[0],date:G[1],activities:[]},D.push(k)):B=!1;continue}if(B){const nt=j.split("|").map(G=>G.trim());if(nt.length>=4){const G=nt[4]||void 0;O.push({id:nt[0],label:nt[1],bgClass:nt[2],textClass:nt[3],...G?{description:G}:{}})}continue}if(k){if(/^\d{2}:\d{2}/.test(j)){const nt=Z1(j);nt&&k.activities.push(nt)}else if(/^break\s*\|/.test(j)){const nt=j.slice(j.indexOf("|")+1).trim();k.activities.push({type:"break",label:nt})}}}return{id:r,name:c,...o?{subtitle:o}:{},...d?{link:d}:{},...b?{organizer:b}:{},...E?{track:E}:{},...g?{configuration:g}:{},...S?{direction:S}:{},runGroups:O,days:D}}function Z1(r){const f=r.split("|").map(E=>E.trim()),h=f[0],c=f.slice(1),o=h.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!o)return null;const d=o[1],b=o[2].trim();if(/^(general|lunch|special)$/.test(b)){const E=b,g=c[0]??"",S=c[1]||void 0;return{time:d,type:E,label:g,...S?{subtitle:S}:{}}}if(/^session/.test(b)){const E=b.match(/^session\s+(\d+)/),g=E?parseInt(E[1],10):void 0;let S=[],O=[],D;for(const k of c)k.startsWith("track:")?S=k.slice(6).trim().split(",").map(B=>B.trim()).filter(Boolean):k.startsWith("class:")?O=k.slice(6).trim().split(",").map(B=>B.trim()).filter(Boolean):k.startsWith("note:")&&(D=k.slice(5).trim()||void 0);return{time:d,type:"session",...g!==void 0?{sessionNumber:g}:{},onTrack:S,...O.length?{inClass:O}:{},...D?{note:D}:{}}}return null}const K1=`# TDE at MSRC 1.7CW

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track name>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here.)
//
// ## groups — one line per run group:
//   <id> | <Label> | <bg color class> | <text color class> | <optional description>
//
// One "## <Day label> | YYYY-MM-DD" section per event day, events listed below it:
//   HH:MM general | <label> | <optional subtitle>
//   HH:MM lunch   | <label> | <optional subtitle>
//   HH:MM session <n> | track: <group ids> | class: <group ids> | note: <text>
//   break | <label>
\`\`\`

- organizer: The Drivers Edge
- track: MSR Cresson
- configuration: 1.7 mile
- direction: Clockwise
- link:

## groups

- instructors | Instructors | bg-zinc-900      | text-white
- pink        | Pink        | bg-runpink-500   | text-white
- purple      | Purple      | bg-runpurple-500 | text-white
- orange      | Orange      | bg-runorange-500 | text-white

## Friday | 2026-09-11

- 16:00 general | Gates open for unloading / set-up | Not mandatory
- 17:00 general | Opportunity to walk the track
- 22:00 general | Gates close

## Saturday | 2026-09-12

- 06:30 general | Track gates open | Possibly 6:00 per email reminder
- 07:00 general | Instructor's meeting
- 07:00 general | Drivers sign-in | Ends at 7:20 — have tech sheet ready; new drivers bring license and insurance
- 07:30 general | Mandatory drivers meeting | MSRC clubhouse upstairs
- 08:00 general | Track goes hot

- 08:00 session 1 | track: instructors | class: purple
- 08:30 session 1 | track: pink
- 08:55 session 1 | track: purple      | class: pink
- break | 10 minute instructor / corner worker break
- 09:30 session 1 | track: orange      | class: purple

- 09:55 session 2 | track: instructors | class: orange
- 10:25 session 2 | track: pink
- 10:50 session 2 | track: purple
- 11:15 session 2 | track: orange      | class: purple

- 11:40 lunch | Lunch / Lead-follow laps | 40 minutes · no food vendor on site

- 12:20 session 3 | track: instructors
- 12:50 session 3 | track: pink
- 13:15 session 3 | track: purple      | class: pink
- break | 10 minute instructor / corner worker break
- 13:50 session 3 | track: orange      | class: purple

- 14:15 session 4 | track: instructors | class: orange
- 14:35 session 4 | track: pink
- 15:00 session 4 | track: purple
- 15:25 session 4 | track: orange      | class: purple

- 15:50 session 5 | track: pink
- 16:10 session 5 | track: purple
- 16:30 session 5 | track: orange

- 16:50 general | Track goes cold
`,J1="/hpde/assets/msrc-1-7-D9G0r_nf.jpg",F1={...ja("2026-09-11_msrc-1-7",K1),mapImage:J1},I1=`# SCCA at MSRC 1.7 CW

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track name>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here.)
//
// ## groups — one line per run group:
//   <id> | <Label> | <bg color class> | <text color class> | <optional description>
//
// One "## <Day label> | YYYY-MM-DD" section per event day, events listed below it:
//   HH:MM general | <label> | <optional subtitle>
//   HH:MM lunch   | <label> | <optional subtitle>
//   HH:MM session <n> | track: <group ids> | class: <group ids> | note: <text>
//   break | <label>
\`\`\`

- organizer: Texas Region SCCA
- track: Motorsport Ranch, Cresson
- configuration: 1.7
- direction: Clockwise
- link: https://www.motorsportreg.com/events/txr-scca-time-trial-track-day-hpde-7-motorsport-ranch-cresson-texas-556724

## groups

- red    | Red    | bg-runred-500    | text-white | Time Trial
- green  | Green  | bg-rungreen-500  | text-white | Time Trial
- purple | Purple | bg-runpurple-500 | text-white | Time Trial
- orange | Orange | bg-runorange-500 | text-white | Track Day
- blue   | Blue   | bg-runblue-500   | text-white | Novice

## Sunday | 2026-09-13

- 06:30 general | Gates open
- 07:00 general | Registration / check-in opens
- 07:45 general | Instructor's meeting
- 08:00 general | Mandatory all drivers meeting | In clubhouse

- 08:30 session 1 | track: red | class: blue
- 08:50 session 1 | track: green
- 09:10 session 1 | track: purple
- 09:30 session 1 | track: orange
- 09:50 session 1 | track: blue
- break | 10 minute corner worker break

- 10:25 session 2 | track: red | class: blue
- 10:45 session 2 | track: green
- 11:05 session 2 | track: purple
- 11:25 session 2 | track: orange
- 11:45 session 2 | track: blue

- 12:10 lunch | Lunch | 60 minutes

- 13:10 session 3 | track: red | class: blue
- 13:30 session 3 | track: green
- 13:50 session 3 | track: purple
- 14:10 session 3 | track: orange
- 14:30 session 3 | track: blue
- break | 10 minute corner worker break

- 15:05 session 4 | track: red    | note: Report to impound after session
- 15:25 session 4 | track: green  | note: Report to impound after session
- 15:45 session 4 | track: purple | note: Report to impound after session
- 16:05 session 4 | track: orange
- 16:25 session 4 | track: blue
- 16:50 session 4 | track: blue | note: Novice demo session

- 17:00 general | Track is cold
- 17:15 general | Refreshments and trophies
`,W1=ja("2026-09-13_msr-scca",I1),$1=`# MSRC 1.7 Fast Track

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track name>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here.)
//
// ## groups — one line per run group:
//   <id> | <Label> | <bg color class> | <text color class> | <optional description>
//
// One "## <Day label> | YYYY-MM-DD" section per event day, events listed below it:
//   HH:MM general | <label> | <optional subtitle>
//   HH:MM lunch   | <label> | <optional subtitle>
//   HH:MM session <n> | track: <group ids> | class: <group ids> | note: <text>
//   break | <label>
\`\`\`

- organizer:
- track: MSR Cresson
- configuration: 1.7 mile
- direction:
- link:

## groups

- instructors | Instructors | bg-zinc-900 | text-white
- pink | Pink | bg-runpink-500 | text-white
- orange | Orange | bg-runorange-500 | text-white

## Saturday | 2026-06-06

- 07:00 general | Instructor's meeting
- 07:15 general | Drivers sign-in
- 07:30 general | Driver's meeting
- 08:00 general | Track goes hot

- 08:00 session 1 | track: instructors
- 08:25 session 1 | track: pink
- 08:50 session 1 | track: orange
- break | Instructor / corner worker break

- 09:20 session 2 | track: instructors
- 09:45 session 2 | track: pink
- 10:10 session 2 | track: orange | class: pink
- break | Instructor / corner worker break

- 10:40 session 3 | track: instructors | class: orange
- 11:05 session 3 | track: pink
- 11:30 session 3 | track: orange

- 12:05 lunch | Lunch break / lead-follow laps | 40 minutes

- 12:45 session 4 | track: instructors
- 13:10 session 4 | track: pink
- 13:35 session 4 | track: orange
- break | Corner worker break

- 14:05 session 5 | track: pink
- 14:25 session 5 | track: orange
- 14:45 general | Track goes cold
`,P1=ja("2026-06-06_msrc-1-7",$1),tp=`# MSRC 3.1

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track name>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here.)
//
// ## groups — one line per run group:
//   <id> | <Label> | <bg color class> | <text color class> | <optional description>
//
// One "## <Day label> | YYYY-MM-DD" section per event day, events listed below it:
//   HH:MM general | <label> | <optional subtitle>
//   HH:MM lunch   | <label> | <optional subtitle>
//   HH:MM session <n> | track: <group ids> | class: <group ids> | note: <text>
//   break | <label>
\`\`\`

- organizer:
- track: MSR Cresson
- configuration: 3.1 mile
- direction:
- link:

## groups

- instructors | Instructors | bg-zinc-900 | text-white
- red | Red | bg-runred-500 | text-white
- yellow | Yellow | bg-runyellow-500 | text-white
- green | Green | bg-rungreen-500 | text-white
- blue | Blue | bg-runblue-500 | text-white

## Friday | 2025-11-07

- 16:00 general | Gates open for unloading / set-up
- 17:00 general | Opportunity to walk the track
- 22:00 general | Gates close

## Saturday | 2025-11-08

- 06:30 general | Track gates open
- 07:15 general | Drivers sign in | Bring tech sheet, driver's license, and insurance card
- 07:30 general | Instructor meeting
- 08:00 general | Mandatory drivers meeting
- 08:30 general | Track goes hot

- 08:30 session 1 | track: instructors | class: green
- 08:55 session 1 | track: red | class: blue
- 09:20 session 1 | track: green
- 09:45 session 1 | track: yellow | class: green
- 10:10 session 1 | track: blue | class: yellow, red

- 10:40 session 2 | track: instructors
- 11:05 session 2 | track: red
- 11:30 session 2 | track: green
- 11:55 session 2 | track: yellow | class: green
- 12:20 session 2 | track: blue

- 12:45 lunch | Lunch / Lead-follow laps | Hot lunch available 11:00 AM – 1:30 PM

- 13:15 session 3 | track: red | class: blue
- 13:40 session 3 | track: green
- 14:05 session 3 | track: yellow | class: green
- 14:30 session 3 | track: blue | class: yellow, red
- 15:00 session 3 | track: instructors

- 15:25 session 4 | track: red
- 15:50 session 4 | track: green
- 16:15 session 4 | track: yellow
- 16:40 session 4 | track: blue
- 17:05 session 4 | track: instructors

- 17:30 special | Pizza party (BYOB) | Hosted by Five Star Performance Ford

## Sunday | 2025-11-09

- 07:00 general | Track gates open
- 07:10 general | Church service
- 07:30 general | Instructor meeting
- 08:00 general | Mandatory drivers meeting
- 08:30 general | Track goes hot

- 08:30 session 1 | track: instructors | class: green
- 08:55 session 1 | track: red | class: blue
- 09:20 session 1 | track: green
- 09:45 session 1 | track: yellow | class: green
- 10:10 session 1 | track: blue | class: yellow, red

- 10:40 session 2 | track: instructors
- 11:05 session 2 | track: red
- 11:30 session 2 | track: green
- 11:55 session 2 | track: yellow
- 12:20 session 2 | track: blue

- 12:45 lunch | Lunch / Lead-follow laps | Hot lunch available 11:00 AM – 1:30 PM

- 13:15 session 3 | track: instructors
- 13:40 session 3 | track: red | class: blue
- 14:05 session 3 | track: green
- 14:30 session 3 | track: yellow | class: green
- 14:55 session 3 | track: blue | class: yellow, red

- 15:25 session 4 | track: red
- 15:45 session 4 | track: green
- 16:05 session 4 | track: yellow
- 16:30 session 4 | track: blue
`,ep=ja("2025-11-07_msrc-3-1",tp),np=`# ECR 2.7

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track name>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here.)
//
// ## groups — one line per run group:
//   <id> | <Label> | <bg color class> | <text color class> | <optional description>
//
// One "## <Day label> | YYYY-MM-DD" section per event day, events listed below it:
//   HH:MM general | <label> | <optional subtitle>
//   HH:MM lunch   | <label> | <optional subtitle>
//   HH:MM session <n> | track: <group ids> | class: <group ids> | note: <text>
//   break | <label>
\`\`\`

- organizer:
- track: Eagles Canyon Raceway
- configuration: 2.7 mile
- direction:
- link:

## groups

- instructors | Instructors | bg-zinc-900 | text-white
- orange | Orange | bg-runorange-500 | text-white
- pink | Pink | bg-runpink-500 | text-white
- purple | Purple | bg-runpurple-500 | text-white

## Saturday | 2026-05-30

- 06:30 general | Track gates open
- 07:15 general | Drivers sign in | 7:15 – 7:45 AM
- 07:30 general | Instructor meeting
- 08:00 general | Drivers meeting
- 08:30 general | Track goes hot

- 08:30 session | track: instructors | class: purple
- 08:50 session | track: pink
- 09:15 session | track: purple | class: pink
- break | Instructor break

- 09:50 session 1 | track: orange | class: purple
- break | Corner worker break
- 10:25 session | track: instructors | class: orange

- 10:45 session | track: pink
- 11:10 session | track: purple
- break | Instructor break

- 11:45 session 2 | track: orange | class: purple

- 12:10 lunch | Lunch / Lead-follow laps

- 12:40 session | track: instructors
- 13:00 session | track: pink
- 13:25 session | track: purple | class: pink
- break | Instructor break

- 14:00 session 3 | track: orange | class: purple
- break | Corner worker break
- 14:35 session | track: instructors | class: orange

- 14:55 session | track: pink
- 15:20 session | track: purple
- break | Instructor break

- 15:55 session 4 | track: orange | class: purple
- break | Corner worker break
- 16:25 session | track: pink
- 16:45 session | track: purple
- break | Instructor break

- 17:15 session 5 | track: orange

- 17:35 general | Track goes cold
`,ap=ja("2026-05-30_ecr-2-7",np),lp=`# Test Event

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track name>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here.)
//
// ## groups — one line per run group:
//   <id> | <Label> | <bg color class> | <text color class> | <optional description>
//
// One "## <Day label> | YYYY-MM-DD" section per event day, events listed below it:
//   HH:MM general | <label> | <optional subtitle>
//   HH:MM lunch   | <label> | <optional subtitle>
//   HH:MM session <n> | track: <group ids> | class: <group ids> | note: <text>
//   break | <label>
\`\`\`

- organizer:
- track:
- configuration:
- direction:
- link:
- subtitle: Test data, not a real event

## groups

- red    | Red    | bg-runred-500    | text-white | Time Trial
- green  | Green  | bg-rungreen-500  | text-white | Time Trial
- purple | Purple | bg-runpurple-500 | text-white | Time Trial
- orange | Orange | bg-runorange-500 | text-white | Track Day
- blue   | Blue   | bg-runblue-500   | text-white | Novice

## Today | 2000-01-01

- 00:00 session 1 | track: red | class: blue | note: Pre-dawn test session
- 00:30 session 1 | track: green | class: purple
- 01:00 session 2 | track: orange | class: blue | note: Second test group up
- 01:30 session 2 | track: red | class: green
- 02:00 session 3 | track: purple | class: orange | note: Coffee run happens after

- 06:30 general | Gates open
- 07:00 general | Registration / check-in opens
- 07:45 general | Instructor's meeting
- 08:00 general | Mandatory all drivers meeting | In clubhouse

- 08:30 session 1 | track: red | class: blue
- 08:50 session 1 | track: green
- 09:10 session 1 | track: purple
- 09:30 session 1 | track: orange
- 09:50 session 1 | track: blue
- break | 10 minute corner worker break

- 10:25 session 2 | track: red | class: blue
- 10:45 session 2 | track: green
- 11:05 session 2 | track: purple
- 11:25 session 2 | track: orange
- 11:45 session 2 | track: blue

- 12:10 lunch | Lunch | 60 minutes

- 13:10 session 3 | track: red | class: orange
- 13:30 session 3 | track: green
- 13:50 session 3 | track: purple
- 14:10 session 3 | track: orange
- 14:30 session 3 | track: blue
- break | 10 minute corner worker break

- 15:05 session 4 | track: red
- 15:25 session 4 | track: green
- 15:45 session 4 | track: purple
- 16:05 session 4 | track: orange
- 16:25 session 4 | track: blue

- 17:00 general | Track is cold
- 17:15 general | Refreshments and trophies

- 17:35 general | Track re-opens for fun laps
- 18:00 session 5 | track: red | class: blue | note: Bring your logbook
- 18:30 session 5 | track: green
- 19:00 general | Post-event dinner | Chef's choice buffet
- 20:00 general | Paddock hangout
- 21:00 general | Night driving demo | Bring a jacket
- 22:00 session 6 | track: purple | class: blue | note: Instructor briefing at start
- 22:30 session 6 | track: orange | class: green | note: Last group of the day
- 23:00 session 7 | track: red | class: green | note: Cool-down laps, 60 mph max
- 23:45 session 8 | track: orange | class: purple | note: Final laps before gates close
`,$h=ja("test-live",lp),ip={...$h,days:$h.days.map(r=>({...r,date:kl()}))},eu=[F1,W1,P1,ap,ep].sort((r,f)=>f.id.localeCompare(r.id)),Ph=[...eu,ip];function tu(r,f){const[h,c]=vt.useState(()=>{try{const o=localStorage.getItem(r);return o!==null?JSON.parse(o):f}catch{return f}});return vt.useEffect(()=>{localStorage.setItem(r,JSON.stringify(h))},[r,h]),[h,c]}function d0(r){const f=kl();return r.days.find(h=>h.date===f)}function t0(r){return d0(r)??r.days[0]}function up(){const[r,f]=vt.useState(()=>window.location.hash);vt.useEffect(()=>{const c=()=>{f(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",c),()=>window.removeEventListener("hashchange",c)},[]);function h(c){window.location.hash!==c&&(window.location.hash=c)}return[r,h]}const Pr="#/event/";function e0(r){return`${Pr}${encodeURIComponent(r)}`}function cp(r){return r.startsWith(Pr)?decodeURIComponent(r.slice(Pr.length)):null}function rp(){const[r,f]=up(),[h,c]=vt.useState("schedule"),[o,d]=tu("hpde:activeEvent",eu[0].id),[b,E]=tu("hpde:activeDay",null),[g,S]=tu("hpde:groups",[]),[O,D]=tu("hpde:hidePast",!1),[k,B]=vt.useState(!1),L=Ph.find(H=>H.id===o)??eu[0],j=L.days.find(H=>H.id===b)??t0(L),nt=d0(L),G=j.date===kl(),q=L.days.length>1,K=L.days.reduce((H,X)=>X.date>H?X.date:H,L.days[0].date)<kl(),[,ot]=vt.useState(0);vt.useEffect(()=>{if(!G)return;const H=setInterval(()=>ot(X=>X+1),6e4);return()=>clearInterval(H)},[G]);const V=G&&j.activities.some(H=>H.type!=="break"&&en(H.time)<ns());function U(H){d(H.id),E(t0(H).id),S([]),f(e0(H.id))}return vt.useEffect(()=>{const H=cp(r);if(H){const X=Ph.find(et=>et.id===H);X&&X.id!==o&&U(X);return}(r===""||r==="#")&&f(e0(o))},[r]),r==="#/widget-script"?v.jsx(y1,{}):r==="#/share"?v.jsx(Y1,{}):v.jsxs(v.Fragment,{children:[v.jsx(g1,{children:v.jsxs("div",{className:"min-h-screen bg-gray-50",children:[v.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[v.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[v.jsx(d1,{events:eu,active:L,onChange:U,onOpenDetails:()=>B(!0)}),v.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[v.jsx("button",{onClick:()=>c("schedule"),className:`rounded-md p-2 transition-colors ${h==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:v.jsx(Ig,{size:18})}),v.jsx("button",{onClick:()=>c("map"),className:`rounded-md p-2 transition-colors ${h==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:v.jsx(yh,{size:18})})]})]}),K&&v.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),h==="schedule"&&v.jsxs(v.Fragment,{children:[q&&v.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[v.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:L.days.map(H=>v.jsx("button",{onClick:()=>E(H.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${j.id===H.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:H.label},H.id))}),v.jsx("button",{onClick:()=>nt&&E(nt.id),disabled:G||!nt,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${G||!nt?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),v.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[v.jsx(f1,{groups:L.runGroups,selected:g,onChange:S}),V&&v.jsx(h1,{checked:O,onChange:()=>D(H=>!H),label:"Hide past activities"})]}),v.jsx(o1,{activities:j.activities,runGroups:L.runGroups,isToday:G,selectedGroups:g,hidePast:O}),v.jsx(p1,{groups:L.runGroups})]}),h==="map"&&(L.mapImage?v.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:v.jsx("img",{src:L.mapImage,alt:`${L.name} track map`,className:"block w-full h-auto"})}):v.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:v.jsxs("div",{className:"text-center",children:[v.jsx(yh,{size:40,className:"mx-auto mb-2 opacity-30"}),v.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),v.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[v.jsxs("div",{children:[v.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",v.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),v.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",c1("2026-09-17T16:53:52-05:00")]})]})]})}),v.jsx(X1,{event:L,open:k,onClose:()=>B(!1)})]})}Zg.createRoot(document.getElementById("root")).render(v.jsx(vt.StrictMode,{children:v.jsx(rp,{})}));
