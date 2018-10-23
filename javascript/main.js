//ToDo: Medium and Hard is not working, load new image when correct


var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height

var canvas2 = document.getElementById('canvas2')
var ctx2 = canvas2.getContext('2d')
var width2 = canvas2.width
var height2 = canvas2.height
var bubbles = []

var bg = new Background(ctx, "./images/blue.png")

var letterArray = []
var seenLettercounter = 0

var canv2
$("#canvas2").hide()
$("#canvas").hide()
$("#submitBut").hide()
$("#textAbout").hide()

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
      ctx2.clearRect(letter.x, letter.y - letter.halfSize * 2, letter.halfSize * 2, letter.halfSize * 2)
      seenLettercounter--
      //Remove letter from array
      bubbles.push(new Bubble(ctx, 2, 3, letter.letter))

      console.log("BEFORE!", letterArray)
      letterArray.splice(index, 1, "")
      console.log("AFTER", letterArray)
      return
    }

  })
})


var easyButton = document.getElementById("easy")
easyButton.onclick = function () {
  // var reloadImage = easyButton.onclick()
  // console.log("EasyButton clicked")

  $(".container").hide()
  $("#canvas2").show()
  $("#canvas").show()
  $("#submitBut").show()

  canv2 = new LetterCanvas(ctx2, possibleWords1)
  canv2.img.onload = function () {
    canv2.draw()
  }

  for (var i = 0; i < 25; i++) {
    bubbles.push(new Bubble(ctx, 2, 3))
  }
  var splitword = canv2.word.split("")
  for (var i = 0; i < splitword.length; i++) {
    bubbles.push(new Bubble(ctx, 2, 3, splitword[i]))
  }
  setInterval(function () {
    update()
    drawEverything()
  }, 1000 / 60)
  function update() {
    bubbles.forEach(function (elem) { elem.update() })
  }
  function drawEverything() {
    ctx.clearRect(0, 0, width, height)
    bg.draw()
    bubbles.forEach(function (elem) { elem.draw() })
  }
}

var mediumButton = document.getElementById("medium")
mediumButton.onclick = function () {
  console.log("MediumButton clicked")

  $(".container").hide()
  $("#canvas2").show()
  $("#canvas").show()
  $("#submitBut").show()

  var canv2 = new LetterCanvas(ctx2, possibleWords2)
  canv2.img.onload = function () {
    canv2.draw()
  }

  for (var i = 0; i < 25; i++) {
    bubbles.push(new Bubble(ctx, 4, 3))
  }
  var splitword = canv2.word.split("")
  for (var i = 0; i < splitword.length; i++) {
    bubbles.push(new Bubble(ctx, 2, 3, splitword[i]))
  }
  setInterval(function () {
    update()
    drawEverything()
  }, 1000 / 60)
  function update() {
    bubbles.forEach(function (elem) { elem.update() })
  }
  function drawEverything() {
    ctx.clearRect(0, 0, width, height)
    bg.draw()
    bubbles.forEach(function (elem) { elem.draw() })
  }
}

var hardButton = document.getElementById("hard")
hardButton.onclick = function () {
  console.log("HardButton clicked")

  $(".container").hide()
  $("#canvas2").show()
  $("#canvas").show()
  $("#submitBut").show()

  var canv2 = new LetterCanvas(ctx2, possibleWords3)
  canv2.img.onload = function () {
    canv2.draw()
  }


  for (var i = 0; i < 35; i++) {
    bubbles.push(new Bubble(ctx, 6, 5))
  }
  var splitword = canv2.word.split("")
  for (var i = 0; i < splitword.length; i++) {
    bubbles.push(new Bubble(ctx, 2, 3, splitword[i]))
  }
  setInterval(function () {
    update()
    drawEverything()
  }, 1000 / 60)
  function update() {
    bubbles.forEach(function (elem) { elem.update() })
  }
  function drawEverything() {
    ctx.clearRect(0, 0, width, height)
    bg.draw()
    bubbles.forEach(function (elem) { elem.draw() })
  }
}

var okBut = document.getElementById("solution")
okBut.onclick = function () {
  checkIfWordCorrect()
  console.log("Still have to do this")
}

function checkIfWordCorrect() {
  var allLetters = []
  letterArray.forEach(function (elem) {
    allLetters.push(elem.letter)
  })
  var joinedLetters = allLetters.join("")

  if (joinedLetters == canv2.word) {
    canv2.ctx2.clearRect(0, 0, 470, 400)
    canv2.typedCorrectWord()

    // if (canv2.typedCorrectWord()) { console.log()}
  }
  else { canv2.typedWrongWord() }

}

var homeBut = document.getElementById("reload")
homeBut.onclick = function () {
  window.location.reload(true)
}

var aboutBut = document.getElementById("about")
aboutBut.onclick = function () {
  $(".buttons").hide()
  $("#canvas2").hide()
  $("#canvas").hide()
  $("#submitBut").hide()
  $("#textAbout").show()
}


function isIntersect(point, circle) {
  console.log(Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2), circle.radius)
  return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}
