import { readInput, sum } from "../../utils/input.ts";

const DAY = 2;

function parseInput(input: string): number[][] {
  return input.split(",").map(range => range.split("-").map(Number));
}

async function part1(): Promise<number> {
  const input = await readInput(DAY);
  const productIdsRanges = parseInput(input);

  const invalidIds: number[] = [];

  for (const productIdRange of productIdsRanges) {
    const [firstId, lastId] = productIdRange;

    for (let productId = firstId!; productId <= lastId!; productId++) {
      const productIdString = productId.toString();
      if (productIdString.length % 2 !== 0) {
        continue;
      }

      const firstHalf = productIdString.slice(0, productIdString.length / 2);
      const secondHalf = productIdString.slice(productIdString.length / 2);

      if (firstHalf === secondHalf) {
        invalidIds.push(productId);
      }
    }
  }

  // console.log(invalidIds);
  return sum(invalidIds);
}

async function part2(): Promise<number> {
  const input = await readInput(DAY, false);
  const productIdsRanges = parseInput(input);

  const invalidIds: number[] = [];

  for (const productIdRange of productIdsRanges) {
    const [firstId, lastId] = productIdRange;

    for (let productId = firstId!; productId <= lastId!; productId++) {
      const productIdString = productId.toString();
      for(let sequenceLength = 1; sequenceLength <= productIdString.length/2; sequenceLength++) {
        const sequences = productIdString.slice(0, sequenceLength);
        if(sequences.repeat(productIdString.length/sequenceLength) === productIdString) {
          invalidIds.push(productId);
          break;
        }
      }
    }
  }
// console.log(invalidIds);
  return sum(invalidIds);
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
