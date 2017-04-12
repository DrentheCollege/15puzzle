var hole;
var cells = [];
const MARGIN = 106;

$(document).ready(function(){
  init();
  shuffle();
  makeSolvable();
  placeCells();
});

function init(){
  var i = 0;
  $("div.game img").each(function(){
      cells.push({
      index: i,
      position: i,
      item: $(this),
      hidden: false
    });
    i++;
  });

  cells.forEach(function(cell){
    cell.item.click(function(){ click(cell); });
    if(cell.item.is($("div.game img:last-child"))){
      hole = cell;
    }
  });
  hole.hidden = true;
}

function click(cell){
  var start = cell.position, end = hole.position;
  //clicked cell and hole in same column
  cells.forEach(function(c){
    if(inColumn(start, end)){
        if(inColumn(c.position, hole.position) && isBetween(c.position, start, end)){
          if(start < end) c.position += 4;
          if(end < start) c.position -= 4;
        }
        hole.position = start;
    }
    //clicked cell and hole in same row
    if(inRow(start, end)){
      if(inRow(c.position, hole.position) && isBetween(c.position, start, end)){
        if(start < end) c.position += 1;
        if(end < start) c.position -= 1;
      };
      hole.position = start;
    }
  });
  if(solved()) { hole.hidden = false};
  placeCells(true);
}

function shuffle(){
  var positions = new Array();
  //init array
  cells.forEach(function(cell){
    positions.push(cell.index);
  });
  //shuffle array
  for(var p = 0; p < positions.length ; p++){
    var r = Math.floor(Math.random() * positions.length)
    var t = positions[p];
    positions[p] = positions[r];
    positions[r] = t;
  }
  //sort cells by array
  for(var c = 0; c < cells.length ; c++){
    cells[c].position = positions[c];
  }
}

function placeCell(cell, animate){
  var css = {left: MARGIN * x(cell.position), top: MARGIN * y(cell.position)};
  cell.hidden?cell.item.hide():cell.item.show();
  cell.item.css({position: "absolute"});
  (animate?cell.item.animate(css):cell.item.css(css));
}

function placeCells(animate){
  cells.forEach(function(cell){
    placeCell(cell, animate);
  })
}

function makeSolvable(){
  var solvable = false;
  var md = manhantanDistance(hole.position, {x:3,y:3});
  var p = permutations();
  if (parity(md) != parity(p)){
    for(var i = 0; !solvable && i < cells.size; i++){
      //current cell not in place AND position current cell not hole
      if(cells[i].position != i && hole.position != i){
        //find cell on position current cell
        cells.forEach(function(cell){
          if(cell.position = i){
            cell.position = cells[i].position;
            cells[i].position = i;
          }
        })
        solvable = true;
      }
    }
  }
}

function solved(){
  var solved = true;
  cells.forEach(function(cell){
    solved &= (cell.position == cell.index);
  });
  return solved;
}

function position2i(x, y){ return (x + 4 * y);  }
function parity(number){ return number%2;}
function x(i){ return i%4; };
function y(i){ return Math.floor(i/4)};
function inRow(p1,p2){return Math.floor(p1/4) == Math.floor(p2/4);}
function inColumn(p1,p2){return (Math.abs(p1-p2)%4)==0;}
function isBetween(p1,p2,p3){ return (Math.min(p2,p3) <= p1 && p1 <= Math.max(p2,p3)); }
function manhantanDistance(pos1, pos2){  return (Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y)); }
function permutations(){
  var grid = new Array();
  var swap = 0;
  cells.forEach(function(cell){ grid.push(position2i(cell.position)); });
  for(var g1 = 0; g1 < grid.length; g1++){
    for(var g2 = g1 + 1; g2 < grid.length; g2++){
      if(grid[g2] == g1){
        grid[g2] = grid[g1];
        grid[g1] = g1;
        swap++;
      }
    }
  }
  return swap;
}
