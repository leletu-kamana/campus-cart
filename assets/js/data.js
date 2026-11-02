// ==========================================================
// CAMPUS-CART
// Coverage data: provinces, collection hubs and institutions
// Used by forms.js (enquiry form) so the dropdowns and delivery
// estimates always match the Coverage page.
// ==========================================================
// INLINE COMMENTING GUIDE: The comments below describe the purpose of the main logic blocks, state changes, DOM operations and event handling.

// leadDays = typical courier time to a campus in that province, in working days.
// A campus in the same city as a hub is always 1 working day.
// An institution with city "" has several campuses (or an unknown town), so the province lead time is used.
// type is "University", "TVET college" or "Private institution".
// Hub addresses and times are illustrative because Campus-Cart is a fictional business.
// JavaScript statement/expression: const PROVINCES = [ // Starts the list of provinces.
const PROVINCES = [ // Starts the list of provinces.
 // JavaScript statement/expression: { // Starts a new province record.
 { // Starts a new province record.
  // JavaScript statement/expression: "code": "EC", // Short province code used by the form and coverage data.
  "code": "EC", // Short province code used by the form and coverage data.
  // JavaScript statement/expression: "name": "Eastern Cape", // Human-readable province or institution name.
  "name": "Eastern Cape", // Human-readable province or institution name.
  // JavaScript statement/expression: "leadDays": 3, // Estimated delivery lead time in working days for this province.
  "leadDays": 3, // Estimated delivery lead time in working days for this province.
  // JavaScript statement/expression: "hubs": [ // Collection hubs available in this province.
  "hubs": [ // Collection hubs available in this province.
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Gqeberha", // City used to match an institution to a collection hub.
    "city": "Gqeberha", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "Summerstrand collection desk", // Illustrative collection-point address; this project uses sample 
    "address": "Summerstrand collection desk", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ],
  ],
  // JavaScript statement/expression: "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of Fort Hare", // Human-readable province or institution name.
    "name": "University of Fort Hare", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Alice" // City used to match an institution to a collection hub.
    "city": "Alice" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Rhodes University", // Human-readable province or institution name.
    "name": "Rhodes University", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Makhanda" // City used to match an institution to a collection hub.
    "city": "Makhanda" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Nelson Mandela University", // Human-readable province or institution name.
    "name": "Nelson Mandela University", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Gqeberha" // City used to match an institution to a collection hub.
    "city": "Gqeberha" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Walter Sisulu University", // Human-readable province or institution name.
    "name": "Walter Sisulu University", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Mthatha" // City used to match an institution to a collection hub.
    "city": "Mthatha" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Buffalo City TVET College", // Human-readable province or institution name.
    "name": "Buffalo City TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "East London" // City used to match an institution to a collection hub.
    "city": "East London" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Eastcape Midlands TVET College", // Human-readable province or institution name.
    "name": "Eastcape Midlands TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Ikhala TVET College", // Human-readable province or institution name.
    "name": "Ikhala TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Komani" // City used to match an institution to a collection hub.
    "city": "Komani" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Ingwe TVET College", // Human-readable province or institution name.
    "name": "Ingwe TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "King Hintsa TVET College", // Human-readable province or institution name.
    "name": "King Hintsa TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "King Sabata Dalindyebo TVET College", // Human-readable province or institution name.
    "name": "King Sabata Dalindyebo TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Mthatha" // City used to match an institution to a collection hub.
    "city": "Mthatha" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Lovedale TVET College", // Human-readable province or institution name.
    "name": "Lovedale TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Alice" // City used to match an institution to a collection hub.
    "city": "Alice" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Port Elizabeth TVET College", // Human-readable province or institution name.
    "name": "Port Elizabeth TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Gqeberha" // City used to match an institution to a collection hub.
    "city": "Gqeberha" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Ed-U City Campus", // Human-readable province or institution name.
    "name": "Ed-U City Campus", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Gqeberha" // City used to match an institution to a collection hub.
    "city": "Gqeberha" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Stenden South Africa", // Human-readable province or institution name.
    "name": "Stenden South Africa", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Port Alfred" // City used to match an institution to a collection hub.
    "city": "Port Alfred" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ]
  ]
 // JavaScript statement/expression: },
 },
 // JavaScript statement/expression: { // Starts a new province record.
 { // Starts a new province record.
  // JavaScript statement/expression: "code": "FS", // Short province code used by the form and coverage data.
  "code": "FS", // Short province code used by the form and coverage data.
  // JavaScript statement/expression: "name": "Free State", // Human-readable province or institution name.
  "name": "Free State", // Human-readable province or institution name.
  // JavaScript statement/expression: "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  // JavaScript statement/expression: "hubs": [ // Collection hubs available in this province.
  "hubs": [ // Collection hubs available in this province.
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Bloemfontein", // City used to match an institution to a collection hub.
    "city": "Bloemfontein", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "Brandwag collection desk", // Illustrative collection-point address; this project uses sample busi
    "address": "Brandwag collection desk", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ],
  ],
  // JavaScript statement/expression: "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of the Free State", // Human-readable province or institution name.
    "name": "University of the Free State", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Bloemfontein" // City used to match an institution to a collection hub.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Central University of Technology", // Human-readable province or institution name.
    "name": "Central University of Technology", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Bloemfontein" // City used to match an institution to a collection hub.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Flavius Mareka TVET College", // Human-readable province or institution name.
    "name": "Flavius Mareka TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Sasolburg" // City used to match an institution to a collection hub.
    "city": "Sasolburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Goldfields TVET College", // Human-readable province or institution name.
    "name": "Goldfields TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Welkom" // City used to match an institution to a collection hub.
    "city": "Welkom" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Maluti TVET College", // Human-readable province or institution name.
    "name": "Maluti TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Phuthaditjhaba" // City used to match an institution to a collection hub.
    "city": "Phuthaditjhaba" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Motheo TVET College", // Human-readable province or institution name.
    "name": "Motheo TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Bloemfontein" // City used to match an institution to a collection hub.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Qualitas Career Academy", // Human-readable province or institution name.
    "name": "Qualitas Career Academy", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Bloemfontein" // City used to match an institution to a collection hub.
    "city": "Bloemfontein" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ]
  ]
 // JavaScript statement/expression: },
 },
 // JavaScript statement/expression: { // Starts a new province record.
 { // Starts a new province record.
  // JavaScript statement/expression: "code": "GP", // Short province code used by the form and coverage data.
  "code": "GP", // Short province code used by the form and coverage data.
  // JavaScript statement/expression: "name": "Gauteng", // Human-readable province or institution name.
  "name": "Gauteng", // Human-readable province or institution name.
  // JavaScript statement/expression: "leadDays": 1, // Estimated delivery lead time in working days for this province.
  "leadDays": 1, // Estimated delivery lead time in working days for this province.
  // JavaScript statement/expression: "hubs": [ // Collection hubs available in this province.
  "hubs": [ // Collection hubs available in this province.
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Johannesburg", // City used to match an institution to a collection hub.
    "city": "Johannesburg", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "7 Jorissen Street, Braamfontein, 2001", // Illustrative collection-point address; this project use
    "address": "7 Jorissen Street, Braamfontein, 2001", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Mon-Sat 10:00-16:00" // Illustrative opening or collection hours for this hub.
    "hours": "Mon-Sat 10:00-16:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Pretoria", // City used to match an institution to a collection hub.
    "city": "Pretoria", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "128 Lynnwood Road, Hatfield, 0083 (head office)", // Illustrative collection-point address; this p
    "address": "128 Lynnwood Road, Hatfield, 0083 (head office)", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ],
  ],
  // JavaScript statement/expression: "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of the Witwatersrand", // Human-readable province or institution name.
    "name": "University of the Witwatersrand", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Johannesburg" // City used to match an institution to a collection hub.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of Johannesburg", // Human-readable province or institution name.
    "name": "University of Johannesburg", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Johannesburg" // City used to match an institution to a collection hub.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of Pretoria", // Human-readable province or institution name.
    "name": "University of Pretoria", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Pretoria" // City used to match an institution to a collection hub.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of South Africa (Unisa)", // Human-readable province or institution name.
    "name": "University of South Africa (Unisa)", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Pretoria" // City used to match an institution to a collection hub.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Tshwane University of Technology", // Human-readable province or institution name.
    "name": "Tshwane University of Technology", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Pretoria" // City used to match an institution to a collection hub.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Vaal University of Technology", // Human-readable province or institution name.
    "name": "Vaal University of Technology", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Vanderbijlpark" // City used to match an institution to a collection hub.
    "city": "Vanderbijlpark" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Sefako Makgatho Health Sciences University", // Human-readable province or institution name.
    "name": "Sefako Makgatho Health Sciences University", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Ga-Rankuwa" // City used to match an institution to a collection hub.
    "city": "Ga-Rankuwa" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Central Johannesburg TVET College", // Human-readable province or institution name.
    "name": "Central Johannesburg TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Johannesburg" // City used to match an institution to a collection hub.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Ekurhuleni East TVET College", // Human-readable province or institution name.
    "name": "Ekurhuleni East TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Springs" // City used to match an institution to a collection hub.
    "city": "Springs" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Ekurhuleni West TVET College", // Human-readable province or institution name.
    "name": "Ekurhuleni West TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Germiston" // City used to match an institution to a collection hub.
    "city": "Germiston" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Sedibeng TVET College", // Human-readable province or institution name.
    "name": "Sedibeng TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Vereeniging" // City used to match an institution to a collection hub.
    "city": "Vereeniging" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "South West Gauteng TVET College", // Human-readable province or institution name.
    "name": "South West Gauteng TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Soweto" // City used to match an institution to a collection hub.
    "city": "Soweto" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Tshwane North TVET College", // Human-readable province or institution name.
    "name": "Tshwane North TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Pretoria" // City used to match an institution to a collection hub.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Tshwane South TVET College", // Human-readable province or institution name.
    "name": "Tshwane South TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Pretoria" // City used to match an institution to a collection hub.
    "city": "Pretoria" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Western TVET College", // Human-readable province or institution name.
    "name": "Western TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Randfontein" // City used to match an institution to a collection hub.
    "city": "Randfontein" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "AAA School of Advertising", // Human-readable province or institution name.
    "name": "AAA School of Advertising", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Johannesburg" // City used to match an institution to a collection hub.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Academy for Facilities Management", // Human-readable province or institution name.
    "name": "Academy for Facilities Management", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Academy of Sound Engineering", // Human-readable province or institution name.
    "name": "Academy of Sound Engineering", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Johannesburg" // City used to match an institution to a collection hub.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "AFDA", // Human-readable province or institution name.
    "name": "AFDA", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Johannesburg" // City used to match an institution to a collection hub.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Belgium Campus ITversity", // Human-readable province or institution name.
    "name": "Belgium Campus ITversity", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Boston Media House", // Human-readable province or institution name.
    "name": "Boston Media House", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Johannesburg" // City used to match an institution to a collection hub.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Da Vinci Institute", // Human-readable province or institution name.
    "name": "Da Vinci Institute", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Modderfontein" // City used to match an institution to a collection hub.
    "city": "Modderfontein" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Empilweni Education", // Human-readable province or institution name.
    "name": "Empilweni Education", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Foundation for Professional Development", // Human-readable province or institution name.
    "name": "Foundation for Professional Development", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Greenside Design Center College of Design", // Human-readable province or institution name.
    "name": "Greenside Design Center College of Design", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Johannesburg" // City used to match an institution to a collection hub.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Health and Fitness Professionals Academy", // Human-readable province or institution name.
    "name": "Health and Fitness Professionals Academy", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Henley Business School South Africa", // Human-readable province or institution name.
    "name": "Henley Business School South Africa", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Johannesburg" // City used to match an institution to a collection hub.
    "city": "Johannesburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "NOSA College", // Human-readable province or institution name.
    "name": "NOSA College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ]
  ]
 // JavaScript statement/expression: },
 },
 // JavaScript statement/expression: { // Starts a new province record.
 { // Starts a new province record.
  // JavaScript statement/expression: "code": "KZN", // Short province code used by the form and coverage data.
  "code": "KZN", // Short province code used by the form and coverage data.
  // JavaScript statement/expression: "name": "KwaZulu-Natal", // Human-readable province or institution name.
  "name": "KwaZulu-Natal", // Human-readable province or institution name.
  // JavaScript statement/expression: "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  // JavaScript statement/expression: "hubs": [ // Collection hubs available in this province.
  "hubs": [ // Collection hubs available in this province.
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Durban", // City used to match an institution to a collection hub.
    "city": "Durban", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "Shop 12, University Drive, Westville, 3629 (lockers)", // Illustrative collection-point address; t
    "address": "Shop 12, University Drive, Westville, 3629 (lockers)", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Lockers daily 08:00-20:00" // Illustrative opening or collection hours for this hub.
    "hours": "Lockers daily 08:00-20:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ],
  ],
  // JavaScript statement/expression: "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of KwaZulu-Natal", // Human-readable province or institution name.
    "name": "University of KwaZulu-Natal", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Durban" // City used to match an institution to a collection hub.
    "city": "Durban" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Durban University of Technology", // Human-readable province or institution name.
    "name": "Durban University of Technology", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Durban" // City used to match an institution to a collection hub.
    "city": "Durban" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Mangosuthu University of Technology", // Human-readable province or institution name.
    "name": "Mangosuthu University of Technology", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Durban" // City used to match an institution to a collection hub.
    "city": "Durban" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of Zululand", // Human-readable province or institution name.
    "name": "University of Zululand", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "KwaDlangezwa" // City used to match an institution to a collection hub.
    "city": "KwaDlangezwa" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Coastal TVET College", // Human-readable province or institution name.
    "name": "Coastal TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Durban" // City used to match an institution to a collection hub.
    "city": "Durban" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Elangeni TVET College", // Human-readable province or institution name.
    "name": "Elangeni TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Pinetown" // City used to match an institution to a collection hub.
    "city": "Pinetown" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Esayidi TVET College", // Human-readable province or institution name.
    "name": "Esayidi TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Port Shepstone" // City used to match an institution to a collection hub.
    "city": "Port Shepstone" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Majuba TVET College", // Human-readable province or institution name.
    "name": "Majuba TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Newcastle" // City used to match an institution to a collection hub.
    "city": "Newcastle" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Mnambithi TVET College", // Human-readable province or institution name.
    "name": "Mnambithi TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Ladysmith" // City used to match an institution to a collection hub.
    "city": "Ladysmith" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Mthashana TVET College", // Human-readable province or institution name.
    "name": "Mthashana TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Thekwini TVET College", // Human-readable province or institution name.
    "name": "Thekwini TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Durban" // City used to match an institution to a collection hub.
    "city": "Durban" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Umfolozi TVET College", // Human-readable province or institution name.
    "name": "Umfolozi TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Richards Bay" // City used to match an institution to a collection hub.
    "city": "Richards Bay" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Umgungundlovu TVET College", // Human-readable province or institution name.
    "name": "Umgungundlovu TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Pietermaritzburg" // City used to match an institution to a collection hub.
    "city": "Pietermaritzburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Berea College of Technology", // Human-readable province or institution name.
    "name": "Berea College of Technology", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Durban" // City used to match an institution to a collection hub.
    "city": "Durban" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Commerce and Computer College of South Africa", // Human-readable province or institution name.
    "name": "Commerce and Computer College of South Africa", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Pietermaritzburg" // City used to match an institution to a collection hub.
    "city": "Pietermaritzburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "ICESA Education", // Human-readable province or institution name.
    "name": "ICESA Education", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Durban" // City used to match an institution to a collection hub.
    "city": "Durban" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ]
  ]
 // JavaScript statement/expression: },
 },
 // JavaScript statement/expression: { // Starts a new province record.
 { // Starts a new province record.
  // JavaScript statement/expression: "code": "LP", // Short province code used by the form and coverage data.
  "code": "LP", // Short province code used by the form and coverage data.
  // JavaScript statement/expression: "name": "Limpopo", // Human-readable province or institution name.
  "name": "Limpopo", // Human-readable province or institution name.
  // JavaScript statement/expression: "leadDays": 3, // Estimated delivery lead time in working days for this province.
  "leadDays": 3, // Estimated delivery lead time in working days for this province.
  // JavaScript statement/expression: "hubs": [ // Collection hubs available in this province.
  "hubs": [ // Collection hubs available in this province.
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Polokwane", // City used to match an institution to a collection hub.
    "city": "Polokwane", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "Polokwane CBD collection desk", // Illustrative collection-point address; this project uses sample
    "address": "Polokwane CBD collection desk", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ],
  ],
  // JavaScript statement/expression: "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of Limpopo", // Human-readable province or institution name.
    "name": "University of Limpopo", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Mankweng" // City used to match an institution to a collection hub.
    "city": "Mankweng" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of Venda", // Human-readable province or institution name.
    "name": "University of Venda", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Thohoyandou" // City used to match an institution to a collection hub.
    "city": "Thohoyandou" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Capricorn TVET College", // Human-readable province or institution name.
    "name": "Capricorn TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Polokwane" // City used to match an institution to a collection hub.
    "city": "Polokwane" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Lephalale TVET College", // Human-readable province or institution name.
    "name": "Lephalale TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Lephalale" // City used to match an institution to a collection hub.
    "city": "Lephalale" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Letaba TVET College", // Human-readable province or institution name.
    "name": "Letaba TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Tzaneen" // City used to match an institution to a collection hub.
    "city": "Tzaneen" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Mopani South East TVET College", // Human-readable province or institution name.
    "name": "Mopani South East TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Phalaborwa" // City used to match an institution to a collection hub.
    "city": "Phalaborwa" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Sekhukhune TVET College", // Human-readable province or institution name.
    "name": "Sekhukhune TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Groblersdal" // City used to match an institution to a collection hub.
    "city": "Groblersdal" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Vhembe TVET College", // Human-readable province or institution name.
    "name": "Vhembe TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Thohoyandou" // City used to match an institution to a collection hub.
    "city": "Thohoyandou" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Waterberg TVET College", // Human-readable province or institution name.
    "name": "Waterberg TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Southern African Wildlife College", // Human-readable province or institution name.
    "name": "Southern African Wildlife College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Hoedspruit" // City used to match an institution to a collection hub.
    "city": "Hoedspruit" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ]
  ]
 // JavaScript statement/expression: },
 },
 // JavaScript statement/expression: { // Starts a new province record.
 { // Starts a new province record.
  // JavaScript statement/expression: "code": "MP", // Short province code used by the form and coverage data.
  "code": "MP", // Short province code used by the form and coverage data.
  // JavaScript statement/expression: "name": "Mpumalanga", // Human-readable province or institution name.
  "name": "Mpumalanga", // Human-readable province or institution name.
  // JavaScript statement/expression: "leadDays": 3, // Estimated delivery lead time in working days for this province.
  "leadDays": 3, // Estimated delivery lead time in working days for this province.
  // JavaScript statement/expression: "hubs": [ // Collection hubs available in this province.
  "hubs": [ // Collection hubs available in this province.
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Mbombela", // City used to match an institution to a collection hub.
    "city": "Mbombela", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "Mbombela CBD collection desk", // Illustrative collection-point address; this project uses sample 
    "address": "Mbombela CBD collection desk", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ],
  ],
  // JavaScript statement/expression: "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of Mpumalanga", // Human-readable province or institution name.
    "name": "University of Mpumalanga", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Mbombela" // City used to match an institution to a collection hub.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Ehlanzeni TVET College", // Human-readable province or institution name.
    "name": "Ehlanzeni TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Mbombela" // City used to match an institution to a collection hub.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Gert Sibande TVET College", // Human-readable province or institution name.
    "name": "Gert Sibande TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Standerton" // City used to match an institution to a collection hub.
    "city": "Standerton" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Nkangala TVET College", // Human-readable province or institution name.
    "name": "Nkangala TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "eMalahleni" // City used to match an institution to a collection hub.
    "city": "eMalahleni" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "MSC Business College", // Human-readable province or institution name.
    "name": "MSC Business College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Mbombela" // City used to match an institution to a collection hub.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Unigrad College", // Human-readable province or institution name.
    "name": "Unigrad College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Mbombela" // City used to match an institution to a collection hub.
    "city": "Mbombela" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ]
  ]
 // JavaScript statement/expression: },
 },
 // JavaScript statement/expression: { // Starts a new province record.
 { // Starts a new province record.
  // JavaScript statement/expression: "code": "NC", // Short province code used by the form and coverage data.
  "code": "NC", // Short province code used by the form and coverage data.
  // JavaScript statement/expression: "name": "Northern Cape", // Human-readable province or institution name.
  "name": "Northern Cape", // Human-readable province or institution name.
  // JavaScript statement/expression: "leadDays": 4, // Estimated delivery lead time in working days for this province.
  "leadDays": 4, // Estimated delivery lead time in working days for this province.
  // JavaScript statement/expression: "hubs": [ // Collection hubs available in this province.
  "hubs": [ // Collection hubs available in this province.
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Kimberley", // City used to match an institution to a collection hub.
    "city": "Kimberley", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "Kimberley CBD collection desk", // Illustrative collection-point address; this project uses sample
    "address": "Kimberley CBD collection desk", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ],
  ],
  // JavaScript statement/expression: "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Sol Plaatje University", // Human-readable province or institution name.
    "name": "Sol Plaatje University", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Kimberley" // City used to match an institution to a collection hub.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Northern Cape Rural TVET College", // Human-readable province or institution name.
    "name": "Northern Cape Rural TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Upington" // City used to match an institution to a collection hub.
    "city": "Upington" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Northern Cape Urban TVET College", // Human-readable province or institution name.
    "name": "Northern Cape Urban TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Kimberley" // City used to match an institution to a collection hub.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "ATTI Kimberley", // Human-readable province or institution name.
    "name": "ATTI Kimberley", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Kimberley" // City used to match an institution to a collection hub.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Qualitas Career Academy", // Human-readable province or institution name.
    "name": "Qualitas Career Academy", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Kimberley" // City used to match an institution to a collection hub.
    "city": "Kimberley" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ]
  ]
 // JavaScript statement/expression: },
 },
 // JavaScript statement/expression: { // Starts a new province record.
 { // Starts a new province record.
  // JavaScript statement/expression: "code": "NW", // Short province code used by the form and coverage data.
  "code": "NW", // Short province code used by the form and coverage data.
  // JavaScript statement/expression: "name": "North West", // Human-readable province or institution name.
  "name": "North West", // Human-readable province or institution name.
  // JavaScript statement/expression: "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  // JavaScript statement/expression: "hubs": [ // Collection hubs available in this province.
  "hubs": [ // Collection hubs available in this province.
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Potchefstroom", // City used to match an institution to a collection hub.
    "city": "Potchefstroom", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "Potchefstroom town centre collection desk", // Illustrative collection-point address; this project
    "address": "Potchefstroom town centre collection desk", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
    "hours": "Mon-Fri 09:00-17:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ],
  ],
  // JavaScript statement/expression: "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "North-West University", // Human-readable province or institution name.
    "name": "North-West University", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Potchefstroom" // City used to match an institution to a collection hub.
    "city": "Potchefstroom" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Orbit TVET College", // Human-readable province or institution name.
    "name": "Orbit TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Taletso TVET College", // Human-readable province or institution name.
    "name": "Taletso TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Mahikeng" // City used to match an institution to a collection hub.
    "city": "Mahikeng" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Vuselela TVET College", // Human-readable province or institution name.
    "name": "Vuselela TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Klerksdorp" // City used to match an institution to a collection hub.
    "city": "Klerksdorp" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Normansville College", // Human-readable province or institution name.
    "name": "Normansville College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Rustenburg" // City used to match an institution to a collection hub.
    "city": "Rustenburg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Potchefstroom Academy and SAAHST", // Human-readable province or institution name.
    "name": "Potchefstroom Academy and SAAHST", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Potchefstroom" // City used to match an institution to a collection hub.
    "city": "Potchefstroom" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ]
  ]
 // JavaScript statement/expression: },
 },
 // JavaScript statement/expression: { // Starts a new province record.
 { // Starts a new province record.
  // JavaScript statement/expression: "code": "WC", // Short province code used by the form and coverage data.
  "code": "WC", // Short province code used by the form and coverage data.
  // JavaScript statement/expression: "name": "Western Cape", // Human-readable province or institution name.
  "name": "Western Cape", // Human-readable province or institution name.
  // JavaScript statement/expression: "leadDays": 2, // Estimated delivery lead time in working days for this province.
  "leadDays": 2, // Estimated delivery lead time in working days for this province.
  // JavaScript statement/expression: "hubs": [ // Collection hubs available in this province.
  "hubs": [ // Collection hubs available in this province.
   // JavaScript statement/expression: { // Starts a new collection hub record.
   { // Starts a new collection hub record.
    // JavaScript statement/expression: "city": "Cape Town", // City used to match an institution to a collection hub.
    "city": "Cape Town", // City used to match an institution to a collection hub.
    // JavaScript statement/expression: "address": "45 Main Road, Rondebosch, 7700", // Illustrative collection-point address; this project uses sampl
    "address": "45 Main Road, Rondebosch, 7700", // Illustrative collection-point address; this project uses sample business data.
    // JavaScript statement/expression: "hours": "Tue-Sat 10:00-15:00" // Illustrative opening or collection hours for this hub.
    "hours": "Tue-Sat 10:00-15:00" // Illustrative opening or collection hours for this hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ],
  ],
  // JavaScript statement/expression: "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
  "institutions": [ // Universities, TVET colleges and private institutions listed for this province.
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of Cape Town", // Human-readable province or institution name.
    "name": "University of Cape Town", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Stellenbosch University", // Human-readable province or institution name.
    "name": "Stellenbosch University", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Stellenbosch" // City used to match an institution to a collection hub.
    "city": "Stellenbosch" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "University of the Western Cape", // Human-readable province or institution name.
    "name": "University of the Western Cape", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Bellville" // City used to match an institution to a collection hub.
    "city": "Bellville" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Cape Peninsula University of Technology", // Human-readable province or institution name.
    "name": "Cape Peninsula University of Technology", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "University", // Category used to identify the kind of education institution.
    "type": "University", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Boland TVET College", // Human-readable province or institution name.
    "name": "Boland TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Stellenbosch" // City used to match an institution to a collection hub.
    "city": "Stellenbosch" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "College of Cape Town for TVET", // Human-readable province or institution name.
    "name": "College of Cape Town for TVET", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "False Bay TVET College", // Human-readable province or institution name.
    "name": "False Bay TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Muizenberg" // City used to match an institution to a collection hub.
    "city": "Muizenberg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Northlink TVET College", // Human-readable province or institution name.
    "name": "Northlink TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Bellville" // City used to match an institution to a collection hub.
    "city": "Bellville" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "South Cape TVET College", // Human-readable province or institution name.
    "name": "South Cape TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "George" // City used to match an institution to a collection hub.
    "city": "George" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "West Coast TVET College", // Human-readable province or institution name.
    "name": "West Coast TVET College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "TVET college", // Category used to identify the kind of education institution.
    "type": "TVET college", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "" // City used to match an institution to a collection hub.
    "city": "" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "ACT Cape Town", // Human-readable province or institution name.
    "name": "ACT Cape Town", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "BHC School of Design", // Human-readable province or institution name.
    "name": "BHC School of Design", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Cape Audio College", // Human-readable province or institution name.
    "name": "Cape Audio College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Cape Town College of Fashion Design", // Human-readable province or institution name.
    "name": "Cape Town College of Fashion Design", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Cornerstone Institute", // Human-readable province or institution name.
    "name": "Cornerstone Institute", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Friends of Design Academy of Digital Arts", // Human-readable province or institution name.
    "name": "Friends of Design Academy of Digital Arts", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "George Whitefield College", // Human-readable province or institution name.
    "name": "George Whitefield College", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Muizenberg" // City used to match an institution to a collection hub.
    "city": "Muizenberg" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Helderberg College of Higher Education", // Human-readable province or institution name.
    "name": "Helderberg College of Higher Education", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Somerset West" // City used to match an institution to a collection hub.
    "city": "Somerset West" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Inscape Education Group", // Human-readable province or institution name.
    "name": "Inscape Education Group", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "International Hotel School", // Human-readable province or institution name.
    "name": "International Hotel School", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Isa Carstens Academy", // Human-readable province or institution name.
    "name": "Isa Carstens Academy", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "Red & Yellow Creative School of Business", // Human-readable province or institution name.
    "name": "Red & Yellow Creative School of Business", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "The Animation School", // Human-readable province or institution name.
    "name": "The Animation School", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: },
   },
   // JavaScript statement/expression: { // Starts a new institution record.
   { // Starts a new institution record.
    // JavaScript statement/expression: "name": "TSIBA Education", // Human-readable province or institution name.
    "name": "TSIBA Education", // Human-readable province or institution name.
    // JavaScript statement/expression: "type": "Private institution", // Category used to identify the kind of education institution.
    "type": "Private institution", // Category used to identify the kind of education institution.
    // JavaScript statement/expression: "city": "Cape Town" // City used to match an institution to a collection hub.
    "city": "Cape Town" // City used to match an institution to a collection hub.
   // JavaScript statement/expression: }
   }
  // JavaScript statement/expression: ]
  ]
 // JavaScript statement/expression: }
 }
// JavaScript statement/expression: ];
];

// Private providers with campuses or distance study in every province. They use the province lead time.
// JavaScript statement/expression: const NATIONAL_PRIVATE = [ // Starts the list of nationwide private providers.
const NATIONAL_PRIVATE = [ // Starts the list of nationwide private providers.
 // JavaScript statement/expression: "The IIE (Varsity College, Rosebank College, Vega, Design School Southern Africa)", // Institution name for na
 "The IIE (Varsity College, Rosebank College, Vega, Design School Southern Africa)", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "STADIO (including Embury Institute for Teacher Education)", // Institution name for nationwide private-provid
 "STADIO (including Embury Institute for Teacher Education)", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Eduvos", // Institution name for nationwide private-provider coverage.
 "Eduvos", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Boston City Campus", // Institution name for nationwide private-provider coverage.
 "Boston City Campus", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "MANCOSA", // Institution name for nationwide private-provider coverage.
 "MANCOSA", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Regent Business School", // Institution name for nationwide private-provider coverage.
 "Regent Business School", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Richfield Graduate Institute of Technology", // Institution name for nationwide private-provider coverage.
 "Richfield Graduate Institute of Technology", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "CTU Training Solutions", // Institution name for nationwide private-provider coverage.
 "CTU Training Solutions", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Regenesys", // Institution name for nationwide private-provider coverage.
 "Regenesys", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "NewBridge Graduate Institute", // Institution name for nationwide private-provider coverage.
 "NewBridge Graduate Institute", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "SAE Institute", // Institution name for nationwide private-provider coverage.
 "SAE Institute", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Netcare Education (nursing and health)", // Institution name for nationwide private-provider coverage.
 "Netcare Education (nursing and health)", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Central Technical College", // Institution name for nationwide private-provider coverage.
 "Central Technical College", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Open Learning Group", // Institution name for nationwide private-provider coverage.
 "Open Learning Group", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Oxbridge Academy (distance)", // Institution name for nationwide private-provider coverage.
 "Oxbridge Academy (distance)", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Intec College (distance)", // Institution name for nationwide private-provider coverage.
 "Intec College (distance)", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Lyceum College (distance)", // Institution name for nationwide private-provider coverage.
 "Lyceum College (distance)", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Optimi College (distance)", // Institution name for nationwide private-provider coverage.
 "Optimi College (distance)", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Trifocus Fitness Academy (distance)", // Institution name for nationwide private-provider coverage.
 "Trifocus Fitness Academy (distance)", // Institution name for nationwide private-provider coverage.
 // JavaScript statement/expression: "Chefs Training and Innovation Academy" // Institution name for nationwide private-provider coverage.
 "Chefs Training and Innovation Academy" // Institution name for nationwide private-provider coverage.
// JavaScript statement/expression: ];
];

// ==========================================================
// PRODUCT CATALOGUE (moved here from script.js)
// Used by interactions.js: the Deals list, the product detail picker
// and the quick view window all read the same DEALS array.
// Photos live in assets/images/ and are chosen by each product's img path.
// ==========================================================
// JavaScript statement/expression: var CC_CATALOGUE = (function () {
var CC_CATALOGUE = (function () {
    /* ---------- Hardcoded catalogue data (no database) ---------- */
    // Stores reusable image paths so product objects can reference consistent asset locations.
    // JavaScript statement/expression: var IMG = { // Declares and initializes the variable used by this operation.
    var IMG = { // Declares and initializes the variable used by this operation.
        // JavaScript statement/expression: bundle: "images/bundles/starter-bundle-3.jpg", // Defines a property or argument in the current structure.
        bundle: "images/bundles/starter-bundle-3.jpg", // Defines a property or argument in the current structure.
        // JavaScript statement/expression: hero: "images/bundles/hero-campus.jpg", // Defines a property or argument in the current structure.
        hero: "images/bundles/hero-campus.jpg", // Defines a property or argument in the current structure.
        // JavaScript statement/expression: used: "images/second-hand/marketplace.jpg" // Defines a property or argument in the current structure.
        used: "images/second-hand/marketplace.jpg" // Defines a property or argument in the current structure.
    // JavaScript statement/expression: }; // Closes the current block, expression, or function call.
    }; // Closes the current block, expression, or function call.

    // Pages inside /pages/ are one level deeper than index.html.
    // Selects the correct assets directory because files in /pages/ are one folder deeper than index.html.
    // JavaScript statement/expression: var BASE = window.location.pathname.indexOf("/pages/") > -1 ? "../assets/" : "assets/"; // Declares and initia
    var BASE = window.location.pathname.indexOf("/pages/") > -1 ? "../assets/" : "assets/"; // Declares and initializes the variable used by this operation.

    // Each product has its own photo in assets/images/products/. If a photo file has not been added yet,
    // this listener swaps in the starter bundle photo once, so no card ever shows a broken image.
    // The error event does not bubble, so the listener uses the capture phase (the true at the end).
    // JavaScript statement/expression: document.addEventListener("error", function (e) { // Registers a handler for images that fail to load (capture
    document.addEventListener("error", function (e) { // Registers a handler for images that fail to load (capture phase).
        // JavaScript statement/expression: var img = e.target; // Stores the element that fired the error.
        var img = e.target; // Stores the element that fired the error.
        // The starter bundle photo is not inside images/products/, so this can never loop.
        // JavaScript statement/expression: if (img && img.tagName === "IMG" && img.src.indexOf("images/products/") > -1) { // Checks that it is a product
        if (img && img.tagName === "IMG" && img.src.indexOf("images/products/") > -1) { // Checks that it is a product photo.
            // JavaScript statement/expression: img.src = BASE + IMG.bundle; // Swaps in the starter bundle photo.
            img.src = BASE + IMG.bundle; // Swaps in the starter bundle photo.
        // JavaScript statement/expression: }
        }
    // JavaScript statement/expression: }, true);
    }, true);

    // Stores the catalogue as an array of product objects containing names, categories, prices, descriptions, and images.
    // JavaScript statement/expression: var DEALS = [ // Declares and initializes the variable used by this operation.
    var DEALS = [ // Declares and initializes the variable used by this operation.
        // JavaScript statement/expression: { name: "Basic Starter Bundle", category: "bundles", condition: "new", price: 1499, desc: "Bedding, kettle, mu
        { name: "Basic Starter Bundle", category: "bundles", condition: "new", price: 1499, desc: "Bedding, kettle, mug set and study basics for a first-year res room.", img: "images/bundles/bundle-basic.jpg", alt: "Four items from the Basic Starter Bundle: a duvet, an electric kettle, stacked mugs and a notebook" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Standard Starter Bundle", category: "bundles", condition: "new", price: 2799, desc: "Everything in Ba
        { name: "Standard Starter Bundle", category: "bundles", condition: "new", price: 2799, desc: "Everything in Basic plus desk lamp, laundry set and kitchen starter pack.", img: "images/bundles/bundle-standard.jpg", alt: "Four items from the Standard Starter Bundle: a duvet, an electric kettle, stacked mugs and a navy desk lamp" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Premium Starter Bundle", category: "bundles", condition: "new", price: 4499, desc: "Full res setup: b
        { name: "Premium Starter Bundle", category: "bundles", condition: "new", price: 4499, desc: "Full res setup: bedding, appliances, storage, stationery and lockable trunk.", img: "images/bundles/bundle-premium.jpg", alt: "Four items from the Premium Starter Bundle: a study chair, stackable storage trays, an electric kettle and a pen holder" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Second-Hand Study Desk", category: "furniture", condition: "used", price: 650, desc: "Reviewed listin
        { name: "Second-Hand Study Desk", category: "furniture", condition: "used", price: 650, desc: "Reviewed listing from a graduating student in Pretoria. Light wear.", img: "images/products/study-funiture.jpg", alt: "White study desk with a white chair, a desk lamp and shelves in a bedroom" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Mini Bar Fridge (Used)", category: "appliances", condition: "used", price: 1150, desc: "Works perfect
        { name: "Mini Bar Fridge (Used)", category: "appliances", condition: "used", price: 1150, desc: "Works perfectly, tested at our collection point. 12 months old.", img: IMG.used }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Electric Kettle 1.7L", category: "appliances", condition: "new", price: 289, desc: "Fast-boil kettle,
        { name: "Electric Kettle 1.7L", category: "appliances", condition: "new", price: 289, desc: "Fast-boil kettle, res-friendly and load-shedding ready.", img: "images/products/kettle.jpg", alt: "Stainless steel electric kettle with a yellow trim on its power base" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Accounting Textbook Set", category: "textbooks", condition: "used", price: 420, desc: "Prescribed tit
        { name: "Accounting Textbook Set", category: "textbooks", condition: "used", price: 420, desc: "Prescribed titles for first-year commerce, current edition.", img: "images/products/textbook.jpg", alt: "Navy hardcover textbook with a yellow bookmark ribbon" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Study Chair (Ergonomic)", category: "furniture", condition: "new", price: 899, desc: "Adjustable chai
        { name: "Study Chair (Ergonomic)", category: "furniture", condition: "new", price: 899, desc: "Adjustable chair built for long study sessions in a small room.", img: "images/products/table-chair.jpg", alt: "Ergonomic mesh study chair with a navy seat, headrest and yellow armrest pads" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Stationery Mega Pack", category: "stationery", condition: "new", price: 249, desc: "Files, pads, pens
        { name: "Stationery Mega Pack", category: "stationery", condition: "new", price: 249, desc: "Files, pads, pens, highlighters and a scientific calculator.", img: "images/products/stationery.jpg", alt: "Notebooks, pencils, highlighters, sticky notes, a ruler and a calculator laid out together" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Duvet & Linen Set (Double)", category: "bedding", condition: "new", price: 749, desc: "Warm winter du
        { name: "Duvet & Linen Set (Double)", category: "bedding", condition: "new", price: 749, desc: "Warm winter duvet, fitted sheet, pillow and two covers.", img: "images/products/duvet.jpg", alt: "Folded grey duvet with navy piping" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Second-Hand Laptop Bag", category: "stationery", condition: "used", price: 180, desc: "Padded 15-inch
        { name: "Second-Hand Laptop Bag", category: "stationery", condition: "used", price: 180, desc: "Padded 15-inch bag, cleaned and checked by our team.", img: "images/products/laptop-bag.jpg", alt: "Navy padded laptop sleeve with yellow zip pulls" }, // Performs the next step in the current Campus-Cart operation.
        // JavaScript statement/expression: { name: "Load-Shedding Light Kit", category: "appliances", condition: "new", price: 329, desc: "Rechargeable l
        { name: "Load-Shedding Light Kit", category: "appliances", condition: "new", price: 329, desc: "Rechargeable lamp, power bank and extension lead.", img: IMG.bundle }, // Performs the next step in the current Campus-Cart operation.
        // More products, two for every category, so each filter shows a wider range.
        // JavaScript statement/expression: { name: "Res Kitchen Starter Bundle", category: "bundles", condition: "new", price: 1199, desc: "Pots, a pan, 
        { name: "Res Kitchen Starter Bundle", category: "bundles", condition: "new", price: 1199, desc: "Pots, a pan, cutlery, plates, mugs and a chopping board for cooking in a res kitchenette.", img: IMG.bundle }, // Adds the product "Res Kitchen Starter Bundle" to the catalogue.
        // JavaScript statement/expression: { name: "Second-Hand Residence Bundle", category: "bundles", condition: "used", price: 1250, desc: "Reviewed b
        { name: "Second-Hand Residence Bundle", category: "bundles", condition: "used", price: 1250, desc: "Reviewed bundle from a graduating student: desk lamp, small fan, storage crates and a bedside table.", img: IMG.used }, // Adds the product "Second-Hand Residence Bundle" to the catalogue.
        // JavaScript statement/expression: { name: "Bookshelf (5-Tier)", category: "furniture", condition: "new", price: 649, desc: "Lightweight shelf th
        { name: "Bookshelf (5-Tier)", category: "furniture", condition: "new", price: 649, desc: "Lightweight shelf that fits a res room wall and holds a semester of textbooks.", img: IMG.bundle }, // Adds the product "Bookshelf (5-Tier)" to the catalogue.
        // JavaScript statement/expression: { name: "Second-Hand Bedside Drawers", category: "furniture", condition: "used", price: 310, desc: "Two-drawer
        { name: "Second-Hand Bedside Drawers", category: "furniture", condition: "used", price: 310, desc: "Two-drawer unit from a graduating student, cleaned and checked by our team.", img: IMG.used }, // Adds the product "Second-Hand Bedside Drawers" to the catalogue.
        // JavaScript statement/expression: { name: "Microwave Oven 20L", category: "appliances", condition: "new", price: 1099, desc: "Compact 20 litre m
        { name: "Microwave Oven 20L", category: "appliances", condition: "new", price: 1099, desc: "Compact 20 litre microwave with a defrost setting, sized for a res kitchenette.", img: IMG.bundle }, // Adds the product "Microwave Oven 20L" to the catalogue.
        // JavaScript statement/expression: { name: "Second-Hand Air Fryer", category: "appliances", condition: "used", price: 550, desc: "Reviewed listin
        { name: "Second-Hand Air Fryer", category: "appliances", condition: "used", price: 550, desc: "Reviewed listing, tested at our collection point. Basket and tray included.", img: IMG.used }, // Adds the product "Second-Hand Air Fryer" to the catalogue.
        // JavaScript statement/expression: { name: "Single Duvet and Linen Set", category: "bedding", condition: "new", price: 549, desc: "Duvet, fitted 
        { name: "Single Duvet and Linen Set", category: "bedding", condition: "new", price: 549, desc: "Duvet, fitted sheet, pillow and one cover for a standard single res bed.", img: "images/products/bedding-duvets.jpg", alt: "White pillows and a rolled white duvet" }, // Adds the product "Single Duvet and Linen Set" to the catalogue.
        // JavaScript statement/expression: { name: "Fleece Blanket and Pillow Pair", category: "bedding", condition: "new", price: 299, desc: "Soft fleec
        { name: "Fleece Blanket and Pillow Pair", category: "bedding", condition: "new", price: 299, desc: "Soft fleece blanket and two pillows for cold Eastern Cape winter nights.", img: IMG.bundle }, // Adds the product "Fleece Blanket and Pillow Pair" to the catalogue.
        // JavaScript statement/expression: { name: "Biology and Chemistry Textbook Set", category: "textbooks", condition: "used", price: 450, desc: "Com
        { name: "Biology and Chemistry Textbook Set", category: "textbooks", condition: "used", price: 450, desc: "Common first-year science titles, checked for missing pages and heavy highlighting.", img: IMG.used }, // Adds the product "Biology and Chemistry Textbook Set" to the catalogue.
        // JavaScript statement/expression: { name: "IT and Programming Textbook Set", category: "textbooks", condition: "used", price: 520, desc: "Common
        { name: "IT and Programming Textbook Set", category: "textbooks", condition: "used", price: 520, desc: "Common first-year titles for programming and web development, checked by our team.", img: IMG.used }, // Adds the product "IT and Programming Textbook Set" to the catalogue.
        // JavaScript statement/expression: { name: "Scientific Calculator", category: "stationery", condition: "new", price: 219, desc: "Exam-friendly sc
        { name: "Scientific Calculator", category: "stationery", condition: "new", price: 219, desc: "Exam-friendly scientific calculator with a protective cover and spare battery.", img: "images/products/scientific-calculator.jpg", alt: "Navy scientific calculator with yellow function keys" }, // Adds the product "Scientific Calculator" to the catalogue.
        // JavaScript statement/expression: { name: "Study Backpack with Laptop Sleeve", category: "stationery", condition: "new", price: 389, desc: "Wate
        { name: "Study Backpack with Laptop Sleeve", category: "stationery", condition: "new", price: 389, desc: "Water-resistant backpack with a padded sleeve that fits a 15-inch laptop.", img: "images/products/bagpack.jpg", alt: "Navy backpack with tan leather trim and a front zip pocket" }, // Performs the next step in the current Campus-Cart operation.
        // A third round of products, again two for every category.
        // JavaScript statement/expression: { name: "Laundry Starter Bundle", category: "bundles", condition: "new", price: 459, desc: "Laundry basket, dr
        { name: "Laundry Starter Bundle", category: "bundles", condition: "new", price: 459, desc: "Laundry basket, drying rack, pegs and a starter pack of washing powder for res laundry day.", img: IMG.bundle }, // Adds the product "Laundry Starter Bundle" to the catalogue.
        // JavaScript statement/expression: { name: "Study Starter Bundle", category: "bundles", condition: "new", price: 649, desc: "Desk lamp, lever arc
        { name: "Study Starter Bundle", category: "bundles", condition: "new", price: 649, desc: "Desk lamp, lever arch files, notepads and a desk organiser to set up a study corner.", img: "images/products/essential-bundle.jpg", alt: "Flat lay of notebooks, pens, a pencil case, sticky notes and a navy bag on a white desk" }, // Adds the product "Study Starter Bundle" to the catalogue.
        // JavaScript statement/expression: { name: "Foldable Study Table", category: "furniture", condition: "new", price: 579, desc: "Folds flat for sto
        { name: "Foldable Study Table", category: "furniture", condition: "new", price: 579, desc: "Folds flat for storage and fits a laptop, notes and a mug in a small res room.", img: IMG.bundle }, // Adds the product "Foldable Study Table" to the catalogue.
        // JavaScript statement/expression: { name: "Second-Hand Office Chair", category: "furniture", condition: "used", price: 420, desc: "Padded office
        { name: "Second-Hand Office Chair", category: "furniture", condition: "used", price: 420, desc: "Padded office chair from a graduating student, cleaned and checked by our team.", img: IMG.used }, // Adds the product "Second-Hand Office Chair" to the catalogue.
        // JavaScript statement/expression: { name: "Two-Plate Hot Plate", category: "appliances", condition: "new", price: 399, desc: "Portable electric 
        { name: "Two-Plate Hot Plate", category: "appliances", condition: "new", price: 399, desc: "Portable electric hot plate for simple meals where a full stove is not allowed.", img: IMG.bundle }, // Adds the product "Two-Plate Hot Plate" to the catalogue.
        // JavaScript statement/expression: { name: "Rechargeable Desk Fan", category: "appliances", condition: "new", price: 379, desc: "Quiet desk fan w
        { name: "Rechargeable Desk Fan", category: "appliances", condition: "new", price: 379, desc: "Quiet desk fan with a rechargeable battery that keeps running during load-shedding.", img: "images/products/table-fan.jpg", alt: "Grey desk fan with a yellow centre cap" }, // Adds the product "Rechargeable Desk Fan" to the catalogue.
        // JavaScript statement/expression: { name: "Single Mattress Protector", category: "bedding", condition: "new", price: 219, desc: "Washable fitted
        { name: "Single Mattress Protector", category: "bedding", condition: "new", price: 219, desc: "Washable fitted protector that guards a res mattress against spills and stains.", img: IMG.bundle }, // Adds the product "Single Mattress Protector" to the catalogue.
        // JavaScript statement/expression: { name: "Bath Towel Set", category: "bedding", condition: "new", price: 329, desc: "Two bath towels, two hand 
        { name: "Bath Towel Set", category: "bedding", condition: "new", price: 329, desc: "Two bath towels, two hand towels and a face cloth in a quick-dry cotton blend.", img: IMG.bundle }, // Adds the product "Bath Towel Set" to the catalogue.
        // JavaScript statement/expression: { name: "Law Textbook Set", category: "textbooks", condition: "used", price: 480, desc: "Common first-year law
        { name: "Law Textbook Set", category: "textbooks", condition: "used", price: 480, desc: "Common first-year law titles, checked for missing pages and heavy highlighting.", img: IMG.used }, // Adds the product "Law Textbook Set" to the catalogue.
        // JavaScript statement/expression: { name: "Engineering Maths Textbook", category: "textbooks", condition: "used", price: 360, desc: "First-year 
        { name: "Engineering Maths Textbook", category: "textbooks", condition: "used", price: 360, desc: "First-year engineering mathematics textbook with worked examples, in good condition.", img: IMG.used }, // Adds the product "Engineering Maths Textbook" to the catalogue.
        // JavaScript statement/expression: { name: "A4 Lever Arch File 5-Pack", category: "stationery", condition: "new", price: 169, desc: "Five sturdy 
        { name: "A4 Lever Arch File 5-Pack", category: "stationery", condition: "new", price: 169, desc: "Five sturdy lever arch files with labels for sorting notes by module.", img: IMG.bundle }, // Adds the product "A4 Lever Arch File 5-Pack" to the catalogue.
        // JavaScript statement/expression: { name: "LED Desk Lamp", category: "stationery", condition: "new", price: 229, desc: "Adjustable LED lamp with
        { name: "LED Desk Lamp", category: "stationery", condition: "new", price: 229, desc: "Adjustable LED lamp with a USB port, bright enough for late-night study.", img: "images/products/table-lap.jpg", alt: "Navy adjustable desk lamp with a yellow joint and a round base" }, // Adds the product "LED Desk Lamp" to the catalogue.
        // A fourth round of products, again two for every category.
        // JavaScript statement/expression: { name: "Cleaning Essentials Bundle", category: "bundles", condition: "new", price: 349, desc: "Mop, bucket, c
        { name: "Cleaning Essentials Bundle", category: "bundles", condition: "new", price: 349, desc: "Mop, bucket, cloths, sponges and a spray bottle to keep a res room spotless.", img: IMG.bundle }, // Adds the product "Cleaning Essentials Bundle" to the catalogue.
        // JavaScript statement/expression: { name: "Second-Hand Kitchen Bundle", category: "bundles", condition: "used", price: 700, desc: "Reviewed pots
        { name: "Second-Hand Kitchen Bundle", category: "bundles", condition: "used", price: 700, desc: "Reviewed pots, pans, plates and cutlery from a graduating student.", img: IMG.used }, // Adds the product "Second-Hand Kitchen Bundle" to the catalogue.
        // JavaScript statement/expression: { name: "Clothes Rail with Shelf", category: "furniture", condition: "new", price: 449, desc: "Freestanding ra
        { name: "Clothes Rail with Shelf", category: "furniture", condition: "new", price: 449, desc: "Freestanding rail with a bottom shelf for shoes, ideal for small res rooms.", img: IMG.bundle }, // Adds the product "Clothes Rail with Shelf" to the catalogue.
        // JavaScript statement/expression: { name: "Second-Hand Study Table", category: "furniture", condition: "used", price: 380, desc: "Sturdy table f
        { name: "Second-Hand Study Table", category: "furniture", condition: "used", price: 380, desc: "Sturdy table from a graduating student, wiped down and checked by our team.", img: IMG.used }, // Adds the product "Second-Hand Study Table" to the catalogue.
        // JavaScript statement/expression: { name: "Toaster (2-Slice)", category: "appliances", condition: "new", price: 329, desc: "Two-slice toaster wi
        { name: "Toaster (2-Slice)", category: "appliances", condition: "new", price: 329, desc: "Two-slice toaster with a crumb tray and adjustable browning settings.", img: IMG.bundle }, // Adds the product "Toaster (2-Slice)" to the catalogue.
        // JavaScript statement/expression: { name: "Second-Hand Microwave Oven", category: "appliances", condition: "used", price: 650, desc: "Reviewed l
        { name: "Second-Hand Microwave Oven", category: "appliances", condition: "used", price: 650, desc: "Reviewed listing, tested at our collection point. Turntable included.", img: IMG.used }, // Adds the product "Second-Hand Microwave Oven" to the catalogue.
        // JavaScript statement/expression: { name: "Memory Foam Pillow", category: "bedding", condition: "new", price: 259, desc: "Supportive memory foam
        { name: "Memory Foam Pillow", category: "bedding", condition: "new", price: 259, desc: "Supportive memory foam pillow with a washable cover for better sleep.", img: IMG.bundle }, // Adds the product "Memory Foam Pillow" to the catalogue.
        // JavaScript statement/expression: { name: "Fitted Sheet Two-Pack", category: "bedding", condition: "new", price: 289, desc: "Two soft cotton-ble
        { name: "Fitted Sheet Two-Pack", category: "bedding", condition: "new", price: 289, desc: "Two soft cotton-blend fitted sheets for a standard single res bed.", img: IMG.bundle }, // Adds the product "Fitted Sheet Two-Pack" to the catalogue.
        // JavaScript statement/expression: { name: "Business Management Textbook Set", category: "textbooks", condition: "used", price: 430, desc: "Commo
        { name: "Business Management Textbook Set", category: "textbooks", condition: "used", price: 430, desc: "Common first-year business management titles, checked for missing pages and heavy highlighting.", img: IMG.used }, // Adds the product "Business Management Textbook Set" to the catalogue.
        // JavaScript statement/expression: { name: "Psychology Textbook Set", category: "textbooks", condition: "used", price: 410, desc: "Common first-y
        { name: "Psychology Textbook Set", category: "textbooks", condition: "used", price: 410, desc: "Common first-year psychology titles, checked by our team before listing.", img: IMG.used }, // Adds the product "Psychology Textbook Set" to the catalogue.
        // JavaScript statement/expression: { name: "Wireless Mouse and Mousepad", category: "stationery", condition: "new", price: 249, desc: "Quiet wire
        { name: "Wireless Mouse and Mousepad", category: "stationery", condition: "new", price: 249, desc: "Quiet wireless mouse with a mousepad, handy for laptop study at a desk.", img: IMG.bundle }, // Adds the product "Wireless Mouse and Mousepad" to the catalogue.
        // JavaScript statement/expression: { name: "Highlighter and Pen Pack", category: "stationery", condition: "new", price: 79, desc: "Twelve highlig
        { name: "Highlighter and Pen Pack", category: "stationery", condition: "new", price: 79, desc: "Twelve highlighters and pens in assorted colours for notes and revision.", img: "images/products/highlighters.jpg", alt: "Six coloured highlighters standing in a clear holder" } // Adds the product "Highlighter and Pen Pack" to the catalogue.
    // JavaScript statement/expression: ]; // Closes the current block, expression, or function call.
    ]; // Closes the current block, expression, or function call.

    // Product photos that exist. A product only uses its own photo when its file name is listed here.
    // To add a photo: save it in assets/images/products/, set that product's img and alt in the DEALS list, and add the file name here.
    // JavaScript statement/expression: var PHOTOS = ["bagpack.jpg", "bedding-duvets.jpg", "bundle-basic.jpg", "bundle-premium.jpg", "bundle-standard.
    var PHOTOS = ["bagpack.jpg", "bedding-duvets.jpg", "bundle-basic.jpg", "bundle-premium.jpg", "bundle-standard.jpg", "duvet.jpg", "essential-bundle.jpg", "highlighters.jpg", "kettle.jpg", "laptop-bag.jpg", "scientific-calculator.jpg", "stationery.jpg", "study-funiture.jpg", "table-chair.jpg", "table-fan.jpg", "table-lap.jpg", "textbook.jpg"]; // File names of the product photos that exist. Add a name here after saving a new photo in assets/images/products/.
    // JavaScript statement/expression: DEALS.forEach(function (d) { // Loops through every product.
    DEALS.forEach(function (d) { // Loops through every product.
        // JavaScript statement/expression: var file = d.img.split("/").pop(); // Gets the file name from the product's photo path.
        var file = d.img.split("/").pop(); // Gets the file name from the product's photo path.
        // JavaScript statement/expression: if (PHOTOS.indexOf(file) === -1) { d.img = d.condition === "used" ? IMG.used : IMG.bundle; } // Uses the gener
        if (PHOTOS.indexOf(file) === -1) { d.img = d.condition === "used" ? IMG.used : IMG.bundle; } // Uses the generic photo when the product photo has not been added yet.
    // JavaScript statement/expression: });
    });
    // JavaScript statement/expression: return { IMG: IMG, BASE: BASE, DEALS: DEALS };
    return { IMG: IMG, BASE: BASE, DEALS: DEALS };
// JavaScript statement/expression: })();
})();
