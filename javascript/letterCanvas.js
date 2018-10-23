var counter = 0

class LetterCanvas {
  constructor(ctx2, arr) {
    this.ctx2 = ctx2;
    var ran = Math.floor(Math.random()*(arr.length-1))
    this.word = arr[ran].name
    this.img = new Image();
    this.img.src = arr[ran].image;
  }
  draw () {
    var x = 50;
    var y = 350;
    for (var i=0; i<this.word.length; i++) {
      this.ctx2.beginPath();
      this.ctx2.moveTo(x, y);
      this.ctx2.lineTo(x+40, y);
      this.ctx2.stroke();
      x+=50
    }
    console.log(this.word)
    console.log(this.img)
    this.ctx2.drawImage(this.img,100,100, 100, 100)
  }
  shake(){}
  typedWrongWord() {
    alert("This is wrong, try again")
  }
  TypedCorrectWord () {
    counter++
    arr.splice(ran,1)
    if(counter == 10) {
      alert ("You won")
    }
    else {
      alert ("Loading new word")
    }
  }
}