#!/usr/bin/env node
/* ============================================================
   UN SOLO FILE PER FAR VEDERE IL SITO

       node anteprima.mjs

   Mette tutto il sito — le due grafiche, le cinque lingue, le
   immagini delle città — dentro un unico file HTML che si apre
   con un doppio clic o si manda per email a chi deve dare
   un'occhiata. Non serve un server, non serve internet.

   Il sito vero resta quello in pubblica/: questo è solo per
   far vedere il lavoro a qualcuno prima di pubblicarlo.
   ============================================================ */
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { LINGUE } from "./contenuti/comune.mjs";

const QUI = dirname(fileURLToPath(import.meta.url));
const RADICE = join(QUI, "pubblica", "vetrina");   /* le due versioni hanno le stesse pagine */
const FUORI = join(QUI, "anteprima.html");

/* --- tutte le pagine, lingua per lingua --- */
function raccogli(cartella, dentro = ""){
  const fuori = [];
  for(const f of readdirSync(cartella)){
    const p = join(cartella, f);
    if(statSync(p).isDirectory()) fuori.push(...raccogli(p, dentro + f + "/"));
    else if(f.endsWith(".html") && f !== "volantino.html") fuori.push(dentro + f);
  }
  return fuori;
}

const pagine = {};
for(const L of LINGUE){
  const dove = join(RADICE, L.id);
  if(!existsSync(dove)) continue;
  for(const via of raccogli(dove)) pagine[L.id + "/" + via] = leggi(join(dove, via), L.id + "/" + via);
}

/* --- una pagina: prendiamo il corpo e sistemiamo i collegamenti --- */
function leggi(file, chiave){
  const testo = readFileSync(file, "utf8");
  const tag = testo.match(/<body([^>]*)>/);
  const classe = (tag && (tag[1].match(/class="([^"]*)"/) || [])[1]) || "";
  let corpo = testo.slice(testo.indexOf(">", testo.indexOf("<body")) + 1, testo.lastIndexOf("</body>"));
  const cartella = posix.dirname(chiave);

  /* le immagini delle città: invece del file, un segno che il programma riempie da solo */
  corpo = corpo.replace(/<img([^>]*?)src="[^"]*immagini\/citta\/([a-z]+)\.svg"([^>]*)>/g,
    (t, a, slug, b) => `<img${a}data-citta="${slug}"${b}>`);

  /* i collegamenti fra le pagine diventano salti dentro questo stesso file */
  corpo = corpo.replace(/href="([^"]+)"/g, (t, via) => {
    if(/^(https?:|mailto:|tel:|#|data:|\/\/)/.test(via)) return t;
    if(!via.endsWith(".html")) return 'href="#!' + chiave + '"';   /* file che qui dentro non c'è: resta dov'è */
    return 'href="#!' + posix.normalize(posix.join(cartella, via)) + '"';
  });
  return { classe, corpo };
}

/* --- le immagini, una volta sola --- */
const citta = {};
const cartellaCitta = join(QUI, "immagini", "citta");
for(const f of readdirSync(cartellaCitta).filter(x => x.endsWith(".svg")))
  citta[f.replace(".svg", "")] = "data:image/svg+xml;base64," +
    Buffer.from(readFileSync(join(cartellaCitta, f))).toString("base64");

/* --- le due grafiche --- */
const temi = {
  vetrina: {
    nome: "Vetrina",
    css: readFileSync(join(QUI, "temi", "vetrina.css"), "utf8"),
    caratteri: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
  },
  moderna: {
    nome: "Moderna",
    css: readFileSync(join(QUI, "temi", "moderna.css"), "utf8"),
    caratteri: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Space+Grotesk:wght@600;700&display=swap"
  }
};

/* dentro le pagine ci sono altri <script>: vanno mascherati, se no il browser
   crede che il nostro sia finito lì */
const dati = JSON.stringify({ pagine, citta, temi, lingue: LINGUE.map(l => ({ id:l.id, nome:l.nome, flag:l.flag })) })
  .replace(/<\//g, "<\\/").replace(/<!--/g, "<\\!--");

writeFileSync(FUORI, `<!doctype html>
<html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Tourista Viaggi — il sito, tutto in un file</title>
<link id="caratteri" rel="stylesheet" href="">
<style id="tema"></style>
<style>
 .barra-prova{ position:fixed; left:50%; transform:translateX(-50%); bottom:14px; z-index:9999;
   display:flex; gap:6px; align-items:center; background:rgba(12,18,16,.92); color:#fff;
   border:1px solid rgba(255,255,255,.16); border-radius:99px; padding:6px 8px;
   font:600 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
   box-shadow:0 14px 40px -14px rgba(0,0,0,.7); backdrop-filter:blur(10px); max-width:94vw; overflow-x:auto; }
 .barra-prova b{ font-weight:600; opacity:.55; padding:0 6px; white-space:nowrap; }
 .barra-prova button{ font:inherit; color:#fff; background:transparent; cursor:pointer;
   border:1px solid rgba(255,255,255,.2); border-radius:99px; padding:7px 13px; white-space:nowrap; }
 .barra-prova button[aria-pressed="true"]{ background:#fff; color:#111; border-color:#fff; }
 body{ padding-bottom:62px; }
 @media print{ .barra-prova{ display:none; } body{ padding-bottom:0; } }
</style>
</head>
<body>
<div id="sito"></div>
<div class="barra-prova">
  <b>Anteprima</b>
  <button data-tema="vetrina">Vetrina</button>
  <button data-tema="moderna">Moderna</button>
</div>
<script>
var D = ${dati};
var tema = "vetrina";

function mettiTema(t){
  tema = D.temi[t] ? t : "vetrina";
  document.getElementById("tema").textContent = D.temi[tema].css;
  document.getElementById("caratteri").href = D.temi[tema].caratteri;
  var b = document.querySelectorAll(".barra-prova button");
  for(var i = 0; i < b.length; i++) b[i].setAttribute("aria-pressed", b[i].dataset.tema === tema);
  try{ localStorage.setItem("tourista_anteprima_tema", tema); }catch(e){}
}

function apri(chiave){
  var p = D.pagine[chiave] || D.pagine["it/index.html"];
  document.body.className = p.classe;
  var s = document.getElementById("sito");
  s.innerHTML = p.corpo;
  var img = s.querySelectorAll("img[data-citta]");
  for(var i = 0; i < img.length; i++){
    var u = D.citta[img[i].dataset.citta];
    if(u) img[i].src = u;
  }
  /* gli script dentro le pagine (filtri, domande, modulo) vanno riacceso a mano */
  var sc = s.querySelectorAll("script");
  for(var j = 0; j < sc.length; j++){
    var n = document.createElement("script");
    n.textContent = sc[j].textContent;
    sc[j].parentNode.replaceChild(n, sc[j]);
  }
  window.scrollTo(0, 0);
}

function daIndirizzo(){
  var h = location.hash || "";
  if(h.indexOf("#!") === 0) return apri(h.slice(2));
  if(h.length > 1){                       /* un salto dentro la pagina, non un'altra pagina */
    var e = document.getElementById(h.slice(1));
    if(e) e.scrollIntoView();
    return;
  }
  apri("it/index.html");
}

document.querySelector(".barra-prova").addEventListener("click", function(e){
  var b = e.target.closest("button");
  if(!b) return;
  mettiTema(b.dataset.tema);
});
window.addEventListener("hashchange", daIndirizzo);
try{ mettiTema(localStorage.getItem("tourista_anteprima_tema") || "vetrina"); }
catch(e){ mettiTema("vetrina"); }
daIndirizzo();
</script>
</body></html>
`);

const peso = statSync(FUORI).size;
console.log("Anteprima pronta: sito/anteprima.html · " + (peso / 1024 / 1024).toFixed(1) + " MB");
console.log("Pagine dentro: " + Object.keys(pagine).length + " · immagini: " + Object.keys(citta).length);
console.log("Si apre con un doppio clic. Il volantino A4 resta a parte, in pubblica/<versione>/<lingua>/volantino.html\n");
