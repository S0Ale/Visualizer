import Visualiser from './Visualiser.js'

const AUDIO_SAMPLES = 256;

let container = $('#container');
let canvas = $('#canvas')[0];
let fileInput = $('#audioupload');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let visual = new Visualiser(canvas, AUDIO_SAMPLES);

fileInput.on('change', function(){
  //const audioCtx = new AudioContext();
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

  //URL.createObjectURL(files[0])


  /*
  const files = this.files;
  let audio1 = $('#audio1')[0];
  audio1.src = URL.createObjectURL(files[0]);
  audio1.volume = .3;
  audio1.load();
  audio1.play();

  audioSrc = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  audioSrc.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = AUDIO_SAMPLES;
  let bufferLength = analyser.frequencyBinCount;
  let data = new Uint8Array(bufferLength);

  const barWidth = canvas.width/bufferLength;
  let barHeight, x;
  function animate(){
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(data);

    for(let i = 0; i < bufferLength; i++){
      barHeight = data[i] * 2;
      ctx.fillStyle = 'white';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }

    requestAnimationFrame(animate);
  }

  animate();
  */
});
