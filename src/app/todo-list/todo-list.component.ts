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
  todos: Todo[] = [
    { id: 1, title: 'Learn Angular', completed: false, priority: 'high' },
    { id: 2, title: 'Create a Todo App', completed: false, priority: 'medium' },
    { id: 3, title: 'Master TypeScript', completed: false, priority: 'low' }
  ];

  newTodoTitle: string = '';
  newTodoPriority: Priority = 'low'; // default priority

  // Array of available priorities for the dropdown
  priorities: Priority[] = ['low', 'medium', 'high'];

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
      this.newTodoTitle = '';
      this.newTodoPriority = 'low'; // Reset priority to default
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
  }
}
