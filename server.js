#!/usr/bin/env node
/* ============================================================
   TOURISTA — il server dell'ufficio
   Un file solo, nessuna installazione, nessuna dipendenza.

   Si accende con:   node server.js
   e da quel momento due o tre computer dell'agenzia vedono
   le stesse pratiche: chi scrive da una parte, dopo pochi
   secondi lo vede anche l'altro.

   Ogni giorno, alla prima scrittura, mette da parte una copia
   dell'archivio in "copie/". Le ultime trenta restano lì.

   Sta sulla rete dell'ufficio: non va aperto su internet.
   Se serve, si mette una parola d'ordine:
       node server.js --chiave laparola
   ============================================================ */

const http = require("http");
const fs   = require("fs");
const path = require("path");
const os   = require("os");

/* --- come è stato acceso --- */
const ARG = process.argv.slice(2);
function opz(nome, pre){
  const i = ARG.indexOf("--" + nome);
  return i >= 0 && ARG[i+1] ? ARG[i+1] : pre;
}
const PORTA   = Number(opz("porta", process.env.PORT || 7070));
const CHIAVE  = opz("chiave", "");
const CARTELLA = __dirname;
const DATI    = path.join(CARTELLA, "dati");
const COPIE   = path.join(CARTELLA, "copie");
const ARCHIVIO = path.join(DATI, "archivio.json");

const COLL = ["staff","fornitori","pacchetti","partenze","persone","clienti","pratiche","richieste","prima","cose"];
/* lingua, colore e agenzia di prova restano di ogni computer: non si sincronizzano */
const META_MIE = ["lingua","skin","demo"];

/* --- l'archivio in memoria --- */
let DB = null;
let daScrivere = false;
let timerScrittura = null;

function vuoto(){
  const d = { meta:{ _m:0 }, _del:[] };
  COLL.forEach(c => d[c] = []);
  return d;
}
function leggi(){
  try{
    if(fs.existsSync(ARCHIVIO)){
      const d = JSON.parse(fs.readFileSync(ARCHIVIO, "utf8"));
      COLL.forEach(c => { if(!Array.isArray(d[c])) d[c] = []; });
      if(!d.meta) d.meta = { _m:0 };
      if(!Array.isArray(d._del)) d._del = [];
      return d;
    }
  }catch(e){ console.error("  ! l'archivio non si legge:", e.message, "— ne comincio uno nuovo"); }
  return vuoto();
}
function scrivi(){
  daScrivere = true;
  if(timerScrittura) return;
  timerScrittura = setTimeout(()=>{
    timerScrittura = null;
    if(!daScrivere) return;
    daScrivere = false;
    try{
      fs.mkdirSync(DATI, { recursive:true });
      const tmp = ARCHIVIO + ".tmp";
      fs.writeFileSync(tmp, JSON.stringify(DB));
      fs.renameSync(tmp, ARCHIVIO);   /* prima si scrive di fianco, poi si sposta: se manca la luce l'archivio buono resta */
      copiaDelGiorno();
    }catch(e){ console.error("  ! non riesco a salvare:", e.message); }
  }, 800);
}

/* --- la copia di sicurezza di ogni giorno --- */
function copiaDelGiorno(){
  try{
    const g = new Date();
    const nome = "tourista-" + g.getFullYear() + "-" +
      String(g.getMonth()+1).padStart(2,"0") + "-" + String(g.getDate()).padStart(2,"0") + ".json";
    fs.mkdirSync(COPIE, { recursive:true });
    const dove = path.join(COPIE, nome);
    if(!fs.existsSync(dove)){
      fs.writeFileSync(dove, JSON.stringify(DB));
      console.log("  · copia del giorno:", nome);
      const vecchie = fs.readdirSync(COPIE).filter(f => /^tourista-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
      while(vecchie.length > 30) { try{ fs.unlinkSync(path.join(COPIE, vecchie.shift())); }catch(e){} }
    }
  }catch(e){ console.error("  ! la copia del giorno non è riuscita:", e.message); }
}

/* --- mettere insieme quello che arriva --- */
/* Regola: comanda l'orologio del server. Ogni cosa che arriva viene
   timbrata con l'ora di adesso, e chi arriva dopo ha ragione.
   Così due computer con l'ora sbagliata non fanno danni.        */
function unisci(dati, ora){
  let toccati = 0;
  COLL.forEach(c => {
    const arrivati = (dati && dati.cambiati && dati.cambiati[c]) || [];
    if(!arrivati.length) return;
    const mappa = new Map(DB[c].map(r => [r.id, r]));
    arrivati.forEach(rec => {
      if(!rec || !rec.id) return;
      rec._m = ora;
      const vecchio = mappa.get(rec.id);
      if(vecchio) DB[c][DB[c].indexOf(vecchio)] = rec;
      else DB[c].push(rec);
      mappa.set(rec.id, rec);
      toccati++;
    });
  });

  /* quello che è stato cancellato di là, si cancella anche qui */
  const tolti = (dati && dati.tolti) || [];
  tolti.forEach(t => {
    if(!t || !t.c || !t.id || COLL.indexOf(t.c) < 0) return;
    const i = DB[t.c].findIndex(r => r.id === t.id);
    if(i >= 0){ DB[t.c].splice(i, 1); toccati++; }
    if(!DB._del.some(x => x.c === t.c && x.id === t.id)) DB._del.push({ c:t.c, id:t.id, t:ora });
    else DB._del.forEach(x => { if(x.c === t.c && x.id === t.id) x.t = ora; });
  });

  /* le impostazioni dell'agenzia: lingua e colore restano di ognuno */
  if(dati && dati.meta){
    const m = Object.assign({}, dati.meta);
    META_MIE.forEach(k => delete m[k]);
    DB.meta = Object.assign({}, DB.meta, m, { _m: ora });
    toccati++;
  }

  /* le lapidi vecchie di più di sessanta giorni non servono più */
  const limite = ora - 60*24*3600*1000;
  DB._del = DB._del.filter(x => x.t > limite);
  return toccati;
}

function novita(da){
  const out = { cambiati:{}, tolti:[], ora: Date.now() };
  COLL.forEach(c => {
    const l = DB[c].filter(r => (r._m || 0) > da);
    if(l.length) out.cambiati[c] = l;
  });
  out.tolti = DB._del.filter(x => x.t > da);
  if((DB.meta._m || 0) > da){
    const m = Object.assign({}, DB.meta);
    META_MIE.forEach(k => delete m[k]);
    out.meta = m;
  }
  return out;
}

/* --- il servizio web --- */
const TIPI = {
  ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8",
  ".json":"application/json; charset=utf-8", ".webmanifest":"application/manifest+json; charset=utf-8",
  ".png":"image/png", ".jpg":"image/jpeg", ".svg":"image/svg+xml", ".ico":"image/x-icon",
  ".css":"text/css; charset=utf-8", ".txt":"text/plain; charset=utf-8"
};
function testa(res, codice, tipo, extra){
  res.writeHead(codice, Object.assign({
    "Content-Type": tipo,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type, x-chiave",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Cache-Control": "no-store"
  }, extra || {}));
}
function json(res, codice, oggetto){
  testa(res, codice, TIPI[".json"]);
  res.end(JSON.stringify(oggetto));
}
function corpo(req){
  return new Promise((ok, no) => {
    let s = "", n = 0;
    req.on("data", p => {
      n += p.length;
      if(n > 40 * 1024 * 1024){ no(new Error("troppo grande")); req.destroy(); return; }
      s += p;
    });
    req.on("end", () => { try{ ok(s ? JSON.parse(s) : {}); }catch(e){ no(e); } });
    req.on("error", no);
  });
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://" + (req.headers.host || "localhost"));
  const via = decodeURIComponent(u.pathname);

  if(req.method === "OPTIONS"){ testa(res, 204, "text/plain"); res.end(); return; }

  if(via.indexOf("/api/") === 0){
    if(CHIAVE && req.headers["x-chiave"] !== CHIAVE){
      json(res, 401, { errore:"parola d'ordine sbagliata" });
      return;
    }
    try{
      if(via === "/api/ping"){
        json(res, 200, { app:"tourista", ver:1, ora:Date.now(), chiave: !!CHIAVE,
          conta: COLL.reduce((a,c) => (a[c] = DB[c].length, a), {}) });
        return;
      }
      if(via === "/api/pull"){
        json(res, 200, novita(Number(u.searchParams.get("da")) || 0));
        return;
      }
      if(via === "/api/push" && req.method === "POST"){
        const dati = await corpo(req);
        const ora = Date.now();
        const n = unisci(dati, ora);
        if(n) scrivi();
        const risposta = novita(Number(dati.da) || 0);
        risposta.accettati = n;
        json(res, 200, risposta);
        if(n) console.log("  ←", n, "cose da", req.socket.remoteAddress);
        return;
      }
      if(via === "/api/tutto"){          /* l'archivio intero: per il primo invio e per le copie */
        json(res, 200, DB);
        return;
      }
      if(via === "/api/copia"){
        testa(res, 200, TIPI[".json"], { "Content-Disposition": 'attachment; filename="tourista-server.json"' });
        res.end(JSON.stringify(DB));
        return;
      }
      json(res, 404, { errore:"non c'è" });
      return;
    }catch(e){
      json(res, 400, { errore: e.message });
      return;
    }
  }

  /* i file del programma, così gli altri computer aprono solo l'indirizzo */
  let file = via === "/" ? "/index.html" : via;
  file = path.normalize(file).replace(/^(\.\.[\\/])+/, "");
  const dove = path.join(CARTELLA, file);
  if(dove.indexOf(CARTELLA) !== 0 || !fs.existsSync(dove) || !fs.statSync(dove).isFile()){
    testa(res, 404, "text/plain; charset=utf-8");
    res.end("Non c'è.");
    return;
  }
  testa(res, 200, TIPI[path.extname(dove).toLowerCase()] || "application/octet-stream");
  fs.createReadStream(dove).pipe(res);
});

/* --- accensione --- */
DB = leggi();
server.listen(PORTA, "0.0.0.0", () => {
  const reti = [];
  const n = os.networkInterfaces();
  Object.keys(n).forEach(k => (n[k] || []).forEach(x => {
    if(x.family === "IPv4" && !x.internal) reti.push(x.address);
  }));
  console.log("");
  console.log("  TOURISTA — server dell'ufficio acceso");
  console.log("  ------------------------------------");
  console.log("  Su questo computer:   http://localhost:" + PORTA);
  reti.forEach(r => console.log("  Dagli altri computer: http://" + r + ":" + PORTA));
  console.log("");
  console.log("  Archivio:  " + ARCHIVIO);
  console.log("  Copie:     " + COPIE + "  (una al giorno, le ultime trenta)");
  if(CHIAVE) console.log("  Parola d'ordine attiva.");
  console.log("  Pratiche in archivio: " + DB.pratiche.length);
  console.log("");
  console.log("  Si spegne con Ctrl+C. Tieni acceso il computer che fa da server.");
  console.log("");
});
server.on("error", e => {
  if(e.code === "EADDRINUSE") console.error("\n  ! La porta " + PORTA + " è già occupata. Prova:  node server.js --porta 7071\n");
  else console.error("\n  ! " + e.message + "\n");
  process.exit(1);
});
/* prima di spegnersi, salva */
["SIGINT","SIGTERM"].forEach(s => process.on(s, () => {
  try{ if(daScrivere){ fs.mkdirSync(DATI, { recursive:true }); fs.writeFileSync(ARCHIVIO, JSON.stringify(DB)); } }catch(e){}
  console.log("\n  Server spento. L'archivio è salvato.\n");
  process.exit(0);
}));
/* e una volta ogni sei ore controlla che la copia di oggi ci sia */
setInterval(copiaDelGiorno, 6*3600*1000);
