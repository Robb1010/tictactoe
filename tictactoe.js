var a1 = 0;
var a2 = 0;
var a3 = 0;
var b1 = 0;
var b2 = 0;
var b3 = 0;
var c1 = 0;
var c2 = 0;
var c3 = 0;
var status = "active";
var turn = "ex";

var grid = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: []
}

var ids = {
  1: ["a1", "a2", "a3"],
  2: ["b1", "b2", "b3"],
  3: ["c1", "c2", "c3"],
  4: ["a1", "b1", "c1"],
  5: ["a2", "b2", "c2"],
  6: ["a3", "b3", "c3"],
  7: ["a1", "b2", "c3"],
  8: ["a3", "b2", "c1"]
}

function gridFill() {
  grid = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: []
  }

  for (i=1;i<9;i++) {
    for (j=0;j<3;j++) {
      grid[i].push(window[ids[i][j]]);
    }
  }
}

$(".col-xs-4").click(function () {
  if (window[this.id] === 0 && status === "active") {
  $("#" + this.id + " p").removeClass("none");
  $("#" + this.id + " p").addClass("ex");
  $("#" + this.id + " p").text("X");
  window[this.id] = 4;
  gridFill();
  youWin();
  draw();
  decision();
}
});


function decision() {
  if (b2 === 0) {
    $("#b2 p").addClass("ou");
    $("#b2 p").removeClass("none");
    $("#b2 p").text("0");
    b2 = 3;
    gridFill();
    return;
  } else if (b2 !== 0 && a1+a2+a3+b1+b3+c1+c2+c3 === 0) {
    $("#a1 p").addClass("ou");
    $("#a1 p").removeClass("none");
    $("#a1 p").text("0");
    a1 = 3;
    gridFill();
    return;
  }
  for (i=1;i<9;i++) {
    check = grid[i].reduce(function(a,b) {return a+b;});
    if (check === 6) {
      strikeO();
      return;
    } else if (check === 8) {
      strikeO();
      return;
    }
  }
  for (i=1;i<9;i++) {
    check = grid[i].reduce(function(a,b) {return a+b;});
    if (check === 3) {
      strikeO();
      return;
    } else strikeO();
  }
}

function strikeO() {
  for (k=0;k<3;k++) {
    if (grid[i][k] === 0 && status === "active") {
      $("#" + ids[i][k] + " p").removeClass("none");
      $("#" + ids[i][k] + " p").addClass("ou");
      $("#" + ids[i][k] + " p").text("O");
      window[ids[i][k]] = 3;
      youLost();
      draw();
      return;
    }
  }
}

function youLost() {
  gridFill();
  for (i=1;i<9;i++) {
    check = grid[i].reduce(function(a,b) {return a+b;});
    if (check === 9) {
      flashIt();
      $(".result p").removeClass("none");
      $(".result p").addClass("lost");
      $(".result p").text("You lost!     ");
      status = "inactive";
      turns();
      clearIt();
      return;
    }
  }
}

function youWin() {
  gridFill();
  for (i=1;i<9;i++) {
    check = grid[i].reduce(function(a,b) {return a+b;});
    if (check === 12) {
      flashIt();
      $(".result p").removeClass("none");
      $(".result p").addClass("win");
      $(".result p").text("You won!");
      status = "inactive";
      turns();
      clearIt();
      return;
    }
  }
}

function draw() {
  gridFill();
  if (a1!==0 && a2!==0 && a3!==0 && b1!==0 && b2!==0 && b3!==0 && c1!==0 && c2!==0 && c3!==0) {
    $(".result p").removeClass("none");
    $(".result p").addClass("draw");
    $(".result p").text("Draw!         ");
    status = "inactive";
    turns();
    clearIt();
    return;
  }
}

function flashIt() {
  for (k=0;k<3;k++) {
    $("#" + ids[i][k] + " p").hide().fadeIn("slow");
  }
}

function clearIt() {
  setTimeout(function() {
  $(".col-xs-4 p").removeClass("ou");
  $(".col-xs-4 p").removeClass("ex");
  $(".col-xs-4 p").addClass("none");
  $(".result p").addClass("none");
  $(".result p").removeClass("draw");
  $(".result p").removeClass("win");
  $(".result p").removeClass("lost");
  status = "active";
  a1 = 0;
  a2 = 0;
  a3 = 0;
  b1 = 0;
  b2 = 0;
  b3 = 0;
  c1 = 0;
  c2 = 0;
  c3 = 0;
  gridFill();
  if (turn === "ou") {
    $("#b2 p").addClass("ou");
    $("#b2 p").removeClass("none");
    $("#b2 p").text("0");
    b2 = 3;
    gridFill();
    return;
  }
}, 3000);}

function turns() {
      if (turn === "ex") {
        turn = "ou";
        return;
      } if (turn === "ou") {
        turn = "ex";
        return;
      }
    }
