(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const b of d.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&o(b)}).observe(document,{childList:!0,subtree:!0});function h(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(c){if(c.ep)return;c.ep=!0;const d=h(c);fetch(c.href,d)}})();function L0(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Es={exports:{}},Dl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sh;function q0(){if(sh)return Dl;sh=1;var s=Symbol.for("react.transitional.element"),f=Symbol.for("react.fragment");function h(o,c,d){var b=null;if(d!==void 0&&(b=""+d),c.key!==void 0&&(b=""+c.key),"key"in c){d={};for(var T in c)T!=="key"&&(d[T]=c[T])}else d=c;return c=d.ref,{$$typeof:s,type:o,key:b,ref:c!==void 0?c:null,props:d}}return Dl.Fragment=f,Dl.jsx=h,Dl.jsxs=h,Dl}var rh;function Y0(){return rh||(rh=1,Es.exports=q0()),Es.exports}var y=Y0(),xs={exports:{}},ot={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ch;function G0(){if(ch)return ot;ch=1;var s=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),b=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),z=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),O=Symbol.iterator;function U(w){return w===null||typeof w!="object"?null:(w=O&&w[O]||w["@@iterator"],typeof w=="function"?w:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Z=Object.assign,J={};function q(w,k,G){this.props=w,this.context=k,this.refs=J,this.updater=G||L}q.prototype.isReactComponent={},q.prototype.setState=function(w,k){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,k,"setState")},q.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function H(){}H.prototype=q.prototype;function Y(w,k,G){this.props=w,this.context=k,this.refs=J,this.updater=G||L}var K=Y.prototype=new H;K.constructor=Y,Z(K,q.prototype),K.isPureReactComponent=!0;var ct=Array.isArray;function V(){}var j={H:null,A:null,T:null,S:null},B=Object.prototype.hasOwnProperty;function X(w,k,G){var F=G.ref;return{$$typeof:s,type:w,key:k,ref:F!==void 0?F:null,props:G}}function nt(w,k){return X(w.type,k,w.props)}function P(w){return typeof w=="object"&&w!==null&&w.$$typeof===s}function W(w){var k={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(G){return k[G]})}var tt=/\/+/g;function it(w,k){return typeof w=="object"&&w!==null&&w.key!=null?W(""+w.key):k.toString(36)}function Lt(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(V,V):(w.status="pending",w.then(function(k){w.status==="pending"&&(w.status="fulfilled",w.value=k)},function(k){w.status==="pending"&&(w.status="rejected",w.reason=k)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function N(w,k,G,F,ut){var ft=typeof w;(ft==="undefined"||ft==="boolean")&&(w=null);var dt=!1;if(w===null)dt=!0;else switch(ft){case"bigint":case"string":case"number":dt=!0;break;case"object":switch(w.$$typeof){case s:case f:dt=!0;break;case z:return dt=w._init,N(dt(w._payload),k,G,F,ut)}}if(dt)return ut=ut(w),dt=F===""?"."+it(w,0):F,ct(ut)?(G="",dt!=null&&(G=dt.replace(tt,"$&/")+"/"),N(ut,k,G,"",function(He){return He})):ut!=null&&(P(ut)&&(ut=nt(ut,G+(ut.key==null||w&&w.key===ut.key?"":(""+ut.key).replace(tt,"$&/")+"/")+dt)),k.push(ut)),1;dt=0;var Rt=F===""?".":F+":";if(ct(w))for(var Ct=0;Ct<w.length;Ct++)F=w[Ct],ft=Rt+it(F,Ct),dt+=N(F,k,G,ft,ut);else if(Ct=U(w),typeof Ct=="function")for(w=Ct.call(w),Ct=0;!(F=w.next()).done;)F=F.value,ft=Rt+it(F,Ct++),dt+=N(F,k,G,ft,ut);else if(ft==="object"){if(typeof w.then=="function")return N(Lt(w),k,G,F,ut);throw k=String(w),Error("Objects are not valid as a React child (found: "+(k==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":k)+"). If you meant to render a collection of children, use an array instead.")}return dt}function Q(w,k,G){if(w==null)return w;var F=[],ut=0;return N(w,F,"","",function(ft){return k.call(G,ft,ut++)}),F}function at(w){if(w._status===-1){var k=w._result;k=k(),k.then(function(G){(w._status===0||w._status===-1)&&(w._status=1,w._result=G)},function(G){(w._status===0||w._status===-1)&&(w._status=2,w._result=G)}),w._status===-1&&(w._status=0,w._result=k)}if(w._status===1)return w._result.default;throw w._result}var Et=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var k=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(k))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},St={map:Q,forEach:function(w,k,G){Q(w,function(){k.apply(this,arguments)},G)},count:function(w){var k=0;return Q(w,function(){k++}),k},toArray:function(w){return Q(w,function(k){return k})||[]},only:function(w){if(!P(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return ot.Activity=D,ot.Children=St,ot.Component=q,ot.Fragment=h,ot.Profiler=c,ot.PureComponent=Y,ot.StrictMode=o,ot.Suspense=g,ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=j,ot.__COMPILER_RUNTIME={__proto__:null,c:function(w){return j.H.useMemoCache(w)}},ot.cache=function(w){return function(){return w.apply(null,arguments)}},ot.cacheSignal=function(){return null},ot.cloneElement=function(w,k,G){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var F=Z({},w.props),ut=w.key;if(k!=null)for(ft in k.key!==void 0&&(ut=""+k.key),k)!B.call(k,ft)||ft==="key"||ft==="__self"||ft==="__source"||ft==="ref"&&k.ref===void 0||(F[ft]=k[ft]);var ft=arguments.length-2;if(ft===1)F.children=G;else if(1<ft){for(var dt=Array(ft),Rt=0;Rt<ft;Rt++)dt[Rt]=arguments[Rt+2];F.children=dt}return X(w.type,ut,F)},ot.createContext=function(w){return w={$$typeof:b,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:d,_context:w},w},ot.createElement=function(w,k,G){var F,ut={},ft=null;if(k!=null)for(F in k.key!==void 0&&(ft=""+k.key),k)B.call(k,F)&&F!=="key"&&F!=="__self"&&F!=="__source"&&(ut[F]=k[F]);var dt=arguments.length-2;if(dt===1)ut.children=G;else if(1<dt){for(var Rt=Array(dt),Ct=0;Ct<dt;Ct++)Rt[Ct]=arguments[Ct+2];ut.children=Rt}if(w&&w.defaultProps)for(F in dt=w.defaultProps,dt)ut[F]===void 0&&(ut[F]=dt[F]);return X(w,ft,ut)},ot.createRef=function(){return{current:null}},ot.forwardRef=function(w){return{$$typeof:T,render:w}},ot.isValidElement=P,ot.lazy=function(w){return{$$typeof:z,_payload:{_status:-1,_result:w},_init:at}},ot.memo=function(w,k){return{$$typeof:p,type:w,compare:k===void 0?null:k}},ot.startTransition=function(w){var k=j.T,G={};j.T=G;try{var F=w(),ut=j.S;ut!==null&&ut(G,F),typeof F=="object"&&F!==null&&typeof F.then=="function"&&F.then(V,Et)}catch(ft){Et(ft)}finally{k!==null&&G.types!==null&&(k.types=G.types),j.T=k}},ot.unstable_useCacheRefresh=function(){return j.H.useCacheRefresh()},ot.use=function(w){return j.H.use(w)},ot.useActionState=function(w,k,G){return j.H.useActionState(w,k,G)},ot.useCallback=function(w,k){return j.H.useCallback(w,k)},ot.useContext=function(w){return j.H.useContext(w)},ot.useDebugValue=function(){},ot.useDeferredValue=function(w,k){return j.H.useDeferredValue(w,k)},ot.useEffect=function(w,k){return j.H.useEffect(w,k)},ot.useEffectEvent=function(w){return j.H.useEffectEvent(w)},ot.useId=function(){return j.H.useId()},ot.useImperativeHandle=function(w,k,G){return j.H.useImperativeHandle(w,k,G)},ot.useInsertionEffect=function(w,k){return j.H.useInsertionEffect(w,k)},ot.useLayoutEffect=function(w,k){return j.H.useLayoutEffect(w,k)},ot.useMemo=function(w,k){return j.H.useMemo(w,k)},ot.useOptimistic=function(w,k){return j.H.useOptimistic(w,k)},ot.useReducer=function(w,k,G){return j.H.useReducer(w,k,G)},ot.useRef=function(w){return j.H.useRef(w)},ot.useState=function(w){return j.H.useState(w)},ot.useSyncExternalStore=function(w,k,G){return j.H.useSyncExternalStore(w,k,G)},ot.useTransition=function(){return j.H.useTransition()},ot.version="19.2.6",ot}var fh;function er(){return fh||(fh=1,xs.exports=G0()),xs.exports}var yt=er(),As={exports:{}},Rl={},Cs={exports:{}},Ns={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dh;function V0(){return dh||(dh=1,(function(s){function f(N,Q){var at=N.length;N.push(Q);t:for(;0<at;){var Et=at-1>>>1,St=N[Et];if(0<c(St,Q))N[Et]=Q,N[at]=St,at=Et;else break t}}function h(N){return N.length===0?null:N[0]}function o(N){if(N.length===0)return null;var Q=N[0],at=N.pop();if(at!==Q){N[0]=at;t:for(var Et=0,St=N.length,w=St>>>1;Et<w;){var k=2*(Et+1)-1,G=N[k],F=k+1,ut=N[F];if(0>c(G,at))F<St&&0>c(ut,G)?(N[Et]=ut,N[F]=at,Et=F):(N[Et]=G,N[k]=at,Et=k);else if(F<St&&0>c(ut,at))N[Et]=ut,N[F]=at,Et=F;else break t}}return Q}function c(N,Q){var at=N.sortIndex-Q.sortIndex;return at!==0?at:N.id-Q.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;s.unstable_now=function(){return d.now()}}else{var b=Date,T=b.now();s.unstable_now=function(){return b.now()-T}}var g=[],p=[],z=1,D=null,O=3,U=!1,L=!1,Z=!1,J=!1,q=typeof setTimeout=="function"?setTimeout:null,H=typeof clearTimeout=="function"?clearTimeout:null,Y=typeof setImmediate<"u"?setImmediate:null;function K(N){for(var Q=h(p);Q!==null;){if(Q.callback===null)o(p);else if(Q.startTime<=N)o(p),Q.sortIndex=Q.expirationTime,f(g,Q);else break;Q=h(p)}}function ct(N){if(Z=!1,K(N),!L)if(h(g)!==null)L=!0,V||(V=!0,W());else{var Q=h(p);Q!==null&&Lt(ct,Q.startTime-N)}}var V=!1,j=-1,B=5,X=-1;function nt(){return J?!0:!(s.unstable_now()-X<B)}function P(){if(J=!1,V){var N=s.unstable_now();X=N;var Q=!0;try{t:{L=!1,Z&&(Z=!1,H(j),j=-1),U=!0;var at=O;try{e:{for(K(N),D=h(g);D!==null&&!(D.expirationTime>N&&nt());){var Et=D.callback;if(typeof Et=="function"){D.callback=null,O=D.priorityLevel;var St=Et(D.expirationTime<=N);if(N=s.unstable_now(),typeof St=="function"){D.callback=St,K(N),Q=!0;break e}D===h(g)&&o(g),K(N)}else o(g);D=h(g)}if(D!==null)Q=!0;else{var w=h(p);w!==null&&Lt(ct,w.startTime-N),Q=!1}}break t}finally{D=null,O=at,U=!1}Q=void 0}}finally{Q?W():V=!1}}}var W;if(typeof Y=="function")W=function(){Y(P)};else if(typeof MessageChannel<"u"){var tt=new MessageChannel,it=tt.port2;tt.port1.onmessage=P,W=function(){it.postMessage(null)}}else W=function(){q(P,0)};function Lt(N,Q){j=q(function(){N(s.unstable_now())},Q)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(N){N.callback=null},s.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<N?Math.floor(1e3/N):5},s.unstable_getCurrentPriorityLevel=function(){return O},s.unstable_next=function(N){switch(O){case 1:case 2:case 3:var Q=3;break;default:Q=O}var at=O;O=Q;try{return N()}finally{O=at}},s.unstable_requestPaint=function(){J=!0},s.unstable_runWithPriority=function(N,Q){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var at=O;O=N;try{return Q()}finally{O=at}},s.unstable_scheduleCallback=function(N,Q,at){var Et=s.unstable_now();switch(typeof at=="object"&&at!==null?(at=at.delay,at=typeof at=="number"&&0<at?Et+at:Et):at=Et,N){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=at+St,N={id:z++,callback:Q,priorityLevel:N,startTime:at,expirationTime:St,sortIndex:-1},at>Et?(N.sortIndex=at,f(p,N),h(g)===null&&N===h(p)&&(Z?(H(j),j=-1):Z=!0,Lt(ct,at-Et))):(N.sortIndex=St,f(g,N),L||U||(L=!0,V||(V=!0,W()))),N},s.unstable_shouldYield=nt,s.unstable_wrapCallback=function(N){var Q=O;return function(){var at=O;O=Q;try{return N.apply(this,arguments)}finally{O=at}}}})(Ns)),Ns}var hh;function X0(){return hh||(hh=1,Cs.exports=V0()),Cs.exports}var _s={exports:{}},Pt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gh;function Q0(){if(gh)return Pt;gh=1;var s=er();function f(g){var p="https://react.dev/errors/"+g;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var z=2;z<arguments.length;z++)p+="&args[]="+encodeURIComponent(arguments[z])}return"Minified React error #"+g+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(){}var o={d:{f:h,r:function(){throw Error(f(522))},D:h,C:h,L:h,m:h,X:h,S:h,M:h},p:0,findDOMNode:null},c=Symbol.for("react.portal");function d(g,p,z){var D=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:c,key:D==null?null:""+D,children:g,containerInfo:p,implementation:z}}var b=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function T(g,p){if(g==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,Pt.createPortal=function(g,p){var z=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(f(299));return d(g,p,null,z)},Pt.flushSync=function(g){var p=b.T,z=o.p;try{if(b.T=null,o.p=2,g)return g()}finally{b.T=p,o.p=z,o.d.f()}},Pt.preconnect=function(g,p){typeof g=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,o.d.C(g,p))},Pt.prefetchDNS=function(g){typeof g=="string"&&o.d.D(g)},Pt.preinit=function(g,p){if(typeof g=="string"&&p&&typeof p.as=="string"){var z=p.as,D=T(z,p.crossOrigin),O=typeof p.integrity=="string"?p.integrity:void 0,U=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;z==="style"?o.d.S(g,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:D,integrity:O,fetchPriority:U}):z==="script"&&o.d.X(g,{crossOrigin:D,integrity:O,fetchPriority:U,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Pt.preinitModule=function(g,p){if(typeof g=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var z=T(p.as,p.crossOrigin);o.d.M(g,{crossOrigin:z,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&o.d.M(g)},Pt.preload=function(g,p){if(typeof g=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var z=p.as,D=T(z,p.crossOrigin);o.d.L(g,z,{crossOrigin:D,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Pt.preloadModule=function(g,p){if(typeof g=="string")if(p){var z=T(p.as,p.crossOrigin);o.d.m(g,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:z,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else o.d.m(g)},Pt.requestFormReset=function(g){o.d.r(g)},Pt.unstable_batchedUpdates=function(g,p){return g(p)},Pt.useFormState=function(g,p,z){return b.H.useFormState(g,p,z)},Pt.useFormStatus=function(){return b.H.useHostTransitionStatus()},Pt.version="19.2.6",Pt}var mh;function Z0(){if(mh)return _s.exports;mh=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(f){console.error(f)}}return s(),_s.exports=Q0(),_s.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ph;function K0(){if(ph)return Rl;ph=1;var s=X0(),f=er(),h=Z0();function o(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function c(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function d(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function b(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function T(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function g(t){if(d(t)!==t)throw Error(o(188))}function p(t){var e=t.alternate;if(!e){if(e=d(t),e===null)throw Error(o(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return g(l),t;if(i===a)return g(l),e;i=i.sibling}throw Error(o(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,r=l.child;r;){if(r===n){u=!0,n=l,a=i;break}if(r===a){u=!0,a=l,n=i;break}r=r.sibling}if(!u){for(r=i.child;r;){if(r===n){u=!0,n=i,a=l;break}if(r===a){u=!0,a=i,n=l;break}r=r.sibling}if(!u)throw Error(o(189))}}if(n.alternate!==a)throw Error(o(190))}if(n.tag!==3)throw Error(o(188));return n.stateNode.current===n?t:e}function z(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=z(t),e!==null)return e;t=t.sibling}return null}var D=Object.assign,O=Symbol.for("react.element"),U=Symbol.for("react.transitional.element"),L=Symbol.for("react.portal"),Z=Symbol.for("react.fragment"),J=Symbol.for("react.strict_mode"),q=Symbol.for("react.profiler"),H=Symbol.for("react.consumer"),Y=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),ct=Symbol.for("react.suspense"),V=Symbol.for("react.suspense_list"),j=Symbol.for("react.memo"),B=Symbol.for("react.lazy"),X=Symbol.for("react.activity"),nt=Symbol.for("react.memo_cache_sentinel"),P=Symbol.iterator;function W(t){return t===null||typeof t!="object"?null:(t=P&&t[P]||t["@@iterator"],typeof t=="function"?t:null)}var tt=Symbol.for("react.client.reference");function it(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===tt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Z:return"Fragment";case q:return"Profiler";case J:return"StrictMode";case ct:return"Suspense";case V:return"SuspenseList";case X:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case L:return"Portal";case Y:return t.displayName||"Context";case H:return(t._context.displayName||"Context")+".Consumer";case K:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case j:return e=t.displayName||null,e!==null?e:it(t.type)||"Memo";case B:e=t._payload,t=t._init;try{return it(t(e))}catch{}}return null}var Lt=Array.isArray,N=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,at={pending:!1,data:null,method:null,action:null},Et=[],St=-1;function w(t){return{current:t}}function k(t){0>St||(t.current=Et[St],Et[St]=null,St--)}function G(t,e){St++,Et[St]=t.current,t.current=e}var F=w(null),ut=w(null),ft=w(null),dt=w(null);function Rt(t,e){switch(G(ft,e),G(ut,t),G(F,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Rd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Rd(e),t=kd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}k(F),G(F,t)}function Ct(){k(F),k(ut),k(ft)}function He(t){t.memoizedState!==null&&G(dt,t);var e=F.current,n=kd(e,t.type);e!==n&&(G(ut,t),G(F,n))}function Ul(t){ut.current===t&&(k(F),k(ut)),dt.current===t&&(k(dt),Cl._currentValue=at)}var lu,ur;function Mn(t){if(lu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);lu=e&&e[1]||"",ur=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+lu+t+ur}var iu=!1;function uu(t,e){if(!t||iu)return"";iu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var R=function(){throw Error()};if(Object.defineProperty(R.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(R,[])}catch(C){var A=C}Reflect.construct(t,[],R)}else{try{R.call()}catch(C){A=C}t.call(R.prototype)}}else{try{throw Error()}catch(C){A=C}(R=t())&&typeof R.catch=="function"&&R.catch(function(){})}}catch(C){if(C&&A&&typeof C.stack=="string")return[C.stack,A.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],r=i[1];if(u&&r){var m=u.split(`
`),x=r.split(`
`);for(l=a=0;a<m.length&&!m[a].includes("DetermineComponentFrameRoot");)a++;for(;l<x.length&&!x[l].includes("DetermineComponentFrameRoot");)l++;if(a===m.length||l===x.length)for(a=m.length-1,l=x.length-1;1<=a&&0<=l&&m[a]!==x[l];)l--;for(;1<=a&&0<=l;a--,l--)if(m[a]!==x[l]){if(a!==1||l!==1)do if(a--,l--,0>l||m[a]!==x[l]){var _=`
`+m[a].replace(" at new "," at ");return t.displayName&&_.includes("<anonymous>")&&(_=_.replace("<anonymous>",t.displayName)),_}while(1<=a&&0<=l);break}}}finally{iu=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Mn(n):""}function pg(t,e){switch(t.tag){case 26:case 27:case 5:return Mn(t.type);case 16:return Mn("Lazy");case 13:return t.child!==e&&e!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return uu(t.type,!1);case 11:return uu(t.type.render,!1);case 1:return uu(t.type,!0);case 31:return Mn("Activity");default:return""}}function or(t){try{var e="",n=null;do e+=pg(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var ou=Object.prototype.hasOwnProperty,su=s.unstable_scheduleCallback,ru=s.unstable_cancelCallback,yg=s.unstable_shouldYield,vg=s.unstable_requestPaint,se=s.unstable_now,bg=s.unstable_getCurrentPriorityLevel,sr=s.unstable_ImmediatePriority,rr=s.unstable_UserBlockingPriority,Hl=s.unstable_NormalPriority,wg=s.unstable_LowPriority,cr=s.unstable_IdlePriority,Sg=s.log,Tg=s.unstable_setDisableYieldValue,ja=null,re=null;function nn(t){if(typeof Sg=="function"&&Tg(t),re&&typeof re.setStrictMode=="function")try{re.setStrictMode(ja,t)}catch{}}var ce=Math.clz32?Math.clz32:Ag,Eg=Math.log,xg=Math.LN2;function Ag(t){return t>>>=0,t===0?32:31-(Eg(t)/xg|0)|0}var Bl=256,jl=262144,Ll=4194304;function Dn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ql(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var r=a&134217727;return r!==0?(a=r&~i,a!==0?l=Dn(a):(u&=r,u!==0?l=Dn(u):n||(n=r&~t,n!==0&&(l=Dn(n))))):(r=a&~i,r!==0?l=Dn(r):u!==0?l=Dn(u):n||(n=a&~t,n!==0&&(l=Dn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function La(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Cg(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function fr(){var t=Ll;return Ll<<=1,(Ll&62914560)===0&&(Ll=4194304),t}function cu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function qa(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Ng(t,e,n,a,l,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var r=t.entanglements,m=t.expirationTimes,x=t.hiddenUpdates;for(n=u&~n;0<n;){var _=31-ce(n),R=1<<_;r[_]=0,m[_]=-1;var A=x[_];if(A!==null)for(x[_]=null,_=0;_<A.length;_++){var C=A[_];C!==null&&(C.lane&=-536870913)}n&=~R}a!==0&&dr(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function dr(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-ce(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function hr(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-ce(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function gr(t,e){var n=e&-e;return n=(n&42)!==0?1:fu(n),(n&(t.suspendedLanes|e))!==0?0:n}function fu(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function du(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function mr(){var t=Q.p;return t!==0?t:(t=window.event,t===void 0?32:eh(t.type))}function pr(t,e){var n=Q.p;try{return Q.p=t,e()}finally{Q.p=n}}var an=Math.random().toString(36).slice(2),Kt="__reactFiber$"+an,ee="__reactProps$"+an,Wn="__reactContainer$"+an,hu="__reactEvents$"+an,_g="__reactListeners$"+an,Mg="__reactHandles$"+an,yr="__reactResources$"+an,Ya="__reactMarker$"+an;function gu(t){delete t[Kt],delete t[ee],delete t[hu],delete t[_g],delete t[Mg]}function $n(t){var e=t[Kt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[Kt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Ld(t);t!==null;){if(n=t[Kt])return n;t=Ld(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[Kt]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Ga(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(o(33))}function ta(t){var e=t[yr];return e||(e=t[yr]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Qt(t){t[Ya]=!0}var vr=new Set,br={};function Rn(t,e){ea(t,e),ea(t+"Capture",e)}function ea(t,e){for(br[t]=e,t=0;t<e.length;t++)vr.add(e[t])}var Dg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),wr={},Sr={};function Rg(t){return ou.call(Sr,t)?!0:ou.call(wr,t)?!1:Dg.test(t)?Sr[t]=!0:(wr[t]=!0,!1)}function Yl(t,e,n){if(Rg(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Gl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function Be(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ve(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Tr(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function kg(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function mu(t){if(!t._valueTracker){var e=Tr(t)?"checked":"value";t._valueTracker=kg(t,e,""+t[e])}}function Er(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=Tr(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Vl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var zg=/[\n"\\]/g;function be(t){return t.replace(zg,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function pu(t,e,n,a,l,i,u,r){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ve(e)):t.value!==""+ve(e)&&(t.value=""+ve(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?yu(t,u,ve(e)):n!=null?yu(t,u,ve(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.name=""+ve(r):t.removeAttribute("name")}function xr(t,e,n,a,l,i,u,r){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){mu(t);return}n=n!=null?""+ve(n):"",e=e!=null?""+ve(e):n,r||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=r?t.checked:!!a,t.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),mu(t)}function yu(t,e,n){e==="number"&&Vl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function na(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ve(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function Ar(t,e,n){if(e!=null&&(e=""+ve(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ve(n):""}function Cr(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(o(92));if(Lt(a)){if(1<a.length)throw Error(o(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ve(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),mu(t)}function aa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Og=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Nr(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||Og.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function _r(t,e,n){if(e!=null&&typeof e!="object")throw Error(o(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&Nr(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&Nr(t,i,e[i])}function vu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ug=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Hg=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Xl(t){return Hg.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function je(){}var bu=null;function wu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var la=null,ia=null;function Mr(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[ee]||null;t:switch(t=e.stateNode,e.type){case"input":if(pu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[ee]||null;if(!l)throw Error(o(90));pu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&Er(a)}break t;case"textarea":Ar(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&na(t,!!n.multiple,e,!1)}}}var Su=!1;function Dr(t,e,n){if(Su)return t(e,n);Su=!0;try{var a=t(e);return a}finally{if(Su=!1,(la!==null||ia!==null)&&(Ri(),la&&(e=la,t=ia,ia=la=null,Mr(e),t)))for(e=0;e<t.length;e++)Mr(t[e])}}function Va(t,e){var n=t.stateNode;if(n===null)return null;var a=n[ee]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(o(231,e,typeof n));return n}var Le=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Tu=!1;if(Le)try{var Xa={};Object.defineProperty(Xa,"passive",{get:function(){Tu=!0}}),window.addEventListener("test",Xa,Xa),window.removeEventListener("test",Xa,Xa)}catch{Tu=!1}var ln=null,Eu=null,Ql=null;function Rr(){if(Ql)return Ql;var t,e=Eu,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var u=n-t;for(a=1;a<=u&&e[n-a]===l[i-a];a++);return Ql=l.slice(t,1<a?1-a:void 0)}function Zl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Kl(){return!0}function kr(){return!1}function ne(t){function e(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var r in t)t.hasOwnProperty(r)&&(n=t[r],this[r]=n?n(i):i[r]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Kl:kr,this.isPropagationStopped=kr,this}return D(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Kl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Kl)},persist:function(){},isPersistent:Kl}),e}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=ne(kn),Qa=D({},kn,{view:0,detail:0}),Bg=ne(Qa),xu,Au,Za,Il=D({},Qa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Za&&(Za&&t.type==="mousemove"?(xu=t.screenX-Za.screenX,Au=t.screenY-Za.screenY):Au=xu=0,Za=t),xu)},movementY:function(t){return"movementY"in t?t.movementY:Au}}),zr=ne(Il),jg=D({},Il,{dataTransfer:0}),Lg=ne(jg),qg=D({},Qa,{relatedTarget:0}),Cu=ne(qg),Yg=D({},kn,{animationName:0,elapsedTime:0,pseudoElement:0}),Gg=ne(Yg),Vg=D({},kn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Xg=ne(Vg),Qg=D({},kn,{data:0}),Or=ne(Qg),Zg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Kg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Jg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ig(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Jg[t])?!!e[t]:!1}function Nu(){return Ig}var Fg=D({},Qa,{key:function(t){if(t.key){var e=Zg[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Kg[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nu,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Wg=ne(Fg),$g=D({},Il,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ur=ne($g),Pg=D({},Qa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nu}),tm=ne(Pg),em=D({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0}),nm=ne(em),am=D({},Il,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),lm=ne(am),im=D({},kn,{newState:0,oldState:0}),um=ne(im),om=[9,13,27,32],_u=Le&&"CompositionEvent"in window,Ka=null;Le&&"documentMode"in document&&(Ka=document.documentMode);var sm=Le&&"TextEvent"in window&&!Ka,Hr=Le&&(!_u||Ka&&8<Ka&&11>=Ka),Br=" ",jr=!1;function Lr(t,e){switch(t){case"keyup":return om.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function qr(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ua=!1;function rm(t,e){switch(t){case"compositionend":return qr(e);case"keypress":return e.which!==32?null:(jr=!0,Br);case"textInput":return t=e.data,t===Br&&jr?null:t;default:return null}}function cm(t,e){if(ua)return t==="compositionend"||!_u&&Lr(t,e)?(t=Rr(),Ql=Eu=ln=null,ua=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Hr&&e.locale!=="ko"?null:e.data;default:return null}}var fm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yr(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!fm[t.type]:e==="textarea"}function Gr(t,e,n,a){la?ia?ia.push(a):ia=[a]:la=a,e=ji(e,"onChange"),0<e.length&&(n=new Jl("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Ja=null,Ia=null;function dm(t){Ad(t,0)}function Fl(t){var e=Ga(t);if(Er(e))return t}function Vr(t,e){if(t==="change")return e}var Xr=!1;if(Le){var Mu;if(Le){var Du="oninput"in document;if(!Du){var Qr=document.createElement("div");Qr.setAttribute("oninput","return;"),Du=typeof Qr.oninput=="function"}Mu=Du}else Mu=!1;Xr=Mu&&(!document.documentMode||9<document.documentMode)}function Zr(){Ja&&(Ja.detachEvent("onpropertychange",Kr),Ia=Ja=null)}function Kr(t){if(t.propertyName==="value"&&Fl(Ia)){var e=[];Gr(e,Ia,t,wu(t)),Dr(dm,e)}}function hm(t,e,n){t==="focusin"?(Zr(),Ja=e,Ia=n,Ja.attachEvent("onpropertychange",Kr)):t==="focusout"&&Zr()}function gm(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Fl(Ia)}function mm(t,e){if(t==="click")return Fl(e)}function pm(t,e){if(t==="input"||t==="change")return Fl(e)}function ym(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var fe=typeof Object.is=="function"?Object.is:ym;function Fa(t,e){if(fe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!ou.call(e,l)||!fe(t[l],e[l]))return!1}return!0}function Jr(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ir(t,e){var n=Jr(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Jr(n)}}function Fr(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Fr(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Wr(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Vl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Vl(t.document)}return e}function Ru(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var vm=Le&&"documentMode"in document&&11>=document.documentMode,oa=null,ku=null,Wa=null,zu=!1;function $r(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;zu||oa==null||oa!==Vl(a)||(a=oa,"selectionStart"in a&&Ru(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Wa&&Fa(Wa,a)||(Wa=a,a=ji(ku,"onSelect"),0<a.length&&(e=new Jl("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=oa)))}function zn(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var sa={animationend:zn("Animation","AnimationEnd"),animationiteration:zn("Animation","AnimationIteration"),animationstart:zn("Animation","AnimationStart"),transitionrun:zn("Transition","TransitionRun"),transitionstart:zn("Transition","TransitionStart"),transitioncancel:zn("Transition","TransitionCancel"),transitionend:zn("Transition","TransitionEnd")},Ou={},Pr={};Le&&(Pr=document.createElement("div").style,"AnimationEvent"in window||(delete sa.animationend.animation,delete sa.animationiteration.animation,delete sa.animationstart.animation),"TransitionEvent"in window||delete sa.transitionend.transition);function On(t){if(Ou[t])return Ou[t];if(!sa[t])return t;var e=sa[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Pr)return Ou[t]=e[n];return t}var tc=On("animationend"),ec=On("animationiteration"),nc=On("animationstart"),bm=On("transitionrun"),wm=On("transitionstart"),Sm=On("transitioncancel"),ac=On("transitionend"),lc=new Map,Uu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Uu.push("scrollEnd");function _e(t,e){lc.set(t,e),Rn(e,[t])}var Wl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},we=[],ra=0,Hu=0;function $l(){for(var t=ra,e=Hu=ra=0;e<t;){var n=we[e];we[e++]=null;var a=we[e];we[e++]=null;var l=we[e];we[e++]=null;var i=we[e];if(we[e++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&ic(n,l,i)}}function Pl(t,e,n,a){we[ra++]=t,we[ra++]=e,we[ra++]=n,we[ra++]=a,Hu|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Bu(t,e,n,a){return Pl(t,e,n,a),ti(t)}function Un(t,e){return Pl(t,null,null,e),ti(t)}function ic(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-ce(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function ti(t){if(50<bl)throw bl=0,Ko=null,Error(o(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var ca={};function Tm(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function de(t,e,n,a){return new Tm(t,e,n,a)}function ju(t){return t=t.prototype,!(!t||!t.isReactComponent)}function qe(t,e){var n=t.alternate;return n===null?(n=de(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function uc(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ei(t,e,n,a,l,i){var u=0;if(a=t,typeof t=="function")ju(t)&&(u=1);else if(typeof t=="string")u=N0(t,n,F.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case X:return t=de(31,n,e,l),t.elementType=X,t.lanes=i,t;case Z:return Hn(n.children,l,i,e);case J:u=8,l|=24;break;case q:return t=de(12,n,e,l|2),t.elementType=q,t.lanes=i,t;case ct:return t=de(13,n,e,l),t.elementType=ct,t.lanes=i,t;case V:return t=de(19,n,e,l),t.elementType=V,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Y:u=10;break t;case H:u=9;break t;case K:u=11;break t;case j:u=14;break t;case B:u=16,a=null;break t}u=29,n=Error(o(130,t===null?"null":typeof t,"")),a=null}return e=de(u,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function Hn(t,e,n,a){return t=de(7,t,a,e),t.lanes=n,t}function Lu(t,e,n){return t=de(6,t,null,e),t.lanes=n,t}function oc(t){var e=de(18,null,null,0);return e.stateNode=t,e}function qu(t,e,n){return e=de(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var sc=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=sc.get(t);return n!==void 0?n:(e={value:t,source:e,stack:or(e)},sc.set(t,e),e)}return{value:t,source:e,stack:or(e)}}var fa=[],da=0,ni=null,$a=0,Te=[],Ee=0,un=null,Re=1,ke="";function Ye(t,e){fa[da++]=$a,fa[da++]=ni,ni=t,$a=e}function rc(t,e,n){Te[Ee++]=Re,Te[Ee++]=ke,Te[Ee++]=un,un=t;var a=Re;t=ke;var l=32-ce(a)-1;a&=~(1<<l),n+=1;var i=32-ce(e)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,Re=1<<32-ce(e)+l|n<<l|a,ke=i+t}else Re=1<<i|n<<l|a,ke=t}function Yu(t){t.return!==null&&(Ye(t,1),rc(t,1,0))}function Gu(t){for(;t===ni;)ni=fa[--da],fa[da]=null,$a=fa[--da],fa[da]=null;for(;t===un;)un=Te[--Ee],Te[Ee]=null,ke=Te[--Ee],Te[Ee]=null,Re=Te[--Ee],Te[Ee]=null}function cc(t,e){Te[Ee++]=Re,Te[Ee++]=ke,Te[Ee++]=un,Re=e.id,ke=e.overflow,un=t}var Jt=null,kt=null,vt=!1,on=null,xe=!1,Vu=Error(o(519));function sn(t){var e=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Pa(Se(e,t)),Vu}function fc(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[Kt]=t,e[ee]=a,n){case"dialog":gt("cancel",e),gt("close",e);break;case"iframe":case"object":case"embed":gt("load",e);break;case"video":case"audio":for(n=0;n<Sl.length;n++)gt(Sl[n],e);break;case"source":gt("error",e);break;case"img":case"image":case"link":gt("error",e),gt("load",e);break;case"details":gt("toggle",e);break;case"input":gt("invalid",e),xr(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":gt("invalid",e);break;case"textarea":gt("invalid",e),Cr(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||Md(e.textContent,n)?(a.popover!=null&&(gt("beforetoggle",e),gt("toggle",e)),a.onScroll!=null&&gt("scroll",e),a.onScrollEnd!=null&&gt("scrollend",e),a.onClick!=null&&(e.onclick=je),e=!0):e=!1,e||sn(t,!0)}function dc(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:xe=!1;return;case 27:case 3:xe=!0;return;default:Jt=Jt.return}}function ha(t){if(t!==Jt)return!1;if(!vt)return dc(t),vt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||ss(t.type,t.memoizedProps)),n=!n),n&&kt&&sn(t),dc(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));kt=jd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));kt=jd(t)}else e===27?(e=kt,Tn(t.type)?(t=hs,hs=null,kt=t):kt=e):kt=Jt?Ce(t.stateNode.nextSibling):null;return!0}function Bn(){kt=Jt=null,vt=!1}function Xu(){var t=on;return t!==null&&(ue===null?ue=t:ue.push.apply(ue,t),on=null),t}function Pa(t){on===null?on=[t]:on.push(t)}var Qu=w(null),jn=null,Ge=null;function rn(t,e,n){G(Qu,e._currentValue),e._currentValue=n}function Ve(t){t._currentValue=Qu.current,k(Qu)}function Zu(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Ku(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;t:for(;i!==null;){var r=i;i=l;for(var m=0;m<e.length;m++)if(r.context===e[m]){i.lanes|=n,r=i.alternate,r!==null&&(r.lanes|=n),Zu(i.return,n,t),a||(u=null);break t}i=r.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(o(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Zu(u,n,t),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===t){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function ga(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(o(387));if(u=u.memoizedProps,u!==null){var r=l.type;fe(l.pendingProps.value,u.value)||(t!==null?t.push(r):t=[r])}}else if(l===dt.current){if(u=l.alternate,u===null)throw Error(o(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Cl):t=[Cl])}l=l.return}t!==null&&Ku(e,t,n,a),e.flags|=262144}function ai(t){for(t=t.firstContext;t!==null;){if(!fe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ln(t){jn=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function It(t){return hc(jn,t)}function li(t,e){return jn===null&&Ln(t),hc(t,e)}function hc(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ge===null){if(t===null)throw Error(o(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return n}var Em=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},xm=s.unstable_scheduleCallback,Am=s.unstable_NormalPriority,qt={$$typeof:Y,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ju(){return{controller:new Em,data:new Map,refCount:0}}function tl(t){t.refCount--,t.refCount===0&&xm(Am,function(){t.controller.abort()})}var el=null,Iu=0,ma=0,pa=null;function Cm(t,e){if(el===null){var n=el=[];Iu=0,ma=Po(),pa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Iu++,e.then(gc,gc),e}function gc(){if(--Iu===0&&el!==null){pa!==null&&(pa.status="fulfilled");var t=el;el=null,ma=0,pa=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Nm(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var mc=N.S;N.S=function(t,e){Pf=se(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Cm(t,e),mc!==null&&mc(t,e)};var qn=w(null);function Fu(){var t=qn.current;return t!==null?t:Dt.pooledCache}function ii(t,e){e===null?G(qn,qn.current):G(qn,e.pool)}function pc(){var t=Fu();return t===null?null:{parent:qt._currentValue,pool:t}}var ya=Error(o(460)),Wu=Error(o(474)),ui=Error(o(542)),oi={then:function(){}};function yc(t){return t=t.status,t==="fulfilled"||t==="rejected"}function vc(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(je,je),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,wc(t),t;default:if(typeof e.status=="string")e.then(je,je);else{if(t=Dt,t!==null&&100<t.shellSuspendCounter)throw Error(o(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,wc(t),t}throw Gn=e,ya}}function Yn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gn=n,ya):n}}var Gn=null;function bc(){if(Gn===null)throw Error(o(459));var t=Gn;return Gn=null,t}function wc(t){if(t===ya||t===ui)throw Error(o(483))}var va=null,nl=0;function si(t){var e=nl;return nl+=1,va===null&&(va=[]),vc(va,t,e)}function al(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ri(t,e){throw e.$$typeof===O?Error(o(525)):(t=Object.prototype.toString.call(e),Error(o(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Sc(t){function e(S,v){if(t){var E=S.deletions;E===null?(S.deletions=[v],S.flags|=16):E.push(v)}}function n(S,v){if(!t)return null;for(;v!==null;)e(S,v),v=v.sibling;return null}function a(S){for(var v=new Map;S!==null;)S.key!==null?v.set(S.key,S):v.set(S.index,S),S=S.sibling;return v}function l(S,v){return S=qe(S,v),S.index=0,S.sibling=null,S}function i(S,v,E){return S.index=E,t?(E=S.alternate,E!==null?(E=E.index,E<v?(S.flags|=67108866,v):E):(S.flags|=67108866,v)):(S.flags|=1048576,v)}function u(S){return t&&S.alternate===null&&(S.flags|=67108866),S}function r(S,v,E,M){return v===null||v.tag!==6?(v=Lu(E,S.mode,M),v.return=S,v):(v=l(v,E),v.return=S,v)}function m(S,v,E,M){var et=E.type;return et===Z?_(S,v,E.props.children,M,E.key):v!==null&&(v.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===B&&Yn(et)===v.type)?(v=l(v,E.props),al(v,E),v.return=S,v):(v=ei(E.type,E.key,E.props,null,S.mode,M),al(v,E),v.return=S,v)}function x(S,v,E,M){return v===null||v.tag!==4||v.stateNode.containerInfo!==E.containerInfo||v.stateNode.implementation!==E.implementation?(v=qu(E,S.mode,M),v.return=S,v):(v=l(v,E.children||[]),v.return=S,v)}function _(S,v,E,M,et){return v===null||v.tag!==7?(v=Hn(E,S.mode,M,et),v.return=S,v):(v=l(v,E),v.return=S,v)}function R(S,v,E){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Lu(""+v,S.mode,E),v.return=S,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case U:return E=ei(v.type,v.key,v.props,null,S.mode,E),al(E,v),E.return=S,E;case L:return v=qu(v,S.mode,E),v.return=S,v;case B:return v=Yn(v),R(S,v,E)}if(Lt(v)||W(v))return v=Hn(v,S.mode,E,null),v.return=S,v;if(typeof v.then=="function")return R(S,si(v),E);if(v.$$typeof===Y)return R(S,li(S,v),E);ri(S,v)}return null}function A(S,v,E,M){var et=v!==null?v.key:null;if(typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint")return et!==null?null:r(S,v,""+E,M);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case U:return E.key===et?m(S,v,E,M):null;case L:return E.key===et?x(S,v,E,M):null;case B:return E=Yn(E),A(S,v,E,M)}if(Lt(E)||W(E))return et!==null?null:_(S,v,E,M,null);if(typeof E.then=="function")return A(S,v,si(E),M);if(E.$$typeof===Y)return A(S,v,li(S,E),M);ri(S,E)}return null}function C(S,v,E,M,et){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return S=S.get(E)||null,r(v,S,""+M,et);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case U:return S=S.get(M.key===null?E:M.key)||null,m(v,S,M,et);case L:return S=S.get(M.key===null?E:M.key)||null,x(v,S,M,et);case B:return M=Yn(M),C(S,v,E,M,et)}if(Lt(M)||W(M))return S=S.get(E)||null,_(v,S,M,et,null);if(typeof M.then=="function")return C(S,v,E,si(M),et);if(M.$$typeof===Y)return C(S,v,E,li(v,M),et);ri(v,M)}return null}function I(S,v,E,M){for(var et=null,bt=null,$=v,rt=v=0,pt=null;$!==null&&rt<E.length;rt++){$.index>rt?(pt=$,$=null):pt=$.sibling;var wt=A(S,$,E[rt],M);if(wt===null){$===null&&($=pt);break}t&&$&&wt.alternate===null&&e(S,$),v=i(wt,v,rt),bt===null?et=wt:bt.sibling=wt,bt=wt,$=pt}if(rt===E.length)return n(S,$),vt&&Ye(S,rt),et;if($===null){for(;rt<E.length;rt++)$=R(S,E[rt],M),$!==null&&(v=i($,v,rt),bt===null?et=$:bt.sibling=$,bt=$);return vt&&Ye(S,rt),et}for($=a($);rt<E.length;rt++)pt=C($,S,rt,E[rt],M),pt!==null&&(t&&pt.alternate!==null&&$.delete(pt.key===null?rt:pt.key),v=i(pt,v,rt),bt===null?et=pt:bt.sibling=pt,bt=pt);return t&&$.forEach(function(Nn){return e(S,Nn)}),vt&&Ye(S,rt),et}function lt(S,v,E,M){if(E==null)throw Error(o(151));for(var et=null,bt=null,$=v,rt=v=0,pt=null,wt=E.next();$!==null&&!wt.done;rt++,wt=E.next()){$.index>rt?(pt=$,$=null):pt=$.sibling;var Nn=A(S,$,wt.value,M);if(Nn===null){$===null&&($=pt);break}t&&$&&Nn.alternate===null&&e(S,$),v=i(Nn,v,rt),bt===null?et=Nn:bt.sibling=Nn,bt=Nn,$=pt}if(wt.done)return n(S,$),vt&&Ye(S,rt),et;if($===null){for(;!wt.done;rt++,wt=E.next())wt=R(S,wt.value,M),wt!==null&&(v=i(wt,v,rt),bt===null?et=wt:bt.sibling=wt,bt=wt);return vt&&Ye(S,rt),et}for($=a($);!wt.done;rt++,wt=E.next())wt=C($,S,rt,wt.value,M),wt!==null&&(t&&wt.alternate!==null&&$.delete(wt.key===null?rt:wt.key),v=i(wt,v,rt),bt===null?et=wt:bt.sibling=wt,bt=wt);return t&&$.forEach(function(j0){return e(S,j0)}),vt&&Ye(S,rt),et}function Mt(S,v,E,M){if(typeof E=="object"&&E!==null&&E.type===Z&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case U:t:{for(var et=E.key;v!==null;){if(v.key===et){if(et=E.type,et===Z){if(v.tag===7){n(S,v.sibling),M=l(v,E.props.children),M.return=S,S=M;break t}}else if(v.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===B&&Yn(et)===v.type){n(S,v.sibling),M=l(v,E.props),al(M,E),M.return=S,S=M;break t}n(S,v);break}else e(S,v);v=v.sibling}E.type===Z?(M=Hn(E.props.children,S.mode,M,E.key),M.return=S,S=M):(M=ei(E.type,E.key,E.props,null,S.mode,M),al(M,E),M.return=S,S=M)}return u(S);case L:t:{for(et=E.key;v!==null;){if(v.key===et)if(v.tag===4&&v.stateNode.containerInfo===E.containerInfo&&v.stateNode.implementation===E.implementation){n(S,v.sibling),M=l(v,E.children||[]),M.return=S,S=M;break t}else{n(S,v);break}else e(S,v);v=v.sibling}M=qu(E,S.mode,M),M.return=S,S=M}return u(S);case B:return E=Yn(E),Mt(S,v,E,M)}if(Lt(E))return I(S,v,E,M);if(W(E)){if(et=W(E),typeof et!="function")throw Error(o(150));return E=et.call(E),lt(S,v,E,M)}if(typeof E.then=="function")return Mt(S,v,si(E),M);if(E.$$typeof===Y)return Mt(S,v,li(S,E),M);ri(S,E)}return typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint"?(E=""+E,v!==null&&v.tag===6?(n(S,v.sibling),M=l(v,E),M.return=S,S=M):(n(S,v),M=Lu(E,S.mode,M),M.return=S,S=M),u(S)):n(S,v)}return function(S,v,E,M){try{nl=0;var et=Mt(S,v,E,M);return va=null,et}catch($){if($===ya||$===ui)throw $;var bt=de(29,$,null,S.mode);return bt.lanes=M,bt.return=S,bt}finally{}}}var Vn=Sc(!0),Tc=Sc(!1),cn=!1;function $u(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Pu(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(Tt&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=ti(t),ic(t,null,n),e}return Pl(t,a,e,n),ti(t)}function ll(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,hr(t,n)}}function to(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var eo=!1;function il(){if(eo){var t=pa;if(t!==null)throw t}}function ul(t,e,n,a){eo=!1;var l=t.updateQueue;cn=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,r=l.shared.pending;if(r!==null){l.shared.pending=null;var m=r,x=m.next;m.next=null,u===null?i=x:u.next=x,u=m;var _=t.alternate;_!==null&&(_=_.updateQueue,r=_.lastBaseUpdate,r!==u&&(r===null?_.firstBaseUpdate=x:r.next=x,_.lastBaseUpdate=m))}if(i!==null){var R=l.baseState;u=0,_=x=m=null,r=i;do{var A=r.lane&-536870913,C=A!==r.lane;if(C?(mt&A)===A:(a&A)===A){A!==0&&A===ma&&(eo=!0),_!==null&&(_=_.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});t:{var I=t,lt=r;A=e;var Mt=n;switch(lt.tag){case 1:if(I=lt.payload,typeof I=="function"){R=I.call(Mt,R,A);break t}R=I;break t;case 3:I.flags=I.flags&-65537|128;case 0:if(I=lt.payload,A=typeof I=="function"?I.call(Mt,R,A):I,A==null)break t;R=D({},R,A);break t;case 2:cn=!0}}A=r.callback,A!==null&&(t.flags|=64,C&&(t.flags|=8192),C=l.callbacks,C===null?l.callbacks=[A]:C.push(A))}else C={lane:A,tag:r.tag,payload:r.payload,callback:r.callback,next:null},_===null?(x=_=C,m=R):_=_.next=C,u|=A;if(r=r.next,r===null){if(r=l.shared.pending,r===null)break;C=r,r=C.next,C.next=null,l.lastBaseUpdate=C,l.shared.pending=null}}while(!0);_===null&&(m=R),l.baseState=m,l.firstBaseUpdate=x,l.lastBaseUpdate=_,i===null&&(l.shared.lanes=0),yn|=u,t.lanes=u,t.memoizedState=R}}function Ec(t,e){if(typeof t!="function")throw Error(o(191,t));t.call(e)}function xc(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)Ec(n[t],e)}var ba=w(null),ci=w(0);function Ac(t,e){t=$e,G(ci,t),G(ba,e),$e=t|e.baseLanes}function no(){G(ci,$e),G(ba,ba.current)}function ao(){$e=ci.current,k(ba),k(ci)}var he=w(null),Ae=null;function hn(t){var e=t.alternate;G(Bt,Bt.current&1),G(he,t),Ae===null&&(e===null||ba.current!==null||e.memoizedState!==null)&&(Ae=t)}function lo(t){G(Bt,Bt.current),G(he,t),Ae===null&&(Ae=t)}function Cc(t){t.tag===22?(G(Bt,Bt.current),G(he,t),Ae===null&&(Ae=t)):gn()}function gn(){G(Bt,Bt.current),G(he,he.current)}function ge(t){k(he),Ae===t&&(Ae=null),k(Bt)}var Bt=w(0);function fi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||fs(n)||ds(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xe=0,st=null,Nt=null,Yt=null,di=!1,wa=!1,Xn=!1,hi=0,ol=0,Sa=null,_m=0;function Ut(){throw Error(o(321))}function io(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!fe(t[n],e[n]))return!1;return!0}function uo(t,e,n,a,l,i){return Xe=i,st=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,N.H=t===null||t.memoizedState===null?cf:To,Xn=!1,i=n(a,l),Xn=!1,wa&&(i=_c(e,n,a,l)),Nc(t),i}function Nc(t){N.H=cl;var e=Nt!==null&&Nt.next!==null;if(Xe=0,Yt=Nt=st=null,di=!1,ol=0,Sa=null,e)throw Error(o(300));t===null||Gt||(t=t.dependencies,t!==null&&ai(t)&&(Gt=!0))}function _c(t,e,n,a){st=t;var l=0;do{if(wa&&(Sa=null),ol=0,wa=!1,25<=l)throw Error(o(301));if(l+=1,Yt=Nt=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}N.H=ff,i=e(n,a)}while(wa);return i}function Mm(){var t=N.H,e=t.useState()[0];return e=typeof e.then=="function"?sl(e):e,t=t.useState()[0],(Nt!==null?Nt.memoizedState:null)!==t&&(st.flags|=1024),e}function oo(){var t=hi!==0;return hi=0,t}function so(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function ro(t){if(di){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}di=!1}Xe=0,Yt=Nt=st=null,wa=!1,ol=hi=0,Sa=null}function te(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Yt===null?st.memoizedState=Yt=t:Yt=Yt.next=t,Yt}function jt(){if(Nt===null){var t=st.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=Yt===null?st.memoizedState:Yt.next;if(e!==null)Yt=e,Nt=t;else{if(t===null)throw st.alternate===null?Error(o(467)):Error(o(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},Yt===null?st.memoizedState=Yt=t:Yt=Yt.next=t}return Yt}function gi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function sl(t){var e=ol;return ol+=1,Sa===null&&(Sa=[]),t=vc(Sa,t,e),e=st,(Yt===null?e.memoizedState:Yt.next)===null&&(e=e.alternate,N.H=e===null||e.memoizedState===null?cf:To),t}function mi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return sl(t);if(t.$$typeof===Y)return It(t)}throw Error(o(438,String(t)))}function co(t){var e=null,n=st.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=st.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=gi(),st.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=nt;return e.index++,n}function Qe(t,e){return typeof e=="function"?e(t):e}function pi(t){var e=jt();return fo(e,Nt,t)}function fo(t,e,n){var a=t.queue;if(a===null)throw Error(o(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var r=u=null,m=null,x=e,_=!1;do{var R=x.lane&-536870913;if(R!==x.lane?(mt&R)===R:(Xe&R)===R){var A=x.revertLane;if(A===0)m!==null&&(m=m.next={lane:0,revertLane:0,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),R===ma&&(_=!0);else if((Xe&A)===A){x=x.next,A===ma&&(_=!0);continue}else R={lane:0,revertLane:x.revertLane,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},m===null?(r=m=R,u=i):m=m.next=R,st.lanes|=A,yn|=A;R=x.action,Xn&&n(i,R),i=x.hasEagerState?x.eagerState:n(i,R)}else A={lane:R,revertLane:x.revertLane,gesture:x.gesture,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},m===null?(r=m=A,u=i):m=m.next=A,st.lanes|=R,yn|=R;x=x.next}while(x!==null&&x!==e);if(m===null?u=i:m.next=r,!fe(i,t.memoizedState)&&(Gt=!0,_&&(n=pa,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=m,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function ho(t){var e=jt(),n=e.queue;if(n===null)throw Error(o(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=t(i,u.action),u=u.next;while(u!==l);fe(i,e.memoizedState)||(Gt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function Mc(t,e,n){var a=st,l=jt(),i=vt;if(i){if(n===void 0)throw Error(o(407));n=n()}else n=e();var u=!fe((Nt||l).memoizedState,n);if(u&&(l.memoizedState=n,Gt=!0),l=l.queue,po(kc.bind(null,a,l,t),[t]),l.getSnapshot!==e||u||Yt!==null&&Yt.memoizedState.tag&1){if(a.flags|=2048,Ta(9,{destroy:void 0},Rc.bind(null,a,l,n,e),null),Dt===null)throw Error(o(349));i||(Xe&127)!==0||Dc(a,e,n)}return n}function Dc(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=st.updateQueue,e===null?(e=gi(),st.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Rc(t,e,n,a){e.value=n,e.getSnapshot=a,zc(e)&&Oc(t)}function kc(t,e,n){return n(function(){zc(e)&&Oc(t)})}function zc(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!fe(t,n)}catch{return!0}}function Oc(t){var e=Un(t,2);e!==null&&oe(e,t,2)}function go(t){var e=te();if(typeof t=="function"){var n=t;if(t=n(),Xn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:t},e}function Uc(t,e,n,a){return t.baseState=n,fo(t,Nt,typeof a=="function"?a:Qe)}function Dm(t,e,n,a,l){if(bi(t))throw Error(o(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};N.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,Hc(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Hc(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=N.T,u={};N.T=u;try{var r=n(l,a),m=N.S;m!==null&&m(u,r),Bc(t,e,r)}catch(x){mo(t,e,x)}finally{i!==null&&u.types!==null&&(i.types=u.types),N.T=i}}else try{i=n(l,a),Bc(t,e,i)}catch(x){mo(t,e,x)}}function Bc(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){jc(t,e,a)},function(a){return mo(t,e,a)}):jc(t,e,n)}function jc(t,e,n){e.status="fulfilled",e.value=n,Lc(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Hc(t,n)))}function mo(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,Lc(e),e=e.next;while(e!==a)}t.action=null}function Lc(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function qc(t,e){return e}function Yc(t,e){if(vt){var n=Dt.formState;if(n!==null){t:{var a=st;if(vt){if(kt){e:{for(var l=kt,i=xe;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ce(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){kt=Ce(l.nextSibling),a=l.data==="F!";break t}}sn(a)}a=!1}a&&(e=n[0])}}return n=te(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qc,lastRenderedState:e},n.queue=a,n=of.bind(null,st,a),a.dispatch=n,a=go(!1),i=So.bind(null,st,!1,a.queue),a=te(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=Dm.bind(null,st,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Gc(t){var e=jt();return Vc(e,Nt,t)}function Vc(t,e,n){if(e=fo(t,e,qc)[0],t=pi(Qe)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=sl(e)}catch(u){throw u===ya?ui:u}else a=e;e=jt();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(st.flags|=2048,Ta(9,{destroy:void 0},Rm.bind(null,l,n),null)),[a,i,t]}function Rm(t,e){t.action=e}function Xc(t){var e=jt(),n=Nt;if(n!==null)return Vc(e,n,t);jt(),e=e.memoizedState,n=jt();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function Ta(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=st.updateQueue,e===null&&(e=gi(),st.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Qc(){return jt().memoizedState}function yi(t,e,n,a){var l=te();st.flags|=t,l.memoizedState=Ta(1|e,{destroy:void 0},n,a===void 0?null:a)}function vi(t,e,n,a){var l=jt();a=a===void 0?null:a;var i=l.memoizedState.inst;Nt!==null&&a!==null&&io(a,Nt.memoizedState.deps)?l.memoizedState=Ta(e,i,n,a):(st.flags|=t,l.memoizedState=Ta(1|e,i,n,a))}function Zc(t,e){yi(8390656,8,t,e)}function po(t,e){vi(2048,8,t,e)}function km(t){st.flags|=4;var e=st.updateQueue;if(e===null)e=gi(),st.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Kc(t){var e=jt().memoizedState;return km({ref:e,nextImpl:t}),function(){if((Tt&2)!==0)throw Error(o(440));return e.impl.apply(void 0,arguments)}}function Jc(t,e){return vi(4,2,t,e)}function Ic(t,e){return vi(4,4,t,e)}function Fc(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Wc(t,e,n){n=n!=null?n.concat([t]):null,vi(4,4,Fc.bind(null,e,t),n)}function yo(){}function $c(t,e){var n=jt();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&io(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function Pc(t,e){var n=jt();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&io(e,a[1]))return a[0];if(a=t(),Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function vo(t,e,n){return n===void 0||(Xe&1073741824)!==0&&(mt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=ed(),st.lanes|=t,yn|=t,n)}function tf(t,e,n,a){return fe(n,e)?n:ba.current!==null?(t=vo(t,n,a),fe(t,e)||(Gt=!0),t):(Xe&42)===0||(Xe&1073741824)!==0&&(mt&261930)===0?(Gt=!0,t.memoizedState=n):(t=ed(),st.lanes|=t,yn|=t,e)}function ef(t,e,n,a,l){var i=Q.p;Q.p=i!==0&&8>i?i:8;var u=N.T,r={};N.T=r,So(t,!1,e,n);try{var m=l(),x=N.S;if(x!==null&&x(r,m),m!==null&&typeof m=="object"&&typeof m.then=="function"){var _=Nm(m,a);rl(t,e,_,ye(t))}else rl(t,e,a,ye(t))}catch(R){rl(t,e,{then:function(){},status:"rejected",reason:R},ye())}finally{Q.p=i,u!==null&&r.types!==null&&(u.types=r.types),N.T=u}}function zm(){}function bo(t,e,n,a){if(t.tag!==5)throw Error(o(476));var l=nf(t).queue;ef(t,l,e,at,n===null?zm:function(){return af(t),n(a)})}function nf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:at,baseState:at,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:at},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function af(t){var e=nf(t);e.next===null&&(e=t.alternate.memoizedState),rl(t,e.next.queue,{},ye())}function wo(){return It(Cl)}function lf(){return jt().memoizedState}function uf(){return jt().memoizedState}function Om(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var a=dn(e,t,n);a!==null&&(oe(a,e,n),ll(a,e,n)),e={cache:Ju()},t.payload=e;return}e=e.return}}function Um(t,e,n){var a=ye();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},bi(t)?sf(e,n):(n=Bu(t,e,n,a),n!==null&&(oe(n,t,a),rf(n,e,a)))}function of(t,e,n){var a=ye();rl(t,e,n,a)}function rl(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(bi(t))sf(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,r=i(u,n);if(l.hasEagerState=!0,l.eagerState=r,fe(r,u))return Pl(t,e,l,0),Dt===null&&$l(),!1}catch{}finally{}if(n=Bu(t,e,l,a),n!==null)return oe(n,t,a),rf(n,e,a),!0}return!1}function So(t,e,n,a){if(a={lane:2,revertLane:Po(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},bi(t)){if(e)throw Error(o(479))}else e=Bu(t,n,a,2),e!==null&&oe(e,t,2)}function bi(t){var e=t.alternate;return t===st||e!==null&&e===st}function sf(t,e){wa=di=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function rf(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,hr(t,n)}}var cl={readContext:It,use:mi,useCallback:Ut,useContext:Ut,useEffect:Ut,useImperativeHandle:Ut,useLayoutEffect:Ut,useInsertionEffect:Ut,useMemo:Ut,useReducer:Ut,useRef:Ut,useState:Ut,useDebugValue:Ut,useDeferredValue:Ut,useTransition:Ut,useSyncExternalStore:Ut,useId:Ut,useHostTransitionStatus:Ut,useFormState:Ut,useActionState:Ut,useOptimistic:Ut,useMemoCache:Ut,useCacheRefresh:Ut};cl.useEffectEvent=Ut;var cf={readContext:It,use:mi,useCallback:function(t,e){return te().memoizedState=[t,e===void 0?null:e],t},useContext:It,useEffect:Zc,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,yi(4194308,4,Fc.bind(null,e,t),n)},useLayoutEffect:function(t,e){return yi(4194308,4,t,e)},useInsertionEffect:function(t,e){yi(4,2,t,e)},useMemo:function(t,e){var n=te();e=e===void 0?null:e;var a=t();if(Xn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=te();if(n!==void 0){var l=n(e);if(Xn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=Um.bind(null,st,t),[a.memoizedState,t]},useRef:function(t){var e=te();return t={current:t},e.memoizedState=t},useState:function(t){t=go(t);var e=t.queue,n=of.bind(null,st,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:yo,useDeferredValue:function(t,e){var n=te();return vo(n,t,e)},useTransition:function(){var t=go(!1);return t=ef.bind(null,st,t.queue,!0,!1),te().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=st,l=te();if(vt){if(n===void 0)throw Error(o(407));n=n()}else{if(n=e(),Dt===null)throw Error(o(349));(mt&127)!==0||Dc(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,Zc(kc.bind(null,a,i,t),[t]),a.flags|=2048,Ta(9,{destroy:void 0},Rc.bind(null,a,i,n,e),null),n},useId:function(){var t=te(),e=Dt.identifierPrefix;if(vt){var n=ke,a=Re;n=(a&~(1<<32-ce(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=hi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=_m++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:wo,useFormState:Yc,useActionState:Yc,useOptimistic:function(t){var e=te();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=So.bind(null,st,!0,n),n.dispatch=e,[t,e]},useMemoCache:co,useCacheRefresh:function(){return te().memoizedState=Om.bind(null,st)},useEffectEvent:function(t){var e=te(),n={impl:t};return e.memoizedState=n,function(){if((Tt&2)!==0)throw Error(o(440));return n.impl.apply(void 0,arguments)}}},To={readContext:It,use:mi,useCallback:$c,useContext:It,useEffect:po,useImperativeHandle:Wc,useInsertionEffect:Jc,useLayoutEffect:Ic,useMemo:Pc,useReducer:pi,useRef:Qc,useState:function(){return pi(Qe)},useDebugValue:yo,useDeferredValue:function(t,e){var n=jt();return tf(n,Nt.memoizedState,t,e)},useTransition:function(){var t=pi(Qe)[0],e=jt().memoizedState;return[typeof t=="boolean"?t:sl(t),e]},useSyncExternalStore:Mc,useId:lf,useHostTransitionStatus:wo,useFormState:Gc,useActionState:Gc,useOptimistic:function(t,e){var n=jt();return Uc(n,Nt,t,e)},useMemoCache:co,useCacheRefresh:uf};To.useEffectEvent=Kc;var ff={readContext:It,use:mi,useCallback:$c,useContext:It,useEffect:po,useImperativeHandle:Wc,useInsertionEffect:Jc,useLayoutEffect:Ic,useMemo:Pc,useReducer:ho,useRef:Qc,useState:function(){return ho(Qe)},useDebugValue:yo,useDeferredValue:function(t,e){var n=jt();return Nt===null?vo(n,t,e):tf(n,Nt.memoizedState,t,e)},useTransition:function(){var t=ho(Qe)[0],e=jt().memoizedState;return[typeof t=="boolean"?t:sl(t),e]},useSyncExternalStore:Mc,useId:lf,useHostTransitionStatus:wo,useFormState:Xc,useActionState:Xc,useOptimistic:function(t,e){var n=jt();return Nt!==null?Uc(n,Nt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:co,useCacheRefresh:uf};ff.useEffectEvent=Kc;function Eo(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:D({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var xo={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(oe(e,t,a),ll(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(oe(e,t,a),ll(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(oe(e,t,n),ll(e,t,n))}};function df(t,e,n,a,l,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,u):e.prototype&&e.prototype.isPureReactComponent?!Fa(n,a)||!Fa(l,i):!0}function hf(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&xo.enqueueReplaceState(e,e.state,null)}function Qn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=D({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function gf(t){Wl(t)}function mf(t){console.error(t)}function pf(t){Wl(t)}function wi(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function yf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Ao(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){wi(t,e)},n}function vf(t){return t=fn(t),t.tag=3,t}function bf(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){yf(e,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){yf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var r=a.stack;this.componentDidCatch(a.value,{componentStack:r!==null?r:""})})}function Hm(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&ga(e,n,l,!0),n=he.current,n!==null){switch(n.tag){case 31:case 13:return Ae===null?ki():n.alternate===null&&Ht===0&&(Ht=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===oi?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Fo(t,a,l)),!1;case 22:return n.flags|=65536,a===oi?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Fo(t,a,l)),!1}throw Error(o(435,n.tag))}return Fo(t,a,l),ki(),!1}if(vt)return e=he.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Vu&&(t=Error(o(422),{cause:a}),Pa(Se(t,n)))):(a!==Vu&&(e=Error(o(423),{cause:a}),Pa(Se(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=Se(a,n),l=Ao(t.stateNode,a,l),to(t,l),Ht!==4&&(Ht=2)),!1;var i=Error(o(520),{cause:a});if(i=Se(i,n),vl===null?vl=[i]:vl.push(i),Ht!==4&&(Ht=2),e===null)return!0;a=Se(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=Ao(n.stateNode,a,t),to(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=vf(l),bf(l,t,n,a),to(n,l),!1}n=n.return}while(n!==null);return!1}var Co=Error(o(461)),Gt=!1;function Ft(t,e,n,a){e.child=t===null?Tc(e,null,n,a):Vn(e,t.child,n,a)}function wf(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var u={};for(var r in a)r!=="ref"&&(u[r]=a[r])}else u=a;return Ln(e),a=uo(t,e,n,u,i,l),r=oo(),t!==null&&!Gt?(so(t,e,l),Ze(t,e,l)):(vt&&r&&Yu(e),e.flags|=1,Ft(t,e,a,l),e.child)}function Sf(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!ju(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,Tf(t,e,i,a,l)):(t=ei(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Oo(t,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Fa,n(u,a)&&t.ref===e.ref)return Ze(t,e,l)}return e.flags|=1,t=qe(i,a),t.ref=e.ref,t.return=e,e.child=t}function Tf(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if(Fa(i,a)&&t.ref===e.ref)if(Gt=!1,e.pendingProps=a=i,Oo(t,l))(t.flags&131072)!==0&&(Gt=!0);else return e.lanes=t.lanes,Ze(t,e,l)}return No(t,e,n,a,l)}function Ef(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return xf(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&ii(e,i!==null?i.cachePool:null),i!==null?Ac(e,i):no(),Cc(e);else return a=e.lanes=536870912,xf(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(ii(e,i.cachePool),Ac(e,i),gn(),e.memoizedState=null):(t!==null&&ii(e,null),no(),gn());return Ft(t,e,l,n),e.child}function fl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function xf(t,e,n,a,l){var i=Fu();return i=i===null?null:{parent:qt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&ii(e,null),no(),Cc(e),t!==null&&ga(t,e,a,!0),e.childLanes=l,null}function Si(t,e){return e=Ei({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Af(t,e,n){return Vn(e,t.child,null,n),t=Si(e,e.pendingProps),t.flags|=2,ge(e),e.memoizedState=null,t}function Bm(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(vt){if(a.mode==="hidden")return t=Si(e,a),e.lanes=536870912,fl(null,t);if(lo(e),(t=kt)?(t=Bd(t,xe),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=oc(t),n.return=e,e.child=n,Jt=e,kt=null)):t=null,t===null)throw sn(e);return e.lanes=536870912,null}return Si(e,a)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(lo(e),l)if(e.flags&256)e.flags&=-257,e=Af(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(o(558));else if(Gt||ga(t,e,n,!1),l=(n&t.childLanes)!==0,Gt||l){if(a=Dt,a!==null&&(u=gr(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Un(t,u),oe(a,t,u),Co;ki(),e=Af(t,e,n)}else t=i.treeContext,kt=Ce(u.nextSibling),Jt=e,vt=!0,on=null,xe=!1,t!==null&&cc(e,t),e=Si(e,a),e.flags|=4096;return e}return t=qe(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ti(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(o(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function No(t,e,n,a,l){return Ln(e),n=uo(t,e,n,a,void 0,l),a=oo(),t!==null&&!Gt?(so(t,e,l),Ze(t,e,l)):(vt&&a&&Yu(e),e.flags|=1,Ft(t,e,n,l),e.child)}function Cf(t,e,n,a,l,i){return Ln(e),e.updateQueue=null,n=_c(e,a,n,l),Nc(t),a=oo(),t!==null&&!Gt?(so(t,e,i),Ze(t,e,i)):(vt&&a&&Yu(e),e.flags|=1,Ft(t,e,n,i),e.child)}function Nf(t,e,n,a,l){if(Ln(e),e.stateNode===null){var i=ca,u=n.contextType;typeof u=="object"&&u!==null&&(i=It(u)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=xo,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},$u(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?It(u):ca,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(Eo(e,n,u,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&xo.enqueueReplaceState(i,i.state,null),ul(e,a,i,l),il(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var r=e.memoizedProps,m=Qn(n,r);i.props=m;var x=i.context,_=n.contextType;u=ca,typeof _=="object"&&_!==null&&(u=It(_));var R=n.getDerivedStateFromProps;_=typeof R=="function"||typeof i.getSnapshotBeforeUpdate=="function",r=e.pendingProps!==r,_||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r||x!==u)&&hf(e,i,a,u),cn=!1;var A=e.memoizedState;i.state=A,ul(e,a,i,l),il(),x=e.memoizedState,r||A!==x||cn?(typeof R=="function"&&(Eo(e,n,R,a),x=e.memoizedState),(m=cn||df(e,n,m,a,A,x,u))?(_||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=x),i.props=a,i.state=x,i.context=u,a=m):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,Pu(t,e),u=e.memoizedProps,_=Qn(n,u),i.props=_,R=e.pendingProps,A=i.context,x=n.contextType,m=ca,typeof x=="object"&&x!==null&&(m=It(x)),r=n.getDerivedStateFromProps,(x=typeof r=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==R||A!==m)&&hf(e,i,a,m),cn=!1,A=e.memoizedState,i.state=A,ul(e,a,i,l),il();var C=e.memoizedState;u!==R||A!==C||cn||t!==null&&t.dependencies!==null&&ai(t.dependencies)?(typeof r=="function"&&(Eo(e,n,r,a),C=e.memoizedState),(_=cn||df(e,n,_,a,A,C,m)||t!==null&&t.dependencies!==null&&ai(t.dependencies))?(x||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,C,m),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,C,m)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=C),i.props=a,i.state=C,i.context=m,a=_):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,Ti(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Vn(e,t.child,null,l),e.child=Vn(e,null,n,l)):Ft(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ze(t,e,l),t}function _f(t,e,n,a){return Bn(),e.flags|=256,Ft(t,e,n,a),e.child}var _o={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Mo(t){return{baseLanes:t,cachePool:pc()}}function Do(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pe),t}function Mf(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(Bt.current&2)!==0),u&&(l=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(vt){if(l?hn(e):gn(),(t=kt)?(t=Bd(t,xe),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=oc(t),n.return=e,e.child=n,Jt=e,kt=null)):t=null,t===null)throw sn(e);return ds(t)?e.lanes=32:e.lanes=536870912,null}var r=a.children;return a=a.fallback,l?(gn(),l=e.mode,r=Ei({mode:"hidden",children:r},l),a=Hn(a,l,n,null),r.return=e,a.return=e,r.sibling=a,e.child=r,a=e.child,a.memoizedState=Mo(n),a.childLanes=Do(t,u,n),e.memoizedState=_o,fl(null,a)):(hn(e),Ro(e,r))}var m=t.memoizedState;if(m!==null&&(r=m.dehydrated,r!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=ko(t,e,n)):e.memoizedState!==null?(gn(),e.child=t.child,e.flags|=128,e=null):(gn(),r=a.fallback,l=e.mode,a=Ei({mode:"visible",children:a.children},l),r=Hn(r,l,n,null),r.flags|=2,a.return=e,r.return=e,a.sibling=r,e.child=a,Vn(e,t.child,null,n),a=e.child,a.memoizedState=Mo(n),a.childLanes=Do(t,u,n),e.memoizedState=_o,e=fl(null,a));else if(hn(e),ds(r)){if(u=r.nextSibling&&r.nextSibling.dataset,u)var x=u.dgst;u=x,a=Error(o(419)),a.stack="",a.digest=u,Pa({value:a,source:null,stack:null}),e=ko(t,e,n)}else if(Gt||ga(t,e,n,!1),u=(n&t.childLanes)!==0,Gt||u){if(u=Dt,u!==null&&(a=gr(u,n),a!==0&&a!==m.retryLane))throw m.retryLane=a,Un(t,a),oe(u,t,a),Co;fs(r)||ki(),e=ko(t,e,n)}else fs(r)?(e.flags|=192,e.child=t.child,e=null):(t=m.treeContext,kt=Ce(r.nextSibling),Jt=e,vt=!0,on=null,xe=!1,t!==null&&cc(e,t),e=Ro(e,a.children),e.flags|=4096);return e}return l?(gn(),r=a.fallback,l=e.mode,m=t.child,x=m.sibling,a=qe(m,{mode:"hidden",children:a.children}),a.subtreeFlags=m.subtreeFlags&65011712,x!==null?r=qe(x,r):(r=Hn(r,l,n,null),r.flags|=2),r.return=e,a.return=e,a.sibling=r,e.child=a,fl(null,a),a=e.child,r=t.child.memoizedState,r===null?r=Mo(n):(l=r.cachePool,l!==null?(m=qt._currentValue,l=l.parent!==m?{parent:m,pool:m}:l):l=pc(),r={baseLanes:r.baseLanes|n,cachePool:l}),a.memoizedState=r,a.childLanes=Do(t,u,n),e.memoizedState=_o,fl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=qe(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function Ro(t,e){return e=Ei({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ei(t,e){return t=de(22,t,null,e),t.lanes=0,t}function ko(t,e,n){return Vn(e,t.child,null,n),t=Ro(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Df(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Zu(t.return,e,n)}function zo(t,e,n,a,l,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function Rf(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=Bt.current,r=(u&2)!==0;if(r?(u=u&1|2,e.flags|=128):u&=1,G(Bt,u),Ft(t,e,a,n),a=vt?$a:0,!r&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Df(t,n,e);else if(t.tag===19)Df(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&fi(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),zo(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&fi(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}zo(e,!0,n,null,i,a);break;case"together":zo(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ga(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(o(153));if(e.child!==null){for(t=e.child,n=qe(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=qe(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Oo(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ai(t)))}function jm(t,e,n){switch(e.tag){case 3:Rt(e,e.stateNode.containerInfo),rn(e,qt,t.memoizedState.cache),Bn();break;case 27:case 5:He(e);break;case 4:Rt(e,e.stateNode.containerInfo);break;case 10:rn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,lo(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Mf(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(ga(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return Rf(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),G(Bt,Bt.current),a)break;return null;case 22:return e.lanes=0,Ef(t,e,n,e.pendingProps);case 24:rn(e,qt,t.memoizedState.cache)}return Ze(t,e,n)}function kf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Gt=!0;else{if(!Oo(t,n)&&(e.flags&128)===0)return Gt=!1,jm(t,e,n);Gt=(t.flags&131072)!==0}else Gt=!1,vt&&(e.flags&1048576)!==0&&rc(e,$a,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=Yn(e.elementType),e.type=t,typeof t=="function")ju(t)?(a=Qn(t,a),e.tag=1,e=Nf(null,e,t,a,n)):(e.tag=0,e=No(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===K){e.tag=11,e=wf(null,e,t,a,n);break t}else if(l===j){e.tag=14,e=Sf(null,e,t,a,n);break t}}throw e=it(t)||t,Error(o(306,e,""))}}return e;case 0:return No(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Qn(a,e.pendingProps),Nf(t,e,a,l,n);case 3:t:{if(Rt(e,e.stateNode.containerInfo),t===null)throw Error(o(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,Pu(t,e),ul(e,a,null,n);var u=e.memoizedState;if(a=u.cache,rn(e,qt,a),a!==i.cache&&Ku(e,[qt],n,!0),il(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=_f(t,e,a,n);break t}else if(a!==l){l=Se(Error(o(424)),e),Pa(l),e=_f(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(kt=Ce(t.firstChild),Jt=e,vt=!0,on=null,xe=!0,n=Tc(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Bn(),a===l){e=Ze(t,e,n);break t}Ft(t,e,a,n)}e=e.child}return e;case 26:return Ti(t,e),t===null?(n=Vd(e.type,null,e.pendingProps,null))?e.memoizedState=n:vt||(n=e.type,t=e.pendingProps,a=Li(ft.current).createElement(n),a[Kt]=e,a[ee]=t,Wt(a,n,t),Qt(a),e.stateNode=a):e.memoizedState=Vd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return He(e),t===null&&vt&&(a=e.stateNode=qd(e.type,e.pendingProps,ft.current),Jt=e,xe=!0,l=kt,Tn(e.type)?(hs=l,kt=Ce(a.firstChild)):kt=l),Ft(t,e,e.pendingProps.children,n),Ti(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&vt&&((l=a=kt)&&(a=g0(a,e.type,e.pendingProps,xe),a!==null?(e.stateNode=a,Jt=e,kt=Ce(a.firstChild),xe=!1,l=!0):l=!1),l||sn(e)),He(e),l=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,a=i.children,ss(l,i)?a=null:u!==null&&ss(l,u)&&(e.flags|=32),e.memoizedState!==null&&(l=uo(t,e,Mm,null,null,n),Cl._currentValue=l),Ti(t,e),Ft(t,e,a,n),e.child;case 6:return t===null&&vt&&((t=n=kt)&&(n=m0(n,e.pendingProps,xe),n!==null?(e.stateNode=n,Jt=e,kt=null,t=!0):t=!1),t||sn(e)),null;case 13:return Mf(t,e,n);case 4:return Rt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Vn(e,null,a,n):Ft(t,e,a,n),e.child;case 11:return wf(t,e,e.type,e.pendingProps,n);case 7:return Ft(t,e,e.pendingProps,n),e.child;case 8:return Ft(t,e,e.pendingProps.children,n),e.child;case 12:return Ft(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,rn(e,e.type,a.value),Ft(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,Ln(e),l=It(l),a=a(l),e.flags|=1,Ft(t,e,a,n),e.child;case 14:return Sf(t,e,e.type,e.pendingProps,n);case 15:return Tf(t,e,e.type,e.pendingProps,n);case 19:return Rf(t,e,n);case 31:return Bm(t,e,n);case 22:return Ef(t,e,n,e.pendingProps);case 24:return Ln(e),a=It(qt),t===null?(l=Fu(),l===null&&(l=Dt,i=Ju(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},$u(e),rn(e,qt,l)):((t.lanes&n)!==0&&(Pu(t,e),ul(e,null,null,n),il()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),rn(e,qt,a)):(a=i.cache,rn(e,qt,a),a!==l.cache&&Ku(e,[qt],n,!0))),Ft(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(o(156,e.tag))}function Ke(t){t.flags|=4}function Uo(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(id())t.flags|=8192;else throw Gn=oi,Wu}else t.flags&=-16777217}function zf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Jd(e))if(id())t.flags|=8192;else throw Gn=oi,Wu}function xi(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?fr():536870912,t.lanes|=e,Ca|=e)}function dl(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function zt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Lm(t,e,n){var a=e.pendingProps;switch(Gu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zt(e),null;case 1:return zt(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Ve(qt),Ct(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ha(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Xu())),zt(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(zt(e),zf(e,i)):(zt(e),Uo(e,l,null,a,n))):i?i!==t.memoizedState?(Ke(e),zt(e),zf(e,i)):(zt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ke(e),zt(e),Uo(e,l,t,a,n)),null;case 27:if(Ul(e),n=ft.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return zt(e),null}t=F.current,ha(e)?fc(e):(t=qd(l,a,n),e.stateNode=t,Ke(e))}return zt(e),null;case 5:if(Ul(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return zt(e),null}if(i=F.current,ha(e))fc(e);else{var u=Li(ft.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[Kt]=e,i[ee]=a;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch(Wt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ke(e)}}return zt(e),Uo(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(o(166));if(t=ft.current,ha(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Jt,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[Kt]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Md(t.nodeValue,n)),t||sn(e,!0)}else t=Li(t).createTextNode(a),t[Kt]=e,e.stateNode=t}return zt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ha(e),n!==null){if(t===null){if(!a)throw Error(o(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(557));t[Kt]=e}else Bn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),t=!1}else n=Xu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ge(e),e):(ge(e),null);if((e.flags&128)!==0)throw Error(o(558))}return zt(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ha(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(o(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(o(317));l[Kt]=e}else Bn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),l=!1}else l=Xu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(ge(e),e):(ge(e),null)}return ge(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),xi(e,e.updateQueue),zt(e),null);case 4:return Ct(),t===null&&as(e.stateNode.containerInfo),zt(e),null;case 10:return Ve(e.type),zt(e),null;case 19:if(k(Bt),a=e.memoizedState,a===null)return zt(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)dl(a,!1);else{if(Ht!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=fi(t),i!==null){for(e.flags|=128,dl(a,!1),t=i.updateQueue,e.updateQueue=t,xi(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)uc(n,t),n=n.sibling;return G(Bt,Bt.current&1|2),vt&&Ye(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&se()>Mi&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304)}else{if(!l)if(t=fi(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,xi(e,t),dl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!vt)return zt(e),null}else 2*se()-a.renderingStartTime>Mi&&n!==536870912&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=se(),t.sibling=null,n=Bt.current,G(Bt,l?n&1|2:n&1),vt&&Ye(e,a.treeForkCount),t):(zt(e),null);case 22:case 23:return ge(e),ao(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(zt(e),e.subtreeFlags&6&&(e.flags|=8192)):zt(e),n=e.updateQueue,n!==null&&xi(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&k(qn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Ve(qt),zt(e),null;case 25:return null;case 30:return null}throw Error(o(156,e.tag))}function qm(t,e){switch(Gu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ve(qt),Ct(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Ul(e),null;case 31:if(e.memoizedState!==null){if(ge(e),e.alternate===null)throw Error(o(340));Bn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ge(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(o(340));Bn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return k(Bt),null;case 4:return Ct(),null;case 10:return Ve(e.type),null;case 22:case 23:return ge(e),ao(),t!==null&&k(qn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Ve(qt),null;case 25:return null;default:return null}}function Of(t,e){switch(Gu(e),e.tag){case 3:Ve(qt),Ct();break;case 26:case 27:case 5:Ul(e);break;case 4:Ct();break;case 31:e.memoizedState!==null&&ge(e);break;case 13:ge(e);break;case 19:k(Bt);break;case 10:Ve(e.type);break;case 22:case 23:ge(e),ao(),t!==null&&k(qn);break;case 24:Ve(qt)}}function hl(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(r){At(e,e.return,r)}}function mn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var u=a.inst,r=u.destroy;if(r!==void 0){u.destroy=void 0,l=e;var m=n,x=r;try{x()}catch(_){At(l,m,_)}}}a=a.next}while(a!==i)}}catch(_){At(e,e.return,_)}}function Uf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{xc(e,n)}catch(a){At(t,t.return,a)}}}function Hf(t,e,n){n.props=Qn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){At(t,e,a)}}function gl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){At(t,e,l)}}function ze(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){At(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){At(t,e,l)}else n.current=null}function Bf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){At(t,t.return,l)}}function Ho(t,e,n){try{var a=t.stateNode;s0(a,t.type,n,e),a[ee]=e}catch(l){At(t,t.return,l)}}function jf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Tn(t.type)||t.tag===4}function Bo(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||jf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Tn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function jo(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=je));else if(a!==4&&(a===27&&Tn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(jo(t,e,n),t=t.sibling;t!==null;)jo(t,e,n),t=t.sibling}function Ai(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&Tn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ai(t,e,n),t=t.sibling;t!==null;)Ai(t,e,n),t=t.sibling}function Lf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);Wt(e,a,n),e[Kt]=t,e[ee]=n}catch(i){At(t,t.return,i)}}var Je=!1,Vt=!1,Lo=!1,qf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function Ym(t,e){if(t=t.containerInfo,us=Zi,t=Wr(t),Ru(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,r=-1,m=-1,x=0,_=0,R=t,A=null;e:for(;;){for(var C;R!==n||l!==0&&R.nodeType!==3||(r=u+l),R!==i||a!==0&&R.nodeType!==3||(m=u+a),R.nodeType===3&&(u+=R.nodeValue.length),(C=R.firstChild)!==null;)A=R,R=C;for(;;){if(R===t)break e;if(A===n&&++x===l&&(r=u),A===i&&++_===a&&(m=u),(C=R.nextSibling)!==null)break;R=A,A=R.parentNode}R=C}n=r===-1||m===-1?null:{start:r,end:m}}else n=null}n=n||{start:0,end:0}}else n=null;for(os={focusedElem:t,selectionRange:n},Zi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var I=Qn(n.type,l);t=a.getSnapshotBeforeUpdate(I,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(lt){At(n,n.return,lt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)cs(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":cs(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(o(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function Yf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Fe(t,n),a&4&&hl(5,n);break;case 1:if(Fe(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){At(n,n.return,u)}else{var l=Qn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){At(n,n.return,u)}}a&64&&Uf(n),a&512&&gl(n,n.return);break;case 3:if(Fe(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{xc(t,e)}catch(u){At(n,n.return,u)}}break;case 27:e===null&&a&4&&Lf(n);case 26:case 5:Fe(t,n),e===null&&a&4&&Bf(n),a&512&&gl(n,n.return);break;case 12:Fe(t,n);break;case 31:Fe(t,n),a&4&&Xf(t,n);break;case 13:Fe(t,n),a&4&&Qf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Fm.bind(null,n),p0(t,n))));break;case 22:if(a=n.memoizedState!==null||Je,!a){e=e!==null&&e.memoizedState!==null||Vt,l=Je;var i=Vt;Je=a,(Vt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Fe(t,n),Je=l,Vt=i}break;case 30:break;default:Fe(t,n)}}function Gf(t){var e=t.alternate;e!==null&&(t.alternate=null,Gf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&gu(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Ot=null,ae=!1;function Ie(t,e,n){for(n=n.child;n!==null;)Vf(t,e,n),n=n.sibling}function Vf(t,e,n){if(re&&typeof re.onCommitFiberUnmount=="function")try{re.onCommitFiberUnmount(ja,n)}catch{}switch(n.tag){case 26:Vt||ze(n,e),Ie(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Vt||ze(n,e);var a=Ot,l=ae;Tn(n.type)&&(Ot=n.stateNode,ae=!1),Ie(t,e,n),El(n.stateNode),Ot=a,ae=l;break;case 5:Vt||ze(n,e);case 6:if(a=Ot,l=ae,Ot=null,Ie(t,e,n),Ot=a,ae=l,Ot!==null)if(ae)try{(Ot.nodeType===9?Ot.body:Ot.nodeName==="HTML"?Ot.ownerDocument.body:Ot).removeChild(n.stateNode)}catch(i){At(n,e,i)}else try{Ot.removeChild(n.stateNode)}catch(i){At(n,e,i)}break;case 18:Ot!==null&&(ae?(t=Ot,Ud(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Oa(t)):Ud(Ot,n.stateNode));break;case 4:a=Ot,l=ae,Ot=n.stateNode.containerInfo,ae=!0,Ie(t,e,n),Ot=a,ae=l;break;case 0:case 11:case 14:case 15:mn(2,n,e),Vt||mn(4,n,e),Ie(t,e,n);break;case 1:Vt||(ze(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Hf(n,e,a)),Ie(t,e,n);break;case 21:Ie(t,e,n);break;case 22:Vt=(a=Vt)||n.memoizedState!==null,Ie(t,e,n),Vt=a;break;default:Ie(t,e,n)}}function Xf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Oa(t)}catch(n){At(e,e.return,n)}}}function Qf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Oa(t)}catch(n){At(e,e.return,n)}}function Gm(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new qf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new qf),e;default:throw Error(o(435,t.tag))}}function Ci(t,e){var n=Gm(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=Wm.bind(null,t,a);a.then(l,l)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,u=e,r=u;t:for(;r!==null;){switch(r.tag){case 27:if(Tn(r.type)){Ot=r.stateNode,ae=!1;break t}break;case 5:Ot=r.stateNode,ae=!1;break t;case 3:case 4:Ot=r.stateNode.containerInfo,ae=!0;break t}r=r.return}if(Ot===null)throw Error(o(160));Vf(i,u,l),Ot=null,ae=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Zf(e,t),e=e.sibling}var Me=null;function Zf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ie(t),a&4&&(mn(3,t,t.return),hl(3,t),mn(5,t,t.return));break;case 1:le(e,t),ie(t),a&512&&(Vt||n===null||ze(n,n.return)),a&64&&Je&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Me;if(le(e,t),ie(t),a&512&&(Vt||n===null||ze(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[Ya]||i[Kt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),Wt(i,a,n),i[Kt]=t,Qt(i),a=i;break t;case"link":var u=Zd("link","href",l).get(a+(n.href||""));if(u){for(var r=0;r<u.length;r++)if(i=u[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(r,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;case"meta":if(u=Zd("meta","content",l).get(a+(n.content||""))){for(r=0;r<u.length;r++)if(i=u[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(r,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;default:throw Error(o(468,a))}i[Kt]=t,Qt(i),a=i}t.stateNode=a}else Kd(l,t.type,t.stateNode);else t.stateNode=Qd(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Kd(l,t.type,t.stateNode):Qd(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Ho(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ie(t),a&512&&(Vt||n===null||ze(n,n.return)),n!==null&&a&4&&Ho(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ie(t),a&512&&(Vt||n===null||ze(n,n.return)),t.flags&32){l=t.stateNode;try{aa(l,"")}catch(I){At(t,t.return,I)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,Ho(t,l,n!==null?n.memoizedProps:l)),a&1024&&(Lo=!0);break;case 6:if(le(e,t),ie(t),a&4){if(t.stateNode===null)throw Error(o(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(I){At(t,t.return,I)}}break;case 3:if(Gi=null,l=Me,Me=qi(e.containerInfo),le(e,t),Me=l,ie(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Oa(e.containerInfo)}catch(I){At(t,t.return,I)}Lo&&(Lo=!1,Kf(t));break;case 4:a=Me,Me=qi(t.stateNode.containerInfo),le(e,t),ie(t),Me=a;break;case 12:le(e,t),ie(t);break;case 31:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 13:le(e,t),ie(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(_i=se()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 22:l=t.memoizedState!==null;var m=n!==null&&n.memoizedState!==null,x=Je,_=Vt;if(Je=x||l,Vt=_||m,le(e,t),Vt=_,Je=x,ie(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||m||Je||Vt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){m=n=e;try{if(i=m.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{r=m.stateNode;var R=m.memoizedProps.style,A=R!=null&&R.hasOwnProperty("display")?R.display:null;r.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(I){At(m,m.return,I)}}}else if(e.tag===6){if(n===null){m=e;try{m.stateNode.nodeValue=l?"":m.memoizedProps}catch(I){At(m,m.return,I)}}}else if(e.tag===18){if(n===null){m=e;try{var C=m.stateNode;l?Hd(C,!0):Hd(m.stateNode,!1)}catch(I){At(m,m.return,I)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ci(t,n))));break;case 19:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 30:break;case 21:break;default:le(e,t),ie(t)}}function ie(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(jf(a)){n=a;break}a=a.return}if(n==null)throw Error(o(160));switch(n.tag){case 27:var l=n.stateNode,i=Bo(t);Ai(t,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(aa(u,""),n.flags&=-33);var r=Bo(t);Ai(t,r,u);break;case 3:case 4:var m=n.stateNode.containerInfo,x=Bo(t);jo(t,x,m);break;default:throw Error(o(161))}}catch(_){At(t,t.return,_)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Kf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Kf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Fe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Yf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:mn(4,e,e.return),Zn(e);break;case 1:ze(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Hf(e,e.return,n),Zn(e);break;case 27:El(e.stateNode);case 26:case 5:ze(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(l,i,n),hl(4,i);break;case 1:if(We(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(x){At(a,a.return,x)}if(a=i,l=a.updateQueue,l!==null){var r=a.stateNode;try{var m=l.shared.hiddenCallbacks;if(m!==null)for(l.shared.hiddenCallbacks=null,l=0;l<m.length;l++)Ec(m[l],r)}catch(x){At(a,a.return,x)}}n&&u&64&&Uf(i),gl(i,i.return);break;case 27:Lf(i);case 26:case 5:We(l,i,n),n&&a===null&&u&4&&Bf(i),gl(i,i.return);break;case 12:We(l,i,n);break;case 31:We(l,i,n),n&&u&4&&Xf(l,i);break;case 13:We(l,i,n),n&&u&4&&Qf(l,i);break;case 22:i.memoizedState===null&&We(l,i,n),gl(i,i.return);break;case 30:break;default:We(l,i,n)}e=e.sibling}}function qo(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&tl(n))}function Yo(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t))}function De(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Jf(t,e,n,a),e=e.sibling}function Jf(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:De(t,e,n,a),l&2048&&hl(9,e);break;case 1:De(t,e,n,a);break;case 3:De(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t)));break;case 12:if(l&2048){De(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,r=i.onPostCommit;typeof r=="function"&&r(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(m){At(e,e.return,m)}}else De(t,e,n,a);break;case 31:De(t,e,n,a);break;case 13:De(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?De(t,e,n,a):ml(t,e):i._visibility&2?De(t,e,n,a):(i._visibility|=2,Ea(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&qo(u,e);break;case 24:De(t,e,n,a),l&2048&&Yo(e.alternate,e);break;default:De(t,e,n,a)}}function Ea(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,r=n,m=a,x=u.flags;switch(u.tag){case 0:case 11:case 15:Ea(i,u,r,m,l),hl(8,u);break;case 23:break;case 22:var _=u.stateNode;u.memoizedState!==null?_._visibility&2?Ea(i,u,r,m,l):ml(i,u):(_._visibility|=2,Ea(i,u,r,m,l)),l&&x&2048&&qo(u.alternate,u);break;case 24:Ea(i,u,r,m,l),l&&x&2048&&Yo(u.alternate,u);break;default:Ea(i,u,r,m,l)}e=e.sibling}}function ml(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:ml(n,a),l&2048&&qo(a.alternate,a);break;case 24:ml(n,a),l&2048&&Yo(a.alternate,a);break;default:ml(n,a)}e=e.sibling}}var pl=8192;function xa(t,e,n){if(t.subtreeFlags&pl)for(t=t.child;t!==null;)If(t,e,n),t=t.sibling}function If(t,e,n){switch(t.tag){case 26:xa(t,e,n),t.flags&pl&&t.memoizedState!==null&&_0(n,Me,t.memoizedState,t.memoizedProps);break;case 5:xa(t,e,n);break;case 3:case 4:var a=Me;Me=qi(t.stateNode.containerInfo),xa(t,e,n),Me=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=pl,pl=16777216,xa(t,e,n),pl=a):xa(t,e,n));break;default:xa(t,e,n)}}function Ff(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function yl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,$f(a,t)}Ff(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Wf(t),t=t.sibling}function Wf(t){switch(t.tag){case 0:case 11:case 15:yl(t),t.flags&2048&&mn(9,t,t.return);break;case 3:yl(t);break;case 12:yl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ni(t)):yl(t);break;default:yl(t)}}function Ni(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,$f(a,t)}Ff(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:mn(8,e,e.return),Ni(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ni(e));break;default:Ni(e)}t=t.sibling}}function $f(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:mn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:tl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Zt=a;else t:for(n=t;Zt!==null;){a=Zt;var l=a.sibling,i=a.return;if(Gf(a),a===n){Zt=null;break t}if(l!==null){l.return=i,Zt=l;break t}Zt=i}}}var Vm={getCacheForType:function(t){var e=It(qt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return It(qt).controller.signal}},Xm=typeof WeakMap=="function"?WeakMap:Map,Tt=0,Dt=null,ht=null,mt=0,xt=0,me=null,pn=!1,Aa=!1,Go=!1,$e=0,Ht=0,yn=0,Kn=0,Vo=0,pe=0,Ca=0,vl=null,ue=null,Xo=!1,_i=0,Pf=0,Mi=1/0,Di=null,vn=null,Xt=0,bn=null,Na=null,Pe=0,Qo=0,Zo=null,td=null,bl=0,Ko=null;function ye(){return(Tt&2)!==0&&mt!==0?mt&-mt:N.T!==null?Po():mr()}function ed(){if(pe===0)if((mt&536870912)===0||vt){var t=jl;jl<<=1,(jl&3932160)===0&&(jl=262144),pe=t}else pe=536870912;return t=he.current,t!==null&&(t.flags|=32),pe}function oe(t,e,n){(t===Dt&&(xt===2||xt===9)||t.cancelPendingCommit!==null)&&(_a(t,0),wn(t,mt,pe,!1)),qa(t,n),((Tt&2)===0||t!==Dt)&&(t===Dt&&((Tt&2)===0&&(Kn|=n),Ht===4&&wn(t,mt,pe,!1)),Oe(t))}function nd(t,e,n){if((Tt&6)!==0)throw Error(o(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||La(t,e),l=a?Km(t,e):Io(t,e,!0),i=a;do{if(l===0){Aa&&!a&&wn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!Qm(n)){l=Io(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var r=t;l=vl;var m=r.current.memoizedState.isDehydrated;if(m&&(_a(r,u).flags|=256),u=Io(r,u,!1),u!==2){if(Go&&!m){r.errorRecoveryDisabledLanes|=i,Kn|=i,l=4;break t}i=ue,ue=l,i!==null&&(ue===null?ue=i:ue.push.apply(ue,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){_a(t,0),wn(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(o(345));case 4:if((e&4194048)!==e)break;case 6:wn(a,e,pe,!pn);break t;case 2:ue=null;break;case 3:case 5:break;default:throw Error(o(329))}if((e&62914560)===e&&(l=_i+300-se(),10<l)){if(wn(a,e,pe,!pn),ql(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=zd(ad.bind(null,a,n,ue,Di,Xo,e,pe,Kn,Ca,pn,i,"Throttled",-0,0),l);break t}ad(a,n,ue,Di,Xo,e,pe,Kn,Ca,pn,i,null,-0,0)}}break}while(!0);Oe(t)}function ad(t,e,n,a,l,i,u,r,m,x,_,R,A,C){if(t.timeoutHandle=-1,R=e.subtreeFlags,R&8192||(R&16785408)===16785408){R={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:je},If(e,i,R);var I=(i&62914560)===i?_i-se():(i&4194048)===i?Pf-se():0;if(I=M0(R,I),I!==null){Pe=i,t.cancelPendingCommit=I(fd.bind(null,t,e,i,n,a,l,u,r,m,_,R,null,A,C)),wn(t,i,u,!x);return}}fd(t,e,i,n,a,l,u,r,m)}function Qm(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!fe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wn(t,e,n,a){e&=~Vo,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-ce(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&dr(t,n,e)}function Ri(){return(Tt&6)===0?(wl(0),!1):!0}function Jo(){if(ht!==null){if(xt===0)var t=ht.return;else t=ht,Ge=jn=null,ro(t),va=null,nl=0,t=ht;for(;t!==null;)Of(t.alternate,t),t=t.return;ht=null}}function _a(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,f0(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Jo(),Dt=t,ht=n=qe(t.current,null),mt=e,xt=0,me=null,pn=!1,Aa=La(t,e),Go=!1,Ca=pe=Vo=Kn=yn=Ht=0,ue=vl=null,Xo=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-ce(a),i=1<<l;e|=t[l],a&=~i}return $e=e,$l(),n}function ld(t,e){st=null,N.H=cl,e===ya||e===ui?(e=bc(),xt=3):e===Wu?(e=bc(),xt=4):xt=e===Co?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,me=e,ht===null&&(Ht=1,wi(t,Se(e,t.current)))}function id(){var t=he.current;return t===null?!0:(mt&4194048)===mt?Ae===null:(mt&62914560)===mt||(mt&536870912)!==0?t===Ae:!1}function ud(){var t=N.H;return N.H=cl,t===null?cl:t}function od(){var t=N.A;return N.A=Vm,t}function ki(){Ht=4,pn||(mt&4194048)!==mt&&he.current!==null||(Aa=!0),(yn&134217727)===0&&(Kn&134217727)===0||Dt===null||wn(Dt,mt,pe,!1)}function Io(t,e,n){var a=Tt;Tt|=2;var l=ud(),i=od();(Dt!==t||mt!==e)&&(Di=null,_a(t,e)),e=!1;var u=Ht;t:do try{if(xt!==0&&ht!==null){var r=ht,m=me;switch(xt){case 8:Jo(),u=6;break t;case 3:case 2:case 9:case 6:he.current===null&&(e=!0);var x=xt;if(xt=0,me=null,Ma(t,r,m,x),n&&Aa){u=0;break t}break;default:x=xt,xt=0,me=null,Ma(t,r,m,x)}}Zm(),u=Ht;break}catch(_){ld(t,_)}while(!0);return e&&t.shellSuspendCounter++,Ge=jn=null,Tt=a,N.H=l,N.A=i,ht===null&&(Dt=null,mt=0,$l()),u}function Zm(){for(;ht!==null;)sd(ht)}function Km(t,e){var n=Tt;Tt|=2;var a=ud(),l=od();Dt!==t||mt!==e?(Di=null,Mi=se()+500,_a(t,e)):Aa=La(t,e);t:do try{if(xt!==0&&ht!==null){e=ht;var i=me;e:switch(xt){case 1:xt=0,me=null,Ma(t,e,i,1);break;case 2:case 9:if(yc(i)){xt=0,me=null,rd(e);break}e=function(){xt!==2&&xt!==9||Dt!==t||(xt=7),Oe(t)},i.then(e,e);break t;case 3:xt=7;break t;case 4:xt=5;break t;case 7:yc(i)?(xt=0,me=null,rd(e)):(xt=0,me=null,Ma(t,e,i,7));break;case 5:var u=null;switch(ht.tag){case 26:u=ht.memoizedState;case 5:case 27:var r=ht;if(u?Jd(u):r.stateNode.complete){xt=0,me=null;var m=r.sibling;if(m!==null)ht=m;else{var x=r.return;x!==null?(ht=x,zi(x)):ht=null}break e}}xt=0,me=null,Ma(t,e,i,5);break;case 6:xt=0,me=null,Ma(t,e,i,6);break;case 8:Jo(),Ht=6;break t;default:throw Error(o(462))}}Jm();break}catch(_){ld(t,_)}while(!0);return Ge=jn=null,N.H=a,N.A=l,Tt=n,ht!==null?0:(Dt=null,mt=0,$l(),Ht)}function Jm(){for(;ht!==null&&!yg();)sd(ht)}function sd(t){var e=kf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?zi(t):ht=e}function rd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Cf(n,e,e.pendingProps,e.type,void 0,mt);break;case 11:e=Cf(n,e,e.pendingProps,e.type.render,e.ref,mt);break;case 5:ro(e);default:Of(n,e),e=ht=uc(e,$e),e=kf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?zi(t):ht=e}function Ma(t,e,n,a){Ge=jn=null,ro(e),va=null,nl=0;var l=e.return;try{if(Hm(t,l,e,n,mt)){Ht=1,wi(t,Se(n,t.current)),ht=null;return}}catch(i){if(l!==null)throw ht=l,i;Ht=1,wi(t,Se(n,t.current)),ht=null;return}e.flags&32768?(vt||a===1?t=!0:Aa||(mt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=he.current,a!==null&&a.tag===13&&(a.flags|=16384))),cd(e,t)):zi(e)}function zi(t){var e=t;do{if((e.flags&32768)!==0){cd(e,pn);return}t=e.return;var n=Lm(e.alternate,e,$e);if(n!==null){ht=n;return}if(e=e.sibling,e!==null){ht=e;return}ht=e=t}while(e!==null);Ht===0&&(Ht=5)}function cd(t,e){do{var n=qm(t.alternate,t);if(n!==null){n.flags&=32767,ht=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){ht=t;return}ht=t=n}while(t!==null);Ht=6,ht=null}function fd(t,e,n,a,l,i,u,r,m){t.cancelPendingCommit=null;do Oi();while(Xt!==0);if((Tt&6)!==0)throw Error(o(327));if(e!==null){if(e===t.current)throw Error(o(177));if(i=e.lanes|e.childLanes,i|=Hu,Ng(t,n,i,u,r,m),t===Dt&&(ht=Dt=null,mt=0),Na=e,bn=t,Pe=n,Qo=i,Zo=l,td=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,$m(Hl,function(){return pd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=N.T,N.T=null,l=Q.p,Q.p=2,u=Tt,Tt|=4;try{Ym(t,e,n)}finally{Tt=u,Q.p=l,N.T=a}}Xt=1,dd(),hd(),gd()}}function dd(){if(Xt===1){Xt=0;var t=bn,e=Na,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=N.T,N.T=null;var a=Q.p;Q.p=2;var l=Tt;Tt|=4;try{Zf(e,t);var i=os,u=Wr(t.containerInfo),r=i.focusedElem,m=i.selectionRange;if(u!==r&&r&&r.ownerDocument&&Fr(r.ownerDocument.documentElement,r)){if(m!==null&&Ru(r)){var x=m.start,_=m.end;if(_===void 0&&(_=x),"selectionStart"in r)r.selectionStart=x,r.selectionEnd=Math.min(_,r.value.length);else{var R=r.ownerDocument||document,A=R&&R.defaultView||window;if(A.getSelection){var C=A.getSelection(),I=r.textContent.length,lt=Math.min(m.start,I),Mt=m.end===void 0?lt:Math.min(m.end,I);!C.extend&&lt>Mt&&(u=Mt,Mt=lt,lt=u);var S=Ir(r,lt),v=Ir(r,Mt);if(S&&v&&(C.rangeCount!==1||C.anchorNode!==S.node||C.anchorOffset!==S.offset||C.focusNode!==v.node||C.focusOffset!==v.offset)){var E=R.createRange();E.setStart(S.node,S.offset),C.removeAllRanges(),lt>Mt?(C.addRange(E),C.extend(v.node,v.offset)):(E.setEnd(v.node,v.offset),C.addRange(E))}}}}for(R=[],C=r;C=C.parentNode;)C.nodeType===1&&R.push({element:C,left:C.scrollLeft,top:C.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<R.length;r++){var M=R[r];M.element.scrollLeft=M.left,M.element.scrollTop=M.top}}Zi=!!us,os=us=null}finally{Tt=l,Q.p=a,N.T=n}}t.current=e,Xt=2}}function hd(){if(Xt===2){Xt=0;var t=bn,e=Na,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=N.T,N.T=null;var a=Q.p;Q.p=2;var l=Tt;Tt|=4;try{Yf(t,e.alternate,e)}finally{Tt=l,Q.p=a,N.T=n}}Xt=3}}function gd(){if(Xt===4||Xt===3){Xt=0,vg();var t=bn,e=Na,n=Pe,a=td;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Xt=5:(Xt=0,Na=bn=null,md(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),du(n),e=e.stateNode,re&&typeof re.onCommitFiberRoot=="function")try{re.onCommitFiberRoot(ja,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=N.T,l=Q.p,Q.p=2,N.T=null;try{for(var i=t.onRecoverableError,u=0;u<a.length;u++){var r=a[u];i(r.value,{componentStack:r.stack})}}finally{N.T=e,Q.p=l}}(Pe&3)!==0&&Oi(),Oe(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Ko?bl++:(bl=0,Ko=t):bl=0,wl(0)}}function md(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,tl(e)))}function Oi(){return dd(),hd(),gd(),pd()}function pd(){if(Xt!==5)return!1;var t=bn,e=Qo;Qo=0;var n=du(Pe),a=N.T,l=Q.p;try{Q.p=32>n?32:n,N.T=null,n=Zo,Zo=null;var i=bn,u=Pe;if(Xt=0,Na=bn=null,Pe=0,(Tt&6)!==0)throw Error(o(331));var r=Tt;if(Tt|=4,Wf(i.current),Jf(i,i.current,u,n),Tt=r,wl(0,!1),re&&typeof re.onPostCommitFiberRoot=="function")try{re.onPostCommitFiberRoot(ja,i)}catch{}return!0}finally{Q.p=l,N.T=a,md(t,e)}}function yd(t,e,n){e=Se(n,e),e=Ao(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(qa(t,2),Oe(t))}function At(t,e,n){if(t.tag===3)yd(t,t,n);else for(;e!==null;){if(e.tag===3){yd(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=Se(n,t),n=vf(2),a=dn(e,n,2),a!==null&&(bf(n,a,e,t),qa(a,2),Oe(a));break}}e=e.return}}function Fo(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new Xm;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Go=!0,l.add(n),t=Im.bind(null,t,e,n),e.then(t,t))}function Im(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Dt===t&&(mt&n)===n&&(Ht===4||Ht===3&&(mt&62914560)===mt&&300>se()-_i?(Tt&2)===0&&_a(t,0):Vo|=n,Ca===mt&&(Ca=0)),Oe(t)}function vd(t,e){e===0&&(e=fr()),t=Un(t,e),t!==null&&(qa(t,e),Oe(t))}function Fm(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),vd(t,n)}function Wm(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(o(314))}a!==null&&a.delete(e),vd(t,n)}function $m(t,e){return su(t,e)}var Ui=null,Da=null,Wo=!1,Hi=!1,$o=!1,Sn=0;function Oe(t){t!==Da&&t.next===null&&(Da===null?Ui=Da=t:Da=Da.next=t),Hi=!0,Wo||(Wo=!0,t0())}function wl(t,e){if(!$o&&Hi){$o=!0;do for(var n=!1,a=Ui;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,r=a.pingedLanes;i=(1<<31-ce(42|t)+1)-1,i&=l&~(u&~r),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Td(a,i))}else i=mt,i=ql(a,a===Dt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||La(a,i)||(n=!0,Td(a,i));a=a.next}while(n);$o=!1}}function Pm(){bd()}function bd(){Hi=Wo=!1;var t=0;Sn!==0&&c0()&&(t=Sn);for(var e=se(),n=null,a=Ui;a!==null;){var l=a.next,i=wd(a,e);i===0?(a.next=null,n===null?Ui=l:n.next=l,l===null&&(Da=n)):(n=a,(t!==0||(i&3)!==0)&&(Hi=!0)),a=l}Xt!==0&&Xt!==5||wl(t),Sn!==0&&(Sn=0)}function wd(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-ce(i),r=1<<u,m=l[u];m===-1?((r&n)===0||(r&a)!==0)&&(l[u]=Cg(r,e)):m<=e&&(t.expiredLanes|=r),i&=~r}if(e=Dt,n=mt,n=ql(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(xt===2||xt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&ru(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||La(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&ru(a),du(n)){case 2:case 8:n=rr;break;case 32:n=Hl;break;case 268435456:n=cr;break;default:n=Hl}return a=Sd.bind(null,t),n=su(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&ru(a),t.callbackPriority=2,t.callbackNode=null,2}function Sd(t,e){if(Xt!==0&&Xt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Oi()&&t.callbackNode!==n)return null;var a=mt;return a=ql(t,t===Dt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(nd(t,a,e),wd(t,se()),t.callbackNode!=null&&t.callbackNode===n?Sd.bind(null,t):null)}function Td(t,e){if(Oi())return null;nd(t,e,!0)}function t0(){d0(function(){(Tt&6)!==0?su(sr,Pm):bd()})}function Po(){if(Sn===0){var t=ma;t===0&&(t=Bl,Bl<<=1,(Bl&261888)===0&&(Bl=256)),Sn=t}return Sn}function Ed(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Xl(""+t)}function xd(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function e0(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=Ed((l[ee]||null).action),u=a.submitter;u&&(e=(e=u[ee]||null)?Ed(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var r=new Jl("action","action",null,a,l);t.push({event:r,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Sn!==0){var m=u?xd(l,u):new FormData(l);bo(n,{pending:!0,data:m,method:l.method,action:i},null,m)}}else typeof i=="function"&&(r.preventDefault(),m=u?xd(l,u):new FormData(l),bo(n,{pending:!0,data:m,method:l.method,action:i},i,m))},currentTarget:l}]})}}for(var ts=0;ts<Uu.length;ts++){var es=Uu[ts],n0=es.toLowerCase(),a0=es[0].toUpperCase()+es.slice(1);_e(n0,"on"+a0)}_e(tc,"onAnimationEnd"),_e(ec,"onAnimationIteration"),_e(nc,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(bm,"onTransitionRun"),_e(wm,"onTransitionStart"),_e(Sm,"onTransitionCancel"),_e(ac,"onTransitionEnd"),ea("onMouseEnter",["mouseout","mouseover"]),ea("onMouseLeave",["mouseout","mouseover"]),ea("onPointerEnter",["pointerout","pointerover"]),ea("onPointerLeave",["pointerout","pointerover"]),Rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Rn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Sl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),l0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Sl));function Ad(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var u=a.length-1;0<=u;u--){var r=a[u],m=r.instance,x=r.currentTarget;if(r=r.listener,m!==i&&l.isPropagationStopped())break t;i=r,l.currentTarget=x;try{i(l)}catch(_){Wl(_)}l.currentTarget=null,i=m}else for(u=0;u<a.length;u++){if(r=a[u],m=r.instance,x=r.currentTarget,r=r.listener,m!==i&&l.isPropagationStopped())break t;i=r,l.currentTarget=x;try{i(l)}catch(_){Wl(_)}l.currentTarget=null,i=m}}}}function gt(t,e){var n=e[hu];n===void 0&&(n=e[hu]=new Set);var a=t+"__bubble";n.has(a)||(Cd(e,t,2,!1),n.add(a))}function ns(t,e,n){var a=0;e&&(a|=4),Cd(n,t,a,e)}var Bi="_reactListening"+Math.random().toString(36).slice(2);function as(t){if(!t[Bi]){t[Bi]=!0,vr.forEach(function(n){n!=="selectionchange"&&(l0.has(n)||ns(n,!1,t),ns(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Bi]||(e[Bi]=!0,ns("selectionchange",!1,e))}}function Cd(t,e,n,a){switch(eh(e)){case 2:var l=k0;break;case 8:l=z0;break;default:l=vs}n=l.bind(null,e,n,t),l=void 0,!Tu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function ls(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var r=a.stateNode.containerInfo;if(r===l)break;if(u===4)for(u=a.return;u!==null;){var m=u.tag;if((m===3||m===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;r!==null;){if(u=$n(r),u===null)return;if(m=u.tag,m===5||m===6||m===26||m===27){a=i=u;continue t}r=r.parentNode}}a=a.return}Dr(function(){var x=i,_=wu(n),R=[];t:{var A=lc.get(t);if(A!==void 0){var C=Jl,I=t;switch(t){case"keypress":if(Zl(n)===0)break t;case"keydown":case"keyup":C=Wg;break;case"focusin":I="focus",C=Cu;break;case"focusout":I="blur",C=Cu;break;case"beforeblur":case"afterblur":C=Cu;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=zr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=Lg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=tm;break;case tc:case ec:case nc:C=Gg;break;case ac:C=nm;break;case"scroll":case"scrollend":C=Bg;break;case"wheel":C=lm;break;case"copy":case"cut":case"paste":C=Xg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=Ur;break;case"toggle":case"beforetoggle":C=um}var lt=(e&4)!==0,Mt=!lt&&(t==="scroll"||t==="scrollend"),S=lt?A!==null?A+"Capture":null:A;lt=[];for(var v=x,E;v!==null;){var M=v;if(E=M.stateNode,M=M.tag,M!==5&&M!==26&&M!==27||E===null||S===null||(M=Va(v,S),M!=null&&lt.push(Tl(v,M,E))),Mt)break;v=v.return}0<lt.length&&(A=new C(A,I,null,n,_),R.push({event:A,listeners:lt}))}}if((e&7)===0){t:{if(A=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",A&&n!==bu&&(I=n.relatedTarget||n.fromElement)&&($n(I)||I[Wn]))break t;if((C||A)&&(A=_.window===_?_:(A=_.ownerDocument)?A.defaultView||A.parentWindow:window,C?(I=n.relatedTarget||n.toElement,C=x,I=I?$n(I):null,I!==null&&(Mt=d(I),lt=I.tag,I!==Mt||lt!==5&&lt!==27&&lt!==6)&&(I=null)):(C=null,I=x),C!==I)){if(lt=zr,M="onMouseLeave",S="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(lt=Ur,M="onPointerLeave",S="onPointerEnter",v="pointer"),Mt=C==null?A:Ga(C),E=I==null?A:Ga(I),A=new lt(M,v+"leave",C,n,_),A.target=Mt,A.relatedTarget=E,M=null,$n(_)===x&&(lt=new lt(S,v+"enter",I,n,_),lt.target=E,lt.relatedTarget=Mt,M=lt),Mt=M,C&&I)e:{for(lt=i0,S=C,v=I,E=0,M=S;M;M=lt(M))E++;M=0;for(var et=v;et;et=lt(et))M++;for(;0<E-M;)S=lt(S),E--;for(;0<M-E;)v=lt(v),M--;for(;E--;){if(S===v||v!==null&&S===v.alternate){lt=S;break e}S=lt(S),v=lt(v)}lt=null}else lt=null;C!==null&&Nd(R,A,C,lt,!1),I!==null&&Mt!==null&&Nd(R,Mt,I,lt,!0)}}t:{if(A=x?Ga(x):window,C=A.nodeName&&A.nodeName.toLowerCase(),C==="select"||C==="input"&&A.type==="file")var bt=Vr;else if(Yr(A))if(Xr)bt=pm;else{bt=gm;var $=hm}else C=A.nodeName,!C||C.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?x&&vu(x.elementType)&&(bt=Vr):bt=mm;if(bt&&(bt=bt(t,x))){Gr(R,bt,n,_);break t}$&&$(t,A,x),t==="focusout"&&x&&A.type==="number"&&x.memoizedProps.value!=null&&yu(A,"number",A.value)}switch($=x?Ga(x):window,t){case"focusin":(Yr($)||$.contentEditable==="true")&&(oa=$,ku=x,Wa=null);break;case"focusout":Wa=ku=oa=null;break;case"mousedown":zu=!0;break;case"contextmenu":case"mouseup":case"dragend":zu=!1,$r(R,n,_);break;case"selectionchange":if(vm)break;case"keydown":case"keyup":$r(R,n,_)}var rt;if(_u)t:{switch(t){case"compositionstart":var pt="onCompositionStart";break t;case"compositionend":pt="onCompositionEnd";break t;case"compositionupdate":pt="onCompositionUpdate";break t}pt=void 0}else ua?Lr(t,n)&&(pt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(pt="onCompositionStart");pt&&(Hr&&n.locale!=="ko"&&(ua||pt!=="onCompositionStart"?pt==="onCompositionEnd"&&ua&&(rt=Rr()):(ln=_,Eu="value"in ln?ln.value:ln.textContent,ua=!0)),$=ji(x,pt),0<$.length&&(pt=new Or(pt,t,null,n,_),R.push({event:pt,listeners:$}),rt?pt.data=rt:(rt=qr(n),rt!==null&&(pt.data=rt)))),(rt=sm?rm(t,n):cm(t,n))&&(pt=ji(x,"onBeforeInput"),0<pt.length&&($=new Or("onBeforeInput","beforeinput",null,n,_),R.push({event:$,listeners:pt}),$.data=rt)),e0(R,t,x,n,_)}Ad(R,e)})}function Tl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ji(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Va(t,n),l!=null&&a.unshift(Tl(t,l,i)),l=Va(t,e),l!=null&&a.push(Tl(t,l,i))),t.tag===3)return a;t=t.return}return[]}function i0(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Nd(t,e,n,a,l){for(var i=e._reactName,u=[];n!==null&&n!==a;){var r=n,m=r.alternate,x=r.stateNode;if(r=r.tag,m!==null&&m===a)break;r!==5&&r!==26&&r!==27||x===null||(m=x,l?(x=Va(n,i),x!=null&&u.unshift(Tl(n,x,m))):l||(x=Va(n,i),x!=null&&u.push(Tl(n,x,m)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var u0=/\r\n?/g,o0=/\u0000|\uFFFD/g;function _d(t){return(typeof t=="string"?t:""+t).replace(u0,`
`).replace(o0,"")}function Md(t,e){return e=_d(e),_d(t)===e}function _t(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||aa(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&aa(t,""+a);break;case"className":Gl(t,"class",a);break;case"tabIndex":Gl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Gl(t,n,a);break;case"style":_r(t,a,i);break;case"data":if(e!=="object"){Gl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Xl(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",l.name,l,null),_t(t,e,"formEncType",l.formEncType,l,null),_t(t,e,"formMethod",l.formMethod,l,null),_t(t,e,"formTarget",l.formTarget,l,null)):(_t(t,e,"encType",l.encType,l,null),_t(t,e,"method",l.method,l,null),_t(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Xl(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=je);break;case"onScroll":a!=null&&gt("scroll",t);break;case"onScrollEnd":a!=null&&gt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Xl(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":gt("beforetoggle",t),gt("toggle",t),Yl(t,"popover",a);break;case"xlinkActuate":Be(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Be(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Be(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Be(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Be(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Be(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Be(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Be(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Be(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Yl(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Ug.get(n)||n,Yl(t,n,a))}}function is(t,e,n,a,l,i){switch(n){case"style":_r(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"children":typeof a=="string"?aa(t,a):(typeof a=="number"||typeof a=="bigint")&&aa(t,""+a);break;case"onScroll":a!=null&&gt("scroll",t);break;case"onScrollEnd":a!=null&&gt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=je);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!br.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[ee]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Yl(t,n,a)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":gt("error",t),gt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:_t(t,e,i,u,n,null)}}l&&_t(t,e,"srcSet",n.srcSet,n,null),a&&_t(t,e,"src",n.src,n,null);return;case"input":gt("invalid",t);var r=i=u=l=null,m=null,x=null;for(a in n)if(n.hasOwnProperty(a)){var _=n[a];if(_!=null)switch(a){case"name":l=_;break;case"type":u=_;break;case"checked":m=_;break;case"defaultChecked":x=_;break;case"value":i=_;break;case"defaultValue":r=_;break;case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(o(137,e));break;default:_t(t,e,a,_,n,null)}}xr(t,i,r,m,x,u,l,!1);return;case"select":gt("invalid",t),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case"value":i=r;break;case"defaultValue":u=r;break;case"multiple":a=r;default:_t(t,e,l,r,n,null)}e=i,n=u,t.multiple=!!a,e!=null?na(t,!!a,e,!1):n!=null&&na(t,!!a,n,!0);return;case"textarea":gt("invalid",t),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case"value":a=r;break;case"defaultValue":l=r;break;case"children":i=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(o(91));break;default:_t(t,e,u,r,n,null)}Cr(t,a,l,i);return;case"option":for(m in n)if(n.hasOwnProperty(m)&&(a=n[m],a!=null))switch(m){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_t(t,e,m,a,n,null)}return;case"dialog":gt("beforetoggle",t),gt("toggle",t),gt("cancel",t),gt("close",t);break;case"iframe":case"object":gt("load",t);break;case"video":case"audio":for(a=0;a<Sl.length;a++)gt(Sl[a],t);break;case"image":gt("error",t),gt("load",t);break;case"details":gt("toggle",t);break;case"embed":case"source":case"link":gt("error",t),gt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(x in n)if(n.hasOwnProperty(x)&&(a=n[x],a!=null))switch(x){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:_t(t,e,x,a,n,null)}return;default:if(vu(e)){for(_ in n)n.hasOwnProperty(_)&&(a=n[_],a!==void 0&&is(t,e,_,a,n,void 0));return}}for(r in n)n.hasOwnProperty(r)&&(a=n[r],a!=null&&_t(t,e,r,a,n,null))}function s0(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,r=null,m=null,x=null,_=null;for(C in n){var R=n[C];if(n.hasOwnProperty(C)&&R!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":m=R;default:a.hasOwnProperty(C)||_t(t,e,C,null,a,R)}}for(var A in a){var C=a[A];if(R=n[A],a.hasOwnProperty(A)&&(C!=null||R!=null))switch(A){case"type":i=C;break;case"name":l=C;break;case"checked":x=C;break;case"defaultChecked":_=C;break;case"value":u=C;break;case"defaultValue":r=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(o(137,e));break;default:C!==R&&_t(t,e,A,C,a,R)}}pu(t,u,r,m,x,_,i,l);return;case"select":C=u=r=A=null;for(i in n)if(m=n[i],n.hasOwnProperty(i)&&m!=null)switch(i){case"value":break;case"multiple":C=m;default:a.hasOwnProperty(i)||_t(t,e,i,null,a,m)}for(l in a)if(i=a[l],m=n[l],a.hasOwnProperty(l)&&(i!=null||m!=null))switch(l){case"value":A=i;break;case"defaultValue":r=i;break;case"multiple":u=i;default:i!==m&&_t(t,e,l,i,a,m)}e=r,n=u,a=C,A!=null?na(t,!!n,A,!1):!!a!=!!n&&(e!=null?na(t,!!n,e,!0):na(t,!!n,n?[]:"",!1));return;case"textarea":C=A=null;for(r in n)if(l=n[r],n.hasOwnProperty(r)&&l!=null&&!a.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:_t(t,e,r,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":A=l;break;case"defaultValue":C=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(o(91));break;default:l!==i&&_t(t,e,u,l,a,i)}Ar(t,A,C);return;case"option":for(var I in n)if(A=n[I],n.hasOwnProperty(I)&&A!=null&&!a.hasOwnProperty(I))switch(I){case"selected":t.selected=!1;break;default:_t(t,e,I,null,a,A)}for(m in a)if(A=a[m],C=n[m],a.hasOwnProperty(m)&&A!==C&&(A!=null||C!=null))switch(m){case"selected":t.selected=A&&typeof A!="function"&&typeof A!="symbol";break;default:_t(t,e,m,A,a,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var lt in n)A=n[lt],n.hasOwnProperty(lt)&&A!=null&&!a.hasOwnProperty(lt)&&_t(t,e,lt,null,a,A);for(x in a)if(A=a[x],C=n[x],a.hasOwnProperty(x)&&A!==C&&(A!=null||C!=null))switch(x){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(o(137,e));break;default:_t(t,e,x,A,a,C)}return;default:if(vu(e)){for(var Mt in n)A=n[Mt],n.hasOwnProperty(Mt)&&A!==void 0&&!a.hasOwnProperty(Mt)&&is(t,e,Mt,void 0,a,A);for(_ in a)A=a[_],C=n[_],!a.hasOwnProperty(_)||A===C||A===void 0&&C===void 0||is(t,e,_,A,a,C);return}}for(var S in n)A=n[S],n.hasOwnProperty(S)&&A!=null&&!a.hasOwnProperty(S)&&_t(t,e,S,null,a,A);for(R in a)A=a[R],C=n[R],!a.hasOwnProperty(R)||A===C||A==null&&C==null||_t(t,e,R,A,a,C)}function Dd(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function r0(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,r=l.duration;if(i&&r&&Dd(u)){for(u=0,r=l.responseEnd,a+=1;a<n.length;a++){var m=n[a],x=m.startTime;if(x>r)break;var _=m.transferSize,R=m.initiatorType;_&&Dd(R)&&(m=m.responseEnd,u+=_*(m<r?1:(r-x)/(m-x)))}if(--a,e+=8*(i+u)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var us=null,os=null;function Li(t){return t.nodeType===9?t:t.ownerDocument}function Rd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function kd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function ss(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var rs=null;function c0(){var t=window.event;return t&&t.type==="popstate"?t===rs?!1:(rs=t,!0):(rs=null,!1)}var zd=typeof setTimeout=="function"?setTimeout:void 0,f0=typeof clearTimeout=="function"?clearTimeout:void 0,Od=typeof Promise=="function"?Promise:void 0,d0=typeof queueMicrotask=="function"?queueMicrotask:typeof Od<"u"?function(t){return Od.resolve(null).then(t).catch(h0)}:zd;function h0(t){setTimeout(function(){throw t})}function Tn(t){return t==="head"}function Ud(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),Oa(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")El(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,El(n);for(var i=n.firstChild;i;){var u=i.nextSibling,r=i.nodeName;i[Ya]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&El(t.ownerDocument.body);n=l}while(n);Oa(e)}function Hd(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function cs(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":cs(n),gu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function g0(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[Ya])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ce(t.nextSibling),t===null)break}return null}function m0(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ce(t.nextSibling),t===null))return null;return t}function Bd(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ce(t.nextSibling),t===null))return null;return t}function fs(t){return t.data==="$?"||t.data==="$~"}function ds(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function p0(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ce(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var hs=null;function jd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ce(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Ld(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function qd(t,e,n){switch(e=Li(n),t){case"html":if(t=e.documentElement,!t)throw Error(o(452));return t;case"head":if(t=e.head,!t)throw Error(o(453));return t;case"body":if(t=e.body,!t)throw Error(o(454));return t;default:throw Error(o(451))}}function El(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);gu(t)}var Ne=new Map,Yd=new Set;function qi(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=Q.d;Q.d={f:y0,r:v0,D:b0,C:w0,L:S0,m:T0,X:x0,S:E0,M:A0};function y0(){var t=tn.f(),e=Ri();return t||e}function v0(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?af(e):tn.r(t)}var Ra=typeof document>"u"?null:document;function Gd(t,e,n){var a=Ra;if(a&&typeof e=="string"&&e){var l=be(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),Yd.has(l)||(Yd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),Wt(e,"link",t),Qt(e),a.head.appendChild(e)))}}function b0(t){tn.D(t),Gd("dns-prefetch",t,null)}function w0(t,e){tn.C(t,e),Gd("preconnect",t,e)}function S0(t,e,n){tn.L(t,e,n);var a=Ra;if(a&&t&&e){var l='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+be(n.imageSizes)+'"]')):l+='[href="'+be(t)+'"]';var i=l;switch(e){case"style":i=ka(t);break;case"script":i=za(t)}Ne.has(i)||(t=D({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ne.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(xl(i))||e==="script"&&a.querySelector(Al(i))||(e=a.createElement("link"),Wt(e,"link",t),Qt(e),a.head.appendChild(e)))}}function T0(t,e){tn.m(t,e);var n=Ra;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=za(t)}if(!Ne.has(i)&&(t=D({rel:"modulepreload",href:t},e),Ne.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Al(i)))return}a=n.createElement("link"),Wt(a,"link",t),Qt(a),n.head.appendChild(a)}}}function E0(t,e,n){tn.S(t,e,n);var a=Ra;if(a&&t){var l=ta(a).hoistableStyles,i=ka(t);e=e||"default";var u=l.get(i);if(!u){var r={loading:0,preload:null};if(u=a.querySelector(xl(i)))r.loading=5;else{t=D({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ne.get(i))&&gs(t,n);var m=u=a.createElement("link");Qt(m),Wt(m,"link",t),m._p=new Promise(function(x,_){m.onload=x,m.onerror=_}),m.addEventListener("load",function(){r.loading|=1}),m.addEventListener("error",function(){r.loading|=2}),r.loading|=4,Yi(u,e,a)}u={type:"stylesheet",instance:u,count:1,state:r},l.set(i,u)}}}function x0(t,e){tn.X(t,e);var n=Ra;if(n&&t){var a=ta(n).hoistableScripts,l=za(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=D({src:t,async:!0},e),(e=Ne.get(l))&&ms(t,e),i=n.createElement("script"),Qt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function A0(t,e){tn.M(t,e);var n=Ra;if(n&&t){var a=ta(n).hoistableScripts,l=za(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=D({src:t,async:!0,type:"module"},e),(e=Ne.get(l))&&ms(t,e),i=n.createElement("script"),Qt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Vd(t,e,n,a){var l=(l=ft.current)?qi(l):null;if(!l)throw Error(o(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=ka(n.href),n=ta(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=ka(n.href);var i=ta(l).hoistableStyles,u=i.get(t);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=l.querySelector(xl(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ne.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ne.set(t,n),i||C0(l,t,n,u.state))),e&&a===null)throw Error(o(528,""));return u}if(e&&a!==null)throw Error(o(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=za(n),n=ta(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,t))}}function ka(t){return'href="'+be(t)+'"'}function xl(t){return'link[rel="stylesheet"]['+t+"]"}function Xd(t){return D({},t,{"data-precedence":t.precedence,precedence:null})}function C0(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Wt(e,"link",n),Qt(e),t.head.appendChild(e))}function za(t){return'[src="'+be(t)+'"]'}function Al(t){return"script[async]"+t}function Qd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Qt(a),a;var l=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Qt(a),Wt(a,"style",l),Yi(a,n.precedence,t),e.instance=a;case"stylesheet":l=ka(n.href);var i=t.querySelector(xl(l));if(i)return e.state.loading|=4,e.instance=i,Qt(i),i;a=Xd(n),(l=Ne.get(l))&&gs(a,l),i=(t.ownerDocument||t).createElement("link"),Qt(i);var u=i;return u._p=new Promise(function(r,m){u.onload=r,u.onerror=m}),Wt(i,"link",a),e.state.loading|=4,Yi(i,n.precedence,t),e.instance=i;case"script":return i=za(n.src),(l=t.querySelector(Al(i)))?(e.instance=l,Qt(l),l):(a=n,(l=Ne.get(i))&&(a=D({},n),ms(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Qt(l),Wt(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(o(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Yi(a,n.precedence,t));return e.instance}function Yi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var r=a[u];if(r.dataset.precedence===e)i=r;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function gs(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function ms(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Gi=null;function Zd(t,e,n){if(Gi===null){var a=new Map,l=Gi=new Map;l.set(n,a)}else l=Gi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[Ya]||i[Kt]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var r=a.get(u);r?r.push(i):a.set(u,[i])}}return a}function Kd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function N0(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Jd(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function _0(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=ka(a.href),i=e.querySelector(xl(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Vi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Qt(i);return}i=e.ownerDocument||e,a=Xd(a),(l=Ne.get(l))&&gs(a,l),i=i.createElement("link"),Qt(i);var u=i;u._p=new Promise(function(r,m){u.onload=r,u.onerror=m}),Wt(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Vi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var ps=0;function M0(t,e){return t.stylesheets&&t.count===0&&Qi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Qi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&ps===0&&(ps=62500*r0());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Qi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>ps?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Vi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Qi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Xi=null;function Qi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Xi=new Map,e.forEach(D0,t),Xi=null,Vi.call(t))}function D0(t,e){if(!(e.state.loading&4)){var n=Xi.get(t);if(n)var a=n.get(null);else{n=new Map,Xi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=e.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=Vi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var Cl={$$typeof:Y,Provider:null,Consumer:null,_currentValue:at,_currentValue2:at,_threadCount:0};function R0(t,e,n,a,l,i,u,r,m){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=cu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=cu(0),this.hiddenUpdates=cu(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=m,this.incompleteTransitions=new Map}function Id(t,e,n,a,l,i,u,r,m,x,_,R){return t=new R0(t,e,n,u,m,x,_,R,r),e=1,i===!0&&(e|=24),i=de(3,null,null,e),t.current=i,i.stateNode=t,e=Ju(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},$u(i),t}function Fd(t){return t?(t=ca,t):ca}function Wd(t,e,n,a,l,i){l=Fd(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(oe(n,t,e),ll(n,t,e))}function $d(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ys(t,e){$d(t,e),(t=t.alternate)&&$d(t,e)}function Pd(t){if(t.tag===13||t.tag===31){var e=Un(t,67108864);e!==null&&oe(e,t,67108864),ys(t,67108864)}}function th(t){if(t.tag===13||t.tag===31){var e=ye();e=fu(e);var n=Un(t,e);n!==null&&oe(n,t,e),ys(t,e)}}var Zi=!0;function k0(t,e,n,a){var l=N.T;N.T=null;var i=Q.p;try{Q.p=2,vs(t,e,n,a)}finally{Q.p=i,N.T=l}}function z0(t,e,n,a){var l=N.T;N.T=null;var i=Q.p;try{Q.p=8,vs(t,e,n,a)}finally{Q.p=i,N.T=l}}function vs(t,e,n,a){if(Zi){var l=bs(a);if(l===null)ls(t,e,a,Ki,n),nh(t,a);else if(U0(l,t,e,n,a))a.stopPropagation();else if(nh(t,a),e&4&&-1<O0.indexOf(t)){for(;l!==null;){var i=Pn(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Dn(i.pendingLanes);if(u!==0){var r=i;for(r.pendingLanes|=2,r.entangledLanes|=2;u;){var m=1<<31-ce(u);r.entanglements[1]|=m,u&=~m}Oe(i),(Tt&6)===0&&(Mi=se()+500,wl(0))}}break;case 31:case 13:r=Un(i,2),r!==null&&oe(r,i,2),Ri(),ys(i,2)}if(i=bs(a),i===null&&ls(t,e,a,Ki,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else ls(t,e,a,null,n)}}function bs(t){return t=wu(t),ws(t)}var Ki=null;function ws(t){if(Ki=null,t=$n(t),t!==null){var e=d(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=b(e),t!==null)return t;t=null}else if(n===31){if(t=T(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ki=t,null}function eh(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(bg()){case sr:return 2;case rr:return 8;case Hl:case wg:return 32;case cr:return 268435456;default:return 32}default:return 32}}var Ss=!1,En=null,xn=null,An=null,Nl=new Map,_l=new Map,Cn=[],O0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function nh(t,e){switch(t){case"focusin":case"focusout":En=null;break;case"dragenter":case"dragleave":xn=null;break;case"mouseover":case"mouseout":An=null;break;case"pointerover":case"pointerout":Nl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":_l.delete(e.pointerId)}}function Ml(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=Pn(e),e!==null&&Pd(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function U0(t,e,n,a,l){switch(e){case"focusin":return En=Ml(En,t,e,n,a,l),!0;case"dragenter":return xn=Ml(xn,t,e,n,a,l),!0;case"mouseover":return An=Ml(An,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return Nl.set(i,Ml(Nl.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,_l.set(i,Ml(_l.get(i)||null,t,e,n,a,l)),!0}return!1}function ah(t){var e=$n(t.target);if(e!==null){var n=d(e);if(n!==null){if(e=n.tag,e===13){if(e=b(n),e!==null){t.blockedOn=e,pr(t.priority,function(){th(n)});return}}else if(e===31){if(e=T(n),e!==null){t.blockedOn=e,pr(t.priority,function(){th(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ji(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=bs(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);bu=a,n.target.dispatchEvent(a),bu=null}else return e=Pn(n),e!==null&&Pd(e),t.blockedOn=n,!1;e.shift()}return!0}function lh(t,e,n){Ji(t)&&n.delete(e)}function H0(){Ss=!1,En!==null&&Ji(En)&&(En=null),xn!==null&&Ji(xn)&&(xn=null),An!==null&&Ji(An)&&(An=null),Nl.forEach(lh),_l.forEach(lh)}function Ii(t,e){t.blockedOn===e&&(t.blockedOn=null,Ss||(Ss=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,H0)))}var Fi=null;function ih(t){Fi!==t&&(Fi=t,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){Fi===t&&(Fi=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(ws(a||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,bo(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function Oa(t){function e(m){return Ii(m,t)}En!==null&&Ii(En,t),xn!==null&&Ii(xn,t),An!==null&&Ii(An,t),Nl.forEach(e),_l.forEach(e);for(var n=0;n<Cn.length;n++){var a=Cn[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)ah(n),n.blockedOn===null&&Cn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[ee]||null;if(typeof i=="function")u||ih(n);else if(u){var r=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[ee]||null)r=u.formAction;else if(ws(l)!==null)continue}else r=u.action;typeof r=="function"?n[a+1]=r:(n.splice(a,3),a-=3),ih(n)}}}function uh(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function Ts(t){this._internalRoot=t}Wi.prototype.render=Ts.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(o(409));var n=e.current,a=ye();Wd(n,a,t,e,null,null)},Wi.prototype.unmount=Ts.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Wd(t.current,2,null,t,null,null),Ri(),e[Wn]=null}};function Wi(t){this._internalRoot=t}Wi.prototype.unstable_scheduleHydration=function(t){if(t){var e=mr();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Cn.length&&e!==0&&e<Cn[n].priority;n++);Cn.splice(n,0,t),n===0&&ah(t)}};var oh=f.version;if(oh!=="19.2.6")throw Error(o(527,oh,"19.2.6"));Q.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(o(188)):(t=Object.keys(t).join(","),Error(o(268,t)));return t=p(e),t=t!==null?z(t):null,t=t===null?null:t.stateNode,t};var B0={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:N,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $i=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$i.isDisabled&&$i.supportsFiber)try{ja=$i.inject(B0),re=$i}catch{}}return Rl.createRoot=function(t,e){if(!c(t))throw Error(o(299));var n=!1,a="",l=gf,i=mf,u=pf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=Id(t,1,!1,null,null,n,a,null,l,i,u,uh),t[Wn]=e.current,as(t),new Ts(e)},Rl.hydrateRoot=function(t,e,n){if(!c(t))throw Error(o(299));var a=!1,l="",i=gf,u=mf,r=pf,m=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(r=n.onRecoverableError),n.formState!==void 0&&(m=n.formState)),e=Id(t,1,!0,e,n??null,a,l,m,i,u,r,uh),e.context=Fd(null),n=e.current,a=ye(),a=fu(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,qa(e,n),Oe(e),t[Wn]=e.current,as(t),new Wi(e)},Rl.version="19.2.6",Rl}var yh;function J0(){if(yh)return As.exports;yh=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(f){console.error(f)}}return s(),As.exports=K0(),As.exports}var I0=J0();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F0=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),lg=(...s)=>s.filter((f,h,o)=>!!f&&f.trim()!==""&&o.indexOf(f)===h).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var W0={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $0=yt.forwardRef(({color:s="currentColor",size:f=24,strokeWidth:h=2,absoluteStrokeWidth:o,className:c="",children:d,iconNode:b,...T},g)=>yt.createElement("svg",{ref:g,...W0,width:f,height:f,stroke:s,strokeWidth:o?Number(h)*24/Number(f):h,className:lg("lucide",c),...T},[...b.map(([p,z])=>yt.createElement(p,z)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=(s,f)=>{const h=yt.forwardRef(({className:o,...c},d)=>yt.createElement($0,{ref:d,iconNode:f,className:lg(`lucide-${F0(s)}`,o),...c}));return h.displayName=`${s}`,h};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ig=$t("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const au=$t("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ug=$t("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P0=$t("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const og=$t("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
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
 */const op=$t("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sp=$t("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rp=$t("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nr=$t("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function nu({group:s,size:f="md",dim:h}){const o=f==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return y.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${s.bgClass} ${s.textClass} ${o} ${h?"opacity-40":""}`,children:s.label})}const Ua=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],bh=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function sg(s){if(s.length===0)return"";const f=[...s].sort((z,D)=>z.date.localeCompare(D.date)),h=f[0].date,o=f[f.length-1].date,[c,d,b]=h.split("-").map(Number),[T,g,p]=o.split("-").map(Number);return h===o?`${Ua[d-1]} ${b}, ${c}`:c===T&&d===g?`${Ua[d-1]} ${b}–${p}, ${c}`:c===T?`${Ua[d-1]} ${b} – ${Ua[g-1]} ${p}, ${c}`:`${Ua[d-1]} ${b}, ${c} – ${Ua[g-1]} ${p}, ${T}`}function cp(s){if(s.length===0)return"";const f=[...s].sort((U,L)=>U.date.localeCompare(L.date)),h=f[0].date,o=f[f.length-1].date,[c,d,b]=h.split("-").map(Number),[T,g,p]=o.split("-").map(Number),z=bh[new Date(c,d-1,b).getDay()],D=sg(s);if(h===o)return`${D} (${z})`;const O=bh[new Date(T,g-1,p).getDay()];return`${D} (${z}–${O})`}function wh(s){return s.subtitle??sg(s.days)}function en(s){const[f,h]=s.split(":").map(Number);return f*60+h}const fp=30;function dp(s,f){let h=-1;for(let T=0;T<s.length&&en(s[T])<=f;T++)h=T;if(h===-1)return{index:-1,progress:0};const o=en(s[h]),c=s[h+1]?en(s[h+1]):null,d=c!==null?c:o+fp;if(f>=d)return{index:-1,progress:0};const b=d===o?0:(f-o)/(d-o);return{index:h,progress:Math.max(0,Math.min(1,b))}}function rg(s){const[f,h]=s.split(":").map(Number);return`${f%12||12}:${h.toString().padStart(2,"0")}`}function cg(s){const[f]=s.split(":").map(Number);return f>=12?"PM":"AM"}function ar(){const s=new Date;return s.getHours()*60+s.getMinutes()}function Ol(){const s=new Date,f=s.getFullYear(),h=String(s.getMonth()+1).padStart(2,"0"),o=String(s.getDate()).padStart(2,"0");return`${f}-${h}-${o}`}function hp(){const s=new Date,f=s.getHours(),h=s.getMinutes(),o=f%12||12,c=f>=12?"PM":"AM";return`${o}:${h.toString().padStart(2,"0")} ${c}`}function gp(s){if(s<=0)return"";if(s<60)return`${s} min`;const f=Math.floor(s/60),h=s%60;return h===0?`${f}h`:`${f}h ${h}m`}function mp(s){const f=new Date(s);if(isNaN(f.getTime()))return s;const h=f.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),o=f.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${h}, ${o}`}function Sh(s,f){return s.flatMap(h=>{const o=f.find(c=>c.id===h);return o?[o]:[]})}function pp({activity:s,runGroups:f,past:h}){const o=Sh(s.onTrack,f),c=Sh(s.inClass??[],f);return y.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${h?"opacity-60":""}`,children:y.jsxs("div",{className:"flex gap-4",children:[y.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[rg(s.time),y.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:cg(s.time)})]}),y.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[o.length>0&&y.jsxs("div",{className:"flex items-center gap-3",children:[y.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),y.jsx("div",{className:"flex flex-wrap gap-1.5",children:o.map(d=>y.jsx(nu,{group:d},d.id))})]}),c.length>0&&y.jsxs(y.Fragment,{children:[o.length>0&&y.jsx("div",{className:"border-t border-gray-100"}),y.jsxs("div",{className:"flex items-center gap-3",children:[y.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),y.jsx("div",{className:"flex flex-wrap gap-1.5",children:c.map(d=>y.jsx(nu,{group:d},d.id))})]})]}),s.note&&y.jsx("p",{className:"text-xs italic text-gray-500",children:s.note})]})]})})}function yp({activity:s,past:f}){const h=s.type==="lunch"||s.type==="special";return y.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${h?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${f?"opacity-60":""}`,children:y.jsxs("div",{className:"flex items-center gap-4",children:[y.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[rg(s.time),y.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:cg(s.time)})]}),h&&y.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:s.type==="lunch"?y.jsx(rp,{size:16}):y.jsx(ip,{size:16})}),y.jsxs("div",{children:[y.jsx("p",{className:"text-sm font-medium text-gray-900",children:s.label}),s.subtitle&&y.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:s.subtitle})]})]})})}const Ps=yt.forwardRef(({activities:s},f)=>{const[,h]=yt.useState(0);yt.useEffect(()=>{const g=setInterval(()=>h(p=>p+1),3e4);return()=>clearInterval(g)},[]);const o=ar(),d=s.filter(g=>"time"in g).find(g=>en(g.time)>o),b=d?en(d.time)-o:null,T=b!==null?b<=5?"text-red-500":b<=10?"text-orange-500":"text-gray-400":"text-gray-400";return y.jsxs("div",{ref:f,"data-time-indicator":!0,className:"relative my-6",children:[y.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[y.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),y.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),y.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:hp()}),b!==null&&y.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${T}`,children:["Next activity starts in ",y.jsx("span",{className:"font-semibold",children:gp(b)})]})]})});Ps.displayName="TimeIndicator";function Th({collapsed:s,children:f}){return y.jsx("div",{"data-collapsed":s,"aria-hidden":s,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:s?"0fr":"1fr",opacity:s?0:1,marginBottom:s?0:"0.5rem"},children:y.jsx("div",{className:"overflow-hidden",children:f})})}function vp({activities:s,runGroups:f,isToday:h,selectedGroups:o,hidePast:c}){const d=yt.useRef(null),[,b]=yt.useState(0);yt.useEffect(()=>{if(!h)return;const H=setInterval(()=>b(Y=>Y+1),6e4);return()=>clearInterval(H)},[h]),yt.useEffect(()=>{if(!h)return;const H=setTimeout(()=>{var Y;(Y=d.current)==null||Y.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(H)},[h]);const T=ar(),g=s.flatMap(H=>{if(H.type!=="session")return[H];if(o.length===0)return[H];const Y=H.onTrack.filter(ct=>o.includes(ct)),K=(H.inClass??[]).filter(ct=>o.includes(ct));return Y.length===0&&K.length===0?[]:[{...H,onTrack:Y,inClass:K}]}),p=g.map(H=>H.type!=="break"&&c&&h&&en(H.time)<T);g.forEach((H,Y)=>{if(H.type!=="break")return;const K=g.slice(0,Y).some((ct,V)=>ct.type!=="break"&&!p[V]);p[Y]=!K});const z=[],D=[];g.forEach((H,Y)=>{H.type!=="break"&&(z.push(Y),D.push(H.time))});const{index:O}=h?dp(D,T):{index:-1},U=O===-1?-1:z[O],L=h?g.findIndex(H=>H.type!=="break"&&en(H.time)>T):-1,Z=h&&L===-1&&g.length>0,J=g.length>0&&p.every(Boolean);let q;return y.jsxs("div",{className:"flex flex-col pb-10",children:[g.length>0&&y.jsx(Th,{collapsed:!J,children:y.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[y.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),y.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),g.map((H,Y)=>{const K=Y===U,ct=h&&H.type!=="break"&&!K&&en(H.time)<T;let V=null;!p[Y]&&H.type==="session"&&H.sessionNumber!==void 0&&H.sessionNumber!==q&&(q=H.sessionNumber,V=y.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",H.sessionNumber]}));const j=H.type==="break"?y.jsxs("div",{className:"flex items-center gap-2 py-1",children:[y.jsx("div",{className:"h-px flex-1 bg-gray-200"}),y.jsx("span",{className:"text-xs text-gray-400 italic",children:H.label}),y.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):H.type==="session"?y.jsx(pp,{activity:H,runGroups:f,past:ct}):y.jsx(yp,{activity:H,past:ct});return y.jsxs(Th,{collapsed:p[Y],children:[Y===L&&y.jsx(Ps,{ref:d,activities:g}),V,j]},Y)}),Z&&y.jsx(Ps,{ref:d,activities:g})]})}function bp({groups:s,selected:f,onChange:h}){const[o,c]=yt.useState(!1),d=g=>h(f.includes(g)?f.filter(p=>p!==g):[...f,g]),b=f.length===0||f.length===s.length,T=s.filter(g=>f.includes(g.id));return y.jsxs("div",{className:"relative",children:[y.jsxs("button",{onClick:()=>c(g=>!g),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[b?y.jsx("span",{className:"text-gray-700",children:"All run groups"}):y.jsx("div",{className:"flex items-center gap-1",children:T.map(g=>y.jsx(nu,{group:g,size:"sm"},g.id))}),y.jsx(ug,{size:14,className:"text-gray-400"})]}),o&&y.jsxs(y.Fragment,{children:[y.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>c(!1)}),y.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[s.map(g=>y.jsxs("button",{onClick:()=>d(g.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[y.jsx(nu,{group:g,size:"md"}),f.includes(g.id)&&y.jsx(au,{size:14,className:"text-blue-500"})]},g.id)),y.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:y.jsx("button",{onClick:()=>{h([]),c(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:b?"All selected":"Clear filter"})})]})]})]})}function Eh(s){const f=Ol();return s.days.some(h=>h.date===f)}function xh(){return y.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[y.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function wp({events:s,active:f,onChange:h,onOpenDetails:o}){const[c,d]=yt.useState(!1);return y.jsxs("div",{className:"relative min-w-0 pl-1",children:[y.jsxs("button",{onClick:()=>d(b=>!b),className:"flex items-center gap-1 text-left group min-w-0",children:[y.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:f.name}),Eh(f)&&y.jsx(xh,{}),y.jsx(ug,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),y.jsxs("div",{className:"flex items-center gap-0.5",children:[y.jsx("p",{className:"text-sm text-gray-500",children:wh(f)}),y.jsx("button",{onClick:o,"aria-label":"Event details",className:"inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900",children:y.jsx(np,{size:14})})]}),c&&y.jsxs(y.Fragment,{children:[y.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>d(!1)}),y.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:s.map(b=>y.jsxs("button",{onClick:()=>{h(b),d(!1)},className:`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left ${b.id===f.id?"bg-blue-50":"hover:bg-gray-50"}`,children:[y.jsxs("div",{children:[y.jsxs("div",{className:"flex items-center gap-1.5",children:[y.jsx("span",{className:"text-sm font-semibold text-gray-900",children:b.name}),Eh(b)&&y.jsx(xh,{})]}),y.jsx("div",{className:"text-xs text-gray-400",children:wh(b)})]}),b.id===f.id&&y.jsx(au,{size:14,className:"text-blue-500 ml-3 shrink-0"})]},b.id))})]})]})}function Sp({checked:s,onChange:f,label:h}){return y.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[h&&y.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:h}),y.jsx("button",{type:"button",role:"switch","aria-checked":s,onClick:f,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:s?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:y.jsx("span",{style:{position:"absolute",top:"2px",left:s?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Jn=72,Tp=110;function Ep({children:s,disabled:f}){const[h,o]=yt.useState(0),[c,d]=yt.useState("idle"),b=yt.useRef(null),T=yt.useRef(0);yt.useEffect(()=>{if(f)return;const D=L=>{window.scrollY===0&&(b.current=L.touches[0].clientY)},O=L=>{if(b.current===null)return;const Z=L.touches[0].clientY-b.current;if(Z<=0){b.current=null;return}L.preventDefault();const J=Z<Jn?Z:Jn+(Z-Jn)*.25;T.current=Math.min(J,Tp),o(T.current),d("pulling")},U=()=>{b.current!==null&&(b.current=null,T.current>=Jn?(d("refreshing"),o(Jn*.75),setTimeout(()=>window.location.reload(),600)):(d("releasing"),o(0),T.current=0,setTimeout(()=>d("idle"),250)))};return document.addEventListener("touchstart",D,{passive:!0}),document.addEventListener("touchmove",O,{passive:!1}),document.addEventListener("touchend",U),document.addEventListener("touchcancel",U),()=>{document.removeEventListener("touchstart",D),document.removeEventListener("touchmove",O),document.removeEventListener("touchend",U),document.removeEventListener("touchcancel",U)}},[f]);const g=c==="releasing"||c==="refreshing",p=Math.min(h/Jn,1),z=h>=Jn;return y.jsxs(y.Fragment,{children:[y.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${h}px)`,transition:g?"transform 0.25s ease":"none"},children:y.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${z?"text-blue-500":"text-gray-400"}`,children:y.jsx(up,{size:16,className:c==="refreshing"?"animate-spin":"",style:c!=="refreshing"?{transform:`rotate(${p*270}deg)`}:void 0})})}),y.jsx("div",{style:{transform:`translateY(${h}px)`,transition:g?"transform 0.25s ease":"none"},children:s})]})}function xp({groups:s}){const f=s.filter(h=>h.description);return f.length===0?null:y.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[y.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),y.jsx("ul",{className:"flex flex-col gap-1.5",children:f.map(h=>y.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[y.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${h.bgClass}`,"aria-hidden":"true"}),y.jsx("span",{className:"font-medium text-gray-900",children:h.label}),y.jsx("span",{className:"text-gray-400",children:"·"}),y.jsx("span",{children:h.description})]},h.id))})]})}const Ah=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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
`;function Ap(){const[s,f]=yt.useState(!1);yt.useEffect(()=>{window.scrollTo(0,0)},[]);async function h(){await navigator.clipboard.writeText(Ah),f(!0),setTimeout(()=>f(!1),2e3)}return y.jsx("div",{className:"min-h-screen bg-gray-50",children:y.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[y.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[y.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),y.jsxs("div",{className:"flex items-center gap-2",children:[y.jsxs("button",{onClick:h,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[s?y.jsx(au,{size:16,className:"text-green-600"}):y.jsx(og,{size:16}),s?"Copied":"Copy"]}),y.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:y.jsx(nr,{size:18})})]})]}),y.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",y.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),y.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:y.jsx("code",{children:Ah})})]})})}var Ha={},Ms,Ch;function Cp(){return Ch||(Ch=1,Ms=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Ms}var Ds={},_n={},Nh;function In(){if(Nh)return _n;Nh=1;let s;const f=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(o){if(!o)throw new Error('"version" cannot be null or undefined');if(o<1||o>40)throw new Error('"version" should be in range from 1 to 40');return o*4+17},_n.getSymbolTotalCodewords=function(o){return f[o]},_n.getBCHDigit=function(h){let o=0;for(;h!==0;)o++,h>>>=1;return o},_n.setToSJISFunction=function(o){if(typeof o!="function")throw new Error('"toSJISFunc" is not a valid function.');s=o},_n.isKanjiModeEnabled=function(){return typeof s<"u"},_n.toSJIS=function(o){return s(o)},_n}var Rs={},_h;function lr(){return _h||(_h=1,(function(s){s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2};function f(h){if(typeof h!="string")throw new Error("Param is not a string");switch(h.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+h)}}s.isValid=function(o){return o&&typeof o.bit<"u"&&o.bit>=0&&o.bit<4},s.from=function(o,c){if(s.isValid(o))return o;try{return f(o)}catch{return c}}})(Rs)),Rs}var ks,Mh;function Np(){if(Mh)return ks;Mh=1;function s(){this.buffer=[],this.length=0}return s.prototype={get:function(f){const h=Math.floor(f/8);return(this.buffer[h]>>>7-f%8&1)===1},put:function(f,h){for(let o=0;o<h;o++)this.putBit((f>>>h-o-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(f){const h=Math.floor(this.length/8);this.buffer.length<=h&&this.buffer.push(0),f&&(this.buffer[h]|=128>>>this.length%8),this.length++}},ks=s,ks}var zs,Dh;function _p(){if(Dh)return zs;Dh=1;function s(f){if(!f||f<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=f,this.data=new Uint8Array(f*f),this.reservedBit=new Uint8Array(f*f)}return s.prototype.set=function(f,h,o,c){const d=f*this.size+h;this.data[d]=o,c&&(this.reservedBit[d]=!0)},s.prototype.get=function(f,h){return this.data[f*this.size+h]},s.prototype.xor=function(f,h,o){this.data[f*this.size+h]^=o},s.prototype.isReserved=function(f,h){return this.reservedBit[f*this.size+h]},zs=s,zs}var Os={},Rh;function Mp(){return Rh||(Rh=1,(function(s){const f=In().getSymbolSize;s.getRowColCoords=function(o){if(o===1)return[];const c=Math.floor(o/7)+2,d=f(o),b=d===145?26:Math.ceil((d-13)/(2*c-2))*2,T=[d-7];for(let g=1;g<c-1;g++)T[g]=T[g-1]-b;return T.push(6),T.reverse()},s.getPositions=function(o){const c=[],d=s.getRowColCoords(o),b=d.length;for(let T=0;T<b;T++)for(let g=0;g<b;g++)T===0&&g===0||T===0&&g===b-1||T===b-1&&g===0||c.push([d[T],d[g]]);return c}})(Os)),Os}var Us={},kh;function Dp(){if(kh)return Us;kh=1;const s=In().getSymbolSize,f=7;return Us.getPositions=function(o){const c=s(o);return[[0,0],[c-f,0],[0,c-f]]},Us}var Hs={},zh;function Rp(){return zh||(zh=1,(function(s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const f={N1:3,N2:3,N3:40,N4:10};s.isValid=function(c){return c!=null&&c!==""&&!isNaN(c)&&c>=0&&c<=7},s.from=function(c){return s.isValid(c)?parseInt(c,10):void 0},s.getPenaltyN1=function(c){const d=c.size;let b=0,T=0,g=0,p=null,z=null;for(let D=0;D<d;D++){T=g=0,p=z=null;for(let O=0;O<d;O++){let U=c.get(D,O);U===p?T++:(T>=5&&(b+=f.N1+(T-5)),p=U,T=1),U=c.get(O,D),U===z?g++:(g>=5&&(b+=f.N1+(g-5)),z=U,g=1)}T>=5&&(b+=f.N1+(T-5)),g>=5&&(b+=f.N1+(g-5))}return b},s.getPenaltyN2=function(c){const d=c.size;let b=0;for(let T=0;T<d-1;T++)for(let g=0;g<d-1;g++){const p=c.get(T,g)+c.get(T,g+1)+c.get(T+1,g)+c.get(T+1,g+1);(p===4||p===0)&&b++}return b*f.N2},s.getPenaltyN3=function(c){const d=c.size;let b=0,T=0,g=0;for(let p=0;p<d;p++){T=g=0;for(let z=0;z<d;z++)T=T<<1&2047|c.get(p,z),z>=10&&(T===1488||T===93)&&b++,g=g<<1&2047|c.get(z,p),z>=10&&(g===1488||g===93)&&b++}return b*f.N3},s.getPenaltyN4=function(c){let d=0;const b=c.data.length;for(let g=0;g<b;g++)d+=c.data[g];return Math.abs(Math.ceil(d*100/b/5)-10)*f.N4};function h(o,c,d){switch(o){case s.Patterns.PATTERN000:return(c+d)%2===0;case s.Patterns.PATTERN001:return c%2===0;case s.Patterns.PATTERN010:return d%3===0;case s.Patterns.PATTERN011:return(c+d)%3===0;case s.Patterns.PATTERN100:return(Math.floor(c/2)+Math.floor(d/3))%2===0;case s.Patterns.PATTERN101:return c*d%2+c*d%3===0;case s.Patterns.PATTERN110:return(c*d%2+c*d%3)%2===0;case s.Patterns.PATTERN111:return(c*d%3+(c+d)%2)%2===0;default:throw new Error("bad maskPattern:"+o)}}s.applyMask=function(c,d){const b=d.size;for(let T=0;T<b;T++)for(let g=0;g<b;g++)d.isReserved(g,T)||d.xor(g,T,h(c,g,T))},s.getBestMask=function(c,d){const b=Object.keys(s.Patterns).length;let T=0,g=1/0;for(let p=0;p<b;p++){d(p),s.applyMask(p,c);const z=s.getPenaltyN1(c)+s.getPenaltyN2(c)+s.getPenaltyN3(c)+s.getPenaltyN4(c);s.applyMask(p,c),z<g&&(g=z,T=p)}return T}})(Hs)),Hs}var Pi={},Oh;function fg(){if(Oh)return Pi;Oh=1;const s=lr(),f=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],h=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Pi.getBlocksCount=function(c,d){switch(d){case s.L:return f[(c-1)*4+0];case s.M:return f[(c-1)*4+1];case s.Q:return f[(c-1)*4+2];case s.H:return f[(c-1)*4+3];default:return}},Pi.getTotalCodewordsCount=function(c,d){switch(d){case s.L:return h[(c-1)*4+0];case s.M:return h[(c-1)*4+1];case s.Q:return h[(c-1)*4+2];case s.H:return h[(c-1)*4+3];default:return}},Pi}var Bs={},kl={},Uh;function kp(){if(Uh)return kl;Uh=1;const s=new Uint8Array(512),f=new Uint8Array(256);return(function(){let o=1;for(let c=0;c<255;c++)s[c]=o,f[o]=c,o<<=1,o&256&&(o^=285);for(let c=255;c<512;c++)s[c]=s[c-255]})(),kl.log=function(o){if(o<1)throw new Error("log("+o+")");return f[o]},kl.exp=function(o){return s[o]},kl.mul=function(o,c){return o===0||c===0?0:s[f[o]+f[c]]},kl}var Hh;function zp(){return Hh||(Hh=1,(function(s){const f=kp();s.mul=function(o,c){const d=new Uint8Array(o.length+c.length-1);for(let b=0;b<o.length;b++)for(let T=0;T<c.length;T++)d[b+T]^=f.mul(o[b],c[T]);return d},s.mod=function(o,c){let d=new Uint8Array(o);for(;d.length-c.length>=0;){const b=d[0];for(let g=0;g<c.length;g++)d[g]^=f.mul(c[g],b);let T=0;for(;T<d.length&&d[T]===0;)T++;d=d.slice(T)}return d},s.generateECPolynomial=function(o){let c=new Uint8Array([1]);for(let d=0;d<o;d++)c=s.mul(c,new Uint8Array([1,f.exp(d)]));return c}})(Bs)),Bs}var js,Bh;function Op(){if(Bh)return js;Bh=1;const s=zp();function f(h){this.genPoly=void 0,this.degree=h,this.degree&&this.initialize(this.degree)}return f.prototype.initialize=function(o){this.degree=o,this.genPoly=s.generateECPolynomial(this.degree)},f.prototype.encode=function(o){if(!this.genPoly)throw new Error("Encoder not initialized");const c=new Uint8Array(o.length+this.degree);c.set(o);const d=s.mod(c,this.genPoly),b=this.degree-d.length;if(b>0){const T=new Uint8Array(this.degree);return T.set(d,b),T}return d},js=f,js}var Ls={},qs={},Ys={},jh;function dg(){return jh||(jh=1,Ys.isValid=function(f){return!isNaN(f)&&f>=1&&f<=40}),Ys}var Ue={},Lh;function hg(){if(Lh)return Ue;Lh=1;const s="[0-9]+",f="[A-Z $%*+\\-./:]+";let h="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";h=h.replace(/u/g,"\\u");const o="(?:(?![A-Z0-9 $%*+\\-./:]|"+h+`)(?:.|[\r
]))+`;Ue.KANJI=new RegExp(h,"g"),Ue.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Ue.BYTE=new RegExp(o,"g"),Ue.NUMERIC=new RegExp(s,"g"),Ue.ALPHANUMERIC=new RegExp(f,"g");const c=new RegExp("^"+h+"$"),d=new RegExp("^"+s+"$"),b=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Ue.testKanji=function(g){return c.test(g)},Ue.testNumeric=function(g){return d.test(g)},Ue.testAlphanumeric=function(g){return b.test(g)},Ue}var qh;function Fn(){return qh||(qh=1,(function(s){const f=dg(),h=hg();s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(d,b){if(!d.ccBits)throw new Error("Invalid mode: "+d);if(!f.isValid(b))throw new Error("Invalid version: "+b);return b>=1&&b<10?d.ccBits[0]:b<27?d.ccBits[1]:d.ccBits[2]},s.getBestModeForData=function(d){return h.testNumeric(d)?s.NUMERIC:h.testAlphanumeric(d)?s.ALPHANUMERIC:h.testKanji(d)?s.KANJI:s.BYTE},s.toString=function(d){if(d&&d.id)return d.id;throw new Error("Invalid mode")},s.isValid=function(d){return d&&d.bit&&d.ccBits};function o(c){if(typeof c!="string")throw new Error("Param is not a string");switch(c.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+c)}}s.from=function(d,b){if(s.isValid(d))return d;try{return o(d)}catch{return b}}})(qs)),qs}var Yh;function Up(){return Yh||(Yh=1,(function(s){const f=In(),h=fg(),o=lr(),c=Fn(),d=dg(),b=7973,T=f.getBCHDigit(b);function g(O,U,L){for(let Z=1;Z<=40;Z++)if(U<=s.getCapacity(Z,L,O))return Z}function p(O,U){return c.getCharCountIndicator(O,U)+4}function z(O,U){let L=0;return O.forEach(function(Z){const J=p(Z.mode,U);L+=J+Z.getBitsLength()}),L}function D(O,U){for(let L=1;L<=40;L++)if(z(O,L)<=s.getCapacity(L,U,c.MIXED))return L}s.from=function(U,L){return d.isValid(U)?parseInt(U,10):L},s.getCapacity=function(U,L,Z){if(!d.isValid(U))throw new Error("Invalid QR Code version");typeof Z>"u"&&(Z=c.BYTE);const J=f.getSymbolTotalCodewords(U),q=h.getTotalCodewordsCount(U,L),H=(J-q)*8;if(Z===c.MIXED)return H;const Y=H-p(Z,U);switch(Z){case c.NUMERIC:return Math.floor(Y/10*3);case c.ALPHANUMERIC:return Math.floor(Y/11*2);case c.KANJI:return Math.floor(Y/13);case c.BYTE:default:return Math.floor(Y/8)}},s.getBestVersionForData=function(U,L){let Z;const J=o.from(L,o.M);if(Array.isArray(U)){if(U.length>1)return D(U,J);if(U.length===0)return 1;Z=U[0]}else Z=U;return g(Z.mode,Z.getLength(),J)},s.getEncodedBits=function(U){if(!d.isValid(U)||U<7)throw new Error("Invalid QR Code version");let L=U<<12;for(;f.getBCHDigit(L)-T>=0;)L^=b<<f.getBCHDigit(L)-T;return U<<12|L}})(Ls)),Ls}var Gs={},Gh;function Hp(){if(Gh)return Gs;Gh=1;const s=In(),f=1335,h=21522,o=s.getBCHDigit(f);return Gs.getEncodedBits=function(d,b){const T=d.bit<<3|b;let g=T<<10;for(;s.getBCHDigit(g)-o>=0;)g^=f<<s.getBCHDigit(g)-o;return(T<<10|g)^h},Gs}var Vs={},Xs,Vh;function Bp(){if(Vh)return Xs;Vh=1;const s=Fn();function f(h){this.mode=s.NUMERIC,this.data=h.toString()}return f.getBitsLength=function(o){return 10*Math.floor(o/3)+(o%3?o%3*3+1:0)},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(o){let c,d,b;for(c=0;c+3<=this.data.length;c+=3)d=this.data.substr(c,3),b=parseInt(d,10),o.put(b,10);const T=this.data.length-c;T>0&&(d=this.data.substr(c),b=parseInt(d,10),o.put(b,T*3+1))},Xs=f,Xs}var Qs,Xh;function jp(){if(Xh)return Qs;Xh=1;const s=Fn(),f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function h(o){this.mode=s.ALPHANUMERIC,this.data=o}return h.getBitsLength=function(c){return 11*Math.floor(c/2)+6*(c%2)},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(c){let d;for(d=0;d+2<=this.data.length;d+=2){let b=f.indexOf(this.data[d])*45;b+=f.indexOf(this.data[d+1]),c.put(b,11)}this.data.length%2&&c.put(f.indexOf(this.data[d]),6)},Qs=h,Qs}var Zs,Qh;function Lp(){if(Qh)return Zs;Qh=1;const s=Fn();function f(h){this.mode=s.BYTE,typeof h=="string"?this.data=new TextEncoder().encode(h):this.data=new Uint8Array(h)}return f.getBitsLength=function(o){return o*8},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(h){for(let o=0,c=this.data.length;o<c;o++)h.put(this.data[o],8)},Zs=f,Zs}var Ks,Zh;function qp(){if(Zh)return Ks;Zh=1;const s=Fn(),f=In();function h(o){this.mode=s.KANJI,this.data=o}return h.getBitsLength=function(c){return c*13},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(o){let c;for(c=0;c<this.data.length;c++){let d=f.toSJIS(this.data[c]);if(d>=33088&&d<=40956)d-=33088;else if(d>=57408&&d<=60351)d-=49472;else throw new Error("Invalid SJIS character: "+this.data[c]+`
Make sure your charset is UTF-8`);d=(d>>>8&255)*192+(d&255),o.put(d,13)}},Ks=h,Ks}var Js={exports:{}},Kh;function Yp(){return Kh||(Kh=1,(function(s){var f={single_source_shortest_paths:function(h,o,c){var d={},b={};b[o]=0;var T=f.PriorityQueue.make();T.push(o,0);for(var g,p,z,D,O,U,L,Z,J;!T.empty();){g=T.pop(),p=g.value,D=g.cost,O=h[p]||{};for(z in O)O.hasOwnProperty(z)&&(U=O[z],L=D+U,Z=b[z],J=typeof b[z]>"u",(J||Z>L)&&(b[z]=L,T.push(z,L),d[z]=p))}if(typeof c<"u"&&typeof b[c]>"u"){var q=["Could not find a path from ",o," to ",c,"."].join("");throw new Error(q)}return d},extract_shortest_path_from_predecessor_list:function(h,o){for(var c=[],d=o;d;)c.push(d),h[d],d=h[d];return c.reverse(),c},find_path:function(h,o,c){var d=f.single_source_shortest_paths(h,o,c);return f.extract_shortest_path_from_predecessor_list(d,c)},PriorityQueue:{make:function(h){var o=f.PriorityQueue,c={},d;h=h||{};for(d in o)o.hasOwnProperty(d)&&(c[d]=o[d]);return c.queue=[],c.sorter=h.sorter||o.default_sorter,c},default_sorter:function(h,o){return h.cost-o.cost},push:function(h,o){var c={value:h,cost:o};this.queue.push(c),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};s.exports=f})(Js)),Js.exports}var Jh;function Gp(){return Jh||(Jh=1,(function(s){const f=Fn(),h=Bp(),o=jp(),c=Lp(),d=qp(),b=hg(),T=In(),g=Yp();function p(q){return unescape(encodeURIComponent(q)).length}function z(q,H,Y){const K=[];let ct;for(;(ct=q.exec(Y))!==null;)K.push({data:ct[0],index:ct.index,mode:H,length:ct[0].length});return K}function D(q){const H=z(b.NUMERIC,f.NUMERIC,q),Y=z(b.ALPHANUMERIC,f.ALPHANUMERIC,q);let K,ct;return T.isKanjiModeEnabled()?(K=z(b.BYTE,f.BYTE,q),ct=z(b.KANJI,f.KANJI,q)):(K=z(b.BYTE_KANJI,f.BYTE,q),ct=[]),H.concat(Y,K,ct).sort(function(j,B){return j.index-B.index}).map(function(j){return{data:j.data,mode:j.mode,length:j.length}})}function O(q,H){switch(H){case f.NUMERIC:return h.getBitsLength(q);case f.ALPHANUMERIC:return o.getBitsLength(q);case f.KANJI:return d.getBitsLength(q);case f.BYTE:return c.getBitsLength(q)}}function U(q){return q.reduce(function(H,Y){const K=H.length-1>=0?H[H.length-1]:null;return K&&K.mode===Y.mode?(H[H.length-1].data+=Y.data,H):(H.push(Y),H)},[])}function L(q){const H=[];for(let Y=0;Y<q.length;Y++){const K=q[Y];switch(K.mode){case f.NUMERIC:H.push([K,{data:K.data,mode:f.ALPHANUMERIC,length:K.length},{data:K.data,mode:f.BYTE,length:K.length}]);break;case f.ALPHANUMERIC:H.push([K,{data:K.data,mode:f.BYTE,length:K.length}]);break;case f.KANJI:H.push([K,{data:K.data,mode:f.BYTE,length:p(K.data)}]);break;case f.BYTE:H.push([{data:K.data,mode:f.BYTE,length:p(K.data)}])}}return H}function Z(q,H){const Y={},K={start:{}};let ct=["start"];for(let V=0;V<q.length;V++){const j=q[V],B=[];for(let X=0;X<j.length;X++){const nt=j[X],P=""+V+X;B.push(P),Y[P]={node:nt,lastCount:0},K[P]={};for(let W=0;W<ct.length;W++){const tt=ct[W];Y[tt]&&Y[tt].node.mode===nt.mode?(K[tt][P]=O(Y[tt].lastCount+nt.length,nt.mode)-O(Y[tt].lastCount,nt.mode),Y[tt].lastCount+=nt.length):(Y[tt]&&(Y[tt].lastCount=nt.length),K[tt][P]=O(nt.length,nt.mode)+4+f.getCharCountIndicator(nt.mode,H))}}ct=B}for(let V=0;V<ct.length;V++)K[ct[V]].end=0;return{map:K,table:Y}}function J(q,H){let Y;const K=f.getBestModeForData(q);if(Y=f.from(H,K),Y!==f.BYTE&&Y.bit<K.bit)throw new Error('"'+q+'" cannot be encoded with mode '+f.toString(Y)+`.
 Suggested mode is: `+f.toString(K));switch(Y===f.KANJI&&!T.isKanjiModeEnabled()&&(Y=f.BYTE),Y){case f.NUMERIC:return new h(q);case f.ALPHANUMERIC:return new o(q);case f.KANJI:return new d(q);case f.BYTE:return new c(q)}}s.fromArray=function(H){return H.reduce(function(Y,K){return typeof K=="string"?Y.push(J(K,null)):K.data&&Y.push(J(K.data,K.mode)),Y},[])},s.fromString=function(H,Y){const K=D(H,T.isKanjiModeEnabled()),ct=L(K),V=Z(ct,Y),j=g.find_path(V.map,"start","end"),B=[];for(let X=1;X<j.length-1;X++)B.push(V.table[j[X]].node);return s.fromArray(U(B))},s.rawSplit=function(H){return s.fromArray(D(H,T.isKanjiModeEnabled()))}})(Vs)),Vs}var Ih;function Vp(){if(Ih)return Ds;Ih=1;const s=In(),f=lr(),h=Np(),o=_p(),c=Mp(),d=Dp(),b=Rp(),T=fg(),g=Op(),p=Up(),z=Hp(),D=Fn(),O=Gp();function U(V,j){const B=V.size,X=d.getPositions(j);for(let nt=0;nt<X.length;nt++){const P=X[nt][0],W=X[nt][1];for(let tt=-1;tt<=7;tt++)if(!(P+tt<=-1||B<=P+tt))for(let it=-1;it<=7;it++)W+it<=-1||B<=W+it||(tt>=0&&tt<=6&&(it===0||it===6)||it>=0&&it<=6&&(tt===0||tt===6)||tt>=2&&tt<=4&&it>=2&&it<=4?V.set(P+tt,W+it,!0,!0):V.set(P+tt,W+it,!1,!0))}}function L(V){const j=V.size;for(let B=8;B<j-8;B++){const X=B%2===0;V.set(B,6,X,!0),V.set(6,B,X,!0)}}function Z(V,j){const B=c.getPositions(j);for(let X=0;X<B.length;X++){const nt=B[X][0],P=B[X][1];for(let W=-2;W<=2;W++)for(let tt=-2;tt<=2;tt++)W===-2||W===2||tt===-2||tt===2||W===0&&tt===0?V.set(nt+W,P+tt,!0,!0):V.set(nt+W,P+tt,!1,!0)}}function J(V,j){const B=V.size,X=p.getEncodedBits(j);let nt,P,W;for(let tt=0;tt<18;tt++)nt=Math.floor(tt/3),P=tt%3+B-8-3,W=(X>>tt&1)===1,V.set(nt,P,W,!0),V.set(P,nt,W,!0)}function q(V,j,B){const X=V.size,nt=z.getEncodedBits(j,B);let P,W;for(P=0;P<15;P++)W=(nt>>P&1)===1,P<6?V.set(P,8,W,!0):P<8?V.set(P+1,8,W,!0):V.set(X-15+P,8,W,!0),P<8?V.set(8,X-P-1,W,!0):P<9?V.set(8,15-P-1+1,W,!0):V.set(8,15-P-1,W,!0);V.set(X-8,8,1,!0)}function H(V,j){const B=V.size;let X=-1,nt=B-1,P=7,W=0;for(let tt=B-1;tt>0;tt-=2)for(tt===6&&tt--;;){for(let it=0;it<2;it++)if(!V.isReserved(nt,tt-it)){let Lt=!1;W<j.length&&(Lt=(j[W]>>>P&1)===1),V.set(nt,tt-it,Lt),P--,P===-1&&(W++,P=7)}if(nt+=X,nt<0||B<=nt){nt-=X,X=-X;break}}}function Y(V,j,B){const X=new h;B.forEach(function(it){X.put(it.mode.bit,4),X.put(it.getLength(),D.getCharCountIndicator(it.mode,V)),it.write(X)});const nt=s.getSymbolTotalCodewords(V),P=T.getTotalCodewordsCount(V,j),W=(nt-P)*8;for(X.getLengthInBits()+4<=W&&X.put(0,4);X.getLengthInBits()%8!==0;)X.putBit(0);const tt=(W-X.getLengthInBits())/8;for(let it=0;it<tt;it++)X.put(it%2?17:236,8);return K(X,V,j)}function K(V,j,B){const X=s.getSymbolTotalCodewords(j),nt=T.getTotalCodewordsCount(j,B),P=X-nt,W=T.getBlocksCount(j,B),tt=X%W,it=W-tt,Lt=Math.floor(X/W),N=Math.floor(P/W),Q=N+1,at=Lt-N,Et=new g(at);let St=0;const w=new Array(W),k=new Array(W);let G=0;const F=new Uint8Array(V.buffer);for(let Ct=0;Ct<W;Ct++){const He=Ct<it?N:Q;w[Ct]=F.slice(St,St+He),k[Ct]=Et.encode(w[Ct]),St+=He,G=Math.max(G,He)}const ut=new Uint8Array(X);let ft=0,dt,Rt;for(dt=0;dt<G;dt++)for(Rt=0;Rt<W;Rt++)dt<w[Rt].length&&(ut[ft++]=w[Rt][dt]);for(dt=0;dt<at;dt++)for(Rt=0;Rt<W;Rt++)ut[ft++]=k[Rt][dt];return ut}function ct(V,j,B,X){let nt;if(Array.isArray(V))nt=O.fromArray(V);else if(typeof V=="string"){let Lt=j;if(!Lt){const N=O.rawSplit(V);Lt=p.getBestVersionForData(N,B)}nt=O.fromString(V,Lt||40)}else throw new Error("Invalid data");const P=p.getBestVersionForData(nt,B);if(!P)throw new Error("The amount of data is too big to be stored in a QR Code");if(!j)j=P;else if(j<P)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+P+`.
`);const W=Y(j,B,nt),tt=s.getSymbolSize(j),it=new o(tt);return U(it,j),L(it),Z(it,j),q(it,B,0),j>=7&&J(it,j),H(it,W),isNaN(X)&&(X=b.getBestMask(it,q.bind(null,it,B))),b.applyMask(X,it),q(it,B,X),{modules:it,version:j,errorCorrectionLevel:B,maskPattern:X,segments:nt}}return Ds.create=function(j,B){if(typeof j>"u"||j==="")throw new Error("No input text");let X=f.M,nt,P;return typeof B<"u"&&(X=f.from(B.errorCorrectionLevel,f.M),nt=p.from(B.version),P=b.from(B.maskPattern),B.toSJISFunc&&s.setToSJISFunction(B.toSJISFunc)),ct(j,nt,X,P)},Ds}var Is={},Fs={},Fh;function gg(){return Fh||(Fh=1,(function(s){function f(h){if(typeof h=="number"&&(h=h.toString()),typeof h!="string")throw new Error("Color should be defined as hex string");let o=h.slice().replace("#","").split("");if(o.length<3||o.length===5||o.length>8)throw new Error("Invalid hex color: "+h);(o.length===3||o.length===4)&&(o=Array.prototype.concat.apply([],o.map(function(d){return[d,d]}))),o.length===6&&o.push("F","F");const c=parseInt(o.join(""),16);return{r:c>>24&255,g:c>>16&255,b:c>>8&255,a:c&255,hex:"#"+o.slice(0,6).join("")}}s.getOptions=function(o){o||(o={}),o.color||(o.color={});const c=typeof o.margin>"u"||o.margin===null||o.margin<0?4:o.margin,d=o.width&&o.width>=21?o.width:void 0,b=o.scale||4;return{width:d,scale:d?4:b,margin:c,color:{dark:f(o.color.dark||"#000000ff"),light:f(o.color.light||"#ffffffff")},type:o.type,rendererOpts:o.rendererOpts||{}}},s.getScale=function(o,c){return c.width&&c.width>=o+c.margin*2?c.width/(o+c.margin*2):c.scale},s.getImageWidth=function(o,c){const d=s.getScale(o,c);return Math.floor((o+c.margin*2)*d)},s.qrToImageData=function(o,c,d){const b=c.modules.size,T=c.modules.data,g=s.getScale(b,d),p=Math.floor((b+d.margin*2)*g),z=d.margin*g,D=[d.color.light,d.color.dark];for(let O=0;O<p;O++)for(let U=0;U<p;U++){let L=(O*p+U)*4,Z=d.color.light;if(O>=z&&U>=z&&O<p-z&&U<p-z){const J=Math.floor((O-z)/g),q=Math.floor((U-z)/g);Z=D[T[J*b+q]?1:0]}o[L++]=Z.r,o[L++]=Z.g,o[L++]=Z.b,o[L]=Z.a}}})(Fs)),Fs}var Wh;function Xp(){return Wh||(Wh=1,(function(s){const f=gg();function h(c,d,b){c.clearRect(0,0,d.width,d.height),d.style||(d.style={}),d.height=b,d.width=b,d.style.height=b+"px",d.style.width=b+"px"}function o(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}s.render=function(d,b,T){let g=T,p=b;typeof g>"u"&&(!b||!b.getContext)&&(g=b,b=void 0),b||(p=o()),g=f.getOptions(g);const z=f.getImageWidth(d.modules.size,g),D=p.getContext("2d"),O=D.createImageData(z,z);return f.qrToImageData(O.data,d,g),h(D,p,z),D.putImageData(O,0,0),p},s.renderToDataURL=function(d,b,T){let g=T;typeof g>"u"&&(!b||!b.getContext)&&(g=b,b=void 0),g||(g={});const p=s.render(d,b,g),z=g.type||"image/png",D=g.rendererOpts||{};return p.toDataURL(z,D.quality)}})(Is)),Is}var Ws={},$h;function Qp(){if($h)return Ws;$h=1;const s=gg();function f(c,d){const b=c.a/255,T=d+'="'+c.hex+'"';return b<1?T+" "+d+'-opacity="'+b.toFixed(2).slice(1)+'"':T}function h(c,d,b){let T=c+d;return typeof b<"u"&&(T+=" "+b),T}function o(c,d,b){let T="",g=0,p=!1,z=0;for(let D=0;D<c.length;D++){const O=Math.floor(D%d),U=Math.floor(D/d);!O&&!p&&(p=!0),c[D]?(z++,D>0&&O>0&&c[D-1]||(T+=p?h("M",O+b,.5+U+b):h("m",g,0),g=0,p=!1),O+1<d&&c[D+1]||(T+=h("h",z),z=0)):g++}return T}return Ws.render=function(d,b,T){const g=s.getOptions(b),p=d.modules.size,z=d.modules.data,D=p+g.margin*2,O=g.color.light.a?"<path "+f(g.color.light,"fill")+' d="M0 0h'+D+"v"+D+'H0z"/>':"",U="<path "+f(g.color.dark,"stroke")+' d="'+o(z,p,g.margin)+'"/>',L='viewBox="0 0 '+D+" "+D+'"',J='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+L+' shape-rendering="crispEdges">'+O+U+`</svg>
`;return typeof T=="function"&&T(null,J),J},Ws}var Ph;function Zp(){if(Ph)return Ha;Ph=1;const s=Cp(),f=Vp(),h=Xp(),o=Qp();function c(d,b,T,g,p){const z=[].slice.call(arguments,1),D=z.length,O=typeof z[D-1]=="function";if(!O&&!s())throw new Error("Callback required as last argument");if(O){if(D<2)throw new Error("Too few arguments provided");D===2?(p=T,T=b,b=g=void 0):D===3&&(b.getContext&&typeof p>"u"?(p=g,g=void 0):(p=g,g=T,T=b,b=void 0))}else{if(D<1)throw new Error("Too few arguments provided");return D===1?(T=b,b=g=void 0):D===2&&!b.getContext&&(g=T,T=b,b=void 0),new Promise(function(U,L){try{const Z=f.create(T,g);U(d(Z,b,g))}catch(Z){L(Z)}})}try{const U=f.create(T,g);p(null,d(U,b,g))}catch(U){p(U)}}return Ha.create=f.create,Ha.toCanvas=c.bind(null,h.render),Ha.toDataURL=c.bind(null,h.renderToDataURL),Ha.toString=c.bind(null,function(d,b,T){return o.render(d,T)}),Ha}var Kp=Zp();const Jp=L0(Kp),$s=`${window.location.origin}/hpde/pr-preview/pr-185/`;function Ip(){const[s,f]=yt.useState(!1),[h,o]=yt.useState(null);yt.useEffect(()=>{window.scrollTo(0,0),Jp.toDataURL($s,{margin:1,width:240}).then(o).catch(()=>o(null))},[]);async function c(){await navigator.clipboard.writeText($s),f(!0),setTimeout(()=>f(!1),2e3)}return y.jsx("div",{className:"min-h-screen bg-gray-50",children:y.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[y.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[y.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),y.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:y.jsx(nr,{size:18})})]}),y.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),y.jsxs("button",{onClick:c,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[y.jsx("span",{className:"truncate text-sm text-gray-800",children:$s}),s?y.jsx(au,{size:16,className:"shrink-0 text-green-600"}):y.jsx(og,{size:16,className:"shrink-0 text-gray-400"})]}),y.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:h&&y.jsx("img",{src:h,alt:"QR code for schedule link",width:240,height:240})})]})})}const Fp=350,Wp="cubic-bezier(0.32, 0.72, 0, 1)";function $p(s){try{return new URL(s).hostname.replace(/^www\./,"")}catch{return s}}function Pp(s){const f=s.trim().toLowerCase();return f==="clockwise"?"CW (clockwise)":f==="counter-clockwise"||f==="counterclockwise"?"CCW (counter-clockwise)":s}function ty(s,f){return[s,f&&Pp(f)].filter(Boolean).join(" ")}function zl({icon:s,label:f,subtitle:h,children:o}){return y.jsxs("div",{className:"grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[y.jsxs("span",{className:"flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[y.jsx(s,{size:14,className:"shrink-0 text-gray-400"}),f]}),y.jsxs("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:[o,h&&y.jsx("span",{className:"mt-0.5 block text-xs font-normal text-gray-400",children:h})]})]})}function ey({event:s,open:f,onClose:h}){var T;yt.useEffect(()=>{if(!f)return;const g=p=>{p.key==="Escape"&&h()};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[f,h]),yt.useEffect(()=>{if(!f)return;const g=document.documentElement,p=document.body,z=window.scrollY,D=g.style.overflow,O=p.style.overflow,U=p.style.position,L=p.style.top,Z=p.style.width;return g.style.overflow="hidden",p.style.overflow="hidden",p.style.position="fixed",p.style.top=`-${z}px`,p.style.width="100%",()=>{g.style.overflow=D,p.style.overflow=O,p.style.position=U,p.style.top=L,p.style.width=Z,window.scrollTo(0,z)}},[f]);const o=cp(s.days),c=ty(s.configuration,s.direction),d=!!((T=s.scheduleScans)!=null&&T.length),b=o||s.organizer||s.track||c||s.link||d;return y.jsxs(y.Fragment,{children:[y.jsx("div",{"aria-hidden":"true",inert:!f,onClick:h,className:"fixed inset-0 z-40",style:{pointerEvents:f?"auto":"none"}}),y.jsx("div",{role:"dialog","aria-modal":f,"aria-labelledby":"event-details-title",inert:!f,className:"fixed inset-y-0 right-0 z-50 flex w-full bg-white md:w-[480px] md:max-w-[60vw]",style:{transform:f?"translate3d(0,0,0)":"translate3d(100%,0,0)",transition:`transform ${Fp}ms ${Wp}`,boxShadow:f?"-8px 0 24px rgba(0,0,0,0.08)":"none",willChange:"transform"},children:y.jsxs("div",{className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none",children:[y.jsxs("div",{className:"mb-5 flex items-start gap-2 md:justify-between md:gap-4",children:[y.jsx("button",{onClick:h,"aria-label":"Back",className:"inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden",children:y.jsx(P0,{size:20})}),y.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"}),y.jsx("button",{onClick:h,"aria-label":"Close",className:"hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid",children:y.jsx(nr,{size:20})})]}),b?y.jsxs(y.Fragment,{children:[y.jsxs("div",{className:"pl-1",children:[o&&y.jsx(zl,{icon:ig,label:"Dates",children:o}),s.organizer&&y.jsx(zl,{icon:sp,label:"Organizer",children:s.organizer}),s.track&&y.jsx(zl,{icon:lp,label:"Location",subtitle:s.city,children:s.track}),c&&y.jsx(zl,{icon:op,label:"Track config",children:c}),s.link&&y.jsx(zl,{icon:ap,label:"Event page",children:y.jsxs("a",{href:s.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[$p(s.link),y.jsx(tp,{size:12,className:"text-gray-400"})]})})]}),d&&y.jsxs("div",{className:"mt-6 pl-1",children:[y.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[y.jsx(ep,{size:14,className:"shrink-0 text-gray-400"}),"Original schedule"]}),y.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:s.scheduleScans.map((g,p)=>y.jsx("a",{href:g,target:"_blank",rel:"noopener noreferrer",children:y.jsx("img",{src:g,alt:`Original schedule scan ${p+1}`,className:"aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"})},g))})]})]}):y.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})})]})}function Ba(s,f){const h=f.split(`
`).map(Z=>Z.trim());let o="",c,d,b,T,g,p,z;const D=[],O=[];let U=null,L=!1;for(const Z of h){if(!Z||Z.startsWith("//"))continue;const J=Z.replace(/^-\s+/,"");if(J.startsWith("# ")){o=J.slice(2).trim();continue}if(J.startsWith("subtitle:")){c=J.slice(9).trim()||void 0;continue}if(J.startsWith("link:")){d=J.slice(5).trim()||void 0;continue}if(J.startsWith("organizer:")){b=J.slice(10).trim()||void 0;continue}if(J.startsWith("track:")){T=J.slice(6).trim()||void 0;continue}if(J.startsWith("city:")){g=J.slice(5).trim()||void 0;continue}if(J.startsWith("configuration:")){p=J.slice(14).trim()||void 0;continue}if(J.startsWith("config:")){p=J.slice(7).trim()||void 0;continue}if(J.startsWith("direction:")){z=J.slice(10).trim()||void 0;continue}if(J.startsWith("## ")){const q=J.slice(3).trim();if(q.toLowerCase()==="groups"){L=!0,U=null;continue}const H=q.split("|").map(Y=>Y.trim());H.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(H[1])?(L=!1,U={id:H[0].toLowerCase().replace(/\s+/g,"-"),label:H[0],date:H[1],activities:[]},O.push(U)):L=!1;continue}if(L){const q=J.split("|").map(H=>H.trim());if(q.length>=4){const H=q[4]||void 0;D.push({id:q[0],label:q[1],bgClass:q[2],textClass:q[3],...H?{description:H}:{}})}continue}if(U){if(/^\d{2}:\d{2}/.test(J)){const q=ny(J);q&&U.activities.push(q)}else if(/^break\s*\|/.test(J)){const q=J.slice(J.indexOf("|")+1).trim();U.activities.push({type:"break",label:q})}}}return{id:s,name:o,...c?{subtitle:c}:{},...d?{link:d}:{},...b?{organizer:b}:{},...T?{track:T}:{},...g?{city:g}:{},...p?{configuration:p}:{},...z?{direction:z}:{},runGroups:D,days:O}}function ny(s){const f=s.split("|").map(T=>T.trim()),h=f[0],o=f.slice(1),c=h.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!c)return null;const d=c[1],b=c[2].trim();if(/^(general|lunch|special)$/.test(b)){const T=b,g=o[0]??"",p=o[1]||void 0;return{time:d,type:T,label:g,...p?{subtitle:p}:{}}}if(/^session/.test(b)){const T=b.match(/^session\s+(\d+)/),g=T?parseInt(T[1],10):void 0;let p=[],z=[],D;for(const O of o)O.startsWith("track:")?p=O.slice(6).trim().split(",").map(U=>U.trim()).filter(Boolean):O.startsWith("class:")?z=O.slice(6).trim().split(",").map(U=>U.trim()).filter(Boolean):O.startsWith("note:")&&(D=O.slice(5).trim()||void 0);return{time:d,type:"session",...g!==void 0?{sessionNumber:g}:{},onTrack:p,...z.length?{inClass:z}:{},...D?{note:D}:{}}}return null}const ay=`# TDE at MSRC 1.7CW

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
`,ir="/hpde/pr-preview/pr-185/assets/msrc-1-7-D9G0r_nf.jpg",ly={...Ba("2026-09-11_msrc-1-7",ay),mapImage:ir},iy=`# SCCA at MSRC 1.7 CW

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
`,uy={...Ba("2026-09-13_msr-scca",iy),mapImage:ir},oy=`# TDE at MSRC 1.7 Fast Track

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
`,sy={...Ba("2026-06-06_msrc-1-7",oy),mapImage:ir},ry=`# TDE at MSRC 3.1

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
`,cy="/hpde/pr-preview/pr-185/assets/msrc-3-1-BsOP6CK2.png",fy={...Ba("2025-11-07_msrc-3-1",ry),mapImage:cy},dy=`# TDE at ECR 2.7

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
`,hy="/hpde/pr-preview/pr-185/assets/ecr-BW_3Ndfh.png",gy={...Ba("2026-05-30_ecr-2-7",dy),mapImage:hy},my=`# Test Event

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
`,tg=Ba("test-live",my),py={...tg,days:tg.days.map(s=>({...s,date:Ol()}))},eu=[ly,uy,sy,gy,fy].sort((s,f)=>f.id.localeCompare(s.id)),eg=[...eu,py];function tu(s,f){const[h,o]=yt.useState(()=>{try{const c=localStorage.getItem(s);return c!==null?JSON.parse(c):f}catch{return f}});return yt.useEffect(()=>{localStorage.setItem(s,JSON.stringify(h))},[s,h]),[h,o]}function mg(s){const f=Ol();return s.days.find(h=>h.date===f)}function ng(s){return mg(s)??s.days[0]}function yy(){const[s,f]=yt.useState(()=>window.location.hash);yt.useEffect(()=>{const o=()=>{f(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",o),()=>window.removeEventListener("hashchange",o)},[]);function h(o){window.location.hash!==o&&(window.location.hash=o)}return[s,h]}const tr="#/event/";function ag(s){return`${tr}${encodeURIComponent(s)}`}function vy(s){return s.startsWith(tr)?decodeURIComponent(s.slice(tr.length)):null}function by(){const[s,f]=yy(),[h,o]=yt.useState("schedule"),[c,d]=tu("hpde:activeEvent",eu[0].id),[b,T]=tu("hpde:activeDay",null),[g,p]=tu("hpde:groups",[]),[z,D]=tu("hpde:hidePast",!1),[O,U]=yt.useState(!1),L=eg.find(B=>B.id===c)??eu[0],Z=L.days.find(B=>B.id===b)??ng(L),J=mg(L),q=Z.date===Ol(),H=L.days.length>1,K=L.days.reduce((B,X)=>X.date>B?X.date:B,L.days[0].date)<Ol(),[,ct]=yt.useState(0);yt.useEffect(()=>{if(!q)return;const B=setInterval(()=>ct(X=>X+1),6e4);return()=>clearInterval(B)},[q]);const V=q&&Z.activities.some(B=>B.type!=="break"&&en(B.time)<ar());function j(B){d(B.id),T(ng(B).id),p([]),f(ag(B.id))}return yt.useEffect(()=>{const B=vy(s);if(B){const X=eg.find(nt=>nt.id===B);X&&X.id!==c&&j(X);return}(s===""||s==="#")&&f(ag(c))},[s]),s==="#/widget-script"?y.jsx(Ap,{}):s==="#/share"?y.jsx(Ip,{}):y.jsxs(y.Fragment,{children:[y.jsx(Ep,{disabled:O,children:y.jsxs("div",{className:"min-h-screen bg-gray-50",children:[y.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[y.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[y.jsx(wp,{events:eu,active:L,onChange:j,onOpenDetails:()=>U(!0)}),y.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[y.jsx("button",{onClick:()=>o("schedule"),className:`rounded-md p-2 transition-colors ${h==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:y.jsx(ig,{size:18})}),y.jsx("button",{onClick:()=>o("map"),className:`rounded-md p-2 transition-colors ${h==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:y.jsx(vh,{size:18})})]})]}),K&&y.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),h==="schedule"&&y.jsxs(y.Fragment,{children:[H&&y.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[y.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:L.days.map(B=>y.jsx("button",{onClick:()=>T(B.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${Z.id===B.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:B.label},B.id))}),y.jsx("button",{onClick:()=>J&&T(J.id),disabled:q||!J,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${q||!J?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),y.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[y.jsx(bp,{groups:L.runGroups,selected:g,onChange:p}),V&&y.jsx(Sp,{checked:z,onChange:()=>D(B=>!B),label:"Hide past activities"})]}),y.jsx(vp,{activities:Z.activities,runGroups:L.runGroups,isToday:q,selectedGroups:g,hidePast:z}),y.jsx(xp,{groups:L.runGroups})]}),h==="map"&&(L.mapImage?y.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:y.jsx("img",{src:L.mapImage,alt:`${L.name} track map`,className:"block w-full h-auto"})}):y.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:y.jsxs("div",{className:"text-center",children:[y.jsx(vh,{size:40,className:"mx-auto mb-2 opacity-30"}),y.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),y.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[y.jsxs("div",{children:[y.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",y.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),y.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",mp("2026-09-18T22:43:59-05:00")]})]})]})}),y.jsx(ey,{event:L,open:O,onClose:()=>U(!1)})]})}I0.createRoot(document.getElementById("root")).render(y.jsx(yt.StrictMode,{children:y.jsx(by,{})}));
