import { LRUCache } from '../src';

describe('LRUCache', () => {
  let cache: LRUCache<string, number>;

  beforeEach(() => {
    cache = new LRUCache(2); // capacity = 2
  });

  test('should store and retrieve values', () => {
    cache.put('a', 1);
    cache.put('b', 2);

    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
  });

  test('should evict least recently used item', () => {
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3); // evicts 'a'

    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);
  });

  test('should update existing keys and move to front', () => {
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('a', 99); // updates 'a' and moves to front
    cache.put('c', 3); // evicts 'b'

    expect(cache.get('a')).toBe(99);
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('c')).toBe(3);
  });

  test('should move accessed key to front', () => {
    cache.put('a', 1);
    cache.put('b', 2);

    // Access 'a' to make it recently used
    expect(cache.get('a')).toBe(1);

    // Add another entry which should evict 'b'
    cache.put('c', 3);

    expect(cache.get('b')).toBeUndefined(); // b should be evicted
    expect(cache.get('a')).toBe(1);
    expect(cache.get('c')).toBe(3);
  });

  test('should throw error if initialized with non-positive capacity', () => {
    expect(() => new LRUCache(0)).toThrow();
    expect(() => new LRUCache(-1)).toThrow();
  });

  test('should handle repeatedly accessing same key', () => {
    cache.put('x', 10);
    cache.put('y', 20);

    expect(cache.get('x')).toBe(10);
    expect(cache.get('x')).toBe(10);
    expect(cache.get('y')).toBe(20);

    // Now put a new key to evict LRU
    cache.put('z', 30);

    // 'x' and 'z' should remain (y should be LRU)
    expect(cache.get('x')).toBeUndefined();
    expect(cache.get('y')).toBe(20);
    expect(cache.get('z')).toBe(30);
  });
});
