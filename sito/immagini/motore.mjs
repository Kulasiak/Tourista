/* ============================================================
   IL MOTORE CHE DISEGNA LE CITTÀ
   Ogni città diventa un'illustrazione SVG: cielo, sole o luna,
   acqua, profili di case e il monumento che la fa riconoscere.
   Niente foto, niente diritti d'autore: sono disegni nostri.
   ============================================================ */

/* --- numeri sempre uguali per la stessa città --- */
export function seme(testo){
  let h = 2166136261;
  for(let i = 0; i < testo.length; i++){ h ^= testo.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
const n2 = x => Math.round(x * 10) / 10;

/* --- i cieli --- */
export const CIELI = {
  alba:      { su:"#3B2350", mezzo:"#E0663F", giu:"#FFC98A", astro:"#FFE6B0", luce:"#FF9E4D", stelle:0,  buio:0.86 },
  tramonto:  { su:"#221543", mezzo:"#B33A6B", giu:"#FF9A5C", astro:"#FFD9A0", luce:"#FF7A45", stelle:0,  buio:0.88 },
  giorno:    { su:"#2E86C7", mezzo:"#7FC4EA", giu:"#DCF0FB", astro:"#FFFFFF", luce:"#FFF3C4", stelle:0,  buio:0.72 },
  notte:     { su:"#0A1233", mezzo:"#1B2C63", giu:"#3B558F", astro:"#F6F8FF", luce:"#A9C0FF", stelle:70, buio:0.94 },
  deserto:   { su:"#4A2418", mezzo:"#C2600F", giu:"#F2C579", astro:"#FFE9BC", luce:"#FFB25C", stelle:0,  buio:0.88 },
  tropicale: { su:"#0E3A52", mezzo:"#2E9BB5", giu:"#A9E7DC", astro:"#FFF6D6", luce:"#FFD98A", stelle:0,  buio:0.80 },
  neve:      { su:"#2B3F63", mezzo:"#7C9AC4", giu:"#DCE7F5", astro:"#FFFFFF", luce:"#CFE0FF", stelle:0,  buio:0.78 }
};

/* --- mescolare due colori --- */
function misc(a, b, q){
  const p = c => [parseInt(c.slice(1,3),16), parseInt(c.slice(3,5),16), parseInt(c.slice(5,7),16)];
  const [r1,g1,b1] = p(a), [r2,g2,b2] = p(b);
  const v = (x,y) => Math.round(x + (y - x) * q).toString(16).padStart(2,"0");
  return "#" + v(r1,r2) + v(g1,g2) + v(b1,b2);
}
const scuro = (c, q) => misc(c, "#0A0E1A", q);

/* ============================================================
   I PEZZI DA COSTRUZIONE
   Tutto è disegnato su una tela 1600 × 1000, con l'orizzonte a 700.
   ============================================================ */
export const L = 1600, A = 1000, ORIZ = 700;

/* palazzi normali, quelli che riempiono lo sfondo */
export function fila(r, y, da, a, altMin, altMax, colore, opac, buco){
  let x = da, p = "";
  while(x < a){
    const w = 26 + r() * 62;
    if(buco && x + w > buco[0] && x < buco[1]){ x = buco[1]; continue; }
    const h = altMin + r() * (altMax - altMin);
    const tipo = r();
    if(tipo < 0.12){            /* con la guglia */
      p += `M${n2(x)} ${y} v${n2(-h)} h${n2(w*0.34)} v${n2(-h*0.30)} l${n2(w*0.16)} ${n2(-h*0.22)} l${n2(w*0.16)} ${n2(h*0.22)} v${n2(h*0.30)} h${n2(w*0.34)} v${n2(h)} z`;
    } else if(tipo < 0.24){     /* con il tetto a punta */
      p += `M${n2(x)} ${y} v${n2(-h*0.8)} l${n2(w/2)} ${n2(-h*0.28)} l${n2(w/2)} ${n2(h*0.28)} v${n2(h*0.8)} z`;
    } else if(tipo < 0.34){     /* a gradoni */
      p += `M${n2(x)} ${y} v${n2(-h)} h${n2(w*0.6)} v${n2(h*0.22)} h${n2(w*0.4)} v${n2(h*0.78)} z`;
    } else {                    /* diritto, con qualche antenna */
      p += `M${n2(x)} ${y} v${n2(-h)} h${n2(w)} v${n2(h)} z`;
      if(r() < 0.3) p += `M${n2(x + w*0.5)} ${n2(y - h)} v${n2(-h*0.18)} h2 v${n2(h*0.18)} z`;
    }
    x += w + 3 + r() * 10;
  }
  return `<path d="${p}" fill="${colore}"${opac !== undefined ? ` opacity="${opac}"` : ""}/>`;
}

/* monti dietro alla città */
export function monti(r, y, colore, opac, alt){
  let p = `M0 ${y}`, x = 0;
  while(x < L){
    const w = 180 + r() * 320;
    const h = (alt || 150) * (0.5 + r());
    p += ` L${n2(x + w/2)} ${n2(y - h)} L${n2(x + w)} ${y}`;
    x += w;
  }
  p += " Z";
  return `<path d="${p}" fill="${colore}" opacity="${opac}"/>`;
}

/* palme, per i posti caldi */
export function palma(x, y, s, colore){
  const f = [];
  for(let i = 0; i < 7; i++){
    const a = -Math.PI + i * (Math.PI / 6);
    const dx = Math.cos(a) * 46 * s, dy = Math.sin(a) * 30 * s - 8 * s;
    f.push(`M0 0 q${n2(dx*0.55)} ${n2(dy*1.5)} ${n2(dx)} ${n2(dy)} q${n2(-dx*0.4)} ${n2(-dy*0.3)} ${n2(-dx)} 0 z`);
  }
  return `<g transform="translate(${n2(x)} ${n2(y)}) scale(${s})" fill="${colore}">
    <path d="M-4 0 q3 -60 -6 -104 l12 0 q7 46 6 104 z"/>
    <g transform="translate(0 -104)">${f.map(d => `<path d="${d}"/>`).join("")}</g></g>`;
}

/* uccelli lontani */
export function uccelli(r, quanti, colore){
  let s = "";
  for(let i = 0; i < quanti; i++){
    const x = 120 + r() * (L - 240), y = 120 + r() * 260, k = 0.5 + r() * 0.9;
    s += `<path d="M${n2(x)} ${n2(y)} q${n2(9*k)} ${n2(-7*k)} ${n2(18*k)} 0 q${n2(9*k)} ${n2(-7*k)} ${n2(18*k)} 0" fill="none" stroke="${colore}" stroke-width="${n2(2.2*k)}" stroke-linecap="round" opacity="0.5"/>`;
  }
  return s;
}

/* ============================================================
   LA TELA
   Il monumento sta sempre nello stesso punto (x 830) e viene
   ingrandito: deve essere lui il più alto e il più scuro,
   così si riconosce al primo sguardo.
   ============================================================ */
export const CENTRO = 830;

export function disegna(citta){
  const r = seme(citta.slug);
  const c = CIELI[citta.cielo] || CIELI.tramonto;
  const lontano = scuro(c.mezzo, 0.42);   /* monti e prima fila */
  const mezzo   = scuro(c.mezzo, 0.62);   /* seconda fila */
  const mono    = c.stelle ? scuro(c.giu, 0.52) : scuro(c.su, 0.90);  /* il monumento */
  const davanti = scuro(c.su,   0.82);    /* case in primo piano */
  const orizzonte = citta.acqua ? ORIZ - 30 : ORIZ;
  const k = citta.grande || 1.75;          /* quanto ingrandire il monumento */
  const largo = (citta.largo || 230) * k + 20;  /* quanto spazio gli lasciamo */
  const buco = [CENTRO - largo, CENTRO + largo];

  /* il monumento, ingrandito attorno al suo piede */
  const pezzo = (colore) => citta.monumento
    ? `<g transform="translate(${CENTRO} ${orizzonte}) scale(${k}) translate(${-CENTRO} ${-orizzonte})">${
        citta.monumento({ r: seme(citta.slug + "m"), scuro: colore, mezzo, chiaro: c.giu, luce: c.luce, oriz: orizzonte })
      }</g>`
    : "";

  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${A}" width="${L}" height="${A}" role="img" aria-label="${citta.aria || citta.slug}">
<defs>
  <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${c.su}"/><stop offset="0.55" stop-color="${c.mezzo}"/><stop offset="1" stop-color="${c.giu}"/>
  </linearGradient>
  <radialGradient id="alone" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="${c.luce}" stop-opacity="0.95"/><stop offset="0.42" stop-color="${c.luce}" stop-opacity="0.34"/>
    <stop offset="1" stop-color="${c.luce}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="acqua" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${misc(c.giu, "#0A2540", 0.35)}"/><stop offset="1" stop-color="${misc(c.su, "#04101F", 0.45)}"/>
  </linearGradient>
  <linearGradient id="velo" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${c.giu}" stop-opacity="0"/><stop offset="1" stop-color="${c.giu}" stop-opacity="0.45"/>
  </linearGradient>
  <linearGradient id="terra" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${misc(c.giu, "#0A0E1A", 0.62)}"/><stop offset="1" stop-color="${scuro(c.su, 0.86)}"/>
  </linearGradient>
  <radialGradient id="vign" cx="0.5" cy="0.42" r="0.80">
    <stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.32"/>
  </radialGradient>
</defs>
<rect width="${L}" height="${A}" fill="url(#cielo)"/>`;

  /* stelle */
  if(c.stelle){
    for(let i = 0; i < c.stelle; i++){
      const x = r() * L, y = r() * (orizzonte - 200), rr = 0.8 + r() * 1.8;
      s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(rr)}" fill="#fff" opacity="${n2(0.25 + r() * 0.6)}"/>`;
    }
  }

  /* sole o luna: dietro al monumento, un po' di lato, così lo illumina di taglio */
  const lato = r() < 0.5 ? -1 : 1;
  const ax = citta.astroX !== undefined ? citta.astroX : CENTRO + lato * (250 + r() * 130);
  const ay = citta.astroY !== undefined ? citta.astroY : orizzonte - 210 - r() * 130;
  const ar = citta.cielo === "notte" ? 54 : 84;
  s += `<circle cx="${n2(ax)}" cy="${n2(ay)}" r="${ar * 4.2}" fill="url(#alone)"/>`;
  s += `<circle cx="${n2(ax)}" cy="${n2(ay)}" r="${ar}" fill="${c.astro}"/>`;
  if(citta.cielo === "notte")
    s += `<circle cx="${n2(ax + 22)}" cy="${n2(ay - 15)}" r="${ar}" fill="${c.su}" opacity="0.92"/>`;

  /* nuvole leggere */
  if(citta.cielo !== "notte"){
    for(let i = 0; i < 3; i++){
      const x = r() * L, y = 70 + r() * 200, w = 180 + r() * 260, h = 12 + r() * 14;
      s += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(w)}" ry="${n2(h)}" fill="${c.giu}" opacity="${n2(0.10 + r() * 0.12)}"/>`;
    }
  }

  /* monti o colline dietro */
  if(citta.monti) s += monti(r, orizzonte, lontano, 0.42, citta.monti === true ? 170 : citta.monti);

  /* le due file di case dietro: basse, e col buco dove sta il monumento */
  s += fila(r, orizzonte, -40, L + 40, 45, 120, lontano, 0.45, buco);
  s += fila(r, orizzonte, -40, L + 40, 60, 165, mezzo,   0.75, buco);

  /* il monumento: il più alto, il più scuro, in mezzo alla scena.
     Prima un contorno di luce, poi il monumento: sembra controluce. */
  const verso = ax > CENTRO ? 1 : -1;
  s += `<g transform="translate(${verso * 7} -6)" opacity="0.28">${pezzo(c.luce)}</g>`;
  s += pezzo(mono);

  /* case in primo piano: solo ai lati, basse, non gli rubano la scena */
  s += fila(r, orizzonte + 2, -40, L + 40, 40, 95, davanti, 1, [CENTRO - largo * 0.62, CENTRO + largo * 0.62]);

  /* acqua con il riflesso */
  if(citta.acqua){
    s += `<rect x="0" y="${orizzonte}" width="${L}" height="${A - orizzonte}" fill="url(#acqua)"/>`;
    s += `<g transform="translate(0 ${orizzonte * 2}) scale(1 -1)" opacity="0.20">${pezzo(mono)}</g>`;
    s += `<circle cx="${n2(ax)}" cy="${n2(orizzonte + (orizzonte - ay) * 0.55)}" r="${ar * 0.7}" fill="${c.astro}" opacity="0.16"/>`;
    for(let i = 0; i < 26; i++){
      const y = orizzonte + 10 + r() * (A - orizzonte - 20);
      const x = r() * L, w = 40 + r() * 220;
      s += `<rect x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="2" rx="1" fill="#fff" opacity="${n2(0.05 + r() * 0.12)}"/>`;
    }
  } else {
    s += `<rect x="0" y="${orizzonte}" width="${L}" height="${A - orizzonte}" fill="url(#terra)"/>`;
    for(let i = 0; i < 9; i++){
      const y = orizzonte + 18 + r() * (A - orizzonte - 30), x = r() * L, w = 90 + r() * 340;
      s += `<rect x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="3" rx="1.5" fill="${c.luce}" opacity="${n2(0.03 + r() * 0.05)}"/>`;
    }
  }

  /* palme e uccelli */
  if(citta.palme) for(let i = 0; i < citta.palme; i++){
    const px = r() < 0.5 ? 40 + r() * 300 : L - 340 + r() * 300;
    s += palma(px, orizzonte + 70 + r() * 130, 0.9 + r() * 0.8, scuro(c.su, 0.92));
  }
  if(citta.cielo !== "notte") s += uccelli(r, 5, scuro(c.su, 0.62));

  /* velo e vignettatura */
  s += `<rect x="0" y="${orizzonte - 260}" width="${L}" height="260" fill="url(#velo)" opacity="0.45"/>`;
  s += `<rect width="${L}" height="${A}" fill="url(#vign)"/>`;
  return s + "</svg>\n";
}
