/**
 * Snake as an object
 *
 * @param position  Vector object position object
 * @param length    int number of tails to start with
 * @param direction string move direction
 */
function Snake(id, position, length, direction) {
	this.id = id 			|| null;
	this.p  = position		|| {x: 0, y:0} // Start position
	this.l 	= length   		|| 6; // Lenght of the snake
	this.d  = direction 	|| "right"; // Move Direction

	// Always instantiate snake horizontal (simple way to init tail)
	this.tail = [];
	for (var i = this.l - 1; i >= 0; i--) {
		this.tail.push({x: this.p.x+i, y: this.p.y+0});
	}
}


/**
 * Move snake +1
 */
Snake.prototype.move = function() {
  // Change snake head direction on move
  if (this.d === "right")    {this.tail[0].x++;}
  else if(this.d === "left") {this.tail[0].x--;}
  else if(this.d === "up")   {this.tail[0].y--;}
  else if(this.d === "down") {this.tail[0].y++;}
};


/**
 * Paint the snake
 */
Snake.prototype.draw = function(ct, cw, color) {
  ct.fillStyle = color;
  ct.strokeStyle = "#e6e6e6";
  var c;
  for (var i = 0; i < this.tail.length; i++) {
    c = this.tail[i];
    ct.fillRect(c.x*cw, c.y*cw, cw, cw);
    ct.strokeRect(c.x*cw, c.y*cw, cw, cw);
  }
};


/**
 * Update direction by pressed key
 */
Snake.prototype.update = function() {
  if (Key.isDown(Key.UP, Key.W)     && this.d !== ("down"  || "S"))  {this.d = "up"; 	return "up";}
  if (Key.isDown(Key.LEFT, Key.A)   && this.d !== ("right" || "D"))  {this.d = "left"; 	return "left"}
  if (Key.isDown(Key.DOWN, Key.S)   && this.d !== ("up"    || "W"))  {this.d = "down"; 	return "down";}
  if (Key.isDown(Key.RIGHT, Key.D)  && this.d !== ("left"  || "A"))  {this.d = "right"; return "right";}
};