/* ============================================================
   IL MARCHIO DELL'AGENZIA
   Se in temi/ c'è un file logo.svg o logo.png si usa quello.
   Se no si disegna questo.
   ============================================================ */
export function marchio(dim, n){
  const idO = "o" + (n || 1), idB = "b" + (n || 1);
  return `<svg viewBox="0 0 100 100" width="${dim}" height="${dim}" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="${idO}" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#A8822F"/><stop offset=".45" stop-color="#E0C689"/><stop offset="1" stop-color="#B08B3E"/>
    </linearGradient>
    <linearGradient id="${idB}" x1="0" y1="0" x2=".9" y2="1">
      <stop offset="0" stop-color="#2E6396"/><stop offset="1" stop-color="#14385C"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="#8FA3B5" stroke-width="2.4" stroke-linecap="round">
    <path d="M50 17.5a32.5 32.5 0 0 1 27.6 49.6"/><path d="M22.4 67.1A32.5 32.5 0 0 1 50 17.5"/>
    <path d="M50 82.5a32.5 32.5 0 0 1-27.6-15.4"/><path d="M77.6 67.1A32.5 32.5 0 0 1 50 82.5"/>
    <path d="M50 17.5c-8 8-12 19-12 32.5s4 24.5 12 32.5"/><path d="M50 17.5c8 8 12 19 12 32.5s-4 24.5-12 32.5"/>
    <path d="M27 31.5h46 M18.5 50h63 M27 68.5h46"/>
  </g>
  <g transform="rotate(-22 50 52)"><path d="M50 26.5c21.5 0 39 11.4 39 25.5S71.5 77.5 50 77.5 11 66.1 11 52s17.5-25.5 39-25.5z
    m0 4.2c-19.2 0-34.8 9.5-34.8 21.3s15.6 21.3 34.8 21.3 34.8-9.5 34.8-21.3S69.2 30.7 50 30.7z" fill="url(#${idO})"/></g>
  <path d="M58 72C63 55 72 40 97 18 82 40 74 57 70 76c-1.5 6-2 10-2.4 14-2-8-5-13-9.6-18z" fill="url(#${idB})"/>
  <text x="46" y="62" text-anchor="middle" font-family="Georgia,'Times New Roman',serif"
        font-weight="700" font-size="39" fill="url(#${idB})" letter-spacing="-1.5">BP</text>
</svg>`;
}
