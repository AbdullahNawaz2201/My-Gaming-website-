
const P=[
{n:"Nova X Console",c:"Consoles",p:499,o:549,r:4.9,e:"🕹️",h:"#8b5cf6",t:"NEW",d:"4K 120fps, 1TB NVMe and ray tracing."},
{n:"Pulse Mini Console",c:"Consoles",p:299,o:349,r:4.6,e:"🎮",h:"#22d3ee",d:"Compact, quiet, and ready for couch co-op."},
{n:"Titan Handheld",c:"Consoles",p:649,r:4.8,e:"📱",h:"#f43f5e",t:"HOT",d:"PC power in your hands with an OLED screen."},
{n:"Phantom Pro Controller",c:"Controllers",p:89,o:109,r:4.8,e:"🎮",h:"#f43f5e",t:"-18%",d:"Hall sensor sticks and back paddles."},
{n:"Aero Wireless Pad",c:"Controllers",p:59,r:4.5,e:"🕹️",h:"#22d3ee",d:"Ultra light, 40 hour battery life."},
{n:"Arcade Fight Stick",c:"Controllers",p:129,r:4.7,e:"🎯",h:"#fbbf24",d:"Tournament grade micro switch buttons."},
{n:"Ghost Pro Headset",c:"Headsets",p:119,o:199,r:4.9,e:"🎧",h:"#8b5cf6",t:"-40%",d:"7.1 surround, ANC mic, 60h battery."},
{n:"Echo Studio Headset",c:"Headsets",p:79,r:4.4,e:"🎧",h:"#22d3ee",d:"Crystal clear voice and plush memory foam."},
{n:"Blaze RGB Keyboard",c:"Keyboards",p:139,o:159,r:4.8,e:"⌨️",h:"#f43f5e",t:"RGB",d:"Hot swap mechanical, per key lighting."},
{n:"Stealth 60% Board",c:"Keyboards",p:99,r:4.6,e:"⌨️",h:"#8b5cf6",d:"Tiny footprint, gasket mount, silent switches."},
{n:"Viper Gaming Mouse",c:"Keyboards",p:69,r:4.7,e:"🖱️",h:"#22d3ee",d:"26K DPI sensor at only 58 grams."},
{n:"Eclipse: Open World RPG",c:"Games",p:49,o:69,r:4.9,e:"⚔️",h:"#fbbf24",t:"GOTY",d:"200 hours of story, magic and epic bosses."},
{n:"Velocity GP Racing",c:"Games",p:39,r:4.5,e:"🏎️",h:"#f43f5e",d:"Hyper real racing with full tuning."},
{n:"Void Strike FPS",c:"Games",p:44,r:4.6,e:"🔫",h:"#22d3ee",d:"Fast competitive shooter with ranked play."}];
P.forEach((x,i)=>x.img="assets/img/p"+i+".svg");
const CATS=[["All","✨"],["Consoles","🕹️"],["Controllers","🎮"],["Headsets","🎧"],["Keyboards","⌨️"],["Games","💿"]];
const S={cat:"All",q:"",max:700,sort:"f"},cart={},wish=new Set();
const $=i=>document.getElementById(i),m=n=>"$"+n.toLocaleString("en-US");
$("mq").innerHTML=Array(2).fill("<span>FREE SHIPPING $100+</span><span>NEW DROPS WEEKLY</span><span>2 YEAR WARRANTY</span><span>30 DAY RETURNS</span><span>PRO GRADE GEAR</span>").join("").repeat(2);
$("catGrid").innerHTML=CATS.map(c=>`<button class="cat" data-c="${c[0]}"><em>${c[1]}</em>${c[0]}</button>`).join("");
$("pills").innerHTML=CATS.map(c=>`<button class="pill" data-c="${c[0]}">${c[0]}</button>`).join("");
function toast(t){const e=$("toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),2200)}
function render(){
 document.querySelectorAll(".pill").forEach(b=>b.classList.toggle("on",b.dataset.c===S.cat));
 let l=P.map((x,i)=>({...x,i})).filter(x=>(S.cat==="All"||x.c===S.cat)&&x.p<=S.max&&x.n.toLowerCase().includes(S.q));
 if(S.sort==="pa")l.sort((a,b)=>a.p-b.p);if(S.sort==="pd")l.sort((a,b)=>b.p-a.p);if(S.sort==="r")l.sort((a,b)=>b.r-a.r);
 $("grid").innerHTML=l.length?l.map((x,k)=>`<article class="card" style="--h:${x.h};animation-delay:${k*60}ms">
 ${x.t?`<span class="tag">${x.t}</span>`:""}<button class="heart ${wish.has(x.i)?"on":""}" data-w="${x.i}" aria-label="Wishlist">${wish.has(x.i)?"♥":"♡"}</button>
 <div class="art"><img src="${x.img}" alt="${x.n}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${x.e}'}))"></div><div class="info"><small>${x.c}</small><h3>${x.n}</h3><div class="star">${"★".repeat(Math.round(x.r))} <span style="color:var(--mu)">${x.r}</span></div>
 <div class="row"><div class="price">${m(x.p)}${x.o?`<s>${m(x.o)}</s>`:""}</div><button class="add" data-a="${x.i}">Add +</button></div><button class="qv" data-v="${x.i}">Quick view</button></div></article>`).join(""):`<div class="empty">😕 No products match. Try another filter.</div>`;
}
document.addEventListener("click",e=>{
 const t=e.target.closest("[data-c],[data-a],[data-w],[data-v],[data-q],[data-r],a[href^='#']");if(!t)return;
 if(t.dataset.c){S.cat=t.dataset.c;render();if(t.classList.contains("cat"))go("#store")}
 else if(t.dataset.a!==undefined)add(+t.dataset.a);
 else if(t.dataset.w!==undefined){const i=+t.dataset.w;wish.has(i)?wish.delete(i):wish.add(i);toast(wish.has(i)?"Added to wishlist ♥":"Removed from wishlist");render()}
 else if(t.dataset.v!==undefined)quick(+t.dataset.v);
 else if(t.dataset.q){chg(+t.dataset.q,+t.dataset.d)}
 else if(t.dataset.r){delete cart[t.dataset.r];drawCart()}
 else if(t.tagName==="A"){e.preventDefault();go(t.getAttribute("href"))}
});
function go(h){const o=$("ov");o.classList.remove("go");void o.offsetWidth;o.classList.add("go");setTimeout(()=>{document.querySelector(h).scrollIntoView({behavior:"auto"})},430);setTimeout(()=>o.classList.remove("go"),1100)}
$("q").oninput=e=>{S.q=e.target.value.trim().toLowerCase();render()};
$("sort").onchange=e=>{S.sort=e.target.value;render()};
$("rg").oninput=e=>{S.max=+e.target.value;$("rv").textContent=S.max;render()};
function add(i,n=1){cart[i]=(cart[i]||0)+n;drawCart();toast(P[i].n+" added to cart 🛒");const b=$("cartBtn");b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")}
function chg(i,d){cart[i]+=d;if(cart[i]<=0)delete cart[i];drawCart()}
const total=()=>Object.entries(cart).reduce((s,[i,q])=>s+P[i].p*q,0);
function drawCart(){
 const k=Object.keys(cart);$("cnt").textContent=k.reduce((s,i)=>s+cart[i],0);$("tot").textContent=m(total());
 $("items").innerHTML=k.length?k.map(i=>`<div class="it"><em>${P[i].e}</em><div><h4>${P[i].n}</h4><small>${m(P[i].p)}</small></div><div class="q"><button data-q="${i}" data-d="-1">−</button><b>${cart[i]}</b><button data-q="${i}" data-d="1">+</button></div><button class="x" data-r="${i}" aria-label="Remove">🗑</button></div>`).join(""):`<div class="empty">Your cart is empty 🎮</div>`;
}
const show=(id)=>{$(id).classList.add("on");$("back").classList.add("on")};
function hide(){["drawer","qvm","com"].forEach(i=>$(i).classList.remove("on"));$("back").classList.remove("on")}
$("cartBtn").onclick=()=>show("drawer");$("cx").onclick=hide;$("back").onclick=hide;
document.addEventListener("keydown",e=>{if(e.key==="Escape")hide()});
function quick(i){const x=P[i];$("qvm").innerHTML=`<img src="${x.img}" alt="" style="width:100%;border-radius:14px;margin-bottom:12px"><small style="color:var(--c)">${x.c}</small><h2 style="margin:4px 0 8px;font-size:22px">${x.n}</h2><p style="color:var(--mu)">${x.d}</p><div class="row"><div class="price">${m(x.p)}</div><span class="star">${"★".repeat(Math.round(x.r))} ${x.r}</span></div><button class="btn" style="width:100%;margin-top:18px" id="qa">Add to cart</button>`;show("qvm");$("qa").onclick=()=>{add(i);hide()}}
$("dealBtn").onclick=()=>{add(6);show("drawer")};
$("co").onclick=()=>{
 if(!Object.keys(cart).length){toast("Add something first 🛒");return}
 $("com").innerHTML=`<h2 style="font-size:22px">Checkout</h2><form id="cf" novalidate>
 <label>Full name<input id="fn" autocomplete="name"></label><div class="err" id="e1"></div>
 <label>Email<input id="em" type="email" autocomplete="email"></label><div class="err" id="e2"></div>
 <label>Phone<input id="ph" type="tel" autocomplete="tel" placeholder="03001234567"></label><div class="err" id="e3"></div>
 <label>Address<input id="ad" autocomplete="street-address"></label><div class="err" id="e4"></div>
 <label>Payment<select><option>Cash on delivery</option><option>Credit / Debit card</option><option>Bank transfer</option></select></label>
 <div class="tot"><span>Total</span><span>${m(total())}</span></div><button class="btn" style="width:100%" type="submit">Place order</button></form>`;
 hide();setTimeout(()=>show("com"),50);
 $("cf").onsubmit=ev=>{ev.preventDefault();
  const R=[["fn",v=>v.trim().length>=3,"Enter your full name (3+ letters)"],["em",v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),"Enter a valid email"],["ph",v=>/^\+?\d{10,14}$/.test(v.replace(/[\s-]/g,"")),"Enter a valid phone (10 to 14 digits)"],["ad",v=>v.trim().length>=8,"Enter a full address (8+ characters)"]];
  let ok=true;R.forEach((r,i)=>{const f=$(r[0]),g=r[1](f.value);$("e"+(i+1)).textContent=g?"":r[2];f.classList.remove("bad");if(!g){ok=false;void f.offsetWidth;f.classList.add("bad")}});
  if(!ok)return;
  const id="NX"+Math.floor(100000+Math.random()*900000);
  $("com").innerHTML=`<div class="big">🎉</div><h2 style="text-align:center;font-size:22px">Order confirmed!</h2><p style="text-align:center;color:var(--mu);margin:10px 0 18px">Thanks ${$("fn").value.trim().split(" ")[0]}! Your order <b style="color:var(--c)">${id}</b> is on its way.</p><button class="btn" style="width:100%" id="dn">Continue shopping</button>`;
  for(const k in cart)delete cart[k];drawCart();$("dn").onclick=hide}
};
$("nl").onsubmit=e=>{e.preventDefault();const f=$("ne"),g=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value);$("nerr").textContent=g?"":"Please enter a valid email address.";f.classList.toggle("bad",!g);if(g){toast("Welcome to the squad! 🎮");f.value=""}};
// tilt
const grid=$("grid");
grid.addEventListener("pointermove",e=>{const c=e.target.closest(".card");if(!c||e.pointerType==="touch")return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty("--ry",(x-.5)*18+"deg");c.style.setProperty("--rx",(.5-y)*18+"deg");c.style.setProperty("--mx",x*100+"%");c.style.setProperty("--my",y*100+"%")});
grid.addEventListener("pointerout",e=>{const c=e.target.closest(".card");if(c){c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")}});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("v");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));
// timer
const end=Date.now()+1000*60*60*9+1000*60*24;
setInterval(()=>{let s=Math.max(0,Math.floor((end-Date.now())/1000));const z=n=>String(n).padStart(2,"0");$("th").textContent=z(Math.floor(s/3600));$("tm").textContent=z(Math.floor(s%3600/60));$("ts").textContent=z(s%60)},1000);
render();drawCart();

// ===== EXTRA FX =====
window.addEventListener("load",()=>setTimeout(()=>$("pre").classList.add("off"),1300));
// progress
addEventListener("scroll",()=>{const h=document.documentElement;$("prog").style.transform=`scaleX(${h.scrollTop/(h.scrollHeight-h.clientHeight||1)})`},{passive:true});
// cursor glow + hero parallax + magnetic buttons
const cur=$("cur");
addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;cur.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;cur.style.opacity=1;
 const st=document.querySelector(".stage");if(st&&e.clientY<innerHeight){st.style.transform=`rotateY(${(e.clientX/innerWidth-.5)*30}deg) rotateX(${(.5-e.clientY/innerHeight)*20}deg)`}
 const b=e.target.closest&&e.target.closest(".btn");if(b){const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.2}px ${(e.clientY-r.top-r.height/2)*.3}px`}});
document.addEventListener("pointerout",e=>{const b=e.target.closest&&e.target.closest(".btn");if(b)b.style.translate=""});
// counters
const co2=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co2.unobserve(e.target);const el=e.target,n=+el.dataset.n,d=+el.dataset.d||0,t0=performance.now();
 (function f(t){const p=Math.min(1,(t-t0)/1800),v=n*(1-Math.pow(1-p,3));el.textContent=v.toFixed(d)+(p<1?"":el.dataset.s);if(p<1)requestAnimationFrame(f)})(t0)}));
document.querySelectorAll("[data-n]").forEach(e=>co2.observe(e));
// particles
(()=>{const c=$("fx"),x=c.getContext("2d");let W,H,ps=[],m={x:-999,y:-999};
 function rs(){W=c.width=innerWidth;H=c.height=innerHeight;ps=Array.from({length:Math.min(90,W/14|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:Math.random()*2+.5,c:["#8b5cf6","#22d3ee","#f43f5e"][Math.random()*3|0]}))}
 rs();addEventListener("resize",rs);addEventListener("pointermove",e=>{m.x=e.clientX;m.y=e.clientY});
 (function L(){x.clearRect(0,0,W,H);for(const p of ps){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
  const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<120){p.x+=dx/d*1.6;p.y+=dy/d*1.6}
  x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fillStyle=p.c;x.shadowBlur=12;x.shadowColor=p.c;x.fill()}
  x.shadowBlur=0;for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],b=ps[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<110){x.strokeStyle=`rgba(139,92,246,${.22*(1-d/110)})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
  requestAnimationFrame(L)})()})();
