/* NEXUS NEXT-LEVEL add-on: realistic images, card FX, full 3D animated background */
(()=>{
/* 1) swap in real-style product renders (original svgs stay untouched) */
if(typeof P!=="undefined"){P.forEach((x,i)=>x.img="assets/real/r"+i+".svg");if(typeof render==="function")render()}
const grid=document.getElementById("grid");
const deco=()=>grid.querySelectorAll(".card:not([data-d])").forEach(c=>{c.dataset.d=1;const h=document.createElement("i");h.className="holo";c.appendChild(h)});
new MutationObserver(deco).observe(grid,{childList:true});deco();
/* 2) 3D tilt for category / feature / deal cards */
document.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const t=e.target.closest&&e.target.closest(".cat,.feat>div,.deal");if(!t)return;const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(800px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(14px)`});
document.addEventListener("pointerout",e=>{const t=e.target.closest&&e.target.closest(".cat,.feat>div,.deal");if(t)t.style.transform=""});
/* 3) full-screen 3D animated background (canvas 3D engine, no video file needed) */
const c=document.createElement("canvas");c.id="bg3d";document.body.prepend(c);
const v=document.createElement("div");v.id="bgv";document.body.prepend(v);
const x=c.getContext("2d");let W,H,mx=0,my=0,t=0;
const rs=()=>{const d=Math.min(devicePixelRatio||1,1.5);W=c.width=innerWidth*d;H=c.height=innerHeight*d};rs();addEventListener("resize",rs);
addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
const COL=["#8b5cf6","#22d3ee","#f43f5e","#fbbf24"],F=700,Z=2600;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* floating wireframe solids */
const mk=()=>({x:rnd(-900,900),y:rnd(-500,500),z:rnd(200,Z),s:rnd(30,90),rx:rnd(0,6),ry:rnd(0,6),vx:rnd(-.02,.02),vy:rnd(-.02,.02),c:COL[Math.random()*4|0],k:Math.random()*3|0});
const objs=Array.from({length:Math.min(34,innerWidth/38|0)},mk);
const stars=Array.from({length:240},()=>({x:rnd(-1500,1500),y:rnd(-900,900),z:rnd(1,Z)}));
const cubeV=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],cubeE=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
const pyrV=[[0,-1.3,0],[-1,1,-1],[1,1,-1],[1,1,1],[-1,1,1]],pyrE=[[0,1],[0,2],[0,3],[0,4],[1,2],[2,3],[3,4],[4,1]];
const octV=[[0,-1.4,0],[0,1.4,0],[-1,0,-1],[1,0,-1],[1,0,1],[-1,0,1]],octE=[[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,3],[3,4],[4,5],[5,2]];
const SH=[[cubeV,cubeE],[pyrV,pyrE],[octV,octE]];
const P3=(X,Y,Z)=>{const s=F/Z;return[W/2+(X-mx*260)*s*(W/1400>1?1:W/1400+.3)+0,H/2+(Y-my*160)*s,s]};
function rot(p,a,b){let[X,Y,Z]=p;let c1=Math.cos(a),s1=Math.sin(a);[Y,Z]=[Y*c1-Z*s1,Y*s1+Z*c1];c1=Math.cos(b);s1=Math.sin(b);[X,Z]=[X*c1+Z*s1,-X*s1+Z*c1];return[X,Y,Z]}
function frame(){t+=1;x.clearRect(0,0,W,H);const sp=7+Math.abs(mx)*8;
 /* neon perspective floor + ceiling grid moving toward the camera */
 x.lineWidth=1.2;
 for(const side of[1,-1]){
  for(let i=-14;i<=14;i++){const X=i*140;const a=P3(X,side*420,60),b=P3(X,side*420,Z);x.strokeStyle=`rgba(139,92,246,${.28-Math.abs(i)*.012})`;x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}
  for(let k=0;k<22;k++){const z=((k*120-(t*sp)%120)+Z)%Z+60;const a=P3(-2000,side*420,z),b=P3(2000,side*420,z);const al=Math.max(0,.4*(1-z/Z));x.strokeStyle=`rgba(34,211,238,${al})`;x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}}
 /* warp stars streaking */
 for(const s of stars){s.z-=sp*2.2;if(s.z<20){s.x=rnd(-1500,1500);s.y=rnd(-900,900);s.z=Z}const a=P3(s.x,s.y,s.z),b=P3(s.x,s.y,s.z+sp*5);const al=1-s.z/Z;x.strokeStyle=`rgba(255,255,255,${al*.8})`;x.lineWidth=Math.max(.6,a[2]*1.6);x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}
 /* rotating glowing solids, sorted far to near */
 objs.sort((a,b)=>b.z-a.z);
 for(const o of objs){o.z-=sp*.55;o.rx+=o.vx;o.ry+=o.vy;if(o.z<60)Object.assign(o,mk(),{z:Z});
  const[V,E]=SH[o.k],pts=V.map(p=>{const r=rot([p[0]*o.s,p[1]*o.s,p[2]*o.s],o.rx,o.ry);return P3(o.x+r[0],o.y+r[1],o.z+r[2])});
  const al=Math.min(1,(1-o.z/Z)*1.8);x.strokeStyle=o.c;x.globalAlpha=al;x.shadowColor=o.c;x.shadowBlur=14;x.lineWidth=Math.max(1,pts[0][2]*2.2);x.beginPath();for(const[a,b]of E){x.moveTo(pts[a][0],pts[a][1]);x.lineTo(pts[b][0],pts[b][1])}x.stroke();x.shadowBlur=0;x.globalAlpha=1}
 /* pulsing horizon light + sweeping beams */
 const g=x.createRadialGradient(W/2,H*.5,0,W/2,H*.5,H*.7);g.addColorStop(0,`rgba(139,92,246,${.16+.05*Math.sin(t/40)})`);g.addColorStop(1,"transparent");x.fillStyle=g;x.fillRect(0,0,W,H);
 for(let b=0;b<3;b++){const a=Math.sin(t/120+b*2)*.5;x.save();x.translate(W*(.2+.3*b),0);x.rotate(a*.5);const lg=x.createLinearGradient(0,0,0,H);lg.addColorStop(0,COL[b]+"40");lg.addColorStop(1,"transparent");x.fillStyle=lg;x.fillRect(-18,0,36,H);x.restore()}
 requestAnimationFrame(frame)}
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)frame();else frame();
})();
