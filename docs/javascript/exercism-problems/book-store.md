---
sidebar_position: 3
title: Book Store
sidebar_label: Book Store
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Book Store</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-08</em></span>
</h1>

My Solution: [Exercism Book Store solution](https://exercism.org/tracks/javascript/exercises/book-store/solutions/zayeemZaki)

Greedy grouping is close for this problem, but not always optimal. The clean way is dynamic programming over the remaining book counts.

## Instructions

Each book costs $8 (800 cents). Discounts apply only when a group contains different titles:

- 2 different books: 5% off
- 3 different books: 10% off
- 4 different books: 20% off
- 5 different books: 25% off

If a basket has duplicates, split it into groups of unique titles and choose the grouping with the lowest total price.

Example basket: `[1, 1, 2, 2, 3, 3, 4, 5]`

- Grouping as `5 + 3` costs 5160 cents.
- Grouping as `4 + 4` costs 5120 cents.

So the best total is 5120 cents.

Implement `cost(books)` to return the minimum total in cents using integer arithmetic.

## Solution

```javascript
const DISCOUNTED_PRICE = {
  '1' : 1, 
  '2' : .95,
  '3' : .9,
  '4' : .8,
  '5' : .75
}
const ORGINAL_PRICE = 800;

export const cost = (books) => {
  let tally = {}
  books.forEach((book) => {
    tally[book] = (tally[book] || 0) + 1;
  });

  let counts = Object.values(tally).sort((a, b) => b - a);
  let groups = []
  
  const maxGroups = counts[0];
  for (let i = 0; i < maxGroups; i++) {
    let currentGroupLength = 0
    for (let j = 0; j < counts.length; j++) {
      if (counts[j] > 0) {
          currentGroupLength += 1;
          counts[j] -= 1
      }
    }
    groups.push(currentGroupLength);
  }
  
  let totalPrice = 0;
  let groupOfThree = 0;
  let groupOfFive = 0;
  
  for (let group of groups) {
    if (group === 3) {
      groupOfThree += 1;
    }
    else if (group === 5) {
      groupOfFive += 1;
    }
    totalPrice += ORGINAL_PRICE * group * DISCOUNTED_PRICE[group];
  }
  
  return totalPrice - Math.min(groupOfFive, groupOfThree) * 40;
  
};
```

## Mental Model

- We fill the object tally using forEach loop.
- Object.values(tally): takes only the count numbers from the tally object.
- .sort((a, b) => b - a): sorts those counts from highest to lowest.
