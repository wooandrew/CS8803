'use client';

import React, { useRef, useEffect, useState } from 'react'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'

import Gallery from './components/Gallery';

export default function Home() {

  const [audioSrc, setAudioSrc] = useState<string>('');
  const [sleepStage, setSleepStage] = useState<string>('Hi! Select a dataset to get started.');
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRefMain = useRef<HTMLCanvasElement>(null);
  const canvasRefTop = useRef<HTMLCanvasElement>(null);
  const canvasRefBot = useRef<HTMLCanvasElement>(null);
  const canvasRefLine = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  let wavesurferRef = useRef<WaveSurfer>();

  interface DataItem {
    [index: number]: string;
  }

  interface Data {
      [key: string]: DataItem[];
  }

  const data: Data = {
    "merged.wav":[["Dmin7", "0.00"], ["Dmin7", "0.00"], ["Dmin7", "0.00"], ["Fmaj7", "0.00"], ["Dmin7", "0.00"], ["Fmaj7", "0.00"], ["Fmaj7", "0.00"], ["Fmaj7", "0.00"], ["Fmaj7", "0.00"], ["Dmin7", "0.00"], ["Dmin7", "0.00"], ["Dmin7", "0.00"], ["Gdom7", "3.75"], ["Cmaj7", "4.00"], ["Gdom7", "4.50"], ["Cmaj7", "4.75"], ["Gdom7", "4.75"], ["Cmaj7", "5.00"], ["Cmaj7", "5.00"], ["Fmaj7", "5.25"], ["Fmaj7", "5.50"], ["Gdom7", "5.50"], ["Gdom7", "6.00"], ["Fmaj7", "6.00"], ["Cmaj7", "6.25"], ["Fmaj7", "6.50"], ["Gdom7", "7.00"], ["Gdom7", "7.00"], ["Dmin7", "7.25"], ["Cmaj7", "7.25"], ["Dmin7", "7.50"], ["Cmaj7", "7.75"], ["Dmin7", "8.00"], ["Cmaj7", "8.00"], ["Dmin7", "8.25"], ["Gdom7", "8.25"], ["Dmin7", "8.25"], ["Dmin7", "8.50"], ["Cmaj7", "8.75"], ["Gdom7", "8.75"], ["Dmin7", "9.00"], ["Gdom7", "9.00"], ["Gdom7", "9.50"], ["Amin7", "10.25"], ["Cmaj7", "11.00"], ["Cmaj7", "11.00"], ["Fmaj7", "11.25"], ["Fmaj7", "11.50"], ["Cmaj7", "11.50"], ["Gdom7", "11.50"], ["Fmaj7", "11.75"], ["Cmaj7", "12.25"], ["Fmaj7", "12.50"], ["Dmin7", "12.50"], ["Dmin7", "13.00"], ["Cmaj7", "13.25"], ["Dmin7", "13.50"], ["Fmaj7", "13.50"], ["Cmaj7", "13.50"], ["Fmaj7", "13.50"], ["Cmaj7", "13.75"], ["Cmaj7", "14.00"], ["Dmin7", "14.00"], ["Fmaj7", "14.25"], ["Cmaj7", "14.25"], ["Amin7", "14.25"], ["Cmaj7", "14.50"], ["Dmin7", "14.50"], ["Dmin7", "14.50"], ["Gdom7", "14.50"], ["Fmaj7", "14.75"], ["Cmaj7", "14.75"], ["Dmin7", "15.00"], ["Cmaj7", "15.00"], ["Gdom7", "15.25"], ["Cmaj7", "15.25"], ["Fmaj7", "15.50"], ["Fmaj7", "15.75"], ["Cmaj7", "16.00"], ["Amin7", "16.50"], ["Fmaj7", "16.75"], ["Gdom7", "17.00"], ["Dmin7", "17.25"], ["Cmaj7", "17.25"], ["Cmaj7", "17.50"], ["Cmaj7", "17.50"], ["Fmaj7", "17.50"], ["Fmaj7", "17.75"], ["Fmaj7", "17.75"], ["Cmaj7", "17.75"], ["Fmaj7", "17.75"], ["Cmaj7", "18.00"], ["Cmaj7", "18.25"], ["Dmin7", "18.25"], ["Dmin7", "18.25"], ["Gdom7", "18.50"], ["Fmaj7", "18.50"], ["Cmaj7", "18.75"], ["Cmaj7", "18.75"], ["Fmaj7", "19.00"], ["Fmaj7", "19.00"], ["Amin7", "19.25"], ["Fmaj7", "19.50"], ["Cmaj7", "19.75"], ["Amin7", "19.75"], ["Cmaj7", "20.00"], ["Cmaj7", "20.00"], ["Emin7", "20.00"], ["Cmaj7", "20.00"], ["Dmin7", "20.25"], ["Dmin7", "20.25"], ["Gdom7", "20.25"], ["Cmaj7", "20.25"], ["Fmaj7", "20.25"], ["Dmin7", "20.50"], ["Fmaj7", "20.50"], ["Dmin7", "20.50"], ["Cmaj7", "21.00"], ["Fmaj7", "21.25"], ["Gdom7", "21.25"], ["Cmaj7", "21.50"], ["Cmaj7", "21.75"], ["Fmaj7", "21.75"], ["Fmaj7", "22.00"], ["Cmaj7", "22.25"], ["Cmaj7", "22.50"], ["Cmaj7", "22.75"], ["Cmaj7", "22.75"], ["Fmaj7", "22.75"], ["Dmin7", "22.75"], ["Gdom7", "22.75"], ["Dmin7", "23.00"], ["Dmin7", "23.50"], ["Cmaj7", "23.50"], ["Dmin7", "23.50"], ["Cmaj7", "23.75"], ["Cmaj7", "23.75"], ["Dmin7", "24.00"], ["Dmin7", "24.00"], ["Fmaj7", "24.00"], ["Cmaj7", "24.25"], ["Cmaj7", "24.25"], ["Cmaj7", "24.25"], ["Cmaj7", "24.50"], ["Cmaj7", "24.75"], ["Fmaj7", "24.75"], ["Fmaj7", "24.75"], ["Dmin7", "24.75"], ["Dmin7", "25.00"], ["Amin7", "25.00"], ["Cmaj7", "25.00"], ["Emin7", "25.25"], ["Fmaj7", "25.25"], ["Cmaj7", "25.50"], ["Cmaj7", "25.50"], ["Dmin7", "25.50"], ["Dmin7", "25.75"], ["Dmin7", "25.75"], ["Emin7", "25.75"], ["Fmaj7", "26.00"], ["Cmaj7", "26.00"], ["Amin7", "26.25"], ["Dmin7", "26.25"], ["Cmaj7", "26.50"], ["Cmaj7", "26.50"], ["Cmaj7", "26.50"], ["Fmaj7", "26.75"], ["Dmin7", "26.75"], ["Fmaj7", "27.00"], ["Fmaj7", "27.00"], ["Cmaj7", "27.00"], ["Cmaj7", "27.25"], ["Fmaj7", "27.25"], ["Fmaj7", "27.50"], ["Cmaj7", "27.50"], ["Gdom7", "27.50"], ["Cmaj7", "27.75"], ["Fmaj7", "27.75"], ["Gdom7", "28.00"], ["Emin7", "28.25"], ["Cmaj7", "28.25"], ["Fmaj7", "28.25"], ["Amin7", "28.75"], ["Dmin7", "29.00"], ["Fmaj7", "29.00"], ["Amin7", "29.25"], ["Dmin7", "29.25"], ["Cmaj7", "29.25"], ["Emin7", "29.50"], ["Fmaj7", "29.50"], ["Dmin7", "29.75"], ["Emin7", "29.75"], ["Amin7", "30.00"], ["Fmaj7", "30.00"], ["Cmaj7", "30.00"], ["Gdom7", "30.25"], ["Dmin7", "30.25"], ["Cmaj7", "30.50"], ["Dmin7", "30.50"], ["Emin7", "30.75"], ["Dmin7", "31.25"], ["Cmaj7", "31.50"], ["Cmaj7", "31.50"], ["Fmaj7", "31.75"], ["Gdom7", "31.75"], ["Dmin7", "31.75"], ["Fmaj7", "32.00"], ["Cmaj7", "32.50"], ["Cmaj7", "32.50"], ["Gdom7", "32.50"], ["Fmaj7", "33.25"], ["Fmaj7", "33.50"], ["Cmaj7", "33.50"], ["Cmaj7", "33.75"], ["Cmaj7", "33.75"], ["Dmin7", "34.00"], ["Dmin7", "34.00"], ["Fmaj7", "34.00"], ["Cmaj7", "34.50"], ["Fmaj7", "34.75"], ["Cmaj7", "34.75"], ["Dmin7", "34.75"], ["Amin7", "35.00"], ["Amin7", "35.25"], ["Dmin7", "35.50"], ["Dmin7", "35.75"], ["Amin7", "35.75"], ["Cmaj7", "36.00"], ["Dmin7", "36.00"], ["Amin7", "36.25"], ["Cmaj7", "36.25"], ["Cmaj7", "36.25"], ["Fmaj7", "36.50"], ["Dmin7", "36.50"], ["Fmaj7", "36.50"], ["Emin7", "36.50"], ["Dmin7", "36.75"], ["Cmaj7", "36.75"], ["Cmaj7", "37.00"], ["Dmin7", "37.00"], ["Gdom7", "37.50"], ["Dmin7", "37.50"], ["Cmaj7", "37.50"], ["Cmaj7", "37.50"], ["Emin7", "37.75"], ["Cmaj7", "37.75"], ["Fmaj7", "37.75"], ["Dmin7", "38.00"], ["Fmaj7", "38.00"], ["Emin7", "38.25"], ["Fmaj7", "38.25"], ["Cmaj7", "38.25"], ["Gdom7", "38.50"], ["Amin7", "38.75"], ["Dmin7", "38.75"], ["Cmaj7", "39.25"], ["Dmin7", "39.25"], ["Fmaj7", "39.25"], ["Dmin7", "39.50"], ["Cmaj7", "39.75"], ["Cmaj7", "40.00"], ["Cmaj7", "40.00"], ["Fmaj7", "40.25"], ["Dmin7", "40.25"], ["Cmaj7", "40.50"], ["Cmaj7", "40.75"], ["Dmin7", "40.75"], ["Gdom7", "40.75"], ["Dmin7", "41.00"], ["Cmaj7", "41.25"], ["Dmin7", "41.25"], ["Cmaj7", "41.25"], ["Fmaj7", "41.50"], ["Dmin7", "41.75"], ["Cmaj7", "42.00"], ["Dmin7", "42.00"], ["Dmin7", "42.25"], ["Dmin7", "42.25"], ["Cmaj7", "42.50"], ["Fmaj7", "42.75"], ["Cmaj7", "42.75"], ["Cmaj7", "43.00"], ["Dmin7", "43.00"], ["Cmaj7", "43.25"], ["Fmaj7", "43.50"], ["Dmin7", "43.50"], ["Cmaj7", "43.75"], ["Cmaj7", "44.00"], ["Fmaj7", "44.25"], ["Fmaj7", "44.50"], ["Gdom7", "44.75"], ["Cmaj7", "44.75"], ["Cmaj7", "45.00"], ["Fmaj7", "45.25"], ["Gdom7", "45.25"], ["Dmin7", "45.25"], ["Cmaj7", "45.25"], ["Fmaj7", "45.50"], ["Cmaj7", "45.75"], ["Cmaj7", "46.25"], ["Cmaj7", "46.25"], ["Fmaj7", "46.25"], ["Cmaj7", "46.25"], ["Gdom7", "46.50"], ["Dmin7", "46.50"], ["Fmaj7", "46.50"], ["Cmaj7", "46.75"], ["Fmaj7", "46.75"], ["Cmaj7", "47.00"], ["Gdom7", "47.00"], ["Fmaj7", "47.00"], ["Dmin7", "47.25"], ["Cmaj7", "47.50"], ["Dmin7", "47.75"], ["Emin7", "48.25"], ["Emin7", "48.25"], ["Gdom7", "48.25"], ["Emin7", "48.50"], ["Cmaj7", "48.50"], ["Dmin7", "48.50"], ["Dmin7", "48.75"], ["Gdom7", "48.75"], ["Cmaj7", "49.00"], ["Fmaj7", "49.50"], ["Fmaj7", "49.75"], ["Gdom7", "50.00"], ["Cmaj7", "50.25"], ["Cmaj7", "50.25"], ["Gdom7", "50.25"], ["Dmin7", "50.50"], ["Fmaj7", "50.50"], ["Cmaj7", "51.50"], ["Cmaj7", "51.50"], ["Cmaj7", "51.50"], ["Dmin7", "51.75"], ["Fmaj7", "52.00"], ["Cmaj7", "52.00"], ["Cmaj7", "52.25"], ["Fmaj7", "52.25"], ["Dmin7", "52.50"], ["Emin7", "53.25"], ["Cmaj7", "53.75"], ["Cmaj7", "54.00"], ["Dmin7", "54.00"], ["Dmin7", "54.25"], ["Fmaj7", "54.50"], ["Dmin7", "54.75"], ["Cmaj7", "54.75"], ["Dmin7", "55.00"], ["Cmaj7", "55.25"], ["Fmaj7", "55.25"], ["Emin7", "55.50"], ["Cmaj7", "55.75"], ["Cmaj7", "56.00"], ["Fmaj7", "56.00"], ["Cmaj7", "56.25"], ["Fmaj7", "56.25"], ["Cmaj7", "56.25"], ["Cmaj7", "56.50"], ["Fmaj7", "56.75"], ["Dmin7", "56.75"], ["Cmaj7", "56.75"], ["Fmaj7", "56.75"], ["Fmaj7", "56.75"], ["Fmaj7", "57.00"], ["Cmaj7", "57.00"], ["Fmaj7", "57.00"], ["Fmaj7", "57.25"], ["Cmaj7", "57.25"], ["Cmaj7", "57.75"], ["Fmaj7", "57.75"], ["Fmaj7", "57.75"], ["Emin7", "57.75"], ["Fmaj7", "58.00"], ["Cmaj7", "58.00"], ["Cmaj7", "58.00"], ["Amin7", "58.25"], ["Amin7", "58.25"], ["Fmaj7", "58.25"], ["Cmaj7", "58.50"], ["Cmaj7", "58.50"], ["Amin7", "58.75"], ["Dmin7", "59.00"], ["Fmaj7", "59.00"], ["Cmaj7", "59.50"], ["Cmaj7", "59.50"], ["Fmaj7", "59.75"], ["Cmaj7", "60.00"], ["Cmaj7", "60.00"], ["Amin7", "60.00"], ["Dmin7", "60.25"], ["Dmin7", "60.25"], ["Cmaj7", "60.25"], ["Emin7", "60.25"], ["Dmin7", "60.50"], ["Cmaj7", "60.50"], ["Dmin7", "60.50"], ["Dmin7", "61.25"], ["Cmaj7", "61.25"], ["Dmin7", "61.50"], ["Dmin7", "61.50"], ["Gdom7", "61.50"], ["Amin7", "61.75"], ["Emin7", "62.00"], ["Cmaj7", "62.00"], ["Cmaj7", "62.00"], ["Cmaj7", "62.25"], ["Dmin7", "62.25"], ["Dmin7", "62.50"], ["Cmaj7", "62.50"], ["Dmin7", "62.50"], ["Cmaj7", "62.75"], ["Fmaj7", "63.25"], ["Cmaj7", "63.25"], ["Amin7", "63.50"], ["Amin7", "63.50"], ["Cmaj7", "63.50"], ["Dmin7", "63.75"], ["Cmaj7", "63.75"], ["Cmaj7", "63.75"], ["Dmin7", "63.75"], ["Fmaj7", "63.75"], ["Fmaj7", "64.00"], ["Emin7", "64.25"], ["Dmin7", "64.25"], ["Cmaj7", "64.25"], ["Fmaj7", "64.25"], ["Amin7", "64.50"], ["Dmin7", "64.50"], ["Cmaj7", "64.75"], ["Amin7", "64.75"], ["Fmaj7", "65.25"], ["Dmin7", "65.50"], ["Cmaj7", "65.50"], ["Gdom7", "65.75"], ["Emin7", "65.75"], ["Cmaj7", "66.00"], ["Cmaj7", "66.00"], ["Fmaj7", "66.00"], ["Cmaj7", "66.00"], ["Dmin7", "66.25"], ["Amin7", "66.25"], ["Cmaj7", "66.25"], ["Fmaj7", "66.50"], ["Dmin7", "66.75"], ["Dmin7", "66.75"], ["Cmaj7", "67.00"], ["Cmaj7", "67.00"], ["Fmaj7", "67.25"], ["Fmaj7", "67.25"], ["Cmaj7", "67.25"], ["Cmaj7", "67.50"], ["Fmaj7", "67.75"], ["Cmaj7", "67.75"], ["Cmaj7", "67.75"], ["Dmin7", "67.75"], ["Dmin7", "68.00"], ["Emin7", "68.00"], ["Cmaj7", "68.25"], ["Cmaj7", "68.50"], ["Cmaj7", "68.50"], ["Fmaj7", "68.50"], ["Fmaj7", "68.75"], ["Dmin7", "68.75"], ["Cmaj7", "68.75"], ["Cmaj7", "69.00"], ["Dmin7", "69.00"], ["Fmaj7", "69.25"], ["Cmaj7", "69.25"], ["Cmaj7", "69.50"], ["Cmaj7", "69.50"], ["Cmaj7", "69.50"], ["Cmaj7", "69.75"], ["Dmin7", "69.75"], ["Cmaj7", "69.75"], ["Dmin7", "69.75"], ["Cmaj7", "69.75"], ["Dmin7", "70.00"], ["Fmaj7", "70.00"], ["Cmaj7", "70.25"], ["Cmaj7", "70.25"], ["Dmin7", "70.25"], ["Cmaj7", "70.25"], ["Fmaj7", "70.50"], ["Fmaj7", "70.50"], ["Dmin7", "70.50"], ["Fmaj7", "70.50"], ["Cmaj7", "70.75"], ["Fmaj7", "71.00"], ["Dmin7", "71.00"], ["Cmaj7", "71.50"], ["Fmaj7", "71.75"], ["Cmaj7", "72.00"], ["Cmaj7", "72.25"], ["Dmin7", "72.25"], ["Cmaj7", "72.50"], ["Dmin7", "72.50"], ["Cmaj7", "72.50"], ["Amin7", "72.50"], ["Cmaj7", "72.75"], ["Dmin7", "72.75"], ["Cmaj7", "72.75"], ["Dmin7", "73.00"], ["Dmin7", "73.25"], ["Dmin7", "73.50"], ["Cmaj7", "73.50"], ["Gdom7", "73.50"], ["Amin7", "73.50"], ["Dmin7", "73.75"], ["Emin7", "74.00"], ["Cmaj7", "74.50"], ["Dmin7", "74.75"], ["Dmin7", "74.75"], ["Cmaj7", "74.75"], ["Cmaj7", "74.75"], ["Fmaj7", "75.00"], ["Cmaj7", "75.25"], ["Dmin7", "75.25"], ["Fmaj7", "75.50"], ["Cmaj7", "75.50"], ["Cmaj7", "75.75"], ["Cmaj7", "75.75"], ["Cmaj7", "75.75"], ["Fmaj7", "76.00"], ["Dmin7", "76.25"], ["Fmaj7", "76.25"], ["Cmaj7", "76.25"], ["Cmaj7", "76.50"], ["Dmin7", "76.75"], ["Dmin7", "76.75"], ["Cmaj7", "77.00"], ["Gdom7", "77.00"], ["Dmin7", "77.25"], ["Cmaj7", "77.25"], ["Dmin7", "77.50"], ["Cmaj7", "77.50"], ["Fmaj7", "77.50"], ["Amin7", "77.75"], ["Cmaj7", "77.75"], ["Dmin7", "77.75"], ["Dmin7", "77.75"], ["Amin7", "78.00"], ["Cmaj7", "78.75"], ["Dmin7", "79.00"], ["Amin7", "79.00"], ["Gdom7", "80.25"], ["Cmaj7", "80.75"], ["Cmaj7", "80.75"], ["Fmaj7", "81.00"], ["Cmaj7", "81.00"], ["Dmin7", "81.00"], ["Dmin7", "81.25"], ["Dmin7", "81.25"], ["Cmaj7", "81.50"], ["Cmaj7", "81.50"], ["Amin7", "81.75"], ["Cmaj7", "81.75"], ["Dmin7", "81.75"], ["Cmaj7", "82.25"], ["Cmaj7", "82.25"], ["Dmin7", "82.50"], ["Dmin7", "82.50"], ["Dmin7", "82.50"], ["Emin7", "82.50"], ["Emin7", "82.75"], ["Fmaj7", "83.00"], ["Fmaj7", "83.00"], ["Dmin7", "83.25"], ["Dmin7", "83.25"], ["Cmaj7", "83.25"], ["Amin7", "83.50"], ["Cmaj7", "83.50"], ["Dmin7", "83.50"], ["Fmaj7", "83.75"], ["Cmaj7", "84.75"], ["Amin7", "85.50"], ["Gdom7", "85.50"], ["Cmaj7", "85.75"], ["Dmin7", "86.00"], ["Cmaj7", "86.00"], ["Dmin7", "86.00"], ["Dmin7", "86.25"], ["Cmaj7", "86.25"], ["Dmin7", "86.75"], ["Gdom7", "87.50"], ["Fmaj7", "87.75"], ["Cmaj7", "88.00"], ["Cmaj7", "88.00"], ["Cmaj7", "88.25"], ["Dmin7", "88.25"], ["Fmaj7", "88.50"], ["Fmaj7", "88.50"], ["Amin7", "89.50"], ["Cmaj7", "89.50"], ["Cmaj7", "89.75"], ["Dmin7", "90.00"], ["Amin7", "90.00"], ["Emin7", "90.25"], ["Dmin7", "90.25"], ["Cmaj7", "90.50"], ["Amin7", "90.50"], ["Dmin7", "90.75"], ["Fmaj7", "90.75"], ["Cmaj7", "91.00"], ["Dmin7", "91.25"], ["Cmaj7", "91.50"], ["Fmaj7", "91.75"], ["Cmaj7", "92.00"], ["Fmaj7", "92.25"], ["Cmaj7", "92.25"], ["Cmaj7", "92.25"], ["Dmin7", "92.50"], ["Gdom7", "92.50"], ["Fmaj7", "92.50"], ["Dmin7", "92.75"], ["Cmaj7", "92.75"], ["Emin7", "93.00"], ["Fmaj7", "93.00"], ["Fmaj7", "93.00"], ["Cmaj7", "93.25"], ["Cmaj7", "94.00"], ["Cmaj7", "94.25"], ["Dmin7", "94.25"], ["Fmaj7", "94.50"], ["Cmaj7", "94.50"], ["Dmin7", "94.75"], ["Dmin7", "95.00"], ["Cmaj7", "95.00"], ["Dmin7", "95.25"], ["Gdom7", "96.25"], ["Fmaj7", "96.75"], ["Cmaj7", "96.75"], ["Cmaj7", "97.00"], ["Fmaj7", "97.00"], ["Emin7", "97.25"], ["Cmaj7", "97.25"], ["Cmaj7", "97.25"], ["Cmaj7", "97.50"], ["Gdom7", "97.50"], ["Dmin7", "97.50"], ["Dmin7", "97.50"], ["Dmin7", "97.75"], ["Amin7", "97.75"], ["Cmaj7", "97.75"], ["Cmaj7", "97.75"], ["Dmin7", "97.75"], ["Cmaj7", "98.00"], ["Fmaj7", "98.00"], ["Dmin7", "98.00"], ["Fmaj7", "98.50"], ["Amin7", "98.50"], ["Gdom7", "98.75"], ["Amin7", "99.00"], ["Cmaj7", "99.00"], ["Fmaj7", "99.25"], ["Cmaj7", "99.50"], ["Fmaj7", "100.25"], ["Cmaj7", "100.25"], ["Dmin7", "100.50"], ["Cmaj7", "101.00"], ["Dmin7", "101.25"], ["Cmaj7", "101.75"], ["Dmin7", "102.00"], ["Cmaj7", "102.25"], ["Emin7", "102.25"], ["Fmaj7", "102.50"], ["Fmaj7", "102.50"], ["Cmaj7", "102.50"], ["Emin7", "102.75"], ["Fmaj7", "102.75"], ["Cmaj7", "103.00"], ["Fmaj7", "103.25"], ["Cmaj7", "103.50"], ["Fmaj7", "103.50"], ["Cmaj7", "104.00"], ["Fmaj7", "104.25"], ["Amin7", "106.50"], ["Amin7", "106.75"], ["Cmaj7", "106.75"], ["Cmaj7", "107.00"], ["Fmaj7", "107.25"], ["Dmin7", "107.25"], ["Cmaj7", "107.75"], ["Fmaj7", "108.00"], ["Cmaj7", "108.50"], ["Cmaj7", "108.50"], ["Cmaj7", "108.50"], ["Dmin7", "108.75"], ["Dmin7", "108.75"], ["Dmin7", "108.75"], ["Emin7", "109.00"], ["Cmaj7", "109.25"], ["Emin7", "109.25"], ["Cmaj7", "109.50"], ["Fmaj7", "109.75"], ["Dmin7", "109.75"], ["Amin7", "110.00"], ["Emin7", "110.25"], ["Cmaj7", "110.50"], ["Cmaj7", "110.75"], ["Fmaj7", "110.75"], ["Fmaj7", "111.00"], ["Emin7", "111.75"], ["Gdom7", "111.75"], ["Cmaj7", "112.25"], ["Dmin7", "112.50"], ["Fmaj7", "112.75"], ["Cmaj7", "113.25"], ["Cmaj7", "113.25"], ["Cmaj7", "113.75"], ["Dmin7", "114.25"], ["Fmaj7", "114.50"], ["Fmaj7", "114.75"], ["Amin7", "115.25"], ["Cmaj7", "115.50"], ["Dmin7", "115.50"], ["Fmaj7", "115.75"], ["Cmaj7", "116.00"], ["Cmaj7", "116.25"], ["Fmaj7", "116.25"], ["Dmin7", "116.50"], ["Cmaj7", "116.75"], ["Cmaj7", "117.25"], ["Amin7", "117.75"], ["Amin7", "118.00"], ["Cmaj7", "118.00"], ["Fmaj7", "118.25"], ["Dmin7", "118.25"], ["Cmaj7", "119.25"], ["Cmaj7", "119.25"], ["Fmaj7", "119.25"], ["Fmaj7", "119.50"], ["Cmaj7", "120.00"], ["Cmaj7", "120.00"], ["Amin7", "120.25"], ["Fmaj7", "120.25"], ["Dmin7", "120.25"], ["Fmaj7", "120.50"], ["Cmaj7", "120.50"], ["Emin7", "120.75"], ["Dmin7", "120.75"], ["Cmaj7", "121.00"], ["Dmin7", "121.25"], ["Emin7", "122.25"], ["Cmaj7", "122.75"], ["Fmaj7", "123.00"], ["Amin7", "123.50"], ["Cmaj7", "124.00"], ["Cmaj7", "124.00"], ["Fmaj7", "124.25"], ["Emin7", "124.25"], ["Cmaj7", "124.75"], ["Fmaj7", "126.25"], ["Cmaj7", "128.25"], ["Fmaj7", "128.50"], ["Amin7", "129.00"], ["Cmaj7", "129.25"], ["Fmaj7", "129.50"], ["Emin7", "129.75"], ["Cmaj7", "130.00"], ["Fmaj7", "130.50"], ["Amin7", "130.75"], ["Emin7", "131.75"], ["Cmaj7", "132.25"], ["Dmin7", "132.50"], ["Cmaj7", "134.75"], ["Cmaj7", "138.25"]],"02_20.wav":[["Dmin7","0.00"],["Gdom7","6.00"],["Dmin7","7.25"],["Cmaj7","7.75"],["Dmin7","8.00"],["Cmaj7","11.00"],["Fmaj7","11.50"],["Gdom7","15.25"],["Cmaj7","27.25"],["Fmaj7","27.50"],["Emin7","28.25"],["Dmin7","29.00"],["Amin7","29.25"],["Fmaj7","31.75"],["Cmaj7","33.75"],["Fmaj7","34.75"],["Gdom7","38.50"],["Cmaj7","39.25"],["Dmin7","39.50"],["Cmaj7","40.00"],["Fmaj7","40.25"],["Cmaj7","40.75"],["Dmin7","41.00"],["Gdom7","46.50"],["Cmaj7","47.00"],["Dmin7","47.25"],["Cmaj7","47.50"],["Dmin7","47.75"],["Emin7","48.50"],["Fmaj7","57.00"],["Cmaj7","57.75"],["Fmaj7","58.00"],["Cmaj7","60.00"],["Dmin7","60.50"],["Gdom7","65.75"],["Cmaj7","66.00"],["Dmin7","66.25"],["Cmaj7","67.50"],["Fmaj7","67.75"],["Cmaj7","69.75"],["Fmaj7","70.50"],["Emin7","74.00"],["Dmin7","74.75"],["Cmaj7","75.25"],["Fmaj7","75.50"],["Cmaj7","75.75"],["Fmaj7","76.00"],["Cmaj7","77.00"],["Dmin7","77.25"],["Cmaj7","78.75"],["Dmin7","79.00"],["Cmaj7","80.75"],["Fmaj7","81.00"],["Cmaj7","82.25"],["Dmin7","82.50"],["Gdom7","87.50"],["Cmaj7","90.50"],["Dmin7","90.75"],["Cmaj7","92.00"],["Fmaj7","92.25"],["Emin7","93.00"],["Cmaj7","97.50"],["Dmin7","97.75"],["Cmaj7","101.00"],["Dmin7","101.25"],["Cmaj7","102.25"],["Fmaj7","102.50"],["Cmaj7","103.00"],["Fmaj7","103.25"],["Cmaj7","107.75"],["Fmaj7","108.00"],["Cmaj7","108.50"],["Dmin7","108.75"],["Cmaj7","109.25"],["Emin7","111.75"],["Cmaj7","117.25"],["Amin7","118.00"],["Fmaj7","118.25"],["Cmaj7","119.25"]],"02_21.wav":[["Dmin7","0.00"],["Gdom7","4.50"],["Cmaj7","11.50"],["Fmaj7","11.75"],["Gdom7","17.00"],["Cmaj7","20.00"],["Dmin7","20.50"],["Cmaj7","22.75"],["Dmin7","23.50"],["Cmaj7","23.75"],["Dmin7","24.00"],["Cmaj7","25.50"],["Dmin7","25.75"],["Cmaj7","26.50"],["Fmaj7","27.00"],["Amin7","28.75"],["Fmaj7","33.50"],["Cmaj7","33.75"],["Dmin7","34.00"],["Gdom7","37.50"],["Dmin7","39.25"],["Cmaj7","41.25"],["Dmin7","41.75"],["Cmaj7","43.00"],["Fmaj7","43.50"],["Gdom7","47.00"],["Cmaj7","56.25"],["Fmaj7","56.75"],["Cmaj7","57.00"],["Fmaj7","57.25"],["Amin7","58.25"],["Dmin7","61.25"],["Emin7","62.00"],["Cmaj7","62.25"],["Dmin7","62.50"],["Cmaj7","62.75"],["Dmin7","63.75"],["Cmaj7","68.50"],["Fmaj7","68.75"],["Cmaj7","69.50"],["Dmin7","69.75"],["Cmaj7","70.25"],["Fmaj7","70.50"],["Cmaj7","70.75"],["Fmaj7","71.00"],["Cmaj7","72.50"],["Dmin7","73.50"],["Cmaj7","74.50"],["Dmin7","74.75"],["Cmaj7","75.75"],["Dmin7","76.75"],["Amin7","78.00"],["Dmin7","83.25"],["Cmaj7","91.50"],["Fmaj7","91.75"],["Cmaj7","92.25"],["Dmin7","92.50"],["Gdom7","97.50"],["Amin7","97.75"],["Cmaj7","98.00"],["Fmaj7","98.50"],["Amin7","99.00"],["Cmaj7","107.00"],["Fmaj7","107.25"],["Cmaj7","110.75"],["Fmaj7","111.00"],["Cmaj7","113.75"]],"02_22.wav":[["Dmin7","0.00"],["Cmaj7","4.75"],["Fmaj7","5.50"],["Cmaj7","6.25"],["Fmaj7","6.50"],["Cmaj7","7.25"],["Dmin7","7.50"],["Gdom7","9.50"],["Cmaj7","14.00"],["Fmaj7","14.25"],["Cmaj7","14.50"],["Fmaj7","14.75"],["Gdom7","18.50"],["Cmaj7","21.50"],["Dmin7","23.00"],["Cmaj7","23.50"],["Dmin7","24.00"],["Cmaj7","24.25"],["Fmaj7","27.00"],["Cmaj7","27.75"],["Fmaj7","39.25"],["Cmaj7","39.75"],["Dmin7","41.25"],["Gdom7","44.75"],["Cmaj7","51.50"],["Fmaj7","52.00"],["Emin7","53.25"],["Fmaj7","57.75"],["Cmaj7","60.00"],["Dmin7","60.25"],["Cmaj7","63.75"],["Fmaj7","64.00"],["Cmaj7","67.00"],["Fmaj7","67.25"],["Cmaj7","67.75"],["Dmin7","68.00"],["Cmaj7","68.50"],["Dmin7","68.75"],["Cmaj7","72.25"],["Dmin7","72.50"],["Cmaj7","72.75"],["Dmin7","73.00"],["Cmaj7","73.50"],["Dmin7","73.75"],["Cmaj7","74.75"],["Fmaj7","75.00"],["Amin7","77.75"],["Cmaj7","85.75"],["Dmin7","86.00"],["Gdom7","92.50"],["Fmaj7","93.00"],["Cmaj7","94.25"],["Fmaj7","94.50"],["Gdom7","98.75"],["Cmaj7","99.00"],["Fmaj7","99.25"],["Cmaj7","99.50"],["Fmaj7","100.25"],["Emin7","102.25"],["Fmaj7","102.50"],["Emin7","102.75"],["Cmaj7","108.50"],["Emin7","109.00"],["Fmaj7","109.75"],["Amin7","110.00"],["Cmaj7","110.50"],["Fmaj7","110.75"],["Cmaj7","112.25"],["Dmin7","112.50"],["Cmaj7","115.50"],["Fmaj7","115.75"],["Cmaj7","119.25"],["Fmaj7","119.50"],["Amin7","120.25"],["Fmaj7","120.50"],["Emin7","120.75"],["Cmaj7","121.00"],["Dmin7","121.25"],["Amin7","123.50"],["Fmaj7","126.25"],["Amin7","129.00"],["Cmaj7","129.25"],["Fmaj7","129.50"],["Emin7","131.75"],["Cmaj7","132.25"],["Dmin7","132.50"],["Cmaj7","134.75"]],"02_23.wav":[["Fmaj7","0.00"],["Gdom7","7.00"],["Dmin7","13.50"],["Cmaj7","15.25"],["Fmaj7","15.50"],["Amin7","16.50"],["Fmaj7","17.75"],["Cmaj7","20.00"],["Dmin7","20.25"],["Cmaj7","22.75"],["Dmin7","23.50"],["Cmaj7","23.75"],["Fmaj7","24.00"],["Cmaj7","25.50"],["Dmin7","25.75"],["Cmaj7","26.50"],["Fmaj7","26.75"],["Gdom7","30.25"],["Amin7","35.25"],["Dmin7","35.75"],["Amin7","36.25"],["Fmaj7","36.50"],["Emin7","37.75"],["Cmaj7","42.00"],["Dmin7","42.25"],["Cmaj7","42.50"],["Fmaj7","42.75"],["Cmaj7","45.00"],["Fmaj7","45.25"],["Cmaj7","46.25"],["Dmin7","46.50"],["Cmaj7","46.75"],["Fmaj7","47.00"],["Cmaj7","48.50"],["Dmin7","48.75"],["Cmaj7","53.75"],["Fmaj7","54.50"],["Cmaj7","56.50"],["Dmin7","56.75"],["Amin7","60.00"],["Cmaj7","67.75"],["Emin7","68.00"],["Cmaj7","69.00"],["Fmaj7","69.25"],["Cmaj7","69.75"],["Dmin7","70.00"],["Gdom7","77.00"],["Cmaj7","77.25"],["Dmin7","77.50"],["Cmaj7","77.75"],["Dmin7","81.25"],["Cmaj7","81.50"]],"02_24.wav":[["Dmin7","0.00"],["Gdom7","3.75"],["Dmin7","8.25"],["Cmaj7","8.75"],["Dmin7","9.00"],["Amin7","10.25"],["Fmaj7","13.50"],["Cmaj7","16.00"],["Fmaj7","16.75"],["Cmaj7","19.75"],["Fmaj7","20.50"],["Cmaj7","24.75"],["Dmin7","25.00"],["Cmaj7","31.50"],["Fmaj7","32.00"],["Cmaj7","36.00"],["Dmin7","36.50"],["Cmaj7","41.25"],["Fmaj7","41.50"],["Gdom7","45.25"],["Cmaj7","54.00"],["Dmin7","54.75"],["Cmaj7","56.00"],["Fmaj7","56.25"],["Amin7","58.25"],["Cmaj7","58.50"],["Dmin7","59.00"],["Cmaj7","59.50"],["Dmin7","60.25"],["Cmaj7","60.50"],["Dmin7","61.50"],["Amin7","61.75"],["Dmin7","66.75"],["Cmaj7","68.25"],["Fmaj7","68.50"],["Cmaj7","77.50"],["Dmin7","77.75"],["Amin7","81.75"],["Cmaj7","82.25"],["Dmin7","82.50"],["Emin7","82.75"],["Dmin7","83.25"],["Amin7","83.50"],["Dmin7","90.00"],["Emin7","90.25"],["Dmin7","92.75"],["Cmaj7","93.25"],["Dmin7","94.75"],["Cmaj7","97.00"]],"02_25.wav":[["Fmaj7","0.00"],["Gdom7","8.75"],["Cmaj7","18.25"],["Fmaj7","18.50"],["Emin7","20.00"],["Dmin7","20.25"],["Cmaj7","21.75"],["Fmaj7","22.00"],["Cmaj7","24.25"],["Fmaj7","24.75"],["Cmaj7","26.50"],["Dmin7","26.75"],["Cmaj7","27.00"],["Fmaj7","27.25"],["Cmaj7","28.25"],["Dmin7","29.25"],["Cmaj7","30.50"],["Dmin7","31.25"],["Cmaj7","32.50"],["Fmaj7","33.25"],["Cmaj7","36.25"],["Dmin7","36.75"],["Cmaj7","37.75"],["Dmin7","38.00"],["Amin7","38.75"],["Dmin7","42.25"],["Gdom7","48.75"],["Fmaj7","49.50"],["Gdom7","50.00"],["Cmaj7","50.25"],["Dmin7","50.50"],["Cmaj7","52.25"],["Dmin7","52.50"],["Amin7","63.50"],["Dmin7","76.25"],["Cmaj7","81.00"],["Dmin7","81.25"],["Cmaj7","83.50"],["Fmaj7","83.75"],["Cmaj7","86.00"],["Dmin7","86.25"],["Cmaj7","88.25"],["Fmaj7","88.50"],["Amin7","89.50"],["Cmaj7","89.75"],["Amin7","90.00"],["Fmaj7","96.75"],["Emin7","97.25"],["Dmin7","97.50"],["Cmaj7","97.75"],["Fmaj7","98.00"],["Cmaj7","103.50"]],"02_26.wav":[["Fmaj7","0.00"],["Gdom7","7.00"],["Cmaj7","11.00"],["Fmaj7","11.25"],["Cmaj7","13.50"],["Dmin7","14.50"],["Cmaj7","17.50"],["Fmaj7","17.75"],["Gdom7","20.25"],["Cmaj7","24.25"],["Fmaj7","24.75"],["Gdom7","28.00"],["Cmaj7","37.00"],["Dmin7","37.50"],["Emin7","38.25"],["Dmin7","48.50"],["Cmaj7","50.25"],["Fmaj7","50.50"],["Cmaj7","56.75"],["Fmaj7","57.00"],["Cmaj7","57.25"],["Fmaj7","57.75"],["Cmaj7","60.25"],["Dmin7","60.50"],["Cmaj7","61.25"],["Dmin7","61.50"],["Amin7","63.50"],["Cmaj7","63.75"],["Emin7","64.25"],["Cmaj7","72.50"],["Dmin7","72.75"],["Cmaj7","76.50"],["Dmin7","76.75"],["Cmaj7","80.75"],["Dmin7","81.00"],["Cmaj7","81.75"],["Dmin7","82.50"],["Cmaj7","83.25"],["Dmin7","83.50"],["Cmaj7","84.75"]],"02_27.wav":[["Fmaj7","0.00"],["Cmaj7","5.00"],["Fmaj7","6.00"],["Gdom7","8.25"],["Cmaj7","13.75"],["Dmin7","14.00"],["Cmaj7","17.75"],["Dmin7","18.25"],["Cmaj7","18.75"],["Fmaj7","19.00"],["Cmaj7","21.00"],["Fmaj7","21.25"],["Emin7","25.25"],["Dmin7","25.50"],["Emin7","25.75"],["Fmaj7","26.00"],["Amin7","26.25"],["Fmaj7","28.25"],["Emin7","29.50"],["Dmin7","29.75"],["Amin7","30.00"],["Dmin7","30.25"],["Cmaj7","32.50"],["Dmin7","34.00"],["Amin7","35.00"],["Dmin7","35.50"],["Amin7","35.75"],["Fmaj7","38.25"],["Cmaj7","40.50"],["Dmin7","40.75"],["Cmaj7","46.25"],["Fmaj7","46.75"],["Cmaj7","51.50"],["Dmin7","54.25"],["Cmaj7","54.75"],["Dmin7","55.00"],["Cmaj7","55.25"],["Fmaj7","56.75"],["Cmaj7","58.00"],["Dmin7","64.25"],["Amin7","64.50"],["Dmin7","65.50"],["Emin7","65.75"],["Cmaj7","66.00"],["Amin7","66.25"],["Fmaj7","67.25"],["Cmaj7","68.75"],["Dmin7","69.00"],["Cmaj7","69.25"],["Dmin7","69.75"],["Cmaj7","70.25"],["Dmin7","70.50"],["Gdom7","73.50"],["Fmaj7","83.00"],["Amin7","85.50"],["Dmin7","86.00"],["Cmaj7","86.25"],["Dmin7","86.75"],["Cmaj7","88.00"],["Dmin7","88.25"],["Amin7","90.50"],["Fmaj7","93.00"],["Cmaj7","94.00"],["Dmin7","94.25"],["Cmaj7","94.50"],["Dmin7","95.00"],["Cmaj7","96.75"],["Fmaj7","97.00"],["Cmaj7","97.25"],["Dmin7","97.50"],["Cmaj7","97.75"],["Dmin7","98.00"],["Cmaj7","100.25"],["Dmin7","100.50"],["Cmaj7","102.50"],["Fmaj7","102.75"],["Cmaj7","104.00"],["Fmaj7","104.25"],["Amin7","106.75"],["Dmin7","108.75"],["Emin7","109.25"],["Cmaj7","109.50"],["Dmin7","109.75"],["Emin7","110.25"],["Fmaj7","114.75"],["Amin7","115.25"],["Dmin7","115.50"],["Cmaj7","120.00"],["Fmaj7","120.25"],["Cmaj7","120.50"],["Dmin7","120.75"],["Cmaj7","122.75"],["Fmaj7","123.00"],["Cmaj7","124.00"],["Fmaj7","124.25"],["Cmaj7","124.75"]],"02_28.wav":[["Fmaj7","0.00"],["Cmaj7","5.00"],["Fmaj7","5.25"],["Cmaj7","8.00"],["Dmin7","8.25"],["Gdom7","11.50"],["Cmaj7","14.25"],["Dmin7","14.50"],["Cmaj7","14.75"],["Dmin7","15.00"],["Cmaj7","17.50"],["Fmaj7","17.75"],["Cmaj7","18.00"],["Dmin7","18.25"],["Amin7","19.25"],["Fmaj7","19.50"],["Amin7","19.75"],["Fmaj7","21.75"],["Cmaj7","22.25"],["Fmaj7","22.75"],["Cmaj7","27.50"],["Fmaj7","27.75"],["Gdom7","31.75"],["Cmaj7","38.25"],["Dmin7","38.75"],["Cmaj7","42.75"],["Dmin7","43.00"],["Cmaj7","43.25"],["Dmin7","43.50"],["Cmaj7","43.75"],["Fmaj7","44.25"],["Cmaj7","44.75"],["Dmin7","45.25"],["Cmaj7","45.75"],["Fmaj7","46.25"],["Emin7","48.25"],["Dmin7","54.00"],["Cmaj7","62.00"],["Dmin7","62.25"],["Cmaj7","62.50"],["Fmaj7","63.25"],["Cmaj7","63.50"],["Dmin7","63.75"],["Cmaj7","64.25"],["Dmin7","64.50"],["Cmaj7","66.25"],["Fmaj7","66.50"],["Cmaj7","69.50"],["Dmin7","71.00"],["Cmaj7","72.00"],["Dmin7","72.25"],["Amin7","72.50"],["Cmaj7","72.75"],["Dmin7","73.25"],["Amin7","73.50"],["Cmaj7","75.50"],["Fmaj7","77.50"],["Fmaj7","83.00"],["Gdom7","85.50"],["Cmaj7","88.00"],["Fmaj7","88.50"],["Cmaj7","91.00"],["Dmin7","91.25"],["Cmaj7","92.25"],["Fmaj7","92.50"],["Cmaj7","95.00"],["Dmin7","95.25"],["Cmaj7","97.25"],["Dmin7","97.75"],["Amin7","98.50"],["Fmaj7","103.50"],["Cmaj7","106.75"],["Dmin7","107.25"],["Cmaj7","108.50"],["Dmin7","108.75"],["Gdom7","111.75"],["Fmaj7","112.75"],["Cmaj7","113.25"],["Dmin7","114.25"],["Cmaj7","116.25"],["Dmin7","116.50"],["Cmaj7","116.75"],["Dmin7","118.25"],["Cmaj7","120.00"],["Dmin7","120.25"],["Emin7","122.25"],["Cmaj7","124.00"],["Emin7","124.25"]],"02_29.wav":[["Dmin7","0.00"],["Cmaj7","4.00"],["Fmaj7","12.50"],["Gdom7","14.50"],["Cmaj7","20.25"],["Dmin7","20.50"],["Cmaj7","22.50"],["Dmin7","22.75"],["Amin7","25.00"],["Fmaj7","29.00"],["Emin7","29.75"],["Fmaj7","30.00"],["Gdom7","32.50"],["Cmaj7","34.75"],["Dmin7","36.00"],["Cmaj7","36.25"],["Fmaj7","36.50"],["Cmaj7","36.75"],["Dmin7","37.00"],["Cmaj7","37.50"],["Fmaj7","37.75"],["Gdom7","40.75"],["Cmaj7","44.00"],["Fmaj7","44.50"],["Cmaj7","45.25"],["Fmaj7","45.50"],["Cmaj7","46.25"],["Fmaj7","46.50"],["Emin7","48.25"],["Fmaj7","55.25"],["Emin7","55.50"],["Cmaj7","55.75"],["Fmaj7","56.00"],["Gdom7","61.50"],["Cmaj7","62.00"],["Dmin7","62.50"],["Cmaj7","63.25"],["Fmaj7","63.75"],["Cmaj7","64.75"],["Fmaj7","65.25"],["Cmaj7","65.50"],["Fmaj7","66.00"],["Cmaj7","67.00"],["Dmin7","67.75"],["Cmaj7","69.75"],["Dmin7","70.25"],["Cmaj7","71.50"],["Fmaj7","71.75"],["Cmaj7","75.75"],["Fmaj7","76.25"],["Gdom7","80.25"],["Cmaj7","81.50"],["Dmin7","81.75"],["Emin7","82.50"],["Fmaj7","90.75"],["Gdom7","96.25"],["Cmaj7","101.75"],["Dmin7","102.00"],["Amin7","106.50"],["Cmaj7","113.25"],["Fmaj7","114.50"],["Cmaj7","116.00"],["Fmaj7","116.25"],["Amin7","117.75"],["Cmaj7","118.00"],["Fmaj7","119.25"],["Cmaj7","128.25"],["Fmaj7","128.50"],["Emin7","129.75"],["Cmaj7","130.00"],["Fmaj7","130.50"],["Amin7","130.75"],["Cmaj7","138.25"]],"03_01.wav":[["Dmin7","0.00"],["Gdom7","4.75"],["Dmin7","8.50"],["Gdom7","9.00"],["Dmin7","13.00"],["Cmaj7","13.25"],["Fmaj7","13.50"],["Amin7","14.25"],["Dmin7","17.25"],["Cmaj7","20.00"],["Fmaj7","20.25"],["Gdom7","22.75"],["Cmaj7","24.50"],["Dmin7","24.75"],["Cmaj7","25.00"],["Fmaj7","25.25"],["Gdom7","27.50"],["Cmaj7","30.00"],["Dmin7","30.50"],["Cmaj7","31.50"],["Dmin7","31.75"],["Cmaj7","33.50"],["Fmaj7","34.00"],["Cmaj7","34.50"],["Dmin7","34.75"],["Emin7","36.50"],["Dmin7","42.00"],["Gdom7","50.25"],["Emin7","57.75"],["Cmaj7","58.00"],["Fmaj7","58.25"],["Cmaj7","58.50"],["Fmaj7","59.00"],["Cmaj7","59.50"],["Fmaj7","59.75"],["Emin7","60.25"],["Fmaj7","64.25"],["Amin7","64.75"],["Cmaj7","66.00"],["Dmin7","66.75"],["Cmaj7","69.50"],["Fmaj7","70.00"],["Cmaj7","70.25"],["Fmaj7","70.50"],["Cmaj7","74.75"],["Dmin7","75.25"],["Cmaj7","76.25"],["Dmin7","77.75"],["Amin7","79.00"],["Fmaj7","87.75"],["Cmaj7","89.50"],["Dmin7","90.25"],["Cmaj7","92.75"]],"03_02.wav":[["Dmin7","0.00"],["Gdom7","5.50"],["Cmaj7","12.25"],["Dmin7","12.50"],["Cmaj7","15.00"],["Fmaj7","15.75"],["Cmaj7","17.25"],["Fmaj7","17.50"],["Cmaj7","18.75"],["Fmaj7","19.00"],["Gdom7","21.25"],["Cmaj7","26.00"],["Dmin7","26.25"],["Cmaj7","29.25"],["Fmaj7","29.50"],["Emin7","30.75"],["Cmaj7","37.50"],["Fmaj7","38.00"],["Cmaj7","40.00"],["Dmin7","40.25"],["Gdom7","48.25"],["Cmaj7","49.00"],["Fmaj7","49.75"],["Cmaj7","51.50"],["Dmin7","51.75"],["Cmaj7","52.00"],["Fmaj7","52.25"],["Cmaj7","56.25"],["Fmaj7","56.75"],["Amin7","58.75"],["Cmaj7","67.25"]]
  };

  interface ChordSleepMap {
    [key: string]: string;
  }

  let chord_to_sleep_map: ChordSleepMap = {
    'Gdom7': 'deep', 
    'Dmin7': 'light', 
    'Fmaj7': 'light',
    'Amin7': 'rem', 
    'Emin7': 'rem',
    'Cmaj7': 'awake'
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    };
  }, []);


  const handlePlay = () => {
    
    setIsPlaying(true);
    
    if (intervalRef.current !== null) {
      intervalRef.current = setInterval(() => {

        wavesurferRef.current!.seekTo(audioRef.current!.currentTime / audioRef.current!.duration);

        if (audioSrc) {
          // Find the stage with the elapsed time closest to the current time
          for (let i = data[audioSrc].length - 1; i >= 0; i--) {
            if (parseFloat(data[audioSrc][i][1]) < audioRef.current!.currentTime) {
              setSleepStage(chord_to_sleep_map[data[audioSrc][i][0]] + ' / ' + data[audioSrc][i][0]);
              break;
            }
          }
        } else {
          setSleepStage('No data available');
        }
      }, 10);
    }

    wavesurferRef.current!.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    setSleepStage('Paused...');
    clearInterval(intervalRef.current);

    wavesurferRef.current!.pause();
  };

  const handleAudioChange = (src: string) => {

    setAudioSrc(src);
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setSleepStage('Press Play...');

    const audioMotionMain = new AudioMotionAnalyzer(
      {
        source: audioRef.current!,
  
        // Config
        mode: 3,
        volume: 1,
        colorMode: 'bar-level',
        gradient: 'prism',
        gradientLeft: 'prism',
        gradientRight: 'rainbow',
        channelLayout: 'dual-horizontal',
  
        // FFT
        fftSize: 8192,
        smoothing: 0.5,
  
        // Frequency range & scaling
        minFreq: 20,
        maxFreq: 22000,
        frequencyScale: 'log',
  
        // Sensitivity
        weightingFilter: '',
        minDecibels: -85,
        maxDecibels: -25,
  
        // Linear amplitude
        linearAmplitude: false,
        linearBoost: 1,
  
        // Overlay mode
        overlay: false,
        bgAlpha: 0.7,
  
        // Mode 1-8 / Bar options
        barSpace: 0.1,
  
        // Mode 10 / outlineBars
        lineWidth: 0,
        fillAlpha: 1,
  
        // Radial spectrum
        radial: true,
        radialInvert: true,
        radius: 1,
        spinSpeed: 0,
  
        // Reflex & Mirror
        reflexRatio: 0.1,
        reflexAlpha: 1,
        reflexBright: 0.6,
        reflexFit: true,
        mirror: 0,
  
        // Switches & Read-Only Flags
        alphaBars: false,
        ansiBands: false,
        ledBars: false,
        loRes: false,
        lumiBars: false,
        noteLabels: false,
        outlineBars: false,
        peakLine: false,
        roundBars: false,
        splitGradient: false,
        trueLeds: false,
        showBgColor: false,
        showPeaks: true,
        showScaleX: false,
        showScaleY: false,
  
        audioCtx: undefined, // constructor only
        maxFPS: 0,
        canvas: canvasRefMain.current!, // constructor only
        connectSpeakers: true, // constructor only
        fsElement: undefined, // constructor only
        width: undefined,
        onCanvasDraw: undefined,
        onCanvasResize: undefined,
        start: true, // constructor only
        useCanvas: true
      }
    );

    const audioMotionTop = new AudioMotionAnalyzer(
      {
        source: audioRef.current!,
  
        // Config
        mode: 10,
        volume: 1,
        colorMode: 'gradient',
        gradient: 'steelblue',
        gradientLeft: 'steelblue',
        gradientRight: 'orangered',
        channelLayout: 'dual-combined',
  
        // FFT
        fftSize: 8192,
        smoothing: 0.5,
  
        // Frequency range & scaling
        minFreq: 30,
        maxFreq: 16000,
        frequencyScale: 'log',
  
        // Sensitivity
        weightingFilter: 'D',
        minDecibels: -85,
        maxDecibels: -25,
  
        // Linear amplitude
        linearAmplitude: true,
        linearBoost: 1.2,
  
        // Overlay mode
        overlay: false,
        bgAlpha: 0.7,
  
        // Mode 1-8 / Bar options
        barSpace: 0.1,
  
        // Mode 10 / outlineBars
        lineWidth: 0,
        fillAlpha: 0.3,
  
        // Radial spectrum
        radial: false,
        radialInvert: false,
        radius: 1,
        spinSpeed: 0,
  
        // Reflex & Mirror
        reflexRatio: 0,
        reflexAlpha: 0.15,
        reflexBright: 1,
        reflexFit: true,
        mirror: 0,
  
        // Switches & Read-Only Flags
        alphaBars: false,
        ansiBands: false,
        ledBars: false,
        loRes: false,
        lumiBars: false,
        noteLabels: false,
        outlineBars: false,
        peakLine: true,
        roundBars: false,
        splitGradient: false,
        trueLeds: false,
        showBgColor: true,
        showPeaks: true,
        showScaleX: false,
        showScaleY: false,
  
        audioCtx: undefined, // constructor only
        maxFPS: 0,
        canvas: canvasRefTop.current!, // constructor only
        connectSpeakers: true, // constructor only
        fsElement: undefined, // constructor only
        width: undefined,
        onCanvasDraw: undefined,
        onCanvasResize: undefined,
        start: true, // constructor only
        useCanvas: true
      }
    );

    const audioMotionBot = new AudioMotionAnalyzer(
      {
        source: audioRef.current!,
  
        // Config
        mode: 2,
        volume: 1,
        colorMode: 'bar-level',
        gradient: 'prism',
        gradientLeft: 'prism',
        gradientRight: 'prism',
        channelLayout: 'dual-vertical',
  
        // FFT
        fftSize: 8192,
        smoothing: 0.5,
  
        // Frequency range & scaling
        minFreq: 30,
        maxFreq: 16000,
        frequencyScale: 'log',
  
        // Sensitivity
        weightingFilter: 'D',
        minDecibels: -60,
        maxDecibels: -30,
  
        // Linear amplitude
        linearAmplitude: false,
        linearBoost: 1,
  
        // Overlay mode
        overlay: false,
        bgAlpha: 0.7,
  
        // Mode 1-8 / Bar options
        barSpace: 0.1,
  
        // Mode 10 / outlineBars
        lineWidth: 0,
        fillAlpha: 1,
  
        // Radial spectrum
        radial: false,
        radialInvert: false,
        radius: 1,
        spinSpeed: 0,
  
        // Reflex & Mirror
        reflexRatio: 0,
        reflexAlpha: 0.15,
        reflexBright: 1,
        reflexFit: true,
        mirror: 0,
  
        // Switches & Read-Only Flags
        alphaBars: false,
        ansiBands: false,
        ledBars: false,
        loRes: false,
        lumiBars: true,
        noteLabels: false,
        outlineBars: false,
        peakLine: false,
        roundBars: false,
        splitGradient: false,
        trueLeds: false,
        showBgColor: false,
        showPeaks: false,
        showScaleX: false,
        showScaleY: false,
  
        audioCtx: undefined, // constructor only
        maxFPS: 0,
        canvas: canvasRefBot.current!, // constructor only
        connectSpeakers: true, // constructor only
        fsElement: undefined, // constructor only
        width: undefined,
        onCanvasDraw: undefined,
        onCanvasResize: undefined,
        start: true, // constructor only
        useCanvas: true
      }
    );

    const audioMotionLine = new AudioMotionAnalyzer(
      {
        source: audioRef.current!,
  
        // Config
        mode: 1,
        volume: 1,
        colorMode: 'bar-level',
        gradient: 'prism',
        gradientLeft: 'prism',
        gradientRight: 'prism',
        channelLayout: 'dual-combined',
  
        // FFT
        fftSize: 8192,
        smoothing: 0.5,
  
        // Frequency range & scaling
        minFreq: 20,
        maxFreq: 22000,
        frequencyScale: 'log',
  
        // Sensitivity
        weightingFilter: 'D',
        minDecibels: -85,
        maxDecibels: -25,
  
        // Linear amplitude
        linearAmplitude: true,
        linearBoost: 2.7,
  
        // Overlay mode
        overlay: false,
        bgAlpha: 0.7,
  
        // Mode 1-8 / Bar options
        barSpace: 0.1,
  
        // Mode 10 / outlineBars
        lineWidth: 0,
        fillAlpha: 1,
  
        // Radial spectrum
        radial: false,
        radialInvert: false,
        radius: 0.85,
        spinSpeed: 0,
  
        // Reflex & Mirror
        reflexRatio: 0.1,
        reflexAlpha: 1,
        reflexBright: 0.6,
        reflexFit: true,
        mirror: 0,
  
        // Switches & Read-Only Flags
        alphaBars: false,
        ansiBands: false,
        ledBars: false,
        loRes: false,
        lumiBars: false,
        noteLabels: false,
        outlineBars: false,
        peakLine: false,
        roundBars: false,
        splitGradient: false,
        trueLeds: false,
        showBgColor: false,
        showPeaks: false,
        showScaleX: true,
        showScaleY: false,
  
        audioCtx: undefined, // constructor only
        maxFPS: 0,
        canvas: canvasRefLine.current!, // constructor only
        connectSpeakers: true, // constructor only
        fsElement: undefined, // constructor only
        width: undefined,
        onCanvasDraw: undefined,
        onCanvasResize: undefined,
        start: true, // constructor only
        useCanvas: true
      }
    );

    wavesurferRef.current?.destroy();

    wavesurferRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      url: './ropd/' + src,
    });

    wavesurferRef.current.setMuted(true);

    const wsRegions = wavesurferRef.current.registerPlugin(RegionsPlugin.create())

    // Add region for each sleep stage
    for (let i = 0; i < data[src].length; i++) {
      wavesurferRef.current.on('decode', () => {
        wsRegions.addRegion({
          start: parseFloat(data[src][i][1]),
          end: parseFloat(data[src][i+1][1]),
          content: ' ',
          drag: false,
          resize: false,
          color: chord_to_sleep_map[data[src][i][0]] === 'awake' ? 'rgba(255, 0, 0, 0.5)' : chord_to_sleep_map[data[src][i][0]] === 'light' ? 'rgba(0, 0, 255, 0.5)' : chord_to_sleep_map[data[src][i][0]] === 'deep' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 255, 0, 0.5)',
        });
      });
    }
  };

  return (
    <main className=''>
      
      <div className='flex h-screen flex-col items-center justify-between pt-24 pb-24 pl-10 pr-10 bg-black text-white'>
        <h1 className='text-4xl text-center'>
          Sleep Data as Audio Waveforms
        </h1>
        <p className='text-center mb-7'>
          Representations of Personal Data Assignment for CS 8803 CDP (Spring &lsquo;24) @ GeorgiaTech
        </p>
        <div className='flex flex-col items-center mb-5 w-full'>

          <div className='grid landscape:grid-cols-5 landscape:grid-rows-5 portrait:grid-cols-2 portrait:grid-rows-7 landscape:gap-4 portrait:gap-2 mb-5 w-full max-h-[50vh]'>
            <div className='landscape:row-span-2 landscape:col-span-3 portrait:row-span-3 portrait:col-span-2 '>
              <div className='w-full h-full relative'>
                <canvas ref={canvasRefMain} className='w-full h-full absolute'></canvas>
                <div className='w-full absolute top-[45%] text-center'>{sleepStage}</div>
              </div>
            </div>
            <div className='landscape:row-span-1 landscape:col-span-2 portrait:row-span-1 portrait:col-span-1 border'><canvas ref={canvasRefTop} className='w-full'></canvas></div>
            <div className='landscape:row-span-1 landscape:col-span-2 portrait:row-span-1 portrait:col-span-1 border'><canvas ref={canvasRefBot} className='w-full'></canvas></div>
            <div className='landscape:row-span-1 landscape:col-span-5 portrait:row-span-1 portrait:col-span-2 border'><canvas ref={canvasRefLine} className='w-full'></canvas></div>
            <div id='waveform' className='landscape:row-span-2 landscape:col-span-5 portrait:col-span-2 portrait:row-span-2'></div>
          </div>
          

          <div className='w-full text-white flex'>
            <select className='bg-black p-2 mt-2 mr-2 border' value={audioSrc} onChange={(src: React.ChangeEvent<HTMLSelectElement>) => handleAudioChange(src.target.value)} >
              <option value='' disabled selected>Select a dataset</option>
              <option value='merged.wav'>All Days Merged</option>
              <option value='02_20.wav'>February 20, 2024</option>
              <option value='02_21.wav'>February 21, 2024</option>
              <option value='02_22.wav'>February 22, 2024</option>
              <option value='02_23.wav'>February 23, 2024</option>
              <option value='02_24.wav'>February 24, 2024</option>
              <option value='02_25.wav'>February 25, 2024</option>
              <option value='02_26.wav'>February 26, 2024</option>
              <option value='02_27.wav'>February 27, 2024</option>
              <option value='02_28.wav'>February 28, 2024</option>
              <option value='02_29.wav'>February 29, 2024</option>
              <option value='03_01.wav'>March 1, 2024</option>
              <option value='03_02.wav'>March 2, 2024</option>
            </select>
            <audio className='w-full' ref={audioRef} src={'./ropd/' +  audioSrc} onPause={handlePause} onPlay={handlePlay} id='audio' controls crossOrigin='anonymous'>
              {/* <source  type='audio/wav' /> */}
              Your browser does not support the audio element.
            </audio>
          </div>

          <div className='absolute bottom-0 left-0 right-0 flex justify-center mb-5'>
            <a href='#process' className='flex flex-col items-center justify-center'>
              <svg className='w-6 h-6 text-white animate-bounce' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 13l-7 7-7-7m14-8l-7 7-7-7' />
              </svg>
              <p className='text-white font-mono'>Scroll Down</p>
            </a>
          </div>
        </div>
      </div>

      <div id='process' className='flex flex-col items-center justify-between pt-6 pb-24 pl-10 pr-10 bg-neutral-900 text-white'>
        <h1 className='text-4xl text-center pb-6'>
          Process
        </h1>
        
        <Gallery />

      </div>

    </main>
  );
}
