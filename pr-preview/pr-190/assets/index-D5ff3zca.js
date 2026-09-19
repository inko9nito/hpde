(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))o(f);new MutationObserver(f=>{for(const d of f)if(d.type==="childList")for(const v of d.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&o(v)}).observe(document,{childList:!0,subtree:!0});function h(f){const d={};return f.integrity&&(d.integrity=f.integrity),f.referrerPolicy&&(d.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?d.credentials="include":f.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(f){if(f.ep)return;f.ep=!0;const d=h(f);fetch(f.href,d)}})();function L0(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var xs={exports:{}},Dl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sh;function j0(){if(sh)return Dl;sh=1;var s=Symbol.for("react.transitional.element"),c=Symbol.for("react.fragment");function h(o,f,d){var v=null;if(d!==void 0&&(v=""+d),f.key!==void 0&&(v=""+f.key),"key"in f){d={};for(var T in f)T!=="key"&&(d[T]=f[T])}else d=f;return f=d.ref,{$$typeof:s,type:o,key:v,ref:f!==void 0?f:null,props:d}}return Dl.Fragment=c,Dl.jsx=h,Dl.jsxs=h,Dl}var rh;function Y0(){return rh||(rh=1,xs.exports=j0()),xs.exports}var p=Y0(),As={exports:{}},st={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ch;function q0(){if(ch)return st;ch=1;var s=Symbol.for("react.transitional.element"),c=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),v=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),w=Symbol.for("react.memo"),O=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),B=Symbol.iterator;function L(b){return b===null||typeof b!="object"?null:(b=B&&b[B]||b["@@iterator"],typeof b=="function"?b:null)}var q={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},V=Object.assign,I={};function j(b,z,G){this.props=b,this.context=z,this.refs=I,this.updater=G||q}j.prototype.isReactComponent={},j.prototype.setState=function(b,z){if(typeof b!="object"&&typeof b!="function"&&b!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,b,z,"setState")},j.prototype.forceUpdate=function(b){this.updater.enqueueForceUpdate(this,b,"forceUpdate")};function N(){}N.prototype=j.prototype;function Y(b,z,G){this.props=b,this.context=z,this.refs=I,this.updater=G||q}var K=Y.prototype=new N;K.constructor=Y,V(K,j.prototype),K.isPureReactComponent=!0;var ut=Array.isArray;function U(){}var H={H:null,A:null,T:null,S:null},Q=Object.prototype.hasOwnProperty;function Z(b,z,G){var F=G.ref;return{$$typeof:s,type:b,key:z,ref:F!==void 0?F:null,props:G}}function nt(b,z){return Z(b.type,z,b.props)}function P(b){return typeof b=="object"&&b!==null&&b.$$typeof===s}function W(b){var z={"=":"=0",":":"=2"};return"$"+b.replace(/[=:]/g,function(G){return z[G]})}var tt=/\/+/g;function it(b,z){return typeof b=="object"&&b!==null&&b.key!=null?W(""+b.key):z.toString(36)}function jt(b){switch(b.status){case"fulfilled":return b.value;case"rejected":throw b.reason;default:switch(typeof b.status=="string"?b.then(U,U):(b.status="pending",b.then(function(z){b.status==="pending"&&(b.status="fulfilled",b.value=z)},function(z){b.status==="pending"&&(b.status="rejected",b.reason=z)})),b.status){case"fulfilled":return b.value;case"rejected":throw b.reason}}throw b}function _(b,z,G,F,ot){var dt=typeof b;(dt==="undefined"||dt==="boolean")&&(b=null);var ht=!1;if(b===null)ht=!0;else switch(dt){case"bigint":case"string":case"number":ht=!0;break;case"object":switch(b.$$typeof){case s:case c:ht=!0;break;case O:return ht=b._init,_(ht(b._payload),z,G,F,ot)}}if(ht)return ot=ot(b),ht=F===""?"."+it(b,0):F,ut(ot)?(G="",ht!=null&&(G=ht.replace(tt,"$&/")+"/"),_(ot,z,G,"",function(Be){return Be})):ot!=null&&(P(ot)&&(ot=nt(ot,G+(ot.key==null||b&&b.key===ot.key?"":(""+ot.key).replace(tt,"$&/")+"/")+ht)),z.push(ot)),1;ht=0;var Rt=F===""?".":F+":";if(ut(b))for(var Ct=0;Ct<b.length;Ct++)F=b[Ct],dt=Rt+it(F,Ct),ht+=_(F,z,G,dt,ot);else if(Ct=L(b),typeof Ct=="function")for(b=Ct.call(b),Ct=0;!(F=b.next()).done;)F=F.value,dt=Rt+it(F,Ct++),ht+=_(F,z,G,dt,ot);else if(dt==="object"){if(typeof b.then=="function")return _(jt(b),z,G,F,ot);throw z=String(b),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(b).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.")}return ht}function X(b,z,G){if(b==null)return b;var F=[],ot=0;return _(b,F,"","",function(dt){return z.call(G,dt,ot++)}),F}function at(b){if(b._status===-1){var z=b._result;z=z(),z.then(function(G){(b._status===0||b._status===-1)&&(b._status=1,b._result=G)},function(G){(b._status===0||b._status===-1)&&(b._status=2,b._result=G)}),b._status===-1&&(b._status=0,b._result=z)}if(b._status===1)return b._result.default;throw b._result}var Et=typeof reportError=="function"?reportError:function(b){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof b=="object"&&b!==null&&typeof b.message=="string"?String(b.message):String(b),error:b});if(!window.dispatchEvent(z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",b);return}console.error(b)},St={map:X,forEach:function(b,z,G){X(b,function(){z.apply(this,arguments)},G)},count:function(b){var z=0;return X(b,function(){z++}),z},toArray:function(b){return X(b,function(z){return z})||[]},only:function(b){if(!P(b))throw Error("React.Children.only expected to receive a single React element child.");return b}};return st.Activity=D,st.Children=St,st.Component=j,st.Fragment=h,st.Profiler=f,st.PureComponent=Y,st.StrictMode=o,st.Suspense=g,st.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=H,st.__COMPILER_RUNTIME={__proto__:null,c:function(b){return H.H.useMemoCache(b)}},st.cache=function(b){return function(){return b.apply(null,arguments)}},st.cacheSignal=function(){return null},st.cloneElement=function(b,z,G){if(b==null)throw Error("The argument must be a React element, but you passed "+b+".");var F=V({},b.props),ot=b.key;if(z!=null)for(dt in z.key!==void 0&&(ot=""+z.key),z)!Q.call(z,dt)||dt==="key"||dt==="__self"||dt==="__source"||dt==="ref"&&z.ref===void 0||(F[dt]=z[dt]);var dt=arguments.length-2;if(dt===1)F.children=G;else if(1<dt){for(var ht=Array(dt),Rt=0;Rt<dt;Rt++)ht[Rt]=arguments[Rt+2];F.children=ht}return Z(b.type,ot,F)},st.createContext=function(b){return b={$$typeof:v,_currentValue:b,_currentValue2:b,_threadCount:0,Provider:null,Consumer:null},b.Provider=b,b.Consumer={$$typeof:d,_context:b},b},st.createElement=function(b,z,G){var F,ot={},dt=null;if(z!=null)for(F in z.key!==void 0&&(dt=""+z.key),z)Q.call(z,F)&&F!=="key"&&F!=="__self"&&F!=="__source"&&(ot[F]=z[F]);var ht=arguments.length-2;if(ht===1)ot.children=G;else if(1<ht){for(var Rt=Array(ht),Ct=0;Ct<ht;Ct++)Rt[Ct]=arguments[Ct+2];ot.children=Rt}if(b&&b.defaultProps)for(F in ht=b.defaultProps,ht)ot[F]===void 0&&(ot[F]=ht[F]);return Z(b,dt,ot)},st.createRef=function(){return{current:null}},st.forwardRef=function(b){return{$$typeof:T,render:b}},st.isValidElement=P,st.lazy=function(b){return{$$typeof:O,_payload:{_status:-1,_result:b},_init:at}},st.memo=function(b,z){return{$$typeof:w,type:b,compare:z===void 0?null:z}},st.startTransition=function(b){var z=H.T,G={};H.T=G;try{var F=b(),ot=H.S;ot!==null&&ot(G,F),typeof F=="object"&&F!==null&&typeof F.then=="function"&&F.then(U,Et)}catch(dt){Et(dt)}finally{z!==null&&G.types!==null&&(z.types=G.types),H.T=z}},st.unstable_useCacheRefresh=function(){return H.H.useCacheRefresh()},st.use=function(b){return H.H.use(b)},st.useActionState=function(b,z,G){return H.H.useActionState(b,z,G)},st.useCallback=function(b,z){return H.H.useCallback(b,z)},st.useContext=function(b){return H.H.useContext(b)},st.useDebugValue=function(){},st.useDeferredValue=function(b,z){return H.H.useDeferredValue(b,z)},st.useEffect=function(b,z){return H.H.useEffect(b,z)},st.useEffectEvent=function(b){return H.H.useEffectEvent(b)},st.useId=function(){return H.H.useId()},st.useImperativeHandle=function(b,z,G){return H.H.useImperativeHandle(b,z,G)},st.useInsertionEffect=function(b,z){return H.H.useInsertionEffect(b,z)},st.useLayoutEffect=function(b,z){return H.H.useLayoutEffect(b,z)},st.useMemo=function(b,z){return H.H.useMemo(b,z)},st.useOptimistic=function(b,z){return H.H.useOptimistic(b,z)},st.useReducer=function(b,z,G){return H.H.useReducer(b,z,G)},st.useRef=function(b){return H.H.useRef(b)},st.useState=function(b){return H.H.useState(b)},st.useSyncExternalStore=function(b,z,G){return H.H.useSyncExternalStore(b,z,G)},st.useTransition=function(){return H.H.useTransition()},st.version="19.2.6",st}var fh;function nr(){return fh||(fh=1,As.exports=q0()),As.exports}var ct=nr(),Cs={exports:{}},Rl={},Ns={exports:{}},_s={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dh;function G0(){return dh||(dh=1,(function(s){function c(_,X){var at=_.length;_.push(X);t:for(;0<at;){var Et=at-1>>>1,St=_[Et];if(0<f(St,X))_[Et]=X,_[at]=St,at=Et;else break t}}function h(_){return _.length===0?null:_[0]}function o(_){if(_.length===0)return null;var X=_[0],at=_.pop();if(at!==X){_[0]=at;t:for(var Et=0,St=_.length,b=St>>>1;Et<b;){var z=2*(Et+1)-1,G=_[z],F=z+1,ot=_[F];if(0>f(G,at))F<St&&0>f(ot,G)?(_[Et]=ot,_[F]=at,Et=F):(_[Et]=G,_[z]=at,Et=z);else if(F<St&&0>f(ot,at))_[Et]=ot,_[F]=at,Et=F;else break t}}return X}function f(_,X){var at=_.sortIndex-X.sortIndex;return at!==0?at:_.id-X.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;s.unstable_now=function(){return d.now()}}else{var v=Date,T=v.now();s.unstable_now=function(){return v.now()-T}}var g=[],w=[],O=1,D=null,B=3,L=!1,q=!1,V=!1,I=!1,j=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,Y=typeof setImmediate<"u"?setImmediate:null;function K(_){for(var X=h(w);X!==null;){if(X.callback===null)o(w);else if(X.startTime<=_)o(w),X.sortIndex=X.expirationTime,c(g,X);else break;X=h(w)}}function ut(_){if(V=!1,K(_),!q)if(h(g)!==null)q=!0,U||(U=!0,W());else{var X=h(w);X!==null&&jt(ut,X.startTime-_)}}var U=!1,H=-1,Q=5,Z=-1;function nt(){return I?!0:!(s.unstable_now()-Z<Q)}function P(){if(I=!1,U){var _=s.unstable_now();Z=_;var X=!0;try{t:{q=!1,V&&(V=!1,N(H),H=-1),L=!0;var at=B;try{e:{for(K(_),D=h(g);D!==null&&!(D.expirationTime>_&&nt());){var Et=D.callback;if(typeof Et=="function"){D.callback=null,B=D.priorityLevel;var St=Et(D.expirationTime<=_);if(_=s.unstable_now(),typeof St=="function"){D.callback=St,K(_),X=!0;break e}D===h(g)&&o(g),K(_)}else o(g);D=h(g)}if(D!==null)X=!0;else{var b=h(w);b!==null&&jt(ut,b.startTime-_),X=!1}}break t}finally{D=null,B=at,L=!1}X=void 0}}finally{X?W():U=!1}}}var W;if(typeof Y=="function")W=function(){Y(P)};else if(typeof MessageChannel<"u"){var tt=new MessageChannel,it=tt.port2;tt.port1.onmessage=P,W=function(){it.postMessage(null)}}else W=function(){j(P,0)};function jt(_,X){H=j(function(){_(s.unstable_now())},X)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(_){_.callback=null},s.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<_?Math.floor(1e3/_):5},s.unstable_getCurrentPriorityLevel=function(){return B},s.unstable_next=function(_){switch(B){case 1:case 2:case 3:var X=3;break;default:X=B}var at=B;B=X;try{return _()}finally{B=at}},s.unstable_requestPaint=function(){I=!0},s.unstable_runWithPriority=function(_,X){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var at=B;B=_;try{return X()}finally{B=at}},s.unstable_scheduleCallback=function(_,X,at){var Et=s.unstable_now();switch(typeof at=="object"&&at!==null?(at=at.delay,at=typeof at=="number"&&0<at?Et+at:Et):at=Et,_){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=at+St,_={id:O++,callback:X,priorityLevel:_,startTime:at,expirationTime:St,sortIndex:-1},at>Et?(_.sortIndex=at,c(w,_),h(g)===null&&_===h(w)&&(V?(N(H),H=-1):V=!0,jt(ut,at-Et))):(_.sortIndex=St,c(g,_),q||L||(q=!0,U||(U=!0,W()))),_},s.unstable_shouldYield=nt,s.unstable_wrapCallback=function(_){var X=B;return function(){var at=B;B=X;try{return _.apply(this,arguments)}finally{B=at}}}})(_s)),_s}var hh;function X0(){return hh||(hh=1,Ns.exports=G0()),Ns.exports}var Ms={exports:{}},Pt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gh;function V0(){if(gh)return Pt;gh=1;var s=nr();function c(g){var w="https://react.dev/errors/"+g;if(1<arguments.length){w+="?args[]="+encodeURIComponent(arguments[1]);for(var O=2;O<arguments.length;O++)w+="&args[]="+encodeURIComponent(arguments[O])}return"Minified React error #"+g+"; visit "+w+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(){}var o={d:{f:h,r:function(){throw Error(c(522))},D:h,C:h,L:h,m:h,X:h,S:h,M:h},p:0,findDOMNode:null},f=Symbol.for("react.portal");function d(g,w,O){var D=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:f,key:D==null?null:""+D,children:g,containerInfo:w,implementation:O}}var v=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function T(g,w){if(g==="font")return"";if(typeof w=="string")return w==="use-credentials"?w:""}return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,Pt.createPortal=function(g,w){var O=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!w||w.nodeType!==1&&w.nodeType!==9&&w.nodeType!==11)throw Error(c(299));return d(g,w,null,O)},Pt.flushSync=function(g){var w=v.T,O=o.p;try{if(v.T=null,o.p=2,g)return g()}finally{v.T=w,o.p=O,o.d.f()}},Pt.preconnect=function(g,w){typeof g=="string"&&(w?(w=w.crossOrigin,w=typeof w=="string"?w==="use-credentials"?w:"":void 0):w=null,o.d.C(g,w))},Pt.prefetchDNS=function(g){typeof g=="string"&&o.d.D(g)},Pt.preinit=function(g,w){if(typeof g=="string"&&w&&typeof w.as=="string"){var O=w.as,D=T(O,w.crossOrigin),B=typeof w.integrity=="string"?w.integrity:void 0,L=typeof w.fetchPriority=="string"?w.fetchPriority:void 0;O==="style"?o.d.S(g,typeof w.precedence=="string"?w.precedence:void 0,{crossOrigin:D,integrity:B,fetchPriority:L}):O==="script"&&o.d.X(g,{crossOrigin:D,integrity:B,fetchPriority:L,nonce:typeof w.nonce=="string"?w.nonce:void 0})}},Pt.preinitModule=function(g,w){if(typeof g=="string")if(typeof w=="object"&&w!==null){if(w.as==null||w.as==="script"){var O=T(w.as,w.crossOrigin);o.d.M(g,{crossOrigin:O,integrity:typeof w.integrity=="string"?w.integrity:void 0,nonce:typeof w.nonce=="string"?w.nonce:void 0})}}else w==null&&o.d.M(g)},Pt.preload=function(g,w){if(typeof g=="string"&&typeof w=="object"&&w!==null&&typeof w.as=="string"){var O=w.as,D=T(O,w.crossOrigin);o.d.L(g,O,{crossOrigin:D,integrity:typeof w.integrity=="string"?w.integrity:void 0,nonce:typeof w.nonce=="string"?w.nonce:void 0,type:typeof w.type=="string"?w.type:void 0,fetchPriority:typeof w.fetchPriority=="string"?w.fetchPriority:void 0,referrerPolicy:typeof w.referrerPolicy=="string"?w.referrerPolicy:void 0,imageSrcSet:typeof w.imageSrcSet=="string"?w.imageSrcSet:void 0,imageSizes:typeof w.imageSizes=="string"?w.imageSizes:void 0,media:typeof w.media=="string"?w.media:void 0})}},Pt.preloadModule=function(g,w){if(typeof g=="string")if(w){var O=T(w.as,w.crossOrigin);o.d.m(g,{as:typeof w.as=="string"&&w.as!=="script"?w.as:void 0,crossOrigin:O,integrity:typeof w.integrity=="string"?w.integrity:void 0})}else o.d.m(g)},Pt.requestFormReset=function(g){o.d.r(g)},Pt.unstable_batchedUpdates=function(g,w){return g(w)},Pt.useFormState=function(g,w,O){return v.H.useFormState(g,w,O)},Pt.useFormStatus=function(){return v.H.useHostTransitionStatus()},Pt.version="19.2.6",Pt}var mh;function Q0(){if(mh)return Ms.exports;mh=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(c){console.error(c)}}return s(),Ms.exports=V0(),Ms.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ph;function Z0(){if(ph)return Rl;ph=1;var s=X0(),c=nr(),h=Q0();function o(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function d(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function v(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function T(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function g(t){if(d(t)!==t)throw Error(o(188))}function w(t){var e=t.alternate;if(!e){if(e=d(t),e===null)throw Error(o(188));return e!==t?null:t}for(var n=t,a=e;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return g(l),t;if(i===a)return g(l),e;i=i.sibling}throw Error(o(188))}if(n.return!==a.return)n=l,a=i;else{for(var u=!1,r=l.child;r;){if(r===n){u=!0,n=l,a=i;break}if(r===a){u=!0,a=l,n=i;break}r=r.sibling}if(!u){for(r=i.child;r;){if(r===n){u=!0,n=i,a=l;break}if(r===a){u=!0,a=i,n=l;break}r=r.sibling}if(!u)throw Error(o(189))}}if(n.alternate!==a)throw Error(o(190))}if(n.tag!==3)throw Error(o(188));return n.stateNode.current===n?t:e}function O(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=O(t),e!==null)return e;t=t.sibling}return null}var D=Object.assign,B=Symbol.for("react.element"),L=Symbol.for("react.transitional.element"),q=Symbol.for("react.portal"),V=Symbol.for("react.fragment"),I=Symbol.for("react.strict_mode"),j=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),Y=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),ut=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),H=Symbol.for("react.memo"),Q=Symbol.for("react.lazy"),Z=Symbol.for("react.activity"),nt=Symbol.for("react.memo_cache_sentinel"),P=Symbol.iterator;function W(t){return t===null||typeof t!="object"?null:(t=P&&t[P]||t["@@iterator"],typeof t=="function"?t:null)}var tt=Symbol.for("react.client.reference");function it(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===tt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case V:return"Fragment";case j:return"Profiler";case I:return"StrictMode";case ut:return"Suspense";case U:return"SuspenseList";case Z:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case q:return"Portal";case Y:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case K:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case H:return e=t.displayName||null,e!==null?e:it(t.type)||"Memo";case Q:e=t._payload,t=t._init;try{return it(t(e))}catch{}}return null}var jt=Array.isArray,_=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,at={pending:!1,data:null,method:null,action:null},Et=[],St=-1;function b(t){return{current:t}}function z(t){0>St||(t.current=Et[St],Et[St]=null,St--)}function G(t,e){St++,Et[St]=t.current,t.current=e}var F=b(null),ot=b(null),dt=b(null),ht=b(null);function Rt(t,e){switch(G(dt,e),G(ot,t),G(F,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Rd(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Rd(e),t=kd(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}z(F),G(F,t)}function Ct(){z(F),z(ot),z(dt)}function Be(t){t.memoizedState!==null&&G(ht,t);var e=F.current,n=kd(e,t.type);e!==n&&(G(ot,t),G(F,n))}function Ul(t){ot.current===t&&(z(F),z(ot)),ht.current===t&&(z(ht),Cl._currentValue=at)}var iu,ur;function Mn(t){if(iu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);iu=e&&e[1]||"",ur=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+iu+t+ur}var uu=!1;function ou(t,e){if(!t||uu)return"";uu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var k=function(){throw Error()};if(Object.defineProperty(k.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(k,[])}catch(C){var A=C}Reflect.construct(t,[],k)}else{try{k.call()}catch(C){A=C}t.call(k.prototype)}}else{try{throw Error()}catch(C){A=C}(k=t())&&typeof k.catch=="function"&&k.catch(function(){})}}catch(C){if(C&&A&&typeof C.stack=="string")return[C.stack,A.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),u=i[0],r=i[1];if(u&&r){var m=u.split(`
`),x=r.split(`
`);for(l=a=0;a<m.length&&!m[a].includes("DetermineComponentFrameRoot");)a++;for(;l<x.length&&!x[l].includes("DetermineComponentFrameRoot");)l++;if(a===m.length||l===x.length)for(a=m.length-1,l=x.length-1;1<=a&&0<=l&&m[a]!==x[l];)l--;for(;1<=a&&0<=l;a--,l--)if(m[a]!==x[l]){if(a!==1||l!==1)do if(a--,l--,0>l||m[a]!==x[l]){var M=`
`+m[a].replace(" at new "," at ");return t.displayName&&M.includes("<anonymous>")&&(M=M.replace("<anonymous>",t.displayName)),M}while(1<=a&&0<=l);break}}}finally{uu=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Mn(n):""}function mg(t,e){switch(t.tag){case 26:case 27:case 5:return Mn(t.type);case 16:return Mn("Lazy");case 13:return t.child!==e&&e!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return ou(t.type,!1);case 11:return ou(t.type.render,!1);case 1:return ou(t.type,!0);case 31:return Mn("Activity");default:return""}}function or(t){try{var e="",n=null;do e+=mg(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var su=Object.prototype.hasOwnProperty,ru=s.unstable_scheduleCallback,cu=s.unstable_cancelCallback,pg=s.unstable_shouldYield,yg=s.unstable_requestPaint,se=s.unstable_now,vg=s.unstable_getCurrentPriorityLevel,sr=s.unstable_ImmediatePriority,rr=s.unstable_UserBlockingPriority,Bl=s.unstable_NormalPriority,bg=s.unstable_LowPriority,cr=s.unstable_IdlePriority,wg=s.log,Sg=s.unstable_setDisableYieldValue,La=null,re=null;function nn(t){if(typeof wg=="function"&&Sg(t),re&&typeof re.setStrictMode=="function")try{re.setStrictMode(La,t)}catch{}}var ce=Math.clz32?Math.clz32:xg,Tg=Math.log,Eg=Math.LN2;function xg(t){return t>>>=0,t===0?32:31-(Tg(t)/Eg|0)|0}var Hl=256,Ll=262144,jl=4194304;function Dn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Yl(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var l=0,i=t.suspendedLanes,u=t.pingedLanes;t=t.warmLanes;var r=a&134217727;return r!==0?(a=r&~i,a!==0?l=Dn(a):(u&=r,u!==0?l=Dn(u):n||(n=r&~t,n!==0&&(l=Dn(n))))):(r=a&~i,r!==0?l=Dn(r):u!==0?l=Dn(u):n||(n=a&~t,n!==0&&(l=Dn(n)))),l===0?0:e!==0&&e!==l&&(e&i)===0&&(i=l&-l,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:l}function ja(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Ag(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function fr(){var t=jl;return jl<<=1,(jl&62914560)===0&&(jl=4194304),t}function fu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ya(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Cg(t,e,n,a,l,i){var u=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var r=t.entanglements,m=t.expirationTimes,x=t.hiddenUpdates;for(n=u&~n;0<n;){var M=31-ce(n),k=1<<M;r[M]=0,m[M]=-1;var A=x[M];if(A!==null)for(x[M]=null,M=0;M<A.length;M++){var C=A[M];C!==null&&(C.lane&=-536870913)}n&=~k}a!==0&&dr(t,a,0),i!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=i&~(u&~e))}function dr(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-ce(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function hr(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-ce(n),l=1<<a;l&e|t[a]&e&&(t[a]|=e),n&=~l}}function gr(t,e){var n=e&-e;return n=(n&42)!==0?1:du(n),(n&(t.suspendedLanes|e))!==0?0:n}function du(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function hu(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function mr(){var t=X.p;return t!==0?t:(t=window.event,t===void 0?32:eh(t.type))}function pr(t,e){var n=X.p;try{return X.p=t,e()}finally{X.p=n}}var an=Math.random().toString(36).slice(2),It="__reactFiber$"+an,ee="__reactProps$"+an,Wn="__reactContainer$"+an,gu="__reactEvents$"+an,Ng="__reactListeners$"+an,_g="__reactHandles$"+an,yr="__reactResources$"+an,qa="__reactMarker$"+an;function mu(t){delete t[It],delete t[ee],delete t[gu],delete t[Ng],delete t[_g]}function $n(t){var e=t[It];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Wn]||n[It]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=jd(t);t!==null;){if(n=t[It])return n;t=jd(t)}return e}t=n,n=t.parentNode}return null}function Pn(t){if(t=t[It]||t[Wn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Ga(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(o(33))}function ta(t){var e=t[yr];return e||(e=t[yr]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Qt(t){t[qa]=!0}var vr=new Set,br={};function Rn(t,e){ea(t,e),ea(t+"Capture",e)}function ea(t,e){for(br[t]=e,t=0;t<e.length;t++)vr.add(e[t])}var Mg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),wr={},Sr={};function Dg(t){return su.call(Sr,t)?!0:su.call(wr,t)?!1:Mg.test(t)?Sr[t]=!0:(wr[t]=!0,!1)}function ql(t,e,n){if(Dg(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Gl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function He(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function ve(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Tr(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Rg(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return l.call(this)},set:function(u){n=""+u,i.call(this,u)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function pu(t){if(!t._valueTracker){var e=Tr(t)?"checked":"value";t._valueTracker=Rg(t,e,""+t[e])}}function Er(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=Tr(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function Xl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var kg=/[\n"\\]/g;function be(t){return t.replace(kg,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function yu(t,e,n,a,l,i,u,r){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ve(e)):t.value!==""+ve(e)&&(t.value=""+ve(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?vu(t,u,ve(e)):n!=null?vu(t,u,ve(n)):a!=null&&t.removeAttribute("value"),l==null&&i!=null&&(t.defaultChecked=!!i),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.name=""+ve(r):t.removeAttribute("name")}function xr(t,e,n,a,l,i,u,r){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){pu(t);return}n=n!=null?""+ve(n):"",e=e!=null?""+ve(e):n,r||e===t.value||(t.value=e),t.defaultValue=e}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=r?t.checked:!!a,t.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u),pu(t)}function vu(t,e,n){e==="number"&&Xl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function na(t,e,n,a){if(t=t.options,e){e={};for(var l=0;l<n.length;l++)e["$"+n[l]]=!0;for(n=0;n<t.length;n++)l=e.hasOwnProperty("$"+t[n].value),t[n].selected!==l&&(t[n].selected=l),l&&a&&(t[n].defaultSelected=!0)}else{for(n=""+ve(n),e=null,l=0;l<t.length;l++){if(t[l].value===n){t[l].selected=!0,a&&(t[l].defaultSelected=!0);return}e!==null||t[l].disabled||(e=t[l])}e!==null&&(e.selected=!0)}}function Ar(t,e,n){if(e!=null&&(e=""+ve(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+ve(n):""}function Cr(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(o(92));if(jt(a)){if(1<a.length)throw Error(o(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=ve(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),pu(t)}function aa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var zg=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Nr(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||zg.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function _r(t,e,n){if(e!=null&&typeof e!="object")throw Error(o(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var l in e)a=e[l],e.hasOwnProperty(l)&&n[l]!==a&&Nr(t,l,a)}else for(var i in e)e.hasOwnProperty(i)&&Nr(t,i,e[i])}function bu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Og=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ug=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Vl(t){return Ug.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Le(){}var wu=null;function Su(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var la=null,ia=null;function Mr(t){var e=Pn(t);if(e&&(t=e.stateNode)){var n=t[ee]||null;t:switch(t=e.stateNode,e.type){case"input":if(yu(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var l=a[ee]||null;if(!l)throw Error(o(90));yu(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&Er(a)}break t;case"textarea":Ar(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&na(t,!!n.multiple,e,!1)}}}var Tu=!1;function Dr(t,e,n){if(Tu)return t(e,n);Tu=!0;try{var a=t(e);return a}finally{if(Tu=!1,(la!==null||ia!==null)&&(Ri(),la&&(e=la,t=ia,ia=la=null,Mr(e),t)))for(e=0;e<t.length;e++)Mr(t[e])}}function Xa(t,e){var n=t.stateNode;if(n===null)return null;var a=n[ee]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(o(231,e,typeof n));return n}var je=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Eu=!1;if(je)try{var Va={};Object.defineProperty(Va,"passive",{get:function(){Eu=!0}}),window.addEventListener("test",Va,Va),window.removeEventListener("test",Va,Va)}catch{Eu=!1}var ln=null,xu=null,Ql=null;function Rr(){if(Ql)return Ql;var t,e=xu,n=e.length,a,l="value"in ln?ln.value:ln.textContent,i=l.length;for(t=0;t<n&&e[t]===l[t];t++);var u=n-t;for(a=1;a<=u&&e[n-a]===l[i-a];a++);return Ql=l.slice(t,1<a?1-a:void 0)}function Zl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Kl(){return!0}function kr(){return!1}function ne(t){function e(n,a,l,i,u){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var r in t)t.hasOwnProperty(r)&&(n=t[r],this[r]=n?n(i):i[r]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Kl:kr,this.isPropagationStopped=kr,this}return D(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Kl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Kl)},persist:function(){},isPersistent:Kl}),e}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Il=ne(kn),Qa=D({},kn,{view:0,detail:0}),Bg=ne(Qa),Au,Cu,Za,Jl=D({},Qa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_u,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Za&&(Za&&t.type==="mousemove"?(Au=t.screenX-Za.screenX,Cu=t.screenY-Za.screenY):Cu=Au=0,Za=t),Au)},movementY:function(t){return"movementY"in t?t.movementY:Cu}}),zr=ne(Jl),Hg=D({},Jl,{dataTransfer:0}),Lg=ne(Hg),jg=D({},Qa,{relatedTarget:0}),Nu=ne(jg),Yg=D({},kn,{animationName:0,elapsedTime:0,pseudoElement:0}),qg=ne(Yg),Gg=D({},kn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Xg=ne(Gg),Vg=D({},kn,{data:0}),Or=ne(Vg),Qg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Zg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Kg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ig(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Kg[t])?!!e[t]:!1}function _u(){return Ig}var Jg=D({},Qa,{key:function(t){if(t.key){var e=Qg[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Zg[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_u,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Fg=ne(Jg),Wg=D({},Jl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ur=ne(Wg),$g=D({},Qa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_u}),Pg=ne($g),tm=D({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0}),em=ne(tm),nm=D({},Jl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),am=ne(nm),lm=D({},kn,{newState:0,oldState:0}),im=ne(lm),um=[9,13,27,32],Mu=je&&"CompositionEvent"in window,Ka=null;je&&"documentMode"in document&&(Ka=document.documentMode);var om=je&&"TextEvent"in window&&!Ka,Br=je&&(!Mu||Ka&&8<Ka&&11>=Ka),Hr=" ",Lr=!1;function jr(t,e){switch(t){case"keyup":return um.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Yr(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ua=!1;function sm(t,e){switch(t){case"compositionend":return Yr(e);case"keypress":return e.which!==32?null:(Lr=!0,Hr);case"textInput":return t=e.data,t===Hr&&Lr?null:t;default:return null}}function rm(t,e){if(ua)return t==="compositionend"||!Mu&&jr(t,e)?(t=Rr(),Ql=xu=ln=null,ua=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Br&&e.locale!=="ko"?null:e.data;default:return null}}var cm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qr(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!cm[t.type]:e==="textarea"}function Gr(t,e,n,a){la?ia?ia.push(a):ia=[a]:la=a,e=Li(e,"onChange"),0<e.length&&(n=new Il("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var Ia=null,Ja=null;function fm(t){Ad(t,0)}function Fl(t){var e=Ga(t);if(Er(e))return t}function Xr(t,e){if(t==="change")return e}var Vr=!1;if(je){var Du;if(je){var Ru="oninput"in document;if(!Ru){var Qr=document.createElement("div");Qr.setAttribute("oninput","return;"),Ru=typeof Qr.oninput=="function"}Du=Ru}else Du=!1;Vr=Du&&(!document.documentMode||9<document.documentMode)}function Zr(){Ia&&(Ia.detachEvent("onpropertychange",Kr),Ja=Ia=null)}function Kr(t){if(t.propertyName==="value"&&Fl(Ja)){var e=[];Gr(e,Ja,t,Su(t)),Dr(fm,e)}}function dm(t,e,n){t==="focusin"?(Zr(),Ia=e,Ja=n,Ia.attachEvent("onpropertychange",Kr)):t==="focusout"&&Zr()}function hm(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Fl(Ja)}function gm(t,e){if(t==="click")return Fl(e)}function mm(t,e){if(t==="input"||t==="change")return Fl(e)}function pm(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var fe=typeof Object.is=="function"?Object.is:pm;function Fa(t,e){if(fe(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!su.call(e,l)||!fe(t[l],e[l]))return!1}return!0}function Ir(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Jr(t,e){var n=Ir(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Ir(n)}}function Fr(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Fr(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Wr(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Xl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Xl(t.document)}return e}function ku(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var ym=je&&"documentMode"in document&&11>=document.documentMode,oa=null,zu=null,Wa=null,Ou=!1;function $r(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ou||oa==null||oa!==Xl(a)||(a=oa,"selectionStart"in a&&ku(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Wa&&Fa(Wa,a)||(Wa=a,a=Li(zu,"onSelect"),0<a.length&&(e=new Il("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=oa)))}function zn(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var sa={animationend:zn("Animation","AnimationEnd"),animationiteration:zn("Animation","AnimationIteration"),animationstart:zn("Animation","AnimationStart"),transitionrun:zn("Transition","TransitionRun"),transitionstart:zn("Transition","TransitionStart"),transitioncancel:zn("Transition","TransitionCancel"),transitionend:zn("Transition","TransitionEnd")},Uu={},Pr={};je&&(Pr=document.createElement("div").style,"AnimationEvent"in window||(delete sa.animationend.animation,delete sa.animationiteration.animation,delete sa.animationstart.animation),"TransitionEvent"in window||delete sa.transitionend.transition);function On(t){if(Uu[t])return Uu[t];if(!sa[t])return t;var e=sa[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Pr)return Uu[t]=e[n];return t}var tc=On("animationend"),ec=On("animationiteration"),nc=On("animationstart"),vm=On("transitionrun"),bm=On("transitionstart"),wm=On("transitioncancel"),ac=On("transitionend"),lc=new Map,Bu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Bu.push("scrollEnd");function _e(t,e){lc.set(t,e),Rn(e,[t])}var Wl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},we=[],ra=0,Hu=0;function $l(){for(var t=ra,e=Hu=ra=0;e<t;){var n=we[e];we[e++]=null;var a=we[e];we[e++]=null;var l=we[e];we[e++]=null;var i=we[e];if(we[e++]=null,a!==null&&l!==null){var u=a.pending;u===null?l.next=l:(l.next=u.next,u.next=l),a.pending=l}i!==0&&ic(n,l,i)}}function Pl(t,e,n,a){we[ra++]=t,we[ra++]=e,we[ra++]=n,we[ra++]=a,Hu|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Lu(t,e,n,a){return Pl(t,e,n,a),ti(t)}function Un(t,e){return Pl(t,null,null,e),ti(t)}function ic(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=t.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(l=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,l&&e!==null&&(l=31-ce(n),t=i.hiddenUpdates,a=t[l],a===null?t[l]=[e]:a.push(e),e.lane=n|536870912),i):null}function ti(t){if(50<bl)throw bl=0,Io=null,Error(o(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var ca={};function Sm(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function de(t,e,n,a){return new Sm(t,e,n,a)}function ju(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ye(t,e){var n=t.alternate;return n===null?(n=de(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function uc(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function ei(t,e,n,a,l,i){var u=0;if(a=t,typeof t=="function")ju(t)&&(u=1);else if(typeof t=="string")u=C0(t,n,F.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case Z:return t=de(31,n,e,l),t.elementType=Z,t.lanes=i,t;case V:return Bn(n.children,l,i,e);case I:u=8,l|=24;break;case j:return t=de(12,n,e,l|2),t.elementType=j,t.lanes=i,t;case ut:return t=de(13,n,e,l),t.elementType=ut,t.lanes=i,t;case U:return t=de(19,n,e,l),t.elementType=U,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Y:u=10;break t;case N:u=9;break t;case K:u=11;break t;case H:u=14;break t;case Q:u=16,a=null;break t}u=29,n=Error(o(130,t===null?"null":typeof t,"")),a=null}return e=de(u,n,e,l),e.elementType=t,e.type=a,e.lanes=i,e}function Bn(t,e,n,a){return t=de(7,t,a,e),t.lanes=n,t}function Yu(t,e,n){return t=de(6,t,null,e),t.lanes=n,t}function oc(t){var e=de(18,null,null,0);return e.stateNode=t,e}function qu(t,e,n){return e=de(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var sc=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=sc.get(t);return n!==void 0?n:(e={value:t,source:e,stack:or(e)},sc.set(t,e),e)}return{value:t,source:e,stack:or(e)}}var fa=[],da=0,ni=null,$a=0,Te=[],Ee=0,un=null,Re=1,ke="";function qe(t,e){fa[da++]=$a,fa[da++]=ni,ni=t,$a=e}function rc(t,e,n){Te[Ee++]=Re,Te[Ee++]=ke,Te[Ee++]=un,un=t;var a=Re;t=ke;var l=32-ce(a)-1;a&=~(1<<l),n+=1;var i=32-ce(e)+l;if(30<i){var u=l-l%5;i=(a&(1<<u)-1).toString(32),a>>=u,l-=u,Re=1<<32-ce(e)+l|n<<l|a,ke=i+t}else Re=1<<i|n<<l|a,ke=t}function Gu(t){t.return!==null&&(qe(t,1),rc(t,1,0))}function Xu(t){for(;t===ni;)ni=fa[--da],fa[da]=null,$a=fa[--da],fa[da]=null;for(;t===un;)un=Te[--Ee],Te[Ee]=null,ke=Te[--Ee],Te[Ee]=null,Re=Te[--Ee],Te[Ee]=null}function cc(t,e){Te[Ee++]=Re,Te[Ee++]=ke,Te[Ee++]=un,Re=e.id,ke=e.overflow,un=t}var Jt=null,kt=null,vt=!1,on=null,xe=!1,Vu=Error(o(519));function sn(t){var e=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Pa(Se(e,t)),Vu}function fc(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[It]=t,e[ee]=a,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<Sl.length;n++)mt(Sl[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),xr(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),Cr(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||Md(e.textContent,n)?(a.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),a.onScroll!=null&&mt("scroll",e),a.onScrollEnd!=null&&mt("scrollend",e),a.onClick!=null&&(e.onclick=Le),e=!0):e=!1,e||sn(t,!0)}function dc(t){for(Jt=t.return;Jt;)switch(Jt.tag){case 5:case 31:case 13:xe=!1;return;case 27:case 3:xe=!0;return;default:Jt=Jt.return}}function ha(t){if(t!==Jt)return!1;if(!vt)return dc(t),vt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||rs(t.type,t.memoizedProps)),n=!n),n&&kt&&sn(t),dc(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));kt=Ld(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(317));kt=Ld(t)}else e===27?(e=kt,Tn(t.type)?(t=gs,gs=null,kt=t):kt=e):kt=Jt?Ce(t.stateNode.nextSibling):null;return!0}function Hn(){kt=Jt=null,vt=!1}function Qu(){var t=on;return t!==null&&(ue===null?ue=t:ue.push.apply(ue,t),on=null),t}function Pa(t){on===null?on=[t]:on.push(t)}var Zu=b(null),Ln=null,Ge=null;function rn(t,e,n){G(Zu,e._currentValue),e._currentValue=n}function Xe(t){t._currentValue=Zu.current,z(Zu)}function Ku(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Iu(t,e,n,a){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){var u=l.child;i=i.firstContext;t:for(;i!==null;){var r=i;i=l;for(var m=0;m<e.length;m++)if(r.context===e[m]){i.lanes|=n,r=i.alternate,r!==null&&(r.lanes|=n),Ku(i.return,n,t),a||(u=null);break t}i=r.next}}else if(l.tag===18){if(u=l.return,u===null)throw Error(o(341));u.lanes|=n,i=u.alternate,i!==null&&(i.lanes|=n),Ku(u,n,t),u=null}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===t){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}}function ga(t,e,n,a){t=null;for(var l=e,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var u=l.alternate;if(u===null)throw Error(o(387));if(u=u.memoizedProps,u!==null){var r=l.type;fe(l.pendingProps.value,u.value)||(t!==null?t.push(r):t=[r])}}else if(l===ht.current){if(u=l.alternate,u===null)throw Error(o(387));u.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Cl):t=[Cl])}l=l.return}t!==null&&Iu(e,t,n,a),e.flags|=262144}function ai(t){for(t=t.firstContext;t!==null;){if(!fe(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function jn(t){Ln=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ft(t){return hc(Ln,t)}function li(t,e){return Ln===null&&jn(t),hc(t,e)}function hc(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ge===null){if(t===null)throw Error(o(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return n}var Tm=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Em=s.unstable_scheduleCallback,xm=s.unstable_NormalPriority,Yt={$$typeof:Y,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ju(){return{controller:new Tm,data:new Map,refCount:0}}function tl(t){t.refCount--,t.refCount===0&&Em(xm,function(){t.controller.abort()})}var el=null,Fu=0,ma=0,pa=null;function Am(t,e){if(el===null){var n=el=[];Fu=0,ma=ts(),pa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Fu++,e.then(gc,gc),e}function gc(){if(--Fu===0&&el!==null){pa!==null&&(pa.status="fulfilled");var t=el;el=null,ma=0,pa=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Cm(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var l=0;l<n.length;l++)(0,n[l])(e)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var mc=_.S;_.S=function(t,e){Pf=se(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Am(t,e),mc!==null&&mc(t,e)};var Yn=b(null);function Wu(){var t=Yn.current;return t!==null?t:Dt.pooledCache}function ii(t,e){e===null?G(Yn,Yn.current):G(Yn,e.pool)}function pc(){var t=Wu();return t===null?null:{parent:Yt._currentValue,pool:t}}var ya=Error(o(460)),$u=Error(o(474)),ui=Error(o(542)),oi={then:function(){}};function yc(t){return t=t.status,t==="fulfilled"||t==="rejected"}function vc(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Le,Le),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,wc(t),t;default:if(typeof e.status=="string")e.then(Le,Le);else{if(t=Dt,t!==null&&100<t.shellSuspendCounter)throw Error(o(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var l=e;l.status="fulfilled",l.value=a}},function(a){if(e.status==="pending"){var l=e;l.status="rejected",l.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,wc(t),t}throw Gn=e,ya}}function qn(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gn=n,ya):n}}var Gn=null;function bc(){if(Gn===null)throw Error(o(459));var t=Gn;return Gn=null,t}function wc(t){if(t===ya||t===ui)throw Error(o(483))}var va=null,nl=0;function si(t){var e=nl;return nl+=1,va===null&&(va=[]),vc(va,t,e)}function al(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ri(t,e){throw e.$$typeof===B?Error(o(525)):(t=Object.prototype.toString.call(e),Error(o(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Sc(t){function e(S,y){if(t){var E=S.deletions;E===null?(S.deletions=[y],S.flags|=16):E.push(y)}}function n(S,y){if(!t)return null;for(;y!==null;)e(S,y),y=y.sibling;return null}function a(S){for(var y=new Map;S!==null;)S.key!==null?y.set(S.key,S):y.set(S.index,S),S=S.sibling;return y}function l(S,y){return S=Ye(S,y),S.index=0,S.sibling=null,S}function i(S,y,E){return S.index=E,t?(E=S.alternate,E!==null?(E=E.index,E<y?(S.flags|=67108866,y):E):(S.flags|=67108866,y)):(S.flags|=1048576,y)}function u(S){return t&&S.alternate===null&&(S.flags|=67108866),S}function r(S,y,E,R){return y===null||y.tag!==6?(y=Yu(E,S.mode,R),y.return=S,y):(y=l(y,E),y.return=S,y)}function m(S,y,E,R){var et=E.type;return et===V?M(S,y,E.props.children,R,E.key):y!==null&&(y.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===Q&&qn(et)===y.type)?(y=l(y,E.props),al(y,E),y.return=S,y):(y=ei(E.type,E.key,E.props,null,S.mode,R),al(y,E),y.return=S,y)}function x(S,y,E,R){return y===null||y.tag!==4||y.stateNode.containerInfo!==E.containerInfo||y.stateNode.implementation!==E.implementation?(y=qu(E,S.mode,R),y.return=S,y):(y=l(y,E.children||[]),y.return=S,y)}function M(S,y,E,R,et){return y===null||y.tag!==7?(y=Bn(E,S.mode,R,et),y.return=S,y):(y=l(y,E),y.return=S,y)}function k(S,y,E){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return y=Yu(""+y,S.mode,E),y.return=S,y;if(typeof y=="object"&&y!==null){switch(y.$$typeof){case L:return E=ei(y.type,y.key,y.props,null,S.mode,E),al(E,y),E.return=S,E;case q:return y=qu(y,S.mode,E),y.return=S,y;case Q:return y=qn(y),k(S,y,E)}if(jt(y)||W(y))return y=Bn(y,S.mode,E,null),y.return=S,y;if(typeof y.then=="function")return k(S,si(y),E);if(y.$$typeof===Y)return k(S,li(S,y),E);ri(S,y)}return null}function A(S,y,E,R){var et=y!==null?y.key:null;if(typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint")return et!==null?null:r(S,y,""+E,R);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case L:return E.key===et?m(S,y,E,R):null;case q:return E.key===et?x(S,y,E,R):null;case Q:return E=qn(E),A(S,y,E,R)}if(jt(E)||W(E))return et!==null?null:M(S,y,E,R,null);if(typeof E.then=="function")return A(S,y,si(E),R);if(E.$$typeof===Y)return A(S,y,li(S,E),R);ri(S,E)}return null}function C(S,y,E,R,et){if(typeof R=="string"&&R!==""||typeof R=="number"||typeof R=="bigint")return S=S.get(E)||null,r(y,S,""+R,et);if(typeof R=="object"&&R!==null){switch(R.$$typeof){case L:return S=S.get(R.key===null?E:R.key)||null,m(y,S,R,et);case q:return S=S.get(R.key===null?E:R.key)||null,x(y,S,R,et);case Q:return R=qn(R),C(S,y,E,R,et)}if(jt(R)||W(R))return S=S.get(E)||null,M(y,S,R,et,null);if(typeof R.then=="function")return C(S,y,E,si(R),et);if(R.$$typeof===Y)return C(S,y,E,li(y,R),et);ri(y,R)}return null}function J(S,y,E,R){for(var et=null,bt=null,$=y,ft=y=0,yt=null;$!==null&&ft<E.length;ft++){$.index>ft?(yt=$,$=null):yt=$.sibling;var wt=A(S,$,E[ft],R);if(wt===null){$===null&&($=yt);break}t&&$&&wt.alternate===null&&e(S,$),y=i(wt,y,ft),bt===null?et=wt:bt.sibling=wt,bt=wt,$=yt}if(ft===E.length)return n(S,$),vt&&qe(S,ft),et;if($===null){for(;ft<E.length;ft++)$=k(S,E[ft],R),$!==null&&(y=i($,y,ft),bt===null?et=$:bt.sibling=$,bt=$);return vt&&qe(S,ft),et}for($=a($);ft<E.length;ft++)yt=C($,S,ft,E[ft],R),yt!==null&&(t&&yt.alternate!==null&&$.delete(yt.key===null?ft:yt.key),y=i(yt,y,ft),bt===null?et=yt:bt.sibling=yt,bt=yt);return t&&$.forEach(function(Nn){return e(S,Nn)}),vt&&qe(S,ft),et}function lt(S,y,E,R){if(E==null)throw Error(o(151));for(var et=null,bt=null,$=y,ft=y=0,yt=null,wt=E.next();$!==null&&!wt.done;ft++,wt=E.next()){$.index>ft?(yt=$,$=null):yt=$.sibling;var Nn=A(S,$,wt.value,R);if(Nn===null){$===null&&($=yt);break}t&&$&&Nn.alternate===null&&e(S,$),y=i(Nn,y,ft),bt===null?et=Nn:bt.sibling=Nn,bt=Nn,$=yt}if(wt.done)return n(S,$),vt&&qe(S,ft),et;if($===null){for(;!wt.done;ft++,wt=E.next())wt=k(S,wt.value,R),wt!==null&&(y=i(wt,y,ft),bt===null?et=wt:bt.sibling=wt,bt=wt);return vt&&qe(S,ft),et}for($=a($);!wt.done;ft++,wt=E.next())wt=C($,S,ft,wt.value,R),wt!==null&&(t&&wt.alternate!==null&&$.delete(wt.key===null?ft:wt.key),y=i(wt,y,ft),bt===null?et=wt:bt.sibling=wt,bt=wt);return t&&$.forEach(function(H0){return e(S,H0)}),vt&&qe(S,ft),et}function Mt(S,y,E,R){if(typeof E=="object"&&E!==null&&E.type===V&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case L:t:{for(var et=E.key;y!==null;){if(y.key===et){if(et=E.type,et===V){if(y.tag===7){n(S,y.sibling),R=l(y,E.props.children),R.return=S,S=R;break t}}else if(y.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===Q&&qn(et)===y.type){n(S,y.sibling),R=l(y,E.props),al(R,E),R.return=S,S=R;break t}n(S,y);break}else e(S,y);y=y.sibling}E.type===V?(R=Bn(E.props.children,S.mode,R,E.key),R.return=S,S=R):(R=ei(E.type,E.key,E.props,null,S.mode,R),al(R,E),R.return=S,S=R)}return u(S);case q:t:{for(et=E.key;y!==null;){if(y.key===et)if(y.tag===4&&y.stateNode.containerInfo===E.containerInfo&&y.stateNode.implementation===E.implementation){n(S,y.sibling),R=l(y,E.children||[]),R.return=S,S=R;break t}else{n(S,y);break}else e(S,y);y=y.sibling}R=qu(E,S.mode,R),R.return=S,S=R}return u(S);case Q:return E=qn(E),Mt(S,y,E,R)}if(jt(E))return J(S,y,E,R);if(W(E)){if(et=W(E),typeof et!="function")throw Error(o(150));return E=et.call(E),lt(S,y,E,R)}if(typeof E.then=="function")return Mt(S,y,si(E),R);if(E.$$typeof===Y)return Mt(S,y,li(S,E),R);ri(S,E)}return typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint"?(E=""+E,y!==null&&y.tag===6?(n(S,y.sibling),R=l(y,E),R.return=S,S=R):(n(S,y),R=Yu(E,S.mode,R),R.return=S,S=R),u(S)):n(S,y)}return function(S,y,E,R){try{nl=0;var et=Mt(S,y,E,R);return va=null,et}catch($){if($===ya||$===ui)throw $;var bt=de(29,$,null,S.mode);return bt.lanes=R,bt.return=S,bt}finally{}}}var Xn=Sc(!0),Tc=Sc(!1),cn=!1;function Pu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function to(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function dn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,(Tt&2)!==0){var l=a.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),a.pending=e,e=ti(t),ic(t,null,n),e}return Pl(t,a,e,n),ti(t)}function ll(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,hr(t,n)}}function eo(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?l=i=e:i=i.next=e}else l=i=e;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var no=!1;function il(){if(no){var t=pa;if(t!==null)throw t}}function ul(t,e,n,a){no=!1;var l=t.updateQueue;cn=!1;var i=l.firstBaseUpdate,u=l.lastBaseUpdate,r=l.shared.pending;if(r!==null){l.shared.pending=null;var m=r,x=m.next;m.next=null,u===null?i=x:u.next=x,u=m;var M=t.alternate;M!==null&&(M=M.updateQueue,r=M.lastBaseUpdate,r!==u&&(r===null?M.firstBaseUpdate=x:r.next=x,M.lastBaseUpdate=m))}if(i!==null){var k=l.baseState;u=0,M=x=m=null,r=i;do{var A=r.lane&-536870913,C=A!==r.lane;if(C?(pt&A)===A:(a&A)===A){A!==0&&A===ma&&(no=!0),M!==null&&(M=M.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});t:{var J=t,lt=r;A=e;var Mt=n;switch(lt.tag){case 1:if(J=lt.payload,typeof J=="function"){k=J.call(Mt,k,A);break t}k=J;break t;case 3:J.flags=J.flags&-65537|128;case 0:if(J=lt.payload,A=typeof J=="function"?J.call(Mt,k,A):J,A==null)break t;k=D({},k,A);break t;case 2:cn=!0}}A=r.callback,A!==null&&(t.flags|=64,C&&(t.flags|=8192),C=l.callbacks,C===null?l.callbacks=[A]:C.push(A))}else C={lane:A,tag:r.tag,payload:r.payload,callback:r.callback,next:null},M===null?(x=M=C,m=k):M=M.next=C,u|=A;if(r=r.next,r===null){if(r=l.shared.pending,r===null)break;C=r,r=C.next,C.next=null,l.lastBaseUpdate=C,l.shared.pending=null}}while(!0);M===null&&(m=k),l.baseState=m,l.firstBaseUpdate=x,l.lastBaseUpdate=M,i===null&&(l.shared.lanes=0),yn|=u,t.lanes=u,t.memoizedState=k}}function Ec(t,e){if(typeof t!="function")throw Error(o(191,t));t.call(e)}function xc(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)Ec(n[t],e)}var ba=b(null),ci=b(0);function Ac(t,e){t=$e,G(ci,t),G(ba,e),$e=t|e.baseLanes}function ao(){G(ci,$e),G(ba,ba.current)}function lo(){$e=ci.current,z(ba),z(ci)}var he=b(null),Ae=null;function hn(t){var e=t.alternate;G(Ht,Ht.current&1),G(he,t),Ae===null&&(e===null||ba.current!==null||e.memoizedState!==null)&&(Ae=t)}function io(t){G(Ht,Ht.current),G(he,t),Ae===null&&(Ae=t)}function Cc(t){t.tag===22?(G(Ht,Ht.current),G(he,t),Ae===null&&(Ae=t)):gn()}function gn(){G(Ht,Ht.current),G(he,he.current)}function ge(t){z(he),Ae===t&&(Ae=null),z(Ht)}var Ht=b(0);function fi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||ds(n)||hs(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ve=0,rt=null,Nt=null,qt=null,di=!1,wa=!1,Vn=!1,hi=0,ol=0,Sa=null,Nm=0;function Ut(){throw Error(o(321))}function uo(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!fe(t[n],e[n]))return!1;return!0}function oo(t,e,n,a,l,i){return Ve=i,rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,_.H=t===null||t.memoizedState===null?cf:Eo,Vn=!1,i=n(a,l),Vn=!1,wa&&(i=_c(e,n,a,l)),Nc(t),i}function Nc(t){_.H=cl;var e=Nt!==null&&Nt.next!==null;if(Ve=0,qt=Nt=rt=null,di=!1,ol=0,Sa=null,e)throw Error(o(300));t===null||Gt||(t=t.dependencies,t!==null&&ai(t)&&(Gt=!0))}function _c(t,e,n,a){rt=t;var l=0;do{if(wa&&(Sa=null),ol=0,wa=!1,25<=l)throw Error(o(301));if(l+=1,qt=Nt=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}_.H=ff,i=e(n,a)}while(wa);return i}function _m(){var t=_.H,e=t.useState()[0];return e=typeof e.then=="function"?sl(e):e,t=t.useState()[0],(Nt!==null?Nt.memoizedState:null)!==t&&(rt.flags|=1024),e}function so(){var t=hi!==0;return hi=0,t}function ro(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function co(t){if(di){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}di=!1}Ve=0,qt=Nt=rt=null,wa=!1,ol=hi=0,Sa=null}function te(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qt===null?rt.memoizedState=qt=t:qt=qt.next=t,qt}function Lt(){if(Nt===null){var t=rt.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=qt===null?rt.memoizedState:qt.next;if(e!==null)qt=e,Nt=t;else{if(t===null)throw rt.alternate===null?Error(o(467)):Error(o(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},qt===null?rt.memoizedState=qt=t:qt=qt.next=t}return qt}function gi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function sl(t){var e=ol;return ol+=1,Sa===null&&(Sa=[]),t=vc(Sa,t,e),e=rt,(qt===null?e.memoizedState:qt.next)===null&&(e=e.alternate,_.H=e===null||e.memoizedState===null?cf:Eo),t}function mi(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return sl(t);if(t.$$typeof===Y)return Ft(t)}throw Error(o(438,String(t)))}function fo(t){var e=null,n=rt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=rt.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(l){return l.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=gi(),rt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=nt;return e.index++,n}function Qe(t,e){return typeof e=="function"?e(t):e}function pi(t){var e=Lt();return ho(e,Nt,t)}function ho(t,e,n){var a=t.queue;if(a===null)throw Error(o(311));a.lastRenderedReducer=n;var l=t.baseQueue,i=a.pending;if(i!==null){if(l!==null){var u=l.next;l.next=i.next,i.next=u}e.baseQueue=l=i,a.pending=null}if(i=t.baseState,l===null)t.memoizedState=i;else{e=l.next;var r=u=null,m=null,x=e,M=!1;do{var k=x.lane&-536870913;if(k!==x.lane?(pt&k)===k:(Ve&k)===k){var A=x.revertLane;if(A===0)m!==null&&(m=m.next={lane:0,revertLane:0,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null}),k===ma&&(M=!0);else if((Ve&A)===A){x=x.next,A===ma&&(M=!0);continue}else k={lane:0,revertLane:x.revertLane,gesture:null,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},m===null?(r=m=k,u=i):m=m.next=k,rt.lanes|=A,yn|=A;k=x.action,Vn&&n(i,k),i=x.hasEagerState?x.eagerState:n(i,k)}else A={lane:k,revertLane:x.revertLane,gesture:x.gesture,action:x.action,hasEagerState:x.hasEagerState,eagerState:x.eagerState,next:null},m===null?(r=m=A,u=i):m=m.next=A,rt.lanes|=k,yn|=k;x=x.next}while(x!==null&&x!==e);if(m===null?u=i:m.next=r,!fe(i,t.memoizedState)&&(Gt=!0,M&&(n=pa,n!==null)))throw n;t.memoizedState=i,t.baseState=u,t.baseQueue=m,a.lastRenderedState=i}return l===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function go(t){var e=Lt(),n=e.queue;if(n===null)throw Error(o(311));n.lastRenderedReducer=t;var a=n.dispatch,l=n.pending,i=e.memoizedState;if(l!==null){n.pending=null;var u=l=l.next;do i=t(i,u.action),u=u.next;while(u!==l);fe(i,e.memoizedState)||(Gt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,a]}function Mc(t,e,n){var a=rt,l=Lt(),i=vt;if(i){if(n===void 0)throw Error(o(407));n=n()}else n=e();var u=!fe((Nt||l).memoizedState,n);if(u&&(l.memoizedState=n,Gt=!0),l=l.queue,yo(kc.bind(null,a,l,t),[t]),l.getSnapshot!==e||u||qt!==null&&qt.memoizedState.tag&1){if(a.flags|=2048,Ta(9,{destroy:void 0},Rc.bind(null,a,l,n,e),null),Dt===null)throw Error(o(349));i||(Ve&127)!==0||Dc(a,e,n)}return n}function Dc(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=rt.updateQueue,e===null?(e=gi(),rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Rc(t,e,n,a){e.value=n,e.getSnapshot=a,zc(e)&&Oc(t)}function kc(t,e,n){return n(function(){zc(e)&&Oc(t)})}function zc(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!fe(t,n)}catch{return!0}}function Oc(t){var e=Un(t,2);e!==null&&oe(e,t,2)}function mo(t){var e=te();if(typeof t=="function"){var n=t;if(t=n(),Vn){nn(!0);try{n()}finally{nn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:t},e}function Uc(t,e,n,a){return t.baseState=n,ho(t,Nt,typeof a=="function"?a:Qe)}function Mm(t,e,n,a,l){if(bi(t))throw Error(o(485));if(t=e.action,t!==null){var i={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};_.T!==null?n(!0):i.isTransition=!1,a(i),n=e.pending,n===null?(i.next=e.pending=i,Bc(e,i)):(i.next=n.next,e.pending=n.next=i)}}function Bc(t,e){var n=e.action,a=e.payload,l=t.state;if(e.isTransition){var i=_.T,u={};_.T=u;try{var r=n(l,a),m=_.S;m!==null&&m(u,r),Hc(t,e,r)}catch(x){po(t,e,x)}finally{i!==null&&u.types!==null&&(i.types=u.types),_.T=i}}else try{i=n(l,a),Hc(t,e,i)}catch(x){po(t,e,x)}}function Hc(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Lc(t,e,a)},function(a){return po(t,e,a)}):Lc(t,e,n)}function Lc(t,e,n){e.status="fulfilled",e.value=n,jc(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Bc(t,n)))}function po(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,jc(e),e=e.next;while(e!==a)}t.action=null}function jc(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Yc(t,e){return e}function qc(t,e){if(vt){var n=Dt.formState;if(n!==null){t:{var a=rt;if(vt){if(kt){e:{for(var l=kt,i=xe;l.nodeType!==8;){if(!i){l=null;break e}if(l=Ce(l.nextSibling),l===null){l=null;break e}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){kt=Ce(l.nextSibling),a=l.data==="F!";break t}}sn(a)}a=!1}a&&(e=n[0])}}return n=te(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yc,lastRenderedState:e},n.queue=a,n=of.bind(null,rt,a),a.dispatch=n,a=mo(!1),i=To.bind(null,rt,!1,a.queue),a=te(),l={state:e,dispatch:null,action:t,pending:null},a.queue=l,n=Mm.bind(null,rt,l,i,n),l.dispatch=n,a.memoizedState=t,[e,n,!1]}function Gc(t){var e=Lt();return Xc(e,Nt,t)}function Xc(t,e,n){if(e=ho(t,e,Yc)[0],t=pi(Qe)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=sl(e)}catch(u){throw u===ya?ui:u}else a=e;e=Lt();var l=e.queue,i=l.dispatch;return n!==e.memoizedState&&(rt.flags|=2048,Ta(9,{destroy:void 0},Dm.bind(null,l,n),null)),[a,i,t]}function Dm(t,e){t.action=e}function Vc(t){var e=Lt(),n=Nt;if(n!==null)return Xc(e,n,t);Lt(),e=e.memoizedState,n=Lt();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function Ta(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=rt.updateQueue,e===null&&(e=gi(),rt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function Qc(){return Lt().memoizedState}function yi(t,e,n,a){var l=te();rt.flags|=t,l.memoizedState=Ta(1|e,{destroy:void 0},n,a===void 0?null:a)}function vi(t,e,n,a){var l=Lt();a=a===void 0?null:a;var i=l.memoizedState.inst;Nt!==null&&a!==null&&uo(a,Nt.memoizedState.deps)?l.memoizedState=Ta(e,i,n,a):(rt.flags|=t,l.memoizedState=Ta(1|e,i,n,a))}function Zc(t,e){yi(8390656,8,t,e)}function yo(t,e){vi(2048,8,t,e)}function Rm(t){rt.flags|=4;var e=rt.updateQueue;if(e===null)e=gi(),rt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Kc(t){var e=Lt().memoizedState;return Rm({ref:e,nextImpl:t}),function(){if((Tt&2)!==0)throw Error(o(440));return e.impl.apply(void 0,arguments)}}function Ic(t,e){return vi(4,2,t,e)}function Jc(t,e){return vi(4,4,t,e)}function Fc(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Wc(t,e,n){n=n!=null?n.concat([t]):null,vi(4,4,Fc.bind(null,e,t),n)}function vo(){}function $c(t,e){var n=Lt();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&uo(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function Pc(t,e){var n=Lt();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&uo(e,a[1]))return a[0];if(a=t(),Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a}function bo(t,e,n){return n===void 0||(Ve&1073741824)!==0&&(pt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=ed(),rt.lanes|=t,yn|=t,n)}function tf(t,e,n,a){return fe(n,e)?n:ba.current!==null?(t=bo(t,n,a),fe(t,e)||(Gt=!0),t):(Ve&42)===0||(Ve&1073741824)!==0&&(pt&261930)===0?(Gt=!0,t.memoizedState=n):(t=ed(),rt.lanes|=t,yn|=t,e)}function ef(t,e,n,a,l){var i=X.p;X.p=i!==0&&8>i?i:8;var u=_.T,r={};_.T=r,To(t,!1,e,n);try{var m=l(),x=_.S;if(x!==null&&x(r,m),m!==null&&typeof m=="object"&&typeof m.then=="function"){var M=Cm(m,a);rl(t,e,M,ye(t))}else rl(t,e,a,ye(t))}catch(k){rl(t,e,{then:function(){},status:"rejected",reason:k},ye())}finally{X.p=i,u!==null&&r.types!==null&&(u.types=r.types),_.T=u}}function km(){}function wo(t,e,n,a){if(t.tag!==5)throw Error(o(476));var l=nf(t).queue;ef(t,l,e,at,n===null?km:function(){return af(t),n(a)})}function nf(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:at,baseState:at,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:at},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qe,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function af(t){var e=nf(t);e.next===null&&(e=t.alternate.memoizedState),rl(t,e.next.queue,{},ye())}function So(){return Ft(Cl)}function lf(){return Lt().memoizedState}function uf(){return Lt().memoizedState}function zm(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ye();t=fn(n);var a=dn(e,t,n);a!==null&&(oe(a,e,n),ll(a,e,n)),e={cache:Ju()},t.payload=e;return}e=e.return}}function Om(t,e,n){var a=ye();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},bi(t)?sf(e,n):(n=Lu(t,e,n,a),n!==null&&(oe(n,t,a),rf(n,e,a)))}function of(t,e,n){var a=ye();rl(t,e,n,a)}function rl(t,e,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(bi(t))sf(e,l);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var u=e.lastRenderedState,r=i(u,n);if(l.hasEagerState=!0,l.eagerState=r,fe(r,u))return Pl(t,e,l,0),Dt===null&&$l(),!1}catch{}finally{}if(n=Lu(t,e,l,a),n!==null)return oe(n,t,a),rf(n,e,a),!0}return!1}function To(t,e,n,a){if(a={lane:2,revertLane:ts(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},bi(t)){if(e)throw Error(o(479))}else e=Lu(t,n,a,2),e!==null&&oe(e,t,2)}function bi(t){var e=t.alternate;return t===rt||e!==null&&e===rt}function sf(t,e){wa=di=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function rf(t,e,n){if((n&4194048)!==0){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,hr(t,n)}}var cl={readContext:Ft,use:mi,useCallback:Ut,useContext:Ut,useEffect:Ut,useImperativeHandle:Ut,useLayoutEffect:Ut,useInsertionEffect:Ut,useMemo:Ut,useReducer:Ut,useRef:Ut,useState:Ut,useDebugValue:Ut,useDeferredValue:Ut,useTransition:Ut,useSyncExternalStore:Ut,useId:Ut,useHostTransitionStatus:Ut,useFormState:Ut,useActionState:Ut,useOptimistic:Ut,useMemoCache:Ut,useCacheRefresh:Ut};cl.useEffectEvent=Ut;var cf={readContext:Ft,use:mi,useCallback:function(t,e){return te().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:Zc,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,yi(4194308,4,Fc.bind(null,e,t),n)},useLayoutEffect:function(t,e){return yi(4194308,4,t,e)},useInsertionEffect:function(t,e){yi(4,2,t,e)},useMemo:function(t,e){var n=te();e=e===void 0?null:e;var a=t();if(Vn){nn(!0);try{t()}finally{nn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=te();if(n!==void 0){var l=n(e);if(Vn){nn(!0);try{n(e)}finally{nn(!1)}}}else l=e;return a.memoizedState=a.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},a.queue=t,t=t.dispatch=Om.bind(null,rt,t),[a.memoizedState,t]},useRef:function(t){var e=te();return t={current:t},e.memoizedState=t},useState:function(t){t=mo(t);var e=t.queue,n=of.bind(null,rt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:vo,useDeferredValue:function(t,e){var n=te();return bo(n,t,e)},useTransition:function(){var t=mo(!1);return t=ef.bind(null,rt,t.queue,!0,!1),te().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=rt,l=te();if(vt){if(n===void 0)throw Error(o(407));n=n()}else{if(n=e(),Dt===null)throw Error(o(349));(pt&127)!==0||Dc(a,e,n)}l.memoizedState=n;var i={value:n,getSnapshot:e};return l.queue=i,Zc(kc.bind(null,a,i,t),[t]),a.flags|=2048,Ta(9,{destroy:void 0},Rc.bind(null,a,i,n,e),null),n},useId:function(){var t=te(),e=Dt.identifierPrefix;if(vt){var n=ke,a=Re;n=(a&~(1<<32-ce(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=hi++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Nm++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:So,useFormState:qc,useActionState:qc,useOptimistic:function(t){var e=te();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=To.bind(null,rt,!0,n),n.dispatch=e,[t,e]},useMemoCache:fo,useCacheRefresh:function(){return te().memoizedState=zm.bind(null,rt)},useEffectEvent:function(t){var e=te(),n={impl:t};return e.memoizedState=n,function(){if((Tt&2)!==0)throw Error(o(440));return n.impl.apply(void 0,arguments)}}},Eo={readContext:Ft,use:mi,useCallback:$c,useContext:Ft,useEffect:yo,useImperativeHandle:Wc,useInsertionEffect:Ic,useLayoutEffect:Jc,useMemo:Pc,useReducer:pi,useRef:Qc,useState:function(){return pi(Qe)},useDebugValue:vo,useDeferredValue:function(t,e){var n=Lt();return tf(n,Nt.memoizedState,t,e)},useTransition:function(){var t=pi(Qe)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:sl(t),e]},useSyncExternalStore:Mc,useId:lf,useHostTransitionStatus:So,useFormState:Gc,useActionState:Gc,useOptimistic:function(t,e){var n=Lt();return Uc(n,Nt,t,e)},useMemoCache:fo,useCacheRefresh:uf};Eo.useEffectEvent=Kc;var ff={readContext:Ft,use:mi,useCallback:$c,useContext:Ft,useEffect:yo,useImperativeHandle:Wc,useInsertionEffect:Ic,useLayoutEffect:Jc,useMemo:Pc,useReducer:go,useRef:Qc,useState:function(){return go(Qe)},useDebugValue:vo,useDeferredValue:function(t,e){var n=Lt();return Nt===null?bo(n,t,e):tf(n,Nt.memoizedState,t,e)},useTransition:function(){var t=go(Qe)[0],e=Lt().memoizedState;return[typeof t=="boolean"?t:sl(t),e]},useSyncExternalStore:Mc,useId:lf,useHostTransitionStatus:So,useFormState:Vc,useActionState:Vc,useOptimistic:function(t,e){var n=Lt();return Nt!==null?Uc(n,Nt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:fo,useCacheRefresh:uf};ff.useEffectEvent=Kc;function xo(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:D({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ao={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(oe(e,t,a),ll(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ye(),l=fn(a);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=dn(t,l,a),e!==null&&(oe(e,t,a),ll(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ye(),a=fn(n);a.tag=2,e!=null&&(a.callback=e),e=dn(t,a,n),e!==null&&(oe(e,t,n),ll(e,t,n))}};function df(t,e,n,a,l,i,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,i,u):e.prototype&&e.prototype.isPureReactComponent?!Fa(n,a)||!Fa(l,i):!0}function hf(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&Ao.enqueueReplaceState(e,e.state,null)}function Qn(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=D({},n));for(var l in t)n[l]===void 0&&(n[l]=t[l])}return n}function gf(t){Wl(t)}function mf(t){console.error(t)}function pf(t){Wl(t)}function wi(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function yf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Co(t,e,n){return n=fn(n),n.tag=3,n.payload={element:null},n.callback=function(){wi(t,e)},n}function vf(t){return t=fn(t),t.tag=3,t}function bf(t,e,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;t.payload=function(){return l(i)},t.callback=function(){yf(e,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){yf(e,n,a),typeof l!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var r=a.stack;this.componentDidCatch(a.value,{componentStack:r!==null?r:""})})}function Um(t,e,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&ga(e,n,l,!0),n=he.current,n!==null){switch(n.tag){case 31:case 13:return Ae===null?ki():n.alternate===null&&Bt===0&&(Bt=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===oi?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),Wo(t,a,l)),!1;case 22:return n.flags|=65536,a===oi?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),Wo(t,a,l)),!1}throw Error(o(435,n.tag))}return Wo(t,a,l),ki(),!1}if(vt)return e=he.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=l,a!==Vu&&(t=Error(o(422),{cause:a}),Pa(Se(t,n)))):(a!==Vu&&(e=Error(o(423),{cause:a}),Pa(Se(e,n))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,a=Se(a,n),l=Co(t.stateNode,a,l),eo(t,l),Bt!==4&&(Bt=2)),!1;var i=Error(o(520),{cause:a});if(i=Se(i,n),vl===null?vl=[i]:vl.push(i),Bt!==4&&(Bt=2),e===null)return!0;a=Se(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=l&-l,n.lanes|=t,t=Co(n.stateNode,a,t),eo(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=vf(l),bf(l,t,n,a),eo(n,l),!1}n=n.return}while(n!==null);return!1}var No=Error(o(461)),Gt=!1;function Wt(t,e,n,a){e.child=t===null?Tc(e,null,n,a):Xn(e,t.child,n,a)}function wf(t,e,n,a,l){n=n.render;var i=e.ref;if("ref"in a){var u={};for(var r in a)r!=="ref"&&(u[r]=a[r])}else u=a;return jn(e),a=oo(t,e,n,u,i,l),r=so(),t!==null&&!Gt?(ro(t,e,l),Ze(t,e,l)):(vt&&r&&Gu(e),e.flags|=1,Wt(t,e,a,l),e.child)}function Sf(t,e,n,a,l){if(t===null){var i=n.type;return typeof i=="function"&&!ju(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,Tf(t,e,i,a,l)):(t=ei(n.type,null,a,e,e.mode,l),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Uo(t,l)){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Fa,n(u,a)&&t.ref===e.ref)return Ze(t,e,l)}return e.flags|=1,t=Ye(i,a),t.ref=e.ref,t.return=e,e.child=t}function Tf(t,e,n,a,l){if(t!==null){var i=t.memoizedProps;if(Fa(i,a)&&t.ref===e.ref)if(Gt=!1,e.pendingProps=a=i,Uo(t,l))(t.flags&131072)!==0&&(Gt=!0);else return e.lanes=t.lanes,Ze(t,e,l)}return _o(t,e,n,a,l)}function Ef(t,e,n,a){var l=a.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(a=e.child=t.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,e.child=null;return xf(t,e,i,n,a)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&ii(e,i!==null?i.cachePool:null),i!==null?Ac(e,i):ao(),Cc(e);else return a=e.lanes=536870912,xf(t,e,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(ii(e,i.cachePool),Ac(e,i),gn(),e.memoizedState=null):(t!==null&&ii(e,null),ao(),gn());return Wt(t,e,l,n),e.child}function fl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function xf(t,e,n,a,l){var i=Wu();return i=i===null?null:{parent:Yt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&ii(e,null),ao(),Cc(e),t!==null&&ga(t,e,a,!0),e.childLanes=l,null}function Si(t,e){return e=Ei({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Af(t,e,n){return Xn(e,t.child,null,n),t=Si(e,e.pendingProps),t.flags|=2,ge(e),e.memoizedState=null,t}function Bm(t,e,n){var a=e.pendingProps,l=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(vt){if(a.mode==="hidden")return t=Si(e,a),e.lanes=536870912,fl(null,t);if(io(e),(t=kt)?(t=Hd(t,xe),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=oc(t),n.return=e,e.child=n,Jt=e,kt=null)):t=null,t===null)throw sn(e);return e.lanes=536870912,null}return Si(e,a)}var i=t.memoizedState;if(i!==null){var u=i.dehydrated;if(io(e),l)if(e.flags&256)e.flags&=-257,e=Af(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(o(558));else if(Gt||ga(t,e,n,!1),l=(n&t.childLanes)!==0,Gt||l){if(a=Dt,a!==null&&(u=gr(a,n),u!==0&&u!==i.retryLane))throw i.retryLane=u,Un(t,u),oe(a,t,u),No;ki(),e=Af(t,e,n)}else t=i.treeContext,kt=Ce(u.nextSibling),Jt=e,vt=!0,on=null,xe=!1,t!==null&&cc(e,t),e=Si(e,a),e.flags|=4096;return e}return t=Ye(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ti(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(o(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function _o(t,e,n,a,l){return jn(e),n=oo(t,e,n,a,void 0,l),a=so(),t!==null&&!Gt?(ro(t,e,l),Ze(t,e,l)):(vt&&a&&Gu(e),e.flags|=1,Wt(t,e,n,l),e.child)}function Cf(t,e,n,a,l,i){return jn(e),e.updateQueue=null,n=_c(e,a,n,l),Nc(t),a=so(),t!==null&&!Gt?(ro(t,e,i),Ze(t,e,i)):(vt&&a&&Gu(e),e.flags|=1,Wt(t,e,n,i),e.child)}function Nf(t,e,n,a,l){if(jn(e),e.stateNode===null){var i=ca,u=n.contextType;typeof u=="object"&&u!==null&&(i=Ft(u)),i=new n(a,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ao,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=a,i.state=e.memoizedState,i.refs={},Pu(e),u=n.contextType,i.context=typeof u=="object"&&u!==null?Ft(u):ca,i.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(xo(e,n,u,a),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Ao.enqueueReplaceState(i,i.state,null),ul(e,a,i,l),il(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){i=e.stateNode;var r=e.memoizedProps,m=Qn(n,r);i.props=m;var x=i.context,M=n.contextType;u=ca,typeof M=="object"&&M!==null&&(u=Ft(M));var k=n.getDerivedStateFromProps;M=typeof k=="function"||typeof i.getSnapshotBeforeUpdate=="function",r=e.pendingProps!==r,M||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r||x!==u)&&hf(e,i,a,u),cn=!1;var A=e.memoizedState;i.state=A,ul(e,a,i,l),il(),x=e.memoizedState,r||A!==x||cn?(typeof k=="function"&&(xo(e,n,k,a),x=e.memoizedState),(m=cn||df(e,n,m,a,A,x,u))?(M||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=x),i.props=a,i.state=x,i.context=u,a=m):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{i=e.stateNode,to(t,e),u=e.memoizedProps,M=Qn(n,u),i.props=M,k=e.pendingProps,A=i.context,x=n.contextType,m=ca,typeof x=="object"&&x!==null&&(m=Ft(x)),r=n.getDerivedStateFromProps,(x=typeof r=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==k||A!==m)&&hf(e,i,a,m),cn=!1,A=e.memoizedState,i.state=A,ul(e,a,i,l),il();var C=e.memoizedState;u!==k||A!==C||cn||t!==null&&t.dependencies!==null&&ai(t.dependencies)?(typeof r=="function"&&(xo(e,n,r,a),C=e.memoizedState),(M=cn||df(e,n,M,a,A,C,m)||t!==null&&t.dependencies!==null&&ai(t.dependencies))?(x||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,C,m),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,C,m)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=C),i.props=a,i.state=C,i.context=m,a=M):(typeof i.componentDidUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&A===t.memoizedState||(e.flags|=1024),a=!1)}return i=a,Ti(t,e),a=(e.flags&128)!==0,i||a?(i=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&a?(e.child=Xn(e,t.child,null,l),e.child=Xn(e,null,n,l)):Wt(t,e,n,l),e.memoizedState=i.state,t=e.child):t=Ze(t,e,l),t}function _f(t,e,n,a){return Hn(),e.flags|=256,Wt(t,e,n,a),e.child}var Mo={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Do(t){return{baseLanes:t,cachePool:pc()}}function Ro(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pe),t}function Mf(t,e,n){var a=e.pendingProps,l=!1,i=(e.flags&128)!==0,u;if((u=i)||(u=t!==null&&t.memoizedState===null?!1:(Ht.current&2)!==0),u&&(l=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(vt){if(l?hn(e):gn(),(t=kt)?(t=Hd(t,xe),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:un!==null?{id:Re,overflow:ke}:null,retryLane:536870912,hydrationErrors:null},n=oc(t),n.return=e,e.child=n,Jt=e,kt=null)):t=null,t===null)throw sn(e);return hs(t)?e.lanes=32:e.lanes=536870912,null}var r=a.children;return a=a.fallback,l?(gn(),l=e.mode,r=Ei({mode:"hidden",children:r},l),a=Bn(a,l,n,null),r.return=e,a.return=e,r.sibling=a,e.child=r,a=e.child,a.memoizedState=Do(n),a.childLanes=Ro(t,u,n),e.memoizedState=Mo,fl(null,a)):(hn(e),ko(e,r))}var m=t.memoizedState;if(m!==null&&(r=m.dehydrated,r!==null)){if(i)e.flags&256?(hn(e),e.flags&=-257,e=zo(t,e,n)):e.memoizedState!==null?(gn(),e.child=t.child,e.flags|=128,e=null):(gn(),r=a.fallback,l=e.mode,a=Ei({mode:"visible",children:a.children},l),r=Bn(r,l,n,null),r.flags|=2,a.return=e,r.return=e,a.sibling=r,e.child=a,Xn(e,t.child,null,n),a=e.child,a.memoizedState=Do(n),a.childLanes=Ro(t,u,n),e.memoizedState=Mo,e=fl(null,a));else if(hn(e),hs(r)){if(u=r.nextSibling&&r.nextSibling.dataset,u)var x=u.dgst;u=x,a=Error(o(419)),a.stack="",a.digest=u,Pa({value:a,source:null,stack:null}),e=zo(t,e,n)}else if(Gt||ga(t,e,n,!1),u=(n&t.childLanes)!==0,Gt||u){if(u=Dt,u!==null&&(a=gr(u,n),a!==0&&a!==m.retryLane))throw m.retryLane=a,Un(t,a),oe(u,t,a),No;ds(r)||ki(),e=zo(t,e,n)}else ds(r)?(e.flags|=192,e.child=t.child,e=null):(t=m.treeContext,kt=Ce(r.nextSibling),Jt=e,vt=!0,on=null,xe=!1,t!==null&&cc(e,t),e=ko(e,a.children),e.flags|=4096);return e}return l?(gn(),r=a.fallback,l=e.mode,m=t.child,x=m.sibling,a=Ye(m,{mode:"hidden",children:a.children}),a.subtreeFlags=m.subtreeFlags&65011712,x!==null?r=Ye(x,r):(r=Bn(r,l,n,null),r.flags|=2),r.return=e,a.return=e,a.sibling=r,e.child=a,fl(null,a),a=e.child,r=t.child.memoizedState,r===null?r=Do(n):(l=r.cachePool,l!==null?(m=Yt._currentValue,l=l.parent!==m?{parent:m,pool:m}:l):l=pc(),r={baseLanes:r.baseLanes|n,cachePool:l}),a.memoizedState=r,a.childLanes=Ro(t,u,n),e.memoizedState=Mo,fl(t.child,a)):(hn(e),n=t.child,t=n.sibling,n=Ye(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=n,e.memoizedState=null,n)}function ko(t,e){return e=Ei({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ei(t,e){return t=de(22,t,null,e),t.lanes=0,t}function zo(t,e,n){return Xn(e,t.child,null,n),t=ko(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Df(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Ku(t.return,e,n)}function Oo(t,e,n,a,l,i){var u=t.memoizedState;u===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=l,u.treeForkCount=i)}function Rf(t,e,n){var a=e.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var u=Ht.current,r=(u&2)!==0;if(r?(u=u&1|2,e.flags|=128):u&=1,G(Ht,u),Wt(t,e,a,n),a=vt?$a:0,!r&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Df(t,n,e);else if(t.tag===19)Df(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"forwards":for(n=e.child,l=null;n!==null;)t=n.alternate,t!==null&&fi(t)===null&&(l=n),n=n.sibling;n=l,n===null?(l=e.child,e.child=null):(l=n.sibling,n.sibling=null),Oo(e,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=e.child,e.child=null;l!==null;){if(t=l.alternate,t!==null&&fi(t)===null){e.child=l;break}t=l.sibling,l.sibling=n,n=l,l=t}Oo(e,!0,n,null,i,a);break;case"together":Oo(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ze(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),yn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ga(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(o(153));if(e.child!==null){for(t=e.child,n=Ye(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ye(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Uo(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ai(t)))}function Hm(t,e,n){switch(e.tag){case 3:Rt(e,e.stateNode.containerInfo),rn(e,Yt,t.memoizedState.cache),Hn();break;case 27:case 5:Be(e);break;case 4:Rt(e,e.stateNode.containerInfo);break;case 10:rn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,io(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(hn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Mf(t,e,n):(hn(e),t=Ze(t,e,n),t!==null?t.sibling:null);hn(e);break;case 19:var l=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(ga(t,e,n,!1),a=(n&e.childLanes)!==0),l){if(a)return Rf(t,e,n);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),G(Ht,Ht.current),a)break;return null;case 22:return e.lanes=0,Ef(t,e,n,e.pendingProps);case 24:rn(e,Yt,t.memoizedState.cache)}return Ze(t,e,n)}function kf(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Gt=!0;else{if(!Uo(t,n)&&(e.flags&128)===0)return Gt=!1,Hm(t,e,n);Gt=(t.flags&131072)!==0}else Gt=!1,vt&&(e.flags&1048576)!==0&&rc(e,$a,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=qn(e.elementType),e.type=t,typeof t=="function")ju(t)?(a=Qn(t,a),e.tag=1,e=Nf(null,e,t,a,n)):(e.tag=0,e=_o(null,e,t,a,n));else{if(t!=null){var l=t.$$typeof;if(l===K){e.tag=11,e=wf(null,e,t,a,n);break t}else if(l===H){e.tag=14,e=Sf(null,e,t,a,n);break t}}throw e=it(t)||t,Error(o(306,e,""))}}return e;case 0:return _o(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,l=Qn(a,e.pendingProps),Nf(t,e,a,l,n);case 3:t:{if(Rt(e,e.stateNode.containerInfo),t===null)throw Error(o(387));a=e.pendingProps;var i=e.memoizedState;l=i.element,to(t,e),ul(e,a,null,n);var u=e.memoizedState;if(a=u.cache,rn(e,Yt,a),a!==i.cache&&Iu(e,[Yt],n,!0),il(),a=u.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=_f(t,e,a,n);break t}else if(a!==l){l=Se(Error(o(424)),e),Pa(l),e=_f(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(kt=Ce(t.firstChild),Jt=e,vt=!0,on=null,xe=!0,n=Tc(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Hn(),a===l){e=Ze(t,e,n);break t}Wt(t,e,a,n)}e=e.child}return e;case 26:return Ti(t,e),t===null?(n=Xd(e.type,null,e.pendingProps,null))?e.memoizedState=n:vt||(n=e.type,t=e.pendingProps,a=ji(dt.current).createElement(n),a[It]=e,a[ee]=t,$t(a,n,t),Qt(a),e.stateNode=a):e.memoizedState=Xd(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Be(e),t===null&&vt&&(a=e.stateNode=Yd(e.type,e.pendingProps,dt.current),Jt=e,xe=!0,l=kt,Tn(e.type)?(gs=l,kt=Ce(a.firstChild)):kt=l),Wt(t,e,e.pendingProps.children,n),Ti(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&vt&&((l=a=kt)&&(a=h0(a,e.type,e.pendingProps,xe),a!==null?(e.stateNode=a,Jt=e,kt=Ce(a.firstChild),xe=!1,l=!0):l=!1),l||sn(e)),Be(e),l=e.type,i=e.pendingProps,u=t!==null?t.memoizedProps:null,a=i.children,rs(l,i)?a=null:u!==null&&rs(l,u)&&(e.flags|=32),e.memoizedState!==null&&(l=oo(t,e,_m,null,null,n),Cl._currentValue=l),Ti(t,e),Wt(t,e,a,n),e.child;case 6:return t===null&&vt&&((t=n=kt)&&(n=g0(n,e.pendingProps,xe),n!==null?(e.stateNode=n,Jt=e,kt=null,t=!0):t=!1),t||sn(e)),null;case 13:return Mf(t,e,n);case 4:return Rt(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=Xn(e,null,a,n):Wt(t,e,a,n),e.child;case 11:return wf(t,e,e.type,e.pendingProps,n);case 7:return Wt(t,e,e.pendingProps,n),e.child;case 8:return Wt(t,e,e.pendingProps.children,n),e.child;case 12:return Wt(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,rn(e,e.type,a.value),Wt(t,e,a.children,n),e.child;case 9:return l=e.type._context,a=e.pendingProps.children,jn(e),l=Ft(l),a=a(l),e.flags|=1,Wt(t,e,a,n),e.child;case 14:return Sf(t,e,e.type,e.pendingProps,n);case 15:return Tf(t,e,e.type,e.pendingProps,n);case 19:return Rf(t,e,n);case 31:return Bm(t,e,n);case 22:return Ef(t,e,n,e.pendingProps);case 24:return jn(e),a=Ft(Yt),t===null?(l=Wu(),l===null&&(l=Dt,i=Ju(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),e.memoizedState={parent:a,cache:l},Pu(e),rn(e,Yt,l)):((t.lanes&n)!==0&&(to(t,e),ul(e,null,null,n),il()),l=t.memoizedState,i=e.memoizedState,l.parent!==a?(l={parent:a,cache:a},e.memoizedState=l,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=l),rn(e,Yt,a)):(a=i.cache,rn(e,Yt,a),a!==l.cache&&Iu(e,[Yt],n,!0))),Wt(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(o(156,e.tag))}function Ke(t){t.flags|=4}function Bo(t,e,n,a,l){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(id())t.flags|=8192;else throw Gn=oi,$u}else t.flags&=-16777217}function zf(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Id(e))if(id())t.flags|=8192;else throw Gn=oi,$u}function xi(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?fr():536870912,t.lanes|=e,Ca|=e)}function dl(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function zt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Lm(t,e,n){var a=e.pendingProps;switch(Xu(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zt(e),null;case 1:return zt(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Xe(Yt),Ct(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ha(e)?Ke(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Qu())),zt(e),null;case 26:var l=e.type,i=e.memoizedState;return t===null?(Ke(e),i!==null?(zt(e),zf(e,i)):(zt(e),Bo(e,l,null,a,n))):i?i!==t.memoizedState?(Ke(e),zt(e),zf(e,i)):(zt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&Ke(e),zt(e),Bo(e,l,t,a,n)),null;case 27:if(Ul(e),n=dt.current,l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return zt(e),null}t=F.current,ha(e)?fc(e):(t=Yd(l,a,n),e.stateNode=t,Ke(e))}return zt(e),null;case 5:if(Ul(e),l=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(!a){if(e.stateNode===null)throw Error(o(166));return zt(e),null}if(i=F.current,ha(e))fc(e);else{var u=ji(dt.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?u.createElement(l,{is:a.is}):u.createElement(l)}}i[It]=e,i[ee]=a;t:for(u=e.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break t;for(;u.sibling===null;){if(u.return===null||u.return===e)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}e.stateNode=i;t:switch($t(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Ke(e)}}return zt(e),Bo(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&Ke(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(o(166));if(t=dt.current,ha(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,l=Jt,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}t[It]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Md(t.nodeValue,n)),t||sn(e,!0)}else t=ji(t).createTextNode(a),t[It]=e,e.stateNode=t}return zt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=ha(e),n!==null){if(t===null){if(!a)throw Error(o(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(o(557));t[It]=e}else Hn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),t=!1}else n=Qu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ge(e),e):(ge(e),null);if((e.flags&128)!==0)throw Error(o(558))}return zt(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=ha(e),a!==null&&a.dehydrated!==null){if(t===null){if(!l)throw Error(o(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(o(317));l[It]=e}else Hn(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),l=!1}else l=Qu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return e.flags&256?(ge(e),e):(ge(e),null)}return ge(e),(e.flags&128)!==0?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),xi(e,e.updateQueue),zt(e),null);case 4:return Ct(),t===null&&ls(e.stateNode.containerInfo),zt(e),null;case 10:return Xe(e.type),zt(e),null;case 19:if(z(Ht),a=e.memoizedState,a===null)return zt(e),null;if(l=(e.flags&128)!==0,i=a.rendering,i===null)if(l)dl(a,!1);else{if(Bt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=fi(t),i!==null){for(e.flags|=128,dl(a,!1),t=i.updateQueue,e.updateQueue=t,xi(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)uc(n,t),n=n.sibling;return G(Ht,Ht.current&1|2),vt&&qe(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&se()>Mi&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304)}else{if(!l)if(t=fi(i),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,xi(e,t),dl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!vt)return zt(e),null}else 2*se()-a.renderingStartTime>Mi&&n!==536870912&&(e.flags|=128,l=!0,dl(a,!1),e.lanes=4194304);a.isBackwards?(i.sibling=e.child,e.child=i):(t=a.last,t!==null?t.sibling=i:e.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=se(),t.sibling=null,n=Ht.current,G(Ht,l?n&1|2:n&1),vt&&qe(e,a.treeForkCount),t):(zt(e),null);case 22:case 23:return ge(e),lo(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(n&536870912)!==0&&(e.flags&128)===0&&(zt(e),e.subtreeFlags&6&&(e.flags|=8192)):zt(e),n=e.updateQueue,n!==null&&xi(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&z(Yn),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Xe(Yt),zt(e),null;case 25:return null;case 30:return null}throw Error(o(156,e.tag))}function jm(t,e){switch(Xu(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Xe(Yt),Ct(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Ul(e),null;case 31:if(e.memoizedState!==null){if(ge(e),e.alternate===null)throw Error(o(340));Hn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ge(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(o(340));Hn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return z(Ht),null;case 4:return Ct(),null;case 10:return Xe(e.type),null;case 22:case 23:return ge(e),lo(),t!==null&&z(Yn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Xe(Yt),null;case 25:return null;default:return null}}function Of(t,e){switch(Xu(e),e.tag){case 3:Xe(Yt),Ct();break;case 26:case 27:case 5:Ul(e);break;case 4:Ct();break;case 31:e.memoizedState!==null&&ge(e);break;case 13:ge(e);break;case 19:z(Ht);break;case 10:Xe(e.type);break;case 22:case 23:ge(e),lo(),t!==null&&z(Yn);break;case 24:Xe(Yt)}}function hl(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&t)===t){a=void 0;var i=n.create,u=n.inst;a=i(),u.destroy=a}n=n.next}while(n!==l)}}catch(r){At(e,e.return,r)}}function mn(t,e,n){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&t)===t){var u=a.inst,r=u.destroy;if(r!==void 0){u.destroy=void 0,l=e;var m=n,x=r;try{x()}catch(M){At(l,m,M)}}}a=a.next}while(a!==i)}}catch(M){At(e,e.return,M)}}function Uf(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{xc(e,n)}catch(a){At(t,t.return,a)}}}function Bf(t,e,n){n.props=Qn(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){At(t,e,a)}}function gl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(l){At(t,e,l)}}function ze(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){At(t,e,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){At(t,e,l)}else n.current=null}function Hf(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){At(t,t.return,l)}}function Ho(t,e,n){try{var a=t.stateNode;o0(a,t.type,n,e),a[ee]=e}catch(l){At(t,t.return,l)}}function Lf(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Tn(t.type)||t.tag===4}function Lo(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Lf(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Tn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function jo(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Le));else if(a!==4&&(a===27&&Tn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(jo(t,e,n),t=t.sibling;t!==null;)jo(t,e,n),t=t.sibling}function Ai(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&Tn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ai(t,e,n),t=t.sibling;t!==null;)Ai(t,e,n),t=t.sibling}function jf(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,l=e.attributes;l.length;)e.removeAttributeNode(l[0]);$t(e,a,n),e[It]=t,e[ee]=n}catch(i){At(t,t.return,i)}}var Ie=!1,Xt=!1,Yo=!1,Yf=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function Ym(t,e){if(t=t.containerInfo,os=Zi,t=Wr(t),ku(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var u=0,r=-1,m=-1,x=0,M=0,k=t,A=null;e:for(;;){for(var C;k!==n||l!==0&&k.nodeType!==3||(r=u+l),k!==i||a!==0&&k.nodeType!==3||(m=u+a),k.nodeType===3&&(u+=k.nodeValue.length),(C=k.firstChild)!==null;)A=k,k=C;for(;;){if(k===t)break e;if(A===n&&++x===l&&(r=u),A===i&&++M===a&&(m=u),(C=k.nextSibling)!==null)break;k=A,A=k.parentNode}k=C}n=r===-1||m===-1?null:{start:r,end:m}}else n=null}n=n||{start:0,end:0}}else n=null;for(ss={focusedElem:t,selectionRange:n},Zi=!1,Zt=e;Zt!==null;)if(e=Zt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Zt=t;else for(;Zt!==null;){switch(e=Zt,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)l=t[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,n=e,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var J=Qn(n.type,l);t=a.getSnapshotBeforeUpdate(J,i),a.__reactInternalSnapshotBeforeUpdate=t}catch(lt){At(n,n.return,lt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)fs(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":fs(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(o(163))}if(t=e.sibling,t!==null){t.return=e.return,Zt=t;break}Zt=e.return}}function qf(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Fe(t,n),a&4&&hl(5,n);break;case 1:if(Fe(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(u){At(n,n.return,u)}else{var l=Qn(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(l,e,t.__reactInternalSnapshotBeforeUpdate)}catch(u){At(n,n.return,u)}}a&64&&Uf(n),a&512&&gl(n,n.return);break;case 3:if(Fe(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{xc(t,e)}catch(u){At(n,n.return,u)}}break;case 27:e===null&&a&4&&jf(n);case 26:case 5:Fe(t,n),e===null&&a&4&&Hf(n),a&512&&gl(n,n.return);break;case 12:Fe(t,n);break;case 31:Fe(t,n),a&4&&Vf(t,n);break;case 13:Fe(t,n),a&4&&Qf(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Jm.bind(null,n),m0(t,n))));break;case 22:if(a=n.memoizedState!==null||Ie,!a){e=e!==null&&e.memoizedState!==null||Xt,l=Ie;var i=Xt;Ie=a,(Xt=e)&&!i?We(t,n,(n.subtreeFlags&8772)!==0):Fe(t,n),Ie=l,Xt=i}break;case 30:break;default:Fe(t,n)}}function Gf(t){var e=t.alternate;e!==null&&(t.alternate=null,Gf(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&mu(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Ot=null,ae=!1;function Je(t,e,n){for(n=n.child;n!==null;)Xf(t,e,n),n=n.sibling}function Xf(t,e,n){if(re&&typeof re.onCommitFiberUnmount=="function")try{re.onCommitFiberUnmount(La,n)}catch{}switch(n.tag){case 26:Xt||ze(n,e),Je(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Xt||ze(n,e);var a=Ot,l=ae;Tn(n.type)&&(Ot=n.stateNode,ae=!1),Je(t,e,n),El(n.stateNode),Ot=a,ae=l;break;case 5:Xt||ze(n,e);case 6:if(a=Ot,l=ae,Ot=null,Je(t,e,n),Ot=a,ae=l,Ot!==null)if(ae)try{(Ot.nodeType===9?Ot.body:Ot.nodeName==="HTML"?Ot.ownerDocument.body:Ot).removeChild(n.stateNode)}catch(i){At(n,e,i)}else try{Ot.removeChild(n.stateNode)}catch(i){At(n,e,i)}break;case 18:Ot!==null&&(ae?(t=Ot,Ud(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Oa(t)):Ud(Ot,n.stateNode));break;case 4:a=Ot,l=ae,Ot=n.stateNode.containerInfo,ae=!0,Je(t,e,n),Ot=a,ae=l;break;case 0:case 11:case 14:case 15:mn(2,n,e),Xt||mn(4,n,e),Je(t,e,n);break;case 1:Xt||(ze(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Bf(n,e,a)),Je(t,e,n);break;case 21:Je(t,e,n);break;case 22:Xt=(a=Xt)||n.memoizedState!==null,Je(t,e,n),Xt=a;break;default:Je(t,e,n)}}function Vf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Oa(t)}catch(n){At(e,e.return,n)}}}function Qf(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Oa(t)}catch(n){At(e,e.return,n)}}function qm(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Yf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Yf),e;default:throw Error(o(435,t.tag))}}function Ci(t,e){var n=qm(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var l=Fm.bind(null,t,a);a.then(l,l)}})}function le(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=t,u=e,r=u;t:for(;r!==null;){switch(r.tag){case 27:if(Tn(r.type)){Ot=r.stateNode,ae=!1;break t}break;case 5:Ot=r.stateNode,ae=!1;break t;case 3:case 4:Ot=r.stateNode.containerInfo,ae=!0;break t}r=r.return}if(Ot===null)throw Error(o(160));Xf(i,u,l),Ot=null,ae=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Zf(e,t),e=e.sibling}var Me=null;function Zf(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:le(e,t),ie(t),a&4&&(mn(3,t,t.return),hl(3,t),mn(5,t,t.return));break;case 1:le(e,t),ie(t),a&512&&(Xt||n===null||ze(n,n.return)),a&64&&Ie&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Me;if(le(e,t),ie(t),a&512&&(Xt||n===null||ze(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,l=l.ownerDocument||l;e:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[qa]||i[It]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),$t(i,a,n),i[It]=t,Qt(i),a=i;break t;case"link":var u=Zd("link","href",l).get(a+(n.href||""));if(u){for(var r=0;r<u.length;r++)if(i=u[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(r,1);break e}}i=l.createElement(a),$t(i,a,n),l.head.appendChild(i);break;case"meta":if(u=Zd("meta","content",l).get(a+(n.content||""))){for(r=0;r<u.length;r++)if(i=u[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(r,1);break e}}i=l.createElement(a),$t(i,a,n),l.head.appendChild(i);break;default:throw Error(o(468,a))}i[It]=t,Qt(i),a=i}t.stateNode=a}else Kd(l,t.type,t.stateNode);else t.stateNode=Qd(l,a,t.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Kd(l,t.type,t.stateNode):Qd(l,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Ho(t,t.memoizedProps,n.memoizedProps)}break;case 27:le(e,t),ie(t),a&512&&(Xt||n===null||ze(n,n.return)),n!==null&&a&4&&Ho(t,t.memoizedProps,n.memoizedProps);break;case 5:if(le(e,t),ie(t),a&512&&(Xt||n===null||ze(n,n.return)),t.flags&32){l=t.stateNode;try{aa(l,"")}catch(J){At(t,t.return,J)}}a&4&&t.stateNode!=null&&(l=t.memoizedProps,Ho(t,l,n!==null?n.memoizedProps:l)),a&1024&&(Yo=!0);break;case 6:if(le(e,t),ie(t),a&4){if(t.stateNode===null)throw Error(o(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(J){At(t,t.return,J)}}break;case 3:if(Gi=null,l=Me,Me=Yi(e.containerInfo),le(e,t),Me=l,ie(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Oa(e.containerInfo)}catch(J){At(t,t.return,J)}Yo&&(Yo=!1,Kf(t));break;case 4:a=Me,Me=Yi(t.stateNode.containerInfo),le(e,t),ie(t),Me=a;break;case 12:le(e,t),ie(t);break;case 31:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 13:le(e,t),ie(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(_i=se()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 22:l=t.memoizedState!==null;var m=n!==null&&n.memoizedState!==null,x=Ie,M=Xt;if(Ie=x||l,Xt=M||m,le(e,t),Xt=M,Ie=x,ie(t),a&8192)t:for(e=t.stateNode,e._visibility=l?e._visibility&-2:e._visibility|1,l&&(n===null||m||Ie||Xt||Zn(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){m=n=e;try{if(i=m.stateNode,l)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{r=m.stateNode;var k=m.memoizedProps.style,A=k!=null&&k.hasOwnProperty("display")?k.display:null;r.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(J){At(m,m.return,J)}}}else if(e.tag===6){if(n===null){m=e;try{m.stateNode.nodeValue=l?"":m.memoizedProps}catch(J){At(m,m.return,J)}}}else if(e.tag===18){if(n===null){m=e;try{var C=m.stateNode;l?Bd(C,!0):Bd(m.stateNode,!1)}catch(J){At(m,m.return,J)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ci(t,n))));break;case 19:le(e,t),ie(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,Ci(t,a)));break;case 30:break;case 21:break;default:le(e,t),ie(t)}}function ie(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(Lf(a)){n=a;break}a=a.return}if(n==null)throw Error(o(160));switch(n.tag){case 27:var l=n.stateNode,i=Lo(t);Ai(t,i,l);break;case 5:var u=n.stateNode;n.flags&32&&(aa(u,""),n.flags&=-33);var r=Lo(t);Ai(t,r,u);break;case 3:case 4:var m=n.stateNode.containerInfo,x=Lo(t);jo(t,x,m);break;default:throw Error(o(161))}}catch(M){At(t,t.return,M)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Kf(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Kf(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Fe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)qf(t,e.alternate,e),e=e.sibling}function Zn(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:mn(4,e,e.return),Zn(e);break;case 1:ze(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Bf(e,e.return,n),Zn(e);break;case 27:El(e.stateNode);case 26:case 5:ze(e,e.return),Zn(e);break;case 22:e.memoizedState===null&&Zn(e);break;case 30:Zn(e);break;default:Zn(e)}t=t.sibling}}function We(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,l=t,i=e,u=i.flags;switch(i.tag){case 0:case 11:case 15:We(l,i,n),hl(4,i);break;case 1:if(We(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(x){At(a,a.return,x)}if(a=i,l=a.updateQueue,l!==null){var r=a.stateNode;try{var m=l.shared.hiddenCallbacks;if(m!==null)for(l.shared.hiddenCallbacks=null,l=0;l<m.length;l++)Ec(m[l],r)}catch(x){At(a,a.return,x)}}n&&u&64&&Uf(i),gl(i,i.return);break;case 27:jf(i);case 26:case 5:We(l,i,n),n&&a===null&&u&4&&Hf(i),gl(i,i.return);break;case 12:We(l,i,n);break;case 31:We(l,i,n),n&&u&4&&Vf(l,i);break;case 13:We(l,i,n),n&&u&4&&Qf(l,i);break;case 22:i.memoizedState===null&&We(l,i,n),gl(i,i.return);break;case 30:break;default:We(l,i,n)}e=e.sibling}}function qo(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&tl(n))}function Go(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t))}function De(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)If(t,e,n,a),e=e.sibling}function If(t,e,n,a){var l=e.flags;switch(e.tag){case 0:case 11:case 15:De(t,e,n,a),l&2048&&hl(9,e);break;case 1:De(t,e,n,a);break;case 3:De(t,e,n,a),l&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&tl(t)));break;case 12:if(l&2048){De(t,e,n,a),t=e.stateNode;try{var i=e.memoizedProps,u=i.id,r=i.onPostCommit;typeof r=="function"&&r(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(m){At(e,e.return,m)}}else De(t,e,n,a);break;case 31:De(t,e,n,a);break;case 13:De(t,e,n,a);break;case 23:break;case 22:i=e.stateNode,u=e.alternate,e.memoizedState!==null?i._visibility&2?De(t,e,n,a):ml(t,e):i._visibility&2?De(t,e,n,a):(i._visibility|=2,Ea(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),l&2048&&qo(u,e);break;case 24:De(t,e,n,a),l&2048&&Go(e.alternate,e);break;default:De(t,e,n,a)}}function Ea(t,e,n,a,l){for(l=l&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,u=e,r=n,m=a,x=u.flags;switch(u.tag){case 0:case 11:case 15:Ea(i,u,r,m,l),hl(8,u);break;case 23:break;case 22:var M=u.stateNode;u.memoizedState!==null?M._visibility&2?Ea(i,u,r,m,l):ml(i,u):(M._visibility|=2,Ea(i,u,r,m,l)),l&&x&2048&&qo(u.alternate,u);break;case 24:Ea(i,u,r,m,l),l&&x&2048&&Go(u.alternate,u);break;default:Ea(i,u,r,m,l)}e=e.sibling}}function ml(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,l=a.flags;switch(a.tag){case 22:ml(n,a),l&2048&&qo(a.alternate,a);break;case 24:ml(n,a),l&2048&&Go(a.alternate,a);break;default:ml(n,a)}e=e.sibling}}var pl=8192;function xa(t,e,n){if(t.subtreeFlags&pl)for(t=t.child;t!==null;)Jf(t,e,n),t=t.sibling}function Jf(t,e,n){switch(t.tag){case 26:xa(t,e,n),t.flags&pl&&t.memoizedState!==null&&N0(n,Me,t.memoizedState,t.memoizedProps);break;case 5:xa(t,e,n);break;case 3:case 4:var a=Me;Me=Yi(t.stateNode.containerInfo),xa(t,e,n),Me=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=pl,pl=16777216,xa(t,e,n),pl=a):xa(t,e,n));break;default:xa(t,e,n)}}function Ff(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function yl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,$f(a,t)}Ff(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Wf(t),t=t.sibling}function Wf(t){switch(t.tag){case 0:case 11:case 15:yl(t),t.flags&2048&&mn(9,t,t.return);break;case 3:yl(t);break;case 12:yl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ni(t)):yl(t);break;default:yl(t)}}function Ni(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Zt=a,$f(a,t)}Ff(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:mn(8,e,e.return),Ni(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ni(e));break;default:Ni(e)}t=t.sibling}}function $f(t,e){for(;Zt!==null;){var n=Zt;switch(n.tag){case 0:case 11:case 15:mn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:tl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Zt=a;else t:for(n=t;Zt!==null;){a=Zt;var l=a.sibling,i=a.return;if(Gf(a),a===n){Zt=null;break t}if(l!==null){l.return=i,Zt=l;break t}Zt=i}}}var Gm={getCacheForType:function(t){var e=Ft(Yt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Ft(Yt).controller.signal}},Xm=typeof WeakMap=="function"?WeakMap:Map,Tt=0,Dt=null,gt=null,pt=0,xt=0,me=null,pn=!1,Aa=!1,Xo=!1,$e=0,Bt=0,yn=0,Kn=0,Vo=0,pe=0,Ca=0,vl=null,ue=null,Qo=!1,_i=0,Pf=0,Mi=1/0,Di=null,vn=null,Vt=0,bn=null,Na=null,Pe=0,Zo=0,Ko=null,td=null,bl=0,Io=null;function ye(){return(Tt&2)!==0&&pt!==0?pt&-pt:_.T!==null?ts():mr()}function ed(){if(pe===0)if((pt&536870912)===0||vt){var t=Ll;Ll<<=1,(Ll&3932160)===0&&(Ll=262144),pe=t}else pe=536870912;return t=he.current,t!==null&&(t.flags|=32),pe}function oe(t,e,n){(t===Dt&&(xt===2||xt===9)||t.cancelPendingCommit!==null)&&(_a(t,0),wn(t,pt,pe,!1)),Ya(t,n),((Tt&2)===0||t!==Dt)&&(t===Dt&&((Tt&2)===0&&(Kn|=n),Bt===4&&wn(t,pt,pe,!1)),Oe(t))}function nd(t,e,n){if((Tt&6)!==0)throw Error(o(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||ja(t,e),l=a?Zm(t,e):Fo(t,e,!0),i=a;do{if(l===0){Aa&&!a&&wn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!Vm(n)){l=Fo(t,e,!1),i=!1;continue}if(l===2){if(i=e,t.errorRecoveryDisabledLanes&i)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var r=t;l=vl;var m=r.current.memoizedState.isDehydrated;if(m&&(_a(r,u).flags|=256),u=Fo(r,u,!1),u!==2){if(Xo&&!m){r.errorRecoveryDisabledLanes|=i,Kn|=i,l=4;break t}i=ue,ue=l,i!==null&&(ue===null?ue=i:ue.push.apply(ue,i))}l=u}if(i=!1,l!==2)continue}}if(l===1){_a(t,0),wn(t,e,0,!0);break}t:{switch(a=t,i=l,i){case 0:case 1:throw Error(o(345));case 4:if((e&4194048)!==e)break;case 6:wn(a,e,pe,!pn);break t;case 2:ue=null;break;case 3:case 5:break;default:throw Error(o(329))}if((e&62914560)===e&&(l=_i+300-se(),10<l)){if(wn(a,e,pe,!pn),Yl(a,0,!0)!==0)break t;Pe=e,a.timeoutHandle=zd(ad.bind(null,a,n,ue,Di,Qo,e,pe,Kn,Ca,pn,i,"Throttled",-0,0),l);break t}ad(a,n,ue,Di,Qo,e,pe,Kn,Ca,pn,i,null,-0,0)}}break}while(!0);Oe(t)}function ad(t,e,n,a,l,i,u,r,m,x,M,k,A,C){if(t.timeoutHandle=-1,k=e.subtreeFlags,k&8192||(k&16785408)===16785408){k={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Le},Jf(e,i,k);var J=(i&62914560)===i?_i-se():(i&4194048)===i?Pf-se():0;if(J=_0(k,J),J!==null){Pe=i,t.cancelPendingCommit=J(fd.bind(null,t,e,i,n,a,l,u,r,m,M,k,null,A,C)),wn(t,i,u,!x);return}}fd(t,e,i,n,a,l,u,r,m)}function Vm(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!fe(i(),l))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wn(t,e,n,a){e&=~Vo,e&=~Kn,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var l=e;0<l;){var i=31-ce(l),u=1<<i;a[i]=-1,l&=~u}n!==0&&dr(t,n,e)}function Ri(){return(Tt&6)===0?(wl(0),!1):!0}function Jo(){if(gt!==null){if(xt===0)var t=gt.return;else t=gt,Ge=Ln=null,co(t),va=null,nl=0,t=gt;for(;t!==null;)Of(t.alternate,t),t=t.return;gt=null}}function _a(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,c0(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pe=0,Jo(),Dt=t,gt=n=Ye(t.current,null),pt=e,xt=0,me=null,pn=!1,Aa=ja(t,e),Xo=!1,Ca=pe=Vo=Kn=yn=Bt=0,ue=vl=null,Qo=!1,(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var l=31-ce(a),i=1<<l;e|=t[l],a&=~i}return $e=e,$l(),n}function ld(t,e){rt=null,_.H=cl,e===ya||e===ui?(e=bc(),xt=3):e===$u?(e=bc(),xt=4):xt=e===No?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,me=e,gt===null&&(Bt=1,wi(t,Se(e,t.current)))}function id(){var t=he.current;return t===null?!0:(pt&4194048)===pt?Ae===null:(pt&62914560)===pt||(pt&536870912)!==0?t===Ae:!1}function ud(){var t=_.H;return _.H=cl,t===null?cl:t}function od(){var t=_.A;return _.A=Gm,t}function ki(){Bt=4,pn||(pt&4194048)!==pt&&he.current!==null||(Aa=!0),(yn&134217727)===0&&(Kn&134217727)===0||Dt===null||wn(Dt,pt,pe,!1)}function Fo(t,e,n){var a=Tt;Tt|=2;var l=ud(),i=od();(Dt!==t||pt!==e)&&(Di=null,_a(t,e)),e=!1;var u=Bt;t:do try{if(xt!==0&&gt!==null){var r=gt,m=me;switch(xt){case 8:Jo(),u=6;break t;case 3:case 2:case 9:case 6:he.current===null&&(e=!0);var x=xt;if(xt=0,me=null,Ma(t,r,m,x),n&&Aa){u=0;break t}break;default:x=xt,xt=0,me=null,Ma(t,r,m,x)}}Qm(),u=Bt;break}catch(M){ld(t,M)}while(!0);return e&&t.shellSuspendCounter++,Ge=Ln=null,Tt=a,_.H=l,_.A=i,gt===null&&(Dt=null,pt=0,$l()),u}function Qm(){for(;gt!==null;)sd(gt)}function Zm(t,e){var n=Tt;Tt|=2;var a=ud(),l=od();Dt!==t||pt!==e?(Di=null,Mi=se()+500,_a(t,e)):Aa=ja(t,e);t:do try{if(xt!==0&&gt!==null){e=gt;var i=me;e:switch(xt){case 1:xt=0,me=null,Ma(t,e,i,1);break;case 2:case 9:if(yc(i)){xt=0,me=null,rd(e);break}e=function(){xt!==2&&xt!==9||Dt!==t||(xt=7),Oe(t)},i.then(e,e);break t;case 3:xt=7;break t;case 4:xt=5;break t;case 7:yc(i)?(xt=0,me=null,rd(e)):(xt=0,me=null,Ma(t,e,i,7));break;case 5:var u=null;switch(gt.tag){case 26:u=gt.memoizedState;case 5:case 27:var r=gt;if(u?Id(u):r.stateNode.complete){xt=0,me=null;var m=r.sibling;if(m!==null)gt=m;else{var x=r.return;x!==null?(gt=x,zi(x)):gt=null}break e}}xt=0,me=null,Ma(t,e,i,5);break;case 6:xt=0,me=null,Ma(t,e,i,6);break;case 8:Jo(),Bt=6;break t;default:throw Error(o(462))}}Km();break}catch(M){ld(t,M)}while(!0);return Ge=Ln=null,_.H=a,_.A=l,Tt=n,gt!==null?0:(Dt=null,pt=0,$l(),Bt)}function Km(){for(;gt!==null&&!pg();)sd(gt)}function sd(t){var e=kf(t.alternate,t,$e);t.memoizedProps=t.pendingProps,e===null?zi(t):gt=e}function rd(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Cf(n,e,e.pendingProps,e.type,void 0,pt);break;case 11:e=Cf(n,e,e.pendingProps,e.type.render,e.ref,pt);break;case 5:co(e);default:Of(n,e),e=gt=uc(e,$e),e=kf(n,e,$e)}t.memoizedProps=t.pendingProps,e===null?zi(t):gt=e}function Ma(t,e,n,a){Ge=Ln=null,co(e),va=null,nl=0;var l=e.return;try{if(Um(t,l,e,n,pt)){Bt=1,wi(t,Se(n,t.current)),gt=null;return}}catch(i){if(l!==null)throw gt=l,i;Bt=1,wi(t,Se(n,t.current)),gt=null;return}e.flags&32768?(vt||a===1?t=!0:Aa||(pt&536870912)!==0?t=!1:(pn=t=!0,(a===2||a===9||a===3||a===6)&&(a=he.current,a!==null&&a.tag===13&&(a.flags|=16384))),cd(e,t)):zi(e)}function zi(t){var e=t;do{if((e.flags&32768)!==0){cd(e,pn);return}t=e.return;var n=Lm(e.alternate,e,$e);if(n!==null){gt=n;return}if(e=e.sibling,e!==null){gt=e;return}gt=e=t}while(e!==null);Bt===0&&(Bt=5)}function cd(t,e){do{var n=jm(t.alternate,t);if(n!==null){n.flags&=32767,gt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){gt=t;return}gt=t=n}while(t!==null);Bt=6,gt=null}function fd(t,e,n,a,l,i,u,r,m){t.cancelPendingCommit=null;do Oi();while(Vt!==0);if((Tt&6)!==0)throw Error(o(327));if(e!==null){if(e===t.current)throw Error(o(177));if(i=e.lanes|e.childLanes,i|=Hu,Cg(t,n,i,u,r,m),t===Dt&&(gt=Dt=null,pt=0),Na=e,bn=t,Pe=n,Zo=i,Ko=l,td=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Wm(Bl,function(){return pd(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=_.T,_.T=null,l=X.p,X.p=2,u=Tt,Tt|=4;try{Ym(t,e,n)}finally{Tt=u,X.p=l,_.T=a}}Vt=1,dd(),hd(),gd()}}function dd(){if(Vt===1){Vt=0;var t=bn,e=Na,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=_.T,_.T=null;var a=X.p;X.p=2;var l=Tt;Tt|=4;try{Zf(e,t);var i=ss,u=Wr(t.containerInfo),r=i.focusedElem,m=i.selectionRange;if(u!==r&&r&&r.ownerDocument&&Fr(r.ownerDocument.documentElement,r)){if(m!==null&&ku(r)){var x=m.start,M=m.end;if(M===void 0&&(M=x),"selectionStart"in r)r.selectionStart=x,r.selectionEnd=Math.min(M,r.value.length);else{var k=r.ownerDocument||document,A=k&&k.defaultView||window;if(A.getSelection){var C=A.getSelection(),J=r.textContent.length,lt=Math.min(m.start,J),Mt=m.end===void 0?lt:Math.min(m.end,J);!C.extend&&lt>Mt&&(u=Mt,Mt=lt,lt=u);var S=Jr(r,lt),y=Jr(r,Mt);if(S&&y&&(C.rangeCount!==1||C.anchorNode!==S.node||C.anchorOffset!==S.offset||C.focusNode!==y.node||C.focusOffset!==y.offset)){var E=k.createRange();E.setStart(S.node,S.offset),C.removeAllRanges(),lt>Mt?(C.addRange(E),C.extend(y.node,y.offset)):(E.setEnd(y.node,y.offset),C.addRange(E))}}}}for(k=[],C=r;C=C.parentNode;)C.nodeType===1&&k.push({element:C,left:C.scrollLeft,top:C.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<k.length;r++){var R=k[r];R.element.scrollLeft=R.left,R.element.scrollTop=R.top}}Zi=!!os,ss=os=null}finally{Tt=l,X.p=a,_.T=n}}t.current=e,Vt=2}}function hd(){if(Vt===2){Vt=0;var t=bn,e=Na,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=_.T,_.T=null;var a=X.p;X.p=2;var l=Tt;Tt|=4;try{qf(t,e.alternate,e)}finally{Tt=l,X.p=a,_.T=n}}Vt=3}}function gd(){if(Vt===4||Vt===3){Vt=0,yg();var t=bn,e=Na,n=Pe,a=td;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Vt=5:(Vt=0,Na=bn=null,md(t,t.pendingLanes));var l=t.pendingLanes;if(l===0&&(vn=null),hu(n),e=e.stateNode,re&&typeof re.onCommitFiberRoot=="function")try{re.onCommitFiberRoot(La,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=_.T,l=X.p,X.p=2,_.T=null;try{for(var i=t.onRecoverableError,u=0;u<a.length;u++){var r=a[u];i(r.value,{componentStack:r.stack})}}finally{_.T=e,X.p=l}}(Pe&3)!==0&&Oi(),Oe(t),l=t.pendingLanes,(n&261930)!==0&&(l&42)!==0?t===Io?bl++:(bl=0,Io=t):bl=0,wl(0)}}function md(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,tl(e)))}function Oi(){return dd(),hd(),gd(),pd()}function pd(){if(Vt!==5)return!1;var t=bn,e=Zo;Zo=0;var n=hu(Pe),a=_.T,l=X.p;try{X.p=32>n?32:n,_.T=null,n=Ko,Ko=null;var i=bn,u=Pe;if(Vt=0,Na=bn=null,Pe=0,(Tt&6)!==0)throw Error(o(331));var r=Tt;if(Tt|=4,Wf(i.current),If(i,i.current,u,n),Tt=r,wl(0,!1),re&&typeof re.onPostCommitFiberRoot=="function")try{re.onPostCommitFiberRoot(La,i)}catch{}return!0}finally{X.p=l,_.T=a,md(t,e)}}function yd(t,e,n){e=Se(n,e),e=Co(t.stateNode,e,2),t=dn(t,e,2),t!==null&&(Ya(t,2),Oe(t))}function At(t,e,n){if(t.tag===3)yd(t,t,n);else for(;e!==null;){if(e.tag===3){yd(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(vn===null||!vn.has(a))){t=Se(n,t),n=vf(2),a=dn(e,n,2),a!==null&&(bf(n,a,e,t),Ya(a,2),Oe(a));break}}e=e.return}}function Wo(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new Xm;var l=new Set;a.set(e,l)}else l=a.get(e),l===void 0&&(l=new Set,a.set(e,l));l.has(n)||(Xo=!0,l.add(n),t=Im.bind(null,t,e,n),e.then(t,t))}function Im(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Dt===t&&(pt&n)===n&&(Bt===4||Bt===3&&(pt&62914560)===pt&&300>se()-_i?(Tt&2)===0&&_a(t,0):Vo|=n,Ca===pt&&(Ca=0)),Oe(t)}function vd(t,e){e===0&&(e=fr()),t=Un(t,e),t!==null&&(Ya(t,e),Oe(t))}function Jm(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),vd(t,n)}function Fm(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,l=t.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(o(314))}a!==null&&a.delete(e),vd(t,n)}function Wm(t,e){return ru(t,e)}var Ui=null,Da=null,$o=!1,Bi=!1,Po=!1,Sn=0;function Oe(t){t!==Da&&t.next===null&&(Da===null?Ui=Da=t:Da=Da.next=t),Bi=!0,$o||($o=!0,Pm())}function wl(t,e){if(!Po&&Bi){Po=!0;do for(var n=!1,a=Ui;a!==null;){if(t!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var u=a.suspendedLanes,r=a.pingedLanes;i=(1<<31-ce(42|t)+1)-1,i&=l&~(u&~r),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Td(a,i))}else i=pt,i=Yl(a,a===Dt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||ja(a,i)||(n=!0,Td(a,i));a=a.next}while(n);Po=!1}}function $m(){bd()}function bd(){Bi=$o=!1;var t=0;Sn!==0&&r0()&&(t=Sn);for(var e=se(),n=null,a=Ui;a!==null;){var l=a.next,i=wd(a,e);i===0?(a.next=null,n===null?Ui=l:n.next=l,l===null&&(Da=n)):(n=a,(t!==0||(i&3)!==0)&&(Bi=!0)),a=l}Vt!==0&&Vt!==5||wl(t),Sn!==0&&(Sn=0)}function wd(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,l=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var u=31-ce(i),r=1<<u,m=l[u];m===-1?((r&n)===0||(r&a)!==0)&&(l[u]=Ag(r,e)):m<=e&&(t.expiredLanes|=r),i&=~r}if(e=Dt,n=pt,n=Yl(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(xt===2||xt===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&cu(a),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||ja(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&cu(a),hu(n)){case 2:case 8:n=rr;break;case 32:n=Bl;break;case 268435456:n=cr;break;default:n=Bl}return a=Sd.bind(null,t),n=ru(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&cu(a),t.callbackPriority=2,t.callbackNode=null,2}function Sd(t,e){if(Vt!==0&&Vt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Oi()&&t.callbackNode!==n)return null;var a=pt;return a=Yl(t,t===Dt?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(nd(t,a,e),wd(t,se()),t.callbackNode!=null&&t.callbackNode===n?Sd.bind(null,t):null)}function Td(t,e){if(Oi())return null;nd(t,e,!0)}function Pm(){f0(function(){(Tt&6)!==0?ru(sr,$m):bd()})}function ts(){if(Sn===0){var t=ma;t===0&&(t=Hl,Hl<<=1,(Hl&261888)===0&&(Hl=256)),Sn=t}return Sn}function Ed(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Vl(""+t)}function xd(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function t0(t,e,n,a,l){if(e==="submit"&&n&&n.stateNode===l){var i=Ed((l[ee]||null).action),u=a.submitter;u&&(e=(e=u[ee]||null)?Ed(e.formAction):u.getAttribute("formAction"),e!==null&&(i=e,u=null));var r=new Il("action","action",null,a,l);t.push({event:r,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Sn!==0){var m=u?xd(l,u):new FormData(l);wo(n,{pending:!0,data:m,method:l.method,action:i},null,m)}}else typeof i=="function"&&(r.preventDefault(),m=u?xd(l,u):new FormData(l),wo(n,{pending:!0,data:m,method:l.method,action:i},i,m))},currentTarget:l}]})}}for(var es=0;es<Bu.length;es++){var ns=Bu[es],e0=ns.toLowerCase(),n0=ns[0].toUpperCase()+ns.slice(1);_e(e0,"on"+n0)}_e(tc,"onAnimationEnd"),_e(ec,"onAnimationIteration"),_e(nc,"onAnimationStart"),_e("dblclick","onDoubleClick"),_e("focusin","onFocus"),_e("focusout","onBlur"),_e(vm,"onTransitionRun"),_e(bm,"onTransitionStart"),_e(wm,"onTransitionCancel"),_e(ac,"onTransitionEnd"),ea("onMouseEnter",["mouseout","mouseover"]),ea("onMouseLeave",["mouseout","mouseover"]),ea("onPointerEnter",["pointerout","pointerover"]),ea("onPointerLeave",["pointerout","pointerover"]),Rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Rn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Sl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),a0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Sl));function Ad(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],l=a.event;a=a.listeners;t:{var i=void 0;if(e)for(var u=a.length-1;0<=u;u--){var r=a[u],m=r.instance,x=r.currentTarget;if(r=r.listener,m!==i&&l.isPropagationStopped())break t;i=r,l.currentTarget=x;try{i(l)}catch(M){Wl(M)}l.currentTarget=null,i=m}else for(u=0;u<a.length;u++){if(r=a[u],m=r.instance,x=r.currentTarget,r=r.listener,m!==i&&l.isPropagationStopped())break t;i=r,l.currentTarget=x;try{i(l)}catch(M){Wl(M)}l.currentTarget=null,i=m}}}}function mt(t,e){var n=e[gu];n===void 0&&(n=e[gu]=new Set);var a=t+"__bubble";n.has(a)||(Cd(e,t,2,!1),n.add(a))}function as(t,e,n){var a=0;e&&(a|=4),Cd(n,t,a,e)}var Hi="_reactListening"+Math.random().toString(36).slice(2);function ls(t){if(!t[Hi]){t[Hi]=!0,vr.forEach(function(n){n!=="selectionchange"&&(a0.has(n)||as(n,!1,t),as(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Hi]||(e[Hi]=!0,as("selectionchange",!1,e))}}function Cd(t,e,n,a){switch(eh(e)){case 2:var l=R0;break;case 8:l=k0;break;default:l=bs}n=l.bind(null,e,n,t),l=void 0,!Eu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),a?l!==void 0?t.addEventListener(e,n,{capture:!0,passive:l}):t.addEventListener(e,n,!0):l!==void 0?t.addEventListener(e,n,{passive:l}):t.addEventListener(e,n,!1)}function is(t,e,n,a,l){var i=a;if((e&1)===0&&(e&2)===0&&a!==null)t:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var r=a.stateNode.containerInfo;if(r===l)break;if(u===4)for(u=a.return;u!==null;){var m=u.tag;if((m===3||m===4)&&u.stateNode.containerInfo===l)return;u=u.return}for(;r!==null;){if(u=$n(r),u===null)return;if(m=u.tag,m===5||m===6||m===26||m===27){a=i=u;continue t}r=r.parentNode}}a=a.return}Dr(function(){var x=i,M=Su(n),k=[];t:{var A=lc.get(t);if(A!==void 0){var C=Il,J=t;switch(t){case"keypress":if(Zl(n)===0)break t;case"keydown":case"keyup":C=Fg;break;case"focusin":J="focus",C=Nu;break;case"focusout":J="blur",C=Nu;break;case"beforeblur":case"afterblur":C=Nu;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=zr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=Lg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=Pg;break;case tc:case ec:case nc:C=qg;break;case ac:C=em;break;case"scroll":case"scrollend":C=Bg;break;case"wheel":C=am;break;case"copy":case"cut":case"paste":C=Xg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=Ur;break;case"toggle":case"beforetoggle":C=im}var lt=(e&4)!==0,Mt=!lt&&(t==="scroll"||t==="scrollend"),S=lt?A!==null?A+"Capture":null:A;lt=[];for(var y=x,E;y!==null;){var R=y;if(E=R.stateNode,R=R.tag,R!==5&&R!==26&&R!==27||E===null||S===null||(R=Xa(y,S),R!=null&&lt.push(Tl(y,R,E))),Mt)break;y=y.return}0<lt.length&&(A=new C(A,J,null,n,M),k.push({event:A,listeners:lt}))}}if((e&7)===0){t:{if(A=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",A&&n!==wu&&(J=n.relatedTarget||n.fromElement)&&($n(J)||J[Wn]))break t;if((C||A)&&(A=M.window===M?M:(A=M.ownerDocument)?A.defaultView||A.parentWindow:window,C?(J=n.relatedTarget||n.toElement,C=x,J=J?$n(J):null,J!==null&&(Mt=d(J),lt=J.tag,J!==Mt||lt!==5&&lt!==27&&lt!==6)&&(J=null)):(C=null,J=x),C!==J)){if(lt=zr,R="onMouseLeave",S="onMouseEnter",y="mouse",(t==="pointerout"||t==="pointerover")&&(lt=Ur,R="onPointerLeave",S="onPointerEnter",y="pointer"),Mt=C==null?A:Ga(C),E=J==null?A:Ga(J),A=new lt(R,y+"leave",C,n,M),A.target=Mt,A.relatedTarget=E,R=null,$n(M)===x&&(lt=new lt(S,y+"enter",J,n,M),lt.target=E,lt.relatedTarget=Mt,R=lt),Mt=R,C&&J)e:{for(lt=l0,S=C,y=J,E=0,R=S;R;R=lt(R))E++;R=0;for(var et=y;et;et=lt(et))R++;for(;0<E-R;)S=lt(S),E--;for(;0<R-E;)y=lt(y),R--;for(;E--;){if(S===y||y!==null&&S===y.alternate){lt=S;break e}S=lt(S),y=lt(y)}lt=null}else lt=null;C!==null&&Nd(k,A,C,lt,!1),J!==null&&Mt!==null&&Nd(k,Mt,J,lt,!0)}}t:{if(A=x?Ga(x):window,C=A.nodeName&&A.nodeName.toLowerCase(),C==="select"||C==="input"&&A.type==="file")var bt=Xr;else if(qr(A))if(Vr)bt=mm;else{bt=hm;var $=dm}else C=A.nodeName,!C||C.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?x&&bu(x.elementType)&&(bt=Xr):bt=gm;if(bt&&(bt=bt(t,x))){Gr(k,bt,n,M);break t}$&&$(t,A,x),t==="focusout"&&x&&A.type==="number"&&x.memoizedProps.value!=null&&vu(A,"number",A.value)}switch($=x?Ga(x):window,t){case"focusin":(qr($)||$.contentEditable==="true")&&(oa=$,zu=x,Wa=null);break;case"focusout":Wa=zu=oa=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,$r(k,n,M);break;case"selectionchange":if(ym)break;case"keydown":case"keyup":$r(k,n,M)}var ft;if(Mu)t:{switch(t){case"compositionstart":var yt="onCompositionStart";break t;case"compositionend":yt="onCompositionEnd";break t;case"compositionupdate":yt="onCompositionUpdate";break t}yt=void 0}else ua?jr(t,n)&&(yt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(yt="onCompositionStart");yt&&(Br&&n.locale!=="ko"&&(ua||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&ua&&(ft=Rr()):(ln=M,xu="value"in ln?ln.value:ln.textContent,ua=!0)),$=Li(x,yt),0<$.length&&(yt=new Or(yt,t,null,n,M),k.push({event:yt,listeners:$}),ft?yt.data=ft:(ft=Yr(n),ft!==null&&(yt.data=ft)))),(ft=om?sm(t,n):rm(t,n))&&(yt=Li(x,"onBeforeInput"),0<yt.length&&($=new Or("onBeforeInput","beforeinput",null,n,M),k.push({event:$,listeners:yt}),$.data=ft)),t0(k,t,x,n,M)}Ad(k,e)})}function Tl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Li(t,e){for(var n=e+"Capture",a=[];t!==null;){var l=t,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Xa(t,n),l!=null&&a.unshift(Tl(t,l,i)),l=Xa(t,e),l!=null&&a.push(Tl(t,l,i))),t.tag===3)return a;t=t.return}return[]}function l0(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Nd(t,e,n,a,l){for(var i=e._reactName,u=[];n!==null&&n!==a;){var r=n,m=r.alternate,x=r.stateNode;if(r=r.tag,m!==null&&m===a)break;r!==5&&r!==26&&r!==27||x===null||(m=x,l?(x=Xa(n,i),x!=null&&u.unshift(Tl(n,x,m))):l||(x=Xa(n,i),x!=null&&u.push(Tl(n,x,m)))),n=n.return}u.length!==0&&t.push({event:e,listeners:u})}var i0=/\r\n?/g,u0=/\u0000|\uFFFD/g;function _d(t){return(typeof t=="string"?t:""+t).replace(i0,`
`).replace(u0,"")}function Md(t,e){return e=_d(e),_d(t)===e}function _t(t,e,n,a,l,i){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||aa(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&aa(t,""+a);break;case"className":Gl(t,"class",a);break;case"tabIndex":Gl(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Gl(t,n,a);break;case"style":_r(t,a,i);break;case"data":if(e!=="object"){Gl(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Vl(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&_t(t,e,"name",l.name,l,null),_t(t,e,"formEncType",l.formEncType,l,null),_t(t,e,"formMethod",l.formMethod,l,null),_t(t,e,"formTarget",l.formTarget,l,null)):(_t(t,e,"encType",l.encType,l,null),_t(t,e,"method",l.method,l,null),_t(t,e,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Vl(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=Le);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Vl(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":mt("beforetoggle",t),mt("toggle",t),ql(t,"popover",a);break;case"xlinkActuate":He(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":He(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":He(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":He(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":He(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":He(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":He(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":He(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":He(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":ql(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Og.get(n)||n,ql(t,n,a))}}function us(t,e,n,a,l,i){switch(n){case"style":_r(t,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(o(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(o(60));t.innerHTML=n}}break;case"children":typeof a=="string"?aa(t,a):(typeof a=="number"||typeof a=="bigint")&&aa(t,""+a);break;case"onScroll":a!=null&&mt("scroll",t);break;case"onScrollEnd":a!=null&&mt("scrollend",t);break;case"onClick":a!=null&&(t.onclick=Le);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!br.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),e=n.slice(2,l?n.length-7:void 0),i=t[ee]||null,i=i!=null?i[n]:null,typeof i=="function"&&t.removeEventListener(e,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,l);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):ql(t,n,a)}}}function $t(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:_t(t,e,i,u,n,null)}}l&&_t(t,e,"srcSet",n.srcSet,n,null),a&&_t(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var r=i=u=l=null,m=null,x=null;for(a in n)if(n.hasOwnProperty(a)){var M=n[a];if(M!=null)switch(a){case"name":l=M;break;case"type":u=M;break;case"checked":m=M;break;case"defaultChecked":x=M;break;case"value":i=M;break;case"defaultValue":r=M;break;case"children":case"dangerouslySetInnerHTML":if(M!=null)throw Error(o(137,e));break;default:_t(t,e,a,M,n,null)}}xr(t,i,r,m,x,u,l,!1);return;case"select":mt("invalid",t),a=u=i=null;for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case"value":i=r;break;case"defaultValue":u=r;break;case"multiple":a=r;default:_t(t,e,l,r,n,null)}e=i,n=u,t.multiple=!!a,e!=null?na(t,!!a,e,!1):n!=null&&na(t,!!a,n,!0);return;case"textarea":mt("invalid",t),i=l=a=null;for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case"value":a=r;break;case"defaultValue":l=r;break;case"children":i=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(o(91));break;default:_t(t,e,u,r,n,null)}Cr(t,a,l,i);return;case"option":for(m in n)if(n.hasOwnProperty(m)&&(a=n[m],a!=null))switch(m){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:_t(t,e,m,a,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(a=0;a<Sl.length;a++)mt(Sl[a],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(x in n)if(n.hasOwnProperty(x)&&(a=n[x],a!=null))switch(x){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,e));default:_t(t,e,x,a,n,null)}return;default:if(bu(e)){for(M in n)n.hasOwnProperty(M)&&(a=n[M],a!==void 0&&us(t,e,M,a,n,void 0));return}}for(r in n)n.hasOwnProperty(r)&&(a=n[r],a!=null&&_t(t,e,r,a,n,null))}function o0(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,u=null,r=null,m=null,x=null,M=null;for(C in n){var k=n[C];if(n.hasOwnProperty(C)&&k!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":m=k;default:a.hasOwnProperty(C)||_t(t,e,C,null,a,k)}}for(var A in a){var C=a[A];if(k=n[A],a.hasOwnProperty(A)&&(C!=null||k!=null))switch(A){case"type":i=C;break;case"name":l=C;break;case"checked":x=C;break;case"defaultChecked":M=C;break;case"value":u=C;break;case"defaultValue":r=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(o(137,e));break;default:C!==k&&_t(t,e,A,C,a,k)}}yu(t,u,r,m,x,M,i,l);return;case"select":C=u=r=A=null;for(i in n)if(m=n[i],n.hasOwnProperty(i)&&m!=null)switch(i){case"value":break;case"multiple":C=m;default:a.hasOwnProperty(i)||_t(t,e,i,null,a,m)}for(l in a)if(i=a[l],m=n[l],a.hasOwnProperty(l)&&(i!=null||m!=null))switch(l){case"value":A=i;break;case"defaultValue":r=i;break;case"multiple":u=i;default:i!==m&&_t(t,e,l,i,a,m)}e=r,n=u,a=C,A!=null?na(t,!!n,A,!1):!!a!=!!n&&(e!=null?na(t,!!n,e,!0):na(t,!!n,n?[]:"",!1));return;case"textarea":C=A=null;for(r in n)if(l=n[r],n.hasOwnProperty(r)&&l!=null&&!a.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:_t(t,e,r,null,a,l)}for(u in a)if(l=a[u],i=n[u],a.hasOwnProperty(u)&&(l!=null||i!=null))switch(u){case"value":A=l;break;case"defaultValue":C=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(o(91));break;default:l!==i&&_t(t,e,u,l,a,i)}Ar(t,A,C);return;case"option":for(var J in n)if(A=n[J],n.hasOwnProperty(J)&&A!=null&&!a.hasOwnProperty(J))switch(J){case"selected":t.selected=!1;break;default:_t(t,e,J,null,a,A)}for(m in a)if(A=a[m],C=n[m],a.hasOwnProperty(m)&&A!==C&&(A!=null||C!=null))switch(m){case"selected":t.selected=A&&typeof A!="function"&&typeof A!="symbol";break;default:_t(t,e,m,A,a,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var lt in n)A=n[lt],n.hasOwnProperty(lt)&&A!=null&&!a.hasOwnProperty(lt)&&_t(t,e,lt,null,a,A);for(x in a)if(A=a[x],C=n[x],a.hasOwnProperty(x)&&A!==C&&(A!=null||C!=null))switch(x){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(o(137,e));break;default:_t(t,e,x,A,a,C)}return;default:if(bu(e)){for(var Mt in n)A=n[Mt],n.hasOwnProperty(Mt)&&A!==void 0&&!a.hasOwnProperty(Mt)&&us(t,e,Mt,void 0,a,A);for(M in a)A=a[M],C=n[M],!a.hasOwnProperty(M)||A===C||A===void 0&&C===void 0||us(t,e,M,A,a,C);return}}for(var S in n)A=n[S],n.hasOwnProperty(S)&&A!=null&&!a.hasOwnProperty(S)&&_t(t,e,S,null,a,A);for(k in a)A=a[k],C=n[k],!a.hasOwnProperty(k)||A===C||A==null&&C==null||_t(t,e,k,A,a,C)}function Dd(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function s0(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,u=l.initiatorType,r=l.duration;if(i&&r&&Dd(u)){for(u=0,r=l.responseEnd,a+=1;a<n.length;a++){var m=n[a],x=m.startTime;if(x>r)break;var M=m.transferSize,k=m.initiatorType;M&&Dd(k)&&(m=m.responseEnd,u+=M*(m<r?1:(r-x)/(m-x)))}if(--a,e+=8*(i+u)/(l.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var os=null,ss=null;function ji(t){return t.nodeType===9?t:t.ownerDocument}function Rd(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function kd(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function rs(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var cs=null;function r0(){var t=window.event;return t&&t.type==="popstate"?t===cs?!1:(cs=t,!0):(cs=null,!1)}var zd=typeof setTimeout=="function"?setTimeout:void 0,c0=typeof clearTimeout=="function"?clearTimeout:void 0,Od=typeof Promise=="function"?Promise:void 0,f0=typeof queueMicrotask=="function"?queueMicrotask:typeof Od<"u"?function(t){return Od.resolve(null).then(t).catch(d0)}:zd;function d0(t){setTimeout(function(){throw t})}function Tn(t){return t==="head"}function Ud(t,e){var n=e,a=0;do{var l=n.nextSibling;if(t.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(l),Oa(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")El(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,El(n);for(var i=n.firstChild;i;){var u=i.nextSibling,r=i.nodeName;i[qa]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=u}}else n==="body"&&El(t.ownerDocument.body);n=l}while(n);Oa(e)}function Bd(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function fs(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":fs(n),mu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function h0(t,e,n,a){for(;t.nodeType===1;){var l=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[qa])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ce(t.nextSibling),t===null)break}return null}function g0(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ce(t.nextSibling),t===null))return null;return t}function Hd(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ce(t.nextSibling),t===null))return null;return t}function ds(t){return t.data==="$?"||t.data==="$~"}function hs(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function m0(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function Ce(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var gs=null;function Ld(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ce(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function jd(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Yd(t,e,n){switch(e=ji(n),t){case"html":if(t=e.documentElement,!t)throw Error(o(452));return t;case"head":if(t=e.head,!t)throw Error(o(453));return t;case"body":if(t=e.body,!t)throw Error(o(454));return t;default:throw Error(o(451))}}function El(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);mu(t)}var Ne=new Map,qd=new Set;function Yi(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var tn=X.d;X.d={f:p0,r:y0,D:v0,C:b0,L:w0,m:S0,X:E0,S:T0,M:x0};function p0(){var t=tn.f(),e=Ri();return t||e}function y0(t){var e=Pn(t);e!==null&&e.tag===5&&e.type==="form"?af(e):tn.r(t)}var Ra=typeof document>"u"?null:document;function Gd(t,e,n){var a=Ra;if(a&&typeof e=="string"&&e){var l=be(e);l='link[rel="'+t+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),qd.has(l)||(qd.add(l),t={rel:t,crossOrigin:n,href:e},a.querySelector(l)===null&&(e=a.createElement("link"),$t(e,"link",t),Qt(e),a.head.appendChild(e)))}}function v0(t){tn.D(t),Gd("dns-prefetch",t,null)}function b0(t,e){tn.C(t,e),Gd("preconnect",t,e)}function w0(t,e,n){tn.L(t,e,n);var a=Ra;if(a&&t&&e){var l='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+be(n.imageSizes)+'"]')):l+='[href="'+be(t)+'"]';var i=l;switch(e){case"style":i=ka(t);break;case"script":i=za(t)}Ne.has(i)||(t=D({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ne.set(i,t),a.querySelector(l)!==null||e==="style"&&a.querySelector(xl(i))||e==="script"&&a.querySelector(Al(i))||(e=a.createElement("link"),$t(e,"link",t),Qt(e),a.head.appendChild(e)))}}function S0(t,e){tn.m(t,e);var n=Ra;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",l='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=za(t)}if(!Ne.has(i)&&(t=D({rel:"modulepreload",href:t},e),Ne.set(i,t),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Al(i)))return}a=n.createElement("link"),$t(a,"link",t),Qt(a),n.head.appendChild(a)}}}function T0(t,e,n){tn.S(t,e,n);var a=Ra;if(a&&t){var l=ta(a).hoistableStyles,i=ka(t);e=e||"default";var u=l.get(i);if(!u){var r={loading:0,preload:null};if(u=a.querySelector(xl(i)))r.loading=5;else{t=D({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ne.get(i))&&ms(t,n);var m=u=a.createElement("link");Qt(m),$t(m,"link",t),m._p=new Promise(function(x,M){m.onload=x,m.onerror=M}),m.addEventListener("load",function(){r.loading|=1}),m.addEventListener("error",function(){r.loading|=2}),r.loading|=4,qi(u,e,a)}u={type:"stylesheet",instance:u,count:1,state:r},l.set(i,u)}}}function E0(t,e){tn.X(t,e);var n=Ra;if(n&&t){var a=ta(n).hoistableScripts,l=za(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=D({src:t,async:!0},e),(e=Ne.get(l))&&ps(t,e),i=n.createElement("script"),Qt(i),$t(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function x0(t,e){tn.M(t,e);var n=Ra;if(n&&t){var a=ta(n).hoistableScripts,l=za(t),i=a.get(l);i||(i=n.querySelector(Al(l)),i||(t=D({src:t,async:!0,type:"module"},e),(e=Ne.get(l))&&ps(t,e),i=n.createElement("script"),Qt(i),$t(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Xd(t,e,n,a){var l=(l=dt.current)?Yi(l):null;if(!l)throw Error(o(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=ka(n.href),n=ta(l).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=ka(n.href);var i=ta(l).hoistableStyles,u=i.get(t);if(u||(l=l.ownerDocument||l,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,u),(i=l.querySelector(xl(t)))&&!i._p&&(u.instance=i,u.state.loading=5),Ne.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ne.set(t,n),i||A0(l,t,n,u.state))),e&&a===null)throw Error(o(528,""));return u}if(e&&a!==null)throw Error(o(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=za(n),n=ta(l).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,t))}}function ka(t){return'href="'+be(t)+'"'}function xl(t){return'link[rel="stylesheet"]['+t+"]"}function Vd(t){return D({},t,{"data-precedence":t.precedence,precedence:null})}function A0(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),$t(e,"link",n),Qt(e),t.head.appendChild(e))}function za(t){return'[src="'+be(t)+'"]'}function Al(t){return"script[async]"+t}function Qd(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Qt(a),a;var l=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Qt(a),$t(a,"style",l),qi(a,n.precedence,t),e.instance=a;case"stylesheet":l=ka(n.href);var i=t.querySelector(xl(l));if(i)return e.state.loading|=4,e.instance=i,Qt(i),i;a=Vd(n),(l=Ne.get(l))&&ms(a,l),i=(t.ownerDocument||t).createElement("link"),Qt(i);var u=i;return u._p=new Promise(function(r,m){u.onload=r,u.onerror=m}),$t(i,"link",a),e.state.loading|=4,qi(i,n.precedence,t),e.instance=i;case"script":return i=za(n.src),(l=t.querySelector(Al(i)))?(e.instance=l,Qt(l),l):(a=n,(l=Ne.get(i))&&(a=D({},n),ps(a,l)),t=t.ownerDocument||t,l=t.createElement("script"),Qt(l),$t(l,"link",a),t.head.appendChild(l),e.instance=l);case"void":return null;default:throw Error(o(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,qi(a,n.precedence,t));return e.instance}function qi(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,u=0;u<a.length;u++){var r=a[u];if(r.dataset.precedence===e)i=r;else if(i!==l)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function ms(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function ps(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Gi=null;function Zd(t,e,n){if(Gi===null){var a=new Map,l=Gi=new Map;l.set(n,a)}else l=Gi,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),l=0;l<n.length;l++){var i=n[l];if(!(i[qa]||i[It]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(e)||"";u=t+u;var r=a.get(u);r?r.push(i):a.set(u,[i])}}return a}function Kd(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function C0(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Id(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function N0(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=ka(a.href),i=e.querySelector(xl(l));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Xi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,Qt(i);return}i=e.ownerDocument||e,a=Vd(a),(l=Ne.get(l))&&ms(a,l),i=i.createElement("link"),Qt(i);var u=i;u._p=new Promise(function(r,m){u.onload=r,u.onerror=m}),$t(i,"link",a),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Xi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var ys=0;function _0(t,e){return t.stylesheets&&t.count===0&&Qi(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Qi(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&ys===0&&(ys=62500*s0());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Qi(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>ys?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function Xi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Qi(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Vi=null;function Qi(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Vi=new Map,e.forEach(M0,t),Vi=null,Xi.call(t))}function M0(t,e){if(!(e.state.loading&4)){var n=Vi.get(t);if(n)var a=n.get(null);else{n=new Map,Vi.set(t,n);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var u=l[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}l=e.instance,u=l.getAttribute("data-precedence"),i=n.get(u)||a,i===a&&n.set(null,l),n.set(u,l),this.count++,a=Xi.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),e.state.loading|=4}}var Cl={$$typeof:Y,Provider:null,Consumer:null,_currentValue:at,_currentValue2:at,_threadCount:0};function D0(t,e,n,a,l,i,u,r,m){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=fu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fu(0),this.hiddenUpdates=fu(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=m,this.incompleteTransitions=new Map}function Jd(t,e,n,a,l,i,u,r,m,x,M,k){return t=new D0(t,e,n,u,m,x,M,k,r),e=1,i===!0&&(e|=24),i=de(3,null,null,e),t.current=i,i.stateNode=t,e=Ju(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:e},Pu(i),t}function Fd(t){return t?(t=ca,t):ca}function Wd(t,e,n,a,l,i){l=Fd(l),a.context===null?a.context=l:a.pendingContext=l,a=fn(e),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=dn(t,a,e),n!==null&&(oe(n,t,e),ll(n,t,e))}function $d(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function vs(t,e){$d(t,e),(t=t.alternate)&&$d(t,e)}function Pd(t){if(t.tag===13||t.tag===31){var e=Un(t,67108864);e!==null&&oe(e,t,67108864),vs(t,67108864)}}function th(t){if(t.tag===13||t.tag===31){var e=ye();e=du(e);var n=Un(t,e);n!==null&&oe(n,t,e),vs(t,e)}}var Zi=!0;function R0(t,e,n,a){var l=_.T;_.T=null;var i=X.p;try{X.p=2,bs(t,e,n,a)}finally{X.p=i,_.T=l}}function k0(t,e,n,a){var l=_.T;_.T=null;var i=X.p;try{X.p=8,bs(t,e,n,a)}finally{X.p=i,_.T=l}}function bs(t,e,n,a){if(Zi){var l=ws(a);if(l===null)is(t,e,a,Ki,n),nh(t,a);else if(O0(l,t,e,n,a))a.stopPropagation();else if(nh(t,a),e&4&&-1<z0.indexOf(t)){for(;l!==null;){var i=Pn(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=Dn(i.pendingLanes);if(u!==0){var r=i;for(r.pendingLanes|=2,r.entangledLanes|=2;u;){var m=1<<31-ce(u);r.entanglements[1]|=m,u&=~m}Oe(i),(Tt&6)===0&&(Mi=se()+500,wl(0))}}break;case 31:case 13:r=Un(i,2),r!==null&&oe(r,i,2),Ri(),vs(i,2)}if(i=ws(a),i===null&&is(t,e,a,Ki,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else is(t,e,a,null,n)}}function ws(t){return t=Su(t),Ss(t)}var Ki=null;function Ss(t){if(Ki=null,t=$n(t),t!==null){var e=d(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=v(e),t!==null)return t;t=null}else if(n===31){if(t=T(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ki=t,null}function eh(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(vg()){case sr:return 2;case rr:return 8;case Bl:case bg:return 32;case cr:return 268435456;default:return 32}default:return 32}}var Ts=!1,En=null,xn=null,An=null,Nl=new Map,_l=new Map,Cn=[],z0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function nh(t,e){switch(t){case"focusin":case"focusout":En=null;break;case"dragenter":case"dragleave":xn=null;break;case"mouseover":case"mouseout":An=null;break;case"pointerover":case"pointerout":Nl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":_l.delete(e.pointerId)}}function Ml(t,e,n,a,l,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},e!==null&&(e=Pn(e),e!==null&&Pd(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),t)}function O0(t,e,n,a,l){switch(e){case"focusin":return En=Ml(En,t,e,n,a,l),!0;case"dragenter":return xn=Ml(xn,t,e,n,a,l),!0;case"mouseover":return An=Ml(An,t,e,n,a,l),!0;case"pointerover":var i=l.pointerId;return Nl.set(i,Ml(Nl.get(i)||null,t,e,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,_l.set(i,Ml(_l.get(i)||null,t,e,n,a,l)),!0}return!1}function ah(t){var e=$n(t.target);if(e!==null){var n=d(e);if(n!==null){if(e=n.tag,e===13){if(e=v(n),e!==null){t.blockedOn=e,pr(t.priority,function(){th(n)});return}}else if(e===31){if(e=T(n),e!==null){t.blockedOn=e,pr(t.priority,function(){th(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ii(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=ws(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);wu=a,n.target.dispatchEvent(a),wu=null}else return e=Pn(n),e!==null&&Pd(e),t.blockedOn=n,!1;e.shift()}return!0}function lh(t,e,n){Ii(t)&&n.delete(e)}function U0(){Ts=!1,En!==null&&Ii(En)&&(En=null),xn!==null&&Ii(xn)&&(xn=null),An!==null&&Ii(An)&&(An=null),Nl.forEach(lh),_l.forEach(lh)}function Ji(t,e){t.blockedOn===e&&(t.blockedOn=null,Ts||(Ts=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,U0)))}var Fi=null;function ih(t){Fi!==t&&(Fi=t,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){Fi===t&&(Fi=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],l=t[e+2];if(typeof a!="function"){if(Ss(a||n)===null)continue;break}var i=Pn(n);i!==null&&(t.splice(e,3),e-=3,wo(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function Oa(t){function e(m){return Ji(m,t)}En!==null&&Ji(En,t),xn!==null&&Ji(xn,t),An!==null&&Ji(An,t),Nl.forEach(e),_l.forEach(e);for(var n=0;n<Cn.length;n++){var a=Cn[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<Cn.length&&(n=Cn[0],n.blockedOn===null);)ah(n),n.blockedOn===null&&Cn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],u=l[ee]||null;if(typeof i=="function")u||ih(n);else if(u){var r=null;if(i&&i.hasAttribute("formAction")){if(l=i,u=i[ee]||null)r=u.formAction;else if(Ss(l)!==null)continue}else r=u.action;typeof r=="function"?n[a+1]=r:(n.splice(a,3),a-=3),ih(n)}}}function uh(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return l=u})},focusReset:"manual",scroll:"manual"})}function e(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),l!==null&&(l(),l=null)}}}function Es(t){this._internalRoot=t}Wi.prototype.render=Es.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(o(409));var n=e.current,a=ye();Wd(n,a,t,e,null,null)},Wi.prototype.unmount=Es.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Wd(t.current,2,null,t,null,null),Ri(),e[Wn]=null}};function Wi(t){this._internalRoot=t}Wi.prototype.unstable_scheduleHydration=function(t){if(t){var e=mr();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Cn.length&&e!==0&&e<Cn[n].priority;n++);Cn.splice(n,0,t),n===0&&ah(t)}};var oh=c.version;if(oh!=="19.2.6")throw Error(o(527,oh,"19.2.6"));X.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(o(188)):(t=Object.keys(t).join(","),Error(o(268,t)));return t=w(e),t=t!==null?O(t):null,t=t===null?null:t.stateNode,t};var B0={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:_,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $i=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$i.isDisabled&&$i.supportsFiber)try{La=$i.inject(B0),re=$i}catch{}}return Rl.createRoot=function(t,e){if(!f(t))throw Error(o(299));var n=!1,a="",l=gf,i=mf,u=pf;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError)),e=Jd(t,1,!1,null,null,n,a,null,l,i,u,uh),t[Wn]=e.current,ls(t),new Es(e)},Rl.hydrateRoot=function(t,e,n){if(!f(t))throw Error(o(299));var a=!1,l="",i=gf,u=mf,r=pf,m=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(r=n.onRecoverableError),n.formState!==void 0&&(m=n.formState)),e=Jd(t,1,!0,e,n??null,a,l,m,i,u,r,uh),e.context=Fd(null),n=e.current,a=ye(),a=du(a),l=fn(a),l.callback=null,dn(n,l,a),n=a,e.current.lanes=n,Ya(e,n),Oe(e),t[Wn]=e.current,ls(t),new Wi(e)},Rl.version="19.2.6",Rl}var yh;function K0(){if(yh)return Cs.exports;yh=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(c){console.error(c)}}return s(),Cs.exports=Z0(),Cs.exports}var I0=K0();function nu({group:s,size:c="md",dim:h}){const o=c==="sm"?"px-2 py-0.5 text-xs":"px-3 py-1 text-sm";return p.jsx("span",{className:`inline-flex items-center rounded-full font-semibold ${s.bgClass} ${s.textClass} ${o} ${h?"opacity-40":""}`,children:s.label})}const Ua=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],vh=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function lg(s){if(s.length===0)return"";const c=[...s].sort((O,D)=>O.date.localeCompare(D.date)),h=c[0].date,o=c[c.length-1].date,[f,d,v]=h.split("-").map(Number),[T,g,w]=o.split("-").map(Number);return h===o?`${Ua[d-1]} ${v}, ${f}`:f===T&&d===g?`${Ua[d-1]} ${v}–${w}, ${f}`:f===T?`${Ua[d-1]} ${v} – ${Ua[g-1]} ${w}, ${f}`:`${Ua[d-1]} ${v}, ${f} – ${Ua[g-1]} ${w}, ${T}`}function J0(s){if(s.length===0)return"";const c=[...s].sort((L,q)=>L.date.localeCompare(q.date)),h=c[0].date,o=c[c.length-1].date,[f,d,v]=h.split("-").map(Number),[T,g,w]=o.split("-").map(Number),O=vh[new Date(f,d-1,v).getDay()],D=lg(s);if(h===o)return`${D} (${O})`;const B=vh[new Date(T,g-1,w).getDay()];return`${D} (${O}–${B})`}function bh(s){return s.subtitle??lg(s.days)}function en(s){const[c,h]=s.split(":").map(Number);return c*60+h}const F0=30;function W0(s,c){let h=-1;for(let T=0;T<s.length&&en(s[T])<=c;T++)h=T;if(h===-1)return{index:-1,progress:0};const o=en(s[h]),f=s[h+1]?en(s[h+1]):null,d=f!==null?f:o+F0;if(c>=d)return{index:-1,progress:0};const v=d===o?0:(c-o)/(d-o);return{index:h,progress:Math.max(0,Math.min(1,v))}}function ig(s){const[c,h]=s.split(":").map(Number);return`${c%12||12}:${h.toString().padStart(2,"0")}`}function ug(s){const[c]=s.split(":").map(Number);return c>=12?"PM":"AM"}function ar(){const s=new Date;return s.getHours()*60+s.getMinutes()}function Ol(){const s=new Date,c=s.getFullYear(),h=String(s.getMonth()+1).padStart(2,"0"),o=String(s.getDate()).padStart(2,"0");return`${c}-${h}-${o}`}function $0(){const s=new Date,c=s.getHours(),h=s.getMinutes(),o=c%12||12,f=c>=12?"PM":"AM";return`${o}:${h.toString().padStart(2,"0")} ${f}`}function P0(s){if(s<=0)return"";if(s<60)return`${s} min`;const c=Math.floor(s/60),h=s%60;return h===0?`${c}h`:`${c}h ${h}m`}function tp(s){const c=new Date(s);if(isNaN(c.getTime()))return s;const h=c.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),o=c.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${h}, ${o}`}function wh(s,c){return s.flatMap(h=>{const o=c.find(f=>f.id===h);return o?[o]:[]})}function ep({activity:s,runGroups:c,past:h}){const o=wh(s.onTrack,c),f=wh(s.inClass??[],c);return p.jsx("div",{className:`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${h?"opacity-60":""}`,children:p.jsxs("div",{className:"flex gap-4",children:[p.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[ig(s.time),p.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:ug(s.time)})]}),p.jsxs("div",{className:"flex flex-1 flex-col gap-3",children:[o.length>0&&p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"On track"}),p.jsx("div",{className:"flex flex-wrap gap-1.5",children:o.map(d=>p.jsx(nu,{group:d},d.id))})]}),f.length>0&&p.jsxs(p.Fragment,{children:[o.length>0&&p.jsx("div",{className:"border-t border-gray-100"}),p.jsxs("div",{className:"flex items-center gap-3",children:[p.jsx("span",{className:"w-16 shrink-0 text-xs text-gray-900",children:"In class"}),p.jsx("div",{className:"flex flex-wrap gap-1.5",children:f.map(d=>p.jsx(nu,{group:d},d.id))})]})]}),s.note&&p.jsx("p",{className:"text-xs italic text-gray-500",children:s.note})]})]})})}/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const np=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),og=(...s)=>s.filter((c,h,o)=>!!c&&c.trim()!==""&&o.indexOf(c)===h).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ap={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lp=ct.forwardRef(({color:s="currentColor",size:c=24,strokeWidth:h=2,absoluteStrokeWidth:o,className:f="",children:d,iconNode:v,...T},g)=>ct.createElement("svg",{ref:g,...ap,width:c,height:c,stroke:s,strokeWidth:o?Number(h)*24/Number(c):h,className:og("lucide",f),...T},[...v.map(([w,O])=>ct.createElement(w,O)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=(s,c)=>{const h=ct.forwardRef(({className:o,...f},d)=>ct.createElement(lp,{ref:d,iconNode:c,className:og(`lucide-${np(s)}`,o),...f}));return h.displayName=`${s}`,h};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ip=Kt("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lu=Kt("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sg=Kt("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const up=Kt("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rg=Kt("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const op=Kt("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sp=Kt("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rp=Kt("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cp=Kt("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=Kt("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dp=Kt("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hp=Kt("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gp=Kt("Pizza",[["path",{d:"m12 14-1 1",key:"11onhr"}],["path",{d:"m13.75 18.25-1.25 1.42",key:"1yisr3"}],["path",{d:"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",key:"1qtqk6"}],["path",{d:"M18.8 9.3a1 1 0 0 0 2.1 7.7",key:"fbbbr2"}],["path",{d:"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",key:"1hyfdd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mp=Kt("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pp=Kt("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yp=Kt("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vp=Kt("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const au=Kt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function bp({activity:s,past:c}){const h=s.type==="lunch"||s.type==="special";return p.jsx("div",{className:`rounded-xl p-4 shadow-sm transition-opacity ${h?"border-2 border-gray-900 bg-white my-2":"border border-gray-200 bg-white"} ${c?"opacity-60":""}`,children:p.jsxs("div",{className:"flex items-center gap-4",children:[p.jsxs("div",{className:"flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900",children:[ig(s.time),p.jsx("span",{className:"font-sans text-[10px] font-normal text-gray-400",children:ug(s.time)})]}),h&&p.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white",children:s.type==="lunch"?p.jsx(vp,{size:16}):p.jsx(gp,{size:16})}),p.jsxs("div",{children:[p.jsx("p",{className:"text-sm font-medium text-gray-900",children:s.label}),s.subtitle&&p.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:s.subtitle})]})]})})}const tr=ct.forwardRef(({activities:s},c)=>{const[,h]=ct.useState(0);ct.useEffect(()=>{const g=setInterval(()=>h(w=>w+1),3e4);return()=>clearInterval(g)},[]);const o=ar(),d=s.filter(g=>"time"in g).find(g=>en(g.time)>o),v=d?en(d.time)-o:null,T=v!==null?v<=5?"text-red-500":v<=10?"text-orange-500":"text-gray-400":"text-gray-400";return p.jsxs("div",{ref:c,"data-time-indicator":!0,className:"relative my-6",children:[p.jsxs("div",{className:"flex items-center -mr-3 sm:-mr-4",children:[p.jsx("div",{className:"h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500"}),p.jsx("div",{className:"h-0.5 flex-1 bg-blue-500"})]}),p.jsx("span",{className:"absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500",children:$0()}),v!==null&&p.jsxs("span",{className:`absolute right-0 -top-5 text-xs ${T}`,children:["Next activity starts in ",p.jsx("span",{className:"font-semibold",children:P0(v)})]})]})});tr.displayName="TimeIndicator";function Sh({collapsed:s,children:c}){return p.jsx("div",{"data-collapsed":s,"aria-hidden":s,className:"grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out",style:{gridTemplateRows:s?"0fr":"1fr",opacity:s?0:1,marginBottom:s?0:"0.5rem"},children:p.jsx("div",{className:"overflow-hidden",children:c})})}function wp({activities:s,runGroups:c,isToday:h,selectedGroups:o,hidePast:f}){const d=ct.useRef(null),[,v]=ct.useState(0);ct.useEffect(()=>{if(!h)return;const N=setInterval(()=>v(Y=>Y+1),6e4);return()=>clearInterval(N)},[h]),ct.useEffect(()=>{if(!h)return;const N=setTimeout(()=>{var Y;(Y=d.current)==null||Y.scrollIntoView({behavior:"smooth",block:"center"})},150);return()=>clearTimeout(N)},[h]);const T=ar(),g=s.flatMap(N=>{if(N.type!=="session")return[N];if(o.length===0)return[N];const Y=N.onTrack.filter(ut=>o.includes(ut)),K=(N.inClass??[]).filter(ut=>o.includes(ut));return Y.length===0&&K.length===0?[]:[{...N,onTrack:Y,inClass:K}]}),w=g.map(N=>N.type!=="break"&&f&&h&&en(N.time)<T);g.forEach((N,Y)=>{if(N.type!=="break")return;const K=g.slice(0,Y).some((ut,U)=>ut.type!=="break"&&!w[U]);w[Y]=!K});const O=[],D=[];g.forEach((N,Y)=>{N.type!=="break"&&(O.push(Y),D.push(N.time))});const{index:B}=h?W0(D,T):{index:-1},L=B===-1?-1:O[B],q=h?g.findIndex(N=>N.type!=="break"&&en(N.time)>T):-1,V=h&&q===-1&&g.length>0,I=g.length>0&&w.every(Boolean);let j;return p.jsxs("div",{className:"flex flex-col pb-10",children:[g.length>0&&p.jsx(Sh,{collapsed:!I,children:p.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm",children:[p.jsx("p",{className:"text-sm font-medium text-gray-500",children:"That's a wrap for today"}),p.jsx("p",{className:"text-xs text-gray-400",children:"Every activity on today's schedule has already happened."})]})}),g.map((N,Y)=>{const K=Y===L,ut=h&&N.type!=="break"&&!K&&en(N.time)<T;let U=null;!w[Y]&&N.type==="session"&&N.sessionNumber!==void 0&&N.sessionNumber!==j&&(j=N.sessionNumber,U=p.jsxs("div",{className:"mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400",children:["Session ",N.sessionNumber]}));const H=N.type==="break"?p.jsxs("div",{className:"flex items-center gap-2 py-1",children:[p.jsx("div",{className:"h-px flex-1 bg-gray-200"}),p.jsx("span",{className:"text-xs text-gray-400 italic",children:N.label}),p.jsx("div",{className:"h-px flex-1 bg-gray-200"})]}):N.type==="session"?p.jsx(ep,{activity:N,runGroups:c,past:ut}):p.jsx(bp,{activity:N,past:ut});return p.jsxs(Sh,{collapsed:w[Y],children:[Y===q&&p.jsx(tr,{ref:d,activities:g}),U,H]},Y)}),V&&p.jsx(tr,{ref:d,activities:g})]})}function Sp({groups:s,selected:c,onChange:h}){const[o,f]=ct.useState(!1),d=g=>h(c.includes(g)?c.filter(w=>w!==g):[...c,g]),v=c.length===0||c.length===s.length,T=s.filter(g=>c.includes(g.id));return p.jsxs("div",{className:"relative",children:[p.jsxs("button",{onClick:()=>f(g=>!g),className:"flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400",children:[v?p.jsx("span",{className:"text-gray-700",children:"All run groups"}):p.jsx("div",{className:"flex items-center gap-1",children:T.map(g=>p.jsx(nu,{group:g,size:"sm"},g.id))}),p.jsx(sg,{size:14,className:"text-gray-400"})]}),o&&p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>f(!1)}),p.jsxs("div",{className:"absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:[s.map(g=>p.jsxs("button",{onClick:()=>d(g.id),className:"flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50",children:[p.jsx(nu,{group:g,size:"md"}),c.includes(g.id)&&p.jsx(lu,{size:14,className:"text-blue-500"})]},g.id)),p.jsx("div",{className:"mt-1 border-t border-gray-100 pt-1",children:p.jsx("button",{onClick:()=>{h([]),f(!1)},className:"w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-50",children:v?"All selected":"Clear filter"})})]})]})]})}function Th(s){const c=Ol();return s.days.some(h=>h.date===c)}function Eh(){return p.jsxs("span",{className:"ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-green-700",children:[p.jsx("span",{className:"h-1 w-1 rounded-full bg-green-700 animate-pulse"}),"Live"]})}function Tp({events:s,active:c,onChange:h,onOpenDetails:o}){const[f,d]=ct.useState(!1);return p.jsxs("div",{className:"relative min-w-0 pl-1",children:[p.jsxs("button",{onClick:()=>d(v=>!v),className:"flex items-center gap-1 text-left group min-w-0",children:[p.jsx("h1",{className:"text-xl font-bold text-gray-900 leading-tight",children:c.name}),Th(c)&&p.jsx(Eh,{}),p.jsx(sg,{size:16,className:"shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"})]}),p.jsxs("div",{className:"flex items-center gap-0.5",children:[p.jsx("p",{className:"text-sm text-gray-500",children:bh(c)}),p.jsx("button",{onClick:o,"aria-label":"Event details",className:"inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900",children:p.jsx(rp,{size:14})})]}),f&&p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>d(!1)}),p.jsx("div",{className:"absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl",children:s.map(v=>p.jsxs("button",{onClick:()=>{h(v),d(!1)},className:`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left ${v.id===c.id?"bg-blue-50":"hover:bg-gray-50"}`,children:[p.jsxs("div",{children:[p.jsxs("div",{className:"flex items-center gap-1.5",children:[p.jsx("span",{className:"text-sm font-semibold text-gray-900",children:v.name}),Th(v)&&p.jsx(Eh,{})]}),p.jsx("div",{className:"text-xs text-gray-400",children:bh(v)})]}),v.id===c.id&&p.jsx(lu,{size:14,className:"text-blue-500 ml-3 shrink-0"})]},v.id))})]})]})}function Ep({checked:s,onChange:c,label:h}){return p.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"},children:[h&&p.jsx("span",{style:{fontSize:"14px",color:"#4b5563"},children:h}),p.jsx("button",{type:"button",role:"switch","aria-checked":s,onClick:c,style:{position:"relative",display:"inline-block",width:"44px",height:"24px",borderRadius:"12px",backgroundColor:s?"#000000":"#d1d5db",border:"none",cursor:"pointer",padding:0,flexShrink:0,transition:"background-color 0.2s ease",WebkitTapHighlightColor:"transparent"},children:p.jsx("span",{style:{position:"absolute",top:"2px",left:s?"22px":"2px",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.25)",transition:"left 0.2s ease",display:"block"}})})]})}const In=72,xp=110;function Ap({children:s,disabled:c}){const[h,o]=ct.useState(0),[f,d]=ct.useState("idle"),v=ct.useRef(null),T=ct.useRef(0);ct.useEffect(()=>{if(c)return;const D=q=>{window.scrollY===0&&(v.current=q.touches[0].clientY)},B=q=>{if(v.current===null)return;const V=q.touches[0].clientY-v.current;if(V<=0){v.current=null;return}q.preventDefault();const I=V<In?V:In+(V-In)*.25;T.current=Math.min(I,xp),o(T.current),d("pulling")},L=()=>{v.current!==null&&(v.current=null,T.current>=In?(d("refreshing"),o(In*.75),setTimeout(()=>window.location.reload(),600)):(d("releasing"),o(0),T.current=0,setTimeout(()=>d("idle"),250)))};return document.addEventListener("touchstart",D,{passive:!0}),document.addEventListener("touchmove",B,{passive:!1}),document.addEventListener("touchend",L),document.addEventListener("touchcancel",L),()=>{document.removeEventListener("touchstart",D),document.removeEventListener("touchmove",B),document.removeEventListener("touchend",L),document.removeEventListener("touchcancel",L)}},[c]);const g=f==="releasing"||f==="refreshing",w=Math.min(h/In,1),O=h>=In;return p.jsxs(p.Fragment,{children:[p.jsx("div",{className:"pointer-events-none fixed inset-x-0 z-50 flex justify-center",style:{top:-44,transform:`translateY(${h}px)`,transition:g?"transform 0.25s ease":"none"},children:p.jsx("div",{className:`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${O?"text-blue-500":"text-gray-400"}`,children:p.jsx(mp,{size:16,className:f==="refreshing"?"animate-spin":"",style:f!=="refreshing"?{transform:`rotate(${w*270}deg)`}:void 0})})}),p.jsx("div",{style:{transform:`translateY(${h}px)`,transition:g?"transform 0.25s ease":"none"},children:s})]})}function Cp({groups:s}){const c=s.filter(h=>h.description);return c.length===0?null:p.jsxs("div",{className:"mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",children:[p.jsx("div",{className:"mb-2 text-xs font-bold uppercase tracking-widest text-gray-400",children:"Legend"}),p.jsx("ul",{className:"flex flex-col gap-1.5",children:c.map(h=>p.jsxs("li",{className:"flex items-center gap-2 text-sm text-gray-700",children:[p.jsx("span",{className:`h-3 w-3 shrink-0 rounded-full ${h.bgClass}`,"aria-hidden":"true"}),p.jsx("span",{className:"font-medium text-gray-900",children:h.label}),p.jsx("span",{className:"text-gray-400",children:"·"}),p.jsx("span",{children:h.description})]},h.id))})]})}const xh=`// HPDE track-day schedule — iOS Home Screen widget for Scriptable.
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
`;function Np(){const[s,c]=ct.useState(!1);ct.useEffect(()=>{window.scrollTo(0,0)},[]);async function h(){await navigator.clipboard.writeText(xh),c(!0),setTimeout(()=>c(!1),2e3)}return p.jsx("div",{className:"min-h-screen bg-gray-50",children:p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Widget script"}),p.jsxs("div",{className:"flex items-center gap-2",children:[p.jsxs("button",{onClick:h,className:"flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400",children:[s?p.jsx(lu,{size:16,className:"text-green-600"}):p.jsx(rg,{size:16}),s?"Copied":"Copy"]}),p.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:p.jsx(au,{size:18})})]})]}),p.jsxs("p",{className:"mb-3 text-sm text-gray-500",children:["Paste this into Scriptable on your iPhone. See"," ",p.jsx("a",{href:"https://github.com/inko9nito/hpde/blob/main/scripts/README.md",className:"underline",children:"scripts/README.md"})," ","for install steps."]}),p.jsx("pre",{className:"overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm",children:p.jsx("code",{children:xh})})]})})}var Ba={},Ds,Ah;function _p(){return Ah||(Ah=1,Ds=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Ds}var Rs={},_n={},Ch;function Jn(){if(Ch)return _n;Ch=1;let s;const c=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return _n.getSymbolSize=function(o){if(!o)throw new Error('"version" cannot be null or undefined');if(o<1||o>40)throw new Error('"version" should be in range from 1 to 40');return o*4+17},_n.getSymbolTotalCodewords=function(o){return c[o]},_n.getBCHDigit=function(h){let o=0;for(;h!==0;)o++,h>>>=1;return o},_n.setToSJISFunction=function(o){if(typeof o!="function")throw new Error('"toSJISFunc" is not a valid function.');s=o},_n.isKanjiModeEnabled=function(){return typeof s<"u"},_n.toSJIS=function(o){return s(o)},_n}var ks={},Nh;function lr(){return Nh||(Nh=1,(function(s){s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2};function c(h){if(typeof h!="string")throw new Error("Param is not a string");switch(h.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+h)}}s.isValid=function(o){return o&&typeof o.bit<"u"&&o.bit>=0&&o.bit<4},s.from=function(o,f){if(s.isValid(o))return o;try{return c(o)}catch{return f}}})(ks)),ks}var zs,_h;function Mp(){if(_h)return zs;_h=1;function s(){this.buffer=[],this.length=0}return s.prototype={get:function(c){const h=Math.floor(c/8);return(this.buffer[h]>>>7-c%8&1)===1},put:function(c,h){for(let o=0;o<h;o++)this.putBit((c>>>h-o-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(c){const h=Math.floor(this.length/8);this.buffer.length<=h&&this.buffer.push(0),c&&(this.buffer[h]|=128>>>this.length%8),this.length++}},zs=s,zs}var Os,Mh;function Dp(){if(Mh)return Os;Mh=1;function s(c){if(!c||c<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=c,this.data=new Uint8Array(c*c),this.reservedBit=new Uint8Array(c*c)}return s.prototype.set=function(c,h,o,f){const d=c*this.size+h;this.data[d]=o,f&&(this.reservedBit[d]=!0)},s.prototype.get=function(c,h){return this.data[c*this.size+h]},s.prototype.xor=function(c,h,o){this.data[c*this.size+h]^=o},s.prototype.isReserved=function(c,h){return this.reservedBit[c*this.size+h]},Os=s,Os}var Us={},Dh;function Rp(){return Dh||(Dh=1,(function(s){const c=Jn().getSymbolSize;s.getRowColCoords=function(o){if(o===1)return[];const f=Math.floor(o/7)+2,d=c(o),v=d===145?26:Math.ceil((d-13)/(2*f-2))*2,T=[d-7];for(let g=1;g<f-1;g++)T[g]=T[g-1]-v;return T.push(6),T.reverse()},s.getPositions=function(o){const f=[],d=s.getRowColCoords(o),v=d.length;for(let T=0;T<v;T++)for(let g=0;g<v;g++)T===0&&g===0||T===0&&g===v-1||T===v-1&&g===0||f.push([d[T],d[g]]);return f}})(Us)),Us}var Bs={},Rh;function kp(){if(Rh)return Bs;Rh=1;const s=Jn().getSymbolSize,c=7;return Bs.getPositions=function(o){const f=s(o);return[[0,0],[f-c,0],[0,f-c]]},Bs}var Hs={},kh;function zp(){return kh||(kh=1,(function(s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const c={N1:3,N2:3,N3:40,N4:10};s.isValid=function(f){return f!=null&&f!==""&&!isNaN(f)&&f>=0&&f<=7},s.from=function(f){return s.isValid(f)?parseInt(f,10):void 0},s.getPenaltyN1=function(f){const d=f.size;let v=0,T=0,g=0,w=null,O=null;for(let D=0;D<d;D++){T=g=0,w=O=null;for(let B=0;B<d;B++){let L=f.get(D,B);L===w?T++:(T>=5&&(v+=c.N1+(T-5)),w=L,T=1),L=f.get(B,D),L===O?g++:(g>=5&&(v+=c.N1+(g-5)),O=L,g=1)}T>=5&&(v+=c.N1+(T-5)),g>=5&&(v+=c.N1+(g-5))}return v},s.getPenaltyN2=function(f){const d=f.size;let v=0;for(let T=0;T<d-1;T++)for(let g=0;g<d-1;g++){const w=f.get(T,g)+f.get(T,g+1)+f.get(T+1,g)+f.get(T+1,g+1);(w===4||w===0)&&v++}return v*c.N2},s.getPenaltyN3=function(f){const d=f.size;let v=0,T=0,g=0;for(let w=0;w<d;w++){T=g=0;for(let O=0;O<d;O++)T=T<<1&2047|f.get(w,O),O>=10&&(T===1488||T===93)&&v++,g=g<<1&2047|f.get(O,w),O>=10&&(g===1488||g===93)&&v++}return v*c.N3},s.getPenaltyN4=function(f){let d=0;const v=f.data.length;for(let g=0;g<v;g++)d+=f.data[g];return Math.abs(Math.ceil(d*100/v/5)-10)*c.N4};function h(o,f,d){switch(o){case s.Patterns.PATTERN000:return(f+d)%2===0;case s.Patterns.PATTERN001:return f%2===0;case s.Patterns.PATTERN010:return d%3===0;case s.Patterns.PATTERN011:return(f+d)%3===0;case s.Patterns.PATTERN100:return(Math.floor(f/2)+Math.floor(d/3))%2===0;case s.Patterns.PATTERN101:return f*d%2+f*d%3===0;case s.Patterns.PATTERN110:return(f*d%2+f*d%3)%2===0;case s.Patterns.PATTERN111:return(f*d%3+(f+d)%2)%2===0;default:throw new Error("bad maskPattern:"+o)}}s.applyMask=function(f,d){const v=d.size;for(let T=0;T<v;T++)for(let g=0;g<v;g++)d.isReserved(g,T)||d.xor(g,T,h(f,g,T))},s.getBestMask=function(f,d){const v=Object.keys(s.Patterns).length;let T=0,g=1/0;for(let w=0;w<v;w++){d(w),s.applyMask(w,f);const O=s.getPenaltyN1(f)+s.getPenaltyN2(f)+s.getPenaltyN3(f)+s.getPenaltyN4(f);s.applyMask(w,f),O<g&&(g=O,T=w)}return T}})(Hs)),Hs}var Pi={},zh;function cg(){if(zh)return Pi;zh=1;const s=lr(),c=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],h=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Pi.getBlocksCount=function(f,d){switch(d){case s.L:return c[(f-1)*4+0];case s.M:return c[(f-1)*4+1];case s.Q:return c[(f-1)*4+2];case s.H:return c[(f-1)*4+3];default:return}},Pi.getTotalCodewordsCount=function(f,d){switch(d){case s.L:return h[(f-1)*4+0];case s.M:return h[(f-1)*4+1];case s.Q:return h[(f-1)*4+2];case s.H:return h[(f-1)*4+3];default:return}},Pi}var Ls={},kl={},Oh;function Op(){if(Oh)return kl;Oh=1;const s=new Uint8Array(512),c=new Uint8Array(256);return(function(){let o=1;for(let f=0;f<255;f++)s[f]=o,c[o]=f,o<<=1,o&256&&(o^=285);for(let f=255;f<512;f++)s[f]=s[f-255]})(),kl.log=function(o){if(o<1)throw new Error("log("+o+")");return c[o]},kl.exp=function(o){return s[o]},kl.mul=function(o,f){return o===0||f===0?0:s[c[o]+c[f]]},kl}var Uh;function Up(){return Uh||(Uh=1,(function(s){const c=Op();s.mul=function(o,f){const d=new Uint8Array(o.length+f.length-1);for(let v=0;v<o.length;v++)for(let T=0;T<f.length;T++)d[v+T]^=c.mul(o[v],f[T]);return d},s.mod=function(o,f){let d=new Uint8Array(o);for(;d.length-f.length>=0;){const v=d[0];for(let g=0;g<f.length;g++)d[g]^=c.mul(f[g],v);let T=0;for(;T<d.length&&d[T]===0;)T++;d=d.slice(T)}return d},s.generateECPolynomial=function(o){let f=new Uint8Array([1]);for(let d=0;d<o;d++)f=s.mul(f,new Uint8Array([1,c.exp(d)]));return f}})(Ls)),Ls}var js,Bh;function Bp(){if(Bh)return js;Bh=1;const s=Up();function c(h){this.genPoly=void 0,this.degree=h,this.degree&&this.initialize(this.degree)}return c.prototype.initialize=function(o){this.degree=o,this.genPoly=s.generateECPolynomial(this.degree)},c.prototype.encode=function(o){if(!this.genPoly)throw new Error("Encoder not initialized");const f=new Uint8Array(o.length+this.degree);f.set(o);const d=s.mod(f,this.genPoly),v=this.degree-d.length;if(v>0){const T=new Uint8Array(this.degree);return T.set(d,v),T}return d},js=c,js}var Ys={},qs={},Gs={},Hh;function fg(){return Hh||(Hh=1,Gs.isValid=function(c){return!isNaN(c)&&c>=1&&c<=40}),Gs}var Ue={},Lh;function dg(){if(Lh)return Ue;Lh=1;const s="[0-9]+",c="[A-Z $%*+\\-./:]+";let h="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";h=h.replace(/u/g,"\\u");const o="(?:(?![A-Z0-9 $%*+\\-./:]|"+h+`)(?:.|[\r
]))+`;Ue.KANJI=new RegExp(h,"g"),Ue.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Ue.BYTE=new RegExp(o,"g"),Ue.NUMERIC=new RegExp(s,"g"),Ue.ALPHANUMERIC=new RegExp(c,"g");const f=new RegExp("^"+h+"$"),d=new RegExp("^"+s+"$"),v=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Ue.testKanji=function(g){return f.test(g)},Ue.testNumeric=function(g){return d.test(g)},Ue.testAlphanumeric=function(g){return v.test(g)},Ue}var jh;function Fn(){return jh||(jh=1,(function(s){const c=fg(),h=dg();s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(d,v){if(!d.ccBits)throw new Error("Invalid mode: "+d);if(!c.isValid(v))throw new Error("Invalid version: "+v);return v>=1&&v<10?d.ccBits[0]:v<27?d.ccBits[1]:d.ccBits[2]},s.getBestModeForData=function(d){return h.testNumeric(d)?s.NUMERIC:h.testAlphanumeric(d)?s.ALPHANUMERIC:h.testKanji(d)?s.KANJI:s.BYTE},s.toString=function(d){if(d&&d.id)return d.id;throw new Error("Invalid mode")},s.isValid=function(d){return d&&d.bit&&d.ccBits};function o(f){if(typeof f!="string")throw new Error("Param is not a string");switch(f.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+f)}}s.from=function(d,v){if(s.isValid(d))return d;try{return o(d)}catch{return v}}})(qs)),qs}var Yh;function Hp(){return Yh||(Yh=1,(function(s){const c=Jn(),h=cg(),o=lr(),f=Fn(),d=fg(),v=7973,T=c.getBCHDigit(v);function g(B,L,q){for(let V=1;V<=40;V++)if(L<=s.getCapacity(V,q,B))return V}function w(B,L){return f.getCharCountIndicator(B,L)+4}function O(B,L){let q=0;return B.forEach(function(V){const I=w(V.mode,L);q+=I+V.getBitsLength()}),q}function D(B,L){for(let q=1;q<=40;q++)if(O(B,q)<=s.getCapacity(q,L,f.MIXED))return q}s.from=function(L,q){return d.isValid(L)?parseInt(L,10):q},s.getCapacity=function(L,q,V){if(!d.isValid(L))throw new Error("Invalid QR Code version");typeof V>"u"&&(V=f.BYTE);const I=c.getSymbolTotalCodewords(L),j=h.getTotalCodewordsCount(L,q),N=(I-j)*8;if(V===f.MIXED)return N;const Y=N-w(V,L);switch(V){case f.NUMERIC:return Math.floor(Y/10*3);case f.ALPHANUMERIC:return Math.floor(Y/11*2);case f.KANJI:return Math.floor(Y/13);case f.BYTE:default:return Math.floor(Y/8)}},s.getBestVersionForData=function(L,q){let V;const I=o.from(q,o.M);if(Array.isArray(L)){if(L.length>1)return D(L,I);if(L.length===0)return 1;V=L[0]}else V=L;return g(V.mode,V.getLength(),I)},s.getEncodedBits=function(L){if(!d.isValid(L)||L<7)throw new Error("Invalid QR Code version");let q=L<<12;for(;c.getBCHDigit(q)-T>=0;)q^=v<<c.getBCHDigit(q)-T;return L<<12|q}})(Ys)),Ys}var Xs={},qh;function Lp(){if(qh)return Xs;qh=1;const s=Jn(),c=1335,h=21522,o=s.getBCHDigit(c);return Xs.getEncodedBits=function(d,v){const T=d.bit<<3|v;let g=T<<10;for(;s.getBCHDigit(g)-o>=0;)g^=c<<s.getBCHDigit(g)-o;return(T<<10|g)^h},Xs}var Vs={},Qs,Gh;function jp(){if(Gh)return Qs;Gh=1;const s=Fn();function c(h){this.mode=s.NUMERIC,this.data=h.toString()}return c.getBitsLength=function(o){return 10*Math.floor(o/3)+(o%3?o%3*3+1:0)},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(o){let f,d,v;for(f=0;f+3<=this.data.length;f+=3)d=this.data.substr(f,3),v=parseInt(d,10),o.put(v,10);const T=this.data.length-f;T>0&&(d=this.data.substr(f),v=parseInt(d,10),o.put(v,T*3+1))},Qs=c,Qs}var Zs,Xh;function Yp(){if(Xh)return Zs;Xh=1;const s=Fn(),c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function h(o){this.mode=s.ALPHANUMERIC,this.data=o}return h.getBitsLength=function(f){return 11*Math.floor(f/2)+6*(f%2)},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(f){let d;for(d=0;d+2<=this.data.length;d+=2){let v=c.indexOf(this.data[d])*45;v+=c.indexOf(this.data[d+1]),f.put(v,11)}this.data.length%2&&f.put(c.indexOf(this.data[d]),6)},Zs=h,Zs}var Ks,Vh;function qp(){if(Vh)return Ks;Vh=1;const s=Fn();function c(h){this.mode=s.BYTE,typeof h=="string"?this.data=new TextEncoder().encode(h):this.data=new Uint8Array(h)}return c.getBitsLength=function(o){return o*8},c.prototype.getLength=function(){return this.data.length},c.prototype.getBitsLength=function(){return c.getBitsLength(this.data.length)},c.prototype.write=function(h){for(let o=0,f=this.data.length;o<f;o++)h.put(this.data[o],8)},Ks=c,Ks}var Is,Qh;function Gp(){if(Qh)return Is;Qh=1;const s=Fn(),c=Jn();function h(o){this.mode=s.KANJI,this.data=o}return h.getBitsLength=function(f){return f*13},h.prototype.getLength=function(){return this.data.length},h.prototype.getBitsLength=function(){return h.getBitsLength(this.data.length)},h.prototype.write=function(o){let f;for(f=0;f<this.data.length;f++){let d=c.toSJIS(this.data[f]);if(d>=33088&&d<=40956)d-=33088;else if(d>=57408&&d<=60351)d-=49472;else throw new Error("Invalid SJIS character: "+this.data[f]+`
Make sure your charset is UTF-8`);d=(d>>>8&255)*192+(d&255),o.put(d,13)}},Is=h,Is}var Js={exports:{}},Zh;function Xp(){return Zh||(Zh=1,(function(s){var c={single_source_shortest_paths:function(h,o,f){var d={},v={};v[o]=0;var T=c.PriorityQueue.make();T.push(o,0);for(var g,w,O,D,B,L,q,V,I;!T.empty();){g=T.pop(),w=g.value,D=g.cost,B=h[w]||{};for(O in B)B.hasOwnProperty(O)&&(L=B[O],q=D+L,V=v[O],I=typeof v[O]>"u",(I||V>q)&&(v[O]=q,T.push(O,q),d[O]=w))}if(typeof f<"u"&&typeof v[f]>"u"){var j=["Could not find a path from ",o," to ",f,"."].join("");throw new Error(j)}return d},extract_shortest_path_from_predecessor_list:function(h,o){for(var f=[],d=o;d;)f.push(d),h[d],d=h[d];return f.reverse(),f},find_path:function(h,o,f){var d=c.single_source_shortest_paths(h,o,f);return c.extract_shortest_path_from_predecessor_list(d,f)},PriorityQueue:{make:function(h){var o=c.PriorityQueue,f={},d;h=h||{};for(d in o)o.hasOwnProperty(d)&&(f[d]=o[d]);return f.queue=[],f.sorter=h.sorter||o.default_sorter,f},default_sorter:function(h,o){return h.cost-o.cost},push:function(h,o){var f={value:h,cost:o};this.queue.push(f),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};s.exports=c})(Js)),Js.exports}var Kh;function Vp(){return Kh||(Kh=1,(function(s){const c=Fn(),h=jp(),o=Yp(),f=qp(),d=Gp(),v=dg(),T=Jn(),g=Xp();function w(j){return unescape(encodeURIComponent(j)).length}function O(j,N,Y){const K=[];let ut;for(;(ut=j.exec(Y))!==null;)K.push({data:ut[0],index:ut.index,mode:N,length:ut[0].length});return K}function D(j){const N=O(v.NUMERIC,c.NUMERIC,j),Y=O(v.ALPHANUMERIC,c.ALPHANUMERIC,j);let K,ut;return T.isKanjiModeEnabled()?(K=O(v.BYTE,c.BYTE,j),ut=O(v.KANJI,c.KANJI,j)):(K=O(v.BYTE_KANJI,c.BYTE,j),ut=[]),N.concat(Y,K,ut).sort(function(H,Q){return H.index-Q.index}).map(function(H){return{data:H.data,mode:H.mode,length:H.length}})}function B(j,N){switch(N){case c.NUMERIC:return h.getBitsLength(j);case c.ALPHANUMERIC:return o.getBitsLength(j);case c.KANJI:return d.getBitsLength(j);case c.BYTE:return f.getBitsLength(j)}}function L(j){return j.reduce(function(N,Y){const K=N.length-1>=0?N[N.length-1]:null;return K&&K.mode===Y.mode?(N[N.length-1].data+=Y.data,N):(N.push(Y),N)},[])}function q(j){const N=[];for(let Y=0;Y<j.length;Y++){const K=j[Y];switch(K.mode){case c.NUMERIC:N.push([K,{data:K.data,mode:c.ALPHANUMERIC,length:K.length},{data:K.data,mode:c.BYTE,length:K.length}]);break;case c.ALPHANUMERIC:N.push([K,{data:K.data,mode:c.BYTE,length:K.length}]);break;case c.KANJI:N.push([K,{data:K.data,mode:c.BYTE,length:w(K.data)}]);break;case c.BYTE:N.push([{data:K.data,mode:c.BYTE,length:w(K.data)}])}}return N}function V(j,N){const Y={},K={start:{}};let ut=["start"];for(let U=0;U<j.length;U++){const H=j[U],Q=[];for(let Z=0;Z<H.length;Z++){const nt=H[Z],P=""+U+Z;Q.push(P),Y[P]={node:nt,lastCount:0},K[P]={};for(let W=0;W<ut.length;W++){const tt=ut[W];Y[tt]&&Y[tt].node.mode===nt.mode?(K[tt][P]=B(Y[tt].lastCount+nt.length,nt.mode)-B(Y[tt].lastCount,nt.mode),Y[tt].lastCount+=nt.length):(Y[tt]&&(Y[tt].lastCount=nt.length),K[tt][P]=B(nt.length,nt.mode)+4+c.getCharCountIndicator(nt.mode,N))}}ut=Q}for(let U=0;U<ut.length;U++)K[ut[U]].end=0;return{map:K,table:Y}}function I(j,N){let Y;const K=c.getBestModeForData(j);if(Y=c.from(N,K),Y!==c.BYTE&&Y.bit<K.bit)throw new Error('"'+j+'" cannot be encoded with mode '+c.toString(Y)+`.
 Suggested mode is: `+c.toString(K));switch(Y===c.KANJI&&!T.isKanjiModeEnabled()&&(Y=c.BYTE),Y){case c.NUMERIC:return new h(j);case c.ALPHANUMERIC:return new o(j);case c.KANJI:return new d(j);case c.BYTE:return new f(j)}}s.fromArray=function(N){return N.reduce(function(Y,K){return typeof K=="string"?Y.push(I(K,null)):K.data&&Y.push(I(K.data,K.mode)),Y},[])},s.fromString=function(N,Y){const K=D(N,T.isKanjiModeEnabled()),ut=q(K),U=V(ut,Y),H=g.find_path(U.map,"start","end"),Q=[];for(let Z=1;Z<H.length-1;Z++)Q.push(U.table[H[Z]].node);return s.fromArray(L(Q))},s.rawSplit=function(N){return s.fromArray(D(N,T.isKanjiModeEnabled()))}})(Vs)),Vs}var Ih;function Qp(){if(Ih)return Rs;Ih=1;const s=Jn(),c=lr(),h=Mp(),o=Dp(),f=Rp(),d=kp(),v=zp(),T=cg(),g=Bp(),w=Hp(),O=Lp(),D=Fn(),B=Vp();function L(U,H){const Q=U.size,Z=d.getPositions(H);for(let nt=0;nt<Z.length;nt++){const P=Z[nt][0],W=Z[nt][1];for(let tt=-1;tt<=7;tt++)if(!(P+tt<=-1||Q<=P+tt))for(let it=-1;it<=7;it++)W+it<=-1||Q<=W+it||(tt>=0&&tt<=6&&(it===0||it===6)||it>=0&&it<=6&&(tt===0||tt===6)||tt>=2&&tt<=4&&it>=2&&it<=4?U.set(P+tt,W+it,!0,!0):U.set(P+tt,W+it,!1,!0))}}function q(U){const H=U.size;for(let Q=8;Q<H-8;Q++){const Z=Q%2===0;U.set(Q,6,Z,!0),U.set(6,Q,Z,!0)}}function V(U,H){const Q=f.getPositions(H);for(let Z=0;Z<Q.length;Z++){const nt=Q[Z][0],P=Q[Z][1];for(let W=-2;W<=2;W++)for(let tt=-2;tt<=2;tt++)W===-2||W===2||tt===-2||tt===2||W===0&&tt===0?U.set(nt+W,P+tt,!0,!0):U.set(nt+W,P+tt,!1,!0)}}function I(U,H){const Q=U.size,Z=w.getEncodedBits(H);let nt,P,W;for(let tt=0;tt<18;tt++)nt=Math.floor(tt/3),P=tt%3+Q-8-3,W=(Z>>tt&1)===1,U.set(nt,P,W,!0),U.set(P,nt,W,!0)}function j(U,H,Q){const Z=U.size,nt=O.getEncodedBits(H,Q);let P,W;for(P=0;P<15;P++)W=(nt>>P&1)===1,P<6?U.set(P,8,W,!0):P<8?U.set(P+1,8,W,!0):U.set(Z-15+P,8,W,!0),P<8?U.set(8,Z-P-1,W,!0):P<9?U.set(8,15-P-1+1,W,!0):U.set(8,15-P-1,W,!0);U.set(Z-8,8,1,!0)}function N(U,H){const Q=U.size;let Z=-1,nt=Q-1,P=7,W=0;for(let tt=Q-1;tt>0;tt-=2)for(tt===6&&tt--;;){for(let it=0;it<2;it++)if(!U.isReserved(nt,tt-it)){let jt=!1;W<H.length&&(jt=(H[W]>>>P&1)===1),U.set(nt,tt-it,jt),P--,P===-1&&(W++,P=7)}if(nt+=Z,nt<0||Q<=nt){nt-=Z,Z=-Z;break}}}function Y(U,H,Q){const Z=new h;Q.forEach(function(it){Z.put(it.mode.bit,4),Z.put(it.getLength(),D.getCharCountIndicator(it.mode,U)),it.write(Z)});const nt=s.getSymbolTotalCodewords(U),P=T.getTotalCodewordsCount(U,H),W=(nt-P)*8;for(Z.getLengthInBits()+4<=W&&Z.put(0,4);Z.getLengthInBits()%8!==0;)Z.putBit(0);const tt=(W-Z.getLengthInBits())/8;for(let it=0;it<tt;it++)Z.put(it%2?17:236,8);return K(Z,U,H)}function K(U,H,Q){const Z=s.getSymbolTotalCodewords(H),nt=T.getTotalCodewordsCount(H,Q),P=Z-nt,W=T.getBlocksCount(H,Q),tt=Z%W,it=W-tt,jt=Math.floor(Z/W),_=Math.floor(P/W),X=_+1,at=jt-_,Et=new g(at);let St=0;const b=new Array(W),z=new Array(W);let G=0;const F=new Uint8Array(U.buffer);for(let Ct=0;Ct<W;Ct++){const Be=Ct<it?_:X;b[Ct]=F.slice(St,St+Be),z[Ct]=Et.encode(b[Ct]),St+=Be,G=Math.max(G,Be)}const ot=new Uint8Array(Z);let dt=0,ht,Rt;for(ht=0;ht<G;ht++)for(Rt=0;Rt<W;Rt++)ht<b[Rt].length&&(ot[dt++]=b[Rt][ht]);for(ht=0;ht<at;ht++)for(Rt=0;Rt<W;Rt++)ot[dt++]=z[Rt][ht];return ot}function ut(U,H,Q,Z){let nt;if(Array.isArray(U))nt=B.fromArray(U);else if(typeof U=="string"){let jt=H;if(!jt){const _=B.rawSplit(U);jt=w.getBestVersionForData(_,Q)}nt=B.fromString(U,jt||40)}else throw new Error("Invalid data");const P=w.getBestVersionForData(nt,Q);if(!P)throw new Error("The amount of data is too big to be stored in a QR Code");if(!H)H=P;else if(H<P)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+P+`.
`);const W=Y(H,Q,nt),tt=s.getSymbolSize(H),it=new o(tt);return L(it,H),q(it),V(it,H),j(it,Q,0),H>=7&&I(it,H),N(it,W),isNaN(Z)&&(Z=v.getBestMask(it,j.bind(null,it,Q))),v.applyMask(Z,it),j(it,Q,Z),{modules:it,version:H,errorCorrectionLevel:Q,maskPattern:Z,segments:nt}}return Rs.create=function(H,Q){if(typeof H>"u"||H==="")throw new Error("No input text");let Z=c.M,nt,P;return typeof Q<"u"&&(Z=c.from(Q.errorCorrectionLevel,c.M),nt=w.from(Q.version),P=v.from(Q.maskPattern),Q.toSJISFunc&&s.setToSJISFunction(Q.toSJISFunc)),ut(H,nt,Z,P)},Rs}var Fs={},Ws={},Jh;function hg(){return Jh||(Jh=1,(function(s){function c(h){if(typeof h=="number"&&(h=h.toString()),typeof h!="string")throw new Error("Color should be defined as hex string");let o=h.slice().replace("#","").split("");if(o.length<3||o.length===5||o.length>8)throw new Error("Invalid hex color: "+h);(o.length===3||o.length===4)&&(o=Array.prototype.concat.apply([],o.map(function(d){return[d,d]}))),o.length===6&&o.push("F","F");const f=parseInt(o.join(""),16);return{r:f>>24&255,g:f>>16&255,b:f>>8&255,a:f&255,hex:"#"+o.slice(0,6).join("")}}s.getOptions=function(o){o||(o={}),o.color||(o.color={});const f=typeof o.margin>"u"||o.margin===null||o.margin<0?4:o.margin,d=o.width&&o.width>=21?o.width:void 0,v=o.scale||4;return{width:d,scale:d?4:v,margin:f,color:{dark:c(o.color.dark||"#000000ff"),light:c(o.color.light||"#ffffffff")},type:o.type,rendererOpts:o.rendererOpts||{}}},s.getScale=function(o,f){return f.width&&f.width>=o+f.margin*2?f.width/(o+f.margin*2):f.scale},s.getImageWidth=function(o,f){const d=s.getScale(o,f);return Math.floor((o+f.margin*2)*d)},s.qrToImageData=function(o,f,d){const v=f.modules.size,T=f.modules.data,g=s.getScale(v,d),w=Math.floor((v+d.margin*2)*g),O=d.margin*g,D=[d.color.light,d.color.dark];for(let B=0;B<w;B++)for(let L=0;L<w;L++){let q=(B*w+L)*4,V=d.color.light;if(B>=O&&L>=O&&B<w-O&&L<w-O){const I=Math.floor((B-O)/g),j=Math.floor((L-O)/g);V=D[T[I*v+j]?1:0]}o[q++]=V.r,o[q++]=V.g,o[q++]=V.b,o[q]=V.a}}})(Ws)),Ws}var Fh;function Zp(){return Fh||(Fh=1,(function(s){const c=hg();function h(f,d,v){f.clearRect(0,0,d.width,d.height),d.style||(d.style={}),d.height=v,d.width=v,d.style.height=v+"px",d.style.width=v+"px"}function o(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}s.render=function(d,v,T){let g=T,w=v;typeof g>"u"&&(!v||!v.getContext)&&(g=v,v=void 0),v||(w=o()),g=c.getOptions(g);const O=c.getImageWidth(d.modules.size,g),D=w.getContext("2d"),B=D.createImageData(O,O);return c.qrToImageData(B.data,d,g),h(D,w,O),D.putImageData(B,0,0),w},s.renderToDataURL=function(d,v,T){let g=T;typeof g>"u"&&(!v||!v.getContext)&&(g=v,v=void 0),g||(g={});const w=s.render(d,v,g),O=g.type||"image/png",D=g.rendererOpts||{};return w.toDataURL(O,D.quality)}})(Fs)),Fs}var $s={},Wh;function Kp(){if(Wh)return $s;Wh=1;const s=hg();function c(f,d){const v=f.a/255,T=d+'="'+f.hex+'"';return v<1?T+" "+d+'-opacity="'+v.toFixed(2).slice(1)+'"':T}function h(f,d,v){let T=f+d;return typeof v<"u"&&(T+=" "+v),T}function o(f,d,v){let T="",g=0,w=!1,O=0;for(let D=0;D<f.length;D++){const B=Math.floor(D%d),L=Math.floor(D/d);!B&&!w&&(w=!0),f[D]?(O++,D>0&&B>0&&f[D-1]||(T+=w?h("M",B+v,.5+L+v):h("m",g,0),g=0,w=!1),B+1<d&&f[D+1]||(T+=h("h",O),O=0)):g++}return T}return $s.render=function(d,v,T){const g=s.getOptions(v),w=d.modules.size,O=d.modules.data,D=w+g.margin*2,B=g.color.light.a?"<path "+c(g.color.light,"fill")+' d="M0 0h'+D+"v"+D+'H0z"/>':"",L="<path "+c(g.color.dark,"stroke")+' d="'+o(O,w,g.margin)+'"/>',q='viewBox="0 0 '+D+" "+D+'"',I='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+q+' shape-rendering="crispEdges">'+B+L+`</svg>
`;return typeof T=="function"&&T(null,I),I},$s}var $h;function Ip(){if($h)return Ba;$h=1;const s=_p(),c=Qp(),h=Zp(),o=Kp();function f(d,v,T,g,w){const O=[].slice.call(arguments,1),D=O.length,B=typeof O[D-1]=="function";if(!B&&!s())throw new Error("Callback required as last argument");if(B){if(D<2)throw new Error("Too few arguments provided");D===2?(w=T,T=v,v=g=void 0):D===3&&(v.getContext&&typeof w>"u"?(w=g,g=void 0):(w=g,g=T,T=v,v=void 0))}else{if(D<1)throw new Error("Too few arguments provided");return D===1?(T=v,v=g=void 0):D===2&&!v.getContext&&(g=T,T=v,v=void 0),new Promise(function(L,q){try{const V=c.create(T,g);L(d(V,v,g))}catch(V){q(V)}})}try{const L=c.create(T,g);w(null,d(L,v,g))}catch(L){w(L)}}return Ba.create=c.create,Ba.toCanvas=f.bind(null,h.render),Ba.toDataURL=f.bind(null,h.renderToDataURL),Ba.toString=f.bind(null,function(d,v,T){return o.render(d,T)}),Ba}var Jp=Ip();const Fp=L0(Jp),Ps=`${window.location.origin}/hpde/pr-preview/pr-190/`;function Wp(){const[s,c]=ct.useState(!1),[h,o]=ct.useState(null);ct.useEffect(()=>{window.scrollTo(0,0),Fp.toDataURL(Ps,{margin:1,width:240}).then(o).catch(()=>o(null))},[]);async function f(){await navigator.clipboard.writeText(Ps),c(!0),setTimeout(()=>c(!1),2e3)}return p.jsx("div",{className:"min-h-screen bg-gray-50",children:p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"Share"}),p.jsx("a",{href:"#/","aria-label":"Close",className:"flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700",style:{minWidth:36,minHeight:36},children:p.jsx(au,{size:18})})]}),p.jsx("p",{className:"mb-3 text-sm text-gray-500",children:"Share this link so others can view the schedule."}),p.jsxs("button",{onClick:f,className:"mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400",children:[p.jsx("span",{className:"truncate text-sm text-gray-800",children:Ps}),s?p.jsx(lu,{size:16,className:"shrink-0 text-green-600"}):p.jsx(rg,{size:16,className:"shrink-0 text-gray-400"})]}),p.jsx("div",{className:"flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",children:h&&p.jsx("img",{src:h,alt:"QR code for schedule link",width:240,height:240})})]})})}const Ph=350,$p="cubic-bezier(0.32, 0.72, 0, 1)",Pp=.35,ty=.5;function ey(s){try{return new URL(s).hostname.replace(/^www\./,"")}catch{return s}}function ny(s){const c=s.trim().toLowerCase();return c==="clockwise"?"CW (clockwise)":c==="counter-clockwise"||c==="counterclockwise"?"CCW (counter-clockwise)":s}function ay(s,c){return[s,c&&ny(c)].filter(Boolean).join(" ")}function zl({icon:s,label:c,subtitle:h,children:o}){return p.jsxs("div",{className:"grid grid-cols-[124px_1fr] items-center gap-3 border-b border-gray-100 py-3 last:border-b-0",children:[p.jsxs("span",{className:"flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[p.jsx(s,{size:14,className:"shrink-0 text-gray-400"}),c]}),p.jsxs("span",{className:"text-sm text-gray-900 tabular-nums break-words",children:[o,h&&p.jsx("span",{className:"mt-0.5 block text-xs font-normal text-gray-400",children:h})]})]})}function ly({event:s,open:c,onClose:h}){var I;const o=ct.useRef(null),[f,d]=ct.useState(0),[v,T]=ct.useState(!1),[g,w]=ct.useState(!1),[O,D]=ct.useState(!1);ct.useEffect(()=>{if(!c)return;const j=N=>{N.key==="Escape"&&(O?D(!1):h())};return window.addEventListener("keydown",j),()=>window.removeEventListener("keydown",j)},[c,h,O]),ct.useEffect(()=>{d(0),T(!1),w(!1),D(!1)},[c]),ct.useEffect(()=>{if(!c)return;const j=o.current;if(!j)return;let N=null;const Y=U=>{const H=U.touches[0];N={startX:H.clientX,startY:H.clientY,lastX:H.clientX,lastT:U.timeStamp,velocity:0,dx:0,active:!1,width:j.getBoundingClientRect().width}},K=U=>{if(!N)return;const H=U.touches[0],Q=H.clientX-N.startX,Z=H.clientY-N.startY;if(!N.active){if(Math.abs(Q)<8&&Math.abs(Z)<8)return;if(Q<=0||Math.abs(Z)>=Math.abs(Q)){N=null;return}N.active=!0,T(!0)}U.preventDefault();const nt=U.timeStamp-N.lastT;nt>0&&(N.velocity=(H.clientX-N.lastX)/nt),N.lastX=H.clientX,N.lastT=U.timeStamp,N.dx=Math.min(Math.max(Q,0),N.width),d(N.dx)},ut=()=>{if(!N||!N.active){N=null;return}const{dx:U,velocity:H,width:Q}=N,Z=U>Q*Pp||H>ty;N=null,T(!1),w(!0),Z?(d(Q),window.setTimeout(h,Ph)):d(0)};return j.addEventListener("touchstart",Y,{passive:!0}),j.addEventListener("touchmove",K,{passive:!1}),j.addEventListener("touchend",ut),j.addEventListener("touchcancel",ut),()=>{j.removeEventListener("touchstart",Y),j.removeEventListener("touchmove",K),j.removeEventListener("touchend",ut),j.removeEventListener("touchcancel",ut)}},[c,h]),ct.useEffect(()=>{if(!c)return;const j=document.documentElement,N=document.body,Y=window.scrollY,K=j.style.overflow,ut=N.style.overflow,U=N.style.position,H=N.style.top,Q=N.style.width;return j.style.overflow="hidden",N.style.overflow="hidden",N.style.position="fixed",N.style.top=`-${Y}px`,N.style.width="100%",()=>{j.style.overflow=K,N.style.overflow=ut,N.style.position=U,N.style.top=H,N.style.width=Q,window.scrollTo(0,Y)}},[c]);const B=J0(s.days),L=ay(s.configuration,s.direction),q=!!((I=s.scheduleScans)!=null&&I.length),V=B||s.organizer||s.track||L||s.link||q||s.mapImage;return p.jsxs(p.Fragment,{children:[p.jsx("div",{"aria-hidden":"true",inert:!c,onClick:h,className:"fixed inset-0 z-40",style:{pointerEvents:c?"auto":"none"}}),p.jsx("div",{ref:o,role:"dialog","aria-modal":c,"aria-labelledby":"event-details-title",inert:!c,className:"fixed inset-y-0 right-0 z-50 flex w-full bg-white md:w-[480px] md:max-w-[60vw]",style:{transform:v||g?`translate3d(${f}px,0,0)`:c?"translate3d(0,0,0)":"translate3d(100%,0,0)",transition:v?"none":`transform ${Ph}ms ${$p}`,boxShadow:c?"-8px 0 24px rgba(0,0,0,0.08)":"none",willChange:"transform"},children:p.jsxs("div",{className:"mx-auto w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto md:mx-0 md:max-w-none",children:[p.jsxs("div",{className:"mb-5 flex items-start gap-2 md:justify-between md:gap-4",children:[p.jsx("button",{onClick:h,"aria-label":"Back",className:"inline-grid h-9 w-9 shrink-0 -ml-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden",children:p.jsx(up,{size:20})}),p.jsx("h2",{id:"event-details-title",className:"min-w-0 truncate pl-1 pt-1 text-xl font-bold text-gray-900 leading-tight",children:"Event details"}),p.jsx("button",{onClick:h,"aria-label":"Close",className:"hidden h-9 w-9 shrink-0 -mr-1.5 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-grid",children:p.jsx(au,{size:20})})]}),V?p.jsxs(p.Fragment,{children:[p.jsxs("div",{className:"pl-1",children:[B&&p.jsx(zl,{icon:ip,label:"Dates",children:B}),s.organizer&&p.jsx(zl,{icon:yp,label:"Organizer",children:s.organizer}),s.track&&p.jsx(zl,{icon:fp,label:"Location",subtitle:s.city,children:s.track}),L&&p.jsx(zl,{icon:pp,label:"Track config",children:L}),s.link&&p.jsx(zl,{icon:cp,label:"Event page",children:p.jsxs("a",{href:s.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 font-medium text-blue-500 hover:underline",children:[ey(s.link),p.jsx(op,{size:12,className:"text-gray-400"})]})})]}),s.mapImage&&p.jsxs("div",{className:"mt-6 pl-1",children:[p.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[p.jsx(dp,{size:14,className:"shrink-0 text-gray-400"}),"Track map"]}),p.jsxs("button",{type:"button",onClick:()=>D(!0),"aria-label":"Expand track map",className:"group relative block w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm",children:[p.jsx("img",{src:s.mapImage,alt:`${s.name} track map`,className:"block w-full h-auto"}),p.jsx("span",{className:"absolute right-2 top-2 inline-grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors group-hover:bg-black/70",children:p.jsx(hp,{size:16})})]})]}),q&&p.jsxs("div",{className:"mt-6 pl-1",children:[p.jsxs("h3",{className:"mb-2 flex items-center gap-3 text-[13px] font-medium text-gray-500",children:[p.jsx(sp,{size:14,className:"shrink-0 text-gray-400"}),"Original schedule"]}),p.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-3",children:s.scheduleScans.map((j,N)=>p.jsx("a",{href:j,target:"_blank",rel:"noopener noreferrer",children:p.jsx("img",{src:j,alt:`Original schedule scan ${N+1}`,className:"aspect-[3/4] w-full rounded-lg border border-gray-200 object-cover"})},j))})]})]}):p.jsx("p",{className:"text-sm text-gray-400",children:"No details for this event yet."})]})}),O&&s.mapImage&&p.jsxs("div",{role:"dialog","aria-modal":"true","aria-label":`${s.name} track map`,onClick:()=>D(!1),className:"fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4",children:[p.jsx("button",{onClick:()=>D(!1),"aria-label":"Close map",className:"absolute right-4 top-4 inline-grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",children:p.jsx(au,{size:20})}),p.jsx("img",{src:s.mapImage,alt:`${s.name} track map`,className:"max-h-full max-w-full rounded-lg object-contain"})]})]})}function Ha(s,c){const h=c.split(`
`).map(V=>V.trim());let o="",f,d,v,T,g,w,O;const D=[],B=[];let L=null,q=!1;for(const V of h){if(!V||V.startsWith("//"))continue;const I=V.replace(/^-\s+/,"");if(I.startsWith("# ")){o=I.slice(2).trim();continue}if(I.startsWith("subtitle:")){f=I.slice(9).trim()||void 0;continue}if(I.startsWith("link:")){d=I.slice(5).trim()||void 0;continue}if(I.startsWith("organizer:")){v=I.slice(10).trim()||void 0;continue}if(I.startsWith("track:")){T=I.slice(6).trim()||void 0;continue}if(I.startsWith("city:")){g=I.slice(5).trim()||void 0;continue}if(I.startsWith("configuration:")){w=I.slice(14).trim()||void 0;continue}if(I.startsWith("config:")){w=I.slice(7).trim()||void 0;continue}if(I.startsWith("direction:")){O=I.slice(10).trim()||void 0;continue}if(I.startsWith("## ")){const j=I.slice(3).trim();if(j.toLowerCase()==="groups"){q=!0,L=null;continue}const N=j.split("|").map(Y=>Y.trim());N.length===2&&/^\d{4}-\d{2}-\d{2}$/.test(N[1])?(q=!1,L={id:N[0].toLowerCase().replace(/\s+/g,"-"),label:N[0],date:N[1],activities:[]},B.push(L)):q=!1;continue}if(q){const j=I.split("|").map(N=>N.trim());if(j.length>=4){const N=j[4]||void 0;D.push({id:j[0],label:j[1],bgClass:j[2],textClass:j[3],...N?{description:N}:{}})}continue}if(L){if(/^\d{2}:\d{2}/.test(I)){const j=iy(I);j&&L.activities.push(j)}else if(/^break\s*\|/.test(I)){const j=I.slice(I.indexOf("|")+1).trim();L.activities.push({type:"break",label:j})}}}return{id:s,name:o,...f?{subtitle:f}:{},...d?{link:d}:{},...v?{organizer:v}:{},...T?{track:T}:{},...g?{city:g}:{},...w?{configuration:w}:{},...O?{direction:O}:{},runGroups:D,days:B}}function iy(s){const c=s.split("|").map(T=>T.trim()),h=c[0],o=c.slice(1),f=h.match(/^(\d{2}:\d{2})\s+(.+)$/);if(!f)return null;const d=f[1],v=f[2].trim();if(/^(general|lunch|special)$/.test(v)){const T=v,g=o[0]??"",w=o[1]||void 0;return{time:d,type:T,label:g,...w?{subtitle:w}:{}}}if(/^session/.test(v)){const T=v.match(/^session\s+(\d+)/),g=T?parseInt(T[1],10):void 0;let w=[],O=[],D;for(const B of o)B.startsWith("track:")?w=B.slice(6).trim().split(",").map(L=>L.trim()).filter(Boolean):B.startsWith("class:")?O=B.slice(6).trim().split(",").map(L=>L.trim()).filter(Boolean):B.startsWith("note:")&&(D=B.slice(5).trim()||void 0);return{time:d,type:"session",...g!==void 0?{sessionNumber:g}:{},onTrack:w,...O.length?{inClass:O}:{},...D?{note:D}:{}}}return null}const uy=`# TDE at MSRC 1.7CW

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
`,ir="/hpde/pr-preview/pr-190/assets/msrc-1-7-D9G0r_nf.jpg",oy={...Ha("2026-09-11_msrc-1-7",uy),mapImage:ir},sy=`# SCCA at MSRC 1.7 CW

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
`,ry={...Ha("2026-09-13_msr-scca",sy),mapImage:ir},cy=`# TDE at MSRC 1.7 Fast Track

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
`,fy={...Ha("2026-06-06_msrc-1-7",cy),mapImage:ir},dy=`# TDE at MSRC 3.1

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
`,hy="/hpde/pr-preview/pr-190/assets/msrc-3-1-BsOP6CK2.png",gy={...Ha("2025-11-07_msrc-3-1",dy),mapImage:hy},my=`# TDE at ECR 2.7

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
`,py="/hpde/pr-preview/pr-190/assets/ecr-BW_3Ndfh.png",yy={...Ha("2026-05-30_ecr-2-7",my),mapImage:py},vy=`# Test Event

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
`,tg=Ha("test-live",vy),by={...tg,days:tg.days.map(s=>({...s,date:Ol()}))},eu=[oy,ry,fy,yy,gy].sort((s,c)=>c.id.localeCompare(s.id)),eg=[...eu,by];function tu(s,c){const[h,o]=ct.useState(()=>{try{const f=localStorage.getItem(s);return f!==null?JSON.parse(f):c}catch{return c}});return ct.useEffect(()=>{localStorage.setItem(s,JSON.stringify(h))},[s,h]),[h,o]}function gg(s){const c=Ol();return s.days.find(h=>h.date===c)}function ng(s){return gg(s)??s.days[0]}function wy(){const[s,c]=ct.useState(()=>window.location.hash);ct.useEffect(()=>{const o=()=>{c(window.location.hash),window.scrollTo(0,0)};return window.addEventListener("hashchange",o),()=>window.removeEventListener("hashchange",o)},[]);function h(o){window.location.hash!==o&&(window.location.hash=o)}return[s,h]}const er="#/event/";function ag(s){return`${er}${encodeURIComponent(s)}`}function Sy(s){return s.startsWith(er)?decodeURIComponent(s.slice(er.length)):null}function Ty(){const[s,c]=wy(),[h,o]=tu("hpde:activeEvent",eu[0].id),[f,d]=tu("hpde:activeDay",null),[v,T]=tu("hpde:groups",[]),[g,w]=tu("hpde:hidePast",!1),[O,D]=ct.useState(!1),B=eg.find(U=>U.id===h)??eu[0],L=B.days.find(U=>U.id===f)??ng(B),q=gg(B),V=L.date===Ol(),I=B.days.length>1,N=B.days.reduce((U,H)=>H.date>U?H.date:U,B.days[0].date)<Ol(),[,Y]=ct.useState(0);ct.useEffect(()=>{if(!V)return;const U=setInterval(()=>Y(H=>H+1),6e4);return()=>clearInterval(U)},[V]);const K=V&&L.activities.some(U=>U.type!=="break"&&en(U.time)<ar());function ut(U){o(U.id),d(ng(U).id),T([]),c(ag(U.id))}return ct.useEffect(()=>{const U=Sy(s);if(U){const H=eg.find(Q=>Q.id===U);H&&H.id!==h&&ut(H);return}(s===""||s==="#")&&c(ag(h))},[s]),s==="#/widget-script"?p.jsx(Np,{}):s==="#/share"?p.jsx(Wp,{}):p.jsxs(p.Fragment,{children:[p.jsx(Ap,{disabled:O,children:p.jsxs("div",{className:"min-h-screen bg-gray-50",children:[p.jsxs("div",{className:"mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6",children:[p.jsx("div",{className:"mb-4 flex items-start justify-between gap-3",children:p.jsx(Tp,{events:eu,active:B,onChange:ut,onOpenDetails:()=>D(!0)})}),N&&p.jsx("div",{className:"mb-4 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-center text-sm text-gray-600",children:"This event has passed."}),I&&p.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[p.jsx("div",{className:"flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0",children:B.days.map(U=>p.jsx("button",{onClick:()=>d(U.id),className:`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${L.id===U.id?"bg-gray-900 text-white":"text-gray-500 hover:text-gray-800"}`,children:U.label},U.id))}),p.jsx("button",{onClick:()=>q&&d(q.id),disabled:V||!q,className:`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${V||!q?"border-gray-100 bg-white text-gray-300 cursor-default":"border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400"}`,children:"Now"})]}),p.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[p.jsx(Sp,{groups:B.runGroups,selected:v,onChange:T}),K&&p.jsx(Ep,{checked:g,onChange:()=>w(U=>!U),label:"Hide past activities"})]}),p.jsx(wp,{activities:L.activities,runGroups:B.runGroups,isToday:V,selectedGroups:v,hidePast:g}),p.jsx(Cp,{groups:B.runGroups})]}),p.jsxs("div",{className:"mt-6 pb-8 text-center text-xs",children:[p.jsxs("div",{children:[p.jsx("a",{href:"#/widget-script",className:"text-gray-600 underline hover:text-gray-800",children:"iOS widget"})," · ",p.jsx("a",{href:"#/share",className:"text-gray-600 underline hover:text-gray-800",children:"Share"})]}),p.jsxs("div",{className:"mt-4 font-mono text-[10px] text-gray-300",children:["build ",tp("2026-09-19T15:24:06-05:00")]})]})]})}),p.jsx(ly,{event:B,open:O,onClose:()=>D(!1)})]})}I0.createRoot(document.getElementById("root")).render(p.jsx(ct.StrictMode,{children:p.jsx(Ty,{})}));
