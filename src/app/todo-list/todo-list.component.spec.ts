import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { FormsModule } from '@angular/forms';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new todo item', () => {
    // Arrange
    const todoTitle = 'Test Todo';
    component.newTodoTitle = todoTitle;
    component.newTodoPriority = 'low';
    
    // Act
    component.addTodo();
    
    // Assert
    const createdTodo = component.currentTodos[0];
    expect(createdTodo).toBeTruthy();
    expect(createdTodo.title).toBe(todoTitle);
    expect(createdTodo.completed).toBeFalse();
    expect(createdTodo.priority).toBe('low');
  });

  it('should not create todo with empty title', () => {
    // Arrange
    component.newTodoTitle = '   ';
    const initialTodosLength = component.currentTodos.length;
    
    // Act
    component.addTodo();
    
    // Assert
    expect(component.currentTodos.length).toBe(initialTodosLength);
  });
});
