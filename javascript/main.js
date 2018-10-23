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

var canv2
$("#canvas2").hide()
$("#canvas").hide()
$("#submitBut").hide()
$("#textAbout").hide()

canvas.addEventListener('mousedown', (e) => {
  console.log("canvas was clicked")


  const mousePoint = {
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop
  };

  // console.log(e.clientX, offsetX, e.clientY, offsetY, canvas.offsetTop)

  bubbles.forEach(bubble => {
    var dx = bubble.x - mousePoint.x;
    var dy = bubble.y - mousePoint.y;
    var distance = Math.sqrt(dx * dx + dy * dy)
    // console.log(bubble.letter, dx, dy, bubble.y, mousePoint.y)
    // console.log(distance, bubble.radius)
    if (dx * dx + dy * dy <= bubble.radius * bubble.radius) {
      // alert("you are inside the circle");
      var lett = bubble.onClick()
      if (letterArray.length < canv2.word.length) {
        canv2.drawLetter(lett)
        bubble.pop()
      }
      letterArray.push({ letter: lett, x: canv2.letterXdist + ((canv2.letterCounter - 1) * 50), y: 340, size: 20 })

      // console.log(letterArray)
      // console.log(bubbles)
    }
  });
});

canvas2.addEventListener("mousedown", (e) => {
  // console.log("canvas2 was clicked")
  const mousePoint2 = {
    x: e.clientX - canvas2.offsetLeft,
    y: e.clientY - canvas2.offsetTop
  };
  console.log(mousePoint2.x, mousePoint2.y)
  letterArray.forEach(letter => {
    var letterxmid = letter.x + letter.size;
    var letterymid = letter.y - 8;
    console.log(letterxmid, letterymid)
    var dx2 = letterxmid - mousePoint2.x;
    var dy2 = letterymid - mousePoint2.y;
    if (dx2 * dx2 + dy2 * dy2 <= (letter.size + 4) * (letter.size + 4)) {
      console.log("Letter found")
      console.log(letter.letter)
      bubbles.push(new Bubble(ctx, 2, 3, letter.letter))
    }
  })


})


var easyButton = document.getElementById("easy")
easyButton.onclick = function () {
  console.log("EasyButton clicked")

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
  console.log("Still have to do this")
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
