import { readLines, sum, parseNumbers } from "../../utils/input.ts";

const DAY = 1;

async function part1(): Promise<number> {
  const lines = await readLines(DAY);
  
  let dialPointer = 50;
  const dialerLength = 100;
  let dialerPointingCounter = 0;

  for (const rotationInstruction of lines) {
    const direction = rotationInstruction[0];
    const steps = parseInt(rotationInstruction.slice(1));

    if (direction === 'L') {
      dialPointer = dialPointer - steps;
    } else {
      dialPointer = dialPointer + steps;
    }

    if (dialPointer < 0) {
      dialPointer = dialerLength + dialPointer;
    }

    dialPointer = dialPointer % dialerLength;

    if (dialPointer === 0) {
      dialerPointingCounter++;
    }
  }
  
  return dialerPointingCounter;
}

async function part2(): Promise<number> {
  const lines = await readLines(DAY);
  
  let dialPointer = 50;
  const dialerLength = 100;
  let dialerPointingCounter = 0;

  for (const rotationInstruction of lines) {
    const direction = rotationInstruction[0];
    const steps = parseInt(rotationInstruction.slice(1));

    if (direction === 'L') {
      const oldPosition = dialPointer;
      dialPointer = dialPointer - steps;
      if (dialPointer <= 0) {
        const crossedZero = oldPosition > 0 ? 1 : 0;
        dialerPointingCounter += crossedZero + Math.floor(Math.abs(dialPointer) / dialerLength);
      }
    } else {
      dialPointer = dialPointer + steps;
      dialerPointingCounter += Math.floor(dialPointer / dialerLength);
    }

    dialPointer = ((dialPointer % dialerLength) + dialerLength) % dialerLength;
  }
  
  return dialerPointingCounter;
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
