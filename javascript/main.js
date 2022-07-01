import Visualiser from './Visualiser.js'
import AudioPlayer from './AudioPlayer.js'

const AUDIO_SAMPLES = 2048;
const fileInput = $('#audioupload');
const canvas = $('#canvas')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let visual = new Visualiser(canvas, AUDIO_SAMPLES, 0, 5, '#a353fc');
let player = new AudioPlayer('#song');

player.onPlayEvent(() => {
  visual.start();
});
player.onPauseEvent(() => {
  visual.stop();
});
player.setVolume(.3);

fileInput.on('change', function(){
  const files = this.files;
  if(player.isPlaying()) player.pause();
  player.loadAudio(URL.createObjectURL(files[0]));
  visual.prepareAudio(player.getAudio());
});
