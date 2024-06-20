// parseAccept.test.ts

import { expect, test } from 'vitest';
import { parseAccept1, parseAccept2 } from './parseAccept';

const acceptHeader1 = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8;level=1;foo=bar';
const acceptHeader2 = 'application/json;q=0.5,application/xml;q=0.9';

test('parseAccept1 should return the correct result for acceptHeader1', () => {
  const accepts = parseAccept1(acceptHeader1);
  expect(accepts).toEqual([
    { type: 'text/html', params: {}, q: 1 },
    { type: 'application/xhtml+xml', params: {}, q: 1 },
    { type: 'application/xml', params: { q: '0.9' }, q: 0.9 },
    { type: 'image/webp', params: {}, q: 1 },
    { type: '*/*', params: { q: '0.8', level: '1', foo: 'bar' }, q: 0.8 },
  ]);
});

test('parseAccept2 should return the correct result for acceptHeader1', () => {
  const accepts = parseAccept2(acceptHeader1);
  expect(accepts).toEqual([
    { type: 'text/html', params: {}, q: 1 },
    { type: 'application/xhtml+xml', params: {}, q: 1 },
    { type: 'application/xml', params: { q: '0.9' }, q: 0.9 },
    { type: 'image/webp', params: {}, q: 1 },
    { type: '*/*', params: { q: '0.8', level: '1', foo: 'bar' }, q: 0.8 },
  ]);
});

test('parseAccept1 should return the correct result for acceptHeader2', () => {
  const accepts = parseAccept1(acceptHeader2);
  expect(accepts).toEqual([
    { type: 'application/json', params: { q: '0.5' }, q: 0.5 },
    { type: 'application/xml', params: { q: '0.9' }, q: 0.9 },
  ]);
});

test('parseAccept2 should return the correct result for acceptHeader2', () => {
  const accepts = parseAccept2(acceptHeader2);
  expect(accepts).toEqual([
    { type: 'application/json', params: { q: '0.5' }, q: 0.5 },
    { type: 'application/xml', params: { q: '0.9' }, q: 0.9 },
  ]);
});

test('parseAccept1 should return matched support with custom match function', () => {
  const accepts = parseAccept1(acceptHeader1);
  const matched = accepts.find((accept) => accept.type === 'image/webp');
  expect(matched).toEqual({ type: 'image/webp', params: {}, q: 1 });
});

test('parseAccept2 should return matched support with custom match function', () => {
  const accepts = parseAccept2(acceptHeader1);
  const matched = accepts.find((accept) => accept.type === 'image/webp');
  expect(matched).toEqual({ type: 'image/webp', params: {}, q: 1 });
});

test('parseAccept1 should decide language by Accept-Language header', () => {
  const acceptHeader = 'en-US,en;q=0.9,fr;q=0.8';
  const accepts = parseAccept1(acceptHeader);
  const matched = accepts.find((accept) => accept.type === 'en-US');
  expect(matched).toEqual({ type: 'en-US', params: {}, q: 1 });
});

test('parseAccept2 should decide language by Accept-Language header', () => {
  const acceptHeader = 'en-US,en;q=0.9,fr;q=0.8';
  const accepts = parseAccept2(acceptHeader);
  const matched = accepts.find((accept) => accept.type === 'en-US');
  expect(matched).toEqual({ type: 'en-US', params: {}, q: 1 });
});


test('parseAccept2 should be faster than parseAccept1', () => {
  const iterations = 50;

  let totalTime1 = 0;
  let totalTime2 = 0;

  for (let i = 0; i < iterations; i++) {
    const start1 = performance.now();
    parseAccept1(acceptHeader1);
    const end1 = performance.now();
    totalTime1 += end1 - start1;

    const start2 = performance.now();
    parseAccept2(acceptHeader1);
    const end2 = performance.now();
    totalTime2 += end2 - start2;
  }

  const averageTime1 = totalTime1 / iterations;
  const averageTime2 = totalTime2 / iterations;

  console.log('Average time parseAccept1:', averageTime1);
  console.log('Average time parseAccept2:', averageTime2);

  expect(averageTime2).toBeLessThan(averageTime1);
});
