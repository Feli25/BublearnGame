//ToDo: not repeat words

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height

var canvas2 = document.getElementById('canvas2')
var ctx2 = canvas2.getContext('2d')
var width2 = canvas2.width
var height2 = canvas2.height
var bubbles = []
var bg
var letterArray = []
var seenLettercounter = 0
var canv2
var gameInterval
var myBubbleSound;
var myGameSound = new Audio("./game.mp3");
myGameSound.loop = true;
myGameSound.play();

$("#canvas2").hide()
$("#canvas").hide()
$("#submitBut").hide()
$("#textAbout").hide()
$("#won").hide()

// Clicking on the bubbles, right side
canvas.addEventListener('mousedown', (e) => {
  const mousePoint = {
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop
  };
  bubbles.forEach(bubble => {
    var dx = bubble.x - mousePoint.x;
    var dy = bubble.y - mousePoint.y;
    if (dx * dx + dy * dy <= bubble.radius * bubble.radius) {
      var lett = bubble.onClick()
      if (seenLettercounter < canv2.word.length) {
        var nextGap = findTheGap()
        if (nextGap <= letterArray.length) {
          letterArray.splice(nextGap, 1, (new Letter(ctx2, lett, 340, 20, nextGap)))
        }
        else {
          letterArray.push(new Letter(ctx2, lett, 340, 20))
        }
        seenLettercounter++
        myBubbleSound.play();
        bubble.pop()
        letterArray.forEach(function (letter) {
          if (letter !== "") {
            letter.draw()
          }
        })
      }
    }
  });
});


function findTheGap() {
  var minGap = 0
  if (letterArray.length > 0) {
    for (var i = 0; i < letterArray.length; i++) {
      if (letterArray[i] == "" || letterArray[i].index !== i) {
        break;
      }
      minGap = i + 1
    }
  }
  return minGap
}


// Clicking on the letters, left side
canvas2.addEventListener("mousedown", (e) => {
  const mousePoint2 = {
    x: e.clientX - canvas2.offsetLeft,
    y: e.clientY - canvas2.offsetTop
  };
  letterArray.forEach((letter, index) => {
    var letterxmid = letter.x + letter.halfSize;
    var letterymid = letter.y - 8;
    var dx2 = letterxmid - mousePoint2.x;
    var dy2 = letterymid - mousePoint2.y;
    if (dx2 * dx2 + dy2 * dy2 <= (letter.halfSize + 4) * (letter.halfSize + 4)) {
      ctx2.clearRect(letter.x, (letter.y - letter.halfSize * 2) + 6, letter.halfSize * 2, letter.halfSize * 2)
      seenLettercounter--
      //Remove letter from array
      bubbles.push(new Bubble(ctx, 1, letter.letter))
      letterArray.splice(index, 1, "")
      return
    }

  })
})

var reloadImage

var easyButton = document.getElementById("easy")
easyButton.onclick = function () {
  clearInterval(gameInterval);
  myBubbleSound = new Audio("./bubble.mp3")
  createCanvas2("./images/blue.png", 1, possibleWords1);
  showCanvas();
  gameInterval = setInterval(function () {
    update()
    drawEverything()
  }, 1000 / 60)
}

var mediumButton = document.getElementById("medium")
mediumButton.onclick = function () {
  clearInterval(gameInterval);
  myBubbleSound = new Audio("./bubble.mp3")
  createCanvas2("./images/sky.png", 2, possibleWords2);
  showCanvas();
  gameInterval = setInterval(function () {
    update()
    drawEverything()
  }, 1000 / 60)
}

var hardButton = document.getElementById("hard")
hardButton.onclick = function () {
  clearInterval(gameInterval);
  myBubbleSound = new Audio("./bubble.mp3")
  createCanvas2("./images/space.png", 3, possibleWords3);
  showCanvas();
  gameInterval = setInterval(function () {
    update()
    drawEverything()
  }, 1000 / 60)
}

function showCanvas() {
  $(".container").hide();
  $("#canvas2").show();
  $("#canvas").show();
  $("#submitBut").show();
}

function update() {
  bubbles.forEach(function (elem) { elem.update() })
}
function drawEverything() {
  ctx.clearRect(0, 0, width, height)
  bg.draw()
  bubbles.forEach(function (elem) { elem.draw() })
}

var okBut = document.getElementById("solution")
okBut.onclick = function () {
  checkIfWordCorrect()
}

function createCanvas2(backgroundUrl, speed, array) {
  bg = new Background(ctx, backgroundUrl)
  canv2 = new LetterCanvas(ctx2, array);
  canv2.img.onload = function () {
    canv2.draw();
  };
  for (var i = 0; i < 20; i++) {
    bubbles.push(new Bubble(ctx, speed));
  }
  var splitword = canv2.word.split("");
  for (var i = 0; i < splitword.length; i++) {
    bubbles.push(new Bubble(ctx, speed, splitword[i]));
  }
  var splitreverse = splitword.reverse();
  for (var i = 0; i < splitreverse.length; i++) {
    bubbles.push(new Bubble(ctx, speed, splitreverse[i]));
  }
}

function checkIfWordCorrect() {
  var allLetters = []
  letterArray.forEach(function (elem) {
    allLetters.push(elem.letter)
  })
  var joinedLetters = allLetters.join("")

  if (joinedLetters == canv2.word) {
    bubbles = []
    letterArray = []
    ctx.clearRect(0, 0, width, height)
    canv2.ctx2.clearRect(0, 0, 470, 400)

    if (canv2.typedCorrectWord()) {
      console.log(seenLettercounter)
      if (seenLettercounter < 5) {
        possibleWords1.splice(canv2.ran, 0)
        createCanvas2("./images/blue.png", 1, possibleWords1);
      }
      else if (seenLettercounter < 7 && seenLettercounter > 4) {
        createCanvas2("./images/sky.png", 2, possibleWords2)
      }
      else if (seenLettercounter > 6) {
        createCanvas2("./images/space.png", 3, possibleWords3);
      }

      showCanvas();
    }
    else {
      possibleWords1.splice(canv2.ran, 0)
      $("#canvas2").hide()
      $("#canvas").hide()
      $("#submitBut").hide()
      $("#textAbout").hide()
      $("#won").fadeIn(4000)
      setTimeout(function () {
        $(".container").fadeIn("slow")
        $("#won").hide()
      }, 5000)

    }

    seenLettercounter = 0
  }
  else { canv2.typedWrongWord() }
}

var deletebtn = document.getElementById("undo")
deletebtn.onclick = function () {
  letterArray.forEach(function (elem) {
    bubbles.push(new Bubble(ctx, 1, elem.letter))
  })
  letterArray = []
  seenLettercounter = 0
  ctx2.clearRect(25, 310, 470, 37)
}

var homeBut = document.getElementById("reload")
homeBut.onclick = function () {
  window.location.reload(true)
}

var logobtn = document.getElementById("logo")
logobtn.onclick = function () {
  window.location.reload(true)
}

var aboutBut = document.getElementById("about")
aboutBut.onclick = function () {
  $(".buttons").hide()
  $(".instructions").hide()
  $("#canvas2").hide()
  $("#canvas").hide()
  $("#submitBut").hide()
  $("#textAbout").show()
}



