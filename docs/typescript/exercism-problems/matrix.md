---
sidebar_position: 6
title: Matrix
sidebar_label: Matrix
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>Matrix</span>
  <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-04</em></span>
</h1>

My Solution: [Exercism Matrix solution](https://exercism.org/tracks/typescript/exercises/matrix/solutions/zayeemZaki)

## Instructions

Parse a matrix string (rows separated by newlines, numbers separated by spaces) and provide access to rows and columns. Rows read left-to-right, columns read top-to-bottom.

## Solution

```typescript
export class Matrix {
  readonly matrixData: number[][];
  
  constructor(input: string) {
    const line = input.split('\n');

    this.matrixData = line.map((line) => {
      const stringNumbers = line.trim().split(' ');
      return stringNumbers.map((s) => Number(s));
    })
  }

  get rows(): number[][] {
    return this.matrixData;
  }

  get columns(): number[][] {
    const rowCount = this.matrixData.length;
    const colCount = this.matrixData[0].length;

    const cols: number[][] = [];
    for (let j = 0; j < colCount; j++) {
      cols[j] = [];
    }

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        cols[j][i] = this.matrixData[i][j];
      }
    }

    return cols;
  }
}
```

## Tests

```typescript
// Extract row from one number matrix
const matrix1 = new Matrix('1')
console.log(matrix1.rows[0]); // [1]

// Extract row
const matrix2 = new Matrix('1 2\n3 4')
console.log(matrix2.rows[1]); // [3, 4]

// Extract column
const matrix3 = new Matrix('1 2 3\n4 5 6\n7 8 9')
console.log(matrix3.columns[2]); // [3, 6, 9]

// Extract column from non-square matrix
const matrix4 = new Matrix('1 2 3\n4 5 6\n7 8 9\n8 7 6')
console.log(matrix4.columns[2]); // [3, 6, 9, 6]
```

## Mental Model

- **`split('\n')`**: Breaks input into rows by newline character
- **`map()`**: Transforms each row string into an array of numbers
- **`trim().split(' ')`**: Removes whitespace then splits numbers by spaces
- **`Number(s)`**: Converts string numbers to actual numbers
- **Getter properties**: `get rows()` and `get columns()` act like properties but contain logic
- **Column extraction**: Nested loops with `cols[j][i] = this.matrixData[i][j]` swap row/column indices to transpose the matrix
