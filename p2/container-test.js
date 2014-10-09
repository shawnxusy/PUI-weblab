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

    canvas.removeEventListener("mousemove", handler, false);
    canvas.removeEventListener("mousedown", handler, false);
    canvas.removeEventListener("mouseup", handler, false);
    canvas.removeEventListener("mouseout", handler, false);

    //Add its own listener
    canvas.addEventListener("mousemove", handler('line', 'move'), false);
    canvas.addEventListener("mousedown", handler('line', 'down'), false);
    canvas.addEventListener("mouseup", handler('line', 'up'), false);
    canvas.addEventListener("mouseout", handler('line', 'out'), false);
}


/*
    ------------- Draw Zen fills ----------------
*/
function drawZenFill() {
    //Remove other listeners first
    //This code is ugly, looking to replace it
    canvas.removeEventListener("mousemove", handler, false);
    canvas.removeEventListener("mousedown", handler, false);
    canvas.removeEventListener("mouseup", handler, false);
    canvas.removeEventListener("mouseout", handler, false);

    //Add its own listener
    canvas.addEventListener("mousemove", handler('fill', 'move'), false);
    canvas.addEventListener("mousedown", handler('fill', 'down'), false);
    canvas.addEventListener("mouseup", handler('fill', 'up'), false);
    canvas.addEventListener("mouseout", handler('fill', 'out'), false);
}


/*
    --------------- General functions used across drawing methods ----------------
*/

var handler = function(drawType, action) {
    var resp = function(e) {
        findxy(action, e, drawType);
        console.log(drawType);
    };
    return resp;
};

function findxy(res, e, drawType) {

    if (res == 'down') {
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
            if (drawType == 'line'){
                context.arc(currX, currY, (initialLineWidth / 2 + 0.5), 0, 2 * Math.PI, false);
                context.fillStyle = "rgb(0,0,0)";
            }
            if (drawType == 'fill'){
                context.arc(currX, currY, (initialFillWidth / 3), 0, 2 * Math.PI, false);
                context.fillStyle = "rgb(200,200,200)";
            }
            context.fill();
            context.closePath();
            dot_flag = false;
        };
    };

    if (res == 'up' || res == "out") {
        flag = false;
    };

    if (res == 'move') {
        if (flag) {
            //Increase transcounter to achive gradual transparent results
            transCounter += 1;

            prevX = currX;
            prevY = currY;
            var bRect = canvas.getBoundingClientRect();
            currX = (e.clientX - bRect.left) * (canvas.width / bRect.width);
            currY = (e.clientY - bRect.top) * (canvas.height / bRect.height);

            if (drawType == 'line') {
                //Introduce a gradient as color
                var newColor = shadeRGBColor("rgb(10,10,10)", parseInt(getVariant(100, transCounter, 1)) / 100);
                var newLineWidth = initialLineWidth - getVariant(initialLineWidth, transCounter, 1);
            };

            if (drawType == 'fill') {
                var newColor = shadeRGBColor("rgb(225,225,225)", parseInt(getFloating(10, 5)) / 100);
                var newFillWidth = getFloating(initialFillWidth, 5);
            };

            var gradience = context.createLinearGradient(prevX, prevY, currX, currY);
            gradience.addColorStop(0, prevColor);
            gradience.addColorStop(1, newColor);

            if (drawType == 'line') {
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
            }

            if (drawType == 'fill') {
                var arc = new Arc({
                    x: currX,
                    y: currY,
                    radius: newFillWidth,
                    color: gradience,
                    fill: gradience,
                    lineWidth: 0
                });
                root.children.push(arc);
                root.draw();
            }            
            prevColor = newColor;
        }
    }
};

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

/*
    ------------- Start ---------------
*/

window.onload = function () {
    init();
}
