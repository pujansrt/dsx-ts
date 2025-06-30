import { Stack } from '@/stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it('should start empty', () => {
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBeUndefined();
    expect(stack.pop()).toBeUndefined();
  });

  it('should push and pop items in LIFO order', () => {
    stack.push(10);
    stack.push(20);
    stack.push(30);

    expect(stack.size()).toBe(3);
    expect(stack.peek()).toBe(30);
    expect(stack.pop()).toBe(30);
    expect(stack.pop()).toBe(20);
    expect(stack.pop()).toBe(10);
    expect(stack.size()).toBe(0);
  });

  it('should respect the stack capacity', () => {
    const limitedStack = new Stack<number>(2);
    limitedStack.push(1);
    limitedStack.push(2);
    expect(() => limitedStack.push(3)).toThrow('Stack has reached max capacity, you cannot add more items');
  });

  it('should allow peek without popping', () => {
    stack.push(99);
    expect(stack.peek()).toBe(99);
    expect(stack.size()).toBe(1);
    expect(stack.pop()).toBe(99);
  });

  it('should work with strings or other types', () => {
    const stringStack = new Stack<string>();
    stringStack.push('a');
    stringStack.push('b');
    expect(stringStack.peek()).toBe('b');
    expect(stringStack.pop()).toBe('b');
    expect(stringStack.pop()).toBe('a');
  });
});
