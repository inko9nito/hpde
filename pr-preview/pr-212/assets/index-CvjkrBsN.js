(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))r(d);new MutationObserver(d=>{for(const h of d)if(h.type==="childList")for(const v of h.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&r(v)}).observe(document,{childList:!0,subtree:!0});function f(d){const h={};return d.integrity&&(h.integrity=d.integrity),d.referrerPolicy&&(h.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?h.credentials="include":d.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function r(d){if(d.ep)return;d.ep=!0;const h=f(d);fetch(d.href,h)}})();function Wp(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Es={exports:{}},Rl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hh;function $p(){if(hh)return Rl;hh=1;var s=Symbol.for("react.transitional.element"),c=Symbol.for("react.fragment");function f(r,d,h){var v=null;if(h!==void 0&&(v=""+h),d.key!==void 0&&(v=""+d.key),"key"in d){h={};for(var S in d)S!=="key"&&(h[S]=d[S])}else h=d;return d=h.ref,{$$typeof:s,type:r,key:v,ref:d!==void 0?d:null,props:h}}return Rl.Fragment=c,Rl.jsx=f,Rl.jsxs=f,Rl}var gh;function Pp(){return gh||(gh=1,Es.exports=$p()),Es.exports}var g=Pp(),Ns={exports:{}},se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mh;function e0(){if(mh)return se;mh=1;var s=Symbol.for("react.transitional.element"),c=Symbol.for("react.portal"),f=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),v=Symbol.for("react.context"),S=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),y=Symbol.for("react.memo"),k=Symbol.for("react.lazy"),R=Symbol.for("react.activity"),H=Symbol.iterator;function L(w){return w===null||typeof w!="object"?null:(w=H&&w[H]||w["@@iterator"],typeof w=="function"?w:null)}var q={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},K=Object.assign,ie={};function U(w,z,X){this.props=w,this.context=z,this.refs=ie,this.updater=X||q}U.prototype.isReactComponent={},U.prototype.setState=function(w,z){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,z,"setState")},U.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function j(){}j.prototype=U.prototype;function M(w,z,X){this.props=w,this.context=z,this.refs=ie,this.updater=X||q}var Y=M.prototype=new j;Y.constructor=M,K(Y,U.prototype),Y.isPureReactComponent=!0;var oe=Array.isArray;function V(){}var B={H:null,A:null,T:null,S:null},J=Object.prototype.hasOwnProperty;function Q(w,z,X){var W=X.ref;return{$$typeof:s,type:w,key:z,ref:W!==void 0?W:null,props:X}}function ee(w,z){return Q(w.type,z,w.props)}function $(w){return typeof w=="object"&&w!==null&&w.$$typeof===s}function G(w){var z={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(X){return z[X]})}var Z=/\/+/g;function ne(w,z){return typeof w=="object"&&w!==null&&w.key!=null?G(""+w.key):z.toString(36)}function Be(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(V,V):(w.status="pending",w.then(function(z){w.status==="pending"&&(w.status="fulfilled",w.value=z)},function(z){w.status==="pending"&&(w.status="rejected",w.reason=z)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function A(w,z,X,W,re){var fe=typeof w;(fe==="undefined"||fe==="boolean")&&(w=null);var he=!1;if(w===null)he=!0;else switch(fe){case"bigint":case"string":case"number":he=!0;break;case"object":switch(w.$$typeof){case s:case c:he=!0;break;case k:return he=w._init,A(he(w._payload),z,X,W,re)}}if(he)return re=re(w),he=W===""?"."+ne(w,0):W,oe(re)?(X="",he!=null&&(X=he.replace(Z,"$&/")+"/"),A(re,z,X,"",function(jt){return jt})):re!=null&&($(re)&&(re=ee(re,X+(re.key==null||w&&w.key===re.key?"":(""+re.key).replace(Z,"$&/")+"/")+he)),z.push(re)),1;he=0;var ke=W===""?".":W+":";if(oe(w))for(var Ce=0;Ce<w.length;Ce++)W=w[Ce],fe=ke+ne(W,Ce),he+=A(W,z,X,fe,re);else if(Ce=L(w),typeof Ce=="function")for(w=Ce.call(w),Ce=0;!(W=w.next()).done;)W=W.value,fe=ke+ne(W,Ce++),he+=A(W,z,X,fe,re);else if(fe==="object"){if(typeof w.then=="function")return A(Be(w),z,X,W,re);throw z=String(w),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.")}return he}function I(w,z,X){if(w==null)return w;var W=[],re=0;return A(w,W,"","",function(fe){return z.call(X,fe,re++)}),W}function ae(w){if(w._status===-1){var z=w._result;z=z(),z.then(function(X){(w._status===0||w._status===-1)&&(w._status=1,w._result=X)},function(X){(w._status===0||w._status===-1)&&(w._status=2,w._result=X)}),w._status===-1&&(w._status=0,w._result=z)}if(w._status===1)return w._result.default;throw w._result}var Te=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},Se={map:I,forEach:function(w,z,X){I(w,function(){z.apply(this,arguments)},X)},count:function(w){var z=0;return I(w,function(){z++}),z},toArray:function(w){return I(w,function(z){return z})||[]},only:function(w){if(!$(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return se.Activity=R,se.Children=Se,se.Component=U,se.Fragment=f,se.Profiler=d,se.PureComponent=M,se.StrictMode=r,se.Suspense=m,se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,se.__COMPILER_RUNTIME={__proto__:null,c:function(w){return B.H.useMemoCache(w)}},se.cache=function(w){return function(){return w.apply(null,arguments)}},se.cacheSignal=function(){return null},se.cloneElement=function(w,z,X){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var W=K({},w.props),re=w.key;if(z!=null)for(fe in z.key!==void 0&&(re=""+z.key),z)!J.call(z,fe)||fe==="key"||fe==="__self"||fe==="__source"||fe==="ref"&&z.ref===void 0||(W[fe]=z[fe]);var fe=arguments.length-2;if(fe===1)W.children=X;else if(1<fe){for(var he=Array(fe),ke=0;ke<fe;ke++)he[ke]=arguments[ke+2];W.children=he}return Q(w.type,re,W)},se.createContext=function(w){return w={$$typeof:v,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:h,_context:w},w},se.createElement=function(w,z,X){var W,re={},fe=null;if(z!=null)for(W in z.key!==void 0&&(fe=""+z.key),z)J.call(z,W)&&W!=="key"&&W!=="__self"&&W!=="__source"&&(re[W]=z[W]);var he=arguments.length-2;if(he===1)re.children=X;else if(1<he){for(var ke=Array(he),Ce=0;Ce<he;Ce++)ke[Ce]=arguments[Ce+2];re.children=ke}if(w&&w.defaultProps)for(W in he=w.defaultProps,he)re[W]===void 0&&(re[W]=he[W]);return Q(w,fe,re)},se.createRef=function(){return{current:null}},se.forwardRef=function(w){return{$$typeof:S,render:w}},se.isValidElement=$,se.lazy=function(w){return{$$typeof:k,_payload:{_status:-1,_result:w},_init:ae}},se.memo=function(w,z){return{$$typeof:y,type:w,compare:z===void 0?null:z}},se.startTransition=function(w){var z=B.T,X={};B.T=X;try{var W=w(),re=B.S;re!==null&&re(X,W),typeof W=="object"&&W!==null&&typeof W.then=="function"&&W.then(V,Te)}catch(fe){Te(fe)}finally{z!==null&&X.types!==null&&(z.types=X.types),B.T=z}},se.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},se.use=function(w){return B.H.use(w)},se.useActionState=function(w,z,X){return B.H.useActionState(w,z,X)},se.useCallback=function(w,z){return B.H.useCallback(w,z)},se.useContext=function(w){return B.H.useContext(w)},se.useDebugValue=function(){},se.useDeferredValue=function(w,z){return B.H.useDeferredValue(w,z)},se.useEffect=function(w,z){return B.H.useEffect(w,z)},se.useEffectEvent=function(w){return B.H.useEffectEvent(w)},se.useId=function(){return B.H.useId()},se.useImperativeHandle=function(w,z,X){return B.H.useImperativeHandle(w,z,X)},se.useInsertionEffect=function(w,z){return B.H.useInsertionEffect(w,z)},se.useLayoutEffect=function(w,z){return B.H.useLayoutEffect(w,z)},se.useMemo=function(w,z){return B.H.useMemo(w,z)},se.useOptimistic=function(w,z){return B.H.useOptimistic(w,z)},se.useReducer=function(w,z,X){return B.H.useReducer(w,z,X)},se.useRef=function(w){return B.H.useRef(w)},se.useState=function(w){return B.H.useState(w)},se.useSyncExternalStore=function(w,z,X){return B.H.useSyncExternalStore(w,z,X)},se.useTransition=function(){return B.H.useTransition()},se.version="19.2.6",se}var ph;function lu(){return ph||(ph=1,Ns.exports=e0()),Ns.exports}var ue=lu(),Cs={exports:{}},Ol={},As={exports:{}},_s={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yh;function t0(){return yh||(yh=1,(function(s){function c(A,I){var ae=A.length;A.push(I);e:for(;0<ae;){var Te=ae-1>>>1,Se=A[Te];if(0<d(Se,I))A[Te]=I,A[ae]=Se,ae=Te;else break e}}function f(A){return A.length===0?null:A[0]}function r(A){if(A.length===0)return null;var I=A[0],ae=A.pop();if(ae!==I){A[0]=ae;e:for(var Te=0,Se=A.length,w=Se>>>1;Te<w;){var z=2*(Te+1)-1,X=A[z],W=z+1,re=A[W];if(0>d(X,ae))W<Se&&0>d(re,X)?(A[Te]=re,A[W]=ae,Te=W):(A[Te]=X,A[z]=ae,Te=z);else if(W<Se&&0>d(re,ae))A[Te]=re,A[W]=ae,Te=W;else break e}}return I}function d(A,I){var ae=A.sortIndex-I.sortIndex;return ae!==0?ae:A.id-I.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;s.unstable_now=function(){return h.now()}}else{var v=Date,S=v.now();s.unstable_now=function(){return v.now()-S}}var m=[],y=[],k=1,R=null,H=3,L=!1,q=!1,K=!1,ie=!1,U=typeof setTimeout=="function"?setTimeout:null,j=typeof clearTimeout=="function"?clearTimeout:null,M=typeof setImmediate<"u"?setImmediate:null;function Y(A){for(var I=f(y);I!==null;){if(I.callback===null)r(y);else if(I.startTime<=A)r(y),I.sortIndex=I.expirationTime,c(m,I);else break;I=f(y)}}function oe(A){if(K=!1,Y(A),!q)if(f(m)!==null)q=!0,V||(V=!0,G());else{var I=f(y);I!==null&&Be(oe,I.startTime-A)}}var V=!1,B=-1,J=5,Q=-1;function ee(){return ie?!0:!(s.unstable_now()-Q<J)}function $(){if(ie=!1,V){var A=s.unstable_now();Q=A;var I=!0;try{e:{q=!1,K&&(K=!1,j(B),B=-1),L=!0;var ae=H;try{t:{for(Y(A),R=f(m);R!==null&&!(R.expirationTime>A&&ee());){var Te=R.callback;if(typeof Te=="function"){R.callback=null,H=R.priorityLevel;var Se=Te(R.expirationTime<=A);if(A=s.unstable_now(),typeof Se=="function"){R.callback=Se,Y(A),I=!0;break t}R===f(m)&&r(m),Y(A)}else r(m);R=f(m)}if(R!==null)I=!0;else{var w=f(y);w!==null&&Be(oe,w.startTime-A),I=!1}}break e}finally{R=null,H=ae,L=!1}I=void 0}}finally{I?G():V=!1}}}var G;if(typeof M=="function")G=function(){M($)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,ne=Z.port2;Z.port1.onmessage=$,G=function(){ne.postMessage(null)}}else G=function(){U($,0)};function Be(A,I){B=U(function(){A(s.unstable_now())},I)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(A){A.callback=null},s.unstable_forceFrameRate=function(A){0>A||125<A?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):J=0<A?Math.floor(1e3/A):5},s.unstable_getCurrentPriorityLevel=function(){return H},s.unstable_next=function(A){switch(H){case 1:case 2:case 3:var I=3;break;default:I=H}var ae=H;H=I;try{return A()}finally{H=ae}},s.unstable_requestPaint=function(){ie=!0},s.unstable_runWithPriority=function(A,I){switch(A){case 1:case 2:case 3:case 4:case 5:break;default:A=3}var ae=H;H=A;try{return I()}finally{H=ae}},s.unstable_scheduleCallback=function(A,I,ae){var Te=s.unstable_now();switch(typeof ae=="object"&&ae!==null?(ae=ae.delay,ae=typeof ae=="number"&&0<ae?Te+ae:Te):ae=Te,A){case 1:var Se=-1;break;case 2:Se=250;break;case 5:Se=1073741823;break;case 4:Se=1e4;break;default:Se=5e3}return Se=ae+Se,A={id:k++,callback:I,priorityLevel:A,startTime:ae,expirationTime:Se,sortIndex:-1},ae>Te?(A.sortIndex=ae,c(y,A),f(m)===null&&A===f(y)&&(K?(j(B),B=-1):K=!0,Be(oe,ae-Te))):(A.sortIndex=Se,c(m,A),q||L||(q=!0,V||(V=!0,G()))),A},s.unstable_shouldYield=ee,s.unstable_wrapCallback=function(A){var I=H;return function(){var ae=H;H=I;try{return A.apply(this,arguments)}finally{H=ae}}}})(_s)),_s}var vh;function n0(){return vh||(vh=1,As.exports=t0()),As.exports}var Ms={exports:{}},Pe={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bh;function a0(){if(bh)return Pe;bh=1;var s=lu();function c(m){var y="https://react.dev/errors/"+m;if(1<arguments.length){y+="?args[]="+encodeURIComponent(arguments[1]);for(var k=2;k<arguments.length;k++)y+="&args[]="+encodeURIComponent(arguments[k])}return"Minified React error #"+m+"; visit "+y+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(){}var r={d:{f,r:function(){throw Error(c(522))},D:f,C:f,L:f,m:f,X:f,S:f,M:f},p:0,findDOMNode:null},d=Symbol.for("react.portal");function h(m,y,k){var R=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:d,key:R==null?null:""+R,children:m,containerInfo:y,implementation:k}}var v=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function S(m,y){if(m==="font")return"";if(typeof y=="string")return y==="use-credentials"?y:""}return Pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Pe.createPortal=function(m,y){var k=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!y||y.nodeType!==1&&y.nodeType!==9&&y.nodeType!==11)throw Error(c(299));return h(m,y,null,k)},Pe.flushSync=function(m){var y=v.T,k=r.p;try{if(v.T=null,r.p=2,m)return m()}finally{v.T=y,r.p=k,r.d.f()}},Pe.preconnect=function(m,y){typeof m=="string"&&(y?(y=y.crossOrigin,y=typeof y=="string"?y==="use-credentials"?y:"":void 0):y=null,r.d.C(m,y))},Pe.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},Pe.preinit=function(m,y){if(typeof m=="string"&&y&&typeof y.as=="string"){var k=y.as,R=S(k,y.crossOrigin),H=typeof y.integrity=="string"?y.integrity:void 0,L=typeof y.fetchPriority=="string"?y.fetchPriority:void 0;k==="style"?r.d.S(m,typeof y.precedence=="string"?y.precedence:void 0,{crossOrigin:R,integrity:H,fetchPriority:L}):k==="script"&&r.d.X(m,{crossOrigin:R,integrity:H,fetchPriority:L,nonce:typeof y.nonce=="string"?y.nonce:void 0})}},Pe.preinitModule=function(m,y){if(typeof m=="string")if(typeof y=="object"&&y!==null){if(y.as==null||y.as==="script"){var k=S(y.as,y.crossOrigin);r.d.M(m,{crossOrigin:k,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0})}}else y==null&&r.d.M(m)},Pe.preload=function(m,y){if(typeof m=="string"&&typeof y=="object"&&y!==null&&typeof y.as=="string"){var k=y.as,R=S(k,y.crossOrigin);r.d.L(m,k,{crossOrigin:R,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0,type:typeof y.type=="string"?y.type:void 0,fetchPriority:typeof y.fetchPriority=="string"?y.fetchPriority:void 0,referrerPolicy:typeof y.referrerPolicy=="string"?y.referrerPolicy:void 0,imageSrcSet:typeof y.imageSrcSet=="string"?y.imageSrcSet:void 0,imageSizes:typeof y.imageSizes=="string"?y.imageSizes:void 0,media:typeof y.media=="string"?y.media:void 0})}},Pe.preloadModule=function(m,y){if(typeof m=="string")if(y){var k=S(y.as,y.crossOrigin);r.d.m(m,{as:typeof y.as=="string"&&y.as!=="script"?y.as:void 0,crossOrigin:k,integrity:typeof y.integrity=="string"?y.integrity:void 0})}else r.d.m(m)},Pe.requestFormReset=function(m){r.d.r(m)},Pe.unstable_batchedUpdates=function(m,y){return m(y)},Pe.useFormState=function(m,y,k){return v.H.useFormState(m,y,k)},Pe.useFormStatus=function(){return v.H.useHostTransitionStatus()},Pe.version="19.2.6",Pe}var wh;function l0(){if(wh)return Ms.exports;wh=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(c){console.error(c)}}return s(),Ms.exports=a0(),Ms.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sh;function i0(){if(Sh)return Ol;Sh=1;var s=n0(),c=lu(),f=l0();function r(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function v(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function S(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(h(e)!==e)throw Error(r(188))}function y(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(r(188));return t!==e?null:e}for(var n=e,a=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return m(l),e;if(i===a)return m(l),t;i=i.sibling}throw Error(r(188))}if(n.return!==a.return)n=l,a=i;else{for(var o=!1,u=l.child;u;){if(u===n){o=!0,n=l,a=i;break}if(u===a){o=!0,a=l,n=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===n){o=!0,n=i,a=l;break}if(u===a){o=!0,a=i,n=l;break}u=u.sibling}if(!o)throw Error(r(189))}}if(n.alternate!==a)throw Error(r(190))}if(n.tag!==3)throw Error(r(188));return n.stateNode.current===n?e:t}function k(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=k(e),t!==null)return t;e=e.sibling}return null}var R=Object.assign,H=Symbol.for("react.element"),L=Symbol.for("react.transitional.element"),q=Symbol.for("react.portal"),K=Symbol.for("react.fragment"),ie=Symbol.for("react.strict_mode"),U=Symbol.for("react.profiler"),j=Symbol.for("react.consumer"),M=Symbol.for("react.context"),Y=Symbol.for("react.forward_ref"),oe=Symbol.for("react.suspense"),V=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),J=Symbol.for("react.lazy"),Q=Symbol.for("react.activity"),ee=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function G(e){return e===null||typeof e!="object"?null:(e=$&&e[$]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Symbol.for("react.client.reference");function ne(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Z?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case K:return"Fragment";case U:return"Profiler";case ie:return"StrictMode";case oe:return"Suspense";case V:return"SuspenseList";case Q:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case q:return"Portal";case M:return e.displayName||"Context";case j:return(e._context.displayName||"Context")+".Consumer";case Y:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case B:return t=e.displayName||null,t!==null?t:ne(e.type)||"Memo";case J:t=e._payload,e=e._init;try{return ne(e(t))}catch{}}return null}var Be=Array.isArray,A=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I=f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ae={pending:!1,data:null,method:null,action:null},Te=[],Se=-1;function w(e){return{current:e}}function z(e){0>Se||(e.current=Te[Se],Te[Se]=null,Se--)}function X(e,t){Se++,Te[Se]=e.current,e.current=t}var W=w(null),re=w(null),fe=w(null),he=w(null);function ke(e,t){switch(X(fe,t),X(re,e),X(W,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?jf(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=jf(t),e=Hf(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}z(W),X(W,e)}function Ce(){z(W),z(re),z(fe)}function jt(e){e.memoizedState!==null&&X(he,e);var t=W.current,n=Hf(t,e.type);t!==n&&(X(re,e),X(W,n))}function jl(e){re.current===e&&(z(W),z(re)),he.current===e&&(z(he),_l._currentValue=ae)}var io,du;function Mn(e){if(io===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);io=t&&t[1]||"",du=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+io+e+du}var oo=!1;function ro(e,t){if(!e||oo)return"";oo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var O=function(){throw Error()};if(Object.defineProperty(O.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(O,[])}catch(C){var N=C}Reflect.construct(e,[],O)}else{try{O.call()}catch(C){N=C}e.call(O.prototype)}}else{try{throw Error()}catch(C){N=C}(O=e())&&typeof O.catch=="function"&&O.catch(function(){})}}catch(C){if(C&&N&&typeof C.stack=="string")return[C.stack,N.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),o=i[0],u=i[1];if(o&&u){var p=o.split(`
`),E=u.split(`
`);for(l=a=0;a<p.length&&!p[a].includes("DetermineComponentFrameRoot");)a++;for(;l<E.length&&!E[l].includes("DetermineComponentFrameRoot");)l++;if(a===p.length||l===E.length)for(a=p.length-1,l=E.length-1;1<=a&&0<=l&&p[a]!==E[l];)l--;for(;1<=a&&0<=l;a--,l--)if(p[a]!==E[l]){if(a!==1||l!==1)do if(a--,l--,0>l||p[a]!==E[l]){var _=`
`+p[a].replace(" at new "," at ");return e.displayName&&_.includes("<anonymous>")&&(_=_.replace("<anonymous>",e.displayName)),_}while(1<=a&&0<=l);break}}}finally{oo=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Mn(n):""}function _g(e,t){switch(e.tag){case 26:case 27:case 5:return Mn(e.type);case 16:return Mn("Lazy");case 13:return e.child!==t&&t!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return ro(e.type,!1);case 11:return ro(e.type.render,!1);case 1:return ro(e.type,!0);case 31:return Mn("Activity");default:return""}}function fu(e){try{var t="",n=null;do t+=_g(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var so=Object.prototype.hasOwnProperty,uo=s.unstable_scheduleCallback,co=s.unstable_cancelCallback,Mg=s.unstable_shouldYield,Dg=s.unstable_requestPaint,st=s.unstable_now,kg=s.unstable_getCurrentPriorityLevel,hu=s.unstable_ImmediatePriority,gu=s.unstable_UserBlockingPriority,Hl=s.unstable_NormalPriority,Rg=s.unstable_LowPriority,mu=s.unstable_IdlePriority,Og=s.log,zg=s.unstable_setDisableYieldValue,Ga=null,ut=null;function nn(e){if(typeof Og=="function"&&zg(e),ut&&typeof ut.setStrictMode=="function")try{ut.setStrictMode(Ga,e)}catch{}}var ct=Math.clz32?Math.clz32:Hg,Ug=Math.log,jg=Math.LN2;function Hg(e){return e>>>=0,e===0?32:31-(Ug(e)/jg|0)|0}var Ll=256,Bl=262144,Gl=4194304;function Dn(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Yl(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var l=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var u=a&134217727;return u!==0?(a=u&~i,a!==0?l=Dn(a):(o&=u,o!==0?l=Dn(o):n||(n=u&~e,n!==0&&(l=Dn(n))))):(u=a&~i,u!==0?l=Dn(u):o!==0?l=Dn(o):n||(n=a&~e,n!==0&&(l=Dn(n)))),l===0?0:t!==0&&t!==l&&(t&i)===0&&(i=l&-l,n=t&-t,i>=n||i===32&&(n&4194048)!==0)?t:l}function Ya(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Lg(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pu(){var e=Gl;return Gl<<=1,(Gl&62914560)===0&&(Gl=4194304),e}function fo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function qa(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Bg(e,t,n,a,l,i){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var u=e.entanglements,p=e.expirationTimes,E=e.hiddenUpdates;for(n=o&~n;0<n;){var _=31-ct(n),O=1<<_;u[_]=0,p[_]=-1;var N=E[_];if(N!==null)for(E[_]=null,_=0;_<N.length;_++){var C=N[_];C!==null&&(C.lane&=-536870913)}n&=~O}a!==0&&yu(e,a,0),i!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=i&~(o&~t))}function yu(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-ct(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function vu(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-ct(n),l=1<<a;l&t|e[a]&t&&(e[a]|=t),n&=~l}}function bu(e,t){var n=t&-t;return n=(n&42)!==0?1:ho(n),(n&(e.suspendedLanes|t))!==0?0:n}function ho(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function go(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function wu(){var e=I.p;return e!==0?e:(e=window.event,e===void 0?32:oh(e.type))}function Su(e,t){var n=I.p;try{return I.p=e,t()}finally{I.p=n}}var an=Math.random().toString(36).slice(2),Ze="__reactFiber$"+an,tt="__reactProps$"+an,Pn="__reactContainer$"+an,mo="__reactEvents$"+an,Gg="__reactListeners$"+an,Yg="__reactHandles$"+an,xu="__reactResources$"+an,Va="__reactMarker$"+an;function po(e){delete e[Ze],delete e[tt],delete e[mo],delete e[Gg],delete e[Yg]}function ea(e){var t=e[Ze];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Pn]||n[Ze]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Xf(e);e!==null;){if(n=e[Ze])return n;e=Xf(e)}return t}e=n,n=e.parentNode}return null}function ta(e){if(e=e[Ze]||e[Pn]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Xa(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(r(33))}function na(e){var t=e[xu];return t||(t=e[xu]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Qe(e){e[Va]=!0}var Tu=new Set,Eu={};function kn(e,t){aa(e,t),aa(e+"Capture",t)}function aa(e,t){for(Eu[e]=t,e=0;e<t.length;e++)Tu.add(t[e])}var qg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Nu={},Cu={};function Vg(e){return so.call(Cu,e)?!0:so.call(Nu,e)?!1:qg.test(e)?Cu[e]=!0:(Nu[e]=!0,!1)}function ql(e,t,n){if(Vg(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Vl(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Ht(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Au(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Xg(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function yo(e){if(!e._valueTracker){var t=Au(e)?"checked":"value";e._valueTracker=Xg(e,t,""+e[t])}}function _u(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Au(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function Xl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ig=/[\n"\\]/g;function bt(e){return e.replace(Ig,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function vo(e,t,n,a,l,i,o,u){e.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.type=o:e.removeAttribute("type"),t!=null?o==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+vt(t)):e.value!==""+vt(t)&&(e.value=""+vt(t)):o!=="submit"&&o!=="reset"||e.removeAttribute("value"),t!=null?bo(e,o,vt(t)):n!=null?bo(e,o,vt(n)):a!=null&&e.removeAttribute("value"),l==null&&i!=null&&(e.defaultChecked=!!i),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.name=""+vt(u):e.removeAttribute("name")}function Mu(e,t,n,a,l,i,o,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){yo(e);return}n=n!=null?""+vt(n):"",t=t!=null?""+vt(t):n,u||t===e.value||(e.value=t),e.defaultValue=t}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=u?e.checked:!!a,e.defaultChecked=!!a,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.name=o),yo(e)}function bo(e,t,n){t==="number"&&Xl(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function la(e,t,n,a){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&a&&(e[n].defaultSelected=!0)}else{for(n=""+vt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,a&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Du(e,t,n){if(t!=null&&(t=""+vt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+vt(n):""}function ku(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(r(92));if(Be(a)){if(1<a.length)throw Error(r(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=vt(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),yo(e)}function ia(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Qg=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ru(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||Qg.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Ou(e,t,n){if(t!=null&&typeof t!="object")throw Error(r(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var l in t)a=t[l],t.hasOwnProperty(l)&&n[l]!==a&&Ru(e,l,a)}else for(var i in t)t.hasOwnProperty(i)&&Ru(e,i,t[i])}function wo(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Kg=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Zg=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Il(e){return Zg.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Lt(){}var So=null;function xo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var oa=null,ra=null;function zu(e){var t=ta(e);if(t&&(e=t.stateNode)){var n=e[tt]||null;e:switch(e=t.stateNode,t.type){case"input":if(vo(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+bt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var l=a[tt]||null;if(!l)throw Error(r(90));vo(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&_u(a)}break e;case"textarea":Du(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&la(e,!!n.multiple,t,!1)}}}var To=!1;function Uu(e,t,n){if(To)return e(t,n);To=!0;try{var a=e(t);return a}finally{if(To=!1,(oa!==null||ra!==null)&&(Ri(),oa&&(t=oa,e=ra,ra=oa=null,zu(t),e)))for(t=0;t<e.length;t++)zu(e[t])}}function Ia(e,t){var n=e.stateNode;if(n===null)return null;var a=n[tt]||null;if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(r(231,t,typeof n));return n}var Bt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Eo=!1;if(Bt)try{var Qa={};Object.defineProperty(Qa,"passive",{get:function(){Eo=!0}}),window.addEventListener("test",Qa,Qa),window.removeEventListener("test",Qa,Qa)}catch{Eo=!1}var ln=null,No=null,Ql=null;function ju(){if(Ql)return Ql;var e,t=No,n=t.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(a=1;a<=o&&t[n-a]===l[i-a];a++);return Ql=l.slice(e,1<a?1-a:void 0)}function Kl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Zl(){return!0}function Hu(){return!1}function nt(e){function t(n,a,l,i,o){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Zl:Hu,this.isPropagationStopped=Hu,this}return R(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Zl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Zl)},persist:function(){},isPersistent:Zl}),t}var Rn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=nt(Rn),Ka=R({},Rn,{view:0,detail:0}),Jg=nt(Ka),Co,Ao,Za,Fl=R({},Ka,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Mo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Za&&(Za&&e.type==="mousemove"?(Co=e.screenX-Za.screenX,Ao=e.screenY-Za.screenY):Ao=Co=0,Za=e),Co)},movementY:function(e){return"movementY"in e?e.movementY:Ao}}),Lu=nt(Fl),Fg=R({},Fl,{dataTransfer:0}),Wg=nt(Fg),$g=R({},Ka,{relatedTarget:0}),_o=nt($g),Pg=R({},Rn,{animationName:0,elapsedTime:0,pseudoElement:0}),em=nt(Pg),tm=R({},Rn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),nm=nt(tm),am=R({},Rn,{data:0}),Bu=nt(am),lm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},im={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},om={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function rm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=om[e])?!!t[e]:!1}function Mo(){return rm}var sm=R({},Ka,{key:function(e){if(e.key){var t=lm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Kl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?im[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Mo,charCode:function(e){return e.type==="keypress"?Kl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Kl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),um=nt(sm),cm=R({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Gu=nt(cm),dm=R({},Ka,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Mo}),fm=nt(dm),hm=R({},Rn,{propertyName:0,elapsedTime:0,pseudoElement:0}),gm=nt(hm),mm=R({},Fl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),pm=nt(mm),ym=R({},Rn,{newState:0,oldState:0}),vm=nt(ym),bm=[9,13,27,32],Do=Bt&&"CompositionEvent"in window,Ja=null;Bt&&"documentMode"in document&&(Ja=document.documentMode);var wm=Bt&&"TextEvent"in window&&!Ja,Yu=Bt&&(!Do||Ja&&8<Ja&&11>=Ja),qu=" ",Vu=!1;function Xu(e,t){switch(e){case"keyup":return bm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Iu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var sa=!1;function Sm(e,t){switch(e){case"compositionend":return Iu(t);case"keypress":return t.which!==32?null:(Vu=!0,qu);case"textInput":return e=t.data,e===qu&&Vu?null:e;default:return null}}function xm(e,t){if(sa)return e==="compositionend"||!Do&&Xu(e,t)?(e=ju(),Ql=No=ln=null,sa=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Yu&&t.locale!=="ko"?null:t.data;default:return null}}var Tm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Qu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Tm[e.type]:t==="textarea"}function Ku(e,t,n,a){oa?ra?ra.push(a):ra=[a]:oa=a,t=Bi(t,"onChange"),0<t.length&&(n=new Jl("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Fa=null,Wa=null;function Em(e){Df(e,0)}function Wl(e){var t=Xa(e);if(_u(t))return e}function Zu(e,t){if(e==="change")return t}var Ju=!1;if(Bt){var ko;if(Bt){var Ro="oninput"in document;if(!Ro){var Fu=document.createElement("div");Fu.setAttribute("oninput","return;"),Ro=typeof Fu.oninput=="function"}ko=Ro}else ko=!1;Ju=ko&&(!document.documentMode||9<document.documentMode)}function Wu(){Fa&&(Fa.detachEvent("onpropertychange",$u),Wa=Fa=null)}function $u(e){if(e.propertyName==="value"&&Wl(Wa)){var t=[];Ku(t,Wa,e,xo(e)),Uu(Em,t)}}function Nm(e,t,n){e==="focusin"?(Wu(),Fa=t,Wa=n,Fa.attachEvent("onpropertychange",$u)):e==="focusout"&&Wu()}function Cm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Wl(Wa)}function Am(e,t){if(e==="click")return Wl(t)}function _m(e,t){if(e==="input"||e==="change")return Wl(t)}function Mm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var dt=typeof Object.is=="function"?Object.is:Mm;function $a(e,t){if(dt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!so.call(t,l)||!dt(e[l],t[l]))return!1}return!0}function Pu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ec(e,t){var n=Pu(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Pu(n)}}function tc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?tc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function nc(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Xl(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Xl(e.document)}return t}function Oo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Dm=Bt&&"documentMode"in document&&11>=document.documentMode,ua=null,zo=null,Pa=null,Uo=!1;function ac(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Uo||ua==null||ua!==Xl(a)||(a=ua,"selectionStart"in a&&Oo(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Pa&&$a(Pa,a)||(Pa=a,a=Bi(zo,"onSelect"),0<a.length&&(t=new Jl("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=ua)))}function On(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ca={animationend:On("Animation","AnimationEnd"),animationiteration:On("Animation","AnimationIteration"),animationstart:On("Animation","AnimationStart"),transitionrun:On("Transition","TransitionRun"),transitionstart:On("Transition","TransitionStart"),transitioncancel:On("Transition","TransitionCancel"),transitionend:On("Transition","TransitionEnd")},jo={},lc={};Bt&&(lc=document.createElement("div").style,"AnimationEvent"in window||(delete ca.animationend.animation,delete ca.animationiteration.animation,delete ca.animationstart.animation),"TransitionEvent"in window||delete ca.transitionend.transition);function zn(e){if(jo[e])return jo[e];if(!ca[e])return e;var t=ca[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in lc)return jo[e]=t[n];return e}var ic=zn("animationend"),oc=zn("animationiteration"),rc=zn("animationstart"),km=zn("transitionrun"),Rm=zn("transitionstart"),Om=zn("transitioncancel"),sc=zn("transitionend"),uc=new Map,Ho="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ho.push("scrollEnd");function _t(e,t){uc.set(e,t),kn(t,[e])}var $l=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},wt=[],da=0,Lo=0;function Pl(){for(var e=da,t=Lo=da=0;t<e;){var n=wt[t];wt[t++]=null;var a=wt[t];wt[t++]=null;var l=wt[t];wt[t++]=null;var i=wt[t];if(wt[t++]=null,a!==null&&l!==null){var o=a.pending;o===null?l.next=l:(l.next=o.next,o.next=l),a.pending=l}i!==0&&cc(n,l,i)}}function ei(e,t,n,a){wt[da++]=e,wt[da++]=t,wt[da++]=n,wt[da++]=a,Lo|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function Bo(e,t,n,a){return ei(e,t,n,a),ti(e)}function Un(e,t){return ei(e,null,null,t),ti(e)}function cc(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=e.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(l=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,l&&t!==null&&(l=31-ct(n),e=i.hiddenUpdates,a=e[l],a===null?e[l]=[t]:a.push(t),t.lane=n|536870912),i):null}function ti(e){if(50<Sl)throw Sl=0,Zr=null,Error(r(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var fa={};function zm(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ft(e,t,n,a){return new zm(e,t,n,a)}function Go(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Gt(e,t){var n=e.alternate;return n===null?(n=ft(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function dc(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ni(e,t,n,a,l,i){var o=0;if(a=e,typeof e=="function")Go(e)&&(o=1);else if(typeof e=="string")o=Bp(e,n,W.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Q:return e=ft(31,n,t,l),e.elementType=Q,e.lanes=i,e;case K:return jn(n.children,l,i,t);case ie:o=8,l|=24;break;case U:return e=ft(12,n,t,l|2),e.elementType=U,e.lanes=i,e;case oe:return e=ft(13,n,t,l),e.elementType=oe,e.lanes=i,e;case V:return e=ft(19,n,t,l),e.elementType=V,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case M:o=10;break e;case j:o=9;break e;case Y:o=11;break e;case B:o=14;break e;case J:o=16,a=null;break e}o=29,n=Error(r(130,e===null?"null":typeof e,"")),a=null}return t=ft(o,n,t,l),t.elementType=e,t.type=a,t.lanes=i,t}function jn(e,t,n,a){return e=ft(7,e,a,t),e.lanes=n,e}function Yo(e,t,n){return e=ft(6,e,null,t),e.lanes=n,e}function fc(e){var t=ft(18,null,null,0);return t.stateNode=e,t}function qo(e,t,n){return t=ft(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var hc=new WeakMap;function St(e,t){if(typeof e=="object"&&e!==null){var n=hc.get(e);return n!==void 0?n:(t={value:e,source:t,stack:fu(t)},hc.set(e,t),t)}return{value:e,source:t,stack:fu(t)}}var ha=[],ga=0,ai=null,el=0,xt=[],Tt=0,on=null,kt=1,Rt="";function Yt(e,t){ha[ga++]=el,ha[ga++]=ai,ai=e,el=t}function gc(e,t,n){xt[Tt++]=kt,xt[Tt++]=Rt,xt[Tt++]=on,on=e;var a=kt;e=Rt;var l=32-ct(a)-1;a&=~(1<<l),n+=1;var i=32-ct(t)+l;if(30<i){var o=l-l%5;i=(a&(1<<o)-1).toString(32),a>>=o,l-=o,kt=1<<32-ct(t)+l|n<<l|a,Rt=i+e}else kt=1<<i|n<<l|a,Rt=e}function Vo(e){e.return!==null&&(Yt(e,1),gc(e,1,0))}function Xo(e){for(;e===ai;)ai=ha[--ga],ha[ga]=null,el=ha[--ga],ha[ga]=null;for(;e===on;)on=xt[--Tt],xt[Tt]=null,Rt=xt[--Tt],xt[Tt]=null,kt=xt[--Tt],xt[Tt]=null}function mc(e,t){xt[Tt++]=kt,xt[Tt++]=Rt,xt[Tt++]=on,kt=t.id,Rt=t.overflow,on=e}var Je=null,Re=null,ve=!1,rn=null,Et=!1,Io=Error(r(519));function sn(e){var t=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw tl(St(t,e)),Io}function pc(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[Ze]=e,t[tt]=a,n){case"dialog":me("cancel",t),me("close",t);break;case"iframe":case"object":case"embed":me("load",t);break;case"video":case"audio":for(n=0;n<Tl.length;n++)me(Tl[n],t);break;case"source":me("error",t);break;case"img":case"image":case"link":me("error",t),me("load",t);break;case"details":me("toggle",t);break;case"input":me("invalid",t),Mu(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":me("invalid",t);break;case"textarea":me("invalid",t),ku(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||zf(t.textContent,n)?(a.popover!=null&&(me("beforetoggle",t),me("toggle",t)),a.onScroll!=null&&me("scroll",t),a.onScrollEnd!=null&&me("scrollend",t),a.onClick!=null&&(t.onclick=Lt),t=!0):t=!1,t||sn(e,!0)}function yc(e){for(Je=e.return;Je;)switch(Je.tag){case 5:case 31:case 13:Et=!1;return;case 27:case 3:Et=!0;return;default:Je=Je.return}}function ma(e){if(e!==Je)return!1;if(!ve)return yc(e),ve=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||us(e.type,e.memoizedProps)),n=!n),n&&Re&&sn(e),yc(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Re=Vf(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Re=Vf(e)}else t===27?(t=Re,xn(e.type)?(e=gs,gs=null,Re=e):Re=t):Re=Je?Ct(e.stateNode.nextSibling):null;return!0}function Hn(){Re=Je=null,ve=!1}function Qo(){var e=rn;return e!==null&&(ot===null?ot=e:ot.push.apply(ot,e),rn=null),e}function tl(e){rn===null?rn=[e]:rn.push(e)}var Ko=w(null),Ln=null,qt=null;function un(e,t,n){X(Ko,t._currentValue),t._currentValue=n}function Vt(e){e._currentValue=Ko.current,z(Ko)}function Zo(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Jo(e,t,n,a){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var i=l.dependencies;if(i!==null){var o=l.child;i=i.firstContext;e:for(;i!==null;){var u=i;i=l;for(var p=0;p<t.length;p++)if(u.context===t[p]){i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Zo(i.return,n,e),a||(o=null);break e}i=u.next}}else if(l.tag===18){if(o=l.return,o===null)throw Error(r(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),Zo(o,n,e),o=null}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===e){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}}function pa(e,t,n,a){e=null;for(var l=t,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var o=l.alternate;if(o===null)throw Error(r(387));if(o=o.memoizedProps,o!==null){var u=l.type;dt(l.pendingProps.value,o.value)||(e!==null?e.push(u):e=[u])}}else if(l===he.current){if(o=l.alternate,o===null)throw Error(r(387));o.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(_l):e=[_l])}l=l.return}e!==null&&Jo(t,e,n,a),t.flags|=262144}function li(e){for(e=e.firstContext;e!==null;){if(!dt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Bn(e){Ln=e,qt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Fe(e){return vc(Ln,e)}function ii(e,t){return Ln===null&&Bn(e),vc(e,t)}function vc(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},qt===null){if(e===null)throw Error(r(308));qt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else qt=qt.next=t;return n}var Um=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},jm=s.unstable_scheduleCallback,Hm=s.unstable_NormalPriority,Ge={$$typeof:M,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Fo(){return{controller:new Um,data:new Map,refCount:0}}function nl(e){e.refCount--,e.refCount===0&&jm(Hm,function(){e.controller.abort()})}var al=null,Wo=0,ya=0,va=null;function Lm(e,t){if(al===null){var n=al=[];Wo=0,ya=es(),va={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Wo++,t.then(bc,bc),t}function bc(){if(--Wo===0&&al!==null){va!==null&&(va.status="fulfilled");var e=al;al=null,ya=0,va=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Bm(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var l=0;l<n.length;l++)(0,n[l])(t)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var wc=A.S;A.S=function(e,t){af=st(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Lm(e,t),wc!==null&&wc(e,t)};var Gn=w(null);function $o(){var e=Gn.current;return e!==null?e:De.pooledCache}function oi(e,t){t===null?X(Gn,Gn.current):X(Gn,t.pool)}function Sc(){var e=$o();return e===null?null:{parent:Ge._currentValue,pool:e}}var ba=Error(r(460)),Po=Error(r(474)),ri=Error(r(542)),si={then:function(){}};function xc(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Tc(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Lt,Lt),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Nc(e),e;default:if(typeof t.status=="string")t.then(Lt,Lt);else{if(e=De,e!==null&&100<e.shellSuspendCounter)throw Error(r(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=a}},function(a){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Nc(e),e}throw qn=t,ba}}function Yn(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(qn=n,ba):n}}var qn=null;function Ec(){if(qn===null)throw Error(r(459));var e=qn;return qn=null,e}function Nc(e){if(e===ba||e===ri)throw Error(r(483))}var wa=null,ll=0;function ui(e){var t=ll;return ll+=1,wa===null&&(wa=[]),Tc(wa,e,t)}function il(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ci(e,t){throw t.$$typeof===H?Error(r(525)):(e=Object.prototype.toString.call(t),Error(r(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Cc(e){function t(x,b){if(e){var T=x.deletions;T===null?(x.deletions=[b],x.flags|=16):T.push(b)}}function n(x,b){if(!e)return null;for(;b!==null;)t(x,b),b=b.sibling;return null}function a(x){for(var b=new Map;x!==null;)x.key!==null?b.set(x.key,x):b.set(x.index,x),x=x.sibling;return b}function l(x,b){return x=Gt(x,b),x.index=0,x.sibling=null,x}function i(x,b,T){return x.index=T,e?(T=x.alternate,T!==null?(T=T.index,T<b?(x.flags|=67108866,b):T):(x.flags|=67108866,b)):(x.flags|=1048576,b)}function o(x){return e&&x.alternate===null&&(x.flags|=67108866),x}function u(x,b,T,D){return b===null||b.tag!==6?(b=Yo(T,x.mode,D),b.return=x,b):(b=l(b,T),b.return=x,b)}function p(x,b,T,D){var te=T.type;return te===K?_(x,b,T.props.children,D,T.key):b!==null&&(b.elementType===te||typeof te=="object"&&te!==null&&te.$$typeof===J&&Yn(te)===b.type)?(b=l(b,T.props),il(b,T),b.return=x,b):(b=ni(T.type,T.key,T.props,null,x.mode,D),il(b,T),b.return=x,b)}function E(x,b,T,D){return b===null||b.tag!==4||b.stateNode.containerInfo!==T.containerInfo||b.stateNode.implementation!==T.implementation?(b=qo(T,x.mode,D),b.return=x,b):(b=l(b,T.children||[]),b.return=x,b)}function _(x,b,T,D,te){return b===null||b.tag!==7?(b=jn(T,x.mode,D,te),b.return=x,b):(b=l(b,T),b.return=x,b)}function O(x,b,T){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return b=Yo(""+b,x.mode,T),b.return=x,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case L:return T=ni(b.type,b.key,b.props,null,x.mode,T),il(T,b),T.return=x,T;case q:return b=qo(b,x.mode,T),b.return=x,b;case J:return b=Yn(b),O(x,b,T)}if(Be(b)||G(b))return b=jn(b,x.mode,T,null),b.return=x,b;if(typeof b.then=="function")return O(x,ui(b),T);if(b.$$typeof===M)return O(x,ii(x,b),T);ci(x,b)}return null}function N(x,b,T,D){var te=b!==null?b.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return te!==null?null:u(x,b,""+T,D);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case L:return T.key===te?p(x,b,T,D):null;case q:return T.key===te?E(x,b,T,D):null;case J:return T=Yn(T),N(x,b,T,D)}if(Be(T)||G(T))return te!==null?null:_(x,b,T,D,null);if(typeof T.then=="function")return N(x,b,ui(T),D);if(T.$$typeof===M)return N(x,b,ii(x,T),D);ci(x,T)}return null}function C(x,b,T,D,te){if(typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint")return x=x.get(T)||null,u(b,x,""+D,te);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case L:return x=x.get(D.key===null?T:D.key)||null,p(b,x,D,te);case q:return x=x.get(D.key===null?T:D.key)||null,E(b,x,D,te);case J:return D=Yn(D),C(x,b,T,D,te)}if(Be(D)||G(D))return x=x.get(T)||null,_(b,x,D,te,null);if(typeof D.then=="function")return C(x,b,T,ui(D),te);if(D.$$typeof===M)return C(x,b,T,ii(b,D),te);ci(b,D)}return null}function F(x,b,T,D){for(var te=null,be=null,P=b,de=b=0,ye=null;P!==null&&de<T.length;de++){P.index>de?(ye=P,P=null):ye=P.sibling;var we=N(x,P,T[de],D);if(we===null){P===null&&(P=ye);break}e&&P&&we.alternate===null&&t(x,P),b=i(we,b,de),be===null?te=we:be.sibling=we,be=we,P=ye}if(de===T.length)return n(x,P),ve&&Yt(x,de),te;if(P===null){for(;de<T.length;de++)P=O(x,T[de],D),P!==null&&(b=i(P,b,de),be===null?te=P:be.sibling=P,be=P);return ve&&Yt(x,de),te}for(P=a(P);de<T.length;de++)ye=C(P,x,de,T[de],D),ye!==null&&(e&&ye.alternate!==null&&P.delete(ye.key===null?de:ye.key),b=i(ye,b,de),be===null?te=ye:be.sibling=ye,be=ye);return e&&P.forEach(function(An){return t(x,An)}),ve&&Yt(x,de),te}function le(x,b,T,D){if(T==null)throw Error(r(151));for(var te=null,be=null,P=b,de=b=0,ye=null,we=T.next();P!==null&&!we.done;de++,we=T.next()){P.index>de?(ye=P,P=null):ye=P.sibling;var An=N(x,P,we.value,D);if(An===null){P===null&&(P=ye);break}e&&P&&An.alternate===null&&t(x,P),b=i(An,b,de),be===null?te=An:be.sibling=An,be=An,P=ye}if(we.done)return n(x,P),ve&&Yt(x,de),te;if(P===null){for(;!we.done;de++,we=T.next())we=O(x,we.value,D),we!==null&&(b=i(we,b,de),be===null?te=we:be.sibling=we,be=we);return ve&&Yt(x,de),te}for(P=a(P);!we.done;de++,we=T.next())we=C(P,x,de,we.value,D),we!==null&&(e&&we.alternate!==null&&P.delete(we.key===null?de:we.key),b=i(we,b,de),be===null?te=we:be.sibling=we,be=we);return e&&P.forEach(function(Fp){return t(x,Fp)}),ve&&Yt(x,de),te}function Me(x,b,T,D){if(typeof T=="object"&&T!==null&&T.type===K&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case L:e:{for(var te=T.key;b!==null;){if(b.key===te){if(te=T.type,te===K){if(b.tag===7){n(x,b.sibling),D=l(b,T.props.children),D.return=x,x=D;break e}}else if(b.elementType===te||typeof te=="object"&&te!==null&&te.$$typeof===J&&Yn(te)===b.type){n(x,b.sibling),D=l(b,T.props),il(D,T),D.return=x,x=D;break e}n(x,b);break}else t(x,b);b=b.sibling}T.type===K?(D=jn(T.props.children,x.mode,D,T.key),D.return=x,x=D):(D=ni(T.type,T.key,T.props,null,x.mode,D),il(D,T),D.return=x,x=D)}return o(x);case q:e:{for(te=T.key;b!==null;){if(b.key===te)if(b.tag===4&&b.stateNode.containerInfo===T.containerInfo&&b.stateNode.implementation===T.implementation){n(x,b.sibling),D=l(b,T.children||[]),D.return=x,x=D;break e}else{n(x,b);break}else t(x,b);b=b.sibling}D=qo(T,x.mode,D),D.return=x,x=D}return o(x);case J:return T=Yn(T),Me(x,b,T,D)}if(Be(T))return F(x,b,T,D);if(G(T)){if(te=G(T),typeof te!="function")throw Error(r(150));return T=te.call(T),le(x,b,T,D)}if(typeof T.then=="function")return Me(x,b,ui(T),D);if(T.$$typeof===M)return Me(x,b,ii(x,T),D);ci(x,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,b!==null&&b.tag===6?(n(x,b.sibling),D=l(b,T),D.return=x,x=D):(n(x,b),D=Yo(T,x.mode,D),D.return=x,x=D),o(x)):n(x,b)}return function(x,b,T,D){try{ll=0;var te=Me(x,b,T,D);return wa=null,te}catch(P){if(P===ba||P===ri)throw P;var be=ft(29,P,null,x.mode);return be.lanes=D,be.return=x,be}finally{}}}var Vn=Cc(!0),Ac=Cc(!1),cn=!1;function er(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function tr(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function dn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function fn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(xe&2)!==0){var l=a.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),a.pending=t,t=ti(e),cc(e,null,n),t}return ei(e,a,t,n),ti(e)}function ol(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,vu(e,n)}}function nr(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var ar=!1;function rl(){if(ar){var e=va;if(e!==null)throw e}}function sl(e,t,n,a){ar=!1;var l=e.updateQueue;cn=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var p=u,E=p.next;p.next=null,o===null?i=E:o.next=E,o=p;var _=e.alternate;_!==null&&(_=_.updateQueue,u=_.lastBaseUpdate,u!==o&&(u===null?_.firstBaseUpdate=E:u.next=E,_.lastBaseUpdate=p))}if(i!==null){var O=l.baseState;o=0,_=E=p=null,u=i;do{var N=u.lane&-536870913,C=N!==u.lane;if(C?(pe&N)===N:(a&N)===N){N!==0&&N===ya&&(ar=!0),_!==null&&(_=_.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});e:{var F=e,le=u;N=t;var Me=n;switch(le.tag){case 1:if(F=le.payload,typeof F=="function"){O=F.call(Me,O,N);break e}O=F;break e;case 3:F.flags=F.flags&-65537|128;case 0:if(F=le.payload,N=typeof F=="function"?F.call(Me,O,N):F,N==null)break e;O=R({},O,N);break e;case 2:cn=!0}}N=u.callback,N!==null&&(e.flags|=64,C&&(e.flags|=8192),C=l.callbacks,C===null?l.callbacks=[N]:C.push(N))}else C={lane:N,tag:u.tag,payload:u.payload,callback:u.callback,next:null},_===null?(E=_=C,p=O):_=_.next=C,o|=N;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;C=u,u=C.next,C.next=null,l.lastBaseUpdate=C,l.shared.pending=null}}while(!0);_===null&&(p=O),l.baseState=p,l.firstBaseUpdate=E,l.lastBaseUpdate=_,i===null&&(l.shared.lanes=0),yn|=o,e.lanes=o,e.memoizedState=O}}function _c(e,t){if(typeof e!="function")throw Error(r(191,e));e.call(t)}function Mc(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)_c(n[e],t)}var Sa=w(null),di=w(0);function Dc(e,t){e=$t,X(di,e),X(Sa,t),$t=e|t.baseLanes}function lr(){X(di,$t),X(Sa,Sa.current)}function ir(){$t=di.current,z(Sa),z(di)}var ht=w(null),Nt=null;function hn(e){var t=e.alternate;X(He,He.current&1),X(ht,e),Nt===null&&(t===null||Sa.current!==null||t.memoizedState!==null)&&(Nt=e)}function or(e){X(He,He.current),X(ht,e),Nt===null&&(Nt=e)}function kc(e){e.tag===22?(X(He,He.current),X(ht,e),Nt===null&&(Nt=e)):gn()}function gn(){X(He,He.current),X(ht,ht.current)}function gt(e){z(ht),Nt===e&&(Nt=null),z(He)}var He=w(0);function fi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||fs(n)||hs(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Xt=0,ce=null,Ae=null,Ye=null,hi=!1,xa=!1,Xn=!1,gi=0,ul=0,Ta=null,Gm=0;function Ue(){throw Error(r(321))}function rr(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!dt(e[n],t[n]))return!1;return!0}function sr(e,t,n,a,l,i){return Xt=i,ce=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=e===null||e.memoizedState===null?gd:Tr,Xn=!1,i=n(a,l),Xn=!1,xa&&(i=Oc(t,n,a,l)),Rc(e),i}function Rc(e){A.H=fl;var t=Ae!==null&&Ae.next!==null;if(Xt=0,Ye=Ae=ce=null,hi=!1,ul=0,Ta=null,t)throw Error(r(300));e===null||qe||(e=e.dependencies,e!==null&&li(e)&&(qe=!0))}function Oc(e,t,n,a){ce=e;var l=0;do{if(xa&&(Ta=null),ul=0,xa=!1,25<=l)throw Error(r(301));if(l+=1,Ye=Ae=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}A.H=md,i=t(n,a)}while(xa);return i}function Ym(){var e=A.H,t=e.useState()[0];return t=typeof t.then=="function"?cl(t):t,e=e.useState()[0],(Ae!==null?Ae.memoizedState:null)!==e&&(ce.flags|=1024),t}function ur(){var e=gi!==0;return gi=0,e}function cr(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function dr(e){if(hi){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}hi=!1}Xt=0,Ye=Ae=ce=null,xa=!1,ul=gi=0,Ta=null}function et(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ye===null?ce.memoizedState=Ye=e:Ye=Ye.next=e,Ye}function Le(){if(Ae===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Ae.next;var t=Ye===null?ce.memoizedState:Ye.next;if(t!==null)Ye=t,Ae=e;else{if(e===null)throw ce.alternate===null?Error(r(467)):Error(r(310));Ae=e,e={memoizedState:Ae.memoizedState,baseState:Ae.baseState,baseQueue:Ae.baseQueue,queue:Ae.queue,next:null},Ye===null?ce.memoizedState=Ye=e:Ye=Ye.next=e}return Ye}function mi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function cl(e){var t=ul;return ul+=1,Ta===null&&(Ta=[]),e=Tc(Ta,e,t),t=ce,(Ye===null?t.memoizedState:Ye.next)===null&&(t=t.alternate,A.H=t===null||t.memoizedState===null?gd:Tr),e}function pi(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return cl(e);if(e.$$typeof===M)return Fe(e)}throw Error(r(438,String(e)))}function fr(e){var t=null,n=ce.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=ce.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=mi(),ce.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=ee;return t.index++,n}function It(e,t){return typeof t=="function"?t(e):t}function yi(e){var t=Le();return hr(t,Ae,e)}function hr(e,t,n){var a=e.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=n;var l=e.baseQueue,i=a.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}t.baseQueue=l=i,a.pending=null}if(i=e.baseState,l===null)e.memoizedState=i;else{t=l.next;var u=o=null,p=null,E=t,_=!1;do{var O=E.lane&-536870913;if(O!==E.lane?(pe&O)===O:(Xt&O)===O){var N=E.revertLane;if(N===0)p!==null&&(p=p.next={lane:0,revertLane:0,gesture:null,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null}),O===ya&&(_=!0);else if((Xt&N)===N){E=E.next,N===ya&&(_=!0);continue}else O={lane:0,revertLane:E.revertLane,gesture:null,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null},p===null?(u=p=O,o=i):p=p.next=O,ce.lanes|=N,yn|=N;O=E.action,Xn&&n(i,O),i=E.hasEagerState?E.eagerState:n(i,O)}else N={lane:O,revertLane:E.revertLane,gesture:E.gesture,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null},p===null?(u=p=N,o=i):p=p.next=N,ce.lanes|=O,yn|=O;E=E.next}while(E!==null&&E!==t);if(p===null?o=i:p.next=u,!dt(i,e.memoizedState)&&(qe=!0,_&&(n=va,n!==null)))throw n;e.memoizedState=i,e.baseState=o,e.baseQueue=p,a.lastRenderedState=i}return l===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function gr(e){var t=Le(),n=t.queue;if(n===null)throw Error(r(311));n.lastRenderedReducer=e;var a=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);dt(i,t.memoizedState)||(qe=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function zc(e,t,n){var a=ce,l=Le(),i=ve;if(i){if(n===void 0)throw Error(r(407));n=n()}else n=t();var o=!dt((Ae||l).memoizedState,n);if(o&&(l.memoizedState=n,qe=!0),l=l.queue,yr(Hc.bind(null,a,l,e),[e]),l.getSnapshot!==t||o||Ye!==null&&Ye.memoizedState.tag&1){if(a.flags|=2048,Ea(9,{destroy:void 0},jc.bind(null,a,l,n,t),null),De===null)throw Error(r(349));i||(Xt&127)!==0||Uc(a,t,n)}return n}function Uc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ce.updateQueue,t===null?(t=mi(),ce.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function jc(e,t,n,a){t.value=n,t.getSnapshot=a,Lc(t)&&Bc(e)}function Hc(e,t,n){return n(function(){Lc(t)&&Bc(e)})}function Lc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!dt(e,n)}catch{return!0}}function Bc(e){var t=Un(e,2);t!==null&&rt(t,e,2)}function mr(e){var t=et();if(typeof e=="function"){var n=e;if(e=n(),Xn){nn(!0);try{n()}finally{nn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:It,lastRenderedState:e},t}function Gc(e,t,n,a){return e.baseState=n,hr(e,Ae,typeof a=="function"?a:It)}function qm(e,t,n,a,l){if(wi(e))throw Error(r(485));if(e=t.action,e!==null){var i={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};A.T!==null?n(!0):i.isTransition=!1,a(i),n=t.pending,n===null?(i.next=t.pending=i,Yc(t,i)):(i.next=n.next,t.pending=n.next=i)}}function Yc(e,t){var n=t.action,a=t.payload,l=e.state;if(t.isTransition){var i=A.T,o={};A.T=o;try{var u=n(l,a),p=A.S;p!==null&&p(o,u),qc(e,t,u)}catch(E){pr(e,t,E)}finally{i!==null&&o.types!==null&&(i.types=o.types),A.T=i}}else try{i=n(l,a),qc(e,t,i)}catch(E){pr(e,t,E)}}function qc(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Vc(e,t,a)},function(a){return pr(e,t,a)}):Vc(e,t,n)}function Vc(e,t,n){t.status="fulfilled",t.value=n,Xc(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Yc(e,n)))}function pr(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,Xc(t),t=t.next;while(t!==a)}e.action=null}function Xc(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ic(e,t){return t}function Qc(e,t){if(ve){var n=De.formState;if(n!==null){e:{var a=ce;if(ve){if(Re){t:{for(var l=Re,i=Et;l.nodeType!==8;){if(!i){l=null;break t}if(l=Ct(l.nextSibling),l===null){l=null;break t}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){Re=Ct(l.nextSibling),a=l.data==="F!";break e}}sn(a)}a=!1}a&&(t=n[0])}}return n=et(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ic,lastRenderedState:t},n.queue=a,n=dd.bind(null,ce,a),a.dispatch=n,a=mr(!1),i=xr.bind(null,ce,!1,a.queue),a=et(),l={state:t,dispatch:null,action:e,pending:null},a.queue=l,n=qm.bind(null,ce,l,i,n),l.dispatch=n,a.memoizedState=e,[t,n,!1]}function Kc(e){var t=Le();return Zc(t,Ae,e)}function Zc(e,t,n){if(t=hr(e,t,Ic)[0],e=yi(It)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=cl(t)}catch(o){throw o===ba?ri:o}else a=t;t=Le();var l=t.queue,i=l.dispatch;return n!==t.memoizedState&&(ce.flags|=2048,Ea(9,{destroy:void 0},Vm.bind(null,l,n),null)),[a,i,e]}function Vm(e,t){e.action=t}function Jc(e){var t=Le(),n=Ae;if(n!==null)return Zc(t,n,e);Le(),t=t.memoizedState,n=Le();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function Ea(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=ce.updateQueue,t===null&&(t=mi(),ce.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function Fc(){return Le().memoizedState}function vi(e,t,n,a){var l=et();ce.flags|=e,l.memoizedState=Ea(1|t,{destroy:void 0},n,a===void 0?null:a)}function bi(e,t,n,a){var l=Le();a=a===void 0?null:a;var i=l.memoizedState.inst;Ae!==null&&a!==null&&rr(a,Ae.memoizedState.deps)?l.memoizedState=Ea(t,i,n,a):(ce.flags|=e,l.memoizedState=Ea(1|t,i,n,a))}function Wc(e,t){vi(8390656,8,e,t)}function yr(e,t){bi(2048,8,e,t)}function Xm(e){ce.flags|=4;var t=ce.updateQueue;if(t===null)t=mi(),ce.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function $c(e){var t=Le().memoizedState;return Xm({ref:t,nextImpl:e}),function(){if((xe&2)!==0)throw Error(r(440));return t.impl.apply(void 0,arguments)}}function Pc(e,t){return bi(4,2,e,t)}function ed(e,t){return bi(4,4,e,t)}function td(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function nd(e,t,n){n=n!=null?n.concat([e]):null,bi(4,4,td.bind(null,t,e),n)}function vr(){}function ad(e,t){var n=Le();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&rr(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function ld(e,t){var n=Le();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&rr(t,a[1]))return a[0];if(a=e(),Xn){nn(!0);try{e()}finally{nn(!1)}}return n.memoizedState=[a,t],a}function br(e,t,n){return n===void 0||(Xt&1073741824)!==0&&(pe&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=of(),ce.lanes|=e,yn|=e,n)}function id(e,t,n,a){return dt(n,t)?n:Sa.current!==null?(e=br(e,n,a),dt(e,t)||(qe=!0),e):(Xt&42)===0||(Xt&1073741824)!==0&&(pe&261930)===0?(qe=!0,e.memoizedState=n):(e=of(),ce.lanes|=e,yn|=e,t)}function od(e,t,n,a,l){var i=I.p;I.p=i!==0&&8>i?i:8;var o=A.T,u={};A.T=u,xr(e,!1,t,n);try{var p=l(),E=A.S;if(E!==null&&E(u,p),p!==null&&typeof p=="object"&&typeof p.then=="function"){var _=Bm(p,a);dl(e,t,_,yt(e))}else dl(e,t,a,yt(e))}catch(O){dl(e,t,{then:function(){},status:"rejected",reason:O},yt())}finally{I.p=i,o!==null&&u.types!==null&&(o.types=u.types),A.T=o}}function Im(){}function wr(e,t,n,a){if(e.tag!==5)throw Error(r(476));var l=rd(e).queue;od(e,l,t,ae,n===null?Im:function(){return sd(e),n(a)})}function rd(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ae,baseState:ae,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:It,lastRenderedState:ae},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:It,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function sd(e){var t=rd(e);t.next===null&&(t=e.alternate.memoizedState),dl(e,t.next.queue,{},yt())}function Sr(){return Fe(_l)}function ud(){return Le().memoizedState}function cd(){return Le().memoizedState}function Qm(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=yt();e=dn(n);var a=fn(t,e,n);a!==null&&(rt(a,t,n),ol(a,t,n)),t={cache:Fo()},e.payload=t;return}t=t.return}}function Km(e,t,n){var a=yt();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},wi(e)?fd(t,n):(n=Bo(e,t,n,a),n!==null&&(rt(n,e,a),hd(n,t,a)))}function dd(e,t,n){var a=yt();dl(e,t,n,a)}function dl(e,t,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(wi(e))fd(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,u=i(o,n);if(l.hasEagerState=!0,l.eagerState=u,dt(u,o))return ei(e,t,l,0),De===null&&Pl(),!1}catch{}finally{}if(n=Bo(e,t,l,a),n!==null)return rt(n,e,a),hd(n,t,a),!0}return!1}function xr(e,t,n,a){if(a={lane:2,revertLane:es(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},wi(e)){if(t)throw Error(r(479))}else t=Bo(e,n,a,2),t!==null&&rt(t,e,2)}function wi(e){var t=e.alternate;return e===ce||t!==null&&t===ce}function fd(e,t){xa=hi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function hd(e,t,n){if((n&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,vu(e,n)}}var fl={readContext:Fe,use:pi,useCallback:Ue,useContext:Ue,useEffect:Ue,useImperativeHandle:Ue,useLayoutEffect:Ue,useInsertionEffect:Ue,useMemo:Ue,useReducer:Ue,useRef:Ue,useState:Ue,useDebugValue:Ue,useDeferredValue:Ue,useTransition:Ue,useSyncExternalStore:Ue,useId:Ue,useHostTransitionStatus:Ue,useFormState:Ue,useActionState:Ue,useOptimistic:Ue,useMemoCache:Ue,useCacheRefresh:Ue};fl.useEffectEvent=Ue;var gd={readContext:Fe,use:pi,useCallback:function(e,t){return et().memoizedState=[e,t===void 0?null:t],e},useContext:Fe,useEffect:Wc,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,vi(4194308,4,td.bind(null,t,e),n)},useLayoutEffect:function(e,t){return vi(4194308,4,e,t)},useInsertionEffect:function(e,t){vi(4,2,e,t)},useMemo:function(e,t){var n=et();t=t===void 0?null:t;var a=e();if(Xn){nn(!0);try{e()}finally{nn(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=et();if(n!==void 0){var l=n(t);if(Xn){nn(!0);try{n(t)}finally{nn(!1)}}}else l=t;return a.memoizedState=a.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},a.queue=e,e=e.dispatch=Km.bind(null,ce,e),[a.memoizedState,e]},useRef:function(e){var t=et();return e={current:e},t.memoizedState=e},useState:function(e){e=mr(e);var t=e.queue,n=dd.bind(null,ce,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:vr,useDeferredValue:function(e,t){var n=et();return br(n,e,t)},useTransition:function(){var e=mr(!1);return e=od.bind(null,ce,e.queue,!0,!1),et().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=ce,l=et();if(ve){if(n===void 0)throw Error(r(407));n=n()}else{if(n=t(),De===null)throw Error(r(349));(pe&127)!==0||Uc(a,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,Wc(Hc.bind(null,a,i,e),[e]),a.flags|=2048,Ea(9,{destroy:void 0},jc.bind(null,a,i,n,t),null),n},useId:function(){var e=et(),t=De.identifierPrefix;if(ve){var n=Rt,a=kt;n=(a&~(1<<32-ct(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=gi++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=Gm++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Sr,useFormState:Qc,useActionState:Qc,useOptimistic:function(e){var t=et();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=xr.bind(null,ce,!0,n),n.dispatch=t,[e,t]},useMemoCache:fr,useCacheRefresh:function(){return et().memoizedState=Qm.bind(null,ce)},useEffectEvent:function(e){var t=et(),n={impl:e};return t.memoizedState=n,function(){if((xe&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}},Tr={readContext:Fe,use:pi,useCallback:ad,useContext:Fe,useEffect:yr,useImperativeHandle:nd,useInsertionEffect:Pc,useLayoutEffect:ed,useMemo:ld,useReducer:yi,useRef:Fc,useState:function(){return yi(It)},useDebugValue:vr,useDeferredValue:function(e,t){var n=Le();return id(n,Ae.memoizedState,e,t)},useTransition:function(){var e=yi(It)[0],t=Le().memoizedState;return[typeof e=="boolean"?e:cl(e),t]},useSyncExternalStore:zc,useId:ud,useHostTransitionStatus:Sr,useFormState:Kc,useActionState:Kc,useOptimistic:function(e,t){var n=Le();return Gc(n,Ae,e,t)},useMemoCache:fr,useCacheRefresh:cd};Tr.useEffectEvent=$c;var md={readContext:Fe,use:pi,useCallback:ad,useContext:Fe,useEffect:yr,useImperativeHandle:nd,useInsertionEffect:Pc,useLayoutEffect:ed,useMemo:ld,useReducer:gr,useRef:Fc,useState:function(){return gr(It)},useDebugValue:vr,useDeferredValue:function(e,t){var n=Le();return Ae===null?br(n,e,t):id(n,Ae.memoizedState,e,t)},useTransition:function(){var e=gr(It)[0],t=Le().memoizedState;return[typeof e=="boolean"?e:cl(e),t]},useSyncExternalStore:zc,useId:ud,useHostTransitionStatus:Sr,useFormState:Jc,useActionState:Jc,useOptimistic:function(e,t){var n=Le();return Ae!==null?Gc(n,Ae,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:fr,useCacheRefresh:cd};md.useEffectEvent=$c;function Er(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:R({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Nr={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=yt(),l=dn(a);l.payload=t,n!=null&&(l.callback=n),t=fn(e,l,a),t!==null&&(rt(t,e,a),ol(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=yt(),l=dn(a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=fn(e,l,a),t!==null&&(rt(t,e,a),ol(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=yt(),a=dn(n);a.tag=2,t!=null&&(a.callback=t),t=fn(e,a,n),t!==null&&(rt(t,e,n),ol(t,e,n))}};function pd(e,t,n,a,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,o):t.prototype&&t.prototype.isPureReactComponent?!$a(n,a)||!$a(l,i):!0}function yd(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Nr.enqueueReplaceState(t,t.state,null)}function In(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=R({},n));for(var l in e)n[l]===void 0&&(n[l]=e[l])}return n}function vd(e){$l(e)}function bd(e){console.error(e)}function wd(e){$l(e)}function Si(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function Sd(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Cr(e,t,n){return n=dn(n),n.tag=3,n.payload={element:null},n.callback=function(){Si(e,t)},n}function xd(e){return e=dn(e),e.tag=3,e}function Td(e,t,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;e.payload=function(){return l(i)},e.callback=function(){Sd(t,n,a)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(e.callback=function(){Sd(t,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var u=a.stack;this.componentDidCatch(a.value,{componentStack:u!==null?u:""})})}function Zm(e,t,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&pa(t,n,l,!0),n=ht.current,n!==null){switch(n.tag){case 31:case 13:return Nt===null?Oi():n.alternate===null&&je===0&&(je=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===si?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),Wr(e,a,l)),!1;case 22:return n.flags|=65536,a===si?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),Wr(e,a,l)),!1}throw Error(r(435,n.tag))}return Wr(e,a,l),Oi(),!1}if(ve)return t=ht.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,a!==Io&&(e=Error(r(422),{cause:a}),tl(St(e,n)))):(a!==Io&&(t=Error(r(423),{cause:a}),tl(St(t,n))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,a=St(a,n),l=Cr(e.stateNode,a,l),nr(e,l),je!==4&&(je=2)),!1;var i=Error(r(520),{cause:a});if(i=St(i,n),wl===null?wl=[i]:wl.push(i),je!==4&&(je=2),t===null)return!0;a=St(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=l&-l,n.lanes|=e,e=Cr(n.stateNode,a,e),nr(n,e),!1;case 1:if(t=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=xd(l),Td(l,e,n,a),nr(n,l),!1}n=n.return}while(n!==null);return!1}var Ar=Error(r(461)),qe=!1;function We(e,t,n,a){t.child=e===null?Ac(t,null,n,a):Vn(t,e.child,n,a)}function Ed(e,t,n,a,l){n=n.render;var i=t.ref;if("ref"in a){var o={};for(var u in a)u!=="ref"&&(o[u]=a[u])}else o=a;return Bn(t),a=sr(e,t,n,o,i,l),u=ur(),e!==null&&!qe?(cr(e,t,l),Qt(e,t,l)):(ve&&u&&Vo(t),t.flags|=1,We(e,t,a,l),t.child)}function Nd(e,t,n,a,l){if(e===null){var i=n.type;return typeof i=="function"&&!Go(i)&&i.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=i,Cd(e,t,i,a,l)):(e=ni(n.type,null,a,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Ur(e,l)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:$a,n(o,a)&&e.ref===t.ref)return Qt(e,t,l)}return t.flags|=1,e=Gt(i,a),e.ref=t.ref,e.return=t,t.child=e}function Cd(e,t,n,a,l){if(e!==null){var i=e.memoizedProps;if($a(i,a)&&e.ref===t.ref)if(qe=!1,t.pendingProps=a=i,Ur(e,l))(e.flags&131072)!==0&&(qe=!0);else return t.lanes=e.lanes,Qt(e,t,l)}return _r(e,t,n,a,l)}function Ad(e,t,n,a){var l=a.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,e!==null){for(a=t.child=e.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,t.child=null;return _d(e,t,i,n,a)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&oi(t,i!==null?i.cachePool:null),i!==null?Dc(t,i):lr(),kc(t);else return a=t.lanes=536870912,_d(e,t,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(oi(t,i.cachePool),Dc(t,i),gn(),t.memoizedState=null):(e!==null&&oi(t,null),lr(),gn());return We(e,t,l,n),t.child}function hl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function _d(e,t,n,a,l){var i=$o();return i=i===null?null:{parent:Ge._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&oi(t,null),lr(),kc(t),e!==null&&pa(e,t,a,!0),t.childLanes=l,null}function xi(e,t){return t=Ei({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Md(e,t,n){return Vn(t,e.child,null,n),e=xi(t,t.pendingProps),e.flags|=2,gt(t),t.memoizedState=null,e}function Jm(e,t,n){var a=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ve){if(a.mode==="hidden")return e=xi(t,a),t.lanes=536870912,hl(null,e);if(or(t),(e=Re)?(e=qf(e,Et),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:on!==null?{id:kt,overflow:Rt}:null,retryLane:536870912,hydrationErrors:null},n=fc(e),n.return=t,t.child=n,Je=t,Re=null)):e=null,e===null)throw sn(t);return t.lanes=536870912,null}return xi(t,a)}var i=e.memoizedState;if(i!==null){var o=i.dehydrated;if(or(t),l)if(t.flags&256)t.flags&=-257,t=Md(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(r(558));else if(qe||pa(e,t,n,!1),l=(n&e.childLanes)!==0,qe||l){if(a=De,a!==null&&(o=bu(a,n),o!==0&&o!==i.retryLane))throw i.retryLane=o,Un(e,o),rt(a,e,o),Ar;Oi(),t=Md(e,t,n)}else e=i.treeContext,Re=Ct(o.nextSibling),Je=t,ve=!0,rn=null,Et=!1,e!==null&&mc(t,e),t=xi(t,a),t.flags|=4096;return t}return e=Gt(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ti(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(r(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function _r(e,t,n,a,l){return Bn(t),n=sr(e,t,n,a,void 0,l),a=ur(),e!==null&&!qe?(cr(e,t,l),Qt(e,t,l)):(ve&&a&&Vo(t),t.flags|=1,We(e,t,n,l),t.child)}function Dd(e,t,n,a,l,i){return Bn(t),t.updateQueue=null,n=Oc(t,a,n,l),Rc(e),a=ur(),e!==null&&!qe?(cr(e,t,i),Qt(e,t,i)):(ve&&a&&Vo(t),t.flags|=1,We(e,t,n,i),t.child)}function kd(e,t,n,a,l){if(Bn(t),t.stateNode===null){var i=fa,o=n.contextType;typeof o=="object"&&o!==null&&(i=Fe(o)),i=new n(a,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Nr,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=a,i.state=t.memoizedState,i.refs={},er(t),o=n.contextType,i.context=typeof o=="object"&&o!==null?Fe(o):fa,i.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(Er(t,n,o,a),i.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Nr.enqueueReplaceState(i,i.state,null),sl(t,a,i,l),rl(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){i=t.stateNode;var u=t.memoizedProps,p=In(n,u);i.props=p;var E=i.context,_=n.contextType;o=fa,typeof _=="object"&&_!==null&&(o=Fe(_));var O=n.getDerivedStateFromProps;_=typeof O=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=t.pendingProps!==u,_||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||E!==o)&&yd(t,i,a,o),cn=!1;var N=t.memoizedState;i.state=N,sl(t,a,i,l),rl(),E=t.memoizedState,u||N!==E||cn?(typeof O=="function"&&(Er(t,n,O,a),E=t.memoizedState),(p=cn||pd(t,n,p,a,N,E,o))?(_||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=E),i.props=a,i.state=E,i.context=o,a=p):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,tr(e,t),o=t.memoizedProps,_=In(n,o),i.props=_,O=t.pendingProps,N=i.context,E=n.contextType,p=fa,typeof E=="object"&&E!==null&&(p=Fe(E)),u=n.getDerivedStateFromProps,(E=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==O||N!==p)&&yd(t,i,a,p),cn=!1,N=t.memoizedState,i.state=N,sl(t,a,i,l),rl();var C=t.memoizedState;o!==O||N!==C||cn||e!==null&&e.dependencies!==null&&li(e.dependencies)?(typeof u=="function"&&(Er(t,n,u,a),C=t.memoizedState),(_=cn||pd(t,n,_,a,N,C,p)||e!==null&&e.dependencies!==null&&li(e.dependencies))?(E||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,C,p),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,C,p)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&N===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&N===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=C),i.props=a,i.state=C,i.context=p,a=_):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&N===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&N===e.memoizedState||(t.flags|=1024),a=!1)}return i=a,Ti(e,t),a=(t.flags&128)!==0,i||a?(i=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&a?(t.child=Vn(t,e.child,null,l),t.child=Vn(t,null,n,l)):We(e,t,n,l),t.memoizedState=i.state,e=t.child):e=Qt(e,t,l),e}function Rd(e,t,n,a){return Hn(),t.flags|=256,We(e,t,n,a),t.child}var Mr={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Dr(e){return{baseLanes:e,cachePool:Sc()}}function kr(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=pt),e}function Od(e,t,n){var a=t.pendingProps,l=!1,i=(t.flags&128)!==0,o;if((o=i)||(o=e!==null&&e.memoizedState===null?!1:(He.current&2)!==0),o&&(l=!0,t.flags&=-129),o=(t.flags&32)!==0,t.flags&=-33,e===null){if(ve){if(l?hn(t):gn(),(e=Re)?(e=qf(e,Et),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:on!==null?{id:kt,overflow:Rt}:null,retryLane:536870912,hydrationErrors:null},n=fc(e),n.return=t,t.child=n,Je=t,Re=null)):e=null,e===null)throw sn(t);return hs(e)?t.lanes=32:t.lanes=536870912,null}var u=a.children;return a=a.fallback,l?(gn(),l=t.mode,u=Ei({mode:"hidden",children:u},l),a=jn(a,l,n,null),u.return=t,a.return=t,u.sibling=a,t.child=u,a=t.child,a.memoizedState=Dr(n),a.childLanes=kr(e,o,n),t.memoizedState=Mr,hl(null,a)):(hn(t),Rr(t,u))}var p=e.memoizedState;if(p!==null&&(u=p.dehydrated,u!==null)){if(i)t.flags&256?(hn(t),t.flags&=-257,t=Or(e,t,n)):t.memoizedState!==null?(gn(),t.child=e.child,t.flags|=128,t=null):(gn(),u=a.fallback,l=t.mode,a=Ei({mode:"visible",children:a.children},l),u=jn(u,l,n,null),u.flags|=2,a.return=t,u.return=t,a.sibling=u,t.child=a,Vn(t,e.child,null,n),a=t.child,a.memoizedState=Dr(n),a.childLanes=kr(e,o,n),t.memoizedState=Mr,t=hl(null,a));else if(hn(t),hs(u)){if(o=u.nextSibling&&u.nextSibling.dataset,o)var E=o.dgst;o=E,a=Error(r(419)),a.stack="",a.digest=o,tl({value:a,source:null,stack:null}),t=Or(e,t,n)}else if(qe||pa(e,t,n,!1),o=(n&e.childLanes)!==0,qe||o){if(o=De,o!==null&&(a=bu(o,n),a!==0&&a!==p.retryLane))throw p.retryLane=a,Un(e,a),rt(o,e,a),Ar;fs(u)||Oi(),t=Or(e,t,n)}else fs(u)?(t.flags|=192,t.child=e.child,t=null):(e=p.treeContext,Re=Ct(u.nextSibling),Je=t,ve=!0,rn=null,Et=!1,e!==null&&mc(t,e),t=Rr(t,a.children),t.flags|=4096);return t}return l?(gn(),u=a.fallback,l=t.mode,p=e.child,E=p.sibling,a=Gt(p,{mode:"hidden",children:a.children}),a.subtreeFlags=p.subtreeFlags&65011712,E!==null?u=Gt(E,u):(u=jn(u,l,n,null),u.flags|=2),u.return=t,a.return=t,a.sibling=u,t.child=a,hl(null,a),a=t.child,u=e.child.memoizedState,u===null?u=Dr(n):(l=u.cachePool,l!==null?(p=Ge._currentValue,l=l.parent!==p?{parent:p,pool:p}:l):l=Sc(),u={baseLanes:u.baseLanes|n,cachePool:l}),a.memoizedState=u,a.childLanes=kr(e,o,n),t.memoizedState=Mr,hl(e.child,a)):(hn(t),n=e.child,e=n.sibling,n=Gt(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Rr(e,t){return t=Ei({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Ei(e,t){return e=ft(22,e,null,t),e.lanes=0,e}function Or(e,t,n){return Vn(t,e.child,null,n),e=Rr(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function zd(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Zo(e.return,t,n)}function zr(e,t,n,a,l,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=l,o.treeForkCount=i)}function Ud(e,t,n){var a=t.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var o=He.current,u=(o&2)!==0;if(u?(o=o&1|2,t.flags|=128):o&=1,X(He,o),We(e,t,a,n),a=ve?el:0,!u&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&zd(e,n,t);else if(e.tag===19)zd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&fi(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),zr(t,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&fi(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}zr(t,!0,n,null,i,a);break;case"together":zr(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function Qt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),yn|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(pa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(r(153));if(t.child!==null){for(e=t.child,n=Gt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Gt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ur(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&li(e)))}function Fm(e,t,n){switch(t.tag){case 3:ke(t,t.stateNode.containerInfo),un(t,Ge,e.memoizedState.cache),Hn();break;case 27:case 5:jt(t);break;case 4:ke(t,t.stateNode.containerInfo);break;case 10:un(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,or(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Od(e,t,n):(hn(t),e=Qt(e,t,n),e!==null?e.sibling:null);hn(t);break;case 19:var l=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(pa(e,t,n,!1),a=(n&t.childLanes)!==0),l){if(a)return Ud(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),X(He,He.current),a)break;return null;case 22:return t.lanes=0,Ad(e,t,n,t.pendingProps);case 24:un(t,Ge,e.memoizedState.cache)}return Qt(e,t,n)}function jd(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)qe=!0;else{if(!Ur(e,n)&&(t.flags&128)===0)return qe=!1,Fm(e,t,n);qe=(e.flags&131072)!==0}else qe=!1,ve&&(t.flags&1048576)!==0&&gc(t,el,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=Yn(t.elementType),t.type=e,typeof e=="function")Go(e)?(a=In(e,a),t.tag=1,t=kd(null,t,e,a,n)):(t.tag=0,t=_r(null,t,e,a,n));else{if(e!=null){var l=e.$$typeof;if(l===Y){t.tag=11,t=Ed(null,t,e,a,n);break e}else if(l===B){t.tag=14,t=Nd(null,t,e,a,n);break e}}throw t=ne(e)||e,Error(r(306,t,""))}}return t;case 0:return _r(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,l=In(a,t.pendingProps),kd(e,t,a,l,n);case 3:e:{if(ke(t,t.stateNode.containerInfo),e===null)throw Error(r(387));a=t.pendingProps;var i=t.memoizedState;l=i.element,tr(e,t),sl(t,a,null,n);var o=t.memoizedState;if(a=o.cache,un(t,Ge,a),a!==i.cache&&Jo(t,[Ge],n,!0),rl(),a=o.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=Rd(e,t,a,n);break e}else if(a!==l){l=St(Error(r(424)),t),tl(l),t=Rd(e,t,a,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Re=Ct(e.firstChild),Je=t,ve=!0,rn=null,Et=!0,n=Ac(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Hn(),a===l){t=Qt(e,t,n);break e}We(e,t,a,n)}t=t.child}return t;case 26:return Ti(e,t),e===null?(n=Zf(t.type,null,t.pendingProps,null))?t.memoizedState=n:ve||(n=t.type,e=t.pendingProps,a=Gi(fe.current).createElement(n),a[Ze]=t,a[tt]=e,$e(a,n,e),Qe(a),t.stateNode=a):t.memoizedState=Zf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return jt(t),e===null&&ve&&(a=t.stateNode=If(t.type,t.pendingProps,fe.current),Je=t,Et=!0,l=Re,xn(t.type)?(gs=l,Re=Ct(a.firstChild)):Re=l),We(e,t,t.pendingProps.children,n),Ti(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ve&&((l=a=Re)&&(a=Cp(a,t.type,t.pendingProps,Et),a!==null?(t.stateNode=a,Je=t,Re=Ct(a.firstChild),Et=!1,l=!0):l=!1),l||sn(t)),jt(t),l=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,a=i.children,us(l,i)?a=null:o!==null&&us(l,o)&&(t.flags|=32),t.memoizedState!==null&&(l=sr(e,t,Ym,null,null,n),_l._currentValue=l),Ti(e,t),We(e,t,a,n),t.child;case 6:return e===null&&ve&&((e=n=Re)&&(n=Ap(n,t.pendingProps,Et),n!==null?(t.stateNode=n,Je=t,Re=null,e=!0):e=!1),e||sn(t)),null;case 13:return Od(e,t,n);case 4:return ke(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=Vn(t,null,a,n):We(e,t,a,n),t.child;case 11:return Ed(e,t,t.type,t.pendingProps,n);case 7:return We(e,t,t.pendingProps,n),t.child;case 8:return We(e,t,t.pendingProps.children,n),t.child;case 12:return We(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,un(t,t.type,a.value),We(e,t,a.children,n),t.child;case 9:return l=t.type._context,a=t.pendingProps.children,Bn(t),l=Fe(l),a=a(l),t.flags|=1,We(e,t,a,n),t.child;case 14:return Nd(e,t,t.type,t.pendingProps,n);case 15:return Cd(e,t,t.type,t.pendingProps,n);case 19:return Ud(e,t,n);case 31:return Jm(e,t,n);case 22:return Ad(e,t,n,t.pendingProps);case 24:return Bn(t),a=Fe(Ge),e===null?(l=$o(),l===null&&(l=De,i=Fo(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),t.memoizedState={parent:a,cache:l},er(t),un(t,Ge,l)):((e.lanes&n)!==0&&(tr(e,t),sl(t,null,null,n),rl()),l=e.memoizedState,i=t.memoizedState,l.parent!==a?(l={parent:a,cache:a},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),un(t,Ge,a)):(a=i.cache,un(t,Ge,a),a!==l.cache&&Jo(t,[Ge],n,!0))),We(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(r(156,t.tag))}function Kt(e){e.flags|=4}function jr(e,t,n,a,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(cf())e.flags|=8192;else throw qn=si,Po}else e.flags&=-16777217}function Hd(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Pf(t))if(cf())e.flags|=8192;else throw qn=si,Po}function Ni(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?pu():536870912,e.lanes|=t,_a|=t)}function gl(e,t){if(!ve)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Oe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function Wm(e,t,n){var a=t.pendingProps;switch(Xo(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Oe(t),null;case 1:return Oe(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Vt(Ge),Ce(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ma(t)?Kt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Qo())),Oe(t),null;case 26:var l=t.type,i=t.memoizedState;return e===null?(Kt(t),i!==null?(Oe(t),Hd(t,i)):(Oe(t),jr(t,l,null,a,n))):i?i!==e.memoizedState?(Kt(t),Oe(t),Hd(t,i)):(Oe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&Kt(t),Oe(t),jr(t,l,e,a,n)),null;case 27:if(jl(t),n=fe.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Kt(t);else{if(!a){if(t.stateNode===null)throw Error(r(166));return Oe(t),null}e=W.current,ma(t)?pc(t):(e=If(l,a,n),t.stateNode=e,Kt(t))}return Oe(t),null;case 5:if(jl(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Kt(t);else{if(!a){if(t.stateNode===null)throw Error(r(166));return Oe(t),null}if(i=W.current,ma(t))pc(t);else{var o=Gi(fe.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?o.createElement("select",{is:a.is}):o.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?o.createElement(l,{is:a.is}):o.createElement(l)}}i[Ze]=t,i[tt]=a;e:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;o.sibling===null;){if(o.return===null||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=i;e:switch($e(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&Kt(t)}}return Oe(t),jr(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&Kt(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(r(166));if(e=fe.current,ma(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,l=Je,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}e[Ze]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||zf(e.nodeValue,n)),e||sn(t,!0)}else e=Gi(e).createTextNode(a),e[Ze]=t,t.stateNode=e}return Oe(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=ma(t),n!==null){if(e===null){if(!a)throw Error(r(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(557));e[Ze]=t}else Hn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Oe(t),e=!1}else n=Qo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(gt(t),t):(gt(t),null);if((t.flags&128)!==0)throw Error(r(558))}return Oe(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=ma(t),a!==null&&a.dehydrated!==null){if(e===null){if(!l)throw Error(r(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(r(317));l[Ze]=t}else Hn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Oe(t),l=!1}else l=Qo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(gt(t),t):(gt(t),null)}return gt(t),(t.flags&128)!==0?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ni(t,t.updateQueue),Oe(t),null);case 4:return Ce(),e===null&&ls(t.stateNode.containerInfo),Oe(t),null;case 10:return Vt(t.type),Oe(t),null;case 19:if(z(He),a=t.memoizedState,a===null)return Oe(t),null;if(l=(t.flags&128)!==0,i=a.rendering,i===null)if(l)gl(a,!1);else{if(je!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=fi(e),i!==null){for(t.flags|=128,gl(a,!1),e=i.updateQueue,t.updateQueue=e,Ni(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)dc(n,e),n=n.sibling;return X(He,He.current&1|2),ve&&Yt(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&st()>Di&&(t.flags|=128,l=!0,gl(a,!1),t.lanes=4194304)}else{if(!l)if(e=fi(i),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Ni(t,e),gl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!ve)return Oe(t),null}else 2*st()-a.renderingStartTime>Di&&n!==536870912&&(t.flags|=128,l=!0,gl(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(e=a.last,e!==null?e.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=st(),e.sibling=null,n=He.current,X(He,l?n&1|2:n&1),ve&&Yt(t,a.treeForkCount),e):(Oe(t),null);case 22:case 23:return gt(t),ir(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(n&536870912)!==0&&(t.flags&128)===0&&(Oe(t),t.subtreeFlags&6&&(t.flags|=8192)):Oe(t),n=t.updateQueue,n!==null&&Ni(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&z(Gn),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Vt(Ge),Oe(t),null;case 25:return null;case 30:return null}throw Error(r(156,t.tag))}function $m(e,t){switch(Xo(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Vt(Ge),Ce(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return jl(t),null;case 31:if(t.memoizedState!==null){if(gt(t),t.alternate===null)throw Error(r(340));Hn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(gt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(r(340));Hn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return z(He),null;case 4:return Ce(),null;case 10:return Vt(t.type),null;case 22:case 23:return gt(t),ir(),e!==null&&z(Gn),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Vt(Ge),null;case 25:return null;default:return null}}function Ld(e,t){switch(Xo(t),t.tag){case 3:Vt(Ge),Ce();break;case 26:case 27:case 5:jl(t);break;case 4:Ce();break;case 31:t.memoizedState!==null&&gt(t);break;case 13:gt(t);break;case 19:z(He);break;case 10:Vt(t.type);break;case 22:case 23:gt(t),ir(),e!==null&&z(Gn);break;case 24:Vt(Ge)}}function ml(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&e)===e){a=void 0;var i=n.create,o=n.inst;a=i(),o.destroy=a}n=n.next}while(n!==l)}}catch(u){Ne(t,t.return,u)}}function mn(e,t,n){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&e)===e){var o=a.inst,u=o.destroy;if(u!==void 0){o.destroy=void 0,l=t;var p=n,E=u;try{E()}catch(_){Ne(l,p,_)}}}a=a.next}while(a!==i)}}catch(_){Ne(t,t.return,_)}}function Bd(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Mc(t,n)}catch(a){Ne(e,e.return,a)}}}function Gd(e,t,n){n.props=In(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){Ne(e,t,a)}}function pl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(l){Ne(e,t,l)}}function Ot(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){Ne(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){Ne(e,t,l)}else n.current=null}function Yd(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break e;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){Ne(e,e.return,l)}}function Hr(e,t,n){try{var a=e.stateNode;wp(a,e.type,n,t),a[tt]=t}catch(l){Ne(e,e.return,l)}}function qd(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&xn(e.type)||e.tag===4}function Lr(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||qd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&xn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Br(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Lt));else if(a!==4&&(a===27&&xn(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Br(e,t,n),e=e.sibling;e!==null;)Br(e,t,n),e=e.sibling}function Ci(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&xn(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Ci(e,t,n),e=e.sibling;e!==null;)Ci(e,t,n),e=e.sibling}function Vd(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);$e(t,a,n),t[Ze]=e,t[tt]=n}catch(i){Ne(e,e.return,i)}}var Zt=!1,Ve=!1,Gr=!1,Xd=typeof WeakSet=="function"?WeakSet:Set,Ke=null;function Pm(e,t){if(e=e.containerInfo,rs=Ki,e=nc(e),Oo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,u=-1,p=-1,E=0,_=0,O=e,N=null;t:for(;;){for(var C;O!==n||l!==0&&O.nodeType!==3||(u=o+l),O!==i||a!==0&&O.nodeType!==3||(p=o+a),O.nodeType===3&&(o+=O.nodeValue.length),(C=O.firstChild)!==null;)N=O,O=C;for(;;){if(O===e)break t;if(N===n&&++E===l&&(u=o),N===i&&++_===a&&(p=o),(C=O.nextSibling)!==null)break;O=N,N=O.parentNode}O=C}n=u===-1||p===-1?null:{start:u,end:p}}else n=null}n=n||{start:0,end:0}}else n=null;for(ss={focusedElem:e,selectionRange:n},Ki=!1,Ke=t;Ke!==null;)if(t=Ke,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ke=e;else for(;Ke!==null;){switch(t=Ke,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)l=e[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,n=t,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var F=In(n.type,l);e=a.getSnapshotBeforeUpdate(F,i),a.__reactInternalSnapshotBeforeUpdate=e}catch(le){Ne(n,n.return,le)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ds(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":ds(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(r(163))}if(e=t.sibling,e!==null){e.return=t.return,Ke=e;break}Ke=t.return}}function Id(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Ft(e,n),a&4&&ml(5,n);break;case 1:if(Ft(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(o){Ne(n,n.return,o)}else{var l=In(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){Ne(n,n.return,o)}}a&64&&Bd(n),a&512&&pl(n,n.return);break;case 3:if(Ft(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Mc(e,t)}catch(o){Ne(n,n.return,o)}}break;case 27:t===null&&a&4&&Vd(n);case 26:case 5:Ft(e,n),t===null&&a&4&&Yd(n),a&512&&pl(n,n.return);break;case 12:Ft(e,n);break;case 31:Ft(e,n),a&4&&Zd(e,n);break;case 13:Ft(e,n),a&4&&Jd(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=sp.bind(null,n),_p(e,n))));break;case 22:if(a=n.memoizedState!==null||Zt,!a){t=t!==null&&t.memoizedState!==null||Ve,l=Zt;var i=Ve;Zt=a,(Ve=t)&&!i?Wt(e,n,(n.subtreeFlags&8772)!==0):Ft(e,n),Zt=l,Ve=i}break;case 30:break;default:Ft(e,n)}}function Qd(e){var t=e.alternate;t!==null&&(e.alternate=null,Qd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&po(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ze=null,at=!1;function Jt(e,t,n){for(n=n.child;n!==null;)Kd(e,t,n),n=n.sibling}function Kd(e,t,n){if(ut&&typeof ut.onCommitFiberUnmount=="function")try{ut.onCommitFiberUnmount(Ga,n)}catch{}switch(n.tag){case 26:Ve||Ot(n,t),Jt(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Ve||Ot(n,t);var a=ze,l=at;xn(n.type)&&(ze=n.stateNode,at=!1),Jt(e,t,n),Nl(n.stateNode),ze=a,at=l;break;case 5:Ve||Ot(n,t);case 6:if(a=ze,l=at,ze=null,Jt(e,t,n),ze=a,at=l,ze!==null)if(at)try{(ze.nodeType===9?ze.body:ze.nodeName==="HTML"?ze.ownerDocument.body:ze).removeChild(n.stateNode)}catch(i){Ne(n,t,i)}else try{ze.removeChild(n.stateNode)}catch(i){Ne(n,t,i)}break;case 18:ze!==null&&(at?(e=ze,Gf(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),ja(e)):Gf(ze,n.stateNode));break;case 4:a=ze,l=at,ze=n.stateNode.containerInfo,at=!0,Jt(e,t,n),ze=a,at=l;break;case 0:case 11:case 14:case 15:mn(2,n,t),Ve||mn(4,n,t),Jt(e,t,n);break;case 1:Ve||(Ot(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Gd(n,t,a)),Jt(e,t,n);break;case 21:Jt(e,t,n);break;case 22:Ve=(a=Ve)||n.memoizedState!==null,Jt(e,t,n),Ve=a;break;default:Jt(e,t,n)}}function Zd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ja(e)}catch(n){Ne(t,t.return,n)}}}function Jd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ja(e)}catch(n){Ne(t,t.return,n)}}function ep(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Xd),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Xd),t;default:throw Error(r(435,e.tag))}}function Ai(e,t){var n=ep(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var l=up.bind(null,e,a);a.then(l,l)}})}function lt(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=e,o=t,u=o;e:for(;u!==null;){switch(u.tag){case 27:if(xn(u.type)){ze=u.stateNode,at=!1;break e}break;case 5:ze=u.stateNode,at=!1;break e;case 3:case 4:ze=u.stateNode.containerInfo,at=!0;break e}u=u.return}if(ze===null)throw Error(r(160));Kd(i,o,l),ze=null,at=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Fd(t,e),t=t.sibling}var Mt=null;function Fd(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:lt(t,e),it(e),a&4&&(mn(3,e,e.return),ml(3,e),mn(5,e,e.return));break;case 1:lt(t,e),it(e),a&512&&(Ve||n===null||Ot(n,n.return)),a&64&&Zt&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Mt;if(lt(t,e),it(e),a&512&&(Ve||n===null||Ot(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){e:{a=e.type,n=e.memoizedProps,l=l.ownerDocument||l;t:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Va]||i[Ze]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),$e(i,a,n),i[Ze]=e,Qe(i),a=i;break e;case"link":var o=Wf("link","href",l).get(a+(n.href||""));if(o){for(var u=0;u<o.length;u++)if(i=o[u],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(u,1);break t}}i=l.createElement(a),$e(i,a,n),l.head.appendChild(i);break;case"meta":if(o=Wf("meta","content",l).get(a+(n.content||""))){for(u=0;u<o.length;u++)if(i=o[u],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){o.splice(u,1);break t}}i=l.createElement(a),$e(i,a,n),l.head.appendChild(i);break;default:throw Error(r(468,a))}i[Ze]=e,Qe(i),a=i}e.stateNode=a}else $f(l,e.type,e.stateNode);else e.stateNode=Ff(l,a,e.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?$f(l,e.type,e.stateNode):Ff(l,a,e.memoizedProps)):a===null&&e.stateNode!==null&&Hr(e,e.memoizedProps,n.memoizedProps)}break;case 27:lt(t,e),it(e),a&512&&(Ve||n===null||Ot(n,n.return)),n!==null&&a&4&&Hr(e,e.memoizedProps,n.memoizedProps);break;case 5:if(lt(t,e),it(e),a&512&&(Ve||n===null||Ot(n,n.return)),e.flags&32){l=e.stateNode;try{ia(l,"")}catch(F){Ne(e,e.return,F)}}a&4&&e.stateNode!=null&&(l=e.memoizedProps,Hr(e,l,n!==null?n.memoizedProps:l)),a&1024&&(Gr=!0);break;case 6:if(lt(t,e),it(e),a&4){if(e.stateNode===null)throw Error(r(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(F){Ne(e,e.return,F)}}break;case 3:if(Vi=null,l=Mt,Mt=Yi(t.containerInfo),lt(t,e),Mt=l,it(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ja(t.containerInfo)}catch(F){Ne(e,e.return,F)}Gr&&(Gr=!1,Wd(e));break;case 4:a=Mt,Mt=Yi(e.stateNode.containerInfo),lt(t,e),it(e),Mt=a;break;case 12:lt(t,e),it(e);break;case 31:lt(t,e),it(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Ai(e,a)));break;case 13:lt(t,e),it(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Mi=st()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Ai(e,a)));break;case 22:l=e.memoizedState!==null;var p=n!==null&&n.memoizedState!==null,E=Zt,_=Ve;if(Zt=E||l,Ve=_||p,lt(t,e),Ve=_,Zt=E,it(e),a&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(n===null||p||Zt||Ve||Qn(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){p=n=t;try{if(i=p.stateNode,l)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{u=p.stateNode;var O=p.memoizedProps.style,N=O!=null&&O.hasOwnProperty("display")?O.display:null;u.style.display=N==null||typeof N=="boolean"?"":(""+N).trim()}}catch(F){Ne(p,p.return,F)}}}else if(t.tag===6){if(n===null){p=t;try{p.stateNode.nodeValue=l?"":p.memoizedProps}catch(F){Ne(p,p.return,F)}}}else if(t.tag===18){if(n===null){p=t;try{var C=p.stateNode;l?Yf(C,!0):Yf(p.stateNode,!1)}catch(F){Ne(p,p.return,F)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ai(e,n))));break;case 19:lt(t,e),it(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Ai(e,a)));break;case 30:break;case 21:break;default:lt(t,e),it(e)}}function it(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(qd(a)){n=a;break}a=a.return}if(n==null)throw Error(r(160));switch(n.tag){case 27:var l=n.stateNode,i=Lr(e);Ci(e,i,l);break;case 5:var o=n.stateNode;n.flags&32&&(ia(o,""),n.flags&=-33);var u=Lr(e);Ci(e,u,o);break;case 3:case 4:var p=n.stateNode.containerInfo,E=Lr(e);Br(e,E,p);break;default:throw Error(r(161))}}catch(_){Ne(e,e.return,_)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Wd(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Wd(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Ft(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Id(e,t.alternate,t),t=t.sibling}function Qn(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:mn(4,t,t.return),Qn(t);break;case 1:Ot(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&Gd(t,t.return,n),Qn(t);break;case 27:Nl(t.stateNode);case 26:case 5:Ot(t,t.return),Qn(t);break;case 22:t.memoizedState===null&&Qn(t);break;case 30:Qn(t);break;default:Qn(t)}e=e.sibling}}function Wt(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,l=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:Wt(l,i,n),ml(4,i);break;case 1:if(Wt(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(E){Ne(a,a.return,E)}if(a=i,l=a.updateQueue,l!==null){var u=a.stateNode;try{var p=l.shared.hiddenCallbacks;if(p!==null)for(l.shared.hiddenCallbacks=null,l=0;l<p.length;l++)_c(p[l],u)}catch(E){Ne(a,a.return,E)}}n&&o&64&&Bd(i),pl(i,i.return);break;case 27:Vd(i);case 26:case 5:Wt(l,i,n),n&&a===null&&o&4&&Yd(i),pl(i,i.return);break;case 12:Wt(l,i,n);break;case 31:Wt(l,i,n),n&&o&4&&Zd(l,i);break;case 13:Wt(l,i,n),n&&o&4&&Jd(l,i);break;case 22:i.memoizedState===null&&Wt(l,i,n),pl(i,i.return);break;case 30:break;default:Wt(l,i,n)}t=t.sibling}}function Yr(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&nl(n))}function qr(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&nl(e))}function Dt(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)$d(e,t,n,a),t=t.sibling}function $d(e,t,n,a){var l=t.flags;switch(t.tag){case 0:case 11:case 15:Dt(e,t,n,a),l&2048&&ml(9,t);break;case 1:Dt(e,t,n,a);break;case 3:Dt(e,t,n,a),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&nl(e)));break;case 12:if(l&2048){Dt(e,t,n,a),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,u=i.onPostCommit;typeof u=="function"&&u(o,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(p){Ne(t,t.return,p)}}else Dt(e,t,n,a);break;case 31:Dt(e,t,n,a);break;case 13:Dt(e,t,n,a);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,t.memoizedState!==null?i._visibility&2?Dt(e,t,n,a):yl(e,t):i._visibility&2?Dt(e,t,n,a):(i._visibility|=2,Na(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),l&2048&&Yr(o,t);break;case 24:Dt(e,t,n,a),l&2048&&qr(t.alternate,t);break;default:Dt(e,t,n,a)}}function Na(e,t,n,a,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,o=t,u=n,p=a,E=o.flags;switch(o.tag){case 0:case 11:case 15:Na(i,o,u,p,l),ml(8,o);break;case 23:break;case 22:var _=o.stateNode;o.memoizedState!==null?_._visibility&2?Na(i,o,u,p,l):yl(i,o):(_._visibility|=2,Na(i,o,u,p,l)),l&&E&2048&&Yr(o.alternate,o);break;case 24:Na(i,o,u,p,l),l&&E&2048&&qr(o.alternate,o);break;default:Na(i,o,u,p,l)}t=t.sibling}}function yl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,l=a.flags;switch(a.tag){case 22:yl(n,a),l&2048&&Yr(a.alternate,a);break;case 24:yl(n,a),l&2048&&qr(a.alternate,a);break;default:yl(n,a)}t=t.sibling}}var vl=8192;function Ca(e,t,n){if(e.subtreeFlags&vl)for(e=e.child;e!==null;)Pd(e,t,n),e=e.sibling}function Pd(e,t,n){switch(e.tag){case 26:Ca(e,t,n),e.flags&vl&&e.memoizedState!==null&&Gp(n,Mt,e.memoizedState,e.memoizedProps);break;case 5:Ca(e,t,n);break;case 3:case 4:var a=Mt;Mt=Yi(e.stateNode.containerInfo),Ca(e,t,n),Mt=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=vl,vl=16777216,Ca(e,t,n),vl=a):Ca(e,t,n));break;default:Ca(e,t,n)}}function ef(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function bl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Ke=a,nf(a,e)}ef(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)tf(e),e=e.sibling}function tf(e){switch(e.tag){case 0:case 11:case 15:bl(e),e.flags&2048&&mn(9,e,e.return);break;case 3:bl(e);break;case 12:bl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,_i(e)):bl(e);break;default:bl(e)}}function _i(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Ke=a,nf(a,e)}ef(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:mn(8,t,t.return),_i(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,_i(t));break;default:_i(t)}e=e.sibling}}function nf(e,t){for(;Ke!==null;){var n=Ke;switch(n.tag){case 0:case 11:case 15:mn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:nl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Ke=a;else e:for(n=e;Ke!==null;){a=Ke;var l=a.sibling,i=a.return;if(Qd(a),a===n){Ke=null;break e}if(l!==null){l.return=i,Ke=l;break e}Ke=i}}}var tp={getCacheForType:function(e){var t=Fe(Ge),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Fe(Ge).controller.signal}},np=typeof WeakMap=="function"?WeakMap:Map,xe=0,De=null,ge=null,pe=0,Ee=0,mt=null,pn=!1,Aa=!1,Vr=!1,$t=0,je=0,yn=0,Kn=0,Xr=0,pt=0,_a=0,wl=null,ot=null,Ir=!1,Mi=0,af=0,Di=1/0,ki=null,vn=null,Ie=0,bn=null,Ma=null,Pt=0,Qr=0,Kr=null,lf=null,Sl=0,Zr=null;function yt(){return(xe&2)!==0&&pe!==0?pe&-pe:A.T!==null?es():wu()}function of(){if(pt===0)if((pe&536870912)===0||ve){var e=Bl;Bl<<=1,(Bl&3932160)===0&&(Bl=262144),pt=e}else pt=536870912;return e=ht.current,e!==null&&(e.flags|=32),pt}function rt(e,t,n){(e===De&&(Ee===2||Ee===9)||e.cancelPendingCommit!==null)&&(Da(e,0),wn(e,pe,pt,!1)),qa(e,n),((xe&2)===0||e!==De)&&(e===De&&((xe&2)===0&&(Kn|=n),je===4&&wn(e,pe,pt,!1)),zt(e))}function rf(e,t,n){if((xe&6)!==0)throw Error(r(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Ya(e,t),l=a?ip(e,t):Fr(e,t,!0),i=a;do{if(l===0){Aa&&!a&&wn(e,t,0,!1);break}else{if(n=e.current.alternate,i&&!ap(n)){l=Fr(e,t,!1),i=!1;continue}if(l===2){if(i=t,e.errorRecoveryDisabledLanes&i)var o=0;else o=e.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){t=o;e:{var u=e;l=wl;var p=u.current.memoizedState.isDehydrated;if(p&&(Da(u,o).flags|=256),o=Fr(u,o,!1),o!==2){if(Vr&&!p){u.errorRecoveryDisabledLanes|=i,Kn|=i,l=4;break e}i=ot,ot=l,i!==null&&(ot===null?ot=i:ot.push.apply(ot,i))}l=o}if(i=!1,l!==2)continue}}if(l===1){Da(e,0),wn(e,t,0,!0);break}e:{switch(a=e,i=l,i){case 0:case 1:throw Error(r(345));case 4:if((t&4194048)!==t)break;case 6:wn(a,t,pt,!pn);break e;case 2:ot=null;break;case 3:case 5:break;default:throw Error(r(329))}if((t&62914560)===t&&(l=Mi+300-st(),10<l)){if(wn(a,t,pt,!pn),Yl(a,0,!0)!==0)break e;Pt=t,a.timeoutHandle=Lf(sf.bind(null,a,n,ot,ki,Ir,t,pt,Kn,_a,pn,i,"Throttled",-0,0),l);break e}sf(a,n,ot,ki,Ir,t,pt,Kn,_a,pn,i,null,-0,0)}}break}while(!0);zt(e)}function sf(e,t,n,a,l,i,o,u,p,E,_,O,N,C){if(e.timeoutHandle=-1,O=t.subtreeFlags,O&8192||(O&16785408)===16785408){O={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Lt},Pd(t,i,O);var F=(i&62914560)===i?Mi-st():(i&4194048)===i?af-st():0;if(F=Yp(O,F),F!==null){Pt=i,e.cancelPendingCommit=F(pf.bind(null,e,t,i,n,a,l,o,u,p,_,O,null,N,C)),wn(e,i,o,!E);return}}pf(e,t,i,n,a,l,o,u,p)}function ap(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!dt(i(),l))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function wn(e,t,n,a){t&=~Xr,t&=~Kn,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var l=t;0<l;){var i=31-ct(l),o=1<<i;a[i]=-1,l&=~o}n!==0&&yu(e,n,t)}function Ri(){return(xe&6)===0?(xl(0),!1):!0}function Jr(){if(ge!==null){if(Ee===0)var e=ge.return;else e=ge,qt=Ln=null,dr(e),wa=null,ll=0,e=ge;for(;e!==null;)Ld(e.alternate,e),e=e.return;ge=null}}function Da(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Tp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Pt=0,Jr(),De=e,ge=n=Gt(e.current,null),pe=t,Ee=0,mt=null,pn=!1,Aa=Ya(e,t),Vr=!1,_a=pt=Xr=Kn=yn=je=0,ot=wl=null,Ir=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var l=31-ct(a),i=1<<l;t|=e[l],a&=~i}return $t=t,Pl(),n}function uf(e,t){ce=null,A.H=fl,t===ba||t===ri?(t=Ec(),Ee=3):t===Po?(t=Ec(),Ee=4):Ee=t===Ar?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,mt=t,ge===null&&(je=1,Si(e,St(t,e.current)))}function cf(){var e=ht.current;return e===null?!0:(pe&4194048)===pe?Nt===null:(pe&62914560)===pe||(pe&536870912)!==0?e===Nt:!1}function df(){var e=A.H;return A.H=fl,e===null?fl:e}function ff(){var e=A.A;return A.A=tp,e}function Oi(){je=4,pn||(pe&4194048)!==pe&&ht.current!==null||(Aa=!0),(yn&134217727)===0&&(Kn&134217727)===0||De===null||wn(De,pe,pt,!1)}function Fr(e,t,n){var a=xe;xe|=2;var l=df(),i=ff();(De!==e||pe!==t)&&(ki=null,Da(e,t)),t=!1;var o=je;e:do try{if(Ee!==0&&ge!==null){var u=ge,p=mt;switch(Ee){case 8:Jr(),o=6;break e;case 3:case 2:case 9:case 6:ht.current===null&&(t=!0);var E=Ee;if(Ee=0,mt=null,ka(e,u,p,E),n&&Aa){o=0;break e}break;default:E=Ee,Ee=0,mt=null,ka(e,u,p,E)}}lp(),o=je;break}catch(_){uf(e,_)}while(!0);return t&&e.shellSuspendCounter++,qt=Ln=null,xe=a,A.H=l,A.A=i,ge===null&&(De=null,pe=0,Pl()),o}function lp(){for(;ge!==null;)hf(ge)}function ip(e,t){var n=xe;xe|=2;var a=df(),l=ff();De!==e||pe!==t?(ki=null,Di=st()+500,Da(e,t)):Aa=Ya(e,t);e:do try{if(Ee!==0&&ge!==null){t=ge;var i=mt;t:switch(Ee){case 1:Ee=0,mt=null,ka(e,t,i,1);break;case 2:case 9:if(xc(i)){Ee=0,mt=null,gf(t);break}t=function(){Ee!==2&&Ee!==9||De!==e||(Ee=7),zt(e)},i.then(t,t);break e;case 3:Ee=7;break e;case 4:Ee=5;break e;case 7:xc(i)?(Ee=0,mt=null,gf(t)):(Ee=0,mt=null,ka(e,t,i,7));break;case 5:var o=null;switch(ge.tag){case 26:o=ge.memoizedState;case 5:case 27:var u=ge;if(o?Pf(o):u.stateNode.complete){Ee=0,mt=null;var p=u.sibling;if(p!==null)ge=p;else{var E=u.return;E!==null?(ge=E,zi(E)):ge=null}break t}}Ee=0,mt=null,ka(e,t,i,5);break;case 6:Ee=0,mt=null,ka(e,t,i,6);break;case 8:Jr(),je=6;break e;default:throw Error(r(462))}}op();break}catch(_){uf(e,_)}while(!0);return qt=Ln=null,A.H=a,A.A=l,xe=n,ge!==null?0:(De=null,pe=0,Pl(),je)}function op(){for(;ge!==null&&!Mg();)hf(ge)}function hf(e){var t=jd(e.alternate,e,$t);e.memoizedProps=e.pendingProps,t===null?zi(e):ge=t}function gf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Dd(n,t,t.pendingProps,t.type,void 0,pe);break;case 11:t=Dd(n,t,t.pendingProps,t.type.render,t.ref,pe);break;case 5:dr(t);default:Ld(n,t),t=ge=dc(t,$t),t=jd(n,t,$t)}e.memoizedProps=e.pendingProps,t===null?zi(e):ge=t}function ka(e,t,n,a){qt=Ln=null,dr(t),wa=null,ll=0;var l=t.return;try{if(Zm(e,l,t,n,pe)){je=1,Si(e,St(n,e.current)),ge=null;return}}catch(i){if(l!==null)throw ge=l,i;je=1,Si(e,St(n,e.current)),ge=null;return}t.flags&32768?(ve||a===1?e=!0:Aa||(pe&536870912)!==0?e=!1:(pn=e=!0,(a===2||a===9||a===3||a===6)&&(a=ht.current,a!==null&&a.tag===13&&(a.flags|=16384))),mf(t,e)):zi(t)}function zi(e){var t=e;do{if((t.flags&32768)!==0){mf(t,pn);return}e=t.return;var n=Wm(t.alternate,t,$t);if(n!==null){ge=n;return}if(t=t.sibling,t!==null){ge=t;return}ge=t=e}while(t!==null);je===0&&(je=5)}function mf(e,t){do{var n=$m(e.alternate,e);if(n!==null){n.flags&=32767,ge=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){ge=e;return}ge=e=n}while(e!==null);je=6,ge=null}function pf(e,t,n,a,l,i,o,u,p){e.cancelPendingCommit=null;do Ui();while(Ie!==0);if((xe&6)!==0)throw Error(r(327));if(t!==null){if(t===e.current)throw Error(r(177));if(i=t.lanes|t.childLanes,i|=Lo,Bg(e,n,i,o,u,p),e===De&&(ge=De=null,pe=0),Ma=t,bn=e,Pt=n,Qr=i,Kr=l,lf=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,cp(Hl,function(){return Sf(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=A.T,A.T=null,l=I.p,I.p=2,o=xe,xe|=4;try{Pm(e,t,n)}finally{xe=o,I.p=l,A.T=a}}Ie=1,yf(),vf(),bf()}}function yf(){if(Ie===1){Ie=0;var e=bn,t=Ma,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=A.T,A.T=null;var a=I.p;I.p=2;var l=xe;xe|=4;try{Fd(t,e);var i=ss,o=nc(e.containerInfo),u=i.focusedElem,p=i.selectionRange;if(o!==u&&u&&u.ownerDocument&&tc(u.ownerDocument.documentElement,u)){if(p!==null&&Oo(u)){var E=p.start,_=p.end;if(_===void 0&&(_=E),"selectionStart"in u)u.selectionStart=E,u.selectionEnd=Math.min(_,u.value.length);else{var O=u.ownerDocument||document,N=O&&O.defaultView||window;if(N.getSelection){var C=N.getSelection(),F=u.textContent.length,le=Math.min(p.start,F),Me=p.end===void 0?le:Math.min(p.end,F);!C.extend&&le>Me&&(o=Me,Me=le,le=o);var x=ec(u,le),b=ec(u,Me);if(x&&b&&(C.rangeCount!==1||C.anchorNode!==x.node||C.anchorOffset!==x.offset||C.focusNode!==b.node||C.focusOffset!==b.offset)){var T=O.createRange();T.setStart(x.node,x.offset),C.removeAllRanges(),le>Me?(C.addRange(T),C.extend(b.node,b.offset)):(T.setEnd(b.node,b.offset),C.addRange(T))}}}}for(O=[],C=u;C=C.parentNode;)C.nodeType===1&&O.push({element:C,left:C.scrollLeft,top:C.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<O.length;u++){var D=O[u];D.element.scrollLeft=D.left,D.element.scrollTop=D.top}}Ki=!!rs,ss=rs=null}finally{xe=l,I.p=a,A.T=n}}e.current=t,Ie=2}}function vf(){if(Ie===2){Ie=0;var e=bn,t=Ma,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=A.T,A.T=null;var a=I.p;I.p=2;var l=xe;xe|=4;try{Id(e,t.alternate,t)}finally{xe=l,I.p=a,A.T=n}}Ie=3}}function bf(){if(Ie===4||Ie===3){Ie=0,Dg();var e=bn,t=Ma,n=Pt,a=lf;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ie=5:(Ie=0,Ma=bn=null,wf(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(vn=null),go(n),t=t.stateNode,ut&&typeof ut.onCommitFiberRoot=="function")try{ut.onCommitFiberRoot(Ga,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=A.T,l=I.p,I.p=2,A.T=null;try{for(var i=e.onRecoverableError,o=0;o<a.length;o++){var u=a[o];i(u.value,{componentStack:u.stack})}}finally{A.T=t,I.p=l}}(Pt&3)!==0&&Ui(),zt(e),l=e.pendingLanes,(n&261930)!==0&&(l&42)!==0?e===Zr?Sl++:(Sl=0,Zr=e):Sl=0,xl(0)}}function wf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,nl(t)))}function Ui(){return yf(),vf(),bf(),Sf()}function Sf(){if(Ie!==5)return!1;var e=bn,t=Qr;Qr=0;var n=go(Pt),a=A.T,l=I.p;try{I.p=32>n?32:n,A.T=null,n=Kr,Kr=null;var i=bn,o=Pt;if(Ie=0,Ma=bn=null,Pt=0,(xe&6)!==0)throw Error(r(331));var u=xe;if(xe|=4,tf(i.current),$d(i,i.current,o,n),xe=u,xl(0,!1),ut&&typeof ut.onPostCommitFiberRoot=="function")try{ut.onPostCommitFiberRoot(Ga,i)}catch{}return!0}finally{I.p=l,A.T=a,wf(e,t)}}function xf(e,t,n){t=St(n,t),t=Cr(e.stateNode,t,2),e=fn(e,t,2),e!==null&&(qa(e,2),zt(e))}function Ne(e,t,n){if(e.tag===3)xf(e,e,n);else for(;t!==null;){if(t.tag===3){xf(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){e=St(n,e),n=xd(2),a=fn(t,n,2),a!==null&&(Td(n,a,t,e),qa(a,2),zt(a));break}}t=t.return}}function Wr(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new np;var l=new Set;a.set(t,l)}else l=a.get(t),l===void 0&&(l=new Set,a.set(t,l));l.has(n)||(Vr=!0,l.add(n),e=rp.bind(null,e,t,n),t.then(e,e))}function rp(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,De===e&&(pe&n)===n&&(je===4||je===3&&(pe&62914560)===pe&&300>st()-Mi?(xe&2)===0&&Da(e,0):Xr|=n,_a===pe&&(_a=0)),zt(e)}function Tf(e,t){t===0&&(t=pu()),e=Un(e,t),e!==null&&(qa(e,t),zt(e))}function sp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Tf(e,n)}function up(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(r(314))}a!==null&&a.delete(t),Tf(e,n)}function cp(e,t){return uo(e,t)}var ji=null,Ra=null,$r=!1,Hi=!1,Pr=!1,Sn=0;function zt(e){e!==Ra&&e.next===null&&(Ra===null?ji=Ra=e:Ra=Ra.next=e),Hi=!0,$r||($r=!0,fp())}function xl(e,t){if(!Pr&&Hi){Pr=!0;do for(var n=!1,a=ji;a!==null;){if(e!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var o=a.suspendedLanes,u=a.pingedLanes;i=(1<<31-ct(42|e)+1)-1,i&=l&~(o&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Af(a,i))}else i=pe,i=Yl(a,a===De?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||Ya(a,i)||(n=!0,Af(a,i));a=a.next}while(n);Pr=!1}}function dp(){Ef()}function Ef(){Hi=$r=!1;var e=0;Sn!==0&&xp()&&(e=Sn);for(var t=st(),n=null,a=ji;a!==null;){var l=a.next,i=Nf(a,t);i===0?(a.next=null,n===null?ji=l:n.next=l,l===null&&(Ra=n)):(n=a,(e!==0||(i&3)!==0)&&(Hi=!0)),a=l}Ie!==0&&Ie!==5||xl(e),Sn!==0&&(Sn=0)}function Nf(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var o=31-ct(i),u=1<<o,p=l[o];p===-1?((u&n)===0||(u&a)!==0)&&(l[o]=Lg(u,t)):p<=t&&(e.expiredLanes|=u),i&=~u}if(t=De,n=pe,n=Yl(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(Ee===2||Ee===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&co(a),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Ya(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&co(a),go(n)){case 2:case 8:n=gu;break;case 32:n=Hl;break;case 268435456:n=mu;break;default:n=Hl}return a=Cf.bind(null,e),n=uo(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&co(a),e.callbackPriority=2,e.callbackNode=null,2}function Cf(e,t){if(Ie!==0&&Ie!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Ui()&&e.callbackNode!==n)return null;var a=pe;return a=Yl(e,e===De?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(rf(e,a,t),Nf(e,st()),e.callbackNode!=null&&e.callbackNode===n?Cf.bind(null,e):null)}function Af(e,t){if(Ui())return null;rf(e,t,!0)}function fp(){Ep(function(){(xe&6)!==0?uo(hu,dp):Ef()})}function es(){if(Sn===0){var e=ya;e===0&&(e=Ll,Ll<<=1,(Ll&261888)===0&&(Ll=256)),Sn=e}return Sn}function _f(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Il(""+e)}function Mf(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function hp(e,t,n,a,l){if(t==="submit"&&n&&n.stateNode===l){var i=_f((l[tt]||null).action),o=a.submitter;o&&(t=(t=o[tt]||null)?_f(t.formAction):o.getAttribute("formAction"),t!==null&&(i=t,o=null));var u=new Jl("action","action",null,a,l);e.push({event:u,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Sn!==0){var p=o?Mf(l,o):new FormData(l);wr(n,{pending:!0,data:p,method:l.method,action:i},null,p)}}else typeof i=="function"&&(u.preventDefault(),p=o?Mf(l,o):new FormData(l),wr(n,{pending:!0,data:p,method:l.method,action:i},i,p))},currentTarget:l}]})}}for(var ts=0;ts<Ho.length;ts++){var ns=Ho[ts],gp=ns.toLowerCase(),mp=ns[0].toUpperCase()+ns.slice(1);_t(gp,"on"+mp)}_t(ic,"onAnimationEnd"),_t(oc,"onAnimationIteration"),_t(rc,"onAnimationStart"),_t("dblclick","onDoubleClick"),_t("focusin","onFocus"),_t("focusout","onBlur"),_t(km,"onTransitionRun"),_t(Rm,"onTransitionStart"),_t(Om,"onTransitionCancel"),_t(sc,"onTransitionEnd"),aa("onMouseEnter",["mouseout","mouseover"]),aa("onMouseLeave",["mouseout","mouseover"]),aa("onPointerEnter",["pointerout","pointerover"]),aa("onPointerLeave",["pointerout","pointerover"]),kn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),kn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),kn("onBeforeInput",["compositionend","keypress","textInput","paste"]),kn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),kn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),kn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Tl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),pp=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Tl));function Df(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],l=a.event;a=a.listeners;e:{var i=void 0;if(t)for(var o=a.length-1;0<=o;o--){var u=a[o],p=u.instance,E=u.currentTarget;if(u=u.listener,p!==i&&l.isPropagationStopped())break e;i=u,l.currentTarget=E;try{i(l)}catch(_){$l(_)}l.currentTarget=null,i=p}else for(o=0;o<a.length;o++){if(u=a[o],p=u.instance,E=u.currentTarget,u=u.listener,p!==i&&l.isPropagationStopped())break e;i=u,l.currentTarget=E;try{i(l)}catch(_){$l(_)}l.currentTarget=null,i=p}}}}function me(e,t){var n=t[mo];n===void 0&&(n=t[mo]=new Set);var a=e+"__bubble";n.has(a)||(kf(t,e,2,!1),n.add(a))}function as(e,t,n){var a=0;t&&(a|=4),kf(n,e,a,t)}var Li="_reactListening"+Math.random().toString(36).slice(2);function ls(e){if(!e[Li]){e[Li]=!0,Tu.forEach(function(n){n!=="selectionchange"&&(pp.has(n)||as(n,!1,e),as(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Li]||(t[Li]=!0,as("selectionchange",!1,t))}}function kf(e,t,n,a){switch(oh(t)){case 2:var l=Xp;break;case 8:l=Ip;break;default:l=bs}n=l.bind(null,t,n,e),l=void 0,!Eo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),a?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function is(e,t,n,a,l){var i=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var o=a.tag;if(o===3||o===4){var u=a.stateNode.containerInfo;if(u===l)break;if(o===4)for(o=a.return;o!==null;){var p=o.tag;if((p===3||p===4)&&o.stateNode.containerInfo===l)return;o=o.return}for(;u!==null;){if(o=ea(u),o===null)return;if(p=o.tag,p===5||p===6||p===26||p===27){a=i=o;continue e}u=u.parentNode}}a=a.return}Uu(function(){var E=i,_=xo(n),O=[];e:{var N=uc.get(e);if(N!==void 0){var C=Jl,F=e;switch(e){case"keypress":if(Kl(n)===0)break e;case"keydown":case"keyup":C=um;break;case"focusin":F="focus",C=_o;break;case"focusout":F="blur",C=_o;break;case"beforeblur":case"afterblur":C=_o;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=Lu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=Wg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=fm;break;case ic:case oc:case rc:C=em;break;case sc:C=gm;break;case"scroll":case"scrollend":C=Jg;break;case"wheel":C=pm;break;case"copy":case"cut":case"paste":C=nm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=Gu;break;case"toggle":case"beforetoggle":C=vm}var le=(t&4)!==0,Me=!le&&(e==="scroll"||e==="scrollend"),x=le?N!==null?N+"Capture":null:N;le=[];for(var b=E,T;b!==null;){var D=b;if(T=D.stateNode,D=D.tag,D!==5&&D!==26&&D!==27||T===null||x===null||(D=Ia(b,x),D!=null&&le.push(El(b,D,T))),Me)break;b=b.return}0<le.length&&(N=new C(N,F,null,n,_),O.push({event:N,listeners:le}))}}if((t&7)===0){e:{if(N=e==="mouseover"||e==="pointerover",C=e==="mouseout"||e==="pointerout",N&&n!==So&&(F=n.relatedTarget||n.fromElement)&&(ea(F)||F[Pn]))break e;if((C||N)&&(N=_.window===_?_:(N=_.ownerDocument)?N.defaultView||N.parentWindow:window,C?(F=n.relatedTarget||n.toElement,C=E,F=F?ea(F):null,F!==null&&(Me=h(F),le=F.tag,F!==Me||le!==5&&le!==27&&le!==6)&&(F=null)):(C=null,F=E),C!==F)){if(le=Lu,D="onMouseLeave",x="onMouseEnter",b="mouse",(e==="pointerout"||e==="pointerover")&&(le=Gu,D="onPointerLeave",x="onPointerEnter",b="pointer"),Me=C==null?N:Xa(C),T=F==null?N:Xa(F),N=new le(D,b+"leave",C,n,_),N.target=Me,N.relatedTarget=T,D=null,ea(_)===E&&(le=new le(x,b+"enter",F,n,_),le.target=T,le.relatedTarget=Me,D=le),Me=D,C&&F)t:{for(le=yp,x=C,b=F,T=0,D=x;D;D=le(D))T++;D=0;for(var te=b;te;te=le(te))D++;for(;0<T-D;)x=le(x),T--;for(;0<D-T;)b=le(b),D--;for(;T--;){if(x===b||b!==null&&x===b.alternate){le=x;break t}x=le(x),b=le(b)}le=null}else le=null;C!==null&&Rf(O,N,C,le,!1),F!==null&&Me!==null&&Rf(O,Me,F,le,!0)}}e:{if(N=E?Xa(E):window,C=N.nodeName&&N.nodeName.toLowerCase(),C==="select"||C==="input"&&N.type==="file")var be=Zu;else if(Qu(N))if(Ju)be=_m;else{be=Cm;var P=Nm}else C=N.nodeName,!C||C.toLowerCase()!=="input"||N.type!=="checkbox"&&N.type!=="radio"?E&&wo(E.elementType)&&(be=Zu):be=Am;if(be&&(be=be(e,E))){Ku(O,be,n,_);break e}P&&P(e,N,E),e==="focusout"&&E&&N.type==="number"&&E.memoizedProps.value!=null&&bo(N,"number",N.value)}switch(P=E?Xa(E):window,e){case"focusin":(Qu(P)||P.contentEditable==="true")&&(ua=P,zo=E,Pa=null);break;case"focusout":Pa=zo=ua=null;break;case"mousedown":Uo=!0;break;case"contextmenu":case"mouseup":case"dragend":Uo=!1,ac(O,n,_);break;case"selectionchange":if(Dm)break;case"keydown":case"keyup":ac(O,n,_)}var de;if(Do)e:{switch(e){case"compositionstart":var ye="onCompositionStart";break e;case"compositionend":ye="onCompositionEnd";break e;case"compositionupdate":ye="onCompositionUpdate";break e}ye=void 0}else sa?Xu(e,n)&&(ye="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(ye="onCompositionStart");ye&&(Yu&&n.locale!=="ko"&&(sa||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&sa&&(de=ju()):(ln=_,No="value"in ln?ln.value:ln.textContent,sa=!0)),P=Bi(E,ye),0<P.length&&(ye=new Bu(ye,e,null,n,_),O.push({event:ye,listeners:P}),de?ye.data=de:(de=Iu(n),de!==null&&(ye.data=de)))),(de=wm?Sm(e,n):xm(e,n))&&(ye=Bi(E,"onBeforeInput"),0<ye.length&&(P=new Bu("onBeforeInput","beforeinput",null,n,_),O.push({event:P,listeners:ye}),P.data=de)),hp(O,e,E,n,_)}Df(O,t)})}function El(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Bi(e,t){for(var n=t+"Capture",a=[];e!==null;){var l=e,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Ia(e,n),l!=null&&a.unshift(El(e,l,i)),l=Ia(e,t),l!=null&&a.push(El(e,l,i))),e.tag===3)return a;e=e.return}return[]}function yp(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Rf(e,t,n,a,l){for(var i=t._reactName,o=[];n!==null&&n!==a;){var u=n,p=u.alternate,E=u.stateNode;if(u=u.tag,p!==null&&p===a)break;u!==5&&u!==26&&u!==27||E===null||(p=E,l?(E=Ia(n,i),E!=null&&o.unshift(El(n,E,p))):l||(E=Ia(n,i),E!=null&&o.push(El(n,E,p)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var vp=/\r\n?/g,bp=/\u0000|\uFFFD/g;function Of(e){return(typeof e=="string"?e:""+e).replace(vp,`
`).replace(bp,"")}function zf(e,t){return t=Of(t),Of(e)===t}function _e(e,t,n,a,l,i){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||ia(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&ia(e,""+a);break;case"className":Vl(e,"class",a);break;case"tabIndex":Vl(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Vl(e,n,a);break;case"style":Ou(e,a,i);break;case"data":if(t!=="object"){Vl(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Il(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(t!=="input"&&_e(e,t,"name",l.name,l,null),_e(e,t,"formEncType",l.formEncType,l,null),_e(e,t,"formMethod",l.formMethod,l,null),_e(e,t,"formTarget",l.formTarget,l,null)):(_e(e,t,"encType",l.encType,l,null),_e(e,t,"method",l.method,l,null),_e(e,t,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Il(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=Lt);break;case"onScroll":a!=null&&me("scroll",e);break;case"onScrollEnd":a!=null&&me("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(r(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(r(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=Il(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":me("beforetoggle",e),me("toggle",e),ql(e,"popover",a);break;case"xlinkActuate":Ht(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Ht(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Ht(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Ht(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Ht(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Ht(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":ql(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Kg.get(n)||n,ql(e,n,a))}}function os(e,t,n,a,l,i){switch(n){case"style":Ou(e,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(r(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(r(60));e.innerHTML=n}}break;case"children":typeof a=="string"?ia(e,a):(typeof a=="number"||typeof a=="bigint")&&ia(e,""+a);break;case"onScroll":a!=null&&me("scroll",e);break;case"onScrollEnd":a!=null&&me("scrollend",e);break;case"onClick":a!=null&&(e.onclick=Lt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Eu.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),t=n.slice(2,l?n.length-7:void 0),i=e[tt]||null,i=i!=null?i[n]:null,typeof i=="function"&&e.removeEventListener(t,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,l);break e}n in e?e[n]=a:a===!0?e.setAttribute(n,""):ql(e,n,a)}}}function $e(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":me("error",e),me("load",e);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var o=n[i];if(o!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,t));default:_e(e,t,i,o,n,null)}}l&&_e(e,t,"srcSet",n.srcSet,n,null),a&&_e(e,t,"src",n.src,n,null);return;case"input":me("invalid",e);var u=i=o=l=null,p=null,E=null;for(a in n)if(n.hasOwnProperty(a)){var _=n[a];if(_!=null)switch(a){case"name":l=_;break;case"type":o=_;break;case"checked":p=_;break;case"defaultChecked":E=_;break;case"value":i=_;break;case"defaultValue":u=_;break;case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(r(137,t));break;default:_e(e,t,a,_,n,null)}}Mu(e,i,u,p,E,o,l,!1);return;case"select":me("invalid",e),a=o=i=null;for(l in n)if(n.hasOwnProperty(l)&&(u=n[l],u!=null))switch(l){case"value":i=u;break;case"defaultValue":o=u;break;case"multiple":a=u;default:_e(e,t,l,u,n,null)}t=i,n=o,e.multiple=!!a,t!=null?la(e,!!a,t,!1):n!=null&&la(e,!!a,n,!0);return;case"textarea":me("invalid",e),i=l=a=null;for(o in n)if(n.hasOwnProperty(o)&&(u=n[o],u!=null))switch(o){case"value":a=u;break;case"defaultValue":l=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:_e(e,t,o,u,n,null)}ku(e,a,l,i);return;case"option":for(p in n)if(n.hasOwnProperty(p)&&(a=n[p],a!=null))switch(p){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_e(e,t,p,a,n,null)}return;case"dialog":me("beforetoggle",e),me("toggle",e),me("cancel",e),me("close",e);break;case"iframe":case"object":me("load",e);break;case"video":case"audio":for(a=0;a<Tl.length;a++)me(Tl[a],e);break;case"image":me("error",e),me("load",e);break;case"details":me("toggle",e);break;case"embed":case"source":case"link":me("error",e),me("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(E in n)if(n.hasOwnProperty(E)&&(a=n[E],a!=null))switch(E){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,t));default:_e(e,t,E,a,n,null)}return;default:if(wo(t)){for(_ in n)n.hasOwnProperty(_)&&(a=n[_],a!==void 0&&os(e,t,_,a,n,void 0));return}}for(u in n)n.hasOwnProperty(u)&&(a=n[u],a!=null&&_e(e,t,u,a,n,null))}function wp(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,o=null,u=null,p=null,E=null,_=null;for(C in n){var O=n[C];if(n.hasOwnProperty(C)&&O!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":p=O;default:a.hasOwnProperty(C)||_e(e,t,C,null,a,O)}}for(var N in a){var C=a[N];if(O=n[N],a.hasOwnProperty(N)&&(C!=null||O!=null))switch(N){case"type":i=C;break;case"name":l=C;break;case"checked":E=C;break;case"defaultChecked":_=C;break;case"value":o=C;break;case"defaultValue":u=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(r(137,t));break;default:C!==O&&_e(e,t,N,C,a,O)}}vo(e,o,u,p,E,_,i,l);return;case"select":C=o=u=N=null;for(i in n)if(p=n[i],n.hasOwnProperty(i)&&p!=null)switch(i){case"value":break;case"multiple":C=p;default:a.hasOwnProperty(i)||_e(e,t,i,null,a,p)}for(l in a)if(i=a[l],p=n[l],a.hasOwnProperty(l)&&(i!=null||p!=null))switch(l){case"value":N=i;break;case"defaultValue":u=i;break;case"multiple":o=i;default:i!==p&&_e(e,t,l,i,a,p)}t=u,n=o,a=C,N!=null?la(e,!!n,N,!1):!!a!=!!n&&(t!=null?la(e,!!n,t,!0):la(e,!!n,n?[]:"",!1));return;case"textarea":C=N=null;for(u in n)if(l=n[u],n.hasOwnProperty(u)&&l!=null&&!a.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:_e(e,t,u,null,a,l)}for(o in a)if(l=a[o],i=n[o],a.hasOwnProperty(o)&&(l!=null||i!=null))switch(o){case"value":N=l;break;case"defaultValue":C=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(r(91));break;default:l!==i&&_e(e,t,o,l,a,i)}Du(e,N,C);return;case"option":for(var F in n)if(N=n[F],n.hasOwnProperty(F)&&N!=null&&!a.hasOwnProperty(F))switch(F){case"selected":e.selected=!1;break;default:_e(e,t,F,null,a,N)}for(p in a)if(N=a[p],C=n[p],a.hasOwnProperty(p)&&N!==C&&(N!=null||C!=null))switch(p){case"selected":e.selected=N&&typeof N!="function"&&typeof N!="symbol";break;default:_e(e,t,p,N,a,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var le in n)N=n[le],n.hasOwnProperty(le)&&N!=null&&!a.hasOwnProperty(le)&&_e(e,t,le,null,a,N);for(E in a)if(N=a[E],C=n[E],a.hasOwnProperty(E)&&N!==C&&(N!=null||C!=null))switch(E){case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(r(137,t));break;default:_e(e,t,E,N,a,C)}return;default:if(wo(t)){for(var Me in n)N=n[Me],n.hasOwnProperty(Me)&&N!==void 0&&!a.hasOwnProperty(Me)&&os(e,t,Me,void 0,a,N);for(_ in a)N=a[_],C=n[_],!a.hasOwnProperty(_)||N===C||N===void 0&&C===void 0||os(e,t,_,N,a,C);return}}for(var x in n)N=n[x],n.hasOwnProperty(x)&&N!=null&&!a.hasOwnProperty(x)&&_e(e,t,x,null,a,N);for(O in a)N=a[O],C=n[O],!a.hasOwnProperty(O)||N===C||N==null&&C==null||_e(e,t,O,N,a,C)}function Uf(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Sp(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,o=l.initiatorType,u=l.duration;if(i&&u&&Uf(o)){for(o=0,u=l.responseEnd,a+=1;a<n.length;a++){var p=n[a],E=p.startTime;if(E>u)break;var _=p.transferSize,O=p.initiatorType;_&&Uf(O)&&(p=p.responseEnd,o+=_*(p<u?1:(u-E)/(p-E)))}if(--a,t+=8*(i+o)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var rs=null,ss=null;function Gi(e){return e.nodeType===9?e:e.ownerDocument}function jf(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Hf(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function us(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var cs=null;function xp(){var e=window.event;return e&&e.type==="popstate"?e===cs?!1:(cs=e,!0):(cs=null,!1)}var Lf=typeof setTimeout=="function"?setTimeout:void 0,Tp=typeof clearTimeout=="function"?clearTimeout:void 0,Bf=typeof Promise=="function"?Promise:void 0,Ep=typeof queueMicrotask=="function"?queueMicrotask:typeof Bf<"u"?function(e){return Bf.resolve(null).then(e).catch(Np)}:Lf;function Np(e){setTimeout(function(){throw e})}function xn(e){return e==="head"}function Gf(e,t){var n=t,a=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(l),ja(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Nl(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Nl(n);for(var i=n.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[Va]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=o}}else n==="body"&&Nl(e.ownerDocument.body);n=l}while(n);ja(t)}function Yf(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function ds(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":ds(n),po(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Cp(e,t,n,a){for(;e.nodeType===1;){var l=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[Va])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=Ct(e.nextSibling),e===null)break}return null}function Ap(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ct(e.nextSibling),e===null))return null;return e}function qf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ct(e.nextSibling),e===null))return null;return e}function fs(e){return e.data==="$?"||e.data==="$~"}function hs(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function _p(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function Ct(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var gs=null;function Vf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Ct(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function Xf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function If(e,t,n){switch(t=Gi(n),e){case"html":if(e=t.documentElement,!e)throw Error(r(452));return e;case"head":if(e=t.head,!e)throw Error(r(453));return e;case"body":if(e=t.body,!e)throw Error(r(454));return e;default:throw Error(r(451))}}function Nl(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);po(e)}var At=new Map,Qf=new Set;function Yi(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var en=I.d;I.d={f:Mp,r:Dp,D:kp,C:Rp,L:Op,m:zp,X:jp,S:Up,M:Hp};function Mp(){var e=en.f(),t=Ri();return e||t}function Dp(e){var t=ta(e);t!==null&&t.tag===5&&t.type==="form"?sd(t):en.r(e)}var Oa=typeof document>"u"?null:document;function Kf(e,t,n){var a=Oa;if(a&&typeof t=="string"&&t){var l=bt(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),Qf.has(l)||(Qf.add(l),e={rel:e,crossOrigin:n,href:t},a.querySelector(l)===null&&(t=a.createElement("link"),$e(t,"link",e),Qe(t),a.head.appendChild(t)))}}function kp(e){en.D(e),Kf("dns-prefetch",e,null)}function Rp(e,t){en.C(e,t),Kf("preconnect",e,t)}function Op(e,t,n){en.L(e,t,n);var a=Oa;if(a&&e&&t){var l='link[rel="preload"][as="'+bt(t)+'"]';t==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+bt(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+bt(n.imageSizes)+'"]')):l+='[href="'+bt(e)+'"]';var i=l;switch(t){case"style":i=za(e);break;case"script":i=Ua(e)}At.has(i)||(e=R({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),At.set(i,e),a.querySelector(l)!==null||t==="style"&&a.querySelector(Cl(i))||t==="script"&&a.querySelector(Al(i))||(t=a.createElement("link"),$e(t,"link",e),Qe(t),a.head.appendChild(t)))}}function zp(e,t){en.m(e,t);var n=Oa;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+bt(a)+'"][href="'+bt(e)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ua(e)}if(!At.has(i)&&(e=R({rel:"modulepreload",href:e},t),At.set(i,e),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Al(i)))return}a=n.createElement("link"),$e(a,"link",e),Qe(a),n.head.appendChild(a)}}}function Up(e,t,n){en.S(e,t,n);var a=Oa;if(a&&e){var l=na(a).hoistableStyles,i=za(e);t=t||"default";var o=l.get(i);if(!o){var u={loading:0,preload:null};if(o=a.querySelector(Cl(i)))u.loading=5;else{e=R({rel:"stylesheet",href:e,"data-precedence":t},n),(n=At.get(i))&&ms(e,n);var p=o=a.createElement("link");Qe(p),$e(p,"link",e),p._p=new Promise(function(E,_){p.onload=E,p.onerror=_}),p.addEventListener("load",function(){u.loading|=1}),p.addEventListener("error",function(){u.loading|=2}),u.loading|=4,qi(o,t,a)}o={type:"stylesheet",instance:o,count:1,state:u},l.set(i,o)}}}function jp(e,t){en.X(e,t);var n=Oa;if(n&&e){var a=na(n).hoistableScripts,l=Ua(e),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(e=R({src:e,async:!0},t),(t=At.get(l))&&ps(e,t),i=n.createElement("script"),Qe(i),$e(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Hp(e,t){en.M(e,t);var n=Oa;if(n&&e){var a=na(n).hoistableScripts,l=Ua(e),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(e=R({src:e,async:!0,type:"module"},t),(t=At.get(l))&&ps(e,t),i=n.createElement("script"),Qe(i),$e(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Zf(e,t,n,a){var l=(l=fe.current)?Yi(l):null;if(!l)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=za(n.href),n=na(l).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=za(n.href);var i=na(l).hoistableStyles,o=i.get(e);if(o||(l=l.ownerDocument||l,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,o),(i=l.querySelector(Cl(e)))&&!i._p&&(o.instance=i,o.state.loading=5),At.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},At.set(e,n),i||Lp(l,e,n,o.state))),t&&a===null)throw Error(r(528,""));return o}if(t&&a!==null)throw Error(r(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ua(n),n=na(l).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function za(e){return'href="'+bt(e)+'"'}function Cl(e){return'link[rel="stylesheet"]['+e+"]"}function Jf(e){return R({},e,{"data-precedence":e.precedence,precedence:null})}function Lp(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),$e(t,"link",n),Qe(t),e.head.appendChild(t))}function Ua(e){return'[src="'+bt(e)+'"]'}function Al(e){return"script[async]"+e}function Ff(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+bt(n.href)+'"]');if(a)return t.instance=a,Qe(a),a;var l=R({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Qe(a),$e(a,"style",l),qi(a,n.precedence,e),t.instance=a;case"stylesheet":l=za(n.href);var i=e.querySelector(Cl(l));if(i)return t.state.loading|=4,t.instance=i,Qe(i),i;a=Jf(n),(l=At.get(l))&&ms(a,l),i=(e.ownerDocument||e).createElement("link"),Qe(i);var o=i;return o._p=new Promise(function(u,p){o.onload=u,o.onerror=p}),$e(i,"link",a),t.state.loading|=4,qi(i,n.precedence,e),t.instance=i;case"script":return i=Ua(n.src),(l=e.querySelector(Al(i)))?(t.instance=l,Qe(l),l):(a=n,(l=At.get(i))&&(a=R({},n),ps(a,l)),e=e.ownerDocument||e,l=e.createElement("script"),Qe(l),$e(l,"link",a),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(r(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,qi(a,n.precedence,e));return t.instance}function qi(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,o=0;o<a.length;o++){var u=a[o];if(u.dataset.precedence===t)i=u;else if(i!==l)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function ms(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function ps(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Vi=null;function Wf(e,t,n){if(Vi===null){var a=new Map,l=Vi=new Map;l.set(n,a)}else l=Vi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),l=0;l<n.length;l++){var i=n[l];if(!(i[Va]||i[Ze]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(t)||"";o=e+o;var u=a.get(o);u?u.push(i):a.set(o,[i])}}return a}function $f(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function Bp(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Pf(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Gp(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=za(a.href),i=t.querySelector(Cl(l));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Xi.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,Qe(i);return}i=t.ownerDocument||t,a=Jf(a),(l=At.get(l))&&ms(a,l),i=i.createElement("link"),Qe(i);var o=i;o._p=new Promise(function(u,p){o.onload=u,o.onerror=p}),$e(i,"link",a),n.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Xi.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var ys=0;function Yp(e,t){return e.stylesheets&&e.count===0&&Qi(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&Qi(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&ys===0&&(ys=62500*Sp());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Qi(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>ys?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Xi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Qi(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ii=null;function Qi(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ii=new Map,t.forEach(qp,e),Ii=null,Xi.call(e))}function qp(e,t){if(!(t.state.loading&4)){var n=Ii.get(e);if(n)var a=n.get(null);else{n=new Map,Ii.set(e,n);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var o=l[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(n.set(o.dataset.precedence,o),a=o)}a&&n.set(null,a)}l=t.instance,o=l.getAttribute("data-precedence"),i=n.get(o)||a,i===a&&n.set(null,l),n.set(o,l),this.count++,a=Xi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var _l={$$typeof:M,Provider:null,Consumer:null,_currentValue:ae,_currentValue2:ae,_threadCount:0};function Vp(e,t,n,a,l,i,o,u,p){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=fo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fo(0),this.hiddenUpdates=fo(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=p,this.incompleteTransitions=new Map}function eh(e,t,n,a,l,i,o,u,p,E,_,O){return e=new Vp(e,t,n,o,p,E,_,O,u),t=1,i===!0&&(t|=24),i=ft(3,null,null,t),e.current=i,i.stateNode=e,t=Fo(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:t},er(i),e}function th(e){return e?(e=fa,e):fa}function nh(e,t,n,a,l,i){l=th(l),a.context===null?a.context=l:a.pendingContext=l,a=dn(t),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=fn(e,a,t),n!==null&&(rt(n,e,t),ol(n,e,t))}function ah(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function vs(e,t){ah(e,t),(e=e.alternate)&&ah(e,t)}function lh(e){if(e.tag===13||e.tag===31){var t=Un(e,67108864);t!==null&&rt(t,e,67108864),vs(e,67108864)}}function ih(e){if(e.tag===13||e.tag===31){var t=yt();t=ho(t);var n=Un(e,t);n!==null&&rt(n,e,t),vs(e,t)}}var Ki=!0;function Xp(e,t,n,a){var l=A.T;A.T=null;var i=I.p;try{I.p=2,bs(e,t,n,a)}finally{I.p=i,A.T=l}}function Ip(e,t,n,a){var l=A.T;A.T=null;var i=I.p;try{I.p=8,bs(e,t,n,a)}finally{I.p=i,A.T=l}}function bs(e,t,n,a){if(Ki){var l=ws(a);if(l===null)is(e,t,a,Zi,n),rh(e,a);else if(Kp(l,e,t,n,a))a.stopPropagation();else if(rh(e,a),t&4&&-1<Qp.indexOf(e)){for(;l!==null;){var i=ta(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=Dn(i.pendingLanes);if(o!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;o;){var p=1<<31-ct(o);u.entanglements[1]|=p,o&=~p}zt(i),(xe&6)===0&&(Di=st()+500,xl(0))}}break;case 31:case 13:u=Un(i,2),u!==null&&rt(u,i,2),Ri(),vs(i,2)}if(i=ws(a),i===null&&is(e,t,a,Zi,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else is(e,t,a,null,n)}}function ws(e){return e=xo(e),Ss(e)}var Zi=null;function Ss(e){if(Zi=null,e=ea(e),e!==null){var t=h(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=v(t),e!==null)return e;e=null}else if(n===31){if(e=S(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Zi=e,null}function oh(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(kg()){case hu:return 2;case gu:return 8;case Hl:case Rg:return 32;case mu:return 268435456;default:return 32}default:return 32}}var xs=!1,Tn=null,En=null,Nn=null,Ml=new Map,Dl=new Map,Cn=[],Qp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function rh(e,t){switch(e){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":En=null;break;case"mouseover":case"mouseout":Nn=null;break;case"pointerover":case"pointerout":Ml.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Dl.delete(t.pointerId)}}function kl(e,t,n,a,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},t!==null&&(t=ta(t),t!==null&&lh(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Kp(e,t,n,a,l){switch(t){case"focusin":return Tn=kl(Tn,e,t,n,a,l),!0;case"dragenter":return En=kl(En,e,t,n,a,l),!0;case"mouseover":return Nn=kl(Nn,e,t,n,a,l),!0;case"pointerover":var i=l.pointerId;return Ml.set(i,kl(Ml.get(i)||null,e,t,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Dl.set(i,kl(Dl.get(i)||null,e,t,n,a,l)),!0}return!1}function sh(e){var t=ea(e.target);if(t!==null){var n=h(t);if(n!==null){if(t=n.tag,t===13){if(t=v(n),t!==null){e.blockedOn=t,Su(e.priority,function(){ih(n)});return}}else if(t===31){if(t=S(n),t!==null){e.blockedOn=t,Su(e.priority,function(){ih(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ji(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ws(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);So=a,n.target.dispatchEvent(a),So=null}else return t=ta(n),t!==null&&lh(t),e.blockedOn=n,!1;t.shift()}return!0}function uh(e,t,n){Ji(e)&&n.delete(t)}function Zp(){xs=!1,Tn!==null&&Ji(Tn)&&(Tn=null),En!==null&&Ji(En)&&(En=null),Nn!==null&&Ji(Nn)&&(Nn=null),Ml.forEach(uh),Dl.forEach(uh)}function Fi(e,t){e.blockedOn===t&&(e.blockedOn=null,xs||(xs=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,Zp)))}var Wi=null;function ch(e){Wi!==e&&(Wi=e,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){Wi===e&&(Wi=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],l=e[t+2];if(typeof a!="function"){if(Ss(a||n)===null)continue;break}var i=ta(n);i!==null&&(e.splice(t,3),t-=3,wr(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function ja(e){function t(p){return Fi(p,e)}Tn!==null&&Fi(Tn,e),En!==null&&Fi(En,e),Nn!==null&&Fi(Nn,e),Ml.forEach(t),Dl.forEach(t);for(var n=0;n<Cn.length;n++){var a=Cn[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)sh(n),n.blockedOn===null&&Cn.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],o=l[tt]||null;if(typeof i=="function")o||ch(n);else if(o){var u=null;if(i&&i.hasAttribute("formAction")){if(l=i,o=i[tt]||null)u=o.formAction;else if(Ss(l)!==null)continue}else u=o.action;typeof u=="function"?n[a+1]=u:(n.splice(a,3),a-=3),ch(n)}}}function dh(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return l=o})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function Ts(e){this._internalRoot=e}$i.prototype.render=Ts.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(r(409));var n=t.current,a=yt();nh(n,a,e,t,null,null)},$i.prototype.unmount=Ts.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;nh(e.current,2,null,e,null,null),Ri(),t[Pn]=null}};function $i(e){this._internalRoot=e}$i.prototype.unstable_scheduleHydration=function(e){if(e){var t=wu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Cn.length&&t!==0&&t<Cn[n].priority;n++);Cn.splice(n,0,e),n===0&&sh(e)}};var fh=c.version;if(fh!=="19.2.6")throw Error(r(527,fh,"19.2.6"));I.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(r(188)):(e=Object.keys(e).join(","),Error(r(268,e)));return e=y(t),e=e!==null?k(e):null,e=e===null?null:e.stateNode,e};var Jp={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:A,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Pi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Pi.isDisabled&&Pi.supportsFiber)try{Ga=Pi.inject(Jp),ut=Pi}catch{}}return Ol.createRoot=function(e,t){if(!d(e))throw Error(r(299));var n=!1,a="",l=vd,i=bd,o=wd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=eh(e,1,!1,null,null,n,a,null,l,i,o,dh),e[Pn]=t.current,ls(e),new Ts(t)},Ol.hydrateRoot=function(e,t,n){if(!d(e))throw Error(r(299));var a=!1,l="",i=vd,o=bd,u=wd,p=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(o=n.onCaughtError),n.onRecoverableError!==void 0&&(u=n.onRecoverableError),n.formState!==void 0&&(p=n.formState)),t=eh(e,1,!0,t,n??null,a,l,p,i,o,u,dh),t.context=th(null),n=t.current,a=yt(),a=ho(a),l=dn(a),l.callback=null,fn(n,l,a),n=a,t.current.lanes=n,qa(t,n),zt(t),e[Pn]=t.current,ls(e),new $i(t)},Ol.version="19.2.6",Ol}var xh;function o0(){if(xh)return Cs.exports;xh=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(c){console.error(c)}}return s(),Cs.exports=i0(),Cs.exports}var r0=o0();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),fg=(...s)=>s.filter((c,f,r)=>!!c&&c.trim()!==""&&r.indexOf(c)===f).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var u0={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=ue.forwardRef(({color:s="currentColor",size:c=24,strokeWidth:f=2,absoluteStrokeWidth:r,className:d="",children:h,iconNode:v,...S},m)=>ue.createElement("svg",{ref:m,...u0,width:c,height:c,stroke:s,strokeWidth:r?Number(f)*24/Number(c):f,className:fg("lucide",d),...S},[...v.map(([y,k])=>ue.createElement(y,k)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=(s,c)=>{const f=ue.forwardRef(({className:r,...d},h)=>ue.createElement(c0,{ref:h,iconNode:c,className:fg(`lucide-${s0(s)}`,r),...d}));return f.displayName=`${s}`,f};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hg=Xe("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lo=Xe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gg=Xe("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=Xe("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=Xe("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=Xe("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h0=Xe("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=Xe("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m0=Xe("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0=Xe("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y0=Xe("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v0=Xe("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b0=Xe("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w0=Xe("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S0=Xe("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x0=Xe("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T0=Xe("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E0=Xe("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N0=Xe("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=Xe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function ao({group:s,size:c="md",dim:f}){const r=c==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return g.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${s.bgClass} ${s.textClass} ${r} ${f?"opacity-40":""}`,children:s.label})}const Ha=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Th=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function pg(s){if(s.length===0)return"";const c=[...s].sort((k,R)=>k.date.localeCompare(R.date)),f=c[0].date,r=c[c.length-1].date,[d,h,v]=f.split("-").map(Number),[S,m,y]=r.split("-").map(Number);return f===r?`${Ha[h-1]} ${v}, ${d}`:d===S&&h===m?`${Ha[h-1]} ${v}–${y}, ${d}`:d===S?`${Ha[h-1]} ${v} – ${Ha[m-1]} ${y}, ${d}`:`${Ha[h-1]} ${v}, ${d} – ${Ha[m-1]} ${y}, ${S}`}function C0(s){if(s.length===0)return"";const c=[...s].sort((L,q)=>L.date.localeCompare(q.date)),f=c[0].date,r=c[c.length-1].date,[d,h,v]=f.split("-").map(Number),[S,m,y]=r.split("-").map(Number),k=Th[new Date(d,h-1,v).getDay()],R=pg(s);if(f===r)return`${R} (${k})`;const H=Th[new Date(S,m-1,y).getDay()];return`${R} (${k}–${H})`}function ou(s){return s.subtitle??pg(s.days)}function tn(s){const[c,f]=s.split(":").map(Number);return c*60+f}const A0=30;function _0(s,c){let f=-1;for(let S=0;S<s.length&&tn(s[S])<=c;S++)f=S;if(f===-1)return{index:-1,progress:0};const r=tn(s[f]),d=s[f+1]?tn(s[f+1]):null,h=d!==null?d:r+A0;if(c>=h)return{index:-1,progress:0};const v=h===r?0:(c-r)/(h-r);return{index:f,progress:Math.max(0,Math.min(1,v))}}function yg(s){const[c,f]=s.split(":").map(Number);return`${c%12||12}:${f.toString().padStart(2,"0")}`}function vg(s){const[c]=s.split(":").map(Number);return c>=12?"PM":"AM"}function ru(){const s=new Date;return s.getHours()*60+s.getMinutes()}function Fn(){const s=new Date,c=s.getFullYear(),f=String(s.getMonth()+1).padStart(2,"0"),r=String(s.getDate()).padStart(2,"0");return`${c}-${f}-${r}`}function M0(){const s=new Date,c=s.getHours(),f=s.getMinutes(),r=c%12||12,d=c>=12?"PM":"AM";return`${r}:${f.toString().padStart(2,"0")} ${d}`}function D0(s){if(s<=0)return"";if(s<60)return`${s} min`;const c=Math.floor(s/60),f=s%60;return f===0?`${c}h`:`${c}h ${f}m`}function k0(s){const c=new Date(s);if(isNaN(c.getTime()))return s;const f=c.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),r=c.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${f}, ${r}`}function Eh(s,c){return s.flatMap(f=>{const r=c.find(d=>d.id===f);return r?[r]:[]})}function R0({activity:s,runGroups:c,past:f}){const r=Eh(s.onTrack,c),d=Eh(s.inClass??[],c);return g.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${f?"opacity-60":""}`,children:g.jsxs("div",{className:"flex gap-4",children:[g.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[yg(s.time),g.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:vg(s.time)})]}),g.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[r.length>0&&g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),g.jsx("div",{className:"flex flex-wrap gap-1.5",children:r.map(h=>g.jsx(ao,{group:h},h.id))})]}),d.length>0&&g.jsxs(g.Fragment,{children:[r.length>0&&g.jsx("div",{className:"border-t border-gray-100"}),g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),g.jsx("div",{className:"flex flex-wrap gap-1.5",children:d.map(h=>g.jsx(ao,{group:h},h.id))})]})]}),s.note&&g.jsx("p",{className:"text-xs italic text-gray-500",children:s.note})]})]})})}function O0({activity:s,past:c}){const f=s.type==="lunch"||s.type==="special";return g.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${f?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${c?"opacity-60":""}`,children:g.jsxs("div",{className:"flex items-center gap-4",children:[g.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[yg(s.time),g.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:vg(s.time)})]}),f&&g.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:s.type==="lunch"?g.jsx(N0,{size:16}):g.jsx(S0,{size:16})}),g.jsxs("div",{children:[g.jsx("p",{className:"text-sm font-medium text-gray-900",children:s.label}),s.subtitle&&g.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:s.subtitle})]})]})})}const nu=ue.forwardRef(({activities:s},c)=>{const[,f]=ue.useState(0);ue.useEffect(()=>{const m=setInterval(()=>f(y=>y+1),3e4);return()=>clearInterval(m)},[]);const r=ru(),h=s.filter(m=>"time"in m).find(m=>tn(m.time)>r),v=h?tn(h.time)-r:null,S=v!==null?v<=5?"text-red-500":v<=10?"text-orange-500":"text-gray-400":"text-gray-400";return g.jsxs("div",{ref:c,"data-time-indicator":!0,className:"relative my-6",children:[g.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[g.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),g.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),g.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:M0()}),v!==null&&g.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${S}`,children:["Next activity starts in ",g.jsx("span",{className:"font-semibold",children:D0(v)})]})]})});nu.displayName="TimeIndicator";function Nh({collapsed:s,children:c}){return g.jsx("div",{"data-collapsed":s,"aria-hidden":s,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:s?"0fr":"1fr",opacity:s?0:1,marginBottom:s?0:"0.5rem"},children:g.jsx("div",{className:"overflow-hidden",children:c})})}function z0({activities:s,runGroups:c,isToday:f,selectedGroups:r,hidePast:d}){const h=ue.useRef(null),[,v]=ue.useState(0);ue.useEffect(()=>{if(!f)return;const j=setInterval(()=>v(M=>M+1),6e4);return()=>clearInterval(j)},[f]),ue.useEffect(()=>{if(!f)return;const j=setTimeout(()=>{var M;(M=h.current)==null||M.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(j)},[f]);const S=ru(),m=s.flatMap(j=>{if(j.type!=="session")return[j];if(r.length===0)return[j];const M=j.onTrack.filter(oe=>r.includes(oe)),Y=(j.inClass??[]).filter(oe=>r.includes(oe));return M.length===0&&Y.length===0?[]:[{...j,onTrack:M,inClass:Y}]}),y=m.map(j=>j.type!=="break"&&d&&f&&tn(j.time)<S);m.forEach((j,M)=>{if(j.type!=="break")return;const Y=m.slice(0,M).some((oe,V)=>oe.type!=="break"&&!y[V]);y[M]=!Y});const k=[],R=[];m.forEach((j,M)=>{j.type!=="break"&&(k.push(M),R.push(j.time))});const{index:H}=f?_0(R,S):{index:-1},L=H===-1?-1:k[H],q=f?m.findIndex(j=>j.type!=="break"&&tn(j.time)>S):-1,K=f&&q===-1&&m.length>0,ie=m.length>0&&y.every(Boolean);let U;return g.jsxs("div",{className:"flex flex-col pb-10",children:[m.length>0&&g.jsx(Nh,{collapsed:!ie,children:g.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[g.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),g.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),m.map((j,M)=>{const Y=M===L,oe=f&&j.type!=="break"&&!Y&&tn(j.time)<S;let V=null;!y[M]&&j.type==="session"&&j.sessionNumber!==void 0&&j.sessionNumber!==U&&(U=j.sessionNumber,V=g.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",j.sessionNumber]}));const B=j.type==="break"?g.jsxs("div",{className:"flex items-center gap-2 py-1",children:[g.jsx("div",{className:"h-px flex-1 bg-gray-200"}),g.jsx("span",{className:"text-xs text-gray-400 italic",children:j.label}),g.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):j.type==="session"?g.jsx(R0,{activity:j,runGroups:c,past:oe}):g.jsx(O0,{activity:j,past:oe});return g.jsxs(Nh,{collapsed:y[M],children:[M===q&&g.jsx(nu,{ref:h,activities:m}),V,B]},M)}),K&&g.jsx(nu,{ref:h,activities:m})]})}function U0({groups:s,selected:c,onChange:f}){const[r,d]=ue.useState(!1),h=m=>f(c.includes(m)?c.filter(y=>y!==m):[...c,m]),v=c.length===0||c.length===s.length,S=s.filter(m=>c.includes(m.id));return g.jsxs("div",{className:"relative",children:[g.jsxs("button",{onClick:()=>d(m=>!m),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[v?g.jsx("span",{className:"text-gray-700",children:"All run groups"}):g.jsx("div",{className:"flex items-center gap-1",children:S.map(m=>g.jsx(ao,{group:m,size:"sm"},m.id))}),g.jsx(gg,{size:14,className:"text-gray-400"})]}),r&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>d(!1)}),g.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[s.map(m=>g.jsxs("button",{onClick:()=>h(m.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[g.jsx(ao,{group:m,size:"md"}),c.includes(m.id)&&g.jsx(lo,{size:14,className:"text-blue-500"})]},m.id)),g.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:g.jsx("button",{onClick:()=>{f([]),d(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:v?"All selected":"Clear filter"})})]})]})]})}function eo(s){return s.days.reduce((c,f)=>f.date<c?f.date:c,s.days[0].date)}function Ch(s){return s.days.reduce((c,f)=>f.date>c?f.date:c,s.days[0].date)}function bg(s,c=Fn()){return s.days.some(f=>f.date===c)?"live":s.days.every(f=>f.date>c)?"upcoming":"past"}function su(s,c=Fn()){const f=[],r=[],d=[];for(const h of s){const v=bg(h,c);v==="live"?f.push(h):v==="upcoming"?r.push(h):d.push(h)}return f.sort((h,v)=>eo(h).localeCompare(eo(v))),r.sort((h,v)=>eo(h).localeCompare(eo(v))),d.sort((h,v)=>Ch(v).localeCompare(Ch(h))),{live:f,upcoming:r,past:d}}const j0="/hpde/pr-preview/pr-212/assets/msrc-3-1-C8L2cRhZ.svg",H0="/hpde/pr-preview/pr-212/assets/msrc-1-7-CT_mRfuQ.svg",L0="/hpde/pr-preview/pr-212/assets/msrc-1-3-9yXe4Q7S.svg",B0="/hpde/pr-preview/pr-212/assets/ecr-2-7-CgJhLgMd.svg",G0={"msrc-3-1":j0,"msrc-1-7":H0,"msrc-1-3":L0,"ecr-2-7":B0};function wg({trackId:s,size:c=28,muted:f=!1,className:r}){const d=s?G0[s]:void 0,h=`inline-grid shrink-0 place-items-center rounded-lg bg-gray-100 ${f?"opacity-70":""} ${r??""}`.trim(),v=c+8;return g.jsx("span",{className:h,style:{width:v,height:v},"aria-hidden":"true",children:d?g.jsx("img",{src:d,alt:"",width:c,height:c,className:"block"}):g.jsx("svg",{viewBox:"0 0 32 32",width:c,height:c,className:"block text-gray-300",fill:"none",children:g.jsx("path",{d:"M6 16 C6 9 12 5 17 6 C24 7 27 12 27 17 C27 23 22 27 15 27 C9 27 6 22 6 16 Z",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeDasharray:"3 3"})})})}function Sg(){return g.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[g.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function Ds({event:s,active:c,isLive:f,onClick:r}){return g.jsxs("button",{onClick:r,className:`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left ${c?"bg-blue-50":"hover:bg-gray-50"}`,children:[g.jsx(wg,{trackId:s.trackId,size:28}),g.jsxs("div",{className:"min-w-0 flex-1",children:[g.jsxs("div",{className:"flex items-center gap-1.5",children:[g.jsx("span",{className:"truncate text-sm font-semibold text-gray-900",children:s.name}),f&&g.jsx(Sg,{})]}),g.jsx("div",{className:"truncate text-xs text-gray-400",children:ou(s)})]}),c&&g.jsx(lo,{size:14,className:"text-blue-500 ml-1 shrink-0"})]})}function ks({label:s}){return g.jsx("div",{className:"px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400",children:s})}function Y0({events:s,active:c,onChange:f}){const[r,d]=ue.useState(!1),{live:h,upcoming:v,past:S}=su(s),m=bg(c)==="live";return g.jsxs("div",{className:"relative flex min-w-0 flex-col items-center",children:[g.jsxs("button",{onClick:()=>d(y=>!y),className:"flex max-w-full items-center gap-1 group min-w-0",children:[g.jsx("h1",{className:"truncate text-xl font-bold text-gray-900 leading-tight",children:c.name}),m&&g.jsx(Sg,{}),g.jsx(gg,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),g.jsx("p",{className:"max-w-full truncate text-center text-sm text-gray-500",children:ou(c)}),r&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>d(!1)}),g.jsxs("div",{className:"absolute left-1/2 top-full z-20 mt-2 min-w-[280px] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[h.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(ks,{label:"Live"}),h.map(y=>g.jsx(Ds,{event:y,active:y.id===c.id,isLive:!0,onClick:()=>{f(y),d(!1)}},y.id))]}),g.jsx(ks,{label:"Upcoming"}),v.length>0?v.map(y=>g.jsx(Ds,{event:y,active:y.id===c.id,isLive:!1,onClick:()=>{f(y),d(!1)}},y.id)):g.jsx("div",{className:"px-4 py-2 text-xs text-gray-400",children:"None"}),S.length>0&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"my-2 border-t border-gray-100",role:"separator"}),g.jsx(ks,{label:"Past"}),S.map(y=>g.jsx(Ds,{event:y,active:y.id===c.id,isLive:!1,onClick:()=>{f(y),d(!1)}},y.id))]})]})]})]})}const q0=[{id:"schedule",label:"Schedule"},{id:"notes",label:"My notes"},{id:"info",label:"Info"}];function V0({active:s,onChange:c}){return g.jsx("div",{role:"tablist","aria-label":"Event section",className:"flex gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm",children:q0.map(f=>{const r=f.id===s;return g.jsx("button",{role:"tab","aria-selected":r,"aria-controls":`event-tabpanel-${f.id}`,id:`event-tab-${f.id}`,onClick:()=>c(f.id),className:`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${r?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:f.label},f.id)})})}function X0(s){try{return new URL(s).hostname.replace(/^www\./,"")}catch{return s}}function I0(s){const c=s.trim().toLowerCase();return c==="clockwise"?"CW (clockwise)":c==="counter-clockwise"||c==="counterclockwise"?"CCW (counter-clockwise)":s}function Q0(s,c){return[s,c&&I0(c)].filter(Boolean).join(" ")}function zl({icon:s,label:c,subtitle:f,children:r}){return g.jsxs("div",{className:"grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[g.jsxs("span",{className:"flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(s,{size:14,className:"shrink-0 text-gray-400"}),c]}),g.jsxs("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:[r,f&&g.jsx("span",{className:"mt-0.5 block text-xs font-normal text-gray-400",children:f})]})]})}function K0({event:s}){var S;const[c,f]=ue.useState(!1),r=C0(s.days),d=Q0(s.configuration,s.direction),h=!!((S=s.scheduleScans)!=null&&S.length);return r||s.organizer||s.track||d||s.link||h||s.mapImage?g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"pl-1",children:[r&&g.jsx(zl,{icon:hg,label:"Dates",children:r}),s.organizer&&g.jsx(zl,{icon:E0,label:"Organizer",children:s.organizer}),s.track&&g.jsx(zl,{icon:v0,label:"Location",subtitle:s.city,children:s.track}),d&&g.jsx(zl,{icon:T0,label:"Track config",children:d}),s.link&&g.jsx(zl,{icon:p0,label:"Event page",children:g.jsxs("a",{href:s.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[X0(s.link),g.jsx(h0,{size:12,className:"text-gray-400"})]})})]}),s.mapImage&&g.jsxs("div",{className:"mt-6 pl-1",children:[g.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(b0,{size:14,className:"shrink-0 text-gray-400"}),"Track map"]}),g.jsxs("button",{type:"button",onClick:()=>f(!0),"aria-label":"Expand track map",className:"group relative block w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:[g.jsx("img",{src:s.mapImage,alt:`${s.name} track map`,className:"block w-full h-auto"}),g.jsx("span",{className:"absolute right-2 top-2 inline-grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors group-hover:bg-black/70",children:g.jsx(w0,{size:16})})]})]}),h&&g.jsxs("div",{className:"mt-6 pl-1",children:[g.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(m0,{size:14,className:"shrink-0 text-gray-400"}),"Original schedule"]}),g.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:s.scheduleScans.map((m,y)=>g.jsx("a",{href:m,target:"_blank",rel:"noopener noreferrer",children:g.jsx("img",{src:m,alt:`Original schedule scan ${y+1}`,className:"aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"})},m))})]}),c&&s.mapImage&&g.jsxs("div",{role:"dialog","aria-modal":"true","aria-label":`${s.name} track map`,onClick:()=>f(!1),className:"fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4",children:[g.jsx("button",{onClick:()=>f(!1),"aria-label":"Close map",className:"absolute right-4 top-4 inline-grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",children:g.jsx(iu,{size:20})}),g.jsx("img",{src:s.mapImage,alt:`${s.name} track map`,className:"max-h-full max-w-full rounded-lg object-contain"})]})]}):g.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})}function Z0({checked:s,onChange:c,label:f}){return g.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[f&&g.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:f}),g.jsx("button",{type:"button",role:"switch","aria-checked":s,onClick:c,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:s?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:g.jsx("span",{style:{position:"absolute",top:"2px",left:s?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Zn=72,J0=110;function Ah({children:s,disabled:c,scrollContainerRef:f}){const[r,d]=ue.useState(0),[h,v]=ue.useState("idle"),S=ue.useRef(null),m=ue.useRef(0);ue.useEffect(()=>{if(c)return;const H=()=>{const ie=f==null?void 0:f.current;return ie?ie.scrollTop:window.scrollY},L=ie=>{H()===0&&(S.current=ie.touches[0].clientY)},q=ie=>{if(S.current===null)return;const U=ie.touches[0].clientY-S.current;if(U<=0){S.current=null;return}ie.preventDefault();const j=U<Zn?U:Zn+(U-Zn)*.25;m.current=Math.min(j,J0),d(m.current),v("pulling")},K=()=>{S.current!==null&&(S.current=null,m.current>=Zn?(v("refreshing"),d(Zn*.75),setTimeout(()=>window.location.reload(),600)):(v("releasing"),d(0),m.current=0,setTimeout(()=>v("idle"),250)))};return document.addEventListener("touchstart",L,{passive:!0}),document.addEventListener("touchmove",q,{passive:!1}),document.addEventListener("touchend",K),document.addEventListener("touchcancel",K),()=>{document.removeEventListener("touchstart",L),document.removeEventListener("touchmove",q),document.removeEventListener("touchend",K),document.removeEventListener("touchcancel",K)}},[c,f]);const y=h==="releasing"||h==="refreshing",k=Math.min(r/Zn,1),R=r>=Zn;return g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${r}px)`,transition:y?"transform 0.25s ease":"none"},children:g.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${R?"text-blue-500":"text-gray-400"}`,children:g.jsx(x0,{size:16,className:h==="refreshing"?"animate-spin":"",style:h!=="refreshing"?{transform:`rotate(${k*270}deg)`}:void 0})})}),g.jsx("div",{style:{transform:`translateY(${r}px)`,transition:y?"transform 0.25s ease":"none"},children:s})]})}function F0({groups:s}){const c=s.filter(f=>f.description);return c.length===0?null:g.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[g.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),g.jsx("ul",{className:"flex flex-col gap-1.5",children:c.map(f=>g.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[g.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${f.bgClass}`,"aria-hidden":"true"}),g.jsx("span",{className:"font-medium text-gray-900",children:f.label}),g.jsx("span",{className:"text-gray-400",children:"·"}),g.jsx("span",{children:f.description})]},f.id))})]})}const _h=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
// Source: https://github.com/inko9nito/hpde/blob/main/scripts/hpde-widget.js
// Data:   https://inko9nito.github.io/hpde/api/events.json
//
// Setup: install Scriptable → paste this script → long-press Home Screen →
//   Add Widget → Scriptable → Medium → Edit Widget → Script = this script.
// Optional Parameter: comma-separated run group ids and an optional lead
//   time as \`Nm\`, split by \`|\` for readability. Examples:
//     orange,blue          — filter to orange + blue, default 10-min lead
//     orange,blue|15m      — same filter, 15-min lead
//     15m                  — no filter, 15-min lead
//     (blank)              — no filter, default 10-min lead
//     test                 — debug flag: show the Test Event as today's
//                            event so a notification-schedule end-to-end
//                            can be verified even without a real HPDE
//                            today. Combine with anything else, e.g.
//                            \`test,orange|10m\`.
//     test-upcoming        — debug flag: show the Test Event as a FUTURE
//                            event instead, to exercise the no-event-
//                            today countdown card. Defaults to 10 days
//                            out (past the single-day/week:day split);
//                            \`test-upcoming-3\` picks a different count.
//   Run-group filtering also drives notifications: sessions in the filtered
//   groups are alerted N minutes before start; all-drivers events (anything
//   without a run-group tag — meetings, lunch, etc.) always fire an alert.

const DATA_URL = "https://inko9nito.github.io/hpde/api/events.json"
const SITE_URL = "https://inko9nito.github.io/hpde/"
const CACHE_FILENAME = "hpde-events.json"
const NOTIF_STATE_FILENAME = "hpde-notif-state.json"
const NOTIF_ID_PREFIX = "hpde:"
const NOTIF_THREAD_ID = "hpde"
const DEFAULT_LEAD_MIN = 10
// Instance entries in the shared state file age out after this many days
// without a widget refresh, so a widget instance that was removed stops
// contributing its filter/lead to the merged notification set.
const NOTIF_STALE_INSTANCE_DAYS = 3
// iOS caps pending notifications per app at 64; leave headroom under that
// so the widget's own alerts don't crowd out anything else Scriptable
// might schedule.
const NOTIF_MAX_PENDING = 60
// A same-group session immediately after an on-track slot only counts as
// a "follows" hint if it starts within this many minutes.
const NOTIF_FOLLOW_WINDOW_MIN = 60

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

// Standing fixture events (test-live) ship in the manifest at their
// natural date (Jan 1 2000) so real users never see them as today's
// event. Rewriting them to "today" (or to a future date, for testing
// the no-event-today countdown card) is opt-in via the \`test\` /
// \`test-upcoming\` flags on the widget parameter — the widget calls
// this only when the user asks for it.
const FIXTURE_EVENT_IDS = new Set(["test-live"])
// Past 6 days out the countdown card switches from a single day count
// to a week:day split, so the default here exercises that split
// without the user having to pick a number.
const TEST_UPCOMING_DEFAULT_DAYS = 10
// The fixture ships 3 days (see test-live.md) purely so \`test-upcoming\`
// has more than one future day to work with — spreading them a week
// apart lets one \`test-upcoming[-N]\` flag exercise the countdown
// card's 2-card stack on Large AND the "N more upcoming" footer,
// without a separate flag for each.
const TEST_UPCOMING_SPREAD_DAYS = 7
const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
function weekdayLabel(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  return WEEKDAY_NAMES[new Date(y, m - 1, d).getDay()]
}

function rewriteFixtures(manifest, mode, upcomingDays, upcomingCount) {
  if (!manifest || !Array.isArray(manifest.events)) return manifest
  for (const event of manifest.events) {
    if (!event || !FIXTURE_EVENT_IDS.has(event.id)) continue
    const days = (event.days || []).filter(day => day && typeof day === "object")
    if (mode === "upcoming") {
      const base = upcomingDays || TEST_UPCOMING_DEFAULT_DAYS
      // Default to using every fixture day; \`test-upcoming-count-<N>\`
      // clamps that down (to as low as 0) so fewer of them get pushed
      // into the future — the rest stay on their inert placeholder
      // dates and never count as "upcoming" at all.
      const count = upcomingCount == null ? days.length : Math.max(0, Math.min(upcomingCount, days.length))
      days.forEach((day, i) => {
        if (i >= count) return
        const iso = futureIso(base + i * TEST_UPCOMING_SPREAD_DAYS)
        day.date = iso
        // The fixture's first day is authored as "## Today | 2000-01-01",
        // so its label is the literal string "Today" — accurate for the
        // \`test\` flag (rewritten to today) but confusing here, where
        // "Today" would read as a contradiction on a future-dated card.
        // Real events always label a day by its weekday name, never
        // "Today", so rewrite the label to match on every fixture day.
        day.label = weekdayLabel(iso)
      })
    } else {
      const iso = todayIso()
      const label = weekdayLabel(iso)
      for (const day of days) {
        day.date = iso
        day.label = label
      }
    }
  }
  return manifest
}

// ---------- date + time helpers ----------

function todayIso() {
  return isoFor(new Date())
}

function futureIso(daysAhead) {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  return isoFor(d)
}

function isoFor(d) {
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

// Every future day across every event, soonest first, plus how many
// there are in total — \`limit\` only trims how many come back in
// \`items\`, so the caller can still show "N more upcoming" for the rest.
function pickUpcoming(manifest, limit) {
  const iso = todayIso()
  const future = []
  for (const event of manifest.events) {
    for (const day of event.days) {
      if (day.date > iso) future.push({ event, day })
    }
  }
  future.sort((a, b) => a.day.date.localeCompare(b.day.date))
  return { items: future.slice(0, limit), total: future.length }
}

// Reserved parameter tokens that aren't run-group ids: they flip debug
// switches instead. Keep this small — every keyword here excludes a
// potential future run-group id.
const RESERVED_FLAG_TOKENS = new Set(["test"])
// \`test-upcoming\` rewrites the Test Event to FUTURE date(s) instead of
// today, for exercising the no-event-today countdown card. Two
// optional numeric parts, hyphen required before each:
//   test-upcoming            → default count (every fixture day) and
//                               default day offset (10 days out)
//   test-upcoming-<count>    → how many upcoming events to have (0-3;
//                               see FIXTURE_EVENT_IDS' day count)
//   test-upcoming-<days>d    → which day offset the first one lands on
//   test-upcoming-<count>-<days>d → both, e.g. test-upcoming-3-2d is
//                               "3 upcoming events, the first one 2
//                               days out"
// The trailing \`d\` is what disambiguates a day offset from a count —
// without it (or without the leading hyphen), the token doesn't match
// and falls through to the invalid-parameter footer instead of being
// silently misread.
const TEST_UPCOMING_RE = /^test-upcoming(?:-(\\d+))?(?:-(\\d+)d)?$/i

// Parse the widget's optional user parameter into a filter list plus a lead
// time for notifications and a debug-flag set. Format is \`<groups>|<Nm>\`;
// either half is optional. Any comma-separated token matching \`\\d+m\`
// (case-insensitive) is treated as the lead time even if the user forgot
// the pipe (\`10m\` alone or \`orange,10m\` both work). A reserved flag token
// (e.g. \`test\`, \`test-upcoming\`) is recorded in \`flags\` and skips the
// group list. Anything else is a group id — unknown group ids get sifted
// into \`invalid\` later, once we have a manifest to check against.
function parseWidgetParameter(raw) {
  const source = String(raw == null ? "" : raw).trim()
  const groups = []
  const flags = {}
  let leadMinutes = DEFAULT_LEAD_MIN
  const invalidLead = []
  if (source) {
    for (const chunk of source.split("|")) {
      for (const t of chunk.split(",")) {
        const tok = t.trim()
        if (!tok) continue
        const m = tok.match(/^(\\d+)\\s*m$/i)
        const upcomingMatch = tok.match(TEST_UPCOMING_RE)
        if (m) {
          const n = parseInt(m[1], 10)
          if (n >= 0 && n <= 24 * 60) leadMinutes = n
          else invalidLead.push(tok)
        } else if (upcomingMatch) {
          flags["test-upcoming"] = true
          if (upcomingMatch[1]) flags.testUpcomingCount = parseInt(upcomingMatch[1], 10)
          if (upcomingMatch[2]) flags.testUpcomingDays = parseInt(upcomingMatch[2], 10)
        } else if (RESERVED_FLAG_TOKENS.has(tok.toLowerCase())) {
          flags[tok.toLowerCase()] = true
        } else {
          groups.push(tok)
        }
      }
    }
  }
  return { rawParam: source, groups, leadMinutes, flags, invalid: invalidLead }
}

function readWidgetParameter() {
  const raw = typeof args !== "undefined" && args.widgetParameter
  return parseWidgetParameter(raw)
}

// Validates group ids against a manifest's known run groups; unknown ids
// are moved into \`invalid\` for the widget footer. Mutates and returns the
// parsed object.
function validateWidgetParameter(parsed, manifest) {
  const known = new Set()
  for (const event of (manifest && manifest.events) || []) {
    for (const g of event.runGroups || []) known.add(g.id)
  }
  const kept = []
  for (const gid of parsed.groups) {
    if (known.has(gid)) kept.push(gid)
    else parsed.invalid.push(gid)
  }
  parsed.groups = kept
  return parsed
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

// ---------- design guardrails ----------
//
// This widget hand-rolls what WidgetKit gives native widgets for free
// (auto content margins, container-relative corner radius, Dynamic
// Type). Nothing here enforces these automatically, so they're written
// down as rules instead — and where possible, as a single shared
// constant/table so a layout function structurally CAN'T drift from
// its siblings the way the header/card margin and Small-truncation
// bugs did:
//
//   1. Color: every color a layout function uses comes from the \`p\`
//      palette (or a shared semantic constant like WARN_COLOR below)
//      — never a fresh \`new Color("#hex")\` inline. The palette is what
//      makes light/dark mode and any future re-tint (Smart Stack,
//      monochrome Home Screen) a one-place change instead of a hunt
//      through every draw function. (Exceptions: urgencyColor's
//      reds/oranges are genuinely data-driven, not a layout choice;
//      pill text and run-group colors come from event data, not the
//      palette.)
//   2. No borders. A stroked edge around a card interrupts the
//      now-marker line where it crosses a card, and the HIG's own
//      guidance is that the system container already separates a
//      widget from the wallpaper — cards distinguish themselves by
//      background tint alone.
//   3. No shadows. Widgets render flat next to system widgets; no
//      drop shadow / elevation effect anywhere in this file.
//   4. Size-dependent values (font, spacing, radius per small/medium/
//      large tier) are looked up from one table per view, never
//      hand-tuned per property in each function — see COUNTDOWN_TOKENS
//      below for the pattern.
const WARN_COLOR = new Color("#ef4444")

function urgencyColor(min, p) {
  if (min <= 5) return WARN_COLOR
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

function makeWidget({ manifest, stale }, parsed, notifStatus) {
  const w = new ListWidget()
  const dark = Device.isUsingDarkAppearance()
  const p = palette(dark)
  w.backgroundColor = p.bg
  w.setPadding(10, WIDGET_SIDE_PAD_LEFT, 10, WIDGET_SIDE_PAD_RIGHT)
  w.url = SITE_URL

  const picked = pickToday(manifest)
  if (!picked) {
    // Medium only has room for one countdown card; Large can stack two.
    const family = config.widgetFamily || "medium"
    const isLarge = family === "large" || family === "extraLarge"
    const upcoming = pickUpcoming(manifest, isLarge ? 2 : 1)
    renderNoEvents(w, p, stale, upcoming)
    drawStatusFooter(w, p, stale, parsed, notifStatus)
    w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000)
    return w
  }

  const { event, day } = picked
  const groupById = Object.fromEntries(event.runGroups.map(g => [g.id, g]))
  const selected = (parsed && parsed.groups) || []

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
  drawStatusFooter(w, p, stale, parsed, notifStatus)

  w.refreshAfterDate = new Date(Date.now() + 60 * 1000)
  return w
}

// Shared with the countdown card's height math (see renderCountdownState)
// so it can reserve space for this footer only when it's actually
// going to render something, instead of always leaving a blank gap.
function statusFooterBits(stale, parsed, notifStatus) {
  const bits = []
  if (notifStatus && notifStatus.denied) {
    bits.push({ text: "🔕 Notifications off", warn: true })
  }
  if (stale) bits.push({ text: "Cached schedule", warn: false })
  const invalid = (parsed && parsed.invalid) || []
  if (invalid.length > 0) {
    const label = invalid.length === 1 ? "Invalid parameter" : "Invalid parameters"
    bits.push({ text: \`⚠ \${label}: \${invalid.join(", ")}\`, warn: true })
  }
  return bits
}

function drawStatusFooter(w, p, stale, parsed, notifStatus) {
  const bits = statusFooterBits(stale, parsed, notifStatus)
  if (bits.length === 0) return
  w.addSpacer(2)
  const row = w.addStack()
  row.centerAlignContent()
  row.addSpacer()
  for (let i = 0; i < bits.length; i++) {
    if (i > 0) {
      const dot = row.addText(" · ")
      dot.font = rFont(9)
      dot.textColor = p.muted
    }
    const el = row.addText(bits[i].text)
    el.font = rFont(9)
    el.textColor = bits[i].warn ? WARN_COLOR : p.muted
  }
  row.addSpacer()
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

// Same "N more ___" convention as drawMoreActivitiesFooter, for
// upcoming events that didn't fit in the countdown card(s) — flanked
// by divider lines instead of just centered, matching the design's
// "line – text – line" treatment.
function drawMoreUpcomingFooter(w, p, count) {
  const row = w.addStack()
  row.centerAlignContent()
  row.spacing = 10
  addFooterDividerLine(row, p)
  const text = row.addText(\`\${count} more upcoming event\${count === 1 ? "" : "s"}\`)
  text.font = rFont(11)
  text.textColor = p.muted
  text.lineLimit = 1
  addFooterDividerLine(row, p)
}

// Dynamic-stretch divider line — same trick as addRowDivider: a
// horizontal stack whose only content is a flex spacer expands to
// fill its share of the parent row's remaining width. Two of these
// on either side of drawMoreUpcomingFooter's text split that width
// evenly, so the line reaches equally far on both sides.
function addFooterDividerLine(row, p) {
  const line = row.addStack()
  line.backgroundColor = p.divider
  line.size = new Size(0, 1)
  line.addSpacer()
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
  leftGutter.topAlignContent()
  leftGutter.size = new Size(LEFT_GUTTER_WIDTH, 0)

  const cardContainer = outerRow.addStack()

  const rightGutter = outerRow.addStack()
  rightGutter.layoutVertically()
  rightGutter.topAlignContent()
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
  cardContainer.topAlignContent()
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
    container.topAlignContent()
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
      // A VStack's real default cross-axis alignment is CENTER, not
      // leading — the "On track" and "In class" rows only look
      // left-aligned by coincidence when they happen to render the
      // same width (same pill count/label length); an explicit call
      // is required, not a comment claiming a default that isn't real.
      infoBlock.topAlignContent()

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
  ampmBox.topAlignContent()
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
  // grows only to its natural width (label col + pills); the caller's
  // infoBlock.topAlignContent() (buildMainContent) is what actually
  // keeps this row left-aligned against its sibling — a VStack's real
  // default cross-axis alignment is center, not leading.
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

function renderNoEvents(w, p, stale, upcoming) {
  if (!upcoming || upcoming.items.length === 0) {
    renderZeroState(w, p)
    return
  }
  renderCountdownState(w, p, upcoming)
}

// True zero state — nothing scheduled today AND no future event either.
// Uses the SAME countdown-view header (\`renderUpcomingHeader\`) as the
// populated countdown, so this state reads as part of the same view
// instead of a separate "HPDE" screen — Small says "Next HPDE",
// Medium says "Upcoming HPDE events", Large gets the badge + subtitle.
// Message centers in whatever height is left below the header,
// matching the AA/Podcasts/Umami-style empty states this was designed
// against.
function renderZeroState(w, p) {
  const family = config.widgetFamily || "medium"
  renderUpcomingHeader(w, p, family)

  // Center the message vertically in the interior below the header:
  // one flex spacer above, one flex spacer below, message in the
  // middle. Horizontally centered inside its own row via left+right
  // flex spacers, since there's no card underneath to line it up with.
  w.addSpacer()
  const row = w.addStack()
  row.addSpacer()
  const msg = row.addText("No upcoming events")
  msg.font = rFont(family === "small" ? 12 : 14)
  msg.textColor = p.muted
  msg.lineLimit = 1
  row.addSpacer()
  w.addSpacer()
}

// "Clockwise" -> "CW (clockwise)", "Counter-clockwise" -> "CCW
// (counter-clockwise)" — mirrors the web app's abbreviateDirection so
// the widget and the event-details drawer read the same way.
function abbreviateDirection(direction) {
  const normalized = direction.trim().toLowerCase()
  if (normalized === "clockwise") return "CW (clockwise)"
  if (normalized === "counter-clockwise" || normalized === "counterclockwise") return "CCW (counter-clockwise)"
  return direction
}

function formatTrackConfig(configuration, direction) {
  return [configuration, direction ? abbreviateDirection(direction) : null].filter(Boolean).join(" ")
}

function pluralize(n, word) {
  return n === 1 ? word : \`\${word}s\`
}

// Whole days between today and the given ISO date (always positive
// here — pickUpcoming only returns days strictly after today).
function daysUntil(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  const target = new Date(y, m - 1, d)
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.round((target - todayStart) / (24 * 60 * 60 * 1000))
}

// Days-only countdown — a single big number reads as one clean unit
// on-device instead of "1 WEEK · 3 DAYS" where the eye has to do the
// arithmetic. We kept the split for a while because "10 days" is
// arguably less intuitive than "1 week 3 days," but the two-column
// display was crowding the well and the well kept encroaching on the
// info column; a single number frees up horizontal space and reads
// as one glance.
function countdownParts(days) {
  return { days }
}

// There's no event today, but a future one is scheduled — show a
// countdown instead of a plain "Next: <name>" line. Info (name, date,
// organizer, location, track config) on the left, same field order as
// the event-details drawer; the countdown "well" on the right.
const COUNTDOWN_CARD_GAP = 10

// ----- countdown/upcoming-events design tokens -----
//
// Every element in this view (header, cards, wells, info rows, the
// count units) shares ONE tier table instead of each function hand-
// tuning its own font/spacing/margin per size. That's a structural
// fix, not just a style preference: the #180 follow-up bugs (header
// misaligned from the cards below it, Small's text truncating, Small
// showing a footer it has no room for) were each one function using a
// number its sibling functions didn't — a shared table makes that
// class of bug impossible to reintroduce by construction, because
// there's only one place to change a tier's spacing and everything
// reading that tier picks it up.
//
// Tiers, in increasing available space:
//   small   — the Small widget family. Card is vertical (well drops
//             below the info rows instead of beside them), so it's
//             the tightest tier by far.
//   regular — Medium, and Large when it's stacking 2+ cards (halved
//             vertical budget per card).
//   rich    — Large showing exactly one card: full four-row detail,
//             the tier with room to spare.
//
// Shared (non-tiered) geometry:
const COUNTDOWN_MARGIN = 8       // outer left/right margin — header AND cards
const COUNTDOWN_CARD_RADIUS = 20
const COUNTDOWN_WELL_RADIUS = 16
const COUNTDOWN_BADGE_RADIUS = 12
const COUNTDOWN_BADGE_SIZE = 40  // Large header icon badge, square

// \`rowSpacing\` (between one info row and the next) and \`rowIconGap\`
// (between a row's own icon and its text) look like they should be
// the same number and aren't — they happen to converge at the rich
// tier (8/8) but diverge at small (4 vs 5) and regular (5 vs 6). They
// were kept as separate keys deliberately after a first pass at this
// table collapsed them into one and silently widened the between-row
// gap by 1pt on small/regular — exactly the kind of drift this table
// exists to prevent, caught only by re-diffing against the pre-
// refactor ternaries rather than by any test.
// \`wellGap\` (the gap before the well in the side-by-side, non-Small
// layout) is never actually read on the small tier — drawCountdownCard
// takes a different branch there (well drops BELOW the rows, see
// isSmall in drawCountdownCard) — but it still gets a real value
// instead of being left undefined, so this table stays the one place
// every countdown-view number lives, with no exceptions carved out.
// \`infoColW\` on non-Small tiers is an explicit width applied to the
// INFO COLUMN (title + rows), not the well — see infoCol.size's
// comment in drawCountdownCard for why it's on this side. It's
// computed as: card interior width - wellGap - a reserved budget for
// the well's own natural width (padding + "DAYS AWAY", the widest
// realistic well content). Card interior = family width -
// 2*COUNTDOWN_MARGIN - 2*cardPad.
const COUNTDOWN_TOKENS = {
  // Small has no \`cardPad\` — it has no card container at all (see
  // drawCountdownCard). Its \`infoColW\` is 0/unused — Small uses
  // drawSmallInfoBlock, a separate widget-level row with no side-by-
  // side well to budget around.
  small: {
    titleFont: 14, rowGap: 4, rowSpacing: 4, rowIconGap: 5, rowFont: 10, rowIconSize: 11,
    wellPadV: 5, wellPadH: 8, unitFont: 18, unitLabelFont: 6, wellGap: 12, preWellGap: 2, infoColW: 0,
  },
  regular: {
    // wellPadV: 14 brings the well's rendered height close to the
    // info column's (2-3 rows at rowFont 11), so both fill the card
    // top-to-bottom instead of the well floating with tinted margin
    // below it.
    // infoColW: 228 — Medium/Large-stacked card interior is 332pt
    // (364 - 16 - 16). Reserving ~92pt for the well (padding +
    // "DAYS AWAY" at unitLabelFont 8) plus 12pt wellGap leaves 228pt
    // for the info column.
    cardPad: 8, titleFont: 15, rowGap: 6, rowSpacing: 5, rowIconGap: 6, rowFont: 11, rowIconSize: 12,
    wellPadV: 14, wellPadH: 10, unitFont: 26, unitLabelFont: 8, wellGap: 12, preWellGap: 4, infoColW: 228,
  },
  rich: {
    // cardPad: 18 gives Large's tinted card the generous internal
    // frame it needs; wellPadV: 24 pads the well vertically to
    // match the info column's ~96pt height, so the two sides of the
    // side-by-side card read as one balanced unit.
    // infoColW: 172 — Large rich card interior is 312pt (364 - 16 -
    // 36). Reserving ~108pt for the well (padding + "DAYS AWAY" at
    // unitLabelFont 10) plus 32pt wellGap leaves 172pt for the info
    // column, comfortably fitting the full "Test Raceway, Testville,
    // TX" location row.
    cardPad: 18, titleFont: 18, rowGap: 10, rowSpacing: 8, rowIconGap: 8, rowFont: 13, rowIconSize: 14,
    wellPadV: 24, wellPadH: 16, unitFont: 40, unitLabelFont: 10, wellGap: 32, preWellGap: 4, infoColW: 172,
  },
}

function countdownTier(rich, isSmall) {
  return isSmall ? "small" : rich ? "rich" : "regular"
}

// ----- upcoming-events header -----
//
// The countdown state (unlike the populated today view) had no header
// at all — cards started right at the widget's top edge. This adds
// one: an icon-badge + stacked title/subtitle on Large (room for
// both), and a single compact title+icon row on Medium/Small where
// there isn't room for a subtitle without crowding the card below it.
const UPCOMING_HEADER_ICON = "flag.checkered"
const UPCOMING_HEADER_BADGE_ICON_SIZE = 20
const UPCOMING_HEADER_COMPACT_ICON_SIZE = 16

// Header sizing per family — a THIRD tiering, separate from
// COUNTDOWN_TOKENS' small/regular/rich: the header only cares whether
// it's Large (badge + subtitle style) or compact (single row), and
// then, among compact, whether it's Small — which gets a noticeably
// tighter gap below it, since Small's card (see COUNTDOWN_TOKENS.small
// below) has the least vertical budget to spare of any tier.
// Header sizing per family. \`topPad\` is a small extra top clearance
// ADDED to the widget's own root 10pt setPadding — the countdown
// view's title ("Upcoming HPDE events" on Medium/Large, "Next HPDE"
// on Small) sat visibly too close to the widget's top edge at just
// 10pt on-device, especially on Large where the 18pt bold title
// crowds the rounded top corner. This adds a per-family top pad
// spacer BEFORE the header, so header→card spacing (still \`gap\`)
// isn't affected — only the gap ABOVE the header grows.
// \`gap\` is the trailing gap between the header and whatever renders
// below it (the first card, or the "No upcoming events" message
// in the zero state).
const UPCOMING_HEADER_TOKENS = {
  large: { topPad: 6, gap: 16 },
  medium: { topPad: 4, gap: 10 },
  small: { topPad: 2, gap: 6 },
}

function upcomingHeaderTier(family) {
  if (family === "large" || family === "extraLarge") return "large"
  if (family === "small") return "small"
  return "medium"
}

function addUpcomingHeaderIcon(row, p, size) {
  if (typeof SFSymbol === "undefined") return
  const sym = SFSymbol.named(UPCOMING_HEADER_ICON)
  if (!sym) return
  const img = row.addImage(sym.image)
  img.imageSize = new Size(size, size)
  img.tintColor = p.accent
}

// Wraps the header row in the same left/right margin the countdown
// cards use (COUNTDOWN_MARGIN — the SAME constant, not a copy) so the
// header's text/icon structurally can't drift out of alignment with
// the card edges below it, instead of sitting flush against the
// widget's own (much thinner, right-0) padding tuned for the
// populated today view's marker gutters. Without this the header icon
// had no clearance from the widget's right edge and overlapped the
// rounded corner.
function renderUpcomingHeader(w, p, family) {
  const isLarge = family === "large" || family === "extraLarge"
  const h = UPCOMING_HEADER_TOKENS[upcomingHeaderTier(family)]
  if (h.topPad > 0) w.addSpacer(h.topPad)
  const outer = w.addStack()
  outer.addSpacer(COUNTDOWN_MARGIN)
  const row = outer.addStack()
  row.centerAlignContent()

  if (isLarge) {
    row.spacing = 12

    const badge = row.addStack()
    badge.size = new Size(COUNTDOWN_BADGE_SIZE, COUNTDOWN_BADGE_SIZE)
    badge.backgroundColor = p.currentCardBg
    badge.cornerRadius = COUNTDOWN_BADGE_RADIUS
    // centerAlignContent() only sets the CROSS-axis alignment (matches
    // SwiftUI's HStack \`alignment:\` parameter, which is cross-axis
    // only) — it centers the icon vertically, but leaves it packed at
    // the leading edge on the main (horizontal) axis, same as any
    // other lone child with no spacers. Wrapping it in a leading +
    // trailing flex spacer is the same "well" pattern used elsewhere
    // in this file to center content inside a fixed box on both axes.
    badge.centerAlignContent()
    badge.addSpacer()
    addUpcomingHeaderIcon(badge, p, UPCOMING_HEADER_BADGE_ICON_SIZE)
    badge.addSpacer()

    const col = row.addStack()
    col.layoutVertically()
    // A VStack's real default cross-axis alignment is center, not
    // leading — without this, "Track days ahead" (narrower) rendered
    // centered under "Upcoming HPDE events" (wider) instead of flush
    // with its left edge.
    col.topAlignContent()
    const title = col.addText("Upcoming HPDE events")
    // 18, not 20 — at 20pt bold this specific string leaves almost no
    // right-edge clearance after the badge (the trailing flex spacer
    // is present and correctly plumbed, there's just very little space
    // left for it to consume once the text itself is that wide), while
    // every other margin in this view is a comfortable, consistent
    // COUNTDOWN_MARGIN. A couple points buys real breathing room here
    // instead of leaving it dependent on this exact string's length.
    title.font = rBoldFont(18)
    title.textColor = p.fg
    title.lineLimit = 1
    col.addSpacer(2)
    const subtitle = col.addText("Track days ahead")
    subtitle.font = rFont(13)
    subtitle.textColor = p.muted
    subtitle.lineLimit = 1

    row.addSpacer()
  } else {
    const title = row.addText(family === "small" ? "Next HPDE" : "Upcoming HPDE events")
    title.font = rMediumFont(13)
    title.textColor = p.fg
    title.lineLimit = 1
    row.addSpacer()
    addUpcomingHeaderIcon(row, p, UPCOMING_HEADER_COMPACT_ICON_SIZE)
  }

  outer.addSpacer(COUNTDOWN_MARGIN)
  w.addSpacer(h.gap)
}

// One or two countdown cards (Medium always gets one; Large can stack
// two), plus a "N more upcoming" footer for whatever didn't fit —
// same convention as drawMoreActivitiesFooter for a day's activities.
function renderCountdownState(w, p, upcoming) {
  const { items, total } = upcoming
  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"
  // Small's card is already fighting its vertical budget just to fit
  // the title + 2 rows + full-width well (see drawCountdownCard) — a
  // "more upcoming" footer on top of that both starves the card of
  // height and isn't something Small has room to show usefully, so it
  // never renders one regardless of how many events are left over.
  const isSmall = family === "small"
  const remaining = total - items.length
  const showMoreFooter = remaining > 0 && !isSmall

  renderUpcomingHeader(w, p, family)

  // A single upcoming event still gets the full rich card (all four
  // info rows) even on Large — only stacking a second card forces both
  // into the denser (Medium-style, two-row) layout to fit the halved
  // vertical budget.
  const rich = isLarge && items.length === 1

  // Cards used to be forced to an explicit computed height (dividing
  // whatever was left of the interior budget evenly between them), on
  // the theory that a content-sized card would leave "dead white space"
  // below it. In practice that was backwards: a card's own content is
  // shorter than that computed height on Medium and especially on
  // Large's rich (single-event) layout, and centerAlignContent()
  // centered the short content INSIDE the oversized fixed-height box —
  // which is exactly the "inconsistent, wonky padding" bug (uneven gaps
  // above/below the rows, looking different from the header-to-card gap
  // right above it, for no visible reason). Letting each card size to
  // its own content + cardPad, with any real leftover space collecting
  // as a single flex spacer at the very end instead, fixes this at the
  // root instead of tuning the numbers that produced it.
  for (let i = 0; i < items.length; i++) {
    if (i > 0) w.addSpacer(COUNTDOWN_CARD_GAP)
    drawCountdownCard(w, p, items[i], rich, family)
  }

  if (showMoreFooter) {
    w.addSpacer(6)
    drawMoreUpcomingFooter(w, p, remaining)
  }
  // Small's own drawCountdownCard already put a widget-level flex
  // spacer between its info block and its well (that's how the well
  // pins to the bottom of the widget); adding a SECOND flex spacer
  // here would split the remaining height between the two and let
  // the well drift up to the middle instead. Only Medium/Large need
  // this trailing spacer, to collect any real leftover height at the
  // very bottom instead of stretching the card up top.
  if (!isSmall) w.addSpacer()
}

function drawCountdownCard(w, p, next, rich, family) {
  // Small has no room to put the well beside the info column (see
  // Next-HPDE mockup: even 2 info rows already fill the card's width) —
  // the well drops below the rows instead and stretches full-width.
  const isSmall = family === "small"
  const t = COUNTDOWN_TOKENS[countdownTier(rich, isSmall)]

  // Small doesn't wrap in a card container at all. The info-rows
  // block and the well render as separate widget-level rows with the
  // same COUNTDOWN_MARGIN inset, with a WIDGET-LEVEL flex spacer
  // between them so the well pins to the bottom of the widget's
  // remaining vertical space instead of piling up right under the
  // rows and leaving a big empty pocket below (which is what the
  // on-device Small screenshot showed). A flex spacer INSIDE the
  // outer-row wrapper wouldn't cascade — a row's spacer distributes
  // horizontally, not vertically — so this needs two sibling
  // widget-level rows, not one.
  if (isSmall) {
    drawSmallInfoBlock(w, p, next, t)
    w.addSpacer()
    const wellOuter = w.addStack()
    wellOuter.addSpacer(COUNTDOWN_MARGIN)
    drawCountdownWell(wellOuter, next, p, t, true)
    wellOuter.addSpacer(COUNTDOWN_MARGIN)
    return
  }

  const outer = w.addStack()
  outer.addSpacer(COUNTDOWN_MARGIN)

  const card = outer.addStack()
  card.centerAlignContent()
  card.backgroundColor = p.cardBg
  card.cornerRadius = COUNTDOWN_CARD_RADIUS
  card.setPadding(t.cardPad, t.cardPad, t.cardPad, t.cardPad)

  const infoCol = card.addStack()
  infoCol.layoutVertically()
  // A VStack's real default cross-axis alignment is center — without
  // this, the title and each info row (usually different widths) would
  // center relative to each other instead of sharing a left edge.
  infoCol.topAlignContent()
  // Explicit width, computed as the card interior minus the well's
  // reserved budget (see t.infoColW comment at COUNTDOWN_TOKENS).
  // Gives every row's lineLimit=1 text a deterministic max-width to
  // truncate against, so a long location string ellipsizes instead of
  // growing right up to the well. This constrains infoCol — NOT the
  // well — deliberately: an earlier attempt gave WELL an explicit
  // width plus leading/trailing addSpacer() to center its content,
  // which looked centered in this repo's CSS-flexbox simulator but
  // on-device left the count text hugging the well's left edge
  // instead of centered (Spacer()-based main-axis centering inside an
  // explicitly-sized row is untested territory here; addSpacer()-
  // stretching a stack to fill its OWN parent, as used everywhere
  // else in this file, is proven; centering a lone child WITHIN a
  // fixed-size stack via spacers apparently isn't equivalent on real
  // SwiftUI). Constraining infoCol avoids the well needing any
  // explicit size or spacers at all — it goes back to auto-sizing
  // tightly around its own content, so there's no extra space inside
  // it to mis-center in the first place.
  if (t.infoColW > 0) infoCol.size = new Size(t.infoColW, 0)

  const title = infoCol.addText(next.event.name)
  title.font = rBoldFont(t.titleFont)
  title.textColor = p.fg
  title.lineLimit = 1

  infoCol.addSpacer(t.rowGap)

  // SF Symbol per row picked to match the web app's lucide icon for the
  // same field (EventDetailsDrawer: Calendar / Users / MapPin / Route) —
  // the two apps should read as one system, not diverge on iconography
  // just because one draws with SF Symbols and the other with lucide.
  const rows = []
  rows.push({ icon: "calendar", text: \`\${next.day.label}, \${shortDate(next.day.date)}\` })
  // Small drops the organizer row entirely — on-device testing showed
  // title + 3 rows + well doesn't fit Small's real interior height no
  // matter how tight the spacing gets (see the COUNTDOWN_TOKENS.small
  // comment). Organizer is the least essential of the three fields for
  // an at-a-glance "what's next" card — date and location stay.
  if (next.event.organizer && !isSmall) rows.push({ icon: "person.2", text: next.event.organizer })
  if (next.event.track) {
    // Small has no width to spare: appending the city truncated the
    // track name itself ("Test Raceway, Tes…") instead of just
    // dropping the less essential part, so Small never appends it.
    const withCity = next.event.city && !isSmall
    rows.push({
      icon: "mappin",
      text: withCity ? \`\${next.event.track}, \${next.event.city}\` : next.event.track,
    })
  }
  const trackConfig = formatTrackConfig(next.event.configuration, next.event.direction)
  // The denser layout's budget only fits two rows before the card
  // starts fighting the well for space, so the least essential row
  // (track config) drops there — the rich layout has room for all four.
  if (rich && trackConfig) {
    rows.push({ icon: "point.topleft.down.curvedto.point.bottomright.up", text: trackConfig })
  }

  for (let i = 0; i < rows.length; i++) {
    if (i > 0) infoCol.addSpacer(t.rowSpacing)
    addInfoRow(infoCol, rows[i], p, t)
  }

  // Fixed minimum gap, then a flex spacer. The flex is what stretches
  // CARD to the widget's full width: a stack sizes to fit its content,
  // but a flex spacer's "as large as possible" ideal size cascades out
  // through every ancestor stack that isn't otherwise constrained (the
  // same trick drawActivityRow uses — see "Trailing flex spacer
  // stretches the CARDCONTAINER" there) — here it pins the well to the
  // card's right edge instead of leaving blank space after it.
  card.addSpacer(t.wellGap)
  card.addSpacer()
  drawCountdownWell(card, next, p, t, false)

  // Matches the leading COUNTDOWN_MARGIN spacer above, so the card
  // sits with equal margin on both sides instead of flush against the
  // widget's right edge — drawStatusFooter (back in makeWidget)
  // already surfaces stale/notification/invalid-token state uniformly,
  // so it isn't repeated here.
  outer.addSpacer(COUNTDOWN_MARGIN)
}

// Small-only: the title + info-rows block, as a widget-level row with
// COUNTDOWN_MARGIN left/right insets. Kept separate from the well
// (see drawCountdownCard's isSmall early return) so a widget-level
// flex spacer can sit between them, pinning the well to the bottom
// of the widget's remaining vertical space.
function drawSmallInfoBlock(w, p, next, t) {
  const outer = w.addStack()
  outer.addSpacer(COUNTDOWN_MARGIN)

  const infoCol = outer.addStack()
  infoCol.layoutVertically()
  infoCol.topAlignContent()

  const title = infoCol.addText(next.event.name)
  title.font = rBoldFont(t.titleFont)
  title.textColor = p.fg
  title.lineLimit = 1

  infoCol.addSpacer(t.rowGap)

  const rows = []
  rows.push({ icon: "calendar", text: \`\${next.day.label}, \${shortDate(next.day.date)}\` })
  if (next.event.track) {
    rows.push({ icon: "mappin", text: next.event.track })
  }
  for (let i = 0; i < rows.length; i++) {
    if (i > 0) infoCol.addSpacer(t.rowSpacing)
    addInfoRow(infoCol, rows[i], p, t)
  }

  outer.addSpacer(COUNTDOWN_MARGIN)
}

// The countdown "well" — a light-blue rounded box with the big
// day count. No explicit size, no spacers, on the side-by-side
// (non-fullWidth) path: it sizes tightly to its own content
// (padding + "DAYS AWAY"), so there's no extra internal space to
// mis-center in the first place — it's pinned to the card's right
// edge by the flex spacer drawCountdownCard adds just before calling
// this. \`fullWidth\` (Small) is different: it wraps the count in a
// leading + trailing flex spacer so those spacers' "as large as
// possible" ideal width cascades up through \`well\` itself,
// stretching it to fill the card's remaining width and centering the
// count inside it — the same cascade-through-flex-spacer trick used
// everywhere else in this file, just applied on both sides instead
// of one. (Giving WELL an explicit width plus these same spacers for
// the non-fullWidth case was tried and reverted — see infoCol.size's
// comment in drawCountdownCard for why.)
function drawCountdownWell(container, next, p, t, fullWidth) {
  const well = container.addStack()
  well.backgroundColor = p.currentCardBg
  well.cornerRadius = COUNTDOWN_WELL_RADIUS
  well.centerAlignContent()
  well.setPadding(t.wellPadV, t.wellPadH, t.wellPadV, t.wellPadH)

  if (fullWidth) well.addSpacer()
  const parts = countdownParts(daysUntil(next.day.date))
  addCountUnit(well, parts.days, \`\${pluralize(parts.days, "day")} away\`, p, t)
  if (fullWidth) well.addSpacer()
}

function addInfoRow(col, row, p, t) {
  const stack = col.addStack()
  stack.centerAlignContent()
  stack.spacing = t.rowIconGap
  if (typeof SFSymbol !== "undefined") {
    const sym = SFSymbol.named(row.icon)
    if (sym) {
      const img = stack.addImage(sym.image)
      img.imageSize = new Size(t.rowIconSize, t.rowIconSize)
      img.tintColor = p.muted
    }
  }
  const text = stack.addText(row.text)
  text.font = rFont(t.rowFont)
  text.textColor = p.mutedStrong
  text.lineLimit = 1
}

// One "10 / DAYS AWAY"-style stacked digit+label block inside the
// well. Sizes to its own content — no fixed width needed now that
// the well only ever shows one unit (no divider to align across).
//
// lineLimit = 1 on BOTH texts is not optional here — every other
// addText() call in this file sets it, and this was the one place
// that didn't. Without it, Text is free to WRAP, and a wrappable
// Text reports a much smaller "ideal width" to its layout (it can
// always break onto more lines instead of needing a wider box) — so
// once \`well\` lost its explicit .size (see drawCountdownWell's
// comment), nothing stopped the layout engine from squeezing it down
// to an unreadable sliver: "17" wrapped into "1" / "7" on separate
// lines, and "DAYS AWAY" wrapped into "DAYS" / "AWAY", on a real
// device. lineLimit = 1 forces each Text to demand its true
// single-line width, which is what makes \`well\`'s own "size to
// content" auto-sizing (still no explicit .size) actually produce a
// sane, readable width instead of collapsing.
function addCountUnit(container, n, label, p, t) {
  const col = container.addStack()
  col.layoutVertically()
  col.centerAlignContent()
  const num = col.addText(String(n))
  num.font = rBoldFont(t.unitFont)
  num.textColor = p.accent
  num.lineLimit = 1
  const lbl = col.addText(label.toUpperCase())
  lbl.font = rSemiboldFont(t.unitLabelFont)
  lbl.textColor = p.mutedStrong
  lbl.lineLimit = 1
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

// ---------- notifications ----------
//
// Model: every widget refresh (from every widget instance on this device)
// merges each live instance's filter + lead time and rewrites the full
// pending-notification set for the app. The merge uses one global identifier
// namespace \`hpde:<sessionKey>\`, so any refresh converges to the same end
// state regardless of order — two widgets covering the same session never
// produce duplicate alerts. Cross-instance merge rules:
//
//   - A session is scheduled if ANY live instance's filter includes its
//     group (or its filter is empty, i.e. "notify for all groups"). All-
//     drivers events (activities without a run-group tag: meetings, lunch,
//     etc.) are always scheduled, regardless of any instance's filter.
//   - Its lead time is the MAX across the instances that want it, so the
//     earliest warning wins.
//
// Instance state lives in \`hpde-notif-state.json\` next to the manifest
// cache. Each instance keys itself by a hash of its parameter string; an
// entry ages out after NOTIF_STALE_INSTANCE_DAYS without a refresh, which
// is how a removed widget stops contributing.

function paramHash(source) {
  let h = 5381
  const s = String(source == null ? "" : source)
  for (let i = 0; i < s.length; i++) {
    h = (((h << 5) + h) + s.charCodeAt(i)) >>> 0
  }
  return h.toString(36)
}

function slug(s) {
  return String(s == null ? "" : s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "activity"
}

function activityDate(dateStr, timeHhmm) {
  const [y, m, d] = String(dateStr).split("-").map(Number)
  const [h, mm] = String(timeHhmm).split(":").map(Number)
  return new Date(y, m - 1, d, h, mm, 0, 0)
}

function loadNotifState() {
  try {
    const fm = getFm()
    const path = fm.joinPath(fm.documentsDirectory(), NOTIF_STATE_FILENAME)
    if (fm.fileExists(path)) {
      const parsed = JSON.parse(fm.readString(path))
      if (parsed && typeof parsed === "object") return parsed
    }
  } catch (_) {}
  return { instances: {} }
}

function saveNotifState(state) {
  try {
    const fm = getFm()
    const path = fm.joinPath(fm.documentsDirectory(), NOTIF_STATE_FILENAME)
    fm.writeString(path, JSON.stringify(state))
  } catch (_) {}
}

// Collect one notification target per (activity × group) or per all-drivers
// activity in the future. Each target carries enough context to build its
// title/body and to compute a follow-up hint.
function collectNotifTargets(manifest, now) {
  const targets = []
  const nowMs = now.getTime()
  for (const event of (manifest && manifest.events) || []) {
    for (const day of event.days || []) {
      const activities = day.activities || []
      for (let i = 0; i < activities.length; i++) {
        const a = activities[i]
        if (!a || a.type === "break" || !a.time) continue
        const when = activityDate(day.date, a.time)
        if (when.getTime() <= nowMs) continue
        const keyBase = \`\${event.id}:\${day.date}:\${a.time}\`
        if (a.type === "session") {
          for (const gid of (a.onTrack || [])) {
            targets.push({
              event, day, activityIdx: i, activity: a,
              kind: "onTrack", groupId: gid, when,
              sessionKey: \`\${keyBase}:sess:onTrack:\${gid}\`,
            })
          }
          for (const gid of (a.inClass || [])) {
            targets.push({
              event, day, activityIdx: i, activity: a,
              kind: "inClass", groupId: gid, when,
              sessionKey: \`\${keyBase}:sess:inClass:\${gid}\`,
            })
          }
        } else {
          targets.push({
            event, day, activityIdx: i, activity: a,
            kind: "all", groupId: null, when,
            sessionKey: \`\${keyBase}:gen:\${slug(a.label)}\`,
          })
        }
      }
    }
  }
  return targets
}

function findFollowUp(target) {
  if (target.kind === "all") return null
  const activities = target.day.activities || []
  const gid = target.groupId
  for (let j = target.activityIdx + 1; j < activities.length; j++) {
    const a = activities[j]
    if (!a || a.type !== "session" || !a.time) continue
    const inTrack = (a.onTrack || []).includes(gid)
    const inClass = (a.inClass || []).includes(gid)
    if (!inTrack && !inClass) continue
    const followKind = inTrack ? "onTrack" : "inClass"
    if (followKind === target.kind) return null
    const nextWhen = activityDate(target.day.date, a.time)
    const gapMin = (nextWhen.getTime() - target.when.getTime()) / 60000
    if (gapMin <= 0 || gapMin > NOTIF_FOLLOW_WINDOW_MIN) return null
    return { kind: followKind, time: a.time }
  }
  return null
}

function groupLabel(event, groupId) {
  const g = ((event && event.runGroups) || []).find(x => x.id === groupId)
  return (g && g.label) || groupId
}

// Colored circle emoji per known run-group id, so a notification's title
// reads as "🟠 Orange · in 10m" at glance instead of a generic Scriptable
// braces alert. Ids not in this map (e.g. some future "Aqua" group) get
// no prefix — safer than picking a wrong color.
const GROUP_EMOJI = {
  red: "🔴",
  orange: "🟠",
  yellow: "🟡",
  green: "🟢",
  blue: "🔵",
  purple: "🟣",
  black: "⚫",
  white: "⚪",
  brown: "🟤",
}

function groupEmoji(groupId) {
  return GROUP_EMOJI[String(groupId || "").toLowerCase()] || ""
}

function formatTimeWithAmPm(hhmm) {
  return \`\${formatTime12(hhmm)} \${formatAmPm(hhmm)}\`
}

function buildNotifContent(target, leadMinutes) {
  const timeStr = formatTimeWithAmPm(target.activity.time)
  if (target.kind === "all") {
    const label = target.activity.label || "Activity"
    // Lunch is the one all-drivers activity type that carries its own
    // recognizable icon — everything else stays plain so the group's
    // colored circle keeps its "this one's yours" visual weight.
    const prefix = target.activity.type === "lunch" ? "🥙 " : ""
    const body = target.activity.subtitle
      ? \`\${timeStr} · \${target.activity.subtitle}\`
      : timeStr
    return { title: \`\${prefix}\${label} · in \${leadMinutes}m\`, body }
  }
  const g = groupLabel(target.event, target.groupId)
  const emoji = groupEmoji(target.groupId)
  const titlePrefix = emoji ? \`\${emoji} \${g}\` : g
  const verb = target.kind === "onTrack" ? "On track at" : "Classroom at"
  let body = \`\${verb} \${timeStr}\`
  const follow = findFollowUp(target)
  if (follow) {
    const fTime = formatTimeWithAmPm(follow.time)
    const fLabel = follow.kind === "onTrack" ? "On track" : "Classroom"
    body += \` · \${fLabel} follows at \${fTime}.\`
  }
  return { title: \`\${titlePrefix} · in \${leadMinutes}m\`, body }
}

function computeMergedSpecs(manifest, state, now) {
  const targets = collectNotifTargets(manifest, now)
  const cutoffMs = now.getTime() - NOTIF_STALE_INSTANCE_DAYS * 86400 * 1000
  const liveInstances = []
  for (const inst of Object.values(state.instances || {})) {
    if (!inst || typeof inst !== "object") continue
    const t = Date.parse(inst.lastRefreshed || "")
    if (isFinite(t) && t >= cutoffMs) liveInstances.push(inst)
  }
  const specs = []
  for (const target of targets) {
    let maxLead = -1
    for (const inst of liveInstances) {
      const groups = inst.groups || []
      const wants =
        target.kind === "all" ||
        groups.length === 0 ||
        groups.includes(target.groupId)
      if (wants) {
        const lead = Number.isFinite(inst.leadMinutes) ? inst.leadMinutes : DEFAULT_LEAD_MIN
        if (lead > maxLead) maxLead = lead
      }
    }
    if (maxLead < 0) continue
    const fireAt = new Date(target.when.getTime() - maxLead * 60 * 1000)
    if (fireAt.getTime() <= now.getTime()) continue
    const { title, body } = buildNotifContent(target, maxLead)
    specs.push({
      identifier: NOTIF_ID_PREFIX + target.sessionKey,
      title, body, fireAt,
    })
  }
  specs.sort((a, b) => a.fireAt.getTime() - b.fireAt.getTime())
  if (specs.length > NOTIF_MAX_PENDING) specs.length = NOTIF_MAX_PENDING
  return specs
}

async function cancelExistingHpdeNotifications() {
  if (typeof Notification === "undefined" || !Notification.allPending) return
  const pending = await Notification.allPending()
  const ids = []
  for (const n of (pending || [])) {
    if (n && typeof n.identifier === "string" &&
        n.identifier.indexOf(NOTIF_ID_PREFIX) === 0) {
      ids.push(n.identifier)
    }
  }
  if (ids.length > 0 && Notification.removePending) {
    await Notification.removePending(ids)
  }
}

async function scheduleSpecs(specs) {
  let scheduled = 0
  let denied = false
  for (const s of specs) {
    try {
      const n = new Notification()
      n.identifier = s.identifier
      n.title = s.title
      n.body = s.body
      n.threadIdentifier = NOTIF_THREAD_ID
      n.openURL = SITE_URL
      // Scriptable's \`deliveryDate\` is READ-ONLY (it reports when the
      // notification actually fired). To schedule for a future moment
      // you must call setTriggerDate(); without it, \`schedule()\` fires
      // the notification immediately.
      n.setTriggerDate(s.fireAt)
      await n.schedule()
      scheduled++
    } catch (_) {
      // Permission denial or another scheduling failure. iOS won't
      // re-prompt after a "Don't Allow", so bail rather than repeat
      // the same failing call for every remaining spec.
      denied = true
      break
    }
  }
  return { scheduled, denied }
}

async function refreshNotifications(manifest, parsed) {
  if (typeof Notification === "undefined") return { scheduled: 0, denied: false }
  const now = new Date()
  const state = loadNotifState()
  if (!state.instances || typeof state.instances !== "object") state.instances = {}
  const hash = paramHash(parsed.rawParam)
  state.instances[hash] = {
    params: parsed.rawParam,
    groups: parsed.groups,
    leadMinutes: parsed.leadMinutes,
    lastRefreshed: now.toISOString(),
  }
  const cutoffMs = now.getTime() - NOTIF_STALE_INSTANCE_DAYS * 86400 * 1000
  for (const [k, v] of Object.entries(state.instances)) {
    const t = v && Date.parse(v.lastRefreshed || "")
    if (!isFinite(t) || t < cutoffMs) delete state.instances[k]
  }
  saveNotifState(state)

  const specs = computeMergedSpecs(manifest, state, now)
  try {
    await cancelExistingHpdeNotifications()
  } catch (_) {}
  return await scheduleSpecs(specs)
}

// ---------- entrypoint ----------

let widget
try {
  const data = await loadManifest()
  const parsedRaw = readWidgetParameter()
  // Fixture events (test-live) ship in the manifest at their natural
  // date and are only rewritten when the user opts in: \`test\` moves it
  // to today (for testing the populated view / notifications),
  // \`test-upcoming\` moves it into the future instead (for testing the
  // no-event-today countdown card). Real users' widgets are never
  // haunted by the Test Event this way.
  if (parsedRaw.flags && parsedRaw.flags["test-upcoming"]) {
    rewriteFixtures(data.manifest, "upcoming", parsedRaw.flags.testUpcomingDays, parsedRaw.flags.testUpcomingCount)
  } else if (parsedRaw.flags && parsedRaw.flags.test) {
    rewriteFixtures(data.manifest, "today")
  }
  const parsed = validateWidgetParameter(parsedRaw, data.manifest)
  let notifStatus = { scheduled: 0, denied: false }
  try {
    notifStatus = await refreshNotifications(data.manifest, parsed)
  } catch (_) {}
  widget = makeWidget(data, parsed, notifStatus)
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
`;function W0(){const[s,c]=ue.useState(!1);ue.useEffect(()=>{window.scrollTo(0,0)},[]);async function f(){await navigator.clipboard.writeText(_h),c(!0),setTimeout(()=>c(!1),2e3)}return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsxs("button",{onClick:f,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[s?g.jsx(lo,{size:16,className:"text-green-600"}):g.jsx(mg,{size:16}),s?"Copied":"Copy"]}),g.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:g.jsx(iu,{size:18})})]})]}),g.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",g.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),g.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:g.jsx("code",{children:_h})})]})})}var La={},Rs,Mh;function $0(){return Mh||(Mh=1,Rs=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Rs}var Os={},_n={},Dh;function Wn(){if(Dh)return _n;Dh=1;let s;const c=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},_n.getSymbolTotalCodewords=function(r){return c[r]},_n.getBCHDigit=function(f){let r=0;for(;f!==0;)r++,f>>>=1;return r},_n.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');s=r},_n.isKanjiModeEnabled=function(){return typeof s<"u"},_n.toSJIS=function(r){return s(r)},_n}var zs={},kh;function uu(){return kh||(kh=1,(function(s){s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2};function c(f){if(typeof f!="string")throw new Error("Param is not a string");switch(f.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+f)}}s.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},s.from=function(r,d){if(s.isValid(r))return r;try{return c(r)}catch{return d}}})(zs)),zs}var Us,Rh;function P0(){if(Rh)return Us;Rh=1;function s(){this.buffer=[],this.length=0}return s.prototype={get:function(c){const f=Math.floor(c/8);return(this.buffer[f]>>>7-c%8&1)===1},put:function(c,f){for(let r=0;r<f;r++)this.putBit((c>>>f-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(c){const f=Math.floor(this.length/8);this.buffer.length<=f&&this.buffer.push(0),c&&(this.buffer[f]|=128>>>this.length%8),this.length++}},Us=s,Us}var js,Oh;function ey(){if(Oh)return js;Oh=1;function s(c){if(!c||c<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=c,this.data=new Uint8Array(c*c),this.reservedBit=new Uint8Array(c*c)}return s.prototype.set=function(c,f,r,d){const h=c*this.size+f;this.data[h]=r,d&&(this.reservedBit[h]=!0)},s.prototype.get=function(c,f){return this.data[c*this.size+f]},s.prototype.xor=function(c,f,r){this.data[c*this.size+f]^=r},s.prototype.isReserved=function(c,f){return this.reservedBit[c*this.size+f]},js=s,js}var Hs={},zh;function ty(){return zh||(zh=1,(function(s){const c=Wn().getSymbolSize;s.getRowColCoords=function(r){if(r===1)return[];const d=Math.floor(r/7)+2,h=c(r),v=h===145?26:Math.ceil((h-13)/(2*d-2))*2,S=[h-7];for(let m=1;m<d-1;m++)S[m]=S[m-1]-v;return S.push(6),S.reverse()},s.getPositions=function(r){const d=[],h=s.getRowColCoords(r),v=h.length;for(let S=0;S<v;S++)for(let m=0;m<v;m++)S===0&&m===0||S===0&&m===v-1||S===v-1&&m===0||d.push([h[S],h[m]]);return d}})(Hs)),Hs}var Ls={},Uh;function ny(){if(Uh)return Ls;Uh=1;const s=Wn().getSymbolSize,c=7;return Ls.getPositions=function(r){const d=s(r);return[[0,0],[d-c,0],[0,d-c]]},Ls}var Bs={},jh;function ay(){return jh||(jh=1,(function(s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const c={N1:3,N2:3,N3:40,N4:10};s.isValid=function(d){return d!=null&&d!==""&&!isNaN(d)&&d>=0&&d<=7},s.from=function(d){return s.isValid(d)?parseInt(d,10):void 0},s.getPenaltyN1=function(d){const h=d.size;let v=0,S=0,m=0,y=null,k=null;for(let R=0;R<h;R++){S=m=0,y=k=null;for(let H=0;H<h;H++){let L=d.get(R,H);L===y?S++:(S>=5&&(v+=c.N1+(S-5)),y=L,S=1),L=d.get(H,R),L===k?m++:(m>=5&&(v+=c.N1+(m-5)),k=L,m=1)}S>=5&&(v+=c.N1+(S-5)),m>=5&&(v+=c.N1+(m-5))}return v},s.getPenaltyN2=function(d){const h=d.size;let v=0;for(let S=0;S<h-1;S++)for(let m=0;m<h-1;m++){const y=d.get(S,m)+d.get(S,m+1)+d.get(S+1,m)+d.get(S+1,m+1);(y===4||y===0)&&v++}return v*c.N2},s.getPenaltyN3=function(d){const h=d.size;let v=0,S=0,m=0;for(let y=0;y<h;y++){S=m=0;for(let k=0;k<h;k++)S=S<<1&2047|d.get(y,k),k>=10&&(S===1488||S===93)&&v++,m=m<<1&2047|d.get(k,y),k>=10&&(m===1488||m===93)&&v++}return v*c.N3},s.getPenaltyN4=function(d){let h=0;const v=d.data.length;for(let m=0;m<v;m++)h+=d.data[m];return Math.abs(Math.ceil(h*100/v/5)-10)*c.N4};function f(r,d,h){switch(r){case s.Patterns.PATTERN000:return(d+h)%2===0;case s.Patterns.PATTERN001:return d%2===0;case s.Patterns.PATTERN010:return h%3===0;case s.Patterns.PATTERN011:return(d+h)%3===0;case s.Patterns.PATTERN100:return(Math.floor(d/2)+Math.floor(h/3))%2===0;case s.Patterns.PATTERN101:return d*h%2+d*h%3===0;case s.Patterns.PATTERN110:return(d*h%2+d*h%3)%2===0;case s.Patterns.PATTERN111:return(d*h%3+(d+h)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}s.applyMask=function(d,h){const v=h.size;for(let S=0;S<v;S++)for(let m=0;m<v;m++)h.isReserved(m,S)||h.xor(m,S,f(d,m,S))},s.getBestMask=function(d,h){const v=Object.keys(s.Patterns).length;let S=0,m=1/0;for(let y=0;y<v;y++){h(y),s.applyMask(y,d);const k=s.getPenaltyN1(d)+s.getPenaltyN2(d)+s.getPenaltyN3(d)+s.getPenaltyN4(d);s.applyMask(y,d),k<m&&(m=k,S=y)}return S}})(Bs)),Bs}var to={},Hh;function xg(){if(Hh)return to;Hh=1;const s=uu(),c=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],f=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return to.getBlocksCount=function(d,h){switch(h){case s.L:return c[(d-1)*4+0];case s.M:return c[(d-1)*4+1];case s.Q:return c[(d-1)*4+2];case s.H:return c[(d-1)*4+3];default:return}},to.getTotalCodewordsCount=function(d,h){switch(h){case s.L:return f[(d-1)*4+0];case s.M:return f[(d-1)*4+1];case s.Q:return f[(d-1)*4+2];case s.H:return f[(d-1)*4+3];default:return}},to}var Gs={},Ul={},Lh;function ly(){if(Lh)return Ul;Lh=1;const s=new Uint8Array(512),c=new Uint8Array(256);return(function(){let r=1;for(let d=0;d<255;d++)s[d]=r,c[r]=d,r<<=1,r&256&&(r^=285);for(let d=255;d<512;d++)s[d]=s[d-255]})(),Ul.log=function(r){if(r<1)throw new Error("log("+r+")");return c[r]},Ul.exp=function(r){return s[r]},Ul.mul=function(r,d){return r===0||d===0?0:s[c[r]+c[d]]},Ul}var Bh;function iy(){return Bh||(Bh=1,(function(s){const c=ly();s.mul=function(r,d){const h=new Uint8Array(r.length+d.length-1);for(let v=0;v<r.length;v++)for(let S=0;S<d.length;S++)h[v+S]^=c.mul(r[v],d[S]);return h},s.mod=function(r,d){let h=new Uint8Array(r);for(;h.length-d.length>=0;){const v=h[0];for(let m=0;m<d.length;m++)h[m]^=c.mul(d[m],v);let S=0;for(;S<h.length&&h[S]===0;)S++;h=h.slice(S)}return h},s.generateECPolynomial=function(r){let d=new Uint8Array([1]);for(let h=0;h<r;h++)d=s.mul(d,new Uint8Array([1,c.exp(h)]));return d}})(Gs)),Gs}var Ys,Gh;function oy(){if(Gh)return Ys;Gh=1;const s=iy();function c(f){this.genPoly=void 0,this.degree=f,this.degree&&this.initialize(this.degree)}return c.prototype.initialize=function(r){this.degree=r,this.genPoly=s.generateECPolynomial(this.degree)},c.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const d=new Uint8Array(r.length+this.degree);d.set(r);const h=s.mod(d,this.genPoly),v=this.degree-h.length;if(v>0){const S=new Uint8Array(this.degree);return S.set(h,v),S}return h},Ys=c,Ys}var qs={},Vs={},Xs={},Yh;function Tg(){return Yh||(Yh=1,Xs.isValid=function(c){return!isNaN(c)&&c>=1&&c<=40}),Xs}var Ut={},qh;function Eg(){if(qh)return Ut;qh=1;const s="[0-9]+",c="[A-Z $%*+\\-./:]+";let f="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";f=f.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+f+`)(?:.|[\r
]))+`;Ut.KANJI=new RegExp(f,"g"),Ut.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Ut.BYTE=new RegExp(r,"g"),Ut.NUMERIC=new RegExp(s,"g"),Ut.ALPHANUMERIC=new RegExp(c,"g");const d=new RegExp("^"+f+"$"),h=new RegExp("^"+s+"$"),v=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Ut.testKanji=function(m){return d.test(m)},Ut.testNumeric=function(m){return h.test(m)},Ut.testAlphanumeric=function(m){return v.test(m)},Ut}var Vh;function $n(){return Vh||(Vh=1,(function(s){const c=Tg(),f=Eg();s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(h,v){if(!h.ccBits)throw new Error("Invalid mode: "+h);if(!c.isValid(v))throw new Error("Invalid version: "+v);return v>=1&&v<10?h.ccBits[0]:v<27?h.ccBits[1]:h.ccBits[2]},s.getBestModeForData=function(h){return f.testNumeric(h)?s.NUMERIC:f.testAlphanumeric(h)?s.ALPHANUMERIC:f.testKanji(h)?s.KANJI:s.BYTE},s.toString=function(h){if(h&&h.id)return h.id;throw new Error("Invalid mode")},s.isValid=function(h){return h&&h.bit&&h.ccBits};function r(d){if(typeof d!="string")throw new Error("Param is not a string");switch(d.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+d)}}s.from=function(h,v){if(s.isValid(h))return h;try{return r(h)}catch{return v}}})(Vs)),Vs}var Xh;function ry(){return Xh||(Xh=1,(function(s){const c=Wn(),f=xg(),r=uu(),d=$n(),h=Tg(),v=7973,S=c.getBCHDigit(v);function m(H,L,q){for(let K=1;K<=40;K++)if(L<=s.getCapacity(K,q,H))return K}function y(H,L){return d.getCharCountIndicator(H,L)+4}function k(H,L){let q=0;return H.forEach(function(K){const ie=y(K.mode,L);q+=ie+K.getBitsLength()}),q}function R(H,L){for(let q=1;q<=40;q++)if(k(H,q)<=s.getCapacity(q,L,d.MIXED))return q}s.from=function(L,q){return h.isValid(L)?parseInt(L,10):q},s.getCapacity=function(L,q,K){if(!h.isValid(L))throw new Error("Invalid QR Code version");typeof K>"u"&&(K=d.BYTE);const ie=c.getSymbolTotalCodewords(L),U=f.getTotalCodewordsCount(L,q),j=(ie-U)*8;if(K===d.MIXED)return j;const M=j-y(K,L);switch(K){case d.NUMERIC:return Math.floor(M/10*3);case d.ALPHANUMERIC:return Math.floor(M/11*2);case d.KANJI:return Math.floor(M/13);case d.BYTE:default:return Math.floor(M/8)}},s.getBestVersionForData=function(L,q){let K;const ie=r.from(q,r.M);if(Array.isArray(L)){if(L.length>1)return R(L,ie);if(L.length===0)return 1;K=L[0]}else K=L;return m(K.mode,K.getLength(),ie)},s.getEncodedBits=function(L){if(!h.isValid(L)||L<7)throw new Error("Invalid QR Code version");let q=L<<12;for(;c.getBCHDigit(q)-S>=0;)q^=v<<c.getBCHDigit(q)-S;return L<<12|q}})(qs)),qs}var Is={},Ih;function sy(){if(Ih)return Is;Ih=1;const s=Wn(),c=1335,f=21522,r=s.getBCHDigit(c);return Is.getEncodedBits=function(h,v){const S=h.bit<<3|v;let m=S<<10;for(;s.getBCHDigit(m)-r>=0;)m^=c<<s.getBCHDigit(m)-r;return(S<<10|m)^f},Is}var Qs={},Ks,Qh;function uy(){if(Qh)return Ks;Qh=1;const s=$n();function c(f){this.mode=s.NUMERIC,this.data=f.toString()}return c.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(r){let d,h,v;for(d=0;d+3<=this.data.length;d+=3)h=this.data.substr(d,3),v=parseInt(h,10),r.put(v,10);const S=this.data.length-d;S>0&&(h=this.data.substr(d),v=parseInt(h,10),r.put(v,S*3+1))},Ks=c,Ks}var Zs,Kh;function cy(){if(Kh)return Zs;Kh=1;const s=$n(),c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function f(r){this.mode=s.ALPHANUMERIC,this.data=r}return f.getBitsLength=function(d){return 11*Math.floor(d/2)+6*(d%2)},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(d){let h;for(h=0;h+2<=this.data.length;h+=2){let v=c.indexOf(this.data[h])*45;v+=c.indexOf(this.data[h+1]),d.put(v,11)}this.data.length%2&&d.put(c.indexOf(this.data[h]),6)},Zs=f,Zs}var Js,Zh;function dy(){if(Zh)return Js;Zh=1;const s=$n();function c(f){this.mode=s.BYTE,typeof f=="string"?this.data=new TextEncoder().encode(f):this.data=new Uint8Array(f)}return c.getBitsLength=function(r){return r*8},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(f){for(let r=0,d=this.data.length;r<d;r++)f.put(this.data[r],8)},Js=c,Js}var Fs,Jh;function fy(){if(Jh)return Fs;Jh=1;const s=$n(),c=Wn();function f(r){this.mode=s.KANJI,this.data=r}return f.getBitsLength=function(d){return d*13},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(r){let d;for(d=0;d<this.data.length;d++){let h=c.toSJIS(this.data[d]);if(h>=33088&&h<=40956)h-=33088;else if(h>=57408&&h<=60351)h-=49472;else throw new Error("Invalid SJIS character: "+this.data[d]+`
Make sure your charset is UTF-8`);h=(h>>>8&255)*192+(h&255),r.put(h,13)}},Fs=f,Fs}var Ws={exports:{}},Fh;function hy(){return Fh||(Fh=1,(function(s){var c={single_source_shortest_paths:function(f,r,d){var h={},v={};v[r]=0;var S=c.PriorityQueue.make();S.push(r,0);for(var m,y,k,R,H,L,q,K,ie;!S.empty();){m=S.pop(),y=m.value,R=m.cost,H=f[y]||{};for(k in H)H.hasOwnProperty(k)&&(L=H[k],q=R+L,K=v[k],ie=typeof v[k]>"u",(ie||K>q)&&(v[k]=q,S.push(k,q),h[k]=y))}if(typeof d<"u"&&typeof v[d]>"u"){var U=["Could not find a path from ",r," to ",d,"."].join("");throw new Error(U)}return h},extract_shortest_path_from_predecessor_list:function(f,r){for(var d=[],h=r;h;)d.push(h),f[h],h=f[h];return d.reverse(),d},find_path:function(f,r,d){var h=c.single_source_shortest_paths(f,r,d);return c.extract_shortest_path_from_predecessor_list(h,d)},PriorityQueue:{make:function(f){var r=c.PriorityQueue,d={},h;f=f||{};for(h in r)r.hasOwnProperty(h)&&(d[h]=r[h]);return d.queue=[],d.sorter=f.sorter||r.default_sorter,d},default_sorter:function(f,r){return f.cost-r.cost},push:function(f,r){var d={value:f,cost:r};this.queue.push(d),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};s.exports=c})(Ws)),Ws.exports}var Wh;function gy(){return Wh||(Wh=1,(function(s){const c=$n(),f=uy(),r=cy(),d=dy(),h=fy(),v=Eg(),S=Wn(),m=hy();function y(U){return unescape(encodeURIComponent(U)).length}function k(U,j,M){const Y=[];let oe;for(;(oe=U.exec(M))!==null;)Y.push({data:oe[0],index:oe.index,mode:j,length:oe[0].length});return Y}function R(U){const j=k(v.NUMERIC,c.NUMERIC,U),M=k(v.ALPHANUMERIC,c.ALPHANUMERIC,U);let Y,oe;return S.isKanjiModeEnabled()?(Y=k(v.BYTE,c.BYTE,U),oe=k(v.KANJI,c.KANJI,U)):(Y=k(v.BYTE_KANJI,c.BYTE,U),oe=[]),j.concat(M,Y,oe).sort(function(B,J){return B.index-J.index}).map(function(B){return{data:B.data,mode:B.mode,length:B.length}})}function H(U,j){switch(j){case c.NUMERIC:return f.getBitsLength(U);case c.ALPHANUMERIC:return r.getBitsLength(U);case c.KANJI:return h.getBitsLength(U);case c.BYTE:return d.getBitsLength(U)}}function L(U){return U.reduce(function(j,M){const Y=j.length-1>=0?j[j.length-1]:null;return Y&&Y.mode===M.mode?(j[j.length-1].data+=M.data,j):(j.push(M),j)},[])}function q(U){const j=[];for(let M=0;M<U.length;M++){const Y=U[M];switch(Y.mode){case c.NUMERIC:j.push([Y,{data:Y.data,mode:c.ALPHANUMERIC,length:Y.length},{data:Y.data,mode:c.BYTE,length:Y.length}]);break;case c.ALPHANUMERIC:j.push([Y,{data:Y.data,mode:c.BYTE,length:Y.length}]);break;case c.KANJI:j.push([Y,{data:Y.data,mode:c.BYTE,length:y(Y.data)}]);break;case c.BYTE:j.push([{data:Y.data,mode:c.BYTE,length:y(Y.data)}])}}return j}function K(U,j){const M={},Y={start:{}};let oe=["start"];for(let V=0;V<U.length;V++){const B=U[V],J=[];for(let Q=0;Q<B.length;Q++){const ee=B[Q],$=""+V+Q;J.push($),M[$]={node:ee,lastCount:0},Y[$]={};for(let G=0;G<oe.length;G++){const Z=oe[G];M[Z]&&M[Z].node.mode===ee.mode?(Y[Z][$]=H(M[Z].lastCount+ee.length,ee.mode)-H(M[Z].lastCount,ee.mode),M[Z].lastCount+=ee.length):(M[Z]&&(M[Z].lastCount=ee.length),Y[Z][$]=H(ee.length,ee.mode)+4+c.getCharCountIndicator(ee.mode,j))}}oe=J}for(let V=0;V<oe.length;V++)Y[oe[V]].end=0;return{map:Y,table:M}}function ie(U,j){let M;const Y=c.getBestModeForData(U);if(M=c.from(j,Y),M!==c.BYTE&&M.bit<Y.bit)throw new Error('"'+U+'" cannot be encoded with mode '+c.toString(M)+`.
 Suggested mode is: `+c.toString(Y));switch(M===c.KANJI&&!S.isKanjiModeEnabled()&&(M=c.BYTE),M){case c.NUMERIC:return new f(U);case c.ALPHANUMERIC:return new r(U);case c.KANJI:return new h(U);case c.BYTE:return new d(U)}}s.fromArray=function(j){return j.reduce(function(M,Y){return typeof Y=="string"?M.push(ie(Y,null)):Y.data&&M.push(ie(Y.data,Y.mode)),M},[])},s.fromString=function(j,M){const Y=R(j,S.isKanjiModeEnabled()),oe=q(Y),V=K(oe,M),B=m.find_path(V.map,"start","end"),J=[];for(let Q=1;Q<B.length-1;Q++)J.push(V.table[B[Q]].node);return s.fromArray(L(J))},s.rawSplit=function(j){return s.fromArray(R(j,S.isKanjiModeEnabled()))}})(Qs)),Qs}var $h;function my(){if($h)return Os;$h=1;const s=Wn(),c=uu(),f=P0(),r=ey(),d=ty(),h=ny(),v=ay(),S=xg(),m=oy(),y=ry(),k=sy(),R=$n(),H=gy();function L(V,B){const J=V.size,Q=h.getPositions(B);for(let ee=0;ee<Q.length;ee++){const $=Q[ee][0],G=Q[ee][1];for(let Z=-1;Z<=7;Z++)if(!($+Z<=-1||J<=$+Z))for(let ne=-1;ne<=7;ne++)G+ne<=-1||J<=G+ne||(Z>=0&&Z<=6&&(ne===0||ne===6)||ne>=0&&ne<=6&&(Z===0||Z===6)||Z>=2&&Z<=4&&ne>=2&&ne<=4?V.set($+Z,G+ne,!0,!0):V.set($+Z,G+ne,!1,!0))}}function q(V){const B=V.size;for(let J=8;J<B-8;J++){const Q=J%2===0;V.set(J,6,Q,!0),V.set(6,J,Q,!0)}}function K(V,B){const J=d.getPositions(B);for(let Q=0;Q<J.length;Q++){const ee=J[Q][0],$=J[Q][1];for(let G=-2;G<=2;G++)for(let Z=-2;Z<=2;Z++)G===-2||G===2||Z===-2||Z===2||G===0&&Z===0?V.set(ee+G,$+Z,!0,!0):V.set(ee+G,$+Z,!1,!0)}}function ie(V,B){const J=V.size,Q=y.getEncodedBits(B);let ee,$,G;for(let Z=0;Z<18;Z++)ee=Math.floor(Z/3),$=Z%3+J-8-3,G=(Q>>Z&1)===1,V.set(ee,$,G,!0),V.set($,ee,G,!0)}function U(V,B,J){const Q=V.size,ee=k.getEncodedBits(B,J);let $,G;for($=0;$<15;$++)G=(ee>>$&1)===1,$<6?V.set($,8,G,!0):$<8?V.set($+1,8,G,!0):V.set(Q-15+$,8,G,!0),$<8?V.set(8,Q-$-1,G,!0):$<9?V.set(8,15-$-1+1,G,!0):V.set(8,15-$-1,G,!0);V.set(Q-8,8,1,!0)}function j(V,B){const J=V.size;let Q=-1,ee=J-1,$=7,G=0;for(let Z=J-1;Z>0;Z-=2)for(Z===6&&Z--;;){for(let ne=0;ne<2;ne++)if(!V.isReserved(ee,Z-ne)){let Be=!1;G<B.length&&(Be=(B[G]>>>$&1)===1),V.set(ee,Z-ne,Be),$--,$===-1&&(G++,$=7)}if(ee+=Q,ee<0||J<=ee){ee-=Q,Q=-Q;break}}}function M(V,B,J){const Q=new f;J.forEach(function(ne){Q.put(ne.mode.bit,4),Q.put(ne.getLength(),R.getCharCountIndicator(ne.mode,V)),ne.write(Q)});const ee=s.getSymbolTotalCodewords(V),$=S.getTotalCodewordsCount(V,B),G=(ee-$)*8;for(Q.getLengthInBits()+4<=G&&Q.put(0,4);Q.getLengthInBits()%8!==0;)Q.putBit(0);const Z=(G-Q.getLengthInBits())/8;for(let ne=0;ne<Z;ne++)Q.put(ne%2?17:236,8);return Y(Q,V,B)}function Y(V,B,J){const Q=s.getSymbolTotalCodewords(B),ee=S.getTotalCodewordsCount(B,J),$=Q-ee,G=S.getBlocksCount(B,J),Z=Q%G,ne=G-Z,Be=Math.floor(Q/G),A=Math.floor($/G),I=A+1,ae=Be-A,Te=new m(ae);let Se=0;const w=new Array(G),z=new Array(G);let X=0;const W=new Uint8Array(V.buffer);for(let Ce=0;Ce<G;Ce++){const jt=Ce<ne?A:I;w[Ce]=W.slice(Se,Se+jt),z[Ce]=Te.encode(w[Ce]),Se+=jt,X=Math.max(X,jt)}const re=new Uint8Array(Q);let fe=0,he,ke;for(he=0;he<X;he++)for(ke=0;ke<G;ke++)he<w[ke].length&&(re[fe++]=w[ke][he]);for(he=0;he<ae;he++)for(ke=0;ke<G;ke++)re[fe++]=z[ke][he];return re}function oe(V,B,J,Q){let ee;if(Array.isArray(V))ee=H.fromArray(V);else if(typeof V=="string"){let Be=B;if(!Be){const A=H.rawSplit(V);Be=y.getBestVersionForData(A,J)}ee=H.fromString(V,Be||40)}else throw new Error("Invalid data");const $=y.getBestVersionForData(ee,J);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!B)B=$;else if(B<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const G=M(B,J,ee),Z=s.getSymbolSize(B),ne=new r(Z);return L(ne,B),q(ne),K(ne,B),U(ne,J,0),B>=7&&ie(ne,B),j(ne,G),isNaN(Q)&&(Q=v.getBestMask(ne,U.bind(null,ne,J))),v.applyMask(Q,ne),U(ne,J,Q),{modules:ne,version:B,errorCorrectionLevel:J,maskPattern:Q,segments:ee}}return Os.create=function(B,J){if(typeof B>"u"||B==="")throw new Error("No input text");let Q=c.M,ee,$;return typeof J<"u"&&(Q=c.from(J.errorCorrectionLevel,c.M),ee=y.from(J.version),$=v.from(J.maskPattern),J.toSJISFunc&&s.setToSJISFunction(J.toSJISFunc)),oe(B,ee,Q,$)},Os}var $s={},Ps={},Ph;function Ng(){return Ph||(Ph=1,(function(s){function c(f){if(typeof f=="number"&&(f=f.toString()),typeof f!="string")throw new Error("Color should be defined as hex string");let r=f.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+f);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(h){return[h,h]}))),r.length===6&&r.push("F","F");const d=parseInt(r.join(""),16);return{r:d>>24&255,g:d>>16&255,b:d>>8&255,a:d&255,hex:"#"+r.slice(0,6).join("")}}s.getOptions=function(r){r||(r={}),r.color||(r.color={});const d=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,h=r.width&&r.width>=21?r.width:void 0,v=r.scale||4;return{width:h,scale:h?4:v,margin:d,color:{dark:c(r.color.dark||"#000000ff"),light:c(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},s.getScale=function(r,d){return d.width&&d.width>=r+d.margin*2?d.width/(r+d.margin*2):d.scale},s.getImageWidth=function(r,d){const h=s.getScale(r,d);return Math.floor((r+d.margin*2)*h)},s.qrToImageData=function(r,d,h){const v=d.modules.size,S=d.modules.data,m=s.getScale(v,h),y=Math.floor((v+h.margin*2)*m),k=h.margin*m,R=[h.color.light,h.color.dark];for(let H=0;H<y;H++)for(let L=0;L<y;L++){let q=(H*y+L)*4,K=h.color.light;if(H>=k&&L>=k&&H<y-k&&L<y-k){const ie=Math.floor((H-k)/m),U=Math.floor((L-k)/m);K=R[S[ie*v+U]?1:0]}r[q++]=K.r,r[q++]=K.g,r[q++]=K.b,r[q]=K.a}}})(Ps)),Ps}var eg;function py(){return eg||(eg=1,(function(s){const c=Ng();function f(d,h,v){d.clearRect(0,0,h.width,h.height),h.style||(h.style={}),h.height=v,h.width=v,h.style.height=v+"px",h.style.width=v+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}s.render=function(h,v,S){let m=S,y=v;typeof m>"u"&&(!v||!v.getContext)&&(m=v,v=void 0),v||(y=r()),m=c.getOptions(m);const k=c.getImageWidth(h.modules.size,m),R=y.getContext("2d"),H=R.createImageData(k,k);return c.qrToImageData(H.data,h,m),f(R,y,k),R.putImageData(H,0,0),y},s.renderToDataURL=function(h,v,S){let m=S;typeof m>"u"&&(!v||!v.getContext)&&(m=v,v=void 0),m||(m={});const y=s.render(h,v,m),k=m.type||"image/png",R=m.rendererOpts||{};return y.toDataURL(k,R.quality)}})($s)),$s}var eu={},tg;function yy(){if(tg)return eu;tg=1;const s=Ng();function c(d,h){const v=d.a/255,S=h+'="'+d.hex+'"';return v<1?S+" "+h+'-opacity="'+v.toFixed(2).slice(1)+'"':S}function f(d,h,v){let S=d+h;return typeof v<"u"&&(S+=" "+v),S}function r(d,h,v){let S="",m=0,y=!1,k=0;for(let R=0;R<d.length;R++){const H=Math.floor(R%h),L=Math.floor(R/h);!H&&!y&&(y=!0),d[R]?(k++,R>0&&H>0&&d[R-1]||(S+=y?f("M",H+v,.5+L+v):f("m",m,0),m=0,y=!1),H+1<h&&d[R+1]||(S+=f("h",k),k=0)):m++}return S}return eu.render=function(h,v,S){const m=s.getOptions(v),y=h.modules.size,k=h.modules.data,R=y+m.margin*2,H=m.color.light.a?"<path "+c(m.color.light,"fill")+' d="M0 0h'+R+"v"+R+'H0z"/>':"",L="<path "+c(m.color.dark,"stroke")+' d="'+r(k,y,m.margin)+'"/>',q='viewBox="0 0 '+R+" "+R+'"',ie='<svg xmlns="http://www.w3.org/2000/svg" '+(m.width?'width="'+m.width+'" height="'+m.width+'" ':"")+q+' shape-rendering="crispEdges">'+H+L+`</svg>
`;return typeof S=="function"&&S(null,ie),ie},eu}var ng;function vy(){if(ng)return La;ng=1;const s=$0(),c=my(),f=py(),r=yy();function d(h,v,S,m,y){const k=[].slice.call(arguments,1),R=k.length,H=typeof k[R-1]=="function";if(!H&&!s())throw new Error("Callback required as last argument");if(H){if(R<2)throw new Error("Too few arguments provided");R===2?(y=S,S=v,v=m=void 0):R===3&&(v.getContext&&typeof y>"u"?(y=m,m=void 0):(y=m,m=S,S=v,v=void 0))}else{if(R<1)throw new Error("Too few arguments provided");return R===1?(S=v,v=m=void 0):R===2&&!v.getContext&&(m=S,S=v,v=void 0),new Promise(function(L,q){try{const K=c.create(S,m);L(h(K,v,m))}catch(K){q(K)}})}try{const L=c.create(S,m);y(null,h(L,v,m))}catch(L){y(L)}}return La.create=c.create,La.toCanvas=d.bind(null,f.render),La.toDataURL=d.bind(null,f.renderToDataURL),La.toString=d.bind(null,function(h,v,S){return r.render(h,S)}),La}var by=vy();const wy=Wp(by),tu=`${window.location.origin}/hpde/pr-preview/pr-212/`;function Sy(){const[s,c]=ue.useState(!1),[f,r]=ue.useState(null);ue.useEffect(()=>{window.scrollTo(0,0),wy.toDataURL(tu,{margin:1,width:240}).then(r).catch(()=>r(null))},[]);async function d(){await navigator.clipboard.writeText(tu),c(!0),setTimeout(()=>c(!1),2e3)}return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),g.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:g.jsx(iu,{size:18})})]}),g.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),g.jsxs("button",{onClick:d,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[g.jsx("span",{className:"truncate text-sm text-gray-800",children:tu}),s?g.jsx(lo,{size:16,className:"shrink-0 text-green-600"}):g.jsx(mg,{size:16,className:"shrink-0 text-gray-400"})]}),g.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:f&&g.jsx("img",{src:f,alt:"QR code for schedule link",width:240,height:240})})]})})}function Ba(s,c){const f=c.split(`
`).map(ie=>ie.trim());let r="",d,h,v,S,m,y,k,R;const H=[],L=[];let q=null,K=!1;for(const ie of f){if(!ie||ie.startsWith("//"))continue;const U=ie.replace(/^-\s+/,"");if(U.startsWith("# ")){r=U.slice(2).trim();continue}if(U.startsWith("subtitle:")){d=U.slice(9).trim()||void 0;continue}if(U.startsWith("link:")){h=U.slice(5).trim()||void 0;continue}if(U.startsWith("organizer:")){v=U.slice(10).trim()||void 0;continue}if(U.startsWith("track:")){S=U.slice(6).trim()||void 0;continue}if(U.startsWith("city:")){m=U.slice(5).trim()||void 0;continue}if(U.startsWith("configuration:")){y=U.slice(14).trim()||void 0;continue}if(U.startsWith("config:")){y=U.slice(7).trim()||void 0;continue}if(U.startsWith("direction:")){k=U.slice(10).trim()||void 0;continue}if(U.startsWith("trackId:")){R=U.slice(8).trim()||void 0;continue}if(U.startsWith("## ")){const j=U.slice(3).trim();if(j.toLowerCase()==="groups"){K=!0,q=null;continue}const M=j.split("|").map(Y=>Y.trim());M.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(M[1])?(K=!1,q={id:M[0].toLowerCase().replace(/\s+/g,"-"),label:M[0],date:M[1],activities:[]},L.push(q)):K=!1;continue}if(K){const j=U.split("|").map(M=>M.trim());if(j.length>=4){const M=j[4]||void 0;H.push({id:j[0],label:j[1],bgClass:j[2],textClass:j[3],...M?{description:M}:{}})}continue}if(q){if(/^\d{2}:\d{2}/.test(U)){const j=xy(U);j&&q.activities.push(j)}else if(/^break\s*\|/.test(U)){const j=U.slice(U.indexOf("|")+1).trim();q.activities.push({type:"break",label:j})}}}return{id:s,name:r,...d?{subtitle:d}:{},...h?{link:h}:{},...v?{organizer:v}:{},...S?{track:S}:{},...m?{city:m}:{},...y?{configuration:y}:{},...k?{direction:k}:{},...R?{trackId:R}:{},runGroups:H,days:L}}function xy(s){const c=s.split("|").map(S=>S.trim()),f=c[0],r=c.slice(1),d=f.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!d)return null;const h=d[1],v=d[2].trim();if(/^(general|lunch|special)$/.test(v)){const S=v,m=r[0]??"",y=r[1]||void 0;return{time:h,type:S,label:m,...y?{subtitle:y}:{}}}if(/^session/.test(v)){const S=v.match(/^session\s+(\d+)/),m=S?parseInt(S[1],10):void 0;let y=[],k=[],R;for(const H of r)H.startsWith("track:")?y=H.slice(6).trim().split(",").map(L=>L.trim()).filter(Boolean):H.startsWith("class:")?k=H.slice(6).trim().split(",").map(L=>L.trim()).filter(Boolean):H.startsWith("note:")&&(R=H.slice(5).trim()||void 0);return{time:h,type:"session",...m!==void 0?{sessionNumber:m}:{},onTrack:y,...k.length?{inClass:k}:{},...R?{note:R}:{}}}return null}const Ty=`# TDE at MSRC 1.7CW

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
//   trackId: <shape-icon id; one of the SVGs in src/data/track-icons
//             (e.g. msrc-3-1, msrc-1-7, msrc-1-3, ecr-2-7). Unset or
//             unknown → a placeholder loop is shown instead.>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here. The "Dates" row also appends the
// day(s) of the week, e.g. "Sep 13, 2026 (Sunday)".)
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
- track: Motorsport Ranch - Cresson
- city: Cresson, TX
- configuration: 1.7 mile
- direction: Clockwise
- trackId: msrc-1-7
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
`,cu="/hpde/pr-preview/pr-212/assets/msrc-1-7-D9G0r_nf.jpg",Ey={...Ba("2026-09-11_msrc-1-7",Ty),mapImage:cu},Ny=`# SCCA at MSRC 1.7 CW

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
//   trackId: <shape-icon id; one of the SVGs in src/data/track-icons
//             (e.g. msrc-3-1, msrc-1-7, msrc-1-3, ecr-2-7). Unset or
//             unknown → a placeholder loop is shown instead.>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here. The "Dates" row also appends the
// day(s) of the week, e.g. "Sep 13, 2026 (Sunday)".)
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
- track: Motorsport Ranch - Cresson
- city: Cresson, TX
- configuration: 1.7
- direction: Clockwise
- trackId: msrc-1-7
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
`,Cy={...Ba("2026-09-13_msr-scca",Ny),mapImage:cu},Ay=`# TDE at MSRC 1.7 Fast Track

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
//   trackId: <shape-icon id; one of the SVGs in src/data/track-icons
//             (e.g. msrc-3-1, msrc-1-7, msrc-1-3, ecr-2-7). Unset or
//             unknown → a placeholder loop is shown instead.>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here. The "Dates" row also appends the
// day(s) of the week, e.g. "Sep 13, 2026 (Sunday)".)
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
- track: Motorsport Ranch - Cresson
- city: Cresson, TX
- configuration: 1.7 mile
- direction:
- trackId: msrc-1-7
- link: https://www.motorsportreg.com/events/drivers-edge-motorsport-ranch-cresson-hpde-509072

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
`,_y={...Ba("2026-06-06_msrc-1-7",Ay),mapImage:cu},My=`# TDE at MSRC 3.1

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
//   trackId: <shape-icon id; one of the SVGs in src/data/track-icons
//             (e.g. msrc-3-1, msrc-1-7, msrc-1-3, ecr-2-7). Unset or
//             unknown → a placeholder loop is shown instead.>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here. The "Dates" row also appends the
// day(s) of the week, e.g. "Sep 13, 2026 (Sunday)".)
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
- track: Motorsport Ranch - Cresson
- city: Cresson, TX
- configuration: 3.1 mile
- direction:
- trackId: msrc-3-1
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
`,Dy="/hpde/pr-preview/pr-212/assets/msrc-3-1-BsOP6CK2.png",ky={...Ba("2025-11-07_msrc-3-1",My),mapImage:Dy},Ry=`# TDE at ECR 2.7

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
//   trackId: <shape-icon id; one of the SVGs in src/data/track-icons
//             (e.g. msrc-3-1, msrc-1-7, msrc-1-3, ecr-2-7). Unset or
//             unknown → a placeholder loop is shown instead.>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here. The "Dates" row also appends the
// day(s) of the week, e.g. "Sep 13, 2026 (Sunday)".)
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
- track: Eagles Canyon Raceway
- city: Decatur, TX
- configuration: 2.7 mile
- direction:
- trackId: ecr-2-7
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
`,Oy="/hpde/pr-preview/pr-212/assets/ecr-BW_3Ndfh.png",zy={...Ba("2026-05-30_ecr-2-7",Ry),mapImage:Oy},Uy=`# Test Event

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
//   trackId: <shape-icon id; one of the SVGs in src/data/track-icons
//             (e.g. msrc-3-1, msrc-1-7, msrc-1-3, ecr-2-7). Unset or
//             unknown → a placeholder loop is shown instead.>
//   link: <registration or event page URL>
//   subtitle: <override the computed date line below — only for a
//              non-standard event; leave unset to auto-show the dates>
// (The date line under the event name, and the "Dates" row in Event
// Details, are both computed from the "## <Day> | YYYY-MM-DD" headers
// below — not read from a field here. The "Dates" row also appends the
// day(s) of the week, e.g. "Sep 13, 2026 (Sunday)".)
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

- organizer: Test Organizer
- track: Test Raceway
- city: Testville, TX
- configuration: 2.0
- direction: Clockwise
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

// Days 2-3 exist only so \`test-upcoming\` has multiple future days to
// spread across, for testing the countdown card's 2-card stack and
// "N more upcoming" footer — see rewriteFixtures in hpde-widget.js.

## Day 2 | 2000-01-02

## Day 3 | 2000-01-03
`,ag=Ba("test-live",Uy),jy={...ag,days:ag.days.map(s=>({...s,date:Fn()}))},Jn=[Ey,Cy,_y,zy,ky].sort((s,c)=>c.id.localeCompare(s.id)),lg=[...Jn,jy],Hy=["January","February","March","April","May","June","July","August","September","October","November","December"],Ly=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],ig="minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1.6fr) minmax(0, 1.6fr)",By=4;function og(s){return(s.getDay()+6)%7}function Gy(s,c,f){return`${s}-${String(c+1).padStart(2,"0")}-${String(f).padStart(2,"0")}`}function Yy({events:s,onOpenEvent:c}){const f=new Date,[r,d]=ue.useState({year:f.getFullYear(),month:f.getMonth()}),h=Fn(),v=new Map;for(const M of s)for(const Y of M.days){const oe=v.get(Y.date)??[];oe.push(M),v.set(Y.date,oe)}const S=new Date(r.year,r.month,1),m=og(S),y=new Date(r.year,r.month+1,0),k=6-og(y),R=m+y.getDate()+k,H=new Date(r.year,r.month,1-m),L=[];for(let M=0;M<R;M++){const Y=new Date(H.getFullYear(),H.getMonth(),H.getDate()+M);L.push({date:Y,iso:Gy(Y.getFullYear(),Y.getMonth(),Y.getDate()),inMonth:Y.getMonth()===r.month})}const q=[];for(let M=0;M<L.length;M+=7)q.push(L.slice(M,M+7));function K(){d(M=>M.month===0?{year:M.year-1,month:11}:{year:M.year,month:M.month-1})}function ie(){d(M=>M.month===11?{year:M.year+1,month:0}:{year:M.year,month:M.month+1})}function U(){d({year:f.getFullYear(),month:f.getMonth()})}const j=r.year===f.getFullYear()&&r.month===f.getMonth();return g.jsxs("div",{children:[g.jsxs("div",{className:"mb-3 flex items-center justify-between gap-2",children:[g.jsxs("div",{className:"flex items-center gap-1",children:[g.jsx("button",{onClick:K,"aria-label":"Previous month",className:"grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400",children:g.jsx(d0,{size:18})}),g.jsx("button",{onClick:ie,"aria-label":"Next month",className:"grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400",children:g.jsx(f0,{size:18})})]}),g.jsxs("div",{className:"text-sm font-semibold text-gray-900",children:[Hy[r.month]," ",r.year]}),g.jsx("button",{onClick:U,disabled:j,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${j?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Today"})]}),g.jsxs("div",{className:"overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm",children:[g.jsx("div",{className:"grid border-b border-gray-200 text-center text-[10px] font-semibold uppercase tracking-wide",style:{gridTemplateColumns:ig},children:Ly.map((M,Y)=>g.jsx("div",{className:`py-1.5 ${Y>=By?"text-gray-600":"text-gray-400"}`,children:M},M))}),g.jsx("div",{className:"divide-y divide-gray-200",children:q.map((M,Y)=>g.jsx("div",{className:"grid divide-x divide-gray-200",style:{gridTemplateColumns:ig},children:M.map((oe,V)=>{const B=v.get(oe.iso)??[],J=oe.iso===h;return g.jsxs("div",{className:`min-h-[80px] p-1 ${oe.inMonth?"bg-white":"bg-gray-50/60"}`,children:[g.jsx("div",{className:`mb-1 text-right text-[10px] font-medium ${oe.inMonth?J?"text-blue-600":"text-gray-500":"text-gray-300"}`,children:oe.date.getDate()}),g.jsx("div",{className:"space-y-0.5",children:B.map((Q,ee)=>g.jsx("button",{onClick:()=>c(Q),className:"block w-full truncate rounded bg-blue-50 px-1 py-0.5 text-left text-[10px] font-medium text-blue-700 transition-colors hover:bg-blue-100",title:Q.name,children:Q.name},`${Q.id}-${ee}`))})]},V)})},Y))})]})]})}function Cg(){return g.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[g.jsxs("div",{children:[g.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",g.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),g.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",k0("2026-09-21T19:55:34Z")]})]})}function qy(s,c){const[f,r]=ue.useState(()=>{try{const d=localStorage.getItem(s);return d!==null?JSON.parse(d):c}catch{return c}});return ue.useEffect(()=>{localStorage.setItem(s,JSON.stringify(f))},[s,f]),[f,r]}function Vy(){return g.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[g.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function rg({event:s,muted:c,live:f,onClick:r}){return g.jsxs("button",{onClick:r,className:`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${c?"border-gray-200 bg-white hover:border-gray-300":"border-gray-200 bg-white shadow-sm hover:border-gray-400"}`,children:[g.jsx(wg,{trackId:s.trackId,size:40,muted:c}),g.jsxs("div",{className:"min-w-0 flex-1",children:[g.jsxs("div",{className:"flex items-center",children:[g.jsx("span",{className:`truncate text-sm font-semibold ${c?"text-gray-700":"text-gray-900"}`,children:s.name}),f&&g.jsx(Vy,{})]}),g.jsx("div",{className:"truncate text-xs text-gray-500",children:ou(s)})]})]})}function Xy({onOpenEvent:s}){const[c,f]=qy("hpde:landingView","list"),{live:r,upcoming:d,past:h}=su(Jn),v=[...r,...d];return g.jsxs("div",{className:"min-h-screen bg-gray-50",children:[g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[g.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:"HPDE Schedule"}),g.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[g.jsx("button",{onClick:()=>f("list"),className:`rounded-md p-2 transition-colors ${c==="list"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},"aria-label":"List view",children:g.jsx(y0,{size:18})}),g.jsx("button",{onClick:()=>f("calendar"),className:`rounded-md p-2 transition-colors ${c==="calendar"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},"aria-label":"Calendar view",children:g.jsx(hg,{size:18})})]})]}),c==="list"?g.jsxs("div",{className:"space-y-6",children:[g.jsxs("section",{children:[g.jsx("h2",{className:"mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500",children:"Upcoming"}),v.length===0?g.jsx("div",{className:"rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500",children:"No upcoming events."}):g.jsx("div",{className:"space-y-2",children:v.map(S=>g.jsx(rg,{event:S,muted:!1,live:r.includes(S),onClick:()=>s(S)},S.id))})]}),g.jsxs("section",{children:[g.jsx("h2",{className:"mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500",children:"Past"}),h.length===0?g.jsx("div",{className:"rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500",children:"No past events."}):g.jsx("div",{className:"space-y-2",children:h.map(S=>g.jsx(rg,{event:S,muted:!0,live:!1,onClick:()=>s(S)},S.id))})]})]}):g.jsx(Yy,{events:Jn,onOpenEvent:s})]}),g.jsx(Cg,{})]})}const Iy=350,Qy="cubic-bezier(0.32, 0.72, 0, 1)";function Ky({open:s,onExited:c,scrollRef:f,children:r,skipEnterAnimation:d}){const[h,v]=ue.useState(()=>s&&!!d),S=ue.useRef(!0);return ue.useEffect(()=>{if(!(S.current&&(S.current=!1,d))){if(s){const m=requestAnimationFrame(()=>v(!0));return()=>cancelAnimationFrame(m)}v(!1)}},[s]),g.jsx("div",{ref:f,className:"fixed inset-0 z-30 overflow-x-hidden overflow-y-auto bg-gray-50",style:{transform:`translateX(${h?"0":"100%"})`,transition:`transform ${Iy}ms ${Qy}`,willChange:"transform",boxShadow:"-8px 0 32px -8px rgba(0, 0, 0, 0.18)"},onTransitionEnd:m=>{m.propertyName==="transform"&&!h&&!s&&(c==null||c())},children:r})}function no(s,c){const[f,r]=ue.useState(()=>{try{const d=localStorage.getItem(s);return d!==null?JSON.parse(d):c}catch{return c}});return ue.useEffect(()=>{localStorage.setItem(s,JSON.stringify(f))},[s,f]),[f,r]}function Ag(s){const c=Fn();return s.days.find(f=>f.date===c)}function sg(s){return Ag(s)??s.days[0]}function Zy(){const[s,c]=ue.useState(()=>window.location.hash);ue.useEffect(()=>{const r=()=>{c(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",r),()=>window.removeEventListener("hashchange",r)},[]);function f(r){window.location.hash!==r&&(window.location.hash=r)}return[s,f]}const au="#/event/",ug="#/";function cg(s){return`${au}${encodeURIComponent(s)}`}function dg(s){return s.startsWith(au)?decodeURIComponent(s.slice(au.length)):null}function Jy(s){return s===""||s==="#"}function Fy(){const[s,c]=Zy(),[f,r]=no("hpde:activeEvent",Jn[0].id),[d,h]=no("hpde:activeDay",null),[v,S]=no("hpde:groups",[]),[m,y]=no("hpde:hidePast",!1),[k,R]=ue.useState("schedule"),H=ue.useRef(null),L=ue.useRef(!0),q=dg(s)!==null,[K,ie]=ue.useState(q);ue.useEffect(()=>{q&&ie(!0)},[q]);const U=lg.find(G=>G.id===f)??Jn[0],j=U.days.find(G=>G.id===d)??sg(U),M=Ag(U),Y=j.date===Fn(),oe=U.days.length>1,B=U.days.reduce((G,Z)=>Z.date>G?Z.date:G,U.days[0].date)<Fn(),[,J]=ue.useState(0);ue.useEffect(()=>{if(!Y)return;const G=setInterval(()=>J(Z=>Z+1),6e4);return()=>clearInterval(G)},[Y]);const Q=Y&&j.activities.some(G=>G.type!=="break"&&tn(G.time)<ru());function ee(G){L.current=!1,r(G.id),h(sg(G).id),S([]),c(cg(G.id))}function $(){c(ug)}return ue.useEffect(()=>{const G=dg(s);if(G){const Z=lg.find(ne=>ne.id===G);Z&&Z.id!==f&&ee(Z);return}if(Jy(s)){const{live:Z}=su(Jn);c(Z.length>0?cg(Z[0].id):ug)}},[s]),s==="#/widget-script"?g.jsx(W0,{}):s==="#/share"?g.jsx(Sy,{}):g.jsxs(g.Fragment,{children:[g.jsx(Ah,{disabled:K,children:g.jsx(Xy,{onOpenEvent:ee})}),K&&g.jsx(Ky,{open:q,onExited:()=>ie(!1),scrollRef:H,skipEnterAnimation:L.current,children:g.jsx(Ah,{disabled:!q,scrollContainerRef:H,children:g.jsxs("div",{className:"min-h-screen bg-gray-50",children:[g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-start gap-3",children:[g.jsx("button",{onClick:$,"aria-label":"Home",className:"inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900",children:g.jsx(g0,{size:18})}),g.jsx("div",{className:"min-w-0 flex-1",children:g.jsx(Y0,{events:Jn,active:U,onChange:ee})}),g.jsx("div",{className:"h-9 w-9 shrink-0","aria-hidden":"true"})]}),B&&g.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),g.jsx("div",{className:"mb-3",children:g.jsx(V0,{active:k,onChange:R})}),g.jsxs("div",{role:"tabpanel",id:`event-tabpanel-${k}`,"aria-labelledby":`event-tab-${k}`,className:"tab-fade",children:[k==="schedule"&&g.jsxs(g.Fragment,{children:[oe&&g.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[g.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:U.days.map(G=>g.jsx("button",{onClick:()=>h(G.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${j.id===G.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:G.label},G.id))}),g.jsx("button",{onClick:()=>M&&h(M.id),disabled:Y||!M,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${Y||!M?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx(U0,{groups:U.runGroups,selected:v,onChange:S}),Q&&g.jsx(Z0,{checked:m,onChange:()=>y(G=>!G),label:"Hide past activities"})]}),g.jsx(z0,{activities:j.activities,runGroups:U.runGroups,isToday:Y,selectedGroups:v,hidePast:m}),g.jsx(F0,{groups:U.runGroups})]}),k==="notes"&&g.jsxs("div",{className:"rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center",children:[g.jsx("p",{className:"text-sm font-medium text-gray-500",children:"My notes"}),g.jsx("p",{className:"mt-1 text-xs text-gray-400",children:"Coming soon"})]}),k==="info"&&g.jsx(K0,{event:U})]},k)]}),g.jsx(Cg,{})]})})})]})}r0.createRoot(document.getElementById("root")).render(g.jsx(ue.StrictMode,{children:g.jsx(Fy,{})}));
