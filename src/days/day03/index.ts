import { readLines, sum, sumBigInt } from "../../utils/input.ts";

const DAY = 3;


async function part1(): Promise<number> {
  const banks = await readLines(DAY, false);

  const joltage: number[] = [];

  for (const bank of banks) {
    const batteries = bank.split("").map(Number);

    let firstDigit = 0;
    let secondDigit = 0;
    let firstDigitIndex = 0;

    for (let i = 0; i < batteries.length - 1; i++) {
      const batteryNumber = batteries[i];
      if (firstDigit < batteryNumber) {
        firstDigit = batteryNumber;
        firstDigitIndex = i;
      }
    }

    for (let i = firstDigitIndex + 1; i < batteries.length; i++) {
      const batteryNumber = batteries[i];
      if (secondDigit < batteryNumber) {
        secondDigit = batteryNumber;
      }
    }

    joltage.push((firstDigit * 10) + secondDigit);
  }

  return sum(joltage);
}


async function part2(): Promise<number|bigint> {
  const banks = await readLines(DAY, false);
  const DIGIT_LENGTH = 12;
  const joltage: bigint[] = [];

  for (const bank of banks) {
    const batteries = bank.split("").map(Number);

    let jaultNumber = 0;
    let lastDigitIndex = 0;

    for (let DIGIT_INDEX = 0; DIGIT_INDEX < DIGIT_LENGTH; DIGIT_INDEX++) {
      let highestNumber = 0;

      // console.log(DIGIT_INDEX,"start:"+lastDigitIndex, "end:"+(batteries.length - DIGIT_LENGTH + DIGIT_INDEX));
      
      for (let i = lastDigitIndex; i <= batteries.length - DIGIT_LENGTH + DIGIT_INDEX; i++) {
        const batteryNumber = batteries[i]!;
        if (highestNumber < batteryNumber) {
          highestNumber = batteryNumber;
          lastDigitIndex = i+1;
        }
      }
      
      // console.log("number at "+DIGIT_INDEX+":"+highestNumber);
      // console.log(highestNumber);
      jaultNumber = (jaultNumber * 10) + highestNumber;
    }
    // console.log(jaultNumber);
    // break;
    joltage.push(BigInt(jaultNumber));
  }

  // console.log(joltage);

  return sumBigInt(joltage);
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
