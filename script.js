/* ================= PAGE NAVIGATION ================= */
function goPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove("active"));
  const page = document.getElementById(id);
  if (page) page.classList.add("active");
}
goPage("home");

/* ================= REAL-TIME CLOCK ================= */
setInterval(() => {
  const clock = document.getElementById("clock");
  if (clock) clock.innerText = new Date().toLocaleTimeString();
}, 1000);

/* ================= ALARM ================= */
let alarmOn = false;
let alarmInterval = null;
function toggleAlarm() {
  const btn = document.getElementById("alarmBtn");
  const text = btn.querySelector(".btn-text");
  alarmOn = !alarmOn;
  btn.classList.toggle("active");
  text.innerText = alarmOn ? "Deactivate" : "Activate";
  if (alarmOn) startAlarmCheck();
  else { clearInterval(alarmInterval); alarmInterval=null; }
}
function startAlarmCheck() {
  if (alarmInterval!==null) return;
  alarmInterval = setInterval(()=>{
    const alarmTime = document.getElementById("alarmTime").value;
    if(!alarmTime) return;
    const now = new Date().toTimeString().slice(0,5);
    if(now===alarmTime) playAlarm();
  },1000);
}
function playAlarm() {
  const ctx=new (window.AudioContext||window.webkitAudioContext)();
  const osc=ctx.createOscillator();
  osc.type="sine";
  osc.frequency.value=600;
  osc.connect(ctx.destination);
  osc.start();
  setTimeout(()=>osc.stop(),1200);
}

/* ================= TIMER ================= */
let timerInterval=null;
function startTimer(){
  clearInterval(timerInterval);
  const th=document.getElementById("th");
  const tm=document.getElementById("tm");
  const ts=document.getElementById("ts");
  const tms=document.getElementById("tms");
  const display=document.getElementById("timerDisplay");
  let total=(parseInt(th.value)||0)*3600000
           +(parseInt(tm.value)||0)*60000
           +(parseInt(ts.value)||0)*1000
           +(parseInt(tms.value)||0);
  if(total<=0){ display.innerText="00:00:00:000"; return; }
  timerInterval=setInterval(()=>{
    total-=10;
    if(total<=0){ clearInterval(timerInterval); display.innerText="00:00:00:000"; return; }
    const h=Math.floor(total/3600000);
    const m=Math.floor(total/60000)%60;
    const s=Math.floor(total/1000)%60;
    const ms=total%1000;
    display.innerText=
      `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(ms).padStart(3,'0')}`;
  },10);
}

/* ================= STOPWATCH ================= */
let sw=0, swInterval=null;
function startSW(){
  if(swInterval!==null) return;
  const display=document.getElementById("swDisplay");
  swInterval=setInterval(()=>{
    sw+=10;
    const h=Math.floor(sw/3600000);
    const m=Math.floor(sw/60000)%60;
    const s=Math.floor(sw/1000)%60;
    const ms=Math.floor((sw%1000)/100);
    display.innerText=
      `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${ms}`;
  },10);
}
function stopSW(){ clearInterval(swInterval); swInterval=null; }
function resetSW(){ stopSW(); sw=0; document.getElementById("swDisplay").innerText="00:00:00.0"; }