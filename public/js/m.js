(()=>{var W=16.666666666666668,z=0,_=0;class P{constructor(){this.fy=[],this.pause=0,i(this,["v"]),document.addEventListener("visibilitychange",this.v)}add(t){this.fy.push(t)}v(){let t=performance.now(),e=document.visibilityState==="visible",o=e?"start":"stop",s;if(!e)this.pause=t;else s=t-this.pause;this.fy.forEach((r)=>r[o](s))}}var J=new P;class B{constructor(){this.fy=[],this.play=!0,i(this,["loop","off","on"]),J.add({stop:this.off,start:this.on}),this.raf()}off(){this.play=!1}on(t){this.fy.forEach((e)=>e.sT+=t),this.play=!0}a(t){this.fy.push(t)}r(t){this.fy=this.fy.filter((e)=>e.id!==t)}loop(t){if(this.play)this.t=this.t||t,z=(t-this.t)/W,this.t=t,this.fy.forEach((e)=>{if(p(e)&&(e.sT||(e.sT=t))){let o=t-e.sT;e.cb(o)}});this.raf()}raf(){requestAnimationFrame(this.loop)}}var N=new B;class a{constructor(t){this.cb=t,this.on=!1,this.id=_,_++}run(){if(!this.on)N.a({id:this.id,cb:this.cb,sT:performance.now()}),this.on=!0}stop(){if(this.on)N.r(this.id),this.on=!1}}function I(t,e,o){return o<t?t:o>e?e:o}class G{constructor(t,e){this.cb=t,this.de=e,i(this,["loop"]),this.Et=new a(this.loop)}run(){this.de===0?this.cb():this.Et.run()}stop(){this.Et.stop()}loop(t){let e=I(0,this.de,t);if(I(0,1,e/this.de)===1)this.stop(),this.cb()}}class L{constructor(t){this.fy=new G(t.cb,t.de)}run(){this.fy.stop(),this.fy.run()}}var m=(t)=>{if(t.cancelable)t.preventDefault()};var h=(t)=>document.createElement(t);var k={uA:navigator.userAgent.toLowerCase(),get iPadIOS13(){return navigator.platform==="MacIntel"&&1<navigator.maxTouchPoints},get isMobile(){return/mobi|android|tablet|ipad|iphone/.test(this.uA)||this.iPadIOS13},get isFF(){return-1<this.uA.indexOf("firefox")}},u={id:(t,e=document)=>e.getElementById(t),cl:(t,e=document)=>{let o=e.getElementsByClassName(t);return Array.from(o).filter((s)=>s instanceof HTMLElement)},tag:(t,e=document)=>{let o=e.getElementsByTagName(t);return Array.from(o).filter((s)=>s instanceof HTMLElement)}};var V=(t)=>typeof t==="string";var p=(t)=>t!==void 0,C=(t)=>t===void 0,D={el:(t)=>{let e=[];if(V(t)){let o=t.charAt(0),s=t.substring(1);if(o==="#")e[0]=u.id(s);else if(o===".")e.push(...u.cl(s))}else e[0]=t;return e},type:(t)=>t.charAt(0)==="#"?"id":"class",name:(t)=>t.substring(1)};function F(t,e){if(Array.isArray(e))return e.some((o)=>Object.prototype.hasOwnProperty.call(t,o));return Object.prototype.hasOwnProperty.call(t,e)}function i(t,e){let o=e.length;for(let s=0;s<o;s++){let r=e[s];t[r]=t[r].bind(t)}}var j=(t)=>{let e=t.type,o=e==="html",s=o?"text":"json",r={method:o?"GET":"POST",mode:"same-origin"};if(e!=="data")r.headers=new Headers({"Content-type":e==="json"?"application/x-www-form-urlencoded":"text/html"});if(!o)r.body=t.body;if(p(t.signal))r.signal=t.signal;fetch(t.url,r).then((n)=>{if(n.ok)return n[s]();else if(t.error)t.error()}).then((n)=>{t.success(n)}).catch((n)=>{if(t.error)t.error()})},c=(t,e,o,s,r=!1)=>{let n=D.el(t),l=n.length,O=`${e==="a"?"add":"remove"}EventListener`,q=["mousemove","mousewheel","touchmove","touchstart"].includes(o)?{passive:!1}:void 0;for(let v=0;v<l;v++){let S=n[v];if(S&&typeof S[O]==="function")S[O](o,s,r?q:void 0)}};var H=(t)=>{return t.endsWith("/")?t.slice(0,-1):t};class g{constructor(t){this.col=t[0],this.inDom=!1;let e=document;if(i(this,["key"]),c(e,"a","keydown",this.key),p(t[1])){let o=h("div");o.id="g-cta",e.body.prepend(o),i(this,["cta"]),c(o,"a","click",this.cta)}}cta(){this.c({esc:!1,index:0})}key(t){if(_A.isM)return;if(t.code==="Escape"&&this.inDom)this.c({esc:!0});else if(t.code==="KeyG"&&t.shiftKey)this.c({esc:!1})}c(t){if(this.inDom)if(t.esc||this.g.className==="o")this.r();else this.g.className="o";else this.a()}r(){this.g.parentNode.removeChild(this.g),this.inDom=!1}a(){this.g=h("div"),this.g.id="g_";var t=h("div");t.id="g";for(let o=0;o<this.col;o++){var e=h("div");t.appendChild(e)}this.g.appendChild(t),document.body.prepend(this.g),this.inDom=!0}}class d{constructor(){this.eT=k.isMobile?"orientationchange":"resize",this.tick=!1,this.fy=[],i(this,["fn","loop","run"]),this.t=new L({de:40,cb:this.loop}),this.rafr=new a(this.run),c(window,"a",this.eT,this.fn)}add(t){this.fy.push(t)}rm(t){let e=this.fy.findIndex((o)=>o.id===t);if(e!==-1)this.fy.splice(e,1)}fn(t){this.e=t,this.t.run()}loop(){if(!this.tick)this.tick=!0,this.rafr.run()}run(){this.fy.forEach((t)=>t.cb(this.e)),this.rafr.stop(),this.tick=!1}}var U=0;class f{constructor(t){this.cb=t,this.id=U,U++}on(){new d().add({id:this.id,cb:this.cb})}off(){new d().rm(this.id)}}class y{constructor(t){this.cb=t.cb,this.el=F(t,"el")?D.el(t.el)[0]:document,i(this,["run"])}on(){this.l("a")}off(){this.l("r")}l(t){c(this.el,t,"pointermove",this.run)}run(t){this.cb(t.pageX,t.pageY,t)}}class x{constructor(){this.fy=[-1,-1],i(this,["move"]),this.mm=new y({cb:this.move})}move(t,e){this.fy=[t,e]}run(){this.mm.on()}}function X(t){let e=u.cl("p"+(t||""));return e[e.length-1]}class w{constructor(){i(this,["resize","loop"]),this.raf=new a(this.loop),this.p=X,this.c=new x}intro(){}init(){this.loop()}resize(){}run(){new f(this.resize).on(),this.raf.run(),this.c.run()}on(){}off(){}loop(){}}class b{constructor(t){t(()=>{this.cb()})}cb(){let e=_A.e;e.intro(),e.init(),e.run()}}class R{constructor(){this.fx=new FxMutation}out(){let t=_A,e=t.route.new.url,o=t.rgl;t.e.off(),this.fx.out({cb:()=>t.page.update()})}in(){let t=_A,e=t.rgl,o=t.e,s=t.route.new.url;t.page.cj(),t.page.E9(),this.fx.in()}}class A{constructor(){this.inj=!1,i(this,["resize"]),new f(this.resize).on(),this.resize()}resize(){let t=_A.winRatio.wh>1;if(t&&!this.inj)this.a();else if(!t&&this.inj)this.r()}a(){let t=document.body;this.ro=h("div"),this.ro.className="ro_";let e=h("div");e.className="ro",e.innerHTML="Rotate your device",this.ro.appendChild(e),t.prepend(this.ro),this.inj=!0}r(){this.ro.parentNode.removeChild(this.ro),this.inj=!1}}class T{constructor(t){this.d=t;let e=_A;e.win={w:0,h:0},e.config.dim={d:[1440,900],m:[393,856]},i(this,["resize"]),new f(this.resize).on(),this.resize()}resize(){let t=_A,e=innerWidth,o=innerHeight;t.win={w:e,h:o},t.winSemi={w:0.5*e,h:0.5*o},t.winRatio={wh:e/o,hw:o/e},t.isLandscape=1<t.winRatio.wh,t.format=t.isLandscape?"l":"p";let s=t.config.dim[this.d];t.dim={h:s[1],w:s[0]},t.winWSF=e/t.dim.w,t.winHSF=o/t.dim.h}}function $(t){let e=_A,o=e.config.routes[t],s=e.route.new,r=e.route.old;if(e.route.old=s,e.route.new={url:t,page:o},e.is[s.page]=!1,e.is[o]=!0,r.page)e.was[r.page]=!1;e.was[s.page]=!0}class M{constructor(t){let e=_A,o=t[0],s=t[1],r=t[2],n=t[3];if(e.intro=!0,e.mutating=!1,e.page={},this.zh=r,this.isD=o,this.d=o?"d":"m",i(this,["eD"]),new T(this.d),this.d==="m")new A;e.e=new s,this.Xw(),c(document,"a","click",this.eD),new n((l)=>this.intro(l))}Xw(){let t=document.readyState!=="complete";onload=()=>setTimeout(()=>t=!1,0),onpopstate=(e)=>{if(t&&document.readyState==="complete")m(e),e.stopImmediatePropagation();let o=_A;if(!C(o.config.routes))if(o.mutating)this.G9();else o.mutating=!0,this.out(H(location.pathname),"back")}}eD(t){let e=_A,o=t.target,s=!1,r=!1;while(o){let n=o.tagName;if(n==="A"){s=!0;break}if((n==="INPUT"||n==="BUTTON")&&o.type==="submit"){r=!0;break}o=o.parentNode}if(s){let n=o.href,l=new URL(n).protocol;if(!o.hasAttribute("target")&&l!=="mailto:"&&l!=="tel:"){if(m(t),!e.mutating){let E=n.replace(/^.*\/\/[^/]+/,"");if(E===e.route.new.url)return;e.mutating=!0,this.out(E,o)}}}else if(r)m(t)}intro(t){let e=_A,o=e.route.new.url;j({url:o+"?device="+this.d,type:"html",success:(s)=>{let r=JSON.parse(s);e.config.routes=r.routes,e.data=r.data,this.cache=r.cache,this.add(document.body,"afterbegin",r.body),this.fy=u.id("_");let n=o;this.add(this.fy,"beforeend",this.cache[n].html),this.zh=new this.zh,t()}})}out(t,e){$(t);let o=_A;o.target=e,o.Ee=e==="back",o.page.update=()=>{this.in()},this.zh.out()}in(){let t=_A,e=t.route,o=this.cache[e.new.url];if(document.title=o.title,t.target!=="back")this.G9();t.page.cj=()=>{this.add(this.fy,"beforeend",o.html)},t.page.E9=()=>{let s=this.fy.children[0];s.parentNode.removeChild(s)},this.zh.in()}add(t,e,o){t.insertAdjacentHTML(e,o)}G9(){let e=_A.route.new.url;history.pushState({page:e},"",e)}}new g([4,!0]);new M([!1,w,R,b]);})();

//# debugId=6DF4F0A49180847064756E2164756E21
//# sourceMappingURL=m.js.map
