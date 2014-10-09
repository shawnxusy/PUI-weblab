// Global variables

var initialLineWidth = 15;
var initialFillWidth = 30;

var canvas, context, flag, root = false,
    lastIndex = 0,
    deletedChildren = [],
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    prevColor = "rgb(255, 255, 255)",
    dot_flag = false,
    transCounter = 0;


function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    root = new Doodle(context);
};

/*
    ----------- Drawing Zen Lines with these functions below ------------
*/
function drawZenLine() {
    //Remove other listeners first
    //This code is ugly, looking to replace it
    canvas.removeEventListener("mousedown", mountainDown, false);
    canvas.removeEventListener("mousedown", birdDown, false);
    canvas.removeEventListener("mousedown", randomDown, false);
    canvas.removeEventListener("mousedown", textDown, false);

    //Add its own listener
    canvas.addEventListener("mousemove", lineMove, false);
    canvas.addEventListener("mousedown", lineDown, false);
    canvas.addEventListener("mouseup", lineUp, false);
    canvas.addEventListener("mouseout", lineOut, false);
}

function lineDown(e) {
    //Record the last child in root container, so as to complete undo and redo
    lastIndex = root.children.length;

    //Restart calculating transparency for variation
    transCounter = 0;

    prevX = currX;
    prevY = currY;

    var bRect = canvas.getBoundingClientRect();
    currX = (e.clientX - bRect.left) * (canvas.width / bRect.width);
    currY = (e.clientY - bRect.top) * (canvas.height / bRect.height);

    flag = true;
    dot_flag = true;
    if (dot_flag) {
        context.beginPath();
            context.arc(currX, currY, (initialLineWidth / 2 + 0.5), 0, 2 * Math.PI, false);
            context.fillStyle = "rgb(0,0,0)";
        context.fill();
        context.closePath();
        dot_flag = false;
    };
}

function lineMove(e) {
   if (flag) {
        //Increase transcounter to achive gradual transparent results
        transCounter += 1;

        prevX = currX;
        prevY = currY;
        var bRect = canvas.getBoundingClientRect();
        currX = (e.clientX - bRect.left) * (canvas.width / bRect.width);
        currY = (e.clientY - bRect.top) * (canvas.height / bRect.height);

        var newColor = shadeRGBColor("rgb(10,10,10)", parseInt(getVariant(100, transCounter, 1)) / 100);
        var newLineWidth = initialLineWidth - getVariant(initialLineWidth, transCounter, 1);

        var gradience = context.createLinearGradient(prevX, prevY, currX, currY);
        gradience.addColorStop(0, prevColor);
        gradience.addColorStop(1, newColor);

        var line = new Line({
            startX: prevX,
            startY: prevY,
            endX: currX,
            endY: currY,
            color: gradience,
            lineWidth: newLineWidth
        });
        root.children.push(line);
        root.draw();
        prevColor = newColor;
    }    
}

function lineUp(e) {
    flag = false;
}

function lineOut(e) {
    flag = false;
}

/*
    ------------- Draw Zen fills ----------------
*/
function drawMountain() {
    //Remove other listeners first
    //This code is ugly, looking to replace it
    canvas.removeEventListener("mousemove", lineMove, false);
    canvas.removeEventListener("mousedown", lineDown, false);
    canvas.removeEventListener("mouseup", lineUp, false);
    canvas.removeEventListener("mouseout", lineOut, false);
    canvas.removeEventListener("mousedown", birdDown, false);
    canvas.removeEventListener("mousedown", randomDown, false);
    canvas.removeEventListener("mousedown", textDown, false);

    //Add its own listener
    canvas.addEventListener("mousedown", mountainDown, false);
}

function mountainDown(e) {
    lastIndex = root.children.length;

    var bRect = canvas.getBoundingClientRect();
    currX = (e.clientX - bRect.left) * (canvas.width / bRect.width);
    currY = (e.clientY - bRect.top) * (canvas.height / bRect.height);

    var mountain = new Mountain({
            x: currX,
            y: currY,
            size: Math.random() * 8 + 1,
            steepness: Math.random() * 5 + 3,
            numOfTops: Math.random() * 3 + 3,
            darkest: "rgb(150,150,150)",
            linewidth: 2,
        });
    root.children.push(mountain);
    root.draw();
    root.children.pop(mountain);

}

/*
    ------------- Draw Zen birds ----------------
*/
function drawBird() {
    //Remove other listeners first
    //This code is ugly, looking to replace it
    canvas.removeEventListener("mousemove", lineMove, false);
    canvas.removeEventListener("mousedown", lineDown, false);
    canvas.removeEventListener("mouseup", lineUp, false);
    canvas.removeEventListener("mouseout", lineOut, false);
    canvas.removeEventListener("mousedown", mountainDown, false);
    canvas.removeEventListener("mousedown", randomDown, false);
    canvas.removeEventListener("mousedown", textDown, false);

    //Add its own listener
    canvas.addEventListener("mousedown", birdDown, false);
}

function birdDown(e) {
    lastIndex = root.children.length;

    var bRect = canvas.getBoundingClientRect();
    currX = (e.clientX - bRect.left) * (canvas.width / bRect.width);
    currY = (e.clientY - bRect.top) * (canvas.height / bRect.height);

    var imageSize = Math.random() * 50 + 30;

    var bird = new DoodleImage({
            left: currX,
            top: currY,
            width: imageSize,
            height: imageSize,
            src: "img/bird/bird_0" + Math.floor(Math.random() * 9 + 1) + ".png",
        });
    root.children.push(bird);
    root.draw();
    root.children.pop(bird);

}

/*
    ------------- Draw random Zen stuff ----------------
*/
function drawRandom() {
    //Remove other listeners first
    //This code is ugly, looking to replace it
    canvas.removeEventListener("mousemove", lineMove, false);
    canvas.removeEventListener("mousedown", lineDown, false);
    canvas.removeEventListener("mouseup", lineUp, false);
    canvas.removeEventListener("mouseout", lineOut, false);
    canvas.removeEventListener("mousedown", mountainDown, false);
    canvas.removeEventListener("mousedown", birdDown, false);
    canvas.removeEventListener("mousedown", textDown, false);

    //Add its own listener
    canvas.addEventListener("mousedown", randomDown, false);
}

function randomDown(e) {
    lastIndex = root.children.length;

    var bRect = canvas.getBoundingClientRect();
    currX = (e.clientX - bRect.left) * (canvas.width / bRect.width);
    currY = (e.clientY - bRect.top) * (canvas.height / bRect.height);

    var imageSize = Math.random() * 100 + 50

    var randomZen = new DoodleImage({
            left: currX,
            top: currY,
            width: imageSize,
            height: imageSize,
            src: "img/random/random_" + Math.floor(Math.random() * 15 + 1) + ".png",
        });
    root.children.push(randomZen);
    root.draw();
    root.children.pop(randomZen);

}

/*
    ------------- Draw random Zen stuff ----------------
*/
function drawText() {
    //Remove other listeners first
    //This code is ugly, looking to replace it
    canvas.removeEventListener("mousemove", lineMove, false);
    canvas.removeEventListener("mousedown", lineDown, false);
    canvas.removeEventListener("mouseup", lineUp, false);
    canvas.removeEventListener("mouseout", lineOut, false);
    canvas.removeEventListener("mousedown", mountainDown, false);
    canvas.removeEventListener("mousedown", birdDown, false);
    canvas.removeEventListener("mousedown", randomDown, false);

    //Add its own listener
    canvas.addEventListener("mousedown", textDown, false);
}

function textDown(e) {
    lastIndex = root.children.length;

    var bRect = canvas.getBoundingClientRect();
    currX = (e.clientX - bRect.left) * (canvas.width / bRect.width);
    currY = (e.clientY - bRect.top) * (canvas.height / bRect.height);

    var textSize = Math.random() * 50 + 150

    var textZen = new DoodleImage({
            left: currX,
            top: currY,
            width: textSize,
            height: textSize,
            src: "img/text/text_" + Math.floor(Math.random() * 4 + 1) + ".png",
        });
    root.children.push(textZen);
    root.draw();
    root.children.pop(textZen);

}

/*
    --------------- General functions used across drawing methods ----------------
*/

function cleanCanvas() {
    if (confirm("Clean your beautiful work?") == true) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Remove other listeners first
        //This code is ugly, looking to replace it
        canvas.removeEventListener("mousemove", lineMove, false);
        canvas.removeEventListener("mousedown", lineDown, false);
        canvas.removeEventListener("mouseup", lineUp, false);
        canvas.removeEventListener("mouseout", lineOut, false);

        canvas.removeEventListener("mousedown", mountainDown, false);
    }
}

function undoLast() {
    //If there is nothing in the root container, do nothing
    if (root) {
        //Clear canvas first
        context.clearRect(0, 0, canvas.width, canvas.height);
        //Pop last child
        deletedChildren = root.children.splice(lastIndex);
        //Draw again
        root.draw();
    }
}

function redoLast() {
    if (deletedChildren) {
        //Clear canvas first
        context.clearRect(0, 0, canvas.width, canvas.height);
        //Pop last child
        root.children = root.children.concat(deletedChildren);
        //Draw again
        root.draw();
    }
}

function saveCanvas() {
   // var strDataURI = canvas.toDataURL("image/jpeg");
    Canvas2Image.saveAsPNG(canvas);
}

/*
    ------------- Start ---------------
*/

window.onload = function () {
    init();

    setInterval(function(){
        document.body.style.backgroundImage = "url('img/bkg/bkg_" + Math.floor(Math.random() * 6 + 1) + ".jpg')"
    }, 10000);

}
