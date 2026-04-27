---
sidebar_position: 12
title: Grade School
sidebar_label: Grade School
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Grade School</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-26</em></span>
</h1>

My Solution: [Exercism Grade School solution](https://exercism.org/tracks/python/exercises/grade-school/solutions/zayeemZaki)

## Instructions

Build a school roster that keeps students grouped by grade and returns names in alphabetical order within each grade.

Rules:

- `add_student(name, grade)` adds a student unless that student name was already enrolled.
- `roster()` returns all students ordered first by grade, then alphabetically within each grade.
- `grade(number)` returns the students in that grade in alphabetical order.
- `added()` returns the history of whether each attempted add succeeded.

## Solution

```python
class School:
    def __init__(self):
        self.db = {}
        self.enrolled_students = set()
        self.added_list = []
        
    def add_student(self, name, grade):
        if name not in self.enrolled_students:
            self.enrolled_students.add(name)
            self.db.setdefault(grade, []).append(name)
            self.added_list.append(True)
        else:
            self.added_list.append(False)

    def roster(self):
        roster = []
        for grade in sorted(self.db.keys()):
            roster.extend(sorted(self.db[grade]))

        return roster
        
    def grade(self, grade_number):
        return sorted(self.db.get(grade_number, []))
        
    def added(self):
        return self.added_list
```

## Syntax Notes

- A dictionary groups student names by grade.
- `self.db.setdefault(grade, [])` creates an empty list for a grade only if it does not exist yet, then returns that list so `.append(name)` works in one step.
- A set tracks which names have already been enrolled.
- `roster()` sorts by grade first, then sorts each grade's names alphabetically.
- `grade()` reads one grade directly from the dictionary and sorts the result.
- `added()` returns the boolean success history for each enrollment attempt.
