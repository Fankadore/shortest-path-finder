/** Shortest Path Finder GUI - Ruaidhri MacKenzie 2018 **/
/* Finds the shortest path between two nodes on a grid */

const startPos = {x: 0, y: 0};
const endPos = {x: 7, y: 0};
const grid = [
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
	[1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let path = pathFinder(startPos, endPos, grid);

const tilesize = 32;
const columns = grid[0].length;
const rows = grid.length;
const canvas = document.querySelector(".grid");
const ctx = canvas.getContext("2d");
canvas.setAttribute("width", columns * tilesize);
canvas.setAttribute("height", rows * tilesize);

const output = () => {
	if (!path) {
		console.log("No path found.");
	}
	else {
		let message = "Shortest Path is: ";
		path.forEach(node => message += `(${node.x},${node.y}), `);
		console.log(message);
	}
};
const draw = () => {
	ctx.strokeStyle = '#000000';
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < columns; x++) {

			// Colour the tiles
			if (x === startPos.x && y === startPos.y) ctx.fillStyle = '#0000ff';
			else if (x === endPos.x && y === endPos.y) ctx.fillStyle = '#ffa500';
			else if (grid[y][x] === 1) ctx.fillStyle = '#000000';
			else ctx.fillStyle = '#ffffff';
			ctx.fillRect(x * tilesize, y * tilesize, tilesize, tilesize);
			ctx.strokeRect(x * tilesize, y * tilesize, tilesize, tilesize);
		}
	}

	// Highlight the path
	ctx.fillStyle = '#ffff00';
	path.forEach(node => {
		if (node.x !== endPos.x || node.y !== endPos.y) {
			ctx.fillRect(node.x * tilesize, node.y * tilesize, tilesize, tilesize);
			ctx.strokeRect(node.x * tilesize, node.y * tilesize, tilesize, tilesize);
		}
	});
};
const checkShortestPath = () => {
	path = pathFinder(startPos, endPos, grid);
	output();
	draw();
};

// Left Click
document.addEventListener('click', (e) => {
	const bounds = canvas.getBoundingClientRect();
	const pixelX = e.x - bounds.left;
	const pixelY = e.y - bounds.top;
	const x = (pixelX - (pixelX % tilesize)) / tilesize;
	const y = (pixelY - (pixelY % tilesize)) / tilesize;
	if (x < 0 || x >= columns || y < 0 || y >= rows) return;
	const index = (y * columns) + x;
	
	if (e.shiftKey) {
		// Toggle Wall
		if (grid[y][x]) grid[y][x] = 0;
		else grid[y][x] = 1;
		checkShortestPath();
	}
	else if (e.button === 0) {
		// Set End Node
		endPos.x = x;
		endPos.y = y;
		checkShortestPath();
	}
});
// Right Click
document.addEventListener("contextmenu", (e) => {
	e.preventDefault();
	const bounds = canvas.getBoundingClientRect();
	const pixelX = e.x - bounds.left;
	const pixelY = e.y - bounds.top;
	const x = (pixelX - (pixelX % tilesize)) / tilesize;
	const y = (pixelY - (pixelY % tilesize)) / tilesize;
	if (x < 0 || x >= columns || y < 0 || y >= rows) return;
	
	// Set Start Node
	startPos.x = x;
	startPos.y = y;
	checkShortestPath();
});

window.onload = checkShortestPath;
