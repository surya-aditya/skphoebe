(()=>{function _(t,e,o){return o<t?t:o>e?e:o}class C{constructor(t,e){this.cb=t,this.de=e,i(this,["loop"]),this.d8=new c(this.loop)}run(){this.de===0?this.cb():this.d8.run()}stop(){this.d8.stop()}loop(t){let e=_(0,this.de,t);if(_(0,1,e/this.de)===1)this.stop(),this.cb()}}class M{constructor(t){this.P2=new C(t.cb,t.de)}run(){this.P2.stop(),this.P2.run()}}var f=(t)=>{if(t.cancelable)t.preventDefault()};var E=(t)=>document.createElement(t);var D={uA:navigator.userAgent.toLowerCase(),get iPadIOS13(){return navigator.platform==="MacIntel"&&1<navigator.maxTouchPoints},get isMobile(){return/mobi|android|tablet|ipad|iphone/.test(this.uA)||this.iPadIOS13},get isFF(){return-1<this.uA.indexOf("firefox")}},l={id:(t,e=document)=>e.getElementById(t),cl:(t,e=document)=>{let o=e.getElementsByClassName(t);return Array.from(o).filter((r)=>r instanceof HTMLElement)},tag:(t,e=document)=>{let o=e.getElementsByTagName(t);return Array.from(o).filter((r)=>r instanceof HTMLElement)}};var k=(t)=>typeof t==="string";var L=(t)=>t!==void 0,S=(t)=>t===void 0,v={el:(t)=>{let e=[];if(k(t)){let o=t.charAt(0),r=t.substring(1);if(o==="#")e[0]=l.id(r);else if(o===".")e.push(...l.cl(r))}else e[0]=t;return e},type:(t)=>t.charAt(0)==="#"?"id":"class",name:(t)=>t.substring(1)};function z(t,e){if(Array.isArray(e))return e.some((o)=>Object.prototype.hasOwnProperty.call(t,o));return Object.prototype.hasOwnProperty.call(t,e)}function i(t,e){let o=e.length;for(let r=0;r<o;r++){let s=e[r];t[s]=t[s].bind(t)}}var B=(t)=>{let e=t.type,o=e==="html",r=o?"text":"json",s={method:o?"GET":"POST",mode:"same-origin"};if(e!=="data")s.headers=new Headers({"Content-type":e==="json"?"application/x-www-form-urlencoded":"text/html"});if(!o)s.body=t.body;if(L(t.signal))s.signal=t.signal;fetch(t.url,s).then((n)=>{if(n.ok)return n[r]();else if(t.error)t.error()}).then((n)=>{t.success(n)}).catch((n)=>{if(t.error)t.error()})},u=(t,e,o,r,s=!1)=>{let n=v.el(t),h=n.length,O=`${e==="a"?"add":"remove"}EventListener`,$=["mousemove","mousewheel","touchmove","touchstart"].includes(o)?{passive:!1}:void 0;for(let P=0;P<h;P++){let T=n[P];if(T&&typeof T[O]==="function")T[O](o,r,s?$:void 0)}};var I=(t)=>{return t.endsWith("/")?t.slice(0,-1):t};var W=16.666666666666668,N=0,F=0;class G{constructor(){this.P2=[],this.pause=0,i(this,["v"]),document.addEventListener("visibilitychange",this.v)}add(t){this.P2.push(t)}v(){let t=performance.now(),e=document.visibilityState==="visible",o=e?"start":"stop",r;if(!e)this.pause=t;else r=t-this.pause;this.P2.forEach((s)=>s[o](r))}}var J=new G;class H{constructor(){this.P2=[],this.play=!0,i(this,["loop","off","on"]),J.add({stop:this.off,start:this.on}),this.raf()}off(){this.play=!1}on(t){this.P2.forEach((e)=>e.sT+=t),this.play=!0}a(t){this.P2.push(t)}r(t){this.P2=this.P2.filter((e)=>e.id!==t)}loop(t){if(this.play)this.t=this.t||t,N=(t-this.t)/W,this.t=t,this.P2.forEach((e)=>{if(L(e)&&(e.sT||(e.sT=t))){let o=t-e.sT;e.cb(o)}});this.raf()}raf(){requestAnimationFrame(this.loop)}}var q=new H;class c{constructor(t){this.cb=t,this.on=!1,this.id=F,F++}run(){if(!this.on)q.a({id:this.id,cb:this.cb,sT:performance.now()}),this.on=!0}stop(){if(this.on)q.r(this.id),this.on=!1}}class p{constructor(){this.eT=D.isMobile?"orientationchange":"resize",this.tick=!1,this.P2=[],i(this,["fn","loop","run"]),this.t=new M({de:40,cb:this.loop}),this.rafr=new c(this.run),u(window,"a",this.eT,this.fn)}add(t){this.P2.push(t)}rm(t){let e=this.P2.findIndex((o)=>o.id===t);if(e!==-1)this.P2.splice(e,1)}fn(t){this.e=t,this.t.run()}loop(){if(!this.tick)this.tick=!0,this.rafr.run()}run(){this.P2.forEach((t)=>t.cb(this.e)),this.rafr.stop(),this.tick=!1}}var j=0;class a{constructor(t){this.cb=t,this.id=j,j++}on(){new p().add({id:this.id,cb:this.cb})}off(){new p().rm(this.id)}}class d{constructor(t){this.cb=t.cb,this.el=z(t,"el")?v.el(t.el)[0]:document,i(this,["run"])}on(){this.l("a")}off(){this.l("r")}l(t){u(this.el,t,"pointermove",this.run)}run(t){this.cb(t.pageX,t.pageY,t)}}class m{constructor(){this.P2=[-1,-1],i(this,["move"]),this.mm=new d({cb:this.move})}move(t,e){this.P2=[t,e]}run(){this.mm.on()}}function V(t){let e=l.cl("p"+(t||""));return e[e.length-1]}class x{constructor(){i(this,["resize","loop"]),this.raf=new c(this.loop),this.p=V,this.c=new m}intro(){}init(){this.loop()}resize(){}run(){new a(this.resize).on(),this.raf.run(),this.c.run()}on(){}off(){}loop(){}}class g{constructor(t){t(()=>{this.cb()})}cb(){let e=_A.e;e.intro(),e.init(),e.run()}}class w{constructor(){this.fx=new FxMutation}out(){let t=_A,e=t.route.new.url,o=t.rgl;t.e.off(),this.fx.out({cb:()=>t.page.update()})}in(){let t=_A,e=t.rgl,o=t.e,r=t.route.new.url;t.page.el(),t.page.R1(),this.fx.in()}}class b{constructor(){this.inj=!1,i(this,["resize"]),new a(this.resize).on(),this.resize()}resize(){let t=_A.winRatio.wh>1;if(t&&!this.inj)this.a();else if(!t&&this.inj)this.r()}a(){let t=document.body;this.ro=E("div"),this.ro.className="ro_";let e=E("div");e.className="ro",e.innerHTML="Rotate your device",this.ro.appendChild(e),t.prepend(this.ro),this.inj=!0}r(){this.ro.parentNode.removeChild(this.ro),this.inj=!1}}class y{constructor(t){this.d=t;let e=_A;e.win={w:0,h:0},e.config.dim={d:[1440,900],m:[393,856]},i(this,["resize"]),new a(this.resize).on(),this.resize()}resize(){let t=_A,e=innerWidth,o=innerHeight;t.win={w:e,h:o},t.winSemi={w:0.5*e,h:0.5*o},t.winRatio={wh:e/o,hw:o/e},t.isLandscape=1<t.winRatio.wh,t.format=t.isLandscape?"l":"p";let r=t.config.dim[this.d];t.dim={h:r[1],w:r[0]},t.winWSF=e/t.dim.w,t.winHSF=o/t.dim.h}}function U(t){let e=_A,o=e.config.routes[t],r=e.route.new,s=e.route.old;if(e.route.old=r,e.route.new={url:t,page:o},e.is[r.page]=!1,e.is[o]=!0,s.page)e.was[s.page]=!1;e.was[r.page]=!0}class A{constructor(t){let e=_A,o=t[0],r=t[1],s=t[2],n=t[3];if(e.intro=!0,e.mutating=!1,e.page={},this.nq=s,this.isD=o,this.d=o?"d":"m",i(this,["eD"]),new y(this.d),this.d==="m")new b;e.e=new r,this.s7(),u(document,"a","click",this.eD),new n((h)=>this.intro(h))}s7(){let t=document.readyState!=="complete";onload=()=>setTimeout(()=>t=!1,0),onpopstate=(e)=>{if(t&&document.readyState==="complete")f(e),e.stopImmediatePropagation();let o=_A;if(!S(o.config.routes))if(o.mutating)this.Ax();else o.mutating=!0,this.out(I(location.pathname),"back")}}eD(t){let e=_A,o=t.target,r=!1,s=!1;while(o){let n=o.tagName;if(n==="A"){r=!0;break}if((n==="INPUT"||n==="BUTTON")&&o.type==="submit"){s=!0;break}o=o.parentNode}if(r){let n=o.href,h=new URL(n).protocol;if(!o.hasAttribute("target")&&h!=="mailto:"&&h!=="tel:"){if(f(t),!e.mutating){let R=n.replace(/^.*\/\/[^/]+/,"");if(R===e.route.new.url)return;e.mutating=!0,this.out(R,o)}}}else if(s)f(t)}intro(t){let e=_A,o=e.route.new.url;B({url:o+"?device="+this.d,type:"html",success:(r)=>{let s=JSON.parse(r);e.config.routes=s.routes,e.data=s.data,this.cache=s.cache,this.add(document.body,"afterbegin",s.body),this.P2=l.id("_");let n=o;this.add(this.P2,"beforeend",this.cache[n].html),this.nq=new this.nq,t()}})}out(t,e){U(t);let o=_A;o.target=e,o.Yv=e==="back",o.page.update=()=>{this.in()},this.nq.out()}in(){let t=_A,e=t.route,o=this.cache[e.new.url];if(document.title=o.title,t.target!=="back")this.Ax();t.page.el=()=>{this.add(this.P2,"beforeend",o.html)},t.page.R1=()=>{let r=this.P2.children[0];r.parentNode.removeChild(r)},this.nq.in()}add(t,e,o){t.insertAdjacentHTML(e,o)}Ax(){let e=_A.route.new.url;history.pushState({page:e},"",e)}}new A([!0,x,w,g]);})();

//# debugId=CA87FCC911E0E88B64756E2164756E21
//# sourceMappingURL=d.js.map
