(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const S of d.addedNodes)S.tagName==="LINK"&&S.rel==="modulepreload"&&c(S)}).observe(document,{childList:!0,subtree:!0});function h(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function c(s){if(s.ep)return;s.ep=!0;const d=h(s);fetch(s.href,d)}})();function Mg(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Eo={exports:{}},_a={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ah;function zg(){if(ah)return _a;ah=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function h(c,s,d){var S=null;if(d!==void 0&&(S=""+d),s.key!==void 0&&(S=""+s.key),"key"in s){d={};for(var w in s)w!=="key"&&(d[w]=s[w])}else d=s;return s=d.ref,{$$typeof:r,type:c,key:S,ref:s!==void 0?s:null,props:d}}return _a.Fragment=f,_a.jsx=h,_a.jsxs=h,_a}var ih;function Dg(){return ih||(ih=1,Eo.exports=zg()),Eo.exports}var E=Dg(),wo={exports:{}},ut={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uh;function Og(){if(uh)return ut;uh=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),S=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),M=Symbol.for("react.lazy"),R=Symbol.for("react.activity"),D=Symbol.iterator;function j(p){return p===null||typeof p!="object"?null:(p=D&&p[D]||p["@@iterator"],typeof p=="function"?p:null)}var Y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},K=Object.assign,pt={};function W(p,B,G){this.props=p,this.context=B,this.refs=pt,this.updater=G||Y}W.prototype.isReactComponent={},W.prototype.setState=function(p,B){if(typeof p!="object"&&typeof p!="function"&&p!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,p,B,"setState")},W.prototype.forceUpdate=function(p){this.updater.enqueueForceUpdate(this,p,"forceUpdate")};function L(){}L.prototype=W.prototype;function q(p,B,G){this.props=p,this.context=B,this.refs=pt,this.updater=G||Y}var X=q.prototype=new L;X.constructor=q,K(X,W.prototype),X.isPureReactComponent=!0;var ot=Array.isArray;function U(){}var H={H:null,A:null,T:null,S:null},V=Object.prototype.hasOwnProperty;function Q(p,B,G){var J=G.ref;return{$$typeof:r,type:p,key:B,ref:J!==void 0?J:null,props:G}}function et(p,B){return Q(p.type,B,p.props)}function $(p){return typeof p=="object"&&p!==null&&p.$$typeof===r}function F(p){var B={"=":"=0",":":"=2"};return"$"+p.replace(/[=:]/g,function(G){return B[G]})}var P=/\/+/g;function at(p,B){return typeof p=="object"&&p!==null&&p.key!=null?F(""+p.key):B.toString(36)}function qt(p){switch(p.status){case"fulfilled":return p.value;case"rejected":throw p.reason;default:switch(typeof p.status=="string"?p.then(U,U):(p.status="pending",p.then(function(B){p.status==="pending"&&(p.status="fulfilled",p.value=B)},function(B){p.status==="pending"&&(p.status="rejected",p.reason=B)})),p.status){case"fulfilled":return p.value;case"rejected":throw p.reason}}throw p}function N(p,B,G,J,it){var st=typeof p;(st==="undefined"||st==="boolean")&&(p=null);var ft=!1;if(p===null)ft=!0;else switch(st){case"bigint":case"string":case"number":ft=!0;break;case"object":switch(p.$$typeof){case r:case f:ft=!0;break;case M:return ft=p._init,N(ft(p._payload),B,G,J,it)}}if(ft)return it=it(p),ft=J===""?"."+at(p,0):J,ot(it)?(G="",ft!=null&&(G=ft.replace(P,"$&/")+"/"),N(it,B,G,"",function(He){return He})):it!=null&&($(it)&&(it=et(it,G+(it.key==null||p&&p.key===it.key?"":(""+it.key).replace(P,"$&/")+"/")+ft)),B.push(it)),1;ft=0;var zt=J===""?".":J+":";if(ot(p))for(var Ct=0;Ct<p.length;Ct++)J=p[Ct],st=zt+at(J,Ct),ft+=N(J,B,G,st,it);else if(Ct=j(p),typeof Ct=="function")for(p=Ct.call(p),Ct=0;!(J=p.next()).done;)J=J.value,st=zt+at(J,Ct++),ft+=N(J,B,G,st,it);else if(st==="object"){if(typeof p.then=="function")return N(qt(p),B,G,J,it);throw B=String(p),Error("Objects are not valid as a React child (found: "+(B==="[object Object]"?"object with keys {"+Object.keys(p).join(", ")+"}":B)+"). If you meant to render a collection of children, use an array instead.")}return ft}function k(p,B,G){if(p==null)return p;var J=[],it=0;return N(p,J,"","",function(st){return B.call(G,st,it++)}),J}function nt(p){if(p._status===-1){var B=p._result;B=B(),B.then(function(G){(p._status===0||p._status===-1)&&(p._status=1,p._result=G)},function(G){(p._status===0||p._status===-1)&&(p._status=2,p._result=G)}),p._status===-1&&(p._status=0,p._result=B)}if(p._status===1)return p._result.default;throw p._result}var Tt=typeof reportError=="function"?reportError:function(p){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var B=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof p=="object"&&p!==null&&typeof p.message=="string"?String(p.message):String(p),error:p});if(!window.dispatchEvent(B))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",p);return}console.error(p)},Et={map:k,forEach:function(p,B,G){k(p,function(){B.apply(this,arguments)},G)},count:function(p){var B=0;return k(p,function(){B++}),B},toArray:function(p){return k(p,function(B){return B})||[]},only:function(p){if(!$(p))throw Error("React.Children.only expected to receive a single React element child.");return p}};return ut.Activity=R,ut.Children=Et,ut.Component=W,ut.Fragment=h,ut.Profiler=s,ut.PureComponent=q,ut.StrictMode=c,ut.Suspense=g,ut.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=H,ut.__COMPILER_RUNTIME={__proto__:null,c:function(p){return H.H.useMemoCache(p)}},ut.cache=function(p){return function(){return p.apply(null,arguments)}},ut.cacheSignal=function(){return null},ut.cloneElement=function(p,B,G){if(p==null)throw Error("The argument must be a React element, but you passed "+p+".");var J=K({},p.props),it=p.key;if(B!=null)for(st in B.key!==void 0&&(it=""+B.key),B)!V.call(B,st)||st==="key"||st==="__self"||st==="__source"||st==="ref"&&B.ref===void 0||(J[st]=B[st]);var st=arguments.length-2;if(st===1)J.children=G;else if(1<st){for(var ft=Array(st),zt=0;zt<st;zt++)ft[zt]=arguments[zt+2];J.children=ft}return Q(p.type,it,J)},ut.createContext=function(p){return p={$$typeof:S,_currentValue:p,_currentValue2:p,_threadCount:0,Provider:null,Consumer:null},p.Provider=p,p.Consumer={$$typeof:d,_context:p},p},ut.createElement=function(p,B,G){var J,it={},st=null;if(B!=null)for(J in B.key!==void 0&&(st=""+B.key),B)V.call(B,J)&&J!=="key"&&J!=="__self"&&J!=="__source"&&(it[J]=B[J]);var ft=arguments.length-2;if(ft===1)it.children=G;else if(1<ft){for(var zt=Array(ft),Ct=0;Ct<ft;Ct++)zt[Ct]=arguments[Ct+2];it.children=zt}if(p&&p.defaultProps)for(J in ft=p.defaultProps,ft)it[J]===void 0&&(it[J]=ft[J]);return Q(p,st,it)},ut.createRef=function(){return{current:null}},ut.forwardRef=function(p){return{$$typeof:w,render:p}},ut.isValidElement=$,ut.lazy=function(p){return{$$typeof:M,_payload:{_status:-1,_result:p},_init:nt}},ut.memo=function(p,B){return{$$typeof:v,type:p,compare:B===void 0?null:B}},ut.startTransition=function(p){var B=H.T,G={};H.T=G;try{var J=p(),it=H.S;it!==null&&it(G,J),typeof J=="object"&&J!==null&&typeof J.then=="function"&&J.then(U,Tt)}catch(st){Tt(st)}finally{B!==null&&G.types!==null&&(B.types=G.types),H.T=B}},ut.unstable_useCacheRefresh=function(){return H.H.useCacheRefresh()},ut.use=function(p){return H.H.use(p)},ut.useActionState=function(p,B,G){return H.H.useActionState(p,B,G)},ut.useCallback=function(p,B){return H.H.useCallback(p,B)},ut.useContext=function(p){return H.H.useContext(p)},ut.useDebugValue=function(){},ut.useDeferredValue=function(p,B){return H.H.useDeferredValue(p,B)},ut.useEffect=function(p,B){return H.H.useEffect(p,B)},ut.useEffectEvent=function(p){return H.H.useEffectEvent(p)},ut.useId=function(){return H.H.useId()},ut.useImperativeHandle=function(p,B,G){return H.H.useImperativeHandle(p,B,G)},ut.useInsertionEffect=function(p,B){return H.H.useInsertionEffect(p,B)},ut.useLayoutEffect=function(p,B){return H.H.useLayoutEffect(p,B)},ut.useMemo=function(p,B){return H.H.useMemo(p,B)},ut.useOptimistic=function(p,B){return H.H.useOptimistic(p,B)},ut.useReducer=function(p,B,G){return H.H.useReducer(p,B,G)},ut.useRef=function(p){return H.H.useRef(p)},ut.useState=function(p){return H.H.useState(p)},ut.useSyncExternalStore=function(p,B,G){return H.H.useSyncExternalStore(p,B,G)},ut.useTransition=function(){return H.H.useTransition()},ut.version="19.2.6",ut}var ch;function Po(){return ch||(ch=1,wo.exports=Og()),wo.exports}var vt=Po(),To={exports:{}},Ra={},Ao={exports:{}},xo={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oh;function Bg(){return oh||(oh=1,(function(r){function f(N,k){var nt=N.length;N.push(k);t:for(;0<nt;){var Tt=nt-1>>>1,Et=N[Tt];if(0<s(Et,k))N[Tt]=k,N[nt]=Et,nt=Tt;else break t}}function h(N){return N.length===0?null:N[0]}function c(N){if(N.length===0)return null;var k=N[0],nt=N.pop();if(nt!==k){N[0]=nt;t:for(var Tt=0,Et=N.length,p=Et>>>1;Tt<p;){var B=2*(Tt+1)-1,G=N[B],J=B+1,it=N[J];if(0>s(G,nt))J<Et&&0>s(it,G)?(N[Tt]=it,N[J]=nt,Tt=J):(N[Tt]=G,N[B]=nt,Tt=B);else if(J<Et&&0>s(it,nt))N[Tt]=it,N[J]=nt,Tt=J;else break t}}return k}function s(N,k){var nt=N.sortIndex-k.sortIndex;return nt!==0?nt:N.id-k.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;r.unstable_now=function(){return d.now()}}else{var S=Date,w=S.now();r.unstable_now=function(){return S.now()-w}}var g=[],v=[],M=1,R=null,D=3,j=!1,Y=!1,K=!1,pt=!1,W=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,q=typeof setImmediate<"u"?setImmediate:null;function X(N){for(var k=h(v);k!==null;){if(k.callback===null)c(v);else if(k.startTime<=N)c(v),k.sortIndex=k.expirationTime,f(g,k);else break;k=h(v)}}function ot(N){if(K=!1,X(N),!Y)if(h(g)!==null)Y=!0,U||(U=!0,F());else{var k=h(v);k!==null&&qt(ot,k.startTime-N)}}var U=!1,H=-1,V=5,Q=-1;function et(){return pt?!0:!(r.unstable_now()-Q<V)}function $(){if(pt=!1,U){var N=r.unstable_now();Q=N;var k=!0;try{t:{Y=!1,K&&(K=!1,L(H),H=-1),j=!0;var nt=D;try{e:{for(X(N),R=h(g);R!==null&&!(R.expirationTime>N&&et());){var Tt=R.callback;if(typeof Tt=="function"){R.callback=null,D=R.priorityLevel;var Et=Tt(R.expirationTime<=N);if(N=r.unstable_now(),typeof Et=="function"){R.callback=Et,X(N),k=!0;break e}R===h(g)&&c(g),X(N)}else c(g);R=h(g)}if(R!==null)k=!0;else{var p=h(v);p!==null&&qt(ot,p.startTime-N),k=!1}}break t}finally{R=null,D=nt,j=!1}k=void 0}}finally{k?F():U=!1}}}var F;if(typeof q=="function")F=function(){q($)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,at=P.port2;P.port1.onmessage=$,F=function(){at.postMessage(null)}}else F=function(){W($,0)};function qt(N,k){H=W(function(){N(r.unstable_now())},k)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(N){N.callback=null},r.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):V=0<N?Math.floor(1e3/N):5},r.unstable_getCurrentPriorityLevel=function(){return D},r.unstable_next=function(N){switch(D){case 1:case 2:case 3:var k=3;break;default:k=D}var nt=D;D=k;try{return N()}finally{D=nt}},r.unstable_requestPaint=function(){pt=!0},r.unstable_runWithPriority=function(N,k){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var nt=D;D=N;try{return k()}finally{D=nt}},r.unstable_scheduleCallback=function(N,k,nt){var Tt=r.unstable_now();switch(typeof nt=="object"&&nt!==null?(nt=nt.delay,nt=typeof nt=="number"&&0<nt?Tt+nt:Tt):nt=Tt,N){case 1:var Et=-1;break;case 2:Et=250;break;case 5:Et=1073741823;break;case 4:Et=1e4;break;default:Et=5e3}return Et=nt+Et,N={id:M++,callback:k,priorityLevel:N,startTime:nt,expirationTime:Et,sortIndex:-1},nt>Tt?(N.sortIndex=nt,f(v,N),h(g)===null&&N===h(v)&&(K?(L(H),H=-1):K=!0,qt(ot,nt-Tt))):(N.sortIndex=Et,f(g,N),Y||j||(Y=!0,U||(U=!0,F()))),N},r.unstable_shouldYield=et,r.unstable_wrapCallback=function(N){var k=D;return function(){var nt=D;D=k;try{return N.apply(this,arguments)}finally{D=nt}}}})(xo)),xo}var rh;function Ug(){return rh||(rh=1,Ao.exports=Bg()),Ao.exports}var Co={exports:{}},$t={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sh;function Hg(){if(sh)return $t;sh=1;var r=Po();function f(g){var v="https://react.dev/errors/"+g;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var M=2;M<arguments.length;M++)v+="&args[]="+encodeURIComponent(arguments[M])}return"Minified React error #"+g+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(){}var c={d:{f:h,r:function(){throw Error(f(522))},D:h,C:h,L:h,m:h,X:h,S:h,M:h},p:0,findDOMNode:null},s=Symbol.for("react.portal");function d(g,v,M){var R=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:s,key:R==null?null:""+R,children:g,containerInfo:v,implementation:M}}var S=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function w(g,v){if(g==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return $t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,$t.createPortal=function(g,v){var M=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(f(299));return d(g,v,null,M)},$t.flushSync=function(g){var v=S.T,M=c.p;try{if(S.T=null,c.p=2,g)return g()}finally{S.T=v,c.p=M,c.d.f()}},$t.preconnect=function(g,v){typeof g=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,c.d.C(g,v))},$t.prefetchDNS=function(g){typeof g=="string"&&c.d.D(g)},$t.preinit=function(g,v){if(typeof g=="string"&&v&&typeof v.as=="string"){var M=v.as,R=w(M,v.crossOrigin),D=typeof v.integrity=="string"?v.integrity:void 0,j=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;M==="style"?c.d.S(g,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:R,integrity:D,fetchPriority:j}):M==="script"&&c.d.X(g,{crossOrigin:R,integrity:D,fetchPriority:j,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},$t.preinitModule=function(g,v){if(typeof g=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var M=w(v.as,v.crossOrigin);c.d.M(g,{crossOrigin:M,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&c.d.M(g)},$t.preload=function(g,v){if(typeof g=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var M=v.as,R=w(M,v.crossOrigin);c.d.L(g,M,{crossOrigin:R,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},$t.preloadModule=function(g,v){if(typeof g=="string")if(v){var M=w(v.as,v.crossOrigin);c.d.m(g,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:M,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else c.d.m(g)},$t.requestFormReset=function(g){c.d.r(g)},$t.unstable_batchedUpdates=function(g,v){return g(v)},$t.useFormState=function(g,v,M){return S.H.useFormState(g,v,M)},$t.useFormStatus=function(){return S.H.useHostTransitionStatus()},$t.version="19.2.6",$t}var fh;function jg(){if(fh)return Co.exports;fh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),Co.exports=Hg(),Co.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dh;function Lg(){if(dh)return Ra;dh=1;var r=Ug(),f=Po(),h=jg();function c(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function d(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function S(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function w(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function g(t){if(d(t)!==t)throw Error(c(188))}function v(t){var e=t.alternate;if(!e){if(e=d(t),e===null)throw Error(c(188));return e!==t?null:t}for(var n=t,l=e;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(l=a.return,l!==null){n=l;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return g(a),t;if(i===l)return g(a),e;i=i.sibling}throw Error(c(188))}if(n.return!==l.return)n=a,l=i;else{for(var u=!1,o=a.child;o;){if(o===n){u=!0,n=a,l=i;break}if(o===l){u=!0,l=a,n=i;break}o=o.sibling}if(!u){for(o=i.child;o;){if(o===n){u=!0,n=i,l=a;break}if(o===l){u=!0,l=i,n=a;break}o=o.sibling}if(!u)throw Error(c(189))}}if(n.alternate!==l)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?t:e}function M(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=M(t),e!==null)return e;t=t.sibling}return null}var R=Object.assign,D=Symbol.for("react.element"),j=Symbol.for("react.transitional.element"),Y=Symbol.for("react.portal"),K=Symbol.for("react.fragment"),pt=Symbol.for("react.strict_mode"),W=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),q=Symbol.for("react.context"),X=Symbol.for("react.forward_ref"),ot=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),H=Symbol.for("react.memo"),V=Symbol.for("react.lazy"),Q=Symbol.for("react.activity"),et=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function F(t){return t===null||typeof t!="object"?null:(t=$&&t[$]||t["@@iterator"],typeof t=="function"?t:null)}var P=Symbol.for("react.client.reference");function at(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===P?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case K:return"Fragment";case W:return"Profiler";case pt:return"StrictMode";case ot:return"Suspense";case U:return"SuspenseList";case Q:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Y:return"Portal";case q:return t.displayName||"Context";case L:return(t._context.displayName||"Context")+".Consumer";case X:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case H:return e=t.displayName||null,e!==null?e:at(t.type)||"Memo";case V:e=t._payload,t=t._init;try{return at(t(e))}catch{}}return null}var qt=Array.isArray,N=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,nt={pending:!1,data:null,method:null,action:null},Tt=[],Et=-1;function p(t){return{current:t}}function B(t){0>Et||(t.current=Tt[Et],Tt[Et]=null,Et--)}function G(t,e){Et++,Tt[Et]=t.current,t.current=e}var J=p(null),it=p(null),st=p(null),ft=p(null);function zt(t,e){switch(G(st,e),G(it,t),G(J,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Nd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Nd(e),t=_d(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}B(J),G(J,t)}function Ct(){B(J),B(it),B(st)}function He(t){t.memoizedState!==null&&G(ft,t);var e=J.current,n=_d(e,t.type);e!==n&&(G(it,t),G(J,n))}function Oa(t){it.current===t&&(B(J),B(it)),ft.current===t&&(B(ft),Aa._currentValue=nt)}var nu,nr;function Rn(t){if(nu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);nu=e&&e[1]||"",nr=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+nu+t+nr}var lu=!1;function au(t,e){if(!t||lu)return"";lu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var O=function(){throw Error()};if(Object.defineProperty(O.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(O,[])}catch(C){var x=C}Reflect.construct(t,[],O)}else{try{O.call()}catch(C){x=C}t.call(O.prototype)}}else{try{throw Error()}catch(C){x=C}(O=t())&&typeof O.catch=="function"&&O.catch(function(){})}}catch(C){if(C&&x&&typeof C.stack=="string")return[C.stack,x.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),u=i[0],o=i[1];if(u&&o){var m=u.split(`
`),A=o.split(`
`);for(a=l=0;l<m.length&&!m[l].includes("DetermineComponentFrameRoot");)l++;for(;a<A.length&&!A[a].includes("DetermineComponentFrameRoot");)a++;if(l===m.length||a===A.length)for(l=m.length-1,a=A.length-1;1<=l&&0<=a&&m[l]!==A[a];)a--;for(;1<=l&&0<=a;l--,a--)if(m[l]!==A[a]){if(l!==1||a!==1)do if(l--,a--,0>a||m[l]!==A[a]){var _=`
`+m[l].replace(" at new "," at ");return t.displayName&&_.includes("<anonymous>")&&(_=_.replace("<anonymous>",t.displayName)),_}while(1<=l&&0<=a);break}}}finally{lu=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Rn(n):""}function c0(t,e){switch(t.tag){case 26:case 27:case 5:return Rn(t.type);case 16:return Rn("Lazy");case 13:return t.child!==e&&e!==null?Rn("Suspense Fallback"):Rn("Suspense");case 19:return Rn("SuspenseList");case 0:case 15:return au(t.type,!1);case 11:return au(t.type.render,!1);case 1:return au(t.type,!0);case 31:return Rn("Activity");default:return""}}function lr(t){try{var e="",n=null;do e+=c0(t,n),n=t,t=t.return;while(t);return e}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var iu=Object.prototype.hasOwnProperty,uu=r.unstable_scheduleCallback,cu=r.unstable_cancelCallback,o0=r.unstable_shouldYield,r0=r.unstable_requestPaint,ce=r.unstable_now,s0=r.unstable_getCurrentPriorityLevel,ar=r.unstable_ImmediatePriority,ir=r.unstable_UserBlockingPriority,Ba=r.unstable_NormalPriority,f0=r.unstable_LowPriority,ur=r.unstable_IdlePriority,d0=r.log,h0=r.unstable_setDisableYieldValue,Hl=null,oe=null;function nn(t){if(typeof d0=="function"&&h0(t),oe&&typeof oe.setStrictMode=="function")try{oe.setStrictMode(Hl,t)}catch{}}var re=Math.clz32?Math.clz32:y0,m0=Math.log,g0=Math.LN2;function y0(t){return t>>>=0,t===0?32:31-(m0(t)/g0|0)|0}var Ua=256,Ha=262144,ja=4194304;function Mn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function La(t,e,n){var l=t.pendingLanes;if(l===0)return 0;var a=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var o=l&134217727;return o!==0?(l=o&~i,l!==0?a=Mn(l):(u&=o,u!==0?a=Mn(u):n||(n=o&~t,n!==0&&(a=Mn(n))))):(o=l&~i,o!==0?a=Mn(o):u!==0?a=Mn(u):n||(n=l&~t,n!==0&&(a=Mn(n)))),a===0?0:e!==0&&e!==a&&(e&i)===0&&(i=a&-a,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:a}function jl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function p0(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function cr(){var t=ja;return ja<<=1,(ja&62914560)===0&&(ja=4194304),t}function ou(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ll(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function v0(t,e,n,l,a,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,m=t.expirationTimes,A=t.hiddenUpdates;for(n=u&~n;0<n;){var _=31-re(n),O=1<<_;o[_]=0,m[_]=-1;var x=A[_];if(x!==null)for(A[_]=null,_=0;_<x.length;_++){var C=x[_];C!==null&&(C.lane&=-536870913)}n&=~O}l!==0&&or(t,l,0),i!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function or(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-re(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|n&261930}function rr(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var l=31-re(n),a=1<<l;a&e|t[l]&e&&(t[l]|=e),n&=~a}}function sr(t,e){var n=e&-e;return n=(n&42)!==0?1:ru(n),(n&(t.suspendedLanes|e))!==0?0:n}function ru(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function su(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function fr(){var t=k.p;return t!==0?t:(t=window.event,t===void 0?32:Wd(t.type))}function dr(t,e){var n=k.p;try{return k.p=t,e()}finally{k.p=n}}var ln=Math.random().toString(36).slice(2),Kt="__reactFiber$"+ln,te="__reactProps$"+ln,Wn="__reactContainer$"+ln,fu="__reactEvents$"+ln,b0="__reactListeners$"+ln,S0="__reactHandles$"+ln,hr="__reactResources$"+ln,ql="__reactMarker$"+ln;function du(t){delete t[Kt],delete t[te],delete t[fu],delete t[b0],delete t[S0]}function $n(t){var e=t[Kt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[Kt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Ud(t);t!==null;){if(n=t[Kt])return n;t=Ud(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[Kt]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Gl(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(c(33))}function tl(t){var e=t[hr];return e||(e=t[hr]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Vt(t){t[ql]=!0}var mr=new Set,gr={};function zn(t,e){el(t,e),el(t+"Capture",e)}function el(t,e){for(gr[t]=e,t=0;t<e.length;t++)mr.add(e[t])}var E0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),yr={},pr={};function w0(t){return iu.call(pr,t)?!0:iu.call(yr,t)?!1:E0.test(t)?pr[t]=!0:(yr[t]=!0,!1)}function qa(t,e,n){if(w0(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Ga(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function je(t,e,n,l){if(l===null)t.removeAttribute(n);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+l)}}function pe(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function vr(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function T0(t,e,n){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var a=l.get,i=l.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:l.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function hu(t){if(!t._valueTracker){var e=vr(t)?"checked":"value";t._valueTracker=T0(t,e,""+t[e])}}function br(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),l="";return t&&(l=vr(t)?t.checked?"true":"false":t.value),t=l,t!==n?(e.setValue(t),!0):!1}function ka(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var A0=/[\n"\\]/g;function ve(t){return t.replace(A0,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function mu(t,e,n,l,a,i,u,o){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+pe(e)):t.value!==""+pe(e)&&(t.value=""+pe(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?gu(t,u,pe(e)):n!=null?gu(t,u,pe(n)):l!=null&&t.removeAttribute("value"),a==null&&i!=null&&(t.defaultChecked=!!i),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+pe(o):t.removeAttribute("name")}function Sr(t,e,n,l,a,i,u,o){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){hu(t);return}n=n!=null?""+pe(n):"",e=e!=null?""+pe(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}l=l??a,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=o?t.checked:!!l,t.defaultChecked=!!l,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),hu(t)}function gu(t,e,n){e==="number"&&ka(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function nl(t,e,n,l){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&l&&(t[n].defaultSelected=!0)}else{for(n=""+pe(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,l&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function Er(t,e,n){if(e!=null&&(e=""+pe(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+pe(n):""}function wr(t,e,n,l){if(e==null){if(l!=null){if(n!=null)throw Error(c(92));if(qt(l)){if(1<l.length)throw Error(c(93));l=l[0]}n=l}n==null&&(n=""),e=n}n=pe(e),t.defaultValue=n,l=t.textContent,l===n&&l!==""&&l!==null&&(t.value=l),hu(t)}function ll(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var x0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Tr(t,e,n){var l=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,n):typeof n!="number"||n===0||x0.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Ar(t,e,n){if(e!=null&&typeof e!="object")throw Error(c(62));if(t=t.style,n!=null){for(var l in n)!n.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var a in e)l=e[a],e.hasOwnProperty(a)&&n[a]!==l&&Tr(t,a,l)}else for(var i in e)e.hasOwnProperty(i)&&Tr(t,i,e[i])}function yu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var C0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),N0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ya(t){return N0.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Le(){}var pu=null;function vu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var al=null,il=null;function xr(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[te]||null;t:switch(t=e.stateNode,e.type){case"input":if(mu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+ve(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var l=n[e];if(l!==t&&l.form===t.form){var a=l[te]||null;if(!a)throw Error(c(90));mu(l,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)l=n[e],l.form===t.form&&br(l)}break t;case"textarea":Er(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&nl(t,!!n.multiple,e,!1)}}}var bu=!1;function Cr(t,e,n){if(bu)return t(e,n);bu=!0;try{var l=t(e);return l}finally{if(bu=!1,(al!==null||il!==null)&&(Ri(),al&&(e=al,t=il,il=al=null,xr(e),t)))for(e=0;e<t.length;e++)xr(t[e])}}function kl(t,e){var n=t.stateNode;if(n===null)return null;var l=n[te]||null;if(l===null)return null;n=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(c(231,e,typeof n));return n}var qe=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Su=!1;if(qe)try{var Yl={};Object.defineProperty(Yl,"passive",{get:function(){Su=!0}}),window.addEventListener("test",Yl,Yl),window.removeEventListener("test",Yl,Yl)}catch{Su=!1}var an=null,Eu=null,Qa=null;function Nr(){if(Qa)return Qa;var t,e=Eu,n=e.length,l,a="value"in an?an.value:an.textContent,i=a.length;for(t=0;t<n&&e[t]===a[t];t++);var u=n-t;for(l=1;l<=u&&e[n-l]===a[i-l];l++);return Qa=a.slice(t,1<l?1-l:void 0)}function Xa(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Va(){return!0}function _r(){return!1}function ee(t){function e(n,l,a,i,u){this._reactName=n,this._targetInst=a,this.type=l,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Va:_r,this.isPropagationStopped=_r,this}return R(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Va)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Va)},persist:function(){},isPersistent:Va}),e}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Za=ee(Dn),Ql=R({},Dn,{view:0,detail:0}),_0=ee(Ql),wu,Tu,Xl,Ka=R({},Ql,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Xl&&(Xl&&t.type==="mousemove"?(wu=t.screenX-Xl.screenX,Tu=t.screenY-Xl.screenY):Tu=wu=0,Xl=t),wu)},movementY:function(t){return"movementY"in t?t.movementY:Tu}}),Rr=ee(Ka),R0=R({},Ka,{dataTransfer:0}),M0=ee(R0),z0=R({},Ql,{relatedTarget:0}),Au=ee(z0),D0=R({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),O0=ee(D0),B0=R({},Dn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),U0=ee(B0),H0=R({},Dn,{data:0}),Mr=ee(H0),j0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},L0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},q0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function G0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=q0[t])?!!e[t]:!1}function xu(){return G0}var k0=R({},Ql,{key:function(t){if(t.key){var e=j0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Xa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?L0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xu,charCode:function(t){return t.type==="keypress"?Xa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Xa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Y0=ee(k0),Q0=R({},Ka,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),zr=ee(Q0),X0=R({},Ql,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xu}),V0=ee(X0),Z0=R({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),K0=ee(Z0),J0=R({},Ka,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),F0=ee(J0),I0=R({},Dn,{newState:0,oldState:0}),W0=ee(I0),$0=[9,13,27,32],Cu=qe&&"CompositionEvent"in window,Vl=null;qe&&"documentMode"in document&&(Vl=document.documentMode);var P0=qe&&"TextEvent"in window&&!Vl,Dr=qe&&(!Cu||Vl&&8<Vl&&11>=Vl),Or=" ",Br=!1;function Ur(t,e){switch(t){case"keyup":return $0.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hr(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ul=!1;function tm(t,e){switch(t){case"compositionend":return Hr(e);case"keypress":return e.which!==32?null:(Br=!0,Or);case"textInput":return t=e.data,t===Or&&Br?null:t;default:return null}}function em(t,e){if(ul)return t==="compositionend"||!Cu&&Ur(t,e)?(t=Nr(),Qa=Eu=an=null,ul=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Dr&&e.locale!=="ko"?null:e.data;default:return null}}var nm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jr(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!nm[t.type]:e==="textarea"}function Lr(t,e,n,l){al?il?il.push(l):il=[l]:al=l,e=Hi(e,"onChange"),0<e.length&&(n=new Za("onChange","change",null,n,l),t.push({event:n,listeners:e}))}var Zl=null,Kl=null;function lm(t){Ed(t,0)}function Ja(t){var e=Gl(t);if(br(e))return t}function qr(t,e){if(t==="change")return e}var Gr=!1;if(qe){var Nu;if(qe){var _u="oninput"in document;if(!_u){var kr=document.createElement("div");kr.setAttribute("oninput","return;"),_u=typeof kr.oninput=="function"}Nu=_u}else Nu=!1;Gr=Nu&&(!document.documentMode||9<document.documentMode)}function Yr(){Zl&&(Zl.detachEvent("onpropertychange",Qr),Kl=Zl=null)}function Qr(t){if(t.propertyName==="value"&&Ja(Kl)){var e=[];Lr(e,Kl,t,vu(t)),Cr(lm,e)}}function am(t,e,n){t==="focusin"?(Yr(),Zl=e,Kl=n,Zl.attachEvent("onpropertychange",Qr)):t==="focusout"&&Yr()}function im(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ja(Kl)}function um(t,e){if(t==="click")return Ja(e)}function cm(t,e){if(t==="input"||t==="change")return Ja(e)}function om(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var se=typeof Object.is=="function"?Object.is:om;function Jl(t,e){if(se(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),l=Object.keys(e);if(n.length!==l.length)return!1;for(l=0;l<n.length;l++){var a=n[l];if(!iu.call(e,a)||!se(t[a],e[a]))return!1}return!0}function Xr(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Vr(t,e){var n=Xr(t);t=0;for(var l;n;){if(n.nodeType===3){if(l=t+n.textContent.length,t<=e&&l>=e)return{node:n,offset:e-t};t=l}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Xr(n)}}function Zr(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Zr(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Kr(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=ka(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ka(t.document)}return e}function Ru(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var rm=qe&&"documentMode"in document&&11>=document.documentMode,cl=null,Mu=null,Fl=null,zu=!1;function Jr(t,e,n){var l=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;zu||cl==null||cl!==ka(l)||(l=cl,"selectionStart"in l&&Ru(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Fl&&Jl(Fl,l)||(Fl=l,l=Hi(Mu,"onSelect"),0<l.length&&(e=new Za("onSelect","select",null,e,n),t.push({event:e,listeners:l}),e.target=cl)))}function On(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ol={animationend:On("Animation","AnimationEnd"),animationiteration:On("Animation","AnimationIteration"),animationstart:On("Animation","AnimationStart"),transitionrun:On("Transition","TransitionRun"),transitionstart:On("Transition","TransitionStart"),transitioncancel:On("Transition","TransitionCancel"),transitionend:On("Transition","TransitionEnd")},Du={},Fr={};qe&&(Fr=document.createElement("div").style,"AnimationEvent"in window||(delete ol.animationend.animation,delete ol.animationiteration.animation,delete ol.animationstart.animation),"TransitionEvent"in window||delete ol.transitionend.transition);function Bn(t){if(Du[t])return Du[t];if(!ol[t])return t;var e=ol[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Fr)return Du[t]=e[n];return t}var Ir=Bn("animationend"),Wr=Bn("animationiteration"),$r=Bn("animationstart"),sm=Bn("transitionrun"),fm=Bn("transitionstart"),dm=Bn("transitioncancel"),Pr=Bn("transitionend"),ts=new Map,Ou="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ou.push("scrollEnd");function Ne(t,e){ts.set(t,e),zn(e,[t])}var Fa=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},be=[],rl=0,Bu=0;function Ia(){for(var t=rl,e=Bu=rl=0;e<t;){var n=be[e];be[e++]=null;var l=be[e];be[e++]=null;var a=be[e];be[e++]=null;var i=be[e];if(be[e++]=null,l!==null&&a!==null){var u=l.pending;u===null?a.next=a:(a.next=u.next,u.next=a),l.pending=a}i!==0&&es(n,a,i)}}function Wa(t,e,n,l){be[rl++]=t,be[rl++]=e,be[rl++]=n,be[rl++]=l,Bu|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function Uu(t,e,n,l){return Wa(t,e,n,l),$a(t)}function Un(t,e){return Wa(t,null,null,e),$a(t)}function es(t,e,n){t.lanes|=n;var l=t.alternate;l!==null&&(l.lanes|=n);for(var a=!1,i=t.return;i!==null;)i.childLanes|=n,l=i.alternate,l!==null&&(l.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(a=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,a&&e!==null&&(a=31-re(n),t=i.hiddenUpdates,l=t[a],l===null?t[a]=[e]:l.push(e),e.lane=n|536870912),i):null}function $a(t){if(50<pa)throw pa=0,Xc=null,Error(c(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var sl={};function hm(t,e,n,l){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function fe(t,e,n,l){return new hm(t,e,n,l)}function Hu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ge(t,e){var n=t.alternate;return n===null?(n=fe(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function ns(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Pa(t,e,n,l,a,i){var u=0;if(l=t,typeof t=="function")Hu(t)&&(u=1);else if(typeof t=="string")u=vg(t,n,J.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case Q:return t=fe(31,n,e,a),t.elementType=Q,t.lanes=i,t;case K:return Hn(n.children,a,i,e);case pt:u=8,a|=24;break;case W:return t=fe(12,n,e,a|2),t.elementType=W,t.lanes=i,t;case ot:return t=fe(13,n,e,a),t.elementType=ot,t.lanes=i,t;case U:return t=fe(19,n,e,a),t.elementType=U,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case q:u=10;break t;case L:u=9;break t;case X:u=11;break t;case H:u=14;break t;case V:u=16,l=null;break t}u=29,n=Error(c(130,t===null?"null":typeof t,"")),l=null}return e=fe(u,n,e,a),e.elementType=t,e.type=l,e.lanes=i,e}function Hn(t,e,n,l){return t=fe(7,t,l,e),t.lanes=n,t}function ju(t,e,n){return t=fe(6,t,null,e),t.lanes=n,t}function ls(t){var e=fe(18,null,null,0);return e.stateNode=t,e}function Lu(t,e,n){return e=fe(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var as=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=as.get(t);return n!==void 0?n:(e={value:t,source:e,stack:lr(e)},as.set(t,e),e)}return{value:t,source:e,stack:lr(e)}}var fl=[],dl=0,ti=null,Il=0,Ee=[],we=0,un=null,Me=1,ze="";function ke(t,e){fl[dl++]=Il,fl[dl++]=ti,ti=t,Il=e}function is(t,e,n){Ee[we++]=Me,Ee[we++]=ze,Ee[we++]=un,un=t;var l=Me;t=ze;var a=32-re(l)-1;l&=~(1<<a),n+=1;var i=32-re(e)+a;if(30<i){var u=a-a%5;i=(l&(1<<u)-1).toString(32),l>>=u,a-=u,Me=1<<32-re(e)+a|n<<a|l,ze=i+t}else Me=1<<i|n<<a|l,ze=t}function qu(t){t.return!==null&&(ke(t,1),is(t,1,0))}function Gu(t){for(;t===ti;)ti=fl[--dl],fl[dl]=null,Il=fl[--dl],fl[dl]=null;for(;t===un;)un=Ee[--we],Ee[we]=null,ze=Ee[--we],Ee[we]=null,Me=Ee[--we],Ee[we]=null}function us(t,e){Ee[we++]=Me,Ee[we++]=ze,Ee[we++]=un,Me=e.id,ze=e.overflow,un=t}var Jt=null,Dt=null,yt=!1,cn=null,Te=!1,ku=Error(c(519));function on(t){var e=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Wl(Se(e,t)),ku}function cs(t){var e=t.stateNode,n=t.type,l=t.memoizedProps;switch(e[Kt]=t,e[te]=l,n){case"dialog":ht("cancel",e),ht("close",e);break;case"iframe":case"object":case"embed":ht("load",e);break;case"video":case"audio":for(n=0;n<ba.length;n++)ht(ba[n],e);break;case"source":ht("error",e);break;case"img":case"image":case"link":ht("error",e),ht("load",e);break;case"details":ht("toggle",e);break;case"input":ht("invalid",e),Sr(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":ht("invalid",e);break;case"textarea":ht("invalid",e),wr(e,l.value,l.defaultValue,l.children)}n=l.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||l.suppressHydrationWarning===!0||xd(e.textContent,n)?(l.popover!=null&&(ht("beforetoggle",e),ht("toggle",e)),l.onScroll!=null&&ht("scroll",e),l.onScrollEnd!=null&&ht("scrollend",e),l.onClick!=null&&(e.onclick=Le),e=!0):e=!1,e||on(t,!0)}function os(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:Te=!1;return;case 27:case 3:Te=!0;return;default:Jt=Jt.return}}function hl(t){if(t!==Jt)return!1;if(!yt)return os(t),yt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||io(t.type,t.memoizedProps)),n=!n),n&&Dt&&on(t),os(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Bd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Bd(t)}else e===27?(e=Dt,wn(t.type)?(t=so,so=null,Dt=t):Dt=e):Dt=Jt?xe(t.stateNode.nextSibling):null;return!0}function jn(){Dt=Jt=null,yt=!1}function Yu(){var t=cn;return t!==null&&(ie===null?ie=t:ie.push.apply(ie,t),cn=null),t}function Wl(t){cn===null?cn=[t]:cn.push(t)}var Qu=p(null),Ln=null,Ye=null;function rn(t,e,n){G(Qu,e._currentValue),e._currentValue=n}function Qe(t){t._currentValue=Qu.current,B(Qu)}function Xu(t,e,n){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===n)break;t=t.return}}function Vu(t,e,n,l){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var i=a.dependencies;if(i!==null){var u=a.child;i=i.firstContext;t:for(;i!==null;){var o=i;i=a;for(var m=0;m<e.length;m++)if(o.context===e[m]){i.lanes|=n,o=i.alternate,o!==null&&(o.lanes|=n),Xu(i.return,n,t),l||(u=null);break t}i=o.next}}else if(a.tag===18){if(u=a.return,u===null)throw Error(c(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Xu(u,n,t),u=null}else u=a.child;if(u!==null)u.return=a;else for(u=a;u!==null;){if(u===t){u=null;break}if(a=u.sibling,a!==null){a.return=u.return,u=a;break}u=u.return}a=u}}function ml(t,e,n,l){t=null;for(var a=e,i=!1;a!==null;){if(!i){if((a.flags&524288)!==0)i=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var u=a.alternate;if(u===null)throw Error(c(387));if(u=u.memoizedProps,u!==null){var o=a.type;se(a.pendingProps.value,u.value)||(t!==null?t.push(o):t=[o])}}else if(a===ft.current){if(u=a.alternate,u===null)throw Error(c(387));u.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Aa):t=[Aa])}a=a.return}t!==null&&Vu(e,t,n,l),e.flags|=262144}function ei(t){for(t=t.firstContext;t!==null;){if(!se(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function qn(t){Ln=t,Ye=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ft(t){return rs(Ln,t)}function ni(t,e){return Ln===null&&qn(t),rs(t,e)}function rs(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ye===null){if(t===null)throw Error(c(308));Ye=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ye=Ye.next=e;return n}var mm=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},gm=r.unstable_scheduleCallback,ym=r.unstable_NormalPriority,Gt={$$typeof:q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zu(){return{controller:new mm,data:new Map,refCount:0}}function $l(t){t.refCount--,t.refCount===0&&gm(ym,function(){t.controller.abort()})}var Pl=null,Ku=0,gl=0,yl=null;function pm(t,e){if(Pl===null){var n=Pl=[];Ku=0,gl=Ic(),yl={status:"pending",value:void 0,then:function(l){n.push(l)}}}return Ku++,e.then(ss,ss),e}function ss(){if(--Ku===0&&Pl!==null){yl!==null&&(yl.status="fulfilled");var t=Pl;Pl=null,gl=0,yl=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function vm(t,e){var n=[],l={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(l.status="rejected",l.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),l}var fs=N.S;N.S=function(t,e){Ff=ce(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&pm(t,e),fs!==null&&fs(t,e)};var Gn=p(null);function Ju(){var t=Gn.current;return t!==null?t:Mt.pooledCache}function li(t,e){e===null?G(Gn,Gn.current):G(Gn,e.pool)}function ds(){var t=Ju();return t===null?null:{parent:Gt._currentValue,pool:t}}var pl=Error(c(460)),Fu=Error(c(474)),ai=Error(c(542)),ii={then:function(){}};function hs(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ms(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Le,Le),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,ys(t),t;default:if(typeof e.status=="string")e.then(Le,Le);else{if(t=Mt,t!==null&&100<t.shellSuspendCounter)throw Error(c(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=l}},function(l){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,ys(t),t}throw Yn=e,pl}}function kn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Yn=n,pl):n}}var Yn=null;function gs(){if(Yn===null)throw Error(c(459));var t=Yn;return Yn=null,t}function ys(t){if(t===pl||t===ai)throw Error(c(483))}var vl=null,ta=0;function ui(t){var e=ta;return ta+=1,vl===null&&(vl=[]),ms(vl,t,e)}function ea(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ci(t,e){throw e.$$typeof===D?Error(c(525)):(t=Object.prototype.toString.call(e),Error(c(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function ps(t){function e(b,y){if(t){var T=b.deletions;T===null?(b.deletions=[y],b.flags|=16):T.push(y)}}function n(b,y){if(!t)return null;for(;y!==null;)e(b,y),y=y.sibling;return null}function l(b){for(var y=new Map;b!==null;)b.key!==null?y.set(b.key,b):y.set(b.index,b),b=b.sibling;return y}function a(b,y){return b=Ge(b,y),b.index=0,b.sibling=null,b}function i(b,y,T){return b.index=T,t?(T=b.alternate,T!==null?(T=T.index,T<y?(b.flags|=67108866,y):T):(b.flags|=67108866,y)):(b.flags|=1048576,y)}function u(b){return t&&b.alternate===null&&(b.flags|=67108866),b}function o(b,y,T,z){return y===null||y.tag!==6?(y=ju(T,b.mode,z),y.return=b,y):(y=a(y,T),y.return=b,y)}function m(b,y,T,z){var tt=T.type;return tt===K?_(b,y,T.props.children,z,T.key):y!==null&&(y.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===V&&kn(tt)===y.type)?(y=a(y,T.props),ea(y,T),y.return=b,y):(y=Pa(T.type,T.key,T.props,null,b.mode,z),ea(y,T),y.return=b,y)}function A(b,y,T,z){return y===null||y.tag!==4||y.stateNode.containerInfo!==T.containerInfo||y.stateNode.implementation!==T.implementation?(y=Lu(T,b.mode,z),y.return=b,y):(y=a(y,T.children||[]),y.return=b,y)}function _(b,y,T,z,tt){return y===null||y.tag!==7?(y=Hn(T,b.mode,z,tt),y.return=b,y):(y=a(y,T),y.return=b,y)}function O(b,y,T){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return y=ju(""+y,b.mode,T),y.return=b,y;if(typeof y=="object"&&y!==null){switch(y.$$typeof){case j:return T=Pa(y.type,y.key,y.props,null,b.mode,T),ea(T,y),T.return=b,T;case Y:return y=Lu(y,b.mode,T),y.return=b,y;case V:return y=kn(y),O(b,y,T)}if(qt(y)||F(y))return y=Hn(y,b.mode,T,null),y.return=b,y;if(typeof y.then=="function")return O(b,ui(y),T);if(y.$$typeof===q)return O(b,ni(b,y),T);ci(b,y)}return null}function x(b,y,T,z){var tt=y!==null?y.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return tt!==null?null:o(b,y,""+T,z);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case j:return T.key===tt?m(b,y,T,z):null;case Y:return T.key===tt?A(b,y,T,z):null;case V:return T=kn(T),x(b,y,T,z)}if(qt(T)||F(T))return tt!==null?null:_(b,y,T,z,null);if(typeof T.then=="function")return x(b,y,ui(T),z);if(T.$$typeof===q)return x(b,y,ni(b,T),z);ci(b,T)}return null}function C(b,y,T,z,tt){if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return b=b.get(T)||null,o(y,b,""+z,tt);if(typeof z=="object"&&z!==null){switch(z.$$typeof){case j:return b=b.get(z.key===null?T:z.key)||null,m(y,b,z,tt);case Y:return b=b.get(z.key===null?T:z.key)||null,A(y,b,z,tt);case V:return z=kn(z),C(b,y,T,z,tt)}if(qt(z)||F(z))return b=b.get(T)||null,_(y,b,z,tt,null);if(typeof z.then=="function")return C(b,y,T,ui(z),tt);if(z.$$typeof===q)return C(b,y,T,ni(y,z),tt);ci(y,z)}return null}function Z(b,y,T,z){for(var tt=null,bt=null,I=y,rt=y=0,gt=null;I!==null&&rt<T.length;rt++){I.index>rt?(gt=I,I=null):gt=I.sibling;var St=x(b,I,T[rt],z);if(St===null){I===null&&(I=gt);break}t&&I&&St.alternate===null&&e(b,I),y=i(St,y,rt),bt===null?tt=St:bt.sibling=St,bt=St,I=gt}if(rt===T.length)return n(b,I),yt&&ke(b,rt),tt;if(I===null){for(;rt<T.length;rt++)I=O(b,T[rt],z),I!==null&&(y=i(I,y,rt),bt===null?tt=I:bt.sibling=I,bt=I);return yt&&ke(b,rt),tt}for(I=l(I);rt<T.length;rt++)gt=C(I,b,rt,T[rt],z),gt!==null&&(t&&gt.alternate!==null&&I.delete(gt.key===null?rt:gt.key),y=i(gt,y,rt),bt===null?tt=gt:bt.sibling=gt,bt=gt);return t&&I.forEach(function(Nn){return e(b,Nn)}),yt&&ke(b,rt),tt}function lt(b,y,T,z){if(T==null)throw Error(c(151));for(var tt=null,bt=null,I=y,rt=y=0,gt=null,St=T.next();I!==null&&!St.done;rt++,St=T.next()){I.index>rt?(gt=I,I=null):gt=I.sibling;var Nn=x(b,I,St.value,z);if(Nn===null){I===null&&(I=gt);break}t&&I&&Nn.alternate===null&&e(b,I),y=i(Nn,y,rt),bt===null?tt=Nn:bt.sibling=Nn,bt=Nn,I=gt}if(St.done)return n(b,I),yt&&ke(b,rt),tt;if(I===null){for(;!St.done;rt++,St=T.next())St=O(b,St.value,z),St!==null&&(y=i(St,y,rt),bt===null?tt=St:bt.sibling=St,bt=St);return yt&&ke(b,rt),tt}for(I=l(I);!St.done;rt++,St=T.next())St=C(I,b,rt,St.value,z),St!==null&&(t&&St.alternate!==null&&I.delete(St.key===null?rt:St.key),y=i(St,y,rt),bt===null?tt=St:bt.sibling=St,bt=St);return t&&I.forEach(function(Rg){return e(b,Rg)}),yt&&ke(b,rt),tt}function Rt(b,y,T,z){if(typeof T=="object"&&T!==null&&T.type===K&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case j:t:{for(var tt=T.key;y!==null;){if(y.key===tt){if(tt=T.type,tt===K){if(y.tag===7){n(b,y.sibling),z=a(y,T.props.children),z.return=b,b=z;break t}}else if(y.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===V&&kn(tt)===y.type){n(b,y.sibling),z=a(y,T.props),ea(z,T),z.return=b,b=z;break t}n(b,y);break}else e(b,y);y=y.sibling}T.type===K?(z=Hn(T.props.children,b.mode,z,T.key),z.return=b,b=z):(z=Pa(T.type,T.key,T.props,null,b.mode,z),ea(z,T),z.return=b,b=z)}return u(b);case Y:t:{for(tt=T.key;y!==null;){if(y.key===tt)if(y.tag===4&&y.stateNode.containerInfo===T.containerInfo&&y.stateNode.implementation===T.implementation){n(b,y.sibling),z=a(y,T.children||[]),z.return=b,b=z;break t}else{n(b,y);break}else e(b,y);y=y.sibling}z=Lu(T,b.mode,z),z.return=b,b=z}return u(b);case V:return T=kn(T),Rt(b,y,T,z)}if(qt(T))return Z(b,y,T,z);if(F(T)){if(tt=F(T),typeof tt!="function")throw Error(c(150));return T=tt.call(T),lt(b,y,T,z)}if(typeof T.then=="function")return Rt(b,y,ui(T),z);if(T.$$typeof===q)return Rt(b,y,ni(b,T),z);ci(b,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,y!==null&&y.tag===6?(n(b,y.sibling),z=a(y,T),z.return=b,b=z):(n(b,y),z=ju(T,b.mode,z),z.return=b,b=z),u(b)):n(b,y)}return function(b,y,T,z){try{ta=0;var tt=Rt(b,y,T,z);return vl=null,tt}catch(I){if(I===pl||I===ai)throw I;var bt=fe(29,I,null,b.mode);return bt.lanes=z,bt.return=b,bt}finally{}}}var Qn=ps(!0),vs=ps(!1),sn=!1;function Iu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Wu(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(wt&2)!==0){var a=l.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),l.pending=e,e=$a(t),es(t,null,n),e}return Wa(t,l,e,n),$a(t)}function na(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,rr(t,n)}}function $u(t,e){var n=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,n===l)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?a=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?a=i=e:i=i.next=e}else a=i=e;n={baseState:l.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Pu=!1;function la(){if(Pu){var t=yl;if(t!==null)throw t}}function aa(t,e,n,l){Pu=!1;var a=t.updateQueue;sn=!1;var i=a.firstBaseUpdate,u=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var m=o,A=m.next;m.next=null,u===null?i=A:u.next=A,u=m;var _=t.alternate;_!==null&&(_=_.updateQueue,o=_.lastBaseUpdate,o!==u&&(o===null?_.firstBaseUpdate=A:o.next=A,_.lastBaseUpdate=m))}if(i!==null){var O=a.baseState;u=0,_=A=m=null,o=i;do{var x=o.lane&-536870913,C=x!==o.lane;if(C?(mt&x)===x:(l&x)===x){x!==0&&x===gl&&(Pu=!0),_!==null&&(_=_.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var Z=t,lt=o;x=e;var Rt=n;switch(lt.tag){case 1:if(Z=lt.payload,typeof Z=="function"){O=Z.call(Rt,O,x);break t}O=Z;break t;case 3:Z.flags=Z.flags&-65537|128;case 0:if(Z=lt.payload,x=typeof Z=="function"?Z.call(Rt,O,x):Z,x==null)break t;O=R({},O,x);break t;case 2:sn=!0}}x=o.callback,x!==null&&(t.flags|=64,C&&(t.flags|=8192),C=a.callbacks,C===null?a.callbacks=[x]:C.push(x))}else C={lane:x,tag:o.tag,payload:o.payload,callback:o.callback,next:null},_===null?(A=_=C,m=O):_=_.next=C,u|=x;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;C=o,o=C.next,C.next=null,a.lastBaseUpdate=C,a.shared.pending=null}}while(!0);_===null&&(m=O),a.baseState=m,a.firstBaseUpdate=A,a.lastBaseUpdate=_,i===null&&(a.shared.lanes=0),pn|=u,t.lanes=u,t.memoizedState=O}}function bs(t,e){if(typeof t!="function")throw Error(c(191,t));t.call(e)}function Ss(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)bs(n[t],e)}var bl=p(null),oi=p(0);function Es(t,e){t=$e,G(oi,t),G(bl,e),$e=t|e.baseLanes}function tc(){G(oi,$e),G(bl,bl.current)}function ec(){$e=oi.current,B(bl),B(oi)}var de=p(null),Ae=null;function hn(t){var e=t.alternate;G(jt,jt.current&1),G(de,t),Ae===null&&(e===null||bl.current!==null||e.memoizedState!==null)&&(Ae=t)}function nc(t){G(jt,jt.current),G(de,t),Ae===null&&(Ae=t)}function ws(t){t.tag===22?(G(jt,jt.current),G(de,t),Ae===null&&(Ae=t)):mn()}function mn(){G(jt,jt.current),G(de,de.current)}function he(t){B(de),Ae===t&&(Ae=null),B(jt)}var jt=p(0);function ri(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||oo(n)||ro(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xe=0,ct=null,Nt=null,kt=null,si=!1,Sl=!1,Xn=!1,fi=0,ia=0,El=null,bm=0;function Ut(){throw Error(c(321))}function lc(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!se(t[n],e[n]))return!1;return!0}function ac(t,e,n,l,a,i){return Xe=i,ct=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,N.H=t===null||t.memoizedState===null?uf:bc,Xn=!1,i=n(l,a),Xn=!1,Sl&&(i=As(e,n,l,a)),Ts(t),i}function Ts(t){N.H=oa;var e=Nt!==null&&Nt.next!==null;if(Xe=0,kt=Nt=ct=null,si=!1,ia=0,El=null,e)throw Error(c(300));t===null||Yt||(t=t.dependencies,t!==null&&ei(t)&&(Yt=!0))}function As(t,e,n,l){ct=t;var a=0;do{if(Sl&&(El=null),ia=0,Sl=!1,25<=a)throw Error(c(301));if(a+=1,kt=Nt=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}N.H=cf,i=e(n,l)}while(Sl);return i}function Sm(){var t=N.H,e=t.useState()[0];return e=typeof e.then=="function"?ua(e):e,t=t.useState()[0],(Nt!==null?Nt.memoizedState:null)!==t&&(ct.flags|=1024),e}function ic(){var t=fi!==0;return fi=0,t}function uc(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function cc(t){if(si){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}si=!1}Xe=0,kt=Nt=ct=null,Sl=!1,ia=fi=0,El=null}function Pt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return kt===null?ct.memoizedState=kt=t:kt=kt.next=t,kt}function Lt(){if(Nt===null){var t=ct.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=kt===null?ct.memoizedState:kt.next;if(e!==null)kt=e,Nt=t;else{if(t===null)throw ct.alternate===null?Error(c(467)):Error(c(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},kt===null?ct.memoizedState=kt=t:kt=kt.next=t}return kt}function di(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ua(t){var e=ia;return ia+=1,El===null&&(El=[]),t=ms(El,t,e),e=ct,(kt===null?e.memoizedState:kt.next)===null&&(e=e.alternate,N.H=e===null||e.memoizedState===null?uf:bc),t}function hi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ua(t);if(t.$$typeof===q)return Ft(t)}throw Error(c(438,String(t)))}function oc(t){var e=null,n=ct.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var l=ct.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=di(),ct.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),l=0;l<t;l++)n[l]=et;return e.index++,n}function Ve(t,e){return typeof e=="function"?e(t):e}function mi(t){var e=Lt();return rc(e,Nt,t)}function rc(t,e,n){var l=t.queue;if(l===null)throw Error(c(311));l.lastRenderedReducer=n;var a=t.baseQueue,i=l.pending;if(i!==null){if(a!==null){var u=a.next;a.next=i.next,i.next=u}e.baseQueue=a=i,l.pending=null}if(i=t.baseState,a===null)t.memoizedState=i;else{e=a.next;var o=u=null,m=null,A=e,_=!1;do{var O=A.lane&-536870913;if(O!==A.lane?(mt&O)===O:(Xe&O)===O){var x=A.revertLane;if(x===0)m!==null&&(m=m.next={lane:0,revertLane:0,gesture:null,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null}),O===gl&&(_=!0);else if((Xe&x)===x){A=A.next,x===gl&&(_=!0);continue}else O={lane:0,revertLane:A.revertLane,gesture:null,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null},m===null?(o=m=O,u=i):m=m.next=O,ct.lanes|=x,pn|=x;O=A.action,Xn&&n(i,O),i=A.hasEagerState?A.eagerState:n(i,O)}else x={lane:O,revertLane:A.revertLane,gesture:A.gesture,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null},m===null?(o=m=x,u=i):m=m.next=x,ct.lanes|=O,pn|=O;A=A.next}while(A!==null&&A!==e);if(m===null?u=i:m.next=o,!se(i,t.memoizedState)&&(Yt=!0,_&&(n=yl,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=m,l.lastRenderedState=i}return a===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function sc(t){var e=Lt(),n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=t;var l=n.dispatch,a=n.pending,i=e.memoizedState;if(a!==null){n.pending=null;var u=a=a.next;do i=t(i,u.action),u=u.next;while(u!==a);se(i,e.memoizedState)||(Yt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,l]}function xs(t,e,n){var l=ct,a=Lt(),i=yt;if(i){if(n===void 0)throw Error(c(407));n=n()}else n=e();var u=!se((Nt||a).memoizedState,n);if(u&&(a.memoizedState=n,Yt=!0),a=a.queue,hc(_s.bind(null,l,a,t),[t]),a.getSnapshot!==e||u||kt!==null&&kt.memoizedState.tag&1){if(l.flags|=2048,wl(9,{destroy:void 0},Ns.bind(null,l,a,n,e),null),Mt===null)throw Error(c(349));i||(Xe&127)!==0||Cs(l,e,n)}return n}function Cs(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ct.updateQueue,e===null?(e=di(),ct.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Ns(t,e,n,l){e.value=n,e.getSnapshot=l,Rs(e)&&Ms(t)}function _s(t,e,n){return n(function(){Rs(e)&&Ms(t)})}function Rs(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!se(t,n)}catch{return!0}}function Ms(t){var e=Un(t,2);e!==null&&ue(e,t,2)}function fc(t){var e=Pt();if(typeof t=="function"){var n=t;if(t=n(),Xn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:t},e}function zs(t,e,n,l){return t.baseState=n,rc(t,Nt,typeof l=="function"?l:Ve)}function Em(t,e,n,l,a){if(pi(t))throw Error(c(485));if(t=e.action,t!==null){var i={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};N.T!==null?n(!0):i.isTransition=!1,l(i),n=e.pending,n===null?(i.next=e.pending=i,Ds(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Ds(t,e){var n=e.action,l=e.payload,a=t.state;if(e.isTransition){var i=N.T,u={};N.T=u;try{var o=n(a,l),m=N.S;m!==null&&m(u,o),Os(t,e,o)}catch(A){dc(t,e,A)}finally{i!==null&&u.types!==null&&(i.types=u.types),N.T=i}}else try{i=n(a,l),Os(t,e,i)}catch(A){dc(t,e,A)}}function Os(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(l){Bs(t,e,l)},function(l){return dc(t,e,l)}):Bs(t,e,n)}function Bs(t,e,n){e.status="fulfilled",e.value=n,Us(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Ds(t,n)))}function dc(t,e,n){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=n,Us(e),e=e.next;while(e!==l)}t.action=null}function Us(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Hs(t,e){return e}function js(t,e){if(yt){var n=Mt.formState;if(n!==null){t:{var l=ct;if(yt){if(Dt){e:{for(var a=Dt,i=Te;a.nodeType!==8;){if(!i){a=null;break e}if(a=xe(a.nextSibling),a===null){a=null;break e}}i=a.data,a=i==="F!"||i==="F"?a:null}if(a){Dt=xe(a.nextSibling),l=a.data==="F!";break t}}on(l)}l=!1}l&&(e=n[0])}}return n=Pt(),n.memoizedState=n.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Hs,lastRenderedState:e},n.queue=l,n=nf.bind(null,ct,l),l.dispatch=n,l=fc(!1),i=vc.bind(null,ct,!1,l.queue),l=Pt(),a={state:e,dispatch:null,action:t,pending:null},l.queue=a,n=Em.bind(null,ct,a,i,n),a.dispatch=n,l.memoizedState=t,[e,n,!1]}function Ls(t){var e=Lt();return qs(e,Nt,t)}function qs(t,e,n){if(e=rc(t,e,Hs)[0],t=mi(Ve)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var l=ua(e)}catch(u){throw u===pl?ai:u}else l=e;e=Lt();var a=e.queue,i=a.dispatch;return n!==e.memoizedState&&(ct.flags|=2048,wl(9,{destroy:void 0},wm.bind(null,a,n),null)),[l,i,t]}function wm(t,e){t.action=e}function Gs(t){var e=Lt(),n=Nt;if(n!==null)return qs(e,n,t);Lt(),e=e.memoizedState,n=Lt();var l=n.queue.dispatch;return n.memoizedState=t,[e,l,!1]}function wl(t,e,n,l){return t={tag:t,create:n,deps:l,inst:e,next:null},e=ct.updateQueue,e===null&&(e=di(),ct.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(l=n.next,n.next=t,t.next=l,e.lastEffect=t),t}function ks(){return Lt().memoizedState}function gi(t,e,n,l){var a=Pt();ct.flags|=t,a.memoizedState=wl(1|e,{destroy:void 0},n,l===void 0?null:l)}function yi(t,e,n,l){var a=Lt();l=l===void 0?null:l;var i=a.memoizedState.inst;Nt!==null&&l!==null&&lc(l,Nt.memoizedState.deps)?a.memoizedState=wl(e,i,n,l):(ct.flags|=t,a.memoizedState=wl(1|e,i,n,l))}function Ys(t,e){gi(8390656,8,t,e)}function hc(t,e){yi(2048,8,t,e)}function Tm(t){ct.flags|=4;var e=ct.updateQueue;if(e===null)e=di(),ct.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Qs(t){var e=Lt().memoizedState;return Tm({ref:e,nextImpl:t}),function(){if((wt&2)!==0)throw Error(c(440));return e.impl.apply(void 0,arguments)}}function Xs(t,e){return yi(4,2,t,e)}function Vs(t,e){return yi(4,4,t,e)}function Zs(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ks(t,e,n){n=n!=null?n.concat([t]):null,yi(4,4,Zs.bind(null,e,t),n)}function mc(){}function Js(t,e){var n=Lt();e=e===void 0?null:e;var l=n.memoizedState;return e!==null&&lc(e,l[1])?l[0]:(n.memoizedState=[t,e],t)}function Fs(t,e){var n=Lt();e=e===void 0?null:e;var l=n.memoizedState;if(e!==null&&lc(e,l[1]))return l[0];if(l=t(),Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[l,e],l}function gc(t,e,n){return n===void 0||(Xe&1073741824)!==0&&(mt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=Wf(),ct.lanes|=t,pn|=t,n)}function Is(t,e,n,l){return se(n,e)?n:bl.current!==null?(t=gc(t,n,l),se(t,e)||(Yt=!0),t):(Xe&42)===0||(Xe&1073741824)!==0&&(mt&261930)===0?(Yt=!0,t.memoizedState=n):(t=Wf(),ct.lanes|=t,pn|=t,e)}function Ws(t,e,n,l,a){var i=k.p;k.p=i!==0&&8>i?i:8;var u=N.T,o={};N.T=o,vc(t,!1,e,n);try{var m=a(),A=N.S;if(A!==null&&A(o,m),m!==null&&typeof m=="object"&&typeof m.then=="function"){var _=vm(m,l);ca(t,e,_,ye(t))}else ca(t,e,l,ye(t))}catch(O){ca(t,e,{then:function(){},status:"rejected",reason:O},ye())}finally{k.p=i,u!==null&&o.types!==null&&(u.types=o.types),N.T=u}}function Am(){}function yc(t,e,n,l){if(t.tag!==5)throw Error(c(476));var a=$s(t).queue;Ws(t,a,e,nt,n===null?Am:function(){return Ps(t),n(l)})}function $s(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:nt,baseState:nt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:nt},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Ps(t){var e=$s(t);e.next===null&&(e=t.alternate.memoizedState),ca(t,e.next.queue,{},ye())}function pc(){return Ft(Aa)}function tf(){return Lt().memoizedState}function ef(){return Lt().memoizedState}function xm(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var l=dn(e,t,n);l!==null&&(ue(l,e,n),na(l,e,n)),e={cache:Zu()},t.payload=e;return}e=e.return}}function Cm(t,e,n){var l=ye();n={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},pi(t)?lf(e,n):(n=Uu(t,e,n,l),n!==null&&(ue(n,t,l),af(n,e,l)))}function nf(t,e,n){var l=ye();ca(t,e,n,l)}function ca(t,e,n,l){var a={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(pi(t))lf(e,a);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,o=i(u,n);if(a.hasEagerState=!0,a.eagerState=o,se(o,u))return Wa(t,e,a,0),Mt===null&&Ia(),!1}catch{}finally{}if(n=Uu(t,e,a,l),n!==null)return ue(n,t,l),af(n,e,l),!0}return!1}function vc(t,e,n,l){if(l={lane:2,revertLane:Ic(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},pi(t)){if(e)throw Error(c(479))}else e=Uu(t,n,l,2),e!==null&&ue(e,t,2)}function pi(t){var e=t.alternate;return t===ct||e!==null&&e===ct}function lf(t,e){Sl=si=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function af(t,e,n){if((n&4194048)!==0){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,rr(t,n)}}var oa={readContext:Ft,use:hi,useCallback:Ut,useContext:Ut,useEffect:Ut,useImperativeHandle:Ut,useLayoutEffect:Ut,useInsertionEffect:Ut,useMemo:Ut,useReducer:Ut,useRef:Ut,useState:Ut,useDebugValue:Ut,useDeferredValue:Ut,useTransition:Ut,useSyncExternalStore:Ut,useId:Ut,useHostTransitionStatus:Ut,useFormState:Ut,useActionState:Ut,useOptimistic:Ut,useMemoCache:Ut,useCacheRefresh:Ut};oa.useEffectEvent=Ut;var uf={readContext:Ft,use:hi,useCallback:function(t,e){return Pt().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:Ys,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,gi(4194308,4,Zs.bind(null,e,t),n)},useLayoutEffect:function(t,e){return gi(4194308,4,t,e)},useInsertionEffect:function(t,e){gi(4,2,t,e)},useMemo:function(t,e){var n=Pt();e=e===void 0?null:e;var l=t();if(Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[l,e],l},useReducer:function(t,e,n){var l=Pt();if(n!==void 0){var a=n(e);if(Xn){nn(!0);try{n(e)}finally{nn(!1)}}}else a=e;return l.memoizedState=l.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},l.queue=t,t=t.dispatch=Cm.bind(null,ct,t),[l.memoizedState,t]},useRef:function(t){var e=Pt();return t={current:t},e.memoizedState=t},useState:function(t){t=fc(t);var e=t.queue,n=nf.bind(null,ct,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:mc,useDeferredValue:function(t,e){var n=Pt();return gc(n,t,e)},useTransition:function(){var t=fc(!1);return t=Ws.bind(null,ct,t.queue,!0,!1),Pt().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var l=ct,a=Pt();if(yt){if(n===void 0)throw Error(c(407));n=n()}else{if(n=e(),Mt===null)throw Error(c(349));(mt&127)!==0||Cs(l,e,n)}a.memoizedState=n;var i={value:n,getSnapshot:e};return a.queue=i,Ys(_s.bind(null,l,i,t),[t]),l.flags|=2048,wl(9,{destroy:void 0},Ns.bind(null,l,i,n,e),null),n},useId:function(){var t=Pt(),e=Mt.identifierPrefix;if(yt){var n=ze,l=Me;n=(l&~(1<<32-re(l)-1)).toString(32)+n,e="_"+e+"R_"+n,n=fi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=bm++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:pc,useFormState:js,useActionState:js,useOptimistic:function(t){var e=Pt();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=vc.bind(null,ct,!0,n),n.dispatch=e,[t,e]},useMemoCache:oc,useCacheRefresh:function(){return Pt().memoizedState=xm.bind(null,ct)},useEffectEvent:function(t){var e=Pt(),n={impl:t};return e.memoizedState=n,function(){if((wt&2)!==0)throw Error(c(440));return n.impl.apply(void 0,arguments)}}},bc={readContext:Ft,use:hi,useCallback:Js,useContext:Ft,useEffect:hc,useImperativeHandle:Ks,useInsertionEffect:Xs,useLayoutEffect:Vs,useMemo:Fs,useReducer:mi,useRef:ks,useState:function(){return mi(Ve)},useDebugValue:mc,useDeferredValue:function(t,e){var n=Lt();return Is(n,Nt.memoizedState,t,e)},useTransition:function(){var t=mi(Ve)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:ua(t),e]},useSyncExternalStore:xs,useId:tf,useHostTransitionStatus:pc,useFormState:Ls,useActionState:Ls,useOptimistic:function(t,e){var n=Lt();return zs(n,Nt,t,e)},useMemoCache:oc,useCacheRefresh:ef};bc.useEffectEvent=Qs;var cf={readContext:Ft,use:hi,useCallback:Js,useContext:Ft,useEffect:hc,useImperativeHandle:Ks,useInsertionEffect:Xs,useLayoutEffect:Vs,useMemo:Fs,useReducer:sc,useRef:ks,useState:function(){return sc(Ve)},useDebugValue:mc,useDeferredValue:function(t,e){var n=Lt();return Nt===null?gc(n,t,e):Is(n,Nt.memoizedState,t,e)},useTransition:function(){var t=sc(Ve)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:ua(t),e]},useSyncExternalStore:xs,useId:tf,useHostTransitionStatus:pc,useFormState:Gs,useActionState:Gs,useOptimistic:function(t,e){var n=Lt();return Nt!==null?zs(n,Nt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:oc,useCacheRefresh:ef};cf.useEffectEvent=Qs;function Sc(t,e,n,l){e=t.memoizedState,n=n(l,e),n=n==null?e:R({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ec={enqueueSetState:function(t,e,n){t=t._reactInternals;var l=ye(),a=fn(l);a.payload=e,n!=null&&(a.callback=n),e=dn(t,a,l),e!==null&&(ue(e,t,l),na(e,t,l))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var l=ye(),a=fn(l);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=dn(t,a,l),e!==null&&(ue(e,t,l),na(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),l=fn(n);l.tag=2,e!=null&&(l.callback=e),e=dn(t,l,n),e!==null&&(ue(e,t,n),na(e,t,n))}};function of(t,e,n,l,a,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,i,u):e.prototype&&e.prototype.isPureReactComponent?!Jl(n,l)||!Jl(a,i):!0}function rf(t,e,n,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,l),e.state!==t&&Ec.enqueueReplaceState(e,e.state,null)}function Vn(t,e){var n=e;if("ref"in e){n={};for(var l in e)l!=="ref"&&(n[l]=e[l])}if(t=t.defaultProps){n===e&&(n=R({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function sf(t){Fa(t)}function ff(t){console.error(t)}function df(t){Fa(t)}function vi(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function hf(t,e,n){try{var l=t.onCaughtError;l(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function wc(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){vi(t,e)},n}function mf(t){return t=fn(t),t.tag=3,t}function gf(t,e,n,l){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=l.value;t.payload=function(){return a(i)},t.callback=function(){hf(e,n,l)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){hf(e,n,l),typeof a!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var o=l.stack;this.componentDidCatch(l.value,{componentStack:o!==null?o:""})})}function Nm(t,e,n,l,a){if(n.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=n.alternate,e!==null&&ml(e,n,a,!0),n=de.current,n!==null){switch(n.tag){case 31:case 13:return Ae===null?Mi():n.alternate===null&&Ht===0&&(Ht=3),n.flags&=-257,n.flags|=65536,n.lanes=a,l===ii?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([l]):e.add(l),Kc(t,l,a)),!1;case 22:return n.flags|=65536,l===ii?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([l]):n.add(l)),Kc(t,l,a)),!1}throw Error(c(435,n.tag))}return Kc(t,l,a),Mi(),!1}if(yt)return e=de.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=a,l!==ku&&(t=Error(c(422),{cause:l}),Wl(Se(t,n)))):(l!==ku&&(e=Error(c(423),{cause:l}),Wl(Se(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,l=Se(l,n),a=wc(t.stateNode,l,a),$u(t,a),Ht!==4&&(Ht=2)),!1;var i=Error(c(520),{cause:l});if(i=Se(i,n),ya===null?ya=[i]:ya.push(i),Ht!==4&&(Ht=2),e===null)return!0;l=Se(l,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=wc(n.stateNode,l,t),$u(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,a=mf(a),gf(a,t,n,l),$u(n,a),!1}n=n.return}while(n!==null);return!1}var Tc=Error(c(461)),Yt=!1;function It(t,e,n,l){e.child=t===null?vs(e,null,n,l):Qn(e,t.child,n,l)}function yf(t,e,n,l,a){n=n.render;var i=e.ref;if("ref"in l){var u={};for(var o in l)o!=="ref"&&(u[o]=l[o])}else u=l;return qn(e),l=ac(t,e,n,u,i,a),o=ic(),t!==null&&!Yt?(uc(t,e,a),Ze(t,e,a)):(yt&&o&&qu(e),e.flags|=1,It(t,e,l,a),e.child)}function pf(t,e,n,l,a){if(t===null){var i=n.type;return typeof i=="function"&&!Hu(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,vf(t,e,i,l,a)):(t=Pa(n.type,null,l,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!zc(t,a)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Jl,n(u,l)&&t.ref===e.ref)return Ze(t,e,a)}return e.flags|=1,t=Ge(i,l),t.ref=e.ref,t.return=e,e.child=t}function vf(t,e,n,l,a){if(t!==null){var i=t.memoizedProps;if(Jl(i,l)&&t.ref===e.ref)if(Yt=!1,e.pendingProps=l=i,zc(t,a))(t.flags&131072)!==0&&(Yt=!0);else return e.lanes=t.lanes,Ze(t,e,a)}return Ac(t,e,n,l,a)}function bf(t,e,n,l){var a=l.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(l=e.child=t.child,a=0;l!==null;)a=a|l.lanes|l.childLanes,l=l.sibling;l=a&~i}else l=0,e.child=null;return Sf(t,e,i,n,l)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&li(e,i!==null?i.cachePool:null),i!==null?Es(e,i):tc(),ws(e);else return l=e.lanes=536870912,Sf(t,e,i!==null?i.baseLanes|n:n,n,l)}else i!==null?(li(e,i.cachePool),Es(e,i),mn(),e.memoizedState=null):(t!==null&&li(e,null),tc(),mn());return It(t,e,a,n),e.child}function ra(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Sf(t,e,n,l,a){var i=Ju();return i=i===null?null:{parent:Gt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&li(e,null),tc(),ws(e),t!==null&&ml(t,e,l,!0),e.childLanes=a,null}function bi(t,e){return e=Ei({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Ef(t,e,n){return Qn(e,t.child,null,n),t=bi(e,e.pendingProps),t.flags|=2,he(e),e.memoizedState=null,t}function _m(t,e,n){var l=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(yt){if(l.mode==="hidden")return t=bi(e,l),e.lanes=536870912,ra(null,t);if(nc(e),(t=Dt)?(t=Od(t,Te),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Me,overflow:ze}:null,retryLane:536870912,hydrationErrors:null},n=ls(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw on(e);return e.lanes=536870912,null}return bi(e,l)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(nc(e),a)if(e.flags&256)e.flags&=-257,e=Ef(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(c(558));else if(Yt||ml(t,e,n,!1),a=(n&t.childLanes)!==0,Yt||a){if(l=Mt,l!==null&&(u=sr(l,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Un(t,u),ue(l,t,u),Tc;Mi(),e=Ef(t,e,n)}else t=i.treeContext,Dt=xe(u.nextSibling),Jt=e,yt=!0,cn=null,Te=!1,t!==null&&us(e,t),e=bi(e,l),e.flags|=4096;return e}return t=Ge(t.child,{mode:l.mode,children:l.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Si(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(c(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Ac(t,e,n,l,a){return qn(e),n=ac(t,e,n,l,void 0,a),l=ic(),t!==null&&!Yt?(uc(t,e,a),Ze(t,e,a)):(yt&&l&&qu(e),e.flags|=1,It(t,e,n,a),e.child)}function wf(t,e,n,l,a,i){return qn(e),e.updateQueue=null,n=As(e,l,n,a),Ts(t),l=ic(),t!==null&&!Yt?(uc(t,e,i),Ze(t,e,i)):(yt&&l&&qu(e),e.flags|=1,It(t,e,n,i),e.child)}function Tf(t,e,n,l,a){if(qn(e),e.stateNode===null){var i=sl,u=n.contextType;typeof u=="object"&&u!==null&&(i=Ft(u)),i=new n(l,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ec,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=l,i.state=e.memoizedState,i.refs={},Iu(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?Ft(u):sl,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(Sc(e,n,u,l),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Ec.enqueueReplaceState(i,i.state,null),aa(e,l,i,a),la(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){i=e.stateNode;var o=e.memoizedProps,m=Vn(n,o);i.props=m;var A=i.context,_=n.contextType;u=sl,typeof _=="object"&&_!==null&&(u=Ft(_));var O=n.getDerivedStateFromProps;_=typeof O=="function"||typeof i.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,_||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o||A!==u)&&rf(e,i,l,u),sn=!1;var x=e.memoizedState;i.state=x,aa(e,l,i,a),la(),A=e.memoizedState,o||x!==A||sn?(typeof O=="function"&&(Sc(e,n,O,l),A=e.memoizedState),(m=sn||of(e,n,m,l,x,A,u))?(_||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=A),i.props=l,i.state=A,i.context=u,l=m):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{i=e.stateNode,Wu(t,e),u=e.memoizedProps,_=Vn(n,u),i.props=_,O=e.pendingProps,x=i.context,A=n.contextType,m=sl,typeof A=="object"&&A!==null&&(m=Ft(A)),o=n.getDerivedStateFromProps,(A=typeof o=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==O||x!==m)&&rf(e,i,l,m),sn=!1,x=e.memoizedState,i.state=x,aa(e,l,i,a),la();var C=e.memoizedState;u!==O||x!==C||sn||t!==null&&t.dependencies!==null&&ei(t.dependencies)?(typeof o=="function"&&(Sc(e,n,o,l),C=e.memoizedState),(_=sn||of(e,n,_,l,x,C,m)||t!==null&&t.dependencies!==null&&ei(t.dependencies))?(A||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,C,m),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,C,m)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=C),i.props=l,i.state=C,i.context=m,l=_):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&x===t.memoizedState||(e.flags|=1024),l=!1)}return i=l,Si(t,e),l=(e.flags&128)!==0,i||l?(i=e.stateNode,n=l&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&l?(e.child=Qn(e,t.child,null,a),e.child=Qn(e,null,n,a)):It(t,e,n,a),e.memoizedState=i.state,t=e.child):t=Ze(t,e,a),t}function Af(t,e,n,l){return jn(),e.flags|=256,It(t,e,n,l),e.child}var xc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Cc(t){return{baseLanes:t,cachePool:ds()}}function Nc(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=ge),t}function xf(t,e,n){var l=e.pendingProps,a=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(jt.current&2)!==0),u&&(a=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(yt){if(a?hn(e):mn(),(t=Dt)?(t=Od(t,Te),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Me,overflow:ze}:null,retryLane:536870912,hydrationErrors:null},n=ls(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw on(e);return ro(t)?e.lanes=32:e.lanes=536870912,null}var o=l.children;return l=l.fallback,a?(mn(),a=e.mode,o=Ei({mode:"hidden",children:o},a),l=Hn(l,a,n,null),o.return=e,l.return=e,o.sibling=l,e.child=o,l=e.child,l.memoizedState=Cc(n),l.childLanes=Nc(t,u,n),e.memoizedState=xc,ra(null,l)):(hn(e),_c(e,o))}var m=t.memoizedState;if(m!==null&&(o=m.dehydrated,o!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=Rc(t,e,n)):e.memoizedState!==null?(mn(),e.child=t.child,e.flags|=128,e=null):(mn(),o=l.fallback,a=e.mode,l=Ei({mode:"visible",children:l.children},a),o=Hn(o,a,n,null),o.flags|=2,l.return=e,o.return=e,l.sibling=o,e.child=l,Qn(e,t.child,null,n),l=e.child,l.memoizedState=Cc(n),l.childLanes=Nc(t,u,n),e.memoizedState=xc,e=ra(null,l));else if(hn(e),ro(o)){if(u=o.nextSibling&&o.nextSibling.dataset,u)var A=u.dgst;u=A,l=Error(c(419)),l.stack="",l.digest=u,Wl({value:l,source:null,stack:null}),e=Rc(t,e,n)}else if(Yt||ml(t,e,n,!1),u=(n&t.childLanes)!==0,Yt||u){if(u=Mt,u!==null&&(l=sr(u,n),l!==0&&l!==m.retryLane))throw m.retryLane=l,Un(t,l),ue(u,t,l),Tc;oo(o)||Mi(),e=Rc(t,e,n)}else oo(o)?(e.flags|=192,e.child=t.child,e=null):(t=m.treeContext,Dt=xe(o.nextSibling),Jt=e,yt=!0,cn=null,Te=!1,t!==null&&us(e,t),e=_c(e,l.children),e.flags|=4096);return e}return a?(mn(),o=l.fallback,a=e.mode,m=t.child,A=m.sibling,l=Ge(m,{mode:"hidden",children:l.children}),l.subtreeFlags=m.subtreeFlags&65011712,A!==null?o=Ge(A,o):(o=Hn(o,a,n,null),o.flags|=2),o.return=e,l.return=e,l.sibling=o,e.child=l,ra(null,l),l=e.child,o=t.child.memoizedState,o===null?o=Cc(n):(a=o.cachePool,a!==null?(m=Gt._currentValue,a=a.parent!==m?{parent:m,pool:m}:a):a=ds(),o={baseLanes:o.baseLanes|n,cachePool:a}),l.memoizedState=o,l.childLanes=Nc(t,u,n),e.memoizedState=xc,ra(t.child,l)):(hn(e),n=t.child,t=n.sibling,n=Ge(n,{mode:"visible",children:l.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function _c(t,e){return e=Ei({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ei(t,e){return t=fe(22,t,null,e),t.lanes=0,t}function Rc(t,e,n){return Qn(e,t.child,null,n),t=_c(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Cf(t,e,n){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),Xu(t.return,e,n)}function Mc(t,e,n,l,a,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:n,tailMode:a,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=l,u.tail=n,u.tailMode=a,u.treeForkCount=i)}function Nf(t,e,n){var l=e.pendingProps,a=l.revealOrder,i=l.tail;l=l.children;var u=jt.current,o=(u&2)!==0;if(o?(u=u&1|2,e.flags|=128):u&=1,G(jt,u),It(t,e,l,n),l=yt?Il:0,!o&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Cf(t,n,e);else if(t.tag===19)Cf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&ri(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Mc(e,!1,a,n,i,l);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&ri(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Mc(e,!0,n,null,i,l);break;case"together":Mc(e,!1,null,null,void 0,l);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),pn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ml(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(c(153));if(e.child!==null){for(t=e.child,n=Ge(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ge(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function zc(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ei(t)))}function Rm(t,e,n){switch(e.tag){case 3:zt(e,e.stateNode.containerInfo),rn(e,Gt,t.memoizedState.cache),jn();break;case 27:case 5:He(e);break;case 4:zt(e,e.stateNode.containerInfo);break;case 10:rn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,nc(e),null;break;case 13:var l=e.memoizedState;if(l!==null)return l.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?xf(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var a=(t.flags&128)!==0;if(l=(n&e.childLanes)!==0,l||(ml(t,e,n,!1),l=(n&e.childLanes)!==0),a){if(l)return Nf(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),G(jt,jt.current),l)break;return null;case 22:return e.lanes=0,bf(t,e,n,e.pendingProps);case 24:rn(e,Gt,t.memoizedState.cache)}return Ze(t,e,n)}function _f(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Yt=!0;else{if(!zc(t,n)&&(e.flags&128)===0)return Yt=!1,Rm(t,e,n);Yt=(t.flags&131072)!==0}else Yt=!1,yt&&(e.flags&1048576)!==0&&is(e,Il,e.index);switch(e.lanes=0,e.tag){case 16:t:{var l=e.pendingProps;if(t=kn(e.elementType),e.type=t,typeof t=="function")Hu(t)?(l=Vn(t,l),e.tag=1,e=Tf(null,e,t,l,n)):(e.tag=0,e=Ac(null,e,t,l,n));else{if(t!=null){var a=t.$$typeof;if(a===X){e.tag=11,e=yf(null,e,t,l,n);break t}else if(a===H){e.tag=14,e=pf(null,e,t,l,n);break t}}throw e=at(t)||t,Error(c(306,e,""))}}return e;case 0:return Ac(t,e,e.type,e.pendingProps,n);case 1:return l=e.type,a=Vn(l,e.pendingProps),Tf(t,e,l,a,n);case 3:t:{if(zt(e,e.stateNode.containerInfo),t===null)throw Error(c(387));l=e.pendingProps;var i=e.memoizedState;a=i.element,Wu(t,e),aa(e,l,null,n);var u=e.memoizedState;if(l=u.cache,rn(e,Gt,l),l!==i.cache&&Vu(e,[Gt],n,!0),la(),l=u.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Af(t,e,l,n);break t}else if(l!==a){a=Se(Error(c(424)),e),Wl(a),e=Af(t,e,l,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Dt=xe(t.firstChild),Jt=e,yt=!0,cn=null,Te=!0,n=vs(e,null,l,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(jn(),l===a){e=Ze(t,e,n);break t}It(t,e,l,n)}e=e.child}return e;case 26:return Si(t,e),t===null?(n=qd(e.type,null,e.pendingProps,null))?e.memoizedState=n:yt||(n=e.type,t=e.pendingProps,l=ji(st.current).createElement(n),l[Kt]=e,l[te]=t,Wt(l,n,t),Vt(l),e.stateNode=l):e.memoizedState=qd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return He(e),t===null&&yt&&(l=e.stateNode=Hd(e.type,e.pendingProps,st.current),Jt=e,Te=!0,a=Dt,wn(e.type)?(so=a,Dt=xe(l.firstChild)):Dt=a),It(t,e,e.pendingProps.children,n),Si(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&yt&&((a=l=Dt)&&(l=ig(l,e.type,e.pendingProps,Te),l!==null?(e.stateNode=l,Jt=e,Dt=xe(l.firstChild),Te=!1,a=!0):a=!1),a||on(e)),He(e),a=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,l=i.children,io(a,i)?l=null:u!==null&&io(a,u)&&(e.flags|=32),e.memoizedState!==null&&(a=ac(t,e,Sm,null,null,n),Aa._currentValue=a),Si(t,e),It(t,e,l,n),e.child;case 6:return t===null&&yt&&((t=n=Dt)&&(n=ug(n,e.pendingProps,Te),n!==null?(e.stateNode=n,Jt=e,Dt=null,t=!0):t=!1),t||on(e)),null;case 13:return xf(t,e,n);case 4:return zt(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=Qn(e,null,l,n):It(t,e,l,n),e.child;case 11:return yf(t,e,e.type,e.pendingProps,n);case 7:return It(t,e,e.pendingProps,n),e.child;case 8:return It(t,e,e.pendingProps.children,n),e.child;case 12:return It(t,e,e.pendingProps.children,n),e.child;case 10:return l=e.pendingProps,rn(e,e.type,l.value),It(t,e,l.children,n),e.child;case 9:return a=e.type._context,l=e.pendingProps.children,qn(e),a=Ft(a),l=l(a),e.flags|=1,It(t,e,l,n),e.child;case 14:return pf(t,e,e.type,e.pendingProps,n);case 15:return vf(t,e,e.type,e.pendingProps,n);case 19:return Nf(t,e,n);case 31:return _m(t,e,n);case 22:return bf(t,e,n,e.pendingProps);case 24:return qn(e),l=Ft(Gt),t===null?(a=Ju(),a===null&&(a=Mt,i=Zu(),a.pooledCache=i,i.refCount++,i!==null&&(a.pooledCacheLanes|=n),a=i),e.memoizedState={parent:l,cache:a},Iu(e),rn(e,Gt,a)):((t.lanes&n)!==0&&(Wu(t,e),aa(e,null,null,n),la()),a=t.memoizedState,i=e.memoizedState,a.parent!==l?(a={parent:l,cache:l},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),rn(e,Gt,l)):(l=i.cache,rn(e,Gt,l),l!==a.cache&&Vu(e,[Gt],n,!0))),It(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(c(156,e.tag))}function Ke(t){t.flags|=4}function Dc(t,e,n,l,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(ed())t.flags|=8192;else throw Yn=ii,Fu}else t.flags&=-16777217}function Rf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Xd(e))if(ed())t.flags|=8192;else throw Yn=ii,Fu}function wi(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?cr():536870912,t.lanes|=e,Cl|=e)}function sa(t,e){if(!yt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var l=null;n!==null;)n.alternate!==null&&(l=n),n=n.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function Ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,l=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags&65011712,l|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags,l|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=l,t.childLanes=n,e}function Mm(t,e,n){var l=e.pendingProps;switch(Gu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(e),null;case 1:return Ot(e),null;case 3:return n=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),Qe(Gt),Ct(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(hl(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Yu())),Ot(e),null;case 26:var a=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(Ot(e),Rf(e,i)):(Ot(e),Dc(e,a,null,l,n))):i?i!==t.memoizedState?(Ke(e),Ot(e),Rf(e,i)):(Ot(e),e.flags&=-16777217):(t=t.memoizedProps,t!==l&&Ke(e),Ot(e),Dc(e,a,t,l,n)),null;case 27:if(Oa(e),n=st.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Ke(e);else{if(!l){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}t=J.current,hl(e)?cs(e):(t=Hd(a,l,n),e.stateNode=t,Ke(e))}return Ot(e),null;case 5:if(Oa(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Ke(e);else{if(!l){if(e.stateNode===null)throw Error(c(166));return Ot(e),null}if(i=J.current,hl(e))cs(e);else{var u=ji(st.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?u.createElement("select",{is:l.is}):u.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?u.createElement(a,{is:l.is}):u.createElement(a)}}i[Kt]=e,i[te]=l;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch(Wt(i,a,l),a){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&Ke(e)}}return Ot(e),Dc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&Ke(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(c(166));if(t=st.current,hl(e)){if(t=e.stateNode,n=e.memoizedProps,l=null,a=Jt,a!==null)switch(a.tag){case 27:case 5:l=a.memoizedProps}t[Kt]=e,t=!!(t.nodeValue===n||l!==null&&l.suppressHydrationWarning===!0||xd(t.nodeValue,n)),t||on(e,!0)}else t=ji(t).createTextNode(l),t[Kt]=e,e.stateNode=t}return Ot(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(l=hl(e),n!==null){if(t===null){if(!l)throw Error(c(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(557));t[Kt]=e}else jn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),t=!1}else n=Yu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(he(e),e):(he(e),null);if((e.flags&128)!==0)throw Error(c(558))}return Ot(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=hl(e),l!==null&&l.dehydrated!==null){if(t===null){if(!a)throw Error(c(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(c(317));a[Kt]=e}else jn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),a=!1}else a=Yu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(he(e),e):(he(e),null)}return he(e),(e.flags&128)!==0?(e.lanes=n,e):(n=l!==null,t=t!==null&&t.memoizedState!==null,n&&(l=e.child,a=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(a=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==a&&(l.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),wi(e,e.updateQueue),Ot(e),null);case 4:return Ct(),t===null&&to(e.stateNode.containerInfo),Ot(e),null;case 10:return Qe(e.type),Ot(e),null;case 19:if(B(jt),l=e.memoizedState,l===null)return Ot(e),null;if(a=(e.flags&128)!==0,i=l.rendering,i===null)if(a)sa(l,!1);else{if(Ht!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=ri(t),i!==null){for(e.flags|=128,sa(l,!1),t=i.updateQueue,e.updateQueue=t,wi(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)ns(n,t),n=n.sibling;return G(jt,jt.current&1|2),yt&&ke(e,l.treeForkCount),e.child}t=t.sibling}l.tail!==null&&ce()>Ni&&(e.flags|=128,a=!0,sa(l,!1),e.lanes=4194304)}else{if(!a)if(t=ri(i),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,wi(e,t),sa(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!yt)return Ot(e),null}else 2*ce()-l.renderingStartTime>Ni&&n!==536870912&&(e.flags|=128,a=!0,sa(l,!1),e.lanes=4194304);l.isBackwards?(i.sibling=e.child,e.child=i):(t=l.last,t!==null?t.sibling=i:e.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ce(),t.sibling=null,n=jt.current,G(jt,a?n&1|2:n&1),yt&&ke(e,l.treeForkCount),t):(Ot(e),null);case 22:case 23:return he(e),ec(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(n&536870912)!==0&&(e.flags&128)===0&&(Ot(e),e.subtreeFlags&6&&(e.flags|=8192)):Ot(e),n=e.updateQueue,n!==null&&wi(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==n&&(e.flags|=2048),t!==null&&B(Gn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Qe(Gt),Ot(e),null;case 25:return null;case 30:return null}throw Error(c(156,e.tag))}function zm(t,e){switch(Gu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Qe(Gt),Ct(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Oa(e),null;case 31:if(e.memoizedState!==null){if(he(e),e.alternate===null)throw Error(c(340));jn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(he(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(c(340));jn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return B(jt),null;case 4:return Ct(),null;case 10:return Qe(e.type),null;case 22:case 23:return he(e),ec(),t!==null&&B(Gn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Qe(Gt),null;case 25:return null;default:return null}}function Mf(t,e){switch(Gu(e),e.tag){case 3:Qe(Gt),Ct();break;case 26:case 27:case 5:Oa(e);break;case 4:Ct();break;case 31:e.memoizedState!==null&&he(e);break;case 13:he(e);break;case 19:B(jt);break;case 10:Qe(e.type);break;case 22:case 23:he(e),ec(),t!==null&&B(Gn);break;case 24:Qe(Gt)}}function fa(t,e){try{var n=e.updateQueue,l=n!==null?n.lastEffect:null;if(l!==null){var a=l.next;n=a;do{if((n.tag&t)===t){l=void 0;var i=n.create,u=n.inst;l=i(),u.destroy=l}n=n.next}while(n!==a)}}catch(o){xt(e,e.return,o)}}function gn(t,e,n){try{var l=e.updateQueue,a=l!==null?l.lastEffect:null;if(a!==null){var i=a.next;l=i;do{if((l.tag&t)===t){var u=l.inst,o=u.destroy;if(o!==void 0){u.destroy=void 0,a=e;var m=n,A=o;try{A()}catch(_){xt(a,m,_)}}}l=l.next}while(l!==i)}}catch(_){xt(e,e.return,_)}}function zf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Ss(e,n)}catch(l){xt(t,t.return,l)}}}function Df(t,e,n){n.props=Vn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(l){xt(t,e,l)}}function da(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof n=="function"?t.refCleanup=n(l):n.current=l}}catch(a){xt(t,e,a)}}function De(t,e){var n=t.ref,l=t.refCleanup;if(n!==null)if(typeof l=="function")try{l()}catch(a){xt(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){xt(t,e,a)}else n.current=null}function Of(t){var e=t.type,n=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&l.focus();break t;case"img":n.src?l.src=n.src:n.srcSet&&(l.srcset=n.srcSet)}}catch(a){xt(t,t.return,a)}}function Oc(t,e,n){try{var l=t.stateNode;Pm(l,t.type,n,e),l[te]=e}catch(a){xt(t,t.return,a)}}function Bf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&wn(t.type)||t.tag===4}function Bc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Bf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&wn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Uc(t,e,n){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Le));else if(l!==4&&(l===27&&wn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Uc(t,e,n),t=t.sibling;t!==null;)Uc(t,e,n),t=t.sibling}function Ti(t,e,n){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(l!==4&&(l===27&&wn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ti(t,e,n),t=t.sibling;t!==null;)Ti(t,e,n),t=t.sibling}function Uf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var l=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Wt(e,l,n),e[Kt]=t,e[te]=n}catch(i){xt(t,t.return,i)}}var Je=!1,Qt=!1,Hc=!1,Hf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function Dm(t,e){if(t=t.containerInfo,lo=Xi,t=Kr(t),Ru(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var l=n.getSelection&&n.getSelection();if(l&&l.rangeCount!==0){n=l.anchorNode;var a=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,o=-1,m=-1,A=0,_=0,O=t,x=null;e:for(;;){for(var C;O!==n||a!==0&&O.nodeType!==3||(o=u+a),O!==i||l!==0&&O.nodeType!==3||(m=u+l),O.nodeType===3&&(u+=O.nodeValue.length),(C=O.firstChild)!==null;)x=O,O=C;for(;;){if(O===t)break e;if(x===n&&++A===a&&(o=u),x===i&&++_===l&&(m=u),(C=O.nextSibling)!==null)break;O=x,x=O.parentNode}O=C}n=o===-1||m===-1?null:{start:o,end:m}}else n=null}n=n||{start:0,end:0}}else n=null;for(ao={focusedElem:t,selectionRange:n},Xi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,a=i.memoizedProps,i=i.memoizedState,l=n.stateNode;try{var Z=Vn(n.type,a);t=l.getSnapshotBeforeUpdate(Z,i),l.__reactInternalSnapshotBeforeUpdate=t}catch(lt){xt(n,n.return,lt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)co(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":co(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(c(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function jf(t,e,n){var l=n.flags;switch(n.tag){case 0:case 11:case 15:Ie(t,n),l&4&&fa(5,n);break;case 1:if(Ie(t,n),l&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){xt(n,n.return,u)}else{var a=Vn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){xt(n,n.return,u)}}l&64&&zf(n),l&512&&da(n,n.return);break;case 3:if(Ie(t,n),l&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Ss(t,e)}catch(u){xt(n,n.return,u)}}break;case 27:e===null&&l&4&&Uf(n);case 26:case 5:Ie(t,n),e===null&&l&4&&Of(n),l&512&&da(n,n.return);break;case 12:Ie(t,n);break;case 31:Ie(t,n),l&4&&Gf(t,n);break;case 13:Ie(t,n),l&4&&kf(t,n),l&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=km.bind(null,n),cg(t,n))));break;case 22:if(l=n.memoizedState!==null||Je,!l){e=e!==null&&e.memoizedState!==null||Qt,a=Je;var i=Qt;Je=l,(Qt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Ie(t,n),Je=a,Qt=i}break;case 30:break;default:Ie(t,n)}}function Lf(t){var e=t.alternate;e!==null&&(t.alternate=null,Lf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&du(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Bt=null,ne=!1;function Fe(t,e,n){for(n=n.child;n!==null;)qf(t,e,n),n=n.sibling}function qf(t,e,n){if(oe&&typeof oe.onCommitFiberUnmount=="function")try{oe.onCommitFiberUnmount(Hl,n)}catch{}switch(n.tag){case 26:Qt||De(n,e),Fe(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qt||De(n,e);var l=Bt,a=ne;wn(n.type)&&(Bt=n.stateNode,ne=!1),Fe(t,e,n),Ea(n.stateNode),Bt=l,ne=a;break;case 5:Qt||De(n,e);case 6:if(l=Bt,a=ne,Bt=null,Fe(t,e,n),Bt=l,ne=a,Bt!==null)if(ne)try{(Bt.nodeType===9?Bt.body:Bt.nodeName==="HTML"?Bt.ownerDocument.body:Bt).removeChild(n.stateNode)}catch(i){xt(n,e,i)}else try{Bt.removeChild(n.stateNode)}catch(i){xt(n,e,i)}break;case 18:Bt!==null&&(ne?(t=Bt,zd(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Bl(t)):zd(Bt,n.stateNode));break;case 4:l=Bt,a=ne,Bt=n.stateNode.containerInfo,ne=!0,Fe(t,e,n),Bt=l,ne=a;break;case 0:case 11:case 14:case 15:gn(2,n,e),Qt||gn(4,n,e),Fe(t,e,n);break;case 1:Qt||(De(n,e),l=n.stateNode,typeof l.componentWillUnmount=="function"&&Df(n,e,l)),Fe(t,e,n);break;case 21:Fe(t,e,n);break;case 22:Qt=(l=Qt)||n.memoizedState!==null,Fe(t,e,n),Qt=l;break;default:Fe(t,e,n)}}function Gf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Bl(t)}catch(n){xt(e,e.return,n)}}}function kf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Bl(t)}catch(n){xt(e,e.return,n)}}function Om(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Hf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Hf),e;default:throw Error(c(435,t.tag))}}function Ai(t,e){var n=Om(t);e.forEach(function(l){if(!n.has(l)){n.add(l);var a=Ym.bind(null,t,l);l.then(a,a)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var l=0;l<n.length;l++){var a=n[l],i=t,u=e,o=u;t:for(;o!==null;){switch(o.tag){case 27:if(wn(o.type)){Bt=o.stateNode,ne=!1;break t}break;case 5:Bt=o.stateNode,ne=!1;break t;case 3:case 4:Bt=o.stateNode.containerInfo,ne=!0;break t}o=o.return}if(Bt===null)throw Error(c(160));qf(i,u,a),Bt=null,ne=!1,i=a.alternate,i!==null&&(i.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Yf(e,t),e=e.sibling}var _e=null;function Yf(t,e){var n=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ae(t),l&4&&(gn(3,t,t.return),fa(3,t),gn(5,t,t.return));break;case 1:le(e,t),ae(t),l&512&&(Qt||n===null||De(n,n.return)),l&64&&Je&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?l:n.concat(l))));break;case 26:var a=_e;if(le(e,t),ae(t),l&512&&(Qt||n===null||De(n,n.return)),l&4){var i=n!==null?n.memoizedState:null;if(l=t.memoizedState,n===null)if(l===null)if(t.stateNode===null){t:{l=t.type,n=t.memoizedProps,a=a.ownerDocument||a;e:switch(l){case"title":i=a.getElementsByTagName("title")[0],(!i||i[ql]||i[Kt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(l),a.head.insertBefore(i,a.querySelector("head > title"))),Wt(i,l,n),i[Kt]=t,Vt(i),l=i;break t;case"link":var u=Yd("link","href",a).get(l+(n.href||""));if(u){for(var o=0;o<u.length;o++)if(i=u[o],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(o,1);break e}}i=a.createElement(l),Wt(i,l,n),a.head.appendChild(i);break;case"meta":if(u=Yd("meta","content",a).get(l+(n.content||""))){for(o=0;o<u.length;o++)if(i=u[o],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(o,1);break e}}i=a.createElement(l),Wt(i,l,n),a.head.appendChild(i);break;default:throw Error(c(468,l))}i[Kt]=t,Vt(i),l=i}t.stateNode=l}else Qd(a,t.type,t.stateNode);else t.stateNode=kd(a,l,t.memoizedProps);else i!==l?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,l===null?Qd(a,t.type,t.stateNode):kd(a,l,t.memoizedProps)):l===null&&t.stateNode!==null&&Oc(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ae(t),l&512&&(Qt||n===null||De(n,n.return)),n!==null&&l&4&&Oc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ae(t),l&512&&(Qt||n===null||De(n,n.return)),t.flags&32){a=t.stateNode;try{ll(a,"")}catch(Z){xt(t,t.return,Z)}}l&4&&t.stateNode!=null&&(a=t.memoizedProps,Oc(t,a,n!==null?n.memoizedProps:a)),l&1024&&(Hc=!0);break;case 6:if(le(e,t),ae(t),l&4){if(t.stateNode===null)throw Error(c(162));l=t.memoizedProps,n=t.stateNode;try{n.nodeValue=l}catch(Z){xt(t,t.return,Z)}}break;case 3:if(Gi=null,a=_e,_e=Li(e.containerInfo),le(e,t),_e=a,ae(t),l&4&&n!==null&&n.memoizedState.isDehydrated)try{Bl(e.containerInfo)}catch(Z){xt(t,t.return,Z)}Hc&&(Hc=!1,Qf(t));break;case 4:l=_e,_e=Li(t.stateNode.containerInfo),le(e,t),ae(t),_e=l;break;case 12:le(e,t),ae(t);break;case 31:le(e,t),ae(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Ai(t,l)));break;case 13:le(e,t),ae(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Ci=ce()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Ai(t,l)));break;case 22:a=t.memoizedState!==null;var m=n!==null&&n.memoizedState!==null,A=Je,_=Qt;if(Je=A||a,Qt=_||m,le(e,t),Qt=_,Je=A,ae(t),l&8192)t:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||m||Je||Qt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){m=n=e;try{if(i=m.stateNode,a)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{o=m.stateNode;var O=m.memoizedProps.style,x=O!=null&&O.hasOwnProperty("display")?O.display:null;o.style.display=x==null||typeof x=="boolean"?"":(""+x).trim()}}catch(Z){xt(m,m.return,Z)}}}else if(e.tag===6){if(n===null){m=e;try{m.stateNode.nodeValue=a?"":m.memoizedProps}catch(Z){xt(m,m.return,Z)}}}else if(e.tag===18){if(n===null){m=e;try{var C=m.stateNode;a?Dd(C,!0):Dd(m.stateNode,!1)}catch(Z){xt(m,m.return,Z)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}l&4&&(l=t.updateQueue,l!==null&&(n=l.retryQueue,n!==null&&(l.retryQueue=null,Ai(t,n))));break;case 19:le(e,t),ae(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Ai(t,l)));break;case 30:break;case 21:break;default:le(e,t),ae(t)}}function ae(t){var e=t.flags;if(e&2){try{for(var n,l=t.return;l!==null;){if(Bf(l)){n=l;break}l=l.return}if(n==null)throw Error(c(160));switch(n.tag){case 27:var a=n.stateNode,i=Bc(t);Ti(t,i,a);break;case 5:var u=n.stateNode;n.flags&32&&(ll(u,""),n.flags&=-33);var o=Bc(t);Ti(t,o,u);break;case 3:case 4:var m=n.stateNode.containerInfo,A=Bc(t);Uc(t,A,m);break;default:throw Error(c(161))}}catch(_){xt(t,t.return,_)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Qf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Qf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Ie(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)jf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:gn(4,e,e.return),Zn(e);break;case 1:De(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Df(e,e.return,n),Zn(e);break;case 27:Ea(e.stateNode);case 26:case 5:De(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var l=e.alternate,a=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(a,i,n),fa(4,i);break;case 1:if(We(a,i,n),l=i,a=l.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(A){xt(l,l.return,A)}if(l=i,a=l.updateQueue,a!==null){var o=l.stateNode;try{var m=a.shared.hiddenCallbacks;if(m!==null)for(a.shared.hiddenCallbacks=null,a=0;a<m.length;a++)bs(m[a],o)}catch(A){xt(l,l.return,A)}}n&&u&64&&zf(i),da(i,i.return);break;case 27:Uf(i);case 26:case 5:We(a,i,n),n&&l===null&&u&4&&Of(i),da(i,i.return);break;case 12:We(a,i,n);break;case 31:We(a,i,n),n&&u&4&&Gf(a,i);break;case 13:We(a,i,n),n&&u&4&&kf(a,i);break;case 22:i.memoizedState===null&&We(a,i,n),da(i,i.return);break;case 30:break;default:We(a,i,n)}e=e.sibling}}function jc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&$l(n))}function Lc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&$l(t))}function Re(t,e,n,l){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Xf(t,e,n,l),e=e.sibling}function Xf(t,e,n,l){var a=e.flags;switch(e.tag){case 0:case 11:case 15:Re(t,e,n,l),a&2048&&fa(9,e);break;case 1:Re(t,e,n,l);break;case 3:Re(t,e,n,l),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&$l(t)));break;case 12:if(a&2048){Re(t,e,n,l),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,o=i.onPostCommit;typeof o=="function"&&o(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(m){xt(e,e.return,m)}}else Re(t,e,n,l);break;case 31:Re(t,e,n,l);break;case 13:Re(t,e,n,l);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?Re(t,e,n,l):ha(t,e):i._visibility&2?Re(t,e,n,l):(i._visibility|=2,Tl(t,e,n,l,(e.subtreeFlags&10256)!==0||!1)),a&2048&&jc(u,e);break;case 24:Re(t,e,n,l),a&2048&&Lc(e.alternate,e);break;default:Re(t,e,n,l)}}function Tl(t,e,n,l,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,o=n,m=l,A=u.flags;switch(u.tag){case 0:case 11:case 15:Tl(i,u,o,m,a),fa(8,u);break;case 23:break;case 22:var _=u.stateNode;u.memoizedState!==null?_._visibility&2?Tl(i,u,o,m,a):ha(i,u):(_._visibility|=2,Tl(i,u,o,m,a)),a&&A&2048&&jc(u.alternate,u);break;case 24:Tl(i,u,o,m,a),a&&A&2048&&Lc(u.alternate,u);break;default:Tl(i,u,o,m,a)}e=e.sibling}}function ha(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,l=e,a=l.flags;switch(l.tag){case 22:ha(n,l),a&2048&&jc(l.alternate,l);break;case 24:ha(n,l),a&2048&&Lc(l.alternate,l);break;default:ha(n,l)}e=e.sibling}}var ma=8192;function Al(t,e,n){if(t.subtreeFlags&ma)for(t=t.child;t!==null;)Vf(t,e,n),t=t.sibling}function Vf(t,e,n){switch(t.tag){case 26:Al(t,e,n),t.flags&ma&&t.memoizedState!==null&&bg(n,_e,t.memoizedState,t.memoizedProps);break;case 5:Al(t,e,n);break;case 3:case 4:var l=_e;_e=Li(t.stateNode.containerInfo),Al(t,e,n),_e=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=ma,ma=16777216,Al(t,e,n),ma=l):Al(t,e,n));break;default:Al(t,e,n)}}function Zf(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function ga(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];Zt=l,Jf(l,t)}Zf(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Kf(t),t=t.sibling}function Kf(t){switch(t.tag){case 0:case 11:case 15:ga(t),t.flags&2048&&gn(9,t,t.return);break;case 3:ga(t);break;case 12:ga(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,xi(t)):ga(t);break;default:ga(t)}}function xi(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];Zt=l,Jf(l,t)}Zf(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:gn(8,e,e.return),xi(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,xi(e));break;default:xi(e)}t=t.sibling}}function Jf(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:gn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var l=n.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:$l(n.memoizedState.cache)}if(l=n.child,l!==null)l.return=n,Zt=l;else t:for(n=t;Zt!==null;){l=Zt;var a=l.sibling,i=l.return;if(Lf(l),l===n){Zt=null;break t}if(a!==null){a.return=i,Zt=a;break t}Zt=i}}}var Bm={getCacheForType:function(t){var e=Ft(Gt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ft(Gt).controller.signal}},Um=typeof WeakMap=="function"?WeakMap:Map,wt=0,Mt=null,dt=null,mt=0,At=0,me=null,yn=!1,xl=!1,qc=!1,$e=0,Ht=0,pn=0,Kn=0,Gc=0,ge=0,Cl=0,ya=null,ie=null,kc=!1,Ci=0,Ff=0,Ni=1/0,_i=null,vn=null,Xt=0,bn=null,Nl=null,Pe=0,Yc=0,Qc=null,If=null,pa=0,Xc=null;function ye(){return(wt&2)!==0&&mt!==0?mt&-mt:N.T!==null?Ic():fr()}function Wf(){if(ge===0)if((mt&536870912)===0||yt){var t=Ha;Ha<<=1,(Ha&3932160)===0&&(Ha=262144),ge=t}else ge=536870912;return t=de.current,t!==null&&(t.flags|=32),ge}function ue(t,e,n){(t===Mt&&(At===2||At===9)||t.cancelPendingCommit!==null)&&(_l(t,0),Sn(t,mt,ge,!1)),Ll(t,n),((wt&2)===0||t!==Mt)&&(t===Mt&&((wt&2)===0&&(Kn|=n),Ht===4&&Sn(t,mt,ge,!1)),Oe(t))}function $f(t,e,n){if((wt&6)!==0)throw Error(c(327));var l=!n&&(e&127)===0&&(e&t.expiredLanes)===0||jl(t,e),a=l?Lm(t,e):Zc(t,e,!0),i=l;do{if(a===0){xl&&!l&&Sn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!Hm(n)){a=Zc(t,e,!1),i=!1;continue}if(a===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var o=t;a=ya;var m=o.current.memoizedState.isDehydrated;if(m&&(_l(o,u).flags|=256),u=Zc(o,u,!1),u!==2){if(qc&&!m){o.errorRecoveryDisabledLanes|=i,Kn|=i,a=4;break t}i=ie,ie=a,i!==null&&(ie===null?ie=i:ie.push.apply(ie,i))}a=u}if(i=!1,a!==2)continue}}if(a===1){_l(t,0),Sn(t,e,0,!0);break}t:{switch(l=t,i=a,i){case 0:case 1:throw Error(c(345));case 4:if((e&4194048)!==e)break;case 6:Sn(l,e,ge,!yn);break t;case 2:ie=null;break;case 3:case 5:break;default:throw Error(c(329))}if((e&62914560)===e&&(a=Ci+300-ce(),10<a)){if(Sn(l,e,ge,!yn),La(l,0,!0)!==0)break t;Pe=e,l.timeoutHandle=Rd(Pf.bind(null,l,n,ie,_i,kc,e,ge,Kn,Cl,yn,i,"Throttled",-0,0),a);break t}Pf(l,n,ie,_i,kc,e,ge,Kn,Cl,yn,i,null,-0,0)}}break}while(!0);Oe(t)}function Pf(t,e,n,l,a,i,u,o,m,A,_,O,x,C){if(t.timeoutHandle=-1,O=e.subtreeFlags,O&8192||(O&16785408)===16785408){O={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Le},Vf(e,i,O);var Z=(i&62914560)===i?Ci-ce():(i&4194048)===i?Ff-ce():0;if(Z=Sg(O,Z),Z!==null){Pe=i,t.cancelPendingCommit=Z(cd.bind(null,t,e,i,n,l,a,u,o,m,_,O,null,x,C)),Sn(t,i,u,!A);return}}cd(t,e,i,n,l,a,u,o,m)}function Hm(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var l=0;l<n.length;l++){var a=n[l],i=a.getSnapshot;a=a.value;try{if(!se(i(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Sn(t,e,n,l){e&=~Gc,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var a=e;0<a;){var i=31-re(a),u=1<<i;l[i]=-1,a&=~u}n!==0&&or(t,n,e)}function Ri(){return(wt&6)===0?(va(0),!1):!0}function Vc(){if(dt!==null){if(At===0)var t=dt.return;else t=dt,Ye=Ln=null,cc(t),vl=null,ta=0,t=dt;for(;t!==null;)Mf(t.alternate,t),t=t.return;dt=null}}function _l(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,ng(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Vc(),Mt=t,dt=n=Ge(t.current,null),mt=e,At=0,me=null,yn=!1,xl=jl(t,e),qc=!1,Cl=ge=Gc=Kn=pn=Ht=0,ie=ya=null,kc=!1,(e&8)!==0&&(e|=e&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=e;0<l;){var a=31-re(l),i=1<<a;e|=t[a],l&=~i}return $e=e,Ia(),n}function td(t,e){ct=null,N.H=oa,e===pl||e===ai?(e=gs(),At=3):e===Fu?(e=gs(),At=4):At=e===Tc?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,me=e,dt===null&&(Ht=1,vi(t,Se(e,t.current)))}function ed(){var t=de.current;return t===null?!0:(mt&4194048)===mt?Ae===null:(mt&62914560)===mt||(mt&536870912)!==0?t===Ae:!1}function nd(){var t=N.H;return N.H=oa,t===null?oa:t}function ld(){var t=N.A;return N.A=Bm,t}function Mi(){Ht=4,yn||(mt&4194048)!==mt&&de.current!==null||(xl=!0),(pn&134217727)===0&&(Kn&134217727)===0||Mt===null||Sn(Mt,mt,ge,!1)}function Zc(t,e,n){var l=wt;wt|=2;var a=nd(),i=ld();(Mt!==t||mt!==e)&&(_i=null,_l(t,e)),e=!1;var u=Ht;t:do try{if(At!==0&&dt!==null){var o=dt,m=me;switch(At){case 8:Vc(),u=6;break t;case 3:case 2:case 9:case 6:de.current===null&&(e=!0);var A=At;if(At=0,me=null,Rl(t,o,m,A),n&&xl){u=0;break t}break;default:A=At,At=0,me=null,Rl(t,o,m,A)}}jm(),u=Ht;break}catch(_){td(t,_)}while(!0);return e&&t.shellSuspendCounter++,Ye=Ln=null,wt=l,N.H=a,N.A=i,dt===null&&(Mt=null,mt=0,Ia()),u}function jm(){for(;dt!==null;)ad(dt)}function Lm(t,e){var n=wt;wt|=2;var l=nd(),a=ld();Mt!==t||mt!==e?(_i=null,Ni=ce()+500,_l(t,e)):xl=jl(t,e);t:do try{if(At!==0&&dt!==null){e=dt;var i=me;e:switch(At){case 1:At=0,me=null,Rl(t,e,i,1);break;case 2:case 9:if(hs(i)){At=0,me=null,id(e);break}e=function(){At!==2&&At!==9||Mt!==t||(At=7),Oe(t)},i.then(e,e);break t;case 3:At=7;break t;case 4:At=5;break t;case 7:hs(i)?(At=0,me=null,id(e)):(At=0,me=null,Rl(t,e,i,7));break;case 5:var u=null;switch(dt.tag){case 26:u=dt.memoizedState;case 5:case 27:var o=dt;if(u?Xd(u):o.stateNode.complete){At=0,me=null;var m=o.sibling;if(m!==null)dt=m;else{var A=o.return;A!==null?(dt=A,zi(A)):dt=null}break e}}At=0,me=null,Rl(t,e,i,5);break;case 6:At=0,me=null,Rl(t,e,i,6);break;case 8:Vc(),Ht=6;break t;default:throw Error(c(462))}}qm();break}catch(_){td(t,_)}while(!0);return Ye=Ln=null,N.H=l,N.A=a,wt=n,dt!==null?0:(Mt=null,mt=0,Ia(),Ht)}function qm(){for(;dt!==null&&!o0();)ad(dt)}function ad(t){var e=_f(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?zi(t):dt=e}function id(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=wf(n,e,e.pendingProps,e.type,void 0,mt);break;case 11:e=wf(n,e,e.pendingProps,e.type.render,e.ref,mt);break;case 5:cc(e);default:Mf(n,e),e=dt=ns(e,$e),e=_f(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?zi(t):dt=e}function Rl(t,e,n,l){Ye=Ln=null,cc(e),vl=null,ta=0;var a=e.return;try{if(Nm(t,a,e,n,mt)){Ht=1,vi(t,Se(n,t.current)),dt=null;return}}catch(i){if(a!==null)throw dt=a,i;Ht=1,vi(t,Se(n,t.current)),dt=null;return}e.flags&32768?(yt||l===1?t=!0:xl||(mt&536870912)!==0?t=!1:(yn=t=!0,(l===2||l===9||l===3||l===6)&&(l=de.current,l!==null&&l.tag===13&&(l.flags|=16384))),ud(e,t)):zi(e)}function zi(t){var e=t;do{if((e.flags&32768)!==0){ud(e,yn);return}t=e.return;var n=Mm(e.alternate,e,$e);if(n!==null){dt=n;return}if(e=e.sibling,e!==null){dt=e;return}dt=e=t}while(e!==null);Ht===0&&(Ht=5)}function ud(t,e){do{var n=zm(t.alternate,t);if(n!==null){n.flags&=32767,dt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){dt=t;return}dt=t=n}while(t!==null);Ht=6,dt=null}function cd(t,e,n,l,a,i,u,o,m){t.cancelPendingCommit=null;do Di();while(Xt!==0);if((wt&6)!==0)throw Error(c(327));if(e!==null){if(e===t.current)throw Error(c(177));if(i=e.lanes|e.childLanes,i|=Bu,v0(t,n,i,u,o,m),t===Mt&&(dt=Mt=null,mt=0),Nl=e,bn=t,Pe=n,Yc=i,Qc=a,If=l,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Qm(Ba,function(){return dd(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||l){l=N.T,N.T=null,a=k.p,k.p=2,u=wt,wt|=4;try{Dm(t,e,n)}finally{wt=u,k.p=a,N.T=l}}Xt=1,od(),rd(),sd()}}function od(){if(Xt===1){Xt=0;var t=bn,e=Nl,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=N.T,N.T=null;var l=k.p;k.p=2;var a=wt;wt|=4;try{Yf(e,t);var i=ao,u=Kr(t.containerInfo),o=i.focusedElem,m=i.selectionRange;if(u!==o&&o&&o.ownerDocument&&Zr(o.ownerDocument.documentElement,o)){if(m!==null&&Ru(o)){var A=m.start,_=m.end;if(_===void 0&&(_=A),"selectionStart"in o)o.selectionStart=A,o.selectionEnd=Math.min(_,o.value.length);else{var O=o.ownerDocument||document,x=O&&O.defaultView||window;if(x.getSelection){var C=x.getSelection(),Z=o.textContent.length,lt=Math.min(m.start,Z),Rt=m.end===void 0?lt:Math.min(m.end,Z);!C.extend&&lt>Rt&&(u=Rt,Rt=lt,lt=u);var b=Vr(o,lt),y=Vr(o,Rt);if(b&&y&&(C.rangeCount!==1||C.anchorNode!==b.node||C.anchorOffset!==b.offset||C.focusNode!==y.node||C.focusOffset!==y.offset)){var T=O.createRange();T.setStart(b.node,b.offset),C.removeAllRanges(),lt>Rt?(C.addRange(T),C.extend(y.node,y.offset)):(T.setEnd(y.node,y.offset),C.addRange(T))}}}}for(O=[],C=o;C=C.parentNode;)C.nodeType===1&&O.push({element:C,left:C.scrollLeft,top:C.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<O.length;o++){var z=O[o];z.element.scrollLeft=z.left,z.element.scrollTop=z.top}}Xi=!!lo,ao=lo=null}finally{wt=a,k.p=l,N.T=n}}t.current=e,Xt=2}}function rd(){if(Xt===2){Xt=0;var t=bn,e=Nl,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=N.T,N.T=null;var l=k.p;k.p=2;var a=wt;wt|=4;try{jf(t,e.alternate,e)}finally{wt=a,k.p=l,N.T=n}}Xt=3}}function sd(){if(Xt===4||Xt===3){Xt=0,r0();var t=bn,e=Nl,n=Pe,l=If;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Xt=5:(Xt=0,Nl=bn=null,fd(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(vn=null),su(n),e=e.stateNode,oe&&typeof oe.onCommitFiberRoot=="function")try{oe.onCommitFiberRoot(Hl,e,void 0,(e.current.flags&128)===128)}catch{}if(l!==null){e=N.T,a=k.p,k.p=2,N.T=null;try{for(var i=t.onRecoverableError,u=0;u<l.length;u++){var o=l[u];i(o.value,{componentStack:o.stack})}}finally{N.T=e,k.p=a}}(Pe&3)!==0&&Di(),Oe(t),a=t.pendingLanes,(n&261930)!==0&&(a&42)!==0?t===Xc?pa++:(pa=0,Xc=t):pa=0,va(0)}}function fd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,$l(e)))}function Di(){return od(),rd(),sd(),dd()}function dd(){if(Xt!==5)return!1;var t=bn,e=Yc;Yc=0;var n=su(Pe),l=N.T,a=k.p;try{k.p=32>n?32:n,N.T=null,n=Qc,Qc=null;var i=bn,u=Pe;if(Xt=0,Nl=bn=null,Pe=0,(wt&6)!==0)throw Error(c(331));var o=wt;if(wt|=4,Kf(i.current),Xf(i,i.current,u,n),wt=o,va(0,!1),oe&&typeof oe.onPostCommitFiberRoot=="function")try{oe.onPostCommitFiberRoot(Hl,i)}catch{}return!0}finally{k.p=a,N.T=l,fd(t,e)}}function hd(t,e,n){e=Se(n,e),e=wc(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(Ll(t,2),Oe(t))}function xt(t,e,n){if(t.tag===3)hd(t,t,n);else for(;e!==null;){if(e.tag===3){hd(e,t,n);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(vn===null||!vn.has(l))){t=Se(n,t),n=mf(2),l=dn(e,n,2),l!==null&&(gf(n,l,e,t),Ll(l,2),Oe(l));break}}e=e.return}}function Kc(t,e,n){var l=t.pingCache;if(l===null){l=t.pingCache=new Um;var a=new Set;l.set(e,a)}else a=l.get(e),a===void 0&&(a=new Set,l.set(e,a));a.has(n)||(qc=!0,a.add(n),t=Gm.bind(null,t,e,n),e.then(t,t))}function Gm(t,e,n){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Mt===t&&(mt&n)===n&&(Ht===4||Ht===3&&(mt&62914560)===mt&&300>ce()-Ci?(wt&2)===0&&_l(t,0):Gc|=n,Cl===mt&&(Cl=0)),Oe(t)}function md(t,e){e===0&&(e=cr()),t=Un(t,e),t!==null&&(Ll(t,e),Oe(t))}function km(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),md(t,n)}function Ym(t,e){var n=0;switch(t.tag){case 31:case 13:var l=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(c(314))}l!==null&&l.delete(e),md(t,n)}function Qm(t,e){return uu(t,e)}var Oi=null,Ml=null,Jc=!1,Bi=!1,Fc=!1,En=0;function Oe(t){t!==Ml&&t.next===null&&(Ml===null?Oi=Ml=t:Ml=Ml.next=t),Bi=!0,Jc||(Jc=!0,Vm())}function va(t,e){if(!Fc&&Bi){Fc=!0;do for(var n=!1,l=Oi;l!==null;){if(t!==0){var a=l.pendingLanes;if(a===0)var i=0;else{var u=l.suspendedLanes,o=l.pingedLanes;i=(1<<31-re(42|t)+1)-1,i&=a&~(u&~o),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,vd(l,i))}else i=mt,i=La(l,l===Mt?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||jl(l,i)||(n=!0,vd(l,i));l=l.next}while(n);Fc=!1}}function Xm(){gd()}function gd(){Bi=Jc=!1;var t=0;En!==0&&eg()&&(t=En);for(var e=ce(),n=null,l=Oi;l!==null;){var a=l.next,i=yd(l,e);i===0?(l.next=null,n===null?Oi=a:n.next=a,a===null&&(Ml=n)):(n=l,(t!==0||(i&3)!==0)&&(Bi=!0)),l=a}Xt!==0&&Xt!==5||va(t),En!==0&&(En=0)}function yd(t,e){for(var n=t.suspendedLanes,l=t.pingedLanes,a=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-re(i),o=1<<u,m=a[u];m===-1?((o&n)===0||(o&l)!==0)&&(a[u]=p0(o,e)):m<=e&&(t.expiredLanes|=o),i&=~o}if(e=Mt,n=mt,n=La(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,n===0||t===e&&(At===2||At===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&cu(l),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||jl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(l!==null&&cu(l),su(n)){case 2:case 8:n=ir;break;case 32:n=Ba;break;case 268435456:n=ur;break;default:n=Ba}return l=pd.bind(null,t),n=uu(n,l),t.callbackPriority=e,t.callbackNode=n,e}return l!==null&&l!==null&&cu(l),t.callbackPriority=2,t.callbackNode=null,2}function pd(t,e){if(Xt!==0&&Xt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Di()&&t.callbackNode!==n)return null;var l=mt;return l=La(t,t===Mt?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:($f(t,l,e),yd(t,ce()),t.callbackNode!=null&&t.callbackNode===n?pd.bind(null,t):null)}function vd(t,e){if(Di())return null;$f(t,e,!0)}function Vm(){lg(function(){(wt&6)!==0?uu(ar,Xm):gd()})}function Ic(){if(En===0){var t=gl;t===0&&(t=Ua,Ua<<=1,(Ua&261888)===0&&(Ua=256)),En=t}return En}function bd(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ya(""+t)}function Sd(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function Zm(t,e,n,l,a){if(e==="submit"&&n&&n.stateNode===a){var i=bd((a[te]||null).action),u=l.submitter;u&&(e=(e=u[te]||null)?bd(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var o=new Za("action","action",null,l,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(En!==0){var m=u?Sd(a,u):new FormData(a);yc(n,{pending:!0,data:m,method:a.method,action:i},null,m)}}else typeof i=="function"&&(o.preventDefault(),m=u?Sd(a,u):new FormData(a),yc(n,{pending:!0,data:m,method:a.method,action:i},i,m))},currentTarget:a}]})}}for(var Wc=0;Wc<Ou.length;Wc++){var $c=Ou[Wc],Km=$c.toLowerCase(),Jm=$c[0].toUpperCase()+$c.slice(1);Ne(Km,"on"+Jm)}Ne(Ir,"onAnimationEnd"),Ne(Wr,"onAnimationIteration"),Ne($r,"onAnimationStart"),Ne("dblclick","onDoubleClick"),Ne("focusin","onFocus"),Ne("focusout","onBlur"),Ne(sm,"onTransitionRun"),Ne(fm,"onTransitionStart"),Ne(dm,"onTransitionCancel"),Ne(Pr,"onTransitionEnd"),el("onMouseEnter",["mouseout","mouseover"]),el("onMouseLeave",["mouseout","mouseover"]),el("onPointerEnter",["pointerout","pointerover"]),el("onPointerLeave",["pointerout","pointerover"]),zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zn("onBeforeInput",["compositionend","keypress","textInput","paste"]),zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ba="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fm=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ba));function Ed(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var l=t[n],a=l.event;l=l.listeners;t:{var i=void 0;if(e)for(var u=l.length-1;0<=u;u--){var o=l[u],m=o.instance,A=o.currentTarget;if(o=o.listener,m!==i&&a.isPropagationStopped())break t;i=o,a.currentTarget=A;try{i(a)}catch(_){Fa(_)}a.currentTarget=null,i=m}else for(u=0;u<l.length;u++){if(o=l[u],m=o.instance,A=o.currentTarget,o=o.listener,m!==i&&a.isPropagationStopped())break t;i=o,a.currentTarget=A;try{i(a)}catch(_){Fa(_)}a.currentTarget=null,i=m}}}}function ht(t,e){var n=e[fu];n===void 0&&(n=e[fu]=new Set);var l=t+"__bubble";n.has(l)||(wd(e,t,2,!1),n.add(l))}function Pc(t,e,n){var l=0;e&&(l|=4),wd(n,t,l,e)}var Ui="_reactListening"+Math.random().toString(36).slice(2);function to(t){if(!t[Ui]){t[Ui]=!0,mr.forEach(function(n){n!=="selectionchange"&&(Fm.has(n)||Pc(n,!1,t),Pc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ui]||(e[Ui]=!0,Pc("selectionchange",!1,e))}}function wd(t,e,n,l){switch(Wd(e)){case 2:var a=Tg;break;case 8:a=Ag;break;default:a=yo}n=a.bind(null,e,n,t),a=void 0,!Su||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),l?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function eo(t,e,n,l,a){var i=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var u=l.tag;if(u===3||u===4){var o=l.stateNode.containerInfo;if(o===a)break;if(u===4)for(u=l.return;u!==null;){var m=u.tag;if((m===3||m===4)&&u.stateNode.containerInfo===a)return;u=u.return}for(;o!==null;){if(u=$n(o),u===null)return;if(m=u.tag,m===5||m===6||m===26||m===27){l=i=u;continue t}o=o.parentNode}}l=l.return}Cr(function(){var A=i,_=vu(n),O=[];t:{var x=ts.get(t);if(x!==void 0){var C=Za,Z=t;switch(t){case"keypress":if(Xa(n)===0)break t;case"keydown":case"keyup":C=Y0;break;case"focusin":Z="focus",C=Au;break;case"focusout":Z="blur",C=Au;break;case"beforeblur":case"afterblur":C=Au;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=Rr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=M0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=V0;break;case Ir:case Wr:case $r:C=O0;break;case Pr:C=K0;break;case"scroll":case"scrollend":C=_0;break;case"wheel":C=F0;break;case"copy":case"cut":case"paste":C=U0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=zr;break;case"toggle":case"beforetoggle":C=W0}var lt=(e&4)!==0,Rt=!lt&&(t==="scroll"||t==="scrollend"),b=lt?x!==null?x+"Capture":null:x;lt=[];for(var y=A,T;y!==null;){var z=y;if(T=z.stateNode,z=z.tag,z!==5&&z!==26&&z!==27||T===null||b===null||(z=kl(y,b),z!=null&&lt.push(Sa(y,z,T))),Rt)break;y=y.return}0<lt.length&&(x=new C(x,Z,null,n,_),O.push({event:x,listeners:lt}))}}if((e&7)===0){t:{if(x=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",x&&n!==pu&&(Z=n.relatedTarget||n.fromElement)&&($n(Z)||Z[Wn]))break t;if((C||x)&&(x=_.window===_?_:(x=_.ownerDocument)?x.defaultView||x.parentWindow:window,C?(Z=n.relatedTarget||n.toElement,C=A,Z=Z?$n(Z):null,Z!==null&&(Rt=d(Z),lt=Z.tag,Z!==Rt||lt!==5&&lt!==27&&lt!==6)&&(Z=null)):(C=null,Z=A),C!==Z)){if(lt=Rr,z="onMouseLeave",b="onMouseEnter",y="mouse",(t==="pointerout"||t==="pointerover")&&(lt=zr,z="onPointerLeave",b="onPointerEnter",y="pointer"),Rt=C==null?x:Gl(C),T=Z==null?x:Gl(Z),x=new lt(z,y+"leave",C,n,_),x.target=Rt,x.relatedTarget=T,z=null,$n(_)===A&&(lt=new lt(b,y+"enter",Z,n,_),lt.target=T,lt.relatedTarget=Rt,z=lt),Rt=z,C&&Z)e:{for(lt=Im,b=C,y=Z,T=0,z=b;z;z=lt(z))T++;z=0;for(var tt=y;tt;tt=lt(tt))z++;for(;0<T-z;)b=lt(b),T--;for(;0<z-T;)y=lt(y),z--;for(;T--;){if(b===y||y!==null&&b===y.alternate){lt=b;break e}b=lt(b),y=lt(y)}lt=null}else lt=null;C!==null&&Td(O,x,C,lt,!1),Z!==null&&Rt!==null&&Td(O,Rt,Z,lt,!0)}}t:{if(x=A?Gl(A):window,C=x.nodeName&&x.nodeName.toLowerCase(),C==="select"||C==="input"&&x.type==="file")var bt=qr;else if(jr(x))if(Gr)bt=cm;else{bt=im;var I=am}else C=x.nodeName,!C||C.toLowerCase()!=="input"||x.type!=="checkbox"&&x.type!=="radio"?A&&yu(A.elementType)&&(bt=qr):bt=um;if(bt&&(bt=bt(t,A))){Lr(O,bt,n,_);break t}I&&I(t,x,A),t==="focusout"&&A&&x.type==="number"&&A.memoizedProps.value!=null&&gu(x,"number",x.value)}switch(I=A?Gl(A):window,t){case"focusin":(jr(I)||I.contentEditable==="true")&&(cl=I,Mu=A,Fl=null);break;case"focusout":Fl=Mu=cl=null;break;case"mousedown":zu=!0;break;case"contextmenu":case"mouseup":case"dragend":zu=!1,Jr(O,n,_);break;case"selectionchange":if(rm)break;case"keydown":case"keyup":Jr(O,n,_)}var rt;if(Cu)t:{switch(t){case"compositionstart":var gt="onCompositionStart";break t;case"compositionend":gt="onCompositionEnd";break t;case"compositionupdate":gt="onCompositionUpdate";break t}gt=void 0}else ul?Ur(t,n)&&(gt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(gt="onCompositionStart");gt&&(Dr&&n.locale!=="ko"&&(ul||gt!=="onCompositionStart"?gt==="onCompositionEnd"&&ul&&(rt=Nr()):(an=_,Eu="value"in an?an.value:an.textContent,ul=!0)),I=Hi(A,gt),0<I.length&&(gt=new Mr(gt,t,null,n,_),O.push({event:gt,listeners:I}),rt?gt.data=rt:(rt=Hr(n),rt!==null&&(gt.data=rt)))),(rt=P0?tm(t,n):em(t,n))&&(gt=Hi(A,"onBeforeInput"),0<gt.length&&(I=new Mr("onBeforeInput","beforeinput",null,n,_),O.push({event:I,listeners:gt}),I.data=rt)),Zm(O,t,A,n,_)}Ed(O,e)})}function Sa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Hi(t,e){for(var n=e+"Capture",l=[];t!==null;){var a=t,i=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||i===null||(a=kl(t,n),a!=null&&l.unshift(Sa(t,a,i)),a=kl(t,e),a!=null&&l.push(Sa(t,a,i))),t.tag===3)return l;t=t.return}return[]}function Im(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Td(t,e,n,l,a){for(var i=e._reactName,u=[];n!==null&&n!==l;){var o=n,m=o.alternate,A=o.stateNode;if(o=o.tag,m!==null&&m===l)break;o!==5&&o!==26&&o!==27||A===null||(m=A,a?(A=kl(n,i),A!=null&&u.unshift(Sa(n,A,m))):a||(A=kl(n,i),A!=null&&u.push(Sa(n,A,m)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var Wm=/\r\n?/g,$m=/\u0000|\uFFFD/g;function Ad(t){return(typeof t=="string"?t:""+t).replace(Wm,`
`).replace($m,"")}function xd(t,e){return e=Ad(e),Ad(t)===e}function _t(t,e,n,l,a,i){switch(n){case"children":typeof l=="string"?e==="body"||e==="textarea"&&l===""||ll(t,l):(typeof l=="number"||typeof l=="bigint")&&e!=="body"&&ll(t,""+l);break;case"className":Ga(t,"class",l);break;case"tabIndex":Ga(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Ga(t,n,l);break;case"style":Ar(t,l,i);break;case"data":if(e!=="object"){Ga(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=Ya(""+l),t.setAttribute(n,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",a.name,a,null),_t(t,e,"formEncType",a.formEncType,a,null),_t(t,e,"formMethod",a.formMethod,a,null),_t(t,e,"formTarget",a.formTarget,a,null)):(_t(t,e,"encType",a.encType,a,null),_t(t,e,"method",a.method,a,null),_t(t,e,"target",a.target,a,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=Ya(""+l),t.setAttribute(n,l);break;case"onClick":l!=null&&(t.onclick=Le);break;case"onScroll":l!=null&&ht("scroll",t);break;case"onScrollEnd":l!=null&&ht("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(c(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}n=Ya(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,""+l):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":l===!0?t.setAttribute(n,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,l):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(n,l):t.removeAttribute(n);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(n):t.setAttribute(n,l);break;case"popover":ht("beforetoggle",t),ht("toggle",t),qa(t,"popover",l);break;case"xlinkActuate":je(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":je(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":je(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":je(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":je(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":je(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":je(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":je(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":je(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":qa(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=C0.get(n)||n,qa(t,n,l))}}function no(t,e,n,l,a,i){switch(n){case"style":Ar(t,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(c(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"children":typeof l=="string"?ll(t,l):(typeof l=="number"||typeof l=="bigint")&&ll(t,""+l);break;case"onScroll":l!=null&&ht("scroll",t);break;case"onScrollEnd":l!=null&&ht("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Le);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!gr.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),i=t[te]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,a),typeof l=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,l,a);break t}n in t?t[n]=l:l===!0?t.setAttribute(n,""):qa(t,n,l)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ht("error",t),ht("load",t);var l=!1,a=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":l=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,i,u,n,null)}}a&&_t(t,e,"srcSet",n.srcSet,n,null),l&&_t(t,e,"src",n.src,n,null);return;case"input":ht("invalid",t);var o=i=u=a=null,m=null,A=null;for(l in n)if(n.hasOwnProperty(l)){var _=n[l];if(_!=null)switch(l){case"name":a=_;break;case"type":u=_;break;case"checked":m=_;break;case"defaultChecked":A=_;break;case"value":i=_;break;case"defaultValue":o=_;break;case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(c(137,e));break;default:_t(t,e,l,_,n,null)}}Sr(t,i,o,m,A,u,a,!1);return;case"select":ht("invalid",t),l=u=i=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":i=o;break;case"defaultValue":u=o;break;case"multiple":l=o;default:_t(t,e,a,o,n,null)}e=i,n=u,t.multiple=!!l,e!=null?nl(t,!!l,e,!1):n!=null&&nl(t,!!l,n,!0);return;case"textarea":ht("invalid",t),i=a=l=null;for(u in n)if(n.hasOwnProperty(u)&&(o=n[u],o!=null))switch(u){case"value":l=o;break;case"defaultValue":a=o;break;case"children":i=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(c(91));break;default:_t(t,e,u,o,n,null)}wr(t,l,a,i);return;case"option":for(m in n)if(n.hasOwnProperty(m)&&(l=n[m],l!=null))switch(m){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:_t(t,e,m,l,n,null)}return;case"dialog":ht("beforetoggle",t),ht("toggle",t),ht("cancel",t),ht("close",t);break;case"iframe":case"object":ht("load",t);break;case"video":case"audio":for(l=0;l<ba.length;l++)ht(ba[l],t);break;case"image":ht("error",t),ht("load",t);break;case"details":ht("toggle",t);break;case"embed":case"source":case"link":ht("error",t),ht("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(A in n)if(n.hasOwnProperty(A)&&(l=n[A],l!=null))switch(A){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,A,l,n,null)}return;default:if(yu(e)){for(_ in n)n.hasOwnProperty(_)&&(l=n[_],l!==void 0&&no(t,e,_,l,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(l=n[o],l!=null&&_t(t,e,o,l,n,null))}function Pm(t,e,n,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,u=null,o=null,m=null,A=null,_=null;for(C in n){var O=n[C];if(n.hasOwnProperty(C)&&O!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":m=O;default:l.hasOwnProperty(C)||_t(t,e,C,null,l,O)}}for(var x in l){var C=l[x];if(O=n[x],l.hasOwnProperty(x)&&(C!=null||O!=null))switch(x){case"type":i=C;break;case"name":a=C;break;case"checked":A=C;break;case"defaultChecked":_=C;break;case"value":u=C;break;case"defaultValue":o=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(c(137,e));break;default:C!==O&&_t(t,e,x,C,l,O)}}mu(t,u,o,m,A,_,i,a);return;case"select":C=u=o=x=null;for(i in n)if(m=n[i],n.hasOwnProperty(i)&&m!=null)switch(i){case"value":break;case"multiple":C=m;default:l.hasOwnProperty(i)||_t(t,e,i,null,l,m)}for(a in l)if(i=l[a],m=n[a],l.hasOwnProperty(a)&&(i!=null||m!=null))switch(a){case"value":x=i;break;case"defaultValue":o=i;break;case"multiple":u=i;default:i!==m&&_t(t,e,a,i,l,m)}e=o,n=u,l=C,x!=null?nl(t,!!n,x,!1):!!l!=!!n&&(e!=null?nl(t,!!n,e,!0):nl(t,!!n,n?[]:"",!1));return;case"textarea":C=x=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!l.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:_t(t,e,o,null,l,a)}for(u in l)if(a=l[u],i=n[u],l.hasOwnProperty(u)&&(a!=null||i!=null))switch(u){case"value":x=a;break;case"defaultValue":C=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(c(91));break;default:a!==i&&_t(t,e,u,a,l,i)}Er(t,x,C);return;case"option":for(var Z in n)if(x=n[Z],n.hasOwnProperty(Z)&&x!=null&&!l.hasOwnProperty(Z))switch(Z){case"selected":t.selected=!1;break;default:_t(t,e,Z,null,l,x)}for(m in l)if(x=l[m],C=n[m],l.hasOwnProperty(m)&&x!==C&&(x!=null||C!=null))switch(m){case"selected":t.selected=x&&typeof x!="function"&&typeof x!="symbol";break;default:_t(t,e,m,x,l,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var lt in n)x=n[lt],n.hasOwnProperty(lt)&&x!=null&&!l.hasOwnProperty(lt)&&_t(t,e,lt,null,l,x);for(A in l)if(x=l[A],C=n[A],l.hasOwnProperty(A)&&x!==C&&(x!=null||C!=null))switch(A){case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(c(137,e));break;default:_t(t,e,A,x,l,C)}return;default:if(yu(e)){for(var Rt in n)x=n[Rt],n.hasOwnProperty(Rt)&&x!==void 0&&!l.hasOwnProperty(Rt)&&no(t,e,Rt,void 0,l,x);for(_ in l)x=l[_],C=n[_],!l.hasOwnProperty(_)||x===C||x===void 0&&C===void 0||no(t,e,_,x,l,C);return}}for(var b in n)x=n[b],n.hasOwnProperty(b)&&x!=null&&!l.hasOwnProperty(b)&&_t(t,e,b,null,l,x);for(O in l)x=l[O],C=n[O],!l.hasOwnProperty(O)||x===C||x==null&&C==null||_t(t,e,O,x,l,C)}function Cd(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function tg(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),l=0;l<n.length;l++){var a=n[l],i=a.transferSize,u=a.initiatorType,o=a.duration;if(i&&o&&Cd(u)){for(u=0,o=a.responseEnd,l+=1;l<n.length;l++){var m=n[l],A=m.startTime;if(A>o)break;var _=m.transferSize,O=m.initiatorType;_&&Cd(O)&&(m=m.responseEnd,u+=_*(m<o?1:(o-A)/(m-A)))}if(--l,e+=8*(i+u)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var lo=null,ao=null;function ji(t){return t.nodeType===9?t:t.ownerDocument}function Nd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function _d(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function io(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var uo=null;function eg(){var t=window.event;return t&&t.type==="popstate"?t===uo?!1:(uo=t,!0):(uo=null,!1)}var Rd=typeof setTimeout=="function"?setTimeout:void 0,ng=typeof clearTimeout=="function"?clearTimeout:void 0,Md=typeof Promise=="function"?Promise:void 0,lg=typeof queueMicrotask=="function"?queueMicrotask:typeof Md<"u"?function(t){return Md.resolve(null).then(t).catch(ag)}:Rd;function ag(t){setTimeout(function(){throw t})}function wn(t){return t==="head"}function zd(t,e){var n=e,l=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(l===0){t.removeChild(a),Bl(e);return}l--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")l++;else if(n==="html")Ea(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Ea(n);for(var i=n.firstChild;i;){var u=i.nextSibling,o=i.nodeName;i[ql]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&Ea(t.ownerDocument.body);n=a}while(n);Bl(e)}function Dd(t,e){var n=t;t=0;do{var l=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=l}while(n)}function co(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":co(n),du(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function ig(t,e,n,l){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[ql])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=xe(t.nextSibling),t===null)break}return null}function ug(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=xe(t.nextSibling),t===null))return null;return t}function Od(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=xe(t.nextSibling),t===null))return null;return t}function oo(t){return t.data==="$?"||t.data==="$~"}function ro(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function cg(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var l=function(){e(),n.removeEventListener("DOMContentLoaded",l)};n.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function xe(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var so=null;function Bd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return xe(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Ud(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Hd(t,e,n){switch(e=ji(n),t){case"html":if(t=e.documentElement,!t)throw Error(c(452));return t;case"head":if(t=e.head,!t)throw Error(c(453));return t;case"body":if(t=e.body,!t)throw Error(c(454));return t;default:throw Error(c(451))}}function Ea(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);du(t)}var Ce=new Map,jd=new Set;function Li(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=k.d;k.d={f:og,r:rg,D:sg,C:fg,L:dg,m:hg,X:gg,S:mg,M:yg};function og(){var t=tn.f(),e=Ri();return t||e}function rg(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?Ps(e):tn.r(t)}var zl=typeof document>"u"?null:document;function Ld(t,e,n){var l=zl;if(l&&typeof e=="string"&&e){var a=ve(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),jd.has(a)||(jd.add(a),t={rel:t,crossOrigin:n,href:e},l.querySelector(a)===null&&(e=l.createElement("link"),Wt(e,"link",t),Vt(e),l.head.appendChild(e)))}}function sg(t){tn.D(t),Ld("dns-prefetch",t,null)}function fg(t,e){tn.C(t,e),Ld("preconnect",t,e)}function dg(t,e,n){tn.L(t,e,n);var l=zl;if(l&&t&&e){var a='link[rel="preload"][as="'+ve(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+ve(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+ve(n.imageSizes)+'"]')):a+='[href="'+ve(t)+'"]';var i=a;switch(e){case"style":i=Dl(t);break;case"script":i=Ol(t)}Ce.has(i)||(t=R({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ce.set(i,t),l.querySelector(a)!==null||e==="style"&&l.querySelector(wa(i))||e==="script"&&l.querySelector(Ta(i))||(e=l.createElement("link"),Wt(e,"link",t),Vt(e),l.head.appendChild(e)))}}function hg(t,e){tn.m(t,e);var n=zl;if(n&&t){var l=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+ve(l)+'"][href="'+ve(t)+'"]',i=a;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ol(t)}if(!Ce.has(i)&&(t=R({rel:"modulepreload",href:t},e),Ce.set(i,t),n.querySelector(a)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Ta(i)))return}l=n.createElement("link"),Wt(l,"link",t),Vt(l),n.head.appendChild(l)}}}function mg(t,e,n){tn.S(t,e,n);var l=zl;if(l&&t){var a=tl(l).hoistableStyles,i=Dl(t);e=e||"default";var u=a.get(i);if(!u){var o={loading:0,preload:null};if(u=l.querySelector(wa(i)))o.loading=5;else{t=R({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ce.get(i))&&fo(t,n);var m=u=l.createElement("link");Vt(m),Wt(m,"link",t),m._p=new Promise(function(A,_){m.onload=A,m.onerror=_}),m.addEventListener("load",function(){o.loading|=1}),m.addEventListener("error",function(){o.loading|=2}),o.loading|=4,qi(u,e,l)}u={type:"stylesheet",instance:u,count:1,state:o},a.set(i,u)}}}function gg(t,e){tn.X(t,e);var n=zl;if(n&&t){var l=tl(n).hoistableScripts,a=Ol(t),i=l.get(a);i||(i=n.querySelector(Ta(a)),i||(t=R({src:t,async:!0},e),(e=Ce.get(a))&&ho(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function yg(t,e){tn.M(t,e);var n=zl;if(n&&t){var l=tl(n).hoistableScripts,a=Ol(t),i=l.get(a);i||(i=n.querySelector(Ta(a)),i||(t=R({src:t,async:!0,type:"module"},e),(e=Ce.get(a))&&ho(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function qd(t,e,n,l){var a=(a=st.current)?Li(a):null;if(!a)throw Error(c(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Dl(n.href),n=tl(a).hoistableStyles,l=n.get(e),l||(l={type:"style",instance:null,count:0,state:null},n.set(e,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Dl(n.href);var i=tl(a).hoistableStyles,u=i.get(t);if(u||(a=a.ownerDocument||a,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=a.querySelector(wa(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ce.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ce.set(t,n),i||pg(a,t,n,u.state))),e&&l===null)throw Error(c(528,""));return u}if(e&&l!==null)throw Error(c(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ol(n),n=tl(a).hoistableScripts,l=n.get(e),l||(l={type:"script",instance:null,count:0,state:null},n.set(e,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,t))}}function Dl(t){return'href="'+ve(t)+'"'}function wa(t){return'link[rel="stylesheet"]['+t+"]"}function Gd(t){return R({},t,{"data-precedence":t.precedence,precedence:null})}function pg(t,e,n,l){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?l.loading=1:(e=t.createElement("link"),l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2}),Wt(e,"link",n),Vt(e),t.head.appendChild(e))}function Ol(t){return'[src="'+ve(t)+'"]'}function Ta(t){return"script[async]"+t}function kd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+ve(n.href)+'"]');if(l)return e.instance=l,Vt(l),l;var a=R({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),Vt(l),Wt(l,"style",a),qi(l,n.precedence,t),e.instance=l;case"stylesheet":a=Dl(n.href);var i=t.querySelector(wa(a));if(i)return e.state.loading|=4,e.instance=i,Vt(i),i;l=Gd(n),(a=Ce.get(a))&&fo(l,a),i=(t.ownerDocument||t).createElement("link"),Vt(i);var u=i;return u._p=new Promise(function(o,m){u.onload=o,u.onerror=m}),Wt(i,"link",l),e.state.loading|=4,qi(i,n.precedence,t),e.instance=i;case"script":return i=Ol(n.src),(a=t.querySelector(Ta(i)))?(e.instance=a,Vt(a),a):(l=n,(a=Ce.get(i))&&(l=R({},n),ho(l,a)),t=t.ownerDocument||t,a=t.createElement("script"),Vt(a),Wt(a,"link",l),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(c(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,qi(l,n.precedence,t));return e.instance}function qi(t,e,n){for(var l=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=l.length?l[l.length-1]:null,i=a,u=0;u<l.length;u++){var o=l[u];if(o.dataset.precedence===e)i=o;else if(i!==a)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function fo(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function ho(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Gi=null;function Yd(t,e,n){if(Gi===null){var l=new Map,a=Gi=new Map;a.set(n,l)}else a=Gi,l=a.get(n),l||(l=new Map,a.set(n,l));if(l.has(t))return l;for(l.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var i=n[a];if(!(i[ql]||i[Kt]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var o=l.get(u);o?o.push(i):l.set(u,[i])}}return l}function Qd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function vg(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Xd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function bg(t,e,n,l){if(n.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var a=Dl(l.href),i=e.querySelector(wa(a));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=ki.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Vt(i);return}i=e.ownerDocument||e,l=Gd(l),(a=Ce.get(a))&&fo(l,a),i=i.createElement("link"),Vt(i);var u=i;u._p=new Promise(function(o,m){u.onload=o,u.onerror=m}),Wt(i,"link",l),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=ki.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var mo=0;function Sg(t,e){return t.stylesheets&&t.count===0&&Qi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var l=setTimeout(function(){if(t.stylesheets&&Qi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&mo===0&&(mo=62500*tg());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Qi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>mo?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(a)}}:null}function ki(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Qi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Yi=null;function Qi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Yi=new Map,e.forEach(Eg,t),Yi=null,ki.call(t))}function Eg(t,e){if(!(e.state.loading&4)){var n=Yi.get(t);if(n)var l=n.get(null);else{n=new Map,Yi.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var u=a[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),l=u)}l&&n.set(null,l)}a=e.instance,u=a.getAttribute("data-precedence"),i=n.get(u)||l,i===l&&n.set(null,a),n.set(u,a),this.count++,l=ki.bind(this),a.addEventListener("load",l),a.addEventListener("error",l),i?i.parentNode.insertBefore(a,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Aa={$$typeof:q,Provider:null,Consumer:null,_currentValue:nt,_currentValue2:nt,_threadCount:0};function wg(t,e,n,l,a,i,u,o,m){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ou(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ou(0),this.hiddenUpdates=ou(null),this.identifierPrefix=l,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=m,this.incompleteTransitions=new Map}function Vd(t,e,n,l,a,i,u,o,m,A,_,O){return t=new wg(t,e,n,u,m,A,_,O,o),e=1,i===!0&&(e|=24),i=fe(3,null,null,e),t.current=i,i.stateNode=t,e=Zu(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:l,isDehydrated:n,cache:e},Iu(i),t}function Zd(t){return t?(t=sl,t):sl}function Kd(t,e,n,l,a,i){a=Zd(a),l.context===null?l.context=a:l.pendingContext=a,l=fn(e),l.payload={element:n},i=i===void 0?null:i,i!==null&&(l.callback=i),n=dn(t,l,e),n!==null&&(ue(n,t,e),na(n,t,e))}function Jd(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function go(t,e){Jd(t,e),(t=t.alternate)&&Jd(t,e)}function Fd(t){if(t.tag===13||t.tag===31){var e=Un(t,67108864);e!==null&&ue(e,t,67108864),go(t,67108864)}}function Id(t){if(t.tag===13||t.tag===31){var e=ye();e=ru(e);var n=Un(t,e);n!==null&&ue(n,t,e),go(t,e)}}var Xi=!0;function Tg(t,e,n,l){var a=N.T;N.T=null;var i=k.p;try{k.p=2,yo(t,e,n,l)}finally{k.p=i,N.T=a}}function Ag(t,e,n,l){var a=N.T;N.T=null;var i=k.p;try{k.p=8,yo(t,e,n,l)}finally{k.p=i,N.T=a}}function yo(t,e,n,l){if(Xi){var a=po(l);if(a===null)eo(t,e,l,Vi,n),$d(t,l);else if(Cg(a,t,e,n,l))l.stopPropagation();else if($d(t,l),e&4&&-1<xg.indexOf(t)){for(;a!==null;){var i=Pn(a);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Mn(i.pendingLanes);if(u!==0){var o=i;for(o.pendingLanes|=2,o.entangledLanes|=2;u;){var m=1<<31-re(u);o.entanglements[1]|=m,u&=~m}Oe(i),(wt&6)===0&&(Ni=ce()+500,va(0))}}break;case 31:case 13:o=Un(i,2),o!==null&&ue(o,i,2),Ri(),go(i,2)}if(i=po(l),i===null&&eo(t,e,l,Vi,n),i===a)break;a=i}a!==null&&l.stopPropagation()}else eo(t,e,l,null,n)}}function po(t){return t=vu(t),vo(t)}var Vi=null;function vo(t){if(Vi=null,t=$n(t),t!==null){var e=d(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=S(e),t!==null)return t;t=null}else if(n===31){if(t=w(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Vi=t,null}function Wd(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(s0()){case ar:return 2;case ir:return 8;case Ba:case f0:return 32;case ur:return 268435456;default:return 32}default:return 32}}var bo=!1,Tn=null,An=null,xn=null,xa=new Map,Ca=new Map,Cn=[],xg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function $d(t,e){switch(t){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":An=null;break;case"mouseover":case"mouseout":xn=null;break;case"pointerover":case"pointerout":xa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ca.delete(e.pointerId)}}function Na(t,e,n,l,a,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:l,nativeEvent:i,targetContainers:[a]},e!==null&&(e=Pn(e),e!==null&&Fd(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function Cg(t,e,n,l,a){switch(e){case"focusin":return Tn=Na(Tn,t,e,n,l,a),!0;case"dragenter":return An=Na(An,t,e,n,l,a),!0;case"mouseover":return xn=Na(xn,t,e,n,l,a),!0;case"pointerover":var i=a.pointerId;return xa.set(i,Na(xa.get(i)||null,t,e,n,l,a)),!0;case"gotpointercapture":return i=a.pointerId,Ca.set(i,Na(Ca.get(i)||null,t,e,n,l,a)),!0}return!1}function Pd(t){var e=$n(t.target);if(e!==null){var n=d(e);if(n!==null){if(e=n.tag,e===13){if(e=S(n),e!==null){t.blockedOn=e,dr(t.priority,function(){Id(n)});return}}else if(e===31){if(e=w(n),e!==null){t.blockedOn=e,dr(t.priority,function(){Id(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Zi(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=po(t.nativeEvent);if(n===null){n=t.nativeEvent;var l=new n.constructor(n.type,n);pu=l,n.target.dispatchEvent(l),pu=null}else return e=Pn(n),e!==null&&Fd(e),t.blockedOn=n,!1;e.shift()}return!0}function th(t,e,n){Zi(t)&&n.delete(e)}function Ng(){bo=!1,Tn!==null&&Zi(Tn)&&(Tn=null),An!==null&&Zi(An)&&(An=null),xn!==null&&Zi(xn)&&(xn=null),xa.forEach(th),Ca.forEach(th)}function Ki(t,e){t.blockedOn===e&&(t.blockedOn=null,bo||(bo=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Ng)))}var Ji=null;function eh(t){Ji!==t&&(Ji=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Ji===t&&(Ji=null);for(var e=0;e<t.length;e+=3){var n=t[e],l=t[e+1],a=t[e+2];if(typeof l!="function"){if(vo(l||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,yc(i,{pending:!0,data:a,method:n.method,action:l},l,a))}}))}function Bl(t){function e(m){return Ki(m,t)}Tn!==null&&Ki(Tn,t),An!==null&&Ki(An,t),xn!==null&&Ki(xn,t),xa.forEach(e),Ca.forEach(e);for(var n=0;n<Cn.length;n++){var l=Cn[n];l.blockedOn===t&&(l.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)Pd(n),n.blockedOn===null&&Cn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(l=0;l<n.length;l+=3){var a=n[l],i=n[l+1],u=a[te]||null;if(typeof i=="function")u||eh(n);else if(u){var o=null;if(i&&i.hasAttribute("formAction")){if(a=i,u=i[te]||null)o=u.formAction;else if(vo(a)!==null)continue}else o=u.action;typeof o=="function"?n[l+1]=o:(n.splice(l,3),l-=3),eh(n)}}}function nh(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return a=u})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),l||setTimeout(n,20)}function n(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function So(t){this._internalRoot=t}Fi.prototype.render=So.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(c(409));var n=e.current,l=ye();Kd(n,l,t,e,null,null)},Fi.prototype.unmount=So.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Kd(t.current,2,null,t,null,null),Ri(),e[Wn]=null}};function Fi(t){this._internalRoot=t}Fi.prototype.unstable_scheduleHydration=function(t){if(t){var e=fr();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Cn.length&&e!==0&&e<Cn[n].priority;n++);Cn.splice(n,0,t),n===0&&Pd(t)}};var lh=f.version;if(lh!=="19.2.6")throw Error(c(527,lh,"19.2.6"));k.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(c(188)):(t=Object.keys(t).join(","),Error(c(268,t)));return t=v(e),t=t!==null?M(t):null,t=t===null?null:t.stateNode,t};var _g={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:N,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ii=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ii.isDisabled&&Ii.supportsFiber)try{Hl=Ii.inject(_g),oe=Ii}catch{}}return Ra.createRoot=function(t,e){if(!s(t))throw Error(c(299));var n=!1,l="",a=sf,i=ff,u=df;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=Vd(t,1,!1,null,null,n,l,null,a,i,u,nh),t[Wn]=e.current,to(t),new So(e)},Ra.hydrateRoot=function(t,e,n){if(!s(t))throw Error(c(299));var l=!1,a="",i=sf,u=ff,o=df,m=null;return n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(m=n.formState)),e=Vd(t,1,!0,e,n??null,l,a,m,i,u,o,nh),e.context=Zd(null),n=e.current,l=ye(),l=ru(l),a=fn(l),a.callback=null,dn(n,a,l),n=l,e.current.lanes=n,Ll(e,n),Oe(e),t[Wn]=e.current,to(t),new Fi(e)},Ra.version="19.2.6",Ra}var hh;function qg(){if(hh)return To.exports;hh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),To.exports=Lg(),To.exports}var Gg=qg();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kg=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ih=(...r)=>r.filter((f,h,c)=>!!f&&f.trim()!==""&&c.indexOf(f)===h).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Yg={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qg=vt.forwardRef(({color:r="currentColor",size:f=24,strokeWidth:h=2,absoluteStrokeWidth:c,className:s="",children:d,iconNode:S,...w},g)=>vt.createElement("svg",{ref:g,...Yg,width:f,height:f,stroke:r,strokeWidth:c?Number(h)*24/Number(f):h,className:Ih("lucide",s),...w},[...S.map(([v,M])=>vt.createElement(v,M)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=(r,f)=>{const h=vt.forwardRef(({className:c,...s},d)=>vt.createElement(Qg,{ref:d,iconNode:f,className:Ih(`lucide-${kg(r)}`,c),...s}));return h.displayName=`${r}`,h};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xg=Ue("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eu=Ue("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wh=Ue("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $h=Ue("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vg=Ue("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mh=Ue("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zg=Ue("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kg=Ue("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jg=Ue("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ph=Ue("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Pi({group:r,size:f="md",dim:h}){const c=f==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return E.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${r.bgClass} ${r.textClass} ${c} ${h?"opacity-40":""}`,children:r.label})}function en(r){const[f,h]=r.split(":").map(Number);return f*60+h}const Fg=30;function Ig(r,f){let h=-1;for(let w=0;w<r.length&&en(r[w])<=f;w++)h=w;if(h===-1)return{index:-1,progress:0};const c=en(r[h]),s=r[h+1]?en(r[h+1]):null,d=s!==null?s:c+Fg;if(f>=d)return{index:-1,progress:0};const S=d===c?0:(f-c)/(d-c);return{index:h,progress:Math.max(0,Math.min(1,S))}}function t0(r){const[f,h]=r.split(":").map(Number);return`${f%12||12}:${h.toString().padStart(2,"0")}`}function e0(r){const[f]=r.split(":").map(Number);return f>=12?"PM":"AM"}function tr(){const r=new Date;return r.getHours()*60+r.getMinutes()}function tu(){const r=new Date,f=r.getFullYear(),h=String(r.getMonth()+1).padStart(2,"0"),c=String(r.getDate()).padStart(2,"0");return`${f}-${h}-${c}`}function Wg(){const r=new Date,f=r.getHours(),h=r.getMinutes(),c=f%12||12,s=f>=12?"PM":"AM";return`${c}:${h.toString().padStart(2,"0")} ${s}`}function $g(r){if(r<=0)return"";if(r<60)return`${r} min`;const f=Math.floor(r/60),h=r%60;return h===0?`${f}h`:`${f}h ${h}m`}function Pg(r){const f=new Date(r);if(isNaN(f.getTime()))return r;const h=f.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),c=f.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${h}, ${c}`}function gh(r,f){return r.flatMap(h=>{const c=f.find(s=>s.id===h);return c?[c]:[]})}function t1({event:r,runGroups:f,past:h}){const c=gh(r.onTrack,f),s=gh(r.inClass??[],f);return E.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${h?"opacity-60":""}`,children:E.jsxs("div",{className:"flex gap-4",children:[E.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[t0(r.time),E.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:e0(r.time)})]}),E.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[c.length>0&&E.jsxs("div",{className:"flex items-center gap-3",children:[E.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),E.jsx("div",{className:"flex flex-wrap gap-1.5",children:c.map(d=>E.jsx(Pi,{group:d},d.id))})]}),s.length>0&&E.jsxs(E.Fragment,{children:[c.length>0&&E.jsx("div",{className:"border-t border-gray-100"}),E.jsxs("div",{className:"flex items-center gap-3",children:[E.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),E.jsx("div",{className:"flex flex-wrap gap-1.5",children:s.map(d=>E.jsx(Pi,{group:d},d.id))})]})]}),r.note&&E.jsx("p",{className:"text-xs italic text-gray-500",children:r.note})]})]})})}function e1({event:r,past:f}){const h=r.type==="lunch"||r.type==="special";return E.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${h?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${f?"opacity-60":""}`,children:E.jsxs("div",{className:"flex items-center gap-4",children:[E.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[t0(r.time),E.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:e0(r.time)})]}),h&&E.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:r.type==="lunch"?E.jsx(Jg,{size:16}):E.jsx(Zg,{size:16})}),E.jsxs("div",{children:[E.jsx("p",{className:"text-sm font-medium text-gray-900",children:r.label}),r.subtitle&&E.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:r.subtitle})]})]})})}const Wo=vt.forwardRef(({events:r},f)=>{const[,h]=vt.useState(0);vt.useEffect(()=>{const g=setInterval(()=>h(v=>v+1),3e4);return()=>clearInterval(g)},[]);const c=tr(),d=r.filter(g=>"time"in g).find(g=>en(g.time)>c),S=d?en(d.time)-c:null,w=S!==null?S<=5?"text-red-500":S<=10?"text-orange-500":"text-gray-400":"text-gray-400";return E.jsxs("div",{ref:f,"data-time-indicator":!0,className:"relative my-6",children:[E.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[E.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),E.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),E.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:Wg()}),S!==null&&E.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${w}`,children:["Next event starts in ",E.jsx("span",{className:"font-semibold",children:$g(S)})]})]})});Wo.displayName="TimeIndicator";function yh({collapsed:r,children:f}){return E.jsx("div",{"data-collapsed":r,"aria-hidden":r,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:r?"0fr":"1fr",opacity:r?0:1,marginBottom:r?0:"0.5rem"},children:E.jsx("div",{className:"overflow-hidden",children:f})})}function n1({events:r,runGroups:f,isToday:h,selectedGroups:c,hidePast:s}){const d=vt.useRef(null),[,S]=vt.useState(0);vt.useEffect(()=>{if(!h)return;const L=setInterval(()=>S(q=>q+1),6e4);return()=>clearInterval(L)},[h]),vt.useEffect(()=>{if(!h)return;const L=setTimeout(()=>{var q;(q=d.current)==null||q.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(L)},[h]);const w=tr(),g=r.flatMap(L=>{if(L.type!=="session")return[L];if(c.length===0)return[L];const q=L.onTrack.filter(ot=>c.includes(ot)),X=(L.inClass??[]).filter(ot=>c.includes(ot));return q.length===0&&X.length===0?[]:[{...L,onTrack:q,inClass:X}]}),v=g.map(L=>L.type!=="break"&&s&&h&&en(L.time)<w);g.forEach((L,q)=>{if(L.type!=="break")return;const X=g.slice(0,q).some((ot,U)=>ot.type!=="break"&&!v[U]);v[q]=!X});const M=[],R=[];g.forEach((L,q)=>{L.type!=="break"&&(M.push(q),R.push(L.time))});const{index:D}=h?Ig(R,w):{index:-1},j=D===-1?-1:M[D],Y=h?g.findIndex(L=>L.type!=="break"&&en(L.time)>w):-1,K=h&&Y===-1&&g.length>0,pt=g.length>0&&v.every(Boolean);let W;return E.jsxs("div",{className:"flex flex-col pb-10",children:[g.length>0&&E.jsx(yh,{collapsed:!pt,children:E.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[E.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),E.jsx("p",{className:"text-xs text-gray-400",children:"Every event on today's schedule has already happened."})]})}),g.map((L,q)=>{const X=q===j,ot=h&&L.type!=="break"&&!X&&en(L.time)<w;let U=null;!v[q]&&L.type==="session"&&L.sessionNumber!==void 0&&L.sessionNumber!==W&&(W=L.sessionNumber,U=E.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",L.sessionNumber]}));const H=L.type==="break"?E.jsxs("div",{className:"flex items-center gap-2 py-1",children:[E.jsx("div",{className:"h-px flex-1 bg-gray-200"}),E.jsx("span",{className:"text-xs text-gray-400 italic",children:L.label}),E.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):L.type==="session"?E.jsx(t1,{event:L,runGroups:f,past:ot}):E.jsx(e1,{event:L,past:ot});return E.jsxs(yh,{collapsed:v[q],children:[q===Y&&E.jsx(Wo,{ref:d,events:g}),U,H]},q)}),K&&E.jsx(Wo,{ref:d,events:g})]})}function l1({groups:r,selected:f,onChange:h}){const[c,s]=vt.useState(!1),d=g=>h(f.includes(g)?f.filter(v=>v!==g):[...f,g]),S=f.length===0||f.length===r.length,w=r.filter(g=>f.includes(g.id));return E.jsxs("div",{className:"relative",children:[E.jsxs("button",{onClick:()=>s(g=>!g),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[S?E.jsx("span",{className:"text-gray-700",children:"All run groups"}):E.jsx("div",{className:"flex items-center gap-1",children:w.map(g=>E.jsx(Pi,{group:g,size:"sm"},g.id))}),E.jsx(Wh,{size:14,className:"text-gray-400"})]}),c&&E.jsxs(E.Fragment,{children:[E.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>s(!1)}),E.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[r.map(g=>E.jsxs("button",{onClick:()=>d(g.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[E.jsx(Pi,{group:g,size:"md"}),f.includes(g.id)&&E.jsx(eu,{size:14,className:"text-blue-500"})]},g.id)),E.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:E.jsx("button",{onClick:()=>{h([]),s(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:S?"All selected":"Clear filter"})})]})]})]})}function ph(r){const f=tu();return r.days.some(h=>h.date===f)}function vh(){return E.jsxs("span",{className:"inline-flex shrink-0 items-center gap-1 rounded-full bg-red-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-red-700",children:[E.jsx("span",{className:"h-1 w-1 rounded-full bg-red-700 animate-pulse"}),"Live"]})}function a1({events:r,active:f,onChange:h}){const[c,s]=vt.useState(!1);return E.jsxs("div",{className:"relative min-w-0 pl-1",children:[E.jsxs("div",{className:"flex items-center gap-1",children:[E.jsxs("button",{onClick:()=>s(d=>!d),className:"flex items-center gap-1 text-left group min-w-0",children:[E.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:f.name}),ph(f)&&E.jsx(vh,{}),E.jsx(Wh,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),f.link&&E.jsx("a",{href:f.link,target:"_blank",rel:"noopener noreferrer","aria-label":"Event page",className:"shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:text-gray-700",children:E.jsx(Vg,{size:14})})]}),E.jsx("p",{className:"text-sm text-gray-500",children:f.subtitle}),c&&E.jsxs(E.Fragment,{children:[E.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>s(!1)}),E.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:r.map(d=>E.jsxs("button",{onClick:()=>{h(d),s(!1)},className:"flex w-full items-center justify-between rounded-lg px-4 py-2.5 hover:bg-gray-50 text-left",children:[E.jsxs("div",{children:[E.jsxs("div",{className:"flex items-center gap-1.5",children:[E.jsx("span",{className:"text-sm font-semibold text-gray-900",children:d.name}),ph(d)&&E.jsx(vh,{})]}),E.jsx("div",{className:"text-xs text-gray-400",children:d.subtitle})]}),d.id===f.id&&E.jsx(eu,{size:14,className:"text-blue-500 ml-3 shrink-0"})]},d.id))})]})]})}function i1({checked:r,onChange:f,label:h}){return E.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[h&&E.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:h}),E.jsx("button",{type:"button",role:"switch","aria-checked":r,onClick:f,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:r?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:E.jsx("span",{style:{position:"absolute",top:"2px",left:r?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Jn=72,u1=110;function c1({children:r}){const[f,h]=vt.useState(0),[c,s]=vt.useState("idle"),d=vt.useRef(null),S=vt.useRef(0);vt.useEffect(()=>{const M=j=>{window.scrollY===0&&(d.current=j.touches[0].clientY)},R=j=>{if(d.current===null)return;const Y=j.touches[0].clientY-d.current;if(Y<=0){d.current=null;return}j.preventDefault();const K=Y<Jn?Y:Jn+(Y-Jn)*.25;S.current=Math.min(K,u1),h(S.current),s("pulling")},D=()=>{d.current!==null&&(d.current=null,S.current>=Jn?(s("refreshing"),h(Jn*.75),setTimeout(()=>window.location.reload(),600)):(s("releasing"),h(0),S.current=0,setTimeout(()=>s("idle"),250)))};return document.addEventListener("touchstart",M,{passive:!0}),document.addEventListener("touchmove",R,{passive:!1}),document.addEventListener("touchend",D),document.addEventListener("touchcancel",D),()=>{document.removeEventListener("touchstart",M),document.removeEventListener("touchmove",R),document.removeEventListener("touchend",D),document.removeEventListener("touchcancel",D)}},[]);const w=c==="releasing"||c==="refreshing",g=Math.min(f/Jn,1),v=f>=Jn;return E.jsxs(E.Fragment,{children:[E.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${f}px)`,transition:w?"transform 0.25s ease":"none"},children:E.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${v?"text-blue-500":"text-gray-400"}`,children:E.jsx(Kg,{size:16,className:c==="refreshing"?"animate-spin":"",style:c!=="refreshing"?{transform:`rotate(${g*270}deg)`}:void 0})})}),E.jsx("div",{style:{transform:`translateY(${f}px)`,transition:w?"transform 0.25s ease":"none"},children:r})]})}function o1({groups:r}){const f=r.filter(h=>h.description);return f.length===0?null:E.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[E.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),E.jsx("ul",{className:"flex flex-col gap-1.5",children:f.map(h=>E.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[E.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${h.bgClass}`,"aria-hidden":"true"}),E.jsx("span",{className:"font-medium text-gray-900",children:h.label}),E.jsx("span",{className:"text-gray-400",children:"·"}),E.jsx("span",{children:h.description})]},h.id))})]})}const bh=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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
`;function r1(){const[r,f]=vt.useState(!1);vt.useEffect(()=>{window.scrollTo(0,0)},[]);async function h(){await navigator.clipboard.writeText(bh),f(!0),setTimeout(()=>f(!1),2e3)}return E.jsx("div",{className:"min-h-screen bg-gray-50",children:E.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[E.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[E.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),E.jsxs("div",{className:"flex items-center gap-2",children:[E.jsxs("button",{onClick:h,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[r?E.jsx(eu,{size:16,className:"text-green-600"}):E.jsx($h,{size:16}),r?"Copied":"Copy"]}),E.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:E.jsx(Ph,{size:18})})]})]}),E.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",E.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),E.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:E.jsx("code",{children:bh})})]})})}var Ul={},No,Sh;function s1(){return Sh||(Sh=1,No=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),No}var _o={},_n={},Eh;function Fn(){if(Eh)return _n;Eh=1;let r;const f=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(c){if(!c)throw new Error('"version" cannot be null or undefined');if(c<1||c>40)throw new Error('"version" should be in range from 1 to 40');return c*4+17},_n.getSymbolTotalCodewords=function(c){return f[c]},_n.getBCHDigit=function(h){let c=0;for(;h!==0;)c++,h>>>=1;return c},_n.setToSJISFunction=function(c){if(typeof c!="function")throw new Error('"toSJISFunc" is not a valid function.');r=c},_n.isKanjiModeEnabled=function(){return typeof r<"u"},_n.toSJIS=function(c){return r(c)},_n}var Ro={},wh;function er(){return wh||(wh=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function f(h){if(typeof h!="string")throw new Error("Param is not a string");switch(h.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+h)}}r.isValid=function(c){return c&&typeof c.bit<"u"&&c.bit>=0&&c.bit<4},r.from=function(c,s){if(r.isValid(c))return c;try{return f(c)}catch{return s}}})(Ro)),Ro}var Mo,Th;function f1(){if(Th)return Mo;Th=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(f){const h=Math.floor(f/8);return(this.buffer[h]>>>7-f%8&1)===1},put:function(f,h){for(let c=0;c<h;c++)this.putBit((f>>>h-c-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(f){const h=Math.floor(this.length/8);this.buffer.length<=h&&this.buffer.push(0),f&&(this.buffer[h]|=128>>>this.length%8),this.length++}},Mo=r,Mo}var zo,Ah;function d1(){if(Ah)return zo;Ah=1;function r(f){if(!f||f<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=f,this.data=new Uint8Array(f*f),this.reservedBit=new Uint8Array(f*f)}return r.prototype.set=function(f,h,c,s){const d=f*this.size+h;this.data[d]=c,s&&(this.reservedBit[d]=!0)},r.prototype.get=function(f,h){return this.data[f*this.size+h]},r.prototype.xor=function(f,h,c){this.data[f*this.size+h]^=c},r.prototype.isReserved=function(f,h){return this.reservedBit[f*this.size+h]},zo=r,zo}var Do={},xh;function h1(){return xh||(xh=1,(function(r){const f=Fn().getSymbolSize;r.getRowColCoords=function(c){if(c===1)return[];const s=Math.floor(c/7)+2,d=f(c),S=d===145?26:Math.ceil((d-13)/(2*s-2))*2,w=[d-7];for(let g=1;g<s-1;g++)w[g]=w[g-1]-S;return w.push(6),w.reverse()},r.getPositions=function(c){const s=[],d=r.getRowColCoords(c),S=d.length;for(let w=0;w<S;w++)for(let g=0;g<S;g++)w===0&&g===0||w===0&&g===S-1||w===S-1&&g===0||s.push([d[w],d[g]]);return s}})(Do)),Do}var Oo={},Ch;function m1(){if(Ch)return Oo;Ch=1;const r=Fn().getSymbolSize,f=7;return Oo.getPositions=function(c){const s=r(c);return[[0,0],[s-f,0],[0,s-f]]},Oo}var Bo={},Nh;function g1(){return Nh||(Nh=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const f={N1:3,N2:3,N3:40,N4:10};r.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},r.from=function(s){return r.isValid(s)?parseInt(s,10):void 0},r.getPenaltyN1=function(s){const d=s.size;let S=0,w=0,g=0,v=null,M=null;for(let R=0;R<d;R++){w=g=0,v=M=null;for(let D=0;D<d;D++){let j=s.get(R,D);j===v?w++:(w>=5&&(S+=f.N1+(w-5)),v=j,w=1),j=s.get(D,R),j===M?g++:(g>=5&&(S+=f.N1+(g-5)),M=j,g=1)}w>=5&&(S+=f.N1+(w-5)),g>=5&&(S+=f.N1+(g-5))}return S},r.getPenaltyN2=function(s){const d=s.size;let S=0;for(let w=0;w<d-1;w++)for(let g=0;g<d-1;g++){const v=s.get(w,g)+s.get(w,g+1)+s.get(w+1,g)+s.get(w+1,g+1);(v===4||v===0)&&S++}return S*f.N2},r.getPenaltyN3=function(s){const d=s.size;let S=0,w=0,g=0;for(let v=0;v<d;v++){w=g=0;for(let M=0;M<d;M++)w=w<<1&2047|s.get(v,M),M>=10&&(w===1488||w===93)&&S++,g=g<<1&2047|s.get(M,v),M>=10&&(g===1488||g===93)&&S++}return S*f.N3},r.getPenaltyN4=function(s){let d=0;const S=s.data.length;for(let g=0;g<S;g++)d+=s.data[g];return Math.abs(Math.ceil(d*100/S/5)-10)*f.N4};function h(c,s,d){switch(c){case r.Patterns.PATTERN000:return(s+d)%2===0;case r.Patterns.PATTERN001:return s%2===0;case r.Patterns.PATTERN010:return d%3===0;case r.Patterns.PATTERN011:return(s+d)%3===0;case r.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(d/3))%2===0;case r.Patterns.PATTERN101:return s*d%2+s*d%3===0;case r.Patterns.PATTERN110:return(s*d%2+s*d%3)%2===0;case r.Patterns.PATTERN111:return(s*d%3+(s+d)%2)%2===0;default:throw new Error("bad maskPattern:"+c)}}r.applyMask=function(s,d){const S=d.size;for(let w=0;w<S;w++)for(let g=0;g<S;g++)d.isReserved(g,w)||d.xor(g,w,h(s,g,w))},r.getBestMask=function(s,d){const S=Object.keys(r.Patterns).length;let w=0,g=1/0;for(let v=0;v<S;v++){d(v),r.applyMask(v,s);const M=r.getPenaltyN1(s)+r.getPenaltyN2(s)+r.getPenaltyN3(s)+r.getPenaltyN4(s);r.applyMask(v,s),M<g&&(g=M,w=v)}return w}})(Bo)),Bo}var Wi={},_h;function n0(){if(_h)return Wi;_h=1;const r=er(),f=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],h=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Wi.getBlocksCount=function(s,d){switch(d){case r.L:return f[(s-1)*4+0];case r.M:return f[(s-1)*4+1];case r.Q:return f[(s-1)*4+2];case r.H:return f[(s-1)*4+3];default:return}},Wi.getTotalCodewordsCount=function(s,d){switch(d){case r.L:return h[(s-1)*4+0];case r.M:return h[(s-1)*4+1];case r.Q:return h[(s-1)*4+2];case r.H:return h[(s-1)*4+3];default:return}},Wi}var Uo={},Ma={},Rh;function y1(){if(Rh)return Ma;Rh=1;const r=new Uint8Array(512),f=new Uint8Array(256);return(function(){let c=1;for(let s=0;s<255;s++)r[s]=c,f[c]=s,c<<=1,c&256&&(c^=285);for(let s=255;s<512;s++)r[s]=r[s-255]})(),Ma.log=function(c){if(c<1)throw new Error("log("+c+")");return f[c]},Ma.exp=function(c){return r[c]},Ma.mul=function(c,s){return c===0||s===0?0:r[f[c]+f[s]]},Ma}var Mh;function p1(){return Mh||(Mh=1,(function(r){const f=y1();r.mul=function(c,s){const d=new Uint8Array(c.length+s.length-1);for(let S=0;S<c.length;S++)for(let w=0;w<s.length;w++)d[S+w]^=f.mul(c[S],s[w]);return d},r.mod=function(c,s){let d=new Uint8Array(c);for(;d.length-s.length>=0;){const S=d[0];for(let g=0;g<s.length;g++)d[g]^=f.mul(s[g],S);let w=0;for(;w<d.length&&d[w]===0;)w++;d=d.slice(w)}return d},r.generateECPolynomial=function(c){let s=new Uint8Array([1]);for(let d=0;d<c;d++)s=r.mul(s,new Uint8Array([1,f.exp(d)]));return s}})(Uo)),Uo}var Ho,zh;function v1(){if(zh)return Ho;zh=1;const r=p1();function f(h){this.genPoly=void 0,this.degree=h,this.degree&&this.initialize(this.degree)}return f.prototype.initialize=function(c){this.degree=c,this.genPoly=r.generateECPolynomial(this.degree)},f.prototype.encode=function(c){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(c.length+this.degree);s.set(c);const d=r.mod(s,this.genPoly),S=this.degree-d.length;if(S>0){const w=new Uint8Array(this.degree);return w.set(d,S),w}return d},Ho=f,Ho}var jo={},Lo={},qo={},Dh;function l0(){return Dh||(Dh=1,qo.isValid=function(f){return!isNaN(f)&&f>=1&&f<=40}),qo}var Be={},Oh;function a0(){if(Oh)return Be;Oh=1;const r="[0-9]+",f="[A-Z $%*+\\-./:]+";let h="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";h=h.replace(/u/g,"\\u");const c="(?:(?![A-Z0-9 $%*+\\-./:]|"+h+`)(?:.|[\r
]))+`;Be.KANJI=new RegExp(h,"g"),Be.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Be.BYTE=new RegExp(c,"g"),Be.NUMERIC=new RegExp(r,"g"),Be.ALPHANUMERIC=new RegExp(f,"g");const s=new RegExp("^"+h+"$"),d=new RegExp("^"+r+"$"),S=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Be.testKanji=function(g){return s.test(g)},Be.testNumeric=function(g){return d.test(g)},Be.testAlphanumeric=function(g){return S.test(g)},Be}var Bh;function In(){return Bh||(Bh=1,(function(r){const f=l0(),h=a0();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(d,S){if(!d.ccBits)throw new Error("Invalid mode: "+d);if(!f.isValid(S))throw new Error("Invalid version: "+S);return S>=1&&S<10?d.ccBits[0]:S<27?d.ccBits[1]:d.ccBits[2]},r.getBestModeForData=function(d){return h.testNumeric(d)?r.NUMERIC:h.testAlphanumeric(d)?r.ALPHANUMERIC:h.testKanji(d)?r.KANJI:r.BYTE},r.toString=function(d){if(d&&d.id)return d.id;throw new Error("Invalid mode")},r.isValid=function(d){return d&&d.bit&&d.ccBits};function c(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+s)}}r.from=function(d,S){if(r.isValid(d))return d;try{return c(d)}catch{return S}}})(Lo)),Lo}var Uh;function b1(){return Uh||(Uh=1,(function(r){const f=Fn(),h=n0(),c=er(),s=In(),d=l0(),S=7973,w=f.getBCHDigit(S);function g(D,j,Y){for(let K=1;K<=40;K++)if(j<=r.getCapacity(K,Y,D))return K}function v(D,j){return s.getCharCountIndicator(D,j)+4}function M(D,j){let Y=0;return D.forEach(function(K){const pt=v(K.mode,j);Y+=pt+K.getBitsLength()}),Y}function R(D,j){for(let Y=1;Y<=40;Y++)if(M(D,Y)<=r.getCapacity(Y,j,s.MIXED))return Y}r.from=function(j,Y){return d.isValid(j)?parseInt(j,10):Y},r.getCapacity=function(j,Y,K){if(!d.isValid(j))throw new Error("Invalid QR Code version");typeof K>"u"&&(K=s.BYTE);const pt=f.getSymbolTotalCodewords(j),W=h.getTotalCodewordsCount(j,Y),L=(pt-W)*8;if(K===s.MIXED)return L;const q=L-v(K,j);switch(K){case s.NUMERIC:return Math.floor(q/10*3);case s.ALPHANUMERIC:return Math.floor(q/11*2);case s.KANJI:return Math.floor(q/13);case s.BYTE:default:return Math.floor(q/8)}},r.getBestVersionForData=function(j,Y){let K;const pt=c.from(Y,c.M);if(Array.isArray(j)){if(j.length>1)return R(j,pt);if(j.length===0)return 1;K=j[0]}else K=j;return g(K.mode,K.getLength(),pt)},r.getEncodedBits=function(j){if(!d.isValid(j)||j<7)throw new Error("Invalid QR Code version");let Y=j<<12;for(;f.getBCHDigit(Y)-w>=0;)Y^=S<<f.getBCHDigit(Y)-w;return j<<12|Y}})(jo)),jo}var Go={},Hh;function S1(){if(Hh)return Go;Hh=1;const r=Fn(),f=1335,h=21522,c=r.getBCHDigit(f);return Go.getEncodedBits=function(d,S){const w=d.bit<<3|S;let g=w<<10;for(;r.getBCHDigit(g)-c>=0;)g^=f<<r.getBCHDigit(g)-c;return(w<<10|g)^h},Go}var ko={},Yo,jh;function E1(){if(jh)return Yo;jh=1;const r=In();function f(h){this.mode=r.NUMERIC,this.data=h.toString()}return f.getBitsLength=function(c){return 10*Math.floor(c/3)+(c%3?c%3*3+1:0)},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(c){let s,d,S;for(s=0;s+3<=this.data.length;s+=3)d=this.data.substr(s,3),S=parseInt(d,10),c.put(S,10);const w=this.data.length-s;w>0&&(d=this.data.substr(s),S=parseInt(d,10),c.put(S,w*3+1))},Yo=f,Yo}var Qo,Lh;function w1(){if(Lh)return Qo;Lh=1;const r=In(),f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function h(c){this.mode=r.ALPHANUMERIC,this.data=c}return h.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(s){let d;for(d=0;d+2<=this.data.length;d+=2){let S=f.indexOf(this.data[d])*45;S+=f.indexOf(this.data[d+1]),s.put(S,11)}this.data.length%2&&s.put(f.indexOf(this.data[d]),6)},Qo=h,Qo}var Xo,qh;function T1(){if(qh)return Xo;qh=1;const r=In();function f(h){this.mode=r.BYTE,typeof h=="string"?this.data=new TextEncoder().encode(h):this.data=new Uint8Array(h)}return f.getBitsLength=function(c){return c*8},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(h){for(let c=0,s=this.data.length;c<s;c++)h.put(this.data[c],8)},Xo=f,Xo}var Vo,Gh;function A1(){if(Gh)return Vo;Gh=1;const r=In(),f=Fn();function h(c){this.mode=r.KANJI,this.data=c}return h.getBitsLength=function(s){return s*13},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(c){let s;for(s=0;s<this.data.length;s++){let d=f.toSJIS(this.data[s]);if(d>=33088&&d<=40956)d-=33088;else if(d>=57408&&d<=60351)d-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);d=(d>>>8&255)*192+(d&255),c.put(d,13)}},Vo=h,Vo}var Zo={exports:{}},kh;function x1(){return kh||(kh=1,(function(r){var f={single_source_shortest_paths:function(h,c,s){var d={},S={};S[c]=0;var w=f.PriorityQueue.make();w.push(c,0);for(var g,v,M,R,D,j,Y,K,pt;!w.empty();){g=w.pop(),v=g.value,R=g.cost,D=h[v]||{};for(M in D)D.hasOwnProperty(M)&&(j=D[M],Y=R+j,K=S[M],pt=typeof S[M]>"u",(pt||K>Y)&&(S[M]=Y,w.push(M,Y),d[M]=v))}if(typeof s<"u"&&typeof S[s]>"u"){var W=["Could not find a path from ",c," to ",s,"."].join("");throw new Error(W)}return d},extract_shortest_path_from_predecessor_list:function(h,c){for(var s=[],d=c;d;)s.push(d),h[d],d=h[d];return s.reverse(),s},find_path:function(h,c,s){var d=f.single_source_shortest_paths(h,c,s);return f.extract_shortest_path_from_predecessor_list(d,s)},PriorityQueue:{make:function(h){var c=f.PriorityQueue,s={},d;h=h||{};for(d in c)c.hasOwnProperty(d)&&(s[d]=c[d]);return s.queue=[],s.sorter=h.sorter||c.default_sorter,s},default_sorter:function(h,c){return h.cost-c.cost},push:function(h,c){var s={value:h,cost:c};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=f})(Zo)),Zo.exports}var Yh;function C1(){return Yh||(Yh=1,(function(r){const f=In(),h=E1(),c=w1(),s=T1(),d=A1(),S=a0(),w=Fn(),g=x1();function v(W){return unescape(encodeURIComponent(W)).length}function M(W,L,q){const X=[];let ot;for(;(ot=W.exec(q))!==null;)X.push({data:ot[0],index:ot.index,mode:L,length:ot[0].length});return X}function R(W){const L=M(S.NUMERIC,f.NUMERIC,W),q=M(S.ALPHANUMERIC,f.ALPHANUMERIC,W);let X,ot;return w.isKanjiModeEnabled()?(X=M(S.BYTE,f.BYTE,W),ot=M(S.KANJI,f.KANJI,W)):(X=M(S.BYTE_KANJI,f.BYTE,W),ot=[]),L.concat(q,X,ot).sort(function(H,V){return H.index-V.index}).map(function(H){return{data:H.data,mode:H.mode,length:H.length}})}function D(W,L){switch(L){case f.NUMERIC:return h.getBitsLength(W);case f.ALPHANUMERIC:return c.getBitsLength(W);case f.KANJI:return d.getBitsLength(W);case f.BYTE:return s.getBitsLength(W)}}function j(W){return W.reduce(function(L,q){const X=L.length-1>=0?L[L.length-1]:null;return X&&X.mode===q.mode?(L[L.length-1].data+=q.data,L):(L.push(q),L)},[])}function Y(W){const L=[];for(let q=0;q<W.length;q++){const X=W[q];switch(X.mode){case f.NUMERIC:L.push([X,{data:X.data,mode:f.ALPHANUMERIC,length:X.length},{data:X.data,mode:f.BYTE,length:X.length}]);break;case f.ALPHANUMERIC:L.push([X,{data:X.data,mode:f.BYTE,length:X.length}]);break;case f.KANJI:L.push([X,{data:X.data,mode:f.BYTE,length:v(X.data)}]);break;case f.BYTE:L.push([{data:X.data,mode:f.BYTE,length:v(X.data)}])}}return L}function K(W,L){const q={},X={start:{}};let ot=["start"];for(let U=0;U<W.length;U++){const H=W[U],V=[];for(let Q=0;Q<H.length;Q++){const et=H[Q],$=""+U+Q;V.push($),q[$]={node:et,lastCount:0},X[$]={};for(let F=0;F<ot.length;F++){const P=ot[F];q[P]&&q[P].node.mode===et.mode?(X[P][$]=D(q[P].lastCount+et.length,et.mode)-D(q[P].lastCount,et.mode),q[P].lastCount+=et.length):(q[P]&&(q[P].lastCount=et.length),X[P][$]=D(et.length,et.mode)+4+f.getCharCountIndicator(et.mode,L))}}ot=V}for(let U=0;U<ot.length;U++)X[ot[U]].end=0;return{map:X,table:q}}function pt(W,L){let q;const X=f.getBestModeForData(W);if(q=f.from(L,X),q!==f.BYTE&&q.bit<X.bit)throw new Error('"'+W+'" cannot be encoded with mode '+f.toString(q)+`.
 Suggested mode is: `+f.toString(X));switch(q===f.KANJI&&!w.isKanjiModeEnabled()&&(q=f.BYTE),q){case f.NUMERIC:return new h(W);case f.ALPHANUMERIC:return new c(W);case f.KANJI:return new d(W);case f.BYTE:return new s(W)}}r.fromArray=function(L){return L.reduce(function(q,X){return typeof X=="string"?q.push(pt(X,null)):X.data&&q.push(pt(X.data,X.mode)),q},[])},r.fromString=function(L,q){const X=R(L,w.isKanjiModeEnabled()),ot=Y(X),U=K(ot,q),H=g.find_path(U.map,"start","end"),V=[];for(let Q=1;Q<H.length-1;Q++)V.push(U.table[H[Q]].node);return r.fromArray(j(V))},r.rawSplit=function(L){return r.fromArray(R(L,w.isKanjiModeEnabled()))}})(ko)),ko}var Qh;function N1(){if(Qh)return _o;Qh=1;const r=Fn(),f=er(),h=f1(),c=d1(),s=h1(),d=m1(),S=g1(),w=n0(),g=v1(),v=b1(),M=S1(),R=In(),D=C1();function j(U,H){const V=U.size,Q=d.getPositions(H);for(let et=0;et<Q.length;et++){const $=Q[et][0],F=Q[et][1];for(let P=-1;P<=7;P++)if(!($+P<=-1||V<=$+P))for(let at=-1;at<=7;at++)F+at<=-1||V<=F+at||(P>=0&&P<=6&&(at===0||at===6)||at>=0&&at<=6&&(P===0||P===6)||P>=2&&P<=4&&at>=2&&at<=4?U.set($+P,F+at,!0,!0):U.set($+P,F+at,!1,!0))}}function Y(U){const H=U.size;for(let V=8;V<H-8;V++){const Q=V%2===0;U.set(V,6,Q,!0),U.set(6,V,Q,!0)}}function K(U,H){const V=s.getPositions(H);for(let Q=0;Q<V.length;Q++){const et=V[Q][0],$=V[Q][1];for(let F=-2;F<=2;F++)for(let P=-2;P<=2;P++)F===-2||F===2||P===-2||P===2||F===0&&P===0?U.set(et+F,$+P,!0,!0):U.set(et+F,$+P,!1,!0)}}function pt(U,H){const V=U.size,Q=v.getEncodedBits(H);let et,$,F;for(let P=0;P<18;P++)et=Math.floor(P/3),$=P%3+V-8-3,F=(Q>>P&1)===1,U.set(et,$,F,!0),U.set($,et,F,!0)}function W(U,H,V){const Q=U.size,et=M.getEncodedBits(H,V);let $,F;for($=0;$<15;$++)F=(et>>$&1)===1,$<6?U.set($,8,F,!0):$<8?U.set($+1,8,F,!0):U.set(Q-15+$,8,F,!0),$<8?U.set(8,Q-$-1,F,!0):$<9?U.set(8,15-$-1+1,F,!0):U.set(8,15-$-1,F,!0);U.set(Q-8,8,1,!0)}function L(U,H){const V=U.size;let Q=-1,et=V-1,$=7,F=0;for(let P=V-1;P>0;P-=2)for(P===6&&P--;;){for(let at=0;at<2;at++)if(!U.isReserved(et,P-at)){let qt=!1;F<H.length&&(qt=(H[F]>>>$&1)===1),U.set(et,P-at,qt),$--,$===-1&&(F++,$=7)}if(et+=Q,et<0||V<=et){et-=Q,Q=-Q;break}}}function q(U,H,V){const Q=new h;V.forEach(function(at){Q.put(at.mode.bit,4),Q.put(at.getLength(),R.getCharCountIndicator(at.mode,U)),at.write(Q)});const et=r.getSymbolTotalCodewords(U),$=w.getTotalCodewordsCount(U,H),F=(et-$)*8;for(Q.getLengthInBits()+4<=F&&Q.put(0,4);Q.getLengthInBits()%8!==0;)Q.putBit(0);const P=(F-Q.getLengthInBits())/8;for(let at=0;at<P;at++)Q.put(at%2?17:236,8);return X(Q,U,H)}function X(U,H,V){const Q=r.getSymbolTotalCodewords(H),et=w.getTotalCodewordsCount(H,V),$=Q-et,F=w.getBlocksCount(H,V),P=Q%F,at=F-P,qt=Math.floor(Q/F),N=Math.floor($/F),k=N+1,nt=qt-N,Tt=new g(nt);let Et=0;const p=new Array(F),B=new Array(F);let G=0;const J=new Uint8Array(U.buffer);for(let Ct=0;Ct<F;Ct++){const He=Ct<at?N:k;p[Ct]=J.slice(Et,Et+He),B[Ct]=Tt.encode(p[Ct]),Et+=He,G=Math.max(G,He)}const it=new Uint8Array(Q);let st=0,ft,zt;for(ft=0;ft<G;ft++)for(zt=0;zt<F;zt++)ft<p[zt].length&&(it[st++]=p[zt][ft]);for(ft=0;ft<nt;ft++)for(zt=0;zt<F;zt++)it[st++]=B[zt][ft];return it}function ot(U,H,V,Q){let et;if(Array.isArray(U))et=D.fromArray(U);else if(typeof U=="string"){let qt=H;if(!qt){const N=D.rawSplit(U);qt=v.getBestVersionForData(N,V)}et=D.fromString(U,qt||40)}else throw new Error("Invalid data");const $=v.getBestVersionForData(et,V);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!H)H=$;else if(H<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const F=q(H,V,et),P=r.getSymbolSize(H),at=new c(P);return j(at,H),Y(at),K(at,H),W(at,V,0),H>=7&&pt(at,H),L(at,F),isNaN(Q)&&(Q=S.getBestMask(at,W.bind(null,at,V))),S.applyMask(Q,at),W(at,V,Q),{modules:at,version:H,errorCorrectionLevel:V,maskPattern:Q,segments:et}}return _o.create=function(H,V){if(typeof H>"u"||H==="")throw new Error("No input text");let Q=f.M,et,$;return typeof V<"u"&&(Q=f.from(V.errorCorrectionLevel,f.M),et=v.from(V.version),$=S.from(V.maskPattern),V.toSJISFunc&&r.setToSJISFunction(V.toSJISFunc)),ot(H,et,Q,$)},_o}var Ko={},Jo={},Xh;function i0(){return Xh||(Xh=1,(function(r){function f(h){if(typeof h=="number"&&(h=h.toString()),typeof h!="string")throw new Error("Color should be defined as hex string");let c=h.slice().replace("#","").split("");if(c.length<3||c.length===5||c.length>8)throw new Error("Invalid hex color: "+h);(c.length===3||c.length===4)&&(c=Array.prototype.concat.apply([],c.map(function(d){return[d,d]}))),c.length===6&&c.push("F","F");const s=parseInt(c.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+c.slice(0,6).join("")}}r.getOptions=function(c){c||(c={}),c.color||(c.color={});const s=typeof c.margin>"u"||c.margin===null||c.margin<0?4:c.margin,d=c.width&&c.width>=21?c.width:void 0,S=c.scale||4;return{width:d,scale:d?4:S,margin:s,color:{dark:f(c.color.dark||"#000000ff"),light:f(c.color.light||"#ffffffff")},type:c.type,rendererOpts:c.rendererOpts||{}}},r.getScale=function(c,s){return s.width&&s.width>=c+s.margin*2?s.width/(c+s.margin*2):s.scale},r.getImageWidth=function(c,s){const d=r.getScale(c,s);return Math.floor((c+s.margin*2)*d)},r.qrToImageData=function(c,s,d){const S=s.modules.size,w=s.modules.data,g=r.getScale(S,d),v=Math.floor((S+d.margin*2)*g),M=d.margin*g,R=[d.color.light,d.color.dark];for(let D=0;D<v;D++)for(let j=0;j<v;j++){let Y=(D*v+j)*4,K=d.color.light;if(D>=M&&j>=M&&D<v-M&&j<v-M){const pt=Math.floor((D-M)/g),W=Math.floor((j-M)/g);K=R[w[pt*S+W]?1:0]}c[Y++]=K.r,c[Y++]=K.g,c[Y++]=K.b,c[Y]=K.a}}})(Jo)),Jo}var Vh;function _1(){return Vh||(Vh=1,(function(r){const f=i0();function h(s,d,S){s.clearRect(0,0,d.width,d.height),d.style||(d.style={}),d.height=S,d.width=S,d.style.height=S+"px",d.style.width=S+"px"}function c(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(d,S,w){let g=w,v=S;typeof g>"u"&&(!S||!S.getContext)&&(g=S,S=void 0),S||(v=c()),g=f.getOptions(g);const M=f.getImageWidth(d.modules.size,g),R=v.getContext("2d"),D=R.createImageData(M,M);return f.qrToImageData(D.data,d,g),h(R,v,M),R.putImageData(D,0,0),v},r.renderToDataURL=function(d,S,w){let g=w;typeof g>"u"&&(!S||!S.getContext)&&(g=S,S=void 0),g||(g={});const v=r.render(d,S,g),M=g.type||"image/png",R=g.rendererOpts||{};return v.toDataURL(M,R.quality)}})(Ko)),Ko}var Fo={},Zh;function R1(){if(Zh)return Fo;Zh=1;const r=i0();function f(s,d){const S=s.a/255,w=d+'="'+s.hex+'"';return S<1?w+" "+d+'-opacity="'+S.toFixed(2).slice(1)+'"':w}function h(s,d,S){let w=s+d;return typeof S<"u"&&(w+=" "+S),w}function c(s,d,S){let w="",g=0,v=!1,M=0;for(let R=0;R<s.length;R++){const D=Math.floor(R%d),j=Math.floor(R/d);!D&&!v&&(v=!0),s[R]?(M++,R>0&&D>0&&s[R-1]||(w+=v?h("M",D+S,.5+j+S):h("m",g,0),g=0,v=!1),D+1<d&&s[R+1]||(w+=h("h",M),M=0)):g++}return w}return Fo.render=function(d,S,w){const g=r.getOptions(S),v=d.modules.size,M=d.modules.data,R=v+g.margin*2,D=g.color.light.a?"<path "+f(g.color.light,"fill")+' d="M0 0h'+R+"v"+R+'H0z"/>':"",j="<path "+f(g.color.dark,"stroke")+' d="'+c(M,v,g.margin)+'"/>',Y='viewBox="0 0 '+R+" "+R+'"',pt='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+Y+' shape-rendering="crispEdges">'+D+j+`</svg>
`;return typeof w=="function"&&w(null,pt),pt},Fo}var Kh;function M1(){if(Kh)return Ul;Kh=1;const r=s1(),f=N1(),h=_1(),c=R1();function s(d,S,w,g,v){const M=[].slice.call(arguments,1),R=M.length,D=typeof M[R-1]=="function";if(!D&&!r())throw new Error("Callback required as last argument");if(D){if(R<2)throw new Error("Too few arguments provided");R===2?(v=w,w=S,S=g=void 0):R===3&&(S.getContext&&typeof v>"u"?(v=g,g=void 0):(v=g,g=w,w=S,S=void 0))}else{if(R<1)throw new Error("Too few arguments provided");return R===1?(w=S,S=g=void 0):R===2&&!S.getContext&&(g=w,w=S,S=void 0),new Promise(function(j,Y){try{const K=f.create(w,g);j(d(K,S,g))}catch(K){Y(K)}})}try{const j=f.create(w,g);v(null,d(j,S,g))}catch(j){v(j)}}return Ul.create=f.create,Ul.toCanvas=s.bind(null,h.render),Ul.toDataURL=s.bind(null,h.renderToDataURL),Ul.toString=s.bind(null,function(d,S,w){return c.render(d,w)}),Ul}var z1=M1();const D1=Mg(z1),Io=`${window.location.origin}/hpde/pr-preview/pr-124/`;function O1(){const[r,f]=vt.useState(!1),[h,c]=vt.useState(null);vt.useEffect(()=>{window.scrollTo(0,0),D1.toDataURL(Io,{margin:1,width:240}).then(c).catch(()=>c(null))},[]);async function s(){await navigator.clipboard.writeText(Io),f(!0),setTimeout(()=>f(!1),2e3)}return E.jsx("div",{className:"min-h-screen bg-gray-50",children:E.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[E.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[E.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),E.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:E.jsx(Ph,{size:18})})]}),E.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),E.jsxs("button",{onClick:s,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[E.jsx("span",{className:"truncate text-sm text-gray-800",children:Io}),r?E.jsx(eu,{size:16,className:"shrink-0 text-green-600"}):E.jsx($h,{size:16,className:"shrink-0 text-gray-400"})]}),E.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:h&&E.jsx("img",{src:h,alt:"QR code for schedule link",width:240,height:240})})]})})}function Da(r,f){const h=f.split(`
`).map(M=>M.trim());let c="",s="",d;const S=[],w=[];let g=null,v=!1;for(const M of h)if(!(!M||M.startsWith("//"))){if(M.startsWith("# ")){c=M.slice(2).trim();continue}if(M.startsWith("subtitle:")){s=M.slice(9).trim();continue}if(M.startsWith("link:")){d=M.slice(5).trim()||void 0;continue}if(M.startsWith("## ")){const R=M.slice(3).trim();if(R.toLowerCase()==="groups"){v=!0,g=null;continue}const D=R.split("|").map(j=>j.trim());D.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(D[1])?(v=!1,g={id:D[0].toLowerCase().replace(/\s+/g,"-"),label:D[0],date:D[1],events:[]},w.push(g)):v=!1;continue}if(v){const R=M.split("|").map(D=>D.trim());if(R.length>=4){const D=R[4]||void 0;S.push({id:R[0],label:R[1],bgClass:R[2],textClass:R[3],...D?{description:D}:{}})}continue}if(g){if(/^\d{2}:\d{2}/.test(M)){const R=B1(M);R&&g.events.push(R)}else if(/^break\s*\|/.test(M)){const R=M.slice(M.indexOf("|")+1).trim();g.events.push({type:"break",label:R})}}}return{id:r,name:c,subtitle:s,...d?{link:d}:{},runGroups:S,days:w}}function B1(r){const f=r.split("|").map(w=>w.trim()),h=f[0],c=f.slice(1),s=h.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!s)return null;const d=s[1],S=s[2].trim();if(/^(general|lunch|special)$/.test(S)){const w=S,g=c[0]??"",v=c[1]||void 0;return{time:d,type:w,label:g,...v?{subtitle:v}:{}}}if(/^session/.test(S)){const w=S.match(/^session\s+(\d+)/),g=w?parseInt(w[1],10):void 0;let v=[],M=[],R;for(const D of c)D.startsWith("on:")?v=D.slice(3).trim().split(",").map(j=>j.trim()).filter(Boolean):D.startsWith("in:")?M=D.slice(3).trim().split(",").map(j=>j.trim()).filter(Boolean):D.startsWith("note:")&&(R=D.slice(5).trim()||void 0);return{time:d,type:"session",...g!==void 0?{sessionNumber:g}:{},onTrack:v,...M.length?{inClass:M}:{},...R?{note:R}:{}}}return null}const U1=`# MSRC 1.7
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
`,H1="/hpde/pr-preview/pr-124/assets/msrc-1-7-D9G0r_nf.jpg",j1={...Da("2026-09-11_msrc-1-7",U1),mapImage:H1},L1=`# TXR SCCA
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
`,q1=Da("2026-09-13_msr-scca",L1),G1=`# MSRC 1.7 Fast Track
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
`,k1=Da("2026-06-06_msrc-1-7",G1),Y1=`# MSRC 3.1
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
`,Q1=Da("2025-11-07_msrc-3-1",Y1),X1=`# ECR 2.7
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
`,V1=Da("2026-05-30_ecr-2-7",X1),za=[j1,q1,k1,V1,Q1].sort((r,f)=>f.id.localeCompare(r.id));function $i(r,f){const[h,c]=vt.useState(()=>{try{const s=localStorage.getItem(r);return s!==null?JSON.parse(s):f}catch{return f}});return vt.useEffect(()=>{localStorage.setItem(r,JSON.stringify(h))},[r,h]),[h,c]}function u0(r){const f=tu();return r.days.find(h=>h.date===f)}function Jh(r){return u0(r)??r.days[0]}function Z1(){const[r,f]=vt.useState(()=>window.location.hash);vt.useEffect(()=>{const c=()=>{f(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",c),()=>window.removeEventListener("hashchange",c)},[]);function h(c){window.location.hash!==c&&(window.location.hash=c)}return[r,h]}const $o="#/event/";function Fh(r){return`${$o}${encodeURIComponent(r)}`}function K1(r){return r.startsWith($o)?decodeURIComponent(r.slice($o.length)):null}function J1(){const[r,f]=Z1(),[h,c]=vt.useState("schedule"),[s,d]=$i("hpde:activeEvent",za[0].id),[S,w]=$i("hpde:activeDay",null),[g,v]=$i("hpde:groups",[]),[M,R]=$i("hpde:hidePast",!1),D=za.find(U=>U.id===s)??za[0],j=D.days.find(U=>U.id===S)??Jh(D),Y=u0(D),K=j.date===tu(),pt=D.days.length>1,L=D.days.reduce((U,H)=>H.date>U?H.date:U,D.days[0].date)<tu(),[,q]=vt.useState(0);vt.useEffect(()=>{if(!K)return;const U=setInterval(()=>q(H=>H+1),6e4);return()=>clearInterval(U)},[K]);const X=K&&j.events.some(U=>U.type!=="break"&&en(U.time)<tr());function ot(U){d(U.id),w(Jh(U).id),v([]),f(Fh(U.id))}return vt.useEffect(()=>{const U=K1(r);if(U){const H=za.find(V=>V.id===U);H&&H.id!==s&&ot(H);return}(r===""||r==="#")&&f(Fh(s))},[r]),r==="#/widget-script"?E.jsx(r1,{}):r==="#/share"?E.jsx(O1,{}):E.jsx(c1,{children:E.jsxs("div",{className:"min-h-screen bg-gray-50",children:[E.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[E.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[E.jsx(a1,{events:za,active:D,onChange:ot}),E.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[E.jsx("button",{onClick:()=>c("schedule"),className:`rounded-md p-2 transition-colors ${h==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:E.jsx(Xg,{size:18})}),E.jsx("button",{onClick:()=>c("map"),className:`rounded-md p-2 transition-colors ${h==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:E.jsx(mh,{size:18})})]})]}),L&&E.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),h==="schedule"&&E.jsxs(E.Fragment,{children:[pt&&E.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[E.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:D.days.map(U=>E.jsx("button",{onClick:()=>w(U.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${j.id===U.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:U.label},U.id))}),E.jsx("button",{onClick:()=>Y&&w(Y.id),disabled:K||!Y,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${K||!Y?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),E.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[E.jsx(l1,{groups:D.runGroups,selected:g,onChange:v}),X&&E.jsx(i1,{checked:M,onChange:()=>R(U=>!U),label:"Hide past events"})]}),E.jsx(n1,{events:j.events,runGroups:D.runGroups,isToday:K,selectedGroups:g,hidePast:M}),E.jsx(o1,{groups:D.runGroups})]}),h==="map"&&(D.mapImage?E.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:E.jsx("img",{src:D.mapImage,alt:`${D.name} track map`,className:"block w-full h-auto"})}):E.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:E.jsxs("div",{className:"text-center",children:[E.jsx(mh,{size:40,className:"mx-auto mb-2 opacity-30"}),E.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),E.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[E.jsxs("div",{children:[E.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",E.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),E.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",Pg("2026-09-16T16:44:58-05:00")]})]})]})})}Gg.createRoot(document.getElementById("root")).render(E.jsx(vt.StrictMode,{children:E.jsx(J1,{})}));
