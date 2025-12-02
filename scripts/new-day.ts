#!/usr/bin/env bun
/**
 * Script to generate a new day's solution template
 * Usage: bun run new <day_number>
 * Example: bun run new 5
 */

const day = parseInt(process.argv[2]);

if (!day || day < 1 || day > 25) {
  console.error("❌ Please provide a valid day number (1-25)");
  console.error("   Usage: bun run new <day_number>");
  process.exit(1);
}

const dayStr = day.toString().padStart(2, "0");
const dayDir = `src/days/day${dayStr}`;
const inputFile = `src/inputs/day${dayStr}.txt`;

// Check if day already exists
const dirExists = await Bun.file(`${dayDir}/index.ts`).exists();
if (dirExists) {
  console.error(`❌ Day ${day} already exists at ${dayDir}`);
  process.exit(1);
}

// Create day directory
await Bun.$`mkdir -p ${dayDir}`;

// Create solution template
const template = `import { readLines, sum, parseNumbers } from "../../utils/input.ts";

const DAY = ${day};

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
`;

await Bun.write(`${dayDir}/index.ts`, template);

// Create empty input file if it doesn't exist
const inputExists = await Bun.file(inputFile).exists();
if (!inputExists) {
  await Bun.write(inputFile, "Paste your puzzle input here\n");
}

console.log(`✨ Created Day ${day} template!`);
console.log(`   📁 Solution: ${dayDir}/index.ts`);
console.log(`   📄 Input:    ${inputFile}`);
console.log();
console.log(`📝 Next steps:`);
console.log(`   1. Paste your puzzle input into ${inputFile}`);
console.log(`   2. Implement your solution in ${dayDir}/index.ts`);
console.log(`   3. Run with: bun run day ${day}`);
