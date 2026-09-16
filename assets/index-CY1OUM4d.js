(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))s(f);new MutationObserver(f=>{for(const m of f)if(m.type==="childList")for(const b of m.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&s(b)}).observe(document,{childList:!0,subtree:!0});function d(f){const m={};return f.integrity&&(m.integrity=f.integrity),f.referrerPolicy&&(m.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?m.credentials="include":f.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function s(f){if(f.ep)return;f.ep=!0;const m=d(f);fetch(f.href,m)}})();function Gg(c){return c&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c}var Tc={exports:{}},_l={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oh;function Yg(){if(oh)return _l;oh=1;var c=Symbol.for("react.transitional.element"),o=Symbol.for("react.fragment");function d(s,f,m){var b=null;if(m!==void 0&&(b=""+m),f.key!==void 0&&(b=""+f.key),"key"in f){m={};for(var w in f)w!=="key"&&(m[w]=f[w])}else m=f;return f=m.ref,{$$typeof:c,type:s,key:b,ref:f!==void 0?f:null,props:m}}return _l.Fragment=o,_l.jsx=d,_l.jsxs=d,_l}var fh;function Qg(){return fh||(fh=1,Tc.exports=Yg()),Tc.exports}var h=Qg(),Nc={exports:{}},ct={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dh;function Vg(){if(dh)return ct;dh=1;var c=Symbol.for("react.transitional.element"),o=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),m=Symbol.for("react.consumer"),b=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),y=Symbol.for("react.memo"),B=Symbol.for("react.lazy"),E=Symbol.for("react.activity"),z=Symbol.iterator;function k(x){return x===null||typeof x!="object"?null:(x=z&&x[z]||x["@@iterator"],typeof x=="function"?x:null)}var q={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Y=Object.assign,Q={};function G(x,j,Z){this.props=x,this.context=j,this.refs=Q,this.updater=Z||q}G.prototype.isReactComponent={},G.prototype.setState=function(x,j){if(typeof x!="object"&&typeof x!="function"&&x!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,x,j,"setState")},G.prototype.forceUpdate=function(x){this.updater.enqueueForceUpdate(this,x,"forceUpdate")};function V(){}V.prototype=G.prototype;function H(x,j,Z){this.props=x,this.context=j,this.refs=Q,this.updater=Z||q}var T=H.prototype=new V;T.constructor=H,Y(T,G.prototype),T.isPureReactComponent=!0;var X=Array.isArray;function L(){}var U={H:null,A:null,T:null,S:null},J=Object.prototype.hasOwnProperty;function F(x,j,Z){var W=Z.ref;return{$$typeof:c,type:x,key:j,ref:W!==void 0?W:null,props:Z}}function at(x,j){return F(x.type,j,x.props)}function tt(x){return typeof x=="object"&&x!==null&&x.$$typeof===c}function $(x){var j={"=":"=0",":":"=2"};return"$"+x.replace(/[=:]/g,function(Z){return j[Z]})}var et=/\/+/g;function ut(x,j){return typeof x=="object"&&x!==null&&x.key!=null?$(""+x.key):j.toString(36)}function Lt(x){switch(x.status){case"fulfilled":return x.value;case"rejected":throw x.reason;default:switch(typeof x.status=="string"?x.then(L,L):(x.status="pending",x.then(function(j){x.status==="pending"&&(x.status="fulfilled",x.value=j)},function(j){x.status==="pending"&&(x.status="rejected",x.reason=j)})),x.status){case"fulfilled":return x.value;case"rejected":throw x.reason}}throw x}function R(x,j,Z,W,st){var ft=typeof x;(ft==="undefined"||ft==="boolean")&&(x=null);var dt=!1;if(x===null)dt=!0;else switch(ft){case"bigint":case"string":case"number":dt=!0;break;case"object":switch(x.$$typeof){case c:case o:dt=!0;break;case B:return dt=x._init,R(dt(x._payload),j,Z,W,st)}}if(dt)return st=st(x),dt=W===""?"."+ut(x,0):W,X(st)?(Z="",dt!=null&&(Z=dt.replace(et,"$&/")+"/"),R(st,j,Z,"",function(Ue){return Ue})):st!=null&&(tt(st)&&(st=at(st,Z+(st.key==null||x&&x.key===st.key?"":(""+st.key).replace(et,"$&/")+"/")+dt)),j.push(st)),1;dt=0;var zt=W===""?".":W+":";if(X(x))for(var Ct=0;Ct<x.length;Ct++)W=x[Ct],ft=zt+ut(W,Ct),dt+=R(W,j,Z,ft,st);else if(Ct=k(x),typeof Ct=="function")for(x=Ct.call(x),Ct=0;!(W=x.next()).done;)W=W.value,ft=zt+ut(W,Ct++),dt+=R(W,j,Z,ft,st);else if(ft==="object"){if(typeof x.then=="function")return R(Lt(x),j,Z,W,st);throw j=String(x),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(x).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.")}return dt}function K(x,j,Z){if(x==null)return x;var W=[],st=0;return R(x,W,"","",function(ft){return j.call(Z,ft,st++)}),W}function lt(x){if(x._status===-1){var j=x._result;j=j(),j.then(function(Z){(x._status===0||x._status===-1)&&(x._status=1,x._result=Z)},function(Z){(x._status===0||x._status===-1)&&(x._status=2,x._result=Z)}),x._status===-1&&(x._status=0,x._result=j)}if(x._status===1)return x._result.default;throw x._result}var Et=typeof reportError=="function"?reportError:function(x){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var j=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof x=="object"&&x!==null&&typeof x.message=="string"?String(x.message):String(x),error:x});if(!window.dispatchEvent(j))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",x);return}console.error(x)},St={map:K,forEach:function(x,j,Z){K(x,function(){j.apply(this,arguments)},Z)},count:function(x){var j=0;return K(x,function(){j++}),j},toArray:function(x){return K(x,function(j){return j})||[]},only:function(x){if(!tt(x))throw Error("React.Children.only expected to receive a single React element child.");return x}};return ct.Activity=E,ct.Children=St,ct.Component=G,ct.Fragment=d,ct.Profiler=f,ct.PureComponent=H,ct.StrictMode=s,ct.Suspense=g,ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=U,ct.__COMPILER_RUNTIME={__proto__:null,c:function(x){return U.H.useMemoCache(x)}},ct.cache=function(x){return function(){return x.apply(null,arguments)}},ct.cacheSignal=function(){return null},ct.cloneElement=function(x,j,Z){if(x==null)throw Error("The argument must be a React element, but you passed "+x+".");var W=Y({},x.props),st=x.key;if(j!=null)for(ft in j.key!==void 0&&(st=""+j.key),j)!J.call(j,ft)||ft==="key"||ft==="__self"||ft==="__source"||ft==="ref"&&j.ref===void 0||(W[ft]=j[ft]);var ft=arguments.length-2;if(ft===1)W.children=Z;else if(1<ft){for(var dt=Array(ft),zt=0;zt<ft;zt++)dt[zt]=arguments[zt+2];W.children=dt}return F(x.type,st,W)},ct.createContext=function(x){return x={$$typeof:b,_currentValue:x,_currentValue2:x,_threadCount:0,Provider:null,Consumer:null},x.Provider=x,x.Consumer={$$typeof:m,_context:x},x},ct.createElement=function(x,j,Z){var W,st={},ft=null;if(j!=null)for(W in j.key!==void 0&&(ft=""+j.key),j)J.call(j,W)&&W!=="key"&&W!=="__self"&&W!=="__source"&&(st[W]=j[W]);var dt=arguments.length-2;if(dt===1)st.children=Z;else if(1<dt){for(var zt=Array(dt),Ct=0;Ct<dt;Ct++)zt[Ct]=arguments[Ct+2];st.children=zt}if(x&&x.defaultProps)for(W in dt=x.defaultProps,dt)st[W]===void 0&&(st[W]=dt[W]);return F(x,ft,st)},ct.createRef=function(){return{current:null}},ct.forwardRef=function(x){return{$$typeof:w,render:x}},ct.isValidElement=tt,ct.lazy=function(x){return{$$typeof:B,_payload:{_status:-1,_result:x},_init:lt}},ct.memo=function(x,j){return{$$typeof:y,type:x,compare:j===void 0?null:j}},ct.startTransition=function(x){var j=U.T,Z={};U.T=Z;try{var W=x(),st=U.S;st!==null&&st(Z,W),typeof W=="object"&&W!==null&&typeof W.then=="function"&&W.then(L,Et)}catch(ft){Et(ft)}finally{j!==null&&Z.types!==null&&(j.types=Z.types),U.T=j}},ct.unstable_useCacheRefresh=function(){return U.H.useCacheRefresh()},ct.use=function(x){return U.H.use(x)},ct.useActionState=function(x,j,Z){return U.H.useActionState(x,j,Z)},ct.useCallback=function(x,j){return U.H.useCallback(x,j)},ct.useContext=function(x){return U.H.useContext(x)},ct.useDebugValue=function(){},ct.useDeferredValue=function(x,j){return U.H.useDeferredValue(x,j)},ct.useEffect=function(x,j){return U.H.useEffect(x,j)},ct.useEffectEvent=function(x){return U.H.useEffectEvent(x)},ct.useId=function(){return U.H.useId()},ct.useImperativeHandle=function(x,j,Z){return U.H.useImperativeHandle(x,j,Z)},ct.useInsertionEffect=function(x,j){return U.H.useInsertionEffect(x,j)},ct.useLayoutEffect=function(x,j){return U.H.useLayoutEffect(x,j)},ct.useMemo=function(x,j){return U.H.useMemo(x,j)},ct.useOptimistic=function(x,j){return U.H.useOptimistic(x,j)},ct.useReducer=function(x,j,Z){return U.H.useReducer(x,j,Z)},ct.useRef=function(x){return U.H.useRef(x)},ct.useState=function(x){return U.H.useState(x)},ct.useSyncExternalStore=function(x,j,Z){return U.H.useSyncExternalStore(x,j,Z)},ct.useTransition=function(){return U.H.useTransition()},ct.version="19.2.6",ct}var hh;function ar(){return hh||(hh=1,Nc.exports=Vg()),Nc.exports}var yt=ar(),Cc={exports:{}},Rl={},Ac={exports:{}},_c={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mh;function Xg(){return mh||(mh=1,(function(c){function o(R,K){var lt=R.length;R.push(K);t:for(;0<lt;){var Et=lt-1>>>1,St=R[Et];if(0<f(St,K))R[Et]=K,R[lt]=St,lt=Et;else break t}}function d(R){return R.length===0?null:R[0]}function s(R){if(R.length===0)return null;var K=R[0],lt=R.pop();if(lt!==K){R[0]=lt;t:for(var Et=0,St=R.length,x=St>>>1;Et<x;){var j=2*(Et+1)-1,Z=R[j],W=j+1,st=R[W];if(0>f(Z,lt))W<St&&0>f(st,Z)?(R[Et]=st,R[W]=lt,Et=W):(R[Et]=Z,R[j]=lt,Et=j);else if(W<St&&0>f(st,lt))R[Et]=st,R[W]=lt,Et=W;else break t}}return K}function f(R,K){var lt=R.sortIndex-K.sortIndex;return lt!==0?lt:R.id-K.id}if(c.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var m=performance;c.unstable_now=function(){return m.now()}}else{var b=Date,w=b.now();c.unstable_now=function(){return b.now()-w}}var g=[],y=[],B=1,E=null,z=3,k=!1,q=!1,Y=!1,Q=!1,G=typeof setTimeout=="function"?setTimeout:null,V=typeof clearTimeout=="function"?clearTimeout:null,H=typeof setImmediate<"u"?setImmediate:null;function T(R){for(var K=d(y);K!==null;){if(K.callback===null)s(y);else if(K.startTime<=R)s(y),K.sortIndex=K.expirationTime,o(g,K);else break;K=d(y)}}function X(R){if(Y=!1,T(R),!q)if(d(g)!==null)q=!0,L||(L=!0,$());else{var K=d(y);K!==null&&Lt(X,K.startTime-R)}}var L=!1,U=-1,J=5,F=-1;function at(){return Q?!0:!(c.unstable_now()-F<J)}function tt(){if(Q=!1,L){var R=c.unstable_now();F=R;var K=!0;try{t:{q=!1,Y&&(Y=!1,V(U),U=-1),k=!0;var lt=z;try{e:{for(T(R),E=d(g);E!==null&&!(E.expirationTime>R&&at());){var Et=E.callback;if(typeof Et=="function"){E.callback=null,z=E.priorityLevel;var St=Et(E.expirationTime<=R);if(R=c.unstable_now(),typeof St=="function"){E.callback=St,T(R),K=!0;break e}E===d(g)&&s(g),T(R)}else s(g);E=d(g)}if(E!==null)K=!0;else{var x=d(y);x!==null&&Lt(X,x.startTime-R),K=!1}}break t}finally{E=null,z=lt,k=!1}K=void 0}}finally{K?$():L=!1}}}var $;if(typeof H=="function")$=function(){H(tt)};else if(typeof MessageChannel<"u"){var et=new MessageChannel,ut=et.port2;et.port1.onmessage=tt,$=function(){ut.postMessage(null)}}else $=function(){G(tt,0)};function Lt(R,K){U=G(function(){R(c.unstable_now())},K)}c.unstable_IdlePriority=5,c.unstable_ImmediatePriority=1,c.unstable_LowPriority=4,c.unstable_NormalPriority=3,c.unstable_Profiling=null,c.unstable_UserBlockingPriority=2,c.unstable_cancelCallback=function(R){R.callback=null},c.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):J=0<R?Math.floor(1e3/R):5},c.unstable_getCurrentPriorityLevel=function(){return z},c.unstable_next=function(R){switch(z){case 1:case 2:case 3:var K=3;break;default:K=z}var lt=z;z=K;try{return R()}finally{z=lt}},c.unstable_requestPaint=function(){Q=!0},c.unstable_runWithPriority=function(R,K){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var lt=z;z=R;try{return K()}finally{z=lt}},c.unstable_scheduleCallback=function(R,K,lt){var Et=c.unstable_now();switch(typeof lt=="object"&&lt!==null?(lt=lt.delay,lt=typeof lt=="number"&&0<lt?Et+lt:Et):lt=Et,R){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=lt+St,R={id:B++,callback:K,priorityLevel:R,startTime:lt,expirationTime:St,sortIndex:-1},lt>Et?(R.sortIndex=lt,o(y,R),d(g)===null&&R===d(y)&&(Y?(V(U),U=-1):Y=!0,Lt(X,lt-Et))):(R.sortIndex=St,o(g,R),q||k||(q=!0,L||(L=!0,$()))),R},c.unstable_shouldYield=at,c.unstable_wrapCallback=function(R){var K=z;return function(){var lt=z;z=K;try{return R.apply(this,arguments)}finally{z=lt}}}})(_c)),_c}var gh;function Zg(){return gh||(gh=1,Ac.exports=Xg()),Ac.exports}var Rc={exports:{}},Pt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ph;function Kg(){if(ph)return Pt;ph=1;var c=ar();function o(g){var y="https://react.dev/errors/"+g;if(1<arguments.length){y+="?args[]="+encodeURIComponent(arguments[1]);for(var B=2;B<arguments.length;B++)y+="&args[]="+encodeURIComponent(arguments[B])}return"Minified React error #"+g+"; visit "+y+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(){}var s={d:{f:d,r:function(){throw Error(o(522))},D:d,C:d,L:d,m:d,X:d,S:d,M:d},p:0,findDOMNode:null},f=Symbol.for("react.portal");function m(g,y,B){var E=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:f,key:E==null?null:""+E,children:g,containerInfo:y,implementation:B}}var b=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function w(g,y){if(g==="font")return"";if(typeof y=="string")return y==="use-credentials"?y:""}return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Pt.createPortal=function(g,y){var B=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!y||y.nodeType!==1&&y.nodeType!==9&&y.nodeType!==11)throw Error(o(299));return m(g,y,null,B)},Pt.flushSync=function(g){var y=b.T,B=s.p;try{if(b.T=null,s.p=2,g)return g()}finally{b.T=y,s.p=B,s.d.f()}},Pt.preconnect=function(g,y){typeof g=="string"&&(y?(y=y.crossOrigin,y=typeof y=="string"?y==="use-credentials"?y:"":void 0):y=null,s.d.C(g,y))},Pt.prefetchDNS=function(g){typeof g=="string"&&s.d.D(g)},Pt.preinit=function(g,y){if(typeof g=="string"&&y&&typeof y.as=="string"){var B=y.as,E=w(B,y.crossOrigin),z=typeof y.integrity=="string"?y.integrity:void 0,k=typeof y.fetchPriority=="string"?y.fetchPriority:void 0;B==="style"?s.d.S(g,typeof y.precedence=="string"?y.precedence:void 0,{crossOrigin:E,integrity:z,fetchPriority:k}):B==="script"&&s.d.X(g,{crossOrigin:E,integrity:z,fetchPriority:k,nonce:typeof y.nonce=="string"?y.nonce:void 0})}},Pt.preinitModule=function(g,y){if(typeof g=="string")if(typeof y=="object"&&y!==null){if(y.as==null||y.as==="script"){var B=w(y.as,y.crossOrigin);s.d.M(g,{crossOrigin:B,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0})}}else y==null&&s.d.M(g)},Pt.preload=function(g,y){if(typeof g=="string"&&typeof y=="object"&&y!==null&&typeof y.as=="string"){var B=y.as,E=w(B,y.crossOrigin);s.d.L(g,B,{crossOrigin:E,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0,type:typeof y.type=="string"?y.type:void 0,fetchPriority:typeof y.fetchPriority=="string"?y.fetchPriority:void 0,referrerPolicy:typeof y.referrerPolicy=="string"?y.referrerPolicy:void 0,imageSrcSet:typeof y.imageSrcSet=="string"?y.imageSrcSet:void 0,imageSizes:typeof y.imageSizes=="string"?y.imageSizes:void 0,media:typeof y.media=="string"?y.media:void 0})}},Pt.preloadModule=function(g,y){if(typeof g=="string")if(y){var B=w(y.as,y.crossOrigin);s.d.m(g,{as:typeof y.as=="string"&&y.as!=="script"?y.as:void 0,crossOrigin:B,integrity:typeof y.integrity=="string"?y.integrity:void 0})}else s.d.m(g)},Pt.requestFormReset=function(g){s.d.r(g)},Pt.unstable_batchedUpdates=function(g,y){return g(y)},Pt.useFormState=function(g,y,B){return b.H.useFormState(g,y,B)},Pt.useFormStatus=function(){return b.H.useHostTransitionStatus()},Pt.version="19.2.6",Pt}var yh;function Jg(){if(yh)return Rc.exports;yh=1;function c(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)}catch(o){console.error(o)}}return c(),Rc.exports=Kg(),Rc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vh;function Fg(){if(vh)return Rl;vh=1;var c=Zg(),o=ar(),d=Jg();function s(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function m(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function b(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function w(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function g(t){if(m(t)!==t)throw Error(s(188))}function y(t){var e=t.alternate;if(!e){if(e=m(t),e===null)throw Error(s(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return g(l),t;if(i===a)return g(l),e;i=i.sibling}throw Error(s(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,r=l.child;r;){if(r===n){u=!0,n=l,a=i;break}if(r===a){u=!0,a=l,n=i;break}r=r.sibling}if(!u){for(r=i.child;r;){if(r===n){u=!0,n=i,a=l;break}if(r===a){u=!0,a=i,n=l;break}r=r.sibling}if(!u)throw Error(s(189))}}if(n.alternate!==a)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?t:e}function B(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=B(t),e!==null)return e;t=t.sibling}return null}var E=Object.assign,z=Symbol.for("react.element"),k=Symbol.for("react.transitional.element"),q=Symbol.for("react.portal"),Y=Symbol.for("react.fragment"),Q=Symbol.for("react.strict_mode"),G=Symbol.for("react.profiler"),V=Symbol.for("react.consumer"),H=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),U=Symbol.for("react.memo"),J=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),at=Symbol.for("react.memo_cache_sentinel"),tt=Symbol.iterator;function $(t){return t===null||typeof t!="object"?null:(t=tt&&t[tt]||t["@@iterator"],typeof t=="function"?t:null)}var et=Symbol.for("react.client.reference");function ut(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===et?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Y:return"Fragment";case G:return"Profiler";case Q:return"StrictMode";case X:return"Suspense";case L:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case q:return"Portal";case H:return t.displayName||"Context";case V:return(t._context.displayName||"Context")+".Consumer";case T:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case U:return e=t.displayName||null,e!==null?e:ut(t.type)||"Memo";case J:e=t._payload,t=t._init;try{return ut(t(e))}catch{}}return null}var Lt=Array.isArray,R=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,lt={pending:!1,data:null,method:null,action:null},Et=[],St=-1;function x(t){return{current:t}}function j(t){0>St||(t.current=Et[St],Et[St]=null,St--)}function Z(t,e){St++,Et[St]=t.current,t.current=e}var W=x(null),st=x(null),ft=x(null),dt=x(null);function zt(t,e){switch(Z(ft,e),Z(st,t),Z(W,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Od(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Od(e),t=jd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}j(W),Z(W,t)}function Ct(){j(W),j(st),j(ft)}function Ue(t){t.memoizedState!==null&&Z(dt,t);var e=W.current,n=jd(e,t.type);e!==n&&(Z(st,t),Z(W,n))}function jl(t){st.current===t&&(j(W),j(st)),dt.current===t&&(j(dt),Tl._currentValue=lt)}var uu,sr;function Rn(t){if(uu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);uu=e&&e[1]||"",sr=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+uu+t+sr}var su=!1;function cu(t,e){if(!t||su)return"";su=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var O=function(){throw Error()};if(Object.defineProperty(O.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(O,[])}catch(_){var A=_}Reflect.construct(t,[],O)}else{try{O.call()}catch(_){A=_}t.call(O.prototype)}}else{try{throw Error()}catch(_){A=_}(O=t())&&typeof O.catch=="function"&&O.catch(function(){})}}catch(_){if(_&&A&&typeof _.stack=="string")return[_.stack,A.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],r=i[1];if(u&&r){var p=u.split(`
`),C=r.split(`
`);for(l=a=0;a<p.length&&!p[a].includes("DetermineComponentFrameRoot");)a++;for(;l<C.length&&!C[l].includes("DetermineComponentFrameRoot");)l++;if(a===p.length||l===C.length)for(a=p.length-1,l=C.length-1;1<=a&&0<=l&&p[a]!==C[l];)l--;for(;1<=a&&0<=l;a--,l--)if(p[a]!==C[l]){if(a!==1||l!==1)do if(a--,l--,0>l||p[a]!==C[l]){var M=`
`+p[a].replace(" at new "," at ");return t.displayName&&M.includes("<anonymous>")&&(M=M.replace("<anonymous>",t.displayName)),M}while(1<=a&&0<=l);break}}}finally{su=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Rn(n):""}function v0(t,e){switch(t.tag){case 26:case 27:case 5:return Rn(t.type);case 16:return Rn("Lazy");case 13:return t.child!==e&&e!==null?Rn("Suspense Fallback"):Rn("Suspense");case 19:return Rn("SuspenseList");case 0:case 15:return cu(t.type,!1);case 11:return cu(t.type.render,!1);case 1:return cu(t.type,!0);case 31:return Rn("Activity");default:return""}}function cr(t){try{var e="",n=null;do e+=v0(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var ru=Object.prototype.hasOwnProperty,ou=c.unstable_scheduleCallback,fu=c.unstable_cancelCallback,b0=c.unstable_shouldYield,x0=c.unstable_requestPaint,ce=c.unstable_now,S0=c.unstable_getCurrentPriorityLevel,rr=c.unstable_ImmediatePriority,or=c.unstable_UserBlockingPriority,Bl=c.unstable_NormalPriority,w0=c.unstable_LowPriority,fr=c.unstable_IdlePriority,E0=c.log,T0=c.unstable_setDisableYieldValue,Ua=null,re=null;function nn(t){if(typeof E0=="function"&&T0(t),re&&typeof re.setStrictMode=="function")try{re.setStrictMode(Ua,t)}catch{}}var oe=Math.clz32?Math.clz32:A0,N0=Math.log,C0=Math.LN2;function A0(t){return t>>>=0,t===0?32:31-(N0(t)/C0|0)|0}var Ul=256,kl=262144,Hl=4194304;function Mn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Ll(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var r=a&134217727;return r!==0?(a=r&~i,a!==0?l=Mn(a):(u&=r,u!==0?l=Mn(u):n||(n=r&~t,n!==0&&(l=Mn(n))))):(r=a&~i,r!==0?l=Mn(r):u!==0?l=Mn(u):n||(n=a&~t,n!==0&&(l=Mn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function ka(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function _0(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dr(){var t=Hl;return Hl<<=1,(Hl&62914560)===0&&(Hl=4194304),t}function du(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ha(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function R0(t,e,n,a,l,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var r=t.entanglements,p=t.expirationTimes,C=t.hiddenUpdates;for(n=u&~n;0<n;){var M=31-oe(n),O=1<<M;r[M]=0,p[M]=-1;var A=C[M];if(A!==null)for(C[M]=null,M=0;M<A.length;M++){var _=A[M];_!==null&&(_.lane&=-536870913)}n&=~O}a!==0&&hr(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function hr(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-oe(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function mr(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-oe(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function gr(t,e){var n=e&-e;return n=(n&42)!==0?1:hu(n),(n&(t.suspendedLanes|e))!==0?0:n}function hu(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function mu(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function pr(){var t=K.p;return t!==0?t:(t=window.event,t===void 0?32:ah(t.type))}function yr(t,e){var n=K.p;try{return K.p=t,e()}finally{K.p=n}}var an=Math.random().toString(36).slice(2),Kt="__reactFiber$"+an,ee="__reactProps$"+an,Wn="__reactContainer$"+an,gu="__reactEvents$"+an,M0="__reactListeners$"+an,z0="__reactHandles$"+an,vr="__reactResources$"+an,La="__reactMarker$"+an;function pu(t){delete t[Kt],delete t[ee],delete t[gu],delete t[M0],delete t[z0]}function $n(t){var e=t[Kt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[Kt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Gd(t);t!==null;){if(n=t[Kt])return n;t=Gd(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[Kt]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function qa(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(s(33))}function ta(t){var e=t[vr];return e||(e=t[vr]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Xt(t){t[La]=!0}var br=new Set,xr={};function zn(t,e){ea(t,e),ea(t+"Capture",e)}function ea(t,e){for(xr[t]=e,t=0;t<e.length;t++)br.add(e[t])}var D0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Sr={},wr={};function O0(t){return ru.call(wr,t)?!0:ru.call(Sr,t)?!1:D0.test(t)?wr[t]=!0:(Sr[t]=!0,!1)}function ql(t,e,n){if(O0(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Gl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function ke(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ve(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Er(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function j0(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function yu(t){if(!t._valueTracker){var e=Er(t)?"checked":"value";t._valueTracker=j0(t,e,""+t[e])}}function Tr(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=Er(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Yl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var B0=/[\n"\\]/g;function be(t){return t.replace(B0,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function vu(t,e,n,a,l,i,u,r){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ve(e)):t.value!==""+ve(e)&&(t.value=""+ve(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?bu(t,u,ve(e)):n!=null?bu(t,u,ve(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.name=""+ve(r):t.removeAttribute("name")}function Nr(t,e,n,a,l,i,u,r){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){yu(t);return}n=n!=null?""+ve(n):"",e=e!=null?""+ve(e):n,r||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=r?t.checked:!!a,t.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),yu(t)}function bu(t,e,n){e==="number"&&Yl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function na(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ve(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function Cr(t,e,n){if(e!=null&&(e=""+ve(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ve(n):""}function Ar(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(s(92));if(Lt(a)){if(1<a.length)throw Error(s(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ve(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),yu(t)}function aa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var U0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function _r(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||U0.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Rr(t,e,n){if(e!=null&&typeof e!="object")throw Error(s(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&_r(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&_r(t,i,e[i])}function xu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var k0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),H0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ql(t){return H0.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function He(){}var Su=null;function wu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var la=null,ia=null;function Mr(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[ee]||null;t:switch(t=e.stateNode,e.type){case"input":if(vu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[ee]||null;if(!l)throw Error(s(90));vu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&Tr(a)}break t;case"textarea":Cr(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&na(t,!!n.multiple,e,!1)}}}var Eu=!1;function zr(t,e,n){if(Eu)return t(e,n);Eu=!0;try{var a=t(e);return a}finally{if(Eu=!1,(la!==null||ia!==null)&&(Mi(),la&&(e=la,t=ia,ia=la=null,Mr(e),t)))for(e=0;e<t.length;e++)Mr(t[e])}}function Ga(t,e){var n=t.stateNode;if(n===null)return null;var a=n[ee]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(s(231,e,typeof n));return n}var Le=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Tu=!1;if(Le)try{var Ya={};Object.defineProperty(Ya,"passive",{get:function(){Tu=!0}}),window.addEventListener("test",Ya,Ya),window.removeEventListener("test",Ya,Ya)}catch{Tu=!1}var ln=null,Nu=null,Vl=null;function Dr(){if(Vl)return Vl;var t,e=Nu,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var u=n-t;for(a=1;a<=u&&e[n-a]===l[i-a];a++);return Vl=l.slice(t,1<a?1-a:void 0)}function Xl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Zl(){return!0}function Or(){return!1}function ne(t){function e(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var r in t)t.hasOwnProperty(r)&&(n=t[r],this[r]=n?n(i):i[r]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Zl:Or,this.isPropagationStopped=Or,this}return E(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Zl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Zl)},persist:function(){},isPersistent:Zl}),e}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Kl=ne(Dn),Qa=E({},Dn,{view:0,detail:0}),L0=ne(Qa),Cu,Au,Va,Jl=E({},Qa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ru,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Va&&(Va&&t.type==="mousemove"?(Cu=t.screenX-Va.screenX,Au=t.screenY-Va.screenY):Au=Cu=0,Va=t),Cu)},movementY:function(t){return"movementY"in t?t.movementY:Au}}),jr=ne(Jl),q0=E({},Jl,{dataTransfer:0}),G0=ne(q0),Y0=E({},Qa,{relatedTarget:0}),_u=ne(Y0),Q0=E({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),V0=ne(Q0),X0=E({},Dn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Z0=ne(X0),K0=E({},Dn,{data:0}),Br=ne(K0),J0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},F0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},I0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function W0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=I0[t])?!!e[t]:!1}function Ru(){return W0}var $0=E({},Qa,{key:function(t){if(t.key){var e=J0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Xl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?F0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ru,charCode:function(t){return t.type==="keypress"?Xl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Xl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),P0=ne($0),tm=E({},Jl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ur=ne(tm),em=E({},Qa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ru}),nm=ne(em),am=E({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),lm=ne(am),im=E({},Jl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),um=ne(im),sm=E({},Dn,{newState:0,oldState:0}),cm=ne(sm),rm=[9,13,27,32],Mu=Le&&"CompositionEvent"in window,Xa=null;Le&&"documentMode"in document&&(Xa=document.documentMode);var om=Le&&"TextEvent"in window&&!Xa,kr=Le&&(!Mu||Xa&&8<Xa&&11>=Xa),Hr=" ",Lr=!1;function qr(t,e){switch(t){case"keyup":return rm.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Gr(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ua=!1;function fm(t,e){switch(t){case"compositionend":return Gr(e);case"keypress":return e.which!==32?null:(Lr=!0,Hr);case"textInput":return t=e.data,t===Hr&&Lr?null:t;default:return null}}function dm(t,e){if(ua)return t==="compositionend"||!Mu&&qr(t,e)?(t=Dr(),Vl=Nu=ln=null,ua=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return kr&&e.locale!=="ko"?null:e.data;default:return null}}var hm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yr(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!hm[t.type]:e==="textarea"}function Qr(t,e,n,a){la?ia?ia.push(a):ia=[a]:la=a,e=ki(e,"onChange"),0<e.length&&(n=new Kl("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Za=null,Ka=null;function mm(t){Ad(t,0)}function Fl(t){var e=qa(t);if(Tr(e))return t}function Vr(t,e){if(t==="change")return e}var Xr=!1;if(Le){var zu;if(Le){var Du="oninput"in document;if(!Du){var Zr=document.createElement("div");Zr.setAttribute("oninput","return;"),Du=typeof Zr.oninput=="function"}zu=Du}else zu=!1;Xr=zu&&(!document.documentMode||9<document.documentMode)}function Kr(){Za&&(Za.detachEvent("onpropertychange",Jr),Ka=Za=null)}function Jr(t){if(t.propertyName==="value"&&Fl(Ka)){var e=[];Qr(e,Ka,t,wu(t)),zr(mm,e)}}function gm(t,e,n){t==="focusin"?(Kr(),Za=e,Ka=n,Za.attachEvent("onpropertychange",Jr)):t==="focusout"&&Kr()}function pm(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Fl(Ka)}function ym(t,e){if(t==="click")return Fl(e)}function vm(t,e){if(t==="input"||t==="change")return Fl(e)}function bm(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var fe=typeof Object.is=="function"?Object.is:bm;function Ja(t,e){if(fe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!ru.call(e,l)||!fe(t[l],e[l]))return!1}return!0}function Fr(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ir(t,e){var n=Fr(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Fr(n)}}function Wr(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Wr(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function $r(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Yl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Yl(t.document)}return e}function Ou(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var xm=Le&&"documentMode"in document&&11>=document.documentMode,sa=null,ju=null,Fa=null,Bu=!1;function Pr(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Bu||sa==null||sa!==Yl(a)||(a=sa,"selectionStart"in a&&Ou(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Fa&&Ja(Fa,a)||(Fa=a,a=ki(ju,"onSelect"),0<a.length&&(e=new Kl("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=sa)))}function On(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ca={animationend:On("Animation","AnimationEnd"),animationiteration:On("Animation","AnimationIteration"),animationstart:On("Animation","AnimationStart"),transitionrun:On("Transition","TransitionRun"),transitionstart:On("Transition","TransitionStart"),transitioncancel:On("Transition","TransitionCancel"),transitionend:On("Transition","TransitionEnd")},Uu={},to={};Le&&(to=document.createElement("div").style,"AnimationEvent"in window||(delete ca.animationend.animation,delete ca.animationiteration.animation,delete ca.animationstart.animation),"TransitionEvent"in window||delete ca.transitionend.transition);function jn(t){if(Uu[t])return Uu[t];if(!ca[t])return t;var e=ca[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in to)return Uu[t]=e[n];return t}var eo=jn("animationend"),no=jn("animationiteration"),ao=jn("animationstart"),Sm=jn("transitionrun"),wm=jn("transitionstart"),Em=jn("transitioncancel"),lo=jn("transitionend"),io=new Map,ku="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ku.push("scrollEnd");function _e(t,e){io.set(t,e),zn(e,[t])}var Il=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},xe=[],ra=0,Hu=0;function Wl(){for(var t=ra,e=Hu=ra=0;e<t;){var n=xe[e];xe[e++]=null;var a=xe[e];xe[e++]=null;var l=xe[e];xe[e++]=null;var i=xe[e];if(xe[e++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&uo(n,l,i)}}function $l(t,e,n,a){xe[ra++]=t,xe[ra++]=e,xe[ra++]=n,xe[ra++]=a,Hu|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Lu(t,e,n,a){return $l(t,e,n,a),Pl(t)}function Bn(t,e){return $l(t,null,null,e),Pl(t)}function uo(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-oe(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function Pl(t){if(50<yl)throw yl=0,Js=null,Error(s(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var oa={};function Tm(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function de(t,e,n,a){return new Tm(t,e,n,a)}function qu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function qe(t,e){var n=t.alternate;return n===null?(n=de(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function so(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ti(t,e,n,a,l,i){var u=0;if(a=t,typeof t=="function")qu(t)&&(u=1);else if(typeof t=="string")u=Rg(t,n,W.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case F:return t=de(31,n,e,l),t.elementType=F,t.lanes=i,t;case Y:return Un(n.children,l,i,e);case Q:u=8,l|=24;break;case G:return t=de(12,n,e,l|2),t.elementType=G,t.lanes=i,t;case X:return t=de(13,n,e,l),t.elementType=X,t.lanes=i,t;case L:return t=de(19,n,e,l),t.elementType=L,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case H:u=10;break t;case V:u=9;break t;case T:u=11;break t;case U:u=14;break t;case J:u=16,a=null;break t}u=29,n=Error(s(130,t===null?"null":typeof t,"")),a=null}return e=de(u,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function Un(t,e,n,a){return t=de(7,t,a,e),t.lanes=n,t}function Gu(t,e,n){return t=de(6,t,null,e),t.lanes=n,t}function co(t){var e=de(18,null,null,0);return e.stateNode=t,e}function Yu(t,e,n){return e=de(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var ro=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=ro.get(t);return n!==void 0?n:(e={value:t,source:e,stack:cr(e)},ro.set(t,e),e)}return{value:t,source:e,stack:cr(e)}}var fa=[],da=0,ei=null,Ia=0,we=[],Ee=0,un=null,ze=1,De="";function Ge(t,e){fa[da++]=Ia,fa[da++]=ei,ei=t,Ia=e}function oo(t,e,n){we[Ee++]=ze,we[Ee++]=De,we[Ee++]=un,un=t;var a=ze;t=De;var l=32-oe(a)-1;a&=~(1<<l),n+=1;var i=32-oe(e)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,ze=1<<32-oe(e)+l|n<<l|a,De=i+t}else ze=1<<i|n<<l|a,De=t}function Qu(t){t.return!==null&&(Ge(t,1),oo(t,1,0))}function Vu(t){for(;t===ei;)ei=fa[--da],fa[da]=null,Ia=fa[--da],fa[da]=null;for(;t===un;)un=we[--Ee],we[Ee]=null,De=we[--Ee],we[Ee]=null,ze=we[--Ee],we[Ee]=null}function fo(t,e){we[Ee++]=ze,we[Ee++]=De,we[Ee++]=un,ze=e.id,De=e.overflow,un=t}var Jt=null,Dt=null,vt=!1,sn=null,Te=!1,Xu=Error(s(519));function cn(t){var e=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Wa(Se(e,t)),Xu}function ho(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[Kt]=t,e[ee]=a,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<bl.length;n++)mt(bl[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),Nr(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),Ar(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||zd(e.textContent,n)?(a.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),a.onScroll!=null&&mt("scroll",e),a.onScrollEnd!=null&&mt("scrollend",e),a.onClick!=null&&(e.onclick=He),e=!0):e=!1,e||cn(t,!0)}function mo(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:Te=!1;return;case 27:case 3:Te=!0;return;default:Jt=Jt.return}}function ha(t){if(t!==Jt)return!1;if(!vt)return mo(t),vt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||rc(t.type,t.memoizedProps)),n=!n),n&&Dt&&cn(t),mo(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Dt=qd(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Dt=qd(t)}else e===27?(e=Dt,wn(t.type)?(t=mc,mc=null,Dt=t):Dt=e):Dt=Jt?Ce(t.stateNode.nextSibling):null;return!0}function kn(){Dt=Jt=null,vt=!1}function Zu(){var t=sn;return t!==null&&(ue===null?ue=t:ue.push.apply(ue,t),sn=null),t}function Wa(t){sn===null?sn=[t]:sn.push(t)}var Ku=x(null),Hn=null,Ye=null;function rn(t,e,n){Z(Ku,e._currentValue),e._currentValue=n}function Qe(t){t._currentValue=Ku.current,j(Ku)}function Ju(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Fu(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;t:for(;i!==null;){var r=i;i=l;for(var p=0;p<e.length;p++)if(r.context===e[p]){i.lanes|=n,r=i.alternate,r!==null&&(r.lanes|=n),Ju(i.return,n,t),a||(u=null);break t}i=r.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(s(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Ju(u,n,t),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===t){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function ma(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(s(387));if(u=u.memoizedProps,u!==null){var r=l.type;fe(l.pendingProps.value,u.value)||(t!==null?t.push(r):t=[r])}}else if(l===dt.current){if(u=l.alternate,u===null)throw Error(s(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Tl):t=[Tl])}l=l.return}t!==null&&Fu(e,t,n,a),e.flags|=262144}function ni(t){for(t=t.firstContext;t!==null;){if(!fe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ln(t){Hn=t,Ye=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ft(t){return go(Hn,t)}function ai(t,e){return Hn===null&&Ln(t),go(t,e)}function go(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ye===null){if(t===null)throw Error(s(308));Ye=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ye=Ye.next=e;return n}var Nm=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Cm=c.unstable_scheduleCallback,Am=c.unstable_NormalPriority,qt={$$typeof:H,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Iu(){return{controller:new Nm,data:new Map,refCount:0}}function $a(t){t.refCount--,t.refCount===0&&Cm(Am,function(){t.controller.abort()})}var Pa=null,Wu=0,ga=0,pa=null;function _m(t,e){if(Pa===null){var n=Pa=[];Wu=0,ga=tc(),pa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Wu++,e.then(po,po),e}function po(){if(--Wu===0&&Pa!==null){pa!==null&&(pa.status="fulfilled");var t=Pa;Pa=null,ga=0,pa=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Rm(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var yo=R.S;R.S=function(t,e){ed=ce(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&_m(t,e),yo!==null&&yo(t,e)};var qn=x(null);function $u(){var t=qn.current;return t!==null?t:Mt.pooledCache}function li(t,e){e===null?Z(qn,qn.current):Z(qn,e.pool)}function vo(){var t=$u();return t===null?null:{parent:qt._currentValue,pool:t}}var ya=Error(s(460)),Pu=Error(s(474)),ii=Error(s(542)),ui={then:function(){}};function bo(t){return t=t.status,t==="fulfilled"||t==="rejected"}function xo(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(He,He),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,wo(t),t;default:if(typeof e.status=="string")e.then(He,He);else{if(t=Mt,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,wo(t),t}throw Yn=e,ya}}function Gn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Yn=n,ya):n}}var Yn=null;function So(){if(Yn===null)throw Error(s(459));var t=Yn;return Yn=null,t}function wo(t){if(t===ya||t===ii)throw Error(s(483))}var va=null,tl=0;function si(t){var e=tl;return tl+=1,va===null&&(va=[]),xo(va,t,e)}function el(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ci(t,e){throw e.$$typeof===z?Error(s(525)):(t=Object.prototype.toString.call(e),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Eo(t){function e(S,v){if(t){var N=S.deletions;N===null?(S.deletions=[v],S.flags|=16):N.push(v)}}function n(S,v){if(!t)return null;for(;v!==null;)e(S,v),v=v.sibling;return null}function a(S){for(var v=new Map;S!==null;)S.key!==null?v.set(S.key,S):v.set(S.index,S),S=S.sibling;return v}function l(S,v){return S=qe(S,v),S.index=0,S.sibling=null,S}function i(S,v,N){return S.index=N,t?(N=S.alternate,N!==null?(N=N.index,N<v?(S.flags|=67108866,v):N):(S.flags|=67108866,v)):(S.flags|=1048576,v)}function u(S){return t&&S.alternate===null&&(S.flags|=67108866),S}function r(S,v,N,D){return v===null||v.tag!==6?(v=Gu(N,S.mode,D),v.return=S,v):(v=l(v,N),v.return=S,v)}function p(S,v,N,D){var nt=N.type;return nt===Y?M(S,v,N.props.children,D,N.key):v!==null&&(v.elementType===nt||typeof nt=="object"&&nt!==null&&nt.$$typeof===J&&Gn(nt)===v.type)?(v=l(v,N.props),el(v,N),v.return=S,v):(v=ti(N.type,N.key,N.props,null,S.mode,D),el(v,N),v.return=S,v)}function C(S,v,N,D){return v===null||v.tag!==4||v.stateNode.containerInfo!==N.containerInfo||v.stateNode.implementation!==N.implementation?(v=Yu(N,S.mode,D),v.return=S,v):(v=l(v,N.children||[]),v.return=S,v)}function M(S,v,N,D,nt){return v===null||v.tag!==7?(v=Un(N,S.mode,D,nt),v.return=S,v):(v=l(v,N),v.return=S,v)}function O(S,v,N){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Gu(""+v,S.mode,N),v.return=S,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case k:return N=ti(v.type,v.key,v.props,null,S.mode,N),el(N,v),N.return=S,N;case q:return v=Yu(v,S.mode,N),v.return=S,v;case J:return v=Gn(v),O(S,v,N)}if(Lt(v)||$(v))return v=Un(v,S.mode,N,null),v.return=S,v;if(typeof v.then=="function")return O(S,si(v),N);if(v.$$typeof===H)return O(S,ai(S,v),N);ci(S,v)}return null}function A(S,v,N,D){var nt=v!==null?v.key:null;if(typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint")return nt!==null?null:r(S,v,""+N,D);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case k:return N.key===nt?p(S,v,N,D):null;case q:return N.key===nt?C(S,v,N,D):null;case J:return N=Gn(N),A(S,v,N,D)}if(Lt(N)||$(N))return nt!==null?null:M(S,v,N,D,null);if(typeof N.then=="function")return A(S,v,si(N),D);if(N.$$typeof===H)return A(S,v,ai(S,N),D);ci(S,N)}return null}function _(S,v,N,D,nt){if(typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint")return S=S.get(N)||null,r(v,S,""+D,nt);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case k:return S=S.get(D.key===null?N:D.key)||null,p(v,S,D,nt);case q:return S=S.get(D.key===null?N:D.key)||null,C(v,S,D,nt);case J:return D=Gn(D),_(S,v,N,D,nt)}if(Lt(D)||$(D))return S=S.get(N)||null,M(v,S,D,nt,null);if(typeof D.then=="function")return _(S,v,N,si(D),nt);if(D.$$typeof===H)return _(S,v,N,ai(v,D),nt);ci(v,D)}return null}function I(S,v,N,D){for(var nt=null,bt=null,P=v,ot=v=0,pt=null;P!==null&&ot<N.length;ot++){P.index>ot?(pt=P,P=null):pt=P.sibling;var xt=A(S,P,N[ot],D);if(xt===null){P===null&&(P=pt);break}t&&P&&xt.alternate===null&&e(S,P),v=i(xt,v,ot),bt===null?nt=xt:bt.sibling=xt,bt=xt,P=pt}if(ot===N.length)return n(S,P),vt&&Ge(S,ot),nt;if(P===null){for(;ot<N.length;ot++)P=O(S,N[ot],D),P!==null&&(v=i(P,v,ot),bt===null?nt=P:bt.sibling=P,bt=P);return vt&&Ge(S,ot),nt}for(P=a(P);ot<N.length;ot++)pt=_(P,S,ot,N[ot],D),pt!==null&&(t&&pt.alternate!==null&&P.delete(pt.key===null?ot:pt.key),v=i(pt,v,ot),bt===null?nt=pt:bt.sibling=pt,bt=pt);return t&&P.forEach(function(An){return e(S,An)}),vt&&Ge(S,ot),nt}function it(S,v,N,D){if(N==null)throw Error(s(151));for(var nt=null,bt=null,P=v,ot=v=0,pt=null,xt=N.next();P!==null&&!xt.done;ot++,xt=N.next()){P.index>ot?(pt=P,P=null):pt=P.sibling;var An=A(S,P,xt.value,D);if(An===null){P===null&&(P=pt);break}t&&P&&An.alternate===null&&e(S,P),v=i(An,v,ot),bt===null?nt=An:bt.sibling=An,bt=An,P=pt}if(xt.done)return n(S,P),vt&&Ge(S,ot),nt;if(P===null){for(;!xt.done;ot++,xt=N.next())xt=O(S,xt.value,D),xt!==null&&(v=i(xt,v,ot),bt===null?nt=xt:bt.sibling=xt,bt=xt);return vt&&Ge(S,ot),nt}for(P=a(P);!xt.done;ot++,xt=N.next())xt=_(P,S,ot,xt.value,D),xt!==null&&(t&&xt.alternate!==null&&P.delete(xt.key===null?ot:xt.key),v=i(xt,v,ot),bt===null?nt=xt:bt.sibling=xt,bt=xt);return t&&P.forEach(function(qg){return e(S,qg)}),vt&&Ge(S,ot),nt}function Rt(S,v,N,D){if(typeof N=="object"&&N!==null&&N.type===Y&&N.key===null&&(N=N.props.children),typeof N=="object"&&N!==null){switch(N.$$typeof){case k:t:{for(var nt=N.key;v!==null;){if(v.key===nt){if(nt=N.type,nt===Y){if(v.tag===7){n(S,v.sibling),D=l(v,N.props.children),D.return=S,S=D;break t}}else if(v.elementType===nt||typeof nt=="object"&&nt!==null&&nt.$$typeof===J&&Gn(nt)===v.type){n(S,v.sibling),D=l(v,N.props),el(D,N),D.return=S,S=D;break t}n(S,v);break}else e(S,v);v=v.sibling}N.type===Y?(D=Un(N.props.children,S.mode,D,N.key),D.return=S,S=D):(D=ti(N.type,N.key,N.props,null,S.mode,D),el(D,N),D.return=S,S=D)}return u(S);case q:t:{for(nt=N.key;v!==null;){if(v.key===nt)if(v.tag===4&&v.stateNode.containerInfo===N.containerInfo&&v.stateNode.implementation===N.implementation){n(S,v.sibling),D=l(v,N.children||[]),D.return=S,S=D;break t}else{n(S,v);break}else e(S,v);v=v.sibling}D=Yu(N,S.mode,D),D.return=S,S=D}return u(S);case J:return N=Gn(N),Rt(S,v,N,D)}if(Lt(N))return I(S,v,N,D);if($(N)){if(nt=$(N),typeof nt!="function")throw Error(s(150));return N=nt.call(N),it(S,v,N,D)}if(typeof N.then=="function")return Rt(S,v,si(N),D);if(N.$$typeof===H)return Rt(S,v,ai(S,N),D);ci(S,N)}return typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint"?(N=""+N,v!==null&&v.tag===6?(n(S,v.sibling),D=l(v,N),D.return=S,S=D):(n(S,v),D=Gu(N,S.mode,D),D.return=S,S=D),u(S)):n(S,v)}return function(S,v,N,D){try{tl=0;var nt=Rt(S,v,N,D);return va=null,nt}catch(P){if(P===ya||P===ii)throw P;var bt=de(29,P,null,S.mode);return bt.lanes=D,bt.return=S,bt}finally{}}}var Qn=Eo(!0),To=Eo(!1),on=!1;function ts(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function es(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(wt&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=Pl(t),uo(t,null,n),e}return $l(t,a,e,n),Pl(t)}function nl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,mr(t,n)}}function ns(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var as=!1;function al(){if(as){var t=pa;if(t!==null)throw t}}function ll(t,e,n,a){as=!1;var l=t.updateQueue;on=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,r=l.shared.pending;if(r!==null){l.shared.pending=null;var p=r,C=p.next;p.next=null,u===null?i=C:u.next=C,u=p;var M=t.alternate;M!==null&&(M=M.updateQueue,r=M.lastBaseUpdate,r!==u&&(r===null?M.firstBaseUpdate=C:r.next=C,M.lastBaseUpdate=p))}if(i!==null){var O=l.baseState;u=0,M=C=p=null,r=i;do{var A=r.lane&-536870913,_=A!==r.lane;if(_?(gt&A)===A:(a&A)===A){A!==0&&A===ga&&(as=!0),M!==null&&(M=M.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});t:{var I=t,it=r;A=e;var Rt=n;switch(it.tag){case 1:if(I=it.payload,typeof I=="function"){O=I.call(Rt,O,A);break t}O=I;break t;case 3:I.flags=I.flags&-65537|128;case 0:if(I=it.payload,A=typeof I=="function"?I.call(Rt,O,A):I,A==null)break t;O=E({},O,A);break t;case 2:on=!0}}A=r.callback,A!==null&&(t.flags|=64,_&&(t.flags|=8192),_=l.callbacks,_===null?l.callbacks=[A]:_.push(A))}else _={lane:A,tag:r.tag,payload:r.payload,callback:r.callback,next:null},M===null?(C=M=_,p=O):M=M.next=_,u|=A;if(r=r.next,r===null){if(r=l.shared.pending,r===null)break;_=r,r=_.next,_.next=null,l.lastBaseUpdate=_,l.shared.pending=null}}while(!0);M===null&&(p=O),l.baseState=p,l.firstBaseUpdate=C,l.lastBaseUpdate=M,i===null&&(l.shared.lanes=0),yn|=u,t.lanes=u,t.memoizedState=O}}function No(t,e){if(typeof t!="function")throw Error(s(191,t));t.call(e)}function Co(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)No(n[t],e)}var ba=x(null),ri=x(0);function Ao(t,e){t=$e,Z(ri,t),Z(ba,e),$e=t|e.baseLanes}function ls(){Z(ri,$e),Z(ba,ba.current)}function is(){$e=ri.current,j(ba),j(ri)}var he=x(null),Ne=null;function hn(t){var e=t.alternate;Z(kt,kt.current&1),Z(he,t),Ne===null&&(e===null||ba.current!==null||e.memoizedState!==null)&&(Ne=t)}function us(t){Z(kt,kt.current),Z(he,t),Ne===null&&(Ne=t)}function _o(t){t.tag===22?(Z(kt,kt.current),Z(he,t),Ne===null&&(Ne=t)):mn()}function mn(){Z(kt,kt.current),Z(he,he.current)}function me(t){j(he),Ne===t&&(Ne=null),j(kt)}var kt=x(0);function oi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||dc(n)||hc(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ve=0,rt=null,At=null,Gt=null,fi=!1,xa=!1,Vn=!1,di=0,il=0,Sa=null,Mm=0;function Bt(){throw Error(s(321))}function ss(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!fe(t[n],e[n]))return!1;return!0}function cs(t,e,n,a,l,i){return Ve=i,rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,R.H=t===null||t.memoizedState===null?df:Es,Vn=!1,i=n(a,l),Vn=!1,xa&&(i=Mo(e,n,a,l)),Ro(t),i}function Ro(t){R.H=cl;var e=At!==null&&At.next!==null;if(Ve=0,Gt=At=rt=null,fi=!1,il=0,Sa=null,e)throw Error(s(300));t===null||Yt||(t=t.dependencies,t!==null&&ni(t)&&(Yt=!0))}function Mo(t,e,n,a){rt=t;var l=0;do{if(xa&&(Sa=null),il=0,xa=!1,25<=l)throw Error(s(301));if(l+=1,Gt=At=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}R.H=hf,i=e(n,a)}while(xa);return i}function zm(){var t=R.H,e=t.useState()[0];return e=typeof e.then=="function"?ul(e):e,t=t.useState()[0],(At!==null?At.memoizedState:null)!==t&&(rt.flags|=1024),e}function rs(){var t=di!==0;return di=0,t}function os(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function fs(t){if(fi){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}fi=!1}Ve=0,Gt=At=rt=null,xa=!1,il=di=0,Sa=null}function te(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Gt===null?rt.memoizedState=Gt=t:Gt=Gt.next=t,Gt}function Ht(){if(At===null){var t=rt.alternate;t=t!==null?t.memoizedState:null}else t=At.next;var e=Gt===null?rt.memoizedState:Gt.next;if(e!==null)Gt=e,At=t;else{if(t===null)throw rt.alternate===null?Error(s(467)):Error(s(310));At=t,t={memoizedState:At.memoizedState,baseState:At.baseState,baseQueue:At.baseQueue,queue:At.queue,next:null},Gt===null?rt.memoizedState=Gt=t:Gt=Gt.next=t}return Gt}function hi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ul(t){var e=il;return il+=1,Sa===null&&(Sa=[]),t=xo(Sa,t,e),e=rt,(Gt===null?e.memoizedState:Gt.next)===null&&(e=e.alternate,R.H=e===null||e.memoizedState===null?df:Es),t}function mi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ul(t);if(t.$$typeof===H)return Ft(t)}throw Error(s(438,String(t)))}function ds(t){var e=null,n=rt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=rt.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=hi(),rt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=at;return e.index++,n}function Xe(t,e){return typeof e=="function"?e(t):e}function gi(t){var e=Ht();return hs(e,At,t)}function hs(t,e,n){var a=t.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var r=u=null,p=null,C=e,M=!1;do{var O=C.lane&-536870913;if(O!==C.lane?(gt&O)===O:(Ve&O)===O){var A=C.revertLane;if(A===0)p!==null&&(p=p.next={lane:0,revertLane:0,gesture:null,action:C.action,hasEagerState:C.hasEagerState,eagerState:C.eagerState,next:null}),O===ga&&(M=!0);else if((Ve&A)===A){C=C.next,A===ga&&(M=!0);continue}else O={lane:0,revertLane:C.revertLane,gesture:null,action:C.action,hasEagerState:C.hasEagerState,eagerState:C.eagerState,next:null},p===null?(r=p=O,u=i):p=p.next=O,rt.lanes|=A,yn|=A;O=C.action,Vn&&n(i,O),i=C.hasEagerState?C.eagerState:n(i,O)}else A={lane:O,revertLane:C.revertLane,gesture:C.gesture,action:C.action,hasEagerState:C.hasEagerState,eagerState:C.eagerState,next:null},p===null?(r=p=A,u=i):p=p.next=A,rt.lanes|=O,yn|=O;C=C.next}while(C!==null&&C!==e);if(p===null?u=i:p.next=r,!fe(i,t.memoizedState)&&(Yt=!0,M&&(n=pa,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=p,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function ms(t){var e=Ht(),n=e.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=t(i,u.action),u=u.next;while(u!==l);fe(i,e.memoizedState)||(Yt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function zo(t,e,n){var a=rt,l=Ht(),i=vt;if(i){if(n===void 0)throw Error(s(407));n=n()}else n=e();var u=!fe((At||l).memoizedState,n);if(u&&(l.memoizedState=n,Yt=!0),l=l.queue,ys(jo.bind(null,a,l,t),[t]),l.getSnapshot!==e||u||Gt!==null&&Gt.memoizedState.tag&1){if(a.flags|=2048,wa(9,{destroy:void 0},Oo.bind(null,a,l,n,e),null),Mt===null)throw Error(s(349));i||(Ve&127)!==0||Do(a,e,n)}return n}function Do(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=rt.updateQueue,e===null?(e=hi(),rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Oo(t,e,n,a){e.value=n,e.getSnapshot=a,Bo(e)&&Uo(t)}function jo(t,e,n){return n(function(){Bo(e)&&Uo(t)})}function Bo(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!fe(t,n)}catch{return!0}}function Uo(t){var e=Bn(t,2);e!==null&&se(e,t,2)}function gs(t){var e=te();if(typeof t=="function"){var n=t;if(t=n(),Vn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xe,lastRenderedState:t},e}function ko(t,e,n,a){return t.baseState=n,hs(t,At,typeof a=="function"?a:Xe)}function Dm(t,e,n,a,l){if(vi(t))throw Error(s(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};R.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,Ho(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Ho(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=R.T,u={};R.T=u;try{var r=n(l,a),p=R.S;p!==null&&p(u,r),Lo(t,e,r)}catch(C){ps(t,e,C)}finally{i!==null&&u.types!==null&&(i.types=u.types),R.T=i}}else try{i=n(l,a),Lo(t,e,i)}catch(C){ps(t,e,C)}}function Lo(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){qo(t,e,a)},function(a){return ps(t,e,a)}):qo(t,e,n)}function qo(t,e,n){e.status="fulfilled",e.value=n,Go(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Ho(t,n)))}function ps(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,Go(e),e=e.next;while(e!==a)}t.action=null}function Go(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Yo(t,e){return e}function Qo(t,e){if(vt){var n=Mt.formState;if(n!==null){t:{var a=rt;if(vt){if(Dt){e:{for(var l=Dt,i=Te;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ce(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){Dt=Ce(l.nextSibling),a=l.data==="F!";break t}}cn(a)}a=!1}a&&(e=n[0])}}return n=te(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yo,lastRenderedState:e},n.queue=a,n=rf.bind(null,rt,a),a.dispatch=n,a=gs(!1),i=ws.bind(null,rt,!1,a.queue),a=te(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=Dm.bind(null,rt,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Vo(t){var e=Ht();return Xo(e,At,t)}function Xo(t,e,n){if(e=hs(t,e,Yo)[0],t=gi(Xe)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=ul(e)}catch(u){throw u===ya?ii:u}else a=e;e=Ht();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(rt.flags|=2048,wa(9,{destroy:void 0},Om.bind(null,l,n),null)),[a,i,t]}function Om(t,e){t.action=e}function Zo(t){var e=Ht(),n=At;if(n!==null)return Xo(e,n,t);Ht(),e=e.memoizedState,n=Ht();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function wa(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=rt.updateQueue,e===null&&(e=hi(),rt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Ko(){return Ht().memoizedState}function pi(t,e,n,a){var l=te();rt.flags|=t,l.memoizedState=wa(1|e,{destroy:void 0},n,a===void 0?null:a)}function yi(t,e,n,a){var l=Ht();a=a===void 0?null:a;var i=l.memoizedState.inst;At!==null&&a!==null&&ss(a,At.memoizedState.deps)?l.memoizedState=wa(e,i,n,a):(rt.flags|=t,l.memoizedState=wa(1|e,i,n,a))}function Jo(t,e){pi(8390656,8,t,e)}function ys(t,e){yi(2048,8,t,e)}function jm(t){rt.flags|=4;var e=rt.updateQueue;if(e===null)e=hi(),rt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Fo(t){var e=Ht().memoizedState;return jm({ref:e,nextImpl:t}),function(){if((wt&2)!==0)throw Error(s(440));return e.impl.apply(void 0,arguments)}}function Io(t,e){return yi(4,2,t,e)}function Wo(t,e){return yi(4,4,t,e)}function $o(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Po(t,e,n){n=n!=null?n.concat([t]):null,yi(4,4,$o.bind(null,e,t),n)}function vs(){}function tf(t,e){var n=Ht();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&ss(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function ef(t,e){var n=Ht();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&ss(e,a[1]))return a[0];if(a=t(),Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function bs(t,e,n){return n===void 0||(Ve&1073741824)!==0&&(gt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=ad(),rt.lanes|=t,yn|=t,n)}function nf(t,e,n,a){return fe(n,e)?n:ba.current!==null?(t=bs(t,n,a),fe(t,e)||(Yt=!0),t):(Ve&42)===0||(Ve&1073741824)!==0&&(gt&261930)===0?(Yt=!0,t.memoizedState=n):(t=ad(),rt.lanes|=t,yn|=t,e)}function af(t,e,n,a,l){var i=K.p;K.p=i!==0&&8>i?i:8;var u=R.T,r={};R.T=r,ws(t,!1,e,n);try{var p=l(),C=R.S;if(C!==null&&C(r,p),p!==null&&typeof p=="object"&&typeof p.then=="function"){var M=Rm(p,a);sl(t,e,M,ye(t))}else sl(t,e,a,ye(t))}catch(O){sl(t,e,{then:function(){},status:"rejected",reason:O},ye())}finally{K.p=i,u!==null&&r.types!==null&&(u.types=r.types),R.T=u}}function Bm(){}function xs(t,e,n,a){if(t.tag!==5)throw Error(s(476));var l=lf(t).queue;af(t,l,e,lt,n===null?Bm:function(){return uf(t),n(a)})}function lf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:lt,baseState:lt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xe,lastRenderedState:lt},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xe,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function uf(t){var e=lf(t);e.next===null&&(e=t.alternate.memoizedState),sl(t,e.next.queue,{},ye())}function Ss(){return Ft(Tl)}function sf(){return Ht().memoizedState}function cf(){return Ht().memoizedState}function Um(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var a=dn(e,t,n);a!==null&&(se(a,e,n),nl(a,e,n)),e={cache:Iu()},t.payload=e;return}e=e.return}}function km(t,e,n){var a=ye();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},vi(t)?of(e,n):(n=Lu(t,e,n,a),n!==null&&(se(n,t,a),ff(n,e,a)))}function rf(t,e,n){var a=ye();sl(t,e,n,a)}function sl(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(vi(t))of(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,r=i(u,n);if(l.hasEagerState=!0,l.eagerState=r,fe(r,u))return $l(t,e,l,0),Mt===null&&Wl(),!1}catch{}finally{}if(n=Lu(t,e,l,a),n!==null)return se(n,t,a),ff(n,e,a),!0}return!1}function ws(t,e,n,a){if(a={lane:2,revertLane:tc(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},vi(t)){if(e)throw Error(s(479))}else e=Lu(t,n,a,2),e!==null&&se(e,t,2)}function vi(t){var e=t.alternate;return t===rt||e!==null&&e===rt}function of(t,e){xa=fi=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function ff(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,mr(t,n)}}var cl={readContext:Ft,use:mi,useCallback:Bt,useContext:Bt,useEffect:Bt,useImperativeHandle:Bt,useLayoutEffect:Bt,useInsertionEffect:Bt,useMemo:Bt,useReducer:Bt,useRef:Bt,useState:Bt,useDebugValue:Bt,useDeferredValue:Bt,useTransition:Bt,useSyncExternalStore:Bt,useId:Bt,useHostTransitionStatus:Bt,useFormState:Bt,useActionState:Bt,useOptimistic:Bt,useMemoCache:Bt,useCacheRefresh:Bt};cl.useEffectEvent=Bt;var df={readContext:Ft,use:mi,useCallback:function(t,e){return te().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:Jo,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,pi(4194308,4,$o.bind(null,e,t),n)},useLayoutEffect:function(t,e){return pi(4194308,4,t,e)},useInsertionEffect:function(t,e){pi(4,2,t,e)},useMemo:function(t,e){var n=te();e=e===void 0?null:e;var a=t();if(Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=te();if(n!==void 0){var l=n(e);if(Vn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=km.bind(null,rt,t),[a.memoizedState,t]},useRef:function(t){var e=te();return t={current:t},e.memoizedState=t},useState:function(t){t=gs(t);var e=t.queue,n=rf.bind(null,rt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:vs,useDeferredValue:function(t,e){var n=te();return bs(n,t,e)},useTransition:function(){var t=gs(!1);return t=af.bind(null,rt,t.queue,!0,!1),te().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=rt,l=te();if(vt){if(n===void 0)throw Error(s(407));n=n()}else{if(n=e(),Mt===null)throw Error(s(349));(gt&127)!==0||Do(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,Jo(jo.bind(null,a,i,t),[t]),a.flags|=2048,wa(9,{destroy:void 0},Oo.bind(null,a,i,n,e),null),n},useId:function(){var t=te(),e=Mt.identifierPrefix;if(vt){var n=De,a=ze;n=(a&~(1<<32-oe(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=di++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Mm++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Ss,useFormState:Qo,useActionState:Qo,useOptimistic:function(t){var e=te();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=ws.bind(null,rt,!0,n),n.dispatch=e,[t,e]},useMemoCache:ds,useCacheRefresh:function(){return te().memoizedState=Um.bind(null,rt)},useEffectEvent:function(t){var e=te(),n={impl:t};return e.memoizedState=n,function(){if((wt&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Es={readContext:Ft,use:mi,useCallback:tf,useContext:Ft,useEffect:ys,useImperativeHandle:Po,useInsertionEffect:Io,useLayoutEffect:Wo,useMemo:ef,useReducer:gi,useRef:Ko,useState:function(){return gi(Xe)},useDebugValue:vs,useDeferredValue:function(t,e){var n=Ht();return nf(n,At.memoizedState,t,e)},useTransition:function(){var t=gi(Xe)[0],e=Ht().memoizedState;return[typeof t=="boolean"?t:ul(t),e]},useSyncExternalStore:zo,useId:sf,useHostTransitionStatus:Ss,useFormState:Vo,useActionState:Vo,useOptimistic:function(t,e){var n=Ht();return ko(n,At,t,e)},useMemoCache:ds,useCacheRefresh:cf};Es.useEffectEvent=Fo;var hf={readContext:Ft,use:mi,useCallback:tf,useContext:Ft,useEffect:ys,useImperativeHandle:Po,useInsertionEffect:Io,useLayoutEffect:Wo,useMemo:ef,useReducer:ms,useRef:Ko,useState:function(){return ms(Xe)},useDebugValue:vs,useDeferredValue:function(t,e){var n=Ht();return At===null?bs(n,t,e):nf(n,At.memoizedState,t,e)},useTransition:function(){var t=ms(Xe)[0],e=Ht().memoizedState;return[typeof t=="boolean"?t:ul(t),e]},useSyncExternalStore:zo,useId:sf,useHostTransitionStatus:Ss,useFormState:Zo,useActionState:Zo,useOptimistic:function(t,e){var n=Ht();return At!==null?ko(n,At,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:ds,useCacheRefresh:cf};hf.useEffectEvent=Fo;function Ts(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:E({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ns={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(se(e,t,a),nl(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(se(e,t,a),nl(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(se(e,t,n),nl(e,t,n))}};function mf(t,e,n,a,l,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,u):e.prototype&&e.prototype.isPureReactComponent?!Ja(n,a)||!Ja(l,i):!0}function gf(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&Ns.enqueueReplaceState(e,e.state,null)}function Xn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=E({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function pf(t){Il(t)}function yf(t){console.error(t)}function vf(t){Il(t)}function bi(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function bf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Cs(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){bi(t,e)},n}function xf(t){return t=fn(t),t.tag=3,t}function Sf(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){bf(e,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){bf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var r=a.stack;this.componentDidCatch(a.value,{componentStack:r!==null?r:""})})}function Hm(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&ma(e,n,l,!0),n=he.current,n!==null){switch(n.tag){case 31:case 13:return Ne===null?zi():n.alternate===null&&Ut===0&&(Ut=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===ui?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Ws(t,a,l)),!1;case 22:return n.flags|=65536,a===ui?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Ws(t,a,l)),!1}throw Error(s(435,n.tag))}return Ws(t,a,l),zi(),!1}if(vt)return e=he.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Xu&&(t=Error(s(422),{cause:a}),Wa(Se(t,n)))):(a!==Xu&&(e=Error(s(423),{cause:a}),Wa(Se(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=Se(a,n),l=Cs(t.stateNode,a,l),ns(t,l),Ut!==4&&(Ut=2)),!1;var i=Error(s(520),{cause:a});if(i=Se(i,n),pl===null?pl=[i]:pl.push(i),Ut!==4&&(Ut=2),e===null)return!0;a=Se(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=Cs(n.stateNode,a,t),ns(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=xf(l),Sf(l,t,n,a),ns(n,l),!1}n=n.return}while(n!==null);return!1}var As=Error(s(461)),Yt=!1;function It(t,e,n,a){e.child=t===null?To(e,null,n,a):Qn(e,t.child,n,a)}function wf(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var u={};for(var r in a)r!=="ref"&&(u[r]=a[r])}else u=a;return Ln(e),a=cs(t,e,n,u,i,l),r=rs(),t!==null&&!Yt?(os(t,e,l),Ze(t,e,l)):(vt&&r&&Qu(e),e.flags|=1,It(t,e,a,l),e.child)}function Ef(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!qu(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,Tf(t,e,i,a,l)):(t=ti(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Bs(t,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Ja,n(u,a)&&t.ref===e.ref)return Ze(t,e,l)}return e.flags|=1,t=qe(i,a),t.ref=e.ref,t.return=e,e.child=t}function Tf(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if(Ja(i,a)&&t.ref===e.ref)if(Yt=!1,e.pendingProps=a=i,Bs(t,l))(t.flags&131072)!==0&&(Yt=!0);else return e.lanes=t.lanes,Ze(t,e,l)}return _s(t,e,n,a,l)}function Nf(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return Cf(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&li(e,i!==null?i.cachePool:null),i!==null?Ao(e,i):ls(),_o(e);else return a=e.lanes=536870912,Cf(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(li(e,i.cachePool),Ao(e,i),mn(),e.memoizedState=null):(t!==null&&li(e,null),ls(),mn());return It(t,e,l,n),e.child}function rl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Cf(t,e,n,a,l){var i=$u();return i=i===null?null:{parent:qt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&li(e,null),ls(),_o(e),t!==null&&ma(t,e,a,!0),e.childLanes=l,null}function xi(t,e){return e=wi({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Af(t,e,n){return Qn(e,t.child,null,n),t=xi(e,e.pendingProps),t.flags|=2,me(e),e.memoizedState=null,t}function Lm(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(vt){if(a.mode==="hidden")return t=xi(e,a),e.lanes=536870912,rl(null,t);if(us(e),(t=Dt)?(t=Ld(t,Te),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:ze,overflow:De}:null,retryLane:536870912,hydrationErrors:null},n=co(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw cn(e);return e.lanes=536870912,null}return xi(e,a)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(us(e),l)if(e.flags&256)e.flags&=-257,e=Af(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(s(558));else if(Yt||ma(t,e,n,!1),l=(n&t.childLanes)!==0,Yt||l){if(a=Mt,a!==null&&(u=gr(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Bn(t,u),se(a,t,u),As;zi(),e=Af(t,e,n)}else t=i.treeContext,Dt=Ce(u.nextSibling),Jt=e,vt=!0,sn=null,Te=!1,t!==null&&fo(e,t),e=xi(e,a),e.flags|=4096;return e}return t=qe(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Si(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(s(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function _s(t,e,n,a,l){return Ln(e),n=cs(t,e,n,a,void 0,l),a=rs(),t!==null&&!Yt?(os(t,e,l),Ze(t,e,l)):(vt&&a&&Qu(e),e.flags|=1,It(t,e,n,l),e.child)}function _f(t,e,n,a,l,i){return Ln(e),e.updateQueue=null,n=Mo(e,a,n,l),Ro(t),a=rs(),t!==null&&!Yt?(os(t,e,i),Ze(t,e,i)):(vt&&a&&Qu(e),e.flags|=1,It(t,e,n,i),e.child)}function Rf(t,e,n,a,l){if(Ln(e),e.stateNode===null){var i=oa,u=n.contextType;typeof u=="object"&&u!==null&&(i=Ft(u)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ns,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},ts(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?Ft(u):oa,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(Ts(e,n,u,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Ns.enqueueReplaceState(i,i.state,null),ll(e,a,i,l),al(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var r=e.memoizedProps,p=Xn(n,r);i.props=p;var C=i.context,M=n.contextType;u=oa,typeof M=="object"&&M!==null&&(u=Ft(M));var O=n.getDerivedStateFromProps;M=typeof O=="function"||typeof i.getSnapshotBeforeUpdate=="function",r=e.pendingProps!==r,M||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r||C!==u)&&gf(e,i,a,u),on=!1;var A=e.memoizedState;i.state=A,ll(e,a,i,l),al(),C=e.memoizedState,r||A!==C||on?(typeof O=="function"&&(Ts(e,n,O,a),C=e.memoizedState),(p=on||mf(e,n,p,a,A,C,u))?(M||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=C),i.props=a,i.state=C,i.context=u,a=p):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,es(t,e),u=e.memoizedProps,M=Xn(n,u),i.props=M,O=e.pendingProps,A=i.context,C=n.contextType,p=oa,typeof C=="object"&&C!==null&&(p=Ft(C)),r=n.getDerivedStateFromProps,(C=typeof r=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==O||A!==p)&&gf(e,i,a,p),on=!1,A=e.memoizedState,i.state=A,ll(e,a,i,l),al();var _=e.memoizedState;u!==O||A!==_||on||t!==null&&t.dependencies!==null&&ni(t.dependencies)?(typeof r=="function"&&(Ts(e,n,r,a),_=e.memoizedState),(M=on||mf(e,n,M,a,A,_,p)||t!==null&&t.dependencies!==null&&ni(t.dependencies))?(C||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,_,p),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,_,p)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=_),i.props=a,i.state=_,i.context=p,a=M):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,Si(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Qn(e,t.child,null,l),e.child=Qn(e,null,n,l)):It(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ze(t,e,l),t}function Mf(t,e,n,a){return kn(),e.flags|=256,It(t,e,n,a),e.child}var Rs={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ms(t){return{baseLanes:t,cachePool:vo()}}function zs(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pe),t}function zf(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(kt.current&2)!==0),u&&(l=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(vt){if(l?hn(e):mn(),(t=Dt)?(t=Ld(t,Te),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:ze,overflow:De}:null,retryLane:536870912,hydrationErrors:null},n=co(t),n.return=e,e.child=n,Jt=e,Dt=null)):t=null,t===null)throw cn(e);return hc(t)?e.lanes=32:e.lanes=536870912,null}var r=a.children;return a=a.fallback,l?(mn(),l=e.mode,r=wi({mode:"hidden",children:r},l),a=Un(a,l,n,null),r.return=e,a.return=e,r.sibling=a,e.child=r,a=e.child,a.memoizedState=Ms(n),a.childLanes=zs(t,u,n),e.memoizedState=Rs,rl(null,a)):(hn(e),Ds(e,r))}var p=t.memoizedState;if(p!==null&&(r=p.dehydrated,r!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=Os(t,e,n)):e.memoizedState!==null?(mn(),e.child=t.child,e.flags|=128,e=null):(mn(),r=a.fallback,l=e.mode,a=wi({mode:"visible",children:a.children},l),r=Un(r,l,n,null),r.flags|=2,a.return=e,r.return=e,a.sibling=r,e.child=a,Qn(e,t.child,null,n),a=e.child,a.memoizedState=Ms(n),a.childLanes=zs(t,u,n),e.memoizedState=Rs,e=rl(null,a));else if(hn(e),hc(r)){if(u=r.nextSibling&&r.nextSibling.dataset,u)var C=u.dgst;u=C,a=Error(s(419)),a.stack="",a.digest=u,Wa({value:a,source:null,stack:null}),e=Os(t,e,n)}else if(Yt||ma(t,e,n,!1),u=(n&t.childLanes)!==0,Yt||u){if(u=Mt,u!==null&&(a=gr(u,n),a!==0&&a!==p.retryLane))throw p.retryLane=a,Bn(t,a),se(u,t,a),As;dc(r)||zi(),e=Os(t,e,n)}else dc(r)?(e.flags|=192,e.child=t.child,e=null):(t=p.treeContext,Dt=Ce(r.nextSibling),Jt=e,vt=!0,sn=null,Te=!1,t!==null&&fo(e,t),e=Ds(e,a.children),e.flags|=4096);return e}return l?(mn(),r=a.fallback,l=e.mode,p=t.child,C=p.sibling,a=qe(p,{mode:"hidden",children:a.children}),a.subtreeFlags=p.subtreeFlags&65011712,C!==null?r=qe(C,r):(r=Un(r,l,n,null),r.flags|=2),r.return=e,a.return=e,a.sibling=r,e.child=a,rl(null,a),a=e.child,r=t.child.memoizedState,r===null?r=Ms(n):(l=r.cachePool,l!==null?(p=qt._currentValue,l=l.parent!==p?{parent:p,pool:p}:l):l=vo(),r={baseLanes:r.baseLanes|n,cachePool:l}),a.memoizedState=r,a.childLanes=zs(t,u,n),e.memoizedState=Rs,rl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=qe(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function Ds(t,e){return e=wi({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function wi(t,e){return t=de(22,t,null,e),t.lanes=0,t}function Os(t,e,n){return Qn(e,t.child,null,n),t=Ds(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Df(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Ju(t.return,e,n)}function js(t,e,n,a,l,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function Of(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=kt.current,r=(u&2)!==0;if(r?(u=u&1|2,e.flags|=128):u&=1,Z(kt,u),It(t,e,a,n),a=vt?Ia:0,!r&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Df(t,n,e);else if(t.tag===19)Df(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&oi(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),js(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&oi(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}js(e,!0,n,null,i,a);break;case"together":js(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ma(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(s(153));if(e.child!==null){for(t=e.child,n=qe(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=qe(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Bs(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ni(t)))}function qm(t,e,n){switch(e.tag){case 3:zt(e,e.stateNode.containerInfo),rn(e,qt,t.memoizedState.cache),kn();break;case 27:case 5:Ue(e);break;case 4:zt(e,e.stateNode.containerInfo);break;case 10:rn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,us(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?zf(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(ma(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return Of(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Z(kt,kt.current),a)break;return null;case 22:return e.lanes=0,Nf(t,e,n,e.pendingProps);case 24:rn(e,qt,t.memoizedState.cache)}return Ze(t,e,n)}function jf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Yt=!0;else{if(!Bs(t,n)&&(e.flags&128)===0)return Yt=!1,qm(t,e,n);Yt=(t.flags&131072)!==0}else Yt=!1,vt&&(e.flags&1048576)!==0&&oo(e,Ia,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=Gn(e.elementType),e.type=t,typeof t=="function")qu(t)?(a=Xn(t,a),e.tag=1,e=Rf(null,e,t,a,n)):(e.tag=0,e=_s(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===T){e.tag=11,e=wf(null,e,t,a,n);break t}else if(l===U){e.tag=14,e=Ef(null,e,t,a,n);break t}}throw e=ut(t)||t,Error(s(306,e,""))}}return e;case 0:return _s(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Xn(a,e.pendingProps),Rf(t,e,a,l,n);case 3:t:{if(zt(e,e.stateNode.containerInfo),t===null)throw Error(s(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,es(t,e),ll(e,a,null,n);var u=e.memoizedState;if(a=u.cache,rn(e,qt,a),a!==i.cache&&Fu(e,[qt],n,!0),al(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Mf(t,e,a,n);break t}else if(a!==l){l=Se(Error(s(424)),e),Wa(l),e=Mf(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Dt=Ce(t.firstChild),Jt=e,vt=!0,sn=null,Te=!0,n=To(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(kn(),a===l){e=Ze(t,e,n);break t}It(t,e,a,n)}e=e.child}return e;case 26:return Si(t,e),t===null?(n=Xd(e.type,null,e.pendingProps,null))?e.memoizedState=n:vt||(n=e.type,t=e.pendingProps,a=Hi(ft.current).createElement(n),a[Kt]=e,a[ee]=t,Wt(a,n,t),Xt(a),e.stateNode=a):e.memoizedState=Xd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Ue(e),t===null&&vt&&(a=e.stateNode=Yd(e.type,e.pendingProps,ft.current),Jt=e,Te=!0,l=Dt,wn(e.type)?(mc=l,Dt=Ce(a.firstChild)):Dt=l),It(t,e,e.pendingProps.children,n),Si(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&vt&&((l=a=Dt)&&(a=pg(a,e.type,e.pendingProps,Te),a!==null?(e.stateNode=a,Jt=e,Dt=Ce(a.firstChild),Te=!1,l=!0):l=!1),l||cn(e)),Ue(e),l=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,a=i.children,rc(l,i)?a=null:u!==null&&rc(l,u)&&(e.flags|=32),e.memoizedState!==null&&(l=cs(t,e,zm,null,null,n),Tl._currentValue=l),Si(t,e),It(t,e,a,n),e.child;case 6:return t===null&&vt&&((t=n=Dt)&&(n=yg(n,e.pendingProps,Te),n!==null?(e.stateNode=n,Jt=e,Dt=null,t=!0):t=!1),t||cn(e)),null;case 13:return zf(t,e,n);case 4:return zt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Qn(e,null,a,n):It(t,e,a,n),e.child;case 11:return wf(t,e,e.type,e.pendingProps,n);case 7:return It(t,e,e.pendingProps,n),e.child;case 8:return It(t,e,e.pendingProps.children,n),e.child;case 12:return It(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,rn(e,e.type,a.value),It(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,Ln(e),l=Ft(l),a=a(l),e.flags|=1,It(t,e,a,n),e.child;case 14:return Ef(t,e,e.type,e.pendingProps,n);case 15:return Tf(t,e,e.type,e.pendingProps,n);case 19:return Of(t,e,n);case 31:return Lm(t,e,n);case 22:return Nf(t,e,n,e.pendingProps);case 24:return Ln(e),a=Ft(qt),t===null?(l=$u(),l===null&&(l=Mt,i=Iu(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},ts(e),rn(e,qt,l)):((t.lanes&n)!==0&&(es(t,e),ll(e,null,null,n),al()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),rn(e,qt,a)):(a=i.cache,rn(e,qt,a),a!==l.cache&&Fu(e,[qt],n,!0))),It(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(s(156,e.tag))}function Ke(t){t.flags|=4}function Us(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(sd())t.flags|=8192;else throw Yn=ui,Pu}else t.flags&=-16777217}function Bf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Id(e))if(sd())t.flags|=8192;else throw Yn=ui,Pu}function Ei(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?dr():536870912,t.lanes|=e,Ca|=e)}function ol(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function Ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Gm(t,e,n){var a=e.pendingProps;switch(Vu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(e),null;case 1:return Ot(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Qe(qt),Ct(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ha(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Zu())),Ot(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(Ot(e),Bf(e,i)):(Ot(e),Us(e,l,null,a,n))):i?i!==t.memoizedState?(Ke(e),Ot(e),Bf(e,i)):(Ot(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ke(e),Ot(e),Us(e,l,t,a,n)),null;case 27:if(jl(e),n=ft.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(s(166));return Ot(e),null}t=W.current,ha(e)?ho(e):(t=Yd(l,a,n),e.stateNode=t,Ke(e))}return Ot(e),null;case 5:if(jl(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(s(166));return Ot(e),null}if(i=W.current,ha(e))ho(e);else{var u=Hi(ft.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[Kt]=e,i[ee]=a;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch(Wt(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ke(e)}}return Ot(e),Us(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(s(166));if(t=ft.current,ha(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Jt,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[Kt]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||zd(t.nodeValue,n)),t||cn(e,!0)}else t=Hi(t).createTextNode(a),t[Kt]=e,e.stateNode=t}return Ot(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ha(e),n!==null){if(t===null){if(!a)throw Error(s(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[Kt]=e}else kn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),t=!1}else n=Zu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(me(e),e):(me(e),null);if((e.flags&128)!==0)throw Error(s(558))}return Ot(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ha(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(s(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(s(317));l[Kt]=e}else kn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),l=!1}else l=Zu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(me(e),e):(me(e),null)}return me(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Ei(e,e.updateQueue),Ot(e),null);case 4:return Ct(),t===null&&lc(e.stateNode.containerInfo),Ot(e),null;case 10:return Qe(e.type),Ot(e),null;case 19:if(j(kt),a=e.memoizedState,a===null)return Ot(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)ol(a,!1);else{if(Ut!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=oi(t),i!==null){for(e.flags|=128,ol(a,!1),t=i.updateQueue,e.updateQueue=t,Ei(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)so(n,t),n=n.sibling;return Z(kt,kt.current&1|2),vt&&Ge(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&ce()>_i&&(e.flags|=128,l=!0,ol(a,!1),e.lanes=4194304)}else{if(!l)if(t=oi(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,Ei(e,t),ol(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!vt)return Ot(e),null}else 2*ce()-a.renderingStartTime>_i&&n!==536870912&&(e.flags|=128,l=!0,ol(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=ce(),t.sibling=null,n=kt.current,Z(kt,l?n&1|2:n&1),vt&&Ge(e,a.treeForkCount),t):(Ot(e),null);case 22:case 23:return me(e),is(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(Ot(e),e.subtreeFlags&6&&(e.flags|=8192)):Ot(e),n=e.updateQueue,n!==null&&Ei(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&j(qn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Qe(qt),Ot(e),null;case 25:return null;case 30:return null}throw Error(s(156,e.tag))}function Ym(t,e){switch(Vu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Qe(qt),Ct(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return jl(e),null;case 31:if(e.memoizedState!==null){if(me(e),e.alternate===null)throw Error(s(340));kn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(me(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(s(340));kn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return j(kt),null;case 4:return Ct(),null;case 10:return Qe(e.type),null;case 22:case 23:return me(e),is(),t!==null&&j(qn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Qe(qt),null;case 25:return null;default:return null}}function Uf(t,e){switch(Vu(e),e.tag){case 3:Qe(qt),Ct();break;case 26:case 27:case 5:jl(e);break;case 4:Ct();break;case 31:e.memoizedState!==null&&me(e);break;case 13:me(e);break;case 19:j(kt);break;case 10:Qe(e.type);break;case 22:case 23:me(e),is(),t!==null&&j(qn);break;case 24:Qe(qt)}}function fl(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(r){Nt(e,e.return,r)}}function gn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var u=a.inst,r=u.destroy;if(r!==void 0){u.destroy=void 0,l=e;var p=n,C=r;try{C()}catch(M){Nt(l,p,M)}}}a=a.next}while(a!==i)}}catch(M){Nt(e,e.return,M)}}function kf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Co(e,n)}catch(a){Nt(t,t.return,a)}}}function Hf(t,e,n){n.props=Xn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){Nt(t,e,a)}}function dl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){Nt(t,e,l)}}function Oe(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){Nt(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){Nt(t,e,l)}else n.current=null}function Lf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){Nt(t,t.return,l)}}function ks(t,e,n){try{var a=t.stateNode;og(a,t.type,n,e),a[ee]=e}catch(l){Nt(t,t.return,l)}}function qf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&wn(t.type)||t.tag===4}function Hs(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||qf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&wn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ls(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=He));else if(a!==4&&(a===27&&wn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Ls(t,e,n),t=t.sibling;t!==null;)Ls(t,e,n),t=t.sibling}function Ti(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&wn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ti(t,e,n),t=t.sibling;t!==null;)Ti(t,e,n),t=t.sibling}function Gf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);Wt(e,a,n),e[Kt]=t,e[ee]=n}catch(i){Nt(t,t.return,i)}}var Je=!1,Qt=!1,qs=!1,Yf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function Qm(t,e){if(t=t.containerInfo,sc=Xi,t=$r(t),Ou(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,r=-1,p=-1,C=0,M=0,O=t,A=null;e:for(;;){for(var _;O!==n||l!==0&&O.nodeType!==3||(r=u+l),O!==i||a!==0&&O.nodeType!==3||(p=u+a),O.nodeType===3&&(u+=O.nodeValue.length),(_=O.firstChild)!==null;)A=O,O=_;for(;;){if(O===t)break e;if(A===n&&++C===l&&(r=u),A===i&&++M===a&&(p=u),(_=O.nextSibling)!==null)break;O=A,A=O.parentNode}O=_}n=r===-1||p===-1?null:{start:r,end:p}}else n=null}n=n||{start:0,end:0}}else n=null;for(cc={focusedElem:t,selectionRange:n},Xi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var I=Xn(n.type,l);t=a.getSnapshotBeforeUpdate(I,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(it){Nt(n,n.return,it)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)fc(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":fc(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function Qf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Ie(t,n),a&4&&fl(5,n);break;case 1:if(Ie(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){Nt(n,n.return,u)}else{var l=Xn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){Nt(n,n.return,u)}}a&64&&kf(n),a&512&&dl(n,n.return);break;case 3:if(Ie(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Co(t,e)}catch(u){Nt(n,n.return,u)}}break;case 27:e===null&&a&4&&Gf(n);case 26:case 5:Ie(t,n),e===null&&a&4&&Lf(n),a&512&&dl(n,n.return);break;case 12:Ie(t,n);break;case 31:Ie(t,n),a&4&&Zf(t,n);break;case 13:Ie(t,n),a&4&&Kf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=$m.bind(null,n),vg(t,n))));break;case 22:if(a=n.memoizedState!==null||Je,!a){e=e!==null&&e.memoizedState!==null||Qt,l=Je;var i=Qt;Je=a,(Qt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Ie(t,n),Je=l,Qt=i}break;case 30:break;default:Ie(t,n)}}function Vf(t){var e=t.alternate;e!==null&&(t.alternate=null,Vf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&pu(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var jt=null,ae=!1;function Fe(t,e,n){for(n=n.child;n!==null;)Xf(t,e,n),n=n.sibling}function Xf(t,e,n){if(re&&typeof re.onCommitFiberUnmount=="function")try{re.onCommitFiberUnmount(Ua,n)}catch{}switch(n.tag){case 26:Qt||Oe(n,e),Fe(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qt||Oe(n,e);var a=jt,l=ae;wn(n.type)&&(jt=n.stateNode,ae=!1),Fe(t,e,n),Sl(n.stateNode),jt=a,ae=l;break;case 5:Qt||Oe(n,e);case 6:if(a=jt,l=ae,jt=null,Fe(t,e,n),jt=a,ae=l,jt!==null)if(ae)try{(jt.nodeType===9?jt.body:jt.nodeName==="HTML"?jt.ownerDocument.body:jt).removeChild(n.stateNode)}catch(i){Nt(n,e,i)}else try{jt.removeChild(n.stateNode)}catch(i){Nt(n,e,i)}break;case 18:jt!==null&&(ae?(t=jt,kd(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ja(t)):kd(jt,n.stateNode));break;case 4:a=jt,l=ae,jt=n.stateNode.containerInfo,ae=!0,Fe(t,e,n),jt=a,ae=l;break;case 0:case 11:case 14:case 15:gn(2,n,e),Qt||gn(4,n,e),Fe(t,e,n);break;case 1:Qt||(Oe(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Hf(n,e,a)),Fe(t,e,n);break;case 21:Fe(t,e,n);break;case 22:Qt=(a=Qt)||n.memoizedState!==null,Fe(t,e,n),Qt=a;break;default:Fe(t,e,n)}}function Zf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ja(t)}catch(n){Nt(e,e.return,n)}}}function Kf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ja(t)}catch(n){Nt(e,e.return,n)}}function Vm(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Yf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Yf),e;default:throw Error(s(435,t.tag))}}function Ni(t,e){var n=Vm(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=Pm.bind(null,t,a);a.then(l,l)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,u=e,r=u;t:for(;r!==null;){switch(r.tag){case 27:if(wn(r.type)){jt=r.stateNode,ae=!1;break t}break;case 5:jt=r.stateNode,ae=!1;break t;case 3:case 4:jt=r.stateNode.containerInfo,ae=!0;break t}r=r.return}if(jt===null)throw Error(s(160));Xf(i,u,l),jt=null,ae=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Jf(e,t),e=e.sibling}var Re=null;function Jf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ie(t),a&4&&(gn(3,t,t.return),fl(3,t),gn(5,t,t.return));break;case 1:le(e,t),ie(t),a&512&&(Qt||n===null||Oe(n,n.return)),a&64&&Je&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Re;if(le(e,t),ie(t),a&512&&(Qt||n===null||Oe(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[La]||i[Kt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),Wt(i,a,n),i[Kt]=t,Xt(i),a=i;break t;case"link":var u=Jd("link","href",l).get(a+(n.href||""));if(u){for(var r=0;r<u.length;r++)if(i=u[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(r,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;case"meta":if(u=Jd("meta","content",l).get(a+(n.content||""))){for(r=0;r<u.length;r++)if(i=u[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(r,1);break e}}i=l.createElement(a),Wt(i,a,n),l.head.appendChild(i);break;default:throw Error(s(468,a))}i[Kt]=t,Xt(i),a=i}t.stateNode=a}else Fd(l,t.type,t.stateNode);else t.stateNode=Kd(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Fd(l,t.type,t.stateNode):Kd(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&ks(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ie(t),a&512&&(Qt||n===null||Oe(n,n.return)),n!==null&&a&4&&ks(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ie(t),a&512&&(Qt||n===null||Oe(n,n.return)),t.flags&32){l=t.stateNode;try{aa(l,"")}catch(I){Nt(t,t.return,I)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,ks(t,l,n!==null?n.memoizedProps:l)),a&1024&&(qs=!0);break;case 6:if(le(e,t),ie(t),a&4){if(t.stateNode===null)throw Error(s(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(I){Nt(t,t.return,I)}}break;case 3:if(Gi=null,l=Re,Re=Li(e.containerInfo),le(e,t),Re=l,ie(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ja(e.containerInfo)}catch(I){Nt(t,t.return,I)}qs&&(qs=!1,Ff(t));break;case 4:a=Re,Re=Li(t.stateNode.containerInfo),le(e,t),ie(t),Re=a;break;case 12:le(e,t),ie(t);break;case 31:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ni(t,a)));break;case 13:le(e,t),ie(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Ai=ce()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ni(t,a)));break;case 22:l=t.memoizedState!==null;var p=n!==null&&n.memoizedState!==null,C=Je,M=Qt;if(Je=C||l,Qt=M||p,le(e,t),Qt=M,Je=C,ie(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||p||Je||Qt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){p=n=e;try{if(i=p.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{r=p.stateNode;var O=p.memoizedProps.style,A=O!=null&&O.hasOwnProperty("display")?O.display:null;r.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(I){Nt(p,p.return,I)}}}else if(e.tag===6){if(n===null){p=e;try{p.stateNode.nodeValue=l?"":p.memoizedProps}catch(I){Nt(p,p.return,I)}}}else if(e.tag===18){if(n===null){p=e;try{var _=p.stateNode;l?Hd(_,!0):Hd(p.stateNode,!1)}catch(I){Nt(p,p.return,I)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ni(t,n))));break;case 19:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ni(t,a)));break;case 30:break;case 21:break;default:le(e,t),ie(t)}}function ie(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(qf(a)){n=a;break}a=a.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var l=n.stateNode,i=Hs(t);Ti(t,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(aa(u,""),n.flags&=-33);var r=Hs(t);Ti(t,r,u);break;case 3:case 4:var p=n.stateNode.containerInfo,C=Hs(t);Ls(t,C,p);break;default:throw Error(s(161))}}catch(M){Nt(t,t.return,M)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Ff(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Ff(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Ie(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Qf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:gn(4,e,e.return),Zn(e);break;case 1:Oe(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Hf(e,e.return,n),Zn(e);break;case 27:Sl(e.stateNode);case 26:case 5:Oe(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(l,i,n),fl(4,i);break;case 1:if(We(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(C){Nt(a,a.return,C)}if(a=i,l=a.updateQueue,l!==null){var r=a.stateNode;try{var p=l.shared.hiddenCallbacks;if(p!==null)for(l.shared.hiddenCallbacks=null,l=0;l<p.length;l++)No(p[l],r)}catch(C){Nt(a,a.return,C)}}n&&u&64&&kf(i),dl(i,i.return);break;case 27:Gf(i);case 26:case 5:We(l,i,n),n&&a===null&&u&4&&Lf(i),dl(i,i.return);break;case 12:We(l,i,n);break;case 31:We(l,i,n),n&&u&4&&Zf(l,i);break;case 13:We(l,i,n),n&&u&4&&Kf(l,i);break;case 22:i.memoizedState===null&&We(l,i,n),dl(i,i.return);break;case 30:break;default:We(l,i,n)}e=e.sibling}}function Gs(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&$a(n))}function Ys(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&$a(t))}function Me(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)If(t,e,n,a),e=e.sibling}function If(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:Me(t,e,n,a),l&2048&&fl(9,e);break;case 1:Me(t,e,n,a);break;case 3:Me(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&$a(t)));break;case 12:if(l&2048){Me(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,r=i.onPostCommit;typeof r=="function"&&r(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(p){Nt(e,e.return,p)}}else Me(t,e,n,a);break;case 31:Me(t,e,n,a);break;case 13:Me(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?Me(t,e,n,a):hl(t,e):i._visibility&2?Me(t,e,n,a):(i._visibility|=2,Ea(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&Gs(u,e);break;case 24:Me(t,e,n,a),l&2048&&Ys(e.alternate,e);break;default:Me(t,e,n,a)}}function Ea(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,r=n,p=a,C=u.flags;switch(u.tag){case 0:case 11:case 15:Ea(i,u,r,p,l),fl(8,u);break;case 23:break;case 22:var M=u.stateNode;u.memoizedState!==null?M._visibility&2?Ea(i,u,r,p,l):hl(i,u):(M._visibility|=2,Ea(i,u,r,p,l)),l&&C&2048&&Gs(u.alternate,u);break;case 24:Ea(i,u,r,p,l),l&&C&2048&&Ys(u.alternate,u);break;default:Ea(i,u,r,p,l)}e=e.sibling}}function hl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:hl(n,a),l&2048&&Gs(a.alternate,a);break;case 24:hl(n,a),l&2048&&Ys(a.alternate,a);break;default:hl(n,a)}e=e.sibling}}var ml=8192;function Ta(t,e,n){if(t.subtreeFlags&ml)for(t=t.child;t!==null;)Wf(t,e,n),t=t.sibling}function Wf(t,e,n){switch(t.tag){case 26:Ta(t,e,n),t.flags&ml&&t.memoizedState!==null&&Mg(n,Re,t.memoizedState,t.memoizedProps);break;case 5:Ta(t,e,n);break;case 3:case 4:var a=Re;Re=Li(t.stateNode.containerInfo),Ta(t,e,n),Re=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=ml,ml=16777216,Ta(t,e,n),ml=a):Ta(t,e,n));break;default:Ta(t,e,n)}}function $f(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function gl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,td(a,t)}$f(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Pf(t),t=t.sibling}function Pf(t){switch(t.tag){case 0:case 11:case 15:gl(t),t.flags&2048&&gn(9,t,t.return);break;case 3:gl(t);break;case 12:gl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ci(t)):gl(t);break;default:gl(t)}}function Ci(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,td(a,t)}$f(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:gn(8,e,e.return),Ci(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ci(e));break;default:Ci(e)}t=t.sibling}}function td(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:gn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:$a(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Zt=a;else t:for(n=t;Zt!==null;){a=Zt;var l=a.sibling,i=a.return;if(Vf(a),a===n){Zt=null;break t}if(l!==null){l.return=i,Zt=l;break t}Zt=i}}}var Xm={getCacheForType:function(t){var e=Ft(qt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ft(qt).controller.signal}},Zm=typeof WeakMap=="function"?WeakMap:Map,wt=0,Mt=null,ht=null,gt=0,Tt=0,ge=null,pn=!1,Na=!1,Qs=!1,$e=0,Ut=0,yn=0,Kn=0,Vs=0,pe=0,Ca=0,pl=null,ue=null,Xs=!1,Ai=0,ed=0,_i=1/0,Ri=null,vn=null,Vt=0,bn=null,Aa=null,Pe=0,Zs=0,Ks=null,nd=null,yl=0,Js=null;function ye(){return(wt&2)!==0&&gt!==0?gt&-gt:R.T!==null?tc():pr()}function ad(){if(pe===0)if((gt&536870912)===0||vt){var t=kl;kl<<=1,(kl&3932160)===0&&(kl=262144),pe=t}else pe=536870912;return t=he.current,t!==null&&(t.flags|=32),pe}function se(t,e,n){(t===Mt&&(Tt===2||Tt===9)||t.cancelPendingCommit!==null)&&(_a(t,0),xn(t,gt,pe,!1)),Ha(t,n),((wt&2)===0||t!==Mt)&&(t===Mt&&((wt&2)===0&&(Kn|=n),Ut===4&&xn(t,gt,pe,!1)),je(t))}function ld(t,e,n){if((wt&6)!==0)throw Error(s(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||ka(t,e),l=a?Fm(t,e):Is(t,e,!0),i=a;do{if(l===0){Na&&!a&&xn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!Km(n)){l=Is(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var r=t;l=pl;var p=r.current.memoizedState.isDehydrated;if(p&&(_a(r,u).flags|=256),u=Is(r,u,!1),u!==2){if(Qs&&!p){r.errorRecoveryDisabledLanes|=i,Kn|=i,l=4;break t}i=ue,ue=l,i!==null&&(ue===null?ue=i:ue.push.apply(ue,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){_a(t,0),xn(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(s(345));case 4:if((e&4194048)!==e)break;case 6:xn(a,e,pe,!pn);break t;case 2:ue=null;break;case 3:case 5:break;default:throw Error(s(329))}if((e&62914560)===e&&(l=Ai+300-ce(),10<l)){if(xn(a,e,pe,!pn),Ll(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=Bd(id.bind(null,a,n,ue,Ri,Xs,e,pe,Kn,Ca,pn,i,"Throttled",-0,0),l);break t}id(a,n,ue,Ri,Xs,e,pe,Kn,Ca,pn,i,null,-0,0)}}break}while(!0);je(t)}function id(t,e,n,a,l,i,u,r,p,C,M,O,A,_){if(t.timeoutHandle=-1,O=e.subtreeFlags,O&8192||(O&16785408)===16785408){O={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:He},Wf(e,i,O);var I=(i&62914560)===i?Ai-ce():(i&4194048)===i?ed-ce():0;if(I=zg(O,I),I!==null){Pe=i,t.cancelPendingCommit=I(hd.bind(null,t,e,i,n,a,l,u,r,p,M,O,null,A,_)),xn(t,i,u,!C);return}}hd(t,e,i,n,a,l,u,r,p)}function Km(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!fe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function xn(t,e,n,a){e&=~Vs,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-oe(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&hr(t,n,e)}function Mi(){return(wt&6)===0?(vl(0),!1):!0}function Fs(){if(ht!==null){if(Tt===0)var t=ht.return;else t=ht,Ye=Hn=null,fs(t),va=null,tl=0,t=ht;for(;t!==null;)Uf(t.alternate,t),t=t.return;ht=null}}function _a(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,hg(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Fs(),Mt=t,ht=n=qe(t.current,null),gt=e,Tt=0,ge=null,pn=!1,Na=ka(t,e),Qs=!1,Ca=pe=Vs=Kn=yn=Ut=0,ue=pl=null,Xs=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-oe(a),i=1<<l;e|=t[l],a&=~i}return $e=e,Wl(),n}function ud(t,e){rt=null,R.H=cl,e===ya||e===ii?(e=So(),Tt=3):e===Pu?(e=So(),Tt=4):Tt=e===As?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,ge=e,ht===null&&(Ut=1,bi(t,Se(e,t.current)))}function sd(){var t=he.current;return t===null?!0:(gt&4194048)===gt?Ne===null:(gt&62914560)===gt||(gt&536870912)!==0?t===Ne:!1}function cd(){var t=R.H;return R.H=cl,t===null?cl:t}function rd(){var t=R.A;return R.A=Xm,t}function zi(){Ut=4,pn||(gt&4194048)!==gt&&he.current!==null||(Na=!0),(yn&134217727)===0&&(Kn&134217727)===0||Mt===null||xn(Mt,gt,pe,!1)}function Is(t,e,n){var a=wt;wt|=2;var l=cd(),i=rd();(Mt!==t||gt!==e)&&(Ri=null,_a(t,e)),e=!1;var u=Ut;t:do try{if(Tt!==0&&ht!==null){var r=ht,p=ge;switch(Tt){case 8:Fs(),u=6;break t;case 3:case 2:case 9:case 6:he.current===null&&(e=!0);var C=Tt;if(Tt=0,ge=null,Ra(t,r,p,C),n&&Na){u=0;break t}break;default:C=Tt,Tt=0,ge=null,Ra(t,r,p,C)}}Jm(),u=Ut;break}catch(M){ud(t,M)}while(!0);return e&&t.shellSuspendCounter++,Ye=Hn=null,wt=a,R.H=l,R.A=i,ht===null&&(Mt=null,gt=0,Wl()),u}function Jm(){for(;ht!==null;)od(ht)}function Fm(t,e){var n=wt;wt|=2;var a=cd(),l=rd();Mt!==t||gt!==e?(Ri=null,_i=ce()+500,_a(t,e)):Na=ka(t,e);t:do try{if(Tt!==0&&ht!==null){e=ht;var i=ge;e:switch(Tt){case 1:Tt=0,ge=null,Ra(t,e,i,1);break;case 2:case 9:if(bo(i)){Tt=0,ge=null,fd(e);break}e=function(){Tt!==2&&Tt!==9||Mt!==t||(Tt=7),je(t)},i.then(e,e);break t;case 3:Tt=7;break t;case 4:Tt=5;break t;case 7:bo(i)?(Tt=0,ge=null,fd(e)):(Tt=0,ge=null,Ra(t,e,i,7));break;case 5:var u=null;switch(ht.tag){case 26:u=ht.memoizedState;case 5:case 27:var r=ht;if(u?Id(u):r.stateNode.complete){Tt=0,ge=null;var p=r.sibling;if(p!==null)ht=p;else{var C=r.return;C!==null?(ht=C,Di(C)):ht=null}break e}}Tt=0,ge=null,Ra(t,e,i,5);break;case 6:Tt=0,ge=null,Ra(t,e,i,6);break;case 8:Fs(),Ut=6;break t;default:throw Error(s(462))}}Im();break}catch(M){ud(t,M)}while(!0);return Ye=Hn=null,R.H=a,R.A=l,wt=n,ht!==null?0:(Mt=null,gt=0,Wl(),Ut)}function Im(){for(;ht!==null&&!b0();)od(ht)}function od(t){var e=jf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?Di(t):ht=e}function fd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=_f(n,e,e.pendingProps,e.type,void 0,gt);break;case 11:e=_f(n,e,e.pendingProps,e.type.render,e.ref,gt);break;case 5:fs(e);default:Uf(n,e),e=ht=so(e,$e),e=jf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?Di(t):ht=e}function Ra(t,e,n,a){Ye=Hn=null,fs(e),va=null,tl=0;var l=e.return;try{if(Hm(t,l,e,n,gt)){Ut=1,bi(t,Se(n,t.current)),ht=null;return}}catch(i){if(l!==null)throw ht=l,i;Ut=1,bi(t,Se(n,t.current)),ht=null;return}e.flags&32768?(vt||a===1?t=!0:Na||(gt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=he.current,a!==null&&a.tag===13&&(a.flags|=16384))),dd(e,t)):Di(e)}function Di(t){var e=t;do{if((e.flags&32768)!==0){dd(e,pn);return}t=e.return;var n=Gm(e.alternate,e,$e);if(n!==null){ht=n;return}if(e=e.sibling,e!==null){ht=e;return}ht=e=t}while(e!==null);Ut===0&&(Ut=5)}function dd(t,e){do{var n=Ym(t.alternate,t);if(n!==null){n.flags&=32767,ht=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){ht=t;return}ht=t=n}while(t!==null);Ut=6,ht=null}function hd(t,e,n,a,l,i,u,r,p){t.cancelPendingCommit=null;do Oi();while(Vt!==0);if((wt&6)!==0)throw Error(s(327));if(e!==null){if(e===t.current)throw Error(s(177));if(i=e.lanes|e.childLanes,i|=Hu,R0(t,n,i,u,r,p),t===Mt&&(ht=Mt=null,gt=0),Aa=e,bn=t,Pe=n,Zs=i,Ks=l,nd=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,tg(Bl,function(){return vd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=R.T,R.T=null,l=K.p,K.p=2,u=wt,wt|=4;try{Qm(t,e,n)}finally{wt=u,K.p=l,R.T=a}}Vt=1,md(),gd(),pd()}}function md(){if(Vt===1){Vt=0;var t=bn,e=Aa,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=R.T,R.T=null;var a=K.p;K.p=2;var l=wt;wt|=4;try{Jf(e,t);var i=cc,u=$r(t.containerInfo),r=i.focusedElem,p=i.selectionRange;if(u!==r&&r&&r.ownerDocument&&Wr(r.ownerDocument.documentElement,r)){if(p!==null&&Ou(r)){var C=p.start,M=p.end;if(M===void 0&&(M=C),"selectionStart"in r)r.selectionStart=C,r.selectionEnd=Math.min(M,r.value.length);else{var O=r.ownerDocument||document,A=O&&O.defaultView||window;if(A.getSelection){var _=A.getSelection(),I=r.textContent.length,it=Math.min(p.start,I),Rt=p.end===void 0?it:Math.min(p.end,I);!_.extend&&it>Rt&&(u=Rt,Rt=it,it=u);var S=Ir(r,it),v=Ir(r,Rt);if(S&&v&&(_.rangeCount!==1||_.anchorNode!==S.node||_.anchorOffset!==S.offset||_.focusNode!==v.node||_.focusOffset!==v.offset)){var N=O.createRange();N.setStart(S.node,S.offset),_.removeAllRanges(),it>Rt?(_.addRange(N),_.extend(v.node,v.offset)):(N.setEnd(v.node,v.offset),_.addRange(N))}}}}for(O=[],_=r;_=_.parentNode;)_.nodeType===1&&O.push({element:_,left:_.scrollLeft,top:_.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<O.length;r++){var D=O[r];D.element.scrollLeft=D.left,D.element.scrollTop=D.top}}Xi=!!sc,cc=sc=null}finally{wt=l,K.p=a,R.T=n}}t.current=e,Vt=2}}function gd(){if(Vt===2){Vt=0;var t=bn,e=Aa,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=R.T,R.T=null;var a=K.p;K.p=2;var l=wt;wt|=4;try{Qf(t,e.alternate,e)}finally{wt=l,K.p=a,R.T=n}}Vt=3}}function pd(){if(Vt===4||Vt===3){Vt=0,x0();var t=bn,e=Aa,n=Pe,a=nd;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Vt=5:(Vt=0,Aa=bn=null,yd(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),mu(n),e=e.stateNode,re&&typeof re.onCommitFiberRoot=="function")try{re.onCommitFiberRoot(Ua,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=R.T,l=K.p,K.p=2,R.T=null;try{for(var i=t.onRecoverableError,u=0;u<a.length;u++){var r=a[u];i(r.value,{componentStack:r.stack})}}finally{R.T=e,K.p=l}}(Pe&3)!==0&&Oi(),je(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Js?yl++:(yl=0,Js=t):yl=0,vl(0)}}function yd(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,$a(e)))}function Oi(){return md(),gd(),pd(),vd()}function vd(){if(Vt!==5)return!1;var t=bn,e=Zs;Zs=0;var n=mu(Pe),a=R.T,l=K.p;try{K.p=32>n?32:n,R.T=null,n=Ks,Ks=null;var i=bn,u=Pe;if(Vt=0,Aa=bn=null,Pe=0,(wt&6)!==0)throw Error(s(331));var r=wt;if(wt|=4,Pf(i.current),If(i,i.current,u,n),wt=r,vl(0,!1),re&&typeof re.onPostCommitFiberRoot=="function")try{re.onPostCommitFiberRoot(Ua,i)}catch{}return!0}finally{K.p=l,R.T=a,yd(t,e)}}function bd(t,e,n){e=Se(n,e),e=Cs(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(Ha(t,2),je(t))}function Nt(t,e,n){if(t.tag===3)bd(t,t,n);else for(;e!==null;){if(e.tag===3){bd(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=Se(n,t),n=xf(2),a=dn(e,n,2),a!==null&&(Sf(n,a,e,t),Ha(a,2),je(a));break}}e=e.return}}function Ws(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new Zm;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Qs=!0,l.add(n),t=Wm.bind(null,t,e,n),e.then(t,t))}function Wm(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Mt===t&&(gt&n)===n&&(Ut===4||Ut===3&&(gt&62914560)===gt&&300>ce()-Ai?(wt&2)===0&&_a(t,0):Vs|=n,Ca===gt&&(Ca=0)),je(t)}function xd(t,e){e===0&&(e=dr()),t=Bn(t,e),t!==null&&(Ha(t,e),je(t))}function $m(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),xd(t,n)}function Pm(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(s(314))}a!==null&&a.delete(e),xd(t,n)}function tg(t,e){return ou(t,e)}var ji=null,Ma=null,$s=!1,Bi=!1,Ps=!1,Sn=0;function je(t){t!==Ma&&t.next===null&&(Ma===null?ji=Ma=t:Ma=Ma.next=t),Bi=!0,$s||($s=!0,ng())}function vl(t,e){if(!Ps&&Bi){Ps=!0;do for(var n=!1,a=ji;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,r=a.pingedLanes;i=(1<<31-oe(42|t)+1)-1,i&=l&~(u&~r),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Td(a,i))}else i=gt,i=Ll(a,a===Mt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||ka(a,i)||(n=!0,Td(a,i));a=a.next}while(n);Ps=!1}}function eg(){Sd()}function Sd(){Bi=$s=!1;var t=0;Sn!==0&&dg()&&(t=Sn);for(var e=ce(),n=null,a=ji;a!==null;){var l=a.next,i=wd(a,e);i===0?(a.next=null,n===null?ji=l:n.next=l,l===null&&(Ma=n)):(n=a,(t!==0||(i&3)!==0)&&(Bi=!0)),a=l}Vt!==0&&Vt!==5||vl(t),Sn!==0&&(Sn=0)}function wd(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-oe(i),r=1<<u,p=l[u];p===-1?((r&n)===0||(r&a)!==0)&&(l[u]=_0(r,e)):p<=e&&(t.expiredLanes|=r),i&=~r}if(e=Mt,n=gt,n=Ll(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(Tt===2||Tt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&fu(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||ka(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&fu(a),mu(n)){case 2:case 8:n=or;break;case 32:n=Bl;break;case 268435456:n=fr;break;default:n=Bl}return a=Ed.bind(null,t),n=ou(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&fu(a),t.callbackPriority=2,t.callbackNode=null,2}function Ed(t,e){if(Vt!==0&&Vt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Oi()&&t.callbackNode!==n)return null;var a=gt;return a=Ll(t,t===Mt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(ld(t,a,e),wd(t,ce()),t.callbackNode!=null&&t.callbackNode===n?Ed.bind(null,t):null)}function Td(t,e){if(Oi())return null;ld(t,e,!0)}function ng(){mg(function(){(wt&6)!==0?ou(rr,eg):Sd()})}function tc(){if(Sn===0){var t=ga;t===0&&(t=Ul,Ul<<=1,(Ul&261888)===0&&(Ul=256)),Sn=t}return Sn}function Nd(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ql(""+t)}function Cd(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function ag(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=Nd((l[ee]||null).action),u=a.submitter;u&&(e=(e=u[ee]||null)?Nd(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var r=new Kl("action","action",null,a,l);t.push({event:r,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Sn!==0){var p=u?Cd(l,u):new FormData(l);xs(n,{pending:!0,data:p,method:l.method,action:i},null,p)}}else typeof i=="function"&&(r.preventDefault(),p=u?Cd(l,u):new FormData(l),xs(n,{pending:!0,data:p,method:l.method,action:i},i,p))},currentTarget:l}]})}}for(var ec=0;ec<ku.length;ec++){var nc=ku[ec],lg=nc.toLowerCase(),ig=nc[0].toUpperCase()+nc.slice(1);_e(lg,"on"+ig)}_e(eo,"onAnimationEnd"),_e(no,"onAnimationIteration"),_e(ao,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(Sm,"onTransitionRun"),_e(wm,"onTransitionStart"),_e(Em,"onTransitionCancel"),_e(lo,"onTransitionEnd"),ea("onMouseEnter",["mouseout","mouseover"]),ea("onMouseLeave",["mouseout","mouseover"]),ea("onPointerEnter",["pointerout","pointerover"]),ea("onPointerLeave",["pointerout","pointerover"]),zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zn("onBeforeInput",["compositionend","keypress","textInput","paste"]),zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ug=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bl));function Ad(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var u=a.length-1;0<=u;u--){var r=a[u],p=r.instance,C=r.currentTarget;if(r=r.listener,p!==i&&l.isPropagationStopped())break t;i=r,l.currentTarget=C;try{i(l)}catch(M){Il(M)}l.currentTarget=null,i=p}else for(u=0;u<a.length;u++){if(r=a[u],p=r.instance,C=r.currentTarget,r=r.listener,p!==i&&l.isPropagationStopped())break t;i=r,l.currentTarget=C;try{i(l)}catch(M){Il(M)}l.currentTarget=null,i=p}}}}function mt(t,e){var n=e[gu];n===void 0&&(n=e[gu]=new Set);var a=t+"__bubble";n.has(a)||(_d(e,t,2,!1),n.add(a))}function ac(t,e,n){var a=0;e&&(a|=4),_d(n,t,a,e)}var Ui="_reactListening"+Math.random().toString(36).slice(2);function lc(t){if(!t[Ui]){t[Ui]=!0,br.forEach(function(n){n!=="selectionchange"&&(ug.has(n)||ac(n,!1,t),ac(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ui]||(e[Ui]=!0,ac("selectionchange",!1,e))}}function _d(t,e,n,a){switch(ah(e)){case 2:var l=jg;break;case 8:l=Bg;break;default:l=bc}n=l.bind(null,e,n,t),l=void 0,!Tu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function ic(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var r=a.stateNode.containerInfo;if(r===l)break;if(u===4)for(u=a.return;u!==null;){var p=u.tag;if((p===3||p===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;r!==null;){if(u=$n(r),u===null)return;if(p=u.tag,p===5||p===6||p===26||p===27){a=i=u;continue t}r=r.parentNode}}a=a.return}zr(function(){var C=i,M=wu(n),O=[];t:{var A=io.get(t);if(A!==void 0){var _=Kl,I=t;switch(t){case"keypress":if(Xl(n)===0)break t;case"keydown":case"keyup":_=P0;break;case"focusin":I="focus",_=_u;break;case"focusout":I="blur",_=_u;break;case"beforeblur":case"afterblur":_=_u;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=jr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=G0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=nm;break;case eo:case no:case ao:_=V0;break;case lo:_=lm;break;case"scroll":case"scrollend":_=L0;break;case"wheel":_=um;break;case"copy":case"cut":case"paste":_=Z0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=Ur;break;case"toggle":case"beforetoggle":_=cm}var it=(e&4)!==0,Rt=!it&&(t==="scroll"||t==="scrollend"),S=it?A!==null?A+"Capture":null:A;it=[];for(var v=C,N;v!==null;){var D=v;if(N=D.stateNode,D=D.tag,D!==5&&D!==26&&D!==27||N===null||S===null||(D=Ga(v,S),D!=null&&it.push(xl(v,D,N))),Rt)break;v=v.return}0<it.length&&(A=new _(A,I,null,n,M),O.push({event:A,listeners:it}))}}if((e&7)===0){t:{if(A=t==="mouseover"||t==="pointerover",_=t==="mouseout"||t==="pointerout",A&&n!==Su&&(I=n.relatedTarget||n.fromElement)&&($n(I)||I[Wn]))break t;if((_||A)&&(A=M.window===M?M:(A=M.ownerDocument)?A.defaultView||A.parentWindow:window,_?(I=n.relatedTarget||n.toElement,_=C,I=I?$n(I):null,I!==null&&(Rt=m(I),it=I.tag,I!==Rt||it!==5&&it!==27&&it!==6)&&(I=null)):(_=null,I=C),_!==I)){if(it=jr,D="onMouseLeave",S="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(it=Ur,D="onPointerLeave",S="onPointerEnter",v="pointer"),Rt=_==null?A:qa(_),N=I==null?A:qa(I),A=new it(D,v+"leave",_,n,M),A.target=Rt,A.relatedTarget=N,D=null,$n(M)===C&&(it=new it(S,v+"enter",I,n,M),it.target=N,it.relatedTarget=Rt,D=it),Rt=D,_&&I)e:{for(it=sg,S=_,v=I,N=0,D=S;D;D=it(D))N++;D=0;for(var nt=v;nt;nt=it(nt))D++;for(;0<N-D;)S=it(S),N--;for(;0<D-N;)v=it(v),D--;for(;N--;){if(S===v||v!==null&&S===v.alternate){it=S;break e}S=it(S),v=it(v)}it=null}else it=null;_!==null&&Rd(O,A,_,it,!1),I!==null&&Rt!==null&&Rd(O,Rt,I,it,!0)}}t:{if(A=C?qa(C):window,_=A.nodeName&&A.nodeName.toLowerCase(),_==="select"||_==="input"&&A.type==="file")var bt=Vr;else if(Yr(A))if(Xr)bt=vm;else{bt=pm;var P=gm}else _=A.nodeName,!_||_.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?C&&xu(C.elementType)&&(bt=Vr):bt=ym;if(bt&&(bt=bt(t,C))){Qr(O,bt,n,M);break t}P&&P(t,A,C),t==="focusout"&&C&&A.type==="number"&&C.memoizedProps.value!=null&&bu(A,"number",A.value)}switch(P=C?qa(C):window,t){case"focusin":(Yr(P)||P.contentEditable==="true")&&(sa=P,ju=C,Fa=null);break;case"focusout":Fa=ju=sa=null;break;case"mousedown":Bu=!0;break;case"contextmenu":case"mouseup":case"dragend":Bu=!1,Pr(O,n,M);break;case"selectionchange":if(xm)break;case"keydown":case"keyup":Pr(O,n,M)}var ot;if(Mu)t:{switch(t){case"compositionstart":var pt="onCompositionStart";break t;case"compositionend":pt="onCompositionEnd";break t;case"compositionupdate":pt="onCompositionUpdate";break t}pt=void 0}else ua?qr(t,n)&&(pt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(pt="onCompositionStart");pt&&(kr&&n.locale!=="ko"&&(ua||pt!=="onCompositionStart"?pt==="onCompositionEnd"&&ua&&(ot=Dr()):(ln=M,Nu="value"in ln?ln.value:ln.textContent,ua=!0)),P=ki(C,pt),0<P.length&&(pt=new Br(pt,t,null,n,M),O.push({event:pt,listeners:P}),ot?pt.data=ot:(ot=Gr(n),ot!==null&&(pt.data=ot)))),(ot=om?fm(t,n):dm(t,n))&&(pt=ki(C,"onBeforeInput"),0<pt.length&&(P=new Br("onBeforeInput","beforeinput",null,n,M),O.push({event:P,listeners:pt}),P.data=ot)),ag(O,t,C,n,M)}Ad(O,e)})}function xl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ki(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Ga(t,n),l!=null&&a.unshift(xl(t,l,i)),l=Ga(t,e),l!=null&&a.push(xl(t,l,i))),t.tag===3)return a;t=t.return}return[]}function sg(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Rd(t,e,n,a,l){for(var i=e._reactName,u=[];n!==null&&n!==a;){var r=n,p=r.alternate,C=r.stateNode;if(r=r.tag,p!==null&&p===a)break;r!==5&&r!==26&&r!==27||C===null||(p=C,l?(C=Ga(n,i),C!=null&&u.unshift(xl(n,C,p))):l||(C=Ga(n,i),C!=null&&u.push(xl(n,C,p)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var cg=/\r\n?/g,rg=/\u0000|\uFFFD/g;function Md(t){return(typeof t=="string"?t:""+t).replace(cg,`
`).replace(rg,"")}function zd(t,e){return e=Md(e),Md(t)===e}function _t(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||aa(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&aa(t,""+a);break;case"className":Gl(t,"class",a);break;case"tabIndex":Gl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Gl(t,n,a);break;case"style":Rr(t,a,i);break;case"data":if(e!=="object"){Gl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",l.name,l,null),_t(t,e,"formEncType",l.formEncType,l,null),_t(t,e,"formMethod",l.formMethod,l,null),_t(t,e,"formTarget",l.formTarget,l,null)):(_t(t,e,"encType",l.encType,l,null),_t(t,e,"method",l.method,l,null),_t(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Ql(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=He);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(s(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(s(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Ql(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":mt("beforetoggle",t),mt("toggle",t),ql(t,"popover",a);break;case"xlinkActuate":ke(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":ke(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":ke(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":ke(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":ke(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":ke(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":ke(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":ke(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":ke(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":ql(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=k0.get(n)||n,ql(t,n,a))}}function uc(t,e,n,a,l,i){switch(n){case"style":Rr(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(s(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(s(60));t.innerHTML=n}}break;case"children":typeof a=="string"?aa(t,a):(typeof a=="number"||typeof a=="bigint")&&aa(t,""+a);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=He);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!xr.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[ee]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):ql(t,n,a)}}}function Wt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,e));default:_t(t,e,i,u,n,null)}}l&&_t(t,e,"srcSet",n.srcSet,n,null),a&&_t(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var r=i=u=l=null,p=null,C=null;for(a in n)if(n.hasOwnProperty(a)){var M=n[a];if(M!=null)switch(a){case"name":l=M;break;case"type":u=M;break;case"checked":p=M;break;case"defaultChecked":C=M;break;case"value":i=M;break;case"defaultValue":r=M;break;case"children":case"dangerouslySetInnerHTML":if(M!=null)throw Error(s(137,e));break;default:_t(t,e,a,M,n,null)}}Nr(t,i,r,p,C,u,l,!1);return;case"select":mt("invalid",t),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case"value":i=r;break;case"defaultValue":u=r;break;case"multiple":a=r;default:_t(t,e,l,r,n,null)}e=i,n=u,t.multiple=!!a,e!=null?na(t,!!a,e,!1):n!=null&&na(t,!!a,n,!0);return;case"textarea":mt("invalid",t),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case"value":a=r;break;case"defaultValue":l=r;break;case"children":i=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(s(91));break;default:_t(t,e,u,r,n,null)}Ar(t,a,l,i);return;case"option":for(p in n)if(n.hasOwnProperty(p)&&(a=n[p],a!=null))switch(p){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_t(t,e,p,a,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(a=0;a<bl.length;a++)mt(bl[a],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(C in n)if(n.hasOwnProperty(C)&&(a=n[C],a!=null))switch(C){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,e));default:_t(t,e,C,a,n,null)}return;default:if(xu(e)){for(M in n)n.hasOwnProperty(M)&&(a=n[M],a!==void 0&&uc(t,e,M,a,n,void 0));return}}for(r in n)n.hasOwnProperty(r)&&(a=n[r],a!=null&&_t(t,e,r,a,n,null))}function og(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,r=null,p=null,C=null,M=null;for(_ in n){var O=n[_];if(n.hasOwnProperty(_)&&O!=null)switch(_){case"checked":break;case"value":break;case"defaultValue":p=O;default:a.hasOwnProperty(_)||_t(t,e,_,null,a,O)}}for(var A in a){var _=a[A];if(O=n[A],a.hasOwnProperty(A)&&(_!=null||O!=null))switch(A){case"type":i=_;break;case"name":l=_;break;case"checked":C=_;break;case"defaultChecked":M=_;break;case"value":u=_;break;case"defaultValue":r=_;break;case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(s(137,e));break;default:_!==O&&_t(t,e,A,_,a,O)}}vu(t,u,r,p,C,M,i,l);return;case"select":_=u=r=A=null;for(i in n)if(p=n[i],n.hasOwnProperty(i)&&p!=null)switch(i){case"value":break;case"multiple":_=p;default:a.hasOwnProperty(i)||_t(t,e,i,null,a,p)}for(l in a)if(i=a[l],p=n[l],a.hasOwnProperty(l)&&(i!=null||p!=null))switch(l){case"value":A=i;break;case"defaultValue":r=i;break;case"multiple":u=i;default:i!==p&&_t(t,e,l,i,a,p)}e=r,n=u,a=_,A!=null?na(t,!!n,A,!1):!!a!=!!n&&(e!=null?na(t,!!n,e,!0):na(t,!!n,n?[]:"",!1));return;case"textarea":_=A=null;for(r in n)if(l=n[r],n.hasOwnProperty(r)&&l!=null&&!a.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:_t(t,e,r,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":A=l;break;case"defaultValue":_=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(s(91));break;default:l!==i&&_t(t,e,u,l,a,i)}Cr(t,A,_);return;case"option":for(var I in n)if(A=n[I],n.hasOwnProperty(I)&&A!=null&&!a.hasOwnProperty(I))switch(I){case"selected":t.selected=!1;break;default:_t(t,e,I,null,a,A)}for(p in a)if(A=a[p],_=n[p],a.hasOwnProperty(p)&&A!==_&&(A!=null||_!=null))switch(p){case"selected":t.selected=A&&typeof A!="function"&&typeof A!="symbol";break;default:_t(t,e,p,A,a,_)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var it in n)A=n[it],n.hasOwnProperty(it)&&A!=null&&!a.hasOwnProperty(it)&&_t(t,e,it,null,a,A);for(C in a)if(A=a[C],_=n[C],a.hasOwnProperty(C)&&A!==_&&(A!=null||_!=null))switch(C){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(s(137,e));break;default:_t(t,e,C,A,a,_)}return;default:if(xu(e)){for(var Rt in n)A=n[Rt],n.hasOwnProperty(Rt)&&A!==void 0&&!a.hasOwnProperty(Rt)&&uc(t,e,Rt,void 0,a,A);for(M in a)A=a[M],_=n[M],!a.hasOwnProperty(M)||A===_||A===void 0&&_===void 0||uc(t,e,M,A,a,_);return}}for(var S in n)A=n[S],n.hasOwnProperty(S)&&A!=null&&!a.hasOwnProperty(S)&&_t(t,e,S,null,a,A);for(O in a)A=a[O],_=n[O],!a.hasOwnProperty(O)||A===_||A==null&&_==null||_t(t,e,O,A,a,_)}function Dd(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function fg(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,r=l.duration;if(i&&r&&Dd(u)){for(u=0,r=l.responseEnd,a+=1;a<n.length;a++){var p=n[a],C=p.startTime;if(C>r)break;var M=p.transferSize,O=p.initiatorType;M&&Dd(O)&&(p=p.responseEnd,u+=M*(p<r?1:(r-C)/(p-C)))}if(--a,e+=8*(i+u)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var sc=null,cc=null;function Hi(t){return t.nodeType===9?t:t.ownerDocument}function Od(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function jd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function rc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var oc=null;function dg(){var t=window.event;return t&&t.type==="popstate"?t===oc?!1:(oc=t,!0):(oc=null,!1)}var Bd=typeof setTimeout=="function"?setTimeout:void 0,hg=typeof clearTimeout=="function"?clearTimeout:void 0,Ud=typeof Promise=="function"?Promise:void 0,mg=typeof queueMicrotask=="function"?queueMicrotask:typeof Ud<"u"?function(t){return Ud.resolve(null).then(t).catch(gg)}:Bd;function gg(t){setTimeout(function(){throw t})}function wn(t){return t==="head"}function kd(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),ja(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Sl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Sl(n);for(var i=n.firstChild;i;){var u=i.nextSibling,r=i.nodeName;i[La]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&Sl(t.ownerDocument.body);n=l}while(n);ja(e)}function Hd(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function fc(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":fc(n),pu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function pg(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[La])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ce(t.nextSibling),t===null)break}return null}function yg(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ce(t.nextSibling),t===null))return null;return t}function Ld(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ce(t.nextSibling),t===null))return null;return t}function dc(t){return t.data==="$?"||t.data==="$~"}function hc(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function vg(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ce(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var mc=null;function qd(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ce(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Gd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Yd(t,e,n){switch(e=Hi(n),t){case"html":if(t=e.documentElement,!t)throw Error(s(452));return t;case"head":if(t=e.head,!t)throw Error(s(453));return t;case"body":if(t=e.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Sl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);pu(t)}var Ae=new Map,Qd=new Set;function Li(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=K.d;K.d={f:bg,r:xg,D:Sg,C:wg,L:Eg,m:Tg,X:Cg,S:Ng,M:Ag};function bg(){var t=tn.f(),e=Mi();return t||e}function xg(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?uf(e):tn.r(t)}var za=typeof document>"u"?null:document;function Vd(t,e,n){var a=za;if(a&&typeof e=="string"&&e){var l=be(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),Qd.has(l)||(Qd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),Wt(e,"link",t),Xt(e),a.head.appendChild(e)))}}function Sg(t){tn.D(t),Vd("dns-prefetch",t,null)}function wg(t,e){tn.C(t,e),Vd("preconnect",t,e)}function Eg(t,e,n){tn.L(t,e,n);var a=za;if(a&&t&&e){var l='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+be(n.imageSizes)+'"]')):l+='[href="'+be(t)+'"]';var i=l;switch(e){case"style":i=Da(t);break;case"script":i=Oa(t)}Ae.has(i)||(t=E({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ae.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(wl(i))||e==="script"&&a.querySelector(El(i))||(e=a.createElement("link"),Wt(e,"link",t),Xt(e),a.head.appendChild(e)))}}function Tg(t,e){tn.m(t,e);var n=za;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Oa(t)}if(!Ae.has(i)&&(t=E({rel:"modulepreload",href:t},e),Ae.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(El(i)))return}a=n.createElement("link"),Wt(a,"link",t),Xt(a),n.head.appendChild(a)}}}function Ng(t,e,n){tn.S(t,e,n);var a=za;if(a&&t){var l=ta(a).hoistableStyles,i=Da(t);e=e||"default";var u=l.get(i);if(!u){var r={loading:0,preload:null};if(u=a.querySelector(wl(i)))r.loading=5;else{t=E({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ae.get(i))&&gc(t,n);var p=u=a.createElement("link");Xt(p),Wt(p,"link",t),p._p=new Promise(function(C,M){p.onload=C,p.onerror=M}),p.addEventListener("load",function(){r.loading|=1}),p.addEventListener("error",function(){r.loading|=2}),r.loading|=4,qi(u,e,a)}u={type:"stylesheet",instance:u,count:1,state:r},l.set(i,u)}}}function Cg(t,e){tn.X(t,e);var n=za;if(n&&t){var a=ta(n).hoistableScripts,l=Oa(t),i=a.get(l);i||(i=n.querySelector(El(l)),i||(t=E({src:t,async:!0},e),(e=Ae.get(l))&&pc(t,e),i=n.createElement("script"),Xt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Ag(t,e){tn.M(t,e);var n=za;if(n&&t){var a=ta(n).hoistableScripts,l=Oa(t),i=a.get(l);i||(i=n.querySelector(El(l)),i||(t=E({src:t,async:!0,type:"module"},e),(e=Ae.get(l))&&pc(t,e),i=n.createElement("script"),Xt(i),Wt(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Xd(t,e,n,a){var l=(l=ft.current)?Li(l):null;if(!l)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Da(n.href),n=ta(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Da(n.href);var i=ta(l).hoistableStyles,u=i.get(t);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=l.querySelector(wl(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ae.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ae.set(t,n),i||_g(l,t,n,u.state))),e&&a===null)throw Error(s(528,""));return u}if(e&&a!==null)throw Error(s(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Oa(n),n=ta(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function Da(t){return'href="'+be(t)+'"'}function wl(t){return'link[rel="stylesheet"]['+t+"]"}function Zd(t){return E({},t,{"data-precedence":t.precedence,precedence:null})}function _g(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Wt(e,"link",n),Xt(e),t.head.appendChild(e))}function Oa(t){return'[src="'+be(t)+'"]'}function El(t){return"script[async]"+t}function Kd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Xt(a),a;var l=E({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Xt(a),Wt(a,"style",l),qi(a,n.precedence,t),e.instance=a;case"stylesheet":l=Da(n.href);var i=t.querySelector(wl(l));if(i)return e.state.loading|=4,e.instance=i,Xt(i),i;a=Zd(n),(l=Ae.get(l))&&gc(a,l),i=(t.ownerDocument||t).createElement("link"),Xt(i);var u=i;return u._p=new Promise(function(r,p){u.onload=r,u.onerror=p}),Wt(i,"link",a),e.state.loading|=4,qi(i,n.precedence,t),e.instance=i;case"script":return i=Oa(n.src),(l=t.querySelector(El(i)))?(e.instance=l,Xt(l),l):(a=n,(l=Ae.get(i))&&(a=E({},n),pc(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Xt(l),Wt(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(s(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,qi(a,n.precedence,t));return e.instance}function qi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var r=a[u];if(r.dataset.precedence===e)i=r;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function gc(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function pc(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Gi=null;function Jd(t,e,n){if(Gi===null){var a=new Map,l=Gi=new Map;l.set(n,a)}else l=Gi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[La]||i[Kt]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var r=a.get(u);r?r.push(i):a.set(u,[i])}}return a}function Fd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function Rg(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Id(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Mg(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=Da(a.href),i=e.querySelector(wl(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Yi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Xt(i);return}i=e.ownerDocument||e,a=Zd(a),(l=Ae.get(l))&&gc(a,l),i=i.createElement("link"),Xt(i);var u=i;u._p=new Promise(function(r,p){u.onload=r,u.onerror=p}),Wt(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Yi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var yc=0;function zg(t,e){return t.stylesheets&&t.count===0&&Vi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&yc===0&&(yc=62500*fg());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Vi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>yc?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Yi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Vi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Qi=null;function Vi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Qi=new Map,e.forEach(Dg,t),Qi=null,Yi.call(t))}function Dg(t,e){if(!(e.state.loading&4)){var n=Qi.get(t);if(n)var a=n.get(null);else{n=new Map,Qi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=e.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=Yi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var Tl={$$typeof:H,Provider:null,Consumer:null,_currentValue:lt,_currentValue2:lt,_threadCount:0};function Og(t,e,n,a,l,i,u,r,p){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=du(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=du(0),this.hiddenUpdates=du(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=p,this.incompleteTransitions=new Map}function Wd(t,e,n,a,l,i,u,r,p,C,M,O){return t=new Og(t,e,n,u,p,C,M,O,r),e=1,i===!0&&(e|=24),i=de(3,null,null,e),t.current=i,i.stateNode=t,e=Iu(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},ts(i),t}function $d(t){return t?(t=oa,t):oa}function Pd(t,e,n,a,l,i){l=$d(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(se(n,t,e),nl(n,t,e))}function th(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function vc(t,e){th(t,e),(t=t.alternate)&&th(t,e)}function eh(t){if(t.tag===13||t.tag===31){var e=Bn(t,67108864);e!==null&&se(e,t,67108864),vc(t,67108864)}}function nh(t){if(t.tag===13||t.tag===31){var e=ye();e=hu(e);var n=Bn(t,e);n!==null&&se(n,t,e),vc(t,e)}}var Xi=!0;function jg(t,e,n,a){var l=R.T;R.T=null;var i=K.p;try{K.p=2,bc(t,e,n,a)}finally{K.p=i,R.T=l}}function Bg(t,e,n,a){var l=R.T;R.T=null;var i=K.p;try{K.p=8,bc(t,e,n,a)}finally{K.p=i,R.T=l}}function bc(t,e,n,a){if(Xi){var l=xc(a);if(l===null)ic(t,e,a,Zi,n),lh(t,a);else if(kg(l,t,e,n,a))a.stopPropagation();else if(lh(t,a),e&4&&-1<Ug.indexOf(t)){for(;l!==null;){var i=Pn(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Mn(i.pendingLanes);if(u!==0){var r=i;for(r.pendingLanes|=2,r.entangledLanes|=2;u;){var p=1<<31-oe(u);r.entanglements[1]|=p,u&=~p}je(i),(wt&6)===0&&(_i=ce()+500,vl(0))}}break;case 31:case 13:r=Bn(i,2),r!==null&&se(r,i,2),Mi(),vc(i,2)}if(i=xc(a),i===null&&ic(t,e,a,Zi,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else ic(t,e,a,null,n)}}function xc(t){return t=wu(t),Sc(t)}var Zi=null;function Sc(t){if(Zi=null,t=$n(t),t!==null){var e=m(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=b(e),t!==null)return t;t=null}else if(n===31){if(t=w(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Zi=t,null}function ah(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(S0()){case rr:return 2;case or:return 8;case Bl:case w0:return 32;case fr:return 268435456;default:return 32}default:return 32}}var wc=!1,En=null,Tn=null,Nn=null,Nl=new Map,Cl=new Map,Cn=[],Ug="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function lh(t,e){switch(t){case"focusin":case"focusout":En=null;break;case"dragenter":case"dragleave":Tn=null;break;case"mouseover":case"mouseout":Nn=null;break;case"pointerover":case"pointerout":Nl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Cl.delete(e.pointerId)}}function Al(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=Pn(e),e!==null&&eh(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function kg(t,e,n,a,l){switch(e){case"focusin":return En=Al(En,t,e,n,a,l),!0;case"dragenter":return Tn=Al(Tn,t,e,n,a,l),!0;case"mouseover":return Nn=Al(Nn,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return Nl.set(i,Al(Nl.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,Cl.set(i,Al(Cl.get(i)||null,t,e,n,a,l)),!0}return!1}function ih(t){var e=$n(t.target);if(e!==null){var n=m(e);if(n!==null){if(e=n.tag,e===13){if(e=b(n),e!==null){t.blockedOn=e,yr(t.priority,function(){nh(n)});return}}else if(e===31){if(e=w(n),e!==null){t.blockedOn=e,yr(t.priority,function(){nh(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ki(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=xc(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);Su=a,n.target.dispatchEvent(a),Su=null}else return e=Pn(n),e!==null&&eh(e),t.blockedOn=n,!1;e.shift()}return!0}function uh(t,e,n){Ki(t)&&n.delete(e)}function Hg(){wc=!1,En!==null&&Ki(En)&&(En=null),Tn!==null&&Ki(Tn)&&(Tn=null),Nn!==null&&Ki(Nn)&&(Nn=null),Nl.forEach(uh),Cl.forEach(uh)}function Ji(t,e){t.blockedOn===e&&(t.blockedOn=null,wc||(wc=!0,c.unstable_scheduleCallback(c.unstable_NormalPriority,Hg)))}var Fi=null;function sh(t){Fi!==t&&(Fi=t,c.unstable_scheduleCallback(c.unstable_NormalPriority,function(){Fi===t&&(Fi=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(Sc(a||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,xs(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function ja(t){function e(p){return Ji(p,t)}En!==null&&Ji(En,t),Tn!==null&&Ji(Tn,t),Nn!==null&&Ji(Nn,t),Nl.forEach(e),Cl.forEach(e);for(var n=0;n<Cn.length;n++){var a=Cn[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)ih(n),n.blockedOn===null&&Cn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[ee]||null;if(typeof i=="function")u||sh(n);else if(u){var r=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[ee]||null)r=u.formAction;else if(Sc(l)!==null)continue}else r=u.action;typeof r=="function"?n[a+1]=r:(n.splice(a,3),a-=3),sh(n)}}}function ch(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function Ec(t){this._internalRoot=t}Ii.prototype.render=Ec.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(s(409));var n=e.current,a=ye();Pd(n,a,t,e,null,null)},Ii.prototype.unmount=Ec.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Pd(t.current,2,null,t,null,null),Mi(),e[Wn]=null}};function Ii(t){this._internalRoot=t}Ii.prototype.unstable_scheduleHydration=function(t){if(t){var e=pr();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Cn.length&&e!==0&&e<Cn[n].priority;n++);Cn.splice(n,0,t),n===0&&ih(t)}};var rh=o.version;if(rh!=="19.2.6")throw Error(s(527,rh,"19.2.6"));K.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=y(e),t=t!==null?B(t):null,t=t===null?null:t.stateNode,t};var Lg={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:R,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Wi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Wi.isDisabled&&Wi.supportsFiber)try{Ua=Wi.inject(Lg),re=Wi}catch{}}return Rl.createRoot=function(t,e){if(!f(t))throw Error(s(299));var n=!1,a="",l=pf,i=yf,u=vf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=Wd(t,1,!1,null,null,n,a,null,l,i,u,ch),t[Wn]=e.current,lc(t),new Ec(e)},Rl.hydrateRoot=function(t,e,n){if(!f(t))throw Error(s(299));var a=!1,l="",i=pf,u=yf,r=vf,p=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(r=n.onRecoverableError),n.formState!==void 0&&(p=n.formState)),e=Wd(t,1,!0,e,n??null,a,l,p,i,u,r,ch),e.context=$d(null),n=e.current,a=ye(),a=hu(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,Ha(e,n),je(e),t[Wn]=e.current,lc(t),new Ii(e)},Rl.version="19.2.6",Rl}var bh;function Ig(){if(bh)return Cc.exports;bh=1;function c(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)}catch(o){console.error(o)}}return c(),Cc.exports=Fg(),Cc.exports}var Wg=Ig();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $g=c=>c.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),i0=(...c)=>c.filter((o,d,s)=>!!o&&o.trim()!==""&&s.indexOf(o)===d).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Pg={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t1=yt.forwardRef(({color:c="currentColor",size:o=24,strokeWidth:d=2,absoluteStrokeWidth:s,className:f="",children:m,iconNode:b,...w},g)=>yt.createElement("svg",{ref:g,...Pg,width:o,height:o,stroke:c,strokeWidth:s?Number(d)*24/Number(o):d,className:i0("lucide",f),...w},[...b.map(([y,B])=>yt.createElement(y,B)),...Array.isArray(m)?m:[m]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=(c,o)=>{const d=yt.forwardRef(({className:s,...f},m)=>yt.createElement(t1,{ref:m,iconNode:o,className:i0(`lucide-${$g(c)}`,s),...f}));return d.displayName=`${c}`,d};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e1=$t("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=$t("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dl=$t("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n1=$t("CloudDrizzle",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M8 19v1",key:"1dk2by"}],["path",{d:"M8 14v1",key:"84yxot"}],["path",{d:"M16 19v1",key:"v220m7"}],["path",{d:"M16 14v1",key:"g12gj6"}],["path",{d:"M12 21v1",key:"q8vafk"}],["path",{d:"M12 16v1",key:"1mx6rx"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a1=$t("CloudRain",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 14v6",key:"1j4efv"}],["path",{d:"M8 14v6",key:"17c4r9"}],["path",{d:"M12 16v6",key:"c8a4gj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xh=$t("CloudSun",[["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}],["path",{d:"M15.947 12.65a4 4 0 0 0-5.925-4.128",key:"dpwdj0"}],["path",{d:"M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z",key:"s09mg5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u0=$t("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
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
 */const s0=$t("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sh=$t("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u1=$t("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s1=$t("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=$t("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c1=$t("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r1=$t("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lr=$t("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function lu({group:c,size:o="md",dim:d}){const s=o==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return h.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${c.bgClass} ${c.textClass} ${s} ${d?"opacity-40":""}`,children:c.label})}function $i({label:c,cold:o,hot:d,unit:s}){return o===void 0&&d===void 0?null:h.jsxs("div",{className:"flex flex-col items-center gap-0.5 rounded-lg bg-gray-50 px-2 py-2",children:[h.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-gray-400",children:c}),h.jsxs("span",{className:"font-mono text-sm font-semibold text-gray-900",children:[o!==void 0?o:"—",h.jsx("span",{className:"text-gray-300",children:" / "}),d!==void 0?d:"—"]}),h.jsx("span",{className:"text-[10px] text-gray-400",children:s})]})}function wh(c){return!!c&&(c.fl!==void 0||c.fr!==void 0||c.rl!==void 0||c.rr!==void 0)}function o1({pressures:c}){const{cold:o,hot:d,unit:s="psi",notes:f}=c;return!wh(o)&&!wh(d)?null:h.jsxs("div",{children:[h.jsx("div",{className:"mb-1 text-[10px] text-gray-400",children:"cold / hot"}),h.jsxs("div",{className:"grid grid-cols-2 gap-1.5",children:[h.jsx($i,{label:"FL",cold:o==null?void 0:o.fl,hot:d==null?void 0:d.fl,unit:s}),h.jsx($i,{label:"FR",cold:o==null?void 0:o.fr,hot:d==null?void 0:d.fr,unit:s}),h.jsx($i,{label:"RL",cold:o==null?void 0:o.rl,hot:d==null?void 0:d.rl,unit:s}),h.jsx($i,{label:"RR",cold:o==null?void 0:o.rr,hot:d==null?void 0:d.rr,unit:s})]}),f&&h.jsx("p",{className:"mt-1.5 text-xs text-gray-500",children:f})]})}const Eh=[{key:"flags",label:"Calls out all flags"},{key:"passing",label:"Clean passing & signals"},{key:"smoothInputs",label:"Smooth inputs"},{key:"looksAhead",label:"Looks ahead"},{key:"consistency",label:"Consistency"},{key:"carControl",label:"Car control"},{key:"pace",label:"Pace with group"},{key:"referencePoints",label:"Uses reference points"},{key:"trackAwareness",label:"Track location awareness"}];function f1({label:c,value:o}){return h.jsxs("div",{children:[h.jsxs("div",{className:"mb-0.5 flex items-baseline justify-between text-xs",children:[h.jsx("span",{className:"text-gray-600",children:c}),h.jsxs("span",{className:"font-mono font-semibold text-gray-900",children:[o,"%"]})]}),h.jsx("div",{className:"h-1.5 rounded-full bg-gray-100",children:h.jsx("div",{className:"h-1.5 rounded-full bg-gray-900",style:{width:`${Math.max(0,Math.min(100,o))}%`}})})]})}function d1({evaluation:c}){const{track:o,instructor:d,student:s,car:f,skills:m,aggressivenessEqualsSkill:b,aidsOveractivatedPct:w,recommend:g,notes:y}=c,B=o||d||s||f,E=m&&Eh.some(q=>m[q.key]!==void 0),z=b!==void 0||w!==void 0,k=g&&(g.sameDirection||g.newDirection||g.newTrack);return h.jsxs("div",{className:"flex flex-col gap-3",children:[B&&h.jsxs("dl",{className:"grid grid-cols-2 gap-x-3 gap-y-1 text-xs",children:[o&&h.jsxs("div",{children:[h.jsx("dt",{className:"text-gray-400",children:"Track"}),h.jsx("dd",{className:"font-medium text-gray-900",children:o})]}),d&&h.jsxs("div",{children:[h.jsx("dt",{className:"text-gray-400",children:"Instructor"}),h.jsx("dd",{className:"font-medium text-gray-900",children:d})]}),s&&h.jsxs("div",{children:[h.jsx("dt",{className:"text-gray-400",children:"Student"}),h.jsx("dd",{className:"font-medium text-gray-900",children:s})]}),f&&h.jsxs("div",{children:[h.jsx("dt",{className:"text-gray-400",children:"Car"}),h.jsx("dd",{className:"font-medium text-gray-900",children:f})]})]}),E&&h.jsx("div",{className:"flex flex-col gap-2",children:Eh.map(({key:q,label:Y})=>{const Q=m==null?void 0:m[q];return Q===void 0?null:h.jsx(f1,{label:Y,value:Q},q)})}),z&&h.jsxs("div",{className:"flex flex-wrap gap-x-4 gap-y-1 text-xs",children:[b!==void 0&&h.jsxs("span",{className:"text-gray-600",children:["Aggressiveness = Skill: ",h.jsx("span",{className:"font-medium text-gray-900",children:b?"Yes":"No"})]}),w!==void 0&&h.jsxs("span",{className:"text-gray-600",children:["Car aids over-activated: ",h.jsxs("span",{className:"font-medium text-gray-900",children:[w,"%"]})]})]}),k&&h.jsxs("div",{className:"rounded-lg bg-gray-50 p-2.5 text-xs",children:[h.jsx("div",{className:"mb-1 font-semibold text-gray-500",children:"Recommended run group"}),h.jsxs("div",{className:"flex flex-col gap-0.5 text-gray-700",children:[(g==null?void 0:g.sameDirection)&&h.jsxs("div",{children:["This track, same direction: ",h.jsx("span",{className:"font-medium text-gray-900",children:g.sameDirection})]}),(g==null?void 0:g.newDirection)&&h.jsxs("div",{children:["This track, new direction: ",h.jsx("span",{className:"font-medium text-gray-900",children:g.newDirection})]}),(g==null?void 0:g.newTrack)&&h.jsxs("div",{children:["New track: ",h.jsx("span",{className:"font-medium text-gray-900",children:g.newTrack})]})]})]}),y&&h.jsx("p",{className:"text-xs italic text-gray-500",children:y})]})}const h1={photos:i1,video:r1,other:s0};function r0({media:c}){return c.length===0?null:h.jsx("div",{className:"flex flex-wrap gap-2",children:c.map((o,d)=>{const s=h1[o.kind]??s0;return h.jsxs("a",{href:o.url,target:"_blank",rel:"noreferrer",className:"flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[h.jsx(s,{size:12,className:"text-gray-400"}),o.label]},d)})})}function en(c){const[o,d]=c.split(":").map(Number);return o*60+d}const m1=30;function g1(c,o){let d=-1;for(let w=0;w<c.length&&en(c[w])<=o;w++)d=w;if(d===-1)return{index:-1,progress:0};const s=en(c[d]),f=c[d+1]?en(c[d+1]):null,m=f!==null?f:s+m1;if(o>=m)return{index:-1,progress:0};const b=m===s?0:(o-s)/(m-s);return{index:d,progress:Math.max(0,Math.min(1,b))}}function o0(c){const[o,d]=c.split(":").map(Number);return`${o%12||12}:${d.toString().padStart(2,"0")}`}function f0(c){const[o]=c.split(":").map(Number);return o>=12?"PM":"AM"}function ir(){const c=new Date;return c.getHours()*60+c.getMinutes()}function d0(){const c=new Date,o=c.getFullYear(),d=String(c.getMonth()+1).padStart(2,"0"),s=String(c.getDate()).padStart(2,"0");return`${o}-${d}-${s}`}function p1(){const c=new Date,o=c.getHours(),d=c.getMinutes(),s=o%12||12,f=o>=12?"PM":"AM";return`${s}:${d.toString().padStart(2,"0")} ${f}`}function y1(c){if(c<=0)return"";if(c<60)return`${c} min`;const o=Math.floor(c/60),d=c%60;return d===0?`${o}h`:`${o}h ${d}m`}function v1(c){const o=new Date(c);if(isNaN(o.getTime()))return c;const d=o.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),s=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${d}, ${s}`}function Th(c,o){return c.flatMap(d=>{const s=o.find(f=>f.id===d);return s?[s]:[]})}function b1(c){return c?!!(c.notes||c.instructorEval||c.tirePressures||c.carAids||c.media&&c.media.length):!1}function x1({event:c,runGroups:o,past:d,log:s}){const[f,m]=yt.useState(!1),b=Th(c.onTrack,o),w=Th(c.inClass??[],o),g=b1(s);return h.jsxs("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${d?"opacity-60":""}`,children:[h.jsxs("div",{className:"flex gap-4",children:[h.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[o0(c.time),h.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:f0(c.time)})]}),h.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[b.length>0&&h.jsxs("div",{className:"flex items-center gap-3",children:[h.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),h.jsx("div",{className:"flex flex-wrap gap-1.5",children:b.map(y=>h.jsx(lu,{group:y},y.id))})]}),w.length>0&&h.jsxs(h.Fragment,{children:[b.length>0&&h.jsx("div",{className:"border-t border-gray-100"}),h.jsxs("div",{className:"flex items-center gap-3",children:[h.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),h.jsx("div",{className:"flex flex-wrap gap-1.5",children:w.map(y=>h.jsx(lu,{group:y},y.id))})]})]}),c.note&&h.jsx("p",{className:"text-xs italic text-gray-500",children:c.note})]}),g&&h.jsx("button",{onClick:()=>m(y=>!y),"aria-label":f?"Hide session details":"Show session details",className:"flex h-6 w-6 shrink-0 items-center justify-center self-start rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600",children:h.jsx(Dl,{size:16,className:`transition-transform ${f?"rotate-180":""}`})})]}),g&&f&&h.jsxs("div",{className:"mt-3 flex flex-col gap-3 border-t border-gray-100 pt-3",children:[s.notes&&h.jsx("p",{className:"text-xs text-gray-600",children:s.notes}),s.carAids&&h.jsxs("p",{className:"text-xs text-gray-500",children:[h.jsx("span",{className:"font-medium text-gray-700",children:"Car aids:"})," ",s.carAids]}),s.tirePressures&&h.jsx(o1,{pressures:s.tirePressures}),s.instructorEval&&h.jsxs("div",{children:[h.jsx("div",{className:"mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400",children:"Instructor evaluation"}),h.jsx(d1,{evaluation:s.instructorEval})]}),s.media&&s.media.length>0&&h.jsx(r0,{media:s.media})]})]})}function S1({event:c,past:o}){const d=c.type==="lunch"||c.type==="special";return h.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${d?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${o?"opacity-60":""}`,children:h.jsxs("div",{className:"flex items-center gap-4",children:[h.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[o0(c.time),h.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:f0(c.time)})]}),d&&h.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:c.type==="lunch"?h.jsx(c1,{size:16}):h.jsx(u1,{size:16})}),h.jsxs("div",{children:[h.jsx("p",{className:"text-sm font-medium text-gray-900",children:c.label}),c.subtitle&&h.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:c.subtitle})]})]})})}const nr=yt.forwardRef(({events:c},o)=>{const[,d]=yt.useState(0);yt.useEffect(()=>{const g=setInterval(()=>d(y=>y+1),3e4);return()=>clearInterval(g)},[]);const s=ir(),m=c.filter(g=>"time"in g).find(g=>en(g.time)>s),b=m?en(m.time)-s:null,w=b!==null?b<=5?"text-red-500":b<=10?"text-orange-500":"text-gray-400":"text-gray-400";return h.jsxs("div",{ref:o,"data-time-indicator":!0,className:"relative my-6",children:[h.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[h.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),h.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),h.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:p1()}),b!==null&&h.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${w}`,children:["Next event starts in ",h.jsx("span",{className:"font-semibold",children:y1(b)})]})]})});nr.displayName="TimeIndicator";function Nh({collapsed:c,children:o}){return h.jsx("div",{"data-collapsed":c,"aria-hidden":c,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:c?"0fr":"1fr",opacity:c?0:1,marginBottom:c?0:"0.5rem"},children:h.jsx("div",{className:"overflow-hidden",children:o})})}function w1({events:c,runGroups:o,isToday:d,selectedGroups:s,hidePast:f,sessionLogs:m}){const b=yt.useRef(null),[,w]=yt.useState(0);yt.useEffect(()=>{if(!d)return;const T=setInterval(()=>w(X=>X+1),6e4);return()=>clearInterval(T)},[d]),yt.useEffect(()=>{if(!d)return;const T=setTimeout(()=>{var X;(X=b.current)==null||X.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(T)},[d]);const g=ir(),y=c.flatMap(T=>{if(T.type!=="session")return[T];if(s.length===0)return[T];const X=T.onTrack.filter(U=>s.includes(U)),L=(T.inClass??[]).filter(U=>s.includes(U));return X.length===0&&L.length===0?[]:[{...T,onTrack:X,inClass:L}]}),B=y.map(T=>T.type!=="break"&&f&&d&&en(T.time)<g);y.forEach((T,X)=>{if(T.type!=="break")return;const L=y.slice(0,X).some((U,J)=>U.type!=="break"&&!B[J]);B[X]=!L});const E=[],z=[];y.forEach((T,X)=>{T.type!=="break"&&(E.push(X),z.push(T.time))});const{index:k}=d?g1(z,g):{index:-1},q=k===-1?-1:E[k],Y=d?y.findIndex(T=>T.type!=="break"&&en(T.time)>g):-1,Q=d&&Y===-1&&y.length>0,G=y.length>0&&B.every(Boolean);let V;const H=new Map;return y.forEach((T,X)=>{T.type==="session"&&T.sessionNumber!==void 0&&!H.has(T.sessionNumber)&&H.set(T.sessionNumber,X)}),h.jsxs("div",{className:"flex flex-col pb-10",children:[y.length>0&&h.jsx(Nh,{collapsed:!G,children:h.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[h.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),h.jsx("p",{className:"text-xs text-gray-400",children:"Every event on today's schedule has already happened."})]})}),y.map((T,X)=>{const L=X===q,U=d&&T.type!=="break"&&!L&&en(T.time)<g;let J=null;!B[X]&&T.type==="session"&&T.sessionNumber!==void 0&&T.sessionNumber!==V&&(V=T.sessionNumber,J=h.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",T.sessionNumber]}));const F=T.type==="break"?h.jsxs("div",{className:"flex items-center gap-2 py-1",children:[h.jsx("div",{className:"h-px flex-1 bg-gray-200"}),h.jsx("span",{className:"text-xs text-gray-400 italic",children:T.label}),h.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):T.type==="session"?h.jsx(x1,{event:T,runGroups:o,past:U,log:T.sessionNumber!==void 0&&H.get(T.sessionNumber)===X?m==null?void 0:m.find(at=>at.sessionNumber===T.sessionNumber):void 0}):h.jsx(S1,{event:T,past:U});return h.jsxs(Nh,{collapsed:B[X],children:[X===Y&&h.jsx(nr,{ref:b,events:y}),J,F]},X)}),Q&&h.jsx(nr,{ref:b,events:y})]})}function E1({groups:c,selected:o,onChange:d}){const[s,f]=yt.useState(!1),m=g=>d(o.includes(g)?o.filter(y=>y!==g):[...o,g]),b=o.length===0||o.length===c.length,w=c.filter(g=>o.includes(g.id));return h.jsxs("div",{className:"relative",children:[h.jsxs("button",{onClick:()=>f(g=>!g),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[b?h.jsx("span",{className:"text-gray-700",children:"All run groups"}):h.jsx("div",{className:"flex items-center gap-1",children:w.map(g=>h.jsx(lu,{group:g,size:"sm"},g.id))}),h.jsx(Dl,{size:14,className:"text-gray-400"})]}),s&&h.jsxs(h.Fragment,{children:[h.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>f(!1)}),h.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[c.map(g=>h.jsxs("button",{onClick:()=>m(g.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[h.jsx(lu,{group:g,size:"md"}),o.includes(g.id)&&h.jsx(iu,{size:14,className:"text-blue-500"})]},g.id)),h.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:h.jsx("button",{onClick:()=>{d([]),f(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:b?"All selected":"Clear filter"})})]})]})]})}function T1({events:c,active:o,onChange:d}){const[s,f]=yt.useState(!1);return h.jsxs("div",{className:"relative min-w-0 pl-1",children:[h.jsxs("div",{className:"flex items-center gap-1",children:[h.jsxs("button",{onClick:()=>f(m=>!m),className:"flex items-center gap-1 text-left group min-w-0",children:[h.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:o.name}),h.jsx(Dl,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),o.link&&h.jsx("a",{href:o.link,target:"_blank",rel:"noopener noreferrer","aria-label":"Event page",className:"shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:text-gray-700",children:h.jsx(l1,{size:14})})]}),h.jsx("p",{className:"text-sm text-gray-500",children:o.subtitle}),s&&h.jsxs(h.Fragment,{children:[h.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>f(!1)}),h.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:c.map(m=>h.jsxs("button",{onClick:()=>{d(m),f(!1)},className:"flex w-full items-center justify-between rounded-lg px-4 py-2.5 hover:bg-gray-50 text-left",children:[h.jsxs("div",{children:[h.jsx("div",{className:"text-sm font-semibold text-gray-900",children:m.name}),h.jsx("div",{className:"text-xs text-gray-400",children:m.subtitle})]}),m.id===o.id&&h.jsx(iu,{size:14,className:"text-blue-500 ml-3 shrink-0"})]},m.id))})]})]})}function N1({checked:c,onChange:o,label:d}){return h.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[d&&h.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:d}),h.jsx("button",{type:"button",role:"switch","aria-checked":c,onClick:o,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:c?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:h.jsx("span",{style:{position:"absolute",top:"2px",left:c?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const Jn=72,C1=110;function A1({children:c}){const[o,d]=yt.useState(0),[s,f]=yt.useState("idle"),m=yt.useRef(null),b=yt.useRef(0);yt.useEffect(()=>{const B=k=>{window.scrollY===0&&(m.current=k.touches[0].clientY)},E=k=>{if(m.current===null)return;const q=k.touches[0].clientY-m.current;if(q<=0){m.current=null;return}k.preventDefault();const Y=q<Jn?q:Jn+(q-Jn)*.25;b.current=Math.min(Y,C1),d(b.current),f("pulling")},z=()=>{m.current!==null&&(m.current=null,b.current>=Jn?(f("refreshing"),d(Jn*.75),setTimeout(()=>window.location.reload(),600)):(f("releasing"),d(0),b.current=0,setTimeout(()=>f("idle"),250)))};return document.addEventListener("touchstart",B,{passive:!0}),document.addEventListener("touchmove",E,{passive:!1}),document.addEventListener("touchend",z),document.addEventListener("touchcancel",z),()=>{document.removeEventListener("touchstart",B),document.removeEventListener("touchmove",E),document.removeEventListener("touchend",z),document.removeEventListener("touchcancel",z)}},[]);const w=s==="releasing"||s==="refreshing",g=Math.min(o/Jn,1),y=o>=Jn;return h.jsxs(h.Fragment,{children:[h.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${o}px)`,transition:w?"transform 0.25s ease":"none"},children:h.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${y?"text-blue-500":"text-gray-400"}`,children:h.jsx(s1,{size:16,className:s==="refreshing"?"animate-spin":"",style:s!=="refreshing"?{transform:`rotate(${g*270}deg)`}:void 0})})}),h.jsx("div",{style:{transform:`translateY(${o}px)`,transition:w?"transform 0.25s ease":"none"},children:c})]})}function _1({groups:c}){const o=c.filter(d=>d.description);return o.length===0?null:h.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[h.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),h.jsx("ul",{className:"flex flex-col gap-1.5",children:o.map(d=>h.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[h.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${d.bgClass}`,"aria-hidden":"true"}),h.jsx("span",{className:"font-medium text-gray-900",children:d.label}),h.jsx("span",{className:"text-gray-400",children:"·"}),h.jsx("span",{children:d.description})]},d.id))})]})}const Ch=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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
`;function R1(){const[c,o]=yt.useState(!1);yt.useEffect(()=>{window.scrollTo(0,0)},[]);async function d(){await navigator.clipboard.writeText(Ch),o(!0),setTimeout(()=>o(!1),2e3)}return h.jsx("div",{className:"min-h-screen bg-gray-50",children:h.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[h.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[h.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),h.jsxs("div",{className:"flex items-center gap-2",children:[h.jsxs("button",{onClick:d,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[c?h.jsx(iu,{size:16,className:"text-green-600"}):h.jsx(u0,{size:16}),c?"Copied":"Copy"]}),h.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:h.jsx(lr,{size:18})})]})]}),h.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",h.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),h.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:h.jsx("code",{children:Ch})})]})})}var Ba={},Mc,Ah;function M1(){return Ah||(Ah=1,Mc=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Mc}var zc={},_n={},_h;function Fn(){if(_h)return _n;_h=1;let c;const o=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(s){if(!s)throw new Error('"version" cannot be null or undefined');if(s<1||s>40)throw new Error('"version" should be in range from 1 to 40');return s*4+17},_n.getSymbolTotalCodewords=function(s){return o[s]},_n.getBCHDigit=function(d){let s=0;for(;d!==0;)s++,d>>>=1;return s},_n.setToSJISFunction=function(s){if(typeof s!="function")throw new Error('"toSJISFunc" is not a valid function.');c=s},_n.isKanjiModeEnabled=function(){return typeof c<"u"},_n.toSJIS=function(s){return c(s)},_n}var Dc={},Rh;function ur(){return Rh||(Rh=1,(function(c){c.L={bit:1},c.M={bit:0},c.Q={bit:3},c.H={bit:2};function o(d){if(typeof d!="string")throw new Error("Param is not a string");switch(d.toLowerCase()){case"l":case"low":return c.L;case"m":case"medium":return c.M;case"q":case"quartile":return c.Q;case"h":case"high":return c.H;default:throw new Error("Unknown EC Level: "+d)}}c.isValid=function(s){return s&&typeof s.bit<"u"&&s.bit>=0&&s.bit<4},c.from=function(s,f){if(c.isValid(s))return s;try{return o(s)}catch{return f}}})(Dc)),Dc}var Oc,Mh;function z1(){if(Mh)return Oc;Mh=1;function c(){this.buffer=[],this.length=0}return c.prototype={get:function(o){const d=Math.floor(o/8);return(this.buffer[d]>>>7-o%8&1)===1},put:function(o,d){for(let s=0;s<d;s++)this.putBit((o>>>d-s-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(o){const d=Math.floor(this.length/8);this.buffer.length<=d&&this.buffer.push(0),o&&(this.buffer[d]|=128>>>this.length%8),this.length++}},Oc=c,Oc}var jc,zh;function D1(){if(zh)return jc;zh=1;function c(o){if(!o||o<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=o,this.data=new Uint8Array(o*o),this.reservedBit=new Uint8Array(o*o)}return c.prototype.set=function(o,d,s,f){const m=o*this.size+d;this.data[m]=s,f&&(this.reservedBit[m]=!0)},c.prototype.get=function(o,d){return this.data[o*this.size+d]},c.prototype.xor=function(o,d,s){this.data[o*this.size+d]^=s},c.prototype.isReserved=function(o,d){return this.reservedBit[o*this.size+d]},jc=c,jc}var Bc={},Dh;function O1(){return Dh||(Dh=1,(function(c){const o=Fn().getSymbolSize;c.getRowColCoords=function(s){if(s===1)return[];const f=Math.floor(s/7)+2,m=o(s),b=m===145?26:Math.ceil((m-13)/(2*f-2))*2,w=[m-7];for(let g=1;g<f-1;g++)w[g]=w[g-1]-b;return w.push(6),w.reverse()},c.getPositions=function(s){const f=[],m=c.getRowColCoords(s),b=m.length;for(let w=0;w<b;w++)for(let g=0;g<b;g++)w===0&&g===0||w===0&&g===b-1||w===b-1&&g===0||f.push([m[w],m[g]]);return f}})(Bc)),Bc}var Uc={},Oh;function j1(){if(Oh)return Uc;Oh=1;const c=Fn().getSymbolSize,o=7;return Uc.getPositions=function(s){const f=c(s);return[[0,0],[f-o,0],[0,f-o]]},Uc}var kc={},jh;function B1(){return jh||(jh=1,(function(c){c.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const o={N1:3,N2:3,N3:40,N4:10};c.isValid=function(f){return f!=null&&f!==""&&!isNaN(f)&&f>=0&&f<=7},c.from=function(f){return c.isValid(f)?parseInt(f,10):void 0},c.getPenaltyN1=function(f){const m=f.size;let b=0,w=0,g=0,y=null,B=null;for(let E=0;E<m;E++){w=g=0,y=B=null;for(let z=0;z<m;z++){let k=f.get(E,z);k===y?w++:(w>=5&&(b+=o.N1+(w-5)),y=k,w=1),k=f.get(z,E),k===B?g++:(g>=5&&(b+=o.N1+(g-5)),B=k,g=1)}w>=5&&(b+=o.N1+(w-5)),g>=5&&(b+=o.N1+(g-5))}return b},c.getPenaltyN2=function(f){const m=f.size;let b=0;for(let w=0;w<m-1;w++)for(let g=0;g<m-1;g++){const y=f.get(w,g)+f.get(w,g+1)+f.get(w+1,g)+f.get(w+1,g+1);(y===4||y===0)&&b++}return b*o.N2},c.getPenaltyN3=function(f){const m=f.size;let b=0,w=0,g=0;for(let y=0;y<m;y++){w=g=0;for(let B=0;B<m;B++)w=w<<1&2047|f.get(y,B),B>=10&&(w===1488||w===93)&&b++,g=g<<1&2047|f.get(B,y),B>=10&&(g===1488||g===93)&&b++}return b*o.N3},c.getPenaltyN4=function(f){let m=0;const b=f.data.length;for(let g=0;g<b;g++)m+=f.data[g];return Math.abs(Math.ceil(m*100/b/5)-10)*o.N4};function d(s,f,m){switch(s){case c.Patterns.PATTERN000:return(f+m)%2===0;case c.Patterns.PATTERN001:return f%2===0;case c.Patterns.PATTERN010:return m%3===0;case c.Patterns.PATTERN011:return(f+m)%3===0;case c.Patterns.PATTERN100:return(Math.floor(f/2)+Math.floor(m/3))%2===0;case c.Patterns.PATTERN101:return f*m%2+f*m%3===0;case c.Patterns.PATTERN110:return(f*m%2+f*m%3)%2===0;case c.Patterns.PATTERN111:return(f*m%3+(f+m)%2)%2===0;default:throw new Error("bad maskPattern:"+s)}}c.applyMask=function(f,m){const b=m.size;for(let w=0;w<b;w++)for(let g=0;g<b;g++)m.isReserved(g,w)||m.xor(g,w,d(f,g,w))},c.getBestMask=function(f,m){const b=Object.keys(c.Patterns).length;let w=0,g=1/0;for(let y=0;y<b;y++){m(y),c.applyMask(y,f);const B=c.getPenaltyN1(f)+c.getPenaltyN2(f)+c.getPenaltyN3(f)+c.getPenaltyN4(f);c.applyMask(y,f),B<g&&(g=B,w=y)}return w}})(kc)),kc}var Pi={},Bh;function h0(){if(Bh)return Pi;Bh=1;const c=ur(),o=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],d=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Pi.getBlocksCount=function(f,m){switch(m){case c.L:return o[(f-1)*4+0];case c.M:return o[(f-1)*4+1];case c.Q:return o[(f-1)*4+2];case c.H:return o[(f-1)*4+3];default:return}},Pi.getTotalCodewordsCount=function(f,m){switch(m){case c.L:return d[(f-1)*4+0];case c.M:return d[(f-1)*4+1];case c.Q:return d[(f-1)*4+2];case c.H:return d[(f-1)*4+3];default:return}},Pi}var Hc={},Ml={},Uh;function U1(){if(Uh)return Ml;Uh=1;const c=new Uint8Array(512),o=new Uint8Array(256);return(function(){let s=1;for(let f=0;f<255;f++)c[f]=s,o[s]=f,s<<=1,s&256&&(s^=285);for(let f=255;f<512;f++)c[f]=c[f-255]})(),Ml.log=function(s){if(s<1)throw new Error("log("+s+")");return o[s]},Ml.exp=function(s){return c[s]},Ml.mul=function(s,f){return s===0||f===0?0:c[o[s]+o[f]]},Ml}var kh;function k1(){return kh||(kh=1,(function(c){const o=U1();c.mul=function(s,f){const m=new Uint8Array(s.length+f.length-1);for(let b=0;b<s.length;b++)for(let w=0;w<f.length;w++)m[b+w]^=o.mul(s[b],f[w]);return m},c.mod=function(s,f){let m=new Uint8Array(s);for(;m.length-f.length>=0;){const b=m[0];for(let g=0;g<f.length;g++)m[g]^=o.mul(f[g],b);let w=0;for(;w<m.length&&m[w]===0;)w++;m=m.slice(w)}return m},c.generateECPolynomial=function(s){let f=new Uint8Array([1]);for(let m=0;m<s;m++)f=c.mul(f,new Uint8Array([1,o.exp(m)]));return f}})(Hc)),Hc}var Lc,Hh;function H1(){if(Hh)return Lc;Hh=1;const c=k1();function o(d){this.genPoly=void 0,this.degree=d,this.degree&&this.initialize(this.degree)}return o.prototype.initialize=function(s){this.degree=s,this.genPoly=c.generateECPolynomial(this.degree)},o.prototype.encode=function(s){if(!this.genPoly)throw new Error("Encoder not initialized");const f=new Uint8Array(s.length+this.degree);f.set(s);const m=c.mod(f,this.genPoly),b=this.degree-m.length;if(b>0){const w=new Uint8Array(this.degree);return w.set(m,b),w}return m},Lc=o,Lc}var qc={},Gc={},Yc={},Lh;function m0(){return Lh||(Lh=1,Yc.isValid=function(o){return!isNaN(o)&&o>=1&&o<=40}),Yc}var Be={},qh;function g0(){if(qh)return Be;qh=1;const c="[0-9]+",o="[A-Z $%*+\\-./:]+";let d="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";d=d.replace(/u/g,"\\u");const s="(?:(?![A-Z0-9 $%*+\\-./:]|"+d+`)(?:.|[\r
]))+`;Be.KANJI=new RegExp(d,"g"),Be.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Be.BYTE=new RegExp(s,"g"),Be.NUMERIC=new RegExp(c,"g"),Be.ALPHANUMERIC=new RegExp(o,"g");const f=new RegExp("^"+d+"$"),m=new RegExp("^"+c+"$"),b=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Be.testKanji=function(g){return f.test(g)},Be.testNumeric=function(g){return m.test(g)},Be.testAlphanumeric=function(g){return b.test(g)},Be}var Gh;function In(){return Gh||(Gh=1,(function(c){const o=m0(),d=g0();c.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},c.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},c.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},c.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},c.MIXED={bit:-1},c.getCharCountIndicator=function(m,b){if(!m.ccBits)throw new Error("Invalid mode: "+m);if(!o.isValid(b))throw new Error("Invalid version: "+b);return b>=1&&b<10?m.ccBits[0]:b<27?m.ccBits[1]:m.ccBits[2]},c.getBestModeForData=function(m){return d.testNumeric(m)?c.NUMERIC:d.testAlphanumeric(m)?c.ALPHANUMERIC:d.testKanji(m)?c.KANJI:c.BYTE},c.toString=function(m){if(m&&m.id)return m.id;throw new Error("Invalid mode")},c.isValid=function(m){return m&&m.bit&&m.ccBits};function s(f){if(typeof f!="string")throw new Error("Param is not a string");switch(f.toLowerCase()){case"numeric":return c.NUMERIC;case"alphanumeric":return c.ALPHANUMERIC;case"kanji":return c.KANJI;case"byte":return c.BYTE;default:throw new Error("Unknown mode: "+f)}}c.from=function(m,b){if(c.isValid(m))return m;try{return s(m)}catch{return b}}})(Gc)),Gc}var Yh;function L1(){return Yh||(Yh=1,(function(c){const o=Fn(),d=h0(),s=ur(),f=In(),m=m0(),b=7973,w=o.getBCHDigit(b);function g(z,k,q){for(let Y=1;Y<=40;Y++)if(k<=c.getCapacity(Y,q,z))return Y}function y(z,k){return f.getCharCountIndicator(z,k)+4}function B(z,k){let q=0;return z.forEach(function(Y){const Q=y(Y.mode,k);q+=Q+Y.getBitsLength()}),q}function E(z,k){for(let q=1;q<=40;q++)if(B(z,q)<=c.getCapacity(q,k,f.MIXED))return q}c.from=function(k,q){return m.isValid(k)?parseInt(k,10):q},c.getCapacity=function(k,q,Y){if(!m.isValid(k))throw new Error("Invalid QR Code version");typeof Y>"u"&&(Y=f.BYTE);const Q=o.getSymbolTotalCodewords(k),G=d.getTotalCodewordsCount(k,q),V=(Q-G)*8;if(Y===f.MIXED)return V;const H=V-y(Y,k);switch(Y){case f.NUMERIC:return Math.floor(H/10*3);case f.ALPHANUMERIC:return Math.floor(H/11*2);case f.KANJI:return Math.floor(H/13);case f.BYTE:default:return Math.floor(H/8)}},c.getBestVersionForData=function(k,q){let Y;const Q=s.from(q,s.M);if(Array.isArray(k)){if(k.length>1)return E(k,Q);if(k.length===0)return 1;Y=k[0]}else Y=k;return g(Y.mode,Y.getLength(),Q)},c.getEncodedBits=function(k){if(!m.isValid(k)||k<7)throw new Error("Invalid QR Code version");let q=k<<12;for(;o.getBCHDigit(q)-w>=0;)q^=b<<o.getBCHDigit(q)-w;return k<<12|q}})(qc)),qc}var Qc={},Qh;function q1(){if(Qh)return Qc;Qh=1;const c=Fn(),o=1335,d=21522,s=c.getBCHDigit(o);return Qc.getEncodedBits=function(m,b){const w=m.bit<<3|b;let g=w<<10;for(;c.getBCHDigit(g)-s>=0;)g^=o<<c.getBCHDigit(g)-s;return(w<<10|g)^d},Qc}var Vc={},Xc,Vh;function G1(){if(Vh)return Xc;Vh=1;const c=In();function o(d){this.mode=c.NUMERIC,this.data=d.toString()}return o.getBitsLength=function(s){return 10*Math.floor(s/3)+(s%3?s%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(s){let f,m,b;for(f=0;f+3<=this.data.length;f+=3)m=this.data.substr(f,3),b=parseInt(m,10),s.put(b,10);const w=this.data.length-f;w>0&&(m=this.data.substr(f),b=parseInt(m,10),s.put(b,w*3+1))},Xc=o,Xc}var Zc,Xh;function Y1(){if(Xh)return Zc;Xh=1;const c=In(),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function d(s){this.mode=c.ALPHANUMERIC,this.data=s}return d.getBitsLength=function(f){return 11*Math.floor(f/2)+6*(f%2)},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(f){let m;for(m=0;m+2<=this.data.length;m+=2){let b=o.indexOf(this.data[m])*45;b+=o.indexOf(this.data[m+1]),f.put(b,11)}this.data.length%2&&f.put(o.indexOf(this.data[m]),6)},Zc=d,Zc}var Kc,Zh;function Q1(){if(Zh)return Kc;Zh=1;const c=In();function o(d){this.mode=c.BYTE,typeof d=="string"?this.data=new TextEncoder().encode(d):this.data=new Uint8Array(d)}return o.getBitsLength=function(s){return s*8},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(d){for(let s=0,f=this.data.length;s<f;s++)d.put(this.data[s],8)},Kc=o,Kc}var Jc,Kh;function V1(){if(Kh)return Jc;Kh=1;const c=In(),o=Fn();function d(s){this.mode=c.KANJI,this.data=s}return d.getBitsLength=function(f){return f*13},d.prototype.getLength=function(){return this.data.length},d.prototype.getBitsLength=function(){return d.getBitsLength(this.data.length)},d.prototype.write=function(s){let f;for(f=0;f<this.data.length;f++){let m=o.toSJIS(this.data[f]);if(m>=33088&&m<=40956)m-=33088;else if(m>=57408&&m<=60351)m-=49472;else throw new Error("Invalid SJIS character: "+this.data[f]+`
Make sure your charset is UTF-8`);m=(m>>>8&255)*192+(m&255),s.put(m,13)}},Jc=d,Jc}var Fc={exports:{}},Jh;function X1(){return Jh||(Jh=1,(function(c){var o={single_source_shortest_paths:function(d,s,f){var m={},b={};b[s]=0;var w=o.PriorityQueue.make();w.push(s,0);for(var g,y,B,E,z,k,q,Y,Q;!w.empty();){g=w.pop(),y=g.value,E=g.cost,z=d[y]||{};for(B in z)z.hasOwnProperty(B)&&(k=z[B],q=E+k,Y=b[B],Q=typeof b[B]>"u",(Q||Y>q)&&(b[B]=q,w.push(B,q),m[B]=y))}if(typeof f<"u"&&typeof b[f]>"u"){var G=["Could not find a path from ",s," to ",f,"."].join("");throw new Error(G)}return m},extract_shortest_path_from_predecessor_list:function(d,s){for(var f=[],m=s;m;)f.push(m),d[m],m=d[m];return f.reverse(),f},find_path:function(d,s,f){var m=o.single_source_shortest_paths(d,s,f);return o.extract_shortest_path_from_predecessor_list(m,f)},PriorityQueue:{make:function(d){var s=o.PriorityQueue,f={},m;d=d||{};for(m in s)s.hasOwnProperty(m)&&(f[m]=s[m]);return f.queue=[],f.sorter=d.sorter||s.default_sorter,f},default_sorter:function(d,s){return d.cost-s.cost},push:function(d,s){var f={value:d,cost:s};this.queue.push(f),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};c.exports=o})(Fc)),Fc.exports}var Fh;function Z1(){return Fh||(Fh=1,(function(c){const o=In(),d=G1(),s=Y1(),f=Q1(),m=V1(),b=g0(),w=Fn(),g=X1();function y(G){return unescape(encodeURIComponent(G)).length}function B(G,V,H){const T=[];let X;for(;(X=G.exec(H))!==null;)T.push({data:X[0],index:X.index,mode:V,length:X[0].length});return T}function E(G){const V=B(b.NUMERIC,o.NUMERIC,G),H=B(b.ALPHANUMERIC,o.ALPHANUMERIC,G);let T,X;return w.isKanjiModeEnabled()?(T=B(b.BYTE,o.BYTE,G),X=B(b.KANJI,o.KANJI,G)):(T=B(b.BYTE_KANJI,o.BYTE,G),X=[]),V.concat(H,T,X).sort(function(U,J){return U.index-J.index}).map(function(U){return{data:U.data,mode:U.mode,length:U.length}})}function z(G,V){switch(V){case o.NUMERIC:return d.getBitsLength(G);case o.ALPHANUMERIC:return s.getBitsLength(G);case o.KANJI:return m.getBitsLength(G);case o.BYTE:return f.getBitsLength(G)}}function k(G){return G.reduce(function(V,H){const T=V.length-1>=0?V[V.length-1]:null;return T&&T.mode===H.mode?(V[V.length-1].data+=H.data,V):(V.push(H),V)},[])}function q(G){const V=[];for(let H=0;H<G.length;H++){const T=G[H];switch(T.mode){case o.NUMERIC:V.push([T,{data:T.data,mode:o.ALPHANUMERIC,length:T.length},{data:T.data,mode:o.BYTE,length:T.length}]);break;case o.ALPHANUMERIC:V.push([T,{data:T.data,mode:o.BYTE,length:T.length}]);break;case o.KANJI:V.push([T,{data:T.data,mode:o.BYTE,length:y(T.data)}]);break;case o.BYTE:V.push([{data:T.data,mode:o.BYTE,length:y(T.data)}])}}return V}function Y(G,V){const H={},T={start:{}};let X=["start"];for(let L=0;L<G.length;L++){const U=G[L],J=[];for(let F=0;F<U.length;F++){const at=U[F],tt=""+L+F;J.push(tt),H[tt]={node:at,lastCount:0},T[tt]={};for(let $=0;$<X.length;$++){const et=X[$];H[et]&&H[et].node.mode===at.mode?(T[et][tt]=z(H[et].lastCount+at.length,at.mode)-z(H[et].lastCount,at.mode),H[et].lastCount+=at.length):(H[et]&&(H[et].lastCount=at.length),T[et][tt]=z(at.length,at.mode)+4+o.getCharCountIndicator(at.mode,V))}}X=J}for(let L=0;L<X.length;L++)T[X[L]].end=0;return{map:T,table:H}}function Q(G,V){let H;const T=o.getBestModeForData(G);if(H=o.from(V,T),H!==o.BYTE&&H.bit<T.bit)throw new Error('"'+G+'" cannot be encoded with mode '+o.toString(H)+`.
 Suggested mode is: `+o.toString(T));switch(H===o.KANJI&&!w.isKanjiModeEnabled()&&(H=o.BYTE),H){case o.NUMERIC:return new d(G);case o.ALPHANUMERIC:return new s(G);case o.KANJI:return new m(G);case o.BYTE:return new f(G)}}c.fromArray=function(V){return V.reduce(function(H,T){return typeof T=="string"?H.push(Q(T,null)):T.data&&H.push(Q(T.data,T.mode)),H},[])},c.fromString=function(V,H){const T=E(V,w.isKanjiModeEnabled()),X=q(T),L=Y(X,H),U=g.find_path(L.map,"start","end"),J=[];for(let F=1;F<U.length-1;F++)J.push(L.table[U[F]].node);return c.fromArray(k(J))},c.rawSplit=function(V){return c.fromArray(E(V,w.isKanjiModeEnabled()))}})(Vc)),Vc}var Ih;function K1(){if(Ih)return zc;Ih=1;const c=Fn(),o=ur(),d=z1(),s=D1(),f=O1(),m=j1(),b=B1(),w=h0(),g=H1(),y=L1(),B=q1(),E=In(),z=Z1();function k(L,U){const J=L.size,F=m.getPositions(U);for(let at=0;at<F.length;at++){const tt=F[at][0],$=F[at][1];for(let et=-1;et<=7;et++)if(!(tt+et<=-1||J<=tt+et))for(let ut=-1;ut<=7;ut++)$+ut<=-1||J<=$+ut||(et>=0&&et<=6&&(ut===0||ut===6)||ut>=0&&ut<=6&&(et===0||et===6)||et>=2&&et<=4&&ut>=2&&ut<=4?L.set(tt+et,$+ut,!0,!0):L.set(tt+et,$+ut,!1,!0))}}function q(L){const U=L.size;for(let J=8;J<U-8;J++){const F=J%2===0;L.set(J,6,F,!0),L.set(6,J,F,!0)}}function Y(L,U){const J=f.getPositions(U);for(let F=0;F<J.length;F++){const at=J[F][0],tt=J[F][1];for(let $=-2;$<=2;$++)for(let et=-2;et<=2;et++)$===-2||$===2||et===-2||et===2||$===0&&et===0?L.set(at+$,tt+et,!0,!0):L.set(at+$,tt+et,!1,!0)}}function Q(L,U){const J=L.size,F=y.getEncodedBits(U);let at,tt,$;for(let et=0;et<18;et++)at=Math.floor(et/3),tt=et%3+J-8-3,$=(F>>et&1)===1,L.set(at,tt,$,!0),L.set(tt,at,$,!0)}function G(L,U,J){const F=L.size,at=B.getEncodedBits(U,J);let tt,$;for(tt=0;tt<15;tt++)$=(at>>tt&1)===1,tt<6?L.set(tt,8,$,!0):tt<8?L.set(tt+1,8,$,!0):L.set(F-15+tt,8,$,!0),tt<8?L.set(8,F-tt-1,$,!0):tt<9?L.set(8,15-tt-1+1,$,!0):L.set(8,15-tt-1,$,!0);L.set(F-8,8,1,!0)}function V(L,U){const J=L.size;let F=-1,at=J-1,tt=7,$=0;for(let et=J-1;et>0;et-=2)for(et===6&&et--;;){for(let ut=0;ut<2;ut++)if(!L.isReserved(at,et-ut)){let Lt=!1;$<U.length&&(Lt=(U[$]>>>tt&1)===1),L.set(at,et-ut,Lt),tt--,tt===-1&&($++,tt=7)}if(at+=F,at<0||J<=at){at-=F,F=-F;break}}}function H(L,U,J){const F=new d;J.forEach(function(ut){F.put(ut.mode.bit,4),F.put(ut.getLength(),E.getCharCountIndicator(ut.mode,L)),ut.write(F)});const at=c.getSymbolTotalCodewords(L),tt=w.getTotalCodewordsCount(L,U),$=(at-tt)*8;for(F.getLengthInBits()+4<=$&&F.put(0,4);F.getLengthInBits()%8!==0;)F.putBit(0);const et=($-F.getLengthInBits())/8;for(let ut=0;ut<et;ut++)F.put(ut%2?17:236,8);return T(F,L,U)}function T(L,U,J){const F=c.getSymbolTotalCodewords(U),at=w.getTotalCodewordsCount(U,J),tt=F-at,$=w.getBlocksCount(U,J),et=F%$,ut=$-et,Lt=Math.floor(F/$),R=Math.floor(tt/$),K=R+1,lt=Lt-R,Et=new g(lt);let St=0;const x=new Array($),j=new Array($);let Z=0;const W=new Uint8Array(L.buffer);for(let Ct=0;Ct<$;Ct++){const Ue=Ct<ut?R:K;x[Ct]=W.slice(St,St+Ue),j[Ct]=Et.encode(x[Ct]),St+=Ue,Z=Math.max(Z,Ue)}const st=new Uint8Array(F);let ft=0,dt,zt;for(dt=0;dt<Z;dt++)for(zt=0;zt<$;zt++)dt<x[zt].length&&(st[ft++]=x[zt][dt]);for(dt=0;dt<lt;dt++)for(zt=0;zt<$;zt++)st[ft++]=j[zt][dt];return st}function X(L,U,J,F){let at;if(Array.isArray(L))at=z.fromArray(L);else if(typeof L=="string"){let Lt=U;if(!Lt){const R=z.rawSplit(L);Lt=y.getBestVersionForData(R,J)}at=z.fromString(L,Lt||40)}else throw new Error("Invalid data");const tt=y.getBestVersionForData(at,J);if(!tt)throw new Error("The amount of data is too big to be stored in a QR Code");if(!U)U=tt;else if(U<tt)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+tt+`.
`);const $=H(U,J,at),et=c.getSymbolSize(U),ut=new s(et);return k(ut,U),q(ut),Y(ut,U),G(ut,J,0),U>=7&&Q(ut,U),V(ut,$),isNaN(F)&&(F=b.getBestMask(ut,G.bind(null,ut,J))),b.applyMask(F,ut),G(ut,J,F),{modules:ut,version:U,errorCorrectionLevel:J,maskPattern:F,segments:at}}return zc.create=function(U,J){if(typeof U>"u"||U==="")throw new Error("No input text");let F=o.M,at,tt;return typeof J<"u"&&(F=o.from(J.errorCorrectionLevel,o.M),at=y.from(J.version),tt=b.from(J.maskPattern),J.toSJISFunc&&c.setToSJISFunction(J.toSJISFunc)),X(U,at,F,tt)},zc}var Ic={},Wc={},Wh;function p0(){return Wh||(Wh=1,(function(c){function o(d){if(typeof d=="number"&&(d=d.toString()),typeof d!="string")throw new Error("Color should be defined as hex string");let s=d.slice().replace("#","").split("");if(s.length<3||s.length===5||s.length>8)throw new Error("Invalid hex color: "+d);(s.length===3||s.length===4)&&(s=Array.prototype.concat.apply([],s.map(function(m){return[m,m]}))),s.length===6&&s.push("F","F");const f=parseInt(s.join(""),16);return{r:f>>24&255,g:f>>16&255,b:f>>8&255,a:f&255,hex:"#"+s.slice(0,6).join("")}}c.getOptions=function(s){s||(s={}),s.color||(s.color={});const f=typeof s.margin>"u"||s.margin===null||s.margin<0?4:s.margin,m=s.width&&s.width>=21?s.width:void 0,b=s.scale||4;return{width:m,scale:m?4:b,margin:f,color:{dark:o(s.color.dark||"#000000ff"),light:o(s.color.light||"#ffffffff")},type:s.type,rendererOpts:s.rendererOpts||{}}},c.getScale=function(s,f){return f.width&&f.width>=s+f.margin*2?f.width/(s+f.margin*2):f.scale},c.getImageWidth=function(s,f){const m=c.getScale(s,f);return Math.floor((s+f.margin*2)*m)},c.qrToImageData=function(s,f,m){const b=f.modules.size,w=f.modules.data,g=c.getScale(b,m),y=Math.floor((b+m.margin*2)*g),B=m.margin*g,E=[m.color.light,m.color.dark];for(let z=0;z<y;z++)for(let k=0;k<y;k++){let q=(z*y+k)*4,Y=m.color.light;if(z>=B&&k>=B&&z<y-B&&k<y-B){const Q=Math.floor((z-B)/g),G=Math.floor((k-B)/g);Y=E[w[Q*b+G]?1:0]}s[q++]=Y.r,s[q++]=Y.g,s[q++]=Y.b,s[q]=Y.a}}})(Wc)),Wc}var $h;function J1(){return $h||($h=1,(function(c){const o=p0();function d(f,m,b){f.clearRect(0,0,m.width,m.height),m.style||(m.style={}),m.height=b,m.width=b,m.style.height=b+"px",m.style.width=b+"px"}function s(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}c.render=function(m,b,w){let g=w,y=b;typeof g>"u"&&(!b||!b.getContext)&&(g=b,b=void 0),b||(y=s()),g=o.getOptions(g);const B=o.getImageWidth(m.modules.size,g),E=y.getContext("2d"),z=E.createImageData(B,B);return o.qrToImageData(z.data,m,g),d(E,y,B),E.putImageData(z,0,0),y},c.renderToDataURL=function(m,b,w){let g=w;typeof g>"u"&&(!b||!b.getContext)&&(g=b,b=void 0),g||(g={});const y=c.render(m,b,g),B=g.type||"image/png",E=g.rendererOpts||{};return y.toDataURL(B,E.quality)}})(Ic)),Ic}var $c={},Ph;function F1(){if(Ph)return $c;Ph=1;const c=p0();function o(f,m){const b=f.a/255,w=m+'="'+f.hex+'"';return b<1?w+" "+m+'-opacity="'+b.toFixed(2).slice(1)+'"':w}function d(f,m,b){let w=f+m;return typeof b<"u"&&(w+=" "+b),w}function s(f,m,b){let w="",g=0,y=!1,B=0;for(let E=0;E<f.length;E++){const z=Math.floor(E%m),k=Math.floor(E/m);!z&&!y&&(y=!0),f[E]?(B++,E>0&&z>0&&f[E-1]||(w+=y?d("M",z+b,.5+k+b):d("m",g,0),g=0,y=!1),z+1<m&&f[E+1]||(w+=d("h",B),B=0)):g++}return w}return $c.render=function(m,b,w){const g=c.getOptions(b),y=m.modules.size,B=m.modules.data,E=y+g.margin*2,z=g.color.light.a?"<path "+o(g.color.light,"fill")+' d="M0 0h'+E+"v"+E+'H0z"/>':"",k="<path "+o(g.color.dark,"stroke")+' d="'+s(B,y,g.margin)+'"/>',q='viewBox="0 0 '+E+" "+E+'"',Q='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+q+' shape-rendering="crispEdges">'+z+k+`</svg>
`;return typeof w=="function"&&w(null,Q),Q},$c}var t0;function I1(){if(t0)return Ba;t0=1;const c=M1(),o=K1(),d=J1(),s=F1();function f(m,b,w,g,y){const B=[].slice.call(arguments,1),E=B.length,z=typeof B[E-1]=="function";if(!z&&!c())throw new Error("Callback required as last argument");if(z){if(E<2)throw new Error("Too few arguments provided");E===2?(y=w,w=b,b=g=void 0):E===3&&(b.getContext&&typeof y>"u"?(y=g,g=void 0):(y=g,g=w,w=b,b=void 0))}else{if(E<1)throw new Error("Too few arguments provided");return E===1?(w=b,b=g=void 0):E===2&&!b.getContext&&(g=w,w=b,b=void 0),new Promise(function(k,q){try{const Y=o.create(w,g);k(m(Y,b,g))}catch(Y){q(Y)}})}try{const k=o.create(w,g);y(null,m(k,b,g))}catch(k){y(k)}}return Ba.create=o.create,Ba.toCanvas=f.bind(null,d.render),Ba.toDataURL=f.bind(null,d.renderToDataURL),Ba.toString=f.bind(null,function(m,b,w){return s.render(m,w)}),Ba}var W1=I1();const $1=Gg(W1),Pc=`${window.location.origin}/hpde/`;function P1(){const[c,o]=yt.useState(!1),[d,s]=yt.useState(null);yt.useEffect(()=>{window.scrollTo(0,0),$1.toDataURL(Pc,{margin:1,width:240}).then(s).catch(()=>s(null))},[]);async function f(){await navigator.clipboard.writeText(Pc),o(!0),setTimeout(()=>o(!1),2e3)}return h.jsx("div",{className:"min-h-screen bg-gray-50",children:h.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[h.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[h.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),h.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:h.jsx(lr,{size:18})})]}),h.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),h.jsxs("button",{onClick:f,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[h.jsx("span",{className:"truncate text-sm text-gray-800",children:Pc}),c?h.jsx(iu,{size:16,className:"shrink-0 text-green-600"}):h.jsx(u0,{size:16,className:"shrink-0 text-gray-400"})]}),h.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:d&&h.jsx("img",{src:d,alt:"QR code for schedule link",width:240,height:240})})]})})}function tp(c){const[o,d,s]=c.split("-").map(Number);return new Date(o,d-1,s).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}function tr(c){return c.toLocaleString(void 0,{style:"currency",currency:"USD",maximumFractionDigits:0})}function ep(c){return(c.parts??[]).reduce((d,s)=>d+(s.unitCost??0)*(s.qty??1),0)+(c.laborCost??0)}function np({entry:c}){const[o,d]=yt.useState(!1),s=ep(c),f=!!(c.work||c.notes||c.parts&&c.parts.length>0);return h.jsxs("div",{className:"rounded-xl border border-gray-200 bg-white shadow-sm",children:[h.jsxs("button",{onClick:()=>f&&d(m=>!m),className:"flex w-full items-start justify-between gap-3 p-4 text-left",children:[h.jsxs("div",{className:"flex flex-col gap-0.5",children:[h.jsx("span",{className:"text-xs font-mono text-gray-400",children:tp(c.date)}),h.jsx("span",{className:"text-sm font-semibold text-gray-900",children:c.summary}),c.shop&&h.jsx("span",{className:"text-xs text-gray-500",children:c.shop})]}),h.jsxs("div",{className:"flex shrink-0 items-center gap-2",children:[s>0&&h.jsx("span",{className:"text-sm font-medium text-gray-700",children:tr(s)}),f&&h.jsx(Dl,{size:16,className:`text-gray-400 transition-transform ${o?"rotate-180":""}`})]})]}),f&&o&&h.jsxs("div",{className:"flex flex-col gap-3 border-t border-gray-100 p-4",children:[c.work&&h.jsx("p",{className:"text-xs text-gray-600",children:c.work}),c.parts&&c.parts.length>0&&h.jsxs("table",{className:"w-full text-xs",children:[h.jsx("thead",{children:h.jsxs("tr",{className:"text-left text-gray-400",children:[h.jsx("th",{className:"pb-1 font-normal",children:"Part"}),h.jsx("th",{className:"pb-1 font-normal",children:"Part #"}),h.jsx("th",{className:"pb-1 text-right font-normal",children:"Qty"}),h.jsx("th",{className:"pb-1 text-right font-normal",children:"Cost"})]})}),h.jsx("tbody",{children:c.parts.map((m,b)=>h.jsxs("tr",{className:"border-t border-gray-50 text-gray-700",children:[h.jsx("td",{className:"py-1 pr-2",children:m.name}),h.jsx("td",{className:"py-1 pr-2 font-mono text-gray-500",children:m.partNumber??"—"}),h.jsx("td",{className:"py-1 text-right",children:m.qty??1}),h.jsx("td",{className:"py-1 text-right",children:m.unitCost!==void 0?tr(m.unitCost):"—"})]},b))})]}),c.laborCost!==void 0&&h.jsxs("p",{className:"text-xs text-gray-500",children:["Labor: ",tr(c.laborCost)]}),c.notes&&h.jsx("p",{className:"text-xs italic text-gray-500",children:c.notes})]})]})}const ap=/^[a-zA-Z][a-zA-Z0-9_.\- ]*:/;function lp(c){return ap.test(c)}function e0(c){const o=c.indexOf(":");return o===-1?null:[c.slice(0,o).trim().toLowerCase(),c.slice(o+1).trim()]}function n0(c,o,d){const s=[];d&&s.push(d);let f=o;for(;f<c.length;){const m=c[f];if(!m||m.startsWith("#")||lp(m))break;s.push(m),f++}return{text:s.join(" ").trim(),next:f}}function ip(c){const o=c.split("|").map(b=>b.trim());if(o.length<1||!o[0])return null;const[d,s,f,m]=o;return{name:d,...s?{partNumber:s}:{},...f?{qty:parseFloat(f)}:{},...m?{unitCost:parseFloat(m)}:{}}}function up(c,o){const d=o.split(`
`).map(z=>z.trim());let s="",f,m,b,w;const g=[];let y=null,B=!1,E=0;for(;E<d.length;){const z=d[E];if(!z||z.startsWith("//")){E++;continue}if(z.startsWith("# ")){s=z.slice(2).trim(),E++;continue}if(z.startsWith("### ")){B=z.slice(4).trim().toLowerCase()==="parts",E++;continue}if(z.startsWith("## ")){const Y=z.slice(3).trim().split("|").map(Q=>Q.trim());B=!1,Y[0].toLowerCase()==="service"&&Y.length===2?(y={date:Y[1],summary:""},g.push(y)):y=null,E++;continue}if(!y){const q=e0(z);if(q){const[Y,Q]=q;Y==="year"?f=parseInt(Q,10)||void 0:Y==="make"?m=Q:Y==="model"?b=Q:Y==="trim"&&(w=Q)}E++;continue}if(B){const q=ip(z);q&&(y.parts=[...y.parts??[],q]),E++;continue}const k=e0(z);if(k){const[q,Y]=k;if(q==="shop")y.shop=Y;else if(q==="summary")y.summary=Y;else if(q==="labor"){const Q=parseFloat(Y);y.laborCost=Number.isNaN(Q)?void 0:Q}else if(q==="work"){const{text:Q,next:G}=n0(d,E+1,Y);y.work=Q||void 0,E=G;continue}else if(q==="notes"){const{text:Q,next:G}=n0(d,E+1,Y);y.notes=Q||void 0,E=G;continue}}E++}return g.sort((z,k)=>k.date.localeCompare(z.date)),{id:c,name:s,...f!==void 0?{year:f}:{},...m?{make:m}:{},...b?{model:b}:{},...w?{trim:w}:{},services:g}}const sp=`# Vera's car
year: 1993
make: Porsche
model: 911
trim: Carrera RS tribute

## service | 2026-08-20
shop: Redline Motorworks
summary: Brake pads + fluid flush
work: Replaced front and rear pads, flushed the brake fluid, and bled all four corners.
labor: 320
notes: Pedal feel is much firmer now — worth doing before every HPDE season.

### parts
Front pads — Ferodo DS2500 | FCP1234 | 1 | 180
Rear pads — Ferodo DS2500 | FCP5678 | 1 | 150
Brake fluid — Motul RBF600 | MOT-RBF600 | 2 | 18

## service | 2026-05-02
shop: Redline Motorworks
summary: Alignment + corner balance for the season
work: Set to -2.0 front / -1.5 rear camber, zero toe front, slight toe-in rear. Corner-balanced with driver weight.
labor: 220

## service | 2026-01-15
shop: Home garage
summary: Oil change + fluid top-off
work: Full synthetic 5W-40, new filter, topped off coolant.
labor: 0
notes: DIY between events, no shop needed.

### parts
Engine oil — Motul 300V 5W-40 | MOT-300V | 6 | 22
Oil filter — Mahle OC 21 | MAH-OC21 | 1 | 15
`,cp=[up("vera-car",sp)];function rp(){yt.useEffect(()=>{window.scrollTo(0,0)},[]);const c=cp[0];return h.jsx("div",{className:"min-h-screen bg-gray-50",children:h.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[h.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[h.jsxs("div",{children:[h.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:(c==null?void 0:c.name)??"Car"}),c&&(c.year||c.make||c.model||c.trim)&&h.jsx("p",{className:"text-xs text-gray-500",children:[c.year,c.make,c.model,c.trim].filter(Boolean).join(" ")})]}),h.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:h.jsx(lr,{size:18})})]}),h.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Service log"}),!c||c.services.length===0?h.jsx("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:h.jsx("p",{className:"text-sm font-medium text-gray-500",children:"No service logged yet"})}):h.jsx("div",{className:"flex flex-col gap-2",children:c.services.map((o,d)=>h.jsx(np,{entry:o},d))})]})})}const op={dry:"Dry",damp:"Damp","light-rain":"Light rain","heavy-rain":"Heavy rain",mixed:"Mixed"},fp={dry:c0,damp:xh,"light-rain":n1,"heavy-rain":a1,mixed:xh};function dp({weather:c}){const{highF:o,lowF:d,trackTempF:s,precipitation:f,notes:m}=c;if(o===void 0&&d===void 0&&s===void 0&&!f&&!m)return null;const b=f?fp[f]:c0;return h.jsxs("div",{className:"rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[h.jsxs("div",{className:"flex items-center gap-3",children:[h.jsx("div",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500",children:h.jsx(b,{size:20})}),h.jsxs("div",{className:"flex flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5",children:[(o!==void 0||d!==void 0)&&h.jsxs("span",{className:"text-sm font-semibold text-gray-900",children:[o!==void 0?`${o}°`:"—",d!==void 0&&h.jsxs("span",{className:"font-normal text-gray-400",children:[" / ",d,"°"]})]}),f&&h.jsx("span",{className:"text-sm text-gray-600",children:op[f]}),s!==void 0&&h.jsxs("span",{className:"text-xs text-gray-400",children:["Track ",s,"°"]})]})]}),m&&h.jsx("p",{className:"mt-2 text-xs text-gray-500",children:m})]})}function er({title:c,defaultOpen:o=!1,children:d}){const[s,f]=yt.useState(o);return h.jsxs("div",{className:"rounded-2xl border border-gray-200 bg-white shadow-sm",children:[h.jsxs("button",{onClick:()=>f(m=>!m),className:"flex w-full items-center justify-between gap-2 px-4 py-3 text-left",children:[h.jsx("span",{className:"text-xs font-bold uppercase tracking-widest text-gray-400",children:c}),h.jsx(Dl,{size:16,className:`shrink-0 text-gray-400 transition-transform ${s?"rotate-180":""}`})]}),s&&h.jsx("div",{className:"border-t border-gray-100 px-4 py-3",children:d})]})}const hp=/^[a-zA-Z][a-zA-Z0-9_.=\- ]*:/;function mp(c){return hp.test(c)}function tu(c){const o=c.indexOf(":");if(o===-1)return null;const d=c.slice(0,o).trim().toLowerCase(),s=c.slice(o+1).trim();return[d,s]}function eu(c,o,d){const s=[];d&&s.push(d);let f=o;for(;f<c.length;){const m=c[f];if(!m||m.startsWith("#")||mp(m))break;s.push(m),f++}return{text:s.join(" ").trim(),next:f}}function gp(c){const o={};for(const d of c.matchAll(/\b(fl|fr|rl|rr)\s*=\s*([\d.]+)/gi))o[d[1].toLowerCase()]=parseFloat(d[2]);return o}function zl(c){const o=c.match(/-?[\d.]+/);return o?parseFloat(o[0]):void 0}function a0(c){const o=c.split("|").map(m=>m.trim());if(o.length<3)return null;const[d,s,f]=o;return f?{kind:d,label:s,url:f}:null}const pp=["dry","damp","light-rain","heavy-rain","mixed"],yp={flags:"flags",passing:"passing",smoothinputs:"smoothInputs",looksahead:"looksAhead",consistency:"consistency",carcontrol:"carControl",pace:"pace",referencepoints:"referencePoints",trackawareness:"trackAwareness"};function Ol(c,o){const d=o.split(`
`).map(G=>G.trim());let s="",f="",m;const b=[],w=[];let g=null,y;const B={},E=[],z={};let k="none",q="schedule",Y=null,Q=0;for(;Q<d.length;){const G=d[Q];if(!G||G.startsWith("//")){Q++;continue}if(G.startsWith("# ")){s=G.slice(2).trim(),Q++;continue}if(k==="none"&&G.startsWith("subtitle:")){f=G.slice(9).trim(),Q++;continue}if(k==="none"&&G.startsWith("link:")){m=G.slice(5).trim()||void 0,Q++;continue}if(G.startsWith("### ")){const V=G.slice(4).trim().toLowerCase();if(k==="day"&&g)if(V==="weather")q="weather",g.weather=g.weather??{};else{const H=V.match(/^session\s+(\d+)/);if(H){const T=parseInt(H[1],10);g.sessionLogs=g.sessionLogs??[],Y=g.sessionLogs.find(X=>X.sessionNumber===T)??null,Y||(Y={sessionNumber:T},g.sessionLogs.push(Y)),q="session"}else q="schedule"}Q++;continue}if(G.startsWith("## ")){const V=G.slice(3).trim(),H=V.toLowerCase();if(Y=null,q="schedule",H==="groups"){k="groups",g=null,Q++;continue}if(H==="notes"){k="notes",g=null,Q++;continue}if(H==="vitals"){k="vitals",g=null,Q++;continue}if(H==="media"){k="media",g=null,Q++;continue}if(H==="car"){k="car",g=null,Q++;continue}const T=V.split("|").map(X=>X.trim());T.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(T[1])?(k="day",g={id:T[0].toLowerCase().replace(/\s+/g,"-"),label:T[0],date:T[1],events:[]},w.push(g)):(k="none",g=null),Q++;continue}if(k==="groups"){const V=G.split("|").map(H=>H.trim());if(V.length>=4){const H=V[4]||void 0;b.push({id:V[0],label:V[1],bgClass:V[2],textClass:V[3],...H?{description:H}:{}})}Q++;continue}if(k==="notes"){y=y?`${y}
${G}`:G,Q++;continue}if(k==="vitals"){const V=tu(G);if(V){const[H,T]=V;if(H==="attended")B.attended=T.split(",").map(X=>X.trim()).filter(Boolean),Q++;else if(H==="summary"){const{text:X,next:L}=eu(d,Q+1,T);B.summary=X||void 0,Q=L}else Q++}else Q++;continue}if(k==="media"){const V=a0(G);V&&E.push(V),Q++;continue}if(k==="car"){const V=tu(G);if(V){const[H,T]=V;H==="tires"?z.tires=T:H==="brakes"?z.brakes=T:H==="ride height"||H==="rideheight"?z.rideHeight=T:H==="alignment"?z.alignment=T:H==="aids"&&(z.aids=T)}Q++;continue}if(k==="day"&&g){if(q==="weather"&&g.weather){const V=tu(G);if(V){const[H,T]=V,X=g.weather;if(H==="high")X.highF=zl(T);else if(H==="low")X.lowF=zl(T);else if(H==="track")X.trackTempF=zl(T);else if(H==="precip"){const L=T.toLowerCase();pp.includes(L)&&(X.precipitation=L)}else if(H==="notes"){const{text:L,next:U}=eu(d,Q+1,T);X.notes=L||void 0,Q=U;continue}}Q++;continue}if(q==="session"&&Y){const V=tu(G);if(V){const[H,T]=V,X=Y;if(H==="notes"){const{text:L,next:U}=eu(d,Q+1,T);X.notes=L||void 0,Q=U;continue}if(H==="tires cold"||H==="tires hot"){X.tirePressures=X.tirePressures??{};const L=gp(T);H==="tires cold"?X.tirePressures.cold=L:X.tirePressures.hot=L}else if(H==="tires unit")X.tirePressures=X.tirePressures??{},(T==="psi"||T==="bar")&&(X.tirePressures.unit=T);else if(H==="aids")X.carAids=T;else if(H==="media"){const L=a0(T);L&&(X.media=[...X.media??[],L])}else if(H.startsWith("eval.")){const L=H.slice(5);X.instructorEval=X.instructorEval??{};const U=X.instructorEval;if(L==="track")U.track=T;else if(L==="instructor")U.instructor=T;else if(L==="student")U.student=T;else if(L==="car")U.car=T;else if(L==="aggressiveness=skill")U.aggressivenessEqualsSkill=/^y/i.test(T);else if(L==="aidsoveractivated")U.aidsOveractivatedPct=zl(T);else if(L==="recommend.samedirection")U.recommend={...U.recommend,sameDirection:T};else if(L==="recommend.newdirection")U.recommend={...U.recommend,newDirection:T};else if(L==="recommend.newtrack")U.recommend={...U.recommend,newTrack:T};else if(L==="notes"){const{text:J,next:F}=eu(d,Q+1,T);U.notes=J||void 0,Q=F;continue}else if(L.startsWith("skill.")){const J=yp[L.slice(6)];J&&(U.skills=U.skills??{},U.skills[J]=zl(T))}}}Q++;continue}if(/^\d{2}:\d{2}/.test(G)){const V=vp(G);V&&g.events.push(V)}else if(/^break\s*\|/.test(G)){const V=G.slice(G.indexOf("|")+1).trim();g.events.push({type:"break",label:V})}Q++;continue}Q++}return{id:c,name:s,subtitle:f,...m?{link:m}:{},runGroups:b,days:w,...y?{notes:y}:{},...Object.keys(B).length?{vitals:B}:{},...E.length?{media:E}:{},...Object.keys(z).length?{carConfig:z}:{}}}function vp(c){const o=c.split("|").map(w=>w.trim()),d=o[0],s=o.slice(1),f=d.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!f)return null;const m=f[1],b=f[2].trim();if(/^(general|lunch|special)$/.test(b)){const w=b,g=s[0]??"",y=s[1]||void 0;return{time:m,type:w,label:g,...y?{subtitle:y}:{}}}if(/^session/.test(b)){const w=b.match(/^session\s+(\d+)/),g=w?parseInt(w[1],10):void 0;let y=[],B=[],E;for(const z of s)z.startsWith("on:")?y=z.slice(3).trim().split(",").map(k=>k.trim()).filter(Boolean):z.startsWith("in:")?B=z.slice(3).trim().split(",").map(k=>k.trim()).filter(Boolean):z.startsWith("note:")&&(E=z.slice(5).trim()||void 0);return{time:m,type:"session",...g!==void 0?{sessionNumber:g}:{},onTrack:y,...B.length?{inClass:B}:{},...E?{note:E}:{}}}return null}const bp=`# MSRC 1.7
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
`,xp="/hpde/assets/msrc-1-7-D9G0r_nf.jpg",Sp={...Ol("2026-09-11_msrc-1-7",bp),mapImage:xp},wp=`# TXR SCCA
subtitle: Sep 13, 2026 · MSR
link: https://www.motorsportreg.com/events/txr-scca-time-trial-track-day-hpde-7-motorsport-ranch-cresson-texas-556724

## groups
red    | Red    | bg-runred-500    | text-white | Time Trial
green  | Green  | bg-rungreen-500  | text-white | Time Trial
purple | Purple | bg-runpurple-500 | text-white | Time Trial
orange | Orange | bg-runorange-500 | text-white | Track Day
blue   | Blue   | bg-runblue-500   | text-white | Novice

## notes
Great first time out at this layout. Car ran strong all day, no issues.
Coned off in session 3 but no contact — backed off and reset.

## vitals
attended: John Harms (instructor)
summary: Warm, clear day. Small field, lots of track time.

## media
photos | Weekend photo album | https://photos.example.com/txr-scca-2026-09-13
video | Session 1 onboard (Garmin Catalyst) | https://drive.garmin.com/example/session-1

## car
tires: Michelin PS4S 245/40R18, all four fresh
brakes: Ferodo DS2500 front, stock rear
ride height: stock
alignment: -2.0 front camber, zero toe
aids: PSM Sport, TC off, ABS on

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

### weather
high: 88
low: 68
track: 112
precip: dry
notes: Windy in the afternoon, some dust on track after lunch.

### session 1
notes: Really happy with braking today. Picked up more confidence carrying speed into Turn 3.
tires cold: fl=32 fr=32 rl=30 rr=30
tires hot: fl=38 fr=37 rl=34 rr=33
eval.track: MSRC 1.7cw
eval.instructor: John Harms
eval.student: Vera Maxakova
eval.car: Porsche Panamerica
eval.skill.flags: 65
eval.skill.passing: 95
eval.skill.smoothInputs: 95
eval.skill.looksAhead: 80
eval.skill.consistency: 80
eval.skill.carControl: 95
eval.skill.pace: 95
eval.skill.referencePoints: 95
eval.skill.trackAwareness: 95
eval.aggressiveness=skill: yes
eval.aidsOveractivated: 25
eval.recommend.sameDirection: blue
eval.recommend.newDirection: green
eval.recommend.newTrack: green
eval.notes: Worked on braking successfully (as noted from previous instructor), picked up on initial hard braking and then slowly releasing and then going to throttle. Got comfortable carrying speed through corners, using throttle control to have car turn through the corning. Overall, very smooth and got faster as the session went on.
media: video | Session 1 onboard | https://drive.garmin.com/example/session-1

### session 3
notes: Coned off at the exit of Turn 5 — backed off early, no contact.
tires cold: fl=31 fr=31 rl=29 rr=29
tires hot: fl=40 fr=39 rl=35 rr=34
`,Ep=Ol("2026-09-13_msr-scca",wp),Tp=`# MSRC 1.7 Fast Track
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
`,Np=Ol("2026-06-06_msrc-1-7",Tp),Cp=`# MSRC 3.1
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
`,Ap=Ol("2025-11-07_msrc-3-1",Cp),_p=`# ECR 2.7
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
`,Rp=Ol("2026-05-30_ecr-2-7",_p),nu=[Sp,Ep,Np,Rp,Ap].sort((c,o)=>o.id.localeCompare(c.id));function au(c,o){const[d,s]=yt.useState(()=>{try{const f=localStorage.getItem(c);return f!==null?JSON.parse(f):o}catch{return o}});return yt.useEffect(()=>{localStorage.setItem(c,JSON.stringify(d))},[c,d]),[d,s]}function y0(c){const o=d0();return c.days.find(d=>d.date===o)}function l0(c){return y0(c)??c.days[0]}function Mp(){const[c,o]=yt.useState(()=>window.location.hash);return yt.useEffect(()=>{const d=()=>{o(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",d),()=>window.removeEventListener("hashchange",d)},[]),c}function zp(){var H;const c=Mp(),[o,d]=yt.useState("schedule"),[s,f]=au("hpde:activeEvent",nu[0].id),[m,b]=au("hpde:activeDay",null),[w,g]=au("hpde:groups",[]),[y,B]=au("hpde:hidePast",!1),E=nu.find(T=>T.id===s)??nu[0],z=E.days.find(T=>T.id===m)??l0(E),k=y0(E),q=z.date===d0(),Y=E.days.length>1,[,Q]=yt.useState(0);yt.useEffect(()=>{if(!q)return;const T=setInterval(()=>Q(X=>X+1),6e4);return()=>clearInterval(T)},[q]);const G=q&&z.events.some(T=>T.type!=="break"&&en(T.time)<ir());function V(T){f(T.id),b(l0(T).id),g([])}return c==="#/widget-script"?h.jsx(R1,{}):c==="#/share"?h.jsx(P1,{}):c==="#/car"?h.jsx(rp,{}):h.jsx(A1,{children:h.jsxs("div",{className:"min-h-screen bg-gray-50",children:[h.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[h.jsxs("div",{className:"mb-4 flex items-start justify-between gap-3",children:[h.jsx(T1,{events:nu,active:E,onChange:V}),h.jsxs("div",{className:"flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start",children:[h.jsx("button",{onClick:()=>d("schedule"),className:`rounded-md p-2 transition-colors ${o==="schedule"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:h.jsx(e1,{size:18})}),h.jsx("button",{onClick:()=>d("map"),className:`rounded-md p-2 transition-colors ${o==="map"?"bg-white text-gray-900 shadow-sm":"text-gray-400 hover:text-gray-600"}`,style:{minWidth:36,minHeight:36},children:h.jsx(Sh,{size:18})})]})]}),o==="schedule"&&h.jsxs(h.Fragment,{children:[Y&&h.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[h.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:E.days.map(T=>h.jsx("button",{onClick:()=>b(T.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${z.id===T.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:T.label},T.id))}),h.jsx("button",{onClick:()=>k&&b(k.id),disabled:q||!k,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${q||!k?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),h.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[h.jsx(E1,{groups:E.runGroups,selected:w,onChange:g}),G&&h.jsx(N1,{checked:y,onChange:()=>B(T=>!T),label:"Hide past events"})]}),z.weather&&h.jsx("div",{className:"mb-4",children:h.jsx(dp,{weather:z.weather})}),h.jsx(w1,{events:z.events,runGroups:E.runGroups,isToday:q,selectedGroups:w,hidePast:y,sessionLogs:z.sessionLogs}),h.jsx(_1,{groups:E.runGroups}),(E.notes||E.vitals||E.carConfig||E.media&&E.media.length>0)&&h.jsxs("div",{className:"mt-2 flex flex-col gap-2",children:[E.notes&&h.jsx(er,{title:"Notes",children:h.jsx("p",{className:"whitespace-pre-line text-sm text-gray-600",children:E.notes})}),E.vitals&&(E.vitals.summary||(((H=E.vitals.attended)==null?void 0:H.length)??0)>0)&&h.jsx(er,{title:"Event vitals",children:h.jsxs("div",{className:"flex flex-col gap-2 text-sm text-gray-600",children:[E.vitals.summary&&h.jsx("p",{children:E.vitals.summary}),E.vitals.attended&&E.vitals.attended.length>0&&h.jsxs("p",{children:[h.jsx("span",{className:"font-medium text-gray-900",children:"Who was there:"})," ",E.vitals.attended.join(", ")]})]})}),E.carConfig&&h.jsx(er,{title:"Car setup",children:h.jsxs("dl",{className:"flex flex-col gap-1.5 text-sm text-gray-600",children:[E.carConfig.tires&&h.jsxs("div",{children:[h.jsx("dt",{className:"inline font-medium text-gray-900",children:"Tires: "}),h.jsx("dd",{className:"inline",children:E.carConfig.tires})]}),E.carConfig.brakes&&h.jsxs("div",{children:[h.jsx("dt",{className:"inline font-medium text-gray-900",children:"Brakes: "}),h.jsx("dd",{className:"inline",children:E.carConfig.brakes})]}),E.carConfig.rideHeight&&h.jsxs("div",{children:[h.jsx("dt",{className:"inline font-medium text-gray-900",children:"Ride height: "}),h.jsx("dd",{className:"inline",children:E.carConfig.rideHeight})]}),E.carConfig.alignment&&h.jsxs("div",{children:[h.jsx("dt",{className:"inline font-medium text-gray-900",children:"Alignment: "}),h.jsx("dd",{className:"inline",children:E.carConfig.alignment})]}),E.carConfig.aids&&h.jsxs("div",{children:[h.jsx("dt",{className:"inline font-medium text-gray-900",children:"Car aids: "}),h.jsx("dd",{className:"inline",children:E.carConfig.aids})]})]})}),E.media&&E.media.length>0&&h.jsx(r0,{media:E.media})]})]}),o==="map"&&(E.mapImage?h.jsx("div",{className:"overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:h.jsx("img",{src:E.mapImage,alt:`${E.name} track map`,className:"block w-full h-auto"})}):h.jsx("div",{className:"flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm",children:h.jsxs("div",{className:"text-center",children:[h.jsx(Sh,{size:40,className:"mx-auto mb-2 opacity-30"}),h.jsx("p",{className:"text-sm",children:"Track map coming soon"})]})}))]}),h.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[h.jsxs("div",{children:[h.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",h.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})," · ",h.jsx("a",{href:"#/car",className:"text-gray-600 underline hover:text-gray-800",children:"Car"})]}),h.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",v1("2026-09-16T15:44:23-05:00")]})]})]})})}Wg.createRoot(document.getElementById("root")).render(h.jsx(yt.StrictMode,{children:h.jsx(zp,{})}));
