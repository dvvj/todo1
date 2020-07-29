import { TodoItem } from "./todoItem";

type ItemCounts = {
  total: number,
  incomplete: Number,
};

export class TodoCollWMap {
  private nextId: number = 1;
  protected itemMap = new Map<number, TodoItem>();

  constructor(
    public userName: string,
    items: TodoItem[] = []
  ) {
    items.forEach(item => this.itemMap.set(item.id, item));
  }

  addTodo(task: string): number {
    while (this.byId(this.nextId)) {
      this.nextId ++;
    }
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task))
    return this.nextId;
  }

  byId(id: number): TodoItem {
    return this.itemMap.get(id);
  }

  markComplete(id: number, complete: boolean) {
    const item = this.byId(id);
    if (item) {
      item.complete = complete;
    }
  }

  getTodoItems(includeComplete: boolean): TodoItem[] {
    console.log("map size: ", this.itemMap.size);
    const allItems = [...this.itemMap.values()];
    const res = includeComplete ? allItems :
      allItems.filter(item => !item.complete);
    console.log("allItems size: ", allItems.length, res.length);
    return res;
  }

  getItemCounts(): ItemCounts {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length
    }
  }
}