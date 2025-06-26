import type { FC } from "react";
import Button from "./Button";

type TodoItem = { id: string; name: string; prio: boolean; isDone: boolean };
type ListProps = {
  todoList: TodoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};

const List: FC<ListProps> = ({ todoList, setTodoList }) => {
  const handleDoneChange = (id: string) => {
    setTodoList((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;

          const toggleIsDone = !item.isDone;

          return {
            ...item,
            isDone: toggleIsDone,
            prio: toggleIsDone ? false : item.prio,
          };
        })
        .toSorted((a, b) => Number(a.isDone) - Number(b.isDone))
    );
  };

  const handleDelete = () => {
    setTodoList((prev) => prev.filter((item) => item.isDone === false));
  };

  const handleReset = () => {
    setTodoList((prev) =>
      prev.map((item) => (item.isDone ? { ...item, isDone: false } : item))
    );
  };
  return (
    <>
      <ul>
        {todoList.map((item) => (
          <li
            key={item.id}
            style={
              item.prio
                ? { color: "red" }
                : item.isDone
                ? { color: "lightgrey", textDecoration: "line-through" }
                : { color: "initial" }
            }
          >
            <label>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => handleDoneChange(item.id)}
              />
            </label>
            {item.name}
            {/*   <Button handleClick={() => setEditTodo(item)}>Edit</Button> */}
          </li>
        ))}
      </ul>
      <Button handleClick={handleReset}>Reset</Button>
      <Button handleClick={handleDelete}>Delete</Button>
    </>
  );
};

export default List;
