/** Shortest Path Finder Module - Ruaidhri MacKenzie 2018 **/
/* Finds the shortest path between two nodes on a grid */

export default function checkShortestPath(startPos, endPos, walls, columns, rows) {
	if (!startPos || !endPos || !walls || columns == null || rows == null) return null;

	let path = [];
	const nodes = [];
	const startNode = (startPos.y * columns) + startPos.x;
	const endNode = (endPos.y * columns) + endPos.x;

	function checkNextNode(nextNode, distanceFromStart, currentPath) {
		if (nodes[nextNode].distance === null || distanceFromStart < nodes[nextNode].distance) {
			if (nextNode === endNode) {
				nodes[endNode].distance = distanceFromStart;
				path = currentPath.map(x => x);
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
	return (path.length > 0) ? path : null;
}
