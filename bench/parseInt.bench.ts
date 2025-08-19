import { bench, describe, expect } from "vitest";

function toInteger(n: number | string, defaultVal: number): number {
  const converted = Number(n);

  if (
    !Number.isNaN(converted) &&
    converted >= Number.MIN_SAFE_INTEGER &&
    converted <= Number.MAX_SAFE_INTEGER
  ) {
    return converted % 1 === 0 ? converted : Math.floor(converted);
  }

  return defaultVal;
}

function NumberIsInteger(n: number): boolean {
  return n % 1 === 0;
}

describe("ParseInt Benchmarks", () => {
  bench("parseInt", () => {
    const val = "4";
    const result = Number.parseInt(val, 10);
    expect(result).toBe(4);
  });

  bench("toInteger", () => {
    const val = "4";
    const result = toInteger(val, 0);
    expect(result).toBe(4);
  });

  bench("parseInt with check if integer", () => {
    const val = 4.5;
    const result = NumberIsInteger(val)
      ? val
      : Number.parseInt(val.toString(), 10);
    expect(result).toBe(4);
  });

  bench("Number", () => {
    const val = "4";
    const result = Number(val);
    expect(result).toBe(4);
  });

  bench("Unary", () => {
    const val = "4";
    const result = +val;
    expect(result).toBe(4);
  });

  bench("Bitwise", () => {
    const val = "4";
    const result = ~~val;
    expect(result).toBe(4);
  });
});
