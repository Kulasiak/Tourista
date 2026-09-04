/* ============================================================
   CREA LE IMMAGINI DELLE CITTÀ
   Uso:  node crea-immagini.mjs
   Scrive un file SVG per ogni città in immagini/citta/.
   Sono disegni nostri: nessun diritto d'autore, pochi KB l'uno.
   ============================================================ */
import { writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { disegna } from "./immagini/motore.mjs";
import { CITTA } from "./immagini/citta.mjs";

const QUI = dirname(fileURLToPath(import.meta.url));
const FUORI = join(QUI, "immagini", "citta");
mkdirSync(FUORI, { recursive: true });

let peso = 0;
for(const c of CITTA){
  const svg = disegna({ ...c, aria: c.n[0] });
  const file = join(FUORI, c.slug + ".svg");
  writeFileSync(file, svg);
  peso += Buffer.byteLength(svg);
}

/* le foto vere, se ci sono, hanno la precedenza sui disegni */
const CARTELLA_FOTO = join(QUI, "immagini", "foto");
const foto = existsSync(CARTELLA_FOTO)
  ? readdirSync(CARTELLA_FOTO).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
  : [];

console.log(`immagini disegnate: ${CITTA.length} · peso totale: ${(peso/1024).toFixed(0)} KB`);
console.log(`foto vere trovate: ${foto.length}${foto.length ? " (useremo quelle)" : " (per ora si usano i disegni)"}`);
