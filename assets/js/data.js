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
  "code": "EC",
  "name": "Eastern Cape",
  "leadDays": 3,
  "hubs": [
   {
    "city": "Gqeberha",
    "address": "Summerstrand collection desk",
    "hours": "Mon-Fri 09:00-17:00"
   }
  ],
  "institutions": [
   {
    "name": "University of Fort Hare",
    "type": "University",
    "city": "Alice"
   },
   {
    "name": "Rhodes University",
    "type": "University",
    "city": "Makhanda"
   },
   {
    "name": "Nelson Mandela University",
    "type": "University",
    "city": "Gqeberha"
   },
   {
    "name": "Walter Sisulu University",
    "type": "University",
    "city": "Mthatha"
   },
   {
    "name": "Buffalo City TVET College",
    "type": "TVET college",
    "city": "East London"
   },
   {
    "name": "Eastcape Midlands TVET College",
    "type": "TVET college",
    "city": ""
   },
   {
    "name": "Ikhala TVET College",
    "type": "TVET college",
    "city": "Komani"
   },
   {
    "name": "Ingwe TVET College",
    "type": "TVET college",
    "city": ""
   },
   {
    "name": "King Hintsa TVET College",
    "type": "TVET college",
    "city": ""
   },
   {
    "name": "King Sabata Dalindyebo TVET College",
    "type": "TVET college",
    "city": "Mthatha"
   },
   {
    "name": "Lovedale TVET College",
    "type": "TVET college",
    "city": "Alice"
   },
   {
    "name": "Port Elizabeth TVET College",
    "type": "TVET college",
    "city": "Gqeberha"
   },
   {
    "name": "Ed-U City Campus",
    "type": "Private institution",
    "city": "Gqeberha"
   },
   {
    "name": "Stenden South Africa",
    "type": "Private institution",
    "city": "Port Alfred"
   }
  ]
 },
 {
  "code": "FS",
  "name": "Free State",
  "leadDays": 2,
  "hubs": [
   {
    "city": "Bloemfontein",
    "address": "Brandwag collection desk",
    "hours": "Mon-Fri 09:00-17:00"
   }
  ],
  "institutions": [
   {
    "name": "University of the Free State",
    "type": "University",
    "city": "Bloemfontein"
   },
   {
    "name": "Central University of Technology",
    "type": "University",
    "city": "Bloemfontein"
   },
   {
    "name": "Flavius Mareka TVET College",
    "type": "TVET college",
    "city": "Sasolburg"
   },
   {
    "name": "Goldfields TVET College",
    "type": "TVET college",
    "city": "Welkom"
   },
   {
    "name": "Maluti TVET College",
    "type": "TVET college",
    "city": "Phuthaditjhaba"
   },
   {
    "name": "Motheo TVET College",
    "type": "TVET college",
    "city": "Bloemfontein"
   },
   {
    "name": "Qualitas Career Academy",
    "type": "Private institution",
    "city": "Bloemfontein"
   }
  ]
 },
 {
  "code": "GP",
  "name": "Gauteng",
  "leadDays": 1,
  "hubs": [
   {
    "city": "Johannesburg",
    "address": "7 Jorissen Street, Braamfontein, 2001",
    "hours": "Mon-Sat 10:00-16:00"
   },
   {
    "city": "Pretoria",
    "address": "128 Lynnwood Road, Hatfield, 0083 (head office)",
    "hours": "Mon-Fri 09:00-17:00"
   }
  ],
  "institutions": [
   {
    "name": "University of the Witwatersrand",
    "type": "University",
    "city": "Johannesburg"
   },
   {
    "name": "University of Johannesburg",
    "type": "University",
    "city": "Johannesburg"
   },
   {
    "name": "University of Pretoria",
    "type": "University",
    "city": "Pretoria"
   },
   {
    "name": "University of South Africa (Unisa)",
    "type": "University",
    "city": "Pretoria"
   },
   {
    "name": "Tshwane University of Technology",
    "type": "University",
    "city": "Pretoria"
   },
   {
    "name": "Vaal University of Technology",
    "type": "University",
    "city": "Vanderbijlpark"
   },
   {
    "name": "Sefako Makgatho Health Sciences University",
    "type": "University",
    "city": "Ga-Rankuwa"
   },
   {
    "name": "Central Johannesburg TVET College",
    "type": "TVET college",
    "city": "Johannesburg"
   },
   {
    "name": "Ekurhuleni East TVET College",
    "type": "TVET college",
    "city": "Springs"
   },
   {
    "name": "Ekurhuleni West TVET College",
    "type": "TVET college",
    "city": "Germiston"
   },
   {
    "name": "Sedibeng TVET College",
    "type": "TVET college",
    "city": "Vereeniging"
   },
   {
    "name": "South West Gauteng TVET College",
    "type": "TVET college",
    "city": "Soweto"
   },
   {
    "name": "Tshwane North TVET College",
    "type": "TVET college",
    "city": "Pretoria"
   },
   {
    "name": "Tshwane South TVET College",
    "type": "TVET college",
    "city": "Pretoria"
   },
   {
    "name": "Western TVET College",
    "type": "TVET college",
    "city": "Randfontein"
   },
   {
    "name": "AAA School of Advertising",
    "type": "Private institution",
    "city": "Johannesburg"
   },
   {
    "name": "Academy for Facilities Management",
    "type": "Private institution",
    "city": ""
   },
   {
    "name": "Academy of Sound Engineering",
    "type": "Private institution",
    "city": "Johannesburg"
   },
   {
    "name": "AFDA",
    "type": "Private institution",
    "city": "Johannesburg"
   },
   {
    "name": "Belgium Campus ITversity",
    "type": "Private institution",
    "city": ""
   },
   {
    "name": "Boston Media House",
    "type": "Private institution",
    "city": "Johannesburg"
   },
   {
    "name": "Da Vinci Institute",
    "type": "Private institution",
    "city": "Modderfontein"
   },
   {
    "name": "Empilweni Education",
    "type": "Private institution",
    "city": ""
   },
   {
    "name": "Foundation for Professional Development",
    "type": "Private institution",
    "city": ""
   },
   {
    "name": "Greenside Design Center College of Design",
    "type": "Private institution",
    "city": "Johannesburg"
   },
   {
    "name": "Health and Fitness Professionals Academy",
    "type": "Private institution",
    "city": ""
   },
   {
    "name": "Henley Business School South Africa",
    "type": "Private institution",
    "city": "Johannesburg"
   },
   {
    "name": "NOSA College",
    "type": "Private institution",
    "city": ""
   }
  ]
 },
 {
  "code": "KZN",
  "name": "KwaZulu-Natal",
  "leadDays": 2,
  "hubs": [
   {
    "city": "Durban",
    "address": "Shop 12, University Drive, Westville, 3629 (lockers)",
    "hours": "Lockers daily 08:00-20:00"
   }
  ],
  "institutions": [
   {
    "name": "University of KwaZulu-Natal",
    "type": "University",
    "city": "Durban"
   },
   {
    "name": "Durban University of Technology",
    "type": "University",
    "city": "Durban"
   },
   {
    "name": "Mangosuthu University of Technology",
    "type": "University",
    "city": "Durban"
   },
   {
    "name": "University of Zululand",
    "type": "University",
    "city": "KwaDlangezwa"
   },
   {
    "name": "Coastal TVET College",
    "type": "TVET college",
    "city": "Durban"
   },
   {
    "name": "Elangeni TVET College",
    "type": "TVET college",
    "city": "Pinetown"
   },
   {
    "name": "Esayidi TVET College",
    "type": "TVET college",
    "city": "Port Shepstone"
   },
   {
    "name": "Majuba TVET College",
    "type": "TVET college",
    "city": "Newcastle"
   },
   {
    "name": "Mnambithi TVET College",
    "type": "TVET college",
    "city": "Ladysmith"
   },
   {
    "name": "Mthashana TVET College",
    "type": "TVET college",
    "city": ""
   },
   {
    "name": "Thekwini TVET College",
    "type": "TVET college",
    "city": "Durban"
   },
   {
    "name": "Umfolozi TVET College",
    "type": "TVET college",
    "city": "Richards Bay"
   },
   {
    "name": "Umgungundlovu TVET College",
    "type": "TVET college",
    "city": "Pietermaritzburg"
   },
   {
    "name": "Berea College of Technology",
    "type": "Private institution",
    "city": "Durban"
   },
   {
    "name": "Commerce and Computer College of South Africa",
    "type": "Private institution",
    "city": "Pietermaritzburg"
   },
   {
    "name": "ICESA Education",
    "type": "Private institution",
    "city": "Durban"
   }
  ]
 },
 {
  "code": "LP",
  "name": "Limpopo",
  "leadDays": 3,
  "hubs": [
   {
    "city": "Polokwane",
    "address": "Polokwane CBD collection desk",
    "hours": "Mon-Fri 09:00-17:00"
   }
  ],
  "institutions": [
   {
    "name": "University of Limpopo",
    "type": "University",
    "city": "Mankweng"
   },
   {
    "name": "University of Venda",
    "type": "University",
    "city": "Thohoyandou"
   },
   {
    "name": "Capricorn TVET College",
    "type": "TVET college",
    "city": "Polokwane"
   },
   {
    "name": "Lephalale TVET College",
    "type": "TVET college",
    "city": "Lephalale"
   },
   {
    "name": "Letaba TVET College",
    "type": "TVET college",
    "city": "Tzaneen"
   },
   {
    "name": "Mopani South East TVET College",
    "type": "TVET college",
    "city": "Phalaborwa"
   },
   {
    "name": "Sekhukhune TVET College",
    "type": "TVET college",
    "city": "Groblersdal"
   },
   {
    "name": "Vhembe TVET College",
    "type": "TVET college",
    "city": "Thohoyandou"
   },
   {
    "name": "Waterberg TVET College",
    "type": "TVET college",
    "city": ""
   },
   {
    "name": "Southern African Wildlife College",
    "type": "Private institution",
    "city": "Hoedspruit"
   }
  ]
 },
 {
  "code": "MP",
  "name": "Mpumalanga",
  "leadDays": 3,
  "hubs": [
   {
    "city": "Mbombela",
    "address": "Mbombela CBD collection desk",
    "hours": "Mon-Fri 09:00-17:00"
   }
  ],
  "institutions": [
   {
    "name": "University of Mpumalanga",
    "type": "University",
    "city": "Mbombela"
   },
   {
    "name": "Ehlanzeni TVET College",
    "type": "TVET college",
    "city": "Mbombela"
   },
   {
    "name": "Gert Sibande TVET College",
    "type": "TVET college",
    "city": "Standerton"
   },
   {
    "name": "Nkangala TVET College",
    "type": "TVET college",
    "city": "eMalahleni"
   },
   {
    "name": "MSC Business College",
    "type": "Private institution",
    "city": "Mbombela"
   },
   {
    "name": "Unigrad College",
    "type": "Private institution",
    "city": "Mbombela"
   }
  ]
 },
 {
  "code": "NC",
  "name": "Northern Cape",
  "leadDays": 4,
  "hubs": [
   {
    "city": "Kimberley",
    "address": "Kimberley CBD collection desk",
    "hours": "Mon-Fri 09:00-17:00"
   }
  ],
  "institutions": [
   {
    "name": "Sol Plaatje University",
    "type": "University",
    "city": "Kimberley"
   },
   {
    "name": "Northern Cape Rural TVET College",
    "type": "TVET college",
    "city": "Upington"
   },
   {
    "name": "Northern Cape Urban TVET College",
    "type": "TVET college",
    "city": "Kimberley"
   },
   {
    "name": "ATTI Kimberley",
    "type": "Private institution",
    "city": "Kimberley"
   },
   {
    "name": "Qualitas Career Academy",
    "type": "Private institution",
    "city": "Kimberley"
   }
  ]
 },
 {
  "code": "NW",
  "name": "North West",
  "leadDays": 2,
  "hubs": [
   {
    "city": "Potchefstroom",
    "address": "Potchefstroom town centre collection desk",
    "hours": "Mon-Fri 09:00-17:00"
   }
  ],
  "institutions": [
   {
    "name": "North-West University",
    "type": "University",
    "city": "Potchefstroom"
   },
   {
    "name": "Orbit TVET College",
    "type": "TVET college",
    "city": ""
   },
   {
    "name": "Taletso TVET College",
    "type": "TVET college",
    "city": "Mahikeng"
   },
   {
    "name": "Vuselela TVET College",
    "type": "TVET college",
    "city": "Klerksdorp"
   },
   {
    "name": "Normansville College",
    "type": "Private institution",
    "city": "Rustenburg"
   },
   {
    "name": "Potchefstroom Academy and SAAHST",
    "type": "Private institution",
    "city": "Potchefstroom"
   }
  ]
 },
 {
  "code": "WC",
  "name": "Western Cape",
  "leadDays": 2,
  "hubs": [
   {
    "city": "Cape Town",
    "address": "45 Main Road, Rondebosch, 7700",
    "hours": "Tue-Sat 10:00-15:00"
   }
  ],
  "institutions": [
   {
    "name": "University of Cape Town",
    "type": "University",
    "city": "Cape Town"
   },
   {
    "name": "Stellenbosch University",
    "type": "University",
    "city": "Stellenbosch"
   },
   {
    "name": "University of the Western Cape",
    "type": "University",
    "city": "Bellville"
   },
   {
    "name": "Cape Peninsula University of Technology",
    "type": "University",
    "city": "Cape Town"
   },
   {
    "name": "Boland TVET College",
    "type": "TVET college",
    "city": "Stellenbosch"
   },
   {
    "name": "College of Cape Town for TVET",
    "type": "TVET college",
    "city": "Cape Town"
   },
   {
    "name": "False Bay TVET College",
    "type": "TVET college",
    "city": "Muizenberg"
   },
   {
    "name": "Northlink TVET College",
    "type": "TVET college",
    "city": "Bellville"
   },
   {
    "name": "South Cape TVET College",
    "type": "TVET college",
    "city": "George"
   },
   {
    "name": "West Coast TVET College",
    "type": "TVET college",
    "city": ""
   },
   {
    "name": "ACT Cape Town",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "BHC School of Design",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "Cape Audio College",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "Cape Town College of Fashion Design",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "Cornerstone Institute",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "Friends of Design Academy of Digital Arts",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "George Whitefield College",
    "type": "Private institution",
    "city": "Muizenberg"
   },
   {
    "name": "Helderberg College of Higher Education",
    "type": "Private institution",
    "city": "Somerset West"
   },
   {
    "name": "Inscape Education Group",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "International Hotel School",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "Isa Carstens Academy",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "Red & Yellow Creative School of Business",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "The Animation School",
    "type": "Private institution",
    "city": "Cape Town"
   },
   {
    "name": "TSIBA Education",
    "type": "Private institution",
    "city": "Cape Town"
   }
  ]
 }
];

// Private providers with campuses or distance study in every province. They use the province lead time.
const NATIONAL_PRIVATE = [
 "The IIE (Varsity College, Rosebank College, Vega, Design School Southern Africa)",
 "STADIO (including Embury Institute for Teacher Education)",
 "Eduvos",
 "Boston City Campus",
 "MANCOSA",
 "Regent Business School",
 "Richfield Graduate Institute of Technology",
 "CTU Training Solutions",
 "Regenesys",
 "NewBridge Graduate Institute",
 "SAE Institute",
 "Netcare Education (nursing and health)",
 "Central Technical College",
 "Open Learning Group",
 "Oxbridge Academy (distance)",
 "Intec College (distance)",
 "Lyceum College (distance)",
 "Optimi College (distance)",
 "Trifocus Fitness Academy (distance)",
 "Chefs Training and Innovation Academy"
];
