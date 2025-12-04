import { readGrid, sum, parseNumbers } from "../../utils/input.ts";

const DAY = 4;

const DIRECTIONS = [
  [0, 1],   // right
  [1, 0],   // down
  [0, -1],  // left
  [-1, 0],  // up
  [1, 1],   // down-right
  [1, -1],  // down-left
  [-1, 1],  // up-right
  [-1, -1], // up-left
];

function processForkLift(gridMap: string[][]): [number, string[][]] {

  let foklifProcessCount = 0;
  // console.log(gridMap);
  const rollsToProcess: [number, number][] = [];

  for (let row = 0; row < gridMap.length; row++) {
    const currentRow = gridMap[row];
    if (!currentRow) continue;

    for (let col = 0; col < currentRow.length; col++) {
      const cell = currentRow[col];

      if (cell === '@') {
        let adjacentRollsOfPapperCount = 0;
        for (const [dx, dy] of DIRECTIONS) {
          // console.log(row, col);
          const newRow = row + (dy ?? 0);
          const newCol = col + (dx ?? 0);
          if (newRow < 0 || newRow >= gridMap.length || newCol < 0 || newCol >= currentRow.length) {
            continue;
          }
          const newCell = gridMap[newRow]![newCol];
          if (newCell === '.') {
            continue;
          }
          adjacentRollsOfPapperCount++;
          if (adjacentRollsOfPapperCount > 3) {
            break;
          }
        }

        if (adjacentRollsOfPapperCount <= 3) {
          // console.log(`Foklif process at (${row}, ${col})`);
          // gridMap[row]![col] = 'X';
          rollsToProcess.push([row, col]);
          foklifProcessCount++;
        }
      }
    }
  }

  for (const [row, col] of rollsToProcess) {
    gridMap[row]![col] = '.';
  }

  return [foklifProcessCount, gridMap];
}

async function part1(): Promise<number> {
  const gridMap = await readGrid(DAY, false);

  const [foklifProcessCount, _] = processForkLift(gridMap);

  return foklifProcessCount;
}

async function part2(): Promise<number> {
  let gridMap = await readGrid(DAY, false);

  let foklifProcessCount = 0;
  let totalRollPaperAccessed = 0;

  do {
    // console.log(gridMap.map(row => row.join('')).join('\n'));
    // console.log("-".repeat(30));
    [foklifProcessCount, gridMap] = processForkLift(gridMap);

    totalRollPaperAccessed += foklifProcessCount;
  } while (foklifProcessCount > 0);

  return totalRollPaperAccessed;
}

// Main execution
console.log("🎄 Advent of Code - Day", DAY);
console.log("─".repeat(30));

console.time("Part 1");
const result1 = await part1();
console.timeEnd("Part 1");
console.log("Part 1:", result1);

console.log();

console.time("Part 2");
const result2 = await part2();
console.timeEnd("Part 2");
console.log("Part 2:", result2);
