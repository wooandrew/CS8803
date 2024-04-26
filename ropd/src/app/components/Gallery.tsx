
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';
import Code from './Code';

const Gallery = () => {

  return (
    <div className='flex flex-row justify-between w-full'>
      <div className='grid landscape:grid-cols-2 portrait:grid-cols-1 gap-4 text-center overflow'>
        <TextPanel 
          heading='Step 1: Collect Data.' 
          text={[
              'The first step of my process was of course to collect data. I knew from the get-go that I wanted to track my sleep, as I had been struggling to get good rest for the past few months. I decided I would track my sleep using a Samsung Galaxy Watch4. This was a strategic decision, as I did not know yet what kind of sleep  data I wanted to  collect, and the watch has a variety of sensors that could be used to track different aspects of my sleep. As such, I decided to collect as many different categories of data while sleeping and decided at a later date which one I would eventually use.'
          ]}
          border='border-t border-l'
        />
        <ImagePanel sources={['/ropd/watch.jpg', '/ropd/watchface.png']} caption='Figure 1. Samsung Galaxy Watch4' />
        <TextPanel
          heading=''
          text={[
            'The Samsung Galaxy Watch4 collects a variety of different data while sleeping. For example, it keeps track of the length of sleep, which sleep stage you are in at any given time, your blood oxygen levels, and even detects and tracks snoring. The Samsung Health App takes all of this data and arranges them in visual graphs for the user. These visualizations served as heavy inspiration for my project.',
            'I collected data for about two weeks, and then decided to combine sleep stage and blood oxygen data for my project.'
          ]}
          border='border-l' 
        />
        <ImagePanel sources={['/ropd/samsunghealthsleep.png']} caption='Figure 2. Screenshots of Samsung Health App' />
        <TextPanel
          heading='Step 2: The Plan.'
          text={[
            'The plan (at least in the beginning) was to create a circular visualization around a clock. The Samsung Health app creates an interesting visualization with sleep stages: it is a sleep stage vs time graph, and because people move between the four different sleep stages multiple times a night, it creates a jagged graph.',
            'I wanted to make a visualization where the sleep stage and blood oxygen graphs are somehow wrapped around a clock so I could see how my sleep stages and blood oxygen levels change over time. I also wanted to add a feature where I could see my average sleep stage and blood oxygen graph across the data recording period.',
            "I quickly realized however that this was simply not an interesting visualization. It would just be a lazy rehash of Samsung's own visualization, just in a circular form. I decided I wanted to do something more interesting.",
          ]}
          border='border-t border-r'
        />
        <ImagePanel sources={['/ropd/shealth_stages.png', '/ropd/inspoclocks.jpg']} classes='w-1/2' caption='Figure 3. Initial Inspiration' />
        <TextPanel
          heading=''
          text={[
            "While doing research for my own personal projects, I came across an image of a MIDI programming software, and thought Samsung's Sleep Stages Visualization resembled MIDI programming. This led me to the idea of creating a MIDI file from my sleep stages data, and then using that MIDI file to create a waveform visualization of my sleep stages that has been EQ'ed with blood oxygen data. I could theoretically wrap the audio waveform around a circular clock to achieve something similar to my original idea, but slightly different.",
            "Eventually I decided to ditch the whole clock idea and just focus on the waveform visualization. I wanted to resulting audio to be somewhat listenable; at least, not horrible. So I decided I would use a familiar chord progression: I - VI - II - V in Cmaj7. I would map each sleep stage to a chord, and then program it into a MIDI file, which I could later EQ with blood oxygen data and add effects to.",
          ]}
          border='border-r' 
        />
        <ImagePanel sources={['/ropd/proto1.png', '/ropd/proto2.png', '/ropd/midi.png']} classes='w-1/2 bg-neutral-100 p-3' caption='Figure 4. Design Sketches + MIDI Programmer Inspiration' />
        <TextPanel
          heading='Step 3: Data Processing.'
          text={[
            'The first step was to convert the sleep stages data into MIDI. In order to do this, I downloaded my sleep data off of the Samsung Health App. The sleep stages were recorded to a CSV file, along a bunch of other garbage data that I did not need. In order to properly process the data and remove any unnecessary parts, I wrote a Python script that took out the relevant data: start, stop, and stage. I organized each set of data by date.',
            'The script would also map each stage to a corresponding chord. I used the Cmaj7 chord progression (Awake: Cmaj7 -> REM: Amin7/Emin7 -> Light: Dmin7/Fmaj7 -> Deep: Gdom7), and the script would randomly add variance to keep it less monotone.'
          ]}
          border='border-t border-l'
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

        <TextPanel
          heading='Data Processing, contd.: Convert Chords to MIDI.'
          text={[
            'Once the Sleep Stage to Chord Progression Mapping is created, I used the MIDIUtil library to create a separate MIDI file for each sleep session, which are segmented by date. I then used the Mingus library to convert the chords to notes and wrote them to their correct MIDI files.',
            'Each Sleep Stage has data on how long it lasted. I used this data to approximate the number of minutes during each sleep stage. The number of minutes in a stage corresponds to the number of 4/4 bars in the MIDI file. For example, if a sleep stage lasted 12 minutes, it would be equivalent to 12 bars in the MIDI file. In order to shorten the audio length, I set the BPM to 960.',
          ]}
          border='border-l'
        />
        <Code
          code={`
from midiutil import MIDIFile
from mingus.core import chords

import random

# chord_progression = ['Gdom7', 'Dmin7', 'Amin7', 'Cmaj7']
# chord_variants = ['Gdom7', 'Fmaj7', 'Emin7', 'Cmaj7']

class midif:
    def __init__(self):

        self.track = 0
        self.channel = 0
        self.time = 0        # In beats
        self.duration = 1    # In beats
        self.tempo = 960     # In BPM
        self.volume = 100    # 0-127, as per the MIDI standard
        self.BAR = 4         # 4 beats in a bar

    def add_bar(self, num_bars=1):
        self.time += self.BAR * num_bars

    def add_beat(self, num_beats=1):
        self.time += num_beats

def swap_accidentals(note):
    if note == 'Db':
        return 'C#'
    if note == 'D#':
        return 'Eb'
    if note == 'E#':
        return 'F'
    if note == 'Gb':
        return 'F#'
    if note == 'G#':
        return 'Ab'
    if note == 'A#':
        return 'Bb'
    if note == 'B#':
        return 'C'

    return note

NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
OCTAVES = list(range(11))
NOTES_IN_OCTAVE = len(NOTES)

errors = {
    'notes': 'Bad input, please refer this spec-\\n'
}

def cast_note(note: str, octave: int) -> int:
    note = swap_accidentals(note)
    assert note in NOTES, errors['notes']
    assert octave in OCTAVES, errors['notes']

    note = NOTES.index(note)
    note += (NOTES_IN_OCTAVE * octave)

    assert 0 <= note <= 127, errors['notes']

    return note

def cast_chord(chord: str, octave: int) -> list:
    
    noteCast = []
    expandedChord = chords.from_shorthand(chord)
    for note in expandedChord:
        noteCast.append(cast_note(note, octave))

    noteCast = sorted(noteCast)

    return noteCast

def add_full_chord(file: MIDIFile, _midif: midif, octave: int, chord: str, duration: int, sustain: int=1):

    chordCast = cast_chord(chord, octave)

    for note in chordCast:
        file.addNote(_midif.track, _midif.channel, note, _midif.time, duration * sustain, _midif.volume)


def add_arpeggio_chord(file: MIDIFile, _midif: midif, octave: int, chord: str, duration: int, down: bool=False, sustain: int=1):

    castChord = cast_chord(chord, octave)
    if down:
        castChord.reverse()

    for i, note in enumerate(castChord):
        file.addNote(_midif.track, _midif.channel, note, _midif.time + i, (duration / len(castChord)) * sustain, _midif.volume)

progression = ... snip ...

... snip ...


for day in progression:
    
    _midif = midif()
    midi = MIDIFile(1)  # One track, defaults to format 1 (tempo track is created automatically)
    midi.addTempo(_midif.track, _midif.time, _midif.tempo)

    for chord, i in progression[day]:
        
        # Select full chord, arpeggio up, arpeggio down
        choice = random.choice(['full', 'up', 'down'])

        # Random Sustain
        sustain = 1

        print(f'Chord: {chord}, Duration: {i}, Choice: {choice}, Sustain: {sustain}')

        ... snip ...

        _midif.add_bar(i)

    with open(f"{day}_output.mid", "wb") as output_file:
        midi.writeFile(output_file)

... snip ...

with open("output.mid", "wb") as output_file:
    midi.writeFile(output_file)`}

          ariaLabel='Convert Chords to MIDI'
          fileName='midi.py'
          language='python'
        /> 

        <TextPanel
          heading='Data Processing, contd.: Encoding Timings for Waveforms.'
          text={[
            'The final step to processing the data was to encode the timings for the waveforms. This was to ensure the visualization could display the sleep stage accurately at any given time during the audio playback.',
            'Once again, I used Python to write a script that takes the thus-far processed sleep data, converts the Sleep Stage duration into bars, then converts bars into seconds. This data basically maps the chords corresponding to the sleep stages to the time when they first start playing in the audio file.',
          ]}
          border='border-l'
        />
        <Code
          code={`
import json

progression = ... snip ...

BEAT = 1
BAR = 4
BPM = 960

time_chord_map = {}

# Format: {'mm_dd': [(chord, time_elapsed), ...], ...}
for date in progression:
    
        beat_num = 0
        new_date = date.split('-')
        new_date = f'{new_date[1]}_{new_date[2]}'
        time_chord_map[new_date] = []
    
        for chord, length in progression[date]:
            time_elapsed = beat_num / BPM * 60
            time_chord_map[new_date].append((chord, f'{time_elapsed:.2f}'))
            beat_num += length * BAR

print(json.dumps(time_chord_map))`}
          ariaLabel='Encode Timings for Waveforms'
          fileName='encode_elapsed.py'
          language='python'
        />

        <TextPanel
          heading='Step 4: Equalizer & FX.'
          text={[
            'The next step was adding EQ and FX to the MIDI data. MIDI, which stands for Musical Instrument Digital Interface, is a digital protocol that allows electronic instruments, computers, and other devices to communicate with each other. It is not an audio file, but rather a set of instructions that tells a device what notes to play, when to play them, and how loud to play them. As such, I needed to add an instrument to the MIDI file, and then EQ and add effects like reverb.',
            "In order to do this, I used REAPER, a digital audio workstation and MIDI sequencer software. I mapped grand piano audio as well as REAPER's ReaSynth plugin synthesizer to the MIDI data. I then added a ReaEQ to each track as well as the master in order to mellow out the synthesizer audio, making it less cacaphonic. I added just a touch of reverb to make the piano less jarring. I then used the blood oxygen data as a model for adding triangle and saw-tooth modulation. Because I could not get the blood oxygen data from Samsung, I had to use the graphs provided in the app and copy the EQ waves by hand.",
            'Finally I rendered all of the MIDI files, now with audio mapped, equalized, and with effects, into individual WAV files. I also created a single WAV file that combined all of the individual tracks into one audio file.',
          ]}
          border='border-t border-r'
        />
        <ImagePanel sources={['/ropd/reaper.png']} caption='Figure 5. REAPER DAW, EQ, and FX' />

       <TextPanel
          heading='Step 5: Visualization.'
          text={[
            'The final step was to create the visualization. I used AudioMotion, an audio visualization library, to create the visualization on the fly as the audio plays. I went through several different iterations. Originally I wanted to create a circular visualization, but since I decided to avoid the clock idea, I initially abandoned this effort and opted for a simple, linear frequency visualization.'
            
          ]}
          border='border-t border-l'
        />
        <ImagePanel sources={['/ropd/circularvis1.png', '/ropd/circularvis2.png', '/ropd/circularvis3.png', '/ropd/circularvis4.png',]} classes='bg-black' caption='Figure 6. Circular Visualization Prototypes' />
        
        <TextPanel
          heading=''
          text={[
            'The idea behind the waveform visualization is directly tied to the audio, and therefore time. In essence, the linear visualization shows three axes of data: frequency range on the x-axis, gain (volume) on the y-axis, and time as the audio plays. This single visualization is enough to view every detail about the audio files I created using the sleep data. As shown in Figure 7, the audio visualization shows the sleep stages as they change over time (red), and the blood oxygen data can be seen by the saw-tooth pattern to the right of it.', 
          ]}
          border='border-l'
        />
        <ImagePanel sources={['/ropd/alpha1.png']} caption='Figure 7. Linear Visualization Prototype' />

        <TextPanel
          heading='Step 6: Final Product.'
          text={[
            'However, the single waveform felt a little lackluster, so I decided to revisit the circular visualization idea. I created a circular and mirrored version of the linear visualization instead, and added live captions using the sleep stage timing data to describe exactly what sleep stage I was in, along with the audio chord that was played.',
          ]}
          border='border-t border-r'
        />
        <ImagePanel sources={['/ropd/awake.png', '/ropd/rem.png', '/ropd/light.png', '/ropd/deep.png']} classes='bg-black' caption='Figure 8. Circular Visualizations w/ Live Captions' />

        <TextPanel
          heading=''
          text={[
            "I deemed that just the linear visualization or just the circular visualization did not do much to show the data, so I decided to display both of them, as well as two other similar visualizations. Besides the circular and linear banded visualizations, I added a line visualization that highlights the blood oxygen data, and a frequency resonance graph visualization that highlights the sleep stages.",
            "Finally, I added an overall graph that shows all of the sleep stages in order to give viewers an overall picture of that sleep session.",
          ]}
          border='border-r'
        />
        <ImagePanel sources={['/ropd/Final.png']} classes='bg-black' caption='Figure 9. Final Product' />

        <TextPanel
          heading='Subversion of Visualization Best Practices'
          text={[
            'The final product, in retrospect, is not a good visualization in terms of what is generally accepted as visualizations. The word visualization, and particularly data visualization, implies that the data is being soley consumed by the eyes. This project aims to subvert these expectations by introducing audio to the visualization.',
          ]}
          border='border-l border-t border-b'
        />
        <TextPanel
          heading='Cont.'
          text={[
            'Within the Data Feminism framework, this subversion of expectations and best practices is a form of challenging power. The field of data visualization often prioritizes the visual over the auditory, leaving the visually impaired with very little to work with. This project aims to challenge that status quo by serving the data through audio.',
          ]}
          border='border-r border-t border-b'
        />


      </div>

    </div>
  );
}

export default Gallery;
