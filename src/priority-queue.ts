export class PriorityQueue<T> {
  private heap: T[] = [];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  enqueue(item: T): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.size() > 0 && bottom !== undefined) {
      this.heap[0] = bottom;
      this.bubbleDown();
    }
    return top;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    const item = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (this.comparator(item, parent) >= 0) break;

      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = item;
  }

  private bubbleDown(): void {
    let index = 0;
    const length = this.heap.length;
    const item = this.heap[0];

    while (true) {
      let leftIdx = 2 * index + 1;
      let rightIdx = 2 * index + 2;
      let smallest = index;

      if (leftIdx < length && this.comparator(this.heap[leftIdx], this.heap[smallest]) < 0) {
        smallest = leftIdx;
      }

      if (rightIdx < length && this.comparator(this.heap[rightIdx], this.heap[smallest]) < 0) {
        smallest = rightIdx;
      }

      if (smallest === index) break;

      this.heap[index] = this.heap[smallest];
      index = smallest;
    }

    this.heap[index] = item;
  }
}
