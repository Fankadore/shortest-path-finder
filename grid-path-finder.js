/** Grid Path Finder Module - Ruaidhri MacKenzie 2018 **/
/* Finds the shortest path between two nodes on a grid */

function pathFinder(startPos, endPos, grid) {
	if (!startPos || !endPos || !grid) return null;

	const columns = grid.length;
	const rows = grid[0].length;
	const walls = [];
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < columns; x++) {
			walls.push(grid[y][x]);
		}
	}

	let path = [];
	const nodes = [];
	const startNode = (startPos.y * columns) + startPos.x;
	const endNode = (endPos.y * columns) + endPos.x;

	function checkNextNode(nextNode, distanceFromStart, currentPath) {
		if (nodes[nextNode].distance === null || distanceFromStart < nodes[nextNode].distance) {
			if (nextNode === endNode) {
				nodes[endNode].distance = distanceFromStart;
				path = currentPath.map(x => x);
				path.push(nodes[endNode]);
				return;
			}
		
			if (!walls[nextNode]) {
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

	// Create Nodes
	for (let i = 0; i < rows * columns; i++) {
		nodes[i] = {id: i, distance: null};
	}
	nodes[startNode].distance = 0;

	findAdjacentNodes(startNode, 1, path);

	if (path.length > 0) {
		const pathPositions = [];
		for (let i = 0; i < path.length; i++) {
			pathPositions.push({
				x: path[i].id % columns,
				y: (path[i].id - (path[i].id % columns)) / columns
			});
		}
		return pathPositions;
	}
	else {
		return null;
	}
}
