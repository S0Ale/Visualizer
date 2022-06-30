// Audio player class
export default class AudioPlayer{
  constructor(playerSelector){
    this.player = $(playerSelector)[0];

    this.container = $('#audio-player');
    this.playBtn = $('#play');
    this.bar = $('#progressbar');
    this.time = $('#time');
    this.muteBtn = $('#mute');
    this.volumeBar = $('#volume');

    this.volume = .5;
    this.duration = 0;

    this.init();
  }

  // Init
  init(){
    this.player.onloadedmetadata = () => {
      this.duration = player.duration;
      this.bar.progressbar('option', {'max' : this.duration});
    };

    this.player.addEventListener('timeupdate', () => {
      this.bar.progressbar('value', this.player.currentTime);
      this.time.text(getTime(this.player.currentTime));
    });
  }

  // Methods
  loadAudio(source){
    this.player.src = source;
    this.player.load();
  }

  play(){
    this.player.play();
  }

  pause(){
    this.player.pause();
  }

  // Setters and Getters
  getVolume(){
    return this.player.volume;
  }

  //-----------
  setVolume(v){
    this.player.volume = v;
  }
}

function getTime(t){
    let m=~~(t/60), s=~~(t % 60);
    return (m<10?"0"+m:m)+':'+(s<10?"0"+s:s);
}
