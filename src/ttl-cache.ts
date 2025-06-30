interface TTLCacheEntry<V> {
  value: V;
  expiresAt: number;
}

export class TTLCache<K, V> {
  private store = new Map<K, TTLCacheEntry<V>>();

  constructor(private ttl: number) {} // ttl in ms

  set(key: K, value: V): void {
    const expiresAt = Date.now() + this.ttl;
    this.store.set(key, { value, expiresAt });
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key); // clean expired
      return undefined;
    }

    return entry.value;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  size(): number {
    return this.store.size;
  }

  // Clean up expired keys manually. Dev can call this method. Get already has this logic.
  // We can also do automatic purging on every get/set, but that might be inefficient for large caches.
  purgeExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.expiresAt <= now) {
        this.store.delete(key);
      }
    }
  }
}
