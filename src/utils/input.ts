/**
 * Utility functions for reading and parsing Advent of Code inputs
 */

/**
 * Read input file for a specific day
 */
export async function readInput(day: number, useExample: boolean = false): Promise<string> {
  const dayStr = day.toString().padStart(2, "0");
  const path = useExample ? `src/inputs/day${dayStr}-example.txt` : `src/inputs/day${dayStr}.txt`;
  const file = Bun.file(path);
  
  if (!(await file.exists())) {
    throw new Error(`Input file not found: ${path}`);
  }
  
  return (await file.text()).trimEnd();
}

/**
 * Read input and split into lines
 */
export async function readLines(day: number, useExample: boolean = false): Promise<string[]> {
  const input = await readInput(day, useExample);
  return input.split("\n");
}

/**
 * Read input and split into number array (one number per line)
 */
export async function readNumbers(day: number): Promise<number[]> {
  const lines = await readLines(day);
  return lines.map(Number);
}

/**
 * Read input and split into groups separated by blank lines
 */
export async function readGroups(day: number, useExample: boolean = false): Promise<string[][]> {
  const input = await readInput(day, useExample);
  return input.split("\n\n").map(group => group.split("\n"));
}

/**
 * Read input as a 2D grid of characters
 */
export async function readGrid(day: number): Promise<string[][]> {
  const lines = await readLines(day);
  return lines.map(line => line.split(""));
}

/**
 * Read input as a 2D grid of numbers
 */
export async function readNumberGrid(day: number): Promise<number[][]> {
  const lines = await readLines(day);
  return lines.map(line => line.split("").map(Number));
}

/**
 * Parse numbers from a string (handles negative numbers too)
 */
export function parseNumbers(str: string): number[] {
  return (str.match(/-?\d+/g) || []).map(Number);
}

/**
 * Sum of an array of numbers
 */
export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

/**
 * Product of an array of numbers
 */
export function product(arr: number[]): number {
  return arr.reduce((a, b) => a * b, 1);
}

/**
 * Get minimum value in array
 */
export function min(arr: number[]): number {
  return Math.min(...arr);
}

/**
 * Get maximum value in array
 */
export function max(arr: number[]): number {
  return Math.max(...arr);
}

/**
 * Count occurrences of items in an array
 */
export function countBy<T>(arr: T[]): Map<T, number> {
  const counts = new Map<T, number>();
  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return counts;
}

/**
 * Group items by a key function
 */
export function groupBy<T, K>(arr: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const groups = new Map<K, T[]>();
  for (const item of arr) {
    const key = keyFn(item);
    const group = groups.get(key) || [];
    group.push(item);
    groups.set(key, group);
  }
  return groups;
}

/**
 * Range generator: range(5) => [0,1,2,3,4], range(2,5) => [2,3,4]
 */
export function range(startOrEnd: number, end?: number): number[] {
  const start = end === undefined ? 0 : startOrEnd;
  const stop = end === undefined ? startOrEnd : end;
  return Array.from({ length: stop - start }, (_, i) => start + i);
}

/**
 * Manhattan distance between two points
 */
export function manhattan(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

/**
 * Greatest common divisor
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Least common multiple
 */
export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

/**
 * LCM of multiple numbers
 */
export function lcmAll(numbers: number[]): number {
  return numbers.reduce(lcm, 1);
}
