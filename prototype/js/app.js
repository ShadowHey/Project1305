/* CareLens prototype app. Plain JS, no build step, works from file:// and any static host. */
(function(){
"use strict";
var D=window.CL, P=D.patients;
var $=function(s,r){return (r||document).querySelector(s)};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};

/* ---------- state (browser storage is a convenience only; app works without it) ---------- */
var KEY="carelens-proto-v1";
var S={mode:"earlier",hints:true,prog:{earlier:{},carelens:{}},ui:{}};
try{var saved=JSON.parse(localStorage.getItem(KEY)||"null"); if(saved&&saved.prog){S=Object.assign(S,saved);}}catch(e){}
var TOUR=null; /* guided tour state, in memory only: {id, s: step index, i: item index} */
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function prog(mode,pid){var m=S.prog[mode]; if(!m[pid])m[pid]={done:[],cur:0,forms:[],nba:{},confirm:{},structured:false,signed:false,called:false}; return m[pid];}

/* ---------- time model ---------- */
function eSteps(pid){return P[pid].earlier.steps}
function cSteps(pid){return P[pid].carelens.steps}
function stepCost(s){return s.type==="docs"?s.forms.reduce(function(a,f){return a+f.min},0):s.cost}
function totalE(pid){return eSteps(pid).reduce(function(a,s){return a+stepCost(s)},0)}
function totalC(pid){return cSteps(pid).reduce(function(a,s){return a+s.cost},0)}
function spentE(pid){var p=prog("earlier",pid),st=eSteps(pid),t=0;
  st.forEach(function(s,i){ if(s.type==="docs"){ s.forms.forEach(function(f,j){ if(p.forms.indexOf(j)>=0)t+=f.min }) } else if(p.done.indexOf(i)>=0) t+=s.cost });
  return t;}
function spentC(pid){var p=prog("carelens",pid);return cSteps(pid).reduce(function(a,s,i){return a+(p.done.indexOf(i)>=0?s.cost:0)},0)}
function logins(pid){return eSteps(pid).filter(function(s){return /\(#\d\)/.test(s.login||"")}).length}
function breakdownE(pid){var st=eSteps(pid),r={prep:0,out:0,talk:0,doc:0};st.forEach(function(s){ if(s.type==="call")r.talk+=s.cost; else if(s.type==="docs")r.doc+=stepCost(s); else if(s.sys==="phone")r.out+=s.cost; else r.prep+=s.cost});return r}
function breakdownC(pid){var st=cSteps(pid),r={prep:0,out:0,talk:0,doc:0};st.forEach(function(s){r[{pre:"prep",queue:"prep",m360:"prep",prep:"out",call:"talk",note:"doc"}[s.id]]+=s.cost});return r}

/* ---------- who does what: ledger, gates, tags ---------- */
var K=D.kinds, KO=D.kindOrder;
function ledgerOf(id,sid){return (P[id].carelens.ledger||{})[sid]||[]}
function allLedger(id){return cSteps(id).reduce(function(a,s){return a.concat(ledgerOf(id,s.id).map(function(it){return Object.assign({step:s.id},it)}))},[])}
function stepIdx(id,sid){return cSteps(id).map(function(s){return s.id}).indexOf(sid)}
function nbaDecided(v){return v==="ok"||(typeof v==="string"&&v.indexOf("no:")===0)}
function gateOk(id,g){
  if(!g)return null; var pr=prog("carelens",id);
  return g.split(",").every(function(x){var p=x.split(":");
    if(p[0]==="conf")return !!pr.confirm[p[1]];
    if(p[0]==="nba")return p[1]==="all"?P[id].carelens.m360.nbas.every(function(n,i){return nbaDecided(pr.nba[i])}):nbaDecided(pr.nba[p[1]]);
    if(p[0]==="step")return pr.done.indexOf(stepIdx(id,p[1]))>=0;
    if(x==="called")return pr.done.indexOf(stepIdx(id,"call"))>=0;
    if(x==="sign")return !!pr.signed;
    return false;});
}
function ktag(k,full){var d=K[k];return '<span class="ai-tag k-'+k+'" title="'+esc(d.label+": "+d.def)+'">'+d.icon+' '+esc(full?d.label:d.short)+'</span>'}
/* Tags for every kind that the current member's ledger attaches to an on-screen anchor */
var CUR=null;
function T(at){if(!CUR)return "";var ks=[];allLedger(CUR).forEach(function(it){if(it.at===at&&ks.indexOf(it.k)<0)ks.push(it.k)});
  ks.sort(function(a,b){return KO.indexOf(a)-KO.indexOf(b)});return ks.length?'<span class="tags">'+ks.map(function(k){return ktag(k)}).join("")+'</span>':""}
function A(at){return ' data-ai="'+at+'"'}
function kindCounts(items){var c={};KO.forEach(function(k){c[k]=0});items.forEach(function(it){c[it.k]++});return c}
function countLine(items,id){var c=kindCounts(items), rv=items.filter(function(it){return it.k==="review"}), ok=rv.filter(function(it){return gateOk(id,it.gate)}).length;
  return KO.filter(function(k){return c[k]}).map(function(k){return '<span class="kc k-'+k+'">'+K[k].icon+' '+c[k]+' '+esc(K[k].count)+(k==="review"?' ('+ok+'/'+rv.length+' done)':'')+'</span>'}).join("")}
function legend(){return '<div class="klegend">'+KO.map(function(k){return '<div>'+ktag(k,true)+'<span>'+esc(K[k].def)+'</span></div>'}).join("")+'</div>'}
function ledgerPanel(id,sid){
  var items=ledgerOf(id,sid); if(!items.length)return "";
  var groups=KO.map(function(k){var g=items.map(function(it,i){return [it,i]}).filter(function(x){return x[0].k===k});if(!g.length)return "";
    return '<div class="lg-g"><div class="lg-h k-'+k+'">'+K[k].icon+' '+esc(K[k].label)+' <b>'+g.length+'</b></div>'+g.map(function(x){var it=x[0],ok=gateOk(id,it.gate),on=TOUR&&TOUR.id===id&&cSteps(id)[TOUR.s].id===sid&&TOUR.i===x[1];
      return '<button class="lg-i k-'+k+(on?' on':'')+'" data-spot="'+esc(it.at)+'"><span class="lg-t">'+esc(it.t)+'</span><span class="lg-d">'+esc(it.d)+'</span><span class="lg-m"><span class="src">'+esc(it.src)+'</span>'
        +(it.k==="review"?(ok?'<span class="gate ok">✓ Maria confirmed</span>':'<span class="gate">Waiting for Maria</span>'):'')+'</span></button>'}).join("")+'</div>'}).join("");
  return '<div class="ledger"><div class="lg-top"><h4>Who does what on this step</h4><span class="mu" style="font-size:12px">Click an item to see it on screen</span></div>'+groups+'</div>';
}

/* ---------- small UI helpers ---------- */
function toast(msg){var t=document.createElement("div");t.className="toast";t.setAttribute("role","status");t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove()},2600)}
function obs(list){return (list||[]).map(function(o){return '<span class="ob" title="'+esc(D.obstacles[o]||"")+'">'+esc(o)+'</span>'}).join("")}
function chipFresh(k,txt){return '<span class="chip '+({f:"c-f",a:"c-a",s:"c-s",n:"c-n"}[k]||"c-b")+'">'+esc(txt)+'</span>'}
function dotFresh(k){return '<span class="dot d-'+k+'"></span>'}
function nb(n){return '<span class="n-badge b" aria-label="hint '+n+'">'+n+'</span>'}
function route(){var h=location.hash.replace(/^#\/?/,"").split("/");return {v:h[0]||"home",id:h[1],mode:h[2],step:h[3],flag:h[4]}}
/* Deep links for demos: #/p/<member>/<earlier|carelens>/<step 1..n>/<done> */
function applyDeepLink(r){
  if(r.v!=="p"||!P[r.id]||(r.mode!=="earlier"&&r.mode!=="carelens"))return;
  S.mode=r.mode; var pr=prog(r.mode,r.id), st=r.mode==="earlier"?eSteps(r.id):cSteps(r.id);
  if(r.flag==="done"){pr.done=st.map(function(s,i){return i});
    if(r.mode==="earlier")pr.forms=st[st.length-1].forms.map(function(f,j){return j});
    else{pr.structured=true;pr.signed=true;pr.called=true;P[r.id].carelens.out.tasks.forEach(function(t,i){if(t[1]==="RN confirm")pr.confirm["t"+i]=true})}}
  if(r.step&&!isNaN(+r.step))pr.cur=Math.max(0,Math.min(st.length-1,+r.step-1));
  history.replaceState(null,"","#/p/"+r.id);
}
function go(h){if(location.hash==="#/"+h)render();else location.hash="#/"+h}

/* ---------- top bar ---------- */
function topbar(){
  var r=route(), m=S.mode;
  $("#swE").className=m==="earlier"?"on e":"";$("#swC").className=m==="carelens"?"on c":"";
  $("#swE").setAttribute("aria-pressed",m==="earlier");$("#swC").setAttribute("aria-pressed",m==="carelens");
  $("#hintBtn").className="tbtn"+(S.hints?" on":"");$("#hintBtn").setAttribute("aria-pressed",S.hints);
  var nav=[["home","Home"]].concat(D.order.map(function(id){return ["p/"+id,P[id].name]})).concat([["compare","Compare"]]);
  $("#nav").innerHTML=nav.map(function(n){var on=(r.v+"/"+(r.id||"")).replace(/\/$/,"")===n[0];return '<button data-go="'+n[0]+'" class="'+(on?"on":"")+'">'+esc(n[1])+'</button>'}).join("");
  var c=$("#clock");
  if(r.v==="p"&&P[r.id]){var sp=m==="earlier"?spentE(r.id):spentC(r.id),tot=m==="earlier"?totalE(r.id):totalC(r.id);
    c.innerHTML="Time on "+esc(P[r.id].name)+": <b>"+sp+"</b> / ~"+tot+" min";}
  else{var e=0,cc=0;D.order.forEach(function(id){e+=spentE(id);cc+=spentC(id)});c.innerHTML="Clocked today · Earlier <b>"+e+"</b> min · CareLens <b>"+cc+"</b> min";}
  var mb=$("#modebar");
  mb.className="modebar "+(m==="earlier"?"e":"c");
  mb.innerHTML=m==="earlier"
   ?'<span class="chip" style="background:#F0C04A;color:#3A2A00">EARLIER</span> How Maria worked before: 7 separate systems, 3 unsorted queues, an Excel tracker and 4 forms per contact. Every click costs minutes.'
   :'<span class="chip c-k" style="background:var(--blue)">CARELENS</span> One login, three screens. Every action is labelled: <span class="mbk">'+KO.map(function(k){return ktag(k,true)}).join("")+'</span>';
}

/* ---------- home ---------- */
function home(){
  var m=S.mode;
  var cards=D.order.map(function(id){var p=P[id],pe=prog("earlier",id),pc=prog("carelens",id);
    var de=pe.done.length>=eSteps(id).length-1&&pe.forms.length===eSteps(id)[eSteps(id).length-1].forms.length, dc=pc.done.length===cSteps(id).length;
    return '<div class="pcard"><div class="ph" style="background:'+p.color+'"><span class="q" style="color:'+p.color+'">Queue '+p.qn+'</span><div class="nm">'+esc(p.name)+', '+p.age+'</div><div>'+esc(p.plan)+' · '+esc(p.cond)+'</div></div>'
    +'<div class="pb"><div class="tag" style="background:'+p.color+'1A;color:'+p.color+'">'+esc(p.headline)+'</div>'
    +'<div><b class="mu" style="font-size:13px">WHAT MAKES THIS CASE HARD</b><ul>'+p.card.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div>'
    +'<div class="dash" style="font-size:13.5px"><b class="blu">8 am Monday, see &amp; do:</b> '+esc(p.eightam)+'</div>'
    +'<div class="prog"><span class="chip '+(de?"c-f":"c-n")+'">Earlier '+(de?"done":"not walked")+' · ~'+totalE(id)+' min</span><span class="chip '+(dc?"c-f":"c-n")+'">CareLens '+(dc?"done":"not walked")+' · ~'+totalC(id)+' min</span></div></div>'
    +'<div class="acts"><button class="btn '+(m==="earlier"?"warn":"sec")+'" data-walk="earlier/'+id+'">Walk in Earlier</button><button class="btn '+(m==="carelens"?"":"sec")+'" data-walk="carelens/'+id+'">Walk in CareLens</button></div></div>'}).join("");
  return '<h1>Good morning, Maria · '+esc(D.meta.day)+'</h1><p class="sub">'+esc(D.meta.user)+' · '+esc(D.meta.role)+'. Three members need her today. Walk each one the old way, then flip the switch and walk it with CareLens.</p>'
  +'<div class="hero"><div class="card howto"><div class="hdr">How to test this as a case manager</div><ol>'
  +'<li>Use the <b>Earlier | CareLens</b> switch at the top right. It works on every page, including mid-walkthrough.</li>'
  +'<li>Pick a member below and <b>walk every step</b>. In Earlier, open each system the way you would today; the clock adds the minutes it usually costs.</li>'
  +'<li>Keep <b>Hints</b> on: each step explains how case managers did it before, what changes, and which problem from the brief it solves.</li>'
  +'<li>In CareLens, press <b>▶ Play guided demo</b>. It walks every step and points at what is automated, what AI suggests, what Maria decides and which safety rules apply.</li>'
  +'<li>Open <b>Files</b> to see the raw exports each mode needs, then see the totals on <b>Compare</b>.</li></ol></div>'
  +'<div class="modecmp"><div class="card e"><h3>Earlier</h3><p style="margin:0 0 6px">7 systems · 3 unsorted queues · Excel tracker · 4 forms per contact</p><p class="mu" style="margin:0;font-size:13.5px">Maria assembles the member herself, holds three med lists in her head and types the same facts four times.</p></div>'
  +'<div class="card c"><h3>CareLens</h3><p style="margin:0 0 6px">1 login · Today queue · Member 360 · Outreach &amp; Notes</p><p class="mu" style="margin:0;font-size:13.5px">Data arrives assembled, dated and with conflicts shown. Maria spends her time on judgment and the conversation.</p></div></div></div>'
  +'<div class="grid3">'+cards+'</div>'
  +'<p class="foot">All members, IDs, phone numbers and facilities are fictional. No real PHI. Minutes are estimates, to be replaced by a pilot time-motion baseline.</p>';
}

/* ---------- patient header ---------- */
function phead(p,mode){
  return '<div class="pt-head"><span class="sw" style="background:'+p.color+'"></span><div><div class="nm">'+esc(p.name)+', '+p.age+' <span class="mu" style="font-size:15px;font-weight:700">'+esc(p.plan)+' · '+esc(p.mrn)+' · Queue '+p.qn+'</span></div><div class="mu" style="font-weight:700">'+esc(p.headline)+' · '+esc(p.cond)+'</div></div>'
  +'<div style="margin-left:auto" class="row"><button class="btn sm sec" data-files="1">Files this mode needs</button><button class="btn sm '+(mode==="earlier"?"":"warn")+'" data-mode="'+(mode==="earlier"?"carelens":"earlier")+'">See this member in '+(mode==="earlier"?"CareLens":"Earlier")+'</button></div></div>'
  +'<div class="dash" style="margin-bottom:14px">'+esc(mode==="earlier"?p.earlier.intro:p.carelens.intro)+'</div>';
}

/* ---------- EARLIER walkthrough ---------- */
function earlier(id){
  var p=P[id],st=eSteps(id),pr=prog("earlier",id),cur=Math.min(pr.cur,st.length-1),s=st[cur];
  var docsIdx=st.length-1, allSys=st.slice(0,docsIdx).every(function(x,i){return pr.done.indexOf(i)>=0}), docsDone=pr.forms.length===st[docsIdx].forms.length;
  var finished=allSys&&docsDone;
  var list='<ol class="steplist">'+st.map(function(x,i){var dn=x.type==="docs"?docsDone:pr.done.indexOf(i)>=0;
    return '<li><button data-estep="'+i+'" class="'+(i===cur?"cur ":"")+(dn?"done":"")+'"><span class="n">'+(dn?"✓":i+1)+'</span><span class="t">'+esc(x.name)+'</span><span class="m">+'+stepCost(x)+'m</span></button></li>'}).join("")+'</ol>';
  var steps='<div class="steps"><div class="card"><h3>Maria\'s steps, earlier</h3>'+list+'<div class="tally"><div class="mu" style="font-weight:700">Clock for '+esc(p.name)+'</div><div class="big">'+spentE(id)+' <span style="font-size:15px">of ~'+totalE(id)+' min</span></div><div class="mu">'+logins(id)+' logins · 12 screens · facts typed 4x</div></div></div></div>';

  var tiles='<div class="sysgrid">'+st.slice(0,8).map(function(x,i){return '<button class="sys '+(i===cur?"cur ":"")+(pr.done.indexOf(i)>=0?"done":"")+'" data-estep="'+i+'"><span class="sn">'+esc(x.name)+'</span><span class="sl">'+esc(x.sl)+'</span><span class="sl"><b>+'+x.cost+' min</b> · '+esc(x.login)+'</span></button>'}).join("")+'</div>';
  var body;
  if(s.type==="call"){
    var called=pr.done.indexOf(cur)>=0;
    body='<div class="win"><div class="wbar"><span>Softphone · '+esc(s.name)+'</span><span>+'+s.cost+' min</span></div><div class="wbody">'
     +(called?'<div class="call callfail"><div class="ring">!</div><h3>'+esc(s.result.title)+'</h3><p style="max-width:640px">'+esc(s.result.text)+'</p></div>'
      :'<div class="call"><div class="ring">☎</div><p>The conversation itself takes the same time in both modes.</p><button class="btn warn" data-ecall="'+cur+'">Make the call (+'+s.cost+' min)</button></div>')
     +'</div></div>';
  } else if(s.type==="docs"){
    body='<div class="win"><div class="wbar"><span>CM System · Documentation (4 separate forms)</span><span>+'+stepCost(s)+' min</span></div><div class="wbody"><p style="margin:0">Each form asks for the same facts again. Click each form to re-type it.</p><div class="forms">'
     +s.forms.map(function(f,j){var dn=pr.forms.indexOf(j)>=0;return '<div class="form '+(dn?"done":"")+'"><b>'+esc(f.name)+'</b> <span class="cost" style="float:right;padding:1px 8px">+'+f.min+' min</span><div class="fields">'+esc(f.fields)+'</div>'+(dn?'<span class="chip c-f">Re-typed</span>':'<button class="btn sm warn" data-eform="'+j+'">Re-type into this form</button>')+'</div>'}).join("")
     +'</div><div class="issue"><b>Problem from the brief:</b> the same facts typed into assessment, care plan, call note and audit form, often after hours. '+obs(["Documentation burden"])+'</div></div></div>';
  } else {
    var v=s.view, dn=pr.done.indexOf(cur)>=0;
    body='<div class="win"><div class="wbar"><span>'+esc(v.title)+'</span><span>'+esc(s.login)+'</span></div><div class="wbody">'
     +(/\(#\d\)/.test(s.login)?'<div class="login">Separate login required: '+esc(s.login)+'. Session timed out since last use.</div>':'')
     +'<table class="ltable"><thead><tr>'+v.cols.map(function(c){return "<th>"+esc(c)+"</th>"}).join("")+'</tr></thead><tbody>'
     +v.rows.map(function(r,ri){return '<tr class="'+(ri===v.hl?"hl":"")+'">'+r.map(function(c){return "<td>"+esc(c)+"</td>"}).join("")+'</tr>'}).join("")+'</tbody></table>'
     +(v.text?'<div class="ltext">'+esc(v.text)+'</div>':'')
     +'<div class="issue"><b>What goes wrong here:</b> '+esc(s.issue.t)+'<div>'+obs(s.issue.ob)+'</div></div>'
     +'<div class="costline"><span class="cost">This system costs Maria +'+s.cost+' min</span>'
     +(dn?'<span class="chip c-f">Checked · fact added to scratch pad</span><button class="btn sm sec" data-enext="1">Next system</button>':'<button class="btn warn" data-edone="'+cur+'">Done here, note it down (+'+s.cost+' min)</button>')+'</div>'
     +'</div></div>';
  }
  var out='';
  if(finished){var o=p.earlier.outcome;out='<div class="outcome e"><h2>'+esc(o.title)+'</h2><div class="kpis"><div class="kpi"><div class="v">'+totalE(id)+' min</div><div class="l">on one member</div></div><div class="kpi"><div class="v">'+logins(id)+'</div><div class="l">logins</div></div><div class="kpi"><div class="v">12</div><div class="l">screens</div></div><div class="kpi"><div class="v">4x</div><div class="l">same facts typed</div></div></div><ul>'+o.pts.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul><button class="btn" data-mode="carelens">Now see '+esc(p.name)+' in CareLens</button></div>';}
  var center='<div>'+phead(p,"earlier")+'<div class="desk">'+tiles+body+'</div>'+out+'</div>';

  var facts=st.slice(0,8).map(function(x,i){return pr.done.indexOf(i)>=0?x.fact:null}).filter(Boolean);
  var hint='<div class="hintp '+(S.hints?"":"hide")+'"><div class="hint e"><h4>Hint · step '+(cur+1)+' of '+st.length+': '+esc(s.name)+'</h4><div class="lbl">How case managers did it earlier</div><p>'+esc(s.hint.how)+'</p><div class="lbl">Why it hurts</div><p>'+esc(s.hint.why)+'</p>'
   +(s.issue?'<div class="lbl">Problem from the brief</div><div>'+obs(s.issue.ob)+'</div>':'')+'<div class="lbl">In CareLens</div><p>'+esc(cHintFor(id,s))+'</p></div>'
   +'<div class="scratch"><h4>Maria\'s scratch pad ('+facts.length+' facts to hold in her head)</h4>'+(facts.length?'<ol>'+facts.map(function(f){return "<li>"+esc(f)+"</li>"}).join("")+'</ol>':'<p class="mu" style="margin:0">Empty. Each system adds a fact she has to remember and re-type later.</p>')+'</div></div>';
  return '<div class="wt '+(S.hints?"":"nohint")+'">'+steps+center+hint+'</div>';
}
function cHintFor(id,s){
  var m={queues:"One ranked Today queue with why-now evidence replaces the three inboxes.",excel:"No side spreadsheet: clocks and attempts live in the queue.",claims:"Claims appear in Member 360 labelled 'history', with both IDs merged.",um:"UM context is pulled into 'What changed' only when it matters.",pbm:"Fills from every pharmacy channel sit side by side with the discharge list.",hie:"Missing documents become automatic requests with a clock.",cm:"Old notes are summarized with links back to the original text.",phone:"Best number, time and language are ready before the dial; attempts log themselves."};
  if(s.type==="call")return "Same conversation length, but at the right time and with every fact on one screen.";
  if(s.type==="docs")return "Shorthand becomes a cited draft; 31 of 40 assessment fields pre-filled; sign once, written to all four places.";
  return m[s.sys]||"";
}

/* ---------- CARELENS walkthrough ---------- */
function carelens(id){
  var p=P[id],st=cSteps(id),pr=prog("carelens",id),cur=Math.min(pr.cur,st.length-1),s=st[cur];
  var all=pr.done.length===st.length; CUR=id;
  var list='<ol class="steplist">'+st.map(function(x,i){var dn=pr.done.indexOf(i)>=0;return '<li><button data-cstep="'+i+'" class="'+(i===cur?"cur ":"")+(dn?"done":"")+'"><span class="n">'+(dn?"✓":i)+'</span><span class="t">'+esc(x.name)+'<span class="stg">'+esc(D.stages[x.id]||"")+'</span></span><span class="m">+'+x.cost+'m</span></button></li>'}).join("")+'</ol>';
  var steps='<div class="steps"><div class="card"><h3>Maria\'s steps, with CareLens</h3>'+list+'<div class="tally"><div class="mu" style="font-weight:700">Clock for '+esc(p.name)+'</div><div class="big">'+spentC(id)+' <span style="font-size:15px">of ~'+totalC(id)+' min</span></div><div class="mu">Earlier: ~'+totalE(id)+' min · saves ~'+(totalE(id)-totalC(id))+' min</div><div class="mu">1 login · 3 screens · facts typed once</div>'
   +'<div class="kcs"><div class="mu" style="font-weight:700;margin-bottom:2px">Who did what for '+esc(p.name)+'</div>'+countLine(allLedger(id),id)+'</div></div></div></div>';
  var mid=p.mrn.split(" ")[0];
  var tab={pre:"",queue:"Today",m360:"Member 360",prep:"Outreach & Notes",call:"Outreach & Notes",note:"Outreach & Notes"}[s.id];
  var url={pre:"overnight",queue:"today",m360:"member/"+mid,prep:"outreach/"+mid,call:"outreach/"+mid,note:"outreach/"+mid}[s.id];
  var screen={pre:cPre,queue:cQueue,m360:cM360,prep:cOut,call:cOut,note:cOut}[s.id](id,s.id);
  var frame='<div class="frame"><div class="fbar"><span class="d"></span><span class="d"></span><span class="d"></span><span class="url">carelens.hilabs.app/'+esc(url)+'</span></div>'
   +'<div class="cnav"><span class="lg">CareLens</span>'+["Today","Member 360","Outreach & Notes","Tasks"].map(function(t){return '<span class="t '+(t===tab?"on":"")+'">'+esc(t)+'</span>'}).join("")+'<span class="who">'+esc(D.meta.user)+' · Complex CM · 48 active</span></div><div class="fbody">'+screen+'</div></div>';
  var pills='<div class="cstep">'+st.map(function(x,i){return '<button data-cstep="'+i+'" class="'+(i===cur?"on":(pr.done.indexOf(i)>=0?"dn":""))+'">'+i+'. '+esc(x.name)+'</button>'}).join("")+'</div>';
  var play='<div class="playbar"><button class="btn play" data-tour="start">▶ '+(cur===0?'Play the full guided demo':'Play guided demo from this step')+'</button><span class="mu">Step '+cur+' of '+(st.length-1)+' · stage: <b>'+esc(D.stages[s.id]||"")+'</b> · '+countLine(ledgerOf(id,s.id),id)+'</span></div>';
  var next=pr.done.indexOf(cur)>=0?(cur<st.length-1?'<button class="btn" data-cnext="1">Next step</button>':''):(s.id==="call"||s.id==="note"||s.id==="prep"?'':'<button class="btn" data-cdone="'+cur+'">'+({pre:"08:00 · Maria logs in: see the Today queue",queue:"Open "+p.name+"'s Member 360",m360:"Go to call prep",prep:"Start the call"}[s.id])+(s.cost?' (+'+s.cost+' min)':'')+'</button>');
  var out='';
  if(all){var o=p.carelens.outcome, led=allLedger(id), rv=led.filter(function(it){return it.k==="review"});
    out='<div class="outcome c"><h2>'+esc(o.title)+'</h2><div class="kpis"><div class="kpi"><div class="v">'+totalC(id)+' min</div><div class="l">vs ~'+totalE(id)+' earlier</div></div><div class="kpi"><div class="v">'+(totalE(id)-totalC(id))+' min</div><div class="l">given back</div></div><div class="kpi"><div class="v">1</div><div class="l">login</div></div><div class="kpi"><div class="v">1x</div><div class="l">facts typed</div></div></div><ul>'+o.pts.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul>'
    +'<div class="decided"><h3>What Maria decided herself</h3><div class="kcs" style="margin-bottom:6px">'+countLine(led,id)+'</div><ol>'+rv.map(function(it){var ok=gateOk(id,it.gate);return '<li><b>'+esc(it.t)+'</b> <span class="gate '+(ok?"ok":"")+'">'+(ok?"✓ done":"left open")+'</span></li>'}).join("")+'</ol><p class="mu" style="margin:6px 0 0;font-size:13px">Everything else was automated or drafted for her. None of it posted to the record until she signed.</p></div>'
    +'<div class="row"><button class="btn sec" data-go="compare">See the comparison</button>'+nextPatientBtn(id)+'</div></div>';}
  var center='<div>'+phead(p,"carelens")+pills+play+frame+'<div class="row" style="margin-top:12px;justify-content:flex-end">'+next+'</div>'+out+'</div>';
  var hs=p.carelens.hints[s.id]||[];
  var hint='<div class="hintp">'+ledgerPanel(id,s.id)+(S.hints?hs.map(function(h){return '<div class="hint"><h4>'+nb(h.n)+' '+esc(h.t)+'</h4><div class="lbl">Now, with CareLens</div><p>'+esc(h.now)+'</p><div class="lbl">Earlier</div><p class="mu">'+esc(h.before)+'</p>'+(h.ob.length?'<div class="lbl">Problem from the brief it solves</div><div>'+obs(h.ob)+'</div>':'')+'</div>'}).join(""):'')
   +'<div class="hint"><h4>The four labels</h4>'+legend()+'</div></div>';
  return '<div class="wt">'+steps+center+hint+'</div>';
}
/* Step 0: what CareLens did before Maria logged in */
function cPre(id){
  var items=ledgerOf(id,"pre");
  return '<h2 style="margin:0 0 4px">Before Maria logs in · overnight to 08:00</h2><p class="mu" style="margin:0 0 12px;font-size:13.5px">Nobody touched '+esc(P[id].name)+'\'s case yet. This is what CareLens did on its own, and the rules that held it back.</p>'
  +'<ol class="pipeline">'+items.map(function(it){return '<li class="k-'+it.k+'"'+A(it.at)+'><span class="tm">'+esc(it.time||"")+'</span><span class="pdot"></span><div class="pc"><div class="row" style="gap:6px"><b>'+esc(it.t)+'</b>'+ktag(it.k,true)+'</div><div class="pd">'+esc(it.d)+'</div><span class="src">'+esc(it.src)+'</span></div></li>'}).join("")
  +'<li class="end"><span class="tm">08:00</span><span class="pdot"></span><div class="pc"><b>Maria logs in.</b> One login. The queue is already ranked, the record already assembled. Nothing has been sent to the member or written to the chart.</div></li></ol>';
}
function nextPatientBtn(id){var i=D.order.indexOf(id);if(i<D.order.length-1){var n=D.order[i+1];return '<button class="btn" data-walk="earlier/'+n+'">Next member: '+esc(P[n].name)+' (start in Earlier)</button>'}return ""}

function cQueue(id){
  var q=D.queue, me=q.filter(function(r){return r.id===id})[0];
  var rows=q.map(function(r){var cls=r.id===id?"me":(r.demo===false?"dim":"");
    return '<tr class="'+cls+'"'+(r.id===id?A("q-row"):"")+'><td><b>'+r.rank+'</b></td><td><b>'+esc(r.nm)+'</b>'+(r.id===id?T("q-row"):"")+'<div class="mu" style="font-size:12px">'+esc(r.ln)+'</div></td><td><div class="why">'+r.why.map(function(w){return '<span class="'+w[1]+'">'+esc(w[0])+'</span>'}).join("")+'</div></td><td style="font-weight:800;color:var(--red)">'+esc(r.win)+'</td><td>'+esc(r.reach)+'</td><td><span class="btn sm '+(r.id===id?"":"grey")+'" style="display:inline-block">'+esc(r.act)+'</span></td><td>'+dotFresh(r.data)+'</td><td style="font-weight:800">'+r.score.toFixed(1)+'</td></tr>'}).join("");
  var parts=D.weights.map(function(w,i){var v=me.parts[i]*w[1];return '<div class="sbar"><span>'+esc(w[0])+' '+me.parts[i]+' × '+w[1].toFixed(2)+'</span><div><div class="b" style="width:'+(v/35*100).toFixed(0)+'%"></div></div><b>'+v.toFixed(2)+'</b></div>'}).join("");
  var ev={darnell:"ADT A04 Mercy ED 06:52 (live, 1 h old) · 7 ED visits across M-30391 + M-28807 (merged, 0.97 match) · mobile (555) 010-0143 from pharmacy pickup 28 Oct · case set to auto-close 15 Nov: paused. Rank: #31 on Fri, #1 at 06:52 Mon.",
          ernest:"ADT A03 St. Hilda Sat (duplicate removed) · discharge med list stops lisinopril, adds Entresto (HIE CCD) · lisinopril refilled 28 Oct, no Entresto fill (PBM 1 d) · TRC contact due Tue 17:00.",
          rosa:"Apixaban retail 14 Oct + warfarin mail order 3 Sep (PBM) · cardiology list warfarin, no INR (HIE) · fall to ED 2 Nov (ADT). *Hard rule: safety flag sends a prescriber alert now; the call waits for Carmen's 12-1 pm window."}[id];
  return '<div class="row" style="justify-content:space-between"><div><h2 style="margin:0">'+nb(1)+' Good morning, Maria · Monday 9 Nov, 08:00</h2></div><div class="cap"><div class="mu" style="font-size:12.5px;font-weight:700">Planned work today: 6.4 h of 7.5 h</div><div class="bar"><i style="width:85%"></i></div></div></div>'
  +'<div class="statrow"><span class="chip c-b">48 active</span><span class="chip c-b">6 new alerts since Fri</span><span class="chip c-s">3 time-critical</span><span class="chip c-a">1 safety flag</span><span class="chip c-n">43 no change</span></div>'
  +'<table class="qtable"><thead><tr><th>#</th><th>Member</th><th>Why now (evidence)</th><th>Window</th><th>Best reach</th><th>Next best action</th><th>Data</th><th>Score</th></tr></thead><tbody>'+rows+'</tbody></table>'
  +'<div class="mu" style="font-size:12.5px;margin-top:6px">43 more members: no new events since last contact (collapsed). Tanya and Luis are shown for context only in this demo.</div>'
  +'<div class="whyp"><div'+A("q-score")+'><h3>'+nb(2)+' Why is '+esc(P[id].name)+' #'+me.rank.replace("*","")+'? Score '+me.score.toFixed(1)+' '+T("q-score")+'</h3>'+parts+'</div><div style="font-size:13.5px"><div'+A("q-ev")+'><b>Evidence:</b> '+T("q-ev")+' '+esc(ev)+'</div><div class="row" style="margin-top:10px"'+A("q-act")+'>'+T("q-act")+'<button class="btn sm" data-cdone="'+stepIdx(id,"queue")+'">'+esc(me.act)+'</button><button class="btn sm sec" data-reason="Snooze">Snooze (reason)</button><button class="btn sm sec" data-reason="Re-rank">Re-rank (reason)</button></div>'+(prog("carelens",id).ask?'<div style="margin-top:8px">'+reasonPick(prog("carelens",id).ask)+'</div>':'')+'</div></div>';
}

var REASONS=["Already handled","Not clinically relevant","Member's window is later","Data looks wrong","Other team owns it"];
function reasonPick(key){return '<div class="row" style="gap:6px"><span class="mu" style="font-size:12.5px;font-weight:700">Reason code:</span>'+REASONS.map(function(r){return '<button class="btn sm sec" data-pick="'+esc(key)+'|'+esc(r)+'">'+esc(r)+'</button>'}).join("")+'</div>'}
function cM360(id){
  var m=P[id].carelens.m360, pr=prog("carelens",id);
  var head='<div class="row" style="margin-bottom:10px"'+A("m-chips")+'><b style="font-size:17px;color:var(--navy)">'+esc(P[id].name)+' · '+P[id].age+' · '+esc(P[id].mrn)+'</b>'+m.chips.map(function(c){return '<span class="chip '+c[1]+'">'+esc(c[0])+'</span>'}).join("")+T("m-chips")+'</div>';
  var changed='<div class="panel ai"'+A("m-changed")+'><div class="row" style="justify-content:space-between"><h3 style="margin:0">'+nb(1)+' What changed since last contact</h3><span class="row" style="gap:4px">'+T("m-changed")+'<span class="chip c-b">verify</span></span></div><ul>'+m.changed.map(function(c){return '<li>'+esc(c[0])+' <span class="src">'+esc(c[1])+'</span></li>'}).join("")+'</ul></div>';
  var meds='<div class="panel" style="margin-top:10px"'+A("m-meds")+'><h3>'+nb(2)+' '+esc(m.medsTitle)+' '+T("m-meds")+'</h3><table class="mt"><thead><tr>'+m.medCols.map(function(c){return "<th>"+esc(c)+"</th>"}).join("")+'<th>Confirmed</th></tr></thead><tbody>'
   +m.meds.map(function(r,i){var k="m"+i;return '<tr><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td><td>'+esc(r[3])+'</td><td><span class="st '+r[4]+'">'+esc(r[5])+'</span></td><td style="text-align:center"><input type="checkbox" aria-label="Maria confirms '+esc(r[0])+'" data-conf="'+k+'" '+(pr.confirm[k]?"checked":"")+'></td></tr>'}).join("")
   +'</tbody></table><div class="mu" style="font-size:12.5px;margin-top:4px">Conflicts are never auto-resolved; Maria ticks each one after asking the member. Suggested order: member report &gt; pharmacy fill &gt; discharge list &gt; claims &gt; old CM note.</div></div>';
  var tl='<div class="panel" style="margin-top:10px"><h3>Timeline (each event: source)</h3><div class="tl">'+m.timeline.map(function(e){return '<div class="ev"><b>'+esc(e[0])+'</b>'+esc(e[1])+'<div><span class="src">'+esc(e[2])+'</span></div></div>'}).join("")+'</div></div>';
  var nbas='<div class="panel"'+A("m-nba")+'><h3>'+nb(3)+' Next best actions (max 3) '+T("m-nba")+'</h3>'+m.nbas.map(function(n,i){var st=pr.nba[i];return '<div class="nba '+(st==="ok"?"ok":st==="no"?"no":"")+'"><div class="t">'+(i+1)+'. '+esc(n[0])+'</div><div class="e">'+esc(n[1])+'</div>'
     +(st==="ok"?'<span class="chip c-f">Accepted: '+esc(n[2])+'</span>':st&&st.indexOf("no:")===0?'<span class="chip c-n">Dismissed · reason logged: '+esc(st.slice(3))+'</span>':st==="ask"?reasonPick("nba|"+i):'<div class="row"><button class="btn sm" data-nba="'+i+'|ok">'+esc(n[2])+'</button><button class="btn sm sec" data-nba="'+i+'|ok">Edit</button><button class="btn sm sec" data-nba="'+i+'|ask">Dismiss (why)</button></div>')+'</div>'}).join("")+'</div>';
  var trust='<div class="panel trust" style="margin-top:10px"'+A("m-trust")+'><h3>'+nb(4)+' Data trust panel '+T("m-trust")+'</h3><ul>'+m.trust.map(function(t){return '<li>'+dotFresh(t[1])+'<b>'+esc(t[0])+'</b><span class="age">'+esc(t[2])+'</span></li>'}).join("")+'</ul><div class="dash" style="font-size:12.5px;background:#FFFBEA;border-color:#EBD38A">'+esc(m.trustNote)+'</div></div>';
  var ctx='<div class="panel" style="margin-top:10px"><h3>Care gaps &amp; social context</h3><ul>'+m.context.map(function(c){return "<li>"+esc(c)+"</li>"}).join("")+'</ul></div>';
  return head+'<div class="m360"><div>'+changed+meds+'</div><div>'+nbas+trust+'</div></div><div class="m360b">'+tl+ctx+'</div>';
}

function cOut(id,stepId){
  var o=P[id].carelens.out, pr=prog("carelens",id), ci=cSteps(id).map(function(s){return s.id});
  var called=pr.done.indexOf(ci.indexOf("call"))>=0, signed=pr.done.indexOf(ci.indexOf("note"))>=0;
  var head='<div class="row" style="margin-bottom:10px;justify-content:space-between"><div><b style="font-size:16px;color:var(--navy)">'+esc(P[id].name)+' · '+P[id].age+' · '+esc(P[id].plan)+' · '+esc(P[id].mrn)+'</b><div class="mu" style="font-size:13px">'+esc(o.who)+'</div></div><div class="row"><span class="chip c-b">'+esc(o.lang)+'</span>'+(called?'<span class="chip c-f">Call done</span>':stepId==="call"?'<span class="chip c-f">● On call</span>':'')+'<span class="chip c-a">'+esc(o.status)+'</span></div></div>';
  var B=function(n,on){return on?nb(n)+' ':''};
  var col1='<div><div'+A("o-prep")+'><h3>'+B(1,stepId==="prep")+'Call prep (built from the 360) '+T("o-prep")+'</h3><div class="prep">'+o.prep.map(function(r){return '<div><b>'+esc(r[0])+':</b> '+esc(r[1])+'</div>'}).join("")+'</div></div>'
   +'<div'+A("o-talk")+'><h3 style="margin-top:12px">Talking points '+T("o-talk")+' <span class="chip c-b">editable</span></h3><ol style="margin:0;padding-left:18px;font-size:13.5px">'+o.talking.map(function(t){return "<li>"+esc(t)+"</li>"}).join("")+'</ol></div>'
   +'<div'+A("o-attempts")+'><h3 style="margin-top:12px">'+B(1,stepId==="call")+'Attempt log (from softphone, no typing) '+T("o-attempts")+'</h3><ul class="alist">'+(function(){var at=o.attempts.filter(function(a){return called||a[3]!=="g"||stepId==="call"});return at.length?at.map(function(a){return '<li>'+dotFresh(a[3]==="g"?"f":"a")+'<b>'+esc(a[0])+'</b> '+esc(a[1])+'<span class="s">'+esc(a[2])+'</span></li>'}).join(""):'<li class="mu">No attempts yet today. Each dial will log itself here.</li>'})()+'</ul></div></div>';
  var col2;
  if(stepId==="prep"){col2='<div><h3>Maria\'s shorthand</h3><div class="dash" style="font-size:13.5px">During the call Maria types a few words here. CareLens turns them into a structured, cited note afterwards. Nothing is recorded without consent.</div><div class="call" style="padding:16px"'+A("o-dial")+'><div class="ring">☎</div>'+T("o-dial")+'<button class="btn" data-cdone="'+ci.indexOf("prep")+'">Start the call (+1 min prep)</button></div></div>';}
  else{
    col2='<div><h3>'+B(1,stepId==="note")+'Maria\'s shorthand (typed live)</h3>'
     +(stepId==="call"&&!called?'<div class="call" style="padding:16px"'+A("o-short")+'><div class="ring">☎</div>'+T("o-short")+'<p class="mu" style="margin:0">Same conversation length as before: '+cSteps(id)[ci.indexOf("call")].cost+' min.</p><button class="btn" data-ccall="1">Have the conversation (+'+cSteps(id)[ci.indexOf("call")].cost+' min)</button></div>'
      :'<div'+A("o-short")+'>'+T("o-short")+'<textarea class="shorthand" aria-label="Shorthand notes">'+esc(o.shorthand)+'</textarea></div>'
       +(called?'<div class="signed" style="margin:8px 0"><b>'+esc(o.callResult.title)+'</b><br>'+esc(o.callResult.text)+'</div>':'')
       +(stepId==="note"?(pr.structured?'<div'+A("o-draft")+'><h3 style="margin-top:10px">Draft note '+T("o-draft")+' <span class="'+(signed?"gr":"rd")+'">'+(signed?"signed":"not signed")+'</span></h3><div class="draft">'+o.draft.map(function(d){return '<p><span class="lbl">'+esc(d[0])+':</span> '+esc(d[1])+'</p>'}).join("")+'</div><div class="mu" style="font-size:12px;margin-top:4px">Every sentence links to its source; facts Maria did not confirm stay grey.</div></div>'
          :'<div'+A("o-draft")+' style="margin-top:8px">'+T("o-draft")+' <button class="btn" data-structure="1">Structure my note</button></div>'):'')
     )+'</div>';
  }
  var a=o.assess, pct=function(n){return (n/40*100).toFixed(1)+"%"};
  var col3='<div><div'+A("o-assess")+'><h3>Assessment: 40 fields '+T("o-assess")+'</h3><div class="prefill"><i style="width:'+pct(a.pre)+';background:var(--green)"></i><i style="width:'+pct(a.confirm)+';background:#E8A400"></i><i style="width:'+pct(40-a.pre-a.confirm)+';background:var(--red)"></i></div>'
   +'<div style="font-size:13px;margin:4px 0"><b>'+a.pre+' of 40 pre-filled with source</b>'+(a.confirm?' · '+a.confirm+' to confirm':'')+' · <span class="rd">'+(40-a.pre-a.confirm)+' must ask</span></div>'
   +'<ul class="alist">'+a.items.map(function(it){return '<li>'+dotFresh({g:"f",a:"a",r:"s"}[it[1]])+esc(it[0])+'<span class="s">'+esc(it[2])+'</span></li>'}).join("")+'</ul></div>';
  if(stepId==="note"){
    col3+='<div'+A("o-tasks")+'><h3 style="margin-top:10px">'+nb(2)+' Tasks from this call '+T("o-tasks")+'</h3>'+o.tasks.map(function(t,i){var k="t"+i,rn=t[1]==="RN confirm";return '<div class="task"'+A("o-task"+i)+'>'+(rn?'<input type="checkbox" aria-label="RN confirm: '+esc(t[0])+'" data-conf="'+k+'" '+(pr.confirm[k]?"checked":"")+'>':'<span class="dot d-f"></span>')+'<span>'+esc(t[0])+'</span>'+(rn?T("o-task"+i):'')+'<span class="k chip '+(rn?"c-s":"c-f")+'">'+esc(t[1])+'</span></div>'}).join("")+'</div>';
    var needRN=o.tasks.map(function(t,i){return t[1]==="RN confirm"?"t"+i:null}).filter(Boolean), ok=pr.structured&&needRN.every(function(k){return pr.confirm[k]});
    col3+='<div'+A("o-sign")+' style="margin-top:10px">'+T("o-sign")+(signed?'<div class="signed" style="margin-top:6px"><b>Signed &amp; sent to system of record.</b><br>'+esc(o.signed)+'</div>'
      :'<button class="btn" style="width:100%;margin-top:6px" data-sign="1" '+(ok?"":"disabled")+'>'+nb(3)+' Sign &amp; send to system of record (+'+cSteps(id)[ci.indexOf("note")].cost+' min)</button>'+(ok?'':'<div class="mu" style="font-size:12px;margin-top:4px">'+(pr.structured?'Confirm the RN tasks first: AI cannot make clinical decisions.':'Structure the note first.')+'</div>'))+'</div>';
  }
  col3+='</div>';
  return head+'<div class="out3">'+col1+col2+col3+'</div>';
}

/* ---------- compare ---------- */
function compare(){
  var te=0,tc=0;D.order.forEach(function(id){te+=totalE(id);tc+=totalC(id)});
  var talk=D.order.reduce(function(a,id){return a+breakdownE(id).talk},0);
  var lg=D.order.reduce(function(a,id){return a+logins(id)},0);
  var col={prep:"#D64545",out:"#E8A400",talk:"#1F9D55",doc:"#E07A1F"};
  function bars(b,max){return '<div class="track" style="width:'+((b.prep+b.out+b.talk+b.doc)/max*100).toFixed(1)+'%">'+["prep","out","talk","doc"].map(function(k){return b[k]?'<i style="width:'+(b[k]/(b.prep+b.out+b.talk+b.doc)*100).toFixed(1)+'%;background:'+col[k]+'">'+b[k]+'</i>':''}).join("")+'</div>'}
  var max=Math.max.apply(null,D.order.map(totalE));
  var rows=D.order.map(function(id){var p=P[id];return '<tr><td><b style="color:'+p.color+'">'+esc(p.name)+'</b><div class="mu" style="font-size:12.5px">'+esc(p.headline)+'</div></td><td><b>'+totalE(id)+'</b> min</td><td><b>'+totalC(id)+'</b> min</td><td class="gr"><b>'+(totalE(id)-totalC(id))+' min</b></td><td>'+logins(id)+' → 1</td><td>12 → 3</td><td>4x → 1x</td><td>'+p.earlier.stats.late+' → 0</td></tr>'}).join("");
  var bar=D.order.map(function(id){return '<div style="margin-bottom:10px"><b>'+esc(P[id].name)+'</b><div class="cmpbar"><span>Earlier</span>'+bars(breakdownE(id),max)+'</div><div class="cmpbar"><span>CareLens</span>'+bars(breakdownC(id),max)+'</div></div>'}).join("");
  return '<h1>Same three members, two ways of working</h1><p class="sub">Totals for one walkthrough of each member. Conversation time is the same in both modes; CareLens removes the time around it.</p>'
  +'<div class="tiles"><div class="tile"><div class="v">'+te+' → '+tc+' min</div><div class="l">for 3 members</div></div><div class="tile"><div class="v">'+(te-tc)+' min</div><div class="l">given back to Maria (~'+Math.round((te-tc)/45)+' more real conversations at ~45 min each incl. follow-up)</div></div>'
  +'<div class="tile"><div class="v">'+Math.round(talk/te*100)+'% → '+Math.round(talk/tc*100)+'%</div><div class="l">of her time spent in conversation with members and caregivers</div></div><div class="tile"><div class="v">'+lg+' → 3</div><div class="l">logins (one per member)</div></div></div>'
  +'<div class="grid2"><div class="card"><div class="hdr">Where each member\'s minutes go</div><div class="legend"><span><i style="background:'+col.prep+'"></i>Finding and assembling data</span><span><i style="background:'+col.out+'"></i>Outreach</span><span><i style="background:'+col.talk+'"></i>Conversation</span><span><i style="background:'+col.doc+'"></i>Documentation</span></div>'+bar+'</div>'
  +'<div class="card"><div class="hdr">How each problem from the brief is handled</div><table class="mt"><thead><tr><th>Problem</th><th>Earlier</th><th>CareLens</th></tr></thead><tbody>'
  +[["Messy data","3 med lists compared by hand; 2 member IDs; 2 pharmacy files","Conflicts side by side with sources; IDs merged with confidence; recipes combine sources"],
    ["Untimely data","45-day-old claims read as current; ADT without reason; summary faxed for","Freshness on every fact; claims labelled history; missing documents auto-requested"],
    ["Work burden","3 unsorted inboxes + Excel tracker; deadlines in her head","One ranked Today queue with why-now; clocks as countdowns; safety rules above the score"],
    ["Documentation burden","Same facts typed into 4 forms, after hours","Shorthand to cited draft; 31 of 40 fields pre-filled; sign once, written to 4 places"],
    ["Outreach","Dead numbers, wrong time, no language flag","Best number, time and language before dialling; attempts log themselves"]].map(function(r){return '<tr><td><span class="ob">'+r[0]+'</span></td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>'}).join("")
  +'</tbody></table></div></div>'
  +'<div class="card" style="margin-top:16px"><div class="hdr">Who does what in CareLens</div><p class="mu" style="margin:0 0 8px;font-size:13.5px">Every CareLens action across the walkthrough, by who owns it. AI and automation handle the assembly; the decisions stay with Maria.</p><table class="ctable"><thead><tr><th>Member</th>'+KO.map(function(k){return '<th>'+K[k].icon+' '+esc(K[k].label)+'</th>'}).join("")+'<th>What only Maria decided</th></tr></thead><tbody>'
  +D.order.map(function(id){var led=allLedger(id),c=kindCounts(led);return '<tr><td><b style="color:'+P[id].color+'">'+esc(P[id].name)+'</b></td>'+KO.map(function(k){return '<td><b>'+c[k]+'</b></td>'}).join("")+'<td style="font-size:13px">'+led.filter(function(it){return it.k==="review"}).map(function(it){return esc(it.t)}).join(" · ")+'</td></tr>'}).join("")
  +'</tbody></table></div>'
  +'<div class="card" style="margin-top:16px"><div class="hdr">Per member</div><table class="ctable"><thead><tr><th>Member</th><th>Earlier</th><th>CareLens</th><th>Saved</th><th>Logins</th><th>Screens</th><th>Facts typed</th><th>Key facts found late</th></tr></thead><tbody>'+rows+'</tbody></table></div>'
  +'<p class="foot">Minutes are estimates consistent with the CareLens deck (chart prep ~18 → ~5 min, documentation ~40 → ~12 min per member) and must be replaced by a pilot time-motion baseline. All members are fictional.</p>';
}

/* ---------- files drawer ---------- */
function openFiles(){
  var r=route(), ids=r.v==="p"&&P[r.id]?[r.id]:D.order, m=S.mode;
  var html='';
  if(m==="earlier"){
    html+='<p class="mu" style="margin-top:0">Earlier, Maria needs <b>8 separate exports per member</b>, each from a different system, with its own age and gap. She reads them one by one.</p>';
    ids.forEach(function(id){html+='<h3 style="color:'+P[id].color+'">'+esc(P[id].name)+'</h3>'+P[id].files.earlier.map(function(f,i){return '<div class="file"><span class="fn">'+esc(f[0])+'</span><button class="btn sm sec" data-view="'+id+'|earlier|'+i+'">Open</button><span class="fd">'+esc(f[1])+' · age '+esc(f[2])+' · '+esc(f[3])+'</span></div>'}).join("")});
  } else {
    html+='<p class="mu" style="margin-top:0">With CareLens, HiLabs ingests the <b>same raw feeds once</b> and standardizes them. Maria sees one member record where every fact keeps its source and age, and one write-back when she signs.</p>';
    ids.forEach(function(id){html+='<h3 style="color:'+P[id].color+'">'+esc(P[id].name)+'</h3>'+P[id].files.carelens.map(function(f,i){return '<div class="file"><span class="fn">'+esc(f[0])+'</span><button class="btn sm sec" data-view="'+id+'|carelens|'+i+'">Open</button><span class="fd">'+esc(f[1])+' · '+esc(f[2])+' · '+esc(f[3])+'</span></div>'}).join("")});
    html+='<h3>13 feeds ingested once (all members)</h3><table class="mt"><tbody>'+D.feeds.map(function(f){return '<tr><td class="mu" style="font-size:12px">'+esc(f[0])+'</td><td><b>'+esc(f[1])+'</b></td><td>'+esc(f[2])+'</td></tr>'}).join("")+'</tbody></table>';
  }
  $("#drTitle").textContent=(m==="earlier"?"Files Earlier needs":"Files CareLens needs")+(ids.length===1?" · "+P[ids[0]].name:"");
  $("#drBody").innerHTML=html; $("#drawer").classList.add("open"); $("#drawer").setAttribute("aria-hidden","false"); $("#scrim").classList.remove("hide"); $("#drClose").focus();
}
function closeFiles(){$("#drawer").classList.remove("open");$("#drawer").setAttribute("aria-hidden","true");$("#scrim").classList.add("hide");closeModal()}
function openModal(id,mode,i){var f=P[id].files[mode][i];$("#mdTitle").textContent=f[0];$("#mdBody").textContent=f[4];$("#modal").classList.remove("hide");$("#mdClose").focus()}
function closeModal(){$("#modal").classList.add("hide")}

/* ---------- guided tour ---------- */
function markDone(id,sid){var pr=prog("carelens",id),i=stepIdx(id,sid);if(i>=0&&pr.done.indexOf(i)<0)pr.done.push(i)}
function needRNok(id){var pr=prog("carelens",id);return P[id].carelens.out.tasks.every(function(t,i){return t[1]!=="RN confirm"||pr.confirm["t"+i]})}
/* Things CareLens does by itself when the tour reaches them */
function doAct(id,act){var pr=prog("carelens",id);
  if(act==="call"){markDone(id,"call");pr.called=true}
  if(act==="structure"){pr.structured=true}}
/* "Do it as Maria": performs the clinician action a review item waits for */
function doGate(id,g){var pr=prog("carelens",id);
  g.split(",").forEach(function(x){var p=x.split(":");
    if(p[0]==="conf")pr.confirm[p[1]]=true;
    else if(p[0]==="nba"){if(p[1]==="all")P[id].carelens.m360.nbas.forEach(function(n,i){if(!nbaDecided(pr.nba[i]))pr.nba[i]="ok"});else pr.nba[p[1]]="ok"}
    else if(p[0]==="step")markDone(id,p[1]);
    else if(x==="called")doAct(id,"call");
    else if(x==="sign"){pr.structured=true;if(needRNok(id)){markDone(id,"note");pr.signed=true}else toast("Maria has to tick the RN-confirm tasks before she can sign")}});}
function tourItems(){return TOUR?ledgerOf(TOUR.id,cSteps(TOUR.id)[TOUR.s].id):[]}
function tourShow(){var id=TOUR.id,pr=prog("carelens",id),it=tourItems()[TOUR.i];S.mode="carelens";pr.cur=TOUR.s;if(it&&it.do)doAct(id,it.do);render()}
function tourStart(id){var pr=prog("carelens",id),s=Math.min(pr.cur,cSteps(id).length-1);while(s<cSteps(id).length-1&&!ledgerOf(id,cSteps(id)[s].id).length)s++;TOUR={id:id,s:s,i:0};tourShow()}
function tourEnd(){TOUR=null;$("#tourPop").classList.add("hide");document.querySelectorAll(".spot").forEach(function(e){e.classList.remove("spot")});render()}
function tourNext(){var id=TOUR.id,st=cSteps(id),sid=st[TOUR.s].id;
  if(TOUR.i<tourItems().length-1){TOUR.i++;tourShow();return}
  if(sid==="call")doAct(id,"call"); else if(sid!=="note")markDone(id,sid);
  if(TOUR.s<st.length-1){TOUR.s++;TOUR.i=0;tourShow();return}
  var done=prog("carelens",id).signed; tourEnd();
  toast(done?"Guided demo finished for "+P[id].name:"Demo finished. The note is not signed: only Maria can sign it.");
  var o=document.querySelector(".outcome");if(o)o.scrollIntoView({block:"start"});}
function tourBack(){if(TOUR.i>0){TOUR.i--}else if(TOUR.s>0){TOUR.s--;TOUR.i=Math.max(0,tourItems().length-1)}tourShow()}
function placePop(){
  var pop=$("#tourPop"); if(!TOUR||pop.classList.contains("hide"))return;
  var el=document.querySelector(".spot");
  if(window.innerWidth<900||!el){pop.classList.add("dock");pop.style.top="";pop.style.left="";return}
  pop.classList.remove("dock");
  var r=el.getBoundingClientRect(),pw=pop.offsetWidth,ph=pop.offsetHeight,H=window.innerHeight,W=window.innerWidth;
  var top=r.bottom+12; if(top+ph>H-8)top=r.top-ph-12; if(top<70)top=Math.max(70,Math.min(H-ph-8,r.top+12));
  var left=Math.min(Math.max(8,r.left),W-pw-8);
  pop.style.top=top+"px";pop.style.left=left+"px";
}
function tourApply(){
  document.querySelectorAll(".spot").forEach(function(e){e.classList.remove("spot")});
  var pop=$("#tourPop"), r=route();
  if(!TOUR||r.v!=="p"||r.id!==TOUR.id||S.mode!=="carelens"){TOUR=null;pop.classList.add("hide");return}
  var id=TOUR.id,st=cSteps(id),items=tourItems(),it=items[TOUR.i]; if(!it){pop.classList.add("hide");return}
  var el=document.querySelector('[data-ai="'+it.at+'"]');
  if(el){el.classList.add("spot","k-"+it.k+"-spot");el.scrollIntoView({block:"center"})}
  var last=TOUR.i===items.length-1, lastStep=TOUR.s===st.length-1, ok=gateOk(id,it.gate);
  pop.className="tourpop k-"+it.k;
  pop.innerHTML='<div class="tp-h">'+ktag(it.k,true)+'<span class="mu">Step '+TOUR.s+' · '+(TOUR.i+1)+' of '+items.length+'</span><button class="x" data-tour="exit" aria-label="Exit guided demo">×</button></div>'
   +'<div class="tp-s">'+esc(st[TOUR.s].name)+' · '+esc(D.stages[st[TOUR.s].id]||"")+'</div>'
   +(it.time?'<div class="tp-tm">'+esc(it.time)+'</div>':'')
   +'<b class="tp-t">'+esc(it.t)+'</b><p>'+esc(it.d)+'</p><span class="src">'+esc(it.src)+'</span>'
   +(it.k==="review"?'<div class="tp-maria">'+(ok?'✓ Maria has done this.':'✋ Maria\'s turn. CareLens waits here until she acts.')+(ok?'':' <button class="btn sm" data-tour="act">Do it as Maria</button>')+'</div>':'')
   +(el?'':'<div class="mu" style="font-size:12px;margin-top:6px">This appears later in the step.</div>')
   +'<div class="tp-nav"><button class="btn sm sec" data-tour="back" '+(TOUR.s===0&&TOUR.i===0?"disabled":"")+'>← Back</button><span class="mu" style="font-size:12px">← → keys · Esc to exit</span><button class="btn sm" data-tour="next">'+(last?(lastStep?"Finish":"Next step →"):"Next →")+'</button></div>';
  pop.classList.remove("hide"); placePop();
}
window.addEventListener("scroll",placePop,{passive:true});
window.addEventListener("resize",placePop);
function spot(at){var el=document.querySelector('[data-ai="'+at+'"]');if(!el){toast("That appears later in this step");return}
  el.scrollIntoView({behavior:"smooth",block:"center"});el.classList.remove("flash");void el.offsetWidth;el.classList.add("flash");setTimeout(function(){el.classList.remove("flash")},1800)}

/* ---------- render + events ---------- */
function render(){
  applyDeepLink(route());
  var r=route(), v=$("#view");
  CUR=null;
  if(r.v==="p"&&P[r.id]) v.innerHTML=S.mode==="earlier"?earlier(r.id):carelens(r.id);
  else if(r.v==="compare") v.innerHTML=compare();
  else v.innerHTML=home();
  topbar(); save(); tourApply();
}
document.addEventListener("click",function(e){
  var t=e.target.closest("button,[data-go]"); if(!t)return;
  var r=route(), id=r.id, d=t.dataset;
  if(d.go!==undefined){go(d.go);return}
  if(t.id==="brand"){go("home");return}
  if(t.id==="swE"||t.id==="swC"){S.mode=t.id==="swE"?"earlier":"carelens";render();toast(S.mode==="earlier"?"Earlier mode: the old way of working":"CareLens mode: the new workbench");return}
  if(t.id==="hintBtn"){S.hints=!S.hints;render();return}
  if(t.id==="filesBtn"||d.files){openFiles();return}
  if(t.id==="drClose"){closeFiles();return}
  if(t.id==="mdClose"){closeModal();return}
  if(t.id==="resetBtn"){TOUR=null;S.prog={earlier:{},carelens:{}};render();toast("All walkthrough progress reset");return}
  if(d.view){var a=d.view.split("|");openModal(a[0],a[1],+a[2]);return}
  if(d.walk){var w=d.walk.split("/");S.mode=w[0];go("p/"+w[1]);window.scrollTo(0,0);return}
  if(d.mode){S.mode=d.mode;render();window.scrollTo(0,0);return}
  if(d.spot){spot(d.spot);return}
  if(d.tour){
    if(d.tour==="start"&&id&&P[id]){tourStart(id);return}
    if(!TOUR)return;
    if(d.tour==="exit"){tourEnd();return}
    if(d.tour==="next"){tourNext();return}
    if(d.tour==="back"){tourBack();return}
    if(d.tour==="act"){var g=tourItems()[TOUR.i];if(g&&g.gate){doGate(TOUR.id,g.gate);toast("Maria: "+g.t)}render();return}
    return}
  if(!id||!P[id])return;
  if(d.cstep!==undefined&&TOUR){TOUR=null}
  var pe=prog("earlier",id), pc=prog("carelens",id), st;
  if(d.estep!==undefined){pe.cur=+d.estep;render();return}
  if(d.edone!==undefined){var i=+d.edone;if(pe.done.indexOf(i)<0)pe.done.push(i);toast("+"+eSteps(id)[i].cost+" min · "+eSteps(id)[i].name);pe.cur=Math.min(i+1,eSteps(id).length-1);render();return}
  if(d.enext){pe.cur=Math.min(pe.cur+1,eSteps(id).length-1);render();return}
  if(d.ecall!==undefined){var c=+d.ecall;if(pe.done.indexOf(c)<0)pe.done.push(c);toast("+"+eSteps(id)[c].cost+" min · conversation");render();return}
  if(d.eform!==undefined){var j=+d.eform;st=eSteps(id);if(pe.forms.indexOf(j)<0)pe.forms.push(j);toast("+"+st[st.length-1].forms[j].min+" min · re-typed "+st[st.length-1].forms[j].name);if(pe.forms.length===st[st.length-1].forms.length&&pe.done.indexOf(st.length-1)<0)pe.done.push(st.length-1);render();return}
  if(d.cstep!==undefined){pc.cur=+d.cstep;render();return}
  if(d.cdone!==undefined){var k=+d.cdone;st=cSteps(id);if(pc.done.indexOf(k)<0)pc.done.push(k);toast("+"+st[k].cost+" min · "+st[k].name);pc.cur=Math.min(k+1,st.length-1);render();window.scrollTo({top:0,behavior:"smooth"});return}
  if(d.cnext){pc.cur=Math.min(pc.cur+1,cSteps(id).length-1);render();return}
  if(d.ccall){var ci=cSteps(id).map(function(s){return s.id}).indexOf("call");if(pc.done.indexOf(ci)<0)pc.done.push(ci);pc.called=true;toast("+"+cSteps(id)[ci].cost+" min · conversation");pc.cur=ci+1;render();return}
  if(d.structure){pc.structured=true;toast("Note structured from shorthand · every fact cited");render();return}
  if(d.sign){var ni=cSteps(id).map(function(s){return s.id}).indexOf("note");if(pc.done.indexOf(ni)<0)pc.done.push(ni);pc.signed=true;toast("Signed · written to CM note, assessment, care plan and audit log");render();return}
  if(d.nba){var b=d.nba.split("|");pc.nba[b[0]]=b[1];if(b[1]==="ok")toast("Accepted · becomes a task, script line or note");render();return}
  if(d.reason){pc.ask=d.reason;render();return}
  if(d.pick){var q=d.pick.split("|");
    if(q[0]==="nba"){pc.nba[q[1]]="no:"+q[2];toast("Dismissed · reason logged: "+q[2]+" (tunes the rules; not shown again for 14 days)")}
    else{pc.ask=null;toast(q[0]+" · reason logged: "+q[1]+" (feedback for ranking weights)")}
    render();return}
});
document.addEventListener("change",function(e){var t=e.target;if(t.dataset&&t.dataset.conf){var id=route().id;if(!P[id])return;prog("carelens",id).confirm[t.dataset.conf]=t.checked;render()}});
document.addEventListener("keydown",function(e){
  if(TOUR&&!/^(TEXTAREA|INPUT|SELECT)$/.test((e.target.tagName||""))){
    if(e.key==="ArrowRight"){e.preventDefault();tourNext();return}
    if(e.key==="ArrowLeft"){e.preventDefault();tourBack();return}
  }
  if(e.key==="Escape"){if(TOUR){tourEnd();return}if(!$("#modal").classList.contains("hide"))closeModal();else closeFiles()}});
$("#scrim").addEventListener("click",closeFiles);
window.addEventListener("hashchange",function(){render();window.scrollTo(0,0)});
render();
/* exposed for automated checks */
window.CLtest={totalE:totalE,totalC:totalC,spentE:spentE,spentC:spentC,logins:logins,breakdownE:breakdownE,breakdownC:breakdownC,state:function(){return S}};
})();
