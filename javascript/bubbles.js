var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

class Bubble {
  constructor (ctx, xspeed, yspeed, letter) {
    this.radius = 30;
    this.ctx = ctx;
    var ran1 = Math.random()
    var ran2 = Math.random()
    var ranletter = Math.floor(ran1*alphabet.length)
    var ranx = Math.floor(ran1*(this.ctx.canvas.width-this.radius*3)+this.radius*2)
    var ranxspeed = ran2*xspeed
    var ranyspeed = ran2*yspeed
    this.letter = letter || alphabet[ranletter]
    this.x = ranx
    this.y = this.radius*2
    this.vx = ranxspeed
    this.vy = ranyspeed
    this.scolor = "blue"
    this.fcolor = "rgba(19, 238, 241, 0.5)"
    this.textcolor = "black"
  }
  draw() {
    this.ctx.save()
    this.ctx.strokeStyle = this.scolor;
    this.ctx.fillStyle = this.fcolor;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore()
    this.ctx.font = "20px 'Trebuchet MS'"
    this.ctx.fillStyle = this.textcolor
    this.ctx.textAlign = "center"
    this.ctx.fillText(this.letter, this.x, this.y)
  }
  
  update () {
    this.x += this.vx
    this.y += this.vy
    if(this.x>=width-this.radius) {
      this.vx -= 2*this.vx
    }
    if(this.x<=0+this.radius) {
      this.vx += -2*this.vx
    }
    if(this.y>=height-this.radius) {
      this.vy -= 2*this.vy
    }
    if(this.y<=0+this.radius) {
      this.vy += -2*this.vy
    }
  }
}