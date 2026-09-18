(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const S of d.addedNodes)S.tagName==="LINK"&&S.rel==="modulepreload"&&c(S)}).observe(document,{childList:!0,subtree:!0});function h(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function c(o){if(o.ep)return;o.ep=!0;const d=h(o);fetch(o.href,d)}})();function L0(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Tr={exports:{}},Dl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rh;function q0(){if(rh)return Dl;rh=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function h(c,o,d){var S=null;if(d!==void 0&&(S=""+d),o.key!==void 0&&(S=""+o.key),"key"in o){d={};for(var T in o)T!=="key"&&(d[T]=o[T])}else d=o;return o=d.ref,{$$typeof:r,type:c,key:S,ref:o!==void 0?o:null,props:d}}return Dl.Fragment=f,Dl.jsx=h,Dl.jsxs=h,Dl}var sh;function Y0(){return sh||(sh=1,Tr.exports=q0()),Tr.exports}var p=Y0(),Er={exports:{}},ct={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oh;function G0(){if(oh)return ct;oh=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),S=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),y=Symbol.for("react.memo"),O=Symbol.for("react.lazy"),z=Symbol.for("react.activity"),k=Symbol.iterator;function H(b){return b===null||typeof b!="object"?null:(b=k&&b[k]||b["@@iterator"],typeof b=="function"?b:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Z=Object.assign,F={};function q(b,R,G){this.props=b,this.context=R,this.refs=F,this.updater=G||L}q.prototype.isReactComponent={},q.prototype.setState=function(b,R){if(typeof b!="object"&&typeof b!="function"&&b!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,b,R,"setState")},q.prototype.forceUpdate=function(b){this.updater.enqueueForceUpdate(this,b,"forceUpdate")};function B(){}B.prototype=q.prototype;function Y(b,R,G){this.props=b,this.context=R,this.refs=F,this.updater=G||L}var K=Y.prototype=new B;K.constructor=Y,Z(K,q.prototype),K.isPureReactComponent=!0;var ot=Array.isArray;function X(){}var j={H:null,A:null,T:null,S:null},U=Object.prototype.hasOwnProperty;function Q(b,R,G){var I=G.ref;return{$$typeof:r,type:b,key:R,ref:I!==void 0?I:null,props:G}}function nt(b,R){return Q(b.type,R,b.props)}function P(b){return typeof b=="object"&&b!==null&&b.$$typeof===r}function W(b){var R={"=":"=0",":":"=2"};return"$"+b.replace(/[=:]/g,function(G){return R[G]})}var tt=/\/+/g;function it(b,R){return typeof b=="object"&&b!==null&&b.key!=null?W(""+b.key):R.toString(36)}function Lt(b){switch(b.status){case"fulfilled":return b.value;case"rejected":throw b.reason;default:switch(typeof b.status=="string"?b.then(X,X):(b.status="pending",b.then(function(R){b.status==="pending"&&(b.status="fulfilled",b.value=R)},function(R){b.status==="pending"&&(b.status="rejected",b.reason=R)})),b.status){case"fulfilled":return b.value;case"rejected":throw b.reason}}throw b}function C(b,R,G,I,ut){var ft=typeof b;(ft==="undefined"||ft==="boolean")&&(b=null);var dt=!1;if(b===null)dt=!0;else switch(ft){case"bigint":case"string":case"number":dt=!0;break;case"object":switch(b.$$typeof){case r:case f:dt=!0;break;case O:return dt=b._init,C(dt(b._payload),R,G,I,ut)}}if(dt)return ut=ut(b),dt=I===""?"."+it(b,0):I,ot(ut)?(G="",dt!=null&&(G=dt.replace(tt,"$&/")+"/"),C(ut,R,G,"",function(Be){return Be})):ut!=null&&(P(ut)&&(ut=nt(ut,G+(ut.key==null||b&&b.key===ut.key?"":(""+ut.key).replace(tt,"$&/")+"/")+dt)),R.push(ut)),1;dt=0;var Rt=I===""?".":I+":";if(ot(b))for(var Nt=0;Nt<b.length;Nt++)I=b[Nt],ft=Rt+it(I,Nt),dt+=C(I,R,G,ft,ut);else if(Nt=H(b),typeof Nt=="function")for(b=Nt.call(b),Nt=0;!(I=b.next()).done;)I=I.value,ft=Rt+it(I,Nt++),dt+=C(I,R,G,ft,ut);else if(ft==="object"){if(typeof b.then=="function")return C(Lt(b),R,G,I,ut);throw R=String(b),Error("Objects are not valid as a React child (found: "+(R==="[object Object]"?"object with keys {"+Object.keys(b).join(", ")+"}":R)+"). If you meant to render a collection of children, use an array instead.")}return dt}function V(b,R,G){if(b==null)return b;var I=[],ut=0;return C(b,I,"","",function(ft){return R.call(G,ft,ut++)}),I}function at(b){if(b._status===-1){var R=b._result;R=R(),R.then(function(G){(b._status===0||b._status===-1)&&(b._status=1,b._result=G)},function(G){(b._status===0||b._status===-1)&&(b._status=2,b._result=G)}),b._status===-1&&(b._status=0,b._result=R)}if(b._status===1)return b._result.default;throw b._result}var Et=typeof reportError=="function"?reportError:function(b){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var R=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof b=="object"&&b!==null&&typeof b.message=="string"?String(b.message):String(b),error:b});if(!window.dispatchEvent(R))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",b);return}console.error(b)},wt={map:V,forEach:function(b,R,G){V(b,function(){R.apply(this,arguments)},G)},count:function(b){var R=0;return V(b,function(){R++}),R},toArray:function(b){return V(b,function(R){return R})||[]},only:function(b){if(!P(b))throw Error("React.Children.only expected to receive a single React element child.");return b}};return ct.Activity=z,ct.Children=wt,ct.Component=q,ct.Fragment=h,ct.Profiler=o,ct.PureComponent=Y,ct.StrictMode=c,ct.Suspense=m,ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=j,ct.__COMPILER_RUNTIME={__proto__:null,c:function(b){return j.H.useMemoCache(b)}},ct.cache=function(b){return function(){return b.apply(null,arguments)}},ct.cacheSignal=function(){return null},ct.cloneElement=function(b,R,G){if(b==null)throw Error("The argument must be a React element, but you passed "+b+".");var I=Z({},b.props),ut=b.key;if(R!=null)for(ft in R.key!==void 0&&(ut=""+R.key),R)!U.call(R,ft)||ft==="key"||ft==="__self"||ft==="__source"||ft==="ref"&&R.ref===void 0||(I[ft]=R[ft]);var ft=arguments.length-2;if(ft===1)I.children=G;else if(1<ft){for(var dt=Array(ft),Rt=0;Rt<ft;Rt++)dt[Rt]=arguments[Rt+2];I.children=dt}return Q(b.type,ut,I)},ct.createContext=function(b){return b={$$typeof:S,_currentValue:b,_currentValue2:b,_threadCount:0,Provider:null,Consumer:null},b.Provider=b,b.Consumer={$$typeof:d,_context:b},b},ct.createElement=function(b,R,G){var I,ut={},ft=null;if(R!=null)for(I in R.key!==void 0&&(ft=""+R.key),R)U.call(R,I)&&I!=="key"&&I!=="__self"&&I!=="__source"&&(ut[I]=R[I]);var dt=arguments.length-2;if(dt===1)ut.children=G;else if(1<dt){for(var Rt=Array(dt),Nt=0;Nt<dt;Nt++)Rt[Nt]=arguments[Nt+2];ut.children=Rt}if(b&&b.defaultProps)for(I in dt=b.defaultProps,dt)ut[I]===void 0&&(ut[I]=dt[I]);return Q(b,ft,ut)},ct.createRef=function(){return{current:null}},ct.forwardRef=function(b){return{$$typeof:T,render:b}},ct.isValidElement=P,ct.lazy=function(b){return{$$typeof:O,_payload:{_status:-1,_result:b},_init:at}},ct.memo=function(b,R){return{$$typeof:y,type:b,compare:R===void 0?null:R}},ct.startTransition=function(b){var R=j.T,G={};j.T=G;try{var I=b(),ut=j.S;ut!==null&&ut(G,I),typeof I=="object"&&I!==null&&typeof I.then=="function"&&I.then(X,Et)}catch(ft){Et(ft)}finally{R!==null&&G.types!==null&&(R.types=G.types),j.T=R}},ct.unstable_useCacheRefresh=function(){return j.H.useCacheRefresh()},ct.use=function(b){return j.H.use(b)},ct.useActionState=function(b,R,G){return j.H.useActionState(b,R,G)},ct.useCallback=function(b,R){return j.H.useCallback(b,R)},ct.useContext=function(b){return j.H.useContext(b)},ct.useDebugValue=function(){},ct.useDeferredValue=function(b,R){return j.H.useDeferredValue(b,R)},ct.useEffect=function(b,R){return j.H.useEffect(b,R)},ct.useEffectEvent=function(b){return j.H.useEffectEvent(b)},ct.useId=function(){return j.H.useId()},ct.useImperativeHandle=function(b,R,G){return j.H.useImperativeHandle(b,R,G)},ct.useInsertionEffect=function(b,R){return j.H.useInsertionEffect(b,R)},ct.useLayoutEffect=function(b,R){return j.H.useLayoutEffect(b,R)},ct.useMemo=function(b,R){return j.H.useMemo(b,R)},ct.useOptimistic=function(b,R){return j.H.useOptimistic(b,R)},ct.useReducer=function(b,R,G){return j.H.useReducer(b,R,G)},ct.useRef=function(b){return j.H.useRef(b)},ct.useState=function(b){return j.H.useState(b)},ct.useSyncExternalStore=function(b,R,G){return j.H.useSyncExternalStore(b,R,G)},ct.useTransition=function(){return j.H.useTransition()},ct.version="19.2.6",ct}var fh;function ts(){return fh||(fh=1,Er.exports=G0()),Er.exports}var yt=ts(),xr={exports:{}},Rl={},Ar={exports:{}},Nr={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dh;function X0(){return dh||(dh=1,(function(r){function f(C,V){var at=C.length;C.push(V);t:for(;0<at;){var Et=at-1>>>1,wt=C[Et];if(0<o(wt,V))C[Et]=V,C[at]=wt,at=Et;else break t}}function h(C){return C.length===0?null:C[0]}function c(C){if(C.length===0)return null;var V=C[0],at=C.pop();if(at!==V){C[0]=at;t:for(var Et=0,wt=C.length,b=wt>>>1;Et<b;){var R=2*(Et+1)-1,G=C[R],I=R+1,ut=C[I];if(0>o(G,at))I<wt&&0>o(ut,G)?(C[Et]=ut,C[I]=at,Et=I):(C[Et]=G,C[R]=at,Et=R);else if(I<wt&&0>o(ut,at))C[Et]=ut,C[I]=at,Et=I;else break t}}return V}function o(C,V){var at=C.sortIndex-V.sortIndex;return at!==0?at:C.id-V.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;r.unstable_now=function(){return d.now()}}else{var S=Date,T=S.now();r.unstable_now=function(){return S.now()-T}}var m=[],y=[],O=1,z=null,k=3,H=!1,L=!1,Z=!1,F=!1,q=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,Y=typeof setImmediate<"u"?setImmediate:null;function K(C){for(var V=h(y);V!==null;){if(V.callback===null)c(y);else if(V.startTime<=C)c(y),V.sortIndex=V.expirationTime,f(m,V);else break;V=h(y)}}function ot(C){if(Z=!1,K(C),!L)if(h(m)!==null)L=!0,X||(X=!0,W());else{var V=h(y);V!==null&&Lt(ot,V.startTime-C)}}var X=!1,j=-1,U=5,Q=-1;function nt(){return F?!0:!(r.unstable_now()-Q<U)}function P(){if(F=!1,X){var C=r.unstable_now();Q=C;var V=!0;try{t:{L=!1,Z&&(Z=!1,B(j),j=-1),H=!0;var at=k;try{e:{for(K(C),z=h(m);z!==null&&!(z.expirationTime>C&&nt());){var Et=z.callback;if(typeof Et=="function"){z.callback=null,k=z.priorityLevel;var wt=Et(z.expirationTime<=C);if(C=r.unstable_now(),typeof wt=="function"){z.callback=wt,K(C),V=!0;break e}z===h(m)&&c(m),K(C)}else c(m);z=h(m)}if(z!==null)V=!0;else{var b=h(y);b!==null&&Lt(ot,b.startTime-C),V=!1}}break t}finally{z=null,k=at,H=!1}V=void 0}}finally{V?W():X=!1}}}var W;if(typeof Y=="function")W=function(){Y(P)};else if(typeof MessageChannel<"u"){var tt=new MessageChannel,it=tt.port2;tt.port1.onmessage=P,W=function(){it.postMessage(null)}}else W=function(){q(P,0)};function Lt(C,V){j=q(function(){C(r.unstable_now())},V)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(C){C.callback=null},r.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<C?Math.floor(1e3/C):5},r.unstable_getCurrentPriorityLevel=function(){return k},r.unstable_next=function(C){switch(k){case 1:case 2:case 3:var V=3;break;default:V=k}var at=k;k=V;try{return C()}finally{k=at}},r.unstable_requestPaint=function(){F=!0},r.unstable_runWithPriority=function(C,V){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var at=k;k=C;try{return V()}finally{k=at}},r.unstable_scheduleCallback=function(C,V,at){var Et=r.unstable_now();switch(typeof at=="object"&&at!==null?(at=at.delay,at=typeof at=="number"&&0<at?Et+at:Et):at=Et,C){case 1:var wt=-1;break;case 2:wt=250;break;case 5:wt=1073741823;break;case 4:wt=1e4;break;default:wt=5e3}return wt=at+wt,C={id:O++,callback:V,priorityLevel:C,startTime:at,expirationTime:wt,sortIndex:-1},at>Et?(C.sortIndex=at,f(y,C),h(m)===null&&C===h(y)&&(Z?(B(j),j=-1):Z=!0,Lt(ot,at-Et))):(C.sortIndex=wt,f(m,C),L||H||(L=!0,X||(X=!0,W()))),C},r.unstable_shouldYield=nt,r.unstable_wrapCallback=function(C){var V=k;return function(){var at=k;k=V;try{return C.apply(this,arguments)}finally{k=at}}}})(Nr)),Nr}var hh;function Q0(){return hh||(hh=1,Ar.exports=X0()),Ar.exports}var Cr={exports:{}},Pt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mh;function V0(){if(mh)return Pt;mh=1;var r=ts();function f(m){var y="https://react.dev/errors/"+m;if(1<arguments.length){y+="?args[]="+encodeURIComponent(arguments[1]);for(var O=2;O<arguments.length;O++)y+="&args[]="+encodeURIComponent(arguments[O])}return"Minified React error #"+m+"; visit "+y+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(){}var c={d:{f:h,r:function(){throw Error(f(522))},D:h,C:h,L:h,m:h,X:h,S:h,M:h},p:0,findDOMNode:null},o=Symbol.for("react.portal");function d(m,y,O){var z=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:z==null?null:""+z,children:m,containerInfo:y,implementation:O}}var S=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function T(m,y){if(m==="font")return"";if(typeof y=="string")return y==="use-credentials"?y:""}return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,Pt.createPortal=function(m,y){var O=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!y||y.nodeType!==1&&y.nodeType!==9&&y.nodeType!==11)throw Error(f(299));return d(m,y,null,O)},Pt.flushSync=function(m){var y=S.T,O=c.p;try{if(S.T=null,c.p=2,m)return m()}finally{S.T=y,c.p=O,c.d.f()}},Pt.preconnect=function(m,y){typeof m=="string"&&(y?(y=y.crossOrigin,y=typeof y=="string"?y==="use-credentials"?y:"":void 0):y=null,c.d.C(m,y))},Pt.prefetchDNS=function(m){typeof m=="string"&&c.d.D(m)},Pt.preinit=function(m,y){if(typeof m=="string"&&y&&typeof y.as=="string"){var O=y.as,z=T(O,y.crossOrigin),k=typeof y.integrity=="string"?y.integrity:void 0,H=typeof y.fetchPriority=="string"?y.fetchPriority:void 0;O==="style"?c.d.S(m,typeof y.precedence=="string"?y.precedence:void 0,{crossOrigin:z,integrity:k,fetchPriority:H}):O==="script"&&c.d.X(m,{crossOrigin:z,integrity:k,fetchPriority:H,nonce:typeof y.nonce=="string"?y.nonce:void 0})}},Pt.preinitModule=function(m,y){if(typeof m=="string")if(typeof y=="object"&&y!==null){if(y.as==null||y.as==="script"){var O=T(y.as,y.crossOrigin);c.d.M(m,{crossOrigin:O,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0})}}else y==null&&c.d.M(m)},Pt.preload=function(m,y){if(typeof m=="string"&&typeof y=="object"&&y!==null&&typeof y.as=="string"){var O=y.as,z=T(O,y.crossOrigin);c.d.L(m,O,{crossOrigin:z,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0,type:typeof y.type=="string"?y.type:void 0,fetchPriority:typeof y.fetchPriority=="string"?y.fetchPriority:void 0,referrerPolicy:typeof y.referrerPolicy=="string"?y.referrerPolicy:void 0,imageSrcSet:typeof y.imageSrcSet=="string"?y.imageSrcSet:void 0,imageSizes:typeof y.imageSizes=="string"?y.imageSizes:void 0,media:typeof y.media=="string"?y.media:void 0})}},Pt.preloadModule=function(m,y){if(typeof m=="string")if(y){var O=T(y.as,y.crossOrigin);c.d.m(m,{as:typeof y.as=="string"&&y.as!=="script"?y.as:void 0,crossOrigin:O,integrity:typeof y.integrity=="string"?y.integrity:void 0})}else c.d.m(m)},Pt.requestFormReset=function(m){c.d.r(m)},Pt.unstable_batchedUpdates=function(m,y){return m(y)},Pt.useFormState=function(m,y,O){return S.H.useFormState(m,y,O)},Pt.useFormStatus=function(){return S.H.useHostTransitionStatus()},Pt.version="19.2.6",Pt}var gh;function Z0(){if(gh)return Cr.exports;gh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),Cr.exports=V0(),Cr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ph;function K0(){if(ph)return Rl;ph=1;var r=Q0(),f=ts(),h=Z0();function c(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function d(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function S(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function T(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function m(t){if(d(t)!==t)throw Error(c(188))}function y(t){var e=t.alternate;if(!e){if(e=d(t),e===null)throw Error(c(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return m(l),t;if(i===a)return m(l),e;i=i.sibling}throw Error(c(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,s=l.child;s;){if(s===n){u=!0,n=l,a=i;break}if(s===a){u=!0,a=l,n=i;break}s=s.sibling}if(!u){for(s=i.child;s;){if(s===n){u=!0,n=i,a=l;break}if(s===a){u=!0,a=i,n=l;break}s=s.sibling}if(!u)throw Error(c(189))}}if(n.alternate!==a)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?t:e}function O(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=O(t),e!==null)return e;t=t.sibling}return null}var z=Object.assign,k=Symbol.for("react.element"),H=Symbol.for("react.transitional.element"),L=Symbol.for("react.portal"),Z=Symbol.for("react.fragment"),F=Symbol.for("react.strict_mode"),q=Symbol.for("react.profiler"),B=Symbol.for("react.consumer"),Y=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),ot=Symbol.for("react.suspense"),X=Symbol.for("react.suspense_list"),j=Symbol.for("react.memo"),U=Symbol.for("react.lazy"),Q=Symbol.for("react.activity"),nt=Symbol.for("react.memo_cache_sentinel"),P=Symbol.iterator;function W(t){return t===null||typeof t!="object"?null:(t=P&&t[P]||t["@@iterator"],typeof t=="function"?t:null)}var tt=Symbol.for("react.client.reference");function it(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===tt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Z:return"Fragment";case q:return"Profiler";case F:return"StrictMode";case ot:return"Suspense";case X:return"SuspenseList";case Q:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case L:return"Portal";case Y:return t.displayName||"Context";case B:return(t._context.displayName||"Context")+".Consumer";case K:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case j:return e=t.displayName||null,e!==null?e:it(t.type)||"Memo";case U:e=t._payload,t=t._init;try{return it(t(e))}catch{}}return null}var Lt=Array.isArray,C=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,at={pending:!1,data:null,method:null,action:null},Et=[],wt=-1;function b(t){return{current:t}}function R(t){0>wt||(t.current=Et[wt],Et[wt]=null,wt--)}function G(t,e){wt++,Et[wt]=t.current,t.current=e}var I=b(null),ut=b(null),ft=b(null),dt=b(null);function Rt(t,e){switch(G(ft,e),G(ut,t),G(I,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Rd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Rd(e),t=zd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}R(I),G(I,t)}function Nt(){R(I),R(ut),R(ft)}function Be(t){t.memoizedState!==null&&G(dt,t);var e=I.current,n=zd(e,t.type);e!==n&&(G(ut,t),G(I,n))}function Hl(t){ut.current===t&&(R(I),R(ut)),dt.current===t&&(R(dt),Nl._currentValue=at)}var lu,is;function Mn(t){if(lu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);lu=e&&e[1]||"",is=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+lu+t+is}var iu=!1;function uu(t,e){if(!t||iu)return"";iu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var D=function(){throw Error()};if(Object.defineProperty(D.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(D,[])}catch(N){var A=N}Reflect.construct(t,[],D)}else{try{D.call()}catch(N){A=N}t.call(D.prototype)}}else{try{throw Error()}catch(N){A=N}(D=t())&&typeof D.catch=="function"&&D.catch(function(){})}}catch(N){if(N&&A&&typeof N.stack=="string")return[N.stack,A.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],s=i[1];if(u&&s){var g=u.split(`
`),x=s.split(`
`);for(l=a=0;a<g.length&&!g[a].includes("DetermineComponentFrameRoot");)a++;for(;l<x.length&&!x[l].includes("DetermineComponentFrameRoot");)l++;if(a===g.length||l===x.length)for(a=g.length-1,l=x.length-1;1<=a&&0<=l&&g[a]!==x[l];)l--;for(;1<=a&&0<=l;a--,l--)if(g[a]!==x[l]){if(a!==1||l!==1)do if(a--,l--,0>l||g[a]!==x[l]){var _=`
`+g[a].replace(" at new "," at ");return t.displayName&&_.includes("<anonymous>")&&(_=_.replace("<anonymous>",t.displayName)),_}while(1<=a&&0<=l);break}}}finally{iu=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Mn(n):""}function pm(t,e){switch(t.tag){case 26:case 27:case 5:return Mn(t.type);case 16:return Mn("Lazy");case 13:return t.child!==e&&e!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return uu(t.type,!1);case 11:return uu(t.type.render,!1);case 1:return uu(t.type,!0);case 31:return Mn("Activity");default:return""}}function us(t){try{var e="",n=null;do e+=pm(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var cu=Object.prototype.hasOwnProperty,ru=r.unstable_scheduleCallback,su=r.unstable_cancelCallback,ym=r.unstable_shouldYield,vm=r.unstable_requestPaint,re=r.unstable_now,bm=r.unstable_getCurrentPriorityLevel,cs=r.unstable_ImmediatePriority,rs=r.unstable_UserBlockingPriority,Bl=r.unstable_NormalPriority,Sm=r.unstable_LowPriority,ss=r.unstable_IdlePriority,wm=r.log,Tm=r.unstable_setDisableYieldValue,ja=null,se=null;function nn(t){if(typeof wm=="function"&&Tm(t),se&&typeof se.setStrictMode=="function")try{se.setStrictMode(ja,t)}catch{}}var oe=Math.clz32?Math.clz32:Am,Em=Math.log,xm=Math.LN2;function Am(t){return t>>>=0,t===0?32:31-(Em(t)/xm|0)|0}var Ul=256,jl=262144,Ll=4194304;function Dn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ql(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var s=a&134217727;return s!==0?(a=s&~i,a!==0?l=Dn(a):(u&=s,u!==0?l=Dn(u):n||(n=s&~t,n!==0&&(l=Dn(n))))):(s=a&~i,s!==0?l=Dn(s):u!==0?l=Dn(u):n||(n=a&~t,n!==0&&(l=Dn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function La(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Nm(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function os(){var t=Ll;return Ll<<=1,(Ll&62914560)===0&&(Ll=4194304),t}function ou(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function qa(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Cm(t,e,n,a,l,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var s=t.entanglements,g=t.expirationTimes,x=t.hiddenUpdates;for(n=u&~n;0<n;){var _=31-oe(n),D=1<<_;s[_]=0,g[_]=-1;var A=x[_];if(A!==null)for(x[_]=null,_=0;_<A.length;_++){var N=A[_];N!==null&&(N.lane&=-536870913)}n&=~D}a!==0&&fs(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function fs(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-oe(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function ds(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-oe(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function hs(t,e){var n=e&-e;return n=(n&42)!==0?1:fu(n),(n&(t.suspendedLanes|e))!==0?0:n}function fu(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function du(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function ms(){var t=V.p;return t!==0?t:(t=window.event,t===void 0?32:eh(t.type))}function gs(t,e){var n=V.p;try{return V.p=t,e()}finally{V.p=n}}var an=Math.random().toString(36).slice(2),Kt="__reactFiber$"+an,ee="__reactProps$"+an,Wn="__reactContainer$"+an,hu="__reactEvents$"+an,_m="__reactListeners$"+an,Mm="__reactHandles$"+an,ps="__reactResources$"+an,Ya="__reactMarker$"+an;function mu(t){delete t[Kt],delete t[ee],delete t[hu],delete t[_m],delete t[Mm]}function $n(t){var e=t[Kt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[Kt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Ld(t);t!==null;){if(n=t[Kt])return n;t=Ld(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[Kt]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Ga(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(c(33))}function ta(t){var e=t[ps];return e||(e=t[ps]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Vt(t){t[Ya]=!0}var ys=new Set,vs={};function Rn(t,e){ea(t,e),ea(t+"Capture",e)}function ea(t,e){for(vs[t]=e,t=0;t<e.length;t++)ys.add(e[t])}var Dm=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),bs={},Ss={};function Rm(t){return cu.call(Ss,t)?!0:cu.call(bs,t)?!1:Dm.test(t)?Ss[t]=!0:(bs[t]=!0,!1)}function Yl(t,e,n){if(Rm(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Gl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function Ue(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ve(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ws(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function zm(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function gu(t){if(!t._valueTracker){var e=ws(t)?"checked":"value";t._valueTracker=zm(t,e,""+t[e])}}function Ts(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=ws(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Xl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Om=/[\n"\\]/g;function be(t){return t.replace(Om,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function pu(t,e,n,a,l,i,u,s){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ve(e)):t.value!==""+ve(e)&&(t.value=""+ve(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?yu(t,u,ve(e)):n!=null?yu(t,u,ve(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?t.name=""+ve(s):t.removeAttribute("name")}function Es(t,e,n,a,l,i,u,s){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){gu(t);return}n=n!=null?""+ve(n):"",e=e!=null?""+ve(e):n,s||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=s?t.checked:!!a,t.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),gu(t)}function yu(t,e,n){e==="number"&&Xl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function na(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ve(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function xs(t,e,n){if(e!=null&&(e=""+ve(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ve(n):""}function As(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(c(92));if(Lt(a)){if(1<a.length)throw Error(c(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ve(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),gu(t)}function aa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var km=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ns(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||km.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Cs(t,e,n){if(e!=null&&typeof e!="object")throw Error(c(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&Ns(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&Ns(t,i,e[i])}function vu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Hm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Bm=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ql(t){return Bm.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function je(){}var bu=null;function Su(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var la=null,ia=null;function _s(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[ee]||null;t:switch(t=e.stateNode,e.type){case"input":if(pu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[ee]||null;if(!l)throw Error(c(90));pu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&Ts(a)}break t;case"textarea":xs(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&na(t,!!n.multiple,e,!1)}}}var wu=!1;function Ms(t,e,n){if(wu)return t(e,n);wu=!0;try{var a=t(e);return a}finally{if(wu=!1,(la!==null||ia!==null)&&(Ri(),la&&(e=la,t=ia,ia=la=null,_s(e),t)))for(e=0;e<t.length;e++)_s(t[e])}}function Xa(t,e){var n=t.stateNode;if(n===null)return null;var a=n[ee]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(c(231,e,typeof n));return n}var Le=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Tu=!1;if(Le)try{var Qa={};Object.defineProperty(Qa,"passive",{get:function(){Tu=!0}}),window.addEventListener("test",Qa,Qa),window.removeEventListener("test",Qa,Qa)}catch{Tu=!1}var ln=null,Eu=null,Vl=null;function Ds(){if(Vl)return Vl;var t,e=Eu,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var u=n-t;for(a=1;a<=u&&e[n-a]===l[i-a];a++);return Vl=l.slice(t,1<a?1-a:void 0)}function Zl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Kl(){return!0}function Rs(){return!1}function ne(t){function e(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Kl:Rs,this.isPropagationStopped=Rs,this}return z(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Kl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Kl)},persist:function(){},isPersistent:Kl}),e}var zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=ne(zn),Va=z({},zn,{view:0,detail:0}),Um=ne(Va),xu,Au,Za,Il=z({},Va,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Za&&(Za&&t.type==="mousemove"?(xu=t.screenX-Za.screenX,Au=t.screenY-Za.screenY):Au=xu=0,Za=t),xu)},movementY:function(t){return"movementY"in t?t.movementY:Au}}),zs=ne(Il),jm=z({},Il,{dataTransfer:0}),Lm=ne(jm),qm=z({},Va,{relatedTarget:0}),Nu=ne(qm),Ym=z({},zn,{animationName:0,elapsedTime:0,pseudoElement:0}),Gm=ne(Ym),Xm=z({},zn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Qm=ne(Xm),Vm=z({},zn,{data:0}),Os=ne(Vm),Zm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Km={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Jm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Im(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Jm[t])?!!e[t]:!1}function Cu(){return Im}var Fm=z({},Va,{key:function(t){if(t.key){var e=Zm[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Km[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cu,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Wm=ne(Fm),$m=z({},Il,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ks=ne($m),Pm=z({},Va,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cu}),tg=ne(Pm),eg=z({},zn,{propertyName:0,elapsedTime:0,pseudoElement:0}),ng=ne(eg),ag=z({},Il,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),lg=ne(ag),ig=z({},zn,{newState:0,oldState:0}),ug=ne(ig),cg=[9,13,27,32],_u=Le&&"CompositionEvent"in window,Ka=null;Le&&"documentMode"in document&&(Ka=document.documentMode);var rg=Le&&"TextEvent"in window&&!Ka,Hs=Le&&(!_u||Ka&&8<Ka&&11>=Ka),Bs=" ",Us=!1;function js(t,e){switch(t){case"keyup":return cg.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ls(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ua=!1;function sg(t,e){switch(t){case"compositionend":return Ls(e);case"keypress":return e.which!==32?null:(Us=!0,Bs);case"textInput":return t=e.data,t===Bs&&Us?null:t;default:return null}}function og(t,e){if(ua)return t==="compositionend"||!_u&&js(t,e)?(t=Ds(),Vl=Eu=ln=null,ua=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Hs&&e.locale!=="ko"?null:e.data;default:return null}}var fg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qs(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!fg[t.type]:e==="textarea"}function Ys(t,e,n,a){la?ia?ia.push(a):ia=[a]:la=a,e=ji(e,"onChange"),0<e.length&&(n=new Jl("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Ja=null,Ia=null;function dg(t){Ad(t,0)}function Fl(t){var e=Ga(t);if(Ts(e))return t}function Gs(t,e){if(t==="change")return e}var Xs=!1;if(Le){var Mu;if(Le){var Du="oninput"in document;if(!Du){var Qs=document.createElement("div");Qs.setAttribute("oninput","return;"),Du=typeof Qs.oninput=="function"}Mu=Du}else Mu=!1;Xs=Mu&&(!document.documentMode||9<document.documentMode)}function Vs(){Ja&&(Ja.detachEvent("onpropertychange",Zs),Ia=Ja=null)}function Zs(t){if(t.propertyName==="value"&&Fl(Ia)){var e=[];Ys(e,Ia,t,Su(t)),Ms(dg,e)}}function hg(t,e,n){t==="focusin"?(Vs(),Ja=e,Ia=n,Ja.attachEvent("onpropertychange",Zs)):t==="focusout"&&Vs()}function mg(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Fl(Ia)}function gg(t,e){if(t==="click")return Fl(e)}function pg(t,e){if(t==="input"||t==="change")return Fl(e)}function yg(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var fe=typeof Object.is=="function"?Object.is:yg;function Fa(t,e){if(fe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!cu.call(e,l)||!fe(t[l],e[l]))return!1}return!0}function Ks(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Js(t,e){var n=Ks(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Ks(n)}}function Is(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Is(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Fs(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Xl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Xl(t.document)}return e}function Ru(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var vg=Le&&"documentMode"in document&&11>=document.documentMode,ca=null,zu=null,Wa=null,Ou=!1;function Ws(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ou||ca==null||ca!==Xl(a)||(a=ca,"selectionStart"in a&&Ru(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Wa&&Fa(Wa,a)||(Wa=a,a=ji(zu,"onSelect"),0<a.length&&(e=new Jl("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=ca)))}function On(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ra={animationend:On("Animation","AnimationEnd"),animationiteration:On("Animation","AnimationIteration"),animationstart:On("Animation","AnimationStart"),transitionrun:On("Transition","TransitionRun"),transitionstart:On("Transition","TransitionStart"),transitioncancel:On("Transition","TransitionCancel"),transitionend:On("Transition","TransitionEnd")},ku={},$s={};Le&&($s=document.createElement("div").style,"AnimationEvent"in window||(delete ra.animationend.animation,delete ra.animationiteration.animation,delete ra.animationstart.animation),"TransitionEvent"in window||delete ra.transitionend.transition);function kn(t){if(ku[t])return ku[t];if(!ra[t])return t;var e=ra[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in $s)return ku[t]=e[n];return t}var Ps=kn("animationend"),to=kn("animationiteration"),eo=kn("animationstart"),bg=kn("transitionrun"),Sg=kn("transitionstart"),wg=kn("transitioncancel"),no=kn("transitionend"),ao=new Map,Hu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Hu.push("scrollEnd");function _e(t,e){ao.set(t,e),Rn(e,[t])}var Wl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Se=[],sa=0,Bu=0;function $l(){for(var t=sa,e=Bu=sa=0;e<t;){var n=Se[e];Se[e++]=null;var a=Se[e];Se[e++]=null;var l=Se[e];Se[e++]=null;var i=Se[e];if(Se[e++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&lo(n,l,i)}}function Pl(t,e,n,a){Se[sa++]=t,Se[sa++]=e,Se[sa++]=n,Se[sa++]=a,Bu|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Uu(t,e,n,a){return Pl(t,e,n,a),ti(t)}function Hn(t,e){return Pl(t,null,null,e),ti(t)}function lo(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-oe(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function ti(t){if(50<bl)throw bl=0,Zc=null,Error(c(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var oa={};function Tg(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function de(t,e,n,a){return new Tg(t,e,n,a)}function ju(t){return t=t.prototype,!(!t||!t.isReactComponent)}function qe(t,e){var n=t.alternate;return n===null?(n=de(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function io(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ei(t,e,n,a,l,i){var u=0;if(a=t,typeof t=="function")ju(t)&&(u=1);else if(typeof t=="string")u=C0(t,n,I.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case Q:return t=de(31,n,e,l),t.elementType=Q,t.lanes=i,t;case Z:return Bn(n.children,l,i,e);case F:u=8,l|=24;break;case q:return t=de(12,n,e,l|2),t.elementType=q,t.lanes=i,t;case ot:return t=de(13,n,e,l),t.elementType=ot,t.lanes=i,t;case X:return t=de(19,n,e,l),t.elementType=X,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Y:u=10;break t;case B:u=9;break t;case K:u=11;break t;case j:u=14;break t;case U:u=16,a=null;break t}u=29,n=Error(c(130,t===null?"null":typeof t,"")),a=null}return e=de(u,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function Bn(t,e,n,a){return t=de(7,t,a,e),t.lanes=n,t}function Lu(t,e,n){return t=de(6,t,null,e),t.lanes=n,t}function uo(t){var e=de(18,null,null,0);return e.stateNode=t,e}function qu(t,e,n){return e=de(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var co=new WeakMap;function we(t,e){if(typeof t=="object"&&t!==null){var n=co.get(t);return n!==void 0?n:(e={value:t,source:e,stack:us(e)},co.set(t,e),e)}return{value:t,source:e,stack:us(e)}}var fa=[],da=0,ni=null,$a=0,Te=[],Ee=0,un=null,Re=1,ze="";function Ye(t,e){fa[da++]=$a,fa[da++]=ni,ni=t,$a=e}function ro(t,e,n){Te[Ee++]=Re,Te[Ee++]=ze,Te[Ee++]=un,un=t;var a=Re;t=ze;var l=32-oe(a)-1;a&=~(1<<l),n+=1;var i=32-oe(e)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,Re=1<<32-oe(e)+l|n<<l|a,ze=i+t}else Re=1<<i|n<<l|a,ze=t}function Yu(t){t.return!==null&&(Ye(t,1),ro(t,1,0))}function Gu(t){for(;t===ni;)ni=fa[--da],fa[da]=null,$a=fa[--da],fa[da]=null;for(;t===un;)un=Te[--Ee],Te[Ee]=null,ze=Te[--Ee],Te[Ee]=null,Re=Te[--Ee],Te[Ee]=null}function so(t,e){Te[Ee++]=Re,Te[Ee++]=ze,Te[Ee++]=un,Re=e.id,ze=e.overflow,un=t}var Jt=null,zt=null,vt=!1,cn=null,xe=!1,Xu=Error(c(519));function rn(t){var e=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Pa(we(e,t)),Xu}function oo(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[Kt]=t,e[ee]=a,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<wl.length;n++)mt(wl[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),Es(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),As(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||Md(e.textContent,n)?(a.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),a.onScroll!=null&&mt("scroll",e),a.onScrollEnd!=null&&mt("scrollend",e),a.onClick!=null&&(e.onclick=je),e=!0):e=!1,e||rn(t,!0)}function fo(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:xe=!1;return;case 27:case 3:xe=!0;return;default:Jt=Jt.return}}function ha(t){if(t!==Jt)return!1;if(!vt)return fo(t),vt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||cr(t.type,t.memoizedProps)),n=!n),n&&zt&&rn(t),fo(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));zt=jd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));zt=jd(t)}else e===27?(e=zt,Tn(t.type)?(t=dr,dr=null,zt=t):zt=e):zt=Jt?Ne(t.stateNode.nextSibling):null;return!0}function Un(){zt=Jt=null,vt=!1}function Qu(){var t=cn;return t!==null&&(ue===null?ue=t:ue.push.apply(ue,t),cn=null),t}function Pa(t){cn===null?cn=[t]:cn.push(t)}var Vu=b(null),jn=null,Ge=null;function sn(t,e,n){G(Vu,e._currentValue),e._currentValue=n}function Xe(t){t._currentValue=Vu.current,R(Vu)}function Zu(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Ku(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;t:for(;i!==null;){var s=i;i=l;for(var g=0;g<e.length;g++)if(s.context===e[g]){i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Zu(i.return,n,t),a||(u=null);break t}i=s.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(c(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Zu(u,n,t),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===t){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function ma(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(c(387));if(u=u.memoizedProps,u!==null){var s=l.type;fe(l.pendingProps.value,u.value)||(t!==null?t.push(s):t=[s])}}else if(l===dt.current){if(u=l.alternate,u===null)throw Error(c(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Nl):t=[Nl])}l=l.return}t!==null&&Ku(e,t,n,a),e.flags|=262144}function ai(t){for(t=t.firstContext;t!==null;){if(!fe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ln(t){jn=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function It(t){return ho(jn,t)}function li(t,e){return jn===null&&Ln(t),ho(t,e)}function ho(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ge===null){if(t===null)throw Error(c(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return n}var Eg=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},xg=r.unstable_scheduleCallback,Ag=r.unstable_NormalPriority,qt={$$typeof:Y,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ju(){return{controller:new Eg,data:new Map,refCount:0}}function tl(t){t.refCount--,t.refCount===0&&xg(Ag,function(){t.controller.abort()})}var el=null,Iu=0,ga=0,pa=null;function Ng(t,e){if(el===null){var n=el=[];Iu=0,ga=$c(),pa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Iu++,e.then(mo,mo),e}function mo(){if(--Iu===0&&el!==null){pa!==null&&(pa.status="fulfilled");var t=el;el=null,ga=0,pa=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Cg(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var go=C.S;C.S=function(t,e){Pf=re(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Ng(t,e),go!==null&&go(t,e)};var qn=b(null);function Fu(){var t=qn.current;return t!==null?t:Dt.pooledCache}function ii(t,e){e===null?G(qn,qn.current):G(qn,e.pool)}function po(){var t=Fu();return t===null?null:{parent:qt._currentValue,pool:t}}var ya=Error(c(460)),Wu=Error(c(474)),ui=Error(c(542)),ci={then:function(){}};function yo(t){return t=t.status,t==="fulfilled"||t==="rejected"}function vo(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(je,je),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,So(t),t;default:if(typeof e.status=="string")e.then(je,je);else{if(t=Dt,t!==null&&100<t.shellSuspendCounter)throw Error(c(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,So(t),t}throw Gn=e,ya}}function Yn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gn=n,ya):n}}var Gn=null;function bo(){if(Gn===null)throw Error(c(459));var t=Gn;return Gn=null,t}function So(t){if(t===ya||t===ui)throw Error(c(483))}var va=null,nl=0;function ri(t){var e=nl;return nl+=1,va===null&&(va=[]),vo(va,t,e)}function al(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function si(t,e){throw e.$$typeof===k?Error(c(525)):(t=Object.prototype.toString.call(e),Error(c(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function wo(t){function e(w,v){if(t){var E=w.deletions;E===null?(w.deletions=[v],w.flags|=16):E.push(v)}}function n(w,v){if(!t)return null;for(;v!==null;)e(w,v),v=v.sibling;return null}function a(w){for(var v=new Map;w!==null;)w.key!==null?v.set(w.key,w):v.set(w.index,w),w=w.sibling;return v}function l(w,v){return w=qe(w,v),w.index=0,w.sibling=null,w}function i(w,v,E){return w.index=E,t?(E=w.alternate,E!==null?(E=E.index,E<v?(w.flags|=67108866,v):E):(w.flags|=67108866,v)):(w.flags|=1048576,v)}function u(w){return t&&w.alternate===null&&(w.flags|=67108866),w}function s(w,v,E,M){return v===null||v.tag!==6?(v=Lu(E,w.mode,M),v.return=w,v):(v=l(v,E),v.return=w,v)}function g(w,v,E,M){var et=E.type;return et===Z?_(w,v,E.props.children,M,E.key):v!==null&&(v.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===U&&Yn(et)===v.type)?(v=l(v,E.props),al(v,E),v.return=w,v):(v=ei(E.type,E.key,E.props,null,w.mode,M),al(v,E),v.return=w,v)}function x(w,v,E,M){return v===null||v.tag!==4||v.stateNode.containerInfo!==E.containerInfo||v.stateNode.implementation!==E.implementation?(v=qu(E,w.mode,M),v.return=w,v):(v=l(v,E.children||[]),v.return=w,v)}function _(w,v,E,M,et){return v===null||v.tag!==7?(v=Bn(E,w.mode,M,et),v.return=w,v):(v=l(v,E),v.return=w,v)}function D(w,v,E){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Lu(""+v,w.mode,E),v.return=w,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case H:return E=ei(v.type,v.key,v.props,null,w.mode,E),al(E,v),E.return=w,E;case L:return v=qu(v,w.mode,E),v.return=w,v;case U:return v=Yn(v),D(w,v,E)}if(Lt(v)||W(v))return v=Bn(v,w.mode,E,null),v.return=w,v;if(typeof v.then=="function")return D(w,ri(v),E);if(v.$$typeof===Y)return D(w,li(w,v),E);si(w,v)}return null}function A(w,v,E,M){var et=v!==null?v.key:null;if(typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint")return et!==null?null:s(w,v,""+E,M);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case H:return E.key===et?g(w,v,E,M):null;case L:return E.key===et?x(w,v,E,M):null;case U:return E=Yn(E),A(w,v,E,M)}if(Lt(E)||W(E))return et!==null?null:_(w,v,E,M,null);if(typeof E.then=="function")return A(w,v,ri(E),M);if(E.$$typeof===Y)return A(w,v,li(w,E),M);si(w,E)}return null}function N(w,v,E,M,et){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return w=w.get(E)||null,s(v,w,""+M,et);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case H:return w=w.get(M.key===null?E:M.key)||null,g(v,w,M,et);case L:return w=w.get(M.key===null?E:M.key)||null,x(v,w,M,et);case U:return M=Yn(M),N(w,v,E,M,et)}if(Lt(M)||W(M))return w=w.get(E)||null,_(v,w,M,et,null);if(typeof M.then=="function")return N(w,v,E,ri(M),et);if(M.$$typeof===Y)return N(w,v,E,li(v,M),et);si(v,M)}return null}function J(w,v,E,M){for(var et=null,bt=null,$=v,st=v=0,pt=null;$!==null&&st<E.length;st++){$.index>st?(pt=$,$=null):pt=$.sibling;var St=A(w,$,E[st],M);if(St===null){$===null&&($=pt);break}t&&$&&St.alternate===null&&e(w,$),v=i(St,v,st),bt===null?et=St:bt.sibling=St,bt=St,$=pt}if(st===E.length)return n(w,$),vt&&Ye(w,st),et;if($===null){for(;st<E.length;st++)$=D(w,E[st],M),$!==null&&(v=i($,v,st),bt===null?et=$:bt.sibling=$,bt=$);return vt&&Ye(w,st),et}for($=a($);st<E.length;st++)pt=N($,w,st,E[st],M),pt!==null&&(t&&pt.alternate!==null&&$.delete(pt.key===null?st:pt.key),v=i(pt,v,st),bt===null?et=pt:bt.sibling=pt,bt=pt);return t&&$.forEach(function(Cn){return e(w,Cn)}),vt&&Ye(w,st),et}function lt(w,v,E,M){if(E==null)throw Error(c(151));for(var et=null,bt=null,$=v,st=v=0,pt=null,St=E.next();$!==null&&!St.done;st++,St=E.next()){$.index>st?(pt=$,$=null):pt=$.sibling;var Cn=A(w,$,St.value,M);if(Cn===null){$===null&&($=pt);break}t&&$&&Cn.alternate===null&&e(w,$),v=i(Cn,v,st),bt===null?et=Cn:bt.sibling=Cn,bt=Cn,$=pt}if(St.done)return n(w,$),vt&&Ye(w,st),et;if($===null){for(;!St.done;st++,St=E.next())St=D(w,St.value,M),St!==null&&(v=i(St,v,st),bt===null?et=St:bt.sibling=St,bt=St);return vt&&Ye(w,st),et}for($=a($);!St.done;st++,St=E.next())St=N($,w,st,St.value,M),St!==null&&(t&&St.alternate!==null&&$.delete(St.key===null?st:St.key),v=i(St,v,st),bt===null?et=St:bt.sibling=St,bt=St);return t&&$.forEach(function(j0){return e(w,j0)}),vt&&Ye(w,st),et}function Mt(w,v,E,M){if(typeof E=="object"&&E!==null&&E.type===Z&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case H:t:{for(var et=E.key;v!==null;){if(v.key===et){if(et=E.type,et===Z){if(v.tag===7){n(w,v.sibling),M=l(v,E.props.children),M.return=w,w=M;break t}}else if(v.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===U&&Yn(et)===v.type){n(w,v.sibling),M=l(v,E.props),al(M,E),M.return=w,w=M;break t}n(w,v);break}else e(w,v);v=v.sibling}E.type===Z?(M=Bn(E.props.children,w.mode,M,E.key),M.return=w,w=M):(M=ei(E.type,E.key,E.props,null,w.mode,M),al(M,E),M.return=w,w=M)}return u(w);case L:t:{for(et=E.key;v!==null;){if(v.key===et)if(v.tag===4&&v.stateNode.containerInfo===E.containerInfo&&v.stateNode.implementation===E.implementation){n(w,v.sibling),M=l(v,E.children||[]),M.return=w,w=M;break t}else{n(w,v);break}else e(w,v);v=v.sibling}M=qu(E,w.mode,M),M.return=w,w=M}return u(w);case U:return E=Yn(E),Mt(w,v,E,M)}if(Lt(E))return J(w,v,E,M);if(W(E)){if(et=W(E),typeof et!="function")throw Error(c(150));return E=et.call(E),lt(w,v,E,M)}if(typeof E.then=="function")return Mt(w,v,ri(E),M);if(E.$$typeof===Y)return Mt(w,v,li(w,E),M);si(w,E)}return typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint"?(E=""+E,v!==null&&v.tag===6?(n(w,v.sibling),M=l(v,E),M.return=w,w=M):(n(w,v),M=Lu(E,w.mode,M),M.return=w,w=M),u(w)):n(w,v)}return function(w,v,E,M){try{nl=0;var et=Mt(w,v,E,M);return va=null,et}catch($){if($===ya||$===ui)throw $;var bt=de(29,$,null,w.mode);return bt.lanes=M,bt.return=w,bt}finally{}}}var Xn=wo(!0),To=wo(!1),on=!1;function $u(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Pu(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(Tt&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=ti(t),lo(t,null,n),e}return Pl(t,a,e,n),ti(t)}function ll(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,ds(t,n)}}function tc(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var ec=!1;function il(){if(ec){var t=pa;if(t!==null)throw t}}function ul(t,e,n,a){ec=!1;var l=t.updateQueue;on=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var g=s,x=g.next;g.next=null,u===null?i=x:u.next=x,u=g;var _=t.alternate;_!==null&&(_=_.updateQueue,s=_.lastBaseUpdate,s!==u&&(s===null?_.firstBaseUpdate=x:s.next=x,_.lastBaseUpdate=g))}if(i!==null){var D=l.baseState;u=0,_=x=g=null,s=i;do{var A=s.lane&-536870913,N=A!==s.lane;if(N?(gt&A)===A:(a&A)===A){A!==0&&A===ga&&(ec=!0),_!==null&&(_=_.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});t:{var J=t,lt=s;A=e;var Mt=n;switch(lt.tag){case 1:if(J=lt.payload,typeof J=="function"){D=J.call(Mt,D,A);break t}D=J;break t;case 3:J.flags=J.flags&-65537|128;case 0:if(J=lt.payload,A=typeof J=="function"?J.call(Mt,D,A):J,A==null)break t;D=z({},D,A);break t;case 2:on=!0}}A=s.callback,A!==null&&(t.flags|=64,N&&(t.flags|=8192),N=l.callbacks,N===null?l.callbacks=[A]:N.push(A))}else N={lane:A,tag:s.tag,payload:s.payload,callback:s.callback,next:null},_===null?(x=_=N,g=D):_=_.next=N,u|=A;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;N=s,s=N.next,N.next=null,l.lastBaseUpdate=N,l.shared.pending=null}}while(!0);_===null&&(g=D),l.baseState=g,l.firstBaseUpdate=x,l.lastBaseUpdate=_,i===null&&(l.shared.lanes=0),yn|=u,t.lanes=u,t.memoizedState=D}}function Eo(t,e){if(typeof t!="function")throw Error(c(191,t));t.call(e)}function xo(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)Eo(n[t],e)}var ba=b(null),oi=b(0);function Ao(t,e){t=$e,G(oi,t),G(ba,e),$e=t|e.baseLanes}function nc(){G(oi,$e),G(ba,ba.current)}function ac(){$e=oi.current,R(ba),R(oi)}var he=b(null),Ae=null;function hn(t){var e=t.alternate;G(Ut,Ut.current&1),G(he,t),Ae===null&&(e===null||ba.current!==null||e.memoizedState!==null)&&(Ae=t)}function lc(t){G(Ut,Ut.current),G(he,t),Ae===null&&(Ae=t)}function No(t){t.tag===22?(G(Ut,Ut.current),G(he,t),Ae===null&&(Ae=t)):mn()}function mn(){G(Ut,Ut.current),G(he,he.current)}function me(t){R(he),Ae===t&&(Ae=null),R(Ut)}var Ut=b(0);function fi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||or(n)||fr(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Qe=0,rt=null,Ct=null,Yt=null,di=!1,Sa=!1,Qn=!1,hi=0,cl=0,wa=null,_g=0;function Ht(){throw Error(c(321))}function ic(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!fe(t[n],e[n]))return!1;return!0}function uc(t,e,n,a,l,i){return Qe=i,rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,C.H=t===null||t.memoizedState===null?of:wc,Qn=!1,i=n(a,l),Qn=!1,Sa&&(i=_o(e,n,a,l)),Co(t),i}function Co(t){C.H=ol;var e=Ct!==null&&Ct.next!==null;if(Qe=0,Yt=Ct=rt=null,di=!1,cl=0,wa=null,e)throw Error(c(300));t===null||Gt||(t=t.dependencies,t!==null&&ai(t)&&(Gt=!0))}function _o(t,e,n,a){rt=t;var l=0;do{if(Sa&&(wa=null),cl=0,Sa=!1,25<=l)throw Error(c(301));if(l+=1,Yt=Ct=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}C.H=ff,i=e(n,a)}while(Sa);return i}function Mg(){var t=C.H,e=t.useState()[0];return e=typeof e.then=="function"?rl(e):e,t=t.useState()[0],(Ct!==null?Ct.memoizedState:null)!==t&&(rt.flags|=1024),e}function cc(){var t=hi!==0;return hi=0,t}function rc(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function sc(t){if(di){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}di=!1}Qe=0,Yt=Ct=rt=null,Sa=!1,cl=hi=0,wa=null}function te(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Yt===null?rt.memoizedState=Yt=t:Yt=Yt.next=t,Yt}function jt(){if(Ct===null){var t=rt.alternate;t=t!==null?t.memoizedState:null}else t=Ct.next;var e=Yt===null?rt.memoizedState:Yt.next;if(e!==null)Yt=e,Ct=t;else{if(t===null)throw rt.alternate===null?Error(c(467)):Error(c(310));Ct=t,t={memoizedState:Ct.memoizedState,baseState:Ct.baseState,baseQueue:Ct.baseQueue,queue:Ct.queue,next:null},Yt===null?rt.memoizedState=Yt=t:Yt=Yt.next=t}return Yt}function mi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function rl(t){var e=cl;return cl+=1,wa===null&&(wa=[]),t=vo(wa,t,e),e=rt,(Yt===null?e.memoizedState:Yt.next)===null&&(e=e.alternate,C.H=e===null||e.memoizedState===null?of:wc),t}function gi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return rl(t);if(t.$$typeof===Y)return It(t)}throw Error(c(438,String(t)))}function oc(t){var e=null,n=rt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=rt.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=mi(),rt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=nt;return e.index++,n}function Ve(t,e){return typeof e=="function"?e(t):e}function pi(t){var e=jt();return fc(e,Ct,t)}function fc(t,e,n){var a=t.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var s=u=null,g=null,x=e,_=!1;do{var D=x.lane&-536870913;if(D!==x.lane?(gt&D)===D:(Qe&D)===D){var A=x.revertLane;if(A===0)g!==null&&(g=g.next={lane:0,revertLane:0,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),D===ga&&(_=!0);else if((Qe&A)===A){x=x.next,A===ga&&(_=!0);continue}else D={lane:0,revertLane:x.revertLane,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},g===null?(s=g=D,u=i):g=g.next=D,rt.lanes|=A,yn|=A;D=x.action,Qn&&n(i,D),i=x.hasEagerState?x.eagerState:n(i,D)}else A={lane:D,revertLane:x.revertLane,gesture:x.gesture,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},g===null?(s=g=A,u=i):g=g.next=A,rt.lanes|=D,yn|=D;x=x.next}while(x!==null&&x!==e);if(g===null?u=i:g.next=s,!fe(i,t.memoizedState)&&(Gt=!0,_&&(n=pa,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=g,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function dc(t){var e=jt(),n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=t(i,u.action),u=u.next;while(u!==l);fe(i,e.memoizedState)||(Gt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function Mo(t,e,n){var a=rt,l=jt(),i=vt;if(i){if(n===void 0)throw Error(c(407));n=n()}else n=e();var u=!fe((Ct||l).memoizedState,n);if(u&&(l.memoizedState=n,Gt=!0),l=l.queue,gc(zo.bind(null,a,l,t),[t]),l.getSnapshot!==e||u||Yt!==null&&Yt.memoizedState.tag&1){if(a.flags|=2048,Ta(9,{destroy:void 0},Ro.bind(null,a,l,n,e),null),Dt===null)throw Error(c(349));i||(Qe&127)!==0||Do(a,e,n)}return n}function Do(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=rt.updateQueue,e===null?(e=mi(),rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Ro(t,e,n,a){e.value=n,e.getSnapshot=a,Oo(e)&&ko(t)}function zo(t,e,n){return n(function(){Oo(e)&&ko(t)})}function Oo(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!fe(t,n)}catch{return!0}}function ko(t){var e=Hn(t,2);e!==null&&ce(e,t,2)}function hc(t){var e=te();if(typeof t=="function"){var n=t;if(t=n(),Qn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:t},e}function Ho(t,e,n,a){return t.baseState=n,fc(t,Ct,typeof a=="function"?a:Ve)}function Dg(t,e,n,a,l){if(bi(t))throw Error(c(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};C.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,Bo(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Bo(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=C.T,u={};C.T=u;try{var s=n(l,a),g=C.S;g!==null&&g(u,s),Uo(t,e,s)}catch(x){mc(t,e,x)}finally{i!==null&&u.types!==null&&(i.types=u.types),C.T=i}}else try{i=n(l,a),Uo(t,e,i)}catch(x){mc(t,e,x)}}function Uo(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){jo(t,e,a)},function(a){return mc(t,e,a)}):jo(t,e,n)}function jo(t,e,n){e.status="fulfilled",e.value=n,Lo(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Bo(t,n)))}function mc(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,Lo(e),e=e.next;while(e!==a)}t.action=null}function Lo(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function qo(t,e){return e}function Yo(t,e){if(vt){var n=Dt.formState;if(n!==null){t:{var a=rt;if(vt){if(zt){e:{for(var l=zt,i=xe;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ne(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){zt=Ne(l.nextSibling),a=l.data==="F!";break t}}rn(a)}a=!1}a&&(e=n[0])}}return n=te(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qo,lastRenderedState:e},n.queue=a,n=cf.bind(null,rt,a),a.dispatch=n,a=hc(!1),i=Sc.bind(null,rt,!1,a.queue),a=te(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=Dg.bind(null,rt,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Go(t){var e=jt();return Xo(e,Ct,t)}function Xo(t,e,n){if(e=fc(t,e,qo)[0],t=pi(Ve)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=rl(e)}catch(u){throw u===ya?ui:u}else a=e;e=jt();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(rt.flags|=2048,Ta(9,{destroy:void 0},Rg.bind(null,l,n),null)),[a,i,t]}function Rg(t,e){t.action=e}function Qo(t){var e=jt(),n=Ct;if(n!==null)return Xo(e,n,t);jt(),e=e.memoizedState,n=jt();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function Ta(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=rt.updateQueue,e===null&&(e=mi(),rt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Vo(){return jt().memoizedState}function yi(t,e,n,a){var l=te();rt.flags|=t,l.memoizedState=Ta(1|e,{destroy:void 0},n,a===void 0?null:a)}function vi(t,e,n,a){var l=jt();a=a===void 0?null:a;var i=l.memoizedState.inst;Ct!==null&&a!==null&&ic(a,Ct.memoizedState.deps)?l.memoizedState=Ta(e,i,n,a):(rt.flags|=t,l.memoizedState=Ta(1|e,i,n,a))}function Zo(t,e){yi(8390656,8,t,e)}function gc(t,e){vi(2048,8,t,e)}function zg(t){rt.flags|=4;var e=rt.updateQueue;if(e===null)e=mi(),rt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Ko(t){var e=jt().memoizedState;return zg({ref:e,nextImpl:t}),function(){if((Tt&2)!==0)throw Error(c(440));return e.impl.apply(void 0,arguments)}}function Jo(t,e){return vi(4,2,t,e)}function Io(t,e){return vi(4,4,t,e)}function Fo(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Wo(t,e,n){n=n!=null?n.concat([t]):null,vi(4,4,Fo.bind(null,e,t),n)}function pc(){}function $o(t,e){var n=jt();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&ic(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function Po(t,e){var n=jt();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&ic(e,a[1]))return a[0];if(a=t(),Qn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function yc(t,e,n){return n===void 0||(Qe&1073741824)!==0&&(gt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=ed(),rt.lanes|=t,yn|=t,n)}function tf(t,e,n,a){return fe(n,e)?n:ba.current!==null?(t=yc(t,n,a),fe(t,e)||(Gt=!0),t):(Qe&42)===0||(Qe&1073741824)!==0&&(gt&261930)===0?(Gt=!0,t.memoizedState=n):(t=ed(),rt.lanes|=t,yn|=t,e)}function ef(t,e,n,a,l){var i=V.p;V.p=i!==0&&8>i?i:8;var u=C.T,s={};C.T=s,Sc(t,!1,e,n);try{var g=l(),x=C.S;if(x!==null&&x(s,g),g!==null&&typeof g=="object"&&typeof g.then=="function"){var _=Cg(g,a);sl(t,e,_,ye(t))}else sl(t,e,a,ye(t))}catch(D){sl(t,e,{then:function(){},status:"rejected",reason:D},ye())}finally{V.p=i,u!==null&&s.types!==null&&(u.types=s.types),C.T=u}}function Og(){}function vc(t,e,n,a){if(t.tag!==5)throw Error(c(476));var l=nf(t).queue;ef(t,l,e,at,n===null?Og:function(){return af(t),n(a)})}function nf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:at,baseState:at,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:at},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function af(t){var e=nf(t);e.next===null&&(e=t.alternate.memoizedState),sl(t,e.next.queue,{},ye())}function bc(){return It(Nl)}function lf(){return jt().memoizedState}function uf(){return jt().memoizedState}function kg(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var a=dn(e,t,n);a!==null&&(ce(a,e,n),ll(a,e,n)),e={cache:Ju()},t.payload=e;return}e=e.return}}function Hg(t,e,n){var a=ye();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},bi(t)?rf(e,n):(n=Uu(t,e,n,a),n!==null&&(ce(n,t,a),sf(n,e,a)))}function cf(t,e,n){var a=ye();sl(t,e,n,a)}function sl(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(bi(t))rf(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,s=i(u,n);if(l.hasEagerState=!0,l.eagerState=s,fe(s,u))return Pl(t,e,l,0),Dt===null&&$l(),!1}catch{}finally{}if(n=Uu(t,e,l,a),n!==null)return ce(n,t,a),sf(n,e,a),!0}return!1}function Sc(t,e,n,a){if(a={lane:2,revertLane:$c(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},bi(t)){if(e)throw Error(c(479))}else e=Uu(t,n,a,2),e!==null&&ce(e,t,2)}function bi(t){var e=t.alternate;return t===rt||e!==null&&e===rt}function rf(t,e){Sa=di=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function sf(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,ds(t,n)}}var ol={readContext:It,use:gi,useCallback:Ht,useContext:Ht,useEffect:Ht,useImperativeHandle:Ht,useLayoutEffect:Ht,useInsertionEffect:Ht,useMemo:Ht,useReducer:Ht,useRef:Ht,useState:Ht,useDebugValue:Ht,useDeferredValue:Ht,useTransition:Ht,useSyncExternalStore:Ht,useId:Ht,useHostTransitionStatus:Ht,useFormState:Ht,useActionState:Ht,useOptimistic:Ht,useMemoCache:Ht,useCacheRefresh:Ht};ol.useEffectEvent=Ht;var of={readContext:It,use:gi,useCallback:function(t,e){return te().memoizedState=[t,e===void 0?null:e],t},useContext:It,useEffect:Zo,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,yi(4194308,4,Fo.bind(null,e,t),n)},useLayoutEffect:function(t,e){return yi(4194308,4,t,e)},useInsertionEffect:function(t,e){yi(4,2,t,e)},useMemo:function(t,e){var n=te();e=e===void 0?null:e;var a=t();if(Qn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=te();if(n!==void 0){var l=n(e);if(Qn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=Hg.bind(null,rt,t),[a.memoizedState,t]},useRef:function(t){var e=te();return t={current:t},e.memoizedState=t},useState:function(t){t=hc(t);var e=t.queue,n=cf.bind(null,rt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:pc,useDeferredValue:function(t,e){var n=te();return yc(n,t,e)},useTransition:function(){var t=hc(!1);return t=ef.bind(null,rt,t.queue,!0,!1),te().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=rt,l=te();if(vt){if(n===void 0)throw Error(c(407));n=n()}else{if(n=e(),Dt===null)throw Error(c(349));(gt&127)!==0||Do(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,Zo(zo.bind(null,a,i,t),[t]),a.flags|=2048,Ta(9,{destroy:void 0},Ro.bind(null,a,i,n,e),null),n},useId:function(){var t=te(),e=Dt.identifierPrefix;if(vt){var n=ze,a=Re;n=(a&~(1<<32-oe(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=hi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=_g++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:bc,useFormState:Yo,useActionState:Yo,useOptimistic:function(t){var e=te();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Sc.bind(null,rt,!0,n),n.dispatch=e,[t,e]},useMemoCache:oc,useCacheRefresh:function(){return te().memoizedState=kg.bind(null,rt)},useEffectEvent:function(t){var e=te(),n={impl:t};return e.memoizedState=n,function(){if((Tt&2)!==0)throw Error(c(440));return n.impl.apply(void 0,arguments)}}},wc={readContext:It,use:gi,useCallback:$o,useContext:It,useEffect:gc,useImperativeHandle:Wo,useInsertionEffect:Jo,useLayoutEffect:Io,useMemo:Po,useReducer:pi,useRef:Vo,useState:function(){return pi(Ve)},useDebugValue:pc,useDeferredValue:function(t,e){var n=jt();return tf(n,Ct.memoizedState,t,e)},useTransition:function(){var t=pi(Ve)[0],e=jt().memoizedState;return[typeof t=="boolean"?t:rl(t),e]},useSyncExternalStore:Mo,useId:lf,useHostTransitionStatus:bc,useFormState:Go,useActionState:Go,useOptimistic:function(t,e){var n=jt();return Ho(n,Ct,t,e)},useMemoCache:oc,useCacheRefresh:uf};wc.useEffectEvent=Ko;var ff={readContext:It,use:gi,useCallback:$o,useContext:It,useEffect:gc,useImperativeHandle:Wo,useInsertionEffect:Jo,useLayoutEffect:Io,useMemo:Po,useReducer:dc,useRef:Vo,useState:function(){return dc(Ve)},useDebugValue:pc,useDeferredValue:function(t,e){var n=jt();return Ct===null?yc(n,t,e):tf(n,Ct.memoizedState,t,e)},useTransition:function(){var t=dc(Ve)[0],e=jt().memoizedState;return[typeof t=="boolean"?t:rl(t),e]},useSyncExternalStore:Mo,useId:lf,useHostTransitionStatus:bc,useFormState:Qo,useActionState:Qo,useOptimistic:function(t,e){var n=jt();return Ct!==null?Ho(n,Ct,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:oc,useCacheRefresh:uf};ff.useEffectEvent=Ko;function Tc(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:z({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ec={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(ce(e,t,a),ll(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(ce(e,t,a),ll(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(ce(e,t,n),ll(e,t,n))}};function df(t,e,n,a,l,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,u):e.prototype&&e.prototype.isPureReactComponent?!Fa(n,a)||!Fa(l,i):!0}function hf(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&Ec.enqueueReplaceState(e,e.state,null)}function Vn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=z({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function mf(t){Wl(t)}function gf(t){console.error(t)}function pf(t){Wl(t)}function Si(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function yf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function xc(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){Si(t,e)},n}function vf(t){return t=fn(t),t.tag=3,t}function bf(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){yf(e,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){yf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var s=a.stack;this.componentDidCatch(a.value,{componentStack:s!==null?s:""})})}function Bg(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&ma(e,n,l,!0),n=he.current,n!==null){switch(n.tag){case 31:case 13:return Ae===null?zi():n.alternate===null&&Bt===0&&(Bt=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===ci?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Ic(t,a,l)),!1;case 22:return n.flags|=65536,a===ci?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Ic(t,a,l)),!1}throw Error(c(435,n.tag))}return Ic(t,a,l),zi(),!1}if(vt)return e=he.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Xu&&(t=Error(c(422),{cause:a}),Pa(we(t,n)))):(a!==Xu&&(e=Error(c(423),{cause:a}),Pa(we(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=we(a,n),l=xc(t.stateNode,a,l),tc(t,l),Bt!==4&&(Bt=2)),!1;var i=Error(c(520),{cause:a});if(i=we(i,n),vl===null?vl=[i]:vl.push(i),Bt!==4&&(Bt=2),e===null)return!0;a=we(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=xc(n.stateNode,a,t),tc(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=vf(l),bf(l,t,n,a),tc(n,l),!1}n=n.return}while(n!==null);return!1}var Ac=Error(c(461)),Gt=!1;function Ft(t,e,n,a){e.child=t===null?To(e,null,n,a):Xn(e,t.child,n,a)}function Sf(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var u={};for(var s in a)s!=="ref"&&(u[s]=a[s])}else u=a;return Ln(e),a=uc(t,e,n,u,i,l),s=cc(),t!==null&&!Gt?(rc(t,e,l),Ze(t,e,l)):(vt&&s&&Yu(e),e.flags|=1,Ft(t,e,a,l),e.child)}function wf(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!ju(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,Tf(t,e,i,a,l)):(t=ei(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Oc(t,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Fa,n(u,a)&&t.ref===e.ref)return Ze(t,e,l)}return e.flags|=1,t=qe(i,a),t.ref=e.ref,t.return=e,e.child=t}function Tf(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if(Fa(i,a)&&t.ref===e.ref)if(Gt=!1,e.pendingProps=a=i,Oc(t,l))(t.flags&131072)!==0&&(Gt=!0);else return e.lanes=t.lanes,Ze(t,e,l)}return Nc(t,e,n,a,l)}function Ef(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return xf(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&ii(e,i!==null?i.cachePool:null),i!==null?Ao(e,i):nc(),No(e);else return a=e.lanes=536870912,xf(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(ii(e,i.cachePool),Ao(e,i),mn(),e.memoizedState=null):(t!==null&&ii(e,null),nc(),mn());return Ft(t,e,l,n),e.child}function fl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function xf(t,e,n,a,l){var i=Fu();return i=i===null?null:{parent:qt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&ii(e,null),nc(),No(e),t!==null&&ma(t,e,a,!0),e.childLanes=l,null}function wi(t,e){return e=Ei({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Af(t,e,n){return Xn(e,t.child,null,n),t=wi(e,e.pendingProps),t.flags|=2,me(e),e.memoizedState=null,t}function Ug(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(vt){if(a.mode==="hidden")return t=wi(e,a),e.lanes=536870912,fl(null,t);if(lc(e),(t=zt)?(t=Ud(t,xe),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Re,overflow:ze}:null,retryLane:536870912,hydrationErrors:null},n=uo(t),n.return=e,e.child=n,Jt=e,zt=null)):t=null,t===null)throw rn(e);return e.lanes=536870912,null}return wi(e,a)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(lc(e),l)if(e.flags&256)e.flags&=-257,e=Af(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(c(558));else if(Gt||ma(t,e,n,!1),l=(n&t.childLanes)!==0,Gt||l){if(a=Dt,a!==null&&(u=hs(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Hn(t,u),ce(a,t,u),Ac;zi(),e=Af(t,e,n)}else t=i.treeContext,zt=Ne(u.nextSibling),Jt=e,vt=!0,cn=null,xe=!1,t!==null&&so(e,t),e=wi(e,a),e.flags|=4096;return e}return t=qe(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ti(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(c(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Nc(t,e,n,a,l){return Ln(e),n=uc(t,e,n,a,void 0,l),a=cc(),t!==null&&!Gt?(rc(t,e,l),Ze(t,e,l)):(vt&&a&&Yu(e),e.flags|=1,Ft(t,e,n,l),e.child)}function Nf(t,e,n,a,l,i){return Ln(e),e.updateQueue=null,n=_o(e,a,n,l),Co(t),a=cc(),t!==null&&!Gt?(rc(t,e,i),Ze(t,e,i)):(vt&&a&&Yu(e),e.flags|=1,Ft(t,e,n,i),e.child)}function Cf(t,e,n,a,l){if(Ln(e),e.stateNode===null){var i=oa,u=n.contextType;typeof u=="object"&&u!==null&&(i=It(u)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ec,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},$u(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?It(u):oa,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(Tc(e,n,u,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Ec.enqueueReplaceState(i,i.state,null),ul(e,a,i,l),il(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var s=e.memoizedProps,g=Vn(n,s);i.props=g;var x=i.context,_=n.contextType;u=oa,typeof _=="object"&&_!==null&&(u=It(_));var D=n.getDerivedStateFromProps;_=typeof D=="function"||typeof i.getSnapshotBeforeUpdate=="function",s=e.pendingProps!==s,_||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s||x!==u)&&hf(e,i,a,u),on=!1;var A=e.memoizedState;i.state=A,ul(e,a,i,l),il(),x=e.memoizedState,s||A!==x||on?(typeof D=="function"&&(Tc(e,n,D,a),x=e.memoizedState),(g=on||df(e,n,g,a,A,x,u))?(_||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=x),i.props=a,i.state=x,i.context=u,a=g):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,Pu(t,e),u=e.memoizedProps,_=Vn(n,u),i.props=_,D=e.pendingProps,A=i.context,x=n.contextType,g=oa,typeof x=="object"&&x!==null&&(g=It(x)),s=n.getDerivedStateFromProps,(x=typeof s=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==D||A!==g)&&hf(e,i,a,g),on=!1,A=e.memoizedState,i.state=A,ul(e,a,i,l),il();var N=e.memoizedState;u!==D||A!==N||on||t!==null&&t.dependencies!==null&&ai(t.dependencies)?(typeof s=="function"&&(Tc(e,n,s,a),N=e.memoizedState),(_=on||df(e,n,_,a,A,N,g)||t!==null&&t.dependencies!==null&&ai(t.dependencies))?(x||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,N,g),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,N,g)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=N),i.props=a,i.state=N,i.context=g,a=_):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,Ti(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Xn(e,t.child,null,l),e.child=Xn(e,null,n,l)):Ft(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ze(t,e,l),t}function _f(t,e,n,a){return Un(),e.flags|=256,Ft(t,e,n,a),e.child}var Cc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function _c(t){return{baseLanes:t,cachePool:po()}}function Mc(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pe),t}function Mf(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(Ut.current&2)!==0),u&&(l=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(vt){if(l?hn(e):mn(),(t=zt)?(t=Ud(t,xe),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Re,overflow:ze}:null,retryLane:536870912,hydrationErrors:null},n=uo(t),n.return=e,e.child=n,Jt=e,zt=null)):t=null,t===null)throw rn(e);return fr(t)?e.lanes=32:e.lanes=536870912,null}var s=a.children;return a=a.fallback,l?(mn(),l=e.mode,s=Ei({mode:"hidden",children:s},l),a=Bn(a,l,n,null),s.return=e,a.return=e,s.sibling=a,e.child=s,a=e.child,a.memoizedState=_c(n),a.childLanes=Mc(t,u,n),e.memoizedState=Cc,fl(null,a)):(hn(e),Dc(e,s))}var g=t.memoizedState;if(g!==null&&(s=g.dehydrated,s!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=Rc(t,e,n)):e.memoizedState!==null?(mn(),e.child=t.child,e.flags|=128,e=null):(mn(),s=a.fallback,l=e.mode,a=Ei({mode:"visible",children:a.children},l),s=Bn(s,l,n,null),s.flags|=2,a.return=e,s.return=e,a.sibling=s,e.child=a,Xn(e,t.child,null,n),a=e.child,a.memoizedState=_c(n),a.childLanes=Mc(t,u,n),e.memoizedState=Cc,e=fl(null,a));else if(hn(e),fr(s)){if(u=s.nextSibling&&s.nextSibling.dataset,u)var x=u.dgst;u=x,a=Error(c(419)),a.stack="",a.digest=u,Pa({value:a,source:null,stack:null}),e=Rc(t,e,n)}else if(Gt||ma(t,e,n,!1),u=(n&t.childLanes)!==0,Gt||u){if(u=Dt,u!==null&&(a=hs(u,n),a!==0&&a!==g.retryLane))throw g.retryLane=a,Hn(t,a),ce(u,t,a),Ac;or(s)||zi(),e=Rc(t,e,n)}else or(s)?(e.flags|=192,e.child=t.child,e=null):(t=g.treeContext,zt=Ne(s.nextSibling),Jt=e,vt=!0,cn=null,xe=!1,t!==null&&so(e,t),e=Dc(e,a.children),e.flags|=4096);return e}return l?(mn(),s=a.fallback,l=e.mode,g=t.child,x=g.sibling,a=qe(g,{mode:"hidden",children:a.children}),a.subtreeFlags=g.subtreeFlags&65011712,x!==null?s=qe(x,s):(s=Bn(s,l,n,null),s.flags|=2),s.return=e,a.return=e,a.sibling=s,e.child=a,fl(null,a),a=e.child,s=t.child.memoizedState,s===null?s=_c(n):(l=s.cachePool,l!==null?(g=qt._currentValue,l=l.parent!==g?{parent:g,pool:g}:l):l=po(),s={baseLanes:s.baseLanes|n,cachePool:l}),a.memoizedState=s,a.childLanes=Mc(t,u,n),e.memoizedState=Cc,fl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=qe(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function Dc(t,e){return e=Ei({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ei(t,e){return t=de(22,t,null,e),t.lanes=0,t}function Rc(t,e,n){return Xn(e,t.child,null,n),t=Dc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Df(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Zu(t.return,e,n)}function zc(t,e,n,a,l,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function Rf(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=Ut.current,s=(u&2)!==0;if(s?(u=u&1|2,e.flags|=128):u&=1,G(Ut,u),Ft(t,e,a,n),a=vt?$a:0,!s&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Df(t,n,e);else if(t.tag===19)Df(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&fi(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),zc(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&fi(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}zc(e,!0,n,null,i,a);break;case"together":zc(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ma(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(c(153));if(e.child!==null){for(t=e.child,n=qe(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=qe(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Oc(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ai(t)))}function jg(t,e,n){switch(e.tag){case 3:Rt(e,e.stateNode.containerInfo),sn(e,qt,t.memoizedState.cache),Un();break;case 27:case 5:Be(e);break;case 4:Rt(e,e.stateNode.containerInfo);break;case 10:sn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,lc(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Mf(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(ma(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return Rf(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),G(Ut,Ut.current),a)break;return null;case 22:return e.lanes=0,Ef(t,e,n,e.pendingProps);case 24:sn(e,qt,t.memoizedState.cache)}return Ze(t,e,n)}function zf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Gt=!0;else{if(!Oc(t,n)&&(e.flags&128)===0)return Gt=!1,jg(t,e,n);Gt=(t.flags&131072)!==0}else Gt=!1,vt&&(e.flags&1048576)!==0&&ro(e,$a,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=Yn(e.elementType),e.type=t,typeof t=="function")ju(t)?(a=Vn(t,a),e.tag=1,e=Cf(null,e,t,a,n)):(e.tag=0,e=Nc(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===K){e.tag=11,e=Sf(null,e,t,a,n);break t}else if(l===j){e.tag=14,e=wf(null,e,t,a,n);break t}}throw e=it(t)||t,Error(c(306,e,""))}}return e;case 0:return Nc(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Vn(a,e.pendingProps),Cf(t,e,a,l,n);case 3:t:{if(Rt(e,e.stateNode.containerInfo),t===null)throw Error(c(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,Pu(t,e),ul(e,a,null,n);var u=e.memoizedState;if(a=u.cache,sn(e,qt,a),a!==i.cache&&Ku(e,[qt],n,!0),il(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=_f(t,e,a,n);break t}else if(a!==l){l=we(Error(c(424)),e),Pa(l),e=_f(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(zt=Ne(t.firstChild),Jt=e,vt=!0,cn=null,xe=!0,n=To(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Un(),a===l){e=Ze(t,e,n);break t}Ft(t,e,a,n)}e=e.child}return e;case 26:return Ti(t,e),t===null?(n=Xd(e.type,null,e.pendingProps,null))?e.memoizedState=n:vt||(n=e.type,t=e.pendingProps,a=Li(ft.current).createElement(n),a[Kt]=e,a[ee]=t,Wt(a,n,t),Vt(a),e.stateNode=a):e.memoizedState=Xd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Be(e),t===null&&vt&&(a=e.stateNode=qd(e.type,e.pendingProps,ft.current),Jt=e,xe=!0,l=zt,Tn(e.type)?(dr=l,zt=Ne(a.firstChild)):zt=l),Ft(t,e,e.pendingProps.children,n),Ti(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&vt&&((l=a=zt)&&(a=m0(a,e.type,e.pendingProps,xe),a!==null?(e.stateNode=a,Jt=e,zt=Ne(a.firstChild),xe=!1,l=!0):l=!1),l||rn(e)),Be(e),l=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,a=i.children,cr(l,i)?a=null:u!==null&&cr(l,u)&&(e.flags|=32),e.memoizedState!==null&&(l=uc(t,e,Mg,null,null,n),Nl._currentValue=l),Ti(t,e),Ft(t,e,a,n),e.child;case 6:return t===null&&vt&&((t=n=zt)&&(n=g0(n,e.pendingProps,xe),n!==null?(e.stateNode=n,Jt=e,zt=null,t=!0):t=!1),t||rn(e)),null;case 13:return Mf(t,e,n);case 4:return Rt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Xn(e,null,a,n):Ft(t,e,a,n),e.child;case 11:return Sf(t,e,e.type,e.pendingProps,n);case 7:return Ft(t,e,e.pendingProps,n),e.child;case 8:return Ft(t,e,e.pendingProps.children,n),e.child;case 12:return Ft(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,sn(e,e.type,a.value),Ft(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,Ln(e),l=It(l),a=a(l),e.flags|=1,Ft(t,e,a,n),e.child;case 14:return wf(t,e,e.type,e.pendingProps,n);case 15:return Tf(t,e,e.type,e.pendingProps,n);case 19:return Rf(t,e,n);case 31:return Ug(t,e,n);case 22:return Ef(t,e,n,e.pendingProps);case 24:return Ln(e),a=It(qt),t===null?(l=Fu(),l===null&&(l=Dt,i=Ju(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},$u(e),sn(e,qt,l)):((t.lanes&n)!==0&&(Pu(t,e),ul(e,null,null,n),il()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),sn(e,qt,a)):(a=i.cache,sn(e,qt,a),a!==l.cache&&Ku(e,[qt],n,!0))),Ft(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(c(156,e.tag))}function Ke(t){t.flags|=4}function kc(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(id())t.flags|=8192;else throw Gn=ci,Wu}else t.flags&=-16777217}function Of(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Jd(e))if(id())t.flags|=8192;else throw Gn=ci,Wu}function xi(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?os():536870912,t.lanes|=e,Na|=e)}function dl(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function Ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Lg(t,e,n){var a=e.pendingProps;switch(Gu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(e),null;case 1:return Ot(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Xe(qt),Nt(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ha(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Qu())),Ot(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(Ot(e),Of(e,i)):(Ot(e),kc(e,l,null,a,n))):i?i!==t.memoizedState?(Ke(e),Ot(e),Of(e,i)):(Ot(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ke(e),Ot(e),kc(e,l,t,a,n)),null;case 27:if(Hl(e),n=ft.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}t=I.current,ha(e)?oo(e):(t=qd(l,a,n),e.stateNode=t,Ke(e))}return Ot(e),null;case 5:if(Hl(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}if(i=I.current,ha(e))oo(e);else{var u=Li(ft.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[Kt]=e,i[ee]=a;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch(Wt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ke(e)}}return Ot(e),kc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(c(166));if(t=ft.current,ha(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Jt,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[Kt]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Md(t.nodeValue,n)),t||rn(e,!0)}else t=Li(t).createTextNode(a),t[Kt]=e,e.stateNode=t}return Ot(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ha(e),n!==null){if(t===null){if(!a)throw Error(c(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(557));t[Kt]=e}else Un(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),t=!1}else n=Qu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(me(e),e):(me(e),null);if((e.flags&128)!==0)throw Error(c(558))}return Ot(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ha(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(c(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(c(317));l[Kt]=e}else Un(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),l=!1}else l=Qu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(me(e),e):(me(e),null)}return me(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),xi(e,e.updateQueue),Ot(e),null);case 4:return Nt(),t===null&&nr(e.stateNode.containerInfo),Ot(e),null;case 10:return Xe(e.type),Ot(e),null;case 19:if(R(Ut),a=e.memoizedState,a===null)return Ot(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)dl(a,!1);else{if(Bt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=fi(t),i!==null){for(e.flags|=128,dl(a,!1),t=i.updateQueue,e.updateQueue=t,xi(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)io(n,t),n=n.sibling;return G(Ut,Ut.current&1|2),vt&&Ye(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&re()>Mi&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304)}else{if(!l)if(t=fi(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,xi(e,t),dl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!vt)return Ot(e),null}else 2*re()-a.renderingStartTime>Mi&&n!==536870912&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=re(),t.sibling=null,n=Ut.current,G(Ut,l?n&1|2:n&1),vt&&Ye(e,a.treeForkCount),t):(Ot(e),null);case 22:case 23:return me(e),ac(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(Ot(e),e.subtreeFlags&6&&(e.flags|=8192)):Ot(e),n=e.updateQueue,n!==null&&xi(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&R(qn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Xe(qt),Ot(e),null;case 25:return null;case 30:return null}throw Error(c(156,e.tag))}function qg(t,e){switch(Gu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Xe(qt),Nt(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Hl(e),null;case 31:if(e.memoizedState!==null){if(me(e),e.alternate===null)throw Error(c(340));Un()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(me(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(c(340));Un()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return R(Ut),null;case 4:return Nt(),null;case 10:return Xe(e.type),null;case 22:case 23:return me(e),ac(),t!==null&&R(qn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Xe(qt),null;case 25:return null;default:return null}}function kf(t,e){switch(Gu(e),e.tag){case 3:Xe(qt),Nt();break;case 26:case 27:case 5:Hl(e);break;case 4:Nt();break;case 31:e.memoizedState!==null&&me(e);break;case 13:me(e);break;case 19:R(Ut);break;case 10:Xe(e.type);break;case 22:case 23:me(e),ac(),t!==null&&R(qn);break;case 24:Xe(qt)}}function hl(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(s){At(e,e.return,s)}}function gn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var u=a.inst,s=u.destroy;if(s!==void 0){u.destroy=void 0,l=e;var g=n,x=s;try{x()}catch(_){At(l,g,_)}}}a=a.next}while(a!==i)}}catch(_){At(e,e.return,_)}}function Hf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{xo(e,n)}catch(a){At(t,t.return,a)}}}function Bf(t,e,n){n.props=Vn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){At(t,e,a)}}function ml(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){At(t,e,l)}}function Oe(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){At(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){At(t,e,l)}else n.current=null}function Uf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){At(t,t.return,l)}}function Hc(t,e,n){try{var a=t.stateNode;r0(a,t.type,n,e),a[ee]=e}catch(l){At(t,t.return,l)}}function jf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Tn(t.type)||t.tag===4}function Bc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||jf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Tn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Uc(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=je));else if(a!==4&&(a===27&&Tn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Uc(t,e,n),t=t.sibling;t!==null;)Uc(t,e,n),t=t.sibling}function Ai(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&Tn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ai(t,e,n),t=t.sibling;t!==null;)Ai(t,e,n),t=t.sibling}function Lf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);Wt(e,a,n),e[Kt]=t,e[ee]=n}catch(i){At(t,t.return,i)}}var Je=!1,Xt=!1,jc=!1,qf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function Yg(t,e){if(t=t.containerInfo,ir=Zi,t=Fs(t),Ru(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,s=-1,g=-1,x=0,_=0,D=t,A=null;e:for(;;){for(var N;D!==n||l!==0&&D.nodeType!==3||(s=u+l),D!==i||a!==0&&D.nodeType!==3||(g=u+a),D.nodeType===3&&(u+=D.nodeValue.length),(N=D.firstChild)!==null;)A=D,D=N;for(;;){if(D===t)break e;if(A===n&&++x===l&&(s=u),A===i&&++_===a&&(g=u),(N=D.nextSibling)!==null)break;D=A,A=D.parentNode}D=N}n=s===-1||g===-1?null:{start:s,end:g}}else n=null}n=n||{start:0,end:0}}else n=null;for(ur={focusedElem:t,selectionRange:n},Zi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var J=Vn(n.type,l);t=a.getSnapshotBeforeUpdate(J,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(lt){At(n,n.return,lt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)sr(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":sr(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(c(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function Yf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Fe(t,n),a&4&&hl(5,n);break;case 1:if(Fe(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){At(n,n.return,u)}else{var l=Vn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){At(n,n.return,u)}}a&64&&Hf(n),a&512&&ml(n,n.return);break;case 3:if(Fe(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{xo(t,e)}catch(u){At(n,n.return,u)}}break;case 27:e===null&&a&4&&Lf(n);case 26:case 5:Fe(t,n),e===null&&a&4&&Uf(n),a&512&&ml(n,n.return);break;case 12:Fe(t,n);break;case 31:Fe(t,n),a&4&&Qf(t,n);break;case 13:Fe(t,n),a&4&&Vf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Fg.bind(null,n),p0(t,n))));break;case 22:if(a=n.memoizedState!==null||Je,!a){e=e!==null&&e.memoizedState!==null||Xt,l=Je;var i=Xt;Je=a,(Xt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Fe(t,n),Je=l,Xt=i}break;case 30:break;default:Fe(t,n)}}function Gf(t){var e=t.alternate;e!==null&&(t.alternate=null,Gf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&mu(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var kt=null,ae=!1;function Ie(t,e,n){for(n=n.child;n!==null;)Xf(t,e,n),n=n.sibling}function Xf(t,e,n){if(se&&typeof se.onCommitFiberUnmount=="function")try{se.onCommitFiberUnmount(ja,n)}catch{}switch(n.tag){case 26:Xt||Oe(n,e),Ie(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Xt||Oe(n,e);var a=kt,l=ae;Tn(n.type)&&(kt=n.stateNode,ae=!1),Ie(t,e,n),El(n.stateNode),kt=a,ae=l;break;case 5:Xt||Oe(n,e);case 6:if(a=kt,l=ae,kt=null,Ie(t,e,n),kt=a,ae=l,kt!==null)if(ae)try{(kt.nodeType===9?kt.body:kt.nodeName==="HTML"?kt.ownerDocument.body:kt).removeChild(n.stateNode)}catch(i){At(n,e,i)}else try{kt.removeChild(n.stateNode)}catch(i){At(n,e,i)}break;case 18:kt!==null&&(ae?(t=kt,Hd(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ka(t)):Hd(kt,n.stateNode));break;case 4:a=kt,l=ae,kt=n.stateNode.containerInfo,ae=!0,Ie(t,e,n),kt=a,ae=l;break;case 0:case 11:case 14:case 15:gn(2,n,e),Xt||gn(4,n,e),Ie(t,e,n);break;case 1:Xt||(Oe(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Bf(n,e,a)),Ie(t,e,n);break;case 21:Ie(t,e,n);break;case 22:Xt=(a=Xt)||n.memoizedState!==null,Ie(t,e,n),Xt=a;break;default:Ie(t,e,n)}}function Qf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ka(t)}catch(n){At(e,e.return,n)}}}function Vf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ka(t)}catch(n){At(e,e.return,n)}}function Gg(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new qf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new qf),e;default:throw Error(c(435,t.tag))}}function Ni(t,e){var n=Gg(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=Wg.bind(null,t,a);a.then(l,l)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,u=e,s=u;t:for(;s!==null;){switch(s.tag){case 27:if(Tn(s.type)){kt=s.stateNode,ae=!1;break t}break;case 5:kt=s.stateNode,ae=!1;break t;case 3:case 4:kt=s.stateNode.containerInfo,ae=!0;break t}s=s.return}if(kt===null)throw Error(c(160));Xf(i,u,l),kt=null,ae=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Zf(e,t),e=e.sibling}var Me=null;function Zf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ie(t),a&4&&(gn(3,t,t.return),hl(3,t),gn(5,t,t.return));break;case 1:le(e,t),ie(t),a&512&&(Xt||n===null||Oe(n,n.return)),a&64&&Je&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Me;if(le(e,t),ie(t),a&512&&(Xt||n===null||Oe(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Ya]||i[Kt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),Wt(i,a,n),i[Kt]=t,Vt(i),a=i;break t;case"link":var u=Zd("link","href",l).get(a+(n.href||""));if(u){for(var s=0;s<u.length;s++)if(i=u[s],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(s,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;case"meta":if(u=Zd("meta","content",l).get(a+(n.content||""))){for(s=0;s<u.length;s++)if(i=u[s],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(s,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;default:throw Error(c(468,a))}i[Kt]=t,Vt(i),a=i}t.stateNode=a}else Kd(l,t.type,t.stateNode);else t.stateNode=Vd(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Kd(l,t.type,t.stateNode):Vd(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Hc(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ie(t),a&512&&(Xt||n===null||Oe(n,n.return)),n!==null&&a&4&&Hc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ie(t),a&512&&(Xt||n===null||Oe(n,n.return)),t.flags&32){l=t.stateNode;try{aa(l,"")}catch(J){At(t,t.return,J)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,Hc(t,l,n!==null?n.memoizedProps:l)),a&1024&&(jc=!0);break;case 6:if(le(e,t),ie(t),a&4){if(t.stateNode===null)throw Error(c(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(J){At(t,t.return,J)}}break;case 3:if(Gi=null,l=Me,Me=qi(e.containerInfo),le(e,t),Me=l,ie(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ka(e.containerInfo)}catch(J){At(t,t.return,J)}jc&&(jc=!1,Kf(t));break;case 4:a=Me,Me=qi(t.stateNode.containerInfo),le(e,t),ie(t),Me=a;break;case 12:le(e,t),ie(t);break;case 31:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ni(t,a)));break;case 13:le(e,t),ie(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(_i=re()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ni(t,a)));break;case 22:l=t.memoizedState!==null;var g=n!==null&&n.memoizedState!==null,x=Je,_=Xt;if(Je=x||l,Xt=_||g,le(e,t),Xt=_,Je=x,ie(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||g||Je||Xt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){g=n=e;try{if(i=g.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{s=g.stateNode;var D=g.memoizedProps.style,A=D!=null&&D.hasOwnProperty("display")?D.display:null;s.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(J){At(g,g.return,J)}}}else if(e.tag===6){if(n===null){g=e;try{g.stateNode.nodeValue=l?"":g.memoizedProps}catch(J){At(g,g.return,J)}}}else if(e.tag===18){if(n===null){g=e;try{var N=g.stateNode;l?Bd(N,!0):Bd(g.stateNode,!1)}catch(J){At(g,g.return,J)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ni(t,n))));break;case 19:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ni(t,a)));break;case 30:break;case 21:break;default:le(e,t),ie(t)}}function ie(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(jf(a)){n=a;break}a=a.return}if(n==null)throw Error(c(160));switch(n.tag){case 27:var l=n.stateNode,i=Bc(t);Ai(t,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(aa(u,""),n.flags&=-33);var s=Bc(t);Ai(t,s,u);break;case 3:case 4:var g=n.stateNode.containerInfo,x=Bc(t);Uc(t,x,g);break;default:throw Error(c(161))}}catch(_){At(t,t.return,_)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Kf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Kf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Fe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Yf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:gn(4,e,e.return),Zn(e);break;case 1:Oe(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Bf(e,e.return,n),Zn(e);break;case 27:El(e.stateNode);case 26:case 5:Oe(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(l,i,n),hl(4,i);break;case 1:if(We(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(x){At(a,a.return,x)}if(a=i,l=a.updateQueue,l!==null){var s=a.stateNode;try{var g=l.shared.hiddenCallbacks;if(g!==null)for(l.shared.hiddenCallbacks=null,l=0;l<g.length;l++)Eo(g[l],s)}catch(x){At(a,a.return,x)}}n&&u&64&&Hf(i),ml(i,i.return);break;case 27:Lf(i);case 26:case 5:We(l,i,n),n&&a===null&&u&4&&Uf(i),ml(i,i.return);break;case 12:We(l,i,n);break;case 31:We(l,i,n),n&&u&4&&Qf(l,i);break;case 13:We(l,i,n),n&&u&4&&Vf(l,i);break;case 22:i.memoizedState===null&&We(l,i,n),ml(i,i.return);break;case 30:break;default:We(l,i,n)}e=e.sibling}}function Lc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&tl(n))}function qc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t))}function De(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Jf(t,e,n,a),e=e.sibling}function Jf(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:De(t,e,n,a),l&2048&&hl(9,e);break;case 1:De(t,e,n,a);break;case 3:De(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t)));break;case 12:if(l&2048){De(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,s=i.onPostCommit;typeof s=="function"&&s(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(g){At(e,e.return,g)}}else De(t,e,n,a);break;case 31:De(t,e,n,a);break;case 13:De(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?De(t,e,n,a):gl(t,e):i._visibility&2?De(t,e,n,a):(i._visibility|=2,Ea(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&Lc(u,e);break;case 24:De(t,e,n,a),l&2048&&qc(e.alternate,e);break;default:De(t,e,n,a)}}function Ea(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,s=n,g=a,x=u.flags;switch(u.tag){case 0:case 11:case 15:Ea(i,u,s,g,l),hl(8,u);break;case 23:break;case 22:var _=u.stateNode;u.memoizedState!==null?_._visibility&2?Ea(i,u,s,g,l):gl(i,u):(_._visibility|=2,Ea(i,u,s,g,l)),l&&x&2048&&Lc(u.alternate,u);break;case 24:Ea(i,u,s,g,l),l&&x&2048&&qc(u.alternate,u);break;default:Ea(i,u,s,g,l)}e=e.sibling}}function gl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:gl(n,a),l&2048&&Lc(a.alternate,a);break;case 24:gl(n,a),l&2048&&qc(a.alternate,a);break;default:gl(n,a)}e=e.sibling}}var pl=8192;function xa(t,e,n){if(t.subtreeFlags&pl)for(t=t.child;t!==null;)If(t,e,n),t=t.sibling}function If(t,e,n){switch(t.tag){case 26:xa(t,e,n),t.flags&pl&&t.memoizedState!==null&&_0(n,Me,t.memoizedState,t.memoizedProps);break;case 5:xa(t,e,n);break;case 3:case 4:var a=Me;Me=qi(t.stateNode.containerInfo),xa(t,e,n),Me=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=pl,pl=16777216,xa(t,e,n),pl=a):xa(t,e,n));break;default:xa(t,e,n)}}function Ff(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function yl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,$f(a,t)}Ff(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Wf(t),t=t.sibling}function Wf(t){switch(t.tag){case 0:case 11:case 15:yl(t),t.flags&2048&&gn(9,t,t.return);break;case 3:yl(t);break;case 12:yl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ci(t)):yl(t);break;default:yl(t)}}function Ci(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,$f(a,t)}Ff(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:gn(8,e,e.return),Ci(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ci(e));break;default:Ci(e)}t=t.sibling}}function $f(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:gn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:tl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Zt=a;else t:for(n=t;Zt!==null;){a=Zt;var l=a.sibling,i=a.return;if(Gf(a),a===n){Zt=null;break t}if(l!==null){l.return=i,Zt=l;break t}Zt=i}}}var Xg={getCacheForType:function(t){var e=It(qt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return It(qt).controller.signal}},Qg=typeof WeakMap=="function"?WeakMap:Map,Tt=0,Dt=null,ht=null,gt=0,xt=0,ge=null,pn=!1,Aa=!1,Yc=!1,$e=0,Bt=0,yn=0,Kn=0,Gc=0,pe=0,Na=0,vl=null,ue=null,Xc=!1,_i=0,Pf=0,Mi=1/0,Di=null,vn=null,Qt=0,bn=null,Ca=null,Pe=0,Qc=0,Vc=null,td=null,bl=0,Zc=null;function ye(){return(Tt&2)!==0&&gt!==0?gt&-gt:C.T!==null?$c():ms()}function ed(){if(pe===0)if((gt&536870912)===0||vt){var t=jl;jl<<=1,(jl&3932160)===0&&(jl=262144),pe=t}else pe=536870912;return t=he.current,t!==null&&(t.flags|=32),pe}function ce(t,e,n){(t===Dt&&(xt===2||xt===9)||t.cancelPendingCommit!==null)&&(_a(t,0),Sn(t,gt,pe,!1)),qa(t,n),((Tt&2)===0||t!==Dt)&&(t===Dt&&((Tt&2)===0&&(Kn|=n),Bt===4&&Sn(t,gt,pe,!1)),ke(t))}function nd(t,e,n){if((Tt&6)!==0)throw Error(c(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||La(t,e),l=a?Kg(t,e):Jc(t,e,!0),i=a;do{if(l===0){Aa&&!a&&Sn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!Vg(n)){l=Jc(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var s=t;l=vl;var g=s.current.memoizedState.isDehydrated;if(g&&(_a(s,u).flags|=256),u=Jc(s,u,!1),u!==2){if(Yc&&!g){s.errorRecoveryDisabledLanes|=i,Kn|=i,l=4;break t}i=ue,ue=l,i!==null&&(ue===null?ue=i:ue.push.apply(ue,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){_a(t,0),Sn(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(c(345));case 4:if((e&4194048)!==e)break;case 6:Sn(a,e,pe,!pn);break t;case 2:ue=null;break;case 3:case 5:break;default:throw Error(c(329))}if((e&62914560)===e&&(l=_i+300-re(),10<l)){if(Sn(a,e,pe,!pn),ql(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=Od(ad.bind(null,a,n,ue,Di,Xc,e,pe,Kn,Na,pn,i,"Throttled",-0,0),l);break t}ad(a,n,ue,Di,Xc,e,pe,Kn,Na,pn,i,null,-0,0)}}break}while(!0);ke(t)}function ad(t,e,n,a,l,i,u,s,g,x,_,D,A,N){if(t.timeoutHandle=-1,D=e.subtreeFlags,D&8192||(D&16785408)===16785408){D={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:je},If(e,i,D);var J=(i&62914560)===i?_i-re():(i&4194048)===i?Pf-re():0;if(J=M0(D,J),J!==null){Pe=i,t.cancelPendingCommit=J(fd.bind(null,t,e,i,n,a,l,u,s,g,_,D,null,A,N)),Sn(t,i,u,!x);return}}fd(t,e,i,n,a,l,u,s,g)}function Vg(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!fe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Sn(t,e,n,a){e&=~Gc,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-oe(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&fs(t,n,e)}function Ri(){return(Tt&6)===0?(Sl(0),!1):!0}function Kc(){if(ht!==null){if(xt===0)var t=ht.return;else t=ht,Ge=jn=null,sc(t),va=null,nl=0,t=ht;for(;t!==null;)kf(t.alternate,t),t=t.return;ht=null}}function _a(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,f0(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Kc(),Dt=t,ht=n=qe(t.current,null),gt=e,xt=0,ge=null,pn=!1,Aa=La(t,e),Yc=!1,Na=pe=Gc=Kn=yn=Bt=0,ue=vl=null,Xc=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-oe(a),i=1<<l;e|=t[l],a&=~i}return $e=e,$l(),n}function ld(t,e){rt=null,C.H=ol,e===ya||e===ui?(e=bo(),xt=3):e===Wu?(e=bo(),xt=4):xt=e===Ac?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,ge=e,ht===null&&(Bt=1,Si(t,we(e,t.current)))}function id(){var t=he.current;return t===null?!0:(gt&4194048)===gt?Ae===null:(gt&62914560)===gt||(gt&536870912)!==0?t===Ae:!1}function ud(){var t=C.H;return C.H=ol,t===null?ol:t}function cd(){var t=C.A;return C.A=Xg,t}function zi(){Bt=4,pn||(gt&4194048)!==gt&&he.current!==null||(Aa=!0),(yn&134217727)===0&&(Kn&134217727)===0||Dt===null||Sn(Dt,gt,pe,!1)}function Jc(t,e,n){var a=Tt;Tt|=2;var l=ud(),i=cd();(Dt!==t||gt!==e)&&(Di=null,_a(t,e)),e=!1;var u=Bt;t:do try{if(xt!==0&&ht!==null){var s=ht,g=ge;switch(xt){case 8:Kc(),u=6;break t;case 3:case 2:case 9:case 6:he.current===null&&(e=!0);var x=xt;if(xt=0,ge=null,Ma(t,s,g,x),n&&Aa){u=0;break t}break;default:x=xt,xt=0,ge=null,Ma(t,s,g,x)}}Zg(),u=Bt;break}catch(_){ld(t,_)}while(!0);return e&&t.shellSuspendCounter++,Ge=jn=null,Tt=a,C.H=l,C.A=i,ht===null&&(Dt=null,gt=0,$l()),u}function Zg(){for(;ht!==null;)rd(ht)}function Kg(t,e){var n=Tt;Tt|=2;var a=ud(),l=cd();Dt!==t||gt!==e?(Di=null,Mi=re()+500,_a(t,e)):Aa=La(t,e);t:do try{if(xt!==0&&ht!==null){e=ht;var i=ge;e:switch(xt){case 1:xt=0,ge=null,Ma(t,e,i,1);break;case 2:case 9:if(yo(i)){xt=0,ge=null,sd(e);break}e=function(){xt!==2&&xt!==9||Dt!==t||(xt=7),ke(t)},i.then(e,e);break t;case 3:xt=7;break t;case 4:xt=5;break t;case 7:yo(i)?(xt=0,ge=null,sd(e)):(xt=0,ge=null,Ma(t,e,i,7));break;case 5:var u=null;switch(ht.tag){case 26:u=ht.memoizedState;case 5:case 27:var s=ht;if(u?Jd(u):s.stateNode.complete){xt=0,ge=null;var g=s.sibling;if(g!==null)ht=g;else{var x=s.return;x!==null?(ht=x,Oi(x)):ht=null}break e}}xt=0,ge=null,Ma(t,e,i,5);break;case 6:xt=0,ge=null,Ma(t,e,i,6);break;case 8:Kc(),Bt=6;break t;default:throw Error(c(462))}}Jg();break}catch(_){ld(t,_)}while(!0);return Ge=jn=null,C.H=a,C.A=l,Tt=n,ht!==null?0:(Dt=null,gt=0,$l(),Bt)}function Jg(){for(;ht!==null&&!ym();)rd(ht)}function rd(t){var e=zf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?Oi(t):ht=e}function sd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Nf(n,e,e.pendingProps,e.type,void 0,gt);break;case 11:e=Nf(n,e,e.pendingProps,e.type.render,e.ref,gt);break;case 5:sc(e);default:kf(n,e),e=ht=io(e,$e),e=zf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?Oi(t):ht=e}function Ma(t,e,n,a){Ge=jn=null,sc(e),va=null,nl=0;var l=e.return;try{if(Bg(t,l,e,n,gt)){Bt=1,Si(t,we(n,t.current)),ht=null;return}}catch(i){if(l!==null)throw ht=l,i;Bt=1,Si(t,we(n,t.current)),ht=null;return}e.flags&32768?(vt||a===1?t=!0:Aa||(gt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=he.current,a!==null&&a.tag===13&&(a.flags|=16384))),od(e,t)):Oi(e)}function Oi(t){var e=t;do{if((e.flags&32768)!==0){od(e,pn);return}t=e.return;var n=Lg(e.alternate,e,$e);if(n!==null){ht=n;return}if(e=e.sibling,e!==null){ht=e;return}ht=e=t}while(e!==null);Bt===0&&(Bt=5)}function od(t,e){do{var n=qg(t.alternate,t);if(n!==null){n.flags&=32767,ht=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){ht=t;return}ht=t=n}while(t!==null);Bt=6,ht=null}function fd(t,e,n,a,l,i,u,s,g){t.cancelPendingCommit=null;do ki();while(Qt!==0);if((Tt&6)!==0)throw Error(c(327));if(e!==null){if(e===t.current)throw Error(c(177));if(i=e.lanes|e.childLanes,i|=Bu,Cm(t,n,i,u,s,g),t===Dt&&(ht=Dt=null,gt=0),Ca=e,bn=t,Pe=n,Qc=i,Vc=l,td=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,$g(Bl,function(){return pd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=C.T,C.T=null,l=V.p,V.p=2,u=Tt,Tt|=4;try{Yg(t,e,n)}finally{Tt=u,V.p=l,C.T=a}}Qt=1,dd(),hd(),md()}}function dd(){if(Qt===1){Qt=0;var t=bn,e=Ca,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=C.T,C.T=null;var a=V.p;V.p=2;var l=Tt;Tt|=4;try{Zf(e,t);var i=ur,u=Fs(t.containerInfo),s=i.focusedElem,g=i.selectionRange;if(u!==s&&s&&s.ownerDocument&&Is(s.ownerDocument.documentElement,s)){if(g!==null&&Ru(s)){var x=g.start,_=g.end;if(_===void 0&&(_=x),"selectionStart"in s)s.selectionStart=x,s.selectionEnd=Math.min(_,s.value.length);else{var D=s.ownerDocument||document,A=D&&D.defaultView||window;if(A.getSelection){var N=A.getSelection(),J=s.textContent.length,lt=Math.min(g.start,J),Mt=g.end===void 0?lt:Math.min(g.end,J);!N.extend&&lt>Mt&&(u=Mt,Mt=lt,lt=u);var w=Js(s,lt),v=Js(s,Mt);if(w&&v&&(N.rangeCount!==1||N.anchorNode!==w.node||N.anchorOffset!==w.offset||N.focusNode!==v.node||N.focusOffset!==v.offset)){var E=D.createRange();E.setStart(w.node,w.offset),N.removeAllRanges(),lt>Mt?(N.addRange(E),N.extend(v.node,v.offset)):(E.setEnd(v.node,v.offset),N.addRange(E))}}}}for(D=[],N=s;N=N.parentNode;)N.nodeType===1&&D.push({element:N,left:N.scrollLeft,top:N.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<D.length;s++){var M=D[s];M.element.scrollLeft=M.left,M.element.scrollTop=M.top}}Zi=!!ir,ur=ir=null}finally{Tt=l,V.p=a,C.T=n}}t.current=e,Qt=2}}function hd(){if(Qt===2){Qt=0;var t=bn,e=Ca,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=C.T,C.T=null;var a=V.p;V.p=2;var l=Tt;Tt|=4;try{Yf(t,e.alternate,e)}finally{Tt=l,V.p=a,C.T=n}}Qt=3}}function md(){if(Qt===4||Qt===3){Qt=0,vm();var t=bn,e=Ca,n=Pe,a=td;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Qt=5:(Qt=0,Ca=bn=null,gd(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),du(n),e=e.stateNode,se&&typeof se.onCommitFiberRoot=="function")try{se.onCommitFiberRoot(ja,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=C.T,l=V.p,V.p=2,C.T=null;try{for(var i=t.onRecoverableError,u=0;u<a.length;u++){var s=a[u];i(s.value,{componentStack:s.stack})}}finally{C.T=e,V.p=l}}(Pe&3)!==0&&ki(),ke(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Zc?bl++:(bl=0,Zc=t):bl=0,Sl(0)}}function gd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,tl(e)))}function ki(){return dd(),hd(),md(),pd()}function pd(){if(Qt!==5)return!1;var t=bn,e=Qc;Qc=0;var n=du(Pe),a=C.T,l=V.p;try{V.p=32>n?32:n,C.T=null,n=Vc,Vc=null;var i=bn,u=Pe;if(Qt=0,Ca=bn=null,Pe=0,(Tt&6)!==0)throw Error(c(331));var s=Tt;if(Tt|=4,Wf(i.current),Jf(i,i.current,u,n),Tt=s,Sl(0,!1),se&&typeof se.onPostCommitFiberRoot=="function")try{se.onPostCommitFiberRoot(ja,i)}catch{}return!0}finally{V.p=l,C.T=a,gd(t,e)}}function yd(t,e,n){e=we(n,e),e=xc(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(qa(t,2),ke(t))}function At(t,e,n){if(t.tag===3)yd(t,t,n);else for(;e!==null;){if(e.tag===3){yd(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=we(n,t),n=vf(2),a=dn(e,n,2),a!==null&&(bf(n,a,e,t),qa(a,2),ke(a));break}}e=e.return}}function Ic(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new Qg;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Yc=!0,l.add(n),t=Ig.bind(null,t,e,n),e.then(t,t))}function Ig(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Dt===t&&(gt&n)===n&&(Bt===4||Bt===3&&(gt&62914560)===gt&&300>re()-_i?(Tt&2)===0&&_a(t,0):Gc|=n,Na===gt&&(Na=0)),ke(t)}function vd(t,e){e===0&&(e=os()),t=Hn(t,e),t!==null&&(qa(t,e),ke(t))}function Fg(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),vd(t,n)}function Wg(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(c(314))}a!==null&&a.delete(e),vd(t,n)}function $g(t,e){return ru(t,e)}var Hi=null,Da=null,Fc=!1,Bi=!1,Wc=!1,wn=0;function ke(t){t!==Da&&t.next===null&&(Da===null?Hi=Da=t:Da=Da.next=t),Bi=!0,Fc||(Fc=!0,t0())}function Sl(t,e){if(!Wc&&Bi){Wc=!0;do for(var n=!1,a=Hi;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,s=a.pingedLanes;i=(1<<31-oe(42|t)+1)-1,i&=l&~(u&~s),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Td(a,i))}else i=gt,i=ql(a,a===Dt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||La(a,i)||(n=!0,Td(a,i));a=a.next}while(n);Wc=!1}}function Pg(){bd()}function bd(){Bi=Fc=!1;var t=0;wn!==0&&o0()&&(t=wn);for(var e=re(),n=null,a=Hi;a!==null;){var l=a.next,i=Sd(a,e);i===0?(a.next=null,n===null?Hi=l:n.next=l,l===null&&(Da=n)):(n=a,(t!==0||(i&3)!==0)&&(Bi=!0)),a=l}Qt!==0&&Qt!==5||Sl(t),wn!==0&&(wn=0)}function Sd(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-oe(i),s=1<<u,g=l[u];g===-1?((s&n)===0||(s&a)!==0)&&(l[u]=Nm(s,e)):g<=e&&(t.expiredLanes|=s),i&=~s}if(e=Dt,n=gt,n=ql(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(xt===2||xt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&su(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||La(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&su(a),du(n)){case 2:case 8:n=rs;break;case 32:n=Bl;break;case 268435456:n=ss;break;default:n=Bl}return a=wd.bind(null,t),n=ru(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&su(a),t.callbackPriority=2,t.callbackNode=null,2}function wd(t,e){if(Qt!==0&&Qt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(ki()&&t.callbackNode!==n)return null;var a=gt;return a=ql(t,t===Dt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(nd(t,a,e),Sd(t,re()),t.callbackNode!=null&&t.callbackNode===n?wd.bind(null,t):null)}function Td(t,e){if(ki())return null;nd(t,e,!0)}function t0(){d0(function(){(Tt&6)!==0?ru(cs,Pg):bd()})}function $c(){if(wn===0){var t=ga;t===0&&(t=Ul,Ul<<=1,(Ul&261888)===0&&(Ul=256)),wn=t}return wn}function Ed(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ql(""+t)}function xd(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function e0(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=Ed((l[ee]||null).action),u=a.submitter;u&&(e=(e=u[ee]||null)?Ed(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var s=new Jl("action","action",null,a,l);t.push({event:s,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(wn!==0){var g=u?xd(l,u):new FormData(l);vc(n,{pending:!0,data:g,method:l.method,action:i},null,g)}}else typeof i=="function"&&(s.preventDefault(),g=u?xd(l,u):new FormData(l),vc(n,{pending:!0,data:g,method:l.method,action:i},i,g))},currentTarget:l}]})}}for(var Pc=0;Pc<Hu.length;Pc++){var tr=Hu[Pc],n0=tr.toLowerCase(),a0=tr[0].toUpperCase()+tr.slice(1);_e(n0,"on"+a0)}_e(Ps,"onAnimationEnd"),_e(to,"onAnimationIteration"),_e(eo,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(bg,"onTransitionRun"),_e(Sg,"onTransitionStart"),_e(wg,"onTransitionCancel"),_e(no,"onTransitionEnd"),ea("onMouseEnter",["mouseout","mouseover"]),ea("onMouseLeave",["mouseout","mouseover"]),ea("onPointerEnter",["pointerout","pointerover"]),ea("onPointerLeave",["pointerout","pointerover"]),Rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Rn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),l0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wl));function Ad(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var u=a.length-1;0<=u;u--){var s=a[u],g=s.instance,x=s.currentTarget;if(s=s.listener,g!==i&&l.isPropagationStopped())break t;i=s,l.currentTarget=x;try{i(l)}catch(_){Wl(_)}l.currentTarget=null,i=g}else for(u=0;u<a.length;u++){if(s=a[u],g=s.instance,x=s.currentTarget,s=s.listener,g!==i&&l.isPropagationStopped())break t;i=s,l.currentTarget=x;try{i(l)}catch(_){Wl(_)}l.currentTarget=null,i=g}}}}function mt(t,e){var n=e[hu];n===void 0&&(n=e[hu]=new Set);var a=t+"__bubble";n.has(a)||(Nd(e,t,2,!1),n.add(a))}function er(t,e,n){var a=0;e&&(a|=4),Nd(n,t,a,e)}var Ui="_reactListening"+Math.random().toString(36).slice(2);function nr(t){if(!t[Ui]){t[Ui]=!0,ys.forEach(function(n){n!=="selectionchange"&&(l0.has(n)||er(n,!1,t),er(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ui]||(e[Ui]=!0,er("selectionchange",!1,e))}}function Nd(t,e,n,a){switch(eh(e)){case 2:var l=z0;break;case 8:l=O0;break;default:l=yr}n=l.bind(null,e,n,t),l=void 0,!Tu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function ar(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var s=a.stateNode.containerInfo;if(s===l)break;if(u===4)for(u=a.return;u!==null;){var g=u.tag;if((g===3||g===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;s!==null;){if(u=$n(s),u===null)return;if(g=u.tag,g===5||g===6||g===26||g===27){a=i=u;continue t}s=s.parentNode}}a=a.return}Ms(function(){var x=i,_=Su(n),D=[];t:{var A=ao.get(t);if(A!==void 0){var N=Jl,J=t;switch(t){case"keypress":if(Zl(n)===0)break t;case"keydown":case"keyup":N=Wm;break;case"focusin":J="focus",N=Nu;break;case"focusout":J="blur",N=Nu;break;case"beforeblur":case"afterblur":N=Nu;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=zs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=Lm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=tg;break;case Ps:case to:case eo:N=Gm;break;case no:N=ng;break;case"scroll":case"scrollend":N=Um;break;case"wheel":N=lg;break;case"copy":case"cut":case"paste":N=Qm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=ks;break;case"toggle":case"beforetoggle":N=ug}var lt=(e&4)!==0,Mt=!lt&&(t==="scroll"||t==="scrollend"),w=lt?A!==null?A+"Capture":null:A;lt=[];for(var v=x,E;v!==null;){var M=v;if(E=M.stateNode,M=M.tag,M!==5&&M!==26&&M!==27||E===null||w===null||(M=Xa(v,w),M!=null&&lt.push(Tl(v,M,E))),Mt)break;v=v.return}0<lt.length&&(A=new N(A,J,null,n,_),D.push({event:A,listeners:lt}))}}if((e&7)===0){t:{if(A=t==="mouseover"||t==="pointerover",N=t==="mouseout"||t==="pointerout",A&&n!==bu&&(J=n.relatedTarget||n.fromElement)&&($n(J)||J[Wn]))break t;if((N||A)&&(A=_.window===_?_:(A=_.ownerDocument)?A.defaultView||A.parentWindow:window,N?(J=n.relatedTarget||n.toElement,N=x,J=J?$n(J):null,J!==null&&(Mt=d(J),lt=J.tag,J!==Mt||lt!==5&&lt!==27&&lt!==6)&&(J=null)):(N=null,J=x),N!==J)){if(lt=zs,M="onMouseLeave",w="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(lt=ks,M="onPointerLeave",w="onPointerEnter",v="pointer"),Mt=N==null?A:Ga(N),E=J==null?A:Ga(J),A=new lt(M,v+"leave",N,n,_),A.target=Mt,A.relatedTarget=E,M=null,$n(_)===x&&(lt=new lt(w,v+"enter",J,n,_),lt.target=E,lt.relatedTarget=Mt,M=lt),Mt=M,N&&J)e:{for(lt=i0,w=N,v=J,E=0,M=w;M;M=lt(M))E++;M=0;for(var et=v;et;et=lt(et))M++;for(;0<E-M;)w=lt(w),E--;for(;0<M-E;)v=lt(v),M--;for(;E--;){if(w===v||v!==null&&w===v.alternate){lt=w;break e}w=lt(w),v=lt(v)}lt=null}else lt=null;N!==null&&Cd(D,A,N,lt,!1),J!==null&&Mt!==null&&Cd(D,Mt,J,lt,!0)}}t:{if(A=x?Ga(x):window,N=A.nodeName&&A.nodeName.toLowerCase(),N==="select"||N==="input"&&A.type==="file")var bt=Gs;else if(qs(A))if(Xs)bt=pg;else{bt=mg;var $=hg}else N=A.nodeName,!N||N.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?x&&vu(x.elementType)&&(bt=Gs):bt=gg;if(bt&&(bt=bt(t,x))){Ys(D,bt,n,_);break t}$&&$(t,A,x),t==="focusout"&&x&&A.type==="number"&&x.memoizedProps.value!=null&&yu(A,"number",A.value)}switch($=x?Ga(x):window,t){case"focusin":(qs($)||$.contentEditable==="true")&&(ca=$,zu=x,Wa=null);break;case"focusout":Wa=zu=ca=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,Ws(D,n,_);break;case"selectionchange":if(vg)break;case"keydown":case"keyup":Ws(D,n,_)}var st;if(_u)t:{switch(t){case"compositionstart":var pt="onCompositionStart";break t;case"compositionend":pt="onCompositionEnd";break t;case"compositionupdate":pt="onCompositionUpdate";break t}pt=void 0}else ua?js(t,n)&&(pt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(pt="onCompositionStart");pt&&(Hs&&n.locale!=="ko"&&(ua||pt!=="onCompositionStart"?pt==="onCompositionEnd"&&ua&&(st=Ds()):(ln=_,Eu="value"in ln?ln.value:ln.textContent,ua=!0)),$=ji(x,pt),0<$.length&&(pt=new Os(pt,t,null,n,_),D.push({event:pt,listeners:$}),st?pt.data=st:(st=Ls(n),st!==null&&(pt.data=st)))),(st=rg?sg(t,n):og(t,n))&&(pt=ji(x,"onBeforeInput"),0<pt.length&&($=new Os("onBeforeInput","beforeinput",null,n,_),D.push({event:$,listeners:pt}),$.data=st)),e0(D,t,x,n,_)}Ad(D,e)})}function Tl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ji(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Xa(t,n),l!=null&&a.unshift(Tl(t,l,i)),l=Xa(t,e),l!=null&&a.push(Tl(t,l,i))),t.tag===3)return a;t=t.return}return[]}function i0(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Cd(t,e,n,a,l){for(var i=e._reactName,u=[];n!==null&&n!==a;){var s=n,g=s.alternate,x=s.stateNode;if(s=s.tag,g!==null&&g===a)break;s!==5&&s!==26&&s!==27||x===null||(g=x,l?(x=Xa(n,i),x!=null&&u.unshift(Tl(n,x,g))):l||(x=Xa(n,i),x!=null&&u.push(Tl(n,x,g)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var u0=/\r\n?/g,c0=/\u0000|\uFFFD/g;function _d(t){return(typeof t=="string"?t:""+t).replace(u0,`
`).replace(c0,"")}function Md(t,e){return e=_d(e),_d(t)===e}function _t(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||aa(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&aa(t,""+a);break;case"className":Gl(t,"class",a);break;case"tabIndex":Gl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Gl(t,n,a);break;case"style":Cs(t,a,i);break;case"data":if(e!=="object"){Gl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",l.name,l,null),_t(t,e,"formEncType",l.formEncType,l,null),_t(t,e,"formMethod",l.formMethod,l,null),_t(t,e,"formTarget",l.formTarget,l,null)):(_t(t,e,"encType",l.encType,l,null),_t(t,e,"method",l.method,l,null),_t(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=je);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Ql(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Yl(t,"popover",a);break;case"xlinkActuate":Ue(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Ue(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Ue(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Ue(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Ue(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Ue(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Yl(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Hm.get(n)||n,Yl(t,n,a))}}function lr(t,e,n,a,l,i){switch(n){case"style":Cs(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"children":typeof a=="string"?aa(t,a):(typeof a=="number"||typeof a=="bigint")&&aa(t,""+a);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=je);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!vs.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[ee]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Yl(t,n,a)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,i,u,n,null)}}l&&_t(t,e,"srcSet",n.srcSet,n,null),a&&_t(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var s=i=u=l=null,g=null,x=null;for(a in n)if(n.hasOwnProperty(a)){var _=n[a];if(_!=null)switch(a){case"name":l=_;break;case"type":u=_;break;case"checked":g=_;break;case"defaultChecked":x=_;break;case"value":i=_;break;case"defaultValue":s=_;break;case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(c(137,e));break;default:_t(t,e,a,_,n,null)}}Es(t,i,s,g,x,u,l,!1);return;case"select":mt("invalid",t),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(s=n[l],s!=null))switch(l){case"value":i=s;break;case"defaultValue":u=s;break;case"multiple":a=s;default:_t(t,e,l,s,n,null)}e=i,n=u,t.multiple=!!a,e!=null?na(t,!!a,e,!1):n!=null&&na(t,!!a,n,!0);return;case"textarea":mt("invalid",t),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(s=n[u],s!=null))switch(u){case"value":a=s;break;case"defaultValue":l=s;break;case"children":i=s;break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(c(91));break;default:_t(t,e,u,s,n,null)}As(t,a,l,i);return;case"option":for(g in n)if(n.hasOwnProperty(g)&&(a=n[g],a!=null))switch(g){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_t(t,e,g,a,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(a=0;a<wl.length;a++)mt(wl[a],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(x in n)if(n.hasOwnProperty(x)&&(a=n[x],a!=null))switch(x){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,x,a,n,null)}return;default:if(vu(e)){for(_ in n)n.hasOwnProperty(_)&&(a=n[_],a!==void 0&&lr(t,e,_,a,n,void 0));return}}for(s in n)n.hasOwnProperty(s)&&(a=n[s],a!=null&&_t(t,e,s,a,n,null))}function r0(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,s=null,g=null,x=null,_=null;for(N in n){var D=n[N];if(n.hasOwnProperty(N)&&D!=null)switch(N){case"checked":break;case"value":break;case"defaultValue":g=D;default:a.hasOwnProperty(N)||_t(t,e,N,null,a,D)}}for(var A in a){var N=a[A];if(D=n[A],a.hasOwnProperty(A)&&(N!=null||D!=null))switch(A){case"type":i=N;break;case"name":l=N;break;case"checked":x=N;break;case"defaultChecked":_=N;break;case"value":u=N;break;case"defaultValue":s=N;break;case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(c(137,e));break;default:N!==D&&_t(t,e,A,N,a,D)}}pu(t,u,s,g,x,_,i,l);return;case"select":N=u=s=A=null;for(i in n)if(g=n[i],n.hasOwnProperty(i)&&g!=null)switch(i){case"value":break;case"multiple":N=g;default:a.hasOwnProperty(i)||_t(t,e,i,null,a,g)}for(l in a)if(i=a[l],g=n[l],a.hasOwnProperty(l)&&(i!=null||g!=null))switch(l){case"value":A=i;break;case"defaultValue":s=i;break;case"multiple":u=i;default:i!==g&&_t(t,e,l,i,a,g)}e=s,n=u,a=N,A!=null?na(t,!!n,A,!1):!!a!=!!n&&(e!=null?na(t,!!n,e,!0):na(t,!!n,n?[]:"",!1));return;case"textarea":N=A=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null&&!a.hasOwnProperty(s))switch(s){case"value":break;case"children":break;default:_t(t,e,s,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":A=l;break;case"defaultValue":N=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(c(91));break;default:l!==i&&_t(t,e,u,l,a,i)}xs(t,A,N);return;case"option":for(var J in n)if(A=n[J],n.hasOwnProperty(J)&&A!=null&&!a.hasOwnProperty(J))switch(J){case"selected":t.selected=!1;break;default:_t(t,e,J,null,a,A)}for(g in a)if(A=a[g],N=n[g],a.hasOwnProperty(g)&&A!==N&&(A!=null||N!=null))switch(g){case"selected":t.selected=A&&typeof A!="function"&&typeof A!="symbol";break;default:_t(t,e,g,A,a,N)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var lt in n)A=n[lt],n.hasOwnProperty(lt)&&A!=null&&!a.hasOwnProperty(lt)&&_t(t,e,lt,null,a,A);for(x in a)if(A=a[x],N=n[x],a.hasOwnProperty(x)&&A!==N&&(A!=null||N!=null))switch(x){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(c(137,e));break;default:_t(t,e,x,A,a,N)}return;default:if(vu(e)){for(var Mt in n)A=n[Mt],n.hasOwnProperty(Mt)&&A!==void 0&&!a.hasOwnProperty(Mt)&&lr(t,e,Mt,void 0,a,A);for(_ in a)A=a[_],N=n[_],!a.hasOwnProperty(_)||A===N||A===void 0&&N===void 0||lr(t,e,_,A,a,N);return}}for(var w in n)A=n[w],n.hasOwnProperty(w)&&A!=null&&!a.hasOwnProperty(w)&&_t(t,e,w,null,a,A);for(D in a)A=a[D],N=n[D],!a.hasOwnProperty(D)||A===N||A==null&&N==null||_t(t,e,D,A,a,N)}function Dd(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function s0(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,s=l.duration;if(i&&s&&Dd(u)){for(u=0,s=l.responseEnd,a+=1;a<n.length;a++){var g=n[a],x=g.startTime;if(x>s)break;var _=g.transferSize,D=g.initiatorType;_&&Dd(D)&&(g=g.responseEnd,u+=_*(g<s?1:(s-x)/(g-x)))}if(--a,e+=8*(i+u)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var ir=null,ur=null;function Li(t){return t.nodeType===9?t:t.ownerDocument}function Rd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function zd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function cr(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var rr=null;function o0(){var t=window.event;return t&&t.type==="popstate"?t===rr?!1:(rr=t,!0):(rr=null,!1)}var Od=typeof setTimeout=="function"?setTimeout:void 0,f0=typeof clearTimeout=="function"?clearTimeout:void 0,kd=typeof Promise=="function"?Promise:void 0,d0=typeof queueMicrotask=="function"?queueMicrotask:typeof kd<"u"?function(t){return kd.resolve(null).then(t).catch(h0)}:Od;function h0(t){setTimeout(function(){throw t})}function Tn(t){return t==="head"}function Hd(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),ka(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")El(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,El(n);for(var i=n.firstChild;i;){var u=i.nextSibling,s=i.nodeName;i[Ya]||s==="SCRIPT"||s==="STYLE"||s==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&El(t.ownerDocument.body);n=l}while(n);ka(e)}function Bd(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function sr(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":sr(n),mu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function m0(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[Ya])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ne(t.nextSibling),t===null)break}return null}function g0(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ne(t.nextSibling),t===null))return null;return t}function Ud(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ne(t.nextSibling),t===null))return null;return t}function or(t){return t.data==="$?"||t.data==="$~"}function fr(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function p0(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ne(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var dr=null;function jd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ne(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Ld(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function qd(t,e,n){switch(e=Li(n),t){case"html":if(t=e.documentElement,!t)throw Error(c(452));return t;case"head":if(t=e.head,!t)throw Error(c(453));return t;case"body":if(t=e.body,!t)throw Error(c(454));return t;default:throw Error(c(451))}}function El(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);mu(t)}var Ce=new Map,Yd=new Set;function qi(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=V.d;V.d={f:y0,r:v0,D:b0,C:S0,L:w0,m:T0,X:x0,S:E0,M:A0};function y0(){var t=tn.f(),e=Ri();return t||e}function v0(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?af(e):tn.r(t)}var Ra=typeof document>"u"?null:document;function Gd(t,e,n){var a=Ra;if(a&&typeof e=="string"&&e){var l=be(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),Yd.has(l)||(Yd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),Wt(e,"link",t),Vt(e),a.head.appendChild(e)))}}function b0(t){tn.D(t),Gd("dns-prefetch",t,null)}function S0(t,e){tn.C(t,e),Gd("preconnect",t,e)}function w0(t,e,n){tn.L(t,e,n);var a=Ra;if(a&&t&&e){var l='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+be(n.imageSizes)+'"]')):l+='[href="'+be(t)+'"]';var i=l;switch(e){case"style":i=za(t);break;case"script":i=Oa(t)}Ce.has(i)||(t=z({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ce.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(xl(i))||e==="script"&&a.querySelector(Al(i))||(e=a.createElement("link"),Wt(e,"link",t),Vt(e),a.head.appendChild(e)))}}function T0(t,e){tn.m(t,e);var n=Ra;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Oa(t)}if(!Ce.has(i)&&(t=z({rel:"modulepreload",href:t},e),Ce.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Al(i)))return}a=n.createElement("link"),Wt(a,"link",t),Vt(a),n.head.appendChild(a)}}}function E0(t,e,n){tn.S(t,e,n);var a=Ra;if(a&&t){var l=ta(a).hoistableStyles,i=za(t);e=e||"default";var u=l.get(i);if(!u){var s={loading:0,preload:null};if(u=a.querySelector(xl(i)))s.loading=5;else{t=z({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ce.get(i))&&hr(t,n);var g=u=a.createElement("link");Vt(g),Wt(g,"link",t),g._p=new Promise(function(x,_){g.onload=x,g.onerror=_}),g.addEventListener("load",function(){s.loading|=1}),g.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Yi(u,e,a)}u={type:"stylesheet",instance:u,count:1,state:s},l.set(i,u)}}}function x0(t,e){tn.X(t,e);var n=Ra;if(n&&t){var a=ta(n).hoistableScripts,l=Oa(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=z({src:t,async:!0},e),(e=Ce.get(l))&&mr(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function A0(t,e){tn.M(t,e);var n=Ra;if(n&&t){var a=ta(n).hoistableScripts,l=Oa(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=z({src:t,async:!0,type:"module"},e),(e=Ce.get(l))&&mr(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Xd(t,e,n,a){var l=(l=ft.current)?qi(l):null;if(!l)throw Error(c(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=za(n.href),n=ta(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=za(n.href);var i=ta(l).hoistableStyles,u=i.get(t);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=l.querySelector(xl(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ce.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ce.set(t,n),i||N0(l,t,n,u.state))),e&&a===null)throw Error(c(528,""));return u}if(e&&a!==null)throw Error(c(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Oa(n),n=ta(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,t))}}function za(t){return'href="'+be(t)+'"'}function xl(t){return'link[rel="stylesheet"]['+t+"]"}function Qd(t){return z({},t,{"data-precedence":t.precedence,precedence:null})}function N0(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Wt(e,"link",n),Vt(e),t.head.appendChild(e))}function Oa(t){return'[src="'+be(t)+'"]'}function Al(t){return"script[async]"+t}function Vd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Vt(a),a;var l=z({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Vt(a),Wt(a,"style",l),Yi(a,n.precedence,t),e.instance=a;case"stylesheet":l=za(n.href);var i=t.querySelector(xl(l));if(i)return e.state.loading|=4,e.instance=i,Vt(i),i;a=Qd(n),(l=Ce.get(l))&&hr(a,l),i=(t.ownerDocument||t).createElement("link"),Vt(i);var u=i;return u._p=new Promise(function(s,g){u.onload=s,u.onerror=g}),Wt(i,"link",a),e.state.loading|=4,Yi(i,n.precedence,t),e.instance=i;case"script":return i=Oa(n.src),(l=t.querySelector(Al(i)))?(e.instance=l,Vt(l),l):(a=n,(l=Ce.get(i))&&(a=z({},n),mr(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Vt(l),Wt(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(c(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Yi(a,n.precedence,t));return e.instance}function Yi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var s=a[u];if(s.dataset.precedence===e)i=s;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function hr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function mr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Gi=null;function Zd(t,e,n){if(Gi===null){var a=new Map,l=Gi=new Map;l.set(n,a)}else l=Gi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[Ya]||i[Kt]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var s=a.get(u);s?s.push(i):a.set(u,[i])}}return a}function Kd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function C0(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Jd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function _0(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=za(a.href),i=e.querySelector(xl(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Xi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Vt(i);return}i=e.ownerDocument||e,a=Qd(a),(l=Ce.get(l))&&hr(a,l),i=i.createElement("link"),Vt(i);var u=i;u._p=new Promise(function(s,g){u.onload=s,u.onerror=g}),Wt(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Xi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var gr=0;function M0(t,e){return t.stylesheets&&t.count===0&&Vi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&gr===0&&(gr=62500*s0());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>gr?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Xi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Vi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Qi=null;function Vi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Qi=new Map,e.forEach(D0,t),Qi=null,Xi.call(t))}function D0(t,e){if(!(e.state.loading&4)){var n=Qi.get(t);if(n)var a=n.get(null);else{n=new Map,Qi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=e.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=Xi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var Nl={$$typeof:Y,Provider:null,Consumer:null,_currentValue:at,_currentValue2:at,_threadCount:0};function R0(t,e,n,a,l,i,u,s,g){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ou(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ou(0),this.hiddenUpdates=ou(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=g,this.incompleteTransitions=new Map}function Id(t,e,n,a,l,i,u,s,g,x,_,D){return t=new R0(t,e,n,u,g,x,_,D,s),e=1,i===!0&&(e|=24),i=de(3,null,null,e),t.current=i,i.stateNode=t,e=Ju(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},$u(i),t}function Fd(t){return t?(t=oa,t):oa}function Wd(t,e,n,a,l,i){l=Fd(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(ce(n,t,e),ll(n,t,e))}function $d(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function pr(t,e){$d(t,e),(t=t.alternate)&&$d(t,e)}function Pd(t){if(t.tag===13||t.tag===31){var e=Hn(t,67108864);e!==null&&ce(e,t,67108864),pr(t,67108864)}}function th(t){if(t.tag===13||t.tag===31){var e=ye();e=fu(e);var n=Hn(t,e);n!==null&&ce(n,t,e),pr(t,e)}}var Zi=!0;function z0(t,e,n,a){var l=C.T;C.T=null;var i=V.p;try{V.p=2,yr(t,e,n,a)}finally{V.p=i,C.T=l}}function O0(t,e,n,a){var l=C.T;C.T=null;var i=V.p;try{V.p=8,yr(t,e,n,a)}finally{V.p=i,C.T=l}}function yr(t,e,n,a){if(Zi){var l=vr(a);if(l===null)ar(t,e,a,Ki,n),nh(t,a);else if(H0(l,t,e,n,a))a.stopPropagation();else if(nh(t,a),e&4&&-1<k0.indexOf(t)){for(;l!==null;){var i=Pn(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Dn(i.pendingLanes);if(u!==0){var s=i;for(s.pendingLanes|=2,s.entangledLanes|=2;u;){var g=1<<31-oe(u);s.entanglements[1]|=g,u&=~g}ke(i),(Tt&6)===0&&(Mi=re()+500,Sl(0))}}break;case 31:case 13:s=Hn(i,2),s!==null&&ce(s,i,2),Ri(),pr(i,2)}if(i=vr(a),i===null&&ar(t,e,a,Ki,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else ar(t,e,a,null,n)}}function vr(t){return t=Su(t),br(t)}var Ki=null;function br(t){if(Ki=null,t=$n(t),t!==null){var e=d(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=S(e),t!==null)return t;t=null}else if(n===31){if(t=T(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ki=t,null}function eh(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(bm()){case cs:return 2;case rs:return 8;case Bl:case Sm:return 32;case ss:return 268435456;default:return 32}default:return 32}}var Sr=!1,En=null,xn=null,An=null,Cl=new Map,_l=new Map,Nn=[],k0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function nh(t,e){switch(t){case"focusin":case"focusout":En=null;break;case"dragenter":case"dragleave":xn=null;break;case"mouseover":case"mouseout":An=null;break;case"pointerover":case"pointerout":Cl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":_l.delete(e.pointerId)}}function Ml(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=Pn(e),e!==null&&Pd(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function H0(t,e,n,a,l){switch(e){case"focusin":return En=Ml(En,t,e,n,a,l),!0;case"dragenter":return xn=Ml(xn,t,e,n,a,l),!0;case"mouseover":return An=Ml(An,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return Cl.set(i,Ml(Cl.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,_l.set(i,Ml(_l.get(i)||null,t,e,n,a,l)),!0}return!1}function ah(t){var e=$n(t.target);if(e!==null){var n=d(e);if(n!==null){if(e=n.tag,e===13){if(e=S(n),e!==null){t.blockedOn=e,gs(t.priority,function(){th(n)});return}}else if(e===31){if(e=T(n),e!==null){t.blockedOn=e,gs(t.priority,function(){th(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ji(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=vr(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);bu=a,n.target.dispatchEvent(a),bu=null}else return e=Pn(n),e!==null&&Pd(e),t.blockedOn=n,!1;e.shift()}return!0}function lh(t,e,n){Ji(t)&&n.delete(e)}function B0(){Sr=!1,En!==null&&Ji(En)&&(En=null),xn!==null&&Ji(xn)&&(xn=null),An!==null&&Ji(An)&&(An=null),Cl.forEach(lh),_l.forEach(lh)}function Ii(t,e){t.blockedOn===e&&(t.blockedOn=null,Sr||(Sr=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,B0)))}var Fi=null;function ih(t){Fi!==t&&(Fi=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Fi===t&&(Fi=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(br(a||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,vc(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function ka(t){function e(g){return Ii(g,t)}En!==null&&Ii(En,t),xn!==null&&Ii(xn,t),An!==null&&Ii(An,t),Cl.forEach(e),_l.forEach(e);for(var n=0;n<Nn.length;n++){var a=Nn[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<Nn.length&&(n=Nn[0],n.blockedOn===null);)ah(n),n.blockedOn===null&&Nn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[ee]||null;if(typeof i=="function")u||ih(n);else if(u){var s=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[ee]||null)s=u.formAction;else if(br(l)!==null)continue}else s=u.action;typeof s=="function"?n[a+1]=s:(n.splice(a,3),a-=3),ih(n)}}}function uh(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function wr(t){this._internalRoot=t}Wi.prototype.render=wr.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(c(409));var n=e.current,a=ye();Wd(n,a,t,e,null,null)},Wi.prototype.unmount=wr.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Wd(t.current,2,null,t,null,null),Ri(),e[Wn]=null}};function Wi(t){this._internalRoot=t}Wi.prototype.unstable_scheduleHydration=function(t){if(t){var e=ms();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Nn.length&&e!==0&&e<Nn[n].priority;n++);Nn.splice(n,0,t),n===0&&ah(t)}};var ch=f.version;if(ch!=="19.2.6")throw Error(c(527,ch,"19.2.6"));V.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(c(188)):(t=Object.keys(t).join(","),Error(c(268,t)));return t=y(e),t=t!==null?O(t):null,t=t===null?null:t.stateNode,t};var U0={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:C,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $i=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$i.isDisabled&&$i.supportsFiber)try{ja=$i.inject(U0),se=$i}catch{}}return Rl.createRoot=function(t,e){if(!o(t))throw Error(c(299));var n=!1,a="",l=mf,i=gf,u=pf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=Id(t,1,!1,null,null,n,a,null,l,i,u,uh),t[Wn]=e.current,nr(t),new wr(e)},Rl.hydrateRoot=function(t,e,n){if(!o(t))throw Error(c(299));var a=!1,l="",i=mf,u=gf,s=pf,g=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(s=n.onRecoverableError),n.formState!==void 0&&(g=n.formState)),e=Id(t,1,!0,e,n??null,a,l,g,i,u,s,uh),e.context=Fd(null),n=e.current,a=ye(),a=fu(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,qa(e,n),ke(e),t[Wn]=e.current,nr(t),new Wi(e)},Rl.version="19.2.6",Rl}var yh;function J0(){if(yh)return xr.exports;yh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),xr.exports=K0(),xr.exports}var I0=J0();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F0=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),lm=(...r)=>r.filter((f,h,c)=>!!f&&f.trim()!==""&&c.indexOf(f)===h).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var W0={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $0=yt.forwardRef(({color:r="currentColor",size:f=24,strokeWidth:h=2,absoluteStrokeWidth:c,className:o="",children:d,iconNode:S,...T},m)=>yt.createElement("svg",{ref:m,...W0,width:f,height:f,stroke:r,strokeWidth:c?Number(h)*24/Number(f):h,className:lm("lucide",o),...T},[...S.map(([y,O])=>yt.createElement(y,O)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=(r,f)=>{const h=yt.forwardRef(({className:c,...o},d)=>yt.createElement($0,{ref:d,iconNode:f,className:lm(`lucide-${F0(r)}`,c),...o}));return h.displayName=`${r}`,h};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const im=$t("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const au=$t("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const um=$t("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P0=$t("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cm=$t("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tp=$t("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ep=$t("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const np=$t("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ap=$t("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lp=$t("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vh=$t("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ip=$t("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const up=$t("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cp=$t("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rp=$t("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sp=$t("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const es=$t("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function nu({group:r,size:f="md",dim:h}){const c=f==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return p.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${r.bgClass} ${r.textClass} ${c} ${h?"opacity-40":""}`,children:r.label})}const Ha=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],bh=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function rm(r){if(r.length===0)return"";const f=[...r].sort((O,z)=>O.date.localeCompare(z.date)),h=f[0].date,c=f[f.length-1].date,[o,d,S]=h.split("-").map(Number),[T,m,y]=c.split("-").map(Number);return h===c?`${Ha[d-1]} ${S}, ${o}`:o===T&&d===m?`${Ha[d-1]} ${S}–${y}, ${o}`:o===T?`${Ha[d-1]} ${S} – ${Ha[m-1]} ${y}, ${o}`:`${Ha[d-1]} ${S}, ${o} – ${Ha[m-1]} ${y}, ${T}`}function op(r){if(r.length===0)return"";const f=[...r].sort((H,L)=>H.date.localeCompare(L.date)),h=f[0].date,c=f[f.length-1].date,[o,d,S]=h.split("-").map(Number),[T,m,y]=c.split("-").map(Number),O=bh[new Date(o,d-1,S).getDay()],z=rm(r);if(h===c)return`${z} (${O})`;const k=bh[new Date(T,m-1,y).getDay()];return`${z} (${O}–${k})`}function Sh(r){return r.subtitle??rm(r.days)}function en(r){const[f,h]=r.split(":").map(Number);return f*60+h}const fp=30;function dp(r,f){let h=-1;for(let T=0;T<r.length&&en(r[T])<=f;T++)h=T;if(h===-1)return{index:-1,progress:0};const c=en(r[h]),o=r[h+1]?en(r[h+1]):null,d=o!==null?o:c+fp;if(f>=d)return{index:-1,progress:0};const S=d===c?0:(f-c)/(d-c);return{index:h,progress:Math.max(0,Math.min(1,S))}}function sm(r){const[f,h]=r.split(":").map(Number);return`${f%12||12}:${h.toString().padStart(2,"0")}`}function om(r){const[f]=r.split(":").map(Number);return f>=12?"PM":"AM"}function ns(){const r=new Date;return r.getHours()*60+r.getMinutes()}function kl(){const r=new Date,f=r.getFullYear(),h=String(r.getMonth()+1).padStart(2,"0"),c=String(r.getDate()).padStart(2,"0");return`${f}-${h}-${c}`}function hp(){const r=new Date,f=r.getHours(),h=r.getMinutes(),c=f%12||12,o=f>=12?"PM":"AM";return`${c}:${h.toString().padStart(2,"0")} ${o}`}function mp(r){if(r<=0)return"";if(r<60)return`${r} min`;const f=Math.floor(r/60),h=r%60;return h===0?`${f}h`:`${f}h ${h}m`}function gp(r){const f=new Date(r);if(isNaN(f.getTime()))return r;const h=f.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),c=f.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${h}, ${c}`}function wh(r,f){return r.flatMap(h=>{const c=f.find(o=>o.id===h);return c?[c]:[]})}function pp({activity:r,runGroups:f,past:h}){const c=wh(r.onTrack,f),o=wh(r.inClass??[],f);return p.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${h?"opacity-60":""}`,children:p.jsxs("div",{className:"flex gap-4",children:[p.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[sm(r.time),p.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:om(r.time)})]}),p.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[c.length>0&&p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),p.jsx("div",{className:"flex flex-wrap gap-1.5",children:c.map(d=>p.jsx(nu,{group:d},d.id))})]}),o.length>0&&p.jsxs(p.Fragment,{children:[c.length>0&&p.jsx("div",{className:"border-t border-gray-100"}),p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),p.jsx("div",{className:"flex flex-wrap gap-1.5",children:o.map(d=>p.jsx(nu,{group:d},d.id))})]})]}),r.note&&p.jsx("p",{className:"text-xs italic text-gray-500",children:r.note})]})]})})}function yp({activity:r,past:f}){const h=r.type==="lunch"||r.type==="special";return p.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${h?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${f?"opacity-60":""}`,children:p.jsxs("div",{className:"flex items-center gap-4",children:[p.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[sm(r.time),p.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:om(r.time)})]}),h&&p.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:r.type==="lunch"?p.jsx(sp,{size:16}):p.jsx(ip,{size:16})}),p.jsxs("div",{children:[p.jsx("p",{className:"text-sm font-medium text-gray-900",children:r.label}),r.subtitle&&p.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:r.subtitle})]})]})})}const $r=yt.forwardRef(({activities:r},f)=>{const[,h]=yt.useState(0);yt.useEffect(()=>{const m=setInterval(()=>h(y=>y+1),3e4);return()=>clearInterval(m)},[]);const c=ns(),d=r.filter(m=>"time"in m).find(m=>en(m.time)>c),S=d?en(d.time)-c:null,T=S!==null?S<=5?"text-red-500":S<=10?"text-orange-500":"text-gray-400":"text-gray-400";return p.jsxs("div",{ref:f,"data-time-indicator":!0,className:"relative my-6",children:[p.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[p.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),p.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),p.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:hp()}),S!==null&&p.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${T}`,children:["Next activity starts in ",p.jsx("span",{className:"font-semibold",children:mp(S)})]})]})});$r.displayName="TimeIndicator";function Th({collapsed:r,children:f}){return p.jsx("div",{"data-collapsed":r,"aria-hidden":r,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:r?"0fr":"1fr",opacity:r?0:1,marginBottom:r?0:"0.5rem"},children:p.jsx("div",{className:"overflow-hidden",children:f})})}function vp({activities:r,runGroups:f,isToday:h,selectedGroups:c,hidePast:o}){const d=yt.useRef(null),[,S]=yt.useState(0);yt.useEffect(()=>{if(!h)return;const B=setInterval(()=>S(Y=>Y+1),6e4);return()=>clearInterval(B)},[h]),yt.useEffect(()=>{if(!h)return;const B=setTimeout(()=>{var Y;(Y=d.current)==null||Y.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(B)},[h]);const T=ns(),m=r.flatMap(B=>{if(B.type!=="session")return[B];if(c.length===0)return[B];const Y=B.onTrack.filter(ot=>c.includes(ot)),K=(B.inClass??[]).filter(ot=>c.includes(ot));return Y.length===0&&K.length===0?[]:[{...B,onTrack:Y,inClass:K}]}),y=m.map(B=>B.type!=="break"&&o&&h&&en(B.time)<T);m.forEach((B,Y)=>{if(B.type!=="break")return;const K=m.slice(0,Y).some((ot,X)=>ot.type!=="break"&&!y[X]);y[Y]=!K});const O=[],z=[];m.forEach((B,Y)=>{B.type!=="break"&&(O.push(Y),z.push(B.time))});const{index:k}=h?dp(z,T):{index:-1},H=k===-1?-1:O[k],L=h?m.findIndex(B=>B.type!=="break"&&en(B.time)>T):-1,Z=h&&L===-1&&m.length>0,F=m.length>0&&y.every(Boolean);let q;return p.jsxs("div",{className:"flex flex-col pb-10",children:[m.length>0&&p.jsx(Th,{collapsed:!F,children:p.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[p.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),p.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),m.map((B,Y)=>{const K=Y===H,ot=h&&B.type!=="break"&&!K&&en(B.time)<T;let X=null;!y[Y]&&B.type==="session"&&B.sessionNumber!==void 0&&B.sessionNumber!==q&&(q=B.sessionNumber,X=p.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",B.sessionNumber]}));const j=B.type==="break"?p.jsxs("div",{className:"flex items-center gap-2 py-1",children:[p.jsx("div",{className:"h-px flex-1 bg-gray-200"}),p.jsx("span",{className:"text-xs text-gray-400 italic",children:B.label}),p.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):B.type==="session"?p.jsx(pp,{activity:B,runGroups:f,past:ot}):p.jsx(yp,{activity:B,past:ot});return p.jsxs(Th,{collapsed:y[Y],children:[Y===L&&p.jsx($r,{ref:d,activities:m}),X,j]},Y)}),Z&&p.jsx($r,{ref:d,activities:m})]})}function bp({groups:r,selected:f,onChange:h}){const[c,o]=yt.useState(!1),d=m=>h(f.includes(m)?f.filter(y=>y!==m):[...f,m]),S=f.length===0||f.length===r.length,T=r.filter(m=>f.includes(m.id));return p.jsxs("div",{className:"relative",children:[p.jsxs("button",{onClick:()=>o(m=>!m),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[S?p.jsx("span",{className:"text-gray-700",children:"All run groups"}):p.jsx("div",{className:"flex items-center gap-1",children:T.map(m=>p.jsx(nu,{group:m,size:"sm"},m.id))}),p.jsx(um,{size:14,className:"text-gray-400"})]}),c&&p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>o(!1)}),p.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[r.map(m=>p.jsxs("button",{onClick:()=>d(m.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[p.jsx(nu,{group:m,size:"md"}),f.includes(m.id)&&p.jsx(au,{size:14,className:"text-blue-500"})]},m.id)),p.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:p.jsx("button",{onClick:()=>{h([]),o(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:S?"All selected":"Clear filter"})})]})]})]})}function Eh(r){const f=kl();return r.days.some(h=>h.date===f)}function xh(){return p.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[p.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function Sp({events:r,active:f,onChange:h,onOpenDetails:c}){const[o,d]=yt.useState(!1);return p.jsxs("div",{className:"relative min-w-0 pl-1",children:[p.jsxs("button",{onClick:()=>d(S=>!S),className:"flex items-center gap-1 text-left group min-w-0",children:[p.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:f.name}),Eh(f)&&p.jsx(xh,{}),p.jsx(um,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),p.jsxs("div",{className:"flex items-center gap-0.5",children:[p.jsx("p",{className:"text-sm text-gray-500",children:Sh(f)}),p.jsx("button",{onClick:c,"aria-label":"Event details",className:"inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900",children:p.jsx(np,{size:14})})]}),o&&p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>d(!1)}),p.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:r.map(S=>p.jsxs("button",{onClick:()=>{h(S),d(!1)},className:`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left ${S.id===f.id?"bg-blue-50":"hover:bg-gray-50"}`,children:[p.jsxs("div",{children:[p.jsxs("div",{className:"flex items-center gap-1.5",children:[p.jsx("span",{className:"text-sm font-semibold text-gray-900",children:S.name}),Eh(S)&&p.jsx(xh,{})]}),p.jsx("div",{className:"text-xs text-gray-400",children:Sh(S)})]}),S.id===f.id&&p.jsx(au,{size:14,className:"text-blue-500 ml-3 shrink-0"})]},S.id))})]})]})}function wp({checked:r,onChange:f,label:h}){return p.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[h&&p.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:h}),p.jsx("button",{type:"button",role:"switch","aria-checked":r,onClick:f,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:r?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:p.jsx("span",{style:{position:"absolute",top:"2px",left:r?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Jn=72,Tp=110;function Ep({children:r}){const[f,h]=yt.useState(0),[c,o]=yt.useState("idle"),d=yt.useRef(null),S=yt.useRef(0);yt.useEffect(()=>{const O=H=>{window.scrollY===0&&(d.current=H.touches[0].clientY)},z=H=>{if(d.current===null)return;const L=H.touches[0].clientY-d.current;if(L<=0){d.current=null;return}H.preventDefault();const Z=L<Jn?L:Jn+(L-Jn)*.25;S.current=Math.min(Z,Tp),h(S.current),o("pulling")},k=()=>{d.current!==null&&(d.current=null,S.current>=Jn?(o("refreshing"),h(Jn*.75),setTimeout(()=>window.location.reload(),600)):(o("releasing"),h(0),S.current=0,setTimeout(()=>o("idle"),250)))};return document.addEventListener("touchstart",O,{passive:!0}),document.addEventListener("touchmove",z,{passive:!1}),document.addEventListener("touchend",k),document.addEventListener("touchcancel",k),()=>{document.removeEventListener("touchstart",O),document.removeEventListener("touchmove",z),document.removeEventListener("touchend",k),document.removeEventListener("touchcancel",k)}},[]);const T=c==="releasing"||c==="refreshing",m=Math.min(f/Jn,1),y=f>=Jn;return p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${f}px)`,transition:T?"transform 0.25s ease":"none"},children:p.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${y?"text-blue-500":"text-gray-400"}`,children:p.jsx(up,{size:16,className:c==="refreshing"?"animate-spin":"",style:c!=="refreshing"?{transform:`rotate(${m*270}deg)`}:void 0})})}),p.jsx("div",{style:{transform:`translateY(${f}px)`,transition:T?"transform 0.25s ease":"none"},children:r})]})}function xp({groups:r}){const f=r.filter(h=>h.description);return f.length===0?null:p.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[p.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),p.jsx("ul",{className:"flex flex-col gap-1.5",children:f.map(h=>p.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[p.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${h.bgClass}`,"aria-hidden":"true"}),p.jsx("span",{className:"font-medium text-gray-900",children:h.label}),p.jsx("span",{className:"text-gray-400",children:"·"}),p.jsx("span",{children:h.description})]},h.id))})]})}const Ah=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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

// Parse the widget's optional user parameter into a filter list plus a lead
// time for notifications. Format is \`<groups>|<Nm>\`; either half is
// optional. Any comma-separated token matching \`\\d+m\` (case-insensitive) is
// treated as the lead time even if the user forgot the pipe (\`10m\` alone
// or \`orange,10m\` both work). Anything else is a group id — unknown group
// ids get sifted into \`invalid\` later, once we have a manifest to check
// against.
function parseWidgetParameter(raw) {
  const source = String(raw == null ? "" : raw).trim()
  const groups = []
  let leadMinutes = DEFAULT_LEAD_MIN
  const invalidLead = []
  if (source) {
    for (const chunk of source.split("|")) {
      for (const t of chunk.split(",")) {
        const tok = t.trim()
        if (!tok) continue
        const m = tok.match(/^(\\d+)\\s*m$/i)
        if (m) {
          const n = parseInt(m[1], 10)
          if (n >= 0 && n <= 24 * 60) leadMinutes = n
          else invalidLead.push(tok)
        } else {
          groups.push(tok)
        }
      }
    }
  }
  return { rawParam: source, groups, leadMinutes, invalid: invalidLead }
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
    renderNoEvents(w, p, stale, pickNextFuture(manifest))
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

function drawStatusFooter(w, p, stale, parsed, notifStatus) {
  const bits = []
  if (notifStatus && notifStatus.denied) {
    bits.push({ text: "🔕 notifications off", warn: true })
  }
  if (stale) bits.push({ text: "cached schedule", warn: false })
  const invalid = (parsed && parsed.invalid) || []
  if (invalid.length > 0) {
    bits.push({ text: \`⚠ invalid: \${invalid.join(", ")}\`, warn: true })
  }
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
  title.font = rBoldFont(18)
  title.textColor = p.fg
  w.addSpacer(6)

  const msg = w.addText("No event today.")
  msg.font = rFont(12)
  msg.textColor = p.muted

  if (next) {
    w.addSpacer(10)
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

  // Flex spacer forces the widget's content stack to top-align, same
  // as makeWidget's populated path — without it Scriptable's
  // ListWidget centers this short content vertically, which is what
  // produced the huge empty gutters above and below in #116.
  w.addSpacer()
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

function formatTimeWithAmPm(hhmm) {
  return \`\${formatTime12(hhmm)} \${formatAmPm(hhmm)}\`
}

function buildNotifContent(target, leadMinutes) {
  const timeStr = formatTimeWithAmPm(target.activity.time)
  if (target.kind === "all") {
    const label = target.activity.label || "Activity"
    const body = target.activity.subtitle
      ? \`\${timeStr} · \${target.activity.subtitle}\`
      : timeStr
    return { title: \`\${label} · \${leadMinutes}m\`, body }
  }
  const g = groupLabel(target.event, target.groupId)
  const verb = target.kind === "onTrack" ? "On track at" : "Classroom at"
  let body = \`\${verb} \${timeStr}\`
  const follow = findFollowUp(target)
  if (follow) {
    const fTime = formatTimeWithAmPm(follow.time)
    const fLabel = follow.kind === "onTrack" ? "On track" : "Classroom"
    body += \` · \${fLabel} follows at \${fTime}.\`
  }
  return { title: \`\${g} · \${leadMinutes}m\`, body }
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
      n.deliveryDate = s.fireAt
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
  const parsed = validateWidgetParameter(readWidgetParameter(), data.manifest)
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
`;function Ap(){const[r,f]=yt.useState(!1);yt.useEffect(()=>{window.scrollTo(0,0)},[]);async function h(){await navigator.clipboard.writeText(Ah),f(!0),setTimeout(()=>f(!1),2e3)}return p.jsx("div",{className:"min-h-screen bg-gray-50",children:p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),p.jsxs("div",{className:"flex items-center gap-2",children:[p.jsxs("button",{onClick:h,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[r?p.jsx(au,{size:16,className:"text-green-600"}):p.jsx(cm,{size:16}),r?"Copied":"Copy"]}),p.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:p.jsx(es,{size:18})})]})]}),p.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",p.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),p.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:p.jsx("code",{children:Ah})})]})})}var Ba={},_r,Nh;function Np(){return Nh||(Nh=1,_r=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),_r}var Mr={},_n={},Ch;function In(){if(Ch)return _n;Ch=1;let r;const f=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(c){if(!c)throw new Error('"version" cannot be null or undefined');if(c<1||c>40)throw new Error('"version" should be in range from 1 to 40');return c*4+17},_n.getSymbolTotalCodewords=function(c){return f[c]},_n.getBCHDigit=function(h){let c=0;for(;h!==0;)c++,h>>>=1;return c},_n.setToSJISFunction=function(c){if(typeof c!="function")throw new Error('"toSJISFunc" is not a valid function.');r=c},_n.isKanjiModeEnabled=function(){return typeof r<"u"},_n.toSJIS=function(c){return r(c)},_n}var Dr={},_h;function as(){return _h||(_h=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function f(h){if(typeof h!="string")throw new Error("Param is not a string");switch(h.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+h)}}r.isValid=function(c){return c&&typeof c.bit<"u"&&c.bit>=0&&c.bit<4},r.from=function(c,o){if(r.isValid(c))return c;try{return f(c)}catch{return o}}})(Dr)),Dr}var Rr,Mh;function Cp(){if(Mh)return Rr;Mh=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(f){const h=Math.floor(f/8);return(this.buffer[h]>>>7-f%8&1)===1},put:function(f,h){for(let c=0;c<h;c++)this.putBit((f>>>h-c-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(f){const h=Math.floor(this.length/8);this.buffer.length<=h&&this.buffer.push(0),f&&(this.buffer[h]|=128>>>this.length%8),this.length++}},Rr=r,Rr}var zr,Dh;function _p(){if(Dh)return zr;Dh=1;function r(f){if(!f||f<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=f,this.data=new Uint8Array(f*f),this.reservedBit=new Uint8Array(f*f)}return r.prototype.set=function(f,h,c,o){const d=f*this.size+h;this.data[d]=c,o&&(this.reservedBit[d]=!0)},r.prototype.get=function(f,h){return this.data[f*this.size+h]},r.prototype.xor=function(f,h,c){this.data[f*this.size+h]^=c},r.prototype.isReserved=function(f,h){return this.reservedBit[f*this.size+h]},zr=r,zr}var Or={},Rh;function Mp(){return Rh||(Rh=1,(function(r){const f=In().getSymbolSize;r.getRowColCoords=function(c){if(c===1)return[];const o=Math.floor(c/7)+2,d=f(c),S=d===145?26:Math.ceil((d-13)/(2*o-2))*2,T=[d-7];for(let m=1;m<o-1;m++)T[m]=T[m-1]-S;return T.push(6),T.reverse()},r.getPositions=function(c){const o=[],d=r.getRowColCoords(c),S=d.length;for(let T=0;T<S;T++)for(let m=0;m<S;m++)T===0&&m===0||T===0&&m===S-1||T===S-1&&m===0||o.push([d[T],d[m]]);return o}})(Or)),Or}var kr={},zh;function Dp(){if(zh)return kr;zh=1;const r=In().getSymbolSize,f=7;return kr.getPositions=function(c){const o=r(c);return[[0,0],[o-f,0],[0,o-f]]},kr}var Hr={},Oh;function Rp(){return Oh||(Oh=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const f={N1:3,N2:3,N3:40,N4:10};r.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},r.from=function(o){return r.isValid(o)?parseInt(o,10):void 0},r.getPenaltyN1=function(o){const d=o.size;let S=0,T=0,m=0,y=null,O=null;for(let z=0;z<d;z++){T=m=0,y=O=null;for(let k=0;k<d;k++){let H=o.get(z,k);H===y?T++:(T>=5&&(S+=f.N1+(T-5)),y=H,T=1),H=o.get(k,z),H===O?m++:(m>=5&&(S+=f.N1+(m-5)),O=H,m=1)}T>=5&&(S+=f.N1+(T-5)),m>=5&&(S+=f.N1+(m-5))}return S},r.getPenaltyN2=function(o){const d=o.size;let S=0;for(let T=0;T<d-1;T++)for(let m=0;m<d-1;m++){const y=o.get(T,m)+o.get(T,m+1)+o.get(T+1,m)+o.get(T+1,m+1);(y===4||y===0)&&S++}return S*f.N2},r.getPenaltyN3=function(o){const d=o.size;let S=0,T=0,m=0;for(let y=0;y<d;y++){T=m=0;for(let O=0;O<d;O++)T=T<<1&2047|o.get(y,O),O>=10&&(T===1488||T===93)&&S++,m=m<<1&2047|o.get(O,y),O>=10&&(m===1488||m===93)&&S++}return S*f.N3},r.getPenaltyN4=function(o){let d=0;const S=o.data.length;for(let m=0;m<S;m++)d+=o.data[m];return Math.abs(Math.ceil(d*100/S/5)-10)*f.N4};function h(c,o,d){switch(c){case r.Patterns.PATTERN000:return(o+d)%2===0;case r.Patterns.PATTERN001:return o%2===0;case r.Patterns.PATTERN010:return d%3===0;case r.Patterns.PATTERN011:return(o+d)%3===0;case r.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(d/3))%2===0;case r.Patterns.PATTERN101:return o*d%2+o*d%3===0;case r.Patterns.PATTERN110:return(o*d%2+o*d%3)%2===0;case r.Patterns.PATTERN111:return(o*d%3+(o+d)%2)%2===0;default:throw new Error("bad maskPattern:"+c)}}r.applyMask=function(o,d){const S=d.size;for(let T=0;T<S;T++)for(let m=0;m<S;m++)d.isReserved(m,T)||d.xor(m,T,h(o,m,T))},r.getBestMask=function(o,d){const S=Object.keys(r.Patterns).length;let T=0,m=1/0;for(let y=0;y<S;y++){d(y),r.applyMask(y,o);const O=r.getPenaltyN1(o)+r.getPenaltyN2(o)+r.getPenaltyN3(o)+r.getPenaltyN4(o);r.applyMask(y,o),O<m&&(m=O,T=y)}return T}})(Hr)),Hr}var Pi={},kh;function fm(){if(kh)return Pi;kh=1;const r=as(),f=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],h=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Pi.getBlocksCount=function(o,d){switch(d){case r.L:return f[(o-1)*4+0];case r.M:return f[(o-1)*4+1];case r.Q:return f[(o-1)*4+2];case r.H:return f[(o-1)*4+3];default:return}},Pi.getTotalCodewordsCount=function(o,d){switch(d){case r.L:return h[(o-1)*4+0];case r.M:return h[(o-1)*4+1];case r.Q:return h[(o-1)*4+2];case r.H:return h[(o-1)*4+3];default:return}},Pi}var Br={},zl={},Hh;function zp(){if(Hh)return zl;Hh=1;const r=new Uint8Array(512),f=new Uint8Array(256);return(function(){let c=1;for(let o=0;o<255;o++)r[o]=c,f[c]=o,c<<=1,c&256&&(c^=285);for(let o=255;o<512;o++)r[o]=r[o-255]})(),zl.log=function(c){if(c<1)throw new Error("log("+c+")");return f[c]},zl.exp=function(c){return r[c]},zl.mul=function(c,o){return c===0||o===0?0:r[f[c]+f[o]]},zl}var Bh;function Op(){return Bh||(Bh=1,(function(r){const f=zp();r.mul=function(c,o){const d=new Uint8Array(c.length+o.length-1);for(let S=0;S<c.length;S++)for(let T=0;T<o.length;T++)d[S+T]^=f.mul(c[S],o[T]);return d},r.mod=function(c,o){let d=new Uint8Array(c);for(;d.length-o.length>=0;){const S=d[0];for(let m=0;m<o.length;m++)d[m]^=f.mul(o[m],S);let T=0;for(;T<d.length&&d[T]===0;)T++;d=d.slice(T)}return d},r.generateECPolynomial=function(c){let o=new Uint8Array([1]);for(let d=0;d<c;d++)o=r.mul(o,new Uint8Array([1,f.exp(d)]));return o}})(Br)),Br}var Ur,Uh;function kp(){if(Uh)return Ur;Uh=1;const r=Op();function f(h){this.genPoly=void 0,this.degree=h,this.degree&&this.initialize(this.degree)}return f.prototype.initialize=function(c){this.degree=c,this.genPoly=r.generateECPolynomial(this.degree)},f.prototype.encode=function(c){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(c.length+this.degree);o.set(c);const d=r.mod(o,this.genPoly),S=this.degree-d.length;if(S>0){const T=new Uint8Array(this.degree);return T.set(d,S),T}return d},Ur=f,Ur}var jr={},Lr={},qr={},jh;function dm(){return jh||(jh=1,qr.isValid=function(f){return!isNaN(f)&&f>=1&&f<=40}),qr}var He={},Lh;function hm(){if(Lh)return He;Lh=1;const r="[0-9]+",f="[A-Z $%*+\\-./:]+";let h="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";h=h.replace(/u/g,"\\u");const c="(?:(?![A-Z0-9 $%*+\\-./:]|"+h+`)(?:.|[\r
]))+`;He.KANJI=new RegExp(h,"g"),He.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),He.BYTE=new RegExp(c,"g"),He.NUMERIC=new RegExp(r,"g"),He.ALPHANUMERIC=new RegExp(f,"g");const o=new RegExp("^"+h+"$"),d=new RegExp("^"+r+"$"),S=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return He.testKanji=function(m){return o.test(m)},He.testNumeric=function(m){return d.test(m)},He.testAlphanumeric=function(m){return S.test(m)},He}var qh;function Fn(){return qh||(qh=1,(function(r){const f=dm(),h=hm();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(d,S){if(!d.ccBits)throw new Error("Invalid mode: "+d);if(!f.isValid(S))throw new Error("Invalid version: "+S);return S>=1&&S<10?d.ccBits[0]:S<27?d.ccBits[1]:d.ccBits[2]},r.getBestModeForData=function(d){return h.testNumeric(d)?r.NUMERIC:h.testAlphanumeric(d)?r.ALPHANUMERIC:h.testKanji(d)?r.KANJI:r.BYTE},r.toString=function(d){if(d&&d.id)return d.id;throw new Error("Invalid mode")},r.isValid=function(d){return d&&d.bit&&d.ccBits};function c(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+o)}}r.from=function(d,S){if(r.isValid(d))return d;try{return c(d)}catch{return S}}})(Lr)),Lr}var Yh;function Hp(){return Yh||(Yh=1,(function(r){const f=In(),h=fm(),c=as(),o=Fn(),d=dm(),S=7973,T=f.getBCHDigit(S);function m(k,H,L){for(let Z=1;Z<=40;Z++)if(H<=r.getCapacity(Z,L,k))return Z}function y(k,H){return o.getCharCountIndicator(k,H)+4}function O(k,H){let L=0;return k.forEach(function(Z){const F=y(Z.mode,H);L+=F+Z.getBitsLength()}),L}function z(k,H){for(let L=1;L<=40;L++)if(O(k,L)<=r.getCapacity(L,H,o.MIXED))return L}r.from=function(H,L){return d.isValid(H)?parseInt(H,10):L},r.getCapacity=function(H,L,Z){if(!d.isValid(H))throw new Error("Invalid QR Code version");typeof Z>"u"&&(Z=o.BYTE);const F=f.getSymbolTotalCodewords(H),q=h.getTotalCodewordsCount(H,L),B=(F-q)*8;if(Z===o.MIXED)return B;const Y=B-y(Z,H);switch(Z){case o.NUMERIC:return Math.floor(Y/10*3);case o.ALPHANUMERIC:return Math.floor(Y/11*2);case o.KANJI:return Math.floor(Y/13);case o.BYTE:default:return Math.floor(Y/8)}},r.getBestVersionForData=function(H,L){let Z;const F=c.from(L,c.M);if(Array.isArray(H)){if(H.length>1)return z(H,F);if(H.length===0)return 1;Z=H[0]}else Z=H;return m(Z.mode,Z.getLength(),F)},r.getEncodedBits=function(H){if(!d.isValid(H)||H<7)throw new Error("Invalid QR Code version");let L=H<<12;for(;f.getBCHDigit(L)-T>=0;)L^=S<<f.getBCHDigit(L)-T;return H<<12|L}})(jr)),jr}var Yr={},Gh;function Bp(){if(Gh)return Yr;Gh=1;const r=In(),f=1335,h=21522,c=r.getBCHDigit(f);return Yr.getEncodedBits=function(d,S){const T=d.bit<<3|S;let m=T<<10;for(;r.getBCHDigit(m)-c>=0;)m^=f<<r.getBCHDigit(m)-c;return(T<<10|m)^h},Yr}var Gr={},Xr,Xh;function Up(){if(Xh)return Xr;Xh=1;const r=Fn();function f(h){this.mode=r.NUMERIC,this.data=h.toString()}return f.getBitsLength=function(c){return 10*Math.floor(c/3)+(c%3?c%3*3+1:0)},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(c){let o,d,S;for(o=0;o+3<=this.data.length;o+=3)d=this.data.substr(o,3),S=parseInt(d,10),c.put(S,10);const T=this.data.length-o;T>0&&(d=this.data.substr(o),S=parseInt(d,10),c.put(S,T*3+1))},Xr=f,Xr}var Qr,Qh;function jp(){if(Qh)return Qr;Qh=1;const r=Fn(),f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function h(c){this.mode=r.ALPHANUMERIC,this.data=c}return h.getBitsLength=function(o){return 11*Math.floor(o/2)+6*(o%2)},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(o){let d;for(d=0;d+2<=this.data.length;d+=2){let S=f.indexOf(this.data[d])*45;S+=f.indexOf(this.data[d+1]),o.put(S,11)}this.data.length%2&&o.put(f.indexOf(this.data[d]),6)},Qr=h,Qr}var Vr,Vh;function Lp(){if(Vh)return Vr;Vh=1;const r=Fn();function f(h){this.mode=r.BYTE,typeof h=="string"?this.data=new TextEncoder().encode(h):this.data=new Uint8Array(h)}return f.getBitsLength=function(c){return c*8},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(h){for(let c=0,o=this.data.length;c<o;c++)h.put(this.data[c],8)},Vr=f,Vr}var Zr,Zh;function qp(){if(Zh)return Zr;Zh=1;const r=Fn(),f=In();function h(c){this.mode=r.KANJI,this.data=c}return h.getBitsLength=function(o){return o*13},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(c){let o;for(o=0;o<this.data.length;o++){let d=f.toSJIS(this.data[o]);if(d>=33088&&d<=40956)d-=33088;else if(d>=57408&&d<=60351)d-=49472;else throw new Error("Invalid SJIS character: "+this.data[o]+`
Make sure your charset is UTF-8`);d=(d>>>8&255)*192+(d&255),c.put(d,13)}},Zr=h,Zr}var Kr={exports:{}},Kh;function Yp(){return Kh||(Kh=1,(function(r){var f={single_source_shortest_paths:function(h,c,o){var d={},S={};S[c]=0;var T=f.PriorityQueue.make();T.push(c,0);for(var m,y,O,z,k,H,L,Z,F;!T.empty();){m=T.pop(),y=m.value,z=m.cost,k=h[y]||{};for(O in k)k.hasOwnProperty(O)&&(H=k[O],L=z+H,Z=S[O],F=typeof S[O]>"u",(F||Z>L)&&(S[O]=L,T.push(O,L),d[O]=y))}if(typeof o<"u"&&typeof S[o]>"u"){var q=["Could not find a path from ",c," to ",o,"."].join("");throw new Error(q)}return d},extract_shortest_path_from_predecessor_list:function(h,c){for(var o=[],d=c;d;)o.push(d),h[d],d=h[d];return o.reverse(),o},find_path:function(h,c,o){var d=f.single_source_shortest_paths(h,c,o);return f.extract_shortest_path_from_predecessor_list(d,o)},PriorityQueue:{make:function(h){var c=f.PriorityQueue,o={},d;h=h||{};for(d in c)c.hasOwnProperty(d)&&(o[d]=c[d]);return o.queue=[],o.sorter=h.sorter||c.default_sorter,o},default_sorter:function(h,c){return h.cost-c.cost},push:function(h,c){var o={value:h,cost:c};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=f})(Kr)),Kr.exports}var Jh;function Gp(){return Jh||(Jh=1,(function(r){const f=Fn(),h=Up(),c=jp(),o=Lp(),d=qp(),S=hm(),T=In(),m=Yp();function y(q){return unescape(encodeURIComponent(q)).length}function O(q,B,Y){const K=[];let ot;for(;(ot=q.exec(Y))!==null;)K.push({data:ot[0],index:ot.index,mode:B,length:ot[0].length});return K}function z(q){const B=O(S.NUMERIC,f.NUMERIC,q),Y=O(S.ALPHANUMERIC,f.ALPHANUMERIC,q);let K,ot;return T.isKanjiModeEnabled()?(K=O(S.BYTE,f.BYTE,q),ot=O(S.KANJI,f.KANJI,q)):(K=O(S.BYTE_KANJI,f.BYTE,q),ot=[]),B.concat(Y,K,ot).sort(function(j,U){return j.index-U.index}).map(function(j){return{data:j.data,mode:j.mode,length:j.length}})}function k(q,B){switch(B){case f.NUMERIC:return h.getBitsLength(q);case f.ALPHANUMERIC:return c.getBitsLength(q);case f.KANJI:return d.getBitsLength(q);case f.BYTE:return o.getBitsLength(q)}}function H(q){return q.reduce(function(B,Y){const K=B.length-1>=0?B[B.length-1]:null;return K&&K.mode===Y.mode?(B[B.length-1].data+=Y.data,B):(B.push(Y),B)},[])}function L(q){const B=[];for(let Y=0;Y<q.length;Y++){const K=q[Y];switch(K.mode){case f.NUMERIC:B.push([K,{data:K.data,mode:f.ALPHANUMERIC,length:K.length},{data:K.data,mode:f.BYTE,length:K.length}]);break;case f.ALPHANUMERIC:B.push([K,{data:K.data,mode:f.BYTE,length:K.length}]);break;case f.KANJI:B.push([K,{data:K.data,mode:f.BYTE,length:y(K.data)}]);break;case f.BYTE:B.push([{data:K.data,mode:f.BYTE,length:y(K.data)}])}}return B}function Z(q,B){const Y={},K={start:{}};let ot=["start"];for(let X=0;X<q.length;X++){const j=q[X],U=[];for(let Q=0;Q<j.length;Q++){const nt=j[Q],P=""+X+Q;U.push(P),Y[P]={node:nt,lastCount:0},K[P]={};for(let W=0;W<ot.length;W++){const tt=ot[W];Y[tt]&&Y[tt].node.mode===nt.mode?(K[tt][P]=k(Y[tt].lastCount+nt.length,nt.mode)-k(Y[tt].lastCount,nt.mode),Y[tt].lastCount+=nt.length):(Y[tt]&&(Y[tt].lastCount=nt.length),K[tt][P]=k(nt.length,nt.mode)+4+f.getCharCountIndicator(nt.mode,B))}}ot=U}for(let X=0;X<ot.length;X++)K[ot[X]].end=0;return{map:K,table:Y}}function F(q,B){let Y;const K=f.getBestModeForData(q);if(Y=f.from(B,K),Y!==f.BYTE&&Y.bit<K.bit)throw new Error('"'+q+'" cannot be encoded with mode '+f.toString(Y)+`.
 Suggested mode is: `+f.toString(K));switch(Y===f.KANJI&&!T.isKanjiModeEnabled()&&(Y=f.BYTE),Y){case f.NUMERIC:return new h(q);case f.ALPHANUMERIC:return new c(q);case f.KANJI:return new d(q);case f.BYTE:return new o(q)}}r.fromArray=function(B){return B.reduce(function(Y,K){return typeof K=="string"?Y.push(F(K,null)):K.data&&Y.push(F(K.data,K.mode)),Y},[])},r.fromString=function(B,Y){const K=z(B,T.isKanjiModeEnabled()),ot=L(K),X=Z(ot,Y),j=m.find_path(X.map,"start","end"),U=[];for(let Q=1;Q<j.length-1;Q++)U.push(X.table[j[Q]].node);return r.fromArray(H(U))},r.rawSplit=function(B){return r.fromArray(z(B,T.isKanjiModeEnabled()))}})(Gr)),Gr}var Ih;function Xp(){if(Ih)return Mr;Ih=1;const r=In(),f=as(),h=Cp(),c=_p(),o=Mp(),d=Dp(),S=Rp(),T=fm(),m=kp(),y=Hp(),O=Bp(),z=Fn(),k=Gp();function H(X,j){const U=X.size,Q=d.getPositions(j);for(let nt=0;nt<Q.length;nt++){const P=Q[nt][0],W=Q[nt][1];for(let tt=-1;tt<=7;tt++)if(!(P+tt<=-1||U<=P+tt))for(let it=-1;it<=7;it++)W+it<=-1||U<=W+it||(tt>=0&&tt<=6&&(it===0||it===6)||it>=0&&it<=6&&(tt===0||tt===6)||tt>=2&&tt<=4&&it>=2&&it<=4?X.set(P+tt,W+it,!0,!0):X.set(P+tt,W+it,!1,!0))}}function L(X){const j=X.size;for(let U=8;U<j-8;U++){const Q=U%2===0;X.set(U,6,Q,!0),X.set(6,U,Q,!0)}}function Z(X,j){const U=o.getPositions(j);for(let Q=0;Q<U.length;Q++){const nt=U[Q][0],P=U[Q][1];for(let W=-2;W<=2;W++)for(let tt=-2;tt<=2;tt++)W===-2||W===2||tt===-2||tt===2||W===0&&tt===0?X.set(nt+W,P+tt,!0,!0):X.set(nt+W,P+tt,!1,!0)}}function F(X,j){const U=X.size,Q=y.getEncodedBits(j);let nt,P,W;for(let tt=0;tt<18;tt++)nt=Math.floor(tt/3),P=tt%3+U-8-3,W=(Q>>tt&1)===1,X.set(nt,P,W,!0),X.set(P,nt,W,!0)}function q(X,j,U){const Q=X.size,nt=O.getEncodedBits(j,U);let P,W;for(P=0;P<15;P++)W=(nt>>P&1)===1,P<6?X.set(P,8,W,!0):P<8?X.set(P+1,8,W,!0):X.set(Q-15+P,8,W,!0),P<8?X.set(8,Q-P-1,W,!0):P<9?X.set(8,15-P-1+1,W,!0):X.set(8,15-P-1,W,!0);X.set(Q-8,8,1,!0)}function B(X,j){const U=X.size;let Q=-1,nt=U-1,P=7,W=0;for(let tt=U-1;tt>0;tt-=2)for(tt===6&&tt--;;){for(let it=0;it<2;it++)if(!X.isReserved(nt,tt-it)){let Lt=!1;W<j.length&&(Lt=(j[W]>>>P&1)===1),X.set(nt,tt-it,Lt),P--,P===-1&&(W++,P=7)}if(nt+=Q,nt<0||U<=nt){nt-=Q,Q=-Q;break}}}function Y(X,j,U){const Q=new h;U.forEach(function(it){Q.put(it.mode.bit,4),Q.put(it.getLength(),z.getCharCountIndicator(it.mode,X)),it.write(Q)});const nt=r.getSymbolTotalCodewords(X),P=T.getTotalCodewordsCount(X,j),W=(nt-P)*8;for(Q.getLengthInBits()+4<=W&&Q.put(0,4);Q.getLengthInBits()%8!==0;)Q.putBit(0);const tt=(W-Q.getLengthInBits())/8;for(let it=0;it<tt;it++)Q.put(it%2?17:236,8);return K(Q,X,j)}function K(X,j,U){const Q=r.getSymbolTotalCodewords(j),nt=T.getTotalCodewordsCount(j,U),P=Q-nt,W=T.getBlocksCount(j,U),tt=Q%W,it=W-tt,Lt=Math.floor(Q/W),C=Math.floor(P/W),V=C+1,at=Lt-C,Et=new m(at);let wt=0;const b=new Array(W),R=new Array(W);let G=0;const I=new Uint8Array(X.buffer);for(let Nt=0;Nt<W;Nt++){const Be=Nt<it?C:V;b[Nt]=I.slice(wt,wt+Be),R[Nt]=Et.encode(b[Nt]),wt+=Be,G=Math.max(G,Be)}const ut=new Uint8Array(Q);let ft=0,dt,Rt;for(dt=0;dt<G;dt++)for(Rt=0;Rt<W;Rt++)dt<b[Rt].length&&(ut[ft++]=b[Rt][dt]);for(dt=0;dt<at;dt++)for(Rt=0;Rt<W;Rt++)ut[ft++]=R[Rt][dt];return ut}function ot(X,j,U,Q){let nt;if(Array.isArray(X))nt=k.fromArray(X);else if(typeof X=="string"){let Lt=j;if(!Lt){const C=k.rawSplit(X);Lt=y.getBestVersionForData(C,U)}nt=k.fromString(X,Lt||40)}else throw new Error("Invalid data");const P=y.getBestVersionForData(nt,U);if(!P)throw new Error("The amount of data is too big to be stored in a QR Code");if(!j)j=P;else if(j<P)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+P+`.
`);const W=Y(j,U,nt),tt=r.getSymbolSize(j),it=new c(tt);return H(it,j),L(it),Z(it,j),q(it,U,0),j>=7&&F(it,j),B(it,W),isNaN(Q)&&(Q=S.getBestMask(it,q.bind(null,it,U))),S.applyMask(Q,it),q(it,U,Q),{modules:it,version:j,errorCorrectionLevel:U,maskPattern:Q,segments:nt}}return Mr.create=function(j,U){if(typeof j>"u"||j==="")throw new Error("No input text");let Q=f.M,nt,P;return typeof U<"u"&&(Q=f.from(U.errorCorrectionLevel,f.M),nt=y.from(U.version),P=S.from(U.maskPattern),U.toSJISFunc&&r.setToSJISFunction(U.toSJISFunc)),ot(j,nt,Q,P)},Mr}var Jr={},Ir={},Fh;function mm(){return Fh||(Fh=1,(function(r){function f(h){if(typeof h=="number"&&(h=h.toString()),typeof h!="string")throw new Error("Color should be defined as hex string");let c=h.slice().replace("#","").split("");if(c.length<3||c.length===5||c.length>8)throw new Error("Invalid hex color: "+h);(c.length===3||c.length===4)&&(c=Array.prototype.concat.apply([],c.map(function(d){return[d,d]}))),c.length===6&&c.push("F","F");const o=parseInt(c.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+c.slice(0,6).join("")}}r.getOptions=function(c){c||(c={}),c.color||(c.color={});const o=typeof c.margin>"u"||c.margin===null||c.margin<0?4:c.margin,d=c.width&&c.width>=21?c.width:void 0,S=c.scale||4;return{width:d,scale:d?4:S,margin:o,color:{dark:f(c.color.dark||"#000000ff"),light:f(c.color.light||"#ffffffff")},type:c.type,rendererOpts:c.rendererOpts||{}}},r.getScale=function(c,o){return o.width&&o.width>=c+o.margin*2?o.width/(c+o.margin*2):o.scale},r.getImageWidth=function(c,o){const d=r.getScale(c,o);return Math.floor((c+o.margin*2)*d)},r.qrToImageData=function(c,o,d){const S=o.modules.size,T=o.modules.data,m=r.getScale(S,d),y=Math.floor((S+d.margin*2)*m),O=d.margin*m,z=[d.color.light,d.color.dark];for(let k=0;k<y;k++)for(let H=0;H<y;H++){let L=(k*y+H)*4,Z=d.color.light;if(k>=O&&H>=O&&k<y-O&&H<y-O){const F=Math.floor((k-O)/m),q=Math.floor((H-O)/m);Z=z[T[F*S+q]?1:0]}c[L++]=Z.r,c[L++]=Z.g,c[L++]=Z.b,c[L]=Z.a}}})(Ir)),Ir}var Wh;function Qp(){return Wh||(Wh=1,(function(r){const f=mm();function h(o,d,S){o.clearRect(0,0,d.width,d.height),d.style||(d.style={}),d.height=S,d.width=S,d.style.height=S+"px",d.style.width=S+"px"}function c(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(d,S,T){let m=T,y=S;typeof m>"u"&&(!S||!S.getContext)&&(m=S,S=void 0),S||(y=c()),m=f.getOptions(m);const O=f.getImageWidth(d.modules.size,m),z=y.getContext("2d"),k=z.createImageData(O,O);return f.qrToImageData(k.data,d,m),h(z,y,O),z.putImageData(k,0,0),y},r.renderToDataURL=function(d,S,T){let m=T;typeof m>"u"&&(!S||!S.getContext)&&(m=S,S=void 0),m||(m={});const y=r.render(d,S,m),O=m.type||"image/png",z=m.rendererOpts||{};return y.toDataURL(O,z.quality)}})(Jr)),Jr}var Fr={},$h;function Vp(){if($h)return Fr;$h=1;const r=mm();function f(o,d){const S=o.a/255,T=d+'="'+o.hex+'"';return S<1?T+" "+d+'-opacity="'+S.toFixed(2).slice(1)+'"':T}function h(o,d,S){let T=o+d;return typeof S<"u"&&(T+=" "+S),T}function c(o,d,S){let T="",m=0,y=!1,O=0;for(let z=0;z<o.length;z++){const k=Math.floor(z%d),H=Math.floor(z/d);!k&&!y&&(y=!0),o[z]?(O++,z>0&&k>0&&o[z-1]||(T+=y?h("M",k+S,.5+H+S):h("m",m,0),m=0,y=!1),k+1<d&&o[z+1]||(T+=h("h",O),O=0)):m++}return T}return Fr.render=function(d,S,T){const m=r.getOptions(S),y=d.modules.size,O=d.modules.data,z=y+m.margin*2,k=m.color.light.a?"<path "+f(m.color.light,"fill")+' d="M0 0h'+z+"v"+z+'H0z"/>':"",H="<path "+f(m.color.dark,"stroke")+' d="'+c(O,y,m.margin)+'"/>',L='viewBox="0 0 '+z+" "+z+'"',F='<svg xmlns="http://www.w3.org/2000/svg" '+(m.width?'width="'+m.width+'" height="'+m.width+'" ':"")+L+' shape-rendering="crispEdges">'+k+H+`</svg>
`;return typeof T=="function"&&T(null,F),F},Fr}var Ph;function Zp(){if(Ph)return Ba;Ph=1;const r=Np(),f=Xp(),h=Qp(),c=Vp();function o(d,S,T,m,y){const O=[].slice.call(arguments,1),z=O.length,k=typeof O[z-1]=="function";if(!k&&!r())throw new Error("Callback required as last argument");if(k){if(z<2)throw new Error("Too few arguments provided");z===2?(y=T,T=S,S=m=void 0):z===3&&(S.getContext&&typeof y>"u"?(y=m,m=void 0):(y=m,m=T,T=S,S=void 0))}else{if(z<1)throw new Error("Too few arguments provided");return z===1?(T=S,S=m=void 0):z===2&&!S.getContext&&(m=T,T=S,S=void 0),new Promise(function(H,L){try{const Z=f.create(T,m);H(d(Z,S,m))}catch(Z){L(Z)}})}try{const H=f.create(T,m);y(null,d(H,S,m))}catch(H){y(H)}}return Ba.create=f.create,Ba.toCanvas=o.bind(null,h.render),Ba.toDataURL=o.bind(null,h.renderToDataURL),Ba.toString=o.bind(null,function(d,S,T){return c.render(d,T)}),Ba}var Kp=Zp();const Jp=L0(Kp),Wr=`${window.location.origin}/hpde/pr-preview/pr-162/`;function Ip(){const[r,f]=yt.useState(!1),[h,c]=yt.useState(null);yt.useEffect(()=>{window.scrollTo(0,0),Jp.toDataURL(Wr,{margin:1,width:240}).then(c).catch(()=>c(null))},[]);async function o(){await navigator.clipboard.writeText(Wr),f(!0),setTimeout(()=>f(!1),2e3)}return p.jsx("div",{className:"min-h-screen bg-gray-50",children:p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),p.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:p.jsx(es,{size:18})})]}),p.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),p.jsxs("button",{onClick:o,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[p.jsx("span",{className:"truncate text-sm text-gray-800",children:Wr}),r?p.jsx(au,{size:16,className:"shrink-0 text-green-600"}):p.jsx(cm,{size:16,className:"shrink-0 text-gray-400"})]}),p.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:h&&p.jsx("img",{src:h,alt:"QR code for schedule link",width:240,height:240})})]})})}const Fp=350,Wp="cubic-bezier(0.32, 0.72, 0, 1)";function $p(r){try{return new URL(r).hostname.replace(/^www\./,"")}catch{return r}}function Pp(r){const f=r.trim().toLowerCase();return f==="clockwise"?"CW (clockwise)":f==="counter-clockwise"||f==="counterclockwise"?"CCW (counter-clockwise)":r}function t1(r,f){return[r,f&&Pp(f)].filter(Boolean).join(" ")}function Ol({icon:r,label:f,subtitle:h,children:c}){return p.jsxs("div",{className:"grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[p.jsxs("span",{className:"flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[p.jsx(r,{size:14,className:"shrink-0 text-gray-400"}),f]}),p.jsxs("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:[c,h&&p.jsx("span",{className:"mt-0.5 block text-xs font-normal text-gray-400",children:h})]})]})}function e1({event:r,open:f,onClose:h}){var T;yt.useEffect(()=>{if(!f)return;const m=y=>{y.key==="Escape"&&h()};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[f,h]),yt.useEffect(()=>{if(!f)return;const m=document.documentElement,y=m.style.overflow,O=document.body.style.overflow;return m.style.overflow="hidden",document.body.style.overflow="hidden",()=>{m.style.overflow=y,document.body.style.overflow=O}},[f]);const c=op(r.days),o=t1(r.configuration,r.direction),d=!!((T=r.scheduleScans)!=null&&T.length),S=c||r.organizer||r.track||o||r.link||d;return p.jsxs(p.Fragment,{children:[p.jsx("div",{"aria-hidden":"true",inert:!f,onClick:h,className:"fixed inset-0 z-40",style:{pointerEvents:f?"auto":"none"}}),p.jsx("div",{role:"dialog","aria-modal":f,"aria-labelledby":"event-details-title",inert:!f,className:"fixed inset-y-0 right-0 z-50 flex w-full bg-white md:w-[480px] md:max-w-[60vw]",style:{transform:f?"translate3d(0,0,0)":"translate3d(100%,0,0)",transition:`transform ${Fp}ms ${Wp}`,boxShadow:f?"-8px 0 24px rgba(0,0,0,0.08)":"none",willChange:"transform"},children:p.jsxs("div",{className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none",children:[p.jsxs("div",{className:"mb-5 flex items-start gap-2 md:justify-between md:gap-4",children:[p.jsx("button",{onClick:h,"aria-label":"Back",className:"inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden",children:p.jsx(P0,{size:20})}),p.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"}),p.jsx("button",{onClick:h,"aria-label":"Close",className:"hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid",children:p.jsx(es,{size:20})})]}),S?p.jsxs(p.Fragment,{children:[p.jsxs("div",{className:"pl-1",children:[c&&p.jsx(Ol,{icon:im,label:"Dates",children:c}),r.organizer&&p.jsx(Ol,{icon:rp,label:"Organizer",children:r.organizer}),r.track&&p.jsx(Ol,{icon:lp,label:"Location",subtitle:r.city,children:r.track}),o&&p.jsx(Ol,{icon:cp,label:"Track config",children:o}),r.link&&p.jsx(Ol,{icon:ap,label:"Event page",children:p.jsxs("a",{href:r.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[$p(r.link),p.jsx(tp,{size:12,className:"text-gray-400"})]})})]}),d&&p.jsxs("div",{className:"mt-6 pl-1",children:[p.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[p.jsx(ep,{size:14,className:"shrink-0 text-gray-400"}),"Original schedule"]}),p.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:r.scheduleScans.map((m,y)=>p.jsx("a",{href:m,target:"_blank",rel:"noopener noreferrer",children:p.jsx("img",{src:m,alt:`Original schedule scan ${y+1}`,className:"aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"})},m))})]})]}):p.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})})]})}function Ua(r,f){const h=f.split(`
`).map(Z=>Z.trim());let c="",o,d,S,T,m,y,O;const z=[],k=[];let H=null,L=!1;for(const Z of h){if(!Z||Z.startsWith("//"))continue;const F=Z.replace(/^-\s+/,"");if(F.startsWith("# ")){c=F.slice(2).trim();continue}if(F.startsWith("subtitle:")){o=F.slice(9).trim()||void 0;continue}if(F.startsWith("link:")){d=F.slice(5).trim()||void 0;continue}if(F.startsWith("organizer:")){S=F.slice(10).trim()||void 0;continue}if(F.startsWith("track:")){T=F.slice(6).trim()||void 0;continue}if(F.startsWith("city:")){m=F.slice(5).trim()||void 0;continue}if(F.startsWith("configuration:")){y=F.slice(14).trim()||void 0;continue}if(F.startsWith("config:")){y=F.slice(7).trim()||void 0;continue}if(F.startsWith("direction:")){O=F.slice(10).trim()||void 0;continue}if(F.startsWith("## ")){const q=F.slice(3).trim();if(q.toLowerCase()==="groups"){L=!0,H=null;continue}const B=q.split("|").map(Y=>Y.trim());B.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(B[1])?(L=!1,H={id:B[0].toLowerCase().replace(/\s+/g,"-"),label:B[0],date:B[1],activities:[]},k.push(H)):L=!1;continue}if(L){const q=F.split("|").map(B=>B.trim());if(q.length>=4){const B=q[4]||void 0;z.push({id:q[0],label:q[1],bgClass:q[2],textClass:q[3],...B?{description:B}:{}})}continue}if(H){if(/^\d{2}:\d{2}/.test(F)){const q=n1(F);q&&H.activities.push(q)}else if(/^break\s*\|/.test(F)){const q=F.slice(F.indexOf("|")+1).trim();H.activities.push({type:"break",label:q})}}}return{id:r,name:c,...o?{subtitle:o}:{},...d?{link:d}:{},...S?{organizer:S}:{},...T?{track:T}:{},...m?{city:m}:{},...y?{configuration:y}:{},...O?{direction:O}:{},runGroups:z,days:k}}function n1(r){const f=r.split("|").map(T=>T.trim()),h=f[0],c=f.slice(1),o=h.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!o)return null;const d=o[1],S=o[2].trim();if(/^(general|lunch|special)$/.test(S)){const T=S,m=c[0]??"",y=c[1]||void 0;return{time:d,type:T,label:m,...y?{subtitle:y}:{}}}if(/^session/.test(S)){const T=S.match(/^session\s+(\d+)/),m=T?parseInt(T[1],10):void 0;let y=[],O=[],z;for(const k of c)k.startsWith("track:")?y=k.slice(6).trim().split(",").map(H=>H.trim()).filter(Boolean):k.startsWith("class:")?O=k.slice(6).trim().split(",").map(H=>H.trim()).filter(Boolean):k.startsWith("note:")&&(z=k.slice(5).trim()||void 0);return{time:d,type:"session",...m!==void 0?{sessionNumber:m}:{},onTrack:y,...O.length?{inClass:O}:{},...z?{note:z}:{}}}return null}const a1=`# TDE at MSRC 1.7CW

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
`,ls="/hpde/pr-preview/pr-162/assets/msrc-1-7-D9G0r_nf.jpg",l1={...Ua("2026-09-11_msrc-1-7",a1),mapImage:ls},i1=`# SCCA at MSRC 1.7 CW

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
`,u1={...Ua("2026-09-13_msr-scca",i1),mapImage:ls},c1=`# TDE at MSRC 1.7 Fast Track

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
`,r1={...Ua("2026-06-06_msrc-1-7",c1),mapImage:ls},s1=`# TDE at MSRC 3.1

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
`,o1="/hpde/pr-preview/pr-162/assets/msrc-3-1-BsOP6CK2.png",f1={...Ua("2025-11-07_msrc-3-1",s1),mapImage:o1},d1=`# TDE at ECR 2.7

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
`,h1="/hpde/pr-preview/pr-162/assets/ecr-BW_3Ndfh.png",m1={...Ua("2026-05-30_ecr-2-7",d1),mapImage:h1},g1=`# Test Event

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
`,tm=Ua("test-live",g1),p1={...tm,days:tm.days.map(r=>({...r,date:kl()}))},eu=[l1,u1,r1,m1,f1].sort((r,f)=>f.id.localeCompare(r.id)),em=[...eu,p1];function tu(r,f){const[h,c]=yt.useState(()=>{try{const o=localStorage.getItem(r);return o!==null?JSON.parse(o):f}catch{return f}});return yt.useEffect(()=>{localStorage.setItem(r,JSON.stringify(h))},[r,h]),[h,c]}function gm(r){const f=kl();return r.days.find(h=>h.date===f)}function nm(r){return gm(r)??r.days[0]}function y1(){const[r,f]=yt.useState(()=>window.location.hash);yt.useEffect(()=>{const c=()=>{f(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",c),()=>window.removeEventListener("hashchange",c)},[]);function h(c){window.location.hash!==c&&(window.location.hash=c)}return[r,h]}const Pr="#/event/";function am(r){return`${Pr}${encodeURIComponent(r)}`}function v1(r){return r.startsWith(Pr)?decodeURIComponent(r.slice(Pr.length)):null}function b1(){const[r,f]=y1(),[h,c]=yt.useState("schedule"),[o,d]=tu("hpde:activeEvent",eu[0].id),[S,T]=tu("hpde:activeDay",null),[m,y]=tu("hpde:groups",[]),[O,z]=tu("hpde:hidePast",!1),[k,H]=yt.useState(!1),L=em.find(U=>U.id===o)??eu[0],Z=L.days.find(U=>U.id===S)??nm(L),F=gm(L),q=Z.date===kl(),B=L.days.length>1,K=L.days.reduce((U,Q)=>Q.date>U?Q.date:U,L.days[0].date)<kl(),[,ot]=yt.useState(0);yt.useEffect(()=>{if(!q)return;const U=setInterval(()=>ot(Q=>Q+1),6e4);return()=>clearInterval(U)},[q]);const X=q&&Z.activities.some(U=>U.type!=="break"&&en(U.time)<ns());function j(U){d(U.id),T(nm(U).id),y([]),f(am(U.id))}return yt.useEffect(()=>{const U=v1(r);if(U){const Q=em.find(nt=>nt.id===U);Q&&Q.id!==o&&j(Q);return}(r===""||r==="#")&&f(am(o))},[r]),r==="#/widget-script"?p.jsx(Ap,{}):r==="#/share"?p.jsx(Ip,{}):p.jsxs(p.Fragment,{children:[p.jsx(Ep,{children:p.jsxs("div",{className:"min-h-screen bg-gray-50",children:[p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[p.jsx(Sp,{events:eu,active:L,onChange:j,onOpenDetails:()=>H(!0)}),p.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[p.jsx("button",{onClick:()=>c("schedule"),className:`rounded-md p-2 transition-colors ${h==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:p.jsx(im,{size:18})}),p.jsx("button",{onClick:()=>c("map"),className:`rounded-md p-2 transition-colors ${h==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:p.jsx(vh,{size:18})})]})]}),K&&p.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),h==="schedule"&&p.jsxs(p.Fragment,{children:[B&&p.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[p.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:L.days.map(U=>p.jsx("button",{onClick:()=>T(U.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${Z.id===U.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:U.label},U.id))}),p.jsx("button",{onClick:()=>F&&T(F.id),disabled:q||!F,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${q||!F?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx(bp,{groups:L.runGroups,selected:m,onChange:y}),X&&p.jsx(wp,{checked:O,onChange:()=>z(U=>!U),label:"Hide past activities"})]}),p.jsx(vp,{activities:Z.activities,runGroups:L.runGroups,isToday:q,selectedGroups:m,hidePast:O}),p.jsx(xp,{groups:L.runGroups})]}),h==="map"&&(L.mapImage?p.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:p.jsx("img",{src:L.mapImage,alt:`${L.name} track map`,className:"block w-full h-auto"})}):p.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:p.jsxs("div",{className:"text-center",children:[p.jsx(vh,{size:40,className:"mx-auto mb-2 opacity-30"}),p.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),p.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[p.jsxs("div",{children:[p.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",p.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),p.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",gp("2026-09-18T12:12:35-05:00")]})]})]})}),p.jsx(e1,{event:L,open:k,onClose:()=>H(!1)})]})}I0.createRoot(document.getElementById("root")).render(p.jsx(yt.StrictMode,{children:p.jsx(b1,{})}));
