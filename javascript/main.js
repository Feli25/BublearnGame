var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height

var canvas2 = document.getElementById('canvas2')
var ctx2 = canvas2.getContext('2d')
var width2 = canvas2.width
var height2 = canvas2.height

var bg = new Background(ctx, "./images/blue.png")

var canv2
$("#canvas2").hide()
$("#canvas").hide()
$("#submitBut").hide()
$("#textAbout").hide()


var easyButton = document.getElementById("easy")
easyButton.onclick = function () {
  console.log("EasyButton clicked")
  
  $(".buttons").hide()
  $("#canvas2").show()
  $("#canvas").show()
  $("#submitBut").show()
  
  canv2 = new LetterCanvas(ctx2, possibleWords1)
  canv2.img.onload = function(){
    canv2.draw()
  }
 

  var bubbles = []
  for(var i=0; i<35; i++) {
    bubbles.push(new Bubble(ctx, 2, 3))
  }
  var splitword = canv2.word.split("")
  for(var i=0; i<splitword.length; i++) {
    bubbles.push(new Bubble(ctx, 2, 3, splitword[i]))
  }
  setInterval(function() {
    update()
    drawEverything()
  }, 1000/60)
  function update() {
    bubbles.forEach(function(elem) {elem.update()})
  }
  function drawEverything() {
    ctx.clearRect(0,0,width,height)
    bg.draw()
    bubbles.forEach(function(elem){elem.draw()})
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
  canv2.img.onload = function(){
    canv2.draw()
  }

  var bubbles = []
  for(var i=0; i<35; i++) {
    bubbles.push(new Bubble(ctx, 4, 3))
  }
  var splitword = canv2.word.split("")
  for(var i=0; i<splitword.length; i++) {
    bubbles.push(new Bubble(ctx, 2, 3, splitword[i]))
  }
  setInterval(function() {
    update()
    drawEverything()
  }, 1000/60)
  function update() {
    bubbles.forEach(function(elem) {elem.update()})
  }
  function drawEverything() {
    ctx.clearRect(0,0,width,height)
    bg.draw()
    bubbles.forEach(function(elem){elem.draw()})
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
  canv2.img.onload = function(){
    canv2.draw()
  }


  var bubbles = []
  for(var i=0; i<35; i++) {
    bubbles.push(new Bubble(ctx, 6, 5))
  }
  var splitword = canv2.word.split("")
  for(var i=0; i<splitword.length; i++) {
    bubbles.push(new Bubble(ctx, 2, 3, splitword[i]))
  }
  setInterval(function() {
    update()
    drawEverything()
  }, 1000/60)
  function update() {
    bubbles.forEach(function(elem) {elem.update()})
  }
  function drawEverything() {
    ctx.clearRect(0,0,width,height)
    bg.draw()
    bubbles.forEach(function(elem){elem.draw()})
  }
}

var okBut = document.getElementById("solution")
okBut.onclick = function () {
  console.log("Still have to do this")
}

var homeBut = document.getElementById("reload")
homeBut.onclick = function() {
  window.location.reload(true)
}

var aboutBut = document.getElementById("about")
aboutBut.onclick = function() {
  $(".buttons").hide()
  $("#canvas2").hide()
  $("#canvas").hide()
  $("#submitBut").hide()
  $("#textAbout").show()
}

// var bubbles = []

// for(var i=0; i<35; i++) {
//   bubbles.push(new Bubble(ctx, 2, 3))
// }

// var words = []
// var random = Math.floor(Math.random*words.lemgth)
// var word = words[random]
// var splittedWord = word.split("")

// for(var i=0; i<word.length; i++) {
//   bubbles.push(new PreBubble(splittedWord[i]))
// }


// var startbutton = document.getElementById("start")
// startbutton.onclick = function () {
//   console.log("clicked")
// }
