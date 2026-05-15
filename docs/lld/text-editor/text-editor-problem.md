---
sidebar_position: 2
title: Text Editor LLD
sidebar_label: Text Editor LLD
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
    <span>Text Editor LLD</span>
    <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-15</em></span>
</h1>

## Deep Dive: Text Editor (Command Pattern)

This low-level design demonstrates the Command Pattern applied to a simple text editor. Each user action is wrapped in a Command object that can be executed and undone. The editor maintains a history of executed commands, enabling reliable undo functionality without coupling the UI to business logic.

## Full Implementation

```python
from abc import ABC, abstractmethod

class Document:
    def __init__(self):
        self.text = ""

    def add_text(self, text: str):
        self.text += text

    def delete_text(self, length: int):
        self.text = self.text[:-length]


class Command(ABC):

    @abstractmethod
    def execute(self):
        pass 

    @abstractmethod
    def undo(self):
        pass


class WriteText(Command):
    def __init__(self, document: Document, text: str):
        self.document = document
        self.text = text

    def execute(self):
        self.document.add_text(self.text)

    def undo(self):
        self.document.delete_text(len(self.text))


class DeleteText(Command):
    def __init__(self, document: Document):
        self.document = document
        self.deleted_text = ""

    def execute(self):
        self.deleted_text = self.document.text[-1]
        self.document.delete_text(1)

    def undo(self):
        self.document.add_text(self.deleted_text)



class Client:
    def __init__(self):
        self.history = []

    def execute_command(self, command: Command):
        command.execute()
        self.history.append(command)

    def undo_command(self):
        if len(self.history) > 0:
            last_command = self.history.pop()
            last_command.undo()
        else:
            print("Nothing to undo!")
    
if __name__ == '__main__':

    doc = Document()
    client = Client()

    cmd1 = WriteText(doc, "hello")
    cmd2 = WriteText(doc, " world!")

    client.execute_command(cmd1)
    client.execute_command(cmd2)

    print("Doc after execution: ", doc.text)

    client.undo_command()
    print("Doc after 1st undo: ", doc.text)

    cmd3 = DeleteText(doc)
    client.execute_command(cmd3)
    print("Doc after cmd 3: ", doc.text)

```
