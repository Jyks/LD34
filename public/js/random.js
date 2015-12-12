// Implements some basic random functionality

function randomInt(max) {
	return Math.floor(Math.random() * (max + 1));
}

function choose(arr) {
	// Return random element from given array
	return arr[randomInt(arr.length - 1)];
}
