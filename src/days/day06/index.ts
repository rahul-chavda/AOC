import { readLines, sumBigInt } from "../../utils/input.ts";

const DAY = 6;

function parseInputP1(lines: string[]): { nums: bigint[], operation: string }[] {
  const numsArr: bigint[][] = [];
  const opsArr: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.split(" ").filter(Boolean);
    if (line.startsWith("*") || line.startsWith("+")) {
      opsArr.push(...trimmedLine);
      continue;
    }
    numsArr.push(trimmedLine.map(BigInt));
  }

  return opsArr.map((op, index) => ({ nums: numsArr.map(nums => nums.at(index) || 0n), operation: op }));
}

async function part1(): Promise<number | bigint> {
  const lines = await readLines(DAY, false);

  const problems = parseInputP1(lines);
  const results: bigint[] = [];

  for (const problem of problems) {
    const { nums, operation } = problem;

    let result = 0n;
    if (operation === "*") {
      result = nums.reduce((a, b) => a * b);
    } else {
      result = nums.reduce((a, b) => a + b);
    }

    results.push(result);
  }

  return sumBigInt(results);
}

function parseInputP2(lines: string[]) {

  const numsLines = lines.slice(0, lines.length - 1).map(line => line.split(""));
  const opsLine = lines[lines.length - 1].split("");

  const problems: { nums: bigint[], operation: string }[] = [];

  let nums = [];
  for (let i = numsLines[0].length - 1; i >= 0; i--) {
    const numInString = numsLines.map(line => line[i]?.trim()).join("");
    if (numInString === "") {
      continue;
    }

    nums.push(BigInt(numInString));

    const op = opsLine[i];
    if (op === "*" || op === "+") {
      problems.push({ nums: [...nums], operation: op });
      nums = [];
    }
  }

  return problems;
}

async function part2(): Promise<number | bigint> {
  const lines = await readLines(DAY, false);
  const problems = parseInputP2(lines);
  const results: bigint[] = [];
  console.log(problems);

  for (const problem of problems) {
    const { nums, operation } = problem;

    let result = 0n;
    if (operation === "*") {
      result = nums.reduce((a, b) => a * b);
    } else {
      result = nums.reduce((a, b) => a + b);
    }

    results.push(result);
  }

  console.log(results);
  return sumBigInt(results);
}

// Main execution
console.log("🎄 Advent of Code - Day", DAY);
console.log("─".repeat(30));

// console.time("Part 1");
// const result1 = await part1();
// console.timeEnd("Part 1");
// console.log("Part 1:", result1);

console.log();

console.time("Part 2");
const result2 = await part2();
console.timeEnd("Part 2");
console.log("Part 2:", result2);
