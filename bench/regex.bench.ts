import { bench, describe, expect } from "vitest";

const testCases = [
  {
    name: "Simple word match",
    regex: /hello/,
    input: "hello world",
  },
  {
    name: "Email pattern",
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    input: "test@example.com",
  },
  {
    name: "Multiple matches",
    regex: /\d+/g,
    input: "There are 3 apples and 4 oranges",
  },
  {
    name: "Complex pattern",
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    input: "Password123",
  },
];

describe("Regex Benchmark", () => {
  bench("String.match()", () => {
    for (const { regex, input } of testCases) {
      const result = input.match(regex);
      expect(result).toBeDefined();
    }
  });

  bench("Regex.exec()", () => {
    for (const { regex, input } of testCases) {
      const result = regex.exec(input);
      expect(result).toBeDefined();
    }
  });

  bench("new RegExp()", () => {
    for (const { regex, input } of testCases) {
      const result = new RegExp(regex).exec(input);
      expect(result).toBeDefined();
    }
  });
});
