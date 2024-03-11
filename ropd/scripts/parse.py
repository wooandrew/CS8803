
from datetime import datetime
import random
import time

random.seed(time.time())

# Open sleep stages file
ss_file_path = 'com.samsung.health.sleep_stage.20240309140733.csv'

# Create dictionary to store dates
dict_dates = {}

chord_progression_map = {'deep': 'Gdom7', 'light': 'Dmin7', 'rem': 'Amin7', 'awake': 'Cmaj7'}
chord_progression_alt_map = {'deep': 'Gdom7', 'light': 'Fmaj7', 'rem': 'Emin7', 'awake': 'Cmaj7'}
chord_progressions = {}

with open(ss_file_path, 'r') as ss_file:
    
    # Read line by line
    for line in ss_file:
            
        # Split line by comma
        line = line.split(',')

        # Print line
        try:
            # Check if date year is 2024
            if line[1].split('-')[0] == '2024':

                date = line[1].split()[0]

                # Check if date is in dictionary
                if date not in dict_dates:
                    dict_dates[date] = []

                stage = line[7]
                if stage == '40001':
                    stage = 'awake'
                elif stage == '40002':
                    stage = 'light'
                elif stage == '40003':
                    stage = 'deep'
                elif stage == '40004':
                    stage = 'rem'
                else:
                    stage = 'unknown'

                # Convert string to datetime
                start_time = datetime.strptime(line[1], '%Y-%m-%d %H:%M:%S.%f')
                end_time = datetime.strptime(line[11], '%Y-%m-%d %H:%M:%S.%f')

                length = end_time - start_time
                dict_dates[date].append((stage, length))
                # chord_progressions.append(chord_progression_map[stage])

        except Exception as e:
            print(e)

    # Print dictionary
    for date in dict_dates:

        if date not in chord_progressions:
            chord_progressions[date] = []

        for stage, length in dict_dates[date]:
            if random.random() > 0.5:
                chord_progressions[date].append((chord_progression_map[stage], int(length.total_seconds() / 60)))
            else:
                chord_progressions[date].append((chord_progression_alt_map[stage], int(length.total_seconds() / 60)))

    print(chord_progressions)
