import type { FC } from "react";
import Button from "./Button";
import EditIcon from "../components-svg/EditIcon";
import ResetIcon from "../components-svg/ResetIcon";
import DeleteIcon from "../components-svg/DeleteIcon";
import styles from "../styles/List.module.css";
import CheckIcon from "../components-svg/CheckIcon";

type TodoItem = { id: string; name: string; prio: boolean; isDone: boolean };
type ListProps = {
  todoList: TodoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  editTodo: TodoItem | null;
  setEditTodo: (todo: TodoItem | null) => void;
};

const List: FC<ListProps> = ({ todoList, setTodoList, setEditTodo }) => {
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
    <div className="basicWrapper">
      <ul>
        {todoList.map((item) => (
          <li
            key={item.id}
            className={` ${styles.listItem} ${
              item.prio ? styles.prio : item.isDone ? styles.done : ""
            }  `}
          >
            <input
              type="checkbox"
              id={item.id}
              checked={item.isDone}
              onChange={() => handleDoneChange(item.id)}
              className="hiddenElement"
            />

            <label htmlFor="item.id">
              {item.isDone ? (
                <CheckIcon
                  className={styles.iconChecked}
                  color="var(--primary-color)"
                  size={21}
                />
              ) : (
                <div className={styles.iconUnchecked}></div>
              )}
            </label>
            {item.name}
            <Button
              variant="secondary"
              handleClick={() => {
                setEditTodo(item);
              }}
              className={styles.editButton}
            >
              <EditIcon color="var(--font-color-light)" size={35} />
            </Button>
          </li>
        ))}
      </ul>
      {todoList.length !== 0 && (
        <div className={styles.buttonContainer}>
          <Button handleClick={handleReset}>
            <ResetIcon size={22} />
          </Button>
          <Button variant="tertiary" handleClick={handleDelete}>
            <DeleteIcon size={22} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default List;
