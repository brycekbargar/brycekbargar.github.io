import CheckableMixin from "../mixins/checkable";

class Todo extends CheckableMixin(Object) {
  constructor(id, title, args) {
    super(args);
    this.id = id;
    this.title = title;
  }
}

export default Todo;
