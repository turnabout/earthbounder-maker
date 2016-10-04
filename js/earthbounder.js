// Earthbounder v0.1
// Written by Kevin Pageau
// ...with moderate help from resources all over the internets

// Graphics from Earthbound (SNES)

// Music / Sound effects from :
// Earthbound (SNES)
// Ducktales (NES)
// Legend of Zelda : Link's Awakening (GB)
// Legend of Zelda : Oracle of Ages/Seasons (GBC)

// Optimised for use with Google Chrome




// requestAnimationFrame function, used to animate game
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();






/*** CONSOLE ***/

// This part is used to create a console 
// that shows some variables value onscreen during gameplay


// Grab html div element
var console = document.getElementById("debug");

// LEFT CONSOLE SIDE //
// Contains labels

// Create ul element for list of items & append to debug console div
var consoleItemsList = document.createElement("ul");

// Style for ul
consoleItemsList.style.cssText = "position:absolute;left:0;top:-17px;height:200px;width:150px;text-align:left;list-style-type:none;";

// Append it
console.appendChild(consoleItemsList);


// Create left list LI elements & append
var consoleItems = [];

for ( var i = 0 ; i < 13 ; i++ ) {
	consoleItems[i] = document.createElement("li");
}

consoleItems[0].innerHTML = "Player X";
consoleItems[1].innerHTML = "Player Y";
consoleItems[2].innerHTML = "P. Center";
consoleItems[3].innerHTML = "P. X Velocity";
consoleItems[4].innerHTML = "P. Y Velocity";
consoleItems[5].innerHTML = "Tick Count";
consoleItems[6].innerHTML = "Airborne";
consoleItems[7].innerHTML = "Y Offset";
consoleItems[8].innerHTML = "X Offset";
consoleItems[9].innerHTML = "Mouse X";
consoleItems[10].innerHTML = "Mouse Y";
consoleItems[11].innerHTML = "Mouse Mode";
// consoleItems[12].innerHTML = "Entities [1]";

for ( var j = 0 ; j < 13 ; j++ ) {
	consoleItemsList.appendChild(consoleItems[j]);
}


// RIGHT CONSOLE SIDE //
// Contains data

// Create ul element for list of data & append to debug console div
var consoleDataList = document.createElement("ul");

// Style for ul
consoleDataList.style.cssText = "position:absolute;right:0;top:-17px;height:300px;width:150px;text-align:left;list-style-type:none;";

// Append it
console.appendChild(consoleDataList);


// Create right list li elements & append
var consoleData = [];

for (i = 0; i < 13 ; i++) {
	consoleData[i] = document.createElement("li");
	consoleData[i].id = "consoleData" + i;
}

for (j = 0 ; j < 13 ; j++) {
	consoleDataList.appendChild(consoleData[j]);
}












	
	
	
	
	
	
/*** IMAGES ***/

// Object to contain all images used by the game
var imageRepository = new function() {

	/* Define images */
	
	// Player Sprite Sheets
	this.nessSheet = new Image();
	this.hippieSheet = new Image();
	
	// Map Tilesets
	this.onettTileset = new Image();
	
	
	
	// Background
	this.bgDallam = new Image();
	this.bgOnett = new Image();
	this.bgOnettStars = new Image();
	
	// Obstacles
	
	this.regularObstacle = new Image();
	this.smallObstacle = new Image();
	this.largeObstacle = new Image();
	this.largerObstacle = new Image();
	this.bouncyObstacle = new Image();

	this.present = new Image();
	
	// Entities
	
	this.pushableEntity = new Image();
	
	/* Set images SRC */
	
	this.nessSheet.src = "images/sheet_ness.png";
	this.hippieSheet.src = "images/sheet_hippie.png";
	
	this.bgDallam.src = "images/bg_dallam.png";
	this.bgOnett.src = "images/bg_onetta.png";
	this.bgOnettStars.src = "images/bg_onett_stars.png";
	
	this.regularObstacle.src = "images/regular_obstacle1.png";
	this.smallObstacle.src = "images/small_obstacle.png";
	this.largeObstacle.src = "images/large_obstacle.png";
	this.largerObstacle.src = "images/larger_obstacle.png";
	this.bouncyObstacle.src = "images/bouncy_obstacle.png";
	
	this.present.src = "images/present.png";
	
	this.pushableEntity.src = "images/pushable_entity.png";
	
	
	/* Verify that all images are loaded */
	/* Then loads the game               */
	
	var numImages = 11;
	var numLoaded = 0;
	
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			update();
		}
	}
	
	
	
	this.nessSheet.onload = function() {
		imageLoaded();
	};	
	
	this.hippieSheet.onload = function() {
		imageLoaded();
	};
	
	
	this.bgDallam.onload = function() {
		imageLoaded();
	};	
	this.bgOnett.onload = function() {
		imageLoaded();
	};
	this.bgOnettStars.onload = function() {
		imageLoaded();
	};
	
	
	this.regularObstacle.onload = function() {
		imageLoaded();
	};	
	this.smallObstacle.onload = function() {
		imageLoaded();
	};		
	this.largeObstacle.onload = function() {
		imageLoaded();
	};		
	this.largerObstacle.onload = function() {
		imageLoaded();
	};		
	this.bouncyObstacle.onload = function() {
		imageLoaded();
	};	
	
	this.present.onload = function() {
		imageLoaded();
	};	
	
	this.pushableEntity.onload = function() {
		imageLoaded();
	};	

	
};



/*** SOUNDS ***/

var Sounds =  {
	// Sound effects
	hit : new Audio("audio/hit.wav"),
	yell : new Audio("audio/yell.wav"),
	itemGet1 : new Audio("audio/itemget1.wav"),
	itemGet2 : new Audio("audio/itemget2.wav"),
	jump : new Audio("audio/jump.wav"),
	bounce : new Audio("audio/bounce.wav"),
};

// Change all sound effects and music volume

Sounds.hit.volume = 0.5;
Sounds.yell.volume = 0.5;
Sounds.itemGet1.volume = 0.3;
Sounds.itemGet2.volume = 0.3;
Sounds.jump.volume = 0.6;
Sounds.bounce.volume = 0.6;



/*** GENERAL VARIABLES ***/

// Get canvas elements, contexts & dimensions

// Main canvas (character, obstacles, foreground)
var canvas = document.getElementById("main"),
	ctx = canvas.getContext("2d"),
	canvasWidth = canvas.width,
	canvasHeight = canvas.height;

// Background canvas (starry background)
var bgCanvas = document.getElementById("background"),
	bgctx = bgCanvas.getContext("2d");
	
// Text canvas (any text)
var textCanvas = document.getElementById("text"),
	textctx = textCanvas.getContext("2d");
	
	
// Array under which user pressed keys are stored
// with a value of either true or false
var keys = [];


// Will contain everything unaffected by gravity 
// the player can collide with
var boxes = [];

// Will contain everything in the game affected by gravity
var entities = [];


// Variable that increments everytime the game updates
// currently only used to animate player walking cycle
var tickCount = 0;


// Player friction to the ground
var friction = 0.8;

// Player attraction to the ground
var gravity = 0.3;
	
	
	
// Stores how far the X and Y offsets are
// these are used to calculate how the camera should follow
// the player around
var offsetX = 0;
var offsetY = 0;

	
// Variable with starry pattern for drawing repeated background across map
var pattern;
	
// Variable that can be toggled with keys 3 & 4
// When set to true, invisible obstacles will be rendered
var renderInvisible = true;
	
	
// How many presents the player needs to collect left
// before the level is complete
var presentsToCollect = 4;
	
// Game over variable
// When set to true, the endGame function is executed
var gameOver = false;
	
	
// Variable with small textbox html div, used to display
// restart text when game is over

var textBox = document.getElementById("textBox");
	


	
	
	
/*** GAME OBJECTS ***/
	
/*/ Abstract object /*/
// can be used to make other objects inherit basic properties



function Drawable() {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	
	this.type = "";
	this.speed = 0;
	
	this.init = function(x,y) {
		this.x = x;
		this.y = y;
	};

	this.draw = function() {
	
	};
}








/*/ Player object /*/



function Player() {

	this.width = 16;
	this.height = 24;
	
	this.speed = 4;
	this.velX = 0;
	this.velY = 0;
	
	// Health and lives
	// when lives reach 0, game over
	// when health reaches 0, -1 lives
	// player can lose health from long falls
	this.lives = 3;
	this.health = 3;
	
	this.jumping = false;
	this.doubleJumping = false;
	this.grounded = false;
	this.airborne = false;
	
	this.gravity = gravity;
	
	// Defines how high the player can jump
	this.jumpForce = 2;
	// Defines player's pushing force
	this.pushForce = 3;
	
	// Define if the player has the ability to double jump 
	//*implemented but currently disabled
	this.canDoubleJump = false;
	
	// Whether player is pushing against a wall/box
	// could use in the future for pushing animations
	this.pushing = false;
	
	this.checkpoint = [325,325];
	
	// To specify in collisions - this shape is player
	this.player = true;
	
	
	// PLAYER ANIMATION
	
	// Sets image source's x - y positions
	this.sX = 0;
	this.sY = 0;
	
	// Counter we use to know when to change frames
	this.counter = 0;
	// Change frames every 15 frames
	// raise to make animation faster
	this.step = 15;
	
	// Sets start positions from source depending
	// on walking direction
	this.animationStart = {
		rightX : 0,
		leftX : 0
	}
	
	
	// Changes value of the current checkpoint property
	this.changeCheckpoint = function(x,y) {
		this.checkpoint = [x,y];
	}
	
	this.initCheckpoint = function(x,y) {
		this.x = this.checkpoint[0];
		this.y = this.checkpoint[1];
	}
	
	// Character's sprite sheet
	this.sheet = imageRepository.hippieSheet;
	
	
	// Player draw function
	this.draw = function() {
	
	
		// If player is airborne
		if (this.airborne) {
		
		
			// Jumping left
			if (keys[37]) {
				ctx.drawImage(this.sheet,16,24,16,24,this.x, this.y,16,24);
				
			// Jumping right
			} else if (keys[39]) {
				ctx.drawImage(this.sheet,16,48,16,24,this.x, this.y,16,24);
				
			// Standing still
			} else {
				ctx.drawImage(this.sheet,0,0,16,24,this.x, this.y,16,24);
			}
			
			
		// If player is on the ground
		}else{
		
			// Walking left
			if (keys[37]) {
			
				if(tickCount < 30) {
					ctx.drawImage(this.sheet,0,24,16,24,this.x, this.y,16,24);
				}else{
					ctx.drawImage(this.sheet,16,24,16,24,this.x, this.y,16,24);
				}
				
				
			// Walking right
			}else if (keys[39]) {
			
				if(tickCount < 30) {
					ctx.drawImage(this.sheet,0,48,16,24,this.x, this.y,16,24);
				}else{
					ctx.drawImage(this.sheet,16,48,16,24,this.x, this.y,16,24);
				}
				
			// Standing still
			}else{
				ctx.drawImage(this.sheet,0,0,16,24,this.x, this.y,16,24);
			}
		
		}
	}



}



// Makes the Player object inherit properties from Drawable
Player.prototype = new Drawable();

// Instantiates player object and places it on map with init() method
var player = new Player();

player.initCheckpoint();






/*/ Obstacles Objects /*/
// Obstacles are anything unaffected by gravity


// Boundary object used only for boundary obstacles (invisible)

function Boundary(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	this.type = "Boundary";
	this.bouncy = false;
}
Boundary.prototype = new Drawable();




// Regular obstacle object
function RegularObstacle(x,y,b) {
	this.x = x;
	this.y = y;
	this.width = 32;
	this.height = 29;
	
	// The obstacle's type
	this.type = "RegularObstacle";
	// Sets whether the obstacle is bouncy or not
	this.bouncy = false;
	
	// Sets the obstacle's image so the render function
	// can draw the appropriate obstacle
	this.img = imageRepository.regularObstacle;
	this.box = true;
}
RegularObstacle.prototype = new Drawable();



// Small obstacle object
function SmallObstacle(x,y,b) {
	this.x = x;
	this.y = y;
	this.width = 15;
	this.height = 15;
	
	this.type = "SmallObstacle";
	
	this.bouncy = false;
	this.img = imageRepository.smallObstacle;
	this.box = true;
}
SmallObstacle.prototype = new Drawable();



// Large obstacle object
function LargeObstacle(x,y,b) {
	this.x = x;
	this.y = y;
	this.width = 60;
	this.height = 29;
	
	this.type = "LargeObstacle";
	
	this.bouncy = false;
	this.img = imageRepository.largeObstacle;
	this.box = true;
}
LargeObstacle.prototype = new Drawable();


// Larger obstacle object
function LargerObstacle(x,y,b) {
	this.x = x;
	this.y = y;
	this.width = 112;
	this.height = 54;
	
	this.type = "LargerObstacle";
	
	this.bouncy = false;
	this.img = imageRepository.largerObstacle;
	this.box = true;
}
LargerObstacle.prototype = new Drawable();


// Bouncy obstacle object
function BouncyObstacle(x,y) {
	this.x = x;
	this.y = y;
	this.width = 36;
	this.height = 21;
	
	this.type = "BouncyObstacle";
	
	this.bouncy = true;
	
	// The obstacle's bounce force. The higher,
	// the farther the player will bounce on it
	this.bounceForce = 3.5;
	this.img = imageRepository.bouncyObstacle;
	this.box = true;
	
	this.changeBounceForce = function(bounceForce) {
		this.bounceForce = bounceForce;
	}
}
BouncyObstacle.prototype = new Drawable();


// Present obstacle object
// Collectable item that can be picked up by the player
function Present(x,y) {
	this.x = x;
	this.y = y;
	this.width = 16;
	this.height = 16;
	
	this.type = "Present";
	
	// Signifies whether this obstacle can be picked up or not
	this.collectible = true;
	this.img = imageRepository.present;
	this.box = true;
}
Present.prototype = new Drawable();





/*/ Physical Entities Objects /*/
// Physical entities are all affected by gravity

function PushableEntity(x,y) {

	this.x = x;
	this.y = y;
	this.width = 32;
	this.height = 32;
	
	this.type = "PushableBox";
	this.velX = 0;
	this.velY = 0;
	
	this.checkpoint = [0,0];
	
	this.changeCheckpoint = function(x,y) {
		this.checkpoint = [x,y];
	}
	
	this.initCheckpoint = function(x,y) {
		this.x = this.checkpoint[0];
		this.y = this.checkpoint[1];
	}
	
	
	this.grounded = false;
	
	
	this.gravity = gravity;
	
	
	this.img = imageRepository.pushableEntity;
	this.type = "PushableEntity";
	
	this.entity = true;
	this.pushable = true;

}
PushableEntity.prototype = new Drawable();



/*** UPDATE GAME OBJECTS ***/
// All main game functions that update the game
// and render it


// Function that updates the debugging console
// with important variables
function updateConsole() {

	var cdata0 = document.getElementById("consoleData0");
	var cdata1 = document.getElementById("consoleData1");
	var cdata2 = document.getElementById("consoleData2");
	var cdata3 = document.getElementById("consoleData3");
	var cdata4 = document.getElementById("consoleData4");
	var cdata5 = document.getElementById("consoleData5");
	var cdata6 = document.getElementById("consoleData6");
	var cdata7 = document.getElementById("consoleData7");
	var cdata8 = document.getElementById("consoleData8");

	cdata0.innerHTML = Math.floor(player.x);
	cdata1.innerHTML = Math.floor(player.y);
	cdata2.innerHTML = Math.floor( player.x + ( player.width / 2 ) ) + " , " + Math.floor( player.y + (player.height / 2) );
	cdata3.innerHTML = Math.round( player.velX );
	cdata4.innerHTML = Math.round( player.velY );
	cdata5.innerHTML = tickCount;
	cdata6.innerHTML = player.airborne;
	cdata7.innerHTML = Math.round(-offsetY);
	cdata8.innerHTML = Math.round(-offsetX);
}










/*** GAME MAP EDITOR START ***/



// Console spots in which the Mouse X - Y positions are stored, and also the "mouse mode"
var cdata9 = document.getElementById("consoleData9");
var cdata10 = document.getElementById("consoleData10");
var cdata11 = document.getElementById("consoleData11");

// Initial mouse console data
cdata9.innerHTML = '0';
cdata10.innerHTML = '0';
cdata11.innerHTML = 'Add';

// Vertical and horizontal lock
var verLock = false;
var horLock = false;

// Current editing mode
var editingMode = 1;

// Mouse object
var mouse = {
	width: 1,
	height: 1,
	mouse: true,
	down: false,
};

// Type of element to add
var elementType;

// For Move Mode
var itemToMove;
var entityToMove;

var moving = false;


// Logs mousepos in debug console, moves obstacles
textCanvas.addEventListener('mousemove', function(evt) {

	var position = getMousePos(evt);
	var elementX = position.x;
	var elementY = position.y;
	
	mouse.x = elementX + -offsetX;
	mouse.y = elementY + -offsetY;
	
	
	cdata9.innerHTML = mouse.x;
	cdata10.innerHTML = mouse.y;
	
	// Moving items
	if (moving) {
	
		// If moved item is player or entity
		if (itemToMove.jumpForce || itemToMove.pushable){
		
			itemToMove.velY = 0;
			itemToMove.gravity = 0;
		
		}

	
		// Moving player
		if (itemToMove.jumpForce || itemToMove.pushable) {
		
			itemToMove.x = mouse.x - (itemToMove.width / 2);
			itemToMove.y = mouse.y - (itemToMove.height / 2);

		// Moving obstacles
		}else{
	
			// No axis lock
			if (!verLock && !horLock) {
				itemToMove.x = mouse.x - (itemToMove.width / 2);
				itemToMove.y = mouse.y - (itemToMove.height / 2);
				
			// Both axes locked
			}else if (verLock && horLock){
				itemToMove.x = verLock - (itemToMove.width / 2);
				itemToMove.y = horLock - (itemToMove.height / 2);
			
			// Y axis locked (only move vertically)
			}else if (verLock) {
				itemToMove.x = verLock - (itemToMove.width / 2);
				itemToMove.y = mouse.y - (itemToMove.height / 2);
				
			// X axis locked (only move horizontally)
			}else if (horLock) {
				itemToMove.x = mouse.x - (itemToMove.width / 2);
				itemToMove.y = horLock - (itemToMove.height / 2);
			
			}
		
		}
		
	}
	
  }, false);



// Gets mouse position inside canvas
function getMousePos(evt) {
	var rect = textCanvas.getBoundingClientRect();
	return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
	};
}



// Works with dropdown list to get current item to add
function getCurrentItemToAdd() {
	
	var select = document.getElementById("itemType");
	var selectValue = select.value;
	
	switch (selectValue){
	
	// Platforms
	
	// Reg
	case "p1":
		elementType = "platform";
		return new RegularObstacle();
		break;
		
	// Small
	case "p2":
		elementType = "platform";
		return new SmallObstacle();
		break;
		
	// Large
	case "p3":
		elementType = "platform";
		return new LargeObstacle();
		break;
		
	// Larger
	case "p4":
		elementType = "platform";
		return new LargerObstacle();
		break;
		
	// Bouncy
	case "p5":
		elementType = "platform";
		return new BouncyObstacle();
		break;
		
		
	// Collectibles
	
	// Present
	case "c1":
		elementType = "platform";
		return new Present();
		break;
		
	// Entities
	
	// Pushable
	case "e1":
		elementType = "entity";
		return new PushableEntity();
		break;
		
		
	// Others
	
	// Player
	case "p":
		elementType = "player";
		return;
		break;
		
	default:
		break;
	}
	
}
  

  
  
//Add or delete obstacle
textCanvas.addEventListener('click',function(evt) {

	var position = getMousePos(evt);
	var elementX = position.x, elementY = position.y;
	
	mouse.x = elementX + -offsetX; 
	mouse.y = elementY + -offsetY;
		
		
	
	// Create Mode
	if (editingMode == 1) {
	
		var elementToAdd = getCurrentItemToAdd();
		
		// Change Player checkpoint
		if (elementType == "player") {
			player.velY = 0;
			player.init( mouse.x - (player.width / 2) ,mouse.y - (player.height / 2) );
			player.changeCheckpoint( mouse.x - (player.width / 2) ,mouse.y - (player.height / 2) );
			
		// Create obstacle
		}else if ( elementType == "entity" ) {
			elementToAdd.init(mouse.x - (elementToAdd.width / 2) , mouse.y - (elementToAdd.height / 2) );
			elementToAdd.changeCheckpoint(mouse.x,mouse.y);
			entities.push(elementToAdd);
			
		}else if (elementType == "platform") {
			elementToAdd.init(mouse.x - (elementToAdd.width / 2) , mouse.y - (elementToAdd.height / 2) );
			boxes.push(elementToAdd);
		}
		
	}
	
	// Delete Mode
	if (editingMode == 3) {

		var obsToDelete = false;
		var enToDelete = false;
		
		
		// Delete Obstacles
		for (var i = 0 ; i < boxes.length ; i++) {
		
			obsToDelete = colCheck(mouse, boxes[i]);

			
			if (obsToDelete) {
				boxes.splice(i,1);
				obsToDelete = false;
			}
			
		}
		
		// Delete Entities
		for (var j = 0 ; j < entities.length ; j++) {
		
			enToDelete = colCheck(mouse, entities[j]);
			
			if (enToDelete) {
				entities.splice(j,1);
				enToDelete = false;
			}
		
		}
		
	}
	
}, false);

  
// For Move Mode
textCanvas.addEventListener('mousedown',function(evt) {
	
	
	// Move Mode
	if (editingMode == 2) {

		var moveObs = false;
		var moveEn = false;
		var movePlay = false;
		
		if (!moving) {
		
			movePlay = colCheck(mouse, player);
			
			// Move player
			if (movePlay) {
			
				itemToMove = player;
				moving = true;
				
			// Move obstacle
			}else{
		
		
				for (var i = 0 ; i < boxes.length ; i++) {
				
					moveObs = colCheck(mouse, boxes[i]);
					
					if (moveObs) {
						itemToMove = boxes[i];
						moving = true;
					}
					
				}
				
				// Move Entity
				for (var j = 0 ; j < entities.length ; j++) {
				
					moveEn = colCheck(mouse, entities[j]);
					
					if (moveEn) {
						itemToMove = entities[j];
						moving = true;
					}
					
				}
				
				
			}
			
		}
		
	}
	
	
}, false);


textCanvas.addEventListener('mouseup',function(evt) {

	if (typeof itemToMove !== 'undefined') {
		itemToMove.gravity = gravity;

		if (itemToMove.entity) {
			itemToMove.changeCheckpoint(mouse.x,mouse.y);
		}
		
		moving = false;
	}

}, false);

  
// Draws white axis lock lines
function drawAxisLocks() {

	if (horLock) {
		
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.rect(-offsetX,horLock,800,1);
		ctx.fill();
		
	}
	
	if (verLock) {
		
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.rect(verLock,-offsetY,1,580);
		ctx.fill();
		
	}

}
  
  
// Generates all coding for level in textfield
function getLevelCode() {

	var levelCode = "";
	
	// Player init code
	levelCode = "	player.changeCheckpoint( " + Math.round(player.checkpoint[0]) + ", " + Math.round(player.checkpoint[1]) + " );\n";
	levelCode += "	player.initCheckpoint();\n\n";
	
	// Boxes init code
	for (var i = 0; i < boxes.length; i++) {
	
		levelCode += "	boxes.push (new " + boxes[i].type + " ( " + Math.round(boxes[i].x) + ", " + Math.round(boxes[i].y) + " ) );\n";
		
	}
	
	levelCode+= "\n";
	
	// Entities init code
	for (var j = 0; j < entities.length; j++) {
		
		levelCode+= "	entities.push (new " + entities[j].type + " ( " + Math.round(entities[j].x) + ", " + Math.round(entities[j].y) + " ) );\n";
		
		levelCode+= "	entities[" + j + "].checkpoint = [" + Math.round(entities[j].checkpoint[0]) + "," + Math.round(entities[j].checkpoint[1]) + "];\n";
		
	}
	
	document.getElementById("levelCode").innerHTML = levelCode;

}
  

/*** GAME MAP EDITOR END ***/


  
  // Instances all game objects and initializes them
function initializeGame() {

	player.changeCheckpoint( 351, 17 );
	player.initCheckpoint();

	boxes.push (new RegularObstacle ( 638, -264 ) );
	boxes.push (new RegularObstacle ( 669, -264 ) );
	boxes.push (new LargerObstacle ( 186, 41 ) );
	boxes.push (new SmallObstacle ( 1394, -358 ) );
	boxes.push (new LargerObstacle ( 1602, -304 ) );
	boxes.push (new RegularObstacle ( 1776, -346 ) );
	boxes.push (new SmallObstacle ( 1902, -387 ) );
	boxes.push (new LargerObstacle ( 293, 41 ) );
	boxes.push (new LargerObstacle ( 77, 41 ) );
	boxes.push (new LargerObstacle ( 401, 9 ) );
	boxes.push (new LargerObstacle ( 512, 9 ) );
	boxes.push (new LargerObstacle ( 885, 9 ) );
	boxes.push (new LargerObstacle ( 622, 9 ) );
	boxes.push (new LargerObstacle ( 776, 9 ) );
	boxes.push (new BouncyObstacle ( 737, 13 ) );
	boxes.push (new RegularObstacle ( 699, -264 ) );
	boxes.push (new RegularObstacle ( 921, -373 ) );
	boxes.push (new LargeObstacle ( -159, -119 ) );
	boxes.push (new LargeObstacle ( -217, -119 ) );
	boxes.push (new LargeObstacle ( -161, -36 ) );
	boxes.push (new LargeObstacle ( -221, -36 ) );
	boxes.push (new LargeObstacle ( 24, 266 ) );
	boxes.push (new LargeObstacle ( 952, -373 ) );
	boxes.push (new LargeObstacle ( 25, -64 ) );

	entities.push (new PushableEntity ( 317, 9 ) );
	entities[0].checkpoint = [280,-41];
	entities.push (new PushableEntity ( 52, 234 ) );
	entities[1].checkpoint = [55,251];
	entities.push (new PushableEntity ( 641, -23 ) );
	entities[2].checkpoint = [507,-196];
	entities.push (new PushableEntity ( 128, 9 ) );
	entities[3].checkpoint = [165,24];
	entities.push (new PushableEntity ( 52, 202 ) );
	entities[4].checkpoint = [52,44];
	entities.push (new PushableEntity ( 285, 9 ) );
	entities[5].checkpoint = [259,-20];
	entities.push (new PushableEntity ( 52, 170 ) );
	entities[6].checkpoint = [48,31];
	entities.push (new PushableEntity ( 744, -19 ) );
	entities[7].checkpoint = [1032,-358];
	entities.push (new PushableEntity ( 20, 234 ) );
	entities[8].checkpoint = [41,34];
}



// Checks if two shapes are colliding
function colCheck (shapeA, shapeB) {
	
	// Get the vectors to check against
	// Vector X : Horizontal distance between center of shapeA and center of shapeB
	// Vector Y : Vertical distance between center of shapeA and center of shapeB
	var vX = ( shapeA.x + (shapeA.width / 2) ) - ( shapeB.x + (shapeB.width / 2) );
	var vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
	
	//  Add the half widths and half heights of the objects
	var hWidths = (shapeA.width / 2) + (shapeB.width / 2);
	var hHeights = (shapeA.height / 2) + (shapeB.height / 2);
		
	// Collision direction
	var colDir = null;
	
	// If there is an obstacle to delete (editor mode)
	var obsToManipulate = false;
		
		
	// If x and y vector are less than the half width or half height,
	// then the objects must be colliding
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		
		// If shapeA is the mouse when clicking in delete mode (editor mode)
		if (shapeA.mouse) {
		
				obsToManipulate = true;
				return obsToManipulate;
			
		}
		
	
	
		// If the shape collided with has a collectible property
		if (shapeB.collectible) {
			colDir = "c";
			return colDir;
		}
		// Figures out which side the collision is from
		// Offset X - Y : This figures out how far into the object
		// we currently are
		var oX = hWidths - Math.abs(vX);
		var oY = hHeights - Math.abs(vY);
			
		// If the X offset is larger than the Y offset, we can assume the collision
		// is either from the top or the bottom. The greater penetration cannot be *in* the
		// object, because it would have been caught much sooner
		
		if (oX >= oY) {
			if (vY > 0) {
			
				// If the shape collided with has a bouncy property
				if (shapeB.bouncy) {
					// Bounce up with the obstacle's bounce force property
					shapeA.velY = -shapeA.speed * shapeB.bounceForce;
					colDir = "bb";
				}else{
					colDir = "t";
					
					// If player is squished by a falling entity
					// push him either left or right
					if (shapeA.player && shapeB.entity){
						if (vX > 0) {
							shapeA.x += oX;
						}else{
							shapeA.x -= oX;
						}
					}
					
					// If both shapes aren't entities
					if (!shapeA.entity && !shapeB.entity){
						shapeA.y += oY
						
					}else{
					
						// If shape b is grounded, shape a is too
						if (shapeB.grounded) {
							shapeA.grounded = true;
							shapeA.velY = 0;
						}
					}
				}
			}else{
				
				if (shapeB.bouncy) {
					shapeA.velY = -4 * shapeB.bounceForce;
					colDir = "bb";
				}else{
					colDir = "b";
					if (shapeA.velY < 13) {
						shapeA.y -= oY;
					}
				}
			}
			
		}else{
		
			// LEFT - RIGHT COLLISIONS
			if (vX > 0) {
			
				colDir = "l";
				
				// 2nd shape is obstacle
				if (shapeB.box){
					shapeA.x += oX;
				}
				
				// Player pushing entity
				if (shapeB.pushable & shapeA.player) {
					shapeA.velX = -1;
					shapeB.velX = -1;
				}
				
				// Both shapes are pushable entities
				if (shapeB.pushable && shapeA.pushable) {
					shapeA.x += oX;
					shapeB.x -= oX;
				}
				
			}else{
			
				colDir = "r";
				
				// 2nd shape is obstacle
				if (shapeB.box){
					shapeA.x -= oX;
				}
				
				// Player pushing entity
				if (shapeB.pushable && shapeA.player) {
					shapeA.velX = 1;
					shapeB.velX = 1;
				}
				
				// Both shapes are pushable entities
				if (shapeB.pushable && shapeA.pushable) {
					shapeA.x -= oX;
					shapeB.x += oX;
				}
				
			}
			
		}
	}
	return colDir;	
}


// Applies further changes resulting in collision
// Collisions Player-Obstacles & Player-Entities
function applyPlayerCol(shapeA,shapeB) {

	for (var i = 0; i < shapeB.length; i++) {
	
		var dir = colCheck(shapeA,shapeB[i]);
		
		// If player collision is at the left or right
		if (dir === "l" || dir === "r") {
			if (!shapeB.pushable) {
				player.velX = 0;
				player.jumping = false;
			}else{
				player.velX *= 0.9;
			}
			
			if (dir === "l") {
				//offsetX-=2;
				//shapeB[i].velX -= 5;
			}
			
			if (dir === "r") {
				//offsetX+=2;
				//shapeB[i].velX += 5;
			}
			
		// If player collision is at the bottom
		}else if (dir === "b") {
			shapeA.grounded = true;
			shapeA.airborne = false;
			shapeA.jumping = false;
			shapeA.doubleJumping = false;
			
			
			// If player collides against a floor at a high speed,
			// deduct his health, play a sound and randomly stagger
			// him left or right
			
			if (shapeA.velY > 13) {
				
				shapeA.health--;
				Sounds.hit.play();
				shapeA.velY = -10;
				
				if (tickCount < 30) {
					shapeA.velX += 5;
					
				}else{
					shapeA.velX -=5;
				}
				
			}
			
			
		// If player collision is at the top
		}else if (dir === "t") {
			shapeA.velY *= -0.5;
			
		// If player collision is on a bouncy obstable
		}else if (dir === "bb") {
			
			// Set the src, and then play to allow the audio to play
			// many times repeatedly
			Sounds.bounce.src = "audio/bounce.wav";
			Sounds.bounce.play();
			
		// If the player collision is with a collectible object
		}else if (dir === "c") {
			boxes.splice(i,1);
			presentsToCollect--;
			Sounds.itemGet1.play();
			
		}
		
		
	}
	
	
}


// To apply collision between:
// Entities - Obstacles, Entities - Entities
function applyEntitiesCol(shapeA,shapeB) {

	
	var dir;
	
	
	for (var i = 0 ; i < shapeA.length ; i++) {
	
	
		for (var j = 0 ; j < shapeB.length ; j++) {
		
			// If both shapes to compare are the same, don't compare
			if(shapeA[i].x === shapeB[j].x && shapeA[i].y === shapeB[j].y){
			
			}else{
			
				for (var k = 0; k < 2; k++) {
				
					if (k == 0) {
						dir = colCheck(shapeA[i], shapeB[j]);
					}
				
					// If collision is from the side
					if (dir === "l" || dir === "r") {
					
						if (!shapeB[j].pushable) {
							
							//shapeA[i].velX = 0;
							
						// If collision is from side, with pushable obstacles
						}else{
						
							//shapeA[i].velX *= 0.2;
							//shapeB[j].velX *= 0.2;
						
							if (dir === "l") {
								//alert("left col");
								//shapeB[j].velX += shapeA.velX;
							}
							
							if (dir === "r") {
								//shapeB[j].velX += shapeA.velX;
							}
							
						}
					
					// If collision is at the bottom
					}else if (dir === "b") {
						
						shapeA[i].grounded = true;
						
						
						// To make pushable obstacles stick to their
						// bottom hosts when they are moved
						if (shapeB[j].pushable){
						
							// If shapeA (top shape) is not being pushed
							if (Math.abs(shapeA[i].velX) < 0.1 ){
							
								// If being pushed
								if (Math.abs(shapeB[j].velX) > 0.1) {
								
									// If shapeA goes to the left of shapeB
									while (shapeA[i].x < shapeB[j].x - (shapeA[i].width / 2 / 2) ) {
										shapeA[i].x += 1;
									}
									
									// If shapeA goes to the right of shapeB
									while (shapeA[i].x > shapeB[j].x + (shapeA[i].width /2 /2) ) {
										shapeA[i].x -= 1;
									}
								
								// If not being pushed
								}else{
								
									// If shapeA is shifted to the left
									if (shapeA[i].x < shapeB[j].x) {
										shapeA[i].x ++;
									}
									
									// If shapeA is shifted to the right
									if (shapeA[i].x > shapeB[j].x) {
										shapeA[i].x --;
									}
								
								}
							
							}
							
							// If the host is airborne, adjust the x to be the same
							if (Math.abs(shapeB[j].velY) > 0.7) {
								shapeA[i].x = shapeB[j].x;
							}
							
						}
						
						/*
						if (shapeB[j].velY) {
							alert("colision bottom");
							shapeA[i].velY = shapeB[j].velY;
							shapeA[i].y = shapeB[j].y - shapeA[i].height;
							shapeA[i].x = shapeB[j].x;
						}
						*/
						
					// If collision is at the top
					}else if (dir === "t") {
						
					// If collision is bouncy
					}else if (dir === "bb") {
						
					}
				}
			}
		}
	

	}
	
}





// Checks player condition
function checkPlayerCondition() {

	if (player.health < 1) {
		player.health = 3;
		player.lives--;
		player.initCheckpoint();
	}

	if (player.y > 1400) {
		
		Sounds.yell.play();
		player.lives--;
		player.grounded = true;
		player.airborne = false;
		player.jumping = false;
		player.velY = 0;
		player.health = 3;
		
		//if (player.lives > 0)
			player.initCheckpoint();
		

	
	}
	
	if (player.lives < 1) {
		//gameOver = true;
	}

}

// Function that checks entities' conditions
function checkEntitiesCondition() {

	for (var i = 0; i < entities.length; i++) {
	
		// Respawns entities at their checkpoint if they fall off stage
		if (entities[i].y > 1400) {
			entities[i].velY = 0;
			entities[i].initCheckpoint();
		}
		
	}

}





// Keyboard event listeners
function addControls() {
	document.body.addEventListener("keydown", function(e) {
		
		// When a key is pressed down, it's stored in the keys array
		// with a true value
		keys[e.keyCode] = true;
		
		
		// Keys 123 to change editing mode
		
		// 1
		if (e.keyCode == 49) {
			textCanvas.style.cursor = "url('images/cursor_add.png') 32 32";
			cdata11.innerHTML = 'Add';
			editingMode = 1;
		}
		
		// 2
		if (e.keyCode == 50) {
			textCanvas.style.cursor = "url('images/cursor_move.png') 32 32";
			cdata11.innerHTML = 'Move';
			editingMode = 2;
		}
		
		// 3
		if (e.keyCode == 51) {
			textCanvas.style.cursor = "url('images/cursor_delete.png') 32 32";
			cdata11.innerHTML = 'Delete';
			editingMode = 3;
		}
		

		// Toggle x - y lock for objects placement
		
		// 'R'
		if (e.keyCode == 69) {
		
			if (!horLock) {
				horLock = mouse.y;
				
			}else{
				horLock = false;
			}
			
		}
		
		// 'E'
		if (e.keyCode == 82) {
		
			if (!verLock) {
				verLock = mouse.x;
			}else{
				verLock = false;
			}
		
		}
		
		
		
		
		// Keys - and = : toggles invisible obstacles rendering on and off
		if (e.keyCode == 189) {
			renderInvisible = true;
		}
		
		if (e.keyCode == 187) {
			renderInvisible = false;
		}
		
	});
		
		
	document.body.addEventListener("keyup", function(e) {
		// When a key is let go of, its value becomes false
		keys[e.keyCode] = false;
	});
	

}



// This function adds direct controls to the camera
function handleCameraControls() {

	var cameraSpeed = 15;

	// 'A' key
	if (keys[65]) {
		offsetX+= cameraSpeed;
	}
	
	// 'W' key
	if (keys[87]) {
			offsetY+= cameraSpeed;
	}
	
	// 'S' key
	if (keys[83]) {
		offsetY-= cameraSpeed;
	}
	
	// 'D' key
	if (keys[68]) {
		offsetX-= cameraSpeed;
	}
	
}


// Function that handles the user controls
function handleControls() {

	var doubleJumpReady = false;
	
	// up arrow
	if (keys[38]) {
		if (!player.jumping && player.grounded) {
		
			// Player sound effect when player jumps
			Sounds.jump.play();
			
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.speed * player.jumpForce;
			
			// When player jumps, an important amount is added to the Y velocity,
			// propulsing the player upwards. The player then comes back down
			// due to gravity.

		}
		
		// If the double jumping ability is ready, the double jump activates
		if (doubleJumpReady) {
		
			// The audio source is replaced and then played again
			// this makes it so the sound can play in quick repetition
			// following the jump sound
			Sounds.jump.src = "audio/jump.wav";
			Sounds.jump.play();
			
			doubleJumpReady = false;
			player.doubleJumping = true;
			player.velY = -player.speed * player.jumpForce * 0.8;
		}

	}

	// If the player is airborne, isn't currently pressing the up key and
	// isn't currently double jumping, the double jump is ready
	if (keys[38] == false && !player.doubleJumping && player.airborne && player.canDoubleJump) {
		doubleJumpReady = true;
	}
	
	// right arrow
	if (keys[39]) {
		if (player.velX < player.speed) {
			player.velX++;
		}
	}	
	
	
	// left arrow
	if (keys[37]) {
		if (player.velX > -player.speed) {
			player.velX--;
		}
		
	}
}





// Updates game objects
function update() {


	if (gameOver) {
		//endGame();
	}
	
	if (presentsToCollect < 1) {
		//winGame();
	}

	// Handle the player controls
	handleControls();
	
	// Handle the camera controls
	handleCameraControls();
	

	// Set player properties
	// Set grounded to false to enable
	// falling off ledges
	
	player.velX *= friction;
	player.velY += player.gravity;
	player.grounded = false;
	
	if (player.velY > 0.5 || player.velY < -0.5) {
		player.airborne = true;
	}
	
	
	// Set entities properties
	for (var i = 0; i < entities.length ; i++) {
		entities[i].velX *= friction;
		entities[i].velY += entities[i].gravity;
		entities[i].grounded = false;
	}
	
	

	

	
	
	// Check all collisions
	applyPlayerCol(player,boxes);
	applyPlayerCol(player,entities);
	
	applyEntitiesCol(entities,boxes);
	applyEntitiesCol(entities,entities);
	
	
	
	
	
	
	
	// If player is grounded, his Y velocity is 0
	if (player.grounded) {
		player.velY = 0;
	}
	

	
	
	// Calculates jumping momentum so player does not stop in midair
	// when he lets go of the left or right arrows
	if (player.airborne && player.velX > 0) {
		player.velX *= 1.1;
	}
	
	if (player.airborne && player.velX < 0) {
		player.velX *= 1.1;
	}
	
	
	
	player.x += player.velX;
	player.y += player.velY;
	
	
	if (entities[0]) {
	
		for (var i = 0; i < entities.length ; i++) {
		
			if (entities[i].grounded) {
				entities[i].velY = 0;
			}
			entities[i].x += entities[i].velX;
			entities[i].y += entities[i].velY;
		}
		
	}
	
	

	checkPlayerCondition();
	checkEntitiesCondition();
	
	updateConsole();
	render();
	requestAnimationFrame(update);
	
}






// Writes status messages onscreen
function writeStatusMsg() {
	/*
	// Clear the previous frame of the bottom left corner text
	textctx.clearRect(10,540,canvasWidth,canvasHeight);
	// Clear the previous frame of the top left corner text
	textctx.clearRect(10,25,200,50);
	
	textctx.font = "15px pixelmixregular";
	
	
	textctx.fillStyle = "rgb(250, 250, 250)";
	
	
	
	textctx.textAlign = "left";
	textctx.textBaseline = "top";
	
	
	

	// Only write if the game isn't over
	if (!gameOver){
	
		textctx.fillText("Nb Vies : " + player.lives, 18, 25);
		textctx.fillText("Sante : " + player.health, 18, 50);
		
		
		if (presentsToCollect <= 5) {
			textctx.fillText("Nombre de cadeaux restants : " + presentsToCollect, 18, 540);
		}else{
			//textctx.fillText("Tous les cadeaux sont recueillis! Retournez au début.");
		}
		
	}
	
	*/
	
}

// Renders game objects
function renderObjects(objectArray) {

	for (var j = 0; j < objectArray.length; j++) {
	

		
		// If the box is set to bouncy, its appearance will be a bit different, with
		// an added overlay
		if (objectArray[j].type != "Boundary") {
			ctx.drawImage(objectArray[j].img, objectArray[j].x, objectArray[j].y);
		}
		
		
		// Boundary obstacles. Only drawn if renderInvisible variable is set to true
		if (objectArray[j].type == "Boundary" && renderInvisible) {
			ctx.beginPath();
			ctx.fillStyle = "black";
			ctx.rect(objectArray[j].x, objectArray[j].y, objectArray[j].width, objectArray[j].height);
			ctx.fill();
		}
		
		
		
	}

}



// All the render part
function render() {

	writeStatusMsg();
	
	

	/* Previously for moving camera around with player
	if (offsetY < 0) {
		offsetY = Math.abs(offsetY);
	}else if (offsetY > 0) {
		offsetY = offsetY *= -1;
	}
	
	 if statement for player camera X offset
	if (offsetX < 0) {
		offsetX = Math.abs(offsetX);
	}else if (offsetX > 0) {
		offsetX = offsetX *= -1;
	}
	*/
	
	
	
	
	
	// Clear previous frame drawing
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	bgctx.clearRect(0,0,canvasWidth,canvasHeight);
	//textctx.clearRect(0,0,canvasWidth,canvasHeight);
	
	ctx.save();
	bgctx.save();
	
	
	// Canvas context translate
    ctx.translate(offsetX, offsetY);
   
	//bgctx.translate(offsetX*0.5, offsetY*0.5);
	
	
	
	// DRAW BACKGROUND //
	
	// Foreground
	//ctx.drawImage(imageRepository.bgOnett, -320, 0);
	
	// Background (Starry sky)
	pattern = bgctx.createPattern(imageRepository.bgOnettStars, "repeat");
	
	bgctx.beginPath();
	bgctx.fillStyle = pattern;
	bgctx.rect(0,0,800,800);
	bgctx.fill();
	
	
	
	
	// Ticks for animating
	tickCount+= 3;
	
	if (tickCount >= 60) {
		tickCount = 0;
	}
	
	
	ctx.beginPath();
	
	player.draw();
	renderObjects(boxes);
	renderObjects(entities);
	
	drawAxisLocks();

	
	ctx.fill();
	ctx.restore();
	bgctx.restore();

}





function endGame() {

	// Moves the player out of the way
	player.initCheckpoint();
	
	//Sets gravity to 0 so player does not fall
	gravity = 0;
	
	// Clears drawing of the player
	ctx.clearRect(player.x,player.y,player.width,player.height);
	
	// Write GameOver text
	textctx.fillText("GAME OVER", 290,210);
	
	// Display the textbox with "restart" prompt
	
	textBox.style.display = "block";
	
}

function restartGame() {
	
	var newCode = document.getElementById('levelCodeReinitialize').value;

	if (newCode) {
		// Reset player position on the screen
		player.initCheckpoint();
		
		// Remove everything from the boxes array, then re-initialize it
		boxes = [];
		entities = [];

		// Evaluate the code entered in the second box (probably not a great idea, but it works for now)
		eval(newCode);
	}

}

addControls();
initializeGame();

offsetX = Math.abs(player.checkpoint[0] - (canvasWidth / 2) );
offsetY = Math.abs(player.checkpoint[1] - (canvasHeight / 2) );