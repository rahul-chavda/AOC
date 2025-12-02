import { readLines, sum, parseNumbers } from "../../utils/input.ts";

const DAY = 2;

async function part1(): Promise<number> {
  const lines = await readLines(DAY);
  
  // TODO: Implement part 1
  console.log("Sample input:", lines.slice(0, 5));
  
  return 0;
}

async function part2(): Promise<number> {
  const lines = await readLines(DAY);
  
  // TODO: Implement part 2
  
  return 0;
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
