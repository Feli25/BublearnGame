var scoreCounter = 0

class LetterCanvas {
  constructor(ctx2, arr) {
    this.ctx2 = ctx2;
    var ran = Math.floor(Math.random() * (arr.length - 1))
    this.word = arr[ran].name
    this.img = new Image();
    this.img.src = arr[ran].image;
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
    console.log(this.word)
    console.log(this.img)
    this.ctx2.drawImage(this.img, 100, 70, 150 * this.img.width / this.img.height, 150)
  }

  // drawLetter(letter) {
  //   var letterX = 25 + (this.letterCounter * 50)
  //   var letterY = 340
  //   this.ctx2.font = "40px 'Trebuchet MS'"
  //   this.ctx2.fillText(letter, letterX, letterY)
  //   this.letterCounter++;
  // }
  shake() { }

  typedWrongWord() {
    alert("This is wrong, try again")
  }

  typedCorrectWord() {
    scoreCounter++
    this.arr.splice(this.ran, 1)
    if (scoreCounter == 2) {
      scoreCounter = 0;
      alert("You won")
      $("#canvas2").hide()
      $("#canvas").hide()
      $("#submitBut").hide()
      $("#textAbout").hide()
      $(".container").show()
    }
    else {
      alert("Loading new word")
      // easybtn()
    }
  }
}