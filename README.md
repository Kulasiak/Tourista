# Tourista — gestionale per agenzia viaggi

Programma completo per un'agenzia che **organizza viaggi di gruppo**: dalla richiesta
del cliente fino al conto del viaggio quando il bus è tornato a casa. Sta tutto in
**un unico file HTML**: si apre in qualsiasi browser, non ha nessuna dipendenza,
non chiede abbonamenti e **funziona anche senza internet**.

Cinque lingue con la propria bandiera: **Italiano, English, Français, Español, Polski**.
Si cambia lingua con un tocco, in basso a sinistra.

All'apertura il programma chiede il **codice di entrata**: ogni persona dell'agenzia ha
il suo, così si sa sempre chi ha aperto una pratica e chi ha incassato.

Se in ufficio siete in due o in tre, si accende il **server dell'ufficio** (`server.js`,
un file, nessuna installazione): tutti i computer vedono le stesse pratiche e ogni
giorno parte da sola una copia di sicurezza.

> **Agenzia di prova.** Il programma parte con un'agenzia finta ma verosimile — sei
> partenze, sessanta pratiche, centodiciotto passeggeri — per poter provare tutto
> subito. I codici sono scritti sulla schermata di entrata (Marta 1111, Luca 2222,
> Sara 3333, Youssef 4444, Elena 5555). Da *Impostazioni → Svuota e ricomincia da
> zero* si toglie tutto e si comincia con i propri dati.

---

## Come si organizza un gruppo, dalla A alla Z

Questo è l'ordine giusto delle cose. Dentro il programma c'è la stessa lista, sotto
**Primi passi**: ogni passo diventa verde da solo quando è fatto davvero, guardando
i tuoi dati.

| # | Cosa fai | Perché in questo punto |
| --- | --- | --- |
| 1 | **I dati dell'agenzia** — nome, indirizzo, partita IVA, licenza, polizza, IBAN | Finiscono in testa a ogni conferma, ricevuta e foglio di viaggio |
| 2 | **Chi lavora con te** — titolare, booking, amministrazione, accompagnatori | Ogni pratica ha un venditore, ogni partenza un accompagnatore |
| 3 | **La rubrica dei fornitori** — hotel, bus, guide, ristoranti, voli, assicurazione | Senza fornitori non calcoli i costi né prenoti i servizi |
| 4 | **Il catalogo** — il prodotto: destinazione, giorni, descrizione, prezzo da | Si scrive una volta e si riusa per ogni data |
| 5 | **La partenza** — date, posti, **minimo per partire**, luogo di ritrovo | Il minimo è la cosa più importante: sotto quel numero si perde |
| 6 | **Il programma giorno per giorno** | Serve al cliente per decidere e all'accompagnatore per lavorare |
| 7 | **I costi, e solo dopo la quota** | Prima si conta quanto si spende, poi si decide quanto far pagare |
| 8 | **Blocca i servizi** — opzione all'hotel e al bus, con scadenza e acconto | Vendere senza avere le camere è l'errore che costa di più |
| 9 | **Apri le vendite** — locandina, testo per WhatsApp, partenza in vendita | Da qui ogni iscritto occupa un posto e sposta il pareggio |
| 10 | **Le pratiche** — cliente, passeggeri con documento, camere, extra, acconto | La pratica è il fascicolo di quella famiglia o di quel gruppo |
| 11 | **Acconti e saldi** — acconto alla firma, saldo trenta giorni prima | Lo scadenzario ti avvisa da solo di chi è in ritardo |
| 12 | **Camere e posti** — rooming list per l'hotel, piantina del bus | L'hotel chiude le camere se non riceve l'elenco |
| 13 | **I documenti del viaggio** — foglio di viaggio, elenco, etichette, badge | Si stampa tutto da una schermata sola, il giorno prima |
| 14 | **Il giorno della partenza** — appello con la spunta, nome per nome | Nessuno resta a terra |
| 15 | **Dopo il rientro** — conclusa, fornitori pagati, margine e IVA | È qui che scopri se il viaggio ha guadagnato davvero |

### Gli sbagli che costano (e come il programma li evita)

- **Vendere prima di avere le camere** → in *Fornitori* di ogni partenza si registra
  l'opzione con la data di scadenza, e il cruscotto avvisa quando sta per scadere.
- **Fissare la quota senza contare i costi** → la scheda *Costi e quota* calcola il
  costo a persona al variare del gruppo e il **punto di pareggio**.
- **Dimenticare le gratuità** → ogni voce di costo può avere «1 gratuità ogni 25»:
  il conto si aggiusta da solo.
- **Non prendere l'acconto** → la pratica nasce come *opzione* con una scadenza, e
  l'opzione scaduta compare in rosso sul cruscotto.
- **Lasciare correre i saldi** → lo *Scadenzario* divide tutto in scaduto, oggi,
  sette giorni, un mese.
- **Non guardare i documenti** → carta d'identità scaduta o passaporto in scadenza
  vengono segnalati sui passeggeri delle partenze vicine.
- **Rooming all'ultimo momento** → chi non ha ancora una camera è sempre in evidenza.
- **Nessuno che accompagna** → se manca l'accompagnatore a tre settimane dalla
  partenza, il cruscotto lo dice.

---

## Cosa c'è dentro

### Ogni giorno

| Schermata | Cosa fa |
| --- | --- |
| **Cruscotto** | Incassato del mese, da incassare, da pagare, posti venduti. Il riquadro **Da sistemare adesso** elenca in ordine di urgenza: opzioni scadute, saldi in ritardo, fornitori da pagare, partenze sotto il minimo, documenti scaduti, passeggeri senza camera. Sotto, le prossime partenze e sei mesi di incassi. |
| **Agenda** | Le cose da fare con scadenza e responsabile, il calendario del mese con i giorni di viaggio e le prossime scadenze di denaro. |
| **Primi passi** | La guida dei quindici passi, con i segni verdi che si accendono da soli. |

### I viaggi

| Schermata | Cosa fa |
| --- | --- |
| **Partenze** | Tutte le date con la barra dei posti venduti, filtri per stato, giro d'affari e margine atteso. |
| **Catalogo** | I viaggi in listino. Dal catalogo si crea una nuova data in due clic. |

Dentro ogni partenza ci sono otto schede:

- **Riepilogo** — anello dei posti, quota, incassato, margine, minimo, accompagnatore,
  punto di pareggio, lista d'attesa, azioni (conferma, duplica per un'altra data,
  locandina, testo per WhatsApp).
- **Programma** — giorno per giorno, con pasti e hotel di ogni notte; si stampa e si copia.
- **Costi e quota** — voci fisse e a persona, gratuità, costo a testa al variare del
  gruppo, prezzo consigliato e **punto di pareggio**.
- **Pratiche** — tutte le prenotazioni della partenza con pagato e residuo.
- **Rooming** — le camere una per una, con i letti liberi in evidenza; riepilogo per
  l'hotel e copia per l'email.
- **Posti in bus** — piantina 2+2 con i posti bloccati (autista, guida), assegnazione
  a mano o automatica, stampa per l'autista.
- **Appello** — la spunta nome per nome il giorno della partenza, con telefoni e note
  (diete, mobilità).
- **Fornitori** — servizi prenotati, acconti, scadenze, e la cassa della partenza
  (quanto hai incassato meno quanto hai già pagato).

### I preventivi per le comitive

Quando una parrocchia o un CRAL chiede «quanto ci costa?», il viaggio non
esiste ancora. Il preventivo si fa prima: si mettono i costi che danno i
fornitori (bus, hotel, guide, ingressi), si dice quanto si vuole guadagnare, e
il programma dice **la quota da chiedere a testa**.

Poi risponde alle tre domande che contano:

- **quante persone servono per non rimetterci** (il punto di pareggio);
- **come cambia il prezzo** se il gruppo cresce o cala — una tabella da 10 in
  meno a 10 in più, con costo a testa e margine;
- **quanto ci guadagniamo** in euro e in percentuale.

Le **gratuità** («una ogni venticinque») le conta lui e le mostra: sono soldi
che altrimenti si regalano senza accorgersene.

Si parte da una richiesta (nome, destinazione e numero di persone si portano
dietro da soli) oppure da un viaggio del catalogo. Si può **duplicare** un
preventivo per fare la variante 3 stelle e la variante 4 stelle e metterle a
confronto.

Ne esce un **foglio da mandare al gruppo**: viaggio, quota, cosa comprende,
cosa non comprende, fino a quando è valido.

Quando il gruppo dice di sì, il preventivo **diventa una partenza vera con un
clic**: costi, quota e prestazioni passano dentro, e da lì si vendono i posti.
Se invece si perde, ci si scrive perché — così l'anno dopo si sa contro chi e
per quanto.

### Le persone

**Pratiche** (il fascicolo: passeggeri, camere, extra, sconti, pagamenti, stato,
promemoria per il cliente) · **Passeggeri** (anagrafica con documenti e scadenze,
diete e mobilità, storico dei viaggi) · **Clienti** (privati, comitive, scuole,
aziende, con convenzioni e giro d'affari) · **Richieste** (il lavoro prima della
vendita, a colonne: da preventivare, preventivo inviato, in trattativa, vinta, persa).

### I soldi e il gestionale dell'agenzia

| Schermata | Cosa fa |
| --- | --- |
| **Scadenzario** | Da incassare e da pagare, divisi in scaduto / oggi / sette giorni / un mese, con il tasto per incassare o pagare sul posto. |
| **Contabilità** | Sei schede: *Riepilogo* (cassa del mese e quadro dell'anno), *Conto per partenza* (ricavi, costi, margine e percentuale viaggio per viaggio), *Prima nota* (affitto, stipendi, utenze, marketing…), *IVA 74-ter* (il regime del margine delle agenzie di viaggio, calcolato per ogni partenza), *Statistiche* (destinazioni che rendono di più, chi vende, da dove arrivano i clienti, riempimento medio), *Personale* (chi lavora in agenzia, quanto ha venduto, codici di entrata). |
| **Fornitori** | Rubrica per tipo con i debiti aperti e lo storico dei servizi. |

### La fattura

Per i clienti che la chiedono — parrocchie, scuole, aziende — il programma fa
la **fattura polacca**, quella che si stampa e si dà in mano al cliente.

Si parte da una pratica già confermata: viaggio, importo e scadenza li mette
lui. Tu controlli i dati del cliente (nome, indirizzo, e il **NIP** se è
un'azienda o una scuola) e stampi.

**Prima di stampare, controlla.** Se manca qualcosa te lo dice in italiano
chiaro, riga per riga: «Manca il comune del cliente», «Per un'azienda serve il
NIP di dieci cifre». Così non esce una fattura da rifare.

Per i viaggi dell'agenzia usa da solo la **procedura del margine**: la fattura
non espone l'IVA e porta scritta la dicitura
*Procedura marży dla biur podróży — art. 119 ustawy o VAT*, come vuole la
legge. Per le provvigioni e i servizi a parte ci sono le aliquote normali
(23%, 8%, 5%, 0%) più *zw.* e *np.*

L'importo lo scrive anche **in lettere in polacco**, con la grammatica giusta:
*tysiąc osiemset trzydzieści złotych 00/100*, non *jeden tysiąc*.

Ci sono la **fattura di rettifica** (korekta), la **proforma**, e gli stati
bozza / emessa / pagata / stornata.

**Il programma non manda niente a nessuno.** È una fattura per uso interno
dell'agenzia e per il cliente. Il giorno che servirà il **KSeF** si aggiunge:
il documento e i conti sono già a posto, cambia solo il file che esce.

### I documenti che si stampano

Dalla partenza: **foglio di viaggio dell'accompagnatore** (programma, contatti,
rooming e appello in un fascicolo), **rooming list per l'hotel**, **elenco
partecipanti** con documenti, **foglio dell'appello**, **piantina dei posti**,
**etichette per i bagagli**, **badge**, **programma da consegnare**, **locandina**
per la vetrina.
Dalla pratica: **conferma di prenotazione** da far firmare, **ricevuta** di acconto o
saldo, **estratto conto**.

---

## Come si usa

### Aprirlo

Basta aprire `index.html` con un doppio clic: funziona anche da chiavetta, senza
installare niente. Se lo metti su un sito (per esempio su Vercel, il file
`vercel.json` è già pronto) puoi anche **installarlo sul telefono** come
un'applicazione: si apre a tutto schermo e continua a funzionare senza linea.

### Dove finiscono i dati

Tutto quello che scrivi resta **in casa tua**: nell'archivio del browser di quel
computer, oppure — se accendi il server dell'ufficio — sul computer che fa da
server. Niente abbonamenti, niente nuvola, nessuno che guarda da fuori.

- fai ogni tanto una **copia di sicurezza** da *Impostazioni → Scarica una copia*:
  è un file `.json` che si rimette con *Ripristina da una copia*;
- da *Impostazioni* si esportano anche gli elenchi in **CSV** per il commercialista;
- con il server acceso, la copia del giorno la fa lui da solo.

---

## Il logo

Il programma disegna da solo un marchio (mappamondo, anello d'oro, **BP**) e lo
mette **nella barra a sinistra, nella schermata d'entrata e in cima a tutti i
documenti che stampi**.

Per mettere il tuo logo vero: **Impostazioni → Il logo → Carica il logo**.
Va bene un PNG con lo sfondo trasparente o un SVG, meglio se quadrato, fino a
mezzo mega. Da quel momento esce dappertutto al posto del disegno; con «Togli»
si torna indietro.

Nel **sito** basta mettere il file in `sito/temi/` col nome `logo.svg` (oppure
`logo.png`, `logo.webp`, `logo.jpg`) e rifare `node costruisci.mjs`: il
costruttore lo trova da solo e lo usa nell'intestazione e in fondo a ogni
pagina. Se non c'è, disegna il marchio.

C'è anche un colore dell'agenzia — **blu navy e oro**, come il logo — ed è
quello di partenza. Gli altri (chiaro, notte, deserto, mare) restano lì:
Impostazioni → Colore.

## Le sei lingue

Italiano, inglese, francese, spagnolo, polacco e **arabo**. Si cambia con le
bandierine in fondo alla barra di sinistra: cambia tutto — schermate, finestre,
messaggi e documenti da stampare — e la scelta resta anche alla riapertura.

L'arabo si scrive da destra a sinistra: quando lo scegli il programma **gira
tutto dall'altra parte** da solo (barra a destra, tabelle a destra, testo a
destra), tranne i numeri e gli importi, che restano leggibili da sinistra.
Nessuna schermata si rompe: sono state provate tutte.

Le tue parole — programmi di viaggio, note, nomi dei clienti — restano come le
hai scritte: il programma traduce le proprie scritte, non le tue.

## Aggiungere una lingua

Le cinque lingue stanno **dentro** il programma: da solo funziona sempre. Per
aggiungerne un'altra — o solo per cambiare una parola che non ti piace — si mette
un file **accanto** a `index.html`:

| File | Quando | Come si scrive |
| --- | --- | --- |
| `lingue.js` | anche aprendo il programma col doppio clic | `window.LINGUE = { ... }` |
| `lingue.json` | quando il programma sta su un sito o sul server | solo il pacchetto, senza involucro |

Oppure, senza toccare cartelle: *Impostazioni → File delle lingue → **Carica un
file***. Quello che carichi resta anche domani, su quel computer.

### Il giro completo

1. *Impostazioni → **Scarica il modello***: scegli la lingua (tedesco, arabo,
   rumeno, russo…) e ti scarichi un file con **tutte** le frasi del programma.
2. Lo riempi con calma. Le caselle lasciate vuote **restano in italiano**: puoi
   anche fermarti a metà e continuare domani.
3. Lo ricarichi da *Carica un file*, o lo metti nella cartella come `lingue.json`.
4. *Controlla* dice quante frasi sono a posto e quante mancano, lingua per lingua.

Il file è fatto così — la frase italiana fa da chiave:

```json
{
  "lingue": [
    { "id": "de", "nome": "Deutsch", "flag": "🇩🇪", "locale": "de-DE",
      "mesi": ["Januar", "…"], "giorni": ["Sonntag", "…"] }
  ],
  "voci": {
    "Cruscotto": { "de": "Übersicht" },
    "Nuova partenza": { "de": "Neue Abfahrt" }
  }
}
```

Per le lingue che si scrivono da destra (arabo, ebraico) basta aggiungere
`"rtl": true` e il programma gira da solo. Nel deposito c'è
`lingue.esempio.json`: un tedesco a metà, da copiare e completare.

### Se il file ha qualche problema

Non succede niente di male, e il programma **non si ferma mai**:

| Problema | Cosa fa |
| --- | --- |
| Il file non c'è | Va avanti con le cinque lingue di dentro |
| Il file è rotto (non è JSON) | Lo ignora e lo scrive in Impostazioni |
| Ha la forma sbagliata | Lo ignora, senza toccare quello che c'era |
| Ha righe sporche in mezzo a righe buone | Prende le buone, salta le altre e ti dice quante |
| Manca una frase | Quella frase resta in italiano |
| Vuoi tornare indietro | *Impostazioni → File delle lingue → **Togli*** |

L'italiano non si può sovrascrivere: è la chiave con cui si trovano le frasi.

---

## Lavorare in due o in tre

Da soli non serve niente: il programma funziona così com'è. Se invece in agenzia
lavorate in due o in tre, si accende il **server dell'ufficio**.

### Come si accende

Su un computer che resta acceso (basta un portatile in un angolo), nella cartella
del programma:

```
node server.js
```

Scrive lui gli indirizzi da usare:

```
  Su questo computer:   http://localhost:7070
  Dagli altri computer: http://192.168.1.20:7070
```

Sugli altri computer si apre quell'indirizzo nel browser: **si collegano da soli**,
non c'è niente da impostare. Chi invece apre il file `index.html` sul proprio
computer mette l'indirizzo a mano in *Impostazioni → Lavorare in due o in tre*.

Se serve una parola d'ordine: `node server.js --chiave laparola`
(e la stessa parola si scrive nelle impostazioni di ogni computer).
Con `--porta 7071` si cambia la porta.

### Come si comporta

| Situazione | Cosa succede |
| --- | --- |
| Scrivi una pratica | In pochi secondi la vedono anche gli altri |
| Il server è spento | Continui a lavorare lo stesso: quello che scrivi resta qui e parte da solo appena il server torna |
| Due persone toccano **cose diverse** | Restano tutte e due: si unisce pratica per pratica, non a blocco |
| Due persone toccano **la stessa pratica** | Vince l'ultima che arriva al server. L'orologio buono è quello del server, così un computer con la data sbagliata non fa danni |
| Un computer nuovo si collega | Se ha ancora l'agenzia di prova, la butta e prende l'archivio vero. I dati finti non finiscono mai nell'archivio comune |
| Cancelli qualcosa | Sparisce anche dagli altri (il server se ne ricorda per sessanta giorni) |

### Dove stanno i dati con il server acceso

- `dati/archivio.json` — l'archivio dell'ufficio, scritto prima di fianco e poi
  spostato, così se manca la luce quello buono resta intero.
- `copie/tourista-AAAA-MM-GG.json` — **una copia al giorno**, in automatico. Restano
  le ultime trenta. Da *Impostazioni → Copia del server* si scarica quella di adesso.

Il server sta sulla **rete dell'ufficio**: non va aperto su internet. Se ti serve
lavorare da fuori, si fa con una VPN o si pubblica il programma da solo (senza
server) e si continua con le copie a mano.

### I codici di entrata

Si danno da *Contabilità → Personale*: quattro cifre a testa. Chi ha il ruolo
*titolare* o *amministrazione* vede tutto; *booking* non entra in contabilità e
impostazioni; *accompagnatore* vede solo viaggi, passeggeri e pratiche. Dopo venti
minuti senza toccare niente il programma si richiude da solo.

Se non dai nessun codice, il programma si apre senza chiedere niente: va bene se
lavori da solo.

---

## Note

- **IVA 74-ter**: il calcolo dell'imposta sul margine è un promemoria di gestione,
  non una dichiarazione fiscale. I numeri vanno sempre passati al commercialista.
- Le **conferme e le ricevute** non sono documenti fiscali: la fattura la emette il
  gestionale fiscale dell'agenzia.
- L'interfaccia è in cinque lingue; i tuoi testi (programmi, note, nomi) restano
  come li hai scritti.

---

## Il sito dell'agenzia

Nella cartella `sito/` c'è il sito pubblico, **in due versioni diverse fra cui
scegliere**, ognuna completa e nelle stesse lingue del gestionale.

| Versione | Come si presenta |
| --- | --- |
| **Vetrina** | Elegante, caldo, caratteri con le grazie, spazi larghi. Fa pensare a un'agenzia che c'è da vent'anni. |
| **Moderna** | Fondo scuro, colori vivi, caratteri grandi. Fa pensare a un'agenzia che si muove in fretta. |

Aprendo `sito/pubblica/index.html` si vedono tutte e due e si sceglie.

### Cosa c'è dentro (per ogni versione, per ogni lingua)

- **Home** — apertura con lo slogan, perché ci scelgono, i viaggi, come funziona,
  i gruppi con cui lavoriamo, i numeri, le voci dei clienti, il blog e la chiamata
  all'azione.
- **Viaggi** — catalogo con filtro bus/aereo, e **una scheda per ogni viaggio**:
  programma giorno per giorno, cosa comprende e cosa no, quota, minimo, partenze.
- **Gruppi** — la pagina che vende davvero: parrocchie, scuole, CRAL, associazioni,
  con le gratuità e le garanzie scritte.
- **Destinazioni** — le **42 città più belle del mondo**, divise per continente:
  Europa, Asia, Medio Oriente, Nord Africa, Africa, Nord America, Sud America,
  Oceania. Ognuna con la sua immagine e una riga che dice perché vale il viaggio.
- **Chi siamo**, **Domande** (14 con dati per Google), **Blog** (3 articoli lunghi),
  **Contatti** con il modulo, **Privacy**, **404**.
- **Volantino** A4 da stampare e appendere in bacheca.
- **Pubblicità**: testi già pronti da copiare — WhatsApp, Instagram, Facebook,
  annunci Google, email ai soci — più gli slogan.

### Le immagini delle città

Ogni città ha la sua immagine: **42 illustrazioni originali** in SVG, una per
destinazione, con il monumento che la fa riconoscere al primo sguardo — la Torre
Eiffel, il Colosseo, il Partenone, le piramidi, il Cristo di Rio, l'Opera di
Sydney. Pesano pochi KB, restano nitide su qualsiasi schermo e **non hanno
diritti d'autore da pagare**.

Si rifanno tutte con:

```
cd sito
node crea-immagini.mjs
```

Se un giorno vuoi le **foto vere**, basta metterle in `sito/immagini/foto/` con
il nome della città (`parigi.jpg`, `roma.jpg`…): il sito usa la foto e il disegno
resta sotto come rete di sicurezza. Per scaricarle in automatico, da foto libere
anche per uso commerciale, con i crediti scritti da solo:

```
cd sito
node scarica-foto.mjs
```

La guida completa, con i siti dove prendere le foto e le tre cose da non fare,
sta in `sito/immagini/FOTO.md`.

### Per i motori di ricerca

Titoli e descrizioni scritti pagina per pagina, indirizzo canonico, **hreflang** fra
tutte e cinque le lingue, Open Graph per quando si condivide, dati strutturati
(`TravelAgency`, `TouristTrip`, `FAQPage`, `BlogPosting`), `sitemap.xml` con 90
indirizzi e `robots.txt`. Nessuna libreria esterna: le pagine pesano poco e si
aprono subito anche da telefono.

### Come si cambia

I testi stanno in `sito/contenuti/<lingua>.mjs` — uno per lingua, tutti con la
stessa forma. I dati che non cambiano da una lingua all'altra (agenzia, viaggi,
prezzi, colori) stanno in `sito/contenuti/comune.mjs`. La grafica sta in
`sito/temi/vetrina.css` e `sito/temi/moderna.css`.

Dopo aver modificato qualcosa:

```
cd sito
node costruisci.mjs
```

Rigenera tutto in `sito/pubblica/` — 210 pagine in pochi secondi, nessuna
installazione. Se manca il file di una lingua, il sito si costruisce lo stesso
con quelle che ci sono.

Per pubblicarlo su Vercel si punta il progetto alla cartella della versione
scelta (`sito/pubblica/vetrina` oppure `sito/pubblica/moderna`): dentro c'è già
il suo `vercel.json`.

### Farlo vedere a qualcuno prima di pubblicarlo

```
cd sito
node anteprima.mjs
```

Fa un solo file, `sito/anteprima.html`, con **dentro tutto**: le due grafiche,
le cinque lingue, tutte le pagine e tutte le immagini. Si apre con un doppio
clic e si può mandare per email o su WhatsApp a chi deve dare un'occhiata:
non serve un server e non serve internet. In fondo c'è un bottone per passare
da **Vetrina** a **Moderna** e vedere la differenza.

## Cosa c'è nel deposito

| File | A cosa serve |
| --- | --- |
| `index.html` | Tutto il gestionale: schermate, calcoli, documenti, dizionario delle cinque lingue |
| `server.js` | Il server dell'ufficio: fa vedere le stesse pratiche a più computer e tiene le copie di ogni giorno |
| `lingue.esempio.json` | Esempio di file delle lingue (tedesco a metà), da copiare e completare |
| `sito/` | Il sito pubblico: due versioni grafiche, cinque lingue, generatore e testi |
| `sito/immagini/` | Le 42 illustrazioni delle città, il motore che le disegna e la guida alle foto |
| `sito/anteprima.mjs` | Mette tutto il sito in un file solo, da far vedere prima di pubblicarlo |
| `manifest.webmanifest` | Per installarlo come applicazione su telefono e computer |
| `sw.js` | Fa funzionare il programma anche senza linea |
| `vercel.json` | Per pubblicarlo su Vercel |
| `icon-*.png`, `apple-touch-icon.png` | Le icone dell'applicazione |
