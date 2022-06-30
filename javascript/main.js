import Visualiser from './Visualiser.js'

const AUDIO_SAMPLES = 256;

let container = $('#container');
let canvas = $('#canvas')[0];
let fileInput = $('#audioupload');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let visual = new Visualiser(canvas, AUDIO_SAMPLES, 50, 50);

fileInput.on('change', function(){
  if(visual.isRendering){
    visual.stop();
    visual.currentAudio.pause();
  }
  const files = this.files;
  visual.loadAudio(URL.createObjectURL(files[0]));
  visual.audioVolume = .3;
  visual.prepareAudio();
  visual.currentAudio.play();
  visual.start();
});
