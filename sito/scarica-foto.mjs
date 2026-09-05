#!/usr/bin/env node
/* ============================================================
   SCARICA LE FOTO VERE DELLE CITTÀ

       node scarica-foto.mjs                 tutte quelle che mancano
       node scarica-foto.mjs parigi roma     solo queste
       node scarica-foto.mjs --rifai         riscarica anche quelle che ci sono
       node scarica-foto.mjs --elenco        dice solo cosa farebbe, non scarica

   Le foto arrivano da Wikimedia Commons, che accetta solo immagini
   libere (si possono usare anche per lavoro). Quasi tutte però
   vogliono il nome di chi le ha scattate: il programma lo scrive
   da solo in immagini/foto/crediti.txt — mettilo in fondo al sito.

   Le foto finiscono in sito/immagini/foto/<citta>.jpg.
   Da quel momento il sito usa la foto al posto del disegno:
   basta rilanciare  node costruisci.mjs

   Se una foto non ti piace, cancella il file e rilancia:
   oppure mettici la tua, con lo stesso nome. Il disegno resta
   sempre lì sotto, quindi non si rompe niente.
   ============================================================ */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CITTA } from "./immagini/citta.mjs";

const QUI = dirname(fileURLToPath(import.meta.url));
const FUORI = join(QUI, "immagini", "foto");
const CREDITI = join(FUORI, "crediti.txt");
const API = "https://commons.wikimedia.org/w/api.php";
const CHI_SIAMO = "TouristaViaggi/1.0 (sito dell'agenzia; script per scaricare foto libere)";

const argomenti = process.argv.slice(2);
const rifai  = argomenti.includes("--rifai");
const elenco = argomenti.includes("--elenco");
const scelte = argomenti.filter(a => !a.startsWith("--"));

/* --- attrezzi --- */
const pulisci = s => String(s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const dorme = ms => new Promise(r => setTimeout(r, ms));

async function chiedi(parametri, tentativi = 3){
  const via = API + "?" + new URLSearchParams(parametri).toString();
  for(let n = 1; n <= tentativi; n++){
    try{
      const r = await fetch(via, { headers: { "User-Agent": CHI_SIAMO, "Accept": "application/json" } });
      if(!r.ok) throw new Error("risposta " + r.status);
      return await r.json();
    }catch(e){
      if(n === tentativi) throw e;
      await dorme(1000 * n);      /* aspetta un po' e riprova */
    }
  }
}

/* una foto va bene se è grande, è una foto vera e la licenza è libera */
function vaBene(p){
  const i = (p.imageinfo || [])[0];
  if(!i) return false;
  if(!/\.(jpe?g|png)$/i.test(p.title)) return false;
  if(i.width < 1200) return false;
  const m = i.extmetadata || {};
  const lic = pulisci(m.LicenseShortName && m.LicenseShortName.value).toLowerCase();
  if(!lic) return false;
  if(/fair use|non.?free|no.?commercial|nc\b/.test(lic)) return false;
  return true;
}

async function unaCitta(c){
  const fuori = join(FUORI, c.slug + ".jpg");
  if(existsSync(fuori) && !rifai) return { slug:c.slug, esito:"c'era già" };
  if(elenco) return { slug:c.slug, esito:"cercherei: " + c.cerca };

  const risposta = await chiedi({
    action:"query", format:"json", origin:"*", generator:"search",
    gsrsearch: c.cerca, gsrnamespace:"6", gsrlimit:"12",
    prop:"imageinfo", iiprop:"url|size|extmetadata", iiurlwidth:"1600"
  });
  const pagine = Object.values((risposta && risposta.query && risposta.query.pages) || {});
  const buona = pagine.filter(vaBene).sort((a, b) => b.imageinfo[0].width - a.imageinfo[0].width)[0];
  if(!buona) return { slug:c.slug, esito:"nessuna foto libera trovata" };

  const i = buona.imageinfo[0];
  const r = await fetch(i.thumburl || i.url, { headers: { "User-Agent": CHI_SIAMO } });
  if(!r.ok) return { slug:c.slug, esito:"non si scarica (risposta " + r.status + ")" };
  const dati = Buffer.from(await r.arrayBuffer());
  if(dati.length < 20000) return { slug:c.slug, esito:"file troppo piccolo, lasciato stare" };
  writeFileSync(fuori, dati);

  const m = i.extmetadata || {};
  return {
    slug: c.slug, esito: "scaricata (" + Math.round(dati.length / 1024) + " KB)",
    credito: [c.n[0], "— foto di " + (pulisci(m.Artist && m.Artist.value) || "autore non indicato"),
      "· licenza " + (pulisci(m.LicenseShortName && m.LicenseShortName.value) || "?"),
      "· " + i.descriptionurl].join(" ")
  };
}

async function via(){
  mkdirSync(FUORI, { recursive: true });
  const lista = scelte.length ? CITTA.filter(c => scelte.includes(c.slug)) : CITTA;
  if(!lista.length){
    console.log("Nessuna città con questo nome. I nomi sono:\n  " + CITTA.map(c => c.slug).join(", "));
    return;
  }
  console.log("Città da fare: " + lista.length + (elenco ? "  (solo elenco, non scarico niente)" : ""));
  const crediti = [];
  let fatte = 0, saltate = 0;
  for(const c of lista){
    let esito;
    try{ esito = await unaCitta(c); }
    catch(e){ esito = { slug:c.slug, esito:"non riuscita: " + (e && e.message ? e.message : e) }; }
    if(esito.credito){ crediti.push(esito.credito); fatte++; } else saltate++;
    console.log("  " + esito.slug.padEnd(18) + esito.esito);
    if(!elenco) await dorme(400);      /* non tempestiamo di richieste il sito che ce le regala */
  }
  if(crediti.length){
    const vecchi = existsSync(CREDITI) ? readFileSync(CREDITI, "utf8").split("\n").filter(Boolean) : [];
    const tutti = [...new Set([...vecchi.filter(r => !r.startsWith("Foto ")), ...crediti])].sort();
    writeFileSync(CREDITI, "Foto usate nel sito, con l'autore e la licenza.\n" +
      "Vanno citate: copia questo elenco in fondo al sito o nella pagina Privacy.\n\n" + tutti.join("\n") + "\n");
  }
  console.log("\nScaricate: " + fatte + " · non fatte: " + saltate);
  if(fatte) console.log("Crediti scritti in immagini/foto/crediti.txt — vanno messi sul sito.");
  console.log("Adesso rilancia:  node costruisci.mjs\n");
}

via().catch(e => { console.error("Qualcosa è andato storto: " + e.message); process.exit(1); });
