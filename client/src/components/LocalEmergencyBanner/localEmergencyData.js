const localEmergencyNumbers = [
  {
    "Country": "Algeria",
    "Police": 1548,
    "Ambulance": 14,
    "Fire": 14
  },
  {
    "Country": "Angola",
    "Police": 113,
    "Ambulance": "112/116",
    "Fire": 115
  },
  {
    "Country": "Ascension Island",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Benin",
    "Police": 117,
    "Ambulance": 112,
    "Fire": 118
  },
  {
    "Country": "Burundi",
    "Police": 117,
    "Ambulance": 112,
    "Fire": 118
  },
  {
    "Country": "Botswana",
    "Police": 999,
    "Ambulance": 997,
    "Fire": 998
  },
  {
    "Country": "Burkina Faso",
    "Police": 17,
    "Ambulance": 112,
    "Fire": 18
  },
  {
    "Country": "Cameroon",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Cape Verde",
    "Police": 132,
    "Ambulance": 130,
    "Fire": 131
  },
  {
    "Country": "Central African Republic",
    "Police": 117,
    "Ambulance": 1220,
    "Fire": 118
  },
  {
    "Country": "Chad",
    "Police": 17,
    "Ambulance": "2251-4242",
    "Fire": 18
  },
  {
    "Country": "Comoros",
    "Police": 17,
    "Ambulance": "772-03-73",
    "Fire": 18
  },
  {
    "Country": "Republic of Congo",
    "Police": 117,
    "Ambulance": "",
    "Fire": 118
  },
  {
    "Country": "Democratic Republic of Congo",
    "Police": 112,
    "Ambulance": "",
    "Fire": 118
  },
  {
    "Country": "Djibouti",
    "Police": 17,
    "Ambulance": 19,
    "Fire": 18
  },
  {
    "Country": "Egypt",
    "Police": 122,
    "Ambulance": 123,
    "Fire": 180
  },
  {
    "Country": "Equatorial Guinea",
    "Police": 114,
    "Ambulance": 115,
    "Fire": 112
  },
  {
    "Country": "Eritrea",
    "Police": 113,
    "Ambulance": 114,
    "Fire": 116
  },
  {
    "Country": "Ethiopia",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Gabon",
    "Police": 1730,
    "Ambulance": 1300,
    "Fire": 18
  },
  {
    "Country": "Gambia",
    "Police": 117,
    "Ambulance": 116,
    "Fire": 118
  },
  {
    "Country": "Ghana",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Guinea",
    "Police": 117,
    "Ambulance": 18,
    "Fire": "442-020"
  },
  {
    "Country": "Guinea-Bissau",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Ivory Coast",
    "Police": "110/111/170",
    "Ambulance": 185,
    "Fire": 180
  },
  {
    "Country": "Liberia",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Kenya",
    "Police": "112/999/911",
    "Ambulance": "112/999/911",
    "Fire": "112/999/911"
  },
  {
    "Country": "Libya",
    "Police": 1515,
    "Ambulance": 1515,
    "Fire": 1515
  },
  {
    "Country": "Lesotho",
    "Police": 123,
    "Ambulance": 121,
    "Fire": 122
  },
  {
    "Country": "Madagascar",
    "Police": 117,
    "Ambulance": 124,
    "Fire": 118
  },
  {
    "Country": "Malawi",
    "Police": 997,
    "Ambulance": 998,
    "Fire": 999
  },
  {
    "Country": "Mali",
    "Police": 17,
    "Ambulance": 15,
    "Fire": 18
  },
  {
    "Country": "Mauritius",
    "Police": 112,
    "Ambulance": 114,
    "Fire": 115
  },
  {
    "Country": "Mauritania",
    "Police": 117,
    "Ambulance": 101,
    "Fire": 118
  },
  {
    "Country": "Mayotte",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Morocco",
    "Police": 19,
    "Ambulance": 15,
    "Fire": 15
  },
  {
    "Country": "Mozambique",
    "Police": 119,
    "Ambulance": 117,
    "Fire": 198
  },
  {
    "Country": "Namibia",
    "Police": "10 111",
    "Ambulance": "",
    "Fire": ""
  },
  {
    "Country": "Nigeria",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Niger",
    "Police": 17,
    "Ambulance": 15,
    "Fire": 18
  },
  {
    "Country": "RÃ©union",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Rwanda",
    "Police": 112,
    "Ambulance": 912,
    "Fire": 112
  },
  {
    "Country": "Saint Helena",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Sao Tome and Principe",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Senegal",
    "Police": 17,
    "Ambulance": 18,
    "Fire": 1515
  },
  {
    "Country": "Seychelles",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "Sierra Leone",
    "Police": 19,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Somalia",
    "Police": 888,
    "Ambulance": 999,
    "Fire": 555
  },
  {
    "Country": "South Africa",
    "Police": "10 111",
    "Ambulance": "10 177",
    "Fire": "10 177"
  },
  {
    "Country": "Sudan",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "South Sudan",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Swaziland",
    "Police": 999,
    "Ambulance": 977,
    "Fire": 933
  },
  {
    "Country": "Tanzania",
    "Police": 112,
    "Ambulance": 114,
    "Fire": 115
  },
  {
    "Country": "Togo",
    "Police": 117,
    "Ambulance": 8200,
    "Fire": 118
  },
  {
    "Country": "Tristan da Cunha",
    "Police": 999,
    "Ambulance": 911,
    "Fire": 999
  },
  {
    "Country": "Tunisia",
    "Police": 197,
    "Ambulance": 198,
    "Fire": 190
  },
  {
    "Country": "Uganda",
    "Police": 112,
    "Ambulance": 911,
    "Fire": 112
  },
  {
    "Country": "Western Sahara",
    "Police": 150,
    "Ambulance": 150,
    "Fire": 150
  },
  {
    "Country": "Zambia",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Zimbabwe",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Antarctica",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Abkhazia",
    "Police": 102,
    "Ambulance": 103,
    "Fire": 101
  },
  {
    "Country": "Afghanistan",
    "Police": 119,
    "Ambulance": 112,
    "Fire": 119
  },
  {
    "Country": "Akrotiri and Dhekelia",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "Bahrain",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Bangladesh",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Bhutan",
    "Police": 113,
    "Ambulance": 112,
    "Fire": 110
  },
  {
    "Country": "British Indian Ocean Territory",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "Brunei",
    "Police": 993,
    "Ambulance": 991,
    "Fire": 995
  },
  {
    "Country": "Myanmar",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Cambodia",
    "Police": 117,
    "Ambulance": 119,
    "Fire": 118
  },
  {
    "Country": "People's Republic of China",
    "Police": 110,
    "Ambulance": 120,
    "Fire": 119
  },
  {
    "Country": "Christmas Island",
    "Police": 0,
    "Ambulance": 0,
    "Fire": 0
  },
  {
    "Country": "Cocos Islands",
    "Police": 0,
    "Ambulance": 0,
    "Fire": 0
  },
  {
    "Country": "East Timor",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Hong Kong - China",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "India",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Indonesia",
    "Police": 110,
    "Ambulance": "118/119",
    "Fire": 112
  },
  {
    "Country": "Iran",
    "Police": 110,
    "Ambulance": 115,
    "Fire": 125
  },
  {
    "Country": "Iraq",
    "Police": "112/911",
    "Ambulance": "112/911",
    "Fire": "112/911"
  },
  {
    "Country": "Israel",
    "Police": 100,
    "Ambulance": 101,
    "Fire": 102
  },
  {
    "Country": "Japan",
    "Police": 110,
    "Ambulance": 119,
    "Fire": 119
  },
  {
    "Country": "Jordan",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Kazakhstan",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Kyrgyzstan",
    "Police": 102,
    "Ambulance": 103,
    "Fire": 101
  },
  {
    "Country": "Democratic People's Republic of Korea",
    "Police": 110,
    "Ambulance": 119,
    "Fire": 119
  },
  {
    "Country": "Republic of Korea",
    "Police": 112,
    "Ambulance": 119,
    "Fire": 119
  },
  {
    "Country": "Kuwait",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Laos",
    "Police": 191,
    "Ambulance": 195,
    "Fire": 190
  },
  {
    "Country": "Lebanon",
    "Police": "999/112",
    "Ambulance": 140,
    "Fire": 175
  },
  {
    "Country": "Macau",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Maldives",
    "Police": 119,
    "Ambulance": 102,
    "Fire": 118
  },
  {
    "Country": "Malaysia",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 994
  },
  {
    "Country": "Mongolia",
    "Police": 105,
    "Ambulance": 105,
    "Fire": 105
  },
  {
    "Country": "Nepal",
    "Police": 100,
    "Ambulance": 102,
    "Fire": 101
  },
  {
    "Country": "Oman",
    "Police": 9999,
    "Ambulance": 9999,
    "Fire": 9999
  },
  {
    "Country": "Pakistan",
    "Police": 15,
    "Ambulance": "115/1122",
    "Fire": 16
  },
  {
    "Country": "Philippines",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Qatar",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Saudi Arabia",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Singapore",
    "Police": 999,
    "Ambulance": 995,
    "Fire": 995
  },
  {
    "Country": "Sri Lanka",
    "Police": 119,
    "Ambulance": 110,
    "Fire": 110
  },
  {
    "Country": "Syria",
    "Police": 112,
    "Ambulance": 110,
    "Fire": 113
  },
  {
    "Country": "Republic of China (Taiwan)",
    "Police": 110,
    "Ambulance": 119,
    "Fire": 119
  },
  {
    "Country": "Tajikistan",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Thailand",
    "Police": "191/911",
    "Ambulance": 1669,
    "Fire": 199
  },
  {
    "Country": "Turkmenistan",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "United Arab Emirates",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Uzbekistan",
    "Police": 102,
    "Ambulance": 101,
    "Fire": 103
  },
  {
    "Country": "Vietnam",
    "Police": 113,
    "Ambulance": 115,
    "Fire": 114
  },
  {
    "Country": "Yemen",
    "Police": 194,
    "Ambulance": 191,
    "Fire": 191
  },
  {
    "Country": "Ã…land Islands",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Albania",
    "Police": 129,
    "Ambulance": 127,
    "Fire": 128
  },
  {
    "Country": "Andorra",
    "Police": 110,
    "Ambulance": 116,
    "Fire": 118
  },
  {
    "Country": "Armenia",
    "Police": "112/911",
    "Ambulance": "112/911",
    "Fire": "112/911"
  },
  {
    "Country": "Austria",
    "Police": "112/133",
    "Ambulance": 144,
    "Fire": 122
  },
  {
    "Country": "Azerbaijan",
    "Police": 102,
    "Ambulance": 103,
    "Fire": 101
  },
  {
    "Country": "Belarus",
    "Police": 102,
    "Ambulance": 103,
    "Fire": 101
  },
  {
    "Country": "Belgium",
    "Police": 101,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Bosnia and Herzegovina",
    "Police": 122,
    "Ambulance": 124,
    "Fire": 123
  },
  {
    "Country": "Bulgaria",
    "Police": "112/166",
    "Ambulance": "112/150",
    "Fire": "112/160"
  },
  {
    "Country": "Croatia",
    "Police": 192,
    "Ambulance": 194,
    "Fire": 193
  },
  {
    "Country": "Cyprus",
    "Police": "112/199",
    "Ambulance": "112/199",
    "Fire": "112/199"
  },
  {
    "Country": "Czech Republic",
    "Police": 158,
    "Ambulance": 155,
    "Fire": 150
  },
  {
    "Country": "Denmark",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Estonia",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Faroe Islands",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Finland",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "France",
    "Police": 17,
    "Ambulance": 15,
    "Fire": 18
  },
  {
    "Country": "Georgia",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Germany",
    "Police": 110,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Gibraltar",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "Greece",
    "Police": 100,
    "Ambulance": 166,
    "Fire": 199
  },
  {
    "Country": "Greenland",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Guernsey",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "Hungary",
    "Police": 107,
    "Ambulance": 104,
    "Fire": 105
  },
  {
    "Country": "Iceland",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Ireland",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "Isle of Man",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "Italy",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Jersey",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "Kosovo",
    "Police": 192,
    "Ambulance": 194,
    "Fire": 193
  },
  {
    "Country": "Latvia",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Lithuania",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Liechtenstein",
    "Police": 117,
    "Ambulance": 144,
    "Fire": 118
  },
  {
    "Country": "Luxembourg",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Republic of North Macedonia",
    "Police": 192,
    "Ambulance": 194,
    "Fire": 193
  },
  {
    "Country": "Malta",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Moldova",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Monaco",
    "Police": 17,
    "Ambulance": 15,
    "Fire": 18
  },
  {
    "Country": "Montenegro",
    "Police": 122,
    "Ambulance": 124,
    "Fire": 123
  },
  {
    "Country": "Netherlands",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Northern Cyprus",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Norway",
    "Police": 112,
    "Ambulance": 113,
    "Fire": 110
  },
  {
    "Country": "Poland",
    "Police": 997,
    "Ambulance": 999,
    "Fire": 998
  },
  {
    "Country": "Portugal",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Romania",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Russia",
    "Police": 102,
    "Ambulance": 103,
    "Fire": 101
  },
  {
    "Country": "San Marino",
    "Police": 113,
    "Ambulance": 118,
    "Fire": 115
  },
  {
    "Country": "Serbia",
    "Police": "192/112",
    "Ambulance": 194,
    "Fire": 193
  },
  {
    "Country": "Slovakia",
    "Police": 158,
    "Ambulance": 155,
    "Fire": 150
  },
  {
    "Country": "Slovenia",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Spain",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Sweden",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Switzerland",
    "Police": 117,
    "Ambulance": 144,
    "Fire": 118
  },
  {
    "Country": "Transnistria",
    "Police": 102,
    "Ambulance": 103,
    "Fire": 101
  },
  {
    "Country": "Turkey",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Ukraine",
    "Police": 102,
    "Ambulance": 103,
    "Fire": 101
  },
  {
    "Country": "United Kingdom",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "Vatican City",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "American Samoa",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Australia",
    "Police": 0,
    "Ambulance": 0,
    "Fire": 0
  },
  {
    "Country": "Cook Islands",
    "Police": 999,
    "Ambulance": 998,
    "Fire": 996
  },
  {
    "Country": "Fiji",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "French Polynesia",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Guam",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Kiribati",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Marshall Islands",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Micronesia",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Nauru",
    "Police": 110,
    "Ambulance": 111,
    "Fire": 112
  },
  {
    "Country": "New Caledonia",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "New Zealand",
    "Police": 111,
    "Ambulance": 111,
    "Fire": 111
  },
  {
    "Country": "Palau",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Papua New Guinea",
    "Police": 112,
    "Ambulance": 111,
    "Fire": 110
  },
  {
    "Country": "Samoa",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Solomon Islands",
    "Police": "911/999",
    "Ambulance": "911/999",
    "Fire": "911/999"
  },
  {
    "Country": "Tonga",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Tuvalu",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Vanuatu",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Belize",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Clipperton Island",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Costa Rica",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Guatemala",
    "Police": 110,
    "Ambulance": 128,
    "Fire": 122
  },
  {
    "Country": "El Salvador",
    "Police": 911,
    "Ambulance": 132,
    "Fire": 913
  },
  {
    "Country": "Honduras",
    "Police": 911,
    "Ambulance": 195,
    "Fire": 198
  },
  {
    "Country": "Nicaragua",
    "Police": 118,
    "Ambulance": 128,
    "Fire": 115
  },
  {
    "Country": "Panama",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Antigua and Barbuda",
    "Police": "911/999",
    "Ambulance": "911/999",
    "Fire": "911/999"
  },
  {
    "Country": "Anguilla",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Aruba",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "The Bahamas",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 919
  },
  {
    "Country": "British Virgin Islands",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 999
  },
  {
    "Country": "Cayman Islands",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Cuba",
    "Police": 106,
    "Ambulance": 104,
    "Fire": 105
  },
  {
    "Country": "Curacao",
    "Police": 911,
    "Ambulance": 912,
    "Fire": 911
  },
  {
    "Country": "Dominica",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Grenada",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Guadeloupe",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Martinique",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Montserrat",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 999
  },
  {
    "Country": "Navassa Island",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Saint Kitts and Nevis",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Saint Lucia",
    "Police": 911,
    "Ambulance": 999,
    "Fire": 911
  },
  {
    "Country": "Saint Vincent and the Grenadines",
    "Police": 911,
    "Ambulance": 999,
    "Fire": 911
  },
  {
    "Country": "United States Virgin Islands",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Barbados",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Bonaire",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Dominican Republic",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Haiti",
    "Police": 114,
    "Ambulance": 116,
    "Fire": 115
  },
  {
    "Country": "Puerto Rico",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Trinidad and Tobago",
    "Police": 999,
    "Ambulance": 811,
    "Fire": 990
  },
  {
    "Country": "Jamaica",
    "Police": 119,
    "Ambulance": 110,
    "Fire": 110
  },
  {
    "Country": "Bermuda",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Canada",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Mexico",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Saint Pierre and Miquelon",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "United States of America",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Argentina",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Bolivia",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Brazil",
    "Police": 190,
    "Ambulance": 192,
    "Fire": 193
  },
  {
    "Country": "Chile",
    "Police": 133,
    "Ambulance": 131,
    "Fire": 132
  },
  {
    "Country": "Colombia",
    "Police": 123,
    "Ambulance": 123,
    "Fire": 123
  },
  {
    "Country": "Ecuador",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Falkland Islands",
    "Police": "112/999",
    "Ambulance": "112/999",
    "Fire": "112/999"
  },
  {
    "Country": "French Guiana",
    "Police": 112,
    "Ambulance": 112,
    "Fire": 112
  },
  {
    "Country": "Guyana",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Paraguay",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Peru",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "South Georgia and the South Sandwich\n  Islands",
    "Police": 999,
    "Ambulance": 999,
    "Fire": 999
  },
  {
    "Country": "Suriname",
    "Police": 115,
    "Ambulance": 115,
    "Fire": 115
  },
  {
    "Country": "Uruguay",
    "Police": 911,
    "Ambulance": 911,
    "Fire": 911
  },
  {
    "Country": "Venezuela",
    "Police": "911/171",
    "Ambulance": "911/171",
    "Fire": "911/171"
  }
]

export default localEmergencyNumbers;