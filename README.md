# 🎄 Advent of Code

My solutions for [Advent of Code](https://adventofcode.com/) using [Bun](https://bun.sh/).

## Setup

```bash
bun install
```

## Usage

### Create a new day's solution

```bash
bun run new <day>

# Example: Create Day 5
bun run new 5
```

This will create:
- `src/days/day05/index.ts` - Solution template
- `src/inputs/day05.txt` - Input file (paste your puzzle input here)

### Run a day's solution

```bash
bun run day <day>

# Example: Run Day 5
bun run day 5
```

### Run tests

```bash
bun test
```

## Project Structure

```
├── src/
│   ├── days/           # Solutions organized by day
│   │   ├── day01/
│   │   │   └── index.ts
│   │   ├── day02/
│   │   │   └── index.ts
│   │   └── ...
│   ├── inputs/         # Puzzle inputs (not committed to git)
│   │   ├── day01.txt
│   │   ├── day02.txt
│   │   └── ...
│   └── utils/          # Helper functions
│       └── input.ts
├── scripts/            # Build/run scripts
│   ├── new-day.ts
│   └── run-day.ts
└── package.json
```

## Available Utilities

Import helpers from `../../utils/input.ts`:

```typescript
import {
  readInput,      // Read raw input string
  readLines,      // Read input as array of lines
  readNumbers,    // Read input as array of numbers
  readGroups,     // Split input by blank lines
  readGrid,       // Read as 2D char grid
  readNumberGrid, // Read as 2D number grid
  parseNumbers,   // Extract all numbers from string
  sum,            // Sum array of numbers
  product,        // Product of array
  min, max,       // Min/max of array
  countBy,        // Count occurrences
  groupBy,        // Group by key function
  range,          // Generate number range
  manhattan,      // Manhattan distance
  gcd, lcm,       // Greatest common divisor, least common multiple
  lcmAll,         // LCM of multiple numbers
} from "../../utils/input.ts";
```

## Tips

- Paste your puzzle input into `src/inputs/dayXX.txt`
- Input files are gitignored by default (per AOC guidelines)
- Each solution auto-times Part 1 and Part 2
- Use `console.log()` freely for debugging
