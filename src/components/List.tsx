import type { FC } from "react";
import Button from "./Button";
import EditIcon from "../components-svg/EditIcon";
import ResetIcon from "../components-svg/ResetIcon";
import DeleteIcon from "../components-svg/DeleteIcon";
import styles from "./List.module.css";

type TodoItem = { id: string; name: string; prio: boolean; isDone: boolean };
type ListProps = {
  todoList: TodoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  editTodo: TodoItem | null;
  setEditTodo: (todo: TodoItem | null) => void;
};

const List: FC<ListProps> = ({
  todoList,
  setTodoList,
  setEditTodo,
  editTodo,
}) => {
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
      <ul className={styles.list}>
        {todoList.map((item) => (
          <li
            key={item.id}
            /* style={
              item.prio
                ? { color: "red" }
                : item.isDone
                ? { color: "lightgrey", textDecoration: "line-through" }
                : { color: "initial" }
            } */
            className={` ${styles.listItem} ${
              item.prio ? styles.prio : item.isDone ? styles.done : ""
            }  `}
          >
            <label>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => handleDoneChange(item.id)}
                className={styles.checkbox}
              />
            </label>
            {item.name}
            <Button
              variant="secondary"
              handleClick={() => {
                setEditTodo(item);
              }}
              className={styles.editButton}
            >
              <EditIcon color="var(--font-color-light)" />
            </Button>
          </li>
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <Button handleClick={handleReset}>
          <ResetIcon />
        </Button>
        <Button variant="tertiary" handleClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </div>
    </>
  );
};

export default List;
