import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, Priority } from '../todo.interface';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.sass'
})
export class TodoListComponent {
  todos: Todo[] = [];

  newTodoTitle: string = '';
  newTodoPriority: Priority = 'low'; // default priority

  // Array of available priorities for the dropdown
  priorities: Priority[] = ['low', 'medium', 'high'];

  constructor() {
    // Load todos from localStorage on component initialization
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    } else {
      // Initial todos only if nothing in localStorage
      this.todos = [
        { id: 1, title: 'Learn Angular', completed: false, priority: 'high' },
        { id: 2, title: 'Create a Todo App', completed: false, priority: 'medium' },
        { id: 3, title: 'Master TypeScript', completed: false, priority: 'low' }
      ];
      this.saveTodos();
    }
  }

  get activeTodos(): Todo[] {
    return this.todos.filter(todo => !todo.completed);
  }

  get completedTodos(): Todo[] {
    return this.todos.filter(todo => todo.completed);
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      // Create a new todo object
      let newTodo: Todo = {
        id: this.todos.length + 1,
        title: this.newTodoTitle.trim(),
        completed: false,
        priority: this.newTodoPriority
      };
      this.todos.push(newTodo);
      this.saveTodos();  // Save after adding
      this.newTodoTitle = '';
      this.newTodoPriority = 'low'; // Reset priority to default
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();  // Save after deleting
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveTodos();  // Save after toggling
  }

  // Add this private helper method
  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
