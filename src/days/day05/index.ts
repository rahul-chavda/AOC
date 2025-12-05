import { readLines, sum, parseNumbers } from "../../utils/input.ts";

const DAY = 5;

async function parseInput(): Promise<{ ranges: BigInt[][], ingredientIds: BigInt[] }> {
  const lines = await readLines(DAY, false);

  const ranges: BigInt[][] = [];
  const ingredientIds: BigInt[] = [];

  for (const line of lines) {
    if (line.trim() === "") {
      continue;
    }
    if (line.includes("-")) {
      ranges.push(line.split("-").map(BigInt));
    } else {
      ingredientIds.push(BigInt(line));
    }
  }

  return { ranges, ingredientIds };
}

async function part1(): Promise<number | bigint> {

  const { ranges, ingredientIds } = await parseInput();

  let freshIngredientTotal: number = 0;

  for (const ingredientId of ingredientIds) {
    for (const range of ranges) {
      const [start, end] = range;
      if (ingredientId >= start && ingredientId <= end) {
        freshIngredientTotal++;
        break;
      }
    }
  }

  return freshIngredientTotal;
}

function normalizeRange(ranges: BigInt[][]): BigInt[][] {
  if (ranges.length === 0) return [];

  ranges.sort((a, b) => a[0]! < b[0]! ? -1 : 1);

  const normalizedRanges: BigInt[][] = [[...ranges[0]]];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];
    const lastNormalizedRange = normalizedRanges[normalizedRanges.length - 1];
    const [_, lastNormalizedEnd] = lastNormalizedRange;

    if (start <= lastNormalizedEnd + 1n) {
      lastNormalizedRange[1] = end > lastNormalizedEnd ? end : lastNormalizedEnd;
    } else {
      normalizedRanges.push([start, end]);
    }
  }

  return normalizedRanges;
}

async function part2(): Promise<number | BigInt> {
  let { ranges, ingredientIds: _ } = await parseInput();

  ranges = normalizeRange(ranges);

  let freshIngredientTotal: BigInt = 0n;

  for (const [start, end] of ranges) {
   freshIngredientTotal += end - start + 1n;
  }

  return freshIngredientTotal;
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
