(() => {
const C = window.SITE_CONFIG || {};
const $ = id => document.getElementById(id);
const defaults = {
 recipientName:"Her Name", senderName:"Mohand",
 memories:[
  {title:"A Beautiful Beginning",text:"فيه لحظات صغيرة بتفضل جوانا مهما الوقت عدى.",icon:"✦",secret:"أجمل الحكايات ساعات بتبدأ من غير ترتيب."},
  {title:"Your Little Magic",text:"تفصيلة بسيطة منك ممكن تحلّي يوم كامل.",icon:"♡",secret:"خلي ضحكتك دايمًا قريبة… دي أمنية صغيرة."},
  {title:"A Wish at 11:11",text:"أمنية حلوة لأيام أحلى جاية.",icon:"☾",secret:"يا رب كل اللي قلبك يتمناه يوصلك في وقته."}
 ],
 finalMessage:"I made this little universe with all my heart.\nI spent so much time creating every detail, every animation, every little surprise...\nNot because I had to, but because you deserve every beautiful thing in this world.\n\nإنتِ تستاهلي كل حاجة حلوة."
};
const cfg = {...defaults,...C};
const safe = (v,f="") => typeof v==="string" && v.trim() ? v : f;
$("recipient").textContent = safe(cfg.recipientName,defaults.recipientName);
$("subtitle").textContent = safe(cfg.subtitle,"This little universe was made just for you...");
$("introLine").textContent = safe(cfg.introLine,"I have something special waiting for you.");
$("letterTitle").textContent = safe(cfg.letterTitle,"A little letter, from my heart");
$("letterText").textContent = safe(cfg.letter,"");
$("finalMessage").textContent = safe(cfg.finalMessage,defaults.finalMessage);
$("signature").textContent = safe(cfg.signature,cfg.senderName);
$("copyName").textContent = safe(cfg.senderName,"Mohand");
const now = new Date();
$("today").textContent = now.toLocaleDateString(undefined,{day:"numeric",month:"long",year:"numeric"});
$("year").textContent = now.getFullYear();

const stages=["intro","envelopeStage","letterStage","memoriesStage","giftsStage","mediaStage","finalStage"];
function go(id){stages.forEach(s=>$(s).classList.toggle("hidden",s!==id));window.scrollTo({top:0,behavior:"smooth"});burst(12)}
$("begin").onclick=()=>go("envelopeStage");
function openEnvelope(){const e=$("envelope");if(e.classList.contains("open"))return;e.classList.add("open");setTimeout(()=>$("readLetter").classList.remove("hidden"),750);chime([523,659,784])}
$("envelopeWrap").onclick=openEnvelope;$("envelopeWrap").onkeydown=e=>{if(e.key==="Enter"||e.key===" ")openEnvelope()};
$("readLetter").onclick=()=>go("letterStage");
$("toMemories").onclick=()=>go("memoriesStage");
$("toGifts").onclick=()=>go("giftsStage");
$("toMedia").onclick=()=>go("mediaStage");
$("toFinal").onclick=()=>go("finalStage");
$("replay").onclick=()=>{$("envelope").classList.remove("open");$("readLetter").classList.add("hidden");document.querySelectorAll(".memory").forEach(x=>x.classList.remove("revealed"));go("intro")};

const memoryList=Array.isArray(cfg.memories)&&cfg.memories.length?cfg.memories:defaults.memories;
memoryList.forEach((m,i)=>{const el=document.createElement("button");el.className="glass memory";el.innerHTML=`<div class="ico"></div><h3></h3><p></p><div class="secret"></div>`;el.querySelector(".ico").textContent=m.icon||"♡";el.querySelector("h3").textContent=m.title||"A little memory";el.querySelector("p").textContent=m.text||"";el.querySelector(".secret").textContent=m.secret||"A little wish for you ♡";el.onclick=()=>{el.classList.toggle("revealed");chime([659,784,988]);burst(8)};$("memories").appendChild(el)});

const surprises=[
 ["A tiny wish","يا رب كل يوم في حياتك يكون فيه سبب جديد يخليكي تبتسمي. وتفضلي دايمًا أقرب لكل حاجة بتحلمي بيها. ♡"],
 ["A little reminder","لو يومك كان طويل، افتكري إنك تستاهلي الراحة والفرحة والكلام الحلو… مش في يوم واحد بس، كل يوم."],
 ["A secret note","دي مش مجرد هدية… دي طريقة صغيرة أقولك بيها إن وجودك يستاهل يتعمل عشانه حاجة مختلفة."]
];
document.querySelectorAll(".gift").forEach(b=>b.onclick=()=>{const [t,p]=surprises[Number(b.dataset.gift)]||surprises[0];$("modalTitle").textContent=t;$("modalText").textContent=p;$("modal").classList.remove("hidden");chime([523,659,880]);burst(20)});
$("closeModal").onclick=()=>$("modal").classList.add("hidden");
$("modal").onclick=e=>{if(e.target===$("modal"))$("modal").classList.add("hidden")};

const photos=Array.isArray(cfg.photos)?cfg.photos.filter(Boolean):[];
let photoCount=0;
photos.forEach(src=>{const img=document.createElement("img");img.src=src;img.alt="A shared memory";img.onerror=()=>img.remove();$("gallery").appendChild(img);photoCount++});
if(!photoCount){$("gallery").innerHTML='<div class="glass memory"><div class="ico">📷</div><h3>Your first photo goes here</h3><p>Add images in the assets folder and list them in config.js.</p></div>'}
if(cfg.video){$("video").src=cfg.video;$("video").classList.remove("hidden");$("video").onerror=()=>{$("video").classList.add("hidden")}}
if(cfg.music){$("music").src=cfg.music;$("music").onerror=()=>{$("musicWrap").classList.add("hidden")}}else $("musicWrap").classList.add("hidden");

let soundEnabled=false,ctx;
function chime(notes=[587,740,880]){if(!soundEnabled)return;try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();notes.forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+i*.12;o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.035,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+.28);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.3)})}catch(e){}}
$("sound").onclick=()=>{soundEnabled=!soundEnabled;$("sound").textContent=soundEnabled?"♫":"♪";if(soundEnabled){if(ctx&&ctx.state==="suspended")ctx.resume();chime()}};
function burst(n=8){for(let i=0;i<n;i++){const p=document.createElement("span");p.className="particle";p.textContent=["♥","♡","✦","✧"][Math.floor(Math.random()*4)];p.style.left=Math.random()*100+"%";p.style.fontSize=(13+Math.random()*22)+"px";p.style.setProperty("--dx",(Math.random()*160-80)+"px");p.style.animationDuration=(5+Math.random()*5)+"s";$("particles").appendChild(p);setTimeout(()=>p.remove(),10500)}}
setInterval(()=>{if(Math.random()>.2)burst(1)},900);
})();