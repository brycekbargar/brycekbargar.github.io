import Todo from "./Todo";

class TodoList {
  todoId = 1;
  todos = [];

  add(title, done) {
    this.todos.push(new Todo(this.todoId++, title, { checked: done || false }));
  }
  remove(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }
  [Symbol.iterator]() {
    return this.todos[Symbol.iterator]();
  }
}

export default TodoList;
