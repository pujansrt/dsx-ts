import { PriorityQueue } from '@/priority-queue';

describe('PriorityQueue - Min Heap', () => {
  let pq: PriorityQueue<number>;

  beforeEach(() => {
    pq = new PriorityQueue(); //(a, b) => a - b); // Min heap OR b-a max heap
  });

  test('inserts and removes elements in ascending order', () => {
    pq.add(5);
    pq.add(1);
    pq.add(10);

    expect(pq.poll()).toBe(1);
    expect(pq.poll()).toBe(5);
    expect(pq.poll()).toBe(10);
    expect(pq.poll()).toBeUndefined();
  });

  test('peek returns the minimum without removing it', () => {
    pq.add(20);
    pq.add(3);
    pq.add(15);

    expect(pq.peek()).toBe(3); // still 3
    expect(pq.size()).toBe(3); // size unchanged
    pq.poll();
    expect(pq.peek()).toBe(15); // now 15
  });

  test('handles duplicate elements correctly', () => {
    pq.add(5);
    pq.add(5);
    pq.add(5);

    expect(pq.poll()).toBe(5);
    expect(pq.poll()).toBe(5);
    expect(pq.poll()).toBe(5);
    expect(pq.isEmpty()).toBe(true);
  });

  test('isEmpty and size work as expected', () => {
    expect(pq.isEmpty()).toBe(true);
    expect(pq.size()).toBe(0);

    pq.add(1);
    expect(pq.isEmpty()).toBe(false);
    expect(pq.size()).toBe(1);

    pq.poll();
    expect(pq.isEmpty()).toBe(true);
  });
});

describe('PriorityQueue - Max Heap', () => {
  let pq: PriorityQueue<number>;

  beforeEach(() => {
    pq = new PriorityQueue((a, b) => b - a); // Max heap
  });

  test('removes elements in descending order', () => {
    pq.add(2);
    pq.add(8);
    pq.add(4);

    expect(pq.poll()).toBe(8);
    expect(pq.poll()).toBe(4);
    expect(pq.poll()).toBe(2);
  });
});
