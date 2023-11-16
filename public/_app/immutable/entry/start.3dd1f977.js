import{o as me,t as we}from"../chunks/scheduler.05577254.js";import{S as Ge,a as Je,I as V,g as De,f as Ce,b as _e,c as le,d as te,i as ye,s as H,o as Me,e as G,P as Ve,h as Ze}from"../chunks/singletons.a32d44fa.js";function Qe(t,r){return t==="/"||r==="ignore"?t:r==="never"?t.endsWith("/")?t.slice(0,-1):t:r==="always"&&!t.endsWith("/")?t+"/":t}function et(t){return t.split("%25").map(decodeURI).join("%25")}function tt(t){for(const r in t)t[r]=decodeURIComponent(t[r]);return t}const nt=["href","pathname","search","searchParams","toString","toJSON"];function at(t,r){const f=new URL(t);for(const i of nt)Object.defineProperty(f,i,{get(){return r(),t[i]},enumerable:!0,configurable:!0});return rt(f),f}function rt(t){Object.defineProperty(t,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const ot="/__data.json";function it(t){return t.replace(/\/$/,"")+ot}function st(...t){let r=5381;for(const f of t)if(typeof f=="string"){let i=f.length;for(;i;)r=r*33^f.charCodeAt(--i)}else if(ArrayBuffer.isView(f)){const i=new Uint8Array(f.buffer,f.byteOffset,f.byteLength);let h=i.length;for(;h;)r=r*33^i[--h]}else throw new TypeError("value must be a string or TypedArray");return(r>>>0).toString(36)}const Ke=window.fetch;window.fetch=(t,r)=>((t instanceof Request?t.method:(r==null?void 0:r.method)||"GET")!=="GET"&&ae.delete(Se(t)),Ke(t,r));const ae=new Map;function ct(t,r){const f=Se(t,r),i=document.querySelector(f);if(i!=null&&i.textContent){const{body:h,...u}=JSON.parse(i.textContent),E=i.getAttribute("data-ttl");return E&&ae.set(f,{body:h,init:u,ttl:1e3*Number(E)}),Promise.resolve(new Response(h,u))}return window.fetch(t,r)}function lt(t,r,f){if(ae.size>0){const i=Se(t,f),h=ae.get(i);if(h){if(performance.now()<h.ttl&&["default","force-cache","only-if-cached",void 0].includes(f==null?void 0:f.cache))return new Response(h.body,h.init);ae.delete(i)}}return window.fetch(r,f)}function Se(t,r){let i=`script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request?t.url:t)}]`;if(r!=null&&r.headers||r!=null&&r.body){const h=[];r.headers&&h.push([...new Headers(r.headers)].join(",")),r.body&&(typeof r.body=="string"||ArrayBuffer.isView(r.body))&&h.push(r.body),i+=`[data-hash="${st(...h)}"]`}return i}const ft=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function ut(t){const r=[];return{pattern:t==="/"?/^\/$/:new RegExp(`^${pt(t).map(i=>{const h=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(i);if(h)return r.push({name:h[1],matcher:h[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const u=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(i);if(u)return r.push({name:u[1],matcher:u[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!i)return;const E=i.split(/\[(.+?)\](?!\])/);return"/"+E.map((g,m)=>{if(m%2){if(g.startsWith("x+"))return ve(String.fromCharCode(parseInt(g.slice(2),16)));if(g.startsWith("u+"))return ve(String.fromCharCode(...g.slice(2).split("-").map(U=>parseInt(U,16))));const d=ft.exec(g);if(!d)throw new Error(`Invalid param: ${g}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,j,T,R,C]=d;return r.push({name:R,matcher:C,optional:!!j,rest:!!T,chained:T?m===1&&E[0]==="":!1}),T?"(.*?)":j?"([^/]*)?":"([^/]+?)"}return ve(g)}).join("")}).join("")}/?$`),params:r}}function dt(t){return!/^\([^)]+\)$/.test(t)}function pt(t){return t.slice(1).split("/").filter(dt)}function ht(t,r,f){const i={},h=t.slice(1),u=h.filter(l=>l!==void 0);let E=0;for(let l=0;l<r.length;l+=1){const g=r[l];let m=h[l-E];if(g.chained&&g.rest&&E&&(m=h.slice(l-E,l+1).filter(d=>d).join("/"),E=0),m===void 0){g.rest&&(i[g.name]="");continue}if(!g.matcher||f[g.matcher](m)){i[g.name]=m;const d=r[l+1],j=h[l+1];d&&!d.rest&&d.optional&&j&&g.chained&&(E=0),!d&&!j&&Object.keys(i).length===u.length&&(E=0);continue}if(g.optional&&g.chained){E++;continue}return}if(!E)return i}function ve(t){return t.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function gt({nodes:t,server_loads:r,dictionary:f,matchers:i}){const h=new Set(r);return Object.entries(f).map(([l,[g,m,d]])=>{const{pattern:j,params:T}=ut(l),R={id:l,exec:C=>{const U=j.exec(C);if(U)return ht(U,T,i)},errors:[1,...d||[]].map(C=>t[C]),layouts:[0,...m||[]].map(E),leaf:u(g)};return R.errors.length=R.layouts.length=Math.max(R.errors.length,R.layouts.length),R});function u(l){const g=l<0;return g&&(l=~l),[g,t[l]]}function E(l){return l===void 0?l:[h.has(l),t[l]]}}function ze(t){try{return JSON.parse(sessionStorage[t])}catch{}}function qe(t,r){const f=JSON.stringify(r);try{sessionStorage[t]=f}catch{}}const mt=-1,wt=-2,_t=-3,yt=-4,vt=-5,bt=-6;function Et(t,r){if(typeof t=="number")return h(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const f=t,i=Array(f.length);function h(u,E=!1){if(u===mt)return;if(u===_t)return NaN;if(u===yt)return 1/0;if(u===vt)return-1/0;if(u===bt)return-0;if(E)throw new Error("Invalid input");if(u in i)return i[u];const l=f[u];if(!l||typeof l!="object")i[u]=l;else if(Array.isArray(l))if(typeof l[0]=="string"){const g=l[0],m=r==null?void 0:r[g];if(m)return i[u]=m(h(l[1]));switch(g){case"Date":i[u]=new Date(l[1]);break;case"Set":const d=new Set;i[u]=d;for(let R=1;R<l.length;R+=1)d.add(h(l[R]));break;case"Map":const j=new Map;i[u]=j;for(let R=1;R<l.length;R+=2)j.set(h(l[R]),h(l[R+1]));break;case"RegExp":i[u]=new RegExp(l[1],l[2]);break;case"Object":i[u]=Object(l[1]);break;case"BigInt":i[u]=BigInt(l[1]);break;case"null":const T=Object.create(null);i[u]=T;for(let R=1;R<l.length;R+=2)T[l[R]]=h(l[R+1]);break;default:throw new Error(`Unknown type ${g}`)}}else{const g=new Array(l.length);i[u]=g;for(let m=0;m<l.length;m+=1){const d=l[m];d!==wt&&(g[m]=h(d))}}else{const g={};i[u]=g;for(const m in l){const d=l[m];g[m]=h(d)}}return i[u]}return h(0)}function St(t){return t.filter(r=>r!=null)}const We=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...We];const kt=new Set([...We]);[...kt];async function Rt(t){var r;for(const f in t)if(typeof((r=t[f])==null?void 0:r.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(t).map(async([i,h])=>[i,await h])));return t}class ne{constructor(r,f){this.status=r,typeof f=="string"?this.body={message:f}:f?this.body=f:this.body={message:`Error: ${r}`}}toString(){return JSON.stringify(this.body)}}class Fe{constructor(r,f){this.status=r,this.location=f}}const At="x-sveltekit-invalidated",It="x-sveltekit-trailing-slash",J=ze(Ge)??{},ee=ze(Je)??{};function be(t){J[t]=te()}function K(t){return location.href=t.href,new Promise(()=>{})}function Lt(t,r){var Ne;const f=gt(t),i=t.nodes[0],h=t.nodes[1];i(),h();const u=document.documentElement,E=[],l=[];let g=null;const m={before_navigate:[],on_navigate:[],after_navigate:[]};let d={branch:[],error:null,url:null},j=!1,T=!1,R=!0,C=!1,U=!1,D=!1,z=!1,q,x=(Ne=history.state)==null?void 0:Ne[V];x||(x=Date.now(),history.replaceState({...history.state,[V]:x},"",location.href));const fe=J[x];fe&&(history.scrollRestoration="manual",scrollTo(fe.x,fe.y));let F,W,Y;async function ke(){if(Y=Y||Promise.resolve(),await Y,!Y)return;Y=null;const e=new URL(location.href),s=Z(e,!0);g=null;const n=W={},o=s&&await pe(s);if(n===W&&o){if(o.type==="redirect")return re(new URL(o.location,e).href,{},1,n);o.props.page!==void 0&&(F=o.props.page),q.$set(o.props)}}function Re(e){l.some(s=>s==null?void 0:s.snapshot)&&(ee[e]=l.map(s=>{var n;return(n=s==null?void 0:s.snapshot)==null?void 0:n.capture()}))}function Ae(e){var s;(s=ee[e])==null||s.forEach((n,o)=>{var a,c;(c=(a=l[o])==null?void 0:a.snapshot)==null||c.restore(n)})}function Ie(){be(x),qe(Ge,J),Re(x),qe(Je,ee)}async function re(e,{noScroll:s=!1,replaceState:n=!1,keepFocus:o=!1,state:a={},invalidateAll:c=!1},p,v){return typeof e=="string"&&(e=new URL(e,De(document))),ce({url:e,scroll:s?te():null,keepfocus:o,redirect_count:p,details:{state:a,replaceState:n},nav_token:v,accepted:()=>{c&&(z=!0)},blocked:()=>{},type:"goto"})}async function Le(e){return g={id:e.id,promise:pe(e).then(s=>(s.type==="loaded"&&s.state.error&&(g=null),s))},g.promise}async function oe(...e){const n=f.filter(o=>e.some(a=>o.exec(a))).map(o=>Promise.all([...o.layouts,o.leaf].map(a=>a==null?void 0:a[1]())));await Promise.all(n)}function Pe(e){var o;d=e.state;const s=document.querySelector("style[data-sveltekit]");s&&s.remove(),F=e.props.page,q=new t.root({target:r,props:{...e.props,stores:H,components:l},hydrate:!0}),Ae(x);const n={from:null,to:{params:d.params,route:{id:((o=d.route)==null?void 0:o.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};m.after_navigate.forEach(a=>a(n)),T=!0}async function X({url:e,params:s,branch:n,status:o,error:a,route:c,form:p}){let v="never";for(const _ of n)(_==null?void 0:_.slash)!==void 0&&(v=_.slash);e.pathname=Qe(e.pathname,v),e.search=e.search;const b={type:"loaded",state:{url:e,params:s,branch:n,error:a,route:c},props:{constructors:St(n).map(_=>_.node.component)}};p!==void 0&&(b.props.form=p);let y={},L=!F,A=0;for(let _=0;_<Math.max(n.length,d.branch.length);_+=1){const w=n[_],O=d.branch[_];(w==null?void 0:w.data)!==(O==null?void 0:O.data)&&(L=!0),w&&(y={...y,...w.data},L&&(b.props[`data_${A}`]=y),A+=1)}return(!d.url||e.href!==d.url.href||d.error!==a||p!==void 0&&p!==F.form||L)&&(b.props.page={error:a,params:s,route:{id:(c==null?void 0:c.id)??null},status:o,url:new URL(e),form:p??null,data:L?y:F.data}),b}async function ue({loader:e,parent:s,url:n,params:o,route:a,server_data_node:c}){var y,L,A;let p=null;const v={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},b=await e();if((y=b.universal)!=null&&y.load){let P=function(...w){for(const O of w){const{href:N}=new URL(O,n);v.dependencies.add(N)}};const _={route:new Proxy(a,{get:(w,O)=>(v.route=!0,w[O])}),params:new Proxy(o,{get:(w,O)=>(v.params.add(O),w[O])}),data:(c==null?void 0:c.data)??null,url:at(n,()=>{v.url=!0}),async fetch(w,O){let N;w instanceof Request?(N=w.url,O={body:w.method==="GET"||w.method==="HEAD"?void 0:await w.blob(),cache:w.cache,credentials:w.credentials,headers:w.headers,integrity:w.integrity,keepalive:w.keepalive,method:w.method,mode:w.mode,redirect:w.redirect,referrer:w.referrer,referrerPolicy:w.referrerPolicy,signal:w.signal,...O}):N=w;const M=new URL(N,n);return P(M.href),M.origin===n.origin&&(N=M.href.slice(n.origin.length)),T?lt(N,M.href,O):ct(N,O)},setHeaders:()=>{},depends:P,parent(){return v.parent=!0,s()}};p=await b.universal.load.call(null,_)??null,p=p?await Rt(p):null}return{node:b,loader:e,server:c,universal:(L=b.universal)!=null&&L.load?{type:"data",data:p,uses:v}:null,data:p??(c==null?void 0:c.data)??null,slash:((A=b.universal)==null?void 0:A.trailingSlash)??(c==null?void 0:c.slash)}}function Oe(e,s,n,o,a){if(z)return!0;if(!o)return!1;if(o.parent&&e||o.route&&s||o.url&&n)return!0;for(const c of o.params)if(a[c]!==d.params[c])return!0;for(const c of o.dependencies)if(E.some(p=>p(new URL(c))))return!0;return!1}function de(e,s){return(e==null?void 0:e.type)==="data"?e:(e==null?void 0:e.type)==="skip"?s??null:null}async function pe({id:e,invalidating:s,url:n,params:o,route:a}){if((g==null?void 0:g.id)===e)return g.promise;const{errors:c,layouts:p,leaf:v}=a,b=[...p,v];c.forEach(S=>S==null?void 0:S().catch(()=>{})),b.forEach(S=>S==null?void 0:S[1]().catch(()=>{}));let y=null;const L=d.url?e!==d.url.pathname+d.url.search:!1,A=d.route?a.id!==d.route.id:!1;let P=!1;const _=b.map((S,I)=>{var B;const k=d.branch[I],$=!!(S!=null&&S[0])&&((k==null?void 0:k.loader)!==S[1]||Oe(P,A,L,(B=k.server)==null?void 0:B.uses,o));return $&&(P=!0),$});if(_.some(Boolean)){try{y=await He(n,_)}catch(S){return ie({status:S instanceof ne?S.status:500,error:await Q(S,{url:n,params:o,route:{id:a.id}}),url:n,route:a})}if(y.type==="redirect")return y}const w=y==null?void 0:y.nodes;let O=!1;const N=b.map(async(S,I)=>{var he;if(!S)return;const k=d.branch[I],$=w==null?void 0:w[I];if((!$||$.type==="skip")&&S[1]===(k==null?void 0:k.loader)&&!Oe(O,A,L,(he=k.universal)==null?void 0:he.uses,o))return k;if(O=!0,($==null?void 0:$.type)==="error")throw $;return ue({loader:S[1],url:n,params:o,route:a,parent:async()=>{var Te;const $e={};for(let ge=0;ge<I;ge+=1)Object.assign($e,(Te=await N[ge])==null?void 0:Te.data);return $e},server_data_node:de($===void 0&&S[0]?{type:"skip"}:$??null,S[0]?k==null?void 0:k.server:void 0)})});for(const S of N)S.catch(()=>{});const M=[];for(let S=0;S<b.length;S+=1)if(b[S])try{M.push(await N[S])}catch(I){if(I instanceof Fe)return{type:"redirect",location:I.location};let k=500,$;if(w!=null&&w.includes(I))k=I.status??k,$=I.error;else if(I instanceof ne)k=I.status,$=I.body;else{if(await H.updated.check())return await K(n);$=await Q(I,{params:o,url:n,route:{id:a.id}})}const B=await xe(S,M,c);return B?await X({url:n,params:o,branch:M.slice(0,B.idx).concat(B.node),status:k,error:$,route:a}):await je(n,{id:a.id},$,k)}else M.push(void 0);return await X({url:n,params:o,branch:M,status:200,error:null,route:a,form:s?void 0:null})}async function xe(e,s,n){for(;e--;)if(n[e]){let o=e;for(;!s[o];)o-=1;try{return{idx:o+1,node:{node:await n[e](),loader:n[e],data:{},server:null,universal:null}}}catch{continue}}}async function ie({status:e,error:s,url:n,route:o}){const a={};let c=null;if(t.server_loads[0]===0)try{const y=await He(n,[!0]);if(y.type!=="data"||y.nodes[0]&&y.nodes[0].type!=="data")throw 0;c=y.nodes[0]??null}catch{(n.origin!==Me||n.pathname!==location.pathname||j)&&await K(n)}const v=await ue({loader:i,url:n,params:a,route:o,parent:()=>Promise.resolve({}),server_data_node:de(c)}),b={node:await h(),loader:h,universal:null,server:null,data:null};return await X({url:n,params:a,branch:[v,b],status:e,error:s,route:null})}function Z(e,s){if(ye(e,G))return;const n=se(e);for(const o of f){const a=o.exec(n);if(a)return{id:e.pathname+e.search,invalidating:s,route:o,params:tt(a),url:e}}}function se(e){return et(e.pathname.slice(G.length)||"/")}function Ue({url:e,type:s,intent:n,delta:o}){let a=!1;const c=Be(d,n,e,s);o!==void 0&&(c.navigation.delta=o);const p={...c.navigation,cancel:()=>{a=!0,c.reject(new Error("navigation was cancelled"))}};return U||m.before_navigate.forEach(v=>v(p)),a?null:c}async function ce({url:e,scroll:s,keepfocus:n,redirect_count:o,details:a,type:c,delta:p,nav_token:v={},accepted:b,blocked:y}){var N,M,S;const L=Z(e,!1),A=Ue({url:e,type:c,delta:p,intent:L});if(!A){y();return}const P=x;b(),U=!0,T&&H.navigating.set(A.navigation),W=v;let _=L&&await pe(L);if(!_){if(ye(e,G))return await K(e);_=await je(e,{id:null},await Q(new Error(`Not found: ${e.pathname}`),{url:e,params:{},route:{id:null}}),404)}if(e=(L==null?void 0:L.url)||e,W!==v)return A.reject(new Error("navigation was aborted")),!1;if(_.type==="redirect")if(o>=20)_=await ie({status:500,error:await Q(new Error("Redirect loop"),{url:e,params:{},route:{id:null}}),url:e,route:{id:null}});else return re(new URL(_.location,e).href,{},o+1,v),!1;else((N=_.props.page)==null?void 0:N.status)>=400&&await H.updated.check()&&await K(e);if(E.length=0,z=!1,C=!0,be(P),Re(P),(M=_.props.page)!=null&&M.url&&_.props.page.url.pathname!==e.pathname&&(e.pathname=(S=_.props.page)==null?void 0:S.url.pathname),a){const I=a.replaceState?0:1;if(a.state[V]=x+=I,history[a.replaceState?"replaceState":"pushState"](a.state,"",e),!a.replaceState){let k=x+1;for(;ee[k]||J[k];)delete ee[k],delete J[k],k+=1}}if(g=null,T){d=_.state,_.props.page&&(_.props.page.url=e);const I=(await Promise.all(m.on_navigate.map(k=>k(A.navigation)))).filter(k=>typeof k=="function");if(I.length>0){let k=function(){m.after_navigate=m.after_navigate.filter($=>!I.includes($))};I.push(k),m.after_navigate.push(...I)}q.$set(_.props)}else Pe(_);const{activeElement:w}=document;if(await we(),R){const I=e.hash&&document.getElementById(decodeURIComponent(e.hash.slice(1)));s?scrollTo(s.x,s.y):I?I.scrollIntoView():scrollTo(0,0)}const O=document.activeElement!==w&&document.activeElement!==document.body;!n&&!O&&Ee(),R=!0,_.props.page&&(F=_.props.page),U=!1,c==="popstate"&&Ae(x),A.fulfil(void 0),m.after_navigate.forEach(I=>I(A.navigation)),H.navigating.set(null),C=!1}async function je(e,s,n,o){return e.origin===Me&&e.pathname===location.pathname&&!j?await ie({status:o,error:n,url:e,route:s}):await K(e)}function Xe(){let e;u.addEventListener("mousemove",c=>{const p=c.target;clearTimeout(e),e=setTimeout(()=>{o(p,2)},20)});function s(c){o(c.composedPath()[0],1)}u.addEventListener("mousedown",s),u.addEventListener("touchstart",s,{passive:!0});const n=new IntersectionObserver(c=>{for(const p of c)p.isIntersecting&&(oe(se(new URL(p.target.href))),n.unobserve(p.target))},{threshold:0});function o(c,p){const v=Ce(c,u);if(!v)return;const{url:b,external:y,download:L}=_e(v,G);if(y||L)return;const A=le(v);if(!A.reload)if(p<=A.preload_data){const P=Z(b,!1);P&&Le(P)}else p<=A.preload_code&&oe(se(b))}function a(){n.disconnect();for(const c of u.querySelectorAll("a")){const{url:p,external:v,download:b}=_e(c,G);if(v||b)continue;const y=le(c);y.reload||(y.preload_code===Ve.viewport&&n.observe(c),y.preload_code===Ve.eager&&oe(se(p)))}}m.after_navigate.push(a),a()}function Q(e,s){return e instanceof ne?e.body:t.hooks.handleError({error:e,event:s})??{message:s.route.id!=null?"Internal Error":"Not Found"}}return{after_navigate:e=>{me(()=>(m.after_navigate.push(e),()=>{const s=m.after_navigate.indexOf(e);m.after_navigate.splice(s,1)}))},before_navigate:e=>{me(()=>(m.before_navigate.push(e),()=>{const s=m.before_navigate.indexOf(e);m.before_navigate.splice(s,1)}))},on_navigate:e=>{me(()=>(m.on_navigate.push(e),()=>{const s=m.on_navigate.indexOf(e);m.on_navigate.splice(s,1)}))},disable_scroll_handling:()=>{(C||!T)&&(R=!1)},goto:(e,s={})=>re(e,s,0),invalidate:e=>{if(typeof e=="function")E.push(e);else{const{href:s}=new URL(e,location.href);E.push(n=>n.href===s)}return ke()},invalidate_all:()=>(z=!0,ke()),preload_data:async e=>{const s=new URL(e,De(document)),n=Z(s,!1);if(!n)throw new Error(`Attempted to preload a URL that does not belong to this app: ${s}`);await Le(n)},preload_code:oe,apply_action:async e=>{if(e.type==="error"){const s=new URL(location.href),{branch:n,route:o}=d;if(!o)return;const a=await xe(d.branch.length,n,o.errors);if(a){const c=await X({url:s,params:d.params,branch:n.slice(0,a.idx).concat(a.node),status:e.status??500,error:e.error,route:o});d=c.state,q.$set(c.props),we().then(Ee)}}else e.type==="redirect"?re(e.location,{invalidateAll:!0},0):(q.$set({form:null,page:{...F,form:e.data,status:e.status}}),await we(),q.$set({form:e.data}),e.type==="success"&&Ee())},_start_router:()=>{var s;history.scrollRestoration="manual",addEventListener("beforeunload",n=>{let o=!1;if(Ie(),!U){const a=Be(d,void 0,null,"leave"),c={...a.navigation,cancel:()=>{o=!0,a.reject(new Error("navigation was cancelled"))}};m.before_navigate.forEach(p=>p(c))}o?(n.preventDefault(),n.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ie()}),(s=navigator.connection)!=null&&s.saveData||Xe(),u.addEventListener("click",n=>{var P;if(n.button||n.which!==1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.defaultPrevented)return;const o=Ce(n.composedPath()[0],u);if(!o)return;const{url:a,external:c,target:p,download:v}=_e(o,G);if(!a)return;if(p==="_parent"||p==="_top"){if(window.parent!==window)return}else if(p&&p!=="_self")return;const b=le(o);if(!(o instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||v)return;if(c||b.reload){Ue({url:a,type:"link"})?U=!0:n.preventDefault();return}const[L,A]=a.href.split("#");if(A!==void 0&&L===location.href.split("#")[0]){if(d.url.hash===a.hash){n.preventDefault(),(P=o.ownerDocument.getElementById(A))==null||P.scrollIntoView();return}if(D=!0,be(x),e(a),!b.replace_state)return;D=!1,n.preventDefault()}ce({url:a,scroll:b.noscroll?te():null,keepfocus:b.keep_focus??!1,redirect_count:0,details:{state:{},replaceState:b.replace_state??a.href===location.href},accepted:()=>n.preventDefault(),blocked:()=>n.preventDefault(),type:"link"})}),u.addEventListener("submit",n=>{if(n.defaultPrevented)return;const o=HTMLFormElement.prototype.cloneNode.call(n.target),a=n.submitter;if(((a==null?void 0:a.formMethod)||o.method)!=="get")return;const p=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||o.action);if(ye(p,G))return;const v=n.target,{keep_focus:b,noscroll:y,reload:L,replace_state:A}=le(v);if(L)return;n.preventDefault(),n.stopPropagation();const P=new FormData(v),_=a==null?void 0:a.getAttribute("name");_&&P.append(_,(a==null?void 0:a.getAttribute("value"))??""),p.search=new URLSearchParams(P).toString(),ce({url:p,scroll:y?te():null,keepfocus:b??!1,redirect_count:0,details:{state:{},replaceState:A??p.href===location.href},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",async n=>{var o;if(W={},(o=n.state)!=null&&o[V]){if(n.state[V]===x)return;const a=J[n.state[V]],c=new URL(location.href);if(d.url.href.split("#")[0]===location.href.split("#")[0]){e(c),J[x]=te(),x=n.state[V],scrollTo(a.x,a.y);return}const p=n.state[V]-x;await ce({url:c,scroll:a,keepfocus:!1,redirect_count:0,details:null,accepted:()=>{x=n.state[V]},blocked:()=>{history.go(-p)},type:"popstate",delta:p,nav_token:W})}else if(!D){const a=new URL(location.href);e(a)}}),addEventListener("hashchange",()=>{D&&(D=!1,history.replaceState({...history.state,[V]:++x},"",location.href))});for(const n of document.querySelectorAll("link"))n.rel==="icon"&&(n.href=n.href);addEventListener("pageshow",n=>{n.persisted&&H.navigating.set(null)});function e(n){d.url=n,H.page.set({...F,url:n}),H.page.notify()}},_hydrate:async({status:e=200,error:s,node_ids:n,params:o,route:a,data:c,form:p})=>{j=!0;const v=new URL(location.href);({params:o={},route:a={id:null}}=Z(v,!1)||{});let b;try{const y=n.map(async(P,_)=>{const w=c[_];return w!=null&&w.uses&&(w.uses=Ye(w.uses)),ue({loader:t.nodes[P],url:v,params:o,route:a,parent:async()=>{const O={};for(let N=0;N<_;N+=1)Object.assign(O,(await y[N]).data);return O},server_data_node:de(w)})}),L=await Promise.all(y),A=f.find(({id:P})=>P===a.id);if(A){const P=A.layouts;for(let _=0;_<P.length;_++)P[_]||L.splice(_,0,void 0)}b=await X({url:v,params:o,branch:L,status:e,error:s,form:p,route:A??null})}catch(y){if(y instanceof Fe){await K(new URL(y.location,location.href));return}b=await ie({status:y instanceof ne?y.status:500,error:await Q(y,{url:v,params:o,route:a}),url:v,route:a})}Pe(b)}}}async function He(t,r){var h;const f=new URL(t);f.pathname=it(t.pathname),t.pathname.endsWith("/")&&f.searchParams.append(It,"1"),f.searchParams.append(At,r.map(u=>u?"1":"0").join(""));const i=await Ke(f.href);if((h=i.headers.get("content-type"))!=null&&h.includes("text/html")&&await K(t),!i.ok)throw new ne(i.status,await i.json());return new Promise(async u=>{var j;const E=new Map,l=i.body.getReader(),g=new TextDecoder;function m(T){return Et(T,{Promise:R=>new Promise((C,U)=>{E.set(R,{fulfil:C,reject:U})})})}let d="";for(;;){const{done:T,value:R}=await l.read();if(T&&!d)break;for(d+=!R&&d?`
`:g.decode(R);;){const C=d.indexOf(`
`);if(C===-1)break;const U=JSON.parse(d.slice(0,C));if(d=d.slice(C+1),U.type==="redirect")return u(U);if(U.type==="data")(j=U.nodes)==null||j.forEach(D=>{(D==null?void 0:D.type)==="data"&&(D.uses=Ye(D.uses),D.data=m(D.data))}),u(U);else if(U.type==="chunk"){const{id:D,data:z,error:q}=U,x=E.get(D);E.delete(D),q?x.reject(m(q)):x.fulfil(m(z))}}}})}function Ye(t){return{dependencies:new Set((t==null?void 0:t.dependencies)??[]),params:new Set((t==null?void 0:t.params)??[]),parent:!!(t!=null&&t.parent),route:!!(t!=null&&t.route),url:!!(t!=null&&t.url)}}function Ee(){const t=document.querySelector("[autofocus]");if(t)t.focus();else{const r=document.body,f=r.getAttribute("tabindex");r.tabIndex=-1,r.focus({preventScroll:!0,focusVisible:!1}),f!==null?r.setAttribute("tabindex",f):r.removeAttribute("tabindex");const i=getSelection();if(i&&i.type!=="None"){const h=[];for(let u=0;u<i.rangeCount;u+=1)h.push(i.getRangeAt(u));setTimeout(()=>{if(i.rangeCount===h.length){for(let u=0;u<i.rangeCount;u+=1){const E=h[u],l=i.getRangeAt(u);if(E.commonAncestorContainer!==l.commonAncestorContainer||E.startContainer!==l.startContainer||E.endContainer!==l.endContainer||E.startOffset!==l.startOffset||E.endOffset!==l.endOffset)return}i.removeAllRanges()}})}}}function Be(t,r,f,i){var g,m;let h,u;const E=new Promise((d,j)=>{h=d,u=j});return E.catch(()=>{}),{navigation:{from:{params:t.params,route:{id:((g=t.route)==null?void 0:g.id)??null},url:t.url},to:f&&{params:(r==null?void 0:r.params)??null,route:{id:((m=r==null?void 0:r.route)==null?void 0:m.id)??null},url:f},willUnload:!r,type:i,complete:E},fulfil:h,reject:u}}async function xt(t,r,f){const i=Lt(t,r);Ze({client:i}),f?await i._hydrate(f):i.goto(location.href,{replaceState:!0}),i._start_router()}export{xt as start};
