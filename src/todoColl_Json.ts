import { TodoCollWMap } from "./todoColl_wMap";
import * as lowdb from "lowdb";
import { TodoItem } from "./todoItem";
import * as FileSync from 'lowdb/adapters/FileSync';

type schemaType = {
  tasks: {
    id: number,
    task: string,
    complete: boolean,
  }[]
};

export class JsonTodoColl extends TodoCollWMap {
  private database: lowdb.LowdbSync<schemaType>;

  constructor(
    public userName: string,
    items: TodoItem[] = []
  ) {
    super(userName, items);

    this.database = lowdb(new FileSync("todos.json"));

    if (this.database.has("tasks").value()) {
      let dbItems = this.database.get("tasks").value();
      console.log('found tasks in db', dbItems);
      dbItems.forEach(item => this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete)));
    } else {
      console.log('first run');
      this.database.set("tasks", items).write();
      items.forEach(item => this.itemMap.set(item.id, item));
    }
  }

  addTodo(task: string): number {
    let res = super.addTodo(task);
    this.storeTasks();
    return res;
  }

  markComplete(id: number, complete: boolean) {
    super.markComplete(id, complete);
    this.storeTasks();
  }


  private storeTasks() {
    this.database.set("tasks", [...this.itemMap.values()]).write();
  }
}