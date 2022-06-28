const AUDIO_SAMPLES = 64;

let audio1 = new Audio();
audio1.src = './res/spell.wav';
const audioCtx = new AudioContext();

let container = $('#container');

let canvas = $('#canvas')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let audioSrc, analyser;

container.on('click', () => {
  audio1.play();
  audioSrc = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  analyser.connect(audioCtx.destination);
  analyser.fftSize = AUDIO_SAMPLES;
  let bufferLength = analyser.frequencyBinCount;
});
