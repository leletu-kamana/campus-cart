// ==========================================================
// CAMPUS-CART
// Coverage data: provinces, collection hubs and institutions
// Used by forms.js (enquiry form) so the dropdowns and delivery
// estimates always match the Coverage page.
// ==========================================================

// leadDays = typical courier time to a campus in that province, in working days.
// A campus in the same city as a hub is always 1 working day.
// An institution with city "" has several campuses (or an unknown town), so the province lead time is used.
// type is "University", "TVET college" or "Private institution".
// Hub addresses and times are illustrative because Campus-Cart is a fictional business.
const PROVINCES = [ // Starts the list of provinces.
 { // Starts a new province record.
  "code": "EC", // Short province code used by the form and coverage data.
  "name": "Eastern Cape", // Human-readable province or institution name.
  "leadDays": 3, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   { // Starts a new collection hub record.
    "city": "Gqeberha", // City used to match an institution to a collection hub.
    "address": "Summerstrand collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   { // Starts a new institution record.
    "name": "University of Fort Hare", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Alice" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Rhodes University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Makhanda" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Nelson Mandela University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Gqeberha" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Walter Sisulu University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Mthatha" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Buffalo City TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "East London" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Eastcape Midlands TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Ikhala TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Komani" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Ingwe TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "King Hintsa TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "King Sabata Dalindyebo TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Mthatha" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Lovedale TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Alice" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Port Elizabeth TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Gqeberha" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Ed-U City Campus", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Gqeberha" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Stenden South Africa", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Port Alfred" // City used to match an institution to a collection hub.
   }
  ]
 },
 { // Starts a new province record.
  "code": "FS", // Short province code used by the form and coverage data.
  "name": "Free State", // Human-readable province or institution name.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   { // Starts a new collection hub record.
    "city": "Bloemfontein", // City used to match an institution to a collection hub.
    "address": "Brandwag collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   { // Starts a new institution record.
    "name": "University of the Free State", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Central University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Flavius Mareka TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Sasolburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Goldfields TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Welkom" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Maluti TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Phuthaditjhaba" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Motheo TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Qualitas Career Academy", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   }
  ]
 },
 { // Starts a new province record.
  "code": "GP", // Short province code used by the form and coverage data.
  "name": "Gauteng", // Human-readable province or institution name.
  "leadDays": 1, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   { // Starts a new collection hub record.
    "city": "Johannesburg", // City used to match an institution to a collection hub.
    "address": "7 Jorissen Street, Braamfontein, 2001", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Sat 10:00-16:00" // Illustrative opening or collection hours for this hub.
   },
   { // Starts a new collection hub record.
    "city": "Pretoria", // City used to match an institution to a collection hub.
    "address": "128 Lynnwood Road, Hatfield, 0083 (head office)", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   { // Starts a new institution record.
    "name": "University of the Witwatersrand", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "University of Johannesburg", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "University of Pretoria", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "University of South Africa (Unisa)", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Tshwane University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Vaal University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Vanderbijlpark" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Sefako Makgatho Health Sciences University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Ga-Rankuwa" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Central Johannesburg TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Ekurhuleni East TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Springs" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Ekurhuleni West TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Germiston" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Sedibeng TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Vereeniging" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "South West Gauteng TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Soweto" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Tshwane North TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Tshwane South TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Western TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Randfontein" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "AAA School of Advertising", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Academy for Facilities Management", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Academy of Sound Engineering", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "AFDA", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Belgium Campus ITversity", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Boston Media House", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Da Vinci Institute", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Modderfontein" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Empilweni Education", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Foundation for Professional Development", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Greenside Design Center College of Design", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Health and Fitness Professionals Academy", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Henley Business School South Africa", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "NOSA College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   }
  ]
 },
 { // Starts a new province record.
  "code": "KZN", // Short province code used by the form and coverage data.
  "name": "KwaZulu-Natal", // Human-readable province or institution name.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   { // Starts a new collection hub record.
    "city": "Durban", // City used to match an institution to a collection hub.
    "address": "Shop 12, University Drive, Westville, 3629 (lockers)", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Lockers daily 08:00-20:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   { // Starts a new institution record.
    "name": "University of KwaZulu-Natal", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Durban University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Mangosuthu University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "University of Zululand", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "KwaDlangezwa" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Coastal TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Elangeni TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Pinetown" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Esayidi TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Port Shepstone" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Majuba TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Newcastle" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Mnambithi TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Ladysmith" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Mthashana TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Thekwini TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Umfolozi TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Richards Bay" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Umgungundlovu TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Pietermaritzburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Berea College of Technology", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Commerce and Computer College of South Africa", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Pietermaritzburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "ICESA Education", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   }
  ]
 },
 { // Starts a new province record.
  "code": "LP", // Short province code used by the form and coverage data.
  "name": "Limpopo", // Human-readable province or institution name.
  "leadDays": 3, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   { // Starts a new collection hub record.
    "city": "Polokwane", // City used to match an institution to a collection hub.
    "address": "Polokwane CBD collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   { // Starts a new institution record.
    "name": "University of Limpopo", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Mankweng" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "University of Venda", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Thohoyandou" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Capricorn TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Polokwane" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Lephalale TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Lephalale" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Letaba TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Tzaneen" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Mopani South East TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Phalaborwa" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Sekhukhune TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Groblersdal" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Vhembe TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Thohoyandou" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Waterberg TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Southern African Wildlife College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Hoedspruit" // City used to match an institution to a collection hub.
   }
  ]
 },
 { // Starts a new province record.
  "code": "MP", // Short province code used by the form and coverage data.
  "name": "Mpumalanga", // Human-readable province or institution name.
  "leadDays": 3, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   { // Starts a new collection hub record.
    "city": "Mbombela", // City used to match an institution to a collection hub.
    "address": "Mbombela CBD collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   { // Starts a new institution record.
    "name": "University of Mpumalanga", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Ehlanzeni TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Gert Sibande TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Standerton" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Nkangala TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "eMalahleni" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "MSC Business College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Unigrad College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   }
  ]
 },
 { // Starts a new province record.
  "code": "NC", // Short province code used by the form and coverage data.
  "name": "Northern Cape", // Human-readable province or institution name.
  "leadDays": 4, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   { // Starts a new collection hub record.
    "city": "Kimberley", // City used to match an institution to a collection hub.
    "address": "Kimberley CBD collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   { // Starts a new institution record.
    "name": "Sol Plaatje University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Northern Cape Rural TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Upington" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Northern Cape Urban TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "ATTI Kimberley", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Qualitas Career Academy", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   }
  ]
 },
 { // Starts a new province record.
  "code": "NW", // Short province code used by the form and coverage data.
  "name": "North West", // Human-readable province or institution name.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   { // Starts a new collection hub record.
    "city": "Potchefstroom", // City used to match an institution to a collection hub.
    "address": "Potchefstroom town centre collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   { // Starts a new institution record.
    "name": "North-West University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Potchefstroom" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Orbit TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Taletso TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Mahikeng" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Vuselela TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Klerksdorp" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Normansville College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Rustenburg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Potchefstroom Academy and SAAHST", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Potchefstroom" // City used to match an institution to a collection hub.
   }
  ]
 },
 { // Starts a new province record.
  "code": "WC", // Short province code used by the form and coverage data.
  "name": "Western Cape", // Human-readable province or institution name.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   { // Starts a new collection hub record.
    "city": "Cape Town", // City used to match an institution to a collection hub.
    "address": "45 Main Road, Rondebosch, 7700", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Tue-Sat 10:00-15:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   { // Starts a new institution record.
    "name": "University of Cape Town", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Stellenbosch University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Stellenbosch" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "University of the Western Cape", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Bellville" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Cape Peninsula University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Boland TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Stellenbosch" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "College of Cape Town for TVET", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "False Bay TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Muizenberg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Northlink TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Bellville" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "South Cape TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "George" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "West Coast TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "ACT Cape Town", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "BHC School of Design", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Cape Audio College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Cape Town College of Fashion Design", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Cornerstone Institute", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Friends of Design Academy of Digital Arts", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "George Whitefield College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Muizenberg" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Helderberg College of Higher Education", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Somerset West" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Inscape Education Group", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "International Hotel School", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Isa Carstens Academy", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "Red & Yellow Creative School of Business", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "The Animation School", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   { // Starts a new institution record.
    "name": "TSIBA Education", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   }
  ]
 }
];

// Private providers with campuses or distance study in every province. They use the province lead time.
const NATIONAL_PRIVATE = [ // Starts the list of nationwide private providers.
 "The IIE (Varsity College, Rosebank College, Vega, Design School Southern Africa)", // Institution name for nationwide private-provider coverage.
 "STADIO (including Embury Institute for Teacher Education)", // Institution name for nationwide private-provider coverage.
 "Eduvos", // Institution name for nationwide private-provider coverage.
 "Boston City Campus", // Institution name for nationwide private-provider coverage.
 "MANCOSA", // Institution name for nationwide private-provider coverage.
 "Regent Business School", // Institution name for nationwide private-provider coverage.
 "Richfield Graduate Institute of Technology", // Institution name for nationwide private-provider coverage.
 "CTU Training Solutions", // Institution name for nationwide private-provider coverage.
 "Regenesys", // Institution name for nationwide private-provider coverage.
 "NewBridge Graduate Institute", // Institution name for nationwide private-provider coverage.
 "SAE Institute", // Institution name for nationwide private-provider coverage.
 "Netcare Education (nursing and health)", // Institution name for nationwide private-provider coverage.
 "Central Technical College", // Institution name for nationwide private-provider coverage.
 "Open Learning Group", // Institution name for nationwide private-provider coverage.
 "Oxbridge Academy (distance)", // Institution name for nationwide private-provider coverage.
 "Intec College (distance)", // Institution name for nationwide private-provider coverage.
 "Lyceum College (distance)", // Institution name for nationwide private-provider coverage.
 "Optimi College (distance)", // Institution name for nationwide private-provider coverage.
 "Trifocus Fitness Academy (distance)", // Institution name for nationwide private-provider coverage.
 "Chefs Training and Innovation Academy" // Institution name for nationwide private-provider coverage.
];

// ==========================================================
// PRODUCT CATALOGUE (moved here from script.js)
// Used by interactions.js: the Deals list, the product detail picker
// and the quick view window all read the same DEALS array.
// Photos live in assets/images/ and are chosen by each product's img path.
// ==========================================================
var CC_CATALOGUE = (function () {
    /* ---------- Hardcoded catalogue data (no database) ---------- */
    // Stores reusable image paths so product objects can reference consistent asset locations.
    var IMG = { // Declares and initializes the variable used by this operation.
        bundle: "images/bundles/starter-bundle-3.jpg", // Defines a property or argument in the current structure.
        hero: "images/bundles/hero-campus.jpg", // Defines a property or argument in the current structure.
        used: "images/second-hand/marketplace.jpg" // Defines a property or argument in the current structure.
    }; // Closes the current block, expression, or function call.

    // Pages inside /pages/ are one level deeper than index.html.
    // Selects the correct assets directory because files in /pages/ are one folder deeper than index.html.
    var BASE = window.location.pathname.indexOf("/pages/") > -1 ? "../assets/" : "assets/"; // Declares and initializes the variable used by this operation.

    // Each product has its own photo in assets/images/products/. If a photo file has not been added yet,
    // this listener swaps in the starter bundle photo once, so no card ever shows a broken image.
    // The error event does not bubble, so the listener uses the capture phase (the true at the end).
    document.addEventListener("error", function (e) { // Registers a handler for images that fail to load (capture phase).
        var img = e.target; // Stores the element that fired the error.
        // The starter bundle photo is not inside images/products/, so this can never loop.
        if (img && img.tagName === "IMG" && img.src.indexOf("images/products/") > -1) { // Checks that it is a product photo.
            img.src = BASE + IMG.bundle; // Swaps in the starter bundle photo.
        }
    }, true);

    // Stores the catalogue as an array of product objects containing names, categories, prices, descriptions, and images.
    var DEALS = [ // Declares and initializes the variable used by this operation.
        { name: "Basic Starter Bundle", category: "bundles", condition: "new", price: 1499, desc: "Bedding, kettle, mug set and study basics for a first-year res room.", img: "images/bundles/bundle-basic.jpg", alt: "Four items from the Basic Starter Bundle: a duvet, an electric kettle, stacked mugs and a notebook" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Standard Starter Bundle", category: "bundles", condition: "new", price: 2799, desc: "Everything in Basic plus desk lamp, laundry set and kitchen starter pack.", img: "images/bundles/bundle-standard.jpg", alt: "Four items from the Standard Starter Bundle: a duvet, an electric kettle, stacked mugs and a navy desk lamp" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Premium Starter Bundle", category: "bundles", condition: "new", price: 4499, desc: "Full res setup: bedding, appliances, storage, stationery and lockable trunk.", img: "images/bundles/bundle-premium.jpg", alt: "Four items from the Premium Starter Bundle: a study chair, stackable storage trays, an electric kettle and a pen holder" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Second-Hand Study Desk", category: "furniture", condition: "used", price: 650, desc: "Reviewed listing from a graduating student in Pretoria. Light wear.", img: "images/products/study-funiture.jpg", alt: "White study desk with a white chair, a desk lamp and shelves in a bedroom" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Mini Bar Fridge (Used)", category: "appliances", condition: "used", price: 1150, desc: "Works perfectly, tested at our collection point. 12 months old.", img: IMG.used }, // Performs the next step in the current Campus-Cart operation.
        { name: "Electric Kettle 1.7L", category: "appliances", condition: "new", price: 289, desc: "Fast-boil kettle, res-friendly and load-shedding ready.", img: "images/products/kettle.jpg", alt: "Stainless steel electric kettle with a yellow trim on its power base" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Accounting Textbook Set", category: "textbooks", condition: "used", price: 420, desc: "Prescribed titles for first-year commerce, current edition.", img: "images/products/textbook.jpg", alt: "Navy hardcover textbook with a yellow bookmark ribbon" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Study Chair (Ergonomic)", category: "furniture", condition: "new", price: 899, desc: "Adjustable chair built for long study sessions in a small room.", img: "images/products/table-chair.jpg", alt: "Ergonomic mesh study chair with a navy seat, headrest and yellow armrest pads" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Stationery Mega Pack", category: "stationery", condition: "new", price: 249, desc: "Files, pads, pens, highlighters and a scientific calculator.", img: "images/products/stationery.jpg", alt: "Notebooks, pencils, highlighters, sticky notes, a ruler and a calculator laid out together" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Duvet & Linen Set (Double)", category: "bedding", condition: "new", price: 749, desc: "Warm winter duvet, fitted sheet, pillow and two covers.", img: "images/products/duvet.jpg", alt: "Folded grey duvet with navy piping" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Second-Hand Laptop Bag", category: "stationery", condition: "used", price: 180, desc: "Padded 15-inch bag, cleaned and checked by our team.", img: "images/products/laptop-bag.jpg", alt: "Navy padded laptop sleeve with yellow zip pulls" }, // Performs the next step in the current Campus-Cart operation.
        { name: "Load-Shedding Light Kit", category: "appliances", condition: "new", price: 329, desc: "Rechargeable lamp, power bank and extension lead.", img: IMG.bundle }, // Performs the next step in the current Campus-Cart operation.
        // More products, two for every category, so each filter shows a wider range.
        { name: "Res Kitchen Starter Bundle", category: "bundles", condition: "new", price: 1199, desc: "Pots, a pan, cutlery, plates, mugs and a chopping board for cooking in a res kitchenette.", img: IMG.bundle }, // Adds the product "Res Kitchen Starter Bundle" to the catalogue.
        { name: "Second-Hand Residence Bundle", category: "bundles", condition: "used", price: 1250, desc: "Reviewed bundle from a graduating student: desk lamp, small fan, storage crates and a bedside table.", img: IMG.used }, // Adds the product "Second-Hand Residence Bundle" to the catalogue.
        { name: "Bookshelf (5-Tier)", category: "furniture", condition: "new", price: 649, desc: "Lightweight shelf that fits a res room wall and holds a semester of textbooks.", img: IMG.bundle }, // Adds the product "Bookshelf (5-Tier)" to the catalogue.
        { name: "Second-Hand Bedside Drawers", category: "furniture", condition: "used", price: 310, desc: "Two-drawer unit from a graduating student, cleaned and checked by our team.", img: IMG.used }, // Adds the product "Second-Hand Bedside Drawers" to the catalogue.
        { name: "Microwave Oven 20L", category: "appliances", condition: "new", price: 1099, desc: "Compact 20 litre microwave with a defrost setting, sized for a res kitchenette.", img: IMG.bundle }, // Adds the product "Microwave Oven 20L" to the catalogue.
        { name: "Second-Hand Air Fryer", category: "appliances", condition: "used", price: 550, desc: "Reviewed listing, tested at our collection point. Basket and tray included.", img: IMG.used }, // Adds the product "Second-Hand Air Fryer" to the catalogue.
        { name: "Single Duvet and Linen Set", category: "bedding", condition: "new", price: 549, desc: "Duvet, fitted sheet, pillow and one cover for a standard single res bed.", img: "images/products/bedding-duvets.jpg", alt: "White pillows and a rolled white duvet" }, // Adds the product "Single Duvet and Linen Set" to the catalogue.
        { name: "Fleece Blanket and Pillow Pair", category: "bedding", condition: "new", price: 299, desc: "Soft fleece blanket and two pillows for cold Eastern Cape winter nights.", img: IMG.bundle }, // Adds the product "Fleece Blanket and Pillow Pair" to the catalogue.
        { name: "Biology and Chemistry Textbook Set", category: "textbooks", condition: "used", price: 450, desc: "Common first-year science titles, checked for missing pages and heavy highlighting.", img: IMG.used }, // Adds the product "Biology and Chemistry Textbook Set" to the catalogue.
        { name: "IT and Programming Textbook Set", category: "textbooks", condition: "used", price: 520, desc: "Common first-year titles for programming and web development, checked by our team.", img: IMG.used }, // Adds the product "IT and Programming Textbook Set" to the catalogue.
        { name: "Scientific Calculator", category: "stationery", condition: "new", price: 219, desc: "Exam-friendly scientific calculator with a protective cover and spare battery.", img: "images/products/scientific-calculator.jpg", alt: "Navy scientific calculator with yellow function keys" }, // Adds the product "Scientific Calculator" to the catalogue.
        { name: "Study Backpack with Laptop Sleeve", category: "stationery", condition: "new", price: 389, desc: "Water-resistant backpack with a padded sleeve that fits a 15-inch laptop.", img: "images/products/bagpack.jpg", alt: "Navy backpack with tan leather trim and a front zip pocket" }, // Performs the next step in the current Campus-Cart operation.
        // A third round of products, again two for every category.
        { name: "Laundry Starter Bundle", category: "bundles", condition: "new", price: 459, desc: "Laundry basket, drying rack, pegs and a starter pack of washing powder for res laundry day.", img: IMG.bundle }, // Adds the product "Laundry Starter Bundle" to the catalogue.
        { name: "Study Starter Bundle", category: "bundles", condition: "new", price: 649, desc: "Desk lamp, lever arch files, notepads and a desk organiser to set up a study corner.", img: "images/products/essential-bundle.jpg", alt: "Flat lay of notebooks, pens, a pencil case, sticky notes and a navy bag on a white desk" }, // Adds the product "Study Starter Bundle" to the catalogue.
        { name: "Foldable Study Table", category: "furniture", condition: "new", price: 579, desc: "Folds flat for storage and fits a laptop, notes and a mug in a small res room.", img: IMG.bundle }, // Adds the product "Foldable Study Table" to the catalogue.
        { name: "Second-Hand Office Chair", category: "furniture", condition: "used", price: 420, desc: "Padded office chair from a graduating student, cleaned and checked by our team.", img: IMG.used }, // Adds the product "Second-Hand Office Chair" to the catalogue.
        { name: "Two-Plate Hot Plate", category: "appliances", condition: "new", price: 399, desc: "Portable electric hot plate for simple meals where a full stove is not allowed.", img: IMG.bundle }, // Adds the product "Two-Plate Hot Plate" to the catalogue.
        { name: "Rechargeable Desk Fan", category: "appliances", condition: "new", price: 379, desc: "Quiet desk fan with a rechargeable battery that keeps running during load-shedding.", img: "images/products/table-fan.jpg", alt: "Grey desk fan with a yellow centre cap" }, // Adds the product "Rechargeable Desk Fan" to the catalogue.
        { name: "Single Mattress Protector", category: "bedding", condition: "new", price: 219, desc: "Washable fitted protector that guards a res mattress against spills and stains.", img: IMG.bundle }, // Adds the product "Single Mattress Protector" to the catalogue.
        { name: "Bath Towel Set", category: "bedding", condition: "new", price: 329, desc: "Two bath towels, two hand towels and a face cloth in a quick-dry cotton blend.", img: IMG.bundle }, // Adds the product "Bath Towel Set" to the catalogue.
        { name: "Law Textbook Set", category: "textbooks", condition: "used", price: 480, desc: "Common first-year law titles, checked for missing pages and heavy highlighting.", img: IMG.used }, // Adds the product "Law Textbook Set" to the catalogue.
        { name: "Engineering Maths Textbook", category: "textbooks", condition: "used", price: 360, desc: "First-year engineering mathematics textbook with worked examples, in good condition.", img: IMG.used }, // Adds the product "Engineering Maths Textbook" to the catalogue.
        { name: "A4 Lever Arch File 5-Pack", category: "stationery", condition: "new", price: 169, desc: "Five sturdy lever arch files with labels for sorting notes by module.", img: IMG.bundle }, // Adds the product "A4 Lever Arch File 5-Pack" to the catalogue.
        { name: "LED Desk Lamp", category: "stationery", condition: "new", price: 229, desc: "Adjustable LED lamp with a USB port, bright enough for late-night study.", img: "images/products/table-lap.jpg", alt: "Navy adjustable desk lamp with a yellow joint and a round base" }, // Adds the product "LED Desk Lamp" to the catalogue.
        // A fourth round of products, again two for every category.
        { name: "Cleaning Essentials Bundle", category: "bundles", condition: "new", price: 349, desc: "Mop, bucket, cloths, sponges and a spray bottle to keep a res room spotless.", img: IMG.bundle }, // Adds the product "Cleaning Essentials Bundle" to the catalogue.
        { name: "Second-Hand Kitchen Bundle", category: "bundles", condition: "used", price: 700, desc: "Reviewed pots, pans, plates and cutlery from a graduating student.", img: IMG.used }, // Adds the product "Second-Hand Kitchen Bundle" to the catalogue.
        { name: "Clothes Rail with Shelf", category: "furniture", condition: "new", price: 449, desc: "Freestanding rail with a bottom shelf for shoes, ideal for small res rooms.", img: IMG.bundle }, // Adds the product "Clothes Rail with Shelf" to the catalogue.
        { name: "Second-Hand Study Table", category: "furniture", condition: "used", price: 380, desc: "Sturdy table from a graduating student, wiped down and checked by our team.", img: IMG.used }, // Adds the product "Second-Hand Study Table" to the catalogue.
        { name: "Toaster (2-Slice)", category: "appliances", condition: "new", price: 329, desc: "Two-slice toaster with a crumb tray and adjustable browning settings.", img: IMG.bundle }, // Adds the product "Toaster (2-Slice)" to the catalogue.
        { name: "Second-Hand Microwave Oven", category: "appliances", condition: "used", price: 650, desc: "Reviewed listing, tested at our collection point. Turntable included.", img: IMG.used }, // Adds the product "Second-Hand Microwave Oven" to the catalogue.
        { name: "Memory Foam Pillow", category: "bedding", condition: "new", price: 259, desc: "Supportive memory foam pillow with a washable cover for better sleep.", img: IMG.bundle }, // Adds the product "Memory Foam Pillow" to the catalogue.
        { name: "Fitted Sheet Two-Pack", category: "bedding", condition: "new", price: 289, desc: "Two soft cotton-blend fitted sheets for a standard single res bed.", img: IMG.bundle }, // Adds the product "Fitted Sheet Two-Pack" to the catalogue.
        { name: "Business Management Textbook Set", category: "textbooks", condition: "used", price: 430, desc: "Common first-year business management titles, checked for missing pages and heavy highlighting.", img: IMG.used }, // Adds the product "Business Management Textbook Set" to the catalogue.
        { name: "Psychology Textbook Set", category: "textbooks", condition: "used", price: 410, desc: "Common first-year psychology titles, checked by our team before listing.", img: IMG.used }, // Adds the product "Psychology Textbook Set" to the catalogue.
        { name: "Wireless Mouse and Mousepad", category: "stationery", condition: "new", price: 249, desc: "Quiet wireless mouse with a mousepad, handy for laptop study at a desk.", img: IMG.bundle }, // Adds the product "Wireless Mouse and Mousepad" to the catalogue.
        { name: "Highlighter and Pen Pack", category: "stationery", condition: "new", price: 79, desc: "Twelve highlighters and pens in assorted colours for notes and revision.", img: "images/products/highlighters.jpg", alt: "Six coloured highlighters standing in a clear holder" } // Adds the product "Highlighter and Pen Pack" to the catalogue.
    ]; // Closes the current block, expression, or function call.

    // Product photos that exist. A product only uses its own photo when its file name is listed here.
    // To add a photo: save it in assets/images/products/, set that product's img and alt in the DEALS list, and add the file name here.
    var PHOTOS = ["bagpack.jpg", "bedding-duvets.jpg", "bundle-basic.jpg", "bundle-premium.jpg", "bundle-standard.jpg", "duvet.jpg", "essential-bundle.jpg", "highlighters.jpg", "kettle.jpg", "laptop-bag.jpg", "scientific-calculator.jpg", "stationery.jpg", "study-funiture.jpg", "table-chair.jpg", "table-fan.jpg", "table-lap.jpg", "textbook.jpg"]; // File names of the product photos that exist. Add a name here after saving a new photo in assets/images/products/.
    DEALS.forEach(function (d) { // Loops through every product.
        var file = d.img.split("/").pop(); // Gets the file name from the product's photo path.
        if (PHOTOS.indexOf(file) === -1) { d.img = d.condition === "used" ? IMG.used : IMG.bundle; } // Uses the generic photo when the product photo has not been added yet.
    });
    return { IMG: IMG, BASE: BASE, DEALS: DEALS };
})();
