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


// bubbles onclick function
var offsetX = canvas.offsetLeft;
var offsetY = canvas.offsetTop;
var cx = canvas.width / 2;
var cy = canvas.height / 2;
var r = 20;//buble radius


var canv2
$("#canvas2").hide()
$("#canvas").hide()
$("#submitBut").hide()
$("#textAbout").hide()

canvas.addEventListener('click', (e) => {
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
    console.log(distance, bubble.radius)
    if (dx * dx + dy * dy <= bubble.radius * bubble.radius) {
      // alert("you are inside the circle");
      bubble.pop()
    }
    // if (isIntersect(mousePoint, bubble)) {
    //   console.log("bubble was clicked")
    //   bubble.onClick()
    // }
  });
});


var easyButton = document.getElementById("easy")
easyButton.onclick = function () {
  console.log("EasyButton clicked")

  $(".buttons").hide()
  $("#canvas2").show()
  $("#canvas").show()
  $("#submitBut").show()

  canv2 = new LetterCanvas(ctx2, possibleWords1)
  canv2.img.onload = function () {
    canv2.draw()
  }


  bubbles = []
  for (var i = 0; i < 0; i++) {
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

  $(".buttons").hide()
  $("#canvas2").show()
  $("#canvas").show()
  $("#submitBut").show()

  var canv2 = new LetterCanvas(ctx2, possibleWords2)
  canv2.img.onload = function () {
    canv2.draw()
  }

  bubbles = []
  for (var i = 0; i < 35; i++) {
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

  $(".buttons").hide()
  $("#canvas2").show()
  $("#canvas").show()
  $("#submitBut").show()

  var canv2 = new LetterCanvas(ctx2, possibleWords3)
  canv2.img.onload = function () {
    canv2.draw()
  }


  bubbles = []
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
