/** Shortest Path Finder - Ruaidhri MacKenzie 2018 **/
/* Finds the shortest path between two nodes on a grid */

const tilesize = 32;
const columns = 12;
const rows = 12;
const startPos = {x: 0, y: 0};
const endPos = {x: 7, y: 0};
const walls = [
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

const canvas = document.querySelector("#grid");
const ctx = canvas.getContext("2d");
canvas.setAttribute("width", columns * tilesize);
canvas.setAttribute("height", rows * tilesize);

let startNode = (startPos.y * columns) + startPos.x;
let endNode = (endPos.y * columns) + endPos.x;
let path = [];

const nodes = [];
function Node() {
	this.id = nodes.length;
	this.distance = null;
	nodes.push(this);
}

// Create Nodes
for (let i = 0; i < rows * columns; i++) {
	new Node();
}

checkShortestPath();

document.addEventListener("contextmenu", (e) => {
	e.preventDefault();
});

document.addEventListener('click', (e) => {
	let bounds = canvas.getBoundingClientRect();
	let pixelX = e.x - bounds.left;
	let pixelY = e.y - bounds.top;
	let x = (pixelX - (pixelX % tilesize)) / tilesize;
	let y = (pixelY - (pixelY % tilesize)) / tilesize;
	if (x < 0 || x >= columns || y < 0 || y >= columns) return;
	let index = (y * columns) + x;

	if (e.shiftKey) {
		// Toggle Wall
		if (walls[index]) {
			walls[index] = 0;
		}
		else {
			walls[index] = 1;
		}
		checkShortestPath();
	}
	else if (e.button === 0) {
		// Set Start and End Node
		startPos.x = endPos.x;
		startPos.y = endPos.y;
		endPos.x = x;
		endPos.y = y;
		checkShortestPath();
	}
	else {
		// Set End Node
		endPos.x = x;
		endPos.y = y;
		checkShortestPath();
	}
});

function checkShortestPath() {
	resetNodes();
	findAdjacentNodes(startNode, 1, path);
	output();
}

function resetNodes() {
	startNode = (startPos.y * columns) + startPos.x;
	endNode = (endPos.y * columns) + endPos.x;
	path = [];

	nodes.forEach((node) => {
		if (node.id === startNode) {
			node.distance = 0;
		}
		else {
			node.distance = null;
		}
	});
}

function checkNextNode(nextNode, distanceFromStart, currentPath) {
	if (nextNode === endNode) {
		if (nodes[endNode].distance === null || distanceFromStart < nodes[endNode].distance) {
			nodes[endNode].distance = distanceFromStart;
			path = currentPath.map(x => x);
		}
		return;
	}
	
	if (!walls[nextNode]) {
		if (nodes[nextNode].distance === null || distanceFromStart < nodes[nextNode].distance) {
			nodes[nextNode].distance = distanceFromStart;
			currentPath.push(nodes[nextNode]);
			findAdjacentNodes(nextNode, distanceFromStart + 1, currentPath);
			currentPath.pop();
		}
	}
}

function findAdjacentNodes(currentNode, distanceFromStart, currentPath) {
	let nextNode = null;

	// Check left
	if (currentNode % columns !== 0) {  // Only check if not on left edge
		nextNode = currentNode - 1;
		checkNextNode(nextNode, distanceFromStart, currentPath);
	}
	// Check up
	if (currentNode >= columns) {  // Only check if not on top edge
		nextNode = currentNode - columns;
		checkNextNode(nextNode, distanceFromStart, currentPath);
	}
	// Check right
	if (currentNode % columns !== 11) {  // Only check if not on right edge
		nextNode = currentNode + 1;
		checkNextNode(nextNode, distanceFromStart, currentPath);
	}
	// Check down
	if (currentNode < (columns * rows) - columns) {  // Only check if not on bottom edge
		nextNode = currentNode + columns;
		checkNextNode(nextNode, distanceFromStart, currentPath);
	}
}

function draw() {
	nodes.forEach((node) => {
		let x = node.id % columns;
		let y = (node.id - x) / columns;
		
		// Highlight the path
		if (node === nodes[startNode]) {
			ctx.fillStyle = '#ff0000';
		}
		else if (node === nodes[endNode]) {
			ctx.fillStyle = '#00ff00';
		}
		else if (walls[node.id]) {
			ctx.fillStyle = '#000000';
		}
		else if (path.includes(node)) {
			ctx.fillStyle = '#ffff00';
		}
		else {
			ctx.fillStyle = '#ffffff';
		}
		ctx.fillRect(x * tilesize, y * tilesize, tilesize, tilesize);
		
		// Draw Grid
		ctx.strokeStyle = '#000000';
		ctx.strokeRect(x * tilesize, y * tilesize, tilesize, tilesize);

		// Show Distance
		if (node.distance !== null) {
			ctx.fillStyle = '#000000';
			ctx.fillText(node.distance, (x * tilesize) + (tilesize / 3), (y * tilesize) + (tilesize / 2), tilesize);
		}
	});
}

function output() {
	if (nodes[endNode].distance === null) {
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
	}
	draw();
}
