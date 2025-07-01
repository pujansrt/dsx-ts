import { TTLCache } from '@/ttl-cache';

describe('TTLCache', () => {
  let cache: TTLCache<string, number>;

  beforeEach(() => {
    cache = new TTLCache(100); // 100ms TTL
  });

  test('should store and retrieve values within TTL', () => {
    cache.set('a', 1);
    expect(cache.get('a')).toBe(1);
  });

  test('should return undefined after TTL expires', (done) => {
    cache.set('a', 42);
    setTimeout(() => {
      expect(cache.get('a')).toBeUndefined();
      done();
    }, 150);
  });

  test('should delete a key manually', () => {
    cache.set('a', 123);
    cache.delete('a');
    expect(cache.get('a')).toBeUndefined();
  });

  test('should check presence with has()', () => {
    cache.set('x', 9);
    expect(cache.has('x')).toBe(true);
    cache.delete('x');
    expect(cache.has('x')).toBe(false);
  });

  test('should clear all entries', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.clear();
    expect(cache.size()).toBe(0);
  });

  test('should purge only expired entries', (done) => {
    cache.set('a', 1);
    cache.set('b', 2);
    setTimeout(() => {
      cache.set('c', 3); // still fresh
      cache.purgeExpired();
      expect(cache.get('a')).toBeUndefined();
      expect(cache.get('b')).toBeUndefined();
      expect(cache.get('c')).toBe(3);
      done();
    }, 120);
  });
});
