# Typed Data Structure
[![npm version](https://img.shields.io/npm/v/@pujansrt/dsx-ts)](https://www.npmjs.com/package/@pujansrt/dsx-ts)
[![install size](https://packagephobia.com/badge?p=@pujansrt/dsx-ts)](https://packagephobia.com/result?p=@pujansrt/dsx-ts)
[![codecov](https://codecov.io/gh/pujansrt/dsx-ts/branch/production/graph/badge.svg)](https://codecov.io/gh/pujansrt/dsx-ts)


A TypeScript-first library that provides a production-ready collection of fundamental and advanced data structures implemented in modern TypeScript. The library prioritizes type safety, performance, and developer experience while maintaining minimal, readable code suitable for both educational and production use cases.

---

## Features

- Type-safe implementations in modern TypeScript
- Core structures: Queue, Stack, LRU Cache, Priority Queue, Bloom Filter, BK-Tree
- Advanced support coming: Trie, Skip List
- Minimal, clean, readable codebase for learning and use
- Full test coverage with Jest

---

## Data Structures Included

| Structure      | File                | Description                                          |
|----------------|---------------------|------------------------------------------------------|
| Queue          | `queue.ts`          | FIFO queue with optional capacity                    |
| Stack          | `stack.ts`          | LIFO stack                                           |
| LRU Cache      | `lru-cache.ts`      | Least Recently Used cache with eviction              |
| TTL Cache      | `ttl-cache.ts`      | TTL cache with expiring value                        |
| Priority Queue | `priority-queue.ts` | Min/Max heap-based priority queue                    |
| Bloom Filter   | `bloom-filter.ts`   | Probabilistic structure for fast membership checking |
| BK-Tree        | `bk-tree.ts`        | Approximate string matching with edit distance       |
| Aho Corasick   | `aho-corasick.ts`   | Aho Corasick string matching algorithm               |

---

## Quick Start

### 1. Install

```bash
npm install @pujansrt/dsx-ts
```

## 2. Import and Use


### Example: Queue
A basic first-in-first-out structure ideal for buffering or scheduling tasks.

```typescript
import { Queue } from "@pujansrt/dsx-ts";
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1
```

### Example: Priority Queue
Use a priority queue when elements need to be processed based on their priority (e.g., job scheduling, pathfinding like Dijkstra's algorithm)

```typescript
const pq: PriorityQueue<number> = new PriorityQueue(); // min-heap by default
pq.add(30);
pq.add(10);
pq.add(70);
pq.add(50);

while(!pq.isEmpty()) {
    console.log("v=",pq.poll());
}
```
### Example: LRU Cache
Useful for caching recently used items with automatic eviction of the least recently accessed entries.

```typescript
const cache: LRUCache<string, number>  = new LRUCache(2);
cache.put('a', 10);
cache.put('b', 20);
console.log("Cache value = ",cache.get('a'));
```
### Example: Auto Expiring Cache (TTL Cache)
A cache that automatically removes items after a specified time-to-live (TTL).

```typescript
import { TTLCache } from "@pujansrt/dsx-ts";
const cache: TTLCache<string, number> = new TTLCache(1000); // 1 second TTL
cache.put('a', 10);
setTimeout(() => {
    console.log(cache.get('a')); // undefined, as it has expired
}, 1100);
```



### Example: Bloom Filter
Best for fast approximate membership checks at large scale (e.g., checking whether an email has already been seen). Very space-efficient with controlled false positives.

```typescript
const filter: BloomFilter  = new BloomFilter(100, [hashFnv1a, hashDjb2]);
const items = ['apple', 'banana', 'kiwi'];
items.forEach((i) => filter.add(i));
const falsePositive = filter.has('peach');
console.log(falsePositive);
```

### Example: BK-Tree
Used for fuzzy matching and typo-tolerant search (e.g., spellcheck, autocorrect). Efficient for nearest-neighbor search based on edit distance.

```typescript
import { BKTree } from "@pujansrt/dsx-ts";
const tree = new BKTree<string>(levenshtein);
['book', 'back', 'boon', 'cook', 'nook'].forEach((word) => tree.add(word));
const results = tree.search('book', 1);
console.log(results); // ['book', 'boon', 'cook']
```

### Example: Aho Corasick String Matching
The Aho-Corasick algorithm is a powerful and efficient string-matching algorithm. If you have a fixed set of "keywords" (a dictionary) that you want to find in a potentially very long input string, Aho-Corasick is highly efficient.

```typescript
import { AhoCorasick } from "@pujansrt/dsx-ts";
const ac = new AhoCorasick(['he', 'she', 'his', 'hers']);
const text = 'ushers';
const matches = ac.search(text);
console.log(matches);
```
## Build and Publish

```bash
tsc
npx tsup
npm publish --access public
```

## Contributing
Feel free to fork and submit PRs to add more data structures or improve performance. Suggestions and feedback welcome!

## License
MIT License — free for personal and commercial use.

## 👤 Author
Developed and maintained by Pujan Srivastava, a mathematician and software engineer with 18+ years of programming experience.
