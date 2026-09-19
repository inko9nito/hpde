(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))o(f);new MutationObserver(f=>{for(const h of f)if(h.type==="childList")for(const y of h.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&o(y)}).observe(document,{childList:!0,subtree:!0});function d(f){const h={};return f.integrity&&(h.integrity=f.integrity),f.referrerPolicy&&(h.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?h.credentials="include":f.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(f){if(f.ep)return;f.ep=!0;const h=d(f);fetch(f.href,h)}})();function W0(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Er={exports:{}},kl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gh;function P0(){if(gh)return kl;gh=1;var r=Symbol.for("react.transitional.element"),c=Symbol.for("react.fragment");function d(o,f,h){var y=null;if(h!==void 0&&(y=""+h),f.key!==void 0&&(y=""+f.key),"key"in f){h={};for(var S in f)S!=="key"&&(h[S]=f[S])}else h=f;return f=h.ref,{$$typeof:r,type:o,key:y,ref:f!==void 0?f:null,props:h}}return kl.Fragment=c,kl.jsx=d,kl.jsxs=d,kl}var mh;function tp(){return mh||(mh=1,Er.exports=P0()),Er.exports}var g=tp(),Nr={exports:{}},ut={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ph;function ep(){if(ph)return ut;ph=1;var r=Symbol.for("react.transitional.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),y=Symbol.for("react.context"),S=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),k=Symbol.for("react.lazy"),C=Symbol.for("react.activity"),H=Symbol.iterator;function B(w){return w===null||typeof w!="object"?null:(w=H&&w[H]||w["@@iterator"],typeof w=="function"?w:null)}var K={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},L=Object.assign,j={};function G(w,U,Q){this.props=w,this.context=U,this.refs=j,this.updater=Q||K}G.prototype.isReactComponent={},G.prototype.setState=function(w,U){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,U,"setState")},G.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function z(){}z.prototype=G.prototype;function D(w,U,Q){this.props=w,this.context=U,this.refs=j,this.updater=Q||K}var Y=D.prototype=new z;Y.constructor=D,L(Y,G.prototype),Y.isPureReactComponent=!0;var F=Array.isArray;function X(){}var q={H:null,A:null,T:null,S:null},J=Object.prototype.hasOwnProperty;function I(w,U,Q){var tt=Q.ref;return{$$typeof:r,type:w,key:U,ref:tt!==void 0?tt:null,props:Q}}function at(w,U){return I(w.type,U,w.props)}function P(w){return typeof w=="object"&&w!==null&&w.$$typeof===r}function $(w){var U={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(Q){return U[Q]})}var V=/\/+/g;function et(w,U){return typeof w=="object"&&w!==null&&w.key!=null?$(""+w.key):U.toString(36)}function Ut(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(X,X):(w.status="pending",w.then(function(U){w.status==="pending"&&(w.status="fulfilled",w.value=U)},function(U){w.status==="pending"&&(w.status="rejected",w.reason=U)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function _(w,U,Q,tt,rt){var dt=typeof w;(dt==="undefined"||dt==="boolean")&&(w=null);var ht=!1;if(w===null)ht=!0;else switch(dt){case"bigint":case"string":case"number":ht=!0;break;case"object":switch(w.$$typeof){case r:case c:ht=!0;break;case k:return ht=w._init,_(ht(w._payload),U,Q,tt,rt)}}if(ht)return rt=rt(w),ht=tt===""?"."+et(w,0):tt,F(rt)?(Q="",ht!=null&&(Q=ht.replace(V,"$&/")+"/"),_(rt,U,Q,"",function(je){return je})):rt!=null&&(P(rt)&&(rt=at(rt,Q+(rt.key==null||w&&w.key===rt.key?"":(""+rt.key).replace(V,"$&/")+"/")+ht)),U.push(rt)),1;ht=0;var Rt=tt===""?".":tt+":";if(F(w))for(var At=0;At<w.length;At++)tt=w[At],dt=Rt+et(tt,At),ht+=_(tt,U,Q,dt,rt);else if(At=B(w),typeof At=="function")for(w=At.call(w),At=0;!(tt=w.next()).done;)tt=tt.value,dt=Rt+et(tt,At++),ht+=_(tt,U,Q,dt,rt);else if(dt==="object"){if(typeof w.then=="function")return _(Ut(w),U,Q,tt,rt);throw U=String(w),Error("Objects are not valid as a React child (found: "+(U==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":U)+"). If you meant to render a collection of children, use an array instead.")}return ht}function Z(w,U,Q){if(w==null)return w;var tt=[],rt=0;return _(w,tt,"","",function(dt){return U.call(Q,dt,rt++)}),tt}function it(w){if(w._status===-1){var U=w._result;U=U(),U.then(function(Q){(w._status===0||w._status===-1)&&(w._status=1,w._result=Q)},function(Q){(w._status===0||w._status===-1)&&(w._status=2,w._result=Q)}),w._status===-1&&(w._status=0,w._result=U)}if(w._status===1)return w._result.default;throw w._result}var Tt=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var U=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(U))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},St={map:Z,forEach:function(w,U,Q){Z(w,function(){U.apply(this,arguments)},Q)},count:function(w){var U=0;return Z(w,function(){U++}),U},toArray:function(w){return Z(w,function(U){return U})||[]},only:function(w){if(!P(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return ut.Activity=C,ut.Children=St,ut.Component=G,ut.Fragment=d,ut.Profiler=f,ut.PureComponent=D,ut.StrictMode=o,ut.Suspense=m,ut.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=q,ut.__COMPILER_RUNTIME={__proto__:null,c:function(w){return q.H.useMemoCache(w)}},ut.cache=function(w){return function(){return w.apply(null,arguments)}},ut.cacheSignal=function(){return null},ut.cloneElement=function(w,U,Q){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var tt=L({},w.props),rt=w.key;if(U!=null)for(dt in U.key!==void 0&&(rt=""+U.key),U)!J.call(U,dt)||dt==="key"||dt==="__self"||dt==="__source"||dt==="ref"&&U.ref===void 0||(tt[dt]=U[dt]);var dt=arguments.length-2;if(dt===1)tt.children=Q;else if(1<dt){for(var ht=Array(dt),Rt=0;Rt<dt;Rt++)ht[Rt]=arguments[Rt+2];tt.children=ht}return I(w.type,rt,tt)},ut.createContext=function(w){return w={$$typeof:y,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:h,_context:w},w},ut.createElement=function(w,U,Q){var tt,rt={},dt=null;if(U!=null)for(tt in U.key!==void 0&&(dt=""+U.key),U)J.call(U,tt)&&tt!=="key"&&tt!=="__self"&&tt!=="__source"&&(rt[tt]=U[tt]);var ht=arguments.length-2;if(ht===1)rt.children=Q;else if(1<ht){for(var Rt=Array(ht),At=0;At<ht;At++)Rt[At]=arguments[At+2];rt.children=Rt}if(w&&w.defaultProps)for(tt in ht=w.defaultProps,ht)rt[tt]===void 0&&(rt[tt]=ht[tt]);return I(w,dt,rt)},ut.createRef=function(){return{current:null}},ut.forwardRef=function(w){return{$$typeof:S,render:w}},ut.isValidElement=P,ut.lazy=function(w){return{$$typeof:k,_payload:{_status:-1,_result:w},_init:it}},ut.memo=function(w,U){return{$$typeof:v,type:w,compare:U===void 0?null:U}},ut.startTransition=function(w){var U=q.T,Q={};q.T=Q;try{var tt=w(),rt=q.S;rt!==null&&rt(Q,tt),typeof tt=="object"&&tt!==null&&typeof tt.then=="function"&&tt.then(X,Tt)}catch(dt){Tt(dt)}finally{U!==null&&Q.types!==null&&(U.types=Q.types),q.T=U}},ut.unstable_useCacheRefresh=function(){return q.H.useCacheRefresh()},ut.use=function(w){return q.H.use(w)},ut.useActionState=function(w,U,Q){return q.H.useActionState(w,U,Q)},ut.useCallback=function(w,U){return q.H.useCallback(w,U)},ut.useContext=function(w){return q.H.useContext(w)},ut.useDebugValue=function(){},ut.useDeferredValue=function(w,U){return q.H.useDeferredValue(w,U)},ut.useEffect=function(w,U){return q.H.useEffect(w,U)},ut.useEffectEvent=function(w){return q.H.useEffectEvent(w)},ut.useId=function(){return q.H.useId()},ut.useImperativeHandle=function(w,U,Q){return q.H.useImperativeHandle(w,U,Q)},ut.useInsertionEffect=function(w,U){return q.H.useInsertionEffect(w,U)},ut.useLayoutEffect=function(w,U){return q.H.useLayoutEffect(w,U)},ut.useMemo=function(w,U){return q.H.useMemo(w,U)},ut.useOptimistic=function(w,U){return q.H.useOptimistic(w,U)},ut.useReducer=function(w,U,Q){return q.H.useReducer(w,U,Q)},ut.useRef=function(w){return q.H.useRef(w)},ut.useState=function(w){return q.H.useState(w)},ut.useSyncExternalStore=function(w,U,Q){return q.H.useSyncExternalStore(w,U,Q)},ut.useTransition=function(){return q.H.useTransition()},ut.version="19.2.6",ut}var yh;function lu(){return yh||(yh=1,Nr.exports=ep()),Nr.exports}var ot=lu(),Ar={exports:{}},zl={},Cr={exports:{}},_r={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vh;function np(){return vh||(vh=1,(function(r){function c(_,Z){var it=_.length;_.push(Z);t:for(;0<it;){var Tt=it-1>>>1,St=_[Tt];if(0<f(St,Z))_[Tt]=Z,_[it]=St,it=Tt;else break t}}function d(_){return _.length===0?null:_[0]}function o(_){if(_.length===0)return null;var Z=_[0],it=_.pop();if(it!==Z){_[0]=it;t:for(var Tt=0,St=_.length,w=St>>>1;Tt<w;){var U=2*(Tt+1)-1,Q=_[U],tt=U+1,rt=_[tt];if(0>f(Q,it))tt<St&&0>f(rt,Q)?(_[Tt]=rt,_[tt]=it,Tt=tt):(_[Tt]=Q,_[U]=it,Tt=U);else if(tt<St&&0>f(rt,it))_[Tt]=rt,_[tt]=it,Tt=tt;else break t}}return Z}function f(_,Z){var it=_.sortIndex-Z.sortIndex;return it!==0?it:_.id-Z.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;r.unstable_now=function(){return h.now()}}else{var y=Date,S=y.now();r.unstable_now=function(){return y.now()-S}}var m=[],v=[],k=1,C=null,H=3,B=!1,K=!1,L=!1,j=!1,G=typeof setTimeout=="function"?setTimeout:null,z=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;function Y(_){for(var Z=d(v);Z!==null;){if(Z.callback===null)o(v);else if(Z.startTime<=_)o(v),Z.sortIndex=Z.expirationTime,c(m,Z);else break;Z=d(v)}}function F(_){if(L=!1,Y(_),!K)if(d(m)!==null)K=!0,X||(X=!0,$());else{var Z=d(v);Z!==null&&Ut(F,Z.startTime-_)}}var X=!1,q=-1,J=5,I=-1;function at(){return j?!0:!(r.unstable_now()-I<J)}function P(){if(j=!1,X){var _=r.unstable_now();I=_;var Z=!0;try{t:{K=!1,L&&(L=!1,z(q),q=-1),B=!0;var it=H;try{e:{for(Y(_),C=d(m);C!==null&&!(C.expirationTime>_&&at());){var Tt=C.callback;if(typeof Tt=="function"){C.callback=null,H=C.priorityLevel;var St=Tt(C.expirationTime<=_);if(_=r.unstable_now(),typeof St=="function"){C.callback=St,Y(_),Z=!0;break e}C===d(m)&&o(m),Y(_)}else o(m);C=d(m)}if(C!==null)Z=!0;else{var w=d(v);w!==null&&Ut(F,w.startTime-_),Z=!1}}break t}finally{C=null,H=it,B=!1}Z=void 0}}finally{Z?$():X=!1}}}var $;if(typeof D=="function")$=function(){D(P)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,et=V.port2;V.port1.onmessage=P,$=function(){et.postMessage(null)}}else $=function(){G(P,0)};function Ut(_,Z){q=G(function(){_(r.unstable_now())},Z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(_){_.callback=null},r.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):J=0<_?Math.floor(1e3/_):5},r.unstable_getCurrentPriorityLevel=function(){return H},r.unstable_next=function(_){switch(H){case 1:case 2:case 3:var Z=3;break;default:Z=H}var it=H;H=Z;try{return _()}finally{H=it}},r.unstable_requestPaint=function(){j=!0},r.unstable_runWithPriority=function(_,Z){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var it=H;H=_;try{return Z()}finally{H=it}},r.unstable_scheduleCallback=function(_,Z,it){var Tt=r.unstable_now();switch(typeof it=="object"&&it!==null?(it=it.delay,it=typeof it=="number"&&0<it?Tt+it:Tt):it=Tt,_){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=it+St,_={id:k++,callback:Z,priorityLevel:_,startTime:it,expirationTime:St,sortIndex:-1},it>Tt?(_.sortIndex=it,c(v,_),d(m)===null&&_===d(v)&&(L?(z(q),q=-1):L=!0,Ut(F,it-Tt))):(_.sortIndex=St,c(m,_),K||B||(K=!0,X||(X=!0,$()))),_},r.unstable_shouldYield=at,r.unstable_wrapCallback=function(_){var Z=H;return function(){var it=H;H=Z;try{return _.apply(this,arguments)}finally{H=it}}}})(_r)),_r}var bh;function ap(){return bh||(bh=1,Cr.exports=np()),Cr.exports}var Mr={exports:{}},Pt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wh;function lp(){if(wh)return Pt;wh=1;var r=lu();function c(m){var v="https://react.dev/errors/"+m;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var k=2;k<arguments.length;k++)v+="&args[]="+encodeURIComponent(arguments[k])}return"Minified React error #"+m+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(){}var o={d:{f:d,r:function(){throw Error(c(522))},D:d,C:d,L:d,m:d,X:d,S:d,M:d},p:0,findDOMNode:null},f=Symbol.for("react.portal");function h(m,v,k){var C=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:f,key:C==null?null:""+C,children:m,containerInfo:v,implementation:k}}var y=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function S(m,v){if(m==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,Pt.createPortal=function(m,v){var k=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(c(299));return h(m,v,null,k)},Pt.flushSync=function(m){var v=y.T,k=o.p;try{if(y.T=null,o.p=2,m)return m()}finally{y.T=v,o.p=k,o.d.f()}},Pt.preconnect=function(m,v){typeof m=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,o.d.C(m,v))},Pt.prefetchDNS=function(m){typeof m=="string"&&o.d.D(m)},Pt.preinit=function(m,v){if(typeof m=="string"&&v&&typeof v.as=="string"){var k=v.as,C=S(k,v.crossOrigin),H=typeof v.integrity=="string"?v.integrity:void 0,B=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;k==="style"?o.d.S(m,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:C,integrity:H,fetchPriority:B}):k==="script"&&o.d.X(m,{crossOrigin:C,integrity:H,fetchPriority:B,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},Pt.preinitModule=function(m,v){if(typeof m=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var k=S(v.as,v.crossOrigin);o.d.M(m,{crossOrigin:k,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&o.d.M(m)},Pt.preload=function(m,v){if(typeof m=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var k=v.as,C=S(k,v.crossOrigin);o.d.L(m,k,{crossOrigin:C,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},Pt.preloadModule=function(m,v){if(typeof m=="string")if(v){var k=S(v.as,v.crossOrigin);o.d.m(m,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:k,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else o.d.m(m)},Pt.requestFormReset=function(m){o.d.r(m)},Pt.unstable_batchedUpdates=function(m,v){return m(v)},Pt.useFormState=function(m,v,k){return y.H.useFormState(m,v,k)},Pt.useFormStatus=function(){return y.H.useHostTransitionStatus()},Pt.version="19.2.6",Pt}var Sh;function ip(){if(Sh)return Mr.exports;Sh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(c){console.error(c)}}return r(),Mr.exports=lp(),Mr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xh;function sp(){if(xh)return zl;xh=1;var r=ap(),c=lu(),d=ip();function o(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function h(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function y(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function S(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function m(t){if(h(t)!==t)throw Error(o(188))}function v(t){var e=t.alternate;if(!e){if(e=h(t),e===null)throw Error(o(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return m(l),t;if(i===a)return m(l),e;i=i.sibling}throw Error(o(188))}if(n.return!==a.return)n=l,a=i;else{for(var s=!1,u=l.child;u;){if(u===n){s=!0,n=l,a=i;break}if(u===a){s=!0,a=l,n=i;break}u=u.sibling}if(!s){for(u=i.child;u;){if(u===n){s=!0,n=i,a=l;break}if(u===a){s=!0,a=i,n=l;break}u=u.sibling}if(!s)throw Error(o(189))}}if(n.alternate!==a)throw Error(o(190))}if(n.tag!==3)throw Error(o(188));return n.stateNode.current===n?t:e}function k(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=k(t),e!==null)return e;t=t.sibling}return null}var C=Object.assign,H=Symbol.for("react.element"),B=Symbol.for("react.transitional.element"),K=Symbol.for("react.portal"),L=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),G=Symbol.for("react.profiler"),z=Symbol.for("react.consumer"),D=Symbol.for("react.context"),Y=Symbol.for("react.forward_ref"),F=Symbol.for("react.suspense"),X=Symbol.for("react.suspense_list"),q=Symbol.for("react.memo"),J=Symbol.for("react.lazy"),I=Symbol.for("react.activity"),at=Symbol.for("react.memo_cache_sentinel"),P=Symbol.iterator;function $(t){return t===null||typeof t!="object"?null:(t=P&&t[P]||t["@@iterator"],typeof t=="function"?t:null)}var V=Symbol.for("react.client.reference");function et(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===V?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case L:return"Fragment";case G:return"Profiler";case j:return"StrictMode";case F:return"Suspense";case X:return"SuspenseList";case I:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case K:return"Portal";case D:return t.displayName||"Context";case z:return(t._context.displayName||"Context")+".Consumer";case Y:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case q:return e=t.displayName||null,e!==null?e:et(t.type)||"Memo";case J:e=t._payload,t=t._init;try{return et(t(e))}catch{}}return null}var Ut=Array.isArray,_=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,it={pending:!1,data:null,method:null,action:null},Tt=[],St=-1;function w(t){return{current:t}}function U(t){0>St||(t.current=Tt[St],Tt[St]=null,St--)}function Q(t,e){St++,Tt[St]=t.current,t.current=e}var tt=w(null),rt=w(null),dt=w(null),ht=w(null);function Rt(t,e){switch(Q(dt,e),Q(rt,t),Q(tt,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Hd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Hd(e),t=Bd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}U(tt),Q(tt,t)}function At(){U(tt),U(rt),U(dt)}function je(t){t.memoizedState!==null&&Q(ht,t);var e=tt.current,n=Bd(e,t.type);e!==n&&(Q(rt,t),Q(tt,n))}function jl(t){rt.current===t&&(U(tt),U(rt)),ht.current===t&&(U(ht),_l._currentValue=it)}var is,du;function Mn(t){if(is===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);is=e&&e[1]||"",du=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+is+t+du}var ss=!1;function os(t,e){if(!t||ss)return"";ss=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var O=function(){throw Error()};if(Object.defineProperty(O.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(O,[])}catch(A){var N=A}Reflect.construct(t,[],O)}else{try{O.call()}catch(A){N=A}t.call(O.prototype)}}else{try{throw Error()}catch(A){N=A}(O=t())&&typeof O.catch=="function"&&O.catch(function(){})}}catch(A){if(A&&N&&typeof A.stack=="string")return[A.stack,N.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),s=i[0],u=i[1];if(s&&u){var p=s.split(`
`),E=u.split(`
`);for(l=a=0;a<p.length&&!p[a].includes("DetermineComponentFrameRoot");)a++;for(;l<E.length&&!E[l].includes("DetermineComponentFrameRoot");)l++;if(a===p.length||l===E.length)for(a=p.length-1,l=E.length-1;1<=a&&0<=l&&p[a]!==E[l];)l--;for(;1<=a&&0<=l;a--,l--)if(p[a]!==E[l]){if(a!==1||l!==1)do if(a--,l--,0>l||p[a]!==E[l]){var M=`
`+p[a].replace(" at new "," at ");return t.displayName&&M.includes("<anonymous>")&&(M=M.replace("<anonymous>",t.displayName)),M}while(1<=a&&0<=l);break}}}finally{ss=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Mn(n):""}function Mg(t,e){switch(t.tag){case 26:case 27:case 5:return Mn(t.type);case 16:return Mn("Lazy");case 13:return t.child!==e&&e!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return os(t.type,!1);case 11:return os(t.type.render,!1);case 1:return os(t.type,!0);case 31:return Mn("Activity");default:return""}}function hu(t){try{var e="",n=null;do e+=Mg(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var rs=Object.prototype.hasOwnProperty,us=r.unstable_scheduleCallback,cs=r.unstable_cancelCallback,Dg=r.unstable_shouldYield,Rg=r.unstable_requestPaint,re=r.unstable_now,kg=r.unstable_getCurrentPriorityLevel,gu=r.unstable_ImmediatePriority,mu=r.unstable_UserBlockingPriority,Hl=r.unstable_NormalPriority,zg=r.unstable_LowPriority,pu=r.unstable_IdlePriority,Og=r.log,Ug=r.unstable_setDisableYieldValue,Ya=null,ue=null;function nn(t){if(typeof Og=="function"&&Ug(t),ue&&typeof ue.setStrictMode=="function")try{ue.setStrictMode(Ya,t)}catch{}}var ce=Math.clz32?Math.clz32:Bg,jg=Math.log,Hg=Math.LN2;function Bg(t){return t>>>=0,t===0?32:31-(jg(t)/Hg|0)|0}var Bl=256,Ll=262144,Yl=4194304;function Dn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ql(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,s=t.pingedLanes;t=t.warmLanes;var u=a&134217727;return u!==0?(a=u&~i,a!==0?l=Dn(a):(s&=u,s!==0?l=Dn(s):n||(n=u&~t,n!==0&&(l=Dn(n))))):(u=a&~i,u!==0?l=Dn(u):s!==0?l=Dn(s):n||(n=a&~t,n!==0&&(l=Dn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function qa(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Lg(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yu(){var t=Yl;return Yl<<=1,(Yl&62914560)===0&&(Yl=4194304),t}function fs(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ga(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Yg(t,e,n,a,l,i){var s=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var u=t.entanglements,p=t.expirationTimes,E=t.hiddenUpdates;for(n=s&~n;0<n;){var M=31-ce(n),O=1<<M;u[M]=0,p[M]=-1;var N=E[M];if(N!==null)for(E[M]=null,M=0;M<N.length;M++){var A=N[M];A!==null&&(A.lane&=-536870913)}n&=~O}a!==0&&vu(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(s&~e))}function vu(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-ce(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function bu(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-ce(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function wu(t,e){var n=e&-e;return n=(n&42)!==0?1:ds(n),(n&(t.suspendedLanes|e))!==0?0:n}function ds(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function hs(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Su(){var t=Z.p;return t!==0?t:(t=window.event,t===void 0?32:oh(t.type))}function xu(t,e){var n=Z.p;try{return Z.p=t,e()}finally{Z.p=n}}var an=Math.random().toString(36).slice(2),It="__reactFiber$"+an,ee="__reactProps$"+an,Pn="__reactContainer$"+an,gs="__reactEvents$"+an,qg="__reactListeners$"+an,Gg="__reactHandles$"+an,Tu="__reactResources$"+an,Xa="__reactMarker$"+an;function ms(t){delete t[It],delete t[ee],delete t[gs],delete t[qg],delete t[Gg]}function ta(t){var e=t[It];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Pn]||n[It]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Qd(t);t!==null;){if(n=t[It])return n;t=Qd(t)}return e}t=n,n=t.parentNode}return null}function ea(t){if(t=t[It]||t[Pn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Va(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(o(33))}function na(t){var e=t[Tu];return e||(e=t[Tu]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Kt(t){t[Xa]=!0}var Eu=new Set,Nu={};function Rn(t,e){aa(t,e),aa(t+"Capture",e)}function aa(t,e){for(Nu[t]=e,t=0;t<e.length;t++)Eu.add(e[t])}var Xg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Au={},Cu={};function Vg(t){return rs.call(Cu,t)?!0:rs.call(Au,t)?!1:Xg.test(t)?Cu[t]=!0:(Au[t]=!0,!1)}function Gl(t,e,n){if(Vg(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Xl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function He(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ve(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function _u(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Qg(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(s){n=""+s,i.call(this,s)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ps(t){if(!t._valueTracker){var e=_u(t)?"checked":"value";t._valueTracker=Qg(t,e,""+t[e])}}function Mu(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=_u(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Vl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Kg=/[\n"\\]/g;function be(t){return t.replace(Kg,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function ys(t,e,n,a,l,i,s,u){t.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?t.type=s:t.removeAttribute("type"),e!=null?s==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ve(e)):t.value!==""+ve(e)&&(t.value=""+ve(e)):s!=="submit"&&s!=="reset"||t.removeAttribute("value"),e!=null?vs(t,s,ve(e)):n!=null?vs(t,s,ve(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.name=""+ve(u):t.removeAttribute("name")}function Du(t,e,n,a,l,i,s,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){ps(t);return}n=n!=null?""+ve(n):"",e=e!=null?""+ve(e):n,u||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=u?t.checked:!!a,t.defaultChecked=!!a,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.name=s),ps(t)}function vs(t,e,n){e==="number"&&Vl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function la(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ve(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function Ru(t,e,n){if(e!=null&&(e=""+ve(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ve(n):""}function ku(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(o(92));if(Ut(a)){if(1<a.length)throw Error(o(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ve(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),ps(t)}function ia(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Zg=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function zu(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||Zg.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Ou(t,e,n){if(e!=null&&typeof e!="object")throw Error(o(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&zu(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&zu(t,i,e[i])}function bs(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ig=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Jg=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ql(t){return Jg.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Be(){}var ws=null;function Ss(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var sa=null,oa=null;function Uu(t){var e=ea(t);if(e&&(t=e.stateNode)){var n=t[ee]||null;t:switch(t=e.stateNode,e.type){case"input":if(ys(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[ee]||null;if(!l)throw Error(o(90));ys(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&Mu(a)}break t;case"textarea":Ru(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&la(t,!!n.multiple,e,!1)}}}var xs=!1;function ju(t,e,n){if(xs)return t(e,n);xs=!0;try{var a=t(e);return a}finally{if(xs=!1,(sa!==null||oa!==null)&&(ki(),sa&&(e=sa,t=oa,oa=sa=null,Uu(e),t)))for(e=0;e<t.length;e++)Uu(t[e])}}function Qa(t,e){var n=t.stateNode;if(n===null)return null;var a=n[ee]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(o(231,e,typeof n));return n}var Le=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ts=!1;if(Le)try{var Ka={};Object.defineProperty(Ka,"passive",{get:function(){Ts=!0}}),window.addEventListener("test",Ka,Ka),window.removeEventListener("test",Ka,Ka)}catch{Ts=!1}var ln=null,Es=null,Kl=null;function Hu(){if(Kl)return Kl;var t,e=Es,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var s=n-t;for(a=1;a<=s&&e[n-a]===l[i-a];a++);return Kl=l.slice(t,1<a?1-a:void 0)}function Zl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Il(){return!0}function Bu(){return!1}function ne(t){function e(n,a,l,i,s){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(n=t[u],this[u]=n?n(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Il:Bu,this.isPropagationStopped=Bu,this}return C(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Il)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Il)},persist:function(){},isPersistent:Il}),e}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=ne(kn),Za=C({},kn,{view:0,detail:0}),Fg=ne(Za),Ns,As,Ia,Fl=C({},Za,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_s,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ia&&(Ia&&t.type==="mousemove"?(Ns=t.screenX-Ia.screenX,As=t.screenY-Ia.screenY):As=Ns=0,Ia=t),Ns)},movementY:function(t){return"movementY"in t?t.movementY:As}}),Lu=ne(Fl),$g=C({},Fl,{dataTransfer:0}),Wg=ne($g),Pg=C({},Za,{relatedTarget:0}),Cs=ne(Pg),tm=C({},kn,{animationName:0,elapsedTime:0,pseudoElement:0}),em=ne(tm),nm=C({},kn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),am=ne(nm),lm=C({},kn,{data:0}),Yu=ne(lm),im={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},om={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function rm(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=om[t])?!!e[t]:!1}function _s(){return rm}var um=C({},Za,{key:function(t){if(t.key){var e=im[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?sm[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_s,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),cm=ne(um),fm=C({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qu=ne(fm),dm=C({},Za,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_s}),hm=ne(dm),gm=C({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0}),mm=ne(gm),pm=C({},Fl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),ym=ne(pm),vm=C({},kn,{newState:0,oldState:0}),bm=ne(vm),wm=[9,13,27,32],Ms=Le&&"CompositionEvent"in window,Ja=null;Le&&"documentMode"in document&&(Ja=document.documentMode);var Sm=Le&&"TextEvent"in window&&!Ja,Gu=Le&&(!Ms||Ja&&8<Ja&&11>=Ja),Xu=" ",Vu=!1;function Qu(t,e){switch(t){case"keyup":return wm.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ku(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ra=!1;function xm(t,e){switch(t){case"compositionend":return Ku(e);case"keypress":return e.which!==32?null:(Vu=!0,Xu);case"textInput":return t=e.data,t===Xu&&Vu?null:t;default:return null}}function Tm(t,e){if(ra)return t==="compositionend"||!Ms&&Qu(t,e)?(t=Hu(),Kl=Es=ln=null,ra=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Gu&&e.locale!=="ko"?null:e.data;default:return null}}var Em={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Zu(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Em[t.type]:e==="textarea"}function Iu(t,e,n,a){sa?oa?oa.push(a):oa=[a]:sa=a,e=Li(e,"onChange"),0<e.length&&(n=new Jl("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Fa=null,$a=null;function Nm(t){Rd(t,0)}function $l(t){var e=Va(t);if(Mu(e))return t}function Ju(t,e){if(t==="change")return e}var Fu=!1;if(Le){var Ds;if(Le){var Rs="oninput"in document;if(!Rs){var $u=document.createElement("div");$u.setAttribute("oninput","return;"),Rs=typeof $u.oninput=="function"}Ds=Rs}else Ds=!1;Fu=Ds&&(!document.documentMode||9<document.documentMode)}function Wu(){Fa&&(Fa.detachEvent("onpropertychange",Pu),$a=Fa=null)}function Pu(t){if(t.propertyName==="value"&&$l($a)){var e=[];Iu(e,$a,t,Ss(t)),ju(Nm,e)}}function Am(t,e,n){t==="focusin"?(Wu(),Fa=e,$a=n,Fa.attachEvent("onpropertychange",Pu)):t==="focusout"&&Wu()}function Cm(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return $l($a)}function _m(t,e){if(t==="click")return $l(e)}function Mm(t,e){if(t==="input"||t==="change")return $l(e)}function Dm(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var fe=typeof Object.is=="function"?Object.is:Dm;function Wa(t,e){if(fe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!rs.call(e,l)||!fe(t[l],e[l]))return!1}return!0}function tc(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ec(t,e){var n=tc(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=tc(n)}}function nc(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?nc(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function ac(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Vl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Vl(t.document)}return e}function ks(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Rm=Le&&"documentMode"in document&&11>=document.documentMode,ua=null,zs=null,Pa=null,Os=!1;function lc(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Os||ua==null||ua!==Vl(a)||(a=ua,"selectionStart"in a&&ks(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Pa&&Wa(Pa,a)||(Pa=a,a=Li(zs,"onSelect"),0<a.length&&(e=new Jl("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=ua)))}function zn(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ca={animationend:zn("Animation","AnimationEnd"),animationiteration:zn("Animation","AnimationIteration"),animationstart:zn("Animation","AnimationStart"),transitionrun:zn("Transition","TransitionRun"),transitionstart:zn("Transition","TransitionStart"),transitioncancel:zn("Transition","TransitionCancel"),transitionend:zn("Transition","TransitionEnd")},Us={},ic={};Le&&(ic=document.createElement("div").style,"AnimationEvent"in window||(delete ca.animationend.animation,delete ca.animationiteration.animation,delete ca.animationstart.animation),"TransitionEvent"in window||delete ca.transitionend.transition);function On(t){if(Us[t])return Us[t];if(!ca[t])return t;var e=ca[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ic)return Us[t]=e[n];return t}var sc=On("animationend"),oc=On("animationiteration"),rc=On("animationstart"),km=On("transitionrun"),zm=On("transitionstart"),Om=On("transitioncancel"),uc=On("transitionend"),cc=new Map,js="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");js.push("scrollEnd");function _e(t,e){cc.set(t,e),Rn(e,[t])}var Wl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},we=[],fa=0,Hs=0;function Pl(){for(var t=fa,e=Hs=fa=0;e<t;){var n=we[e];we[e++]=null;var a=we[e];we[e++]=null;var l=we[e];we[e++]=null;var i=we[e];if(we[e++]=null,a!==null&&l!==null){var s=a.pending;s===null?l.next=l:(l.next=s.next,s.next=l),a.pending=l}i!==0&&fc(n,l,i)}}function ti(t,e,n,a){we[fa++]=t,we[fa++]=e,we[fa++]=n,we[fa++]=a,Hs|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Bs(t,e,n,a){return ti(t,e,n,a),ei(t)}function Un(t,e){return ti(t,null,null,e),ei(t)}function fc(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-ce(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function ei(t){if(50<Sl)throw Sl=0,Io=null,Error(o(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var da={};function Um(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function de(t,e,n,a){return new Um(t,e,n,a)}function Ls(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ye(t,e){var n=t.alternate;return n===null?(n=de(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function dc(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ni(t,e,n,a,l,i){var s=0;if(a=t,typeof t=="function")Ls(t)&&(s=1);else if(typeof t=="string")s=Y0(t,n,tt.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case I:return t=de(31,n,e,l),t.elementType=I,t.lanes=i,t;case L:return jn(n.children,l,i,e);case j:s=8,l|=24;break;case G:return t=de(12,n,e,l|2),t.elementType=G,t.lanes=i,t;case F:return t=de(13,n,e,l),t.elementType=F,t.lanes=i,t;case X:return t=de(19,n,e,l),t.elementType=X,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case D:s=10;break t;case z:s=9;break t;case Y:s=11;break t;case q:s=14;break t;case J:s=16,a=null;break t}s=29,n=Error(o(130,t===null?"null":typeof t,"")),a=null}return e=de(s,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function jn(t,e,n,a){return t=de(7,t,a,e),t.lanes=n,t}function Ys(t,e,n){return t=de(6,t,null,e),t.lanes=n,t}function hc(t){var e=de(18,null,null,0);return e.stateNode=t,e}function qs(t,e,n){return e=de(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var gc=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=gc.get(t);return n!==void 0?n:(e={value:t,source:e,stack:hu(e)},gc.set(t,e),e)}return{value:t,source:e,stack:hu(e)}}var ha=[],ga=0,ai=null,tl=0,xe=[],Te=0,sn=null,Re=1,ke="";function qe(t,e){ha[ga++]=tl,ha[ga++]=ai,ai=t,tl=e}function mc(t,e,n){xe[Te++]=Re,xe[Te++]=ke,xe[Te++]=sn,sn=t;var a=Re;t=ke;var l=32-ce(a)-1;a&=~(1<<l),n+=1;var i=32-ce(e)+l;if(30<i){var s=l-l%5;i=(a&(1<<s)-1).toString(32),a>>=s,l-=s,Re=1<<32-ce(e)+l|n<<l|a,ke=i+t}else Re=1<<i|n<<l|a,ke=t}function Gs(t){t.return!==null&&(qe(t,1),mc(t,1,0))}function Xs(t){for(;t===ai;)ai=ha[--ga],ha[ga]=null,tl=ha[--ga],ha[ga]=null;for(;t===sn;)sn=xe[--Te],xe[Te]=null,ke=xe[--Te],xe[Te]=null,Re=xe[--Te],xe[Te]=null}function pc(t,e){xe[Te++]=Re,xe[Te++]=ke,xe[Te++]=sn,Re=e.id,ke=e.overflow,sn=t}var Jt=null,kt=null,vt=!1,on=null,Ee=!1,Vs=Error(o(519));function rn(t){var e=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw el(Se(e,t)),Vs}function yc(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[It]=t,e[ee]=a,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<Tl.length;n++)mt(Tl[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),Du(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),ku(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||Ud(e.textContent,n)?(a.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),a.onScroll!=null&&mt("scroll",e),a.onScrollEnd!=null&&mt("scrollend",e),a.onClick!=null&&(e.onclick=Be),e=!0):e=!1,e||rn(t,!0)}function vc(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:Ee=!1;return;case 27:case 3:Ee=!0;return;default:Jt=Jt.return}}function ma(t){if(t!==Jt)return!1;if(!vt)return vc(t),vt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||ur(t.type,t.memoizedProps)),n=!n),n&&kt&&rn(t),vc(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));kt=Vd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));kt=Vd(t)}else e===27?(e=kt,xn(t.type)?(t=gr,gr=null,kt=t):kt=e):kt=Jt?Ae(t.stateNode.nextSibling):null;return!0}function Hn(){kt=Jt=null,vt=!1}function Qs(){var t=on;return t!==null&&(se===null?se=t:se.push.apply(se,t),on=null),t}function el(t){on===null?on=[t]:on.push(t)}var Ks=w(null),Bn=null,Ge=null;function un(t,e,n){Q(Ks,e._currentValue),e._currentValue=n}function Xe(t){t._currentValue=Ks.current,U(Ks)}function Zs(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Is(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var s=l.child;i=i.firstContext;t:for(;i!==null;){var u=i;i=l;for(var p=0;p<e.length;p++)if(u.context===e[p]){i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Zs(i.return,n,t),a||(s=null);break t}i=u.next}}else if(l.tag===18){if(s=l.return,s===null)throw Error(o(341));s.lanes|=n,i=s.alternate,i!==null&&(i.lanes|=n),Zs(s,n,t),s=null}else s=l.child;if(s!==null)s.return=l;else for(s=l;s!==null;){if(s===t){s=null;break}if(l=s.sibling,l!==null){l.return=s.return,s=l;break}s=s.return}l=s}}function pa(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var s=l.alternate;if(s===null)throw Error(o(387));if(s=s.memoizedProps,s!==null){var u=l.type;fe(l.pendingProps.value,s.value)||(t!==null?t.push(u):t=[u])}}else if(l===ht.current){if(s=l.alternate,s===null)throw Error(o(387));s.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(_l):t=[_l])}l=l.return}t!==null&&Is(e,t,n,a),e.flags|=262144}function li(t){for(t=t.firstContext;t!==null;){if(!fe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ln(t){Bn=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ft(t){return bc(Bn,t)}function ii(t,e){return Bn===null&&Ln(t),bc(t,e)}function bc(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ge===null){if(t===null)throw Error(o(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return n}var jm=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Hm=r.unstable_scheduleCallback,Bm=r.unstable_NormalPriority,Yt={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Js(){return{controller:new jm,data:new Map,refCount:0}}function nl(t){t.refCount--,t.refCount===0&&Hm(Bm,function(){t.controller.abort()})}var al=null,Fs=0,ya=0,va=null;function Lm(t,e){if(al===null){var n=al=[];Fs=0,ya=tr(),va={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Fs++,e.then(wc,wc),e}function wc(){if(--Fs===0&&al!==null){va!==null&&(va.status="fulfilled");var t=al;al=null,ya=0,va=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Ym(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var Sc=_.S;_.S=function(t,e){id=re(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Lm(t,e),Sc!==null&&Sc(t,e)};var Yn=w(null);function $s(){var t=Yn.current;return t!==null?t:Dt.pooledCache}function si(t,e){e===null?Q(Yn,Yn.current):Q(Yn,e.pool)}function xc(){var t=$s();return t===null?null:{parent:Yt._currentValue,pool:t}}var ba=Error(o(460)),Ws=Error(o(474)),oi=Error(o(542)),ri={then:function(){}};function Tc(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Ec(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Be,Be),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Ac(t),t;default:if(typeof e.status=="string")e.then(Be,Be);else{if(t=Dt,t!==null&&100<t.shellSuspendCounter)throw Error(o(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Ac(t),t}throw Gn=e,ba}}function qn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gn=n,ba):n}}var Gn=null;function Nc(){if(Gn===null)throw Error(o(459));var t=Gn;return Gn=null,t}function Ac(t){if(t===ba||t===oi)throw Error(o(483))}var wa=null,ll=0;function ui(t){var e=ll;return ll+=1,wa===null&&(wa=[]),Ec(wa,t,e)}function il(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ci(t,e){throw e.$$typeof===H?Error(o(525)):(t=Object.prototype.toString.call(e),Error(o(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Cc(t){function e(x,b){if(t){var T=x.deletions;T===null?(x.deletions=[b],x.flags|=16):T.push(b)}}function n(x,b){if(!t)return null;for(;b!==null;)e(x,b),b=b.sibling;return null}function a(x){for(var b=new Map;x!==null;)x.key!==null?b.set(x.key,x):b.set(x.index,x),x=x.sibling;return b}function l(x,b){return x=Ye(x,b),x.index=0,x.sibling=null,x}function i(x,b,T){return x.index=T,t?(T=x.alternate,T!==null?(T=T.index,T<b?(x.flags|=67108866,b):T):(x.flags|=67108866,b)):(x.flags|=1048576,b)}function s(x){return t&&x.alternate===null&&(x.flags|=67108866),x}function u(x,b,T,R){return b===null||b.tag!==6?(b=Ys(T,x.mode,R),b.return=x,b):(b=l(b,T),b.return=x,b)}function p(x,b,T,R){var lt=T.type;return lt===L?M(x,b,T.props.children,R,T.key):b!==null&&(b.elementType===lt||typeof lt=="object"&&lt!==null&&lt.$$typeof===J&&qn(lt)===b.type)?(b=l(b,T.props),il(b,T),b.return=x,b):(b=ni(T.type,T.key,T.props,null,x.mode,R),il(b,T),b.return=x,b)}function E(x,b,T,R){return b===null||b.tag!==4||b.stateNode.containerInfo!==T.containerInfo||b.stateNode.implementation!==T.implementation?(b=qs(T,x.mode,R),b.return=x,b):(b=l(b,T.children||[]),b.return=x,b)}function M(x,b,T,R,lt){return b===null||b.tag!==7?(b=jn(T,x.mode,R,lt),b.return=x,b):(b=l(b,T),b.return=x,b)}function O(x,b,T){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return b=Ys(""+b,x.mode,T),b.return=x,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case B:return T=ni(b.type,b.key,b.props,null,x.mode,T),il(T,b),T.return=x,T;case K:return b=qs(b,x.mode,T),b.return=x,b;case J:return b=qn(b),O(x,b,T)}if(Ut(b)||$(b))return b=jn(b,x.mode,T,null),b.return=x,b;if(typeof b.then=="function")return O(x,ui(b),T);if(b.$$typeof===D)return O(x,ii(x,b),T);ci(x,b)}return null}function N(x,b,T,R){var lt=b!==null?b.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return lt!==null?null:u(x,b,""+T,R);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case B:return T.key===lt?p(x,b,T,R):null;case K:return T.key===lt?E(x,b,T,R):null;case J:return T=qn(T),N(x,b,T,R)}if(Ut(T)||$(T))return lt!==null?null:M(x,b,T,R,null);if(typeof T.then=="function")return N(x,b,ui(T),R);if(T.$$typeof===D)return N(x,b,ii(x,T),R);ci(x,T)}return null}function A(x,b,T,R,lt){if(typeof R=="string"&&R!==""||typeof R=="number"||typeof R=="bigint")return x=x.get(T)||null,u(b,x,""+R,lt);if(typeof R=="object"&&R!==null){switch(R.$$typeof){case B:return x=x.get(R.key===null?T:R.key)||null,p(b,x,R,lt);case K:return x=x.get(R.key===null?T:R.key)||null,E(b,x,R,lt);case J:return R=qn(R),A(x,b,T,R,lt)}if(Ut(R)||$(R))return x=x.get(T)||null,M(b,x,R,lt,null);if(typeof R.then=="function")return A(x,b,T,ui(R),lt);if(R.$$typeof===D)return A(x,b,T,ii(b,R),lt);ci(b,R)}return null}function W(x,b,T,R){for(var lt=null,bt=null,nt=b,ft=b=0,yt=null;nt!==null&&ft<T.length;ft++){nt.index>ft?(yt=nt,nt=null):yt=nt.sibling;var wt=N(x,nt,T[ft],R);if(wt===null){nt===null&&(nt=yt);break}t&&nt&&wt.alternate===null&&e(x,nt),b=i(wt,b,ft),bt===null?lt=wt:bt.sibling=wt,bt=wt,nt=yt}if(ft===T.length)return n(x,nt),vt&&qe(x,ft),lt;if(nt===null){for(;ft<T.length;ft++)nt=O(x,T[ft],R),nt!==null&&(b=i(nt,b,ft),bt===null?lt=nt:bt.sibling=nt,bt=nt);return vt&&qe(x,ft),lt}for(nt=a(nt);ft<T.length;ft++)yt=A(nt,x,ft,T[ft],R),yt!==null&&(t&&yt.alternate!==null&&nt.delete(yt.key===null?ft:yt.key),b=i(yt,b,ft),bt===null?lt=yt:bt.sibling=yt,bt=yt);return t&&nt.forEach(function(Cn){return e(x,Cn)}),vt&&qe(x,ft),lt}function st(x,b,T,R){if(T==null)throw Error(o(151));for(var lt=null,bt=null,nt=b,ft=b=0,yt=null,wt=T.next();nt!==null&&!wt.done;ft++,wt=T.next()){nt.index>ft?(yt=nt,nt=null):yt=nt.sibling;var Cn=N(x,nt,wt.value,R);if(Cn===null){nt===null&&(nt=yt);break}t&&nt&&Cn.alternate===null&&e(x,nt),b=i(Cn,b,ft),bt===null?lt=Cn:bt.sibling=Cn,bt=Cn,nt=yt}if(wt.done)return n(x,nt),vt&&qe(x,ft),lt;if(nt===null){for(;!wt.done;ft++,wt=T.next())wt=O(x,wt.value,R),wt!==null&&(b=i(wt,b,ft),bt===null?lt=wt:bt.sibling=wt,bt=wt);return vt&&qe(x,ft),lt}for(nt=a(nt);!wt.done;ft++,wt=T.next())wt=A(nt,x,ft,wt.value,R),wt!==null&&(t&&wt.alternate!==null&&nt.delete(wt.key===null?ft:wt.key),b=i(wt,b,ft),bt===null?lt=wt:bt.sibling=wt,bt=wt);return t&&nt.forEach(function($0){return e(x,$0)}),vt&&qe(x,ft),lt}function Mt(x,b,T,R){if(typeof T=="object"&&T!==null&&T.type===L&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case B:t:{for(var lt=T.key;b!==null;){if(b.key===lt){if(lt=T.type,lt===L){if(b.tag===7){n(x,b.sibling),R=l(b,T.props.children),R.return=x,x=R;break t}}else if(b.elementType===lt||typeof lt=="object"&&lt!==null&&lt.$$typeof===J&&qn(lt)===b.type){n(x,b.sibling),R=l(b,T.props),il(R,T),R.return=x,x=R;break t}n(x,b);break}else e(x,b);b=b.sibling}T.type===L?(R=jn(T.props.children,x.mode,R,T.key),R.return=x,x=R):(R=ni(T.type,T.key,T.props,null,x.mode,R),il(R,T),R.return=x,x=R)}return s(x);case K:t:{for(lt=T.key;b!==null;){if(b.key===lt)if(b.tag===4&&b.stateNode.containerInfo===T.containerInfo&&b.stateNode.implementation===T.implementation){n(x,b.sibling),R=l(b,T.children||[]),R.return=x,x=R;break t}else{n(x,b);break}else e(x,b);b=b.sibling}R=qs(T,x.mode,R),R.return=x,x=R}return s(x);case J:return T=qn(T),Mt(x,b,T,R)}if(Ut(T))return W(x,b,T,R);if($(T)){if(lt=$(T),typeof lt!="function")throw Error(o(150));return T=lt.call(T),st(x,b,T,R)}if(typeof T.then=="function")return Mt(x,b,ui(T),R);if(T.$$typeof===D)return Mt(x,b,ii(x,T),R);ci(x,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,b!==null&&b.tag===6?(n(x,b.sibling),R=l(b,T),R.return=x,x=R):(n(x,b),R=Ys(T,x.mode,R),R.return=x,x=R),s(x)):n(x,b)}return function(x,b,T,R){try{ll=0;var lt=Mt(x,b,T,R);return wa=null,lt}catch(nt){if(nt===ba||nt===oi)throw nt;var bt=de(29,nt,null,x.mode);return bt.lanes=R,bt.return=x,bt}finally{}}}var Xn=Cc(!0),_c=Cc(!1),cn=!1;function Ps(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function to(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(xt&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=ei(t),fc(t,null,n),e}return ti(t,a,e,n),ei(t)}function sl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,bu(t,n)}}function eo(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var s={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=s:i=i.next=s,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var no=!1;function ol(){if(no){var t=va;if(t!==null)throw t}}function rl(t,e,n,a){no=!1;var l=t.updateQueue;cn=!1;var i=l.firstBaseUpdate,s=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var p=u,E=p.next;p.next=null,s===null?i=E:s.next=E,s=p;var M=t.alternate;M!==null&&(M=M.updateQueue,u=M.lastBaseUpdate,u!==s&&(u===null?M.firstBaseUpdate=E:u.next=E,M.lastBaseUpdate=p))}if(i!==null){var O=l.baseState;s=0,M=E=p=null,u=i;do{var N=u.lane&-536870913,A=N!==u.lane;if(A?(pt&N)===N:(a&N)===N){N!==0&&N===ya&&(no=!0),M!==null&&(M=M.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});t:{var W=t,st=u;N=e;var Mt=n;switch(st.tag){case 1:if(W=st.payload,typeof W=="function"){O=W.call(Mt,O,N);break t}O=W;break t;case 3:W.flags=W.flags&-65537|128;case 0:if(W=st.payload,N=typeof W=="function"?W.call(Mt,O,N):W,N==null)break t;O=C({},O,N);break t;case 2:cn=!0}}N=u.callback,N!==null&&(t.flags|=64,A&&(t.flags|=8192),A=l.callbacks,A===null?l.callbacks=[N]:A.push(N))}else A={lane:N,tag:u.tag,payload:u.payload,callback:u.callback,next:null},M===null?(E=M=A,p=O):M=M.next=A,s|=N;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;A=u,u=A.next,A.next=null,l.lastBaseUpdate=A,l.shared.pending=null}}while(!0);M===null&&(p=O),l.baseState=p,l.firstBaseUpdate=E,l.lastBaseUpdate=M,i===null&&(l.shared.lanes=0),yn|=s,t.lanes=s,t.memoizedState=O}}function Mc(t,e){if(typeof t!="function")throw Error(o(191,t));t.call(e)}function Dc(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)Mc(n[t],e)}var Sa=w(null),fi=w(0);function Rc(t,e){t=We,Q(fi,t),Q(Sa,e),We=t|e.baseLanes}function ao(){Q(fi,We),Q(Sa,Sa.current)}function lo(){We=fi.current,U(Sa),U(fi)}var he=w(null),Ne=null;function hn(t){var e=t.alternate;Q(Bt,Bt.current&1),Q(he,t),Ne===null&&(e===null||Sa.current!==null||e.memoizedState!==null)&&(Ne=t)}function io(t){Q(Bt,Bt.current),Q(he,t),Ne===null&&(Ne=t)}function kc(t){t.tag===22?(Q(Bt,Bt.current),Q(he,t),Ne===null&&(Ne=t)):gn()}function gn(){Q(Bt,Bt.current),Q(he,he.current)}function ge(t){U(he),Ne===t&&(Ne=null),U(Bt)}var Bt=w(0);function di(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||dr(n)||hr(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ve=0,ct=null,Ct=null,qt=null,hi=!1,xa=!1,Vn=!1,gi=0,ul=0,Ta=null,qm=0;function jt(){throw Error(o(321))}function so(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!fe(t[n],e[n]))return!1;return!0}function oo(t,e,n,a,l,i){return Ve=i,ct=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,_.H=t===null||t.memoizedState===null?pf:To,Vn=!1,i=n(a,l),Vn=!1,xa&&(i=Oc(e,n,a,l)),zc(t),i}function zc(t){_.H=dl;var e=Ct!==null&&Ct.next!==null;if(Ve=0,qt=Ct=ct=null,hi=!1,ul=0,Ta=null,e)throw Error(o(300));t===null||Gt||(t=t.dependencies,t!==null&&li(t)&&(Gt=!0))}function Oc(t,e,n,a){ct=t;var l=0;do{if(xa&&(Ta=null),ul=0,xa=!1,25<=l)throw Error(o(301));if(l+=1,qt=Ct=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}_.H=yf,i=e(n,a)}while(xa);return i}function Gm(){var t=_.H,e=t.useState()[0];return e=typeof e.then=="function"?cl(e):e,t=t.useState()[0],(Ct!==null?Ct.memoizedState:null)!==t&&(ct.flags|=1024),e}function ro(){var t=gi!==0;return gi=0,t}function uo(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function co(t){if(hi){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}hi=!1}Ve=0,qt=Ct=ct=null,xa=!1,ul=gi=0,Ta=null}function te(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qt===null?ct.memoizedState=qt=t:qt=qt.next=t,qt}function Lt(){if(Ct===null){var t=ct.alternate;t=t!==null?t.memoizedState:null}else t=Ct.next;var e=qt===null?ct.memoizedState:qt.next;if(e!==null)qt=e,Ct=t;else{if(t===null)throw ct.alternate===null?Error(o(467)):Error(o(310));Ct=t,t={memoizedState:Ct.memoizedState,baseState:Ct.baseState,baseQueue:Ct.baseQueue,queue:Ct.queue,next:null},qt===null?ct.memoizedState=qt=t:qt=qt.next=t}return qt}function mi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function cl(t){var e=ul;return ul+=1,Ta===null&&(Ta=[]),t=Ec(Ta,t,e),e=ct,(qt===null?e.memoizedState:qt.next)===null&&(e=e.alternate,_.H=e===null||e.memoizedState===null?pf:To),t}function pi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return cl(t);if(t.$$typeof===D)return Ft(t)}throw Error(o(438,String(t)))}function fo(t){var e=null,n=ct.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=ct.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=mi(),ct.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=at;return e.index++,n}function Qe(t,e){return typeof e=="function"?e(t):e}function yi(t){var e=Lt();return ho(e,Ct,t)}function ho(t,e,n){var a=t.queue;if(a===null)throw Error(o(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var s=l.next;l.next=i.next,i.next=s}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var u=s=null,p=null,E=e,M=!1;do{var O=E.lane&-536870913;if(O!==E.lane?(pt&O)===O:(Ve&O)===O){var N=E.revertLane;if(N===0)p!==null&&(p=p.next={lane:0,revertLane:0,gesture:null,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null}),O===ya&&(M=!0);else if((Ve&N)===N){E=E.next,N===ya&&(M=!0);continue}else O={lane:0,revertLane:E.revertLane,gesture:null,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null},p===null?(u=p=O,s=i):p=p.next=O,ct.lanes|=N,yn|=N;O=E.action,Vn&&n(i,O),i=E.hasEagerState?E.eagerState:n(i,O)}else N={lane:O,revertLane:E.revertLane,gesture:E.gesture,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null},p===null?(u=p=N,s=i):p=p.next=N,ct.lanes|=O,yn|=O;E=E.next}while(E!==null&&E!==e);if(p===null?s=i:p.next=u,!fe(i,t.memoizedState)&&(Gt=!0,M&&(n=va,n!==null)))throw n;t.memoizedState=i,t.baseState=s,t.baseQueue=p,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function go(t){var e=Lt(),n=e.queue;if(n===null)throw Error(o(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var s=l=l.next;do i=t(i,s.action),s=s.next;while(s!==l);fe(i,e.memoizedState)||(Gt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function Uc(t,e,n){var a=ct,l=Lt(),i=vt;if(i){if(n===void 0)throw Error(o(407));n=n()}else n=e();var s=!fe((Ct||l).memoizedState,n);if(s&&(l.memoizedState=n,Gt=!0),l=l.queue,yo(Bc.bind(null,a,l,t),[t]),l.getSnapshot!==e||s||qt!==null&&qt.memoizedState.tag&1){if(a.flags|=2048,Ea(9,{destroy:void 0},Hc.bind(null,a,l,n,e),null),Dt===null)throw Error(o(349));i||(Ve&127)!==0||jc(a,e,n)}return n}function jc(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ct.updateQueue,e===null?(e=mi(),ct.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Hc(t,e,n,a){e.value=n,e.getSnapshot=a,Lc(e)&&Yc(t)}function Bc(t,e,n){return n(function(){Lc(e)&&Yc(t)})}function Lc(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!fe(t,n)}catch{return!0}}function Yc(t){var e=Un(t,2);e!==null&&oe(e,t,2)}function mo(t){var e=te();if(typeof t=="function"){var n=t;if(t=n(),Vn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:t},e}function qc(t,e,n,a){return t.baseState=n,ho(t,Ct,typeof a=="function"?a:Qe)}function Xm(t,e,n,a,l){if(wi(t))throw Error(o(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){i.listeners.push(s)}};_.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,Gc(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Gc(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=_.T,s={};_.T=s;try{var u=n(l,a),p=_.S;p!==null&&p(s,u),Xc(t,e,u)}catch(E){po(t,e,E)}finally{i!==null&&s.types!==null&&(i.types=s.types),_.T=i}}else try{i=n(l,a),Xc(t,e,i)}catch(E){po(t,e,E)}}function Xc(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Vc(t,e,a)},function(a){return po(t,e,a)}):Vc(t,e,n)}function Vc(t,e,n){e.status="fulfilled",e.value=n,Qc(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Gc(t,n)))}function po(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,Qc(e),e=e.next;while(e!==a)}t.action=null}function Qc(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Kc(t,e){return e}function Zc(t,e){if(vt){var n=Dt.formState;if(n!==null){t:{var a=ct;if(vt){if(kt){e:{for(var l=kt,i=Ee;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ae(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){kt=Ae(l.nextSibling),a=l.data==="F!";break t}}rn(a)}a=!1}a&&(e=n[0])}}return n=te(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Kc,lastRenderedState:e},n.queue=a,n=hf.bind(null,ct,a),a.dispatch=n,a=mo(!1),i=xo.bind(null,ct,!1,a.queue),a=te(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=Xm.bind(null,ct,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Ic(t){var e=Lt();return Jc(e,Ct,t)}function Jc(t,e,n){if(e=ho(t,e,Kc)[0],t=yi(Qe)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=cl(e)}catch(s){throw s===ba?oi:s}else a=e;e=Lt();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(ct.flags|=2048,Ea(9,{destroy:void 0},Vm.bind(null,l,n),null)),[a,i,t]}function Vm(t,e){t.action=e}function Fc(t){var e=Lt(),n=Ct;if(n!==null)return Jc(e,n,t);Lt(),e=e.memoizedState,n=Lt();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function Ea(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=ct.updateQueue,e===null&&(e=mi(),ct.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function $c(){return Lt().memoizedState}function vi(t,e,n,a){var l=te();ct.flags|=t,l.memoizedState=Ea(1|e,{destroy:void 0},n,a===void 0?null:a)}function bi(t,e,n,a){var l=Lt();a=a===void 0?null:a;var i=l.memoizedState.inst;Ct!==null&&a!==null&&so(a,Ct.memoizedState.deps)?l.memoizedState=Ea(e,i,n,a):(ct.flags|=t,l.memoizedState=Ea(1|e,i,n,a))}function Wc(t,e){vi(8390656,8,t,e)}function yo(t,e){bi(2048,8,t,e)}function Qm(t){ct.flags|=4;var e=ct.updateQueue;if(e===null)e=mi(),ct.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Pc(t){var e=Lt().memoizedState;return Qm({ref:e,nextImpl:t}),function(){if((xt&2)!==0)throw Error(o(440));return e.impl.apply(void 0,arguments)}}function tf(t,e){return bi(4,2,t,e)}function ef(t,e){return bi(4,4,t,e)}function nf(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function af(t,e,n){n=n!=null?n.concat([t]):null,bi(4,4,nf.bind(null,e,t),n)}function vo(){}function lf(t,e){var n=Lt();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&so(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function sf(t,e){var n=Lt();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&so(e,a[1]))return a[0];if(a=t(),Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function bo(t,e,n){return n===void 0||(Ve&1073741824)!==0&&(pt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=od(),ct.lanes|=t,yn|=t,n)}function of(t,e,n,a){return fe(n,e)?n:Sa.current!==null?(t=bo(t,n,a),fe(t,e)||(Gt=!0),t):(Ve&42)===0||(Ve&1073741824)!==0&&(pt&261930)===0?(Gt=!0,t.memoizedState=n):(t=od(),ct.lanes|=t,yn|=t,e)}function rf(t,e,n,a,l){var i=Z.p;Z.p=i!==0&&8>i?i:8;var s=_.T,u={};_.T=u,xo(t,!1,e,n);try{var p=l(),E=_.S;if(E!==null&&E(u,p),p!==null&&typeof p=="object"&&typeof p.then=="function"){var M=Ym(p,a);fl(t,e,M,ye(t))}else fl(t,e,a,ye(t))}catch(O){fl(t,e,{then:function(){},status:"rejected",reason:O},ye())}finally{Z.p=i,s!==null&&u.types!==null&&(s.types=u.types),_.T=s}}function Km(){}function wo(t,e,n,a){if(t.tag!==5)throw Error(o(476));var l=uf(t).queue;rf(t,l,e,it,n===null?Km:function(){return cf(t),n(a)})}function uf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:it,baseState:it,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:it},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function cf(t){var e=uf(t);e.next===null&&(e=t.alternate.memoizedState),fl(t,e.next.queue,{},ye())}function So(){return Ft(_l)}function ff(){return Lt().memoizedState}function df(){return Lt().memoizedState}function Zm(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var a=dn(e,t,n);a!==null&&(oe(a,e,n),sl(a,e,n)),e={cache:Js()},t.payload=e;return}e=e.return}}function Im(t,e,n){var a=ye();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},wi(t)?gf(e,n):(n=Bs(t,e,n,a),n!==null&&(oe(n,t,a),mf(n,e,a)))}function hf(t,e,n){var a=ye();fl(t,e,n,a)}function fl(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(wi(t))gf(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var s=e.lastRenderedState,u=i(s,n);if(l.hasEagerState=!0,l.eagerState=u,fe(u,s))return ti(t,e,l,0),Dt===null&&Pl(),!1}catch{}finally{}if(n=Bs(t,e,l,a),n!==null)return oe(n,t,a),mf(n,e,a),!0}return!1}function xo(t,e,n,a){if(a={lane:2,revertLane:tr(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},wi(t)){if(e)throw Error(o(479))}else e=Bs(t,n,a,2),e!==null&&oe(e,t,2)}function wi(t){var e=t.alternate;return t===ct||e!==null&&e===ct}function gf(t,e){xa=hi=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function mf(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,bu(t,n)}}var dl={readContext:Ft,use:pi,useCallback:jt,useContext:jt,useEffect:jt,useImperativeHandle:jt,useLayoutEffect:jt,useInsertionEffect:jt,useMemo:jt,useReducer:jt,useRef:jt,useState:jt,useDebugValue:jt,useDeferredValue:jt,useTransition:jt,useSyncExternalStore:jt,useId:jt,useHostTransitionStatus:jt,useFormState:jt,useActionState:jt,useOptimistic:jt,useMemoCache:jt,useCacheRefresh:jt};dl.useEffectEvent=jt;var pf={readContext:Ft,use:pi,useCallback:function(t,e){return te().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:Wc,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,vi(4194308,4,nf.bind(null,e,t),n)},useLayoutEffect:function(t,e){return vi(4194308,4,t,e)},useInsertionEffect:function(t,e){vi(4,2,t,e)},useMemo:function(t,e){var n=te();e=e===void 0?null:e;var a=t();if(Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=te();if(n!==void 0){var l=n(e);if(Vn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=Im.bind(null,ct,t),[a.memoizedState,t]},useRef:function(t){var e=te();return t={current:t},e.memoizedState=t},useState:function(t){t=mo(t);var e=t.queue,n=hf.bind(null,ct,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:vo,useDeferredValue:function(t,e){var n=te();return bo(n,t,e)},useTransition:function(){var t=mo(!1);return t=rf.bind(null,ct,t.queue,!0,!1),te().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=ct,l=te();if(vt){if(n===void 0)throw Error(o(407));n=n()}else{if(n=e(),Dt===null)throw Error(o(349));(pt&127)!==0||jc(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,Wc(Bc.bind(null,a,i,t),[t]),a.flags|=2048,Ea(9,{destroy:void 0},Hc.bind(null,a,i,n,e),null),n},useId:function(){var t=te(),e=Dt.identifierPrefix;if(vt){var n=ke,a=Re;n=(a&~(1<<32-ce(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=gi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=qm++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:So,useFormState:Zc,useActionState:Zc,useOptimistic:function(t){var e=te();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=xo.bind(null,ct,!0,n),n.dispatch=e,[t,e]},useMemoCache:fo,useCacheRefresh:function(){return te().memoizedState=Zm.bind(null,ct)},useEffectEvent:function(t){var e=te(),n={impl:t};return e.memoizedState=n,function(){if((xt&2)!==0)throw Error(o(440));return n.impl.apply(void 0,arguments)}}},To={readContext:Ft,use:pi,useCallback:lf,useContext:Ft,useEffect:yo,useImperativeHandle:af,useInsertionEffect:tf,useLayoutEffect:ef,useMemo:sf,useReducer:yi,useRef:$c,useState:function(){return yi(Qe)},useDebugValue:vo,useDeferredValue:function(t,e){var n=Lt();return of(n,Ct.memoizedState,t,e)},useTransition:function(){var t=yi(Qe)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:cl(t),e]},useSyncExternalStore:Uc,useId:ff,useHostTransitionStatus:So,useFormState:Ic,useActionState:Ic,useOptimistic:function(t,e){var n=Lt();return qc(n,Ct,t,e)},useMemoCache:fo,useCacheRefresh:df};To.useEffectEvent=Pc;var yf={readContext:Ft,use:pi,useCallback:lf,useContext:Ft,useEffect:yo,useImperativeHandle:af,useInsertionEffect:tf,useLayoutEffect:ef,useMemo:sf,useReducer:go,useRef:$c,useState:function(){return go(Qe)},useDebugValue:vo,useDeferredValue:function(t,e){var n=Lt();return Ct===null?bo(n,t,e):of(n,Ct.memoizedState,t,e)},useTransition:function(){var t=go(Qe)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:cl(t),e]},useSyncExternalStore:Uc,useId:ff,useHostTransitionStatus:So,useFormState:Fc,useActionState:Fc,useOptimistic:function(t,e){var n=Lt();return Ct!==null?qc(n,Ct,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:fo,useCacheRefresh:df};yf.useEffectEvent=Pc;function Eo(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:C({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var No={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(oe(e,t,a),sl(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(oe(e,t,a),sl(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(oe(e,t,n),sl(e,t,n))}};function vf(t,e,n,a,l,i,s){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,s):e.prototype&&e.prototype.isPureReactComponent?!Wa(n,a)||!Wa(l,i):!0}function bf(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&No.enqueueReplaceState(e,e.state,null)}function Qn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=C({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function wf(t){Wl(t)}function Sf(t){console.error(t)}function xf(t){Wl(t)}function Si(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function Tf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Ao(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){Si(t,e)},n}function Ef(t){return t=fn(t),t.tag=3,t}function Nf(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){Tf(e,n,a)}}var s=n.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Tf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var u=a.stack;this.componentDidCatch(a.value,{componentStack:u!==null?u:""})})}function Jm(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&pa(e,n,l,!0),n=he.current,n!==null){switch(n.tag){case 31:case 13:return Ne===null?zi():n.alternate===null&&Ht===0&&(Ht=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===ri?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),$o(t,a,l)),!1;case 22:return n.flags|=65536,a===ri?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),$o(t,a,l)),!1}throw Error(o(435,n.tag))}return $o(t,a,l),zi(),!1}if(vt)return e=he.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Vs&&(t=Error(o(422),{cause:a}),el(Se(t,n)))):(a!==Vs&&(e=Error(o(423),{cause:a}),el(Se(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=Se(a,n),l=Ao(t.stateNode,a,l),eo(t,l),Ht!==4&&(Ht=2)),!1;var i=Error(o(520),{cause:a});if(i=Se(i,n),wl===null?wl=[i]:wl.push(i),Ht!==4&&(Ht=2),e===null)return!0;a=Se(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=Ao(n.stateNode,a,t),eo(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=Ef(l),Nf(l,t,n,a),eo(n,l),!1}n=n.return}while(n!==null);return!1}var Co=Error(o(461)),Gt=!1;function $t(t,e,n,a){e.child=t===null?_c(e,null,n,a):Xn(e,t.child,n,a)}function Af(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var s={};for(var u in a)u!=="ref"&&(s[u]=a[u])}else s=a;return Ln(e),a=oo(t,e,n,s,i,l),u=ro(),t!==null&&!Gt?(uo(t,e,l),Ke(t,e,l)):(vt&&u&&Gs(e),e.flags|=1,$t(t,e,a,l),e.child)}function Cf(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!Ls(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,_f(t,e,i,a,l)):(t=ni(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Uo(t,l)){var s=i.memoizedProps;if(n=n.compare,n=n!==null?n:Wa,n(s,a)&&t.ref===e.ref)return Ke(t,e,l)}return e.flags|=1,t=Ye(i,a),t.ref=e.ref,t.return=e,e.child=t}function _f(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if(Wa(i,a)&&t.ref===e.ref)if(Gt=!1,e.pendingProps=a=i,Uo(t,l))(t.flags&131072)!==0&&(Gt=!0);else return e.lanes=t.lanes,Ke(t,e,l)}return _o(t,e,n,a,l)}function Mf(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return Df(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&si(e,i!==null?i.cachePool:null),i!==null?Rc(e,i):ao(),kc(e);else return a=e.lanes=536870912,Df(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(si(e,i.cachePool),Rc(e,i),gn(),e.memoizedState=null):(t!==null&&si(e,null),ao(),gn());return $t(t,e,l,n),e.child}function hl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Df(t,e,n,a,l){var i=$s();return i=i===null?null:{parent:Yt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&si(e,null),ao(),kc(e),t!==null&&pa(t,e,a,!0),e.childLanes=l,null}function xi(t,e){return e=Ei({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Rf(t,e,n){return Xn(e,t.child,null,n),t=xi(e,e.pendingProps),t.flags|=2,ge(e),e.memoizedState=null,t}function Fm(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(vt){if(a.mode==="hidden")return t=xi(e,a),e.lanes=536870912,hl(null,t);if(io(e),(t=kt)?(t=Xd(t,Ee),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:sn!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=hc(t),n.return=e,e.child=n,Jt=e,kt=null)):t=null,t===null)throw rn(e);return e.lanes=536870912,null}return xi(e,a)}var i=t.memoizedState;if(i!==null){var s=i.dehydrated;if(io(e),l)if(e.flags&256)e.flags&=-257,e=Rf(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(o(558));else if(Gt||pa(t,e,n,!1),l=(n&t.childLanes)!==0,Gt||l){if(a=Dt,a!==null&&(s=wu(a,n),s!==0&&s!==i.retryLane))throw i.retryLane=s,Un(t,s),oe(a,t,s),Co;zi(),e=Rf(t,e,n)}else t=i.treeContext,kt=Ae(s.nextSibling),Jt=e,vt=!0,on=null,Ee=!1,t!==null&&pc(e,t),e=xi(e,a),e.flags|=4096;return e}return t=Ye(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ti(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(o(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function _o(t,e,n,a,l){return Ln(e),n=oo(t,e,n,a,void 0,l),a=ro(),t!==null&&!Gt?(uo(t,e,l),Ke(t,e,l)):(vt&&a&&Gs(e),e.flags|=1,$t(t,e,n,l),e.child)}function kf(t,e,n,a,l,i){return Ln(e),e.updateQueue=null,n=Oc(e,a,n,l),zc(t),a=ro(),t!==null&&!Gt?(uo(t,e,i),Ke(t,e,i)):(vt&&a&&Gs(e),e.flags|=1,$t(t,e,n,i),e.child)}function zf(t,e,n,a,l){if(Ln(e),e.stateNode===null){var i=da,s=n.contextType;typeof s=="object"&&s!==null&&(i=Ft(s)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=No,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},Ps(e),s=n.contextType,i.context=typeof s=="object"&&s!==null?Ft(s):da,i.state=e.memoizedState,s=n.getDerivedStateFromProps,typeof s=="function"&&(Eo(e,n,s,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(s=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),s!==i.state&&No.enqueueReplaceState(i,i.state,null),rl(e,a,i,l),ol(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var u=e.memoizedProps,p=Qn(n,u);i.props=p;var E=i.context,M=n.contextType;s=da,typeof M=="object"&&M!==null&&(s=Ft(M));var O=n.getDerivedStateFromProps;M=typeof O=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=e.pendingProps!==u,M||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||E!==s)&&bf(e,i,a,s),cn=!1;var N=e.memoizedState;i.state=N,rl(e,a,i,l),ol(),E=e.memoizedState,u||N!==E||cn?(typeof O=="function"&&(Eo(e,n,O,a),E=e.memoizedState),(p=cn||vf(e,n,p,a,N,E,s))?(M||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=E),i.props=a,i.state=E,i.context=s,a=p):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,to(t,e),s=e.memoizedProps,M=Qn(n,s),i.props=M,O=e.pendingProps,N=i.context,E=n.contextType,p=da,typeof E=="object"&&E!==null&&(p=Ft(E)),u=n.getDerivedStateFromProps,(E=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==O||N!==p)&&bf(e,i,a,p),cn=!1,N=e.memoizedState,i.state=N,rl(e,a,i,l),ol();var A=e.memoizedState;s!==O||N!==A||cn||t!==null&&t.dependencies!==null&&li(t.dependencies)?(typeof u=="function"&&(Eo(e,n,u,a),A=e.memoizedState),(M=cn||vf(e,n,M,a,N,A,p)||t!==null&&t.dependencies!==null&&li(t.dependencies))?(E||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,A,p),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,A,p)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===t.memoizedProps&&N===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&N===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=A),i.props=a,i.state=A,i.context=p,a=M):(typeof i.componentDidUpdate!="function"||s===t.memoizedProps&&N===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&N===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,Ti(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Xn(e,t.child,null,l),e.child=Xn(e,null,n,l)):$t(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ke(t,e,l),t}function Of(t,e,n,a){return Hn(),e.flags|=256,$t(t,e,n,a),e.child}var Mo={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Do(t){return{baseLanes:t,cachePool:xc()}}function Ro(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pe),t}function Uf(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,s;if((s=i)||(s=t!==null&&t.memoizedState===null?!1:(Bt.current&2)!==0),s&&(l=!0,e.flags&=-129),s=(e.flags&32)!==0,e.flags&=-33,t===null){if(vt){if(l?hn(e):gn(),(t=kt)?(t=Xd(t,Ee),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:sn!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=hc(t),n.return=e,e.child=n,Jt=e,kt=null)):t=null,t===null)throw rn(e);return hr(t)?e.lanes=32:e.lanes=536870912,null}var u=a.children;return a=a.fallback,l?(gn(),l=e.mode,u=Ei({mode:"hidden",children:u},l),a=jn(a,l,n,null),u.return=e,a.return=e,u.sibling=a,e.child=u,a=e.child,a.memoizedState=Do(n),a.childLanes=Ro(t,s,n),e.memoizedState=Mo,hl(null,a)):(hn(e),ko(e,u))}var p=t.memoizedState;if(p!==null&&(u=p.dehydrated,u!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=zo(t,e,n)):e.memoizedState!==null?(gn(),e.child=t.child,e.flags|=128,e=null):(gn(),u=a.fallback,l=e.mode,a=Ei({mode:"visible",children:a.children},l),u=jn(u,l,n,null),u.flags|=2,a.return=e,u.return=e,a.sibling=u,e.child=a,Xn(e,t.child,null,n),a=e.child,a.memoizedState=Do(n),a.childLanes=Ro(t,s,n),e.memoizedState=Mo,e=hl(null,a));else if(hn(e),hr(u)){if(s=u.nextSibling&&u.nextSibling.dataset,s)var E=s.dgst;s=E,a=Error(o(419)),a.stack="",a.digest=s,el({value:a,source:null,stack:null}),e=zo(t,e,n)}else if(Gt||pa(t,e,n,!1),s=(n&t.childLanes)!==0,Gt||s){if(s=Dt,s!==null&&(a=wu(s,n),a!==0&&a!==p.retryLane))throw p.retryLane=a,Un(t,a),oe(s,t,a),Co;dr(u)||zi(),e=zo(t,e,n)}else dr(u)?(e.flags|=192,e.child=t.child,e=null):(t=p.treeContext,kt=Ae(u.nextSibling),Jt=e,vt=!0,on=null,Ee=!1,t!==null&&pc(e,t),e=ko(e,a.children),e.flags|=4096);return e}return l?(gn(),u=a.fallback,l=e.mode,p=t.child,E=p.sibling,a=Ye(p,{mode:"hidden",children:a.children}),a.subtreeFlags=p.subtreeFlags&65011712,E!==null?u=Ye(E,u):(u=jn(u,l,n,null),u.flags|=2),u.return=e,a.return=e,a.sibling=u,e.child=a,hl(null,a),a=e.child,u=t.child.memoizedState,u===null?u=Do(n):(l=u.cachePool,l!==null?(p=Yt._currentValue,l=l.parent!==p?{parent:p,pool:p}:l):l=xc(),u={baseLanes:u.baseLanes|n,cachePool:l}),a.memoizedState=u,a.childLanes=Ro(t,s,n),e.memoizedState=Mo,hl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=Ye(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(s=e.deletions,s===null?(e.deletions=[t],e.flags|=16):s.push(t)),e.child=n,e.memoizedState=null,n)}function ko(t,e){return e=Ei({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ei(t,e){return t=de(22,t,null,e),t.lanes=0,t}function zo(t,e,n){return Xn(e,t.child,null,n),t=ko(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function jf(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Zs(t.return,e,n)}function Oo(t,e,n,a,l,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=n,s.tailMode=l,s.treeForkCount=i)}function Hf(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var s=Bt.current,u=(s&2)!==0;if(u?(s=s&1|2,e.flags|=128):s&=1,Q(Bt,s),$t(t,e,a,n),a=vt?tl:0,!u&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&jf(t,n,e);else if(t.tag===19)jf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&di(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),Oo(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&di(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}Oo(e,!0,n,null,i,a);break;case"together":Oo(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ke(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(pa(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(o(153));if(e.child!==null){for(t=e.child,n=Ye(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ye(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Uo(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&li(t)))}function $m(t,e,n){switch(e.tag){case 3:Rt(e,e.stateNode.containerInfo),un(e,Yt,t.memoizedState.cache),Hn();break;case 27:case 5:je(e);break;case 4:Rt(e,e.stateNode.containerInfo);break;case 10:un(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,io(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Uf(t,e,n):(hn(e),t=Ke(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(pa(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return Hf(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Q(Bt,Bt.current),a)break;return null;case 22:return e.lanes=0,Mf(t,e,n,e.pendingProps);case 24:un(e,Yt,t.memoizedState.cache)}return Ke(t,e,n)}function Bf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Gt=!0;else{if(!Uo(t,n)&&(e.flags&128)===0)return Gt=!1,$m(t,e,n);Gt=(t.flags&131072)!==0}else Gt=!1,vt&&(e.flags&1048576)!==0&&mc(e,tl,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=qn(e.elementType),e.type=t,typeof t=="function")Ls(t)?(a=Qn(t,a),e.tag=1,e=zf(null,e,t,a,n)):(e.tag=0,e=_o(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===Y){e.tag=11,e=Af(null,e,t,a,n);break t}else if(l===q){e.tag=14,e=Cf(null,e,t,a,n);break t}}throw e=et(t)||t,Error(o(306,e,""))}}return e;case 0:return _o(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Qn(a,e.pendingProps),zf(t,e,a,l,n);case 3:t:{if(Rt(e,e.stateNode.containerInfo),t===null)throw Error(o(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,to(t,e),rl(e,a,null,n);var s=e.memoizedState;if(a=s.cache,un(e,Yt,a),a!==i.cache&&Is(e,[Yt],n,!0),ol(),a=s.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:s.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Of(t,e,a,n);break t}else if(a!==l){l=Se(Error(o(424)),e),el(l),e=Of(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(kt=Ae(t.firstChild),Jt=e,vt=!0,on=null,Ee=!0,n=_c(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Hn(),a===l){e=Ke(t,e,n);break t}$t(t,e,a,n)}e=e.child}return e;case 26:return Ti(t,e),t===null?(n=Jd(e.type,null,e.pendingProps,null))?e.memoizedState=n:vt||(n=e.type,t=e.pendingProps,a=Yi(dt.current).createElement(n),a[It]=e,a[ee]=t,Wt(a,n,t),Kt(a),e.stateNode=a):e.memoizedState=Jd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return je(e),t===null&&vt&&(a=e.stateNode=Kd(e.type,e.pendingProps,dt.current),Jt=e,Ee=!0,l=kt,xn(e.type)?(gr=l,kt=Ae(a.firstChild)):kt=l),$t(t,e,e.pendingProps.children,n),Ti(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&vt&&((l=a=kt)&&(a=C0(a,e.type,e.pendingProps,Ee),a!==null?(e.stateNode=a,Jt=e,kt=Ae(a.firstChild),Ee=!1,l=!0):l=!1),l||rn(e)),je(e),l=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,a=i.children,ur(l,i)?a=null:s!==null&&ur(l,s)&&(e.flags|=32),e.memoizedState!==null&&(l=oo(t,e,Gm,null,null,n),_l._currentValue=l),Ti(t,e),$t(t,e,a,n),e.child;case 6:return t===null&&vt&&((t=n=kt)&&(n=_0(n,e.pendingProps,Ee),n!==null?(e.stateNode=n,Jt=e,kt=null,t=!0):t=!1),t||rn(e)),null;case 13:return Uf(t,e,n);case 4:return Rt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Xn(e,null,a,n):$t(t,e,a,n),e.child;case 11:return Af(t,e,e.type,e.pendingProps,n);case 7:return $t(t,e,e.pendingProps,n),e.child;case 8:return $t(t,e,e.pendingProps.children,n),e.child;case 12:return $t(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,un(e,e.type,a.value),$t(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,Ln(e),l=Ft(l),a=a(l),e.flags|=1,$t(t,e,a,n),e.child;case 14:return Cf(t,e,e.type,e.pendingProps,n);case 15:return _f(t,e,e.type,e.pendingProps,n);case 19:return Hf(t,e,n);case 31:return Fm(t,e,n);case 22:return Mf(t,e,n,e.pendingProps);case 24:return Ln(e),a=Ft(Yt),t===null?(l=$s(),l===null&&(l=Dt,i=Js(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},Ps(e),un(e,Yt,l)):((t.lanes&n)!==0&&(to(t,e),rl(e,null,null,n),ol()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),un(e,Yt,a)):(a=i.cache,un(e,Yt,a),a!==l.cache&&Is(e,[Yt],n,!0))),$t(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(o(156,e.tag))}function Ze(t){t.flags|=4}function jo(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(fd())t.flags|=8192;else throw Gn=ri,Ws}else t.flags&=-16777217}function Lf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!th(e))if(fd())t.flags|=8192;else throw Gn=ri,Ws}function Ni(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?yu():536870912,t.lanes|=e,_a|=e)}function gl(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function zt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Wm(t,e,n){var a=e.pendingProps;switch(Xs(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zt(e),null;case 1:return zt(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Xe(Yt),At(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ma(e)?Ze(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Qs())),zt(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ze(e),i!==null?(zt(e),Lf(e,i)):(zt(e),jo(e,l,null,a,n))):i?i!==t.memoizedState?(Ze(e),zt(e),Lf(e,i)):(zt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ze(e),zt(e),jo(e,l,t,a,n)),null;case 27:if(jl(e),n=dt.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ze(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return zt(e),null}t=tt.current,ma(e)?yc(e):(t=Kd(l,a,n),e.stateNode=t,Ze(e))}return zt(e),null;case 5:if(jl(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ze(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return zt(e),null}if(i=tt.current,ma(e))yc(e);else{var s=Yi(dt.current);switch(i){case 1:i=s.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=s.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=s.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=s.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=s.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?s.createElement("select",{is:a.is}):s.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?s.createElement(l,{is:a.is}):s.createElement(l)}}i[It]=e,i[ee]=a;t:for(s=e.child;s!==null;){if(s.tag===5||s.tag===6)i.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===e)break t;for(;s.sibling===null;){if(s.return===null||s.return===e)break t;s=s.return}s.sibling.return=s.return,s=s.sibling}e.stateNode=i;t:switch(Wt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ze(e)}}return zt(e),jo(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ze(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(o(166));if(t=dt.current,ma(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Jt,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[It]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Ud(t.nodeValue,n)),t||rn(e,!0)}else t=Yi(t).createTextNode(a),t[It]=e,e.stateNode=t}return zt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ma(e),n!==null){if(t===null){if(!a)throw Error(o(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(557));t[It]=e}else Hn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),t=!1}else n=Qs(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ge(e),e):(ge(e),null);if((e.flags&128)!==0)throw Error(o(558))}return zt(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ma(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(o(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(o(317));l[It]=e}else Hn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),l=!1}else l=Qs(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(ge(e),e):(ge(e),null)}return ge(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Ni(e,e.updateQueue),zt(e),null);case 4:return At(),t===null&&lr(e.stateNode.containerInfo),zt(e),null;case 10:return Xe(e.type),zt(e),null;case 19:if(U(Bt),a=e.memoizedState,a===null)return zt(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)gl(a,!1);else{if(Ht!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=di(t),i!==null){for(e.flags|=128,gl(a,!1),t=i.updateQueue,e.updateQueue=t,Ni(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)dc(n,t),n=n.sibling;return Q(Bt,Bt.current&1|2),vt&&qe(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&re()>Di&&(e.flags|=128,l=!0,gl(a,!1),e.lanes=4194304)}else{if(!l)if(t=di(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,Ni(e,t),gl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!vt)return zt(e),null}else 2*re()-a.renderingStartTime>Di&&n!==536870912&&(e.flags|=128,l=!0,gl(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=re(),t.sibling=null,n=Bt.current,Q(Bt,l?n&1|2:n&1),vt&&qe(e,a.treeForkCount),t):(zt(e),null);case 22:case 23:return ge(e),lo(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(zt(e),e.subtreeFlags&6&&(e.flags|=8192)):zt(e),n=e.updateQueue,n!==null&&Ni(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&U(Yn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Xe(Yt),zt(e),null;case 25:return null;case 30:return null}throw Error(o(156,e.tag))}function Pm(t,e){switch(Xs(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Xe(Yt),At(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return jl(e),null;case 31:if(e.memoizedState!==null){if(ge(e),e.alternate===null)throw Error(o(340));Hn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ge(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(o(340));Hn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return U(Bt),null;case 4:return At(),null;case 10:return Xe(e.type),null;case 22:case 23:return ge(e),lo(),t!==null&&U(Yn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Xe(Yt),null;case 25:return null;default:return null}}function Yf(t,e){switch(Xs(e),e.tag){case 3:Xe(Yt),At();break;case 26:case 27:case 5:jl(e);break;case 4:At();break;case 31:e.memoizedState!==null&&ge(e);break;case 13:ge(e);break;case 19:U(Bt);break;case 10:Xe(e.type);break;case 22:case 23:ge(e),lo(),t!==null&&U(Yn);break;case 24:Xe(Yt)}}function ml(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,s=n.inst;a=i(),s.destroy=a}n=n.next}while(n!==l)}}catch(u){Nt(e,e.return,u)}}function mn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var s=a.inst,u=s.destroy;if(u!==void 0){s.destroy=void 0,l=e;var p=n,E=u;try{E()}catch(M){Nt(l,p,M)}}}a=a.next}while(a!==i)}}catch(M){Nt(e,e.return,M)}}function qf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Dc(e,n)}catch(a){Nt(t,t.return,a)}}}function Gf(t,e,n){n.props=Qn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){Nt(t,e,a)}}function pl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){Nt(t,e,l)}}function ze(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){Nt(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){Nt(t,e,l)}else n.current=null}function Xf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){Nt(t,t.return,l)}}function Ho(t,e,n){try{var a=t.stateNode;S0(a,t.type,n,e),a[ee]=e}catch(l){Nt(t,t.return,l)}}function Vf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&xn(t.type)||t.tag===4}function Bo(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Vf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&xn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Lo(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Be));else if(a!==4&&(a===27&&xn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Lo(t,e,n),t=t.sibling;t!==null;)Lo(t,e,n),t=t.sibling}function Ai(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&xn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ai(t,e,n),t=t.sibling;t!==null;)Ai(t,e,n),t=t.sibling}function Qf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);Wt(e,a,n),e[It]=t,e[ee]=n}catch(i){Nt(t,t.return,i)}}var Ie=!1,Xt=!1,Yo=!1,Kf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function t0(t,e){if(t=t.containerInfo,or=Zi,t=ac(t),ks(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var s=0,u=-1,p=-1,E=0,M=0,O=t,N=null;e:for(;;){for(var A;O!==n||l!==0&&O.nodeType!==3||(u=s+l),O!==i||a!==0&&O.nodeType!==3||(p=s+a),O.nodeType===3&&(s+=O.nodeValue.length),(A=O.firstChild)!==null;)N=O,O=A;for(;;){if(O===t)break e;if(N===n&&++E===l&&(u=s),N===i&&++M===a&&(p=s),(A=O.nextSibling)!==null)break;O=N,N=O.parentNode}O=A}n=u===-1||p===-1?null:{start:u,end:p}}else n=null}n=n||{start:0,end:0}}else n=null;for(rr={focusedElem:t,selectionRange:n},Zi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var W=Qn(n.type,l);t=a.getSnapshotBeforeUpdate(W,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(st){Nt(n,n.return,st)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)fr(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":fr(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(o(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function Zf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Fe(t,n),a&4&&ml(5,n);break;case 1:if(Fe(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(s){Nt(n,n.return,s)}else{var l=Qn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(s){Nt(n,n.return,s)}}a&64&&qf(n),a&512&&pl(n,n.return);break;case 3:if(Fe(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Dc(t,e)}catch(s){Nt(n,n.return,s)}}break;case 27:e===null&&a&4&&Qf(n);case 26:case 5:Fe(t,n),e===null&&a&4&&Xf(n),a&512&&pl(n,n.return);break;case 12:Fe(t,n);break;case 31:Fe(t,n),a&4&&Ff(t,n);break;case 13:Fe(t,n),a&4&&$f(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=u0.bind(null,n),M0(t,n))));break;case 22:if(a=n.memoizedState!==null||Ie,!a){e=e!==null&&e.memoizedState!==null||Xt,l=Ie;var i=Xt;Ie=a,(Xt=e)&&!i?$e(t,n,(n.subtreeFlags&8772)!==0):Fe(t,n),Ie=l,Xt=i}break;case 30:break;default:Fe(t,n)}}function If(t){var e=t.alternate;e!==null&&(t.alternate=null,If(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&ms(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Ot=null,ae=!1;function Je(t,e,n){for(n=n.child;n!==null;)Jf(t,e,n),n=n.sibling}function Jf(t,e,n){if(ue&&typeof ue.onCommitFiberUnmount=="function")try{ue.onCommitFiberUnmount(Ya,n)}catch{}switch(n.tag){case 26:Xt||ze(n,e),Je(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Xt||ze(n,e);var a=Ot,l=ae;xn(n.type)&&(Ot=n.stateNode,ae=!1),Je(t,e,n),Nl(n.stateNode),Ot=a,ae=l;break;case 5:Xt||ze(n,e);case 6:if(a=Ot,l=ae,Ot=null,Je(t,e,n),Ot=a,ae=l,Ot!==null)if(ae)try{(Ot.nodeType===9?Ot.body:Ot.nodeName==="HTML"?Ot.ownerDocument.body:Ot).removeChild(n.stateNode)}catch(i){Nt(n,e,i)}else try{Ot.removeChild(n.stateNode)}catch(i){Nt(n,e,i)}break;case 18:Ot!==null&&(ae?(t=Ot,qd(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ja(t)):qd(Ot,n.stateNode));break;case 4:a=Ot,l=ae,Ot=n.stateNode.containerInfo,ae=!0,Je(t,e,n),Ot=a,ae=l;break;case 0:case 11:case 14:case 15:mn(2,n,e),Xt||mn(4,n,e),Je(t,e,n);break;case 1:Xt||(ze(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Gf(n,e,a)),Je(t,e,n);break;case 21:Je(t,e,n);break;case 22:Xt=(a=Xt)||n.memoizedState!==null,Je(t,e,n),Xt=a;break;default:Je(t,e,n)}}function Ff(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ja(t)}catch(n){Nt(e,e.return,n)}}}function $f(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ja(t)}catch(n){Nt(e,e.return,n)}}function e0(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Kf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Kf),e;default:throw Error(o(435,t.tag))}}function Ci(t,e){var n=e0(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=c0.bind(null,t,a);a.then(l,l)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,s=e,u=s;t:for(;u!==null;){switch(u.tag){case 27:if(xn(u.type)){Ot=u.stateNode,ae=!1;break t}break;case 5:Ot=u.stateNode,ae=!1;break t;case 3:case 4:Ot=u.stateNode.containerInfo,ae=!0;break t}u=u.return}if(Ot===null)throw Error(o(160));Jf(i,s,l),Ot=null,ae=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Wf(e,t),e=e.sibling}var Me=null;function Wf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ie(t),a&4&&(mn(3,t,t.return),ml(3,t),mn(5,t,t.return));break;case 1:le(e,t),ie(t),a&512&&(Xt||n===null||ze(n,n.return)),a&64&&Ie&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Me;if(le(e,t),ie(t),a&512&&(Xt||n===null||ze(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Xa]||i[It]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),Wt(i,a,n),i[It]=t,Kt(i),a=i;break t;case"link":var s=Wd("link","href",l).get(a+(n.href||""));if(s){for(var u=0;u<s.length;u++)if(i=s[u],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(u,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;case"meta":if(s=Wd("meta","content",l).get(a+(n.content||""))){for(u=0;u<s.length;u++)if(i=s[u],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){s.splice(u,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;default:throw Error(o(468,a))}i[It]=t,Kt(i),a=i}t.stateNode=a}else Pd(l,t.type,t.stateNode);else t.stateNode=$d(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Pd(l,t.type,t.stateNode):$d(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Ho(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ie(t),a&512&&(Xt||n===null||ze(n,n.return)),n!==null&&a&4&&Ho(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ie(t),a&512&&(Xt||n===null||ze(n,n.return)),t.flags&32){l=t.stateNode;try{ia(l,"")}catch(W){Nt(t,t.return,W)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,Ho(t,l,n!==null?n.memoizedProps:l)),a&1024&&(Yo=!0);break;case 6:if(le(e,t),ie(t),a&4){if(t.stateNode===null)throw Error(o(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(W){Nt(t,t.return,W)}}break;case 3:if(Xi=null,l=Me,Me=qi(e.containerInfo),le(e,t),Me=l,ie(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ja(e.containerInfo)}catch(W){Nt(t,t.return,W)}Yo&&(Yo=!1,Pf(t));break;case 4:a=Me,Me=qi(t.stateNode.containerInfo),le(e,t),ie(t),Me=a;break;case 12:le(e,t),ie(t);break;case 31:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 13:le(e,t),ie(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Mi=re()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 22:l=t.memoizedState!==null;var p=n!==null&&n.memoizedState!==null,E=Ie,M=Xt;if(Ie=E||l,Xt=M||p,le(e,t),Xt=M,Ie=E,ie(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||p||Ie||Xt||Kn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){p=n=e;try{if(i=p.stateNode,l)s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{u=p.stateNode;var O=p.memoizedProps.style,N=O!=null&&O.hasOwnProperty("display")?O.display:null;u.style.display=N==null||typeof N=="boolean"?"":(""+N).trim()}}catch(W){Nt(p,p.return,W)}}}else if(e.tag===6){if(n===null){p=e;try{p.stateNode.nodeValue=l?"":p.memoizedProps}catch(W){Nt(p,p.return,W)}}}else if(e.tag===18){if(n===null){p=e;try{var A=p.stateNode;l?Gd(A,!0):Gd(p.stateNode,!1)}catch(W){Nt(p,p.return,W)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ci(t,n))));break;case 19:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 30:break;case 21:break;default:le(e,t),ie(t)}}function ie(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(Vf(a)){n=a;break}a=a.return}if(n==null)throw Error(o(160));switch(n.tag){case 27:var l=n.stateNode,i=Bo(t);Ai(t,i,l);break;case 5:var s=n.stateNode;n.flags&32&&(ia(s,""),n.flags&=-33);var u=Bo(t);Ai(t,u,s);break;case 3:case 4:var p=n.stateNode.containerInfo,E=Bo(t);Lo(t,E,p);break;default:throw Error(o(161))}}catch(M){Nt(t,t.return,M)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Pf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Pf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Fe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Zf(t,e.alternate,e),e=e.sibling}function Kn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:mn(4,e,e.return),Kn(e);break;case 1:ze(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Gf(e,e.return,n),Kn(e);break;case 27:Nl(e.stateNode);case 26:case 5:ze(e,e.return),Kn(e);break;case 22:e.memoizedState===null&&Kn(e);break;case 30:Kn(e);break;default:Kn(e)}t=t.sibling}}function $e(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,s=i.flags;switch(i.tag){case 0:case 11:case 15:$e(l,i,n),ml(4,i);break;case 1:if($e(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(E){Nt(a,a.return,E)}if(a=i,l=a.updateQueue,l!==null){var u=a.stateNode;try{var p=l.shared.hiddenCallbacks;if(p!==null)for(l.shared.hiddenCallbacks=null,l=0;l<p.length;l++)Mc(p[l],u)}catch(E){Nt(a,a.return,E)}}n&&s&64&&qf(i),pl(i,i.return);break;case 27:Qf(i);case 26:case 5:$e(l,i,n),n&&a===null&&s&4&&Xf(i),pl(i,i.return);break;case 12:$e(l,i,n);break;case 31:$e(l,i,n),n&&s&4&&Ff(l,i);break;case 13:$e(l,i,n),n&&s&4&&$f(l,i);break;case 22:i.memoizedState===null&&$e(l,i,n),pl(i,i.return);break;case 30:break;default:$e(l,i,n)}e=e.sibling}}function qo(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&nl(n))}function Go(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&nl(t))}function De(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)td(t,e,n,a),e=e.sibling}function td(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:De(t,e,n,a),l&2048&&ml(9,e);break;case 1:De(t,e,n,a);break;case 3:De(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&nl(t)));break;case 12:if(l&2048){De(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,s=i.id,u=i.onPostCommit;typeof u=="function"&&u(s,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(p){Nt(e,e.return,p)}}else De(t,e,n,a);break;case 31:De(t,e,n,a);break;case 13:De(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,s=e.alternate,e.memoizedState!==null?i._visibility&2?De(t,e,n,a):yl(t,e):i._visibility&2?De(t,e,n,a):(i._visibility|=2,Na(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&qo(s,e);break;case 24:De(t,e,n,a),l&2048&&Go(e.alternate,e);break;default:De(t,e,n,a)}}function Na(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,s=e,u=n,p=a,E=s.flags;switch(s.tag){case 0:case 11:case 15:Na(i,s,u,p,l),ml(8,s);break;case 23:break;case 22:var M=s.stateNode;s.memoizedState!==null?M._visibility&2?Na(i,s,u,p,l):yl(i,s):(M._visibility|=2,Na(i,s,u,p,l)),l&&E&2048&&qo(s.alternate,s);break;case 24:Na(i,s,u,p,l),l&&E&2048&&Go(s.alternate,s);break;default:Na(i,s,u,p,l)}e=e.sibling}}function yl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:yl(n,a),l&2048&&qo(a.alternate,a);break;case 24:yl(n,a),l&2048&&Go(a.alternate,a);break;default:yl(n,a)}e=e.sibling}}var vl=8192;function Aa(t,e,n){if(t.subtreeFlags&vl)for(t=t.child;t!==null;)ed(t,e,n),t=t.sibling}function ed(t,e,n){switch(t.tag){case 26:Aa(t,e,n),t.flags&vl&&t.memoizedState!==null&&q0(n,Me,t.memoizedState,t.memoizedProps);break;case 5:Aa(t,e,n);break;case 3:case 4:var a=Me;Me=qi(t.stateNode.containerInfo),Aa(t,e,n),Me=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=vl,vl=16777216,Aa(t,e,n),vl=a):Aa(t,e,n));break;default:Aa(t,e,n)}}function nd(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function bl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,ld(a,t)}nd(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)ad(t),t=t.sibling}function ad(t){switch(t.tag){case 0:case 11:case 15:bl(t),t.flags&2048&&mn(9,t,t.return);break;case 3:bl(t);break;case 12:bl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,_i(t)):bl(t);break;default:bl(t)}}function _i(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,ld(a,t)}nd(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:mn(8,e,e.return),_i(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,_i(e));break;default:_i(e)}t=t.sibling}}function ld(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:mn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:nl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Zt=a;else t:for(n=t;Zt!==null;){a=Zt;var l=a.sibling,i=a.return;if(If(a),a===n){Zt=null;break t}if(l!==null){l.return=i,Zt=l;break t}Zt=i}}}var n0={getCacheForType:function(t){var e=Ft(Yt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ft(Yt).controller.signal}},a0=typeof WeakMap=="function"?WeakMap:Map,xt=0,Dt=null,gt=null,pt=0,Et=0,me=null,pn=!1,Ca=!1,Xo=!1,We=0,Ht=0,yn=0,Zn=0,Vo=0,pe=0,_a=0,wl=null,se=null,Qo=!1,Mi=0,id=0,Di=1/0,Ri=null,vn=null,Qt=0,bn=null,Ma=null,Pe=0,Ko=0,Zo=null,sd=null,Sl=0,Io=null;function ye(){return(xt&2)!==0&&pt!==0?pt&-pt:_.T!==null?tr():Su()}function od(){if(pe===0)if((pt&536870912)===0||vt){var t=Ll;Ll<<=1,(Ll&3932160)===0&&(Ll=262144),pe=t}else pe=536870912;return t=he.current,t!==null&&(t.flags|=32),pe}function oe(t,e,n){(t===Dt&&(Et===2||Et===9)||t.cancelPendingCommit!==null)&&(Da(t,0),wn(t,pt,pe,!1)),Ga(t,n),((xt&2)===0||t!==Dt)&&(t===Dt&&((xt&2)===0&&(Zn|=n),Ht===4&&wn(t,pt,pe,!1)),Oe(t))}function rd(t,e,n){if((xt&6)!==0)throw Error(o(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||qa(t,e),l=a?s0(t,e):Fo(t,e,!0),i=a;do{if(l===0){Ca&&!a&&wn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!l0(n)){l=Fo(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var s=0;else s=t.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){e=s;t:{var u=t;l=wl;var p=u.current.memoizedState.isDehydrated;if(p&&(Da(u,s).flags|=256),s=Fo(u,s,!1),s!==2){if(Xo&&!p){u.errorRecoveryDisabledLanes|=i,Zn|=i,l=4;break t}i=se,se=l,i!==null&&(se===null?se=i:se.push.apply(se,i))}l=s}if(i=!1,l!==2)continue}}if(l===1){Da(t,0),wn(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(o(345));case 4:if((e&4194048)!==e)break;case 6:wn(a,e,pe,!pn);break t;case 2:se=null;break;case 3:case 5:break;default:throw Error(o(329))}if((e&62914560)===e&&(l=Mi+300-re(),10<l)){if(wn(a,e,pe,!pn),ql(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=Ld(ud.bind(null,a,n,se,Ri,Qo,e,pe,Zn,_a,pn,i,"Throttled",-0,0),l);break t}ud(a,n,se,Ri,Qo,e,pe,Zn,_a,pn,i,null,-0,0)}}break}while(!0);Oe(t)}function ud(t,e,n,a,l,i,s,u,p,E,M,O,N,A){if(t.timeoutHandle=-1,O=e.subtreeFlags,O&8192||(O&16785408)===16785408){O={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Be},ed(e,i,O);var W=(i&62914560)===i?Mi-re():(i&4194048)===i?id-re():0;if(W=G0(O,W),W!==null){Pe=i,t.cancelPendingCommit=W(yd.bind(null,t,e,i,n,a,l,s,u,p,M,O,null,N,A)),wn(t,i,s,!E);return}}yd(t,e,i,n,a,l,s,u,p)}function l0(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!fe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wn(t,e,n,a){e&=~Vo,e&=~Zn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-ce(l),s=1<<i;a[i]=-1,l&=~s}n!==0&&vu(t,n,e)}function ki(){return(xt&6)===0?(xl(0),!1):!0}function Jo(){if(gt!==null){if(Et===0)var t=gt.return;else t=gt,Ge=Bn=null,co(t),wa=null,ll=0,t=gt;for(;t!==null;)Yf(t.alternate,t),t=t.return;gt=null}}function Da(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,E0(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Jo(),Dt=t,gt=n=Ye(t.current,null),pt=e,Et=0,me=null,pn=!1,Ca=qa(t,e),Xo=!1,_a=pe=Vo=Zn=yn=Ht=0,se=wl=null,Qo=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-ce(a),i=1<<l;e|=t[l],a&=~i}return We=e,Pl(),n}function cd(t,e){ct=null,_.H=dl,e===ba||e===oi?(e=Nc(),Et=3):e===Ws?(e=Nc(),Et=4):Et=e===Co?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,me=e,gt===null&&(Ht=1,Si(t,Se(e,t.current)))}function fd(){var t=he.current;return t===null?!0:(pt&4194048)===pt?Ne===null:(pt&62914560)===pt||(pt&536870912)!==0?t===Ne:!1}function dd(){var t=_.H;return _.H=dl,t===null?dl:t}function hd(){var t=_.A;return _.A=n0,t}function zi(){Ht=4,pn||(pt&4194048)!==pt&&he.current!==null||(Ca=!0),(yn&134217727)===0&&(Zn&134217727)===0||Dt===null||wn(Dt,pt,pe,!1)}function Fo(t,e,n){var a=xt;xt|=2;var l=dd(),i=hd();(Dt!==t||pt!==e)&&(Ri=null,Da(t,e)),e=!1;var s=Ht;t:do try{if(Et!==0&&gt!==null){var u=gt,p=me;switch(Et){case 8:Jo(),s=6;break t;case 3:case 2:case 9:case 6:he.current===null&&(e=!0);var E=Et;if(Et=0,me=null,Ra(t,u,p,E),n&&Ca){s=0;break t}break;default:E=Et,Et=0,me=null,Ra(t,u,p,E)}}i0(),s=Ht;break}catch(M){cd(t,M)}while(!0);return e&&t.shellSuspendCounter++,Ge=Bn=null,xt=a,_.H=l,_.A=i,gt===null&&(Dt=null,pt=0,Pl()),s}function i0(){for(;gt!==null;)gd(gt)}function s0(t,e){var n=xt;xt|=2;var a=dd(),l=hd();Dt!==t||pt!==e?(Ri=null,Di=re()+500,Da(t,e)):Ca=qa(t,e);t:do try{if(Et!==0&&gt!==null){e=gt;var i=me;e:switch(Et){case 1:Et=0,me=null,Ra(t,e,i,1);break;case 2:case 9:if(Tc(i)){Et=0,me=null,md(e);break}e=function(){Et!==2&&Et!==9||Dt!==t||(Et=7),Oe(t)},i.then(e,e);break t;case 3:Et=7;break t;case 4:Et=5;break t;case 7:Tc(i)?(Et=0,me=null,md(e)):(Et=0,me=null,Ra(t,e,i,7));break;case 5:var s=null;switch(gt.tag){case 26:s=gt.memoizedState;case 5:case 27:var u=gt;if(s?th(s):u.stateNode.complete){Et=0,me=null;var p=u.sibling;if(p!==null)gt=p;else{var E=u.return;E!==null?(gt=E,Oi(E)):gt=null}break e}}Et=0,me=null,Ra(t,e,i,5);break;case 6:Et=0,me=null,Ra(t,e,i,6);break;case 8:Jo(),Ht=6;break t;default:throw Error(o(462))}}o0();break}catch(M){cd(t,M)}while(!0);return Ge=Bn=null,_.H=a,_.A=l,xt=n,gt!==null?0:(Dt=null,pt=0,Pl(),Ht)}function o0(){for(;gt!==null&&!Dg();)gd(gt)}function gd(t){var e=Bf(t.alternate,t,We);t.memoizedProps=t.pendingProps,e===null?Oi(t):gt=e}function md(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=kf(n,e,e.pendingProps,e.type,void 0,pt);break;case 11:e=kf(n,e,e.pendingProps,e.type.render,e.ref,pt);break;case 5:co(e);default:Yf(n,e),e=gt=dc(e,We),e=Bf(n,e,We)}t.memoizedProps=t.pendingProps,e===null?Oi(t):gt=e}function Ra(t,e,n,a){Ge=Bn=null,co(e),wa=null,ll=0;var l=e.return;try{if(Jm(t,l,e,n,pt)){Ht=1,Si(t,Se(n,t.current)),gt=null;return}}catch(i){if(l!==null)throw gt=l,i;Ht=1,Si(t,Se(n,t.current)),gt=null;return}e.flags&32768?(vt||a===1?t=!0:Ca||(pt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=he.current,a!==null&&a.tag===13&&(a.flags|=16384))),pd(e,t)):Oi(e)}function Oi(t){var e=t;do{if((e.flags&32768)!==0){pd(e,pn);return}t=e.return;var n=Wm(e.alternate,e,We);if(n!==null){gt=n;return}if(e=e.sibling,e!==null){gt=e;return}gt=e=t}while(e!==null);Ht===0&&(Ht=5)}function pd(t,e){do{var n=Pm(t.alternate,t);if(n!==null){n.flags&=32767,gt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){gt=t;return}gt=t=n}while(t!==null);Ht=6,gt=null}function yd(t,e,n,a,l,i,s,u,p){t.cancelPendingCommit=null;do Ui();while(Qt!==0);if((xt&6)!==0)throw Error(o(327));if(e!==null){if(e===t.current)throw Error(o(177));if(i=e.lanes|e.childLanes,i|=Hs,Yg(t,n,i,s,u,p),t===Dt&&(gt=Dt=null,pt=0),Ma=e,bn=t,Pe=n,Ko=i,Zo=l,sd=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,f0(Hl,function(){return xd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=_.T,_.T=null,l=Z.p,Z.p=2,s=xt,xt|=4;try{t0(t,e,n)}finally{xt=s,Z.p=l,_.T=a}}Qt=1,vd(),bd(),wd()}}function vd(){if(Qt===1){Qt=0;var t=bn,e=Ma,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=_.T,_.T=null;var a=Z.p;Z.p=2;var l=xt;xt|=4;try{Wf(e,t);var i=rr,s=ac(t.containerInfo),u=i.focusedElem,p=i.selectionRange;if(s!==u&&u&&u.ownerDocument&&nc(u.ownerDocument.documentElement,u)){if(p!==null&&ks(u)){var E=p.start,M=p.end;if(M===void 0&&(M=E),"selectionStart"in u)u.selectionStart=E,u.selectionEnd=Math.min(M,u.value.length);else{var O=u.ownerDocument||document,N=O&&O.defaultView||window;if(N.getSelection){var A=N.getSelection(),W=u.textContent.length,st=Math.min(p.start,W),Mt=p.end===void 0?st:Math.min(p.end,W);!A.extend&&st>Mt&&(s=Mt,Mt=st,st=s);var x=ec(u,st),b=ec(u,Mt);if(x&&b&&(A.rangeCount!==1||A.anchorNode!==x.node||A.anchorOffset!==x.offset||A.focusNode!==b.node||A.focusOffset!==b.offset)){var T=O.createRange();T.setStart(x.node,x.offset),A.removeAllRanges(),st>Mt?(A.addRange(T),A.extend(b.node,b.offset)):(T.setEnd(b.node,b.offset),A.addRange(T))}}}}for(O=[],A=u;A=A.parentNode;)A.nodeType===1&&O.push({element:A,left:A.scrollLeft,top:A.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<O.length;u++){var R=O[u];R.element.scrollLeft=R.left,R.element.scrollTop=R.top}}Zi=!!or,rr=or=null}finally{xt=l,Z.p=a,_.T=n}}t.current=e,Qt=2}}function bd(){if(Qt===2){Qt=0;var t=bn,e=Ma,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=_.T,_.T=null;var a=Z.p;Z.p=2;var l=xt;xt|=4;try{Zf(t,e.alternate,e)}finally{xt=l,Z.p=a,_.T=n}}Qt=3}}function wd(){if(Qt===4||Qt===3){Qt=0,Rg();var t=bn,e=Ma,n=Pe,a=sd;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Qt=5:(Qt=0,Ma=bn=null,Sd(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),hs(n),e=e.stateNode,ue&&typeof ue.onCommitFiberRoot=="function")try{ue.onCommitFiberRoot(Ya,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=_.T,l=Z.p,Z.p=2,_.T=null;try{for(var i=t.onRecoverableError,s=0;s<a.length;s++){var u=a[s];i(u.value,{componentStack:u.stack})}}finally{_.T=e,Z.p=l}}(Pe&3)!==0&&Ui(),Oe(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Io?Sl++:(Sl=0,Io=t):Sl=0,xl(0)}}function Sd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,nl(e)))}function Ui(){return vd(),bd(),wd(),xd()}function xd(){if(Qt!==5)return!1;var t=bn,e=Ko;Ko=0;var n=hs(Pe),a=_.T,l=Z.p;try{Z.p=32>n?32:n,_.T=null,n=Zo,Zo=null;var i=bn,s=Pe;if(Qt=0,Ma=bn=null,Pe=0,(xt&6)!==0)throw Error(o(331));var u=xt;if(xt|=4,ad(i.current),td(i,i.current,s,n),xt=u,xl(0,!1),ue&&typeof ue.onPostCommitFiberRoot=="function")try{ue.onPostCommitFiberRoot(Ya,i)}catch{}return!0}finally{Z.p=l,_.T=a,Sd(t,e)}}function Td(t,e,n){e=Se(n,e),e=Ao(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(Ga(t,2),Oe(t))}function Nt(t,e,n){if(t.tag===3)Td(t,t,n);else for(;e!==null;){if(e.tag===3){Td(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=Se(n,t),n=Ef(2),a=dn(e,n,2),a!==null&&(Nf(n,a,e,t),Ga(a,2),Oe(a));break}}e=e.return}}function $o(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new a0;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Xo=!0,l.add(n),t=r0.bind(null,t,e,n),e.then(t,t))}function r0(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Dt===t&&(pt&n)===n&&(Ht===4||Ht===3&&(pt&62914560)===pt&&300>re()-Mi?(xt&2)===0&&Da(t,0):Vo|=n,_a===pt&&(_a=0)),Oe(t)}function Ed(t,e){e===0&&(e=yu()),t=Un(t,e),t!==null&&(Ga(t,e),Oe(t))}function u0(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Ed(t,n)}function c0(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(o(314))}a!==null&&a.delete(e),Ed(t,n)}function f0(t,e){return us(t,e)}var ji=null,ka=null,Wo=!1,Hi=!1,Po=!1,Sn=0;function Oe(t){t!==ka&&t.next===null&&(ka===null?ji=ka=t:ka=ka.next=t),Hi=!0,Wo||(Wo=!0,h0())}function xl(t,e){if(!Po&&Hi){Po=!0;do for(var n=!1,a=ji;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var s=a.suspendedLanes,u=a.pingedLanes;i=(1<<31-ce(42|t)+1)-1,i&=l&~(s&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,_d(a,i))}else i=pt,i=ql(a,a===Dt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||qa(a,i)||(n=!0,_d(a,i));a=a.next}while(n);Po=!1}}function d0(){Nd()}function Nd(){Hi=Wo=!1;var t=0;Sn!==0&&T0()&&(t=Sn);for(var e=re(),n=null,a=ji;a!==null;){var l=a.next,i=Ad(a,e);i===0?(a.next=null,n===null?ji=l:n.next=l,l===null&&(ka=n)):(n=a,(t!==0||(i&3)!==0)&&(Hi=!0)),a=l}Qt!==0&&Qt!==5||xl(t),Sn!==0&&(Sn=0)}function Ad(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var s=31-ce(i),u=1<<s,p=l[s];p===-1?((u&n)===0||(u&a)!==0)&&(l[s]=Lg(u,e)):p<=e&&(t.expiredLanes|=u),i&=~u}if(e=Dt,n=pt,n=ql(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(Et===2||Et===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&cs(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||qa(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&cs(a),hs(n)){case 2:case 8:n=mu;break;case 32:n=Hl;break;case 268435456:n=pu;break;default:n=Hl}return a=Cd.bind(null,t),n=us(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&cs(a),t.callbackPriority=2,t.callbackNode=null,2}function Cd(t,e){if(Qt!==0&&Qt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Ui()&&t.callbackNode!==n)return null;var a=pt;return a=ql(t,t===Dt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(rd(t,a,e),Ad(t,re()),t.callbackNode!=null&&t.callbackNode===n?Cd.bind(null,t):null)}function _d(t,e){if(Ui())return null;rd(t,e,!0)}function h0(){N0(function(){(xt&6)!==0?us(gu,d0):Nd()})}function tr(){if(Sn===0){var t=ya;t===0&&(t=Bl,Bl<<=1,(Bl&261888)===0&&(Bl=256)),Sn=t}return Sn}function Md(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ql(""+t)}function Dd(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function g0(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=Md((l[ee]||null).action),s=a.submitter;s&&(e=(e=s[ee]||null)?Md(e.formAction):s.getAttribute("formAction"),e!==null&&(i=e,s=null));var u=new Jl("action","action",null,a,l);t.push({event:u,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Sn!==0){var p=s?Dd(l,s):new FormData(l);wo(n,{pending:!0,data:p,method:l.method,action:i},null,p)}}else typeof i=="function"&&(u.preventDefault(),p=s?Dd(l,s):new FormData(l),wo(n,{pending:!0,data:p,method:l.method,action:i},i,p))},currentTarget:l}]})}}for(var er=0;er<js.length;er++){var nr=js[er],m0=nr.toLowerCase(),p0=nr[0].toUpperCase()+nr.slice(1);_e(m0,"on"+p0)}_e(sc,"onAnimationEnd"),_e(oc,"onAnimationIteration"),_e(rc,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(km,"onTransitionRun"),_e(zm,"onTransitionStart"),_e(Om,"onTransitionCancel"),_e(uc,"onTransitionEnd"),aa("onMouseEnter",["mouseout","mouseover"]),aa("onMouseLeave",["mouseout","mouseover"]),aa("onPointerEnter",["pointerout","pointerover"]),aa("onPointerLeave",["pointerout","pointerover"]),Rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Rn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Tl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),y0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Tl));function Rd(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var s=a.length-1;0<=s;s--){var u=a[s],p=u.instance,E=u.currentTarget;if(u=u.listener,p!==i&&l.isPropagationStopped())break t;i=u,l.currentTarget=E;try{i(l)}catch(M){Wl(M)}l.currentTarget=null,i=p}else for(s=0;s<a.length;s++){if(u=a[s],p=u.instance,E=u.currentTarget,u=u.listener,p!==i&&l.isPropagationStopped())break t;i=u,l.currentTarget=E;try{i(l)}catch(M){Wl(M)}l.currentTarget=null,i=p}}}}function mt(t,e){var n=e[gs];n===void 0&&(n=e[gs]=new Set);var a=t+"__bubble";n.has(a)||(kd(e,t,2,!1),n.add(a))}function ar(t,e,n){var a=0;e&&(a|=4),kd(n,t,a,e)}var Bi="_reactListening"+Math.random().toString(36).slice(2);function lr(t){if(!t[Bi]){t[Bi]=!0,Eu.forEach(function(n){n!=="selectionchange"&&(y0.has(n)||ar(n,!1,t),ar(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Bi]||(e[Bi]=!0,ar("selectionchange",!1,e))}}function kd(t,e,n,a){switch(oh(e)){case 2:var l=Q0;break;case 8:l=K0;break;default:l=br}n=l.bind(null,e,n,t),l=void 0,!Ts||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function ir(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var s=a.tag;if(s===3||s===4){var u=a.stateNode.containerInfo;if(u===l)break;if(s===4)for(s=a.return;s!==null;){var p=s.tag;if((p===3||p===4)&&s.stateNode.containerInfo===l)return;s=s.return}for(;u!==null;){if(s=ta(u),s===null)return;if(p=s.tag,p===5||p===6||p===26||p===27){a=i=s;continue t}u=u.parentNode}}a=a.return}ju(function(){var E=i,M=Ss(n),O=[];t:{var N=cc.get(t);if(N!==void 0){var A=Jl,W=t;switch(t){case"keypress":if(Zl(n)===0)break t;case"keydown":case"keyup":A=cm;break;case"focusin":W="focus",A=Cs;break;case"focusout":W="blur",A=Cs;break;case"beforeblur":case"afterblur":A=Cs;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":A=Lu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":A=Wg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":A=hm;break;case sc:case oc:case rc:A=em;break;case uc:A=mm;break;case"scroll":case"scrollend":A=Fg;break;case"wheel":A=ym;break;case"copy":case"cut":case"paste":A=am;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":A=qu;break;case"toggle":case"beforetoggle":A=bm}var st=(e&4)!==0,Mt=!st&&(t==="scroll"||t==="scrollend"),x=st?N!==null?N+"Capture":null:N;st=[];for(var b=E,T;b!==null;){var R=b;if(T=R.stateNode,R=R.tag,R!==5&&R!==26&&R!==27||T===null||x===null||(R=Qa(b,x),R!=null&&st.push(El(b,R,T))),Mt)break;b=b.return}0<st.length&&(N=new A(N,W,null,n,M),O.push({event:N,listeners:st}))}}if((e&7)===0){t:{if(N=t==="mouseover"||t==="pointerover",A=t==="mouseout"||t==="pointerout",N&&n!==ws&&(W=n.relatedTarget||n.fromElement)&&(ta(W)||W[Pn]))break t;if((A||N)&&(N=M.window===M?M:(N=M.ownerDocument)?N.defaultView||N.parentWindow:window,A?(W=n.relatedTarget||n.toElement,A=E,W=W?ta(W):null,W!==null&&(Mt=h(W),st=W.tag,W!==Mt||st!==5&&st!==27&&st!==6)&&(W=null)):(A=null,W=E),A!==W)){if(st=Lu,R="onMouseLeave",x="onMouseEnter",b="mouse",(t==="pointerout"||t==="pointerover")&&(st=qu,R="onPointerLeave",x="onPointerEnter",b="pointer"),Mt=A==null?N:Va(A),T=W==null?N:Va(W),N=new st(R,b+"leave",A,n,M),N.target=Mt,N.relatedTarget=T,R=null,ta(M)===E&&(st=new st(x,b+"enter",W,n,M),st.target=T,st.relatedTarget=Mt,R=st),Mt=R,A&&W)e:{for(st=v0,x=A,b=W,T=0,R=x;R;R=st(R))T++;R=0;for(var lt=b;lt;lt=st(lt))R++;for(;0<T-R;)x=st(x),T--;for(;0<R-T;)b=st(b),R--;for(;T--;){if(x===b||b!==null&&x===b.alternate){st=x;break e}x=st(x),b=st(b)}st=null}else st=null;A!==null&&zd(O,N,A,st,!1),W!==null&&Mt!==null&&zd(O,Mt,W,st,!0)}}t:{if(N=E?Va(E):window,A=N.nodeName&&N.nodeName.toLowerCase(),A==="select"||A==="input"&&N.type==="file")var bt=Ju;else if(Zu(N))if(Fu)bt=Mm;else{bt=Cm;var nt=Am}else A=N.nodeName,!A||A.toLowerCase()!=="input"||N.type!=="checkbox"&&N.type!=="radio"?E&&bs(E.elementType)&&(bt=Ju):bt=_m;if(bt&&(bt=bt(t,E))){Iu(O,bt,n,M);break t}nt&&nt(t,N,E),t==="focusout"&&E&&N.type==="number"&&E.memoizedProps.value!=null&&vs(N,"number",N.value)}switch(nt=E?Va(E):window,t){case"focusin":(Zu(nt)||nt.contentEditable==="true")&&(ua=nt,zs=E,Pa=null);break;case"focusout":Pa=zs=ua=null;break;case"mousedown":Os=!0;break;case"contextmenu":case"mouseup":case"dragend":Os=!1,lc(O,n,M);break;case"selectionchange":if(Rm)break;case"keydown":case"keyup":lc(O,n,M)}var ft;if(Ms)t:{switch(t){case"compositionstart":var yt="onCompositionStart";break t;case"compositionend":yt="onCompositionEnd";break t;case"compositionupdate":yt="onCompositionUpdate";break t}yt=void 0}else ra?Qu(t,n)&&(yt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(yt="onCompositionStart");yt&&(Gu&&n.locale!=="ko"&&(ra||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&ra&&(ft=Hu()):(ln=M,Es="value"in ln?ln.value:ln.textContent,ra=!0)),nt=Li(E,yt),0<nt.length&&(yt=new Yu(yt,t,null,n,M),O.push({event:yt,listeners:nt}),ft?yt.data=ft:(ft=Ku(n),ft!==null&&(yt.data=ft)))),(ft=Sm?xm(t,n):Tm(t,n))&&(yt=Li(E,"onBeforeInput"),0<yt.length&&(nt=new Yu("onBeforeInput","beforeinput",null,n,M),O.push({event:nt,listeners:yt}),nt.data=ft)),g0(O,t,E,n,M)}Rd(O,e)})}function El(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Li(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Qa(t,n),l!=null&&a.unshift(El(t,l,i)),l=Qa(t,e),l!=null&&a.push(El(t,l,i))),t.tag===3)return a;t=t.return}return[]}function v0(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function zd(t,e,n,a,l){for(var i=e._reactName,s=[];n!==null&&n!==a;){var u=n,p=u.alternate,E=u.stateNode;if(u=u.tag,p!==null&&p===a)break;u!==5&&u!==26&&u!==27||E===null||(p=E,l?(E=Qa(n,i),E!=null&&s.unshift(El(n,E,p))):l||(E=Qa(n,i),E!=null&&s.push(El(n,E,p)))),n=n.return}s.length!==0&&t.push({event:e,listeners:s})}var b0=/\r\n?/g,w0=/\u0000|\uFFFD/g;function Od(t){return(typeof t=="string"?t:""+t).replace(b0,`
`).replace(w0,"")}function Ud(t,e){return e=Od(e),Od(t)===e}function _t(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||ia(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&ia(t,""+a);break;case"className":Xl(t,"class",a);break;case"tabIndex":Xl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Xl(t,n,a);break;case"style":Ou(t,a,i);break;case"data":if(e!=="object"){Xl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",l.name,l,null),_t(t,e,"formEncType",l.formEncType,l,null),_t(t,e,"formMethod",l.formMethod,l,null),_t(t,e,"formTarget",l.formTarget,l,null)):(_t(t,e,"encType",l.encType,l,null),_t(t,e,"method",l.method,l,null),_t(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=Be);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Ql(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Gl(t,"popover",a);break;case"xlinkActuate":He(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":He(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":He(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":He(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":He(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":He(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":He(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":He(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":He(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Gl(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Ig.get(n)||n,Gl(t,n,a))}}function sr(t,e,n,a,l,i){switch(n){case"style":Ou(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"children":typeof a=="string"?ia(t,a):(typeof a=="number"||typeof a=="bigint")&&ia(t,""+a);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=Be);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Nu.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[ee]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Gl(t,n,a)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var s=n[i];if(s!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:_t(t,e,i,s,n,null)}}l&&_t(t,e,"srcSet",n.srcSet,n,null),a&&_t(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var u=i=s=l=null,p=null,E=null;for(a in n)if(n.hasOwnProperty(a)){var M=n[a];if(M!=null)switch(a){case"name":l=M;break;case"type":s=M;break;case"checked":p=M;break;case"defaultChecked":E=M;break;case"value":i=M;break;case"defaultValue":u=M;break;case"children":case"dangerouslySetInnerHTML":if(M!=null)throw Error(o(137,e));break;default:_t(t,e,a,M,n,null)}}Du(t,i,u,p,E,s,l,!1);return;case"select":mt("invalid",t),a=s=i=null;for(l in n)if(n.hasOwnProperty(l)&&(u=n[l],u!=null))switch(l){case"value":i=u;break;case"defaultValue":s=u;break;case"multiple":a=u;default:_t(t,e,l,u,n,null)}e=i,n=s,t.multiple=!!a,e!=null?la(t,!!a,e,!1):n!=null&&la(t,!!a,n,!0);return;case"textarea":mt("invalid",t),i=l=a=null;for(s in n)if(n.hasOwnProperty(s)&&(u=n[s],u!=null))switch(s){case"value":a=u;break;case"defaultValue":l=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(o(91));break;default:_t(t,e,s,u,n,null)}ku(t,a,l,i);return;case"option":for(p in n)if(n.hasOwnProperty(p)&&(a=n[p],a!=null))switch(p){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_t(t,e,p,a,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(a=0;a<Tl.length;a++)mt(Tl[a],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(E in n)if(n.hasOwnProperty(E)&&(a=n[E],a!=null))switch(E){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:_t(t,e,E,a,n,null)}return;default:if(bs(e)){for(M in n)n.hasOwnProperty(M)&&(a=n[M],a!==void 0&&sr(t,e,M,a,n,void 0));return}}for(u in n)n.hasOwnProperty(u)&&(a=n[u],a!=null&&_t(t,e,u,a,n,null))}function S0(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,s=null,u=null,p=null,E=null,M=null;for(A in n){var O=n[A];if(n.hasOwnProperty(A)&&O!=null)switch(A){case"checked":break;case"value":break;case"defaultValue":p=O;default:a.hasOwnProperty(A)||_t(t,e,A,null,a,O)}}for(var N in a){var A=a[N];if(O=n[N],a.hasOwnProperty(N)&&(A!=null||O!=null))switch(N){case"type":i=A;break;case"name":l=A;break;case"checked":E=A;break;case"defaultChecked":M=A;break;case"value":s=A;break;case"defaultValue":u=A;break;case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(o(137,e));break;default:A!==O&&_t(t,e,N,A,a,O)}}ys(t,s,u,p,E,M,i,l);return;case"select":A=s=u=N=null;for(i in n)if(p=n[i],n.hasOwnProperty(i)&&p!=null)switch(i){case"value":break;case"multiple":A=p;default:a.hasOwnProperty(i)||_t(t,e,i,null,a,p)}for(l in a)if(i=a[l],p=n[l],a.hasOwnProperty(l)&&(i!=null||p!=null))switch(l){case"value":N=i;break;case"defaultValue":u=i;break;case"multiple":s=i;default:i!==p&&_t(t,e,l,i,a,p)}e=u,n=s,a=A,N!=null?la(t,!!n,N,!1):!!a!=!!n&&(e!=null?la(t,!!n,e,!0):la(t,!!n,n?[]:"",!1));return;case"textarea":A=N=null;for(u in n)if(l=n[u],n.hasOwnProperty(u)&&l!=null&&!a.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:_t(t,e,u,null,a,l)}for(s in a)if(l=a[s],i=n[s],a.hasOwnProperty(s)&&(l!=null||i!=null))switch(s){case"value":N=l;break;case"defaultValue":A=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(o(91));break;default:l!==i&&_t(t,e,s,l,a,i)}Ru(t,N,A);return;case"option":for(var W in n)if(N=n[W],n.hasOwnProperty(W)&&N!=null&&!a.hasOwnProperty(W))switch(W){case"selected":t.selected=!1;break;default:_t(t,e,W,null,a,N)}for(p in a)if(N=a[p],A=n[p],a.hasOwnProperty(p)&&N!==A&&(N!=null||A!=null))switch(p){case"selected":t.selected=N&&typeof N!="function"&&typeof N!="symbol";break;default:_t(t,e,p,N,a,A)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var st in n)N=n[st],n.hasOwnProperty(st)&&N!=null&&!a.hasOwnProperty(st)&&_t(t,e,st,null,a,N);for(E in a)if(N=a[E],A=n[E],a.hasOwnProperty(E)&&N!==A&&(N!=null||A!=null))switch(E){case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(o(137,e));break;default:_t(t,e,E,N,a,A)}return;default:if(bs(e)){for(var Mt in n)N=n[Mt],n.hasOwnProperty(Mt)&&N!==void 0&&!a.hasOwnProperty(Mt)&&sr(t,e,Mt,void 0,a,N);for(M in a)N=a[M],A=n[M],!a.hasOwnProperty(M)||N===A||N===void 0&&A===void 0||sr(t,e,M,N,a,A);return}}for(var x in n)N=n[x],n.hasOwnProperty(x)&&N!=null&&!a.hasOwnProperty(x)&&_t(t,e,x,null,a,N);for(O in a)N=a[O],A=n[O],!a.hasOwnProperty(O)||N===A||N==null&&A==null||_t(t,e,O,N,a,A)}function jd(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function x0(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,s=l.initiatorType,u=l.duration;if(i&&u&&jd(s)){for(s=0,u=l.responseEnd,a+=1;a<n.length;a++){var p=n[a],E=p.startTime;if(E>u)break;var M=p.transferSize,O=p.initiatorType;M&&jd(O)&&(p=p.responseEnd,s+=M*(p<u?1:(u-E)/(p-E)))}if(--a,e+=8*(i+s)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var or=null,rr=null;function Yi(t){return t.nodeType===9?t:t.ownerDocument}function Hd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Bd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function ur(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var cr=null;function T0(){var t=window.event;return t&&t.type==="popstate"?t===cr?!1:(cr=t,!0):(cr=null,!1)}var Ld=typeof setTimeout=="function"?setTimeout:void 0,E0=typeof clearTimeout=="function"?clearTimeout:void 0,Yd=typeof Promise=="function"?Promise:void 0,N0=typeof queueMicrotask=="function"?queueMicrotask:typeof Yd<"u"?function(t){return Yd.resolve(null).then(t).catch(A0)}:Ld;function A0(t){setTimeout(function(){throw t})}function xn(t){return t==="head"}function qd(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),ja(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Nl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Nl(n);for(var i=n.firstChild;i;){var s=i.nextSibling,u=i.nodeName;i[Xa]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=s}}else n==="body"&&Nl(t.ownerDocument.body);n=l}while(n);ja(e)}function Gd(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function fr(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":fr(n),ms(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function C0(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[Xa])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ae(t.nextSibling),t===null)break}return null}function _0(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ae(t.nextSibling),t===null))return null;return t}function Xd(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ae(t.nextSibling),t===null))return null;return t}function dr(t){return t.data==="$?"||t.data==="$~"}function hr(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function M0(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ae(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var gr=null;function Vd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ae(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Qd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Kd(t,e,n){switch(e=Yi(n),t){case"html":if(t=e.documentElement,!t)throw Error(o(452));return t;case"head":if(t=e.head,!t)throw Error(o(453));return t;case"body":if(t=e.body,!t)throw Error(o(454));return t;default:throw Error(o(451))}}function Nl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);ms(t)}var Ce=new Map,Zd=new Set;function qi(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=Z.d;Z.d={f:D0,r:R0,D:k0,C:z0,L:O0,m:U0,X:H0,S:j0,M:B0};function D0(){var t=tn.f(),e=ki();return t||e}function R0(t){var e=ea(t);e!==null&&e.tag===5&&e.type==="form"?cf(e):tn.r(t)}var za=typeof document>"u"?null:document;function Id(t,e,n){var a=za;if(a&&typeof e=="string"&&e){var l=be(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),Zd.has(l)||(Zd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),Wt(e,"link",t),Kt(e),a.head.appendChild(e)))}}function k0(t){tn.D(t),Id("dns-prefetch",t,null)}function z0(t,e){tn.C(t,e),Id("preconnect",t,e)}function O0(t,e,n){tn.L(t,e,n);var a=za;if(a&&t&&e){var l='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+be(n.imageSizes)+'"]')):l+='[href="'+be(t)+'"]';var i=l;switch(e){case"style":i=Oa(t);break;case"script":i=Ua(t)}Ce.has(i)||(t=C({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ce.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(Al(i))||e==="script"&&a.querySelector(Cl(i))||(e=a.createElement("link"),Wt(e,"link",t),Kt(e),a.head.appendChild(e)))}}function U0(t,e){tn.m(t,e);var n=za;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ua(t)}if(!Ce.has(i)&&(t=C({rel:"modulepreload",href:t},e),Ce.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Cl(i)))return}a=n.createElement("link"),Wt(a,"link",t),Kt(a),n.head.appendChild(a)}}}function j0(t,e,n){tn.S(t,e,n);var a=za;if(a&&t){var l=na(a).hoistableStyles,i=Oa(t);e=e||"default";var s=l.get(i);if(!s){var u={loading:0,preload:null};if(s=a.querySelector(Al(i)))u.loading=5;else{t=C({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ce.get(i))&&mr(t,n);var p=s=a.createElement("link");Kt(p),Wt(p,"link",t),p._p=new Promise(function(E,M){p.onload=E,p.onerror=M}),p.addEventListener("load",function(){u.loading|=1}),p.addEventListener("error",function(){u.loading|=2}),u.loading|=4,Gi(s,e,a)}s={type:"stylesheet",instance:s,count:1,state:u},l.set(i,s)}}}function H0(t,e){tn.X(t,e);var n=za;if(n&&t){var a=na(n).hoistableScripts,l=Ua(t),i=a.get(l);i||(i=n.querySelector(Cl(l)),i||(t=C({src:t,async:!0},e),(e=Ce.get(l))&&pr(t,e),i=n.createElement("script"),Kt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function B0(t,e){tn.M(t,e);var n=za;if(n&&t){var a=na(n).hoistableScripts,l=Ua(t),i=a.get(l);i||(i=n.querySelector(Cl(l)),i||(t=C({src:t,async:!0,type:"module"},e),(e=Ce.get(l))&&pr(t,e),i=n.createElement("script"),Kt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Jd(t,e,n,a){var l=(l=dt.current)?qi(l):null;if(!l)throw Error(o(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Oa(n.href),n=na(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Oa(n.href);var i=na(l).hoistableStyles,s=i.get(t);if(s||(l=l.ownerDocument||l,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,s),(i=l.querySelector(Al(t)))&&!i._p&&(s.instance=i,s.state.loading=5),Ce.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ce.set(t,n),i||L0(l,t,n,s.state))),e&&a===null)throw Error(o(528,""));return s}if(e&&a!==null)throw Error(o(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ua(n),n=na(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,t))}}function Oa(t){return'href="'+be(t)+'"'}function Al(t){return'link[rel="stylesheet"]['+t+"]"}function Fd(t){return C({},t,{"data-precedence":t.precedence,precedence:null})}function L0(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Wt(e,"link",n),Kt(e),t.head.appendChild(e))}function Ua(t){return'[src="'+be(t)+'"]'}function Cl(t){return"script[async]"+t}function $d(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Kt(a),a;var l=C({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Kt(a),Wt(a,"style",l),Gi(a,n.precedence,t),e.instance=a;case"stylesheet":l=Oa(n.href);var i=t.querySelector(Al(l));if(i)return e.state.loading|=4,e.instance=i,Kt(i),i;a=Fd(n),(l=Ce.get(l))&&mr(a,l),i=(t.ownerDocument||t).createElement("link"),Kt(i);var s=i;return s._p=new Promise(function(u,p){s.onload=u,s.onerror=p}),Wt(i,"link",a),e.state.loading|=4,Gi(i,n.precedence,t),e.instance=i;case"script":return i=Ua(n.src),(l=t.querySelector(Cl(i)))?(e.instance=l,Kt(l),l):(a=n,(l=Ce.get(i))&&(a=C({},n),pr(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Kt(l),Wt(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(o(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Gi(a,n.precedence,t));return e.instance}function Gi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,s=0;s<a.length;s++){var u=a[s];if(u.dataset.precedence===e)i=u;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function mr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function pr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Xi=null;function Wd(t,e,n){if(Xi===null){var a=new Map,l=Xi=new Map;l.set(n,a)}else l=Xi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[Xa]||i[It]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var s=i.getAttribute(e)||"";s=t+s;var u=a.get(s);u?u.push(i):a.set(s,[i])}}return a}function Pd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function Y0(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function th(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function q0(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=Oa(a.href),i=e.querySelector(Al(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Vi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Kt(i);return}i=e.ownerDocument||e,a=Fd(a),(l=Ce.get(l))&&mr(a,l),i=i.createElement("link"),Kt(i);var s=i;s._p=new Promise(function(u,p){s.onload=u,s.onerror=p}),Wt(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Vi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var yr=0;function G0(t,e){return t.stylesheets&&t.count===0&&Ki(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Ki(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&yr===0&&(yr=62500*x0());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Ki(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>yr?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Vi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ki(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Qi=null;function Ki(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Qi=new Map,e.forEach(X0,t),Qi=null,Vi.call(t))}function X0(t,e){if(!(e.state.loading&4)){var n=Qi.get(t);if(n)var a=n.get(null);else{n=new Map,Qi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var s=l[i];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(n.set(s.dataset.precedence,s),a=s)}a&&n.set(null,a)}l=e.instance,s=l.getAttribute("data-precedence"),i=n.get(s)||a,i===a&&n.set(null,l),n.set(s,l),this.count++,a=Vi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var _l={$$typeof:D,Provider:null,Consumer:null,_currentValue:it,_currentValue2:it,_threadCount:0};function V0(t,e,n,a,l,i,s,u,p){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=fs(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fs(0),this.hiddenUpdates=fs(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=p,this.incompleteTransitions=new Map}function eh(t,e,n,a,l,i,s,u,p,E,M,O){return t=new V0(t,e,n,s,p,E,M,O,u),e=1,i===!0&&(e|=24),i=de(3,null,null,e),t.current=i,i.stateNode=t,e=Js(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},Ps(i),t}function nh(t){return t?(t=da,t):da}function ah(t,e,n,a,l,i){l=nh(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(oe(n,t,e),sl(n,t,e))}function lh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function vr(t,e){lh(t,e),(t=t.alternate)&&lh(t,e)}function ih(t){if(t.tag===13||t.tag===31){var e=Un(t,67108864);e!==null&&oe(e,t,67108864),vr(t,67108864)}}function sh(t){if(t.tag===13||t.tag===31){var e=ye();e=ds(e);var n=Un(t,e);n!==null&&oe(n,t,e),vr(t,e)}}var Zi=!0;function Q0(t,e,n,a){var l=_.T;_.T=null;var i=Z.p;try{Z.p=2,br(t,e,n,a)}finally{Z.p=i,_.T=l}}function K0(t,e,n,a){var l=_.T;_.T=null;var i=Z.p;try{Z.p=8,br(t,e,n,a)}finally{Z.p=i,_.T=l}}function br(t,e,n,a){if(Zi){var l=wr(a);if(l===null)ir(t,e,a,Ii,n),rh(t,a);else if(I0(l,t,e,n,a))a.stopPropagation();else if(rh(t,a),e&4&&-1<Z0.indexOf(t)){for(;l!==null;){var i=ea(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var s=Dn(i.pendingLanes);if(s!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;s;){var p=1<<31-ce(s);u.entanglements[1]|=p,s&=~p}Oe(i),(xt&6)===0&&(Di=re()+500,xl(0))}}break;case 31:case 13:u=Un(i,2),u!==null&&oe(u,i,2),ki(),vr(i,2)}if(i=wr(a),i===null&&ir(t,e,a,Ii,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else ir(t,e,a,null,n)}}function wr(t){return t=Ss(t),Sr(t)}var Ii=null;function Sr(t){if(Ii=null,t=ta(t),t!==null){var e=h(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=y(e),t!==null)return t;t=null}else if(n===31){if(t=S(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ii=t,null}function oh(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(kg()){case gu:return 2;case mu:return 8;case Hl:case zg:return 32;case pu:return 268435456;default:return 32}default:return 32}}var xr=!1,Tn=null,En=null,Nn=null,Ml=new Map,Dl=new Map,An=[],Z0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function rh(t,e){switch(t){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":En=null;break;case"mouseover":case"mouseout":Nn=null;break;case"pointerover":case"pointerout":Ml.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Dl.delete(e.pointerId)}}function Rl(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=ea(e),e!==null&&ih(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function I0(t,e,n,a,l){switch(e){case"focusin":return Tn=Rl(Tn,t,e,n,a,l),!0;case"dragenter":return En=Rl(En,t,e,n,a,l),!0;case"mouseover":return Nn=Rl(Nn,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return Ml.set(i,Rl(Ml.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Dl.set(i,Rl(Dl.get(i)||null,t,e,n,a,l)),!0}return!1}function uh(t){var e=ta(t.target);if(e!==null){var n=h(e);if(n!==null){if(e=n.tag,e===13){if(e=y(n),e!==null){t.blockedOn=e,xu(t.priority,function(){sh(n)});return}}else if(e===31){if(e=S(n),e!==null){t.blockedOn=e,xu(t.priority,function(){sh(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ji(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=wr(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);ws=a,n.target.dispatchEvent(a),ws=null}else return e=ea(n),e!==null&&ih(e),t.blockedOn=n,!1;e.shift()}return!0}function ch(t,e,n){Ji(t)&&n.delete(e)}function J0(){xr=!1,Tn!==null&&Ji(Tn)&&(Tn=null),En!==null&&Ji(En)&&(En=null),Nn!==null&&Ji(Nn)&&(Nn=null),Ml.forEach(ch),Dl.forEach(ch)}function Fi(t,e){t.blockedOn===e&&(t.blockedOn=null,xr||(xr=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,J0)))}var $i=null;function fh(t){$i!==t&&($i=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){$i===t&&($i=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(Sr(a||n)===null)continue;break}var i=ea(n);i!==null&&(t.splice(e,3),e-=3,wo(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function ja(t){function e(p){return Fi(p,t)}Tn!==null&&Fi(Tn,t),En!==null&&Fi(En,t),Nn!==null&&Fi(Nn,t),Ml.forEach(e),Dl.forEach(e);for(var n=0;n<An.length;n++){var a=An[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<An.length&&(n=An[0],n.blockedOn===null);)uh(n),n.blockedOn===null&&An.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],s=l[ee]||null;if(typeof i=="function")s||fh(n);else if(s){var u=null;if(i&&i.hasAttribute("formAction")){if(l=i,s=i[ee]||null)u=s.formAction;else if(Sr(l)!==null)continue}else u=s.action;typeof u=="function"?n[a+1]=u:(n.splice(a,3),a-=3),fh(n)}}}function dh(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(s){return l=s})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function Tr(t){this._internalRoot=t}Wi.prototype.render=Tr.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(o(409));var n=e.current,a=ye();ah(n,a,t,e,null,null)},Wi.prototype.unmount=Tr.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ah(t.current,2,null,t,null,null),ki(),e[Pn]=null}};function Wi(t){this._internalRoot=t}Wi.prototype.unstable_scheduleHydration=function(t){if(t){var e=Su();t={blockedOn:null,target:t,priority:e};for(var n=0;n<An.length&&e!==0&&e<An[n].priority;n++);An.splice(n,0,t),n===0&&uh(t)}};var hh=c.version;if(hh!=="19.2.6")throw Error(o(527,hh,"19.2.6"));Z.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(o(188)):(t=Object.keys(t).join(","),Error(o(268,t)));return t=v(e),t=t!==null?k(t):null,t=t===null?null:t.stateNode,t};var F0={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:_,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Pi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Pi.isDisabled&&Pi.supportsFiber)try{Ya=Pi.inject(F0),ue=Pi}catch{}}return zl.createRoot=function(t,e){if(!f(t))throw Error(o(299));var n=!1,a="",l=wf,i=Sf,s=xf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=eh(t,1,!1,null,null,n,a,null,l,i,s,dh),t[Pn]=e.current,lr(t),new Tr(e)},zl.hydrateRoot=function(t,e,n){if(!f(t))throw Error(o(299));var a=!1,l="",i=wf,s=Sf,u=xf,p=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(s=n.onCaughtError),n.onRecoverableError!==void 0&&(u=n.onRecoverableError),n.formState!==void 0&&(p=n.formState)),e=eh(t,1,!0,e,n??null,a,l,p,i,s,u,dh),e.context=nh(null),n=e.current,a=ye(),a=ds(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,Ga(e,n),Oe(e),t[Pn]=e.current,lr(t),new Wi(e)},zl.version="19.2.6",zl}var Th;function op(){if(Th)return Ar.exports;Th=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(c){console.error(c)}}return r(),Ar.exports=sp(),Ar.exports}var rp=op();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const up=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),gg=(...r)=>r.filter((c,d,o)=>!!c&&c.trim()!==""&&o.indexOf(c)===d).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var cp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=ot.forwardRef(({color:r="currentColor",size:c=24,strokeWidth:d=2,absoluteStrokeWidth:o,className:f="",children:h,iconNode:y,...S},m)=>ot.createElement("svg",{ref:m,...cp,width:c,height:c,stroke:r,strokeWidth:o?Number(d)*24/Number(c):d,className:gg("lucide",f),...S},[...y.map(([v,k])=>ot.createElement(v,k)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=(r,c)=>{const d=ot.forwardRef(({className:o,...f},h)=>ot.createElement(fp,{ref:h,iconNode:c,className:gg(`lucide-${up(r)}`,o),...f}));return d.displayName=`${r}`,d};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=Vt("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ls=Vt("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=Vt("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pg=Vt("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dp=Vt("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yg=Vt("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hp=Vt("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vg=Vt("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gp=Vt("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mp=Vt("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pp=Vt("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yp=Vt("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vp=Vt("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eh=Vt("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bp=Vt("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wp=Vt("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=Vt("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xp=Vt("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tp=Vt("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const su=Vt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function as({group:r,size:c="md",dim:d}){const o=c==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return g.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${r.bgClass} ${r.textClass} ${o} ${d?"opacity-40":""}`,children:r.label})}const Ha=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Nh=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function bg(r){if(r.length===0)return"";const c=[...r].sort((k,C)=>k.date.localeCompare(C.date)),d=c[0].date,o=c[c.length-1].date,[f,h,y]=d.split("-").map(Number),[S,m,v]=o.split("-").map(Number);return d===o?`${Ha[h-1]} ${y}, ${f}`:f===S&&h===m?`${Ha[h-1]} ${y}–${v}, ${f}`:f===S?`${Ha[h-1]} ${y} – ${Ha[m-1]} ${v}, ${f}`:`${Ha[h-1]} ${y}, ${f} – ${Ha[m-1]} ${v}, ${S}`}function Ep(r){if(r.length===0)return"";const c=[...r].sort((B,K)=>B.date.localeCompare(K.date)),d=c[0].date,o=c[c.length-1].date,[f,h,y]=d.split("-").map(Number),[S,m,v]=o.split("-").map(Number),k=Nh[new Date(f,h-1,y).getDay()],C=bg(r);if(d===o)return`${C} (${k})`;const H=Nh[new Date(S,m-1,v).getDay()];return`${C} (${k}–${H})`}function ou(r){return r.subtitle??bg(r.days)}function en(r){const[c,d]=r.split(":").map(Number);return c*60+d}const Np=30;function Ap(r,c){let d=-1;for(let S=0;S<r.length&&en(r[S])<=c;S++)d=S;if(d===-1)return{index:-1,progress:0};const o=en(r[d]),f=r[d+1]?en(r[d+1]):null,h=f!==null?f:o+Np;if(c>=h)return{index:-1,progress:0};const y=h===o?0:(c-o)/(h-o);return{index:d,progress:Math.max(0,Math.min(1,y))}}function wg(r){const[c,d]=r.split(":").map(Number);return`${c%12||12}:${d.toString().padStart(2,"0")}`}function Sg(r){const[c]=r.split(":").map(Number);return c>=12?"PM":"AM"}function ru(){const r=new Date;return r.getHours()*60+r.getMinutes()}function Fn(){const r=new Date,c=r.getFullYear(),d=String(r.getMonth()+1).padStart(2,"0"),o=String(r.getDate()).padStart(2,"0");return`${c}-${d}-${o}`}function Cp(){const r=new Date,c=r.getHours(),d=r.getMinutes(),o=c%12||12,f=c>=12?"PM":"AM";return`${o}:${d.toString().padStart(2,"0")} ${f}`}function _p(r){if(r<=0)return"";if(r<60)return`${r} min`;const c=Math.floor(r/60),d=r%60;return d===0?`${c}h`:`${c}h ${d}m`}function Mp(r){const c=new Date(r);if(isNaN(c.getTime()))return r;const d=c.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),o=c.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${d}, ${o}`}function Ah(r,c){return r.flatMap(d=>{const o=c.find(f=>f.id===d);return o?[o]:[]})}function Dp({activity:r,runGroups:c,past:d}){const o=Ah(r.onTrack,c),f=Ah(r.inClass??[],c);return g.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${d?"opacity-60":""}`,children:g.jsxs("div",{className:"flex gap-4",children:[g.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[wg(r.time),g.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:Sg(r.time)})]}),g.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[o.length>0&&g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),g.jsx("div",{className:"flex flex-wrap gap-1.5",children:o.map(h=>g.jsx(as,{group:h},h.id))})]}),f.length>0&&g.jsxs(g.Fragment,{children:[o.length>0&&g.jsx("div",{className:"border-t border-gray-100"}),g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),g.jsx("div",{className:"flex flex-wrap gap-1.5",children:f.map(h=>g.jsx(as,{group:h},h.id))})]})]}),r.note&&g.jsx("p",{className:"text-xs italic text-gray-500",children:r.note})]})]})})}function Rp({activity:r,past:c}){const d=r.type==="lunch"||r.type==="special";return g.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${d?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${c?"opacity-60":""}`,children:g.jsxs("div",{className:"flex items-center gap-4",children:[g.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[wg(r.time),g.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:Sg(r.time)})]}),d&&g.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:r.type==="lunch"?g.jsx(Tp,{size:16}):g.jsx(bp,{size:16})}),g.jsxs("div",{children:[g.jsx("p",{className:"text-sm font-medium text-gray-900",children:r.label}),r.subtitle&&g.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:r.subtitle})]})]})})}const nu=ot.forwardRef(({activities:r},c)=>{const[,d]=ot.useState(0);ot.useEffect(()=>{const m=setInterval(()=>d(v=>v+1),3e4);return()=>clearInterval(m)},[]);const o=ru(),h=r.filter(m=>"time"in m).find(m=>en(m.time)>o),y=h?en(h.time)-o:null,S=y!==null?y<=5?"text-red-500":y<=10?"text-orange-500":"text-gray-400":"text-gray-400";return g.jsxs("div",{ref:c,"data-time-indicator":!0,className:"relative my-6",children:[g.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[g.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),g.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),g.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:Cp()}),y!==null&&g.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${S}`,children:["Next activity starts in ",g.jsx("span",{className:"font-semibold",children:_p(y)})]})]})});nu.displayName="TimeIndicator";function Ch({collapsed:r,children:c}){return g.jsx("div",{"data-collapsed":r,"aria-hidden":r,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:r?"0fr":"1fr",opacity:r?0:1,marginBottom:r?0:"0.5rem"},children:g.jsx("div",{className:"overflow-hidden",children:c})})}function kp({activities:r,runGroups:c,isToday:d,selectedGroups:o,hidePast:f}){const h=ot.useRef(null),[,y]=ot.useState(0);ot.useEffect(()=>{if(!d)return;const z=setInterval(()=>y(D=>D+1),6e4);return()=>clearInterval(z)},[d]),ot.useEffect(()=>{if(!d)return;const z=setTimeout(()=>{var D;(D=h.current)==null||D.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(z)},[d]);const S=ru(),m=r.flatMap(z=>{if(z.type!=="session")return[z];if(o.length===0)return[z];const D=z.onTrack.filter(F=>o.includes(F)),Y=(z.inClass??[]).filter(F=>o.includes(F));return D.length===0&&Y.length===0?[]:[{...z,onTrack:D,inClass:Y}]}),v=m.map(z=>z.type!=="break"&&f&&d&&en(z.time)<S);m.forEach((z,D)=>{if(z.type!=="break")return;const Y=m.slice(0,D).some((F,X)=>F.type!=="break"&&!v[X]);v[D]=!Y});const k=[],C=[];m.forEach((z,D)=>{z.type!=="break"&&(k.push(D),C.push(z.time))});const{index:H}=d?Ap(C,S):{index:-1},B=H===-1?-1:k[H],K=d?m.findIndex(z=>z.type!=="break"&&en(z.time)>S):-1,L=d&&K===-1&&m.length>0,j=m.length>0&&v.every(Boolean);let G;return g.jsxs("div",{className:"flex flex-col pb-10",children:[m.length>0&&g.jsx(Ch,{collapsed:!j,children:g.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[g.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),g.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),m.map((z,D)=>{const Y=D===B,F=d&&z.type!=="break"&&!Y&&en(z.time)<S;let X=null;!v[D]&&z.type==="session"&&z.sessionNumber!==void 0&&z.sessionNumber!==G&&(G=z.sessionNumber,X=g.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",z.sessionNumber]}));const q=z.type==="break"?g.jsxs("div",{className:"flex items-center gap-2 py-1",children:[g.jsx("div",{className:"h-px flex-1 bg-gray-200"}),g.jsx("span",{className:"text-xs text-gray-400 italic",children:z.label}),g.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):z.type==="session"?g.jsx(Dp,{activity:z,runGroups:c,past:F}):g.jsx(Rp,{activity:z,past:F});return g.jsxs(Ch,{collapsed:v[D],children:[D===K&&g.jsx(nu,{ref:h,activities:m}),X,q]},D)}),L&&g.jsx(nu,{ref:h,activities:m})]})}function zp({groups:r,selected:c,onChange:d}){const[o,f]=ot.useState(!1),h=m=>d(c.includes(m)?c.filter(v=>v!==m):[...c,m]),y=c.length===0||c.length===r.length,S=r.filter(m=>c.includes(m.id));return g.jsxs("div",{className:"relative",children:[g.jsxs("button",{onClick:()=>f(m=>!m),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[y?g.jsx("span",{className:"text-gray-700",children:"All run groups"}):g.jsx("div",{className:"flex items-center gap-1",children:S.map(m=>g.jsx(as,{group:m,size:"sm"},m.id))}),g.jsx(mg,{size:14,className:"text-gray-400"})]}),o&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>f(!1)}),g.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[r.map(m=>g.jsxs("button",{onClick:()=>h(m.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[g.jsx(as,{group:m,size:"md"}),c.includes(m.id)&&g.jsx(ls,{size:14,className:"text-blue-500"})]},m.id)),g.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:g.jsx("button",{onClick:()=>{d([]),f(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:y?"All selected":"Clear filter"})})]})]})]})}function ts(r){return r.days.reduce((c,d)=>d.date<c?d.date:c,r.days[0].date)}function _h(r){return r.days.reduce((c,d)=>d.date>c?d.date:c,r.days[0].date)}function xg(r,c=Fn()){return r.days.some(d=>d.date===c)?"live":r.days.every(d=>d.date>c)?"upcoming":"past"}function uu(r,c=Fn()){const d=[],o=[],f=[];for(const h of r){const y=xg(h,c);y==="live"?d.push(h):y==="upcoming"?o.push(h):f.push(h)}return d.sort((h,y)=>ts(h).localeCompare(ts(y))),o.sort((h,y)=>ts(h).localeCompare(ts(y))),f.sort((h,y)=>_h(y).localeCompare(_h(h))),{live:d,upcoming:o,past:f}}function Tg(){return g.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[g.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function Dr({event:r,active:c,isLive:d,onClick:o}){return g.jsxs("button",{onClick:o,className:`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left ${c?"bg-blue-50":"hover:bg-gray-50"}`,children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-1.5",children:[g.jsx("span",{className:"text-sm font-semibold text-gray-900",children:r.name}),d&&g.jsx(Tg,{})]}),g.jsx("div",{className:"text-xs text-gray-400",children:ou(r)})]}),c&&g.jsx(ls,{size:14,className:"text-blue-500 ml-3 shrink-0"})]})}function Rr({label:r}){return g.jsx("div",{className:"px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400",children:r})}function Op({events:r,active:c,onChange:d,onOpenDetails:o,onGoHome:f}){const[h,y]=ot.useState(!1),{live:S,upcoming:m,past:v}=uu(r),k=xg(c)==="live";return g.jsxs("div",{className:"relative min-w-0 pl-1",children:[g.jsxs("button",{onClick:()=>y(C=>!C),className:"flex items-center gap-1 text-left group min-w-0",children:[g.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:c.name}),k&&g.jsx(Tg,{}),g.jsx(mg,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),g.jsxs("div",{className:"flex items-center gap-0.5",children:[g.jsx("p",{className:"text-sm text-gray-500",children:ou(c)}),g.jsx("button",{onClick:o,"aria-label":"Event details",className:"inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900",children:g.jsx(mp,{size:14})})]}),h&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>y(!1)}),g.jsxs("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[240px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[g.jsxs("button",{onClick:()=>{f(),y(!1)},className:"flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left hover:bg-gray-50",children:[g.jsx(vg,{size:14,className:"text-gray-500"}),g.jsx("span",{className:"text-sm font-semibold text-gray-900",children:"Home"})]}),S.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(Rr,{label:"Live"}),S.map(C=>g.jsx(Dr,{event:C,active:C.id===c.id,isLive:!0,onClick:()=>{d(C),y(!1)}},C.id))]}),m.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(Rr,{label:"Upcoming"}),m.map(C=>g.jsx(Dr,{event:C,active:C.id===c.id,isLive:!1,onClick:()=>{d(C),y(!1)}},C.id))]}),v.length>0&&g.jsxs(g.Fragment,{children:[g.jsx(Rr,{label:"Past"}),v.map(C=>g.jsx(Dr,{event:C,active:C.id===c.id,isLive:!1,onClick:()=>{d(C),y(!1)}},C.id))]})]})]})]})}function Up({checked:r,onChange:c,label:d}){return g.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[d&&g.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:d}),g.jsx("button",{type:"button",role:"switch","aria-checked":r,onClick:c,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:r?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:g.jsx("span",{style:{position:"absolute",top:"2px",left:r?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const In=72,jp=110;function Hp({children:r,disabled:c,scrollContainerRef:d}){const[o,f]=ot.useState(0),[h,y]=ot.useState("idle"),S=ot.useRef(null),m=ot.useRef(0);ot.useEffect(()=>{if(c)return;const H=()=>{const j=d==null?void 0:d.current;return j?j.scrollTop:window.scrollY},B=j=>{H()===0&&(S.current=j.touches[0].clientY)},K=j=>{if(S.current===null)return;const G=j.touches[0].clientY-S.current;if(G<=0){S.current=null;return}j.preventDefault();const z=G<In?G:In+(G-In)*.25;m.current=Math.min(z,jp),f(m.current),y("pulling")},L=()=>{S.current!==null&&(S.current=null,m.current>=In?(y("refreshing"),f(In*.75),setTimeout(()=>window.location.reload(),600)):(y("releasing"),f(0),m.current=0,setTimeout(()=>y("idle"),250)))};return document.addEventListener("touchstart",B,{passive:!0}),document.addEventListener("touchmove",K,{passive:!1}),document.addEventListener("touchend",L),document.addEventListener("touchcancel",L),()=>{document.removeEventListener("touchstart",B),document.removeEventListener("touchmove",K),document.removeEventListener("touchend",L),document.removeEventListener("touchcancel",L)}},[c,d]);const v=h==="releasing"||h==="refreshing",k=Math.min(o/In,1),C=o>=In;return g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${o}px)`,transition:v?"transform 0.25s ease":"none"},children:g.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${C?"text-blue-500":"text-gray-400"}`,children:g.jsx(wp,{size:16,className:h==="refreshing"?"animate-spin":"",style:h!=="refreshing"?{transform:`rotate(${k*270}deg)`}:void 0})})}),g.jsx("div",{style:{transform:`translateY(${o}px)`,transition:v?"transform 0.25s ease":"none"},children:r})]})}function Bp({groups:r}){const c=r.filter(d=>d.description);return c.length===0?null:g.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[g.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),g.jsx("ul",{className:"flex flex-col gap-1.5",children:c.map(d=>g.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[g.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${d.bgClass}`,"aria-hidden":"true"}),g.jsx("span",{className:"font-medium text-gray-900",children:d.label}),g.jsx("span",{className:"text-gray-400",children:"·"}),g.jsx("span",{children:d.description})]},d.id))})]})}const Mh=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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
`;function Lp(){const[r,c]=ot.useState(!1);ot.useEffect(()=>{window.scrollTo(0,0)},[]);async function d(){await navigator.clipboard.writeText(Mh),c(!0),setTimeout(()=>c(!1),2e3)}return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsxs("button",{onClick:d,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[r?g.jsx(ls,{size:16,className:"text-green-600"}):g.jsx(yg,{size:16}),r?"Copied":"Copy"]}),g.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:g.jsx(su,{size:18})})]})]}),g.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",g.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),g.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:g.jsx("code",{children:Mh})})]})})}var Ba={},kr,Dh;function Yp(){return Dh||(Dh=1,kr=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),kr}var zr={},_n={},Rh;function $n(){if(Rh)return _n;Rh=1;let r;const c=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(o){if(!o)throw new Error('"version" cannot be null or undefined');if(o<1||o>40)throw new Error('"version" should be in range from 1 to 40');return o*4+17},_n.getSymbolTotalCodewords=function(o){return c[o]},_n.getBCHDigit=function(d){let o=0;for(;d!==0;)o++,d>>>=1;return o},_n.setToSJISFunction=function(o){if(typeof o!="function")throw new Error('"toSJISFunc" is not a valid function.');r=o},_n.isKanjiModeEnabled=function(){return typeof r<"u"},_n.toSJIS=function(o){return r(o)},_n}var Or={},kh;function cu(){return kh||(kh=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function c(d){if(typeof d!="string")throw new Error("Param is not a string");switch(d.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+d)}}r.isValid=function(o){return o&&typeof o.bit<"u"&&o.bit>=0&&o.bit<4},r.from=function(o,f){if(r.isValid(o))return o;try{return c(o)}catch{return f}}})(Or)),Or}var Ur,zh;function qp(){if(zh)return Ur;zh=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(c){const d=Math.floor(c/8);return(this.buffer[d]>>>7-c%8&1)===1},put:function(c,d){for(let o=0;o<d;o++)this.putBit((c>>>d-o-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(c){const d=Math.floor(this.length/8);this.buffer.length<=d&&this.buffer.push(0),c&&(this.buffer[d]|=128>>>this.length%8),this.length++}},Ur=r,Ur}var jr,Oh;function Gp(){if(Oh)return jr;Oh=1;function r(c){if(!c||c<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=c,this.data=new Uint8Array(c*c),this.reservedBit=new Uint8Array(c*c)}return r.prototype.set=function(c,d,o,f){const h=c*this.size+d;this.data[h]=o,f&&(this.reservedBit[h]=!0)},r.prototype.get=function(c,d){return this.data[c*this.size+d]},r.prototype.xor=function(c,d,o){this.data[c*this.size+d]^=o},r.prototype.isReserved=function(c,d){return this.reservedBit[c*this.size+d]},jr=r,jr}var Hr={},Uh;function Xp(){return Uh||(Uh=1,(function(r){const c=$n().getSymbolSize;r.getRowColCoords=function(o){if(o===1)return[];const f=Math.floor(o/7)+2,h=c(o),y=h===145?26:Math.ceil((h-13)/(2*f-2))*2,S=[h-7];for(let m=1;m<f-1;m++)S[m]=S[m-1]-y;return S.push(6),S.reverse()},r.getPositions=function(o){const f=[],h=r.getRowColCoords(o),y=h.length;for(let S=0;S<y;S++)for(let m=0;m<y;m++)S===0&&m===0||S===0&&m===y-1||S===y-1&&m===0||f.push([h[S],h[m]]);return f}})(Hr)),Hr}var Br={},jh;function Vp(){if(jh)return Br;jh=1;const r=$n().getSymbolSize,c=7;return Br.getPositions=function(o){const f=r(o);return[[0,0],[f-c,0],[0,f-c]]},Br}var Lr={},Hh;function Qp(){return Hh||(Hh=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const c={N1:3,N2:3,N3:40,N4:10};r.isValid=function(f){return f!=null&&f!==""&&!isNaN(f)&&f>=0&&f<=7},r.from=function(f){return r.isValid(f)?parseInt(f,10):void 0},r.getPenaltyN1=function(f){const h=f.size;let y=0,S=0,m=0,v=null,k=null;for(let C=0;C<h;C++){S=m=0,v=k=null;for(let H=0;H<h;H++){let B=f.get(C,H);B===v?S++:(S>=5&&(y+=c.N1+(S-5)),v=B,S=1),B=f.get(H,C),B===k?m++:(m>=5&&(y+=c.N1+(m-5)),k=B,m=1)}S>=5&&(y+=c.N1+(S-5)),m>=5&&(y+=c.N1+(m-5))}return y},r.getPenaltyN2=function(f){const h=f.size;let y=0;for(let S=0;S<h-1;S++)for(let m=0;m<h-1;m++){const v=f.get(S,m)+f.get(S,m+1)+f.get(S+1,m)+f.get(S+1,m+1);(v===4||v===0)&&y++}return y*c.N2},r.getPenaltyN3=function(f){const h=f.size;let y=0,S=0,m=0;for(let v=0;v<h;v++){S=m=0;for(let k=0;k<h;k++)S=S<<1&2047|f.get(v,k),k>=10&&(S===1488||S===93)&&y++,m=m<<1&2047|f.get(k,v),k>=10&&(m===1488||m===93)&&y++}return y*c.N3},r.getPenaltyN4=function(f){let h=0;const y=f.data.length;for(let m=0;m<y;m++)h+=f.data[m];return Math.abs(Math.ceil(h*100/y/5)-10)*c.N4};function d(o,f,h){switch(o){case r.Patterns.PATTERN000:return(f+h)%2===0;case r.Patterns.PATTERN001:return f%2===0;case r.Patterns.PATTERN010:return h%3===0;case r.Patterns.PATTERN011:return(f+h)%3===0;case r.Patterns.PATTERN100:return(Math.floor(f/2)+Math.floor(h/3))%2===0;case r.Patterns.PATTERN101:return f*h%2+f*h%3===0;case r.Patterns.PATTERN110:return(f*h%2+f*h%3)%2===0;case r.Patterns.PATTERN111:return(f*h%3+(f+h)%2)%2===0;default:throw new Error("bad maskPattern:"+o)}}r.applyMask=function(f,h){const y=h.size;for(let S=0;S<y;S++)for(let m=0;m<y;m++)h.isReserved(m,S)||h.xor(m,S,d(f,m,S))},r.getBestMask=function(f,h){const y=Object.keys(r.Patterns).length;let S=0,m=1/0;for(let v=0;v<y;v++){h(v),r.applyMask(v,f);const k=r.getPenaltyN1(f)+r.getPenaltyN2(f)+r.getPenaltyN3(f)+r.getPenaltyN4(f);r.applyMask(v,f),k<m&&(m=k,S=v)}return S}})(Lr)),Lr}var es={},Bh;function Eg(){if(Bh)return es;Bh=1;const r=cu(),c=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],d=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return es.getBlocksCount=function(f,h){switch(h){case r.L:return c[(f-1)*4+0];case r.M:return c[(f-1)*4+1];case r.Q:return c[(f-1)*4+2];case r.H:return c[(f-1)*4+3];default:return}},es.getTotalCodewordsCount=function(f,h){switch(h){case r.L:return d[(f-1)*4+0];case r.M:return d[(f-1)*4+1];case r.Q:return d[(f-1)*4+2];case r.H:return d[(f-1)*4+3];default:return}},es}var Yr={},Ol={},Lh;function Kp(){if(Lh)return Ol;Lh=1;const r=new Uint8Array(512),c=new Uint8Array(256);return(function(){let o=1;for(let f=0;f<255;f++)r[f]=o,c[o]=f,o<<=1,o&256&&(o^=285);for(let f=255;f<512;f++)r[f]=r[f-255]})(),Ol.log=function(o){if(o<1)throw new Error("log("+o+")");return c[o]},Ol.exp=function(o){return r[o]},Ol.mul=function(o,f){return o===0||f===0?0:r[c[o]+c[f]]},Ol}var Yh;function Zp(){return Yh||(Yh=1,(function(r){const c=Kp();r.mul=function(o,f){const h=new Uint8Array(o.length+f.length-1);for(let y=0;y<o.length;y++)for(let S=0;S<f.length;S++)h[y+S]^=c.mul(o[y],f[S]);return h},r.mod=function(o,f){let h=new Uint8Array(o);for(;h.length-f.length>=0;){const y=h[0];for(let m=0;m<f.length;m++)h[m]^=c.mul(f[m],y);let S=0;for(;S<h.length&&h[S]===0;)S++;h=h.slice(S)}return h},r.generateECPolynomial=function(o){let f=new Uint8Array([1]);for(let h=0;h<o;h++)f=r.mul(f,new Uint8Array([1,c.exp(h)]));return f}})(Yr)),Yr}var qr,qh;function Ip(){if(qh)return qr;qh=1;const r=Zp();function c(d){this.genPoly=void 0,this.degree=d,this.degree&&this.initialize(this.degree)}return c.prototype.initialize=function(o){this.degree=o,this.genPoly=r.generateECPolynomial(this.degree)},c.prototype.encode=function(o){if(!this.genPoly)throw new Error("Encoder not initialized");const f=new Uint8Array(o.length+this.degree);f.set(o);const h=r.mod(f,this.genPoly),y=this.degree-h.length;if(y>0){const S=new Uint8Array(this.degree);return S.set(h,y),S}return h},qr=c,qr}var Gr={},Xr={},Vr={},Gh;function Ng(){return Gh||(Gh=1,Vr.isValid=function(c){return!isNaN(c)&&c>=1&&c<=40}),Vr}var Ue={},Xh;function Ag(){if(Xh)return Ue;Xh=1;const r="[0-9]+",c="[A-Z $%*+\\-./:]+";let d="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";d=d.replace(/u/g,"\\u");const o="(?:(?![A-Z0-9 $%*+\\-./:]|"+d+`)(?:.|[\r
]))+`;Ue.KANJI=new RegExp(d,"g"),Ue.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Ue.BYTE=new RegExp(o,"g"),Ue.NUMERIC=new RegExp(r,"g"),Ue.ALPHANUMERIC=new RegExp(c,"g");const f=new RegExp("^"+d+"$"),h=new RegExp("^"+r+"$"),y=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Ue.testKanji=function(m){return f.test(m)},Ue.testNumeric=function(m){return h.test(m)},Ue.testAlphanumeric=function(m){return y.test(m)},Ue}var Vh;function Wn(){return Vh||(Vh=1,(function(r){const c=Ng(),d=Ag();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(h,y){if(!h.ccBits)throw new Error("Invalid mode: "+h);if(!c.isValid(y))throw new Error("Invalid version: "+y);return y>=1&&y<10?h.ccBits[0]:y<27?h.ccBits[1]:h.ccBits[2]},r.getBestModeForData=function(h){return d.testNumeric(h)?r.NUMERIC:d.testAlphanumeric(h)?r.ALPHANUMERIC:d.testKanji(h)?r.KANJI:r.BYTE},r.toString=function(h){if(h&&h.id)return h.id;throw new Error("Invalid mode")},r.isValid=function(h){return h&&h.bit&&h.ccBits};function o(f){if(typeof f!="string")throw new Error("Param is not a string");switch(f.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+f)}}r.from=function(h,y){if(r.isValid(h))return h;try{return o(h)}catch{return y}}})(Xr)),Xr}var Qh;function Jp(){return Qh||(Qh=1,(function(r){const c=$n(),d=Eg(),o=cu(),f=Wn(),h=Ng(),y=7973,S=c.getBCHDigit(y);function m(H,B,K){for(let L=1;L<=40;L++)if(B<=r.getCapacity(L,K,H))return L}function v(H,B){return f.getCharCountIndicator(H,B)+4}function k(H,B){let K=0;return H.forEach(function(L){const j=v(L.mode,B);K+=j+L.getBitsLength()}),K}function C(H,B){for(let K=1;K<=40;K++)if(k(H,K)<=r.getCapacity(K,B,f.MIXED))return K}r.from=function(B,K){return h.isValid(B)?parseInt(B,10):K},r.getCapacity=function(B,K,L){if(!h.isValid(B))throw new Error("Invalid QR Code version");typeof L>"u"&&(L=f.BYTE);const j=c.getSymbolTotalCodewords(B),G=d.getTotalCodewordsCount(B,K),z=(j-G)*8;if(L===f.MIXED)return z;const D=z-v(L,B);switch(L){case f.NUMERIC:return Math.floor(D/10*3);case f.ALPHANUMERIC:return Math.floor(D/11*2);case f.KANJI:return Math.floor(D/13);case f.BYTE:default:return Math.floor(D/8)}},r.getBestVersionForData=function(B,K){let L;const j=o.from(K,o.M);if(Array.isArray(B)){if(B.length>1)return C(B,j);if(B.length===0)return 1;L=B[0]}else L=B;return m(L.mode,L.getLength(),j)},r.getEncodedBits=function(B){if(!h.isValid(B)||B<7)throw new Error("Invalid QR Code version");let K=B<<12;for(;c.getBCHDigit(K)-S>=0;)K^=y<<c.getBCHDigit(K)-S;return B<<12|K}})(Gr)),Gr}var Qr={},Kh;function Fp(){if(Kh)return Qr;Kh=1;const r=$n(),c=1335,d=21522,o=r.getBCHDigit(c);return Qr.getEncodedBits=function(h,y){const S=h.bit<<3|y;let m=S<<10;for(;r.getBCHDigit(m)-o>=0;)m^=c<<r.getBCHDigit(m)-o;return(S<<10|m)^d},Qr}var Kr={},Zr,Zh;function $p(){if(Zh)return Zr;Zh=1;const r=Wn();function c(d){this.mode=r.NUMERIC,this.data=d.toString()}return c.getBitsLength=function(o){return 10*Math.floor(o/3)+(o%3?o%3*3+1:0)},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(o){let f,h,y;for(f=0;f+3<=this.data.length;f+=3)h=this.data.substr(f,3),y=parseInt(h,10),o.put(y,10);const S=this.data.length-f;S>0&&(h=this.data.substr(f),y=parseInt(h,10),o.put(y,S*3+1))},Zr=c,Zr}var Ir,Ih;function Wp(){if(Ih)return Ir;Ih=1;const r=Wn(),c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function d(o){this.mode=r.ALPHANUMERIC,this.data=o}return d.getBitsLength=function(f){return 11*Math.floor(f/2)+6*(f%2)},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(f){let h;for(h=0;h+2<=this.data.length;h+=2){let y=c.indexOf(this.data[h])*45;y+=c.indexOf(this.data[h+1]),f.put(y,11)}this.data.length%2&&f.put(c.indexOf(this.data[h]),6)},Ir=d,Ir}var Jr,Jh;function Pp(){if(Jh)return Jr;Jh=1;const r=Wn();function c(d){this.mode=r.BYTE,typeof d=="string"?this.data=new TextEncoder().encode(d):this.data=new Uint8Array(d)}return c.getBitsLength=function(o){return o*8},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(d){for(let o=0,f=this.data.length;o<f;o++)d.put(this.data[o],8)},Jr=c,Jr}var Fr,Fh;function ty(){if(Fh)return Fr;Fh=1;const r=Wn(),c=$n();function d(o){this.mode=r.KANJI,this.data=o}return d.getBitsLength=function(f){return f*13},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(o){let f;for(f=0;f<this.data.length;f++){let h=c.toSJIS(this.data[f]);if(h>=33088&&h<=40956)h-=33088;else if(h>=57408&&h<=60351)h-=49472;else throw new Error("Invalid SJIS character: "+this.data[f]+`
Make sure your charset is UTF-8`);h=(h>>>8&255)*192+(h&255),o.put(h,13)}},Fr=d,Fr}var $r={exports:{}},$h;function ey(){return $h||($h=1,(function(r){var c={single_source_shortest_paths:function(d,o,f){var h={},y={};y[o]=0;var S=c.PriorityQueue.make();S.push(o,0);for(var m,v,k,C,H,B,K,L,j;!S.empty();){m=S.pop(),v=m.value,C=m.cost,H=d[v]||{};for(k in H)H.hasOwnProperty(k)&&(B=H[k],K=C+B,L=y[k],j=typeof y[k]>"u",(j||L>K)&&(y[k]=K,S.push(k,K),h[k]=v))}if(typeof f<"u"&&typeof y[f]>"u"){var G=["Could not find a path from ",o," to ",f,"."].join("");throw new Error(G)}return h},extract_shortest_path_from_predecessor_list:function(d,o){for(var f=[],h=o;h;)f.push(h),d[h],h=d[h];return f.reverse(),f},find_path:function(d,o,f){var h=c.single_source_shortest_paths(d,o,f);return c.extract_shortest_path_from_predecessor_list(h,f)},PriorityQueue:{make:function(d){var o=c.PriorityQueue,f={},h;d=d||{};for(h in o)o.hasOwnProperty(h)&&(f[h]=o[h]);return f.queue=[],f.sorter=d.sorter||o.default_sorter,f},default_sorter:function(d,o){return d.cost-o.cost},push:function(d,o){var f={value:d,cost:o};this.queue.push(f),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=c})($r)),$r.exports}var Wh;function ny(){return Wh||(Wh=1,(function(r){const c=Wn(),d=$p(),o=Wp(),f=Pp(),h=ty(),y=Ag(),S=$n(),m=ey();function v(G){return unescape(encodeURIComponent(G)).length}function k(G,z,D){const Y=[];let F;for(;(F=G.exec(D))!==null;)Y.push({data:F[0],index:F.index,mode:z,length:F[0].length});return Y}function C(G){const z=k(y.NUMERIC,c.NUMERIC,G),D=k(y.ALPHANUMERIC,c.ALPHANUMERIC,G);let Y,F;return S.isKanjiModeEnabled()?(Y=k(y.BYTE,c.BYTE,G),F=k(y.KANJI,c.KANJI,G)):(Y=k(y.BYTE_KANJI,c.BYTE,G),F=[]),z.concat(D,Y,F).sort(function(q,J){return q.index-J.index}).map(function(q){return{data:q.data,mode:q.mode,length:q.length}})}function H(G,z){switch(z){case c.NUMERIC:return d.getBitsLength(G);case c.ALPHANUMERIC:return o.getBitsLength(G);case c.KANJI:return h.getBitsLength(G);case c.BYTE:return f.getBitsLength(G)}}function B(G){return G.reduce(function(z,D){const Y=z.length-1>=0?z[z.length-1]:null;return Y&&Y.mode===D.mode?(z[z.length-1].data+=D.data,z):(z.push(D),z)},[])}function K(G){const z=[];for(let D=0;D<G.length;D++){const Y=G[D];switch(Y.mode){case c.NUMERIC:z.push([Y,{data:Y.data,mode:c.ALPHANUMERIC,length:Y.length},{data:Y.data,mode:c.BYTE,length:Y.length}]);break;case c.ALPHANUMERIC:z.push([Y,{data:Y.data,mode:c.BYTE,length:Y.length}]);break;case c.KANJI:z.push([Y,{data:Y.data,mode:c.BYTE,length:v(Y.data)}]);break;case c.BYTE:z.push([{data:Y.data,mode:c.BYTE,length:v(Y.data)}])}}return z}function L(G,z){const D={},Y={start:{}};let F=["start"];for(let X=0;X<G.length;X++){const q=G[X],J=[];for(let I=0;I<q.length;I++){const at=q[I],P=""+X+I;J.push(P),D[P]={node:at,lastCount:0},Y[P]={};for(let $=0;$<F.length;$++){const V=F[$];D[V]&&D[V].node.mode===at.mode?(Y[V][P]=H(D[V].lastCount+at.length,at.mode)-H(D[V].lastCount,at.mode),D[V].lastCount+=at.length):(D[V]&&(D[V].lastCount=at.length),Y[V][P]=H(at.length,at.mode)+4+c.getCharCountIndicator(at.mode,z))}}F=J}for(let X=0;X<F.length;X++)Y[F[X]].end=0;return{map:Y,table:D}}function j(G,z){let D;const Y=c.getBestModeForData(G);if(D=c.from(z,Y),D!==c.BYTE&&D.bit<Y.bit)throw new Error('"'+G+'" cannot be encoded with mode '+c.toString(D)+`.
 Suggested mode is: `+c.toString(Y));switch(D===c.KANJI&&!S.isKanjiModeEnabled()&&(D=c.BYTE),D){case c.NUMERIC:return new d(G);case c.ALPHANUMERIC:return new o(G);case c.KANJI:return new h(G);case c.BYTE:return new f(G)}}r.fromArray=function(z){return z.reduce(function(D,Y){return typeof Y=="string"?D.push(j(Y,null)):Y.data&&D.push(j(Y.data,Y.mode)),D},[])},r.fromString=function(z,D){const Y=C(z,S.isKanjiModeEnabled()),F=K(Y),X=L(F,D),q=m.find_path(X.map,"start","end"),J=[];for(let I=1;I<q.length-1;I++)J.push(X.table[q[I]].node);return r.fromArray(B(J))},r.rawSplit=function(z){return r.fromArray(C(z,S.isKanjiModeEnabled()))}})(Kr)),Kr}var Ph;function ay(){if(Ph)return zr;Ph=1;const r=$n(),c=cu(),d=qp(),o=Gp(),f=Xp(),h=Vp(),y=Qp(),S=Eg(),m=Ip(),v=Jp(),k=Fp(),C=Wn(),H=ny();function B(X,q){const J=X.size,I=h.getPositions(q);for(let at=0;at<I.length;at++){const P=I[at][0],$=I[at][1];for(let V=-1;V<=7;V++)if(!(P+V<=-1||J<=P+V))for(let et=-1;et<=7;et++)$+et<=-1||J<=$+et||(V>=0&&V<=6&&(et===0||et===6)||et>=0&&et<=6&&(V===0||V===6)||V>=2&&V<=4&&et>=2&&et<=4?X.set(P+V,$+et,!0,!0):X.set(P+V,$+et,!1,!0))}}function K(X){const q=X.size;for(let J=8;J<q-8;J++){const I=J%2===0;X.set(J,6,I,!0),X.set(6,J,I,!0)}}function L(X,q){const J=f.getPositions(q);for(let I=0;I<J.length;I++){const at=J[I][0],P=J[I][1];for(let $=-2;$<=2;$++)for(let V=-2;V<=2;V++)$===-2||$===2||V===-2||V===2||$===0&&V===0?X.set(at+$,P+V,!0,!0):X.set(at+$,P+V,!1,!0)}}function j(X,q){const J=X.size,I=v.getEncodedBits(q);let at,P,$;for(let V=0;V<18;V++)at=Math.floor(V/3),P=V%3+J-8-3,$=(I>>V&1)===1,X.set(at,P,$,!0),X.set(P,at,$,!0)}function G(X,q,J){const I=X.size,at=k.getEncodedBits(q,J);let P,$;for(P=0;P<15;P++)$=(at>>P&1)===1,P<6?X.set(P,8,$,!0):P<8?X.set(P+1,8,$,!0):X.set(I-15+P,8,$,!0),P<8?X.set(8,I-P-1,$,!0):P<9?X.set(8,15-P-1+1,$,!0):X.set(8,15-P-1,$,!0);X.set(I-8,8,1,!0)}function z(X,q){const J=X.size;let I=-1,at=J-1,P=7,$=0;for(let V=J-1;V>0;V-=2)for(V===6&&V--;;){for(let et=0;et<2;et++)if(!X.isReserved(at,V-et)){let Ut=!1;$<q.length&&(Ut=(q[$]>>>P&1)===1),X.set(at,V-et,Ut),P--,P===-1&&($++,P=7)}if(at+=I,at<0||J<=at){at-=I,I=-I;break}}}function D(X,q,J){const I=new d;J.forEach(function(et){I.put(et.mode.bit,4),I.put(et.getLength(),C.getCharCountIndicator(et.mode,X)),et.write(I)});const at=r.getSymbolTotalCodewords(X),P=S.getTotalCodewordsCount(X,q),$=(at-P)*8;for(I.getLengthInBits()+4<=$&&I.put(0,4);I.getLengthInBits()%8!==0;)I.putBit(0);const V=($-I.getLengthInBits())/8;for(let et=0;et<V;et++)I.put(et%2?17:236,8);return Y(I,X,q)}function Y(X,q,J){const I=r.getSymbolTotalCodewords(q),at=S.getTotalCodewordsCount(q,J),P=I-at,$=S.getBlocksCount(q,J),V=I%$,et=$-V,Ut=Math.floor(I/$),_=Math.floor(P/$),Z=_+1,it=Ut-_,Tt=new m(it);let St=0;const w=new Array($),U=new Array($);let Q=0;const tt=new Uint8Array(X.buffer);for(let At=0;At<$;At++){const je=At<et?_:Z;w[At]=tt.slice(St,St+je),U[At]=Tt.encode(w[At]),St+=je,Q=Math.max(Q,je)}const rt=new Uint8Array(I);let dt=0,ht,Rt;for(ht=0;ht<Q;ht++)for(Rt=0;Rt<$;Rt++)ht<w[Rt].length&&(rt[dt++]=w[Rt][ht]);for(ht=0;ht<it;ht++)for(Rt=0;Rt<$;Rt++)rt[dt++]=U[Rt][ht];return rt}function F(X,q,J,I){let at;if(Array.isArray(X))at=H.fromArray(X);else if(typeof X=="string"){let Ut=q;if(!Ut){const _=H.rawSplit(X);Ut=v.getBestVersionForData(_,J)}at=H.fromString(X,Ut||40)}else throw new Error("Invalid data");const P=v.getBestVersionForData(at,J);if(!P)throw new Error("The amount of data is too big to be stored in a QR Code");if(!q)q=P;else if(q<P)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+P+`.
`);const $=D(q,J,at),V=r.getSymbolSize(q),et=new o(V);return B(et,q),K(et),L(et,q),G(et,J,0),q>=7&&j(et,q),z(et,$),isNaN(I)&&(I=y.getBestMask(et,G.bind(null,et,J))),y.applyMask(I,et),G(et,J,I),{modules:et,version:q,errorCorrectionLevel:J,maskPattern:I,segments:at}}return zr.create=function(q,J){if(typeof q>"u"||q==="")throw new Error("No input text");let I=c.M,at,P;return typeof J<"u"&&(I=c.from(J.errorCorrectionLevel,c.M),at=v.from(J.version),P=y.from(J.maskPattern),J.toSJISFunc&&r.setToSJISFunction(J.toSJISFunc)),F(q,at,I,P)},zr}var Wr={},Pr={},tg;function Cg(){return tg||(tg=1,(function(r){function c(d){if(typeof d=="number"&&(d=d.toString()),typeof d!="string")throw new Error("Color should be defined as hex string");let o=d.slice().replace("#","").split("");if(o.length<3||o.length===5||o.length>8)throw new Error("Invalid hex color: "+d);(o.length===3||o.length===4)&&(o=Array.prototype.concat.apply([],o.map(function(h){return[h,h]}))),o.length===6&&o.push("F","F");const f=parseInt(o.join(""),16);return{r:f>>24&255,g:f>>16&255,b:f>>8&255,a:f&255,hex:"#"+o.slice(0,6).join("")}}r.getOptions=function(o){o||(o={}),o.color||(o.color={});const f=typeof o.margin>"u"||o.margin===null||o.margin<0?4:o.margin,h=o.width&&o.width>=21?o.width:void 0,y=o.scale||4;return{width:h,scale:h?4:y,margin:f,color:{dark:c(o.color.dark||"#000000ff"),light:c(o.color.light||"#ffffffff")},type:o.type,rendererOpts:o.rendererOpts||{}}},r.getScale=function(o,f){return f.width&&f.width>=o+f.margin*2?f.width/(o+f.margin*2):f.scale},r.getImageWidth=function(o,f){const h=r.getScale(o,f);return Math.floor((o+f.margin*2)*h)},r.qrToImageData=function(o,f,h){const y=f.modules.size,S=f.modules.data,m=r.getScale(y,h),v=Math.floor((y+h.margin*2)*m),k=h.margin*m,C=[h.color.light,h.color.dark];for(let H=0;H<v;H++)for(let B=0;B<v;B++){let K=(H*v+B)*4,L=h.color.light;if(H>=k&&B>=k&&H<v-k&&B<v-k){const j=Math.floor((H-k)/m),G=Math.floor((B-k)/m);L=C[S[j*y+G]?1:0]}o[K++]=L.r,o[K++]=L.g,o[K++]=L.b,o[K]=L.a}}})(Pr)),Pr}var eg;function ly(){return eg||(eg=1,(function(r){const c=Cg();function d(f,h,y){f.clearRect(0,0,h.width,h.height),h.style||(h.style={}),h.height=y,h.width=y,h.style.height=y+"px",h.style.width=y+"px"}function o(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(h,y,S){let m=S,v=y;typeof m>"u"&&(!y||!y.getContext)&&(m=y,y=void 0),y||(v=o()),m=c.getOptions(m);const k=c.getImageWidth(h.modules.size,m),C=v.getContext("2d"),H=C.createImageData(k,k);return c.qrToImageData(H.data,h,m),d(C,v,k),C.putImageData(H,0,0),v},r.renderToDataURL=function(h,y,S){let m=S;typeof m>"u"&&(!y||!y.getContext)&&(m=y,y=void 0),m||(m={});const v=r.render(h,y,m),k=m.type||"image/png",C=m.rendererOpts||{};return v.toDataURL(k,C.quality)}})(Wr)),Wr}var tu={},ng;function iy(){if(ng)return tu;ng=1;const r=Cg();function c(f,h){const y=f.a/255,S=h+'="'+f.hex+'"';return y<1?S+" "+h+'-opacity="'+y.toFixed(2).slice(1)+'"':S}function d(f,h,y){let S=f+h;return typeof y<"u"&&(S+=" "+y),S}function o(f,h,y){let S="",m=0,v=!1,k=0;for(let C=0;C<f.length;C++){const H=Math.floor(C%h),B=Math.floor(C/h);!H&&!v&&(v=!0),f[C]?(k++,C>0&&H>0&&f[C-1]||(S+=v?d("M",H+y,.5+B+y):d("m",m,0),m=0,v=!1),H+1<h&&f[C+1]||(S+=d("h",k),k=0)):m++}return S}return tu.render=function(h,y,S){const m=r.getOptions(y),v=h.modules.size,k=h.modules.data,C=v+m.margin*2,H=m.color.light.a?"<path "+c(m.color.light,"fill")+' d="M0 0h'+C+"v"+C+'H0z"/>':"",B="<path "+c(m.color.dark,"stroke")+' d="'+o(k,v,m.margin)+'"/>',K='viewBox="0 0 '+C+" "+C+'"',j='<svg xmlns="http://www.w3.org/2000/svg" '+(m.width?'width="'+m.width+'" height="'+m.width+'" ':"")+K+' shape-rendering="crispEdges">'+H+B+`</svg>
`;return typeof S=="function"&&S(null,j),j},tu}var ag;function sy(){if(ag)return Ba;ag=1;const r=Yp(),c=ay(),d=ly(),o=iy();function f(h,y,S,m,v){const k=[].slice.call(arguments,1),C=k.length,H=typeof k[C-1]=="function";if(!H&&!r())throw new Error("Callback required as last argument");if(H){if(C<2)throw new Error("Too few arguments provided");C===2?(v=S,S=y,y=m=void 0):C===3&&(y.getContext&&typeof v>"u"?(v=m,m=void 0):(v=m,m=S,S=y,y=void 0))}else{if(C<1)throw new Error("Too few arguments provided");return C===1?(S=y,y=m=void 0):C===2&&!y.getContext&&(m=S,S=y,y=void 0),new Promise(function(B,K){try{const L=c.create(S,m);B(h(L,y,m))}catch(L){K(L)}})}try{const B=c.create(S,m);v(null,h(B,y,m))}catch(B){v(B)}}return Ba.create=c.create,Ba.toCanvas=f.bind(null,d.render),Ba.toDataURL=f.bind(null,d.renderToDataURL),Ba.toString=f.bind(null,function(h,y,S){return o.render(h,S)}),Ba}var oy=sy();const ry=W0(oy),eu=`${window.location.origin}/hpde/`;function uy(){const[r,c]=ot.useState(!1),[d,o]=ot.useState(null);ot.useEffect(()=>{window.scrollTo(0,0),ry.toDataURL(eu,{margin:1,width:240}).then(o).catch(()=>o(null))},[]);async function f(){await navigator.clipboard.writeText(eu),c(!0),setTimeout(()=>c(!1),2e3)}return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),g.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:g.jsx(su,{size:18})})]}),g.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),g.jsxs("button",{onClick:f,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[g.jsx("span",{className:"truncate text-sm text-gray-800",children:eu}),r?g.jsx(ls,{size:16,className:"shrink-0 text-green-600"}):g.jsx(yg,{size:16,className:"shrink-0 text-gray-400"})]}),g.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:d&&g.jsx("img",{src:d,alt:"QR code for schedule link",width:240,height:240})})]})})}const lg=350,cy="cubic-bezier(0.32, 0.72, 0, 1)",fy=.35,dy=.5;function hy(r){try{return new URL(r).hostname.replace(/^www\./,"")}catch{return r}}function gy(r){const c=r.trim().toLowerCase();return c==="clockwise"?"CW (clockwise)":c==="counter-clockwise"||c==="counterclockwise"?"CCW (counter-clockwise)":r}function my(r,c){return[r,c&&gy(c)].filter(Boolean).join(" ")}function Ul({icon:r,label:c,subtitle:d,children:o}){return g.jsxs("div",{className:"grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[g.jsxs("span",{className:"flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(r,{size:14,className:"shrink-0 text-gray-400"}),c]}),g.jsxs("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:[o,d&&g.jsx("span",{className:"mt-0.5 block text-xs font-normal text-gray-400",children:d})]})]})}function py({event:r,open:c,onClose:d}){var K;const o=ot.useRef(null),[f,h]=ot.useState(0),[y,S]=ot.useState(!1),[m,v]=ot.useState(!1);ot.useEffect(()=>{if(!c)return;const L=j=>{j.key==="Escape"&&d()};return window.addEventListener("keydown",L),()=>window.removeEventListener("keydown",L)},[c,d]),ot.useEffect(()=>{h(0),S(!1),v(!1)},[c]),ot.useEffect(()=>{if(!c)return;const L=o.current;if(!L)return;let j=null;const G=Y=>{const F=Y.touches[0];j={startX:F.clientX,startY:F.clientY,lastX:F.clientX,lastT:Y.timeStamp,velocity:0,dx:0,active:!1,width:L.getBoundingClientRect().width}},z=Y=>{if(!j)return;const F=Y.touches[0],X=F.clientX-j.startX,q=F.clientY-j.startY;if(!j.active){if(Math.abs(X)<8&&Math.abs(q)<8)return;if(X<=0||Math.abs(q)>=Math.abs(X)){j=null;return}j.active=!0,S(!0)}Y.preventDefault();const J=Y.timeStamp-j.lastT;J>0&&(j.velocity=(F.clientX-j.lastX)/J),j.lastX=F.clientX,j.lastT=Y.timeStamp,j.dx=Math.min(Math.max(X,0),j.width),h(j.dx)},D=()=>{if(!j||!j.active){j=null;return}const{dx:Y,velocity:F,width:X}=j,q=Y>X*fy||F>dy;j=null,S(!1),v(!0),q?(h(X),window.setTimeout(d,lg)):h(0)};return L.addEventListener("touchstart",G,{passive:!0}),L.addEventListener("touchmove",z,{passive:!1}),L.addEventListener("touchend",D),L.addEventListener("touchcancel",D),()=>{L.removeEventListener("touchstart",G),L.removeEventListener("touchmove",z),L.removeEventListener("touchend",D),L.removeEventListener("touchcancel",D)}},[c,d]),ot.useEffect(()=>{if(!c)return;const L=document.documentElement,j=document.body,G=window.scrollY,z=L.style.overflow,D=j.style.overflow,Y=j.style.position,F=j.style.top,X=j.style.width;return L.style.overflow="hidden",j.style.overflow="hidden",j.style.position="fixed",j.style.top=`-${G}px`,j.style.width="100%",()=>{L.style.overflow=z,j.style.overflow=D,j.style.position=Y,j.style.top=F,j.style.width=X,window.scrollTo(0,G)}},[c]);const k=Ep(r.days),C=my(r.configuration,r.direction),H=!!((K=r.scheduleScans)!=null&&K.length),B=k||r.organizer||r.track||C||r.link||H;return g.jsxs(g.Fragment,{children:[g.jsx("div",{"aria-hidden":"true",inert:!c,onClick:d,className:"fixed inset-0 z-40",style:{pointerEvents:c?"auto":"none"}}),g.jsx("div",{ref:o,role:"dialog","aria-modal":c,"aria-labelledby":"event-details-title",inert:!c,className:"fixed inset-y-0 right-0 z-50 flex w-full bg-white md:w-[480px] md:max-w-[60vw]",style:{transform:y||m?`translate3d(${f}px,0,0)`:c?"translate3d(0,0,0)":"translate3d(100%,0,0)",transition:y?"none":`transform ${lg}ms ${cy}`,boxShadow:c?"-8px 0 24px rgba(0,0,0,0.08)":"none",willChange:"transform"},children:g.jsxs("div",{className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none",children:[g.jsxs("div",{className:"mb-5 flex items-start gap-2 md:justify-between md:gap-4",children:[g.jsx("button",{onClick:d,"aria-label":"Back",className:"inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden",children:g.jsx(pg,{size:20})}),g.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"}),g.jsx("button",{onClick:d,"aria-label":"Close",className:"hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid",children:g.jsx(su,{size:20})})]}),B?g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"pl-1",children:[k&&g.jsx(Ul,{icon:iu,label:"Dates",children:k}),r.organizer&&g.jsx(Ul,{icon:xp,label:"Organizer",children:r.organizer}),r.track&&g.jsx(Ul,{icon:vp,label:"Location",subtitle:r.city,children:r.track}),C&&g.jsx(Ul,{icon:Sp,label:"Track config",children:C}),r.link&&g.jsx(Ul,{icon:pp,label:"Event page",children:g.jsxs("a",{href:r.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[hy(r.link),g.jsx(hp,{size:12,className:"text-gray-400"})]})})]}),H&&g.jsxs("div",{className:"mt-6 pl-1",children:[g.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[g.jsx(gp,{size:14,className:"shrink-0 text-gray-400"}),"Original schedule"]}),g.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:r.scheduleScans.map((L,j)=>g.jsx("a",{href:L,target:"_blank",rel:"noopener noreferrer",children:g.jsx("img",{src:L,alt:`Original schedule scan ${j+1}`,className:"aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"})},L))})]})]}):g.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})})]})}function La(r,c){const d=c.split(`
`).map(L=>L.trim());let o="",f,h,y,S,m,v,k;const C=[],H=[];let B=null,K=!1;for(const L of d){if(!L||L.startsWith("//"))continue;const j=L.replace(/^-\s+/,"");if(j.startsWith("# ")){o=j.slice(2).trim();continue}if(j.startsWith("subtitle:")){f=j.slice(9).trim()||void 0;continue}if(j.startsWith("link:")){h=j.slice(5).trim()||void 0;continue}if(j.startsWith("organizer:")){y=j.slice(10).trim()||void 0;continue}if(j.startsWith("track:")){S=j.slice(6).trim()||void 0;continue}if(j.startsWith("city:")){m=j.slice(5).trim()||void 0;continue}if(j.startsWith("configuration:")){v=j.slice(14).trim()||void 0;continue}if(j.startsWith("config:")){v=j.slice(7).trim()||void 0;continue}if(j.startsWith("direction:")){k=j.slice(10).trim()||void 0;continue}if(j.startsWith("## ")){const G=j.slice(3).trim();if(G.toLowerCase()==="groups"){K=!0,B=null;continue}const z=G.split("|").map(D=>D.trim());z.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(z[1])?(K=!1,B={id:z[0].toLowerCase().replace(/\s+/g,"-"),label:z[0],date:z[1],activities:[]},H.push(B)):K=!1;continue}if(K){const G=j.split("|").map(z=>z.trim());if(G.length>=4){const z=G[4]||void 0;C.push({id:G[0],label:G[1],bgClass:G[2],textClass:G[3],...z?{description:z}:{}})}continue}if(B){if(/^\d{2}:\d{2}/.test(j)){const G=yy(j);G&&B.activities.push(G)}else if(/^break\s*\|/.test(j)){const G=j.slice(j.indexOf("|")+1).trim();B.activities.push({type:"break",label:G})}}}return{id:r,name:o,...f?{subtitle:f}:{},...h?{link:h}:{},...y?{organizer:y}:{},...S?{track:S}:{},...m?{city:m}:{},...v?{configuration:v}:{},...k?{direction:k}:{},runGroups:C,days:H}}function yy(r){const c=r.split("|").map(S=>S.trim()),d=c[0],o=c.slice(1),f=d.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!f)return null;const h=f[1],y=f[2].trim();if(/^(general|lunch|special)$/.test(y)){const S=y,m=o[0]??"",v=o[1]||void 0;return{time:h,type:S,label:m,...v?{subtitle:v}:{}}}if(/^session/.test(y)){const S=y.match(/^session\s+(\d+)/),m=S?parseInt(S[1],10):void 0;let v=[],k=[],C;for(const H of o)H.startsWith("track:")?v=H.slice(6).trim().split(",").map(B=>B.trim()).filter(Boolean):H.startsWith("class:")?k=H.slice(6).trim().split(",").map(B=>B.trim()).filter(Boolean):H.startsWith("note:")&&(C=H.slice(5).trim()||void 0);return{time:h,type:"session",...m!==void 0?{sessionNumber:m}:{},onTrack:v,...k.length?{inClass:k}:{},...C?{note:C}:{}}}return null}const vy=`# TDE at MSRC 1.7CW

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
`,fu="/hpde/assets/msrc-1-7-D9G0r_nf.jpg",by={...La("2026-09-11_msrc-1-7",vy),mapImage:fu},wy=`# SCCA at MSRC 1.7 CW

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
`,Sy={...La("2026-09-13_msr-scca",wy),mapImage:fu},xy=`# TDE at MSRC 1.7 Fast Track

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
`,Ty={...La("2026-06-06_msrc-1-7",xy),mapImage:fu},Ey=`# TDE at MSRC 3.1

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
`,Ny="/hpde/assets/msrc-3-1-BsOP6CK2.png",Ay={...La("2025-11-07_msrc-3-1",Ey),mapImage:Ny},Cy=`# TDE at ECR 2.7

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
`,_y="/hpde/assets/ecr-BW_3Ndfh.png",My={...La("2026-05-30_ecr-2-7",Cy),mapImage:_y},Dy=`# Test Event

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
`,ig=La("test-live",Dy),Ry={...ig,days:ig.days.map(r=>({...r,date:Fn()}))},Jn=[by,Sy,Ty,My,Ay].sort((r,c)=>c.id.localeCompare(r.id)),sg=[...Jn,Ry],ky=["January","February","March","April","May","June","July","August","September","October","November","December"],zy=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],og="minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1.6fr) minmax(0, 1.6fr)",Oy=4;function rg(r){return(r.getDay()+6)%7}function Uy(r,c,d){return`${r}-${String(c+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`}function jy({events:r,onOpenEvent:c}){const d=new Date,[o,f]=ot.useState({year:d.getFullYear(),month:d.getMonth()}),h=Fn(),y=new Map;for(const D of r)for(const Y of D.days){const F=y.get(Y.date)??[];F.push(D),y.set(Y.date,F)}const S=new Date(o.year,o.month,1),m=rg(S),v=new Date(o.year,o.month+1,0),k=6-rg(v),C=m+v.getDate()+k,H=new Date(o.year,o.month,1-m),B=[];for(let D=0;D<C;D++){const Y=new Date(H.getFullYear(),H.getMonth(),H.getDate()+D);B.push({date:Y,iso:Uy(Y.getFullYear(),Y.getMonth(),Y.getDate()),inMonth:Y.getMonth()===o.month})}const K=[];for(let D=0;D<B.length;D+=7)K.push(B.slice(D,D+7));function L(){f(D=>D.month===0?{year:D.year-1,month:11}:{year:D.year,month:D.month-1})}function j(){f(D=>D.month===11?{year:D.year+1,month:0}:{year:D.year,month:D.month+1})}function G(){f({year:d.getFullYear(),month:d.getMonth()})}const z=o.year===d.getFullYear()&&o.month===d.getMonth();return g.jsxs("div",{children:[g.jsxs("div",{className:"mb-3 flex items-center justify-between gap-2",children:[g.jsxs("div",{className:"flex items-center gap-1",children:[g.jsx("button",{onClick:L,"aria-label":"Previous month",className:"grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400",children:g.jsx(pg,{size:18})}),g.jsx("button",{onClick:j,"aria-label":"Next month",className:"grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400",children:g.jsx(dp,{size:18})})]}),g.jsxs("div",{className:"text-sm font-semibold text-gray-900",children:[ky[o.month]," ",o.year]}),g.jsx("button",{onClick:G,disabled:z,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${z?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Today"})]}),g.jsxs("div",{className:"overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm",children:[g.jsx("div",{className:"grid border-b border-gray-200 text-center text-[10px] font-semibold uppercase tracking-wide",style:{gridTemplateColumns:og},children:zy.map((D,Y)=>g.jsx("div",{className:`py-1.5 ${Y>=Oy?"text-gray-600":"text-gray-400"}`,children:D},D))}),g.jsx("div",{className:"divide-y divide-gray-200",children:K.map((D,Y)=>g.jsx("div",{className:"grid divide-x divide-gray-200",style:{gridTemplateColumns:og},children:D.map((F,X)=>{const q=y.get(F.iso)??[],J=F.iso===h;return g.jsxs("div",{className:`min-h-[80px] p-1 ${F.inMonth?"bg-white":"bg-gray-50/60"}`,children:[g.jsx("div",{className:`mb-1 text-right text-[10px] font-medium ${F.inMonth?J?"text-blue-600":"text-gray-500":"text-gray-300"}`,children:F.date.getDate()}),g.jsx("div",{className:"space-y-0.5",children:q.map((I,at)=>g.jsx("button",{onClick:()=>c(I),className:"block w-full truncate rounded bg-blue-50 px-1 py-0.5 text-left text-[10px] font-medium text-blue-700 transition-colors hover:bg-blue-100",title:I.name,children:I.name},`${I.id}-${at}`))})]},X)})},Y))})]})]})}function Hy(r,c){const[d,o]=ot.useState(()=>{try{const f=localStorage.getItem(r);return f!==null?JSON.parse(f):c}catch{return c}});return ot.useEffect(()=>{localStorage.setItem(r,JSON.stringify(d))},[r,d]),[d,o]}function By(){return g.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[g.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function ug({event:r,muted:c,live:d,onClick:o}){return g.jsxs("button",{onClick:o,className:`w-full rounded-xl border p-3 text-left transition-colors ${c?"border-gray-200 bg-white hover:border-gray-300":"border-gray-200 bg-white shadow-sm hover:border-gray-400"}`,children:[g.jsxs("div",{className:"flex items-center",children:[g.jsx("span",{className:`text-sm font-semibold ${c?"text-gray-700":"text-gray-900"}`,children:r.name}),d&&g.jsx(By,{})]}),g.jsx("div",{className:"text-xs text-gray-500",children:ou(r)})]})}function Ly({onOpenEvent:r}){const[c,d]=Hy("hpde:landingView","list"),{live:o,upcoming:f,past:h}=uu(Jn),y=[...o,...f];return g.jsx("div",{className:"min-h-screen bg-gray-50",children:g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[g.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:"HPDE Schedule"}),g.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[g.jsx("button",{onClick:()=>d("list"),className:`rounded-md p-2 transition-colors ${c==="list"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},"aria-label":"List view",children:g.jsx(yp,{size:18})}),g.jsx("button",{onClick:()=>d("calendar"),className:`rounded-md p-2 transition-colors ${c==="calendar"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},"aria-label":"Calendar view",children:g.jsx(iu,{size:18})})]})]}),c==="list"?g.jsxs("div",{className:"space-y-6",children:[g.jsxs("section",{children:[g.jsx("h2",{className:"mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500",children:"Upcoming"}),y.length===0?g.jsx("div",{className:"rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500",children:"No upcoming events."}):g.jsx("div",{className:"space-y-2",children:y.map(S=>g.jsx(ug,{event:S,muted:!1,live:o.includes(S),onClick:()=>r(S)},S.id))})]}),g.jsxs("section",{children:[g.jsx("h2",{className:"mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500",children:"Past"}),h.length===0?g.jsx("div",{className:"rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm text-gray-500",children:"No past events."}):g.jsx("div",{className:"space-y-2",children:h.map(S=>g.jsx(ug,{event:S,muted:!0,live:!1,onClick:()=>r(S)},S.id))})]})]}):g.jsx(jy,{events:Jn,onOpenEvent:r})]})})}const Yy=350,qy="cubic-bezier(0.32, 0.72, 0, 1)";function Gy({open:r,onExited:c,scrollRef:d,children:o}){const[f,h]=ot.useState(!1);return ot.useEffect(()=>{if(r){const y=requestAnimationFrame(()=>h(!0));return()=>cancelAnimationFrame(y)}h(!1)},[r]),g.jsx("div",{ref:d,className:"fixed inset-0 z-30 overflow-x-hidden overflow-y-auto bg-gray-50",style:{transform:`translateX(${f?"0":"100%"})`,transition:`transform ${Yy}ms ${qy}`,willChange:"transform",boxShadow:"-8px 0 32px -8px rgba(0, 0, 0, 0.18)"},onTransitionEnd:y=>{y.propertyName==="transform"&&!f&&!r&&(c==null||c())},children:o})}function ns(r,c){const[d,o]=ot.useState(()=>{try{const f=localStorage.getItem(r);return f!==null?JSON.parse(f):c}catch{return c}});return ot.useEffect(()=>{localStorage.setItem(r,JSON.stringify(d))},[r,d]),[d,o]}function _g(r){const c=Fn();return r.days.find(d=>d.date===c)}function cg(r){return _g(r)??r.days[0]}function Xy(){const[r,c]=ot.useState(()=>window.location.hash);ot.useEffect(()=>{const o=()=>{c(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",o),()=>window.removeEventListener("hashchange",o)},[]);function d(o){window.location.hash!==o&&(window.location.hash=o)}return[r,d]}const au="#/event/",fg="#/";function dg(r){return`${au}${encodeURIComponent(r)}`}function hg(r){return r.startsWith(au)?decodeURIComponent(r.slice(au.length)):null}function Vy(r){return r===""||r==="#"}function Qy(){const[r,c]=Xy(),[d,o]=ot.useState("schedule"),[f,h]=ns("hpde:activeEvent",Jn[0].id),[y,S]=ns("hpde:activeDay",null),[m,v]=ns("hpde:groups",[]),[k,C]=ns("hpde:hidePast",!1),[H,B]=ot.useState(!1),K=ot.useRef(null),L=hg(r)!==null,[j,G]=ot.useState(L);ot.useEffect(()=>{L&&G(!0)},[L]);const z=sg.find(V=>V.id===f)??Jn[0],D=z.days.find(V=>V.id===y)??cg(z),Y=_g(z),F=D.date===Fn(),X=z.days.length>1,J=z.days.reduce((V,et)=>et.date>V?et.date:V,z.days[0].date)<Fn(),[,I]=ot.useState(0);ot.useEffect(()=>{if(!F)return;const V=setInterval(()=>I(et=>et+1),6e4);return()=>clearInterval(V)},[F]);const at=F&&D.activities.some(V=>V.type!=="break"&&en(V.time)<ru());function P(V){h(V.id),S(cg(V).id),v([]),c(dg(V.id))}function $(){c(fg)}return ot.useEffect(()=>{const V=hg(r);if(V){const et=sg.find(Ut=>Ut.id===V);et&&et.id!==f&&P(et);return}if(Vy(r)){const{live:et}=uu(Jn);c(et.length>0?dg(et[0].id):fg)}},[r]),r==="#/widget-script"?g.jsx(Lp,{}):r==="#/share"?g.jsx(uy,{}):g.jsxs(g.Fragment,{children:[g.jsx(Ly,{onOpenEvent:P}),j&&g.jsxs(Gy,{open:L,onExited:()=>G(!1),scrollRef:K,children:[g.jsx(Hp,{disabled:H||!L,scrollContainerRef:K,children:g.jsxs("div",{className:"min-h-screen bg-gray-50",children:[g.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[g.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[g.jsxs("div",{className:"flex min-w-0 items-start gap-1",children:[g.jsx("button",{onClick:$,"aria-label":"Home",className:"inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900",children:g.jsx(vg,{size:18})}),g.jsx(Op,{events:Jn,active:z,onChange:P,onOpenDetails:()=>B(!0),onGoHome:$})]}),g.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[g.jsx("button",{onClick:()=>o("schedule"),className:`rounded-md p-2 transition-colors ${d==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:g.jsx(iu,{size:18})}),g.jsx("button",{onClick:()=>o("map"),className:`rounded-md p-2 transition-colors ${d==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:g.jsx(Eh,{size:18})})]})]}),J&&g.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),d==="schedule"&&g.jsxs(g.Fragment,{children:[X&&g.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[g.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:z.days.map(V=>g.jsx("button",{onClick:()=>S(V.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${D.id===V.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:V.label},V.id))}),g.jsx("button",{onClick:()=>Y&&S(Y.id),disabled:F||!Y,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${F||!Y?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),g.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[g.jsx(zp,{groups:z.runGroups,selected:m,onChange:v}),at&&g.jsx(Up,{checked:k,onChange:()=>C(V=>!V),label:"Hide past activities"})]}),g.jsx(kp,{activities:D.activities,runGroups:z.runGroups,isToday:F,selectedGroups:m,hidePast:k}),g.jsx(Bp,{groups:z.runGroups})]}),d==="map"&&(z.mapImage?g.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:g.jsx("img",{src:z.mapImage,alt:`${z.name} track map`,className:"block w-full h-auto"})}):g.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:g.jsxs("div",{className:"text-center",children:[g.jsx(Eh,{size:40,className:"mx-auto mb-2 opacity-30"}),g.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),g.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[g.jsxs("div",{children:[g.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",g.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),g.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",Mp("2026-09-19T15:37:20-05:00")]})]})]})}),g.jsx(py,{event:z,open:H,onClose:()=>B(!1)})]})]})}rp.createRoot(document.getElementById("root")).render(g.jsx(ot.StrictMode,{children:g.jsx(Qy,{})}));
