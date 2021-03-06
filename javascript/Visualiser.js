import Bar from './Bar.js'

// Visualiser class
export default class Visualizer{
  constructor(canvas, samples, xStart, yOffset, barColor){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.barColor = barColor;
    this.bars = new Array();

    this.x = xStart;
    this.offset = yOffset;
    this.width = this.canvas.width - this.x;

    this.audioContext = null;
    this.samples = samples;
    this.bufferSize = 0;
    this.data = null;
    this.barWidth = 0;

    this.endRender = true;
    this.animation = null;
  }

  // Methods

  // Analyser setup
  prepareAudio(audio){
    if(this.audioContext) this.audioContext.close();
    this.audioContext = new AudioContext();
    let audioSrc = this.audioContext.createMediaElementSource(audio);

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = this.samples;
    this.analyser.smoothingTimeConstant = .85;
    audioSrc.connect(this.analyser);
    audioSrc.connect(this.audioContext.destination);

    this.bufferSize = this.analyser.frequencyBinCount;
    this.data = new Uint8Array(this.bufferSize);

    this.barWidth = this.width/this.bufferSize;

    // Bars setup
    let x = this.x, offset = this.canvas.height - this.offset;
    for(let i = 0; i < this.bufferSize; i++){
      this.bars.push(new Bar(i*4, offset, this.barWidth * .5));
      //this.bars.push(new Bar(x + i*4 + 1, offset, 2)); TEST
      this.bars[i].setColor(this.barColor);
      x += this.barWidth;
    }
  }

  start(){
    this.endRender = false;
    let thisClass = this;

    function render(){
      thisClass.context.clearRect(0, 0, thisClass.canvas.width, thisClass.canvas.height);
      thisClass.analyser.getByteFrequencyData(thisClass.data);

      for(let i = 0; i < thisClass.bufferSize; i++){
        thisClass.bars[i].update(thisClass.data[i] * 2);
        thisClass.bars[i].render(thisClass.context);
      }

      if(!thisClass.endRender) thisClass.animation = requestAnimationFrame(render);
    };
    render();
  }

  stop(){
    this.endRender = true;
    window.cancelAnimationFrame(this.animation);
  }

  // Getters and Setters
  getAudio(){
    return this.audio;
  }
  isRendering(){
    return !this.endRender;
  }

  //--------------

  setSamples(s){
    this.samples = s;
  }
  setBarWidth(w){
    this.barWidth = w;
  }
}
