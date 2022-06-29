const AUDIO_SAMPLES = 64;

let audio1 = $('#audio1')[0];
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
  let data = new Uint8Array(bufferLength);

  const barWidth = canvas.width/bufferLength;
  let barHeight, x;

  function animate(){
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(data);

    for(let i = 0; i < bufferLength; i++){
      barHeight = data[i];
      ctx.fillStyle = 'white';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }

    requestAnimationFrame(animate);
  }
  animate();
});
