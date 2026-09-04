#!/usr/bin/env node
/* ============================================================
   Il generatore del sito.
   Prende i testi da contenuti/<lingua>.mjs e sputa fuori due
   siti completi, uno per ogni versione grafica, in cinque lingue.

       node costruisci.mjs

   Non serve installare niente.
   ============================================================ */
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AGENZIA, LINGUE, VERSIONI, VIAGGI, ARTICOLI, PAGINE } from "./contenuti/comune.mjs";

const QUI = dirname(fileURLToPath(import.meta.url));
const FUORI = join(QUI, "pubblica");

/* --- attrezzi --- */
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const eur = n => "€ " + Number(n).toLocaleString("it-IT");
/* il grassetto **così** e gli a capo */
const ricco = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const su = (n) => n === 0 ? "" : "../".repeat(n);

function scrivi(dove, testo){
  mkdirSync(dirname(dove), { recursive: true });
  writeFileSync(dove, testo);
}

/* ============================================================
   La pagina: testa, barra in alto, piede
   ============================================================ */
function pagina(o){
  /* o = { versione, lingua, T, id, prof, titolo, descrizione, corpo, schema, viaFile, classe } */
  const { versione, lingua, T, prof } = o;
  const b = su(prof);
  const L = LINGUE.find(x => x.id === lingua);
  const alt = LINGUE.map(x =>
    '<link rel="alternate" hreflang="' + x.hreflang + '" href="' + AGENZIA.sito + "/" + x.id + "/" + (o.viaFile || "") + '">').join("\n  ") +
    '\n  <link rel="alternate" hreflang="x-default" href="' + AGENZIA.sito + "/it/" + (o.viaFile || "") + '">';

  const menu = [
    ["home", "index.html", T.nav.home],
    ["viaggi", "viaggi/index.html", T.nav.viaggi],
    ["gruppi", "gruppi.html", T.nav.gruppi],
    ["chi", "chi-siamo.html", T.nav.chi],
    ["faq", "faq.html", T.nav.faq],
    ["blog", "blog/index.html", T.nav.blog],
    ["contatti", "contatti.html", T.nav.contatti]
  ];

  return `<!doctype html>
<html lang="${lingua}" dir="${T.dir || "ltr"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(o.titolo)}</title>
<meta name="description" content="${esc(o.descrizione)}">
<link rel="canonical" href="${AGENZIA.sito}/${lingua}/${o.viaFile || ""}">
  ${alt}
<meta name="theme-color" content="${versione === "moderna" ? "#0B1220" : "#0E6E7A"}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(AGENZIA.nome)}">
<meta property="og:locale" content="${L.locale}">
<meta property="og:title" content="${esc(o.titolo)}">
<meta property="og:description" content="${esc(o.descrizione)}">
<meta property="og:url" content="${AGENZIA.sito}/${lingua}/${o.viaFile || ""}">
<meta property="og:image" content="${AGENZIA.sito}/social.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${b}../icona.png">
<link rel="apple-touch-icon" href="${b}../icona.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" media="print" onload="this.media='all'" href="${o.font}">
<noscript><link rel="stylesheet" href="${o.font}"></noscript>
<link rel="stylesheet" href="${b}../tema.css">
${o.schema ? '<script type="application/ld+json">' + JSON.stringify(o.schema) + "</script>" : ""}
</head>
<body class="p-${o.id}${o.classe ? " " + o.classe : ""}">
<a class="salta" href="#dentro">${esc(T.comune.vaiA)}</a>

<header class="testa">
  <div class="riga">
    <a class="marchio" href="${b}index.html">
      <span class="marchio-segno" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>
        </svg>
      </span>
      <span class="marchio-testo"><b>${esc(AGENZIA.nome)}</b><small>${esc(T.seo.sito.split("—")[1] || "")}</small></span>
    </a>
    <input type="checkbox" id="apri-menu" class="apri-menu" hidden>
    <label for="apri-menu" class="bottone-menu" aria-label="${esc(T.comune.menu)}"><span></span></label>
    <nav class="navigazione" aria-label="${esc(T.comune.menu)}">
      ${menu.map(m => '<a href="' + b + m[1] + '"' + (m[0] === o.id ? ' aria-current="page"' : "") + ">" + esc(m[2]) + "</a>").join("\n      ")}
      <div class="lingue">
        ${LINGUE.map(x => '<a href="' + su(prof) + "../" + x.id + "/" + (o.viaFile || "") + '" hreflang="' + x.id + '" title="' + esc(x.nome) + '"' + (x.id === lingua ? ' class="qui"' : "") + ">" + x.flag + "</a>").join("\n        ")}
      </div>
      <a class="bottone piccolo" href="${b}contatti.html">${esc(T.nav.preventivo)}</a>
    </nav>
  </div>
</header>

<main id="dentro">
${o.corpo}
</main>

<footer class="piede">
  <div class="riga piede-griglia">
    <div>
      <div class="piede-marchio">${esc(AGENZIA.nome)}</div>
      <p>${esc(T.footer.descrizione)}</p>
      <div class="piede-social">
        <a href="${AGENZIA.social.facebook}" rel="noopener">Facebook</a>
        <a href="${AGENZIA.social.instagram}" rel="noopener">Instagram</a>
      </div>
    </div>
    <div>
      <h3>${esc(T.footer.navigazione)}</h3>
      ${menu.map(m => '<a href="' + b + m[1] + '">' + esc(m[2]) + "</a>").join("\n      ")}
    </div>
    <div>
      <h3>${esc(T.footer.contatti)}</h3>
      <a href="tel:${AGENZIA.tel.replace(/\s/g, "")}">${esc(AGENZIA.telScritto)}</a>
      <a href="mailto:${AGENZIA.email}">${esc(AGENZIA.email)}</a>
      <a href="https://wa.me/${AGENZIA.whatsapp}" rel="noopener">WhatsApp</a>
      <p class="piccolo">${esc(AGENZIA.indirizzo)}<br>${esc(AGENZIA.cap)} ${esc(AGENZIA.citta)}</p>
    </div>
    <div>
      <h3>${esc(T.footer.legale)}</h3>
      <p class="piccolo">P.IVA ${esc(AGENZIA.piva)}<br>${esc(AGENZIA.licenza)}<br>${esc(AGENZIA.polizza)}</p>
      <a href="${b}privacy.html">${esc(T.privacy.h1)}</a>
    </div>
  </div>
  <div class="riga piede-sotto">
    <span>© ${new Date().getFullYear()} ${esc(AGENZIA.nome)} — ${esc(T.footer.diritti)}</span>
    <span class="piede-lingue">${LINGUE.map(x => '<a href="' + su(prof) + "../" + x.id + "/" + (o.viaFile || "") + '">' + x.flag + " " + esc(x.nome) + "</a>").join(" ")}</span>
  </div>
</footer>
</body>
</html>`;
}

/* ============================================================
   I pezzi che si ripetono
   ============================================================ */
const gradiente = g => "linear-gradient(135deg," + g[0] + " 0%," + g[1] + " 100%)";

function scheda(v, T, b, tema){
  const t = T.trips[v.slug];
  return `<a class="scheda" href="${b}viaggi/${v.slug}.html">
  <div class="scheda-cima" style="background:${gradiente(v.grad)}">
    <span class="scheda-flag">${v.flag}</span>
    <span class="scheda-etichetta">${v.giorni} ${esc(T.comune.giorni)}</span>
  </div>
  <div class="scheda-corpo">
    <h3>${esc(t.nome)}</h3>
    <p>${esc(t.sommario)}</p>
  </div>
  <div class="scheda-piede">
    <span class="prezzo"><small>${esc(T.comune.da)}</small> ${eur(v.da)}</span>
    <span class="scheda-mezzo">${v.mezzo === "bus" ? "🚌 " + esc(T.comune.bus) : "✈️ " + esc(T.comune.volo)}</span>
  </div>
</a>`;
}

function ctaFinale(T, b){
  return `<section class="fascia-cta">
  <div class="riga stretta centro">
    <h2>${esc(T.home.ctaTitolo)}</h2>
    <p class="grande">${esc(T.home.ctaSotto)}</p>
    <div class="bottoni centro">
      <a class="bottone" href="${b}contatti.html">${esc(T.home.ctaBottone)}</a>
      <a class="bottone vuoto" href="tel:${AGENZIA.tel.replace(/\s/g, "")}">${esc(T.comune.chiama)} ${esc(AGENZIA.telScritto)}</a>
    </div>
  </div>
</section>`;
}

function briciole(T, b, voci){
  return `<nav class="briciole"><div class="riga">
    <a href="${b}index.html">${esc(T.nav.home)}</a>
    ${voci.map(v => "<span>›</span>" + (v.href ? '<a href="' + v.href + '">' + esc(v.t) + "</a>" : "<b>" + esc(v.t) + "</b>")).join("")}
  </div></nav>`;
}

/* ============================================================
   LE PAGINE
   ============================================================ */
function paginaHome(T, v, b, tema){
  const H = T.home;
  return `
<section class="eroe">
  <div class="eroe-sfondo" aria-hidden="true"></div>
  <div class="riga eroe-dentro">
    <p class="occhiello">${esc(H.occhiello)}</p>
    <h1>${esc(H.h1)}</h1>
    <p class="grande">${esc(H.sotto)}</p>
    <div class="bottoni">
      <a class="bottone" href="${b}contatti.html">${esc(H.cta1)}</a>
      <a class="bottone vuoto" href="${b}viaggi/index.html">${esc(H.cta2)}</a>
    </div>
    <p class="fiducia">${esc(H.fiducia)}</p>
  </div>
  <div class="eroe-slogan" aria-hidden="true"><span>${esc(T.slogan[0])}</span></div>
</section>

<section class="sezione">
  <div class="riga">
    <h2 class="titolo-sezione">${esc(H.valoriTitolo)}</h2>
    <div class="griglia quattro">
      ${H.valori.map((x, i) => `<article class="valore">
        <span class="valore-numero">0${i + 1}</span>
        <h3>${esc(x.t)}</h3>
        <p>${esc(x.x)}</p>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="sezione chiara">
  <div class="riga">
    <div class="testa-sezione">
      <div>
        <h2 class="titolo-sezione">${esc(H.viaggiTitolo)}</h2>
        <p class="sotto-sezione">${esc(H.viaggiSotto)}</p>
      </div>
      <a class="collegamento" href="${b}viaggi/index.html">${esc(T.comune.tutti)} →</a>
    </div>
    <div class="griglia tre">
      ${VIAGGI.map(x => scheda(x, T, b, tema)).join("\n      ")}
    </div>
  </div>
</section>

<section class="sezione">
  <div class="riga">
    <h2 class="titolo-sezione">${esc(H.comeTitolo)}</h2>
    <p class="sotto-sezione">${esc(H.comeSotto)}</p>
    <ol class="passi">
      ${H.passi.map((x, i) => `<li><span class="passo-numero">${i + 1}</span><div><h3>${esc(x.t)}</h3><p>${esc(x.x)}</p></div></li>`).join("\n      ")}
    </ol>
  </div>
</section>

<section class="sezione scura">
  <div class="riga">
    <h2 class="titolo-sezione">${esc(H.gruppiTitolo)}</h2>
    <p class="sotto-sezione">${esc(H.gruppiSotto)}</p>
    <div class="griglia quattro">
      ${H.gruppi.map(x => `<article class="gruppo"><h3>${esc(x.t)}</h3><p>${esc(x.x)}</p></article>`).join("\n      ")}
    </div>
    <div class="bottoni centro"><a class="bottone chiaro" href="${b}gruppi.html">${esc(T.nav.gruppi)} →</a></div>
  </div>
</section>

<section class="sezione numeri-sezione">
  <div class="riga">
    <h2 class="titolo-sezione centro">${esc(H.numeriTitolo)}</h2>
    <div class="numeri">
      ${H.numeri.map(x => `<div class="numero"><b>${esc(x.n)}</b><span>${esc(x.t)}</span></div>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="sezione chiara">
  <div class="riga">
    <h2 class="titolo-sezione">${esc(H.voceTitolo)}</h2>
    <div class="griglia tre">
      ${H.voci.map(x => `<figure class="voce">
        <blockquote>${esc(x.testo)}</blockquote>
        <figcaption><b>${esc(x.chi)}</b><span>${esc(x.dove)}</span></figcaption>
      </figure>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="sezione">
  <div class="riga">
    <div class="testa-sezione">
      <div>
        <h2 class="titolo-sezione">${esc(H.blogTitolo)}</h2>
        <p class="sotto-sezione">${esc(H.blogSotto)}</p>
      </div>
      <a class="collegamento" href="${b}blog/index.html">${esc(T.nav.blog)} →</a>
    </div>
    <div class="griglia tre">
      ${ARTICOLI.map(a => {
        const t = T.blog.articoli[a.slug];
        return `<a class="scheda-blog" href="${b}blog/${a.slug}.html">
        <div class="scheda-cima piccola" style="background:${gradiente(a.grad)}"></div>
        <div class="scheda-corpo"><h3>${esc(t.titolo)}</h3><p>${esc(t.sommario)}</p>
        <span class="minuti">${a.minuti} ${esc(T.comune.minuti)}</span></div></a>`;
      }).join("\n      ")}
    </div>
  </div>
</section>

${ctaFinale(T, b)}`;
}

function paginaViaggi(T, b, tema){
  const V = T.viaggi;
  return `
${briciole(T, b, [{ t: T.nav.viaggi }])}
<section class="testata">
  <div class="riga stretta">
    <h1>${esc(V.h1)}</h1>
    <p class="grande">${esc(V.intro)}</p>
  </div>
</section>
<section class="sezione">
  <div class="riga">
    <div class="filtri">
      <button class="filtro attivo" data-f="tutti">${esc(V.filtroTutti)}</button>
      <button class="filtro" data-f="bus">${esc(V.filtroBus)}</button>
      <button class="filtro" data-f="volo">${esc(V.filtroVolo)}</button>
    </div>
    <div class="griglia tre" id="elenco-viaggi">
      ${VIAGGI.map(x => scheda(x, T, b, tema).replace('class="scheda"', 'class="scheda" data-mezzo="' + x.mezzo + '"')).join("\n      ")}
    </div>
  </div>
</section>
<section class="sezione chiara">
  <div class="riga stretta centro">
    <h2>${esc(V.suMisuraTitolo)}</h2>
    <p class="grande">${esc(V.suMisuraTesto)}</p>
    <div class="bottoni centro"><a class="bottone" href="${b}contatti.html">${esc(V.suMisuraBottone)}</a></div>
  </div>
</section>
<script>
document.querySelectorAll(".filtro").forEach(function(f){
  f.addEventListener("click", function(){
    document.querySelectorAll(".filtro").forEach(function(x){ x.classList.remove("attivo"); });
    f.classList.add("attivo");
    var q = f.dataset.f;
    document.querySelectorAll("#elenco-viaggi .scheda").forEach(function(s){
      s.hidden = (q !== "tutti" && s.dataset.mezzo !== q);
    });
  });
});
</script>`;
}

function paginaViaggio(T, v, b, tema){
  const t = T.trips[v.slug];
  const V = T.viaggio;
  return `
${briciole(T, b, [{ t: T.nav.viaggi, href: b + "viaggi/index.html" }, { t: t.nome }])}
<section class="eroe-viaggio" style="background:${gradiente(v.grad)}">
  <div class="riga">
    <span class="eroe-flag">${v.flag}</span>
    <p class="occhiello chiaro">${esc(t.occhiello)}</p>
    <h1>${esc(t.nome)}</h1>
    <p class="grande">${esc(t.sommario)}</p>
    <div class="eroe-dati">
      <div><b>${v.giorni}</b><span>${esc(T.comune.giorni)}</span></div>
      <div><b>${v.notti}</b><span>${esc(T.comune.notti)}</span></div>
      <div><b>${eur(v.da)}</b><span>${esc(V.daPersona)}</span></div>
      <div><b>${v.min}</b><span>${esc(V.minimo)}</span></div>
    </div>
  </div>
</section>

<section class="sezione">
  <div class="riga due-colonne">
    <div>
      <p class="grande">${esc(t.testo)}</p>
      <h2 class="titolo-sezione">${esc(T.comune.programma)}</h2>
      <ol class="programma">
        ${t.giorni.map((g, i) => {
          const p = g.split("—");
          return `<li><span class="giorno">${esc(T.comune.giorni.slice(0, 1).toUpperCase() + ". " + (i + 1))}</span>
          <div><b>${esc(p[0].trim())}</b>${p[1] ? "<p>" + esc(p.slice(1).join("—").trim()) + "</p>" : ""}</div></li>`;
        }).join("\n        ")}
      </ol>
      <div class="due-liste">
        <div class="lista-si">
          <h3>${esc(T.comune.incluso)}</h3>
          <ul>${t.incluso.map(x => "<li>" + esc(x) + "</li>").join("")}</ul>
        </div>
        <div class="lista-no">
          <h3>${esc(T.comune.nonIncluso)}</h3>
          <ul>${t.nonIncluso.map(x => "<li>" + esc(x) + "</li>").join("")}</ul>
        </div>
      </div>
    </div>
    <aside class="lato">
      <div class="riquadro">
        <span class="riquadro-occhiello">${esc(T.comune.da)}</span>
        <div class="riquadro-prezzo">${eur(v.da)}</div>
        <p class="piccolo">${esc(V.daPersona)}</p>
        <dl>
          <dt>${esc(T.comune.partenze)}</dt><dd>${esc(t.quando)}</dd>
          <dt>${esc(V.minimo)}</dt><dd>${v.min} ${esc(T.comune.persona.replace("a ", ""))}</dd>
          <dt>${esc(T.comune.posti)}</dt><dd>${v.posti}</dd>
          <dt>${esc(V.partenzeDa)}</dt><dd>${esc(AGENZIA.citta)}</dd>
        </dl>
        <a class="bottone largo" href="${b}contatti.html">${esc(V.chiediBottone)}</a>
        <p class="piccolo">${esc(V.chiediTesto)}</p>
        <a class="bottone vuoto largo" href="https://wa.me/${AGENZIA.whatsapp}" rel="noopener">${esc(T.comune.whatsapp)}</a>
      </div>
      <div class="riquadro morbido">
        <p>${esc(V.personalizza)}</p>
        <a class="collegamento" href="${b}gruppi.html">${esc(T.nav.gruppi)} →</a>
      </div>
    </aside>
  </div>
</section>

<section class="sezione chiara">
  <div class="riga">
    <h2 class="titolo-sezione">${esc(T.comune.altriViaggi)}</h2>
    <div class="griglia tre">
      ${VIAGGI.filter(x => x.slug !== v.slug).slice(0, 3).map(x => scheda(x, T, b, tema)).join("\n      ")}
    </div>
  </div>
</section>
${ctaFinale(T, b)}`;
}

function paginaGruppi(T, b){
  const G = T.gruppi;
  return `
${briciole(T, b, [{ t: T.nav.gruppi }])}
<section class="testata">
  <div class="riga stretta">
    <h1>${esc(G.h1)}</h1>
    <p class="grande">${esc(G.intro)}</p>
  </div>
</section>
<section class="sezione">
  <div class="riga">
    <div class="griglia due">
      ${G.blocchi.map(x => `<article class="blocco">
        <h2>${esc(x.t)}</h2>
        <p>${esc(x.x)}</p>
        <ul class="spunte">${x.punti.map(p => "<li>" + esc(p) + "</li>").join("")}</ul>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>
<section class="sezione scura">
  <div class="riga">
    <h2 class="titolo-sezione">${esc(G.garanzieTitolo)}</h2>
    <div class="griglia quattro">
      ${G.garanzie.map(x => `<article class="gruppo"><h3>${esc(x.t)}</h3><p>${esc(x.x)}</p></article>`).join("\n      ")}
    </div>
  </div>
</section>
<section class="sezione">
  <div class="riga stretta centro">
    <h2>${esc(G.comeTitolo)}</h2>
    <p class="grande">${esc(G.comeTesto)}</p>
    <div class="bottoni centro"><a class="bottone" href="${b}contatti.html">${esc(G.ctaTitolo)}</a></div>
    <p>${esc(G.ctaTesto)}</p>
  </div>
</section>`;
}

function paginaChi(T, b){
  const C = T.chi;
  return `
${briciole(T, b, [{ t: T.nav.chi }])}
<section class="testata">
  <div class="riga stretta">
    <h1>${esc(C.h1)}</h1>
    <p class="grande">${esc(C.intro)}</p>
  </div>
</section>
<section class="sezione">
  <div class="riga stretta prosa">
    ${C.storia.map(p => "<p>" + esc(p) + "</p>").join("\n    ")}
  </div>
</section>
<section class="sezione chiara">
  <div class="riga">
    <h2 class="titolo-sezione">${esc(C.squadraTitolo)}</h2>
    <div class="griglia tre">
      ${C.squadra.map(p => `<article class="persona">
        <div class="iniziali">${esc(p.n.split(" ").map(x => x[0]).join(""))}</div>
        <h3>${esc(p.n)}</h3><span class="ruolo">${esc(p.r)}</span><p>${esc(p.x)}</p>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>
<section class="sezione">
  <div class="riga">
    <h2 class="titolo-sezione">${esc(C.valoriTitolo)}</h2>
    <div class="griglia tre">
      ${C.valori.map(x => `<article class="valore"><h3>${esc(x.t)}</h3><p>${esc(x.x)}</p></article>`).join("\n      ")}
    </div>
  </div>
</section>
${ctaFinale(T, b)}`;
}

function paginaFaq(T, b){
  const F = T.faq;
  return `
${briciole(T, b, [{ t: T.nav.faq }])}
<section class="testata">
  <div class="riga stretta">
    <h1>${esc(F.h1)}</h1>
    <p class="grande">${esc(F.intro)}</p>
  </div>
</section>
<section class="sezione">
  <div class="riga stretta">
    ${F.voci.map(x => `<details class="domanda">
      <summary>${esc(x.d)}</summary>
      <div class="risposta"><p>${esc(x.r)}</p></div>
    </details>`).join("\n    ")}
  </div>
</section>
${ctaFinale(T, b)}`;
}

function paginaBlog(T, b){
  const B = T.blog;
  return `
${briciole(T, b, [{ t: T.nav.blog }])}
<section class="testata">
  <div class="riga stretta">
    <h1>${esc(B.h1)}</h1>
    <p class="grande">${esc(B.intro)}</p>
  </div>
</section>
<section class="sezione">
  <div class="riga">
    <div class="griglia tre">
      ${ARTICOLI.map(a => {
        const t = B.articoli[a.slug];
        return `<a class="scheda-blog" href="${b}blog/${a.slug}.html">
        <div class="scheda-cima piccola" style="background:${gradiente(a.grad)}"></div>
        <div class="scheda-corpo">
          <h3>${esc(t.titolo)}</h3><p>${esc(t.sommario)}</p>
          <span class="minuti">${a.minuti} ${esc(T.comune.minuti)}</span>
        </div></a>`;
      }).join("\n      ")}
    </div>
  </div>
</section>
${ctaFinale(T, b)}`;
}

function paginaArticolo(T, a, b){
  const t = T.blog.articoli[a.slug];
  return `
${briciole(T, b, [{ t: T.nav.blog, href: b + "blog/index.html" }, { t: t.titolo }])}
<article class="articolo">
  <header class="articolo-testa" style="background:${gradiente(a.grad)}">
    <div class="riga stretta">
      <h1>${esc(t.titolo)}</h1>
      <p class="grande">${esc(t.sommario)}</p>
      <p class="articolo-dati">${esc(AGENZIA.nome)} · ${a.data} · ${a.minuti} ${esc(T.comune.minuti)}</p>
    </div>
  </header>
  <div class="riga stretta prosa">
    ${t.corpo.map(p => "<p>" + ricco(p) + "</p>").join("\n    ")}
  </div>
</article>
${ctaFinale(T, b)}`;
}

function paginaContatti(T, b){
  const C = T.contatti;
  const c = C.campi;
  return `
${briciole(T, b, [{ t: T.nav.contatti }])}
<section class="testata">
  <div class="riga stretta">
    <h1>${esc(C.h1)}</h1>
    <p class="grande">${esc(C.intro)}</p>
  </div>
</section>
<section class="sezione">
  <div class="riga due-colonne">
    <div>
      <h2 class="titolo-sezione">${esc(C.formTitolo)}</h2>
      <form class="modulo" method="post" action="mailto:${AGENZIA.email}" enctype="text/plain">
        <div class="campo"><label for="f-nome">${esc(c.nome)}</label><input id="f-nome" name="nome" required></div>
        <div class="campo"><label for="f-ente">${esc(c.ente)}</label><input id="f-ente" name="ente"></div>
        <div class="due">
          <div class="campo"><label for="f-tel">${esc(c.tel)}</label><input id="f-tel" name="telefono" type="tel" required></div>
          <div class="campo"><label for="f-mail">${esc(c.email)}</label><input id="f-mail" name="email" type="email"></div>
        </div>
        <div class="due">
          <div class="campo"><label for="f-dove">${esc(c.dove)}</label><input id="f-dove" name="dove"></div>
          <div class="campo"><label for="f-quando">${esc(c.quando)}</label><input id="f-quando" name="quando"></div>
        </div>
        <div class="campo"><label for="f-quanti">${esc(c.quanti)}</label><input id="f-quanti" name="quanti" type="number" min="1"></div>
        <div class="campo"><label for="f-note">${esc(c.note)}</label><textarea id="f-note" name="note" rows="4"></textarea></div>
        <label class="spunta-riga"><input type="checkbox" required> <span>${esc(c.privacy)}</span></label>
        <button class="bottone largo" type="submit">${esc(c.invia)}</button>
      </form>
    </div>
    <aside class="lato">
      <div class="riquadro">
        <h3>${esc(C.ufficioTitolo)}</h3>
        <p>${esc(AGENZIA.indirizzo)}<br>${esc(AGENZIA.cap)} ${esc(AGENZIA.citta)}</p>
        <h3>${esc(C.orariTitolo)}</h3>
        <dl>${AGENZIA.orari.map(o => "<dt>" + esc(o[0]) + "</dt><dd>" + esc(o[1]) + "</dd>").join("")}</dl>
        <h3>${esc(C.telefonoTitolo)}</h3>
        <p class="piccolo">${esc(C.telefonoTesto)}</p>
        <a class="bottone largo" href="tel:${AGENZIA.tel.replace(/\s/g, "")}">${esc(AGENZIA.telScritto)}</a>
        <a class="bottone vuoto largo" href="https://wa.me/${AGENZIA.whatsapp}" rel="noopener">${esc(T.comune.whatsapp)}</a>
        <a class="bottone vuoto largo" href="mailto:${AGENZIA.email}">${esc(AGENZIA.email)}</a>
      </div>
      <div class="riquadro morbido">
        <h3>${esc(C.mappaTitolo)}</h3>
        <p class="piccolo">${esc(C.mappaTesto)}</p>
      </div>
    </aside>
  </div>
</section>`;
}

function paginaPrivacy(T, b){
  const P = T.privacy;
  return `
${briciole(T, b, [{ t: P.h1 }])}
<section class="testata">
  <div class="riga stretta"><h1>${esc(P.h1)}</h1><p class="piccolo">${esc(P.aggiornata)}</p></div>
</section>
<section class="sezione">
  <div class="riga stretta prosa">
    ${P.sezioni.map(s => "<h2>" + esc(s.t) + "</h2><p>" + esc(s.x) + "</p>").join("\n    ")}
  </div>
</section>`;
}

function pagina404(T, b){
  const E = T.errore404;
  return `
<section class="testata centro" style="padding:14vh 0">
  <div class="riga stretta centro">
    <p class="occhiello">404</p>
    <h1>${esc(E.h1)}</h1>
    <p class="grande">${esc(E.testo)}</p>
    <div class="bottoni centro"><a class="bottone" href="${b}index.html">${esc(E.bottone)}</a>
    <a class="bottone vuoto" href="${b}viaggi/index.html">${esc(T.nav.viaggi)}</a></div>
  </div>
</section>`;
}

/* --- il volantino da stampare e appendere in bacheca --- */
function paginaVolantino(T, lingua, versione){
  const V = T.volantino;
  return `<!doctype html>
<html lang="${lingua}" dir="${T.dir || "ltr"}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(V.titolo)} — ${esc(AGENZIA.nome)}</title>
<meta name="robots" content="noindex">
<style>
  @page{ size:A4; margin:12mm; }
  *{ box-sizing:border-box; }
  body{ margin:0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; color:#14201f; background:#eceae5; }
  .foglio{ width:210mm; min-height:297mm; margin:14px auto; background:#fff; padding:14mm 13mm; box-shadow:0 10px 40px rgba(0,0,0,.18); }
  .cima{ display:flex; align-items:flex-start; gap:10mm; border-bottom:2pt solid #0E6E7A; padding-bottom:5mm; }
  .cima h1{ font-size:30pt; line-height:1.02; margin:0; letter-spacing:-.02em; }
  .cima .occhiello{ font-size:10pt; letter-spacing:.18em; text-transform:uppercase; color:#0E6E7A; margin:0 0 3mm; font-weight:700; }
  .sotto{ font-size:12.5pt; color:#4a5754; margin:4mm 0 7mm; }
  .viaggi{ display:grid; grid-template-columns:1fr 1fr; gap:5mm; }
  .v{ border:.6pt solid #cfd6d4; border-radius:4mm; overflow:hidden; }
  .v .testa{ height:16mm; display:flex; align-items:center; padding:0 5mm; color:#fff; font-weight:800; font-size:12pt; gap:3mm; }
  .v .corpo{ padding:4mm 5mm 5mm; }
  .v h3{ margin:0 0 1mm; font-size:12pt; }
  .v p{ margin:0; font-size:9.5pt; color:#4a5754; line-height:1.35; }
  .v .prezzo{ margin-top:3mm; font-size:14pt; font-weight:800; color:#0E6E7A; }
  .v .prezzo small{ font-size:8.5pt; color:#4a5754; font-weight:600; }
  .punti{ margin:7mm 0; padding:5mm 6mm; background:#f2f6f5; border-radius:4mm; }
  .punti h2{ margin:0 0 3mm; font-size:12pt; }
  .punti ul{ margin:0; padding-left:5mm; columns:2; font-size:10pt; line-height:1.7; }
  .piede{ margin-top:auto; border-top:1.5pt solid #0E6E7A; padding-top:5mm; display:flex; gap:8mm; align-items:flex-end; }
  .piede b{ font-size:15pt; display:block; }
  .piede .rec{ font-size:10.5pt; line-height:1.5; }
  .piede .legale{ font-size:7pt; color:#69736f; margin-top:3mm; }
  .taglia{ text-align:center; font-size:8pt; color:#8a938f; margin-top:4mm; letter-spacing:.1em; text-transform:uppercase; }
  /* sul telefono il foglio si restringe: sulla carta resta un A4 */
  @media(max-width:820px){
    body{ background:#fff; }
    .foglio{ width:auto; min-height:0; margin:0; padding:16px; box-shadow:none; }
    .cima h1{ font-size:26pt; }
    .viaggi{ grid-template-columns:1fr; }
    .punti ul{ columns:1; }
    .piede{ flex-direction:column; gap:14px; align-items:flex-start; }
    .piede div[style]{ margin-left:0 !important; text-align:left !important; max-width:none !important; }
  }
  @media print{ body{ background:#fff; } .foglio{ box-shadow:none; margin:0; width:auto; min-height:0; padding:0; } }
</style></head>
<body>
<div class="foglio">
  <div class="cima">
    <div>
      <p class="occhiello">${esc(V.occhiello)} · ${esc(AGENZIA.nome)}</p>
      <h1>${esc(V.intestazione)}</h1>
    </div>
  </div>
  <p class="sotto">${esc(V.sottotitolo)} — ${esc(T.slogan[1])}</p>
  <div class="viaggi">
    ${VIAGGI.slice(0, 4).map(v => {
      const t = T.trips[v.slug];
      return `<div class="v">
      <div class="testa" style="background:${gradiente(v.grad)}"><span>${v.flag}</span><span>${v.giorni} ${esc(T.comune.giorni)}</span></div>
      <div class="corpo"><h3>${esc(t.nome)}</h3><p>${esc(t.sommario)}</p>
      <div class="prezzo">${eur(v.da)} <small>${esc(T.comune.persona)}</small></div></div></div>`;
    }).join("\n    ")}
  </div>
  <div class="punti">
    <h2>${esc(V.puntiTitolo)}</h2>
    <ul>${V.punti.map(p => "<li>" + esc(p) + "</li>").join("")}</ul>
  </div>
  <div class="piede">
    <div class="rec">
      <b>${esc(AGENZIA.nome)}</b>
      ${esc(AGENZIA.indirizzo)}, ${esc(AGENZIA.cap)} ${esc(AGENZIA.citta)}<br>
      ${esc(AGENZIA.telScritto)} · ${esc(AGENZIA.cellScritto)} · ${esc(AGENZIA.email)}<br>
      ${esc(AGENZIA.dominio)}
      <div class="legale">${esc(AGENZIA.licenza)} — ${esc(AGENZIA.polizza)}</div>
    </div>
    <div style="margin-left:auto;text-align:right;font-size:10.5pt;max-width:70mm">${esc(V.come)}</div>
  </div>
  <p class="taglia">${esc(V.taglia)}</p>
</div>
</body></html>`;
}

/* --- i testi pronti per la pubblicità --- */
function paginaPubblicita(T, b){
  const P = T.pubblicita;
  const box = (titolo, testo) => `<div class="riquadro-testo">
    <div class="riquadro-testa"><h3>${esc(titolo)}</h3><button class="copia" data-copia>${esc(T.comune.condividi)}</button></div>
    <pre>${esc(testo)}</pre></div>`;
  return `
${briciole(T, b, [{ t: P.titolo }])}
<section class="testata">
  <div class="riga stretta"><h1>${esc(P.titolo)}</h1><p class="grande">${esc(P.intro)}</p></div>
</section>
<section class="sezione">
  <div class="riga stretta">
    <h2 class="titolo-sezione">${esc(P.slogansTitolo)}</h2>
    <ul class="slogan-elenco">${T.slogan.map(s => "<li>" + esc(s) + "</li>").join("")}</ul>
    ${box(P.whatsappTitolo, P.whatsapp)}
    ${box(P.instagramTitolo, P.instagram)}
    ${box(P.facebookTitolo, P.facebook)}
    ${box(P.emailTitolo, P.email)}
    <div class="riquadro-testo">
      <div class="riquadro-testa"><h3>${esc(P.googleTitolo)}</h3></div>
      <table class="tabella">
        ${P.google.map(g => "<tr><td><b>" + esc(g.t) + "</b></td><td>" + esc(g.d) + "</td></tr>").join("")}
      </table>
    </div>
  </div>
</section>
<script>
document.querySelectorAll("[data-copia]").forEach(function(b){
  b.addEventListener("click", function(){
    var t = b.closest(".riquadro-testo").querySelector("pre").textContent;
    navigator.clipboard && navigator.clipboard.writeText(t);
    var v = b.textContent; b.textContent = "✓"; setTimeout(function(){ b.textContent = v; }, 1200);
  });
});
</script>`;
}

/* ============================================================
   I dati per i motori di ricerca
   ============================================================ */
function schemaAgenzia(T, lingua){
  return {
    "@context":"https://schema.org", "@type":"TravelAgency",
    name: AGENZIA.nome, url: AGENZIA.sito + "/" + lingua + "/",
    description: T.seo.claim, telephone: AGENZIA.tel, email: AGENZIA.email,
    address: { "@type":"PostalAddress", streetAddress: AGENZIA.indirizzo, postalCode: AGENZIA.cap,
      addressLocality: AGENZIA.citta, addressCountry: AGENZIA.paese },
    openingHours: ["Mo-Fr 09:00-13:00", "Mo-Fr 14:30-18:30", "Sa 09:30-12:30"],
    sameAs: [AGENZIA.social.facebook, AGENZIA.social.instagram],
    foundingDate: String(AGENZIA.fondata), priceRange: "€€",
    areaServed: "Italia", knowsLanguage: LINGUE.map(l => l.id)
  };
}
function schemaViaggio(T, v, lingua){
  const t = T.trips[v.slug];
  return {
    "@context":"https://schema.org", "@type":"TouristTrip",
    name: t.nome, description: t.sommario,
    url: AGENZIA.sito + "/" + lingua + "/viaggi/" + v.slug + ".html",
    provider: { "@type":"TravelAgency", name: AGENZIA.nome, url: AGENZIA.sito },
    itinerary: { "@type":"ItemList", numberOfItems: t.giorni.length,
      itemListElement: t.giorni.map((g, i) => ({ "@type":"ListItem", position: i + 1, name: g.split("—")[0].trim() })) },
    offers: { "@type":"Offer", price: v.da, priceCurrency:"EUR", availability:"https://schema.org/InStock",
      url: AGENZIA.sito + "/" + lingua + "/viaggi/" + v.slug + ".html" }
  };
}
function schemaFaq(T){
  return {
    "@context":"https://schema.org", "@type":"FAQPage",
    mainEntity: T.faq.voci.map(v => ({ "@type":"Question", name: v.d,
      acceptedAnswer: { "@type":"Answer", text: v.r } }))
  };
}
function schemaArticolo(T, a, lingua){
  const t = T.blog.articoli[a.slug];
  return {
    "@context":"https://schema.org", "@type":"BlogPosting",
    headline: t.titolo, description: t.sommario, datePublished: a.data, dateModified: a.data,
    inLanguage: lingua, wordCount: t.corpo.join(" ").split(/\s+/).length,
    author: { "@type":"Organization", name: AGENZIA.nome },
    publisher: { "@type":"Organization", name: AGENZIA.nome },
    mainEntityOfPage: AGENZIA.sito + "/" + lingua + "/blog/" + a.slug + ".html"
  };
}

/* ============================================================
   IL GIRO: si costruisce tutto
   ============================================================ */
const FONT = {
  vetrina: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
  moderna: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Space+Grotesk:wght@600;700&display=swap"
};

async function costruisci(){
  rmSync(FUORI, { recursive: true, force: true });
  const lingue = {};
  const mancanti = [];
  for(const l of LINGUE){
    try{
      lingue[l.id] = (await import("./contenuti/" + l.id + ".mjs")).default;
    }catch(e){
      mancanti.push(l.id);   /* una lingua che manca non ferma il sito: si costruisce senza */
    }
  }
  const LING = LINGUE.filter(l => lingue[l.id]);
  if(!LING.length) throw new Error("non c'è nessun file di contenuti in contenuti/");
  let conta = 0;

  for(const V of VERSIONI){
    const radice = join(FUORI, V.id);
    /* il tema */
    cpSync(join(QUI, "temi", V.tema + ".css"), join(radice, "tema.css"));
    if(existsSync(join(QUI, "temi", "icona.png"))) cpSync(join(QUI, "temi", "icona.png"), join(radice, "icona.png"));
    if(existsSync(join(QUI, "temi", "social.png"))) cpSync(join(QUI, "temi", "social.png"), join(radice, "social.png"));

    for(const L of LING){
      const T = lingue[L.id];
      const dentro = (file, prof, o) => {
        scrivi(join(radice, L.id, file), pagina(Object.assign({
          versione: V.id, lingua: L.id, T, prof, viaFile: file, font: FONT[V.tema]
        }, o)));
        conta++;
      };

      dentro("index.html", 0, { id:"home", titolo:T.home.titolo, descrizione:T.home.descrizione,
        corpo: paginaHome(T, V, "", V.tema), schema: schemaAgenzia(T, L.id) });

      dentro("viaggi/index.html", 1, { id:"viaggi", titolo:T.viaggi.titolo, descrizione:T.viaggi.descrizione,
        corpo: paginaViaggi(T, "../", V.tema) });

      for(const v of VIAGGI){
        const t = T.trips[v.slug];
        dentro("viaggi/" + v.slug + ".html", 1, { id:"viaggi",
          titolo: t.nome + " — " + T.comune.da + " " + eur(v.da) + " | " + AGENZIA.nome,
          descrizione: t.sommario, corpo: paginaViaggio(T, v, "../", V.tema), schema: schemaViaggio(T, v, L.id) });
      }

      dentro("gruppi.html", 0, { id:"gruppi", titolo:T.gruppi.titolo, descrizione:T.gruppi.descrizione,
        corpo: paginaGruppi(T, "") });
      dentro("chi-siamo.html", 0, { id:"chi", titolo:T.chi.titolo, descrizione:T.chi.descrizione,
        corpo: paginaChi(T, "") });
      dentro("faq.html", 0, { id:"faq", titolo:T.faq.titolo, descrizione:T.faq.descrizione,
        corpo: paginaFaq(T, ""), schema: schemaFaq(T) });
      dentro("blog/index.html", 1, { id:"blog", titolo:T.blog.titolo, descrizione:T.blog.descrizione,
        corpo: paginaBlog(T, "../") });
      for(const a of ARTICOLI){
        const t = T.blog.articoli[a.slug];
        dentro("blog/" + a.slug + ".html", 1, { id:"blog", titolo: t.titolo + " | " + AGENZIA.nome,
          descrizione: t.sommario, corpo: paginaArticolo(T, a, "../"), schema: schemaArticolo(T, a, L.id) });
      }
      dentro("contatti.html", 0, { id:"contatti", titolo:T.contatti.titolo, descrizione:T.contatti.descrizione,
        corpo: paginaContatti(T, "") });
      dentro("privacy.html", 0, { id:"privacy", titolo:T.privacy.titolo, descrizione:T.privacy.descrizione,
        corpo: paginaPrivacy(T, "") });
      dentro("pubblicita.html", 0, { id:"pubblicita", titolo:T.pubblicita.titolo + " | " + AGENZIA.nome,
        descrizione:T.pubblicita.intro, corpo: paginaPubblicita(T, ""), classe:"pagina-strumenti" });
      dentro("404.html", 0, { id:"errore", titolo:T.errore404.titolo, descrizione:T.errore404.testo,
        corpo: pagina404(T, "") });

      scrivi(join(radice, L.id, "volantino.html"), paginaVolantino(T, L.id, V.id));
      conta++;
    }

    /* la mappa del sito e le regole per i motori */
    const oggi = new Date().toISOString().slice(0, 10);
    const voci = [];
    for(const L of LING){
      for(const p of PAGINE) voci.push({ loc: AGENZIA.sito + "/" + L.id + "/" + p.file, p: p.priorita, c: p.cambia });
      for(const v of VIAGGI) voci.push({ loc: AGENZIA.sito + "/" + L.id + "/viaggi/" + v.slug + ".html", p:"0.8", c:"monthly" });
      for(const a of ARTICOLI) voci.push({ loc: AGENZIA.sito + "/" + L.id + "/blog/" + a.slug + ".html", p:"0.5", c:"yearly" });
    }
    scrivi(join(radice, "sitemap.xml"),
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9"'.replace("sitemap.org/schemas", "sitemaps.org/schemas") +
      ' xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      voci.map(u => "  <url><loc>" + u.loc + "</loc><lastmod>" + oggi + "</lastmod><changefreq>" + u.c +
        "</changefreq><priority>" + u.p + "</priority></url>").join("\n") + "\n</urlset>\n");
    scrivi(join(radice, "robots.txt"),
      "User-agent: *\nAllow: /\nDisallow: /*/pubblicita.html\nDisallow: /*/volantino.html\n\nSitemap: " + AGENZIA.sito + "/sitemap.xml\n");
    scrivi(join(radice, "index.html"),
      '<!doctype html><html lang="it"><head><meta charset="utf-8">' +
      '<title>' + esc(AGENZIA.nome) + '</title><meta name="robots" content="noindex">' +
      '<script>var l=(navigator.language||"it").slice(0,2).toLowerCase();' +
      'var ok=' + JSON.stringify(LINGUE.map(x => x.id)) + ';' +
      'location.replace((ok.indexOf(l)>=0?l:"it")+"/index.html");</script>' +
      '</head><body><p>' + LINGUE.map(x => '<a href="' + x.id + '/index.html">' + x.flag + " " + x.nome + "</a>").join(" · ") +
      '</p></body></html>');
    scrivi(join(radice, "vercel.json"), JSON.stringify({
      $schema:"https://openapi.vercel.sh/vercel.json", cleanUrls:true, trailingSlash:false,
      headers: [{ source:"/(.*)", headers:[{ key:"X-Content-Type-Options", value:"nosniff" }] }]
    }, null, 2));
  }

  /* la pagina che fa scegliere quale delle due versioni */
  scrivi(join(FUORI, "index.html"), sceltaVersione(lingue.it));
  console.log("\n  Sito costruito: " + conta + " pagine · lingue: " + LING.map(l => l.id).join(", ") +
    (mancanti.length ? "  (mancano ancora: " + mancanti.join(", ") + ")" : ""));
  VERSIONI.forEach(v => console.log("  · " + v.id + " → sito/pubblica/" + v.id + "/"));
  console.log("  · la scelta fra le due → sito/pubblica/index.html\n");
}

function sceltaVersione(T){
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(AGENZIA.nome)} — due versioni del sito</title><meta name="robots" content="noindex">
<style>
 body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0d1512;color:#f2f5f4;
   min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px}
 .box{max-width:920px;width:100%}
 h1{font-size:clamp(26px,4vw,40px);margin:0 0 6px;letter-spacing:-.02em}
 p.sotto{color:#9fb0ab;margin:0 0 34px;font-size:16px}
 .due{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
 a.v{display:block;text-decoration:none;color:inherit;border-radius:20px;overflow:hidden;border:1px solid #2a3a35;
   background:#131e1a;transition:transform .2s,border-color .2s}
 a.v:hover{transform:translateY(-4px);border-color:#3FB0BE}
 .cima{height:150px;display:flex;align-items:flex-end;padding:18px 20px;font-weight:800;font-size:20px}
 .uno .cima{background:linear-gradient(135deg,#0E6E7A,#17A79A);color:#fff}
 .due2 .cima{background:linear-gradient(135deg,#5B21B6,#DB2777 60%,#F59E0B);color:#fff}
 .corpo{padding:18px 20px 22px}
 .corpo b{display:block;font-size:17px;margin-bottom:6px}
 .corpo span{color:#9fb0ab;font-size:14px;line-height:1.5;display:block}
 .lingue{margin-top:14px;display:flex;gap:8px;flex-wrap:wrap}
 .lingue a{font-size:13px;color:#9fb0ab;text-decoration:none;border:1px solid #2a3a35;border-radius:99px;padding:3px 10px}
 .lingue a:hover{color:#fff;border-color:#3FB0BE}
</style></head>
<body><div class="box">
  <h1>${esc(AGENZIA.nome)}</h1>
  <p class="sotto">Due versioni dello stesso sito, stessi testi in cinque lingue. Guarda tutte e due e scegli quella che ti piace.</p>
  <div class="due">
    <a class="v uno" href="vetrina/it/index.html">
      <div class="cima">Vetrina</div>
      <div class="corpo"><b>Elegante, da agenzia storica</b>
      <span>Caratteri con le grazie, spazi larghi, colori caldi. Fa pensare a un'agenzia che c'è da vent'anni.</span>
      <div class="lingue">${LINGUE.map(l => '<a href="vetrina/' + l.id + '/index.html">' + l.flag + " " + l.nome + "</a>").join("")}</div></div>
    </a>
    <a class="v due2" href="moderna/it/index.html">
      <div class="cima">Moderna</div>
      <div class="corpo"><b>Colorata, da agenzia giovane</b>
      <span>Sfondo scuro, colori vivi, caratteri grandi. Fa pensare a un'agenzia che si muove in fretta.</span>
      <div class="lingue">${LINGUE.map(l => '<a href="moderna/' + l.id + '/index.html">' + l.flag + " " + l.nome + "</a>").join("")}</div></div>
    </a>
  </div>
</div></body></html>`;
}

costruisci().catch(e => { console.error("\n  ! " + e.message + "\n" + e.stack + "\n"); process.exit(1); });
