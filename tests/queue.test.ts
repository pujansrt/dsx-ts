import { Queue } from '../src';

describe('Queue', () => {
  test('enqueue and dequeue in FIFO order', () => {
    const queue = new Queue<number>();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBeUndefined(); // queue is empty
  });

  test('size reflects number of elements', () => {
    const queue = new Queue<string>();
    expect(queue.size()).toBe(0);

    queue.enqueue('a');
    queue.enqueue('b');
    expect(queue.size()).toBe(2);

    queue.dequeue();
    expect(queue.size()).toBe(1);
  });

  test('throws error when exceeding capacity', () => {
    const queue = new Queue<number>(2);
    queue.enqueue(1);
    queue.enqueue(2);

    expect(() => queue.enqueue(3)).toThrow('Queue has reached max capacity');
  });

  test('dequeue from empty queue returns undefined', () => {
    const queue = new Queue<boolean>();
    expect(queue.dequeue()).toBeUndefined();
  });

  test('works with objects', () => {
    type Task = { id: number; name: string };
    const queue = new Queue<Task>();

    queue.enqueue({ id: 1, name: 'task1' });
    queue.enqueue({ id: 2, name: 'task2' });

    const task = queue.dequeue();
    expect(task?.id).toBe(1);
    expect(task?.name).toBe('task1');
  });
});
