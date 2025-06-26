import { /* useEffect */ useEffect, useRef, useState } from "react";
import type { FC } from "react";
import Button from "./Button";

//Type declaration
type TodoItem = { id: string; name: string; prio: boolean; isDone: boolean };
type InputProps = {
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  editTodo: TodoItem | null;
  setEditTodo: (todo: TodoItem | null) => void;
  /*  todoList: TodoItem[];
  listName: string; */
};

const Input: FC<InputProps> = ({
  setTodoList,
  editTodo,
  setEditTodo /*  todoList, listName */,
}) => {
  //Variables
  const uuid = crypto.randomUUID();

  const cursorRef = useRef<HTMLInputElement>(null);
  //States
  const [todo, setTodo] = useState("");
  const [prio, setPrio] = useState(false);

  useEffect(() => {
    if (editTodo) {
      setTodo(editTodo.name);
      setPrio(editTodo.prio);
    }
  }, [editTodo]);

  const handleEditTodo = (event: React.FormEvent) => {
    event.preventDefault();
    setTodoList((prev) =>
      prev
        .map((item) => {
          if (item.id === editTodo?.id) {
            return {
              ...item,
              isDone: item.isDone,
              prio: prio,
              name: todo,
            };
          }
          return item;
        })
        .sort((a, b) => Number(b.prio) - Number(a.prio))
    );

    setEditTodo(null);
    setTodo("");
    setPrio(false);
    cursorRef.current?.focus();
  };

  //Functions
  const handleTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (editTodo) {
      handleEditTodo(event);
      return;
    }
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
    <>
      <form onSubmit={handleTodo}>
        <label htmlFor="todos">Add Todo </label>
        <input
          name="todos"
          id="todos"
          ref={cursorRef}
          autoFocus
          required
          placeholder="wash your clothes"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        ></input>
        <label>
          <input
            type="checkbox"
            checked={prio}
            onChange={() => setPrio(!prio)}
          />
          urgent
        </label>
        <button type="submit">{editTodo ? "Change" : "Add Todo"}</button>
      </form>
      {editTodo && (
        <Button
          handleClick={() => {
            setEditTodo(null);
            setTodo("");
            setPrio(false);
            cursorRef.current?.focus();
          }}
        >
          Back
        </Button>
      )}
    </>
  );
};

export default Input;
