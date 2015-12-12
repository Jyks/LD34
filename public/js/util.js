// Random utilities

function collision(a) {
	// Check for collision between two rectangles
	// Array a should contain x1, y1, x2, y2, w1, w2, h1 and h2
	
	return (a.x1 > a.x2 - a.w1) && (a.y1 > a.y2 - a.h1) && (a.x1 < a.x2 + a.w2) && (a.y1 < a.y2 + a.w2);
}
