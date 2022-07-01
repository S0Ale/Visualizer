// Bar class
export default class Bar{
  constructor(x, y, width){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;
    this.color = 'white';
  }

  update(newH){
    this.height = newH;
  }

  render(ctx){
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.color;
    ctx.fillStyle = '#ff8e32';

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    if(this.height > 0) ctx.lineTo(this.x, this.y - this.height);
    ctx.closePath();

    ctx.stroke();
  }

  setColor(color){
    this.color = color;
  }
}
