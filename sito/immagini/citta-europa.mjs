/* ============================================================
   I MONUMENTI — Europa e i viaggi che vendiamo
   Ogni funzione riceve i colori e restituisce il disegno.
   Il terreno sta a "oriz": si costruisce da lì verso l'alto.
   ============================================================ */
const g = (x, y, s, dentro) => `<g transform="translate(${x} ${y}) scale(${s})">${dentro}</g>`;

/* --- Parigi: la Torre Eiffel --- */
export function eiffel({ scuro, oriz }){
  const t = `
    <path d="M-46 0 C-30 -60 -20 -110 -16 -150 h32 C20 -110 30 -60 46 0 h-18 C16 -70 8 -120 6 -150 h-12 C-8 -120 -16 -70 -28 0 z" fill="${scuro}"/>
    <path d="M-16 -150 C-14 -190 -9 -230 -6 -262 h12 C9 -230 14 -190 16 -150 z" fill="${scuro}"/>
    <path d="M-6 -262 h12 v-42 h-4 v-26 h-4 v26 h-4 z" fill="${scuro}"/>
    <rect x="-34" y="-118" width="68" height="9" fill="${scuro}"/>
    <rect x="-19" y="-206" width="38" height="7" fill="${scuro}"/>
    <path d="M-44 -20 q44 -30 88 0" fill="none" stroke="${scuro}" stroke-width="6"/>`;
  return g(830, oriz, 1.15, t);
}

/* --- Roma: il Colosseo --- */
export function colosseo({ scuro, chiaro, oriz }){
  let archi = "";
  for(let p = 0; p < 3; p++){
    const y = -30 - p * 44;
    for(let i = 0; i < 9; i++){
      const x = -122 + i * 30.5;
      archi += `<path d="M${x} ${y} v-18 a11 13 0 0 1 22 0 v18 z" fill="${chiaro}" opacity="${(0.40 - p * 0.07).toFixed(2)}"/>`;
    }
  }
  const t = `
    <path d="M-140 0 v-138 a140 40 0 0 1 280 0 V0 z" fill="${scuro}"/>
    <path d="M-140 -138 a140 40 0 0 1 280 0 v-20 a140 40 0 0 0 -280 0 z" fill="${scuro}"/>
    ${archi}
    <path d="M64 -152 q40 -32 78 -6 v24 a140 40 0 0 1 -78 -14 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.05, t);
}

/* --- Londra: il Big Ben e il ponte --- */
export function bigben({ scuro, oriz, luce }){
  const t = `
    <path d="M-26 0 v-236 h52 V0 z" fill="${scuro}"/>
    <path d="M-30 -236 h60 v-16 h-60 z" fill="${scuro}"/>
    <circle cx="0" cy="-272" r="21" fill="${scuro}"/>
    <circle cx="0" cy="-272" r="14" fill="${luce}" opacity="0.85"/>
    <path d="M-24 -292 h48 l-24 -74 z" fill="${scuro}"/>
    <path d="M0 -366 v-26" stroke="${scuro}" stroke-width="5"/>
    <g opacity="0.9">
      <path d="M-260 0 v-70 h34 v70 z M226 0 v-70 h34 v70 z" fill="${scuro}"/>
      <path d="M-260 -70 q130 -60 260 0" fill="none" stroke="${scuro}" stroke-width="9"/>
    </g>`;
  return g(830, oriz, 1.0, t);
}

/* --- Praga: il castello e il ponte Carlo --- */
export function praga({ scuro, chiaro, oriz }){
  const fin = (x, y, n, dx) => Array.from({ length:n }, (_, i) =>
    `<rect x="${x + i * dx}" y="${y}" width="7" height="13" fill="${chiaro}" opacity="0.34"/>`).join("");
  let archi = "";
  for(let i = 0; i < 5; i++){ const x = -344 + i * 96; archi += `<path d="M${x} 0 v-24 a26 26 0 0 1 52 0 V0 z" fill="${chiaro}" opacity="0.30"/>`; }
  const t = `
    <path d="M-300 0 v-100 h420 V0 z" fill="${scuro}"/>
    ${fin(-286, -78, 17, 24)}
    <path d="M-160 -100 v-96 h66 v96 z" fill="${scuro}"/>
    <path d="M-162 -196 l33 -78 l33 78 z" fill="${scuro}"/>
    <path d="M-60 -100 v-126 h60 v126 z" fill="${scuro}"/>
    <path d="M-62 -226 l31 -94 l31 94 z" fill="${scuro}"/>
    <path d="M-31 -320 v-26" stroke="${scuro}" stroke-width="4"/>
    <path d="M30 -100 v-74 h46 v74 z M28 -174 l23 -50 l23 50 z" fill="${scuro}"/>
    ${fin(-150, -158, 2, 30)}${fin(-50, -190, 2, 28)}
    <path d="M-360 0 v-54 h460 V0 z" fill="${scuro}"/>
    ${archi}
    <path d="M-352 -54 v-30 h12 v30 z M-160 -54 v-34 h12 v34 z M32 -54 v-30 h12 v30 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}

/* --- Atene: il Partenone --- */
export function partenone({ scuro, oriz }){
  let col = "";
  for(let i = 0; i < 9; i++) col += `<rect x="${-128 + i * 30}" y="-118" width="16" height="118" fill="${scuro}"/>`;
  const t = `
    <path d="M-170 0 v-16 h340 v16 z" fill="${scuro}"/>
    <path d="M-150 -16 v-10 h300 v10 z" fill="${scuro}"/>
    ${col}
    <path d="M-152 -118 h304 v-18 h-304 z" fill="${scuro}"/>
    <path d="M-152 -136 h304 l-152 -56 z" fill="${scuro}"/>
    <path d="M-260 0 q60 -26 120 -8" fill="none" stroke="${scuro}" stroke-width="10" opacity="0.7"/>`;
  return g(830, oriz, 1.0, t);
}

/* --- Lisbona: la Torre di Belém --- */
export function belem({ scuro, oriz }){
  const merli = n => Array.from({length:n}, (_,i) => `<rect x="${-i*14 - 7}" y="-8" width="9" height="10" fill="${scuro}"/>`).join("");
  const t = `
    <path d="M-70 0 v-70 h140 V0 z" fill="${scuro}"/>
    <g transform="translate(64 -70)">${merli(10)}</g>
    <path d="M-34 -70 v-150 h68 v150 z" fill="${scuro}"/>
    <g transform="translate(30 -220)">${merli(5)}</g>
    <path d="M-22 -228 v-26 h44 v26 z" fill="${scuro}"/>
    <path d="M-22 -254 q22 -34 44 0 z" fill="${scuro}"/>
    <circle cx="-46" cy="-96" r="14" fill="${scuro}"/>
    <circle cx="46" cy="-96" r="14" fill="${scuro}"/>
    <path d="M-14 -140 h28 v40 h-28 z" fill="#0000" stroke="${scuro}" stroke-width="5" opacity="0.6"/>`;
  return g(830, oriz, 1.05, t);
}

/* --- Vienna: la guglia di Santo Stefano --- */
export function vienna({ scuro, oriz }){
  const t = `
    <path d="M-150 0 v-120 h300 V0 z" fill="${scuro}"/>
    <path d="M-150 -120 q150 -60 300 0 z" fill="${scuro}"/>
    <path d="M-64 -120 v-96 h56 v96 z" fill="${scuro}"/>
    <path d="M-64 -216 l28 -156 l28 156 z" fill="${scuro}"/>
    <path d="M-36 -372 v-30" stroke="${scuro}" stroke-width="4"/>
    <path d="M60 -120 v-70 h44 v70 z M60 -190 l22 -60 l22 60 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}

/* --- Varsavia: il Palazzo della Cultura --- */
export function varsavia({ scuro, oriz }){
  const t = `
    <path d="M-118 0 v-110 h236 V0 z" fill="${scuro}"/>
    <path d="M-84 -110 v-90 h168 v90 z" fill="${scuro}"/>
    <path d="M-54 -200 v-92 h108 v92 z" fill="${scuro}"/>
    <path d="M-32 -292 v-84 h64 v84 z" fill="${scuro}"/>
    <path d="M-32 -376 l32 -52 l32 52 z" fill="${scuro}"/>
    <path d="M0 -428 v-56" stroke="${scuro}" stroke-width="6"/>
    <path d="M-118 -110 h236 v-12 h-236 z M-84 -200 h168 v-12 h-168 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}

/* --- Amsterdam: le case a gradoni e il mulino --- */
export function amsterdam({ scuro, oriz }){
  const casa = (x, h) => `<path d="M${x} 0 v${-h} l14 -12 v-16 h10 v16 l14 12 V0 z" fill="${scuro}"/>`;
  const t = `
    ${[0,42,84,126,168].map((x,i) => casa(x - 130, 120 + (i % 3) * 26)).join("")}
    <g transform="translate(190 -30)">
      <path d="M-14 30 v-96 h28 v96 z" fill="${scuro}"/>
      <path d="M-18 -66 q18 -26 36 0 z" fill="${scuro}"/>
      <g transform="translate(0 -80)" fill="${scuro}">
        <path d="M-4 -4 l-70 -34 l8 -16 l70 34 z"/><path d="M4 -4 l70 34 l-8 16 l-70 -34 z"/>
        <path d="M-4 4 l-34 70 l16 8 l34 -70 z"/><path d="M4 -4 l34 -70 l-16 -8 l-34 70 z"/>
        <circle cx="0" cy="0" r="8"/>
      </g>
    </g>`;
  return g(830, oriz, 1.0, t);
}

/* --- Madrid: la Puerta de Alcalá --- */
export function madrid({ scuro, chiaro, oriz }){
  const t = `
    <path d="M-166 0 v-124 h332 V0 z" fill="${scuro}"/>
    <path d="M-42 0 v-84 a42 48 0 0 1 84 0 V0 z" fill="${chiaro}" opacity="0.42"/>
    <path d="M-142 0 v-54 a26 30 0 0 1 52 0 V0 z M90 0 v-54 a26 30 0 0 1 52 0 V0 z" fill="${chiaro}" opacity="0.32"/>
    <path d="M-176 -124 h352 v-24 h-352 z" fill="${scuro}"/>
    <path d="M-60 -148 h120 v-36 h-120 z" fill="${scuro}"/>
    <path d="M-60 -184 q60 -36 120 0 z" fill="${scuro}"/>
    <path d="M-122 -148 v-18 h18 v18 z M104 -148 v-18 h18 v18 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.1, t);
}

/* --- Sicilia: il tempio greco e l'Etna che fuma --- */
export function sicilia({ scuro, mezzo, oriz }){
  let col = "";
  for(let i = 0; i < 7; i++) col += `<rect x="${-96 + i * 30}" y="-104" width="17" height="104" fill="${scuro}"/>`;
  const t = `
    <g transform="translate(-420 -40) scale(1.5)" opacity="0.75">
      <path d="M-220 40 L-40 -150 L140 40 z" fill="${mezzo}"/>
      <path d="M-52 -140 q14 -34 -6 -60 q26 10 30 -22 q22 30 6 62 z" fill="${mezzo}" opacity="0.55"/>
    </g>
    <path d="M-124 0 v-14 h250 V0 z" fill="${scuro}"/>
    ${col}
    <path d="M-112 -104 h228 v-16 h-228 z" fill="${scuro}"/>
    <path d="M-112 -120 h228 l-114 -46 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}

/* --- Lourdes: il santuario ai piedi dei Pirenei --- */
export function lourdes({ scuro, oriz }){
  const t = `
    <path d="M-150 0 v-90 h300 V0 z" fill="${scuro}"/>
    <path d="M-96 -90 v-70 h192 v70 z" fill="${scuro}"/>
    <path d="M-40 -160 v-96 h80 v96 z" fill="${scuro}"/>
    <path d="M-40 -256 l40 -120 l40 120 z" fill="${scuro}"/>
    <path d="M0 -376 v-34" stroke="${scuro}" stroke-width="5"/>
    <path d="M-12 -398 h24 M0 -410 v24" stroke="${scuro}" stroke-width="5"/>
    <path d="M-118 -160 v-56 h44 v56 z M-118 -216 l22 -52 l22 52 z" fill="${scuro}"/>
    <path d="M74 -160 v-56 h44 v56 z M74 -216 l22 -52 l22 52 z" fill="${scuro}"/>
    <path d="M-150 0 q0 -60 -60 -74 l0 74 z M150 0 q0 -60 60 -74 l0 74 z" fill="${scuro}" opacity="0.8"/>`;
  return g(830, oriz, 1.0, t);
}

/* --- Puglia: i trulli --- */
export function trulli({ scuro, oriz }){
  const trullo = (x, s) => `<g transform="translate(${x} 0) scale(${s})">
    <path d="M-46 0 v-64 h92 V0 z" fill="${scuro}"/>
    <path d="M-58 -64 L0 -160 L58 -64 z" fill="${scuro}"/>
    <path d="M0 -160 v-16 a7 7 0 0 1 0 14 z" fill="${scuro}"/>
    <path d="M-40 -100 h80" stroke="${scuro}" stroke-width="3" opacity="0.4"/>
  </g>`;
  const t = `${trullo(-200, 0.85)}${trullo(-90, 1.05)}${trullo(30, 0.95)}${trullo(140, 1.15)}${trullo(270, 0.8)}
    <path d="M-260 0 h560 v14 h-560 z" fill="${scuro}"/>`;
  return g(830, oriz, 1.0, t);
}
