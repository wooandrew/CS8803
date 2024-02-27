import requests
from bs4 import BeautifulSoup

def get_state_parks(state_code):
    url = f"https://stateparks.com/{state_code}.html"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        park_names = []
        park_link_divs = soup.find_all('div', id='parklink')
        for div in park_link_divs:
            park_links = div.find_all('a')
            park_names.extend(link.text.strip() for link in park_links)
        return park_names
    else:
        print(f"Failed to retrieve data for {state_code}")

def get_all_state_parks():
    all_state_parks = {}
    for state_code in state_codes.values():
        parks = get_state_parks(state_code)
        if parks:
            all_state_parks[state_code] = parks
    return all_state_parks

# Dictionary mapping full state names to their corresponding two-letter state codes
state_codes = {
    'alabama': 'al', 'alaska': 'ak', 'arizona': 'az', 'arkansas': 'ar', 'california': 'ca',
    'colorado': 'co', 'connecticut': 'ct', 'delaware': 'de', 'florida': 'fl', 'georgia': 'ga',
    'hawaii': 'hi', 'idaho': 'id', 'illinois': 'il', 'indiana': 'in', 'iowa': 'ia',
    'kansas': 'ks', 'kentucky': 'ky', 'louisiana': 'la', 'maine': 'me', 'maryland': 'md',
    'massachusetts': 'ma', 'michigan': 'mi', 'minnesota': 'mn', 'mississippi': 'ms',
    'missouri': 'mo', 'montana': 'mt', 'nebraska': 'ne', 'nevada': 'nv', 'new-hampshire': 'nh',
    'new-jersey': 'nj', 'new-mexico': 'nm', 'new-york': 'ny', 'north-carolina': 'nc',
    'north-dakota': 'nd', 'ohio': 'oh', 'oklahoma': 'ok', 'oregon': 'or', 'pennsylvania': 'pa',
    'rhode-island': 'ri', 'south-carolina': 'sc', 'south-dakota': 'sd', 'tennessee': 'tn',
    'texas': 'tx', 'utah': 'ut', 'vermont': 'vt', 'virginia': 'va', 'washington': 'wa',
    'west-virginia': 'wv', 'wisconsin': 'wi', 'wyoming': 'wy'
}

# Fetch state parks for all states
all_state_parks = get_all_state_parks()

# Print the result
for state_code, parks in all_state_parks.items():
    print(f"State parks in {state_code.upper()}:")
    for park in parks:
        print(park)
    print()  # Add a newline for readability
