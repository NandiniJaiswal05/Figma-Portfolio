const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const canvas=$('#canvas'), toast=$('#toast');
const names={cover:'Cover — Nandini',about:'About / Engineering DNA',projects:'Projects — 03',placeleet:'PlaceLeet — Deep Dive',systems:'Systems Thinking',research:'MapMaker Index',journey:'Journey',contact:'Contact'};
function toastMsg(t){toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1600)}
function go(id){const el=$('#'+id);if(!el)return;el.scrollIntoView({behavior:'smooth',block:'start'});select(id)}
function select(id){$$('.layer').forEach(x=>x.classList.toggle('selected',x.dataset.target===id));$('#selectedName').textContent=names[id]||id;const el=$('#'+id);if(el){$('#pw').value=el.dataset.w||el.offsetWidth;$('#ph').value=el.dataset.h||el.offsetHeight}}
$$('.layer[data-target]').forEach(x=>x.onclick=()=>go(x.dataset.target));
$$('[data-go]').forEach(x=>x.onclick=()=>go(x.dataset.go));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)select(e.target.id)}),{root:canvas,threshold:.25});
$$('.frame').forEach(x=>io.observe(x));
$('#layerSearch').oninput=e=>$$('.layer').forEach(x=>x.style.display=x.textContent.toLowerCase().includes(e.target.value.toLowerCase())?'block':'none');

let zoom=1;
function setZoom(z){zoom=Math.max(.65,Math.min(1.35,z));canvas.style.zoom=zoom;$('#zoomValue').textContent=Math.round(zoom*100)+'%'}
$('#zoomPlus').onclick=()=>setZoom(zoom+.1);$('#zoomMinus').onclick=()=>setZoom(zoom-.1);$('#fitBtn').onclick=()=>{setZoom(1);go('cover')};
$('#toggleGrid').onclick=()=>$('#grid').classList.toggle('hidden');
$$('.tool').forEach(t=>t.onclick=()=>{if(t.dataset.tool){$$('.tool').forEach(x=>x.classList.remove('active'));t.classList.add('active');toastMsg(t.title||t.dataset.tool)}});
$('#presentBtn').onclick=()=>{document.body.classList.toggle('present');toastMsg(document.body.classList.contains('present')?'Presentation mode':'Editor mode')};
$('#homeBtn').onclick=()=>go('cover');$('#shareBtn').onclick=()=>{navigator.clipboard?.writeText(location.href);toastMsg('Portfolio link copied')};
$('#resumeAction').onclick=()=>toastMsg('Résumé link ready — add your hosted PDF URL here');
$('#copyEmail').onclick=()=>{navigator.clipboard?.writeText('nandinijaiswal783@gmail.com');toastMsg('Email copied')};
$('#exportBtn').onclick=()=>toastMsg('Frame exported conceptually — connect html2canvas for PNG export');

const projects={
 placeleet:{ey:'PROJECT 01 / PLACELEET',title:'PlaceLeet — reasoning-first coding practice',text:'An ongoing end-to-end coding platform combining company-specific problems with a scratchpad + IDE workspace, asynchronous multi-language translation, secure execution and gated smart assistance.',tags:['Spring Boot','React','REST APIs','LLM','Secure execution','C++ / Java / Python']},
 manovani:{ey:'PROJECT 02 / MANOVANI',title:'ManoVani — multimodal learning pipeline',text:'A multimodal learning pipeline integrating text, audio and visual modalities from the 114GB DAIC-WOZ dataset, with vocal biomarkers and structured feature extraction.',tags:['NLP','NLU','Ensemble Learning','COVAREP','Feature Handling']},
 mapmaker:{ey:'PROJECT 03 / MAPMAKER INDEX',title:'MapMaker Index — evaluating agent behaviour',text:'A research framework using reproducible PPO environments and structured behavioural metrics to diagnose instability and guide architecture decisions.',tags:['Reinforcement Learning','PPO','Evaluation','Reproducibility']}
};
$$('.project-card').forEach(card=>card.onclick=()=>{const d=projects[card.dataset.project];$('#modalEyebrow').textContent=d.ey;$('#modalTitle').textContent=d.title;$('#modalText').textContent=d.text;$('#modalGrid').innerHTML=d.tags.map(x=>`<span>${x}</span>`).join('');$('#modalGo').onclick=()=>{$('#projectOverlay').classList.add('hidden');go(card.dataset.project)};$('#projectOverlay').classList.remove('hidden')});
$$('[data-close]').forEach(x=>x.onclick=()=>x.closest('.overlay').classList.add('hidden'));
$('#openPlayground').onclick=()=>$('#playgroundOverlay').classList.remove('hidden');
$('#openPrototype').onclick=()=>{document.body.classList.add('present');go('cover');toastMsg('Prototype presentation started')};
$('#commentMode').onclick=()=>toastMsg('Comment mode — prototype interaction');
$$('.component-jump').forEach(x=>x.onclick=()=>{const c=x.dataset.component;toastMsg(`Component selected: ${c}`);go('projects')});

function openCmd(){ $('#commandOverlay').classList.remove('hidden');$('#commandInput').value='';setTimeout(()=>$('#commandInput').focus(),20)}
$('#cmdBtn').onclick=openCmd;$('#commandOverlay').onclick=e=>{if(e.target===e.currentTarget)e.currentTarget.classList.add('hidden')};
function filterCommands(){const q=$('#commandInput').value.toLowerCase();$$('#commandResults button').forEach(b=>b.style.display=b.textContent.toLowerCase().includes(q)?'flex':'none')}
$('#commandInput').oninput=filterCommands;
$$('[data-command]').forEach(b=>b.onclick=()=>{$('#commandOverlay').classList.add('hidden');go(b.dataset.command)});
document.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCmd()}
 if(e.key==='Escape'){$$('.overlay').forEach(x=>x.classList.add('hidden'));document.body.classList.remove('present')}
 if(document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){
   const m={'1':'cover','2':'projects','3':'placeleet','4':'systems','5':'research','6':'contact'};
   if(m[e.key])go(m[e.key]);
   const tools={'v':'move','f':'frame','r':'rectangle','o':'ellipse','l':'line','p':'pen','t':'text'};
   if(tools[e.key.toLowerCase()]){const x=document.querySelector(`[data-tool="${tools[e.key.toLowerCase()]}"]`);x?.click()}
 }
});
$('#runCode').onclick=()=>{$('#runnerOutput').textContent='✓ Baseline submitted. Hidden tests would execute in an isolated runner.';toastMsg('Submission queued')};
$('#hintBtn').onclick=()=>{$('#runnerOutput').textContent='Hint unlocked: think about constant-time lookup with a map.';toastMsg('Hint generated')};
$('#scratchpad').oninput=()=>localStorage.setItem('nandini-scratch', $('#scratchpad').value);
$('#codeArea').oninput=()=>localStorage.setItem('nandini-code',$('#codeArea').value);
if(localStorage.getItem('nandini-scratch'))$('#scratchpad').value=localStorage.getItem('nandini-scratch');
if(localStorage.getItem('nandini-code'))$('#codeArea').value=localStorage.getItem('nandini-code');
window.addEventListener('load',()=>{select('cover');toastMsg('Welcome to the workspace')});
