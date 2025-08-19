import { bench, describe } from "vitest";

const generateRandomStrings = (count: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: count }, () =>
    Array.from(
      { length: 10 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join(""),
  );
};

const dataSet = generateRandomStrings(100000);
const needles = ["ABC123", "XYZ789", "QWE456", "ZXC098"];

describe("Conditions Benchmarks", () => {
  bench("Complex regex", () => {
    const regex = /^[A-Z]{3}[0-9]{3}$/;
    dataSet.filter((item) => regex.test(item));
  });

  bench("Multiple regex", () => {
    const regexes = needles.map((needle) => new RegExp(needle));
    dataSet.filter((item) => regexes.some((regex) => regex.test(item)));
  });

  bench("Complex if conditions", () => {
    dataSet.filter((item) => {
      if (
        item.length === 6 &&
        item.slice(0, 3).toUpperCase() === item.slice(0, 3) &&
        !Number.isNaN(Number.parseInt(item.slice(3), 10))
      ) {
        return true;
      }
      return false;
    });
  });

  bench("Nested if-else", () => {
    dataSet.filter((item) => {
      if (item.length === 6) {
        if (item.slice(0, 3).toUpperCase() === item.slice(0, 3)) {
          if (!Number.isNaN(Number.parseInt(item.slice(3), 10))) {
            return true;
          }
        }
      }
      return false;
    });
  });

  bench("Switch with multiple cases", () => {
    dataSet.filter((item) => {
      switch (item.slice(0, 3)) {
        case "ABC":
        case "XYZ":
        case "QWE":
        case "ZXC":
          return !Number.isNaN(Number.parseInt(item.slice(3), 10));
        default:
          return false;
      }
    });
  });

  bench("Ternary with multiple conditions", () => {
    dataSet.filter((item) =>
      item.length === 6
        ? item.slice(0, 3).toUpperCase() === item.slice(0, 3)
          ? !Number.isNaN(Number.parseInt(item.slice(3), 10))
          : false
        : false,
    );
  });

  bench("Array.includes", () => {
    dataSet.filter((item) => needles.includes(item));
  });

  bench("Object lookup", () => {
    const lookupObject = Object.fromEntries(
      needles.map((needle) => [needle, true]),
    );
    dataSet.filter((item) => lookupObject[item]);
  });
});
