/* ============================================================
   I MONUMENTI — Asia, Oriente, Africa, Americhe, Oceania
   ============================================================ */
const g = (x, y, s, dentro) => `<g transform="translate(${x} ${y}) scale(${s})">${dentro}</g>`;

/* ---------- ASIA ---------- */

/* Tokyo: la torre rossa */
export function tokyo({ scuro, oriz }){
  const t = `
    <path d="M-58 0 C-40 -70 -26 -130 -20 -180 h40 C26 -130 40 -70 58 0 h-22 C22 -84 12 -140 8 -180 h-16 C-12 -140 -22 -84 -36 0 z" fill="${scuro}"/>
    <path d="M-20 -180 v-70 h40 v70 z" fill="${scuro}"/>
    <path d="M-14 -250 C-10 -290 -6 -320 -4 -340 h8 C6 -320 10 -290 14 -250 z" fill="${scuro}"/>
    <path d="M0 -340 v-46" stroke="${scuro}" stroke-width="5"/>
    <rect x="-42" y="-150" width="84" height="12" fill="${scuro}"/>
    <rect x="-22" y="-252" width="44" height="10" fill="${scuro}"/>`;
  return g(830, oriz, 1.05, t);
}

/* Pechino: il Tempio del Cielo */
export function pechino({ scuro, oriz }){
  const tetto = (y, w, h) => `<path d="M${-w} ${y} q${w} ${-h*1.5} ${w*2} 0 z" fill="${scuro}"/>`;
  const t = `
    <path d="M-190 0 v-30 h380 V0 z" fill="${scuro}"/>
    <path d="M-150 -30 v-22 h300 v22 z" fill="${scuro}"/>
    <path d="M-110 -52 v-56 h220 v56 z" fill="${scuro}"/>
    ${tetto(-108, 140, 40)}
    <path d="M-80 -166 v-46 h160 v46 z" fill="${scuro}"/>
    ${tetto(-212, 104, 34)}
    <path d="M-52 -256 v-38 h104 v38 z" fill="${scuro}"/>
    ${tetto(-294, 74, 28)}
    <path d="M0 -342 v-34 a10 10 0 1 1 0 20 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}

/* Bangkok: il Wat Arun */
export function bangkok({ scuro, oriz }){
  const guglia = (x, s) => `<g transform="translate(${x} 0) scale(${s})">
    <path d="M-40 0 v-30 h80 V0 z" fill="${scuro}"/>
    <path d="M-30 -30 L0 -190 L30 -30 z" fill="${scuro}"/>
    <path d="M-16 -110 h32 M-22 -70 h44" stroke="${scuro}" stroke-width="6" opacity="0.5"/>
    <path d="M0 -190 v-40" stroke="${scuro}" stroke-width="5"/></g>`;
  const t = `${guglia(-150, 0.55)}${guglia(150, 0.55)}${guglia(0, 1.1)}
    <path d="M-220 0 h440 v16 h-440 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}

/* Singapore: le tre torri con la nave in cima */
export function singapore({ scuro, oriz }){
  const torre = x => `<path d="M${x-26} 0 q10 -170 26 -232 q16 62 26 232 z" fill="${scuro}"/>`;
  const t = `${torre(-130)}${torre(0)}${torre(130)}
    <path d="M-190 -232 q190 -40 380 -14 l0 26 q-190 -26 -380 14 z" fill="${scuro}"/>
    <path d="M150 -250 q40 -8 60 -22" fill="none" stroke="${scuro}" stroke-width="6"/>`;
  return g(830, oriz, 0.95, t);
}

/* Delhi: l'India Gate */
export function delhi({ scuro, chiaro, oriz }){
  const t = `
    <path d="M-124 0 v-42 h248 V0 z" fill="${scuro}"/>
    <path d="M-100 -42 v-196 h200 v196 z" fill="${scuro}"/>
    <path d="M-48 -42 v-116 a48 62 0 0 1 96 0 V-42 z" fill="${chiaro}" opacity="0.42"/>
    <path d="M-108 -238 h216 v-26 h-216 z" fill="${scuro}"/>
    <path d="M-42 -264 h84 v-20 h-84 z" fill="${scuro}"/>
    <path d="M0 -284 v-30 a10 10 0 1 1 0 20 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.05, t);
}

/* Seul: il palazzo e la torre */
export function seul({ scuro, oriz }){
  const t = `
    <path d="M-200 0 v-70 h300 V0 z" fill="${scuro}"/>
    <path d="M-230 -70 q130 -50 360 0 z" fill="${scuro}"/>
    <path d="M-170 -104 v-46 h240 v46 z" fill="${scuro}"/>
    <path d="M-200 -150 q150 -46 300 0 z" fill="${scuro}"/>
    <g transform="translate(250 0)">
      <path d="M-16 0 v-190 h32 V0 z" fill="${scuro}"/>
      <path d="M-40 -190 q40 -50 80 0 z" fill="${scuro}"/>
      <path d="M0 -240 v-56" stroke="${scuro}" stroke-width="5"/>
    </g>`;
  return g(830, oriz, 1.0, t);
}

/* ---------- ORIENTE ---------- */

/* Istanbul: Santa Sofia e i minareti */
export function istanbul({ scuro, oriz }){
  const minareto = x => `<g transform="translate(${x} 0)">
    <path d="M-9 0 v-250 h18 V0 z" fill="${scuro}"/>
    <path d="M-15 -180 h30 v10 h-30 z" fill="${scuro}"/>
    <path d="M-13 -250 L0 -300 L13 -250 z" fill="${scuro}"/>
    <path d="M0 -300 v-20" stroke="${scuro}" stroke-width="4"/></g>`;
  const t = `
    ${minareto(-215)}${minareto(215)}${minareto(-150)}${minareto(150)}
    <path d="M-170 0 v-90 h340 V0 z" fill="${scuro}"/>
    <path d="M-118 -90 v-46 h236 v46 z" fill="${scuro}"/>
    <path d="M-118 -136 a118 106 0 0 1 236 0 z" fill="${scuro}"/>
    <path d="M0 -244 v-26 a10 10 0 1 1 0 18 z" fill="${scuro}"/>
    <path d="M-176 -90 a56 48 0 0 1 112 0 z M64 -90 a56 48 0 0 1 112 0 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}

/* Dubai: la guglia altissima */
export function dubai({ scuro, oriz }){
  const t = `
    <path d="M-70 0 v-120 h140 V0 z" fill="${scuro}"/>
    <path d="M-46 -120 v-140 h92 v140 z" fill="${scuro}"/>
    <path d="M-30 -260 v-150 h60 v150 z" fill="${scuro}"/>
    <path d="M-18 -410 v-130 h36 v130 z" fill="${scuro}"/>
    <path d="M-9 -540 v-90 h18 v90 z" fill="${scuro}"/>
    <path d="M0 -630 v-110" stroke="${scuro}" stroke-width="7"/>
    <path d="M-120 0 v-70 h40 v70 z M80 0 v-96 h44 v96 z" fill="${scuro}" opacity="0.85"/>`;
  return g(830, oriz, 0.92, t);
}

/* Gerusalemme: la Cupola della Roccia */
export function gerusalemme({ scuro, luce, oriz }){
  const t = `
    <path d="M-160 0 v-58 h320 V0 z" fill="${scuro}"/>
    <path d="M-96 -58 v-84 h192 v84 z" fill="${scuro}"/>
    <path d="M-96 -142 h192 v-14 h-192 z" fill="${scuro}"/>
    <path d="M-78 -156 a78 84 0 0 1 156 0 z" fill="${scuro}"/>
    <path d="M-40 -216 a40 44 0 0 1 80 0 z" fill="${luce}" opacity="0.22"/>
    <path d="M0 -240 v-30 a9 9 0 1 1 0 18 z" fill="${scuro}"/>
    <path d="M-200 0 v-40 h30 v40 z M170 0 v-52 h34 v52 z" fill="${scuro}" opacity="0.9"/>`;
  return g(830, oriz, 1.0, t);
}

/* Doha: le torri sul golfo */
export function doha({ scuro, oriz }){
  const t = `
    <path d="M-150 0 q10 -180 26 -230 q16 50 26 230 z" fill="${scuro}"/>
    <path d="M-60 0 v-300 a30 30 0 0 1 60 0 V0 z" fill="${scuro}"/>
    <path d="M40 0 q14 -200 34 -280 q20 80 34 280 z" fill="${scuro}"/>
    <path d="M130 0 v-160 h56 v160 z M130 -160 l28 -60 l28 60 z" fill="${scuro}"/>
    <path d="M-30 -300 v-40" stroke="${scuro}" stroke-width="5"/>`;
  return g(830, oriz, 1.0, t);
}

/* ---------- NORD AFRICA ---------- */

/* Il Cairo: le piramidi e la sfinge */
export function cairo({ scuro, mezzo, oriz }){
  const t = `
    <path d="M-320 0 L-150 -280 L20 0 z" fill="${mezzo}" opacity="0.85"/>
    <path d="M-60 0 L90 -220 L240 0 z" fill="${scuro}"/>
    <path d="M170 0 L270 -150 L370 0 z" fill="${scuro}" opacity="0.9"/>
    <g transform="translate(-160 0)">
      <path d="M-90 0 v-42 q60 -14 118 -6 v48 z" fill="${scuro}"/>
      <path d="M28 -48 q26 -6 30 -34 q4 -30 -18 -34 q-22 -4 -26 26 q-4 26 14 42 z" fill="${scuro}"/>
      <path d="M4 -116 q22 -18 40 -2 l-6 14 q-16 -12 -30 2 z" fill="${scuro}"/>
    </g>`;
  return g(830, oriz, 1.0, t);
}

/* Marrakech: la Koutoubia */
export function marrakech({ scuro, oriz }){
  const t = `
    <path d="M-42 0 v-250 h84 V0 z" fill="${scuro}"/>
    <path d="M-46 -250 h92 v-16 h-92 z" fill="${scuro}"/>
    <path d="M-26 -266 v-58 h52 v58 z" fill="${scuro}"/>
    <path d="M-30 -324 h60 v-12 h-60 z" fill="${scuro}"/>
    <path d="M0 -336 v-30 a8 8 0 1 1 0 16 z" fill="${scuro}"/>
    <path d="M-24 -200 v-30 a24 30 0 0 1 48 0 v30 z" fill="#0000" stroke="${scuro}" stroke-width="0"/>
    <path d="M-150 0 v-70 h96 v70 z" fill="${scuro}" opacity="0.9"/>
    <path d="M-150 -70 a48 34 0 0 1 96 0 z" fill="${scuro}" opacity="0.9"/>
    <path d="M60 0 v-56 h120 v56 z" fill="${scuro}" opacity="0.85"/>`;
  return g(830, oriz, 1.0, t);
}

/* Tunisi: la medina e il minareto quadrato */
export function tunisi({ scuro, luce, oriz }){
  const cupola = (x, s) => `<g transform="translate(${x} 0) scale(${s})"><path d="M-40 0 v-40 h80 V0 z" fill="${scuro}"/><path d="M-40 -40 a40 40 0 0 1 80 0 z" fill="${scuro}"/><path d="M0 -82 v-18" stroke="${scuro}" stroke-width="4"/></g>`;
  const t = `
    ${cupola(-190, 0.9)}${cupola(-90, 0.7)}${cupola(150, 1.1)}${cupola(240, 0.6)}
    <path d="M-34 0 v-210 h68 V0 z" fill="${scuro}"/>
    <path d="M-40 -210 h80 v-14 h-80 z" fill="${scuro}"/>
    <path d="M-20 -224 v-44 h40 v44 z" fill="${scuro}"/>
    <path d="M0 -268 v-26 a8 8 0 1 1 0 16 z" fill="${scuro}"/>
    <path d="M-16 -150 h32 v34 h-32 z" fill="${luce}" opacity="0.25"/>
    <path d="M-300 0 h600 v18 h-600 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}

/* Algeri: la casbah e la cupola bianca */
export function algeri({ scuro, chiaro, oriz }){
  /* la casbah: tante casette bianche a cubo che salgono dalla riva */
  let casbah = "";
  for(let riga = 0; riga < 5; riga++){
    const y = -riga * 40, quante = 11 - riga * 2;
    for(let i = 0; i < quante; i++){
      const x = -(quante * 44) / 2 + i * 44 + 5;
      const h = 34 + ((i * 7 + riga * 3) % 3) * 9;
      casbah += `<path d="M${x} ${y} v${-h} h34 v${h} z" fill="${scuro}"/>`;
      casbah += `<rect x="${x + 12}" y="${y - h + 11}" width="8" height="10" fill="${chiaro}" opacity="0.30"/>`;
    }
  }
  const t = `
    ${casbah}
    <g transform="translate(-16 -196)">
      <path d="M-62 0 v-50 h124 V0 z" fill="${scuro}"/>
      <path d="M-62 -50 a62 64 0 0 1 124 0 z" fill="${scuro}"/>
      <path d="M0 -114 v-26 a8 8 0 1 1 0 16 z" fill="${scuro}"/>
      <path d="M94 0 v-152 h34 v152 z" fill="${scuro}"/>
      <path d="M90 -152 h42 v-14 h-42 z" fill="${scuro}"/>
      <path d="M111 -166 v-24 a7 7 0 1 1 0 14 z" fill="${scuro}"/>
    </g>`;
  return g(830, oriz, 1.0, t);
}

/* Casablanca: la moschea sul mare */
export function casablanca({ scuro, oriz }){
  const t = `
    <path d="M-30 0 v-380 h60 V0 z" fill="${scuro}"/>
    <path d="M-36 -380 h72 v-18 h-72 z" fill="${scuro}"/>
    <path d="M-22 -398 v-56 h44 v56 z" fill="${scuro}"/>
    <path d="M0 -454 v-40 a9 9 0 1 1 0 22 z" fill="${scuro}"/>
    <path d="M-22 -300 h44 M-22 -230 h44 M-22 -160 h44" stroke="${scuro}" stroke-width="8" opacity="0.35"/>
    <path d="M-230 0 v-96 h190 v96 z" fill="${scuro}"/>
    <path d="M-230 -96 q95 -44 190 0 z" fill="${scuro}"/>
    <path d="M40 0 v-70 h150 v70 z" fill="${scuro}" opacity="0.9"/>`;
  return g(830, oriz, 0.98, t);
}

/* ---------- AFRICA ---------- */

/* Città del Capo: la montagna piatta */
export function cittadelcapo({ scuro, mezzo, oriz }){
  const t = `
    <path d="M-420 0 L-330 -240 L-40 -262 L60 -240 L150 0 z" fill="${mezzo}" opacity="0.9"/>
    <path d="M-330 -240 L-40 -262" stroke="${scuro}" stroke-width="6" opacity="0.35"/>
    <path d="M150 0 L230 -150 L300 0 z" fill="${mezzo}" opacity="0.75"/>
    <path d="M-260 0 v-70 h44 v70 z M-190 0 v-100 h40 v100 z M-130 0 v-60 h36 v60 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}

/* Nairobi: la torre rotonda e l'acacia */
export function nairobi({ scuro, oriz }){
  const t = `
    <path d="M-24 0 v-260 h48 V0 z" fill="${scuro}"/>
    <path d="M-52 -260 a52 26 0 0 1 104 0 z" fill="${scuro}"/>
    <path d="M0 -292 v-40" stroke="${scuro}" stroke-width="5"/>
    <path d="M-160 0 v-150 h60 v150 z M80 0 v-190 h56 v190 z M160 0 v-110 h44 v110 z" fill="${scuro}" opacity="0.9"/>
    <g transform="translate(-320 0)">
      <path d="M-6 0 q4 -60 -2 -96 l14 0 q-4 40 0 96 z" fill="${scuro}"/>
      <path d="M-96 -96 q40 -34 96 -30 q56 -4 96 30 q-50 -12 -96 -8 q-46 -4 -96 8 z" fill="${scuro}"/>
    </g>`;
  return g(830, oriz, 1.0, t);
}

/* Dakar: il monumento sull'oceano */
export function dakar({ scuro, oriz }){
  /* il baobab: l'albero che tutti conoscono, e le piroghe tirate a riva */
  const ramo = (a, l, s) => {
    const dx = Math.cos(a) * l, dy = Math.sin(a) * l;
    return `<path d="M0 0 q${(dx*0.4).toFixed(1)} ${(dy*1.25).toFixed(1)} ${dx.toFixed(1)} ${dy.toFixed(1)}"
      fill="none" stroke="${scuro}" stroke-width="${s}" stroke-linecap="round"/>`;
  };
  let chioma = "";
  const angoli = [-2.95, -2.6, -2.25, -1.9, -1.55, -1.2, -0.85, -0.5, -0.2];
  angoli.forEach((a, i) => { chioma += ramo(a, 90 + (i % 3) * 26, 13 - (i % 3) * 3); });
  const t = `
    <path d="M-56 0 c8 -70 10 -120 4 -156 h104 c-6 36 -4 86 4 156 z" fill="${scuro}"/>
    <path d="M-52 -156 q52 -22 104 0 z" fill="${scuro}"/>
    <g transform="translate(0 -160)">${chioma}
      <path d="M-150 -74 q150 -34 300 0 q-150 26 -300 0 z" fill="${scuro}" opacity="0.55"/>
    </g>
    <path d="M-92 0 q-40 -10 -70 -2 q28 14 70 2 z M120 0 q40 -12 74 -2 q-30 14 -74 2 z" fill="${scuro}" opacity="0.8"/>
    <path d="M172 0 v-84 h34 v84 z M212 0 v-58 h26 v58 z" fill="${scuro}" opacity="0.7"/>`;
  return g(830, oriz, 1.0, t);
}

/* ---------- AMERICHE ---------- */

/* New York: l'Empire State e la Statua della Libertà */
export function newyork({ scuro, luce, oriz }){
  /* l'Empire State in mezzo, la Statua della Libertà davanti a sinistra */
  const statua = `
    <path d="M-52 0 v-30 h104 V0 z" fill="${scuro}"/>
    <path d="M-34 -30 v-26 h68 v26 z" fill="${scuro}"/>
    <path d="M-22 -56 v-34 h44 v34 z" fill="${scuro}"/>
    <path d="M-20 -90 c-4 -46 2 -80 10 -100 l24 6 c-8 24 -12 58 -8 94 z" fill="${scuro}"/>
    <path d="M-10 -190 q12 -12 24 0 q-2 16 -12 18 q-12 -2 -12 -18 z" fill="${scuro}"/>
    <path d="M-24 -186 l6 -20 l7 20 l7 -18 l6 20 l8 -16 l6 18" fill="none" stroke="${scuro}" stroke-width="4"/>
    <path d="M14 -184 q16 -30 34 -54 q9 -12 16 -2 q6 10 -4 20 q-16 18 -26 42 z" fill="${scuro}"/>
    <path d="M46 -244 q10 -20 19 -5 q8 14 -8 24 z" fill="${luce}" opacity="0.8"/>
    <path d="M-22 -120 q-24 6 -30 30 q-4 12 6 14 q10 2 14 -10 q4 -14 14 -16 z" fill="${scuro}"/>`;
  const t = `
    <path d="M-42 0 v-190 h84 V0 z" fill="${scuro}"/>
    <path d="M-29 -190 v-112 h58 v112 z" fill="${scuro}"/>
    <path d="M-19 -302 v-84 h38 v84 z" fill="${scuro}"/>
    <path d="M-10 -386 v-48 h20 v48 z" fill="${scuro}"/>
    <path d="M0 -434 v-58" stroke="${scuro}" stroke-width="6"/>
    <path d="M-152 0 v-140 h62 v140 z M-236 0 v-214 h66 v214 z M72 0 v-244 h62 v244 z M154 0 v-158 h58 v158 z" fill="${scuro}" opacity="0.9"/>
    <g transform="translate(-330 0)">${statua}</g>`;
  return g(830, oriz, 0.95, t);
}

/* Città del Messico: l'Angelo dell'Indipendenza */
export function messico({ scuro, luce, oriz }){
  const t = `
    <path d="M-64 0 v-44 h128 V0 z" fill="${scuro}"/>
    <path d="M-40 -44 v-30 h80 v30 z" fill="${scuro}"/>
    <path d="M-16 -74 v-230 h32 v230 z" fill="${scuro}"/>
    <path d="M-24 -304 h48 v-16 h-48 z" fill="${scuro}"/>
    <g transform="translate(0 -320)">
      <path d="M-8 0 q-4 -34 4 -54 q6 -14 14 -4 q6 10 -2 22 q-8 14 -6 36 z" fill="${scuro}"/>
      <path d="M6 -46 q26 -30 52 -18 q-16 22 -46 30 z" fill="${luce}" opacity="0.55"/>
      <path d="M-6 -46 q-26 -30 -52 -18 q16 22 46 30 z" fill="${scuro}"/>
    </g>
    <path d="M150 0 v-130 h60 v130 z M-210 0 v-96 h56 v96 z" fill="${scuro}" opacity="0.9"/>`;
  return g(830, oriz, 1.0, t);
}

/* L'Avana: il Capitolio e le palme */
export function lavana({ scuro, oriz }){
  const t = `
    <path d="M-230 0 v-70 h460 V0 z" fill="${scuro}"/>
    <path d="M-120 -70 v-40 h240 v40 z" fill="${scuro}"/>
    <path d="M-72 -110 a72 78 0 0 1 144 0 z" fill="${scuro}"/>
    <path d="M-30 -178 a30 34 0 0 1 60 0 z" fill="${scuro}"/>
    <path d="M0 -212 v-30" stroke="${scuro}" stroke-width="5"/>
    <path d="M-230 -70 h60 v-30 h-60 z M170 -70 h60 v-30 h-60 z" fill="${scuro}"/>
    ${[-300, -270, 280, 320].map(x => `<g transform="translate(${x} 0)"><path d="M-4 0 q3 -50 -5 -86 l12 0 q6 38 5 86 z" fill="${scuro}"/><g transform="translate(0 -86)"><path d="M0 0 q-30 -22 -52 -10 q26 -22 52 -2 q26 -20 52 2 q-22 -12 -52 10 z" fill="${scuro}"/><path d="M0 0 q-16 -30 -40 -38 q28 4 40 30 q12 -26 40 -30 q-24 8 -40 38 z" fill="${scuro}"/></g></g>`).join("")}`;
  return g(830, oriz, 1.0, t);
}

/* Toronto: la torre e i grattacieli */
export function toronto({ scuro, oriz }){
  const t = `
    <path d="M-14 0 q4 -230 8 -330 h12 q4 100 8 330 z" fill="${scuro}"/>
    <path d="M-40 -330 q40 -30 80 0 l-8 34 q-32 -22 -64 0 z" fill="${scuro}"/>
    <path d="M-22 -364 q22 -16 44 0 l-6 20 q-16 -10 -32 0 z" fill="${scuro}"/>
    <path d="M0 -390 v-80" stroke="${scuro}" stroke-width="5"/>
    <path d="M-190 0 v-190 h60 v190 z M-110 0 v-240 h56 v240 z M60 0 v-210 h64 v210 z M150 0 v-150 h50 v150 z" fill="${scuro}" opacity="0.92"/>`;
  return g(830, oriz, 0.95, t);
}

/* Rio: il Cristo e il Pan di Zucchero */
export function rio({ scuro, mezzo, oriz }){
  const t = `
    <path d="M150 0 q70 -190 150 -196 q86 8 122 196 z" fill="${mezzo}" opacity="0.80"/>
    <path d="M-330 0 q90 -150 175 -158 q88 10 135 158 z" fill="${mezzo}" opacity="0.60"/>
    <path d="M-140 0 q76 -132 145 -138 q74 8 126 138 z" fill="${scuro}" opacity="0.5"/>
    <g transform="translate(-8 -132)">
      <path d="M-15 0 v-28 h30 v28 z" fill="${scuro}"/>
      <path d="M-10 -28 v-76 h20 v76 z" fill="${scuro}"/>
      <path d="M-64 -84 h128 v15 h-128 z" fill="${scuro}"/>
      <path d="M-6 -104 h12 v12 h-12 z" fill="${scuro}"/>
      <circle cx="0" cy="-116" r="12" fill="${scuro}"/>
    </g>`;
  return g(830, oriz, 1.0, t);
}

/* Buenos Aires: l'Obelisco */
export function buenosaires({ scuro, oriz }){
  const t = `
    <path d="M-30 0 v-24 h60 V0 z" fill="${scuro}"/>
    <path d="M-22 -24 L-8 -300 h16 L22 -24 z" fill="${scuro}"/>
    <path d="M-8 -300 L0 -330 L8 -300 z" fill="${scuro}"/>
    <path d="M-200 0 v-120 h70 v120 z M-110 0 v-90 h56 v90 z M90 0 v-140 h60 v140 z M170 0 v-100 h50 v100 z" fill="${scuro}" opacity="0.9"/>`;
  return g(830, oriz, 1.0, t);
}

/* Perù: Machu Picchu */
export function machupicchu({ scuro, mezzo, oriz }){
  /* la punta dell'Huayna Picchu dietro, le terrazze e le casette di pietra davanti */
  const terrazze = [0,1,2,3,4].map(i =>
    `<path d="M${-250 + i*26} ${-i*30} h${300 - i*46} v-22 h${-(300 - i*46)} z" fill="${scuro}" opacity="${(0.92 - i*0.07).toFixed(2)}"/>`).join("");
  const case_ = [0,1,2,3,4].map(i =>
    `<g transform="translate(${-160 + i*74} -150)">
       <path d="M-24 0 v-32 h48 v32 z" fill="${scuro}"/>
       <path d="M-30 -32 L0 -60 L30 -32 z" fill="${scuro}"/>
     </g>`).join("");
  const t = `
    <path d="M70 0 q46 -300 130 -334 q86 34 130 334 z" fill="${mezzo}" opacity="0.9"/>
    <path d="M-400 0 q90 -170 178 -192 q88 22 148 192 z" fill="${mezzo}" opacity="0.55"/>
    ${terrazze}
    ${case_}
    <path d="M-196 -150 h340 v-8 h-340 z" fill="${scuro}" opacity="0.5"/>`;
  return g(830, oriz, 1.0, t);
}

/* ---------- OCEANIA ---------- */

/* Sydney: l'Opera e il ponte */
export function sydney({ scuro, oriz }){
  /* le vele dell'Opera e, dietro, l'arco del ponte */
  const vela = (x, h, w, f) => `<path d="M${x} 0 Q${x + f*w*0.02} ${-h*0.74} ${x + f*w*0.44} ${-h} Q${x + f*w*0.88} ${-h*0.70} ${x + f*w} 0 z" fill="${scuro}"/>`;
  const t = `
    <g transform="translate(-300 0)">
      <path d="M-150 0 v-80 h34 v80 z M150 0 v-80 h-34 v80 z" fill="${scuro}" opacity="0.9"/>
      <path d="M-146 -70 q146 -112 292 0" fill="none" stroke="${scuro}" stroke-width="14" opacity="0.9"/>
      <path d="M-152 -64 h304 v14 h-304 z" fill="${scuro}" opacity="0.9"/>
      <path d="M-100 -64 v-26 M-50 -64 v-44 M0 -64 v-54 M50 -64 v-44 M100 -64 v-26" stroke="${scuro}" stroke-width="6" opacity="0.9"/>
    </g>
    <path d="M-210 0 h390 v26 h-390 z" fill="${scuro}"/>
    ${vela(-124, 82, 84, -1)}${vela(-62, 118, 116, -1)}
    ${vela(-24, 156, 156, 1)}${vela(56, 120, 122, 1)}${vela(126, 88, 92, 1)}`;
  return g(830, oriz, 1.0, t);
}

/* ---------- ALTRE MERAVIGLIE ---------- */

/* Bali: le porte del tempio, spaccate in due */
export function bali({ scuro, chiaro, oriz }){
  const meta = (f) => `<g transform="scale(${f} 1)">
    <path d="M34 0 v-236 l18 -40 l20 40 v236 z" fill="${scuro}"/>
    <path d="M52 -56 h34 v16 h-34 z M52 -104 h30 v16 h-30 z M52 -152 h26 v16 h-26 z M52 -200 h22 v16 h-22 z" fill="${scuro}" opacity="0.5"/>
    <path d="M22 0 v-52 h72 v52 z" fill="${scuro}"/>
    <path d="M52 -282 l8 -34 l8 34 z" fill="${scuro}"/>
  </g>`;
  const t = `
    <path d="M-190 0 h380 v24 h-380 z" fill="${scuro}"/>
    <path d="M-150 24 h300 v18 h-300 z" fill="${scuro}" opacity="0.8"/>
    ${meta(1)}${meta(-1)}
    <path d="M-34 0 v-30 h68 v30 z" fill="${chiaro}" opacity="0.22"/>`;
  return g(830, oriz, 1.05, t);
}

/* Maldive: le casette sull'acqua e la palma sull'isolotto */
export function maldive({ scuro, oriz }){
  const casa = (x, s) => `<g transform="translate(${x} 0) scale(${s})">
    <path d="M-46 0 v-34 h92 V0 z" fill="${scuro}"/>
    <path d="M-56 -34 L0 -84 L56 -34 z" fill="${scuro}"/>
    <path d="M-40 0 v34 M-14 0 v34 M14 0 v34 M40 0 v34" stroke="${scuro}" stroke-width="5"/>
  </g>`;
  const t = `
    <path d="M-420 6 h840 v9 h-840 z" fill="${scuro}" opacity="0.8"/>
    ${casa(-300, 0.9)}${casa(-150, 1.0)}${casa(10, 1.0)}${casa(170, 0.9)}${casa(310, 0.8)}
    <g transform="translate(-470 0)">
      <path d="M-90 6 q90 -34 180 0 z" fill="${scuro}"/>
      <path d="M0 4 c-6 -40 -4 -74 6 -104" stroke="${scuro}" stroke-width="9" fill="none"/>
      <path d="M6 -104 q-56 -14 -78 16 q46 -8 74 -6 z M6 -104 q56 -18 82 10 q-48 -10 -76 -4 z M6 -104 q-14 -52 -58 -62 q30 30 50 66 z M6 -104 q22 -50 68 -54 q-38 24 -58 60 z" fill="${scuro}"/>
    </g>`;
  return g(830, oriz, 0.92, t);
}

/* Islanda: la chiesa di Reykjavík sotto l'aurora */
export function reykjavik({ scuro, luce, oriz }){
  /* la chiesa di pietra e, sopra, l'aurora boreale */
  const ala = (f) => `<g transform="scale(${f} 1)">
    <path d="M10 0 v-64 l22 -46 v110 z M32 0 v-110 l22 -50 v160 z M54 0 v-160 l24 -56 v216 z" fill="${scuro}"/>
  </g>`;
  const t = `
    <path d="M-132 0 h264 v16 h-264 z" fill="${scuro}"/>
    ${ala(1)}${ala(-1)}
    <path d="M-19 0 v-250 l19 -132 l19 132 V0 z" fill="${scuro}"/>
    <path d="M0 -388 v-34 M-14 -408 h28" stroke="${scuro}" stroke-width="8"/>
    <path d="M-9 0 v-72 h18 v72 z" fill="${scuro}" opacity="0.5"/>
    <g opacity="0.6" fill="none" stroke="${luce}" stroke-width="18" stroke-linecap="round">
      <path d="M-250 -474 q92 -80 182 -28 q100 56 208 -22"/>
      <path d="M-198 -404 q110 -66 196 -14 q92 52 198 -30" opacity="0.65"/>
    </g>`;
  return g(830, oriz, 1.0, t);
}
