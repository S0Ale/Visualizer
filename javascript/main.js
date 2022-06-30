import Visualiser from './Visualiser.js'
import AudioPlayer from './AudioPlayer.js'

const AUDIO_SAMPLES = 256;
const fileInput = $('#audioupload');
const canvas = $('#canvas')[0];
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
    visual.getAudio().pause(); // lo deve gestire il player
  }

  // lo deve gestire il player
  let audio = document.querySelector('#song');
  audio.src = source;
  audio.volume = .3;
  audio.load();

  visual.prepareAudio(audio);
  audio.play(); // lo deve gestire il player
  visual.start();
}
