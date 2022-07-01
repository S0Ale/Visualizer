let lowVolume = .75;

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

    this.onPlay = null;
    this.onPause = null;

    this.volume = .5;
    this.duration = 0;

    this.playing = false;
  }

  // Init
  initUI(){
    this.player.onloadedmetadata = () => {
      this.duration = this.player.duration;
      this.bar.progressbar('option', {'max' : this.duration});
    };

    this.player.addEventListener('timeupdate', () => {
      this.bar.progressbar('value', this.player.currentTime);
      this.time.text(getTime(this.player.currentTime));
    }, false);

    this.volumeBar.progressbar({value : this.player.volume * 100});
    this.volumeBar.click((e) => {
      let info = getProgressBarClickInfo(this.volumeBar, e);
      this.volumeBar.progressbar('value', info.value);
      this.setVolume(info.value / info.max);
    });
    this.bar.progressbar({value : this.currentTime});

    this.bar.click((e) => {
      let info = getProgressBarClickInfo(this.bar, e);
      this.player.currentTime = this.player.duration / info.max * info.value;
      this.bar.progressbar({value : this.currentTime});
    });

    this.playBtn.click(() => {
      if(!this.player) return;
      this.playing ? this.pause() : this.play();
      $('#play>i').toggleClass('fa-play', this.player.paused);
      $('#play>i').toggleClass('fa-pause', !this.player.paused);
    });

    this.muteBtn.click(() => {
      if(this.player.volume == 0) this.player.volume = lowVolume;
      else{
        lowVolume = this.player.volume;
        this.player.volume = 0;
      }

      this.volumeBar.progressbar('value', this.player.volume * 100);
      $('#mute>i').toggleClass('fa-volume-up', this.player.volume != 0);
      $('#mute>i').toggleClass('fa-volume-off', this.player.volume == 0);
    });
  }

  // Methods
  loadAudio(source){
    this.player.src = source;
    this.player.load();
    this.initUI();
  }

  play(){
    if(this.player && !this.playing){
      if(this.onPlay) this.onPlay();
      this.playing = true;
      this.player.play();
    }
  }

  pause(){
    if(this.playing){
      if(this.onPause) this.onPause();
      this.playing = false;
      this.player.pause();
    }
  }

  // Setters and Getters
  getVolume(){
    return this.player.volume;
  }
  getAudio(){
    return this.player;
  }

  //-----------
  setVolume(v){
    this.player.volume = v;
  }
  onPlayEvent(f){
    this.onPlay = f;
  }
  onPauseEvent(f){
    this.onPause = f;
  }
}

function getTime(t){
  let m=~~(t/60), s=~~(t % 60);
  return (m<10?"0"+m:m)+':'+(s<10?"0"+s:s);
}

function getProgressBarClickInfo(progress_bar, e) {
  let playerOffset = $('.playerCont').position();
  let offset = progress_bar.position();
  let x = e.pageX - offset.left - playerOffset.left; // or e.offsetX (less support, though)
  let y = e.pageY - offset.top - playerOffset.top;  // or e.offsetY
  let max = progress_bar.progressbar("option", "max");
  let value = x * max / progress_bar.width();

  return { x: x, y: y, max: max, value: value };
}
