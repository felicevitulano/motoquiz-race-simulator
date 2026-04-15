import { Bike, Question, Track } from './types';

export const BIKES: Bike[] = [
  {
    id: 'ducati-panigale-v4',
    name: 'Panigale V4',
    brand: 'Ducati',
    cc: 1103,
    hp: 216,
    weight: 187,
    type: 'Supersport',
    priceRange: 'high',
    price: '27.790 €',
    range: 220,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Ducati_Panigale_V4_S_2018.jpg',
    origin: 'Italian',
    tags: ['pista', 'aggressivo', 'potenza', 'stabilità']
  },
  {
    id: 'honda-cbr1000rr-r',
    name: 'CBR1000RR-R Fireblade',
    brand: 'Honda',
    cc: 1000,
    hp: 217,
    weight: 201,
    type: 'Supersport',
    priceRange: 'high',
    price: '24.500 €',
    range: 210,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Honda_CBR1000RR-R_Fireblade_SP_2020.jpg',
    origin: 'Japanese',
    tags: ['pista', 'aggressivo', 'potenza', 'accelerazione']
  },
  {
    id: 'yamaha-r1',
    name: 'YZF-R1',
    brand: 'Yamaha',
    cc: 998,
    hp: 200,
    weight: 201,
    type: 'Supersport',
    priceRange: 'high',
    price: '20.900 €',
    range: 230,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Yamaha_YZF-R1_2015.jpg',
    origin: 'Japanese',
    tags: ['pista', 'aggressivo', 'equilibrio', 'frenata']
  },
  {
    id: 'kawasaki-ninja-zx10r',
    name: 'Ninja ZX-10R',
    brand: 'Kawasaki',
    cc: 998,
    hp: 203,
    weight: 207,
    type: 'Supersport',
    priceRange: 'high',
    price: '21.500 €',
    range: 225,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Kawasaki_Ninja_ZX-10R_2016.jpg',
    origin: 'Japanese',
    tags: ['pista', 'aggressivo', 'stabilità', 'potenza']
  },
  {
    id: 'triumph-street-triple-rs',
    name: 'Street Triple RS',
    brand: 'Triumph',
    cc: 765,
    hp: 130,
    weight: 188,
    type: 'Naked',
    priceRange: 'mid',
    price: '12.995 €',
    range: 250,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Triumph_Street_Triple_RS_765_2017.jpg',
    origin: 'Italian', // Simplified for logic
    tags: ['urbano', 'intermedio', 'equilibrio', 'agilità']
  },
  {
    id: 'ktm-1290-super-duke-r',
    name: '1290 Super Duke R',
    brand: 'KTM',
    cc: 1301,
    hp: 180,
    weight: 200,
    type: 'Naked',
    priceRange: 'high',
    price: '19.800 €',
    range: 240,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/KTM_1290_Super_Duke_R_2014.jpg',
    origin: 'German-Austrian',
    tags: ['aggressivo', 'potenza', 'coppia', 'urbano']
  },
  {
    id: 'aprilia-rsv4',
    name: 'RSV4 Factory',
    brand: 'Aprilia',
    cc: 1099,
    hp: 217,
    weight: 202,
    type: 'Supersport',
    priceRange: 'high',
    price: '25.990 €',
    range: 215,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Aprilia_RSV4_Factory_APRC_ABS_2013.jpg',
    origin: 'Italian',
    tags: ['pista', 'aggressivo', 'stabilità', 'frenata']
  },
  {
    id: 'suzuki-hayabusa',
    name: 'Hayabusa',
    brand: 'Suzuki',
    cc: 1340,
    hp: 190,
    weight: 264,
    type: 'Sportiva',
    priceRange: 'high',
    price: '19.700 €',
    range: 280,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Suzuki_Hayabusa_2021.jpg',
    origin: 'Japanese',
    tags: ['potenza', 'stabilità', 'touring', 'coppia']
  },
  {
    id: 'bmw-s1000rr',
    name: 'S 1000 RR',
    brand: 'BMW',
    cc: 999,
    hp: 207,
    weight: 197,
    type: 'Supersport',
    priceRange: 'high',
    price: '21.000 €',
    range: 220,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/BMW_S1000RR_2019.jpg',
    origin: 'German-Austrian',
    tags: ['pista', 'aggressivo', 'accelerazione', 'tecnologia']
  },
  {
    id: 'ducati-monster',
    name: 'Monster',
    brand: 'Ducati',
    cc: 937,
    hp: 111,
    weight: 188,
    type: 'Naked',
    priceRange: 'mid',
    price: '12.300 €',
    range: 260,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Ducati_Monster_937_2021.jpg',
    origin: 'Italian',
    tags: ['urbano', 'intermedio', 'agilità', 'stile']
  },
  {
    id: 'honda-africa-twin',
    name: 'CRF1100L Africa Twin',
    brand: 'Honda',
    cc: 1084,
    hp: 102,
    weight: 230,
    type: 'Adventure',
    priceRange: 'mid',
    price: '15.290 €',
    range: 380,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Honda_CRF1100L_Africa_Twin_Adventure_Sports_ES_DCT_2020.jpg',
    origin: 'Japanese',
    tags: ['touring', 'comfort', 'enduro', 'stabilità']
  },
  {
    id: 'yamaha-mt09',
    name: 'MT-09',
    brand: 'Yamaha',
    cc: 890,
    hp: 119,
    weight: 193,
    type: 'Naked',
    priceRange: 'mid',
    price: '10.899 €',
    range: 240,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Yamaha_MT-09_2021.jpg',
    origin: 'Japanese',
    tags: ['urbano', 'aggressivo', 'coppia', 'agilità']
  },
  {
    id: 'kawasaki-z900',
    name: 'Z900',
    brand: 'Kawasaki',
    cc: 948,
    hp: 125,
    weight: 212,
    type: 'Naked',
    priceRange: 'mid',
    price: '10.290 €',
    range: 250,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Kawasaki_Z900_2017.jpg',
    origin: 'Japanese',
    tags: ['urbano', 'intermedio', 'potenza', 'equilibrio']
  },
  {
    id: 'ktm-890-adventure',
    name: '890 Adventure R',
    brand: 'KTM',
    cc: 889,
    hp: 105,
    weight: 210,
    type: 'Adventure',
    priceRange: 'mid',
    price: '16.100 €',
    range: 400,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/KTM_890_Adventure_R_2021.jpg',
    origin: 'German-Austrian',
    tags: ['enduro', 'touring', 'agilità', 'comfort']
  },
  {
    id: 'bmw-r1250gs',
    name: 'R 1250 GS',
    brand: 'BMW',
    cc: 1254,
    hp: 136,
    weight: 249,
    type: 'Adventure',
    priceRange: 'high',
    price: '20.350 €',
    range: 450,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/BMW_R1250GS_Adventure_2019.jpg',
    origin: 'German-Austrian',
    tags: ['touring', 'comfort', 'coppia', 'stabilità']
  },
  {
    id: 'triumph-tiger-1200',
    name: 'Tiger 1200',
    brand: 'Triumph',
    cc: 1160,
    hp: 150,
    weight: 245,
    type: 'Adventure',
    priceRange: 'high',
    price: '19.500 €',
    range: 420,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Triumph_Tiger_1200_Rally_Pro_2022.jpg',
    origin: 'Italian', // Simplified
    tags: ['touring', 'comfort', 'potenza', 'tecnologia']
  },
  {
    id: 'honda-cb500f',
    name: 'CB500F',
    brand: 'Honda',
    cc: 471,
    hp: 48,
    weight: 189,
    type: 'Naked',
    priceRange: 'low',
    price: '6.590 €',
    range: 450,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Honda_CB500F_2016.jpg',
    origin: 'Japanese',
    tags: ['urbano', 'agilità', 'equilibrio', 'low-cc']
  },
  {
    id: 'kawasaki-z400',
    name: 'Z400',
    brand: 'Kawasaki',
    cc: 399,
    hp: 45,
    weight: 167,
    type: 'Naked',
    priceRange: 'low',
    price: '5.990 €',
    range: 350,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Kawasaki_Z400_2019.jpg',
    origin: 'Japanese',
    tags: ['urbano', 'agilità', 'aggressivo', 'low-cc']
  },
  {
    id: 'yamaha-mt07',
    name: 'MT-07',
    brand: 'Yamaha',
    cc: 689,
    hp: 73,
    weight: 184,
    type: 'Naked',
    priceRange: 'low',
    price: '7.999 €',
    range: 320,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Yamaha_MT-07_2018.jpg',
    origin: 'Japanese',
    tags: ['urbano', 'agilità', 'coppia', 'low-cc']
  }
];

export const TRACKS: Track[] = [
  {
    id: 'mugello',
    name: 'Mugello Circuit',
    description: 'Il tempio della velocità italiano. Curve veloci e un rettilineo infinito.',
    difficulty: 'Hard',
    length: '5.245 m',
    turns: 15,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Mugello_Circuit.svg/1024px-Mugello_Circuit.svg.png',
    path: 'M 50,100 L 250,100 C 280,100 280,130 250,130 L 200,130 C 180,130 180,160 200,160 L 250,160 C 280,160 280,190 250,190 L 100,190 C 70,190 70,160 100,160 L 120,160 C 140,160 140,130 120,130 L 50,130 C 20,130 20,100 50,100 Z'
  },
  {
    id: 'misano',
    name: 'Misano World Circuit',
    description: 'Tecnico e guidato, dedicato a Marco Simoncelli. Richiede precisione millimetrica.',
    difficulty: 'Medium',
    length: '4.226 m',
    turns: 16,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Misano_World_Circuit_Marco_Simoncelli.svg/1024px-Misano_World_Circuit_Marco_Simoncelli.svg.png',
    path: 'M 50,50 L 250,50 L 250,100 L 200,100 L 200,150 L 100,150 L 100,100 L 50,100 Z'
  },
  {
    id: 'vallelunga',
    name: 'Autodromo di Vallelunga',
    description: 'Un mix perfetto di tratti veloci e una sezione lenta molto tecnica.',
    difficulty: 'Easy',
    length: '4.085 m',
    turns: 10,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Vallelunga.svg/1024px-Vallelunga.svg.png',
    path: 'M 50,100 A 50,50 0 1,1 150,100 A 50,50 0 1,1 250,100 L 250,150 L 50,150 Z'
  },
  {
    id: 'monza',
    name: 'Autodromo Nazionale Monza',
    description: 'La pista più veloce del mondo. Solo per chi non ha paura di spalancare il gas.',
    difficulty: 'Medium',
    length: '5.793 m',
    turns: 11,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Monza_track_map.svg/1024px-Monza_track_map.svg.png',
    path: 'M 20,50 L 280,50 L 280,150 L 200,150 L 200,100 L 20,100 Z'
  }
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Qual è la tua esperienza di guida?',
    options: [
      { text: 'Principiante (prima moto)', tags: ['intermedio', 'comfort', 'urbano'] },
      { text: 'Intermedio (qualche anno)', tags: ['intermedio', 'agilità'] },
      { text: 'Esperto (molti anni)', tags: ['aggressivo', 'potenza'] },
      { text: 'Professionista (pista)', tags: ['aggressivo', 'pista', 'potenza'] }
    ]
  },
  {
    id: 2,
    text: 'Dove userai principalmente la moto?',
    options: [
      { text: 'Città e casa-lavoro', tags: ['urbano', 'agilità'] },
      { text: 'Viaggi lunghi e weekend', tags: ['touring', 'comfort'] },
      { text: 'Solo pista e passi montani', tags: ['pista', 'aggressivo'] },
      { text: 'Fuoristrada e avventura', tags: ['enduro', 'adventure'] }
    ]
  },
  {
    id: 3,
    text: 'Che cilindrata preferisci?',
    options: [
      { text: 'Fino a 700cc', tags: ['low-cc', 'agilità'] },
      { text: '700cc - 900cc', tags: ['mid-cc', 'equilibrio'] },
      { text: '900cc - 1100cc', tags: ['high-cc', 'potenza'] },
      { text: 'Oltre 1100cc', tags: ['max-cc', 'coppia'] }
    ]
  },
  {
    id: 4,
    text: 'Qual è il tuo stile di guida?',
    options: [
      { text: 'Rilassato e panoramico', tags: ['comfort', 'touring'] },
      { text: 'Equilibrato e fluido', tags: ['equilibrio', 'agilità'] },
      { text: 'Sportivo e dinamico', tags: ['aggressivo', 'potenza'] },
      { text: 'Aggressivo al limite', tags: ['aggressivo', 'pista'] }
    ]
  },
  {
    id: 5,
    text: 'Quale tipologia ti affascina di più?',
    options: [
      { text: 'Naked (essenziale)', tags: ['Naked'] },
      { text: 'Supersport (carenata)', tags: ['Supersport'] },
      { text: 'Adventure/Enduro', tags: ['Adventure', 'Enduro'] },
      { text: 'Sport-Touring', tags: ['Sportiva', 'Touring'] }
    ]
  },
  {
    id: 6,
    text: 'Quanto è importante il comfort?',
    options: [
      { text: 'Fondamentale', tags: ['comfort', 'touring'] },
      { text: 'Importante', tags: ['comfort'] },
      { text: 'Secondario', tags: ['aggressivo'] },
      { text: 'Irrilevante (voglio solo performance)', tags: ['aggressivo', 'pista'] }
    ]
  },
  {
    id: 7,
    text: 'Qual è il tuo budget?',
    options: [
      { text: 'Economico (< 10k€)', tags: ['low'] },
      { text: 'Medio (10k€ - 18k€)', tags: ['mid'] },
      { text: 'Premium (18k€ - 25k€)', tags: ['high'] },
      { text: 'Senza limiti (> 25k€)', tags: ['high', 'potenza'] }
    ]
  },
  {
    id: 8,
    text: 'Cosa cerchi nel motore?',
    options: [
      { text: 'Tanta coppia ai bassi', tags: ['coppia'] },
      { text: 'Potenza pura agli alti', tags: ['potenza'] },
      { text: 'Erogazione lineare', tags: ['equilibrio'] },
      { text: 'Carattere scorbutico', tags: ['aggressivo'] }
    ]
  },
  {
    id: 9,
    text: 'Preferenza per la nazione del brand?',
    options: [
      { text: 'Italiana (Ducati, Aprilia)', tags: ['Italian'] },
      { text: 'Giapponese (Honda, Yamaha...)', tags: ['Japanese'] },
      { text: 'Tedesca/Austriaca (BMW, KTM)', tags: ['German-Austrian'] },
      { text: 'Nessuna preferenza', tags: [] }
    ]
  },
  {
    id: 10,
    text: 'Qual è il tuo ambiente ideale per guidare?',
    options: [
      { text: 'Passi montani e curve strette', tags: ['agilità', 'equilibrio', 'stabilità'] },
      { text: 'Autostrade e grandi distanze', tags: ['comfort', 'touring', 'stabilità'] },
      { text: 'Piste e circuiti veloci', tags: ['pista', 'aggressivo', 'potenza'] },
      { text: 'Percorsi off-road e sterrati', tags: ['enduro', 'adventure', 'agilità'] }
    ]
  }
];
