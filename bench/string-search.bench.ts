import { bench, describe } from "vitest";

const testCases = [
  {
    name: "Short string with match at beginning",
    haystack: "hello world this is a test",
    needle: "hello",
    regex: /hello/,
  },
  {
    name: "Short string with match at end",
    haystack: "this is a hello world test",
    needle: "test",
    regex: /test/,
  },
  {
    name: "Medium string with match in middle",
    haystack:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    needle: "consectetur",
    regex: /consectetur/,
  },
  {
    name: "Long string with match near end",
    haystack:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    needle: "laborum",
    regex: /laborum/,
  },
  {
    name: "String with no match",
    haystack: "hello world this is a test",
    needle: "xyz",
    regex: /xyz/,
  },
];

describe("String Search Benchmark", () => {
  bench("String.includes()", () => {
    for (const { haystack, needle } of testCases) {
      haystack.includes(needle);
    }
  });

  bench("String.indexOf()", () => {
    for (const { haystack, needle } of testCases) {
      haystack.indexOf(needle) !== -1;
    }
  });

  bench("RegExp.test()", () => {
    for (const { haystack, regex } of testCases) {
      regex.test(haystack);
    }
  });

  bench("String.search()", () => {
    for (const { haystack, regex } of testCases) {
      haystack.search(regex) !== -1;
    }
  });

  bench("String.match() (boolean check)", () => {
    for (const { haystack, regex } of testCases) {
      haystack.match(regex) !== null;
    }
  });
});
