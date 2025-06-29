import { PriorityQueue } from '../src';

describe('PriorityQueue - Min Heap', () => {
  let pq: PriorityQueue<number>;

  beforeEach(() => {
    pq = new PriorityQueue((a, b) => a - b); // Min heap
  });

  test('inserts and removes elements in ascending order', () => {
    pq.enqueue(5);
    pq.enqueue(1);
    pq.enqueue(10);

    expect(pq.dequeue()).toBe(1);
    expect(pq.dequeue()).toBe(5);
    expect(pq.dequeue()).toBe(10);
    expect(pq.dequeue()).toBeUndefined();
  });

  test('peek returns the minimum without removing it', () => {
    pq.enqueue(20);
    pq.enqueue(3);
    pq.enqueue(15);

    expect(pq.peek()).toBe(3); // still 3
    expect(pq.size()).toBe(3); // size unchanged
    pq.dequeue();
    expect(pq.peek()).toBe(15); // now 15
  });

  test('handles duplicate elements correctly', () => {
    pq.enqueue(5);
    pq.enqueue(5);
    pq.enqueue(5);

    expect(pq.dequeue()).toBe(5);
    expect(pq.dequeue()).toBe(5);
    expect(pq.dequeue()).toBe(5);
    expect(pq.isEmpty()).toBe(true);
  });

  test('isEmpty and size work as expected', () => {
    expect(pq.isEmpty()).toBe(true);
    expect(pq.size()).toBe(0);

    pq.enqueue(1);
    expect(pq.isEmpty()).toBe(false);
    expect(pq.size()).toBe(1);

    pq.dequeue();
    expect(pq.isEmpty()).toBe(true);
  });
});

describe('PriorityQueue - Max Heap', () => {
  let pq: PriorityQueue<number>;

  beforeEach(() => {
    pq = new PriorityQueue((a, b) => b - a); // Max heap
  });

  test('removes elements in descending order', () => {
    pq.enqueue(2);
    pq.enqueue(8);
    pq.enqueue(4);

    expect(pq.dequeue()).toBe(8);
    expect(pq.dequeue()).toBe(4);
    expect(pq.dequeue()).toBe(2);
  });
});
