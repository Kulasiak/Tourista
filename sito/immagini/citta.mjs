/* ============================================================
   L'ELENCO DELLE CITTÀ
   Una riga per città: il monumento che la disegna, il cielo,
   il gruppo (continente) e il nome nelle cinque lingue.
   L'ordine delle lingue è sempre: it, en, fr, es, pl.
   ============================================================ */
import * as EU from "./citta-europa.mjs";
import * as MO from "./citta-mondo.mjs";

/* i gruppi, nell'ordine in cui compaiono nella galleria */
export const GRUPPI = [
  { id:"europa",      nomi:["Europa","Europe","Europe","Europa","Europa"] },
  { id:"asia",        nomi:["Asia","Asia","Asie","Asia","Azja"] },
  { id:"oriente",     nomi:["Medio Oriente","Middle East","Moyen-Orient","Oriente Medio","Bliski Wschód"] },
  { id:"nordafrica",  nomi:["Nord Africa","North Africa","Afrique du Nord","Norte de África","Afryka Północna"] },
  { id:"africa",      nomi:["Africa","Africa","Afrique","África","Afryka"] },
  { id:"nordamerica", nomi:["Nord America","North America","Amérique du Nord","América del Norte","Ameryka Północna"] },
  { id:"sudamerica",  nomi:["Sud America","South America","Amérique du Sud","América del Sur","Ameryka Południowa"] },
  { id:"altre",       nomi:["Oceania e altre meraviglie","Oceania and other wonders","Océanie et autres merveilles","Oceanía y otras maravillas","Oceania i inne cuda"] }
];

export const CITTA = [
/* ---------------- EUROPA ---------------- */
{ slug:"parigi", gruppo:"europa", monumento:EU.eiffel, cielo:"tramonto", acqua:true, grande:1.38, largo:53, cerca:"Eiffel Tower Paris sunset",
  n:["Parigi","Paris","Paris","París","Paryż"],
  f:["La torre di ferro che si accende sulla Senna","The iron tower lighting up over the Seine","La tour de fer qui s'allume sur la Seine","La torre de hierro que se enciende sobre el Sena","Żelazna wieża rozświetlona nad Sekwaną"] },
{ slug:"roma", gruppo:"europa", monumento:EU.colosseo, cielo:"alba", grande:2.4, largo:151, cerca:"Colosseum Rome",
  n:["Roma","Rome","Rome","Roma","Rzym"],
  f:["Duemila anni di storia in una piazza sola","Two thousand years of history in a single square","Deux mille ans d'histoire sur une seule place","Dos mil años de historia en una sola plaza","Dwa tysiące lat historii na jednym placu"] },
{ slug:"londra", gruppo:"europa", monumento:EU.bigben, cielo:"giorno", acqua:true, grande:1.34, largo:260, cerca:"Big Ben London Thames",
  n:["Londra","London","Londres","Londres","Londyn"],
  f:["L'orologio più famoso del mondo, sul Tamigi","The world's most famous clock, on the Thames","L'horloge la plus célèbre du monde, sur la Tamise","El reloj más famoso del mundo, sobre el Támesis","Najsłynniejszy zegar świata, nad Tamizą"] },
{ slug:"praga", gruppo:"europa", monumento:EU.praga, cielo:"alba", acqua:true, grande:1.52, largo:300, cerca:"Prague Charles Bridge castle",
  n:["Praga","Prague","Prague","Praga","Praga"],
  f:["Il castello, il ponte e cento guglie","The castle, the bridge and a hundred spires","Le château, le pont et cent clochers","El castillo, el puente y cien agujas","Zamek, most i sto wież"] },
{ slug:"atene", gruppo:"europa", monumento:EU.partenone, cielo:"tramonto", monti:150, grande:2.4, largo:260, cerca:"Parthenon Acropolis Athens",
  n:["Atene","Athens","Athènes","Atenas","Ateny"],
  f:["Dove è nata l'idea stessa di Europa","Where the very idea of Europe was born","Où est née l'idée même de l'Europe","Donde nació la idea misma de Europa","Gdzie narodziła się sama idea Europy"] },
{ slug:"lisbona", gruppo:"europa", monumento:EU.belem, cielo:"tramonto", acqua:true, grande:1.85, largo:74, cerca:"Belem Tower Lisbon",
  n:["Lisbona","Lisbon","Lisbonne","Lisboa","Lizbona"],
  f:["La torre da cui partivano le caravelle","The tower the caravels sailed from","La tour d'où partaient les caravelles","La torre de la que zarpaban las carabelas","Wieża, z której wypływały karawele"] },
{ slug:"vienna", gruppo:"europa", monumento:EU.vienna, cielo:"neve", grande:1.31, largo:150, cerca:"St Stephen's Cathedral Vienna",
  n:["Vienna","Vienna","Vienne","Viena","Wiedeń"],
  f:["Musica, caffè e la guglia di Santo Stefano","Music, coffee and the spire of St Stephen's","Musique, café et la flèche de Saint-Étienne","Música, café y la aguja de San Esteban","Muzyka, kawa i wieża katedry św. Szczepana"] },
{ slug:"varsavia", gruppo:"europa", monumento:EU.varsavia, cielo:"giorno", acqua:true, grande:1.08, largo:118, cerca:"Warsaw Palace of Culture skyline",
  n:["Varsavia","Warsaw","Varsovie","Varsovia","Warszawa"],
  f:["Una città rinata, pietra su pietra","A city reborn, stone by stone","Une ville renée, pierre après pierre","Una ciudad renacida, piedra a piedra","Miasto odrodzone, kamień po kamieniu"] },
{ slug:"amsterdam", gruppo:"europa", monumento:EU.amsterdam, cielo:"giorno", acqua:true, grande:2.4, largo:264, cerca:"Amsterdam canal houses",
  n:["Amsterdam","Amsterdam","Amsterdam","Ámsterdam","Amsterdam"],
  f:["Case strette, canali larghi, biciclette dappertutto","Narrow houses, wide canals, bicycles everywhere","Maisons étroites, larges canaux, vélos partout","Casas estrechas, canales anchos, bicicletas por todas partes","Wąskie kamienice, szerokie kanały, rowery wszędzie"] },
{ slug:"madrid", gruppo:"europa", monumento:EU.madrid, cielo:"tramonto", grande:2.36, largo:194, cerca:"Puerta de Alcala Madrid",
  n:["Madrid","Madrid","Madrid","Madrid","Madryt"],
  f:["La città che cena tardi e non dorme mai","The city that dines late and never sleeps","La ville qui dîne tard et ne dort jamais","La ciudad que cena tarde y nunca duerme","Miasto, które je kolację późno i nigdy nie śpi"] },
{ slug:"palermo", gruppo:"europa", monumento:EU.sicilia, cielo:"tramonto", acqua:true, monti:130, grande:1.03, largo:300, cerca:"Valley of the Temples Agrigento",
  n:["Palermo","Palermo","Palerme","Palermo","Palermo"],
  f:["Templi greci, mare e l'Etna che fuma","Greek temples, the sea and Etna smoking","Temples grecs, la mer et l'Etna qui fume","Templos griegos, el mar y el Etna humeante","Greckie świątynie, morze i dymiąca Etna"] },
{ slug:"lourdes", gruppo:"europa", monumento:EU.lourdes, cielo:"notte", monti:200, acqua:true, grande:1.28, largo:210, cerca:"Sanctuary of Our Lady of Lourdes",
  n:["Lourdes","Lourdes","Lourdes","Lourdes","Lourdes"],
  f:["La fiaccolata sotto i Pirenei, ogni sera","The torchlight procession under the Pyrenees, every evening","La procession aux flambeaux sous les Pyrénées, chaque soir","La procesión de las antorchas bajo los Pirineos, cada noche","Procesja ze świecami pod Pirenejami, każdego wieczoru"] },
{ slug:"alberobello", gruppo:"europa", monumento:EU.trulli, cielo:"giorno", grande:2.26, largo:300, cerca:"Alberobello trulli",
  n:["Alberobello","Alberobello","Alberobello","Alberobello","Alberobello"],
  f:["I tetti di pietra dei trulli, uno accanto all'altro","The stone roofs of the trulli, one beside the other","Les toits de pierre des trulli, l'un à côté de l'autre","Los techos de piedra de los trulli, uno junto al otro","Kamienne dachy trulli, jeden przy drugim"] },

/* ---------------- ASIA ---------------- */
{ slug:"tokyo", gruppo:"asia", monumento:MO.tokyo, cielo:"notte", grande:1.3, largo:61, cerca:"Tokyo Tower night",
  n:["Tokyo","Tokyo","Tokyo","Tokio","Tokio"],
  f:["Il futuro con i templi in mezzo","The future with temples in the middle","Le futur avec des temples au milieu","El futuro con templos en medio","Przyszłość ze świątyniami pośrodku"] },
{ slug:"pechino", gruppo:"asia", monumento:MO.pechino, cielo:"alba", grande:1.4, largo:190, cerca:"Temple of Heaven Beijing",
  n:["Pechino","Beijing","Pékin","Pekín","Pekin"],
  f:["Il Tempio del Cielo e la Grande Muraglia a un'ora","The Temple of Heaven, and the Great Wall an hour away","Le Temple du Ciel et la Grande Muraille à une heure","El Templo del Cielo y la Gran Muralla a una hora","Świątynia Nieba i Wielki Mur godzinę dalej"] },
{ slug:"bangkok", gruppo:"asia", monumento:MO.bangkok, cielo:"tramonto", acqua:true, palme:2, grande:2.08, largo:220, cerca:"Wat Arun Bangkok",
  n:["Bangkok","Bangkok","Bangkok","Bangkok","Bangkok"],
  f:["Templi d'oro e mercati sull'acqua","Golden temples and floating markets","Temples d'or et marchés flottants","Templos de oro y mercados flotantes","Złote świątynie i pływające targi"] },
{ slug:"singapore", gruppo:"asia", monumento:MO.singapore, cielo:"notte", acqua:true, grande:2.03, largo:200, cerca:"Marina Bay Sands Singapore skyline",
  n:["Singapore","Singapore","Singapour","Singapur","Singapur"],
  f:["Un giardino grande come una città","A garden the size of a city","Un jardin grand comme une ville","Un jardín del tamaño de una ciudad","Ogród wielkości miasta"] },
{ slug:"delhi", gruppo:"asia", monumento:MO.delhi, cielo:"deserto", grande:1.59, largo:130, cerca:"India Gate New Delhi",
  n:["Delhi","Delhi","Delhi","Delhi","Delhi"],
  f:["Colori, spezie e l'India Gate al tramonto","Colours, spices and India Gate at sunset","Couleurs, épices et l'India Gate au coucher du soleil","Colores, especias y la India Gate al atardecer","Kolory, przyprawy i Brama Indii o zachodzie"] },
{ slug:"seul", gruppo:"asia", monumento:MO.seul, cielo:"giorno", monti:160, grande:1.77, largo:290, cerca:"Gyeongbokgung Seoul",
  n:["Seul","Seoul","Séoul","Seúl","Seul"],
  f:["Palazzi antichi in mezzo ai grattacieli","Ancient palaces among the skyscrapers","Palais anciens au milieu des gratte-ciel","Palacios antiguos entre los rascacielos","Dawne pałace pośród wieżowców"] },

/* ---------------- MEDIO ORIENTE ---------------- */
{ slug:"istanbul", gruppo:"oriente", monumento:MO.istanbul, cielo:"tramonto", acqua:true, grande:1.64, largo:230, cerca:"Hagia Sophia Istanbul",
  n:["Istanbul","Istanbul","Istanbul","Estambul","Stambuł"],
  f:["Due continenti, un solo panorama","Two continents, one skyline","Deux continents, un seul panorama","Dos continentes, un solo panorama","Dwa kontynenty, jedna panorama"] },
{ slug:"dubai", gruppo:"oriente", monumento:MO.dubai, cielo:"notte", acqua:true, grande:0.8, largo:114, cerca:"Burj Khalifa Dubai skyline",
  n:["Dubai","Dubai","Dubaï","Dubái","Dubaj"],
  f:["Il deserto che è diventato una città verticale","The desert turned into a vertical city","Le désert devenu une ville verticale","El desierto convertido en una ciudad vertical","Pustynia, która stała się pionowym miastem"] },
{ slug:"gerusalemme", gruppo:"oriente", monumento:MO.gerusalemme, cielo:"alba", grande:1.94, largo:204, cerca:"Dome of the Rock Jerusalem",
  n:["Gerusalemme","Jerusalem","Jérusalem","Jerusalén","Jerozolima"],
  f:["La città santa per tre religioni","The holy city of three religions","La ville sainte de trois religions","La ciudad santa de tres religiones","Święte miasto trzech religii"] },
{ slug:"doha", gruppo:"oriente", monumento:MO.doha, cielo:"tramonto", acqua:true, grande:1.54, largo:186, cerca:"Doha skyline Qatar",
  n:["Doha","Doha","Doha","Doha","Doha"],
  f:["Torri di vetro affacciate sul golfo","Glass towers looking over the gulf","Des tours de verre face au golfe","Torres de cristal frente al golfo","Szklane wieże nad zatoką"] },

/* ---------------- NORD AFRICA ---------------- */
{ slug:"ilcairo", gruppo:"nordafrica", monumento:MO.cairo, cielo:"deserto", grande:1.88, largo:300, cerca:"Pyramids of Giza",
  n:["Il Cairo","Cairo","Le Caire","El Cairo","Kair"],
  f:["Le piramidi: l'unica meraviglia antica rimasta in piedi","The pyramids: the only ancient wonder still standing","Les pyramides : la seule merveille antique encore debout","Las pirámides: la única maravilla antigua aún en pie","Piramidy: jedyny zachowany cud starożytności"] },
{ slug:"marrakech", gruppo:"nordafrica", monumento:MO.marrakech, cielo:"deserto", monti:180, palme:3, grande:1.43, largo:180, cerca:"Koutoubia Mosque Marrakesh",
  n:["Marrakech","Marrakesh","Marrakech","Marrakech","Marrakesz"],
  f:["La piazza, il souk e l'Atlante sullo sfondo","The square, the souk and the Atlas behind","La place, le souk et l'Atlas en arrière-plan","La plaza, el zoco y el Atlas al fondo","Plac, suk i Atlas w tle"] },
{ slug:"tunisi", gruppo:"nordafrica", monumento:MO.tunisi, cielo:"giorno", acqua:true, palme:2, grande:1.79, largo:300, cerca:"Sidi Bou Said Tunis",
  n:["Tunisi","Tunis","Tunis","Túnez","Tunis"],
  f:["La medina bianca e blu, e Cartagine vicino","The white and blue medina, with Carthage nearby","La médina blanche et bleue, et Carthage tout près","La medina blanca y azul, y Cartago al lado","Biało-niebieska medyna, a obok Kartagina"] },
{ slug:"algeri", gruppo:"nordafrica", monumento:MO.algeri, cielo:"tramonto", acqua:true, grande:1.36, largo:237, cerca:"Casbah of Algiers",
  n:["Algeri","Algiers","Alger","Argel","Algier"],
  f:["La casbah bianca che scende verso il mare","The white casbah tumbling down to the sea","La casbah blanche qui descend vers la mer","La casba blanca que baja hacia el mar","Biała kasba schodząca ku morzu"] },
{ slug:"casablanca", gruppo:"nordafrica", monumento:MO.casablanca, cielo:"tramonto", acqua:true, grande:1.08, largo:225, cerca:"Hassan II Mosque Casablanca",
  n:["Casablanca","Casablanca","Casablanca","Casablanca","Casablanca"],
  f:["Il minareto più alto d'Africa, sull'oceano","Africa's tallest minaret, on the ocean","Le plus haut minaret d'Afrique, sur l'océan","El minarete más alto de África, sobre el océano","Najwyższy minaret Afryki, nad oceanem"] },

/* ---------------- AFRICA ---------------- */
{ slug:"cittadelcapo", gruppo:"africa", monumento:MO.cittadelcapo, cielo:"giorno", acqua:true, grande:1.85, largo:300, cerca:"Table Mountain Cape Town",
  n:["Città del Capo","Cape Town","Le Cap","Ciudad del Cabo","Kapsztad"],
  f:["Una montagna piatta fra due oceani","A flat-topped mountain between two oceans","Une montagne plate entre deux océans","Una montaña plana entre dos océanos","Płaska góra między dwoma oceanami"] },
{ slug:"nairobi", gruppo:"africa", monumento:MO.nairobi, cielo:"alba", grande:1.58, largo:300, cerca:"Nairobi skyline",
  n:["Nairobi","Nairobi","Nairobi","Nairobi","Nairobi"],
  f:["La città con il safari alle porte","The city with a safari on its doorstep","La ville avec le safari à sa porte","La ciudad con el safari a las puertas","Miasto z safari tuż za rogatkami"] },
{ slug:"dakar", gruppo:"africa", monumento:MO.dakar, cielo:"tropicale", acqua:true, palme:3, grande:1.76, largo:238, cerca:"Baobab Senegal",
  n:["Dakar","Dakar","Dakar","Dakar","Dakar"],
  f:["Il punto più a ovest dell'Africa, sull'Atlantico","Africa's westernmost point, on the Atlantic","Le point le plus à l'ouest de l'Afrique, sur l'Atlantique","El punto más occidental de África, sobre el Atlántico","Najdalej wysunięty na zachód punkt Afryki, nad Atlantykiem"] },

/* ---------------- NORD AMERICA ---------------- */
{ slug:"newyork", gruppo:"nordamerica", monumento:MO.newyork, cielo:"notte", acqua:true, grande:1.12, largo:300, cerca:"Manhattan skyline New York",
  n:["New York","New York","New York","Nueva York","Nowy Jork"],
  f:["La città che tutti riconoscono al primo sguardo","The city everyone recognises at first glance","La ville que tout le monde reconnaît au premier regard","La ciudad que todos reconocen a primera vista","Miasto, które każdy rozpozna od pierwszego spojrzenia"] },
{ slug:"cittadelmessico", gruppo:"nordamerica", monumento:MO.messico, cielo:"tramonto", grande:1.36, largo:210, cerca:"Angel of Independence Mexico City",
  n:["Città del Messico","Mexico City","Mexico","Ciudad de México","Meksyk"],
  f:["Piramidi azteche a mezz'ora dal centro","Aztec pyramids half an hour from downtown","Des pyramides aztèques à une demi-heure du centre","Pirámides aztecas a media hora del centro","Piramidy Azteków pół godziny od centrum"] },
{ slug:"lavana", gruppo:"nordamerica", monumento:MO.lavana, cielo:"tropicale", acqua:true, palme:3, grande:1.92, largo:300, cerca:"Havana Capitolio classic car",
  n:["L'Avana","Havana","La Havane","La Habana","Hawana"],
  f:["Auto d'epoca, musica e case color pastello","Vintage cars, music and pastel houses","Voitures anciennes, musique et maisons pastel","Coches antiguos, música y casas en tonos pastel","Zabytkowe auta, muzyka i pastelowe domy"] },
{ slug:"toronto", gruppo:"nordamerica", monumento:MO.toronto, cielo:"neve", acqua:true, grande:1.18, largo:190, cerca:"Toronto skyline CN Tower",
  n:["Toronto","Toronto","Toronto","Toronto","Toronto"],
  f:["I grattacieli sul lago e le cascate del Niagara vicino","Skyscrapers on the lake, Niagara Falls close by","Des gratte-ciel sur le lac et les chutes du Niagara tout près","Rascacielos sobre el lago y las cataratas del Niágara cerca","Wieżowce nad jeziorem i wodospad Niagara tuż obok"] },

/* ---------------- SUD AMERICA ---------------- */
{ slug:"riodejaneiro", gruppo:"sudamerica", monumento:MO.rio, cielo:"tramonto", acqua:true, monti:190, palme:2, grande:1.69, largo:300, cerca:"Christ the Redeemer Rio de Janeiro",
  n:["Rio de Janeiro","Rio de Janeiro","Rio de Janeiro","Río de Janeiro","Rio de Janeiro"],
  f:["Il Cristo che apre le braccia sulla baia","The Christ opening his arms over the bay","Le Christ qui ouvre les bras sur la baie","El Cristo que abre los brazos sobre la bahía","Chrystus rozkładający ramiona nad zatoką"] },
{ slug:"buenosaires", gruppo:"sudamerica", monumento:MO.buenosaires, cielo:"giorno", grande:1.59, largo:220, cerca:"Obelisco Buenos Aires",
  n:["Buenos Aires","Buenos Aires","Buenos Aires","Buenos Aires","Buenos Aires"],
  f:["Il tango, la carne e i quartieri colorati","Tango, steak and brightly painted streets","Le tango, la viande et les quartiers colorés","El tango, la carne y los barrios de colores","Tango, mięso i kolorowe dzielnice"] },
{ slug:"machupicchu", gruppo:"sudamerica", monumento:MO.machupicchu, cielo:"alba", monti:230, grande:1.57, largo:300, cerca:"Machu Picchu",
  n:["Machu Picchu","Machu Picchu","Machu Picchu","Machu Picchu","Machu Picchu"],
  f:["La città degli Inca che spunta dalle nuvole","The Inca city rising out of the clouds","La cité inca qui surgit des nuages","La ciudad inca que asoma entre las nubes","Miasto Inków wyłaniające się z chmur"] },

/* ---------------- OCEANIA E ALTRE ---------------- */
{ slug:"sydney", gruppo:"altre", monumento:MO.sydney, cielo:"giorno", acqua:true, grande:1.71, largo:300, cerca:"Sydney Opera House Harbour Bridge",
  n:["Sydney","Sydney","Sydney","Sídney","Sydney"],
  f:["L'Opera e il ponte, in fondo al mondo","The Opera House and the bridge, at the end of the world","L'Opéra et le pont, au bout du monde","La Ópera y el puente, en el fin del mundo","Opera i most, na końcu świata"] },
{ slug:"bali", gruppo:"altre", monumento:MO.bali, cielo:"tropicale", palme:4, grande:1.58, largo:200, cerca:"Pura Ulun Danu Bratan Bali",
  n:["Bali","Bali","Bali","Bali","Bali"],
  f:["Risaie a terrazza e templi sul mare","Terraced rice fields and temples on the sea","Rizières en terrasses et temples sur la mer","Arrozales en terrazas y templos sobre el mar","Tarasowe pola ryżowe i świątynie nad morzem"] },
{ slug:"maldive", gruppo:"altre", monumento:MO.maldive, cielo:"tropicale", acqua:true, palme:3, grande:1.5, largo:300, cerca:"Maldives overwater bungalow",
  n:["Maldive","Maldives","Maldives","Maldivas","Malediwy"],
  f:["Acqua trasparente e casette sul pontile","Clear water and cabins on the pier","Une eau transparente et des cabanes sur pilotis","Agua transparente y cabañas sobre el pontón","Przejrzysta woda i domki na pomoście"] },
{ slug:"reykjavik", gruppo:"altre", monumento:MO.reykjavik, cielo:"notte", monti:150, grande:1.0, largo:250, cerca:"Hallgrimskirkja Reykjavik",
  n:["Reykjavík","Reykjavík","Reykjavík","Reikiavik","Reykjavík"],
  f:["L'aurora boreale sopra la chiesa di pietra","The northern lights above the stone church","L'aurore boréale au-dessus de l'église de pierre","La aurora boreal sobre la iglesia de piedra","Zorza polarna nad kamiennym kościołem"] }
];

/* --- comodità --- */
export const LINGUE = ["it","en","fr","es","pl"];
export const nome  = (c, i) => c.n[i] || c.n[0];
export const frase = (c, i) => c.f[i] || c.f[0];
export const gruppo = id => GRUPPI.find(g => g.id === id);
export const perGruppo = id => CITTA.filter(c => c.gruppo === id);
