function newBase(form){
  kottan = false;
  basePoly = []
  var children = form.childNodes.length;
  for (i=0; i<children; i++){
    var elem = 'member' + i;
    var myStack = document.getElementById(elem).value;
    var myStack  = myStack.split(',');
    var myStackInt0 = +myStack[0];
    var myStackInt1 = +myStack[1];
    var myStackInt = [myStackInt0, myStackInt1];
    basePoly.push(myStackInt);
  }
  drawPolygon(context, basePoly, '#888','#fff166');
  document.getElementById('polyInput').style.display='none';
  allVertices = finalPolygons.concat(basePoly, cutPoly);
  return basePoly;
}

function newCut(form){
  kottan = false;
  cutPoly = []
  var children = form.childNodes.length;
  for (i=0; i<children; i++){
    var elem = 'member' + i;
    var myStack = document.getElementById(elem).value;
    var myStack  = myStack.split(',');
    var myStackInt0 = +myStack[0];
    var myStackInt1 = +myStack[1];
    var myStackInt = [myStackInt0, myStackInt1];
    cutPoly.push(myStackInt);
  }
  drawPolygon(context, cutPoly, '#888','#ffc32a');
  document.getElementById('polyInput').style.display='none';
  allVertices = finalPolygons.concat(basePoly, cutPoly);
  return cutPoly;
}


function drawPolygon(context, polygon, strokeStyle, fillStyle) {
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    context.beginPath();
    context.moveTo(polygon[0][0],polygon[0][1]);
    for(var i = 1; i < polygon.length ; i++)
        context.lineTo(polygon[i][0],polygon[i][1]);
    context.lineTo(polygon[0][0],polygon[0][1]);
    context.fill();
    context.stroke();
    context.closePath();
}

document.getElementById('makeKottanHappy').onclick = function(){  
    context.clearRect(0, 0, canvas.width, canvas.height);
    kottanFunk();
    tailPoly = [
                [290, 270], //hvost
                [345, 183],
                [352, 181],
                [353, 188],
                [300, 305]
               ]   
    drawPolygon(context, tailPoly, '#888','#ffc32a');
    drawPolygon(context, cutPoly, '#888','#ffc32a');
    drawPolygon(context, basePoly, '#888','#fff166');

    context.fillStyle = "#000";
    context.font = 'bold 88px serif';
    context.fillText("=(^.^)=", 25, 125);
    context.fillStyle = "#323232";
    context.font = 'bold 18px sans';
    context.fillText("I'll always be happy", 255, 25);
    context.fillText("if you let this guy", 277, 45);    
    context.fillText("enroll your courses", 260, 65);
}

document.getElementById('cutButton').onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (kottan == true){
      drawPolygon(context, tailPoly, '#8f8','#8f8');
    }
    finalPolygons = cut(basePoly, cutPoly);
    allVertices = finalPolygons.concat(basePoly, cutPoly);

    drawPolygon(context, basePoly, '#fff','#8f8');
    drawPolygon(context, cutPoly, '#8f8','#8f8');
    drawPolygon(context, finalPolygons, '#f3f3f3','#f3f3f3');
}

document.getElementById('getVertices').onclick = function(){
    document.getElementById('newBaseBut').style.display='none';
    document.getElementById('newCutBut').style.display='none';
    document.getElementById('txt1').style.display='block';
    document.getElementById('txt1').innerHTML = allVertices.join('\n');
}

document.getElementById('newPoly').onclick = function(){
    document.getElementById('txt1').style.display='none';
    document.getElementById('txt1').innerHTML = allVertices.join('\n');

    document.getElementById('newBaseBut').style.display='inline-block';
    document.getElementById('newCutBut').style.display='inline-block';
}

document.getElementById('newBaseBut').onclick = function(){
    kottan = false;
    document.getElementById('polyInput').style.display='block';
    document.getElementById('createNewCut').style.display='none';
    document.getElementById('createNewBase').style.display='block';

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPolygon(context, cutPoly, '#888','#ffc32a');
    
    var numPeople = document.getElementById("numPeople"),
    peopleDiv = document.getElementById("addPeople"),
    memberFields = document.getElementById("memberFields");

    numPeople.addEventListener("input", function(e) {

    peopleDiv.style.display = "block";
    var num = numPeople.value;

    var numNode = memberFields.childNodes.length,
        numDisplay = num - numNode;

    if (numDisplay >= 0) {
        for (var i = 0; i < numDisplay; i++) {
              var node = document.createElement('input');
              var mem = 'member' + numNode;
              node.setAttribute('type', 'text')
              node.setAttribute('id', mem)
              node.setAttribute('placeholder', 'ex. 100, 150')
              document.getElementById("memberFields").appendChild(node);
        }
    } else {
        var numDelete = Math.abs(numDisplay);
        for (var i = 0; i < numDelete; i++) {
            memberFields.removeChild(memberFields.lastChild);
        }
    }

}, false);
}

document.getElementById('newCutBut').onclick = function(){
    kottan = false;
    document.getElementById('polyInput').style.display='block';
    document.getElementById('createNewBase').style.display='none';
    document.getElementById('createNewCut').style.display='block';

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPolygon(context, basePoly, '#888','#fff166');
    
    var numPeople = document.getElementById("numPeople"),
    peopleDiv = document.getElementById("addPeople"),
    memberFields = document.getElementById("memberFields");

    numPeople.addEventListener("input", function(e) {

    peopleDiv.style.display = "block";

    var num = numPeople.value;

    var numNode = memberFields.childNodes.length,
        numDisplay = num - numNode;

    if (numDisplay >= 0) {
        for (var i = 0; i < numDisplay; i++) {
              var node = document.createElement('input');
              var mem = 'member' + numNode;
              node.setAttribute('type', 'text')
              node.setAttribute('id', mem)
              node.setAttribute('placeholder', 'ex. 100, 150')
              document.getElementById("memberFields").appendChild(node);
        }
    } else {
        var numDelete = Math.abs(numDisplay);
        for (var i = 0; i < numDelete; i++) {
            memberFields.removeChild(memberFields.lastChild);
        }
    }

}, false);
}

document.getElementById('showOnlyVertices').onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 1; i < allVertices.length ; i++){
        context.beginPath();
        context.arc(allVertices[i][0], allVertices[i][1], 3, 0, Math.PI * 2, false);
        context.closePath();
        context.strokeStyle = "#00";
        context.stroke();
        context.fillStyle = "#000";
        context.fill()
    }
}

var context = document.getElementById('canvas').getContext('2d');
var basePoly = [];
var cutPoly = [];
var tailPoly = [];
var kottan = false;

kottanFunk = function(){
  kottan = true;

  basePoly = [[30, 90],   //head top1
                  [55, 50],  //hear top2
                  [100, 30],   //head top3
                  [230, 30],  //head top4
                  [275, 50], //head top5
                  [300, 90],  //head top6
                  [300, 130], //head bottom6
                  [275, 170], //head bottom5
                  [255, 180], //head bottom4
                  [255, 300], //body boottom right
                  [235, 330], //right leg2
                  [185, 330], //right leg1
                  [165, 300], //BL
                  [145, 330], //left leg2
                  [95, 330], //left leg1
                  [75, 300],  //bode bottom left
                  [75, 180],  //head bottom3
                  [55, 170],   //head bottom2
                  [30, 130]]; //head bottom1          

  cutPoly = [
              [55, 50], //left ear1
              [65, 20], //left ear2
              [105, 30], //left ear3
              [225, 30], //right ear1
              [265, 20], //right ear2
              [275, 50], //right ear3
              [300, 305], //body right4
              [293, 315], //body right3
              [275, 327], //body right2
              [250, 328], //body right1
              [120, 315]
            ];

  tailPoly = [
              [290, 270], //hvost
              [355, 188],
              [362, 186],
              [363, 193],
              [300, 305]
             ]    

  return  cutPoly, basePoly, tailPoly
}

var kottanList = kottanFunk();
var finalPolygons = cut(basePoly, cutPoly);
var allVertices = finalPolygons.concat(basePoly, cutPoly);

drawPolygon(context, tailPoly, '#888','#ffc32a');
drawPolygon(context, cutPoly, '#888','#ffc32a');
drawPolygon(context, basePoly, '#888','#fff166');