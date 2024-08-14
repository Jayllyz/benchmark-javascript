import { bench, describe, expect } from "vitest";

const ITERATIONS = 1_000_000;
const testArray = Array(ITERATIONS).fill(0);
const testObject = Object.fromEntries(testArray.map((_, i) => [i, i]));

describe("Loop Benchmarks", () => {
  bench("for loop", () => {
    let count = 0;
    for (let i = 0; i < ITERATIONS; i++) {
      count++;
    }
    expect(count).toBe(ITERATIONS);
  });

  bench("while loop", () => {
    let i = 0;
    let count = 0;
    while (i < ITERATIONS) {
      i++;
      count++;
    }
    expect(count).toBe(ITERATIONS);
  });

  bench("for...of loop", () => {
    let count = 0;
    for (const _ of testArray) {
      count++;
    }
    expect(count).toBe(ITERATIONS);
  });

  bench("forEach loop", () => {
    let count = 0;
    // biome-ignore lint/complexity/noForEach: This is a benchmark
    testArray.forEach(() => {
      count++;
    });
    expect(count).toBe(ITERATIONS);
  });

  bench("map loop", () => {
    let count = 0;
    testArray.map(() => {
      count++;
    });
    expect(count).toBe(ITERATIONS);
  });

  bench("for...in loop", () => {
    let count = 0;
    for (const _ in testObject) {
      count++;
    }
    expect(count).toBe(ITERATIONS);
  });

  bench("do...while loop", () => {
    let i = 0;
    let count = 0;
    do {
      i++;
      count++;
    } while (i < ITERATIONS);
    expect(count).toBe(ITERATIONS);
  });

  bench("Array.from", () => {
    let count = 0;
    Array.from({ length: ITERATIONS }, () => {
      count++;
    });
    expect(count).toBe(ITERATIONS);
  });

  bench("reduce", () => {
    let count = 0;
    testArray.reduce(() => {
      count++;
    }, 0);
    expect(count).toBe(ITERATIONS);
  });
});

describe("Loop Benchmarks with length calculation", () => {
  bench("for loop with .length in condition", () => {
    let count = 0;
    for (let i = 0; i < testArray.length; i++) {
      count++;
    }
    expect(count).toBe(ITERATIONS);
  });

  bench("for loop with .length outside condition", () => {
    let count = 0;
    const length = testArray.length;
    for (let i = 0; i < length; i++) {
      count++;
    }
    expect(count).toBe(ITERATIONS);
  });
});
