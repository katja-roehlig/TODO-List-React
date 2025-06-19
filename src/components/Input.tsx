import { useEffect, useRef, useState } from "react";
import type { FC } from "react";

//Type declaration
type TodoItem = { id: string; name: string; prio: boolean; isDone: boolean };
type InputProps = {
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  todoList: TodoItem[];
};

const Input: FC<InputProps> = ({ setTodoList, todoList }) => {
  //Variables
  const uuid = crypto.randomUUID();

  const cursorRef = useRef<HTMLInputElement>(null);
  //States
  const [todo, setTodo] = useState("");
  const [prio, setPrio] = useState(false);

  //localStorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);

  //Functions
  const handleTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo.length > 3) {
      const newTodo: TodoItem = {
        id: uuid,
        name: todo,
        prio: prio,
        isDone: false,
      };
      setTodoList((prev) => {
        const sortedList = [...prev, newTodo];
        sortedList.sort((a, b) => {
          return Number(b.prio) - Number(a.prio); // true correspond to 1, false correspond to 0 - you have to convert them into Numbers
        });
        return sortedList;
      });
      setTodo("");
      setPrio(false);
      cursorRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleTodo}>
      <label htmlFor="todos">Todo einfügen </label>
      <input
        name="todos"
        id="todos"
        ref={cursorRef}
        autoFocus
        required
        placeholder="Wäsche waschen"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
      ></input>
      <label>
        <input type="checkbox" checked={prio} onChange={() => setPrio(!prio)} />
        urgent
      </label>
      <button type="submit">Todo einfügen</button>
    </form>
  );
};

export default Input;
