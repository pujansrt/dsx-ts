import { LRUCache } from '@/lru-cache';

describe('LRUCache', () => {
  it('throws if capacity is zero or negative', () => {
    expect(() => new LRUCache(0)).toThrow('Capacity must be positive');
    expect(() => new LRUCache(-1)).toThrow('Capacity must be positive');
  });

  it('returns undefined for missing keys', () => {
    const cache = new LRUCache<string, number>(2);
    expect(cache.get('missing')).toBeUndefined();
  });

  it('stores and retrieves values', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
  });

  it('evicts least recently used item', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.get('a'); // a becomes most recently used
    cache.put('c', 3); // b should be evicted
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('a')).toBe(1);
    expect(cache.get('c')).toBe(3);
  });

  it('updates value and moves node to front', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('x', 100);
    cache.put('x', 200); // overwrite
    expect(cache.get('x')).toBe(200);
  });

  it('evicts the only item when capacity is 1', () => {
    const cache = new LRUCache<string, number>(1);
    cache.put('first', 1);
    cache.put('second', 2); // should evict 'first'
    expect(cache.get('first')).toBeUndefined();
    expect(cache.get('second')).toBe(2);
  });

  it('maintains correct internal links (integration test)', () => {
    const cache = new LRUCache<string, number>(3);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3);
    cache.get('a'); // a becomes most recently used
    cache.put('d', 4); // evicts b
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('a')).toBe(1);
    expect(cache.get('c')).toBe(3);
    expect(cache.get('d')).toBe(4);
  });
});
