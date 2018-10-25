var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

class Bubble {
  constructor(ctx, speed, letter) {
    this.radius = 30;
    this.ctx = ctx;
    var ran1 = Math.random()
    var ran2 = Math.random()
    var ranletter = Math.floor(ran1 * alphabet.length)
    var ranx = Math.floor(ran1 * (this.ctx.canvas.width - this.radius * 3) + this.radius * 2)
    var rany = Math.floor(ran2 * (this.ctx.canvas.height - this.radius * 3) + this.radius * 2)
    var ranxspeed = ran2 * 1
    var ranyspeed = (ran2 / 1.5 * speed) + 0.1
    this.letter = letter || alphabet[ranletter]
    this.x = ranx
    this.y = rany
    this.vx = ranxspeed
    this.vy = ranyspeed
    this.scolor = "blue"
    this.fcolor = "rgba(19, 238, 241, 0.5)"
    this.textcolor = "black"
    this.ttl = null
  }
  draw() {
    this.ctx.save()
    if (this.ttl !== null) {
      this.ctx.globalAlpha = 1 - (20 - this.ttl) / 20
      this.radius *= 1.05
      if (this.ttl === 0)
        this.radius = 0
    }
    this.ctx.strokeStyle = this.scolor;
    this.ctx.fillStyle = this.fcolor;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.font = "25px 'Annie Use Your Telescope', cursive"
    this.ctx.fillStyle = this.textcolor
    this.ctx.textAlign = "center"
    this.ctx.fillText(this.letter, this.x, this.y)
    this.ctx.restore()
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.x >= width - this.radius) {
      this.vx -= 2 * this.vx
    }
    if (this.x <= 0 + this.radius) {
      this.vx += -2 * this.vx
    }
    if (this.y >= height - this.radius) {
      this.vy -= 2 * this.vy
    }
    if (this.y <= 0 + this.radius) {
      this.vy += -2 * this.vy
    }
    if (this.ttl && this.ttl != 0) {
      this.ttl--
    }
  }

  onClick() {
    return this.letter
  }

  pop() {
    this.ttl = 20
  }
}