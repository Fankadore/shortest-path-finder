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
const columns = grid.length;
const rows = grid[0].length;
const canvas = document.querySelector("#grid");
const ctx = canvas.getContext("2d");
canvas.setAttribute("width", columns * tilesize);
canvas.setAttribute("height", rows * tilesize);

document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener('click', (e) => {
	const bounds = canvas.getBoundingClientRect();
	const pixelX = e.x - bounds.left;
	const pixelY = e.y - bounds.top;
	const x = (pixelX - (pixelX % tilesize)) / tilesize;
	const y = (pixelY - (pixelY % tilesize)) / tilesize;
	if (x < 0 || x >= columns || y < 0 || y >= columns) return;
	const index = (y * columns) + x;

	if (e.shiftKey) {
		// Toggle Wall
		if (grid[y][x]) {
			grid[y][x] = 0;
			checkShortestPath();
		}
		else {
			grid[y][x] = 1;
			
			path.forEach((node) => {
				if (node.x === x && node.y === y) {
					checkShortestPath();
				}
				else {
					draw();
				}
			});
		}
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

checkShortestPath();

function checkShortestPath() {
	path = pathFinder(startPos, endPos, grid);
	output();
	draw();
}

function draw() {
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < rows; x++) {
			if (x === startPos.x && y === startPos.y) {
				ctx.fillStyle = '#ff0000';
			}
			else if (x === endPos.x && y === endPos.y) {
				ctx.fillStyle = '#00ff00';
			}
			else if (grid[y][x] === 1) {
				ctx.fillStyle = '#000000';
			}
			else {
				ctx.fillStyle = '#ffffff';
			}

			// Highlight the path
			path.forEach((node) => {
				if (node.x === x && node.y === y && (endPos.x !== x && endPos.y !== y)) {
					ctx.fillStyle = '#ffff00';
				}
			});
			ctx.fillRect(x * tilesize, y * tilesize, tilesize, tilesize);

			// Draw Grid
			ctx.strokeStyle = '#000000';
			ctx.strokeRect(x * tilesize, y * tilesize, tilesize, tilesize);
		}
	}
}

function output() {
	if (path == null || path.length === 0) {
		console.log("No path found.");
	}
	else {
		let message = "Shortest Path is: ";
		path.forEach((node) => {
			message += `(${node.x},${node.y}), `;
		});
		console.log(message);
	}
}
