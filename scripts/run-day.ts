#!/usr/bin/env bun
/**
 * Script to run a specific day's solution
 * Usage: bun run day <day_number>
 * Example: bun run day 5
 */

const day = parseInt(process.argv[2]);

if (!day || day < 1 || day > 25) {
  console.error("❌ Please provide a valid day number (1-25)");
  console.error("   Usage: bun run day <day_number>");
  process.exit(1);
}

const dayStr = day.toString().padStart(2, "0");
const solutionPath = `src/days/day${dayStr}/index.ts`;

const exists = await Bun.file(solutionPath).exists();
if (!exists) {
  console.error(`❌ Day ${day} solution not found at ${solutionPath}`);
  console.error(`   Create it with: bun run new ${day}`);
  process.exit(1);
}

// Import and run the day's solution
await import(`../src/days/day${dayStr}/index.ts`);
