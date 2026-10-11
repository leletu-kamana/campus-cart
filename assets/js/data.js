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
const PROVINCES = [
 {
  "code": "EC", // Short province code used by the form and coverage data.
  "name": "Eastern Cape", // Human-readable province or institution name.
  "leadDays": 3, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   {
    "city": "Gqeberha", // City used to match an institution to a collection hub.
    "address": "Summerstrand collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   {
    "name": "University of Fort Hare", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Alice" // City used to match an institution to a collection hub.
   },
   {
    "name": "Rhodes University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Makhanda" // City used to match an institution to a collection hub.
   },
   {
    "name": "Nelson Mandela University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Gqeberha" // City used to match an institution to a collection hub.
   },
   {
    "name": "Walter Sisulu University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Mthatha" // City used to match an institution to a collection hub.
   },
   {
    "name": "Buffalo City TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "East London" // City used to match an institution to a collection hub.
   },
   {
    "name": "Eastcape Midlands TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "Ikhala TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Komani" // City used to match an institution to a collection hub.
   },
   {
    "name": "Ingwe TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "King Hintsa TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "King Sabata Dalindyebo TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Mthatha" // City used to match an institution to a collection hub.
   },
   {
    "name": "Lovedale TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Alice" // City used to match an institution to a collection hub.
   },
   {
    "name": "Port Elizabeth TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Gqeberha" // City used to match an institution to a collection hub.
   },
   {
    "name": "Ed-U City Campus", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Gqeberha" // City used to match an institution to a collection hub.
   },
   {
    "name": "Stenden South Africa", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Port Alfred" // City used to match an institution to a collection hub.
   }
  ]
 },
 {
  "code": "FS", // Short province code used by the form and coverage data.
  "name": "Free State", // Human-readable province or institution name.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   {
    "city": "Bloemfontein", // City used to match an institution to a collection hub.
    "address": "Brandwag collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   {
    "name": "University of the Free State", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   },
   {
    "name": "Central University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   },
   {
    "name": "Flavius Mareka TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Sasolburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Goldfields TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Welkom" // City used to match an institution to a collection hub.
   },
   {
    "name": "Maluti TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Phuthaditjhaba" // City used to match an institution to a collection hub.
   },
   {
    "name": "Motheo TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   },
   {
    "name": "Qualitas Career Academy", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   }
  ]
 },
 {
  "code": "GP", // Short province code used by the form and coverage data.
  "name": "Gauteng", // Human-readable province or institution name.
  "leadDays": 1, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   {
    "city": "Johannesburg", // City used to match an institution to a collection hub.
    "address": "7 Jorissen Street, Braamfontein, 2001", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Sat 10:00-16:00" // Illustrative opening or collection hours for this hub.
   },
   {
    "city": "Pretoria", // City used to match an institution to a collection hub.
    "address": "128 Lynnwood Road, Hatfield, 0083 (head office)", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   {
    "name": "University of the Witwatersrand", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "University of Johannesburg", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "University of Pretoria", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   {
    "name": "University of South Africa (Unisa)", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   {
    "name": "Tshwane University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   {
    "name": "Vaal University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Vanderbijlpark" // City used to match an institution to a collection hub.
   },
   {
    "name": "Sefako Makgatho Health Sciences University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Ga-Rankuwa" // City used to match an institution to a collection hub.
   },
   {
    "name": "Central Johannesburg TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Ekurhuleni East TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Springs" // City used to match an institution to a collection hub.
   },
   {
    "name": "Ekurhuleni West TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Germiston" // City used to match an institution to a collection hub.
   },
   {
    "name": "Sedibeng TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Vereeniging" // City used to match an institution to a collection hub.
   },
   {
    "name": "South West Gauteng TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Soweto" // City used to match an institution to a collection hub.
   },
   {
    "name": "Tshwane North TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   {
    "name": "Tshwane South TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   },
   {
    "name": "Western TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Randfontein" // City used to match an institution to a collection hub.
   },
   {
    "name": "AAA School of Advertising", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Academy for Facilities Management", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "Academy of Sound Engineering", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "AFDA", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Belgium Campus ITversity", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "Boston Media House", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Da Vinci Institute", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Modderfontein" // City used to match an institution to a collection hub.
   },
   {
    "name": "Empilweni Education", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "Foundation for Professional Development", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "Greenside Design Center College of Design", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Health and Fitness Professionals Academy", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "Henley Business School South Africa", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "NOSA College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   }
  ]
 },
 {
  "code": "KZN", // Short province code used by the form and coverage data.
  "name": "KwaZulu-Natal", // Human-readable province or institution name.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   {
    "city": "Durban", // City used to match an institution to a collection hub.
    "address": "Shop 12, University Drive, Westville, 3629 (lockers)", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Lockers daily 08:00-20:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   {
    "name": "University of KwaZulu-Natal", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   {
    "name": "Durban University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   {
    "name": "Mangosuthu University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   {
    "name": "University of Zululand", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "KwaDlangezwa" // City used to match an institution to a collection hub.
   },
   {
    "name": "Coastal TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   {
    "name": "Elangeni TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Pinetown" // City used to match an institution to a collection hub.
   },
   {
    "name": "Esayidi TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Port Shepstone" // City used to match an institution to a collection hub.
   },
   {
    "name": "Majuba TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Newcastle" // City used to match an institution to a collection hub.
   },
   {
    "name": "Mnambithi TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Ladysmith" // City used to match an institution to a collection hub.
   },
   {
    "name": "Mthashana TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "Thekwini TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   {
    "name": "Umfolozi TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Richards Bay" // City used to match an institution to a collection hub.
   },
   {
    "name": "Umgungundlovu TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Pietermaritzburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Berea College of Technology", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   },
   {
    "name": "Commerce and Computer College of South Africa", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Pietermaritzburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "ICESA Education", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Durban" // City used to match an institution to a collection hub.
   }
  ]
 },
 {
  "code": "LP", // Short province code used by the form and coverage data.
  "name": "Limpopo", // Human-readable province or institution name.
  "leadDays": 3, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   {
    "city": "Polokwane", // City used to match an institution to a collection hub.
    "address": "Polokwane CBD collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   {
    "name": "University of Limpopo", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Mankweng" // City used to match an institution to a collection hub.
   },
   {
    "name": "University of Venda", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Thohoyandou" // City used to match an institution to a collection hub.
   },
   {
    "name": "Capricorn TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Polokwane" // City used to match an institution to a collection hub.
   },
   {
    "name": "Lephalale TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Lephalale" // City used to match an institution to a collection hub.
   },
   {
    "name": "Letaba TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Tzaneen" // City used to match an institution to a collection hub.
   },
   {
    "name": "Mopani South East TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Phalaborwa" // City used to match an institution to a collection hub.
   },
   {
    "name": "Sekhukhune TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Groblersdal" // City used to match an institution to a collection hub.
   },
   {
    "name": "Vhembe TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Thohoyandou" // City used to match an institution to a collection hub.
   },
   {
    "name": "Waterberg TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "Southern African Wildlife College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Hoedspruit" // City used to match an institution to a collection hub.
   }
  ]
 },
 {
  "code": "MP", // Short province code used by the form and coverage data.
  "name": "Mpumalanga", // Human-readable province or institution name.
  "leadDays": 3, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   {
    "city": "Mbombela", // City used to match an institution to a collection hub.
    "address": "Mbombela CBD collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   {
    "name": "University of Mpumalanga", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   },
   {
    "name": "Ehlanzeni TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   },
   {
    "name": "Gert Sibande TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Standerton" // City used to match an institution to a collection hub.
   },
   {
    "name": "Nkangala TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "eMalahleni" // City used to match an institution to a collection hub.
   },
   {
    "name": "MSC Business College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   },
   {
    "name": "Unigrad College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   }
  ]
 },
 {
  "code": "NC", // Short province code used by the form and coverage data.
  "name": "Northern Cape", // Human-readable province or institution name.
  "leadDays": 4, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   {
    "city": "Kimberley", // City used to match an institution to a collection hub.
    "address": "Kimberley CBD collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   {
    "name": "Sol Plaatje University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   },
   {
    "name": "Northern Cape Rural TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Upington" // City used to match an institution to a collection hub.
   },
   {
    "name": "Northern Cape Urban TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   },
   {
    "name": "ATTI Kimberley", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   },
   {
    "name": "Qualitas Career Academy", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   }
  ]
 },
 {
  "code": "NW", // Short province code used by the form and coverage data.
  "name": "North West", // Human-readable province or institution name.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   {
    "city": "Potchefstroom", // City used to match an institution to a collection hub.
    "address": "Potchefstroom town centre collection desk", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   {
    "name": "North-West University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Potchefstroom" // City used to match an institution to a collection hub.
   },
   {
    "name": "Orbit TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "Taletso TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Mahikeng" // City used to match an institution to a collection hub.
   },
   {
    "name": "Vuselela TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Klerksdorp" // City used to match an institution to a collection hub.
   },
   {
    "name": "Normansville College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Rustenburg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Potchefstroom Academy and SAAHST", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Potchefstroom" // City used to match an institution to a collection hub.
   }
  ]
 },
 {
  "code": "WC", // Short province code used by the form and coverage data.
  "name": "Western Cape", // Human-readable province or institution name.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "hubs": [ // Collection hubs available in this province.
   {
    "city": "Cape Town", // City used to match an institution to a collection hub.
    "address": "45 Main Road, Rondebosch, 7700", // Illustrative collection-point address; this project uses sample business data.
    "hours": "Tue-Sat 10:00-15:00" // Illustrative opening or collection hours for this hub.
   }
  ],
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   {
    "name": "University of Cape Town", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "Stellenbosch University", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Stellenbosch" // City used to match an institution to a collection hub.
   },
   {
    "name": "University of the Western Cape", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Bellville" // City used to match an institution to a collection hub.
   },
   {
    "name": "Cape Peninsula University of Technology", // Human-readable province or institution name.
    "type": "University", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "Boland TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Stellenbosch" // City used to match an institution to a collection hub.
   },
   {
    "name": "College of Cape Town for TVET", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "False Bay TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Muizenberg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Northlink TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "Bellville" // City used to match an institution to a collection hub.
   },
   {
    "name": "South Cape TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "George" // City used to match an institution to a collection hub.
   },
   {
    "name": "West Coast TVET College", // Human-readable province or institution name.
    "type": "TVET college", // Category used to identify the kind of education institution.
    "city": "" // City used to match an institution to a collection hub.
   },
   {
    "name": "ACT Cape Town", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "BHC School of Design", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "Cape Audio College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "Cape Town College of Fashion Design", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "Cornerstone Institute", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "Friends of Design Academy of Digital Arts", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "George Whitefield College", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Muizenberg" // City used to match an institution to a collection hub.
   },
   {
    "name": "Helderberg College of Higher Education", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Somerset West" // City used to match an institution to a collection hub.
   },
   {
    "name": "Inscape Education Group", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "International Hotel School", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "Isa Carstens Academy", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "Red & Yellow Creative School of Business", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "The Animation School", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   },
   {
    "name": "TSIBA Education", // Human-readable province or institution name.
    "type": "Private institution", // Category used to identify the kind of education institution.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   }
  ]
 }
];

// Private providers with campuses or distance study in every province. They use the province lead time.
const NATIONAL_PRIVATE = [
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
