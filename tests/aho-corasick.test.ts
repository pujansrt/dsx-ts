import { AhoCorasick } from '@/aho-corasick';

describe('AhoCorasick', () => {
  test('should find all pattern matches in the text', () => {
    const ac = new AhoCorasick(['he', 'she', 'his', 'hers']);
    const matches = ac.search('ushers');

    const expected = ['she', 'he', 'hers'];
    const found = matches.map((m) => m.match);
    expected.forEach((word) => {
      expect(found).toContain(word);
    });
  });

  test('should match correct positions', () => {
    const ac = new AhoCorasick(['a', 'ab', 'bab', 'bc']);
    const text = 'abccbab';
    const matches = ac.search(text);

    const formatted = matches.map(({ match, index }) => `${match}@${index}`);
    expect(formatted).toEqual(['a@0', 'ab@0', 'bc@1', 'a@5', 'bab@4', 'ab@5']);
  });

  test('should return empty for unmatched text', () => {
    const ac = new AhoCorasick(['xyz', '123']);
    const matches = ac.search('hello world');
    expect(matches).toEqual([]);
  });

  test('should return empty for empty pattern list', () => {
    const ac = new AhoCorasick([]);
    const matches = ac.search('any text');
    expect(matches).toEqual([]);
  });

  test('should return empty for empty text', () => {
    const ac = new AhoCorasick(['a', 'b']);
    const matches = ac.search('');
    expect(matches).toEqual([]);
  });
});
