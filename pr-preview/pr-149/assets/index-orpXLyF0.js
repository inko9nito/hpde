(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const h of o)if(h.type==="childList")for(const v of h.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&c(v)}).observe(document,{childList:!0,subtree:!0});function d(o){const h={};return o.integrity&&(h.integrity=o.integrity),o.referrerPolicy&&(h.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?h.credentials="include":o.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function c(o){if(o.ep)return;o.ep=!0;const h=d(o);fetch(o.href,h)}})();function Qg(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var xr={exports:{}},Rl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fh;function Xg(){if(fh)return Rl;fh=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function d(c,o,h){var v=null;if(h!==void 0&&(v=""+h),o.key!==void 0&&(v=""+o.key),"key"in o){h={};for(var E in o)E!=="key"&&(h[E]=o[E])}else h=o;return o=h.ref,{$$typeof:r,type:c,key:v,ref:o!==void 0?o:null,props:h}}return Rl.Fragment=f,Rl.jsx=d,Rl.jsxs=d,Rl}var dh;function Vg(){return dh||(dh=1,xr.exports=Xg()),xr.exports}var p=Vg(),Ar={exports:{}},ut={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hh;function Zg(){if(hh)return ut;hh=1;var r=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),v=Symbol.for("react.context"),E=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),k=Symbol.for("react.lazy"),z=Symbol.for("react.activity"),O=Symbol.iterator;function U(S){return S===null||typeof S!="object"?null:(S=O&&S[O]||S["@@iterator"],typeof S=="function"?S:null)}var Y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},K=Object.assign,ct={};function H(S,D,G){this.props=S,this.context=D,this.refs=ct,this.updater=G||Y}H.prototype.isReactComponent={},H.prototype.setState=function(S,D){if(typeof S!="object"&&typeof S!="function"&&S!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,S,D,"setState")},H.prototype.forceUpdate=function(S){this.updater.enqueueForceUpdate(this,S,"forceUpdate")};function B(){}B.prototype=H.prototype;function j(S,D,G){this.props=S,this.context=D,this.refs=ct,this.updater=G||Y}var Z=j.prototype=new B;Z.constructor=j,K(Z,H.prototype),Z.isPureReactComponent=!0;var ot=Array.isArray;function Q(){}var q={H:null,A:null,T:null,S:null},L=Object.prototype.hasOwnProperty;function X(S,D,G){var I=G.ref;return{$$typeof:r,type:S,key:D,ref:I!==void 0?I:null,props:G}}function et(S,D){return X(S.type,D,S.props)}function $(S){return typeof S=="object"&&S!==null&&S.$$typeof===r}function F(S){var D={"=":"=0",":":"=2"};return"$"+S.replace(/[=:]/g,function(G){return D[G]})}var P=/\/+/g;function lt(S,D){return typeof S=="object"&&S!==null&&S.key!=null?F(""+S.key):D.toString(36)}function Lt(S){switch(S.status){case"fulfilled":return S.value;case"rejected":throw S.reason;default:switch(typeof S.status=="string"?S.then(Q,Q):(S.status="pending",S.then(function(D){S.status==="pending"&&(S.status="fulfilled",S.value=D)},function(D){S.status==="pending"&&(S.status="rejected",S.reason=D)})),S.status){case"fulfilled":return S.value;case"rejected":throw S.reason}}throw S}function N(S,D,G,I,it){var ft=typeof S;(ft==="undefined"||ft==="boolean")&&(S=null);var dt=!1;if(S===null)dt=!0;else switch(ft){case"bigint":case"string":case"number":dt=!0;break;case"object":switch(S.$$typeof){case r:case f:dt=!0;break;case k:return dt=S._init,N(dt(S._payload),D,G,I,it)}}if(dt)return it=it(S),dt=I===""?"."+lt(S,0):I,ot(it)?(G="",dt!=null&&(G=dt.replace(P,"$&/")+"/"),N(it,D,G,"",function(He){return He})):it!=null&&($(it)&&(it=et(it,G+(it.key==null||S&&S.key===it.key?"":(""+it.key).replace(P,"$&/")+"/")+dt)),D.push(it)),1;dt=0;var zt=I===""?".":I+":";if(ot(S))for(var Ct=0;Ct<S.length;Ct++)I=S[Ct],ft=zt+lt(I,Ct),dt+=N(I,D,G,ft,it);else if(Ct=U(S),typeof Ct=="function")for(S=Ct.call(S),Ct=0;!(I=S.next()).done;)I=I.value,ft=zt+lt(I,Ct++),dt+=N(I,D,G,ft,it);else if(ft==="object"){if(typeof S.then=="function")return N(Lt(S),D,G,I,it);throw D=String(S),Error("Objects are not valid as a React child (found: "+(D==="[object Object]"?"object with keys {"+Object.keys(S).join(", ")+"}":D)+"). If you meant to render a collection of children, use an array instead.")}return dt}function V(S,D,G){if(S==null)return S;var I=[],it=0;return N(S,I,"","",function(ft){return D.call(G,ft,it++)}),I}function nt(S){if(S._status===-1){var D=S._result;D=D(),D.then(function(G){(S._status===0||S._status===-1)&&(S._status=1,S._result=G)},function(G){(S._status===0||S._status===-1)&&(S._status=2,S._result=G)}),S._status===-1&&(S._status=0,S._result=D)}if(S._status===1)return S._result.default;throw S._result}var Tt=typeof reportError=="function"?reportError:function(S){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var D=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof S=="object"&&S!==null&&typeof S.message=="string"?String(S.message):String(S),error:S});if(!window.dispatchEvent(D))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",S);return}console.error(S)},wt={map:V,forEach:function(S,D,G){V(S,function(){D.apply(this,arguments)},G)},count:function(S){var D=0;return V(S,function(){D++}),D},toArray:function(S){return V(S,function(D){return D})||[]},only:function(S){if(!$(S))throw Error("React.Children.only expected to receive a single React element child.");return S}};return ut.Activity=z,ut.Children=wt,ut.Component=H,ut.Fragment=d,ut.Profiler=o,ut.PureComponent=j,ut.StrictMode=c,ut.Suspense=m,ut.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=q,ut.__COMPILER_RUNTIME={__proto__:null,c:function(S){return q.H.useMemoCache(S)}},ut.cache=function(S){return function(){return S.apply(null,arguments)}},ut.cacheSignal=function(){return null},ut.cloneElement=function(S,D,G){if(S==null)throw Error("The argument must be a React element, but you passed "+S+".");var I=K({},S.props),it=S.key;if(D!=null)for(ft in D.key!==void 0&&(it=""+D.key),D)!L.call(D,ft)||ft==="key"||ft==="__self"||ft==="__source"||ft==="ref"&&D.ref===void 0||(I[ft]=D[ft]);var ft=arguments.length-2;if(ft===1)I.children=G;else if(1<ft){for(var dt=Array(ft),zt=0;zt<ft;zt++)dt[zt]=arguments[zt+2];I.children=dt}return X(S.type,it,I)},ut.createContext=function(S){return S={$$typeof:v,_currentValue:S,_currentValue2:S,_threadCount:0,Provider:null,Consumer:null},S.Provider=S,S.Consumer={$$typeof:h,_context:S},S},ut.createElement=function(S,D,G){var I,it={},ft=null;if(D!=null)for(I in D.key!==void 0&&(ft=""+D.key),D)L.call(D,I)&&I!=="key"&&I!=="__self"&&I!=="__source"&&(it[I]=D[I]);var dt=arguments.length-2;if(dt===1)it.children=G;else if(1<dt){for(var zt=Array(dt),Ct=0;Ct<dt;Ct++)zt[Ct]=arguments[Ct+2];it.children=zt}if(S&&S.defaultProps)for(I in dt=S.defaultProps,dt)it[I]===void 0&&(it[I]=dt[I]);return X(S,ft,it)},ut.createRef=function(){return{current:null}},ut.forwardRef=function(S){return{$$typeof:E,render:S}},ut.isValidElement=$,ut.lazy=function(S){return{$$typeof:k,_payload:{_status:-1,_result:S},_init:nt}},ut.memo=function(S,D){return{$$typeof:b,type:S,compare:D===void 0?null:D}},ut.startTransition=function(S){var D=q.T,G={};q.T=G;try{var I=S(),it=q.S;it!==null&&it(G,I),typeof I=="object"&&I!==null&&typeof I.then=="function"&&I.then(Q,Tt)}catch(ft){Tt(ft)}finally{D!==null&&G.types!==null&&(D.types=G.types),q.T=D}},ut.unstable_useCacheRefresh=function(){return q.H.useCacheRefresh()},ut.use=function(S){return q.H.use(S)},ut.useActionState=function(S,D,G){return q.H.useActionState(S,D,G)},ut.useCallback=function(S,D){return q.H.useCallback(S,D)},ut.useContext=function(S){return q.H.useContext(S)},ut.useDebugValue=function(){},ut.useDeferredValue=function(S,D){return q.H.useDeferredValue(S,D)},ut.useEffect=function(S,D){return q.H.useEffect(S,D)},ut.useEffectEvent=function(S){return q.H.useEffectEvent(S)},ut.useId=function(){return q.H.useId()},ut.useImperativeHandle=function(S,D,G){return q.H.useImperativeHandle(S,D,G)},ut.useInsertionEffect=function(S,D){return q.H.useInsertionEffect(S,D)},ut.useLayoutEffect=function(S,D){return q.H.useLayoutEffect(S,D)},ut.useMemo=function(S,D){return q.H.useMemo(S,D)},ut.useOptimistic=function(S,D){return q.H.useOptimistic(S,D)},ut.useReducer=function(S,D,G){return q.H.useReducer(S,D,G)},ut.useRef=function(S){return q.H.useRef(S)},ut.useState=function(S){return q.H.useState(S)},ut.useSyncExternalStore=function(S,D,G){return q.H.useSyncExternalStore(S,D,G)},ut.useTransition=function(){return q.H.useTransition()},ut.version="19.2.6",ut}var mh;function as(){return mh||(mh=1,Ar.exports=Zg()),Ar.exports}var vt=as(),Cr={exports:{}},zl={},Nr={exports:{}},_r={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gh;function Kg(){return gh||(gh=1,(function(r){function f(N,V){var nt=N.length;N.push(V);t:for(;0<nt;){var Tt=nt-1>>>1,wt=N[Tt];if(0<o(wt,V))N[Tt]=V,N[nt]=wt,nt=Tt;else break t}}function d(N){return N.length===0?null:N[0]}function c(N){if(N.length===0)return null;var V=N[0],nt=N.pop();if(nt!==V){N[0]=nt;t:for(var Tt=0,wt=N.length,S=wt>>>1;Tt<S;){var D=2*(Tt+1)-1,G=N[D],I=D+1,it=N[I];if(0>o(G,nt))I<wt&&0>o(it,G)?(N[Tt]=it,N[I]=nt,Tt=I):(N[Tt]=G,N[D]=nt,Tt=D);else if(I<wt&&0>o(it,nt))N[Tt]=it,N[I]=nt,Tt=I;else break t}}return V}function o(N,V){var nt=N.sortIndex-V.sortIndex;return nt!==0?nt:N.id-V.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;r.unstable_now=function(){return h.now()}}else{var v=Date,E=v.now();r.unstable_now=function(){return v.now()-E}}var m=[],b=[],k=1,z=null,O=3,U=!1,Y=!1,K=!1,ct=!1,H=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,j=typeof setImmediate<"u"?setImmediate:null;function Z(N){for(var V=d(b);V!==null;){if(V.callback===null)c(b);else if(V.startTime<=N)c(b),V.sortIndex=V.expirationTime,f(m,V);else break;V=d(b)}}function ot(N){if(K=!1,Z(N),!Y)if(d(m)!==null)Y=!0,Q||(Q=!0,F());else{var V=d(b);V!==null&&Lt(ot,V.startTime-N)}}var Q=!1,q=-1,L=5,X=-1;function et(){return ct?!0:!(r.unstable_now()-X<L)}function $(){if(ct=!1,Q){var N=r.unstable_now();X=N;var V=!0;try{t:{Y=!1,K&&(K=!1,B(q),q=-1),U=!0;var nt=O;try{e:{for(Z(N),z=d(m);z!==null&&!(z.expirationTime>N&&et());){var Tt=z.callback;if(typeof Tt=="function"){z.callback=null,O=z.priorityLevel;var wt=Tt(z.expirationTime<=N);if(N=r.unstable_now(),typeof wt=="function"){z.callback=wt,Z(N),V=!0;break e}z===d(m)&&c(m),Z(N)}else c(m);z=d(m)}if(z!==null)V=!0;else{var S=d(b);S!==null&&Lt(ot,S.startTime-N),V=!1}}break t}finally{z=null,O=nt,U=!1}V=void 0}}finally{V?F():Q=!1}}}var F;if(typeof j=="function")F=function(){j($)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,lt=P.port2;P.port1.onmessage=$,F=function(){lt.postMessage(null)}}else F=function(){H($,0)};function Lt(N,V){q=H(function(){N(r.unstable_now())},V)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(N){N.callback=null},r.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<N?Math.floor(1e3/N):5},r.unstable_getCurrentPriorityLevel=function(){return O},r.unstable_next=function(N){switch(O){case 1:case 2:case 3:var V=3;break;default:V=O}var nt=O;O=V;try{return N()}finally{O=nt}},r.unstable_requestPaint=function(){ct=!0},r.unstable_runWithPriority=function(N,V){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var nt=O;O=N;try{return V()}finally{O=nt}},r.unstable_scheduleCallback=function(N,V,nt){var Tt=r.unstable_now();switch(typeof nt=="object"&&nt!==null?(nt=nt.delay,nt=typeof nt=="number"&&0<nt?Tt+nt:Tt):nt=Tt,N){case 1:var wt=-1;break;case 2:wt=250;break;case 5:wt=1073741823;break;case 4:wt=1e4;break;default:wt=5e3}return wt=nt+wt,N={id:k++,callback:V,priorityLevel:N,startTime:nt,expirationTime:wt,sortIndex:-1},nt>Tt?(N.sortIndex=nt,f(b,N),d(m)===null&&N===d(b)&&(K?(B(q),q=-1):K=!0,Lt(ot,nt-Tt))):(N.sortIndex=wt,f(m,N),Y||U||(Y=!0,Q||(Q=!0,F()))),N},r.unstable_shouldYield=et,r.unstable_wrapCallback=function(N){var V=O;return function(){var nt=O;O=V;try{return N.apply(this,arguments)}finally{O=nt}}}})(_r)),_r}var ph;function Jg(){return ph||(ph=1,Nr.exports=Kg()),Nr.exports}var Mr={exports:{}},Pt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yh;function Ig(){if(yh)return Pt;yh=1;var r=as();function f(m){var b="https://react.dev/errors/"+m;if(1<arguments.length){b+="?args[]="+encodeURIComponent(arguments[1]);for(var k=2;k<arguments.length;k++)b+="&args[]="+encodeURIComponent(arguments[k])}return"Minified React error #"+m+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(){}var c={d:{f:d,r:function(){throw Error(f(522))},D:d,C:d,L:d,m:d,X:d,S:d,M:d},p:0,findDOMNode:null},o=Symbol.for("react.portal");function h(m,b,k){var z=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:z==null?null:""+z,children:m,containerInfo:b,implementation:k}}var v=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function E(m,b){if(m==="font")return"";if(typeof b=="string")return b==="use-credentials"?b:""}return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,Pt.createPortal=function(m,b){var k=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!b||b.nodeType!==1&&b.nodeType!==9&&b.nodeType!==11)throw Error(f(299));return h(m,b,null,k)},Pt.flushSync=function(m){var b=v.T,k=c.p;try{if(v.T=null,c.p=2,m)return m()}finally{v.T=b,c.p=k,c.d.f()}},Pt.preconnect=function(m,b){typeof m=="string"&&(b?(b=b.crossOrigin,b=typeof b=="string"?b==="use-credentials"?b:"":void 0):b=null,c.d.C(m,b))},Pt.prefetchDNS=function(m){typeof m=="string"&&c.d.D(m)},Pt.preinit=function(m,b){if(typeof m=="string"&&b&&typeof b.as=="string"){var k=b.as,z=E(k,b.crossOrigin),O=typeof b.integrity=="string"?b.integrity:void 0,U=typeof b.fetchPriority=="string"?b.fetchPriority:void 0;k==="style"?c.d.S(m,typeof b.precedence=="string"?b.precedence:void 0,{crossOrigin:z,integrity:O,fetchPriority:U}):k==="script"&&c.d.X(m,{crossOrigin:z,integrity:O,fetchPriority:U,nonce:typeof b.nonce=="string"?b.nonce:void 0})}},Pt.preinitModule=function(m,b){if(typeof m=="string")if(typeof b=="object"&&b!==null){if(b.as==null||b.as==="script"){var k=E(b.as,b.crossOrigin);c.d.M(m,{crossOrigin:k,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0})}}else b==null&&c.d.M(m)},Pt.preload=function(m,b){if(typeof m=="string"&&typeof b=="object"&&b!==null&&typeof b.as=="string"){var k=b.as,z=E(k,b.crossOrigin);c.d.L(m,k,{crossOrigin:z,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0,type:typeof b.type=="string"?b.type:void 0,fetchPriority:typeof b.fetchPriority=="string"?b.fetchPriority:void 0,referrerPolicy:typeof b.referrerPolicy=="string"?b.referrerPolicy:void 0,imageSrcSet:typeof b.imageSrcSet=="string"?b.imageSrcSet:void 0,imageSizes:typeof b.imageSizes=="string"?b.imageSizes:void 0,media:typeof b.media=="string"?b.media:void 0})}},Pt.preloadModule=function(m,b){if(typeof m=="string")if(b){var k=E(b.as,b.crossOrigin);c.d.m(m,{as:typeof b.as=="string"&&b.as!=="script"?b.as:void 0,crossOrigin:k,integrity:typeof b.integrity=="string"?b.integrity:void 0})}else c.d.m(m)},Pt.requestFormReset=function(m){c.d.r(m)},Pt.unstable_batchedUpdates=function(m,b){return m(b)},Pt.useFormState=function(m,b,k){return v.H.useFormState(m,b,k)},Pt.useFormStatus=function(){return v.H.useHostTransitionStatus()},Pt.version="19.2.6",Pt}var vh;function Fg(){if(vh)return Mr.exports;vh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),Mr.exports=Ig(),Mr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bh;function Wg(){if(bh)return zl;bh=1;var r=Jg(),f=as(),d=Fg();function c(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function h(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function v(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function E(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function m(t){if(h(t)!==t)throw Error(c(188))}function b(t){var e=t.alternate;if(!e){if(e=h(t),e===null)throw Error(c(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return m(l),t;if(i===a)return m(l),e;i=i.sibling}throw Error(c(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,s=l.child;s;){if(s===n){u=!0,n=l,a=i;break}if(s===a){u=!0,a=l,n=i;break}s=s.sibling}if(!u){for(s=i.child;s;){if(s===n){u=!0,n=i,a=l;break}if(s===a){u=!0,a=i,n=l;break}s=s.sibling}if(!u)throw Error(c(189))}}if(n.alternate!==a)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?t:e}function k(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=k(t),e!==null)return e;t=t.sibling}return null}var z=Object.assign,O=Symbol.for("react.element"),U=Symbol.for("react.transitional.element"),Y=Symbol.for("react.portal"),K=Symbol.for("react.fragment"),ct=Symbol.for("react.strict_mode"),H=Symbol.for("react.profiler"),B=Symbol.for("react.consumer"),j=Symbol.for("react.context"),Z=Symbol.for("react.forward_ref"),ot=Symbol.for("react.suspense"),Q=Symbol.for("react.suspense_list"),q=Symbol.for("react.memo"),L=Symbol.for("react.lazy"),X=Symbol.for("react.activity"),et=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function F(t){return t===null||typeof t!="object"?null:(t=$&&t[$]||t["@@iterator"],typeof t=="function"?t:null)}var P=Symbol.for("react.client.reference");function lt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===P?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case K:return"Fragment";case H:return"Profiler";case ct:return"StrictMode";case ot:return"Suspense";case Q:return"SuspenseList";case X:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Y:return"Portal";case j:return t.displayName||"Context";case B:return(t._context.displayName||"Context")+".Consumer";case Z:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case q:return e=t.displayName||null,e!==null?e:lt(t.type)||"Memo";case L:e=t._payload,t=t._init;try{return lt(t(e))}catch{}}return null}var Lt=Array.isArray,N=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,nt={pending:!1,data:null,method:null,action:null},Tt=[],wt=-1;function S(t){return{current:t}}function D(t){0>wt||(t.current=Tt[wt],Tt[wt]=null,wt--)}function G(t,e){wt++,Tt[wt]=t.current,t.current=e}var I=S(null),it=S(null),ft=S(null),dt=S(null);function zt(t,e){switch(G(ft,e),G(it,t),G(I,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Od(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Od(e),t=Bd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}D(I),G(I,t)}function Ct(){D(I),D(it),D(ft)}function He(t){t.memoizedState!==null&&G(dt,t);var e=I.current,n=Bd(e,t.type);e!==n&&(G(it,t),G(I,n))}function Bl(t){it.current===t&&(D(I),D(it)),dt.current===t&&(D(dt),Cl._currentValue=nt)}var uu,rs;function Mn(t){if(uu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);uu=e&&e[1]||"",rs=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+uu+t+rs}var cu=!1;function ru(t,e){if(!t||cu)return"";cu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var R=function(){throw Error()};if(Object.defineProperty(R.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(R,[])}catch(C){var A=C}Reflect.construct(t,[],R)}else{try{R.call()}catch(C){A=C}t.call(R.prototype)}}else{try{throw Error()}catch(C){A=C}(R=t())&&typeof R.catch=="function"&&R.catch(function(){})}}catch(C){if(C&&A&&typeof C.stack=="string")return[C.stack,A.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],s=i[1];if(u&&s){var g=u.split(`
`),x=s.split(`
`);for(l=a=0;a<g.length&&!g[a].includes("DetermineComponentFrameRoot");)a++;for(;l<x.length&&!x[l].includes("DetermineComponentFrameRoot");)l++;if(a===g.length||l===x.length)for(a=g.length-1,l=x.length-1;1<=a&&0<=l&&g[a]!==x[l];)l--;for(;1<=a&&0<=l;a--,l--)if(g[a]!==x[l]){if(a!==1||l!==1)do if(a--,l--,0>l||g[a]!==x[l]){var _=`
`+g[a].replace(" at new "," at ");return t.displayName&&_.includes("<anonymous>")&&(_=_.replace("<anonymous>",t.displayName)),_}while(1<=a&&0<=l);break}}}finally{cu=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Mn(n):""}function S0(t,e){switch(t.tag){case 26:case 27:case 5:return Mn(t.type);case 16:return Mn("Lazy");case 13:return t.child!==e&&e!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return ru(t.type,!1);case 11:return ru(t.type.render,!1);case 1:return ru(t.type,!0);case 31:return Mn("Activity");default:return""}}function ss(t){try{var e="",n=null;do e+=S0(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var su=Object.prototype.hasOwnProperty,ou=r.unstable_scheduleCallback,fu=r.unstable_cancelCallback,w0=r.unstable_shouldYield,E0=r.unstable_requestPaint,re=r.unstable_now,T0=r.unstable_getCurrentPriorityLevel,os=r.unstable_ImmediatePriority,fs=r.unstable_UserBlockingPriority,Hl=r.unstable_NormalPriority,x0=r.unstable_LowPriority,ds=r.unstable_IdlePriority,A0=r.log,C0=r.unstable_setDisableYieldValue,ja=null,se=null;function nn(t){if(typeof A0=="function"&&C0(t),se&&typeof se.setStrictMode=="function")try{se.setStrictMode(ja,t)}catch{}}var oe=Math.clz32?Math.clz32:M0,N0=Math.log,_0=Math.LN2;function M0(t){return t>>>=0,t===0?32:31-(N0(t)/_0|0)|0}var Ul=256,jl=262144,Ll=4194304;function Rn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ql(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var s=a&134217727;return s!==0?(a=s&~i,a!==0?l=Rn(a):(u&=s,u!==0?l=Rn(u):n||(n=s&~t,n!==0&&(l=Rn(n))))):(s=a&~i,s!==0?l=Rn(s):u!==0?l=Rn(u):n||(n=a&~t,n!==0&&(l=Rn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function La(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function R0(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function hs(){var t=Ll;return Ll<<=1,(Ll&62914560)===0&&(Ll=4194304),t}function du(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function qa(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function z0(t,e,n,a,l,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var s=t.entanglements,g=t.expirationTimes,x=t.hiddenUpdates;for(n=u&~n;0<n;){var _=31-oe(n),R=1<<_;s[_]=0,g[_]=-1;var A=x[_];if(A!==null)for(x[_]=null,_=0;_<A.length;_++){var C=A[_];C!==null&&(C.lane&=-536870913)}n&=~R}a!==0&&ms(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function ms(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-oe(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function gs(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-oe(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function ps(t,e){var n=e&-e;return n=(n&42)!==0?1:hu(n),(n&(t.suspendedLanes|e))!==0?0:n}function hu(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function mu(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function ys(){var t=V.p;return t!==0?t:(t=window.event,t===void 0?32:lh(t.type))}function vs(t,e){var n=V.p;try{return V.p=t,e()}finally{V.p=n}}var an=Math.random().toString(36).slice(2),Kt="__reactFiber$"+an,ee="__reactProps$"+an,Wn="__reactContainer$"+an,gu="__reactEvents$"+an,D0="__reactListeners$"+an,k0="__reactHandles$"+an,bs="__reactResources$"+an,Ya="__reactMarker$"+an;function pu(t){delete t[Kt],delete t[ee],delete t[gu],delete t[D0],delete t[k0]}function $n(t){var e=t[Kt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[Kt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Gd(t);t!==null;){if(n=t[Kt])return n;t=Gd(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[Kt]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Ga(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(c(33))}function ta(t){var e=t[bs];return e||(e=t[bs]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Vt(t){t[Ya]=!0}var Ss=new Set,ws={};function zn(t,e){ea(t,e),ea(t+"Capture",e)}function ea(t,e){for(ws[t]=e,t=0;t<e.length;t++)Ss.add(e[t])}var O0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Es={},Ts={};function B0(t){return su.call(Ts,t)?!0:su.call(Es,t)?!1:O0.test(t)?Ts[t]=!0:(Es[t]=!0,!1)}function Yl(t,e,n){if(B0(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Gl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function Ue(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ve(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function xs(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function H0(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function yu(t){if(!t._valueTracker){var e=xs(t)?"checked":"value";t._valueTracker=H0(t,e,""+t[e])}}function As(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=xs(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Ql(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var U0=/[\n"\\]/g;function be(t){return t.replace(U0,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function vu(t,e,n,a,l,i,u,s){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ve(e)):t.value!==""+ve(e)&&(t.value=""+ve(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?bu(t,u,ve(e)):n!=null?bu(t,u,ve(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?t.name=""+ve(s):t.removeAttribute("name")}function Cs(t,e,n,a,l,i,u,s){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){yu(t);return}n=n!=null?""+ve(n):"",e=e!=null?""+ve(e):n,s||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=s?t.checked:!!a,t.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),yu(t)}function bu(t,e,n){e==="number"&&Ql(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function na(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ve(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function Ns(t,e,n){if(e!=null&&(e=""+ve(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ve(n):""}function _s(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(c(92));if(Lt(a)){if(1<a.length)throw Error(c(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ve(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),yu(t)}function aa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var j0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ms(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||j0.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Rs(t,e,n){if(e!=null&&typeof e!="object")throw Error(c(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&Ms(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&Ms(t,i,e[i])}function Su(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var L0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),q0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Xl(t){return q0.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function je(){}var wu=null;function Eu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var la=null,ia=null;function zs(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[ee]||null;t:switch(t=e.stateNode,e.type){case"input":if(vu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[ee]||null;if(!l)throw Error(c(90));vu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&As(a)}break t;case"textarea":Ns(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&na(t,!!n.multiple,e,!1)}}}var Tu=!1;function Ds(t,e,n){if(Tu)return t(e,n);Tu=!0;try{var a=t(e);return a}finally{if(Tu=!1,(la!==null||ia!==null)&&(zi(),la&&(e=la,t=ia,ia=la=null,zs(e),t)))for(e=0;e<t.length;e++)zs(t[e])}}function Qa(t,e){var n=t.stateNode;if(n===null)return null;var a=n[ee]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(c(231,e,typeof n));return n}var Le=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xu=!1;if(Le)try{var Xa={};Object.defineProperty(Xa,"passive",{get:function(){xu=!0}}),window.addEventListener("test",Xa,Xa),window.removeEventListener("test",Xa,Xa)}catch{xu=!1}var ln=null,Au=null,Vl=null;function ks(){if(Vl)return Vl;var t,e=Au,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var u=n-t;for(a=1;a<=u&&e[n-a]===l[i-a];a++);return Vl=l.slice(t,1<a?1-a:void 0)}function Zl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Kl(){return!0}function Os(){return!1}function ne(t){function e(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Kl:Os,this.isPropagationStopped=Os,this}return z(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Kl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Kl)},persist:function(){},isPersistent:Kl}),e}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=ne(Dn),Va=z({},Dn,{view:0,detail:0}),Y0=ne(Va),Cu,Nu,Za,Il=z({},Va,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Mu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Za&&(Za&&t.type==="mousemove"?(Cu=t.screenX-Za.screenX,Nu=t.screenY-Za.screenY):Nu=Cu=0,Za=t),Cu)},movementY:function(t){return"movementY"in t?t.movementY:Nu}}),Bs=ne(Il),G0=z({},Il,{dataTransfer:0}),Q0=ne(G0),X0=z({},Va,{relatedTarget:0}),_u=ne(X0),V0=z({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),Z0=ne(V0),K0=z({},Dn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),J0=ne(K0),I0=z({},Dn,{data:0}),Hs=ne(I0),F0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},W0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function P0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=$0[t])?!!e[t]:!1}function Mu(){return P0}var tm=z({},Va,{key:function(t){if(t.key){var e=F0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?W0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Mu,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),em=ne(tm),nm=z({},Il,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Us=ne(nm),am=z({},Va,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Mu}),lm=ne(am),im=z({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),um=ne(im),cm=z({},Il,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),rm=ne(cm),sm=z({},Dn,{newState:0,oldState:0}),om=ne(sm),fm=[9,13,27,32],Ru=Le&&"CompositionEvent"in window,Ka=null;Le&&"documentMode"in document&&(Ka=document.documentMode);var dm=Le&&"TextEvent"in window&&!Ka,js=Le&&(!Ru||Ka&&8<Ka&&11>=Ka),Ls=" ",qs=!1;function Ys(t,e){switch(t){case"keyup":return fm.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Gs(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ua=!1;function hm(t,e){switch(t){case"compositionend":return Gs(e);case"keypress":return e.which!==32?null:(qs=!0,Ls);case"textInput":return t=e.data,t===Ls&&qs?null:t;default:return null}}function mm(t,e){if(ua)return t==="compositionend"||!Ru&&Ys(t,e)?(t=ks(),Vl=Au=ln=null,ua=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return js&&e.locale!=="ko"?null:e.data;default:return null}}var gm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Qs(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!gm[t.type]:e==="textarea"}function Xs(t,e,n,a){la?ia?ia.push(a):ia=[a]:la=a,e=ji(e,"onChange"),0<e.length&&(n=new Jl("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Ja=null,Ia=null;function pm(t){_d(t,0)}function Fl(t){var e=Ga(t);if(As(e))return t}function Vs(t,e){if(t==="change")return e}var Zs=!1;if(Le){var zu;if(Le){var Du="oninput"in document;if(!Du){var Ks=document.createElement("div");Ks.setAttribute("oninput","return;"),Du=typeof Ks.oninput=="function"}zu=Du}else zu=!1;Zs=zu&&(!document.documentMode||9<document.documentMode)}function Js(){Ja&&(Ja.detachEvent("onpropertychange",Is),Ia=Ja=null)}function Is(t){if(t.propertyName==="value"&&Fl(Ia)){var e=[];Xs(e,Ia,t,Eu(t)),Ds(pm,e)}}function ym(t,e,n){t==="focusin"?(Js(),Ja=e,Ia=n,Ja.attachEvent("onpropertychange",Is)):t==="focusout"&&Js()}function vm(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Fl(Ia)}function bm(t,e){if(t==="click")return Fl(e)}function Sm(t,e){if(t==="input"||t==="change")return Fl(e)}function wm(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var fe=typeof Object.is=="function"?Object.is:wm;function Fa(t,e){if(fe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!su.call(e,l)||!fe(t[l],e[l]))return!1}return!0}function Fs(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ws(t,e){var n=Fs(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Fs(n)}}function $s(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?$s(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Ps(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Ql(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ql(t.document)}return e}function ku(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Em=Le&&"documentMode"in document&&11>=document.documentMode,ca=null,Ou=null,Wa=null,Bu=!1;function to(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Bu||ca==null||ca!==Ql(a)||(a=ca,"selectionStart"in a&&ku(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Wa&&Fa(Wa,a)||(Wa=a,a=ji(Ou,"onSelect"),0<a.length&&(e=new Jl("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=ca)))}function kn(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ra={animationend:kn("Animation","AnimationEnd"),animationiteration:kn("Animation","AnimationIteration"),animationstart:kn("Animation","AnimationStart"),transitionrun:kn("Transition","TransitionRun"),transitionstart:kn("Transition","TransitionStart"),transitioncancel:kn("Transition","TransitionCancel"),transitionend:kn("Transition","TransitionEnd")},Hu={},eo={};Le&&(eo=document.createElement("div").style,"AnimationEvent"in window||(delete ra.animationend.animation,delete ra.animationiteration.animation,delete ra.animationstart.animation),"TransitionEvent"in window||delete ra.transitionend.transition);function On(t){if(Hu[t])return Hu[t];if(!ra[t])return t;var e=ra[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in eo)return Hu[t]=e[n];return t}var no=On("animationend"),ao=On("animationiteration"),lo=On("animationstart"),Tm=On("transitionrun"),xm=On("transitionstart"),Am=On("transitioncancel"),io=On("transitionend"),uo=new Map,Uu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Uu.push("scrollEnd");function _e(t,e){uo.set(t,e),zn(e,[t])}var Wl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Se=[],sa=0,ju=0;function $l(){for(var t=sa,e=ju=sa=0;e<t;){var n=Se[e];Se[e++]=null;var a=Se[e];Se[e++]=null;var l=Se[e];Se[e++]=null;var i=Se[e];if(Se[e++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&co(n,l,i)}}function Pl(t,e,n,a){Se[sa++]=t,Se[sa++]=e,Se[sa++]=n,Se[sa++]=a,ju|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Lu(t,e,n,a){return Pl(t,e,n,a),ti(t)}function Bn(t,e){return Pl(t,null,null,e),ti(t)}function co(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-oe(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function ti(t){if(50<bl)throw bl=0,Jc=null,Error(c(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var oa={};function Cm(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function de(t,e,n,a){return new Cm(t,e,n,a)}function qu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function qe(t,e){var n=t.alternate;return n===null?(n=de(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function ro(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ei(t,e,n,a,l,i){var u=0;if(a=t,typeof t=="function")qu(t)&&(u=1);else if(typeof t=="string")u=zg(t,n,I.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case X:return t=de(31,n,e,l),t.elementType=X,t.lanes=i,t;case K:return Hn(n.children,l,i,e);case ct:u=8,l|=24;break;case H:return t=de(12,n,e,l|2),t.elementType=H,t.lanes=i,t;case ot:return t=de(13,n,e,l),t.elementType=ot,t.lanes=i,t;case Q:return t=de(19,n,e,l),t.elementType=Q,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case j:u=10;break t;case B:u=9;break t;case Z:u=11;break t;case q:u=14;break t;case L:u=16,a=null;break t}u=29,n=Error(c(130,t===null?"null":typeof t,"")),a=null}return e=de(u,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function Hn(t,e,n,a){return t=de(7,t,a,e),t.lanes=n,t}function Yu(t,e,n){return t=de(6,t,null,e),t.lanes=n,t}function so(t){var e=de(18,null,null,0);return e.stateNode=t,e}function Gu(t,e,n){return e=de(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var oo=new WeakMap;function we(t,e){if(typeof t=="object"&&t!==null){var n=oo.get(t);return n!==void 0?n:(e={value:t,source:e,stack:ss(e)},oo.set(t,e),e)}return{value:t,source:e,stack:ss(e)}}var fa=[],da=0,ni=null,$a=0,Ee=[],Te=0,un=null,ze=1,De="";function Ye(t,e){fa[da++]=$a,fa[da++]=ni,ni=t,$a=e}function fo(t,e,n){Ee[Te++]=ze,Ee[Te++]=De,Ee[Te++]=un,un=t;var a=ze;t=De;var l=32-oe(a)-1;a&=~(1<<l),n+=1;var i=32-oe(e)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,ze=1<<32-oe(e)+l|n<<l|a,De=i+t}else ze=1<<i|n<<l|a,De=t}function Qu(t){t.return!==null&&(Ye(t,1),fo(t,1,0))}function Xu(t){for(;t===ni;)ni=fa[--da],fa[da]=null,$a=fa[--da],fa[da]=null;for(;t===un;)un=Ee[--Te],Ee[Te]=null,De=Ee[--Te],Ee[Te]=null,ze=Ee[--Te],Ee[Te]=null}function ho(t,e){Ee[Te++]=ze,Ee[Te++]=De,Ee[Te++]=un,ze=e.id,De=e.overflow,un=t}var Jt=null,Dt=null,yt=!1,cn=null,xe=!1,Vu=Error(c(519));function rn(t){var e=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Pa(we(e,t)),Vu}function mo(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[Kt]=t,e[ee]=a,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<wl.length;n++)mt(wl[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),Cs(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),_s(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||Dd(e.textContent,n)?(a.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),a.onScroll!=null&&mt("scroll",e),a.onScrollEnd!=null&&mt("scrollend",e),a.onClick!=null&&(e.onclick=je),e=!0):e=!1,e||rn(t,!0)}function go(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:xe=!1;return;case 27:case 3:xe=!0;return;default:Jt=Jt.return}}function ha(t){if(t!==Jt)return!1;if(!yt)return go(t),yt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||sr(t.type,t.memoizedProps)),n=!n),n&&Dt&&rn(t),go(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Yd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));Dt=Yd(t)}else e===27?(e=Dt,En(t.type)?(t=mr,mr=null,Dt=t):Dt=e):Dt=Jt?Ce(t.stateNode.nextSibling):null;return!0}function Un(){Dt=Jt=null,yt=!1}function Zu(){var t=cn;return t!==null&&(ue===null?ue=t:ue.push.apply(ue,t),cn=null),t}function Pa(t){cn===null?cn=[t]:cn.push(t)}var Ku=S(null),jn=null,Ge=null;function sn(t,e,n){G(Ku,e._currentValue),e._currentValue=n}function Qe(t){t._currentValue=Ku.current,D(Ku)}function Ju(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Iu(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;t:for(;i!==null;){var s=i;i=l;for(var g=0;g<e.length;g++)if(s.context===e[g]){i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Ju(i.return,n,t),a||(u=null);break t}i=s.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(c(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Ju(u,n,t),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===t){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function ma(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(c(387));if(u=u.memoizedProps,u!==null){var s=l.type;fe(l.pendingProps.value,u.value)||(t!==null?t.push(s):t=[s])}}else if(l===dt.current){if(u=l.alternate,u===null)throw Error(c(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Cl):t=[Cl])}l=l.return}t!==null&&Iu(e,t,n,a),e.flags|=262144}function ai(t){for(t=t.firstContext;t!==null;){if(!fe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ln(t){jn=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function It(t){return po(jn,t)}function li(t,e){return jn===null&&Ln(t),po(t,e)}function po(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ge===null){if(t===null)throw Error(c(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return n}var Nm=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},_m=r.unstable_scheduleCallback,Mm=r.unstable_NormalPriority,qt={$$typeof:j,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Fu(){return{controller:new Nm,data:new Map,refCount:0}}function tl(t){t.refCount--,t.refCount===0&&_m(Mm,function(){t.controller.abort()})}var el=null,Wu=0,ga=0,pa=null;function Rm(t,e){if(el===null){var n=el=[];Wu=0,ga=tr(),pa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Wu++,e.then(yo,yo),e}function yo(){if(--Wu===0&&el!==null){pa!==null&&(pa.status="fulfilled");var t=el;el=null,ga=0,pa=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function zm(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var vo=N.S;N.S=function(t,e){nd=re(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Rm(t,e),vo!==null&&vo(t,e)};var qn=S(null);function $u(){var t=qn.current;return t!==null?t:Rt.pooledCache}function ii(t,e){e===null?G(qn,qn.current):G(qn,e.pool)}function bo(){var t=$u();return t===null?null:{parent:qt._currentValue,pool:t}}var ya=Error(c(460)),Pu=Error(c(474)),ui=Error(c(542)),ci={then:function(){}};function So(t){return t=t.status,t==="fulfilled"||t==="rejected"}function wo(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(je,je),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,To(t),t;default:if(typeof e.status=="string")e.then(je,je);else{if(t=Rt,t!==null&&100<t.shellSuspendCounter)throw Error(c(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,To(t),t}throw Gn=e,ya}}function Yn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gn=n,ya):n}}var Gn=null;function Eo(){if(Gn===null)throw Error(c(459));var t=Gn;return Gn=null,t}function To(t){if(t===ya||t===ui)throw Error(c(483))}var va=null,nl=0;function ri(t){var e=nl;return nl+=1,va===null&&(va=[]),wo(va,t,e)}function al(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function si(t,e){throw e.$$typeof===O?Error(c(525)):(t=Object.prototype.toString.call(e),Error(c(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function xo(t){function e(w,y){if(t){var T=w.deletions;T===null?(w.deletions=[y],w.flags|=16):T.push(y)}}function n(w,y){if(!t)return null;for(;y!==null;)e(w,y),y=y.sibling;return null}function a(w){for(var y=new Map;w!==null;)w.key!==null?y.set(w.key,w):y.set(w.index,w),w=w.sibling;return y}function l(w,y){return w=qe(w,y),w.index=0,w.sibling=null,w}function i(w,y,T){return w.index=T,t?(T=w.alternate,T!==null?(T=T.index,T<y?(w.flags|=67108866,y):T):(w.flags|=67108866,y)):(w.flags|=1048576,y)}function u(w){return t&&w.alternate===null&&(w.flags|=67108866),w}function s(w,y,T,M){return y===null||y.tag!==6?(y=Yu(T,w.mode,M),y.return=w,y):(y=l(y,T),y.return=w,y)}function g(w,y,T,M){var tt=T.type;return tt===K?_(w,y,T.props.children,M,T.key):y!==null&&(y.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===L&&Yn(tt)===y.type)?(y=l(y,T.props),al(y,T),y.return=w,y):(y=ei(T.type,T.key,T.props,null,w.mode,M),al(y,T),y.return=w,y)}function x(w,y,T,M){return y===null||y.tag!==4||y.stateNode.containerInfo!==T.containerInfo||y.stateNode.implementation!==T.implementation?(y=Gu(T,w.mode,M),y.return=w,y):(y=l(y,T.children||[]),y.return=w,y)}function _(w,y,T,M,tt){return y===null||y.tag!==7?(y=Hn(T,w.mode,M,tt),y.return=w,y):(y=l(y,T),y.return=w,y)}function R(w,y,T){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return y=Yu(""+y,w.mode,T),y.return=w,y;if(typeof y=="object"&&y!==null){switch(y.$$typeof){case U:return T=ei(y.type,y.key,y.props,null,w.mode,T),al(T,y),T.return=w,T;case Y:return y=Gu(y,w.mode,T),y.return=w,y;case L:return y=Yn(y),R(w,y,T)}if(Lt(y)||F(y))return y=Hn(y,w.mode,T,null),y.return=w,y;if(typeof y.then=="function")return R(w,ri(y),T);if(y.$$typeof===j)return R(w,li(w,y),T);si(w,y)}return null}function A(w,y,T,M){var tt=y!==null?y.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return tt!==null?null:s(w,y,""+T,M);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case U:return T.key===tt?g(w,y,T,M):null;case Y:return T.key===tt?x(w,y,T,M):null;case L:return T=Yn(T),A(w,y,T,M)}if(Lt(T)||F(T))return tt!==null?null:_(w,y,T,M,null);if(typeof T.then=="function")return A(w,y,ri(T),M);if(T.$$typeof===j)return A(w,y,li(w,T),M);si(w,T)}return null}function C(w,y,T,M,tt){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return w=w.get(T)||null,s(y,w,""+M,tt);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case U:return w=w.get(M.key===null?T:M.key)||null,g(y,w,M,tt);case Y:return w=w.get(M.key===null?T:M.key)||null,x(y,w,M,tt);case L:return M=Yn(M),C(w,y,T,M,tt)}if(Lt(M)||F(M))return w=w.get(T)||null,_(y,w,M,tt,null);if(typeof M.then=="function")return C(w,y,T,ri(M),tt);if(M.$$typeof===j)return C(w,y,T,li(y,M),tt);si(y,M)}return null}function J(w,y,T,M){for(var tt=null,bt=null,W=y,st=y=0,pt=null;W!==null&&st<T.length;st++){W.index>st?(pt=W,W=null):pt=W.sibling;var St=A(w,W,T[st],M);if(St===null){W===null&&(W=pt);break}t&&W&&St.alternate===null&&e(w,W),y=i(St,y,st),bt===null?tt=St:bt.sibling=St,bt=St,W=pt}if(st===T.length)return n(w,W),yt&&Ye(w,st),tt;if(W===null){for(;st<T.length;st++)W=R(w,T[st],M),W!==null&&(y=i(W,y,st),bt===null?tt=W:bt.sibling=W,bt=W);return yt&&Ye(w,st),tt}for(W=a(W);st<T.length;st++)pt=C(W,w,st,T[st],M),pt!==null&&(t&&pt.alternate!==null&&W.delete(pt.key===null?st:pt.key),y=i(pt,y,st),bt===null?tt=pt:bt.sibling=pt,bt=pt);return t&&W.forEach(function(Nn){return e(w,Nn)}),yt&&Ye(w,st),tt}function at(w,y,T,M){if(T==null)throw Error(c(151));for(var tt=null,bt=null,W=y,st=y=0,pt=null,St=T.next();W!==null&&!St.done;st++,St=T.next()){W.index>st?(pt=W,W=null):pt=W.sibling;var Nn=A(w,W,St.value,M);if(Nn===null){W===null&&(W=pt);break}t&&W&&Nn.alternate===null&&e(w,W),y=i(Nn,y,st),bt===null?tt=Nn:bt.sibling=Nn,bt=Nn,W=pt}if(St.done)return n(w,W),yt&&Ye(w,st),tt;if(W===null){for(;!St.done;st++,St=T.next())St=R(w,St.value,M),St!==null&&(y=i(St,y,st),bt===null?tt=St:bt.sibling=St,bt=St);return yt&&Ye(w,st),tt}for(W=a(W);!St.done;st++,St=T.next())St=C(W,w,st,St.value,M),St!==null&&(t&&St.alternate!==null&&W.delete(St.key===null?st:St.key),y=i(St,y,st),bt===null?tt=St:bt.sibling=St,bt=St);return t&&W.forEach(function(Gg){return e(w,Gg)}),yt&&Ye(w,st),tt}function Mt(w,y,T,M){if(typeof T=="object"&&T!==null&&T.type===K&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case U:t:{for(var tt=T.key;y!==null;){if(y.key===tt){if(tt=T.type,tt===K){if(y.tag===7){n(w,y.sibling),M=l(y,T.props.children),M.return=w,w=M;break t}}else if(y.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===L&&Yn(tt)===y.type){n(w,y.sibling),M=l(y,T.props),al(M,T),M.return=w,w=M;break t}n(w,y);break}else e(w,y);y=y.sibling}T.type===K?(M=Hn(T.props.children,w.mode,M,T.key),M.return=w,w=M):(M=ei(T.type,T.key,T.props,null,w.mode,M),al(M,T),M.return=w,w=M)}return u(w);case Y:t:{for(tt=T.key;y!==null;){if(y.key===tt)if(y.tag===4&&y.stateNode.containerInfo===T.containerInfo&&y.stateNode.implementation===T.implementation){n(w,y.sibling),M=l(y,T.children||[]),M.return=w,w=M;break t}else{n(w,y);break}else e(w,y);y=y.sibling}M=Gu(T,w.mode,M),M.return=w,w=M}return u(w);case L:return T=Yn(T),Mt(w,y,T,M)}if(Lt(T))return J(w,y,T,M);if(F(T)){if(tt=F(T),typeof tt!="function")throw Error(c(150));return T=tt.call(T),at(w,y,T,M)}if(typeof T.then=="function")return Mt(w,y,ri(T),M);if(T.$$typeof===j)return Mt(w,y,li(w,T),M);si(w,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,y!==null&&y.tag===6?(n(w,y.sibling),M=l(y,T),M.return=w,w=M):(n(w,y),M=Yu(T,w.mode,M),M.return=w,w=M),u(w)):n(w,y)}return function(w,y,T,M){try{nl=0;var tt=Mt(w,y,T,M);return va=null,tt}catch(W){if(W===ya||W===ui)throw W;var bt=de(29,W,null,w.mode);return bt.lanes=M,bt.return=w,bt}finally{}}}var Qn=xo(!0),Ao=xo(!1),on=!1;function tc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ec(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(Et&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=ti(t),co(t,null,n),e}return Pl(t,a,e,n),ti(t)}function ll(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,gs(t,n)}}function nc(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var ac=!1;function il(){if(ac){var t=pa;if(t!==null)throw t}}function ul(t,e,n,a){ac=!1;var l=t.updateQueue;on=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var g=s,x=g.next;g.next=null,u===null?i=x:u.next=x,u=g;var _=t.alternate;_!==null&&(_=_.updateQueue,s=_.lastBaseUpdate,s!==u&&(s===null?_.firstBaseUpdate=x:s.next=x,_.lastBaseUpdate=g))}if(i!==null){var R=l.baseState;u=0,_=x=g=null,s=i;do{var A=s.lane&-536870913,C=A!==s.lane;if(C?(gt&A)===A:(a&A)===A){A!==0&&A===ga&&(ac=!0),_!==null&&(_=_.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});t:{var J=t,at=s;A=e;var Mt=n;switch(at.tag){case 1:if(J=at.payload,typeof J=="function"){R=J.call(Mt,R,A);break t}R=J;break t;case 3:J.flags=J.flags&-65537|128;case 0:if(J=at.payload,A=typeof J=="function"?J.call(Mt,R,A):J,A==null)break t;R=z({},R,A);break t;case 2:on=!0}}A=s.callback,A!==null&&(t.flags|=64,C&&(t.flags|=8192),C=l.callbacks,C===null?l.callbacks=[A]:C.push(A))}else C={lane:A,tag:s.tag,payload:s.payload,callback:s.callback,next:null},_===null?(x=_=C,g=R):_=_.next=C,u|=A;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;C=s,s=C.next,C.next=null,l.lastBaseUpdate=C,l.shared.pending=null}}while(!0);_===null&&(g=R),l.baseState=g,l.firstBaseUpdate=x,l.lastBaseUpdate=_,i===null&&(l.shared.lanes=0),yn|=u,t.lanes=u,t.memoizedState=R}}function Co(t,e){if(typeof t!="function")throw Error(c(191,t));t.call(e)}function No(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)Co(n[t],e)}var ba=S(null),oi=S(0);function _o(t,e){t=$e,G(oi,t),G(ba,e),$e=t|e.baseLanes}function lc(){G(oi,$e),G(ba,ba.current)}function ic(){$e=oi.current,D(ba),D(oi)}var he=S(null),Ae=null;function hn(t){var e=t.alternate;G(Ut,Ut.current&1),G(he,t),Ae===null&&(e===null||ba.current!==null||e.memoizedState!==null)&&(Ae=t)}function uc(t){G(Ut,Ut.current),G(he,t),Ae===null&&(Ae=t)}function Mo(t){t.tag===22?(G(Ut,Ut.current),G(he,t),Ae===null&&(Ae=t)):mn()}function mn(){G(Ut,Ut.current),G(he,he.current)}function me(t){D(he),Ae===t&&(Ae=null),D(Ut)}var Ut=S(0);function fi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||dr(n)||hr(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xe=0,rt=null,Nt=null,Yt=null,di=!1,Sa=!1,Xn=!1,hi=0,cl=0,wa=null,Dm=0;function Bt(){throw Error(c(321))}function cc(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!fe(t[n],e[n]))return!1;return!0}function rc(t,e,n,a,l,i){return Xe=i,rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,N.H=t===null||t.memoizedState===null?hf:Tc,Xn=!1,i=n(a,l),Xn=!1,Sa&&(i=zo(e,n,a,l)),Ro(t),i}function Ro(t){N.H=ol;var e=Nt!==null&&Nt.next!==null;if(Xe=0,Yt=Nt=rt=null,di=!1,cl=0,wa=null,e)throw Error(c(300));t===null||Gt||(t=t.dependencies,t!==null&&ai(t)&&(Gt=!0))}function zo(t,e,n,a){rt=t;var l=0;do{if(Sa&&(wa=null),cl=0,Sa=!1,25<=l)throw Error(c(301));if(l+=1,Yt=Nt=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}N.H=mf,i=e(n,a)}while(Sa);return i}function km(){var t=N.H,e=t.useState()[0];return e=typeof e.then=="function"?rl(e):e,t=t.useState()[0],(Nt!==null?Nt.memoizedState:null)!==t&&(rt.flags|=1024),e}function sc(){var t=hi!==0;return hi=0,t}function oc(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function fc(t){if(di){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}di=!1}Xe=0,Yt=Nt=rt=null,Sa=!1,cl=hi=0,wa=null}function te(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Yt===null?rt.memoizedState=Yt=t:Yt=Yt.next=t,Yt}function jt(){if(Nt===null){var t=rt.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=Yt===null?rt.memoizedState:Yt.next;if(e!==null)Yt=e,Nt=t;else{if(t===null)throw rt.alternate===null?Error(c(467)):Error(c(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},Yt===null?rt.memoizedState=Yt=t:Yt=Yt.next=t}return Yt}function mi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function rl(t){var e=cl;return cl+=1,wa===null&&(wa=[]),t=wo(wa,t,e),e=rt,(Yt===null?e.memoizedState:Yt.next)===null&&(e=e.alternate,N.H=e===null||e.memoizedState===null?hf:Tc),t}function gi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return rl(t);if(t.$$typeof===j)return It(t)}throw Error(c(438,String(t)))}function dc(t){var e=null,n=rt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=rt.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=mi(),rt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=et;return e.index++,n}function Ve(t,e){return typeof e=="function"?e(t):e}function pi(t){var e=jt();return hc(e,Nt,t)}function hc(t,e,n){var a=t.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var s=u=null,g=null,x=e,_=!1;do{var R=x.lane&-536870913;if(R!==x.lane?(gt&R)===R:(Xe&R)===R){var A=x.revertLane;if(A===0)g!==null&&(g=g.next={lane:0,revertLane:0,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),R===ga&&(_=!0);else if((Xe&A)===A){x=x.next,A===ga&&(_=!0);continue}else R={lane:0,revertLane:x.revertLane,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},g===null?(s=g=R,u=i):g=g.next=R,rt.lanes|=A,yn|=A;R=x.action,Xn&&n(i,R),i=x.hasEagerState?x.eagerState:n(i,R)}else A={lane:R,revertLane:x.revertLane,gesture:x.gesture,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},g===null?(s=g=A,u=i):g=g.next=A,rt.lanes|=R,yn|=R;x=x.next}while(x!==null&&x!==e);if(g===null?u=i:g.next=s,!fe(i,t.memoizedState)&&(Gt=!0,_&&(n=pa,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=g,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function mc(t){var e=jt(),n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=t(i,u.action),u=u.next;while(u!==l);fe(i,e.memoizedState)||(Gt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function Do(t,e,n){var a=rt,l=jt(),i=yt;if(i){if(n===void 0)throw Error(c(407));n=n()}else n=e();var u=!fe((Nt||l).memoizedState,n);if(u&&(l.memoizedState=n,Gt=!0),l=l.queue,yc(Bo.bind(null,a,l,t),[t]),l.getSnapshot!==e||u||Yt!==null&&Yt.memoizedState.tag&1){if(a.flags|=2048,Ea(9,{destroy:void 0},Oo.bind(null,a,l,n,e),null),Rt===null)throw Error(c(349));i||(Xe&127)!==0||ko(a,e,n)}return n}function ko(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=rt.updateQueue,e===null?(e=mi(),rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Oo(t,e,n,a){e.value=n,e.getSnapshot=a,Ho(e)&&Uo(t)}function Bo(t,e,n){return n(function(){Ho(e)&&Uo(t)})}function Ho(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!fe(t,n)}catch{return!0}}function Uo(t){var e=Bn(t,2);e!==null&&ce(e,t,2)}function gc(t){var e=te();if(typeof t=="function"){var n=t;if(t=n(),Xn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:t},e}function jo(t,e,n,a){return t.baseState=n,hc(t,Nt,typeof a=="function"?a:Ve)}function Om(t,e,n,a,l){if(bi(t))throw Error(c(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};N.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,Lo(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Lo(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=N.T,u={};N.T=u;try{var s=n(l,a),g=N.S;g!==null&&g(u,s),qo(t,e,s)}catch(x){pc(t,e,x)}finally{i!==null&&u.types!==null&&(i.types=u.types),N.T=i}}else try{i=n(l,a),qo(t,e,i)}catch(x){pc(t,e,x)}}function qo(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Yo(t,e,a)},function(a){return pc(t,e,a)}):Yo(t,e,n)}function Yo(t,e,n){e.status="fulfilled",e.value=n,Go(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Lo(t,n)))}function pc(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,Go(e),e=e.next;while(e!==a)}t.action=null}function Go(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Qo(t,e){return e}function Xo(t,e){if(yt){var n=Rt.formState;if(n!==null){t:{var a=rt;if(yt){if(Dt){e:{for(var l=Dt,i=xe;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ce(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){Dt=Ce(l.nextSibling),a=l.data==="F!";break t}}rn(a)}a=!1}a&&(e=n[0])}}return n=te(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qo,lastRenderedState:e},n.queue=a,n=of.bind(null,rt,a),a.dispatch=n,a=gc(!1),i=Ec.bind(null,rt,!1,a.queue),a=te(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=Om.bind(null,rt,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Vo(t){var e=jt();return Zo(e,Nt,t)}function Zo(t,e,n){if(e=hc(t,e,Qo)[0],t=pi(Ve)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=rl(e)}catch(u){throw u===ya?ui:u}else a=e;e=jt();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(rt.flags|=2048,Ea(9,{destroy:void 0},Bm.bind(null,l,n),null)),[a,i,t]}function Bm(t,e){t.action=e}function Ko(t){var e=jt(),n=Nt;if(n!==null)return Zo(e,n,t);jt(),e=e.memoizedState,n=jt();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function Ea(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=rt.updateQueue,e===null&&(e=mi(),rt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Jo(){return jt().memoizedState}function yi(t,e,n,a){var l=te();rt.flags|=t,l.memoizedState=Ea(1|e,{destroy:void 0},n,a===void 0?null:a)}function vi(t,e,n,a){var l=jt();a=a===void 0?null:a;var i=l.memoizedState.inst;Nt!==null&&a!==null&&cc(a,Nt.memoizedState.deps)?l.memoizedState=Ea(e,i,n,a):(rt.flags|=t,l.memoizedState=Ea(1|e,i,n,a))}function Io(t,e){yi(8390656,8,t,e)}function yc(t,e){vi(2048,8,t,e)}function Hm(t){rt.flags|=4;var e=rt.updateQueue;if(e===null)e=mi(),rt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Fo(t){var e=jt().memoizedState;return Hm({ref:e,nextImpl:t}),function(){if((Et&2)!==0)throw Error(c(440));return e.impl.apply(void 0,arguments)}}function Wo(t,e){return vi(4,2,t,e)}function $o(t,e){return vi(4,4,t,e)}function Po(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function tf(t,e,n){n=n!=null?n.concat([t]):null,vi(4,4,Po.bind(null,e,t),n)}function vc(){}function ef(t,e){var n=jt();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&cc(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function nf(t,e){var n=jt();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&cc(e,a[1]))return a[0];if(a=t(),Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function bc(t,e,n){return n===void 0||(Xe&1073741824)!==0&&(gt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=ld(),rt.lanes|=t,yn|=t,n)}function af(t,e,n,a){return fe(n,e)?n:ba.current!==null?(t=bc(t,n,a),fe(t,e)||(Gt=!0),t):(Xe&42)===0||(Xe&1073741824)!==0&&(gt&261930)===0?(Gt=!0,t.memoizedState=n):(t=ld(),rt.lanes|=t,yn|=t,e)}function lf(t,e,n,a,l){var i=V.p;V.p=i!==0&&8>i?i:8;var u=N.T,s={};N.T=s,Ec(t,!1,e,n);try{var g=l(),x=N.S;if(x!==null&&x(s,g),g!==null&&typeof g=="object"&&typeof g.then=="function"){var _=zm(g,a);sl(t,e,_,ye(t))}else sl(t,e,a,ye(t))}catch(R){sl(t,e,{then:function(){},status:"rejected",reason:R},ye())}finally{V.p=i,u!==null&&s.types!==null&&(u.types=s.types),N.T=u}}function Um(){}function Sc(t,e,n,a){if(t.tag!==5)throw Error(c(476));var l=uf(t).queue;lf(t,l,e,nt,n===null?Um:function(){return cf(t),n(a)})}function uf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:nt,baseState:nt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:nt},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ve,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function cf(t){var e=uf(t);e.next===null&&(e=t.alternate.memoizedState),sl(t,e.next.queue,{},ye())}function wc(){return It(Cl)}function rf(){return jt().memoizedState}function sf(){return jt().memoizedState}function jm(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var a=dn(e,t,n);a!==null&&(ce(a,e,n),ll(a,e,n)),e={cache:Fu()},t.payload=e;return}e=e.return}}function Lm(t,e,n){var a=ye();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},bi(t)?ff(e,n):(n=Lu(t,e,n,a),n!==null&&(ce(n,t,a),df(n,e,a)))}function of(t,e,n){var a=ye();sl(t,e,n,a)}function sl(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(bi(t))ff(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,s=i(u,n);if(l.hasEagerState=!0,l.eagerState=s,fe(s,u))return Pl(t,e,l,0),Rt===null&&$l(),!1}catch{}finally{}if(n=Lu(t,e,l,a),n!==null)return ce(n,t,a),df(n,e,a),!0}return!1}function Ec(t,e,n,a){if(a={lane:2,revertLane:tr(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},bi(t)){if(e)throw Error(c(479))}else e=Lu(t,n,a,2),e!==null&&ce(e,t,2)}function bi(t){var e=t.alternate;return t===rt||e!==null&&e===rt}function ff(t,e){Sa=di=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function df(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,gs(t,n)}}var ol={readContext:It,use:gi,useCallback:Bt,useContext:Bt,useEffect:Bt,useImperativeHandle:Bt,useLayoutEffect:Bt,useInsertionEffect:Bt,useMemo:Bt,useReducer:Bt,useRef:Bt,useState:Bt,useDebugValue:Bt,useDeferredValue:Bt,useTransition:Bt,useSyncExternalStore:Bt,useId:Bt,useHostTransitionStatus:Bt,useFormState:Bt,useActionState:Bt,useOptimistic:Bt,useMemoCache:Bt,useCacheRefresh:Bt};ol.useEffectEvent=Bt;var hf={readContext:It,use:gi,useCallback:function(t,e){return te().memoizedState=[t,e===void 0?null:e],t},useContext:It,useEffect:Io,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,yi(4194308,4,Po.bind(null,e,t),n)},useLayoutEffect:function(t,e){return yi(4194308,4,t,e)},useInsertionEffect:function(t,e){yi(4,2,t,e)},useMemo:function(t,e){var n=te();e=e===void 0?null:e;var a=t();if(Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=te();if(n!==void 0){var l=n(e);if(Xn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=Lm.bind(null,rt,t),[a.memoizedState,t]},useRef:function(t){var e=te();return t={current:t},e.memoizedState=t},useState:function(t){t=gc(t);var e=t.queue,n=of.bind(null,rt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:vc,useDeferredValue:function(t,e){var n=te();return bc(n,t,e)},useTransition:function(){var t=gc(!1);return t=lf.bind(null,rt,t.queue,!0,!1),te().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=rt,l=te();if(yt){if(n===void 0)throw Error(c(407));n=n()}else{if(n=e(),Rt===null)throw Error(c(349));(gt&127)!==0||ko(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,Io(Bo.bind(null,a,i,t),[t]),a.flags|=2048,Ea(9,{destroy:void 0},Oo.bind(null,a,i,n,e),null),n},useId:function(){var t=te(),e=Rt.identifierPrefix;if(yt){var n=De,a=ze;n=(a&~(1<<32-oe(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=hi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Dm++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:wc,useFormState:Xo,useActionState:Xo,useOptimistic:function(t){var e=te();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Ec.bind(null,rt,!0,n),n.dispatch=e,[t,e]},useMemoCache:dc,useCacheRefresh:function(){return te().memoizedState=jm.bind(null,rt)},useEffectEvent:function(t){var e=te(),n={impl:t};return e.memoizedState=n,function(){if((Et&2)!==0)throw Error(c(440));return n.impl.apply(void 0,arguments)}}},Tc={readContext:It,use:gi,useCallback:ef,useContext:It,useEffect:yc,useImperativeHandle:tf,useInsertionEffect:Wo,useLayoutEffect:$o,useMemo:nf,useReducer:pi,useRef:Jo,useState:function(){return pi(Ve)},useDebugValue:vc,useDeferredValue:function(t,e){var n=jt();return af(n,Nt.memoizedState,t,e)},useTransition:function(){var t=pi(Ve)[0],e=jt().memoizedState;return[typeof t=="boolean"?t:rl(t),e]},useSyncExternalStore:Do,useId:rf,useHostTransitionStatus:wc,useFormState:Vo,useActionState:Vo,useOptimistic:function(t,e){var n=jt();return jo(n,Nt,t,e)},useMemoCache:dc,useCacheRefresh:sf};Tc.useEffectEvent=Fo;var mf={readContext:It,use:gi,useCallback:ef,useContext:It,useEffect:yc,useImperativeHandle:tf,useInsertionEffect:Wo,useLayoutEffect:$o,useMemo:nf,useReducer:mc,useRef:Jo,useState:function(){return mc(Ve)},useDebugValue:vc,useDeferredValue:function(t,e){var n=jt();return Nt===null?bc(n,t,e):af(n,Nt.memoizedState,t,e)},useTransition:function(){var t=mc(Ve)[0],e=jt().memoizedState;return[typeof t=="boolean"?t:rl(t),e]},useSyncExternalStore:Do,useId:rf,useHostTransitionStatus:wc,useFormState:Ko,useActionState:Ko,useOptimistic:function(t,e){var n=jt();return Nt!==null?jo(n,Nt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:dc,useCacheRefresh:sf};mf.useEffectEvent=Fo;function xc(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:z({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ac={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(ce(e,t,a),ll(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(ce(e,t,a),ll(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(ce(e,t,n),ll(e,t,n))}};function gf(t,e,n,a,l,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,u):e.prototype&&e.prototype.isPureReactComponent?!Fa(n,a)||!Fa(l,i):!0}function pf(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&Ac.enqueueReplaceState(e,e.state,null)}function Vn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=z({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function yf(t){Wl(t)}function vf(t){console.error(t)}function bf(t){Wl(t)}function Si(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function Sf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Cc(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){Si(t,e)},n}function wf(t){return t=fn(t),t.tag=3,t}function Ef(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){Sf(e,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){Sf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var s=a.stack;this.componentDidCatch(a.value,{componentStack:s!==null?s:""})})}function qm(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&ma(e,n,l,!0),n=he.current,n!==null){switch(n.tag){case 31:case 13:return Ae===null?Di():n.alternate===null&&Ht===0&&(Ht=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===ci?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Wc(t,a,l)),!1;case 22:return n.flags|=65536,a===ci?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Wc(t,a,l)),!1}throw Error(c(435,n.tag))}return Wc(t,a,l),Di(),!1}if(yt)return e=he.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Vu&&(t=Error(c(422),{cause:a}),Pa(we(t,n)))):(a!==Vu&&(e=Error(c(423),{cause:a}),Pa(we(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=we(a,n),l=Cc(t.stateNode,a,l),nc(t,l),Ht!==4&&(Ht=2)),!1;var i=Error(c(520),{cause:a});if(i=we(i,n),vl===null?vl=[i]:vl.push(i),Ht!==4&&(Ht=2),e===null)return!0;a=we(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=Cc(n.stateNode,a,t),nc(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=wf(l),Ef(l,t,n,a),nc(n,l),!1}n=n.return}while(n!==null);return!1}var Nc=Error(c(461)),Gt=!1;function Ft(t,e,n,a){e.child=t===null?Ao(e,null,n,a):Qn(e,t.child,n,a)}function Tf(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var u={};for(var s in a)s!=="ref"&&(u[s]=a[s])}else u=a;return Ln(e),a=rc(t,e,n,u,i,l),s=sc(),t!==null&&!Gt?(oc(t,e,l),Ze(t,e,l)):(yt&&s&&Qu(e),e.flags|=1,Ft(t,e,a,l),e.child)}function xf(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!qu(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,Af(t,e,i,a,l)):(t=ei(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Bc(t,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Fa,n(u,a)&&t.ref===e.ref)return Ze(t,e,l)}return e.flags|=1,t=qe(i,a),t.ref=e.ref,t.return=e,e.child=t}function Af(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if(Fa(i,a)&&t.ref===e.ref)if(Gt=!1,e.pendingProps=a=i,Bc(t,l))(t.flags&131072)!==0&&(Gt=!0);else return e.lanes=t.lanes,Ze(t,e,l)}return _c(t,e,n,a,l)}function Cf(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return Nf(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&ii(e,i!==null?i.cachePool:null),i!==null?_o(e,i):lc(),Mo(e);else return a=e.lanes=536870912,Nf(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(ii(e,i.cachePool),_o(e,i),mn(),e.memoizedState=null):(t!==null&&ii(e,null),lc(),mn());return Ft(t,e,l,n),e.child}function fl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Nf(t,e,n,a,l){var i=$u();return i=i===null?null:{parent:qt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&ii(e,null),lc(),Mo(e),t!==null&&ma(t,e,a,!0),e.childLanes=l,null}function wi(t,e){return e=Ti({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function _f(t,e,n){return Qn(e,t.child,null,n),t=wi(e,e.pendingProps),t.flags|=2,me(e),e.memoizedState=null,t}function Ym(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(yt){if(a.mode==="hidden")return t=wi(e,a),e.lanes=536870912,fl(null,t);if(uc(e),(t=Dt)?(t=qd(t,xe),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:ze,overflow:De}:null,retryLane:536870912,hydrationErrors:null},n=so(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw rn(e);return e.lanes=536870912,null}return wi(e,a)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(uc(e),l)if(e.flags&256)e.flags&=-257,e=_f(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(c(558));else if(Gt||ma(t,e,n,!1),l=(n&t.childLanes)!==0,Gt||l){if(a=Rt,a!==null&&(u=ps(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Bn(t,u),ce(a,t,u),Nc;Di(),e=_f(t,e,n)}else t=i.treeContext,Dt=Ce(u.nextSibling),Jt=e,yt=!0,cn=null,xe=!1,t!==null&&ho(e,t),e=wi(e,a),e.flags|=4096;return e}return t=qe(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ei(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(c(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function _c(t,e,n,a,l){return Ln(e),n=rc(t,e,n,a,void 0,l),a=sc(),t!==null&&!Gt?(oc(t,e,l),Ze(t,e,l)):(yt&&a&&Qu(e),e.flags|=1,Ft(t,e,n,l),e.child)}function Mf(t,e,n,a,l,i){return Ln(e),e.updateQueue=null,n=zo(e,a,n,l),Ro(t),a=sc(),t!==null&&!Gt?(oc(t,e,i),Ze(t,e,i)):(yt&&a&&Qu(e),e.flags|=1,Ft(t,e,n,i),e.child)}function Rf(t,e,n,a,l){if(Ln(e),e.stateNode===null){var i=oa,u=n.contextType;typeof u=="object"&&u!==null&&(i=It(u)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ac,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},tc(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?It(u):oa,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(xc(e,n,u,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Ac.enqueueReplaceState(i,i.state,null),ul(e,a,i,l),il(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var s=e.memoizedProps,g=Vn(n,s);i.props=g;var x=i.context,_=n.contextType;u=oa,typeof _=="object"&&_!==null&&(u=It(_));var R=n.getDerivedStateFromProps;_=typeof R=="function"||typeof i.getSnapshotBeforeUpdate=="function",s=e.pendingProps!==s,_||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s||x!==u)&&pf(e,i,a,u),on=!1;var A=e.memoizedState;i.state=A,ul(e,a,i,l),il(),x=e.memoizedState,s||A!==x||on?(typeof R=="function"&&(xc(e,n,R,a),x=e.memoizedState),(g=on||gf(e,n,g,a,A,x,u))?(_||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=x),i.props=a,i.state=x,i.context=u,a=g):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,ec(t,e),u=e.memoizedProps,_=Vn(n,u),i.props=_,R=e.pendingProps,A=i.context,x=n.contextType,g=oa,typeof x=="object"&&x!==null&&(g=It(x)),s=n.getDerivedStateFromProps,(x=typeof s=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==R||A!==g)&&pf(e,i,a,g),on=!1,A=e.memoizedState,i.state=A,ul(e,a,i,l),il();var C=e.memoizedState;u!==R||A!==C||on||t!==null&&t.dependencies!==null&&ai(t.dependencies)?(typeof s=="function"&&(xc(e,n,s,a),C=e.memoizedState),(_=on||gf(e,n,_,a,A,C,g)||t!==null&&t.dependencies!==null&&ai(t.dependencies))?(x||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,C,g),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,C,g)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=C),i.props=a,i.state=C,i.context=g,a=_):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,Ei(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Qn(e,t.child,null,l),e.child=Qn(e,null,n,l)):Ft(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ze(t,e,l),t}function zf(t,e,n,a){return Un(),e.flags|=256,Ft(t,e,n,a),e.child}var Mc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Rc(t){return{baseLanes:t,cachePool:bo()}}function zc(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pe),t}function Df(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(Ut.current&2)!==0),u&&(l=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(yt){if(l?hn(e):mn(),(t=Dt)?(t=qd(t,xe),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:ze,overflow:De}:null,retryLane:536870912,hydrationErrors:null},n=so(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw rn(e);return hr(t)?e.lanes=32:e.lanes=536870912,null}var s=a.children;return a=a.fallback,l?(mn(),l=e.mode,s=Ti({mode:"hidden",children:s},l),a=Hn(a,l,n,null),s.return=e,a.return=e,s.sibling=a,e.child=s,a=e.child,a.memoizedState=Rc(n),a.childLanes=zc(t,u,n),e.memoizedState=Mc,fl(null,a)):(hn(e),Dc(e,s))}var g=t.memoizedState;if(g!==null&&(s=g.dehydrated,s!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=kc(t,e,n)):e.memoizedState!==null?(mn(),e.child=t.child,e.flags|=128,e=null):(mn(),s=a.fallback,l=e.mode,a=Ti({mode:"visible",children:a.children},l),s=Hn(s,l,n,null),s.flags|=2,a.return=e,s.return=e,a.sibling=s,e.child=a,Qn(e,t.child,null,n),a=e.child,a.memoizedState=Rc(n),a.childLanes=zc(t,u,n),e.memoizedState=Mc,e=fl(null,a));else if(hn(e),hr(s)){if(u=s.nextSibling&&s.nextSibling.dataset,u)var x=u.dgst;u=x,a=Error(c(419)),a.stack="",a.digest=u,Pa({value:a,source:null,stack:null}),e=kc(t,e,n)}else if(Gt||ma(t,e,n,!1),u=(n&t.childLanes)!==0,Gt||u){if(u=Rt,u!==null&&(a=ps(u,n),a!==0&&a!==g.retryLane))throw g.retryLane=a,Bn(t,a),ce(u,t,a),Nc;dr(s)||Di(),e=kc(t,e,n)}else dr(s)?(e.flags|=192,e.child=t.child,e=null):(t=g.treeContext,Dt=Ce(s.nextSibling),Jt=e,yt=!0,cn=null,xe=!1,t!==null&&ho(e,t),e=Dc(e,a.children),e.flags|=4096);return e}return l?(mn(),s=a.fallback,l=e.mode,g=t.child,x=g.sibling,a=qe(g,{mode:"hidden",children:a.children}),a.subtreeFlags=g.subtreeFlags&65011712,x!==null?s=qe(x,s):(s=Hn(s,l,n,null),s.flags|=2),s.return=e,a.return=e,a.sibling=s,e.child=a,fl(null,a),a=e.child,s=t.child.memoizedState,s===null?s=Rc(n):(l=s.cachePool,l!==null?(g=qt._currentValue,l=l.parent!==g?{parent:g,pool:g}:l):l=bo(),s={baseLanes:s.baseLanes|n,cachePool:l}),a.memoizedState=s,a.childLanes=zc(t,u,n),e.memoizedState=Mc,fl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=qe(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function Dc(t,e){return e=Ti({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ti(t,e){return t=de(22,t,null,e),t.lanes=0,t}function kc(t,e,n){return Qn(e,t.child,null,n),t=Dc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function kf(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Ju(t.return,e,n)}function Oc(t,e,n,a,l,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function Of(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=Ut.current,s=(u&2)!==0;if(s?(u=u&1|2,e.flags|=128):u&=1,G(Ut,u),Ft(t,e,a,n),a=yt?$a:0,!s&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&kf(t,n,e);else if(t.tag===19)kf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&fi(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),Oc(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&fi(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}Oc(e,!0,n,null,i,a);break;case"together":Oc(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ma(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(c(153));if(e.child!==null){for(t=e.child,n=qe(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=qe(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Bc(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ai(t)))}function Gm(t,e,n){switch(e.tag){case 3:zt(e,e.stateNode.containerInfo),sn(e,qt,t.memoizedState.cache),Un();break;case 27:case 5:He(e);break;case 4:zt(e,e.stateNode.containerInfo);break;case 10:sn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,uc(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Df(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(ma(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return Of(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),G(Ut,Ut.current),a)break;return null;case 22:return e.lanes=0,Cf(t,e,n,e.pendingProps);case 24:sn(e,qt,t.memoizedState.cache)}return Ze(t,e,n)}function Bf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Gt=!0;else{if(!Bc(t,n)&&(e.flags&128)===0)return Gt=!1,Gm(t,e,n);Gt=(t.flags&131072)!==0}else Gt=!1,yt&&(e.flags&1048576)!==0&&fo(e,$a,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=Yn(e.elementType),e.type=t,typeof t=="function")qu(t)?(a=Vn(t,a),e.tag=1,e=Rf(null,e,t,a,n)):(e.tag=0,e=_c(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===Z){e.tag=11,e=Tf(null,e,t,a,n);break t}else if(l===q){e.tag=14,e=xf(null,e,t,a,n);break t}}throw e=lt(t)||t,Error(c(306,e,""))}}return e;case 0:return _c(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Vn(a,e.pendingProps),Rf(t,e,a,l,n);case 3:t:{if(zt(e,e.stateNode.containerInfo),t===null)throw Error(c(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,ec(t,e),ul(e,a,null,n);var u=e.memoizedState;if(a=u.cache,sn(e,qt,a),a!==i.cache&&Iu(e,[qt],n,!0),il(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=zf(t,e,a,n);break t}else if(a!==l){l=we(Error(c(424)),e),Pa(l),e=zf(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Dt=Ce(t.firstChild),Jt=e,yt=!0,cn=null,xe=!0,n=Ao(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Un(),a===l){e=Ze(t,e,n);break t}Ft(t,e,a,n)}e=e.child}return e;case 26:return Ei(t,e),t===null?(n=Zd(e.type,null,e.pendingProps,null))?e.memoizedState=n:yt||(n=e.type,t=e.pendingProps,a=Li(ft.current).createElement(n),a[Kt]=e,a[ee]=t,Wt(a,n,t),Vt(a),e.stateNode=a):e.memoizedState=Zd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return He(e),t===null&&yt&&(a=e.stateNode=Qd(e.type,e.pendingProps,ft.current),Jt=e,xe=!0,l=Dt,En(e.type)?(mr=l,Dt=Ce(a.firstChild)):Dt=l),Ft(t,e,e.pendingProps.children,n),Ei(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&yt&&((l=a=Dt)&&(a=vg(a,e.type,e.pendingProps,xe),a!==null?(e.stateNode=a,Jt=e,Dt=Ce(a.firstChild),xe=!1,l=!0):l=!1),l||rn(e)),He(e),l=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,a=i.children,sr(l,i)?a=null:u!==null&&sr(l,u)&&(e.flags|=32),e.memoizedState!==null&&(l=rc(t,e,km,null,null,n),Cl._currentValue=l),Ei(t,e),Ft(t,e,a,n),e.child;case 6:return t===null&&yt&&((t=n=Dt)&&(n=bg(n,e.pendingProps,xe),n!==null?(e.stateNode=n,Jt=e,Dt=null,t=!0):t=!1),t||rn(e)),null;case 13:return Df(t,e,n);case 4:return zt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Qn(e,null,a,n):Ft(t,e,a,n),e.child;case 11:return Tf(t,e,e.type,e.pendingProps,n);case 7:return Ft(t,e,e.pendingProps,n),e.child;case 8:return Ft(t,e,e.pendingProps.children,n),e.child;case 12:return Ft(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,sn(e,e.type,a.value),Ft(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,Ln(e),l=It(l),a=a(l),e.flags|=1,Ft(t,e,a,n),e.child;case 14:return xf(t,e,e.type,e.pendingProps,n);case 15:return Af(t,e,e.type,e.pendingProps,n);case 19:return Of(t,e,n);case 31:return Ym(t,e,n);case 22:return Cf(t,e,n,e.pendingProps);case 24:return Ln(e),a=It(qt),t===null?(l=$u(),l===null&&(l=Rt,i=Fu(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},tc(e),sn(e,qt,l)):((t.lanes&n)!==0&&(ec(t,e),ul(e,null,null,n),il()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),sn(e,qt,a)):(a=i.cache,sn(e,qt,a),a!==l.cache&&Iu(e,[qt],n,!0))),Ft(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(c(156,e.tag))}function Ke(t){t.flags|=4}function Hc(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(rd())t.flags|=8192;else throw Gn=ci,Pu}else t.flags&=-16777217}function Hf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Wd(e))if(rd())t.flags|=8192;else throw Gn=ci,Pu}function xi(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?hs():536870912,t.lanes|=e,Ca|=e)}function dl(t,e){if(!yt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function kt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Qm(t,e,n){var a=e.pendingProps;switch(Xu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return kt(e),null;case 1:return kt(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Qe(qt),Ct(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ha(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Zu())),kt(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(kt(e),Hf(e,i)):(kt(e),Hc(e,l,null,a,n))):i?i!==t.memoizedState?(Ke(e),kt(e),Hf(e,i)):(kt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ke(e),kt(e),Hc(e,l,t,a,n)),null;case 27:if(Bl(e),n=ft.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(c(166));return kt(e),null}t=I.current,ha(e)?mo(e):(t=Qd(l,a,n),e.stateNode=t,Ke(e))}return kt(e),null;case 5:if(Bl(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(c(166));return kt(e),null}if(i=I.current,ha(e))mo(e);else{var u=Li(ft.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[Kt]=e,i[ee]=a;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch(Wt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ke(e)}}return kt(e),Hc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(c(166));if(t=ft.current,ha(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Jt,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[Kt]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Dd(t.nodeValue,n)),t||rn(e,!0)}else t=Li(t).createTextNode(a),t[Kt]=e,e.stateNode=t}return kt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ha(e),n!==null){if(t===null){if(!a)throw Error(c(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(557));t[Kt]=e}else Un(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;kt(e),t=!1}else n=Zu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(me(e),e):(me(e),null);if((e.flags&128)!==0)throw Error(c(558))}return kt(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ha(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(c(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(c(317));l[Kt]=e}else Un(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;kt(e),l=!1}else l=Zu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(me(e),e):(me(e),null)}return me(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),xi(e,e.updateQueue),kt(e),null);case 4:return Ct(),t===null&&lr(e.stateNode.containerInfo),kt(e),null;case 10:return Qe(e.type),kt(e),null;case 19:if(D(Ut),a=e.memoizedState,a===null)return kt(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)dl(a,!1);else{if(Ht!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=fi(t),i!==null){for(e.flags|=128,dl(a,!1),t=i.updateQueue,e.updateQueue=t,xi(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)ro(n,t),n=n.sibling;return G(Ut,Ut.current&1|2),yt&&Ye(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&re()>Mi&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304)}else{if(!l)if(t=fi(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,xi(e,t),dl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!yt)return kt(e),null}else 2*re()-a.renderingStartTime>Mi&&n!==536870912&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=re(),t.sibling=null,n=Ut.current,G(Ut,l?n&1|2:n&1),yt&&Ye(e,a.treeForkCount),t):(kt(e),null);case 22:case 23:return me(e),ic(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(kt(e),e.subtreeFlags&6&&(e.flags|=8192)):kt(e),n=e.updateQueue,n!==null&&xi(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&D(qn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Qe(qt),kt(e),null;case 25:return null;case 30:return null}throw Error(c(156,e.tag))}function Xm(t,e){switch(Xu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Qe(qt),Ct(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Bl(e),null;case 31:if(e.memoizedState!==null){if(me(e),e.alternate===null)throw Error(c(340));Un()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(me(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(c(340));Un()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return D(Ut),null;case 4:return Ct(),null;case 10:return Qe(e.type),null;case 22:case 23:return me(e),ic(),t!==null&&D(qn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Qe(qt),null;case 25:return null;default:return null}}function Uf(t,e){switch(Xu(e),e.tag){case 3:Qe(qt),Ct();break;case 26:case 27:case 5:Bl(e);break;case 4:Ct();break;case 31:e.memoizedState!==null&&me(e);break;case 13:me(e);break;case 19:D(Ut);break;case 10:Qe(e.type);break;case 22:case 23:me(e),ic(),t!==null&&D(qn);break;case 24:Qe(qt)}}function hl(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(s){At(e,e.return,s)}}function gn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var u=a.inst,s=u.destroy;if(s!==void 0){u.destroy=void 0,l=e;var g=n,x=s;try{x()}catch(_){At(l,g,_)}}}a=a.next}while(a!==i)}}catch(_){At(e,e.return,_)}}function jf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{No(e,n)}catch(a){At(t,t.return,a)}}}function Lf(t,e,n){n.props=Vn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){At(t,e,a)}}function ml(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){At(t,e,l)}}function ke(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){At(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){At(t,e,l)}else n.current=null}function qf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){At(t,t.return,l)}}function Uc(t,e,n){try{var a=t.stateNode;dg(a,t.type,n,e),a[ee]=e}catch(l){At(t,t.return,l)}}function Yf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&En(t.type)||t.tag===4}function jc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Yf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&En(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Lc(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=je));else if(a!==4&&(a===27&&En(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Lc(t,e,n),t=t.sibling;t!==null;)Lc(t,e,n),t=t.sibling}function Ai(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&En(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ai(t,e,n),t=t.sibling;t!==null;)Ai(t,e,n),t=t.sibling}function Gf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);Wt(e,a,n),e[Kt]=t,e[ee]=n}catch(i){At(t,t.return,i)}}var Je=!1,Qt=!1,qc=!1,Qf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function Vm(t,e){if(t=t.containerInfo,cr=Zi,t=Ps(t),ku(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,s=-1,g=-1,x=0,_=0,R=t,A=null;e:for(;;){for(var C;R!==n||l!==0&&R.nodeType!==3||(s=u+l),R!==i||a!==0&&R.nodeType!==3||(g=u+a),R.nodeType===3&&(u+=R.nodeValue.length),(C=R.firstChild)!==null;)A=R,R=C;for(;;){if(R===t)break e;if(A===n&&++x===l&&(s=u),A===i&&++_===a&&(g=u),(C=R.nextSibling)!==null)break;R=A,A=R.parentNode}R=C}n=s===-1||g===-1?null:{start:s,end:g}}else n=null}n=n||{start:0,end:0}}else n=null;for(rr={focusedElem:t,selectionRange:n},Zi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var J=Vn(n.type,l);t=a.getSnapshotBeforeUpdate(J,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(at){At(n,n.return,at)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)fr(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":fr(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(c(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function Xf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Fe(t,n),a&4&&hl(5,n);break;case 1:if(Fe(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){At(n,n.return,u)}else{var l=Vn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){At(n,n.return,u)}}a&64&&jf(n),a&512&&ml(n,n.return);break;case 3:if(Fe(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{No(t,e)}catch(u){At(n,n.return,u)}}break;case 27:e===null&&a&4&&Gf(n);case 26:case 5:Fe(t,n),e===null&&a&4&&qf(n),a&512&&ml(n,n.return);break;case 12:Fe(t,n);break;case 31:Fe(t,n),a&4&&Kf(t,n);break;case 13:Fe(t,n),a&4&&Jf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=tg.bind(null,n),Sg(t,n))));break;case 22:if(a=n.memoizedState!==null||Je,!a){e=e!==null&&e.memoizedState!==null||Qt,l=Je;var i=Qt;Je=a,(Qt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Fe(t,n),Je=l,Qt=i}break;case 30:break;default:Fe(t,n)}}function Vf(t){var e=t.alternate;e!==null&&(t.alternate=null,Vf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&pu(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Ot=null,ae=!1;function Ie(t,e,n){for(n=n.child;n!==null;)Zf(t,e,n),n=n.sibling}function Zf(t,e,n){if(se&&typeof se.onCommitFiberUnmount=="function")try{se.onCommitFiberUnmount(ja,n)}catch{}switch(n.tag){case 26:Qt||ke(n,e),Ie(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qt||ke(n,e);var a=Ot,l=ae;En(n.type)&&(Ot=n.stateNode,ae=!1),Ie(t,e,n),Tl(n.stateNode),Ot=a,ae=l;break;case 5:Qt||ke(n,e);case 6:if(a=Ot,l=ae,Ot=null,Ie(t,e,n),Ot=a,ae=l,Ot!==null)if(ae)try{(Ot.nodeType===9?Ot.body:Ot.nodeName==="HTML"?Ot.ownerDocument.body:Ot).removeChild(n.stateNode)}catch(i){At(n,e,i)}else try{Ot.removeChild(n.stateNode)}catch(i){At(n,e,i)}break;case 18:Ot!==null&&(ae?(t=Ot,jd(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Oa(t)):jd(Ot,n.stateNode));break;case 4:a=Ot,l=ae,Ot=n.stateNode.containerInfo,ae=!0,Ie(t,e,n),Ot=a,ae=l;break;case 0:case 11:case 14:case 15:gn(2,n,e),Qt||gn(4,n,e),Ie(t,e,n);break;case 1:Qt||(ke(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Lf(n,e,a)),Ie(t,e,n);break;case 21:Ie(t,e,n);break;case 22:Qt=(a=Qt)||n.memoizedState!==null,Ie(t,e,n),Qt=a;break;default:Ie(t,e,n)}}function Kf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Oa(t)}catch(n){At(e,e.return,n)}}}function Jf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Oa(t)}catch(n){At(e,e.return,n)}}function Zm(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Qf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Qf),e;default:throw Error(c(435,t.tag))}}function Ci(t,e){var n=Zm(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=eg.bind(null,t,a);a.then(l,l)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,u=e,s=u;t:for(;s!==null;){switch(s.tag){case 27:if(En(s.type)){Ot=s.stateNode,ae=!1;break t}break;case 5:Ot=s.stateNode,ae=!1;break t;case 3:case 4:Ot=s.stateNode.containerInfo,ae=!0;break t}s=s.return}if(Ot===null)throw Error(c(160));Zf(i,u,l),Ot=null,ae=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)If(e,t),e=e.sibling}var Me=null;function If(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ie(t),a&4&&(gn(3,t,t.return),hl(3,t),gn(5,t,t.return));break;case 1:le(e,t),ie(t),a&512&&(Qt||n===null||ke(n,n.return)),a&64&&Je&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Me;if(le(e,t),ie(t),a&512&&(Qt||n===null||ke(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Ya]||i[Kt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),Wt(i,a,n),i[Kt]=t,Vt(i),a=i;break t;case"link":var u=Id("link","href",l).get(a+(n.href||""));if(u){for(var s=0;s<u.length;s++)if(i=u[s],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(s,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;case"meta":if(u=Id("meta","content",l).get(a+(n.content||""))){for(s=0;s<u.length;s++)if(i=u[s],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(s,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;default:throw Error(c(468,a))}i[Kt]=t,Vt(i),a=i}t.stateNode=a}else Fd(l,t.type,t.stateNode);else t.stateNode=Jd(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Fd(l,t.type,t.stateNode):Jd(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Uc(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ie(t),a&512&&(Qt||n===null||ke(n,n.return)),n!==null&&a&4&&Uc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ie(t),a&512&&(Qt||n===null||ke(n,n.return)),t.flags&32){l=t.stateNode;try{aa(l,"")}catch(J){At(t,t.return,J)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,Uc(t,l,n!==null?n.memoizedProps:l)),a&1024&&(qc=!0);break;case 6:if(le(e,t),ie(t),a&4){if(t.stateNode===null)throw Error(c(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(J){At(t,t.return,J)}}break;case 3:if(Gi=null,l=Me,Me=qi(e.containerInfo),le(e,t),Me=l,ie(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Oa(e.containerInfo)}catch(J){At(t,t.return,J)}qc&&(qc=!1,Ff(t));break;case 4:a=Me,Me=qi(t.stateNode.containerInfo),le(e,t),ie(t),Me=a;break;case 12:le(e,t),ie(t);break;case 31:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 13:le(e,t),ie(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(_i=re()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 22:l=t.memoizedState!==null;var g=n!==null&&n.memoizedState!==null,x=Je,_=Qt;if(Je=x||l,Qt=_||g,le(e,t),Qt=_,Je=x,ie(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||g||Je||Qt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){g=n=e;try{if(i=g.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{s=g.stateNode;var R=g.memoizedProps.style,A=R!=null&&R.hasOwnProperty("display")?R.display:null;s.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(J){At(g,g.return,J)}}}else if(e.tag===6){if(n===null){g=e;try{g.stateNode.nodeValue=l?"":g.memoizedProps}catch(J){At(g,g.return,J)}}}else if(e.tag===18){if(n===null){g=e;try{var C=g.stateNode;l?Ld(C,!0):Ld(g.stateNode,!1)}catch(J){At(g,g.return,J)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ci(t,n))));break;case 19:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 30:break;case 21:break;default:le(e,t),ie(t)}}function ie(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(Yf(a)){n=a;break}a=a.return}if(n==null)throw Error(c(160));switch(n.tag){case 27:var l=n.stateNode,i=jc(t);Ai(t,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(aa(u,""),n.flags&=-33);var s=jc(t);Ai(t,s,u);break;case 3:case 4:var g=n.stateNode.containerInfo,x=jc(t);Lc(t,x,g);break;default:throw Error(c(161))}}catch(_){At(t,t.return,_)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Ff(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Ff(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Fe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Xf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:gn(4,e,e.return),Zn(e);break;case 1:ke(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Lf(e,e.return,n),Zn(e);break;case 27:Tl(e.stateNode);case 26:case 5:ke(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(l,i,n),hl(4,i);break;case 1:if(We(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(x){At(a,a.return,x)}if(a=i,l=a.updateQueue,l!==null){var s=a.stateNode;try{var g=l.shared.hiddenCallbacks;if(g!==null)for(l.shared.hiddenCallbacks=null,l=0;l<g.length;l++)Co(g[l],s)}catch(x){At(a,a.return,x)}}n&&u&64&&jf(i),ml(i,i.return);break;case 27:Gf(i);case 26:case 5:We(l,i,n),n&&a===null&&u&4&&qf(i),ml(i,i.return);break;case 12:We(l,i,n);break;case 31:We(l,i,n),n&&u&4&&Kf(l,i);break;case 13:We(l,i,n),n&&u&4&&Jf(l,i);break;case 22:i.memoizedState===null&&We(l,i,n),ml(i,i.return);break;case 30:break;default:We(l,i,n)}e=e.sibling}}function Yc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&tl(n))}function Gc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t))}function Re(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Wf(t,e,n,a),e=e.sibling}function Wf(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:Re(t,e,n,a),l&2048&&hl(9,e);break;case 1:Re(t,e,n,a);break;case 3:Re(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t)));break;case 12:if(l&2048){Re(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,s=i.onPostCommit;typeof s=="function"&&s(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(g){At(e,e.return,g)}}else Re(t,e,n,a);break;case 31:Re(t,e,n,a);break;case 13:Re(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?Re(t,e,n,a):gl(t,e):i._visibility&2?Re(t,e,n,a):(i._visibility|=2,Ta(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&Yc(u,e);break;case 24:Re(t,e,n,a),l&2048&&Gc(e.alternate,e);break;default:Re(t,e,n,a)}}function Ta(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,s=n,g=a,x=u.flags;switch(u.tag){case 0:case 11:case 15:Ta(i,u,s,g,l),hl(8,u);break;case 23:break;case 22:var _=u.stateNode;u.memoizedState!==null?_._visibility&2?Ta(i,u,s,g,l):gl(i,u):(_._visibility|=2,Ta(i,u,s,g,l)),l&&x&2048&&Yc(u.alternate,u);break;case 24:Ta(i,u,s,g,l),l&&x&2048&&Gc(u.alternate,u);break;default:Ta(i,u,s,g,l)}e=e.sibling}}function gl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:gl(n,a),l&2048&&Yc(a.alternate,a);break;case 24:gl(n,a),l&2048&&Gc(a.alternate,a);break;default:gl(n,a)}e=e.sibling}}var pl=8192;function xa(t,e,n){if(t.subtreeFlags&pl)for(t=t.child;t!==null;)$f(t,e,n),t=t.sibling}function $f(t,e,n){switch(t.tag){case 26:xa(t,e,n),t.flags&pl&&t.memoizedState!==null&&Dg(n,Me,t.memoizedState,t.memoizedProps);break;case 5:xa(t,e,n);break;case 3:case 4:var a=Me;Me=qi(t.stateNode.containerInfo),xa(t,e,n),Me=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=pl,pl=16777216,xa(t,e,n),pl=a):xa(t,e,n));break;default:xa(t,e,n)}}function Pf(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function yl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,ed(a,t)}Pf(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)td(t),t=t.sibling}function td(t){switch(t.tag){case 0:case 11:case 15:yl(t),t.flags&2048&&gn(9,t,t.return);break;case 3:yl(t);break;case 12:yl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ni(t)):yl(t);break;default:yl(t)}}function Ni(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,ed(a,t)}Pf(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:gn(8,e,e.return),Ni(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ni(e));break;default:Ni(e)}t=t.sibling}}function ed(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:gn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:tl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Zt=a;else t:for(n=t;Zt!==null;){a=Zt;var l=a.sibling,i=a.return;if(Vf(a),a===n){Zt=null;break t}if(l!==null){l.return=i,Zt=l;break t}Zt=i}}}var Km={getCacheForType:function(t){var e=It(qt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return It(qt).controller.signal}},Jm=typeof WeakMap=="function"?WeakMap:Map,Et=0,Rt=null,ht=null,gt=0,xt=0,ge=null,pn=!1,Aa=!1,Qc=!1,$e=0,Ht=0,yn=0,Kn=0,Xc=0,pe=0,Ca=0,vl=null,ue=null,Vc=!1,_i=0,nd=0,Mi=1/0,Ri=null,vn=null,Xt=0,bn=null,Na=null,Pe=0,Zc=0,Kc=null,ad=null,bl=0,Jc=null;function ye(){return(Et&2)!==0&&gt!==0?gt&-gt:N.T!==null?tr():ys()}function ld(){if(pe===0)if((gt&536870912)===0||yt){var t=jl;jl<<=1,(jl&3932160)===0&&(jl=262144),pe=t}else pe=536870912;return t=he.current,t!==null&&(t.flags|=32),pe}function ce(t,e,n){(t===Rt&&(xt===2||xt===9)||t.cancelPendingCommit!==null)&&(_a(t,0),Sn(t,gt,pe,!1)),qa(t,n),((Et&2)===0||t!==Rt)&&(t===Rt&&((Et&2)===0&&(Kn|=n),Ht===4&&Sn(t,gt,pe,!1)),Oe(t))}function id(t,e,n){if((Et&6)!==0)throw Error(c(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||La(t,e),l=a?Wm(t,e):Fc(t,e,!0),i=a;do{if(l===0){Aa&&!a&&Sn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!Im(n)){l=Fc(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var s=t;l=vl;var g=s.current.memoizedState.isDehydrated;if(g&&(_a(s,u).flags|=256),u=Fc(s,u,!1),u!==2){if(Qc&&!g){s.errorRecoveryDisabledLanes|=i,Kn|=i,l=4;break t}i=ue,ue=l,i!==null&&(ue===null?ue=i:ue.push.apply(ue,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){_a(t,0),Sn(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(c(345));case 4:if((e&4194048)!==e)break;case 6:Sn(a,e,pe,!pn);break t;case 2:ue=null;break;case 3:case 5:break;default:throw Error(c(329))}if((e&62914560)===e&&(l=_i+300-re(),10<l)){if(Sn(a,e,pe,!pn),ql(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=Hd(ud.bind(null,a,n,ue,Ri,Vc,e,pe,Kn,Ca,pn,i,"Throttled",-0,0),l);break t}ud(a,n,ue,Ri,Vc,e,pe,Kn,Ca,pn,i,null,-0,0)}}break}while(!0);Oe(t)}function ud(t,e,n,a,l,i,u,s,g,x,_,R,A,C){if(t.timeoutHandle=-1,R=e.subtreeFlags,R&8192||(R&16785408)===16785408){R={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:je},$f(e,i,R);var J=(i&62914560)===i?_i-re():(i&4194048)===i?nd-re():0;if(J=kg(R,J),J!==null){Pe=i,t.cancelPendingCommit=J(md.bind(null,t,e,i,n,a,l,u,s,g,_,R,null,A,C)),Sn(t,i,u,!x);return}}md(t,e,i,n,a,l,u,s,g)}function Im(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!fe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Sn(t,e,n,a){e&=~Xc,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-oe(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&ms(t,n,e)}function zi(){return(Et&6)===0?(Sl(0),!1):!0}function Ic(){if(ht!==null){if(xt===0)var t=ht.return;else t=ht,Ge=jn=null,fc(t),va=null,nl=0,t=ht;for(;t!==null;)Uf(t.alternate,t),t=t.return;ht=null}}function _a(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,gg(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Ic(),Rt=t,ht=n=qe(t.current,null),gt=e,xt=0,ge=null,pn=!1,Aa=La(t,e),Qc=!1,Ca=pe=Xc=Kn=yn=Ht=0,ue=vl=null,Vc=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-oe(a),i=1<<l;e|=t[l],a&=~i}return $e=e,$l(),n}function cd(t,e){rt=null,N.H=ol,e===ya||e===ui?(e=Eo(),xt=3):e===Pu?(e=Eo(),xt=4):xt=e===Nc?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,ge=e,ht===null&&(Ht=1,Si(t,we(e,t.current)))}function rd(){var t=he.current;return t===null?!0:(gt&4194048)===gt?Ae===null:(gt&62914560)===gt||(gt&536870912)!==0?t===Ae:!1}function sd(){var t=N.H;return N.H=ol,t===null?ol:t}function od(){var t=N.A;return N.A=Km,t}function Di(){Ht=4,pn||(gt&4194048)!==gt&&he.current!==null||(Aa=!0),(yn&134217727)===0&&(Kn&134217727)===0||Rt===null||Sn(Rt,gt,pe,!1)}function Fc(t,e,n){var a=Et;Et|=2;var l=sd(),i=od();(Rt!==t||gt!==e)&&(Ri=null,_a(t,e)),e=!1;var u=Ht;t:do try{if(xt!==0&&ht!==null){var s=ht,g=ge;switch(xt){case 8:Ic(),u=6;break t;case 3:case 2:case 9:case 6:he.current===null&&(e=!0);var x=xt;if(xt=0,ge=null,Ma(t,s,g,x),n&&Aa){u=0;break t}break;default:x=xt,xt=0,ge=null,Ma(t,s,g,x)}}Fm(),u=Ht;break}catch(_){cd(t,_)}while(!0);return e&&t.shellSuspendCounter++,Ge=jn=null,Et=a,N.H=l,N.A=i,ht===null&&(Rt=null,gt=0,$l()),u}function Fm(){for(;ht!==null;)fd(ht)}function Wm(t,e){var n=Et;Et|=2;var a=sd(),l=od();Rt!==t||gt!==e?(Ri=null,Mi=re()+500,_a(t,e)):Aa=La(t,e);t:do try{if(xt!==0&&ht!==null){e=ht;var i=ge;e:switch(xt){case 1:xt=0,ge=null,Ma(t,e,i,1);break;case 2:case 9:if(So(i)){xt=0,ge=null,dd(e);break}e=function(){xt!==2&&xt!==9||Rt!==t||(xt=7),Oe(t)},i.then(e,e);break t;case 3:xt=7;break t;case 4:xt=5;break t;case 7:So(i)?(xt=0,ge=null,dd(e)):(xt=0,ge=null,Ma(t,e,i,7));break;case 5:var u=null;switch(ht.tag){case 26:u=ht.memoizedState;case 5:case 27:var s=ht;if(u?Wd(u):s.stateNode.complete){xt=0,ge=null;var g=s.sibling;if(g!==null)ht=g;else{var x=s.return;x!==null?(ht=x,ki(x)):ht=null}break e}}xt=0,ge=null,Ma(t,e,i,5);break;case 6:xt=0,ge=null,Ma(t,e,i,6);break;case 8:Ic(),Ht=6;break t;default:throw Error(c(462))}}$m();break}catch(_){cd(t,_)}while(!0);return Ge=jn=null,N.H=a,N.A=l,Et=n,ht!==null?0:(Rt=null,gt=0,$l(),Ht)}function $m(){for(;ht!==null&&!w0();)fd(ht)}function fd(t){var e=Bf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?ki(t):ht=e}function dd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Mf(n,e,e.pendingProps,e.type,void 0,gt);break;case 11:e=Mf(n,e,e.pendingProps,e.type.render,e.ref,gt);break;case 5:fc(e);default:Uf(n,e),e=ht=ro(e,$e),e=Bf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?ki(t):ht=e}function Ma(t,e,n,a){Ge=jn=null,fc(e),va=null,nl=0;var l=e.return;try{if(qm(t,l,e,n,gt)){Ht=1,Si(t,we(n,t.current)),ht=null;return}}catch(i){if(l!==null)throw ht=l,i;Ht=1,Si(t,we(n,t.current)),ht=null;return}e.flags&32768?(yt||a===1?t=!0:Aa||(gt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=he.current,a!==null&&a.tag===13&&(a.flags|=16384))),hd(e,t)):ki(e)}function ki(t){var e=t;do{if((e.flags&32768)!==0){hd(e,pn);return}t=e.return;var n=Qm(e.alternate,e,$e);if(n!==null){ht=n;return}if(e=e.sibling,e!==null){ht=e;return}ht=e=t}while(e!==null);Ht===0&&(Ht=5)}function hd(t,e){do{var n=Xm(t.alternate,t);if(n!==null){n.flags&=32767,ht=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){ht=t;return}ht=t=n}while(t!==null);Ht=6,ht=null}function md(t,e,n,a,l,i,u,s,g){t.cancelPendingCommit=null;do Oi();while(Xt!==0);if((Et&6)!==0)throw Error(c(327));if(e!==null){if(e===t.current)throw Error(c(177));if(i=e.lanes|e.childLanes,i|=ju,z0(t,n,i,u,s,g),t===Rt&&(ht=Rt=null,gt=0),Na=e,bn=t,Pe=n,Zc=i,Kc=l,ad=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,ng(Hl,function(){return bd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=N.T,N.T=null,l=V.p,V.p=2,u=Et,Et|=4;try{Vm(t,e,n)}finally{Et=u,V.p=l,N.T=a}}Xt=1,gd(),pd(),yd()}}function gd(){if(Xt===1){Xt=0;var t=bn,e=Na,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=N.T,N.T=null;var a=V.p;V.p=2;var l=Et;Et|=4;try{If(e,t);var i=rr,u=Ps(t.containerInfo),s=i.focusedElem,g=i.selectionRange;if(u!==s&&s&&s.ownerDocument&&$s(s.ownerDocument.documentElement,s)){if(g!==null&&ku(s)){var x=g.start,_=g.end;if(_===void 0&&(_=x),"selectionStart"in s)s.selectionStart=x,s.selectionEnd=Math.min(_,s.value.length);else{var R=s.ownerDocument||document,A=R&&R.defaultView||window;if(A.getSelection){var C=A.getSelection(),J=s.textContent.length,at=Math.min(g.start,J),Mt=g.end===void 0?at:Math.min(g.end,J);!C.extend&&at>Mt&&(u=Mt,Mt=at,at=u);var w=Ws(s,at),y=Ws(s,Mt);if(w&&y&&(C.rangeCount!==1||C.anchorNode!==w.node||C.anchorOffset!==w.offset||C.focusNode!==y.node||C.focusOffset!==y.offset)){var T=R.createRange();T.setStart(w.node,w.offset),C.removeAllRanges(),at>Mt?(C.addRange(T),C.extend(y.node,y.offset)):(T.setEnd(y.node,y.offset),C.addRange(T))}}}}for(R=[],C=s;C=C.parentNode;)C.nodeType===1&&R.push({element:C,left:C.scrollLeft,top:C.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<R.length;s++){var M=R[s];M.element.scrollLeft=M.left,M.element.scrollTop=M.top}}Zi=!!cr,rr=cr=null}finally{Et=l,V.p=a,N.T=n}}t.current=e,Xt=2}}function pd(){if(Xt===2){Xt=0;var t=bn,e=Na,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=N.T,N.T=null;var a=V.p;V.p=2;var l=Et;Et|=4;try{Xf(t,e.alternate,e)}finally{Et=l,V.p=a,N.T=n}}Xt=3}}function yd(){if(Xt===4||Xt===3){Xt=0,E0();var t=bn,e=Na,n=Pe,a=ad;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Xt=5:(Xt=0,Na=bn=null,vd(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),mu(n),e=e.stateNode,se&&typeof se.onCommitFiberRoot=="function")try{se.onCommitFiberRoot(ja,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=N.T,l=V.p,V.p=2,N.T=null;try{for(var i=t.onRecoverableError,u=0;u<a.length;u++){var s=a[u];i(s.value,{componentStack:s.stack})}}finally{N.T=e,V.p=l}}(Pe&3)!==0&&Oi(),Oe(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Jc?bl++:(bl=0,Jc=t):bl=0,Sl(0)}}function vd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,tl(e)))}function Oi(){return gd(),pd(),yd(),bd()}function bd(){if(Xt!==5)return!1;var t=bn,e=Zc;Zc=0;var n=mu(Pe),a=N.T,l=V.p;try{V.p=32>n?32:n,N.T=null,n=Kc,Kc=null;var i=bn,u=Pe;if(Xt=0,Na=bn=null,Pe=0,(Et&6)!==0)throw Error(c(331));var s=Et;if(Et|=4,td(i.current),Wf(i,i.current,u,n),Et=s,Sl(0,!1),se&&typeof se.onPostCommitFiberRoot=="function")try{se.onPostCommitFiberRoot(ja,i)}catch{}return!0}finally{V.p=l,N.T=a,vd(t,e)}}function Sd(t,e,n){e=we(n,e),e=Cc(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(qa(t,2),Oe(t))}function At(t,e,n){if(t.tag===3)Sd(t,t,n);else for(;e!==null;){if(e.tag===3){Sd(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=we(n,t),n=wf(2),a=dn(e,n,2),a!==null&&(Ef(n,a,e,t),qa(a,2),Oe(a));break}}e=e.return}}function Wc(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new Jm;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Qc=!0,l.add(n),t=Pm.bind(null,t,e,n),e.then(t,t))}function Pm(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Rt===t&&(gt&n)===n&&(Ht===4||Ht===3&&(gt&62914560)===gt&&300>re()-_i?(Et&2)===0&&_a(t,0):Xc|=n,Ca===gt&&(Ca=0)),Oe(t)}function wd(t,e){e===0&&(e=hs()),t=Bn(t,e),t!==null&&(qa(t,e),Oe(t))}function tg(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),wd(t,n)}function eg(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(c(314))}a!==null&&a.delete(e),wd(t,n)}function ng(t,e){return ou(t,e)}var Bi=null,Ra=null,$c=!1,Hi=!1,Pc=!1,wn=0;function Oe(t){t!==Ra&&t.next===null&&(Ra===null?Bi=Ra=t:Ra=Ra.next=t),Hi=!0,$c||($c=!0,lg())}function Sl(t,e){if(!Pc&&Hi){Pc=!0;do for(var n=!1,a=Bi;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,s=a.pingedLanes;i=(1<<31-oe(42|t)+1)-1,i&=l&~(u&~s),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Ad(a,i))}else i=gt,i=ql(a,a===Rt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||La(a,i)||(n=!0,Ad(a,i));a=a.next}while(n);Pc=!1}}function ag(){Ed()}function Ed(){Hi=$c=!1;var t=0;wn!==0&&mg()&&(t=wn);for(var e=re(),n=null,a=Bi;a!==null;){var l=a.next,i=Td(a,e);i===0?(a.next=null,n===null?Bi=l:n.next=l,l===null&&(Ra=n)):(n=a,(t!==0||(i&3)!==0)&&(Hi=!0)),a=l}Xt!==0&&Xt!==5||Sl(t),wn!==0&&(wn=0)}function Td(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-oe(i),s=1<<u,g=l[u];g===-1?((s&n)===0||(s&a)!==0)&&(l[u]=R0(s,e)):g<=e&&(t.expiredLanes|=s),i&=~s}if(e=Rt,n=gt,n=ql(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(xt===2||xt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&fu(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||La(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&fu(a),mu(n)){case 2:case 8:n=fs;break;case 32:n=Hl;break;case 268435456:n=ds;break;default:n=Hl}return a=xd.bind(null,t),n=ou(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&fu(a),t.callbackPriority=2,t.callbackNode=null,2}function xd(t,e){if(Xt!==0&&Xt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Oi()&&t.callbackNode!==n)return null;var a=gt;return a=ql(t,t===Rt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(id(t,a,e),Td(t,re()),t.callbackNode!=null&&t.callbackNode===n?xd.bind(null,t):null)}function Ad(t,e){if(Oi())return null;id(t,e,!0)}function lg(){pg(function(){(Et&6)!==0?ou(os,ag):Ed()})}function tr(){if(wn===0){var t=ga;t===0&&(t=Ul,Ul<<=1,(Ul&261888)===0&&(Ul=256)),wn=t}return wn}function Cd(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Xl(""+t)}function Nd(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function ig(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=Cd((l[ee]||null).action),u=a.submitter;u&&(e=(e=u[ee]||null)?Cd(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var s=new Jl("action","action",null,a,l);t.push({event:s,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(wn!==0){var g=u?Nd(l,u):new FormData(l);Sc(n,{pending:!0,data:g,method:l.method,action:i},null,g)}}else typeof i=="function"&&(s.preventDefault(),g=u?Nd(l,u):new FormData(l),Sc(n,{pending:!0,data:g,method:l.method,action:i},i,g))},currentTarget:l}]})}}for(var er=0;er<Uu.length;er++){var nr=Uu[er],ug=nr.toLowerCase(),cg=nr[0].toUpperCase()+nr.slice(1);_e(ug,"on"+cg)}_e(no,"onAnimationEnd"),_e(ao,"onAnimationIteration"),_e(lo,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(Tm,"onTransitionRun"),_e(xm,"onTransitionStart"),_e(Am,"onTransitionCancel"),_e(io,"onTransitionEnd"),ea("onMouseEnter",["mouseout","mouseover"]),ea("onMouseLeave",["mouseout","mouseover"]),ea("onPointerEnter",["pointerout","pointerover"]),ea("onPointerLeave",["pointerout","pointerover"]),zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zn("onBeforeInput",["compositionend","keypress","textInput","paste"]),zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),rg=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wl));function _d(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var u=a.length-1;0<=u;u--){var s=a[u],g=s.instance,x=s.currentTarget;if(s=s.listener,g!==i&&l.isPropagationStopped())break t;i=s,l.currentTarget=x;try{i(l)}catch(_){Wl(_)}l.currentTarget=null,i=g}else for(u=0;u<a.length;u++){if(s=a[u],g=s.instance,x=s.currentTarget,s=s.listener,g!==i&&l.isPropagationStopped())break t;i=s,l.currentTarget=x;try{i(l)}catch(_){Wl(_)}l.currentTarget=null,i=g}}}}function mt(t,e){var n=e[gu];n===void 0&&(n=e[gu]=new Set);var a=t+"__bubble";n.has(a)||(Md(e,t,2,!1),n.add(a))}function ar(t,e,n){var a=0;e&&(a|=4),Md(n,t,a,e)}var Ui="_reactListening"+Math.random().toString(36).slice(2);function lr(t){if(!t[Ui]){t[Ui]=!0,Ss.forEach(function(n){n!=="selectionchange"&&(rg.has(n)||ar(n,!1,t),ar(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ui]||(e[Ui]=!0,ar("selectionchange",!1,e))}}function Md(t,e,n,a){switch(lh(e)){case 2:var l=Hg;break;case 8:l=Ug;break;default:l=br}n=l.bind(null,e,n,t),l=void 0,!xu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function ir(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var s=a.stateNode.containerInfo;if(s===l)break;if(u===4)for(u=a.return;u!==null;){var g=u.tag;if((g===3||g===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;s!==null;){if(u=$n(s),u===null)return;if(g=u.tag,g===5||g===6||g===26||g===27){a=i=u;continue t}s=s.parentNode}}a=a.return}Ds(function(){var x=i,_=Eu(n),R=[];t:{var A=uo.get(t);if(A!==void 0){var C=Jl,J=t;switch(t){case"keypress":if(Zl(n)===0)break t;case"keydown":case"keyup":C=em;break;case"focusin":J="focus",C=_u;break;case"focusout":J="blur",C=_u;break;case"beforeblur":case"afterblur":C=_u;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=Bs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=Q0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=lm;break;case no:case ao:case lo:C=Z0;break;case io:C=um;break;case"scroll":case"scrollend":C=Y0;break;case"wheel":C=rm;break;case"copy":case"cut":case"paste":C=J0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=Us;break;case"toggle":case"beforetoggle":C=om}var at=(e&4)!==0,Mt=!at&&(t==="scroll"||t==="scrollend"),w=at?A!==null?A+"Capture":null:A;at=[];for(var y=x,T;y!==null;){var M=y;if(T=M.stateNode,M=M.tag,M!==5&&M!==26&&M!==27||T===null||w===null||(M=Qa(y,w),M!=null&&at.push(El(y,M,T))),Mt)break;y=y.return}0<at.length&&(A=new C(A,J,null,n,_),R.push({event:A,listeners:at}))}}if((e&7)===0){t:{if(A=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",A&&n!==wu&&(J=n.relatedTarget||n.fromElement)&&($n(J)||J[Wn]))break t;if((C||A)&&(A=_.window===_?_:(A=_.ownerDocument)?A.defaultView||A.parentWindow:window,C?(J=n.relatedTarget||n.toElement,C=x,J=J?$n(J):null,J!==null&&(Mt=h(J),at=J.tag,J!==Mt||at!==5&&at!==27&&at!==6)&&(J=null)):(C=null,J=x),C!==J)){if(at=Bs,M="onMouseLeave",w="onMouseEnter",y="mouse",(t==="pointerout"||t==="pointerover")&&(at=Us,M="onPointerLeave",w="onPointerEnter",y="pointer"),Mt=C==null?A:Ga(C),T=J==null?A:Ga(J),A=new at(M,y+"leave",C,n,_),A.target=Mt,A.relatedTarget=T,M=null,$n(_)===x&&(at=new at(w,y+"enter",J,n,_),at.target=T,at.relatedTarget=Mt,M=at),Mt=M,C&&J)e:{for(at=sg,w=C,y=J,T=0,M=w;M;M=at(M))T++;M=0;for(var tt=y;tt;tt=at(tt))M++;for(;0<T-M;)w=at(w),T--;for(;0<M-T;)y=at(y),M--;for(;T--;){if(w===y||y!==null&&w===y.alternate){at=w;break e}w=at(w),y=at(y)}at=null}else at=null;C!==null&&Rd(R,A,C,at,!1),J!==null&&Mt!==null&&Rd(R,Mt,J,at,!0)}}t:{if(A=x?Ga(x):window,C=A.nodeName&&A.nodeName.toLowerCase(),C==="select"||C==="input"&&A.type==="file")var bt=Vs;else if(Qs(A))if(Zs)bt=Sm;else{bt=vm;var W=ym}else C=A.nodeName,!C||C.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?x&&Su(x.elementType)&&(bt=Vs):bt=bm;if(bt&&(bt=bt(t,x))){Xs(R,bt,n,_);break t}W&&W(t,A,x),t==="focusout"&&x&&A.type==="number"&&x.memoizedProps.value!=null&&bu(A,"number",A.value)}switch(W=x?Ga(x):window,t){case"focusin":(Qs(W)||W.contentEditable==="true")&&(ca=W,Ou=x,Wa=null);break;case"focusout":Wa=Ou=ca=null;break;case"mousedown":Bu=!0;break;case"contextmenu":case"mouseup":case"dragend":Bu=!1,to(R,n,_);break;case"selectionchange":if(Em)break;case"keydown":case"keyup":to(R,n,_)}var st;if(Ru)t:{switch(t){case"compositionstart":var pt="onCompositionStart";break t;case"compositionend":pt="onCompositionEnd";break t;case"compositionupdate":pt="onCompositionUpdate";break t}pt=void 0}else ua?Ys(t,n)&&(pt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(pt="onCompositionStart");pt&&(js&&n.locale!=="ko"&&(ua||pt!=="onCompositionStart"?pt==="onCompositionEnd"&&ua&&(st=ks()):(ln=_,Au="value"in ln?ln.value:ln.textContent,ua=!0)),W=ji(x,pt),0<W.length&&(pt=new Hs(pt,t,null,n,_),R.push({event:pt,listeners:W}),st?pt.data=st:(st=Gs(n),st!==null&&(pt.data=st)))),(st=dm?hm(t,n):mm(t,n))&&(pt=ji(x,"onBeforeInput"),0<pt.length&&(W=new Hs("onBeforeInput","beforeinput",null,n,_),R.push({event:W,listeners:pt}),W.data=st)),ig(R,t,x,n,_)}_d(R,e)})}function El(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ji(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Qa(t,n),l!=null&&a.unshift(El(t,l,i)),l=Qa(t,e),l!=null&&a.push(El(t,l,i))),t.tag===3)return a;t=t.return}return[]}function sg(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Rd(t,e,n,a,l){for(var i=e._reactName,u=[];n!==null&&n!==a;){var s=n,g=s.alternate,x=s.stateNode;if(s=s.tag,g!==null&&g===a)break;s!==5&&s!==26&&s!==27||x===null||(g=x,l?(x=Qa(n,i),x!=null&&u.unshift(El(n,x,g))):l||(x=Qa(n,i),x!=null&&u.push(El(n,x,g)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var og=/\r\n?/g,fg=/\u0000|\uFFFD/g;function zd(t){return(typeof t=="string"?t:""+t).replace(og,`
`).replace(fg,"")}function Dd(t,e){return e=zd(e),zd(t)===e}function _t(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||aa(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&aa(t,""+a);break;case"className":Gl(t,"class",a);break;case"tabIndex":Gl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Gl(t,n,a);break;case"style":Rs(t,a,i);break;case"data":if(e!=="object"){Gl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Xl(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",l.name,l,null),_t(t,e,"formEncType",l.formEncType,l,null),_t(t,e,"formMethod",l.formMethod,l,null),_t(t,e,"formTarget",l.formTarget,l,null)):(_t(t,e,"encType",l.encType,l,null),_t(t,e,"method",l.method,l,null),_t(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Xl(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=je);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Xl(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Yl(t,"popover",a);break;case"xlinkActuate":Ue(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Ue(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Ue(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Ue(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Ue(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Ue(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Yl(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=L0.get(n)||n,Yl(t,n,a))}}function ur(t,e,n,a,l,i){switch(n){case"style":Rs(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(c(60));t.innerHTML=n}}break;case"children":typeof a=="string"?aa(t,a):(typeof a=="number"||typeof a=="bigint")&&aa(t,""+a);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=je);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ws.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[ee]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Yl(t,n,a)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,i,u,n,null)}}l&&_t(t,e,"srcSet",n.srcSet,n,null),a&&_t(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var s=i=u=l=null,g=null,x=null;for(a in n)if(n.hasOwnProperty(a)){var _=n[a];if(_!=null)switch(a){case"name":l=_;break;case"type":u=_;break;case"checked":g=_;break;case"defaultChecked":x=_;break;case"value":i=_;break;case"defaultValue":s=_;break;case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(c(137,e));break;default:_t(t,e,a,_,n,null)}}Cs(t,i,s,g,x,u,l,!1);return;case"select":mt("invalid",t),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(s=n[l],s!=null))switch(l){case"value":i=s;break;case"defaultValue":u=s;break;case"multiple":a=s;default:_t(t,e,l,s,n,null)}e=i,n=u,t.multiple=!!a,e!=null?na(t,!!a,e,!1):n!=null&&na(t,!!a,n,!0);return;case"textarea":mt("invalid",t),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(s=n[u],s!=null))switch(u){case"value":a=s;break;case"defaultValue":l=s;break;case"children":i=s;break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(c(91));break;default:_t(t,e,u,s,n,null)}_s(t,a,l,i);return;case"option":for(g in n)if(n.hasOwnProperty(g)&&(a=n[g],a!=null))switch(g){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_t(t,e,g,a,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(a=0;a<wl.length;a++)mt(wl[a],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(x in n)if(n.hasOwnProperty(x)&&(a=n[x],a!=null))switch(x){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:_t(t,e,x,a,n,null)}return;default:if(Su(e)){for(_ in n)n.hasOwnProperty(_)&&(a=n[_],a!==void 0&&ur(t,e,_,a,n,void 0));return}}for(s in n)n.hasOwnProperty(s)&&(a=n[s],a!=null&&_t(t,e,s,a,n,null))}function dg(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,s=null,g=null,x=null,_=null;for(C in n){var R=n[C];if(n.hasOwnProperty(C)&&R!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":g=R;default:a.hasOwnProperty(C)||_t(t,e,C,null,a,R)}}for(var A in a){var C=a[A];if(R=n[A],a.hasOwnProperty(A)&&(C!=null||R!=null))switch(A){case"type":i=C;break;case"name":l=C;break;case"checked":x=C;break;case"defaultChecked":_=C;break;case"value":u=C;break;case"defaultValue":s=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(c(137,e));break;default:C!==R&&_t(t,e,A,C,a,R)}}vu(t,u,s,g,x,_,i,l);return;case"select":C=u=s=A=null;for(i in n)if(g=n[i],n.hasOwnProperty(i)&&g!=null)switch(i){case"value":break;case"multiple":C=g;default:a.hasOwnProperty(i)||_t(t,e,i,null,a,g)}for(l in a)if(i=a[l],g=n[l],a.hasOwnProperty(l)&&(i!=null||g!=null))switch(l){case"value":A=i;break;case"defaultValue":s=i;break;case"multiple":u=i;default:i!==g&&_t(t,e,l,i,a,g)}e=s,n=u,a=C,A!=null?na(t,!!n,A,!1):!!a!=!!n&&(e!=null?na(t,!!n,e,!0):na(t,!!n,n?[]:"",!1));return;case"textarea":C=A=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null&&!a.hasOwnProperty(s))switch(s){case"value":break;case"children":break;default:_t(t,e,s,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":A=l;break;case"defaultValue":C=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(c(91));break;default:l!==i&&_t(t,e,u,l,a,i)}Ns(t,A,C);return;case"option":for(var J in n)if(A=n[J],n.hasOwnProperty(J)&&A!=null&&!a.hasOwnProperty(J))switch(J){case"selected":t.selected=!1;break;default:_t(t,e,J,null,a,A)}for(g in a)if(A=a[g],C=n[g],a.hasOwnProperty(g)&&A!==C&&(A!=null||C!=null))switch(g){case"selected":t.selected=A&&typeof A!="function"&&typeof A!="symbol";break;default:_t(t,e,g,A,a,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var at in n)A=n[at],n.hasOwnProperty(at)&&A!=null&&!a.hasOwnProperty(at)&&_t(t,e,at,null,a,A);for(x in a)if(A=a[x],C=n[x],a.hasOwnProperty(x)&&A!==C&&(A!=null||C!=null))switch(x){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(c(137,e));break;default:_t(t,e,x,A,a,C)}return;default:if(Su(e)){for(var Mt in n)A=n[Mt],n.hasOwnProperty(Mt)&&A!==void 0&&!a.hasOwnProperty(Mt)&&ur(t,e,Mt,void 0,a,A);for(_ in a)A=a[_],C=n[_],!a.hasOwnProperty(_)||A===C||A===void 0&&C===void 0||ur(t,e,_,A,a,C);return}}for(var w in n)A=n[w],n.hasOwnProperty(w)&&A!=null&&!a.hasOwnProperty(w)&&_t(t,e,w,null,a,A);for(R in a)A=a[R],C=n[R],!a.hasOwnProperty(R)||A===C||A==null&&C==null||_t(t,e,R,A,a,C)}function kd(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function hg(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,s=l.duration;if(i&&s&&kd(u)){for(u=0,s=l.responseEnd,a+=1;a<n.length;a++){var g=n[a],x=g.startTime;if(x>s)break;var _=g.transferSize,R=g.initiatorType;_&&kd(R)&&(g=g.responseEnd,u+=_*(g<s?1:(s-x)/(g-x)))}if(--a,e+=8*(i+u)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var cr=null,rr=null;function Li(t){return t.nodeType===9?t:t.ownerDocument}function Od(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Bd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function sr(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var or=null;function mg(){var t=window.event;return t&&t.type==="popstate"?t===or?!1:(or=t,!0):(or=null,!1)}var Hd=typeof setTimeout=="function"?setTimeout:void 0,gg=typeof clearTimeout=="function"?clearTimeout:void 0,Ud=typeof Promise=="function"?Promise:void 0,pg=typeof queueMicrotask=="function"?queueMicrotask:typeof Ud<"u"?function(t){return Ud.resolve(null).then(t).catch(yg)}:Hd;function yg(t){setTimeout(function(){throw t})}function En(t){return t==="head"}function jd(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),Oa(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Tl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Tl(n);for(var i=n.firstChild;i;){var u=i.nextSibling,s=i.nodeName;i[Ya]||s==="SCRIPT"||s==="STYLE"||s==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&Tl(t.ownerDocument.body);n=l}while(n);Oa(e)}function Ld(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function fr(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":fr(n),pu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function vg(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[Ya])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ce(t.nextSibling),t===null)break}return null}function bg(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ce(t.nextSibling),t===null))return null;return t}function qd(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ce(t.nextSibling),t===null))return null;return t}function dr(t){return t.data==="$?"||t.data==="$~"}function hr(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Sg(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ce(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var mr=null;function Yd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ce(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Gd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Qd(t,e,n){switch(e=Li(n),t){case"html":if(t=e.documentElement,!t)throw Error(c(452));return t;case"head":if(t=e.head,!t)throw Error(c(453));return t;case"body":if(t=e.body,!t)throw Error(c(454));return t;default:throw Error(c(451))}}function Tl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);pu(t)}var Ne=new Map,Xd=new Set;function qi(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=V.d;V.d={f:wg,r:Eg,D:Tg,C:xg,L:Ag,m:Cg,X:_g,S:Ng,M:Mg};function wg(){var t=tn.f(),e=zi();return t||e}function Eg(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?cf(e):tn.r(t)}var za=typeof document>"u"?null:document;function Vd(t,e,n){var a=za;if(a&&typeof e=="string"&&e){var l=be(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),Xd.has(l)||(Xd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),Wt(e,"link",t),Vt(e),a.head.appendChild(e)))}}function Tg(t){tn.D(t),Vd("dns-prefetch",t,null)}function xg(t,e){tn.C(t,e),Vd("preconnect",t,e)}function Ag(t,e,n){tn.L(t,e,n);var a=za;if(a&&t&&e){var l='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+be(n.imageSizes)+'"]')):l+='[href="'+be(t)+'"]';var i=l;switch(e){case"style":i=Da(t);break;case"script":i=ka(t)}Ne.has(i)||(t=z({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ne.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(xl(i))||e==="script"&&a.querySelector(Al(i))||(e=a.createElement("link"),Wt(e,"link",t),Vt(e),a.head.appendChild(e)))}}function Cg(t,e){tn.m(t,e);var n=za;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=ka(t)}if(!Ne.has(i)&&(t=z({rel:"modulepreload",href:t},e),Ne.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Al(i)))return}a=n.createElement("link"),Wt(a,"link",t),Vt(a),n.head.appendChild(a)}}}function Ng(t,e,n){tn.S(t,e,n);var a=za;if(a&&t){var l=ta(a).hoistableStyles,i=Da(t);e=e||"default";var u=l.get(i);if(!u){var s={loading:0,preload:null};if(u=a.querySelector(xl(i)))s.loading=5;else{t=z({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ne.get(i))&&gr(t,n);var g=u=a.createElement("link");Vt(g),Wt(g,"link",t),g._p=new Promise(function(x,_){g.onload=x,g.onerror=_}),g.addEventListener("load",function(){s.loading|=1}),g.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Yi(u,e,a)}u={type:"stylesheet",instance:u,count:1,state:s},l.set(i,u)}}}function _g(t,e){tn.X(t,e);var n=za;if(n&&t){var a=ta(n).hoistableScripts,l=ka(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=z({src:t,async:!0},e),(e=Ne.get(l))&&pr(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Mg(t,e){tn.M(t,e);var n=za;if(n&&t){var a=ta(n).hoistableScripts,l=ka(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=z({src:t,async:!0,type:"module"},e),(e=Ne.get(l))&&pr(t,e),i=n.createElement("script"),Vt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Zd(t,e,n,a){var l=(l=ft.current)?qi(l):null;if(!l)throw Error(c(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Da(n.href),n=ta(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Da(n.href);var i=ta(l).hoistableStyles,u=i.get(t);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=l.querySelector(xl(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ne.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ne.set(t,n),i||Rg(l,t,n,u.state))),e&&a===null)throw Error(c(528,""));return u}if(e&&a!==null)throw Error(c(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=ka(n),n=ta(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,t))}}function Da(t){return'href="'+be(t)+'"'}function xl(t){return'link[rel="stylesheet"]['+t+"]"}function Kd(t){return z({},t,{"data-precedence":t.precedence,precedence:null})}function Rg(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Wt(e,"link",n),Vt(e),t.head.appendChild(e))}function ka(t){return'[src="'+be(t)+'"]'}function Al(t){return"script[async]"+t}function Jd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Vt(a),a;var l=z({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Vt(a),Wt(a,"style",l),Yi(a,n.precedence,t),e.instance=a;case"stylesheet":l=Da(n.href);var i=t.querySelector(xl(l));if(i)return e.state.loading|=4,e.instance=i,Vt(i),i;a=Kd(n),(l=Ne.get(l))&&gr(a,l),i=(t.ownerDocument||t).createElement("link"),Vt(i);var u=i;return u._p=new Promise(function(s,g){u.onload=s,u.onerror=g}),Wt(i,"link",a),e.state.loading|=4,Yi(i,n.precedence,t),e.instance=i;case"script":return i=ka(n.src),(l=t.querySelector(Al(i)))?(e.instance=l,Vt(l),l):(a=n,(l=Ne.get(i))&&(a=z({},n),pr(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Vt(l),Wt(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(c(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Yi(a,n.precedence,t));return e.instance}function Yi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var s=a[u];if(s.dataset.precedence===e)i=s;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function gr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function pr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Gi=null;function Id(t,e,n){if(Gi===null){var a=new Map,l=Gi=new Map;l.set(n,a)}else l=Gi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[Ya]||i[Kt]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var s=a.get(u);s?s.push(i):a.set(u,[i])}}return a}function Fd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function zg(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Wd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Dg(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=Da(a.href),i=e.querySelector(xl(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Qi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Vt(i);return}i=e.ownerDocument||e,a=Kd(a),(l=Ne.get(l))&&gr(a,l),i=i.createElement("link"),Vt(i);var u=i;u._p=new Promise(function(s,g){u.onload=s,u.onerror=g}),Wt(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Qi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var yr=0;function kg(t,e){return t.stylesheets&&t.count===0&&Vi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&yr===0&&(yr=62500*hg());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>yr?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Qi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Vi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Xi=null;function Vi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Xi=new Map,e.forEach(Og,t),Xi=null,Qi.call(t))}function Og(t,e){if(!(e.state.loading&4)){var n=Xi.get(t);if(n)var a=n.get(null);else{n=new Map,Xi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=e.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=Qi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var Cl={$$typeof:j,Provider:null,Consumer:null,_currentValue:nt,_currentValue2:nt,_threadCount:0};function Bg(t,e,n,a,l,i,u,s,g){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=du(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=du(0),this.hiddenUpdates=du(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=g,this.incompleteTransitions=new Map}function $d(t,e,n,a,l,i,u,s,g,x,_,R){return t=new Bg(t,e,n,u,g,x,_,R,s),e=1,i===!0&&(e|=24),i=de(3,null,null,e),t.current=i,i.stateNode=t,e=Fu(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},tc(i),t}function Pd(t){return t?(t=oa,t):oa}function th(t,e,n,a,l,i){l=Pd(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(ce(n,t,e),ll(n,t,e))}function eh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function vr(t,e){eh(t,e),(t=t.alternate)&&eh(t,e)}function nh(t){if(t.tag===13||t.tag===31){var e=Bn(t,67108864);e!==null&&ce(e,t,67108864),vr(t,67108864)}}function ah(t){if(t.tag===13||t.tag===31){var e=ye();e=hu(e);var n=Bn(t,e);n!==null&&ce(n,t,e),vr(t,e)}}var Zi=!0;function Hg(t,e,n,a){var l=N.T;N.T=null;var i=V.p;try{V.p=2,br(t,e,n,a)}finally{V.p=i,N.T=l}}function Ug(t,e,n,a){var l=N.T;N.T=null;var i=V.p;try{V.p=8,br(t,e,n,a)}finally{V.p=i,N.T=l}}function br(t,e,n,a){if(Zi){var l=Sr(a);if(l===null)ir(t,e,a,Ki,n),ih(t,a);else if(Lg(l,t,e,n,a))a.stopPropagation();else if(ih(t,a),e&4&&-1<jg.indexOf(t)){for(;l!==null;){var i=Pn(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Rn(i.pendingLanes);if(u!==0){var s=i;for(s.pendingLanes|=2,s.entangledLanes|=2;u;){var g=1<<31-oe(u);s.entanglements[1]|=g,u&=~g}Oe(i),(Et&6)===0&&(Mi=re()+500,Sl(0))}}break;case 31:case 13:s=Bn(i,2),s!==null&&ce(s,i,2),zi(),vr(i,2)}if(i=Sr(a),i===null&&ir(t,e,a,Ki,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else ir(t,e,a,null,n)}}function Sr(t){return t=Eu(t),wr(t)}var Ki=null;function wr(t){if(Ki=null,t=$n(t),t!==null){var e=h(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=v(e),t!==null)return t;t=null}else if(n===31){if(t=E(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ki=t,null}function lh(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(T0()){case os:return 2;case fs:return 8;case Hl:case x0:return 32;case ds:return 268435456;default:return 32}default:return 32}}var Er=!1,Tn=null,xn=null,An=null,Nl=new Map,_l=new Map,Cn=[],jg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function ih(t,e){switch(t){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":xn=null;break;case"mouseover":case"mouseout":An=null;break;case"pointerover":case"pointerout":Nl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":_l.delete(e.pointerId)}}function Ml(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=Pn(e),e!==null&&nh(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function Lg(t,e,n,a,l){switch(e){case"focusin":return Tn=Ml(Tn,t,e,n,a,l),!0;case"dragenter":return xn=Ml(xn,t,e,n,a,l),!0;case"mouseover":return An=Ml(An,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return Nl.set(i,Ml(Nl.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,_l.set(i,Ml(_l.get(i)||null,t,e,n,a,l)),!0}return!1}function uh(t){var e=$n(t.target);if(e!==null){var n=h(e);if(n!==null){if(e=n.tag,e===13){if(e=v(n),e!==null){t.blockedOn=e,vs(t.priority,function(){ah(n)});return}}else if(e===31){if(e=E(n),e!==null){t.blockedOn=e,vs(t.priority,function(){ah(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ji(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Sr(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);wu=a,n.target.dispatchEvent(a),wu=null}else return e=Pn(n),e!==null&&nh(e),t.blockedOn=n,!1;e.shift()}return!0}function ch(t,e,n){Ji(t)&&n.delete(e)}function qg(){Er=!1,Tn!==null&&Ji(Tn)&&(Tn=null),xn!==null&&Ji(xn)&&(xn=null),An!==null&&Ji(An)&&(An=null),Nl.forEach(ch),_l.forEach(ch)}function Ii(t,e){t.blockedOn===e&&(t.blockedOn=null,Er||(Er=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,qg)))}var Fi=null;function rh(t){Fi!==t&&(Fi=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Fi===t&&(Fi=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(wr(a||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,Sc(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function Oa(t){function e(g){return Ii(g,t)}Tn!==null&&Ii(Tn,t),xn!==null&&Ii(xn,t),An!==null&&Ii(An,t),Nl.forEach(e),_l.forEach(e);for(var n=0;n<Cn.length;n++){var a=Cn[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)uh(n),n.blockedOn===null&&Cn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[ee]||null;if(typeof i=="function")u||rh(n);else if(u){var s=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[ee]||null)s=u.formAction;else if(wr(l)!==null)continue}else s=u.action;typeof s=="function"?n[a+1]=s:(n.splice(a,3),a-=3),rh(n)}}}function sh(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function Tr(t){this._internalRoot=t}Wi.prototype.render=Tr.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(c(409));var n=e.current,a=ye();th(n,a,t,e,null,null)},Wi.prototype.unmount=Tr.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;th(t.current,2,null,t,null,null),zi(),e[Wn]=null}};function Wi(t){this._internalRoot=t}Wi.prototype.unstable_scheduleHydration=function(t){if(t){var e=ys();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Cn.length&&e!==0&&e<Cn[n].priority;n++);Cn.splice(n,0,t),n===0&&uh(t)}};var oh=f.version;if(oh!=="19.2.6")throw Error(c(527,oh,"19.2.6"));V.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(c(188)):(t=Object.keys(t).join(","),Error(c(268,t)));return t=b(e),t=t!==null?k(t):null,t=t===null?null:t.stateNode,t};var Yg={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:N,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $i=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$i.isDisabled&&$i.supportsFiber)try{ja=$i.inject(Yg),se=$i}catch{}}return zl.createRoot=function(t,e){if(!o(t))throw Error(c(299));var n=!1,a="",l=yf,i=vf,u=bf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=$d(t,1,!1,null,null,n,a,null,l,i,u,sh),t[Wn]=e.current,lr(t),new Tr(e)},zl.hydrateRoot=function(t,e,n){if(!o(t))throw Error(c(299));var a=!1,l="",i=yf,u=vf,s=bf,g=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(s=n.onRecoverableError),n.formState!==void 0&&(g=n.formState)),e=$d(t,1,!0,e,n??null,a,l,g,i,u,s,sh),e.context=Pd(null),n=e.current,a=ye(),a=hu(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,qa(e,n),Oe(e),t[Wn]=e.current,lr(t),new Wi(e)},zl.version="19.2.6",zl}var Sh;function $g(){if(Sh)return Cr.exports;Sh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(f){console.error(f)}}return r(),Cr.exports=Wg(),Cr.exports}var Pg=$g();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t1=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),r0=(...r)=>r.filter((f,d,c)=>!!f&&f.trim()!==""&&c.indexOf(f)===d).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var e1={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n1=vt.forwardRef(({color:r="currentColor",size:f=24,strokeWidth:d=2,absoluteStrokeWidth:c,className:o="",children:h,iconNode:v,...E},m)=>vt.createElement("svg",{ref:m,...e1,width:f,height:f,stroke:r,strokeWidth:c?Number(d)*24/Number(f):d,className:r0("lucide",o),...E},[...v.map(([b,k])=>vt.createElement(b,k)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=(r,f)=>{const d=vt.forwardRef(({className:c,...o},h)=>vt.createElement(n1,{ref:h,iconNode:f,className:r0(`lucide-${t1(r)}`,c),...o}));return d.displayName=`${r}`,d};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=$t("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=$t("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=$t("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a1=$t("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=$t("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l1=$t("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i1=$t("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u1=$t("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c1=$t("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r1=$t("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wh=$t("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s1=$t("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o1=$t("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f1=$t("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d1=$t("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h1=$t("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ls=$t("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function lu({group:r,size:f="md",dim:d}){const c=f==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return p.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${r.bgClass} ${r.textClass} ${c} ${d?"opacity-40":""}`,children:r.label})}const Ba=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Eh=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function d0(r){if(r.length===0)return"";const f=[...r].sort((k,z)=>k.date.localeCompare(z.date)),d=f[0].date,c=f[f.length-1].date,[o,h,v]=d.split("-").map(Number),[E,m,b]=c.split("-").map(Number);return d===c?`${Ba[h-1]} ${v}, ${o}`:o===E&&h===m?`${Ba[h-1]} ${v}–${b}, ${o}`:o===E?`${Ba[h-1]} ${v} – ${Ba[m-1]} ${b}, ${o}`:`${Ba[h-1]} ${v}, ${o} – ${Ba[m-1]} ${b}, ${E}`}function m1(r){if(r.length===0)return"";const f=[...r].sort((U,Y)=>U.date.localeCompare(Y.date)),d=f[0].date,c=f[f.length-1].date,[o,h,v]=d.split("-").map(Number),[E,m,b]=c.split("-").map(Number),k=Eh[new Date(o,h-1,v).getDay()],z=d0(r);if(d===c)return`${z} (${k})`;const O=Eh[new Date(E,m-1,b).getDay()];return`${z} (${k}–${O})`}function Th(r){return r.subtitle??d0(r.days)}function en(r){const[f,d]=r.split(":").map(Number);return f*60+d}const g1=30;function p1(r,f){let d=-1;for(let E=0;E<r.length&&en(r[E])<=f;E++)d=E;if(d===-1)return{index:-1,progress:0};const c=en(r[d]),o=r[d+1]?en(r[d+1]):null,h=o!==null?o:c+g1;if(f>=h)return{index:-1,progress:0};const v=h===c?0:(f-c)/(h-c);return{index:d,progress:Math.max(0,Math.min(1,v))}}function h0(r){const[f,d]=r.split(":").map(Number);return`${f%12||12}:${d.toString().padStart(2,"0")}`}function m0(r){const[f]=r.split(":").map(Number);return f>=12?"PM":"AM"}function is(){const r=new Date;return r.getHours()*60+r.getMinutes()}function Ol(){const r=new Date,f=r.getFullYear(),d=String(r.getMonth()+1).padStart(2,"0"),c=String(r.getDate()).padStart(2,"0");return`${f}-${d}-${c}`}function y1(){const r=new Date,f=r.getHours(),d=r.getMinutes(),c=f%12||12,o=f>=12?"PM":"AM";return`${c}:${d.toString().padStart(2,"0")} ${o}`}function v1(r){if(r<=0)return"";if(r<60)return`${r} min`;const f=Math.floor(r/60),d=r%60;return d===0?`${f}h`:`${f}h ${d}m`}function b1(r){const f=new Date(r);if(isNaN(f.getTime()))return r;const d=f.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),c=f.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${d}, ${c}`}function xh(r,f){return r.flatMap(d=>{const c=f.find(o=>o.id===d);return c?[c]:[]})}function S1({activity:r,runGroups:f,past:d}){const c=xh(r.onTrack,f),o=xh(r.inClass??[],f);return p.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${d?"opacity-60":""}`,children:p.jsxs("div",{className:"flex gap-4",children:[p.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[h0(r.time),p.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:m0(r.time)})]}),p.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[c.length>0&&p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),p.jsx("div",{className:"flex flex-wrap gap-1.5",children:c.map(h=>p.jsx(lu,{group:h},h.id))})]}),o.length>0&&p.jsxs(p.Fragment,{children:[c.length>0&&p.jsx("div",{className:"border-t border-gray-100"}),p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),p.jsx("div",{className:"flex flex-wrap gap-1.5",children:o.map(h=>p.jsx(lu,{group:h},h.id))})]})]}),r.note&&p.jsx("p",{className:"text-xs italic text-gray-500",children:r.note})]})]})})}function w1({activity:r,past:f}){const d=r.type==="lunch"||r.type==="special";return p.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${d?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${f?"opacity-60":""}`,children:p.jsxs("div",{className:"flex items-center gap-4",children:[p.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[h0(r.time),p.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:m0(r.time)})]}),d&&p.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:r.type==="lunch"?p.jsx(h1,{size:16}):p.jsx(s1,{size:16})}),p.jsxs("div",{children:[p.jsx("p",{className:"text-sm font-medium text-gray-900",children:r.label}),r.subtitle&&p.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:r.subtitle})]})]})})}const es=vt.forwardRef(({activities:r},f)=>{const[,d]=vt.useState(0);vt.useEffect(()=>{const m=setInterval(()=>d(b=>b+1),3e4);return()=>clearInterval(m)},[]);const c=is(),h=r.filter(m=>"time"in m).find(m=>en(m.time)>c),v=h?en(h.time)-c:null,E=v!==null?v<=5?"text-red-500":v<=10?"text-orange-500":"text-gray-400":"text-gray-400";return p.jsxs("div",{ref:f,"data-time-indicator":!0,className:"relative my-6",children:[p.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[p.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),p.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),p.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:y1()}),v!==null&&p.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${E}`,children:["Next activity starts in ",p.jsx("span",{className:"font-semibold",children:v1(v)})]})]})});es.displayName="TimeIndicator";function Ah({collapsed:r,children:f}){return p.jsx("div",{"data-collapsed":r,"aria-hidden":r,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:r?"0fr":"1fr",opacity:r?0:1,marginBottom:r?0:"0.5rem"},children:p.jsx("div",{className:"overflow-hidden",children:f})})}function E1({activities:r,runGroups:f,isToday:d,selectedGroups:c,hidePast:o}){const h=vt.useRef(null),[,v]=vt.useState(0);vt.useEffect(()=>{if(!d)return;const B=setInterval(()=>v(j=>j+1),6e4);return()=>clearInterval(B)},[d]),vt.useEffect(()=>{if(!d)return;const B=setTimeout(()=>{var j;(j=h.current)==null||j.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(B)},[d]);const E=is(),m=r.flatMap(B=>{if(B.type!=="session")return[B];if(c.length===0)return[B];const j=B.onTrack.filter(ot=>c.includes(ot)),Z=(B.inClass??[]).filter(ot=>c.includes(ot));return j.length===0&&Z.length===0?[]:[{...B,onTrack:j,inClass:Z}]}),b=m.map(B=>B.type!=="break"&&o&&d&&en(B.time)<E);m.forEach((B,j)=>{if(B.type!=="break")return;const Z=m.slice(0,j).some((ot,Q)=>ot.type!=="break"&&!b[Q]);b[j]=!Z});const k=[],z=[];m.forEach((B,j)=>{B.type!=="break"&&(k.push(j),z.push(B.time))});const{index:O}=d?p1(z,E):{index:-1},U=O===-1?-1:k[O],Y=d?m.findIndex(B=>B.type!=="break"&&en(B.time)>E):-1,K=d&&Y===-1&&m.length>0,ct=m.length>0&&b.every(Boolean);let H;return p.jsxs("div",{className:"flex flex-col pb-10",children:[m.length>0&&p.jsx(Ah,{collapsed:!ct,children:p.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[p.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),p.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),m.map((B,j)=>{const Z=j===U,ot=d&&B.type!=="break"&&!Z&&en(B.time)<E;let Q=null;!b[j]&&B.type==="session"&&B.sessionNumber!==void 0&&B.sessionNumber!==H&&(H=B.sessionNumber,Q=p.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",B.sessionNumber]}));const q=B.type==="break"?p.jsxs("div",{className:"flex items-center gap-2 py-1",children:[p.jsx("div",{className:"h-px flex-1 bg-gray-200"}),p.jsx("span",{className:"text-xs text-gray-400 italic",children:B.label}),p.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):B.type==="session"?p.jsx(S1,{activity:B,runGroups:f,past:ot}):p.jsx(w1,{activity:B,past:ot});return p.jsxs(Ah,{collapsed:b[j],children:[j===Y&&p.jsx(es,{ref:h,activities:m}),Q,q]},j)}),K&&p.jsx(es,{ref:h,activities:m})]})}function T1({groups:r,selected:f,onChange:d}){const[c,o]=vt.useState(!1),h=m=>d(f.includes(m)?f.filter(b=>b!==m):[...f,m]),v=f.length===0||f.length===r.length,E=r.filter(m=>f.includes(m.id));return p.jsxs("div",{className:"relative",children:[p.jsxs("button",{onClick:()=>o(m=>!m),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[v?p.jsx("span",{className:"text-gray-700",children:"All run groups"}):p.jsx("div",{className:"flex items-center gap-1",children:E.map(m=>p.jsx(lu,{group:m,size:"sm"},m.id))}),p.jsx(o0,{size:14,className:"text-gray-400"})]}),c&&p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>o(!1)}),p.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[r.map(m=>p.jsxs("button",{onClick:()=>h(m.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[p.jsx(lu,{group:m,size:"md"}),f.includes(m.id)&&p.jsx(iu,{size:14,className:"text-blue-500"})]},m.id)),p.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:p.jsx("button",{onClick:()=>{d([]),o(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:v?"All selected":"Clear filter"})})]})]})]})}const eu="#d1d5db",nu="currentColor";function Ch({trackId:r,size:f=28,className:d="",title:c}){const o=c??(r?`${r} track`:"Track");return r==="msrc-3-1"?p.jsx(Rr,{config:"full",size:f,className:d,label:o}):r==="msrc-1-7"?p.jsx(Rr,{config:"east",size:f,className:d,label:o}):r==="msrc-1-3"?p.jsx(Rr,{config:"west",size:f,className:d,label:o}):r==="ecr"?p.jsx(M1,{size:f,className:d,label:o}):p.jsx(R1,{size:f,className:d,label:o})}const x1="M 32 24 C 32 10 20 6 12 12 C 2 20 2 32 12 40 C 22 46 32 40 32 26 Z",A1="M 18 20 C 12 20 12 32 18 32 C 24 32 24 20 18 20 Z",C1="M 60 24 C 60 10 72 4 82 8 C 94 12 96 24 90 30 C 92 38 82 42 76 36 L 76 32 C 76 26 68 26 68 32 L 68 38 C 68 44 60 42 60 30 Z",N1="M 32 24 C 42 16 50 32 60 24";function Rr({config:r,size:f,className:d,label:c}){const o=r!=="east",h=r!=="west",v=o?nu:eu,E=h?nu:eu,m=r==="full"||r==="east"?nu:eu;return p.jsxs("svg",{viewBox:"0 0 100 50",width:f*100/50,height:f,className:d,fill:"none",strokeWidth:3,strokeLinecap:"round",strokeLinejoin:"round",role:"img","aria-label":c,children:[p.jsx("path",{d:x1,stroke:v}),p.jsx("path",{d:A1,stroke:v,strokeWidth:2}),p.jsx("path",{d:N1,stroke:m}),p.jsx("path",{d:C1,stroke:E})]})}const _1="M 12 20 C 4 18 4 6 14 6 C 26 6 34 14 42 10 C 52 4 66 6 72 14 C 76 20 84 20 90 26 C 94 32 90 40 82 38 L 70 34 L 84 46 C 88 52 78 54 70 50 L 44 38 C 34 34 22 40 16 40 C 8 40 6 32 10 26 C 10 24 10 22 12 20 Z";function M1({size:r,className:f,label:d}){return p.jsx("svg",{viewBox:"0 0 100 58",width:r*100/58,height:r,className:f,fill:"none",stroke:nu,strokeWidth:3,strokeLinecap:"round",strokeLinejoin:"round",role:"img","aria-label":d,children:p.jsx("path",{d:_1})})}function R1({size:r,className:f,label:d}){return p.jsx("svg",{viewBox:"0 0 48 32",width:r*48/32,height:r,className:f,fill:"none",stroke:eu,strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round",strokeDasharray:"3 3",role:"img","aria-label":d,children:p.jsx("path",{d:"M 8 16 C 8 6 22 4 28 10 C 34 16 40 12 40 20 C 40 28 26 30 20 24 C 14 18 8 26 8 16 Z"})})}function Nh(r){const f=Ol();return r.days.some(d=>d.date===f)}function _h(){return p.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[p.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function z1({events:r,active:f,onChange:d,onOpenDetails:c}){const[o,h]=vt.useState(!1);return p.jsxs("div",{className:"relative min-w-0 pl-1",children:[p.jsxs("button",{onClick:()=>h(v=>!v),className:"flex items-center gap-2 text-left group min-w-0",children:[p.jsx(Ch,{trackId:f.trackId,size:26,className:"shrink-0 text-gray-700",title:`${f.name} track`}),p.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:f.name}),Nh(f)&&p.jsx(_h,{}),p.jsx(o0,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),p.jsxs("div",{className:"flex items-center gap-0.5",children:[p.jsx("p",{className:"text-sm text-gray-500",children:Th(f)}),p.jsx("button",{onClick:c,"aria-label":"Event details",className:"inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900",children:p.jsx(u1,{size:14})})]}),o&&p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>h(!1)}),p.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[240px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:r.map(v=>p.jsxs("button",{onClick:()=>{d(v),h(!1)},className:"flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50 text-left",children:[p.jsx(Ch,{trackId:v.trackId,size:24,className:"shrink-0 text-gray-700",title:`${v.name} track`}),p.jsxs("div",{className:"min-w-0 flex-1",children:[p.jsxs("div",{className:"flex items-center gap-1.5",children:[p.jsx("span",{className:"text-sm font-semibold text-gray-900",children:v.name}),Nh(v)&&p.jsx(_h,{})]}),p.jsx("div",{className:"text-xs text-gray-400",children:Th(v)})]}),v.id===f.id&&p.jsx(iu,{size:14,className:"text-blue-500 ml-1 shrink-0"})]},v.id))})]})]})}function D1({checked:r,onChange:f,label:d}){return p.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[d&&p.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:d}),p.jsx("button",{type:"button",role:"switch","aria-checked":r,onClick:f,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:r?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:p.jsx("span",{style:{position:"absolute",top:"2px",left:r?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Jn=72,k1=110;function O1({children:r}){const[f,d]=vt.useState(0),[c,o]=vt.useState("idle"),h=vt.useRef(null),v=vt.useRef(0);vt.useEffect(()=>{const k=U=>{window.scrollY===0&&(h.current=U.touches[0].clientY)},z=U=>{if(h.current===null)return;const Y=U.touches[0].clientY-h.current;if(Y<=0){h.current=null;return}U.preventDefault();const K=Y<Jn?Y:Jn+(Y-Jn)*.25;v.current=Math.min(K,k1),d(v.current),o("pulling")},O=()=>{h.current!==null&&(h.current=null,v.current>=Jn?(o("refreshing"),d(Jn*.75),setTimeout(()=>window.location.reload(),600)):(o("releasing"),d(0),v.current=0,setTimeout(()=>o("idle"),250)))};return document.addEventListener("touchstart",k,{passive:!0}),document.addEventListener("touchmove",z,{passive:!1}),document.addEventListener("touchend",O),document.addEventListener("touchcancel",O),()=>{document.removeEventListener("touchstart",k),document.removeEventListener("touchmove",z),document.removeEventListener("touchend",O),document.removeEventListener("touchcancel",O)}},[]);const E=c==="releasing"||c==="refreshing",m=Math.min(f/Jn,1),b=f>=Jn;return p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${f}px)`,transition:E?"transform 0.25s ease":"none"},children:p.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${b?"text-blue-500":"text-gray-400"}`,children:p.jsx(o1,{size:16,className:c==="refreshing"?"animate-spin":"",style:c!=="refreshing"?{transform:`rotate(${m*270}deg)`}:void 0})})}),p.jsx("div",{style:{transform:`translateY(${f}px)`,transition:E?"transform 0.25s ease":"none"},children:r})]})}function B1({groups:r}){const f=r.filter(d=>d.description);return f.length===0?null:p.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[p.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),p.jsx("ul",{className:"flex flex-col gap-1.5",children:f.map(d=>p.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[p.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${d.bgClass}`,"aria-hidden":"true"}),p.jsx("span",{className:"font-medium text-gray-900",children:d.label}),p.jsx("span",{className:"text-gray-400",children:"·"}),p.jsx("span",{children:d.description})]},d.id))})]})}const Mh=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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
`;function H1(){const[r,f]=vt.useState(!1);vt.useEffect(()=>{window.scrollTo(0,0)},[]);async function d(){await navigator.clipboard.writeText(Mh),f(!0),setTimeout(()=>f(!1),2e3)}return p.jsx("div",{className:"min-h-screen bg-gray-50",children:p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),p.jsxs("div",{className:"flex items-center gap-2",children:[p.jsxs("button",{onClick:d,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[r?p.jsx(iu,{size:16,className:"text-green-600"}):p.jsx(f0,{size:16}),r?"Copied":"Copy"]}),p.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:p.jsx(ls,{size:18})})]})]}),p.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",p.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),p.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:p.jsx("code",{children:Mh})})]})})}var Ha={},zr,Rh;function U1(){return Rh||(Rh=1,zr=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),zr}var Dr={},_n={},zh;function In(){if(zh)return _n;zh=1;let r;const f=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(c){if(!c)throw new Error('"version" cannot be null or undefined');if(c<1||c>40)throw new Error('"version" should be in range from 1 to 40');return c*4+17},_n.getSymbolTotalCodewords=function(c){return f[c]},_n.getBCHDigit=function(d){let c=0;for(;d!==0;)c++,d>>>=1;return c},_n.setToSJISFunction=function(c){if(typeof c!="function")throw new Error('"toSJISFunc" is not a valid function.');r=c},_n.isKanjiModeEnabled=function(){return typeof r<"u"},_n.toSJIS=function(c){return r(c)},_n}var kr={},Dh;function us(){return Dh||(Dh=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function f(d){if(typeof d!="string")throw new Error("Param is not a string");switch(d.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+d)}}r.isValid=function(c){return c&&typeof c.bit<"u"&&c.bit>=0&&c.bit<4},r.from=function(c,o){if(r.isValid(c))return c;try{return f(c)}catch{return o}}})(kr)),kr}var Or,kh;function j1(){if(kh)return Or;kh=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(f){const d=Math.floor(f/8);return(this.buffer[d]>>>7-f%8&1)===1},put:function(f,d){for(let c=0;c<d;c++)this.putBit((f>>>d-c-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(f){const d=Math.floor(this.length/8);this.buffer.length<=d&&this.buffer.push(0),f&&(this.buffer[d]|=128>>>this.length%8),this.length++}},Or=r,Or}var Br,Oh;function L1(){if(Oh)return Br;Oh=1;function r(f){if(!f||f<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=f,this.data=new Uint8Array(f*f),this.reservedBit=new Uint8Array(f*f)}return r.prototype.set=function(f,d,c,o){const h=f*this.size+d;this.data[h]=c,o&&(this.reservedBit[h]=!0)},r.prototype.get=function(f,d){return this.data[f*this.size+d]},r.prototype.xor=function(f,d,c){this.data[f*this.size+d]^=c},r.prototype.isReserved=function(f,d){return this.reservedBit[f*this.size+d]},Br=r,Br}var Hr={},Bh;function q1(){return Bh||(Bh=1,(function(r){const f=In().getSymbolSize;r.getRowColCoords=function(c){if(c===1)return[];const o=Math.floor(c/7)+2,h=f(c),v=h===145?26:Math.ceil((h-13)/(2*o-2))*2,E=[h-7];for(let m=1;m<o-1;m++)E[m]=E[m-1]-v;return E.push(6),E.reverse()},r.getPositions=function(c){const o=[],h=r.getRowColCoords(c),v=h.length;for(let E=0;E<v;E++)for(let m=0;m<v;m++)E===0&&m===0||E===0&&m===v-1||E===v-1&&m===0||o.push([h[E],h[m]]);return o}})(Hr)),Hr}var Ur={},Hh;function Y1(){if(Hh)return Ur;Hh=1;const r=In().getSymbolSize,f=7;return Ur.getPositions=function(c){const o=r(c);return[[0,0],[o-f,0],[0,o-f]]},Ur}var jr={},Uh;function G1(){return Uh||(Uh=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const f={N1:3,N2:3,N3:40,N4:10};r.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},r.from=function(o){return r.isValid(o)?parseInt(o,10):void 0},r.getPenaltyN1=function(o){const h=o.size;let v=0,E=0,m=0,b=null,k=null;for(let z=0;z<h;z++){E=m=0,b=k=null;for(let O=0;O<h;O++){let U=o.get(z,O);U===b?E++:(E>=5&&(v+=f.N1+(E-5)),b=U,E=1),U=o.get(O,z),U===k?m++:(m>=5&&(v+=f.N1+(m-5)),k=U,m=1)}E>=5&&(v+=f.N1+(E-5)),m>=5&&(v+=f.N1+(m-5))}return v},r.getPenaltyN2=function(o){const h=o.size;let v=0;for(let E=0;E<h-1;E++)for(let m=0;m<h-1;m++){const b=o.get(E,m)+o.get(E,m+1)+o.get(E+1,m)+o.get(E+1,m+1);(b===4||b===0)&&v++}return v*f.N2},r.getPenaltyN3=function(o){const h=o.size;let v=0,E=0,m=0;for(let b=0;b<h;b++){E=m=0;for(let k=0;k<h;k++)E=E<<1&2047|o.get(b,k),k>=10&&(E===1488||E===93)&&v++,m=m<<1&2047|o.get(k,b),k>=10&&(m===1488||m===93)&&v++}return v*f.N3},r.getPenaltyN4=function(o){let h=0;const v=o.data.length;for(let m=0;m<v;m++)h+=o.data[m];return Math.abs(Math.ceil(h*100/v/5)-10)*f.N4};function d(c,o,h){switch(c){case r.Patterns.PATTERN000:return(o+h)%2===0;case r.Patterns.PATTERN001:return o%2===0;case r.Patterns.PATTERN010:return h%3===0;case r.Patterns.PATTERN011:return(o+h)%3===0;case r.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(h/3))%2===0;case r.Patterns.PATTERN101:return o*h%2+o*h%3===0;case r.Patterns.PATTERN110:return(o*h%2+o*h%3)%2===0;case r.Patterns.PATTERN111:return(o*h%3+(o+h)%2)%2===0;default:throw new Error("bad maskPattern:"+c)}}r.applyMask=function(o,h){const v=h.size;for(let E=0;E<v;E++)for(let m=0;m<v;m++)h.isReserved(m,E)||h.xor(m,E,d(o,m,E))},r.getBestMask=function(o,h){const v=Object.keys(r.Patterns).length;let E=0,m=1/0;for(let b=0;b<v;b++){h(b),r.applyMask(b,o);const k=r.getPenaltyN1(o)+r.getPenaltyN2(o)+r.getPenaltyN3(o)+r.getPenaltyN4(o);r.applyMask(b,o),k<m&&(m=k,E=b)}return E}})(jr)),jr}var Pi={},jh;function g0(){if(jh)return Pi;jh=1;const r=us(),f=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],d=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Pi.getBlocksCount=function(o,h){switch(h){case r.L:return f[(o-1)*4+0];case r.M:return f[(o-1)*4+1];case r.Q:return f[(o-1)*4+2];case r.H:return f[(o-1)*4+3];default:return}},Pi.getTotalCodewordsCount=function(o,h){switch(h){case r.L:return d[(o-1)*4+0];case r.M:return d[(o-1)*4+1];case r.Q:return d[(o-1)*4+2];case r.H:return d[(o-1)*4+3];default:return}},Pi}var Lr={},Dl={},Lh;function Q1(){if(Lh)return Dl;Lh=1;const r=new Uint8Array(512),f=new Uint8Array(256);return(function(){let c=1;for(let o=0;o<255;o++)r[o]=c,f[c]=o,c<<=1,c&256&&(c^=285);for(let o=255;o<512;o++)r[o]=r[o-255]})(),Dl.log=function(c){if(c<1)throw new Error("log("+c+")");return f[c]},Dl.exp=function(c){return r[c]},Dl.mul=function(c,o){return c===0||o===0?0:r[f[c]+f[o]]},Dl}var qh;function X1(){return qh||(qh=1,(function(r){const f=Q1();r.mul=function(c,o){const h=new Uint8Array(c.length+o.length-1);for(let v=0;v<c.length;v++)for(let E=0;E<o.length;E++)h[v+E]^=f.mul(c[v],o[E]);return h},r.mod=function(c,o){let h=new Uint8Array(c);for(;h.length-o.length>=0;){const v=h[0];for(let m=0;m<o.length;m++)h[m]^=f.mul(o[m],v);let E=0;for(;E<h.length&&h[E]===0;)E++;h=h.slice(E)}return h},r.generateECPolynomial=function(c){let o=new Uint8Array([1]);for(let h=0;h<c;h++)o=r.mul(o,new Uint8Array([1,f.exp(h)]));return o}})(Lr)),Lr}var qr,Yh;function V1(){if(Yh)return qr;Yh=1;const r=X1();function f(d){this.genPoly=void 0,this.degree=d,this.degree&&this.initialize(this.degree)}return f.prototype.initialize=function(c){this.degree=c,this.genPoly=r.generateECPolynomial(this.degree)},f.prototype.encode=function(c){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(c.length+this.degree);o.set(c);const h=r.mod(o,this.genPoly),v=this.degree-h.length;if(v>0){const E=new Uint8Array(this.degree);return E.set(h,v),E}return h},qr=f,qr}var Yr={},Gr={},Qr={},Gh;function p0(){return Gh||(Gh=1,Qr.isValid=function(f){return!isNaN(f)&&f>=1&&f<=40}),Qr}var Be={},Qh;function y0(){if(Qh)return Be;Qh=1;const r="[0-9]+",f="[A-Z $%*+\\-./:]+";let d="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";d=d.replace(/u/g,"\\u");const c="(?:(?![A-Z0-9 $%*+\\-./:]|"+d+`)(?:.|[\r
]))+`;Be.KANJI=new RegExp(d,"g"),Be.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Be.BYTE=new RegExp(c,"g"),Be.NUMERIC=new RegExp(r,"g"),Be.ALPHANUMERIC=new RegExp(f,"g");const o=new RegExp("^"+d+"$"),h=new RegExp("^"+r+"$"),v=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Be.testKanji=function(m){return o.test(m)},Be.testNumeric=function(m){return h.test(m)},Be.testAlphanumeric=function(m){return v.test(m)},Be}var Xh;function Fn(){return Xh||(Xh=1,(function(r){const f=p0(),d=y0();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(h,v){if(!h.ccBits)throw new Error("Invalid mode: "+h);if(!f.isValid(v))throw new Error("Invalid version: "+v);return v>=1&&v<10?h.ccBits[0]:v<27?h.ccBits[1]:h.ccBits[2]},r.getBestModeForData=function(h){return d.testNumeric(h)?r.NUMERIC:d.testAlphanumeric(h)?r.ALPHANUMERIC:d.testKanji(h)?r.KANJI:r.BYTE},r.toString=function(h){if(h&&h.id)return h.id;throw new Error("Invalid mode")},r.isValid=function(h){return h&&h.bit&&h.ccBits};function c(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+o)}}r.from=function(h,v){if(r.isValid(h))return h;try{return c(h)}catch{return v}}})(Gr)),Gr}var Vh;function Z1(){return Vh||(Vh=1,(function(r){const f=In(),d=g0(),c=us(),o=Fn(),h=p0(),v=7973,E=f.getBCHDigit(v);function m(O,U,Y){for(let K=1;K<=40;K++)if(U<=r.getCapacity(K,Y,O))return K}function b(O,U){return o.getCharCountIndicator(O,U)+4}function k(O,U){let Y=0;return O.forEach(function(K){const ct=b(K.mode,U);Y+=ct+K.getBitsLength()}),Y}function z(O,U){for(let Y=1;Y<=40;Y++)if(k(O,Y)<=r.getCapacity(Y,U,o.MIXED))return Y}r.from=function(U,Y){return h.isValid(U)?parseInt(U,10):Y},r.getCapacity=function(U,Y,K){if(!h.isValid(U))throw new Error("Invalid QR Code version");typeof K>"u"&&(K=o.BYTE);const ct=f.getSymbolTotalCodewords(U),H=d.getTotalCodewordsCount(U,Y),B=(ct-H)*8;if(K===o.MIXED)return B;const j=B-b(K,U);switch(K){case o.NUMERIC:return Math.floor(j/10*3);case o.ALPHANUMERIC:return Math.floor(j/11*2);case o.KANJI:return Math.floor(j/13);case o.BYTE:default:return Math.floor(j/8)}},r.getBestVersionForData=function(U,Y){let K;const ct=c.from(Y,c.M);if(Array.isArray(U)){if(U.length>1)return z(U,ct);if(U.length===0)return 1;K=U[0]}else K=U;return m(K.mode,K.getLength(),ct)},r.getEncodedBits=function(U){if(!h.isValid(U)||U<7)throw new Error("Invalid QR Code version");let Y=U<<12;for(;f.getBCHDigit(Y)-E>=0;)Y^=v<<f.getBCHDigit(Y)-E;return U<<12|Y}})(Yr)),Yr}var Xr={},Zh;function K1(){if(Zh)return Xr;Zh=1;const r=In(),f=1335,d=21522,c=r.getBCHDigit(f);return Xr.getEncodedBits=function(h,v){const E=h.bit<<3|v;let m=E<<10;for(;r.getBCHDigit(m)-c>=0;)m^=f<<r.getBCHDigit(m)-c;return(E<<10|m)^d},Xr}var Vr={},Zr,Kh;function J1(){if(Kh)return Zr;Kh=1;const r=Fn();function f(d){this.mode=r.NUMERIC,this.data=d.toString()}return f.getBitsLength=function(c){return 10*Math.floor(c/3)+(c%3?c%3*3+1:0)},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(c){let o,h,v;for(o=0;o+3<=this.data.length;o+=3)h=this.data.substr(o,3),v=parseInt(h,10),c.put(v,10);const E=this.data.length-o;E>0&&(h=this.data.substr(o),v=parseInt(h,10),c.put(v,E*3+1))},Zr=f,Zr}var Kr,Jh;function I1(){if(Jh)return Kr;Jh=1;const r=Fn(),f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function d(c){this.mode=r.ALPHANUMERIC,this.data=c}return d.getBitsLength=function(o){return 11*Math.floor(o/2)+6*(o%2)},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(o){let h;for(h=0;h+2<=this.data.length;h+=2){let v=f.indexOf(this.data[h])*45;v+=f.indexOf(this.data[h+1]),o.put(v,11)}this.data.length%2&&o.put(f.indexOf(this.data[h]),6)},Kr=d,Kr}var Jr,Ih;function F1(){if(Ih)return Jr;Ih=1;const r=Fn();function f(d){this.mode=r.BYTE,typeof d=="string"?this.data=new TextEncoder().encode(d):this.data=new Uint8Array(d)}return f.getBitsLength=function(c){return c*8},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(d){for(let c=0,o=this.data.length;c<o;c++)d.put(this.data[c],8)},Jr=f,Jr}var Ir,Fh;function W1(){if(Fh)return Ir;Fh=1;const r=Fn(),f=In();function d(c){this.mode=r.KANJI,this.data=c}return d.getBitsLength=function(o){return o*13},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(c){let o;for(o=0;o<this.data.length;o++){let h=f.toSJIS(this.data[o]);if(h>=33088&&h<=40956)h-=33088;else if(h>=57408&&h<=60351)h-=49472;else throw new Error("Invalid SJIS character: "+this.data[o]+`
Make sure your charset is UTF-8`);h=(h>>>8&255)*192+(h&255),c.put(h,13)}},Ir=d,Ir}var Fr={exports:{}},Wh;function $1(){return Wh||(Wh=1,(function(r){var f={single_source_shortest_paths:function(d,c,o){var h={},v={};v[c]=0;var E=f.PriorityQueue.make();E.push(c,0);for(var m,b,k,z,O,U,Y,K,ct;!E.empty();){m=E.pop(),b=m.value,z=m.cost,O=d[b]||{};for(k in O)O.hasOwnProperty(k)&&(U=O[k],Y=z+U,K=v[k],ct=typeof v[k]>"u",(ct||K>Y)&&(v[k]=Y,E.push(k,Y),h[k]=b))}if(typeof o<"u"&&typeof v[o]>"u"){var H=["Could not find a path from ",c," to ",o,"."].join("");throw new Error(H)}return h},extract_shortest_path_from_predecessor_list:function(d,c){for(var o=[],h=c;h;)o.push(h),d[h],h=d[h];return o.reverse(),o},find_path:function(d,c,o){var h=f.single_source_shortest_paths(d,c,o);return f.extract_shortest_path_from_predecessor_list(h,o)},PriorityQueue:{make:function(d){var c=f.PriorityQueue,o={},h;d=d||{};for(h in c)c.hasOwnProperty(h)&&(o[h]=c[h]);return o.queue=[],o.sorter=d.sorter||c.default_sorter,o},default_sorter:function(d,c){return d.cost-c.cost},push:function(d,c){var o={value:d,cost:c};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=f})(Fr)),Fr.exports}var $h;function P1(){return $h||($h=1,(function(r){const f=Fn(),d=J1(),c=I1(),o=F1(),h=W1(),v=y0(),E=In(),m=$1();function b(H){return unescape(encodeURIComponent(H)).length}function k(H,B,j){const Z=[];let ot;for(;(ot=H.exec(j))!==null;)Z.push({data:ot[0],index:ot.index,mode:B,length:ot[0].length});return Z}function z(H){const B=k(v.NUMERIC,f.NUMERIC,H),j=k(v.ALPHANUMERIC,f.ALPHANUMERIC,H);let Z,ot;return E.isKanjiModeEnabled()?(Z=k(v.BYTE,f.BYTE,H),ot=k(v.KANJI,f.KANJI,H)):(Z=k(v.BYTE_KANJI,f.BYTE,H),ot=[]),B.concat(j,Z,ot).sort(function(q,L){return q.index-L.index}).map(function(q){return{data:q.data,mode:q.mode,length:q.length}})}function O(H,B){switch(B){case f.NUMERIC:return d.getBitsLength(H);case f.ALPHANUMERIC:return c.getBitsLength(H);case f.KANJI:return h.getBitsLength(H);case f.BYTE:return o.getBitsLength(H)}}function U(H){return H.reduce(function(B,j){const Z=B.length-1>=0?B[B.length-1]:null;return Z&&Z.mode===j.mode?(B[B.length-1].data+=j.data,B):(B.push(j),B)},[])}function Y(H){const B=[];for(let j=0;j<H.length;j++){const Z=H[j];switch(Z.mode){case f.NUMERIC:B.push([Z,{data:Z.data,mode:f.ALPHANUMERIC,length:Z.length},{data:Z.data,mode:f.BYTE,length:Z.length}]);break;case f.ALPHANUMERIC:B.push([Z,{data:Z.data,mode:f.BYTE,length:Z.length}]);break;case f.KANJI:B.push([Z,{data:Z.data,mode:f.BYTE,length:b(Z.data)}]);break;case f.BYTE:B.push([{data:Z.data,mode:f.BYTE,length:b(Z.data)}])}}return B}function K(H,B){const j={},Z={start:{}};let ot=["start"];for(let Q=0;Q<H.length;Q++){const q=H[Q],L=[];for(let X=0;X<q.length;X++){const et=q[X],$=""+Q+X;L.push($),j[$]={node:et,lastCount:0},Z[$]={};for(let F=0;F<ot.length;F++){const P=ot[F];j[P]&&j[P].node.mode===et.mode?(Z[P][$]=O(j[P].lastCount+et.length,et.mode)-O(j[P].lastCount,et.mode),j[P].lastCount+=et.length):(j[P]&&(j[P].lastCount=et.length),Z[P][$]=O(et.length,et.mode)+4+f.getCharCountIndicator(et.mode,B))}}ot=L}for(let Q=0;Q<ot.length;Q++)Z[ot[Q]].end=0;return{map:Z,table:j}}function ct(H,B){let j;const Z=f.getBestModeForData(H);if(j=f.from(B,Z),j!==f.BYTE&&j.bit<Z.bit)throw new Error('"'+H+'" cannot be encoded with mode '+f.toString(j)+`.
 Suggested mode is: `+f.toString(Z));switch(j===f.KANJI&&!E.isKanjiModeEnabled()&&(j=f.BYTE),j){case f.NUMERIC:return new d(H);case f.ALPHANUMERIC:return new c(H);case f.KANJI:return new h(H);case f.BYTE:return new o(H)}}r.fromArray=function(B){return B.reduce(function(j,Z){return typeof Z=="string"?j.push(ct(Z,null)):Z.data&&j.push(ct(Z.data,Z.mode)),j},[])},r.fromString=function(B,j){const Z=z(B,E.isKanjiModeEnabled()),ot=Y(Z),Q=K(ot,j),q=m.find_path(Q.map,"start","end"),L=[];for(let X=1;X<q.length-1;X++)L.push(Q.table[q[X]].node);return r.fromArray(U(L))},r.rawSplit=function(B){return r.fromArray(z(B,E.isKanjiModeEnabled()))}})(Vr)),Vr}var Ph;function tp(){if(Ph)return Dr;Ph=1;const r=In(),f=us(),d=j1(),c=L1(),o=q1(),h=Y1(),v=G1(),E=g0(),m=V1(),b=Z1(),k=K1(),z=Fn(),O=P1();function U(Q,q){const L=Q.size,X=h.getPositions(q);for(let et=0;et<X.length;et++){const $=X[et][0],F=X[et][1];for(let P=-1;P<=7;P++)if(!($+P<=-1||L<=$+P))for(let lt=-1;lt<=7;lt++)F+lt<=-1||L<=F+lt||(P>=0&&P<=6&&(lt===0||lt===6)||lt>=0&&lt<=6&&(P===0||P===6)||P>=2&&P<=4&&lt>=2&&lt<=4?Q.set($+P,F+lt,!0,!0):Q.set($+P,F+lt,!1,!0))}}function Y(Q){const q=Q.size;for(let L=8;L<q-8;L++){const X=L%2===0;Q.set(L,6,X,!0),Q.set(6,L,X,!0)}}function K(Q,q){const L=o.getPositions(q);for(let X=0;X<L.length;X++){const et=L[X][0],$=L[X][1];for(let F=-2;F<=2;F++)for(let P=-2;P<=2;P++)F===-2||F===2||P===-2||P===2||F===0&&P===0?Q.set(et+F,$+P,!0,!0):Q.set(et+F,$+P,!1,!0)}}function ct(Q,q){const L=Q.size,X=b.getEncodedBits(q);let et,$,F;for(let P=0;P<18;P++)et=Math.floor(P/3),$=P%3+L-8-3,F=(X>>P&1)===1,Q.set(et,$,F,!0),Q.set($,et,F,!0)}function H(Q,q,L){const X=Q.size,et=k.getEncodedBits(q,L);let $,F;for($=0;$<15;$++)F=(et>>$&1)===1,$<6?Q.set($,8,F,!0):$<8?Q.set($+1,8,F,!0):Q.set(X-15+$,8,F,!0),$<8?Q.set(8,X-$-1,F,!0):$<9?Q.set(8,15-$-1+1,F,!0):Q.set(8,15-$-1,F,!0);Q.set(X-8,8,1,!0)}function B(Q,q){const L=Q.size;let X=-1,et=L-1,$=7,F=0;for(let P=L-1;P>0;P-=2)for(P===6&&P--;;){for(let lt=0;lt<2;lt++)if(!Q.isReserved(et,P-lt)){let Lt=!1;F<q.length&&(Lt=(q[F]>>>$&1)===1),Q.set(et,P-lt,Lt),$--,$===-1&&(F++,$=7)}if(et+=X,et<0||L<=et){et-=X,X=-X;break}}}function j(Q,q,L){const X=new d;L.forEach(function(lt){X.put(lt.mode.bit,4),X.put(lt.getLength(),z.getCharCountIndicator(lt.mode,Q)),lt.write(X)});const et=r.getSymbolTotalCodewords(Q),$=E.getTotalCodewordsCount(Q,q),F=(et-$)*8;for(X.getLengthInBits()+4<=F&&X.put(0,4);X.getLengthInBits()%8!==0;)X.putBit(0);const P=(F-X.getLengthInBits())/8;for(let lt=0;lt<P;lt++)X.put(lt%2?17:236,8);return Z(X,Q,q)}function Z(Q,q,L){const X=r.getSymbolTotalCodewords(q),et=E.getTotalCodewordsCount(q,L),$=X-et,F=E.getBlocksCount(q,L),P=X%F,lt=F-P,Lt=Math.floor(X/F),N=Math.floor($/F),V=N+1,nt=Lt-N,Tt=new m(nt);let wt=0;const S=new Array(F),D=new Array(F);let G=0;const I=new Uint8Array(Q.buffer);for(let Ct=0;Ct<F;Ct++){const He=Ct<lt?N:V;S[Ct]=I.slice(wt,wt+He),D[Ct]=Tt.encode(S[Ct]),wt+=He,G=Math.max(G,He)}const it=new Uint8Array(X);let ft=0,dt,zt;for(dt=0;dt<G;dt++)for(zt=0;zt<F;zt++)dt<S[zt].length&&(it[ft++]=S[zt][dt]);for(dt=0;dt<nt;dt++)for(zt=0;zt<F;zt++)it[ft++]=D[zt][dt];return it}function ot(Q,q,L,X){let et;if(Array.isArray(Q))et=O.fromArray(Q);else if(typeof Q=="string"){let Lt=q;if(!Lt){const N=O.rawSplit(Q);Lt=b.getBestVersionForData(N,L)}et=O.fromString(Q,Lt||40)}else throw new Error("Invalid data");const $=b.getBestVersionForData(et,L);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!q)q=$;else if(q<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const F=j(q,L,et),P=r.getSymbolSize(q),lt=new c(P);return U(lt,q),Y(lt),K(lt,q),H(lt,L,0),q>=7&&ct(lt,q),B(lt,F),isNaN(X)&&(X=v.getBestMask(lt,H.bind(null,lt,L))),v.applyMask(X,lt),H(lt,L,X),{modules:lt,version:q,errorCorrectionLevel:L,maskPattern:X,segments:et}}return Dr.create=function(q,L){if(typeof q>"u"||q==="")throw new Error("No input text");let X=f.M,et,$;return typeof L<"u"&&(X=f.from(L.errorCorrectionLevel,f.M),et=b.from(L.version),$=v.from(L.maskPattern),L.toSJISFunc&&r.setToSJISFunction(L.toSJISFunc)),ot(q,et,X,$)},Dr}var Wr={},$r={},t0;function v0(){return t0||(t0=1,(function(r){function f(d){if(typeof d=="number"&&(d=d.toString()),typeof d!="string")throw new Error("Color should be defined as hex string");let c=d.slice().replace("#","").split("");if(c.length<3||c.length===5||c.length>8)throw new Error("Invalid hex color: "+d);(c.length===3||c.length===4)&&(c=Array.prototype.concat.apply([],c.map(function(h){return[h,h]}))),c.length===6&&c.push("F","F");const o=parseInt(c.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+c.slice(0,6).join("")}}r.getOptions=function(c){c||(c={}),c.color||(c.color={});const o=typeof c.margin>"u"||c.margin===null||c.margin<0?4:c.margin,h=c.width&&c.width>=21?c.width:void 0,v=c.scale||4;return{width:h,scale:h?4:v,margin:o,color:{dark:f(c.color.dark||"#000000ff"),light:f(c.color.light||"#ffffffff")},type:c.type,rendererOpts:c.rendererOpts||{}}},r.getScale=function(c,o){return o.width&&o.width>=c+o.margin*2?o.width/(c+o.margin*2):o.scale},r.getImageWidth=function(c,o){const h=r.getScale(c,o);return Math.floor((c+o.margin*2)*h)},r.qrToImageData=function(c,o,h){const v=o.modules.size,E=o.modules.data,m=r.getScale(v,h),b=Math.floor((v+h.margin*2)*m),k=h.margin*m,z=[h.color.light,h.color.dark];for(let O=0;O<b;O++)for(let U=0;U<b;U++){let Y=(O*b+U)*4,K=h.color.light;if(O>=k&&U>=k&&O<b-k&&U<b-k){const ct=Math.floor((O-k)/m),H=Math.floor((U-k)/m);K=z[E[ct*v+H]?1:0]}c[Y++]=K.r,c[Y++]=K.g,c[Y++]=K.b,c[Y]=K.a}}})($r)),$r}var e0;function ep(){return e0||(e0=1,(function(r){const f=v0();function d(o,h,v){o.clearRect(0,0,h.width,h.height),h.style||(h.style={}),h.height=v,h.width=v,h.style.height=v+"px",h.style.width=v+"px"}function c(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(h,v,E){let m=E,b=v;typeof m>"u"&&(!v||!v.getContext)&&(m=v,v=void 0),v||(b=c()),m=f.getOptions(m);const k=f.getImageWidth(h.modules.size,m),z=b.getContext("2d"),O=z.createImageData(k,k);return f.qrToImageData(O.data,h,m),d(z,b,k),z.putImageData(O,0,0),b},r.renderToDataURL=function(h,v,E){let m=E;typeof m>"u"&&(!v||!v.getContext)&&(m=v,v=void 0),m||(m={});const b=r.render(h,v,m),k=m.type||"image/png",z=m.rendererOpts||{};return b.toDataURL(k,z.quality)}})(Wr)),Wr}var Pr={},n0;function np(){if(n0)return Pr;n0=1;const r=v0();function f(o,h){const v=o.a/255,E=h+'="'+o.hex+'"';return v<1?E+" "+h+'-opacity="'+v.toFixed(2).slice(1)+'"':E}function d(o,h,v){let E=o+h;return typeof v<"u"&&(E+=" "+v),E}function c(o,h,v){let E="",m=0,b=!1,k=0;for(let z=0;z<o.length;z++){const O=Math.floor(z%h),U=Math.floor(z/h);!O&&!b&&(b=!0),o[z]?(k++,z>0&&O>0&&o[z-1]||(E+=b?d("M",O+v,.5+U+v):d("m",m,0),m=0,b=!1),O+1<h&&o[z+1]||(E+=d("h",k),k=0)):m++}return E}return Pr.render=function(h,v,E){const m=r.getOptions(v),b=h.modules.size,k=h.modules.data,z=b+m.margin*2,O=m.color.light.a?"<path "+f(m.color.light,"fill")+' d="M0 0h'+z+"v"+z+'H0z"/>':"",U="<path "+f(m.color.dark,"stroke")+' d="'+c(k,b,m.margin)+'"/>',Y='viewBox="0 0 '+z+" "+z+'"',ct='<svg xmlns="http://www.w3.org/2000/svg" '+(m.width?'width="'+m.width+'" height="'+m.width+'" ':"")+Y+' shape-rendering="crispEdges">'+O+U+`</svg>
`;return typeof E=="function"&&E(null,ct),ct},Pr}var a0;function ap(){if(a0)return Ha;a0=1;const r=U1(),f=tp(),d=ep(),c=np();function o(h,v,E,m,b){const k=[].slice.call(arguments,1),z=k.length,O=typeof k[z-1]=="function";if(!O&&!r())throw new Error("Callback required as last argument");if(O){if(z<2)throw new Error("Too few arguments provided");z===2?(b=E,E=v,v=m=void 0):z===3&&(v.getContext&&typeof b>"u"?(b=m,m=void 0):(b=m,m=E,E=v,v=void 0))}else{if(z<1)throw new Error("Too few arguments provided");return z===1?(E=v,v=m=void 0):z===2&&!v.getContext&&(m=E,E=v,v=void 0),new Promise(function(U,Y){try{const K=f.create(E,m);U(h(K,v,m))}catch(K){Y(K)}})}try{const U=f.create(E,m);b(null,h(U,v,m))}catch(U){b(U)}}return Ha.create=f.create,Ha.toCanvas=o.bind(null,d.render),Ha.toDataURL=o.bind(null,d.renderToDataURL),Ha.toString=o.bind(null,function(h,v,E){return c.render(h,E)}),Ha}var lp=ap();const ip=Qg(lp),ts=`${window.location.origin}/hpde/pr-preview/pr-149/`;function up(){const[r,f]=vt.useState(!1),[d,c]=vt.useState(null);vt.useEffect(()=>{window.scrollTo(0,0),ip.toDataURL(ts,{margin:1,width:240}).then(c).catch(()=>c(null))},[]);async function o(){await navigator.clipboard.writeText(ts),f(!0),setTimeout(()=>f(!1),2e3)}return p.jsx("div",{className:"min-h-screen bg-gray-50",children:p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),p.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:p.jsx(ls,{size:18})})]}),p.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),p.jsxs("button",{onClick:o,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[p.jsx("span",{className:"truncate text-sm text-gray-800",children:ts}),r?p.jsx(iu,{size:16,className:"shrink-0 text-green-600"}):p.jsx(f0,{size:16,className:"shrink-0 text-gray-400"})]}),p.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:d&&p.jsx("img",{src:d,alt:"QR code for schedule link",width:240,height:240})})]})})}const cp=350,rp="cubic-bezier(0.32, 0.72, 0, 1)";function sp(r){try{return new URL(r).hostname.replace(/^www\./,"")}catch{return r}}function op(r){const f=r.trim().toLowerCase();return f==="clockwise"?"CW (clockwise)":f==="counter-clockwise"||f==="counterclockwise"?"CCW (counter-clockwise)":r}function fp(r,f){return[r,f&&op(f)].filter(Boolean).join(" ")}function kl({icon:r,label:f,subtitle:d,children:c}){return p.jsxs("div",{className:"grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[p.jsxs("span",{className:"flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[p.jsx(r,{size:14,className:"shrink-0 text-gray-400"}),f]}),p.jsxs("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:[c,d&&p.jsx("span",{className:"mt-0.5 block text-xs font-normal text-gray-400",children:d})]})]})}function dp({event:r,open:f,onClose:d}){var E;vt.useEffect(()=>{if(!f)return;const m=b=>{b.key==="Escape"&&d()};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[f,d]);const c=m1(r.days),o=fp(r.configuration,r.direction),h=!!((E=r.scheduleScans)!=null&&E.length),v=c||r.organizer||r.track||o||r.link||h;return p.jsxs(p.Fragment,{children:[p.jsx("div",{"aria-hidden":"true",inert:!f,onClick:d,className:"fixed inset-0 z-40",style:{pointerEvents:f?"auto":"none"}}),p.jsx("div",{role:"dialog","aria-modal":f,"aria-labelledby":"event-details-title",inert:!f,className:"fixed inset-y-0 right-0 z-50 flex w-full bg-white md:w-[480px] md:max-w-[60vw]",style:{transform:f?"translate3d(0,0,0)":"translate3d(100%,0,0)",transition:`transform ${cp}ms ${rp}`,boxShadow:f?"-8px 0 24px rgba(0,0,0,0.08)":"none",willChange:"transform"},children:p.jsxs("div",{className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none",children:[p.jsxs("div",{className:"mb-5 flex items-start gap-2 md:justify-between md:gap-4",children:[p.jsx("button",{onClick:d,"aria-label":"Back",className:"inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden",children:p.jsx(a1,{size:20})}),p.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"}),p.jsx("button",{onClick:d,"aria-label":"Close",className:"hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid",children:p.jsx(ls,{size:20})})]}),v?p.jsxs(p.Fragment,{children:[p.jsxs("div",{className:"pl-1",children:[c&&p.jsx(kl,{icon:s0,label:"Dates",children:c}),r.organizer&&p.jsx(kl,{icon:d1,label:"Organizer",children:r.organizer}),r.track&&p.jsx(kl,{icon:r1,label:"Location",subtitle:r.city,children:r.track}),o&&p.jsx(kl,{icon:f1,label:"Track config",children:o}),r.link&&p.jsx(kl,{icon:c1,label:"Event page",children:p.jsxs("a",{href:r.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[sp(r.link),p.jsx(l1,{size:12,className:"text-gray-400"})]})})]}),h&&p.jsxs("div",{className:"mt-6 pl-1",children:[p.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[p.jsx(i1,{size:14,className:"shrink-0 text-gray-400"}),"Original schedule"]}),p.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:r.scheduleScans.map((m,b)=>p.jsx("a",{href:m,target:"_blank",rel:"noopener noreferrer",children:p.jsx("img",{src:m,alt:`Original schedule scan ${b+1}`,className:"aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"})},m))})]})]}):p.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})})]})}function Ua(r,f){const d=f.split(`
`).map(ct=>ct.trim());let c="",o,h,v,E,m,b,k,z;const O=[],U=[];let Y=null,K=!1;for(const ct of d){if(!ct||ct.startsWith("//"))continue;const H=ct.replace(/^-\s+/,"");if(H.startsWith("# ")){c=H.slice(2).trim();continue}if(H.startsWith("subtitle:")){o=H.slice(9).trim()||void 0;continue}if(H.startsWith("link:")){h=H.slice(5).trim()||void 0;continue}if(H.startsWith("organizer:")){v=H.slice(10).trim()||void 0;continue}if(H.startsWith("trackId:")){m=H.slice(8).trim()||void 0;continue}if(H.startsWith("track:")){E=H.slice(6).trim()||void 0;continue}if(H.startsWith("city:")){b=H.slice(5).trim()||void 0;continue}if(H.startsWith("configuration:")){k=H.slice(14).trim()||void 0;continue}if(H.startsWith("config:")){k=H.slice(7).trim()||void 0;continue}if(H.startsWith("direction:")){z=H.slice(10).trim()||void 0;continue}if(H.startsWith("## ")){const B=H.slice(3).trim();if(B.toLowerCase()==="groups"){K=!0,Y=null;continue}const j=B.split("|").map(Z=>Z.trim());j.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(j[1])?(K=!1,Y={id:j[0].toLowerCase().replace(/\s+/g,"-"),label:j[0],date:j[1],activities:[]},U.push(Y)):K=!1;continue}if(K){const B=H.split("|").map(j=>j.trim());if(B.length>=4){const j=B[4]||void 0;O.push({id:B[0],label:B[1],bgClass:B[2],textClass:B[3],...j?{description:j}:{}})}continue}if(Y){if(/^\d{2}:\d{2}/.test(H)){const B=hp(H);B&&Y.activities.push(B)}else if(/^break\s*\|/.test(H)){const B=H.slice(H.indexOf("|")+1).trim();Y.activities.push({type:"break",label:B})}}}return{id:r,name:c,...o?{subtitle:o}:{},...h?{link:h}:{},...v?{organizer:v}:{},...E?{track:E}:{},...m?{trackId:m}:{},...b?{city:b}:{},...k?{configuration:k}:{},...z?{direction:z}:{},runGroups:O,days:U}}function hp(r){const f=r.split("|").map(E=>E.trim()),d=f[0],c=f.slice(1),o=d.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!o)return null;const h=o[1],v=o[2].trim();if(/^(general|lunch|special)$/.test(v)){const E=v,m=c[0]??"",b=c[1]||void 0;return{time:h,type:E,label:m,...b?{subtitle:b}:{}}}if(/^session/.test(v)){const E=v.match(/^session\s+(\d+)/),m=E?parseInt(E[1],10):void 0;let b=[],k=[],z;for(const O of c)O.startsWith("track:")?b=O.slice(6).trim().split(",").map(U=>U.trim()).filter(Boolean):O.startsWith("class:")?k=O.slice(6).trim().split(",").map(U=>U.trim()).filter(Boolean):O.startsWith("note:")&&(z=O.slice(5).trim()||void 0);return{time:h,type:"session",...m!==void 0?{sessionNumber:m}:{},onTrack:b,...k.length?{inClass:k}:{},...z?{note:z}:{}}}return null}const mp=`# TDE at MSRC 1.7CW

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
`,cs="/hpde/pr-preview/pr-149/assets/msrc-1-7-D9G0r_nf.jpg",gp={...Ua("2026-09-11_msrc-1-7",mp),mapImage:cs},pp=`# SCCA at MSRC 1.7 CW

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
`,yp={...Ua("2026-09-13_msr-scca",pp),mapImage:cs},vp=`# TDE at MSRC 1.7 Fast Track

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
`,bp={...Ua("2026-06-06_msrc-1-7",vp),mapImage:cs},Sp=`# TDE at MSRC 3.1

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
`,wp="/hpde/pr-preview/pr-149/assets/msrc-3-1-BsOP6CK2.png",Ep={...Ua("2025-11-07_msrc-3-1",Sp),mapImage:wp},Tp=`# TDE at ECR 2.7

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
`,xp="/hpde/pr-preview/pr-149/assets/ecr-BW_3Ndfh.png",Ap={...Ua("2026-05-30_ecr-2-7",Tp),mapImage:xp},Cp=`# Test Event

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
`,l0=Ua("test-live",Cp),Np={...l0,days:l0.days.map(r=>({...r,date:Ol()}))},au=[gp,yp,bp,Ap,Ep].sort((r,f)=>f.id.localeCompare(r.id)),i0=[...au,Np];function tu(r,f){const[d,c]=vt.useState(()=>{try{const o=localStorage.getItem(r);return o!==null?JSON.parse(o):f}catch{return f}});return vt.useEffect(()=>{localStorage.setItem(r,JSON.stringify(d))},[r,d]),[d,c]}function b0(r){const f=Ol();return r.days.find(d=>d.date===f)}function u0(r){return b0(r)??r.days[0]}function _p(){const[r,f]=vt.useState(()=>window.location.hash);vt.useEffect(()=>{const c=()=>{f(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",c),()=>window.removeEventListener("hashchange",c)},[]);function d(c){window.location.hash!==c&&(window.location.hash=c)}return[r,d]}const ns="#/event/";function c0(r){return`${ns}${encodeURIComponent(r)}`}function Mp(r){return r.startsWith(ns)?decodeURIComponent(r.slice(ns.length)):null}function Rp(){const[r,f]=_p(),[d,c]=vt.useState("schedule"),[o,h]=tu("hpde:activeEvent",au[0].id),[v,E]=tu("hpde:activeDay",null),[m,b]=tu("hpde:groups",[]),[k,z]=tu("hpde:hidePast",!1),[O,U]=vt.useState(!1),Y=i0.find(L=>L.id===o)??au[0],K=Y.days.find(L=>L.id===v)??u0(Y),ct=b0(Y),H=K.date===Ol(),B=Y.days.length>1,Z=Y.days.reduce((L,X)=>X.date>L?X.date:L,Y.days[0].date)<Ol(),[,ot]=vt.useState(0);vt.useEffect(()=>{if(!H)return;const L=setInterval(()=>ot(X=>X+1),6e4);return()=>clearInterval(L)},[H]);const Q=H&&K.activities.some(L=>L.type!=="break"&&en(L.time)<is());function q(L){h(L.id),E(u0(L).id),b([]),f(c0(L.id))}return vt.useEffect(()=>{const L=Mp(r);if(L){const X=i0.find(et=>et.id===L);X&&X.id!==o&&q(X);return}(r===""||r==="#")&&f(c0(o))},[r]),r==="#/widget-script"?p.jsx(H1,{}):r==="#/share"?p.jsx(up,{}):p.jsxs(p.Fragment,{children:[p.jsx(O1,{children:p.jsxs("div",{className:"min-h-screen bg-gray-50",children:[p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[p.jsx(z1,{events:au,active:Y,onChange:q,onOpenDetails:()=>U(!0)}),p.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[p.jsx("button",{onClick:()=>c("schedule"),className:`rounded-md p-2 transition-colors ${d==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:p.jsx(s0,{size:18})}),p.jsx("button",{onClick:()=>c("map"),className:`rounded-md p-2 transition-colors ${d==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:p.jsx(wh,{size:18})})]})]}),Z&&p.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),d==="schedule"&&p.jsxs(p.Fragment,{children:[B&&p.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[p.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:Y.days.map(L=>p.jsx("button",{onClick:()=>E(L.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${K.id===L.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:L.label},L.id))}),p.jsx("button",{onClick:()=>ct&&E(ct.id),disabled:H||!ct,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${H||!ct?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx(T1,{groups:Y.runGroups,selected:m,onChange:b}),Q&&p.jsx(D1,{checked:k,onChange:()=>z(L=>!L),label:"Hide past activities"})]}),p.jsx(E1,{activities:K.activities,runGroups:Y.runGroups,isToday:H,selectedGroups:m,hidePast:k}),p.jsx(B1,{groups:Y.runGroups})]}),d==="map"&&(Y.mapImage?p.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:p.jsx("img",{src:Y.mapImage,alt:`${Y.name} track map`,className:"block w-full h-auto"})}):p.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:p.jsxs("div",{className:"text-center",children:[p.jsx(wh,{size:40,className:"mx-auto mb-2 opacity-30"}),p.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),p.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[p.jsxs("div",{children:[p.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",p.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),p.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",b1("2026-09-17T23:05:44-05:00")]})]})]})}),p.jsx(dp,{event:Y,open:O,onClose:()=>U(!1)})]})}Pg.createRoot(document.getElementById("root")).render(p.jsx(vt.StrictMode,{children:p.jsx(Rp,{})}));
