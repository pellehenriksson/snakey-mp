/*
 * Food as an object.
 */
function Food(position) {
	this.p = position;
}


Food.prototype.draw = function(ctx, cw) {
	ctx.fillStyle = "#f15e58";
	ctx.fillRect(this.p.x*cw, this.p.y*cw, cw, cw);
	ctx.strokeRect(this.p.x*cw, this.p.y*cw, cw, cw);
};