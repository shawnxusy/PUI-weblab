/*
 * Summary: This function is an easy way to allow one object to inherit from 
 * another. For example, if you want your class Cat to inherit from class Mammal
 * (and Mammal is previously defined), you should do the following:
 * function Cat() {
 * ...
 * }
 * Cat.inheritsFrom(Mammal).
 * This function should be called in the global scope (i.e. outside the Cat constructor).
 * NOTE: you MUST call Cat.inheritsFom IMMEDIATELY AFTER your constructor. Otherwise you could run
 * into bugs.
 * This code borrowed from: http://phrogz.net/js/classes/OOPinJS2.html, see that site
 * for more details. I HIGHLY RECOMMEND READING THIS!
 */
Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
	if ( parentClassOrObject.constructor == Function ) { 
		//Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	}
	else { 
		//Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	} 
	return this;
}

// useful for merging attributes with default
// Merges obj2 with obj1, returning result. If obj1 has property, obj2 overwrites that property
// If either obj1 or obj2 are undefined, DO SOMETHING TODO!!!
function mergeObjects(obj1, obj2) {
    var result = {};
    
    for (var attrname in obj1) {
        result[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        result[attrname] = obj2[attrname];
    }
    return result;
}

function mergeWithDefault(attrs, dflt) {
    var result = defaultIfUndefined(attrs, dflt);
    result = mergeObjects(dflt, attrs);
    return result;
}

function defaultIfUndefined(val, dflt) {
    if (typeof (val) == 'undefined') {
        return dflt;
    }
    return val;
}

//This function transform a color to either darker or lighter
function shadeRGBColor(color, percent) {
    var f=color.split(","),
        t=percent<0?0:255,
        p=percent<0?percent*-1:percent,
        R=parseInt(f[0].slice(4)),
        G=parseInt(f[1]),
        B=parseInt(f[2]);
        console.log(R + G + B);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
};

//This function receives a scale and a current count, returning a randomized value around the original count in relation to the scale
//If a line is quite long, then it will get transparent soon, and we set that threshold to be 200
//Level is the level of variation (around 1)
function getVariant(scale, count, level) {
    if (count >=  200){
        return scale;
    };
    var percentVar = Math.random() - 0.5;

    return (count / 300 * (1 + percentVar * level) * scale);
};

//This function returns a random number around the given one, with a variance level (around 1)
function getFloating(orig, level) {
    //Generate from -0.1 to 0.1
    var percentVar = (Math.random() - 0.5) / 5 * level;

    return (orig * (1 + percentVar));
}