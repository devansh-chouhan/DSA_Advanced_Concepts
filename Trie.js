class TrieNode {
  constructor() {
    this.mp = {};
    this.isEndOfWord = false;
  }
}

function getNode() {
  return new TrieNode();
}

function insert(word) {
  let crawler = root;
  for (let i = 0; i < word.length; i++) {
    let ch = word[i];
    if (crawler.mp[ch] === undefined) {
      crawler.mp[ch] = getNode();
    }
    crawler = crawler.mp[ch];
  }
  crawler.isEndOfWord = true;
}

function startsWith(word) {
  let crawler = root;
  for (let i = 0; i < word.length; i++) {
    let ch = word[i];
    if (crawler.mp[ch] === undefined) return false;
    crawler = crawler.mp[ch];
  }
  return true;
}

function search(word) {
  let crawler = root;
  for (let i = 0; i < word.length; i++) {
    let ch = word[i];
    if (crawler.mp[ch] === undefined) return false;
    crawler = crawler.mp[ch];
  }
  return crawler.isEndOfWord;
}

let root = getNode();

insert("apple");
insert("app");
insert("banana");

console.log(search("apple")); // true
console.log(search("app")); // true
console.log(search("ap")); // false

console.log(startsWith("ap")); // true
console.log(startsWith("ban")); // true
console.log(startsWith("cat")); // false

/*
Trie (Prefix Tree)

Used For:
- Prefix Search
- Autocomplete
- Dictionary Lookup

Time:
Insert      O(n)
Search      O(n)
StartsWith  O(n)

Space:
O(total characters)

Idea:
Each node stores:
1. children
2. isEndOfWord
*/
/*
-----------------------------------
Interview Follow-Ups
-----------------------------------

1. Delete Word
2. Count Words
3. Count Prefixes
4. Autocomplete Suggestions
5. Longest Common Prefix
6. Replace Words
7. Word Dictionary ('.' wildcard)
8. Word Search II (Leetcode)
9. Maximum XOR using Binary Trie

Very Common:
- Implement Trie
- Design Add and Search Words
- Word Search II
- Replace Words
*/
