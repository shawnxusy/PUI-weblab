/* Doodle Drawing Library
 *
 * Drawable and Primitive are base classes and have been implemented for you.
 * Do not modify them! 
 *
 * Stubs have been added to indicate where you need to complete the
 * implementation.
 * Please email me if you find any errors!
 */

/*
 * Root container for all drawable elements.
 */
function Doodle (context) {
    this.context = context;
    this.children = [];
}

Doodle.prototype.draw = function() {
	// Loop through all children and call their draw functions
    for (var c = 0; c < this.children.length; c++) {
        this.children[c].draw(this.context);
    };   
};


/* Base class for all drawable objects.
 * Do not modify this class!
 */
function Drawable (attrs) {
    var dflt = { 
        left: 0,
        top: 0,
        visible: true,
        theta: 0,
        scale: 1
    };
    attrs = mergeWithDefault(attrs, dflt);
    this.left = attrs.left;
    this.top = attrs.top;
    this.visible = attrs.visible;
    this.theta = attrs.theta*Math.PI/180;
    this.scale = attrs.scale;
}

/*
 * Summary: Uses the passed in context object (passed in by a doodle object)
 * to draw itself.
 */
Drawable.prototype.draw = function(context) {
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
};


/* Base class for objects that cannot contain child objects.
 * Do not modify this class!
 */
function Primitive(attrs) {
    var dflt = {
        lineWidth: 1,
        color: "black"
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.lineWidth = attrs.lineWidth;
    this.color = attrs.color;
}
Primitive.inheritsFrom(Drawable);


function Text(attrs) {
    var dflt = {
        content: "",
        fill: "black",
        font: "12pt Helvetica",
        height: 12
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);

    //Added constructor
    this.content = attrs.content;
    this.fill = attrs.fill;
    this.font = attrs.font;
    this.height = attrs.height;
}
Text.inheritsFrom(Drawable);

Text.prototype.draw = function (context) {
    //Added draw method
    context.fillStyle = this.fill;
    context.font = this.font;
    context.fillText(this.content, this.left, this.height);
};

function DoodleImage(attrs) {
    var dflt = {
        width: -1,
        height: -1,
        src: "",
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    
	//Added constructor
    this.src = attrs.src;
    this.width = attrs.width;
    this.height = attrs.height;

    //Load the iamge
    this.img = new Image();
    var that = this;
    this.img.onload = function() {
        if (that.width == -1) {
            that.width = this.width;
        };
        if (that.height == -1) {
            that.height = this.height;
        }
    };
    this.img.src = attrs.src;
}

DoodleImage.inheritsFrom(Drawable);

DoodleImage.prototype.draw = function (context) {
    var theContext = context;
    var that = this;
    setTimeout(function () {
        theContext.drawImage(that.img, that.left, that.top, that.width, that.height);
    }, 50);
};


function Line(attrs) {
    var dflt = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
    
    //Added constructor
    this.startX = attrs.startX;
    this.startY = attrs.startY;
    this.endX = attrs.endX;
    this.endY = attrs.endY;
}
Line.inheritsFrom(Primitive);

Line.prototype.draw = function (context) {
    context.beginPath();
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.strokeStyle = this.color;
    context.lineWidth = this.lineWidth;
    context.stroke();
    context.closePath();
};


function Rectangle(attrs) {
    var dflt = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        fill: false,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);

	//Added constructor
    this.x = attrs.x;
    this.y = attrs.y;
    this.width = attrs.width;
    this.height = attrs.height;
    this.fill = attrs.fill;

}
Rectangle.inheritsFrom(Primitive);

Rectangle.prototype.draw = function (context) {
    // draw code here
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    if (this.fill) {
        context.fillStyle = this.fill;
        context.fill();
    }
    context.strokeStyle = this.color;
    context.lineWidth = this.lineWidth;
    context.stroke();
};

function Arc(attrs) {
    var dflt = {
        x: 0,
        y: 0,
        radius: 0,
        fill: false,
    };

    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);

    //Added constructor
    this.x = attrs.x;
    this.y = attrs.y;
    this.radius = attrs.radius;
    this.fill = attrs.fill;
}

Arc.inheritsFrom(Primitive);

Arc.prototype.draw = function (context) {
    // draw code here
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    if (this.fill) {
        context.fillStyle = this.fill;
        context.fill();
    }
    context.strokeStyle = this.color;
    context.lineWidth = this.lineWidth;
    context.stroke();
};

//Draw an arbitrary shape
function Mountain(attrs) {
    var dflt = {
        x: 0,
        y: 0,
        size: 10,
        steepness: 5,
        darkest: "rgb(150,150,150)",
    };

    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);

    //Added constructor
    this.x = attrs.x;
    this.y = attrs.y;
    this.size = attrs.size;
    this.steepness = attrs.steepness;
    this.numOfTops = attrs.numOfTops;
    this.darkest = attrs.darkest;
}

Mountain.inheritsFrom(Primitive);

Mountain.prototype.draw = function (context) {
    // draw code here
    context.beginPath();
    context.moveTo(this.x, this.y);

    var topX = this.x;
    var topY = this.y;
    var m = 0;
    // draw mountain, up hill
    for (; m < (this.numOfTops * 2 / 3); m++) {
        oldX = topX;
        oldY = topY;
        topX = oldX + (this.size * Math.random() * 6 + 4);
        topY = oldY - (this.steepness * Math.random() * 5 + 3);
        context.quadraticCurveTo((oldX + topX) / 2, oldY, topX, topY);
    }

    for (; m < this.numOfTops; m++) {
        oldX = topX;
        oldY = topY;
        topX = oldX + (this.size * Math.random() * 5 + 3);
        topY = oldY + (this.steepness * Math.random() * 3 + 1);
        context.quadraticCurveTo((oldX + topX) / 2, oldY, topX, topY);
    }

    // To the end
    endX = topX * (1 + Math.random() / 5);
    endY = this.y
    context.quadraticCurveTo(topX * (1 + Math.random() / 10), this.y, endX, endY);

    // Now, do the color palette
    // Set initial color
    var initialColor = shadeRGBColor(this.darkest, (Math.random() * 0.3));
    var oldColor = initialColor
    var gradience = context.createLinearGradient(this.x, this.y, endX, endY);
    // Actually number of gradience stops has nothing to do with numOfTop, but just for convenience do as below..
    for (var g = 0; g < this.numOfTops; g++){
        var newMiddleColor = shadeRGBColor(oldColor, (Math.random() * 0.2));
        gradience.addColorStop((this.numOfTops - g) / this.numOfTops, newMiddleColor);
        oldColor = newMiddleColor;
    }

    context.fillStyle = gradience;
    context.fill();

};


function Container(attrs) {
    var dflt = {
        width: 100,
        height: 100,
        fill: false,
        borderColor: "black",
        borderWidth: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);    
    this.children = [];
    
    // rest of constructor code here.
    this.width = attrs.width;
    this.height = attrs.height;
    this.fill = attrs.fill;
    this.borderColor = attrs.borderColor;
    this.borderWidth = attrs.borderWidth;
}
Container.inheritsFrom(Drawable);

Container.prototype.draw = function (context) {

    context.beginPath();
    // Draw the container first (stroke + fill)
    context.rect(this.left, this.top, this.width, this.height);

    // Canvas does now allow setting linewidth to 0, so I have to work around it like this.
    context.lineWidth = this.borderWidth + 0.0001;

    context.strokeStyle = this.borderColor;
    context.stroke();

    if (this.fill) {
        context.fillStyle = this.fill;
        context.fill();
    }

    // Need to save the context and later restore it
    context.save();
    context.clip();
    // First do transition
    context.translate(this.left, this.top);
    // Rotate according to the container
    context.rotate(this.theta);
    // Scale the content to the size of container (max)

    // Then draw the content (its children)
    for (var c = 0; c < this.children.length; c++) {
        var theContext = context;
        var theChild = this.children[c];

        function drawChild() {
            console.log(theContext);
            theChild.draw(theContext);
        };
        drawChild();
        
        // console.log(context);
        // this.children[c].draw(context);
    };  

    //Restore the context
    context.restore(); 
};







