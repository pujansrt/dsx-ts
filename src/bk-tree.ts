type DistanceFunction<T> = (a: T, b: T) => number;

class BKTreeNode<T> {
  value: T;
  children: Map<number, BKTreeNode<T>> = new Map();

  constructor(value: T) {
    this.value = value;
  }
}

export class BKTree<T> {
  private root: BKTreeNode<T> | null = null;
  private distanceFn: DistanceFunction<T>;

  constructor(distanceFn: DistanceFunction<T>) {
    this.distanceFn = distanceFn;
  }

  add(value: T): void {
    if (!this.root) {
      this.root = new BKTreeNode(value);
      return;
    }

    let node = this.root;
    let dist = this.distanceFn(value, node.value);

    while (node.children.has(dist)) {
      node = node.children.get(dist)!;
      dist = this.distanceFn(value, node.value);
    }

    node.children.set(dist, new BKTreeNode(value));
  }

  search(query: T, threshold: number): T[] {
    const result: T[] = [];

    const recurse = (node: BKTreeNode<T>) => {
      const dist = this.distanceFn(query, node.value);

      if (dist <= threshold) {
        result.push(node.value);
      }

      for (let [childDist, child] of node.children) {
        if (childDist >= dist - threshold && childDist <= dist + threshold) {
          recurse(child);
        }
      }
    };

    if (this.root) recurse(this.root);
    return result;
  }
}

export function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[a.length][b.length];
}
