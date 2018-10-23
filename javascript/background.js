class Background {
  constructor(ctx, url) {
    this.ctx=ctx
    this.img = new Image()
    this.img.src = url
    this.x = 0
    this.height = this.ctx.canvas.height
    this.width = this.ctx.canvas.width
  }
  draw() {
    this.ctx.drawImage(this.img,this.x,0,this.width,this.height)
  }
}