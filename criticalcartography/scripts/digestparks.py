def count_parks(filename):
    parks_by_state = {}
    current_state = None

    with open(filename, 'r') as file:
        for line in file:
            line = line.strip()
            if line:  # Non-empty line
                if line.isupper():  # Assume it's a state name
                    current_state = line
                    parks_by_state[current_state] = set()  # Using a set to avoid duplicates
                elif current_state:  # Count parks if a state has been identified
                    parks_by_state[current_state].add(line)

    # Convert sets to counts
    for state, parks in parks_by_state.items():
        parks_by_state[state] = len(parks)

    return parks_by_state

filename = 'scripts/lists.txt'  # Change this to your file name
parks_count = count_parks(filename)

for state, count in parks_count.items():
    print(f"path#{state} ", end='{\n')
    print(f"    fill: rgb({255-count}, {255-count}, {255-count}) !important;")
    print("}\n")

