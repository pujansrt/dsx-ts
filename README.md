# Typed Data Structure

A TypeScript-first library of essential and advanced data structures with full type safety and clean APIs. Ideal for education, production use, and performance-critical applications.

---

## Features

- Type-safe implementations in modern TypeScript
- Core structures: Queue, Stack, LRU Cache, Priority Queue
- Advanced support coming: Trie, Graph, Bloom Filter, BK-Tree, Skip List
- Minimal, clean, readable codebase for learning and use
- Full test coverage with Jest
- Clean module exports with support for `@` alias

---

## Data Structures Included

| Structure        | File                 | Description                                   |
|------------------|----------------------|-----------------------------------------------|
| Queue            | `queue.ts`           | FIFO queue with optional capacity             |
| Stack            | `stack.ts`           | LIFO stack                                    |
| LRU Cache        | `lru-cache.ts`       | Least Recently Used cache with eviction       |
| Priority Queue   | `priority-queue.ts`  | Min/Max heap-based priority queue             |
| Bloom Filter     | `bloom-filter.ts`    | Bloomfilter  |

Coming Soon:
- Trie
- Bloom Filter
- BK-Tree
- Skip List
- Graph (adjacency list)

---

## Quick Start

### 1. Install

```bash
npm install @pujansrt/dsx-ts
```
## 2. Import and Use


### Example: Queue
```typescript
import { Queue } from "@pujansrt/dsx-ts";
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1
```

### Example: Priority Queue
```typescript
let pq: PriorityQueue<number> = new PriorityQueue(); // min-heap by default
pq.add(30);
pq.add(10);
pq.add(70);
pq.add(50);

while(!pq.isEmpty()) {
    console.log("v=",pq.dequeue());
}
```
### Example: LRU Cache
```typescript
let cache: LRUCache<string, number>  = new LRUCache(2);
cache.put('a', 10);
cache.put('b', 20);
console.log("Cache value = ",cache.get('a'));
```
