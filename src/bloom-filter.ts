/**
 * A simple Bloom Filter implementation in TypeScript. Probabilistic Membership Checker
 *
 * Does not store actual data — only hashed bits.
 *
 * Ideal for:
 *   * Checking if a value might exist
 *   * Early-out filters to avoid DB/cache/network calls
 *   * Scenarios where memory is tight (IoT, web proxies, edge caches)
 *
 *
 * @author Pujan Srivastava
 */
export class BloomFilter {
  private readonly size: number;
  private bitArray: Uint8Array;
  private hashFns: ((val: string) => number)[];

  constructor(size: number, hashFns: ((val: string) => number)[]) {
    this.size = size;
    this.bitArray = new Uint8Array(size);
    this.hashFns = hashFns;
  }

  add(item: string): void {
    for (const fn of this.hashFns) {
      const index = fn(item) % this.size;
      this.bitArray[index] = 1;
    }
  }

  has(item: string): boolean {
    return this.hashFns.every((fn) => {
      const index = fn(item) % this.size;
      return this.bitArray[index] === 1;
    });
  }
}

// FNV-1a hash
export function hashFnv1a(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash *= 16777619;
  }
  return Math.abs(hash);
}

// Basic DJB2 hash
export function hashDjb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}
