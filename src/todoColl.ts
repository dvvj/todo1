import { TodoItem } from "./todoItem";

export class TodoColl {
  private nextId: number = 1;

  constructor(
    public userName: string,
    public items: TodoItem[] = []
  ) {

  }

  addTodo(task: string): number {
    while (this.byId(this.nextId)) {
      this.nextId ++;
    }

    this.items.push(new TodoItem(this.nextId, task));
    return this.nextId;
  }

  byId(id: number): TodoItem {
    return this.items.find(item => item.id === id);
  }

  markComplete(id: number, complete: boolean) {
    const item = this.byId(id);
    if (item) {
      item.complete = complete;
    }
  }
}