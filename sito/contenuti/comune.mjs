/* ============================================================
   I dati che non cambiano da una lingua all'altra:
   l'agenzia, i viaggi, i colori. I testi stanno in it.mjs,
   en.mjs, fr.mjs, es.mjs, pl.mjs.
   ============================================================ */

export const AGENZIA = {
  /* ------------------------------------------------------------
     DA COMPLETARE prima di pubblicare: qui sotto ci sono i dati
     veri dell'agenzia, ma tre cose ancora mancano e sono segnate
     con DA METTERE — via, CAP e città. E i numeri in fondo
     (anni, gruppi, passeggeri) sono ancora quelli di prova:
     vanno sostituiti con i tuoi veri, o tolti.
     ------------------------------------------------------------ */
  nome: "Urania",
  motto: "Lingue, Viaggi, Libertà",
  dominio: "uraniatravel.pl",
  sito: "https://uraniatravel.pl",
  indirizzo: "DA METTERE — via e numero",
  cap: "DA METTERE",
  citta: "DA METTERE",
  paese: "PL",
  tel: "+48 573 533 847",
  telScritto: "+48 573 533 847",
  cell: "+48 573 533 847",
  cellScritto: "+48 573 533 847",
  whatsapp: "48573533847",
  email: "info@uraniatravel.pl",
  piva: "NIP 5632464558",
  licenza: "REGON 543565701",
  polizza: "Garanzia assicurativa Signal Iduna",
  iban: "PL15 1160 2202 0000 0006 9907 4199",
  orari: [["lun–ven", "9:00–17:00"], ["sab", "su appuntamento"]],
  social: {
    facebook: "https://uraniatravel.pl",
    instagram: "https://uraniatravel.pl"
  },
  /* i moduli che il cliente scarica dal sito */
  moduli: [
    { t: "Garanzia assicurativa", u: "https://uraniatravel.pl/wp-content/uploads/2026/03/Signal-Iduna.pdf" },
    { t: "Accordo per le persone fisiche", u: "https://uraniatravel.pl/wp-content/uploads/2026/03/UMOWA-ZGLOSZENIE-INDYWIDUALNA-.docx.pdf" },
    { t: "Ordinare una gita scolastica", u: "https://uraniatravel.pl/wp-content/uploads/2026/03/ZAMOWIENIE-WYCIECZKI-SZKOLNEJ.docx.pdf" },
    { t: "Accordo per le scuole", u: "https://uraniatravel.pl/wp-content/uploads/2026/03/UMOWA-ZGLOSZENIE-SZKOLA.docx.pdf" }
  ],
  fondata: 2026,
  /* NUMERI ANCORA DI PROVA: mettici i tuoi veri o togli la fascia dalla home */
  numeri: { anni: 1, gruppi: 0, passeggeri: 0, destinazioni: 42 }
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
  { slug:"sicilia", citta:"palermo",  flag:"🇮🇹", giorni:8, notti:7, da:890,  mezzo:"bus",  grad:["#B3325F","#E0723F"], tag:["classico","best"], mesi:["04","05","09","10"], min:30, posti:48 },
  { slug:"marocco", citta:"marrakech",  flag:"🇲🇦", giorni:8, notti:7, da:1090, mezzo:"volo", grad:["#C2600F","#E3A93A"], tag:["culturale"],       mesi:["03","06","10","11"], min:25, posti:40 },
  { slug:"praga", citta:"praga",    flag:"🇨🇿", giorni:5, notti:4, da:690,  mezzo:"bus",  grad:["#15588F","#3196D6"], tag:["capodanno"],       mesi:["12"],               min:30, posti:50 },
  { slug:"lourdes", citta:"lourdes",  flag:"🇫🇷", giorni:5, notti:4, da:520,  mezzo:"bus",  grad:["#2F6B57","#6FAE86"], tag:["religioso"],       mesi:["05","09"],          min:35, posti:54 },
  { slug:"grecia", citta:"atene",   flag:"🇬🇷", giorni:7, notti:6, da:1180, mezzo:"volo", grad:["#0E6E7A","#17A79A"], tag:["culturale"],       mesi:["04","07","09"],     min:22, posti:35 },
  { slug:"puglia", citta:"alberobello",   flag:"🇮🇹", giorni:6, notti:5, da:740,  mezzo:"bus",  grad:["#7A2E5C","#C05B96"], tag:["classico"],        mesi:["05","06","09"],     min:30, posti:48 }
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
  { id:"destinazioni", file:"destinazioni.html", priorita:"0.8", cambia:"monthly" },
  { id:"gruppi",   file:"gruppi.html",       priorita:"0.9",  cambia:"monthly" },
  { id:"chi",      file:"chi-siamo.html",    priorita:"0.6",  cambia:"yearly" },
  { id:"faq",      file:"faq.html",          priorita:"0.7",  cambia:"monthly" },
  { id:"blog",     file:"blog/index.html",   priorita:"0.7",  cambia:"weekly" },
  { id:"contatti", file:"contatti.html",     priorita:"0.8",  cambia:"yearly" },
  { id:"privacy",  file:"privacy.html",      priorita:"0.2",  cambia:"yearly" }
];
