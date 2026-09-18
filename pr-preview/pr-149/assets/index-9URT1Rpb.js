(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const h of o)if(h.type==="childList")for(const v of h.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&c(v)}).observe(document,{childList:!0,subtree:!0});function d(o){const h={};return o.integrity&&(h.integrity=o.integrity),o.referrerPolicy&&(h.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?h.credentials="include":o.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function c(o){if(o.ep)return;o.ep=!0;const h=d(o);fetch(o.href,h)}})();function Vm(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var wr={exports:{}},Ml={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o0;function Zm(){if(o0)return Ml;o0=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function d(c,o,h){var v=null;if(h!==void 0&&(v=""+h),o.key!==void 0&&(v=""+o.key),"key"in o){h={};for(var w in o)w!=="key"&&(h[w]=o[w])}else h=o;return o=h.ref,{$$typeof:r,type:c,key:v,ref:o!==void 0?o:null,props:h}}return Ml.Fragment=f,Ml.jsx=d,Ml.jsxs=d,Ml}var f0;function Km(){return f0||(f0=1,wr.exports=Zm()),wr.exports}var p=Km(),Er={exports:{}},ut={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d0;function Jm(){if(d0)return ut;d0=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),v=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),D=Symbol.for("react.lazy"),R=Symbol.for("react.activity"),k=Symbol.iterator;function B(L){return L===null||typeof L!="object"?null:(L=k&&L[k]||L["@@iterator"],typeof L=="function"?L:null)}var Y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},K=Object.assign,ct={};function H(L,z,G){this.props=L,this.context=z,this.refs=ct,this.updater=G||Y}H.prototype.isReactComponent={},H.prototype.setState=function(L,z){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,z,"setState")},H.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function O(){}O.prototype=H.prototype;function U(L,z,G){this.props=L,this.context=z,this.refs=ct,this.updater=G||Y}var Z=U.prototype=new O;Z.constructor=U,K(Z,H.prototype),Z.isPureReactComponent=!0;var ot=Array.isArray;function Q(){}var q={H:null,A:null,T:null,S:null},j=Object.prototype.hasOwnProperty;function X(L,z,G){var I=G.ref;return{$$typeof:r,type:L,key:z,ref:I!==void 0?I:null,props:G}}function et(L,z){return X(L.type,z,L.props)}function $(L){return typeof L=="object"&&L!==null&&L.$$typeof===r}function F(L){var z={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(G){return z[G]})}var P=/\/+/g;function lt(L,z){return typeof L=="object"&&L!==null&&L.key!=null?F(""+L.key):z.toString(36)}function jt(L){switch(L.status){case"fulfilled":return L.value;case"rejected":throw L.reason;default:switch(typeof L.status=="string"?L.then(Q,Q):(L.status="pending",L.then(function(z){L.status==="pending"&&(L.status="fulfilled",L.value=z)},function(z){L.status==="pending"&&(L.status="rejected",L.reason=z)})),L.status){case"fulfilled":return L.value;case"rejected":throw L.reason}}throw L}function C(L,z,G,I,it){var ft=typeof L;(ft==="undefined"||ft==="boolean")&&(L=null);var dt=!1;if(L===null)dt=!0;else switch(ft){case"bigint":case"string":case"number":dt=!0;break;case"object":switch(L.$$typeof){case r:case f:dt=!0;break;case D:return dt=L._init,C(dt(L._payload),z,G,I,it)}}if(dt)return it=it(L),dt=I===""?"."+lt(L,0):I,ot(it)?(G="",dt!=null&&(G=dt.replace(P,"$&/")+"/"),C(it,z,G,"",function(He){return He})):it!=null&&($(it)&&(it=et(it,G+(it.key==null||L&&L.key===it.key?"":(""+it.key).replace(P,"$&/")+"/")+dt)),z.push(it)),1;dt=0;var Rt=I===""?".":I+":";if(ot(L))for(var At=0;At<L.length;At++)I=L[At],ft=Rt+lt(I,At),dt+=C(I,z,G,ft,it);else if(At=B(L),typeof At=="function")for(L=At.call(L),At=0;!(I=L.next()).done;)I=I.value,ft=Rt+lt(I,At++),dt+=C(I,z,G,ft,it);else if(ft==="object"){if(typeof L.then=="function")return C(jt(L),z,G,I,it);throw z=String(L),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.")}return dt}function V(L,z,G){if(L==null)return L;var I=[],it=0;return C(L,I,"","",function(ft){return z.call(G,ft,it++)}),I}function nt(L){if(L._status===-1){var z=L._result;z=z(),z.then(function(G){(L._status===0||L._status===-1)&&(L._status=1,L._result=G)},function(G){(L._status===0||L._status===-1)&&(L._status=2,L._result=G)}),L._status===-1&&(L._status=0,L._result=z)}if(L._status===1)return L._result.default;throw L._result}var Et=typeof reportError=="function"?reportError:function(L){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof L=="object"&&L!==null&&typeof L.message=="string"?String(L.message):String(L),error:L});if(!window.dispatchEvent(z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",L);return}console.error(L)},St={map:V,forEach:function(L,z,G){V(L,function(){z.apply(this,arguments)},G)},count:function(L){var z=0;return V(L,function(){z++}),z},toArray:function(L){return V(L,function(z){return z})||[]},only:function(L){if(!$(L))throw Error("React.Children.only expected to receive a single React element child.");return L}};return ut.Activity=R,ut.Children=St,ut.Component=H,ut.Fragment=d,ut.Profiler=o,ut.PureComponent=U,ut.StrictMode=c,ut.Suspense=m,ut.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=q,ut.__COMPILER_RUNTIME={__proto__:null,c:function(L){return q.H.useMemoCache(L)}},ut.cache=function(L){return function(){return L.apply(null,arguments)}},ut.cacheSignal=function(){return null},ut.cloneElement=function(L,z,G){if(L==null)throw Error("The argument must be a React element, but you passed "+L+".");var I=K({},L.props),it=L.key;if(z!=null)for(ft in z.key!==void 0&&(it=""+z.key),z)!j.call(z,ft)||ft==="key"||ft==="__self"||ft==="__source"||ft==="ref"&&z.ref===void 0||(I[ft]=z[ft]);var ft=arguments.length-2;if(ft===1)I.children=G;else if(1<ft){for(var dt=Array(ft),Rt=0;Rt<ft;Rt++)dt[Rt]=arguments[Rt+2];I.children=dt}return X(L.type,it,I)},ut.createContext=function(L){return L={$$typeof:v,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null},L.Provider=L,L.Consumer={$$typeof:h,_context:L},L},ut.createElement=function(L,z,G){var I,it={},ft=null;if(z!=null)for(I in z.key!==void 0&&(ft=""+z.key),z)j.call(z,I)&&I!=="key"&&I!=="__self"&&I!=="__source"&&(it[I]=z[I]);var dt=arguments.length-2;if(dt===1)it.children=G;else if(1<dt){for(var Rt=Array(dt),At=0;At<dt;At++)Rt[At]=arguments[At+2];it.children=Rt}if(L&&L.defaultProps)for(I in dt=L.defaultProps,dt)it[I]===void 0&&(it[I]=dt[I]);return X(L,ft,it)},ut.createRef=function(){return{current:null}},ut.forwardRef=function(L){return{$$typeof:w,render:L}},ut.isValidElement=$,ut.lazy=function(L){return{$$typeof:D,_payload:{_status:-1,_result:L},_init:nt}},ut.memo=function(L,z){return{$$typeof:b,type:L,compare:z===void 0?null:z}},ut.startTransition=function(L){var z=q.T,G={};q.T=G;try{var I=L(),it=q.S;it!==null&&it(G,I),typeof I=="object"&&I!==null&&typeof I.then=="function"&&I.then(Q,Et)}catch(ft){Et(ft)}finally{z!==null&&G.types!==null&&(z.types=G.types),q.T=z}},ut.unstable_useCacheRefresh=function(){return q.H.useCacheRefresh()},ut.use=function(L){return q.H.use(L)},ut.useActionState=function(L,z,G){return q.H.useActionState(L,z,G)},ut.useCallback=function(L,z){return q.H.useCallback(L,z)},ut.useContext=function(L){return q.H.useContext(L)},ut.useDebugValue=function(){},ut.useDeferredValue=function(L,z){return q.H.useDeferredValue(L,z)},ut.useEffect=function(L,z){return q.H.useEffect(L,z)},ut.useEffectEvent=function(L){return q.H.useEffectEvent(L)},ut.useId=function(){return q.H.useId()},ut.useImperativeHandle=function(L,z,G){return q.H.useImperativeHandle(L,z,G)},ut.useInsertionEffect=function(L,z){return q.H.useInsertionEffect(L,z)},ut.useLayoutEffect=function(L,z){return q.H.useLayoutEffect(L,z)},ut.useMemo=function(L,z){return q.H.useMemo(L,z)},ut.useOptimistic=function(L,z){return q.H.useOptimistic(L,z)},ut.useReducer=function(L,z,G){return q.H.useReducer(L,z,G)},ut.useRef=function(L){return q.H.useRef(L)},ut.useState=function(L){return q.H.useState(L)},ut.useSyncExternalStore=function(L,z,G){return q.H.useSyncExternalStore(L,z,G)},ut.useTransition=function(){return q.H.useTransition()},ut.version="19.2.6",ut}var h0;function ns(){return h0||(h0=1,Er.exports=Jm()),Er.exports}var vt=ns(),Tr={exports:{}},Rl={},xr={exports:{}},Ar={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m0;function Im(){return m0||(m0=1,(function(r){function f(C,V){var nt=C.length;C.push(V);t:for(;0<nt;){var Et=nt-1>>>1,St=C[Et];if(0<o(St,V))C[Et]=V,C[nt]=St,nt=Et;else break t}}function d(C){return C.length===0?null:C[0]}function c(C){if(C.length===0)return null;var V=C[0],nt=C.pop();if(nt!==V){C[0]=nt;t:for(var Et=0,St=C.length,L=St>>>1;Et<L;){var z=2*(Et+1)-1,G=C[z],I=z+1,it=C[I];if(0>o(G,nt))I<St&&0>o(it,G)?(C[Et]=it,C[I]=nt,Et=I):(C[Et]=G,C[z]=nt,Et=z);else if(I<St&&0>o(it,nt))C[Et]=it,C[I]=nt,Et=I;else break t}}return V}function o(C,V){var nt=C.sortIndex-V.sortIndex;return nt!==0?nt:C.id-V.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;r.unstable_now=function(){return h.now()}}else{var v=Date,w=v.now();r.unstable_now=function(){return v.now()-w}}var m=[],b=[],D=1,R=null,k=3,B=!1,Y=!1,K=!1,ct=!1,H=typeof setTimeout=="function"?setTimeout:null,O=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function Z(C){for(var V=d(b);V!==null;){if(V.callback===null)c(b);else if(V.startTime<=C)c(b),V.sortIndex=V.expirationTime,f(m,V);else break;V=d(b)}}function ot(C){if(K=!1,Z(C),!Y)if(d(m)!==null)Y=!0,Q||(Q=!0,F());else{var V=d(b);V!==null&&jt(ot,V.startTime-C)}}var Q=!1,q=-1,j=5,X=-1;function et(){return ct?!0:!(r.unstable_now()-X<j)}function $(){if(ct=!1,Q){var C=r.unstable_now();X=C;var V=!0;try{t:{Y=!1,K&&(K=!1,O(q),q=-1),B=!0;var nt=k;try{e:{for(Z(C),R=d(m);R!==null&&!(R.expirationTime>C&&et());){var Et=R.callback;if(typeof Et=="function"){R.callback=null,k=R.priorityLevel;var St=Et(R.expirationTime<=C);if(C=r.unstable_now(),typeof St=="function"){R.callback=St,Z(C),V=!0;break e}R===d(m)&&c(m),Z(C)}else c(m);R=d(m)}if(R!==null)V=!0;else{var L=d(b);L!==null&&jt(ot,L.startTime-C),V=!1}}break t}finally{R=null,k=nt,B=!1}V=void 0}}finally{V?F():Q=!1}}}var F;if(typeof U=="function")F=function(){U($)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,lt=P.port2;P.port1.onmessage=$,F=function(){lt.postMessage(null)}}else F=function(){H($,0)};function jt(C,V){q=H(function(){C(r.unstable_now())},V)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(C){C.callback=null},r.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<C?Math.floor(1e3/C):5},r.unstable_getCurrentPriorityLevel=function(){return k},r.unstable_next=function(C){switch(k){case 1:case 2:case 3:var V=3;break;default:V=k}var nt=k;k=V;try{return C()}finally{k=nt}},r.unstable_requestPaint=function(){ct=!0},r.unstable_runWithPriority=function(C,V){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var nt=k;k=C;try{return V()}finally{k=nt}},r.unstable_scheduleCallback=function(C,V,nt){var Et=r.unstable_now();switch(typeof nt=="object"&&nt!==null?(nt=nt.delay,nt=typeof nt=="number"&&0<nt?Et+nt:Et):nt=Et,C){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=nt+St,C={id:D++,callback:V,priorityLevel:C,startTime:nt,expirationTime:St,sortIndex:-1},nt>Et?(C.sortIndex=nt,f(b,C),d(m)===null&&C===d(b)&&(K?(O(q),q=-1):K=!0,jt(ot,nt-Et))):(C.sortIndex=St,f(m,C),Y||B||(Y=!0,Q||(Q=!0,F()))),C},r.unstable_shouldYield=et,r.unstable_wrapCallback=function(C){var V=k;return function(){var nt=k;k=V;try{return C.apply(this,arguments)}finally{k=nt}}}})(Ar)),Ar}var g0;function Fm(){return g0||(g0=1,xr.exports=Im()),xr.exports}var Cr={exports:{}},Pt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p0;function Wm(){if(p0)return Pt;p0=1;var r=ns();function f(m){var b="https://react.dev/errors/"+m;if(1<arguments.length){b+="?args[]="+encodeURIComponent(arguments[1]);for(var D=2;D<arguments.length;D++)b+="&args[]="+encodeURIComponent(arguments[D])}return"Minified React error #"+m+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(){}var c={d:{f:d,r:function(){throw Error(f(522))},D:d,C:d,L:d,m:d,X:d,S:d,M:d},p:0,findDOMNode:null},o=Symbol.for("react.portal");function h(m,b,D){var R=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:R==null?null:""+R,children:m,containerInfo:b,implementation:D}}var v=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function w(m,b){if(m==="font")return"";if(typeof b=="string")return b==="use-credentials"?b:""}return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,Pt.createPortal=function(m,b){var D=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!b||b.nodeType!==1&&b.nodeType!==9&&b.nodeType!==11)throw Error(f(299));return h(m,b,null,D)},Pt.flushSync=function(m){var b=v.T,D=c.p;try{if(v.T=null,c.p=2,m)return m()}finally{v.T=b,c.p=D,c.d.f()}},Pt.preconnect=function(m,b){typeof m=="string"&&(b?(b=b.crossOrigin,b=typeof b=="string"?b==="use-credentials"?b:"":void 0):b=null,c.d.C(m,b))},Pt.prefetchDNS=function(m){typeof m=="string"&&c.d.D(m)},Pt.preinit=function(m,b){if(typeof m=="string"&&b&&typeof b.as=="string"){var D=b.as,R=w(D,b.crossOrigin),k=typeof b.integrity=="string"?b.integrity:void 0,B=typeof b.fetchPriority=="string"?b.fetchPriority:void 0;D==="style"?c.d.S(m,typeof b.precedence=="string"?b.precedence:void 0,{crossOrigin:R,integrity:k,fetchPriority:B}):D==="script"&&c.d.X(m,{crossOrigin:R,integrity:k,fetchPriority:B,nonce:typeof b.nonce=="string"?b.nonce:void 0})}},Pt.preinitModule=function(m,b){if(typeof m=="string")if(typeof b=="object"&&b!==null){if(b.as==null||b.as==="script"){var D=w(b.as,b.crossOrigin);c.d.M(m,{crossOrigin:D,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0})}}else b==null&&c.d.M(m)},Pt.preload=function(m,b){if(typeof m=="string"&&typeof b=="object"&&b!==null&&typeof b.as=="string"){var D=b.as,R=w(D,b.crossOrigin);c.d.L(m,D,{crossOrigin:R,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0,type:typeof b.type=="string"?b.type:void 0,fetchPriority:typeof b.fetchPriority=="string"?b.fetchPriority:void 0,referrerPolicy:typeof b.referrerPolicy=="string"?b.referrerPolicy:void 0,imageSrcSet:typeof b.imageSrcSet=="string"?b.imageSrcSet:void 0,imageSizes:typeof b.imageSizes=="string"?b.imageSizes:void 0,media:typeof b.media=="string"?b.media:void 0})}},Pt.preloadModule=function(m,b){if(typeof m=="string")if(b){var D=w(b.as,b.crossOrigin);c.d.m(m,{as:typeof b.as=="string"&&b.as!=="script"?b.as:void 0,crossOrigin:D,integrity:typeof b.integrity=="string"?b.integrity:void 0})}else c.d.m(m)},Pt.requestFormReset=function(m){c.d.r(m)},Pt.unstable_batchedUpdates=function(m,b){return m(b)},Pt.useFormState=function(m,b,D){return v.H.useFormState(m,b,D)},Pt.useFormStatus=function(){return v.H.useHostTransitionStatus()},Pt.version="19.2.6",Pt}var y0;function $m(){if(y0)return Cr.exports;y0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),Cr.exports=Wm(),Cr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v0;function Pm(){if(v0)return Rl;v0=1;var r=Fm(),f=ns(),d=$m();function c(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function h(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function v(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function w(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function m(t){if(h(t)!==t)throw Error(c(188))}function b(t){var e=t.alternate;if(!e){if(e=h(t),e===null)throw Error(c(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return m(l),t;if(i===a)return m(l),e;i=i.sibling}throw Error(c(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,s=l.child;s;){if(s===n){u=!0,n=l,a=i;break}if(s===a){u=!0,a=l,n=i;break}s=s.sibling}if(!u){for(s=i.child;s;){if(s===n){u=!0,n=i,a=l;break}if(s===a){u=!0,a=i,n=l;break}s=s.sibling}if(!u)throw Error(c(189))}}if(n.alternate!==a)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?t:e}function D(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=D(t),e!==null)return e;t=t.sibling}return null}var R=Object.assign,k=Symbol.for("react.element"),B=Symbol.for("react.transitional.element"),Y=Symbol.for("react.portal"),K=Symbol.for("react.fragment"),ct=Symbol.for("react.strict_mode"),H=Symbol.for("react.profiler"),O=Symbol.for("react.consumer"),U=Symbol.for("react.context"),Z=Symbol.for("react.forward_ref"),ot=Symbol.for("react.suspense"),Q=Symbol.for("react.suspense_list"),q=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),X=Symbol.for("react.activity"),et=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function F(t){return t===null||typeof t!="object"?null:(t=$&&t[$]||t["@@iterator"],typeof t=="function"?t:null)}var P=Symbol.for("react.client.reference");function lt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===P?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case K:return"Fragment";case H:return"Profiler";case ct:return"StrictMode";case ot:return"Suspense";case Q:return"SuspenseList";case X:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Y:return"Portal";case U:return t.displayName||"Context";case O:return(t._context.displayName||"Context")+".Consumer";case Z:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case q:return e=t.displayName||null,e!==null?e:lt(t.type)||"Memo";case j:e=t._payload,t=t._init;try{return lt(t(e))}catch{}}return null}var jt=Array.isArray,C=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,nt={pending:!1,data:null,method:null,action:null},Et=[],St=-1;function L(t){return{current:t}}function z(t){0>St||(t.current=Et[St],Et[St]=null,St--)}function G(t,e){St++,Et[St]=t.current,t.current=e}var I=L(null),it=L(null),ft=L(null),dt=L(null);function Rt(t,e){switch(G(ft,e),G(it,t),G(I,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Dd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Dd(e),t=kd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}z(I),G(I,t)}function At(){z(I),z(it),z(ft)}function He(t){t.memoizedState!==null&&G(dt,t);var e=I.current,n=kd(e,t.type);e!==n&&(G(it,t),G(I,n))}function Ol(t){it.current===t&&(z(I),z(it)),dt.current===t&&(z(dt),Al._currentValue=nt)}var lu,cs;function _n(t){if(lu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);lu=e&&e[1]||"",cs=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+lu+t+cs}var iu=!1;function uu(t,e){if(!t||iu)return"";iu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var M=function(){throw Error()};if(Object.defineProperty(M.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(M,[])}catch(A){var x=A}Reflect.construct(t,[],M)}else{try{M.call()}catch(A){x=A}t.call(M.prototype)}}else{try{throw Error()}catch(A){x=A}(M=t())&&typeof M.catch=="function"&&M.catch(function(){})}}catch(A){if(A&&x&&typeof A.stack=="string")return[A.stack,x.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],s=i[1];if(u&&s){var g=u.split(`
`),T=s.split(`
`);for(l=a=0;a<g.length&&!g[a].includes("DetermineComponentFrameRoot");)a++;for(;l<T.length&&!T[l].includes("DetermineComponentFrameRoot");)l++;if(a===g.length||l===T.length)for(a=g.length-1,l=T.length-1;1<=a&&0<=l&&g[a]!==T[l];)l--;for(;1<=a&&0<=l;a--,l--)if(g[a]!==T[l]){if(a!==1||l!==1)do if(a--,l--,0>l||g[a]!==T[l]){var N=`
`+g[a].replace(" at new "," at ");return t.displayName&&N.includes("<anonymous>")&&(N=N.replace("<anonymous>",t.displayName)),N}while(1<=a&&0<=l);break}}}finally{iu=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?_n(n):""}function wh(t,e){switch(t.tag){case 26:case 27:case 5:return _n(t.type);case 16:return _n("Lazy");case 13:return t.child!==e&&e!==null?_n("Suspense Fallback"):_n("Suspense");case 19:return _n("SuspenseList");case 0:case 15:return uu(t.type,!1);case 11:return uu(t.type.render,!1);case 1:return uu(t.type,!0);case 31:return _n("Activity");default:return""}}function rs(t){try{var e="",n=null;do e+=wh(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var cu=Object.prototype.hasOwnProperty,ru=r.unstable_scheduleCallback,su=r.unstable_cancelCallback,Eh=r.unstable_shouldYield,Th=r.unstable_requestPaint,re=r.unstable_now,xh=r.unstable_getCurrentPriorityLevel,ss=r.unstable_ImmediatePriority,os=r.unstable_UserBlockingPriority,Hl=r.unstable_NormalPriority,Ah=r.unstable_LowPriority,fs=r.unstable_IdlePriority,Ch=r.log,Nh=r.unstable_setDisableYieldValue,Ua=null,se=null;function nn(t){if(typeof Ch=="function"&&Nh(t),se&&typeof se.setStrictMode=="function")try{se.setStrictMode(Ua,t)}catch{}}var oe=Math.clz32?Math.clz32:Rh,_h=Math.log,Mh=Math.LN2;function Rh(t){return t>>>=0,t===0?32:31-(_h(t)/Mh|0)|0}var Bl=256,Ul=262144,jl=4194304;function Mn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ql(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var s=a&134217727;return s!==0?(a=s&~i,a!==0?l=Mn(a):(u&=s,u!==0?l=Mn(u):n||(n=s&~t,n!==0&&(l=Mn(n))))):(s=a&~i,s!==0?l=Mn(s):u!==0?l=Mn(u):n||(n=a&~t,n!==0&&(l=Mn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function ja(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function zh(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ds(){var t=jl;return jl<<=1,(jl&62914560)===0&&(jl=4194304),t}function ou(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function qa(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Dh(t,e,n,a,l,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var s=t.entanglements,g=t.expirationTimes,T=t.hiddenUpdates;for(n=u&~n;0<n;){var N=31-oe(n),M=1<<N;s[N]=0,g[N]=-1;var x=T[N];if(x!==null)for(T[N]=null,N=0;N<x.length;N++){var A=x[N];A!==null&&(A.lane&=-536870913)}n&=~M}a!==0&&hs(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function hs(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-oe(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function ms(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-oe(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function gs(t,e){var n=e&-e;return n=(n&42)!==0?1:fu(n),(n&(t.suspendedLanes|e))!==0?0:n}function fu(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function du(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function ps(){var t=V.p;return t!==0?t:(t=window.event,t===void 0?32:a0(t.type))}function ys(t,e){var n=V.p;try{return V.p=t,e()}finally{V.p=n}}var an=Math.random().toString(36).slice(2),Kt="__reactFiber$"+an,ee="__reactProps$"+an,Wn="__reactContainer$"+an,hu="__reactEvents$"+an,kh="__reactListeners$"+an,Oh="__reactHandles$"+an,vs="__reactResources$"+an,Ya="__reactMarker$"+an;function mu(t){delete t[Kt],delete t[ee],delete t[hu],delete t[kh],delete t[Oh]}function $n(t){var e=t[Kt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[Kt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Yd(t);t!==null;){if(n=t[Kt])return n;t=Yd(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[Kt]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Ga(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(c(33))}function ta(t){var e=t[vs];return e||(e=t[vs]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Vt(t){t[Ya]=!0}var bs=new Set,Ls={};function Rn(t,e){ea(t,e),ea(t+"Capture",e)}function ea(t,e){for(Ls[t]=e,t=0;t<e.length;t++)bs.add(e[t])}var Hh=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ss={},ws={};function Bh(t){return cu.call(ws,t)?!0:cu.call(Ss,t)?!1:Hh.test(t)?ws[t]=!0:(Ss[t]=!0,!1)}function Yl(t,e,n){if(Bh(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Gl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function Be(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ve(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Es(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Uh(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function gu(t){if(!t._valueTracker){var e=Es(t)?"checked":"value";t._valueTracker=Uh(t,e,""+t[e])}}function Ts(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=Es(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Ql(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var jh=/[\n"\\]/g;function be(t){return t.replace(jh,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function pu(t,e,n,a,l,i,u,s){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ve(e)):t.value!==""+ve(e)&&(t.value=""+ve(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?yu(t,u,ve(e)):n!=null?yu(t,u,ve(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?t.name=""+ve(s):t.removeAttribute("name")}function xs(t,e,n,a,l,i,u,s){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){gu(t);return}n=n!=null?""+ve(n):"",e=e!=null?""+ve(e):n,s||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=s?t.checked:!!a,t.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),gu(t)}function yu(t,e,n){e==="number"&&Ql(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function na(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ve(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function As(t,e,n){if(e!=null&&(e=""+ve(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ve(n):""}function Cs(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(c(92));if(jt(a)){if(1<a.length)throw Error(c(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ve(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),gu(t)}function aa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var qh=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ns(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||qh.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function _s(t,e,n){if(e!=null&&typeof e!="object")throw Error(c(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&Ns(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&Ns(t,i,e[i])}function vu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Yh=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Gh=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Xl(t){return Gh.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ue(){}var bu=null;function Lu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var la=null,ia=null;function Ms(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[ee]||null;t:switch(t=e.stateNode,e.type){case"input":if(pu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[ee]||null;if(!l)throw Error(c(90));pu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&Ts(a)}break t;case"textarea":As(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&na(t,!!n.multiple,e,!1)}}}var Su=!1;function Rs(t,e,n){if(Su)return t(e,n);Su=!0;try{var a=t(e);return a}finally{if(Su=!1,(la!==null||ia!==null)&&(Ri(),la&&(e=la,t=ia,ia=la=null,Ms(e),t)))for(e=0;e<t.length;e++)Ms(t[e])}}function Qa(t,e){var n=t.stateNode;if(n===null)return null;var a=n[ee]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(c(231,e,typeof n));return n}var je=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wu=!1;if(je)try{var Xa={};Object.defineProperty(Xa,"passive",{get:function(){wu=!0}}),window.addEventListener("test",Xa,Xa),window.removeEventListener("test",Xa,Xa)}catch{wu=!1}var ln=null,Eu=null,Vl=null;function zs(){if(Vl)return Vl;var t,e=Eu,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var u=n-t;for(a=1;a<=u&&e[n-a]===l[i-a];a++);return Vl=l.slice(t,1<a?1-a:void 0)}function Zl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Kl(){return!0}function Ds(){return!1}function ne(t){function e(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Kl:Ds,this.isPropagationStopped=Ds,this}return R(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Kl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Kl)},persist:function(){},isPersistent:Kl}),e}var zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=ne(zn),Va=R({},zn,{view:0,detail:0}),Qh=ne(Va),Tu,xu,Za,Il=R({},Va,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Za&&(Za&&t.type==="mousemove"?(Tu=t.screenX-Za.screenX,xu=t.screenY-Za.screenY):xu=Tu=0,Za=t),Tu)},movementY:function(t){return"movementY"in t?t.movementY:xu}}),ks=ne(Il),Xh=R({},Il,{dataTransfer:0}),Vh=ne(Xh),Zh=R({},Va,{relatedTarget:0}),Au=ne(Zh),Kh=R({},zn,{animationName:0,elapsedTime:0,pseudoElement:0}),Jh=ne(Kh),Ih=R({},zn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Fh=ne(Ih),Wh=R({},zn,{data:0}),Os=ne(Wh),$h={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ph={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},t1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function e1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=t1[t])?!!e[t]:!1}function Cu(){return e1}var n1=R({},Va,{key:function(t){if(t.key){var e=$h[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ph[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cu,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),a1=ne(n1),l1=R({},Il,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Hs=ne(l1),i1=R({},Va,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cu}),u1=ne(i1),c1=R({},zn,{propertyName:0,elapsedTime:0,pseudoElement:0}),r1=ne(c1),s1=R({},Il,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),o1=ne(s1),f1=R({},zn,{newState:0,oldState:0}),d1=ne(f1),h1=[9,13,27,32],Nu=je&&"CompositionEvent"in window,Ka=null;je&&"documentMode"in document&&(Ka=document.documentMode);var m1=je&&"TextEvent"in window&&!Ka,Bs=je&&(!Nu||Ka&&8<Ka&&11>=Ka),Us=" ",js=!1;function qs(t,e){switch(t){case"keyup":return h1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ys(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ua=!1;function g1(t,e){switch(t){case"compositionend":return Ys(e);case"keypress":return e.which!==32?null:(js=!0,Us);case"textInput":return t=e.data,t===Us&&js?null:t;default:return null}}function p1(t,e){if(ua)return t==="compositionend"||!Nu&&qs(t,e)?(t=zs(),Vl=Eu=ln=null,ua=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Bs&&e.locale!=="ko"?null:e.data;default:return null}}var y1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Gs(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!y1[t.type]:e==="textarea"}function Qs(t,e,n,a){la?ia?ia.push(a):ia=[a]:la=a,e=Ui(e,"onChange"),0<e.length&&(n=new Jl("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Ja=null,Ia=null;function v1(t){Cd(t,0)}function Fl(t){var e=Ga(t);if(Ts(e))return t}function Xs(t,e){if(t==="change")return e}var Vs=!1;if(je){var _u;if(je){var Mu="oninput"in document;if(!Mu){var Zs=document.createElement("div");Zs.setAttribute("oninput","return;"),Mu=typeof Zs.oninput=="function"}_u=Mu}else _u=!1;Vs=_u&&(!document.documentMode||9<document.documentMode)}function Ks(){Ja&&(Ja.detachEvent("onpropertychange",Js),Ia=Ja=null)}function Js(t){if(t.propertyName==="value"&&Fl(Ia)){var e=[];Qs(e,Ia,t,Lu(t)),Rs(v1,e)}}function b1(t,e,n){t==="focusin"?(Ks(),Ja=e,Ia=n,Ja.attachEvent("onpropertychange",Js)):t==="focusout"&&Ks()}function L1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Fl(Ia)}function S1(t,e){if(t==="click")return Fl(e)}function w1(t,e){if(t==="input"||t==="change")return Fl(e)}function E1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var fe=typeof Object.is=="function"?Object.is:E1;function Fa(t,e){if(fe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!cu.call(e,l)||!fe(t[l],e[l]))return!1}return!0}function Is(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Fs(t,e){var n=Is(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Is(n)}}function Ws(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Ws(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function $s(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Ql(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ql(t.document)}return e}function Ru(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var T1=je&&"documentMode"in document&&11>=document.documentMode,ca=null,zu=null,Wa=null,Du=!1;function Ps(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Du||ca==null||ca!==Ql(a)||(a=ca,"selectionStart"in a&&Ru(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Wa&&Fa(Wa,a)||(Wa=a,a=Ui(zu,"onSelect"),0<a.length&&(e=new Jl("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=ca)))}function Dn(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ra={animationend:Dn("Animation","AnimationEnd"),animationiteration:Dn("Animation","AnimationIteration"),animationstart:Dn("Animation","AnimationStart"),transitionrun:Dn("Transition","TransitionRun"),transitionstart:Dn("Transition","TransitionStart"),transitioncancel:Dn("Transition","TransitionCancel"),transitionend:Dn("Transition","TransitionEnd")},ku={},to={};je&&(to=document.createElement("div").style,"AnimationEvent"in window||(delete ra.animationend.animation,delete ra.animationiteration.animation,delete ra.animationstart.animation),"TransitionEvent"in window||delete ra.transitionend.transition);function kn(t){if(ku[t])return ku[t];if(!ra[t])return t;var e=ra[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in to)return ku[t]=e[n];return t}var eo=kn("animationend"),no=kn("animationiteration"),ao=kn("animationstart"),x1=kn("transitionrun"),A1=kn("transitionstart"),C1=kn("transitioncancel"),lo=kn("transitionend"),io=new Map,Ou="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ou.push("scrollEnd");function Ne(t,e){io.set(t,e),Rn(e,[t])}var Wl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Le=[],sa=0,Hu=0;function $l(){for(var t=sa,e=Hu=sa=0;e<t;){var n=Le[e];Le[e++]=null;var a=Le[e];Le[e++]=null;var l=Le[e];Le[e++]=null;var i=Le[e];if(Le[e++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&uo(n,l,i)}}function Pl(t,e,n,a){Le[sa++]=t,Le[sa++]=e,Le[sa++]=n,Le[sa++]=a,Hu|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Bu(t,e,n,a){return Pl(t,e,n,a),ti(t)}function On(t,e){return Pl(t,null,null,e),ti(t)}function uo(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-oe(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function ti(t){if(50<bl)throw bl=0,Zc=null,Error(c(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var oa={};function N1(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function de(t,e,n,a){return new N1(t,e,n,a)}function Uu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function qe(t,e){var n=t.alternate;return n===null?(n=de(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function co(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ei(t,e,n,a,l,i){var u=0;if(a=t,typeof t=="function")Uu(t)&&(u=1);else if(typeof t=="string")u=Dm(t,n,I.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case X:return t=de(31,n,e,l),t.elementType=X,t.lanes=i,t;case K:return Hn(n.children,l,i,e);case ct:u=8,l|=24;break;case H:return t=de(12,n,e,l|2),t.elementType=H,t.lanes=i,t;case ot:return t=de(13,n,e,l),t.elementType=ot,t.lanes=i,t;case Q:return t=de(19,n,e,l),t.elementType=Q,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case U:u=10;break t;case O:u=9;break t;case Z:u=11;break t;case q:u=14;break t;case j:u=16,a=null;break t}u=29,n=Error(c(130,t===null?"null":typeof t,"")),a=null}return e=de(u,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function Hn(t,e,n,a){return t=de(7,t,a,e),t.lanes=n,t}function ju(t,e,n){return t=de(6,t,null,e),t.lanes=n,t}function ro(t){var e=de(18,null,null,0);return e.stateNode=t,e}function qu(t,e,n){return e=de(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var so=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=so.get(t);return n!==void 0?n:(e={value:t,source:e,stack:rs(e)},so.set(t,e),e)}return{value:t,source:e,stack:rs(e)}}var fa=[],da=0,ni=null,$a=0,we=[],Ee=0,un=null,Re=1,ze="";function Ye(t,e){fa[da++]=$a,fa[da++]=ni,ni=t,$a=e}function oo(t,e,n){we[Ee++]=Re,we[Ee++]=ze,we[Ee++]=un,un=t;var a=Re;t=ze;var l=32-oe(a)-1;a&=~(1<<l),n+=1;var i=32-oe(e)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,Re=1<<32-oe(e)+l|n<<l|a,ze=i+t}else Re=1<<i|n<<l|a,ze=t}function Yu(t){t.return!==null&&(Ye(t,1),oo(t,1,0))}function Gu(t){for(;t===ni;)ni=fa[--da],fa[da]=null,$a=fa[--da],fa[da]=null;for(;t===un;)un=we[--Ee],we[Ee]=null,ze=we[--Ee],we[Ee]=null,Re=we[--Ee],we[Ee]=null}function fo(t,e){we[Ee++]=Re,we[Ee++]=ze,we[Ee++]=un,Re=e.id,ze=e.overflow,un=t}var Jt=null,zt=null,yt=!1,cn=null,Te=!1,Qu=Error(c(519));function rn(t){var e=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Pa(Se(e,t)),Qu}function ho(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[Kt]=t,e[ee]=a,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<Sl.length;n++)mt(Sl[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),xs(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),Cs(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||Rd(e.textContent,n)?(a.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),a.onScroll!=null&&mt("scroll",e),a.onScrollEnd!=null&&mt("scrollend",e),a.onClick!=null&&(e.onclick=Ue),e=!0):e=!1,e||rn(t,!0)}function mo(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:Te=!1;return;case 27:case 3:Te=!0;return;default:Jt=Jt.return}}function ha(t){if(t!==Jt)return!1;if(!yt)return mo(t),yt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||cr(t.type,t.memoizedProps)),n=!n),n&&zt&&rn(t),mo(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));zt=qd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));zt=qd(t)}else e===27?(e=zt,wn(t.type)?(t=dr,dr=null,zt=t):zt=e):zt=Jt?Ae(t.stateNode.nextSibling):null;return!0}function Bn(){zt=Jt=null,yt=!1}function Xu(){var t=cn;return t!==null&&(ue===null?ue=t:ue.push.apply(ue,t),cn=null),t}function Pa(t){cn===null?cn=[t]:cn.push(t)}var Vu=L(null),Un=null,Ge=null;function sn(t,e,n){G(Vu,e._currentValue),e._currentValue=n}function Qe(t){t._currentValue=Vu.current,z(Vu)}function Zu(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Ku(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;t:for(;i!==null;){var s=i;i=l;for(var g=0;g<e.length;g++)if(s.context===e[g]){i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Zu(i.return,n,t),a||(u=null);break t}i=s.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(c(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Zu(u,n,t),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===t){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function ma(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(c(387));if(u=u.memoizedProps,u!==null){var s=l.type;fe(l.pendingProps.value,u.value)||(t!==null?t.push(s):t=[s])}}else if(l===dt.current){if(u=l.alternate,u===null)throw Error(c(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Al):t=[Al])}l=l.return}t!==null&&Ku(e,t,n,a),e.flags|=262144}function ai(t){for(t=t.firstContext;t!==null;){if(!fe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function jn(t){Un=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function It(t){return go(Un,t)}function li(t,e){return Un===null&&jn(t),go(t,e)}function go(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ge===null){if(t===null)throw Error(c(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return n}var _1=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},M1=r.unstable_scheduleCallback,R1=r.unstable_NormalPriority,qt={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ju(){return{controller:new _1,data:new Map,refCount:0}}function tl(t){t.refCount--,t.refCount===0&&M1(R1,function(){t.controller.abort()})}var el=null,Iu=0,ga=0,pa=null;function z1(t,e){if(el===null){var n=el=[];Iu=0,ga=$c(),pa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Iu++,e.then(po,po),e}function po(){if(--Iu===0&&el!==null){pa!==null&&(pa.status="fulfilled");var t=el;el=null,ga=0,pa=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function D1(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var yo=C.S;C.S=function(t,e){ed=re(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&z1(t,e),yo!==null&&yo(t,e)};var qn=L(null);function Fu(){var t=qn.current;return t!==null?t:Mt.pooledCache}function ii(t,e){e===null?G(qn,qn.current):G(qn,e.pool)}function vo(){var t=Fu();return t===null?null:{parent:qt._currentValue,pool:t}}var ya=Error(c(460)),Wu=Error(c(474)),ui=Error(c(542)),ci={then:function(){}};function bo(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Lo(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Ue,Ue),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,wo(t),t;default:if(typeof e.status=="string")e.then(Ue,Ue);else{if(t=Mt,t!==null&&100<t.shellSuspendCounter)throw Error(c(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,wo(t),t}throw Gn=e,ya}}function Yn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gn=n,ya):n}}var Gn=null;function So(){if(Gn===null)throw Error(c(459));var t=Gn;return Gn=null,t}function wo(t){if(t===ya||t===ui)throw Error(c(483))}var va=null,nl=0;function ri(t){var e=nl;return nl+=1,va===null&&(va=[]),Lo(va,t,e)}function al(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function si(t,e){throw e.$$typeof===k?Error(c(525)):(t=Object.prototype.toString.call(e),Error(c(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Eo(t){function e(S,y){if(t){var E=S.deletions;E===null?(S.deletions=[y],S.flags|=16):E.push(y)}}function n(S,y){if(!t)return null;for(;y!==null;)e(S,y),y=y.sibling;return null}function a(S){for(var y=new Map;S!==null;)S.key!==null?y.set(S.key,S):y.set(S.index,S),S=S.sibling;return y}function l(S,y){return S=qe(S,y),S.index=0,S.sibling=null,S}function i(S,y,E){return S.index=E,t?(E=S.alternate,E!==null?(E=E.index,E<y?(S.flags|=67108866,y):E):(S.flags|=67108866,y)):(S.flags|=1048576,y)}function u(S){return t&&S.alternate===null&&(S.flags|=67108866),S}function s(S,y,E,_){return y===null||y.tag!==6?(y=ju(E,S.mode,_),y.return=S,y):(y=l(y,E),y.return=S,y)}function g(S,y,E,_){var tt=E.type;return tt===K?N(S,y,E.props.children,_,E.key):y!==null&&(y.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===j&&Yn(tt)===y.type)?(y=l(y,E.props),al(y,E),y.return=S,y):(y=ei(E.type,E.key,E.props,null,S.mode,_),al(y,E),y.return=S,y)}function T(S,y,E,_){return y===null||y.tag!==4||y.stateNode.containerInfo!==E.containerInfo||y.stateNode.implementation!==E.implementation?(y=qu(E,S.mode,_),y.return=S,y):(y=l(y,E.children||[]),y.return=S,y)}function N(S,y,E,_,tt){return y===null||y.tag!==7?(y=Hn(E,S.mode,_,tt),y.return=S,y):(y=l(y,E),y.return=S,y)}function M(S,y,E){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return y=ju(""+y,S.mode,E),y.return=S,y;if(typeof y=="object"&&y!==null){switch(y.$$typeof){case B:return E=ei(y.type,y.key,y.props,null,S.mode,E),al(E,y),E.return=S,E;case Y:return y=qu(y,S.mode,E),y.return=S,y;case j:return y=Yn(y),M(S,y,E)}if(jt(y)||F(y))return y=Hn(y,S.mode,E,null),y.return=S,y;if(typeof y.then=="function")return M(S,ri(y),E);if(y.$$typeof===U)return M(S,li(S,y),E);si(S,y)}return null}function x(S,y,E,_){var tt=y!==null?y.key:null;if(typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint")return tt!==null?null:s(S,y,""+E,_);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case B:return E.key===tt?g(S,y,E,_):null;case Y:return E.key===tt?T(S,y,E,_):null;case j:return E=Yn(E),x(S,y,E,_)}if(jt(E)||F(E))return tt!==null?null:N(S,y,E,_,null);if(typeof E.then=="function")return x(S,y,ri(E),_);if(E.$$typeof===U)return x(S,y,li(S,E),_);si(S,E)}return null}function A(S,y,E,_,tt){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return S=S.get(E)||null,s(y,S,""+_,tt);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case B:return S=S.get(_.key===null?E:_.key)||null,g(y,S,_,tt);case Y:return S=S.get(_.key===null?E:_.key)||null,T(y,S,_,tt);case j:return _=Yn(_),A(S,y,E,_,tt)}if(jt(_)||F(_))return S=S.get(E)||null,N(y,S,_,tt,null);if(typeof _.then=="function")return A(S,y,E,ri(_),tt);if(_.$$typeof===U)return A(S,y,E,li(y,_),tt);si(y,_)}return null}function J(S,y,E,_){for(var tt=null,bt=null,W=y,st=y=0,pt=null;W!==null&&st<E.length;st++){W.index>st?(pt=W,W=null):pt=W.sibling;var Lt=x(S,W,E[st],_);if(Lt===null){W===null&&(W=pt);break}t&&W&&Lt.alternate===null&&e(S,W),y=i(Lt,y,st),bt===null?tt=Lt:bt.sibling=Lt,bt=Lt,W=pt}if(st===E.length)return n(S,W),yt&&Ye(S,st),tt;if(W===null){for(;st<E.length;st++)W=M(S,E[st],_),W!==null&&(y=i(W,y,st),bt===null?tt=W:bt.sibling=W,bt=W);return yt&&Ye(S,st),tt}for(W=a(W);st<E.length;st++)pt=A(W,S,st,E[st],_),pt!==null&&(t&&pt.alternate!==null&&W.delete(pt.key===null?st:pt.key),y=i(pt,y,st),bt===null?tt=pt:bt.sibling=pt,bt=pt);return t&&W.forEach(function(Cn){return e(S,Cn)}),yt&&Ye(S,st),tt}function at(S,y,E,_){if(E==null)throw Error(c(151));for(var tt=null,bt=null,W=y,st=y=0,pt=null,Lt=E.next();W!==null&&!Lt.done;st++,Lt=E.next()){W.index>st?(pt=W,W=null):pt=W.sibling;var Cn=x(S,W,Lt.value,_);if(Cn===null){W===null&&(W=pt);break}t&&W&&Cn.alternate===null&&e(S,W),y=i(Cn,y,st),bt===null?tt=Cn:bt.sibling=Cn,bt=Cn,W=pt}if(Lt.done)return n(S,W),yt&&Ye(S,st),tt;if(W===null){for(;!Lt.done;st++,Lt=E.next())Lt=M(S,Lt.value,_),Lt!==null&&(y=i(Lt,y,st),bt===null?tt=Lt:bt.sibling=Lt,bt=Lt);return yt&&Ye(S,st),tt}for(W=a(W);!Lt.done;st++,Lt=E.next())Lt=A(W,S,st,Lt.value,_),Lt!==null&&(t&&Lt.alternate!==null&&W.delete(Lt.key===null?st:Lt.key),y=i(Lt,y,st),bt===null?tt=Lt:bt.sibling=Lt,bt=Lt);return t&&W.forEach(function(Xm){return e(S,Xm)}),yt&&Ye(S,st),tt}function _t(S,y,E,_){if(typeof E=="object"&&E!==null&&E.type===K&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case B:t:{for(var tt=E.key;y!==null;){if(y.key===tt){if(tt=E.type,tt===K){if(y.tag===7){n(S,y.sibling),_=l(y,E.props.children),_.return=S,S=_;break t}}else if(y.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===j&&Yn(tt)===y.type){n(S,y.sibling),_=l(y,E.props),al(_,E),_.return=S,S=_;break t}n(S,y);break}else e(S,y);y=y.sibling}E.type===K?(_=Hn(E.props.children,S.mode,_,E.key),_.return=S,S=_):(_=ei(E.type,E.key,E.props,null,S.mode,_),al(_,E),_.return=S,S=_)}return u(S);case Y:t:{for(tt=E.key;y!==null;){if(y.key===tt)if(y.tag===4&&y.stateNode.containerInfo===E.containerInfo&&y.stateNode.implementation===E.implementation){n(S,y.sibling),_=l(y,E.children||[]),_.return=S,S=_;break t}else{n(S,y);break}else e(S,y);y=y.sibling}_=qu(E,S.mode,_),_.return=S,S=_}return u(S);case j:return E=Yn(E),_t(S,y,E,_)}if(jt(E))return J(S,y,E,_);if(F(E)){if(tt=F(E),typeof tt!="function")throw Error(c(150));return E=tt.call(E),at(S,y,E,_)}if(typeof E.then=="function")return _t(S,y,ri(E),_);if(E.$$typeof===U)return _t(S,y,li(S,E),_);si(S,E)}return typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint"?(E=""+E,y!==null&&y.tag===6?(n(S,y.sibling),_=l(y,E),_.return=S,S=_):(n(S,y),_=ju(E,S.mode,_),_.return=S,S=_),u(S)):n(S,y)}return function(S,y,E,_){try{nl=0;var tt=_t(S,y,E,_);return va=null,tt}catch(W){if(W===ya||W===ui)throw W;var bt=de(29,W,null,S.mode);return bt.lanes=_,bt.return=S,bt}finally{}}}var Qn=Eo(!0),To=Eo(!1),on=!1;function $u(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Pu(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(wt&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=ti(t),uo(t,null,n),e}return Pl(t,a,e,n),ti(t)}function ll(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,ms(t,n)}}function tc(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var ec=!1;function il(){if(ec){var t=pa;if(t!==null)throw t}}function ul(t,e,n,a){ec=!1;var l=t.updateQueue;on=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var g=s,T=g.next;g.next=null,u===null?i=T:u.next=T,u=g;var N=t.alternate;N!==null&&(N=N.updateQueue,s=N.lastBaseUpdate,s!==u&&(s===null?N.firstBaseUpdate=T:s.next=T,N.lastBaseUpdate=g))}if(i!==null){var M=l.baseState;u=0,N=T=g=null,s=i;do{var x=s.lane&-536870913,A=x!==s.lane;if(A?(gt&x)===x:(a&x)===x){x!==0&&x===ga&&(ec=!0),N!==null&&(N=N.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});t:{var J=t,at=s;x=e;var _t=n;switch(at.tag){case 1:if(J=at.payload,typeof J=="function"){M=J.call(_t,M,x);break t}M=J;break t;case 3:J.flags=J.flags&-65537|128;case 0:if(J=at.payload,x=typeof J=="function"?J.call(_t,M,x):J,x==null)break t;M=R({},M,x);break t;case 2:on=!0}}x=s.callback,x!==null&&(t.flags|=64,A&&(t.flags|=8192),A=l.callbacks,A===null?l.callbacks=[x]:A.push(x))}else A={lane:x,tag:s.tag,payload:s.payload,callback:s.callback,next:null},N===null?(T=N=A,g=M):N=N.next=A,u|=x;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;A=s,s=A.next,A.next=null,l.lastBaseUpdate=A,l.shared.pending=null}}while(!0);N===null&&(g=M),l.baseState=g,l.firstBaseUpdate=T,l.lastBaseUpdate=N,i===null&&(l.shared.lanes=0),yn|=u,t.lanes=u,t.memoizedState=M}}function xo(t,e){if(typeof t!="function")throw Error(c(191,t));t.call(e)}function Ao(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)xo(n[t],e)}var ba=L(null),oi=L(0);function Co(t,e){t=$e,G(oi,t),G(ba,e),$e=t|e.baseLanes}function nc(){G(oi,$e),G(ba,ba.current)}function ac(){$e=oi.current,z(ba),z(oi)}var he=L(null),xe=null;function hn(t){var e=t.alternate;G(Bt,Bt.current&1),G(he,t),xe===null&&(e===null||ba.current!==null||e.memoizedState!==null)&&(xe=t)}function lc(t){G(Bt,Bt.current),G(he,t),xe===null&&(xe=t)}function No(t){t.tag===22?(G(Bt,Bt.current),G(he,t),xe===null&&(xe=t)):mn()}function mn(){G(Bt,Bt.current),G(he,he.current)}function me(t){z(he),xe===t&&(xe=null),z(Bt)}var Bt=L(0);function fi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||or(n)||fr(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xe=0,rt=null,Ct=null,Yt=null,di=!1,La=!1,Xn=!1,hi=0,cl=0,Sa=null,k1=0;function Ot(){throw Error(c(321))}function ic(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!fe(t[n],e[n]))return!1;return!0}function uc(t,e,n,a,l,i){return Xe=i,rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,C.H=t===null||t.memoizedState===null?df:Sc,Xn=!1,i=n(a,l),Xn=!1,La&&(i=Mo(e,n,a,l)),_o(t),i}function _o(t){C.H=ol;var e=Ct!==null&&Ct.next!==null;if(Xe=0,Yt=Ct=rt=null,di=!1,cl=0,Sa=null,e)throw Error(c(300));t===null||Gt||(t=t.dependencies,t!==null&&ai(t)&&(Gt=!0))}function Mo(t,e,n,a){rt=t;var l=0;do{if(La&&(Sa=null),cl=0,La=!1,25<=l)throw Error(c(301));if(l+=1,Yt=Ct=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}C.H=hf,i=e(n,a)}while(La);return i}function O1(){var t=C.H,e=t.useState()[0];return e=typeof e.then=="function"?rl(e):e,t=t.useState()[0],(Ct!==null?Ct.memoizedState:null)!==t&&(rt.flags|=1024),e}function cc(){var t=hi!==0;return hi=0,t}function rc(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function sc(t){if(di){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}di=!1}Xe=0,Yt=Ct=rt=null,La=!1,cl=hi=0,Sa=null}function te(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Yt===null?rt.memoizedState=Yt=t:Yt=Yt.next=t,Yt}function Ut(){if(Ct===null){var t=rt.alternate;t=t!==null?t.memoizedState:null}else t=Ct.next;var e=Yt===null?rt.memoizedState:Yt.next;if(e!==null)Yt=e,Ct=t;else{if(t===null)throw rt.alternate===null?Error(c(467)):Error(c(310));Ct=t,t={memoizedState:Ct.memoizedState,baseState:Ct.baseState,baseQueue:Ct.baseQueue,queue:Ct.queue,next:null},Yt===null?rt.memoizedState=Yt=t:Yt=Yt.next=t}return Yt}function mi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function rl(t){var e=cl;return cl+=1,Sa===null&&(Sa=[]),t=Lo(Sa,t,e),e=rt,(Yt===null?e.memoizedState:Yt.next)===null&&(e=e.alternate,C.H=e===null||e.memoizedState===null?df:Sc),t}function gi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return rl(t);if(t.$$typeof===U)return It(t)}throw Error(c(438,String(t)))}function oc(t){var e=null,n=rt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=rt.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=mi(),rt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=et;return e.index++,n}function Ve(t,e){return typeof e=="function"?e(t):e}function pi(t){var e=Ut();return fc(e,Ct,t)}function fc(t,e,n){var a=t.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var s=u=null,g=null,T=e,N=!1;do{var M=T.lane&-536870913;if(M!==T.lane?(gt&M)===M:(Xe&M)===M){var x=T.revertLane;if(x===0)g!==null&&(g=g.next={lane:0,revertLane:0,gesture:null,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null}),M===ga&&(N=!0);else if((Xe&x)===x){T=T.next,x===ga&&(N=!0);continue}else M={lane:0,revertLane:T.revertLane,gesture:null,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},g===null?(s=g=M,u=i):g=g.next=M,rt.lanes|=x,yn|=x;M=T.action,Xn&&n(i,M),i=T.hasEagerState?T.eagerState:n(i,M)}else x={lane:M,revertLane:T.revertLane,gesture:T.gesture,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},g===null?(s=g=x,u=i):g=g.next=x,rt.lanes|=M,yn|=M;T=T.next}while(T!==null&&T!==e);if(g===null?u=i:g.next=s,!fe(i,t.memoizedState)&&(Gt=!0,N&&(n=pa,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=g,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function dc(t){var e=Ut(),n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=t(i,u.action),u=u.next;while(u!==l);fe(i,e.memoizedState)||(Gt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function Ro(t,e,n){var a=rt,l=Ut(),i=yt;if(i){if(n===void 0)throw Error(c(407));n=n()}else n=e();var u=!fe((Ct||l).memoizedState,n);if(u&&(l.memoizedState=n,Gt=!0),l=l.queue,gc(ko.bind(null,a,l,t),[t]),l.getSnapshot!==e||u||Yt!==null&&Yt.memoizedState.tag&1){if(a.flags|=2048,wa(9,{destroy:void 0},Do.bind(null,a,l,n,e),null),Mt===null)throw Error(c(349));i||(Xe&127)!==0||zo(a,e,n)}return n}function zo(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=rt.updateQueue,e===null?(e=mi(),rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Do(t,e,n,a){e.value=n,e.getSnapshot=a,Oo(e)&&Ho(t)}function ko(t,e,n){return n(function(){Oo(e)&&Ho(t)})}function Oo(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!fe(t,n)}catch{return!0}}function Ho(t){var e=On(t,2);e!==null&&ce(e,t,2)}function hc(t){var e=te();if(typeof t=="function"){var n=t;if(t=n(),Xn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:t},e}function Bo(t,e,n,a){return t.baseState=n,fc(t,Ct,typeof a=="function"?a:Ve)}function H1(t,e,n,a,l){if(bi(t))throw Error(c(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};C.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,Uo(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Uo(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=C.T,u={};C.T=u;try{var s=n(l,a),g=C.S;g!==null&&g(u,s),jo(t,e,s)}catch(T){mc(t,e,T)}finally{i!==null&&u.types!==null&&(i.types=u.types),C.T=i}}else try{i=n(l,a),jo(t,e,i)}catch(T){mc(t,e,T)}}function jo(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){qo(t,e,a)},function(a){return mc(t,e,a)}):qo(t,e,n)}function qo(t,e,n){e.status="fulfilled",e.value=n,Yo(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Uo(t,n)))}function mc(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,Yo(e),e=e.next;while(e!==a)}t.action=null}function Yo(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Go(t,e){return e}function Qo(t,e){if(yt){var n=Mt.formState;if(n!==null){t:{var a=rt;if(yt){if(zt){e:{for(var l=zt,i=Te;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ae(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){zt=Ae(l.nextSibling),a=l.data==="F!";break t}}rn(a)}a=!1}a&&(e=n[0])}}return n=te(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Go,lastRenderedState:e},n.queue=a,n=sf.bind(null,rt,a),a.dispatch=n,a=hc(!1),i=Lc.bind(null,rt,!1,a.queue),a=te(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=H1.bind(null,rt,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Xo(t){var e=Ut();return Vo(e,Ct,t)}function Vo(t,e,n){if(e=fc(t,e,Go)[0],t=pi(Ve)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=rl(e)}catch(u){throw u===ya?ui:u}else a=e;e=Ut();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(rt.flags|=2048,wa(9,{destroy:void 0},B1.bind(null,l,n),null)),[a,i,t]}function B1(t,e){t.action=e}function Zo(t){var e=Ut(),n=Ct;if(n!==null)return Vo(e,n,t);Ut(),e=e.memoizedState,n=Ut();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function wa(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=rt.updateQueue,e===null&&(e=mi(),rt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Ko(){return Ut().memoizedState}function yi(t,e,n,a){var l=te();rt.flags|=t,l.memoizedState=wa(1|e,{destroy:void 0},n,a===void 0?null:a)}function vi(t,e,n,a){var l=Ut();a=a===void 0?null:a;var i=l.memoizedState.inst;Ct!==null&&a!==null&&ic(a,Ct.memoizedState.deps)?l.memoizedState=wa(e,i,n,a):(rt.flags|=t,l.memoizedState=wa(1|e,i,n,a))}function Jo(t,e){yi(8390656,8,t,e)}function gc(t,e){vi(2048,8,t,e)}function U1(t){rt.flags|=4;var e=rt.updateQueue;if(e===null)e=mi(),rt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Io(t){var e=Ut().memoizedState;return U1({ref:e,nextImpl:t}),function(){if((wt&2)!==0)throw Error(c(440));return e.impl.apply(void 0,arguments)}}function Fo(t,e){return vi(4,2,t,e)}function Wo(t,e){return vi(4,4,t,e)}function $o(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Po(t,e,n){n=n!=null?n.concat([t]):null,vi(4,4,$o.bind(null,e,t),n)}function pc(){}function tf(t,e){var n=Ut();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&ic(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function ef(t,e){var n=Ut();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&ic(e,a[1]))return a[0];if(a=t(),Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function yc(t,e,n){return n===void 0||(Xe&1073741824)!==0&&(gt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=ad(),rt.lanes|=t,yn|=t,n)}function nf(t,e,n,a){return fe(n,e)?n:ba.current!==null?(t=yc(t,n,a),fe(t,e)||(Gt=!0),t):(Xe&42)===0||(Xe&1073741824)!==0&&(gt&261930)===0?(Gt=!0,t.memoizedState=n):(t=ad(),rt.lanes|=t,yn|=t,e)}function af(t,e,n,a,l){var i=V.p;V.p=i!==0&&8>i?i:8;var u=C.T,s={};C.T=s,Lc(t,!1,e,n);try{var g=l(),T=C.S;if(T!==null&&T(s,g),g!==null&&typeof g=="object"&&typeof g.then=="function"){var N=D1(g,a);sl(t,e,N,ye(t))}else sl(t,e,a,ye(t))}catch(M){sl(t,e,{then:function(){},status:"rejected",reason:M},ye())}finally{V.p=i,u!==null&&s.types!==null&&(u.types=s.types),C.T=u}}function j1(){}function vc(t,e,n,a){if(t.tag!==5)throw Error(c(476));var l=lf(t).queue;af(t,l,e,nt,n===null?j1:function(){return uf(t),n(a)})}function lf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:nt,baseState:nt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:nt},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function uf(t){var e=lf(t);e.next===null&&(e=t.alternate.memoizedState),sl(t,e.next.queue,{},ye())}function bc(){return It(Al)}function cf(){return Ut().memoizedState}function rf(){return Ut().memoizedState}function q1(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var a=dn(e,t,n);a!==null&&(ce(a,e,n),ll(a,e,n)),e={cache:Ju()},t.payload=e;return}e=e.return}}function Y1(t,e,n){var a=ye();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},bi(t)?of(e,n):(n=Bu(t,e,n,a),n!==null&&(ce(n,t,a),ff(n,e,a)))}function sf(t,e,n){var a=ye();sl(t,e,n,a)}function sl(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(bi(t))of(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,s=i(u,n);if(l.hasEagerState=!0,l.eagerState=s,fe(s,u))return Pl(t,e,l,0),Mt===null&&$l(),!1}catch{}finally{}if(n=Bu(t,e,l,a),n!==null)return ce(n,t,a),ff(n,e,a),!0}return!1}function Lc(t,e,n,a){if(a={lane:2,revertLane:$c(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},bi(t)){if(e)throw Error(c(479))}else e=Bu(t,n,a,2),e!==null&&ce(e,t,2)}function bi(t){var e=t.alternate;return t===rt||e!==null&&e===rt}function of(t,e){La=di=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function ff(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,ms(t,n)}}var ol={readContext:It,use:gi,useCallback:Ot,useContext:Ot,useEffect:Ot,useImperativeHandle:Ot,useLayoutEffect:Ot,useInsertionEffect:Ot,useMemo:Ot,useReducer:Ot,useRef:Ot,useState:Ot,useDebugValue:Ot,useDeferredValue:Ot,useTransition:Ot,useSyncExternalStore:Ot,useId:Ot,useHostTransitionStatus:Ot,useFormState:Ot,useActionState:Ot,useOptimistic:Ot,useMemoCache:Ot,useCacheRefresh:Ot};ol.useEffectEvent=Ot;var df={readContext:It,use:gi,useCallback:function(t,e){return te().memoizedState=[t,e===void 0?null:e],t},useContext:It,useEffect:Jo,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,yi(4194308,4,$o.bind(null,e,t),n)},useLayoutEffect:function(t,e){return yi(4194308,4,t,e)},useInsertionEffect:function(t,e){yi(4,2,t,e)},useMemo:function(t,e){var n=te();e=e===void 0?null:e;var a=t();if(Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=te();if(n!==void 0){var l=n(e);if(Xn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=Y1.bind(null,rt,t),[a.memoizedState,t]},useRef:function(t){var e=te();return t={current:t},e.memoizedState=t},useState:function(t){t=hc(t);var e=t.queue,n=sf.bind(null,rt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:pc,useDeferredValue:function(t,e){var n=te();return yc(n,t,e)},useTransition:function(){var t=hc(!1);return t=af.bind(null,rt,t.queue,!0,!1),te().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=rt,l=te();if(yt){if(n===void 0)throw Error(c(407));n=n()}else{if(n=e(),Mt===null)throw Error(c(349));(gt&127)!==0||zo(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,Jo(ko.bind(null,a,i,t),[t]),a.flags|=2048,wa(9,{destroy:void 0},Do.bind(null,a,i,n,e),null),n},useId:function(){var t=te(),e=Mt.identifierPrefix;if(yt){var n=ze,a=Re;n=(a&~(1<<32-oe(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=hi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=k1++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:bc,useFormState:Qo,useActionState:Qo,useOptimistic:function(t){var e=te();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Lc.bind(null,rt,!0,n),n.dispatch=e,[t,e]},useMemoCache:oc,useCacheRefresh:function(){return te().memoizedState=q1.bind(null,rt)},useEffectEvent:function(t){var e=te(),n={impl:t};return e.memoizedState=n,function(){if((wt&2)!==0)throw Error(c(440));return n.impl.apply(void 0,arguments)}}},Sc={readContext:It,use:gi,useCallback:tf,useContext:It,useEffect:gc,useImperativeHandle:Po,useInsertionEffect:Fo,useLayoutEffect:Wo,useMemo:ef,useReducer:pi,useRef:Ko,useState:function(){return pi(Ve)},useDebugValue:pc,useDeferredValue:function(t,e){var n=Ut();return nf(n,Ct.memoizedState,t,e)},useTransition:function(){var t=pi(Ve)[0],e=Ut().memoizedState;return[typeof t=="boolean"?t:rl(t),e]},useSyncExternalStore:Ro,useId:cf,useHostTransitionStatus:bc,useFormState:Xo,useActionState:Xo,useOptimistic:function(t,e){var n=Ut();return Bo(n,Ct,t,e)},useMemoCache:oc,useCacheRefresh:rf};Sc.useEffectEvent=Io;var hf={readContext:It,use:gi,useCallback:tf,useContext:It,useEffect:gc,useImperativeHandle:Po,useInsertionEffect:Fo,useLayoutEffect:Wo,useMemo:ef,useReducer:dc,useRef:Ko,useState:function(){return dc(Ve)},useDebugValue:pc,useDeferredValue:function(t,e){var n=Ut();return Ct===null?yc(n,t,e):nf(n,Ct.memoizedState,t,e)},useTransition:function(){var t=dc(Ve)[0],e=Ut().memoizedState;return[typeof t=="boolean"?t:rl(t),e]},useSyncExternalStore:Ro,useId:cf,useHostTransitionStatus:bc,useFormState:Zo,useActionState:Zo,useOptimistic:function(t,e){var n=Ut();return Ct!==null?Bo(n,Ct,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:oc,useCacheRefresh:rf};hf.useEffectEvent=Io;function wc(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:R({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ec={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(ce(e,t,a),ll(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(ce(e,t,a),ll(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(ce(e,t,n),ll(e,t,n))}};function mf(t,e,n,a,l,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,u):e.prototype&&e.prototype.isPureReactComponent?!Fa(n,a)||!Fa(l,i):!0}function gf(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&Ec.enqueueReplaceState(e,e.state,null)}function Vn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=R({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function pf(t){Wl(t)}function yf(t){console.error(t)}function vf(t){Wl(t)}function Li(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function bf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Tc(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){Li(t,e)},n}function Lf(t){return t=fn(t),t.tag=3,t}function Sf(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){bf(e,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){bf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var s=a.stack;this.componentDidCatch(a.value,{componentStack:s!==null?s:""})})}function G1(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&ma(e,n,l,!0),n=he.current,n!==null){switch(n.tag){case 31:case 13:return xe===null?zi():n.alternate===null&&Ht===0&&(Ht=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===ci?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Ic(t,a,l)),!1;case 22:return n.flags|=65536,a===ci?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Ic(t,a,l)),!1}throw Error(c(435,n.tag))}return Ic(t,a,l),zi(),!1}if(yt)return e=he.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Qu&&(t=Error(c(422),{cause:a}),Pa(Se(t,n)))):(a!==Qu&&(e=Error(c(423),{cause:a}),Pa(Se(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=Se(a,n),l=Tc(t.stateNode,a,l),tc(t,l),Ht!==4&&(Ht=2)),!1;var i=Error(c(520),{cause:a});if(i=Se(i,n),vl===null?vl=[i]:vl.push(i),Ht!==4&&(Ht=2),e===null)return!0;a=Se(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=Tc(n.stateNode,a,t),tc(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=Lf(l),Sf(l,t,n,a),tc(n,l),!1}n=n.return}while(n!==null);return!1}var xc=Error(c(461)),Gt=!1;function Ft(t,e,n,a){e.child=t===null?To(e,null,n,a):Qn(e,t.child,n,a)}function wf(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var u={};for(var s in a)s!=="ref"&&(u[s]=a[s])}else u=a;return jn(e),a=uc(t,e,n,u,i,l),s=cc(),t!==null&&!Gt?(rc(t,e,l),Ze(t,e,l)):(yt&&s&&Yu(e),e.flags|=1,Ft(t,e,a,l),e.child)}function Ef(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!Uu(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,Tf(t,e,i,a,l)):(t=ei(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Dc(t,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Fa,n(u,a)&&t.ref===e.ref)return Ze(t,e,l)}return e.flags|=1,t=qe(i,a),t.ref=e.ref,t.return=e,e.child=t}function Tf(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if(Fa(i,a)&&t.ref===e.ref)if(Gt=!1,e.pendingProps=a=i,Dc(t,l))(t.flags&131072)!==0&&(Gt=!0);else return e.lanes=t.lanes,Ze(t,e,l)}return Ac(t,e,n,a,l)}function xf(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return Af(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&ii(e,i!==null?i.cachePool:null),i!==null?Co(e,i):nc(),No(e);else return a=e.lanes=536870912,Af(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(ii(e,i.cachePool),Co(e,i),mn(),e.memoizedState=null):(t!==null&&ii(e,null),nc(),mn());return Ft(t,e,l,n),e.child}function fl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Af(t,e,n,a,l){var i=Fu();return i=i===null?null:{parent:qt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&ii(e,null),nc(),No(e),t!==null&&ma(t,e,a,!0),e.childLanes=l,null}function Si(t,e){return e=Ei({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Cf(t,e,n){return Qn(e,t.child,null,n),t=Si(e,e.pendingProps),t.flags|=2,me(e),e.memoizedState=null,t}function Q1(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(yt){if(a.mode==="hidden")return t=Si(e,a),e.lanes=536870912,fl(null,t);if(lc(e),(t=zt)?(t=jd(t,Te),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Re,overflow:ze}:null,retryLane:536870912,hydrationErrors:null},n=ro(t),n.return=e,e.child=n,Jt=e,zt=null)):t=null,t===null)throw rn(e);return e.lanes=536870912,null}return Si(e,a)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(lc(e),l)if(e.flags&256)e.flags&=-257,e=Cf(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(c(558));else if(Gt||ma(t,e,n,!1),l=(n&t.childLanes)!==0,Gt||l){if(a=Mt,a!==null&&(u=gs(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,On(t,u),ce(a,t,u),xc;zi(),e=Cf(t,e,n)}else t=i.treeContext,zt=Ae(u.nextSibling),Jt=e,yt=!0,cn=null,Te=!1,t!==null&&fo(e,t),e=Si(e,a),e.flags|=4096;return e}return t=qe(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function wi(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(c(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Ac(t,e,n,a,l){return jn(e),n=uc(t,e,n,a,void 0,l),a=cc(),t!==null&&!Gt?(rc(t,e,l),Ze(t,e,l)):(yt&&a&&Yu(e),e.flags|=1,Ft(t,e,n,l),e.child)}function Nf(t,e,n,a,l,i){return jn(e),e.updateQueue=null,n=Mo(e,a,n,l),_o(t),a=cc(),t!==null&&!Gt?(rc(t,e,i),Ze(t,e,i)):(yt&&a&&Yu(e),e.flags|=1,Ft(t,e,n,i),e.child)}function _f(t,e,n,a,l){if(jn(e),e.stateNode===null){var i=oa,u=n.contextType;typeof u=="object"&&u!==null&&(i=It(u)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ec,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},$u(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?It(u):oa,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(wc(e,n,u,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Ec.enqueueReplaceState(i,i.state,null),ul(e,a,i,l),il(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var s=e.memoizedProps,g=Vn(n,s);i.props=g;var T=i.context,N=n.contextType;u=oa,typeof N=="object"&&N!==null&&(u=It(N));var M=n.getDerivedStateFromProps;N=typeof M=="function"||typeof i.getSnapshotBeforeUpdate=="function",s=e.pendingProps!==s,N||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s||T!==u)&&gf(e,i,a,u),on=!1;var x=e.memoizedState;i.state=x,ul(e,a,i,l),il(),T=e.memoizedState,s||x!==T||on?(typeof M=="function"&&(wc(e,n,M,a),T=e.memoizedState),(g=on||mf(e,n,g,a,x,T,u))?(N||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=T),i.props=a,i.state=T,i.context=u,a=g):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,Pu(t,e),u=e.memoizedProps,N=Vn(n,u),i.props=N,M=e.pendingProps,x=i.context,T=n.contextType,g=oa,typeof T=="object"&&T!==null&&(g=It(T)),s=n.getDerivedStateFromProps,(T=typeof s=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==M||x!==g)&&gf(e,i,a,g),on=!1,x=e.memoizedState,i.state=x,ul(e,a,i,l),il();var A=e.memoizedState;u!==M||x!==A||on||t!==null&&t.dependencies!==null&&ai(t.dependencies)?(typeof s=="function"&&(wc(e,n,s,a),A=e.memoizedState),(N=on||mf(e,n,N,a,x,A,g)||t!==null&&t.dependencies!==null&&ai(t.dependencies))?(T||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,A,g),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,A,g)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=A),i.props=a,i.state=A,i.context=g,a=N):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,wi(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Qn(e,t.child,null,l),e.child=Qn(e,null,n,l)):Ft(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ze(t,e,l),t}function Mf(t,e,n,a){return Bn(),e.flags|=256,Ft(t,e,n,a),e.child}var Cc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Nc(t){return{baseLanes:t,cachePool:vo()}}function _c(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pe),t}function Rf(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(Bt.current&2)!==0),u&&(l=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(yt){if(l?hn(e):mn(),(t=zt)?(t=jd(t,Te),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Re,overflow:ze}:null,retryLane:536870912,hydrationErrors:null},n=ro(t),n.return=e,e.child=n,Jt=e,zt=null)):t=null,t===null)throw rn(e);return fr(t)?e.lanes=32:e.lanes=536870912,null}var s=a.children;return a=a.fallback,l?(mn(),l=e.mode,s=Ei({mode:"hidden",children:s},l),a=Hn(a,l,n,null),s.return=e,a.return=e,s.sibling=a,e.child=s,a=e.child,a.memoizedState=Nc(n),a.childLanes=_c(t,u,n),e.memoizedState=Cc,fl(null,a)):(hn(e),Mc(e,s))}var g=t.memoizedState;if(g!==null&&(s=g.dehydrated,s!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=Rc(t,e,n)):e.memoizedState!==null?(mn(),e.child=t.child,e.flags|=128,e=null):(mn(),s=a.fallback,l=e.mode,a=Ei({mode:"visible",children:a.children},l),s=Hn(s,l,n,null),s.flags|=2,a.return=e,s.return=e,a.sibling=s,e.child=a,Qn(e,t.child,null,n),a=e.child,a.memoizedState=Nc(n),a.childLanes=_c(t,u,n),e.memoizedState=Cc,e=fl(null,a));else if(hn(e),fr(s)){if(u=s.nextSibling&&s.nextSibling.dataset,u)var T=u.dgst;u=T,a=Error(c(419)),a.stack="",a.digest=u,Pa({value:a,source:null,stack:null}),e=Rc(t,e,n)}else if(Gt||ma(t,e,n,!1),u=(n&t.childLanes)!==0,Gt||u){if(u=Mt,u!==null&&(a=gs(u,n),a!==0&&a!==g.retryLane))throw g.retryLane=a,On(t,a),ce(u,t,a),xc;or(s)||zi(),e=Rc(t,e,n)}else or(s)?(e.flags|=192,e.child=t.child,e=null):(t=g.treeContext,zt=Ae(s.nextSibling),Jt=e,yt=!0,cn=null,Te=!1,t!==null&&fo(e,t),e=Mc(e,a.children),e.flags|=4096);return e}return l?(mn(),s=a.fallback,l=e.mode,g=t.child,T=g.sibling,a=qe(g,{mode:"hidden",children:a.children}),a.subtreeFlags=g.subtreeFlags&65011712,T!==null?s=qe(T,s):(s=Hn(s,l,n,null),s.flags|=2),s.return=e,a.return=e,a.sibling=s,e.child=a,fl(null,a),a=e.child,s=t.child.memoizedState,s===null?s=Nc(n):(l=s.cachePool,l!==null?(g=qt._currentValue,l=l.parent!==g?{parent:g,pool:g}:l):l=vo(),s={baseLanes:s.baseLanes|n,cachePool:l}),a.memoizedState=s,a.childLanes=_c(t,u,n),e.memoizedState=Cc,fl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=qe(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function Mc(t,e){return e=Ei({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ei(t,e){return t=de(22,t,null,e),t.lanes=0,t}function Rc(t,e,n){return Qn(e,t.child,null,n),t=Mc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function zf(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Zu(t.return,e,n)}function zc(t,e,n,a,l,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function Df(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=Bt.current,s=(u&2)!==0;if(s?(u=u&1|2,e.flags|=128):u&=1,G(Bt,u),Ft(t,e,a,n),a=yt?$a:0,!s&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&zf(t,n,e);else if(t.tag===19)zf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&fi(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),zc(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&fi(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}zc(e,!0,n,null,i,a);break;case"together":zc(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ma(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(c(153));if(e.child!==null){for(t=e.child,n=qe(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=qe(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Dc(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ai(t)))}function X1(t,e,n){switch(e.tag){case 3:Rt(e,e.stateNode.containerInfo),sn(e,qt,t.memoizedState.cache),Bn();break;case 27:case 5:He(e);break;case 4:Rt(e,e.stateNode.containerInfo);break;case 10:sn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,lc(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Rf(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(ma(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return Df(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),G(Bt,Bt.current),a)break;return null;case 22:return e.lanes=0,xf(t,e,n,e.pendingProps);case 24:sn(e,qt,t.memoizedState.cache)}return Ze(t,e,n)}function kf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Gt=!0;else{if(!Dc(t,n)&&(e.flags&128)===0)return Gt=!1,X1(t,e,n);Gt=(t.flags&131072)!==0}else Gt=!1,yt&&(e.flags&1048576)!==0&&oo(e,$a,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=Yn(e.elementType),e.type=t,typeof t=="function")Uu(t)?(a=Vn(t,a),e.tag=1,e=_f(null,e,t,a,n)):(e.tag=0,e=Ac(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===Z){e.tag=11,e=wf(null,e,t,a,n);break t}else if(l===q){e.tag=14,e=Ef(null,e,t,a,n);break t}}throw e=lt(t)||t,Error(c(306,e,""))}}return e;case 0:return Ac(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Vn(a,e.pendingProps),_f(t,e,a,l,n);case 3:t:{if(Rt(e,e.stateNode.containerInfo),t===null)throw Error(c(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,Pu(t,e),ul(e,a,null,n);var u=e.memoizedState;if(a=u.cache,sn(e,qt,a),a!==i.cache&&Ku(e,[qt],n,!0),il(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Mf(t,e,a,n);break t}else if(a!==l){l=Se(Error(c(424)),e),Pa(l),e=Mf(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(zt=Ae(t.firstChild),Jt=e,yt=!0,cn=null,Te=!0,n=To(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Bn(),a===l){e=Ze(t,e,n);break t}Ft(t,e,a,n)}e=e.child}return e;case 26:return wi(t,e),t===null?(n=Vd(e.type,null,e.pendingProps,null))?e.memoizedState=n:yt||(n=e.type,t=e.pendingProps,a=ji(ft.current).createElement(n),a[Kt]=e,a[ee]=t,Wt(a,n,t),Vt(a),e.stateNode=a):e.memoizedState=Vd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return He(e),t===null&&yt&&(a=e.stateNode=Gd(e.type,e.pendingProps,ft.current),Jt=e,Te=!0,l=zt,wn(e.type)?(dr=l,zt=Ae(a.firstChild)):zt=l),Ft(t,e,e.pendingProps.children,n),wi(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&yt&&((l=a=zt)&&(a=Lm(a,e.type,e.pendingProps,Te),a!==null?(e.stateNode=a,Jt=e,zt=Ae(a.firstChild),Te=!1,l=!0):l=!1),l||rn(e)),He(e),l=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,a=i.children,cr(l,i)?a=null:u!==null&&cr(l,u)&&(e.flags|=32),e.memoizedState!==null&&(l=uc(t,e,O1,null,null,n),Al._currentValue=l),wi(t,e),Ft(t,e,a,n),e.child;case 6:return t===null&&yt&&((t=n=zt)&&(n=Sm(n,e.pendingProps,Te),n!==null?(e.stateNode=n,Jt=e,zt=null,t=!0):t=!1),t||rn(e)),null;case 13:return Rf(t,e,n);case 4:return Rt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Qn(e,null,a,n):Ft(t,e,a,n),e.child;case 11:return wf(t,e,e.type,e.pendingProps,n);case 7:return Ft(t,e,e.pendingProps,n),e.child;case 8:return Ft(t,e,e.pendingProps.children,n),e.child;case 12:return Ft(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,sn(e,e.type,a.value),Ft(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,jn(e),l=It(l),a=a(l),e.flags|=1,Ft(t,e,a,n),e.child;case 14:return Ef(t,e,e.type,e.pendingProps,n);case 15:return Tf(t,e,e.type,e.pendingProps,n);case 19:return Df(t,e,n);case 31:return Q1(t,e,n);case 22:return xf(t,e,n,e.pendingProps);case 24:return jn(e),a=It(qt),t===null?(l=Fu(),l===null&&(l=Mt,i=Ju(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},$u(e),sn(e,qt,l)):((t.lanes&n)!==0&&(Pu(t,e),ul(e,null,null,n),il()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),sn(e,qt,a)):(a=i.cache,sn(e,qt,a),a!==l.cache&&Ku(e,[qt],n,!0))),Ft(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(c(156,e.tag))}function Ke(t){t.flags|=4}function kc(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(cd())t.flags|=8192;else throw Gn=ci,Wu}else t.flags&=-16777217}function Of(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Fd(e))if(cd())t.flags|=8192;else throw Gn=ci,Wu}function Ti(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?ds():536870912,t.lanes|=e,Aa|=e)}function dl(t,e){if(!yt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function Dt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function V1(t,e,n){var a=e.pendingProps;switch(Gu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Dt(e),null;case 1:return Dt(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Qe(qt),At(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ha(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Xu())),Dt(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(Dt(e),Of(e,i)):(Dt(e),kc(e,l,null,a,n))):i?i!==t.memoizedState?(Ke(e),Dt(e),Of(e,i)):(Dt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ke(e),Dt(e),kc(e,l,t,a,n)),null;case 27:if(Ol(e),n=ft.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(c(166));return Dt(e),null}t=I.current,ha(e)?ho(e):(t=Gd(l,a,n),e.stateNode=t,Ke(e))}return Dt(e),null;case 5:if(Ol(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(c(166));return Dt(e),null}if(i=I.current,ha(e))ho(e);else{var u=ji(ft.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[Kt]=e,i[ee]=a;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch(Wt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ke(e)}}return Dt(e),kc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(c(166));if(t=ft.current,ha(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Jt,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[Kt]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Rd(t.nodeValue,n)),t||rn(e,!0)}else t=ji(t).createTextNode(a),t[Kt]=e,e.stateNode=t}return Dt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ha(e),n!==null){if(t===null){if(!a)throw Error(c(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(557));t[Kt]=e}else Bn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Dt(e),t=!1}else n=Xu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(me(e),e):(me(e),null);if((e.flags&128)!==0)throw Error(c(558))}return Dt(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ha(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(c(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(c(317));l[Kt]=e}else Bn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Dt(e),l=!1}else l=Xu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(me(e),e):(me(e),null)}return me(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Ti(e,e.updateQueue),Dt(e),null);case 4:return At(),t===null&&nr(e.stateNode.containerInfo),Dt(e),null;case 10:return Qe(e.type),Dt(e),null;case 19:if(z(Bt),a=e.memoizedState,a===null)return Dt(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)dl(a,!1);else{if(Ht!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=fi(t),i!==null){for(e.flags|=128,dl(a,!1),t=i.updateQueue,e.updateQueue=t,Ti(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)co(n,t),n=n.sibling;return G(Bt,Bt.current&1|2),yt&&Ye(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&re()>_i&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304)}else{if(!l)if(t=fi(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,Ti(e,t),dl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!yt)return Dt(e),null}else 2*re()-a.renderingStartTime>_i&&n!==536870912&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=re(),t.sibling=null,n=Bt.current,G(Bt,l?n&1|2:n&1),yt&&Ye(e,a.treeForkCount),t):(Dt(e),null);case 22:case 23:return me(e),ac(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(Dt(e),e.subtreeFlags&6&&(e.flags|=8192)):Dt(e),n=e.updateQueue,n!==null&&Ti(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&z(qn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Qe(qt),Dt(e),null;case 25:return null;case 30:return null}throw Error(c(156,e.tag))}function Z1(t,e){switch(Gu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Qe(qt),At(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Ol(e),null;case 31:if(e.memoizedState!==null){if(me(e),e.alternate===null)throw Error(c(340));Bn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(me(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(c(340));Bn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return z(Bt),null;case 4:return At(),null;case 10:return Qe(e.type),null;case 22:case 23:return me(e),ac(),t!==null&&z(qn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Qe(qt),null;case 25:return null;default:return null}}function Hf(t,e){switch(Gu(e),e.tag){case 3:Qe(qt),At();break;case 26:case 27:case 5:Ol(e);break;case 4:At();break;case 31:e.memoizedState!==null&&me(e);break;case 13:me(e);break;case 19:z(Bt);break;case 10:Qe(e.type);break;case 22:case 23:me(e),ac(),t!==null&&z(qn);break;case 24:Qe(qt)}}function hl(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(s){xt(e,e.return,s)}}function gn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var u=a.inst,s=u.destroy;if(s!==void 0){u.destroy=void 0,l=e;var g=n,T=s;try{T()}catch(N){xt(l,g,N)}}}a=a.next}while(a!==i)}}catch(N){xt(e,e.return,N)}}function Bf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Ao(e,n)}catch(a){xt(t,t.return,a)}}}function Uf(t,e,n){n.props=Vn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){xt(t,e,a)}}function ml(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){xt(t,e,l)}}function De(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){xt(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){xt(t,e,l)}else n.current=null}function jf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){xt(t,t.return,l)}}function Oc(t,e,n){try{var a=t.stateNode;mm(a,t.type,n,e),a[ee]=e}catch(l){xt(t,t.return,l)}}function qf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&wn(t.type)||t.tag===4}function Hc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||qf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&wn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Bc(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ue));else if(a!==4&&(a===27&&wn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Bc(t,e,n),t=t.sibling;t!==null;)Bc(t,e,n),t=t.sibling}function xi(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&wn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(xi(t,e,n),t=t.sibling;t!==null;)xi(t,e,n),t=t.sibling}function Yf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);Wt(e,a,n),e[Kt]=t,e[ee]=n}catch(i){xt(t,t.return,i)}}var Je=!1,Qt=!1,Uc=!1,Gf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function K1(t,e){if(t=t.containerInfo,ir=Zi,t=$s(t),Ru(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,s=-1,g=-1,T=0,N=0,M=t,x=null;e:for(;;){for(var A;M!==n||l!==0&&M.nodeType!==3||(s=u+l),M!==i||a!==0&&M.nodeType!==3||(g=u+a),M.nodeType===3&&(u+=M.nodeValue.length),(A=M.firstChild)!==null;)x=M,M=A;for(;;){if(M===t)break e;if(x===n&&++T===l&&(s=u),x===i&&++N===a&&(g=u),(A=M.nextSibling)!==null)break;M=x,x=M.parentNode}M=A}n=s===-1||g===-1?null:{start:s,end:g}}else n=null}n=n||{start:0,end:0}}else n=null;for(ur={focusedElem:t,selectionRange:n},Zi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var J=Vn(n.type,l);t=a.getSnapshotBeforeUpdate(J,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(at){xt(n,n.return,at)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)sr(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":sr(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(c(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function Qf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Fe(t,n),a&4&&hl(5,n);break;case 1:if(Fe(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){xt(n,n.return,u)}else{var l=Vn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){xt(n,n.return,u)}}a&64&&Bf(n),a&512&&ml(n,n.return);break;case 3:if(Fe(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Ao(t,e)}catch(u){xt(n,n.return,u)}}break;case 27:e===null&&a&4&&Yf(n);case 26:case 5:Fe(t,n),e===null&&a&4&&jf(n),a&512&&ml(n,n.return);break;case 12:Fe(t,n);break;case 31:Fe(t,n),a&4&&Zf(t,n);break;case 13:Fe(t,n),a&4&&Kf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=nm.bind(null,n),wm(t,n))));break;case 22:if(a=n.memoizedState!==null||Je,!a){e=e!==null&&e.memoizedState!==null||Qt,l=Je;var i=Qt;Je=a,(Qt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Fe(t,n),Je=l,Qt=i}break;case 30:break;default:Fe(t,n)}}function Xf(t){var e=t.alternate;e!==null&&(t.alternate=null,Xf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&mu(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var kt=null,ae=!1;function Ie(t,e,n){for(n=n.child;n!==null;)Vf(t,e,n),n=n.sibling}function Vf(t,e,n){if(se&&typeof se.onCommitFiberUnmount=="function")try{se.onCommitFiberUnmount(Ua,n)}catch{}switch(n.tag){case 26:Qt||De(n,e),Ie(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qt||De(n,e);var a=kt,l=ae;wn(n.type)&&(kt=n.stateNode,ae=!1),Ie(t,e,n),El(n.stateNode),kt=a,ae=l;break;case 5:Qt||De(n,e);case 6:if(a=kt,l=ae,kt=null,Ie(t,e,n),kt=a,ae=l,kt!==null)if(ae)try{(kt.nodeType===9?kt.body:kt.nodeName==="HTML"?kt.ownerDocument.body:kt).removeChild(n.stateNode)}catch(i){xt(n,e,i)}else try{kt.removeChild(n.stateNode)}catch(i){xt(n,e,i)}break;case 18:kt!==null&&(ae?(t=kt,Bd(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ka(t)):Bd(kt,n.stateNode));break;case 4:a=kt,l=ae,kt=n.stateNode.containerInfo,ae=!0,Ie(t,e,n),kt=a,ae=l;break;case 0:case 11:case 14:case 15:gn(2,n,e),Qt||gn(4,n,e),Ie(t,e,n);break;case 1:Qt||(De(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Uf(n,e,a)),Ie(t,e,n);break;case 21:Ie(t,e,n);break;case 22:Qt=(a=Qt)||n.memoizedState!==null,Ie(t,e,n),Qt=a;break;default:Ie(t,e,n)}}function Zf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ka(t)}catch(n){xt(e,e.return,n)}}}function Kf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ka(t)}catch(n){xt(e,e.return,n)}}function J1(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Gf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Gf),e;default:throw Error(c(435,t.tag))}}function Ai(t,e){var n=J1(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=am.bind(null,t,a);a.then(l,l)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,u=e,s=u;t:for(;s!==null;){switch(s.tag){case 27:if(wn(s.type)){kt=s.stateNode,ae=!1;break t}break;case 5:kt=s.stateNode,ae=!1;break t;case 3:case 4:kt=s.stateNode.containerInfo,ae=!0;break t}s=s.return}if(kt===null)throw Error(c(160));Vf(i,u,l),kt=null,ae=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Jf(e,t),e=e.sibling}var _e=null;function Jf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ie(t),a&4&&(gn(3,t,t.return),hl(3,t),gn(5,t,t.return));break;case 1:le(e,t),ie(t),a&512&&(Qt||n===null||De(n,n.return)),a&64&&Je&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=_e;if(le(e,t),ie(t),a&512&&(Qt||n===null||De(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Ya]||i[Kt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),Wt(i,a,n),i[Kt]=t,Vt(i),a=i;break t;case"link":var u=Jd("link","href",l).get(a+(n.href||""));if(u){for(var s=0;s<u.length;s++)if(i=u[s],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(s,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;case"meta":if(u=Jd("meta","content",l).get(a+(n.content||""))){for(s=0;s<u.length;s++)if(i=u[s],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(s,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;default:throw Error(c(468,a))}i[Kt]=t,Vt(i),a=i}t.stateNode=a}else Id(l,t.type,t.stateNode);else t.stateNode=Kd(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Id(l,t.type,t.stateNode):Kd(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Oc(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ie(t),a&512&&(Qt||n===null||De(n,n.return)),n!==null&&a&4&&Oc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ie(t),a&512&&(Qt||n===null||De(n,n.return)),t.flags&32){l=t.stateNode;try{aa(l,"")}catch(J){xt(t,t.return,J)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,Oc(t,l,n!==null?n.memoizedProps:l)),a&1024&&(Uc=!0);break;case 6:if(le(e,t),ie(t),a&4){if(t.stateNode===null)throw Error(c(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(J){xt(t,t.return,J)}}break;case 3:if(Gi=null,l=_e,_e=qi(e.containerInfo),le(e,t),_e=l,ie(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ka(e.containerInfo)}catch(J){xt(t,t.return,J)}Uc&&(Uc=!1,If(t));break;case 4:a=_e,_e=qi(t.stateNode.containerInfo),le(e,t),ie(t),_e=a;break;case 12:le(e,t),ie(t);break;case 31:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ai(t,a)));break;case 13:le(e,t),ie(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Ni=re()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ai(t,a)));break;case 22:l=t.memoizedState!==null;var g=n!==null&&n.memoizedState!==null,T=Je,N=Qt;if(Je=T||l,Qt=N||g,le(e,t),Qt=N,Je=T,ie(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||g||Je||Qt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){g=n=e;try{if(i=g.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{s=g.stateNode;var M=g.memoizedProps.style,x=M!=null&&M.hasOwnProperty("display")?M.display:null;s.style.display=x==null||typeof x=="boolean"?"":(""+x).trim()}}catch(J){xt(g,g.return,J)}}}else if(e.tag===6){if(n===null){g=e;try{g.stateNode.nodeValue=l?"":g.memoizedProps}catch(J){xt(g,g.return,J)}}}else if(e.tag===18){if(n===null){g=e;try{var A=g.stateNode;l?Ud(A,!0):Ud(g.stateNode,!1)}catch(J){xt(g,g.return,J)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ai(t,n))));break;case 19:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ai(t,a)));break;case 30:break;case 21:break;default:le(e,t),ie(t)}}function ie(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(qf(a)){n=a;break}a=a.return}if(n==null)throw Error(c(160));switch(n.tag){case 27:var l=n.stateNode,i=Hc(t);xi(t,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(aa(u,""),n.flags&=-33);var s=Hc(t);xi(t,s,u);break;case 3:case 4:var g=n.stateNode.containerInfo,T=Hc(t);Bc(t,T,g);break;default:throw Error(c(161))}}catch(N){xt(t,t.return,N)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function If(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;If(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Fe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Qf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:gn(4,e,e.return),Zn(e);break;case 1:De(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Uf(e,e.return,n),Zn(e);break;case 27:El(e.stateNode);case 26:case 5:De(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(l,i,n),hl(4,i);break;case 1:if(We(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(T){xt(a,a.return,T)}if(a=i,l=a.updateQueue,l!==null){var s=a.stateNode;try{var g=l.shared.hiddenCallbacks;if(g!==null)for(l.shared.hiddenCallbacks=null,l=0;l<g.length;l++)xo(g[l],s)}catch(T){xt(a,a.return,T)}}n&&u&64&&Bf(i),ml(i,i.return);break;case 27:Yf(i);case 26:case 5:We(l,i,n),n&&a===null&&u&4&&jf(i),ml(i,i.return);break;case 12:We(l,i,n);break;case 31:We(l,i,n),n&&u&4&&Zf(l,i);break;case 13:We(l,i,n),n&&u&4&&Kf(l,i);break;case 22:i.memoizedState===null&&We(l,i,n),ml(i,i.return);break;case 30:break;default:We(l,i,n)}e=e.sibling}}function jc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&tl(n))}function qc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t))}function Me(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ff(t,e,n,a),e=e.sibling}function Ff(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:Me(t,e,n,a),l&2048&&hl(9,e);break;case 1:Me(t,e,n,a);break;case 3:Me(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t)));break;case 12:if(l&2048){Me(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,s=i.onPostCommit;typeof s=="function"&&s(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(g){xt(e,e.return,g)}}else Me(t,e,n,a);break;case 31:Me(t,e,n,a);break;case 13:Me(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?Me(t,e,n,a):gl(t,e):i._visibility&2?Me(t,e,n,a):(i._visibility|=2,Ea(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&jc(u,e);break;case 24:Me(t,e,n,a),l&2048&&qc(e.alternate,e);break;default:Me(t,e,n,a)}}function Ea(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,s=n,g=a,T=u.flags;switch(u.tag){case 0:case 11:case 15:Ea(i,u,s,g,l),hl(8,u);break;case 23:break;case 22:var N=u.stateNode;u.memoizedState!==null?N._visibility&2?Ea(i,u,s,g,l):gl(i,u):(N._visibility|=2,Ea(i,u,s,g,l)),l&&T&2048&&jc(u.alternate,u);break;case 24:Ea(i,u,s,g,l),l&&T&2048&&qc(u.alternate,u);break;default:Ea(i,u,s,g,l)}e=e.sibling}}function gl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:gl(n,a),l&2048&&jc(a.alternate,a);break;case 24:gl(n,a),l&2048&&qc(a.alternate,a);break;default:gl(n,a)}e=e.sibling}}var pl=8192;function Ta(t,e,n){if(t.subtreeFlags&pl)for(t=t.child;t!==null;)Wf(t,e,n),t=t.sibling}function Wf(t,e,n){switch(t.tag){case 26:Ta(t,e,n),t.flags&pl&&t.memoizedState!==null&&km(n,_e,t.memoizedState,t.memoizedProps);break;case 5:Ta(t,e,n);break;case 3:case 4:var a=_e;_e=qi(t.stateNode.containerInfo),Ta(t,e,n),_e=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=pl,pl=16777216,Ta(t,e,n),pl=a):Ta(t,e,n));break;default:Ta(t,e,n)}}function $f(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function yl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,td(a,t)}$f(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Pf(t),t=t.sibling}function Pf(t){switch(t.tag){case 0:case 11:case 15:yl(t),t.flags&2048&&gn(9,t,t.return);break;case 3:yl(t);break;case 12:yl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ci(t)):yl(t);break;default:yl(t)}}function Ci(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,td(a,t)}$f(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:gn(8,e,e.return),Ci(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ci(e));break;default:Ci(e)}t=t.sibling}}function td(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:gn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:tl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Zt=a;else t:for(n=t;Zt!==null;){a=Zt;var l=a.sibling,i=a.return;if(Xf(a),a===n){Zt=null;break t}if(l!==null){l.return=i,Zt=l;break t}Zt=i}}}var I1={getCacheForType:function(t){var e=It(qt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return It(qt).controller.signal}},F1=typeof WeakMap=="function"?WeakMap:Map,wt=0,Mt=null,ht=null,gt=0,Tt=0,ge=null,pn=!1,xa=!1,Yc=!1,$e=0,Ht=0,yn=0,Kn=0,Gc=0,pe=0,Aa=0,vl=null,ue=null,Qc=!1,Ni=0,ed=0,_i=1/0,Mi=null,vn=null,Xt=0,bn=null,Ca=null,Pe=0,Xc=0,Vc=null,nd=null,bl=0,Zc=null;function ye(){return(wt&2)!==0&&gt!==0?gt&-gt:C.T!==null?$c():ps()}function ad(){if(pe===0)if((gt&536870912)===0||yt){var t=Ul;Ul<<=1,(Ul&3932160)===0&&(Ul=262144),pe=t}else pe=536870912;return t=he.current,t!==null&&(t.flags|=32),pe}function ce(t,e,n){(t===Mt&&(Tt===2||Tt===9)||t.cancelPendingCommit!==null)&&(Na(t,0),Ln(t,gt,pe,!1)),qa(t,n),((wt&2)===0||t!==Mt)&&(t===Mt&&((wt&2)===0&&(Kn|=n),Ht===4&&Ln(t,gt,pe,!1)),ke(t))}function ld(t,e,n){if((wt&6)!==0)throw Error(c(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||ja(t,e),l=a?P1(t,e):Jc(t,e,!0),i=a;do{if(l===0){xa&&!a&&Ln(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!W1(n)){l=Jc(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var s=t;l=vl;var g=s.current.memoizedState.isDehydrated;if(g&&(Na(s,u).flags|=256),u=Jc(s,u,!1),u!==2){if(Yc&&!g){s.errorRecoveryDisabledLanes|=i,Kn|=i,l=4;break t}i=ue,ue=l,i!==null&&(ue===null?ue=i:ue.push.apply(ue,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){Na(t,0),Ln(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(c(345));case 4:if((e&4194048)!==e)break;case 6:Ln(a,e,pe,!pn);break t;case 2:ue=null;break;case 3:case 5:break;default:throw Error(c(329))}if((e&62914560)===e&&(l=Ni+300-re(),10<l)){if(Ln(a,e,pe,!pn),ql(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=Od(id.bind(null,a,n,ue,Mi,Qc,e,pe,Kn,Aa,pn,i,"Throttled",-0,0),l);break t}id(a,n,ue,Mi,Qc,e,pe,Kn,Aa,pn,i,null,-0,0)}}break}while(!0);ke(t)}function id(t,e,n,a,l,i,u,s,g,T,N,M,x,A){if(t.timeoutHandle=-1,M=e.subtreeFlags,M&8192||(M&16785408)===16785408){M={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ue},Wf(e,i,M);var J=(i&62914560)===i?Ni-re():(i&4194048)===i?ed-re():0;if(J=Om(M,J),J!==null){Pe=i,t.cancelPendingCommit=J(hd.bind(null,t,e,i,n,a,l,u,s,g,N,M,null,x,A)),Ln(t,i,u,!T);return}}hd(t,e,i,n,a,l,u,s,g)}function W1(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!fe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ln(t,e,n,a){e&=~Gc,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-oe(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&hs(t,n,e)}function Ri(){return(wt&6)===0?(Ll(0),!1):!0}function Kc(){if(ht!==null){if(Tt===0)var t=ht.return;else t=ht,Ge=Un=null,sc(t),va=null,nl=0,t=ht;for(;t!==null;)Hf(t.alternate,t),t=t.return;ht=null}}function Na(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,ym(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Kc(),Mt=t,ht=n=qe(t.current,null),gt=e,Tt=0,ge=null,pn=!1,xa=ja(t,e),Yc=!1,Aa=pe=Gc=Kn=yn=Ht=0,ue=vl=null,Qc=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-oe(a),i=1<<l;e|=t[l],a&=~i}return $e=e,$l(),n}function ud(t,e){rt=null,C.H=ol,e===ya||e===ui?(e=So(),Tt=3):e===Wu?(e=So(),Tt=4):Tt=e===xc?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,ge=e,ht===null&&(Ht=1,Li(t,Se(e,t.current)))}function cd(){var t=he.current;return t===null?!0:(gt&4194048)===gt?xe===null:(gt&62914560)===gt||(gt&536870912)!==0?t===xe:!1}function rd(){var t=C.H;return C.H=ol,t===null?ol:t}function sd(){var t=C.A;return C.A=I1,t}function zi(){Ht=4,pn||(gt&4194048)!==gt&&he.current!==null||(xa=!0),(yn&134217727)===0&&(Kn&134217727)===0||Mt===null||Ln(Mt,gt,pe,!1)}function Jc(t,e,n){var a=wt;wt|=2;var l=rd(),i=sd();(Mt!==t||gt!==e)&&(Mi=null,Na(t,e)),e=!1;var u=Ht;t:do try{if(Tt!==0&&ht!==null){var s=ht,g=ge;switch(Tt){case 8:Kc(),u=6;break t;case 3:case 2:case 9:case 6:he.current===null&&(e=!0);var T=Tt;if(Tt=0,ge=null,_a(t,s,g,T),n&&xa){u=0;break t}break;default:T=Tt,Tt=0,ge=null,_a(t,s,g,T)}}$1(),u=Ht;break}catch(N){ud(t,N)}while(!0);return e&&t.shellSuspendCounter++,Ge=Un=null,wt=a,C.H=l,C.A=i,ht===null&&(Mt=null,gt=0,$l()),u}function $1(){for(;ht!==null;)od(ht)}function P1(t,e){var n=wt;wt|=2;var a=rd(),l=sd();Mt!==t||gt!==e?(Mi=null,_i=re()+500,Na(t,e)):xa=ja(t,e);t:do try{if(Tt!==0&&ht!==null){e=ht;var i=ge;e:switch(Tt){case 1:Tt=0,ge=null,_a(t,e,i,1);break;case 2:case 9:if(bo(i)){Tt=0,ge=null,fd(e);break}e=function(){Tt!==2&&Tt!==9||Mt!==t||(Tt=7),ke(t)},i.then(e,e);break t;case 3:Tt=7;break t;case 4:Tt=5;break t;case 7:bo(i)?(Tt=0,ge=null,fd(e)):(Tt=0,ge=null,_a(t,e,i,7));break;case 5:var u=null;switch(ht.tag){case 26:u=ht.memoizedState;case 5:case 27:var s=ht;if(u?Fd(u):s.stateNode.complete){Tt=0,ge=null;var g=s.sibling;if(g!==null)ht=g;else{var T=s.return;T!==null?(ht=T,Di(T)):ht=null}break e}}Tt=0,ge=null,_a(t,e,i,5);break;case 6:Tt=0,ge=null,_a(t,e,i,6);break;case 8:Kc(),Ht=6;break t;default:throw Error(c(462))}}tm();break}catch(N){ud(t,N)}while(!0);return Ge=Un=null,C.H=a,C.A=l,wt=n,ht!==null?0:(Mt=null,gt=0,$l(),Ht)}function tm(){for(;ht!==null&&!Eh();)od(ht)}function od(t){var e=kf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?Di(t):ht=e}function fd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Nf(n,e,e.pendingProps,e.type,void 0,gt);break;case 11:e=Nf(n,e,e.pendingProps,e.type.render,e.ref,gt);break;case 5:sc(e);default:Hf(n,e),e=ht=co(e,$e),e=kf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?Di(t):ht=e}function _a(t,e,n,a){Ge=Un=null,sc(e),va=null,nl=0;var l=e.return;try{if(G1(t,l,e,n,gt)){Ht=1,Li(t,Se(n,t.current)),ht=null;return}}catch(i){if(l!==null)throw ht=l,i;Ht=1,Li(t,Se(n,t.current)),ht=null;return}e.flags&32768?(yt||a===1?t=!0:xa||(gt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=he.current,a!==null&&a.tag===13&&(a.flags|=16384))),dd(e,t)):Di(e)}function Di(t){var e=t;do{if((e.flags&32768)!==0){dd(e,pn);return}t=e.return;var n=V1(e.alternate,e,$e);if(n!==null){ht=n;return}if(e=e.sibling,e!==null){ht=e;return}ht=e=t}while(e!==null);Ht===0&&(Ht=5)}function dd(t,e){do{var n=Z1(t.alternate,t);if(n!==null){n.flags&=32767,ht=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){ht=t;return}ht=t=n}while(t!==null);Ht=6,ht=null}function hd(t,e,n,a,l,i,u,s,g){t.cancelPendingCommit=null;do ki();while(Xt!==0);if((wt&6)!==0)throw Error(c(327));if(e!==null){if(e===t.current)throw Error(c(177));if(i=e.lanes|e.childLanes,i|=Hu,Dh(t,n,i,u,s,g),t===Mt&&(ht=Mt=null,gt=0),Ca=e,bn=t,Pe=n,Xc=i,Vc=l,nd=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,lm(Hl,function(){return vd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=C.T,C.T=null,l=V.p,V.p=2,u=wt,wt|=4;try{K1(t,e,n)}finally{wt=u,V.p=l,C.T=a}}Xt=1,md(),gd(),pd()}}function md(){if(Xt===1){Xt=0;var t=bn,e=Ca,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=C.T,C.T=null;var a=V.p;V.p=2;var l=wt;wt|=4;try{Jf(e,t);var i=ur,u=$s(t.containerInfo),s=i.focusedElem,g=i.selectionRange;if(u!==s&&s&&s.ownerDocument&&Ws(s.ownerDocument.documentElement,s)){if(g!==null&&Ru(s)){var T=g.start,N=g.end;if(N===void 0&&(N=T),"selectionStart"in s)s.selectionStart=T,s.selectionEnd=Math.min(N,s.value.length);else{var M=s.ownerDocument||document,x=M&&M.defaultView||window;if(x.getSelection){var A=x.getSelection(),J=s.textContent.length,at=Math.min(g.start,J),_t=g.end===void 0?at:Math.min(g.end,J);!A.extend&&at>_t&&(u=_t,_t=at,at=u);var S=Fs(s,at),y=Fs(s,_t);if(S&&y&&(A.rangeCount!==1||A.anchorNode!==S.node||A.anchorOffset!==S.offset||A.focusNode!==y.node||A.focusOffset!==y.offset)){var E=M.createRange();E.setStart(S.node,S.offset),A.removeAllRanges(),at>_t?(A.addRange(E),A.extend(y.node,y.offset)):(E.setEnd(y.node,y.offset),A.addRange(E))}}}}for(M=[],A=s;A=A.parentNode;)A.nodeType===1&&M.push({element:A,left:A.scrollLeft,top:A.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<M.length;s++){var _=M[s];_.element.scrollLeft=_.left,_.element.scrollTop=_.top}}Zi=!!ir,ur=ir=null}finally{wt=l,V.p=a,C.T=n}}t.current=e,Xt=2}}function gd(){if(Xt===2){Xt=0;var t=bn,e=Ca,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=C.T,C.T=null;var a=V.p;V.p=2;var l=wt;wt|=4;try{Qf(t,e.alternate,e)}finally{wt=l,V.p=a,C.T=n}}Xt=3}}function pd(){if(Xt===4||Xt===3){Xt=0,Th();var t=bn,e=Ca,n=Pe,a=nd;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Xt=5:(Xt=0,Ca=bn=null,yd(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),du(n),e=e.stateNode,se&&typeof se.onCommitFiberRoot=="function")try{se.onCommitFiberRoot(Ua,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=C.T,l=V.p,V.p=2,C.T=null;try{for(var i=t.onRecoverableError,u=0;u<a.length;u++){var s=a[u];i(s.value,{componentStack:s.stack})}}finally{C.T=e,V.p=l}}(Pe&3)!==0&&ki(),ke(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Zc?bl++:(bl=0,Zc=t):bl=0,Ll(0)}}function yd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,tl(e)))}function ki(){return md(),gd(),pd(),vd()}function vd(){if(Xt!==5)return!1;var t=bn,e=Xc;Xc=0;var n=du(Pe),a=C.T,l=V.p;try{V.p=32>n?32:n,C.T=null,n=Vc,Vc=null;var i=bn,u=Pe;if(Xt=0,Ca=bn=null,Pe=0,(wt&6)!==0)throw Error(c(331));var s=wt;if(wt|=4,Pf(i.current),Ff(i,i.current,u,n),wt=s,Ll(0,!1),se&&typeof se.onPostCommitFiberRoot=="function")try{se.onPostCommitFiberRoot(Ua,i)}catch{}return!0}finally{V.p=l,C.T=a,yd(t,e)}}function bd(t,e,n){e=Se(n,e),e=Tc(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(qa(t,2),ke(t))}function xt(t,e,n){if(t.tag===3)bd(t,t,n);else for(;e!==null;){if(e.tag===3){bd(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=Se(n,t),n=Lf(2),a=dn(e,n,2),a!==null&&(Sf(n,a,e,t),qa(a,2),ke(a));break}}e=e.return}}function Ic(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new F1;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Yc=!0,l.add(n),t=em.bind(null,t,e,n),e.then(t,t))}function em(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Mt===t&&(gt&n)===n&&(Ht===4||Ht===3&&(gt&62914560)===gt&&300>re()-Ni?(wt&2)===0&&Na(t,0):Gc|=n,Aa===gt&&(Aa=0)),ke(t)}function Ld(t,e){e===0&&(e=ds()),t=On(t,e),t!==null&&(qa(t,e),ke(t))}function nm(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Ld(t,n)}function am(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(c(314))}a!==null&&a.delete(e),Ld(t,n)}function lm(t,e){return ru(t,e)}var Oi=null,Ma=null,Fc=!1,Hi=!1,Wc=!1,Sn=0;function ke(t){t!==Ma&&t.next===null&&(Ma===null?Oi=Ma=t:Ma=Ma.next=t),Hi=!0,Fc||(Fc=!0,um())}function Ll(t,e){if(!Wc&&Hi){Wc=!0;do for(var n=!1,a=Oi;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,s=a.pingedLanes;i=(1<<31-oe(42|t)+1)-1,i&=l&~(u&~s),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Td(a,i))}else i=gt,i=ql(a,a===Mt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||ja(a,i)||(n=!0,Td(a,i));a=a.next}while(n);Wc=!1}}function im(){Sd()}function Sd(){Hi=Fc=!1;var t=0;Sn!==0&&pm()&&(t=Sn);for(var e=re(),n=null,a=Oi;a!==null;){var l=a.next,i=wd(a,e);i===0?(a.next=null,n===null?Oi=l:n.next=l,l===null&&(Ma=n)):(n=a,(t!==0||(i&3)!==0)&&(Hi=!0)),a=l}Xt!==0&&Xt!==5||Ll(t),Sn!==0&&(Sn=0)}function wd(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-oe(i),s=1<<u,g=l[u];g===-1?((s&n)===0||(s&a)!==0)&&(l[u]=zh(s,e)):g<=e&&(t.expiredLanes|=s),i&=~s}if(e=Mt,n=gt,n=ql(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(Tt===2||Tt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&su(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||ja(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&su(a),du(n)){case 2:case 8:n=os;break;case 32:n=Hl;break;case 268435456:n=fs;break;default:n=Hl}return a=Ed.bind(null,t),n=ru(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&su(a),t.callbackPriority=2,t.callbackNode=null,2}function Ed(t,e){if(Xt!==0&&Xt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(ki()&&t.callbackNode!==n)return null;var a=gt;return a=ql(t,t===Mt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(ld(t,a,e),wd(t,re()),t.callbackNode!=null&&t.callbackNode===n?Ed.bind(null,t):null)}function Td(t,e){if(ki())return null;ld(t,e,!0)}function um(){vm(function(){(wt&6)!==0?ru(ss,im):Sd()})}function $c(){if(Sn===0){var t=ga;t===0&&(t=Bl,Bl<<=1,(Bl&261888)===0&&(Bl=256)),Sn=t}return Sn}function xd(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Xl(""+t)}function Ad(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function cm(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=xd((l[ee]||null).action),u=a.submitter;u&&(e=(e=u[ee]||null)?xd(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var s=new Jl("action","action",null,a,l);t.push({event:s,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Sn!==0){var g=u?Ad(l,u):new FormData(l);vc(n,{pending:!0,data:g,method:l.method,action:i},null,g)}}else typeof i=="function"&&(s.preventDefault(),g=u?Ad(l,u):new FormData(l),vc(n,{pending:!0,data:g,method:l.method,action:i},i,g))},currentTarget:l}]})}}for(var Pc=0;Pc<Ou.length;Pc++){var tr=Ou[Pc],rm=tr.toLowerCase(),sm=tr[0].toUpperCase()+tr.slice(1);Ne(rm,"on"+sm)}Ne(eo,"onAnimationEnd"),Ne(no,"onAnimationIteration"),Ne(ao,"onAnimationStart"),Ne("dblclick","onDoubleClick"),Ne("focusin","onFocus"),Ne("focusout","onBlur"),Ne(x1,"onTransitionRun"),Ne(A1,"onTransitionStart"),Ne(C1,"onTransitionCancel"),Ne(lo,"onTransitionEnd"),ea("onMouseEnter",["mouseout","mouseover"]),ea("onMouseLeave",["mouseout","mouseover"]),ea("onPointerEnter",["pointerout","pointerover"]),ea("onPointerLeave",["pointerout","pointerover"]),Rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Rn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Sl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),om=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Sl));function Cd(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var u=a.length-1;0<=u;u--){var s=a[u],g=s.instance,T=s.currentTarget;if(s=s.listener,g!==i&&l.isPropagationStopped())break t;i=s,l.currentTarget=T;try{i(l)}catch(N){Wl(N)}l.currentTarget=null,i=g}else for(u=0;u<a.length;u++){if(s=a[u],g=s.instance,T=s.currentTarget,s=s.listener,g!==i&&l.isPropagationStopped())break t;i=s,l.currentTarget=T;try{i(l)}catch(N){Wl(N)}l.currentTarget=null,i=g}}}}function mt(t,e){var n=e[hu];n===void 0&&(n=e[hu]=new Set);var a=t+"__bubble";n.has(a)||(Nd(e,t,2,!1),n.add(a))}function er(t,e,n){var a=0;e&&(a|=4),Nd(n,t,a,e)}var Bi="_reactListening"+Math.random().toString(36).slice(2);function nr(t){if(!t[Bi]){t[Bi]=!0,bs.forEach(function(n){n!=="selectionchange"&&(om.has(n)||er(n,!1,t),er(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Bi]||(e[Bi]=!0,er("selectionchange",!1,e))}}function Nd(t,e,n,a){switch(a0(e)){case 2:var l=Um;break;case 8:l=jm;break;default:l=yr}n=l.bind(null,e,n,t),l=void 0,!wu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function ar(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var s=a.stateNode.containerInfo;if(s===l)break;if(u===4)for(u=a.return;u!==null;){var g=u.tag;if((g===3||g===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;s!==null;){if(u=$n(s),u===null)return;if(g=u.tag,g===5||g===6||g===26||g===27){a=i=u;continue t}s=s.parentNode}}a=a.return}Rs(function(){var T=i,N=Lu(n),M=[];t:{var x=io.get(t);if(x!==void 0){var A=Jl,J=t;switch(t){case"keypress":if(Zl(n)===0)break t;case"keydown":case"keyup":A=a1;break;case"focusin":J="focus",A=Au;break;case"focusout":J="blur",A=Au;break;case"beforeblur":case"afterblur":A=Au;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":A=ks;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":A=Vh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":A=u1;break;case eo:case no:case ao:A=Jh;break;case lo:A=r1;break;case"scroll":case"scrollend":A=Qh;break;case"wheel":A=o1;break;case"copy":case"cut":case"paste":A=Fh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":A=Hs;break;case"toggle":case"beforetoggle":A=d1}var at=(e&4)!==0,_t=!at&&(t==="scroll"||t==="scrollend"),S=at?x!==null?x+"Capture":null:x;at=[];for(var y=T,E;y!==null;){var _=y;if(E=_.stateNode,_=_.tag,_!==5&&_!==26&&_!==27||E===null||S===null||(_=Qa(y,S),_!=null&&at.push(wl(y,_,E))),_t)break;y=y.return}0<at.length&&(x=new A(x,J,null,n,N),M.push({event:x,listeners:at}))}}if((e&7)===0){t:{if(x=t==="mouseover"||t==="pointerover",A=t==="mouseout"||t==="pointerout",x&&n!==bu&&(J=n.relatedTarget||n.fromElement)&&($n(J)||J[Wn]))break t;if((A||x)&&(x=N.window===N?N:(x=N.ownerDocument)?x.defaultView||x.parentWindow:window,A?(J=n.relatedTarget||n.toElement,A=T,J=J?$n(J):null,J!==null&&(_t=h(J),at=J.tag,J!==_t||at!==5&&at!==27&&at!==6)&&(J=null)):(A=null,J=T),A!==J)){if(at=ks,_="onMouseLeave",S="onMouseEnter",y="mouse",(t==="pointerout"||t==="pointerover")&&(at=Hs,_="onPointerLeave",S="onPointerEnter",y="pointer"),_t=A==null?x:Ga(A),E=J==null?x:Ga(J),x=new at(_,y+"leave",A,n,N),x.target=_t,x.relatedTarget=E,_=null,$n(N)===T&&(at=new at(S,y+"enter",J,n,N),at.target=E,at.relatedTarget=_t,_=at),_t=_,A&&J)e:{for(at=fm,S=A,y=J,E=0,_=S;_;_=at(_))E++;_=0;for(var tt=y;tt;tt=at(tt))_++;for(;0<E-_;)S=at(S),E--;for(;0<_-E;)y=at(y),_--;for(;E--;){if(S===y||y!==null&&S===y.alternate){at=S;break e}S=at(S),y=at(y)}at=null}else at=null;A!==null&&_d(M,x,A,at,!1),J!==null&&_t!==null&&_d(M,_t,J,at,!0)}}t:{if(x=T?Ga(T):window,A=x.nodeName&&x.nodeName.toLowerCase(),A==="select"||A==="input"&&x.type==="file")var bt=Xs;else if(Gs(x))if(Vs)bt=w1;else{bt=L1;var W=b1}else A=x.nodeName,!A||A.toLowerCase()!=="input"||x.type!=="checkbox"&&x.type!=="radio"?T&&vu(T.elementType)&&(bt=Xs):bt=S1;if(bt&&(bt=bt(t,T))){Qs(M,bt,n,N);break t}W&&W(t,x,T),t==="focusout"&&T&&x.type==="number"&&T.memoizedProps.value!=null&&yu(x,"number",x.value)}switch(W=T?Ga(T):window,t){case"focusin":(Gs(W)||W.contentEditable==="true")&&(ca=W,zu=T,Wa=null);break;case"focusout":Wa=zu=ca=null;break;case"mousedown":Du=!0;break;case"contextmenu":case"mouseup":case"dragend":Du=!1,Ps(M,n,N);break;case"selectionchange":if(T1)break;case"keydown":case"keyup":Ps(M,n,N)}var st;if(Nu)t:{switch(t){case"compositionstart":var pt="onCompositionStart";break t;case"compositionend":pt="onCompositionEnd";break t;case"compositionupdate":pt="onCompositionUpdate";break t}pt=void 0}else ua?qs(t,n)&&(pt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(pt="onCompositionStart");pt&&(Bs&&n.locale!=="ko"&&(ua||pt!=="onCompositionStart"?pt==="onCompositionEnd"&&ua&&(st=zs()):(ln=N,Eu="value"in ln?ln.value:ln.textContent,ua=!0)),W=Ui(T,pt),0<W.length&&(pt=new Os(pt,t,null,n,N),M.push({event:pt,listeners:W}),st?pt.data=st:(st=Ys(n),st!==null&&(pt.data=st)))),(st=m1?g1(t,n):p1(t,n))&&(pt=Ui(T,"onBeforeInput"),0<pt.length&&(W=new Os("onBeforeInput","beforeinput",null,n,N),M.push({event:W,listeners:pt}),W.data=st)),cm(M,t,T,n,N)}Cd(M,e)})}function wl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ui(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Qa(t,n),l!=null&&a.unshift(wl(t,l,i)),l=Qa(t,e),l!=null&&a.push(wl(t,l,i))),t.tag===3)return a;t=t.return}return[]}function fm(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function _d(t,e,n,a,l){for(var i=e._reactName,u=[];n!==null&&n!==a;){var s=n,g=s.alternate,T=s.stateNode;if(s=s.tag,g!==null&&g===a)break;s!==5&&s!==26&&s!==27||T===null||(g=T,l?(T=Qa(n,i),T!=null&&u.unshift(wl(n,T,g))):l||(T=Qa(n,i),T!=null&&u.push(wl(n,T,g)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var dm=/\r\n?/g,hm=/\u0000|\uFFFD/g;function Md(t){return(typeof t=="string"?t:""+t).replace(dm,`
`).replace(hm,"")}function Rd(t,e){return e=Md(e),Md(t)===e}function Nt(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||aa(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&aa(t,""+a);break;case"className":Gl(t,"class",a);break;case"tabIndex":Gl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Gl(t,n,a);break;case"style":_s(t,a,i);break;case"data":if(e!=="object"){Gl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Xl(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&Nt(t,e,"name",l.name,l,null),Nt(t,e,"formEncType",l.formEncType,l,null),Nt(t,e,"formMethod",l.formMethod,l,null),Nt(t,e,"formTarget",l.formTarget,l,null)):(Nt(t,e,"encType",l.encType,l,null),Nt(t,e,"method",l.method,l,null),Nt(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Xl(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=Ue);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Xl(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Yl(t,"popover",a);break;case"xlinkActuate":Be(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Be(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Be(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Be(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Be(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Be(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Be(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Be(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Be(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Yl(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Yh.get(n)||n,Yl(t,n,a))}}function lr(t,e,n,a,l,i){switch(n){case"style":_s(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"children":typeof a=="string"?aa(t,a):(typeof a=="number"||typeof a=="bigint")&&aa(t,""+a);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=Ue);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ls.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[ee]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Yl(t,n,a)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:Nt(t,e,i,u,n,null)}}l&&Nt(t,e,"srcSet",n.srcSet,n,null),a&&Nt(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var s=i=u=l=null,g=null,T=null;for(a in n)if(n.hasOwnProperty(a)){var N=n[a];if(N!=null)switch(a){case"name":l=N;break;case"type":u=N;break;case"checked":g=N;break;case"defaultChecked":T=N;break;case"value":i=N;break;case"defaultValue":s=N;break;case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(c(137,e));break;default:Nt(t,e,a,N,n,null)}}xs(t,i,s,g,T,u,l,!1);return;case"select":mt("invalid",t),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(s=n[l],s!=null))switch(l){case"value":i=s;break;case"defaultValue":u=s;break;case"multiple":a=s;default:Nt(t,e,l,s,n,null)}e=i,n=u,t.multiple=!!a,e!=null?na(t,!!a,e,!1):n!=null&&na(t,!!a,n,!0);return;case"textarea":mt("invalid",t),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(s=n[u],s!=null))switch(u){case"value":a=s;break;case"defaultValue":l=s;break;case"children":i=s;break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(c(91));break;default:Nt(t,e,u,s,n,null)}Cs(t,a,l,i);return;case"option":for(g in n)if(n.hasOwnProperty(g)&&(a=n[g],a!=null))switch(g){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:Nt(t,e,g,a,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(a=0;a<Sl.length;a++)mt(Sl[a],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(T in n)if(n.hasOwnProperty(T)&&(a=n[T],a!=null))switch(T){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:Nt(t,e,T,a,n,null)}return;default:if(vu(e)){for(N in n)n.hasOwnProperty(N)&&(a=n[N],a!==void 0&&lr(t,e,N,a,n,void 0));return}}for(s in n)n.hasOwnProperty(s)&&(a=n[s],a!=null&&Nt(t,e,s,a,n,null))}function mm(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,s=null,g=null,T=null,N=null;for(A in n){var M=n[A];if(n.hasOwnProperty(A)&&M!=null)switch(A){case"checked":break;case"value":break;case"defaultValue":g=M;default:a.hasOwnProperty(A)||Nt(t,e,A,null,a,M)}}for(var x in a){var A=a[x];if(M=n[x],a.hasOwnProperty(x)&&(A!=null||M!=null))switch(x){case"type":i=A;break;case"name":l=A;break;case"checked":T=A;break;case"defaultChecked":N=A;break;case"value":u=A;break;case"defaultValue":s=A;break;case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(c(137,e));break;default:A!==M&&Nt(t,e,x,A,a,M)}}pu(t,u,s,g,T,N,i,l);return;case"select":A=u=s=x=null;for(i in n)if(g=n[i],n.hasOwnProperty(i)&&g!=null)switch(i){case"value":break;case"multiple":A=g;default:a.hasOwnProperty(i)||Nt(t,e,i,null,a,g)}for(l in a)if(i=a[l],g=n[l],a.hasOwnProperty(l)&&(i!=null||g!=null))switch(l){case"value":x=i;break;case"defaultValue":s=i;break;case"multiple":u=i;default:i!==g&&Nt(t,e,l,i,a,g)}e=s,n=u,a=A,x!=null?na(t,!!n,x,!1):!!a!=!!n&&(e!=null?na(t,!!n,e,!0):na(t,!!n,n?[]:"",!1));return;case"textarea":A=x=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null&&!a.hasOwnProperty(s))switch(s){case"value":break;case"children":break;default:Nt(t,e,s,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":x=l;break;case"defaultValue":A=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(c(91));break;default:l!==i&&Nt(t,e,u,l,a,i)}As(t,x,A);return;case"option":for(var J in n)if(x=n[J],n.hasOwnProperty(J)&&x!=null&&!a.hasOwnProperty(J))switch(J){case"selected":t.selected=!1;break;default:Nt(t,e,J,null,a,x)}for(g in a)if(x=a[g],A=n[g],a.hasOwnProperty(g)&&x!==A&&(x!=null||A!=null))switch(g){case"selected":t.selected=x&&typeof x!="function"&&typeof x!="symbol";break;default:Nt(t,e,g,x,a,A)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var at in n)x=n[at],n.hasOwnProperty(at)&&x!=null&&!a.hasOwnProperty(at)&&Nt(t,e,at,null,a,x);for(T in a)if(x=a[T],A=n[T],a.hasOwnProperty(T)&&x!==A&&(x!=null||A!=null))switch(T){case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(c(137,e));break;default:Nt(t,e,T,x,a,A)}return;default:if(vu(e)){for(var _t in n)x=n[_t],n.hasOwnProperty(_t)&&x!==void 0&&!a.hasOwnProperty(_t)&&lr(t,e,_t,void 0,a,x);for(N in a)x=a[N],A=n[N],!a.hasOwnProperty(N)||x===A||x===void 0&&A===void 0||lr(t,e,N,x,a,A);return}}for(var S in n)x=n[S],n.hasOwnProperty(S)&&x!=null&&!a.hasOwnProperty(S)&&Nt(t,e,S,null,a,x);for(M in a)x=a[M],A=n[M],!a.hasOwnProperty(M)||x===A||x==null&&A==null||Nt(t,e,M,x,a,A)}function zd(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function gm(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,s=l.duration;if(i&&s&&zd(u)){for(u=0,s=l.responseEnd,a+=1;a<n.length;a++){var g=n[a],T=g.startTime;if(T>s)break;var N=g.transferSize,M=g.initiatorType;N&&zd(M)&&(g=g.responseEnd,u+=N*(g<s?1:(s-T)/(g-T)))}if(--a,e+=8*(i+u)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var ir=null,ur=null;function ji(t){return t.nodeType===9?t:t.ownerDocument}function Dd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function kd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function cr(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var rr=null;function pm(){var t=window.event;return t&&t.type==="popstate"?t===rr?!1:(rr=t,!0):(rr=null,!1)}var Od=typeof setTimeout=="function"?setTimeout:void 0,ym=typeof clearTimeout=="function"?clearTimeout:void 0,Hd=typeof Promise=="function"?Promise:void 0,vm=typeof queueMicrotask=="function"?queueMicrotask:typeof Hd<"u"?function(t){return Hd.resolve(null).then(t).catch(bm)}:Od;function bm(t){setTimeout(function(){throw t})}function wn(t){return t==="head"}function Bd(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),ka(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")El(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,El(n);for(var i=n.firstChild;i;){var u=i.nextSibling,s=i.nodeName;i[Ya]||s==="SCRIPT"||s==="STYLE"||s==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&El(t.ownerDocument.body);n=l}while(n);ka(e)}function Ud(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function sr(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":sr(n),mu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function Lm(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[Ya])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ae(t.nextSibling),t===null)break}return null}function Sm(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ae(t.nextSibling),t===null))return null;return t}function jd(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ae(t.nextSibling),t===null))return null;return t}function or(t){return t.data==="$?"||t.data==="$~"}function fr(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function wm(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ae(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var dr=null;function qd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ae(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Yd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Gd(t,e,n){switch(e=ji(n),t){case"html":if(t=e.documentElement,!t)throw Error(c(452));return t;case"head":if(t=e.head,!t)throw Error(c(453));return t;case"body":if(t=e.body,!t)throw Error(c(454));return t;default:throw Error(c(451))}}function El(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);mu(t)}var Ce=new Map,Qd=new Set;function qi(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=V.d;V.d={f:Em,r:Tm,D:xm,C:Am,L:Cm,m:Nm,X:Mm,S:_m,M:Rm};function Em(){var t=tn.f(),e=Ri();return t||e}function Tm(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?uf(e):tn.r(t)}var Ra=typeof document>"u"?null:document;function Xd(t,e,n){var a=Ra;if(a&&typeof e=="string"&&e){var l=be(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),Qd.has(l)||(Qd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),Wt(e,"link",t),Vt(e),a.head.appendChild(e)))}}function xm(t){tn.D(t),Xd("dns-prefetch",t,null)}function Am(t,e){tn.C(t,e),Xd("preconnect",t,e)}function Cm(t,e,n){tn.L(t,e,n);var a=Ra;if(a&&t&&e){var l='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+be(n.imageSizes)+'"]')):l+='[href="'+be(t)+'"]';var i=l;switch(e){case"style":i=za(t);break;case"script":i=Da(t)}Ce.has(i)||(t=R({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ce.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(Tl(i))||e==="script"&&a.querySelector(xl(i))||(e=a.createElement("link"),Wt(e,"link",t),Vt(e),a.head.appendChild(e)))}}function Nm(t,e){tn.m(t,e);var n=Ra;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Da(t)}if(!Ce.has(i)&&(t=R({rel:"modulepreload",href:t},e),Ce.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(xl(i)))return}a=n.createElement("link"),Wt(a,"link",t),Vt(a),n.head.appendChild(a)}}}function _m(t,e,n){tn.S(t,e,n);var a=Ra;if(a&&t){var l=ta(a).hoistableStyles,i=za(t);e=e||"default";var u=l.get(i);if(!u){var s={loading:0,preload:null};if(u=a.querySelector(Tl(i)))s.loading=5;else{t=R({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ce.get(i))&&hr(t,n);var g=u=a.createElement("link");Vt(g),Wt(g,"link",t),g._p=new Promise(function(T,N){g.onload=T,g.onerror=N}),g.addEventListener("load",function(){s.loading|=1}),g.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Yi(u,e,a)}u={type:"stylesheet",instance:u,count:1,state:s},l.set(i,u)}}}function Mm(t,e){tn.X(t,e);var n=Ra;if(n&&t){var a=ta(n).hoistableScripts,l=Da(t),i=a.get(l);i||(i=n.querySelector(xl(l)),i||(t=R({src:t,async:!0},e),(e=Ce.get(l))&&mr(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Rm(t,e){tn.M(t,e);var n=Ra;if(n&&t){var a=ta(n).hoistableScripts,l=Da(t),i=a.get(l);i||(i=n.querySelector(xl(l)),i||(t=R({src:t,async:!0,type:"module"},e),(e=Ce.get(l))&&mr(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Vd(t,e,n,a){var l=(l=ft.current)?qi(l):null;if(!l)throw Error(c(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=za(n.href),n=ta(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=za(n.href);var i=ta(l).hoistableStyles,u=i.get(t);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=l.querySelector(Tl(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ce.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ce.set(t,n),i||zm(l,t,n,u.state))),e&&a===null)throw Error(c(528,""));return u}if(e&&a!==null)throw Error(c(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Da(n),n=ta(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,t))}}function za(t){return'href="'+be(t)+'"'}function Tl(t){return'link[rel="stylesheet"]['+t+"]"}function Zd(t){return R({},t,{"data-precedence":t.precedence,precedence:null})}function zm(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Wt(e,"link",n),Vt(e),t.head.appendChild(e))}function Da(t){return'[src="'+be(t)+'"]'}function xl(t){return"script[async]"+t}function Kd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Vt(a),a;var l=R({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Vt(a),Wt(a,"style",l),Yi(a,n.precedence,t),e.instance=a;case"stylesheet":l=za(n.href);var i=t.querySelector(Tl(l));if(i)return e.state.loading|=4,e.instance=i,Vt(i),i;a=Zd(n),(l=Ce.get(l))&&hr(a,l),i=(t.ownerDocument||t).createElement("link"),Vt(i);var u=i;return u._p=new Promise(function(s,g){u.onload=s,u.onerror=g}),Wt(i,"link",a),e.state.loading|=4,Yi(i,n.precedence,t),e.instance=i;case"script":return i=Da(n.src),(l=t.querySelector(xl(i)))?(e.instance=l,Vt(l),l):(a=n,(l=Ce.get(i))&&(a=R({},n),mr(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Vt(l),Wt(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(c(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Yi(a,n.precedence,t));return e.instance}function Yi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var s=a[u];if(s.dataset.precedence===e)i=s;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function hr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function mr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Gi=null;function Jd(t,e,n){if(Gi===null){var a=new Map,l=Gi=new Map;l.set(n,a)}else l=Gi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[Ya]||i[Kt]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var s=a.get(u);s?s.push(i):a.set(u,[i])}}return a}function Id(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function Dm(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Fd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function km(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=za(a.href),i=e.querySelector(Tl(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Qi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Vt(i);return}i=e.ownerDocument||e,a=Zd(a),(l=Ce.get(l))&&hr(a,l),i=i.createElement("link"),Vt(i);var u=i;u._p=new Promise(function(s,g){u.onload=s,u.onerror=g}),Wt(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Qi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var gr=0;function Om(t,e){return t.stylesheets&&t.count===0&&Vi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&gr===0&&(gr=62500*gm());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>gr?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Qi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Vi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Xi=null;function Vi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Xi=new Map,e.forEach(Hm,t),Xi=null,Qi.call(t))}function Hm(t,e){if(!(e.state.loading&4)){var n=Xi.get(t);if(n)var a=n.get(null);else{n=new Map,Xi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=e.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=Qi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var Al={$$typeof:U,Provider:null,Consumer:null,_currentValue:nt,_currentValue2:nt,_threadCount:0};function Bm(t,e,n,a,l,i,u,s,g){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ou(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ou(0),this.hiddenUpdates=ou(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=g,this.incompleteTransitions=new Map}function Wd(t,e,n,a,l,i,u,s,g,T,N,M){return t=new Bm(t,e,n,u,g,T,N,M,s),e=1,i===!0&&(e|=24),i=de(3,null,null,e),t.current=i,i.stateNode=t,e=Ju(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},$u(i),t}function $d(t){return t?(t=oa,t):oa}function Pd(t,e,n,a,l,i){l=$d(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(ce(n,t,e),ll(n,t,e))}function t0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function pr(t,e){t0(t,e),(t=t.alternate)&&t0(t,e)}function e0(t){if(t.tag===13||t.tag===31){var e=On(t,67108864);e!==null&&ce(e,t,67108864),pr(t,67108864)}}function n0(t){if(t.tag===13||t.tag===31){var e=ye();e=fu(e);var n=On(t,e);n!==null&&ce(n,t,e),pr(t,e)}}var Zi=!0;function Um(t,e,n,a){var l=C.T;C.T=null;var i=V.p;try{V.p=2,yr(t,e,n,a)}finally{V.p=i,C.T=l}}function jm(t,e,n,a){var l=C.T;C.T=null;var i=V.p;try{V.p=8,yr(t,e,n,a)}finally{V.p=i,C.T=l}}function yr(t,e,n,a){if(Zi){var l=vr(a);if(l===null)ar(t,e,a,Ki,n),l0(t,a);else if(Ym(l,t,e,n,a))a.stopPropagation();else if(l0(t,a),e&4&&-1<qm.indexOf(t)){for(;l!==null;){var i=Pn(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Mn(i.pendingLanes);if(u!==0){var s=i;for(s.pendingLanes|=2,s.entangledLanes|=2;u;){var g=1<<31-oe(u);s.entanglements[1]|=g,u&=~g}ke(i),(wt&6)===0&&(_i=re()+500,Ll(0))}}break;case 31:case 13:s=On(i,2),s!==null&&ce(s,i,2),Ri(),pr(i,2)}if(i=vr(a),i===null&&ar(t,e,a,Ki,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else ar(t,e,a,null,n)}}function vr(t){return t=Lu(t),br(t)}var Ki=null;function br(t){if(Ki=null,t=$n(t),t!==null){var e=h(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=v(e),t!==null)return t;t=null}else if(n===31){if(t=w(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ki=t,null}function a0(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(xh()){case ss:return 2;case os:return 8;case Hl:case Ah:return 32;case fs:return 268435456;default:return 32}default:return 32}}var Lr=!1,En=null,Tn=null,xn=null,Cl=new Map,Nl=new Map,An=[],qm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function l0(t,e){switch(t){case"focusin":case"focusout":En=null;break;case"dragenter":case"dragleave":Tn=null;break;case"mouseover":case"mouseout":xn=null;break;case"pointerover":case"pointerout":Cl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Nl.delete(e.pointerId)}}function _l(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=Pn(e),e!==null&&e0(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function Ym(t,e,n,a,l){switch(e){case"focusin":return En=_l(En,t,e,n,a,l),!0;case"dragenter":return Tn=_l(Tn,t,e,n,a,l),!0;case"mouseover":return xn=_l(xn,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return Cl.set(i,_l(Cl.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Nl.set(i,_l(Nl.get(i)||null,t,e,n,a,l)),!0}return!1}function i0(t){var e=$n(t.target);if(e!==null){var n=h(e);if(n!==null){if(e=n.tag,e===13){if(e=v(n),e!==null){t.blockedOn=e,ys(t.priority,function(){n0(n)});return}}else if(e===31){if(e=w(n),e!==null){t.blockedOn=e,ys(t.priority,function(){n0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ji(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=vr(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);bu=a,n.target.dispatchEvent(a),bu=null}else return e=Pn(n),e!==null&&e0(e),t.blockedOn=n,!1;e.shift()}return!0}function u0(t,e,n){Ji(t)&&n.delete(e)}function Gm(){Lr=!1,En!==null&&Ji(En)&&(En=null),Tn!==null&&Ji(Tn)&&(Tn=null),xn!==null&&Ji(xn)&&(xn=null),Cl.forEach(u0),Nl.forEach(u0)}function Ii(t,e){t.blockedOn===e&&(t.blockedOn=null,Lr||(Lr=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Gm)))}var Fi=null;function c0(t){Fi!==t&&(Fi=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Fi===t&&(Fi=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(br(a||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,vc(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function ka(t){function e(g){return Ii(g,t)}En!==null&&Ii(En,t),Tn!==null&&Ii(Tn,t),xn!==null&&Ii(xn,t),Cl.forEach(e),Nl.forEach(e);for(var n=0;n<An.length;n++){var a=An[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<An.length&&(n=An[0],n.blockedOn===null);)i0(n),n.blockedOn===null&&An.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[ee]||null;if(typeof i=="function")u||c0(n);else if(u){var s=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[ee]||null)s=u.formAction;else if(br(l)!==null)continue}else s=u.action;typeof s=="function"?n[a+1]=s:(n.splice(a,3),a-=3),c0(n)}}}function r0(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function Sr(t){this._internalRoot=t}Wi.prototype.render=Sr.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(c(409));var n=e.current,a=ye();Pd(n,a,t,e,null,null)},Wi.prototype.unmount=Sr.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Pd(t.current,2,null,t,null,null),Ri(),e[Wn]=null}};function Wi(t){this._internalRoot=t}Wi.prototype.unstable_scheduleHydration=function(t){if(t){var e=ps();t={blockedOn:null,target:t,priority:e};for(var n=0;n<An.length&&e!==0&&e<An[n].priority;n++);An.splice(n,0,t),n===0&&i0(t)}};var s0=f.version;if(s0!=="19.2.6")throw Error(c(527,s0,"19.2.6"));V.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(c(188)):(t=Object.keys(t).join(","),Error(c(268,t)));return t=b(e),t=t!==null?D(t):null,t=t===null?null:t.stateNode,t};var Qm={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:C,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $i=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$i.isDisabled&&$i.supportsFiber)try{Ua=$i.inject(Qm),se=$i}catch{}}return Rl.createRoot=function(t,e){if(!o(t))throw Error(c(299));var n=!1,a="",l=pf,i=yf,u=vf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=Wd(t,1,!1,null,null,n,a,null,l,i,u,r0),t[Wn]=e.current,nr(t),new Sr(e)},Rl.hydrateRoot=function(t,e,n){if(!o(t))throw Error(c(299));var a=!1,l="",i=pf,u=yf,s=vf,g=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(s=n.onRecoverableError),n.formState!==void 0&&(g=n.formState)),e=Wd(t,1,!0,e,n??null,a,l,g,i,u,s,r0),e.context=$d(null),n=e.current,a=ye(),a=fu(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,qa(e,n),ke(e),t[Wn]=e.current,nr(t),new Wi(e)},Rl.version="19.2.6",Rl}var b0;function tg(){if(b0)return Tr.exports;b0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),Tr.exports=Pm(),Tr.exports}var eg=tg();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ng=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),rh=(...r)=>r.filter((f,d,c)=>!!f&&f.trim()!==""&&c.indexOf(f)===d).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ag={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lg=vt.forwardRef(({color:r="currentColor",size:f=24,strokeWidth:d=2,absoluteStrokeWidth:c,className:o="",children:h,iconNode:v,...w},m)=>vt.createElement("svg",{ref:m,...ag,width:f,height:f,stroke:r,strokeWidth:c?Number(d)*24/Number(f):d,className:rh("lucide",o),...w},[...v.map(([b,D])=>vt.createElement(b,D)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=(r,f)=>{const d=vt.forwardRef(({className:c,...o},h)=>vt.createElement(lg,{ref:h,iconNode:f,className:rh(`lucide-${ng(r)}`,c),...o}));return d.displayName=`${r}`,d};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sh=$t("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const au=$t("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oh=$t("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ig=$t("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fh=$t("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ug=$t("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cg=$t("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rg=$t("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sg=$t("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const og=$t("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L0=$t("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fg=$t("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dg=$t("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hg=$t("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=$t("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gg=$t("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=$t("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function nu({group:r,size:f="md",dim:d}){const c=f==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return p.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${r.bgClass} ${r.textClass} ${c} ${d?"opacity-40":""}`,children:r.label})}const Oa=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],S0=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function dh(r){if(r.length===0)return"";const f=[...r].sort((D,R)=>D.date.localeCompare(R.date)),d=f[0].date,c=f[f.length-1].date,[o,h,v]=d.split("-").map(Number),[w,m,b]=c.split("-").map(Number);return d===c?`${Oa[h-1]} ${v}, ${o}`:o===w&&h===m?`${Oa[h-1]} ${v}–${b}, ${o}`:o===w?`${Oa[h-1]} ${v} – ${Oa[m-1]} ${b}, ${o}`:`${Oa[h-1]} ${v}, ${o} – ${Oa[m-1]} ${b}, ${w}`}function pg(r){if(r.length===0)return"";const f=[...r].sort((B,Y)=>B.date.localeCompare(Y.date)),d=f[0].date,c=f[f.length-1].date,[o,h,v]=d.split("-").map(Number),[w,m,b]=c.split("-").map(Number),D=S0[new Date(o,h-1,v).getDay()],R=dh(r);if(d===c)return`${R} (${D})`;const k=S0[new Date(w,m-1,b).getDay()];return`${R} (${D}–${k})`}function w0(r){return r.subtitle??dh(r.days)}function en(r){const[f,d]=r.split(":").map(Number);return f*60+d}const yg=30;function vg(r,f){let d=-1;for(let w=0;w<r.length&&en(r[w])<=f;w++)d=w;if(d===-1)return{index:-1,progress:0};const c=en(r[d]),o=r[d+1]?en(r[d+1]):null,h=o!==null?o:c+yg;if(f>=h)return{index:-1,progress:0};const v=h===c?0:(f-c)/(h-c);return{index:d,progress:Math.max(0,Math.min(1,v))}}function hh(r){const[f,d]=r.split(":").map(Number);return`${f%12||12}:${d.toString().padStart(2,"0")}`}function mh(r){const[f]=r.split(":").map(Number);return f>=12?"PM":"AM"}function ls(){const r=new Date;return r.getHours()*60+r.getMinutes()}function kl(){const r=new Date,f=r.getFullYear(),d=String(r.getMonth()+1).padStart(2,"0"),c=String(r.getDate()).padStart(2,"0");return`${f}-${d}-${c}`}function bg(){const r=new Date,f=r.getHours(),d=r.getMinutes(),c=f%12||12,o=f>=12?"PM":"AM";return`${c}:${d.toString().padStart(2,"0")} ${o}`}function Lg(r){if(r<=0)return"";if(r<60)return`${r} min`;const f=Math.floor(r/60),d=r%60;return d===0?`${f}h`:`${f}h ${d}m`}function Sg(r){const f=new Date(r);if(isNaN(f.getTime()))return r;const d=f.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),c=f.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${d}, ${c}`}function E0(r,f){return r.flatMap(d=>{const c=f.find(o=>o.id===d);return c?[c]:[]})}function wg({activity:r,runGroups:f,past:d}){const c=E0(r.onTrack,f),o=E0(r.inClass??[],f);return p.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${d?"opacity-60":""}`,children:p.jsxs("div",{className:"flex gap-4",children:[p.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[hh(r.time),p.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:mh(r.time)})]}),p.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[c.length>0&&p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),p.jsx("div",{className:"flex flex-wrap gap-1.5",children:c.map(h=>p.jsx(nu,{group:h},h.id))})]}),o.length>0&&p.jsxs(p.Fragment,{children:[c.length>0&&p.jsx("div",{className:"border-t border-gray-100"}),p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),p.jsx("div",{className:"flex flex-wrap gap-1.5",children:o.map(h=>p.jsx(nu,{group:h},h.id))})]})]}),r.note&&p.jsx("p",{className:"text-xs italic text-gray-500",children:r.note})]})]})})}function Eg({activity:r,past:f}){const d=r.type==="lunch"||r.type==="special";return p.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${d?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${f?"opacity-60":""}`,children:p.jsxs("div",{className:"flex items-center gap-4",children:[p.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[hh(r.time),p.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:mh(r.time)})]}),d&&p.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:r.type==="lunch"?p.jsx(gg,{size:16}):p.jsx(fg,{size:16})}),p.jsxs("div",{children:[p.jsx("p",{className:"text-sm font-medium text-gray-900",children:r.label}),r.subtitle&&p.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:r.subtitle})]})]})})}const Pr=vt.forwardRef(({activities:r},f)=>{const[,d]=vt.useState(0);vt.useEffect(()=>{const m=setInterval(()=>d(b=>b+1),3e4);return()=>clearInterval(m)},[]);const c=ls(),h=r.filter(m=>"time"in m).find(m=>en(m.time)>c),v=h?en(h.time)-c:null,w=v!==null?v<=5?"text-red-500":v<=10?"text-orange-500":"text-gray-400":"text-gray-400";return p.jsxs("div",{ref:f,"data-time-indicator":!0,className:"relative my-6",children:[p.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[p.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),p.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),p.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:bg()}),v!==null&&p.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${w}`,children:["Next activity starts in ",p.jsx("span",{className:"font-semibold",children:Lg(v)})]})]})});Pr.displayName="TimeIndicator";function T0({collapsed:r,children:f}){return p.jsx("div",{"data-collapsed":r,"aria-hidden":r,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:r?"0fr":"1fr",opacity:r?0:1,marginBottom:r?0:"0.5rem"},children:p.jsx("div",{className:"overflow-hidden",children:f})})}function Tg({activities:r,runGroups:f,isToday:d,selectedGroups:c,hidePast:o}){const h=vt.useRef(null),[,v]=vt.useState(0);vt.useEffect(()=>{if(!d)return;const O=setInterval(()=>v(U=>U+1),6e4);return()=>clearInterval(O)},[d]),vt.useEffect(()=>{if(!d)return;const O=setTimeout(()=>{var U;(U=h.current)==null||U.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(O)},[d]);const w=ls(),m=r.flatMap(O=>{if(O.type!=="session")return[O];if(c.length===0)return[O];const U=O.onTrack.filter(ot=>c.includes(ot)),Z=(O.inClass??[]).filter(ot=>c.includes(ot));return U.length===0&&Z.length===0?[]:[{...O,onTrack:U,inClass:Z}]}),b=m.map(O=>O.type!=="break"&&o&&d&&en(O.time)<w);m.forEach((O,U)=>{if(O.type!=="break")return;const Z=m.slice(0,U).some((ot,Q)=>ot.type!=="break"&&!b[Q]);b[U]=!Z});const D=[],R=[];m.forEach((O,U)=>{O.type!=="break"&&(D.push(U),R.push(O.time))});const{index:k}=d?vg(R,w):{index:-1},B=k===-1?-1:D[k],Y=d?m.findIndex(O=>O.type!=="break"&&en(O.time)>w):-1,K=d&&Y===-1&&m.length>0,ct=m.length>0&&b.every(Boolean);let H;return p.jsxs("div",{className:"flex flex-col pb-10",children:[m.length>0&&p.jsx(T0,{collapsed:!ct,children:p.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[p.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),p.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),m.map((O,U)=>{const Z=U===B,ot=d&&O.type!=="break"&&!Z&&en(O.time)<w;let Q=null;!b[U]&&O.type==="session"&&O.sessionNumber!==void 0&&O.sessionNumber!==H&&(H=O.sessionNumber,Q=p.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",O.sessionNumber]}));const q=O.type==="break"?p.jsxs("div",{className:"flex items-center gap-2 py-1",children:[p.jsx("div",{className:"h-px flex-1 bg-gray-200"}),p.jsx("span",{className:"text-xs text-gray-400 italic",children:O.label}),p.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):O.type==="session"?p.jsx(wg,{activity:O,runGroups:f,past:ot}):p.jsx(Eg,{activity:O,past:ot});return p.jsxs(T0,{collapsed:b[U],children:[U===Y&&p.jsx(Pr,{ref:h,activities:m}),Q,q]},U)}),K&&p.jsx(Pr,{ref:h,activities:m})]})}function xg({groups:r,selected:f,onChange:d}){const[c,o]=vt.useState(!1),h=m=>d(f.includes(m)?f.filter(b=>b!==m):[...f,m]),v=f.length===0||f.length===r.length,w=r.filter(m=>f.includes(m.id));return p.jsxs("div",{className:"relative",children:[p.jsxs("button",{onClick:()=>o(m=>!m),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[v?p.jsx("span",{className:"text-gray-700",children:"All run groups"}):p.jsx("div",{className:"flex items-center gap-1",children:w.map(m=>p.jsx(nu,{group:m,size:"sm"},m.id))}),p.jsx(oh,{size:14,className:"text-gray-400"})]}),c&&p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>o(!1)}),p.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[r.map(m=>p.jsxs("button",{onClick:()=>h(m.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[p.jsx(nu,{group:m,size:"md"}),f.includes(m.id)&&p.jsx(au,{size:14,className:"text-blue-500"})]},m.id)),p.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:p.jsx("button",{onClick:()=>{d([]),o(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:v?"All selected":"Clear filter"})})]})]})]})}const Ag={w:1536,h:1117},Cg={w:1728,h:796},x0="M119.0 788.5 L107.0 784.5 L101.0 787.5 L95.0 785.5 L89.0 788.5 L85.0 786.5 L73.0 788.5 L63.0 785.5 L59.0 787.5 L41.5 787.0 L42.0 772.5 L48.0 774.5 L52.0 772.5 L57.0 774.5 L61.0 772.5 L68.0 774.5 L72.0 772.5 L87.0 772.5 L93.0 775.5 L103.5 766.0 L95.0 757.5 L77.0 748.5 L65.5 730.0 L60.5 659.0 L57.5 649.0 L55.5 597.0 L51.5 575.0 L50.5 526.0 L53.5 510.0 L69.5 464.0 L70.5 408.0 L73.5 387.0 L79.5 374.0 L88.0 364.5 L106.0 353.5 L143.0 340.5 L162.0 330.5 L202.0 289.5 L225.0 271.5 L240.0 265.5 L265.0 260.5 L306.0 260.5 L327.0 266.5 L353.0 280.5 L373.0 287.5 L418.0 290.5 L436.0 299.5 L451.5 316.0 L463.5 339.0 L468.5 359.0 L466.5 453.0 L463.5 483.0 L466.5 545.0 L471.5 563.0 L478.5 577.0 L498.0 598.5 L517.0 610.5 L556.0 626.5 L571.0 635.5 L591.0 652.5 L600.0 656.5 L616.0 651.5 L650.0 624.5 L674.0 612.5 L690.0 612.5 L700.0 617.5 L710.5 631.0 L713.5 643.0 L723.0 652.5 L745.0 653.5 L764.0 649.5 L777.0 643.5 L793.5 629.0 L872.5 512.0 L873.5 508.0 L854.5 492.0 L855.5 489.0 L875.0 499.5 L879.0 498.5 L887.5 490.0 L983.5 343.0 L1000.5 321.0 L1022.0 300.5 L1048.0 281.5 L1076.0 268.5 L1090.0 265.5 L1098.5 257.0 L1090.0 248.5 L1075.5 249.0 L1076.0 233.5 L1093.0 233.5 L1097.0 235.5 L1106.0 233.5 L1112.0 236.5 L1119.0 233.5 L1131.0 235.5 L1135.0 233.5 L1150.0 233.5 L1154.0 235.5 L1170.0 233.5 L1175.5 238.0 L1175.5 245.0 L1173.0 248.5 L1145.0 248.5 L1136.5 257.0 L1145.0 265.5 L1162.0 270.5 L1184.0 284.5 L1204.5 307.0 L1246.5 375.0 L1255.0 383.5 L1265.5 382.0 L1259.5 388.0 L1260.5 396.0 L1363.5 559.0 L1379.5 586.0 L1384.5 602.0 L1384.5 631.0 L1381.5 642.0 L1351.5 702.0 L1333.5 728.0 L1324.0 737.5 L1308.0 746.5 L1297.0 749.5 L1288.5 758.0 L1297.0 766.5 L1302.0 764.5 L1325.0 764.5 L1329.0 766.5 L1334.0 764.5 L1339.0 766.5 L1343.0 764.5 L1356.0 764.5 L1362.0 767.5 L1369.0 764.5 L1369.5 770.0 L1377.5 778.0 L1376.0 780.5 L1343.0 780.5 L1339.0 778.5 L1334.0 780.5 L1327.0 776.5 L1320.0 780.5 L1313.0 777.5 L1307.0 780.5 L1296.0 777.5 L1290.0 780.5 L1282.0 778.5 L1267.0 780.5 L1267.5 762.0 L1259.0 753.5 L1204.0 753.5 L1239.0 752.5 L1246.0 745.5 L1254.0 752.5 L1258.0 748.5 L1265.0 752.5 L1271.0 746.5 L1278.0 752.5 L1306.0 745.5 L1321.0 736.5 L1340.5 715.0 L1377.5 644.0 L1383.5 618.0 L1380.5 596.0 L1377.5 588.0 L1367.0 578.5 L1357.5 587.0 L1366.5 608.0 L1365.5 614.0 L1367.5 619.0 L1364.5 631.0 L1332.5 696.0 L1325.5 707.0 L1310.0 723.5 L1295.0 731.5 L1276.0 734.5 L1270.0 740.5 L1265.0 735.5 L1259.0 739.5 L1254.0 735.5 L1247.0 742.5 L1239.0 735.5 L1189.0 735.5 L1178.0 732.5 L1168.0 726.5 L1160.5 718.0 L1156.5 708.0 L1155.5 699.0 L1160.5 685.0 L1177.0 670.5 L1227.0 639.5 L1245.5 622.0 L1257.5 603.0 L1260.5 590.0 L1256.5 586.0 L1260.5 580.0 L1252.0 571.5 L1243.5 580.0 L1247.5 586.0 L1233.5 610.0 L1219.0 623.5 L1177.0 650.5 L1174.5 650.0 L1214.0 624.5 L1224.5 613.0 L1214.0 603.5 L1171.0 604.5 L1164.0 601.5 L1158.0 604.5 L1144.0 604.5 L1140.0 602.5 L1136.0 604.5 L1125.0 602.5 L1121.0 604.5 L1091.0 603.5 L1087.0 605.5 L1063.5 604.0 L1064.0 589.5 L1126.0 589.5 L1130.0 591.5 L1134.0 589.5 L1157.0 589.5 L1163.0 592.5 L1171.0 589.5 L1227.0 589.5 L1233.0 592.5 L1241.5 584.0 L1237.5 568.0 L1137.5 415.0 L1126.0 403.5 L1120.0 400.5 L1110.0 397.5 L1095.0 397.5 L1070.0 406.5 L1043.5 431.0 L862.5 714.0 L841.0 740.5 L822.0 752.5 L813.5 761.0 L824.0 770.5 L830.0 768.5 L840.0 770.5 L846.0 768.5 L860.0 768.5 L864.0 770.5 L868.0 768.5 L898.0 768.5 L893.0 784.5 L888.0 782.5 L883.0 784.5 L868.0 784.5 L864.0 782.5 L848.0 784.5 L842.0 781.5 L835.0 784.5 L825.0 781.5 L818.0 784.5 L813.0 782.5 L807.0 784.5 L796.0 782.5 L791.0 784.5 L790.5 769.0 L782.0 760.5 L767.0 763.5 L664.0 769.5 L648.0 768.5 L610.0 771.5 L546.0 770.5 L519.0 764.5 L503.0 757.5 L481.0 742.5 L460.0 734.5 L434.0 735.5 L414.0 742.5 L386.0 757.5 L365.0 764.5 L322.0 764.5 L303.0 758.5 L289.5 747.0 L279.5 730.0 L272.5 706.0 L272.5 681.0 L282.5 646.0 L273.5 636.0 L274.5 622.0 L272.5 615.0 L275.5 595.0 L273.5 588.0 L273.5 564.0 L275.5 560.0 L273.5 555.0 L275.5 541.0 L272.5 535.0 L274.5 528.0 L273.5 502.0 L280.0 500.5 L288.5 494.0 L288.5 521.0 L286.5 526.0 L289.5 534.0 L286.5 541.0 L288.5 546.0 L288.5 555.0 L285.5 561.0 L288.5 568.0 L286.5 574.0 L297.0 587.5 L306.5 577.0 L313.5 554.0 L323.5 532.0 L336.0 517.5 L354.0 504.5 L368.5 487.0 L379.5 460.0 L380.5 442.0 L372.5 416.0 L356.5 389.0 L341.0 375.5 L330.0 370.5 L318.0 369.5 L303.0 374.5 L286.0 384.5 L266.5 402.0 L261.5 411.0 L257.5 427.0 L261.5 480.0 L255.5 503.0 L248.5 515.0 L226.5 542.0 L222.5 551.0 L220.5 566.0 L212.5 586.0 L174.5 633.0 L168.5 656.0 L164.5 710.0 L160.5 729.0 L151.0 743.5 L135.0 754.5 L124.0 756.5 L115.5 765.0 L124.0 773.5 L130.5 774.0 L130.5 787.0 L119.0 788.5 Z",Ng="M406.2 794.5 L433.9 764.9 L437.8 763.4 L439.0 759.3 L448.7 751.7 L449.9 747.6 L460.3 739.3 L461.5 735.2 L466.1 733.1 L467.3 729.0 L474.4 724.1 L476.9 718.7 L485.9 709.0 L489.9 707.6 L497.5 696.6 L501.4 695.2 L503.3 690.4 L510.0 693.5 L522.7 693.1 L532.4 666.1 L542.6 652.4 L543.6 663.0 L555.0 662.6 L559.5 657.8 L575.2 650.6 L575.5 638.6 L571.2 632.1 L558.6 632.5 L579.2 611.8 L592.9 604.0 L610.7 597.4 L625.9 594.8 L694.4 589.8 L705.8 591.4 L718.7 596.9 L741.4 618.1 L757.0 626.3 L775.7 625.0 L798.6 614.2 L854.3 529.5 L862.1 521.3 L896.2 468.1 L912.8 446.2 L927.2 421.0 L969.8 361.5 L978.0 345.9 L1005.2 305.6 L1023.9 288.3 L1038.3 278.5 L1083.6 258.9 L1115.5 257.1 L1131.7 261.9 L1148.7 271.3 L1161.7 282.2 L1345.0 585.8 L1358.3 584.7 L1373.6 565.5 L1379.5 563.3 L1382.0 557.8 L1387.2 555.0 L1389.0 548.9 L1396.2 544.0 L1403.2 533.8 L1407.1 532.3 L1419.3 519.2 L1423.1 512.4 L1429.7 509.5 L1432.1 504.1 L1439.0 508.5 L1445.7 509.6 L1430.9 526.1 L1427.0 527.6 L1425.8 531.7 L1409.1 549.6 L1405.1 551.0 L1403.9 555.1 L1360.8 601.3 L1351.6 602.9 L1349.9 631.0 L1345.1 647.1 L1307.5 715.1 L1307.9 727.8 L1321.9 725.9 L1329.5 715.0 L1339.8 724.7 L1330.1 732.3 L1328.3 738.4 L1319.8 743.4 L1318.0 749.4 L1311.5 753.6 L1302.5 764.6 L1298.6 766.1 L1297.4 770.1 L1282.6 786.0 L1278.7 787.5 L1274.3 794.9 L1268.8 791.8 L1260.8 792.1 L1259.4 790.1 L1280.6 767.4 L1284.6 765.9 L1287.1 760.5 L1293.6 757.6 L1293.2 746.3 L1280.6 746.7 L1269.5 753.1 L1256.9 756.9 L1158.5 763.6 L1143.1 760.8 L1125.4 752.1 L1111.6 739.3 L1105.3 728.2 L1098.5 705.7 L1101.9 689.6 L1113.2 667.9 L1200.0 614.9 L1208.1 599.2 L1207.5 582.6 L1199.6 564.9 L1192.2 563.1 L1191.8 552.5 L1156.4 493.7 L1122.9 431.5 L1115.3 423.1 L1107.4 405.4 L1097.8 397.7 L1084.9 393.5 L1073.6 393.9 L1062.5 399.0 L1047.7 416.1 L893.7 644.8 L840.6 728.0 L825.2 744.6 L813.4 753.0 L791.2 764.4 L762.7 768.7 L666.7 770.1 L620.1 773.0 L593.4 771.3 L565.7 760.9 L551.4 751.4 L529.9 728.8 L523.0 703.1 L511.7 703.5 L499.5 716.6 L493.6 718.8 L491.8 724.8 L484.6 729.8 L481.5 735.9 L474.3 740.8 L473.2 744.8 L450.0 769.6 L446.1 771.1 L444.9 775.1 L421.7 799.9 L415.6 796.2 L406.3 796.5 L406.2 794.5 Z",_g="M390.3 671.8 L365.0 679.9 L348.1 679.0 L340.6 675.7 L329.5 665.4 L317.7 649.5 L312.9 636.9 L309.2 602.0 L306.5 500.9 L309.8 480.8 L329.2 443.8 L332.9 428.6 L333.9 404.3 L332.7 391.7 L325.1 371.4 L306.3 346.6 L281.0 325.7 L257.5 316.2 L244.5 314.5 L230.4 315.5 L220.3 319.3 L210.7 326.6 L193.3 344.0 L178.5 366.2 L173.6 377.2 L170.9 389.1 L172.3 410.2 L180.3 433.3 L184.1 437.7 L191.9 454.3 L197.1 474.1 L195.1 487.9 L184.5 519.4 L183.7 530.6 L184.2 543.4 L186.8 556.2 L186.1 569.5 L170.6 613.1 L168.2 627.7 L168.7 640.6 L171.7 650.3 L173.0 663.6 L185.7 700.9 L185.7 706.6 L189.6 718.9 L188.6 725.8 L183.8 735.3 L175.9 743.3 L156.5 751.3 L148.3 750.8 L133.5 744.1 L130.2 746.8 L126.4 755.1 L129.2 759.5 L119.5 748.3 L110.7 727.0 L107.1 723.2 L97.4 699.4 L93.8 695.7 L84.3 672.4 L69.0 643.4 L66.1 633.7 L62.5 629.9 L37.5 567.6 L34.6 546.3 L35.2 530.8 L34.3 516.7 L32.1 511.0 L32.5 504.3 L12.9 452.3 L10.0 433.1 L11.3 424.3 L11.8 430.3 L19.2 433.6 L24.4 433.8 L36.1 411.3 L71.6 380.5 L82.3 368.5 L93.4 349.8 L113.3 304.6 L120.9 292.3 L131.5 281.8 L151.2 270.8 L187.6 257.7 L198.3 257.3 L228.9 261.7 L246.9 261.4 L260.8 259.8 L287.5 249.8 L298.8 249.1 L309.9 252.5 L321.1 259.2 L336.7 273.6 L342.2 282.4 L349.6 285.7 L354.4 283.2 L357.8 275.8 L344.4 256.5 L346.3 255.8 L362.4 263.1 L373.9 270.4 L386.8 281.5 L422.9 321.5 L441.1 371.8 L446.0 375.1 L444.5 380.7 L452.6 402.3 L454.9 404.3 L454.4 408.8 L468.9 445.4 L468.6 454.2 L472.4 464.3 L472.9 475.1 L470.9 485.2 L472.6 489.7 L471.2 493.8 L473.3 508.9 L467.9 534.9 L443.2 589.5 L440.9 590.0 L440.2 582.3 L431.9 578.6 L427.8 579.4 L424.5 586.8 L426.0 598.5 L425.5 618.3 L422.8 632.3 L419.5 639.8 L407.5 658.0 L397.4 667.7 L390.3 671.8 Z",Mg="M893.0 753.5 L863.0 750.5 L687.0 698.5 L175.0 544.5 L145.0 534.5 L126.0 523.5 L107.5 506.0 L90.5 477.0 L85.5 451.0 L85.5 422.0 L90.5 403.0 L97.5 389.0 L135.5 335.0 L158.5 294.0 L158.5 282.0 L154.5 265.0 L120.5 173.0 L120.5 125.0 L130.5 104.0 L138.0 96.5 L162.0 84.5 L182.0 81.5 L212.0 81.5 L257.0 85.5 L300.0 92.5 L323.0 100.5 L353.0 119.5 L369.5 136.0 L380.5 153.0 L389.5 173.0 L393.5 192.0 L398.5 203.0 L410.5 295.0 L426.5 345.0 L443.5 371.0 L460.0 387.5 L480.0 400.5 L510.0 412.5 L554.0 420.5 L729.0 444.5 L733.0 443.5 L758.0 448.5 L790.0 449.5 L801.0 452.5 L825.0 450.5 L842.0 445.5 L851.0 439.5 L859.5 428.0 L862.5 414.0 L860.5 399.0 L851.5 373.0 L799.5 284.0 L776.0 263.5 L757.0 256.5 L710.0 248.5 L692.0 250.5 L667.0 246.5 L650.0 247.5 L605.0 243.5 L584.0 239.5 L560.0 229.5 L541.5 206.0 L534.5 184.0 L529.5 157.0 L530.5 125.0 L540.5 104.0 L548.0 96.5 L571.0 86.5 L617.0 85.5 L931.0 113.5 L939.0 116.5 L952.0 127.5 L963.0 132.5 L974.5 147.0 L980.5 173.0 L984.5 230.0 L989.0 233.5 L1016.0 235.5 L1027.0 238.5 L1045.0 233.5 L1062.0 234.5 L1073.0 231.5 L1086.0 234.5 L1095.0 230.5 L1122.0 227.5 L1137.0 228.5 L1154.0 225.5 L1216.0 221.5 L1234.0 222.5 L1246.0 219.5 L1277.0 217.5 L1558.0 205.5 L1566.0 203.5 L1621.0 204.5 L1634.0 210.5 L1657.5 229.0 L1668.5 249.0 L1671.5 259.0 L1672.5 266.0 L1669.5 279.0 L1663.5 289.0 L1651.5 299.0 L1641.0 312.5 L1621.0 322.5 L1412.0 324.5 L1243.0 324.5 L1211.0 322.5 L1200.0 325.5 L1167.0 322.5 L1156.0 325.5 L1131.0 325.5 L1115.0 332.5 L1099.5 346.0 L1090.5 363.0 L1087.5 374.0 L1090.5 402.0 L1099.5 419.0 L1117.0 432.5 L1132.0 437.5 L1249.0 439.5 L1269.0 446.5 L1286.5 462.0 L1298.5 484.0 L1308.5 529.0 L1308.5 545.0 L1311.5 556.0 L1306.5 582.0 L1296.0 594.5 L1281.0 603.5 L1252.0 609.5 L1158.0 603.5 L1126.0 603.5 L1118.0 601.5 L1086.0 601.5 L1078.0 599.5 L1037.0 599.5 L1001.0 605.5 L990.5 612.0 L982.5 624.0 L970.5 665.0 L964.5 676.0 L957.5 698.0 L940.5 729.0 L918.0 747.5 L893.0 753.5 Z",gh="#d1d5db",ts="currentColor",Rg=.055;function A0({trackId:r,size:f=28,className:d="",title:c}){const o=c??(r?`${r} track`:"Track");return r==="msrc-3-1"?p.jsx(Nr,{config:"full",size:f,className:d,label:o}):r==="msrc-1-7"?p.jsx(Nr,{config:"oneSeven",size:f,className:d,label:o}):r==="msrc-1-3"?p.jsx(Nr,{config:"oneThree",size:f,className:d,label:o}):r==="ecr"?p.jsx(ph,{size:f,className:d,label:o,viewBox:Cg,paths:[{d:Mg,stroke:ts,closed:!0}]}):p.jsx(zg,{size:f,className:d,label:o})}function Nr({config:r,size:f,className:d,label:c}){const o=r==="full"?[{d:x0,stroke:ts,closed:!0}]:[{d:x0,stroke:gh,closed:!0},{d:r==="oneSeven"?Ng:_g,stroke:ts,closed:!0}];return p.jsx(ph,{size:f,className:d,label:c,viewBox:Ag,paths:o})}function ph({size:r,className:f,label:d,viewBox:c,paths:o}){const h=Math.max(c.w,c.h)*Rg;return p.jsx("svg",{viewBox:`0 0 ${c.w} ${c.h}`,width:r,height:r,className:f,preserveAspectRatio:"xMidYMid meet",role:"img","aria-label":d,children:o.map(({d:v,stroke:w},m)=>p.jsx("path",{d:v,fill:"none",stroke:w,strokeWidth:h,strokeLinejoin:"round",strokeLinecap:"round"},m))})}function zg({size:r,className:f,label:d}){return p.jsx("svg",{viewBox:"0 0 48 32",width:r,height:r,preserveAspectRatio:"xMidYMid meet",className:f,fill:"none",stroke:gh,strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round",strokeDasharray:"3 3",role:"img","aria-label":d,children:p.jsx("path",{d:"M 8 16 C 8 6 22 4 28 10 C 34 16 40 12 40 20 C 40 28 26 30 20 24 C 14 18 8 26 8 16 Z"})})}function C0(r){const f=kl();return r.days.some(d=>d.date===f)}function N0(){return p.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[p.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function Dg({events:r,active:f,onChange:d,onOpenDetails:c}){const[o,h]=vt.useState(!1);return p.jsxs("div",{className:"relative min-w-0 pl-1",children:[p.jsxs("button",{onClick:()=>h(v=>!v),className:"flex items-center gap-2 text-left group min-w-0",children:[p.jsx(A0,{trackId:f.trackId,size:26,className:"shrink-0 text-gray-700",title:`${f.name} track`}),p.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:f.name}),C0(f)&&p.jsx(N0,{}),p.jsx(oh,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),p.jsxs("div",{className:"flex items-center gap-0.5",children:[p.jsx("p",{className:"text-sm text-gray-500",children:w0(f)}),p.jsx("button",{onClick:c,"aria-label":"Event details",className:"inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900",children:p.jsx(rg,{size:14})})]}),o&&p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>h(!1)}),p.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[240px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:r.map(v=>p.jsxs("button",{onClick:()=>{d(v),h(!1)},className:"flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50 text-left",children:[p.jsx(A0,{trackId:v.trackId,size:24,className:"shrink-0 text-gray-700",title:`${v.name} track`}),p.jsxs("div",{className:"min-w-0 flex-1",children:[p.jsxs("div",{className:"flex items-center gap-1.5",children:[p.jsx("span",{className:"text-sm font-semibold text-gray-900",children:v.name}),C0(v)&&p.jsx(N0,{})]}),p.jsx("div",{className:"text-xs text-gray-400",children:w0(v)})]}),v.id===f.id&&p.jsx(au,{size:14,className:"text-blue-500 ml-1 shrink-0"})]},v.id))})]})]})}function kg({checked:r,onChange:f,label:d}){return p.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[d&&p.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:d}),p.jsx("button",{type:"button",role:"switch","aria-checked":r,onClick:f,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:r?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:p.jsx("span",{style:{position:"absolute",top:"2px",left:r?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Jn=72,Og=110;function Hg({children:r}){const[f,d]=vt.useState(0),[c,o]=vt.useState("idle"),h=vt.useRef(null),v=vt.useRef(0);vt.useEffect(()=>{const D=B=>{window.scrollY===0&&(h.current=B.touches[0].clientY)},R=B=>{if(h.current===null)return;const Y=B.touches[0].clientY-h.current;if(Y<=0){h.current=null;return}B.preventDefault();const K=Y<Jn?Y:Jn+(Y-Jn)*.25;v.current=Math.min(K,Og),d(v.current),o("pulling")},k=()=>{h.current!==null&&(h.current=null,v.current>=Jn?(o("refreshing"),d(Jn*.75),setTimeout(()=>window.location.reload(),600)):(o("releasing"),d(0),v.current=0,setTimeout(()=>o("idle"),250)))};return document.addEventListener("touchstart",D,{passive:!0}),document.addEventListener("touchmove",R,{passive:!1}),document.addEventListener("touchend",k),document.addEventListener("touchcancel",k),()=>{document.removeEventListener("touchstart",D),document.removeEventListener("touchmove",R),document.removeEventListener("touchend",k),document.removeEventListener("touchcancel",k)}},[]);const w=c==="releasing"||c==="refreshing",m=Math.min(f/Jn,1),b=f>=Jn;return p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${f}px)`,transition:w?"transform 0.25s ease":"none"},children:p.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${b?"text-blue-500":"text-gray-400"}`,children:p.jsx(dg,{size:16,className:c==="refreshing"?"animate-spin":"",style:c!=="refreshing"?{transform:`rotate(${m*270}deg)`}:void 0})})}),p.jsx("div",{style:{transform:`translateY(${f}px)`,transition:w?"transform 0.25s ease":"none"},children:r})]})}function Bg({groups:r}){const f=r.filter(d=>d.description);return f.length===0?null:p.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[p.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),p.jsx("ul",{className:"flex flex-col gap-1.5",children:f.map(d=>p.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[p.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${d.bgClass}`,"aria-hidden":"true"}),p.jsx("span",{className:"font-medium text-gray-900",children:d.label}),p.jsx("span",{className:"text-gray-400",children:"·"}),p.jsx("span",{children:d.description})]},d.id))})]})}const _0=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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
`;function Ug(){const[r,f]=vt.useState(!1);vt.useEffect(()=>{window.scrollTo(0,0)},[]);async function d(){await navigator.clipboard.writeText(_0),f(!0),setTimeout(()=>f(!1),2e3)}return p.jsx("div",{className:"min-h-screen bg-gray-50",children:p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),p.jsxs("div",{className:"flex items-center gap-2",children:[p.jsxs("button",{onClick:d,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[r?p.jsx(au,{size:16,className:"text-green-600"}):p.jsx(fh,{size:16}),r?"Copied":"Copy"]}),p.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:p.jsx(as,{size:18})})]})]}),p.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",p.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),p.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:p.jsx("code",{children:_0})})]})})}var Ha={},_r,M0;function jg(){return M0||(M0=1,_r=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),_r}var Mr={},Nn={},R0;function In(){if(R0)return Nn;R0=1;let r;const f=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return Nn.getSymbolSize=function(c){if(!c)throw new Error('"version" cannot be null or undefined');if(c<1||c>40)throw new Error('"version" should be in range from 1 to 40');return c*4+17},Nn.getSymbolTotalCodewords=function(c){return f[c]},Nn.getBCHDigit=function(d){let c=0;for(;d!==0;)c++,d>>>=1;return c},Nn.setToSJISFunction=function(c){if(typeof c!="function")throw new Error('"toSJISFunc" is not a valid function.');r=c},Nn.isKanjiModeEnabled=function(){return typeof r<"u"},Nn.toSJIS=function(c){return r(c)},Nn}var Rr={},z0;function is(){return z0||(z0=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function f(d){if(typeof d!="string")throw new Error("Param is not a string");switch(d.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+d)}}r.isValid=function(c){return c&&typeof c.bit<"u"&&c.bit>=0&&c.bit<4},r.from=function(c,o){if(r.isValid(c))return c;try{return f(c)}catch{return o}}})(Rr)),Rr}var zr,D0;function qg(){if(D0)return zr;D0=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(f){const d=Math.floor(f/8);return(this.buffer[d]>>>7-f%8&1)===1},put:function(f,d){for(let c=0;c<d;c++)this.putBit((f>>>d-c-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(f){const d=Math.floor(this.length/8);this.buffer.length<=d&&this.buffer.push(0),f&&(this.buffer[d]|=128>>>this.length%8),this.length++}},zr=r,zr}var Dr,k0;function Yg(){if(k0)return Dr;k0=1;function r(f){if(!f||f<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=f,this.data=new Uint8Array(f*f),this.reservedBit=new Uint8Array(f*f)}return r.prototype.set=function(f,d,c,o){const h=f*this.size+d;this.data[h]=c,o&&(this.reservedBit[h]=!0)},r.prototype.get=function(f,d){return this.data[f*this.size+d]},r.prototype.xor=function(f,d,c){this.data[f*this.size+d]^=c},r.prototype.isReserved=function(f,d){return this.reservedBit[f*this.size+d]},Dr=r,Dr}var kr={},O0;function Gg(){return O0||(O0=1,(function(r){const f=In().getSymbolSize;r.getRowColCoords=function(c){if(c===1)return[];const o=Math.floor(c/7)+2,h=f(c),v=h===145?26:Math.ceil((h-13)/(2*o-2))*2,w=[h-7];for(let m=1;m<o-1;m++)w[m]=w[m-1]-v;return w.push(6),w.reverse()},r.getPositions=function(c){const o=[],h=r.getRowColCoords(c),v=h.length;for(let w=0;w<v;w++)for(let m=0;m<v;m++)w===0&&m===0||w===0&&m===v-1||w===v-1&&m===0||o.push([h[w],h[m]]);return o}})(kr)),kr}var Or={},H0;function Qg(){if(H0)return Or;H0=1;const r=In().getSymbolSize,f=7;return Or.getPositions=function(c){const o=r(c);return[[0,0],[o-f,0],[0,o-f]]},Or}var Hr={},B0;function Xg(){return B0||(B0=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const f={N1:3,N2:3,N3:40,N4:10};r.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},r.from=function(o){return r.isValid(o)?parseInt(o,10):void 0},r.getPenaltyN1=function(o){const h=o.size;let v=0,w=0,m=0,b=null,D=null;for(let R=0;R<h;R++){w=m=0,b=D=null;for(let k=0;k<h;k++){let B=o.get(R,k);B===b?w++:(w>=5&&(v+=f.N1+(w-5)),b=B,w=1),B=o.get(k,R),B===D?m++:(m>=5&&(v+=f.N1+(m-5)),D=B,m=1)}w>=5&&(v+=f.N1+(w-5)),m>=5&&(v+=f.N1+(m-5))}return v},r.getPenaltyN2=function(o){const h=o.size;let v=0;for(let w=0;w<h-1;w++)for(let m=0;m<h-1;m++){const b=o.get(w,m)+o.get(w,m+1)+o.get(w+1,m)+o.get(w+1,m+1);(b===4||b===0)&&v++}return v*f.N2},r.getPenaltyN3=function(o){const h=o.size;let v=0,w=0,m=0;for(let b=0;b<h;b++){w=m=0;for(let D=0;D<h;D++)w=w<<1&2047|o.get(b,D),D>=10&&(w===1488||w===93)&&v++,m=m<<1&2047|o.get(D,b),D>=10&&(m===1488||m===93)&&v++}return v*f.N3},r.getPenaltyN4=function(o){let h=0;const v=o.data.length;for(let m=0;m<v;m++)h+=o.data[m];return Math.abs(Math.ceil(h*100/v/5)-10)*f.N4};function d(c,o,h){switch(c){case r.Patterns.PATTERN000:return(o+h)%2===0;case r.Patterns.PATTERN001:return o%2===0;case r.Patterns.PATTERN010:return h%3===0;case r.Patterns.PATTERN011:return(o+h)%3===0;case r.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(h/3))%2===0;case r.Patterns.PATTERN101:return o*h%2+o*h%3===0;case r.Patterns.PATTERN110:return(o*h%2+o*h%3)%2===0;case r.Patterns.PATTERN111:return(o*h%3+(o+h)%2)%2===0;default:throw new Error("bad maskPattern:"+c)}}r.applyMask=function(o,h){const v=h.size;for(let w=0;w<v;w++)for(let m=0;m<v;m++)h.isReserved(m,w)||h.xor(m,w,d(o,m,w))},r.getBestMask=function(o,h){const v=Object.keys(r.Patterns).length;let w=0,m=1/0;for(let b=0;b<v;b++){h(b),r.applyMask(b,o);const D=r.getPenaltyN1(o)+r.getPenaltyN2(o)+r.getPenaltyN3(o)+r.getPenaltyN4(o);r.applyMask(b,o),D<m&&(m=D,w=b)}return w}})(Hr)),Hr}var Pi={},U0;function yh(){if(U0)return Pi;U0=1;const r=is(),f=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],d=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Pi.getBlocksCount=function(o,h){switch(h){case r.L:return f[(o-1)*4+0];case r.M:return f[(o-1)*4+1];case r.Q:return f[(o-1)*4+2];case r.H:return f[(o-1)*4+3];default:return}},Pi.getTotalCodewordsCount=function(o,h){switch(h){case r.L:return d[(o-1)*4+0];case r.M:return d[(o-1)*4+1];case r.Q:return d[(o-1)*4+2];case r.H:return d[(o-1)*4+3];default:return}},Pi}var Br={},zl={},j0;function Vg(){if(j0)return zl;j0=1;const r=new Uint8Array(512),f=new Uint8Array(256);return(function(){let c=1;for(let o=0;o<255;o++)r[o]=c,f[c]=o,c<<=1,c&256&&(c^=285);for(let o=255;o<512;o++)r[o]=r[o-255]})(),zl.log=function(c){if(c<1)throw new Error("log("+c+")");return f[c]},zl.exp=function(c){return r[c]},zl.mul=function(c,o){return c===0||o===0?0:r[f[c]+f[o]]},zl}var q0;function Zg(){return q0||(q0=1,(function(r){const f=Vg();r.mul=function(c,o){const h=new Uint8Array(c.length+o.length-1);for(let v=0;v<c.length;v++)for(let w=0;w<o.length;w++)h[v+w]^=f.mul(c[v],o[w]);return h},r.mod=function(c,o){let h=new Uint8Array(c);for(;h.length-o.length>=0;){const v=h[0];for(let m=0;m<o.length;m++)h[m]^=f.mul(o[m],v);let w=0;for(;w<h.length&&h[w]===0;)w++;h=h.slice(w)}return h},r.generateECPolynomial=function(c){let o=new Uint8Array([1]);for(let h=0;h<c;h++)o=r.mul(o,new Uint8Array([1,f.exp(h)]));return o}})(Br)),Br}var Ur,Y0;function Kg(){if(Y0)return Ur;Y0=1;const r=Zg();function f(d){this.genPoly=void 0,this.degree=d,this.degree&&this.initialize(this.degree)}return f.prototype.initialize=function(c){this.degree=c,this.genPoly=r.generateECPolynomial(this.degree)},f.prototype.encode=function(c){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(c.length+this.degree);o.set(c);const h=r.mod(o,this.genPoly),v=this.degree-h.length;if(v>0){const w=new Uint8Array(this.degree);return w.set(h,v),w}return h},Ur=f,Ur}var jr={},qr={},Yr={},G0;function vh(){return G0||(G0=1,Yr.isValid=function(f){return!isNaN(f)&&f>=1&&f<=40}),Yr}var Oe={},Q0;function bh(){if(Q0)return Oe;Q0=1;const r="[0-9]+",f="[A-Z $%*+\\-./:]+";let d="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";d=d.replace(/u/g,"\\u");const c="(?:(?![A-Z0-9 $%*+\\-./:]|"+d+`)(?:.|[\r
]))+`;Oe.KANJI=new RegExp(d,"g"),Oe.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Oe.BYTE=new RegExp(c,"g"),Oe.NUMERIC=new RegExp(r,"g"),Oe.ALPHANUMERIC=new RegExp(f,"g");const o=new RegExp("^"+d+"$"),h=new RegExp("^"+r+"$"),v=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Oe.testKanji=function(m){return o.test(m)},Oe.testNumeric=function(m){return h.test(m)},Oe.testAlphanumeric=function(m){return v.test(m)},Oe}var X0;function Fn(){return X0||(X0=1,(function(r){const f=vh(),d=bh();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(h,v){if(!h.ccBits)throw new Error("Invalid mode: "+h);if(!f.isValid(v))throw new Error("Invalid version: "+v);return v>=1&&v<10?h.ccBits[0]:v<27?h.ccBits[1]:h.ccBits[2]},r.getBestModeForData=function(h){return d.testNumeric(h)?r.NUMERIC:d.testAlphanumeric(h)?r.ALPHANUMERIC:d.testKanji(h)?r.KANJI:r.BYTE},r.toString=function(h){if(h&&h.id)return h.id;throw new Error("Invalid mode")},r.isValid=function(h){return h&&h.bit&&h.ccBits};function c(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+o)}}r.from=function(h,v){if(r.isValid(h))return h;try{return c(h)}catch{return v}}})(qr)),qr}var V0;function Jg(){return V0||(V0=1,(function(r){const f=In(),d=yh(),c=is(),o=Fn(),h=vh(),v=7973,w=f.getBCHDigit(v);function m(k,B,Y){for(let K=1;K<=40;K++)if(B<=r.getCapacity(K,Y,k))return K}function b(k,B){return o.getCharCountIndicator(k,B)+4}function D(k,B){let Y=0;return k.forEach(function(K){const ct=b(K.mode,B);Y+=ct+K.getBitsLength()}),Y}function R(k,B){for(let Y=1;Y<=40;Y++)if(D(k,Y)<=r.getCapacity(Y,B,o.MIXED))return Y}r.from=function(B,Y){return h.isValid(B)?parseInt(B,10):Y},r.getCapacity=function(B,Y,K){if(!h.isValid(B))throw new Error("Invalid QR Code version");typeof K>"u"&&(K=o.BYTE);const ct=f.getSymbolTotalCodewords(B),H=d.getTotalCodewordsCount(B,Y),O=(ct-H)*8;if(K===o.MIXED)return O;const U=O-b(K,B);switch(K){case o.NUMERIC:return Math.floor(U/10*3);case o.ALPHANUMERIC:return Math.floor(U/11*2);case o.KANJI:return Math.floor(U/13);case o.BYTE:default:return Math.floor(U/8)}},r.getBestVersionForData=function(B,Y){let K;const ct=c.from(Y,c.M);if(Array.isArray(B)){if(B.length>1)return R(B,ct);if(B.length===0)return 1;K=B[0]}else K=B;return m(K.mode,K.getLength(),ct)},r.getEncodedBits=function(B){if(!h.isValid(B)||B<7)throw new Error("Invalid QR Code version");let Y=B<<12;for(;f.getBCHDigit(Y)-w>=0;)Y^=v<<f.getBCHDigit(Y)-w;return B<<12|Y}})(jr)),jr}var Gr={},Z0;function Ig(){if(Z0)return Gr;Z0=1;const r=In(),f=1335,d=21522,c=r.getBCHDigit(f);return Gr.getEncodedBits=function(h,v){const w=h.bit<<3|v;let m=w<<10;for(;r.getBCHDigit(m)-c>=0;)m^=f<<r.getBCHDigit(m)-c;return(w<<10|m)^d},Gr}var Qr={},Xr,K0;function Fg(){if(K0)return Xr;K0=1;const r=Fn();function f(d){this.mode=r.NUMERIC,this.data=d.toString()}return f.getBitsLength=function(c){return 10*Math.floor(c/3)+(c%3?c%3*3+1:0)},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(c){let o,h,v;for(o=0;o+3<=this.data.length;o+=3)h=this.data.substr(o,3),v=parseInt(h,10),c.put(v,10);const w=this.data.length-o;w>0&&(h=this.data.substr(o),v=parseInt(h,10),c.put(v,w*3+1))},Xr=f,Xr}var Vr,J0;function Wg(){if(J0)return Vr;J0=1;const r=Fn(),f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function d(c){this.mode=r.ALPHANUMERIC,this.data=c}return d.getBitsLength=function(o){return 11*Math.floor(o/2)+6*(o%2)},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(o){let h;for(h=0;h+2<=this.data.length;h+=2){let v=f.indexOf(this.data[h])*45;v+=f.indexOf(this.data[h+1]),o.put(v,11)}this.data.length%2&&o.put(f.indexOf(this.data[h]),6)},Vr=d,Vr}var Zr,I0;function $g(){if(I0)return Zr;I0=1;const r=Fn();function f(d){this.mode=r.BYTE,typeof d=="string"?this.data=new TextEncoder().encode(d):this.data=new Uint8Array(d)}return f.getBitsLength=function(c){return c*8},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(d){for(let c=0,o=this.data.length;c<o;c++)d.put(this.data[c],8)},Zr=f,Zr}var Kr,F0;function Pg(){if(F0)return Kr;F0=1;const r=Fn(),f=In();function d(c){this.mode=r.KANJI,this.data=c}return d.getBitsLength=function(o){return o*13},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(c){let o;for(o=0;o<this.data.length;o++){let h=f.toSJIS(this.data[o]);if(h>=33088&&h<=40956)h-=33088;else if(h>=57408&&h<=60351)h-=49472;else throw new Error("Invalid SJIS character: "+this.data[o]+`
Make sure your charset is UTF-8`);h=(h>>>8&255)*192+(h&255),c.put(h,13)}},Kr=d,Kr}var Jr={exports:{}},W0;function t2(){return W0||(W0=1,(function(r){var f={single_source_shortest_paths:function(d,c,o){var h={},v={};v[c]=0;var w=f.PriorityQueue.make();w.push(c,0);for(var m,b,D,R,k,B,Y,K,ct;!w.empty();){m=w.pop(),b=m.value,R=m.cost,k=d[b]||{};for(D in k)k.hasOwnProperty(D)&&(B=k[D],Y=R+B,K=v[D],ct=typeof v[D]>"u",(ct||K>Y)&&(v[D]=Y,w.push(D,Y),h[D]=b))}if(typeof o<"u"&&typeof v[o]>"u"){var H=["Could not find a path from ",c," to ",o,"."].join("");throw new Error(H)}return h},extract_shortest_path_from_predecessor_list:function(d,c){for(var o=[],h=c;h;)o.push(h),d[h],h=d[h];return o.reverse(),o},find_path:function(d,c,o){var h=f.single_source_shortest_paths(d,c,o);return f.extract_shortest_path_from_predecessor_list(h,o)},PriorityQueue:{make:function(d){var c=f.PriorityQueue,o={},h;d=d||{};for(h in c)c.hasOwnProperty(h)&&(o[h]=c[h]);return o.queue=[],o.sorter=d.sorter||c.default_sorter,o},default_sorter:function(d,c){return d.cost-c.cost},push:function(d,c){var o={value:d,cost:c};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=f})(Jr)),Jr.exports}var $0;function e2(){return $0||($0=1,(function(r){const f=Fn(),d=Fg(),c=Wg(),o=$g(),h=Pg(),v=bh(),w=In(),m=t2();function b(H){return unescape(encodeURIComponent(H)).length}function D(H,O,U){const Z=[];let ot;for(;(ot=H.exec(U))!==null;)Z.push({data:ot[0],index:ot.index,mode:O,length:ot[0].length});return Z}function R(H){const O=D(v.NUMERIC,f.NUMERIC,H),U=D(v.ALPHANUMERIC,f.ALPHANUMERIC,H);let Z,ot;return w.isKanjiModeEnabled()?(Z=D(v.BYTE,f.BYTE,H),ot=D(v.KANJI,f.KANJI,H)):(Z=D(v.BYTE_KANJI,f.BYTE,H),ot=[]),O.concat(U,Z,ot).sort(function(q,j){return q.index-j.index}).map(function(q){return{data:q.data,mode:q.mode,length:q.length}})}function k(H,O){switch(O){case f.NUMERIC:return d.getBitsLength(H);case f.ALPHANUMERIC:return c.getBitsLength(H);case f.KANJI:return h.getBitsLength(H);case f.BYTE:return o.getBitsLength(H)}}function B(H){return H.reduce(function(O,U){const Z=O.length-1>=0?O[O.length-1]:null;return Z&&Z.mode===U.mode?(O[O.length-1].data+=U.data,O):(O.push(U),O)},[])}function Y(H){const O=[];for(let U=0;U<H.length;U++){const Z=H[U];switch(Z.mode){case f.NUMERIC:O.push([Z,{data:Z.data,mode:f.ALPHANUMERIC,length:Z.length},{data:Z.data,mode:f.BYTE,length:Z.length}]);break;case f.ALPHANUMERIC:O.push([Z,{data:Z.data,mode:f.BYTE,length:Z.length}]);break;case f.KANJI:O.push([Z,{data:Z.data,mode:f.BYTE,length:b(Z.data)}]);break;case f.BYTE:O.push([{data:Z.data,mode:f.BYTE,length:b(Z.data)}])}}return O}function K(H,O){const U={},Z={start:{}};let ot=["start"];for(let Q=0;Q<H.length;Q++){const q=H[Q],j=[];for(let X=0;X<q.length;X++){const et=q[X],$=""+Q+X;j.push($),U[$]={node:et,lastCount:0},Z[$]={};for(let F=0;F<ot.length;F++){const P=ot[F];U[P]&&U[P].node.mode===et.mode?(Z[P][$]=k(U[P].lastCount+et.length,et.mode)-k(U[P].lastCount,et.mode),U[P].lastCount+=et.length):(U[P]&&(U[P].lastCount=et.length),Z[P][$]=k(et.length,et.mode)+4+f.getCharCountIndicator(et.mode,O))}}ot=j}for(let Q=0;Q<ot.length;Q++)Z[ot[Q]].end=0;return{map:Z,table:U}}function ct(H,O){let U;const Z=f.getBestModeForData(H);if(U=f.from(O,Z),U!==f.BYTE&&U.bit<Z.bit)throw new Error('"'+H+'" cannot be encoded with mode '+f.toString(U)+`.
 Suggested mode is: `+f.toString(Z));switch(U===f.KANJI&&!w.isKanjiModeEnabled()&&(U=f.BYTE),U){case f.NUMERIC:return new d(H);case f.ALPHANUMERIC:return new c(H);case f.KANJI:return new h(H);case f.BYTE:return new o(H)}}r.fromArray=function(O){return O.reduce(function(U,Z){return typeof Z=="string"?U.push(ct(Z,null)):Z.data&&U.push(ct(Z.data,Z.mode)),U},[])},r.fromString=function(O,U){const Z=R(O,w.isKanjiModeEnabled()),ot=Y(Z),Q=K(ot,U),q=m.find_path(Q.map,"start","end"),j=[];for(let X=1;X<q.length-1;X++)j.push(Q.table[q[X]].node);return r.fromArray(B(j))},r.rawSplit=function(O){return r.fromArray(R(O,w.isKanjiModeEnabled()))}})(Qr)),Qr}var P0;function n2(){if(P0)return Mr;P0=1;const r=In(),f=is(),d=qg(),c=Yg(),o=Gg(),h=Qg(),v=Xg(),w=yh(),m=Kg(),b=Jg(),D=Ig(),R=Fn(),k=e2();function B(Q,q){const j=Q.size,X=h.getPositions(q);for(let et=0;et<X.length;et++){const $=X[et][0],F=X[et][1];for(let P=-1;P<=7;P++)if(!($+P<=-1||j<=$+P))for(let lt=-1;lt<=7;lt++)F+lt<=-1||j<=F+lt||(P>=0&&P<=6&&(lt===0||lt===6)||lt>=0&&lt<=6&&(P===0||P===6)||P>=2&&P<=4&&lt>=2&&lt<=4?Q.set($+P,F+lt,!0,!0):Q.set($+P,F+lt,!1,!0))}}function Y(Q){const q=Q.size;for(let j=8;j<q-8;j++){const X=j%2===0;Q.set(j,6,X,!0),Q.set(6,j,X,!0)}}function K(Q,q){const j=o.getPositions(q);for(let X=0;X<j.length;X++){const et=j[X][0],$=j[X][1];for(let F=-2;F<=2;F++)for(let P=-2;P<=2;P++)F===-2||F===2||P===-2||P===2||F===0&&P===0?Q.set(et+F,$+P,!0,!0):Q.set(et+F,$+P,!1,!0)}}function ct(Q,q){const j=Q.size,X=b.getEncodedBits(q);let et,$,F;for(let P=0;P<18;P++)et=Math.floor(P/3),$=P%3+j-8-3,F=(X>>P&1)===1,Q.set(et,$,F,!0),Q.set($,et,F,!0)}function H(Q,q,j){const X=Q.size,et=D.getEncodedBits(q,j);let $,F;for($=0;$<15;$++)F=(et>>$&1)===1,$<6?Q.set($,8,F,!0):$<8?Q.set($+1,8,F,!0):Q.set(X-15+$,8,F,!0),$<8?Q.set(8,X-$-1,F,!0):$<9?Q.set(8,15-$-1+1,F,!0):Q.set(8,15-$-1,F,!0);Q.set(X-8,8,1,!0)}function O(Q,q){const j=Q.size;let X=-1,et=j-1,$=7,F=0;for(let P=j-1;P>0;P-=2)for(P===6&&P--;;){for(let lt=0;lt<2;lt++)if(!Q.isReserved(et,P-lt)){let jt=!1;F<q.length&&(jt=(q[F]>>>$&1)===1),Q.set(et,P-lt,jt),$--,$===-1&&(F++,$=7)}if(et+=X,et<0||j<=et){et-=X,X=-X;break}}}function U(Q,q,j){const X=new d;j.forEach(function(lt){X.put(lt.mode.bit,4),X.put(lt.getLength(),R.getCharCountIndicator(lt.mode,Q)),lt.write(X)});const et=r.getSymbolTotalCodewords(Q),$=w.getTotalCodewordsCount(Q,q),F=(et-$)*8;for(X.getLengthInBits()+4<=F&&X.put(0,4);X.getLengthInBits()%8!==0;)X.putBit(0);const P=(F-X.getLengthInBits())/8;for(let lt=0;lt<P;lt++)X.put(lt%2?17:236,8);return Z(X,Q,q)}function Z(Q,q,j){const X=r.getSymbolTotalCodewords(q),et=w.getTotalCodewordsCount(q,j),$=X-et,F=w.getBlocksCount(q,j),P=X%F,lt=F-P,jt=Math.floor(X/F),C=Math.floor($/F),V=C+1,nt=jt-C,Et=new m(nt);let St=0;const L=new Array(F),z=new Array(F);let G=0;const I=new Uint8Array(Q.buffer);for(let At=0;At<F;At++){const He=At<lt?C:V;L[At]=I.slice(St,St+He),z[At]=Et.encode(L[At]),St+=He,G=Math.max(G,He)}const it=new Uint8Array(X);let ft=0,dt,Rt;for(dt=0;dt<G;dt++)for(Rt=0;Rt<F;Rt++)dt<L[Rt].length&&(it[ft++]=L[Rt][dt]);for(dt=0;dt<nt;dt++)for(Rt=0;Rt<F;Rt++)it[ft++]=z[Rt][dt];return it}function ot(Q,q,j,X){let et;if(Array.isArray(Q))et=k.fromArray(Q);else if(typeof Q=="string"){let jt=q;if(!jt){const C=k.rawSplit(Q);jt=b.getBestVersionForData(C,j)}et=k.fromString(Q,jt||40)}else throw new Error("Invalid data");const $=b.getBestVersionForData(et,j);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!q)q=$;else if(q<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const F=U(q,j,et),P=r.getSymbolSize(q),lt=new c(P);return B(lt,q),Y(lt),K(lt,q),H(lt,j,0),q>=7&&ct(lt,q),O(lt,F),isNaN(X)&&(X=v.getBestMask(lt,H.bind(null,lt,j))),v.applyMask(X,lt),H(lt,j,X),{modules:lt,version:q,errorCorrectionLevel:j,maskPattern:X,segments:et}}return Mr.create=function(q,j){if(typeof q>"u"||q==="")throw new Error("No input text");let X=f.M,et,$;return typeof j<"u"&&(X=f.from(j.errorCorrectionLevel,f.M),et=b.from(j.version),$=v.from(j.maskPattern),j.toSJISFunc&&r.setToSJISFunction(j.toSJISFunc)),ot(q,et,X,$)},Mr}var Ir={},Fr={},th;function Lh(){return th||(th=1,(function(r){function f(d){if(typeof d=="number"&&(d=d.toString()),typeof d!="string")throw new Error("Color should be defined as hex string");let c=d.slice().replace("#","").split("");if(c.length<3||c.length===5||c.length>8)throw new Error("Invalid hex color: "+d);(c.length===3||c.length===4)&&(c=Array.prototype.concat.apply([],c.map(function(h){return[h,h]}))),c.length===6&&c.push("F","F");const o=parseInt(c.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+c.slice(0,6).join("")}}r.getOptions=function(c){c||(c={}),c.color||(c.color={});const o=typeof c.margin>"u"||c.margin===null||c.margin<0?4:c.margin,h=c.width&&c.width>=21?c.width:void 0,v=c.scale||4;return{width:h,scale:h?4:v,margin:o,color:{dark:f(c.color.dark||"#000000ff"),light:f(c.color.light||"#ffffffff")},type:c.type,rendererOpts:c.rendererOpts||{}}},r.getScale=function(c,o){return o.width&&o.width>=c+o.margin*2?o.width/(c+o.margin*2):o.scale},r.getImageWidth=function(c,o){const h=r.getScale(c,o);return Math.floor((c+o.margin*2)*h)},r.qrToImageData=function(c,o,h){const v=o.modules.size,w=o.modules.data,m=r.getScale(v,h),b=Math.floor((v+h.margin*2)*m),D=h.margin*m,R=[h.color.light,h.color.dark];for(let k=0;k<b;k++)for(let B=0;B<b;B++){let Y=(k*b+B)*4,K=h.color.light;if(k>=D&&B>=D&&k<b-D&&B<b-D){const ct=Math.floor((k-D)/m),H=Math.floor((B-D)/m);K=R[w[ct*v+H]?1:0]}c[Y++]=K.r,c[Y++]=K.g,c[Y++]=K.b,c[Y]=K.a}}})(Fr)),Fr}var eh;function a2(){return eh||(eh=1,(function(r){const f=Lh();function d(o,h,v){o.clearRect(0,0,h.width,h.height),h.style||(h.style={}),h.height=v,h.width=v,h.style.height=v+"px",h.style.width=v+"px"}function c(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(h,v,w){let m=w,b=v;typeof m>"u"&&(!v||!v.getContext)&&(m=v,v=void 0),v||(b=c()),m=f.getOptions(m);const D=f.getImageWidth(h.modules.size,m),R=b.getContext("2d"),k=R.createImageData(D,D);return f.qrToImageData(k.data,h,m),d(R,b,D),R.putImageData(k,0,0),b},r.renderToDataURL=function(h,v,w){let m=w;typeof m>"u"&&(!v||!v.getContext)&&(m=v,v=void 0),m||(m={});const b=r.render(h,v,m),D=m.type||"image/png",R=m.rendererOpts||{};return b.toDataURL(D,R.quality)}})(Ir)),Ir}var Wr={},nh;function l2(){if(nh)return Wr;nh=1;const r=Lh();function f(o,h){const v=o.a/255,w=h+'="'+o.hex+'"';return v<1?w+" "+h+'-opacity="'+v.toFixed(2).slice(1)+'"':w}function d(o,h,v){let w=o+h;return typeof v<"u"&&(w+=" "+v),w}function c(o,h,v){let w="",m=0,b=!1,D=0;for(let R=0;R<o.length;R++){const k=Math.floor(R%h),B=Math.floor(R/h);!k&&!b&&(b=!0),o[R]?(D++,R>0&&k>0&&o[R-1]||(w+=b?d("M",k+v,.5+B+v):d("m",m,0),m=0,b=!1),k+1<h&&o[R+1]||(w+=d("h",D),D=0)):m++}return w}return Wr.render=function(h,v,w){const m=r.getOptions(v),b=h.modules.size,D=h.modules.data,R=b+m.margin*2,k=m.color.light.a?"<path "+f(m.color.light,"fill")+' d="M0 0h'+R+"v"+R+'H0z"/>':"",B="<path "+f(m.color.dark,"stroke")+' d="'+c(D,b,m.margin)+'"/>',Y='viewBox="0 0 '+R+" "+R+'"',ct='<svg xmlns="http://www.w3.org/2000/svg" '+(m.width?'width="'+m.width+'" height="'+m.width+'" ':"")+Y+' shape-rendering="crispEdges">'+k+B+`</svg>
`;return typeof w=="function"&&w(null,ct),ct},Wr}var ah;function i2(){if(ah)return Ha;ah=1;const r=jg(),f=n2(),d=a2(),c=l2();function o(h,v,w,m,b){const D=[].slice.call(arguments,1),R=D.length,k=typeof D[R-1]=="function";if(!k&&!r())throw new Error("Callback required as last argument");if(k){if(R<2)throw new Error("Too few arguments provided");R===2?(b=w,w=v,v=m=void 0):R===3&&(v.getContext&&typeof b>"u"?(b=m,m=void 0):(b=m,m=w,w=v,v=void 0))}else{if(R<1)throw new Error("Too few arguments provided");return R===1?(w=v,v=m=void 0):R===2&&!v.getContext&&(m=w,w=v,v=void 0),new Promise(function(B,Y){try{const K=f.create(w,m);B(h(K,v,m))}catch(K){Y(K)}})}try{const B=f.create(w,m);b(null,h(B,v,m))}catch(B){b(B)}}return Ha.create=f.create,Ha.toCanvas=o.bind(null,d.render),Ha.toDataURL=o.bind(null,d.renderToDataURL),Ha.toString=o.bind(null,function(h,v,w){return c.render(h,w)}),Ha}var u2=i2();const c2=Vm(u2),$r=`${window.location.origin}/hpde/pr-preview/pr-149/`;function r2(){const[r,f]=vt.useState(!1),[d,c]=vt.useState(null);vt.useEffect(()=>{window.scrollTo(0,0),c2.toDataURL($r,{margin:1,width:240}).then(c).catch(()=>c(null))},[]);async function o(){await navigator.clipboard.writeText($r),f(!0),setTimeout(()=>f(!1),2e3)}return p.jsx("div",{className:"min-h-screen bg-gray-50",children:p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),p.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:p.jsx(as,{size:18})})]}),p.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),p.jsxs("button",{onClick:o,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[p.jsx("span",{className:"truncate text-sm text-gray-800",children:$r}),r?p.jsx(au,{size:16,className:"shrink-0 text-green-600"}):p.jsx(fh,{size:16,className:"shrink-0 text-gray-400"})]}),p.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:d&&p.jsx("img",{src:d,alt:"QR code for schedule link",width:240,height:240})})]})})}const s2=350,o2="cubic-bezier(0.32, 0.72, 0, 1)";function f2(r){try{return new URL(r).hostname.replace(/^www\./,"")}catch{return r}}function d2(r){const f=r.trim().toLowerCase();return f==="clockwise"?"CW (clockwise)":f==="counter-clockwise"||f==="counterclockwise"?"CCW (counter-clockwise)":r}function h2(r,f){return[r,f&&d2(f)].filter(Boolean).join(" ")}function Dl({icon:r,label:f,subtitle:d,children:c}){return p.jsxs("div",{className:"grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[p.jsxs("span",{className:"flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[p.jsx(r,{size:14,className:"shrink-0 text-gray-400"}),f]}),p.jsxs("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:[c,d&&p.jsx("span",{className:"mt-0.5 block text-xs font-normal text-gray-400",children:d})]})]})}function m2({event:r,open:f,onClose:d}){var w;vt.useEffect(()=>{if(!f)return;const m=b=>{b.key==="Escape"&&d()};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[f,d]);const c=pg(r.days),o=h2(r.configuration,r.direction),h=!!((w=r.scheduleScans)!=null&&w.length),v=c||r.organizer||r.track||o||r.link||h;return p.jsxs(p.Fragment,{children:[p.jsx("div",{"aria-hidden":"true",inert:!f,onClick:d,className:"fixed inset-0 z-40",style:{pointerEvents:f?"auto":"none"}}),p.jsx("div",{role:"dialog","aria-modal":f,"aria-labelledby":"event-details-title",inert:!f,className:"fixed inset-y-0 right-0 z-50 flex w-full bg-white md:w-[480px] md:max-w-[60vw]",style:{transform:f?"translate3d(0,0,0)":"translate3d(100%,0,0)",transition:`transform ${s2}ms ${o2}`,boxShadow:f?"-8px 0 24px rgba(0,0,0,0.08)":"none",willChange:"transform"},children:p.jsxs("div",{className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none",children:[p.jsxs("div",{className:"mb-5 flex items-start gap-2 md:justify-between md:gap-4",children:[p.jsx("button",{onClick:d,"aria-label":"Back",className:"inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden",children:p.jsx(ig,{size:20})}),p.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"}),p.jsx("button",{onClick:d,"aria-label":"Close",className:"hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid",children:p.jsx(as,{size:20})})]}),v?p.jsxs(p.Fragment,{children:[p.jsxs("div",{className:"pl-1",children:[c&&p.jsx(Dl,{icon:sh,label:"Dates",children:c}),r.organizer&&p.jsx(Dl,{icon:mg,label:"Organizer",children:r.organizer}),r.track&&p.jsx(Dl,{icon:og,label:"Location",subtitle:r.city,children:r.track}),o&&p.jsx(Dl,{icon:hg,label:"Track config",children:o}),r.link&&p.jsx(Dl,{icon:sg,label:"Event page",children:p.jsxs("a",{href:r.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[f2(r.link),p.jsx(ug,{size:12,className:"text-gray-400"})]})})]}),h&&p.jsxs("div",{className:"mt-6 pl-1",children:[p.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[p.jsx(cg,{size:14,className:"shrink-0 text-gray-400"}),"Original schedule"]}),p.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:r.scheduleScans.map((m,b)=>p.jsx("a",{href:m,target:"_blank",rel:"noopener noreferrer",children:p.jsx("img",{src:m,alt:`Original schedule scan ${b+1}`,className:"aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"})},m))})]})]}):p.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})})]})}function Ba(r,f){const d=f.split(`
`).map(ct=>ct.trim());let c="",o,h,v,w,m,b,D,R;const k=[],B=[];let Y=null,K=!1;for(const ct of d){if(!ct||ct.startsWith("//"))continue;const H=ct.replace(/^-\s+/,"");if(H.startsWith("# ")){c=H.slice(2).trim();continue}if(H.startsWith("subtitle:")){o=H.slice(9).trim()||void 0;continue}if(H.startsWith("link:")){h=H.slice(5).trim()||void 0;continue}if(H.startsWith("organizer:")){v=H.slice(10).trim()||void 0;continue}if(H.startsWith("trackId:")){m=H.slice(8).trim()||void 0;continue}if(H.startsWith("track:")){w=H.slice(6).trim()||void 0;continue}if(H.startsWith("city:")){b=H.slice(5).trim()||void 0;continue}if(H.startsWith("configuration:")){D=H.slice(14).trim()||void 0;continue}if(H.startsWith("config:")){D=H.slice(7).trim()||void 0;continue}if(H.startsWith("direction:")){R=H.slice(10).trim()||void 0;continue}if(H.startsWith("## ")){const O=H.slice(3).trim();if(O.toLowerCase()==="groups"){K=!0,Y=null;continue}const U=O.split("|").map(Z=>Z.trim());U.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(U[1])?(K=!1,Y={id:U[0].toLowerCase().replace(/\s+/g,"-"),label:U[0],date:U[1],activities:[]},B.push(Y)):K=!1;continue}if(K){const O=H.split("|").map(U=>U.trim());if(O.length>=4){const U=O[4]||void 0;k.push({id:O[0],label:O[1],bgClass:O[2],textClass:O[3],...U?{description:U}:{}})}continue}if(Y){if(/^\d{2}:\d{2}/.test(H)){const O=g2(H);O&&Y.activities.push(O)}else if(/^break\s*\|/.test(H)){const O=H.slice(H.indexOf("|")+1).trim();Y.activities.push({type:"break",label:O})}}}return{id:r,name:c,...o?{subtitle:o}:{},...h?{link:h}:{},...v?{organizer:v}:{},...w?{track:w}:{},...m?{trackId:m}:{},...b?{city:b}:{},...D?{configuration:D}:{},...R?{direction:R}:{},runGroups:k,days:B}}function g2(r){const f=r.split("|").map(w=>w.trim()),d=f[0],c=f.slice(1),o=d.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!o)return null;const h=o[1],v=o[2].trim();if(/^(general|lunch|special)$/.test(v)){const w=v,m=c[0]??"",b=c[1]||void 0;return{time:h,type:w,label:m,...b?{subtitle:b}:{}}}if(/^session/.test(v)){const w=v.match(/^session\s+(\d+)/),m=w?parseInt(w[1],10):void 0;let b=[],D=[],R;for(const k of c)k.startsWith("track:")?b=k.slice(6).trim().split(",").map(B=>B.trim()).filter(Boolean):k.startsWith("class:")?D=k.slice(6).trim().split(",").map(B=>B.trim()).filter(Boolean):k.startsWith("note:")&&(R=k.slice(5).trim()||void 0);return{time:h,type:"session",...m!==void 0?{sessionNumber:m}:{},onTrack:b,...D.length?{inClass:D}:{},...R?{note:R}:{}}}return null}const p2=`# TDE at MSRC 1.7CW

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   trackId: <shape icon key — msrc-3-1 | msrc-1-7 | msrc-1-3 | ecr; unset shows a placeholder>
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
- trackId: msrc-1-7
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
`,us="/hpde/pr-preview/pr-149/assets/msrc-1-7-D9G0r_nf.jpg",y2={...Ba("2026-09-11_msrc-1-7",p2),mapImage:us},v2=`# SCCA at MSRC 1.7 CW

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   trackId: <shape icon key — msrc-3-1 | msrc-1-7 | msrc-1-3 | ecr; unset shows a placeholder>
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
- trackId: msrc-1-7
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
`,b2={...Ba("2026-09-13_msr-scca",v2),mapImage:us},L2=`# TDE at MSRC 1.7 Fast Track

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   trackId: <shape icon key — msrc-3-1 | msrc-1-7 | msrc-1-3 | ecr; unset shows a placeholder>
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
- trackId: msrc-1-7
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
`,S2={...Ba("2026-06-06_msrc-1-7",L2),mapImage:us},w2=`# TDE at MSRC 3.1

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   trackId: <shape icon key — msrc-3-1 | msrc-1-7 | msrc-1-3 | ecr; unset shows a placeholder>
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
- trackId: msrc-3-1
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
`,E2="/hpde/pr-preview/pr-149/assets/msrc-3-1-BsOP6CK2.png",T2={...Ba("2025-11-07_msrc-3-1",w2),mapImage:E2},x2=`# TDE at ECR 2.7

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   trackId: <shape icon key — msrc-3-1 | msrc-1-7 | msrc-1-3 | ecr; unset shows a placeholder>
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
- trackId: ecr
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
`,A2="/hpde/pr-preview/pr-149/assets/ecr-BW_3Ndfh.png",C2={...Ba("2026-05-30_ecr-2-7",x2),mapImage:A2},N2=`# Test Event

\`\`\`
// ── schedule format reference (comment — ignored by the parser) ──
// Header fields, one per line, blank if unused:
//   organizer: <club / organizing body>
//   track: <track / venue name — shown as "Location">
//   trackId: <shape icon key — msrc-3-1 | msrc-1-7 | msrc-1-3 | ecr; unset shows a placeholder>
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
`,lh=Ba("test-live",N2),_2={...lh,days:lh.days.map(r=>({...r,date:kl()}))},eu=[y2,b2,S2,C2,T2].sort((r,f)=>f.id.localeCompare(r.id)),ih=[...eu,_2];function tu(r,f){const[d,c]=vt.useState(()=>{try{const o=localStorage.getItem(r);return o!==null?JSON.parse(o):f}catch{return f}});return vt.useEffect(()=>{localStorage.setItem(r,JSON.stringify(d))},[r,d]),[d,c]}function Sh(r){const f=kl();return r.days.find(d=>d.date===f)}function uh(r){return Sh(r)??r.days[0]}function M2(){const[r,f]=vt.useState(()=>window.location.hash);vt.useEffect(()=>{const c=()=>{f(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",c),()=>window.removeEventListener("hashchange",c)},[]);function d(c){window.location.hash!==c&&(window.location.hash=c)}return[r,d]}const es="#/event/";function ch(r){return`${es}${encodeURIComponent(r)}`}function R2(r){return r.startsWith(es)?decodeURIComponent(r.slice(es.length)):null}function z2(){const[r,f]=M2(),[d,c]=vt.useState("schedule"),[o,h]=tu("hpde:activeEvent",eu[0].id),[v,w]=tu("hpde:activeDay",null),[m,b]=tu("hpde:groups",[]),[D,R]=tu("hpde:hidePast",!1),[k,B]=vt.useState(!1),Y=ih.find(j=>j.id===o)??eu[0],K=Y.days.find(j=>j.id===v)??uh(Y),ct=Sh(Y),H=K.date===kl(),O=Y.days.length>1,Z=Y.days.reduce((j,X)=>X.date>j?X.date:j,Y.days[0].date)<kl(),[,ot]=vt.useState(0);vt.useEffect(()=>{if(!H)return;const j=setInterval(()=>ot(X=>X+1),6e4);return()=>clearInterval(j)},[H]);const Q=H&&K.activities.some(j=>j.type!=="break"&&en(j.time)<ls());function q(j){h(j.id),w(uh(j).id),b([]),f(ch(j.id))}return vt.useEffect(()=>{const j=R2(r);if(j){const X=ih.find(et=>et.id===j);X&&X.id!==o&&q(X);return}(r===""||r==="#")&&f(ch(o))},[r]),r==="#/widget-script"?p.jsx(Ug,{}):r==="#/share"?p.jsx(r2,{}):p.jsxs(p.Fragment,{children:[p.jsx(Hg,{children:p.jsxs("div",{className:"min-h-screen bg-gray-50",children:[p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[p.jsx(Dg,{events:eu,active:Y,onChange:q,onOpenDetails:()=>B(!0)}),p.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[p.jsx("button",{onClick:()=>c("schedule"),className:`rounded-md p-2 transition-colors ${d==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:p.jsx(sh,{size:18})}),p.jsx("button",{onClick:()=>c("map"),className:`rounded-md p-2 transition-colors ${d==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:p.jsx(L0,{size:18})})]})]}),Z&&p.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),d==="schedule"&&p.jsxs(p.Fragment,{children:[O&&p.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[p.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:Y.days.map(j=>p.jsx("button",{onClick:()=>w(j.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${K.id===j.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:j.label},j.id))}),p.jsx("button",{onClick:()=>ct&&w(ct.id),disabled:H||!ct,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${H||!ct?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx(xg,{groups:Y.runGroups,selected:m,onChange:b}),Q&&p.jsx(kg,{checked:D,onChange:()=>R(j=>!j),label:"Hide past activities"})]}),p.jsx(Tg,{activities:K.activities,runGroups:Y.runGroups,isToday:H,selectedGroups:m,hidePast:D}),p.jsx(Bg,{groups:Y.runGroups})]}),d==="map"&&(Y.mapImage?p.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:p.jsx("img",{src:Y.mapImage,alt:`${Y.name} track map`,className:"block w-full h-auto"})}):p.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:p.jsxs("div",{className:"text-center",children:[p.jsx(L0,{size:40,className:"mx-auto mb-2 opacity-30"}),p.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),p.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[p.jsxs("div",{children:[p.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",p.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),p.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",Sg("2026-09-18T05:30:58Z")]})]})]})}),p.jsx(m2,{event:Y,open:k,onClose:()=>B(!1)})]})}eg.createRoot(document.getElementById("root")).render(p.jsx(vt.StrictMode,{children:p.jsx(z2,{})}));
