type TrieNode = {
  children: Map<string, TrieNode>;
  fail?: TrieNode;
  outputs: string[];
};

export class AhoCorasick {
  private root: TrieNode = { children: new Map(), outputs: [] };

  constructor(private keywords: string[]) {
    this.buildTrie();
    this.buildFailures();
  }

  private buildTrie(): void {
    for (const word of this.keywords) {
      let node = this.root;
      for (const char of word) {
        if (!node.children.has(char)) {
          node.children.set(char, { children: new Map(), outputs: [] });
        }
        node = node.children.get(char)!;
      }
      node.outputs.push(word);
    }
  }

  private buildFailures(): void {
    const queue: TrieNode[] = [];

    for (const [char, child] of this.root.children.entries()) {
      child.fail = this.root;
      queue.push(child);
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const [char, child] of current.children.entries()) {
        queue.push(child);

        let fail = current.fail;
        while (fail && !fail.children.has(char)) {
          fail = fail.fail;
        }

        child.fail = fail?.children.get(char) || this.root;
        child.outputs.push(...(child.fail?.outputs || []));
      }
    }
  }

  search(text: string): { match: string; index: number }[] {
    const results: { match: string; index: number }[] = [];
    let node: TrieNode = this.root;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      // Traverse fail links until match or root
      while (node !== this.root && !node.children.has(char)) {
        node = node.fail ?? this.root;
      }

      node = node.children.get(char) ?? this.root;

      for (const word of node.outputs) {
        results.push({ match: word, index: i - word.length + 1 });
      }
    }

    return results;
  }
}
