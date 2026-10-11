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
