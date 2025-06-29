type Node<K, V> = {
  key: K;
  value: V;
  prev: Node<K, V> | null;
  next: Node<K, V> | null;
};

export class LRUCache<K, V> {
  private readonly capacity: number;
  private map: Map<K, Node<K, V>>;
  private head: Node<K, V> | null = null;
  private tail: Node<K, V> | null = null;

  constructor(capacity: number) {
    if (capacity <= 0) throw new Error('Capacity must be positive');
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;

    this.moveToFront(node);
    return node.value;
  }

  put(key: K, value: V): void {
    const node = this.map.get(key);
    if (node) {
      node.value = value;
      this.moveToFront(node);
    } else {
      const newNode: Node<K, V> = {
        key,
        value,
        prev: null,
        next: null
      };
      this.map.set(key, newNode);
      this.addToFront(newNode);

      if (this.map.size > this.capacity) {
        this.removeLRU();
      }
    }
  }

  private moveToFront(node: Node<K, V>): void {
    if (node === this.head) return;

    // Detach node
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    if (node === this.tail) this.tail = node.prev;

    // Move to front
    node.prev = null;
    node.next = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;

    if (!this.tail) this.tail = node;
  }

  private addToFront(node: Node<K, V>): void {
    node.next = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;

    if (!this.tail) this.tail = node;
  }

  private removeLRU(): void {
    if (!this.tail) return;

    this.map.delete(this.tail.key);
    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      this.head = this.tail = null;
    }
  }
}
