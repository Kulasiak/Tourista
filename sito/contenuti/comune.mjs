/* ============================================================
   I dati che non cambiano da una lingua all'altra:
   l'agenzia, i viaggi, i colori. I testi stanno in it.mjs,
   en.mjs, fr.mjs, es.mjs, pl.mjs.
   ============================================================ */

export const AGENZIA = {
  nome: "Tourista Viaggi",
  dominio: "www.touristaviaggi.it",
  sito: "https://www.touristaviaggi.it",
  indirizzo: "via Garibaldi 42",
  cap: "20121",
  citta: "Milano",
  paese: "IT",
  tel: "+39 02 8765 4321",
  telScritto: "02 8765 4321",
  cell: "+39 347 118 2299",
  cellScritto: "347 118 2299",
  whatsapp: "393471182299",
  email: "gruppi@touristaviaggi.it",
  piva: "IT09876543210",
  licenza: "Aut. Prov. Milano n. 442 del 12/03/2016",
  polizza: "Polizza R.C. Nobis n. 1505/2024 — Fondo di garanzia ex art. 47 Cod. Turismo",
  orari: [["lun–ven", "9:00–13:00 · 14:30–18:30"], ["sab", "9:30–12:30"]],
  social: {
    facebook: "https://facebook.com/touristaviaggi",
    instagram: "https://instagram.com/touristaviaggi"
  },
  fondata: 2016,
  numeri: { anni: 10, gruppi: 640, passeggeri: 26400, destinazioni: 38 }
};

export const LINGUE = [
  { id: "it", nome: "Italiano", flag: "🇮🇹", locale: "it_IT", hreflang: "it" },
  { id: "en", nome: "English",  flag: "🇬🇧", locale: "en_GB", hreflang: "en" },
  { id: "fr", nome: "Français", flag: "🇫🇷", locale: "fr_FR", hreflang: "fr" },
  { id: "es", nome: "Español",  flag: "🇪🇸", locale: "es_ES", hreflang: "es" },
  { id: "pl", nome: "Polski",   flag: "🇵🇱", locale: "pl_PL", hreflang: "pl" }
];

export const VERSIONI = [
  { id: "vetrina", tema: "vetrina", nome: "Vetrina" },
  { id: "moderna", tema: "moderna", nome: "Moderna" }
];

/* I viaggi: prezzi, durate e colori stanno qui, i testi nelle lingue */
export const VIAGGI = [
  { slug:"sicilia",  flag:"🇮🇹", giorni:8, notti:7, da:890,  mezzo:"bus",  grad:["#B3325F","#E0723F"], tag:["classico","best"], mesi:["04","05","09","10"], min:30, posti:48 },
  { slug:"marocco",  flag:"🇲🇦", giorni:8, notti:7, da:1090, mezzo:"volo", grad:["#C2600F","#E3A93A"], tag:["culturale"],       mesi:["03","06","10","11"], min:25, posti:40 },
  { slug:"praga",    flag:"🇨🇿", giorni:5, notti:4, da:690,  mezzo:"bus",  grad:["#15588F","#3196D6"], tag:["capodanno"],       mesi:["12"],               min:30, posti:50 },
  { slug:"lourdes",  flag:"🇫🇷", giorni:5, notti:4, da:520,  mezzo:"bus",  grad:["#2F6B57","#6FAE86"], tag:["religioso"],       mesi:["05","09"],          min:35, posti:54 },
  { slug:"grecia",   flag:"🇬🇷", giorni:7, notti:6, da:1180, mezzo:"volo", grad:["#0E6E7A","#17A79A"], tag:["culturale"],       mesi:["04","07","09"],     min:22, posti:35 },
  { slug:"puglia",   flag:"🇮🇹", giorni:6, notti:5, da:740,  mezzo:"bus",  grad:["#7A2E5C","#C05B96"], tag:["classico"],        mesi:["05","06","09"],     min:30, posti:48 }
];

export const ARTICOLI = [
  { slug:"organizzare-viaggio-gruppo", data:"2026-07-14", minuti:6, grad:["#0E6E7A","#17A79A"] },
  { slug:"lourdes-cosa-sapere",        data:"2026-06-02", minuti:5, grad:["#2F6B57","#6FAE86"] },
  { slug:"bus-o-aereo",                data:"2026-05-08", minuti:4, grad:["#C2600F","#E3A93A"] }
];

/* le pagine del sito, con il peso per la mappa del sito */
export const PAGINE = [
  { id:"home",     file:"index.html",        priorita:"1.0",  cambia:"weekly" },
  { id:"viaggi",   file:"viaggi/index.html", priorita:"0.9",  cambia:"weekly" },
  { id:"gruppi",   file:"gruppi.html",       priorita:"0.9",  cambia:"monthly" },
  { id:"chi",      file:"chi-siamo.html",    priorita:"0.6",  cambia:"yearly" },
  { id:"faq",      file:"faq.html",          priorita:"0.7",  cambia:"monthly" },
  { id:"blog",     file:"blog/index.html",   priorita:"0.7",  cambia:"weekly" },
  { id:"contatti", file:"contatti.html",     priorita:"0.8",  cambia:"yearly" },
  { id:"privacy",  file:"privacy.html",      priorita:"0.2",  cambia:"yearly" }
];
