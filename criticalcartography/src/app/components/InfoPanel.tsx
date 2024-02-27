
import React from "react";
import ParksScale from "./ParksScale";

interface InfoPanelProps {
  stateId: number;
}

const InfoPanel: React.FC<InfoPanelProps>  = ({ stateId }) => {

  // This is all in a random order because the SVG paths are in a random order.
  // This is the path order for each state in the map.
  const idToAbbr: { [key: number]: string } = {
    1: "MA",
    2: "MN",
    3: "MT",
    4: "ND",
    5: "HI",
    6: "ID",
    7: "WA",
    8: "AZ",
    9: "CA",
    10: "CO",
    11: "NV",
    12: "NM",
    13: "OR",
    14: "UT",
    15: "WY",
    16: "AR",
    17: "IA",
    18: "KS",
    19: "MO",
    20: "NE",
    21: "OK",
    22: "SD",
    23: "LA",
    24: "TX",
    25: "CT",
    26: "NH",
    27: "RI",
    28: "VT",
    29: "AL",
    30: "FL",
    31: "GA",
    32: "MS",
    33: "SC",
    34: "IL",
    35: "IN",
    36: "KY",
    37: "NC",
    38: "OH",
    39: "TN",
    40: "VA",
    41: "WI",
    42: "WV",
    43: "DE",
    44: "DC",
    45: "MD",
    46: "NJ",
    47: "NY",
    48: "PA",
    49: "ME",
    50: "MI",
    51: "AK"
  };
  
  const abbrToState: { [key: string]: string } = {
    "MA": "Massachusetts",
    "MN": "Minnesota",
    "MT": "Montana",
    "ND": "North Dakota",
    "HI": "Hawaii",
    "ID": "Idaho",
    "WA": "Washington",
    "AZ": "Arizona",
    "CA": "California",
    "CO": "Colorado",
    "NV": "Nevada",
    "NM": "New Mexico",
    "OR": "Oregon",
    "UT": "Utah",
    "WY": "Wyoming",
    "AR": "Arkansas",
    "IA": "Iowa",
    "KS": "Kansas",
    "MO": "Missouri",
    "NE": "Nebraska",
    "OK": "Oklahoma",
    "SD": "South Dakota",
    "LA": "Louisiana",
    "TX": "Texas",
    "CT": "Connecticut",
    "NH": "New Hampshire",
    "RI": "Rhode Island",
    "VT": "Vermont",
    "AL": "Alabama",
    "FL": "Florida",
    "GA": "Georgia",
    "MS": "Mississippi",
    "SC": "South Carolina",
    "IL": "Illinois",
    "IN": "Indiana",
    "KY": "Kentucky",
    "NC": "North Carolina",
    "OH": "Ohio",
    "TN": "Tennessee",
    "VA": "Virginia",
    "WI": "Wisconsin",
    "WV": "West Virginia",
    "DE": "Delaware",
    "DC": "District of Columbia",
    "MD": "Maryland",
    "NJ": "New Jersey",
    "NY": "New York",
    "PA": "Pennsylvania",
    "ME": "Maine",
    "MI": "Michigan",
    "AK": "Alaska"
  };

  const parksPerState: { [key: number]: number } = {
    1: 127,         /* MA */
    2: 82,          /* MN */
    3: 81,          /* MT */
    4: 30,          /* ND */
    5: 17,          /* HI */
    6: 56,          /* ID */
    7: 184,         /* WA */
    8: 60,          /* AZ */
    9: 239,         /* CA */
    10: 65,         /* CO */
    11: 48,         /* NV */
    12: 73,         /* NM */
    13: 169,        /* OR */
    14: 60,         /* UT */
    15: 29,         /* WY */
    16: 78,         /* AR */
    17: 91,         /* IA */
    18: 83,         /* KS */
    19: 83,         /* MO */
    20: 34,         /* NE */
    21: 70,         /* OK */
    22: 26,         /* SD */
    23: 49,         /* LA */
    24: 109,        /* TX */
    25: 97,         /* CT */
    26: 29,         /* NH */
    27: 17,         /* RI */
    28: 45,         /* VT */
    29: 56,         /* AL */
    30: 193,        /* FL */
    31: 96,         /* GA */
    32: 52,         /* MS */
    33: 65,         /* SC */
    34: 118,        /* IL */
    35: 69,         /* IN */
    36: 63,         /* KY */
    37: 63,         /* NC */
    38: 170,        /* OH */
    39: 66,         /* TN */
    40: 75,         /* VA */
    41: 76,         /* WI */
    42: 50,         /* WV */
    43: 28,         /* DE */
    44: 0,          /* DC */
    45: 64,         /* MD */
    46: 58,         /* NJ */
    47: 144,        /* NY */
    48: 162,        /* PA */
    49: 44,         /* ME */
    50: 105,        /* MI */
    51: 44,         /* AK */
  };

  return (
    <div className="w-full h-full text-center mt-20">
        <p>There are {parksPerState[stateId]} state parks in {abbrToState[idToAbbr[stateId]]}.</p>
        <ParksScale minParks={0} maxParks={255} currentParks={parksPerState[stateId]} />
    </div>
  );
};

export default InfoPanel;
