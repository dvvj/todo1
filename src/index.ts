import { TodoItem } from "./todoItem";
import { TodoColl } from "./todoColl";
import { TodoCollWMap } from "./todoColl_wMap";
import * as inquirer from 'inquirer';

let todos = [
  new TodoItem(1, "buy flowers"),
  new TodoItem(2, "get shoes"),
  new TodoItem(3, "collect tickets", true),
  new TodoItem(4, "call someone"),
];

let coll = new TodoColl("adam", todos);

console.clear();
console.log(`${coll.userName}'s todo list (${todos.length})`);

let newId = coll.addTodo("go jogging");
let item = coll.byId(newId);
console.log(
  JSON.stringify(item)
);

let coll2 = new TodoCollWMap("adam", todos);
console.log(`${coll2.userName}'s todo list (${todos.length}) (using map)`);
newId = coll2.addTodo("go jogging");
item = coll2.byId(newId);
console.log(
  JSON.stringify(item)
);
console.log("showing all tasks: ");
coll2.getTodoItems(true).forEach(item => item.printDetails());

console.log("showing counts: ");

function displayTodoList(): void {
  console.log("showing imcomplete tasks: ");
  coll2.getTodoItems(false).forEach(item => item.printDetails());
}

console.log(coll2.getItemCounts());

// compiler error: coll.addTodo(item);
enum Commands {
  Quit = "Quit",
  Select = "Select"
}

function promptUser(): void {
  console.clear();

  displayTodoList();
  inquirer.prompt({
    type: "list",
    name: "command",
    message: "choose option",
    choices: Object.values(Commands)
  }).then(answers => {
    if (answers["command"] !== Commands.Quit) {
      promptUser();
    }
  })
}

promptUser();
