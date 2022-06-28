let audio1 = new Audio();
audio1.src = './res/spell.wav';

$('#button1').on('click', () => {
  audio1.play();
});
