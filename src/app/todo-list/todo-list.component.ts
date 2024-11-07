import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, Priority, TodoList } from '../todo.interface';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.sass'
})
export class TodoListComponent implements OnInit {
  todoLists: TodoList[] = [];
  currentListId: string = '';
  showNewListInput: boolean = false;
  newListName: string = '';

  newTodoTitle: string = '';
  newTodoPriority: Priority = 'low'; // default priority
  newTodoDueDate: string = '';  // For the date input

  // Array of available priorities for the dropdown
  priorities: Priority[] = ['low', 'medium', 'high'];

  constructor() {
    this.loadTodoLists();
  }

  ngOnInit() {
    // If no lists exist, create a default one
    if (this.todoLists.length === 0) {
      this.createNewList('My First List');
    }
    // Set current list to first list if none selected
    if (!this.currentListId && this.todoLists.length > 0) {
      this.currentListId = this.todoLists[0].id;
    }
  }

  get currentList(): TodoList | undefined {
    return this.todoLists.find(list => list.id === this.currentListId);
  }

  get currentTodos(): Todo[] {
    return this.currentList?.todos || [];
  }

  get completedTodos(): Todo[] {
    return this.currentTodos.filter(todo => todo.completed);
  }

  get incompleteTodos(): Todo[] {
    return this.currentTodos.filter(todo => !todo.completed);
  }

  // Method to handle list scrolling visibility
  get showScrollButtons(): boolean {
    const listsContainer = document.querySelector('.lists-container');
    if (listsContainer) {
      return listsContainer.scrollWidth > listsContainer.clientWidth;
    }
    return false;
  }

  createNewList(name: string) {
    if (name.trim()) {
      const newList: TodoList = {
        id: Date.now().toString(), // Simple way to generate unique ID
        name: name.trim(),
        todos: []
      };
      this.todoLists.push(newList);
      this.currentListId = newList.id;
      this.saveTodoLists();
      this.showNewListInput = false;
      this.newListName = '';
    }
  }

  deleteList(id: string) {
    if (confirm('Are you sure you want to delete this list?')) {
      this.todoLists = this.todoLists.filter(list => list.id !== id);
      if (this.currentListId === id) {
        this.currentListId = this.todoLists[0]?.id || '';
      }
      this.saveTodoLists();
    }
  }

  // Modified todo operations to work with current list
  addTodo() {
    if (this.newTodoTitle.trim() && this.currentList) {
      const newTodo: Todo = {
        id: this.currentTodos.length + 1,
        title: this.newTodoTitle.trim(),
        completed: false,
        priority: this.newTodoPriority,
        dueDate: this.newTodoDueDate ? new Date(this.newTodoDueDate) : undefined
      };
      this.currentList.todos.push(newTodo);
      this.saveTodoLists();
      this.newTodoTitle = '';
      this.newTodoPriority = 'low';
      this.newTodoDueDate = '';
    }
  }

  deleteTodo(id: number) {
    if (this.currentList) {
      this.currentList.todos = this.currentList.todos.filter(todo => todo.id !== id);
      this.saveTodoLists();  // Save the entire lists array
    }
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveTodoLists();  // Save the entire lists array
  }

  private loadTodoLists() {
    const savedLists = localStorage.getItem('todoLists');
    if (savedLists) {
      this.todoLists = JSON.parse(savedLists);
    }
  }

  private saveTodoLists() {
    localStorage.setItem('todoLists', JSON.stringify(this.todoLists));
  }

  // Scroll methods
  scrollLists(direction: 'left' | 'right') {
    const container = document.querySelector('.lists-container');
    if (container) {
      const scrollAmount = 200; // Adjust as needed
      const newScrollPosition = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  }

  isOverdue(date: Date): boolean {
    return new Date(date) < new Date(new Date().setHours(0, 0, 0, 0));
  }
}
