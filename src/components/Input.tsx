import Button from "./Button";
import { useState } from "react";

function Input() {
  //Type declaration
  type TodoItem = { name: string; isDone: boolean };

  //Variables
  const buttonText = "Todo einfügen";

  //States
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  //Functions
  const handleTodo = () => {
    const newTodo: TodoItem = { name: todo, isDone: false };
    setTodoList([...todoList, newTodo]);
    setTodo("");

    console.log("newTodo", newTodo);
    console.log("liste", todoList);
  };

  return (
    <>
      <label htmlFor="todos">Todo einfügen </label>
      <input
        name="todos"
        id="todos"
        required
        placeholder="Wäsche waschen"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
      ></input>
      <Button handleClick={handleTodo} buttonText={buttonText} />
    </>
  );
}

export default Input;
