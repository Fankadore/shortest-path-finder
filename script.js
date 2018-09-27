/** Shortest Path Finder - Ruaidhri MacKenzie 2018 **/
/* Finds the shortest path between two nodes on a grid */

const canvas = document.querySelector("#grid");
const ctx = canvas.getContext("2d");
const tilesize = 32;
const columns = 12;
const rows = 12;
canvas.setAttribute("width", columns * tilesize);
canvas.setAttribute("height", rows * tilesize);

const nodes = [];
const startPos = {x: 0, y: 0};
const endPos = {x: 7, y: 9};
const startNode = (startPos.y * columns) + startPos.x;
const endNode = (endPos.y * columns) + endPos.x;

let shortestDistance = null;
let path = [];

class Node {
	constructor() {
		this.id = nodes.length;
		this.distance = null;
		nodes.push(this);
	}
}

// Create Nodes
for (let y = 0; y < rows; y++) {
	for (let x = 0; x < columns; x++) {
		new Node();
	}
}

// Define Walls
walls = [
	0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0,
	1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
	1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// Check for shortest path
nodes[startNode].distance = 0;
checkAdjacentNodes(startNode, 1, path);

// Output the shortest path
output();


function checkAdjacentNodes(currentNode, distanceFromStart, currentPath) {
	currentPath.push(nodes[currentNode]);
	
	let nextNode = null;

	// Check left
	if (currentNode % columns !== 0) {  // Only check if not on left edge
		nextNode = currentNode - 1;

		if (nextNode === endNode) {
			if (shortestDistance === null || distanceFromStart < shortestDistance) {
				shortestDistance = distanceFromStart;
				path = currentPath.map(x => x);
			}
			return;
		}
		
		if (!walls[nextNode]) {
			if (nodes[nextNode].distance === null || distanceFromStart < nodes[nextNode].distance) {
				nodes[nextNode].distance = distanceFromStart;
				checkAdjacentNodes(nextNode, distanceFromStart + 1, currentPath);
				currentPath.pop();
			}
		}
	}

	// Check up
	if (currentNode >= columns) {  // Only check if not on top edge
		nextNode = currentNode - columns;

		if (nextNode === endNode) {
			if (shortestDistance === null || distanceFromStart < shortestDistance) {
				shortestDistance = distanceFromStart;
				path = currentPath.map(x => x);
			}
			return;
		}
		
		if (!walls[nextNode]) {
			if (nodes[nextNode].distance === null || distanceFromStart < nodes[nextNode].distance) {
				nodes[nextNode].distance = distanceFromStart;
				checkAdjacentNodes(nextNode, distanceFromStart + 1, currentPath);
				currentPath.pop();
			}
		}
	}
	
	// Check right
	if (currentNode % columns !== 11) {  // Only check if not on right edge
		nextNode = currentNode + 1;

		if (nextNode === endNode) {
			if (shortestDistance === null || distanceFromStart < shortestDistance) {
				shortestDistance = distanceFromStart;
				path = currentPath.map(x => x);
			}
			return;
		}
		
		if (!walls[nextNode]) {
			if (nodes[nextNode].distance === null || distanceFromStart < nodes[nextNode].distance) {
				nodes[nextNode].distance = distanceFromStart;
				checkAdjacentNodes(nextNode, distanceFromStart + 1, currentPath);
				currentPath.pop();
			}
		}
	}
	
	// Check down
	if (currentNode < (columns * rows) - columns) {  // Only check if not on bottom edge
		nextNode = currentNode + columns;

		if (nextNode === endNode) {
			if (shortestDistance === null || distanceFromStart < shortestDistance) {
				shortestDistance = distanceFromStart;
				path = currentPath.map(x => x);
			}
			return;
		}
		
		if (!walls[nextNode]) {
			if (nodes[nextNode].distance === null || distanceFromStart < nodes[nextNode].distance) {
				nodes[nextNode].distance = distanceFromStart;
				checkAdjacentNodes(nextNode, distanceFromStart + 1, currentPath);
				currentPath.pop();
			}
		}
	}

	return;
}

function draw() {
	nodes.forEach((node) => {
		let x = node.id % columns;
		let y = (node.id - x) / columns;
		
		// Highlight the path
		if (node === nodes[startNode]) {
			ctx.fillStyle = '#0000ff';
		}
		else if (path.includes(node)) {
			ctx.fillStyle = '#ff0000';
		}
		else if (node === nodes[endNode]) {
			ctx.fillStyle = '#00ff00';
		}
		else if (walls[node.id]) {
			ctx.fillStyle = '#000000';
		}
		else {
			ctx.fillStyle = '#ffffff';
		}
		ctx.fillRect(x * tilesize, y * tilesize, tilesize, tilesize);
		
		// Draw Grid
		ctx.strokeStyle = '#000000';
		ctx.strokeRect(x * tilesize, y * tilesize, tilesize, tilesize);
	});
}

function output() {
	if (path.length === 0) {
		console.log("No path found.");
	}
	else {
		let message = "Shortest Path is: ";
		path.forEach((node) => {
			let x = node.id % columns;
			let y = (node.id - x) / columns;
			message += `(${x},${y}), `;
		});
		console.log(message);
		draw();
	}
}
