from midiutil import MIDIFile
from mingus.core import chords

chord_progression = [('Dmin7', 24), ('Gdom7', 5), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 12), ('Cmaj7', 2), ('Dmin7', 15), ('Gdom7', 48), ('Cmaj7', 1), ('Dmin7', 3), ('Amin7', 3), ('Dmin7', 1), ('Amin7', 10), ('Dmin7', 8), ('Cmaj7', 4), ('Dmin7', 15), ('Gdom7', 3), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 22), ('Gdom7', 2), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 3), ('Amin7', 34), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 2), ('Dmin7', 21), ('Gdom7', 1), ('Cmaj7', 1), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 3), ('Dmin7', 14), ('Amin7', 3), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 20), ('Gdom7', 12), ('Cmaj7', 1), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 3), ('Amin7', 18), ('Cmaj7', 1), ('Dmin7', 13), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 18), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 10), ('Amin7', 22), ('Cmaj7', 3), ('Amin7', 1), ('Dmin7', 4), ('Cmaj7', 3), ('Dmin7', 18), ('Gdom7', 28), ('Cmaj7', 1), ('Dmin7', 21), ('Gdom7', 12), ('Cmaj7', 2), ('Dmin7', 9), ('Cmaj7', 3), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 2), ('Dmin7', 7), ('Amin7', 19), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 14), ('Gdom7', 7), ('Dmin7', 8), ('Cmaj7', 2), ('Dmin7', 5), ('Cmaj7', 2), ('Dmin7', 14), ('Gdom7', 37), ('Cmaj7', 2), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 4), ('Amin7', 12), ('Dmin7', 3), ('Amin7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 4), ('Dmin7', 19), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 6), ('Cmaj7', 4), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 4), ('Dmin7', 5), ('Amin7', 21), ('Dmin7', 33), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 20), ('Gdom7', 1), ('Amin7', 1), ('Cmaj7', 2), ('Dmin7', 2), ('Amin7', 32), ('Cmaj7', 1), ('Dmin7', 14), ('Cmaj7', 1), ('Dmin7', 11), ('Cmaj7', 2), ('Dmin7', 19), ('Cmaj7', 3), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 8), ('Gdom7', 18), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 15), ('Gdom7', 12), ('Cmaj7', 6), ('Dmin7', 2), ('Cmaj7', 2), ('Dmin7', 1), ('Cmaj7', 11), ('Dmin7', 3), ('Cmaj7', 46), ('Dmin7', 2), ('Cmaj7', 6), ('Dmin7', 14), ('Gdom7', 27), ('Cmaj7', 2), ('Dmin7', 5), ('Amin7', 18), ('Dmin7', 9), ('Cmaj7', 1), ('Dmin7', 14), ('Cmaj7', 1), ('Dmin7', 12), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 14), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 11), ('Amin7', 32), ('Cmaj7', 1), ('Dmin7', 26), ('Gdom7', 2), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 17), ('Gdom7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 3), ('Dmin7', 8), ('Amin7', 1), ('Dmin7', 1), ('Amin7', 23), ('Cmaj7', 2), ('Amin7', 3), ('Dmin7', 1), ('Amin7', 2), ('Cmaj7', 1), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 12), ('Cmaj7', 1), ('Dmin7', 14), ('Cmaj7', 1), ('Dmin7', 3), ('Amin7', 1), ('Dmin7', 1), ('Amin7', 1), ('Cmaj7', 1), ('Dmin7', 9), ('Amin7', 11), ('Dmin7', 11), ('Amin7', 1), ('Cmaj7', 1), ('Dmin7', 9), ('Amin7', 2), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 2), ('Dmin7', 28), ('Gdom7', 26), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 4), ('Amin7', 5), ('Dmin7', 9), ('Cmaj7', 1), ('Dmin7', 10), ('Cmaj7', 3), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 14), ('Gdom7', 20), ('Amin7', 2), ('Dmin7', 2), ('Amin7', 1), ('Dmin7', 5), ('Amin7', 17), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 20), ('Cmaj7', 3), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 13), ('Amin7', 31), ('Cmaj7', 1), ('Amin7', 4), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 28), ('Gdom7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 14), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 15), ('Gdom7', 18), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 5), ('Amin7', 13), ('Dmin7', 10), ('Cmaj7', 3), ('Dmin7', 12), ('Cmaj7', 3), ('Dmin7', 17), ('Cmaj7', 1), ('Dmin7', 26), ('Cmaj7', 2), ('Dmin7', 16), ('Cmaj7', 2), ('Dmin7', 19), ('Cmaj7', 1), ('Dmin7', 15), ('Gdom7', 35), ('Cmaj7', 3), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 8), ('Amin7', 1), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 3), ('Dmin7', 1), ('Cmaj7', 4), ('Dmin7', 1), ('Amin7', 20), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 36), ('Cmaj7', 1), ('Dmin7', 16), ('Amin7', 2), ('Cmaj7', 1), ('Dmin7', 1), ('Amin7', 2), ('Dmin7', 1), ('Amin7', 26), ('Dmin7', 1), ('Amin7', 10), ('Dmin7', 2), ('Cmaj7', 6), ('Dmin7', 9), ('Cmaj7', 3), ('Dmin7', 35), ('Gdom7', 38), ('Cmaj7', 1), ('Dmin7', 6), ('Amin7', 1), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 2), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 4), ('Dmin7', 5), ('Cmaj7', 3), ('Dmin7', 5), ('Cmaj7', 3), ('Dmin7', 12), ('Cmaj7', 2), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 3), ('Amin7', 14), ('Dmin7', 26), ('Gdom7', 3), ('Dmin7', 2), ('Gdom7', 1), ('Cmaj7', 1), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 44), ('Amin7', 51), ('Dmin7', 19), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 4), ('Amin7', 1), ('Cmaj7', 1), ('Amin7', 27), ('Dmin7', 2), ('Amin7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 22), ('Cmaj7', 2), ('Dmin7', 28), ('Gdom7', 16), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 4), ('Dmin7', 12), ('Cmaj7', 1), ('Dmin7', 10), ('Gdom7', 16), ('Cmaj7', 2), ('Dmin7', 13), ('Gdom7', 36), ('Cmaj7', 2), ('Dmin7', 3), ('Amin7', 41), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 25), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 10), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 8), ('Amin7', 1), ('Cmaj7', 2), ('Amin7', 33), ('Cmaj7', 1), ('Dmin7', 15), ('Cmaj7', 1), ('Dmin7', 16), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 3), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 20), ('Cmaj7', 4), ('Dmin7', 9), ('Gdom7', 22), ('Cmaj7', 1), ('Dmin7', 15), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 16), ('Amin7', 1), ('Dmin7', 1), ('Amin7', 1), ('Dmin7', 1), ('Amin7', 8), ('Dmin7', 5), ('Amin7', 1), ('Dmin7', 1), ('Amin7', 1), ('Dmin7', 9), ('Cmaj7', 6), ('Dmin7', 4), ('Amin7', 2), ('Dmin7', 1), ('Amin7', 10), ('Dmin7', 9), ('Cmaj7', 1), ('Dmin7', 22), ('Cmaj7', 2), ('Dmin7', 19), ('Cmaj7', 11), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 6), ('Dmin7', 5), ('Cmaj7', 25), ('Dmin7', 1), ('Amin7', 4), ('Dmin7', 1), ('Amin7', 1), ('Cmaj7', 1), ('Amin7', 4), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 12), ('Gdom7', 38), ('Dmin7', 10), ('Amin7', 2), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 9), ('Amin7', 10), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 10), ('Amin7', 8), ('Dmin7', 2), ('Amin7', 1), ('Cmaj7', 1), ('Dmin7', 2), ('Amin7', 18), ('Dmin7', 2), ('Amin7', 1), ('Dmin7', 18), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 2), ('Dmin7', 20), ('Cmaj7', 1), ('Dmin7', 11), ('Cmaj7', 1), ('Dmin7', 13), ('Gdom7', 11), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 10), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 4), ('Amin7', 1), ('Dmin7', 1), ('Amin7', 8), ('Dmin7', 2), ('Cmaj7', 2), ('Dmin7', 19), ('Cmaj7', 1), ('Dmin7', 16), ('Gdom7', 26), ('Cmaj7', 2), ('Dmin7', 16), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 2), ('Dmin7', 8), ('Amin7', 23), ('Dmin7', 32), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 3), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 12), ('Cmaj7', 6), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 1), ('Amin7', 1), ('Cmaj7', 2), ('Dmin7', 1), ('Amin7', 8), ('Cmaj7', 8), ('Dmin7', 22), ('Dmin7', 10), ('Gdom7', 10), ('Cmaj7', 2), ('Dmin7', 10), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 10), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 2), ('Dmin7', 3), ('Amin7', 20), ('Dmin7', 13), ('Cmaj7', 2), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 12), ('Gdom7', 4), ('Dmin7', 2), ('Cmaj7', 4), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 6), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 8), ('Amin7', 7), ('Cmaj7', 1), ('Amin7', 9), ('Dmin7', 16), ('Cmaj7', 34), ('Dmin7', 8), ('Gdom7', 23), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 9), ('Amin7', 16), ('Dmin7', 3), ('Amin7', 1), ('Dmin7', 10), ('Gdom7', 9), ('Cmaj7', 5), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 12), ('Gdom7', 13), ('Cmaj7', 2), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 7), ('Amin7', 28), ('Dmin7', 1), ('Amin7', 1), ('Cmaj7', 1), ('Dmin7', 22), ('Gdom7', 2), ('Cmaj7', 2), ('Dmin7', 3), ('Cmaj7', 2), ('Dmin7', 4), ('Cmaj7', 2), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 4), ('Cmaj7', 3), ('Dmin7', 8), ('Cmaj7', 2), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 16), ('Cmaj7', 2), ('Dmin7', 16), ('Gdom7', 5), ('Cmaj7', 1), ('Dmin7', 3), ('Amin7', 33), ('Dmin7', 22), ('Gdom7', 22), ('Cmaj7', 1), ('Dmin7', 18), ('Amin7', 27), ('Cmaj7', 5), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 6), ('Amin7', 1), ('Cmaj7', 5), ('Dmin7', 36), ('Cmaj7', 1), ('Dmin7', 5), ('Amin7', 1), ('Cmaj7', 2), ('Dmin7', 1), ('Amin7', 30), ('Cmaj7', 1), ('Dmin7', 19), ('Gdom7', 15), ('Dmin7', 2), ('Gdom7', 16), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 3), ('Amin7', 12), ('Dmin7', 11), ('Cmaj7', 1), ('Dmin7', 10), ('Gdom7', 7), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 9), ('Gdom7', 10), ('Cmaj7', 2), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 7), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 7), ('Amin7', 22), ('Dmin7', 33), ('Gdom7', 30), ('Amin7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 2), ('Amin7', 16), ('Dmin7', 2), ('Amin7', 5), ('Cmaj7', 3), ('Dmin7', 11), ('Cmaj7', 2), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 17), ('Cmaj7', 2), ('Dmin7', 4), ('Cmaj7', 6), ('Dmin7', 5), ('Amin7', 35), ('Dmin7', 7), ('Cmaj7', 3), ('Dmin7', 10), ('Cmaj7', 2), ('Dmin7', 22), ('Gdom7', 27), ('Cmaj7', 1), ('Dmin7', 10), ('Cmaj7', 3), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 9), ('Gdom7', 19), ('Cmaj7', 1), ('Dmin7', 12), ('Cmaj7', 1), ('Dmin7', 5), ('Amin7', 27), ('Cmaj7', 2), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 32), ('Gdom7', 3), ('Cmaj7', 3), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 16), ('Cmaj7', 2), ('Dmin7', 8), ('Amin7', 34), ('Cmaj7', 2)]
NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
OCTAVES = list(range(11))
NOTES_IN_OCTAVE = len(NOTES)

errors = {
    'notes': 'Bad input, please refer this spec-\n'
}


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


def note_to_number(note: str, octave: int) -> int:
    note = swap_accidentals(note)
    assert note in NOTES, errors['notes']
    assert octave in OCTAVES, errors['notes']

    note = NOTES.index(note)
    note += (NOTES_IN_OCTAVE * octave)

    assert 0 <= note <= 127, errors['notes']

    return note


array_of_notes = []
array_of_durations = []
for chord in chord_progression:
    v = chords.from_shorthand(chord[0])
    array_of_notes.append(v)
    array_of_durations.append(chord[1])

# for i, note in enumerate(array_of_notes):
#     print(note, array_of_durations[i])

array_of_note_numbers = []
for note in array_of_notes:
    OCTAVE = 5
    array_of_note_numbers.append([note_to_number(note[0], OCTAVE), note_to_number(note[1], OCTAVE), note_to_number(note[2], OCTAVE)])

track = 0
channel = 0
time = 0  # In beats
duration = 1  # In beats
tempo = 120  # In BPM
volume = 100  # 0-127, as per the MIDI standard

MyMIDI = MIDIFile(1)  # One track, defaults to format 1 (tempo track is created automatically)
MyMIDI.addTempo(track, time, tempo)

for i, pitch in enumerate(array_of_note_numbers):

    # if i % 16 == 0:
    MyMIDI.addNote(track, channel, pitch[0], time, array_of_durations[i], volume)
    MyMIDI.addNote(track, channel, pitch[1], time, array_of_durations[i], volume)
    MyMIDI.addNote(track, channel, pitch[2], time, array_of_durations[i], volume)
    time += array_of_durations[i]

def add_chord_to_midi():
    pass

def add_arpeggio_to_midi():
    pass

with open("ropd/scripts/sleep.mid", "wb") as output_file:
    MyMIDI.writeFile(output_file)
    