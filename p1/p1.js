/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Project 1 Sliding Block Puzzle
Author : 
Created : 
Modified : 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/

var IMAGE_PATH = "dock.jpg";
var IMAGE_WIDTH =  690;
var IMAGE_HEIGHT = 472;
// Change these if you use your own image.

//Randomize number of row/columns each time, range is 4 to 8
var NUM_ROWS = Math.floor(Math.random() * 5 + 4);
var NUM_COLS = NUM_ROWS;

// Location of the empty tile:
var emptyRow = 0;
var emptyCol = 0;


// Add any other global variables you may need here.
var imageWidth = 0;
var imageHeight = 0;

var clickSequence = []
/**
 * Creates all the tiles necessary.
 * @return undefined
 */
function createTiles(){
    // figure out how wide and tall each tile should be
    // Get the size of the background image, so as to determine the appropriate width and height for each tile.
    // With reference to http://stackoverflow.com/questions/3098404/get-the-size-of-a-css-background-image-using-javascript
    createImage();
    var imageSrc = document
                    .getElementById('bkg-image')
                     .style
                      .backgroundImage
                       .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
                        .split(',')[0];
    var image = new Image();
    image.onload = function() {
        imageWidth = this.width;
        imageHeight = this.height;
    }
    image.src = imageSrc;

    //unforrunately I have to use this ugly setTimeout function, since image size could not be got otherwise
    var tileSet = [];
    setTimeout(function(){
        var tileWidth = imageWidth / NUM_ROWS;
        var tileHeight = imageHeight / NUM_COLS;

        // add all of the tiles to your page using nested for loops and
        // createDiv. Remember to leave one out for the empty tile
        for (i = 0; i < (NUM_ROWS); i++) {
            for (j = 0; j < (NUM_COLS); j++) {
                tileSet.push(createDiv(tileWidth, tileHeight, i+1, j+1));
            }
        }

        // Make the last tile red
        tileSet[(NUM_ROWS * NUM_COLS) - 1].style.backgroundImage = "none";
        tileSet[(NUM_ROWS * NUM_COLS) - 1].style.backgroundColor = "rgb(247, 28, 29)";

        // add event listener to each of the divs, waiting for mouse clicks.
        $(".image-piece").each(function() {
            $(this).click(function(e) {
                tileClicked(this.id);
            });
        });

        // add keyboard listener to control the puzzle
        $(function() {
            $(window).keydown(function(e) {
                var key = e.which;
                console.log("Key pressed is: " + key);

                //find the current empty tile
                var emptyTile;
                $(".image-piece").each(function() {
                    if (this.style.backgroundImage === "none"){
                        emptyTile = this.id;
                    }
                });

                //deal with different key input
                switch(key) {
                    //left arrow
                    case 37:
                        //if not at the last column
                        if (emptyTile < (NUM_ROWS * NUM_COLS - NUM_ROWS + 1)) {
                            tileClicked((parseInt(emptyTile) + NUM_ROWS));
                        };
                    //up arrow
                    case 38:
                        //if not at the last row
                        if ((emptyTile % NUM_ROWS) != 0) {
                            tileClicked((parseInt(emptyTile) + 1));
                        }
                    //right arrow
                    case 39:
                        //if not at the first column
                        if ((emptyTile - NUM_ROWS) > 0) {
                            tileClicked((parseInt(emptyTile) - NUM_ROWS));
                        };
                    //down arrow
                    case 40:
                        //if not at the first row
                        if (((emptyTile - 1) % NUM_ROWS) != 0) {
                            tileClicked((parseInt(emptyTile) - 1));
                        }
                }
            });
        });        

    }, 100);

  // hint: you can use document.body.appendchild
}

/**
* Create a image, later migt be from Flickr.
* return [imageWidth, imageHeight]
*/

function createImage(){
    var bkgImage = document.createElement('div');
    bkgImage.style.backgroundImage = "url("+IMAGE_PATH+")";
    bkgImage.style.backgroundRepeat = "no-repeat";
    bkgImage.style.display = "none";
    bkgImage.style.minHeight = "400px";
    bkgImage.id = "bkg-image";

    document.body.appendChild(bkgImage);     
}

/**
 * Returns a div with the specified width and height and puts it at the
 * supplied row and column.
 * @param width Fill in what each of these parameters mean!
 * @param height
 * @param row
 * @param col
 * @return The div you created
 */
function createDiv(width, height, row, col){
  // create your div and set its size & position attributes
  // based on parameters
    var tilediv = document.createElement('div');
    tilediv.style.backgroundImage = "url(" + IMAGE_PATH + ")";
    tilediv.style.backgroundRepeat = "no-repeat";
    tilediv.style.backgroundPosition =  (0-(row-1)*width).toString() + "px " + (0-(col-1)*height).toString() + "px";
    tilediv.style.height = height + "px";
    tilediv.style.width = width + "px";
    tilediv.style.position = "absolute";
    tilediv.style.top = (height * (col-1)).toString() + "px";
    tilediv.style.left = (width * (row-1)).toString() + "px";
    tilediv.id = (col + (row-1) * NUM_ROWS).toString();
    tilediv.className = "image-piece";

    document.getElementById("game-board").appendChild(tilediv);
    return tilediv;

}

/*--------------- Now is the shuffling part ------------------*/

/**
 * Shuffle up the tiles in the beginning of the game
 * @return
 */
function shuffleTiles(){
    var timer;
    setTimeout(function(){
        //Switch tiles for many times, note that most of them hit on non-movable tiles
        //For larger puzzles, randoming intervals are shorter, so there are more chances to shuffle
        timer = setInterval(function() {
                shuffleIt();
            }, (60 / NUM_ROWS));
    }, 300);

    //Used to clear the shuffling (set to 5s of shuffling)
    //For larger puzzles, randoming time is longer, so there is longer time to shuffle
    setTimeout(function(){
        window.clearInterval(timer);
    }, 250 * NUM_ROWS * NUM_ROWS)
}

function shuffleIt() {
    var randomTileID = Math.floor((Math.random() * NUM_ROWS * NUM_COLS) + 1);
    tileClicked(randomTileID);
}

/**
 * Example function that could get called when a tile is clicked.
 * @param the ID of the tile clicked.
 * @return Fill in what the function returns here!
 */
function tileClicked(tileID){
  // check if the tile can move to the empty spot
  // if the tile can move, move the tile to the empty spot
    var emptyNeighbor = scanEmptyNeighbor(tileID);
    if (emptyNeighbor != 0) {
        switchTiles(tileID, emptyNeighbor);
        clickSequence.push(tileID);
        $('body').css('background-color', shadeRGBColor($('body').css('background-color'), -0.03));
    }
}

/**
* Color changing function from the internet: http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
*/
function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

/**
 * Function that get a tile and scan for empty neighbor
 * @param ID of the tile to be scanned
 * @return 0 if not found, id of the empty tile if found.
 */
function scanEmptyNeighbor(tileID) {
    //left tile
    if (((parseInt(tileID) - NUM_ROWS)) > 0) {
        if (checkEmptyTile((parseInt(tileID) - NUM_ROWS))) {
            return((parseInt(tileID) - NUM_ROWS));
        }
    }
    //lower tile
    if (((parseInt(tileID) % NUM_ROWS) != 0)) {
        if (checkEmptyTile((parseInt(tileID) + 1))) {
            return((parseInt(tileID) + 1));
        }
    }

    //right tile
    if (((parseInt(tileID) + NUM_ROWS)) < (NUM_ROWS * NUM_COLS + 1)) {
        if (checkEmptyTile((parseInt(tileID) + NUM_ROWS))) {
            return((parseInt(tileID) + NUM_ROWS));
        }
    }

    //upper tile
    if (((parseInt(tileID)) - 1) % NUM_ROWS != 0) {
        if (checkEmptyTile((parseInt(tileID) - 1))) {
            return((parseInt(tileID) - 1));
        }
    }

    return 0;
}


/**
 * Function that get a tile and check if it is empty
 * @param ID of the tile to be checked
 * @return true if empty, false if not 
 */
function checkEmptyTile(tileID) {
    return ($("#"+tileID.toString())[0].style.backgroundImage === "none");
}


/**
 * Function that switch position of two tiles.
 * @param ID of the tile to be switched.
 * @no return value
 */
function switchTiles(id1, id2){
    //id1 is the tile with image, id2's backgroundImage is none;
    //create a temp div to temporarily hold id1, so as to switch

    //Set id2's background image to be id1's (this removes the none value)
    $("#"+id2.toString())[0].style.backgroundImage = "url(" + IMAGE_PATH + ")";

    $("#"+id2.toString())[0].style.backgroundPosition = $("#"+id1.toString())[0].style.backgroundPosition;

    //Now set id1's background-image to none, and get a background color
    $("#"+id1.toString())[0].style.backgroundColor = "rgb(250, 97, 121)";
    $("#"+id1.toString())[0].style.backgroundImage = "none";
}


/*--------------- Now is the auto solving part ------------------*/

function solveIt() {
    clickSequence.reverse();
    console.log(clickSequence);

    i = 0;
    var interval = setInterval(function() {
        tileSolve(clickSequence[i]);
        i += 1;

        if (i == clickSequence.length) {
            clearInterval(interval);
        }
    }, 200);

    setTimeout(function() {
        tileSolve(NUM_ROWS * NUM_COLS);
    }, (210 * clickSequence.length));
}



/**
 * Example function that could get called when a tile is clicked (to reverse what has been done)
 * @param the ID of the tile clicked.
 * @return Fill in what the function returns here!
 */
function tileSolve(tileID){
  // check if the tile can move to the empty spot
  // if the tile can move, move the tile to the empty spot
    var emptyNeighbor = scanEmptyNeighbor(tileID);
    if (emptyNeighbor != 0) {
        switchTiles(tileID, emptyNeighbor);
        $('body').css('background-color', shadeRGBColor($('body').css('background-color'), 0.03));
        $('.header').css('color', shadeRGBColor($('.header').css('color'), -0.05));
    };
}


/**
 * When the page loads, create our puzzle
 */
window.onload = function () {
  // generate parameters for a random puzzle

  // create the tiles
  createTiles();
  // shuffle the tiles
  shuffleTiles();
}
