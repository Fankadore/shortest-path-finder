import checkShortestPath from './shortest-path.js';

// Input
const columns = 12;
const rows = 12;
const startPos = {x: 0, y: 0};
const endPos = {x: 11, y: 11};
const walls = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// Output
const path = checkShortestPath(startPos, endPos, walls, columns, rows);
if (path === null) {
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
