# Read from file
id = 1

states = {"AL": 56,
          "AK": 44,
          "AZ": 60,
          "AR": 78,
          "CA": 239,
          "CO": 65,
          "CT": 97,
          "DE": 28,
          "FL": 193,
          "GA": 96,
          "HI": 17,
          "ID": 56,
          "IL": 118,
          "IN": 69,
          "IA": 91,
          "KS": 83,
          "KY": 63,
          "LA": 49,
          "ME": 44,
          "MD": 64,
          "MA": 127,
          "MI": 105,
          "MN": 82,
          "MS": 52,
          "MO": 83,
          "MT": 81,
          "NE": 34,
          "NV": 48,
          "NH": 29,
          "NJ": 58,
          "NM": 73,
          "NY": 144,
          "NC": 63,
          "ND": 30,
          "OH": 170,
          "OK": 70,
          "OR": 169,
          "PA": 162,
          "RI": 17,
          "SC": 65,
          "SD": 26,
          "TN": 66,
          "TX": 109,
          "UT": 60,
          "VT": 45,
          "VA": 75,
          "WA": 184,
          "WV": 50,
          "WI": 76,
          "WY": 29,
          "DC": 0}

with open('page/src/app/components/CustomMap.tsx', 'r') as file:
    lines = file.readlines()

    for line in lines:
        if '          id="' in line and 'us-map' not in line:
            print(f'{id}: {states[line.strip()[4:-1]]},', '          /*', line.strip()[4:-1], '*/')
            id += 1
