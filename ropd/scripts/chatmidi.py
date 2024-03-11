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
        self.tempo = 120     # In BPM
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
    'notes': 'Bad input, please refer this spec-\n'
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

progression = {'2024-02-20': [('Dmin7', 24), ('Gdom7', 5), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 12), ('Cmaj7', 2), ('Fmaj7', 15), ('Gdom7', 48), ('Cmaj7', 1), ('Fmaj7', 3), ('Emin7', 3), ('Dmin7', 1), ('Amin7', 10), ('Fmaj7', 8), ('Cmaj7', 4), ('Fmaj7', 15), ('Gdom7', 3), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Fmaj7', 2), ('Cmaj7', 1), ('Dmin7', 22), ('Gdom7', 2), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 3), ('Emin7', 34), ('Fmaj7', 3), ('Cmaj7', 1), ('Fmaj7', 8), ('Cmaj7', 2), ('Dmin7', 21), ('Gdom7', 1), ('Cmaj7', 1), ('Dmin7', 5), ('Cmaj7', 1), ('Fmaj7', 8), ('Cmaj7', 3), ('Fmaj7', 14), ('Emin7', 3), ('Dmin7', 2), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 1), ('Fmaj7', 4), ('Cmaj7', 1), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 7), ('Cmaj7', 1), ('Fmaj7', 5), ('Cmaj7', 1), ('Dmin7', 20), ('Gdom7', 12), ('Cmaj7', 1), ('Dmin7', 5), ('Cmaj7', 1), ('Fmaj7', 3), ('Emin7', 18), ('Cmaj7', 1), ('Dmin7', 13), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 1), ('Fmaj7', 2), ('Cmaj7', 1), ('Fmaj7', 18), ('Cmaj7', 1), ('Fmaj7', 2), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 10), ('Emin7', 22), ('Cmaj7', 3), ('Amin7', 1), ('Fmaj7', 4), ('Cmaj7', 3)], '2024-02-21': [('Dmin7', 18), ('Gdom7', 28), ('Cmaj7', 1), ('Fmaj7', 21), ('Gdom7', 12), ('Cmaj7', 2), ('Dmin7', 9), ('Cmaj7', 3), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 6), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 2), ('Fmaj7', 7), ('Amin7', 19), ('Fmaj7', 1), ('Cmaj7', 1), ('Dmin7', 14), ('Gdom7', 7), ('Dmin7', 8), ('Cmaj7', 2), ('Dmin7', 5), ('Cmaj7', 2), ('Fmaj7', 14), ('Gdom7', 37), ('Cmaj7', 2), ('Fmaj7', 1), ('Cmaj7', 1), ('Fmaj7', 4), ('Amin7', 12), ('Dmin7', 3), ('Emin7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 4), ('Dmin7', 19), ('Cmaj7', 1), ('Fmaj7', 3), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 1), ('Fmaj7', 6), ('Cmaj7', 4), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 4), ('Dmin7', 5), ('Amin7', 21), ('Dmin7', 33), ('Cmaj7', 1), ('Fmaj7', 2), ('Cmaj7', 1), ('Dmin7', 20), ('Gdom7', 1), ('Amin7', 1), ('Cmaj7', 2), ('Fmaj7', 2), ('Amin7', 32), ('Cmaj7', 1), ('Fmaj7', 14), ('Cmaj7', 1), ('Fmaj7', 11), ('Cmaj7', 2)], '2024-02-22': [('Dmin7', 19), ('Cmaj7', 3), ('Fmaj7', 3), ('Cmaj7', 1), ('Fmaj7', 3), ('Cmaj7', 1), ('Dmin7', 8), ('Gdom7', 18), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 1), ('Fmaj7', 15), ('Gdom7', 12), ('Cmaj7', 6), ('Dmin7', 2), ('Cmaj7', 2), ('Dmin7', 1), ('Cmaj7', 11), ('Fmaj7', 3), ('Cmaj7', 46), ('Fmaj7', 2), ('Cmaj7', 6), ('Dmin7', 14), ('Gdom7', 27), ('Cmaj7', 2), ('Fmaj7', 5), ('Emin7', 18), ('Fmaj7', 9), ('Cmaj7', 1), ('Dmin7', 14), ('Cmaj7', 1), ('Fmaj7', 12), ('Cmaj7', 1), ('Fmaj7', 2), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 14), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 1), ('Fmaj7', 11), ('Amin7', 32), ('Cmaj7', 1), ('Dmin7', 26), ('Gdom7', 2), ('Fmaj7', 5), ('Cmaj7', 1), ('Fmaj7', 17), ('Gdom7', 1), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 3), ('Fmaj7', 8), ('Emin7', 1), ('Fmaj7', 1), ('Emin7', 23), ('Cmaj7', 2), ('Emin7', 3), ('Fmaj7', 1), ('Amin7', 2), ('Cmaj7', 1), ('Fmaj7', 6), ('Cmaj7', 1), ('Dmin7', 12), ('Cmaj7', 1), ('Fmaj7', 14), ('Cmaj7', 1), ('Fmaj7', 3), ('Amin7', 1), ('Fmaj7', 1), ('Emin7', 1), ('Cmaj7', 1), ('Dmin7', 9), ('Amin7', 11), ('Fmaj7', 11), ('Amin7', 1), ('Cmaj7', 1), ('Fmaj7', 9), ('Emin7', 2), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 2)], '2024-02-23': [('Fmaj7', 28), ('Gdom7', 26), ('Dmin7', 7), ('Cmaj7', 1), ('Fmaj7', 4), ('Amin7', 5), ('Fmaj7', 9), ('Cmaj7', 1), ('Dmin7', 10), ('Cmaj7', 3), ('Dmin7', 1), ('Cmaj7', 1), ('Fmaj7', 6), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 1), ('Fmaj7', 14), ('Gdom7', 20), ('Amin7', 2), ('Dmin7', 2), ('Amin7', 1), ('Fmaj7', 5), ('Emin7', 17), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Fmaj7', 9), ('Cmaj7', 1), ('Fmaj7', 4), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Fmaj7', 6), ('Cmaj7', 1), ('Dmin7', 20), ('Cmaj7', 3), ('Fmaj7', 8), ('Cmaj7', 1), ('Dmin7', 13), ('Amin7', 31), ('Cmaj7', 1), ('Emin7', 4), ('Cmaj7', 1), ('Fmaj7', 2), ('Cmaj7', 1), ('Dmin7', 28), ('Gdom7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 14), ('Dmin7', 1), ('Cmaj7', 2)], '2024-02-24': [('Dmin7', 15), ('Gdom7', 18), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 5), ('Amin7', 13), ('Fmaj7', 10), ('Cmaj7', 3), ('Fmaj7', 12), ('Cmaj7', 3), ('Fmaj7', 17), ('Cmaj7', 1), ('Dmin7', 26), ('Cmaj7', 2), ('Fmaj7', 16), ('Cmaj7', 2), ('Dmin7', 19), ('Cmaj7', 1), ('Fmaj7', 15), ('Gdom7', 35), ('Cmaj7', 3), ('Dmin7', 5), ('Cmaj7', 1), ('Fmaj7', 8), ('Amin7', 1), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 3), ('Dmin7', 1), ('Cmaj7', 4), ('Dmin7', 1), ('Amin7', 20), ('Dmin7', 6), ('Cmaj7', 1), ('Fmaj7', 36), ('Cmaj7', 1), ('Dmin7', 16), ('Amin7', 2), ('Cmaj7', 1), ('Dmin7', 1), ('Emin7', 2), ('Dmin7', 1), ('Amin7', 26), ('Dmin7', 1), ('Emin7', 10), ('Dmin7', 2), ('Cmaj7', 6), ('Dmin7', 9), ('Cmaj7', 3)], '2024-02-25': [('Fmaj7', 35), ('Gdom7', 38), ('Cmaj7', 1), ('Fmaj7', 6), ('Emin7', 1), ('Dmin7', 6), ('Cmaj7', 1), ('Fmaj7', 9), ('Cmaj7', 2), ('Fmaj7', 7), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Fmaj7', 4), ('Cmaj7', 4), ('Dmin7', 5), ('Cmaj7', 3), ('Dmin7', 5), ('Cmaj7', 3), ('Fmaj7', 12), ('Cmaj7', 2), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 3), ('Amin7', 14), ('Dmin7', 26), ('Gdom7', 3), ('Fmaj7', 2), ('Gdom7', 1), ('Cmaj7', 1), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 44), ('Amin7', 51), ('Dmin7', 19), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 1), ('Fmaj7', 9), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 1), ('Fmaj7', 4), ('Amin7', 1), ('Cmaj7', 1), ('Amin7', 27), ('Fmaj7', 2), ('Emin7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Fmaj7', 22), ('Cmaj7', 2)], '2024-02-26': [('Fmaj7', 28), ('Gdom7', 16), ('Cmaj7', 1), ('Fmaj7', 9), ('Cmaj7', 4), ('Dmin7', 12), ('Cmaj7', 1), ('Fmaj7', 10), ('Gdom7', 16), ('Cmaj7', 2), ('Fmaj7', 13), ('Gdom7', 36), ('Cmaj7', 2), ('Dmin7', 3), ('Emin7', 41), ('Dmin7', 7), ('Cmaj7', 1), ('Fmaj7', 25), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 2), ('Fmaj7', 10), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 8), ('Amin7', 1), ('Cmaj7', 2), ('Emin7', 33), ('Cmaj7', 1), ('Dmin7', 15), ('Cmaj7', 1), ('Dmin7', 16), ('Cmaj7', 1), ('Dmin7', 3), ('Cmaj7', 3), ('Dmin7', 3), ('Cmaj7', 1), ('Dmin7', 5), ('Cmaj7', 1)], '2024-02-27': [('Fmaj7', 20), ('Cmaj7', 4), ('Fmaj7', 9), ('Gdom7', 22), ('Cmaj7', 1), ('Dmin7', 15), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 1), ('Fmaj7', 8), ('Cmaj7', 1), ('Fmaj7', 16), ('Emin7', 1), ('Dmin7', 1), ('Emin7', 1), ('Fmaj7', 1), ('Amin7', 8), ('Fmaj7', 5), ('Emin7', 1), ('Dmin7', 1), ('Amin7', 1), ('Dmin7', 9), ('Cmaj7', 6), ('Dmin7', 4), ('Amin7', 2), ('Dmin7', 1), ('Amin7', 10), ('Fmaj7', 9), ('Cmaj7', 1), ('Dmin7', 22), ('Cmaj7', 2), ('Fmaj7', 19), ('Cmaj7', 11), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 6), ('Fmaj7', 5), ('Cmaj7', 25), ('Dmin7', 1), ('Amin7', 4), ('Dmin7', 1), ('Emin7', 1), ('Cmaj7', 1), ('Amin7', 4), ('Fmaj7', 6), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 12), ('Gdom7', 38), ('Fmaj7', 10), ('Amin7', 2), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 9), ('Amin7', 10), ('Fmaj7', 4), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 2), ('Dmin7', 7), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 9), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 1), ('Fmaj7', 5), ('Cmaj7', 1), ('Fmaj7', 10), ('Amin7', 8), ('Dmin7', 2), ('Emin7', 1), ('Cmaj7', 1), ('Dmin7', 2), ('Emin7', 18), ('Fmaj7', 2), ('Amin7', 1), ('Dmin7', 18), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 1), ('Fmaj7', 4), ('Cmaj7', 1), ('Fmaj7', 2), ('Cmaj7', 2)], '2024-02-28': [('Fmaj7', 20), ('Cmaj7', 1), ('Fmaj7', 11), ('Cmaj7', 1), ('Dmin7', 13), ('Gdom7', 11), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 10), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 1), ('Dmin7', 4), ('Amin7', 1), ('Fmaj7', 1), ('Amin7', 8), ('Fmaj7', 2), ('Cmaj7', 2), ('Fmaj7', 19), ('Cmaj7', 1), ('Fmaj7', 16), ('Gdom7', 26), ('Cmaj7', 2), ('Dmin7', 16), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 2), ('Fmaj7', 2), ('Cmaj7', 2), ('Dmin7', 2), ('Cmaj7', 2), ('Fmaj7', 8), ('Emin7', 23), ('Dmin7', 32), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 3), ('Fmaj7', 1), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Dmin7', 7), ('Cmaj7', 1), ('Fmaj7', 12), ('Cmaj7', 6), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 1), ('Amin7', 1), ('Cmaj7', 2), ('Dmin7', 1), ('Amin7', 8), ('Cmaj7', 8), ('Fmaj7', 22), ('Fmaj7', 10), ('Gdom7', 10), ('Cmaj7', 2), ('Fmaj7', 10), ('Cmaj7', 1), ('Dmin7', 4), ('Cmaj7', 1), ('Fmaj7', 10), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 2), ('Dmin7', 3), ('Amin7', 20), ('Fmaj7', 13), ('Cmaj7', 2), ('Dmin7', 5), ('Cmaj7', 1), ('Dmin7', 12), ('Gdom7', 4), ('Fmaj7', 2), ('Cmaj7', 4), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 6), ('Dmin7', 7), ('Cmaj7', 1), ('Dmin7', 8), ('Emin7', 7), ('Cmaj7', 1), ('Emin7', 9)], '2024-02-29': [('Dmin7', 16), ('Cmaj7', 34), ('Fmaj7', 8), ('Gdom7', 23), ('Cmaj7', 1), ('Dmin7', 8), ('Cmaj7', 1), ('Dmin7', 9), ('Amin7', 16), ('Fmaj7', 3), ('Emin7', 1), ('Fmaj7', 10), ('Gdom7', 9), ('Cmaj7', 5), ('Dmin7', 1), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 1), ('Dmin7', 2), ('Cmaj7', 1), ('Fmaj7', 12), ('Gdom7', 13), ('Cmaj7', 2), ('Fmaj7', 3), ('Cmaj7', 1), ('Fmaj7', 3), ('Cmaj7', 1), ('Fmaj7', 7), ('Emin7', 28), ('Fmaj7', 1), ('Emin7', 1), ('Cmaj7', 1), ('Fmaj7', 22), ('Gdom7', 2), ('Cmaj7', 2), ('Dmin7', 3), ('Cmaj7', 2), ('Fmaj7', 4), ('Cmaj7', 2), ('Fmaj7', 1), ('Cmaj7', 2), ('Fmaj7', 4), ('Cmaj7', 3), ('Dmin7', 8), ('Cmaj7', 2), ('Dmin7', 5), ('Cmaj7', 1), ('Fmaj7', 16), ('Cmaj7', 2), ('Fmaj7', 16), ('Gdom7', 5), ('Cmaj7', 1), ('Dmin7', 3), ('Emin7', 33), ('Fmaj7', 22), ('Gdom7', 22), ('Cmaj7', 1), ('Dmin7', 18), ('Amin7', 27), ('Cmaj7', 5), ('Fmaj7', 6), ('Cmaj7', 1), ('Fmaj7', 6), ('Amin7', 1), ('Cmaj7', 5), ('Fmaj7', 36), ('Cmaj7', 1), ('Fmaj7', 5), ('Emin7', 1), ('Cmaj7', 2), ('Fmaj7', 1), ('Amin7', 30), ('Cmaj7', 1)], '2024-03-01': [('Dmin7', 19), ('Gdom7', 15), ('Dmin7', 2), ('Gdom7', 16), ('Dmin7', 1), ('Cmaj7', 1), ('Fmaj7', 3), ('Amin7', 12), ('Dmin7', 11), ('Cmaj7', 1), ('Fmaj7', 10), ('Gdom7', 7), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Fmaj7', 9), ('Gdom7', 10), ('Cmaj7', 2), ('Dmin7', 4), ('Cmaj7', 1), ('Dmin7', 7), ('Cmaj7', 2), ('Fmaj7', 2), ('Cmaj7', 1), ('Dmin7', 7), ('Emin7', 22), ('Dmin7', 33), ('Gdom7', 30), ('Emin7', 1), ('Cmaj7', 1), ('Fmaj7', 1), ('Cmaj7', 2), ('Fmaj7', 2), ('Cmaj7', 1), ('Fmaj7', 2), ('Emin7', 16), ('Fmaj7', 2), ('Amin7', 5), ('Cmaj7', 3), ('Dmin7', 11), ('Cmaj7', 2), ('Fmaj7', 1), ('Cmaj7', 1), ('Fmaj7', 17), ('Cmaj7', 2), ('Dmin7', 4), ('Cmaj7', 6), ('Dmin7', 5), ('Amin7', 35), ('Fmaj7', 7), ('Cmaj7', 3), ('Dmin7', 10), ('Cmaj7', 2)], '2024-03-02': [('Dmin7', 22), ('Gdom7', 27), ('Cmaj7', 1), ('Dmin7', 10), ('Cmaj7', 3), ('Fmaj7', 6), ('Cmaj7', 1), ('Fmaj7', 5), ('Cmaj7', 1), ('Fmaj7', 9), ('Gdom7', 19), ('Cmaj7', 1), ('Dmin7', 12), ('Cmaj7', 1), ('Fmaj7', 5), ('Emin7', 27), ('Cmaj7', 2), ('Fmaj7', 8), ('Cmaj7', 1), ('Dmin7', 32), ('Gdom7', 3), ('Cmaj7', 3), ('Fmaj7', 7), ('Cmaj7', 1), ('Dmin7', 1), ('Cmaj7', 1), ('Fmaj7', 16), ('Cmaj7', 2), ('Fmaj7', 8), ('Amin7', 34), ('Cmaj7', 2)]}

# for i, chord in enumerate(chord_progression):
#     add_full_chord(midi, _midif, 4, chord, _midif.BAR)
#     _midif.add_bar()

# # Add a bar of silence
# _midif.add_bar()

# # Ascending arpeggio
# for i, chord in enumerate(chord_progression):
#     add_arpeggio_chord(midi, _midif, 4, chord, _midif.BAR)
#     _midif.add_bar()

# # Add a bar of silence
# _midif.add_bar()

# # Descending arpeggio
# for i, chord in enumerate(chord_progression):
#     add_arpeggio_chord(midi, _midif, 4, chord, _midif.BAR, down=True)
#     _midif.add_bar()


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

        # if choice == 'full':
        #     add_full_chord(midi, _midif, 4, chord, _midif.BAR * i, sustain=sustain)
        # elif choice == 'up':
        #     add_arpeggio_chord(midi, _midif, 4, chord, _midif.BAR * i, sustain=sustain)
        # else:
        #     add_arpeggio_chord(midi, _midif, 4, chord, _midif.BAR * i, down=True, sustain=sustain)
        add_full_chord(midi, _midif, 4, chord, _midif.BAR * i, sustain=sustain)

        _midif.add_bar(i)

    with open(f"{day}_output.mid", "wb") as output_file:
        midi.writeFile(output_file)

# for chord, i in progression:
    
#     # Select full chord, arpeggio up, arpeggio down
#     choice = random.choice(['full', 'up', 'down'])

#     # Random Sustain
#     sustain = 1

#     print(f'Chord: {chord}, Duration: {i}, Choice: {choice}, Sustain: {sustain}')

#     # if choice == 'full':
#     #     add_full_chord(midi, _midif, 4, chord, _midif.BAR * i, sustain=sustain)
#     # elif choice == 'up':
#     #     add_arpeggio_chord(midi, _midif, 4, chord, _midif.BAR * i, sustain=sustain)
#     # else:
#     #     add_arpeggio_chord(midi, _midif, 4, chord, _midif.BAR * i, down=True, sustain=sustain)
#     add_full_chord(midi, _midif, 4, chord, _midif.BAR * i, sustain=sustain)

#     _midif.add_bar(i)

# # Gdom7 arpeggio ascending
# add_arpeggio_chord(midi, _midif, 4, 'Gdom7', _midif.BAR, sustain=4)
# _midif.add_bar()

# # Dmin7 sustained followed by Fmaj7 arpeggio
# add_full_chord(midi, _midif, 4, 'Dmin7', _midif.BAR, 2)
# _midif.add_bar()
# add_arpeggio_chord(midi, _midif, 4, 'Fmaj7', _midif.BAR)
# _midif.add_bar()

# # Amin7 arpeggio descending followed by Emin7
# add_arpeggio_chord(midi, _midif, 4, 'Amin7', _midif.BAR, down=True)
# add_full_chord(midi, _midif, 4, 'Dmin7', _midif.BAR, 2)
# _midif.add_bar()
# add_arpeggio_chord(midi, _midif, 4, 'Emin7', _midif.BAR, down=True)
# _midif.add_bar()

# # Cmaj7 sustained
# add_full_chord(midi, _midif, 4, 'Cmaj7', _midif.BAR, sustain=2)
# _midif.add_bar()

with open("output.mid", "wb") as output_file:
    midi.writeFile(output_file)
