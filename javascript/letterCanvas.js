var scoreCounter = 0

class LetterCanvas {
  constructor(ctx2, arr) {
    this.ctx2 = ctx2;
    this.ran = Math.floor(Math.random() * (arr.length - 1))
    this.word = arr[this.ran].name
    this.img = new Image();
    this.img.src = arr[this.ran].image;
    this.arr = arr
    // this.width = this.ctx2.canvas2.width
    // this.height = this.ctx2.canvas2.height
    // this.letterCounter = 0;
    // this.letterXdist = 25
  }
  draw() {
    var x = 20;
    var y = 350;
    for (var i = 0; i < this.word.length; i++) {
      this.ctx2.beginPath();
      this.ctx2.moveTo(x, y);
      this.ctx2.lineTo(x + 40, y);
      this.ctx2.stroke();
      x += 50
    }
    this.ctx2.drawImage(this.img, 100, 70, 150 * this.img.width / this.img.height, 150)
  }

  shake() {
    $("#submitBut").addClass("start-shake")
    setTimeout(function () { $("#submitBut").removeClass("start-shake") }, 1000)

  }

  typedWrongWord() {
    this.shake()

  }

  typedCorrectWord() {
    scoreCounter++
    if (scoreCounter == 5) {
      scoreCounter = 0;
      return false
    }
    else {
      return true
    }
  }
}