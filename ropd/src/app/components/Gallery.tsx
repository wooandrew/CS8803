
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';
import Code from './Code';

const Gallery = () => {

  return (
    <div className='flex flex-row justify-between w-full'>
      <div className='grid grid-cols-2 gap-4 text-center overflow'>
        <TextPanel 
          heading='Step 1: Collect Data.' 
          text={[
              'The first step of my process was of course to collect data. I knew from the get-go that I wanted to track my sleep, as I had been struggling to get good rest for the past few months. I decided I would track my sleep using a Samsung Galaxy Watch4. This was a strategic decision, as I did not know yet what kind of sleep  data I waned to  collect, and the watch has a variety of sensors that could be used to track different aspects of my sleep. As such, I decided to collect as many different categories of data while sleeping and decided at a later date which one I would eventually use.'
          ]}
        />
        <ImagePanel sources={['/ropd/watch.jpg', '/ropd/watchface.png']} caption='Figure 1. Samsung Galaxy Watch4' />
        <ImagePanel sources={['/ropd/samsunghealthsleep.png']} caption='Figure 2. Screenshots of Samsung Health App' />
        <TextPanel
          heading=''
          text={[
            'The Samsung Galaxy Watch4 collects a variety of different data while sleeping. For example, it keeps track of the length of sleep, which sleep stage you are in at any given time, your blood oxygen levels, and even detects and tracks snoring. The Samsung Health App takes all of this data and arranges them in visual graphs for the user. These visualizations served as heavy inspiration for my project.',
            'I collected data for about two weeks, and then decided to use the sleep stage data for my project.'
          ]}
          right={true}
        />
        <TextPanel
          heading='Step 2: The Plan.'
          text={[
            'The plan (at least in the beginning) was to create a circular visualization around a clock. The Samsung Health app creates an interesting visualization with sleep stages: it is a sleep stage vs time graph, and because people move between the four different sleep stages multiple times a night, it creates a jagged graph.',
            'I wanted to make a visualization where the sleep stage graph is somehow wrapped around a clock so I could see how my sleep stages change over time. I also wanted to add a feature where I could see my average sleep stage graph.',
            "I quickly realized however that this was simply not an interesting visualization. It would just be a lazy rehash of Samsung's own visualization, just in a circular form. I decided I wanted to do something more interesting.",
          ]}
        />
        <ImagePanel sources={['/ropd/shealth_stages.png', '/ropd/inspoclocks.jpg']} classes='w-1/2' caption='Figure 3. Initial Inspiration' />
        <ImagePanel sources={['/ropd/proto1.png', '/ropd/proto2.png', '/ropd/midi.png']} classes='w-1/2 bg-neutral-100 p-3' caption='Figure 4. Design Sketches + MIDI Programmer Inspiration' />
        <TextPanel
          heading=''
          text={[
            "While doing research for my own personal projects, I came across an image of a MIDI programming software, and thought Samsung's Sleep Stages Visualization resembled MIDI programming. This led me to the idea of creating a MIDI file from my sleep stages data, and then using that MIDI file to create a waveform visualization of my sleep stages. I could theoretically wrap the audio waveform around a circular clock to achieve something similar to my original idea, but slightly different.",
            "Eventually I decided to ditch the whole clock idea and just focus on the waveform visualization. I wanted to resulting audio to be somewhat listenable; at least, not horrible. So I decided I would use a familiar chord progression: I - VI - II - V in Cmaj7. I would map each sleep stage to a chord, and then program it into a MIDI file, which I could later EQ and add effects to.",
          ]}
          right={true}
        />
        <TextPanel
          heading='Step 3: Data Processing.'
          text={[
            'The first step was to convert the sleep stages data into MIDI. In order to do this, I downloaded my sleep data off of the Samsung Health App. The sleep stages were recorded to a CSV file, along a bunch of other garbage data that I did not need. In order to properly process the data and remove any unnecessary parts, I wrote a Python script that took out the relevant data: start, stop, and stage. I organized each set of data by date.',
            'The script would also map each stage to a corresponding chord. I used the Cmaj7 chord progression (Awake: Cmaj7 -> REM: Amin7/Emin7 -> Light: Dmin7/Fmaj7 -> Deep: Gdom7), and the script would randomly add variance. to keep it less monotone.'
          ]}
        />
        <Code 
          code={`
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

    print(chord_progressions)`}
ariaLabel='Parse Sleep Data'
fileName='parse.py'
language='python'
        /> 
          

        <div>
          <img src='/ropd/process_make_midi.png' className='w-full row-span-4 object-cover' />
        </div>
        <div className='w-full h-full flex items-center'>
          <p className='m-auto'>Step 2. Map Sleep Stages to Chords, then output as MIDI</p>
        </div>
        <div className='w-full h-full flex items-center'>
          <p className='m-auto'>Step 3. Add instrument to MIDI, add EQ and FX like reverb</p>
        </div>
        <div>
          <img src='/ropd/process_eq_midi.png' className='w-full row-span-4 object-cover' />
        </div>
        <div>
          <img src='/ropd/process_encode_timer.png' className='w-full row-span-4 object-cover' />
        </div>
        
        <div className="w-full h-full flex items-center">
          <p className='m-auto'>Step 4. Encode timings for waveforms</p>
        </div>
      
      </div>

    </div>
  );
}

export default Gallery;
