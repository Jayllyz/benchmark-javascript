// parseAccept.test.ts

import { bench, describe, expect, test } from "vitest";
import { parseAccept1, parseAccept2 } from "./parseAccept";

const acceptHeader1 = `
  text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8;level=1;foo=bar,
  text/plain;q=0.7,application/json;q=0.6,text/css;q=0.5,text/javascript;q=0.4,
  image/png;q=0.3,image/jpeg;q=0.2,image/gif;q=0.1,image/bmp;q=0.05,image/svg+xml;q=0.01
`;
const acceptHeader2 =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8;level=1;foo=bar";

test("parseAccept1 should return the correct result for acceptHeader1", () => {
  const accepts = parseAccept1(acceptHeader1);
  expect(accepts).toEqual([
    { type: "text/html", params: {}, q: 1 },
    { type: "application/xhtml+xml", params: {}, q: 1 },
    { type: "application/xml", params: { q: "0.9" }, q: 0.9 },
    { type: "image/webp", params: {}, q: 1 },
    { type: "*/*", params: { q: "0.8", level: "1", foo: "bar" }, q: 0.8 },
    { type: "text/plain", params: { q: "0.7" }, q: 0.7 },
    { type: "application/json", params: { q: "0.6" }, q: 0.6 },
    { type: "text/css", params: { q: "0.5" }, q: 0.5 },
    { type: "text/javascript", params: { q: "0.4" }, q: 0.4 },
    { type: "image/png", params: { q: "0.3" }, q: 0.3 },
    { type: "image/jpeg", params: { q: "0.2" }, q: 0.2 },
    { type: "image/gif", params: { q: "0.1" }, q: 0.1 },
    { type: "image/bmp", params: { q: "0.05" }, q: 0.05 },
    { type: "image/svg+xml", params: { q: "0.01" }, q: 0.01 },
  ]);
});

test("parseAccept2 should return the correct result for acceptHeader1", () => {
  const accepts = parseAccept2(acceptHeader1);
  expect(accepts).toEqual([
    { type: "text/html", params: {}, q: 1 },
    { type: "application/xhtml+xml", params: {}, q: 1 },
    { type: "application/xml", params: { q: "0.9" }, q: 0.9 },
    { type: "image/webp", params: {}, q: 1 },
    { type: "*/*", params: { q: "0.8", level: "1", foo: "bar" }, q: 0.8 },
    { type: "text/plain", params: { q: "0.7" }, q: 0.7 },
    { type: "application/json", params: { q: "0.6" }, q: 0.6 },
    { type: "text/css", params: { q: "0.5" }, q: 0.5 },
    { type: "text/javascript", params: { q: "0.4" }, q: 0.4 },
    { type: "image/png", params: { q: "0.3" }, q: 0.3 },
    { type: "image/jpeg", params: { q: "0.2" }, q: 0.2 },
    { type: "image/gif", params: { q: "0.1" }, q: 0.1 },
    { type: "image/bmp", params: { q: "0.05" }, q: 0.05 },
    { type: "image/svg+xml", params: { q: "0.01" }, q: 0.01 },
  ]);
});

test("parseAccept1 should return the correct result for acceptHeader2", () => {
  const accepts = parseAccept1(acceptHeader2);
  expect(accepts).toEqual([
    { type: "text/html", params: {}, q: 1 },
    { type: "application/xhtml+xml", params: {}, q: 1 },
    { type: "application/xml", params: { q: "0.9" }, q: 0.9 },
    { type: "image/webp", params: {}, q: 1 },
    { type: "*/*", params: { q: "0.8", level: "1", foo: "bar" }, q: 0.8 },
  ]);
});

test("parseAccept2 should return the correct result for acceptHeader2", () => {
  const accepts = parseAccept2(acceptHeader2);
  expect(accepts).toEqual([
    { type: "text/html", params: {}, q: 1 },
    { type: "application/xhtml+xml", params: {}, q: 1 },
    { type: "application/xml", params: { q: "0.9" }, q: 0.9 },
    { type: "image/webp", params: {}, q: 1 },
    { type: "*/*", params: { q: "0.8", level: "1", foo: "bar" }, q: 0.8 },
  ]);
});

test("parseAccept1 should return matched support with custom match function", () => {
  const accepts = parseAccept1(acceptHeader1);
  const matched = accepts.find((accept) => accept.type === "image/webp");
  expect(matched).toEqual({ type: "image/webp", params: {}, q: 1 });
});

test("parseAccept2 should return matched support with custom match function", () => {
  const accepts = parseAccept2(acceptHeader1);
  const matched = accepts.find((accept) => accept.type === "image/webp");
  expect(matched).toEqual({ type: "image/webp", params: {}, q: 1 });
});

test("parseAccept1 should decide language by Accept-Language header", () => {
  const acceptHeader = "en-US,en;q=0.9,fr;q=0.8";
  const accepts = parseAccept1(acceptHeader);
  const matched = accepts.find((accept) => accept.type === "en-US");
  expect(matched).toEqual({ type: "en-US", params: {}, q: 1 });
});

test("parseAccept2 should decide language by Accept-Language header", () => {
  const acceptHeader = "en-US,en;q=0.9,fr;q=0.8";
  const accepts = parseAccept2(acceptHeader);
  const matched = accepts.find((accept) => accept.type === "en-US");
  expect(matched).toEqual({ type: "en-US", params: {}, q: 1 });
});

describe("Short Benchmark", () => {
  bench("parseAccept1", () => {
    parseAccept1(acceptHeader1);
    parseAccept1(acceptHeader2);
  });

  bench("parseAccept2", () => {
    parseAccept2(acceptHeader1);
    parseAccept2(acceptHeader2);
  });
});

describe("Long Benchmark", () => {
  bench("parseAccept1 with 1000 iterations", () => {
    for (let i = 0; i < 1000; i++) {
      parseAccept1(acceptHeader1);
      parseAccept1(acceptHeader2);
    }
  });

  bench("parseAccept2 with 1000 iterations", () => {
    for (let i = 0; i < 1000; i++) {
      parseAccept2(acceptHeader1);
      parseAccept2(acceptHeader2);
    }
  });
});
