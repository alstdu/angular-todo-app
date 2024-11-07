export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority?: Priority;
}

export interface TodoList {
  id: string;
  name: string;
  todos: Todo[];
}
