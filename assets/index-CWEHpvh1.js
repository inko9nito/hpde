(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))o(f);new MutationObserver(f=>{for(const h of f)if(h.type==="childList")for(const y of h.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&o(y)}).observe(document,{childList:!0,subtree:!0});function d(f){const h={};return f.integrity&&(h.integrity=f.integrity),f.referrerPolicy&&(h.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?h.credentials="include":f.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(f){if(f.ep)return;f.ep=!0;const h=d(f);fetch(f.href,h)}})();function $0(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Nr={exports:{}},kl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hh;function W0(){if(hh)return kl;hh=1;var r=Symbol.for("react.transitional.element"),c=Symbol.for("react.fragment");function d(o,f,h){var y=null;if(h!==void 0&&(y=""+h),f.key!==void 0&&(y=""+f.key),"key"in f){h={};for(var S in f)S!=="key"&&(h[S]=f[S])}else h=f;return f=h.ref,{$$typeof:r,type:o,key:y,ref:f!==void 0?f:null,props:h}}return kl.Fragment=c,kl.jsx=d,kl.jsxs=d,kl}var gh;function P0(){return gh||(gh=1,Nr.exports=W0()),Nr.exports}var g=P0(),Ar={exports:{}},ut={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mh;function tp(){if(mh)return ut;mh=1;var r=Symbol.for("react.transitional.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),y=Symbol.for("react.context"),S=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),k=Symbol.for("react.activity"),j=Symbol.iterator;function H(w){return w===null||typeof w!="object"?null:(w=j&&w[j]||w["@@iterator"],typeof w=="function"?w:null)}var Z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},J=Object.assign,V={};function L(w,U,K){this.props=w,this.context=U,this.refs=V,this.updater=K||Z}L.prototype.isReactComponent={},L.prototype.setState=function(w,U){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,U,"setState")},L.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function R(){}R.prototype=L.prototype;function N(w,U,K){this.props=w,this.context=U,this.refs=V,this.updater=K||Z}var G=N.prototype=new R;G.constructor=N,J(G,L.prototype),G.isPureReactComponent=!0;var at=Array.isArray;function X(){}var B={H:null,A:null,T:null,S:null},Q=Object.prototype.hasOwnProperty;function q(w,U,K){var W=K.ref;return{$$typeof:r,type:w,key:U,ref:W!==void 0?W:null,props:K}}function P(w,U){return q(w.type,U,w.props)}function Y(w){return typeof w=="object"&&w!==null&&w.$$typeof===r}function F(w){var U={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(K){return U[K]})}var et=/\/+/g;function ot(w,U){return typeof w=="object"&&w!==null&&w.key!=null?F(""+w.key):U.toString(36)}function Yt(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(X,X):(w.status="pending",w.then(function(U){w.status==="pending"&&(w.status="fulfilled",w.value=U)},function(U){w.status==="pending"&&(w.status="rejected",w.reason=U)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function M(w,U,K,W,rt){var dt=typeof w;(dt==="undefined"||dt==="boolean")&&(w=null);var ht=!1;if(w===null)ht=!0;else switch(dt){case"bigint":case"string":case"number":ht=!0;break;case"object":switch(w.$$typeof){case r:case c:ht=!0;break;case _:return ht=w._init,M(ht(w._payload),U,K,W,rt)}}if(ht)return rt=rt(w),ht=W===""?"."+ot(w,0):W,at(rt)?(K="",ht!=null&&(K=ht.replace(et,"$&/")+"/"),M(rt,U,K,"",function(je){return je})):rt!=null&&(Y(rt)&&(rt=P(rt,K+(rt.key==null||w&&w.key===rt.key?"":(""+rt.key).replace(et,"$&/")+"/")+ht)),U.push(rt)),1;ht=0;var Rt=W===""?".":W+":";if(at(w))for(var At=0;At<w.length;At++)W=w[At],dt=Rt+ot(W,At),ht+=M(W,U,K,dt,rt);else if(At=H(w),typeof At=="function")for(w=At.call(w),At=0;!(W=w.next()).done;)W=W.value,dt=Rt+ot(W,At++),ht+=M(W,U,K,dt,rt);else if(dt==="object"){if(typeof w.then=="function")return M(Yt(w),U,K,W,rt);throw U=String(w),Error("Objects are not valid as a React child (found: "+(U==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":U)+"). If you meant to render a collection of children, use an array instead.")}return ht}function I(w,U,K){if(w==null)return w;var W=[],rt=0;return M(w,W,"","",function(dt){return U.call(K,dt,rt++)}),W}function it(w){if(w._status===-1){var U=w._result;U=U(),U.then(function(K){(w._status===0||w._status===-1)&&(w._status=1,w._result=K)},function(K){(w._status===0||w._status===-1)&&(w._status=2,w._result=K)}),w._status===-1&&(w._status=0,w._result=U)}if(w._status===1)return w._result.default;throw w._result}var Tt=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var U=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(U))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},St={map:I,forEach:function(w,U,K){I(w,function(){U.apply(this,arguments)},K)},count:function(w){var U=0;return I(w,function(){U++}),U},toArray:function(w){return I(w,function(U){return U})||[]},only:function(w){if(!Y(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return ut.Activity=k,ut.Children=St,ut.Component=L,ut.Fragment=d,ut.Profiler=f,ut.PureComponent=N,ut.StrictMode=o,ut.Suspense=m,ut.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,ut.__COMPILER_RUNTIME={__proto__:null,c:function(w){return B.H.useMemoCache(w)}},ut.cache=function(w){return function(){return w.apply(null,arguments)}},ut.cacheSignal=function(){return null},ut.cloneElement=function(w,U,K){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var W=J({},w.props),rt=w.key;if(U!=null)for(dt in U.key!==void 0&&(rt=""+U.key),U)!Q.call(U,dt)||dt==="key"||dt==="__self"||dt==="__source"||dt==="ref"&&U.ref===void 0||(W[dt]=U[dt]);var dt=arguments.length-2;if(dt===1)W.children=K;else if(1<dt){for(var ht=Array(dt),Rt=0;Rt<dt;Rt++)ht[Rt]=arguments[Rt+2];W.children=ht}return q(w.type,rt,W)},ut.createContext=function(w){return w={$$typeof:y,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:h,_context:w},w},ut.createElement=function(w,U,K){var W,rt={},dt=null;if(U!=null)for(W in U.key!==void 0&&(dt=""+U.key),U)Q.call(U,W)&&W!=="key"&&W!=="__self"&&W!=="__source"&&(rt[W]=U[W]);var ht=arguments.length-2;if(ht===1)rt.children=K;else if(1<ht){for(var Rt=Array(ht),At=0;At<ht;At++)Rt[At]=arguments[At+2];rt.children=Rt}if(w&&w.defaultProps)for(W in ht=w.defaultProps,ht)rt[W]===void 0&&(rt[W]=ht[W]);return q(w,dt,rt)},ut.createRef=function(){return{current:null}},ut.forwardRef=function(w){return{$$typeof:S,render:w}},ut.isValidElement=Y,ut.lazy=function(w){return{$$typeof:_,_payload:{_status:-1,_result:w},_init:it}},ut.memo=function(w,U){return{$$typeof:v,type:w,compare:U===void 0?null:U}},ut.startTransition=function(w){var U=B.T,K={};B.T=K;try{var W=w(),rt=B.S;rt!==null&&rt(K,W),typeof W=="object"&&W!==null&&typeof W.then=="function"&&W.then(X,Tt)}catch(dt){Tt(dt)}finally{U!==null&&K.types!==null&&(U.types=K.types),B.T=U}},ut.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},ut.use=function(w){return B.H.use(w)},ut.useActionState=function(w,U,K){return B.H.useActionState(w,U,K)},ut.useCallback=function(w,U){return B.H.useCallback(w,U)},ut.useContext=function(w){return B.H.useContext(w)},ut.useDebugValue=function(){},ut.useDeferredValue=function(w,U){return B.H.useDeferredValue(w,U)},ut.useEffect=function(w,U){return B.H.useEffect(w,U)},ut.useEffectEvent=function(w){return B.H.useEffectEvent(w)},ut.useId=function(){return B.H.useId()},ut.useImperativeHandle=function(w,U,K){return B.H.useImperativeHandle(w,U,K)},ut.useInsertionEffect=function(w,U){return B.H.useInsertionEffect(w,U)},ut.useLayoutEffect=function(w,U){return B.H.useLayoutEffect(w,U)},ut.useMemo=function(w,U){return B.H.useMemo(w,U)},ut.useOptimistic=function(w,U){return B.H.useOptimistic(w,U)},ut.useReducer=function(w,U,K){return B.H.useReducer(w,U,K)},ut.useRef=function(w){return B.H.useRef(w)},ut.useState=function(w){return B.H.useState(w)},ut.useSyncExternalStore=function(w,U,K){return B.H.useSyncExternalStore(w,U,K)},ut.useTransition=function(){return B.H.useTransition()},ut.version="19.2.6",ut}var ph;function iu(){return ph||(ph=1,Ar.exports=tp()),Ar.exports}var lt=iu(),Cr={exports:{}},zl={},_r={exports:{}},Mr={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yh;function ep(){return yh||(yh=1,(function(r){function c(M,I){var it=M.length;M.push(I);t:for(;0<it;){var Tt=it-1>>>1,St=M[Tt];if(0<f(St,I))M[Tt]=I,M[it]=St,it=Tt;else break t}}function d(M){return M.length===0?null:M[0]}function o(M){if(M.length===0)return null;var I=M[0],it=M.pop();if(it!==I){M[0]=it;t:for(var Tt=0,St=M.length,w=St>>>1;Tt<w;){var U=2*(Tt+1)-1,K=M[U],W=U+1,rt=M[W];if(0>f(K,it))W<St&&0>f(rt,K)?(M[Tt]=rt,M[W]=it,Tt=W):(M[Tt]=K,M[U]=it,Tt=U);else if(W<St&&0>f(rt,it))M[Tt]=rt,M[W]=it,Tt=W;else break t}}return I}function f(M,I){var it=M.sortIndex-I.sortIndex;return it!==0?it:M.id-I.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;r.unstable_now=function(){return h.now()}}else{var y=Date,S=y.now();r.unstable_now=function(){return y.now()-S}}var m=[],v=[],_=1,k=null,j=3,H=!1,Z=!1,J=!1,V=!1,L=typeof setTimeout=="function"?setTimeout:null,R=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function G(M){for(var I=d(v);I!==null;){if(I.callback===null)o(v);else if(I.startTime<=M)o(v),I.sortIndex=I.expirationTime,c(m,I);else break;I=d(v)}}function at(M){if(J=!1,G(M),!Z)if(d(m)!==null)Z=!0,X||(X=!0,F());else{var I=d(v);I!==null&&Yt(at,I.startTime-M)}}var X=!1,B=-1,Q=5,q=-1;function P(){return V?!0:!(r.unstable_now()-q<Q)}function Y(){if(V=!1,X){var M=r.unstable_now();q=M;var I=!0;try{t:{Z=!1,J&&(J=!1,R(B),B=-1),H=!0;var it=j;try{e:{for(G(M),k=d(m);k!==null&&!(k.expirationTime>M&&P());){var Tt=k.callback;if(typeof Tt=="function"){k.callback=null,j=k.priorityLevel;var St=Tt(k.expirationTime<=M);if(M=r.unstable_now(),typeof St=="function"){k.callback=St,G(M),I=!0;break e}k===d(m)&&o(m),G(M)}else o(m);k=d(m)}if(k!==null)I=!0;else{var w=d(v);w!==null&&Yt(at,w.startTime-M),I=!1}}break t}finally{k=null,j=it,H=!1}I=void 0}}finally{I?F():X=!1}}}var F;if(typeof N=="function")F=function(){N(Y)};else if(typeof MessageChannel<"u"){var et=new MessageChannel,ot=et.port2;et.port1.onmessage=Y,F=function(){ot.postMessage(null)}}else F=function(){L(Y,0)};function Yt(M,I){B=L(function(){M(r.unstable_now())},I)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(M){M.callback=null},r.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<M?Math.floor(1e3/M):5},r.unstable_getCurrentPriorityLevel=function(){return j},r.unstable_next=function(M){switch(j){case 1:case 2:case 3:var I=3;break;default:I=j}var it=j;j=I;try{return M()}finally{j=it}},r.unstable_requestPaint=function(){V=!0},r.unstable_runWithPriority=function(M,I){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var it=j;j=M;try{return I()}finally{j=it}},r.unstable_scheduleCallback=function(M,I,it){var Tt=r.unstable_now();switch(typeof it=="object"&&it!==null?(it=it.delay,it=typeof it=="number"&&0<it?Tt+it:Tt):it=Tt,M){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=it+St,M={id:_++,callback:I,priorityLevel:M,startTime:it,expirationTime:St,sortIndex:-1},it>Tt?(M.sortIndex=it,c(v,M),d(m)===null&&M===d(v)&&(J?(R(B),B=-1):J=!0,Yt(at,it-Tt))):(M.sortIndex=St,c(m,M),Z||H||(Z=!0,X||(X=!0,F()))),M},r.unstable_shouldYield=P,r.unstable_wrapCallback=function(M){var I=j;return function(){var it=j;j=I;try{return M.apply(this,arguments)}finally{j=it}}}})(Mr)),Mr}var vh;function np(){return vh||(vh=1,_r.exports=ep()),_r.exports}var Dr={exports:{}},Pt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bh;function ap(){if(bh)return Pt;bh=1;var r=iu();function c(m){var v="https://react.dev/errors/"+m;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)v+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(){}var o={d:{f:d,r:function(){throw Error(c(522))},D:d,C:d,L:d,m:d,X:d,S:d,M:d},p:0,findDOMNode:null},f=Symbol.for("react.portal");function h(m,v,_){var k=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:f,key:k==null?null:""+k,children:m,containerInfo:v,implementation:_}}var y=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function S(m,v){if(m==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,Pt.createPortal=function(m,v){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(c(299));return h(m,v,null,_)},Pt.flushSync=function(m){var v=y.T,_=o.p;try{if(y.T=null,o.p=2,m)return m()}finally{y.T=v,o.p=_,o.d.f()}},Pt.preconnect=function(m,v){typeof m=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,o.d.C(m,v))},Pt.prefetchDNS=function(m){typeof m=="string"&&o.d.D(m)},Pt.preinit=function(m,v){if(typeof m=="string"&&v&&typeof v.as=="string"){var _=v.as,k=S(_,v.crossOrigin),j=typeof v.integrity=="string"?v.integrity:void 0,H=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;_==="style"?o.d.S(m,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:k,integrity:j,fetchPriority:H}):_==="script"&&o.d.X(m,{crossOrigin:k,integrity:j,fetchPriority:H,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},Pt.preinitModule=function(m,v){if(typeof m=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var _=S(v.as,v.crossOrigin);o.d.M(m,{crossOrigin:_,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&o.d.M(m)},Pt.preload=function(m,v){if(typeof m=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var _=v.as,k=S(_,v.crossOrigin);o.d.L(m,_,{crossOrigin:k,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},Pt.preloadModule=function(m,v){if(typeof m=="string")if(v){var _=S(v.as,v.crossOrigin);o.d.m(m,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:_,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else o.d.m(m)},Pt.requestFormReset=function(m){o.d.r(m)},Pt.unstable_batchedUpdates=function(m,v){return m(v)},Pt.useFormState=function(m,v,_){return y.H.useFormState(m,v,_)},Pt.useFormStatus=function(){return y.H.useHostTransitionStatus()},Pt.version="19.2.6",Pt}var wh;function lp(){if(wh)return Dr.exports;wh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(c){console.error(c)}}return r(),Dr.exports=ap(),Dr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sh;function ip(){if(Sh)return zl;Sh=1;var r=np(),c=iu(),d=lp();function o(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function h(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function y(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function S(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function m(t){if(h(t)!==t)throw Error(o(188))}function v(t){var e=t.alternate;if(!e){if(e=h(t),e===null)throw Error(o(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return m(l),t;if(i===a)return m(l),e;i=i.sibling}throw Error(o(188))}if(n.return!==a.return)n=l,a=i;else{for(var s=!1,u=l.child;u;){if(u===n){s=!0,n=l,a=i;break}if(u===a){s=!0,a=l,n=i;break}u=u.sibling}if(!s){for(u=i.child;u;){if(u===n){s=!0,n=i,a=l;break}if(u===a){s=!0,a=i,n=l;break}u=u.sibling}if(!s)throw Error(o(189))}}if(n.alternate!==a)throw Error(o(190))}if(n.tag!==3)throw Error(o(188));return n.stateNode.current===n?t:e}function _(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=_(t),e!==null)return e;t=t.sibling}return null}var k=Object.assign,j=Symbol.for("react.element"),H=Symbol.for("react.transitional.element"),Z=Symbol.for("react.portal"),J=Symbol.for("react.fragment"),V=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),R=Symbol.for("react.consumer"),N=Symbol.for("react.context"),G=Symbol.for("react.forward_ref"),at=Symbol.for("react.suspense"),X=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),Q=Symbol.for("react.lazy"),q=Symbol.for("react.activity"),P=Symbol.for("react.memo_cache_sentinel"),Y=Symbol.iterator;function F(t){return t===null||typeof t!="object"?null:(t=Y&&t[Y]||t["@@iterator"],typeof t=="function"?t:null)}var et=Symbol.for("react.client.reference");function ot(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===et?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case J:return"Fragment";case L:return"Profiler";case V:return"StrictMode";case at:return"Suspense";case X:return"SuspenseList";case q:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Z:return"Portal";case N:return t.displayName||"Context";case R:return(t._context.displayName||"Context")+".Consumer";case G:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case B:return e=t.displayName||null,e!==null?e:ot(t.type)||"Memo";case Q:e=t._payload,t=t._init;try{return ot(t(e))}catch{}}return null}var Yt=Array.isArray,M=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,it={pending:!1,data:null,method:null,action:null},Tt=[],St=-1;function w(t){return{current:t}}function U(t){0>St||(t.current=Tt[St],Tt[St]=null,St--)}function K(t,e){St++,Tt[St]=t.current,t.current=e}var W=w(null),rt=w(null),dt=w(null),ht=w(null);function Rt(t,e){switch(K(dt,e),K(rt,t),K(W,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?jd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=jd(e),t=Hd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}U(W),K(W,t)}function At(){U(W),U(rt),U(dt)}function je(t){t.memoizedState!==null&&K(ht,t);var e=W.current,n=Hd(e,t.type);e!==n&&(K(rt,t),K(W,n))}function jl(t){rt.current===t&&(U(W),U(rt)),ht.current===t&&(U(ht),_l._currentValue=it)}var ss,fu;function Mn(t){if(ss===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);ss=e&&e[1]||"",fu=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ss+t+fu}var os=!1;function rs(t,e){if(!t||os)return"";os=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var O=function(){throw Error()};if(Object.defineProperty(O.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(O,[])}catch(C){var A=C}Reflect.construct(t,[],O)}else{try{O.call()}catch(C){A=C}t.call(O.prototype)}}else{try{throw Error()}catch(C){A=C}(O=t())&&typeof O.catch=="function"&&O.catch(function(){})}}catch(C){if(C&&A&&typeof C.stack=="string")return[C.stack,A.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),s=i[0],u=i[1];if(s&&u){var p=s.split(`
`),E=u.split(`
`);for(l=a=0;a<p.length&&!p[a].includes("DetermineComponentFrameRoot");)a++;for(;l<E.length&&!E[l].includes("DetermineComponentFrameRoot");)l++;if(a===p.length||l===E.length)for(a=p.length-1,l=E.length-1;1<=a&&0<=l&&p[a]!==E[l];)l--;for(;1<=a&&0<=l;a--,l--)if(p[a]!==E[l]){if(a!==1||l!==1)do if(a--,l--,0>l||p[a]!==E[l]){var D=`
`+p[a].replace(" at new "," at ");return t.displayName&&D.includes("<anonymous>")&&(D=D.replace("<anonymous>",t.displayName)),D}while(1<=a&&0<=l);break}}}finally{os=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Mn(n):""}function _g(t,e){switch(t.tag){case 26:case 27:case 5:return Mn(t.type);case 16:return Mn("Lazy");case 13:return t.child!==e&&e!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return rs(t.type,!1);case 11:return rs(t.type.render,!1);case 1:return rs(t.type,!0);case 31:return Mn("Activity");default:return""}}function du(t){try{var e="",n=null;do e+=_g(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var us=Object.prototype.hasOwnProperty,cs=r.unstable_scheduleCallback,fs=r.unstable_cancelCallback,Mg=r.unstable_shouldYield,Dg=r.unstable_requestPaint,re=r.unstable_now,Rg=r.unstable_getCurrentPriorityLevel,hu=r.unstable_ImmediatePriority,gu=r.unstable_UserBlockingPriority,Hl=r.unstable_NormalPriority,kg=r.unstable_LowPriority,mu=r.unstable_IdlePriority,zg=r.log,Og=r.unstable_setDisableYieldValue,Ya=null,ue=null;function nn(t){if(typeof zg=="function"&&Og(t),ue&&typeof ue.setStrictMode=="function")try{ue.setStrictMode(Ya,t)}catch{}}var ce=Math.clz32?Math.clz32:Hg,Ug=Math.log,jg=Math.LN2;function Hg(t){return t>>>=0,t===0?32:31-(Ug(t)/jg|0)|0}var Bl=256,Ll=262144,Yl=4194304;function Dn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ql(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,s=t.pingedLanes;t=t.warmLanes;var u=a&134217727;return u!==0?(a=u&~i,a!==0?l=Dn(a):(s&=u,s!==0?l=Dn(s):n||(n=u&~t,n!==0&&(l=Dn(n))))):(u=a&~i,u!==0?l=Dn(u):s!==0?l=Dn(s):n||(n=a&~t,n!==0&&(l=Dn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function qa(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Bg(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pu(){var t=Yl;return Yl<<=1,(Yl&62914560)===0&&(Yl=4194304),t}function ds(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ga(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Lg(t,e,n,a,l,i){var s=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var u=t.entanglements,p=t.expirationTimes,E=t.hiddenUpdates;for(n=s&~n;0<n;){var D=31-ce(n),O=1<<D;u[D]=0,p[D]=-1;var A=E[D];if(A!==null)for(E[D]=null,D=0;D<A.length;D++){var C=A[D];C!==null&&(C.lane&=-536870913)}n&=~O}a!==0&&yu(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(s&~e))}function yu(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-ce(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function vu(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-ce(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function bu(t,e){var n=e&-e;return n=(n&42)!==0?1:hs(n),(n&(t.suspendedLanes|e))!==0?0:n}function hs(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function gs(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function wu(){var t=I.p;return t!==0?t:(t=window.event,t===void 0?32:sh(t.type))}function Su(t,e){var n=I.p;try{return I.p=t,e()}finally{I.p=n}}var an=Math.random().toString(36).slice(2),It="__reactFiber$"+an,ee="__reactProps$"+an,Pn="__reactContainer$"+an,ms="__reactEvents$"+an,Yg="__reactListeners$"+an,qg="__reactHandles$"+an,xu="__reactResources$"+an,Xa="__reactMarker$"+an;function ps(t){delete t[It],delete t[ee],delete t[ms],delete t[Yg],delete t[qg]}function ta(t){var e=t[It];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Pn]||n[It]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Vd(t);t!==null;){if(n=t[It])return n;t=Vd(t)}return e}t=n,n=t.parentNode}return null}function ea(t){if(t=t[It]||t[Pn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Va(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(o(33))}function na(t){var e=t[xu];return e||(e=t[xu]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Kt(t){t[Xa]=!0}var Tu=new Set,Eu={};function Rn(t,e){aa(t,e),aa(t+"Capture",e)}function aa(t,e){for(Eu[t]=e,t=0;t<e.length;t++)Tu.add(e[t])}var Gg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Nu={},Au={};function Xg(t){return us.call(Au,t)?!0:us.call(Nu,t)?!1:Gg.test(t)?Au[t]=!0:(Nu[t]=!0,!1)}function Gl(t,e,n){if(Xg(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Xl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function He(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ve(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Cu(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Vg(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(s){n=""+s,i.call(this,s)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ys(t){if(!t._valueTracker){var e=Cu(t)?"checked":"value";t._valueTracker=Vg(t,e,""+t[e])}}function _u(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=Cu(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Vl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Qg=/[\n"\\]/g;function be(t){return t.replace(Qg,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function vs(t,e,n,a,l,i,s,u){t.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?t.type=s:t.removeAttribute("type"),e!=null?s==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ve(e)):t.value!==""+ve(e)&&(t.value=""+ve(e)):s!=="submit"&&s!=="reset"||t.removeAttribute("value"),e!=null?bs(t,s,ve(e)):n!=null?bs(t,s,ve(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.name=""+ve(u):t.removeAttribute("name")}function Mu(t,e,n,a,l,i,s,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){ys(t);return}n=n!=null?""+ve(n):"",e=e!=null?""+ve(e):n,u||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=u?t.checked:!!a,t.defaultChecked=!!a,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.name=s),ys(t)}function bs(t,e,n){e==="number"&&Vl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function la(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ve(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function Du(t,e,n){if(e!=null&&(e=""+ve(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ve(n):""}function Ru(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(o(92));if(Yt(a)){if(1<a.length)throw Error(o(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ve(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),ys(t)}function ia(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Kg=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function ku(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||Kg.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function zu(t,e,n){if(e!=null&&typeof e!="object")throw Error(o(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&ku(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&ku(t,i,e[i])}function ws(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Zg=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ig=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ql(t){return Ig.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Be(){}var Ss=null;function xs(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var sa=null,oa=null;function Ou(t){var e=ea(t);if(e&&(t=e.stateNode)){var n=t[ee]||null;t:switch(t=e.stateNode,e.type){case"input":if(vs(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[ee]||null;if(!l)throw Error(o(90));vs(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&_u(a)}break t;case"textarea":Du(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&la(t,!!n.multiple,e,!1)}}}var Ts=!1;function Uu(t,e,n){if(Ts)return t(e,n);Ts=!0;try{var a=t(e);return a}finally{if(Ts=!1,(sa!==null||oa!==null)&&(ki(),sa&&(e=sa,t=oa,oa=sa=null,Ou(e),t)))for(e=0;e<t.length;e++)Ou(t[e])}}function Qa(t,e){var n=t.stateNode;if(n===null)return null;var a=n[ee]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(o(231,e,typeof n));return n}var Le=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Es=!1;if(Le)try{var Ka={};Object.defineProperty(Ka,"passive",{get:function(){Es=!0}}),window.addEventListener("test",Ka,Ka),window.removeEventListener("test",Ka,Ka)}catch{Es=!1}var ln=null,Ns=null,Kl=null;function ju(){if(Kl)return Kl;var t,e=Ns,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var s=n-t;for(a=1;a<=s&&e[n-a]===l[i-a];a++);return Kl=l.slice(t,1<a?1-a:void 0)}function Zl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Il(){return!0}function Hu(){return!1}function ne(t){function e(n,a,l,i,s){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(n=t[u],this[u]=n?n(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Il:Hu,this.isPropagationStopped=Hu,this}return k(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Il)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Il)},persist:function(){},isPersistent:Il}),e}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=ne(kn),Za=k({},kn,{view:0,detail:0}),Jg=ne(Za),As,Cs,Ia,Fl=k({},Za,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ms,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ia&&(Ia&&t.type==="mousemove"?(As=t.screenX-Ia.screenX,Cs=t.screenY-Ia.screenY):Cs=As=0,Ia=t),As)},movementY:function(t){return"movementY"in t?t.movementY:Cs}}),Bu=ne(Fl),Fg=k({},Fl,{dataTransfer:0}),$g=ne(Fg),Wg=k({},Za,{relatedTarget:0}),_s=ne(Wg),Pg=k({},kn,{animationName:0,elapsedTime:0,pseudoElement:0}),tm=ne(Pg),em=k({},kn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),nm=ne(em),am=k({},kn,{data:0}),Lu=ne(am),lm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},im={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function om(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=sm[t])?!!e[t]:!1}function Ms(){return om}var rm=k({},Za,{key:function(t){if(t.key){var e=lm[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?im[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ms,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),um=ne(rm),cm=k({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Yu=ne(cm),fm=k({},Za,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ms}),dm=ne(fm),hm=k({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0}),gm=ne(hm),mm=k({},Fl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),pm=ne(mm),ym=k({},kn,{newState:0,oldState:0}),vm=ne(ym),bm=[9,13,27,32],Ds=Le&&"CompositionEvent"in window,Ja=null;Le&&"documentMode"in document&&(Ja=document.documentMode);var wm=Le&&"TextEvent"in window&&!Ja,qu=Le&&(!Ds||Ja&&8<Ja&&11>=Ja),Gu=" ",Xu=!1;function Vu(t,e){switch(t){case"keyup":return bm.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qu(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ra=!1;function Sm(t,e){switch(t){case"compositionend":return Qu(e);case"keypress":return e.which!==32?null:(Xu=!0,Gu);case"textInput":return t=e.data,t===Gu&&Xu?null:t;default:return null}}function xm(t,e){if(ra)return t==="compositionend"||!Ds&&Vu(t,e)?(t=ju(),Kl=Ns=ln=null,ra=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return qu&&e.locale!=="ko"?null:e.data;default:return null}}var Tm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ku(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Tm[t.type]:e==="textarea"}function Zu(t,e,n,a){sa?oa?oa.push(a):oa=[a]:sa=a,e=Li(e,"onChange"),0<e.length&&(n=new Jl("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Fa=null,$a=null;function Em(t){Dd(t,0)}function $l(t){var e=Va(t);if(_u(e))return t}function Iu(t,e){if(t==="change")return e}var Ju=!1;if(Le){var Rs;if(Le){var ks="oninput"in document;if(!ks){var Fu=document.createElement("div");Fu.setAttribute("oninput","return;"),ks=typeof Fu.oninput=="function"}Rs=ks}else Rs=!1;Ju=Rs&&(!document.documentMode||9<document.documentMode)}function $u(){Fa&&(Fa.detachEvent("onpropertychange",Wu),$a=Fa=null)}function Wu(t){if(t.propertyName==="value"&&$l($a)){var e=[];Zu(e,$a,t,xs(t)),Uu(Em,e)}}function Nm(t,e,n){t==="focusin"?($u(),Fa=e,$a=n,Fa.attachEvent("onpropertychange",Wu)):t==="focusout"&&$u()}function Am(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return $l($a)}function Cm(t,e){if(t==="click")return $l(e)}function _m(t,e){if(t==="input"||t==="change")return $l(e)}function Mm(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var fe=typeof Object.is=="function"?Object.is:Mm;function Wa(t,e){if(fe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!us.call(e,l)||!fe(t[l],e[l]))return!1}return!0}function Pu(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function tc(t,e){var n=Pu(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Pu(n)}}function ec(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?ec(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function nc(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Vl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Vl(t.document)}return e}function zs(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Dm=Le&&"documentMode"in document&&11>=document.documentMode,ua=null,Os=null,Pa=null,Us=!1;function ac(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Us||ua==null||ua!==Vl(a)||(a=ua,"selectionStart"in a&&zs(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Pa&&Wa(Pa,a)||(Pa=a,a=Li(Os,"onSelect"),0<a.length&&(e=new Jl("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=ua)))}function zn(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ca={animationend:zn("Animation","AnimationEnd"),animationiteration:zn("Animation","AnimationIteration"),animationstart:zn("Animation","AnimationStart"),transitionrun:zn("Transition","TransitionRun"),transitionstart:zn("Transition","TransitionStart"),transitioncancel:zn("Transition","TransitionCancel"),transitionend:zn("Transition","TransitionEnd")},js={},lc={};Le&&(lc=document.createElement("div").style,"AnimationEvent"in window||(delete ca.animationend.animation,delete ca.animationiteration.animation,delete ca.animationstart.animation),"TransitionEvent"in window||delete ca.transitionend.transition);function On(t){if(js[t])return js[t];if(!ca[t])return t;var e=ca[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in lc)return js[t]=e[n];return t}var ic=On("animationend"),sc=On("animationiteration"),oc=On("animationstart"),Rm=On("transitionrun"),km=On("transitionstart"),zm=On("transitioncancel"),rc=On("transitionend"),uc=new Map,Hs="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Hs.push("scrollEnd");function _e(t,e){uc.set(t,e),Rn(e,[t])}var Wl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},we=[],fa=0,Bs=0;function Pl(){for(var t=fa,e=Bs=fa=0;e<t;){var n=we[e];we[e++]=null;var a=we[e];we[e++]=null;var l=we[e];we[e++]=null;var i=we[e];if(we[e++]=null,a!==null&&l!==null){var s=a.pending;s===null?l.next=l:(l.next=s.next,s.next=l),a.pending=l}i!==0&&cc(n,l,i)}}function ti(t,e,n,a){we[fa++]=t,we[fa++]=e,we[fa++]=n,we[fa++]=a,Bs|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Ls(t,e,n,a){return ti(t,e,n,a),ei(t)}function Un(t,e){return ti(t,null,null,e),ei(t)}function cc(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-ce(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function ei(t){if(50<Sl)throw Sl=0,Jo=null,Error(o(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var da={};function Om(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function de(t,e,n,a){return new Om(t,e,n,a)}function Ys(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ye(t,e){var n=t.alternate;return n===null?(n=de(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function fc(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ni(t,e,n,a,l,i){var s=0;if(a=t,typeof t=="function")Ys(t)&&(s=1);else if(typeof t=="string")s=L0(t,n,W.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case q:return t=de(31,n,e,l),t.elementType=q,t.lanes=i,t;case J:return jn(n.children,l,i,e);case V:s=8,l|=24;break;case L:return t=de(12,n,e,l|2),t.elementType=L,t.lanes=i,t;case at:return t=de(13,n,e,l),t.elementType=at,t.lanes=i,t;case X:return t=de(19,n,e,l),t.elementType=X,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case N:s=10;break t;case R:s=9;break t;case G:s=11;break t;case B:s=14;break t;case Q:s=16,a=null;break t}s=29,n=Error(o(130,t===null?"null":typeof t,"")),a=null}return e=de(s,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function jn(t,e,n,a){return t=de(7,t,a,e),t.lanes=n,t}function qs(t,e,n){return t=de(6,t,null,e),t.lanes=n,t}function dc(t){var e=de(18,null,null,0);return e.stateNode=t,e}function Gs(t,e,n){return e=de(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var hc=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=hc.get(t);return n!==void 0?n:(e={value:t,source:e,stack:du(e)},hc.set(t,e),e)}return{value:t,source:e,stack:du(e)}}var ha=[],ga=0,ai=null,tl=0,xe=[],Te=0,sn=null,Re=1,ke="";function qe(t,e){ha[ga++]=tl,ha[ga++]=ai,ai=t,tl=e}function gc(t,e,n){xe[Te++]=Re,xe[Te++]=ke,xe[Te++]=sn,sn=t;var a=Re;t=ke;var l=32-ce(a)-1;a&=~(1<<l),n+=1;var i=32-ce(e)+l;if(30<i){var s=l-l%5;i=(a&(1<<s)-1).toString(32),a>>=s,l-=s,Re=1<<32-ce(e)+l|n<<l|a,ke=i+t}else Re=1<<i|n<<l|a,ke=t}function Xs(t){t.return!==null&&(qe(t,1),gc(t,1,0))}function Vs(t){for(;t===ai;)ai=ha[--ga],ha[ga]=null,tl=ha[--ga],ha[ga]=null;for(;t===sn;)sn=xe[--Te],xe[Te]=null,ke=xe[--Te],xe[Te]=null,Re=xe[--Te],xe[Te]=null}function mc(t,e){xe[Te++]=Re,xe[Te++]=ke,xe[Te++]=sn,Re=e.id,ke=e.overflow,sn=t}var Jt=null,kt=null,vt=!1,on=null,Ee=!1,Qs=Error(o(519));function rn(t){var e=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw el(Se(e,t)),Qs}function pc(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[It]=t,e[ee]=a,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<Tl.length;n++)mt(Tl[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),Mu(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),Ru(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||Od(e.textContent,n)?(a.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),a.onScroll!=null&&mt("scroll",e),a.onScrollEnd!=null&&mt("scrollend",e),a.onClick!=null&&(e.onclick=Be),e=!0):e=!1,e||rn(t,!0)}function yc(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:Ee=!1;return;case 27:case 3:Ee=!0;return;default:Jt=Jt.return}}function ma(t){if(t!==Jt)return!1;if(!vt)return yc(t),vt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||cr(t.type,t.memoizedProps)),n=!n),n&&kt&&rn(t),yc(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));kt=Xd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));kt=Xd(t)}else e===27?(e=kt,xn(t.type)?(t=mr,mr=null,kt=t):kt=e):kt=Jt?Ae(t.stateNode.nextSibling):null;return!0}function Hn(){kt=Jt=null,vt=!1}function Ks(){var t=on;return t!==null&&(se===null?se=t:se.push.apply(se,t),on=null),t}function el(t){on===null?on=[t]:on.push(t)}var Zs=w(null),Bn=null,Ge=null;function un(t,e,n){K(Zs,e._currentValue),e._currentValue=n}function Xe(t){t._currentValue=Zs.current,U(Zs)}function Is(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Js(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var s=l.child;i=i.firstContext;t:for(;i!==null;){var u=i;i=l;for(var p=0;p<e.length;p++)if(u.context===e[p]){i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Is(i.return,n,t),a||(s=null);break t}i=u.next}}else if(l.tag===18){if(s=l.return,s===null)throw Error(o(341));s.lanes|=n,i=s.alternate,i!==null&&(i.lanes|=n),Is(s,n,t),s=null}else s=l.child;if(s!==null)s.return=l;else for(s=l;s!==null;){if(s===t){s=null;break}if(l=s.sibling,l!==null){l.return=s.return,s=l;break}s=s.return}l=s}}function pa(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var s=l.alternate;if(s===null)throw Error(o(387));if(s=s.memoizedProps,s!==null){var u=l.type;fe(l.pendingProps.value,s.value)||(t!==null?t.push(u):t=[u])}}else if(l===ht.current){if(s=l.alternate,s===null)throw Error(o(387));s.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(_l):t=[_l])}l=l.return}t!==null&&Js(e,t,n,a),e.flags|=262144}function li(t){for(t=t.firstContext;t!==null;){if(!fe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ln(t){Bn=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ft(t){return vc(Bn,t)}function ii(t,e){return Bn===null&&Ln(t),vc(t,e)}function vc(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ge===null){if(t===null)throw Error(o(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return n}var Um=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},jm=r.unstable_scheduleCallback,Hm=r.unstable_NormalPriority,qt={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Fs(){return{controller:new Um,data:new Map,refCount:0}}function nl(t){t.refCount--,t.refCount===0&&jm(Hm,function(){t.controller.abort()})}var al=null,$s=0,ya=0,va=null;function Bm(t,e){if(al===null){var n=al=[];$s=0,ya=er(),va={status:"pending",value:void 0,then:function(a){n.push(a)}}}return $s++,e.then(bc,bc),e}function bc(){if(--$s===0&&al!==null){va!==null&&(va.status="fulfilled");var t=al;al=null,ya=0,va=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Lm(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var wc=M.S;M.S=function(t,e){ld=re(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Bm(t,e),wc!==null&&wc(t,e)};var Yn=w(null);function Ws(){var t=Yn.current;return t!==null?t:Dt.pooledCache}function si(t,e){e===null?K(Yn,Yn.current):K(Yn,e.pool)}function Sc(){var t=Ws();return t===null?null:{parent:qt._currentValue,pool:t}}var ba=Error(o(460)),Ps=Error(o(474)),oi=Error(o(542)),ri={then:function(){}};function xc(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Tc(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Be,Be),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Nc(t),t;default:if(typeof e.status=="string")e.then(Be,Be);else{if(t=Dt,t!==null&&100<t.shellSuspendCounter)throw Error(o(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Nc(t),t}throw Gn=e,ba}}function qn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gn=n,ba):n}}var Gn=null;function Ec(){if(Gn===null)throw Error(o(459));var t=Gn;return Gn=null,t}function Nc(t){if(t===ba||t===oi)throw Error(o(483))}var wa=null,ll=0;function ui(t){var e=ll;return ll+=1,wa===null&&(wa=[]),Tc(wa,t,e)}function il(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ci(t,e){throw e.$$typeof===j?Error(o(525)):(t=Object.prototype.toString.call(e),Error(o(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Ac(t){function e(x,b){if(t){var T=x.deletions;T===null?(x.deletions=[b],x.flags|=16):T.push(b)}}function n(x,b){if(!t)return null;for(;b!==null;)e(x,b),b=b.sibling;return null}function a(x){for(var b=new Map;x!==null;)x.key!==null?b.set(x.key,x):b.set(x.index,x),x=x.sibling;return b}function l(x,b){return x=Ye(x,b),x.index=0,x.sibling=null,x}function i(x,b,T){return x.index=T,t?(T=x.alternate,T!==null?(T=T.index,T<b?(x.flags|=67108866,b):T):(x.flags|=67108866,b)):(x.flags|=1048576,b)}function s(x){return t&&x.alternate===null&&(x.flags|=67108866),x}function u(x,b,T,z){return b===null||b.tag!==6?(b=qs(T,x.mode,z),b.return=x,b):(b=l(b,T),b.return=x,b)}function p(x,b,T,z){var nt=T.type;return nt===J?D(x,b,T.props.children,z,T.key):b!==null&&(b.elementType===nt||typeof nt=="object"&&nt!==null&&nt.$$typeof===Q&&qn(nt)===b.type)?(b=l(b,T.props),il(b,T),b.return=x,b):(b=ni(T.type,T.key,T.props,null,x.mode,z),il(b,T),b.return=x,b)}function E(x,b,T,z){return b===null||b.tag!==4||b.stateNode.containerInfo!==T.containerInfo||b.stateNode.implementation!==T.implementation?(b=Gs(T,x.mode,z),b.return=x,b):(b=l(b,T.children||[]),b.return=x,b)}function D(x,b,T,z,nt){return b===null||b.tag!==7?(b=jn(T,x.mode,z,nt),b.return=x,b):(b=l(b,T),b.return=x,b)}function O(x,b,T){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return b=qs(""+b,x.mode,T),b.return=x,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case H:return T=ni(b.type,b.key,b.props,null,x.mode,T),il(T,b),T.return=x,T;case Z:return b=Gs(b,x.mode,T),b.return=x,b;case Q:return b=qn(b),O(x,b,T)}if(Yt(b)||F(b))return b=jn(b,x.mode,T,null),b.return=x,b;if(typeof b.then=="function")return O(x,ui(b),T);if(b.$$typeof===N)return O(x,ii(x,b),T);ci(x,b)}return null}function A(x,b,T,z){var nt=b!==null?b.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return nt!==null?null:u(x,b,""+T,z);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case H:return T.key===nt?p(x,b,T,z):null;case Z:return T.key===nt?E(x,b,T,z):null;case Q:return T=qn(T),A(x,b,T,z)}if(Yt(T)||F(T))return nt!==null?null:D(x,b,T,z,null);if(typeof T.then=="function")return A(x,b,ui(T),z);if(T.$$typeof===N)return A(x,b,ii(x,T),z);ci(x,T)}return null}function C(x,b,T,z,nt){if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return x=x.get(T)||null,u(b,x,""+z,nt);if(typeof z=="object"&&z!==null){switch(z.$$typeof){case H:return x=x.get(z.key===null?T:z.key)||null,p(b,x,z,nt);case Z:return x=x.get(z.key===null?T:z.key)||null,E(b,x,z,nt);case Q:return z=qn(z),C(x,b,T,z,nt)}if(Yt(z)||F(z))return x=x.get(T)||null,D(b,x,z,nt,null);if(typeof z.then=="function")return C(x,b,T,ui(z),nt);if(z.$$typeof===N)return C(x,b,T,ii(b,z),nt);ci(b,z)}return null}function $(x,b,T,z){for(var nt=null,bt=null,tt=b,ft=b=0,yt=null;tt!==null&&ft<T.length;ft++){tt.index>ft?(yt=tt,tt=null):yt=tt.sibling;var wt=A(x,tt,T[ft],z);if(wt===null){tt===null&&(tt=yt);break}t&&tt&&wt.alternate===null&&e(x,tt),b=i(wt,b,ft),bt===null?nt=wt:bt.sibling=wt,bt=wt,tt=yt}if(ft===T.length)return n(x,tt),vt&&qe(x,ft),nt;if(tt===null){for(;ft<T.length;ft++)tt=O(x,T[ft],z),tt!==null&&(b=i(tt,b,ft),bt===null?nt=tt:bt.sibling=tt,bt=tt);return vt&&qe(x,ft),nt}for(tt=a(tt);ft<T.length;ft++)yt=C(tt,x,ft,T[ft],z),yt!==null&&(t&&yt.alternate!==null&&tt.delete(yt.key===null?ft:yt.key),b=i(yt,b,ft),bt===null?nt=yt:bt.sibling=yt,bt=yt);return t&&tt.forEach(function(Cn){return e(x,Cn)}),vt&&qe(x,ft),nt}function st(x,b,T,z){if(T==null)throw Error(o(151));for(var nt=null,bt=null,tt=b,ft=b=0,yt=null,wt=T.next();tt!==null&&!wt.done;ft++,wt=T.next()){tt.index>ft?(yt=tt,tt=null):yt=tt.sibling;var Cn=A(x,tt,wt.value,z);if(Cn===null){tt===null&&(tt=yt);break}t&&tt&&Cn.alternate===null&&e(x,tt),b=i(Cn,b,ft),bt===null?nt=Cn:bt.sibling=Cn,bt=Cn,tt=yt}if(wt.done)return n(x,tt),vt&&qe(x,ft),nt;if(tt===null){for(;!wt.done;ft++,wt=T.next())wt=O(x,wt.value,z),wt!==null&&(b=i(wt,b,ft),bt===null?nt=wt:bt.sibling=wt,bt=wt);return vt&&qe(x,ft),nt}for(tt=a(tt);!wt.done;ft++,wt=T.next())wt=C(tt,x,ft,wt.value,z),wt!==null&&(t&&wt.alternate!==null&&tt.delete(wt.key===null?ft:wt.key),b=i(wt,b,ft),bt===null?nt=wt:bt.sibling=wt,bt=wt);return t&&tt.forEach(function(F0){return e(x,F0)}),vt&&qe(x,ft),nt}function Mt(x,b,T,z){if(typeof T=="object"&&T!==null&&T.type===J&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case H:t:{for(var nt=T.key;b!==null;){if(b.key===nt){if(nt=T.type,nt===J){if(b.tag===7){n(x,b.sibling),z=l(b,T.props.children),z.return=x,x=z;break t}}else if(b.elementType===nt||typeof nt=="object"&&nt!==null&&nt.$$typeof===Q&&qn(nt)===b.type){n(x,b.sibling),z=l(b,T.props),il(z,T),z.return=x,x=z;break t}n(x,b);break}else e(x,b);b=b.sibling}T.type===J?(z=jn(T.props.children,x.mode,z,T.key),z.return=x,x=z):(z=ni(T.type,T.key,T.props,null,x.mode,z),il(z,T),z.return=x,x=z)}return s(x);case Z:t:{for(nt=T.key;b!==null;){if(b.key===nt)if(b.tag===4&&b.stateNode.containerInfo===T.containerInfo&&b.stateNode.implementation===T.implementation){n(x,b.sibling),z=l(b,T.children||[]),z.return=x,x=z;break t}else{n(x,b);break}else e(x,b);b=b.sibling}z=Gs(T,x.mode,z),z.return=x,x=z}return s(x);case Q:return T=qn(T),Mt(x,b,T,z)}if(Yt(T))return $(x,b,T,z);if(F(T)){if(nt=F(T),typeof nt!="function")throw Error(o(150));return T=nt.call(T),st(x,b,T,z)}if(typeof T.then=="function")return Mt(x,b,ui(T),z);if(T.$$typeof===N)return Mt(x,b,ii(x,T),z);ci(x,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,b!==null&&b.tag===6?(n(x,b.sibling),z=l(b,T),z.return=x,x=z):(n(x,b),z=qs(T,x.mode,z),z.return=x,x=z),s(x)):n(x,b)}return function(x,b,T,z){try{ll=0;var nt=Mt(x,b,T,z);return wa=null,nt}catch(tt){if(tt===ba||tt===oi)throw tt;var bt=de(29,tt,null,x.mode);return bt.lanes=z,bt.return=x,bt}finally{}}}var Xn=Ac(!0),Cc=Ac(!1),cn=!1;function to(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function eo(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(xt&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=ei(t),cc(t,null,n),e}return ti(t,a,e,n),ei(t)}function sl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,vu(t,n)}}function no(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var s={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=s:i=i.next=s,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var ao=!1;function ol(){if(ao){var t=va;if(t!==null)throw t}}function rl(t,e,n,a){ao=!1;var l=t.updateQueue;cn=!1;var i=l.firstBaseUpdate,s=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var p=u,E=p.next;p.next=null,s===null?i=E:s.next=E,s=p;var D=t.alternate;D!==null&&(D=D.updateQueue,u=D.lastBaseUpdate,u!==s&&(u===null?D.firstBaseUpdate=E:u.next=E,D.lastBaseUpdate=p))}if(i!==null){var O=l.baseState;s=0,D=E=p=null,u=i;do{var A=u.lane&-536870913,C=A!==u.lane;if(C?(pt&A)===A:(a&A)===A){A!==0&&A===ya&&(ao=!0),D!==null&&(D=D.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});t:{var $=t,st=u;A=e;var Mt=n;switch(st.tag){case 1:if($=st.payload,typeof $=="function"){O=$.call(Mt,O,A);break t}O=$;break t;case 3:$.flags=$.flags&-65537|128;case 0:if($=st.payload,A=typeof $=="function"?$.call(Mt,O,A):$,A==null)break t;O=k({},O,A);break t;case 2:cn=!0}}A=u.callback,A!==null&&(t.flags|=64,C&&(t.flags|=8192),C=l.callbacks,C===null?l.callbacks=[A]:C.push(A))}else C={lane:A,tag:u.tag,payload:u.payload,callback:u.callback,next:null},D===null?(E=D=C,p=O):D=D.next=C,s|=A;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;C=u,u=C.next,C.next=null,l.lastBaseUpdate=C,l.shared.pending=null}}while(!0);D===null&&(p=O),l.baseState=p,l.firstBaseUpdate=E,l.lastBaseUpdate=D,i===null&&(l.shared.lanes=0),yn|=s,t.lanes=s,t.memoizedState=O}}function _c(t,e){if(typeof t!="function")throw Error(o(191,t));t.call(e)}function Mc(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)_c(n[t],e)}var Sa=w(null),fi=w(0);function Dc(t,e){t=We,K(fi,t),K(Sa,e),We=t|e.baseLanes}function lo(){K(fi,We),K(Sa,Sa.current)}function io(){We=fi.current,U(Sa),U(fi)}var he=w(null),Ne=null;function hn(t){var e=t.alternate;K(Ht,Ht.current&1),K(he,t),Ne===null&&(e===null||Sa.current!==null||e.memoizedState!==null)&&(Ne=t)}function so(t){K(Ht,Ht.current),K(he,t),Ne===null&&(Ne=t)}function Rc(t){t.tag===22?(K(Ht,Ht.current),K(he,t),Ne===null&&(Ne=t)):gn()}function gn(){K(Ht,Ht.current),K(he,he.current)}function ge(t){U(he),Ne===t&&(Ne=null),U(Ht)}var Ht=w(0);function di(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||hr(n)||gr(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ve=0,ct=null,Ct=null,Gt=null,hi=!1,xa=!1,Vn=!1,gi=0,ul=0,Ta=null,Ym=0;function Ut(){throw Error(o(321))}function oo(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!fe(t[n],e[n]))return!1;return!0}function ro(t,e,n,a,l,i){return Ve=i,ct=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,M.H=t===null||t.memoizedState===null?mf:Eo,Vn=!1,i=n(a,l),Vn=!1,xa&&(i=zc(e,n,a,l)),kc(t),i}function kc(t){M.H=dl;var e=Ct!==null&&Ct.next!==null;if(Ve=0,Gt=Ct=ct=null,hi=!1,ul=0,Ta=null,e)throw Error(o(300));t===null||Xt||(t=t.dependencies,t!==null&&li(t)&&(Xt=!0))}function zc(t,e,n,a){ct=t;var l=0;do{if(xa&&(Ta=null),ul=0,xa=!1,25<=l)throw Error(o(301));if(l+=1,Gt=Ct=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}M.H=pf,i=e(n,a)}while(xa);return i}function qm(){var t=M.H,e=t.useState()[0];return e=typeof e.then=="function"?cl(e):e,t=t.useState()[0],(Ct!==null?Ct.memoizedState:null)!==t&&(ct.flags|=1024),e}function uo(){var t=gi!==0;return gi=0,t}function co(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function fo(t){if(hi){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}hi=!1}Ve=0,Gt=Ct=ct=null,xa=!1,ul=gi=0,Ta=null}function te(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Gt===null?ct.memoizedState=Gt=t:Gt=Gt.next=t,Gt}function Bt(){if(Ct===null){var t=ct.alternate;t=t!==null?t.memoizedState:null}else t=Ct.next;var e=Gt===null?ct.memoizedState:Gt.next;if(e!==null)Gt=e,Ct=t;else{if(t===null)throw ct.alternate===null?Error(o(467)):Error(o(310));Ct=t,t={memoizedState:Ct.memoizedState,baseState:Ct.baseState,baseQueue:Ct.baseQueue,queue:Ct.queue,next:null},Gt===null?ct.memoizedState=Gt=t:Gt=Gt.next=t}return Gt}function mi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function cl(t){var e=ul;return ul+=1,Ta===null&&(Ta=[]),t=Tc(Ta,t,e),e=ct,(Gt===null?e.memoizedState:Gt.next)===null&&(e=e.alternate,M.H=e===null||e.memoizedState===null?mf:Eo),t}function pi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return cl(t);if(t.$$typeof===N)return Ft(t)}throw Error(o(438,String(t)))}function ho(t){var e=null,n=ct.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=ct.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=mi(),ct.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=P;return e.index++,n}function Qe(t,e){return typeof e=="function"?e(t):e}function yi(t){var e=Bt();return go(e,Ct,t)}function go(t,e,n){var a=t.queue;if(a===null)throw Error(o(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var s=l.next;l.next=i.next,i.next=s}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var u=s=null,p=null,E=e,D=!1;do{var O=E.lane&-536870913;if(O!==E.lane?(pt&O)===O:(Ve&O)===O){var A=E.revertLane;if(A===0)p!==null&&(p=p.next={lane:0,revertLane:0,gesture:null,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null}),O===ya&&(D=!0);else if((Ve&A)===A){E=E.next,A===ya&&(D=!0);continue}else O={lane:0,revertLane:E.revertLane,gesture:null,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null},p===null?(u=p=O,s=i):p=p.next=O,ct.lanes|=A,yn|=A;O=E.action,Vn&&n(i,O),i=E.hasEagerState?E.eagerState:n(i,O)}else A={lane:O,revertLane:E.revertLane,gesture:E.gesture,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null},p===null?(u=p=A,s=i):p=p.next=A,ct.lanes|=O,yn|=O;E=E.next}while(E!==null&&E!==e);if(p===null?s=i:p.next=u,!fe(i,t.memoizedState)&&(Xt=!0,D&&(n=va,n!==null)))throw n;t.memoizedState=i,t.baseState=s,t.baseQueue=p,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function mo(t){var e=Bt(),n=e.queue;if(n===null)throw Error(o(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var s=l=l.next;do i=t(i,s.action),s=s.next;while(s!==l);fe(i,e.memoizedState)||(Xt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function Oc(t,e,n){var a=ct,l=Bt(),i=vt;if(i){if(n===void 0)throw Error(o(407));n=n()}else n=e();var s=!fe((Ct||l).memoizedState,n);if(s&&(l.memoizedState=n,Xt=!0),l=l.queue,vo(Hc.bind(null,a,l,t),[t]),l.getSnapshot!==e||s||Gt!==null&&Gt.memoizedState.tag&1){if(a.flags|=2048,Ea(9,{destroy:void 0},jc.bind(null,a,l,n,e),null),Dt===null)throw Error(o(349));i||(Ve&127)!==0||Uc(a,e,n)}return n}function Uc(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ct.updateQueue,e===null?(e=mi(),ct.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function jc(t,e,n,a){e.value=n,e.getSnapshot=a,Bc(e)&&Lc(t)}function Hc(t,e,n){return n(function(){Bc(e)&&Lc(t)})}function Bc(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!fe(t,n)}catch{return!0}}function Lc(t){var e=Un(t,2);e!==null&&oe(e,t,2)}function po(t){var e=te();if(typeof t=="function"){var n=t;if(t=n(),Vn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:t},e}function Yc(t,e,n,a){return t.baseState=n,go(t,Ct,typeof a=="function"?a:Qe)}function Gm(t,e,n,a,l){if(wi(t))throw Error(o(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){i.listeners.push(s)}};M.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,qc(e,i)):(i.next=n.next,e.pending=n.next=i)}}function qc(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=M.T,s={};M.T=s;try{var u=n(l,a),p=M.S;p!==null&&p(s,u),Gc(t,e,u)}catch(E){yo(t,e,E)}finally{i!==null&&s.types!==null&&(i.types=s.types),M.T=i}}else try{i=n(l,a),Gc(t,e,i)}catch(E){yo(t,e,E)}}function Gc(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Xc(t,e,a)},function(a){return yo(t,e,a)}):Xc(t,e,n)}function Xc(t,e,n){e.status="fulfilled",e.value=n,Vc(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,qc(t,n)))}function yo(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,Vc(e),e=e.next;while(e!==a)}t.action=null}function Vc(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Qc(t,e){return e}function Kc(t,e){if(vt){var n=Dt.formState;if(n!==null){t:{var a=ct;if(vt){if(kt){e:{for(var l=kt,i=Ee;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ae(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){kt=Ae(l.nextSibling),a=l.data==="F!";break t}}rn(a)}a=!1}a&&(e=n[0])}}return n=te(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qc,lastRenderedState:e},n.queue=a,n=df.bind(null,ct,a),a.dispatch=n,a=po(!1),i=To.bind(null,ct,!1,a.queue),a=te(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=Gm.bind(null,ct,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Zc(t){var e=Bt();return Ic(e,Ct,t)}function Ic(t,e,n){if(e=go(t,e,Qc)[0],t=yi(Qe)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=cl(e)}catch(s){throw s===ba?oi:s}else a=e;e=Bt();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(ct.flags|=2048,Ea(9,{destroy:void 0},Xm.bind(null,l,n),null)),[a,i,t]}function Xm(t,e){t.action=e}function Jc(t){var e=Bt(),n=Ct;if(n!==null)return Ic(e,n,t);Bt(),e=e.memoizedState,n=Bt();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function Ea(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=ct.updateQueue,e===null&&(e=mi(),ct.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Fc(){return Bt().memoizedState}function vi(t,e,n,a){var l=te();ct.flags|=t,l.memoizedState=Ea(1|e,{destroy:void 0},n,a===void 0?null:a)}function bi(t,e,n,a){var l=Bt();a=a===void 0?null:a;var i=l.memoizedState.inst;Ct!==null&&a!==null&&oo(a,Ct.memoizedState.deps)?l.memoizedState=Ea(e,i,n,a):(ct.flags|=t,l.memoizedState=Ea(1|e,i,n,a))}function $c(t,e){vi(8390656,8,t,e)}function vo(t,e){bi(2048,8,t,e)}function Vm(t){ct.flags|=4;var e=ct.updateQueue;if(e===null)e=mi(),ct.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Wc(t){var e=Bt().memoizedState;return Vm({ref:e,nextImpl:t}),function(){if((xt&2)!==0)throw Error(o(440));return e.impl.apply(void 0,arguments)}}function Pc(t,e){return bi(4,2,t,e)}function tf(t,e){return bi(4,4,t,e)}function ef(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function nf(t,e,n){n=n!=null?n.concat([t]):null,bi(4,4,ef.bind(null,e,t),n)}function bo(){}function af(t,e){var n=Bt();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&oo(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function lf(t,e){var n=Bt();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&oo(e,a[1]))return a[0];if(a=t(),Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function wo(t,e,n){return n===void 0||(Ve&1073741824)!==0&&(pt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=sd(),ct.lanes|=t,yn|=t,n)}function sf(t,e,n,a){return fe(n,e)?n:Sa.current!==null?(t=wo(t,n,a),fe(t,e)||(Xt=!0),t):(Ve&42)===0||(Ve&1073741824)!==0&&(pt&261930)===0?(Xt=!0,t.memoizedState=n):(t=sd(),ct.lanes|=t,yn|=t,e)}function of(t,e,n,a,l){var i=I.p;I.p=i!==0&&8>i?i:8;var s=M.T,u={};M.T=u,To(t,!1,e,n);try{var p=l(),E=M.S;if(E!==null&&E(u,p),p!==null&&typeof p=="object"&&typeof p.then=="function"){var D=Lm(p,a);fl(t,e,D,ye(t))}else fl(t,e,a,ye(t))}catch(O){fl(t,e,{then:function(){},status:"rejected",reason:O},ye())}finally{I.p=i,s!==null&&u.types!==null&&(s.types=u.types),M.T=s}}function Qm(){}function So(t,e,n,a){if(t.tag!==5)throw Error(o(476));var l=rf(t).queue;of(t,l,e,it,n===null?Qm:function(){return uf(t),n(a)})}function rf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:it,baseState:it,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:it},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function uf(t){var e=rf(t);e.next===null&&(e=t.alternate.memoizedState),fl(t,e.next.queue,{},ye())}function xo(){return Ft(_l)}function cf(){return Bt().memoizedState}function ff(){return Bt().memoizedState}function Km(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var a=dn(e,t,n);a!==null&&(oe(a,e,n),sl(a,e,n)),e={cache:Fs()},t.payload=e;return}e=e.return}}function Zm(t,e,n){var a=ye();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},wi(t)?hf(e,n):(n=Ls(t,e,n,a),n!==null&&(oe(n,t,a),gf(n,e,a)))}function df(t,e,n){var a=ye();fl(t,e,n,a)}function fl(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(wi(t))hf(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var s=e.lastRenderedState,u=i(s,n);if(l.hasEagerState=!0,l.eagerState=u,fe(u,s))return ti(t,e,l,0),Dt===null&&Pl(),!1}catch{}finally{}if(n=Ls(t,e,l,a),n!==null)return oe(n,t,a),gf(n,e,a),!0}return!1}function To(t,e,n,a){if(a={lane:2,revertLane:er(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},wi(t)){if(e)throw Error(o(479))}else e=Ls(t,n,a,2),e!==null&&oe(e,t,2)}function wi(t){var e=t.alternate;return t===ct||e!==null&&e===ct}function hf(t,e){xa=hi=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function gf(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,vu(t,n)}}var dl={readContext:Ft,use:pi,useCallback:Ut,useContext:Ut,useEffect:Ut,useImperativeHandle:Ut,useLayoutEffect:Ut,useInsertionEffect:Ut,useMemo:Ut,useReducer:Ut,useRef:Ut,useState:Ut,useDebugValue:Ut,useDeferredValue:Ut,useTransition:Ut,useSyncExternalStore:Ut,useId:Ut,useHostTransitionStatus:Ut,useFormState:Ut,useActionState:Ut,useOptimistic:Ut,useMemoCache:Ut,useCacheRefresh:Ut};dl.useEffectEvent=Ut;var mf={readContext:Ft,use:pi,useCallback:function(t,e){return te().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:$c,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,vi(4194308,4,ef.bind(null,e,t),n)},useLayoutEffect:function(t,e){return vi(4194308,4,t,e)},useInsertionEffect:function(t,e){vi(4,2,t,e)},useMemo:function(t,e){var n=te();e=e===void 0?null:e;var a=t();if(Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=te();if(n!==void 0){var l=n(e);if(Vn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=Zm.bind(null,ct,t),[a.memoizedState,t]},useRef:function(t){var e=te();return t={current:t},e.memoizedState=t},useState:function(t){t=po(t);var e=t.queue,n=df.bind(null,ct,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:bo,useDeferredValue:function(t,e){var n=te();return wo(n,t,e)},useTransition:function(){var t=po(!1);return t=of.bind(null,ct,t.queue,!0,!1),te().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=ct,l=te();if(vt){if(n===void 0)throw Error(o(407));n=n()}else{if(n=e(),Dt===null)throw Error(o(349));(pt&127)!==0||Uc(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,$c(Hc.bind(null,a,i,t),[t]),a.flags|=2048,Ea(9,{destroy:void 0},jc.bind(null,a,i,n,e),null),n},useId:function(){var t=te(),e=Dt.identifierPrefix;if(vt){var n=ke,a=Re;n=(a&~(1<<32-ce(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=gi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Ym++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:xo,useFormState:Kc,useActionState:Kc,useOptimistic:function(t){var e=te();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=To.bind(null,ct,!0,n),n.dispatch=e,[t,e]},useMemoCache:ho,useCacheRefresh:function(){return te().memoizedState=Km.bind(null,ct)},useEffectEvent:function(t){var e=te(),n={impl:t};return e.memoizedState=n,function(){if((xt&2)!==0)throw Error(o(440));return n.impl.apply(void 0,arguments)}}},Eo={readContext:Ft,use:pi,useCallback:af,useContext:Ft,useEffect:vo,useImperativeHandle:nf,useInsertionEffect:Pc,useLayoutEffect:tf,useMemo:lf,useReducer:yi,useRef:Fc,useState:function(){return yi(Qe)},useDebugValue:bo,useDeferredValue:function(t,e){var n=Bt();return sf(n,Ct.memoizedState,t,e)},useTransition:function(){var t=yi(Qe)[0],e=Bt().memoizedState;return[typeof t=="boolean"?t:cl(t),e]},useSyncExternalStore:Oc,useId:cf,useHostTransitionStatus:xo,useFormState:Zc,useActionState:Zc,useOptimistic:function(t,e){var n=Bt();return Yc(n,Ct,t,e)},useMemoCache:ho,useCacheRefresh:ff};Eo.useEffectEvent=Wc;var pf={readContext:Ft,use:pi,useCallback:af,useContext:Ft,useEffect:vo,useImperativeHandle:nf,useInsertionEffect:Pc,useLayoutEffect:tf,useMemo:lf,useReducer:mo,useRef:Fc,useState:function(){return mo(Qe)},useDebugValue:bo,useDeferredValue:function(t,e){var n=Bt();return Ct===null?wo(n,t,e):sf(n,Ct.memoizedState,t,e)},useTransition:function(){var t=mo(Qe)[0],e=Bt().memoizedState;return[typeof t=="boolean"?t:cl(t),e]},useSyncExternalStore:Oc,useId:cf,useHostTransitionStatus:xo,useFormState:Jc,useActionState:Jc,useOptimistic:function(t,e){var n=Bt();return Ct!==null?Yc(n,Ct,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:ho,useCacheRefresh:ff};pf.useEffectEvent=Wc;function No(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:k({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ao={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(oe(e,t,a),sl(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(oe(e,t,a),sl(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(oe(e,t,n),sl(e,t,n))}};function yf(t,e,n,a,l,i,s){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,s):e.prototype&&e.prototype.isPureReactComponent?!Wa(n,a)||!Wa(l,i):!0}function vf(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&Ao.enqueueReplaceState(e,e.state,null)}function Qn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=k({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function bf(t){Wl(t)}function wf(t){console.error(t)}function Sf(t){Wl(t)}function Si(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function xf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Co(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){Si(t,e)},n}function Tf(t){return t=fn(t),t.tag=3,t}function Ef(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){xf(e,n,a)}}var s=n.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){xf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var u=a.stack;this.componentDidCatch(a.value,{componentStack:u!==null?u:""})})}function Im(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&pa(e,n,l,!0),n=he.current,n!==null){switch(n.tag){case 31:case 13:return Ne===null?zi():n.alternate===null&&jt===0&&(jt=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===ri?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Wo(t,a,l)),!1;case 22:return n.flags|=65536,a===ri?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Wo(t,a,l)),!1}throw Error(o(435,n.tag))}return Wo(t,a,l),zi(),!1}if(vt)return e=he.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Qs&&(t=Error(o(422),{cause:a}),el(Se(t,n)))):(a!==Qs&&(e=Error(o(423),{cause:a}),el(Se(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=Se(a,n),l=Co(t.stateNode,a,l),no(t,l),jt!==4&&(jt=2)),!1;var i=Error(o(520),{cause:a});if(i=Se(i,n),wl===null?wl=[i]:wl.push(i),jt!==4&&(jt=2),e===null)return!0;a=Se(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=Co(n.stateNode,a,t),no(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=Tf(l),Ef(l,t,n,a),no(n,l),!1}n=n.return}while(n!==null);return!1}var _o=Error(o(461)),Xt=!1;function $t(t,e,n,a){e.child=t===null?Cc(e,null,n,a):Xn(e,t.child,n,a)}function Nf(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var s={};for(var u in a)u!=="ref"&&(s[u]=a[u])}else s=a;return Ln(e),a=ro(t,e,n,s,i,l),u=uo(),t!==null&&!Xt?(co(t,e,l),Ke(t,e,l)):(vt&&u&&Xs(e),e.flags|=1,$t(t,e,a,l),e.child)}function Af(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!Ys(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,Cf(t,e,i,a,l)):(t=ni(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!jo(t,l)){var s=i.memoizedProps;if(n=n.compare,n=n!==null?n:Wa,n(s,a)&&t.ref===e.ref)return Ke(t,e,l)}return e.flags|=1,t=Ye(i,a),t.ref=e.ref,t.return=e,e.child=t}function Cf(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if(Wa(i,a)&&t.ref===e.ref)if(Xt=!1,e.pendingProps=a=i,jo(t,l))(t.flags&131072)!==0&&(Xt=!0);else return e.lanes=t.lanes,Ke(t,e,l)}return Mo(t,e,n,a,l)}function _f(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return Mf(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&si(e,i!==null?i.cachePool:null),i!==null?Dc(e,i):lo(),Rc(e);else return a=e.lanes=536870912,Mf(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(si(e,i.cachePool),Dc(e,i),gn(),e.memoizedState=null):(t!==null&&si(e,null),lo(),gn());return $t(t,e,l,n),e.child}function hl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Mf(t,e,n,a,l){var i=Ws();return i=i===null?null:{parent:qt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&si(e,null),lo(),Rc(e),t!==null&&pa(t,e,a,!0),e.childLanes=l,null}function xi(t,e){return e=Ei({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Df(t,e,n){return Xn(e,t.child,null,n),t=xi(e,e.pendingProps),t.flags|=2,ge(e),e.memoizedState=null,t}function Jm(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(vt){if(a.mode==="hidden")return t=xi(e,a),e.lanes=536870912,hl(null,t);if(so(e),(t=kt)?(t=Gd(t,Ee),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:sn!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=dc(t),n.return=e,e.child=n,Jt=e,kt=null)):t=null,t===null)throw rn(e);return e.lanes=536870912,null}return xi(e,a)}var i=t.memoizedState;if(i!==null){var s=i.dehydrated;if(so(e),l)if(e.flags&256)e.flags&=-257,e=Df(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(o(558));else if(Xt||pa(t,e,n,!1),l=(n&t.childLanes)!==0,Xt||l){if(a=Dt,a!==null&&(s=bu(a,n),s!==0&&s!==i.retryLane))throw i.retryLane=s,Un(t,s),oe(a,t,s),_o;zi(),e=Df(t,e,n)}else t=i.treeContext,kt=Ae(s.nextSibling),Jt=e,vt=!0,on=null,Ee=!1,t!==null&&mc(e,t),e=xi(e,a),e.flags|=4096;return e}return t=Ye(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ti(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(o(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Mo(t,e,n,a,l){return Ln(e),n=ro(t,e,n,a,void 0,l),a=uo(),t!==null&&!Xt?(co(t,e,l),Ke(t,e,l)):(vt&&a&&Xs(e),e.flags|=1,$t(t,e,n,l),e.child)}function Rf(t,e,n,a,l,i){return Ln(e),e.updateQueue=null,n=zc(e,a,n,l),kc(t),a=uo(),t!==null&&!Xt?(co(t,e,i),Ke(t,e,i)):(vt&&a&&Xs(e),e.flags|=1,$t(t,e,n,i),e.child)}function kf(t,e,n,a,l){if(Ln(e),e.stateNode===null){var i=da,s=n.contextType;typeof s=="object"&&s!==null&&(i=Ft(s)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ao,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},to(e),s=n.contextType,i.context=typeof s=="object"&&s!==null?Ft(s):da,i.state=e.memoizedState,s=n.getDerivedStateFromProps,typeof s=="function"&&(No(e,n,s,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(s=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),s!==i.state&&Ao.enqueueReplaceState(i,i.state,null),rl(e,a,i,l),ol(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var u=e.memoizedProps,p=Qn(n,u);i.props=p;var E=i.context,D=n.contextType;s=da,typeof D=="object"&&D!==null&&(s=Ft(D));var O=n.getDerivedStateFromProps;D=typeof O=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=e.pendingProps!==u,D||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||E!==s)&&vf(e,i,a,s),cn=!1;var A=e.memoizedState;i.state=A,rl(e,a,i,l),ol(),E=e.memoizedState,u||A!==E||cn?(typeof O=="function"&&(No(e,n,O,a),E=e.memoizedState),(p=cn||yf(e,n,p,a,A,E,s))?(D||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=E),i.props=a,i.state=E,i.context=s,a=p):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,eo(t,e),s=e.memoizedProps,D=Qn(n,s),i.props=D,O=e.pendingProps,A=i.context,E=n.contextType,p=da,typeof E=="object"&&E!==null&&(p=Ft(E)),u=n.getDerivedStateFromProps,(E=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==O||A!==p)&&vf(e,i,a,p),cn=!1,A=e.memoizedState,i.state=A,rl(e,a,i,l),ol();var C=e.memoizedState;s!==O||A!==C||cn||t!==null&&t.dependencies!==null&&li(t.dependencies)?(typeof u=="function"&&(No(e,n,u,a),C=e.memoizedState),(D=cn||yf(e,n,D,a,A,C,p)||t!==null&&t.dependencies!==null&&li(t.dependencies))?(E||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,C,p),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,C,p)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=C),i.props=a,i.state=C,i.context=p,a=D):(typeof i.componentDidUpdate!="function"||s===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,Ti(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Xn(e,t.child,null,l),e.child=Xn(e,null,n,l)):$t(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ke(t,e,l),t}function zf(t,e,n,a){return Hn(),e.flags|=256,$t(t,e,n,a),e.child}var Do={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ro(t){return{baseLanes:t,cachePool:Sc()}}function ko(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pe),t}function Of(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,s;if((s=i)||(s=t!==null&&t.memoizedState===null?!1:(Ht.current&2)!==0),s&&(l=!0,e.flags&=-129),s=(e.flags&32)!==0,e.flags&=-33,t===null){if(vt){if(l?hn(e):gn(),(t=kt)?(t=Gd(t,Ee),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:sn!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=dc(t),n.return=e,e.child=n,Jt=e,kt=null)):t=null,t===null)throw rn(e);return gr(t)?e.lanes=32:e.lanes=536870912,null}var u=a.children;return a=a.fallback,l?(gn(),l=e.mode,u=Ei({mode:"hidden",children:u},l),a=jn(a,l,n,null),u.return=e,a.return=e,u.sibling=a,e.child=u,a=e.child,a.memoizedState=Ro(n),a.childLanes=ko(t,s,n),e.memoizedState=Do,hl(null,a)):(hn(e),zo(e,u))}var p=t.memoizedState;if(p!==null&&(u=p.dehydrated,u!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=Oo(t,e,n)):e.memoizedState!==null?(gn(),e.child=t.child,e.flags|=128,e=null):(gn(),u=a.fallback,l=e.mode,a=Ei({mode:"visible",children:a.children},l),u=jn(u,l,n,null),u.flags|=2,a.return=e,u.return=e,a.sibling=u,e.child=a,Xn(e,t.child,null,n),a=e.child,a.memoizedState=Ro(n),a.childLanes=ko(t,s,n),e.memoizedState=Do,e=hl(null,a));else if(hn(e),gr(u)){if(s=u.nextSibling&&u.nextSibling.dataset,s)var E=s.dgst;s=E,a=Error(o(419)),a.stack="",a.digest=s,el({value:a,source:null,stack:null}),e=Oo(t,e,n)}else if(Xt||pa(t,e,n,!1),s=(n&t.childLanes)!==0,Xt||s){if(s=Dt,s!==null&&(a=bu(s,n),a!==0&&a!==p.retryLane))throw p.retryLane=a,Un(t,a),oe(s,t,a),_o;hr(u)||zi(),e=Oo(t,e,n)}else hr(u)?(e.flags|=192,e.child=t.child,e=null):(t=p.treeContext,kt=Ae(u.nextSibling),Jt=e,vt=!0,on=null,Ee=!1,t!==null&&mc(e,t),e=zo(e,a.children),e.flags|=4096);return e}return l?(gn(),u=a.fallback,l=e.mode,p=t.child,E=p.sibling,a=Ye(p,{mode:"hidden",children:a.children}),a.subtreeFlags=p.subtreeFlags&65011712,E!==null?u=Ye(E,u):(u=jn(u,l,n,null),u.flags|=2),u.return=e,a.return=e,a.sibling=u,e.child=a,hl(null,a),a=e.child,u=t.child.memoizedState,u===null?u=Ro(n):(l=u.cachePool,l!==null?(p=qt._currentValue,l=l.parent!==p?{parent:p,pool:p}:l):l=Sc(),u={baseLanes:u.baseLanes|n,cachePool:l}),a.memoizedState=u,a.childLanes=ko(t,s,n),e.memoizedState=Do,hl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=Ye(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(s=e.deletions,s===null?(e.deletions=[t],e.flags|=16):s.push(t)),e.child=n,e.memoizedState=null,n)}function zo(t,e){return e=Ei({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ei(t,e){return t=de(22,t,null,e),t.lanes=0,t}function Oo(t,e,n){return Xn(e,t.child,null,n),t=zo(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Uf(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Is(t.return,e,n)}function Uo(t,e,n,a,l,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=n,s.tailMode=l,s.treeForkCount=i)}function jf(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var s=Ht.current,u=(s&2)!==0;if(u?(s=s&1|2,e.flags|=128):s&=1,K(Ht,s),$t(t,e,a,n),a=vt?tl:0,!u&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Uf(t,n,e);else if(t.tag===19)Uf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&di(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),Uo(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&di(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}Uo(e,!0,n,null,i,a);break;case"together":Uo(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ke(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(pa(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(o(153));if(e.child!==null){for(t=e.child,n=Ye(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ye(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function jo(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&li(t)))}function Fm(t,e,n){switch(e.tag){case 3:Rt(e,e.stateNode.containerInfo),un(e,qt,t.memoizedState.cache),Hn();break;case 27:case 5:je(e);break;case 4:Rt(e,e.stateNode.containerInfo);break;case 10:un(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,so(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Of(t,e,n):(hn(e),t=Ke(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(pa(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return jf(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),K(Ht,Ht.current),a)break;return null;case 22:return e.lanes=0,_f(t,e,n,e.pendingProps);case 24:un(e,qt,t.memoizedState.cache)}return Ke(t,e,n)}function Hf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Xt=!0;else{if(!jo(t,n)&&(e.flags&128)===0)return Xt=!1,Fm(t,e,n);Xt=(t.flags&131072)!==0}else Xt=!1,vt&&(e.flags&1048576)!==0&&gc(e,tl,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=qn(e.elementType),e.type=t,typeof t=="function")Ys(t)?(a=Qn(t,a),e.tag=1,e=kf(null,e,t,a,n)):(e.tag=0,e=Mo(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===G){e.tag=11,e=Nf(null,e,t,a,n);break t}else if(l===B){e.tag=14,e=Af(null,e,t,a,n);break t}}throw e=ot(t)||t,Error(o(306,e,""))}}return e;case 0:return Mo(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Qn(a,e.pendingProps),kf(t,e,a,l,n);case 3:t:{if(Rt(e,e.stateNode.containerInfo),t===null)throw Error(o(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,eo(t,e),rl(e,a,null,n);var s=e.memoizedState;if(a=s.cache,un(e,qt,a),a!==i.cache&&Js(e,[qt],n,!0),ol(),a=s.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:s.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=zf(t,e,a,n);break t}else if(a!==l){l=Se(Error(o(424)),e),el(l),e=zf(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(kt=Ae(t.firstChild),Jt=e,vt=!0,on=null,Ee=!0,n=Cc(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Hn(),a===l){e=Ke(t,e,n);break t}$t(t,e,a,n)}e=e.child}return e;case 26:return Ti(t,e),t===null?(n=Id(e.type,null,e.pendingProps,null))?e.memoizedState=n:vt||(n=e.type,t=e.pendingProps,a=Yi(dt.current).createElement(n),a[It]=e,a[ee]=t,Wt(a,n,t),Kt(a),e.stateNode=a):e.memoizedState=Id(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return je(e),t===null&&vt&&(a=e.stateNode=Qd(e.type,e.pendingProps,dt.current),Jt=e,Ee=!0,l=kt,xn(e.type)?(mr=l,kt=Ae(a.firstChild)):kt=l),$t(t,e,e.pendingProps.children,n),Ti(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&vt&&((l=a=kt)&&(a=A0(a,e.type,e.pendingProps,Ee),a!==null?(e.stateNode=a,Jt=e,kt=Ae(a.firstChild),Ee=!1,l=!0):l=!1),l||rn(e)),je(e),l=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,a=i.children,cr(l,i)?a=null:s!==null&&cr(l,s)&&(e.flags|=32),e.memoizedState!==null&&(l=ro(t,e,qm,null,null,n),_l._currentValue=l),Ti(t,e),$t(t,e,a,n),e.child;case 6:return t===null&&vt&&((t=n=kt)&&(n=C0(n,e.pendingProps,Ee),n!==null?(e.stateNode=n,Jt=e,kt=null,t=!0):t=!1),t||rn(e)),null;case 13:return Of(t,e,n);case 4:return Rt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Xn(e,null,a,n):$t(t,e,a,n),e.child;case 11:return Nf(t,e,e.type,e.pendingProps,n);case 7:return $t(t,e,e.pendingProps,n),e.child;case 8:return $t(t,e,e.pendingProps.children,n),e.child;case 12:return $t(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,un(e,e.type,a.value),$t(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,Ln(e),l=Ft(l),a=a(l),e.flags|=1,$t(t,e,a,n),e.child;case 14:return Af(t,e,e.type,e.pendingProps,n);case 15:return Cf(t,e,e.type,e.pendingProps,n);case 19:return jf(t,e,n);case 31:return Jm(t,e,n);case 22:return _f(t,e,n,e.pendingProps);case 24:return Ln(e),a=Ft(qt),t===null?(l=Ws(),l===null&&(l=Dt,i=Fs(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},to(e),un(e,qt,l)):((t.lanes&n)!==0&&(eo(t,e),rl(e,null,null,n),ol()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),un(e,qt,a)):(a=i.cache,un(e,qt,a),a!==l.cache&&Js(e,[qt],n,!0))),$t(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(o(156,e.tag))}function Ze(t){t.flags|=4}function Ho(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(cd())t.flags|=8192;else throw Gn=ri,Ps}else t.flags&=-16777217}function Bf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Pd(e))if(cd())t.flags|=8192;else throw Gn=ri,Ps}function Ni(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?pu():536870912,t.lanes|=e,_a|=e)}function gl(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function zt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function $m(t,e,n){var a=e.pendingProps;switch(Vs(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zt(e),null;case 1:return zt(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Xe(qt),At(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ma(e)?Ze(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Ks())),zt(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ze(e),i!==null?(zt(e),Bf(e,i)):(zt(e),Ho(e,l,null,a,n))):i?i!==t.memoizedState?(Ze(e),zt(e),Bf(e,i)):(zt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ze(e),zt(e),Ho(e,l,t,a,n)),null;case 27:if(jl(e),n=dt.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ze(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return zt(e),null}t=W.current,ma(e)?pc(e):(t=Qd(l,a,n),e.stateNode=t,Ze(e))}return zt(e),null;case 5:if(jl(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ze(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return zt(e),null}if(i=W.current,ma(e))pc(e);else{var s=Yi(dt.current);switch(i){case 1:i=s.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=s.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=s.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=s.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=s.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?s.createElement("select",{is:a.is}):s.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?s.createElement(l,{is:a.is}):s.createElement(l)}}i[It]=e,i[ee]=a;t:for(s=e.child;s!==null;){if(s.tag===5||s.tag===6)i.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===e)break t;for(;s.sibling===null;){if(s.return===null||s.return===e)break t;s=s.return}s.sibling.return=s.return,s=s.sibling}e.stateNode=i;t:switch(Wt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ze(e)}}return zt(e),Ho(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ze(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(o(166));if(t=dt.current,ma(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Jt,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[It]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Od(t.nodeValue,n)),t||rn(e,!0)}else t=Yi(t).createTextNode(a),t[It]=e,e.stateNode=t}return zt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ma(e),n!==null){if(t===null){if(!a)throw Error(o(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(557));t[It]=e}else Hn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),t=!1}else n=Ks(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ge(e),e):(ge(e),null);if((e.flags&128)!==0)throw Error(o(558))}return zt(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ma(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(o(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(o(317));l[It]=e}else Hn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),l=!1}else l=Ks(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(ge(e),e):(ge(e),null)}return ge(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Ni(e,e.updateQueue),zt(e),null);case 4:return At(),t===null&&ir(e.stateNode.containerInfo),zt(e),null;case 10:return Xe(e.type),zt(e),null;case 19:if(U(Ht),a=e.memoizedState,a===null)return zt(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)gl(a,!1);else{if(jt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=di(t),i!==null){for(e.flags|=128,gl(a,!1),t=i.updateQueue,e.updateQueue=t,Ni(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)fc(n,t),n=n.sibling;return K(Ht,Ht.current&1|2),vt&&qe(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&re()>Di&&(e.flags|=128,l=!0,gl(a,!1),e.lanes=4194304)}else{if(!l)if(t=di(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,Ni(e,t),gl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!vt)return zt(e),null}else 2*re()-a.renderingStartTime>Di&&n!==536870912&&(e.flags|=128,l=!0,gl(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=re(),t.sibling=null,n=Ht.current,K(Ht,l?n&1|2:n&1),vt&&qe(e,a.treeForkCount),t):(zt(e),null);case 22:case 23:return ge(e),io(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(zt(e),e.subtreeFlags&6&&(e.flags|=8192)):zt(e),n=e.updateQueue,n!==null&&Ni(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&U(Yn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Xe(qt),zt(e),null;case 25:return null;case 30:return null}throw Error(o(156,e.tag))}function Wm(t,e){switch(Vs(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Xe(qt),At(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return jl(e),null;case 31:if(e.memoizedState!==null){if(ge(e),e.alternate===null)throw Error(o(340));Hn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ge(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(o(340));Hn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return U(Ht),null;case 4:return At(),null;case 10:return Xe(e.type),null;case 22:case 23:return ge(e),io(),t!==null&&U(Yn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Xe(qt),null;case 25:return null;default:return null}}function Lf(t,e){switch(Vs(e),e.tag){case 3:Xe(qt),At();break;case 26:case 27:case 5:jl(e);break;case 4:At();break;case 31:e.memoizedState!==null&&ge(e);break;case 13:ge(e);break;case 19:U(Ht);break;case 10:Xe(e.type);break;case 22:case 23:ge(e),io(),t!==null&&U(Yn);break;case 24:Xe(qt)}}function ml(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,s=n.inst;a=i(),s.destroy=a}n=n.next}while(n!==l)}}catch(u){Nt(e,e.return,u)}}function mn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var s=a.inst,u=s.destroy;if(u!==void 0){s.destroy=void 0,l=e;var p=n,E=u;try{E()}catch(D){Nt(l,p,D)}}}a=a.next}while(a!==i)}}catch(D){Nt(e,e.return,D)}}function Yf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Mc(e,n)}catch(a){Nt(t,t.return,a)}}}function qf(t,e,n){n.props=Qn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){Nt(t,e,a)}}function pl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){Nt(t,e,l)}}function ze(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){Nt(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){Nt(t,e,l)}else n.current=null}function Gf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){Nt(t,t.return,l)}}function Bo(t,e,n){try{var a=t.stateNode;w0(a,t.type,n,e),a[ee]=e}catch(l){Nt(t,t.return,l)}}function Xf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&xn(t.type)||t.tag===4}function Lo(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Xf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&xn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Yo(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Be));else if(a!==4&&(a===27&&xn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Yo(t,e,n),t=t.sibling;t!==null;)Yo(t,e,n),t=t.sibling}function Ai(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&xn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ai(t,e,n),t=t.sibling;t!==null;)Ai(t,e,n),t=t.sibling}function Vf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);Wt(e,a,n),e[It]=t,e[ee]=n}catch(i){Nt(t,t.return,i)}}var Ie=!1,Vt=!1,qo=!1,Qf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function Pm(t,e){if(t=t.containerInfo,rr=Zi,t=nc(t),zs(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var s=0,u=-1,p=-1,E=0,D=0,O=t,A=null;e:for(;;){for(var C;O!==n||l!==0&&O.nodeType!==3||(u=s+l),O!==i||a!==0&&O.nodeType!==3||(p=s+a),O.nodeType===3&&(s+=O.nodeValue.length),(C=O.firstChild)!==null;)A=O,O=C;for(;;){if(O===t)break e;if(A===n&&++E===l&&(u=s),A===i&&++D===a&&(p=s),(C=O.nextSibling)!==null)break;O=A,A=O.parentNode}O=C}n=u===-1||p===-1?null:{start:u,end:p}}else n=null}n=n||{start:0,end:0}}else n=null;for(ur={focusedElem:t,selectionRange:n},Zi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var $=Qn(n.type,l);t=a.getSnapshotBeforeUpdate($,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(st){Nt(n,n.return,st)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)dr(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":dr(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(o(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function Kf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Fe(t,n),a&4&&ml(5,n);break;case 1:if(Fe(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(s){Nt(n,n.return,s)}else{var l=Qn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(s){Nt(n,n.return,s)}}a&64&&Yf(n),a&512&&pl(n,n.return);break;case 3:if(Fe(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Mc(t,e)}catch(s){Nt(n,n.return,s)}}break;case 27:e===null&&a&4&&Vf(n);case 26:case 5:Fe(t,n),e===null&&a&4&&Gf(n),a&512&&pl(n,n.return);break;case 12:Fe(t,n);break;case 31:Fe(t,n),a&4&&Jf(t,n);break;case 13:Fe(t,n),a&4&&Ff(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=r0.bind(null,n),_0(t,n))));break;case 22:if(a=n.memoizedState!==null||Ie,!a){e=e!==null&&e.memoizedState!==null||Vt,l=Ie;var i=Vt;Ie=a,(Vt=e)&&!i?$e(t,n,(n.subtreeFlags&8772)!==0):Fe(t,n),Ie=l,Vt=i}break;case 30:break;default:Fe(t,n)}}function Zf(t){var e=t.alternate;e!==null&&(t.alternate=null,Zf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&ps(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Ot=null,ae=!1;function Je(t,e,n){for(n=n.child;n!==null;)If(t,e,n),n=n.sibling}function If(t,e,n){if(ue&&typeof ue.onCommitFiberUnmount=="function")try{ue.onCommitFiberUnmount(Ya,n)}catch{}switch(n.tag){case 26:Vt||ze(n,e),Je(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Vt||ze(n,e);var a=Ot,l=ae;xn(n.type)&&(Ot=n.stateNode,ae=!1),Je(t,e,n),Nl(n.stateNode),Ot=a,ae=l;break;case 5:Vt||ze(n,e);case 6:if(a=Ot,l=ae,Ot=null,Je(t,e,n),Ot=a,ae=l,Ot!==null)if(ae)try{(Ot.nodeType===9?Ot.body:Ot.nodeName==="HTML"?Ot.ownerDocument.body:Ot).removeChild(n.stateNode)}catch(i){Nt(n,e,i)}else try{Ot.removeChild(n.stateNode)}catch(i){Nt(n,e,i)}break;case 18:Ot!==null&&(ae?(t=Ot,Yd(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ja(t)):Yd(Ot,n.stateNode));break;case 4:a=Ot,l=ae,Ot=n.stateNode.containerInfo,ae=!0,Je(t,e,n),Ot=a,ae=l;break;case 0:case 11:case 14:case 15:mn(2,n,e),Vt||mn(4,n,e),Je(t,e,n);break;case 1:Vt||(ze(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&qf(n,e,a)),Je(t,e,n);break;case 21:Je(t,e,n);break;case 22:Vt=(a=Vt)||n.memoizedState!==null,Je(t,e,n),Vt=a;break;default:Je(t,e,n)}}function Jf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ja(t)}catch(n){Nt(e,e.return,n)}}}function Ff(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ja(t)}catch(n){Nt(e,e.return,n)}}function t0(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Qf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Qf),e;default:throw Error(o(435,t.tag))}}function Ci(t,e){var n=t0(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=u0.bind(null,t,a);a.then(l,l)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,s=e,u=s;t:for(;u!==null;){switch(u.tag){case 27:if(xn(u.type)){Ot=u.stateNode,ae=!1;break t}break;case 5:Ot=u.stateNode,ae=!1;break t;case 3:case 4:Ot=u.stateNode.containerInfo,ae=!0;break t}u=u.return}if(Ot===null)throw Error(o(160));If(i,s,l),Ot=null,ae=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)$f(e,t),e=e.sibling}var Me=null;function $f(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ie(t),a&4&&(mn(3,t,t.return),ml(3,t),mn(5,t,t.return));break;case 1:le(e,t),ie(t),a&512&&(Vt||n===null||ze(n,n.return)),a&64&&Ie&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Me;if(le(e,t),ie(t),a&512&&(Vt||n===null||ze(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Xa]||i[It]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),Wt(i,a,n),i[It]=t,Kt(i),a=i;break t;case"link":var s=$d("link","href",l).get(a+(n.href||""));if(s){for(var u=0;u<s.length;u++)if(i=s[u],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(u,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;case"meta":if(s=$d("meta","content",l).get(a+(n.content||""))){for(u=0;u<s.length;u++)if(i=s[u],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){s.splice(u,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;default:throw Error(o(468,a))}i[It]=t,Kt(i),a=i}t.stateNode=a}else Wd(l,t.type,t.stateNode);else t.stateNode=Fd(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Wd(l,t.type,t.stateNode):Fd(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Bo(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ie(t),a&512&&(Vt||n===null||ze(n,n.return)),n!==null&&a&4&&Bo(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ie(t),a&512&&(Vt||n===null||ze(n,n.return)),t.flags&32){l=t.stateNode;try{ia(l,"")}catch($){Nt(t,t.return,$)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,Bo(t,l,n!==null?n.memoizedProps:l)),a&1024&&(qo=!0);break;case 6:if(le(e,t),ie(t),a&4){if(t.stateNode===null)throw Error(o(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch($){Nt(t,t.return,$)}}break;case 3:if(Xi=null,l=Me,Me=qi(e.containerInfo),le(e,t),Me=l,ie(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ja(e.containerInfo)}catch($){Nt(t,t.return,$)}qo&&(qo=!1,Wf(t));break;case 4:a=Me,Me=qi(t.stateNode.containerInfo),le(e,t),ie(t),Me=a;break;case 12:le(e,t),ie(t);break;case 31:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 13:le(e,t),ie(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Mi=re()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 22:l=t.memoizedState!==null;var p=n!==null&&n.memoizedState!==null,E=Ie,D=Vt;if(Ie=E||l,Vt=D||p,le(e,t),Vt=D,Ie=E,ie(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||p||Ie||Vt||Kn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){p=n=e;try{if(i=p.stateNode,l)s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{u=p.stateNode;var O=p.memoizedProps.style,A=O!=null&&O.hasOwnProperty("display")?O.display:null;u.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch($){Nt(p,p.return,$)}}}else if(e.tag===6){if(n===null){p=e;try{p.stateNode.nodeValue=l?"":p.memoizedProps}catch($){Nt(p,p.return,$)}}}else if(e.tag===18){if(n===null){p=e;try{var C=p.stateNode;l?qd(C,!0):qd(p.stateNode,!1)}catch($){Nt(p,p.return,$)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ci(t,n))));break;case 19:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 30:break;case 21:break;default:le(e,t),ie(t)}}function ie(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(Xf(a)){n=a;break}a=a.return}if(n==null)throw Error(o(160));switch(n.tag){case 27:var l=n.stateNode,i=Lo(t);Ai(t,i,l);break;case 5:var s=n.stateNode;n.flags&32&&(ia(s,""),n.flags&=-33);var u=Lo(t);Ai(t,u,s);break;case 3:case 4:var p=n.stateNode.containerInfo,E=Lo(t);Yo(t,E,p);break;default:throw Error(o(161))}}catch(D){Nt(t,t.return,D)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Wf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Wf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Fe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Kf(t,e.alternate,e),e=e.sibling}function Kn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:mn(4,e,e.return),Kn(e);break;case 1:ze(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&qf(e,e.return,n),Kn(e);break;case 27:Nl(e.stateNode);case 26:case 5:ze(e,e.return),Kn(e);break;case 22:e.memoizedState===null&&Kn(e);break;case 30:Kn(e);break;default:Kn(e)}t=t.sibling}}function $e(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,s=i.flags;switch(i.tag){case 0:case 11:case 15:$e(l,i,n),ml(4,i);break;case 1:if($e(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(E){Nt(a,a.return,E)}if(a=i,l=a.updateQueue,l!==null){var u=a.stateNode;try{var p=l.shared.hiddenCallbacks;if(p!==null)for(l.shared.hiddenCallbacks=null,l=0;l<p.length;l++)_c(p[l],u)}catch(E){Nt(a,a.return,E)}}n&&s&64&&Yf(i),pl(i,i.return);break;case 27:Vf(i);case 26:case 5:$e(l,i,n),n&&a===null&&s&4&&Gf(i),pl(i,i.return);break;case 12:$e(l,i,n);break;case 31:$e(l,i,n),n&&s&4&&Jf(l,i);break;case 13:$e(l,i,n),n&&s&4&&Ff(l,i);break;case 22:i.memoizedState===null&&$e(l,i,n),pl(i,i.return);break;case 30:break;default:$e(l,i,n)}e=e.sibling}}function Go(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&nl(n))}function Xo(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&nl(t))}function De(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pf(t,e,n,a),e=e.sibling}function Pf(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:De(t,e,n,a),l&2048&&ml(9,e);break;case 1:De(t,e,n,a);break;case 3:De(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&nl(t)));break;case 12:if(l&2048){De(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,s=i.id,u=i.onPostCommit;typeof u=="function"&&u(s,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(p){Nt(e,e.return,p)}}else De(t,e,n,a);break;case 31:De(t,e,n,a);break;case 13:De(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,s=e.alternate,e.memoizedState!==null?i._visibility&2?De(t,e,n,a):yl(t,e):i._visibility&2?De(t,e,n,a):(i._visibility|=2,Na(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&Go(s,e);break;case 24:De(t,e,n,a),l&2048&&Xo(e.alternate,e);break;default:De(t,e,n,a)}}function Na(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,s=e,u=n,p=a,E=s.flags;switch(s.tag){case 0:case 11:case 15:Na(i,s,u,p,l),ml(8,s);break;case 23:break;case 22:var D=s.stateNode;s.memoizedState!==null?D._visibility&2?Na(i,s,u,p,l):yl(i,s):(D._visibility|=2,Na(i,s,u,p,l)),l&&E&2048&&Go(s.alternate,s);break;case 24:Na(i,s,u,p,l),l&&E&2048&&Xo(s.alternate,s);break;default:Na(i,s,u,p,l)}e=e.sibling}}function yl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:yl(n,a),l&2048&&Go(a.alternate,a);break;case 24:yl(n,a),l&2048&&Xo(a.alternate,a);break;default:yl(n,a)}e=e.sibling}}var vl=8192;function Aa(t,e,n){if(t.subtreeFlags&vl)for(t=t.child;t!==null;)td(t,e,n),t=t.sibling}function td(t,e,n){switch(t.tag){case 26:Aa(t,e,n),t.flags&vl&&t.memoizedState!==null&&Y0(n,Me,t.memoizedState,t.memoizedProps);break;case 5:Aa(t,e,n);break;case 3:case 4:var a=Me;Me=qi(t.stateNode.containerInfo),Aa(t,e,n),Me=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=vl,vl=16777216,Aa(t,e,n),vl=a):Aa(t,e,n));break;default:Aa(t,e,n)}}function ed(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function bl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,ad(a,t)}ed(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)nd(t),t=t.sibling}function nd(t){switch(t.tag){case 0:case 11:case 15:bl(t),t.flags&2048&&mn(9,t,t.return);break;case 3:bl(t);break;case 12:bl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,_i(t)):bl(t);break;default:bl(t)}}function _i(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,ad(a,t)}ed(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:mn(8,e,e.return),_i(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,_i(e));break;default:_i(e)}t=t.sibling}}function ad(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:mn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:nl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Zt=a;else t:for(n=t;Zt!==null;){a=Zt;var l=a.sibling,i=a.return;if(Zf(a),a===n){Zt=null;break t}if(l!==null){l.return=i,Zt=l;break t}Zt=i}}}var e0={getCacheForType:function(t){var e=Ft(qt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ft(qt).controller.signal}},n0=typeof WeakMap=="function"?WeakMap:Map,xt=0,Dt=null,gt=null,pt=0,Et=0,me=null,pn=!1,Ca=!1,Vo=!1,We=0,jt=0,yn=0,Zn=0,Qo=0,pe=0,_a=0,wl=null,se=null,Ko=!1,Mi=0,ld=0,Di=1/0,Ri=null,vn=null,Qt=0,bn=null,Ma=null,Pe=0,Zo=0,Io=null,id=null,Sl=0,Jo=null;function ye(){return(xt&2)!==0&&pt!==0?pt&-pt:M.T!==null?er():wu()}function sd(){if(pe===0)if((pt&536870912)===0||vt){var t=Ll;Ll<<=1,(Ll&3932160)===0&&(Ll=262144),pe=t}else pe=536870912;return t=he.current,t!==null&&(t.flags|=32),pe}function oe(t,e,n){(t===Dt&&(Et===2||Et===9)||t.cancelPendingCommit!==null)&&(Da(t,0),wn(t,pt,pe,!1)),Ga(t,n),((xt&2)===0||t!==Dt)&&(t===Dt&&((xt&2)===0&&(Zn|=n),jt===4&&wn(t,pt,pe,!1)),Oe(t))}function od(t,e,n){if((xt&6)!==0)throw Error(o(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||qa(t,e),l=a?i0(t,e):$o(t,e,!0),i=a;do{if(l===0){Ca&&!a&&wn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!a0(n)){l=$o(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var s=0;else s=t.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){e=s;t:{var u=t;l=wl;var p=u.current.memoizedState.isDehydrated;if(p&&(Da(u,s).flags|=256),s=$o(u,s,!1),s!==2){if(Vo&&!p){u.errorRecoveryDisabledLanes|=i,Zn|=i,l=4;break t}i=se,se=l,i!==null&&(se===null?se=i:se.push.apply(se,i))}l=s}if(i=!1,l!==2)continue}}if(l===1){Da(t,0),wn(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(o(345));case 4:if((e&4194048)!==e)break;case 6:wn(a,e,pe,!pn);break t;case 2:se=null;break;case 3:case 5:break;default:throw Error(o(329))}if((e&62914560)===e&&(l=Mi+300-re(),10<l)){if(wn(a,e,pe,!pn),ql(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=Bd(rd.bind(null,a,n,se,Ri,Ko,e,pe,Zn,_a,pn,i,"Throttled",-0,0),l);break t}rd(a,n,se,Ri,Ko,e,pe,Zn,_a,pn,i,null,-0,0)}}break}while(!0);Oe(t)}function rd(t,e,n,a,l,i,s,u,p,E,D,O,A,C){if(t.timeoutHandle=-1,O=e.subtreeFlags,O&8192||(O&16785408)===16785408){O={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Be},td(e,i,O);var $=(i&62914560)===i?Mi-re():(i&4194048)===i?ld-re():0;if($=q0(O,$),$!==null){Pe=i,t.cancelPendingCommit=$(pd.bind(null,t,e,i,n,a,l,s,u,p,D,O,null,A,C)),wn(t,i,s,!E);return}}pd(t,e,i,n,a,l,s,u,p)}function a0(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!fe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wn(t,e,n,a){e&=~Qo,e&=~Zn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-ce(l),s=1<<i;a[i]=-1,l&=~s}n!==0&&yu(t,n,e)}function ki(){return(xt&6)===0?(xl(0),!1):!0}function Fo(){if(gt!==null){if(Et===0)var t=gt.return;else t=gt,Ge=Bn=null,fo(t),wa=null,ll=0,t=gt;for(;t!==null;)Lf(t.alternate,t),t=t.return;gt=null}}function Da(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,T0(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Fo(),Dt=t,gt=n=Ye(t.current,null),pt=e,Et=0,me=null,pn=!1,Ca=qa(t,e),Vo=!1,_a=pe=Qo=Zn=yn=jt=0,se=wl=null,Ko=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-ce(a),i=1<<l;e|=t[l],a&=~i}return We=e,Pl(),n}function ud(t,e){ct=null,M.H=dl,e===ba||e===oi?(e=Ec(),Et=3):e===Ps?(e=Ec(),Et=4):Et=e===_o?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,me=e,gt===null&&(jt=1,Si(t,Se(e,t.current)))}function cd(){var t=he.current;return t===null?!0:(pt&4194048)===pt?Ne===null:(pt&62914560)===pt||(pt&536870912)!==0?t===Ne:!1}function fd(){var t=M.H;return M.H=dl,t===null?dl:t}function dd(){var t=M.A;return M.A=e0,t}function zi(){jt=4,pn||(pt&4194048)!==pt&&he.current!==null||(Ca=!0),(yn&134217727)===0&&(Zn&134217727)===0||Dt===null||wn(Dt,pt,pe,!1)}function $o(t,e,n){var a=xt;xt|=2;var l=fd(),i=dd();(Dt!==t||pt!==e)&&(Ri=null,Da(t,e)),e=!1;var s=jt;t:do try{if(Et!==0&&gt!==null){var u=gt,p=me;switch(Et){case 8:Fo(),s=6;break t;case 3:case 2:case 9:case 6:he.current===null&&(e=!0);var E=Et;if(Et=0,me=null,Ra(t,u,p,E),n&&Ca){s=0;break t}break;default:E=Et,Et=0,me=null,Ra(t,u,p,E)}}l0(),s=jt;break}catch(D){ud(t,D)}while(!0);return e&&t.shellSuspendCounter++,Ge=Bn=null,xt=a,M.H=l,M.A=i,gt===null&&(Dt=null,pt=0,Pl()),s}function l0(){for(;gt!==null;)hd(gt)}function i0(t,e){var n=xt;xt|=2;var a=fd(),l=dd();Dt!==t||pt!==e?(Ri=null,Di=re()+500,Da(t,e)):Ca=qa(t,e);t:do try{if(Et!==0&&gt!==null){e=gt;var i=me;e:switch(Et){case 1:Et=0,me=null,Ra(t,e,i,1);break;case 2:case 9:if(xc(i)){Et=0,me=null,gd(e);break}e=function(){Et!==2&&Et!==9||Dt!==t||(Et=7),Oe(t)},i.then(e,e);break t;case 3:Et=7;break t;case 4:Et=5;break t;case 7:xc(i)?(Et=0,me=null,gd(e)):(Et=0,me=null,Ra(t,e,i,7));break;case 5:var s=null;switch(gt.tag){case 26:s=gt.memoizedState;case 5:case 27:var u=gt;if(s?Pd(s):u.stateNode.complete){Et=0,me=null;var p=u.sibling;if(p!==null)gt=p;else{var E=u.return;E!==null?(gt=E,Oi(E)):gt=null}break e}}Et=0,me=null,Ra(t,e,i,5);break;case 6:Et=0,me=null,Ra(t,e,i,6);break;case 8:Fo(),jt=6;break t;default:throw Error(o(462))}}s0();break}catch(D){ud(t,D)}while(!0);return Ge=Bn=null,M.H=a,M.A=l,xt=n,gt!==null?0:(Dt=null,pt=0,Pl(),jt)}function s0(){for(;gt!==null&&!Mg();)hd(gt)}function hd(t){var e=Hf(t.alternate,t,We);t.memoizedProps=t.pendingProps,e===null?Oi(t):gt=e}function gd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Rf(n,e,e.pendingProps,e.type,void 0,pt);break;case 11:e=Rf(n,e,e.pendingProps,e.type.render,e.ref,pt);break;case 5:fo(e);default:Lf(n,e),e=gt=fc(e,We),e=Hf(n,e,We)}t.memoizedProps=t.pendingProps,e===null?Oi(t):gt=e}function Ra(t,e,n,a){Ge=Bn=null,fo(e),wa=null,ll=0;var l=e.return;try{if(Im(t,l,e,n,pt)){jt=1,Si(t,Se(n,t.current)),gt=null;return}}catch(i){if(l!==null)throw gt=l,i;jt=1,Si(t,Se(n,t.current)),gt=null;return}e.flags&32768?(vt||a===1?t=!0:Ca||(pt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=he.current,a!==null&&a.tag===13&&(a.flags|=16384))),md(e,t)):Oi(e)}function Oi(t){var e=t;do{if((e.flags&32768)!==0){md(e,pn);return}t=e.return;var n=$m(e.alternate,e,We);if(n!==null){gt=n;return}if(e=e.sibling,e!==null){gt=e;return}gt=e=t}while(e!==null);jt===0&&(jt=5)}function md(t,e){do{var n=Wm(t.alternate,t);if(n!==null){n.flags&=32767,gt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){gt=t;return}gt=t=n}while(t!==null);jt=6,gt=null}function pd(t,e,n,a,l,i,s,u,p){t.cancelPendingCommit=null;do Ui();while(Qt!==0);if((xt&6)!==0)throw Error(o(327));if(e!==null){if(e===t.current)throw Error(o(177));if(i=e.lanes|e.childLanes,i|=Bs,Lg(t,n,i,s,u,p),t===Dt&&(gt=Dt=null,pt=0),Ma=e,bn=t,Pe=n,Zo=i,Io=l,id=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,c0(Hl,function(){return Sd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=M.T,M.T=null,l=I.p,I.p=2,s=xt,xt|=4;try{Pm(t,e,n)}finally{xt=s,I.p=l,M.T=a}}Qt=1,yd(),vd(),bd()}}function yd(){if(Qt===1){Qt=0;var t=bn,e=Ma,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=M.T,M.T=null;var a=I.p;I.p=2;var l=xt;xt|=4;try{$f(e,t);var i=ur,s=nc(t.containerInfo),u=i.focusedElem,p=i.selectionRange;if(s!==u&&u&&u.ownerDocument&&ec(u.ownerDocument.documentElement,u)){if(p!==null&&zs(u)){var E=p.start,D=p.end;if(D===void 0&&(D=E),"selectionStart"in u)u.selectionStart=E,u.selectionEnd=Math.min(D,u.value.length);else{var O=u.ownerDocument||document,A=O&&O.defaultView||window;if(A.getSelection){var C=A.getSelection(),$=u.textContent.length,st=Math.min(p.start,$),Mt=p.end===void 0?st:Math.min(p.end,$);!C.extend&&st>Mt&&(s=Mt,Mt=st,st=s);var x=tc(u,st),b=tc(u,Mt);if(x&&b&&(C.rangeCount!==1||C.anchorNode!==x.node||C.anchorOffset!==x.offset||C.focusNode!==b.node||C.focusOffset!==b.offset)){var T=O.createRange();T.setStart(x.node,x.offset),C.removeAllRanges(),st>Mt?(C.addRange(T),C.extend(b.node,b.offset)):(T.setEnd(b.node,b.offset),C.addRange(T))}}}}for(O=[],C=u;C=C.parentNode;)C.nodeType===1&&O.push({element:C,left:C.scrollLeft,top:C.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<O.length;u++){var z=O[u];z.element.scrollLeft=z.left,z.element.scrollTop=z.top}}Zi=!!rr,ur=rr=null}finally{xt=l,I.p=a,M.T=n}}t.current=e,Qt=2}}function vd(){if(Qt===2){Qt=0;var t=bn,e=Ma,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=M.T,M.T=null;var a=I.p;I.p=2;var l=xt;xt|=4;try{Kf(t,e.alternate,e)}finally{xt=l,I.p=a,M.T=n}}Qt=3}}function bd(){if(Qt===4||Qt===3){Qt=0,Dg();var t=bn,e=Ma,n=Pe,a=id;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Qt=5:(Qt=0,Ma=bn=null,wd(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),gs(n),e=e.stateNode,ue&&typeof ue.onCommitFiberRoot=="function")try{ue.onCommitFiberRoot(Ya,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=M.T,l=I.p,I.p=2,M.T=null;try{for(var i=t.onRecoverableError,s=0;s<a.length;s++){var u=a[s];i(u.value,{componentStack:u.stack})}}finally{M.T=e,I.p=l}}(Pe&3)!==0&&Ui(),Oe(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Jo?Sl++:(Sl=0,Jo=t):Sl=0,xl(0)}}function wd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,nl(e)))}function Ui(){return yd(),vd(),bd(),Sd()}function Sd(){if(Qt!==5)return!1;var t=bn,e=Zo;Zo=0;var n=gs(Pe),a=M.T,l=I.p;try{I.p=32>n?32:n,M.T=null,n=Io,Io=null;var i=bn,s=Pe;if(Qt=0,Ma=bn=null,Pe=0,(xt&6)!==0)throw Error(o(331));var u=xt;if(xt|=4,nd(i.current),Pf(i,i.current,s,n),xt=u,xl(0,!1),ue&&typeof ue.onPostCommitFiberRoot=="function")try{ue.onPostCommitFiberRoot(Ya,i)}catch{}return!0}finally{I.p=l,M.T=a,wd(t,e)}}function xd(t,e,n){e=Se(n,e),e=Co(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(Ga(t,2),Oe(t))}function Nt(t,e,n){if(t.tag===3)xd(t,t,n);else for(;e!==null;){if(e.tag===3){xd(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=Se(n,t),n=Tf(2),a=dn(e,n,2),a!==null&&(Ef(n,a,e,t),Ga(a,2),Oe(a));break}}e=e.return}}function Wo(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new n0;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Vo=!0,l.add(n),t=o0.bind(null,t,e,n),e.then(t,t))}function o0(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Dt===t&&(pt&n)===n&&(jt===4||jt===3&&(pt&62914560)===pt&&300>re()-Mi?(xt&2)===0&&Da(t,0):Qo|=n,_a===pt&&(_a=0)),Oe(t)}function Td(t,e){e===0&&(e=pu()),t=Un(t,e),t!==null&&(Ga(t,e),Oe(t))}function r0(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Td(t,n)}function u0(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(o(314))}a!==null&&a.delete(e),Td(t,n)}function c0(t,e){return cs(t,e)}var ji=null,ka=null,Po=!1,Hi=!1,tr=!1,Sn=0;function Oe(t){t!==ka&&t.next===null&&(ka===null?ji=ka=t:ka=ka.next=t),Hi=!0,Po||(Po=!0,d0())}function xl(t,e){if(!tr&&Hi){tr=!0;do for(var n=!1,a=ji;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var s=a.suspendedLanes,u=a.pingedLanes;i=(1<<31-ce(42|t)+1)-1,i&=l&~(s&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Cd(a,i))}else i=pt,i=ql(a,a===Dt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||qa(a,i)||(n=!0,Cd(a,i));a=a.next}while(n);tr=!1}}function f0(){Ed()}function Ed(){Hi=Po=!1;var t=0;Sn!==0&&x0()&&(t=Sn);for(var e=re(),n=null,a=ji;a!==null;){var l=a.next,i=Nd(a,e);i===0?(a.next=null,n===null?ji=l:n.next=l,l===null&&(ka=n)):(n=a,(t!==0||(i&3)!==0)&&(Hi=!0)),a=l}Qt!==0&&Qt!==5||xl(t),Sn!==0&&(Sn=0)}function Nd(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var s=31-ce(i),u=1<<s,p=l[s];p===-1?((u&n)===0||(u&a)!==0)&&(l[s]=Bg(u,e)):p<=e&&(t.expiredLanes|=u),i&=~u}if(e=Dt,n=pt,n=ql(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(Et===2||Et===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&fs(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||qa(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&fs(a),gs(n)){case 2:case 8:n=gu;break;case 32:n=Hl;break;case 268435456:n=mu;break;default:n=Hl}return a=Ad.bind(null,t),n=cs(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&fs(a),t.callbackPriority=2,t.callbackNode=null,2}function Ad(t,e){if(Qt!==0&&Qt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Ui()&&t.callbackNode!==n)return null;var a=pt;return a=ql(t,t===Dt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(od(t,a,e),Nd(t,re()),t.callbackNode!=null&&t.callbackNode===n?Ad.bind(null,t):null)}function Cd(t,e){if(Ui())return null;od(t,e,!0)}function d0(){E0(function(){(xt&6)!==0?cs(hu,f0):Ed()})}function er(){if(Sn===0){var t=ya;t===0&&(t=Bl,Bl<<=1,(Bl&261888)===0&&(Bl=256)),Sn=t}return Sn}function _d(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ql(""+t)}function Md(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function h0(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=_d((l[ee]||null).action),s=a.submitter;s&&(e=(e=s[ee]||null)?_d(e.formAction):s.getAttribute("formAction"),e!==null&&(i=e,s=null));var u=new Jl("action","action",null,a,l);t.push({event:u,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Sn!==0){var p=s?Md(l,s):new FormData(l);So(n,{pending:!0,data:p,method:l.method,action:i},null,p)}}else typeof i=="function"&&(u.preventDefault(),p=s?Md(l,s):new FormData(l),So(n,{pending:!0,data:p,method:l.method,action:i},i,p))},currentTarget:l}]})}}for(var nr=0;nr<Hs.length;nr++){var ar=Hs[nr],g0=ar.toLowerCase(),m0=ar[0].toUpperCase()+ar.slice(1);_e(g0,"on"+m0)}_e(ic,"onAnimationEnd"),_e(sc,"onAnimationIteration"),_e(oc,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(Rm,"onTransitionRun"),_e(km,"onTransitionStart"),_e(zm,"onTransitionCancel"),_e(rc,"onTransitionEnd"),aa("onMouseEnter",["mouseout","mouseover"]),aa("onMouseLeave",["mouseout","mouseover"]),aa("onPointerEnter",["pointerout","pointerover"]),aa("onPointerLeave",["pointerout","pointerover"]),Rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Rn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Tl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),p0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Tl));function Dd(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var s=a.length-1;0<=s;s--){var u=a[s],p=u.instance,E=u.currentTarget;if(u=u.listener,p!==i&&l.isPropagationStopped())break t;i=u,l.currentTarget=E;try{i(l)}catch(D){Wl(D)}l.currentTarget=null,i=p}else for(s=0;s<a.length;s++){if(u=a[s],p=u.instance,E=u.currentTarget,u=u.listener,p!==i&&l.isPropagationStopped())break t;i=u,l.currentTarget=E;try{i(l)}catch(D){Wl(D)}l.currentTarget=null,i=p}}}}function mt(t,e){var n=e[ms];n===void 0&&(n=e[ms]=new Set);var a=t+"__bubble";n.has(a)||(Rd(e,t,2,!1),n.add(a))}function lr(t,e,n){var a=0;e&&(a|=4),Rd(n,t,a,e)}var Bi="_reactListening"+Math.random().toString(36).slice(2);function ir(t){if(!t[Bi]){t[Bi]=!0,Tu.forEach(function(n){n!=="selectionchange"&&(p0.has(n)||lr(n,!1,t),lr(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Bi]||(e[Bi]=!0,lr("selectionchange",!1,e))}}function Rd(t,e,n,a){switch(sh(e)){case 2:var l=V0;break;case 8:l=Q0;break;default:l=wr}n=l.bind(null,e,n,t),l=void 0,!Es||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function sr(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var s=a.tag;if(s===3||s===4){var u=a.stateNode.containerInfo;if(u===l)break;if(s===4)for(s=a.return;s!==null;){var p=s.tag;if((p===3||p===4)&&s.stateNode.containerInfo===l)return;s=s.return}for(;u!==null;){if(s=ta(u),s===null)return;if(p=s.tag,p===5||p===6||p===26||p===27){a=i=s;continue t}u=u.parentNode}}a=a.return}Uu(function(){var E=i,D=xs(n),O=[];t:{var A=uc.get(t);if(A!==void 0){var C=Jl,$=t;switch(t){case"keypress":if(Zl(n)===0)break t;case"keydown":case"keyup":C=um;break;case"focusin":$="focus",C=_s;break;case"focusout":$="blur",C=_s;break;case"beforeblur":case"afterblur":C=_s;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=Bu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=$g;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=dm;break;case ic:case sc:case oc:C=tm;break;case rc:C=gm;break;case"scroll":case"scrollend":C=Jg;break;case"wheel":C=pm;break;case"copy":case"cut":case"paste":C=nm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=Yu;break;case"toggle":case"beforetoggle":C=vm}var st=(e&4)!==0,Mt=!st&&(t==="scroll"||t==="scrollend"),x=st?A!==null?A+"Capture":null:A;st=[];for(var b=E,T;b!==null;){var z=b;if(T=z.stateNode,z=z.tag,z!==5&&z!==26&&z!==27||T===null||x===null||(z=Qa(b,x),z!=null&&st.push(El(b,z,T))),Mt)break;b=b.return}0<st.length&&(A=new C(A,$,null,n,D),O.push({event:A,listeners:st}))}}if((e&7)===0){t:{if(A=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",A&&n!==Ss&&($=n.relatedTarget||n.fromElement)&&(ta($)||$[Pn]))break t;if((C||A)&&(A=D.window===D?D:(A=D.ownerDocument)?A.defaultView||A.parentWindow:window,C?($=n.relatedTarget||n.toElement,C=E,$=$?ta($):null,$!==null&&(Mt=h($),st=$.tag,$!==Mt||st!==5&&st!==27&&st!==6)&&($=null)):(C=null,$=E),C!==$)){if(st=Bu,z="onMouseLeave",x="onMouseEnter",b="mouse",(t==="pointerout"||t==="pointerover")&&(st=Yu,z="onPointerLeave",x="onPointerEnter",b="pointer"),Mt=C==null?A:Va(C),T=$==null?A:Va($),A=new st(z,b+"leave",C,n,D),A.target=Mt,A.relatedTarget=T,z=null,ta(D)===E&&(st=new st(x,b+"enter",$,n,D),st.target=T,st.relatedTarget=Mt,z=st),Mt=z,C&&$)e:{for(st=y0,x=C,b=$,T=0,z=x;z;z=st(z))T++;z=0;for(var nt=b;nt;nt=st(nt))z++;for(;0<T-z;)x=st(x),T--;for(;0<z-T;)b=st(b),z--;for(;T--;){if(x===b||b!==null&&x===b.alternate){st=x;break e}x=st(x),b=st(b)}st=null}else st=null;C!==null&&kd(O,A,C,st,!1),$!==null&&Mt!==null&&kd(O,Mt,$,st,!0)}}t:{if(A=E?Va(E):window,C=A.nodeName&&A.nodeName.toLowerCase(),C==="select"||C==="input"&&A.type==="file")var bt=Iu;else if(Ku(A))if(Ju)bt=_m;else{bt=Am;var tt=Nm}else C=A.nodeName,!C||C.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?E&&ws(E.elementType)&&(bt=Iu):bt=Cm;if(bt&&(bt=bt(t,E))){Zu(O,bt,n,D);break t}tt&&tt(t,A,E),t==="focusout"&&E&&A.type==="number"&&E.memoizedProps.value!=null&&bs(A,"number",A.value)}switch(tt=E?Va(E):window,t){case"focusin":(Ku(tt)||tt.contentEditable==="true")&&(ua=tt,Os=E,Pa=null);break;case"focusout":Pa=Os=ua=null;break;case"mousedown":Us=!0;break;case"contextmenu":case"mouseup":case"dragend":Us=!1,ac(O,n,D);break;case"selectionchange":if(Dm)break;case"keydown":case"keyup":ac(O,n,D)}var ft;if(Ds)t:{switch(t){case"compositionstart":var yt="onCompositionStart";break t;case"compositionend":yt="onCompositionEnd";break t;case"compositionupdate":yt="onCompositionUpdate";break t}yt=void 0}else ra?Vu(t,n)&&(yt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(yt="onCompositionStart");yt&&(qu&&n.locale!=="ko"&&(ra||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&ra&&(ft=ju()):(ln=D,Ns="value"in ln?ln.value:ln.textContent,ra=!0)),tt=Li(E,yt),0<tt.length&&(yt=new Lu(yt,t,null,n,D),O.push({event:yt,listeners:tt}),ft?yt.data=ft:(ft=Qu(n),ft!==null&&(yt.data=ft)))),(ft=wm?Sm(t,n):xm(t,n))&&(yt=Li(E,"onBeforeInput"),0<yt.length&&(tt=new Lu("onBeforeInput","beforeinput",null,n,D),O.push({event:tt,listeners:yt}),tt.data=ft)),h0(O,t,E,n,D)}Dd(O,e)})}function El(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Li(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Qa(t,n),l!=null&&a.unshift(El(t,l,i)),l=Qa(t,e),l!=null&&a.push(El(t,l,i))),t.tag===3)return a;t=t.return}return[]}function y0(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function kd(t,e,n,a,l){for(var i=e._reactName,s=[];n!==null&&n!==a;){var u=n,p=u.alternate,E=u.stateNode;if(u=u.tag,p!==null&&p===a)break;u!==5&&u!==26&&u!==27||E===null||(p=E,l?(E=Qa(n,i),E!=null&&s.unshift(El(n,E,p))):l||(E=Qa(n,i),E!=null&&s.push(El(n,E,p)))),n=n.return}s.length!==0&&t.push({event:e,listeners:s})}var v0=/\r\n?/g,b0=/\u0000|\uFFFD/g;function zd(t){return(typeof t=="string"?t:""+t).replace(v0,`
`).replace(b0,"")}function Od(t,e){return e=zd(e),zd(t)===e}function _t(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||ia(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&ia(t,""+a);break;case"className":Xl(t,"class",a);break;case"tabIndex":Xl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Xl(t,n,a);break;case"style":zu(t,a,i);break;case"data":if(e!=="object"){Xl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",l.name,l,null),_t(t,e,"formEncType",l.formEncType,l,null),_t(t,e,"formMethod",l.formMethod,l,null),_t(t,e,"formTarget",l.formTarget,l,null)):(_t(t,e,"encType",l.encType,l,null),_t(t,e,"method",l.method,l,null),_t(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=Be);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Ql(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Gl(t,"popover",a);break;case"xlinkActuate":He(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":He(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":He(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":He(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":He(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":He(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":He(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":He(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":He(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Gl(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Zg.get(n)||n,Gl(t,n,a))}}function or(t,e,n,a,l,i){switch(n){case"style":zu(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"children":typeof a=="string"?ia(t,a):(typeof a=="number"||typeof a=="bigint")&&ia(t,""+a);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=Be);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Eu.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[ee]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Gl(t,n,a)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var s=n[i];if(s!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:_t(t,e,i,s,n,null)}}l&&_t(t,e,"srcSet",n.srcSet,n,null),a&&_t(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var u=i=s=l=null,p=null,E=null;for(a in n)if(n.hasOwnProperty(a)){var D=n[a];if(D!=null)switch(a){case"name":l=D;break;case"type":s=D;break;case"checked":p=D;break;case"defaultChecked":E=D;break;case"value":i=D;break;case"defaultValue":u=D;break;case"children":case"dangerouslySetInnerHTML":if(D!=null)throw Error(o(137,e));break;default:_t(t,e,a,D,n,null)}}Mu(t,i,u,p,E,s,l,!1);return;case"select":mt("invalid",t),a=s=i=null;for(l in n)if(n.hasOwnProperty(l)&&(u=n[l],u!=null))switch(l){case"value":i=u;break;case"defaultValue":s=u;break;case"multiple":a=u;default:_t(t,e,l,u,n,null)}e=i,n=s,t.multiple=!!a,e!=null?la(t,!!a,e,!1):n!=null&&la(t,!!a,n,!0);return;case"textarea":mt("invalid",t),i=l=a=null;for(s in n)if(n.hasOwnProperty(s)&&(u=n[s],u!=null))switch(s){case"value":a=u;break;case"defaultValue":l=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(o(91));break;default:_t(t,e,s,u,n,null)}Ru(t,a,l,i);return;case"option":for(p in n)if(n.hasOwnProperty(p)&&(a=n[p],a!=null))switch(p){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_t(t,e,p,a,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(a=0;a<Tl.length;a++)mt(Tl[a],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(E in n)if(n.hasOwnProperty(E)&&(a=n[E],a!=null))switch(E){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:_t(t,e,E,a,n,null)}return;default:if(ws(e)){for(D in n)n.hasOwnProperty(D)&&(a=n[D],a!==void 0&&or(t,e,D,a,n,void 0));return}}for(u in n)n.hasOwnProperty(u)&&(a=n[u],a!=null&&_t(t,e,u,a,n,null))}function w0(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,s=null,u=null,p=null,E=null,D=null;for(C in n){var O=n[C];if(n.hasOwnProperty(C)&&O!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":p=O;default:a.hasOwnProperty(C)||_t(t,e,C,null,a,O)}}for(var A in a){var C=a[A];if(O=n[A],a.hasOwnProperty(A)&&(C!=null||O!=null))switch(A){case"type":i=C;break;case"name":l=C;break;case"checked":E=C;break;case"defaultChecked":D=C;break;case"value":s=C;break;case"defaultValue":u=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(o(137,e));break;default:C!==O&&_t(t,e,A,C,a,O)}}vs(t,s,u,p,E,D,i,l);return;case"select":C=s=u=A=null;for(i in n)if(p=n[i],n.hasOwnProperty(i)&&p!=null)switch(i){case"value":break;case"multiple":C=p;default:a.hasOwnProperty(i)||_t(t,e,i,null,a,p)}for(l in a)if(i=a[l],p=n[l],a.hasOwnProperty(l)&&(i!=null||p!=null))switch(l){case"value":A=i;break;case"defaultValue":u=i;break;case"multiple":s=i;default:i!==p&&_t(t,e,l,i,a,p)}e=u,n=s,a=C,A!=null?la(t,!!n,A,!1):!!a!=!!n&&(e!=null?la(t,!!n,e,!0):la(t,!!n,n?[]:"",!1));return;case"textarea":C=A=null;for(u in n)if(l=n[u],n.hasOwnProperty(u)&&l!=null&&!a.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:_t(t,e,u,null,a,l)}for(s in a)if(l=a[s],i=n[s],a.hasOwnProperty(s)&&(l!=null||i!=null))switch(s){case"value":A=l;break;case"defaultValue":C=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(o(91));break;default:l!==i&&_t(t,e,s,l,a,i)}Du(t,A,C);return;case"option":for(var $ in n)if(A=n[$],n.hasOwnProperty($)&&A!=null&&!a.hasOwnProperty($))switch($){case"selected":t.selected=!1;break;default:_t(t,e,$,null,a,A)}for(p in a)if(A=a[p],C=n[p],a.hasOwnProperty(p)&&A!==C&&(A!=null||C!=null))switch(p){case"selected":t.selected=A&&typeof A!="function"&&typeof A!="symbol";break;default:_t(t,e,p,A,a,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var st in n)A=n[st],n.hasOwnProperty(st)&&A!=null&&!a.hasOwnProperty(st)&&_t(t,e,st,null,a,A);for(E in a)if(A=a[E],C=n[E],a.hasOwnProperty(E)&&A!==C&&(A!=null||C!=null))switch(E){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(o(137,e));break;default:_t(t,e,E,A,a,C)}return;default:if(ws(e)){for(var Mt in n)A=n[Mt],n.hasOwnProperty(Mt)&&A!==void 0&&!a.hasOwnProperty(Mt)&&or(t,e,Mt,void 0,a,A);for(D in a)A=a[D],C=n[D],!a.hasOwnProperty(D)||A===C||A===void 0&&C===void 0||or(t,e,D,A,a,C);return}}for(var x in n)A=n[x],n.hasOwnProperty(x)&&A!=null&&!a.hasOwnProperty(x)&&_t(t,e,x,null,a,A);for(O in a)A=a[O],C=n[O],!a.hasOwnProperty(O)||A===C||A==null&&C==null||_t(t,e,O,A,a,C)}function Ud(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function S0(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,s=l.initiatorType,u=l.duration;if(i&&u&&Ud(s)){for(s=0,u=l.responseEnd,a+=1;a<n.length;a++){var p=n[a],E=p.startTime;if(E>u)break;var D=p.transferSize,O=p.initiatorType;D&&Ud(O)&&(p=p.responseEnd,s+=D*(p<u?1:(u-E)/(p-E)))}if(--a,e+=8*(i+s)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var rr=null,ur=null;function Yi(t){return t.nodeType===9?t:t.ownerDocument}function jd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Hd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function cr(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var fr=null;function x0(){var t=window.event;return t&&t.type==="popstate"?t===fr?!1:(fr=t,!0):(fr=null,!1)}var Bd=typeof setTimeout=="function"?setTimeout:void 0,T0=typeof clearTimeout=="function"?clearTimeout:void 0,Ld=typeof Promise=="function"?Promise:void 0,E0=typeof queueMicrotask=="function"?queueMicrotask:typeof Ld<"u"?function(t){return Ld.resolve(null).then(t).catch(N0)}:Bd;function N0(t){setTimeout(function(){throw t})}function xn(t){return t==="head"}function Yd(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),ja(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Nl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Nl(n);for(var i=n.firstChild;i;){var s=i.nextSibling,u=i.nodeName;i[Xa]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=s}}else n==="body"&&Nl(t.ownerDocument.body);n=l}while(n);ja(e)}function qd(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function dr(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":dr(n),ps(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function A0(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[Xa])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ae(t.nextSibling),t===null)break}return null}function C0(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ae(t.nextSibling),t===null))return null;return t}function Gd(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ae(t.nextSibling),t===null))return null;return t}function hr(t){return t.data==="$?"||t.data==="$~"}function gr(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function _0(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ae(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var mr=null;function Xd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ae(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Vd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Qd(t,e,n){switch(e=Yi(n),t){case"html":if(t=e.documentElement,!t)throw Error(o(452));return t;case"head":if(t=e.head,!t)throw Error(o(453));return t;case"body":if(t=e.body,!t)throw Error(o(454));return t;default:throw Error(o(451))}}function Nl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);ps(t)}var Ce=new Map,Kd=new Set;function qi(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=I.d;I.d={f:M0,r:D0,D:R0,C:k0,L:z0,m:O0,X:j0,S:U0,M:H0};function M0(){var t=tn.f(),e=ki();return t||e}function D0(t){var e=ea(t);e!==null&&e.tag===5&&e.type==="form"?uf(e):tn.r(t)}var za=typeof document>"u"?null:document;function Zd(t,e,n){var a=za;if(a&&typeof e=="string"&&e){var l=be(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),Kd.has(l)||(Kd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),Wt(e,"link",t),Kt(e),a.head.appendChild(e)))}}function R0(t){tn.D(t),Zd("dns-prefetch",t,null)}function k0(t,e){tn.C(t,e),Zd("preconnect",t,e)}function z0(t,e,n){tn.L(t,e,n);var a=za;if(a&&t&&e){var l='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+be(n.imageSizes)+'"]')):l+='[href="'+be(t)+'"]';var i=l;switch(e){case"style":i=Oa(t);break;case"script":i=Ua(t)}Ce.has(i)||(t=k({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ce.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(Al(i))||e==="script"&&a.querySelector(Cl(i))||(e=a.createElement("link"),Wt(e,"link",t),Kt(e),a.head.appendChild(e)))}}function O0(t,e){tn.m(t,e);var n=za;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ua(t)}if(!Ce.has(i)&&(t=k({rel:"modulepreload",href:t},e),Ce.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Cl(i)))return}a=n.createElement("link"),Wt(a,"link",t),Kt(a),n.head.appendChild(a)}}}function U0(t,e,n){tn.S(t,e,n);var a=za;if(a&&t){var l=na(a).hoistableStyles,i=Oa(t);e=e||"default";var s=l.get(i);if(!s){var u={loading:0,preload:null};if(s=a.querySelector(Al(i)))u.loading=5;else{t=k({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ce.get(i))&&pr(t,n);var p=s=a.createElement("link");Kt(p),Wt(p,"link",t),p._p=new Promise(function(E,D){p.onload=E,p.onerror=D}),p.addEventListener("load",function(){u.loading|=1}),p.addEventListener("error",function(){u.loading|=2}),u.loading|=4,Gi(s,e,a)}s={type:"stylesheet",instance:s,count:1,state:u},l.set(i,s)}}}function j0(t,e){tn.X(t,e);var n=za;if(n&&t){var a=na(n).hoistableScripts,l=Ua(t),i=a.get(l);i||(i=n.querySelector(Cl(l)),i||(t=k({src:t,async:!0},e),(e=Ce.get(l))&&yr(t,e),i=n.createElement("script"),Kt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function H0(t,e){tn.M(t,e);var n=za;if(n&&t){var a=na(n).hoistableScripts,l=Ua(t),i=a.get(l);i||(i=n.querySelector(Cl(l)),i||(t=k({src:t,async:!0,type:"module"},e),(e=Ce.get(l))&&yr(t,e),i=n.createElement("script"),Kt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Id(t,e,n,a){var l=(l=dt.current)?qi(l):null;if(!l)throw Error(o(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Oa(n.href),n=na(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Oa(n.href);var i=na(l).hoistableStyles,s=i.get(t);if(s||(l=l.ownerDocument||l,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,s),(i=l.querySelector(Al(t)))&&!i._p&&(s.instance=i,s.state.loading=5),Ce.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ce.set(t,n),i||B0(l,t,n,s.state))),e&&a===null)throw Error(o(528,""));return s}if(e&&a!==null)throw Error(o(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ua(n),n=na(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,t))}}function Oa(t){return'href="'+be(t)+'"'}function Al(t){return'link[rel="stylesheet"]['+t+"]"}function Jd(t){return k({},t,{"data-precedence":t.precedence,precedence:null})}function B0(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Wt(e,"link",n),Kt(e),t.head.appendChild(e))}function Ua(t){return'[src="'+be(t)+'"]'}function Cl(t){return"script[async]"+t}function Fd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Kt(a),a;var l=k({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Kt(a),Wt(a,"style",l),Gi(a,n.precedence,t),e.instance=a;case"stylesheet":l=Oa(n.href);var i=t.querySelector(Al(l));if(i)return e.state.loading|=4,e.instance=i,Kt(i),i;a=Jd(n),(l=Ce.get(l))&&pr(a,l),i=(t.ownerDocument||t).createElement("link"),Kt(i);var s=i;return s._p=new Promise(function(u,p){s.onload=u,s.onerror=p}),Wt(i,"link",a),e.state.loading|=4,Gi(i,n.precedence,t),e.instance=i;case"script":return i=Ua(n.src),(l=t.querySelector(Cl(i)))?(e.instance=l,Kt(l),l):(a=n,(l=Ce.get(i))&&(a=k({},n),yr(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Kt(l),Wt(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(o(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Gi(a,n.precedence,t));return e.instance}function Gi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,s=0;s<a.length;s++){var u=a[s];if(u.dataset.precedence===e)i=u;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function pr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function yr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Xi=null;function $d(t,e,n){if(Xi===null){var a=new Map,l=Xi=new Map;l.set(n,a)}else l=Xi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[Xa]||i[It]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var s=i.getAttribute(e)||"";s=t+s;var u=a.get(s);u?u.push(i):a.set(s,[i])}}return a}function Wd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function L0(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Pd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Y0(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=Oa(a.href),i=e.querySelector(Al(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Vi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Kt(i);return}i=e.ownerDocument||e,a=Jd(a),(l=Ce.get(l))&&pr(a,l),i=i.createElement("link"),Kt(i);var s=i;s._p=new Promise(function(u,p){s.onload=u,s.onerror=p}),Wt(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Vi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var vr=0;function q0(t,e){return t.stylesheets&&t.count===0&&Ki(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Ki(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&vr===0&&(vr=62500*S0());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Ki(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>vr?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Vi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ki(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Qi=null;function Ki(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Qi=new Map,e.forEach(G0,t),Qi=null,Vi.call(t))}function G0(t,e){if(!(e.state.loading&4)){var n=Qi.get(t);if(n)var a=n.get(null);else{n=new Map,Qi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var s=l[i];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(n.set(s.dataset.precedence,s),a=s)}a&&n.set(null,a)}l=e.instance,s=l.getAttribute("data-precedence"),i=n.get(s)||a,i===a&&n.set(null,l),n.set(s,l),this.count++,a=Vi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var _l={$$typeof:N,Provider:null,Consumer:null,_currentValue:it,_currentValue2:it,_threadCount:0};function X0(t,e,n,a,l,i,s,u,p){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ds(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ds(0),this.hiddenUpdates=ds(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=p,this.incompleteTransitions=new Map}function th(t,e,n,a,l,i,s,u,p,E,D,O){return t=new X0(t,e,n,s,p,E,D,O,u),e=1,i===!0&&(e|=24),i=de(3,null,null,e),t.current=i,i.stateNode=t,e=Fs(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},to(i),t}function eh(t){return t?(t=da,t):da}function nh(t,e,n,a,l,i){l=eh(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(oe(n,t,e),sl(n,t,e))}function ah(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function br(t,e){ah(t,e),(t=t.alternate)&&ah(t,e)}function lh(t){if(t.tag===13||t.tag===31){var e=Un(t,67108864);e!==null&&oe(e,t,67108864),br(t,67108864)}}function ih(t){if(t.tag===13||t.tag===31){var e=ye();e=hs(e);var n=Un(t,e);n!==null&&oe(n,t,e),br(t,e)}}var Zi=!0;function V0(t,e,n,a){var l=M.T;M.T=null;var i=I.p;try{I.p=2,wr(t,e,n,a)}finally{I.p=i,M.T=l}}function Q0(t,e,n,a){var l=M.T;M.T=null;var i=I.p;try{I.p=8,wr(t,e,n,a)}finally{I.p=i,M.T=l}}function wr(t,e,n,a){if(Zi){var l=Sr(a);if(l===null)sr(t,e,a,Ii,n),oh(t,a);else if(Z0(l,t,e,n,a))a.stopPropagation();else if(oh(t,a),e&4&&-1<K0.indexOf(t)){for(;l!==null;){var i=ea(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var s=Dn(i.pendingLanes);if(s!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;s;){var p=1<<31-ce(s);u.entanglements[1]|=p,s&=~p}Oe(i),(xt&6)===0&&(Di=re()+500,xl(0))}}break;case 31:case 13:u=Un(i,2),u!==null&&oe(u,i,2),ki(),br(i,2)}if(i=Sr(a),i===null&&sr(t,e,a,Ii,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else sr(t,e,a,null,n)}}function Sr(t){return t=xs(t),xr(t)}var Ii=null;function xr(t){if(Ii=null,t=ta(t),t!==null){var e=h(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=y(e),t!==null)return t;t=null}else if(n===31){if(t=S(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ii=t,null}function sh(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Rg()){case hu:return 2;case gu:return 8;case Hl:case kg:return 32;case mu:return 268435456;default:return 32}default:return 32}}var Tr=!1,Tn=null,En=null,Nn=null,Ml=new Map,Dl=new Map,An=[],K0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function oh(t,e){switch(t){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":En=null;break;case"mouseover":case"mouseout":Nn=null;break;case"pointerover":case"pointerout":Ml.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Dl.delete(e.pointerId)}}function Rl(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=ea(e),e!==null&&lh(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function Z0(t,e,n,a,l){switch(e){case"focusin":return Tn=Rl(Tn,t,e,n,a,l),!0;case"dragenter":return En=Rl(En,t,e,n,a,l),!0;case"mouseover":return Nn=Rl(Nn,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return Ml.set(i,Rl(Ml.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Dl.set(i,Rl(Dl.get(i)||null,t,e,n,a,l)),!0}return!1}function rh(t){var e=ta(t.target);if(e!==null){var n=h(e);if(n!==null){if(e=n.tag,e===13){if(e=y(n),e!==null){t.blockedOn=e,Su(t.priority,function(){ih(n)});return}}else if(e===31){if(e=S(n),e!==null){t.blockedOn=e,Su(t.priority,function(){ih(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ji(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Sr(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);Ss=a,n.target.dispatchEvent(a),Ss=null}else return e=ea(n),e!==null&&lh(e),t.blockedOn=n,!1;e.shift()}return!0}function uh(t,e,n){Ji(t)&&n.delete(e)}function I0(){Tr=!1,Tn!==null&&Ji(Tn)&&(Tn=null),En!==null&&Ji(En)&&(En=null),Nn!==null&&Ji(Nn)&&(Nn=null),Ml.forEach(uh),Dl.forEach(uh)}function Fi(t,e){t.blockedOn===e&&(t.blockedOn=null,Tr||(Tr=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,I0)))}var $i=null;function ch(t){$i!==t&&($i=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){$i===t&&($i=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(xr(a||n)===null)continue;break}var i=ea(n);i!==null&&(t.splice(e,3),e-=3,So(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function ja(t){function e(p){return Fi(p,t)}Tn!==null&&Fi(Tn,t),En!==null&&Fi(En,t),Nn!==null&&Fi(Nn,t),Ml.forEach(e),Dl.forEach(e);for(var n=0;n<An.length;n++){var a=An[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<An.length&&(n=An[0],n.blockedOn===null);)rh(n),n.blockedOn===null&&An.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],s=l[ee]||null;if(typeof i=="function")s||ch(n);else if(s){var u=null;if(i&&i.hasAttribute("formAction")){if(l=i,s=i[ee]||null)u=s.formAction;else if(xr(l)!==null)continue}else u=s.action;typeof u=="function"?n[a+1]=u:(n.splice(a,3),a-=3),ch(n)}}}function fh(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(s){return l=s})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function Er(t){this._internalRoot=t}Wi.prototype.render=Er.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(o(409));var n=e.current,a=ye();nh(n,a,t,e,null,null)},Wi.prototype.unmount=Er.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;nh(t.current,2,null,t,null,null),ki(),e[Pn]=null}};function Wi(t){this._internalRoot=t}Wi.prototype.unstable_scheduleHydration=function(t){if(t){var e=wu();t={blockedOn:null,target:t,priority:e};for(var n=0;n<An.length&&e!==0&&e<An[n].priority;n++);An.splice(n,0,t),n===0&&rh(t)}};var dh=c.version;if(dh!=="19.2.6")throw Error(o(527,dh,"19.2.6"));I.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(o(188)):(t=Object.keys(t).join(","),Error(o(268,t)));return t=v(e),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var J0={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:M,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Pi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Pi.isDisabled&&Pi.supportsFiber)try{Ya=Pi.inject(J0),ue=Pi}catch{}}return zl.createRoot=function(t,e){if(!f(t))throw Error(o(299));var n=!1,a="",l=bf,i=wf,s=Sf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=th(t,1,!1,null,null,n,a,null,l,i,s,fh),t[Pn]=e.current,ir(t),new Er(e)},zl.hydrateRoot=function(t,e,n){if(!f(t))throw Error(o(299));var a=!1,l="",i=bf,s=wf,u=Sf,p=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(s=n.onCaughtError),n.onRecoverableError!==void 0&&(u=n.onRecoverableError),n.formState!==void 0&&(p=n.formState)),e=th(t,1,!0,e,n??null,a,l,p,i,s,u,fh),e.context=eh(null),n=e.current,a=ye(),a=hs(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,Ga(e,n),Oe(e),t[Pn]=e.current,ir(t),new Wi(e)},zl.version="19.2.6",zl}var xh;function sp(){if(xh)return Cr.exports;xh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(c){console.error(c)}}return r(),Cr.exports=ip(),Cr.exports}var op=sp();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rp=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),dg=(...r)=>r.filter((c,d,o)=>!!c&&c.trim()!==""&&o.indexOf(c)===d).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var up={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cp=lt.forwardRef(({color:r="currentColor",size:c=24,strokeWidth:d=2,absoluteStrokeWidth:o,className:f="",children:h,iconNode:y,...S},m)=>lt.createElement("svg",{ref:m,...up,width:c,height:c,stroke:r,strokeWidth:o?Number(d)*24/Number(c):d,className:dg("lucide",f),...S},[...y.map(([v,_])=>lt.createElement(v,_)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=(r,c)=>{const d=lt.forwardRef(({className:o,...f},h)=>lt.createElement(cp,{ref:h,iconNode:c,className:dg(`lucide-${rp(r)}`,o),...f}));return d.displayName=`${r}`,d};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hg=Lt("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const is=Lt("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gg=Lt("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=Lt("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=Lt("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pg=Lt("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dp=Lt("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yg=Lt("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hp=Lt("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gp=Lt("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mp=Lt("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pp=Lt("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yp=Lt("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vp=Lt("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bp=Lt("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wp=Lt("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=Lt("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xp=Lt("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tp=Lt("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ep=Lt("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=Lt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function ls({group:r,size:c="md",dim:d}){const o=c==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return g.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${r.bgClass} ${r.textClass} ${o} ${d?"opacity-40":""}`,children:r.label})}const Ha=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Th=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function vg(r){if(r.length===0)return"";const c=[...r].sort((_,k)=>_.date.localeCompare(k.date)),d=c[0].date,o=c[c.length-1].date,[f,h,y]=d.split("-").map(Number),[S,m,v]=o.split("-").map(Number);return d===o?`${Ha[h-1]} ${y}, ${f}`:f===S&&h===m?`${Ha[h-1]} ${y}–${v}, ${f}`:f===S?`${Ha[h-1]} ${y} – ${Ha[m-1]} ${v}, ${f}`:`${Ha[h-1]} ${y}, ${f} – ${Ha[m-1]} ${v}, ${S}`}function Np(r){if(r.length===0)return"";const c=[...r].sort((H,Z)=>H.date.localeCompare(Z.date)),d=c[0].date,o=c[c.length-1].date,[f,h,y]=d.split("-").map(Number),[S,m,v]=o.split("-").map(Number),_=Th[new Date(f,h-1,y).getDay()],k=vg(r);if(d===o)return`${k} (${_})`;const j=Th[new Date(S,m-1,v).getDay()];return`${k} (${_}–${j})`}function su(r){return r.subtitle??vg(r.days)}function en(r){const[c,d]=r.split(":").map(Number);return c*60+d}const Ap=30;function Cp(r,c){let d=-1;for(let S=0;S<r.length&&en(r[S])<=c;S++)d=S;if(d===-1)return{index:-1,progress:0};const o=en(r[d]),f=r[d+1]?en(r[d+1]):null,h=f!==null?f:o+Ap;if(c>=h)return{index:-1,progress:0};const y=h===o?0:(c-o)/(h-o);return{index:d,progress:Math.max(0,Math.min(1,y))}}function bg(r){const[c,d]=r.split(":").map(Number);return`${c%12||12}:${d.toString().padStart(2,"0")}`}function wg(r){const[c]=r.split(":").map(Number);return c>=12?"PM":"AM"}function ou(){const r=new Date;return r.getHours()*60+r.getMinutes()}function Fn(){const r=new Date,c=r.getFullYear(),d=String(r.getMonth()+1).padStart(2,"0"),o=String(r.getDate()).padStart(2,"0");return`${c}-${d}-${o}`}function _p(){const r=new Date,c=r.getHours(),d=r.getMinutes(),o=c%12||12,f=c>=12?"PM":"AM";return`${o}:${d.toString().padStart(2,"0")} ${f}`}function Mp(r){if(r<=0)return"";if(r<60)return`${r} min`;const c=Math.floor(r/60),d=r%60;return d===0?`${c}h`:`${c}h ${d}m`}function Dp(r){const c=new Date(r);if(isNaN(c.getTime()))return r;const d=c.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),o=c.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${d}, ${o}`}function Eh(r,c){return r.flatMap(d=>{const o=c.find(f=>f.id===d);return o?[o]:[]})}function Rp({activity:r,runGroups:c,past:d}){const o=Eh(r.onTrack,c),f=Eh(r.inClass??[],c);return g.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${d?"opacity-60":""}`,children:g.jsxs("div",{className:"flex gap-4",children:[g.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[bg(r.time),g.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:wg(r.time)})]}),g.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[o.length>0&&g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),g.jsx("div",{className:"flex flex-wrap gap-1.5",children:o.map(h=>g.jsx(ls,{group:h},h.id))})]}),f.length>0&&g.jsxs(g.Fragment,{children:[o.length>0&&g.jsx("div",{className:"border-t border-gray-100"}),g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),g.jsx("div",{className:"flex flex-wrap gap-1.5",children:f.map(h=>g.jsx(ls,{group:h},h.id))})]})]}),r.note&&g.jsx("p",{className:"text-xs italic text-gray-500",children:r.note})]})]})})}function kp({activity:r,past:c}){const d=r.type==="lunch"||r.type==="special";return g.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${d?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${c?"opacity-60":""}`,children:g.jsxs("div",{className:"flex items-center gap-4",children:[g.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[bg(r.time),g.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:wg(r.time)})]}),d&&g.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:r.type==="lunch"?g.jsx(Ep,{size:16}):g.jsx(wp,{size:16})}),g.jsxs("div",{children:[g.jsx("p",{className:"text-sm font-medium text-gray-900",children:r.label}),r.subtitle&&g.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:r.subtitle})]})]})})}const au=lt.forwardRef(({activities:r},c)=>{const[,d]=lt.useState(0);lt.useEffect(()=>{const m=setInterval(()=>d(v=>v+1),3e4);return()=>clearInterval(m)},[]);const o=ou(),h=r.filter(m=>"time"in m).find(m=>en(m.time)>o),y=h?en(h.time)-o:null,S=y!==null?y<=5?"text-red-500":y<=10?"text-orange-500":"text-gray-400":"text-gray-400";return g.jsxs("div",{ref:c,"data-time-indicator":!0,className:"relative my-6",children:[g.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[g.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),g.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),g.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:_p()}),y!==null&&g.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${S}`,children:["Next activity starts in ",g.jsx("span",{className:"font-semibold",children:Mp(y)})]})]})});au.displayName="TimeIndicator";function Nh({collapsed:r,children:c}){return g.jsx("div",{"data-collapsed":r,"aria-hidden":r,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:r?"0fr":"1fr",opacity:r?0:1,marginBottom:r?0:"0.5rem"},children:g.jsx("div",{className:"overflow-hidden",children:c})})}function zp({activities:r,runGroups:c,isToday:d,selectedGroups:o,hidePast:f}){const h=lt.useRef(null),[,y]=lt.useState(0);lt.useEffect(()=>{if(!d)return;const R=setInterval(()=>y(N=>N+1),6e4);return()=>clearInterval(R)},[d]),lt.useEffect(()=>{if(!d)return;const R=setTimeout(()=>{var N;(N=h.current)==null||N.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(R)},[d]);const S=ou(),m=r.flatMap(R=>{if(R.type!=="session")return[R];if(o.length===0)return[R];const N=R.onTrack.filter(at=>o.includes(at)),G=(R.inClass??[]).filter(at=>o.includes(at));return N.length===0&&G.length===0?[]:[{...R,onTrack:N,inClass:G}]}),v=m.map(R=>R.type!=="break"&&f&&d&&en(R.time)<S);m.forEach((R,N)=>{if(R.type!=="break")return;const G=m.slice(0,N).some((at,X)=>at.type!=="break"&&!v[X]);v[N]=!G});const _=[],k=[];m.forEach((R,N)=>{R.type!=="break"&&(_.push(N),k.push(R.time))});const{index:j}=d?Cp(k,S):{index:-1},H=j===-1?-1:_[j],Z=d?m.findIndex(R=>R.type!=="break"&&en(R.time)>S):-1,J=d&&Z===-1&&m.length>0,V=m.length>0&&v.every(Boolean);let L;return g.jsxs("div",{className:"flex flex-col pb-10",children:[m.length>0&&g.jsx(Nh,{collapsed:!V,children:g.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[g.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),g.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),m.map((R,N)=>{const G=N===H,at=d&&R.type!=="break"&&!G&&en(R.time)<S;let X=null;!v[N]&&R.type==="session"&&R.sessionNumber!==void 0&&R.sessionNumber!==L&&(L=R.sessionNumber,X=g.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",R.sessionNumber]}));const B=R.type==="break"?g.jsxs("div",{className:"flex items-center gap-2 py-1",children:[g.jsx("div",{className:"h-px flex-1 bg-gray-200"}),g.jsx("span",{className:"text-xs text-gray-400 italic",children:R.label}),g.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):R.type==="session"?g.jsx(Rp,{activity:R,runGroups:c,past:at}):g.jsx(kp,{activity:R,past:at});return g.jsxs(Nh,{collapsed:v[N],children:[N===Z&&g.jsx(au,{ref:h,activities:m}),X,B]},N)}),J&&g.jsx(au,{ref:h,activities:m})]})}function Op({groups:r,selected:c,onChange:d}){const[o,f]=lt.useState(!1),h=m=>d(c.includes(m)?c.filter(v=>v!==m):[...c,m]),y=c.length===0||c.length===r.length,S=r.filter(m=>c.includes(m.id));return g.jsxs("div",{className:"relative",children:[g.jsxs("button",{onClick:()=>f(m=>!m),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[y?g.jsx("span",{className:"text-gray-700",children:"All run groups"}):g.jsx("div",{className:"flex items-center gap-1",children:S.map(m=>g.jsx(ls,{group:m,size:"sm"},m.id))}),g.jsx(gg,{size:14,className:"text-gray-400"})]}),o&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>f(!1)}),g.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[r.map(m=>g.jsxs("button",{onClick:()=>h(m.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[g.jsx(ls,{group:m,size:"md"}),c.includes(m.id)&&g.jsx(is,{size:14,className:"text-blue-500"})]},m.id)),g.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:g.jsx("button",{onClick:()=>{d([]),f(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:y?"All selected":"Clear filter"})})]})]})]})}function ts(r){return r.days.reduce((c,d)=>d.date<c?d.date:c,r.days[0].date)}function Ah(r){return r.days.reduce((c,d)=>d.date>c?d.date:c,r.days[0].date)}function Sg(r,c=Fn()){return r.days.some(d=>d.date===c)?"live":r.days.every(d=>d.date>c)?"upcoming":"past"}function ru(r,c=Fn()){const d=[],o=[],f=[];for(const h of r){const y=Sg(h,c);y==="live"?d.push(h):y==="upcoming"?o.push(h):f.push(h)}return d.sort((h,y)=>ts(h).localeCompare(ts(y))),o.sort((h,y)=>ts(h).localeCompare(ts(y))),f.sort((h,y)=>Ah(y).localeCompare(Ah(h))),{live:d,upcoming:o,past:f}}function xg(){return g.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[g.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function Rr({event:r,active:c,isLive:d,onClick:o}){return g.jsxs("button",{onClick:o,className:`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left ${c?"bg-blue-50":"hover:bg-gray-50"}`,children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-1.5",children:[g.jsx("span",{className:"text-sm font-semibold text-gray-900",children:r.name}),d&&g.jsx(xg,{})]}),g.jsx("div",{className:"text-xs text-gray-400",children:su(r)})]}),c&&g.jsx(is,{size:14,className:"text-blue-500 ml-3 shrink-0"})]})}function kr({label:r}){return g.jsx("div",{className:"px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400",children:r})}function Up({events:r,active:c,onChange:d,onGoHome:o}){const[f,h]=lt.useState(!1),{live:y,upcoming:S,past:m}=ru(r),v=Sg(c)==="live";return g.jsxs("div",{className:"relative min-w-0 pl-1",children:[g.jsxs("button",{onClick:()=>h(_=>!_),className:"flex items-center gap-1 text-left group min-w-0",children:[g.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:c.name}),v&&g.jsx(xg,{}),g.jsx(gg,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),g.jsx("p",{className:"text-sm text-gray-500",children:su(c)}),f&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>h(!1)}),g.jsxs("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[240px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[g.jsxs("button",{onClick:()=>{o(),h(!1)},className:"flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left hover:bg-gray-50",children:[g.jsx(yg,{size:14,className:"text-gray-500"}),g.jsx("span",{className:"text-sm font-semibold text-gray-900",children:"Home"})]}),y.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(kr,{label:"Live"}),y.map(_=>g.jsx(Rr,{event:_,active:_.id===c.id,isLive:!0,onClick:()=>{d(_),h(!1)}},_.id))]}),S.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(kr,{label:"Upcoming"}),S.map(_=>g.jsx(Rr,{event:_,active:_.id===c.id,isLive:!1,onClick:()=>{d(_),h(!1)}},_.id))]}),m.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(kr,{label:"Past"}),m.map(_=>g.jsx(Rr,{event:_,active:_.id===c.id,isLive:!1,onClick:()=>{d(_),h(!1)}},_.id))]})]})]})]})}function jp({checked:r,onChange:c,label:d}){return g.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[d&&g.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:d}),g.jsx("button",{type:"button",role:"switch","aria-checked":r,onClick:c,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:r?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:g.jsx("span",{style:{position:"absolute",top:"2px",left:r?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const In=72,Hp=110;function Bp({children:r,disabled:c,scrollContainerRef:d}){const[o,f]=lt.useState(0),[h,y]=lt.useState("idle"),S=lt.useRef(null),m=lt.useRef(0);lt.useEffect(()=>{if(c)return;const j=()=>{const V=d==null?void 0:d.current;return V?V.scrollTop:window.scrollY},H=V=>{j()===0&&(S.current=V.touches[0].clientY)},Z=V=>{if(S.current===null)return;const L=V.touches[0].clientY-S.current;if(L<=0){S.current=null;return}V.preventDefault();const R=L<In?L:In+(L-In)*.25;m.current=Math.min(R,Hp),f(m.current),y("pulling")},J=()=>{S.current!==null&&(S.current=null,m.current>=In?(y("refreshing"),f(In*.75),setTimeout(()=>window.location.reload(),600)):(y("releasing"),f(0),m.current=0,setTimeout(()=>y("idle"),250)))};return document.addEventListener("touchstart",H,{passive:!0}),document.addEventListener("touchmove",Z,{passive:!1}),document.addEventListener("touchend",J),document.addEventListener("touchcancel",J),()=>{document.removeEventListener("touchstart",H),document.removeEventListener("touchmove",Z),document.removeEventListener("touchend",J),document.removeEventListener("touchcancel",J)}},[c,d]);const v=h==="releasing"||h==="refreshing",_=Math.min(o/In,1),k=o>=In;return g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${o}px)`,transition:v?"transform 0.25s ease":"none"},children:g.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${k?"text-blue-500":"text-gray-400"}`,children:g.jsx(Sp,{size:16,className:h==="refreshing"?"animate-spin":"",style:h!=="refreshing"?{transform:`rotate(${_*270}deg)`}:void 0})})}),g.jsx("div",{style:{transform:`translateY(${o}px)`,transition:v?"transform 0.25s ease":"none"},children:r})]})}function Lp({groups:r}){const c=r.filter(d=>d.description);return c.length===0?null:g.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[g.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),g.jsx("ul",{className:"flex flex-col gap-1.5",children:c.map(d=>g.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[g.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${d.bgClass}`,"aria-hidden":"true"}),g.jsx("span",{className:"font-medium text-gray-900",children:d.label}),g.jsx("span",{className:"text-gray-400",children:"·"}),g.jsx("span",{children:d.description})]},d.id))})]})}const Ch=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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
    renderNoEvents(w, p, stale, upcoming, parsed, notifStatus)
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
    el.textColor = bits[i].warn ? new Color("#ef4444") : p.muted
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
// upcoming events that didn't fit in the countdown card(s).
function drawMoreUpcomingFooter(w, p, count) {
  const row = w.addStack()
  row.centerAlignContent()
  row.addSpacer()
  const text = row.addText(\`\${count} more upcoming event\${count === 1 ? "" : "s"}\`)
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

function renderNoEvents(w, p, stale, upcoming, parsed, notifStatus) {
  if (!upcoming || upcoming.items.length === 0) {
    renderZeroState(w, p, stale)
    return
  }
  renderCountdownState(w, p, stale, upcoming, parsed, notifStatus)
}

// True zero state — nothing scheduled today AND no future event either.
// Keeps the plain "HPDE" header (there's no info card to make it
// redundant here), with the message centered in the space below it —
// matching the AA/Podcasts/Umami-style empty states this was designed
// against, rather than the vertically-centered "floating in a blank
// box" look from #116.
function renderZeroState(w, p, stale) {
  // Flex spacers on both sides center the whole header+message column
  // horizontally in the widget — there's no populated header to line
  // up with here, so there's no reason for the LEFT_GUTTER_WIDTH
  // asymmetric inset that column uses elsewhere.
  const outer = w.addStack()
  outer.addSpacer()
  const col = outer.addStack()
  col.layoutVertically()
  col.centerAlignContent()

  const title = col.addText("HPDE")
  title.font = rBoldFont(18)
  title.textColor = p.fg

  if (stale) {
    col.addSpacer(6)
    const s = col.addText("(cached)")
    s.font = rFont(9)
    s.textColor = p.muted
  }

  // Flex spacers on both sides center the message in whatever space
  // is left under the header, instead of it sitting immediately below
  // (too cramped) or dead-centered in the whole widget (the #116 bug).
  col.addSpacer()
  const msg = col.addText("No upcoming events")
  msg.font = rFont(14)
  msg.textColor = p.muted
  col.addSpacer()

  outer.addSpacer()
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

// Weeks+days once the gap is more than a week — a bare "9 days away"
// stops being an intuitive read past that point, closer to "a week
// and change" than a day count.
function countdownParts(days) {
  if (days > 6) {
    return { split: true, weeks: Math.floor(days / 7), days: days % 7 }
  }
  return { split: false, days }
}

// There's no event today, but a future one is scheduled — show a
// countdown instead of a plain "Next: <name>" line. Info (name, date,
// organizer, location, track config) on the left, same field order as
// the event-details drawer; the countdown "well" on the right.
// Reserved below the card for drawStatusFooter (stale/notification/
// invalid-token bits), ~16pt — but only when it's actually going to
// render something (see statusFooterBits in renderCountdownState);
// otherwise the card gets that space instead of leaving a dead gap
// at the bottom of the widget.
const COUNTDOWN_FOOTER_RESERVE = 18
const MORE_UPCOMING_FOOTER_RESERVE = 18
const COUNTDOWN_CARD_GAP = 10
// Symmetric left/right margin for the countdown card. Deliberately NOT
// LEFT_GUTTER_WIDTH (that's sized for the marker-dot column in the
// populated schedule view, which doesn't exist here) — using it left
// the card's background hugging the left edge while sitting flush
// against the right, an asymmetric card that also never stretched to
// fill the widget's actual width.
const COUNTDOWN_CARD_MARGIN = 8

// One or two countdown cards (Medium always gets one; Large can stack
// two), plus a "N more upcoming" footer for whatever didn't fit —
// same convention as drawMoreActivitiesFooter for a day's activities.
function renderCountdownState(w, p, stale, upcoming, parsed, notifStatus) {
  const { items, total } = upcoming
  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"
  const remaining = total - items.length

  // A single upcoming event still gets the full rich card (all four
  // info rows) even on Large — only stacking a second card forces both
  // into the denser (Medium-style, two-row) layout to fit the halved
  // vertical budget.
  const rich = isLarge && items.length === 1

  // Only reserve room for drawStatusFooter (called separately, right
  // after this returns) when it's actually going to render something —
  // otherwise the reserve is dead space with nothing sitting in it,
  // pushing the card (and the "more upcoming" footer under it) further
  // from the bottom edge than they need to be.
  const hasStatusFooter = statusFooterBits(stale, parsed, notifStatus).length > 0
  const reserve = (hasStatusFooter ? COUNTDOWN_FOOTER_RESERVE : 0) + (remaining > 0 ? MORE_UPCOMING_FOOTER_RESERVE : 0)
  const availableH = widgetInteriorHeight() - reserve
  const cardHeight = (availableH - COUNTDOWN_CARD_GAP * (items.length - 1)) / items.length

  for (let i = 0; i < items.length; i++) {
    if (i > 0) w.addSpacer(COUNTDOWN_CARD_GAP)
    drawCountdownCard(w, p, items[i], rich, cardHeight)
  }

  if (remaining > 0) {
    w.addSpacer(6)
    drawMoreUpcomingFooter(w, p, remaining)
  }
}

function drawCountdownCard(w, p, next, rich, cardHeight) {
  const outer = w.addStack()
  outer.addSpacer(COUNTDOWN_CARD_MARGIN)

  const card = outer.addStack()
  card.centerAlignContent()
  // Explicit height instead of letting the card wrap its own (short)
  // content — cardHeight already accounts for the widget's own
  // top/bottom padding and however many cards + footers are sharing
  // the interior, so this fills its share instead of leaving dead
  // white space below a content-sized card.
  card.size = new Size(0, cardHeight)
  card.backgroundColor = p.cardBg
  card.cornerRadius = 20
  card.setPadding(rich ? 14 : 8, rich ? 14 : 8, rich ? 14 : 8, rich ? 14 : 8)

  const infoCol = card.addStack()
  infoCol.layoutVertically()

  const title = infoCol.addText(next.event.name)
  title.font = rBoldFont(rich ? 18 : 15)
  title.textColor = p.fg
  title.lineLimit = 1

  infoCol.addSpacer(rich ? 10 : 6)

  // SF Symbol per row picked to match the web app's lucide icon for the
  // same field (EventDetailsDrawer: Calendar / Users / MapPin / Route) —
  // the two apps should read as one system, not diverge on iconography
  // just because one draws with SF Symbols and the other with lucide.
  const rows = []
  rows.push({ icon: "calendar", text: \`\${next.day.label}, \${shortDate(next.day.date)}\` })
  if (next.event.organizer) rows.push({ icon: "person.2", text: next.event.organizer })
  if (next.event.track) {
    rows.push({
      icon: "mappin",
      text: next.event.city ? \`\${next.event.track}, \${next.event.city}\` : next.event.track,
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
    if (i > 0) infoCol.addSpacer(rich ? 8 : 5)
    addInfoRow(infoCol, rows[i], p, rich)
  }

  // Fixed minimum gap, then a flex spacer. The flex is what stretches
  // CARD to the widget's full width: a stack sizes to fit its content,
  // but a flex spacer's "as large as possible" ideal size cascades out
  // through every ancestor stack that isn't otherwise constrained
  // (the same trick drawActivityRow uses — see "Trailing flex spacer
  // stretches the CARDCONTAINER" there) — here it pins the well to the
  // card's right edge instead of leaving blank space after it.
  card.addSpacer(rich ? 20 : 12)
  card.addSpacer()

  const well = card.addStack()
  well.backgroundColor = p.currentCardBg
  well.cornerRadius = 16
  well.layoutVertically()
  well.centerAlignContent()
  well.setPadding(8, rich ? 16 : 10, 8, rich ? 16 : 10)

  const parts = countdownParts(daysUntil(next.day.date))
  if (parts.split) {
    const row = well.addStack()
    row.bottomAlignContent()
    row.spacing = rich ? 6 : 4
    addCountUnit(row, parts.weeks, pluralize(parts.weeks, "week"), p, rich)
    addCountColon(row, p, rich)
    addCountUnit(row, parts.days, pluralize(parts.days, "day"), p, rich)
  } else {
    addCountUnit(well, parts.days, \`\${pluralize(parts.days, "day")} away\`, p, rich)
  }

  // Matches the leading COUNTDOWN_CARD_MARGIN spacer above, so the
  // card sits with equal margin on both sides instead of flush
  // against the widget's right edge — drawStatusFooter (back in
  // makeWidget) already surfaces stale/notification/invalid-token
  // state uniformly, so it isn't repeated here.
  outer.addSpacer(COUNTDOWN_CARD_MARGIN)
}

function addInfoRow(col, row, p, isLarge) {
  const stack = col.addStack()
  stack.centerAlignContent()
  stack.spacing = isLarge ? 8 : 6
  if (typeof SFSymbol !== "undefined") {
    const sym = SFSymbol.named(row.icon)
    if (sym) {
      const img = stack.addImage(sym.image)
      img.imageSize = new Size(isLarge ? 14 : 12, isLarge ? 14 : 12)
      img.tintColor = p.muted
    }
  }
  const text = stack.addText(row.text)
  text.font = rFont(isLarge ? 13 : 11)
  text.textColor = p.mutedStrong
  text.lineLimit = 1
}

// One "12 / DAYS"-style stacked digit+label block inside the well.
function addCountUnit(container, n, label, p, isLarge) {
  const col = container.addStack()
  col.layoutVertically()
  const num = col.addText(String(n))
  num.font = rBoldFont(isLarge ? 40 : 26)
  num.textColor = p.accent
  const lbl = col.addText(label.toUpperCase())
  lbl.font = rSemiboldFont(isLarge ? 10 : 8)
  lbl.textColor = p.mutedStrong
}

// Colon between the week and day units, given the same two-row
// (glyph + label-height spacer) shape as addCountUnit so
// row.bottomAlignContent() lines all three blocks up on the digit,
// not the label.
function addCountColon(row, p, isLarge) {
  const col = row.addStack()
  col.layoutVertically()
  const colon = col.addText(":")
  colon.font = rBoldFont(isLarge ? 28 : 18)
  colon.textColor = p.divider
  const spacer = col.addText(".")
  spacer.font = rSemiboldFont(isLarge ? 10 : 8)
  spacer.textOpacity = 0
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
`;function Yp(){const[r,c]=lt.useState(!1);lt.useEffect(()=>{window.scrollTo(0,0)},[]);async function d(){await navigator.clipboard.writeText(Ch),c(!0),setTimeout(()=>c(!1),2e3)}return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsxs("button",{onClick:d,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[r?g.jsx(is,{size:16,className:"text-green-600"}):g.jsx(pg,{size:16}),r?"Copied":"Copy"]}),g.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:g.jsx(as,{size:18})})]})]}),g.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",g.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),g.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:g.jsx("code",{children:Ch})})]})})}var Ba={},zr,_h;function qp(){return _h||(_h=1,zr=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),zr}var Or={},_n={},Mh;function $n(){if(Mh)return _n;Mh=1;let r;const c=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(o){if(!o)throw new Error('"version" cannot be null or undefined');if(o<1||o>40)throw new Error('"version" should be in range from 1 to 40');return o*4+17},_n.getSymbolTotalCodewords=function(o){return c[o]},_n.getBCHDigit=function(d){let o=0;for(;d!==0;)o++,d>>>=1;return o},_n.setToSJISFunction=function(o){if(typeof o!="function")throw new Error('"toSJISFunc" is not a valid function.');r=o},_n.isKanjiModeEnabled=function(){return typeof r<"u"},_n.toSJIS=function(o){return r(o)},_n}var Ur={},Dh;function uu(){return Dh||(Dh=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function c(d){if(typeof d!="string")throw new Error("Param is not a string");switch(d.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+d)}}r.isValid=function(o){return o&&typeof o.bit<"u"&&o.bit>=0&&o.bit<4},r.from=function(o,f){if(r.isValid(o))return o;try{return c(o)}catch{return f}}})(Ur)),Ur}var jr,Rh;function Gp(){if(Rh)return jr;Rh=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(c){const d=Math.floor(c/8);return(this.buffer[d]>>>7-c%8&1)===1},put:function(c,d){for(let o=0;o<d;o++)this.putBit((c>>>d-o-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(c){const d=Math.floor(this.length/8);this.buffer.length<=d&&this.buffer.push(0),c&&(this.buffer[d]|=128>>>this.length%8),this.length++}},jr=r,jr}var Hr,kh;function Xp(){if(kh)return Hr;kh=1;function r(c){if(!c||c<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=c,this.data=new Uint8Array(c*c),this.reservedBit=new Uint8Array(c*c)}return r.prototype.set=function(c,d,o,f){const h=c*this.size+d;this.data[h]=o,f&&(this.reservedBit[h]=!0)},r.prototype.get=function(c,d){return this.data[c*this.size+d]},r.prototype.xor=function(c,d,o){this.data[c*this.size+d]^=o},r.prototype.isReserved=function(c,d){return this.reservedBit[c*this.size+d]},Hr=r,Hr}var Br={},zh;function Vp(){return zh||(zh=1,(function(r){const c=$n().getSymbolSize;r.getRowColCoords=function(o){if(o===1)return[];const f=Math.floor(o/7)+2,h=c(o),y=h===145?26:Math.ceil((h-13)/(2*f-2))*2,S=[h-7];for(let m=1;m<f-1;m++)S[m]=S[m-1]-y;return S.push(6),S.reverse()},r.getPositions=function(o){const f=[],h=r.getRowColCoords(o),y=h.length;for(let S=0;S<y;S++)for(let m=0;m<y;m++)S===0&&m===0||S===0&&m===y-1||S===y-1&&m===0||f.push([h[S],h[m]]);return f}})(Br)),Br}var Lr={},Oh;function Qp(){if(Oh)return Lr;Oh=1;const r=$n().getSymbolSize,c=7;return Lr.getPositions=function(o){const f=r(o);return[[0,0],[f-c,0],[0,f-c]]},Lr}var Yr={},Uh;function Kp(){return Uh||(Uh=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const c={N1:3,N2:3,N3:40,N4:10};r.isValid=function(f){return f!=null&&f!==""&&!isNaN(f)&&f>=0&&f<=7},r.from=function(f){return r.isValid(f)?parseInt(f,10):void 0},r.getPenaltyN1=function(f){const h=f.size;let y=0,S=0,m=0,v=null,_=null;for(let k=0;k<h;k++){S=m=0,v=_=null;for(let j=0;j<h;j++){let H=f.get(k,j);H===v?S++:(S>=5&&(y+=c.N1+(S-5)),v=H,S=1),H=f.get(j,k),H===_?m++:(m>=5&&(y+=c.N1+(m-5)),_=H,m=1)}S>=5&&(y+=c.N1+(S-5)),m>=5&&(y+=c.N1+(m-5))}return y},r.getPenaltyN2=function(f){const h=f.size;let y=0;for(let S=0;S<h-1;S++)for(let m=0;m<h-1;m++){const v=f.get(S,m)+f.get(S,m+1)+f.get(S+1,m)+f.get(S+1,m+1);(v===4||v===0)&&y++}return y*c.N2},r.getPenaltyN3=function(f){const h=f.size;let y=0,S=0,m=0;for(let v=0;v<h;v++){S=m=0;for(let _=0;_<h;_++)S=S<<1&2047|f.get(v,_),_>=10&&(S===1488||S===93)&&y++,m=m<<1&2047|f.get(_,v),_>=10&&(m===1488||m===93)&&y++}return y*c.N3},r.getPenaltyN4=function(f){let h=0;const y=f.data.length;for(let m=0;m<y;m++)h+=f.data[m];return Math.abs(Math.ceil(h*100/y/5)-10)*c.N4};function d(o,f,h){switch(o){case r.Patterns.PATTERN000:return(f+h)%2===0;case r.Patterns.PATTERN001:return f%2===0;case r.Patterns.PATTERN010:return h%3===0;case r.Patterns.PATTERN011:return(f+h)%3===0;case r.Patterns.PATTERN100:return(Math.floor(f/2)+Math.floor(h/3))%2===0;case r.Patterns.PATTERN101:return f*h%2+f*h%3===0;case r.Patterns.PATTERN110:return(f*h%2+f*h%3)%2===0;case r.Patterns.PATTERN111:return(f*h%3+(f+h)%2)%2===0;default:throw new Error("bad maskPattern:"+o)}}r.applyMask=function(f,h){const y=h.size;for(let S=0;S<y;S++)for(let m=0;m<y;m++)h.isReserved(m,S)||h.xor(m,S,d(f,m,S))},r.getBestMask=function(f,h){const y=Object.keys(r.Patterns).length;let S=0,m=1/0;for(let v=0;v<y;v++){h(v),r.applyMask(v,f);const _=r.getPenaltyN1(f)+r.getPenaltyN2(f)+r.getPenaltyN3(f)+r.getPenaltyN4(f);r.applyMask(v,f),_<m&&(m=_,S=v)}return S}})(Yr)),Yr}var es={},jh;function Tg(){if(jh)return es;jh=1;const r=uu(),c=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],d=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return es.getBlocksCount=function(f,h){switch(h){case r.L:return c[(f-1)*4+0];case r.M:return c[(f-1)*4+1];case r.Q:return c[(f-1)*4+2];case r.H:return c[(f-1)*4+3];default:return}},es.getTotalCodewordsCount=function(f,h){switch(h){case r.L:return d[(f-1)*4+0];case r.M:return d[(f-1)*4+1];case r.Q:return d[(f-1)*4+2];case r.H:return d[(f-1)*4+3];default:return}},es}var qr={},Ol={},Hh;function Zp(){if(Hh)return Ol;Hh=1;const r=new Uint8Array(512),c=new Uint8Array(256);return(function(){let o=1;for(let f=0;f<255;f++)r[f]=o,c[o]=f,o<<=1,o&256&&(o^=285);for(let f=255;f<512;f++)r[f]=r[f-255]})(),Ol.log=function(o){if(o<1)throw new Error("log("+o+")");return c[o]},Ol.exp=function(o){return r[o]},Ol.mul=function(o,f){return o===0||f===0?0:r[c[o]+c[f]]},Ol}var Bh;function Ip(){return Bh||(Bh=1,(function(r){const c=Zp();r.mul=function(o,f){const h=new Uint8Array(o.length+f.length-1);for(let y=0;y<o.length;y++)for(let S=0;S<f.length;S++)h[y+S]^=c.mul(o[y],f[S]);return h},r.mod=function(o,f){let h=new Uint8Array(o);for(;h.length-f.length>=0;){const y=h[0];for(let m=0;m<f.length;m++)h[m]^=c.mul(f[m],y);let S=0;for(;S<h.length&&h[S]===0;)S++;h=h.slice(S)}return h},r.generateECPolynomial=function(o){let f=new Uint8Array([1]);for(let h=0;h<o;h++)f=r.mul(f,new Uint8Array([1,c.exp(h)]));return f}})(qr)),qr}var Gr,Lh;function Jp(){if(Lh)return Gr;Lh=1;const r=Ip();function c(d){this.genPoly=void 0,this.degree=d,this.degree&&this.initialize(this.degree)}return c.prototype.initialize=function(o){this.degree=o,this.genPoly=r.generateECPolynomial(this.degree)},c.prototype.encode=function(o){if(!this.genPoly)throw new Error("Encoder not initialized");const f=new Uint8Array(o.length+this.degree);f.set(o);const h=r.mod(f,this.genPoly),y=this.degree-h.length;if(y>0){const S=new Uint8Array(this.degree);return S.set(h,y),S}return h},Gr=c,Gr}var Xr={},Vr={},Qr={},Yh;function Eg(){return Yh||(Yh=1,Qr.isValid=function(c){return!isNaN(c)&&c>=1&&c<=40}),Qr}var Ue={},qh;function Ng(){if(qh)return Ue;qh=1;const r="[0-9]+",c="[A-Z $%*+\\-./:]+";let d="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";d=d.replace(/u/g,"\\u");const o="(?:(?![A-Z0-9 $%*+\\-./:]|"+d+`)(?:.|[\r
]))+`;Ue.KANJI=new RegExp(d,"g"),Ue.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Ue.BYTE=new RegExp(o,"g"),Ue.NUMERIC=new RegExp(r,"g"),Ue.ALPHANUMERIC=new RegExp(c,"g");const f=new RegExp("^"+d+"$"),h=new RegExp("^"+r+"$"),y=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Ue.testKanji=function(m){return f.test(m)},Ue.testNumeric=function(m){return h.test(m)},Ue.testAlphanumeric=function(m){return y.test(m)},Ue}var Gh;function Wn(){return Gh||(Gh=1,(function(r){const c=Eg(),d=Ng();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(h,y){if(!h.ccBits)throw new Error("Invalid mode: "+h);if(!c.isValid(y))throw new Error("Invalid version: "+y);return y>=1&&y<10?h.ccBits[0]:y<27?h.ccBits[1]:h.ccBits[2]},r.getBestModeForData=function(h){return d.testNumeric(h)?r.NUMERIC:d.testAlphanumeric(h)?r.ALPHANUMERIC:d.testKanji(h)?r.KANJI:r.BYTE},r.toString=function(h){if(h&&h.id)return h.id;throw new Error("Invalid mode")},r.isValid=function(h){return h&&h.bit&&h.ccBits};function o(f){if(typeof f!="string")throw new Error("Param is not a string");switch(f.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+f)}}r.from=function(h,y){if(r.isValid(h))return h;try{return o(h)}catch{return y}}})(Vr)),Vr}var Xh;function Fp(){return Xh||(Xh=1,(function(r){const c=$n(),d=Tg(),o=uu(),f=Wn(),h=Eg(),y=7973,S=c.getBCHDigit(y);function m(j,H,Z){for(let J=1;J<=40;J++)if(H<=r.getCapacity(J,Z,j))return J}function v(j,H){return f.getCharCountIndicator(j,H)+4}function _(j,H){let Z=0;return j.forEach(function(J){const V=v(J.mode,H);Z+=V+J.getBitsLength()}),Z}function k(j,H){for(let Z=1;Z<=40;Z++)if(_(j,Z)<=r.getCapacity(Z,H,f.MIXED))return Z}r.from=function(H,Z){return h.isValid(H)?parseInt(H,10):Z},r.getCapacity=function(H,Z,J){if(!h.isValid(H))throw new Error("Invalid QR Code version");typeof J>"u"&&(J=f.BYTE);const V=c.getSymbolTotalCodewords(H),L=d.getTotalCodewordsCount(H,Z),R=(V-L)*8;if(J===f.MIXED)return R;const N=R-v(J,H);switch(J){case f.NUMERIC:return Math.floor(N/10*3);case f.ALPHANUMERIC:return Math.floor(N/11*2);case f.KANJI:return Math.floor(N/13);case f.BYTE:default:return Math.floor(N/8)}},r.getBestVersionForData=function(H,Z){let J;const V=o.from(Z,o.M);if(Array.isArray(H)){if(H.length>1)return k(H,V);if(H.length===0)return 1;J=H[0]}else J=H;return m(J.mode,J.getLength(),V)},r.getEncodedBits=function(H){if(!h.isValid(H)||H<7)throw new Error("Invalid QR Code version");let Z=H<<12;for(;c.getBCHDigit(Z)-S>=0;)Z^=y<<c.getBCHDigit(Z)-S;return H<<12|Z}})(Xr)),Xr}var Kr={},Vh;function $p(){if(Vh)return Kr;Vh=1;const r=$n(),c=1335,d=21522,o=r.getBCHDigit(c);return Kr.getEncodedBits=function(h,y){const S=h.bit<<3|y;let m=S<<10;for(;r.getBCHDigit(m)-o>=0;)m^=c<<r.getBCHDigit(m)-o;return(S<<10|m)^d},Kr}var Zr={},Ir,Qh;function Wp(){if(Qh)return Ir;Qh=1;const r=Wn();function c(d){this.mode=r.NUMERIC,this.data=d.toString()}return c.getBitsLength=function(o){return 10*Math.floor(o/3)+(o%3?o%3*3+1:0)},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(o){let f,h,y;for(f=0;f+3<=this.data.length;f+=3)h=this.data.substr(f,3),y=parseInt(h,10),o.put(y,10);const S=this.data.length-f;S>0&&(h=this.data.substr(f),y=parseInt(h,10),o.put(y,S*3+1))},Ir=c,Ir}var Jr,Kh;function Pp(){if(Kh)return Jr;Kh=1;const r=Wn(),c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function d(o){this.mode=r.ALPHANUMERIC,this.data=o}return d.getBitsLength=function(f){return 11*Math.floor(f/2)+6*(f%2)},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(f){let h;for(h=0;h+2<=this.data.length;h+=2){let y=c.indexOf(this.data[h])*45;y+=c.indexOf(this.data[h+1]),f.put(y,11)}this.data.length%2&&f.put(c.indexOf(this.data[h]),6)},Jr=d,Jr}var Fr,Zh;function ty(){if(Zh)return Fr;Zh=1;const r=Wn();function c(d){this.mode=r.BYTE,typeof d=="string"?this.data=new TextEncoder().encode(d):this.data=new Uint8Array(d)}return c.getBitsLength=function(o){return o*8},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(d){for(let o=0,f=this.data.length;o<f;o++)d.put(this.data[o],8)},Fr=c,Fr}var $r,Ih;function ey(){if(Ih)return $r;Ih=1;const r=Wn(),c=$n();function d(o){this.mode=r.KANJI,this.data=o}return d.getBitsLength=function(f){return f*13},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(o){let f;for(f=0;f<this.data.length;f++){let h=c.toSJIS(this.data[f]);if(h>=33088&&h<=40956)h-=33088;else if(h>=57408&&h<=60351)h-=49472;else throw new Error("Invalid SJIS character: "+this.data[f]+`
Make sure your charset is UTF-8`);h=(h>>>8&255)*192+(h&255),o.put(h,13)}},$r=d,$r}var Wr={exports:{}},Jh;function ny(){return Jh||(Jh=1,(function(r){var c={single_source_shortest_paths:function(d,o,f){var h={},y={};y[o]=0;var S=c.PriorityQueue.make();S.push(o,0);for(var m,v,_,k,j,H,Z,J,V;!S.empty();){m=S.pop(),v=m.value,k=m.cost,j=d[v]||{};for(_ in j)j.hasOwnProperty(_)&&(H=j[_],Z=k+H,J=y[_],V=typeof y[_]>"u",(V||J>Z)&&(y[_]=Z,S.push(_,Z),h[_]=v))}if(typeof f<"u"&&typeof y[f]>"u"){var L=["Could not find a path from ",o," to ",f,"."].join("");throw new Error(L)}return h},extract_shortest_path_from_predecessor_list:function(d,o){for(var f=[],h=o;h;)f.push(h),d[h],h=d[h];return f.reverse(),f},find_path:function(d,o,f){var h=c.single_source_shortest_paths(d,o,f);return c.extract_shortest_path_from_predecessor_list(h,f)},PriorityQueue:{make:function(d){var o=c.PriorityQueue,f={},h;d=d||{};for(h in o)o.hasOwnProperty(h)&&(f[h]=o[h]);return f.queue=[],f.sorter=d.sorter||o.default_sorter,f},default_sorter:function(d,o){return d.cost-o.cost},push:function(d,o){var f={value:d,cost:o};this.queue.push(f),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=c})(Wr)),Wr.exports}var Fh;function ay(){return Fh||(Fh=1,(function(r){const c=Wn(),d=Wp(),o=Pp(),f=ty(),h=ey(),y=Ng(),S=$n(),m=ny();function v(L){return unescape(encodeURIComponent(L)).length}function _(L,R,N){const G=[];let at;for(;(at=L.exec(N))!==null;)G.push({data:at[0],index:at.index,mode:R,length:at[0].length});return G}function k(L){const R=_(y.NUMERIC,c.NUMERIC,L),N=_(y.ALPHANUMERIC,c.ALPHANUMERIC,L);let G,at;return S.isKanjiModeEnabled()?(G=_(y.BYTE,c.BYTE,L),at=_(y.KANJI,c.KANJI,L)):(G=_(y.BYTE_KANJI,c.BYTE,L),at=[]),R.concat(N,G,at).sort(function(B,Q){return B.index-Q.index}).map(function(B){return{data:B.data,mode:B.mode,length:B.length}})}function j(L,R){switch(R){case c.NUMERIC:return d.getBitsLength(L);case c.ALPHANUMERIC:return o.getBitsLength(L);case c.KANJI:return h.getBitsLength(L);case c.BYTE:return f.getBitsLength(L)}}function H(L){return L.reduce(function(R,N){const G=R.length-1>=0?R[R.length-1]:null;return G&&G.mode===N.mode?(R[R.length-1].data+=N.data,R):(R.push(N),R)},[])}function Z(L){const R=[];for(let N=0;N<L.length;N++){const G=L[N];switch(G.mode){case c.NUMERIC:R.push([G,{data:G.data,mode:c.ALPHANUMERIC,length:G.length},{data:G.data,mode:c.BYTE,length:G.length}]);break;case c.ALPHANUMERIC:R.push([G,{data:G.data,mode:c.BYTE,length:G.length}]);break;case c.KANJI:R.push([G,{data:G.data,mode:c.BYTE,length:v(G.data)}]);break;case c.BYTE:R.push([{data:G.data,mode:c.BYTE,length:v(G.data)}])}}return R}function J(L,R){const N={},G={start:{}};let at=["start"];for(let X=0;X<L.length;X++){const B=L[X],Q=[];for(let q=0;q<B.length;q++){const P=B[q],Y=""+X+q;Q.push(Y),N[Y]={node:P,lastCount:0},G[Y]={};for(let F=0;F<at.length;F++){const et=at[F];N[et]&&N[et].node.mode===P.mode?(G[et][Y]=j(N[et].lastCount+P.length,P.mode)-j(N[et].lastCount,P.mode),N[et].lastCount+=P.length):(N[et]&&(N[et].lastCount=P.length),G[et][Y]=j(P.length,P.mode)+4+c.getCharCountIndicator(P.mode,R))}}at=Q}for(let X=0;X<at.length;X++)G[at[X]].end=0;return{map:G,table:N}}function V(L,R){let N;const G=c.getBestModeForData(L);if(N=c.from(R,G),N!==c.BYTE&&N.bit<G.bit)throw new Error('"'+L+'" cannot be encoded with mode '+c.toString(N)+`.
 Suggested mode is: `+c.toString(G));switch(N===c.KANJI&&!S.isKanjiModeEnabled()&&(N=c.BYTE),N){case c.NUMERIC:return new d(L);case c.ALPHANUMERIC:return new o(L);case c.KANJI:return new h(L);case c.BYTE:return new f(L)}}r.fromArray=function(R){return R.reduce(function(N,G){return typeof G=="string"?N.push(V(G,null)):G.data&&N.push(V(G.data,G.mode)),N},[])},r.fromString=function(R,N){const G=k(R,S.isKanjiModeEnabled()),at=Z(G),X=J(at,N),B=m.find_path(X.map,"start","end"),Q=[];for(let q=1;q<B.length-1;q++)Q.push(X.table[B[q]].node);return r.fromArray(H(Q))},r.rawSplit=function(R){return r.fromArray(k(R,S.isKanjiModeEnabled()))}})(Zr)),Zr}var $h;function ly(){if($h)return Or;$h=1;const r=$n(),c=uu(),d=Gp(),o=Xp(),f=Vp(),h=Qp(),y=Kp(),S=Tg(),m=Jp(),v=Fp(),_=$p(),k=Wn(),j=ay();function H(X,B){const Q=X.size,q=h.getPositions(B);for(let P=0;P<q.length;P++){const Y=q[P][0],F=q[P][1];for(let et=-1;et<=7;et++)if(!(Y+et<=-1||Q<=Y+et))for(let ot=-1;ot<=7;ot++)F+ot<=-1||Q<=F+ot||(et>=0&&et<=6&&(ot===0||ot===6)||ot>=0&&ot<=6&&(et===0||et===6)||et>=2&&et<=4&&ot>=2&&ot<=4?X.set(Y+et,F+ot,!0,!0):X.set(Y+et,F+ot,!1,!0))}}function Z(X){const B=X.size;for(let Q=8;Q<B-8;Q++){const q=Q%2===0;X.set(Q,6,q,!0),X.set(6,Q,q,!0)}}function J(X,B){const Q=f.getPositions(B);for(let q=0;q<Q.length;q++){const P=Q[q][0],Y=Q[q][1];for(let F=-2;F<=2;F++)for(let et=-2;et<=2;et++)F===-2||F===2||et===-2||et===2||F===0&&et===0?X.set(P+F,Y+et,!0,!0):X.set(P+F,Y+et,!1,!0)}}function V(X,B){const Q=X.size,q=v.getEncodedBits(B);let P,Y,F;for(let et=0;et<18;et++)P=Math.floor(et/3),Y=et%3+Q-8-3,F=(q>>et&1)===1,X.set(P,Y,F,!0),X.set(Y,P,F,!0)}function L(X,B,Q){const q=X.size,P=_.getEncodedBits(B,Q);let Y,F;for(Y=0;Y<15;Y++)F=(P>>Y&1)===1,Y<6?X.set(Y,8,F,!0):Y<8?X.set(Y+1,8,F,!0):X.set(q-15+Y,8,F,!0),Y<8?X.set(8,q-Y-1,F,!0):Y<9?X.set(8,15-Y-1+1,F,!0):X.set(8,15-Y-1,F,!0);X.set(q-8,8,1,!0)}function R(X,B){const Q=X.size;let q=-1,P=Q-1,Y=7,F=0;for(let et=Q-1;et>0;et-=2)for(et===6&&et--;;){for(let ot=0;ot<2;ot++)if(!X.isReserved(P,et-ot)){let Yt=!1;F<B.length&&(Yt=(B[F]>>>Y&1)===1),X.set(P,et-ot,Yt),Y--,Y===-1&&(F++,Y=7)}if(P+=q,P<0||Q<=P){P-=q,q=-q;break}}}function N(X,B,Q){const q=new d;Q.forEach(function(ot){q.put(ot.mode.bit,4),q.put(ot.getLength(),k.getCharCountIndicator(ot.mode,X)),ot.write(q)});const P=r.getSymbolTotalCodewords(X),Y=S.getTotalCodewordsCount(X,B),F=(P-Y)*8;for(q.getLengthInBits()+4<=F&&q.put(0,4);q.getLengthInBits()%8!==0;)q.putBit(0);const et=(F-q.getLengthInBits())/8;for(let ot=0;ot<et;ot++)q.put(ot%2?17:236,8);return G(q,X,B)}function G(X,B,Q){const q=r.getSymbolTotalCodewords(B),P=S.getTotalCodewordsCount(B,Q),Y=q-P,F=S.getBlocksCount(B,Q),et=q%F,ot=F-et,Yt=Math.floor(q/F),M=Math.floor(Y/F),I=M+1,it=Yt-M,Tt=new m(it);let St=0;const w=new Array(F),U=new Array(F);let K=0;const W=new Uint8Array(X.buffer);for(let At=0;At<F;At++){const je=At<ot?M:I;w[At]=W.slice(St,St+je),U[At]=Tt.encode(w[At]),St+=je,K=Math.max(K,je)}const rt=new Uint8Array(q);let dt=0,ht,Rt;for(ht=0;ht<K;ht++)for(Rt=0;Rt<F;Rt++)ht<w[Rt].length&&(rt[dt++]=w[Rt][ht]);for(ht=0;ht<it;ht++)for(Rt=0;Rt<F;Rt++)rt[dt++]=U[Rt][ht];return rt}function at(X,B,Q,q){let P;if(Array.isArray(X))P=j.fromArray(X);else if(typeof X=="string"){let Yt=B;if(!Yt){const M=j.rawSplit(X);Yt=v.getBestVersionForData(M,Q)}P=j.fromString(X,Yt||40)}else throw new Error("Invalid data");const Y=v.getBestVersionForData(P,Q);if(!Y)throw new Error("The amount of data is too big to be stored in a QR Code");if(!B)B=Y;else if(B<Y)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+Y+`.
`);const F=N(B,Q,P),et=r.getSymbolSize(B),ot=new o(et);return H(ot,B),Z(ot),J(ot,B),L(ot,Q,0),B>=7&&V(ot,B),R(ot,F),isNaN(q)&&(q=y.getBestMask(ot,L.bind(null,ot,Q))),y.applyMask(q,ot),L(ot,Q,q),{modules:ot,version:B,errorCorrectionLevel:Q,maskPattern:q,segments:P}}return Or.create=function(B,Q){if(typeof B>"u"||B==="")throw new Error("No input text");let q=c.M,P,Y;return typeof Q<"u"&&(q=c.from(Q.errorCorrectionLevel,c.M),P=v.from(Q.version),Y=y.from(Q.maskPattern),Q.toSJISFunc&&r.setToSJISFunction(Q.toSJISFunc)),at(B,P,q,Y)},Or}var Pr={},tu={},Wh;function Ag(){return Wh||(Wh=1,(function(r){function c(d){if(typeof d=="number"&&(d=d.toString()),typeof d!="string")throw new Error("Color should be defined as hex string");let o=d.slice().replace("#","").split("");if(o.length<3||o.length===5||o.length>8)throw new Error("Invalid hex color: "+d);(o.length===3||o.length===4)&&(o=Array.prototype.concat.apply([],o.map(function(h){return[h,h]}))),o.length===6&&o.push("F","F");const f=parseInt(o.join(""),16);return{r:f>>24&255,g:f>>16&255,b:f>>8&255,a:f&255,hex:"#"+o.slice(0,6).join("")}}r.getOptions=function(o){o||(o={}),o.color||(o.color={});const f=typeof o.margin>"u"||o.margin===null||o.margin<0?4:o.margin,h=o.width&&o.width>=21?o.width:void 0,y=o.scale||4;return{width:h,scale:h?4:y,margin:f,color:{dark:c(o.color.dark||"#000000ff"),light:c(o.color.light||"#ffffffff")},type:o.type,rendererOpts:o.rendererOpts||{}}},r.getScale=function(o,f){return f.width&&f.width>=o+f.margin*2?f.width/(o+f.margin*2):f.scale},r.getImageWidth=function(o,f){const h=r.getScale(o,f);return Math.floor((o+f.margin*2)*h)},r.qrToImageData=function(o,f,h){const y=f.modules.size,S=f.modules.data,m=r.getScale(y,h),v=Math.floor((y+h.margin*2)*m),_=h.margin*m,k=[h.color.light,h.color.dark];for(let j=0;j<v;j++)for(let H=0;H<v;H++){let Z=(j*v+H)*4,J=h.color.light;if(j>=_&&H>=_&&j<v-_&&H<v-_){const V=Math.floor((j-_)/m),L=Math.floor((H-_)/m);J=k[S[V*y+L]?1:0]}o[Z++]=J.r,o[Z++]=J.g,o[Z++]=J.b,o[Z]=J.a}}})(tu)),tu}var Ph;function iy(){return Ph||(Ph=1,(function(r){const c=Ag();function d(f,h,y){f.clearRect(0,0,h.width,h.height),h.style||(h.style={}),h.height=y,h.width=y,h.style.height=y+"px",h.style.width=y+"px"}function o(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(h,y,S){let m=S,v=y;typeof m>"u"&&(!y||!y.getContext)&&(m=y,y=void 0),y||(v=o()),m=c.getOptions(m);const _=c.getImageWidth(h.modules.size,m),k=v.getContext("2d"),j=k.createImageData(_,_);return c.qrToImageData(j.data,h,m),d(k,v,_),k.putImageData(j,0,0),v},r.renderToDataURL=function(h,y,S){let m=S;typeof m>"u"&&(!y||!y.getContext)&&(m=y,y=void 0),m||(m={});const v=r.render(h,y,m),_=m.type||"image/png",k=m.rendererOpts||{};return v.toDataURL(_,k.quality)}})(Pr)),Pr}var eu={},tg;function sy(){if(tg)return eu;tg=1;const r=Ag();function c(f,h){const y=f.a/255,S=h+'="'+f.hex+'"';return y<1?S+" "+h+'-opacity="'+y.toFixed(2).slice(1)+'"':S}function d(f,h,y){let S=f+h;return typeof y<"u"&&(S+=" "+y),S}function o(f,h,y){let S="",m=0,v=!1,_=0;for(let k=0;k<f.length;k++){const j=Math.floor(k%h),H=Math.floor(k/h);!j&&!v&&(v=!0),f[k]?(_++,k>0&&j>0&&f[k-1]||(S+=v?d("M",j+y,.5+H+y):d("m",m,0),m=0,v=!1),j+1<h&&f[k+1]||(S+=d("h",_),_=0)):m++}return S}return eu.render=function(h,y,S){const m=r.getOptions(y),v=h.modules.size,_=h.modules.data,k=v+m.margin*2,j=m.color.light.a?"<path "+c(m.color.light,"fill")+' d="M0 0h'+k+"v"+k+'H0z"/>':"",H="<path "+c(m.color.dark,"stroke")+' d="'+o(_,v,m.margin)+'"/>',Z='viewBox="0 0 '+k+" "+k+'"',V='<svg xmlns="http://www.w3.org/2000/svg" '+(m.width?'width="'+m.width+'" height="'+m.width+'" ':"")+Z+' shape-rendering="crispEdges">'+j+H+`</svg>
`;return typeof S=="function"&&S(null,V),V},eu}var eg;function oy(){if(eg)return Ba;eg=1;const r=qp(),c=ly(),d=iy(),o=sy();function f(h,y,S,m,v){const _=[].slice.call(arguments,1),k=_.length,j=typeof _[k-1]=="function";if(!j&&!r())throw new Error("Callback required as last argument");if(j){if(k<2)throw new Error("Too few arguments provided");k===2?(v=S,S=y,y=m=void 0):k===3&&(y.getContext&&typeof v>"u"?(v=m,m=void 0):(v=m,m=S,S=y,y=void 0))}else{if(k<1)throw new Error("Too few arguments provided");return k===1?(S=y,y=m=void 0):k===2&&!y.getContext&&(m=S,S=y,y=void 0),new Promise(function(H,Z){try{const J=c.create(S,m);H(h(J,y,m))}catch(J){Z(J)}})}try{const H=c.create(S,m);v(null,h(H,y,m))}catch(H){v(H)}}return Ba.create=c.create,Ba.toCanvas=f.bind(null,d.render),Ba.toDataURL=f.bind(null,d.renderToDataURL),Ba.toString=f.bind(null,function(h,y,S){return o.render(h,S)}),Ba}var ry=oy();const uy=$0(ry),nu=`${window.location.origin}/hpde/`;function cy(){const[r,c]=lt.useState(!1),[d,o]=lt.useState(null);lt.useEffect(()=>{window.scrollTo(0,0),uy.toDataURL(nu,{margin:1,width:240}).then(o).catch(()=>o(null))},[]);async function f(){await navigator.clipboard.writeText(nu),c(!0),setTimeout(()=>c(!1),2e3)}return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),g.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:g.jsx(as,{size:18})})]}),g.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),g.jsxs("button",{onClick:f,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[g.jsx("span",{className:"truncate text-sm text-gray-800",children:nu}),r?g.jsx(is,{size:16,className:"shrink-0 text-green-600"}):g.jsx(pg,{size:16,className:"shrink-0 text-gray-400"})]}),g.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:d&&g.jsx("img",{src:d,alt:"QR code for schedule link",width:240,height:240})})]})})}const ng=350,fy="cubic-bezier(0.32, 0.72, 0, 1)",dy=.35,hy=.5;function gy(r){try{return new URL(r).hostname.replace(/^www\./,"")}catch{return r}}function my(r){const c=r.trim().toLowerCase();return c==="clockwise"?"CW (clockwise)":c==="counter-clockwise"||c==="counterclockwise"?"CCW (counter-clockwise)":r}function py(r,c){return[r,c&&my(c)].filter(Boolean).join(" ")}function Ul({icon:r,label:c,subtitle:d,children:o}){return g.jsxs("div",{className:"grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[g.jsxs("span",{className:"flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(r,{size:14,className:"shrink-0 text-gray-400"}),c]}),g.jsxs("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:[o,d&&g.jsx("span",{className:"mt-0.5 block text-xs font-normal text-gray-400",children:d})]})]})}function yy({event:r,open:c,onClose:d}){var L;const o=lt.useRef(null),f=lt.useRef(null),[h,y]=lt.useState(0),[S,m]=lt.useState(!1),[v,_]=lt.useState(!1),[k,j]=lt.useState(!1);lt.useEffect(()=>{if(!c)return;const R=N=>{N.key==="Escape"&&(k?j(!1):d())};return window.addEventListener("keydown",R),()=>window.removeEventListener("keydown",R)},[c,d,k]),lt.useEffect(()=>{y(0),m(!1),_(!1),j(!1)},[c]),lt.useEffect(()=>{c&&f.current&&(f.current.scrollTop=0)},[c]),lt.useEffect(()=>{if(!c)return;const R=o.current;if(!R)return;let N=null;const G=B=>{if(N)return;const Q=B.touches[0];N={startX:Q.clientX,startY:Q.clientY,lastX:Q.clientX,lastT:B.timeStamp,velocity:0,dx:0,active:!1,width:R.getBoundingClientRect().width}},at=B=>{if(!N)return;const Q=B.touches[0],q=Q.clientX-N.startX,P=Q.clientY-N.startY;if(!N.active){if(Math.abs(q)<8&&Math.abs(P)<8)return;if(q<=0||Math.abs(P)>=Math.abs(q)){N=null;return}N.active=!0,m(!0)}B.preventDefault();const Y=B.timeStamp-N.lastT;Y>0&&(N.velocity=(Q.clientX-N.lastX)/Y),N.lastX=Q.clientX,N.lastT=B.timeStamp,N.dx=Math.min(Math.max(q,0),N.width),y(N.dx)},X=()=>{if(!N||!N.active){N=null;return}const{dx:B,velocity:Q,width:q}=N,P=B>q*dy||Q>hy;N=null,m(!1),_(!0),P?(y(q),window.setTimeout(d,ng)):y(0)};return R.addEventListener("touchstart",G,{passive:!0}),R.addEventListener("touchmove",at,{passive:!1}),R.addEventListener("touchend",X),R.addEventListener("touchcancel",X),()=>{R.removeEventListener("touchstart",G),R.removeEventListener("touchmove",at),R.removeEventListener("touchend",X),R.removeEventListener("touchcancel",X)}},[c,d]),lt.useEffect(()=>{if(!c)return;const R=document.documentElement,N=document.body,G=window.scrollY,at=R.style.overflow,X=N.style.overflow,B=N.style.position,Q=N.style.top,q=N.style.width;return R.style.overflow="hidden",N.style.overflow="hidden",N.style.position="fixed",N.style.top=`-${G}px`,N.style.width="100%",()=>{R.style.overflow=at,N.style.overflow=X,N.style.position=B,N.style.top=Q,N.style.width=q,window.scrollTo(0,G)}},[c]);const H=Np(r.days),Z=py(r.configuration,r.direction),J=!!((L=r.scheduleScans)!=null&&L.length),V=H||r.organizer||r.track||Z||r.link||J||r.mapImage;return g.jsxs(g.Fragment,{children:[g.jsx("div",{"aria-hidden":"true",inert:!c,onClick:d,className:"fixed inset-0 z-40",style:{pointerEvents:c?"auto":"none"}}),g.jsx("div",{ref:o,role:"dialog","aria-modal":c,"aria-labelledby":"event-details-title",inert:!c,className:"fixed inset-y-0 right-0 z-50 flex w-full bg-white md:w-[480px] md:max-w-[60vw]",style:{transform:S||v?`translate3d(${h}px,0,0)`:c?"translate3d(0,0,0)":"translate3d(100%,0,0)",transition:S?"none":`transform ${ng}ms ${fy}`,boxShadow:c?"-8px 0 24px rgba(0,0,0,0.08)":"none",willChange:"transform"},children:g.jsxs("div",{ref:f,className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none",children:[g.jsxs("div",{className:"mb-5 flex items-start gap-2 md:justify-between md:gap-4",children:[g.jsx("button",{onClick:d,"aria-label":"Back",className:"inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden",children:g.jsx(mg,{size:20})}),g.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"}),g.jsx("button",{onClick:d,"aria-label":"Close",className:"hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid",children:g.jsx(as,{size:20})})]}),V?g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"pl-1",children:[H&&g.jsx(Ul,{icon:hg,label:"Dates",children:H}),r.organizer&&g.jsx(Ul,{icon:Tp,label:"Organizer",children:r.organizer}),r.track&&g.jsx(Ul,{icon:yp,label:"Location",subtitle:r.city,children:r.track}),Z&&g.jsx(Ul,{icon:xp,label:"Track config",children:Z}),r.link&&g.jsx(Ul,{icon:mp,label:"Event page",children:g.jsxs("a",{href:r.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[gy(r.link),g.jsx(dp,{size:12,className:"text-gray-400"})]})})]}),r.mapImage&&g.jsxs("div",{className:"mt-6 pl-1",children:[g.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(vp,{size:14,className:"shrink-0 text-gray-400"}),"Track map"]}),g.jsxs("button",{type:"button",onClick:()=>j(!0),"aria-label":"Expand track map",className:"group relative block w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:[g.jsx("img",{src:r.mapImage,alt:`${r.name} track map`,className:"block w-full h-auto"}),g.jsx("span",{className:"absolute right-2 top-2 inline-grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors group-hover:bg-black/70",children:g.jsx(bp,{size:16})})]})]}),J&&g.jsxs("div",{className:"mt-6 pl-1",children:[g.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(hp,{size:14,className:"shrink-0 text-gray-400"}),"Original schedule"]}),g.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:r.scheduleScans.map((R,N)=>g.jsx("a",{href:R,target:"_blank",rel:"noopener noreferrer",children:g.jsx("img",{src:R,alt:`Original schedule scan ${N+1}`,className:"aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"})},R))})]})]}):g.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})}),k&&r.mapImage&&g.jsxs("div",{role:"dialog","aria-modal":"true","aria-label":`${r.name} track map`,onClick:()=>j(!1),className:"fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4",children:[g.jsx("button",{onClick:()=>j(!1),"aria-label":"Close map",className:"absolute right-4 top-4 inline-grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",children:g.jsx(as,{size:20})}),g.jsx("img",{src:r.mapImage,alt:`${r.name} track map`,className:"max-h-full max-w-full rounded-lg object-contain"})]})]})}function La(r,c){const d=c.split(`
`).map(J=>J.trim());let o="",f,h,y,S,m,v,_;const k=[],j=[];let H=null,Z=!1;for(const J of d){if(!J||J.startsWith("//"))continue;const V=J.replace(/^-\s+/,"");if(V.startsWith("# ")){o=V.slice(2).trim();continue}if(V.startsWith("subtitle:")){f=V.slice(9).trim()||void 0;continue}if(V.startsWith("link:")){h=V.slice(5).trim()||void 0;continue}if(V.startsWith("organizer:")){y=V.slice(10).trim()||void 0;continue}if(V.startsWith("track:")){S=V.slice(6).trim()||void 0;continue}if(V.startsWith("city:")){m=V.slice(5).trim()||void 0;continue}if(V.startsWith("configuration:")){v=V.slice(14).trim()||void 0;continue}if(V.startsWith("config:")){v=V.slice(7).trim()||void 0;continue}if(V.startsWith("direction:")){_=V.slice(10).trim()||void 0;continue}if(V.startsWith("## ")){const L=V.slice(3).trim();if(L.toLowerCase()==="groups"){Z=!0,H=null;continue}const R=L.split("|").map(N=>N.trim());R.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(R[1])?(Z=!1,H={id:R[0].toLowerCase().replace(/\s+/g,"-"),label:R[0],date:R[1],activities:[]},j.push(H)):Z=!1;continue}if(Z){const L=V.split("|").map(R=>R.trim());if(L.length>=4){const R=L[4]||void 0;k.push({id:L[0],label:L[1],bgClass:L[2],textClass:L[3],...R?{description:R}:{}})}continue}if(H){if(/^\d{2}:\d{2}/.test(V)){const L=vy(V);L&&H.activities.push(L)}else if(/^break\s*\|/.test(V)){const L=V.slice(V.indexOf("|")+1).trim();H.activities.push({type:"break",label:L})}}}return{id:r,name:o,...f?{subtitle:f}:{},...h?{link:h}:{},...y?{organizer:y}:{},...S?{track:S}:{},...m?{city:m}:{},...v?{configuration:v}:{},..._?{direction:_}:{},runGroups:k,days:j}}function vy(r){const c=r.split("|").map(S=>S.trim()),d=c[0],o=c.slice(1),f=d.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!f)return null;const h=f[1],y=f[2].trim();if(/^(general|lunch|special)$/.test(y)){const S=y,m=o[0]??"",v=o[1]||void 0;return{time:h,type:S,label:m,...v?{subtitle:v}:{}}}if(/^session/.test(y)){const S=y.match(/^session\s+(\d+)/),m=S?parseInt(S[1],10):void 0;let v=[],_=[],k;for(const j of o)j.startsWith("track:")?v=j.slice(6).trim().split(",").map(H=>H.trim()).filter(Boolean):j.startsWith("class:")?_=j.slice(6).trim().split(",").map(H=>H.trim()).filter(Boolean):j.startsWith("note:")&&(k=j.slice(5).trim()||void 0);return{time:h,type:"session",...m!==void 0?{sessionNumber:m}:{},onTrack:v,..._.length?{inClass:_}:{},...k?{note:k}:{}}}return null}const by=`# TDE at MSRC 1.7CW

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
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
`,cu="/hpde/assets/msrc-1-7-D9G0r_nf.jpg",wy={...La("2026-09-11_msrc-1-7",by),mapImage:cu},Sy=`# SCCA at MSRC 1.7 CW

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
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
`,xy={...La("2026-09-13_msr-scca",Sy),mapImage:cu},Ty=`# TDE at MSRC 1.7 Fast Track

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
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
`,Ey={...La("2026-06-06_msrc-1-7",Ty),mapImage:cu},Ny=`# TDE at MSRC 3.1

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
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
`,Ay="/hpde/assets/msrc-3-1-BsOP6CK2.png",Cy={...La("2025-11-07_msrc-3-1",Ny),mapImage:Ay},_y=`# TDE at ECR 2.7

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
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
`,My="/hpde/assets/ecr-BW_3Ndfh.png",Dy={...La("2026-05-30_ecr-2-7",_y),mapImage:My},Ry=`# Test Event

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   city: <city, state — shown as a subtitle under the location>
//   configuration: <track layout / configuration>
//   direction: <e.g. clockwise / counter-clockwise — combined with
//               configuration into the "Track configuration" row>
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
`,ag=La("test-live",Ry),ky={...ag,days:ag.days.map(r=>({...r,date:Fn()}))},Jn=[wy,xy,Ey,Dy,Cy].sort((r,c)=>c.id.localeCompare(r.id)),lg=[...Jn,ky],zy=["January","February","March","April","May","June","July","August","September","October","November","December"],Oy=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],ig="minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1.6fr) minmax(0, 1.6fr)",Uy=4;function sg(r){return(r.getDay()+6)%7}function jy(r,c,d){return`${r}-${String(c+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`}function Hy({events:r,onOpenEvent:c}){const d=new Date,[o,f]=lt.useState({year:d.getFullYear(),month:d.getMonth()}),h=Fn(),y=new Map;for(const N of r)for(const G of N.days){const at=y.get(G.date)??[];at.push(N),y.set(G.date,at)}const S=new Date(o.year,o.month,1),m=sg(S),v=new Date(o.year,o.month+1,0),_=6-sg(v),k=m+v.getDate()+_,j=new Date(o.year,o.month,1-m),H=[];for(let N=0;N<k;N++){const G=new Date(j.getFullYear(),j.getMonth(),j.getDate()+N);H.push({date:G,iso:jy(G.getFullYear(),G.getMonth(),G.getDate()),inMonth:G.getMonth()===o.month})}const Z=[];for(let N=0;N<H.length;N+=7)Z.push(H.slice(N,N+7));function J(){f(N=>N.month===0?{year:N.year-1,month:11}:{year:N.year,month:N.month-1})}function V(){f(N=>N.month===11?{year:N.year+1,month:0}:{year:N.year,month:N.month+1})}function L(){f({year:d.getFullYear(),month:d.getMonth()})}const R=o.year===d.getFullYear()&&o.month===d.getMonth();return g.jsxs("div",{children:[g.jsxs("div",{className:"mb-3 flex items-center justify-between gap-2",children:[g.jsxs("div",{className:"flex items-center gap-1",children:[g.jsx("button",{onClick:J,"aria-label":"Previous month",className:"grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400",children:g.jsx(mg,{size:18})}),g.jsx("button",{onClick:V,"aria-label":"Next month",className:"grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400",children:g.jsx(fp,{size:18})})]}),g.jsxs("div",{className:"text-sm font-semibold text-gray-900",children:[zy[o.month]," ",o.year]}),g.jsx("button",{onClick:L,disabled:R,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${R?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Today"})]}),g.jsxs("div",{className:"overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm",children:[g.jsx("div",{className:"grid border-b border-gray-200 text-center text-[10px] font-semibold uppercase tracking-wide",style:{gridTemplateColumns:ig},children:Oy.map((N,G)=>g.jsx("div",{className:`py-1.5 ${G>=Uy?"text-gray-600":"text-gray-400"}`,children:N},N))}),g.jsx("div",{className:"divide-y divide-gray-200",children:Z.map((N,G)=>g.jsx("div",{className:"grid divide-x divide-gray-200",style:{gridTemplateColumns:ig},children:N.map((at,X)=>{const B=y.get(at.iso)??[],Q=at.iso===h;return g.jsxs("div",{className:`min-h-[80px] p-1 ${at.inMonth?"bg-white":"bg-gray-50/60"}`,children:[g.jsx("div",{className:`mb-1 text-right text-[10px] font-medium ${at.inMonth?Q?"text-blue-600":"text-gray-500":"text-gray-300"}`,children:at.date.getDate()}),g.jsx("div",{className:"space-y-0.5",children:B.map((q,P)=>g.jsx("button",{onClick:()=>c(q),className:"block w-full truncate rounded bg-blue-50 px-1 py-0.5 text-left text-[10px] font-medium text-blue-700 transition-colors hover:bg-blue-100",title:q.name,children:q.name},`${q.id}-${P}`))})]},X)})},G))})]})]})}function By(r,c){const[d,o]=lt.useState(()=>{try{const f=localStorage.getItem(r);return f!==null?JSON.parse(f):c}catch{return c}});return lt.useEffect(()=>{localStorage.setItem(r,JSON.stringify(d))},[r,d]),[d,o]}function Ly(){return g.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[g.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function og({event:r,muted:c,live:d,onClick:o}){return g.jsxs("button",{onClick:o,className:`w-full rounded-xl border p-3 text-left transition-colors ${c?"border-gray-200 bg-white hover:border-gray-300":"border-gray-200 bg-white shadow-sm hover:border-gray-400"}`,children:[g.jsxs("div",{className:"flex items-center",children:[g.jsx("span",{className:`text-sm font-semibold ${c?"text-gray-700":"text-gray-900"}`,children:r.name}),d&&g.jsx(Ly,{})]}),g.jsx("div",{className:"text-xs text-gray-500",children:su(r)})]})}function Yy({onOpenEvent:r}){const[c,d]=By("hpde:landingView","list"),{live:o,upcoming:f,past:h}=ru(Jn),y=[...o,...f];return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[g.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:"HPDE Schedule"}),g.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[g.jsx("button",{onClick:()=>d("list"),className:`rounded-md p-2 transition-colors ${c==="list"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},"aria-label":"List view",children:g.jsx(pp,{size:18})}),g.jsx("button",{onClick:()=>d("calendar"),className:`rounded-md p-2 transition-colors ${c==="calendar"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},"aria-label":"Calendar view",children:g.jsx(hg,{size:18})})]})]}),c==="list"?g.jsxs("div",{className:"space-y-6",children:[g.jsxs("section",{children:[g.jsx("h2",{className:"mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500",children:"Upcoming"}),y.length===0?g.jsx("div",{className:"rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500",children:"No upcoming events."}):g.jsx("div",{className:"space-y-2",children:y.map(S=>g.jsx(og,{event:S,muted:!1,live:o.includes(S),onClick:()=>r(S)},S.id))})]}),g.jsxs("section",{children:[g.jsx("h2",{className:"mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500",children:"Past"}),h.length===0?g.jsx("div",{className:"rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500",children:"No past events."}):g.jsx("div",{className:"space-y-2",children:h.map(S=>g.jsx(og,{event:S,muted:!0,live:!1,onClick:()=>r(S)},S.id))})]})]}):g.jsx(Hy,{events:Jn,onOpenEvent:r})]})})}const qy=350,Gy="cubic-bezier(0.32, 0.72, 0, 1)";function Xy({open:r,onExited:c,scrollRef:d,children:o}){const[f,h]=lt.useState(!1);return lt.useEffect(()=>{if(r){const y=requestAnimationFrame(()=>h(!0));return()=>cancelAnimationFrame(y)}h(!1)},[r]),g.jsx("div",{ref:d,className:"fixed inset-0 z-30 overflow-x-hidden overflow-y-auto bg-gray-50",style:{transform:`translateX(${f?"0":"100%"})`,transition:`transform ${qy}ms ${Gy}`,willChange:"transform",boxShadow:"-8px 0 32px -8px rgba(0, 0, 0, 0.18)"},onTransitionEnd:y=>{y.propertyName==="transform"&&!f&&!r&&(c==null||c())},children:o})}function ns(r,c){const[d,o]=lt.useState(()=>{try{const f=localStorage.getItem(r);return f!==null?JSON.parse(f):c}catch{return c}});return lt.useEffect(()=>{localStorage.setItem(r,JSON.stringify(d))},[r,d]),[d,o]}function Cg(r){const c=Fn();return r.days.find(d=>d.date===c)}function rg(r){return Cg(r)??r.days[0]}function Vy(){const[r,c]=lt.useState(()=>window.location.hash);lt.useEffect(()=>{const o=()=>{c(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",o),()=>window.removeEventListener("hashchange",o)},[]);function d(o){window.location.hash!==o&&(window.location.hash=o)}return[r,d]}const lu="#/event/",ug="#/";function cg(r){return`${lu}${encodeURIComponent(r)}`}function fg(r){return r.startsWith(lu)?decodeURIComponent(r.slice(lu.length)):null}function Qy(r){return r===""||r==="#"}function Ky(){const[r,c]=Vy(),[d,o]=ns("hpde:activeEvent",Jn[0].id),[f,h]=ns("hpde:activeDay",null),[y,S]=ns("hpde:groups",[]),[m,v]=ns("hpde:hidePast",!1),[_,k]=lt.useState(!1),j=lt.useRef(null),H=fg(r)!==null,[Z,J]=lt.useState(H);lt.useEffect(()=>{H&&J(!0)},[H]);const V=lg.find(Y=>Y.id===d)??Jn[0],L=V.days.find(Y=>Y.id===f)??rg(V),R=Cg(V),N=L.date===Fn(),G=V.days.length>1,X=V.days.reduce((Y,F)=>F.date>Y?F.date:Y,V.days[0].date)<Fn(),[,B]=lt.useState(0);lt.useEffect(()=>{if(!N)return;const Y=setInterval(()=>B(F=>F+1),6e4);return()=>clearInterval(Y)},[N]);const Q=N&&L.activities.some(Y=>Y.type!=="break"&&en(Y.time)<ou());function q(Y){o(Y.id),h(rg(Y).id),S([]),c(cg(Y.id))}function P(){c(ug)}return lt.useEffect(()=>{const Y=fg(r);if(Y){const F=lg.find(et=>et.id===Y);F&&F.id!==d&&q(F);return}if(Qy(r)){const{live:F}=ru(Jn);c(F.length>0?cg(F[0].id):ug)}},[r]),r==="#/widget-script"?g.jsx(Yp,{}):r==="#/share"?g.jsx(cy,{}):g.jsxs(g.Fragment,{children:[g.jsx(Yy,{onOpenEvent:q}),Z&&g.jsxs(Xy,{open:H,onExited:()=>J(!1),scrollRef:j,children:[g.jsx(Bp,{disabled:_||!H,scrollContainerRef:j,children:g.jsxs("div",{className:"min-h-screen bg-gray-50",children:[g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[g.jsxs("div",{className:"flex min-w-0 items-start gap-1",children:[g.jsx("button",{onClick:P,"aria-label":"Home",className:"inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900",children:g.jsx(yg,{size:18})}),g.jsx(Up,{events:Jn,active:V,onChange:q,onGoHome:P})]}),g.jsx("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:g.jsx("button",{onClick:()=>k(!0),"aria-label":"Event details",className:"rounded-md p-2 text-gray-400 transition-colors hover:text-gray-600",style:{minWidth:36,minHeight:36},children:g.jsx(gp,{size:18})})})]}),X&&g.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),G&&g.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[g.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:V.days.map(Y=>g.jsx("button",{onClick:()=>h(Y.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${L.id===Y.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:Y.label},Y.id))}),g.jsx("button",{onClick:()=>R&&h(R.id),disabled:N||!R,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${N||!R?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx(Op,{groups:V.runGroups,selected:y,onChange:S}),Q&&g.jsx(jp,{checked:m,onChange:()=>v(Y=>!Y),label:"Hide past activities"})]}),g.jsx(zp,{activities:L.activities,runGroups:V.runGroups,isToday:N,selectedGroups:y,hidePast:m}),g.jsx(Lp,{groups:V.runGroups})]}),g.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[g.jsxs("div",{children:[g.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",g.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),g.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",Dp("2026-09-19T20:39:00-05:00")]})]})]})}),g.jsx(yy,{event:V,open:_,onClose:()=>k(!1)})]})]})}op.createRoot(document.getElementById("root")).render(g.jsx(lt.StrictMode,{children:g.jsx(Ky,{})}));
