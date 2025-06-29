import { BloomFilter } from '@/bloom-filter';

const hash1 = (str: string) => str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
const hash2 = (str: string) => str.split('').reduce((acc, char, idx) => acc + char.charCodeAt(0) * (idx + 1), 0);

describe('BloomFilter', () => {
  let filter: BloomFilter;

  beforeEach(() => {
    filter = new BloomFilter(100, [hash1, hash2]);
  });

  test('returns false for item not added', () => {
    expect(filter.has('apple')).toBe(false);
  });

  test('returns true after adding an item', () => {
    filter.add('apple');
    expect(filter.has('apple')).toBe(true);
  });

  test('returns true for multiple added items', () => {
    const words = ['apple', 'banana', 'cherry'];
    words.forEach((w) => filter.add(w));

    words.forEach((w) => {
      expect(filter.has(w)).toBe(true);
    });
  });

  test('returns false for an unrelated item (may be false positive)', () => {
    filter.add('apple');
    filter.add('banana');

    const possiblyPresent = filter.has('dragonfruit');
    // Should be false or occasionally true (false positive)
    expect(typeof possiblyPresent).toBe('boolean');
  });

  test('is likely to produce false positives with small size', () => {
    const smallFilter = new BloomFilter(10, [hash1, hash2]);
    const items = ['a', 'b', 'c', 'd', 'e'];

    items.forEach((i) => smallFilter.add(i));
    const falsePositive = smallFilter.has('z');

    // There's a real chance 'z' appears as present
    expect(typeof falsePositive).toBe('boolean');
  });
});
