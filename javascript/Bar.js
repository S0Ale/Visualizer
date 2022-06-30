// Bar class
export default class Bar{
  constructor(x, y, width, strokeWidth){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;

    this.stroke = strokeWidth;
    this.color = 'white';
  }

  update(newH){
    this.height = newH;
  }

  render(ctx){
    ctx.lineWidth = this.stroke;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y - this.height);
    ctx.closePath();
    ctx.stroke();
  }

  setColor(color){
    this.color = color;
  }
}
