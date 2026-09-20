(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))s(f);new MutationObserver(f=>{for(const h of f)if(h.type==="childList")for(const y of h.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&s(y)}).observe(document,{childList:!0,subtree:!0});function d(f){const h={};return f.integrity&&(h.integrity=f.integrity),f.referrerPolicy&&(h.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?h.credentials="include":f.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function s(f){if(f.ep)return;f.ep=!0;const h=d(f);fetch(f.href,h)}})();function P0(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Nr={exports:{}},kl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hh;function tp(){if(hh)return kl;hh=1;var r=Symbol.for("react.transitional.element"),c=Symbol.for("react.fragment");function d(s,f,h){var y=null;if(h!==void 0&&(y=""+h),f.key!==void 0&&(y=""+f.key),"key"in f){h={};for(var S in f)S!=="key"&&(h[S]=f[S])}else h=f;return f=h.ref,{$$typeof:r,type:s,key:y,ref:f!==void 0?f:null,props:h}}return kl.Fragment=c,kl.jsx=d,kl.jsxs=d,kl}var gh;function ep(){return gh||(gh=1,Nr.exports=tp()),Nr.exports}var g=ep(),Cr={exports:{}},ut={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mh;function np(){if(mh)return ut;mh=1;var r=Symbol.for("react.transitional.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),y=Symbol.for("react.context"),S=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),k=Symbol.for("react.activity"),H=Symbol.iterator;function B(w){return w===null||typeof w!="object"?null:(w=H&&w[H]||w["@@iterator"],typeof w=="function"?w:null)}var X={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},I=Object.assign,F={};function L(w,U,Z){this.props=w,this.context=U,this.refs=F,this.updater=Z||X}L.prototype.isReactComponent={},L.prototype.setState=function(w,U){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,U,"setState")},L.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function R(){}R.prototype=L.prototype;function C(w,U,Z){this.props=w,this.context=U,this.refs=F,this.updater=Z||X}var G=C.prototype=new R;G.constructor=C,I(G,L.prototype),G.isPureReactComponent=!0;var at=Array.isArray;function q(){}var j={H:null,A:null,T:null,S:null},Q=Object.prototype.hasOwnProperty;function V(w,U,Z){var P=Z.ref;return{$$typeof:r,type:w,key:U,ref:P!==void 0?P:null,props:Z}}function tt(w,U){return V(w.type,U,w.props)}function W(w){return typeof w=="object"&&w!==null&&w.$$typeof===r}function Y(w){var U={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(Z){return U[Z]})}var J=/\/+/g;function it(w,U){return typeof w=="object"&&w!==null&&w.key!=null?Y(""+w.key):U.toString(36)}function Gt(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(q,q):(w.status="pending",w.then(function(U){w.status==="pending"&&(w.status="fulfilled",w.value=U)},function(U){w.status==="pending"&&(w.status="rejected",w.reason=U)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function M(w,U,Z,P,rt){var dt=typeof w;(dt==="undefined"||dt==="boolean")&&(w=null);var ht=!1;if(w===null)ht=!0;else switch(dt){case"bigint":case"string":case"number":ht=!0;break;case"object":switch(w.$$typeof){case r:case c:ht=!0;break;case _:return ht=w._init,M(ht(w._payload),U,Z,P,rt)}}if(ht)return rt=rt(w),ht=P===""?"."+it(w,0):P,at(rt)?(Z="",ht!=null&&(Z=ht.replace(J,"$&/")+"/"),M(rt,U,Z,"",function(He){return He})):rt!=null&&(W(rt)&&(rt=tt(rt,Z+(rt.key==null||w&&w.key===rt.key?"":(""+rt.key).replace(J,"$&/")+"/")+ht)),U.push(rt)),1;ht=0;var Rt=P===""?".":P+":";if(at(w))for(var Ct=0;Ct<w.length;Ct++)P=w[Ct],dt=Rt+it(P,Ct),ht+=M(P,U,Z,dt,rt);else if(Ct=B(w),typeof Ct=="function")for(w=Ct.call(w),Ct=0;!(P=w.next()).done;)P=P.value,dt=Rt+it(P,Ct++),ht+=M(P,U,Z,dt,rt);else if(dt==="object"){if(typeof w.then=="function")return M(Gt(w),U,Z,P,rt);throw U=String(w),Error("Objects are not valid as a React child (found: "+(U==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":U)+"). If you meant to render a collection of children, use an array instead.")}return ht}function K(w,U,Z){if(w==null)return w;var P=[],rt=0;return M(w,P,"","",function(dt){return U.call(Z,dt,rt++)}),P}function ot(w){if(w._status===-1){var U=w._result;U=U(),U.then(function(Z){(w._status===0||w._status===-1)&&(w._status=1,w._result=Z)},function(Z){(w._status===0||w._status===-1)&&(w._status=2,w._result=Z)}),w._status===-1&&(w._status=0,w._result=U)}if(w._status===1)return w._result.default;throw w._result}var Et=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var U=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(U))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},St={map:K,forEach:function(w,U,Z){K(w,function(){U.apply(this,arguments)},Z)},count:function(w){var U=0;return K(w,function(){U++}),U},toArray:function(w){return K(w,function(U){return U})||[]},only:function(w){if(!W(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return ut.Activity=k,ut.Children=St,ut.Component=L,ut.Fragment=d,ut.Profiler=f,ut.PureComponent=C,ut.StrictMode=s,ut.Suspense=m,ut.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=j,ut.__COMPILER_RUNTIME={__proto__:null,c:function(w){return j.H.useMemoCache(w)}},ut.cache=function(w){return function(){return w.apply(null,arguments)}},ut.cacheSignal=function(){return null},ut.cloneElement=function(w,U,Z){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var P=I({},w.props),rt=w.key;if(U!=null)for(dt in U.key!==void 0&&(rt=""+U.key),U)!Q.call(U,dt)||dt==="key"||dt==="__self"||dt==="__source"||dt==="ref"&&U.ref===void 0||(P[dt]=U[dt]);var dt=arguments.length-2;if(dt===1)P.children=Z;else if(1<dt){for(var ht=Array(dt),Rt=0;Rt<dt;Rt++)ht[Rt]=arguments[Rt+2];P.children=ht}return V(w.type,rt,P)},ut.createContext=function(w){return w={$$typeof:y,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:h,_context:w},w},ut.createElement=function(w,U,Z){var P,rt={},dt=null;if(U!=null)for(P in U.key!==void 0&&(dt=""+U.key),U)Q.call(U,P)&&P!=="key"&&P!=="__self"&&P!=="__source"&&(rt[P]=U[P]);var ht=arguments.length-2;if(ht===1)rt.children=Z;else if(1<ht){for(var Rt=Array(ht),Ct=0;Ct<ht;Ct++)Rt[Ct]=arguments[Ct+2];rt.children=Rt}if(w&&w.defaultProps)for(P in ht=w.defaultProps,ht)rt[P]===void 0&&(rt[P]=ht[P]);return V(w,dt,rt)},ut.createRef=function(){return{current:null}},ut.forwardRef=function(w){return{$$typeof:S,render:w}},ut.isValidElement=W,ut.lazy=function(w){return{$$typeof:_,_payload:{_status:-1,_result:w},_init:ot}},ut.memo=function(w,U){return{$$typeof:v,type:w,compare:U===void 0?null:U}},ut.startTransition=function(w){var U=j.T,Z={};j.T=Z;try{var P=w(),rt=j.S;rt!==null&&rt(Z,P),typeof P=="object"&&P!==null&&typeof P.then=="function"&&P.then(q,Et)}catch(dt){Et(dt)}finally{U!==null&&Z.types!==null&&(U.types=Z.types),j.T=U}},ut.unstable_useCacheRefresh=function(){return j.H.useCacheRefresh()},ut.use=function(w){return j.H.use(w)},ut.useActionState=function(w,U,Z){return j.H.useActionState(w,U,Z)},ut.useCallback=function(w,U){return j.H.useCallback(w,U)},ut.useContext=function(w){return j.H.useContext(w)},ut.useDebugValue=function(){},ut.useDeferredValue=function(w,U){return j.H.useDeferredValue(w,U)},ut.useEffect=function(w,U){return j.H.useEffect(w,U)},ut.useEffectEvent=function(w){return j.H.useEffectEvent(w)},ut.useId=function(){return j.H.useId()},ut.useImperativeHandle=function(w,U,Z){return j.H.useImperativeHandle(w,U,Z)},ut.useInsertionEffect=function(w,U){return j.H.useInsertionEffect(w,U)},ut.useLayoutEffect=function(w,U){return j.H.useLayoutEffect(w,U)},ut.useMemo=function(w,U){return j.H.useMemo(w,U)},ut.useOptimistic=function(w,U){return j.H.useOptimistic(w,U)},ut.useReducer=function(w,U,Z){return j.H.useReducer(w,U,Z)},ut.useRef=function(w){return j.H.useRef(w)},ut.useState=function(w){return j.H.useState(w)},ut.useSyncExternalStore=function(w,U,Z){return j.H.useSyncExternalStore(w,U,Z)},ut.useTransition=function(){return j.H.useTransition()},ut.version="19.2.6",ut}var ph;function iu(){return ph||(ph=1,Cr.exports=np()),Cr.exports}var lt=iu(),Ar={exports:{}},Ol={},_r={exports:{}},Mr={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yh;function ap(){return yh||(yh=1,(function(r){function c(M,K){var ot=M.length;M.push(K);t:for(;0<ot;){var Et=ot-1>>>1,St=M[Et];if(0<f(St,K))M[Et]=K,M[ot]=St,ot=Et;else break t}}function d(M){return M.length===0?null:M[0]}function s(M){if(M.length===0)return null;var K=M[0],ot=M.pop();if(ot!==K){M[0]=ot;t:for(var Et=0,St=M.length,w=St>>>1;Et<w;){var U=2*(Et+1)-1,Z=M[U],P=U+1,rt=M[P];if(0>f(Z,ot))P<St&&0>f(rt,Z)?(M[Et]=rt,M[P]=ot,Et=P):(M[Et]=Z,M[U]=ot,Et=U);else if(P<St&&0>f(rt,ot))M[Et]=rt,M[P]=ot,Et=P;else break t}}return K}function f(M,K){var ot=M.sortIndex-K.sortIndex;return ot!==0?ot:M.id-K.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;r.unstable_now=function(){return h.now()}}else{var y=Date,S=y.now();r.unstable_now=function(){return y.now()-S}}var m=[],v=[],_=1,k=null,H=3,B=!1,X=!1,I=!1,F=!1,L=typeof setTimeout=="function"?setTimeout:null,R=typeof clearTimeout=="function"?clearTimeout:null,C=typeof setImmediate<"u"?setImmediate:null;function G(M){for(var K=d(v);K!==null;){if(K.callback===null)s(v);else if(K.startTime<=M)s(v),K.sortIndex=K.expirationTime,c(m,K);else break;K=d(v)}}function at(M){if(I=!1,G(M),!X)if(d(m)!==null)X=!0,q||(q=!0,Y());else{var K=d(v);K!==null&&Gt(at,K.startTime-M)}}var q=!1,j=-1,Q=5,V=-1;function tt(){return F?!0:!(r.unstable_now()-V<Q)}function W(){if(F=!1,q){var M=r.unstable_now();V=M;var K=!0;try{t:{X=!1,I&&(I=!1,R(j),j=-1),B=!0;var ot=H;try{e:{for(G(M),k=d(m);k!==null&&!(k.expirationTime>M&&tt());){var Et=k.callback;if(typeof Et=="function"){k.callback=null,H=k.priorityLevel;var St=Et(k.expirationTime<=M);if(M=r.unstable_now(),typeof St=="function"){k.callback=St,G(M),K=!0;break e}k===d(m)&&s(m),G(M)}else s(m);k=d(m)}if(k!==null)K=!0;else{var w=d(v);w!==null&&Gt(at,w.startTime-M),K=!1}}break t}finally{k=null,H=ot,B=!1}K=void 0}}finally{K?Y():q=!1}}}var Y;if(typeof C=="function")Y=function(){C(W)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,it=J.port2;J.port1.onmessage=W,Y=function(){it.postMessage(null)}}else Y=function(){L(W,0)};function Gt(M,K){j=L(function(){M(r.unstable_now())},K)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(M){M.callback=null},r.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<M?Math.floor(1e3/M):5},r.unstable_getCurrentPriorityLevel=function(){return H},r.unstable_next=function(M){switch(H){case 1:case 2:case 3:var K=3;break;default:K=H}var ot=H;H=K;try{return M()}finally{H=ot}},r.unstable_requestPaint=function(){F=!0},r.unstable_runWithPriority=function(M,K){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var ot=H;H=M;try{return K()}finally{H=ot}},r.unstable_scheduleCallback=function(M,K,ot){var Et=r.unstable_now();switch(typeof ot=="object"&&ot!==null?(ot=ot.delay,ot=typeof ot=="number"&&0<ot?Et+ot:Et):ot=Et,M){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=ot+St,M={id:_++,callback:K,priorityLevel:M,startTime:ot,expirationTime:St,sortIndex:-1},ot>Et?(M.sortIndex=ot,c(v,M),d(m)===null&&M===d(v)&&(I?(R(j),j=-1):I=!0,Gt(at,ot-Et))):(M.sortIndex=St,c(m,M),X||B||(X=!0,q||(q=!0,Y()))),M},r.unstable_shouldYield=tt,r.unstable_wrapCallback=function(M){var K=H;return function(){var ot=H;H=K;try{return M.apply(this,arguments)}finally{H=ot}}}})(Mr)),Mr}var vh;function lp(){return vh||(vh=1,_r.exports=ap()),_r.exports}var Dr={exports:{}},Pt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bh;function ip(){if(bh)return Pt;bh=1;var r=iu();function c(m){var v="https://react.dev/errors/"+m;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)v+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(){}var s={d:{f:d,r:function(){throw Error(c(522))},D:d,C:d,L:d,m:d,X:d,S:d,M:d},p:0,findDOMNode:null},f=Symbol.for("react.portal");function h(m,v,_){var k=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:f,key:k==null?null:""+k,children:m,containerInfo:v,implementation:_}}var y=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function S(m,v){if(m==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Pt.createPortal=function(m,v){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(c(299));return h(m,v,null,_)},Pt.flushSync=function(m){var v=y.T,_=s.p;try{if(y.T=null,s.p=2,m)return m()}finally{y.T=v,s.p=_,s.d.f()}},Pt.preconnect=function(m,v){typeof m=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,s.d.C(m,v))},Pt.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Pt.preinit=function(m,v){if(typeof m=="string"&&v&&typeof v.as=="string"){var _=v.as,k=S(_,v.crossOrigin),H=typeof v.integrity=="string"?v.integrity:void 0,B=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;_==="style"?s.d.S(m,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:k,integrity:H,fetchPriority:B}):_==="script"&&s.d.X(m,{crossOrigin:k,integrity:H,fetchPriority:B,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},Pt.preinitModule=function(m,v){if(typeof m=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var _=S(v.as,v.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&s.d.M(m)},Pt.preload=function(m,v){if(typeof m=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var _=v.as,k=S(_,v.crossOrigin);s.d.L(m,_,{crossOrigin:k,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},Pt.preloadModule=function(m,v){if(typeof m=="string")if(v){var _=S(v.as,v.crossOrigin);s.d.m(m,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:_,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else s.d.m(m)},Pt.requestFormReset=function(m){s.d.r(m)},Pt.unstable_batchedUpdates=function(m,v){return m(v)},Pt.useFormState=function(m,v,_){return y.H.useFormState(m,v,_)},Pt.useFormStatus=function(){return y.H.useHostTransitionStatus()},Pt.version="19.2.6",Pt}var wh;function op(){if(wh)return Dr.exports;wh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(c){console.error(c)}}return r(),Dr.exports=ip(),Dr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sh;function sp(){if(Sh)return Ol;Sh=1;var r=lp(),c=iu(),d=op();function s(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function h(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function y(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function S(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function m(t){if(h(t)!==t)throw Error(s(188))}function v(t){var e=t.alternate;if(!e){if(e=h(t),e===null)throw Error(s(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return m(l),t;if(i===a)return m(l),e;i=i.sibling}throw Error(s(188))}if(n.return!==a.return)n=l,a=i;else{for(var o=!1,u=l.child;u;){if(u===n){o=!0,n=l,a=i;break}if(u===a){o=!0,a=l,n=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===n){o=!0,n=i,a=l;break}if(u===a){o=!0,a=i,n=l;break}u=u.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==a)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?t:e}function _(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=_(t),e!==null)return e;t=t.sibling}return null}var k=Object.assign,H=Symbol.for("react.element"),B=Symbol.for("react.transitional.element"),X=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),F=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),R=Symbol.for("react.consumer"),C=Symbol.for("react.context"),G=Symbol.for("react.forward_ref"),at=Symbol.for("react.suspense"),q=Symbol.for("react.suspense_list"),j=Symbol.for("react.memo"),Q=Symbol.for("react.lazy"),V=Symbol.for("react.activity"),tt=Symbol.for("react.memo_cache_sentinel"),W=Symbol.iterator;function Y(t){return t===null||typeof t!="object"?null:(t=W&&t[W]||t["@@iterator"],typeof t=="function"?t:null)}var J=Symbol.for("react.client.reference");function it(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===J?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case I:return"Fragment";case L:return"Profiler";case F:return"StrictMode";case at:return"Suspense";case q:return"SuspenseList";case V:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case X:return"Portal";case C:return t.displayName||"Context";case R:return(t._context.displayName||"Context")+".Consumer";case G:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case j:return e=t.displayName||null,e!==null?e:it(t.type)||"Memo";case Q:e=t._payload,t=t._init;try{return it(t(e))}catch{}}return null}var Gt=Array.isArray,M=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ot={pending:!1,data:null,method:null,action:null},Et=[],St=-1;function w(t){return{current:t}}function U(t){0>St||(t.current=Et[St],Et[St]=null,St--)}function Z(t,e){St++,Et[St]=t.current,t.current=e}var P=w(null),rt=w(null),dt=w(null),ht=w(null);function Rt(t,e){switch(Z(dt,e),Z(rt,t),Z(P,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Hd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Hd(e),t=jd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}U(P),Z(P,t)}function Ct(){U(P),U(rt),U(dt)}function He(t){t.memoizedState!==null&&Z(ht,t);var e=P.current,n=jd(e,t.type);e!==n&&(Z(rt,t),Z(P,n))}function Hl(t){rt.current===t&&(U(P),U(rt)),ht.current===t&&(U(ht),_l._currentValue=ot)}var oo,fu;function Mn(t){if(oo===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);oo=e&&e[1]||"",fu=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+oo+t+fu}var so=!1;function ro(t,e){if(!t||so)return"";so=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var z=function(){throw Error()};if(Object.defineProperty(z.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(z,[])}catch(A){var N=A}Reflect.construct(t,[],z)}else{try{z.call()}catch(A){N=A}t.call(z.prototype)}}else{try{throw Error()}catch(A){N=A}(z=t())&&typeof z.catch=="function"&&z.catch(function(){})}}catch(A){if(A&&N&&typeof A.stack=="string")return[A.stack,N.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),o=i[0],u=i[1];if(o&&u){var p=o.split(`
`),T=u.split(`
`);for(l=a=0;a<p.length&&!p[a].includes("DetermineComponentFrameRoot");)a++;for(;l<T.length&&!T[l].includes("DetermineComponentFrameRoot");)l++;if(a===p.length||l===T.length)for(a=p.length-1,l=T.length-1;1<=a&&0<=l&&p[a]!==T[l];)l--;for(;1<=a&&0<=l;a--,l--)if(p[a]!==T[l]){if(a!==1||l!==1)do if(a--,l--,0>l||p[a]!==T[l]){var D=`
`+p[a].replace(" at new "," at ");return t.displayName&&D.includes("<anonymous>")&&(D=D.replace("<anonymous>",t.displayName)),D}while(1<=a&&0<=l);break}}}finally{so=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Mn(n):""}function Dg(t,e){switch(t.tag){case 26:case 27:case 5:return Mn(t.type);case 16:return Mn("Lazy");case 13:return t.child!==e&&e!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return ro(t.type,!1);case 11:return ro(t.type.render,!1);case 1:return ro(t.type,!0);case 31:return Mn("Activity");default:return""}}function du(t){try{var e="",n=null;do e+=Dg(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var uo=Object.prototype.hasOwnProperty,co=r.unstable_scheduleCallback,fo=r.unstable_cancelCallback,Rg=r.unstable_shouldYield,kg=r.unstable_requestPaint,re=r.unstable_now,Og=r.unstable_getCurrentPriorityLevel,hu=r.unstable_ImmediatePriority,gu=r.unstable_UserBlockingPriority,jl=r.unstable_NormalPriority,zg=r.unstable_LowPriority,mu=r.unstable_IdlePriority,Ug=r.log,Hg=r.unstable_setDisableYieldValue,Ga=null,ue=null;function nn(t){if(typeof Ug=="function"&&Hg(t),ue&&typeof ue.setStrictMode=="function")try{ue.setStrictMode(Ga,t)}catch{}}var ce=Math.clz32?Math.clz32:Lg,jg=Math.log,Bg=Math.LN2;function Lg(t){return t>>>=0,t===0?32:31-(jg(t)/Bg|0)|0}var Bl=256,Ll=262144,Gl=4194304;function Dn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Yl(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,o=t.pingedLanes;t=t.warmLanes;var u=a&134217727;return u!==0?(a=u&~i,a!==0?l=Dn(a):(o&=u,o!==0?l=Dn(o):n||(n=u&~t,n!==0&&(l=Dn(n))))):(u=a&~i,u!==0?l=Dn(u):o!==0?l=Dn(o):n||(n=a&~t,n!==0&&(l=Dn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function Ya(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Gg(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pu(){var t=Gl;return Gl<<=1,(Gl&62914560)===0&&(Gl=4194304),t}function ho(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function qa(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Yg(t,e,n,a,l,i){var o=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var u=t.entanglements,p=t.expirationTimes,T=t.hiddenUpdates;for(n=o&~n;0<n;){var D=31-ce(n),z=1<<D;u[D]=0,p[D]=-1;var N=T[D];if(N!==null)for(T[D]=null,D=0;D<N.length;D++){var A=N[D];A!==null&&(A.lane&=-536870913)}n&=~z}a!==0&&yu(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(o&~e))}function yu(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-ce(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function vu(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-ce(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function bu(t,e){var n=e&-e;return n=(n&42)!==0?1:go(n),(n&(t.suspendedLanes|e))!==0?0:n}function go(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function mo(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function wu(){var t=K.p;return t!==0?t:(t=window.event,t===void 0?32:oh(t.type))}function Su(t,e){var n=K.p;try{return K.p=t,e()}finally{K.p=n}}var an=Math.random().toString(36).slice(2),It="__reactFiber$"+an,ee="__reactProps$"+an,Pn="__reactContainer$"+an,po="__reactEvents$"+an,qg="__reactListeners$"+an,Vg="__reactHandles$"+an,xu="__reactResources$"+an,Va="__reactMarker$"+an;function yo(t){delete t[It],delete t[ee],delete t[po],delete t[qg],delete t[Vg]}function ta(t){var e=t[It];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Pn]||n[It]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Xd(t);t!==null;){if(n=t[It])return n;t=Xd(t)}return e}t=n,n=t.parentNode}return null}function ea(t){if(t=t[It]||t[Pn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Xa(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(s(33))}function na(t){var e=t[xu];return e||(e=t[xu]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Zt(t){t[Va]=!0}var Eu=new Set,Tu={};function Rn(t,e){aa(t,e),aa(t+"Capture",e)}function aa(t,e){for(Tu[t]=e,t=0;t<e.length;t++)Eu.add(e[t])}var Xg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Nu={},Cu={};function Qg(t){return uo.call(Cu,t)?!0:uo.call(Nu,t)?!1:Xg.test(t)?Cu[t]=!0:(Nu[t]=!0,!1)}function ql(t,e,n){if(Qg(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Vl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function je(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ve(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Au(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Zg(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function vo(t){if(!t._valueTracker){var e=Au(t)?"checked":"value";t._valueTracker=Zg(t,e,""+t[e])}}function _u(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=Au(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Xl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Kg=/[\n"\\]/g;function be(t){return t.replace(Kg,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function bo(t,e,n,a,l,i,o,u){t.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.type=o:t.removeAttribute("type"),e!=null?o==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ve(e)):t.value!==""+ve(e)&&(t.value=""+ve(e)):o!=="submit"&&o!=="reset"||t.removeAttribute("value"),e!=null?wo(t,o,ve(e)):n!=null?wo(t,o,ve(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.name=""+ve(u):t.removeAttribute("name")}function Mu(t,e,n,a,l,i,o,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){vo(t);return}n=n!=null?""+ve(n):"",e=e!=null?""+ve(e):n,u||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=u?t.checked:!!a,t.defaultChecked=!!a,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(t.name=o),vo(t)}function wo(t,e,n){e==="number"&&Xl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function la(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ve(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function Du(t,e,n){if(e!=null&&(e=""+ve(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ve(n):""}function Ru(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(s(92));if(Gt(a)){if(1<a.length)throw Error(s(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ve(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),vo(t)}function ia(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ig=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function ku(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||Ig.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Ou(t,e,n){if(e!=null&&typeof e!="object")throw Error(s(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&ku(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&ku(t,i,e[i])}function So(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Fg=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Jg=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ql(t){return Jg.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Be(){}var xo=null;function Eo(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var oa=null,sa=null;function zu(t){var e=ea(t);if(e&&(t=e.stateNode)){var n=t[ee]||null;t:switch(t=e.stateNode,e.type){case"input":if(bo(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[ee]||null;if(!l)throw Error(s(90));bo(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&_u(a)}break t;case"textarea":Du(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&la(t,!!n.multiple,e,!1)}}}var To=!1;function Uu(t,e,n){if(To)return t(e,n);To=!0;try{var a=t(e);return a}finally{if(To=!1,(oa!==null||sa!==null)&&(ki(),oa&&(e=oa,t=sa,sa=oa=null,zu(e),t)))for(e=0;e<t.length;e++)zu(t[e])}}function Qa(t,e){var n=t.stateNode;if(n===null)return null;var a=n[ee]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(s(231,e,typeof n));return n}var Le=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),No=!1;if(Le)try{var Za={};Object.defineProperty(Za,"passive",{get:function(){No=!0}}),window.addEventListener("test",Za,Za),window.removeEventListener("test",Za,Za)}catch{No=!1}var ln=null,Co=null,Zl=null;function Hu(){if(Zl)return Zl;var t,e=Co,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var o=n-t;for(a=1;a<=o&&e[n-a]===l[i-a];a++);return Zl=l.slice(t,1<a?1-a:void 0)}function Kl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Il(){return!0}function ju(){return!1}function ne(t){function e(n,a,l,i,o){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(n=t[u],this[u]=n?n(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Il:ju,this.isPropagationStopped=ju,this}return k(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Il)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Il)},persist:function(){},isPersistent:Il}),e}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Fl=ne(kn),Ka=k({},kn,{view:0,detail:0}),Wg=ne(Ka),Ao,_o,Ia,Jl=k({},Ka,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Do,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ia&&(Ia&&t.type==="mousemove"?(Ao=t.screenX-Ia.screenX,_o=t.screenY-Ia.screenY):_o=Ao=0,Ia=t),Ao)},movementY:function(t){return"movementY"in t?t.movementY:_o}}),Bu=ne(Jl),$g=k({},Jl,{dataTransfer:0}),Pg=ne($g),tm=k({},Ka,{relatedTarget:0}),Mo=ne(tm),em=k({},kn,{animationName:0,elapsedTime:0,pseudoElement:0}),nm=ne(em),am=k({},kn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),lm=ne(am),im=k({},kn,{data:0}),Lu=ne(im),om={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function um(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=rm[t])?!!e[t]:!1}function Do(){return um}var cm=k({},Ka,{key:function(t){if(t.key){var e=om[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Kl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?sm[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Do,charCode:function(t){return t.type==="keypress"?Kl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Kl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),fm=ne(cm),dm=k({},Jl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Gu=ne(dm),hm=k({},Ka,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Do}),gm=ne(hm),mm=k({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0}),pm=ne(mm),ym=k({},Jl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),vm=ne(ym),bm=k({},kn,{newState:0,oldState:0}),wm=ne(bm),Sm=[9,13,27,32],Ro=Le&&"CompositionEvent"in window,Fa=null;Le&&"documentMode"in document&&(Fa=document.documentMode);var xm=Le&&"TextEvent"in window&&!Fa,Yu=Le&&(!Ro||Fa&&8<Fa&&11>=Fa),qu=" ",Vu=!1;function Xu(t,e){switch(t){case"keyup":return Sm.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qu(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ra=!1;function Em(t,e){switch(t){case"compositionend":return Qu(e);case"keypress":return e.which!==32?null:(Vu=!0,qu);case"textInput":return t=e.data,t===qu&&Vu?null:t;default:return null}}function Tm(t,e){if(ra)return t==="compositionend"||!Ro&&Xu(t,e)?(t=Hu(),Zl=Co=ln=null,ra=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Yu&&e.locale!=="ko"?null:e.data;default:return null}}var Nm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Zu(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Nm[t.type]:e==="textarea"}function Ku(t,e,n,a){oa?sa?sa.push(a):sa=[a]:oa=a,e=Li(e,"onChange"),0<e.length&&(n=new Fl("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Ja=null,Wa=null;function Cm(t){Dd(t,0)}function Wl(t){var e=Xa(t);if(_u(e))return t}function Iu(t,e){if(t==="change")return e}var Fu=!1;if(Le){var ko;if(Le){var Oo="oninput"in document;if(!Oo){var Ju=document.createElement("div");Ju.setAttribute("oninput","return;"),Oo=typeof Ju.oninput=="function"}ko=Oo}else ko=!1;Fu=ko&&(!document.documentMode||9<document.documentMode)}function Wu(){Ja&&(Ja.detachEvent("onpropertychange",$u),Wa=Ja=null)}function $u(t){if(t.propertyName==="value"&&Wl(Wa)){var e=[];Ku(e,Wa,t,Eo(t)),Uu(Cm,e)}}function Am(t,e,n){t==="focusin"?(Wu(),Ja=e,Wa=n,Ja.attachEvent("onpropertychange",$u)):t==="focusout"&&Wu()}function _m(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Wl(Wa)}function Mm(t,e){if(t==="click")return Wl(e)}function Dm(t,e){if(t==="input"||t==="change")return Wl(e)}function Rm(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var fe=typeof Object.is=="function"?Object.is:Rm;function $a(t,e){if(fe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!uo.call(e,l)||!fe(t[l],e[l]))return!1}return!0}function Pu(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function tc(t,e){var n=Pu(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Pu(n)}}function ec(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?ec(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function nc(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Xl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Xl(t.document)}return e}function zo(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var km=Le&&"documentMode"in document&&11>=document.documentMode,ua=null,Uo=null,Pa=null,Ho=!1;function ac(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ho||ua==null||ua!==Xl(a)||(a=ua,"selectionStart"in a&&zo(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Pa&&$a(Pa,a)||(Pa=a,a=Li(Uo,"onSelect"),0<a.length&&(e=new Fl("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=ua)))}function On(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ca={animationend:On("Animation","AnimationEnd"),animationiteration:On("Animation","AnimationIteration"),animationstart:On("Animation","AnimationStart"),transitionrun:On("Transition","TransitionRun"),transitionstart:On("Transition","TransitionStart"),transitioncancel:On("Transition","TransitionCancel"),transitionend:On("Transition","TransitionEnd")},jo={},lc={};Le&&(lc=document.createElement("div").style,"AnimationEvent"in window||(delete ca.animationend.animation,delete ca.animationiteration.animation,delete ca.animationstart.animation),"TransitionEvent"in window||delete ca.transitionend.transition);function zn(t){if(jo[t])return jo[t];if(!ca[t])return t;var e=ca[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in lc)return jo[t]=e[n];return t}var ic=zn("animationend"),oc=zn("animationiteration"),sc=zn("animationstart"),Om=zn("transitionrun"),zm=zn("transitionstart"),Um=zn("transitioncancel"),rc=zn("transitionend"),uc=new Map,Bo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Bo.push("scrollEnd");function _e(t,e){uc.set(t,e),Rn(e,[t])}var $l=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},we=[],fa=0,Lo=0;function Pl(){for(var t=fa,e=Lo=fa=0;e<t;){var n=we[e];we[e++]=null;var a=we[e];we[e++]=null;var l=we[e];we[e++]=null;var i=we[e];if(we[e++]=null,a!==null&&l!==null){var o=a.pending;o===null?l.next=l:(l.next=o.next,o.next=l),a.pending=l}i!==0&&cc(n,l,i)}}function ti(t,e,n,a){we[fa++]=t,we[fa++]=e,we[fa++]=n,we[fa++]=a,Lo|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Go(t,e,n,a){return ti(t,e,n,a),ei(t)}function Un(t,e){return ti(t,null,null,e),ei(t)}function cc(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-ce(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function ei(t){if(50<Sl)throw Sl=0,Fs=null,Error(s(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var da={};function Hm(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function de(t,e,n,a){return new Hm(t,e,n,a)}function Yo(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ge(t,e){var n=t.alternate;return n===null?(n=de(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function fc(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ni(t,e,n,a,l,i){var o=0;if(a=t,typeof t=="function")Yo(t)&&(o=1);else if(typeof t=="string")o=Y0(t,n,P.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case V:return t=de(31,n,e,l),t.elementType=V,t.lanes=i,t;case I:return Hn(n.children,l,i,e);case F:o=8,l|=24;break;case L:return t=de(12,n,e,l|2),t.elementType=L,t.lanes=i,t;case at:return t=de(13,n,e,l),t.elementType=at,t.lanes=i,t;case q:return t=de(19,n,e,l),t.elementType=q,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case C:o=10;break t;case R:o=9;break t;case G:o=11;break t;case j:o=14;break t;case Q:o=16,a=null;break t}o=29,n=Error(s(130,t===null?"null":typeof t,"")),a=null}return e=de(o,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function Hn(t,e,n,a){return t=de(7,t,a,e),t.lanes=n,t}function qo(t,e,n){return t=de(6,t,null,e),t.lanes=n,t}function dc(t){var e=de(18,null,null,0);return e.stateNode=t,e}function Vo(t,e,n){return e=de(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var hc=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=hc.get(t);return n!==void 0?n:(e={value:t,source:e,stack:du(e)},hc.set(t,e),e)}return{value:t,source:e,stack:du(e)}}var ha=[],ga=0,ai=null,tl=0,xe=[],Ee=0,on=null,Re=1,ke="";function Ye(t,e){ha[ga++]=tl,ha[ga++]=ai,ai=t,tl=e}function gc(t,e,n){xe[Ee++]=Re,xe[Ee++]=ke,xe[Ee++]=on,on=t;var a=Re;t=ke;var l=32-ce(a)-1;a&=~(1<<l),n+=1;var i=32-ce(e)+l;if(30<i){var o=l-l%5;i=(a&(1<<o)-1).toString(32),a>>=o,l-=o,Re=1<<32-ce(e)+l|n<<l|a,ke=i+t}else Re=1<<i|n<<l|a,ke=t}function Xo(t){t.return!==null&&(Ye(t,1),gc(t,1,0))}function Qo(t){for(;t===ai;)ai=ha[--ga],ha[ga]=null,tl=ha[--ga],ha[ga]=null;for(;t===on;)on=xe[--Ee],xe[Ee]=null,ke=xe[--Ee],xe[Ee]=null,Re=xe[--Ee],xe[Ee]=null}function mc(t,e){xe[Ee++]=Re,xe[Ee++]=ke,xe[Ee++]=on,Re=e.id,ke=e.overflow,on=t}var Ft=null,kt=null,vt=!1,sn=null,Te=!1,Zo=Error(s(519));function rn(t){var e=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw el(Se(e,t)),Zo}function pc(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[It]=t,e[ee]=a,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<El.length;n++)mt(El[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),Mu(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),Ru(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||zd(e.textContent,n)?(a.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),a.onScroll!=null&&mt("scroll",e),a.onScrollEnd!=null&&mt("scrollend",e),a.onClick!=null&&(e.onclick=Be),e=!0):e=!1,e||rn(t,!0)}function yc(t){for(Ft=t.return;Ft;)switch(Ft.tag){case 5:case 31:case 13:Te=!1;return;case 27:case 3:Te=!0;return;default:Ft=Ft.return}}function ma(t){if(t!==Ft)return!1;if(!vt)return yc(t),vt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||cr(t.type,t.memoizedProps)),n=!n),n&&kt&&rn(t),yc(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));kt=Vd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));kt=Vd(t)}else e===27?(e=kt,xn(t.type)?(t=mr,mr=null,kt=t):kt=e):kt=Ft?Ce(t.stateNode.nextSibling):null;return!0}function jn(){kt=Ft=null,vt=!1}function Ko(){var t=sn;return t!==null&&(oe===null?oe=t:oe.push.apply(oe,t),sn=null),t}function el(t){sn===null?sn=[t]:sn.push(t)}var Io=w(null),Bn=null,qe=null;function un(t,e,n){Z(Io,e._currentValue),e._currentValue=n}function Ve(t){t._currentValue=Io.current,U(Io)}function Fo(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Jo(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var o=l.child;i=i.firstContext;t:for(;i!==null;){var u=i;i=l;for(var p=0;p<e.length;p++)if(u.context===e[p]){i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Fo(i.return,n,t),a||(o=null);break t}i=u.next}}else if(l.tag===18){if(o=l.return,o===null)throw Error(s(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),Fo(o,n,t),o=null}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===t){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}}function pa(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var o=l.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var u=l.type;fe(l.pendingProps.value,o.value)||(t!==null?t.push(u):t=[u])}}else if(l===ht.current){if(o=l.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(_l):t=[_l])}l=l.return}t!==null&&Jo(e,t,n,a),e.flags|=262144}function li(t){for(t=t.firstContext;t!==null;){if(!fe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ln(t){Bn=t,qe=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Jt(t){return vc(Bn,t)}function ii(t,e){return Bn===null&&Ln(t),vc(t,e)}function vc(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},qe===null){if(t===null)throw Error(s(308));qe=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else qe=qe.next=e;return n}var jm=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Bm=r.unstable_scheduleCallback,Lm=r.unstable_NormalPriority,Yt={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Wo(){return{controller:new jm,data:new Map,refCount:0}}function nl(t){t.refCount--,t.refCount===0&&Bm(Lm,function(){t.controller.abort()})}var al=null,$o=0,ya=0,va=null;function Gm(t,e){if(al===null){var n=al=[];$o=0,ya=er(),va={status:"pending",value:void 0,then:function(a){n.push(a)}}}return $o++,e.then(bc,bc),e}function bc(){if(--$o===0&&al!==null){va!==null&&(va.status="fulfilled");var t=al;al=null,ya=0,va=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Ym(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var wc=M.S;M.S=function(t,e){ld=re(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Gm(t,e),wc!==null&&wc(t,e)};var Gn=w(null);function Po(){var t=Gn.current;return t!==null?t:Dt.pooledCache}function oi(t,e){e===null?Z(Gn,Gn.current):Z(Gn,e.pool)}function Sc(){var t=Po();return t===null?null:{parent:Yt._currentValue,pool:t}}var ba=Error(s(460)),ts=Error(s(474)),si=Error(s(542)),ri={then:function(){}};function xc(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Ec(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Be,Be),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Nc(t),t;default:if(typeof e.status=="string")e.then(Be,Be);else{if(t=Dt,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Nc(t),t}throw qn=e,ba}}function Yn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(qn=n,ba):n}}var qn=null;function Tc(){if(qn===null)throw Error(s(459));var t=qn;return qn=null,t}function Nc(t){if(t===ba||t===si)throw Error(s(483))}var wa=null,ll=0;function ui(t){var e=ll;return ll+=1,wa===null&&(wa=[]),Ec(wa,t,e)}function il(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ci(t,e){throw e.$$typeof===H?Error(s(525)):(t=Object.prototype.toString.call(e),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Cc(t){function e(x,b){if(t){var E=x.deletions;E===null?(x.deletions=[b],x.flags|=16):E.push(b)}}function n(x,b){if(!t)return null;for(;b!==null;)e(x,b),b=b.sibling;return null}function a(x){for(var b=new Map;x!==null;)x.key!==null?b.set(x.key,x):b.set(x.index,x),x=x.sibling;return b}function l(x,b){return x=Ge(x,b),x.index=0,x.sibling=null,x}function i(x,b,E){return x.index=E,t?(E=x.alternate,E!==null?(E=E.index,E<b?(x.flags|=67108866,b):E):(x.flags|=67108866,b)):(x.flags|=1048576,b)}function o(x){return t&&x.alternate===null&&(x.flags|=67108866),x}function u(x,b,E,O){return b===null||b.tag!==6?(b=qo(E,x.mode,O),b.return=x,b):(b=l(b,E),b.return=x,b)}function p(x,b,E,O){var nt=E.type;return nt===I?D(x,b,E.props.children,O,E.key):b!==null&&(b.elementType===nt||typeof nt=="object"&&nt!==null&&nt.$$typeof===Q&&Yn(nt)===b.type)?(b=l(b,E.props),il(b,E),b.return=x,b):(b=ni(E.type,E.key,E.props,null,x.mode,O),il(b,E),b.return=x,b)}function T(x,b,E,O){return b===null||b.tag!==4||b.stateNode.containerInfo!==E.containerInfo||b.stateNode.implementation!==E.implementation?(b=Vo(E,x.mode,O),b.return=x,b):(b=l(b,E.children||[]),b.return=x,b)}function D(x,b,E,O,nt){return b===null||b.tag!==7?(b=Hn(E,x.mode,O,nt),b.return=x,b):(b=l(b,E),b.return=x,b)}function z(x,b,E){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return b=qo(""+b,x.mode,E),b.return=x,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case B:return E=ni(b.type,b.key,b.props,null,x.mode,E),il(E,b),E.return=x,E;case X:return b=Vo(b,x.mode,E),b.return=x,b;case Q:return b=Yn(b),z(x,b,E)}if(Gt(b)||Y(b))return b=Hn(b,x.mode,E,null),b.return=x,b;if(typeof b.then=="function")return z(x,ui(b),E);if(b.$$typeof===C)return z(x,ii(x,b),E);ci(x,b)}return null}function N(x,b,E,O){var nt=b!==null?b.key:null;if(typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint")return nt!==null?null:u(x,b,""+E,O);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case B:return E.key===nt?p(x,b,E,O):null;case X:return E.key===nt?T(x,b,E,O):null;case Q:return E=Yn(E),N(x,b,E,O)}if(Gt(E)||Y(E))return nt!==null?null:D(x,b,E,O,null);if(typeof E.then=="function")return N(x,b,ui(E),O);if(E.$$typeof===C)return N(x,b,ii(x,E),O);ci(x,E)}return null}function A(x,b,E,O,nt){if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return x=x.get(E)||null,u(b,x,""+O,nt);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case B:return x=x.get(O.key===null?E:O.key)||null,p(b,x,O,nt);case X:return x=x.get(O.key===null?E:O.key)||null,T(b,x,O,nt);case Q:return O=Yn(O),A(x,b,E,O,nt)}if(Gt(O)||Y(O))return x=x.get(E)||null,D(b,x,O,nt,null);if(typeof O.then=="function")return A(x,b,E,ui(O),nt);if(O.$$typeof===C)return A(x,b,E,ii(b,O),nt);ci(b,O)}return null}function $(x,b,E,O){for(var nt=null,bt=null,et=b,ft=b=0,yt=null;et!==null&&ft<E.length;ft++){et.index>ft?(yt=et,et=null):yt=et.sibling;var wt=N(x,et,E[ft],O);if(wt===null){et===null&&(et=yt);break}t&&et&&wt.alternate===null&&e(x,et),b=i(wt,b,ft),bt===null?nt=wt:bt.sibling=wt,bt=wt,et=yt}if(ft===E.length)return n(x,et),vt&&Ye(x,ft),nt;if(et===null){for(;ft<E.length;ft++)et=z(x,E[ft],O),et!==null&&(b=i(et,b,ft),bt===null?nt=et:bt.sibling=et,bt=et);return vt&&Ye(x,ft),nt}for(et=a(et);ft<E.length;ft++)yt=A(et,x,ft,E[ft],O),yt!==null&&(t&&yt.alternate!==null&&et.delete(yt.key===null?ft:yt.key),b=i(yt,b,ft),bt===null?nt=yt:bt.sibling=yt,bt=yt);return t&&et.forEach(function(An){return e(x,An)}),vt&&Ye(x,ft),nt}function st(x,b,E,O){if(E==null)throw Error(s(151));for(var nt=null,bt=null,et=b,ft=b=0,yt=null,wt=E.next();et!==null&&!wt.done;ft++,wt=E.next()){et.index>ft?(yt=et,et=null):yt=et.sibling;var An=N(x,et,wt.value,O);if(An===null){et===null&&(et=yt);break}t&&et&&An.alternate===null&&e(x,et),b=i(An,b,ft),bt===null?nt=An:bt.sibling=An,bt=An,et=yt}if(wt.done)return n(x,et),vt&&Ye(x,ft),nt;if(et===null){for(;!wt.done;ft++,wt=E.next())wt=z(x,wt.value,O),wt!==null&&(b=i(wt,b,ft),bt===null?nt=wt:bt.sibling=wt,bt=wt);return vt&&Ye(x,ft),nt}for(et=a(et);!wt.done;ft++,wt=E.next())wt=A(et,x,ft,wt.value,O),wt!==null&&(t&&wt.alternate!==null&&et.delete(wt.key===null?ft:wt.key),b=i(wt,b,ft),bt===null?nt=wt:bt.sibling=wt,bt=wt);return t&&et.forEach(function($0){return e(x,$0)}),vt&&Ye(x,ft),nt}function Mt(x,b,E,O){if(typeof E=="object"&&E!==null&&E.type===I&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case B:t:{for(var nt=E.key;b!==null;){if(b.key===nt){if(nt=E.type,nt===I){if(b.tag===7){n(x,b.sibling),O=l(b,E.props.children),O.return=x,x=O;break t}}else if(b.elementType===nt||typeof nt=="object"&&nt!==null&&nt.$$typeof===Q&&Yn(nt)===b.type){n(x,b.sibling),O=l(b,E.props),il(O,E),O.return=x,x=O;break t}n(x,b);break}else e(x,b);b=b.sibling}E.type===I?(O=Hn(E.props.children,x.mode,O,E.key),O.return=x,x=O):(O=ni(E.type,E.key,E.props,null,x.mode,O),il(O,E),O.return=x,x=O)}return o(x);case X:t:{for(nt=E.key;b!==null;){if(b.key===nt)if(b.tag===4&&b.stateNode.containerInfo===E.containerInfo&&b.stateNode.implementation===E.implementation){n(x,b.sibling),O=l(b,E.children||[]),O.return=x,x=O;break t}else{n(x,b);break}else e(x,b);b=b.sibling}O=Vo(E,x.mode,O),O.return=x,x=O}return o(x);case Q:return E=Yn(E),Mt(x,b,E,O)}if(Gt(E))return $(x,b,E,O);if(Y(E)){if(nt=Y(E),typeof nt!="function")throw Error(s(150));return E=nt.call(E),st(x,b,E,O)}if(typeof E.then=="function")return Mt(x,b,ui(E),O);if(E.$$typeof===C)return Mt(x,b,ii(x,E),O);ci(x,E)}return typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint"?(E=""+E,b!==null&&b.tag===6?(n(x,b.sibling),O=l(b,E),O.return=x,x=O):(n(x,b),O=qo(E,x.mode,O),O.return=x,x=O),o(x)):n(x,b)}return function(x,b,E,O){try{ll=0;var nt=Mt(x,b,E,O);return wa=null,nt}catch(et){if(et===ba||et===si)throw et;var bt=de(29,et,null,x.mode);return bt.lanes=O,bt.return=x,bt}finally{}}}var Vn=Cc(!0),Ac=Cc(!1),cn=!1;function es(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ns(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(xt&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=ei(t),cc(t,null,n),e}return ti(t,a,e,n),ei(t)}function ol(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,vu(t,n)}}function as(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var ls=!1;function sl(){if(ls){var t=va;if(t!==null)throw t}}function rl(t,e,n,a){ls=!1;var l=t.updateQueue;cn=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var p=u,T=p.next;p.next=null,o===null?i=T:o.next=T,o=p;var D=t.alternate;D!==null&&(D=D.updateQueue,u=D.lastBaseUpdate,u!==o&&(u===null?D.firstBaseUpdate=T:u.next=T,D.lastBaseUpdate=p))}if(i!==null){var z=l.baseState;o=0,D=T=p=null,u=i;do{var N=u.lane&-536870913,A=N!==u.lane;if(A?(pt&N)===N:(a&N)===N){N!==0&&N===ya&&(ls=!0),D!==null&&(D=D.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});t:{var $=t,st=u;N=e;var Mt=n;switch(st.tag){case 1:if($=st.payload,typeof $=="function"){z=$.call(Mt,z,N);break t}z=$;break t;case 3:$.flags=$.flags&-65537|128;case 0:if($=st.payload,N=typeof $=="function"?$.call(Mt,z,N):$,N==null)break t;z=k({},z,N);break t;case 2:cn=!0}}N=u.callback,N!==null&&(t.flags|=64,A&&(t.flags|=8192),A=l.callbacks,A===null?l.callbacks=[N]:A.push(N))}else A={lane:N,tag:u.tag,payload:u.payload,callback:u.callback,next:null},D===null?(T=D=A,p=z):D=D.next=A,o|=N;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;A=u,u=A.next,A.next=null,l.lastBaseUpdate=A,l.shared.pending=null}}while(!0);D===null&&(p=z),l.baseState=p,l.firstBaseUpdate=T,l.lastBaseUpdate=D,i===null&&(l.shared.lanes=0),yn|=o,t.lanes=o,t.memoizedState=z}}function _c(t,e){if(typeof t!="function")throw Error(s(191,t));t.call(e)}function Mc(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)_c(n[t],e)}var Sa=w(null),fi=w(0);function Dc(t,e){t=$e,Z(fi,t),Z(Sa,e),$e=t|e.baseLanes}function is(){Z(fi,$e),Z(Sa,Sa.current)}function os(){$e=fi.current,U(Sa),U(fi)}var he=w(null),Ne=null;function hn(t){var e=t.alternate;Z(jt,jt.current&1),Z(he,t),Ne===null&&(e===null||Sa.current!==null||e.memoizedState!==null)&&(Ne=t)}function ss(t){Z(jt,jt.current),Z(he,t),Ne===null&&(Ne=t)}function Rc(t){t.tag===22?(Z(jt,jt.current),Z(he,t),Ne===null&&(Ne=t)):gn()}function gn(){Z(jt,jt.current),Z(he,he.current)}function ge(t){U(he),Ne===t&&(Ne=null),U(jt)}var jt=w(0);function di(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||hr(n)||gr(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xe=0,ct=null,At=null,qt=null,hi=!1,xa=!1,Xn=!1,gi=0,ul=0,Ea=null,qm=0;function Ut(){throw Error(s(321))}function rs(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!fe(t[n],e[n]))return!1;return!0}function us(t,e,n,a,l,i){return Xe=i,ct=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,M.H=t===null||t.memoizedState===null?mf:Ts,Xn=!1,i=n(a,l),Xn=!1,xa&&(i=Oc(e,n,a,l)),kc(t),i}function kc(t){M.H=dl;var e=At!==null&&At.next!==null;if(Xe=0,qt=At=ct=null,hi=!1,ul=0,Ea=null,e)throw Error(s(300));t===null||Vt||(t=t.dependencies,t!==null&&li(t)&&(Vt=!0))}function Oc(t,e,n,a){ct=t;var l=0;do{if(xa&&(Ea=null),ul=0,xa=!1,25<=l)throw Error(s(301));if(l+=1,qt=At=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}M.H=pf,i=e(n,a)}while(xa);return i}function Vm(){var t=M.H,e=t.useState()[0];return e=typeof e.then=="function"?cl(e):e,t=t.useState()[0],(At!==null?At.memoizedState:null)!==t&&(ct.flags|=1024),e}function cs(){var t=gi!==0;return gi=0,t}function fs(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function ds(t){if(hi){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}hi=!1}Xe=0,qt=At=ct=null,xa=!1,ul=gi=0,Ea=null}function te(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qt===null?ct.memoizedState=qt=t:qt=qt.next=t,qt}function Bt(){if(At===null){var t=ct.alternate;t=t!==null?t.memoizedState:null}else t=At.next;var e=qt===null?ct.memoizedState:qt.next;if(e!==null)qt=e,At=t;else{if(t===null)throw ct.alternate===null?Error(s(467)):Error(s(310));At=t,t={memoizedState:At.memoizedState,baseState:At.baseState,baseQueue:At.baseQueue,queue:At.queue,next:null},qt===null?ct.memoizedState=qt=t:qt=qt.next=t}return qt}function mi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function cl(t){var e=ul;return ul+=1,Ea===null&&(Ea=[]),t=Ec(Ea,t,e),e=ct,(qt===null?e.memoizedState:qt.next)===null&&(e=e.alternate,M.H=e===null||e.memoizedState===null?mf:Ts),t}function pi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return cl(t);if(t.$$typeof===C)return Jt(t)}throw Error(s(438,String(t)))}function hs(t){var e=null,n=ct.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=ct.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=mi(),ct.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=tt;return e.index++,n}function Qe(t,e){return typeof e=="function"?e(t):e}function yi(t){var e=Bt();return gs(e,At,t)}function gs(t,e,n){var a=t.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var u=o=null,p=null,T=e,D=!1;do{var z=T.lane&-536870913;if(z!==T.lane?(pt&z)===z:(Xe&z)===z){var N=T.revertLane;if(N===0)p!==null&&(p=p.next={lane:0,revertLane:0,gesture:null,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null}),z===ya&&(D=!0);else if((Xe&N)===N){T=T.next,N===ya&&(D=!0);continue}else z={lane:0,revertLane:T.revertLane,gesture:null,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},p===null?(u=p=z,o=i):p=p.next=z,ct.lanes|=N,yn|=N;z=T.action,Xn&&n(i,z),i=T.hasEagerState?T.eagerState:n(i,z)}else N={lane:z,revertLane:T.revertLane,gesture:T.gesture,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},p===null?(u=p=N,o=i):p=p.next=N,ct.lanes|=z,yn|=z;T=T.next}while(T!==null&&T!==e);if(p===null?o=i:p.next=u,!fe(i,t.memoizedState)&&(Vt=!0,D&&(n=va,n!==null)))throw n;t.memoizedState=i,t.baseState=o,t.baseQueue=p,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function ms(t){var e=Bt(),n=e.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=t(i,o.action),o=o.next;while(o!==l);fe(i,e.memoizedState)||(Vt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function zc(t,e,n){var a=ct,l=Bt(),i=vt;if(i){if(n===void 0)throw Error(s(407));n=n()}else n=e();var o=!fe((At||l).memoizedState,n);if(o&&(l.memoizedState=n,Vt=!0),l=l.queue,vs(jc.bind(null,a,l,t),[t]),l.getSnapshot!==e||o||qt!==null&&qt.memoizedState.tag&1){if(a.flags|=2048,Ta(9,{destroy:void 0},Hc.bind(null,a,l,n,e),null),Dt===null)throw Error(s(349));i||(Xe&127)!==0||Uc(a,e,n)}return n}function Uc(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ct.updateQueue,e===null?(e=mi(),ct.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Hc(t,e,n,a){e.value=n,e.getSnapshot=a,Bc(e)&&Lc(t)}function jc(t,e,n){return n(function(){Bc(e)&&Lc(t)})}function Bc(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!fe(t,n)}catch{return!0}}function Lc(t){var e=Un(t,2);e!==null&&se(e,t,2)}function ps(t){var e=te();if(typeof t=="function"){var n=t;if(t=n(),Xn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:t},e}function Gc(t,e,n,a){return t.baseState=n,gs(t,At,typeof a=="function"?a:Qe)}function Xm(t,e,n,a,l){if(wi(t))throw Error(s(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};M.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,Yc(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Yc(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=M.T,o={};M.T=o;try{var u=n(l,a),p=M.S;p!==null&&p(o,u),qc(t,e,u)}catch(T){ys(t,e,T)}finally{i!==null&&o.types!==null&&(i.types=o.types),M.T=i}}else try{i=n(l,a),qc(t,e,i)}catch(T){ys(t,e,T)}}function qc(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Vc(t,e,a)},function(a){return ys(t,e,a)}):Vc(t,e,n)}function Vc(t,e,n){e.status="fulfilled",e.value=n,Xc(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Yc(t,n)))}function ys(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,Xc(e),e=e.next;while(e!==a)}t.action=null}function Xc(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Qc(t,e){return e}function Zc(t,e){if(vt){var n=Dt.formState;if(n!==null){t:{var a=ct;if(vt){if(kt){e:{for(var l=kt,i=Te;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ce(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){kt=Ce(l.nextSibling),a=l.data==="F!";break t}}rn(a)}a=!1}a&&(e=n[0])}}return n=te(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qc,lastRenderedState:e},n.queue=a,n=df.bind(null,ct,a),a.dispatch=n,a=ps(!1),i=Es.bind(null,ct,!1,a.queue),a=te(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=Xm.bind(null,ct,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Kc(t){var e=Bt();return Ic(e,At,t)}function Ic(t,e,n){if(e=gs(t,e,Qc)[0],t=yi(Qe)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=cl(e)}catch(o){throw o===ba?si:o}else a=e;e=Bt();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(ct.flags|=2048,Ta(9,{destroy:void 0},Qm.bind(null,l,n),null)),[a,i,t]}function Qm(t,e){t.action=e}function Fc(t){var e=Bt(),n=At;if(n!==null)return Ic(e,n,t);Bt(),e=e.memoizedState,n=Bt();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function Ta(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=ct.updateQueue,e===null&&(e=mi(),ct.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Jc(){return Bt().memoizedState}function vi(t,e,n,a){var l=te();ct.flags|=t,l.memoizedState=Ta(1|e,{destroy:void 0},n,a===void 0?null:a)}function bi(t,e,n,a){var l=Bt();a=a===void 0?null:a;var i=l.memoizedState.inst;At!==null&&a!==null&&rs(a,At.memoizedState.deps)?l.memoizedState=Ta(e,i,n,a):(ct.flags|=t,l.memoizedState=Ta(1|e,i,n,a))}function Wc(t,e){vi(8390656,8,t,e)}function vs(t,e){bi(2048,8,t,e)}function Zm(t){ct.flags|=4;var e=ct.updateQueue;if(e===null)e=mi(),ct.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function $c(t){var e=Bt().memoizedState;return Zm({ref:e,nextImpl:t}),function(){if((xt&2)!==0)throw Error(s(440));return e.impl.apply(void 0,arguments)}}function Pc(t,e){return bi(4,2,t,e)}function tf(t,e){return bi(4,4,t,e)}function ef(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function nf(t,e,n){n=n!=null?n.concat([t]):null,bi(4,4,ef.bind(null,e,t),n)}function bs(){}function af(t,e){var n=Bt();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&rs(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function lf(t,e){var n=Bt();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&rs(e,a[1]))return a[0];if(a=t(),Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function ws(t,e,n){return n===void 0||(Xe&1073741824)!==0&&(pt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=od(),ct.lanes|=t,yn|=t,n)}function of(t,e,n,a){return fe(n,e)?n:Sa.current!==null?(t=ws(t,n,a),fe(t,e)||(Vt=!0),t):(Xe&42)===0||(Xe&1073741824)!==0&&(pt&261930)===0?(Vt=!0,t.memoizedState=n):(t=od(),ct.lanes|=t,yn|=t,e)}function sf(t,e,n,a,l){var i=K.p;K.p=i!==0&&8>i?i:8;var o=M.T,u={};M.T=u,Es(t,!1,e,n);try{var p=l(),T=M.S;if(T!==null&&T(u,p),p!==null&&typeof p=="object"&&typeof p.then=="function"){var D=Ym(p,a);fl(t,e,D,ye(t))}else fl(t,e,a,ye(t))}catch(z){fl(t,e,{then:function(){},status:"rejected",reason:z},ye())}finally{K.p=i,o!==null&&u.types!==null&&(o.types=u.types),M.T=o}}function Km(){}function Ss(t,e,n,a){if(t.tag!==5)throw Error(s(476));var l=rf(t).queue;sf(t,l,e,ot,n===null?Km:function(){return uf(t),n(a)})}function rf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:ot,baseState:ot,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:ot},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function uf(t){var e=rf(t);e.next===null&&(e=t.alternate.memoizedState),fl(t,e.next.queue,{},ye())}function xs(){return Jt(_l)}function cf(){return Bt().memoizedState}function ff(){return Bt().memoizedState}function Im(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var a=dn(e,t,n);a!==null&&(se(a,e,n),ol(a,e,n)),e={cache:Wo()},t.payload=e;return}e=e.return}}function Fm(t,e,n){var a=ye();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},wi(t)?hf(e,n):(n=Go(t,e,n,a),n!==null&&(se(n,t,a),gf(n,e,a)))}function df(t,e,n){var a=ye();fl(t,e,n,a)}function fl(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(wi(t))hf(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,u=i(o,n);if(l.hasEagerState=!0,l.eagerState=u,fe(u,o))return ti(t,e,l,0),Dt===null&&Pl(),!1}catch{}finally{}if(n=Go(t,e,l,a),n!==null)return se(n,t,a),gf(n,e,a),!0}return!1}function Es(t,e,n,a){if(a={lane:2,revertLane:er(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},wi(t)){if(e)throw Error(s(479))}else e=Go(t,n,a,2),e!==null&&se(e,t,2)}function wi(t){var e=t.alternate;return t===ct||e!==null&&e===ct}function hf(t,e){xa=hi=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function gf(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,vu(t,n)}}var dl={readContext:Jt,use:pi,useCallback:Ut,useContext:Ut,useEffect:Ut,useImperativeHandle:Ut,useLayoutEffect:Ut,useInsertionEffect:Ut,useMemo:Ut,useReducer:Ut,useRef:Ut,useState:Ut,useDebugValue:Ut,useDeferredValue:Ut,useTransition:Ut,useSyncExternalStore:Ut,useId:Ut,useHostTransitionStatus:Ut,useFormState:Ut,useActionState:Ut,useOptimistic:Ut,useMemoCache:Ut,useCacheRefresh:Ut};dl.useEffectEvent=Ut;var mf={readContext:Jt,use:pi,useCallback:function(t,e){return te().memoizedState=[t,e===void 0?null:e],t},useContext:Jt,useEffect:Wc,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,vi(4194308,4,ef.bind(null,e,t),n)},useLayoutEffect:function(t,e){return vi(4194308,4,t,e)},useInsertionEffect:function(t,e){vi(4,2,t,e)},useMemo:function(t,e){var n=te();e=e===void 0?null:e;var a=t();if(Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=te();if(n!==void 0){var l=n(e);if(Xn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=Fm.bind(null,ct,t),[a.memoizedState,t]},useRef:function(t){var e=te();return t={current:t},e.memoizedState=t},useState:function(t){t=ps(t);var e=t.queue,n=df.bind(null,ct,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:bs,useDeferredValue:function(t,e){var n=te();return ws(n,t,e)},useTransition:function(){var t=ps(!1);return t=sf.bind(null,ct,t.queue,!0,!1),te().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=ct,l=te();if(vt){if(n===void 0)throw Error(s(407));n=n()}else{if(n=e(),Dt===null)throw Error(s(349));(pt&127)!==0||Uc(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,Wc(jc.bind(null,a,i,t),[t]),a.flags|=2048,Ta(9,{destroy:void 0},Hc.bind(null,a,i,n,e),null),n},useId:function(){var t=te(),e=Dt.identifierPrefix;if(vt){var n=ke,a=Re;n=(a&~(1<<32-ce(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=gi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=qm++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:xs,useFormState:Zc,useActionState:Zc,useOptimistic:function(t){var e=te();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Es.bind(null,ct,!0,n),n.dispatch=e,[t,e]},useMemoCache:hs,useCacheRefresh:function(){return te().memoizedState=Im.bind(null,ct)},useEffectEvent:function(t){var e=te(),n={impl:t};return e.memoizedState=n,function(){if((xt&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Ts={readContext:Jt,use:pi,useCallback:af,useContext:Jt,useEffect:vs,useImperativeHandle:nf,useInsertionEffect:Pc,useLayoutEffect:tf,useMemo:lf,useReducer:yi,useRef:Jc,useState:function(){return yi(Qe)},useDebugValue:bs,useDeferredValue:function(t,e){var n=Bt();return of(n,At.memoizedState,t,e)},useTransition:function(){var t=yi(Qe)[0],e=Bt().memoizedState;return[typeof t=="boolean"?t:cl(t),e]},useSyncExternalStore:zc,useId:cf,useHostTransitionStatus:xs,useFormState:Kc,useActionState:Kc,useOptimistic:function(t,e){var n=Bt();return Gc(n,At,t,e)},useMemoCache:hs,useCacheRefresh:ff};Ts.useEffectEvent=$c;var pf={readContext:Jt,use:pi,useCallback:af,useContext:Jt,useEffect:vs,useImperativeHandle:nf,useInsertionEffect:Pc,useLayoutEffect:tf,useMemo:lf,useReducer:ms,useRef:Jc,useState:function(){return ms(Qe)},useDebugValue:bs,useDeferredValue:function(t,e){var n=Bt();return At===null?ws(n,t,e):of(n,At.memoizedState,t,e)},useTransition:function(){var t=ms(Qe)[0],e=Bt().memoizedState;return[typeof t=="boolean"?t:cl(t),e]},useSyncExternalStore:zc,useId:cf,useHostTransitionStatus:xs,useFormState:Fc,useActionState:Fc,useOptimistic:function(t,e){var n=Bt();return At!==null?Gc(n,At,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:hs,useCacheRefresh:ff};pf.useEffectEvent=$c;function Ns(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:k({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Cs={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(se(e,t,a),ol(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(se(e,t,a),ol(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(se(e,t,n),ol(e,t,n))}};function yf(t,e,n,a,l,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,o):e.prototype&&e.prototype.isPureReactComponent?!$a(n,a)||!$a(l,i):!0}function vf(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&Cs.enqueueReplaceState(e,e.state,null)}function Qn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=k({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function bf(t){$l(t)}function wf(t){console.error(t)}function Sf(t){$l(t)}function Si(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function xf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function As(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){Si(t,e)},n}function Ef(t){return t=fn(t),t.tag=3,t}function Tf(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){xf(e,n,a)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){xf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var u=a.stack;this.componentDidCatch(a.value,{componentStack:u!==null?u:""})})}function Jm(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&pa(e,n,l,!0),n=he.current,n!==null){switch(n.tag){case 31:case 13:return Ne===null?Oi():n.alternate===null&&Ht===0&&(Ht=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===ri?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),$s(t,a,l)),!1;case 22:return n.flags|=65536,a===ri?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),$s(t,a,l)),!1}throw Error(s(435,n.tag))}return $s(t,a,l),Oi(),!1}if(vt)return e=he.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Zo&&(t=Error(s(422),{cause:a}),el(Se(t,n)))):(a!==Zo&&(e=Error(s(423),{cause:a}),el(Se(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=Se(a,n),l=As(t.stateNode,a,l),as(t,l),Ht!==4&&(Ht=2)),!1;var i=Error(s(520),{cause:a});if(i=Se(i,n),wl===null?wl=[i]:wl.push(i),Ht!==4&&(Ht=2),e===null)return!0;a=Se(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=As(n.stateNode,a,t),as(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=Ef(l),Tf(l,t,n,a),as(n,l),!1}n=n.return}while(n!==null);return!1}var _s=Error(s(461)),Vt=!1;function Wt(t,e,n,a){e.child=t===null?Ac(e,null,n,a):Vn(e,t.child,n,a)}function Nf(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var o={};for(var u in a)u!=="ref"&&(o[u]=a[u])}else o=a;return Ln(e),a=us(t,e,n,o,i,l),u=cs(),t!==null&&!Vt?(fs(t,e,l),Ze(t,e,l)):(vt&&u&&Xo(e),e.flags|=1,Wt(t,e,a,l),e.child)}function Cf(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!Yo(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,Af(t,e,i,a,l)):(t=ni(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Hs(t,l)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:$a,n(o,a)&&t.ref===e.ref)return Ze(t,e,l)}return e.flags|=1,t=Ge(i,a),t.ref=e.ref,t.return=e,e.child=t}function Af(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if($a(i,a)&&t.ref===e.ref)if(Vt=!1,e.pendingProps=a=i,Hs(t,l))(t.flags&131072)!==0&&(Vt=!0);else return e.lanes=t.lanes,Ze(t,e,l)}return Ms(t,e,n,a,l)}function _f(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return Mf(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&oi(e,i!==null?i.cachePool:null),i!==null?Dc(e,i):is(),Rc(e);else return a=e.lanes=536870912,Mf(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(oi(e,i.cachePool),Dc(e,i),gn(),e.memoizedState=null):(t!==null&&oi(e,null),is(),gn());return Wt(t,e,l,n),e.child}function hl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Mf(t,e,n,a,l){var i=Po();return i=i===null?null:{parent:Yt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&oi(e,null),is(),Rc(e),t!==null&&pa(t,e,a,!0),e.childLanes=l,null}function xi(t,e){return e=Ti({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Df(t,e,n){return Vn(e,t.child,null,n),t=xi(e,e.pendingProps),t.flags|=2,ge(e),e.memoizedState=null,t}function Wm(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(vt){if(a.mode==="hidden")return t=xi(e,a),e.lanes=536870912,hl(null,t);if(ss(e),(t=kt)?(t=qd(t,Te),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:on!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=dc(t),n.return=e,e.child=n,Ft=e,kt=null)):t=null,t===null)throw rn(e);return e.lanes=536870912,null}return xi(e,a)}var i=t.memoizedState;if(i!==null){var o=i.dehydrated;if(ss(e),l)if(e.flags&256)e.flags&=-257,e=Df(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(s(558));else if(Vt||pa(t,e,n,!1),l=(n&t.childLanes)!==0,Vt||l){if(a=Dt,a!==null&&(o=bu(a,n),o!==0&&o!==i.retryLane))throw i.retryLane=o,Un(t,o),se(a,t,o),_s;Oi(),e=Df(t,e,n)}else t=i.treeContext,kt=Ce(o.nextSibling),Ft=e,vt=!0,sn=null,Te=!1,t!==null&&mc(e,t),e=xi(e,a),e.flags|=4096;return e}return t=Ge(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ei(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(s(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Ms(t,e,n,a,l){return Ln(e),n=us(t,e,n,a,void 0,l),a=cs(),t!==null&&!Vt?(fs(t,e,l),Ze(t,e,l)):(vt&&a&&Xo(e),e.flags|=1,Wt(t,e,n,l),e.child)}function Rf(t,e,n,a,l,i){return Ln(e),e.updateQueue=null,n=Oc(e,a,n,l),kc(t),a=cs(),t!==null&&!Vt?(fs(t,e,i),Ze(t,e,i)):(vt&&a&&Xo(e),e.flags|=1,Wt(t,e,n,i),e.child)}function kf(t,e,n,a,l){if(Ln(e),e.stateNode===null){var i=da,o=n.contextType;typeof o=="object"&&o!==null&&(i=Jt(o)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Cs,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},es(e),o=n.contextType,i.context=typeof o=="object"&&o!==null?Jt(o):da,i.state=e.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(Ns(e,n,o,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Cs.enqueueReplaceState(i,i.state,null),rl(e,a,i,l),sl(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var u=e.memoizedProps,p=Qn(n,u);i.props=p;var T=i.context,D=n.contextType;o=da,typeof D=="object"&&D!==null&&(o=Jt(D));var z=n.getDerivedStateFromProps;D=typeof z=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=e.pendingProps!==u,D||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||T!==o)&&vf(e,i,a,o),cn=!1;var N=e.memoizedState;i.state=N,rl(e,a,i,l),sl(),T=e.memoizedState,u||N!==T||cn?(typeof z=="function"&&(Ns(e,n,z,a),T=e.memoizedState),(p=cn||yf(e,n,p,a,N,T,o))?(D||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=T),i.props=a,i.state=T,i.context=o,a=p):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,ns(t,e),o=e.memoizedProps,D=Qn(n,o),i.props=D,z=e.pendingProps,N=i.context,T=n.contextType,p=da,typeof T=="object"&&T!==null&&(p=Jt(T)),u=n.getDerivedStateFromProps,(T=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==z||N!==p)&&vf(e,i,a,p),cn=!1,N=e.memoizedState,i.state=N,rl(e,a,i,l),sl();var A=e.memoizedState;o!==z||N!==A||cn||t!==null&&t.dependencies!==null&&li(t.dependencies)?(typeof u=="function"&&(Ns(e,n,u,a),A=e.memoizedState),(D=cn||yf(e,n,D,a,N,A,p)||t!==null&&t.dependencies!==null&&li(t.dependencies))?(T||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,A,p),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,A,p)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&N===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&N===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=A),i.props=a,i.state=A,i.context=p,a=D):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&N===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&N===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,Ei(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Vn(e,t.child,null,l),e.child=Vn(e,null,n,l)):Wt(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ze(t,e,l),t}function Of(t,e,n,a){return jn(),e.flags|=256,Wt(t,e,n,a),e.child}var Ds={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Rs(t){return{baseLanes:t,cachePool:Sc()}}function ks(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pe),t}function zf(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,o;if((o=i)||(o=t!==null&&t.memoizedState===null?!1:(jt.current&2)!==0),o&&(l=!0,e.flags&=-129),o=(e.flags&32)!==0,e.flags&=-33,t===null){if(vt){if(l?hn(e):gn(),(t=kt)?(t=qd(t,Te),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:on!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=dc(t),n.return=e,e.child=n,Ft=e,kt=null)):t=null,t===null)throw rn(e);return gr(t)?e.lanes=32:e.lanes=536870912,null}var u=a.children;return a=a.fallback,l?(gn(),l=e.mode,u=Ti({mode:"hidden",children:u},l),a=Hn(a,l,n,null),u.return=e,a.return=e,u.sibling=a,e.child=u,a=e.child,a.memoizedState=Rs(n),a.childLanes=ks(t,o,n),e.memoizedState=Ds,hl(null,a)):(hn(e),Os(e,u))}var p=t.memoizedState;if(p!==null&&(u=p.dehydrated,u!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=zs(t,e,n)):e.memoizedState!==null?(gn(),e.child=t.child,e.flags|=128,e=null):(gn(),u=a.fallback,l=e.mode,a=Ti({mode:"visible",children:a.children},l),u=Hn(u,l,n,null),u.flags|=2,a.return=e,u.return=e,a.sibling=u,e.child=a,Vn(e,t.child,null,n),a=e.child,a.memoizedState=Rs(n),a.childLanes=ks(t,o,n),e.memoizedState=Ds,e=hl(null,a));else if(hn(e),gr(u)){if(o=u.nextSibling&&u.nextSibling.dataset,o)var T=o.dgst;o=T,a=Error(s(419)),a.stack="",a.digest=o,el({value:a,source:null,stack:null}),e=zs(t,e,n)}else if(Vt||pa(t,e,n,!1),o=(n&t.childLanes)!==0,Vt||o){if(o=Dt,o!==null&&(a=bu(o,n),a!==0&&a!==p.retryLane))throw p.retryLane=a,Un(t,a),se(o,t,a),_s;hr(u)||Oi(),e=zs(t,e,n)}else hr(u)?(e.flags|=192,e.child=t.child,e=null):(t=p.treeContext,kt=Ce(u.nextSibling),Ft=e,vt=!0,sn=null,Te=!1,t!==null&&mc(e,t),e=Os(e,a.children),e.flags|=4096);return e}return l?(gn(),u=a.fallback,l=e.mode,p=t.child,T=p.sibling,a=Ge(p,{mode:"hidden",children:a.children}),a.subtreeFlags=p.subtreeFlags&65011712,T!==null?u=Ge(T,u):(u=Hn(u,l,n,null),u.flags|=2),u.return=e,a.return=e,a.sibling=u,e.child=a,hl(null,a),a=e.child,u=t.child.memoizedState,u===null?u=Rs(n):(l=u.cachePool,l!==null?(p=Yt._currentValue,l=l.parent!==p?{parent:p,pool:p}:l):l=Sc(),u={baseLanes:u.baseLanes|n,cachePool:l}),a.memoizedState=u,a.childLanes=ks(t,o,n),e.memoizedState=Ds,hl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=Ge(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(o=e.deletions,o===null?(e.deletions=[t],e.flags|=16):o.push(t)),e.child=n,e.memoizedState=null,n)}function Os(t,e){return e=Ti({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ti(t,e){return t=de(22,t,null,e),t.lanes=0,t}function zs(t,e,n){return Vn(e,t.child,null,n),t=Os(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Uf(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Fo(t.return,e,n)}function Us(t,e,n,a,l,i){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=l,o.treeForkCount=i)}function Hf(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var o=jt.current,u=(o&2)!==0;if(u?(o=o&1|2,e.flags|=128):o&=1,Z(jt,o),Wt(t,e,a,n),a=vt?tl:0,!u&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Uf(t,n,e);else if(t.tag===19)Uf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&di(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),Us(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&di(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}Us(e,!0,n,null,i,a);break;case"together":Us(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(pa(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(s(153));if(e.child!==null){for(t=e.child,n=Ge(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ge(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Hs(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&li(t)))}function $m(t,e,n){switch(e.tag){case 3:Rt(e,e.stateNode.containerInfo),un(e,Yt,t.memoizedState.cache),jn();break;case 27:case 5:He(e);break;case 4:Rt(e,e.stateNode.containerInfo);break;case 10:un(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,ss(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?zf(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(pa(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return Hf(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Z(jt,jt.current),a)break;return null;case 22:return e.lanes=0,_f(t,e,n,e.pendingProps);case 24:un(e,Yt,t.memoizedState.cache)}return Ze(t,e,n)}function jf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Vt=!0;else{if(!Hs(t,n)&&(e.flags&128)===0)return Vt=!1,$m(t,e,n);Vt=(t.flags&131072)!==0}else Vt=!1,vt&&(e.flags&1048576)!==0&&gc(e,tl,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=Yn(e.elementType),e.type=t,typeof t=="function")Yo(t)?(a=Qn(t,a),e.tag=1,e=kf(null,e,t,a,n)):(e.tag=0,e=Ms(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===G){e.tag=11,e=Nf(null,e,t,a,n);break t}else if(l===j){e.tag=14,e=Cf(null,e,t,a,n);break t}}throw e=it(t)||t,Error(s(306,e,""))}}return e;case 0:return Ms(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Qn(a,e.pendingProps),kf(t,e,a,l,n);case 3:t:{if(Rt(e,e.stateNode.containerInfo),t===null)throw Error(s(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,ns(t,e),rl(e,a,null,n);var o=e.memoizedState;if(a=o.cache,un(e,Yt,a),a!==i.cache&&Jo(e,[Yt],n,!0),sl(),a=o.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:o.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Of(t,e,a,n);break t}else if(a!==l){l=Se(Error(s(424)),e),el(l),e=Of(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(kt=Ce(t.firstChild),Ft=e,vt=!0,sn=null,Te=!0,n=Ac(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(jn(),a===l){e=Ze(t,e,n);break t}Wt(t,e,a,n)}e=e.child}return e;case 26:return Ei(t,e),t===null?(n=Id(e.type,null,e.pendingProps,null))?e.memoizedState=n:vt||(n=e.type,t=e.pendingProps,a=Gi(dt.current).createElement(n),a[It]=e,a[ee]=t,$t(a,n,t),Zt(a),e.stateNode=a):e.memoizedState=Id(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return He(e),t===null&&vt&&(a=e.stateNode=Qd(e.type,e.pendingProps,dt.current),Ft=e,Te=!0,l=kt,xn(e.type)?(mr=l,kt=Ce(a.firstChild)):kt=l),Wt(t,e,e.pendingProps.children,n),Ei(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&vt&&((l=a=kt)&&(a=_0(a,e.type,e.pendingProps,Te),a!==null?(e.stateNode=a,Ft=e,kt=Ce(a.firstChild),Te=!1,l=!0):l=!1),l||rn(e)),He(e),l=e.type,i=e.pendingProps,o=t!==null?t.memoizedProps:null,a=i.children,cr(l,i)?a=null:o!==null&&cr(l,o)&&(e.flags|=32),e.memoizedState!==null&&(l=us(t,e,Vm,null,null,n),_l._currentValue=l),Ei(t,e),Wt(t,e,a,n),e.child;case 6:return t===null&&vt&&((t=n=kt)&&(n=M0(n,e.pendingProps,Te),n!==null?(e.stateNode=n,Ft=e,kt=null,t=!0):t=!1),t||rn(e)),null;case 13:return zf(t,e,n);case 4:return Rt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Vn(e,null,a,n):Wt(t,e,a,n),e.child;case 11:return Nf(t,e,e.type,e.pendingProps,n);case 7:return Wt(t,e,e.pendingProps,n),e.child;case 8:return Wt(t,e,e.pendingProps.children,n),e.child;case 12:return Wt(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,un(e,e.type,a.value),Wt(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,Ln(e),l=Jt(l),a=a(l),e.flags|=1,Wt(t,e,a,n),e.child;case 14:return Cf(t,e,e.type,e.pendingProps,n);case 15:return Af(t,e,e.type,e.pendingProps,n);case 19:return Hf(t,e,n);case 31:return Wm(t,e,n);case 22:return _f(t,e,n,e.pendingProps);case 24:return Ln(e),a=Jt(Yt),t===null?(l=Po(),l===null&&(l=Dt,i=Wo(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},es(e),un(e,Yt,l)):((t.lanes&n)!==0&&(ns(t,e),rl(e,null,null,n),sl()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),un(e,Yt,a)):(a=i.cache,un(e,Yt,a),a!==l.cache&&Jo(e,[Yt],n,!0))),Wt(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(s(156,e.tag))}function Ke(t){t.flags|=4}function js(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(cd())t.flags|=8192;else throw qn=ri,ts}else t.flags&=-16777217}function Bf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Pd(e))if(cd())t.flags|=8192;else throw qn=ri,ts}function Ni(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?pu():536870912,t.lanes|=e,_a|=e)}function gl(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function Ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Pm(t,e,n){var a=e.pendingProps;switch(Qo(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(e),null;case 1:return Ot(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Ve(Yt),Ct(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ma(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Ko())),Ot(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(Ot(e),Bf(e,i)):(Ot(e),js(e,l,null,a,n))):i?i!==t.memoizedState?(Ke(e),Ot(e),Bf(e,i)):(Ot(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ke(e),Ot(e),js(e,l,t,a,n)),null;case 27:if(Hl(e),n=dt.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(s(166));return Ot(e),null}t=P.current,ma(e)?pc(e):(t=Qd(l,a,n),e.stateNode=t,Ke(e))}return Ot(e),null;case 5:if(Hl(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(s(166));return Ot(e),null}if(i=P.current,ma(e))pc(e);else{var o=Gi(dt.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?o.createElement("select",{is:a.is}):o.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?o.createElement(l,{is:a.is}):o.createElement(l)}}i[It]=e,i[ee]=a;t:for(o=e.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===e)break t;for(;o.sibling===null;){if(o.return===null||o.return===e)break t;o=o.return}o.sibling.return=o.return,o=o.sibling}e.stateNode=i;t:switch($t(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ke(e)}}return Ot(e),js(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(s(166));if(t=dt.current,ma(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Ft,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[It]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||zd(t.nodeValue,n)),t||rn(e,!0)}else t=Gi(t).createTextNode(a),t[It]=e,e.stateNode=t}return Ot(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ma(e),n!==null){if(t===null){if(!a)throw Error(s(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[It]=e}else jn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),t=!1}else n=Ko(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ge(e),e):(ge(e),null);if((e.flags&128)!==0)throw Error(s(558))}return Ot(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ma(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(s(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(s(317));l[It]=e}else jn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),l=!1}else l=Ko(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(ge(e),e):(ge(e),null)}return ge(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Ni(e,e.updateQueue),Ot(e),null);case 4:return Ct(),t===null&&ir(e.stateNode.containerInfo),Ot(e),null;case 10:return Ve(e.type),Ot(e),null;case 19:if(U(jt),a=e.memoizedState,a===null)return Ot(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)gl(a,!1);else{if(Ht!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=di(t),i!==null){for(e.flags|=128,gl(a,!1),t=i.updateQueue,e.updateQueue=t,Ni(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)fc(n,t),n=n.sibling;return Z(jt,jt.current&1|2),vt&&Ye(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&re()>Di&&(e.flags|=128,l=!0,gl(a,!1),e.lanes=4194304)}else{if(!l)if(t=di(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,Ni(e,t),gl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!vt)return Ot(e),null}else 2*re()-a.renderingStartTime>Di&&n!==536870912&&(e.flags|=128,l=!0,gl(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=re(),t.sibling=null,n=jt.current,Z(jt,l?n&1|2:n&1),vt&&Ye(e,a.treeForkCount),t):(Ot(e),null);case 22:case 23:return ge(e),os(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(Ot(e),e.subtreeFlags&6&&(e.flags|=8192)):Ot(e),n=e.updateQueue,n!==null&&Ni(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&U(Gn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Ve(Yt),Ot(e),null;case 25:return null;case 30:return null}throw Error(s(156,e.tag))}function t0(t,e){switch(Qo(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ve(Yt),Ct(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Hl(e),null;case 31:if(e.memoizedState!==null){if(ge(e),e.alternate===null)throw Error(s(340));jn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ge(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(s(340));jn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return U(jt),null;case 4:return Ct(),null;case 10:return Ve(e.type),null;case 22:case 23:return ge(e),os(),t!==null&&U(Gn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Ve(Yt),null;case 25:return null;default:return null}}function Lf(t,e){switch(Qo(e),e.tag){case 3:Ve(Yt),Ct();break;case 26:case 27:case 5:Hl(e);break;case 4:Ct();break;case 31:e.memoizedState!==null&&ge(e);break;case 13:ge(e);break;case 19:U(jt);break;case 10:Ve(e.type);break;case 22:case 23:ge(e),os(),t!==null&&U(Gn);break;case 24:Ve(Yt)}}function ml(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,o=n.inst;a=i(),o.destroy=a}n=n.next}while(n!==l)}}catch(u){Nt(e,e.return,u)}}function mn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var o=a.inst,u=o.destroy;if(u!==void 0){o.destroy=void 0,l=e;var p=n,T=u;try{T()}catch(D){Nt(l,p,D)}}}a=a.next}while(a!==i)}}catch(D){Nt(e,e.return,D)}}function Gf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Mc(e,n)}catch(a){Nt(t,t.return,a)}}}function Yf(t,e,n){n.props=Qn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){Nt(t,e,a)}}function pl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){Nt(t,e,l)}}function Oe(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){Nt(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){Nt(t,e,l)}else n.current=null}function qf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){Nt(t,t.return,l)}}function Bs(t,e,n){try{var a=t.stateNode;x0(a,t.type,n,e),a[ee]=e}catch(l){Nt(t,t.return,l)}}function Vf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&xn(t.type)||t.tag===4}function Ls(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Vf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&xn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Gs(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Be));else if(a!==4&&(a===27&&xn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Gs(t,e,n),t=t.sibling;t!==null;)Gs(t,e,n),t=t.sibling}function Ci(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&xn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ci(t,e,n),t=t.sibling;t!==null;)Ci(t,e,n),t=t.sibling}function Xf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);$t(e,a,n),e[It]=t,e[ee]=n}catch(i){Nt(t,t.return,i)}}var Ie=!1,Xt=!1,Ys=!1,Qf=typeof WeakSet=="function"?WeakSet:Set,Kt=null;function e0(t,e){if(t=t.containerInfo,rr=Ki,t=nc(t),zo(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var o=0,u=-1,p=-1,T=0,D=0,z=t,N=null;e:for(;;){for(var A;z!==n||l!==0&&z.nodeType!==3||(u=o+l),z!==i||a!==0&&z.nodeType!==3||(p=o+a),z.nodeType===3&&(o+=z.nodeValue.length),(A=z.firstChild)!==null;)N=z,z=A;for(;;){if(z===t)break e;if(N===n&&++T===l&&(u=o),N===i&&++D===a&&(p=o),(A=z.nextSibling)!==null)break;z=N,N=z.parentNode}z=A}n=u===-1||p===-1?null:{start:u,end:p}}else n=null}n=n||{start:0,end:0}}else n=null;for(ur={focusedElem:t,selectionRange:n},Ki=!1,Kt=e;Kt!==null;)if(e=Kt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Kt=t;else for(;Kt!==null;){switch(e=Kt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var $=Qn(n.type,l);t=a.getSnapshotBeforeUpdate($,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(st){Nt(n,n.return,st)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)dr(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":dr(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=e.sibling,t!==null){t.return=e.return,Kt=t;break}Kt=e.return}}function Zf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Je(t,n),a&4&&ml(5,n);break;case 1:if(Je(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(o){Nt(n,n.return,o)}else{var l=Qn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(o){Nt(n,n.return,o)}}a&64&&Gf(n),a&512&&pl(n,n.return);break;case 3:if(Je(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Mc(t,e)}catch(o){Nt(n,n.return,o)}}break;case 27:e===null&&a&4&&Xf(n);case 26:case 5:Je(t,n),e===null&&a&4&&qf(n),a&512&&pl(n,n.return);break;case 12:Je(t,n);break;case 31:Je(t,n),a&4&&Ff(t,n);break;case 13:Je(t,n),a&4&&Jf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=c0.bind(null,n),D0(t,n))));break;case 22:if(a=n.memoizedState!==null||Ie,!a){e=e!==null&&e.memoizedState!==null||Xt,l=Ie;var i=Xt;Ie=a,(Xt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Je(t,n),Ie=l,Xt=i}break;case 30:break;default:Je(t,n)}}function Kf(t){var e=t.alternate;e!==null&&(t.alternate=null,Kf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&yo(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var zt=null,ae=!1;function Fe(t,e,n){for(n=n.child;n!==null;)If(t,e,n),n=n.sibling}function If(t,e,n){if(ue&&typeof ue.onCommitFiberUnmount=="function")try{ue.onCommitFiberUnmount(Ga,n)}catch{}switch(n.tag){case 26:Xt||Oe(n,e),Fe(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Xt||Oe(n,e);var a=zt,l=ae;xn(n.type)&&(zt=n.stateNode,ae=!1),Fe(t,e,n),Nl(n.stateNode),zt=a,ae=l;break;case 5:Xt||Oe(n,e);case 6:if(a=zt,l=ae,zt=null,Fe(t,e,n),zt=a,ae=l,zt!==null)if(ae)try{(zt.nodeType===9?zt.body:zt.nodeName==="HTML"?zt.ownerDocument.body:zt).removeChild(n.stateNode)}catch(i){Nt(n,e,i)}else try{zt.removeChild(n.stateNode)}catch(i){Nt(n,e,i)}break;case 18:zt!==null&&(ae?(t=zt,Gd(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Ha(t)):Gd(zt,n.stateNode));break;case 4:a=zt,l=ae,zt=n.stateNode.containerInfo,ae=!0,Fe(t,e,n),zt=a,ae=l;break;case 0:case 11:case 14:case 15:mn(2,n,e),Xt||mn(4,n,e),Fe(t,e,n);break;case 1:Xt||(Oe(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Yf(n,e,a)),Fe(t,e,n);break;case 21:Fe(t,e,n);break;case 22:Xt=(a=Xt)||n.memoizedState!==null,Fe(t,e,n),Xt=a;break;default:Fe(t,e,n)}}function Ff(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Ha(t)}catch(n){Nt(e,e.return,n)}}}function Jf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Ha(t)}catch(n){Nt(e,e.return,n)}}function n0(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Qf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Qf),e;default:throw Error(s(435,t.tag))}}function Ai(t,e){var n=n0(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=f0.bind(null,t,a);a.then(l,l)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,o=e,u=o;t:for(;u!==null;){switch(u.tag){case 27:if(xn(u.type)){zt=u.stateNode,ae=!1;break t}break;case 5:zt=u.stateNode,ae=!1;break t;case 3:case 4:zt=u.stateNode.containerInfo,ae=!0;break t}u=u.return}if(zt===null)throw Error(s(160));If(i,o,l),zt=null,ae=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Wf(e,t),e=e.sibling}var Me=null;function Wf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ie(t),a&4&&(mn(3,t,t.return),ml(3,t),mn(5,t,t.return));break;case 1:le(e,t),ie(t),a&512&&(Xt||n===null||Oe(n,n.return)),a&64&&Ie&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Me;if(le(e,t),ie(t),a&512&&(Xt||n===null||Oe(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Va]||i[It]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),$t(i,a,n),i[It]=t,Zt(i),a=i;break t;case"link":var o=Wd("link","href",l).get(a+(n.href||""));if(o){for(var u=0;u<o.length;u++)if(i=o[u],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(u,1);break e}}i=l.createElement(a),$t(i,a,n),l.head.appendChild(i);break;case"meta":if(o=Wd("meta","content",l).get(a+(n.content||""))){for(u=0;u<o.length;u++)if(i=o[u],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){o.splice(u,1);break e}}i=l.createElement(a),$t(i,a,n),l.head.appendChild(i);break;default:throw Error(s(468,a))}i[It]=t,Zt(i),a=i}t.stateNode=a}else $d(l,t.type,t.stateNode);else t.stateNode=Jd(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?$d(l,t.type,t.stateNode):Jd(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Bs(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ie(t),a&512&&(Xt||n===null||Oe(n,n.return)),n!==null&&a&4&&Bs(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ie(t),a&512&&(Xt||n===null||Oe(n,n.return)),t.flags&32){l=t.stateNode;try{ia(l,"")}catch($){Nt(t,t.return,$)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,Bs(t,l,n!==null?n.memoizedProps:l)),a&1024&&(Ys=!0);break;case 6:if(le(e,t),ie(t),a&4){if(t.stateNode===null)throw Error(s(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch($){Nt(t,t.return,$)}}break;case 3:if(Vi=null,l=Me,Me=Yi(e.containerInfo),le(e,t),Me=l,ie(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Ha(e.containerInfo)}catch($){Nt(t,t.return,$)}Ys&&(Ys=!1,$f(t));break;case 4:a=Me,Me=Yi(t.stateNode.containerInfo),le(e,t),ie(t),Me=a;break;case 12:le(e,t),ie(t);break;case 31:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ai(t,a)));break;case 13:le(e,t),ie(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Mi=re()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ai(t,a)));break;case 22:l=t.memoizedState!==null;var p=n!==null&&n.memoizedState!==null,T=Ie,D=Xt;if(Ie=T||l,Xt=D||p,le(e,t),Xt=D,Ie=T,ie(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||p||Ie||Xt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){p=n=e;try{if(i=p.stateNode,l)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{u=p.stateNode;var z=p.memoizedProps.style,N=z!=null&&z.hasOwnProperty("display")?z.display:null;u.style.display=N==null||typeof N=="boolean"?"":(""+N).trim()}}catch($){Nt(p,p.return,$)}}}else if(e.tag===6){if(n===null){p=e;try{p.stateNode.nodeValue=l?"":p.memoizedProps}catch($){Nt(p,p.return,$)}}}else if(e.tag===18){if(n===null){p=e;try{var A=p.stateNode;l?Yd(A,!0):Yd(p.stateNode,!1)}catch($){Nt(p,p.return,$)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ai(t,n))));break;case 19:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ai(t,a)));break;case 30:break;case 21:break;default:le(e,t),ie(t)}}function ie(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(Vf(a)){n=a;break}a=a.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var l=n.stateNode,i=Ls(t);Ci(t,i,l);break;case 5:var o=n.stateNode;n.flags&32&&(ia(o,""),n.flags&=-33);var u=Ls(t);Ci(t,u,o);break;case 3:case 4:var p=n.stateNode.containerInfo,T=Ls(t);Gs(t,T,p);break;default:throw Error(s(161))}}catch(D){Nt(t,t.return,D)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function $f(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;$f(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Je(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Zf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:mn(4,e,e.return),Zn(e);break;case 1:Oe(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Yf(e,e.return,n),Zn(e);break;case 27:Nl(e.stateNode);case 26:case 5:Oe(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,o=i.flags;switch(i.tag){case 0:case 11:case 15:We(l,i,n),ml(4,i);break;case 1:if(We(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(T){Nt(a,a.return,T)}if(a=i,l=a.updateQueue,l!==null){var u=a.stateNode;try{var p=l.shared.hiddenCallbacks;if(p!==null)for(l.shared.hiddenCallbacks=null,l=0;l<p.length;l++)_c(p[l],u)}catch(T){Nt(a,a.return,T)}}n&&o&64&&Gf(i),pl(i,i.return);break;case 27:Xf(i);case 26:case 5:We(l,i,n),n&&a===null&&o&4&&qf(i),pl(i,i.return);break;case 12:We(l,i,n);break;case 31:We(l,i,n),n&&o&4&&Ff(l,i);break;case 13:We(l,i,n),n&&o&4&&Jf(l,i);break;case 22:i.memoizedState===null&&We(l,i,n),pl(i,i.return);break;case 30:break;default:We(l,i,n)}e=e.sibling}}function qs(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&nl(n))}function Vs(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&nl(t))}function De(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pf(t,e,n,a),e=e.sibling}function Pf(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:De(t,e,n,a),l&2048&&ml(9,e);break;case 1:De(t,e,n,a);break;case 3:De(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&nl(t)));break;case 12:if(l&2048){De(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,o=i.id,u=i.onPostCommit;typeof u=="function"&&u(o,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(p){Nt(e,e.return,p)}}else De(t,e,n,a);break;case 31:De(t,e,n,a);break;case 13:De(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,o=e.alternate,e.memoizedState!==null?i._visibility&2?De(t,e,n,a):yl(t,e):i._visibility&2?De(t,e,n,a):(i._visibility|=2,Na(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&qs(o,e);break;case 24:De(t,e,n,a),l&2048&&Vs(e.alternate,e);break;default:De(t,e,n,a)}}function Na(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,o=e,u=n,p=a,T=o.flags;switch(o.tag){case 0:case 11:case 15:Na(i,o,u,p,l),ml(8,o);break;case 23:break;case 22:var D=o.stateNode;o.memoizedState!==null?D._visibility&2?Na(i,o,u,p,l):yl(i,o):(D._visibility|=2,Na(i,o,u,p,l)),l&&T&2048&&qs(o.alternate,o);break;case 24:Na(i,o,u,p,l),l&&T&2048&&Vs(o.alternate,o);break;default:Na(i,o,u,p,l)}e=e.sibling}}function yl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:yl(n,a),l&2048&&qs(a.alternate,a);break;case 24:yl(n,a),l&2048&&Vs(a.alternate,a);break;default:yl(n,a)}e=e.sibling}}var vl=8192;function Ca(t,e,n){if(t.subtreeFlags&vl)for(t=t.child;t!==null;)td(t,e,n),t=t.sibling}function td(t,e,n){switch(t.tag){case 26:Ca(t,e,n),t.flags&vl&&t.memoizedState!==null&&q0(n,Me,t.memoizedState,t.memoizedProps);break;case 5:Ca(t,e,n);break;case 3:case 4:var a=Me;Me=Yi(t.stateNode.containerInfo),Ca(t,e,n),Me=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=vl,vl=16777216,Ca(t,e,n),vl=a):Ca(t,e,n));break;default:Ca(t,e,n)}}function ed(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function bl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Kt=a,ad(a,t)}ed(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)nd(t),t=t.sibling}function nd(t){switch(t.tag){case 0:case 11:case 15:bl(t),t.flags&2048&&mn(9,t,t.return);break;case 3:bl(t);break;case 12:bl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,_i(t)):bl(t);break;default:bl(t)}}function _i(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Kt=a,ad(a,t)}ed(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:mn(8,e,e.return),_i(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,_i(e));break;default:_i(e)}t=t.sibling}}function ad(t,e){for(;Kt!==null;){var n=Kt;switch(n.tag){case 0:case 11:case 15:mn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:nl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Kt=a;else t:for(n=t;Kt!==null;){a=Kt;var l=a.sibling,i=a.return;if(Kf(a),a===n){Kt=null;break t}if(l!==null){l.return=i,Kt=l;break t}Kt=i}}}var a0={getCacheForType:function(t){var e=Jt(Yt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Jt(Yt).controller.signal}},l0=typeof WeakMap=="function"?WeakMap:Map,xt=0,Dt=null,gt=null,pt=0,Tt=0,me=null,pn=!1,Aa=!1,Xs=!1,$e=0,Ht=0,yn=0,Kn=0,Qs=0,pe=0,_a=0,wl=null,oe=null,Zs=!1,Mi=0,ld=0,Di=1/0,Ri=null,vn=null,Qt=0,bn=null,Ma=null,Pe=0,Ks=0,Is=null,id=null,Sl=0,Fs=null;function ye(){return(xt&2)!==0&&pt!==0?pt&-pt:M.T!==null?er():wu()}function od(){if(pe===0)if((pt&536870912)===0||vt){var t=Ll;Ll<<=1,(Ll&3932160)===0&&(Ll=262144),pe=t}else pe=536870912;return t=he.current,t!==null&&(t.flags|=32),pe}function se(t,e,n){(t===Dt&&(Tt===2||Tt===9)||t.cancelPendingCommit!==null)&&(Da(t,0),wn(t,pt,pe,!1)),qa(t,n),((xt&2)===0||t!==Dt)&&(t===Dt&&((xt&2)===0&&(Kn|=n),Ht===4&&wn(t,pt,pe,!1)),ze(t))}function sd(t,e,n){if((xt&6)!==0)throw Error(s(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Ya(t,e),l=a?s0(t,e):Ws(t,e,!0),i=a;do{if(l===0){Aa&&!a&&wn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!i0(n)){l=Ws(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var o=0;else o=t.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){e=o;t:{var u=t;l=wl;var p=u.current.memoizedState.isDehydrated;if(p&&(Da(u,o).flags|=256),o=Ws(u,o,!1),o!==2){if(Xs&&!p){u.errorRecoveryDisabledLanes|=i,Kn|=i,l=4;break t}i=oe,oe=l,i!==null&&(oe===null?oe=i:oe.push.apply(oe,i))}l=o}if(i=!1,l!==2)continue}}if(l===1){Da(t,0),wn(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(s(345));case 4:if((e&4194048)!==e)break;case 6:wn(a,e,pe,!pn);break t;case 2:oe=null;break;case 3:case 5:break;default:throw Error(s(329))}if((e&62914560)===e&&(l=Mi+300-re(),10<l)){if(wn(a,e,pe,!pn),Yl(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=Bd(rd.bind(null,a,n,oe,Ri,Zs,e,pe,Kn,_a,pn,i,"Throttled",-0,0),l);break t}rd(a,n,oe,Ri,Zs,e,pe,Kn,_a,pn,i,null,-0,0)}}break}while(!0);ze(t)}function rd(t,e,n,a,l,i,o,u,p,T,D,z,N,A){if(t.timeoutHandle=-1,z=e.subtreeFlags,z&8192||(z&16785408)===16785408){z={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Be},td(e,i,z);var $=(i&62914560)===i?Mi-re():(i&4194048)===i?ld-re():0;if($=V0(z,$),$!==null){Pe=i,t.cancelPendingCommit=$(pd.bind(null,t,e,i,n,a,l,o,u,p,D,z,null,N,A)),wn(t,i,o,!T);return}}pd(t,e,i,n,a,l,o,u,p)}function i0(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!fe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wn(t,e,n,a){e&=~Qs,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-ce(l),o=1<<i;a[i]=-1,l&=~o}n!==0&&yu(t,n,e)}function ki(){return(xt&6)===0?(xl(0),!1):!0}function Js(){if(gt!==null){if(Tt===0)var t=gt.return;else t=gt,qe=Bn=null,ds(t),wa=null,ll=0,t=gt;for(;t!==null;)Lf(t.alternate,t),t=t.return;gt=null}}function Da(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,N0(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Js(),Dt=t,gt=n=Ge(t.current,null),pt=e,Tt=0,me=null,pn=!1,Aa=Ya(t,e),Xs=!1,_a=pe=Qs=Kn=yn=Ht=0,oe=wl=null,Zs=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-ce(a),i=1<<l;e|=t[l],a&=~i}return $e=e,Pl(),n}function ud(t,e){ct=null,M.H=dl,e===ba||e===si?(e=Tc(),Tt=3):e===ts?(e=Tc(),Tt=4):Tt=e===_s?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,me=e,gt===null&&(Ht=1,Si(t,Se(e,t.current)))}function cd(){var t=he.current;return t===null?!0:(pt&4194048)===pt?Ne===null:(pt&62914560)===pt||(pt&536870912)!==0?t===Ne:!1}function fd(){var t=M.H;return M.H=dl,t===null?dl:t}function dd(){var t=M.A;return M.A=a0,t}function Oi(){Ht=4,pn||(pt&4194048)!==pt&&he.current!==null||(Aa=!0),(yn&134217727)===0&&(Kn&134217727)===0||Dt===null||wn(Dt,pt,pe,!1)}function Ws(t,e,n){var a=xt;xt|=2;var l=fd(),i=dd();(Dt!==t||pt!==e)&&(Ri=null,Da(t,e)),e=!1;var o=Ht;t:do try{if(Tt!==0&&gt!==null){var u=gt,p=me;switch(Tt){case 8:Js(),o=6;break t;case 3:case 2:case 9:case 6:he.current===null&&(e=!0);var T=Tt;if(Tt=0,me=null,Ra(t,u,p,T),n&&Aa){o=0;break t}break;default:T=Tt,Tt=0,me=null,Ra(t,u,p,T)}}o0(),o=Ht;break}catch(D){ud(t,D)}while(!0);return e&&t.shellSuspendCounter++,qe=Bn=null,xt=a,M.H=l,M.A=i,gt===null&&(Dt=null,pt=0,Pl()),o}function o0(){for(;gt!==null;)hd(gt)}function s0(t,e){var n=xt;xt|=2;var a=fd(),l=dd();Dt!==t||pt!==e?(Ri=null,Di=re()+500,Da(t,e)):Aa=Ya(t,e);t:do try{if(Tt!==0&&gt!==null){e=gt;var i=me;e:switch(Tt){case 1:Tt=0,me=null,Ra(t,e,i,1);break;case 2:case 9:if(xc(i)){Tt=0,me=null,gd(e);break}e=function(){Tt!==2&&Tt!==9||Dt!==t||(Tt=7),ze(t)},i.then(e,e);break t;case 3:Tt=7;break t;case 4:Tt=5;break t;case 7:xc(i)?(Tt=0,me=null,gd(e)):(Tt=0,me=null,Ra(t,e,i,7));break;case 5:var o=null;switch(gt.tag){case 26:o=gt.memoizedState;case 5:case 27:var u=gt;if(o?Pd(o):u.stateNode.complete){Tt=0,me=null;var p=u.sibling;if(p!==null)gt=p;else{var T=u.return;T!==null?(gt=T,zi(T)):gt=null}break e}}Tt=0,me=null,Ra(t,e,i,5);break;case 6:Tt=0,me=null,Ra(t,e,i,6);break;case 8:Js(),Ht=6;break t;default:throw Error(s(462))}}r0();break}catch(D){ud(t,D)}while(!0);return qe=Bn=null,M.H=a,M.A=l,xt=n,gt!==null?0:(Dt=null,pt=0,Pl(),Ht)}function r0(){for(;gt!==null&&!Rg();)hd(gt)}function hd(t){var e=jf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?zi(t):gt=e}function gd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Rf(n,e,e.pendingProps,e.type,void 0,pt);break;case 11:e=Rf(n,e,e.pendingProps,e.type.render,e.ref,pt);break;case 5:ds(e);default:Lf(n,e),e=gt=fc(e,$e),e=jf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?zi(t):gt=e}function Ra(t,e,n,a){qe=Bn=null,ds(e),wa=null,ll=0;var l=e.return;try{if(Jm(t,l,e,n,pt)){Ht=1,Si(t,Se(n,t.current)),gt=null;return}}catch(i){if(l!==null)throw gt=l,i;Ht=1,Si(t,Se(n,t.current)),gt=null;return}e.flags&32768?(vt||a===1?t=!0:Aa||(pt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=he.current,a!==null&&a.tag===13&&(a.flags|=16384))),md(e,t)):zi(e)}function zi(t){var e=t;do{if((e.flags&32768)!==0){md(e,pn);return}t=e.return;var n=Pm(e.alternate,e,$e);if(n!==null){gt=n;return}if(e=e.sibling,e!==null){gt=e;return}gt=e=t}while(e!==null);Ht===0&&(Ht=5)}function md(t,e){do{var n=t0(t.alternate,t);if(n!==null){n.flags&=32767,gt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){gt=t;return}gt=t=n}while(t!==null);Ht=6,gt=null}function pd(t,e,n,a,l,i,o,u,p){t.cancelPendingCommit=null;do Ui();while(Qt!==0);if((xt&6)!==0)throw Error(s(327));if(e!==null){if(e===t.current)throw Error(s(177));if(i=e.lanes|e.childLanes,i|=Lo,Yg(t,n,i,o,u,p),t===Dt&&(gt=Dt=null,pt=0),Ma=e,bn=t,Pe=n,Ks=i,Is=l,id=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,d0(jl,function(){return Sd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=M.T,M.T=null,l=K.p,K.p=2,o=xt,xt|=4;try{e0(t,e,n)}finally{xt=o,K.p=l,M.T=a}}Qt=1,yd(),vd(),bd()}}function yd(){if(Qt===1){Qt=0;var t=bn,e=Ma,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=M.T,M.T=null;var a=K.p;K.p=2;var l=xt;xt|=4;try{Wf(e,t);var i=ur,o=nc(t.containerInfo),u=i.focusedElem,p=i.selectionRange;if(o!==u&&u&&u.ownerDocument&&ec(u.ownerDocument.documentElement,u)){if(p!==null&&zo(u)){var T=p.start,D=p.end;if(D===void 0&&(D=T),"selectionStart"in u)u.selectionStart=T,u.selectionEnd=Math.min(D,u.value.length);else{var z=u.ownerDocument||document,N=z&&z.defaultView||window;if(N.getSelection){var A=N.getSelection(),$=u.textContent.length,st=Math.min(p.start,$),Mt=p.end===void 0?st:Math.min(p.end,$);!A.extend&&st>Mt&&(o=Mt,Mt=st,st=o);var x=tc(u,st),b=tc(u,Mt);if(x&&b&&(A.rangeCount!==1||A.anchorNode!==x.node||A.anchorOffset!==x.offset||A.focusNode!==b.node||A.focusOffset!==b.offset)){var E=z.createRange();E.setStart(x.node,x.offset),A.removeAllRanges(),st>Mt?(A.addRange(E),A.extend(b.node,b.offset)):(E.setEnd(b.node,b.offset),A.addRange(E))}}}}for(z=[],A=u;A=A.parentNode;)A.nodeType===1&&z.push({element:A,left:A.scrollLeft,top:A.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<z.length;u++){var O=z[u];O.element.scrollLeft=O.left,O.element.scrollTop=O.top}}Ki=!!rr,ur=rr=null}finally{xt=l,K.p=a,M.T=n}}t.current=e,Qt=2}}function vd(){if(Qt===2){Qt=0;var t=bn,e=Ma,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=M.T,M.T=null;var a=K.p;K.p=2;var l=xt;xt|=4;try{Zf(t,e.alternate,e)}finally{xt=l,K.p=a,M.T=n}}Qt=3}}function bd(){if(Qt===4||Qt===3){Qt=0,kg();var t=bn,e=Ma,n=Pe,a=id;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Qt=5:(Qt=0,Ma=bn=null,wd(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),mo(n),e=e.stateNode,ue&&typeof ue.onCommitFiberRoot=="function")try{ue.onCommitFiberRoot(Ga,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=M.T,l=K.p,K.p=2,M.T=null;try{for(var i=t.onRecoverableError,o=0;o<a.length;o++){var u=a[o];i(u.value,{componentStack:u.stack})}}finally{M.T=e,K.p=l}}(Pe&3)!==0&&Ui(),ze(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Fs?Sl++:(Sl=0,Fs=t):Sl=0,xl(0)}}function wd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,nl(e)))}function Ui(){return yd(),vd(),bd(),Sd()}function Sd(){if(Qt!==5)return!1;var t=bn,e=Ks;Ks=0;var n=mo(Pe),a=M.T,l=K.p;try{K.p=32>n?32:n,M.T=null,n=Is,Is=null;var i=bn,o=Pe;if(Qt=0,Ma=bn=null,Pe=0,(xt&6)!==0)throw Error(s(331));var u=xt;if(xt|=4,nd(i.current),Pf(i,i.current,o,n),xt=u,xl(0,!1),ue&&typeof ue.onPostCommitFiberRoot=="function")try{ue.onPostCommitFiberRoot(Ga,i)}catch{}return!0}finally{K.p=l,M.T=a,wd(t,e)}}function xd(t,e,n){e=Se(n,e),e=As(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(qa(t,2),ze(t))}function Nt(t,e,n){if(t.tag===3)xd(t,t,n);else for(;e!==null;){if(e.tag===3){xd(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=Se(n,t),n=Ef(2),a=dn(e,n,2),a!==null&&(Tf(n,a,e,t),qa(a,2),ze(a));break}}e=e.return}}function $s(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new l0;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Xs=!0,l.add(n),t=u0.bind(null,t,e,n),e.then(t,t))}function u0(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Dt===t&&(pt&n)===n&&(Ht===4||Ht===3&&(pt&62914560)===pt&&300>re()-Mi?(xt&2)===0&&Da(t,0):Qs|=n,_a===pt&&(_a=0)),ze(t)}function Ed(t,e){e===0&&(e=pu()),t=Un(t,e),t!==null&&(qa(t,e),ze(t))}function c0(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Ed(t,n)}function f0(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(s(314))}a!==null&&a.delete(e),Ed(t,n)}function d0(t,e){return co(t,e)}var Hi=null,ka=null,Ps=!1,ji=!1,tr=!1,Sn=0;function ze(t){t!==ka&&t.next===null&&(ka===null?Hi=ka=t:ka=ka.next=t),ji=!0,Ps||(Ps=!0,g0())}function xl(t,e){if(!tr&&ji){tr=!0;do for(var n=!1,a=Hi;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var o=a.suspendedLanes,u=a.pingedLanes;i=(1<<31-ce(42|t)+1)-1,i&=l&~(o&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Ad(a,i))}else i=pt,i=Yl(a,a===Dt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||Ya(a,i)||(n=!0,Ad(a,i));a=a.next}while(n);tr=!1}}function h0(){Td()}function Td(){ji=Ps=!1;var t=0;Sn!==0&&T0()&&(t=Sn);for(var e=re(),n=null,a=Hi;a!==null;){var l=a.next,i=Nd(a,e);i===0?(a.next=null,n===null?Hi=l:n.next=l,l===null&&(ka=n)):(n=a,(t!==0||(i&3)!==0)&&(ji=!0)),a=l}Qt!==0&&Qt!==5||xl(t),Sn!==0&&(Sn=0)}function Nd(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var o=31-ce(i),u=1<<o,p=l[o];p===-1?((u&n)===0||(u&a)!==0)&&(l[o]=Gg(u,e)):p<=e&&(t.expiredLanes|=u),i&=~u}if(e=Dt,n=pt,n=Yl(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(Tt===2||Tt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&fo(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||Ya(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&fo(a),mo(n)){case 2:case 8:n=gu;break;case 32:n=jl;break;case 268435456:n=mu;break;default:n=jl}return a=Cd.bind(null,t),n=co(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&fo(a),t.callbackPriority=2,t.callbackNode=null,2}function Cd(t,e){if(Qt!==0&&Qt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Ui()&&t.callbackNode!==n)return null;var a=pt;return a=Yl(t,t===Dt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(sd(t,a,e),Nd(t,re()),t.callbackNode!=null&&t.callbackNode===n?Cd.bind(null,t):null)}function Ad(t,e){if(Ui())return null;sd(t,e,!0)}function g0(){C0(function(){(xt&6)!==0?co(hu,h0):Td()})}function er(){if(Sn===0){var t=ya;t===0&&(t=Bl,Bl<<=1,(Bl&261888)===0&&(Bl=256)),Sn=t}return Sn}function _d(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ql(""+t)}function Md(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function m0(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=_d((l[ee]||null).action),o=a.submitter;o&&(e=(e=o[ee]||null)?_d(e.formAction):o.getAttribute("formAction"),e!==null&&(i=e,o=null));var u=new Fl("action","action",null,a,l);t.push({event:u,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Sn!==0){var p=o?Md(l,o):new FormData(l);Ss(n,{pending:!0,data:p,method:l.method,action:i},null,p)}}else typeof i=="function"&&(u.preventDefault(),p=o?Md(l,o):new FormData(l),Ss(n,{pending:!0,data:p,method:l.method,action:i},i,p))},currentTarget:l}]})}}for(var nr=0;nr<Bo.length;nr++){var ar=Bo[nr],p0=ar.toLowerCase(),y0=ar[0].toUpperCase()+ar.slice(1);_e(p0,"on"+y0)}_e(ic,"onAnimationEnd"),_e(oc,"onAnimationIteration"),_e(sc,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(Om,"onTransitionRun"),_e(zm,"onTransitionStart"),_e(Um,"onTransitionCancel"),_e(rc,"onTransitionEnd"),aa("onMouseEnter",["mouseout","mouseover"]),aa("onMouseLeave",["mouseout","mouseover"]),aa("onPointerEnter",["pointerout","pointerover"]),aa("onPointerLeave",["pointerout","pointerover"]),Rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Rn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var El="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),v0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(El));function Dd(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var o=a.length-1;0<=o;o--){var u=a[o],p=u.instance,T=u.currentTarget;if(u=u.listener,p!==i&&l.isPropagationStopped())break t;i=u,l.currentTarget=T;try{i(l)}catch(D){$l(D)}l.currentTarget=null,i=p}else for(o=0;o<a.length;o++){if(u=a[o],p=u.instance,T=u.currentTarget,u=u.listener,p!==i&&l.isPropagationStopped())break t;i=u,l.currentTarget=T;try{i(l)}catch(D){$l(D)}l.currentTarget=null,i=p}}}}function mt(t,e){var n=e[po];n===void 0&&(n=e[po]=new Set);var a=t+"__bubble";n.has(a)||(Rd(e,t,2,!1),n.add(a))}function lr(t,e,n){var a=0;e&&(a|=4),Rd(n,t,a,e)}var Bi="_reactListening"+Math.random().toString(36).slice(2);function ir(t){if(!t[Bi]){t[Bi]=!0,Eu.forEach(function(n){n!=="selectionchange"&&(v0.has(n)||lr(n,!1,t),lr(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Bi]||(e[Bi]=!0,lr("selectionchange",!1,e))}}function Rd(t,e,n,a){switch(oh(e)){case 2:var l=Z0;break;case 8:l=K0;break;default:l=wr}n=l.bind(null,e,n,t),l=void 0,!No||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function or(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var o=a.tag;if(o===3||o===4){var u=a.stateNode.containerInfo;if(u===l)break;if(o===4)for(o=a.return;o!==null;){var p=o.tag;if((p===3||p===4)&&o.stateNode.containerInfo===l)return;o=o.return}for(;u!==null;){if(o=ta(u),o===null)return;if(p=o.tag,p===5||p===6||p===26||p===27){a=i=o;continue t}u=u.parentNode}}a=a.return}Uu(function(){var T=i,D=Eo(n),z=[];t:{var N=uc.get(t);if(N!==void 0){var A=Fl,$=t;switch(t){case"keypress":if(Kl(n)===0)break t;case"keydown":case"keyup":A=fm;break;case"focusin":$="focus",A=Mo;break;case"focusout":$="blur",A=Mo;break;case"beforeblur":case"afterblur":A=Mo;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":A=Bu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":A=Pg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":A=gm;break;case ic:case oc:case sc:A=nm;break;case rc:A=pm;break;case"scroll":case"scrollend":A=Wg;break;case"wheel":A=vm;break;case"copy":case"cut":case"paste":A=lm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":A=Gu;break;case"toggle":case"beforetoggle":A=wm}var st=(e&4)!==0,Mt=!st&&(t==="scroll"||t==="scrollend"),x=st?N!==null?N+"Capture":null:N;st=[];for(var b=T,E;b!==null;){var O=b;if(E=O.stateNode,O=O.tag,O!==5&&O!==26&&O!==27||E===null||x===null||(O=Qa(b,x),O!=null&&st.push(Tl(b,O,E))),Mt)break;b=b.return}0<st.length&&(N=new A(N,$,null,n,D),z.push({event:N,listeners:st}))}}if((e&7)===0){t:{if(N=t==="mouseover"||t==="pointerover",A=t==="mouseout"||t==="pointerout",N&&n!==xo&&($=n.relatedTarget||n.fromElement)&&(ta($)||$[Pn]))break t;if((A||N)&&(N=D.window===D?D:(N=D.ownerDocument)?N.defaultView||N.parentWindow:window,A?($=n.relatedTarget||n.toElement,A=T,$=$?ta($):null,$!==null&&(Mt=h($),st=$.tag,$!==Mt||st!==5&&st!==27&&st!==6)&&($=null)):(A=null,$=T),A!==$)){if(st=Bu,O="onMouseLeave",x="onMouseEnter",b="mouse",(t==="pointerout"||t==="pointerover")&&(st=Gu,O="onPointerLeave",x="onPointerEnter",b="pointer"),Mt=A==null?N:Xa(A),E=$==null?N:Xa($),N=new st(O,b+"leave",A,n,D),N.target=Mt,N.relatedTarget=E,O=null,ta(D)===T&&(st=new st(x,b+"enter",$,n,D),st.target=E,st.relatedTarget=Mt,O=st),Mt=O,A&&$)e:{for(st=b0,x=A,b=$,E=0,O=x;O;O=st(O))E++;O=0;for(var nt=b;nt;nt=st(nt))O++;for(;0<E-O;)x=st(x),E--;for(;0<O-E;)b=st(b),O--;for(;E--;){if(x===b||b!==null&&x===b.alternate){st=x;break e}x=st(x),b=st(b)}st=null}else st=null;A!==null&&kd(z,N,A,st,!1),$!==null&&Mt!==null&&kd(z,Mt,$,st,!0)}}t:{if(N=T?Xa(T):window,A=N.nodeName&&N.nodeName.toLowerCase(),A==="select"||A==="input"&&N.type==="file")var bt=Iu;else if(Zu(N))if(Fu)bt=Dm;else{bt=_m;var et=Am}else A=N.nodeName,!A||A.toLowerCase()!=="input"||N.type!=="checkbox"&&N.type!=="radio"?T&&So(T.elementType)&&(bt=Iu):bt=Mm;if(bt&&(bt=bt(t,T))){Ku(z,bt,n,D);break t}et&&et(t,N,T),t==="focusout"&&T&&N.type==="number"&&T.memoizedProps.value!=null&&wo(N,"number",N.value)}switch(et=T?Xa(T):window,t){case"focusin":(Zu(et)||et.contentEditable==="true")&&(ua=et,Uo=T,Pa=null);break;case"focusout":Pa=Uo=ua=null;break;case"mousedown":Ho=!0;break;case"contextmenu":case"mouseup":case"dragend":Ho=!1,ac(z,n,D);break;case"selectionchange":if(km)break;case"keydown":case"keyup":ac(z,n,D)}var ft;if(Ro)t:{switch(t){case"compositionstart":var yt="onCompositionStart";break t;case"compositionend":yt="onCompositionEnd";break t;case"compositionupdate":yt="onCompositionUpdate";break t}yt=void 0}else ra?Xu(t,n)&&(yt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(yt="onCompositionStart");yt&&(Yu&&n.locale!=="ko"&&(ra||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&ra&&(ft=Hu()):(ln=D,Co="value"in ln?ln.value:ln.textContent,ra=!0)),et=Li(T,yt),0<et.length&&(yt=new Lu(yt,t,null,n,D),z.push({event:yt,listeners:et}),ft?yt.data=ft:(ft=Qu(n),ft!==null&&(yt.data=ft)))),(ft=xm?Em(t,n):Tm(t,n))&&(yt=Li(T,"onBeforeInput"),0<yt.length&&(et=new Lu("onBeforeInput","beforeinput",null,n,D),z.push({event:et,listeners:yt}),et.data=ft)),m0(z,t,T,n,D)}Dd(z,e)})}function Tl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Li(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Qa(t,n),l!=null&&a.unshift(Tl(t,l,i)),l=Qa(t,e),l!=null&&a.push(Tl(t,l,i))),t.tag===3)return a;t=t.return}return[]}function b0(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function kd(t,e,n,a,l){for(var i=e._reactName,o=[];n!==null&&n!==a;){var u=n,p=u.alternate,T=u.stateNode;if(u=u.tag,p!==null&&p===a)break;u!==5&&u!==26&&u!==27||T===null||(p=T,l?(T=Qa(n,i),T!=null&&o.unshift(Tl(n,T,p))):l||(T=Qa(n,i),T!=null&&o.push(Tl(n,T,p)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var w0=/\r\n?/g,S0=/\u0000|\uFFFD/g;function Od(t){return(typeof t=="string"?t:""+t).replace(w0,`
`).replace(S0,"")}function zd(t,e){return e=Od(e),Od(t)===e}function _t(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||ia(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&ia(t,""+a);break;case"className":Vl(t,"class",a);break;case"tabIndex":Vl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Vl(t,n,a);break;case"style":Ou(t,a,i);break;case"data":if(e!=="object"){Vl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",l.name,l,null),_t(t,e,"formEncType",l.formEncType,l,null),_t(t,e,"formMethod",l.formMethod,l,null),_t(t,e,"formTarget",l.formTarget,l,null)):(_t(t,e,"encType",l.encType,l,null),_t(t,e,"method",l.method,l,null),_t(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=Be);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(s(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(s(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Ql(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":mt("beforetoggle",t),mt("toggle",t),ql(t,"popover",a);break;case"xlinkActuate":je(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":je(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":je(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":je(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":je(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":je(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":je(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":je(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":je(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":ql(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Fg.get(n)||n,ql(t,n,a))}}function sr(t,e,n,a,l,i){switch(n){case"style":Ou(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(s(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(s(60));t.innerHTML=n}}break;case"children":typeof a=="string"?ia(t,a):(typeof a=="number"||typeof a=="bigint")&&ia(t,""+a);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=Be);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Tu.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[ee]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):ql(t,n,a)}}}function $t(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var o=n[i];if(o!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,e));default:_t(t,e,i,o,n,null)}}l&&_t(t,e,"srcSet",n.srcSet,n,null),a&&_t(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var u=i=o=l=null,p=null,T=null;for(a in n)if(n.hasOwnProperty(a)){var D=n[a];if(D!=null)switch(a){case"name":l=D;break;case"type":o=D;break;case"checked":p=D;break;case"defaultChecked":T=D;break;case"value":i=D;break;case"defaultValue":u=D;break;case"children":case"dangerouslySetInnerHTML":if(D!=null)throw Error(s(137,e));break;default:_t(t,e,a,D,n,null)}}Mu(t,i,u,p,T,o,l,!1);return;case"select":mt("invalid",t),a=o=i=null;for(l in n)if(n.hasOwnProperty(l)&&(u=n[l],u!=null))switch(l){case"value":i=u;break;case"defaultValue":o=u;break;case"multiple":a=u;default:_t(t,e,l,u,n,null)}e=i,n=o,t.multiple=!!a,e!=null?la(t,!!a,e,!1):n!=null&&la(t,!!a,n,!0);return;case"textarea":mt("invalid",t),i=l=a=null;for(o in n)if(n.hasOwnProperty(o)&&(u=n[o],u!=null))switch(o){case"value":a=u;break;case"defaultValue":l=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:_t(t,e,o,u,n,null)}Ru(t,a,l,i);return;case"option":for(p in n)if(n.hasOwnProperty(p)&&(a=n[p],a!=null))switch(p){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_t(t,e,p,a,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(a=0;a<El.length;a++)mt(El[a],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(T in n)if(n.hasOwnProperty(T)&&(a=n[T],a!=null))switch(T){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,e));default:_t(t,e,T,a,n,null)}return;default:if(So(e)){for(D in n)n.hasOwnProperty(D)&&(a=n[D],a!==void 0&&sr(t,e,D,a,n,void 0));return}}for(u in n)n.hasOwnProperty(u)&&(a=n[u],a!=null&&_t(t,e,u,a,n,null))}function x0(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,o=null,u=null,p=null,T=null,D=null;for(A in n){var z=n[A];if(n.hasOwnProperty(A)&&z!=null)switch(A){case"checked":break;case"value":break;case"defaultValue":p=z;default:a.hasOwnProperty(A)||_t(t,e,A,null,a,z)}}for(var N in a){var A=a[N];if(z=n[N],a.hasOwnProperty(N)&&(A!=null||z!=null))switch(N){case"type":i=A;break;case"name":l=A;break;case"checked":T=A;break;case"defaultChecked":D=A;break;case"value":o=A;break;case"defaultValue":u=A;break;case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(s(137,e));break;default:A!==z&&_t(t,e,N,A,a,z)}}bo(t,o,u,p,T,D,i,l);return;case"select":A=o=u=N=null;for(i in n)if(p=n[i],n.hasOwnProperty(i)&&p!=null)switch(i){case"value":break;case"multiple":A=p;default:a.hasOwnProperty(i)||_t(t,e,i,null,a,p)}for(l in a)if(i=a[l],p=n[l],a.hasOwnProperty(l)&&(i!=null||p!=null))switch(l){case"value":N=i;break;case"defaultValue":u=i;break;case"multiple":o=i;default:i!==p&&_t(t,e,l,i,a,p)}e=u,n=o,a=A,N!=null?la(t,!!n,N,!1):!!a!=!!n&&(e!=null?la(t,!!n,e,!0):la(t,!!n,n?[]:"",!1));return;case"textarea":A=N=null;for(u in n)if(l=n[u],n.hasOwnProperty(u)&&l!=null&&!a.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:_t(t,e,u,null,a,l)}for(o in a)if(l=a[o],i=n[o],a.hasOwnProperty(o)&&(l!=null||i!=null))switch(o){case"value":N=l;break;case"defaultValue":A=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(s(91));break;default:l!==i&&_t(t,e,o,l,a,i)}Du(t,N,A);return;case"option":for(var $ in n)if(N=n[$],n.hasOwnProperty($)&&N!=null&&!a.hasOwnProperty($))switch($){case"selected":t.selected=!1;break;default:_t(t,e,$,null,a,N)}for(p in a)if(N=a[p],A=n[p],a.hasOwnProperty(p)&&N!==A&&(N!=null||A!=null))switch(p){case"selected":t.selected=N&&typeof N!="function"&&typeof N!="symbol";break;default:_t(t,e,p,N,a,A)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var st in n)N=n[st],n.hasOwnProperty(st)&&N!=null&&!a.hasOwnProperty(st)&&_t(t,e,st,null,a,N);for(T in a)if(N=a[T],A=n[T],a.hasOwnProperty(T)&&N!==A&&(N!=null||A!=null))switch(T){case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(s(137,e));break;default:_t(t,e,T,N,a,A)}return;default:if(So(e)){for(var Mt in n)N=n[Mt],n.hasOwnProperty(Mt)&&N!==void 0&&!a.hasOwnProperty(Mt)&&sr(t,e,Mt,void 0,a,N);for(D in a)N=a[D],A=n[D],!a.hasOwnProperty(D)||N===A||N===void 0&&A===void 0||sr(t,e,D,N,a,A);return}}for(var x in n)N=n[x],n.hasOwnProperty(x)&&N!=null&&!a.hasOwnProperty(x)&&_t(t,e,x,null,a,N);for(z in a)N=a[z],A=n[z],!a.hasOwnProperty(z)||N===A||N==null&&A==null||_t(t,e,z,N,a,A)}function Ud(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function E0(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,o=l.initiatorType,u=l.duration;if(i&&u&&Ud(o)){for(o=0,u=l.responseEnd,a+=1;a<n.length;a++){var p=n[a],T=p.startTime;if(T>u)break;var D=p.transferSize,z=p.initiatorType;D&&Ud(z)&&(p=p.responseEnd,o+=D*(p<u?1:(u-T)/(p-T)))}if(--a,e+=8*(i+o)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var rr=null,ur=null;function Gi(t){return t.nodeType===9?t:t.ownerDocument}function Hd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function jd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function cr(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var fr=null;function T0(){var t=window.event;return t&&t.type==="popstate"?t===fr?!1:(fr=t,!0):(fr=null,!1)}var Bd=typeof setTimeout=="function"?setTimeout:void 0,N0=typeof clearTimeout=="function"?clearTimeout:void 0,Ld=typeof Promise=="function"?Promise:void 0,C0=typeof queueMicrotask=="function"?queueMicrotask:typeof Ld<"u"?function(t){return Ld.resolve(null).then(t).catch(A0)}:Bd;function A0(t){setTimeout(function(){throw t})}function xn(t){return t==="head"}function Gd(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),Ha(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Nl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Nl(n);for(var i=n.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[Va]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=o}}else n==="body"&&Nl(t.ownerDocument.body);n=l}while(n);Ha(e)}function Yd(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function dr(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":dr(n),yo(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function _0(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[Va])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ce(t.nextSibling),t===null)break}return null}function M0(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ce(t.nextSibling),t===null))return null;return t}function qd(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ce(t.nextSibling),t===null))return null;return t}function hr(t){return t.data==="$?"||t.data==="$~"}function gr(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function D0(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ce(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var mr=null;function Vd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ce(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Xd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Qd(t,e,n){switch(e=Gi(n),t){case"html":if(t=e.documentElement,!t)throw Error(s(452));return t;case"head":if(t=e.head,!t)throw Error(s(453));return t;case"body":if(t=e.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Nl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);yo(t)}var Ae=new Map,Zd=new Set;function Yi(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=K.d;K.d={f:R0,r:k0,D:O0,C:z0,L:U0,m:H0,X:B0,S:j0,M:L0};function R0(){var t=tn.f(),e=ki();return t||e}function k0(t){var e=ea(t);e!==null&&e.tag===5&&e.type==="form"?uf(e):tn.r(t)}var Oa=typeof document>"u"?null:document;function Kd(t,e,n){var a=Oa;if(a&&typeof e=="string"&&e){var l=be(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),Zd.has(l)||(Zd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),$t(e,"link",t),Zt(e),a.head.appendChild(e)))}}function O0(t){tn.D(t),Kd("dns-prefetch",t,null)}function z0(t,e){tn.C(t,e),Kd("preconnect",t,e)}function U0(t,e,n){tn.L(t,e,n);var a=Oa;if(a&&t&&e){var l='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+be(n.imageSizes)+'"]')):l+='[href="'+be(t)+'"]';var i=l;switch(e){case"style":i=za(t);break;case"script":i=Ua(t)}Ae.has(i)||(t=k({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ae.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(Cl(i))||e==="script"&&a.querySelector(Al(i))||(e=a.createElement("link"),$t(e,"link",t),Zt(e),a.head.appendChild(e)))}}function H0(t,e){tn.m(t,e);var n=Oa;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ua(t)}if(!Ae.has(i)&&(t=k({rel:"modulepreload",href:t},e),Ae.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Al(i)))return}a=n.createElement("link"),$t(a,"link",t),Zt(a),n.head.appendChild(a)}}}function j0(t,e,n){tn.S(t,e,n);var a=Oa;if(a&&t){var l=na(a).hoistableStyles,i=za(t);e=e||"default";var o=l.get(i);if(!o){var u={loading:0,preload:null};if(o=a.querySelector(Cl(i)))u.loading=5;else{t=k({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ae.get(i))&&pr(t,n);var p=o=a.createElement("link");Zt(p),$t(p,"link",t),p._p=new Promise(function(T,D){p.onload=T,p.onerror=D}),p.addEventListener("load",function(){u.loading|=1}),p.addEventListener("error",function(){u.loading|=2}),u.loading|=4,qi(o,e,a)}o={type:"stylesheet",instance:o,count:1,state:u},l.set(i,o)}}}function B0(t,e){tn.X(t,e);var n=Oa;if(n&&t){var a=na(n).hoistableScripts,l=Ua(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=k({src:t,async:!0},e),(e=Ae.get(l))&&yr(t,e),i=n.createElement("script"),Zt(i),$t(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function L0(t,e){tn.M(t,e);var n=Oa;if(n&&t){var a=na(n).hoistableScripts,l=Ua(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=k({src:t,async:!0,type:"module"},e),(e=Ae.get(l))&&yr(t,e),i=n.createElement("script"),Zt(i),$t(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Id(t,e,n,a){var l=(l=dt.current)?Yi(l):null;if(!l)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=za(n.href),n=na(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=za(n.href);var i=na(l).hoistableStyles,o=i.get(t);if(o||(l=l.ownerDocument||l,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,o),(i=l.querySelector(Cl(t)))&&!i._p&&(o.instance=i,o.state.loading=5),Ae.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ae.set(t,n),i||G0(l,t,n,o.state))),e&&a===null)throw Error(s(528,""));return o}if(e&&a!==null)throw Error(s(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ua(n),n=na(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function za(t){return'href="'+be(t)+'"'}function Cl(t){return'link[rel="stylesheet"]['+t+"]"}function Fd(t){return k({},t,{"data-precedence":t.precedence,precedence:null})}function G0(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),$t(e,"link",n),Zt(e),t.head.appendChild(e))}function Ua(t){return'[src="'+be(t)+'"]'}function Al(t){return"script[async]"+t}function Jd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Zt(a),a;var l=k({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Zt(a),$t(a,"style",l),qi(a,n.precedence,t),e.instance=a;case"stylesheet":l=za(n.href);var i=t.querySelector(Cl(l));if(i)return e.state.loading|=4,e.instance=i,Zt(i),i;a=Fd(n),(l=Ae.get(l))&&pr(a,l),i=(t.ownerDocument||t).createElement("link"),Zt(i);var o=i;return o._p=new Promise(function(u,p){o.onload=u,o.onerror=p}),$t(i,"link",a),e.state.loading|=4,qi(i,n.precedence,t),e.instance=i;case"script":return i=Ua(n.src),(l=t.querySelector(Al(i)))?(e.instance=l,Zt(l),l):(a=n,(l=Ae.get(i))&&(a=k({},n),yr(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Zt(l),$t(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(s(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,qi(a,n.precedence,t));return e.instance}function qi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,o=0;o<a.length;o++){var u=a[o];if(u.dataset.precedence===e)i=u;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function pr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function yr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Vi=null;function Wd(t,e,n){if(Vi===null){var a=new Map,l=Vi=new Map;l.set(n,a)}else l=Vi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[Va]||i[It]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(e)||"";o=t+o;var u=a.get(o);u?u.push(i):a.set(o,[i])}}return a}function $d(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function Y0(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Pd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function q0(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=za(a.href),i=e.querySelector(Cl(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Xi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Zt(i);return}i=e.ownerDocument||e,a=Fd(a),(l=Ae.get(l))&&pr(a,l),i=i.createElement("link"),Zt(i);var o=i;o._p=new Promise(function(u,p){o.onload=u,o.onerror=p}),$t(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Xi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var vr=0;function V0(t,e){return t.stylesheets&&t.count===0&&Zi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Zi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&vr===0&&(vr=62500*E0());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Zi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>vr?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Xi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Zi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Qi=null;function Zi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Qi=new Map,e.forEach(X0,t),Qi=null,Xi.call(t))}function X0(t,e){if(!(e.state.loading&4)){var n=Qi.get(t);if(n)var a=n.get(null);else{n=new Map,Qi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var o=l[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(n.set(o.dataset.precedence,o),a=o)}a&&n.set(null,a)}l=e.instance,o=l.getAttribute("data-precedence"),i=n.get(o)||a,i===a&&n.set(null,l),n.set(o,l),this.count++,a=Xi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var _l={$$typeof:C,Provider:null,Consumer:null,_currentValue:ot,_currentValue2:ot,_threadCount:0};function Q0(t,e,n,a,l,i,o,u,p){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ho(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ho(0),this.hiddenUpdates=ho(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=p,this.incompleteTransitions=new Map}function th(t,e,n,a,l,i,o,u,p,T,D,z){return t=new Q0(t,e,n,o,p,T,D,z,u),e=1,i===!0&&(e|=24),i=de(3,null,null,e),t.current=i,i.stateNode=t,e=Wo(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},es(i),t}function eh(t){return t?(t=da,t):da}function nh(t,e,n,a,l,i){l=eh(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(se(n,t,e),ol(n,t,e))}function ah(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function br(t,e){ah(t,e),(t=t.alternate)&&ah(t,e)}function lh(t){if(t.tag===13||t.tag===31){var e=Un(t,67108864);e!==null&&se(e,t,67108864),br(t,67108864)}}function ih(t){if(t.tag===13||t.tag===31){var e=ye();e=go(e);var n=Un(t,e);n!==null&&se(n,t,e),br(t,e)}}var Ki=!0;function Z0(t,e,n,a){var l=M.T;M.T=null;var i=K.p;try{K.p=2,wr(t,e,n,a)}finally{K.p=i,M.T=l}}function K0(t,e,n,a){var l=M.T;M.T=null;var i=K.p;try{K.p=8,wr(t,e,n,a)}finally{K.p=i,M.T=l}}function wr(t,e,n,a){if(Ki){var l=Sr(a);if(l===null)or(t,e,a,Ii,n),sh(t,a);else if(F0(l,t,e,n,a))a.stopPropagation();else if(sh(t,a),e&4&&-1<I0.indexOf(t)){for(;l!==null;){var i=ea(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=Dn(i.pendingLanes);if(o!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;o;){var p=1<<31-ce(o);u.entanglements[1]|=p,o&=~p}ze(i),(xt&6)===0&&(Di=re()+500,xl(0))}}break;case 31:case 13:u=Un(i,2),u!==null&&se(u,i,2),ki(),br(i,2)}if(i=Sr(a),i===null&&or(t,e,a,Ii,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else or(t,e,a,null,n)}}function Sr(t){return t=Eo(t),xr(t)}var Ii=null;function xr(t){if(Ii=null,t=ta(t),t!==null){var e=h(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=y(e),t!==null)return t;t=null}else if(n===31){if(t=S(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ii=t,null}function oh(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Og()){case hu:return 2;case gu:return 8;case jl:case zg:return 32;case mu:return 268435456;default:return 32}default:return 32}}var Er=!1,En=null,Tn=null,Nn=null,Ml=new Map,Dl=new Map,Cn=[],I0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function sh(t,e){switch(t){case"focusin":case"focusout":En=null;break;case"dragenter":case"dragleave":Tn=null;break;case"mouseover":case"mouseout":Nn=null;break;case"pointerover":case"pointerout":Ml.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Dl.delete(e.pointerId)}}function Rl(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=ea(e),e!==null&&lh(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function F0(t,e,n,a,l){switch(e){case"focusin":return En=Rl(En,t,e,n,a,l),!0;case"dragenter":return Tn=Rl(Tn,t,e,n,a,l),!0;case"mouseover":return Nn=Rl(Nn,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return Ml.set(i,Rl(Ml.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Dl.set(i,Rl(Dl.get(i)||null,t,e,n,a,l)),!0}return!1}function rh(t){var e=ta(t.target);if(e!==null){var n=h(e);if(n!==null){if(e=n.tag,e===13){if(e=y(n),e!==null){t.blockedOn=e,Su(t.priority,function(){ih(n)});return}}else if(e===31){if(e=S(n),e!==null){t.blockedOn=e,Su(t.priority,function(){ih(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Fi(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Sr(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);xo=a,n.target.dispatchEvent(a),xo=null}else return e=ea(n),e!==null&&lh(e),t.blockedOn=n,!1;e.shift()}return!0}function uh(t,e,n){Fi(t)&&n.delete(e)}function J0(){Er=!1,En!==null&&Fi(En)&&(En=null),Tn!==null&&Fi(Tn)&&(Tn=null),Nn!==null&&Fi(Nn)&&(Nn=null),Ml.forEach(uh),Dl.forEach(uh)}function Ji(t,e){t.blockedOn===e&&(t.blockedOn=null,Er||(Er=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,J0)))}var Wi=null;function ch(t){Wi!==t&&(Wi=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Wi===t&&(Wi=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(xr(a||n)===null)continue;break}var i=ea(n);i!==null&&(t.splice(e,3),e-=3,Ss(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function Ha(t){function e(p){return Ji(p,t)}En!==null&&Ji(En,t),Tn!==null&&Ji(Tn,t),Nn!==null&&Ji(Nn,t),Ml.forEach(e),Dl.forEach(e);for(var n=0;n<Cn.length;n++){var a=Cn[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)rh(n),n.blockedOn===null&&Cn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],o=l[ee]||null;if(typeof i=="function")o||ch(n);else if(o){var u=null;if(i&&i.hasAttribute("formAction")){if(l=i,o=i[ee]||null)u=o.formAction;else if(xr(l)!==null)continue}else u=o.action;typeof u=="function"?n[a+1]=u:(n.splice(a,3),a-=3),ch(n)}}}function fh(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return l=o})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function Tr(t){this._internalRoot=t}$i.prototype.render=Tr.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(s(409));var n=e.current,a=ye();nh(n,a,t,e,null,null)},$i.prototype.unmount=Tr.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;nh(t.current,2,null,t,null,null),ki(),e[Pn]=null}};function $i(t){this._internalRoot=t}$i.prototype.unstable_scheduleHydration=function(t){if(t){var e=wu();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Cn.length&&e!==0&&e<Cn[n].priority;n++);Cn.splice(n,0,t),n===0&&rh(t)}};var dh=c.version;if(dh!=="19.2.6")throw Error(s(527,dh,"19.2.6"));K.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=v(e),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var W0={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:M,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Pi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Pi.isDisabled&&Pi.supportsFiber)try{Ga=Pi.inject(W0),ue=Pi}catch{}}return Ol.createRoot=function(t,e){if(!f(t))throw Error(s(299));var n=!1,a="",l=bf,i=wf,o=Sf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(o=e.onRecoverableError)),e=th(t,1,!1,null,null,n,a,null,l,i,o,fh),t[Pn]=e.current,ir(t),new Tr(e)},Ol.hydrateRoot=function(t,e,n){if(!f(t))throw Error(s(299));var a=!1,l="",i=bf,o=wf,u=Sf,p=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(o=n.onCaughtError),n.onRecoverableError!==void 0&&(u=n.onRecoverableError),n.formState!==void 0&&(p=n.formState)),e=th(t,1,!0,e,n??null,a,l,p,i,o,u,fh),e.context=eh(null),n=e.current,a=ye(),a=go(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,qa(e,n),ze(e),t[Pn]=e.current,ir(t),new $i(e)},Ol.version="19.2.6",Ol}var xh;function rp(){if(xh)return Ar.exports;xh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(c){console.error(c)}}return r(),Ar.exports=sp(),Ar.exports}var up=rp();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cp=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),hg=(...r)=>r.filter((c,d,s)=>!!c&&c.trim()!==""&&s.indexOf(c)===d).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var fp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dp=lt.forwardRef(({color:r="currentColor",size:c=24,strokeWidth:d=2,absoluteStrokeWidth:s,className:f="",children:h,iconNode:y,...S},m)=>lt.createElement("svg",{ref:m,...fp,width:c,height:c,stroke:r,strokeWidth:s?Number(d)*24/Number(c):d,className:hg("lucide",f),...S},[...y.map(([v,_])=>lt.createElement(v,_)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=(r,c)=>{const d=lt.forwardRef(({className:s,...f},h)=>lt.createElement(dp,{ref:h,iconNode:c,className:hg(`lucide-${cp(r)}`,s),...f}));return d.displayName=`${r}`,d};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gg=Lt("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const io=Lt("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=Lt("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pg=Lt("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hp=Lt("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yg=Lt("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gp=Lt("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vg=Lt("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mp=Lt("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pp=Lt("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yp=Lt("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vp=Lt("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bp=Lt("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wp=Lt("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=Lt("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xp=Lt("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ep=Lt("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tp=Lt("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Np=Lt("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cp=Lt("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ao=Lt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function lo({group:r,size:c="md",dim:d}){const s=c==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return g.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${r.bgClass} ${r.textClass} ${s} ${d?"opacity-40":""}`,children:r.label})}const ja=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Eh=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function bg(r){if(r.length===0)return"";const c=[...r].sort((_,k)=>_.date.localeCompare(k.date)),d=c[0].date,s=c[c.length-1].date,[f,h,y]=d.split("-").map(Number),[S,m,v]=s.split("-").map(Number);return d===s?`${ja[h-1]} ${y}, ${f}`:f===S&&h===m?`${ja[h-1]} ${y}–${v}, ${f}`:f===S?`${ja[h-1]} ${y} – ${ja[m-1]} ${v}, ${f}`:`${ja[h-1]} ${y}, ${f} – ${ja[m-1]} ${v}, ${S}`}function Ap(r){if(r.length===0)return"";const c=[...r].sort((B,X)=>B.date.localeCompare(X.date)),d=c[0].date,s=c[c.length-1].date,[f,h,y]=d.split("-").map(Number),[S,m,v]=s.split("-").map(Number),_=Eh[new Date(f,h-1,y).getDay()],k=bg(r);if(d===s)return`${k} (${_})`;const H=Eh[new Date(S,m-1,v).getDay()];return`${k} (${_}–${H})`}function ou(r){return r.subtitle??bg(r.days)}function en(r){const[c,d]=r.split(":").map(Number);return c*60+d}const _p=30;function Mp(r,c){let d=-1;for(let S=0;S<r.length&&en(r[S])<=c;S++)d=S;if(d===-1)return{index:-1,progress:0};const s=en(r[d]),f=r[d+1]?en(r[d+1]):null,h=f!==null?f:s+_p;if(c>=h)return{index:-1,progress:0};const y=h===s?0:(c-s)/(h-s);return{index:d,progress:Math.max(0,Math.min(1,y))}}function wg(r){const[c,d]=r.split(":").map(Number);return`${c%12||12}:${d.toString().padStart(2,"0")}`}function Sg(r){const[c]=r.split(":").map(Number);return c>=12?"PM":"AM"}function su(){const r=new Date;return r.getHours()*60+r.getMinutes()}function Jn(){const r=new Date,c=r.getFullYear(),d=String(r.getMonth()+1).padStart(2,"0"),s=String(r.getDate()).padStart(2,"0");return`${c}-${d}-${s}`}function Dp(){const r=new Date,c=r.getHours(),d=r.getMinutes(),s=c%12||12,f=c>=12?"PM":"AM";return`${s}:${d.toString().padStart(2,"0")} ${f}`}function Rp(r){if(r<=0)return"";if(r<60)return`${r} min`;const c=Math.floor(r/60),d=r%60;return d===0?`${c}h`:`${c}h ${d}m`}function kp(r){const c=new Date(r);if(isNaN(c.getTime()))return r;const d=c.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),s=c.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${d}, ${s}`}function Th(r,c){return r.flatMap(d=>{const s=c.find(f=>f.id===d);return s?[s]:[]})}function Op({activity:r,runGroups:c,past:d}){const s=Th(r.onTrack,c),f=Th(r.inClass??[],c);return g.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${d?"opacity-60":""}`,children:g.jsxs("div",{className:"flex gap-4",children:[g.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[wg(r.time),g.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:Sg(r.time)})]}),g.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[s.length>0&&g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),g.jsx("div",{className:"flex flex-wrap gap-1.5",children:s.map(h=>g.jsx(lo,{group:h},h.id))})]}),f.length>0&&g.jsxs(g.Fragment,{children:[s.length>0&&g.jsx("div",{className:"border-t border-gray-100"}),g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),g.jsx("div",{className:"flex flex-wrap gap-1.5",children:f.map(h=>g.jsx(lo,{group:h},h.id))})]})]}),r.note&&g.jsx("p",{className:"text-xs italic text-gray-500",children:r.note})]})]})})}function zp({activity:r,past:c}){const d=r.type==="lunch"||r.type==="special";return g.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${d?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${c?"opacity-60":""}`,children:g.jsxs("div",{className:"flex items-center gap-4",children:[g.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[wg(r.time),g.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:Sg(r.time)})]}),d&&g.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:r.type==="lunch"?g.jsx(Cp,{size:16}):g.jsx(xp,{size:16})}),g.jsxs("div",{children:[g.jsx("p",{className:"text-sm font-medium text-gray-900",children:r.label}),r.subtitle&&g.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:r.subtitle})]})]})})}const au=lt.forwardRef(({activities:r},c)=>{const[,d]=lt.useState(0);lt.useEffect(()=>{const m=setInterval(()=>d(v=>v+1),3e4);return()=>clearInterval(m)},[]);const s=su(),h=r.filter(m=>"time"in m).find(m=>en(m.time)>s),y=h?en(h.time)-s:null,S=y!==null?y<=5?"text-red-500":y<=10?"text-orange-500":"text-gray-400":"text-gray-400";return g.jsxs("div",{ref:c,"data-time-indicator":!0,className:"relative my-6",children:[g.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[g.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),g.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),g.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:Dp()}),y!==null&&g.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${S}`,children:["Next activity starts in ",g.jsx("span",{className:"font-semibold",children:Rp(y)})]})]})});au.displayName="TimeIndicator";function Nh({collapsed:r,children:c}){return g.jsx("div",{"data-collapsed":r,"aria-hidden":r,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:r?"0fr":"1fr",opacity:r?0:1,marginBottom:r?0:"0.5rem"},children:g.jsx("div",{className:"overflow-hidden",children:c})})}function Up({activities:r,runGroups:c,isToday:d,selectedGroups:s,hidePast:f}){const h=lt.useRef(null),[,y]=lt.useState(0);lt.useEffect(()=>{if(!d)return;const R=setInterval(()=>y(C=>C+1),6e4);return()=>clearInterval(R)},[d]),lt.useEffect(()=>{if(!d)return;const R=setTimeout(()=>{var C;(C=h.current)==null||C.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(R)},[d]);const S=su(),m=r.flatMap(R=>{if(R.type!=="session")return[R];if(s.length===0)return[R];const C=R.onTrack.filter(at=>s.includes(at)),G=(R.inClass??[]).filter(at=>s.includes(at));return C.length===0&&G.length===0?[]:[{...R,onTrack:C,inClass:G}]}),v=m.map(R=>R.type!=="break"&&f&&d&&en(R.time)<S);m.forEach((R,C)=>{if(R.type!=="break")return;const G=m.slice(0,C).some((at,q)=>at.type!=="break"&&!v[q]);v[C]=!G});const _=[],k=[];m.forEach((R,C)=>{R.type!=="break"&&(_.push(C),k.push(R.time))});const{index:H}=d?Mp(k,S):{index:-1},B=H===-1?-1:_[H],X=d?m.findIndex(R=>R.type!=="break"&&en(R.time)>S):-1,I=d&&X===-1&&m.length>0,F=m.length>0&&v.every(Boolean);let L;return g.jsxs("div",{className:"flex flex-col pb-10",children:[m.length>0&&g.jsx(Nh,{collapsed:!F,children:g.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[g.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),g.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),m.map((R,C)=>{const G=C===B,at=d&&R.type!=="break"&&!G&&en(R.time)<S;let q=null;!v[C]&&R.type==="session"&&R.sessionNumber!==void 0&&R.sessionNumber!==L&&(L=R.sessionNumber,q=g.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",R.sessionNumber]}));const j=R.type==="break"?g.jsxs("div",{className:"flex items-center gap-2 py-1",children:[g.jsx("div",{className:"h-px flex-1 bg-gray-200"}),g.jsx("span",{className:"text-xs text-gray-400 italic",children:R.label}),g.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):R.type==="session"?g.jsx(Op,{activity:R,runGroups:c,past:at}):g.jsx(zp,{activity:R,past:at});return g.jsxs(Nh,{collapsed:v[C],children:[C===X&&g.jsx(au,{ref:h,activities:m}),q,j]},C)}),I&&g.jsx(au,{ref:h,activities:m})]})}function Hp({groups:r,selected:c,onChange:d}){const[s,f]=lt.useState(!1),h=m=>d(c.includes(m)?c.filter(v=>v!==m):[...c,m]),y=c.length===0||c.length===r.length,S=r.filter(m=>c.includes(m.id));return g.jsxs("div",{className:"relative",children:[g.jsxs("button",{onClick:()=>f(m=>!m),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[y?g.jsx("span",{className:"text-gray-700",children:"All run groups"}):g.jsx("div",{className:"flex items-center gap-1",children:S.map(m=>g.jsx(lo,{group:m,size:"sm"},m.id))}),g.jsx(mg,{size:14,className:"text-gray-400"})]}),s&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>f(!1)}),g.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[r.map(m=>g.jsxs("button",{onClick:()=>h(m.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[g.jsx(lo,{group:m,size:"md"}),c.includes(m.id)&&g.jsx(io,{size:14,className:"text-blue-500"})]},m.id)),g.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:g.jsx("button",{onClick:()=>{d([]),f(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:y?"All selected":"Clear filter"})})]})]})]})}function to(r){return r.days.reduce((c,d)=>d.date<c?d.date:c,r.days[0].date)}function Ch(r){return r.days.reduce((c,d)=>d.date>c?d.date:c,r.days[0].date)}function xg(r,c=Jn()){return r.days.some(d=>d.date===c)?"live":r.days.every(d=>d.date>c)?"upcoming":"past"}function ru(r,c=Jn()){const d=[],s=[],f=[];for(const h of r){const y=xg(h,c);y==="live"?d.push(h):y==="upcoming"?s.push(h):f.push(h)}return d.sort((h,y)=>to(h).localeCompare(to(y))),s.sort((h,y)=>to(h).localeCompare(to(y))),f.sort((h,y)=>Ch(y).localeCompare(Ch(h))),{live:d,upcoming:s,past:f}}function Eg(){return g.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[g.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function Rr({event:r,active:c,isLive:d,onClick:s}){return g.jsxs("button",{onClick:s,className:`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left ${c?"bg-blue-50":"hover:bg-gray-50"}`,children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-1.5",children:[g.jsx("span",{className:"text-sm font-semibold text-gray-900",children:r.name}),d&&g.jsx(Eg,{})]}),g.jsx("div",{className:"text-xs text-gray-400",children:ou(r)})]}),c&&g.jsx(io,{size:14,className:"text-blue-500 ml-3 shrink-0"})]})}function kr({label:r}){return g.jsx("div",{className:"px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400",children:r})}function jp({events:r,active:c,onChange:d,onGoHome:s}){const[f,h]=lt.useState(!1),{live:y,upcoming:S,past:m}=ru(r),v=xg(c)==="live";return g.jsxs("div",{className:"relative min-w-0 pl-1",children:[g.jsxs("button",{onClick:()=>h(_=>!_),className:"flex items-center gap-1 text-left group min-w-0",children:[g.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:c.name}),v&&g.jsx(Eg,{}),g.jsx(mg,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),g.jsx("p",{className:"text-sm text-gray-500",children:ou(c)}),f&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>h(!1)}),g.jsxs("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[240px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[g.jsxs("button",{onClick:()=>{s(),h(!1)},className:"flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left hover:bg-gray-50",children:[g.jsx(vg,{size:14,className:"text-gray-500"}),g.jsx("span",{className:"text-sm font-semibold text-gray-900",children:"Home"})]}),y.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(kr,{label:"Live"}),y.map(_=>g.jsx(Rr,{event:_,active:_.id===c.id,isLive:!0,onClick:()=>{d(_),h(!1)}},_.id))]}),S.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(kr,{label:"Upcoming"}),S.map(_=>g.jsx(Rr,{event:_,active:_.id===c.id,isLive:!1,onClick:()=>{d(_),h(!1)}},_.id))]}),m.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(kr,{label:"Past"}),m.map(_=>g.jsx(Rr,{event:_,active:_.id===c.id,isLive:!1,onClick:()=>{d(_),h(!1)}},_.id))]})]})]})]})}function Bp({checked:r,onChange:c,label:d}){return g.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[d&&g.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:d}),g.jsx("button",{type:"button",role:"switch","aria-checked":r,onClick:c,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:r?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:g.jsx("span",{style:{position:"absolute",top:"2px",left:r?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const In=72,Lp=110;function Ah({children:r,disabled:c,scrollContainerRef:d}){const[s,f]=lt.useState(0),[h,y]=lt.useState("idle"),S=lt.useRef(null),m=lt.useRef(0);lt.useEffect(()=>{if(c)return;const H=()=>{const F=d==null?void 0:d.current;return F?F.scrollTop:window.scrollY},B=F=>{H()===0&&(S.current=F.touches[0].clientY)},X=F=>{if(S.current===null)return;const L=F.touches[0].clientY-S.current;if(L<=0){S.current=null;return}F.preventDefault();const R=L<In?L:In+(L-In)*.25;m.current=Math.min(R,Lp),f(m.current),y("pulling")},I=()=>{S.current!==null&&(S.current=null,m.current>=In?(y("refreshing"),f(In*.75),setTimeout(()=>window.location.reload(),600)):(y("releasing"),f(0),m.current=0,setTimeout(()=>y("idle"),250)))};return document.addEventListener("touchstart",B,{passive:!0}),document.addEventListener("touchmove",X,{passive:!1}),document.addEventListener("touchend",I),document.addEventListener("touchcancel",I),()=>{document.removeEventListener("touchstart",B),document.removeEventListener("touchmove",X),document.removeEventListener("touchend",I),document.removeEventListener("touchcancel",I)}},[c,d]);const v=h==="releasing"||h==="refreshing",_=Math.min(s/In,1),k=s>=In;return g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${s}px)`,transition:v?"transform 0.25s ease":"none"},children:g.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${k?"text-blue-500":"text-gray-400"}`,children:g.jsx(Ep,{size:16,className:h==="refreshing"?"animate-spin":"",style:h!=="refreshing"?{transform:`rotate(${_*270}deg)`}:void 0})})}),g.jsx("div",{style:{transform:`translateY(${s}px)`,transition:v?"transform 0.25s ease":"none"},children:r})]})}function Gp({groups:r}){const c=r.filter(d=>d.description);return c.length===0?null:g.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[g.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),g.jsx("ul",{className:"flex flex-col gap-1.5",children:c.map(d=>g.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[g.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${d.bgClass}`,"aria-hidden":"true"}),g.jsx("span",{className:"font-medium text-gray-900",children:d.label}),g.jsx("span",{className:"text-gray-400",children:"·"}),g.jsx("span",{children:d.description})]},d.id))})]})}const _h=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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

const COUNTDOWN_TOKENS = {
  small: {
    cardPad: 8, titleFont: 14, rowGap: 4, rowSpacing: 5, rowFont: 10, rowIconSize: 11,
    wellPadV: 6, wellPadH: 8, unitGap: 3, unitFont: 22, unitLabelFont: 7, dividerH: 16,
  },
  regular: {
    cardPad: 8, titleFont: 15, rowGap: 6, rowSpacing: 6, rowFont: 11, rowIconSize: 12,
    wellPadV: 8, wellPadH: 10, unitGap: 4, unitFont: 26, unitLabelFont: 8, dividerH: 18,
  },
  rich: {
    cardPad: 14, titleFont: 18, rowGap: 10, rowSpacing: 8, rowFont: 13, rowIconSize: 14,
    wellPadV: 8, wellPadH: 16, unitGap: 6, unitFont: 40, unitLabelFont: 10, dividerH: 28,
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
// Kept in sync with renderUpcomingHeader's actual spacer heights so
// renderCountdownState's card-height math reserves the right amount.
const UPCOMING_HEADER_RESERVE_LARGE = COUNTDOWN_BADGE_SIZE + 16
const UPCOMING_HEADER_RESERVE_COMPACT = 30

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
    badge.centerAlignContent()
    addUpcomingHeaderIcon(badge, p, UPCOMING_HEADER_BADGE_ICON_SIZE)

    const col = row.addStack()
    col.layoutVertically()
    const title = col.addText("Upcoming HPDE events")
    title.font = rBoldFont(20)
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
  w.addSpacer(isLarge ? 16 : 10)
}

// One or two countdown cards (Medium always gets one; Large can stack
// two), plus a "N more upcoming" footer for whatever didn't fit —
// same convention as drawMoreActivitiesFooter for a day's activities.
function renderCountdownState(w, p, stale, upcoming, parsed, notifStatus) {
  const { items, total } = upcoming
  const family = config.widgetFamily || "medium"
  const isLarge = family === "large" || family === "extraLarge"
  // Small's card is already fighting its vertical budget just to fit
  // the title + 3 rows + full-width well (see drawCountdownCard) — a
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

  // Only reserve room for drawStatusFooter (called separately, right
  // after this returns) when it's actually going to render something —
  // otherwise the reserve is dead space with nothing sitting in it,
  // pushing the card (and the "more upcoming" footer under it) further
  // from the bottom edge than they need to be.
  const hasStatusFooter = statusFooterBits(stale, parsed, notifStatus).length > 0
  const headerReserve = isLarge ? UPCOMING_HEADER_RESERVE_LARGE : UPCOMING_HEADER_RESERVE_COMPACT
  const reserve = headerReserve
    + (hasStatusFooter ? COUNTDOWN_FOOTER_RESERVE : 0)
    + (showMoreFooter ? MORE_UPCOMING_FOOTER_RESERVE : 0)
  const availableH = widgetInteriorHeight() - reserve
  const cardHeight = (availableH - COUNTDOWN_CARD_GAP * (items.length - 1)) / items.length

  for (let i = 0; i < items.length; i++) {
    if (i > 0) w.addSpacer(COUNTDOWN_CARD_GAP)
    drawCountdownCard(w, p, items[i], rich, cardHeight, family)
  }

  if (showMoreFooter) {
    w.addSpacer(6)
    drawMoreUpcomingFooter(w, p, remaining)
  }
}

function drawCountdownCard(w, p, next, rich, cardHeight, family) {
  // Small has no room to put the well beside the info column (see
  // Next-HPDE mockup: 3 info rows already fill the card's width) —
  // the well drops below the rows instead and stretches full-width.
  const isSmall = family === "small"
  const t = COUNTDOWN_TOKENS[countdownTier(rich, isSmall)]

  const outer = w.addStack()
  outer.addSpacer(COUNTDOWN_MARGIN)

  const card = outer.addStack()
  if (isSmall) card.layoutVertically()
  else card.centerAlignContent()
  // Explicit height instead of letting the card wrap its own (short)
  // content — cardHeight already accounts for the widget's own
  // top/bottom padding and however many cards + footers are sharing
  // the interior, so this fills its share instead of leaving dead
  // white space below a content-sized card.
  card.size = new Size(0, cardHeight)
  card.backgroundColor = p.cardBg
  card.cornerRadius = COUNTDOWN_CARD_RADIUS
  card.setPadding(t.cardPad, t.cardPad, t.cardPad, t.cardPad)

  const infoCol = card.addStack()
  infoCol.layoutVertically()

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
  if (next.event.organizer) rows.push({ icon: "person.2", text: next.event.organizer })
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

  if (isSmall) {
    // Vertical card: a fixed gap, then the well drops below the rows
    // instead of beside them (see drawCountdownWell's fullWidth case).
    // Small's total content (title + 3 rows + well) is taller than
    // Medium/Large's (rows sit beside the well there, not above it),
    // so every bit of vertical slack here — this gap included — is
    // trimmed tighter than the non-Small equivalent.
    card.addSpacer(4)
    drawCountdownWell(card, next, p, t, true)
  } else {
    // Fixed minimum gap, then a flex spacer. The flex is what
    // stretches CARD to the widget's full width: a stack sizes to fit
    // its content, but a flex spacer's "as large as possible" ideal
    // size cascades out through every ancestor stack that isn't
    // otherwise constrained (the same trick drawActivityRow uses —
    // see "Trailing flex spacer stretches the CARDCONTAINER" there)
    // — here it pins the well to the card's right edge instead of
    // leaving blank space after it.
    card.addSpacer(rich ? 20 : 12)
    card.addSpacer()
    drawCountdownWell(card, next, p, t, false)
  }

  // Matches the leading COUNTDOWN_MARGIN spacer above, so the card
  // sits with equal margin on both sides instead of flush against the
  // widget's right edge — drawStatusFooter (back in makeWidget)
  // already surfaces stale/notification/invalid-token state uniformly,
  // so it isn't repeated here.
  outer.addSpacer(COUNTDOWN_MARGIN)
}

// The countdown "well" — a light-blue rounded box with the big
// week/day (or day-only) count. \`fullWidth\` (Small) wraps the count
// in a leading + trailing flex spacer instead of leaving the well's
// horizontal stack sized to its natural (content) width; those two
// flex spacers' "as large as possible" ideal width cascades up through
// \`well\` itself, stretching it to fill the card's remaining width and
// centering the count inside it — the same cascade-through-flex-
// spacer trick used everywhere else in this file, just applied on
// both sides instead of one.
function drawCountdownWell(container, next, p, t, fullWidth) {
  const well = container.addStack()
  well.backgroundColor = p.currentCardBg
  well.cornerRadius = COUNTDOWN_WELL_RADIUS
  well.centerAlignContent()
  well.setPadding(t.wellPadV, t.wellPadH, t.wellPadV, t.wellPadH)

  if (fullWidth) well.addSpacer()

  const parts = countdownParts(daysUntil(next.day.date))
  if (parts.split) {
    const row = well.addStack()
    row.bottomAlignContent()
    row.spacing = t.unitGap
    addCountUnit(row, parts.weeks, pluralize(parts.weeks, "week"), p, t)
    addCountDivider(row, p, t)
    addCountUnit(row, parts.days, pluralize(parts.days, "day"), p, t)
  } else {
    addCountUnit(well, parts.days, \`\${pluralize(parts.days, "day")} away\`, p, t)
  }

  if (fullWidth) well.addSpacer()
}

function addInfoRow(col, row, p, t) {
  const stack = col.addStack()
  stack.centerAlignContent()
  stack.spacing = t.rowSpacing
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

// One "12 / DAYS"-style stacked digit+label block inside the well.
function addCountUnit(container, n, label, p, t) {
  const col = container.addStack()
  col.layoutVertically()
  const num = col.addText(String(n))
  num.font = rBoldFont(t.unitFont)
  num.textColor = p.accent
  const lbl = col.addText(label.toUpperCase())
  lbl.font = rSemiboldFont(t.unitLabelFont)
  lbl.textColor = p.mutedStrong
}

// Thin vertical rule between the week and day units — same two-row
// (glyph + label-height spacer) shape as addCountUnit so
// row.bottomAlignContent() lines all three blocks up on the digit,
// not the label. A plain line reads as a divider; the colon glyph
// this replaced looked like part of a clock/time value instead.
function addCountDivider(row, p, t) {
  const col = row.addStack()
  col.layoutVertically()
  const line = col.addStack()
  line.backgroundColor = p.divider
  line.size = new Size(1, t.dividerH)
  const spacer = col.addText(".")
  spacer.font = rSemiboldFont(t.unitLabelFont)
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
`;function Yp(){const[r,c]=lt.useState(!1);lt.useEffect(()=>{window.scrollTo(0,0)},[]);async function d(){await navigator.clipboard.writeText(_h),c(!0),setTimeout(()=>c(!1),2e3)}return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsxs("button",{onClick:d,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[r?g.jsx(io,{size:16,className:"text-green-600"}):g.jsx(yg,{size:16}),r?"Copied":"Copy"]}),g.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:g.jsx(ao,{size:18})})]})]}),g.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",g.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),g.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:g.jsx("code",{children:_h})})]})})}var Ba={},Or,Mh;function qp(){return Mh||(Mh=1,Or=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Or}var zr={},_n={},Dh;function Wn(){if(Dh)return _n;Dh=1;let r;const c=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(s){if(!s)throw new Error('"version" cannot be null or undefined');if(s<1||s>40)throw new Error('"version" should be in range from 1 to 40');return s*4+17},_n.getSymbolTotalCodewords=function(s){return c[s]},_n.getBCHDigit=function(d){let s=0;for(;d!==0;)s++,d>>>=1;return s},_n.setToSJISFunction=function(s){if(typeof s!="function")throw new Error('"toSJISFunc" is not a valid function.');r=s},_n.isKanjiModeEnabled=function(){return typeof r<"u"},_n.toSJIS=function(s){return r(s)},_n}var Ur={},Rh;function uu(){return Rh||(Rh=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function c(d){if(typeof d!="string")throw new Error("Param is not a string");switch(d.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+d)}}r.isValid=function(s){return s&&typeof s.bit<"u"&&s.bit>=0&&s.bit<4},r.from=function(s,f){if(r.isValid(s))return s;try{return c(s)}catch{return f}}})(Ur)),Ur}var Hr,kh;function Vp(){if(kh)return Hr;kh=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(c){const d=Math.floor(c/8);return(this.buffer[d]>>>7-c%8&1)===1},put:function(c,d){for(let s=0;s<d;s++)this.putBit((c>>>d-s-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(c){const d=Math.floor(this.length/8);this.buffer.length<=d&&this.buffer.push(0),c&&(this.buffer[d]|=128>>>this.length%8),this.length++}},Hr=r,Hr}var jr,Oh;function Xp(){if(Oh)return jr;Oh=1;function r(c){if(!c||c<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=c,this.data=new Uint8Array(c*c),this.reservedBit=new Uint8Array(c*c)}return r.prototype.set=function(c,d,s,f){const h=c*this.size+d;this.data[h]=s,f&&(this.reservedBit[h]=!0)},r.prototype.get=function(c,d){return this.data[c*this.size+d]},r.prototype.xor=function(c,d,s){this.data[c*this.size+d]^=s},r.prototype.isReserved=function(c,d){return this.reservedBit[c*this.size+d]},jr=r,jr}var Br={},zh;function Qp(){return zh||(zh=1,(function(r){const c=Wn().getSymbolSize;r.getRowColCoords=function(s){if(s===1)return[];const f=Math.floor(s/7)+2,h=c(s),y=h===145?26:Math.ceil((h-13)/(2*f-2))*2,S=[h-7];for(let m=1;m<f-1;m++)S[m]=S[m-1]-y;return S.push(6),S.reverse()},r.getPositions=function(s){const f=[],h=r.getRowColCoords(s),y=h.length;for(let S=0;S<y;S++)for(let m=0;m<y;m++)S===0&&m===0||S===0&&m===y-1||S===y-1&&m===0||f.push([h[S],h[m]]);return f}})(Br)),Br}var Lr={},Uh;function Zp(){if(Uh)return Lr;Uh=1;const r=Wn().getSymbolSize,c=7;return Lr.getPositions=function(s){const f=r(s);return[[0,0],[f-c,0],[0,f-c]]},Lr}var Gr={},Hh;function Kp(){return Hh||(Hh=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const c={N1:3,N2:3,N3:40,N4:10};r.isValid=function(f){return f!=null&&f!==""&&!isNaN(f)&&f>=0&&f<=7},r.from=function(f){return r.isValid(f)?parseInt(f,10):void 0},r.getPenaltyN1=function(f){const h=f.size;let y=0,S=0,m=0,v=null,_=null;for(let k=0;k<h;k++){S=m=0,v=_=null;for(let H=0;H<h;H++){let B=f.get(k,H);B===v?S++:(S>=5&&(y+=c.N1+(S-5)),v=B,S=1),B=f.get(H,k),B===_?m++:(m>=5&&(y+=c.N1+(m-5)),_=B,m=1)}S>=5&&(y+=c.N1+(S-5)),m>=5&&(y+=c.N1+(m-5))}return y},r.getPenaltyN2=function(f){const h=f.size;let y=0;for(let S=0;S<h-1;S++)for(let m=0;m<h-1;m++){const v=f.get(S,m)+f.get(S,m+1)+f.get(S+1,m)+f.get(S+1,m+1);(v===4||v===0)&&y++}return y*c.N2},r.getPenaltyN3=function(f){const h=f.size;let y=0,S=0,m=0;for(let v=0;v<h;v++){S=m=0;for(let _=0;_<h;_++)S=S<<1&2047|f.get(v,_),_>=10&&(S===1488||S===93)&&y++,m=m<<1&2047|f.get(_,v),_>=10&&(m===1488||m===93)&&y++}return y*c.N3},r.getPenaltyN4=function(f){let h=0;const y=f.data.length;for(let m=0;m<y;m++)h+=f.data[m];return Math.abs(Math.ceil(h*100/y/5)-10)*c.N4};function d(s,f,h){switch(s){case r.Patterns.PATTERN000:return(f+h)%2===0;case r.Patterns.PATTERN001:return f%2===0;case r.Patterns.PATTERN010:return h%3===0;case r.Patterns.PATTERN011:return(f+h)%3===0;case r.Patterns.PATTERN100:return(Math.floor(f/2)+Math.floor(h/3))%2===0;case r.Patterns.PATTERN101:return f*h%2+f*h%3===0;case r.Patterns.PATTERN110:return(f*h%2+f*h%3)%2===0;case r.Patterns.PATTERN111:return(f*h%3+(f+h)%2)%2===0;default:throw new Error("bad maskPattern:"+s)}}r.applyMask=function(f,h){const y=h.size;for(let S=0;S<y;S++)for(let m=0;m<y;m++)h.isReserved(m,S)||h.xor(m,S,d(f,m,S))},r.getBestMask=function(f,h){const y=Object.keys(r.Patterns).length;let S=0,m=1/0;for(let v=0;v<y;v++){h(v),r.applyMask(v,f);const _=r.getPenaltyN1(f)+r.getPenaltyN2(f)+r.getPenaltyN3(f)+r.getPenaltyN4(f);r.applyMask(v,f),_<m&&(m=_,S=v)}return S}})(Gr)),Gr}var eo={},jh;function Tg(){if(jh)return eo;jh=1;const r=uu(),c=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],d=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return eo.getBlocksCount=function(f,h){switch(h){case r.L:return c[(f-1)*4+0];case r.M:return c[(f-1)*4+1];case r.Q:return c[(f-1)*4+2];case r.H:return c[(f-1)*4+3];default:return}},eo.getTotalCodewordsCount=function(f,h){switch(h){case r.L:return d[(f-1)*4+0];case r.M:return d[(f-1)*4+1];case r.Q:return d[(f-1)*4+2];case r.H:return d[(f-1)*4+3];default:return}},eo}var Yr={},zl={},Bh;function Ip(){if(Bh)return zl;Bh=1;const r=new Uint8Array(512),c=new Uint8Array(256);return(function(){let s=1;for(let f=0;f<255;f++)r[f]=s,c[s]=f,s<<=1,s&256&&(s^=285);for(let f=255;f<512;f++)r[f]=r[f-255]})(),zl.log=function(s){if(s<1)throw new Error("log("+s+")");return c[s]},zl.exp=function(s){return r[s]},zl.mul=function(s,f){return s===0||f===0?0:r[c[s]+c[f]]},zl}var Lh;function Fp(){return Lh||(Lh=1,(function(r){const c=Ip();r.mul=function(s,f){const h=new Uint8Array(s.length+f.length-1);for(let y=0;y<s.length;y++)for(let S=0;S<f.length;S++)h[y+S]^=c.mul(s[y],f[S]);return h},r.mod=function(s,f){let h=new Uint8Array(s);for(;h.length-f.length>=0;){const y=h[0];for(let m=0;m<f.length;m++)h[m]^=c.mul(f[m],y);let S=0;for(;S<h.length&&h[S]===0;)S++;h=h.slice(S)}return h},r.generateECPolynomial=function(s){let f=new Uint8Array([1]);for(let h=0;h<s;h++)f=r.mul(f,new Uint8Array([1,c.exp(h)]));return f}})(Yr)),Yr}var qr,Gh;function Jp(){if(Gh)return qr;Gh=1;const r=Fp();function c(d){this.genPoly=void 0,this.degree=d,this.degree&&this.initialize(this.degree)}return c.prototype.initialize=function(s){this.degree=s,this.genPoly=r.generateECPolynomial(this.degree)},c.prototype.encode=function(s){if(!this.genPoly)throw new Error("Encoder not initialized");const f=new Uint8Array(s.length+this.degree);f.set(s);const h=r.mod(f,this.genPoly),y=this.degree-h.length;if(y>0){const S=new Uint8Array(this.degree);return S.set(h,y),S}return h},qr=c,qr}var Vr={},Xr={},Qr={},Yh;function Ng(){return Yh||(Yh=1,Qr.isValid=function(c){return!isNaN(c)&&c>=1&&c<=40}),Qr}var Ue={},qh;function Cg(){if(qh)return Ue;qh=1;const r="[0-9]+",c="[A-Z $%*+\\-./:]+";let d="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";d=d.replace(/u/g,"\\u");const s="(?:(?![A-Z0-9 $%*+\\-./:]|"+d+`)(?:.|[\r
]))+`;Ue.KANJI=new RegExp(d,"g"),Ue.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Ue.BYTE=new RegExp(s,"g"),Ue.NUMERIC=new RegExp(r,"g"),Ue.ALPHANUMERIC=new RegExp(c,"g");const f=new RegExp("^"+d+"$"),h=new RegExp("^"+r+"$"),y=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Ue.testKanji=function(m){return f.test(m)},Ue.testNumeric=function(m){return h.test(m)},Ue.testAlphanumeric=function(m){return y.test(m)},Ue}var Vh;function $n(){return Vh||(Vh=1,(function(r){const c=Ng(),d=Cg();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(h,y){if(!h.ccBits)throw new Error("Invalid mode: "+h);if(!c.isValid(y))throw new Error("Invalid version: "+y);return y>=1&&y<10?h.ccBits[0]:y<27?h.ccBits[1]:h.ccBits[2]},r.getBestModeForData=function(h){return d.testNumeric(h)?r.NUMERIC:d.testAlphanumeric(h)?r.ALPHANUMERIC:d.testKanji(h)?r.KANJI:r.BYTE},r.toString=function(h){if(h&&h.id)return h.id;throw new Error("Invalid mode")},r.isValid=function(h){return h&&h.bit&&h.ccBits};function s(f){if(typeof f!="string")throw new Error("Param is not a string");switch(f.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+f)}}r.from=function(h,y){if(r.isValid(h))return h;try{return s(h)}catch{return y}}})(Xr)),Xr}var Xh;function Wp(){return Xh||(Xh=1,(function(r){const c=Wn(),d=Tg(),s=uu(),f=$n(),h=Ng(),y=7973,S=c.getBCHDigit(y);function m(H,B,X){for(let I=1;I<=40;I++)if(B<=r.getCapacity(I,X,H))return I}function v(H,B){return f.getCharCountIndicator(H,B)+4}function _(H,B){let X=0;return H.forEach(function(I){const F=v(I.mode,B);X+=F+I.getBitsLength()}),X}function k(H,B){for(let X=1;X<=40;X++)if(_(H,X)<=r.getCapacity(X,B,f.MIXED))return X}r.from=function(B,X){return h.isValid(B)?parseInt(B,10):X},r.getCapacity=function(B,X,I){if(!h.isValid(B))throw new Error("Invalid QR Code version");typeof I>"u"&&(I=f.BYTE);const F=c.getSymbolTotalCodewords(B),L=d.getTotalCodewordsCount(B,X),R=(F-L)*8;if(I===f.MIXED)return R;const C=R-v(I,B);switch(I){case f.NUMERIC:return Math.floor(C/10*3);case f.ALPHANUMERIC:return Math.floor(C/11*2);case f.KANJI:return Math.floor(C/13);case f.BYTE:default:return Math.floor(C/8)}},r.getBestVersionForData=function(B,X){let I;const F=s.from(X,s.M);if(Array.isArray(B)){if(B.length>1)return k(B,F);if(B.length===0)return 1;I=B[0]}else I=B;return m(I.mode,I.getLength(),F)},r.getEncodedBits=function(B){if(!h.isValid(B)||B<7)throw new Error("Invalid QR Code version");let X=B<<12;for(;c.getBCHDigit(X)-S>=0;)X^=y<<c.getBCHDigit(X)-S;return B<<12|X}})(Vr)),Vr}var Zr={},Qh;function $p(){if(Qh)return Zr;Qh=1;const r=Wn(),c=1335,d=21522,s=r.getBCHDigit(c);return Zr.getEncodedBits=function(h,y){const S=h.bit<<3|y;let m=S<<10;for(;r.getBCHDigit(m)-s>=0;)m^=c<<r.getBCHDigit(m)-s;return(S<<10|m)^d},Zr}var Kr={},Ir,Zh;function Pp(){if(Zh)return Ir;Zh=1;const r=$n();function c(d){this.mode=r.NUMERIC,this.data=d.toString()}return c.getBitsLength=function(s){return 10*Math.floor(s/3)+(s%3?s%3*3+1:0)},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(s){let f,h,y;for(f=0;f+3<=this.data.length;f+=3)h=this.data.substr(f,3),y=parseInt(h,10),s.put(y,10);const S=this.data.length-f;S>0&&(h=this.data.substr(f),y=parseInt(h,10),s.put(y,S*3+1))},Ir=c,Ir}var Fr,Kh;function ty(){if(Kh)return Fr;Kh=1;const r=$n(),c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function d(s){this.mode=r.ALPHANUMERIC,this.data=s}return d.getBitsLength=function(f){return 11*Math.floor(f/2)+6*(f%2)},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(f){let h;for(h=0;h+2<=this.data.length;h+=2){let y=c.indexOf(this.data[h])*45;y+=c.indexOf(this.data[h+1]),f.put(y,11)}this.data.length%2&&f.put(c.indexOf(this.data[h]),6)},Fr=d,Fr}var Jr,Ih;function ey(){if(Ih)return Jr;Ih=1;const r=$n();function c(d){this.mode=r.BYTE,typeof d=="string"?this.data=new TextEncoder().encode(d):this.data=new Uint8Array(d)}return c.getBitsLength=function(s){return s*8},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(d){for(let s=0,f=this.data.length;s<f;s++)d.put(this.data[s],8)},Jr=c,Jr}var Wr,Fh;function ny(){if(Fh)return Wr;Fh=1;const r=$n(),c=Wn();function d(s){this.mode=r.KANJI,this.data=s}return d.getBitsLength=function(f){return f*13},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(s){let f;for(f=0;f<this.data.length;f++){let h=c.toSJIS(this.data[f]);if(h>=33088&&h<=40956)h-=33088;else if(h>=57408&&h<=60351)h-=49472;else throw new Error("Invalid SJIS character: "+this.data[f]+`
Make sure your charset is UTF-8`);h=(h>>>8&255)*192+(h&255),s.put(h,13)}},Wr=d,Wr}var $r={exports:{}},Jh;function ay(){return Jh||(Jh=1,(function(r){var c={single_source_shortest_paths:function(d,s,f){var h={},y={};y[s]=0;var S=c.PriorityQueue.make();S.push(s,0);for(var m,v,_,k,H,B,X,I,F;!S.empty();){m=S.pop(),v=m.value,k=m.cost,H=d[v]||{};for(_ in H)H.hasOwnProperty(_)&&(B=H[_],X=k+B,I=y[_],F=typeof y[_]>"u",(F||I>X)&&(y[_]=X,S.push(_,X),h[_]=v))}if(typeof f<"u"&&typeof y[f]>"u"){var L=["Could not find a path from ",s," to ",f,"."].join("");throw new Error(L)}return h},extract_shortest_path_from_predecessor_list:function(d,s){for(var f=[],h=s;h;)f.push(h),d[h],h=d[h];return f.reverse(),f},find_path:function(d,s,f){var h=c.single_source_shortest_paths(d,s,f);return c.extract_shortest_path_from_predecessor_list(h,f)},PriorityQueue:{make:function(d){var s=c.PriorityQueue,f={},h;d=d||{};for(h in s)s.hasOwnProperty(h)&&(f[h]=s[h]);return f.queue=[],f.sorter=d.sorter||s.default_sorter,f},default_sorter:function(d,s){return d.cost-s.cost},push:function(d,s){var f={value:d,cost:s};this.queue.push(f),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=c})($r)),$r.exports}var Wh;function ly(){return Wh||(Wh=1,(function(r){const c=$n(),d=Pp(),s=ty(),f=ey(),h=ny(),y=Cg(),S=Wn(),m=ay();function v(L){return unescape(encodeURIComponent(L)).length}function _(L,R,C){const G=[];let at;for(;(at=L.exec(C))!==null;)G.push({data:at[0],index:at.index,mode:R,length:at[0].length});return G}function k(L){const R=_(y.NUMERIC,c.NUMERIC,L),C=_(y.ALPHANUMERIC,c.ALPHANUMERIC,L);let G,at;return S.isKanjiModeEnabled()?(G=_(y.BYTE,c.BYTE,L),at=_(y.KANJI,c.KANJI,L)):(G=_(y.BYTE_KANJI,c.BYTE,L),at=[]),R.concat(C,G,at).sort(function(j,Q){return j.index-Q.index}).map(function(j){return{data:j.data,mode:j.mode,length:j.length}})}function H(L,R){switch(R){case c.NUMERIC:return d.getBitsLength(L);case c.ALPHANUMERIC:return s.getBitsLength(L);case c.KANJI:return h.getBitsLength(L);case c.BYTE:return f.getBitsLength(L)}}function B(L){return L.reduce(function(R,C){const G=R.length-1>=0?R[R.length-1]:null;return G&&G.mode===C.mode?(R[R.length-1].data+=C.data,R):(R.push(C),R)},[])}function X(L){const R=[];for(let C=0;C<L.length;C++){const G=L[C];switch(G.mode){case c.NUMERIC:R.push([G,{data:G.data,mode:c.ALPHANUMERIC,length:G.length},{data:G.data,mode:c.BYTE,length:G.length}]);break;case c.ALPHANUMERIC:R.push([G,{data:G.data,mode:c.BYTE,length:G.length}]);break;case c.KANJI:R.push([G,{data:G.data,mode:c.BYTE,length:v(G.data)}]);break;case c.BYTE:R.push([{data:G.data,mode:c.BYTE,length:v(G.data)}])}}return R}function I(L,R){const C={},G={start:{}};let at=["start"];for(let q=0;q<L.length;q++){const j=L[q],Q=[];for(let V=0;V<j.length;V++){const tt=j[V],W=""+q+V;Q.push(W),C[W]={node:tt,lastCount:0},G[W]={};for(let Y=0;Y<at.length;Y++){const J=at[Y];C[J]&&C[J].node.mode===tt.mode?(G[J][W]=H(C[J].lastCount+tt.length,tt.mode)-H(C[J].lastCount,tt.mode),C[J].lastCount+=tt.length):(C[J]&&(C[J].lastCount=tt.length),G[J][W]=H(tt.length,tt.mode)+4+c.getCharCountIndicator(tt.mode,R))}}at=Q}for(let q=0;q<at.length;q++)G[at[q]].end=0;return{map:G,table:C}}function F(L,R){let C;const G=c.getBestModeForData(L);if(C=c.from(R,G),C!==c.BYTE&&C.bit<G.bit)throw new Error('"'+L+'" cannot be encoded with mode '+c.toString(C)+`.
 Suggested mode is: `+c.toString(G));switch(C===c.KANJI&&!S.isKanjiModeEnabled()&&(C=c.BYTE),C){case c.NUMERIC:return new d(L);case c.ALPHANUMERIC:return new s(L);case c.KANJI:return new h(L);case c.BYTE:return new f(L)}}r.fromArray=function(R){return R.reduce(function(C,G){return typeof G=="string"?C.push(F(G,null)):G.data&&C.push(F(G.data,G.mode)),C},[])},r.fromString=function(R,C){const G=k(R,S.isKanjiModeEnabled()),at=X(G),q=I(at,C),j=m.find_path(q.map,"start","end"),Q=[];for(let V=1;V<j.length-1;V++)Q.push(q.table[j[V]].node);return r.fromArray(B(Q))},r.rawSplit=function(R){return r.fromArray(k(R,S.isKanjiModeEnabled()))}})(Kr)),Kr}var $h;function iy(){if($h)return zr;$h=1;const r=Wn(),c=uu(),d=Vp(),s=Xp(),f=Qp(),h=Zp(),y=Kp(),S=Tg(),m=Jp(),v=Wp(),_=$p(),k=$n(),H=ly();function B(q,j){const Q=q.size,V=h.getPositions(j);for(let tt=0;tt<V.length;tt++){const W=V[tt][0],Y=V[tt][1];for(let J=-1;J<=7;J++)if(!(W+J<=-1||Q<=W+J))for(let it=-1;it<=7;it++)Y+it<=-1||Q<=Y+it||(J>=0&&J<=6&&(it===0||it===6)||it>=0&&it<=6&&(J===0||J===6)||J>=2&&J<=4&&it>=2&&it<=4?q.set(W+J,Y+it,!0,!0):q.set(W+J,Y+it,!1,!0))}}function X(q){const j=q.size;for(let Q=8;Q<j-8;Q++){const V=Q%2===0;q.set(Q,6,V,!0),q.set(6,Q,V,!0)}}function I(q,j){const Q=f.getPositions(j);for(let V=0;V<Q.length;V++){const tt=Q[V][0],W=Q[V][1];for(let Y=-2;Y<=2;Y++)for(let J=-2;J<=2;J++)Y===-2||Y===2||J===-2||J===2||Y===0&&J===0?q.set(tt+Y,W+J,!0,!0):q.set(tt+Y,W+J,!1,!0)}}function F(q,j){const Q=q.size,V=v.getEncodedBits(j);let tt,W,Y;for(let J=0;J<18;J++)tt=Math.floor(J/3),W=J%3+Q-8-3,Y=(V>>J&1)===1,q.set(tt,W,Y,!0),q.set(W,tt,Y,!0)}function L(q,j,Q){const V=q.size,tt=_.getEncodedBits(j,Q);let W,Y;for(W=0;W<15;W++)Y=(tt>>W&1)===1,W<6?q.set(W,8,Y,!0):W<8?q.set(W+1,8,Y,!0):q.set(V-15+W,8,Y,!0),W<8?q.set(8,V-W-1,Y,!0):W<9?q.set(8,15-W-1+1,Y,!0):q.set(8,15-W-1,Y,!0);q.set(V-8,8,1,!0)}function R(q,j){const Q=q.size;let V=-1,tt=Q-1,W=7,Y=0;for(let J=Q-1;J>0;J-=2)for(J===6&&J--;;){for(let it=0;it<2;it++)if(!q.isReserved(tt,J-it)){let Gt=!1;Y<j.length&&(Gt=(j[Y]>>>W&1)===1),q.set(tt,J-it,Gt),W--,W===-1&&(Y++,W=7)}if(tt+=V,tt<0||Q<=tt){tt-=V,V=-V;break}}}function C(q,j,Q){const V=new d;Q.forEach(function(it){V.put(it.mode.bit,4),V.put(it.getLength(),k.getCharCountIndicator(it.mode,q)),it.write(V)});const tt=r.getSymbolTotalCodewords(q),W=S.getTotalCodewordsCount(q,j),Y=(tt-W)*8;for(V.getLengthInBits()+4<=Y&&V.put(0,4);V.getLengthInBits()%8!==0;)V.putBit(0);const J=(Y-V.getLengthInBits())/8;for(let it=0;it<J;it++)V.put(it%2?17:236,8);return G(V,q,j)}function G(q,j,Q){const V=r.getSymbolTotalCodewords(j),tt=S.getTotalCodewordsCount(j,Q),W=V-tt,Y=S.getBlocksCount(j,Q),J=V%Y,it=Y-J,Gt=Math.floor(V/Y),M=Math.floor(W/Y),K=M+1,ot=Gt-M,Et=new m(ot);let St=0;const w=new Array(Y),U=new Array(Y);let Z=0;const P=new Uint8Array(q.buffer);for(let Ct=0;Ct<Y;Ct++){const He=Ct<it?M:K;w[Ct]=P.slice(St,St+He),U[Ct]=Et.encode(w[Ct]),St+=He,Z=Math.max(Z,He)}const rt=new Uint8Array(V);let dt=0,ht,Rt;for(ht=0;ht<Z;ht++)for(Rt=0;Rt<Y;Rt++)ht<w[Rt].length&&(rt[dt++]=w[Rt][ht]);for(ht=0;ht<ot;ht++)for(Rt=0;Rt<Y;Rt++)rt[dt++]=U[Rt][ht];return rt}function at(q,j,Q,V){let tt;if(Array.isArray(q))tt=H.fromArray(q);else if(typeof q=="string"){let Gt=j;if(!Gt){const M=H.rawSplit(q);Gt=v.getBestVersionForData(M,Q)}tt=H.fromString(q,Gt||40)}else throw new Error("Invalid data");const W=v.getBestVersionForData(tt,Q);if(!W)throw new Error("The amount of data is too big to be stored in a QR Code");if(!j)j=W;else if(j<W)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+W+`.
`);const Y=C(j,Q,tt),J=r.getSymbolSize(j),it=new s(J);return B(it,j),X(it),I(it,j),L(it,Q,0),j>=7&&F(it,j),R(it,Y),isNaN(V)&&(V=y.getBestMask(it,L.bind(null,it,Q))),y.applyMask(V,it),L(it,Q,V),{modules:it,version:j,errorCorrectionLevel:Q,maskPattern:V,segments:tt}}return zr.create=function(j,Q){if(typeof j>"u"||j==="")throw new Error("No input text");let V=c.M,tt,W;return typeof Q<"u"&&(V=c.from(Q.errorCorrectionLevel,c.M),tt=v.from(Q.version),W=y.from(Q.maskPattern),Q.toSJISFunc&&r.setToSJISFunction(Q.toSJISFunc)),at(j,tt,V,W)},zr}var Pr={},tu={},Ph;function Ag(){return Ph||(Ph=1,(function(r){function c(d){if(typeof d=="number"&&(d=d.toString()),typeof d!="string")throw new Error("Color should be defined as hex string");let s=d.slice().replace("#","").split("");if(s.length<3||s.length===5||s.length>8)throw new Error("Invalid hex color: "+d);(s.length===3||s.length===4)&&(s=Array.prototype.concat.apply([],s.map(function(h){return[h,h]}))),s.length===6&&s.push("F","F");const f=parseInt(s.join(""),16);return{r:f>>24&255,g:f>>16&255,b:f>>8&255,a:f&255,hex:"#"+s.slice(0,6).join("")}}r.getOptions=function(s){s||(s={}),s.color||(s.color={});const f=typeof s.margin>"u"||s.margin===null||s.margin<0?4:s.margin,h=s.width&&s.width>=21?s.width:void 0,y=s.scale||4;return{width:h,scale:h?4:y,margin:f,color:{dark:c(s.color.dark||"#000000ff"),light:c(s.color.light||"#ffffffff")},type:s.type,rendererOpts:s.rendererOpts||{}}},r.getScale=function(s,f){return f.width&&f.width>=s+f.margin*2?f.width/(s+f.margin*2):f.scale},r.getImageWidth=function(s,f){const h=r.getScale(s,f);return Math.floor((s+f.margin*2)*h)},r.qrToImageData=function(s,f,h){const y=f.modules.size,S=f.modules.data,m=r.getScale(y,h),v=Math.floor((y+h.margin*2)*m),_=h.margin*m,k=[h.color.light,h.color.dark];for(let H=0;H<v;H++)for(let B=0;B<v;B++){let X=(H*v+B)*4,I=h.color.light;if(H>=_&&B>=_&&H<v-_&&B<v-_){const F=Math.floor((H-_)/m),L=Math.floor((B-_)/m);I=k[S[F*y+L]?1:0]}s[X++]=I.r,s[X++]=I.g,s[X++]=I.b,s[X]=I.a}}})(tu)),tu}var tg;function oy(){return tg||(tg=1,(function(r){const c=Ag();function d(f,h,y){f.clearRect(0,0,h.width,h.height),h.style||(h.style={}),h.height=y,h.width=y,h.style.height=y+"px",h.style.width=y+"px"}function s(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(h,y,S){let m=S,v=y;typeof m>"u"&&(!y||!y.getContext)&&(m=y,y=void 0),y||(v=s()),m=c.getOptions(m);const _=c.getImageWidth(h.modules.size,m),k=v.getContext("2d"),H=k.createImageData(_,_);return c.qrToImageData(H.data,h,m),d(k,v,_),k.putImageData(H,0,0),v},r.renderToDataURL=function(h,y,S){let m=S;typeof m>"u"&&(!y||!y.getContext)&&(m=y,y=void 0),m||(m={});const v=r.render(h,y,m),_=m.type||"image/png",k=m.rendererOpts||{};return v.toDataURL(_,k.quality)}})(Pr)),Pr}var eu={},eg;function sy(){if(eg)return eu;eg=1;const r=Ag();function c(f,h){const y=f.a/255,S=h+'="'+f.hex+'"';return y<1?S+" "+h+'-opacity="'+y.toFixed(2).slice(1)+'"':S}function d(f,h,y){let S=f+h;return typeof y<"u"&&(S+=" "+y),S}function s(f,h,y){let S="",m=0,v=!1,_=0;for(let k=0;k<f.length;k++){const H=Math.floor(k%h),B=Math.floor(k/h);!H&&!v&&(v=!0),f[k]?(_++,k>0&&H>0&&f[k-1]||(S+=v?d("M",H+y,.5+B+y):d("m",m,0),m=0,v=!1),H+1<h&&f[k+1]||(S+=d("h",_),_=0)):m++}return S}return eu.render=function(h,y,S){const m=r.getOptions(y),v=h.modules.size,_=h.modules.data,k=v+m.margin*2,H=m.color.light.a?"<path "+c(m.color.light,"fill")+' d="M0 0h'+k+"v"+k+'H0z"/>':"",B="<path "+c(m.color.dark,"stroke")+' d="'+s(_,v,m.margin)+'"/>',X='viewBox="0 0 '+k+" "+k+'"',F='<svg xmlns="http://www.w3.org/2000/svg" '+(m.width?'width="'+m.width+'" height="'+m.width+'" ':"")+X+' shape-rendering="crispEdges">'+H+B+`</svg>
`;return typeof S=="function"&&S(null,F),F},eu}var ng;function ry(){if(ng)return Ba;ng=1;const r=qp(),c=iy(),d=oy(),s=sy();function f(h,y,S,m,v){const _=[].slice.call(arguments,1),k=_.length,H=typeof _[k-1]=="function";if(!H&&!r())throw new Error("Callback required as last argument");if(H){if(k<2)throw new Error("Too few arguments provided");k===2?(v=S,S=y,y=m=void 0):k===3&&(y.getContext&&typeof v>"u"?(v=m,m=void 0):(v=m,m=S,S=y,y=void 0))}else{if(k<1)throw new Error("Too few arguments provided");return k===1?(S=y,y=m=void 0):k===2&&!y.getContext&&(m=S,S=y,y=void 0),new Promise(function(B,X){try{const I=c.create(S,m);B(h(I,y,m))}catch(I){X(I)}})}try{const B=c.create(S,m);v(null,h(B,y,m))}catch(B){v(B)}}return Ba.create=c.create,Ba.toCanvas=f.bind(null,d.render),Ba.toDataURL=f.bind(null,d.renderToDataURL),Ba.toString=f.bind(null,function(h,y,S){return s.render(h,S)}),Ba}var uy=ry();const cy=P0(uy),nu=`${window.location.origin}/hpde/pr-preview/pr-198/`;function fy(){const[r,c]=lt.useState(!1),[d,s]=lt.useState(null);lt.useEffect(()=>{window.scrollTo(0,0),cy.toDataURL(nu,{margin:1,width:240}).then(s).catch(()=>s(null))},[]);async function f(){await navigator.clipboard.writeText(nu),c(!0),setTimeout(()=>c(!1),2e3)}return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),g.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:g.jsx(ao,{size:18})})]}),g.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),g.jsxs("button",{onClick:f,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[g.jsx("span",{className:"truncate text-sm text-gray-800",children:nu}),r?g.jsx(io,{size:16,className:"shrink-0 text-green-600"}):g.jsx(yg,{size:16,className:"shrink-0 text-gray-400"})]}),g.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:d&&g.jsx("img",{src:d,alt:"QR code for schedule link",width:240,height:240})})]})})}const ag=350,dy="cubic-bezier(0.32, 0.72, 0, 1)",hy=.35,gy=.5;function my(r){try{return new URL(r).hostname.replace(/^www\./,"")}catch{return r}}function py(r){const c=r.trim().toLowerCase();return c==="clockwise"?"CW (clockwise)":c==="counter-clockwise"||c==="counterclockwise"?"CCW (counter-clockwise)":r}function yy(r,c){return[r,c&&py(c)].filter(Boolean).join(" ")}function Ul({icon:r,label:c,subtitle:d,children:s}){return g.jsxs("div",{className:"grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[g.jsxs("span",{className:"flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(r,{size:14,className:"shrink-0 text-gray-400"}),c]}),g.jsxs("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:[s,d&&g.jsx("span",{className:"mt-0.5 block text-xs font-normal text-gray-400",children:d})]})]})}function vy({event:r,open:c,onClose:d}){var L;const s=lt.useRef(null),f=lt.useRef(null),[h,y]=lt.useState(0),[S,m]=lt.useState(!1),[v,_]=lt.useState(!1),[k,H]=lt.useState(!1);lt.useEffect(()=>{if(!c)return;const R=C=>{C.key==="Escape"&&(k?H(!1):d())};return window.addEventListener("keydown",R),()=>window.removeEventListener("keydown",R)},[c,d,k]),lt.useEffect(()=>{y(0),m(!1),_(!1),H(!1)},[c]),lt.useEffect(()=>{c&&f.current&&(f.current.scrollTop=0)},[c]),lt.useEffect(()=>{if(!c)return;const R=s.current;if(!R)return;let C=null;const G=j=>{if(C)return;const Q=j.touches[0];C={startX:Q.clientX,startY:Q.clientY,lastX:Q.clientX,lastT:j.timeStamp,velocity:0,dx:0,active:!1,width:R.getBoundingClientRect().width}},at=j=>{if(!C)return;const Q=j.touches[0],V=Q.clientX-C.startX,tt=Q.clientY-C.startY;if(!C.active){if(Math.abs(V)<8&&Math.abs(tt)<8)return;if(V<=0||Math.abs(tt)>=Math.abs(V)){C=null;return}C.active=!0,m(!0)}j.preventDefault();const W=j.timeStamp-C.lastT;W>0&&(C.velocity=(Q.clientX-C.lastX)/W),C.lastX=Q.clientX,C.lastT=j.timeStamp,C.dx=Math.min(Math.max(V,0),C.width),y(C.dx)},q=()=>{if(!C||!C.active){C=null;return}const{dx:j,velocity:Q,width:V}=C,tt=j>V*hy||Q>gy;C=null,m(!1),_(!0),tt?(y(V),window.setTimeout(d,ag)):y(0)};return R.addEventListener("touchstart",G,{passive:!0}),R.addEventListener("touchmove",at,{passive:!1}),R.addEventListener("touchend",q),R.addEventListener("touchcancel",q),()=>{R.removeEventListener("touchstart",G),R.removeEventListener("touchmove",at),R.removeEventListener("touchend",q),R.removeEventListener("touchcancel",q)}},[c,d]),lt.useEffect(()=>{if(!c)return;const R=document.documentElement,C=document.body,G=window.scrollY,at=R.style.overflow,q=C.style.overflow,j=C.style.position,Q=C.style.top,V=C.style.width;return R.style.overflow="hidden",C.style.overflow="hidden",C.style.position="fixed",C.style.top=`-${G}px`,C.style.width="100%",()=>{R.style.overflow=at,C.style.overflow=q,C.style.position=j,C.style.top=Q,C.style.width=V,window.scrollTo(0,G)}},[c]);const B=Ap(r.days),X=yy(r.configuration,r.direction),I=!!((L=r.scheduleScans)!=null&&L.length),F=B||r.organizer||r.track||X||r.link||I||r.mapImage;return g.jsxs(g.Fragment,{children:[g.jsx("div",{"aria-hidden":"true",inert:!c,onClick:d,className:"fixed inset-0 z-40",style:{pointerEvents:c?"auto":"none"}}),g.jsx("div",{ref:s,role:"dialog","aria-modal":c,"aria-labelledby":"event-details-title",inert:!c,className:"fixed inset-y-0 right-0 z-50 flex w-full bg-white md:w-[480px] md:max-w-[60vw]",style:{transform:S||v?`translate3d(${h}px,0,0)`:c?"translate3d(0,0,0)":"translate3d(100%,0,0)",transition:S?"none":`transform ${ag}ms ${dy}`,boxShadow:c?"-8px 0 24px rgba(0,0,0,0.08)":"none",willChange:"transform"},children:g.jsxs("div",{ref:f,className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none",children:[g.jsxs("div",{className:"mb-5 flex items-start gap-2 md:justify-between md:gap-4",children:[g.jsx("button",{onClick:d,"aria-label":"Back",className:"inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden",children:g.jsx(pg,{size:20})}),g.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"}),g.jsx("button",{onClick:d,"aria-label":"Close",className:"hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid",children:g.jsx(ao,{size:20})})]}),F?g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"pl-1",children:[B&&g.jsx(Ul,{icon:gg,label:"Dates",children:B}),r.organizer&&g.jsx(Ul,{icon:Np,label:"Organizer",children:r.organizer}),r.track&&g.jsx(Ul,{icon:bp,label:"Location",subtitle:r.city,children:r.track}),X&&g.jsx(Ul,{icon:Tp,label:"Track config",children:X}),r.link&&g.jsx(Ul,{icon:yp,label:"Event page",children:g.jsxs("a",{href:r.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[my(r.link),g.jsx(gp,{size:12,className:"text-gray-400"})]})})]}),r.mapImage&&g.jsxs("div",{className:"mt-6 pl-1",children:[g.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(wp,{size:14,className:"shrink-0 text-gray-400"}),"Track map"]}),g.jsxs("button",{type:"button",onClick:()=>H(!0),"aria-label":"Expand track map",className:"group relative block w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:[g.jsx("img",{src:r.mapImage,alt:`${r.name} track map`,className:"block w-full h-auto"}),g.jsx("span",{className:"absolute right-2 top-2 inline-grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors group-hover:bg-black/70",children:g.jsx(Sp,{size:16})})]})]}),I&&g.jsxs("div",{className:"mt-6 pl-1",children:[g.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(mp,{size:14,className:"shrink-0 text-gray-400"}),"Original schedule"]}),g.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:r.scheduleScans.map((R,C)=>g.jsx("a",{href:R,target:"_blank",rel:"noopener noreferrer",children:g.jsx("img",{src:R,alt:`Original schedule scan ${C+1}`,className:"aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"})},R))})]})]}):g.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})}),k&&r.mapImage&&g.jsxs("div",{role:"dialog","aria-modal":"true","aria-label":`${r.name} track map`,onClick:()=>H(!1),className:"fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4",children:[g.jsx("button",{onClick:()=>H(!1),"aria-label":"Close map",className:"absolute right-4 top-4 inline-grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",children:g.jsx(ao,{size:20})}),g.jsx("img",{src:r.mapImage,alt:`${r.name} track map`,className:"max-h-full max-w-full rounded-lg object-contain"})]})]})}function La(r,c){const d=c.split(`
`).map(I=>I.trim());let s="",f,h,y,S,m,v,_;const k=[],H=[];let B=null,X=!1;for(const I of d){if(!I||I.startsWith("//"))continue;const F=I.replace(/^-\s+/,"");if(F.startsWith("# ")){s=F.slice(2).trim();continue}if(F.startsWith("subtitle:")){f=F.slice(9).trim()||void 0;continue}if(F.startsWith("link:")){h=F.slice(5).trim()||void 0;continue}if(F.startsWith("organizer:")){y=F.slice(10).trim()||void 0;continue}if(F.startsWith("track:")){S=F.slice(6).trim()||void 0;continue}if(F.startsWith("city:")){m=F.slice(5).trim()||void 0;continue}if(F.startsWith("configuration:")){v=F.slice(14).trim()||void 0;continue}if(F.startsWith("config:")){v=F.slice(7).trim()||void 0;continue}if(F.startsWith("direction:")){_=F.slice(10).trim()||void 0;continue}if(F.startsWith("## ")){const L=F.slice(3).trim();if(L.toLowerCase()==="groups"){X=!0,B=null;continue}const R=L.split("|").map(C=>C.trim());R.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(R[1])?(X=!1,B={id:R[0].toLowerCase().replace(/\s+/g,"-"),label:R[0],date:R[1],activities:[]},H.push(B)):X=!1;continue}if(X){const L=F.split("|").map(R=>R.trim());if(L.length>=4){const R=L[4]||void 0;k.push({id:L[0],label:L[1],bgClass:L[2],textClass:L[3],...R?{description:R}:{}})}continue}if(B){if(/^\d{2}:\d{2}/.test(F)){const L=by(F);L&&B.activities.push(L)}else if(/^break\s*\|/.test(F)){const L=F.slice(F.indexOf("|")+1).trim();B.activities.push({type:"break",label:L})}}}return{id:r,name:s,...f?{subtitle:f}:{},...h?{link:h}:{},...y?{organizer:y}:{},...S?{track:S}:{},...m?{city:m}:{},...v?{configuration:v}:{},..._?{direction:_}:{},runGroups:k,days:H}}function by(r){const c=r.split("|").map(S=>S.trim()),d=c[0],s=c.slice(1),f=d.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!f)return null;const h=f[1],y=f[2].trim();if(/^(general|lunch|special)$/.test(y)){const S=y,m=s[0]??"",v=s[1]||void 0;return{time:h,type:S,label:m,...v?{subtitle:v}:{}}}if(/^session/.test(y)){const S=y.match(/^session\s+(\d+)/),m=S?parseInt(S[1],10):void 0;let v=[],_=[],k;for(const H of s)H.startsWith("track:")?v=H.slice(6).trim().split(",").map(B=>B.trim()).filter(Boolean):H.startsWith("class:")?_=H.slice(6).trim().split(",").map(B=>B.trim()).filter(Boolean):H.startsWith("note:")&&(k=H.slice(5).trim()||void 0);return{time:h,type:"session",...m!==void 0?{sessionNumber:m}:{},onTrack:v,..._.length?{inClass:_}:{},...k?{note:k}:{}}}return null}const wy=`# TDE at MSRC 1.7CW

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
`,cu="/hpde/pr-preview/pr-198/assets/msrc-1-7-D9G0r_nf.jpg",Sy={...La("2026-09-11_msrc-1-7",wy),mapImage:cu},xy=`# SCCA at MSRC 1.7 CW

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
`,Ey={...La("2026-09-13_msr-scca",xy),mapImage:cu},Ty=`# TDE at MSRC 1.7 Fast Track

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
`,Ny={...La("2026-06-06_msrc-1-7",Ty),mapImage:cu},Cy=`# TDE at MSRC 3.1

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
`,Ay="/hpde/pr-preview/pr-198/assets/msrc-3-1-BsOP6CK2.png",_y={...La("2025-11-07_msrc-3-1",Cy),mapImage:Ay},My=`# TDE at ECR 2.7

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
`,Dy="/hpde/pr-preview/pr-198/assets/ecr-BW_3Ndfh.png",Ry={...La("2026-05-30_ecr-2-7",My),mapImage:Dy},ky=`# Test Event

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
`,lg=La("test-live",ky),Oy={...lg,days:lg.days.map(r=>({...r,date:Jn()}))},Fn=[Sy,Ey,Ny,Ry,_y].sort((r,c)=>c.id.localeCompare(r.id)),ig=[...Fn,Oy],zy=["January","February","March","April","May","June","July","August","September","October","November","December"],Uy=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],og="minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1.6fr) minmax(0, 1.6fr)",Hy=4;function sg(r){return(r.getDay()+6)%7}function jy(r,c,d){return`${r}-${String(c+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`}function By({events:r,onOpenEvent:c}){const d=new Date,[s,f]=lt.useState({year:d.getFullYear(),month:d.getMonth()}),h=Jn(),y=new Map;for(const C of r)for(const G of C.days){const at=y.get(G.date)??[];at.push(C),y.set(G.date,at)}const S=new Date(s.year,s.month,1),m=sg(S),v=new Date(s.year,s.month+1,0),_=6-sg(v),k=m+v.getDate()+_,H=new Date(s.year,s.month,1-m),B=[];for(let C=0;C<k;C++){const G=new Date(H.getFullYear(),H.getMonth(),H.getDate()+C);B.push({date:G,iso:jy(G.getFullYear(),G.getMonth(),G.getDate()),inMonth:G.getMonth()===s.month})}const X=[];for(let C=0;C<B.length;C+=7)X.push(B.slice(C,C+7));function I(){f(C=>C.month===0?{year:C.year-1,month:11}:{year:C.year,month:C.month-1})}function F(){f(C=>C.month===11?{year:C.year+1,month:0}:{year:C.year,month:C.month+1})}function L(){f({year:d.getFullYear(),month:d.getMonth()})}const R=s.year===d.getFullYear()&&s.month===d.getMonth();return g.jsxs("div",{children:[g.jsxs("div",{className:"mb-3 flex items-center justify-between gap-2",children:[g.jsxs("div",{className:"flex items-center gap-1",children:[g.jsx("button",{onClick:I,"aria-label":"Previous month",className:"grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400",children:g.jsx(pg,{size:18})}),g.jsx("button",{onClick:F,"aria-label":"Next month",className:"grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400",children:g.jsx(hp,{size:18})})]}),g.jsxs("div",{className:"text-sm font-semibold text-gray-900",children:[zy[s.month]," ",s.year]}),g.jsx("button",{onClick:L,disabled:R,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${R?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Today"})]}),g.jsxs("div",{className:"overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm",children:[g.jsx("div",{className:"grid border-b border-gray-200 text-center text-[10px] font-semibold uppercase tracking-wide",style:{gridTemplateColumns:og},children:Uy.map((C,G)=>g.jsx("div",{className:`py-1.5 ${G>=Hy?"text-gray-600":"text-gray-400"}`,children:C},C))}),g.jsx("div",{className:"divide-y divide-gray-200",children:X.map((C,G)=>g.jsx("div",{className:"grid divide-x divide-gray-200",style:{gridTemplateColumns:og},children:C.map((at,q)=>{const j=y.get(at.iso)??[],Q=at.iso===h;return g.jsxs("div",{className:`min-h-[80px] p-1 ${at.inMonth?"bg-white":"bg-gray-50/60"}`,children:[g.jsx("div",{className:`mb-1 text-right text-[10px] font-medium ${at.inMonth?Q?"text-blue-600":"text-gray-500":"text-gray-300"}`,children:at.date.getDate()}),g.jsx("div",{className:"space-y-0.5",children:j.map((V,tt)=>g.jsx("button",{onClick:()=>c(V),className:"block w-full truncate rounded bg-blue-50 px-1 py-0.5 text-left text-[10px] font-medium text-blue-700 transition-colors hover:bg-blue-100",title:V.name,children:V.name},`${V.id}-${tt}`))})]},q)})},G))})]})]})}function _g(){return g.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[g.jsxs("div",{children:[g.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",g.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),g.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",kp("2026-09-20T01:06:18-05:00")]})]})}function Ly(r,c){const[d,s]=lt.useState(()=>{try{const f=localStorage.getItem(r);return f!==null?JSON.parse(f):c}catch{return c}});return lt.useEffect(()=>{localStorage.setItem(r,JSON.stringify(d))},[r,d]),[d,s]}function Gy(){return g.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[g.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function rg({event:r,muted:c,live:d,onClick:s}){return g.jsxs("button",{onClick:s,className:`w-full rounded-xl border p-3 text-left transition-colors ${c?"border-gray-200 bg-white hover:border-gray-300":"border-gray-200 bg-white shadow-sm hover:border-gray-400"}`,children:[g.jsxs("div",{className:"flex items-center",children:[g.jsx("span",{className:`text-sm font-semibold ${c?"text-gray-700":"text-gray-900"}`,children:r.name}),d&&g.jsx(Gy,{})]}),g.jsx("div",{className:"text-xs text-gray-500",children:ou(r)})]})}function Yy({onOpenEvent:r}){const[c,d]=Ly("hpde:landingView","list"),{live:s,upcoming:f,past:h}=ru(Fn),y=[...s,...f];return g.jsxs("div",{className:"min-h-screen bg-gray-50",children:[g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[g.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:"HPDE Schedule"}),g.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[g.jsx("button",{onClick:()=>d("list"),className:`rounded-md p-2 transition-colors ${c==="list"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},"aria-label":"List view",children:g.jsx(vp,{size:18})}),g.jsx("button",{onClick:()=>d("calendar"),className:`rounded-md p-2 transition-colors ${c==="calendar"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},"aria-label":"Calendar view",children:g.jsx(gg,{size:18})})]})]}),c==="list"?g.jsxs("div",{className:"space-y-6",children:[g.jsxs("section",{children:[g.jsx("h2",{className:"mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500",children:"Upcoming"}),y.length===0?g.jsx("div",{className:"rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500",children:"No upcoming events."}):g.jsx("div",{className:"space-y-2",children:y.map(S=>g.jsx(rg,{event:S,muted:!1,live:s.includes(S),onClick:()=>r(S)},S.id))})]}),g.jsxs("section",{children:[g.jsx("h2",{className:"mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500",children:"Past"}),h.length===0?g.jsx("div",{className:"rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500",children:"No past events."}):g.jsx("div",{className:"space-y-2",children:h.map(S=>g.jsx(rg,{event:S,muted:!0,live:!1,onClick:()=>r(S)},S.id))})]})]}):g.jsx(By,{events:Fn,onOpenEvent:r})]}),g.jsx(_g,{})]})}const qy=350,Vy="cubic-bezier(0.32, 0.72, 0, 1)";function Xy({open:r,onExited:c,scrollRef:d,children:s,skipEnterAnimation:f}){const[h,y]=lt.useState(()=>r&&!!f),S=lt.useRef(!0);return lt.useEffect(()=>{if(!(S.current&&(S.current=!1,f))){if(r){const m=requestAnimationFrame(()=>y(!0));return()=>cancelAnimationFrame(m)}y(!1)}},[r]),g.jsx("div",{ref:d,className:"fixed inset-0 z-30 overflow-x-hidden overflow-y-auto bg-gray-50",style:{transform:`translateX(${h?"0":"100%"})`,transition:`transform ${qy}ms ${Vy}`,willChange:"transform",boxShadow:"-8px 0 32px -8px rgba(0, 0, 0, 0.18)"},onTransitionEnd:m=>{m.propertyName==="transform"&&!h&&!r&&(c==null||c())},children:s})}function no(r,c){const[d,s]=lt.useState(()=>{try{const f=localStorage.getItem(r);return f!==null?JSON.parse(f):c}catch{return c}});return lt.useEffect(()=>{localStorage.setItem(r,JSON.stringify(d))},[r,d]),[d,s]}function Mg(r){const c=Jn();return r.days.find(d=>d.date===c)}function ug(r){return Mg(r)??r.days[0]}function Qy(){const[r,c]=lt.useState(()=>window.location.hash);lt.useEffect(()=>{const s=()=>{c(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",s),()=>window.removeEventListener("hashchange",s)},[]);function d(s){window.location.hash!==s&&(window.location.hash=s)}return[r,d]}const lu="#/event/",cg="#/";function fg(r){return`${lu}${encodeURIComponent(r)}`}function dg(r){return r.startsWith(lu)?decodeURIComponent(r.slice(lu.length)):null}function Zy(r){return r===""||r==="#"}function Ky(){const[r,c]=Qy(),[d,s]=no("hpde:activeEvent",Fn[0].id),[f,h]=no("hpde:activeDay",null),[y,S]=no("hpde:groups",[]),[m,v]=no("hpde:hidePast",!1),[_,k]=lt.useState(!1),H=lt.useRef(null),B=lt.useRef(!0),X=dg(r)!==null,[I,F]=lt.useState(X);lt.useEffect(()=>{X&&F(!0)},[X]);const L=ig.find(Y=>Y.id===d)??Fn[0],R=L.days.find(Y=>Y.id===f)??ug(L),C=Mg(L),G=R.date===Jn(),at=L.days.length>1,j=L.days.reduce((Y,J)=>J.date>Y?J.date:Y,L.days[0].date)<Jn(),[,Q]=lt.useState(0);lt.useEffect(()=>{if(!G)return;const Y=setInterval(()=>Q(J=>J+1),6e4);return()=>clearInterval(Y)},[G]);const V=G&&R.activities.some(Y=>Y.type!=="break"&&en(Y.time)<su());function tt(Y){B.current=!1,s(Y.id),h(ug(Y).id),S([]),c(fg(Y.id))}function W(){c(cg)}return lt.useEffect(()=>{const Y=dg(r);if(Y){const J=ig.find(it=>it.id===Y);J&&J.id!==d&&tt(J);return}if(Zy(r)){const{live:J}=ru(Fn);c(J.length>0?fg(J[0].id):cg)}},[r]),r==="#/widget-script"?g.jsx(Yp,{}):r==="#/share"?g.jsx(fy,{}):g.jsxs(g.Fragment,{children:[g.jsx(Ah,{disabled:I,children:g.jsx(Yy,{onOpenEvent:tt})}),I&&g.jsxs(Xy,{open:X,onExited:()=>F(!1),scrollRef:H,skipEnterAnimation:B.current,children:[g.jsx(Ah,{disabled:_||!X,scrollContainerRef:H,children:g.jsxs("div",{className:"min-h-screen bg-gray-50",children:[g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[g.jsxs("div",{className:"flex min-w-0 items-start gap-1",children:[g.jsx("button",{onClick:W,"aria-label":"Home",className:"inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900",children:g.jsx(vg,{size:18})}),g.jsx(jp,{events:Fn,active:L,onChange:tt,onGoHome:W})]}),g.jsx("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:g.jsx("button",{onClick:()=>k(!0),"aria-label":"Event details",className:"rounded-md p-2 text-gray-400 transition-colors hover:text-gray-600",style:{minWidth:36,minHeight:36},children:g.jsx(pp,{size:18})})})]}),j&&g.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),at&&g.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[g.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:L.days.map(Y=>g.jsx("button",{onClick:()=>h(Y.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${R.id===Y.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:Y.label},Y.id))}),g.jsx("button",{onClick:()=>C&&h(C.id),disabled:G||!C,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${G||!C?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx(Hp,{groups:L.runGroups,selected:y,onChange:S}),V&&g.jsx(Bp,{checked:m,onChange:()=>v(Y=>!Y),label:"Hide past activities"})]}),g.jsx(Up,{activities:R.activities,runGroups:L.runGroups,isToday:G,selectedGroups:y,hidePast:m}),g.jsx(Gp,{groups:L.runGroups})]}),g.jsx(_g,{})]})}),g.jsx(vy,{event:L,open:_,onClose:()=>k(!1)})]})]})}up.createRoot(document.getElementById("root")).render(g.jsx(lt.StrictMode,{children:g.jsx(Ky,{})}));
