import Visualiser from './Visualiser.js'
import AudioPlayer from './AudioPlayer.js'

const AUDIO_SAMPLES = 512;
const fileInput = $('#audioupload');
const canvas = $('#canvas')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let visual = new Visualiser(canvas, AUDIO_SAMPLES, 0, 5, '#ed913b');
let player = new AudioPlayer('#song');

player.onPlayEvent(() => {
  visual.prepareAudio(player.getAudio());
  visual.start();
});
player.onPauseEvent(() => {
  visual.stop();
});
player.setVolume(.3);

fileInput.on('change', function(){
  const files = this.files;
  player.loadAudio(URL.createObjectURL(files[0]));
});
