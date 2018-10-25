class Letter {
  constructor(ctx, letter, y, halfSize, index) {
    this.ctx = ctx
    this.letter = letter
    this.y = y
    this.halfSize = halfSize
    this.letterXdist = 25
    this.index = index || 0;

  }
  draw() {
    this.x = this.letterXdist + (this.index * 50)
    this.y = 340
    this.ctx.font = "35px 'Annie Use Your Telescope', cursive"
    this.ctx.fillText(this.letter, this.x, this.y)
  }
}