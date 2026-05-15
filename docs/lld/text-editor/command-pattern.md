---
sidebar_position: 1
title: Command Pattern
sidebar_label: Command Pattern
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
    <span>Command Pattern</span>
    <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-15</em></span>
</h1>

The Command Pattern is a behavioral design pattern that turns a request or an action into a standalone object. This object contains all the information needed to perform the action, which allows you to parameterize methods with different requests, delay or queue a request's execution, and most importantly, support undoable operations.

In this Text Editor implementation, the pattern solves the problem of reversing actions by decoupling the user interface from the underlying business logic. Instead of the editor directly modifying the document, every action (like typing or deleting) is encapsulated into its own command object.

Here is how the architecture breaks down:

- **The Receiver (Document):** The core business logic. It simply holds the text and knows how to add or remove characters, but it knows absolutely nothing about commands, history, or undo logic.
- **The Commands (WriteText, DeleteText):** These act as the middleman. They contain the `execute()` logic to perform an action, but crucially, they also store the exact state needed to reverse that specific action in an `undo()` method (such as remembering the exact character that was just deleted).
- **The Invoker (The History Manager):** This layer acts as the application controller. It triggers the commands and pushes them onto a history stack. When a user wants to undo an action, the invoker simply pops the last command off the stack and tells it to reverse itself.

By structuring the application this way, the core system remains completely modular. You can add dozens of new features (like copy, paste, or format) simply by writing new Command classes, without ever needing to change the Editor or Document code.

## Full Implementation

See [Text Editor LLD](./text-editor-problem.md) for the complete code implementation.
