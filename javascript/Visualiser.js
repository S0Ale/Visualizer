// Visualiser class
export default class Visualizer{
  constructor(canvas, samples){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.samples = samples;
    this.bufferSize = 0;
    this.data = null;
    this.barWidth = 0;

    this.endRender = true;
  }

  // Methods
  loadAudio(resource){
    this.audio = new Audio();
    this.audio.src = resource;
    this.audio.load();
  }

  prepareAudio(){
    this.audioContext = new AudioContext();
    let audioSrc = this.audioContext.createMediaElementSource(this.audio);

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = this.samples;
    audioSrc.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.bufferSize = this.analyser.frequencyBinCount;
    this.data = new Uint8Array(this.bufferSize);

    this.barWidth = this.canvas.width/this.bufferSize;
  }

  start(){
    this.endRender = false;
    let barHeight, x, thisClass = this;

    function render(){
      console.log(thisClass.barWidth);
      x = 0;
      thisClass.context.clearRect(0, 0, thisClass.canvas.width, thisClass.canvas.height);
      thisClass.analyser.getByteFrequencyData(thisClass.data);

      for(let i = 0; i < thisClass.bufferSize; i++){
        barHeight = thisClass.data[i] * 2;
        thisClass.context.fillStyle = 'white';
        thisClass.context.fillRect(x, thisClass.canvas.height - barHeight, thisClass.barWidth, barHeight);
        x += thisClass.barWidth;
      }

      if(!thisClass.endRender) requestAnimationFrame(render);
    };
    render();
  }

  stop(){
    this.endRender = true;
  }

  // Getters and Setters
  set audioVolume(v){
    this.audio.volume = v;
  }
  set audioSamples(s){
    this.samples = s;
  }
  set bWidth(w){
    this.barWidth = w;
  }
  //----
  get currentAudio(){
    return this.audio;
  }
  get isRendering(){
    return !this.endRender;
  }
}
