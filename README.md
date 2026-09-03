# Tourista — gestionale per agenzia viaggi

Programma completo per un'agenzia che **organizza viaggi di gruppo**: dalla richiesta
del cliente fino al conto del viaggio quando il bus è tornato a casa. Sta tutto in
**un unico file HTML**: si apre in qualsiasi browser, non ha nessuna dipendenza,
non chiede abbonamenti e **funziona anche senza internet**.

Cinque lingue con la propria bandiera: **Italiano, English, Français, Español, Polski**.
Si cambia lingua con un tocco, in basso a sinistra.

All'apertura il programma chiede il **codice di entrata**: ogni persona dell'agenzia ha
il suo, così si sa sempre chi ha aperto una pratica e chi ha incassato.

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

Tutto quello che scrivi resta **su quell'apparecchio**, dentro l'archivio del
browser. Niente server, niente abbonamenti, nessuno che guarda da fuori. Per questo:

- fai ogni tanto una **copia di sicurezza** da *Impostazioni → Scarica una copia*:
  è un file `.json` che si rimette con *Ripristina da una copia*;
- se cambi computer, porta con te quel file;
- da *Impostazioni* si esportano anche gli elenchi in **CSV** per il commercialista.

Se due persone lavorano su due computer diversi, ognuno ha il suo archivio: per
metterli insieme si usa la copia di sicurezza.

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

## Cosa c'è nel deposito

| File | A cosa serve |
| --- | --- |
| `index.html` | Tutto il gestionale: schermate, calcoli, documenti, dizionario delle cinque lingue |
| `manifest.webmanifest` | Per installarlo come applicazione su telefono e computer |
| `sw.js` | Fa funzionare il programma anche senza linea |
| `vercel.json` | Per pubblicarlo su Vercel |
| `icon-*.png`, `apple-touch-icon.png` | Le icone dell'applicazione |
