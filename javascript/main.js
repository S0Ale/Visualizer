import Visualiser from './Visualiser.js'

const AUDIO_SAMPLES = 256;

let container = $('#container');
let fileInput = $('#audioupload');

let canvas = $('#canvas')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let visual = new Visualiser(canvas, AUDIO_SAMPLES, 0, 50);

fileInput.on('change', function(){
  const files = this.files;
  playAudio(URL.createObjectURL(files[0]));
});

function playAudio(source){
  if(visual.isRendering()){
    visual.stop();
    visual.getAudio().pause();
  }

  visual.loadAudio(source);
  visual.setAudioVolume(.3);
  visual.prepareAudio();

  visual.getAudio().play();
  visual.start();
}
