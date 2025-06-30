import { BKTree, levenshtein } from '@/bk-tree';

describe('BKTree', () => {
  let tree: BKTree<string>;

  beforeEach(() => {
    tree = new BKTree<string>(levenshtein);
    ['book', 'back', 'boon', 'cook', 'nook'].forEach((word) => tree.add(word));
  });

  it('should return exact matches when threshold is 0', () => {
    const results = tree.search('book', 0);
    expect(results).toContain('book');
    expect(results.length).toBe(1);
  });

  it('should return multiple results for fuzzy input', () => {
    const results = tree.search('cook', 1);
    expect(results).toEqual(expect.arrayContaining(['cook', 'book', 'nook']));
  });

  it('should return empty array if no match found', () => {
    const results = tree.search('xyz', 1);
    expect(results).toEqual([]);
  });

  it('should handle search on empty tree', () => {
    const emptyTree = new BKTree<string>(levenshtein);
    expect(emptyTree.search('book', 1)).toEqual([]);
  });
});
